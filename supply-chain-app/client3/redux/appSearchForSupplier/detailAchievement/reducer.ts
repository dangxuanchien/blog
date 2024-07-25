import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyEvaluationParameterDetail, DetailAchievementsState, OptionsDate } from './type';
import { postCompanyEvaluationDetail } from './dispatcher';

const initialState: DetailAchievementsState = {
    detailAchievementsTabParams: [],
    optionsDate: {
        startDate: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        endDate: new Date(),
    },
};

const detailAchievementsSlice = createSlice({
    name: 'DetailAchievements',
    initialState,
    reducers: {
        setDetailAchievementsTabParams: (state, action: PayloadAction<CompanyEvaluationParameterDetail[]>) => {
            state.detailAchievementsTabParams = action.payload;
        },
        setOptionsDate: (state, action: PayloadAction<OptionsDate>) => {
            state.optionsDate = action.payload;
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

const appDetailAchievementsReducer = detailAchievementsSlice.reducer;
export const { setDetailAchievementsTabParams, setOptionsDate } = detailAchievementsSlice.actions;
export { appDetailAchievementsReducer };
