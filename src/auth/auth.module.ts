import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver, CreateAdminResultResolver, LoginResultResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategies/jwt-strategie';
import { PassportModule } from '@nestjs/passport';

@Module({

  imports:[
    UsersModule,
    PassportModule
  ],

  providers: [
    AuthResolver, 
    AuthService,
    
    LoginResultResolver,
    CreateAdminResultResolver,
    JwtStrategy
  ],
  exports:[AuthService]
})
export class AuthModule {}
