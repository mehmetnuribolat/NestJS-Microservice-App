import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, UserDto } from '@app/common';
import { RoomBookingService } from './booking.service';
import { Booking } from './models';
import { CreateBookingDto } from './dto/room-booking-creation.dto';

@Resolver(() => Booking)
export class RoomBookingResolver {
  constructor(private readonly roomBookingService: RoomBookingService) {}

  @Mutation(() => Booking)
  createBooking(
    @Args('createRoomBookingInput')
    createRoomBookingInput: CreateBookingDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.roomBookingService.create(createRoomBookingInput, user);
  }

  @Query(() => [Booking], { name: 'bookings' })
  findAll() {
    return this.roomBookingService.findAll();
  }

  @Query(() => Booking, { name: 'booking' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.roomBookingService.findOne(id);
  }

  @Mutation(() => Booking)
  cancelBooking(@Args('id', { type: () => String }) id: string) {
    return this.roomBookingService.remove(id);
  }
}
