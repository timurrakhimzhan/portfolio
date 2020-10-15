import React from "react";
import {RegistrationInfoWrapper} from "./RegistrationInfoWrapper";
import {RegistrationInfoType} from "../../../../typings";

export function RegistrationInfo({type, message}: RegistrationInfoType) {
    return <RegistrationInfoWrapper type={type}>{message}</RegistrationInfoWrapper>
}