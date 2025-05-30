<template>
    <v-navigation-drawer
        ref="drawer_config"
        v-model="isCollapsed"
        width="350"
        dark
        app
        class="main-menu"
        :mobile-break-point="$vuetify.breakpoint.thresholds.sm"
    >
        <v-expansion-panels v-model="panelIndex" flat accordion>
            <LayoutSection :icon="$icons.faLineColumns" />
            <PagesSection :icon="$icons.faMap" />
            <FeatureSection :icon="$icons.faLayerPlus" />
            <HeaderSection :icon="$icons.faHeadSide" />
            <FooterSection :icon="$icons.faShoePrints" />
            <ButtonSection :icon="$icons.faAdjust" />
            <ColorSection :icon="$icons.faPalette" />
            <BackgroundSection :icon="$icons.faImage" />
            <LogoSection :icon="$icons.faUpload" />
            <TextSection :icon="$icons.faText" />
            <v-autocomplete
                ref="configuration-select"
                v-model="configurationName"
                class="ma-2"
                :items="configurations"
                item-text="name"
                item-value="name"
                label="Load Configuration"
                outlined
                clearable
                role="combobox"
                :disabled="isDirty"
                @change="layout.selectConfigurationFromStorage(configurationName)"
                @click:clear.stop.prevent="$nextTick(handleDelete)"
            />
            <v-btn block class="mb-2" :disabled="!isDirty" @click="handleSave">Save Configuration</v-btn>
            <v-btn block class="mb-2" :disabled="!isDirty" @click="handleClear">Reset Configuration</v-btn>
            <v-btn block class="mb-2" :disabled="shouldBlockExport" @click="handleClick('export')">Export Configuration</v-btn>
            <v-btn block class="mb-2" @click="handleClick('import')">Import Configuration</v-btn>
            <v-dialog v-model="dialogueShouldOpen" persistent max-width="500px">
                <v-card class="pa-10">
                    <v-row justify="center">
                        <v-card-title class="headline">{{ titleCase(submissionType) }}</v-card-title>
                        <v-card-text class="increaseFont text-center">{{ dialogueText }}</v-card-text>
                        <v-textarea
                            ref="importExportInput"
                            v-model="importExportString"
                            :readonly="submissionType === 'export'"
                            autofocus
                            class="importExportTextArea"
                        />
                    </v-row>
                    <v-row justify="end">
                        <v-card-actions>
                            <v-btn color="primary" outlined @click="dialogueShouldOpen = false">Close</v-btn>
                            <v-btn v-if="submissionType === 'import'" color="primary" @click="handleSubmit">Import</v-btn>
                            <v-btn v-if="submissionType === 'export'" color="primary" @click.stop.prevent="copyExportString">Copy</v-btn>
                        </v-card-actions>
                    </v-row>
                </v-card>
            </v-dialog>
        </v-expansion-panels>
    </v-navigation-drawer>
</template>

<style lang="scss" scoped>
@import '~/assets/style/variables.scss';
</style>

