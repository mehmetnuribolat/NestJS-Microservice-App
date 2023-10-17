import { PaymentCreationDto } from '@app/common';
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';

@InputType()
export class CreateBookingDto {
  @IsString()
  @Field()
  userId: string;

  @IsString()
  @Field()
  roomId: string;

  @IsDate()
  @Type(() => Date)
  @Field()
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @Field()
  endDate: Date;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PaymentCreationDto)
  @Field(() => PaymentCreationDto)
  charge: PaymentCreationDto;
}
