"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowUsersConnection = exports.User = exports.ShowUserByIdSuccess = exports.ShowUsersSuccess = exports.IQuery = exports.Pagination = exports.CreateNewUserSuccess = exports.IMutation = exports.BadLoginTypeError = exports.InvalidInputError = exports.InternalError = exports.FilterUsers = exports.FilterShowUser = exports.FilterPagination = exports.CreateUserInput = exports.Role = void 0;
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
    Role["SUPER_USER"] = "SUPER_USER";
})(Role || (exports.Role = Role = {}));
class CreateUserInput {
}
exports.CreateUserInput = CreateUserInput;
class FilterPagination {
}
exports.FilterPagination = FilterPagination;
class FilterShowUser {
}
exports.FilterShowUser = FilterShowUser;
class FilterUsers {
}
exports.FilterUsers = FilterUsers;
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
class Pagination {
}
exports.Pagination = Pagination;
class IQuery {
}
exports.IQuery = IQuery;
class ShowUsersSuccess {
}
exports.ShowUsersSuccess = ShowUsersSuccess;
class ShowUserByIdSuccess {
}
exports.ShowUserByIdSuccess = ShowUserByIdSuccess;
class User {
}
exports.User = User;
class ShowUsersConnection {
}
exports.ShowUsersConnection = ShowUsersConnection;
//# sourceMappingURL=graphql.js.map