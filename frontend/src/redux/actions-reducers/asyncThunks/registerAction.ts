import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthFormError, Credentials} from "../../../../typings";
import {register} from "../../../utils/apiCalls";
import {errorHandling} from "../../../utils/authentication";

export const registerAction = createAsyncThunk("authentication/register", async(credentials: Credentials, thunkAPI)=> {
    try {
        await register(credentials);
    } catch (error) {
        const processedError: AuthFormError = errorHandling(error);
        return thunkAPI.rejectWithValue(processedError);
    }
});