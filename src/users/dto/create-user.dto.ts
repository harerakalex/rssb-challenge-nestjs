import { IsAlphanumeric, MaxLength, IsNumber, IsAlpha, IsEmail } from 'class-validator';

export class createUserDto {
  @IsAlphanumeric()
  @MaxLength(50)
  names: string;

  @IsNumber()
  @MaxLength(16)
  nid: string;

  @IsNumber()
  @MaxLength(12)
  phone: string;

  @IsAlpha()
  @MaxLength(10)
  gender: string;

  @IsEmail()
  email: string;
}
