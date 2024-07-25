import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './constant';
import { detailCompanyAPI } from './apiDetailCompany';

const detailCompany = createSlice({
    name: 'detailCompany',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(detailCompanyAPI.fulfilled, (state, action: any) => {
                state.detailsTable = (action?.payload) || [];
            });
    },
});
const detailCompanyReducer = detailCompany.reducer;
export default detailCompanyReducer;
