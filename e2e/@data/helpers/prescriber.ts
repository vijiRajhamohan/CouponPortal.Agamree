// fake data
import * as faker from 'faker/locale/en_US';
import randomizers from './randomizers';

// type checking
interface IPrescriberOpts {
    prescriberFirstName?: string;
    prescriberLastName?: string;
    practiceName?: string;
}

// define object class
export default class Prescriber {
    // initialize properties
    constructor(overwrites?: IPrescriberOpts) {
        this.prescriberFirstName = `PrescriberFN_${faker.name.firstName()}`;
        this.prescriberLastName = `PrescriberLN_${faker.name.lastName()}`;
        this.practiceName = faker.company.companyName();

        if (overwrites) {
            Object.assign(this, overwrites);
        }
    }

    // declare properties
    prescriberFirstName: string;
    prescriberLastName: string;
    practiceName: string;
}
