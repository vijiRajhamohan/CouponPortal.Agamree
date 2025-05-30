class SurveySession {
    success: boolean;
    messages: string[];
    data?: object;
    constructor(success: boolean, messages: string[], data?: object) {
        this.success = success;
        this.messages = messages;
        this.data = data;
    }
}

const data = {
    surveySessionId: 1234,
    firstQuestionId: 4567,
};

export const surveySessionData = {
    newSession: new SurveySession(true, [], data),
    error: new SurveySession(true, ['mock error']),
};
