import { Entity } from "./core/Entity";
import { UniqueEntityId } from "./core/UniqueEntityId";

enum CardType {
  SingleLineBasic,
  SingleLineReversed,
  MultiLineBasic,
  MultiLineReversed,
  Cloze,
}

type Interval = number; // Todo
type Ease = number; // Todo
type DelayBeforeReview = number; // Todo

export type CardReviewSettings = {
  interval: Interval;
  ease: Ease;
  delayBeforeReview: DelayBeforeReview;
};


interface ICardProps {
  front: string;
  back: string;
  type: CardType;
  reviewSettings: CardReviewSettings;
}

export class Card extends Entity<ICardProps> {
  private constructor(props: ICardProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static isDue (card: Card): boolean {
    throw new Error("Not yet implemented!");
  }

  public static create (props: ICardProps, id?: UniqueEntityId) {
    return new Card(props, id);
  }

  set reviewSettings (reviewSettings: CardReviewSettings) {
    this.props.reviewSettings = reviewSettings;
  }
}