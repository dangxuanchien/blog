import AppButton from '@/components/Button/AppButton/AppButton';
import { SearchForSupplierTabName } from '@/context/searchForSupplier/types';
import useSearchForSupplierContext from '@/context/searchForSupplier/useSearchForSupplierContext';
import { useAppSelector } from '@/hooks/useAppSelector';
import { usePrevious } from '@/hooks/usePrevious';
import { searchCompanyByConditionsThunk } from '@/redux/appSearchForSupplier/conditionSearchCompany/dispatcher';
import {
    selectBusinessConditions,
    selectScoreConditions,
    selectWeightConditions,
} from '@/redux/appSearchForSupplier/conditionSearchCompany/selectors';
import { useAppDispatch } from '@/redux/hooks/redux';
import { Box, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSearchButtonStyle } from './SearchButton.style';
import { searchCompanies } from '@/redux/appSearchForSupplier/ResultSearchCompany/dispatcher';
import { resetResultSearchCompany } from '@/redux/appSearchForSupplier/ResultSearchCompany/reducer';

const SearchButton = () => {
    const classes = useSearchButtonStyle();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const {
        navigateTab,
        tab: { tabId },
    } = useSearchForSupplierContext();

    const businessConditions = useAppSelector(selectBusinessConditions);
    const scoreConditions = useAppSelector(selectScoreConditions);
    const weightConditions = useAppSelector(selectWeightConditions);

    const businessConditionsPrev = usePrevious(businessConditions);
    const scoreConditionsPrev = usePrevious(scoreConditions);
    const weightConditionsPrev = usePrevious(weightConditions);

    const isActiveSearchCompany =
        SearchForSupplierTabName.ResultSearchCompany === tabId &&
        businessConditions === businessConditionsPrev &&
        scoreConditions === scoreConditionsPrev &&
        weightConditions === weightConditionsPrev;

    const handleClickSearchCompany = () => {
        dispatch(searchCompanies())
            .unwrap()
            .then(() => {
                navigateTab(SearchForSupplierTabName.ResultSearchCompany);
            });
    };

    const handleConditionButton = () => {
        dispatch(resetResultSearchCompany());
        navigateTab(SearchForSupplierTabName.SearchCompany);
    };

    const hasDisabledSearchCompany =
        businessConditions.itemCategoryGroupOptions.length === 0 ||
        businessConditions.itemCategoryGroupOptions.some((option) => !option.checked);

    return (
        <Box>
            <Box className={classes.containerFlex}>
                <Grid className={classes.labelSearch}>
                    <label className={classes.labelSearch}>{t('searchForSupplierNew.businessConditions')}</label>
                </Grid>
                <Box className={classes.search}>
                    <AppButton
                        onClick={handleConditionButton}
                        isActive={SearchForSupplierTabName.SearchCompany === tabId}
                    >
                        {t('searchForSupplierNew.conditionButton')}
                    </AppButton>
                    <AppButton
                        isActive={isActiveSearchCompany}
                        onClick={handleClickSearchCompany}
                        disabled={hasDisabledSearchCompany}
                    >
                        {t('searchForSupplierNew.searchButton')}
                    </AppButton>
                </Box>
            </Box>
        </Box>
    );
};
export default SearchButton;
