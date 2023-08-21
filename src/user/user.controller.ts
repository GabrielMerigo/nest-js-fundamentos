import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserPatchDTO } from './dto/update-user-patch.dto';
import { UpdateUserPutDTO } from './dto/update-user-put.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return {
      body,
    };
  }

  @Get()
  async list() {
    return {
      users: [],
    };
  }

  @Get(':id')
  async show(@Param() { id }) {
    return {
      user: {},
      id,
    };
  }

  @Put(':id')
  async update(@Body() body: UpdateUserPutDTO, @Param() params) {
    return {
      method: 'PUT',
      body,
      params,
    };
  }

  @Patch(':id')
  async updatePartial(@Body() body: UpdateUserPatchDTO, @Param() params) {
    return {
      method: 'PATCH',
      body,
      params,
    };
  }

  @Delete(':id')
  async delete(@Param() params) {
    return {
      params,
    };
  }
}
