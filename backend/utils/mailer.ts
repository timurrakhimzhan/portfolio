import {createTransport} from 'nodemailer';
import {SMTP_EMAIL, SMTP_PASSWORD} from "./constants";

export const nodeMailer = createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD
    }
});

const emailTemplate = (link: string) =>`
    <h2>Hi!</h2> 
    <h2 style="font-weight: 100">Thank you for joining my portfolio website :) To confirm your account just click the following <a href="${link}" style="color: #0F7B99; font-weight: bold">link.</a></h2>
    <h3 style="font-weight: 100">This link will be active only for next 24 hours.</h3>
`;

export async function sendConfirmationEmail(email: string, link: string) {
    return nodeMailer.sendMail({
        from: SMTP_EMAIL,
        to: email,
        subject: "Confirmation link",
        html: emailTemplate(link)
    })
}



