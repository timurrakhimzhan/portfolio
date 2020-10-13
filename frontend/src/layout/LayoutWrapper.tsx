import styled from 'styled-components';
import {CSSConstants} from "./templates/CSSConstants";

export const LayoutWrapper = styled(CSSConstants)`
    display: grid;
    grid-template-areas:
    'header'
    'main';
    grid-template-rows: var(--header-height) auto;
    grid-row-gap: 0px;
    padding: 0px 0px;
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
`;
