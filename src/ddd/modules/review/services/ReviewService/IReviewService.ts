import { CardReviewRating } from "../../domain/CardReviewRating";
import { CardReviewSettings } from "../../domain/CardReviewSettings";

export interface IReviewService {
  newReviewSettings (reviewSettings: CardReviewSettings, rating: CardReviewRating): CardReviewSettings;
}
