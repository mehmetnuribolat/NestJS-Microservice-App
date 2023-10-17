import { DatabaseModule, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { RoomSchema, Room, RoomSpecs, RoomSpecsSchema } from './models';
import { RoomService } from './room.service';
import { RoomRepository } from './room.repository';
import { RoomResolver } from './room.resolver';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: RoomSpecs.name, schema: RoomSpecsSchema },
    ]),
    LoggerModule,
  ],
  controllers: [],
  providers: [RoomService, RoomRepository, RoomResolver],
  exports: [RoomService, RoomRepository],
})
export class RoomModule {}
