import { Module } from '@nestjs/common';
import { HttpController } from './http/http.controller';
import { UseCaseModule } from 'src/useCase/usecase.module';
import { GlobalExceptionFilter } from './global-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [UseCaseModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
  controllers: [HttpController],
})
export class IngressModule {}
