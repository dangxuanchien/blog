import ButtonCustom from '@/components/Button/CustomButton/CustomButton';
import { cssConstant } from '@/components/CSSConstant/css.constant';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const { mainButton, labelSearch } = cssConstant;

const useStyles = makeStyles({
    expressAgainButton: {
        ...mainButton,
        marginRight: '10px',
    },
    containerFlex: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        alignContent: 'space-between',
    },
    labelSearch: {
        ...labelSearch,
    },
    search: {
        'margin-Right': '25px',
    },
    parameter: {
        textAlign: 'center',
    },
});
const ExpressButton: FC = () => {
    const style = useStyles();
    const { t } = useTranslation();

    return (
        <Box>
            <Box className={style.parameter}>
                <label>{t('detailSupplier.parameterSettingScreen')}</label>
            </Box>
            <Box className={style.containerFlex}>
                <Grid className={style.labelSearch}>
                    <label className={style.labelSearch}>{t('detailSupplier.indicateConditions')}</label>
                </Grid>
                <Box className={style.search}>
                    <ButtonCustom
                        label={t('detailSupplier.expressAgain')}
                        buttonProps={{
                            className: style.expressAgainButton,
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};
export default ExpressButton;
