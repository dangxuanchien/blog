import AppButton from '@/components/Button/AppButton/AppButton';
import AppInput from '@/components/Inputs/AppInput/AppInput';
import AppMultipleCheckbox, { ValuesChecked } from '@/components/Inputs/AppMultipleCheckbox/AppMultipleCheckbox';
import Checkbox from '@/components/Inputs/CheckBox/CheckboxSetting';
import AppTable, { ColDef } from '@/components/Table/AppTable/AppTable';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useDeepEffect } from '@/hooks/useDeepEffect';
import useDeepMemo from '@/hooks/useDeepMemo';
import { searchSettingConditionCompanyThunk } from '@/redux/appSearchForSupplier/conditionSearchCompany/dispatcher';
import { setBusinessCondition } from '@/redux/appSearchForSupplier/conditionSearchCompany/reducer';
import {
    selectBusinessConditions,
    selectCandidateList,
} from '@/redux/appSearchForSupplier/conditionSearchCompany/selectors';
import {
    BusinessOption,
    ResultSettingSearchConditionItem,
    SearchBusinessConditions,
    SettingSearchConditionPayload,
    itemCategoryOption,
    itemNameOption,
} from '@/redux/appSearchForSupplier/conditionSearchCompany/types';
import { EnterpriseSearchItem } from '@/redux/searchForSupplier/settingConditionSearch/types';
import { getValuesFromOptions } from '@/utils/options';
import { Box, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import _uniqBy from 'lodash/uniqBy';
import { ChangeEventHandler, FC, ReactNode, useEffect, useRef, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyFilter, getColumnsCandidate } from './ConditionSearchCompany.constants';
import { useConditionSearchCompanyStyle } from './ConditionSearchCompany.style';

const renderIndex = (index: number): string => {
    if (index < 10) {
        return '000' + index;
    }
    if (index < 100) {
        return '00' + index;
    }
    if (index < 1000) {
        return '0' + index;
    }
    return String(index);
};

interface ResultEnterpriseSearchedItem extends ResultSettingSearchConditionItem {
    index: string;
    hiddenGroupName?: boolean;
    hiddenCategoryName?: boolean;
}

type IdOptionChecked = {
    [KeyFilter.GROUP]: string[];
    [KeyFilter.CATEGORY]: string[];
    [KeyFilter.ITEM_NAME]: string[];
};

const ConditionSearchCompany: FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const classes = useConditionSearchCompanyStyle();

    // **selectors
    const dataSearched = useAppSelector(selectCandidateList);

    //** refs
    const rowCheckedRef = useRef<ResultSettingSearchConditionItem[]>(dataSearched);
    const searchTextConditionRef = useRef({
        [KeyFilter.GROUP]: true,
        [KeyFilter.CATEGORY]: true,
        [KeyFilter.ITEM_NAME]: true,
    });

    // **states
    const [filterData, setFilterData] = useState<EnterpriseSearchItem[]>([]);
    const [searchTextValue, setSearchTextValue] = useState('');
    const [isShowingMessageError, setIsShowingMessageError] = useState(false);

    // ** filterOptions for search from data table available
    const [idOptionsChecked, setIdOptionsChecked] = useState<IdOptionChecked>({
        [KeyFilter.GROUP]: [],
        [KeyFilter.CATEGORY]: [],
        [KeyFilter.ITEM_NAME]: [],
    });

    // **Handle events
    const onChangeSearchValue: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
        setSearchTextValue(e.target.value);
    };

    const onBlurMultipleCheckboxes = (key: KeyFilter, values: ValuesChecked) => {
        setIdOptionsChecked((state) => ({
            ...state,
            [key]: values,
        }));
    };

    // **init data to multiple checkboxes
    const optionsCategoryGroup = useDeepMemo(() => {
        const categoryGroupUniq = _uniqBy(dataSearched, (item) => item.itemCategoryGroupId);
        return categoryGroupUniq.map((el) => ({
            name: el.itemCategoryGroupName,
            value: el.itemCategoryGroupId,
        }));
    }, [dataSearched]);

    const optionsCategory = useDeepMemo(() => {
        const categoriesUniq = _uniqBy(dataSearched, (item) => item.itemCategoryId);
        return categoriesUniq.map((el) => ({
            name: el.itemCategoryName,
            value: el.itemCategoryId,
        }));
    }, [dataSearched]);

    const optionsItems = useDeepMemo(() => {
        return dataSearched.map((el) => ({
            name: el.itemName,
            value: el.itemId,
        }));
    }, [dataSearched]);

    // ** Effect for set default checkboxes
    useEffect(() => {
        setIdOptionsChecked({
            [KeyFilter.GROUP]: getValuesFromOptions(optionsCategoryGroup),
            [KeyFilter.CATEGORY]: getValuesFromOptions(optionsCategory),
            [KeyFilter.ITEM_NAME]: getValuesFromOptions(optionsItems),
        });
    }, [dataSearched]);

    // ** Side effect for filterData when searched
    useDeepEffect(() => {
        const filteredData = dataSearched.filter((row) => {
            const groupCondition = idOptionsChecked[KeyFilter.GROUP].some((id) => id === row.itemCategoryGroupId);
            const categoryCondition = idOptionsChecked[KeyFilter.CATEGORY].some((id) => id === row.itemCategoryId);
            const itemCondition = idOptionsChecked[KeyFilter.ITEM_NAME].some((id) => id === row.itemId);
            return itemCondition && categoryCondition && groupCondition;
        });
        setFilterData(filteredData);
    }, [dataSearched, idOptionsChecked]);

    const mapDataFilteredForRender = (): ResultEnterpriseSearchedItem[] => {
        return filterData.reduce((current, nextValue, index) => {
            const isExistedCategoryGroup = current.some((i) => i.itemCategoryGroupId === nextValue.itemCategoryGroupId);
            const isExistedCategory = current.some(
                (i) =>
                    i.itemCategoryId === nextValue.itemCategoryId &&
                    i.itemCategoryGroupId === nextValue.itemCategoryGroupId
            );
            return [
                ...current,
                {
                    ...nextValue,
                    index: renderIndex(index + 1),
                    hiddenGroupName: isExistedCategoryGroup,
                    hiddenCategoryName: isExistedCategory,
                },
            ];
        }, [] as ResultEnterpriseSearchedItem[]);
    };

    const renderCategoryGroupName = (value: string, row: ResultEnterpriseSearchedItem) => {
        return (
            <>
                <Checkbox
                    style={{ zIndex: '1', padding: '0px', paddingRight: '7px' }}
                    defaultChecked={row.hasChecked}
                    onChange={(e) => {
                        if (e.target.checked) {
                            rowCheckedRef.current = [...rowCheckedRef.current, row];
                            return;
                        }
                        rowCheckedRef.current = rowCheckedRef.current.filter((i) => i.itemId !== row.itemId);
                    }}
                />

                {!row.hiddenGroupName && value}
            </>
        );
    };

    const renderCategoryName = (value: string, row: ResultEnterpriseSearchedItem) => !row.hiddenCategoryName && value;

    const renderTableHeader = (col: ColDef): ReactNode => {
        const optionsData = {
            [KeyFilter.GROUP]: optionsCategoryGroup,
            [KeyFilter.CATEGORY]: optionsCategory,
            [KeyFilter.ITEM_NAME]: optionsItems,
        };
        const key = col.field as unknown as KeyFilter;
        return (
            <Grid container alignItems="center" wrap="nowrap">
                <Checkbox
                    style={{ padding: '0px', paddingRight: '7px' }}
                    defaultChecked={searchTextConditionRef.current[key]}
                    onChange={(e) => (searchTextConditionRef.current[key] = e.target.checked)}
                />
                {col.title}
                <AppMultipleCheckbox
                    options={optionsData[key]}
                    initialValue={idOptionsChecked[key]}
                    onBlur={(values) => onBlurMultipleCheckboxes(key, values)}
                />
            </Grid>
        );
    };

    const handleClickBtnSearchTextValue = () => {
        const keysPayload = Object.keys(searchTextConditionRef.current) as KeyFilter[];
        const isValidSearch = Object.values(searchTextConditionRef.current).some((value) => value);
        if (!isValidSearch) {
            setIsShowingMessageError(!isValidSearch);
            return;
        }
        const searchTextConditionPayload = keysPayload.reduce((current, key) => {
            return {
                ...current,
                [key]: searchTextConditionRef.current[key] ? searchTextValue : '',
            };
        }, {} as SettingSearchConditionPayload);
        setIsShowingMessageError(false);
        dispatch(searchSettingConditionCompanyThunk(searchTextConditionPayload));
    };
    const handleDispatchToControlBar = () => {
        const itemCategoryGroup: BusinessOption[] = rowCheckedRef.current.map((row) => ({
            name: row.itemCategoryGroupName,
            value: row.itemCategoryGroupId,
            checked: true,
        }));

        const itemCategoryGroupPayload = _uniqBy(itemCategoryGroup, (i) => i.value);

        const itemCategories: itemCategoryOption[] = rowCheckedRef.current.map((row) => ({
            itemCategoryGroupId: row.itemCategoryGroupId,
            value: row.itemCategoryId,
            name: row.itemCategoryName,
            checked: true,
        }));
        const itemCategoriesPayload = _uniqBy(itemCategories, (i) => i.value);

        const itemsPayload: itemNameOption[] = rowCheckedRef.current.map((row) => ({
            itemCategoryId: row.itemCategoryId,
            itemCategoryGroupId: row.itemCategoryGroupId,
            value: row.itemId,
            name: row.itemName,
            checked: true,
        }));

        const businessConditionPayload: SearchBusinessConditions = {
            itemCategoryGroupOptions: itemCategoryGroupPayload,
            itemCategoryOptions: itemCategoriesPayload,
            itemNameOptions: itemsPayload,
        };

        dispatch(setBusinessCondition(businessConditionPayload));
    };
    return (
        <Box className={classes.root}>
            <Grid container alignItems="baseline" spacing={4} className={classes.title}>
                <Grid item>
                    <Typography variant="h6" noWrap style={{ fontWeight: 'bold' }}>
                        {t('searchForSupplierNew.DetailsOfCompanySearchConditions')}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="caption">{t('searchForSupplierNew.AccordingToUNSPSCCode')}</Typography>
                </Grid>
            </Grid>
            <Box className={classes.content}>
                <Box className={classes.search}>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        {t('searchForSupplierNew.CodeListSearch')}
                    </Typography>
                    <Grid container spacing={4} alignItems="flex-end">
                        <Grid item>
                            <AppInput
                                variant="outlined"
                                size="small"
                                margin="none"
                                value={searchTextValue}
                                InputProps={{ classes: { input: classes.input } }}
                                className={classes.textFiled}
                                onChange={onChangeSearchValue}
                            />
                        </Grid>
                        <Grid item>
                            <AppButton onClick={handleClickBtnSearchTextValue} className={classes.button}>
                                {t('supplyChainTree.search')}
                            </AppButton>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.warningLabel} variant="body1" style={{ color: '#FFC000' }}>
                                {isShowingMessageError
                                    ? t('searchForSupplierNew.WarningConditionOfTable')
                                    : filterData.length > 100
                                    ? t('searchForSupplierNew.WarningOfTable')
                                    : ''}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box className={classes.tableContainer}>
                    <Typography className={classes.tableTitle} variant="body1">
                        {t('searchForSupplierNew.ShortList')}
                    </Typography>
                    <AppTable
                        data={mapDataFilteredForRender()}
                        columns={getColumnsCandidate(renderTableHeader, renderCategoryGroupName, renderCategoryName)}
                        rowGroupField={KeyFilter.GROUP}
                    />
                </Box>
                <Grid container justifyContent="center">
                    <AppButton className={classes.button} onClick={handleDispatchToControlBar}>
                        {t('searchForSupplierNew.SetupComplete')}{' '}
                    </AppButton>
                </Grid>
            </Box>
        </Box>
    );
};
export default ConditionSearchCompany;
