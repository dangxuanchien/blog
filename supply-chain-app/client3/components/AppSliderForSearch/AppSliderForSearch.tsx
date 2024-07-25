import {
    SearchScoreConditions,
    SearchWeightConditions,
} from '@/redux/appSearchForSupplier/conditionSearchCompany/types';
import { Box, TextField } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { minus, plus, times } from 'number-precision';
import { ChangeEvent, ChangeEventHandler, FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
    MARKS,
    MARK_MAX_VALUE,
    MARK_MIN_VALUE,
    MAX_SCORE,
    MILESTONE,
    RATE_CHANGE,
} from './AppSliderForSearch.constants';
import useSliderSearchStyles, { IOSSliderStyle } from './AppSliderForSearch.style';
import appMemo from '@/utils/appMemo';
type AppSliderForSearchProps = {
    nameScore: keyof SearchScoreConditions;
    nameWeight: keyof SearchWeightConditions;
    labelLeft: ReactNode;
    labelRight?: ReactNode;
    weightMaster: SearchWeightConditions;
    min?: number;
    max?: number;
    marked?: boolean;
    valueScores: SearchScoreConditions;
    weightValue: number;
    scoreValue: number;
    onChangeInputScore: (value: Partial<SearchScoreConditions>) => void;
    onChangeInputWeight: (value: Partial<SearchWeightConditions>) => void;
};

const AppSliderForSearch: FC<AppSliderForSearchProps> = ({
    nameScore,
    nameWeight,
    labelLeft,
    labelRight = '',
    min = 70,
    max = 130,
    marked,
    onChangeInputScore: onChangeInputScoreProps,
    onChangeInputWeight: onChangeInputWeightProps,
    weightValue,
    scoreValue,
}) => {
    const classes = useSliderSearchStyles();

    const defaultValueSlider = weightValue > 0 ? weightValue * MILESTONE : MILESTONE;

    //** Value slider is weight info */
    const [valueSlider, setValueSlider] = useState(defaultValueSlider);
    const weightInputRef = useRef<HTMLInputElement>(null);
    const getValueRenderWeightInfo = (sliderValue: number) => {
        if (sliderValue > MARK_MAX_VALUE) {
            return String(minus(MARK_MAX_VALUE, MILESTONE));
        }
        if (sliderValue < MARK_MIN_VALUE) {
            return String(minus(MARK_MIN_VALUE, MILESTONE));
        }
        return String(minus(sliderValue, MILESTONE));
    };

    const getValueWeightInputValid = (weighInputValue: number) => {
        const maxValue = minus(MARK_MAX_VALUE, MILESTONE);
        const minValue = minus(MARK_MIN_VALUE, MILESTONE);
        if (weighInputValue > maxValue) {
            return maxValue;
        }
        if (weighInputValue < minValue) {
            return minValue;
        }
        return weighInputValue;
    };

    //**SideEffect: Set value default */
    useEffect(() => {
        setValueSlider(defaultValueSlider);
        weightInputRef.current!.value = getValueRenderWeightInfo(defaultValueSlider);
    }, [weightValue]);

    //**SideEffect auto checking valueSlider */
    useEffect(() => {
        if (valueSlider > MARK_MAX_VALUE) {
            setValueSlider(MARK_MAX_VALUE);
            return;
        }
        if (valueSlider < MARK_MIN_VALUE) setValueSlider(MARK_MIN_VALUE);
    }, [valueSlider]);

    //** weight value: 1->25, -25 -> 0 */
    const getValueSlider = (weightValue: number) => {
        return weightValue + MILESTONE;
    };

    const getWeightValueReturned = (weightValue: number) => {
        const flag = times(MILESTONE, RATE_CHANGE);
        return plus(flag, times(weightValue, RATE_CHANGE));
    };

    const handleMovingSlider = (value: number) => {
        weightInputRef.current!.value = getValueRenderWeightInfo(value);
    };

    const onChangeInputWeight = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value.trim() || 0;
        const weightValueValid = getValueWeightInputValid(Number(value));
        weightInputRef.current!.value = String(weightValueValid);
        setValueSlider(getValueSlider(weightValueValid));
        onChangeInputWeightProps({
            [nameWeight]: getWeightValueReturned(weightValueValid),
        });
    };

    const onChangeSliderCommitted = (_: any, value: number | number[]) => {
        setValueSlider(value as number);
        const valueWeightInfoRender = getValueRenderWeightInfo(value as number);
        const valueWeight = getValueWeightInputValid(Number(valueWeightInfoRender));
        onChangeInputWeightProps({
            [nameWeight]: getWeightValueReturned(valueWeight),
        });
    };
    const onChangeInputWeightDebounced = useDebouncedCallback(onChangeInputWeight, 750);

    const onChangeInputScore: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const value = Number(e.target.value);
        if (value < 0 || !value) {
            e.target.value = '0';
        }
        if (value > MAX_SCORE) {
            e.target.value = String(MAX_SCORE);
        }
        onChangeInputScoreProps({
            [nameScore]: value || 0,
        });
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
                            defaultValue={scoreValue}
                            onChange={onChangeInputScore}
                            className={classes.textFieldNumber}
                            type="number"
                        />
                        <label>{`/${MAX_SCORE}`}</label>
                    </span>
                </Box>
                <Box display="flex" flexGrow={1} mr={'10px'}>
                    <IOSSliderStyle
                        marks={marked ? MARKS : MARKS.map((el) => ({ value: el.value }))}
                        defaultValue={valueSlider}
                        min={min}
                        max={max}
                        name={nameWeight}
                        key={`slider-${valueSlider}`}
                        step={1}
                        onChange={(e, value) => {
                            handleMovingSlider(value as number);
                        }}
                        onChangeCommitted={onChangeSliderCommitted}
                    />
                </Box>

                <Box flexBasis={'42px'}>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        margin="none"
                        InputProps={{ classes: { input: classes.input_custom } }}
                        name={nameWeight}
                        onChange={(e) => onChangeInputWeightDebounced(e)}
                        type="number"
                        className={classes.textFieldNumber}
                        inputRef={weightInputRef}
                    />
                </Box>
            </Box>
        </div>
    );
};

export default appMemo(AppSliderForSearch);
