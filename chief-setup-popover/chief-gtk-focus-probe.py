import gi,subprocess,json,sys,os
from pathlib import Path
gi.require_version('Gtk','3.0');gi.require_version('WebKit2','4.1');gi.require_version('GdkX11','3.0')
from gi.repository import Gtk,WebKit2,GdkX11
print('PROBE_PID',os.getpid(),flush=True)
w=Gtk.Window();v=WebKit2.WebView();w.add(v);w.set_default_size(900,600);w.connect('destroy',Gtk.main_quit)
m=v.get_user_content_manager();m.register_script_message_handler('receipt');keys=['Tab','shift+Tab','Escape'];steps=['open','forwardTab','reverseTab','escape'];i=0

def key(k):subprocess.run(['xdotool','key','--clearmodifiers',k],check=True)
def receipt(manager,result):
 global i
 print(json.dumps({'kind':sys.argv[1],'step':steps[i],'state':json.loads(result.get_js_value().to_string())}),flush=True)
 if i==len(keys):Gtk.main_quit();return
 k=keys[i];i+=1;key(k)
m.connect('script-message-received::receipt',receipt)
def ready(view,event):
 if event != WebKit2.LoadEvent.FINISHED:return
 def focused(*args):subprocess.run(['xdotool','windowfocus','--sync',str(w.get_window().get_xid())],check=True);key('Return')
 v.run_javascript("document.querySelector('#open').focus();document.addEventListener('keyup',e=>{if(['Shift','Control','Meta','Alt'].includes(e.key))return;setTimeout(()=>window.webkit.messageHandlers.receipt.postMessage(JSON.stringify(window.state())),0);});",None,focused,None)
v.connect('load-changed',ready);v.load_html(Path('/tmp/chief-focus-'+sys.argv[1]+'.html').read_text(),'file:///');w.show_all();Gtk.main()
