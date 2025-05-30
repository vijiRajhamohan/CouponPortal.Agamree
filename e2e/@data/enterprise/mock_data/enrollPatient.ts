import { Moment } from 'moment';
import { MN, dualMN, medicalMN, pharmacyMN } from '../../shared/memberNumbers';
import { EnrollmentStatus, EnrollmentEligibility } from '../../shared/enrollments';
import { rolling365 } from '../../shared/dates';

interface IEnrollmentData {
    enrollment: {
        status: EnrollmentStatus;
        endDate: Moment | Date;
        memberNumbers: MN[];
        evaluationResult: { eligibility: EnrollmentEligibility };
    };
}

class EnrollmentData {
    success: boolean;
    data?: object;
    constructor(success: boolean, data?: object) {
        this.success = success;
        this.data = data;
    }
}

class Enrollment extends EnrollmentData {
    constructor(enrollmentData: IEnrollmentData) {
        super(true, enrollmentData);
    }
}

function createEnrollment(
    status: EnrollmentStatus,
    endDate: Moment,
    memberNumbers: MN[],
    eligibility: EnrollmentEligibility
): IEnrollmentData {
    return {
        enrollment: {
            status,
            endDate,
            memberNumbers,
            evaluationResult: { eligibility },
        },
    };
}

function createValidEnrollment(memberNumbers: MN[]): IEnrollmentData {
    return createEnrollment(6, rolling365, memberNumbers, 1);
}

export const validEnrollments = {
    enrollmentDualMN: new Enrollment(createValidEnrollment(dualMN)),
    enrollmentMedical: new Enrollment(createValidEnrollment([medicalMN])),
    enrollmentPharmacy: new Enrollment(createValidEnrollment([pharmacyMN])),
};

export const enrollmentError = new EnrollmentData(false);
