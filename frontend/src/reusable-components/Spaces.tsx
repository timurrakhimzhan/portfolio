import React from 'react';
import styled from 'styled-components';
import {WidthHeightProps} from "../../typings";



export function HorizontalSpace({width}: WidthHeightProps) {
    return <Space width={width}/>
}

export function VerticalSpace({height}: WidthHeightProps) {
    return <Space height={height}/>
}

const Space = styled.div`
   width: ${({width}: WidthHeightProps) => width || "auto"}; 
   height: ${({height}: WidthHeightProps) => height || "auto"}
`;