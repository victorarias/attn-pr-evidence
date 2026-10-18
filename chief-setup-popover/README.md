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

The [platform comparison](platform-comparison.md) checks native dialog and popover behavior before further focus changes. Its [browser results](platform-results.json) contain only engine names, control identifiers and focus/visibility booleans. Raw probe scripts and native logs remain on the task seed.
