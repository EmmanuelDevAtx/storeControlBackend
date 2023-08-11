import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { DiscountsService } from './discounts.service';
import { CreateNewDiscountInput, CreateNewDiscountSuccess, InternalError, InvalidInputError } from 'src/graphql/graphql';
import { Logger } from '@nestjs/common';

@Resolver('Discount')
export class DiscountsResolver {

  protected logger: Logger;
  constructor(private readonly discountsService: DiscountsService) {
    this.logger = new Logger('DiscountsResolver');
  }

  @Mutation('createNewDiscount')
  async createNewDiscount(
    @Args('input') input: CreateNewDiscountInput
    ) {
    const discount = await this.discountsService.create(input);
    return Object.assign(new CreateNewDiscountSuccess(), {
      discount
    })
  }
}

@Resolver('CreateNewDiscountResult')
export class CreateNewDiscountResultResolver{
  @ResolveField()
  __resolveType(obj){
    if(obj instanceof CreateNewDiscountSuccess){
      return 'CreateNewDiscountSuccess'
    }

    if(obj instanceof InvalidInputError){
      return 'InvalidInputError'
    }

    if(obj instanceof InternalError){
      return 'InternalError'
    }

    return null;
  }
}

