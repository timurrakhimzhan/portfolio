import {v1} from "uuid";
import {redis, setRedisValue} from "./redis";
import {genSalt, hash} from "bcrypt";
import {
    CONFIRM_EMAIL_REDIS,
    CONFIRMATION_EXPIRATION_TIME,
    FORGOT_EXPIRATION_TIME,
    FORGOT_PASSWORD_REDIS,
    HASH_SALT
} from "./constants";

async function createTokenHoc(uuid: string, type: string, expTime: number) {
    const token: string = v1();
    const hashedToken: string = await hash(token, await genSalt(HASH_SALT));
    await setRedisValue(uuid, type, hashedToken,  expTime);
    return token;
}

export async function createConfirmationToken(uuid: string) {
    return createTokenHoc(uuid, CONFIRM_EMAIL_REDIS, CONFIRMATION_EXPIRATION_TIME);
}

export function createConfirmationLink(token: string, uuid: string) {
    return `${process.env.FRONTEND_SERVER as string}/confirm/${token}?uuid=${uuid}`;
}

export async function createForgotToken(uuid: string) {
    return createTokenHoc(uuid, FORGOT_PASSWORD_REDIS, FORGOT_EXPIRATION_TIME);
}

export function createForgotLink(token: string, uuid: string) {
    return `${process.env.FRONTEND_SERVER as string}/forgot/${token}?uuid=${uuid}`;
}