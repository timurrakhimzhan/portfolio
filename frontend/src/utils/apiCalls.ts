import axios from 'axios';
import {Credentials} from "../../typings";

const API_URL = process.env.API_URL || "http://localhost:4000/api";

export function register({email, password}: Credentials) {
    return axios.post(API_URL + "/register", {email, password});
}

export function login({email, password}: Credentials) {
    return axios.get(API_URL + "/login", {params: {email, password}, withCredentials: true});
}

export function logout() {
    return axios.get(API_URL + "/logout", {withCredentials: true});
}

export function fetchUserInfo(csrfToken: string) {
    return axios.get(API_URL + "/fetchUserInfo",
        {
            withCredentials: true,
            headers: {
                "CSRF-TOKEN": csrfToken
            }
        },
    );
}