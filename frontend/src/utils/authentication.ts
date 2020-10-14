import {AuthFormError, ServerError} from "../../typings";
import {AxiosError} from "axios";


export const errorHandling = (error: AxiosError): AuthFormError => {
    if(error.isAxiosError) {
        if(!error.response) {
            return {email: error.message};
        }
        const newErrors: {[key: string]: string} = {};
        const errors = (error.response.data as Array<ServerError>);
        errors.forEach((error: ServerError) => {
            if(!newErrors.hasOwnProperty(error.field || "email")) {
                newErrors[error.field || "email"] = error.message;
            }
        });
        return newErrors;
    } else {
        return {email: error.message};
    }
};