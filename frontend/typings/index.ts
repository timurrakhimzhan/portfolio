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
    label?: string;
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

export type ApplicationState = {
    showSpinner: boolean
}

export type UserState = {
    logged_in: boolean;
    email?: string;
    uuid?: string;
}

export type AuthenticationState = {
    registrationInfo?: RegistrationInfoType;
    authFormServerError?: AuthFormError;
}

export type RegistrationInfoType = {
    type: ErrorSuccessType,
    message: string
}

export type ErrorSuccessType = "error" | "success";