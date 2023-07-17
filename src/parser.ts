import { CardType } from "src/ddd/modules/review/domain/CardType";
import { LEGACY_SCHEDULING_EXTRACTOR, MULTI_SCHEDULING_EXTRACTOR, } from "src/constants";
import { escapeRegexString } from "src/utils";
import { Interval, Ease } from "src/ddd/modules/review/domain/CardReviewSettings";

type CardText = string;
type LineNumber = number;
/**
 * Returns flashcards found in `text`
 *
 * @param text - The text to extract flashcards from
 * @param singlelineCardSeparator - Separator for inline basic cards
 * @param singlelineReversedCardSeparator - Separator for inline reversed cards
 * @param multilineCardSeparator - Separator for multiline basic cards
 * @param multilineReversedCardSeparator - Separator for multiline basic card
 * @returns An array of [CardType, card text, line number] tuples
 */
export function parse (
  text: string,
  singlelineCardSeparator: string,
  singlelineReversedCardSeparator: string,
  multilineCardSeparator: string,
  multilineReversedCardSeparator: string,
  convertHighlightsToClozes: boolean,
  convertBoldTextToClozes: boolean,
  convertCurlyBracketsToClozes: boolean
): { cardType: CardType, cardText: CardText, lineNumber: LineNumber; }[] {
  let cardText = "";
  const cards: { cardType: CardType, cardText: CardText, lineNumber: LineNumber; }[] = [];
  let cardType: CardType | null = null;
  let lineNumber = 0;

  const lines: string[] = text.replaceAll("\r\n", "\n").split("\n");

  for (let i = 0; i < lines.length; i++) {

    if (lines[i].length === 0) {
      if (cardType) {
        cards.push({ cardType, cardText, lineNumber });
        cardType = null;
      }
      cardText = "";
      continue;
    } else if (lines[i].startsWith("<!--") && !lines[i].startsWith("<!--SR:")) {
      while (i + 1 < lines.length && !lines[i].includes("-->")) {
        i++;
      };
      i++;
      continue;
    }

    if (cardText.length > 0) {
      cardText += "\n";
    }
    cardText += lines[i];

    if (
      lines[i].includes(singlelineReversedCardSeparator) ||
      lines[i].includes(singlelineCardSeparator)
    ) {
      cardType = lines[i].includes(singlelineReversedCardSeparator)
        ? CardType.SingleLineBothWays
        : CardType.SingleLine;
      cardText = lines[i];
      lineNumber = i;
      if (i + 1 < lines.length && lines[i + 1].startsWith("<!--SR:")) {
        cardText += "\n" + lines[i + 1];
        i++;
      }
      cards.push({ cardType, cardText, lineNumber });
      cardType = null;
      cardText = "";
    } else if (
      cardType === null &&
      ((convertHighlightsToClozes && /==.*?==/gm.test(lines[i])) ||
        (convertBoldTextToClozes && /\*\*.*?\*\*/gm.test(lines[i])) ||
        (convertCurlyBracketsToClozes && /{{.*?}}/gm.test(lines[i])))
    ) {
      cardType = CardType.Cloze;
      lineNumber = i;
    } else if (lines[i] === multilineCardSeparator) {
      cardType = CardType.MultiLine;
      lineNumber = i;
    } else if (lines[i] === multilineReversedCardSeparator) {
      cardType = CardType.MultiLineBothWays;
      lineNumber = i;
    } else if (lines[i].startsWith("```") || lines[i].startsWith("~~~")) {
      const codeBlockClose = lines[i].match(/`+|~+/)[0];
      while (i + 1 < lines.length && !lines[i + 1].startsWith(codeBlockClose)) {
        i++;
        cardText += "\n" + lines[i];
      }
      cardText += "\n" + codeBlockClose;
      i++;
    }
  }

  if (cardType && cardText) {
    cards.push({ cardType, cardText, lineNumber });
  }

  return cards;
}

type CardFront = string;
type CardBack = string;

export function getCardSiblings (cardType: CardType, cardText: string, settings: SRSettings): [CardFront, CardBack][] {
  const siblingMatches: [CardFront, CardBack][] = [];
  if (cardType === CardType.Cloze) {
    const siblings: RegExpMatchArray[] = [];
    if (settings.convertHighlightsToClozes) {
      siblings.push(...cardText.matchAll(/==(.*?)==/gm));
    }
    if (settings.convertBoldTextToClozes) {
      siblings.push(...cardText.matchAll(/\*\*(.*?)\*\*/gm));
    }
    if (settings.convertCurlyBracketsToClozes) {
      siblings.push(...cardText.matchAll(/{{(.*?)}}/gm));
    }
    siblings.sort((a, b) => {
      if (a.index < b.index) {
        return -1;
      }
      if (a.index > b.index) {
        return 1;
      }
      return 0;
    });

    let front: string, back: string;
    for (const m of siblings) {
      const deletionStart: number = m.index,
        deletionEnd: number = deletionStart + m[0].length;
      front =
        cardText.substring(0, deletionStart) +
        "<span style='color:#2196f3'>[...]</span>" +
        cardText.substring(deletionEnd);
      front = front
        .replace(/==/gm, "")
        .replace(/\*\*/gm, "")
        .replace(/{{/gm, "")
        .replace(/}}/gm, "");
      back =
        cardText.substring(0, deletionStart) +
        "<span style='color:#2196f3'>" +
        cardText.substring(deletionStart, deletionEnd) +
        "</span>" +
        cardText.substring(deletionEnd);
      back = back
        .replace(/==/gm, "")
        .replace(/\*\*/gm, "")
        .replace(/{{/gm, "")
        .replace(/}}/gm, "");
      siblingMatches.push([front, back]);
    }
  } else {
    let idx: number;
    if (cardType === CardType.SingleLine) {
      idx = cardText.indexOf(settings.singleLineCardSeparator);
      siblingMatches.push([
        cardText.substring(0, idx),
        cardText.substring(idx + settings.singleLineCardSeparator.length),
      ]);
    } else if (cardType === CardType.SingleLineBothWays) {
      idx = cardText.indexOf(settings.singleLineReversedCardSeparator);
      const side1: string = cardText.substring(0, idx),
        side2: string = cardText.substring(
          idx + settings.singleLineReversedCardSeparator.length
        );
      siblingMatches.push([side1, side2]);
      siblingMatches.push([side2, side1]);
    } else if (cardType === CardType.MultiLine) {
      idx = cardText.indexOf("\n" + settings.multilineCardSeparator + "\n");
      siblingMatches.push([
        cardText.substring(0, idx),
        cardText.substring(idx + 2 + settings.multilineCardSeparator.length),
      ]);
    } else if (cardType === CardType.MultiLineBothWays) {
      idx = cardText.indexOf("\n" + settings.multilineReversedCardSeparator + "\n");
      const side1: string = cardText.substring(0, idx),
        side2: string = cardText.substring(
          idx + 2 + settings.multilineReversedCardSeparator.length
        );
      siblingMatches.push([side1, side2]);
      siblingMatches.push([side2, side1]);
    }
  }
  return siblingMatches;
}

export function parseScheduleString (schedule: RegExpMatchArray): { dueUnix: number, interval: Interval, ease: Ease; } {
  const dueUnix: number = window
    .moment(schedule[1], ["YYYY-MM-DD", "DD-MM-YYYY"])
    .valueOf();

  return { dueUnix, interval: parseInt(schedule[2]), ease: parseInt(schedule[3]) };
}

// I don't know exactly what this function does
export function doSchedulingStuff (
  fileText: string,
  cardText: string,
  siblingMatches: [string, string][]): {
    scheduling: { dueUnix: number, interval: Interval, ease: Ease; }[],
    newFileText: string | null;
  } {
  // Find scheduling information in cardText
  let schedulingMatches: RegExpMatchArray[] = [...cardText.matchAll(MULTI_SCHEDULING_EXTRACTOR)];
  if (schedulingMatches.length === 0)
    schedulingMatches = [...cardText.matchAll(LEGACY_SCHEDULING_EXTRACTOR)];

  const scheduling = schedulingMatches.map(parseScheduleString);

  let newFileText = null;

  // we have some extra scheduling dates to delete
  if (schedulingMatches.length > siblingMatches.length) {
    const idxSched: number = cardText.lastIndexOf("<!--SR:") + 7;
    let newCardText: string = cardText.substring(0, idxSched);
    for (let i = 0; i < siblingMatches.length; i++)
      newCardText += `!${schedulingMatches[i][1]},${schedulingMatches[i][2]},${schedulingMatches[i][3]}`;
    newCardText += "-->";

    const replacementRegex = new RegExp(escapeRegexString(cardText), "gm");
    newFileText = fileText.replace(replacementRegex, () => newCardText);
  }

  return { scheduling, newFileText };
}
