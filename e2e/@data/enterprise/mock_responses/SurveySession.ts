import { surveySessionCreateEndpoint } from '../endpoints';
import { SuccessResponse } from '../../shared/mockResponseTypes';
import { surveySessionData } from '../mock_data/surveySession';

const success = SuccessResponse(surveySessionCreateEndpoint, surveySessionData.newSession);
const error = SuccessResponse(surveySessionCreateEndpoint, surveySessionData.error);

const surveySessions = {
    success,
    error
}

export default surveySessions;
