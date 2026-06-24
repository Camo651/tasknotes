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

## Added

- (#2024) Added materialized occurrence notes to the Relationships widget, so recurring parent task notes can show their occurrence notes in an **Occurrences** tab. See [Relationships Widget](https://tasknotes.dev/features/inline-tasks/#relationships-widget). Thanks to @3zra47 for requesting this.
- (#2022) Added a **Skip instance** / **Unskip instance** action to the recurring task edit modal's completion calendar, so skipped dates can be adjusted from the same date menu as completions. See [Recurring Tasks](https://tasknotes.dev/features/recurring-tasks/#completion-tracking). Thanks to @AmonAmarthFTW for requesting this.
- (#2048) Added current due and scheduled dates to the edit modal's task information. Thanks to @1activegeek for requesting this.
- (#2058, #2059) Added natural-language parsing and the full date picker to date-type custom fields. Thanks to @chmac for requesting this.
- (#2060) Added date-type custom fields to the task right-click menu under **Custom dates**. Thanks to @chmac for requesting this.
- (#2067) Added an **Edit task** action to the task card context menu, including inline task cards. Thanks to @DarkCellar for requesting this.
- (#2068) Added `reminders` input support to the MCP `tasknotes_create_task` and `tasknotes_update_task` tools. Thanks to @Spirit597 for requesting this.
- (#2069) Added an **Add project** action to the Quick Actions palette. Thanks to @chmac for requesting this.

## Fixed

- (#2007) Fixed a remaining task creation autocomplete case where a status value containing another status label could leave status fragments in the task title. Thanks to @prepare4robots for the follow-up report.
- (#2031) Fixed quick task creation failing when natural language input created a recurring task with a scheduled time. Thanks to @rdefaccio for reporting this.
- (#2034) Fixed Advanced Calendar timed events switching to a high-contrast mobile fill when Obsidian is narrowed or split on desktop. Thanks to @RumiaKitinari for reporting this.
- (#2039) Fixed broken images on the Workflows and Calendar Setup documentation pages. Thanks to @chmac for reporting this.
- (#2045) Fixed custom modal fields assigned to Basic Information not appearing in task creation or edit modals. Thanks to @chmac for reporting this.
- (#2063) Fixed project autocomplete storing ambiguous project links without the selected note's folder path. Thanks to @chmac for reporting this.
- (#2072) Fixed inline task links to headings so they show both the task title and heading instead of only the heading. Thanks to @spasche for reporting this.

## Changed

- Improved local review checks so unsafe direct `Object.prototype` method access is caught before submission.