<style lang="scss">
.main-menu {
    .v-input .v-label {
        color: white;
    }
    .header-icon {
        margin-right: 10px;
    }
    .v-expansion-panel {
        border-bottom: 1px solid rgba(0, 0, 0, 0.8);
    }
    .v-expansion-panel-header:hover {
        background: #363636;
    }
    .v-expansion-panel-header--active {
        background: #363636;
    }
    .v-text-field__details {
        display: none;
    }
}
.importExportTextArea {
    border: 1px solid $primary;
    padding: 10px;
}
.increaseFont {
    font-size: 16px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';
import { Resolve } from 'vue-di';
import {
    faLineColumns,
    faLayerPlus,
    faHeadSide,
    faShoePrints,
    faPalette,
    faImage,
    faUpload,
    faAdjust,
    faText,
    faMap,
} from '@fortawesome/pro-regular-svg-icons';
import { isEqual } from 'lodash';
import {
    ColorSection,
    FooterSection,
    HeaderSection,
    ButtonSection,
    FeatureSection,
    LogoSection,
    LayoutSection,
    BackgroundSection,
    TextSection,
    PagesSection,
} from './sections';
import LayoutModule from '~/store/layout';
import DocumentModule from '~/store/document';
import { CommonTools } from '~/components/tools/commonTools';

@Component<ConfigurationDrawer>({
    layout: 'default',
    components: {
        ColorSection,
        FooterSection,
        HeaderSection,
        LayoutSection,
        ButtonSection,
        FeatureSection,
        LogoSection,
        BackgroundSection,
        TextSection,
        PagesSection,
    },
    icons: {
        faLineColumns,
        faLayerPlus,
        faHeadSide,
        faShoePrints,
        faPalette,
        faImage,
        faUpload,
        faAdjust,
        faText,
        faMap,
    },
})
export default class ConfigurationDrawer extends Vue {
    @Resolve
    public layout!: LayoutModule;

    @Resolve
    public document!: DocumentModule;

    panel = [];
    panelIndex = {};
    dialogueText = '';
    importExportString = '';
    submissionType = '';
    dialogueShouldOpen = false;
    titleCase = CommonTools.titleCase;

    @Watch('layout.drawer')
    async updateDropdown() {
        await this.updateConfigDropdown();
    }

    public configurationName = 'default';
    public configurations: string[] = [];

    public get isCollapsed() {
        return this.layout.drawer;
    }

    public set isCollapsed(v) {
        if (!v) {
            this.panel = [];
            this.panelIndex = {};
        }
        this.layout.setDrawer(v);
    }

    public get shouldBlockExport() {
        return this.layout.configuration.configurationName === 'default' || this.isDirty;
    }

    public get isDirty() {
        const pristineConfig = this.layout.loadedConfiguration;
        const workingConfig = this.layout.configuration;
        return !isEqual(pristineConfig, workingConfig);
    }

    public async updateConfigDropdown() {
        const keys = (await this.layout.getLocalForageKeys()) || ['default'];
        this.configurations = keys.filter(key => key !== 'vuex');
    }

    public async handleSave() {
        const newConfigurationName = prompt('Save configuration as...', this.layout.configuration.configurationName);
        if (newConfigurationName) {
            this.saveConfiguration(newConfigurationName);
        } else {
            alert('Your configuration has NOT been saved.  Please try again.');
        }
    }

    public async saveConfiguration(configurationName: string) {
        if (configurationName === 'default') {
            alert('Cannot overwrite default configuration. Please try again');
            return;
        }
        this.configurationName = configurationName;
        await this.layout.saveConfigurationToStorage(configurationName);
        await this.updateConfigDropdown();
    }

    public async handleClear() {
        let shouldClear = false;
        if (this.isDirty) {
            shouldClear = confirm('Are you sure you want to undo your recent changes?  Your unsaved work will be lost!');
        }
        if (shouldClear) {
            this.layout.resetConfiguration();
        }
    }

    public async handleClick(type: 'import' | 'export') {
        this.importExportString = '';
        this.submissionType = type;
        this.dialogueShouldOpen = true;
        this.dialogueText =
            type === 'export'
                ? 'This configuration is currently only available in this browser.  Click the "Copy" button to copy the data below and use it to import this configuration into another browser.'
                : 'Please enter a valid import string';
        if (type === 'export') await this.handleExport();
    }

    public async handleSubmit() {
        this.dialogueShouldOpen = false;
        if (!this.importExportString) return;
        if (this.submissionType === 'import') await this.handleImport();
    }

    public async handleExport() {
        this.$wait.start('nuxt');
        try {
            const configNoImages = { ...this.layout.configuration };
            delete configNoImages.images;
            const { header, footer, cardArt } = this.layout.configuration.images;
            let base64String = btoa(JSON.stringify(configNoImages));
            base64String += `?${header}?${footer}?${cardArt}`;
            this.importExportString = base64String;
        } catch {
            alert('There was an error exporting your configuration.  Please try again later.');
        }
        this.$wait.end('nuxt');
    }

    public async handleImport() {
        this.$wait.start('nuxt');
        const base64String = this.importExportString;
        if (base64String && typeof base64String === 'string') {
            try {
                const [pureBase64, header, footer, cardArt] = base64String.split('?');
                const deserializedConfig = atob(pureBase64);
                const configuration = {
                    ...JSON.parse(deserializedConfig),
                    images: {
                        header,
                        footer,
                        cardArt,
                    },
                };
                const importedObjKeys = Object.keys(configuration);
                const defaultObjKeys = Object.keys(this.layout.defaultConfiguration);
                const isConfigObj = defaultObjKeys.every(key => importedObjKeys.includes(key));
                if (isConfigObj) {
                    this.layout.setConfiguration(configuration);
                    this.configurationName = configuration.configurationName;
                    alert(`Configuration "${configuration.configurationName}" successfully imported.`);
                }
            } catch {
                alert(
                    'There was a problem importing your configuration.  Please ensure that it is a valid exported configuration and try again.'
                );
            }
        }
        this.$wait.end('nuxt');
    }

    public async handleDelete() {
        const { configurationName } = this.layout.configuration;
        if (configurationName === 'default') {
            alert('Cannot delete default configuration');
            setTimeout(() => {
                this.configurationName = 'default';
            }, 0);
            return;
        }
        const shouldDelete = prompt(
            `Are you sure you want to delete configuration "${configurationName}"?  This action cannot be undone.  To delete, type "DELETE" in the box below:`
        );
        if (shouldDelete && shouldDelete.toUpperCase() === 'DELETE') {
            await Promise.all([
                await this.layout.deleteConfiguration(configurationName),
                await this.updateConfigDropdown(),
                await this.layout.clearConfiguration(),
            ]);
            this.configurationName = 'default';

            alert(`Configuration "${configurationName}" successfully deleted.`);
        } else {
            alert('Deletion unsuccessful.');
        }
    }

    copyExportString() {
        try {
            const textToCopy = (this.$refs.importExportInput as any).$el.querySelector('textarea');
            textToCopy.select();
            document.execCommand('copy');
        } catch (error) {
            alert('Oops, unable to copy');
        }
    }
    // TODO: Cizplam configurable options future expansion
    // control button sizing
    // ability to add background images
    // draggable resizing
    // drag and drop logo uploads
    // DONE - vuetify color pickers
    // Header link options
    // right click contextmenu for individual element editing
}
</script>
