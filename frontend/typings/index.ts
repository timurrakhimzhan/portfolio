import { ReactComponentElement} from "react";

export interface WidthHeightProps {
    width?: string,
    height?: string
}

export interface ShowToggleProps {
    show: boolean
}

export interface RouteI {
    path: string;
    label: string;
    component: ReactComponentElement<any>;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface ServerError {
    message: string;
    field?: string;
}

export interface UserState {
    logged_in: boolean;
    email?: string;
    uuid?: number;
}