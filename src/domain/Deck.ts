import { Entity } from "./core/Entity";
import { UniqueEntityId } from "./core/UniqueEntityId";

import { Card } from "./Card";

interface IDeckProps {
  name: string;
  cards: Card[];
  parent: Deck | null;
  subdecks: Deck[];
}

export class Deck extends Entity<IDeckProps> {
  private constructor(props: IDeckProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create (props: IDeckProps, id?: UniqueEntityId) {
    if (props.subdecks.some((deck) => deck === props.parent)) {
      throw new Error(`Parent deck ${props.parent} is also in children`);
    }
    return new Deck(props, id);
  }

  get cards (): Card[] {
    const cardsInSubDecks: Card[] = this.props.subdecks
      .flatMap((deck) => deck.cards);
    return this.props.cards.concat(cardsInSubDecks);
  }

  get dueCards (): Card[] {
    return this.cards.filter(Card.isDue);
  }

  insertCard (card: Card): void {
    this.props.cards.push(card);
  }
}