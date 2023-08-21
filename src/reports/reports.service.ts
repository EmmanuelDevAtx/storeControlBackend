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

    const usersPayInformation: any[] = [];
    for (const user of input.usersPay) {
      const currentUser = await this.usersService.findById(user.user);
      const discounts = await this.discountsService.createManyDiscounts({ discounts: user.discounts });
      const totalAmount = discounts.reduce((total: number, currentValue: any) => total + currentValue.amount, 0);
  
      usersPayInformation.push({
        user: currentUser._id,
        discounts: discounts.map((item: any) => item._id),
        total: totalAmount
      });
    }
    const variables:any = {
      owner: owner._id,
      amountPerHour: input.amountPerHour,
      dateCreated: new Date(),
      usersPay: usersPayInformation
    }
    return await this.repository.create(variables);
  }

}
