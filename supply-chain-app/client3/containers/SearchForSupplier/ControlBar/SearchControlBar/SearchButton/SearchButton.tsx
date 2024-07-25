import AppButton from '@/components/Button/AppButton/AppButton';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Box, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSearchButtonStyle } from './SearchButton.style';

const SearchButton = ({
    isActiveButton,
    handleControlBarClickSearch,
    handleConditionButton,
    activeClickSearch,
}) => {
    const style = useSearchButtonStyle();
    const { t } = useTranslation();
    const isActiveConditionButton = useAppSelector((state) => state.stateButtonReducer.settingConditionButton);
    return (
        <Box>
            <Box className={style.containerFlex}>
                <Grid className={style.labelSearch}>
                    <label className={style.labelSearch}>{t('searchForSupplierNew.businessConditions')}</label>
                </Grid>
                <Box className={style.search}>
                    <AppButton
                        width={100}
                        className={`${isActiveConditionButton ?  style.activeButtonSearch : style.buttonSearch}`}
                        onClick={handleConditionButton}
                    >
                        {t('searchForSupplierNew.conditionButton')}
                    </AppButton>
                    <AppButton
                        width={100}
                        className={isActiveButton? style.activeButtonSearch : (activeClickSearch? style.disableButtonSearch: style.buttonSearch)}
                        onClick={handleControlBarClickSearch}
                        disabled={activeClickSearch ? true : false}
                    >
                        {t('searchForSupplierNew.searchButton')}
                    </AppButton>
                </Box>
            </Box>
        </Box>
    );
};
export default SearchButton;
