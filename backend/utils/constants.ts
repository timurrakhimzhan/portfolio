export const EMAIL_FIELD = "email";
export const PASSWORD_FIELD = "password";

export const INCORRECT_PASSWORD = "incorrectPassword";
export const USER_DOES_NOT_EXISTS = "userNotExist";
export const USER_ALREADY_REGISTERED = "userAlreadyRegistered";
export const CONFIRMATION_MAIL_FAIL = "confirmationMailFail";
export const FORGOT_MAIL_FAIL = "forgotMailFail";
export const ACCOUNT_IS_NOT_CONFIRMED = "accountNotConfirmed";

export const EMPTY_EMAIL = "emptyEmail";
export const INVALID_EMAIL = "invalidEmail";
export const EMPTY_PASSWORD = "emptyPassword";
export const SHORT_PASSWORD = "incorrectPassword";

export const INVALID_UUID = "Incorrect uuid";
export const USER_NOT_IN_DB = "User not presented in database";
export const SERVER_SESSION_ERROR = "Server error: session not presented";
export const USER_NOT_AUTHORIZED = "User not authorized";

export const INVALID_CONFIRMATION_LINK = "Invalid confirmation link";
export const CANT_GENERATE_FORGOT_LINK = "Could not generate forgot link";
export const INVALID_FORGOT_LINK = "Invalid forgot link";

export const HASH_SALT = 4;

export const LOGIN_ATTEMPT_EXPIRATION_TIME = 1000 * 60;
export const COOKIE_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7;
export const CONFIRMATION_EXPIRATION_TIME = 1000 * 60 * 60 * 24;
export const FORGOT_EXPIRATION_TIME = 1000 * 60 * 60;

export const SECRET_WORD = process.env.SECRET_WORD as string;
export const SMTP_EMAIL = process.env.SMTP_EMAIL as string;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD as string;

export const LOGIN_ATTEMPT_REDIS="login_attempts";
export const CONFIRM_EMAIL_REDIS="confirm_email";
export const FORGOT_PASSWORD_REDIS="forgot_password";

