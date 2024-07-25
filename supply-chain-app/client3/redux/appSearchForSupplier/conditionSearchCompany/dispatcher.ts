import axios from '@/api/axios';
import { Endpoints } from '@/api/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    ActionType,
    ResultSearchCompanyItem,
    ResultSettingSearchConditionItem,
    SearchWeightConditions,
    SettingSearchConditionPayload,
} from './types';
import { RootState } from '@/redux/store';
import { getValuesCheckedFromBusinessOptions } from './helper';

export const searchSettingConditionCompanyThunk = createAsyncThunk(
    ActionType.SEARCH_SETTINGS_CONDITION,
    async (body: SettingSearchConditionPayload): Promise<ResultSettingSearchConditionItem[]> => {
        return await axios.post<ResultSettingSearchConditionItem[]>(Endpoints.GET_SETTING_CONDITION_SEARCH, body);
    }
);

export const getWeighInfoThunk = createAsyncThunk(
    ActionType.GET_WEIGHT_INFO,
    async (): Promise<SearchWeightConditions[]> => {
        return await axios.get<SearchWeightConditions[]>(Endpoints.GET_WEIGHT);
    }
);

export const searchCompanyByConditionsThunk = createAsyncThunk(ActionType.SEARCH_COMPANY, async (_, { getState }) => {
    const state = getState() as RootState;
    const { business, score, weight } = state.conditionSearchCompanyReducer;
    const itemCategoryGroup = getValuesCheckedFromBusinessOptions(business.itemCategoryGroupOptions);
    const itemCategory = getValuesCheckedFromBusinessOptions(business.itemCategoryOptions);
    const itemName = getValuesCheckedFromBusinessOptions(business.itemNameOptions);
    return await axios.post<ResultSearchCompanyItem[]>(Endpoints.GET_SEARCH_TABLE, {
        ...score,
        itemCategoryGroup,
        itemCategory,
        itemName,
        ...weight,
        keyWord: business.keyWord ?? '',
    });
});

export const saveWeightInfoThunk = createAsyncThunk(ActionType.SAVE_WEIGHT_INFO, async (_, { getState }) => {
    const state = getState() as RootState;
    const { weight } = state.conditionSearchCompanyReducer;
    return await axios.post(Endpoints.SAVE_WEIGHT, weight);
});
