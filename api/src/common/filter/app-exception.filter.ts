import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { AppException } from '../exception/app.exception';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: AppException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    response.status(exception.getStatusCode()).json({
      data: null,
      result: {
        code: exception.getCode(),
        message: exception.message,
      },
      validationErrors: null,
    });
  }
}
