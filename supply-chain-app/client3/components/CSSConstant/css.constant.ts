import { CSSProperties } from '@material-ui/core/styles/withStyles';

type TCssConstant = {
    [key:string]: CSSProperties
}
export const cssConstant: TCssConstant= {
    button: {
        width: '5rem !important',
        color: 'var(--white)',
        fontWeight: 'bold',
        height: '2.5rem',
        borderRadius: '10px',
        backgroundColor: '#32363e',
        float: 'right',
        '&:hover': {
            backgroundColor: '#595959',
        },
    },
    mainButton: {
        width: '6rem !important',
        color: 'var(--white)',
        fontWeight: 'bold',
        height: '2rem',
        borderRadius: '6px',
        fontSize: '11pt',
        paddingTop: '5pt',
        backgroundColor: 'var(--default-button)',
        border: '1px solid var(--silver-white)',
        '&:hover': {
            backgroundColor: 'var(--hover-button)',
        },
    },
    activeButton: {
        color: 'var(--default-button) !important',
        border: '1px solid var(--default-button) !important',
        backgroundColor: 'var(--silver-white) !important',
    },
    font: {
        applicationTitle: '22pt',
        fontTitle: '18pt',
        mainTitle: '14pt',
        title: '11pt',
        detailedItem: '9pt',
        supplementaryItem: '6pt',
    },
    text: {
        fontSize: '14pt',
        color: 'var(--black)',
    },
    icon: {
        display: 'flex',
        justifyContent: 'center',
    },
    labelSearch: {
        fontWeight: 'bold',
        fontSize:'14pt',
        marginTop:'6px'
    },
    comboBox: {
        width: '75%',
        height: '2rem',
    },
    colorSilverGrey: {
        backgroundColor: '#666666',
        borderColor: '#666666',
        pointBackgroundColor: '#666666',
        pointBorderColor: '#666666',
    },
    colorSilverGreyDark: {
        backgroundColor: '#2be200',
        borderColor: '#2be200',
        pointBackgroundColor: '#2be200',
        pointBorderColor: '#2be200',
    },
    colorGrey: {
        backgroundColor: '#bfbfbf',
        borderColor: '#bfbfbf',
        pointBackgroundColor: '#bfbfbf',
        pointBorderColor: '#bfbfbf',
    },
    colorGreyDark: {
        backgroundColor: '#ffc000',
        borderColor: '#ffc000',
        pointBackgroundColor: '#ffc000',
        pointBorderColor: '#ffc000',
    },
    colorTextChart: {
        color: '#252525'
    },
    colorTextChartDark: {
        color: '#FFF'
    },
    textDarkMode: {
        fontWeight: 'bold',
        fontSize: '12px',
    },
};
export const color = {
    black: '#252525',
    grey: '#bfbfbf',
    silverGrey: '#666666',
    green: '#2be200',
    yellow: '#ffc000',
    white: '#FFFF',
    darkGrey: '#51545B',
    lightGrey: '#7F7F7F', 
    greyNew: '#32363E',
    divider: '#595959',
    main:  '#32363E',
    disabledBackground: '#474A52',
    disabled: '#2E3033',
    defaultCheckBox: 'rgba(242, 242, 242, 0.1)',
    colorBarChartActive: 'rgba(153,136,36,0.8)',
    colorBarChart: 'rgb(120,120,121,0.8)',
    whiteRadian: '#F2F2F2',
    selectInputDate: '#707378',
    tooltipBgColor: '#B5B5B7',
    transparentColor: 'transparent',
    linearGradientBlackColor: 'linear-gradient(rgba(88,83,83,0.6306897759103641), #252525)',
};