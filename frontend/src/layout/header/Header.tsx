import React from "react";
import {HeaderWrapper} from "./HeaderWrapper";
// import Identicon from 'identicon.js';
import {HeaderMenu} from "./headerMenu/HeaderMenu";
import {HorizontalSpace} from "../../reusable-components/Spaces";
import {MenuToggleIcon} from "./menuIcon/MenuToogleIcon";
import MediaQuery from 'react-responsive';
import {Avatar} from "./avatar/Avatar";
import Identicon from "identicon.js";

export function Header({onSideMenuClick}: {onSideMenuClick: any}) {
    const data: string | null = localStorage.getItem("uuid") ? new Identicon(localStorage.getItem("uuid") as string, 420).toString() : null;

    return (<HeaderWrapper>
        <MediaQuery maxDeviceWidth={"480px"}>
            <MenuToggleIcon onClick={onSideMenuClick}/>
            <HorizontalSpace width={"30px"}/>
        </MediaQuery>
        {localStorage.getItem("uuid") ? <React.Fragment>
            <Avatar src={`data:image/png;base64,${data}`} onClick={() => console.log("hello world")}/>
            <HorizontalSpace width={"20px"}/>
        </React.Fragment>
            : null
        }
        <MediaQuery minDeviceWidth={"480px"}>
            <HeaderMenu/>
        </MediaQuery>
    </HeaderWrapper>)
}