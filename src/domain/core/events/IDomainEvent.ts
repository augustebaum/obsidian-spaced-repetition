import { UniqueEntityId } from "src/domain/core/UniqueEntityId";

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId (): UniqueEntityId;
}
