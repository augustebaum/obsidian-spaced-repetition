import { DomainEvents } from "src/domain/core/events/DomainEvents";
import { IHandle } from "src/domain/core/events/IHandle";

import { CardReviewedEvent } from "src/domain/events/CardReviewedEvent";
import { UpdateCardReviewStats } from "src/domain/useCases/updateCardReviewStats/UpdateCardReviewStats";

export class AfterCardReviewed implements IHandle<CardReviewedEvent> {
  private updateCardReviewStats: UpdateCardReviewStats;

  constructor(updateCardReviewStats: UpdateCardReviewStats) {
    this.setupSubscriptions();
    this.updateCardReviewStats = updateCardReviewStats;
  }

  setupSubscriptions (): void {
    DomainEvents.register(this.onCardReviewedEvent.bind(this), CardReviewedEvent.name);
  }

  private async onCardReviewedEvent (event: CardReviewedEvent): Promise<void> {
    const { card, reviewRating } = event;

    this.updateCardReviewStats.execute({ card, reviewRating })
      .then((r) => console.log(r))
      .catch((err) => console.log(err));
  }
}