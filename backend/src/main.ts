import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  
  // Globalna walidacja
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Zoo Management API')
    .setDescription('API do zarządzania ogrodem zoologicznym')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log('Backend: http://localhost:3000');
  console.log('Swagger: http://localhost:3000/api/docs');
}
bootstrap();