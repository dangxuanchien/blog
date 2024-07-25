import axios from '@/api/axios';
import { Endpoints } from '@/api/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from '@/redux/common/types';

const searchSupplier = createAsyncThunk(ActionType.GET_SEARCH_TABLE, (searchObj: any) => {
    const data = axios.post(Endpoints.GET_SEARCH_TABLE, searchObj);
    return data;
});
export { searchSupplier };
