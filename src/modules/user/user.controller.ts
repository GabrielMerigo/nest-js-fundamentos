import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ThrottlerGuard } from '@nestjs/throttler';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserPatchDTO } from './dto/update-user-patch.dto';
import { UpdateUserPutDTO } from './dto/update-user-put.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @UseGuards(ThrottlerGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async list() {
    return this.userService.list();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  async show(@ParamId() id: string) {
    return this.userService.show(id);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  async update(@Body() body: UpdateUserPutDTO, @Param('id') id: string) {
    return this.userService.update(id, body);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  async updatePartial(
    @Body() body: UpdateUserPatchDTO,
    @Param('id') id: string,
  ) {
    return this.userService.updatePartial(id, body);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
