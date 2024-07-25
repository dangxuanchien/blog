import { Box, Grid } from '@material-ui/core';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { sliderFilterItem, useSliderForSearchStyle } from './constants';
import ButtonCustom from '@/components/Button/CustomButton/CustomButton';
import CustomSliderForSearch from '@/components/SliderSearch/CustomSliderForSearch';

type Props = {
    weightMaster: {};
    handleWeightChange: (value) => void;
    handleSoresChange: (value) => void;
    handleSubmit: (value) => void;
    valueScores: {};
};

const SliderForSearch: FC<Props> = ({
    weightMaster,
    handleWeightChange,
    handleSoresChange,
    handleSubmit,
    valueScores,
}) => {
    const { t } = useTranslation();
    const style = useSliderForSearchStyle();

    const handleOnblurChangeScoreInput = (e) => {
        const { name } = e.target;
        let numberInput = Number(e.target.value);

        if (numberInput < 0) {
            numberInput = 0;
        }
        if (numberInput > 100) {
            numberInput = 100;
        } else {
            numberInput;
        }
        handleSoresChange({ [name]: numberInput });
    };

    const handleChangeScoreInput = (e) => {
        const { name } = e.target;
        handleSoresChange({ [name]: e.target.value });
    };

    const renderFilterList = () =>
        sliderFilterItem.map((element, index, array) => {
            let configCssLastRow = 'containerFlexTitle';
            if (index === array.length - 1) {
                configCssLastRow = 'containerFlexTitleLastRow';
            }
            return (
                <Box className={style[configCssLastRow]} key={element.nameScore}>
                    <CustomSliderForSearch
                        labelRight={index === 0 && '%'}
                        labelLeft={t(element.label)}
                        nameScore={element.nameScore}
                        nameWeight={element.nameWeight}
                        weightMaster={weightMaster}
                        marked={index === 0}
                        scoreValue={valueScores[element.nameScore]}
                        weightValue={weightMaster[element.nameWeight]}
                        handleWeightChange={handleWeightChange}
                        onBlurInputScore={handleOnblurChangeScoreInput}
                        onChangeInputScore={handleChangeScoreInput}
                    ></CustomSliderForSearch>
                </Box>
            );
        });
    return (
        <Box className={style.containerColumnForm}>
            <Grid className={style.contentButtonSubmit}>
                <ButtonCustom
                    label={t('searchForSupplierNew.preservation')}
                    buttonProps={{ className: style.buttonSubmit, onClick: handleSubmit }}
                />
            </Grid>
            <Grid className={style.containerFlex}>
                <Grid className={style.containerLabel}>
                    <label className={style.labelSearch}>{t('searchForSupplierNew.scoreCondition')}</label>
                </Grid>
                <Grid className={style.rightLabelContainer}>
                    <label className={style.labelSearch}>{t('searchForSupplierNew.overallEvaluationWeight')}</label>
                </Grid>
            </Grid>
            <Grid className={style.slider}>{renderFilterList()}</Grid>
        </Box>
    );
};

export default SliderForSearch;
