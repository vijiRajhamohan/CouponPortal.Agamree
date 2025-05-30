// fake data
import * as faker from 'faker/locale/en_US';
import randomizers from './randomizers';

// type definition for overwrites
interface IPatientOpts {
    firstName?: string;
    lastName?: string;
    addressOne?: string;
    addressTwo?: string;
    zip?: string;
    city?: string;
    state?: string;
    gender?: string;
    dateOfBirth?: string;
    email?: string;
    phoneNumber?: string;
    cellPhone?: string;
}

// creates a new patient object
export default class Patient {
    // initializes new patient object with default values
    constructor(overwrites?: IPatientOpts) {
        this.firstName = `PatientFN_${faker.name.firstName()}`
        this.lastName = `PatientLN_${faker.name.lastName()}`
        this.addressOne = `PatientAdd1_${faker.address.streetAddress()}`
        this.addressTwo = `PatientAdd2_${faker.address.secondaryAddress()}`
        this.zip = randomizers.getZip()
        this.city = faker.address.city()
        this.state = faker.address.state()
        this.gender = randomizers.getGender({restrict: ['Male', 'Female']})
        this.dateOfBirth = randomizers.getDob(18, 65)
        this.email = `PatientEmail_${faker.internet.email()}`
        this.phoneNumber = randomizers.getPhone()
        this.cellPhone = randomizers.getPhone()

        if(overwrites) {
            Object.assign(this, overwrites);
        }
    }
    // defines properties on patient object
    firstName: string;
    lastName: string;
    addressOne: string;
    addressTwo: string;
    zip: string;
    city: string;
    state: string;
    gender: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    cellPhone: string;
}
