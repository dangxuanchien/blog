export type Nullable<T> = T | undefined | null | {};

export enum Order {
    asc = 'asc',
    desc = 'desc',
}

export type OrderBy<T> = {
    field: T;
    order: Order;
};

export type Option<T = string> = {
    name: string;
    value: T;
};
