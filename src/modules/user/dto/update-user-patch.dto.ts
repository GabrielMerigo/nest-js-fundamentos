import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-user.dto';

export class UpdateUserPatchDTO extends PartialType(CreateUserDTO) {} // Não são obrigatórios mas se forem preenchiDOS, precisam seguir a regra!
