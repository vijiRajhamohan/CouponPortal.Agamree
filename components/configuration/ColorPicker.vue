<template>
    <div class="color-picker">
        <small ref="color-picker-label">{{label}}</small>
        <v-select
            ref="color-picker-select"
            v-model="mode"
            :items="modes"
            item-text="name"
            item-value="mode"
            label="Color Type"
            solo
        >
            <template v-slot:append>
                <v-menu v-model="menu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                        <div :style="swatchStyle" class="color-swatch" v-on="on" />
                    </template>
                    <v-card>
                        <v-card-text class="pa-0">
                            <v-color-picker
                                ref="color-picker"
                                v-model="color"
                                :mode="mode"
                                v-on="events"
                                @input="handleColorChange()"
                            />
                        </v-card-text>
                    </v-card>
                </v-menu>
            </template>
        </v-select>
        <v-btn
            ref="color-picker-reset-button"
            tile
            class="reset-button ma-0"
            :disabled="isPristine"
            @click="handleColorChange(true)"
        >
            Reset
        </v-btn>
    </div>
</template>

<style lang="scss" scoped>
@import '~/assets/style/variables.scss';
</style>

<style lang="scss">
.color-picker {
    max-width: 70%;
    position: relative;
    .v-text-field__details {
        display: none;
    }
    .v-btn:not(.v-btn--round).v-size--default {
        height: 48px;
    }
    .reset-button {
        position: absolute;
        right: -86px;
        top: 24px;
    }
}
.color-swatch {
    cursor: pointer;
    margin-right: 5px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    transition: border-radius 200ms ease-in-out;
}

.v-color-picker {
    button {
        display: none;
    }
    .v-input {
        max-width: 79%;
    }
}
.v-color-picker .v-color-picker__input input {
    font-weight: bold;
    color: rgba(0,0,0, 0.8);
    border: 1px solid rgba(0,0,0, 0.5);
}
.v-color-picker .v-color-picker__input span {
    color: rgba(0,0,0, 0.8);
    font-weight: bold;
}

.v-color-picker__preview .v-slider:not(.v-slider--disabled) .v-slider__thumb {
    box-shadow: 0px 3px 3px -3px rgba(0, 0, 0, 1), 0px 0px 4px 0px rgba(0, 0, 0, 1), 0px 0px 2px 0px rgba(0, 0, 0, 1);
}

.v-color-picker__dot {
    box-shadow: 0px 3px 3px -3px rgba(0, 0, 0, 1), 0px 0px 4px 0px rgba(0, 0, 0, 1), 0px 0px 2px 0px rgba(0, 0, 0, 1);
}

.theme--dark.v-text-field--solo > .v-input__control > .v-input__slot {
    background: #363636;
    padding-right: 0px !important;
}
.v-text-field--outlined, .v-text-field--solo {
    border-radius: 0;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resolve } from 'vue-di';
import { Prop, Watch } from 'vue-property-decorator';
import { color } from '~/services/validations';
import { Title } from '~/decorators/Title';
import LayoutModule from '~/store/layout';
import colors from '~/assets/cssColors';
import { ICSSVariables } from '~/types/componentTypes';

@Component<ColorPicker>({
    layout: 'default',
})
export default class ColorPicker extends Vue {
    @Resolve
    public layout!: LayoutModule;

    @Prop()
    public label!: string;

    @Prop()
    public name!: keyof ICSSVariables;

    public initialColor = '';
    public color = '';
    public menu = false;

    public modes = [
        {mode: 'hexa', name: 'Hex Code'},
        {mode: 'rgba', name: 'RGB'},
        {mode: 'hsla', name:'HSL'}
    ];
    public mode = 'hexa';

    mounted() {
        this.setInitialColor();
    }

    setInitialColor() {
        const initialColor = this.layout.loadedConfiguration.colors[this.name].toUpperCase();
        this.initialColor = initialColor;
        this.color = initialColor;
        this.setColorToDom(this.name, initialColor, 'light');
    }

    public get isPristine() {
        return this.color === this.initialColor;
    }

    @Watch('layout.loadedConfiguration.configurationName', { deep: true, immediate: true })
    public setInitialColors() {
        this.setInitialColor();
    }

    public get swatchStyle() {
        return { backgroundColor: this.color }
    }

    handleColorChange(shouldClear = false, lightOrDark: 'light' | 'dark' = 'light') {
        const { name, color, initialColor } = this;
        if (shouldClear){
            this.color = initialColor;
        }
        const colorToSet = (shouldClear ? initialColor : color).toUpperCase();
        this.setColorToDom(name, colorToSet, lightOrDark);
        const newColors = { ...this.layout.configuration.colors };
        newColors[name] = colorToSet;
        this.layout.setConfiguration({ colors: {...newColors} });
    }

    setColorToDom(name: string, color: string, lightOrDark: 'light' | 'dark' = 'light') {
        document.documentElement.style.setProperty(`--color-${name}`, color.toUpperCase());
        this.$vuetify.theme.themes[lightOrDark][name] = color.toUpperCase();
    }
}
</script>
