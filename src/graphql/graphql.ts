
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPER_USER = "SUPER_USER"
}

export class CreateUserInput {
    name: string;
}

export interface Error {
    message: string;
}

export class InternalError implements Error {
    __typename?: 'InternalError';
    message: string;
}

export class InvalidInputError implements Error {
    __typename?: 'InvalidInputError';
    message: string;
}

export class BadLoginTypeError implements Error {
    __typename?: 'BadLoginTypeError';
    message: string;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createNewUser(user?: Nullable<CreateUserInput>): Nullable<CreateNewUserResult> | Promise<Nullable<CreateNewUserResult>>;
}

export class CreateNewUserSuccess {
    __typename?: 'CreateNewUserSuccess';
    user?: Nullable<User>;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract showDialog(men?: Nullable<string>): Nullable<RespuestaSuccess> | Promise<Nullable<RespuestaSuccess>>;
}

export class RespuestaSuccess {
    __typename?: 'RespuestaSuccess';
    res?: Nullable<string>;
}

export class User {
    __typename?: 'User';
    _id?: Nullable<string>;
    name?: Nullable<string>;
    role?: Nullable<Nullable<Role>[]>;
}

export type CreateNewUserResult = CreateNewUserSuccess | InternalError | InvalidInputError;
type Nullable<T> = T | null;
