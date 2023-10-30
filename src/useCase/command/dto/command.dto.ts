import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class LabyrinthDto {

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  version: number;
}



