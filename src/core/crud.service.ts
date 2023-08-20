import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CrudRepository } from './crud.repository';
import { DeepPartial } from './types/deep-partial';
import {
  DatabaseException,
  ERROR_CREATING_DOCUMENT,
  ERROR_CREATING_DOCUMENTS,
  ERROR_UPDATING_DOCUMENT,
  ERROR_UPDATING_DOCUMENTS,
  ERROR_DELETING_DOCUMENT,
  ERROR_DELETING_DOCUMENTS,
  ERROR_RETRIEVING_DOCUMENTS,
  ERROR_FINDING_DOCUMENT,
} from './errors/database-errors';
import { PaginatedEntities } from './types/paginated-entities';
import { FindAllQuery } from './dto/query/find-all-query.dto';


export abstract class CrudService<T> {
  protected logger: Logger;

  constructor(
    protected readonly repository: CrudRepository<T>,
    protected readonly name: string,
    protected readonly config: ConfigService,
  ) {
    this.logger = new Logger(`${name}Service`);
  }

  async findAll(query: FindAllQuery, filter?:any): Promise<PaginatedEntities<T>> {
    try {
      return await this.repository.findAll(query, filter);
    } catch (e) {
      this.logger.error(e);
      throw new DatabaseException(ERROR_RETRIEVING_DOCUMENTS(this.name));
    }
  }

  async findById(
    id: string,
    options?: {
      populateFields?: string;
      selectPopulatedFields?: string;
      selectFields?: string;
    },
  ): Promise<T> {
    try {
      if (!id) {
        throw new BadRequestException('No proper ID provided');
      }
      return this.repository.findById(id, options);
    } catch (e) {
      if (e instanceof NotFoundException || e instanceof BadRequestException) {
        throw e;
      } else {
        throw new DatabaseException(ERROR_FINDING_DOCUMENT(this.name, e));
      }
    }
  }

  async findOne(
    query: any,
    options?: {
      populateFields?: string[];
      selectPopulatedFields?: string;
      selectFields?: string;
    },
  ): Promise<T> {
    try {
      if (!query) {
        throw new BadRequestException('No query provided');
      }
      return this.repository.findOne(query, options);
    } catch (e) {
      if (e instanceof NotFoundException || e instanceof BadRequestException) {
        throw e;
      } else {
        throw new DatabaseException(ERROR_FINDING_DOCUMENT(this.name));
      }
    }
  }

  async find(query: any): Promise<PaginatedEntities<T>> {
    try {
      if (!query) {
        throw new BadRequestException('No query provided');
      }
      return this.repository.findAll(query);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      } else {
        throw new DatabaseException(ERROR_FINDING_DOCUMENT(this.name));
      }
    }
  }

  async create(item: T): Promise<T> {
    try {
      return await this.repository.create(item);
    } catch (e) {
      this.logger.error(e);
      if (e instanceof BadRequestException) {
        throw e;
      }
      console.log(e);
      throw new DatabaseException(ERROR_CREATING_DOCUMENT(this.name));
    }
  }

  async createMany(items: Array<DeepPartial<T>>): Promise<T[]> {
    if (items.length === 0) {
      throw new BadRequestException(
        ERROR_CREATING_DOCUMENTS(this.name, 'specified item list is empty'),
      );
    }
    try {
      return await this.repository.createMany(items);
    } catch (e) {
      this.logger.error(e);
      throw new DatabaseException(ERROR_CREATING_DOCUMENTS(this.name));
    }
  }

  async update(id: string, item: any, options?: any): Promise<T> {
    await this.repository.findById(id);
    try {
      return await this.repository.update(id, item, options);
    } catch (e) {
      this.logger.error(e);
      throw new DatabaseException(ERROR_UPDATING_DOCUMENT(this.name));
    }
  }

  async updateMany(conditions: any, item: DeepPartial<T>, options: any | null): Promise<T[]> {
    try {
      return await this.repository.updateMany(conditions, item, options);
    } catch (e) {
      this.logger.error(e);
      throw new DatabaseException(ERROR_UPDATING_DOCUMENTS(this.name));
    }
  }

  async delete(id: string): Promise<any> {
    await this.repository.findById(id);
    try {
      return await this.repository.delete(id);
    } catch (e) {
      this.logger.error(e);
      throw new DatabaseException(ERROR_DELETING_DOCUMENT(this.name));
    }
  }

  async deleteMany(condition: any): Promise<{ affected: number }> {
    try {
      return await this.repository.deleteMany(condition);
    } catch (e) {
      this.logger.error(e);
      throw new DatabaseException(ERROR_DELETING_DOCUMENTS(this.name));
    }
  }

}
