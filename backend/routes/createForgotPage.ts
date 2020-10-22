import {validateEmail} from "../utils/authValidation";
import {
    CANT_GENERATE_FORGOT_LINK,
    EMPTY_EMAIL, FORGOT_EXPIRATION_TIME, FORGOT_MAIL_FAIL,
    FORGOT_PASSWORD_REDIS,
    USER_NOT_IN_DB
} from "../utils/constants";
import {Request, Response} from "express";
import {User} from "../entity/User";
import {ErrorType} from "../typings";
import {getRedisValue, setRedisValue} from "../utils/redis";
import {createForgotLink, createForgotToken} from "../utils/confirmation";
import {sendForgotEmail} from "../utils/mailer";

export async function createForgotPageHandle(req: Request, res: Response) {
    const {email} = req.body as {email: string};

    if(!email) {
        res.status(400).send([{message: EMPTY_EMAIL}]);
        return;
    }

    const emailError: Array<ErrorType> = await validateEmail(email);
    if(emailError.length) {
        res.status(400).send(emailError);
        return;
    }

    const user: User | undefined = await User.findOne({email});
    if(!user) {
        res.status(400).send([{message: USER_NOT_IN_DB}]);
        return;
    }

    if(await getRedisValue(user.uuid, FORGOT_PASSWORD_REDIS)) {
        res.status(400).send([{message: CANT_GENERATE_FORGOT_LINK}]);
        return;
    }

    const forgotToken: string = await createForgotToken(user.uuid);
    await setRedisValue(user.uuid, FORGOT_PASSWORD_REDIS, forgotToken, FORGOT_EXPIRATION_TIME);

    if(process.env.NODE_ENV === "development") {
        console.log(user.email, user.uuid, forgotToken);
    } else {
        try {
            await sendForgotEmail(user.email, createForgotLink(forgotToken, user.uuid));
        } catch(error) {
            res.status(400).send([{message: FORGOT_MAIL_FAIL}]);
            return;
        }
    }
    res.send();


}