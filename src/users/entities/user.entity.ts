import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  names: string;

  @ApiProperty()
  @Column()
  nid: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  gender: string;

  @ApiProperty()
  @Column()
  email: string;
}
