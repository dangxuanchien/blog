import { Box, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DropdownMultipleCheckBox from '@/components/DropDownList/DropdownMultipleCheckBox';
import { useSearchConditionStyle } from './SearchCondition.style';
import AppTextField from '@/components/Inputs/AppInput/AppInput';

interface OptionsProps {
    id?: string | number;
    value: string;
    name: string;
}
interface SearchConditionProps {
    className?: string;
    handleConditionDropdownChange: (value: any) => void;
    handleConditionKeyWordChange: (value: any) => void;
    handleConditionKeyWordBlur: (value: any) => void;
    handleConditionDropdownClose: () => void;
    filtersCondition: any;
    dataCategoryGroup: OptionsProps[];
    dataCategories: OptionsProps[];
    dataItemName: OptionsProps[];
}

const SearchCondition = ({
    handleConditionDropdownChange,
    handleConditionKeyWordChange,
    handleConditionKeyWordBlur,
    handleConditionDropdownClose,
    filtersCondition,
    dataCategoryGroup,
    dataCategories,
    dataItemName,
    ...props
}: SearchConditionProps) => {
    const { t } = useTranslation();
    const style = useSearchConditionStyle();

    return (
        <Box {...props}>
            <Box className={style.main}>
                <Grid item={true}>
                    <Box className={style.elementFilter}>
                        <DropdownMultipleCheckBox
                            onChange={handleConditionDropdownChange}
                            options={dataCategoryGroup}
                            label={t('searchForSupplierNew.productCategoryGroup')}
                            className={style.comboBox}
                            name="itemCategoryGroup"
                            onClose={handleConditionDropdownClose}
                            selected={filtersCondition?.itemCategoryGroup}
                        />
                    </Box>
                </Grid>
                <Grid item={true}>
                    <Box className={style.elementFilter}>
                        <DropdownMultipleCheckBox
                            onChange={handleConditionDropdownChange}
                            options={dataCategories}
                            label={t('searchForSupplierNew.productHandledField')}
                            className={style.comboBox}
                            name="itemCategory"
                            onClose={handleConditionDropdownClose}
                            selected={filtersCondition?.itemCategory}
                        />
                    </Box>
                </Grid>
                <Grid item={true}>
                    <Box className={style.elementFilter}>
                        <DropdownMultipleCheckBox
                            onChange={handleConditionDropdownChange}
                            options={dataItemName}
                            label={t('searchForSupplierNew.itemName')}
                            className={style.comboBox}
                            name="itemName"
                            onClose={handleConditionDropdownClose}
                            selected={filtersCondition?.itemName}
                        />
                    </Box>
                </Grid>
                <Grid item={true}>
                    <Box className={style.elementFilter}>
                        <AppTextField
                            label={t('searchForSupplierNew.keyword')}
                            className={style.comboBox}
                            defaultValue={filtersCondition?.keyWord || ''}
                            name="keyWord"
                            onBlur={handleConditionKeyWordBlur}
                            onChange={handleConditionKeyWordChange}
                        />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
};

export default SearchCondition;
