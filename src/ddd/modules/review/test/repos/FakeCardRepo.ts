import { UniqueEntityId } from "src/domain/core/UniqueEntityId";

import { CardMapper } from "src/domain/mappers/CardMapper";
import { ICardRepo } from "src/domain/repos/ICardRepo";
import { Card } from "src/domain/Card";
import { FakeRepo } from "./FakeRepo";
import { Result } from "@badrap/result";

export class FakeCardRepo extends FakeRepo<Card> implements ICardRepo {

  // constructor() {
  //   super();
  // }

  // public findByCardId (artistId: string): Promise<Card> {
  //   return this.findById(artistId);
  // }

  // public async removeCardById (artistId: string): Promise<void> {
  //   this._items = this._items.filter((a) => a.id.toString() !== artistId);
  // }
  public get size () {
    return this._items.length;
  }

  public async getById (cardId: UniqueEntityId): Promise<Result<Card>> {
    const matches = this._items.filter((a) => a.id.equals(cardId));
    console.log(cardId);
    console.log(this._items.map((i) => i.id));
    if (matches.length === 0) {
      return Result.err(new Error(`No item found with id ${cardId}`));
    } else {
      return Result.ok(matches[0]);
    }
  }

  // public async findByCardName (name: string): Promise<Card> {
  //   const matches = this._items.filter((a) => a.name.value.toLowerCase() === name.toLowerCase());
  //   if (matches.length === 0) {
  //     return null;
  //   } else {
  //     return matches[0];
  //   }
  // }

  public async exists (card: Card): Promise<boolean> {
    const found = this._items.filter((i) => this.compareFakeItems(i, card));
    return found.length !== 0;
  }

  public async save (card: Card): Promise<void> {
    const alreadyExists = await this.exists(card);
    if (!alreadyExists) {
      const clonedCard = CardMapper.toDomain(CardMapper.toPersistence(card)).unwrap();
      this._items.push(clonedCard);
    }
  }

  public compareFakeItems (a: Card, b: Card): boolean {
    return a.id.equals(b.id);
  }
}