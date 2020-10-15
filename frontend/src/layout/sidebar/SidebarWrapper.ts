import styled from "styled-components";
import {ShowToggleProps} from "../../../typings";

export const SideBarWrapper = styled.div`
    width: var(--sidebar-width);
    top: var(--header-height);
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    left: ${({show}: ShowToggleProps) => show ? "0" : "calc(-1 * var(--sidebar-width))"};
    height: calc(100vh - var(--header-height));
    transition: left 0.4s;
    background: var(--grey-background-main);
    z-index: 999;
    @media only screen
    and (max-width: 480px) {
        width: 90%;
        left: ${({show}: ShowToggleProps) => show ? "0" : "-90%"};
    };
    color: var(--black-main);
    font-size: var(--big-text-size);
`;