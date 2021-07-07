import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

export interface UserFindOne{
  id?: number;
  email: string;
}

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    const userExis = await this.userRepository.findOne({
      username: createUserDto.username, 
      email: createUserDto.email
    });
    if(userExis) throw new BadRequestException('User already exists');
    const newUser = this.userRepository.create(createUserDto);
    const hidePassword = await this.userRepository.save(newUser);
    
    delete hidePassword.password;
    return hidePassword;
  }

  async findAll(userEntity?: User): Promise<User[]> {
    const users = await this.userRepository.find(userEntity);
    return users;
  }

  async findId(id: number, userEntity?: User): Promise<User> {
    const user = await this.userRepository.findOne(id)
      .then(u => !userEntity ? u: !!u && userEntity.id === u.id ? u: null)
    
    if(!user) throw new NotFoundException('User not exist');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, userEntity?: User): Promise<User>{
    const findUser = await this.findId(id, userEntity);
    const updateUser = Object.assign(findUser, updateUserDto);
    return this.userRepository.save(updateUser);
  }

  async delete(id: number, userEntity?: User): Promise<User>{
    const deleteUser = await this.findId(id, userEntity);
   return await this.userRepository.remove(deleteUser);
  }

  async findUser(data: UserFindOne){
    return await this.userRepository
    .createQueryBuilder('user')
    .where(data)
    .addSelect('user.password')
    .getOne()
  };
}
