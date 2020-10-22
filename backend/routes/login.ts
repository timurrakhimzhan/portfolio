import {Request, Response} from "express";
import {Credentials, CredentialsError, SessionObject} from "../typings";
import {validateAuth} from "../utils/authValidation";
import {User} from "../entity/User";
import {compare} from "bcrypt";
import {getCsrf, getJWT} from "../utils/authTokens";
import {
    ACCOUNT_IS_NOT_CONFIRMED,
    COOKIE_EXPIRATION_TIME,
    EMAIL_FIELD,
    INCORRECT_PASSWORD, LOGIN_ATTEMPT_REDIS,
    LOGIN_ATTEMPT_EXPIRATION_TIME,
    PASSWORD_FIELD,
    USER_DOES_NOT_EXISTS
} from "../utils/constants";
import {getRedisValue, redis, setRedisValue} from "../utils/redis";


export async function loginHandle(req: Request, res: Response){
    const {email, password} = req.body as Credentials;
    try {
        const credentialsError: Array<CredentialsError> = await validateAuth({email, password});
        if(credentialsError.length) {
            res.status(400).send(credentialsError);
            return;
        }
        const user: User | undefined = await User.findOne({email});
        if(!user) {
            const error: CredentialsError = {
                message: USER_DOES_NOT_EXISTS,
                field: EMAIL_FIELD
            };
            res.status(400).send([error]);
            return;
        }
        const loginAttempts: string | null = await getRedisValue(user.uuid, LOGIN_ATTEMPT_REDIS);
        if(!loginAttempts) {
            await setRedisValue(user.uuid, LOGIN_ATTEMPT_REDIS, 1, LOGIN_ATTEMPT_EXPIRATION_TIME);
        } else if(parseInt(loginAttempts) <= 4) {
            await setRedisValue(user.uuid, LOGIN_ATTEMPT_REDIS, parseInt(loginAttempts) + 1, LOGIN_ATTEMPT_EXPIRATION_TIME)
        } else {
            res.status(403).send([{message: "Too many attempts, try later please"}]);
            return;
        }

        if(!(await compare(password, user.password))) {
            const error: CredentialsError = {
                message: INCORRECT_PASSWORD,
                field: PASSWORD_FIELD
            };
            res.status(400).send([error]);
            return;
        }
        if(!user.isConfirmed) {
            res.status(400).send([{message: ACCOUNT_IS_NOT_CONFIRMED}]);
            return;
        }

        user.lastLoginDate = new Date();
        await user.save();
        const jwt = getJWT(user.uuid);
        const csrfToken: string = await getCsrf(req);
        (req.session as SessionObject).uuid = user.uuid;
        res.cookie("jwt", jwt, {httpOnly: true, maxAge: COOKIE_EXPIRATION_TIME});
        res.set("CSRF-TOKEN", csrfToken);
        res.status(200).send({uuid: user.uuid, email: user.email});
    } catch(error) {
        res.status(500).send([{message: error.message}]);
    }
}