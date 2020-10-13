import React from 'react';
import {AvatarWrapper} from "./AvatarWrapper";
import styled from 'styled-components';

export function Avatar({src, onClick}: {src: string, onClick: any}) {
    return <AvatarWrapper>
        <Image src={src} onClick={onClick}/>
    </AvatarWrapper>
}

const Image = styled.img`
    width: 100%;
    height: 100%;
`;