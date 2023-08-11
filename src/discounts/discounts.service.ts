import { Injectable } from '@nestjs/common';
import { CreateNewDiscountInput } from 'src/graphql/graphql';
import { Discount } from './entities/discount.entity';
import { CrudService } from 'src/core/crud.service';
import { DiscountRepository } from './discounts.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscountsService extends CrudService<Discount>{

  constructor(
    readonly repository: DiscountRepository,
    readonly configService: ConfigService
  ){
    super(repository, 'DiscountService', configService)
  }
}
