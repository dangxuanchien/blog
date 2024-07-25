import { createSlice } from '@reduxjs/toolkit';
// Define a type for the slice state
interface ButtonState {
    searchButton: boolean;
    detailButton: boolean;
    priceCompareButton: boolean;
    settingConditionButton: boolean;
}

// Define the initial state using that type
const initialState: ButtonState = {
    searchButton: false,
    detailButton: false,
    priceCompareButton: false,
    settingConditionButton: true,
};

const stateButton = createSlice({
    name: 'buttonState',
    initialState,
    reducers: {
        setSearchButton: (state) => {
            state.searchButton = true;
            state.detailButton = false;
            state.priceCompareButton = false;
            state.settingConditionButton = false;
        },
        detailButton: (state) => {
            state.searchButton = false;
            state.detailButton = true;
            state.priceCompareButton = false;
            state.settingConditionButton = false;
        },
        priceCompareButton: (state) => {
            state.searchButton = false;
            state.detailButton = false;
            state.priceCompareButton = true;
            state.settingConditionButton = false;
        },
        settingConditionButton: (state) => {
            state.searchButton = false;
            state.detailButton = false;
            state.priceCompareButton = false;
            state.settingConditionButton = true;
        },
        resetButton: (state) => {
            state.searchButton = false;
            state.detailButton = false;
            state.priceCompareButton = false;
            state.settingConditionButton = false;
        },
    },
});
const stateButtonReducer = stateButton.reducer;
export const { setSearchButton, detailButton, priceCompareButton, settingConditionButton, resetButton } =
    stateButton.actions;

export default stateButtonReducer;
