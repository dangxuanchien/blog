import { color, cssConstant } from '@/components/CSSConstant/css.constant';
import { Theme, makeStyles } from '@material-ui/core';
const {  font } = cssConstant;
const { title, mainTitle } = font;
const { white } = color;
export default makeStyles((theme: Theme) => ({
    overlay: {
        position: 'absolute',
        background: theme.palette.success.light,
        backdropFilter: 'blur(2px)',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.8,
    },
    mainLogin: {
        overflowY: 'hidden',
        width: '100%',
        height: '100vh',
        backgroundColor: 'var(--grey)',
        display: 'block',
        backgroundImage: 'url(images/login.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
    },
    mainLogin__header: {
        width: '100%',
        background: 'rgb(255 255 255 / 15%)',
        marginTop: '270px',
        textAlign: 'center',
        color: theme.palette.text.primary,
        position: 'absolute',
        zIndex: 1,
        display: 'block',
    },
    header__text: {
        fontSize: `${mainTitle}`,
        opacity: 1,
        zIndex: 1,
    },
    text: {
        fontSize: `${title}`,
        zIndex: 1,
    },
    mainLogin__formLogin: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '445px',
        position: 'absolute',
        width: '100%',
    },
    formLogin__input: {
        fontSize: `${mainTitle}`,
        margin: '10px 0',
        fontWeight: 'bold',
        color: theme.palette.text.primary,
        '& .MuiInputBase-root': {
            border: `1px solid ${white}`,
            color: 'white',
            '&:hover': {
                border: `1px solid ${white}`,
            },
        },
        zIndex: 1,
    },
    input: {
        background: 'linear-gradient(rgba(88,83,83,0.6306897759103641))',
        width: '280px',
        marginTop: '6px',
        color: 'white',
        border: white,
        backdropFilter: 'blur(4px)',
        '&:focus-visible': {
            border: `1px solid ${white}`,
        },
    },

    formLogin__button: {
        margin: '22px 0',
    },
    btn: {
        padding: '0px 14px',
        fontWeight: 'bold',
        width: '130px',
        height: '30px',
        fontSize: `${title}`,
        border: `1px solid ${white}`,
        marginTop: '10px',
        zIndex: 1,
    },
    rightHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        flexBasis: 'auto',
        padding: '5px 30px',
        color: `${color.black}`,
    },
}));
