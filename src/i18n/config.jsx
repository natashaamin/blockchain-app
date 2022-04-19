import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en',
    resources: {
        en: {
            translations: require('./string_en.json')
        },
        th: {
            translations: require('./string_th.json')
        }
    },
    debug: true,
    ns: ['translations'],
    defaultNS: 'translations'
});

i18next.languages = ['en', 'th'];

export default i18next;