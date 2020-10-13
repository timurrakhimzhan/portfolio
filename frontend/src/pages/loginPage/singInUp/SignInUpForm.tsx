import React, {useState} from "react";
import {VerticalSpace} from "../../../reusable-components/Spaces";
import {Form} from "../Form";
import {InputItem} from "../InputItem/InputItem";
import {ButtonsContainer} from "./ButtonsContainer";
import {Button} from "../../../reusable-components/Button";
import {ForgotLabel} from "./ForgotLabel";
import {useForm} from "../../../hooks/useForm";
import {onLoginClick, onRegisterClick} from "./authentication";
import {Credentials} from "../../../../typings";
import {schemaAuthentication} from "../../../utils/validators";
import {useCookies} from "react-cookie";



export function SingInUpForm({onForgotClick, setSuccessRegistration}: {onForgotClick: Function, setSuccessRegistration: Function}) {

    const {values, errors, valid, handleChange, handleSubmit} = useForm({email: "", password: ""} as Credentials, schemaAuthentication);
    const [serverErrors, setServerErrors] = useState({email: "", password: ""});
    const [,setCookie, ] = useCookies(["accessToken", "email"]);

    const successLogin = (uuid: string, token: string) => {
        localStorage.setItem("uuid", uuid);
        setCookie("accessToken", token, {httpOnly: true});
    };

    const ForgotPasswordComponent = <React.Fragment>Password* (<ForgotLabel onClick={() => onForgotClick()}>Forgot?</ForgotLabel>):</React.Fragment>;
    return(
        <Form onChange={handleChange} onSubmit={handleSubmit}>
            <InputItem label={"Email*:"}
                       type={"email"}
                       name={"email"}
                       onChange={() => setSuccessRegistration(false)}
                       errorMessage={serverErrors['email'] || errors['email'] || null}/>
            <VerticalSpace height={"20px"}/>
            <InputItem label={ForgotPasswordComponent}
                       type={"password"}
                       name={"password"}
                       onChange={() => setSuccessRegistration(false)}
                       errorMessage={serverErrors['password'] || errors['password'] || null}/>
            <VerticalSpace height={"20px"}/>
            <ButtonsContainer>
                <Button disabled={!valid} width={"40%"}
                        onClick={() => onLoginClick(values as Credentials, setServerErrors, successLogin)}>
                    Log in
                </Button>
                <Button disabled={!valid} width={"40%"}
                        onClick={() => onRegisterClick(values as Credentials, setServerErrors, setSuccessRegistration)}>Register</Button>
            </ButtonsContainer>
        </Form>
    );
}

