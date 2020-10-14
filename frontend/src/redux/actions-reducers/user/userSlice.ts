import {AnyAction, createSlice} from "@reduxjs/toolkit";
import {UserState} from "../../../../typings";

export const initialState: UserState = {
    logged_in: false,
    successfulRegistration: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    },
    extraReducers: (build) => {
        build.addDefaultCase((state: UserState, {payload}: AnyAction) => {
            return payload
        })
    }
});


export const {reducer: userReducer} = userSlice;
