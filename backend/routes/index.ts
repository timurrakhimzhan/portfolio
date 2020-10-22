import {Router} from "express";
import {registrationHandle} from "./registration";
import {loginHandle} from "./login";
import {protectedRouter} from "./protectedRoutes";
import {confirmPageHandle} from "./pageValidations/confirmPage";
import {forgotPageHandle} from "./pageValidations/forgotPage";

export const router: Router = Router();

router.post("/register", registrationHandle);
router.post("/login", loginHandle);
router.post("/confirmPage", confirmPageHandle);
router.post("/forgotPage", forgotPageHandle);
router.use(protectedRouter);

