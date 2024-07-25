
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    dropdownList:{
        itemCategoryGroup: [],
        itemCategory:[],
        itemName:[],
    }
};
const companySearchConditionDetails = createSlice({
    name: 'filterSearch',
    initialState,
    reducers: {
        addDropdownList(state, action) {
            state.dropdownList = {
                ...state.dropdownList,
                ...action.payload,
            };
        },
        setDropdownList(state, action) {
            state.dropdownList = action.payload;
        }
    },
});
const companySearchConditionDetailsReducer = companySearchConditionDetails.reducer;
export const { addDropdownList, setDropdownList } = companySearchConditionDetails.actions;
export default companySearchConditionDetailsReducer;