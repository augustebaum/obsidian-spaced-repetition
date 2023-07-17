import { Result } from "@badrap/result";

import { Entity } from "src/ddd/core/domain/Entity";
import { UniqueEntityId } from "src/ddd/core/domain/UniqueEntityId";

import { CardReviewSettings } from "./CardReviewSettings";
import { CardType } from "./CardType";
import { Deck } from "./Deck";

export interface ICardProps {
  type: CardType;
  deck: Deck;
  front: string;
  back: string;
  reviewSettings: CardReviewSettings;
}

export interface ICard {
  id: UniqueEntityId;
  type: CardType;
  deck: Deck;
  front: string;
  back: string;
  reviewSettings: CardReviewSettings;
}

export class Card extends Entity<ICardProps> implements ICard {
  private constructor(props: ICardProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create (props: ICardProps, id?: UniqueEntityId): Result<Card> {
    return Result.ok(new Card(props, id));
  }

  static isDue (card: Card): boolean {
    throw new Error("Not yet implemented!");
  }

  get id (): UniqueEntityId {
    return this._id;
  }

  get deck (): Deck {
    return this.props.deck;
  }

  get front (): string {
    return this.props.front;
  }

  get back (): string {
    return this.props.back;
  }

  get type (): CardType {
    return this.props.type;
  }

  get reviewSettings () {
    return this.props.reviewSettings;
  }

  set reviewSettings (reviewSettings: CardReviewSettings) {
    this.props.reviewSettings = reviewSettings;
  }
}