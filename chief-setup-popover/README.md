# Chief setup popover

Native captures for [attn PR #714](https://github.com/SolenesInc/attn/pull/714), targeting the chief crew-member epic.

| Capture | Scenario run | Product revision |
| --- | --- | --- |
| First run | chief-slot-2026-10-18T20-41-30-235Z | 97e61618d |
| Agents running, setup closed | chief-slot-2026-10-18T20-23-39-677Z | bad381954 |
| Waking | chief-slot-2026-10-18T20-52-34-000Z | 9d18c7f9a |
| Save error | chief-slot-2026-10-18T20-23-39-677Z | bad381954 |
| No harness | chief-slot-2026-10-18T20-23-39-677Z | bad381954 |

All sessions and pull requests shown are fixtures. The first-run capture was taken with the window parked at x=1690 on a 1710-pixel-wide display. Its width is 1200 pixels, leaving 20 visible and 1180 off-screen. See [window bounds](parked-window.json).

The full native scenario passed at de8e598b2 in 82.909 seconds, including cleanup: [verdict](chief-slot-verdict.json), [summary](chief-slot-summary.json). [All launch bounds](parked-windows.json) stayed parked with 20 logical pixels visible. The scenario covered both sidebar flows, no-harness recovery, folder prefill/error/Enter wake, restored-terminal focus, configured Escape/Save and cold-start command focus, Sleep/one-click Wake, and Notebook charter autosave.

The [platform comparison](platform-comparison.md) checks native dialog and popover behavior before further focus changes. Its [browser results](platform-results.json) contain only engine names, control identifiers and focus/visibility booleans. The reproducible probes and native-key log are linked below and attached to the task seed.

Reproduce the comparison with the [browser probe](chief-platform-probe.mjs) and the [GTK native-key probe](chief-gtk-focus-probe.py). The [GTK receipt](chief-gtk-focus-probe.log) records each key's resulting focus and visibility. Run the browser probe from an attn checkout with app dependencies and Playwright browsers installed. `PROBE_FIXTURES_ONLY=1 node <browser-probe-path>` generates the HTML under `/tmp`; then run `python3 <gtk-probe-path> popover` on an X11 display with WebKitGTK and xdotool available. The other GTK variants are `div`, `dialog` and `modal`.

At PR revision `a8f0c6c24f1fb3f522487b350c64a10b867a46b6`, the Linux packaged serial matrix passed all eight steps and cleanup in 94.340 seconds: [verdict](final-linux-verdict.json), [summary](final-linux-summary.json). The isolated Linux instance was removed after verification.

The macOS packaged scenario passed the same revision in 61.808 seconds: [verdict](final-mac-verdict.json), [summary](final-mac-summary.json), [native run log](final-mac-green.log). All three launches kept 20 of 1200 logical pixels visible on the 1710-pixel display: [window bounds](final-mac-parked-windows.json). The isolated Mac instance was removed afterward.

The first local Mac attempt reached Wake but the daemon released its new binding before starting a PTY: [failed run log](final-mac-initial-failure.log). The unchanged rerun passed. The cause of that first launch rejection remains unknown; no product change was made in response. Hosted macOS acceptance also passed on this revision.

After rebasing onto epic `5c58e4d4b`, PR revision `94a6dc467ab8d376a26b131962301abc1fff13e8` passed all eight Mac packaged steps and cleanup in 61.030 seconds: [verdict](chief-round4-mac-verdict.json), [summary](chief-round4-mac-summary.json). [All three launch bounds](chief-round4-mac-windows.json) again show 20 of 1200 logical pixels visible. The isolated instance was removed afterward. Chief wire checks passed 58/58, and the six affected browser test files passed 49/49. [The rebase comparison](chief-round4-range-diff.txt) records the conflict resolutions. The earlier Linux receipt above applies to its stated pre-rebase revision.

Final checks on `94a6dc467ab8d376a26b131962301abc1fff13e8` are green: [CI run](https://github.com/SolenesInc/attn/actions/runs/39303726749), including all three browser shards, macOS acceptance, all four Linux acceptance shards and the PR gate. [CI receipt](ready-ci.json). Hosted Codex approved this head at 2026-10-19T18:40:48Z: [reaction receipt](ready-codex-reactions.json). All review threads were resolved and GitHub reported the PR mergeable when checked. The PR remains open for the epic orchestrator.
