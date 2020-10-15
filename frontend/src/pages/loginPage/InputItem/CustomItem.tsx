import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {ErrorSuccessType} from "../../../../typings";

const CustomIcon = styled(FontAwesomeIcon)`
    position: absolute;
    right: 5px;
    top: 0;
    bottom: 0;
    margin: auto;
    color: ${({type}: {type:  ErrorSuccessType}) => type === "error" ? "var(--red-main)" : "var(--green-main)"};
`;

export function CustomInputIcon({type}: {type:  ErrorSuccessType}) {
    if(type === "error") {
        return <CustomIcon type={type} icon={faExclamationTriangle} />;
    }
    return <CustomIcon type={type} icon={faCheck} />;

}