import {Response, Request} from "express";
import {User} from "../entity/User";

export async function fetchUserInfoHandler(req: Request, res: Response){
    const {uuid} = req.query as {uuid: string};
    const user: User | undefined = await User.findOne({uuid});
    if(!user) {
        res.status(403).send([{message: "User not presented in database"}]);
        return;
    }
    res.send({uuid, email: user.email});
}