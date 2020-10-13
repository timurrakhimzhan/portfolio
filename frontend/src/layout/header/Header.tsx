import React from "react";
import {HeaderWrapper} from "./HeaderWrapper";
import {HeaderMenu} from "./headerMenu/HeaderMenu";
import {HorizontalSpace} from "../../reusable-components/Spaces";
import {MenuToggleIcon} from "./menuIcon/MenuToogleIcon";
import MediaQuery from 'react-responsive';
import {Avatar} from "./avatar/Avatar";
import Identicon from "identicon.js";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {UserState} from "../../../typings";

export function Header({onSideMenuClick}: {onSideMenuClick: any}) {
    const {logged_in, uuid}:UserState = useSelector((state:RootState) => state.user);
    const data: string | null = logged_in && uuid ? new Identicon(uuid.toString(), 420).toString() : null;

    return (<HeaderWrapper>
        <MediaQuery maxDeviceWidth={"480px"}>
            <MenuToggleIcon onClick={onSideMenuClick}/>
            <HorizontalSpace width={"30px"}/>
        </MediaQuery>
        {logged_in ? <React.Fragment>
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