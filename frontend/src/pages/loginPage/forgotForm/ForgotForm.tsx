import React from "react";
import {VerticalSpace} from "../../../reusable-components/Spaces";
import {InputItem} from "../InputItem/InputItem";
import {ButtonsContainer} from "../singInUp/ButtonsContainer";
import {Button} from "../../../reusable-components/Button";
import {Form} from "../Form";
import {useForm} from "../../../hooks/useForm";
import {schemaForgotPass} from "../../../utils/validators";


export function ForgotForm({onClickSignIn}: {onClickSignIn: Function}) {
    const {errors, handleChange} = useForm({email: "", password: ""}, schemaForgotPass);

    return <Form onChange={handleChange}>
        <InputItem label={"Email*:"}
                   type={"email"}
                   name={"email"}
                   errorMessage={errors['email'] || null}/>
        <VerticalSpace height={"20px"}/>
        <ButtonsContainer>
            <Button width={"40%"} onClick={() => onClickSignIn()}>Sign in</Button>
            <Button width={"40%"}>Send Link</Button>
        </ButtonsContainer>
    </Form>
}