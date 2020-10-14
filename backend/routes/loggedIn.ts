import {Response, Request} from "express";
import {User} from "../entity/User";

export async function isloggedInHandle(req: Request, res: Response){
    const {uuid} = req.query as {uuid: string};
    const count = await User.count({uuid});
    if(!count) {
        res.status(403).send([{message: "User not presented in database"}]);
        return;
    }
    res.send({logged_in: true});
}