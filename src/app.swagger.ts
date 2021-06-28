import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {

    const config = new DocumentBuilder()
    .setTitle('Api Res Product')
    .addBearerAuth()
    .setDescription('Api con metodos CRUD, Auth, para Productos')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
}