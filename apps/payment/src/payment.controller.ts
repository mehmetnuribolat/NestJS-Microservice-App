import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentCreationChargeDto } from './dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('create-payment-charge')
  @UsePipes(new ValidationPipe())
  createPayment(@Payload() data: PaymentCreationChargeDto) {
    return this.paymentService.createPaymentCharge(data);
  }
}
