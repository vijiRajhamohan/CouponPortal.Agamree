import { CardMemberNumberStatusResultModelResponse } from '@trialcard/apigateway.models';
import { pharmacyMN, medicalMN } from '../../shared/memberNumbers';
import { today, endOfNextYear } from '../../shared/dates'

export const mnStatusData = {
    inactivePharmacy: createMNStatus(true, 'Inactive', 'Pharmacy'),
    activePharmacy: createMNStatus(true, 'Active', 'Pharmacy'),
    inactiveMedical: createMNStatus(true, 'Inactive', 'Medical'),
    activeMedical: createMNStatus(true, 'Active', 'Medical'),
    errorNotFound: createMNStatus(false),
};

type MNStatus = 'Inactive' | 'Active'
type MNType = 'Pharmacy' | 'Medical'

function createMNStatus(success: boolean, mnStatus?: MNStatus, mnType?: MNType) {
    if(!success) {
        const errorResponseData: CardMemberNumberStatusResultModelResponse = {
            success,
            messages: ['FailureMemberNumberNotFound Mock Response']
        }
        return errorResponseData
    }
    const mnStatusId = mnStatus === 'Inactive' ? '1' : '29'
    const memberNumber = (mnType === 'Pharmacy' ? pharmacyMN : medicalMN).number
    const successResponseData: CardMemberNumberStatusResultModelResponse = {
        success,
        data: {
            redemptions: 0,
            memberNumberStatus: mnStatus,
            memberNumberStatusId: mnStatusId,
            memberNumberType: mnType,
            pcn: '12345678',
            bin: '123456',
            cardActivationDate: today,
            cardEndDate: endOfNextYear,
            sponsorNumber: '01234567',
            memberNumber,
            groupNumber: '87654321',
            totalBenefitAmount: 0,
            remainingBenefitAmount: 0,
            totalPaidAmount: 0,
            accumulators: [],
        },
        messages: [`MN status ${mnStatus} ${mnType} mock response`]
    }
    return successResponseData
}
