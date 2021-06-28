import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user-decorator';
import { User as UserEntity } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth-decorator';

@ApiTags('Auth router')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@User() user: UserEntity, @Body() loginDto: CreateAuthDto) {
    const data = await this.authService.login(user);
    return {
      message :'Login Success',
      data
    };
  }
 
  @Auth()
  @Get('/profile')
  profile(@User() user: UserEntity) {
    return {
      message: 'Profile',
      user
    };
  }
  @Auth()
  @Get('/refresh')
   refreshToken(@User() user: UserEntity) {
   const data =  this.authService.login(user);
   return {
    message: 'Refresh Success',
    data
   };
  }
}
