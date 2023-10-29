import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsPositive, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRideDto {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  segments: string[];

  @ApiProperty()
  @IsPositive()
  capacity: number;
}


export class CreateTicketDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    rideId: string;
  
    @ApiProperty()
    @IsPositive()
    count: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    version: number;
  }
  
