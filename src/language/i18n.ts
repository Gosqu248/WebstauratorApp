import i18n from 'i18next';
import pl from './locales/pl.json';
import en from './locales/en.json';
import * as Localization from 'expo-localization';
import {initReactI18next} from "react-i18next";
import {TranslationKeys} from "@/src/interface/translationKeys";


const resources = {
    en: { translation: en } as TranslationKeys,
    pl: { translation: pl } as TranslationKeys,
};


i18n.translations = {
    en,
    pl,
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: Localization.locale.startsWith('pl') ? 'pl' : 'en',
        fallbackLng: 'pl',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
