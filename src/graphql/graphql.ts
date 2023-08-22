
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

export class CreateAdimInput {
    name: string;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class CreateManyDiscountsInput {
    discounts?: Nullable<Nullable<CreateNewDiscountInput>[]>;
}

export class CreateNewDiscountInput {
    user?: Nullable<string>;
    description: string;
    amount: number;
}

export class CreateReportInput {
    amountPerHour?: Nullable<number>;
    usersPay?: Nullable<Nullable<UsersPayInput>[]>;
}

export class Checksinput {
    check?: Nullable<string>;
}

export class UsersPayInput {
    user?: Nullable<string>;
    total?: Nullable<number>;
    discounts?: Nullable<Nullable<CreateNewDiscountInput>[]>;
    checks?: Nullable<Nullable<Checksinput>[]>;
}

export class CreateManyChecksInput {
    user?: Nullable<string>;
    checks?: Nullable<Nullable<ChecksInput>[]>;
}

export class ChecksInput {
    startTime?: Nullable<Date>;
    endTime?: Nullable<Date>;
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

    abstract createManyDiscounts(input?: Nullable<CreateManyDiscountsInput>): Nullable<CreateManyDiscountsResult> | Promise<Nullable<CreateManyDiscountsResult>>;

    abstract createManyChecks(input?: Nullable<CreateManyChecksInput>): Nullable<CreateManyChecksResult> | Promise<Nullable<CreateManyChecksResult>>;

    abstract createAdmin(user?: Nullable<CreateAdimInput>): Nullable<CreateAdminResult> | Promise<Nullable<CreateAdminResult>>;

    abstract createReport(input?: Nullable<CreateReportInput>): Nullable<CreateReportResult> | Promise<Nullable<CreateReportResult>>;
}

export class CreateNewUserSuccess {
    __typename?: 'CreateNewUserSuccess';
    user?: Nullable<User>;
}

export class CreateNewDiscountSuccess {
    __typename?: 'CreateNewDiscountSuccess';
    discount?: Nullable<Discount>;
}

export class CreateManyDiscountsSuccess {
    __typename?: 'CreateManyDiscountsSuccess';
    discounts?: Nullable<Nullable<Discount>[]>;
}

export class CreateManyChecksSuccess {
    __typename?: 'CreateManyChecksSuccess';
    checks?: Nullable<Nullable<Check>[]>;
}

export class CreateAdminSuccess {
    __typename?: 'CreateAdminSuccess';
    user?: Nullable<User>;
}

export class CreateReportSuccess {
    __typename?: 'CreateReportSuccess';
    report?: Nullable<Report>;
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

    abstract showUserById(id?: Nullable<string>): Nullable<ShowUserByIdResult> | Promise<Nullable<ShowUserByIdResult>>;

    abstract showDicountById(id?: Nullable<string>): Nullable<ShowDicountByIdResult> | Promise<Nullable<ShowDicountByIdResult>>;

    abstract showCheckById(id?: Nullable<string>): Nullable<ShowCheckByIdResult> | Promise<Nullable<ShowCheckByIdResult>>;

    abstract login(email?: Nullable<string>, password?: Nullable<string>): Nullable<LoginResult> | Promise<Nullable<LoginResult>>;

    abstract showReportById(id?: Nullable<string>): Nullable<ShowReportByIdResult> | Promise<Nullable<ShowReportByIdResult>>;
}

export class ShowUsersSuccess {
    __typename?: 'ShowUsersSuccess';
    showUsersConnection?: Nullable<ShowUsersConnection>;
}

export class ShowUserByIdSuccess {
    __typename?: 'ShowUserByIdSuccess';
    user?: Nullable<User>;
}

export class ShowDicountByIdSuccess {
    __typename?: 'ShowDicountByIdSuccess';
    discount?: Nullable<Discount>;
}

export class ShowCheckByIdSuccess {
    __typename?: 'ShowCheckByIdSuccess';
    check?: Nullable<Check>;
}

export class LoginSuccess {
    __typename?: 'LoginSuccess';
    token?: Nullable<string>;
}

export class ShowReportByIdSuccess {
    __typename?: 'ShowReportByIdSuccess';
    report?: Nullable<Report>;
}

export class User {
    __typename?: 'User';
    _id?: Nullable<string>;
    name?: Nullable<string>;
    role?: Nullable<Nullable<Role>[]>;
}

export class Discount {
    __typename?: 'Discount';
    _id?: Nullable<string>;
    description?: Nullable<string>;
    amount?: Nullable<number>;
    user?: Nullable<User>;
}

export class Check {
    __typename?: 'Check';
    _id?: Nullable<string>;
    user?: Nullable<User>;
    startTime?: Nullable<Date>;
    endTime?: Nullable<Date>;
}

export class Report {
    __typename?: 'Report';
    _id?: Nullable<string>;
    owner?: Nullable<User>;
    amountPerHour?: Nullable<number>;
    dateCreated?: Nullable<Date>;
    usersPay?: Nullable<Nullable<UsersPayInformation>[]>;
}

export class UsersPayInformation {
    __typename?: 'UsersPayInformation';
    user?: Nullable<User>;
    total?: Nullable<number>;
    discounts?: Nullable<Nullable<Discount>[]>;
    checks?: Nullable<Nullable<Check>[]>;
}

export class ShowUsersConnection {
    __typename?: 'ShowUsersConnection';
    pageInfo?: Nullable<Pagination>;
    total?: Nullable<number>;
    edges?: Nullable<Nullable<User>[]>;
}

export type CreateNewUserResult = CreateNewUserSuccess | InternalError | InvalidInputError;
export type CreateNewDiscountResult = CreateNewDiscountSuccess | InternalError | InvalidInputError;
export type CreateManyDiscountsResult = CreateManyDiscountsSuccess | InternalError | InvalidInputError;
export type CreateManyChecksResult = CreateManyChecksSuccess | InternalError | InvalidInputError;
export type CreateAdminResult = CreateAdminSuccess | InternalError | InvalidInputError;
export type CreateReportResult = CreateReportSuccess | InternalError | InvalidInputError;
export type ShowUsersResult = ShowUsersSuccess | InvalidInputError | InternalError;
export type ShowUserByIdResult = ShowUserByIdSuccess | InvalidInputError | InternalError;
export type ShowDicountByIdResult = ShowDicountByIdSuccess | InvalidInputError | InternalError;
export type ShowCheckByIdResult = ShowCheckByIdSuccess | InvalidInputError | InternalError;
export type LoginResult = LoginSuccess | InvalidInputError | InternalError;
export type ShowReportByIdResult = ShowReportByIdSuccess | InvalidInputError | InternalError;
type Nullable<T> = T | null;
