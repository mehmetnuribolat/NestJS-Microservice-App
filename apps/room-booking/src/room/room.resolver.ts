import { Args, Query, Resolver } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { Room } from './models';

@Resolver(() => Room)
export class RoomResolver {
  constructor(private readonly roomService: RoomService) {}

  @Query(() => [Room], { name: 'availableRooms' })
  getAvailableRooms() {
    return this.roomService.getAvailableRooms();
  }

  @Query(() => Room, { name: 'room' })
  getRoomById(@Args('id', { type: () => String }) id: string) {
    return this.roomService.getRoomById(id);
  }
}
