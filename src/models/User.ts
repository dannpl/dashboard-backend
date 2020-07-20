import { uuid } from 'uuidv4';

class User {
  id: any;

  name: Object;

  participation: Number;

  constructor({ id, name, participation }: User) {
    this.id = id || uuid();
    this.name = name;
    this.participation = participation;
  }
}

export default User;
