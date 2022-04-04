import { BookFileFormat, BookType } from '../modules/books/books.interface';

export interface ComicFileData {
  type: BookType;
  file: string;
  bundle: string;
  fileLocation: string;
  format: BookFileFormat;
  fileSizeInBytes: number;
  coverPage: string;
  numPages: number;
}

export interface ComicFileExtractError {
  bundle: string;
  error: Error;
}
