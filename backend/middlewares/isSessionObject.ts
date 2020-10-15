import {NextFunction, Request, Response} from "express";
import {SERVER_SESSION_ERROR} from "../utils/constants";
import {SessionObject} from "../typings";

export async function isSessionObject(req: Request, res: Response, next: NextFunction){
    const session = req.session as SessionObject | undefined;
    if(!session) {
        res.status(500).send([{message: SERVER_SESSION_ERROR}]);
        return;
    }
    next();
}