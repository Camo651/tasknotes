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

- (#2007) Fixed a remaining task creation autocomplete case where a status value containing another status label could leave status fragments in the task title. Thanks to @prepare4robots for the follow-up report.
- (#2031) Fixed quick task creation failing when natural language input created a recurring task with a scheduled time. Thanks to @rdefaccio for reporting this.
- (#2034) Fixed Advanced Calendar timed events switching to a high-contrast mobile fill when Obsidian is narrowed or split on desktop. Thanks to @RumiaKitinari for reporting this.
