import {Credentials, ServerError} from "../../../../typings";
import {login, register} from "../../../utils/apiCalls";
import {AxiosError} from "axios";
import {loginAction} from "../../../redux/reducers/userSlice";
import {useDispatch} from "react-redux";

export const onRegisterClick = async (values: Credentials, setServerErrors: Function, setSuccessRegistration: Function) => {
    try {
        await register(values);
        setSuccessRegistration(true);
    } catch(error) {
        errorHandling(error, setServerErrors)
    }
};

export const onLoginClick = async(values: Credentials, setServerErrors: Function, successLogin: Function) => {
    try {
        const response = await login(values);
        const {accessToken, uuid, email} = response.data;
        successLogin(uuid, email, accessToken);
    } catch(error) {
        errorHandling(error, setServerErrors)
    }
};

const errorHandling = (error: AxiosError, setServerErrors: Function) => {
    if(error.isAxiosError) {
        if(!error.response) {
            setServerErrors({email: error.message});
            return;
        }
        const newErrors: {[key: string]: string} = {};
        const errors = (error.response.data as Array<ServerError>);
        errors.forEach((error: ServerError) => {
            if(!newErrors.hasOwnProperty(error.field || "email")) {
                newErrors[error.field || "email"] = error.message;
            }
        });
        setServerErrors(newErrors);
    } else {
        setServerErrors({email: error.message});
    }
}