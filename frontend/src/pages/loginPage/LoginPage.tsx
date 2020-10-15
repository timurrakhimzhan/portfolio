import React, {useState} from "react"
import {LoginPageWrapper} from "./LoginPageWrapper";
import {SingInUpForm} from "./singInUp/SignInUpForm";
import {ForgotForm} from "./forgotForm/ForgotForm";
import {LogoImage} from "./logo/LogoImage";
import {RegistrationInfo} from "./registrationInfo/RegistrationInfo";
import {VerticalSpace} from "../../reusable-components/Spaces";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {LoginPageContent} from "./LoginPageContent";

export function LoginPage() {
    const [isForgotPass, setForgotPass] = useState(false);
    const {logged_in} = useSelector((state: RootState) => state.user);
    const {registrationInfo} = useSelector((state: RootState) => state.authentication);
    return (
        <LoginPageWrapper>
            <VerticalSpace height={"20px"}/>
            <LoginPageContent>
                {logged_in ? <Redirect to={"/"} /> : null}
                <LogoImage src={process.env.PUBLIC_URL + "/rapeera-logo.png"} />
                <VerticalSpace height={"20px"} />
                {registrationInfo ?
                    <React.Fragment>
                        <RegistrationInfo type={registrationInfo.type} message={registrationInfo?.message}/>
                        <VerticalSpace height={"10px"} />
                    </React.Fragment> : null}

                {isForgotPass ? <ForgotForm onClickSignIn={() => setForgotPass(false)}/>
                            : <SingInUpForm onForgotClick={() => setForgotPass(true)}/>}
            </LoginPageContent>
        </LoginPageWrapper>
    )
}