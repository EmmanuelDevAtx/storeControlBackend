import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/crud.service';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService extends CrudService<User>{

  constructor(
    readonly repository: UsersRepository,
    readonly configService: ConfigService
  ){
    super( repository, 'UserService', configService);
  }
}
