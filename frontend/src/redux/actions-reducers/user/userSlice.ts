import {AnyAction, createSlice} from "@reduxjs/toolkit";
import {UserState} from "../../../../typings";
import {loginAction} from "../asyncThunks/loginAction";
import {logoutAction} from "../asyncThunks/logoutAction";
import {fetchUserInfoAction} from "../asyncThunks/fetchUserInfoAction";

export const initialState: UserState = {
    logged_in: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    },
    extraReducers: (build) => {
        build.addCase(loginAction.fulfilled, (state: UserState, {payload}: AnyAction) => {
            return {...state, ...payload};
        });
        build.addCase(logoutAction.fulfilled, (state: UserState, {payload}: AnyAction) => {
            return initialState;
        });
        build.addCase(fetchUserInfoAction.fulfilled, (state: UserState, {payload}: AnyAction) => {
            return {...state, ...payload}
        });
        build.addCase(fetchUserInfoAction.rejected, (state: UserState, {payload}: AnyAction) => {
            return initialState;
        })
    }
});


export const {reducer: userReducer} = userSlice;