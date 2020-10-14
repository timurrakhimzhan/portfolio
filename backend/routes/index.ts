import {Router} from "express";
import {registrationHandle} from "./registration";
import {loginHandle} from "./login";
import {isloggedInHandle} from "./loggedIn";
import {isAuth} from "../middlewares/isAuth";

export const router: Router = Router();

router.post("/register", registrationHandle);
router.get("/login", loginHandle);
router.get("/isLoggedIn", isAuth, isloggedInHandle);
