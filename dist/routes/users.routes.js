"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UsersRepository_1 = __importDefault(require("../repositories/UsersRepository"));
var usersRoutes = express_1.Router();
var usersRepository = new UsersRepository_1.default();
var userIndex = 0;
function error(code, message, response) {
    return response.status(code).json({ message: message });
}
function validateUserId(request, response, next) {
    var id = request.params.id;
    userIndex = usersRepository.findById(id);
    if (userIndex < 0)
        return error(400, 'User not found.', response);
    return next();
}
function validateUserBody(request, response, next) {
    var _a = request.body, name = _a.name, participation = _a.participation;
    if (!name)
        return error(400, 'Invalid Payload', response);
    if (!name.first)
        return error(400, 'First name field is required!', response);
    if (!name.last)
        return error(400, 'Last name field is required!', response);
    if (typeof participation !== 'number')
        return error(400, 'Participation field is required!', response);
    return next();
}
usersRoutes.get('/', function (request, response) {
    response.json(usersRepository.all());
});
usersRoutes.post('/', validateUserBody, function (request, response) {
    var _a = request.body, name = _a.name, participation = _a.participation;
    var user = usersRepository.create({ name: name, participation: participation });
    response.json(user);
});
usersRoutes.put('/:id', validateUserId, validateUserBody, function (request, response) {
    var id = request.params.id;
    var _a = request.body, name = _a.name, participation = _a.participation;
    var user = usersRepository.update({ id: id, name: name, participation: participation, userIndex: userIndex });
    return response.send(user);
});
usersRoutes.delete('/:id', validateUserId, function (request, response) {
    usersRepository.delete(userIndex);
    return response.status(204).send();
});
exports.default = usersRoutes;
