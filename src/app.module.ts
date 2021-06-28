import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';

@Module({
  imports: [
    // Conecion a BD PhpMyAdmin
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
      host: config.get<string>('DATABASE_HOST'),
      port: parseInt(config.get<string>('DATABASE_PORT'), 10),
      username: config.get<string>('DATABASE_USERNAME'),
      password: config.get<string>('DATABASE_PASSWORD'),
      database: config.get<string>('DATABASE_NAME'),
      entities: [__dirname +'./**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    AccessControlModule.forRoles(roles),
    ProductModule, 
    UserModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
