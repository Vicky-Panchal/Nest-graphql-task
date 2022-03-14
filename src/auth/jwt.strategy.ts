import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(User) private userRepository: Repository<User>){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiraton: false,
            secretOrKey: "Area51",
        });
    }

    async validate(payload:JwtPayload): Promise<User> {
        const {id} = payload;
        const user = this.userRepository.findOne(id);

        if(!user){
            throw new UnauthorizedException();
        }
        
        return user;
    }
}