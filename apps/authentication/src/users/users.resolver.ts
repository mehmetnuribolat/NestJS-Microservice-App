import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@app/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput')
    createUserInput: CreateUserDto,
  ) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }
}
