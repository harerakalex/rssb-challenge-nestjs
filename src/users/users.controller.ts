import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  NotFoundException,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { readFile } from 'xlsx';
import { diskStorage } from 'multer';

import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FileReader } from './utils/filereader.utils';
import { RedisCache } from '../helpers/redis.helpers';

const storage = diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private fileReader: FileReader,
    private redisCache: RedisCache,
  ) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @Get()
  async getUsers(@Query('name') name?: string): Promise<User[]> {
    const getCache1 = await this.redisCache.fetch('Key');
    console.log(getCache1);
    await this.redisCache.save('me', { value: 123 });
    const getCache2 = await this.redisCache.fetch('me');
    console.log(getCache2);
    return await this.usersService.findAll(name);
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  @Post()
  async createUser(@Body() body: createUserDto): Promise<User> {
    return await this.usersService.createUser(body);
  }

  @ApiCreatedResponse({ type: User })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const workbook = readFile(file.path);
    const data = this.fileReader.formatFileData(workbook);

    return data;
  }
}
