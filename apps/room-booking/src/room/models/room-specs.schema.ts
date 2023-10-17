import { BaseDocument } from '@app/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
@ObjectType()
export class RoomSpecs extends BaseDocument {
  @Prop({ index: true, required: true })
  @Field()
  tv: boolean;

  @Prop({ required: true })
  @Field()
  ac: boolean;

  @Prop({ required: true })
  @Field()
  heater: string;
}

export const RoomSpecsSchema = SchemaFactory.createForClass(RoomSpecs);
