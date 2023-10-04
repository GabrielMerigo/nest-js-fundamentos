import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { userRepositoryMock } from '../testing/user-repository-mock';
import { CreateUserDTO } from './dto/create-user.dto';
import { Role } from '../../enums/role.enum';
import { userEntityList } from '../testing/user-entity-list.mock';
import { updatePatchUserDTO } from '../testing/update-patch-user-dto.mock';
import { updatePutUserDTO } from '../testing/update-put-user-dto.mock';

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

  describe('Create', () => {
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

  describe('Read', () => {
    test('list method', async () => {
      const result = await userService.list();

      expect(result).toEqual(userEntityList);
    });

    test('show method', async () => {
      const result = await userService.show('uuid-123');

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('update', async () => {
      const result = await userService.update('uuid-123', updatePutUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });
    test('update partial', async () => {
      const result = await userService.updatePartial(
        'uuid-123',
        updatePatchUserDTO,
      );

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('delete', async () => {
      const result = await userService.delete('uuid-123');

      expect(result).toEqual(true);
    });
  });
});
