import { UseCase } from "src/domain/core/UseCase";

import { Card } from "src/domain/Card";
import { Deck } from "src/domain/Deck";
import { ICardRepo } from "src/domain/repos/ICardRepo";

export interface Request {
  decks: Deck[];
  onlyDueCards: boolean;
}

export type Response = Card[];

export class GetCardsForReview implements UseCase<Request, Promise<Response>> {
  private cardRepo: ICardRepo;

  constructor(cardRepo: ICardRepo) {
    this.cardRepo = cardRepo;
  }

  async execute (request: { decks: Deck[], onlyDueCards: boolean; }): Promise<Card[]> {
    const { decks, onlyDueCards } = request;

    let cards = await this.cardRepo.getByDecks(decks);

    if (onlyDueCards) {
      cards = cards.filter(Card.isDue);
    }

    return cards;
  }
}
