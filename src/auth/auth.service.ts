import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { UsersService } from 'src/users/users.service';
import { SignUpUserInput } from './dto/sign-up.input';
import { SigninUserInput } from './dto/signin-user.input';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService,
        ){}

    async validateUser(signinUserInput: SigninUserInput): Promise<any> {
        const {id, password} = signinUserInput;
        const user = await this.usersService.findOne(id);

        const match = await bcrypt.compare(password, user.password);

        if(user && match){
            const {password, ...result} = user;
            return user;
        }
        return null;
    }

    async signIn(signinUserInput: SigninUserInput){

        const user = await this.validateUser(signinUserInput);

        if(!user)
        {
            throw new UnauthorizedException();
        }
        return {
            access_token: this.jwtService.sign({id: user.id}),
            user
        }
    }

    async signUp(signUpUserInput: SignUpUserInput){
        const user = this.usersService.create(signUpUserInput);

        return user;

    }

}
