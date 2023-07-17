import { DEFAULT_SETTINGS } from "src/settings";
import { CustomReviewService } from "./implementations/CustomReviewService";

const pluginSettings = DEFAULT_SETTINGS;

const reviewService = new CustomReviewService(pluginSettings);
export { reviewService };