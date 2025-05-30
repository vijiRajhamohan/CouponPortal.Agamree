import { CouponMemberMoveMemberNumberBySurveyQuestionProgramIdMoveMemberNumberBySurveyQuestionResponse } from '@trialcard/apigateway.models'
import { pharmacyMN, medicalMN } from '../../shared/memberNumbers';

export const moveStatus = {
    successPharmacyMove: createMoveMN(true, pharmacyMN.number ),
    successMedicalMove: createMoveMN(true, medicalMN.number),
    errorNotFound: createMoveMN(false),
};

function createMoveMN(success: boolean, memberNumber?: string) {
    if(!success) {
        const errorResponseData: CouponMemberMoveMemberNumberBySurveyQuestionProgramIdMoveMemberNumberBySurveyQuestionResponse = {
            success,
            data: {success, messages:[], data: {}},
            messages: ['MoveMemberNumberNotSuccessful Mock Response']
        }
        return errorResponseData
    }
     const successResponseData: CouponMemberMoveMemberNumberBySurveyQuestionProgramIdMoveMemberNumberBySurveyQuestionResponse = {
        success,
        data: {
            success,
            messages:[],
            data: {
            memberNumber,
            sourceGroup: '12345678',
            sourceOfferType: 1234,
            sourceBatchId: 12345,
            sourceTcProgramId: 1234,
            destinationGroup: '12345678',
            destinationOfferType: 12345,
            destinationBatchId: 12345,
            destinationTcProgramId: 1234,
            },
        },
        messages: [`MoveMemberNumberSuccessful Mock Response`]
    }
    return successResponseData
}
