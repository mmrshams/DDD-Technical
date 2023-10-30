import { Entity } from 'src/domain/common/entity.abstract';

export type CreateUserProps = {
  username: string;
  password: string;
};

export class User extends Entity {
  private username: string;
  private password: string;

  private constructor({ username, password }: CreateUserProps, uuid?: string) {
    super(uuid);
    (this.username = username), (this.password = password);
  }

  get getUsername() {
    return this.username;
  }

  /**[NOTE]: hash password later */
  get getPassword() {
    return this.password;
  }

  public static create(data: CreateUserProps, uuid?: string) {
    return new User(data, uuid);
  }
}
