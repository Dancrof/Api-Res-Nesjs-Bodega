import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';
import { TYPEORM_CONFIG } from 'src/config/constant';
import * as Joi from '@hapi/joi';
import databaseConfig from 'src/config/database.config';

@Module({
  imports: [
    // Conecion a BD
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (config: ConfigService) => 
      config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG)
      
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
        .valid('development', 'production')
        .default('development')
      }),
      load: [databaseConfig],
    }),
    AccessControlModule.forRoles(roles),
    ProductModule, 
    UserModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
