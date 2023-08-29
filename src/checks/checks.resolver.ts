import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { ChecksService } from './checks.service';
import { CreateManyChecksInput, CreateManyChecksSuccess, InternalError, InvalidInputError, ShowAddChecksFilterInput, ShowAllChecksFilter, ShowAllChecksSuccess, ShowCheckByIdSuccess } from 'src/graphql/graphql';
import { JwtAdminGuard } from 'src/auth/guards/jwt-auth-gurad';
import { UseGuards } from '@nestjs/common';


@UseGuards( JwtAdminGuard )
@Resolver('Check')
export class ChecksResolver {
  constructor(private readonly checksService: ChecksService) {}

  @Mutation(()=>{})
  async createManyChecks(
    @Args('input') input: CreateManyChecksInput
  ){
    try {
      const checks = await this.checksService.createManyChecks(input);
      return Object.assign(new CreateManyChecksSuccess(),{
        checks
      });
    } catch (error) {
      return error
    }
  }

  @Query(()=>{})
  async showCheckById(
    @Args('id') id: string
  ){
    const populate = 'user'
    const check = await this.checksService.findById(id, {populateFields:populate});
    return Object.assign(new ShowCheckByIdSuccess(),{
      check
    })
  }

  @Query(()=>{})
  async showAllChecks(
    @Args('input') input: ShowAllChecksFilter,
    @Args('filter') filter : ShowAddChecksFilterInput
  ){
    let query : any = input
    const allChecks = await this.checksService.findAll(query, filter);
    return Object.assign(new ShowAllChecksSuccess(), {
      showAllChecksConnection:{
        pageInfo: {
          startCursor: allChecks.startCursor,
          endCursor: allChecks.endCursor,
          hasNext: allChecks.hasNext,
        },
        total: allChecks.total,
        edges: allChecks.items
      }
    })
  }
}

@Resolver('CreateManyChecksResult')
export class CreateNewUserResultResolver {
  @ResolveField()
  __resolveType(obj) {
    if (obj instanceof CreateManyChecksSuccess) {
      return 'CreateManyChecksSuccess';
    }
    if (obj instanceof InternalError) {
      return 'InternalError';
    }
    if (obj instanceof InvalidInputError) {
      return 'InvalidInputError';
    }
    return null;
  }
}

@Resolver('ShowCheckByIdResult')
export class ShowCheckByIdResultResolver {
  @ResolveField()
  __resolveType(obj) {
    if (obj instanceof ShowCheckByIdSuccess) {
      return 'ShowCheckByIdSuccess';
    }
    if (obj instanceof InternalError) {
      return 'InternalError';
    }
    if (obj instanceof InvalidInputError) {
      return 'InvalidInputError';
    }
    return null;
  }
}

@Resolver('ShowAllChecksResult')
export class ShowAllChecksResultResolver {
  @ResolveField()
  __resolveType(obj) {
    if (obj instanceof ShowAllChecksSuccess) {
      return 'ShowAllChecksSuccess';
    }
    if (obj instanceof InternalError) {
      return 'InternalError';
    }
    if (obj instanceof InvalidInputError) {
      return 'InvalidInputError';
    }
    return null;
  }
}
