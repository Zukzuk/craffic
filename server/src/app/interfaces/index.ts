import { ValidationError } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

export type TBreed = 'cat' | 'dog';

export interface ITest {
  id: number;
  name: string;
  age?: number;
  breed?: TBreed;
}
