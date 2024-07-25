import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from './operations';
const initialState = {
    loginId: '',
    message: '!ログインIDまたはパスワードが違います。',
    loading: false,
    weightMaster: {},
};

const userSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        clearUserState: (state) => {
            state = initialState;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, action: any) => {
                state.loading = false;
                state.loginId = action.payload?.loginId;
                state.weightMaster = action.payload?.weightMaster;
            })
            .addCase(userLogin.rejected, (state, action: any) => {
                state.loading = false;
                state.loginId = action.payload;
            });
    },
});

const { actions, reducer } = userSlice;
export const { clearUserState } = actions;
export default reducer;
