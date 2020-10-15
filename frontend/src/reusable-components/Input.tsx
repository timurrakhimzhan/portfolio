import styled from "styled-components";
import {WidthHeightProps} from "../../typings";

export const Input = styled.input`
    width: ${({width}: WidthHeightProps & {error: boolean, valid: boolean}) => width || "auto"};
    height: ${({height}: WidthHeightProps) => height || "auto"};
    border-radius: 2px;
    border: ${({error, valid}:{error: boolean, valid: boolean}) => {
        if(error) {
            return "1px solid var(--red-main);";
        } 
        if(valid) {
            return "1px solid var(--green-main);";
        }
        return "1px solid var(--black-main);"
    }}
    :hover, :active, :focus {
        outline: none;
    }
    :disabled {
        cursor: not-allowed;
    };
`;
