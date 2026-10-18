# Chief popup platform comparison

Measured with Playwright Chromium/WebKit and native keyboard input in WebKitGTK.

| Mechanism | Tab after the last control | Escape and outside click | Delayed controls |
| --- | --- | --- | --- |
| Nonmodal dialog.show() | Leaves the document | Do not close automatically | Enabling Wake does not focus it; replacing the focused radio loses focus |
| Native auto popover | Reaches the control after its invoker | Close automatically | Same delayed-enable and replacement gaps |
| Modal dialog | Prevents focus on the terminal behind it | Escape closes | Changes the selected nonmodal behavior |

A native auto popover remains open when the terminal takes programmatic focus. The Chief must close in that situation. Native APIs therefore do not supply the full agreed interaction.

The chosen change preserves the popup's focus behavior and removes the effect used only to initialize its harness choice. The automatic offer still checks the mounted row and current document focus.

These probes test Tab from Wake, the final control. They do not explain the earlier CI Notebook-to-Wake timeout. The full packaged acceptance suite subsequently passed.

[Browser results](platform-results.json) contain only engine names, control identifiers, focus state and visibility. The [browser probe](chief-platform-probe.mjs), [GTK probe](chief-gtk-focus-probe.py) and [native-key log](chief-gtk-focus-probe.log) are published here and attached to the task seed.

Sources: [HTML dialog](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element), [HTML popover](https://html.spec.whatwg.org/multipage/popover.html), [React state adjustment](https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes).
