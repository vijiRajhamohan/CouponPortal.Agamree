import { Gender } from '@trialcard/enums';

export default [
    { id: Gender.M, name: 'Male', code: Gender[Gender.M] },
    { id: Gender.F, name: 'Female', code: Gender[Gender.F] },
    { id: Gender.UNKN, name: 'Other/Prefer not to say', code: Gender[Gender.UNKN] },
    // { id: Gender.I, name: 'Indeterminate', code: Gender[Gender.I] },
];
