import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateNewUserSuccess, CreateUserInput, FilterShowUser, InternalError, InvalidInputError, Role, ShowUserByIdSuccess, ShowUsersSuccess } from 'src/graphql/graphql';
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

  @Query('showUsers')
  async showUsers(
    @Args('filter') input: FilterShowUser, 
    @Args('filterUser') filterUser: FilterShowUser
  ){
    const filter : any =input  
    const query: any = filterUser;
    const users = await this.usersService.findAll(filter, query);
    return Object.assign(new ShowUsersSuccess(),{
      showUsersConnection:{
        pageInfo: {
          startCursor:users.startCursor,
          endCursor: users.endCursor,
          hasNext: users.hasNext,
        },
        total: users.total,
        edges: users.items
      }
    })
  }

  @Query('showUserById')
  async showUserById(
    @Args('id') id:string  
    ){  
    const user = await this.usersService.findById(id);
    return Object.assign(new ShowUserByIdSuccess, { 
      user
    })
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

@Resolver('ShowUsersResult')
export class ShowUsersResultResolver{
  @ResolveField()
  __resolveType(obj){
    if(obj instanceof ShowUsersSuccess){
      return 'ShowUsersSuccess'
    }

    if(obj instanceof InvalidInputError){
      return 'InvalidInputError'
    }

    if(obj instanceof InternalError){
      return 'InternalError'
    }

    return null;
  }
}

@Resolver('ShowUserByIdResult')
export class ShowUserByIdResultResolver{
  @ResolveField()
  __resolveType(obj){
    if(obj instanceof ShowUserByIdSuccess){
      return 'ShowUserByIdSuccess'
    }

    if(obj instanceof InvalidInputError){
      return 'InvalidInputError'
    }

    if(obj instanceof InternalError){
      return 'InternalError'
    }

    return null;
  }
}
