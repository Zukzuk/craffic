import { ValidationError } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

type ThemeMode = 'dark' | 'light' | 'contrast';
type ReadingMode = 'webtoon' | 'vertical' | 'lefttoright' | 'righttoleft';

export interface GlobalConfig {
  themeMode: ThemeMode;
  readingMode: ReadingMode;
}
