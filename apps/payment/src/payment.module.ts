import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { paymentValidationSchema } from './validation-schema';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { LoggerModule, ServiceSettings } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentResolver } from './payment.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: paymentValidationSchema,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name: ServiceSettings.NOTIFICATION_SERVICE.serviceName,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: ServiceSettings.NOTIFICATION_SERVICE.queueName,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentResolver],
})
export class PaymentModule {}
