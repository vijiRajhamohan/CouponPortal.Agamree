import { ISelector } from '../../selectors'
import { IFormField } from './formFields'

export interface IMultiChoiceAnswers {
    [key: string]: ISelector | ISelector[]
}

// radio/checkbox question
export interface IMultiChoiceQuestion extends IFormField {
    options: {
        [key: string]: ISelector
    }
}
// collection of multi-choice questions: radios/checkboxes
export interface IMultiChoiceQuestions {
    [key: string]: IMultiChoiceQuestion
}
