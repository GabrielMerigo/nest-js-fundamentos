import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { validate as validateUUID } from 'uuid';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!validateUUID(req.params.id)) {
      throw new BadRequestException('Invalid Id');
    }

    next();
  }
}
