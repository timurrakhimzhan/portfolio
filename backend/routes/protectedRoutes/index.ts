import {Router} from "express";
import {isAuth} from "../../middlewares/isAuth";
import {fetchUserInfoHandler} from "./fetchUserInfo";
import {logoutHandler} from "./logout";

export const protectedRouter = Router();

protectedRouter.get("/fetchUserInfo", isAuth, fetchUserInfoHandler);
protectedRouter.get("/logout", isAuth, logoutHandler);