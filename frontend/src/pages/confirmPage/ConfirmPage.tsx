import React, {useEffect, useState} from "react";
import {Redirect} from 'react-router-dom';
import {useAppDispatch} from "../../redux/store";
import {confirmAccountAction} from "../../redux/actions-reducers/asyncThunks/confirmAccount";
import {useParams} from 'react-router-dom';

export function ConfirmPage() {
    const dispatch = useAppDispatch();
    const {uuid, token} = useParams();
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        dispatch(confirmAccountAction({uuid, token})).then(() => {
            setRedirect(true)
        });
    }, [dispatch, uuid, token]);


    return <React.Fragment>
        {redirect ? <Redirect to={"/login"}/> : null}
    </React.Fragment>
}


