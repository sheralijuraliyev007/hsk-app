import { HSK1_LESSONS } from './hsk1_lessons';
import { HSK2_LESSONS } from './hsk2_lessons';

export type SupportedHskLevel = 1 | 2;

type LessonWordShape = {
  id: number;
  chinese: string;
  pinyin: string;
  english: string;
  partOfSpeech?: string;
};

type DialogueLineShape = {
  speaker: string;
  chinese: string;
  pinyin: string;
  english: string;
};

type DialogueShape = {
  id: number;
  titleChinese: string;
  titleEnglish: string;
  trackNumber: string;
  lines: DialogueLineShape[];
};

type GrammarPointShape = {
  id: number;
  titleChinese: string;
  titleEnglish: string;
  explanation: string;
  structure: string;
  examples: { chinese: string; pinyin: string; english: string }[];
};

type WritingCharacterShape = {
  character: string;
  pinyin: string;
  strokes: number;
  meaning: string;
};

type LessonShape = {
  id: number;
  hskLevel: number;
  titleChinese: string;
  titleEnglish: string;
  vocabulary: LessonWordShape[];
  dialogues: DialogueShape[];
  grammarPoints: GrammarPointShape[];
  exercises: { type: string; question: string }[];
  writingCharacters: WritingCharacterShape[];
  speakingPrompts: string[];
};

export function getLessonsByLevel(level: SupportedHskLevel): LessonShape[] {
  if (level === 2) return HSK2_LESSONS as unknown as LessonShape[];
  return HSK1_LESSONS as unknown as LessonShape[];
}

export function getLessonById(level: SupportedHskLevel, id: number): LessonShape | undefined {
  return getLessonsByLevel(level).find((lesson) => lesson.id === id);
}

export function getAllLessons(level?: SupportedHskLevel): LessonShape[] {
  if (level) return getLessonsByLevel(level);
  return [
    ...(HSK1_LESSONS as unknown as LessonShape[]),
    ...(HSK2_LESSONS as unknown as LessonShape[]),
  ];
}
