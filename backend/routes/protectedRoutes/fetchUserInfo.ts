import {Response, Request} from "express";
import {User} from "../../entity/User";
import {USER_NOT_IN_DB} from "../../utils/constants";
import {SessionObject} from "../../typings";

export async function fetchUserInfoHandler(req: Request, res: Response){
    const session = req.session as SessionObject;
    const uuid = session.uuid;
    const user: User | undefined = await User.findOne({uuid});
    if(!user) {
        res.status(403).send([{message: USER_NOT_IN_DB}]);
        return;
    }
    res.send({uuid, email: user.email});
}