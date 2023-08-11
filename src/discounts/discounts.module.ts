import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { DiscountsResolver } from './discounts.resolver';

@Module({
  providers: [DiscountsResolver, DiscountsService]
})
export class DiscountsModule {}
