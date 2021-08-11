import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  private users: User[] = [
    { id: 0, name: 'carlos' },
    { id: 1, name: 'Benisse' },
    { id: 2, name: 'carlos' },
  ];

  async findAll(name?: string): Promise<User[]> {
    return name
      ? await this.usersRepository.find({ where: { name } })
      : await this.usersRepository.find();
  }

  async findById(id: number): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async createUser(user: createUserDto): Promise<User> {
    const newUser = this.usersRepository.create({ ...user });
    return await this.usersRepository.save(newUser);
  }
}
