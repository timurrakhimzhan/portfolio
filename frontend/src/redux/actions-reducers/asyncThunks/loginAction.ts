import {createAsyncThunk} from "@reduxjs/toolkit";
import {Credentials} from "../../../../typings";
import {login} from "../../../utils/apiCalls";
import {errorHandling} from "../../../utils/authentication";

export const loginAction = createAsyncThunk('user/login', async (credentials: Credentials, thunkAPI) => {
    try {
        const response = await login(credentials);
        const csrfToken = response.headers['csrf-token'];
        localStorage.setItem("csrfToken", csrfToken);
        return {...response.data, logged_in: true};
    } catch (error) {
        const processedError = errorHandling(error);
        return thunkAPI.rejectWithValue( processedError);
    }
});