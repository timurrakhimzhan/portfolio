import {ObjectSchema} from "yup";
import * as yup from 'yup';
import {EMPTY_EMAIL, EMPTY_PASSWORD, INVALID_EMAIL, SHORT_PASSWORD} from "./constants";

export const schemaAuthentication: ObjectSchema = yup.object().shape({
    email: yup.string().required(EMPTY_EMAIL).email(INVALID_EMAIL),
    password: yup.string().required(EMPTY_PASSWORD).min(6, SHORT_PASSWORD)
});

export const schemaForgotPass: ObjectSchema = yup.object().shape({
    email: yup.string().required(EMPTY_EMAIL).email(INVALID_EMAIL),
});
