# SectionDim View

## Purpose

Contains attributes of a section including with its local education agency.
Part of the [Core View Collection](./readme.md).

## SQL Object

`analytics.SectionDim`

## Usage Notes

The section dimension contains a flattened key for section that contains aspect
of the school, course information, and dates.  No one element typically fully
describes the section so each attribute may be necessary to describe the
sections.

## Structure

| Column Name | Data Type | Source Table | Description |
| --- | --- | --- | --- |
| SchoolKey | string | School.SchoolId |     |
| SectionKey | string | Section.SchoolId, Section.LocalCourseCode, Section.SchoolYear, Section.SectionIdentifier, Section.SessionName |     |
| Description | string | Section.LocalCourseCode, Course.CourseTitle, SectionClassPeriod.ClassPeriodName, AcademicSubjectDescriptor.AcademicSubjectDescriptorId |     |
| SectionName | string | Section.LocalCourseCode, Session.SessionName |     |
| SessionName | string | Session.SessionName |     |
| LocalCourseCode | string | CourseOffering.LocalCourseCode, SectionClassPeriod.LocalCourseCode |     |
| SchoolYear | int | CourseOffering.SchoolYear |     |
| EducationEnvironmentDescriptor | string | Section.EducationalEnvironmentDescriptorId |     |
| LocalEducationAgencyId | int | School.LocalEducationAgencyId |     |
