import { enrollPatientEndpoint } from '../endpoints';
import { SuccessResponse, ErrorResponse } from '../../shared/mockResponseTypes';
import { validEnrollments, enrollmentError } from '../mock_data/enrollPatient';

const successMedical = SuccessResponse(enrollPatientEndpoint, validEnrollments.enrollmentMedical);
const successPharmacy = SuccessResponse(enrollPatientEndpoint, validEnrollments.enrollmentPharmacy);
const successDualMN = SuccessResponse(enrollPatientEndpoint, validEnrollments.enrollmentDualMN);
const error = ErrorResponse(enrollPatientEndpoint, enrollmentError);

const enrollments = {
    successMedical,
    successPharmacy,
    successDualMN,
    error
};

export default enrollments;
