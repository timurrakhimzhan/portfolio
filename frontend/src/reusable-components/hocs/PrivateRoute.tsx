import React, {useEffect, useState} from "react";
import {Route, Redirect} from 'react-router';
import {RouteProps} from "react-router-dom";

export function PrivateRoute(props: {protectionFunc(): boolean | Promise<boolean>, redirectPath: string} & RouteProps) {
    const {children, protectionFunc, redirectPath} = props;
    const [showSpinner, setShowSpinner] = useState(true);
    const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        Promise.resolve(protectionFunc()).then((res) => {
            setAccepted(res);
            setShowSpinner(false);
        })
    }, [protectionFunc]);
    if(showSpinner) {
        return <Route {...props}>
            <span>Spinner</span>
        </Route>
    }
    return !accepted && !showSpinner ? <Redirect to={redirectPath}/> : <Route {...props}>{children}</Route>
}