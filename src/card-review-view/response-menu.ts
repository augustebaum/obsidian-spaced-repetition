import { t } from "src/lang/helpers";
import { SRSettings } from "src/settings";

export type ResponseMenuDiv = HTMLDivElement;
export type RatingBtnsDiv = HTMLDivElement;
export type AnswerBtn = HTMLButtonElement;


export function setupResponseMenu (contentEl: HTMLElement, settings: SRSettings): { responseDiv: ResponseMenuDiv, ratingBtnsDiv: RatingBtnsDiv, answerBtn: AnswerBtn; } {
  let responseDiv = contentEl.createDiv("sr-flashcard-response");

  let ratingBtnsDiv = responseDiv.createDiv("sr-flashcard-rating-btns");
  ratingBtnsDiv.style.display = "none";

  let hardBtn = ratingBtnsDiv.createEl("button");
  hardBtn.setAttribute("id", "sr-hard-btn");
  hardBtn.setText(settings.flashcardHardText);

  let goodBtn = ratingBtnsDiv.createEl("button");
  goodBtn.setAttribute("id", "sr-good-btn");
  goodBtn.setText(settings.flashcardGoodText);

  let easyBtn = ratingBtnsDiv.createEl("button");
  easyBtn.setAttribute("id", "sr-easy-btn");
  easyBtn.setText(settings.flashcardEasyText);


  let answerBtn = responseDiv.createEl("button");
  answerBtn.setAttribute("id", "sr-show-answer-btn");
  answerBtn.setText(t("SHOW_ANSWER"));

  // if (this.ignoreStats) {
  //     goodBtn.style.display = "none";

  //     responseDiv.addClass("sr-ignorestats-response");
  //     easyBtn.addClass("sr-ignorestats-btn");
  //     hardBtn.addClass("sr-ignorestats-btn");
  // }

  return { responseDiv, ratingBtnsDiv, answerBtn };
}

