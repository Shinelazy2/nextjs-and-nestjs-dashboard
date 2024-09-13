import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse: any = exception.getResponse();
    const message = exceptionResponse.message || exception.message;
    const error = exceptionResponse.error || exception.name;

    response.status(status).json({
      statusCode: status,
      message: message || 'An error occurred',
      error: error || 'Unknown error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
