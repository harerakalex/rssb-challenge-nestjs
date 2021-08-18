import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  names: string;

  @Column()
  nid: string;

  @Column()
  phone: string;

  @Column()
  gender: string;

  @Column()
  email: string;
}
