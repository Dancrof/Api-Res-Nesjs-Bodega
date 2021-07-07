import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { JWT_SECRET } from "src/config/constant";
import { ExtractJwt, Strategy } from "passport-jwt";

import { UserService } from "src/user/user.service";

@Injectable()
export class  JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly userService: UserService,
        private readonly config: ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>(JWT_SECRET)
        });
    }
    async validate(payload: any){
        const {sub: id} = payload;

        return await this.userService.findId(id);
    }

}