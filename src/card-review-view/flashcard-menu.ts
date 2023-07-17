import { Notice, setIcon } from "obsidian";
import { t } from "src/lang/helpers";
type FlashcardMenuDiv = HTMLDivElement;
import { FlashcardEditModal } from "src/review-view";

export function setupFlashCardMenu (flashcardMenuDiv: FlashcardMenuDiv): void {

  // let backButton = flashcardMenuDiv.createEl("button");
  // backButton.addClass("sr-flashcard-menu-item");
  // setIcon(backButton, "arrow-left");
  // backButton.setAttribute("aria-label", t("BACK"));
  // backButton.addEventListener("click", () => {
  //   this.plugin.data.historyDeck = "";
  //   // this.decksList();
  // });
  function makeButton (
    id: string,
    iconName: string,
    ariaLabel: string,
  ): HTMLButtonElement {
    let button = flashcardMenuDiv.createEl("button");
    button.addClass("sr-flashcard-menu-item");
    setIcon(button, iconName);
    button.setAttribute("id", id);
    button.setAttribute("aria-label", ariaLabel);
    return button;
  }

  makeButton("sr-quit-view-btn", "arrow-left", t("BACK"));
  makeButton("sr-edit-card-btn", "edit", t("EDIT_CARD"));
  makeButton("sr-reset-card-btn", "refresh-cw", t("RESET_CARD_PROGRESS"));
  makeButton("sr-card-info-btn", "info", "View Card Info");
  makeButton("sr-skip-card-btn", "chevrons-right", t("SKIP"));

  // const skipButton = flashcardMenuDiv.createEl("
  // let editButton = flashcardMenuDiv.createEl("button");
  // editButton.addClass();
  // setIcon(editButton, "edit");
  // editButton.setAttribute("id", "sr-edit-card-btn");
  // editButton.setAttribute("aria-label", t("EDIT_CARD"));
  // editButton.addEventListener("click", async () => {
  //   // remove SR info from input modal prompt
  //   const textPromptArr = this.currentCard.cardText.split("\n");
  //   let textPrompt = "";
  //   if (textPromptArr[textPromptArr.length - 1].startsWith("<!--SR:")) {
  //     textPrompt = textPromptArr.slice(0, -1).join("\n");
  //   } else {
  //     textPrompt = this.currentCard.cardText;
  //   }

  //   const editModal = FlashcardEditModal.Prompt(this.app, this.plugin, textPrompt);
  //   editModal
  //     .then(async (modifiedCardText) => {
  //       this.modifyCardText(textPrompt, modifiedCardText);
  //     })
  //     .catch((reason) => console.log(reason));
  // });

  // let resetButton = flashcardMenuDiv.createEl("button");
  // resetButton.addClass("sr-flashcard-menu-item");
  // setIcon(resetButton, "refresh-cw");
  // resetButton.setAttribute("id", "sr-reset-card-btn");
  // resetButton.setAttribute("aria-label", t("RESET_CARD_PROGRESS"));
  // resetButton.addEventListener("click", () => {
  //     this.processReview(ReviewResponse.Reset);
  // });

  // const cardInfo = flashcardMenuDiv.createEl("button");
  // cardInfo.addClass("sr-flashcard-menu-item");
  // setIcon(cardInfo, "info");
  // cardInfo.setAttribute("id", "sr-card-info-btn");
  // cardInfo.setAttribute("aria-label", "View Card Info");
  // cardInfo.addEventListener("click", async () => {
  // const currentEaseStr = t("CURRENT_EASE_HELP_TEXT") + (this.currentCard.ease ?? t("NEW"));
  // const currentIntervalStr = t("CURRENT_INTERVAL_HELP_TEXT") + textInterval(this.currentCard.interval, false);
  // const generatedFromStr = t("CARD_GENERATED_FROM", {
  //   notePath: this.currentCard.note.path,
  // });
  // new Notice(currentEaseStr + "\n" + currentIntervalStr + "\n" + generatedFromStr);
  // });

  // const skipButton = flashcardMenuDiv.createEl("button");
  // skipButton.addClass("sr-flashcard-menu-item");
  // resetButton.setAttribute("id", "sr-card-info-btn");
  // setIcon(skipButton, "chevrons-right");
  // skipButton.setAttribute("aria-label", t("SKIP"));
  // skipButton.addEventListener("click", () => {
  //   this.showNextCard();
  // });

  // if (this.plugin.data.settings.showContextInCards) {
  //   this.contextView = this.contentEl.createDiv();
  //   this.contextView.setAttribute("id", "sr-context");
  // }
}

