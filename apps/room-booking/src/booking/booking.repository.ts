import { GenericRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './models';

@Injectable()
export class RoomBookingRepository extends GenericRepository<Booking> {
  protected readonly logger = new Logger(RoomBookingRepository.name);
  constructor(
    @InjectModel(Booking.name)
    bookingModel: Model<Booking>,
  ) {
    super(bookingModel);
  }
}
