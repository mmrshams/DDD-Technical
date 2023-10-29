import { InjectModel } from "@nestjs/mongoose";
import { RideSchema, RideModel } from "../schema/ride.schema";
import { Model } from "mongoose";

// TODO: improve it
export class RideRepository {
  constructor(
    @InjectModel(RideSchema.name) private rideModel: Model<RideSchema>,
  ) { }
  async create(data: RideSchema): Promise<boolean> {
    const rideInstance = new this.rideModel(data)
    await rideInstance.save()
    return true
  }

  async get(query) {
    return this.rideModel.find().exec()
  }

  async getById(id) {
    return this.rideModel.findOne({ uuid: id })
  }

  async replace(id, data, version) {
    const instance = await this.getById(id)
    if (version !== instance.__v) {
      throw new Error('Invalid Version')
    }
    return this.rideModel.replaceOne({ uuid: id }, { ...data, __v: ++instance.__v  })
  }

}