<template>
    <div class="image-file-input">
        <v-file-input
            v-model="files[name]"
            accept="image/*"
            :label="label"
            prepend-icon=""
            @change="handleImgChange(name)"
            @keypress.enter="handleImgChange(name, true)">
            <template v-slot:append>
                <v-btn
                    depressed
                    tile
                    class="ma-0"
                    @click="handleImgChange(name, true)">
                    Reset
                </v-btn>
            </template>
        </v-file-input>
    </div>
</template>

<style lang="scss" scoped>
@import '~/assets/style/variables.scss';
</style>

<style lang="scss">
.image-file-input {
    .v-input__icon {
        display: none;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resolve } from 'vue-di';
import { Prop, Watch } from 'vue-property-decorator';
import DocumentModule from '~/store/document';
import LayoutModule from '~/store/layout';

@Component<ImageFileInput>({
    layout: 'default',
})
export default class ImageFileInput extends Vue {
    @Resolve
    public layout!: LayoutModule;

    @Resolve
    public document!: DocumentModule;

    @Prop()
    public name!: 'header' | 'footer' | 'cardArt';

    @Prop()
    public label!: string;

    public files = {
        header: null,
        footer: null,
        cardArt: null,
    }

    @Watch('layout.configuration.configurationName')
    public resetFiles() {
        this.files = {
            header: null,
            footer: null,
            cardArt: null,
        }
    }

    handleImgChange(type: 'header' | 'footer' | 'cardArt', shouldClear = false) {
        // map the string values of type argument to corresponding initial file paths in settings
        const initialImgs = {
            cardArt: this.layout.loadedConfiguration.images.cardArt || this.$settings.url(this.$settings.card),
            header: this.layout.loadedConfiguration.images.header || this.$settings.url(this.$settings.headerLogo),
            footer: this.layout.loadedConfiguration.images.footer || this.$settings.url(this.$settings.footerLogo),
        }

        // Overload for clearing image and resetting to initial file path
        if (shouldClear) {
            // clear uploaded file from selected model
            this.files[type] = null;
            // update file path in layout store
            this.layout.setConfiguration({
                images: {
                    ...this.layout.configuration.images,
                    [type]: this.layout.loadedConfiguration.images[type]
                }
            });
            return;
        }

        // convenience variable for selected logo model
        const file = this.files[type];
        if (file) {
            // create an object url from the file, and convert it to a data URI
            const src = URL.createObjectURL(file);
            this.document.convertImagetoBase64(src,  (result: string) => {
                // result is a data URI with base64 string
                this.layout.setConfiguration({
                    images: {
                        ...this.layout.configuration.images,
                        [type]: result
                    }
                });
            })
        }
    }
}
</script>
