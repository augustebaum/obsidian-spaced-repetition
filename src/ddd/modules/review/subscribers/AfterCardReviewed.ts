import { DomainEvents } from "src/domain/core/events/DomainEvents";
import { IHandle } from "src/domain/core/events/IHandle";

import { CardReviewedEvent } from "src/domain/events/CardReviewedEvent";

import { ReviewCard } from "src/domain/useCases/ReviewCard/ReviewCard";

export class AfterCardReviewed implements IHandle<CardReviewedEvent> {
  private reviewCard: ReviewCard;

  constructor(reviewCard: ReviewCard) {
    this.setupSubscriptions();
    this.reviewCard = reviewCard;
  }

  setupSubscriptions (): void {
    DomainEvents.register(this.onCardReviewedEvent.bind(this), CardReviewedEvent.name);
  }

  private async onCardReviewedEvent (event: CardReviewedEvent): Promise<void> {
    const { card, reviewRating } = event;

    this.reviewCard.execute({ card, reviewRating })
      .then((r) => console.log(r))
      .catch((err) => console.log(err));
  }
}