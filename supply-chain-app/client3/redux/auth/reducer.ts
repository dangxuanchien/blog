import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './type';
import { loginThunk } from './dispatcher';

const initialState: UserState = {
    loginId: '',
    userId: '',
    accessToken: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginThunk.fulfilled, (state, action: PayloadAction<UserState>) => {
            state.loginId = action.payload.loginId;
            state.userId = action.payload.userId;
            state.accessToken = action.payload.accessToken;
        });
    },
});

const authReducer = authSlice.reducer;
export { authReducer };
