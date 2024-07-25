import axios from '@/api/axios';
import { Endpoints } from '@/api/endpoints';
import { RootState } from '@/redux/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getValuesCheckedFromBusinessOptions } from '../conditionSearchCompany/helper';
import { getTypeSearch } from './helper';
import { ActionType, CompanyInformation, CompareCompanyPayload } from './types';
import { setCheckedCompanies } from './reducer';

export const searchCompanies = createAsyncThunk(ActionType.GET_SEARCH_INFO_COMPANIES, async (_, { getState }) => {
    const state = getState() as RootState;
    const { business, score, weight } = state.conditionSearchCompanyReducer;
    const itemCategoryGroup = getValuesCheckedFromBusinessOptions(business.itemCategoryGroupOptions);
    const itemCategory = getValuesCheckedFromBusinessOptions(business.itemCategoryOptions);
    const itemName = getValuesCheckedFromBusinessOptions(business.itemNameOptions);

    const data = await axios.post(Endpoints.GET_SEARCH_TABLE, {
        ...score,
        itemCategoryGroup,
        itemCategory,
        itemName,
        ...weight,
        keyWord: business.keyWord ?? '',
    });
    return data.map((item, index) => {
        return {
            ...item,
            id: index,
            productCategoryGroup: item?.itemCategoryGroups,
            itemCategory: item?.itemCategories,
            itemName: item?.items,
            originalItemName: item?.originalItemNames,
        };
    });
});

export const detailCompanies = createAsyncThunk(ActionType.GET_DETAIL_INFO_COMPANY, async (_, { getState }) => {
    const state = getState() as RootState;
    const { business, score, weight } = state.conditionSearchCompanyReducer;
    const { checkedCompanies } = state.resultSearchCompany;
    const itemCategoryGroup = getValuesCheckedFromBusinessOptions(business.itemCategoryGroupOptions);
    const itemCategory = getValuesCheckedFromBusinessOptions(business.itemCategoryOptions);
    const itemName = getValuesCheckedFromBusinessOptions(business.itemNameOptions);
    const typeSearch = getTypeSearch(itemName, itemCategory, itemCategoryGroup);
    const requestBody = {
        type: typeSearch,
        data: {
            ...score,
            ...weight,
            companies: checkedCompanies,
            itemCategoryGroupIds: itemCategoryGroup,
            categoryIds: itemCategory,
            itemIds: itemName,
        },
    };
    const data = await axios.post(Endpoints.COMPANY_EVALUATION_COMPANY_DETAIL, requestBody);
    return data;
});

export const compareCompanies = createAsyncThunk(
    ActionType.GET_COMPARE_INFO_COMPANY,
    async (payload: CompareCompanyPayload, { rejectWithValue }) => {
        const data = await axios.post(Endpoints.COMPANY_EVALUATION_PRICE_COMPARE, payload);
        return data.flatMap((current) =>
            current.transactions.map((transaction) => ({
                updateDate: transaction.updateDate,
                companyId: current.companyId,
                actualPrice: transaction.actualPrice,
                orderQuantity: transaction.orderQuantity,
                proposedPrice: transaction.proposedPrice,
            }))
        );
    }
);
