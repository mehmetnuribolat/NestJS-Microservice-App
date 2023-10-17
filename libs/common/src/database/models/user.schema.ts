import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDocument } from './base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
@ObjectType()
export class User extends BaseDocument {
  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field()
  password: string;

  @Prop()
  @Field(() => [String])
  roles?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
