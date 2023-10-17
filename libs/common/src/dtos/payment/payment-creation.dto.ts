import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CreditCardDto } from './credit-card.dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaymentCreationDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreditCardDto)
  @Field(() => CreditCardDto)
  card: CreditCardDto;

  @IsNumber()
  @Field()
  amount: number;
}
