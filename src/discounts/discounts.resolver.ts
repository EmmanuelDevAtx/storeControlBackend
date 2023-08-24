import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { DiscountsService } from './discounts.service';
import { CreateManyDiscountsInput, CreateManyDiscountsSuccess, CreateNewDiscountInput, CreateNewDiscountSuccess, InternalError, InvalidInputError, ShowDicountByIdSuccess } from 'src/graphql/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtAdminGuard } from 'src/auth/guards/jwt-auth-gurad';

@UseGuards( JwtAdminGuard )
@Resolver('Discount')
export class DiscountsResolver {

  protected logger: Logger;
  constructor(
    private readonly discountsService: DiscountsService,
    private readonly userService: UsersService
    ) {
    this.logger = new Logger('DiscountsResolver');
  }

  @Mutation(()=>{})
  async createNewDiscount(
    @Args('input') input: CreateNewDiscountInput
    ) {
    const inputData: any = input
    const discount = await this.discountsService.create(inputData);
    return Object.assign(new CreateNewDiscountSuccess(), {
      discount
    })
  }

  @Mutation(()=>{})
  async createManyDiscounts(
    @Args('input') input:CreateManyDiscountsInput
  ){
    const discounts = await this.discountsService.createManyDiscounts(input)
    return Object.assign(new CreateManyDiscountsSuccess(), {
      discounts
    })

  }

  @Query(()=>{})
  async showDicountById(
    @Args('id') id:string
  ){
    const populate = 'user'
    const discount = await this.discountsService.findById(id, {populateFields: populate});
    return Object.assign(new ShowDicountByIdSuccess(),{
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

@Resolver('CreateManyDiscountsResult')
export class CreateManyDiscountsResultResolver{
  @ResolveField()
  __resolveType(obj){
    if(obj instanceof CreateManyDiscountsSuccess){
      return 'CreateManyDiscountsSuccess'
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

@Resolver('ShowDicountByIdResult')
export class ShowDicountByIdResultResolver{
  @ResolveField()
  __resolveType(obj){
    if(obj instanceof ShowDicountByIdSuccess){
      return 'ShowDicountByIdSuccess'
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

