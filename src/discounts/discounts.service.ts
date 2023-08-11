import { Injectable } from '@nestjs/common';
import { CreateDiscountInput } from './dto/create-discount.input';
import { UpdateDiscountInput } from './dto/update-discount.input';

@Injectable()
export class DiscountsService {
  create(createDiscountInput: CreateDiscountInput) {
    return 'This action adds a new discount';
  }

  findAll() {
    return `This action returns all discounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discount`;
  }

  update(id: number, updateDiscountInput: UpdateDiscountInput) {
    return `This action updates a #${id} discount`;
  }

  remove(id: number) {
    return `This action removes a #${id} discount`;
  }
}
