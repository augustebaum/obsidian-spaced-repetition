import { CardReviewRating } from "src/ddd/modules/review/domain/CardReviewRating";

export function forEachButton (fn: (buttonId: string, reviewRating: CardReviewRating) => void): void {
  const buttonInfo: [string, CardReviewRating][] = [
    ["sr-hard-btn", CardReviewRating.Hard],
    ["sr-good-btn", CardReviewRating.Medium],
    ["sr-easy-btn", CardReviewRating.Easy],
  ];
  for (let [buttonId, reviewRating] of buttonInfo) {
    fn(buttonId, reviewRating);
  }
};
