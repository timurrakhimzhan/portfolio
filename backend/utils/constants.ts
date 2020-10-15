export const EMAIL_FIELD = "email";
export const PASSWORD_FIELD = "password";

export const INCORRECT_PASSWORD = "Incorrect password";
export const USER_DOES_NOT_EXISTS = "User with such email is not registered";
export const USER_ALREADY_REGISTERED = "User with such email is already registered";
export const CONFIRMATION_MAIL_FAIL = "Failed sending confirmation mail";
export const ACCOUNT_IS_NOT_CONFIRMED = "Account is not confirmed";

export const EMPTY_EMAIL = "Email field is empty";
export const INVALID_EMAIL = "Email is invalid";
export const EMPTY_PASSWORD = "Password field is empty";
export const SHORT_PASSWORD = "Password should be longer than 6 characters";
export const INVALID_UUID = "Incorrect uuid";

export const USER_NOT_IN_DB = "User not presented in database";
export const SERVER_SESSION_ERROR = "Server error: session not presented";
export const USER_NOT_AUTHORIZED = "User not authorized";

export const INVALID_CONFIRMATION_LINK = "Invalid confirmation link";

export const HASH_SALT = 4;

export const LOGIN_ATTEMPT_EXPIRATION_TIME = 1000 * 60;
export const COOKIE_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7;
export const CONFIRMATION_EXPIRATION_TIME = 1000 * 60 * 60 * 24;
export const SECRET_WORD = process.env.SECRET_WORD as string;
export const SMTP_EMAIL = process.env.SMTP_EMAIL as string;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD as string;

export const LOGIN_ATTEMPT_REDIS="login_attempts";
export const CONFIRM_EMAIL_REDIS="confirm_email";

