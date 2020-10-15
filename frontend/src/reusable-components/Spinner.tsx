import React from "react";
import styled from 'styled-components';


export function Spinner() {
    return <SpinnerWrapper>
        <Image src={process.env.PUBLIC_URL + "/spinner.svg"}/>
    </SpinnerWrapper>
}

const SpinnerWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: 10000;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(221, 221, 221, 0.8);
    overflow-y: hidden;
`;
const Image = styled.img`
    width: 100px;
`;