import React, {useState} from "react"
import {LoginPageWrapper} from "./LoginPageWrapper";
import {SingInUpForm} from "./singInUp/SignInUpForm";
import {ForgotForm} from "./forgotForm/ForgotForm";
import {LogoImage} from "./logo/LogoImage";
import {SuccessRegistration} from "./successRegistration/SuccessRegistration";
import {VerticalSpace} from "../../reusable-components/Spaces";

export function LoginPage() {
    const [isForgotPass, setForgotPass] = useState(false);
    const [isSuccessRegistration, setSuccessRegistration] = useState(false);
    return (
        <LoginPageWrapper>
            <LogoImage src={process.env.PUBLIC_URL + "/rapeera-logo.png"} />
            <VerticalSpace height={"20px"} />
            {isSuccessRegistration ?
                <React.Fragment>
                    <SuccessRegistration/>
                    <VerticalSpace height={"10px"} />
                </React.Fragment> : null}

            {isForgotPass ? <ForgotForm onClickSignIn={() => setForgotPass(false)}/>
                        : <SingInUpForm onForgotClick={() => setForgotPass(true)}
                                        setSuccessRegistration={(value: boolean) => setSuccessRegistration(value)}/>}
        </LoginPageWrapper>
    )
}