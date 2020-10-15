import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";
import {Redirect} from "react-router-dom";
import {logoutAction} from "../../redux/actions-reducers/asyncThunks/logoutAction";

export function LogoutPage() {
    const {logged_in} = useSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(logoutAction());
    }, [dispatch]);
    return <React.Fragment>
        {!logged_in ? <Redirect to={"/"} /> : null}

    </React.Fragment>
}