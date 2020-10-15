import styled from "styled-components";

export const CSSConstants = styled.div`
    --header-height: 50px;
    --sidebar-width: 250px;
    --black-background-main: #2c2c2c;
    --white-background-main: #f5f5f5;
    --grey-background-main: #dddddd;
    --grey-background-dark: #9E9E9E;
    --blue-background-main: #0F7B99;
    --blue-background-light: #30576B;
    --grey-main: #cacaca;
    --white-main: #f5f5f5;
    --black-main: #323232;
    --small-text-size: 0.8em;
    --normal-text-size: 0.8em;
    --big-text-size: 1.5em;
    --red-main: #B50000;
    --green-main: green;
    @media only screen
    and (max-width: 480px) {
        --header-height: 80px;
        --normal-text-size: 1.1em;
        --big-text-size: 1.8em;
        --small-text-size: 0.8em;
    };
`;