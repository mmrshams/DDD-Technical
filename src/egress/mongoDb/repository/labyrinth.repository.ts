import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";
import { LabyrinthSchema } from "../schema/labyrinth.schema";

// TODO: improve it
export class LabyrinthRepository {
  constructor(
    @InjectModel(LabyrinthSchema.name) private rideModel: Model<LabyrinthSchema>,
  ) { }
  async create(data: LabyrinthSchema): Promise<boolean> {
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
  
  async replace(id, data, version?) {
    const instance = await this.getById(id)
    if (version && version !== instance.__v) {
      throw new Error('Invalid Version')
    }
    return this.rideModel.replaceOne({ uuid: id }, { ...data, __v: ++instance.__v  })
  }

}