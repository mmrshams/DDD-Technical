import { Injectable } from '@nestjs/common';
import { DataMapperInterface } from 'src/egress/mongoDb/interface/data-mapper.interface';
import { UserSchema } from '../schema/user.schema';
import { User } from 'src/domain/labyrinth/user';

/**
 * Personally I prefer to persist data in document based persistance per aggregate
 * but there is more than on way to persist data
 */
@Injectable()
export class UserDataMapper implements DataMapperInterface<UserSchema, User> {
  toDomain(UserSchema) {
    return User.create(UserSchema, UserSchema.uuid);
  }

  toDalEntity(user: User) {
    return new UserSchema(user.getUsername, user.getPassword, user.uuid);
  }
}
