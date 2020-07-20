import { Router } from 'express';
import { uuid } from 'uuidv4';

const usersRoutes = Router();
const users: any = [];

function setUser(name: string, participation: number) {
  const user = {
    id: uuid(),
    name,
    participation,
  };

  return user;
}

function validateUserId(request: any, response: any, next: any) {
  const { id } = request.params;

  const userIndex = users.findIndex((user: any) => user.id === id);

  if (userIndex < 0)
    return response.status(400).json({ message: 'User not found.' });

  request.userIndex = userIndex;
  return next();
}

function error(code: number, message: string, response: any) {
  return response.status(code).json({ message });
}

function validateUserBody(request: any, response: any, next: () => any) {
  const { name, participation } = request.body;

  if (!name) return error(400, 'Invalid Payload', response);

  if (!name.first) return error(400, 'First name field is required!', response);

  if (!name.last) return error(400, 'Last name field is required!', response);

  if (isNaN(participation))
    return error(400, 'Participation field is required!', response);

  return next();
}

usersRoutes.use('/:id', validateUserId, validateUserBody);

usersRoutes.get('/', (request, response) => response.json(users));

usersRoutes.post('/', (request, response) => {
  const { name, participation } = request.body;

  const user = setUser(name, participation);

  users.push(user);
  response.json(user);
});

usersRoutes.put('/:id', (request, response) => {
  const { userIndex } = request.params;
  const { name, participation } = request.body;

  const user = setUser(name, participation);

  users[userIndex] = user;

  return response.send(user);
});

usersRoutes.delete('/:id', (request, response) => {
  const { userIndex } = request.params;

  users.splice(userIndex, 1);

  return response.status(204).send();
});

export default usersRoutes;
