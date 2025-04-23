
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  medicalTermsSupport?: boolean;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', medicalTermsSupport: true },
  { code: 'es', name: 'Spanish', nativeName: 'Español', medicalTermsSupport: true },
  { code: 'fr', name: 'French', nativeName: 'Français', medicalTermsSupport: true },
  { code: 'de', name: 'German', nativeName: 'Deutsch', medicalTermsSupport: true },
  { code: 'zh', name: 'Chinese', nativeName: '中文', medicalTermsSupport: false },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', medicalTermsSupport: false },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', medicalTermsSupport: false },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', medicalTermsSupport: false },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', medicalTermsSupport: false },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', medicalTermsSupport: false },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', medicalTermsSupport: false },
  { code: 'ko', name: 'Korean', nativeName: '한국어', medicalTermsSupport: false },
];

export const getLanguageByCode = (code: string): Language | undefined => {
  return languages.find(lang => lang.code === code);
};

export const getLanguageName = (code: string): string => {
  const language = getLanguageByCode(code);
  return language ? language.name : code;
};

export const getLanguageNativeName = (code: string): string => {
  const language = getLanguageByCode(code);
  return language ? language.nativeName : code;
};

export const hasMedicalTermsSupport = (code: string): boolean => {
  const language = getLanguageByCode(code);
  return !!language?.medicalTermsSupport;
};
