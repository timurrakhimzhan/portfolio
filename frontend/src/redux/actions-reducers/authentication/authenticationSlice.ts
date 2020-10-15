import {createSlice, AnyAction} from "@reduxjs/toolkit";
import {
    CONFIRMED_REGISTRATION,
    ERROR,
    ERROR_CONFIRMED_REGISTRATION,
    REGISTRATION_THANKS,
    SUCCESS
} from "../../../utils/constants";
import {AuthenticationState} from "../../../../typings";
import {registerAction} from "../asyncThunks/registerAction";
import {loginAction} from "../asyncThunks/loginAction";
import {confirmAccountAction} from "../asyncThunks/confirmAccount";

const initialState: AuthenticationState = {};

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        resetAuthState: (state) => {
            delete state.authFormServerError;
            delete state.registrationInfo;
        }
    }, extraReducers: (build) => {
        build.addCase(registerAction.fulfilled, (state: AuthenticationState, {payload}: AnyAction) => {
            state.registrationInfo = {
                type: SUCCESS,
                message: REGISTRATION_THANKS
            };
        });
        build.addCase(registerAction.rejected, (state: AuthenticationState, {payload}: AnyAction) => {
            state.authFormServerError = payload;
        });
        build.addCase(loginAction.rejected, (state: AuthenticationState, {payload}: AnyAction) => {
            state.authFormServerError = payload;
        });
        build.addCase(confirmAccountAction.fulfilled, (state) => {
            state.registrationInfo = {
                type: SUCCESS,
                message: CONFIRMED_REGISTRATION
            }
        });
        build.addCase(confirmAccountAction.rejected, (state) => {
            state.registrationInfo = {
                type: ERROR,
                message: ERROR_CONFIRMED_REGISTRATION
            }
        })
    }
});

export const {reducer: authenticationReducer} = authenticationSlice;
export const {resetAuthState} = authenticationSlice.actions;