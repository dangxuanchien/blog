import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    CompanyCompare,
    CompanyDetail,
    CompanyInformation,
    CompareButton,
    CompareDisplay,
    CompanySearchResult,
    ControlDisplay,
} from './types';
import { compareCompanies, detailCompanies, searchCompanies } from './dispatcher';

const initialState: CompanySearchResult = {
    checkedCompanies: [],
    searchedCompanies: [],
    detailCompanies: [],
    compareCompanies: [],
    controlDisplay: {
        compareButtons: {
            isActiveTrustButton: false,
            isActivePriceButton: false,
        },
        compareDisplay: {
            isDisplayTrust: false,
            isDisplayPrice: false,
            isDisplayMoreTable: false,
        },
    },
};

const resultSearchCompanySlice = createSlice({
    initialState,
    name: 'resultSearchCompany',
    reducers: {
        setCheckedCompanies(state, action: PayloadAction<CompanyInformation[]>) {
            state.checkedCompanies = action.payload;
        },
        changeStatusControlDisplay(state, action: PayloadAction<ControlDisplay>) {
            state.controlDisplay = action.payload;
        },
        changeStatusCompareButtons(state, action: PayloadAction<CompareButton>) {
            state.controlDisplay.compareButtons = action.payload;
        },
        changeStatusCompareDisplay(state, action: PayloadAction<CompareDisplay>) {
            state.controlDisplay.compareDisplay = action.payload;
        },
        toggleShowMoreTable(state, action: PayloadAction<boolean>) {
            state.controlDisplay.compareDisplay.isDisplayMoreTable = action.payload;
        },
        resetResultSearchCompany() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(searchCompanies.fulfilled, (state, action: PayloadAction<CompanyInformation[] | undefined>) => {
            state.searchedCompanies = action.payload;
        });
        builder.addCase(detailCompanies.fulfilled, (state, action: PayloadAction<CompanyDetail[] | undefined>) => {
            state.detailCompanies = action.payload;
        });
        builder.addCase(compareCompanies.fulfilled, (state, action: PayloadAction<CompanyCompare[] | undefined>) => {
            state.compareCompanies = action.payload;
        });
    },
});

const resultSearchCompanyReducer = resultSearchCompanySlice.reducer;
export const {
    setCheckedCompanies,
    changeStatusCompareButtons,
    changeStatusCompareDisplay,
    changeStatusControlDisplay,
    resetResultSearchCompany,
    toggleShowMoreTable,
} = resultSearchCompanySlice.actions;

export { resultSearchCompanyReducer };
