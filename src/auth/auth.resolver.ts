
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { SignInResponse } from './dto/sign-response';
import { SigninUserInput } from './dto/signin-user.input';
import { SignUpUserInput } from './dto/sign-up.input';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService){}

    @Mutation(() => SignInResponse)
    signIn(
        @Args('signinUserInput') signinUserInput: SigninUserInput,
        ){
        return this.authService.signIn(signinUserInput);
    }

    @Mutation(() => User)
    signUp(
        @Args('signUpUserInput') signUpUserInput: SignUpUserInput
    ){
        return this.authService.signUp(signUpUserInput);
    }
}
