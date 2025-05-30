import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch, Emit, Prop, Model } from 'vue-property-decorator';
import { Resolve } from 'vue-di';
import { required, email, numeric, helpers, maxLength, minLength, minValue } from 'vuelidate/lib/validators';
import { LocationV1Api } from '@trialcard/apigateway.client';
import { first } from 'lodash';
import { Gender } from '@trialcard/enums';
import moment, { Moment, isMoment } from 'moment';
import { Validation } from 'vuelidate';
import { phone, zip } from '~/services/validations';
import TcDatePicker from '~/components/TcDatePicker.vue';
import { Validate } from '~/validation/Validate';
import states from '~/assets/states.json';
import genders from '~/assets/genders';

@Component<PatientInformation>({
    components: { TcDatePicker },
})
export default class PatientInformation extends Vue {
    public states = states;
    public genders = genders.filter(x => x.name === 'Male' || x.name === 'Female');

    @Resolve
    public location!: LocationV1Api;

    @Validate({ required, maxLength: maxLength(100) })
    public address1 = '';

    @Validate({ maxLength: maxLength(50) })
    public address2 = '';

    @Validate({ required })
    public gender: Gender | null = null;

    @Validate({ required })
    public dob: Moment | string | null = null;

    @Validate({ required, zip })
    public zip = '';

    @Validate({ required, maxLength: maxLength(25) })
    public city = '';

    @Validate({ required })
    public state = '';

    @Validate({ required, numeric, phone })
    public phone = '';

    @Validate({ required, maxLength: maxLength(50) })
    public firstName = '';

    @Validate({ required, maxLength: maxLength(50) })
    public lastName = '';

    @Validate({ required, email, maxLength: maxLength(50) })
    public emailAddress = '';

    @Watch('zip')
    public async watchZip(code: string) {
        if (!code || code.length < 5) return;
        const result = await this.location.getCitiesByZip(code);
        const location = first(result.data.data);
        if (location) {
            this.city = location.cityName!;
            this.state = location.stateAbbr!;
        }
    }
}
