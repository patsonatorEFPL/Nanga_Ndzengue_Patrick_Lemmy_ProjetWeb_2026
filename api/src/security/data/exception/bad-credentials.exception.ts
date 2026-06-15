import { HttpStatus } from '@nestjs/common';
import { AppException } from '@common/exception/app.exception';

export class BadCredentialsException extends AppException {
  constructor() {
    super('BAD_CREDENTIALS', HttpStatus.UNAUTHORIZED, 'Mauvais identifiants');
  }
}
