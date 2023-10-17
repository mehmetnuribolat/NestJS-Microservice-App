import { Query, Resolver } from '@nestjs/graphql';
import { PaymentIntent } from './entities';
import { PaymentService } from './payment.service';
@Resolver(() => PaymentIntent)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Query(() => [PaymentIntent], { name: 'payments' })
  findAllPayments() {
    return this.paymentService.getAllPayments();
  }
}
