import { ServiceSettings } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentCreationChargeDto } from './dto';

@Injectable()
export class PaymentService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-08-16',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(ServiceSettings.NOTIFICATION_SERVICE.serviceName)
    private readonly notificationService: ClientProxy,
  ) {}

  async createPaymentCharge(charge: PaymentCreationChargeDto) {
    //Payment with test card, we are not using card on request body
    const payment = await this.stripe.paymentIntents.create({
      amount: charge.amount,
      confirm: true,
      currency: 'usd',
      payment_method: 'pm_card_visa',
    });

    this.notificationService.emit('send_email_notification', {
      email: charge.email,
      message: `Your payment of ${charge.amount} has been completed successfully.`,
    });

    return payment;
  }

  async getAllPayments() {
    const payments = await this.stripe.paymentIntents.list();
    return payments.data;
  }
}
