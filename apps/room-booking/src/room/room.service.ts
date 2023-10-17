import { Injectable } from '@nestjs/common';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService {
  constructor(private readonly roomRepository: RoomRepository) {}

  async getAvailableRooms() {
    return this.roomRepository.find({ isBooked: false });
  }

  async getRoomById(_id: string) {
    return this.roomRepository.findOne({ _id });
  }
}
