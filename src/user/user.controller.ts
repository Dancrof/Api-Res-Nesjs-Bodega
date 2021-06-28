import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth-decorator';
import { ACGuard, InjectRolesBuilder, RolesBuilder, UseRoles } from 'nest-access-control';
import { AppResources, AppRoles } from 'src/app.roles';
import { User } from 'src/common/decorators/user-decorator';
import { User as UserEntity } from './entities/user.entity';
import { UserRegisterDto } from './dto/user-register.dto';

@ApiTags('User Controller')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder
    ) {}

  @Post('/register')
  publicRegister(@Body() userRegisterDto: UserRegisterDto){
    const data = this.userService.create({
      ...userRegisterDto, roles: [AppRoles.AUTHOR]
    })
    return { message: 'Register Succeful', data}
  }
  
    @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResources.USER
  })
  @Post('/create')
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'User Created',
      newUser
    });
  }

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.USER
  })
  @Get()
  async findAll(@Res() res,) {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json({
      message: 'Users',
      users
    });
  }

  @Get(':id')
  async findOne(@Res() res,@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findId(+id);
   return res.status(HttpStatus.OK).json(user);
  }

  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResources.USER
  })
  @Patch('/update')
  async update(@Res() res, @Query('id') id, @Body() updateUserDto: UpdateUserDto, @User() user: UserEntity) {
    
    let data;

    if(this.rolesBuilder
        .can(user.roles)
        .updateAny(AppResources.USER)
        .granted
      ){
        //Es Admin
        data =  await this.userService.update(+id, updateUserDto);
    } else {
      //Es Author
      const {roles, ...rest} = updateUserDto;
      data =  await this.userService.update(+id, rest, user);
    }

    return res.status(HttpStatus.OK).json({
      message: 'User update',
      data
    });
  }

  @Auth({
    possession: 'own',
    action: 'delete',
    resource: AppResources.USER
  })
  @Delete('/delete')
  async remove(@Res() Res, @Query('id') id, @User() user: UserEntity) {
    
    let data;

    if(this.rolesBuilder
        .can(user.roles)
        .updateAny(AppResources.USER)
        .granted
      ){
        //Es Admin
        data =  await await this.userService.delete(+id);
    } else {
      //Es Author
      data =  await this.userService.delete(+id, user);
    } 
    
    return Res.status(HttpStatus.OK).json({
      message: 'User Delete',
      data
    });
  }
}
