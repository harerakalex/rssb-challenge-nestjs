import { Injectable } from '@nestjs/common';

import { createUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entities';

@Injectable()
export class UsersService {
    private users: User[] = [{ id: 0, name: "carlos" }, { id: 1, name: "Benisse" }]

    findAll(): User[] {
        return this.users;
    }

    findById(userId: number): User | undefined {
        return this.users.find(user => user.id === userId)
    }

    createUser(user: createUserDto): User {
        const newUser = { id: Date.now(), ...user }

        this.users.push(newUser)

        return newUser
    }
}
