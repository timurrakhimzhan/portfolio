import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserState} from "../../../../typings";
import {fetchUserInfo} from "../../../utils/apiCalls";

export const fetchUserInfoAction = createAsyncThunk('user/fetchUserInfo', async (state, thunkAPI): Promise<{[key in keyof UserState]?: UserState[key]}>=> {
    const csrfToken = localStorage.getItem("csrfToken");
    if (!csrfToken) {
        throw new Error();
    }
    try {
        const response = await fetchUserInfo(csrfToken);
        const {uuid, email} = response.data as UserState;
        if (!uuid || !email) {
            throw new Error();
        }
        return {logged_in: true, email, uuid}
    } catch (error) {
        throw new Error()
    }
});