import { Result } from "@badrap/result";
import { TFile } from "obsidian";

import { Entity } from "src/ddd/core/domain/Entity";
import { UniqueEntityId } from "src/ddd/core/domain/UniqueEntityId";

import { ICard, ICardProps } from "src/ddd/modules/review/domain/Card";
import { CardReviewSettings } from "src/ddd/modules/review/domain/CardReviewSettings";
import { CardType } from "src/ddd/modules/review/domain/CardType";
import { Deck } from "src/ddd/modules/review/domain/Deck";
import { ICardRepo } from "src/ddd/modules/review/repos/ICardRepo";

import { SRSettings } from "src/settings";

type CardLocation = {
  file: TFile;
  lineNumber: number;
};

interface IObsidianCardProps extends ICardProps {
  location: CardLocation;

  siblings: ObsidianCard[];
  indexInSiblings: number;

  context: string;
}

export class ObsidianCard extends Entity<IObsidianCardProps> implements ICard {
  private constructor(props: IObsidianCardProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create (props: IObsidianCardProps, id?: UniqueEntityId): Result<ObsidianCard> {
    return Result.ok(new ObsidianCard(props, id));
  }

  static isDue (card: ObsidianCard): boolean {
    throw new Error("Not yet implemented!");
  }

  get id (): UniqueEntityId {
    return this._id;
  }

  get type (): CardType {
    return this.props.type;
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

  get reviewSettings () {
    return this.props.reviewSettings;
  }

  set reviewSettings (reviewSettings: CardReviewSettings) {
    this.props.reviewSettings = reviewSettings;
  }

  get location () {
    return this.props.location;
  }
}

export class ObsidianCardRepo implements ICardRepo {
  private settings: SRSettings;
  private _items: ObsidianCard[];

  constructor(pluginSettings: SRSettings) {
    this.settings = pluginSettings;
    this._items = [];
  }

  // async saveCardsFromNote (note: TFile): Promise<void> { }
  async getByDecks (decks: Deck[]): Promise<ObsidianCard[]> {
    return this._items.filter((card) => decks.contains(card.deck));
    // return new Array(this._items.map((card) => card.deck));
  };

  async save (card: ObsidianCard): Promise<void> {
    if (!this._items.contains(card)) {
      this._items.push(card);
    }
  }

  async decks (): Promise<Set<Deck>> {
    return new Set(this._items.map((card) => card.deck));
  }
}