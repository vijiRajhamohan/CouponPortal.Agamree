import { getBestEnrollmentV2Endpoint } from '../endpoints';
import { SuccessResponse } from '../../shared/mockResponseTypes';
import { gbeV2Data } from '../mock_data/getBestEnrollmentV2';

const existingEnrollment = SuccessResponse(getBestEnrollmentV2Endpoint, gbeV2Data.existingEnrollment);
const noResult = SuccessResponse(getBestEnrollmentV2Endpoint, gbeV2Data.noResult);
const error = SuccessResponse(getBestEnrollmentV2Endpoint, gbeV2Data.error);

const gbeV2 = {
    existingEnrollment,
    noResult,
    error
}

export default gbeV2;
