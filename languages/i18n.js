import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'react-native-localize';

// Translation JSON files
import en from './locales/en.json';
import es from './locales/es.json';

// Fallback language if the user's language is not available
const fallbackLanguage = 'en';

// Configure i18next
i18n
  .use(initReactI18next)
  .init({
    fallbackLng: fallbackLanguage,
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: fallbackLanguage,
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

// Function to set the language globally
export const setLanguage = async (language) => {
  i18n.changeLanguage(language);
  await AsyncStorage.setItem('appLanguage', language);
};

// Initialize language from device settings or AsyncStorage
const initializeLanguage = async () => {
  const savedLanguage = await AsyncStorage.getItem('appLanguage');
  const deviceLanguage = Localization.getLocales()[0]?.languageCode || fallbackLanguage;
  i18n.changeLanguage(savedLanguage || deviceLanguage);
};

initializeLanguage();

export default i18n;
