import { ConfigService } from "@nestjs/config";
import { User } from "../user/entities/user.entity";
import { getRepository } from "typeorm";
import { DEFAULT_USER_EMAIL, DEFAULT_USER_FULLNAME, DEFAULT_USER_PASSWORD, DEFAULT_USER_USERNAME } from "../config/constant";



export  const setDefaultUser = async (config: ConfigService) => {

    const userRepository = getRepository<User>(User)
  
    const defaultUser = await userRepository
        .createQueryBuilder()
        .where('email = :email', {email: config.get<string>(DEFAULT_USER_EMAIL)})
        .getOne()

    if(!defaultUser){
        const adminUser = userRepository.create({
            fullName: config.get<string>(DEFAULT_USER_FULLNAME),
            username: config.get<string>(DEFAULT_USER_USERNAME),
            email: config.get<string>(DEFAULT_USER_EMAIL),
            password: config.get<string>(DEFAULT_USER_PASSWORD),
            roles: ['ADMIN']
        })
        return await userRepository.save(adminUser)
    }
};
export default setDefaultUser;
