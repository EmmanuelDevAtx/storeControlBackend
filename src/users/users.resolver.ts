import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateNewUserSuccess, CreateUserInput, FilterShowUser, InternalError, InvalidInputError, Role, ShowUserByIdSuccess, ShowUsersSuccess } from 'src/graphql/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtAdminGuard } from 'src/auth/guards/jwt-auth-gurad';
import { CurrentUser } from 'src/auth/decorators/admin.decorator';

@UseGuards( JwtAdminGuard )
@Resolver('User')
export class UsersResolver {
  protected logger: Logger;

  constructor(
    private readonly usersService: UsersService) {
      this.logger = new Logger('OneTimeCodeResolver');
    }

  @Mutation(()=>{})
  async createNewUser(
    @Args('user') user: CreateUserInput
  ){
    const response = await this.usersService.create({...user,email: user.email ? user.email : `${user.name}@genericEmail.com`, role: [Role.USER]})

    return  Object.assign(new CreateNewUserSuccess(),{
      user: response
    });
  } 

  @Query(()=>{})
  async showUsers(
    @Args('input') input: FilterShowUser,
  ){
    const query : any =input  
    const filter: any = {role: input.role};
    const users = await this.usersService.findAll(query, filter);
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

  @Query(()=>{})
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
