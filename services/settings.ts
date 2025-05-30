export class Settings {
    public constructor(settings: any) {
        Object.assign(this, settings);
    }
}
export interface Settings {
    base: string;
    url(url: string): string;
    name: string;
    author: string;
    description: string;
    minDate: string;
    mainMenu: Array<{ icon: [string, string]; title: string; to: string; exact: boolean }>;
    errorPages: {
        default: { icon: [string, string]; title: string; message: string; statusCode: number };
        [code: string]: { icon: [string, string]; title: string; message: string; statusCode: number };
    };
    card: string;
    headerLogo: string;
    footerLogo: string;
    cardTypeQuestionId: string;
    cardTypeAnswerId: string;
    programId: string;
    surveyId: string;
    eligibilityFederalQuestion: string;
    eligibilityFederalAnswer: string;
    eligibilityCitizenQuestion: string;
    eligibilityCitizenAnswer: string;
    eligibilityAgeQuestion: string;
    eligibilityAgeAnswer: string;
    triangleUp: string;
    triangleDown: string;
    lockEnabled: string;
    lockPassword: string;
}
