import {createAsyncThunk} from "@reduxjs/toolkit";
import {Credentials, UserState} from "../../../../typings";
import {login} from "../../../utils/apiCalls";
import {errorHandling} from "../../../utils/authentication";
import {initialState} from "./userSlice";

export const loginAction = createAsyncThunk('user/login', async (credentials: Credentials): Promise<UserState> => {
    try {
        const response = await login(credentials);
        const csrfToken = response.headers['csrf-token'];
        localStorage.setItem("csrfToken", csrfToken);
        return {...response.data, ...initialState, logged_in: true};
    } catch (error) {
        const processedError = errorHandling(error);
        return {...initialState, authFormServerError: processedError};
    }
});