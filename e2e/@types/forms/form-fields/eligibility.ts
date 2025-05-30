import { ISelector } from '../../selectors'
import { IFormField } from './formFields'

// eligibility answer options
export interface IEligibilitySelector extends ISelector {
    isEligible: boolean
}
// eligibility question
export interface IEligibilityQuestion extends IFormField {
    options: {
        [key: string]: IEligibilitySelector
    }
}
// collection of elibility questions - used in eligibility page object and testEligibility util
export interface IEligibilityQuestions {
    [key: string]: IEligibilityQuestion
}
