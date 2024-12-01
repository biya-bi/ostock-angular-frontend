import { Operation } from "../models/operation";

export interface EntityEvent<E> {
    entity: E;
    operation: Operation
    closeElement?: HTMLElement;
}