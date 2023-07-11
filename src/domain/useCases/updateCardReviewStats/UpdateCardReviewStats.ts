import { UseCase } from "src/domain/core/UseCase";

import { Card, CardReviewSettings } from "src/domain/Card";
import { CardReviewRating } from "src/domain/CardReviewRating";

interface Request {
  card: Card;
  reviewRating: CardReviewRating;
}

type Response = Result<void>;

export class UpdateCardReviewStats implements UseCase<Request, Promise<Response>> {
  private cardRepo: CardRepo;

  constructor(cardRepo: CardRepo) {
    this.cardRepo = cardRepo;
  }

  async execute (request: Request): Promise<Response> {
    const { card, reviewRating } = request;

    card.reviewSettings = this.newReviewSettings(card.reviewSettings, reviewRating, null);

    try {
      await this.cardRepo.save(card);
      return Result.ok();
    } catch (err) {
      return Result.err(err);
    }
  }

  private newReviewSettings (
    reviewSettings: CardReviewSettings,
    rating: CardReviewRating,
    settings: SRSettings,
  ): CardReviewSettings {
    let interval = reviewSettings.interval;
    let ease = reviewSettings.ease;
    let delayBeforeReview = Math.max(0, Math.floor(reviewSettings.delayBeforeReview / (24 * 3600 * 1000)));

    switch (rating) {
      case CardReviewRating.Easy: {
        ease += 20;
        interval = settings.easyBonus * ((interval + delayBeforeReview) * ease) / 100;
      }
      case CardReviewRating.Medium: {
        interval = (interval + delayBeforeReview / 2) * ease / 100;
      }
      case CardReviewRating.Hard: {
        ease = Math.max(130, ease - 20);
        interval = Math.max(
          1,
          (interval + delayBeforeReview / 4) * settings.lapsesIntervalChange
        );
      }
    }

    // replaces random fuzz with load balancing over the fuzz interval
    // if (dueDates !== undefined) {
    //   interval = Math.round(interval);
    //   if (!Object.prototype.hasOwnProperty.call(dueDates, interval)) {
    //     dueDates[interval] = 0;
    //   } else {
    //     // disable fuzzing for small intervals
    //     if (interval > 4) {
    //       let fuzz = 0;
    //       if (interval < 7) fuzz = 1;
    //       else if (interval < 30) fuzz = Math.max(2, Math.floor(interval * 0.15));
    //       else fuzz = Math.max(4, Math.floor(interval * 0.05));

    //       const originalInterval = interval;
    //       outer: for (let i = 1; i <= fuzz; i++) {
    //         for (const ivl of [originalInterval - i, originalInterval + i]) {
    //           if (!Object.prototype.hasOwnProperty.call(dueDates, ivl)) {
    //             dueDates[ivl] = 0;
    //             interval = ivl;
    //             break outer;
    //           }
    //           if (dueDates[ivl] < dueDates[interval]) interval = ivl;
    //         }
    //       }
    //     }
    //   }

    //   dueDates[interval]++;
    // }

    interval = Math.min(interval, settings.maximumInterval);
    interval = Math.round(interval * 10) / 10;

    return { interval, ease, delayBeforeReview };
  }
}
