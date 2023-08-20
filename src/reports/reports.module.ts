import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsResolver } from './reports.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './entities/report.entity';
import { ReportsRepository } from './reports.repository';

@Module({

  imports:[
    MongooseModule.forFeature([
      {name: Report.name, schema: ReportSchema}
    ])
  ],

  providers: [
    ReportsResolver, 
    ReportsService,
    ReportsRepository
  ]
})
export class ReportsModule {}
