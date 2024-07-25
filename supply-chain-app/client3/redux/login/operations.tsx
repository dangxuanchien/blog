import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from 'next/router';
import CacheService from 'service/cache.service';
import UserService from '@/service/user.service';
import { StorageKeys } from 'utils/constants';
import { ASYNC_ACTION_TYPE } from './types';

/**
 * @author Nguyen Phuc Hoang <nguyen.hoang1@hitachivantara.com>
 * Handle login action
 */
export interface IUser {
    loginId: string;
    password: string;
}

/**this is a thunk which dispatch action return function */

const userLogin = createAsyncThunk(ASYNC_ACTION_TYPE.SIGN_IN_SUCCESS, async (user: IUser, thunkAPI) => {
    try {
        const response = await UserService.login(user);

        const userData = response;
        CacheService.set(StorageKeys.LOGIN_ID, userData.loginId);
        CacheService.set(StorageKeys.USER_ID, userData.userId);
        CacheService.set(StorageKeys.TOKEN, userData.accessToken);
        Router.push('/searchforsupplier');
        return userData;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data);
    }
});

export { userLogin };
