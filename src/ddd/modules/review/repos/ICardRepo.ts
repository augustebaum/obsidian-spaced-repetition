import { ICard } from "../domain/Card";
import { Deck } from "../domain/Deck";

export interface ICardRepo {
  save (card: ICard): Promise<void>;
  getByDecks (deck: Deck[]): Promise<ICard[]>;
}