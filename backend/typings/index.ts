export interface Credentials {
    email?: string;
    password?: string;
}

export class CredentialsError {
    message: string;
    field?: string;

    constructor(message: string, field?: string) {
        this.message = message;
        this.field = field;
    }
}

export interface ErrorType {
    message: string
}

export type SessionObject = {
    csrfSecret?: string;
    uuid?: string;
    forgotToken?: string;
}