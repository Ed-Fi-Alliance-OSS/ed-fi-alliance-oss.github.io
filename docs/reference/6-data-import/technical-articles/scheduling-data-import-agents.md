# Scheduling Data Import Agents

There are a few moving parts behind the scenes related to scheduling and FTP
Agents. Here is what is physically happening behind the scenes, so that you'll
know what "levers to pull":

1. When you create or edit an FTP Agent on the Agents screens, you are able to
    define a Schedule for that agent.
2. However, the background process that performs FTP access and subsequent data
    loading work, _DataImport.Server.TransformLoad.exe_, does not run
    _automatically_. When _DataImport.Server.TransformLoad.exe_ is executed, it
    checks the current time vs the defined schedule for the FTP Agents, and
    determines from that whether work is due. If work is due by that Schedule
    check, it then contacts the FTP server to copy over any new files, and then
    performs the work to import them into the ODS per the defined mappings. (In
    other words, if no Schedule is defined, no FTP imports will take place.
    Likewise if a Schedule is defined but TransformLoad is never run, no FTP
    imports will take place.)
3. For users that want to use FTP Agents for a frequent file drop, then, you
    may want to set up a Windows scheduled task to run
    _DataImport.Server.TransformLoad.exe_ daily, for instance. That, combined
    with a Schedule on the Agent, would allow for a "hands off" frequent upload.
4. However, note that in point 2
    above  _DataImport.Server.TransformLoad.exe_ contacts the FTP server for
    "new" files. It is looking for file names that have not been previously
    imported. The intent here is to protect implementations from an
    unintentional daily bulk import of the same data over and over again without
    realizing that's what they'd opted into. So, for users who really do want to
    use an FTP drop for frequent imports of new CSV content, you'd want to use a
    naming convention such as a timestamped file name:
    _2020-07-22-assessments.csv_. This is why the FTP agent allows you to
    specify a wildcard File Pattern for the files to fetch.
