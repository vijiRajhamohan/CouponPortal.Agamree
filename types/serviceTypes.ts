export interface IPatientSearchRequest {
    MaxResults: number;
    SkipRows: number;
    FirstNameQueryType: number;
    FirstName: string;
    LastNameQueryType: number;
    LastName: string;
    DateOfBirth: string;
    City: string;
    State: string;
    PostalCode: string;
    Country: string;
    MemberNumber: string;
    Email: string;
    Phone: string;
    AlternateId: string;
}

export interface IPatientResponse {
    FirstName: string;
    LastName: string;
    DateOfBirth: string;
    Address1: string;
    City: string;
    State: string;
    PostalCode: string;
    Country: string;
    MemberNumber: string;
    CardStartDate: string;
    CardEndDate: string;
    CardActivationDate: string;
    EligibilityStatusCode: number;
    EligibilityStatusDescription: string;
    EligibilityDate: string;
    Bin: string;
    SponsorNumber: string;
}
