import { ItemView, WorkspaceLeaf } from "obsidian";
import type SRPlugin from "src/main";
// import { t } from "src/lang/helpers";
// import { textInterval, Card, ReviewResponse, CardStats, schedule } from "src/scheduling";
// import { Deck } from "src/ddd/modules/review/domain/Deck";

import { renderMarkdownWrapper } from "./render-card";
import { setupFlashCardMenu } from "./flashcard-menu";
import { setupResponseMenu, AnswerBtn, RatingBtnsDiv } from "./response-menu";
import { forEachButton } from "./util";

import { ObsidianCard } from "src/repo/ObsidianCardRepo";
import { ReviewCard } from "src/ddd/modules/review/useCases/ReviewCard/ReviewCard";
import { reviewService } from "src/ddd/modules/review/services/ReviewService";
// import { CardReviewRating } from "src/ddd/modules/review/domain/CardReviewRating";
// import { GetCardsForReview } from "src/domain/useCases/StartReviewSession/GetCardsForReview";

export const SR_VIEW = "spaced-repetition-view";

export class SpacedRepetitionView extends ItemView {
  private plugin: SRPlugin;
  private cardsToReview: ObsidianCard[];
  private cardIndex: number;
  private currentCard: ObsidianCard;

  // private cardReviewComponent: CardReviewComponent
  private flashcardView: HTMLDivElement;
  private answerBtn: AnswerBtn;
  // private responseDiv: ResponseDiv;
  private ratingBtnsDiv: RatingBtnsDiv;

  private reviewCardUseCase: ReviewCard;

  // private dueCards: Card[];
  // private newCards: Card[];
  // private currentCardIdx: number

  constructor(leaf: WorkspaceLeaf, plugin: SRPlugin) {
    super(leaf);

    this.plugin = plugin;
  }

  getViewType () { return SR_VIEW; }

  getDisplayText () { return "Card review"; }

  async onOpen () {
    this.reviewCardUseCase = new ReviewCard(this.plugin.cardRepo, reviewService);
    // const page = this.containerEl.children[1];
    // page.empty();

    // Get list of all flashcards
    // const decks = this.plugin.getDecks()
    const decks = await this.plugin.cardRepo.decks();

    this.cardsToReview = await this.plugin.cardRepo.getByDecks([...decks]);
    this.cardIndex = 0;



    // await (new GetCardsForReview(this.plugin.cardRepo)).execute(
    //   {decks: decks,onlyDueCards: false}
    // )

    // Launch review with all cards
    // ie start component
    this.setupCardsView();
    this.showNextCard();
  }

  async onClose () {
    // Nothing to clean up.
  }

  setupCardsView (): void {
    this.contentEl.empty();

    // Top menu
    const flashcardMenuDiv = this.contentEl.createDiv("sr-flashcard-menu");
    setupFlashCardMenu(flashcardMenuDiv);
    flashcardMenuDiv.children.namedItem("sr-quit-view-btn");

    // Actual card
    let flashcardView = this.contentEl.createDiv();
    flashcardView.setAttribute("id", "sr-flashcard-view");
    this.flashcardView = flashcardView;

    // Bottom response menu
    let out = setupResponseMenu(this.contentEl, this.plugin.data.settings);
    // this.responseDiv = out.responseDiv;

    this.answerBtn = out.answerBtn;
    this.answerBtn.addEventListener("click", () => this.showAnswer());

    this.ratingBtnsDiv = out.ratingBtnsDiv;
    forEachButton((buttonId, response) => {
      this.ratingBtnsDiv.children.namedItem(buttonId)
        .addEventListener("click", () => {
          this.reviewCardUseCase.execute({
            card: this.currentCard,
            reviewRating: response
          });
          this.showNextCard();
        });
    });
  }


  private showAnswer (): void {
    // this.mode = FlashcardModalMode.Back;

    // Hide "Show answer" buttons
    this.answerBtn.style.display = "none";
    // Show rating buttons
    this.ratingBtnsDiv.style.display = "flex";

    // if (this.currentCard.isDue) {
    //     this.resetButton.disabled = false;
    // }

    // if (this.currentCard.cardType !== CardType.Cloze) {
    //     const hr: HTMLElement = document.createElement("hr");
    //     hr.setAttribute("id", "sr-hr-card-divide");
    //     this.flashcardView.appendChild(hr);
    // } else {
    //     this.flashcardView.empty();
    // }

    // Show the back of the card
    // const hr: HTMLElement = this.flashcardView.createEl("hr", "sr-hr-card-divide");
    this.flashcardView.createEl("hr", "sr-hr-card-divide");

    renderMarkdownWrapper(this.currentCard.back, this.currentCard.location.file, this.flashcardView);

  }

