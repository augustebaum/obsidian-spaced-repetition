import { IDomainEvent } from "src/ddd/core/domain/events/IDomainEvent";
import { UniqueEntityId } from "src/ddd/core/domain/UniqueEntityId";

import { Card } from "../Card";
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