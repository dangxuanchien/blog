import useSearchForSupplierContext from '@/context/searchForSupplier/useSearchForSupplierContext';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Box, Checkbox, Collapse } from '@material-ui/core';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdCheckmark, IoMdSquare } from 'react-icons/io';
import { useStyles } from './DetailAchievements.style';
import {
    selectDetailAchievementTabParams,
    selectOptionDateParameter,
} from '@/redux/appSearchForSupplier/detailAchievement/selectors';
import { CompanyEvaluationParameterDetail, OptionsDate } from '@/redux/appSearchForSupplier/detailAchievement/type';
import AppDateRangePicker from '@/components/Inputs/AppDateRangePicker/AppDateRangePicker';
import { setDetailAchievementsTabParams, setOptionsDate } from '@/redux/appSearchForSupplier/detailAchievement/reducer';

const DetailAchievementsControlBar = () => {
    const style = useStyles();
    const dispatch = useAppDispatch();
    const {
        tab: { labelTab: companyName },
    } = useSearchForSupplierContext();
    const { t } = useTranslation();
    const detailAchievementsTabParams = useAppSelector(selectDetailAchievementTabParams);

    const optionDate: OptionsDate = useAppSelector(selectOptionDateParameter);

    const setDispatchOptionsDate = (startDay?: Date, endDay?: Date) => {
        const startDate = startDay || optionDate.startDate;
        const endDate = endDay || optionDate.endDate;
        dispatch(setOptionsDate({ startDate, endDate }));
    };

    const onParameterChecked = (
        event: ChangeEvent<HTMLInputElement>,
        itemChecked: CompanyEvaluationParameterDetail
    ) => {
        const parameterChecked: CompanyEvaluationParameterDetail[] = detailAchievementsTabParams.map((item) => {
            const newItem = { ...item };
            if (newItem.id === itemChecked.id) {
                newItem.selected = event.target.checked;
            }
            return newItem;
        });

        dispatch(setDetailAchievementsTabParams(parameterChecked));
    };

    return (
        <>
            <Box className={style.selectParameter}>
                <Box className={style.companyName}>
                    <label>{t('achievementDetails.titleLeft')}</label>
                    <label className={style.company}>{t(companyName)}</label>
                </Box>

                <Collapse in={true} timeout="auto" unmountOnExit>
                    <Box className={style.allBoxSelect}>
                        {detailAchievementsTabParams?.map((item, index) => {
                            return (
                                <Box className={style.boxSelect} key={index}>
                                    <Box className={style.checkBox}>
                                        <Checkbox
                                            onChange={(e) => onParameterChecked(e, item)}
                                            checked={item.selected}
                                            icon={<IoMdSquare className={style.iconItem} size={17} />}
                                            checkedIcon={<IoMdCheckmark className={style.checkIcon} size={17} />}
                                        />
                                    </Box>
                                    <label className={style.labelParameter}>{item.parameter}</label>
                                </Box>
                            );
                        })}
                    </Box>
                </Collapse>
            </Box>
            <Box className={style.datePicker}>
                <AppDateRangePicker
                    minStartDate={new Date(new Date().setMonth(new Date().getMonth() - 6))}
                    maxEndDate={new Date()}
                    value={[optionDate.startDate, optionDate.endDate]}
                    onChange={({ startDate, endDate }) => setDispatchOptionsDate(startDate, endDate)}
                />
            </Box>
        </>
    );
};

export default DetailAchievementsControlBar;
