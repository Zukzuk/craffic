import { ValidationError } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

export interface IItem {
  id: number;
  author: string;
  title: string;
  shortTitle?: string;
  description?: string;
  image: string;
}

export type TItemType = 'comic' | 'book' | 'movie' | 'episode';

export interface IComicFileData {
  type: TItemType;
  file: string;
  fileLocation: string;
  coverPage: string;
  numPages: number;
}
