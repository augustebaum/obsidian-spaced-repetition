import { IDomainEvent } from "src/domain/core/events/IDomainEvent";
import { UniqueEntityId } from "src/domain/core/UniqueEntityId";

import { Card } from "src/domain/Card";
import { CardReviewRating } from "../CardReviewRating";

export class CardReviewedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public card: Card;
  public reviewRating: CardReviewRating;

  constructor(card: Card, reviewRating: CardReviewRating) {
    this.dateTimeOccurred = new Date();
    this.card = card;
    this.reviewRating = reviewRating;
  }

  getAggregateId (): UniqueEntityId {
    return this.card.id;
  }
}