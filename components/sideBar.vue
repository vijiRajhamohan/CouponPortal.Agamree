<template>
    <v-navigation-drawer :v-model="drawer" left app :color="styles.secondaryBright" height="100%" class="sideBar-internal">
        <v-list dense nav>
            <v-list-item>
                <v-list-item-icon class="menu-icon" @click="handleMiniClick()">
                    <fa-icon size="1x" :icon="$icons.faBars" />
                </v-list-item-icon>
            </v-list-item>
            <v-list-item @click="sendTo('/Dashboard')">
                <v-list-item-icon>
                    <fa-icon size="1x" :icon="$icons.faHomeAlt" />
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-expansion-panels v-model="panelIndex" flat accordion>
            <v-expansion-panel>
                <v-expansion-panel-header :color="styles.secondary">
                    <v-list-item-icon>
                        <fa-icon size="1x" :icon="$icons.faUserMd" />
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-card-text>Practice Information</v-card-text>
                    </v-list-item-content>
                    <template v-slot:actions>
                        <img v-once :src="$settings.url($settings.triangleDown)" class="mini-triangle" />
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-list dense nav>
                        <v-list-item>
                            <v-list-item-content @click="sendTo('/account/register')">
                                <v-list-item-title>Update Practice Information</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header :color="styles.secondary">
                    <v-list-item-icon width="40px">
                        <fa-icon size="1x" :icon="$icons.faListAlt" />
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-card-text>HCP Information</v-card-text>
                    </v-list-item-content>
                    <template v-slot:actions>
                        <img v-once :src="$settings.url($settings.triangleDown)" class="mini-triangle" />
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-list dense nav>
                        <v-list-item>
                            <v-list-item-content @click="sendTo('/enrollment/hcp-information')">
                                <v-list-item-title>Enroll HCP in Portal</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item :disabled="true">
                            <v-list-item-content>
                                <v-list-item-title>HCP Details</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header :color="styles.secondary">
                    <v-list-item-icon width="40px">
                        <fa-icon size="1x" :icon="$icons.faUser" />
                    </v-list-item-icon>

                    <v-card-text>Patient Information</v-card-text>
                    <template v-slot:actions>
                        <img v-once :src="$settings.url($settings.triangleDown)" class="mini-triangle" />
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-list dense nav>
                        <v-list-item>
                            <v-list-item-content @click="sendTo('/eligibility')">
                                <v-list-item-title>Enroll Patient in Program</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content @click="sendTo('/patient-information/patient-search')">
                                <v-list-item-title>Search/Update Enrolled Patient Information</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header :color="styles.secondary">
                    <v-list-item-icon>
                        <fa-icon size="1x" :icon="$icons.faFileAlt" />
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-card-text>Claim Information</v-card-text>
                    </v-list-item-content>
                    <template v-slot:actions>
                        <img v-once :src="$settings.url($settings.triangleDown)" class="mini-triangle" />
                    </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-list dense nav>
                        <v-list-item>
                            <v-list-item-content @click="sendTo('/claim/submit-claim')">
                                <v-list-item-title>Submit Claim & EOB Documenation</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item :disabled="true">
                            <v-list-item-content>
                                <v-list-item-title>View Claim Status</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-navigation-drawer>
</template>

<style lang="scss" scoped>
@import '~/assets/style/variables.scss';

* {
    color: var(--color-primary) !important;
}
.v-navigation-drawer {
    box-shadow: -5px 0px 5px -5px #e6e6e8;
}
.v-expansion-panel-content {
    background-color: #ffffff !important;
}
.v-expansion-panel {
    margin-top: 0px !important;
}
.v-expansion-panel-header {
    padding: 3px 11px !important;
    background-color: #ffffff !important;
}
.v-expansion-panel-header--active {
    background-color: #ffffff !important;
}
.v-list {
    padding: 0px !important;
}
.v-expansion-panel::before {
    box-shadow: none !important;
}
.v-application,
.v-navigation-drawer__content {
    background-color: #ffffff !important;
}
.v-list-item__icon {
    max-width: 19px;
    min-width: 19px;
}
.sideBar-internal {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.v-card__text {
    padding: 0;
}
.menu-icon {
    padding-left: 4px;
}
</style>

<style lang="scss">
.v-navigation-drawer__content {
    background-color: #ffffff !important;
    padding-left: 6px !important;
}
.theme--light.v-expansion-panels .v-expansion-panel:not(:first-child)::after {
    border: none;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { faDollarSign, faUser, faHomeAlt, faBars, faUserMd, faListAlt, faFileAlt } from '@fortawesome/pro-regular-svg-icons';
import { Resolve } from 'vue-di';
import { Title } from '~/decorators/Title';
import SessionModule from '~/store/session';
import styles from '~/assets/style/variables.scss';
import LoginModule from '~/store/login';

@Component<SideBar>({
    layout: 'default',
    icons: {
        faDollarSign,
        faUser,
        faHomeAlt,
        faBars,
        faUserMd,
        faListAlt,
        faFileAlt,
    },
})
export default class SideBar extends Vue {
    @Resolve
    public login!: LoginModule;

    styles = styles;
    private _drawer = true;
    miniVariant = false;
    right = false;
    left = true;
    panel = [];
    panelIndex = {};

    @Watch('panelIndex')
    watchPanelIndex() {
        if (this.miniVariant && this.panelIndex >= 0) {
            this.miniVariant = false;
        }
    }

    handleMiniClick() {
        this.miniVariant = !this.miniVariant;

        if (this.miniVariant && this.panelIndex >= 0) {
            this.panelIndex = -1;
            this.miniVariant = true;
        }
    }

    get drawer() {
        return this.login.isAuthenticated ? this._drawer : false;
    }

    set drawer(value: boolean) {
        this._drawer = value;
    }

    // get icons() {
    //     return this.$vuetify.icons.values.radioOn;
    // }

    get menuItems() {
        return [
            {
                icon: 'fal fa-home',
                text: 'Home',
            },
        ];
    }

    sendTo(page: string) {
        this.$router.push({ path: page });
    }
}
</script>
