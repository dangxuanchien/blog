import AppSliderForSearch from '@/components/AppSliderForSearch/AppSliderForSearch';
import AppButton from '@/components/Button/AppButton/AppButton';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
    selectScoreConditions,
    selectWeightConditions,
} from '@/redux/appSearchForSupplier/conditionSearchCompany/selectors';
import { Box, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { SLIDER_SEARCH_LIST } from './SearchSlider.constant';
import { useSliderForSearchStyle } from './SlideForSearch.style';
import { setScoreCondition, setWeightCondition } from '@/redux/appSearchForSupplier/conditionSearchCompany/reducer';
import { useEffect } from 'react';
import { getWeighInfoThunk, saveWeightInfoThunk } from '@/redux/appSearchForSupplier/conditionSearchCompany/dispatcher';
import {
    SearchScoreConditions,
    SearchWeightConditions,
} from '@/redux/appSearchForSupplier/conditionSearchCompany/types';
import _some from 'lodash/some';

const SearchSlider = () => {
    const { t } = useTranslation();
    const classes = useSliderForSearchStyle();
    const dispatch = useAppDispatch();
    const scoreConditions = useAppSelector(selectScoreConditions);
    const weightConditions = useAppSelector(selectWeightConditions);

    useEffect(() => {
        if (!_some(weightConditions, (value) => value != 1)) dispatch(getWeighInfoThunk());
    }, []);

    const onChangeInputScoreCondition = (value: Partial<SearchScoreConditions>) => {
        dispatch(setScoreCondition(value));
    };

    const onChangeWeightCondition = (value: Partial<SearchWeightConditions>) => {
        dispatch(setWeightCondition(value));
    };
    const onClickSaveWeightInfo = () => {
        dispatch(saveWeightInfoThunk());
    };
    const renderFilterList = () =>
        SLIDER_SEARCH_LIST.map((element, index, array) => {
            let configCssLastRow: 'containerFlexTitle' | 'containerFlexTitleLastRow' = 'containerFlexTitle';
            if (index === array.length - 1) {
                configCssLastRow = 'containerFlexTitleLastRow';
            }
            return (
                <Box className={classes[configCssLastRow]} key={element.nameScore}>
                    <AppSliderForSearch
                        labelRight={index === 0 && '%'}
                        labelLeft={t(element.label)}
                        nameScore={element.nameScore}
                        nameWeight={element.nameWeight}
                        weightValue={weightConditions[element.nameWeight]}
                        scoreValue={scoreConditions[element.nameScore]}
                        weightMaster={weightConditions}
                        marked={index === 0}
                        valueScores={scoreConditions}
                        onChangeInputWeight={onChangeWeightCondition}
                        onChangeInputScore={onChangeInputScoreCondition}
                    />
                </Box>
            );
        });
    return (
        <Box className={classes.containerColumnForm}>
            <Grid className={classes.contentButtonSubmit}>
                <AppButton className={classes.buttonSubmit} onClick={onClickSaveWeightInfo}>
                    {t('searchForSupplierNew.preservation')}{' '}
                </AppButton>
            </Grid>
            <Grid className={classes.containerFlex}>
                <Grid className={classes.containerLabel}>
                    <label className={classes.labelSearch}>{t('searchForSupplierNew.scoreCondition')}</label>
                </Grid>
                <Grid className={classes.rightLabelContainer}>
                    <label className={classes.labelSearch}>{t('searchForSupplierNew.overallEvaluationWeight')}</label>
                </Grid>
            </Grid>
            <Grid className={classes.slider}>{renderFilterList()}</Grid>
        </Box>
    );
};

export default SearchSlider;
