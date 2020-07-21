"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../models/User"));
var UsersRepository = /** @class */ (function () {
    function UsersRepository() {
        this.users = [];
    }
    UsersRepository.prototype.findById = function (id) {
        return this.users.findIndex(function (user) { return user.id === id; });
    };
    UsersRepository.prototype.all = function () {
        return this.users;
    };
    UsersRepository.prototype.create = function (_a) {
        var name = _a.name, participation = _a.participation;
        var user = new User_1.default({ id: null, name: name, participation: participation });
        this.users.push(user);
        return user;
    };
    UsersRepository.prototype.update = function (_a) {
        var id = _a.id, name = _a.name, participation = _a.participation, userIndex = _a.userIndex;
        var user = new User_1.default({ id: id, name: name, participation: participation });
        this.users[userIndex] = user;
        return user;
    };
    UsersRepository.prototype.delete = function (userIndex) {
        this.users.splice(userIndex, 1);
    };
    return UsersRepository;
}());
exports.default = UsersRepository;
