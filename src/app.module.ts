import { Module } from '@nestjs/common';
import { IngressModule } from './ingress/ingress.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), IngressModule],
})
export class AppModule {}
