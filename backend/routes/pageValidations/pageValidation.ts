import {Request, Response} from "express";
import {FORGOT_PASSWORD_REDIS, INVALID_CONFIRMATION_LINK} from "../../utils/constants";
import {validateUuid} from "../../utils/authValidation";
import {User} from "../../entity/User";
import {getRedisValue} from "../../utils/redis";
import {compare} from "bcrypt";

export function pageValidation(redisTokenType: string): (req: Request, res: Response) => Promise<User> {
    return async(req: Request, res: Response) => {
        const {uuid, token} = req.body as {uuid: string, token: string};

        if(!uuid || !token || (await validateUuid(uuid)).length) {
            res.status(403).send([{message: INVALID_CONFIRMATION_LINK}]);
            throw new Error();
        }

        const user: User | undefined  = await User.findOne({uuid});
        if(!user) {
            res.status(500).send([{message: INVALID_CONFIRMATION_LINK}]);
            throw new Error();
        }

        const savedHashedToken = await getRedisValue(uuid, redisTokenType);

        if(!savedHashedToken) {
            res.status(403).send([{message: INVALID_CONFIRMATION_LINK}]);
            throw new Error();
        }

        if(!await compare(token, savedHashedToken)) {
            res.status(403).send([{message: INVALID_CONFIRMATION_LINK}]);
            throw new Error();
        }
        return user;
    }
}