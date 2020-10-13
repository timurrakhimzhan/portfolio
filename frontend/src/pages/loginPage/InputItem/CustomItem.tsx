import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const CustomIcon = styled(FontAwesomeIcon)`
    position: absolute;
    right: 5px;
    top: 0;
    bottom: 0;
    margin: auto;
    color: var(--red-main);
`;

export function CustomErrorIcon() {
    return <CustomIcon icon={faExclamationTriangle} />;
}