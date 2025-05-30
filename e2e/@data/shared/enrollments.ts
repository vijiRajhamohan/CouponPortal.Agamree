/* eslint-disable @typescript-eslint/camelcase */

export enum EnrollmentStatus {
    // Approved Enrollment Status
    Approved = 0,
    // Rejected Enrollment Status
    Rejected = 1,
    // Review Required Enrollment Status
    Review_Required = 2,
    // Case Processing After Review
    Review_Processing = 3,
    // Case Processing After Intake
    Intake_Processing = 4,
    // Disenrolled
    Disenrolled = 5,
    // Enrolled
    Enrolled = 6,
    // Canceled
    Canceled = 7,
    // Open
    Open = 8,
    // Unknown
    Unknown = -1,
    // EXPired
    EXP = 9,
}

export enum EnrollmentEligibility {
    // didn't even try
    Undetermined = 0,
    // yes
    Passed = 1,
    // no
    Failed = 2,
}
