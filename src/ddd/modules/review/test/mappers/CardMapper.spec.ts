import { Card, CardType } from "src/domain/Card";
import { CardMapper } from "src/domain/mappers/CardMapper";

describe("CardMapper", () => {
  it("toDomain should be inverse to toPersistence", async () => {
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

    const clonedCard = CardMapper.toDomain(CardMapper.toPersistence(card)).unwrap();
    expect(clonedCard.equals(card)).toBeTruthy();
  });
});
