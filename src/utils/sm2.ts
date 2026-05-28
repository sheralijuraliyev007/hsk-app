export interface CardProgress {
  wordId: number;
  repetitions: number;
  easeFactor: number;
  interval: number;
  nextReviewDate: string;
}

export type Rating = 0 | 1 | 2 | 3; // 0=Again, 1=Hard, 2=Good, 3=Easy

export function calculateNextReview(card: CardProgress, rating: Rating): CardProgress {
  let { repetitions, easeFactor, interval } = card;

  if (rating === 0) {
    // Again — reset
    repetitions = 0;
    interval = 1;
  } else if (rating === 1) {
    // Hard — small interval increase
    interval = Math.max(1, Math.round(interval * 1.2));
  } else if (rating === 2) {
    // Good — normal SM-2 progression
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  } else {
    // Easy — bigger jump
    if (repetitions === 0) interval = 4;
    else interval = Math.round(interval * easeFactor * 1.3);
    repetitions += 1;
  }

  // Update ease factor based on rating (SM-2 formula)
  easeFactor = Math.max(1.3, easeFactor + 0.1 - (3 - rating) * (0.08 + (3 - rating) * 0.02));

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);

  return {
    ...card,
    repetitions,
    easeFactor,
    interval,
    nextReviewDate: nextDate.toISOString().split('T')[0],
  };
}

export function createNewCard(wordId: number): CardProgress {
  const today = new Date().toISOString().split('T')[0];
  return {
    wordId,
    repetitions: 0,
    easeFactor: 2.5,
    interval: 0,
    nextReviewDate: today,
  };
}

export function isDueToday(card: CardProgress): boolean {
  const today = new Date().toISOString().split('T')[0];
  return card.nextReviewDate <= today;
}
