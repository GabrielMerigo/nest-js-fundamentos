import { UserService } from '../user/user.service';
import { userEntityList } from './user-entity-list.mock';

export const userRepositoryMock = {
  provide: UserService,
  useValue: {
    create: jest.fn().mockResolvedValue(userEntityList[0]),
    list: jest.fn(),
    show: jest.fn(),
    update: jest.fn(),
    updatePartial: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  },
};
