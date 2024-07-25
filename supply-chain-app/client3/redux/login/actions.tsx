import * as types from './types';

export const signInSuccess = (loginId: string): any => {
    return {
        type: types.SIGN_IN_SUCCESS,
        loginId,
    };
};

export const signInFailed = (message: string): any => ({
    type: types.SIGN_IN_FAILED,
    message: message,
});

export const signOutSuccess = (data?: any): any => ({
    type: types.SIGN_OUT_SUCCESS,
    data,
});

export const signOutFailed = (message: string): any => ({
    type: types.SIGN_OUT_FAILED,
    message,
});

export const clearMessage = (): any => ({
    type: types.CLEAR_MESSAGE,
});
/** create action here */
