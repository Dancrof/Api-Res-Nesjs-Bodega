import { OmitType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class UserRegisterDto extends OmitType(CreateUserDto, ['roles'] as const) {}