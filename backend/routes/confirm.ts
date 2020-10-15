import {Request, Response} from "express";
import {User} from "../entity/User";
import {
    CONFIRM_EMAIL_REDIS,
    EMAIL_FIELD,
    HASH_SALT,
    INVALID_CONFIRMATION_LINK,
    USER_ALREADY_REGISTERED
} from "../utils/constants";
import {compare} from "bcrypt";
import {DatabaseType} from 'typeorm'
import {validateUuid} from "../utils/authValidation";
import {getRedisValue} from "../utils/redis";


export async function confirmHandle(req: Request, res: Response) {
    const {uuid, token} = req.params as {uuid: string, token: string};

    if(!uuid || !token) {
        res.status(403).send([{message: INVALID_CONFIRMATION_LINK}]);
        return;
    }

    const uuidValidationError = await validateUuid(uuid);
    if(uuidValidationError.length) {
        res.status(403).send(uuidValidationError);
        return;
    }

    const user: User | undefined  = await User.findOne({uuid});
    if(!user) {
        res.status(500).send([{message: INVALID_CONFIRMATION_LINK}]);
        return;
    }

    const savedHashedToken = await getRedisValue(uuid, CONFIRM_EMAIL_REDIS);

    if(!savedHashedToken) {
        res.status(403).send([{message: INVALID_CONFIRMATION_LINK}]);
        return;
    }

    if(!await compare(token, savedHashedToken)) {
        res.status(403).send([{message: INVALID_CONFIRMATION_LINK}]);
        return;
    }

    user.isConfirmed = true;
    await user.save();
    res.send();
}