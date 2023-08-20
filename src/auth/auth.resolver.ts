import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateAdimInput, CreateAdminSuccess, CreateUserInput, InternalError, InvalidInputError, LoginSuccess, Role } from 'src/graphql/graphql';
import { UsersService } from 'src/users/users.service';
import { JwtAdminGuard } from './guards/jwt-auth-gurad';
import { UseGuards } from '@nestjs/common';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
    ) {}

  @Query('login')
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ){
    const token = await this.authService.loginAdmin(email, password);

    return Object.assign(new LoginSuccess(),{
      token
    })
  }

  @UseGuards( JwtAdminGuard )
  @Mutation('createAdmin')
  async createAdmin(
    @Args('user') user: CreateAdimInput
  ){
    const responseUser = await this.authService.createAdmin(user);
    
    return Object.assign(new CreateAdminSuccess(), {
      user: responseUser
    })
  }
  
}

@Resolver('LoginResult')
export class LoginResultResolver {
  @ResolveField()
  __resolveType(obj) {
    if (obj instanceof LoginSuccess) {
      return 'LoginSuccess';
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

@Resolver('CreateAdminResult')
export class CreateAdminResultResolver {
  @ResolveField()
  __resolveType(obj) {
    if (obj instanceof CreateAdminSuccess) {
      return 'CreateAdminSuccess';
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
