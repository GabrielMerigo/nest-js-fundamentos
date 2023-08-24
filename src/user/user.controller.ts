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
    return this.userService.list();
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return this.userService.show(id);
  }

  @Put(':id')
  async update(@Body() body: UpdateUserPutDTO, @Param('id') id: string) {
    this.userService.update(id, body);
  }

  @Patch(':id')
  async updatePartial(
    @Body() body: UpdateUserPatchDTO,
    @Param('id') id: string,
  ) {
    this.userService.updatePartial(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.userService.delete(id);
  }
}
