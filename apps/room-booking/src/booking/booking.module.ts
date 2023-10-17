import { Module } from '@nestjs/common';
import {
  ServiceSettings,
  DatabaseModule,
  HealthCheckModule,
  LoggerModule,
} from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RoomModule } from '../room/room.module';
import { roomBookingValidationSchema } from './validation-schema';
import { Booking, BookingSchema } from './models';
import { RoomBookingService } from './booking.service';
import { RoomBookingRepository } from './booking.repository';
import { RoomBookingResolver } from './booking.resolver';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    RoomModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: roomBookingValidationSchema,
    }),
    ClientsModule.registerAsync([
      {
        name: ServiceSettings.AUTHENTICATION_SERVICE.serviceName,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: ServiceSettings.AUTHENTICATION_SERVICE.queueName,
          },
        }),
        inject: [ConfigService],
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: ServiceSettings.PAYMENT_SERVICE.serviceName,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: ServiceSettings.PAYMENT_SERVICE.queueName,
          },
        }),
        inject: [ConfigService],
      },
    ]),
    HealthCheckModule,
  ],
  controllers: [],
  providers: [RoomBookingService, RoomBookingRepository, RoomBookingResolver],
})
export class BookingModule {}
