import { Box, Checkbox, Collapse } from '@material-ui/core';
import { useAppSelector } from '@/hooks/useAppSelector';
import { FC, useState } from 'react';
import { IoMdCheckmark, IoMdSquare } from 'react-icons/io';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';
import { useStyles } from './DetailAchivements.style';
import useSearchForSupplierTab from '../../SearchForSupplierTabContext';
import { setDetailAchievementsTabParams } from '@/redux/searchForSupplier/detailAchievements/reducer';
import { useAppDispatch } from '@/redux/hooks/redux';
type DetailAchivementsProps = {
    onChecked?: any;
    dataSelected?: any;
    dataParameter?: any;
};

const DetailAchivements: FC<DetailAchivementsProps> = (props) => {
    const style = useStyles();
    const dispatch = useAppDispatch();
    const [expand, setExpand] = useState(false);
    const {
        tab: { labelTab: companyName },
    } = useSearchForSupplierTab();
    const { t } = useTranslation();
    const { detailAchievementsTabParams } = useAppSelector((state) => state.detailAchievementsReducer);
    const handleExpand = () => {
        setExpand(!expand);
    };

    const onChecked = (e, itemChecked) => {
        const dataCheckde = detailAchievementsTabParams.map((item) => {
            const newItem = { ...item };
            if (newItem.id === itemChecked.id) {
                newItem.selected = e.target.checked;
            }
            return newItem;
        });
        dispatch(setDetailAchievementsTabParams(dataCheckde));
        props.dataSelected(dataCheckde);
    };

    return (
        <Box className={style.selectParameter}>
            <Box className={style.companyName}>
                <label>{t('achievementDetails.titleLeft')}</label>
                <label className={style.company}>{companyName}</label>
            </Box>
            <Box className={style.label}>
                <label>{t('achievementDetails.itemSelection')}</label>
                <Box className={style.boxExpand}>
                    {expand ? <ExpandMore onClick={handleExpand} /> : <ExpandLess onClick={handleExpand} />}
                </Box>
            </Box>

            <Collapse in={expand} timeout="auto" unmountOnExit>
                <Box className={style.allBoxSelect}>
                    {detailAchievementsTabParams?.map((item: any, index) => {
                        return (
                            <Box className={style.boxSelect} key={index}>
                                <Box className={style.checkBox}>
                                    <Checkbox
                                        onChange={(e) => onChecked(e, item)}
                                        checked={item.selected}
                                        style={{
                                            padding: '0px',
                                        }}
                                        icon={<IoMdSquare className={style.iconItem} size={17} />}
                                        checkedIcon={<IoMdCheckmark className={style.checkIcon} size={17} />}
                                    />
                                </Box>
                                <label className={style.lableParameter}>{item.parameter}</label>
                            </Box>
                        );
                    })}
                </Box>
            </Collapse>
        </Box>
    );
};
export default DetailAchivements;
