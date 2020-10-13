import React from "react";
import {Switch, Route} from 'react-router-dom';
import {HomePage} from "../pages/homePage/HomePage";
import {LoginPage} from "../pages/loginPage/LoginPage";
import {RouteI} from "../../typings";

export const routes: Array<RouteI> = [
    {
        path: "/",
        label: "Home",
        component: <HomePage />
    },
    {
        path: "/login",
        label: "Log in",
        component: <LoginPage/>
    }

];

export function Routing() {
    return (
        <Switch>
            {routes.map((route: RouteI) =>
                <Route exact path={route.path} key={route.path}>
                    {route.component}
                </Route>
            )}
        </Switch>
    )
}