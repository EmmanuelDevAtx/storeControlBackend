import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CrudService } from 'src/core/crud.service';
import { Report } from './entities/report.entity';
import { ReportsRepository } from './reports.repository';

@Injectable()
export class ReportsService extends CrudService<Report>{

  constructor(
    readonly repository: ReportsRepository,
    readonly configService: ConfigService
  ){
    super(repository, 'ConfigService', configService)
  }

  async createReport(createReportInput: any) {
    return 'This action adds a new report';
  }

}
