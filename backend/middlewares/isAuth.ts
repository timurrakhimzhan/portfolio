import {NextFunction, Request, Response,} from "express";
import {checkCsrf, checkJWT} from "../utils/authTokens";

export async function isAuth(req: Request, res: Response, next: NextFunction){
    const jwt = req.cookies['jwt'] as string;
    const csrf = req.get('CSRF-TOKEN') as string;
    const notAuthorizedMessage: string = "User not authorized";

    if(!jwt || !csrf) {
        res.status(401).send([{message: notAuthorizedMessage}]);
        return;
    }

    if(!checkJWT(jwt) || !checkCsrf(csrf, req)) {
        res.status(401).send([{message: notAuthorizedMessage}]);
        return;
    }
    next();
}