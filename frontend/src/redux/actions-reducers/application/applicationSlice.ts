import {createSlice} from "@reduxjs/toolkit";
import {ApplicationState} from "../../../../typings";
import {fetchUserInfoAction} from "../asyncThunks/fetchUserInfoAction";
import {logoutAction} from "../asyncThunks/logoutAction";
import {loginAction} from "../asyncThunks/loginAction";
import {confirmAccountAction} from "../asyncThunks/confirmAccount";

const initialState: ApplicationState = {showSpinner: false};

const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
    },
    extraReducers: (build) => {
        build.addCase(fetchUserInfoAction.pending, (state: ApplicationState) => {
            state.showSpinner = true;
        });
        build.addCase(loginAction.pending, (state: ApplicationState) => {
            state.showSpinner = true;
        });
        build.addCase(logoutAction.pending, (state: ApplicationState) => {
            state.showSpinner = true;
        });
        build.addCase(confirmAccountAction.pending, (state: ApplicationState) => {
            state.showSpinner = true;
        });
        build.addDefaultCase((state) => {
            state.showSpinner = false;
        });
    }
});

export const {reducer: applicationReducer} = applicationSlice;