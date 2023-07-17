import { Result } from "@badrap/result";

import { UseCase } from "src/ddd/core/domain/UseCase";

import { ICard } from "../../domain/Card";
import { CardReviewRating } from "../../domain/CardReviewRating";
import { ICardRepo } from "../../repos/ICardRepo";
import { IReviewService } from "../../services/ReviewService/IReviewService";

export interface Request {
  card: ICard;
  reviewRating: CardReviewRating;
}

export type Response = Result<void>;

export class ReviewCard implements UseCase<Request, Promise<Response>> {
  private cardRepo: ICardRepo;
  private reviewService: IReviewService;

  constructor(cardRepo: ICardRepo, reviewService: IReviewService) {
    this.cardRepo = cardRepo;
    this.reviewService = reviewService;
  }

  async execute (request: Request): Promise<Response> {
    const { card, reviewRating } = request;

    card.reviewSettings = this.reviewService.newReviewSettings(card.reviewSettings, reviewRating);
    console.log("reviewSettings changed to ", card.reviewSettings);

    try {
      await this.cardRepo.save(card);
      return Result.ok(null);
    } catch (err) {
      return Result.err(err);
    }
  };
}
