import {Router} from "express";
import {registrationHandle} from "./registration";
import {loginHandle} from "./login";

export const router: Router = Router();

router.post("/register", registrationHandle);
router.get("/login", loginHandle);
