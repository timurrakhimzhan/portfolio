import {v1} from "uuid";
import {redis, setRedisValue} from "./redis";
import {genSalt, hash} from "bcrypt";
import {CONFIRM_EMAIL_REDIS, CONFIRMATION_EXPIRATION_TIME, HASH_SALT} from "./constants";

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

// export async function createForgotToken(uuid: string) {
//     return createTokenHoc(uuid, forgotPasswordRedis);
//
// }