import { Mutation, Action } from 'vuex-module-decorators';
import { InjectModule, InjectVuexModule } from 'vue-di/vuex';
import { Resolve } from 'vue-di';
import localForage from 'localforage';
// import { Theme } from 'vuetify/types/services/theme'
import { OnClear } from '~/services/clearModule';
import { Settings } from '~/services/settings';

@InjectModule({ stateFactory: true }, module)
@OnClear<LayoutModule>(async value => value.clear())
export default class LayoutModule extends InjectVuexModule {
    @Resolve
    public settings!: Settings;

    // Method that gathers all DOM nodes, searches for the current programName
    // and replaces it with the new programName
    // @Action({ rawError: true })
    public replaceProgramName(programName: string, previousProgramName: string) {
        // If programName is an empty string
        if (!programName.trim()) {
            programName = this.settings.name;
        }

        const elements: NodeListOf<Element> = document.querySelectorAll('*');
        // Regex only matches the whole word if it is followed and preceeded by whitespace or non word characters
        // This ensures that sections of words are not replaced if programName is a match
        const re = new RegExp(`(?<=^|\\W|\\s)(${this.settings.name}|${previousProgramName})(?=\\W|\\s|$)`, 'ig');
        elements.forEach(element => {
            element.childNodes.forEach(child => {
                if (child.nodeType === 3 && typeof child.nodeValue === 'string') {
                    child.nodeValue = child.nodeValue.replace(re, programName);
                }
            });
        });
        // store programName as previousProgramName once it has been changed
        if (programName !== this.previousProgramName) {
            this.setPreviousProgramName(programName);
        }
    }

    public defaultConfiguration = {
        configurationName: 'default',
        footerType: 'scrolling',
        headerStyle: 'scrolling',
        logoPosition: 'start',
        isOutlined: false,
        isRounded: false,
        isProgressTracker: false,
        isHaveACard: true,
        isReimbursement: false,
        isMarketingOptIn: false,
        hasConditionalFields: false,
        hasDatePicker: false,
        landingPageAlignment: 'center',
        hasHeaderBottomBar: false,
        bottomBarHeight: '5',
        images: {
            header: '',
            footer: '',
            cardArt: '',
        },
        showFooterLogo: false,
        footerInfoLinkLocation: 'top',
        programName: 'Cizplam',
        colors: {
            primary: '#122f54',
            primaryLight: '#4ca3d8',
            secondary: '#003c60',
            secondaryBright: '#23759e',
            accent: '#c41230',
            neutralLight: '#d9d9d9',
            neutralBright: '#fdfdfd',
            success: '#009245',
            brandGrey: '#333333',
            active: '#59a2c1',
            mainBackground: '#fff',
            headerBackground: '#fff',
        },
        pages: [
            'eligibility',
            'patient-information',
            'success',
        ],
        otherPages: [
            'select-path',
            'prescriber-information',
            'insurance-information',
        ]
    };
    public configuration = { ...this.defaultConfiguration };
    public loadedConfiguration = { ...this.defaultConfiguration };
    public loadedConfigurationName = 'default';
    public drawer = false;
    public drawerWidth = 500;
    public mini = false;
    public previousProgramName = 'Cizplam';
    public theme = {} as any;
    @Action({ rawError: true })
    public async saveConfigurationToStorage(configurationName: string) {
        this.setConfiguration({ ...this.configuration, configurationName });
        await localForage.setItem(configurationName, this.configuration);
        this.setLoadedConfiguration(this.configuration);
    }

    @Action({ rawError: true })
    public async clearConfiguration() {
        this.setConfiguration(this.defaultConfiguration);
        this.setLoadedConfiguration(this.defaultConfiguration);
    }

    @Action({ rawError: true })
    public async resetConfiguration() {
        this.setConfiguration(this.loadedConfiguration);
    }

    @Action({ rawError: true })
    public async getLocalForageKeys() {
        return localForage.keys();
    }

    public async selectConfigurationFromStorage(configurationName = 'default') {
        const configuration = (await localForage.getItem(configurationName)) as typeof LayoutModule.prototype.configuration;
        if (configuration) {
            configuration.configurationName = configurationName;
            await this.setPreviousProgramName(this.configuration.programName);
            await this.setConfiguration(configuration);
            await this.setLoadedConfiguration(configuration);
            await this.replaceProgramName(configuration.programName, this.previousProgramName);
        }
    }

    @Action({ rawError: true })
    public async deleteConfiguration(configurationName: string) {
        await localForage.removeItem(configurationName);
    }

    @Mutation
    public setMini(mini: boolean): void {
        this.mini = mini;
    }

    @Mutation
    public toggleMini(): void {
        this.mini = !this.mini;
    }

    @Mutation
    public setDrawer(drawer: boolean): void {
        this.drawer = drawer;
    }

    @Mutation
    public toggleDrawer(): void {
        this.drawer = !this.drawer;
    }

    @Mutation
    public setConfiguration(newConfiguration: Partial<typeof LayoutModule.prototype.configuration>) {
        this.configuration = { ...this.configuration, ...newConfiguration };
    }

    @Mutation
    public setLoadedConfiguration(newLoadedConfiguration: typeof LayoutModule.prototype.configuration) {
        this.loadedConfiguration = { ...newLoadedConfiguration };
    }

    @Mutation
    public setPreviousProgramName(newPreviousProgramName: string) {
        this.previousProgramName = newPreviousProgramName;
    }

    @Mutation
    public setTheme(themeObj: any) {
        this.theme = themeObj;
    }

    @Mutation
    public clear() {
        this.drawer = true;
        this.mini = false;
    }
}
