import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpStatusInterceptor } from './http-code.interceptor';
import { ValidationPipe } from '@nestjs/common';

export async function HttpIngressBootstrap(AppModule) {
  /** swagger */
  const config = new DocumentBuilder()
    .setTitle('NEST DDD APIs')
    .setDescription('The Nest API description')
    .setVersion('1.0')
    .addTag('latest')
    .addBasicAuth()
    .build();

  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new HttpStatusInterceptor());
  
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}