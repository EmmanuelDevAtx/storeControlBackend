import { Module } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { CreateManyDiscountsResultResolver, CreateNewDiscountResultResolver, DiscountsResolver, ShowDicountByIdResultResolver } from './discounts.resolver';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Discount, DiscountSchema } from './entities/discount.entity';
import { DiscountRepository } from './discounts.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: Discount.name, schema: DiscountSchema}
    ]),
    UsersModule
  ],
  providers: [
    DiscountsResolver, 
    DiscountsService,
    DiscountRepository,

    //Resolevrs
    CreateNewDiscountResultResolver,
    CreateManyDiscountsResultResolver,
    ShowDicountByIdResultResolver
  ],

  exports:[
    DiscountsService
  ]
})
export class DiscountsModule {}
