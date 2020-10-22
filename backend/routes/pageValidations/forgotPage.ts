import {Request, Response} from "express";
import {FORGOT_PASSWORD_REDIS} from "../../utils/constants";
import {removeRedisValue} from "../../utils/redis";
import {pageValidation} from "./pageValidation";
import {SessionObject} from "../../typings";
import {createForgotToken} from "../../utils/confirmation";

export async function forgotPageHandle(req: Request, res: Response) {
    const {uuid} = req.body as {uuid: string, token: string};

    try {
        await pageValidation(FORGOT_PASSWORD_REDIS)(req, res);
        await removeRedisValue(uuid, FORGOT_PASSWORD_REDIS);
        (req.session as SessionObject).forgotToken = await createForgotToken(uuid);
        res.send();
    } catch(error) {}
}