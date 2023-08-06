"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.RespuestaSuccess = exports.IQuery = exports.CreateNewUserSuccess = exports.IMutation = exports.BadLoginTypeError = exports.InvalidInputError = exports.InternalError = exports.CreateUserInput = exports.Role = void 0;
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
    Role["SUPER_USER"] = "SUPER_USER";
})(Role || (exports.Role = Role = {}));
class CreateUserInput {
}
exports.CreateUserInput = CreateUserInput;
class InternalError {
}
exports.InternalError = InternalError;
class InvalidInputError {
}
exports.InvalidInputError = InvalidInputError;
class BadLoginTypeError {
}
exports.BadLoginTypeError = BadLoginTypeError;
class IMutation {
}
exports.IMutation = IMutation;
class CreateNewUserSuccess {
}
exports.CreateNewUserSuccess = CreateNewUserSuccess;
class IQuery {
}
exports.IQuery = IQuery;
class RespuestaSuccess {
}
exports.RespuestaSuccess = RespuestaSuccess;
class User {
}
exports.User = User;
//# sourceMappingURL=graphql.js.map