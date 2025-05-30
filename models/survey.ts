export class AnswerModel {
    public answersId!: number;
    public answerTypeId!: AnswerType;
    public answerValue!: string;
    public dtmfTone!: string;
    public indicatesOptIn!: boolean;
    public triggersFulfillment!: boolean;
    public requiresAdvancedNavigation!: boolean;
    public nextQuestionID?: any;
    public userName!: string;
    public answerCategoryId?: number;
    public answerCategoryCode!: string;
    public answerCategoryDescription!: string;
}

export enum AnswerType {
    Numeric = 1,
    Text = 2,
    Date = 3,
    MemberNumber = 4,
    DebitCardAccountNumber = 5,
}

export enum QuestionType {
    MemberNumberCollector = 1,
    PatientObjectCollector = 2,
    DocumentID = 3,
    DebitCardNumberCollector = 4,
    MultipleChoice = 5,
    MultipleChoiceMultiAnswer = 6,
    FreeForm = 7,
    Date = 8,
    CampaignMemberIDCollector = 9,
    CampaignStreamIDCollector = 10,
    DateHidden = 11,
    Email = 12,
    Phone = 13,
    Fax = 14,
    Currency = 15,
    Percentage = 16,
    Label = 1015,
}

export class QuestionCategoryModel {
    public questionCategoryId!: number;
    public questionCategoryTypeCode!: string;
    public questionCategoryTypeDescription!: string;
    public description!: string;
    public questionCategoryCode!: string;
    public questionCategoryTypeId!: number;
    public userName!: string;
}

export class SurveyQuestionModel {
    public questionId!: number;
    public questionTypeId!: QuestionType;
    public questionText!: string;
    public audioFileName!: string;
    public isSurveyEntryPoint!: boolean;
    public isOptInQuestion!: boolean;
    public answers!: AnswerModel[];
    public questionCategories!: QuestionCategoryModel[];
}

export class FullSurveyModel {
    public surveyId!: number;
    public surveyTypeId!: number;
    public description!: string;
    public questionsWithAnswers!: SurveyQuestionModel[];
}

export class FullSurveyResponseModel {
    public success!: boolean;
    public messages!: any[];
    public data!: FullSurveyModel;
}
