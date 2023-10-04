import { Role } from '../../enums/role.enum';
import { UpdateUserPutDTO } from '../user/dto/update-user-put.dto';

export const updatePutUserDTO: UpdateUserPutDTO = {
  birth_at: '2000-01-01',
  email: 'joao@gmail.com',
  name: 'João Rangel',
  password: '123456',
  role: Role.USER,
};
