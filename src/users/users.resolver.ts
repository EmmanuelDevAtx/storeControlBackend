import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateNewUserSuccess, CreateUserInput, InternalError, InvalidInputError } from 'src/graphql/graphql';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createNewUser')
  async createNewUser(
    @Args('user') user: CreateUserInput
  ){
    const response = await this.usersService.create(user)

    return  Object.assign(new CreateNewUserSuccess(),{
      user: response
    });
  } 

}

@Resolver('CreateNewUserResult')
export class CreateNewUserResultResolver {
  @ResolveField()
  __resolveType(obj) {
    if (obj instanceof CreateNewUserSuccess) {
      return 'CreateNewUserSuccess';
    }
    if (obj instanceof InternalError) {
      return 'InternalError';
    }
    if (obj instanceof InvalidInputError) {
      return 'InvalidInputError';
    }
    return null;
  }
}
