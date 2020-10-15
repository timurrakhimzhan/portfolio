import {Router} from "express";
import {registrationHandle} from "./registration";
import {loginHandle} from "./login";
import {protectedRouter} from "./protectedRoutes";
import {confirmHandle} from "./confirm";

export const router: Router = Router();

router.post("/register", registrationHandle);
router.get("/login", loginHandle);
router.post("/confirm/:uuid/:token", confirmHandle);
router.use(protectedRouter);

