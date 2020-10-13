import {ObjectSchema} from "yup";
import * as yup from 'yup';

export const schemaAuthentication: ObjectSchema = yup.object().shape({
    email: yup.string().required("Email field is empty").email("Email is invalid"),
    password: yup.string().required("Password field is invalid").min(6, "Password should be longer than 6 characters")
});

export const schemaForgotPass: ObjectSchema = yup.object().shape({
    email: yup.string().required("Email field is empty").email("Email is invalid"),
});
