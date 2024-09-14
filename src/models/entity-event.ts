import { Operation } from "./operation";

export interface EntityEvent<E> {
    entity: E;
    operation: Operation
    closeElement?: HTMLElement;
}