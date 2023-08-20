import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver, CreateAdminResultResolver, LoginResultResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';

@Module({

  imports:[
    UsersModule
  ],

  providers: [
    AuthResolver, 
    AuthService,
    
    LoginResultResolver,
    CreateAdminResultResolver
  ]
})
export class AuthModule {}
