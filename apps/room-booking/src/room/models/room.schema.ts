import { BaseDocument } from '@app/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoomSpecs } from './room-specs.schema';
import mongoose from 'mongoose';

@Schema({ versionKey: false })
@ObjectType()
export class Room extends BaseDocument {
  @Prop({ index: true, required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  description: string;

  @Prop({ required: true })
  @Field()
  type: string;

  @Prop({ required: true })
  @Field()
  roomNumber: number;

  @Prop({ required: true })
  @Field()
  floor: string;

  @Prop({ required: true })
  @Field()
  capacity: number;

  @Prop({ required: true, default: true })
  @Field()
  isBooked: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomSpecs',
    required: false,
  })
  @Field()
  roomSpecs: RoomSpecs;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
