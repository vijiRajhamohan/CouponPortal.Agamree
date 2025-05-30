class FullSurveySession {
    success: boolean;
    messages: string[];
    constructor(success: boolean, messages: string[], data?: object) {
        this.success = success;
        this.messages = messages;
    }
}

export const fullSurveySessionData = {
    newFullSession: new FullSurveySession(true, []),
    error: new FullSurveySession(true, ['mock error']),
};
