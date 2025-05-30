import { mnStatusEndPoint } from '../endpoints';
import { SuccessResponse, ErrorResponse } from '../../shared/mockResponseTypes';
import { mnStatusData } from '../mock_data/mnStatus';

const successInactivePharmacy = SuccessResponse(mnStatusEndPoint, mnStatusData.inactivePharmacy);
const successActivePharmacy = SuccessResponse(mnStatusEndPoint, mnStatusData.activePharmacy);
const successInactiveMedical = SuccessResponse(mnStatusEndPoint, mnStatusData.inactiveMedical);
const successActiveMedical = SuccessResponse(mnStatusEndPoint, mnStatusData.activeMedical);
const errorNotFound = ErrorResponse(mnStatusEndPoint, mnStatusData.errorNotFound);

const mnStatuses = {
    successInactivePharmacy,
    successActivePharmacy,
    successInactiveMedical,
    successActiveMedical,
    errorNotFound
}

export default mnStatuses;
