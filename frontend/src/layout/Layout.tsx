import React, {useState} from "react";
import {Header} from "./header/Header";
import {LayoutWrapper} from "./LayoutWrapper";
import {Main} from "./main/Main";
import {Sidebar} from "./sidebar/Sidebar";


export function Layout() {
    const [showSideMenu, setShowSideMenu] = useState(false);
    return (
            <LayoutWrapper>
                <Sidebar show={showSideMenu} onClickItem={() => setShowSideMenu(false)}/>
                <Header onSideMenuClick={() => setShowSideMenu(!showSideMenu)}/>
                <Main/>
            </LayoutWrapper>
    )
}