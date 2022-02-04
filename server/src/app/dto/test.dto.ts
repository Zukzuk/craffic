import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

import { TBreed } from "../interfaces";

export class createTestDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    
    @IsNumber()
    readonly age: number;
    
    @IsString()
    readonly breed: TBreed;
}

export class updateTestDto extends createTestDto {}

export class patchTestDto {
    @IsString()
    readonly name: string;
    
    @IsNumber()
    readonly age: number;
    
    @IsString()
    readonly breed: TBreed;
}