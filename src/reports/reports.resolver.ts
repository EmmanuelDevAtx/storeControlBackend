import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { ReportsService } from './reports.service';
import { CreateReportInput, CreateReportSuccess, InternalError, InvalidInputError } from 'src/graphql/graphql';
import { CurrentUser } from 'src/auth/decorators/admin.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAdminGuard } from 'src/auth/guards/jwt-auth-gurad';

@Resolver('Report')
export class ReportsResolver {
  constructor(private readonly reportsService: ReportsService) {}
  
  @UseGuards( JwtAdminGuard )
  @Mutation()
  async createReport(
    @Args('input') input: CreateReportInput,
    @CurrentUser() user: any
  ){
    const report = await this.reportsService.createReport(input, user);

    return Object.assign(new CreateReportSuccess(),{
      report
    })
  }

}

@Resolver('CreateReportResult')
export class CreateNewUserResultResolver {
  @ResolveField()
  __resolveType(obj) {
    if (obj instanceof CreateReportSuccess) {
      return 'CreateReportSuccess';
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
