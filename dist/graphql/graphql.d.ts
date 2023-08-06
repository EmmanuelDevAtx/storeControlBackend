export declare enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPER_USER = "SUPER_USER"
}
export declare class CreateUserInput {
    name: string;
}
export interface Error {
    message: string;
}
export declare class InternalError implements Error {
    __typename?: 'InternalError';
    message: string;
}
export declare class InvalidInputError implements Error {
    __typename?: 'InvalidInputError';
    message: string;
}
export declare class BadLoginTypeError implements Error {
    __typename?: 'BadLoginTypeError';
    message: string;
}
export declare abstract class IMutation {
    __typename?: 'IMutation';
    abstract createNewUser(user?: Nullable<CreateUserInput>): Nullable<CreateNewUserResult> | Promise<Nullable<CreateNewUserResult>>;
}
export declare class CreateNewUserSuccess {
    __typename?: 'CreateNewUserSuccess';
    user?: Nullable<User>;
}
export declare abstract class IQuery {
    __typename?: 'IQuery';
    abstract showDialog(men?: Nullable<string>): Nullable<RespuestaSuccess> | Promise<Nullable<RespuestaSuccess>>;
}
export declare class RespuestaSuccess {
    __typename?: 'RespuestaSuccess';
    res?: Nullable<string>;
}
export declare class User {
    __typename?: 'User';
    _id?: Nullable<string>;
    name?: Nullable<string>;
    role?: Nullable<Nullable<Role>[]>;
}
export type CreateNewUserResult = CreateNewUserSuccess | InternalError | InvalidInputError;
type Nullable<T> = T | null;
export {};
