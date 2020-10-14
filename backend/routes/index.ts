import {Router} from "express";
import {registrationHandle} from "./registration";
import {loginHandle} from "./login";
import {fetchUserInfoHandler} from "./protectedRoutes/fetchUserInfo";
import {isAuth} from "../middlewares/isAuth";
import {logoutHandler} from "./protectedRoutes/logout";

export const router: Router = Router();

router.post("/register", registrationHandle);
router.get("/login", loginHandle);
router.get("/fetchUserInfo", isAuth, fetchUserInfoHandler);
router.get("/logout", isAuth, logoutHandler);

