import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable global validation (for DTOs with class-validator decorators)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,      // strips unknown properties
      forbidNonWhitelisted: true, // throws error if extra props are sent
      transform: true,      // auto-transform payloads to DTO instances
    }),
  );

  await app.listen(3000);
}
bootstrap();
