import { en } from './en';
import { af } from './af';

export const translations = {
  en,
  af
};

export type Language = 'en' | 'af';
export type TranslationType = typeof en;
