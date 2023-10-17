import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { Transport } from '@nestjs/microservices';
import { ServiceSettings } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: ServiceSettings.PAYMENT_SERVICE.queueName,
    },
  });

  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  await app.listen(configService.getOrThrow('PORT_HTTP'));
}
bootstrap();
