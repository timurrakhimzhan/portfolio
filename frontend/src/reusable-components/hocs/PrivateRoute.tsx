import React, {useEffect, useState} from "react";
import {Route, Redirect} from 'react-router';
import {RouteProps} from "react-router-dom";

export function PrivateRoute(props: {protection(): boolean | Promise<boolean>, redirectPath: string} & RouteProps) {
    const {children, protection, redirectPath} = props;
    const [showSpinner, setShowSpinner] = useState(false);
    const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        Promise.resolve(protection()).then((res) => {
            setShowSpinner(true);
            setAccepted(res);
        })
    });
    if(showSpinner) {
        return <Route {...props}>
            <span>Spinner</span>}
        </Route>
    }
    return accepted ? <Redirect to={redirectPath}/> : <Route {...props}>{children}</Route>
}