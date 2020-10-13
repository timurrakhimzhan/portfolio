import styled from "styled-components";
import {WidthHeightProps} from "../../typings";

export const Input = styled.input`
    width: ${({width}: WidthHeightProps) => width || "auto"};
    height: ${({height}: WidthHeightProps) => height || "auto"};
    border-radius: 2px;
    border: ${({error}: WidthHeightProps & {error: boolean}) => error ? `1px solid var(--red-main)` : `1px solid var(--black-main)`};
    :disabled {
        cursor: not-allowed;
    };
`;
