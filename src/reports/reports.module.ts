import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateNewUserResultResolver, ReportUserPayResolver, ReportsResolver, ShowAllReportsResultResolver, ShowReportByIdResultResolver } from './reports.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './entities/report.entity';
import { ReportsRepository } from './reports.repository';
import { UsersModule } from 'src/users/users.module';
import { ChecksModule } from 'src/checks/checks.module';
import { DiscountsModule } from 'src/discounts/discounts.module';

@Module({

  imports:[
    MongooseModule.forFeature([
      {name: Report.name, schema: ReportSchema}
    ]),
    UsersModule,
    ChecksModule,
    DiscountsModule
  ],

  providers: [
    ReportsResolver, 
    ReportsService,
    ReportsRepository,

    CreateNewUserResultResolver,
    ShowReportByIdResultResolver,
    ReportUserPayResolver,
    ShowAllReportsResultResolver
  ]
})
export class ReportsModule {}
