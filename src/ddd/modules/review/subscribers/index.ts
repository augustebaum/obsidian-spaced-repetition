import { AfterCardReviewed } from "./AfterCardReviewed";

import { reviewCard } from "../useCases/ReviewCard";

new AfterCardReviewed(reviewCard);