import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReportsService } from './reports.service';

@Resolver('Report')
export class ReportsResolver {
  constructor(private readonly reportsService: ReportsService) {}


}
