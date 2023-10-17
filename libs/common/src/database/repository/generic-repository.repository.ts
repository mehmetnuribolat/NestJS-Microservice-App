import { BaseDocument } from '../models';
import { Logger, NotFoundException } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';
import { CreateIndexesOptions } from 'mongodb';

export abstract class GenericRepository<TDocument extends BaseDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const item = await this.model.findOne(filterQuery, {}, { lean: true });
    if (!item) {
      this.logger.warn('Document not found', filterQuery);
      throw new NotFoundException('Document Not Found!');
    }
    return item as TDocument;
  }

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const newDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    const documentToReturn = (
      await newDocument.save()
    ).toJSON() as unknown as TDocument;
    return documentToReturn;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ) {
    const updatedDocument = await this.model.findOneAndUpdate(
      filterQuery,
      update,
      {
        lean: true,
        new: true,
      },
    );

    if (!updatedDocument) {
      this.logger.warn('Document not found to update', filterQuery);
      throw new NotFoundException('Document Not Found!');
    }

    return updatedDocument;
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }
}
