import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getWeighInfoThunk,
    saveWeightInfoThunk,
    searchCompanyByConditionsThunk,
    searchSettingConditionCompanyThunk,
} from './dispatcher';
import {
    ConditionSearchCompanyState,
    ResultSettingSearchConditionItem,
    SearchBusinessConditions,
    SearchScoreConditions,
    SearchWeightConditions,
} from './types';

const initialState: ConditionSearchCompanyState = {
    business: {
        itemCategoryOptions: [],
        itemCategoryGroupOptions: [],
        itemNameOptions: [],
        keyWord: '',
    },
    score: {
        qualityScore: 0,
        costScore: 0,
        deliveryScore: 0,
        financeScore: 0,
        environmentScore: 0,
        laborScore: 0,
        ethicsScore: 0,
        sustainableScore: 0,
    },
    weight: {
        qualityWeight: 1,
        costWeight: 1,
        deliveryWeight: 1,
        financeWeight: 1,
        environmentWeight: 1,
        laborWeight: 1,
        ethicsWeight: 1,
        sustainableWeight: 1,
    },
    candidateList: [],
    resultSearchCompanyList: [],
};

const conditionSearchCompanySlice = createSlice({
    name: 'ConditionSearchCompany',
    initialState,
    reducers: {
        setBusinessCondition(state, action: PayloadAction<SearchBusinessConditions>) {
            state.business = action.payload;
            state.candidateList = [...state.candidateList].map((candidate) => ({
                ...candidate,
                hasChecked: action.payload.itemNameOptions.some((i) => i.value === candidate.itemId),
            }));
        },

        changeBusinessCondition(state, action: PayloadAction<Partial<SearchBusinessConditions>>) {
            state.business = {
                ...state.business,
                ...action.payload,
            };
        },
        setScoreCondition(state, action: PayloadAction<Partial<SearchScoreConditions>>) {
            state.score = {
                ...state.score,
                ...action.payload,
            };
        },
        setWeightCondition(state, action: PayloadAction<Partial<SearchWeightConditions>>) {
            state.weight = {
                ...state.weight,
                ...action.payload,
            };
        },
        setCandidateList(state, action: PayloadAction<ResultSettingSearchConditionItem[]>) {
            state.candidateList = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(searchSettingConditionCompanyThunk.fulfilled, (state, action) => {
            state.candidateList = action.payload;
        });
        builder.addCase(getWeighInfoThunk.fulfilled, (state, action) => {
            state.weight = action.payload[0];
        });
        builder.addCase(searchCompanyByConditionsThunk.fulfilled, (state, action) => {
            state.resultSearchCompanyList = action.payload;
        });
        builder.addCase(saveWeightInfoThunk.fulfilled, (state, action) => {});
    },
});

const conditionSearchCompanyReducer = conditionSearchCompanySlice.reducer;
export const { setBusinessCondition, setScoreCondition, setWeightCondition, changeBusinessCondition } =
    conditionSearchCompanySlice.actions;
export default conditionSearchCompanyReducer;
