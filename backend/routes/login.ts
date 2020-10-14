import {Request, Response} from "express";
import {Credentials, CredentialsError} from "../typings";
import {validate} from "../utils/authValidation";
import {User} from "../entity/User";
import {compare} from "bcrypt";
import {getCsrf, getJWT} from "../utils/authTokens";


export async function loginHandle(req: Request, res: Response){
    const {email, password} = req.query as Credentials;
    try {
        const credentialsError: Array<CredentialsError> = await validate({email, password});
        if(credentialsError.length) {
            res.status(400).send(credentialsError);
            return;
        }
        const user: User | undefined = await User.findOne({email});
        if(!user) {
            const error: CredentialsError = {
                message: "User with such email is not registered",
                field: "email"
            };
            res.status(400).send([error]);
            return;
        }
        if(!(await compare(password, user.password))) {
            const error: CredentialsError = {
                message: "Incorrect password",
                field: "password"
            };
            res.status(400).send([error]);
            return;
        }

        user.lastLoginDate = new Date();
        await user.save();

        const jwt = getJWT(user.uuid);
        const csrfToken: string = await getCsrf(req);
        res.cookie("jwt", jwt, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7});
        res.set("CSRF-TOKEN", csrfToken);
        res.status(200).send({uuid: user.uuid, email: user.email});
    } catch(error) {
        res.status(500).send([{message: error.message}]);
    }
}