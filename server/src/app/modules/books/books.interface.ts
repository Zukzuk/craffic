export interface BookSeries {
  id: number;
  title: string;
  year?: number;
}

export type Language = 'EN-en' | 'NL-nl';

export interface Book {
  id: number;
  author: string;
  artist?: string;
  title: string;
  description?: string;
  year?: number;
  language?: Language;
}

export type BookType = 'comic' | 'book' | 'movie' | 'episode';
export type CollectionType =
  | 'single'
  | 'tpb'
  | 'omnibus'
  | 'anthology'
  | 'integrale';
export type BindingType = 'sc' | 'hc';
export type BindingSize =
  | 'eucomic'
  | 'uscomic'
  | 'oversized'
  | 'absolute'
  | 'square';
export type BookFileFormat = 'cbr' | 'cbz' | 'epub';
