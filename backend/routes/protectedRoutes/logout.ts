import {Request, Response} from "express";
import {User} from "../../entity/User";
import {USER_NOT_IN_DB} from "../../utils/constants";

export async function logoutHandler(req: Request, res: Response){
    const uuid = req!.session!.uuid;
    const user: User | undefined = await User.findOne({uuid});
    if(!user) {
        res.status(403).send([{message: USER_NOT_IN_DB}]);
        return;
    }
    req.session?.destroy(() => {
        console.log("Session destroyed");
    });
    res.clearCookie("uuid");
    res.clearCookie("jwt");
    res.send({message: "Successfully logged out"});
}