import React, {useState, useEffect, useContext} from 'react';
import * as RNLocalize from 'react-native-localize';
import en from '@lang/en.json'
import vi from '@lang/vi.json'
import Main from "@navigation/Main";

type LanguageContextType = {
  hello: string;
};

const LanguageContext = React.createContext<LanguageContextType>(
  {} as LanguageContextType,
);

const languageObj = {
  en: en,
  vi: vi,
};

export const LanguageContextProvider: React.FC = ({children}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const currentLanguage = RNLocalize.findBestAvailableLanguage(
      Object.keys(languageObj),
    );

    setSelectedLanguage(currentLanguage?.languageTag || 'en');
  }, []);

  const value = {
    ...languageObj[selectedLanguage as 'en' | 'vi'],
  };
  return (
    <LanguageContext.Provider value={value}>
      <Main />
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
