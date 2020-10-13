import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";


export function MenuToggleIcon({onClick}: {onClick: any}) {
    return <CustomFontAwesome icon={faBars} onClick={onClick}/>
}

const CustomFontAwesome = styled(FontAwesomeIcon)`
    color: var(--black-main);
    cursor: pointer;
    font-size: 2em;
    :hover {
        color: var(--grey-main);
    }
`;