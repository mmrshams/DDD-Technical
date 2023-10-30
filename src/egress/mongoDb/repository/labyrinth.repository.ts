import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { LabyrinthSchema } from '../schema/labyrinth.schema';

// TODO: improve it
export class LabyrinthRepository {
  constructor(
    @InjectModel(LabyrinthSchema.name)
    private labyrinthModel: Model<LabyrinthSchema>,
  ) {}
  async create(data: LabyrinthSchema): Promise<any> {
    const labyrinthInstance = new this.labyrinthModel(data);
    return labyrinthInstance.save();
  }

  async get(query) {
    return this.labyrinthModel.find(query).exec();
  }

  async getById(id) {
    return this.labyrinthModel.findOne({ uuid: id });
  }

  async getByIdAndUserId(id, userId) {
    return this.labyrinthModel.findOne({ uuid: id, userId });
  }

  async replace(id, data, version?) {
    const instance = await this.getById(id);
    if (version && version !== instance.__v) {
      throw new Error('Invalid Version');
    }
    const result = await this.labyrinthModel.replaceOne(
      { uuid: id },
      { ...data, __v: ++instance.__v },
    );
    return this.getById(id);
  }
}
