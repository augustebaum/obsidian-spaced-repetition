import { AfterCardReviewed } from "../AfterCardReviewed";
import { updateCardReviewStats } from "../useCases/UpdateCardReviewStats";

new AfterCardReviewed(updateCardReviewStats);