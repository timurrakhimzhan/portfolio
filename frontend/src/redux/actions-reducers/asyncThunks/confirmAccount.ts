import {createAsyncThunk} from "@reduxjs/toolkit";
import {confirmAccount} from "../../../utils/apiCalls";

export const confirmAccountAction = createAsyncThunk("confirmAccount", async({uuid, token}: {uuid: string, token: string}) => {
    try {
        await confirmAccount(uuid, token);
    } catch(error) {
        return Promise.reject();
    }
});