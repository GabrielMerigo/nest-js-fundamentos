import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { userRepositoryMock } from '../testing/user-repository-mock';
import { CreateUserDTO } from './dto/create-user.dto';
import { Role } from '../../enums/role.enum';
import { userEntityList } from '../testing/user-entity-list.mock';

describe('User Service', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
      imports: [PrismaModule],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  test('Validate Definition of User Service', () => {
    expect(userService).toBeDefined();
  });

  test('create method', async () => {
    const data: CreateUserDTO = {
      birth_at: '2000-01-01',
      email: 'gabriel@gmail.com',
      name: 'Gabriel Merigo',
      password: '*****',
      role: Role.ADMIN,
    };

    const result = await userService.create(data);

    expect(result).toEqual(userEntityList[0]);
  });
});
