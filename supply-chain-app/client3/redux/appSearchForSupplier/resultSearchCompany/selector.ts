import { RootState } from '@/redux/store';

export const selectSearchedCompanies = (state: RootState) => state.resultSearchCompany.searchedCompanies;
export const selectCheckedCompanies = (state: RootState) => state.resultSearchCompany.checkedCompanies;
export const selectDetailCompanies = (state: RootState) => state.resultSearchCompany.detailCompanies;
export const selectCompareCompanies = (state: RootState) => state.resultSearchCompany.compareCompanies;
export const selectControlDisplay = (state: RootState) => state.resultSearchCompany.controlDisplay;
