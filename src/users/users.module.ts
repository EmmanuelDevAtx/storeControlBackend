import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateNewUserResultResolver, UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: User.name, schema: UsersSchema},
    ])
  ],
  providers: [
    UsersResolver, 
    UsersService,
    UsersRepository,
    
    //Resolvers
    CreateNewUserResultResolver
  ],
  exports: [UsersService]
})
export class UsersModule {}
