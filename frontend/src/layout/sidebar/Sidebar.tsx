import React from "react";
import {ShowToggleProps} from "../../../typings";
import {VerticalSpace} from "../../reusable-components/Spaces";
import {useHistory} from 'react-router-dom';
import {routes} from "../../routing/Routing";
import {SideBarWrapper} from "./SidebarWrapper";


export function Sidebar({show, onClickItem}: ShowToggleProps & {onClickItem: Function}) {
    const history = useHistory();
    return <SideBarWrapper show={show}>
        <VerticalSpace height={"10%"}/>
        {routes.filter((route) => route.label)
            .filter((route) => !route.protection || route.protection.protectionFunc())
            .map((route) =>
                <React.Fragment key={route.path}>
                    <span onClick={() => {
                        history.push(route.path);
                        onClickItem();
                    }}>
                        {route.label!.toUpperCase()}
                    </span>
                    <VerticalSpace height={"30px"}/>
                </React.Fragment>
        )}
    </SideBarWrapper>
}