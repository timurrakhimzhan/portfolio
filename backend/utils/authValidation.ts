import {Credentials, CredentialsError, ErrorType} from "../typings";
import * as yup from 'yup';
import {ObjectSchema, Schema, ValidationError} from "yup";
import {EMPTY_EMAIL, EMPTY_PASSWORD, INVALID_EMAIL, INVALID_UUID, SHORT_PASSWORD} from "./constants";

const authSchema: ObjectSchema = yup.object().shape({
    email: yup.string().required(EMPTY_EMAIL).email(INVALID_EMAIL),
    password: yup.string().required(EMPTY_PASSWORD).min(6, SHORT_PASSWORD)
});

const uuidSchema: Schema<string> = yup.string().required(INVALID_UUID).uuid(INVALID_UUID);

export async function validateUuid(uuid: string): Promise<Array<ErrorType>> {
    try {
        await uuidSchema.validate(uuid);
        return []
    } catch(error) {
        return [{message: error.message}];
    }
}

export async function validateAuth(credentials: Credentials): Promise<Array<CredentialsError>> {
    try {
        await authSchema.validate(credentials, {abortEarly: false});
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