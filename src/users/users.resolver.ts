import { Resolver, Query, Mutation, Args, Int, ObjectType, ResolveField } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user' })
  findOne(
    @Args('id', { type: () => Int }) id: number,  )
  {
    return this.usersService.findOne(id);
  }

}
