import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserState} from "../../../typings";

const initialState: UserState = {
    logged_in: false,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, {payload}: PayloadAction<UserState>) => {
            state.logged_in = true;
            state.email = payload.email;
            state.uuid = payload.uuid;
        },
        logout: (state) => {
            state.logged_in = false;
            delete state.email;
            delete state.uuid;
        }
    }
});


export const {reducer: userReducer} = userSlice;
export const {login: loginAction, logout: logoutAction} = userSlice.actions;