import { Result } from "@badrap/result";

import { Mapper } from "src/ddd/core/infra/Mapper";

import { CardType } from "../domain/CardType";

export class CardTypeMapper implements Mapper<CardType> {
  static toPersistence (cardType: CardType): any {
    return cardType.toString();
  }

  static toDomain (raw: any): Result<CardType> {
    const allCardTypes = [
      CardType.SingleLine,
      CardType.SingleLineBothWays,
      CardType.MultiLine,
      CardType.MultiLineBothWays,
      CardType.Cloze,
    ];
    for (let cardType of allCardTypes) {
      if (raw === cardType.toString()) {
        return Result.ok(cardType);
      }
    }
    return Result.err(new Error(`Unrecognized card type: ${raw}`));
  };
}