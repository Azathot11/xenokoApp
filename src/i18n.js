import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
  surportedLanguages:['en','fr'],
    fallbackLng: "en",
    detection:{
      order: ['cookie', 'localStorage','htmlTag', 'path', 'subdomain'],
      caches:['cookie'],
    },
  
    backend:{
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    react:{useSuspense:false}
  });

export default i18n;