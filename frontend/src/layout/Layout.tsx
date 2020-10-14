import React, {useState, useEffect} from "react";
import {Header} from "./header/Header";
import {LayoutWrapper} from "./LayoutWrapper";
import {Main} from "./main/Main";
import {Sidebar} from "./sidebar/Sidebar";
import {useAppDispatch} from "../redux/store";
import {fetchUserInfoAction} from "../redux/actions-reducers/user/fetchUserInfoAction";


export function Layout() {
    const [showSideMenu, setShowSideMenu] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchUserInfoAction());
    });

    return (
            <LayoutWrapper>
                <Sidebar show={showSideMenu} onClickItem={() => setShowSideMenu(false)}/>
                <Header onSideMenuClick={() => setShowSideMenu(!showSideMenu)}/>
                <Main/>
            </LayoutWrapper>
    )
}