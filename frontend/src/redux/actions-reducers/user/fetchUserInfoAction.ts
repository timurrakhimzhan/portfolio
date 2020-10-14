import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserState} from "../../../../typings";
import {fetchUserInfo} from "../../../utils/apiCalls";
import {initialState} from "./userSlice";

export const fetchUserInfoAction = createAsyncThunk('user/fetchUserInfo', async (): Promise<UserState> => {
    const csrfToken = localStorage.getItem("csrfToken");
    if (!csrfToken) {
        return initialState
    }
    try {
        const response = await fetchUserInfo(csrfToken);
        const {uuid, email} = response.data as UserState;
        if (!uuid || !email) {
            return initialState;
        }
        return {...initialState, logged_in: true, email, uuid}
    } catch (error) {
        return initialState
    }
});