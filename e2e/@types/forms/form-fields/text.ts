import { IFormField } from './formFields'

// text input field - normal text/datepicker/autocomplete dropdown
export interface ITextInput extends IFormField {
    invalidValues?: {[key: string]: string},
    isFilled?: boolean; // use for state field when zip lookup is enabled
    isEntered?: boolean; // use for autocompletes and dropdowns
    datepicker?: boolean; // use for date fields where datepicker is enabled
}
// collection of text input fields
export interface ITextInputs {
    [key: string]: ITextInput
}
