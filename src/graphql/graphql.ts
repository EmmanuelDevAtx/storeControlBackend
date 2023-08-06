
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract showDialog(men?: Nullable<string>): Nullable<RespuestaSuccess> | Promise<Nullable<RespuestaSuccess>>;
}

export class RespuestaSuccess {
    __typename?: 'RespuestaSuccess';
    res?: Nullable<string>;
}

type Nullable<T> = T | null;
