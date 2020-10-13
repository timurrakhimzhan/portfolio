import {Request, Response} from "express";
import {Credentials, CredentialsError} from "../typings";
import {validate} from "../utils/authValidation";
import {User} from "../entity/User";
import {compare} from "bcrypt";
import {getAccessToken} from "../utils/getAccessToken";


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
        const accessToken = getAccessToken(user.uuid);
        user.lastLoginDate = new Date();
        await user.save();
        res.status(200).send({accessToken, uuid: user.uuid});
    } catch(error) {
        console.log("Error", error);
        res.status(500).send([{message: error.message}]);
    }
}