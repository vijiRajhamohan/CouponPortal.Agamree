import { EnrollmentCheckMemberNumberDefaultResponse, EnrollmentIsValidMemberNumberModel } from '@trialcard/apigateway.models';
import { pharmacyMN, medicalMN } from '../../shared/memberNumbers';

const validMessage = 'Mock Response: Valid Membernumber';
const inUseMessage = 'Mock Response: MemberNumber already in use';
const DNEMessage = "Mock Response: Membernumber doesn't exist";
const errorMessage = 'Mock Response: memberNumber should not be null or undefined';

export default {
    inUseMedical: createMNData(true, {
        memberNumber: medicalMN.number,
        isValid: true,
        validationMessage: inUseMessage,
        inUse: true,
        memberNumberType: 6,
    }),
    isValidMedical: createMNData(true, {
        memberNumber: medicalMN.number,
        isValid: true,
        validationMessage: validMessage,
        inUse: false,
        memberNumberType: 6,
    }),
    inUsePharmacy: createMNData(true, {
        memberNumber: pharmacyMN.number,
        isValid: true,
        validationMessage: inUseMessage,
        inUse: true,
        memberNumberType: 7,
    }),
    isValidPharmacy: createMNData(true, {
        memberNumber: pharmacyMN.number,
        isValid: true,
        validationMessage: validMessage,
        inUse: false,
        memberNumberType: 7,
    }),
    noResultMedical: createMNData(true, {
        memberNumber: medicalMN.number,
        isValid: false,
        validationMessage: DNEMessage,
        inUse: false,
        memberNumberType: 0,
    }),
    noResultPharmacy: createMNData(true, {
        memberNumber: pharmacyMN.number,
        isValid: false,
        validationMessage: DNEMessage,
        inUse: true,
        memberNumberType: 0,
    }),
    error: createMNData(false),
};

function createMNData(success: boolean, data?: EnrollmentIsValidMemberNumberModel) {
    if (!success || !data) {
        const errorResponseData: EnrollmentCheckMemberNumberDefaultResponse = {
            success,
            messages: [errorMessage],
        };
        return errorResponseData;
    }
    const { memberNumber, isValid, validationMessage, inUse, memberNumberType } = data;
    const successResponseData: EnrollmentCheckMemberNumberDefaultResponse = {
        success,
        data: {
            memberNumber,
            isValid,
            validationMessage,
            inUse,
            memberNumberType,
        },
        messages: [`CheckMN mock response: type ${memberNumberType}, valid ${isValid}, inUse ${inUse}`],
    };
    return successResponseData;
}
