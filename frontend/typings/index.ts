import { ReactComponentElement} from "react";

export interface WidthHeightProps {
    width?: string,
    height?: string
}

export interface ShowToggleProps {
    show: boolean
}

export type RouteItem =  {
    path: string;
    label: string;
    component: ReactComponentElement<any>;
    protection?: RouteProtection
}

export interface RouteProtection {
    protectionFunc(): boolean | Promise<boolean>,
    redirectPath: string
}

export type Credentials = {
    email: string;
    password: string;
}

export type ServerError = {
    message: string;
    field?: string;
}

export type AuthFormError = {
    email?: string;
    password?: string
}

export type UserState = {
    logged_in: boolean;
    successfulRegistration: boolean;
    email?: string;
    uuid?: string;
    authFormServerError?: AuthFormError;
}