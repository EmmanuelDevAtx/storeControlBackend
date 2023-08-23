import { NotFoundException, Logger } from '@nestjs/common';
import mongoose, { Model, ObjectId } from 'mongoose';
import { DeepPartial } from './types/deep-partial';
import { PaginatedEntities } from './types/paginated-entities';
import { FindAllQuery } from './dto/query/find-all-query.dto';
import { ERROR_FINDING_DOCUMENT } from './errors/database-errors';
import { Status } from './entities/status';
import { transformInsensitiveQuery } from 'src/helper/db.helper';

export const PAGE_SIZE_LIMIT = 15;

export abstract class CrudRepository<T> {
  protected readonly logger: Logger;

  constructor(protected readonly model: Model<T>, protected name: string) {
    this.logger = new Logger(`${name}Repository`);
    this.model = model;
  }

  async findAll(query?: FindAllQuery, findItems?:any): Promise<PaginatedEntities<T>> {
    try {
      
      const querieData = query.pagination?.cursor
      ? {...findItems,  _id: { $gt: query.pagination.cursor } }
      : findItems
      const newQuery = query;
      const pageSize = query.pagination?.limit || PAGE_SIZE_LIMIT;
      console.log('Querie data', querieData)
      const results = await this.model
        .find(querieData)
        .limit(pageSize)
        .select(newQuery.fields)
        .populate(newQuery.populate)
        .sort(newQuery.sort || { _id: 1 })
        .exec();
      const total = await this.model.find(querieData).count().exec();
      const items = results.map((r) => (r as any).toObject());

      return {
        items: items,
        total: total,
        startCursor: items[0] ? items[0]._id : undefined,
        endCursor: items.length > 0 ? items[items.length - 1]._id : undefined,
        hasNext: items.length >= pageSize,
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async findById(
    id: string,
    options: {
      populateFields?: string;
      selectPopulatedFields?: string;
      selectFields?: string;
    } = {
      populateFields: '',
      selectPopulatedFields: '',
      selectFields: '',
    },
  ): Promise<T> {
    const oid = new mongoose.Types.ObjectId(id);
    const item: any = !!options.populateFields
      ? await this.model
          .findById(oid)
          .populate(options.populateFields.split(',').map((el) => ({ path: el })))
          .select(options.selectFields)
          .exec()
      : await this.model.findById(id).select(options.selectFields).exec();
    if (!item) {
      throw new NotFoundException(
        ERROR_FINDING_DOCUMENT(this.name, `element with id ${id} not found`),
      );
    }
    return item.toObject() as T;
  }

  async findOne(
    query?: any,
    options: {
      populateFields?: string[];
      selectPopulatedFields?: string;
      selectFields?: string;
    } = {
      populateFields: [],
      selectPopulatedFields: '',
      selectFields: '',
    },
  ): Promise<T> {
    query = transformInsensitiveQuery(query);
    const item: any = !!options.populateFields
      ? await this.model
          .findOne(query as any)
          .populate(options.populateFields)
          .select(options.selectFields)
          .exec()
      : await this.model
          .findOne(query as any)
          .select(options.selectFields)
          .exec();
    if (!item) {
      throw new NotFoundException(ERROR_FINDING_DOCUMENT(this.name, `element not found`));
    }
    return !!item ? (item.toObject() as T) : undefined;
  }

  async create(item: T): Promise<T> {
    const createQuery = new this.model(item as unknown as T);
    const result = await createQuery.save();
    return result.toObject();
  }

  async createMany(items: Array<DeepPartial<T>>): Promise<T[]> {
    const results = await this.model.insertMany(items);
    // ! Possible performance hit from doing this
    return results.map((r) => r as unknown as T);
  }

  async update(id: string, item: DeepPartial<T>, options: any = {}): Promise<T> {
    const oid = new mongoose.Types.ObjectId(id);

    const result: any = await this.model
      .findByIdAndUpdate(oid, item, { new: true })
      .populate(options.populate)
      .exec();
    return result.toObject() as T;
  }

  async updateMany(conditions: any, item: DeepPartial<T>, options?: any | null): Promise<T[]> {
    const results = await this.model.updateMany(conditions, item as any, options).exec();
    return null;
  }

  async delete(id: string): Promise<boolean> {
    const oid = new mongoose.Types.ObjectId(id);
    await this.model.updateOne({ _id: oid }, { status: Status.DELETED }).exec();
    return true;
  }

  async deleteMany(condition: any): Promise<{ affected: number }> {
    const affected = await this.model.updateMany(condition, { status: Status.DELETED }).exec();
    return { affected: affected.modifiedCount };
  }
}
