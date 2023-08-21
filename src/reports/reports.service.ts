import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CrudService } from 'src/core/crud.service';
import { Report } from './entities/report.entity';
import { ReportsRepository } from './reports.repository';
import { CreateNewDiscountInput, CreateReportInput, Discount, User, UsersPayInput } from 'src/graphql/graphql';
import { UsersService } from 'src/users/users.service';
import { ChecksService } from 'src/checks/checks.service';
import { DiscountsService } from 'src/discounts/discounts.service';

@Injectable()
export class ReportsService extends CrudService<Report>{

  constructor(
    readonly repository: ReportsRepository,
    readonly configService: ConfigService,
    readonly usersService: UsersService,
    readonly checksService: ChecksService,
    readonly discountsService: DiscountsService,
  ){
    super(repository, 'ConfigService', configService)
  }

  async createReport(input: CreateReportInput, owner: User) {

    const usersPayInformation:any[] = await input.usersPay.map(async (user: UsersPayInput)=>{
      const currentUser = await this.usersService.findById(user.user);
      const dicounts = await this.discountsService.createManyDiscounts({discounts: user.discounts});

      await Promise.all(dicounts)
      return {
          user: currentUser._id,
          dicounts: dicounts.map((item: any)=> {return item._id}),
          total:10
      }
    })

    await Promise.all(usersPayInformation)
    console.log('users information',usersPayInformation)

    return 'This action adds a new report';
  }

}
