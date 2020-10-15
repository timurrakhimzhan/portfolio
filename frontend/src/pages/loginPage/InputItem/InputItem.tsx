import React, {ComponentElement} from 'react';
import {VerticalSpace} from "../../../reusable-components/Spaces";
import {Input} from "../../../reusable-components/Input";
import {InputItemWrapper} from "./InputItemWrapper";
import {StyledComponentProps} from "styled-components";
import MediaQuery from "react-responsive";
import {InputLabelContainer} from "./InputLabelContainer";
import {ErrorLabelWrapper} from "./errorLabel/ErrorLabelWrapper";
import {InputContainer} from "./InputContainer";
import {CustomInputIcon} from "./CustomItem";


export function InputItem({label, errorMessage, valid,...props}: {label: string | ComponentElement<any, any>, errorMessage?: string | null, valid: boolean} & StyledComponentProps<"input", any, any, any>) {
    return (
        <InputItemWrapper>
            <InputLabelContainer>{label} </InputLabelContainer>
            <VerticalSpace height={"5px"} />
            <InputContainer>
                <MediaQuery maxWidth={"480px"}>
                    <Input valid={valid} error={!!errorMessage} height={"50px"} width={"100%"} {...props}/>
                </MediaQuery>
                <MediaQuery minWidth={"480px"}>
                    <Input valid={valid} error={!!errorMessage} height={"30px"} width={"100%"} {...props}/>
                </MediaQuery>
                {errorMessage ? <CustomInputIcon type={"error"}/> : null}
                {!errorMessage && valid ? <CustomInputIcon type={"success"}/> : null}
            </InputContainer>
            <VerticalSpace height={"3px"}/>
            {errorMessage ?
            <ErrorLabelWrapper>
                <span>{errorMessage}</span>
            </ErrorLabelWrapper> : null}

        </InputItemWrapper>
    );

}