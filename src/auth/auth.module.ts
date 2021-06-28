import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'config/constant';
import { JwtStrategy } from './strategies/jwt-strategy';


@Module({
  imports:[
    JwtModule.registerAsync({
     inject: [ConfigService],
      useFactory: (config: ConfigService) =>({
        secret: config.get<string>(JWT_SECRET),
        signOptions: {expiresIn: '60m'}
      })
    }),
    PassportModule, 
    UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
