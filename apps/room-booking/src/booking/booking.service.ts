import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ServiceSettings, User, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { RoomBookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/room-booking-creation.dto';
import { RoomRepository } from '../room/room.repository';

@Injectable()
export class RoomBookingService {
  constructor(
    private readonly roomBookingRepository: RoomBookingRepository,
    private readonly roomRepository: RoomRepository,
    @Inject(ServiceSettings.PAYMENT_SERVICE.serviceName)
    private readonly paymentsService: ClientProxy,
  ) {}

  async create(createBooking: CreateBookingDto, userdata: UserDto) {
    const room = await this.roomRepository.findOne({
      _id: createBooking.roomId,
    });

    if (!room) {
      throw new NotFoundException('Room is invalid!');
    }

    // return this.paymentsService
    //   .send('create-payment-charge', createBooking.charge)
    //   .pipe(
    //     map((res) => {
    //       console.log(res);

    //       return this.roomBookingRepository.create({
    //         startDate: createBooking.startDate,
    //         endDate: createBooking.endDate,
    //         user: userdata as User,
    //         room: room,
    //         invoiceId: res.id,
    //         createDate: new Date(),
    //       });
    //     }),
    //   );
  }

  async findAll() {
    return this.roomBookingRepository.find({});
  }

  async findOne(_id: string) {
    return this.roomBookingRepository.findOne({ _id });
  }

  // async update(_id: string, updateReservationDto: UpdateReservationDto) {
  //   return this.roomBookingRepository.findOneAndUpdate(
  //     { _id },
  //     { $set: updateReservationDto },
  //   );
  // }

  async remove(_id: string) {
    return this.roomBookingRepository.findOneAndDelete({ _id });
  }
}
