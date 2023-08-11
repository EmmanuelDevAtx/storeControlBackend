export declare enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPER_USER = "SUPER_USER"
}
export declare class CreateUserInput {
    name: string;
}
export declare class CreateNewDiscountInput {
    description: string;
    amount: number;
}
export declare class FilterPagination {
    limit?: Nullable<number>;
    cursor?: Nullable<string>;
}
export declare class FilterShowUser {
    role?: Nullable<Nullable<Role>[]>;
}
export declare class FilterUsers {
    pagination?: Nullable<FilterPagination>;
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
    abstract createNewDiscount(input?: Nullable<CreateNewDiscountInput>): Nullable<CreateNewDiscountResult> | Promise<Nullable<CreateNewDiscountResult>>;
}
export declare class CreateNewUserSuccess {
    __typename?: 'CreateNewUserSuccess';
    user?: Nullable<User>;
}
export declare class CreateNewDiscountSuccess {
    __typename?: 'CreateNewDiscountSuccess';
    discount?: Nullable<Discount>;
}
export declare class Pagination {
    __typename?: 'Pagination';
    startCursor?: Nullable<string>;
    endCursor?: Nullable<string>;
    hasNext?: Nullable<boolean>;
}
export declare abstract class IQuery {
    __typename?: 'IQuery';
    abstract showUsers(filter?: Nullable<FilterUsers>, filterUser?: Nullable<FilterShowUser>): Nullable<ShowUsersResult> | Promise<Nullable<ShowUsersResult>>;
    abstract showUserById(id: string): Nullable<ShowUserByIdResult> | Promise<Nullable<ShowUserByIdResult>>;
}
export declare class ShowUsersSuccess {
    __typename?: 'ShowUsersSuccess';
    showUsersConnection?: Nullable<ShowUsersConnection>;
}
export declare class ShowUserByIdSuccess {
    __typename?: 'ShowUserByIdSuccess';
    user?: Nullable<User>;
}
export declare class User {
    __typename?: 'User';
    _id?: Nullable<string>;
    name?: Nullable<string>;
    role?: Nullable<Nullable<Role>[]>;
}
export declare class Discount {
    __typename?: 'Discount';
    description?: Nullable<string>;
    amount?: Nullable<number>;
}
export declare class ShowUsersConnection {
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
export {};
