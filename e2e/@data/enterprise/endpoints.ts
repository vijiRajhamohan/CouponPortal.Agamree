export const surveySessionCreateEndpoint = new RegExp('/survey/v3/SurveySession');
export const fullSurveySessionCreateEndpoint = new RegExp('/survey/v3/FullSurveySession');
export const enrollPatientEndpoint = new RegExp('/edge/patientEnrollment/enrollPatient');
export const getBestEnrollmentV2Endpoint = new RegExp('/edge/enrollment/GetBestEnrollmentsV2');
export const checkMemberNumberEndpoint = new RegExp('/edge/enrollment/CheckMemberNumber');

export const edbEndpoints = {
    surveySessionCreateEndpoint,
    fullSurveySessionCreateEndpoint,
    enrollPatientEndpoint,
    getBestEnrollmentV2Endpoint,
    checkMemberNumberEndpoint,
};
