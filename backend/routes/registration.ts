import {Request, Response, Router} from "express";
import {Credentials, CredentialsError} from "../typings";
import {hash, genSalt} from 'bcrypt';
import {validate} from "../utils/authValidation";
import {User} from "../entity/User";

export async function registrationHandle(req: Request, res: Response) {
    const {email, password} = req.body as Credentials;
    try {
        const credentialsError: Array<CredentialsError> = await validate({email, password});
        if(credentialsError.length) {
            res.status(400).send(credentialsError);
            return;
        }
        const existing: number = await User.count({email});
        if(existing) {
            const error: CredentialsError = {
                message: "User with such email is already registered",
                field: "email"
            };
            res.status(400).send([error]);
            return;
        }
        const hashedPassword: string = await hash(password, await genSalt(4));
        await User.create({email, password: hashedPassword, registrationDate: new Date()}).save();
        res.status(200).send();
    } catch(error) {
        console.log("Error", error);
        res.status(500).send([{message: error.message}]);
    }
}