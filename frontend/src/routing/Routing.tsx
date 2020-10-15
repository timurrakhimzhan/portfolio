import React from "react";
import {Switch, Route} from 'react-router-dom';
import {HomePage} from "../pages/homePage/HomePage";
import {LoginPage} from "../pages/loginPage/LoginPage";
import {RouteItem} from "../../typings";
import {isAuth} from "../utils/isAuth";
import {PrivateRoute} from "../reusable-components/hocs/PrivateRoute";
import {LogoutPage} from "../pages/logoutPage/LogoutPage";
import {ConfirmPage} from "../pages/confirmPage/ConfirmPage";

export const routes: Array<RouteItem> = [
    {
        path: "/",
        label: "Home",
        component: <HomePage />
    },
    {
        path: "/login",
        label: "Log in",
        component: <LoginPage/>,
        protection: {
            protectionFunc: () => !isAuth(),
            redirectPath: "/"
        }
    },
    {
        path: "/logout",
        label: "Log out",
        component: <LogoutPage/>,
        protection: {
            protectionFunc: () => isAuth(),
            redirectPath: "/"
        }
    },
    {
        path: "/confirm/:uuid/:token",
        component: <ConfirmPage/>,
        protection: {
            protectionFunc: () => !isAuth(),
            redirectPath: "/"
        }
    }

];

export function Routing() {
    return (
        <Switch>
            {
                routes.map((route: RouteItem, i) => {
                    if(route.protection) {
                        return <PrivateRoute protectionFunc={route.protection.protectionFunc}
                                             redirectPath={route.protection.redirectPath}
                                             path={route.path} exact
                                             key={i}>
                            {route.component}
                        </PrivateRoute>
                    } else {
                        return <Route path={route.path} exact key={i}>
                            {route.component}
                        </Route>
                    }
                })
            }
        </Switch>
    )
}