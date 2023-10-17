import { PaymentCreationDto } from '@app/common';
import { IsEmail } from 'class-validator';

export class PaymentCreationChargeDto extends PaymentCreationDto {
  @IsEmail()
  email: string;
}
