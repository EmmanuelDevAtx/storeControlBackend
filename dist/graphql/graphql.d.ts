export declare abstract class IQuery {
    __typename?: 'IQuery';
    abstract showDialog(men?: Nullable<string>): Nullable<RespuestaSuccess> | Promise<Nullable<RespuestaSuccess>>;
}
export declare class RespuestaSuccess {
    __typename?: 'RespuestaSuccess';
    res?: Nullable<string>;
}
type Nullable<T> = T | null;
export {};
