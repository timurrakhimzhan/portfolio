import {Request, Response} from "express";
import {Credentials, CredentialsError} from "../typings";
import {hash, genSalt} from 'bcrypt';
import {validateAuth} from "../utils/authValidation";
import {User} from "../entity/User";
import {CONFIRMATION_MAIL_FAIL, EMAIL_FIELD, HASH_SALT, USER_ALREADY_REGISTERED} from "../utils/constants";
import {createConfirmationLink, createConfirmationToken} from "../utils/confirmation";
import {sendConfirmationEmail} from "../utils/mailer";

export async function registrationHandle(req: Request, res: Response) {
    const {email, password} = req.body as Credentials;
    try {
        const credentialsError: Array<CredentialsError> = await validateAuth({email, password});
        if(credentialsError.length) {
            res.status(400).send(credentialsError);
            return;
        }
        const existing: number = await User.count({email});
        if(existing) {
            const error: CredentialsError = {
                message: USER_ALREADY_REGISTERED,
                field: EMAIL_FIELD
            };
            res.status(400).send([error]);
            return;
        }
        const hashedPassword: string = await hash(password, await genSalt(HASH_SALT));
        const user: User = await User.create({email, password: hashedPassword, registrationDate: new Date()}).save();

        const confirmationToken: string = await createConfirmationToken(user.uuid);

        if(process.env.NODE_ENV === "development") {
            console.log(user.email, user.uuid, confirmationToken);
        } else {
            try {
                await sendConfirmationEmail(user.email, createConfirmationLink(confirmationToken, user.uuid));
            } catch(error) {
                res.status(400).send([{message: CONFIRMATION_MAIL_FAIL}]);
                return;
            }
        }


        res.send();
    } catch(error) {
        console.log("Error", error);
        res.status(500).send([{message: error.message}]);
    }
}