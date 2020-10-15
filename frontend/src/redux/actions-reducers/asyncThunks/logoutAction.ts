import {createAsyncThunk} from "@reduxjs/toolkit";

export const logoutAction = createAsyncThunk('user/logout', async () => {
    try {
        await logoutAction();
        localStorage.clear();
    } catch (e) {
        console.log("Error while logouting")
    }
});