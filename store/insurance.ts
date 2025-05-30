import { Mutation } from 'vuex-module-decorators';
import { InjectModule, InjectVuexModule } from 'vue-di/vuex';
import { OnClear } from '~/services/clearModule';
import { clearRecords } from '~/services/clearRecords';

@InjectModule({ stateFactory: true }, module)
@OnClear<InsuranceModule>(async value => value.clear())
export default class InsuranceModule extends InjectVuexModule {
    public primaryMedicalInsurance = {
        state: null as string | null,
        carrier: null as string | null,
        phone: null as string | null,
        firstName: null as string | null,
        lastName: null as string | null,
        planName: null as string | null,
        groupNumber: null as string | null,
        policyNumber: null as string | null,
        isPrimaryMedicalSaved: null as boolean | null,
    };

    public secondaryMedicalInsurance = {
        state: null as string | null,
        carrier: null as string | null,
        phone: null as string | null,
        firstName: null as string | null,
        lastName: null as string | null,
        planName: null as string | null,
        groupNumber: null as string | null,
        policyNumber: null as string | null,
        isSecondaryMedicalSaved: null as boolean | null,
    };

    public primaryPharmacyInsurance = {
        state: null as string | null,
        pbmName: null as string | null,
        memberID: null as string | null,
        groupID: null as string | null,
        binNumber: null as string | null,
        pcnNumber: null as string | null,
        isPrimaryPharmacySaved: null as boolean | null,
    };

    @Mutation
    public clear() {
        clearRecords(this.primaryMedicalInsurance);
        clearRecords(this.secondaryMedicalInsurance);
        clearRecords(this.primaryPharmacyInsurance);
    }

    // TODO: NEED TO DRY UP SAVE/EDIT/DELETE/CLEAR CODE

    @Mutation
    public savePrimaryMedical(primaryMedical: typeof InsuranceModule.prototype.primaryMedicalInsurance) {
        Object.assign(this.primaryMedicalInsurance, primaryMedical);
    }
    @Mutation
    public saveSecondaryMedical(secondaryMedical: typeof InsuranceModule.prototype.secondaryMedicalInsurance) {
        Object.assign(this.secondaryMedicalInsurance, secondaryMedical);
    }
    @Mutation
    public savePrimaryPharmacy(primaryPharmacy: typeof InsuranceModule.prototype.primaryPharmacyInsurance) {
        Object.assign(this.primaryPharmacyInsurance, primaryPharmacy);
    }
}
