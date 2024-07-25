import { color } from '@/components/CSSConstant/css.constant';
import { createTheme } from '@material-ui/core';
const {
    black,
    grey,
    silverGrey,
    green,
    yellow,
    white,
    greyNew,
    divider,
    main,
    disabledBackground,
    disabled,
    defaultCheckBox,
    transparentColor,
    linearGradientBlackColor,
} = color;
// palette values for dark mode
export const DARK_THEME = createTheme({
    palette: {
        type: 'dark',
        background: {
            default: black,
            paper: green,
        },
        text: {
            primary: white,
            secondary: yellow,
            hint: black,
            disabled: yellow,
        },
        secondary: {
            main: silverGrey,
            contrastText: greyNew,
            light: black,
            dark: black,
        },
        primary: {
            main: greyNew,
            dark: greyNew,
            light: greyNew,
            contrastText: greyNew,
        },
        error: {
            main: main,
            dark: white,
            light: white,
            contrastText: yellow,
        },
        action: {
            selected: white,
            disabled: white,
            active: defaultCheckBox,
            disabledBackground: disabledBackground,
            hover: white,
        },
        success: {
            main: green,
            light: linearGradientBlackColor,
            dark: main,
        },
        divider: main,
    },
});
// palette values for light mode
export const LIGHT_THEME = createTheme({
    palette: {
        type: 'dark',

        text: {
            primary: black,
            secondary: silverGrey,
            hint: silverGrey,
            disabled: disabled,
        },
        background: {
            default: white,
            paper: grey,
        },
        secondary: {
            main: black,
            contrastText: white,
            light: white,
            dark: black,
        },
        primary: {
            main: black,
            dark: grey,
            light: white,
            contrastText: white,
        },
        error: {
            main: white,
            dark: grey,
            light: silverGrey,
            contrastText: silverGrey,
        },
        action: {
            selected: grey,
            active: grey,
            disabled: black,
            disabledBackground: white,
            hover: black,
        },
        success: {
            main: disabled,
            light: transparentColor,
            dark: transparentColor,
        },
        divider: divider,
    },
});
