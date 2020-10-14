import {NextFunction, Request, Response,} from "express";
import {checkCsrf, checkJWT} from "../utils/authTokens";
import {USER_NOT_AUTHORIZED} from "../utils/constants";

export async function isAuth(req: Request, res: Response, next: NextFunction){
    const jwt = req.cookies['jwt'] as string;
    const csrf = req.get('CSRF-TOKEN') as string;
    const uuid = req.session?.uuid;

    if(!jwt || !csrf || !uuid) {
        res.status(401).send([{message: USER_NOT_AUTHORIZED}]);
        return;
    }

    if(!checkJWT(jwt) || !checkCsrf(csrf, req)) {
        res.status(401).send([{message: USER_NOT_AUTHORIZED}]);
        return;
    }
    next();
}