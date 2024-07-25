import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType, LoginPayload, UserState } from './type';
import axios from '@/api/axios';
import { Endpoints } from '@/api/endpoints';
import StorageUtils from '@/utils/storage';

export const loginThunk = createAsyncThunk(ActionType.LOGIN, async (body: LoginPayload, { rejectWithValue }) => {
    try {
        const res: UserState = await axios.post(Endpoints.LOGIN, body);
        StorageUtils.set('accessToken', res.accessToken);
        StorageUtils.set('loginId', res.loginId);
        StorageUtils.set('userId', res.userId);
        return res;
    } catch (error) {
        return rejectWithValue(error);
    }
});
