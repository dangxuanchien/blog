import axios from '@/api/axios';
import { Endpoints } from '@/api/endpoints';
import { ActionType } from '@/redux/common/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

const detailCompanyAPI = createAsyncThunk(ActionType.GET_DETAIL_COMPANY, (searchObj: any) => {
    const data = axios.post(Endpoints.COMPANY_EVALUATION_COMPANY_DETAIL, searchObj);
    console.log(data);
    return data;
});
export { detailCompanyAPI };
