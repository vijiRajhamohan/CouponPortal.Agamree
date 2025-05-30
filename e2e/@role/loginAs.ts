import VueSelector from 'testcafe-vue-selectors';
import { Role } from 'testcafe';
import * as faker from 'faker';
import { toNumber, reverse } from 'lodash';
import { Model } from '../@tools/model';
import { clearState } from '../@tools/clearState';
import { createFormFieldModel } from '../@tools/createFormFieldModel';
import { isMobile } from '../@tools/mobile';
import { waitForPageToLoad } from '../@tools/waitForPageToLoad';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

const model = {
    firstName: createFormFieldModel('ref:firstName'),
    lastName: createFormFieldModel('ref:lastName'),
    dateOfBirth: VueSelector('ref:dateOfBirth v-text-field').find('input'),
    gender: createFormFieldModel('ref:gender'),
    genderItem: VueSelector('ref:gender v-list'),
    email: createFormFieldModel('ref:email'),
    zip: createFormFieldModel('ref:zip'),
    password: createFormFieldModel('ref:password'),
    confirmPassword: createFormFieldModel('ref:confirmPassword'),
};

export async function createUser(seed = 1337) {
    const today = seed + toNumber(moment().format('WWEGG'));
    faker.seed(today + Math.ceil(Math.random() * 100));

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    return {
        firstName,
        lastName,
        email: 'Johanna.Rolfson47@e2e.trialcard.com', // faker.internet.email(firstName, lastName, 'e2e.trialcard.com'),
        zip: faker.address.zipCode(),
        dateOfBirth: faker.date.past(
            10,
            moment()
                .subtract(18, 'y')
                .toDate()
        ),
        gender: faker.random.boolean() ? ('male' as const) : ('female' as const),
    };
}

export function loginAs(userValue: ReturnType<typeof createUser>) {
    return Role(Model.getUrlTo('/account/login'), async t => {
        const user = await userValue;
        return waitForPageToLoad(
            t
                // .typeText(model.firstName, user.firstName)
                // .typeText(model.lastName, user.lastName)
                // .click(model.gender)
                // .click(model.genderItem.child(user.gender === 'female' ? 1 : 0))
                .click(model.email.find('input'))
                .typeText(model.email.find('input'), user.email)
                // .typeText(model.dateOfBirth, moment(user.dateOfBirth).format((await isMobile()) ? 'YYYY-MM-DD' : 'MM/DD/YYYY'))
                // .pressKey('tab')
                // .typeText(model.zip, user.zip)
                .typeText(model.password, 'Password1!')
                // .typeText(model.confirmPassword, 'Password1!')
                .pressKey('enter')
                .wait(3000)
            // TODO: Figure out how to find out after the user is logged in...
        );
    });
}

export function loginFixture(t: FixtureFn, { user, returnTo }: { user: ReturnType<typeof createUser>; returnTo: string }) {
    t.beforeEach(async t => {
        await clearState(t);
        await t.useRole(loginAs(user));
        await t.navigateTo(returnTo);
        await waitForPageToLoad(t);
    }).afterEach(async t => {
        await clearState(t);
    });
}

// export function loginAs(user: ReturnType<typeof createUser>) {
//     return Role(Model.getUrlTo('/account/register'), async t => {
//         return (
//             t
//                 .typeText(model.firstName, user.firstName)
//                 .typeText(model.lastName, user.lastName)
//                 .click(model.gender)
//                 .click(model.genderItem.child(user.gender === 'female' ? 1 : 0))
//                 .typeText(model.dateOfBirth, moment(user.dateOfBirth).format((await isMobile()) ? 'YYYY-MM-DD' : 'MM/DD/YYYY'))
//                 .pressKey('tab')
//                 .typeText(model.email, user.email)
//                 .typeText(model.zip, user.zip)
//                 .typeText(model.password, 'Password1!')
//                 .typeText(model.confirmPassword, 'Password1!')
//                 .pressKey('enter')
//                 // TODO: Figure out how to find out after the user is logged in...
//                 .wait(3000)
//         );
//     });
// }

// export function loginFixture(t: FixtureFn, { user, returnTo }: { user: ReturnType<typeof createUser>; returnTo: string }) {
//     t.beforeEach(async t => {
//         await clearState(t);
//         await t.useRole(loginAs(user)).navigateTo(returnTo);
//         await waitForPageToLoad(t);
//     }).afterEach(async t => {
//         await clearState(t);
//     });
// }
