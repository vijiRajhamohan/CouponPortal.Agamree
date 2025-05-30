// patient form conditions - used in test files
export interface IPatientFormConditions {
    // TODO: remove - only applies to Cizplam config drawer
    drawerConditionalFields: boolean
    drawerMarketingOptIn: boolean

    caregiver: boolean
    consentText: boolean
    consentMarketing: boolean
    consentMarketingContactPreferenceText: boolean
    cellSameAsAbove: boolean
}
// patient form optional conditions - used in patient page object
export type PatientFormConditionsOptional = Partial<IPatientFormConditions>

/* TODO: create additional form conditions as needed
** Example - Insurance Form Conditions
** export interface IInsuranceFormConditions {
**  isCommercial: boolean
** }
** export type InsuranceConditionsOptional = Partial<IInsuranceFormConditions>
** Insurance page object will then allow form fields with the isCommercial condition
*/


// union type of all form conditions - used in fillForm and checkRequiredFields utils
export type FormConditions = IPatientFormConditions
/* TODO: allow other form condition interfaces as needed
** Example - Adding Insurance Form Conditions
** IPatientFormConditions => IPatientFormConditions | IInsuranceFormConditions
*/



// union type of all optional form conditions - used in page objects for form fields
export type FormConditionsOptional = Partial<FormConditions>
