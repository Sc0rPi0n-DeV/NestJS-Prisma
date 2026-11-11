import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { Prisma } from '../../generated/prisma/client.js';
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
   catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    // 1. NestJS HTTP exceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'string') {
        message = errorResponse;
      } else if (
        errorResponse &&
        typeof errorResponse === 'object' &&
        'message' in errorResponse
      ) {
        const value = errorResponse.message;

        if (
          typeof value === 'string' ||
          (Array.isArray(value) &&
            value.every((item) => typeof item === 'string'))
        ) {
          message = value;
        } else {
          message = exception.message;
        }
      } else {
        message = exception.message;
      }
    }

    // 2. Prisma exceptions
    else if (
      exception instanceof Prisma.PrismaClientKnownRequestError
    ) {
      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = 'Unique constraint violation';
          break;

        case 'P2003':
          status = HttpStatus.BAD_REQUEST;
          message = 'Invalid related record';
          break;

        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'Record not found';
          break;

        default:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
          message = 'Database operation failed';
      }
    }

    // 3. Send standardized response
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.originalUrl,
    });
  }
 
}