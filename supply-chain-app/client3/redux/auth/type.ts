export interface UserState {
    loginId: string;
    userId: string;
    accessToken: string;
}

export enum ActionType {
    LOGIN = 'auth/LOGIN',
}

export interface LoginPayload {
    loginId: string;
    password: string;
}
