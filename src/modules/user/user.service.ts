import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserPatchDTO } from './dto/update-user-patch.dto';
import { UpdateUserPutDTO } from './dto/update-user-put.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, name, password, birth_at }: CreateUserDTO) {
    const passwordHashed = await bcrypt.hash(password, await bcrypt.genSalt());

    return this.prisma.user.create({
      data: {
        email,
        name,
        password: passwordHashed,
        birth_at,
        updated_at: new Date(),
      },
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: string) {
    await this.exists(id);

    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateUserPutDTO) {
    await this.exists(id);

    if (!data.birth_at) {
      data.birth_at = null;
    }

    return this.prisma.user.update({
      data: {
        ...data,
        updated_at: new Date(),
      },
      where: {
        id,
      },
    });
  }

  async updatePartial(id: string, data: UpdateUserPatchDTO) {
    await this.exists(id);

    if (data.password) {
      data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    }

    return this.prisma.user.update({
      data: {
        ...data,
        birth_at: data.birth_at ? new Date(data.birth_at) : null,
        updated_at: new Date(),
      },
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    await this.exists(id);

    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return;
  }

  async exists(id: string) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException();
    }
  }
}
