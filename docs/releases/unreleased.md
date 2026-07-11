# TaskNotes - Unreleased

<!--

**Added** for new features.
**Changed** for changes in existing functionality.
**Deprecated** for soon-to-be removed features.
**Removed** for now removed features.
**Fixed** for any bug fixes.
**Security** in case of vulnerabilities.

Always acknowledge contributors and those who report issues.

Example:

```
## Fixed

- (#768) Fixed calendar view appearing empty in week and day views due to invalid time configuration values
  - Added time validation in settings UI with proper error messages and debouncing
  - Prevents "Cannot read properties of null (reading 'years')" error from FullCalendar
  - Thanks to @userhandle for reporting and help debugging
```

When a change has user-facing documentation, include a canonical tasknotes.dev link:

```
## Added

- Added materialized occurrence notes for recurring tasks. See [Recurring Tasks](https://tasknotes.dev/features/recurring-tasks/#materialized-occurrence-notes) for setup and calendar behavior.
```

-->

## Fixed

- Fixed Obsidian freezing on iPhone when entering Live Preview on a note that contains multiple TaskNote links alongside the relationships widget.
  - The relationships widget's bottom-offset calculation was writing its margin-top custom property on every animation frame, which fed back into CodeMirror's geometry tracking and created a rAF-cadence layout loop. iOS Safari cannot keep up with the loop and stops responding. The offset calculation now short-circuits when the desired value is unchanged from the previously-applied one, so layout stabilizes on the first frame.
  - Also hardened the inline task-link widget to opt out of iOS Safari's text-selection and editability walks, and to ignore pointer/touch/context events at the CodeMirror boundary.
  - Thanks to @matthagger for reporting and helping diagnose the loop.