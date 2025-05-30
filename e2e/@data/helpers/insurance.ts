// fake data
import * as faker from 'faker/locale/en_US';
import { pharmacyMN } from '../shared/memberNumbers'
import randomizers from './randomizers';

// type definition for med insurance overwrites
interface IMedicalInsuranceOpts {
    state?: string;
    carrier?: string;
    phone?: string;
    firstName?: string;
    lastName?: string
    planName?: string;
    groupNumber?: string;
    policyNumber?: string;
}

// type definition for pharma insurance overwrites
interface IPharmacyInsuranceOpts {
    memberId?: string;
    pbmName?: string;
    state: string;
    groupNumber: string;
    binNumber: string;
    pcnNumber: string;
}

// creates new med insurance object
export class MedicalInsuranceItem {
    // initializes new med insurance object with default values
    constructor(overwrites?: IMedicalInsuranceOpts) {
        this.state = faker.address.state();
        this.carrier = `MedCarrier_${faker.random.number()}`;
        this.phone = randomizers.getPhone()
        this.firstName = `MedHolderFN_${faker.name.firstName()}`
        this.lastName = `MedHolderLN_${faker.name.lastName()}`
        this.planName = `${faker.random.number()}`
        this.groupNumber = `${faker.random.number()}`
        this.policyNumber = `${faker.random.number()}`

        if(overwrites) {
            Object.assign(this, overwrites);
        }
    }
    // defines properties on med insurance object
    state: string;
    carrier: string;
    phone: string;
    firstName: string;
    lastName: string;
    planName: string;
    groupNumber: string;
    policyNumber: string;
}

// creates new pharma insurance object
export class PharmacyInsuranceItem {
    // initializes new pharma insurance object with default values
    constructor(overwrites?: IPharmacyInsuranceOpts) {
        this.memberId = pharmacyMN.number;
        this.pbmName = `PBM_${faker.random.number()}`;
        this.state = faker.address.state();
        this.groupNumber = `${faker.random.number()}`;
        this.binNumber = `${faker.random.number()}`;
        this.pcnNumber = `${faker.random.number()}`;

        if(overwrites) {
            Object.assign(this, overwrites);
        }
    }
    // defines properties on pharma insurance object
    memberId: string;
    pbmName: string;
    state: string;
    groupNumber: string;
    binNumber: string;
    pcnNumber: string;
}
