import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DiscountsService } from './discounts.service';
import { CreateDiscountInput } from './dto/create-discount.input';
import { UpdateDiscountInput } from './dto/update-discount.input';

@Resolver('Discount')
export class DiscountsResolver {
  constructor(private readonly discountsService: DiscountsService) {}

  @Mutation('createDiscount')
  create(@Args('createDiscountInput') createDiscountInput: CreateDiscountInput) {
    return this.discountsService.create(createDiscountInput);
  }

  @Query('discounts')
  findAll() {
    return this.discountsService.findAll();
  }

  @Query('discount')
  findOne(@Args('id') id: number) {
    return this.discountsService.findOne(id);
  }

  @Mutation('updateDiscount')
  update(@Args('updateDiscountInput') updateDiscountInput: UpdateDiscountInput) {
    return this.discountsService.update(updateDiscountInput.id, updateDiscountInput);
  }

  @Mutation('removeDiscount')
  remove(@Args('id') id: number) {
    return this.discountsService.remove(id);
  }
}
