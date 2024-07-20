import { DomainEvent } from "../events/domain-event";
import { DomainEvents } from "../events/domain-events";
import { Entity } from "./entity";

export class AggregateRoot<Props> extends Entity<Props> {}
