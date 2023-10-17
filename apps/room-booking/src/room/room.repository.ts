import { GenericRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './models';

@Injectable()
export class RoomRepository extends GenericRepository<Room> {
  protected readonly logger = new Logger(RoomRepository.name);
  constructor(
    @InjectModel(Room.name)
    roomModel: Model<Room>,
  ) {
    super(roomModel);
  }
}
