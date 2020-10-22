import styled from "styled-components";

export const LangItem = styled.span`
    font-size: var(--2x-small-text-size);
    color: var(--grey-dark);
    cursor: pointer;
    :hover {
        color: var(--black-main);
    };
    color: ${({active}: {active?: boolean}) => active ? 'var(--black-main)' : 'var(--grey-dark)'};
    text-decoration: ${({active}: {active?: boolean}) => active ? 'underline' : 'none'};
`;