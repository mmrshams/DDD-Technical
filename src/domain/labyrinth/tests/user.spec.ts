import { CreateUserProps, User } from '../user';

describe('User', () => {
  it('Should attributes of user will be qual to feed value when instantiated ', async () => {
    const feed: CreateUserProps = {
      username: 'username',
      password: 'password',
    };
    const user = User.create(feed);
    expect(user.getUsername).toEqual(feed.username);
    expect(user.getPassword).toEqual(feed.password);
  });
});
