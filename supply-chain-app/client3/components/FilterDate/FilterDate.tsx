import DatePickerCustom from '@/components/Inputs/DatePicker/DatePicker';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

// interface FilterDateProps {}

const FilterDate: FC = (props) => {
    const { t } = useTranslation();
    const [periodTo, setPeriodTo] = useState(new Date());
    const [periodFrom, setPeriodFrom] = useState(new Date());
    return (
        <Box className="filterdate__container">
            <Grid item className="datepicker">
                {/* <span className="label__DatePicker">{t('detailSupplier.scoreDisplaySettings\​')} : </span> */}
                <DatePickerCustom
                    onChangeFrom={setPeriodFrom}
                    valueFrom={periodFrom}
                    onChangeTo={setPeriodTo}
                    valueTo={periodTo}
                    labelFrom={t('detailSupplier.startDate')}
                    labelTo={t('detailSupplier.endDate')}
                />
            </Grid>
        </Box>
    );
};

export default FilterDate;
