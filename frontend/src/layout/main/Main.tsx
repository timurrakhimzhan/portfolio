import React from "react";
import {MainWrapper} from "./MainWrapper";
import {Routing} from "../../routing/Routing";
import {Spinner} from "../../reusable-components/Spinner";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export function Main() {
    const {showSpinner} = useSelector((state: RootState) => state.application);

    return <MainWrapper>
        {showSpinner ? <Spinner/> : null}
        <Routing/>
    </MainWrapper>
}