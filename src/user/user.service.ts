import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserPatchDTO } from './dto/update-user-patch.dto';
import { UpdateUserPutDTO } from './dto/update-user-put.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name, password }: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        email,
        name,
        password,
        updated_at: new Date(),
      },
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateUserPutDTO) {
    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async updatePartial(id: string, data: UpdateUserPatchDTO) {
    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }
}
