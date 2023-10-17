import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@Schema()
@ObjectType({ isAbstract: true })
export class BaseDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  @Field(() => String)
  _id: Types.ObjectId;
}
