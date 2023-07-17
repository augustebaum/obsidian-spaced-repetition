import { Card, CardType } from "src/domain/Card";
import { CardReviewRating } from "src/domain/CardReviewRating";

import { ReviewCard } from "src/domain/useCases/ReviewCard/ReviewCard";
import { reviewService } from "src/domain/services/ReviewService";
import { FakeCardRepo } from "../repos/FakeCardRepo";

const fakeCardRepo = new FakeCardRepo();
const reviewCard = new ReviewCard(fakeCardRepo, reviewService);

describe("CardReview", () => {
  it("Should update the card's settings", async () => {
    const card = Card.create({
      front: "",
      back: "",
      type: CardType.SingleLine,
      reviewSettings: {
        interval: 5,
        ease: 0,
        delayBeforeReview: 0
      }
    }).unwrap();
    await fakeCardRepo.save(card);

    await reviewCard.execute({ card: card, reviewRating: CardReviewRating.Medium });

    const updatedCard = (await fakeCardRepo.getById(card.id)).unwrap();

    expect(fakeCardRepo.size).toEqual(1);
    expect(updatedCard.reviewSettings).not.toEqual(card.reviewSettings);
  });
})

