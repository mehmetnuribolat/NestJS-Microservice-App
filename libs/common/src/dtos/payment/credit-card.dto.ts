import { Field, InputType } from '@nestjs/graphql';
import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreditCardDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  cvc: string;

  @IsNumber()
  @Field()
  expiration_month: number;

  @IsNumber()
  @Field()
  expiration_year: number;

  @IsCreditCard()
  @Field()
  number: string;
}
