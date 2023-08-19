import { Module } from '@nestjs/common';
import { ChecksService } from './checks.service';
import { ChecksResolver, CreateNewUserResultResolver, ShowCheckByIdResultResolver } from './checks.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Check, CheckSchema } from './entities/check.entity';
import { UsersModule } from 'src/users/users.module';
import { ChecksRepository } from './checks.repository';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:Check.name, schema: CheckSchema}
    ]),
    UsersModule
  ],
  providers: [
    ChecksResolver, 
    ChecksService,
    ChecksRepository,

    CreateNewUserResultResolver,
    ShowCheckByIdResultResolver
  ]
})
export class ChecksModule {}
