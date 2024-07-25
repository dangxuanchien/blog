import { createSlice } from '@reduxjs/toolkit';
import { settingSearchCondition } from './apiSettingConditionSearch';
import { initialState } from './constant';
// import { converTableSearch  } from './convertData';
const searchCondition = createSlice({
    name: 'settingSearchCondition',
    initialState,
    reducers: {
        addCheckedRowList(state, value) {
            state.listChecked = value.payload;
        },
        dataSettingConditionSearch(state, value) {
            state.tableSearchCondition = value.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(settingSearchCondition.fulfilled, (state, action: any) => {
            state.tableSearchCondition = action?.payload || [];
        });
    },
});
export const { addCheckedRowList } = searchCondition.actions;
const settingConditionSearchReducer = searchCondition.reducer;
export default settingConditionSearchReducer;
