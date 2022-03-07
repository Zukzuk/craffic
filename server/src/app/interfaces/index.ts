import { ValidationError } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

type TThemeMode = 'dark' | 'light' | 'contrast';
type TReadingMode = 'webtoon' | 'vertical' | 'lefttoright' | 'righttoleft';

export interface IGlobalConfig {
  themeMode: TThemeMode;
  readingMode: TReadingMode;
}

export interface ISeries {
  id: number;
  title: string;
  year?: number;
}

type TLanguage = 'EN-en' | 'NL-nl';

export interface IItem {
  id: number;
  author: string;
  artist?: string;
  title: string;
  description?: string;
  year?: number;
  language?: TLanguage;
}

type TBookType = 'comic' | 'book' | 'movie' | 'episode';
type TCollectionType = 'single' | 'tpb' | 'omnibus' | 'anthology' | 'integrale';
type TBindingType = 'sc' | 'hc';
type TBindingSize = 'eucomic' | 'uscomic' | 'oversized' | 'absolute' | 'square';
type TFormat = 'cbr' | 'cbz' | 'epub';

export interface IComicFileData {
  type: TBookType;
  file: string;
  fileLocation: string;
  format: TFormat;
  fileSizeInBytes: number;
  coverPage: string;
  numPages: number;
}
