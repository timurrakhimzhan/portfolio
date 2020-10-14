import {sign, verify} from 'jsonwebtoken';
import Tokens from "csrf";
import {Request} from "express";
import {SERVER_SESSION_ERROR} from "./constants";

const SECRET_WORD = "secretWord";

export const getJWT = (uuid: string) => sign({uuid}, SECRET_WORD, {expiresIn: "1w"});

export const checkJWT = (jwt: string): boolean => {
    try {
        verify(jwt, SECRET_WORD);
        return true;
    } catch(error) {
        return false;
    }
};

export const getCsrf = async(req: Request): Promise<string> => {
    const tokens: Tokens = new Tokens();
    if(!req.session) {
        throw new Error(SERVER_SESSION_ERROR);
    }
    if(!req.session.csrfSecret){
        req.session.csrfSecret = await tokens.secret();
    }
    return tokens.create(req.session.csrfSecret);
};

export const checkCsrf = (token: string, req: Request): boolean => {
    const tokens: Tokens = new Tokens();
    if(!req!.session!.csrfSecret){
        return false;
    }
    return tokens.verify(req.session!.csrfSecret, token)
};