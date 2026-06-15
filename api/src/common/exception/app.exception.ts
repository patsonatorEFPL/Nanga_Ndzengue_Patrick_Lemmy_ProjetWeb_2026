import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(
    private readonly code: string,
    private readonly statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    message: string = code,
  ) {
    super(message, statusCode);
  }

  getCode(): string {
    return this.code;
  }

  getStatusCode(): HttpStatus {
    return this.statusCode;
  }
}
