import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from './translations';

i18n.use(initReactI18next).init({
    resources,
    supportedLngs: ["en", "ru"],
    defaultNS: "general",
    lng: "en",
    debug: true,
    fallbackLng: "en",
    interpolation: {
        escapeValue: true
    }
}).then(() => {
    console.log("Localization finished loading.");
});

export default i18n;