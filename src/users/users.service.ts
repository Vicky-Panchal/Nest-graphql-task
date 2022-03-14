import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";
import { SignUpUserInput } from 'src/auth/dto/sign-up.input';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  async create(signUpUserInput: SignUpUserInput) {
    const { password} = signUpUserInput;
    const salt = await bcrypt.genSalt();
    const user = this.userRepository.create(signUpUserInput);

    user.password = await this.hashPassword(password,salt);
    console.log(user.password);

    
    try {
        await this.userRepository.save(user);
    } catch(error){
        console.log(error);
        throw new ConflictException("User already exists");
    };
    return user;
}

// async validateuserPassowrd(signInDto: SignInDto): Promise<number>{
//     const {id, password} = signInDto;

//     const user = await this.userRepository.findOne(id);

//     if(user){
//         return user.id;
//     }
//     else {
//         return null;
//     }
// }

async hashPassword(password: string, salt: string): Promise<string>{
    return bcrypt.hash(password,salt);
}

async findOne(id: number){
    const user = await this.userRepository.findOne(id);

    if(!user)
    {
      throw new NotFoundException("No user found with the requested id");
    }

    return user;
}
}

// && await user.validatePassowrd(password)