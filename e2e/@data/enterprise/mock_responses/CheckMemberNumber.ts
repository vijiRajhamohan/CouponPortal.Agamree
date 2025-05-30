import { SuccessResponse, ErrorResponse } from '../../shared/mockResponseTypes';
import results from '../mock_data/checkMemberNumber';
import { checkMemberNumberEndpoint as endpoint } from '../endpoints';

const inUseMedical = SuccessResponse(endpoint, results.inUseMedical);
const isValidMedical = SuccessResponse(endpoint, results.isValidMedical);
const inUsePharmacy = SuccessResponse(endpoint, results.inUsePharmacy);
const isValidPharmacy = SuccessResponse(endpoint, results.isValidPharmacy);
const noResultMedical = SuccessResponse(endpoint, results.noResultMedical);
const noResultPharmacy = SuccessResponse(endpoint, results.noResultPharmacy);
const error = ErrorResponse(endpoint, results.error);

const checkMNResults = {
    inUseMedical,
    isValidMedical,
    inUsePharmacy,
    isValidPharmacy,
    noResultMedical,
    noResultPharmacy,
    error,
};

export default checkMNResults;
