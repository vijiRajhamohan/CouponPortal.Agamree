import { ISelector } from '../../selectors'
import { FormConditionsOptional } from '../formConditions'

// Base form field - prototype of other form fields
export interface IFormField extends ISelector {
    required: boolean
    isRequiredConditions?: FormConditionsOptional
    isVisibleConditions?: FormConditionsOptional
    isFilledConditions?: FormConditionsOptional
}

// collection of form fields - used in checkRequiredFields and filterConditionalFields
export type FormFields = {
    [key: string]: IFormField
}
