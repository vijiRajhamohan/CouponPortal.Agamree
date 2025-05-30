import { medicalMN, pharmacyMN } from '../../shared/memberNumbers';

interface IEnrollmentData {
    bin: string;
    memberNumber: string;
    groupNumber: string;
}

class Enrollment {
    success: boolean;
    messages: string[];
    data?: IEnrollmentData;
    constructor(success: boolean, messages: string[], data?: IEnrollmentData) {
        this.success = success;
        this.messages = messages;
        this.data = data;
    }
}

class SuccessEnrollment extends Enrollment {
    constructor(enrollmentData: IEnrollmentData) {
        super(true, [], enrollmentData);
    }
}

function createEnrollment(memberNumber: string): IEnrollmentData {
    return {
        bin: '123456',
        memberNumber,
        groupNumber: '12345678',
    };
}

export const basicEnrollmentData = {
    medical: new SuccessEnrollment(createEnrollment(medicalMN.number)),
    pharmacy: new SuccessEnrollment(createEnrollment(pharmacyMN.number)),
    error: new Enrollment(false, ['mock error response']),
};
