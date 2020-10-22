import React, {useEffect, useState} from "react";
import {HorizontalSpace} from "../../../reusable-components/Spaces";
import {LanguageSwitcherWrapper} from "./LanguageSwitcherWrapper";
import {LangItem} from "./LangItem";
import {useTranslation} from 'react-i18next'


export function LanguageSwitcher() {
    const [lang, setLang] = useState("en");
    const {i18n} = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang, i18n]);

    return <LanguageSwitcherWrapper>
        <LangItem active={lang === "ru"} onClick={() => setLang("ru")}>Рус</LangItem>
        <HorizontalSpace width={"5px"}/>
        <LangItem active={lang === "en"} onClick={() => setLang("en")}>EN</LangItem>
        <HorizontalSpace width={"20px"}/>
    </LanguageSwitcherWrapper>
}