import React from "react";
import {VerticalSpace} from "../../../reusable-components/Spaces";
import {Form} from "../Form";
import {InputItem} from "../InputItem/InputItem";
import {ButtonsContainer} from "./ButtonsContainer";
import {Button} from "../../../reusable-components/Button";
import {ForgotLabel} from "./ForgotLabel";
import {useForm} from "../../../hooks/useForm";
import {RootState, useAppDispatch} from "../../../redux/store";
import {Credentials} from "../../../../typings";
import {schemaAuthentication} from "../../../utils/validators";
import {registerAction} from "../../../redux/actions-reducers/user/registerAction";
import {loginAction} from "../../../redux/actions-reducers/user/loginAction";
import {useSelector} from "react-redux";


export function SingInUpForm({onForgotClick, setSuccessRegistration}: {onForgotClick: Function, setSuccessRegistration: Function}) {

    const {values, errors, valid, handleChange, handleSubmit} = useForm<Credentials>({email: "", password: ""}, schemaAuthentication);
    const serverErrors = useSelector((state: RootState) => state.user.authFormServerError);
    const dispatch = useAppDispatch();

    const ForgotPasswordComponent = <React.Fragment>Password* (<ForgotLabel onClick={() => onForgotClick()}>Forgot?</ForgotLabel>):</React.Fragment>;
    return(
        <Form onChange={handleChange} onSubmit={handleSubmit}>
            <InputItem label={"Email*:"}
                       type={"email"}
                       name={"email"}
                       onChange={() => setSuccessRegistration(false)}
                       errorMessage={serverErrors?.email || errors['email'] || null}/>
            <VerticalSpace height={"20px"}/>
            <InputItem label={ForgotPasswordComponent}
                       type={"password"}
                       name={"password"}
                       onChange={() => setSuccessRegistration(false)}
                       errorMessage={serverErrors?.password || errors['password'] || null}/>
            <VerticalSpace height={"20px"}/>
            <ButtonsContainer>
                <Button disabled={!valid} width={"40%"}
                        onClick={() => dispatch(loginAction(values as Credentials))}>
                    Log in
                </Button>
                <Button disabled={!valid} width={"40%"}
                        onClick={() => dispatch(registerAction(values as Credentials))}>Register</Button>
            </ButtonsContainer>
        </Form>
    );
}

