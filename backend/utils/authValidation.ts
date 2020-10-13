import {Credentials, CredentialsError} from "../typings";
import * as yup from 'yup';
import {ObjectSchema, ValidationError} from "yup";

const schema: ObjectSchema = yup.object().shape({
    email: yup.string().required("Email field is empty").email("Email is invalid"),
    password: yup.string().required("Password field is invalid").min(6, "Password should be longer than 6 characters")
});

export async function validate(credentials: Credentials): Promise<Array<CredentialsError>> {
    try {
        await schema.validate(credentials, {abortEarly: false});
        return [];
    } catch(error) {
        if(error instanceof ValidationError) {
            const credentialsErrors: Array<CredentialsError> = [];
            error.inner.forEach((error: ValidationError) => {
                credentialsErrors.push(new CredentialsError(error.message, error.path));
            });
            return credentialsErrors;
        }
        throw error;
    }
}