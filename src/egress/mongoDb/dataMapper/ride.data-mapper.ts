import { Injectable } from "@nestjs/common";
import { DataMapperInterface } from "src/egress/mongoDb/interface/data-mapper.interface";
import { Ride } from "src/domain/travel/ride";
import { RideSchema as RideSchema } from "../schema/ride.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";



/**
 * Personally I prefer to persist data in document based persistance per aggregate
 * but there is more than on way to persist data 
 */
@Injectable()
export class RideDataMapper implements DataMapperInterface<RideSchema, Ride> {
  toDomain(rideSchema) {
    return Ride.create(rideSchema, rideSchema.uuid);
  }

  toDalEntity(ride: Ride) {
    return new RideSchema(ride.getSegments, ride.getCapacity, ride.uuid, ride.getTicket)
  }
}
