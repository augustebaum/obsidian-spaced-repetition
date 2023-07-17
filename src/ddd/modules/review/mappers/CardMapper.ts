import { Result } from "@badrap/result";

import { Mapper } from "src/ddd/core/infra/Mapper";
import { UniqueEntityId } from "src/ddd/core/domain/UniqueEntityId";

import { Card } from "../domain/Card";
import { CardTypeMapper } from "./CardTypeMapper";
import { CardReviewSettingsMapper } from "./CardReviewSettingsMapper";

export class CardMapper implements Mapper<Card> {
  static toPersistence (card: Card): any {
    return {
      card_id: card.id.toString(),
      card_front: card.front,
      card_back: card.back,
      card_type: CardTypeMapper.toPersistence(card.type),
      card_review_settings: CardReviewSettingsMapper.toPersistence(card.reviewSettings),
    };
  }

  static toDomain (raw: any): Result<Card> {
    // I would love Rust's `?` operator or Haskell's `do` notation right now
    const cardTypeOrError = CardTypeMapper.toDomain(raw.card_type);
    const cardReviewSettingsOrError = CardReviewSettingsMapper.toDomain(raw.card_review_settings);

    const cardOrError = Result
      .all([cardTypeOrError, cardReviewSettingsOrError])
      .chain(([cardType, cardReviewSettings]) => {
        return Card.create({
          front: raw.card_front,
          back: raw.card_back,
          type: cardType,
          reviewSettings: cardReviewSettings,
        }, new UniqueEntityId(raw.card_id));
      });

    return cardOrError;
  }
};