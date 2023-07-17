import { Result } from "@badrap/result";

import { Mapper } from "src/ddd/core/infra/Mapper";

import { CardReviewSettings } from "../domain/CardReviewSettings";

export class CardReviewSettingsMapper implements Mapper<CardReviewSettings> {
  static toPersistence (cardReviewSettings: CardReviewSettings): any {
    return JSON.stringify(cardReviewSettings);
  }

  static toDomain (raw: any): Result<CardReviewSettings> {
    try {
      return Result.ok(JSON.parse(raw));
    } catch (err) {
      return Result.err(err);
    }
  }
};