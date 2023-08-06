import { Injectable } from '@nestjs/common';
import { InjectModel, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudRepository } from '../core/crud.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends CrudRepository<User> {
  constructor(@InjectModel(User.name) readonly model: Model<User>) {
    super(model, 'User');
  }
}
