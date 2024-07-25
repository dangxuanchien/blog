import { createSlice } from '@reduxjs/toolkit';
import { searchSupplier } from './apiSearchForSupplier';
import { initialState } from './constant';
import { converTableSearch } from './convertData';
const searchForSupplier = createSlice({
    name: 'searchForSupplier',
    initialState,
    reducers: {
        selectRow(state, value) {
            state.tableSearchData = value.payload;
        },
        addCheckedRowList(state, value) {
            state.checkedCompanyData = value.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(searchSupplier.pending, (state) => {
                console.log('loading...');
            })
            .addCase(searchSupplier.fulfilled, (state, action: any) => {
                // Load data to redux for search Supplier
                state.tableSearchData = converTableSearch(action?.payload) || [];
            })
            .addCase(searchSupplier.rejected, (state) => {
                console.log('err');
            });
    },
});
export const { selectRow, addCheckedRowList } = searchForSupplier.actions;
const searchForSupplierReducer = searchForSupplier.reducer;
export default searchForSupplierReducer;
