import { Router } from 'express';

import UsersRepository from '../repositories/UsersRepository';

const usersRoutes = Router();
const usersRepository = new UsersRepository();
let userIndex: any = 0;

function error(code: number, message: string, response: any) {
  return response.status(code).json({ message });
}

function validateUserId(request: any, response: any, next: any) {
  const { id } = request.params;

  userIndex = usersRepository.findById(id);

  if (userIndex < 0) return error(400, 'User not found.', response);

  return next();
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

usersRoutes.get('/', (request, response) => {
  response.json(usersRepository.all());
});

usersRoutes.post('/', validateUserBody, (request, response) => {
  const { name, participation } = request.body;

  const user = usersRepository.create({ name, participation });

  response.json(user);
});

usersRoutes.put(
  '/:id',
  validateUserId,
  validateUserBody,
  (request, response) => {
    const { id } = request.params;
    const { name, participation } = request.body;

    const user = usersRepository.update({ id, name, participation, userIndex });

    return response.send(user);
  },
);

usersRoutes.delete('/:id', validateUserId, (request, response) => {
  usersRepository.delete(userIndex);

  return response.status(204).send();
});

export default usersRoutes;
