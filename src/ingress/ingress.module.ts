import { Module } from '@nestjs/common';
import { HttpController } from './http/http.controller';
import { UseCaseModule } from 'src/useCase/usecase.module';

@Module({
  imports: [UseCaseModule],
  controllers: [HttpController],
})

export class IngressModule {}
