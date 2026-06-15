import { HttpStatus } from '@nestjs/common';
import { AppException } from '@common/exception/app.exception';

export class TokenGenerationException extends AppException {
  constructor() {
    super(
      'TOKEN_GENERATION_ERROR',
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Erreur lors de la génération du token',
    );
  }
}
