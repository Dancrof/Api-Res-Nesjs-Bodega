import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jtwService: JwtService
    ){}
  
   async validateUser(email: string, password: string): Promise<any> {
   const user = await this.userService.findUser({email});

   if(user && await compare(password, user.password)){
    const  {password, ...rest} = user; 
    return rest;
   }
   return null;
  }

  login(user: User) {
    const {id, ...rest} = user;
    const payload = { sub: id};

    return {
      ...rest,
      accessToken: this.jtwService.sign(payload)
    };
  }
}
