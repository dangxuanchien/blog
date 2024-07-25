import axios from '@/api/axios';
import { Endpoints } from '@/api/endpoints';
import { ActionType } from '@/redux/common/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { EnterpriseSearchItem, RequesConditionSearch } from './types';

const settingSearchCondition = createAsyncThunk(
    ActionType.GET_CONDITION_SEARCH,
    async (searchObj: RequesConditionSearch): Promise<EnterpriseSearchItem[]> => {
        const response = await axios.post<EnterpriseSearchItem[]>(Endpoints.GET_SETTING_CONDITION_SEARCH, searchObj);
        return response;
    }
);
export { settingSearchCondition };
