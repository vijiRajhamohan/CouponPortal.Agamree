import { RoleType } from '@trialcard/enums';

export default [
    { enum: RoleType.Spouse, description: 'Spouse' },
    { enum: RoleType.Parent, description: 'Parent' },
    { enum: RoleType.Child, description: 'Child' },
    { enum: RoleType.LegalRepresentative, description: 'Legal Representative' },
    { enum: RoleType.Prescriber, description: 'Prescriber' },
    { enum: RoleType.Practice, description: 'Practice' },
    { enum: RoleType.Pharmacy, description: 'Pharmacy' },
    { enum: RoleType.Hospital, description: 'Hospital' },
    { enum: RoleType.OfficeContact, description: 'Office Contact' },
    { enum: RoleType.Unknown, description: 'Other' },
    // { enum: RoleType.SocialWorker, description: 'Social Worker' },
];
