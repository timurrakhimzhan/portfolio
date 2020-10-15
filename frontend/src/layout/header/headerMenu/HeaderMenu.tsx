import React from 'react';
import {HeaderMenuWrapper} from "./HeaderMenuWrapper";
import {routes} from "../../../routing/Routing";
import {useHistory} from 'react-router-dom';
import {MenuItem} from "./MenuItem";



export function HeaderMenu() {
    const history = useHistory();
    return (<HeaderMenuWrapper>
        {routes.filter((route) => route.label)
            .filter((route) => !route.protection || route.protection.protectionFunc())
            .map((route) =>
                (<MenuItem key={route.path} onClick={() => history.push(route.path)}>
                        {route.label!.toUpperCase()}
                </MenuItem>)
            )
        }
    </HeaderMenuWrapper>)
}