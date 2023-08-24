import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ReportsService } from './reports.service';
import { CreateReportInput, CreateReportSuccess, InternalError, InvalidInputError, ShowReportByIdSuccess, User } from 'src/graphql/graphql';
import { CurrentUser } from 'src/auth/decorators/admin.decorator';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtAdminGuard } from 'src/auth/guards/jwt-auth-gurad';
import { DiscountsService } from 'src/discounts/discounts.service';
import { UsersService } from 'src/users/users.service';
import { ChecksService } from 'src/checks/checks.service';
import { Report } from './entities/report.entity' 

@Resolver('Report')
export class ReportsResolver {
  constructor(private readonly reportsService: ReportsService) {}
  
  @UseGuards( JwtAdminGuard )
  @Mutation(()=>{})
  async createReport(
    @Args('input') input: CreateReportInput,
    @CurrentUser() user: any
  ){
    const report = await this.reportsService.createReport(input, user);

    return Object.assign(new CreateReportSuccess(),{
      report
    })
  }

  @UseGuards( JwtAdminGuard )
  @Query(()=>{})
  async showReportById(
    @Args('id') id: string
  ){
    const report = await this.reportsService.findById(id, { populateFields : 'owner usersPay.user usersPay.discounts'});
    return Object.assign(new ShowReportByIdSuccess(),{
      report
    })
  }

}

@Resolver('Report')
export class ReportUserPayResolver {
  protected logger: Logger;

  constructor(
    readonly discountService: DiscountsService,
    readonly userService: UsersService,
    readonly checkService: ChecksService,
  ) {
    this.logger = new Logger('ReportUserPayResolver');
  }

  @ResolveField()
  async usersPay(
    @Parent() input: Report,
  ) {
    const allUsersData: any[] = [];
    for(const currentUser of input.usersPay){
      const user = await this.userService.findById(`${currentUser.user}`);
      user.password = '';
      const discounts : any[] = [];
      const checks : any[] = [];

      for(const currentDiscount of currentUser.discounts){
        const discount = await this.discountService.findById(`${currentDiscount}`)
        discounts.push(discount);
      }
      for(const currentCheck of currentUser.checks){
        const check = await this.checkService.findById(`${currentCheck}`)
        checks.push(check);
      }

      allUsersData.push({
        user,
        totalPay: currentUser.totalPay,
        hoursWorked: currentUser.hoursWorked,
        discounts,
        checks
      })
    } 
    return allUsersData
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

@Resolver('ShowReportByIdResult')
export class ShowReportByIdResultResolver {
  @ResolveField()
  __resolveType(obj) {
    if (obj instanceof ShowReportByIdSuccess) {
      return 'ShowReportByIdSuccess';
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
