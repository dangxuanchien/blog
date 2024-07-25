import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { cssConstant } from '@/components/CSSConstant/css.constant';
export const sliderFilterItem = [
    { label: 'searchForSupplierNew.quality', nameScore: 'qualityScore', nameWeight: 'qualityWeight' },
    { label: 'searchForSupplier.price', nameScore: 'costScore', nameWeight: 'costWeight' },
    { label: 'searchForSupplier.deliveryDate', nameScore: 'deliveryScore', nameWeight: 'deliveryWeight' },
    { label: 'searchForSupplier.finance', nameScore: 'financeScore', nameWeight: 'financeWeight' },
    { label: 'searchForSupplier.surroundings', nameScore: 'environmentScore', nameWeight: 'environmentWeight' },
    { label: 'searchForSupplier.laborAndHumanRight', nameScore: 'laborScore', nameWeight: 'laborWeight' },
    { label: 'searchForSupplier.ethics', nameScore: 'ethicsScore', nameWeight: 'ethicsWeight' },
    {
        label: 'searchForSupplier.sustainableProcurement',
        nameScore: 'sustainableScore',
        nameWeight: 'sustainableWeight',
    },
];
const { mainButton } = cssConstant;

export const useSliderForSearchStyle = makeStyles((theme: Theme) =>
    createStyles({
        containerColumnForm: {
            boxSizing: 'border-box',
            backgroundColor: theme.palette.primary.light,
            width: '100%',
        },
        elementFilter: {
            display: 'flex',
            flexDirection: 'column',
            width: '330px',
            marginTop: '10px',
            float: 'left',
        },
        labelSearch: {
            fontWeight: 'bold',
        },
        slider: {
            paddingRight: '20px',
        },
        containerLabel: {
            marginRight: 'auto',
        },
        rightLabelContainer: {
            width: 255,
        },
        containerFlex: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'stretch',
            alignContent: 'space-between',
            paddingBottom: '0px',
        },
        containerFlexTitle: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '12px 0',
            height: 43,
        },
        containerFlexTitleLastRow: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '12px 0',
            height: 43,
            '@global': {
                '.MuiSlider-mark': {
                    height: 25,
                },
            },
        },
        contentButtonSubmit: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            height: '40px',
            marginTop: '10px',
        },
        buttonSubmit: {
            ...mainButton,
            marginRight: '10px',
            '&:focus': {
                backgroundColor: 'var(--default-button)',
                color: 'var(--white)',
                border: '1px solid var(--silver-white)',
            },
        },
    })
);
