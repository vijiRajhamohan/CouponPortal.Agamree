// fake data
import * as faker from 'faker/locale/en_US';
import randomizers from './randomizers';

// type definition for overwrites
interface ICaregiverOpts {
    caregiverFirstName?: string;
    caregiverLastName?: string;
    caregiverZip?: string;
    caregiverEmail?: string;
    caregiverPhoneNumber?: string;
    caregiverRelationship?: string;
}

// creates a new patient object
export default class Caregiver {
    // initializes new patient object with default values
    constructor(overwrites?: ICaregiverOpts) {
        this.caregiverFirstName = `CaregiverFN_${faker.name.firstName()}`;
        this.caregiverLastName = `CaregiverLN_${faker.name.lastName()}`;
        this.caregiverZip = randomizers.getZip();
        this.caregiverEmail = `CaregiverEmail_${faker.internet.email()}`;
        this.caregiverPhoneNumber = randomizers.getPhone();
        this.caregiverRelationship = randomizers.getPatientRelationship();

        if (overwrites) {
            Object.assign(this, overwrites);
        }
    }
    // defines properties on patient object
    caregiverFirstName: string;
    caregiverLastName: string;
    caregiverZip: string;
    caregiverEmail: string;
    caregiverPhoneNumber: string;
    caregiverRelationship: string;
}
