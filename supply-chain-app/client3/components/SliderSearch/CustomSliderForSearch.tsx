import { Box, TextField } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { ChangeEventHandler, FC, FocusEventHandler, ReactNode, useEffect, useState } from 'react';
import useSliderSearchStyles, { IOSSliderStyle } from './SliderSearch.style';
import {
    SearchScoreConditions,
    SearchWeightConditions,
} from '@/redux/appSearchForSupplier/conditionSearchCompany/types';

type Props = {
    nameScore: keyof SearchScoreConditions;
    nameWeight: keyof SearchWeightConditions;
    labelLeft: ReactNode;
    labelRight?: ReactNode;
    weightMaster: SearchWeightConditions;
    min?: number;
    max?: number;
    marked?: boolean;
    valueScores: SearchScoreConditions;
    onBlurInputScore: (value: any) => void;
    weightValue: number;
    scoreValue: number;
    onChangeInputScore: (value: any) => void;
    handleWeightChange: (value: any) => void;
};
const marks = [
    {
        value: 75,
        label: 75,
    },
    {
        value: 100,
        label: 100,
    },
    {
        value: 125,
        label: 125,
    },
];

const CustomSliderForSearch: FC<Props> = ({
    nameScore,
    nameWeight,
    labelLeft,
    labelRight = '',
    min = 70,
    max = 130,
    marked,
    onBlurInputScore,
    onChangeInputScore,
    handleWeightChange,
    weightValue,
    scoreValue,
}) => {
    const classes = useSliderSearchStyles();
    const [inputPercent, setInputPercent] = useState(0);

    const valueSliders = weightValue ? weightValue * 100 : 100;

    const handleInputPercentChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputPercent(Number(e.target.value));
    };

    useEffect(() => {
        if (weightValue) {
            const init = ((weightValue - 1) * 100).toFixed();
            setInputPercent(Number(init));
        }
    }, [weightValue]);

    const minValue = marks[0].value;
    const maxValue = marks[marks.length - 1].value;

    const handleBlurInputPercent: FocusEventHandler<HTMLTextAreaElement> = (e) => {
        const { name, value } = e.target;

        let newValue = 100 + Number(value);
        let inputNumber = Number(value);

        const isValueLessThanMin = newValue < minValue;
        const isValueGreaterThanMax = newValue > maxValue;

        if (isValueLessThanMin) {
            newValue = minValue;
            inputNumber = minValue - 100;
        }
        if (isValueGreaterThanMax) {
            newValue = maxValue;
            inputNumber = maxValue - 100;
        }
        setInputPercent(inputNumber);
        handleWeightChange({ [name]: newValue / 100 });
    };

    return (
        <div style={{ width: '100%' }}>
            <Box display="flex">
                <Box mr="auto">
                    <label className={classes.labelSearch}>{labelLeft}:</label>
                </Box>

                <Box flexBasis={'42px'}>
                    <label className={classes.labelSearch}>{labelRight}</label>
                </Box>
            </Box>

            <Box display="flex" alignItems={'center'}>
                <Box mr="50px">
                    <span className={classes.containerFlexOne}>
                        <ArrowForwardIosIcon className={classes.icons_custom} />
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            InputProps={{
                                classes: { input: classes.input_custom },
                                inputProps: { min: '0', max: '10' },
                            }}
                            name={nameScore}
                            value={scoreValue}
                            onChange={onChangeInputScore}
                            onBlur={onBlurInputScore}
                            className={classes.textFieldNumber}
                            type="number"
                        />
                        <label> /100</label>
                    </span>
                </Box>
                <Box display="flex" flexGrow={1} mr={'10px'}>
                    <IOSSliderStyle
                        marks={marked ? marks : marks.map((el) => ({ value: el.value }))}
                        value={valueSliders}
                        min={min}
                        max={max}
                        name={nameWeight}
                    />
                </Box>

                <Box flexBasis={'42px'}>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        margin="none"
                        InputProps={{ classes: { input: classes.input_custom } }}
                        onBlur={handleBlurInputPercent}
                        name={nameWeight}
                        value={inputPercent}
                        onChange={handleInputPercentChange}
                        type="number"
                        className={classes.textFieldNumber}
                    />
                </Box>
            </Box>
        </div>
    );
};

export default CustomSliderForSearch;
