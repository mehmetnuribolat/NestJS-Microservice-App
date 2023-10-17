import { BaseDocument, User } from '@app/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Room } from '../../room/models/room.schema';

@Schema({ versionKey: false })
@ObjectType()
export class Booking extends BaseDocument {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  @Field()
  user: User;

  @Prop({ required: true })
  @Field()
  startDate: Date;

  @Prop({ required: true })
  @Field()
  endDate: Date;

  @Prop({ required: true })
  @Field()
  invoiceId: string;

  // @Prop({ required: true })
  // @Field()
  // startHour: number;

  // @Prop({ required: true })
  // @Field()
  // duration: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  })
  @Field()
  room: Room;

  @Prop({ required: true })
  @Field()
  createDate: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
