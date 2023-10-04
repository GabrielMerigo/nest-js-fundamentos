import { Role } from '../../enums/role.enum';
import { UpdateUserPatchDTO } from '../user/dto/update-user-patch.dto';

export const updatePatchUserDTO: UpdateUserPatchDTO = {
  role: Role.USER,
};
