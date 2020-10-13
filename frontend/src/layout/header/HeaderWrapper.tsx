import styled from 'styled-components';


export const HeaderWrapper = styled.div`
    display: flex;
    grid-area: header;
    background: var(--grey-background-main);
    position: fixed;
    top: 0;
    height: var(--header-height);
    display: flex;
    z-index:999;
    width: 100%;
    border-radius: 0px;
    align-items: center;
    padding: 0px 20px;
    box-sizing: border-box;
`;