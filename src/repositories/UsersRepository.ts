import User from '../models/User';

interface CreateUserDTO {
  name: Object;
  participation: Number;
}

interface UpdateUserDTO {
  id: any;
  name: Object;
  participation: Number;
  userIndex: any;
}

class UsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public findById(id: string) {
    return this.users.findIndex((user: any) => user.id === id);
  }

  public all() {
    return this.users;
  }

  public create({ name, participation }: CreateUserDTO) {
    const user = new User({ id: null, name, participation });

    this.users.push(user);

    return user;
  }

  public update({ id, name, participation, userIndex }: UpdateUserDTO): User {
    const user = new User({ id, name, participation });

    this.users[userIndex] = user;

    return user;
  }

  public delete(userIndex: any) {
    this.users.splice(userIndex, 1);
  }
}

export default UsersRepository;
