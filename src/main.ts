import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { setDefaultUser } from 'config/default-user';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)
  
  initSwagger(app);
  setDefaultUser(config);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const logger = new Logger();
  await app.listen(3000);
  logger.log(`Server is runing is ${await app.getUrl()}`);
}
bootstrap();
