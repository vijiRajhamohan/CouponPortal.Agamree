import { moveMNbySurveyQuestionEndPoint } from '../endpoints';
import { SuccessResponse, ErrorResponse } from '../../shared/mockResponseTypes';
import { moveStatus } from '../mock_data/moveMN';

// combine endpoint & data
const successPharmacyMove = SuccessResponse(moveMNbySurveyQuestionEndPoint, moveStatus.successPharmacyMove );
const successMedicalMove = SuccessResponse(moveMNbySurveyQuestionEndPoint, moveStatus.successMedicalMove );
const errorNotFound = ErrorResponse(moveMNbySurveyQuestionEndPoint, moveStatus.errorNotFound);

const moveMNData = {
    successPharmacyMove,
    successMedicalMove,
    errorNotFound,
}

export default moveMNData;
