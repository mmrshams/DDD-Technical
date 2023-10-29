import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LabyrinthModel, LabyrinthSchema } from './mongoDb/schema/labyrinth.schema';
import { UserModel, UserSchema } from './mongoDb/schema/user.schema';
import { LabyrinthRepository } from './mongoDb/repository/labyrinth.repository';
import { UserDataMapper } from './mongoDb/dataMapper/user.data-mapper';
import { LabyrinthDataMapper } from './mongoDb/dataMapper/labyrinth.data-mapper';
import { UserRepository } from './mongoDb/repository/user.repository';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/ddd'),
    MongooseModule.forFeature([
      { name: LabyrinthSchema.name, schema: LabyrinthModel },
      { name: UserSchema.name, schema: UserModel }])
  ],
  controllers: [],
  providers: [LabyrinthRepository, LabyrinthDataMapper, UserRepository, UserDataMapper],
  exports: [LabyrinthRepository, LabyrinthDataMapper, UserRepository, UserDataMapper]
})
export class EgressModule { }
