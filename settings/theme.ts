import colors from 'vuetify/es5/util/colors';
import { Theme, VuetifyThemeVariant } from 'vuetify/types/services/theme';

// Any color names added to theme will need to be added to this interface
interface IExtendedTheme extends VuetifyThemeVariant {
    brandGrey: string;
    mainBackground: string;
    headerBackground: string;
}
export default {
    dark: false,
    themes: {
        light: {
            primary: '#122f54',
            secondary: '#003c60',
            accent: colors.lightBlue.lighten2,
            error: '#DB3939',
            warning: colors.amber.lighten2,
            info: colors.lightBlue.lighten2,
            success: colors.green.lighten2,
            brandGrey: '#E6E6E6',
            mainBackground: '#fff',
            headerBackground: '#fff',
        } as Partial<IExtendedTheme>,
        dark: {
            primary: '#122f54',
            secondary: '#003c60',
            accent: colors.deepPurple.darken2,
            error: '#DB3939',
            warning: colors.amber.darken2,
            info: colors.lightBlue.darken2,
            success: colors.green.darken2,
            brandGrey: '#E6E6E6',
            mainBackground: '#fff',
            headerBackground: '#fff',
        } as Partial<IExtendedTheme>,
    },
} as Theme;
