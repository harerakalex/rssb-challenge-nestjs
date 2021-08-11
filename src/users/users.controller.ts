import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entities';


@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @ApiOkResponse({type: User, isArray: true})
    @Get()
    getUsers(): User[] {
        return this.usersService.findAll();
    }

    @ApiOkResponse({type: User})
    @Get(':id')
    getUserById(@Param('id') id: string): User {
        return this.usersService.findById(Number(id))
    }

    @ApiCreatedResponse({type: User})
    @Post()
    createUser(@Body() body: createUserDto): User {
        return this.usersService.createUser(body)
    }
}
