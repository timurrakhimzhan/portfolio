import React from 'react';
import styled from 'styled-components';
import {WidthHeightProps} from "../../typings";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";

export function Modal({children}: {children: any}) {
    return <Cover>
        <ModalWrapper>
            <Row><CustomFontAwesome icon={faWindowClose} size={"1x"}/></Row>
            {children}
        </ModalWrapper>
    </Cover>
}

const Cover = styled.div`
    z-index: 1000;
    background: rgba(44, 44, 44, 0.7);
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
`;

const ModalWrapper = styled.div`
    width: ${({width}: WidthHeightProps) => width || "auto"};
    height ${({height}: WidthHeightProps) => height || "auto"};
    background: var(--white-background-main);
    border-radius: 10px;
    padding: 20px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
   width: 100%;
   display: flex;
   justify-content: flex-end;
`;

const CustomFontAwesome = styled(FontAwesomeIcon)`
    color: var(--black-main);
    cursor: pointer;
    :hover {
        color: var(--grey-main);
    }
`;