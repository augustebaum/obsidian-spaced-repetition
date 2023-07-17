import { ReviewCard } from "./ReviewCard";
import { reviewService } from "src/domain/services/ReviewService";

const cardRepo = new CardRepo();

const reviewCard = new ReviewCard(cardRepo, reviewService);

export { reviewCard };
