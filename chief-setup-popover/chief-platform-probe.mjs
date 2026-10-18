import fs from 'node:fs';
import { createRequire } from 'node:module';
const require=createRequire(process.cwd()+'/app/package.json');
const {chromium,webkit}=require('@playwright/test');
export function fixture(kind,delayed=false) {
 const tag=kind==='dialog'||kind==='modal'?'dialog':'div';
 const pop=kind==='popover'?'popover="auto"':'';
 return `<!doctype html><style>#popup{position:fixed;inset:auto;left:150px;top:70px;margin:0;width:280px;padding:14px;border:1px solid; background:white}#outside{position:fixed;left:600px;top:40px}</style>
 <button id="open" ${kind==='popover'?'popovertarget="popup"':''}>Chief</button><input id="terminal" aria-label="Terminal"><button id="outside">Outside</button>
 <${tag} id="popup" ${pop} role="dialog" ${kind==='div'?'hidden':''}><button id="close">Close</button><button id="model" role="radio" tabindex="0">Model</button><input id="folder" value="Notebook"><button id="wake" autofocus ${delayed?'disabled':''}>Wake</button></${tag}>
 <script>(()=>{
 const kind=${JSON.stringify(kind)};const popup=document.querySelector('#popup');
 window.trace=[];for(const type of ['focusin','focusout','keydown','keyup','beforetoggle','toggle','cancel','close'])document.addEventListener(type,e=>window.trace.push({type,target:e.target.id,key:e.key,related:e.relatedTarget?.id,newState:e.newState}),true);
 window.closePopup=()=>{if(kind==='popover')popup.hidePopover();else if(kind==='dialog'||kind==='modal')popup.close();else popup.hidden=true;};
 document.querySelector('#open').addEventListener('click',()=>{if(kind==='dialog')popup.show();else if(kind==='modal')popup.showModal();else if(kind==='div'){popup.hidden=false;document.querySelector('#wake').focus();}});
 document.querySelector('#close').onclick=window.closePopup;
 window.state=()=>({active:document.activeElement.id||document.activeElement.tagName,open:kind==='popover'?popup.matches(':popover-open'):kind==='div'?!popup.hidden:popup.open,documentFocused:document.hasFocus()});
 })();</script>`;
}
if(process.env.PROBE_FIXTURES_ONLY){for(const kind of ['div','dialog','popover','modal'])fs.writeFileSync(`/tmp/chief-focus-${kind}.html`,fixture(kind));process.exit(0);}
const results=[];
for(const [engine,type] of Object.entries({chromium,webkit})) {
 const browser=await type.launch({headless:true});
 for(const kind of ['div','dialog','popover','modal']) {
  const page=await browser.newPage();
  const reset=async delayed=>{await page.setContent(fixture(kind,delayed));await page.locator('#open').click();};
  const state=()=>page.evaluate(()=>window.state());
  const out={engine,kind};
  await reset(false);out.open=await state();await page.keyboard.press('Tab');out.forwardTab=await state();
  await reset(false);await page.keyboard.press('Shift+Tab');out.reverseTab=await state();
  await reset(false);await page.keyboard.press('Escape');out.escape=await state();
  if(kind!=='modal'){await reset(false);await page.locator('#outside').click();out.outsideClick=await state();}
  await reset(false);await page.evaluate(()=>document.querySelector('#terminal').focus());out.terminalFocus=await state();
  await reset(false);await page.evaluate(()=>window.closePopup());out.closeReturn=await state();
  await reset(true);out.loading=await state();await page.evaluate(()=>document.querySelector('#wake').disabled=false);out.ready=await state();
  await reset(false);await page.locator('#model').focus();await page.evaluate(()=>{const old=document.querySelector('#model');const next=old.cloneNode(true);next.textContent='New model';old.replaceWith(next);});out.catalogReplacement=await state();
  results.push(out);await page.close();
 }
 await browser.close();
}
fs.writeFileSync('/tmp/chief-platform-probe.json',JSON.stringify(results,null,2)+'\n');
for(const r of results)console.log(r.engine,r.kind,Object.entries(r).filter(([k])=>!['engine','kind'].includes(k)).map(([k,v])=>`${k}=${v.active}/${v.open?'open':'closed'}`).join(' '));
