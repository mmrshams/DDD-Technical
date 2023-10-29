import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RideRepository } from './mongoDb/repository/ride.repository';
import { RideSchema, RideModel } from './mongoDb/schema/ride.schema';
import { RideDataMapper } from './mongoDb/dataMapper/ride.data-mapper';

@Module({
  imports: [    
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/ddd'),
    MongooseModule.forFeature([{ name: RideSchema.name, schema: RideModel }])
  ],
  controllers: [],
  providers: [RideRepository, RideDataMapper],
  exports: [RideRepository, RideDataMapper]
})
export class EgressModule {}
