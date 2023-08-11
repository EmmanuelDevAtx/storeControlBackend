
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

export class CreateNewDiscountInput {
    description: string;
    amount: number;
}

export class FilterPagination {
    limit?: Nullable<number>;
    cursor?: Nullable<string>;
}

export class FilterShowUser {
    role?: Nullable<Nullable<Role>[]>;
}

export class FilterUsers {
    pagination?: Nullable<FilterPagination>;
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

    abstract createNewDiscount(input?: Nullable<CreateNewDiscountInput>): Nullable<CreateNewDiscountResult> | Promise<Nullable<CreateNewDiscountResult>>;
}

export class CreateNewUserSuccess {
    __typename?: 'CreateNewUserSuccess';
    user?: Nullable<User>;
}

export class CreateNewDiscountSuccess {
    __typename?: 'CreateNewDiscountSuccess';
    discount?: Nullable<Discount>;
}

export class Pagination {
    __typename?: 'Pagination';
    startCursor?: Nullable<string>;
    endCursor?: Nullable<string>;
    hasNext?: Nullable<boolean>;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract showUsers(filter?: Nullable<FilterUsers>, filterUser?: Nullable<FilterShowUser>): Nullable<ShowUsersResult> | Promise<Nullable<ShowUsersResult>>;

    abstract showUserById(id: string): Nullable<ShowUserByIdResult> | Promise<Nullable<ShowUserByIdResult>>;
}

export class ShowUsersSuccess {
    __typename?: 'ShowUsersSuccess';
    showUsersConnection?: Nullable<ShowUsersConnection>;
}

export class ShowUserByIdSuccess {
    __typename?: 'ShowUserByIdSuccess';
    user?: Nullable<User>;
}

export class User {
    __typename?: 'User';
    _id?: Nullable<string>;
    name?: Nullable<string>;
    role?: Nullable<Nullable<Role>[]>;
}

export class Discount {
    __typename?: 'Discount';
    description?: Nullable<string>;
    amount?: Nullable<number>;
}

export class ShowUsersConnection {
    __typename?: 'ShowUsersConnection';
    pageInfo?: Nullable<Pagination>;
    total?: Nullable<number>;
    edges?: Nullable<Nullable<User>[]>;
}

export type CreateNewUserResult = CreateNewUserSuccess | InternalError | InvalidInputError;
export type CreateNewDiscountResult = CreateNewDiscountSuccess | InternalError | InvalidInputError;
export type ShowUsersResult = ShowUsersSuccess | InvalidInputError | InternalError;
export type ShowUserByIdResult = ShowUserByIdSuccess | InvalidInputError | InternalError;
type Nullable<T> = T | null;
