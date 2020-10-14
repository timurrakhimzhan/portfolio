import {Router} from "express";
import {registrationHandle} from "./registration";
import {loginHandle} from "./login";
import {fetchUserInfoHandler} from "./fetchUserInfo";
import {isAuth} from "../middlewares/isAuth";

export const router: Router = Router();

router.post("/register", registrationHandle);
router.get("/login", loginHandle);
router.get("/fetchUserInfo", isAuth, fetchUserInfoHandler);
