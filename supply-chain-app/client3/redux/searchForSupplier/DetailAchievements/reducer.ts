import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyEvaluationParameterDetail, DetailAchievementsState } from './type';
import { postCompanyEvaluationDetail } from './dispatcher';

const initialState: DetailAchievementsState = {
    selectedCompanyId: '',
    detailAchievementsTabParams: [],
    dataChart: null,
};

const detailAchievementsSlice = createSlice({
    name: 'DetailAchievements',
    initialState,
    reducers: {
        setSelectedCompanyId: (state, action: PayloadAction<string>) => {
            state.selectedCompanyId = action.payload;
        },
        setDetailAchievementsTabParams: (state, action: PayloadAction<CompanyEvaluationParameterDetail[]>) => {
            state.detailAchievementsTabParams = action.payload;
        },
        setDataChartTemp: (state, action) => {
            state.dataChart = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            postCompanyEvaluationDetail.fulfilled,
            (state, action: PayloadAction<CompanyEvaluationParameterDetail[]>) => {
                state.detailAchievementsTabParams = action.payload;
            }
        );
    },
});

const detailAchievementsReducer = detailAchievementsSlice.reducer;
export const { setDetailAchievementsTabParams, setDataChartTemp } = detailAchievementsSlice.actions;
export { detailAchievementsReducer };
