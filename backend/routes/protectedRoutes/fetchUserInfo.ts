import {Response, Request} from "express";
import {User} from "../../entity/User";
import {USER_NOT_IN_DB} from "../../utils/constants";

export async function fetchUserInfoHandler(req: Request, res: Response){
    const uuid = req!.session!.uuid;
    const user: User | undefined = await User.findOne({uuid});
    if(!user) {
        res.status(403).send([{message: USER_NOT_IN_DB}]);
        return;
    }
    res.send({uuid, email: user.email});
}