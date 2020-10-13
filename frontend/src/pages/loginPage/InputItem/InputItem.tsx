import React, {ComponentElement} from 'react';
import {VerticalSpace} from "../../../reusable-components/Spaces";
import {Input} from "../../../reusable-components/Input";
import {InputItemWrapper} from "./InputItemWrapper";
import {StyledComponentProps} from "styled-components";
import MediaQuery from "react-responsive";
import {InputLabelContainer} from "./InputLabelContainer";
import {ErrorLabelWrapper} from "./errorLabel/ErrorLabelWrapper";
import {InputContainer} from "./InputContainer";
import {CustomErrorIcon} from "./CustomItem";


export function InputItem({label, errorMessage,...props}: {label: string | ComponentElement<any, any>, errorMessage?: string | null} & StyledComponentProps<"input", any, any, any>) {
    return (
        <InputItemWrapper>
            <InputLabelContainer>{label} </InputLabelContainer>
            <VerticalSpace height={"5px"} />
            <InputContainer>
                <MediaQuery maxWidth={"480px"}>
                    <Input error={!!errorMessage} height={"50px"} width={"100%"} {...props}/>
                </MediaQuery>
                <MediaQuery minWidth={"480px"}>
                    <Input error={!!errorMessage} height={"30px"} width={"100%"} {...props}/>
                </MediaQuery>
                {errorMessage ? <CustomErrorIcon/> : null}
            </InputContainer>
            <VerticalSpace height={"3px"}/>
            {errorMessage ?
            <ErrorLabelWrapper>
                <span>{errorMessage}</span>
            </ErrorLabelWrapper> : null}

        </InputItemWrapper>
    );

}