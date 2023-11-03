import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class UserSchema {
  constructor(username, password, uuid) {
    this.username = username;
    this.password = password;
    this.uuid = uuid;
  }
  @Prop({ unique: true })
  username: string;

  // hash password
  @Prop()
  password: string;

  @Prop({ unique: true })
  uuid: string;
}

export type UserDocument = HydratedDocument<UserSchema>;
export const UserModel = SchemaFactory.createForClass(UserSchema);
