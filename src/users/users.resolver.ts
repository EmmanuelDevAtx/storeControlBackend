import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateNewUserSuccess, CreateUserInput, InternalError, InvalidInputError, Role } from 'src/graphql/graphql';
import { Logger } from '@nestjs/common';

@Resolver('User')
export class UsersResolver {
  protected logger: Logger;

  constructor(
    private readonly usersService: UsersService) {
      this.logger = new Logger('OneTimeCodeResolver');
    }

  @Mutation('createNewUser')
  async createNewUser(
    @Args('user') user: CreateUserInput
  ){
    const response = await this.usersService.create({...user, role: [Role.USER]})

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
