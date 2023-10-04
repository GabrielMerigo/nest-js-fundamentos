import { Role } from '../../enums/role.enum';

export const userEntityList = [
  {
    name: 'João Rangel',
    email: 'joão@hcode.com.br',
    birthAt: new Date('2000-01-01'),
    id: 'uuid-123',
    password: '123',
    role: Role.ADMIN,
    createAt: new Date(),
    updateAt: new Date(),
  },
];
