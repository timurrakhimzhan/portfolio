import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthFormError, Credentials, UserState} from "../../../../typings";
import {register} from "../../../utils/apiCalls";
import {initialState} from "./userSlice";
import {errorHandling} from "../../../utils/authentication";

export const registerAction = createAsyncThunk("user/register", async(credentials: Credentials): Promise<UserState> => {
    try {
        await register(credentials);
        return {...initialState, successfulRegistration: true};
    } catch (error) {
        const processedError: AuthFormError = errorHandling(error);
        return {...initialState, authFormServerError: processedError};
    }
});