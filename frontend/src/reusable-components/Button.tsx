import styled from "styled-components";
import {WidthHeightProps} from "../../typings";

export const Button = styled.button`
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({width}: WidthHeightProps) => width || "auto"};
    height: ${({height}: WidthHeightProps) => height || "auto"};
    background: var(--grey-background-main);
    color: var(--black-main);
    padding: 8px 0px;
    border: 0px;
    font-size: 1rem;
    cursor: pointer;
    :hover {
        background: var(--grey-background-dark);
    }
    @media only screen
    and (max-width: 480px) {
        padding: 14px 0px;
        font-size: 1.3rem;
    };
    :disabled {
        cursor: not-allowed;
        :hover {
             background: var(--grey-background-main);
        }
    };
`;