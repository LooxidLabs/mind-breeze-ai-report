import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'ko' | 'en' | 'jp';

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: 'ko',
      setLanguage: (language: Language) => set({ currentLanguage: language }),
    }),
    {
      name: 'language-storage',
    }
  )
); 