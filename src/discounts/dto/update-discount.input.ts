import { CreateDiscountInput } from './create-discount.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDiscountInput extends PartialType(CreateDiscountInput) {
  id: number;
}
