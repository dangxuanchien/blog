import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType, CompanyEvaluationParameterDetail, CompanyInfos } from './type';
import axios from 'api/axios';
import { Endpoints } from 'api/endpoints';

export const postCompanyEvaluationDetail = createAsyncThunk(
    ActionType.POST_COMPANY_EVALUATION_PARAMETER_DETAIL,
    async (body: CompanyInfos): Promise<CompanyEvaluationParameterDetail[]> => {
        const response = await axios.post<CompanyEvaluationParameterDetail[]>(
            Endpoints.COMPANY_EVALUATION_PARAMETER_DETAIL,
            body
        );
        return response;
    }
);
