import { fullSurveySessionCreateEndpoint } from '../endpoints';
import { SuccessResponse } from '../../shared/mockResponseTypes';
import { fullSurveySessionData } from '../mock_data/fullSurveySession';

const success = SuccessResponse(fullSurveySessionCreateEndpoint, fullSurveySessionData.newFullSession);
const error = SuccessResponse(fullSurveySessionCreateEndpoint, fullSurveySessionData.error);

const fullSurveySessions = {
    success,
    error
};

export default fullSurveySessions;
