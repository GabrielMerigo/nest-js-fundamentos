import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserPatchDTO } from './dto/update-user-patch.dto';
import { UpdateUserPutDTO } from './dto/update-user-put.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @Get()
  async list() {
    return {
      users: [],
    };
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: string) {
    return {
      user: {},
      id,
    };
  }

  @Put(':id')
  async update(
    @Body() body: UpdateUserPutDTO,
    @Param('id', ParseIntPipe) id: string,
  ) {
    return {
      method: 'PUT',
      body,
      id,
    };
  }

  @Patch(':id')
  async updatePartial(
    @Body() body: UpdateUserPatchDTO,
    @Param('id', ParseIntPipe) id: string,
  ) {
    return {
      method: 'PATCH',
      body,
      id,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: string) {
    return {
      id,
    };
  }
}
