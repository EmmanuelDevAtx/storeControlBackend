import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/crud.service';
import { Check } from './entities/check.entity';
import { ChecksRepository } from './checks.repository';
import { ConfigService } from '@nestjs/config';
import { ChecksInput, CreateManyChecksInput } from 'src/graphql/graphql';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChecksService extends CrudService<Check>{

  constructor(
    readonly repository: ChecksRepository,
    readonly configService: ConfigService,
    readonly userService: UsersService,
  ){
    super(repository, 'CheckService', configService)
  }

  async createManyChecks(input: CreateManyChecksInput) {

    if(! await this.userService.findById(input.user)) throw new Error('User not found')
    
    const checks: any[] = []
    input.checks.map((item: ChecksInput)=>{
      checks.push({
        user: input.user,
        startTime: item.startTime,
        endTime: item.endTime,
        isActive: true
      })
    })
    
    return await this.repository.createMany(checks);
  }

}
