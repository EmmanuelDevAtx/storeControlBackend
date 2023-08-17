import { Injectable } from '@nestjs/common';
import { CreateManyDiscountsInput, CreateNewDiscountInput } from 'src/graphql/graphql';
import { Discount } from './entities/discount.entity';
import { CrudService } from 'src/core/crud.service';
import { DiscountRepository } from './discounts.repository';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DiscountsService extends CrudService<Discount>{

  constructor(
    readonly repository: DiscountRepository,
    readonly configService: ConfigService,
    readonly userService: UsersService,
  ){
    super(repository, 'DiscountService', configService)
  }

  async createManyDiscounts(input : CreateManyDiscountsInput){
    try {
      const dataDiscounts: any [] = [];
      input.discounts.map((item : CreateNewDiscountInput )=>{
        dataDiscounts.push({description: item.description, amount: item.amount, user: item.user})
      })
      const items = await this.repository.createMany(dataDiscounts)
      return items
    } catch (error) {
      console.error(error.message)
      throw new Error (error.message)
    }
  }
}
