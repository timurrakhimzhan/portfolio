import React, {useState} from "react";
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
import {registerAction} from "../../../redux/actions-reducers/asyncThunks/registerAction";
import {loginAction} from "../../../redux/actions-reducers/asyncThunks/loginAction";
import {useSelector} from "react-redux";
import {resetAuthState} from "../../../redux/actions-reducers/authentication/authenticationSlice";


export function SingInUpForm({onForgotClick}: {onForgotClick: () => void}) {
    const [schema] = useState<Credentials>({email: "", password: ""});
    const {values, clientErrors, validInput, validForm, handleChange, handleSubmit} = useForm<Credentials>(schema, schemaAuthentication);
    const serverErrors = useSelector((state: RootState) => state.authentication.authFormServerError);
    const dispatch = useAppDispatch();

    const ForgotPasswordComponent = <React.Fragment>Password* (<ForgotLabel onClick={() => onForgotClick()}>Forgot?</ForgotLabel>):</React.Fragment>;
    return(
        <Form onChange={handleChange} onSubmit={handleSubmit}>
            <InputItem label={"Email*:"}
                       type={"email"}
                       name={"email"}
                       valid={validInput['email']}
                       onChange={() => dispatch(resetAuthState())}
                       errorMessage={serverErrors?.email || clientErrors['email'] || null}/>
            <VerticalSpace height={"20px"}/>
            <InputItem label={ForgotPasswordComponent}
                       type={"password"}
                       name={"password"}
                       valid={validInput['password']}
                       onChange={() => dispatch(resetAuthState())}
                       errorMessage={serverErrors?.password || clientErrors['password'] || null}/>
            <VerticalSpace height={"20px"}/>
            <ButtonsContainer>
                <Button disabled={!validForm} width={"40%"}
                        onClick={() => dispatch(loginAction(values as Credentials))}>
                    Log in
                </Button>
                <Button disabled={!validForm} width={"40%"}
                        onClick={() => dispatch(registerAction(values as Credentials))}>Register</Button>
            </ButtonsContainer>
        </Form>
    );
}