  showNextCard (): void {

    // Hide rating buttons
    this.ratingBtnsDiv.style.display = "none";
    // this.resetButton.disabled = true;
    // this.titleEl.setText(
    //   `${this.deckName}: ${this.dueFlashcardsCount + this.newFlashcardsCount}`
    // );

    // Show "show answer" button
    this.answerBtn.style.display = "flex";
    this.flashcardView.empty();
    // this.mode = FlashcardthisMode.Front;

    this.currentCard = this.getNewCard();
    renderMarkdownWrapper(this.currentCard.front, this.currentCard.location.file, this.flashcardView);

    // let getInterval = (response: ReviewResponse) => {
    //   const cardStats = schedule(
    //     response,
    //     newCardStats,
    //     this.plugin.data.settings
    //   )
    //   return cardStats.interval
    // }

    // Set new button text
    // forEachButton(
    //   (buttonId: string, response: CardReviewRating) => {
    //     let newBtnText = textInterval(getInterval(response), true)
    //     this.ratingBtnsDiv.children.namedItem(buttonId).setText(newBtnText);
    //   }
    // )

    // if (this.ignoreStats) {
    //   // Same for mobile/desktop
    //   this.hardBtn.setText(`${this.plugin.data.settings.flashcardHardText}`);
    //   this.easyBtn.setText(`${this.plugin.data.settings.flashcardEasyText}`);
    // } else if (Platform.isMobile) {
    //   this.hardBtn.setText(textInterval(hardInterval, true));
    //   this.goodBtn.setText(textInterval(goodInterval, true));
    //   this.easyBtn.setText(textInterval(easyInterval, true));
    // } else {
    //   this.hardBtn.setText(
    //     `${this.plugin.data.settings.flashcardHardText} - ${textInterval(
    //       hardInterval,
    //       false
    //     )}`
    //   );
    //   this.goodBtn.setText(
    //     `${this.plugin.data.settings.flashcardGoodText} - ${textInterval(
    //       goodInterval,
    //       false
    //     )}`
    //   );
    //   this.easyBtn.setText(
    //     `${this.plugin.data.settings.flashcardEasyText} - ${textInterval(
    //       easyInterval,
    //       false
    //     )}`
    //   );
    // }

    //   if (this.plugin.data.settings.showContextInCards){
    //     this.contextView.setText(this.currentCard.context);
    // }
  }

  /**
  * Select new card from pool of due and new cards and get its stats.
  */
  getNewCard (): ObsidianCard {
    const newCard = this.cardsToReview[this.cardIndex];
    console.log("new card ", newCard);
    this.cardIndex += 1;
    return newCard;



    //   let interval = 1.;
    //   let ease: number = this.plugin.data.settings.baseEase;
    //   let delayBeforeReview = 0;
    //   let newCard = null;

    //   // If there are due cards left to review
    //   if (this.dueCards.length > 0) {
    //     // Get the next card index
    //     if (this.plugin.data.settings.randomizeCardOrder) {
    //       this.currentCardIdx = Math.floor(Math.random() * this.dueCards.length);
    //     } else {
    //       this.currentCardIdx = 0;
    //     }
    //     // Show it
    //     newCard = this.dueCards[this.currentCardIdx];

    //     // let newCardStats = this.currentCard.stats;
    //     // interval = this.currentCard.interval;
    //     // ease = this.currentCard.ease;
    //     // delayBeforeReview = this.currentCard.delayBeforeReview;

    //     // If there are no more due cards but there are new cards
    //   } else if (this.newCards.length > 0) {

    //     // Get the next card index
    //     if (this.plugin.data.settings.randomizeCardOrder) {

    //       const newCardIdx = Math.floor(Math.random() * this.newCards.length);

    //       let findFirstUnscheduledSibling = (pickedCardIdx: number) => {
    //         const pickedCard: Card = this.newCards[pickedCardIdx];
    //         let idx = pickedCardIdx;
    //         let firstSiblingIdx = pickedCardIdx;

    //         while (idx >= 0 && pickedCard.siblings.includes(this.newCards[idx])) {
    //           if (!this.newCards[idx].isDue) {
    //             firstSiblingIdx = idx;
    //           }
    //           idx--;
    //         }

    //         return firstSiblingIdx
    //       };

    //       this.currentCardIdx = findFirstUnscheduledSibling(newCardIdx)

    //     } else {
    //       this.currentCardIdx = 0;
    //     }

    //     newCard = this.newCards[this.currentCardIdx];

    //     if (
    //       Object.prototype.hasOwnProperty.call(
    //         this.plugin.easeByPath,
    //         this.currentCard.note.path
    //       )
    //     ) {
    //       ease = this.plugin.easeByPath[this.currentCard.note.path];
    //     }
    //   }

    //   return [newCard, { interval, ease, delayBeforeReview }];

  }
}

