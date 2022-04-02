import { IsString, IsNotEmpty } from 'class-validator';

export class BaseDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;
}
