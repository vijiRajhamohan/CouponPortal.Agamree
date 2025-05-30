export type MN = {
    number: string;
    type: number;
};

export const medicalMN: MN = {
    number: '1A1A1A1A1',
    type: 6,
};

export const pharmacyMN: MN = {
    number: '99999999999',
    type: 7,
};

export const dualMN: MN[] = [medicalMN, pharmacyMN];

export const pharmacyMNPattern = new RegExp(/^(\d{11})$/);

export const medicalMNPattern = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])([a-zA-Z0-9]{9})$/);

export enum MNType {
    // If Membernumber type is Unknown
    Unknown = 0,
    // Medical MemberNumber
    Medical = 6,
    // Pharmacy MemberNumber
    Pharmacy = 7,
}
