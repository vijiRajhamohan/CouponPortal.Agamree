import { basicEnrollmentEndpoint } from '../endpoints';
import { SuccessResponse } from '../../shared/mockResponseTypes';
import { basicEnrollmentData } from '../mock_data/basicEnrollment';

const successMedical = SuccessResponse(basicEnrollmentEndpoint, basicEnrollmentData.medical);
const successPharmacy = SuccessResponse(basicEnrollmentEndpoint, basicEnrollmentData.pharmacy);
const error = SuccessResponse(basicEnrollmentEndpoint, basicEnrollmentData.error);

const enrollments = {
    successMedical,
    successPharmacy,
    error
}

export default enrollments;
