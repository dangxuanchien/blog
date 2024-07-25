import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    filters: {
        qualityScore: 0,
        costScore: 0,
        deliveryScore: 0,
        financeScore: 0,
        environmentScore: 0,
        laborScore: 0,
        ethicsScore: 0,
        sustainableScore: 0,
        itemCategoryGroup: [],
        itemCategory: [],
        itemName: [],

        keyWord: '',
    },
    percents: {
        qualityWeight: 1,
        costWeight: 1,
        deliveryWeight: 1,
        financeWeight: 1,
        environmentWeight: 1,
        laborWeight: 1,
        ethicsWeight: 1,
        sustainableWeight: 1,
    },
};
const filterSearchForSupplier = createSlice({
    name: 'filterSearch',
    initialState,
    reducers: {
        addFilter(state, action) {
            state.filters = {
                ...state.filters,
                ...action.payload,
            };
        },
        setPercents(state, action) {
            state.percents = {
                ...state.percents,
                ...action.payload,
            };
        },
        setCondition(state, action) {
            state.filters.itemCategoryGroup = action.payload.itemCategoryGroup;
            state.filters.itemCategory = action.payload.itemCategory;
            state.filters.itemName = action.payload.itemName;
        },
    },
});
const filterSearchForSupplierReducer = filterSearchForSupplier.reducer;
export const { addFilter, setPercents, setCondition } = filterSearchForSupplier.actions;
export default filterSearchForSupplierReducer;
