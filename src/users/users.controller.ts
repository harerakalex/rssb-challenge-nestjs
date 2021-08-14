import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  NotFoundException,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
import { sign } from 'jsonwebtoken';

import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FileReader } from './utils/filereader.utils';
import { RedisCache } from '../helpers/redis.helpers';
import { AuthGuard } from '../guards/auth.guard';
import { fieldsValidator } from '../helpers/validator.helper';
import { paginator } from '../helpers/paginator.helper';
import { ListAllQueries } from './dto/list-all-queries';

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

  @ApiOkResponse()
  @Get('token')
  getToken() {
    const token = sign(
      {
        id: 1,
        appName: 'RSSB',
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' },
    );

    return { token };
  }

  @ApiBearerAuth()
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
  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const workbook = readFile(file.path);
    const data = this.fileReader.formatFileData(workbook);

    await this.redisCache.save('data', data);

    return data;
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @UseGuards(AuthGuard)
  @Get()
  async getUsers(@Query() query: ListAllQueries): Promise<createUserDto[]> {
    const data = await this.redisCache.fetch('data');

    if (data === null) return [];

    const { offset, limit } = paginator(data.length, parseInt(query.page), parseInt(query.limit));

    return fieldsValidator(data).slice(offset, offset + limit);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard)
  @Post()
  async createUser(): Promise<User[]> {
    const data = await this.redisCache.fetch('data');

    if (data === null) return [];

    return await this.usersService.createUser(data);
  }
}
