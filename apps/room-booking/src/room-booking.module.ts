import { Module } from '@nestjs/common';
import { DatabaseModule, HealthCheckModule, LoggerModule } from '@app/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import {
  Booking,
  BookingSchema,
  Room,
  RoomSchema,
  RoomSpecs,
  RoomSpecsSchema,
} from './booking/models';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Room.name, schema: RoomSchema },
      { name: RoomSpecs.name, schema: RoomSpecsSchema },
    ]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    BookingModule,
    RoomModule,
    LoggerModule,
    HealthCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class RoomBookingModule {}
