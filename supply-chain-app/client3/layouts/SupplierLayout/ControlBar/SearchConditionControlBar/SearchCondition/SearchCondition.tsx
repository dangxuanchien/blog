import DropdownMultipleCheckBox from '@/components/DropDownList/DropdownMultipleCheckBox';
import AppTextField from '@/components/Inputs/AppInput/AppInput';
import { useAppSelector } from '@/hooks/useAppSelector';
import { changeBusinessCondition } from '@/redux/appSearchForSupplier/conditionSearchCompany/reducer';
import { selectBusinessConditions } from '@/redux/appSearchForSupplier/conditionSearchCompany/selectors';
import { useAppDispatch } from '@/redux/hooks/redux';
import { getValuesFromOptions } from '@/utils/options';
import { Box, Grid } from '@material-ui/core';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchConditionStyle } from './SearchCondition.style';
import appMemo from '@/utils/appMemo';

const SearchCondition = () => {
    const { t } = useTranslation();
    const classes = useSearchConditionStyle();
    const dispatch = useAppDispatch();
    const { itemCategoryGroupOptions, itemCategoryOptions, itemNameOptions, keyWord } =
        useAppSelector(selectBusinessConditions);

    //** Get options for render */
    const itemCategoryOptionsRender = itemCategoryOptions.filter((category) =>
        itemCategoryGroupOptions.some(
            (categoryGroup) => category.itemCategoryGroupId === categoryGroup.value && categoryGroup.checked
        )
    );

    const itemNameOptionsRender = itemNameOptions.filter((itemName) => {
        return itemCategoryOptionsRender.some(
            (category) => category.checked && category.value === itemName.itemCategoryId
        );
    });

    const itemCategoryGroupSelected = itemCategoryGroupOptions.filter((i) => i.checked);
    const itemCategorySelected = itemCategoryOptionsRender.filter((i) => i.checked);
    const itemNameSelected = itemNameOptionsRender.filter((i) => i.checked);

    const businessSelected = {
        itemCategoryGroup: getValuesFromOptions(itemCategoryGroupSelected),
        itemCategory: getValuesFromOptions(itemCategorySelected),
        itemName: getValuesFromOptions(itemNameSelected),
    };

    //** Handle change business conditions */
    const handleChangeItemCategoryGroup = ({ itemCategoryGroupValues }: { itemCategoryGroupValues: string[] }) => {
        const itemCategoryGroupOptionsPayload = itemCategoryGroupOptions.map((item) => ({
            ...item,
            checked: itemCategoryGroupValues.includes(item.value),
        }));

        dispatch(
            changeBusinessCondition({
                itemCategoryGroupOptions: itemCategoryGroupOptionsPayload,
            })
        );
    };

    const handleChangeItemCategory = ({ itemCategoryValues }: { itemCategoryValues: string[] }) => {
        const itemCategoryPayload = itemCategoryOptions.map((item) => ({
            ...item,
            checked: itemCategoryValues.includes(item.value),
        }));

        dispatch(
            changeBusinessCondition({
                itemCategoryOptions: itemCategoryPayload,
            })
        );
    };

    const handleChangeItemName = ({ itemNameValues }: { itemNameValues: string[] }) => {
        const itemNamePayload = itemNameOptions.map((item) => ({
            ...item,
            checked: itemNameValues.includes(item.value),
        }));

        dispatch(
            changeBusinessCondition({
                itemNameOptions: itemNamePayload,
            })
        );
    };

    const handleChangeKeyword = (value: { keyWord: string }) => {
        dispatch(changeBusinessCondition(value));
    };

    return (
        <Box className={classes.main}>
            <Grid item>
                <Box className={classes.elementFilter}>
                    <DropdownMultipleCheckBox
                        onChange={handleChangeItemCategoryGroup}
                        options={itemCategoryGroupOptions}
                        label={t('searchForSupplierNew.productCategoryGroup')}
                        className={classes.comboBox}
                        name="itemCategoryGroupValues"
                        selected={businessSelected.itemCategoryGroup}
                    />
                </Box>
            </Grid>
            <Grid item>
                <Box className={classes.elementFilter}>
                    <DropdownMultipleCheckBox
                        onChange={handleChangeItemCategory}
                        options={itemCategoryOptionsRender}
                        label={t('searchForSupplierNew.productHandledField')}
                        className={classes.comboBox}
                        name="itemCategoryValues"
                        selected={businessSelected.itemCategory}
                    />
                </Box>
            </Grid>
            <Grid item>
                <Box className={classes.elementFilter}>
                    <DropdownMultipleCheckBox
                        onChange={handleChangeItemName}
                        options={itemNameOptionsRender}
                        label={t('searchForSupplierNew.itemName')}
                        className={classes.comboBox}
                        name="itemNameValues"
                        selected={businessSelected.itemName}
                    />
                </Box>
            </Grid>
            <Grid>
                <Box className={classes.elementFilter}>
                    <AppTextField
                        label={t('searchForSupplierNew.keyword')}
                        className={classes.comboBox}
                        value={keyWord}
                        name="keyWord"
                        onChange={(e) =>
                            handleChangeKeyword({
                                keyWord: e.target.value,
                            })
                        }
                    />
                </Box>
            </Grid>
        </Box>
    );
};

export default appMemo(SearchCondition);
