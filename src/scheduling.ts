import { TFile } from "obsidian";

import { SRSettings } from "src/settings";
import { t } from "src/lang/helpers";

export enum ReviewResponse {
  Easy,
  Good,
  Hard,
  Reset,
}

// Flashcards

export interface Card {
  editLater: boolean;
  // scheduling
  isDue: boolean;
  interval?: number;
  ease?: number;
  delayBeforeReview?: number;
  stats?: CardStats;
  // note
  note: TFile;
  lineNo: number;
  // visuals
  front: string;
  back: string;
  cardText: string;
  context: string;
  // types
  cardType: CardType;
  // information for sibling cards
  siblingIdx: number;
  siblings: Card[];
}

export enum CardType {
  SingleLineBasic,
  SingleLineReversed,
  MultiLineBasic,
  MultiLineReversed,
  Cloze,
}

type Interval = number;
type Ease = number;
type DelayBeforeReview = number;

export type CardStats = {
  interval: Interval;
  ease: Ease;
  delayBeforeReview: DelayBeforeReview;
};

export function schedule (
  response: ReviewResponse,
  cardStats: CardStats,
  settings: SRSettings,
  dueDates?: Record<number, number>
): CardStats {
  let interval = cardStats.interval;
  let ease = cardStats.ease;
  let delayBeforeReview = Math.max(0, Math.floor(cardStats.delayBeforeReview / (24 * 3600 * 1000)));

  switch (response) {
    case ReviewResponse.Easy: {
      ease += 20;
      interval = settings.easyBonus * ((interval + delayBeforeReview) * ease) / 100;
    }
    case ReviewResponse.Good: {
      interval = ((interval + delayBeforeReview / 2) * ease) / 100;
    }
    case ReviewResponse.Hard: {
      ease = Math.max(130, ease - 20);
      interval = Math.max(
        1,
        (interval + delayBeforeReview / 4) * settings.lapsesIntervalChange
      );
    }
  }

  // replaces random fuzz with load balancing over the fuzz interval
  if (dueDates !== undefined) {
    interval = Math.round(interval);
    if (!Object.prototype.hasOwnProperty.call(dueDates, interval)) {
      dueDates[interval] = 0;
    } else {
      // disable fuzzing for small intervals
      if (interval > 4) {
        let fuzz = 0;
        if (interval < 7) fuzz = 1;
        else if (interval < 30) fuzz = Math.max(2, Math.floor(interval * 0.15));
        else fuzz = Math.max(4, Math.floor(interval * 0.05));

        const originalInterval = interval;
        outer: for (let i = 1; i <= fuzz; i++) {
          for (const ivl of [originalInterval - i, originalInterval + i]) {
            if (!Object.prototype.hasOwnProperty.call(dueDates, ivl)) {
              dueDates[ivl] = 0;
              interval = ivl;
              break outer;
            }
            if (dueDates[ivl] < dueDates[interval]) interval = ivl;
          }
        }
      }
    }

    dueDates[interval]++;
  }

  interval = Math.min(interval, settings.maximumInterval);
  interval = Math.round(interval * 10) / 10;

  return { interval, ease, delayBeforeReview };
}

export function textInterval (interval: number, isMobile: boolean): string {
  if (interval === undefined) {
    return t("NEW");
  }

  const m: number = Math.round(interval / 3.04375) / 10,
    y: number = Math.round(interval / 36.525) / 10;

  if (isMobile) {
    if (m < 1.0) return t("DAYS_STR_IVL_MOBILE", { interval });
    else if (y < 1.0) return t("MONTHS_STR_IVL_MOBILE", { interval: m });
    else return t("YEARS_STR_IVL_MOBILE", { interval: y });
  } else {
    if (m < 1.0) return t("DAYS_STR_IVL", { interval });
    else if (y < 1.0) return t("MONTHS_STR_IVL", { interval: m });
    else return t("YEARS_STR_IVL", { interval: y });
  }
}
