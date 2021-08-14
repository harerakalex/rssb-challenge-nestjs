import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength, IsNumber, IsAlpha, IsEmail } from 'class-validator';

export class createUserDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(50)
  names: string;

  @ApiProperty()
  @IsNumber()
  @MaxLength(16)
  nid: string;

  @ApiProperty()
  @IsNumber()
  @MaxLength(12)
  phone: string;

  @ApiProperty()
  @IsAlpha()
  @MaxLength(10)
  gender: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
