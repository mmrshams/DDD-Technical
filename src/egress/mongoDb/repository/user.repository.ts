import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserSchema } from "../schema/user.schema";
import * as bcrypt from "bcrypt"


// TODO: improve it
export class UserRepository {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserSchema>,
  ) { }
  private saltRounds = 10
  async create(data: UserSchema): Promise<any> {
    const hashedPassword = await bcrypt.hash(data.password, this.saltRounds);
    const userInstance = new this.userModel({ ...data, password: hashedPassword })
    const result = await userInstance.save()
    result.toJSON()
    return result.toJSON()
  }

  async get(query) {
    return this.userModel.find(query).exec()
  }

  async getById(id) {
    return this.userModel.findOne({ uuid: id })
  }

  async getByUsername(username) {
    return this.userModel.findOne({ username })
  }

  async replace(id, data, version) {
    const instance = await this.getById(id)
    if (version !== instance.__v) {
      throw new Error('Invalid Version')
    }
    return this.userModel.replaceOne({ uuid: id }, { ...data, __v: ++instance.__v })
  }

  async doesExists(username: string): Promise<boolean> {
    const dbResult = await this.getByUsername(username)
    return !!dbResult;
  }

}