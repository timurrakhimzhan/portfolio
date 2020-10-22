import {Request, Response} from "express";
import {User} from "../../entity/User";
import {
    CONFIRM_EMAIL_REDIS,
} from "../../utils/constants";
import {removeRedisValue} from "../../utils/redis";
import {pageValidation} from "./pageValidation";


export async function confirmPageHandle(req: Request, res: Response) {
    const {uuid} = req.body as {uuid: string, token: string};

    try {
        const user: User = await pageValidation(CONFIRM_EMAIL_REDIS)(req, res);
        await removeRedisValue(uuid, CONFIRM_EMAIL_REDIS);
        user.isConfirmed = true;
        await user.save();
        res.send();
    } catch(error) {}
}