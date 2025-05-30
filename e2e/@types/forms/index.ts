import { ITextInputs } from './form-fields/text'
import { IMultiChoiceQuestions } from './form-fields/multiChoice'
import { IEligibilityQuestions } from './form-fields/eligibility'

// export input types
export { ITextInputs } from './form-fields/text'
export { IMultiChoiceQuestions, IMultiChoiceAnswers } from './form-fields/multiChoice'
export { IEligibilityQuestions } from './form-fields/eligibility'

// complete form - used in page tests and checkRequiredFields util
export interface IForm {
    textInputs?: ITextInputs
    checkboxQuestions?: IMultiChoiceQuestions
    radioQuestions?: IMultiChoiceQuestions | IEligibilityQuestions
}
