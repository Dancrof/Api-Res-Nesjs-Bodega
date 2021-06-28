import { IsArray, IsBoolean, IsDate, IsEnum, IsString, MaxLength, MinLength } from "class-validator";
import { AppRoles } from "src/app.roles";
import { EnumToString } from "src/common/helpers/enumToString";

export class CreateUserDto {
     
    @MaxLength(255)
    @IsString()
    readonly fullName: string;
    
    @MaxLength(10)
    @IsString()
    readonly username: string;
    

    @IsString()
    readonly email: string;
    
    @MinLength(8)
    @MaxLength(16)
    @IsString()
    readonly password: string;    

    @IsArray()
    @IsEnum(AppRoles, {
        each: true,
        message: `Must be valid role value ${EnumToString(AppRoles)}`
    })
    readonly roles: string[];
    
}
