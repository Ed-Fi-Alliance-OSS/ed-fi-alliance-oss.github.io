# LEA Support - Turning on the LEA Data and Avoiding the "Error Flood"

## What is the Error Flood?

A key moment in support for a school district occurs when the district completes configuration and turns on the data connection to the Ed-Fi API. In the case of state reporting, this is when the school district student information system (SIS) starts sending data to the state. In a "data hub" project, this is a connection to an API most often run by an education service agency, who is using the data to provide analytics and other data services.

What can occur at this moment is a flood of Ed-Fi-related errors reported in the SIS. In some cases – and particularly with school districts using a SIS new to Ed-Fi – there can be hundreds or even thousands of errors. For a school district staff member looking at this for the first time, the experience can be overwhelming, as they wonder how they are going to find time to fix all those errors on top of all their critical work running schools.

However, the error flood is not as bad as it looks. There are 3 strategies we recommend to help LEAs move past this challenge:

1. **Understand**: help LEAs understand why there are so many errors
2. **Solve**: learn a few simple strategies to get the flood under control
3. **Prevent**: understand your SIS system's Ed-Fi support better to avoid the flood in the first place

## Understand: Why does the Error Flood occur?

Although there are thousands of errors appearing in school district SIS, the number of problems is much, much smaller. There are generally 2 main root issues:

### Problem # 1: Dependency Errors

A dependency error occurs when a dependent data element is missing. Ed-Fi requires that – when one data element references another – the element being referred to must be loaded BEFORE the element. This requirement ensures higher data quality and prevents a lot of headaches later.

For example, consider this case: the SIS attempts to load a school record via Ed-Fi to the state. Let's say the SIS is loading a record for "Grand Bend HS". For some reason that load fails.

```none
Add School "Grant Bend HS" <- FAILS (for some reason)
```

The SIS then attempts to load all the school enrollments for Grand Bend HS. These loads fail because the school being referred to did not load:

```none
Student "64287" is enrolled in School "Grand Bend HS"  \<- FAILS

Student "86275" is enrolled in School "Grand Bend HS"  \<- FAILS

Student "99225" is enrolled in School "Grand Bend HS"  \<- FAILS

Student "11593" is enrolled in School "Grand Bend HS"  \<- FAILS

etc. they all fail because the School did not load
```

You can see how it is possible to get thousands of errors, but there is really just 1 problem: the failed school record. If the school had loaded, all the other records would have loaded too (provided of course that there were no other issues).

:::info A Note About SIS Systems
Your reaction may be: _Shouldn't a SIS recognize this dependency problem and not send all the student records UNTIL the school record loads?_
The answer is yes, many do this today, but unfortunately not all SIS systems support this. Often, ones newer to Ed-Fi may not do this yet.
:::

### Problem #2: Missing Descriptors

A second common issue is missing descriptors (for background "descriptors" are Ed-Fi’s term for the "code sets" used in K12 data systems). This often occurs when a mapping from a local code in the SIS to a state code or other code is missing.

For example, consider this case: a SIS system is attempting to load attendance records from January 15 to the state, and among those are records with a code "LATE-MEDEXC", meaning the student was "late/tardy with a medical excuse".

However the API managed by the state does not recognize this code, as the state code is "PARTIAL" (which means that the student was "in school for a partial day", but not whether there is a medical or other excuse or not).

So the SIS starts loading records, and these fail because the descriptor is not recognized:

```none
Student "64287" attended on 01/15/2024 with code "LATE-MEDEXC"  \<- FAILS

Student "86275" attended on 01/15/2024 with code "LATE-MEDEXC"  \<- FAILS

Student "99225" attended on 01/15/2024 with code "LATE-MEDEXC"  \<- FAILS

Student "11593" attended on 01/15/2024 with code "LATE-MEDEXC"  \<- FAILS

etc. (they all fail because the code value is not recognized)
```

As with the above example, all these failures (potentially hundreds or even thousands of them) come back to one root problem: the use of the wrong descriptor: the school district forgot to “map” their local code to one the state recognizes.

If that one issue is fixed, hundreds of downstream errors would be resolved.

## Solve: Tackling the Error Flood

The major guidance to address the "error flood" is to look for the root dependency issues. To do that, look at the long lists of repetitive errors to see which entities are failing. A SIS system will show the user which elements are failing.

Many errors in the flood will look very similar. The chart below shows a few of the most common indicators; if you see many repeated messages of these kinds, you may have the issue described.

| **Errors to look out for that MAY indicate a dependency order issue** | **Possible issue** |
| --- | --- |
| "The value supplied for the related '\[**element**\]' resource does not exist." | There may be a missing record of the type listed in \[**element**\] |
| "Authorization denied. Either referenced 'Student' was not found or no relationships have been established between the caller's education organization id claims (\[number\], \[number\]) and the referenced 'Student'." | A **student** record may be missing |
| "Authorization denied. No relationships have been established between the caller's education organization id claims (\[number\], \[number\]) and one or more of the following properties of the resource item: 'SchoolId', 'StudentUniqueId'.", | A **school** record may be missing |

Another strategy is to look at errors in chronological order: start with the first errors and look at those BEFORE you get to the repetitive errors. Fix those early errors first, as those will be the errors resulting in dependency order problems.

Descriptor Dependency

A descriptor dependency is more simple to recognize; it will have this format and message:

```none
 "Validation of ‘\[element\]’ failed. \[descriptor\] is required."
```

As in this example:

```none
"Validation of 'StudentSchoolAttendanceEvent' failed. AttendanceEventCategoryDescriptorId is required."
```

Although the API seems to be saying the descriptor is **missing**, what it is really saying is that the descriptor is **not recognized**.

The solution here is usually to look a the SIS system descriptor mapping support and check to make sure the value from the records that are failing to load are mapped to state values. Look for any spelling / typos or other errors!

## Prevent: Using your SIS system’s support to avoid the flood

The best strategy to avoid the error flood is to get in front of it and prevent it from ever happening.

Much of the time the error flood is a result of the school district staff member simply pushing the button to "send everything" from the SIS system to the API. Doing this is completely understandable: why not press the button that promises to do the most work at once!?

However, what this can do is create a lot of errors! Luckily, most SIS systems offer the ability to send a more limited set of data at a time (Ed-Fi Alliance also advises SIS systems to set their systems up this way) and to do so according to the dependency order of data elements.

So advise school districts to look at their Ed-Fi control panel in the SIS and see what options it has to send a more limited set of data.

For example, many SIS systems will have a control panel for Ed-Fi that looks conceptually like this:

![Dependency Order](https://edfi.atlassian.net/wiki/download/attachments/22908291/Sample%20SIS%20UX%20-%20Dependency%20Order.png?api=v2)

What is going on here is that the SIS system has organized data by the dependency order. Where this exists, the data steward at the school has the option of sending records like Schools and Courses first before trying to send everything. This will allow the district data steward to debug and make progress without generating loads of error messages.

In addition to this, provide LEAs the URL of the vendor products documentation and HOWTO information on their Ed-Fi support. If necessary, ask the vendor where this information is.

So to avoid the flood we recommend:

1. Getting information on and helping LEAs understand their SIS tooling and how they can send limited amounts of data and solve synchronization issues in a structured way.
2. Resisting the "Send all" "Synch all" or similar buttons that send EVERYTHING until the early issues have been worked out.
3. Getting LEAs to know where their SIS or other vendor publishes HOWTO or help information on using the products Ed-Fi-related features.
