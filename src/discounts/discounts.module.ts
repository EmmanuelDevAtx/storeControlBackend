import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateNewDiscountResultResolver, DiscountsResolver } from './discounts.resolver';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Discount, DiscountSchema } from './entities/discount.entity';
import { DiscountRepository } from './discounts.repository';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: Discount.name, schema: DiscountSchema}
    ])
  ],
  providers: [
    DiscountsResolver, 
    DiscountsService,
    DiscountRepository,

    //Resolevrs
    CreateNewDiscountResultResolver
  ]
})
export class DiscountsModule {}
