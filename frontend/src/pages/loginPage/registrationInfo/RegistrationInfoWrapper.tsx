import styled from 'styled-components';
import {ErrorSuccessType} from "../../../../typings";

export const RegistrationInfoWrapper = styled.div`
    text-align: center;
    color: ${({type}: {type: ErrorSuccessType}) => type === "error" ? "var(--red-main)" : "var(--green-main)"};
    font-size: var(--small-text-size);
`;