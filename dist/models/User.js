"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4_1 = require("uuidv4");
var User = /** @class */ (function () {
    function User(_a) {
        var id = _a.id, name = _a.name, participation = _a.participation;
        this.id = id || uuidv4_1.uuid();
        this.name = name;
        this.participation = participation;
    }
    return User;
}());
exports.default = User;
