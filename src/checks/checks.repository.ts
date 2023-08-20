import { Injectable } from '@nestjs/common';
import { InjectModel, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudRepository } from '../core/crud.repository';
import { Check } from './entities/check.entity';

@Injectable()
export class ChecksRepository extends CrudRepository<Check> {
  constructor(@InjectModel(Check.name) readonly model: Model<Check>) {
    super(model, 'Checks');
  }
}
