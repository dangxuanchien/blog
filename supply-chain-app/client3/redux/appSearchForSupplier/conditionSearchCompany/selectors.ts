import { RootState } from '@/redux/store';

export const selectScoreConditions = (state: RootState) => state.conditionSearchCompanyReducer.score;
export const selectWeightConditions = (state: RootState) => state.conditionSearchCompanyReducer.weight;
export const selectBusinessConditions = (state: RootState) => state.conditionSearchCompanyReducer.business;
export const selectCandidateList = (state: RootState) => state.conditionSearchCompanyReducer.candidateList;
export const selectResultSearchCompanyList = (state: RootState) =>
    state.conditionSearchCompanyReducer.resultSearchCompanyList;
