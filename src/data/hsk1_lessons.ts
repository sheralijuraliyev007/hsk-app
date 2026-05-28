// HSK Standard Course 1 - Complete Lesson Data
// Based on: HSK标准教程 1 (HSK Biaozhun Jiaocheng 1)
// Publisher: Beijing Language and Culture University Press, 2014

export interface VocabWord {
  id: number;
  chinese: string;
  pinyin: string;
  english: string;
  partOfSpeech: string; // n., v., pron., adj., adv., part., conj., prep., interj.
  audioFile?: string;
}

export interface DialogueLine {
  speaker: string; // 'A' | 'B' | 'narrator'
  chinese: string;
  pinyin: string;
  english: string;
}

export interface DialogueSituation {
  id: number;
  titleChinese: string;
  titleEnglish: string;
  trackNumber: string; // e.g. '03-1'
  lines: DialogueLine[];
}

export interface GrammarPoint {
  id: number;
  titleChinese: string;
  titleEnglish: string;
  explanation: string;
  structure: string; // e.g. "Subject + 是 + Noun"
  examples: { chinese: string; pinyin: string; english: string }[];
}

export interface WritingCharacter {
  character: string;
  pinyin: string;
  strokes: number;
  meaning: string;
}

export interface Exercise {
  type: 'multiple_choice' | 'fill_blank' | 'match' | 'reorder' | 'translate';
  question: string;
  questionPinyin?: string;
  options?: string[];
  answer: string | number;
  explanation?: string;
}

export interface Lesson {
  id: number;
  hskLevel: number;
  titleChinese: string;
  titlePinyin: string;
  titleEnglish: string;
  pageNumber: number;
  vocabulary: VocabWord[];
  dialogues: DialogueSituation[];
  grammarPoints: GrammarPoint[];
  exercises: Exercise[];
  writingCharacters: WritingCharacter[];
  speakingPrompts: string[];
  culturalNote?: string;
}

export const HSK1_LESSONS: Lesson[] = [
  // ─────────────────────────────────────────────────────────────
  // LESSON 1: 你好 (Phonetics + Greetings)
  // ─────────────────────────────────────────────────────────────
  {
    id: 1,
    hskLevel: 1,
    titleChinese: '你好',
    titlePinyin: 'Nǐ hǎo',
    titleEnglish: 'Hello',
    pageNumber: 2,
    vocabulary: [
      { id: 1, chinese: '你好', pinyin: 'nǐ hǎo', english: 'Hello', partOfSpeech: 'interj.' },
      { id: 2, chinese: '您好', pinyin: 'nín hǎo', english: 'Hello (polite)', partOfSpeech: 'interj.' },
      { id: 3, chinese: '你们好', pinyin: 'nǐmen hǎo', english: 'Hello everyone', partOfSpeech: 'interj.' },
      { id: 4, chinese: '对不起', pinyin: 'duìbuqǐ', english: 'Sorry / Excuse me', partOfSpeech: 'interj.' },
      { id: 5, chinese: '没关系', pinyin: 'méi guānxi', english: "It doesn't matter / Never mind", partOfSpeech: 'interj.' },
      { id: 6, chinese: '你', pinyin: 'nǐ', english: 'you (singular)', partOfSpeech: 'pron.' },
      { id: 7, chinese: '好', pinyin: 'hǎo', english: 'good / fine / OK', partOfSpeech: 'adj.' },
    ],
    dialogues: [
      {
        id: 1,
        titleChinese: '打招呼',
        titleEnglish: 'Greetings',
        trackNumber: '01-1',
        lines: [
          { speaker: 'A', chinese: '你好！', pinyin: 'Nǐ hǎo!', english: 'Hello!' },
          { speaker: 'B', chinese: '你好！', pinyin: 'Nǐ hǎo!', english: 'Hello!' },
        ],
      },
      {
        id: 2,
        titleChinese: '道歉',
        titleEnglish: 'Apology',
        trackNumber: '01-2',
        lines: [
          { speaker: 'A', chinese: '对不起！', pinyin: 'Duìbuqǐ!', english: 'Sorry!' },
          { speaker: 'B', chinese: '没关系。', pinyin: 'Méi guānxi.', english: "It doesn't matter." },
        ],
      },
    ],
    grammarPoints: [
      {
        id: 1,
        titleChinese: '声母和韵母',
        titleEnglish: 'Initials and Finals',
        explanation: 'Chinese syllables consist of an initial (声母) and a final (韵母). There are 21 initials and 36 finals in Mandarin.',
        structure: 'Initial + Final + Tone',
        examples: [
          { chinese: 'b + a = ba', pinyin: 'bā bá bǎ bà', english: 'four tones of "ba"' },
          { chinese: 'n + ǐ = nǐ', pinyin: 'nǐ', english: 'you' },
          { chinese: 'h + ǎo = hǎo', pinyin: 'hǎo', english: 'good' },
        ],
      },
      {
        id: 2,
        titleChinese: '四声',
        titleEnglish: 'The Four Tones',
        explanation: 'Mandarin Chinese has four tones: 1st tone (flat, high), 2nd tone (rising), 3rd tone (dipping), 4th tone (falling). The tone changes the meaning of a word.',
        structure: '1st: ā  2nd: á  3rd: ǎ  4th: à',
        examples: [
          { chinese: '妈 mā', pinyin: 'mā', english: 'mother (1st tone)' },
          { chinese: '麻 má', pinyin: 'má', english: 'hemp (2nd tone)' },
          { chinese: '马 mǎ', pinyin: 'mǎ', english: 'horse (3rd tone)' },
          { chinese: '骂 mà', pinyin: 'mà', english: 'to scold (4th tone)' },
        ],
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: 'How do you say "Hello" in Chinese?',
        options: ['谢谢', '你好', '再见', '对不起'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: 'Someone bumps into you and says "对不起". What do you reply?',
        options: ['你好', '谢谢', '没关系', '再见'],
        answer: 2,
      },
      {
        type: 'multiple_choice',
        question: 'Which tone is "hǎo" (好)?',
        options: ['1st tone', '2nd tone', '3rd tone', '4th tone'],
        answer: 2,
      },
    ],
    writingCharacters: [
      { character: '你', pinyin: 'nǐ', strokes: 7, meaning: 'you' },
      { character: '好', pinyin: 'hǎo', strokes: 6, meaning: 'good' },
    ],
    speakingPrompts: [
      'Greet your partner: 你好！',
      'Greet your teacher politely: 您好！',
      'Practice apologizing: 对不起！/ 没关系。',
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 2: 谢谢你 (Thank You)
  // ─────────────────────────────────────────────────────────────
  {
    id: 2,
    hskLevel: 1,
    titleChinese: '谢谢你',
    titlePinyin: 'Xièxie nǐ',
    titleEnglish: 'Thank You',
    pageNumber: 8,
    vocabulary: [
      { id: 8, chinese: '谢谢', pinyin: 'xièxie', english: 'thank you', partOfSpeech: 'v.' },
      { id: 9, chinese: '不客气', pinyin: 'bù kèqi', english: "you're welcome", partOfSpeech: 'interj.' },
      { id: 10, chinese: '再见', pinyin: 'zàijiàn', english: 'goodbye', partOfSpeech: 'interj.' },
      { id: 11, chinese: '不', pinyin: 'bù', english: 'no / not', partOfSpeech: 'adv.' },
      { id: 12, chinese: '明天见', pinyin: 'míngtiān jiàn', english: 'see you tomorrow', partOfSpeech: 'interj.' },
    ],
    dialogues: [
      {
        id: 1,
        titleChinese: '道谢',
        titleEnglish: 'Expressing Thanks',
        trackNumber: '02-1',
        lines: [
          { speaker: 'A', chinese: '谢谢你！', pinyin: 'Xièxie nǐ!', english: 'Thank you!' },
          { speaker: 'B', chinese: '不客气。', pinyin: 'Bù kèqi.', english: "You're welcome." },
        ],
      },
      {
        id: 2,
        titleChinese: '道别',
        titleEnglish: 'Saying Goodbye',
        trackNumber: '02-2',
        lines: [
          { speaker: 'A', chinese: '再见！', pinyin: 'Zàijiàn!', english: 'Goodbye!' },
          { speaker: 'B', chinese: '再见！明天见！', pinyin: 'Zàijiàn! Míngtiān jiàn!', english: 'Goodbye! See you tomorrow!' },
        ],
      },
    ],
    grammarPoints: [
      {
        id: 1,
        titleChinese: '声调变化：不',
        titleEnglish: 'Tone Change: 不 (bù)',
        explanation: '不 (bù) is normally 4th tone. But before another 4th tone syllable, it changes to 2nd tone (bú).',
        structure: '不 + 4th tone → bú + 4th tone',
        examples: [
          { chinese: '不对 → bú duì', pinyin: 'bú duì', english: 'incorrect (不 changes to 2nd tone)' },
          { chinese: '不是 → bú shì', pinyin: 'bú shì', english: 'is not (不 changes to 2nd tone)' },
          { chinese: '不好 → bù hǎo', pinyin: 'bù hǎo', english: 'not good (不 stays 4th tone)' },
        ],
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: 'How do you say "You\'re welcome" in Chinese?',
        options: ['谢谢', '对不起', '不客气', '再见'],
        answer: 2,
      },
      {
        type: 'multiple_choice',
        question: 'What does "再见" mean?',
        options: ['Hello', 'Thank you', 'Sorry', 'Goodbye'],
        answer: 3,
      },
      {
        type: 'multiple_choice',
        question: 'How does 不 (bù) change before a 4th tone syllable?',
        options: ['Stays 4th tone', 'Changes to 1st tone', 'Changes to 2nd tone', 'Changes to 3rd tone'],
        answer: 2,
      },
    ],
    writingCharacters: [
      { character: '不', pinyin: 'bù', strokes: 4, meaning: 'not / no' },
      { character: '大', pinyin: 'dà', strokes: 3, meaning: 'big / large' },
      { character: '山', pinyin: 'shān', strokes: 3, meaning: 'mountain' },
    ],
    speakingPrompts: [
      'Thank your partner: 谢谢！/ 不客气。',
      'Say goodbye: 再见！/ 明天见！',
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 3: 你叫什么名字 (What's Your Name?)
  // ─────────────────────────────────────────────────────────────
  {
    id: 3,
    hskLevel: 1,
    titleChinese: '你叫什么名字',
    titlePinyin: 'Nǐ jiào shénme míngzi',
    titleEnglish: "What's Your Name?",
    pageNumber: 14,
    vocabulary: [
      { id: 13, chinese: '叫', pinyin: 'jiào', english: 'to be called; to call', partOfSpeech: 'v.' },
      { id: 14, chinese: '什么', pinyin: 'shénme', english: 'what', partOfSpeech: 'pron.' },
      { id: 15, chinese: '名字', pinyin: 'míngzi', english: 'name', partOfSpeech: 'n.' },
      { id: 16, chinese: '我', pinyin: 'wǒ', english: 'I / me', partOfSpeech: 'pron.' },
      { id: 17, chinese: '是', pinyin: 'shì', english: 'to be (am/is/are)', partOfSpeech: 'v.' },
      { id: 18, chinese: '老师', pinyin: 'lǎoshī', english: 'teacher', partOfSpeech: 'n.' },
      { id: 19, chinese: '吗', pinyin: 'ma', english: 'question particle (yes/no)', partOfSpeech: 'part.' },
      { id: 20, chinese: '学生', pinyin: 'xuésheng', english: 'student', partOfSpeech: 'n.' },
      { id: 21, chinese: '人', pinyin: 'rén', english: 'person / people', partOfSpeech: 'n.' },
      { id: 22, chinese: '中国', pinyin: 'Zhōngguó', english: 'China', partOfSpeech: 'n.' },
      { id: 23, chinese: '美国', pinyin: 'Měiguó', english: 'United States of America', partOfSpeech: 'n.' },
    ],
    dialogues: [
      {
        id: 1,
        titleChinese: '在学校',
        titleEnglish: 'In the school',
        trackNumber: '03-1',
        lines: [
          { speaker: 'A', chinese: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', english: "What's your name?" },
          { speaker: 'B', chinese: '我叫李月。', pinyin: 'Wǒ jiào Lǐ Yuè.', english: 'My name is Li Yue.' },
        ],
      },
      {
        id: 2,
        titleChinese: '在教室',
        titleEnglish: 'In the classroom',
        trackNumber: '03-2',
        lines: [
          { speaker: 'A', chinese: '你是老师吗？', pinyin: 'Nǐ shì lǎoshī ma?', english: 'Are you a teacher?' },
          { speaker: 'B', chinese: '我不是老师，我是学生。', pinyin: 'Wǒ bú shì lǎoshī, wǒ shì xuésheng.', english: "No, I'm not a teacher. I'm a student." },
        ],
      },
      {
        id: 3,
        titleChinese: '在学校',
        titleEnglish: 'In the school',
        trackNumber: '03-3',
        lines: [
          { speaker: 'A', chinese: '你是中国人吗？', pinyin: 'Nǐ shì Zhōngguórén ma?', english: 'Are you Chinese?' },
          { speaker: 'B', chinese: '我不是中国人，我是美国人。', pinyin: 'Wǒ bú shì Zhōngguórén, wǒ shì Měiguórén.', english: "No, I'm not Chinese. I'm American." },
        ],
      },
    ],
    grammarPoints: [
      {
        id: 1,
        titleChinese: '疑问代词"什么"',
        titleEnglish: 'The Interrogative Pronoun "什么" (what)',
        explanation: '"什么" is used in interrogative sentences, serving as the object by itself or together with a nominal element following it.',
        structure: 'Subject + Verb + 什么 + (Noun)?',
        examples: [
          { chinese: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', english: "What's your name?" },
          { chinese: '这是什么？', pinyin: 'Zhè shì shénme?', english: 'What is this?' },
          { chinese: '你喝什么？', pinyin: 'Nǐ hē shénme?', english: 'What do you drink?' },
        ],
      },
      {
        id: 2,
        titleChinese: '"是"字句',
        titleEnglish: 'The "是" Sentence (A is B)',
        explanation: 'A "是" sentence indicates that somebody or something equals or belongs to something. The negative is formed by adding "不" before "是".',
        structure: 'Subject + (不) 是 + Noun/Noun Phrase',
        examples: [
          { chinese: '我是老师。', pinyin: 'Wǒ shì lǎoshī.', english: 'I am a teacher.' },
          { chinese: '她是学生。', pinyin: 'Tā shì xuésheng.', english: 'She is a student.' },
          { chinese: '我不是老师。', pinyin: 'Wǒ bú shì lǎoshī.', english: 'I am not a teacher.' },
        ],
      },
      {
        id: 3,
        titleChinese: '用"吗"的疑问句',
        titleEnglish: 'Interrogative Sentences with "吗"',
        explanation: 'The particle "吗" is added at the end of a declarative sentence to turn it into a yes/no question.',
        structure: 'Statement + 吗？',
        examples: [
          { chinese: '你是老师吗？', pinyin: 'Nǐ shì lǎoshī ma?', english: 'Are you a teacher?' },
          { chinese: '你是中国人吗？', pinyin: 'Nǐ shì Zhōngguórén ma?', english: 'Are you Chinese?' },
          { chinese: '你是学生吗？', pinyin: 'Nǐ shì xuésheng ma?', english: 'Are you a student?' },
        ],
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: '你叫什么___？',
        options: ['名字', '老师', '学生', '中国'],
        answer: 0,
      },
      {
        type: 'multiple_choice',
        question: 'What does "我是学生" mean?',
        options: ['I am a teacher', 'I am Chinese', 'I am a student', 'What is your name?'],
        answer: 2,
      },
      {
        type: 'multiple_choice',
        question: 'How do you ask "Are you Chinese?" in Chinese?',
        options: ['你叫什么名字？', '你是中国人吗？', '你是老师吗？', '你好吗？'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: '"我不是老师" means:',
        options: ['I am a teacher', 'Are you a teacher?', 'I am not a teacher', 'She is a teacher'],
        answer: 2,
      },
    ],
    writingCharacters: [
      { character: '你', pinyin: 'nǐ', strokes: 7, meaning: 'you' },
      { character: '好', pinyin: 'hǎo', strokes: 6, meaning: 'good' },
      { character: '我', pinyin: 'wǒ', strokes: 7, meaning: 'I / me' },
      { character: '是', pinyin: 'shì', strokes: 9, meaning: 'to be' },
    ],
    speakingPrompts: [
      '你叫什么名字？Ask your partner their name.',
      '你是老师吗？Ask if your partner is a teacher.',
      '你是哪国人？Ask what nationality your partner is.',
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 4: 她是我的汉语老师 (She Is My Chinese Teacher)
  // ─────────────────────────────────────────────────────────────
  {
    id: 4,
    hskLevel: 1,
    titleChinese: '她是我的汉语老师',
    titlePinyin: 'Tā shì wǒ de Hànyǔ lǎoshī',
    titleEnglish: 'She Is My Chinese Teacher',
    pageNumber: 22,
    vocabulary: [
      { id: 24, chinese: '她', pinyin: 'tā', english: 'she / her', partOfSpeech: 'pron.' },
      { id: 25, chinese: '谁', pinyin: 'shéi', english: 'who', partOfSpeech: 'pron.' },
      { id: 26, chinese: '的', pinyin: 'de', english: 'structural particle (possessive)', partOfSpeech: 'part.' },
      { id: 27, chinese: '汉语', pinyin: 'Hànyǔ', english: 'Chinese language', partOfSpeech: 'n.' },
      { id: 28, chinese: '哪', pinyin: 'nǎ', english: 'which', partOfSpeech: 'pron.' },
      { id: 29, chinese: '国', pinyin: 'guó', english: 'country', partOfSpeech: 'n.' },
      { id: 30, chinese: '呢', pinyin: 'ne', english: 'question particle (and you?)', partOfSpeech: 'part.' },
      { id: 31, chinese: '他', pinyin: 'tā', english: 'he / him', partOfSpeech: 'pron.' },
      { id: 32, chinese: '同学', pinyin: 'tóngxué', english: 'classmate', partOfSpeech: 'n.' },
      { id: 33, chinese: '朋友', pinyin: 'péngyou', english: 'friend', partOfSpeech: 'n.' },
    ],
    dialogues: [
      {
        id: 1,
        titleChinese: '介绍老师',
        titleEnglish: 'Introducing a teacher',
        trackNumber: '04-1',
        lines: [
          { speaker: 'A', chinese: '她是谁？', pinyin: 'Tā shì shéi?', english: 'Who is she?' },
          { speaker: 'B', chinese: '她是我的汉语老师。', pinyin: 'Tā shì wǒ de Hànyǔ lǎoshī.', english: 'She is my Chinese teacher.' },
        ],
      },
      {
        id: 2,
        titleChinese: '问国籍',
        titleEnglish: 'Asking about nationality',
        trackNumber: '04-2',
        lines: [
          { speaker: 'A', chinese: '你是哪国人？', pinyin: 'Nǐ shì nǎ guó rén?', english: 'What country are you from?' },
          { speaker: 'B', chinese: '我是中国人。你呢？', pinyin: 'Wǒ shì Zhōngguórén. Nǐ ne?', english: "I'm Chinese. And you?" },
          { speaker: 'A', chinese: '我是美国人。', pinyin: 'Wǒ shì Měiguórén.', english: "I'm American." },
        ],
      },
      {
        id: 3,
        titleChinese: '介绍朋友',
        titleEnglish: 'Introducing a friend',
        trackNumber: '04-3',
        lines: [
          { speaker: 'A', chinese: '他是你的同学吗？', pinyin: 'Tā shì nǐ de tóngxué ma?', english: 'Is he your classmate?' },
          { speaker: 'B', chinese: '不，他是我的朋友。', pinyin: 'Bù, tā shì wǒ de péngyou.', english: 'No, he is my friend.' },
        ],
      },
    ],
    grammarPoints: [
      {
        id: 1,
        titleChinese: '疑问代词"谁"、"哪"',
        titleEnglish: 'Interrogative Pronouns "谁" (who) and "哪" (which)',
        explanation: '"谁" asks about a person. "哪" asks about a choice from a group, usually followed by a measure word or noun.',
        structure: '她是谁？/ 你是哪国人？',
        examples: [
          { chinese: '她是谁？', pinyin: 'Tā shì shéi?', english: 'Who is she?' },
          { chinese: '他是哪国人？', pinyin: 'Tā shì nǎ guó rén?', english: 'What country is he from?' },
          { chinese: '你是哪个学校的学生？', pinyin: 'Nǐ shì nǎ ge xuéxiào de xuésheng?', english: 'Which school are you a student of?' },
        ],
      },
      {
        id: 2,
        titleChinese: '结构助词"的"',
        titleEnglish: 'The Structural Particle "的" (possessive)',
        explanation: '"的" is placed between a modifier and the noun it modifies, similar to "\'s" in English for possession.',
        structure: 'Possessor + 的 + Noun',
        examples: [
          { chinese: '我的老师', pinyin: 'wǒ de lǎoshī', english: 'my teacher' },
          { chinese: '她的名字', pinyin: 'tā de míngzi', english: 'her name' },
          { chinese: '中国的学生', pinyin: 'Zhōngguó de xuésheng', english: 'Chinese student' },
        ],
      },
      {
        id: 3,
        titleChinese: '疑问助词"呢"(1)',
        titleEnglish: 'The Question Particle "呢" (1) — "And you?"',
        explanation: '"呢" at the end of a noun or pronoun asks the same question about that person/thing. It avoids repeating the full question.',
        structure: 'Noun/Pronoun + 呢？',
        examples: [
          { chinese: '我是学生。你呢？', pinyin: 'Wǒ shì xuésheng. Nǐ ne?', english: "I'm a student. And you?" },
          { chinese: '我叫李月。他呢？', pinyin: 'Wǒ jiào Lǐ Yuè. Tā ne?', english: 'My name is Li Yue. And him?' },
        ],
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: '"她是谁？" means:',
        options: ['Where is she?', 'Who is she?', 'What is she?', 'How is she?'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: 'Fill in the blank: 她是我___汉语老师。',
        options: ['是', '吗', '的', '呢'],
        answer: 2,
      },
      {
        type: 'multiple_choice',
        question: 'What does "你呢？" mean in context?',
        options: ['Are you OK?', 'What about you? / And you?', 'Who are you?', 'Where are you?'],
        answer: 1,
      },
    ],
    writingCharacters: [
      { character: '她', pinyin: 'tā', strokes: 6, meaning: 'she / her' },
      { character: '他', pinyin: 'tā', strokes: 5, meaning: 'he / him' },
      { character: '的', pinyin: 'de', strokes: 8, meaning: 'possessive particle' },
    ],
    speakingPrompts: [
      '介绍你的朋友: 他/她是我的朋友，他/她叫……',
      '问国籍: 你是哪国人？我是……人。',
      '用"呢"提问: 我是学生。你呢？',
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 5: 她女儿今年二十岁 (Her Daughter Is 20 Years Old)
  // ─────────────────────────────────────────────────────────────
  {
    id: 5,
    hskLevel: 1,
    titleChinese: '她女儿今年二十岁',
    titlePinyin: 'Tā nǚér jīnnián èrshí suì',
    titleEnglish: 'Her Daughter Is 20 Years Old',
    pageNumber: 30,
    vocabulary: [
      { id: 34, chinese: '家', pinyin: 'jiā', english: 'family / home', partOfSpeech: 'n.' },
      { id: 35, chinese: '有', pinyin: 'yǒu', english: 'to have; there is/are', partOfSpeech: 'v.' },
      { id: 36, chinese: '女儿', pinyin: 'nǚér', english: 'daughter', partOfSpeech: 'n.' },
      { id: 37, chinese: '几', pinyin: 'jǐ', english: 'how many (small number)', partOfSpeech: 'pron.' },
      { id: 38, chinese: '岁', pinyin: 'suì', english: 'years old', partOfSpeech: 'n.' },
      { id: 39, chinese: '了', pinyin: 'le', english: 'particle (change of state)', partOfSpeech: 'part.' },
      { id: 40, chinese: '今年', pinyin: 'jīnnián', english: 'this year', partOfSpeech: 'n.' },
      { id: 41, chinese: '多大', pinyin: 'duō dà', english: 'how old (for adults)', partOfSpeech: 'pron.' },
      { id: 42, chinese: '口', pinyin: 'kǒu', english: 'mouth; (measure word for family members)', partOfSpeech: 'n./m.' },
    ],
    dialogues: [
      {
        id: 1,
        titleChinese: '问家庭',
        titleEnglish: 'Asking about family',
        trackNumber: '05-1',
        lines: [
          { speaker: 'A', chinese: '你家有几口人？', pinyin: 'Nǐ jiā yǒu jǐ kǒu rén?', english: 'How many people are in your family?' },
          { speaker: 'B', chinese: '我家有三口人。', pinyin: 'Wǒ jiā yǒu sān kǒu rén.', english: 'There are three people in my family.' },
        ],
      },
      {
        id: 2,
        titleChinese: '问年龄',
        titleEnglish: 'Asking about age',
        trackNumber: '05-2',
        lines: [
          { speaker: 'A', chinese: '她女儿今年几岁？', pinyin: 'Tā nǚér jīnnián jǐ suì?', english: 'How old is her daughter this year?' },
          { speaker: 'B', chinese: '她女儿今年二十岁了。', pinyin: 'Tā nǚér jīnnián èrshí suì le.', english: 'Her daughter is 20 years old this year.' },
        ],
      },
      {
        id: 3,
        titleChinese: '问年龄(成人)',
        titleEnglish: 'Asking age (adult)',
        trackNumber: '05-3',
        lines: [
          { speaker: 'A', chinese: '您多大了？', pinyin: 'Nín duō dà le?', english: 'How old are you?' },
          { speaker: 'B', chinese: '我四十五岁了。', pinyin: 'Wǒ sìshíwǔ suì le.', english: "I'm 45 years old." },
        ],
      },
    ],
    grammarPoints: [
      {
        id: 1,
        titleChinese: '疑问代词"几"',
        titleEnglish: 'The Interrogative Pronoun "几" (how many)',
        explanation: '"几" asks about a small number (usually under 10). It must be followed by a measure word.',
        structure: '几 + Measure Word + Noun',
        examples: [
          { chinese: '你家有几口人？', pinyin: 'Nǐ jiā yǒu jǐ kǒu rén?', english: 'How many people are in your family?' },
          { chinese: '你有几个朋友？', pinyin: 'Nǐ yǒu jǐ ge péngyou?', english: 'How many friends do you have?' },
        ],
      },
      {
        id: 2,
        titleChinese: '百以内的数字',
        titleEnglish: 'Numbers up to 100',
        explanation: 'Chinese numbers are logical: 11=十一, 20=二十, 21=二十一, 99=九十九.',
        structure: 'Tens + 十 + Units',
        examples: [
          { chinese: '十一 (11)', pinyin: 'shíyī', english: 'eleven' },
          { chinese: '二十 (20)', pinyin: 'èrshí', english: 'twenty' },
          { chinese: '三十五 (35)', pinyin: 'sānshíwǔ', english: 'thirty-five' },
          { chinese: '九十九 (99)', pinyin: 'jiǔshíjiǔ', english: 'ninety-nine' },
        ],
      },
      {
        id: 3,
        titleChinese: '"了"表变化',
        titleEnglish: '"了" Indicating Change of State',
        explanation: '"了" placed at the end of a sentence indicates a change of state or new situation.',
        structure: 'Sentence + 了',
        examples: [
          { chinese: '她二十岁了。', pinyin: 'Tā èrshí suì le.', english: 'She is 20 now (she has turned 20).' },
          { chinese: '我有女儿了。', pinyin: 'Wǒ yǒu nǚér le.', english: 'I have a daughter now.' },
        ],
      },
      {
        id: 4,
        titleChinese: '"多+大"表示疑问',
        titleEnglish: '"多大" — Asking Age of Adults',
        explanation: '"多大" is used to ask the age of adults. For children under 10, use "几岁".',
        structure: 'Subject + 多大 (了)？',
        examples: [
          { chinese: '您多大了？', pinyin: 'Nín duō dà le?', english: 'How old are you? (adult, polite)' },
          { chinese: '你多大？', pinyin: 'Nǐ duō dà?', english: 'How old are you? (adult, casual)' },
        ],
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: 'How do you ask "How many people are in your family?"',
        options: ['你家有多少人？', '你家有几口人？', '你有几个朋友？', '你家有人吗？'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: 'What is 二十五 in numbers?',
        options: ['15', '20', '25', '52'],
        answer: 2,
      },
      {
        type: 'multiple_choice',
        question: 'Which question is appropriate for asking a child\'s age?',
        options: ['你多大了？', '你几岁了？', '你今年多少岁？', '你的年龄是多少？'],
        answer: 1,
      },
    ],
    writingCharacters: [
      { character: '几', pinyin: 'jǐ', strokes: 2, meaning: 'how many' },
      { character: '家', pinyin: 'jiā', strokes: 10, meaning: 'home / family' },
      { character: '有', pinyin: 'yǒu', strokes: 6, meaning: 'to have' },
    ],
    speakingPrompts: [
      '你家有几口人？介绍你的家庭。',
      '你今年几岁？/ 你多大了？',
      '用数字1-100练习。',
    ],
    culturalNote: 'In Chinese culture, asking someone\'s age is not considered rude — it\'s a common way to establish how to address someone and show respect. Older people are addressed more formally.',
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 6: 我会说汉语 (I Can Speak Chinese)
  // ─────────────────────────────────────────────────────────────
  {
    id: 6,
    hskLevel: 1,
    titleChinese: '我会说汉语',
    titlePinyin: 'Wǒ huì shuō Hànyǔ',
    titleEnglish: 'I Can Speak Chinese',
    pageNumber: 40,
    vocabulary: [
      { id: 43, chinese: '会', pinyin: 'huì', english: 'can / know how to', partOfSpeech: 'v.' },
      { id: 44, chinese: '说', pinyin: 'shuō', english: 'to speak / to say', partOfSpeech: 'v.' },
      { id: 45, chinese: '妈妈', pinyin: 'māma', english: 'mother / mom', partOfSpeech: 'n.' },
      { id: 46, chinese: '菜', pinyin: 'cài', english: 'dish / vegetable', partOfSpeech: 'n.' },
      { id: 47, chinese: '做', pinyin: 'zuò', english: 'to do / to make / to cook', partOfSpeech: 'v.' },
      { id: 48, chinese: '好吃', pinyin: 'hǎochī', english: 'delicious / tasty', partOfSpeech: 'adj.' },
      { id: 49, chinese: '饿', pinyin: 'è', english: 'hungry', partOfSpeech: 'adj.' },
      { id: 50, chinese: '写', pinyin: 'xiě', english: 'to write', partOfSpeech: 'v.' },
      { id: 51, chinese: '汉字', pinyin: 'Hànzì', english: 'Chinese character', partOfSpeech: 'n.' },
      { id: 52, chinese: '怎么', pinyin: 'zěnme', english: 'how / why', partOfSpeech: 'pron.' },
      { id: 53, chinese: '读', pinyin: 'dú', english: 'to read (aloud)', partOfSpeech: 'v.' },
    ],
    dialogues: [
      {
        id: 1,
        titleChinese: '语言能力',
        titleEnglish: 'Language ability',
        trackNumber: '06-1',
        lines: [
          { speaker: 'A', chinese: '你会说汉语吗？', pinyin: 'Nǐ huì shuō Hànyǔ ma?', english: 'Can you speak Chinese?' },
          { speaker: 'B', chinese: '会，我会说汉语。', pinyin: 'Huì, wǒ huì shuō Hànyǔ.', english: 'Yes, I can speak Chinese.' },
        ],
      },
      {
        id: 2,
        titleChinese: '妈妈的菜',
        titleEnglish: "Mom's cooking",
        trackNumber: '06-2',
        lines: [
          { speaker: 'A', chinese: '你妈妈做的菜好吃吗？', pinyin: 'Nǐ māma zuò de cài hǎochī ma?', english: "Is the food your mom cooks delicious?" },
          { speaker: 'B', chinese: '很好吃！我很饿，我想吃。', pinyin: 'Hěn hǎochī! Wǒ hěn è, wǒ xiǎng chī.', english: "Very delicious! I'm very hungry, I want to eat." },
        ],
      },
      {
        id: 3,
        titleChinese: '写汉字',
        titleEnglish: 'Writing Chinese characters',
        trackNumber: '06-3',
        lines: [
          { speaker: 'A', chinese: '这个汉字怎么读？', pinyin: 'Zhège Hànzì zěnme dú?', english: 'How do you read this Chinese character?' },
          { speaker: 'B', chinese: '这个字读"好"。', pinyin: 'Zhège zì dú "hǎo".', english: 'This character is read "hǎo".' },
        ],
      },
    ],
    grammarPoints: [
      {
        id: 1,
        titleChinese: '能愿动词"会"(1)',
        titleEnglish: 'Modal Verb "会" (1) — Learned Ability',
        explanation: '"会" expresses an ability acquired through learning. It is placed before the main verb.',
        structure: 'Subject + 会 + Verb',
        examples: [
          { chinese: '我会说汉语。', pinyin: 'Wǒ huì shuō Hànyǔ.', english: 'I can speak Chinese.' },
          { chinese: '她会写汉字。', pinyin: 'Tā huì xiě Hànzì.', english: 'She can write Chinese characters.' },
          { chinese: '你会做菜吗？', pinyin: 'Nǐ huì zuò cài ma?', english: 'Can you cook?' },
        ],
      },
      {
        id: 2,
        titleChinese: '形容词谓语句',
        titleEnglish: 'Sentences with Adjectival Predicates',
        explanation: 'In Chinese, adjectives can directly serve as predicates without "是". The adverb "很" (very) is often added.',
        structure: 'Subject + 很 + Adjective',
        examples: [
          { chinese: '菜很好吃。', pinyin: 'Cài hěn hǎochī.', english: 'The food is very delicious.' },
          { chinese: '我很饿。', pinyin: 'Wǒ hěn è.', english: "I'm very hungry." },
          { chinese: '她很好。', pinyin: 'Tā hěn hǎo.', english: 'She is very well.' },
        ],
      },
      {
        id: 3,
        titleChinese: '疑问代词"怎么"(1)',
        titleEnglish: 'Interrogative Pronoun "怎么" (1) — How',
        explanation: '"怎么" asks about the manner or method of an action.',
        structure: '怎么 + Verb?',
        examples: [
          { chinese: '这个字怎么读？', pinyin: 'Zhège zì zěnme dú?', english: 'How do you read this character?' },
          { chinese: '这个菜怎么做？', pinyin: 'Zhège cài zěnme zuò?', english: 'How do you make this dish?' },
        ],
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: '"我会说汉语" means:',
        options: ['I want to speak Chinese', 'I can speak Chinese', 'I like Chinese', 'I study Chinese'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: 'How do you say "The food is very delicious"?',
        options: ['菜是好吃。', '菜很好吃。', '菜好吃吗？', '菜不好吃。'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: '"这个字怎么读？" means:',
        options: ['What is this character?', 'Can you write this character?', 'How do you read this character?', 'Is this character correct?'],
        answer: 2,
      },
    ],
    writingCharacters: [
      { character: '会', pinyin: 'huì', strokes: 6, meaning: 'can / know how to' },
      { character: '说', pinyin: 'shuō', strokes: 9, meaning: 'to speak' },
      { character: '写', pinyin: 'xiě', strokes: 5, meaning: 'to write' },
    ],
    speakingPrompts: [
      '你会说什么语言？(What languages can you speak?)',
      '你妈妈做的菜好吃吗？',
      '这个汉字怎么读？怎么写？',
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 7: 今天几号 (What's the Date Today?)
  // ─────────────────────────────────────────────────────────────
  {
    id: 7,
    hskLevel: 1,
    titleChinese: '今天几号',
    titlePinyin: 'Jīntiān jǐ hào',
    titleEnglish: "What's the Date Today?",
    pageNumber: 48,
    vocabulary: [
      { id: 54, chinese: '请', pinyin: 'qǐng', english: 'please; to invite', partOfSpeech: 'v.' },
      { id: 55, chinese: '问', pinyin: 'wèn', english: 'to ask', partOfSpeech: 'v.' },
      { id: 56, chinese: '今天', pinyin: 'jīntiān', english: 'today', partOfSpeech: 'n.' },
      { id: 57, chinese: '号', pinyin: 'hào', english: 'date (day of month)', partOfSpeech: 'n.' },
      { id: 58, chinese: '月', pinyin: 'yuè', english: 'month', partOfSpeech: 'n.' },
      { id: 59, chinese: '星期', pinyin: 'xīngqī', english: 'week / day of the week', partOfSpeech: 'n.' },
      { id: 60, chinese: '昨天', pinyin: 'zuótiān', english: 'yesterday', partOfSpeech: 'n.' },
      { id: 61, chinese: '明天', pinyin: 'míngtiān', english: 'tomorrow', partOfSpeech: 'n.' },
      { id: 62, chinese: '去', pinyin: 'qù', english: 'to go', partOfSpeech: 'v.' },
      { id: 63, chinese: '学校', pinyin: 'xuéxiào', english: 'school', partOfSpeech: 'n.' },
      { id: 64, chinese: '书', pinyin: 'shū', english: 'book', partOfSpeech: 'n.' },
    ],
    dialogues: [
      {
        id: 1,
        titleChinese: '问日期',
        titleEnglish: 'Asking the date',
        trackNumber: '07-1',
        lines: [
          { speaker: 'A', chinese: '请问，今天几号？', pinyin: 'Qǐngwèn, jīntiān jǐ hào?', english: 'Excuse me, what is today\'s date?' },
          { speaker: 'B', chinese: '今天十二号。', pinyin: 'Jīntiān shí\'èr hào.', english: "Today is the 12th." },
        ],
      },
      {
        id: 2,
        titleChinese: '问星期',
        titleEnglish: 'Asking the day of the week',
        trackNumber: '07-2',
        lines: [
          { speaker: 'A', chinese: '今天星期几？', pinyin: 'Jīntiān xīngqī jǐ?', english: 'What day of the week is today?' },
          { speaker: 'B', chinese: '今天星期三。昨天星期二，明天星期四。', pinyin: 'Jīntiān xīngqīsān. Zuótiān xīngqī\'èr, míngtiān xīngqīsì.', english: "Today is Wednesday. Yesterday was Tuesday, tomorrow is Thursday." },
        ],
      },
      {
        id: 3,
        titleChinese: '去学校',
        titleEnglish: 'Going to school',
        trackNumber: '07-3',
        lines: [
          { speaker: 'A', chinese: '你明天去学校吗？', pinyin: 'Nǐ míngtiān qù xuéxiào ma?', english: 'Are you going to school tomorrow?' },
          { speaker: 'B', chinese: '去，我去学校学习汉语。', pinyin: 'Qù, wǒ qù xuéxiào xuéxí Hànyǔ.', english: 'Yes, I\'m going to school to study Chinese.' },
        ],
      },
    ],
    grammarPoints: [
      {
        id: 1,
        titleChinese: '日期的表达(1)',
        titleEnglish: 'Expressing Dates (1): Month, Day, Day of Week',
        explanation: 'Dates in Chinese go from largest to smallest unit: Year → Month → Day → Day of Week.',
        structure: '几月 + 几号 + 星期几',
        examples: [
          { chinese: '三月八号', pinyin: 'sān yuè bā hào', english: 'March 8th' },
          { chinese: '今天几号？', pinyin: 'Jīntiān jǐ hào?', english: "What's today's date?" },
          { chinese: '星期一/二/三/四/五/六/日', pinyin: 'xīngqīyī/èr/sān/sì/wǔ/liù/rì', english: 'Mon/Tue/Wed/Thu/Fri/Sat/Sun' },
        ],
      },
      {
        id: 2,
        titleChinese: '名词谓语句',
        titleEnglish: 'Sentences with Nominal Predicates',
        explanation: 'In Chinese, time words (dates, days) can directly serve as predicates without "是".',
        structure: 'Subject + Time Word',
        examples: [
          { chinese: '今天三月八号。', pinyin: 'Jīntiān sān yuè bā hào.', english: 'Today is March 8th.' },
          { chinese: '明天星期三。', pinyin: 'Míngtiān xīngqīsān.', english: 'Tomorrow is Wednesday.' },
        ],
      },
      {
        id: 3,
        titleChinese: '连动句(1)',
        titleEnglish: 'Serial Verb Construction (1): Go + Place + Do What',
        explanation: 'When two or more verbs share the same subject, they appear in sequence. The first verb often indicates direction of movement.',
        structure: 'Subject + 去 + Place + Verb',
        examples: [
          { chinese: '我去学校学习汉语。', pinyin: 'Wǒ qù xuéxiào xuéxí Hànyǔ.', english: "I go to school to study Chinese." },
          { chinese: '她去商店买东西。', pinyin: 'Tā qù shāngdiàn mǎi dōngxi.', english: 'She goes to the store to buy things.' },
        ],
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: 'How do you say "What is today\'s date?" in Chinese?',
        options: ['今天星期几？', '今天几号？', '今天几月？', '今天几年？'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: 'What day is 星期三?',
        options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        answer: 2,
      },
      {
        type: 'multiple_choice',
        question: '"我去学校学习汉语" means:',
        options: ['I study Chinese at home', 'I go to school to study Chinese', 'I want to study Chinese', 'I like studying Chinese'],
        answer: 1,
      },
    ],
    writingCharacters: [
      { character: '月', pinyin: 'yuè', strokes: 4, meaning: 'month / moon' },
      { character: '日', pinyin: 'rì', strokes: 4, meaning: 'day / sun' },
      { character: '去', pinyin: 'qù', strokes: 5, meaning: 'to go' },
    ],
    speakingPrompts: [
      '今天几号？今天星期几？',
      '你明天去哪儿？去做什么？',
      '你的生日是几月几号？',
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 8: 我想喝茶 (I'd Like Some Tea)
  // ─────────────────────────────────────────────────────────────
  {
    id: 8,
    hskLevel: 1,
    titleChinese: '我想喝茶',
    titlePinyin: 'Wǒ xiǎng hē chá',
    titleEnglish: "I'd Like Some Tea",
    pageNumber: 56,
    vocabulary: [
      { id: 65, chinese: '想', pinyin: 'xiǎng', english: 'to want to; to think; to miss', partOfSpeech: 'v.' },
      { id: 66, chinese: '喝', pinyin: 'hē', english: 'to drink', partOfSpeech: 'v.' },
      { id: 67, chinese: '茶', pinyin: 'chá', english: 'tea', partOfSpeech: 'n.' },
      { id: 68, chinese: '吃', pinyin: 'chī', english: 'to eat', partOfSpeech: 'v.' },
      { id: 69, chinese: '米饭', pinyin: 'mǐfàn', english: 'cooked rice', partOfSpeech: 'n.' },
      { id: 70, chinese: '下午', pinyin: 'xiàwǔ', english: 'afternoon', partOfSpeech: 'n.' },
      { id: 71, chinese: '商店', pinyin: 'shāngdiàn', english: 'shop / store', partOfSpeech: 'n.' },
      { id: 72, chinese: '买', pinyin: 'mǎi', english: 'to buy', partOfSpeech: 'v.' },
      { id: 73, chinese: '个', pinyin: 'gè', english: 'general measure word', partOfSpeech: 'm.' },
      { id: 74, chinese: '杯子', pinyin: 'bēizi', english: 'cup / glass', partOfSpeech: 'n.' },
      { id: 75, chinese: '多少', pinyin: 'duōshao', english: 'how much / how many', partOfSpeech: 'pron.' },
      { id: 76, chinese: '钱', pinyin: 'qián', english: 'money', partOfSpeech: 'n.' },
      { id: 77, chinese: '块', pinyin: 'kuài', english: 'yuan (spoken)', partOfSpeech: 'm.' },
    ],
    dialogues: [
      {
        id: 1,
        titleChinese: '点饮料',
        titleEnglish: 'Ordering drinks',
        trackNumber: '08-1',
        lines: [
          { speaker: 'A', chinese: '你想喝什么？', pinyin: 'Nǐ xiǎng hē shénme?', english: 'What would you like to drink?' },
          { speaker: 'B', chinese: '我想喝茶。你呢？', pinyin: 'Wǒ xiǎng hē chá. Nǐ ne?', english: "I'd like tea. And you?" },
          { speaker: 'A', chinese: '我想喝水。', pinyin: 'Wǒ xiǎng hē shuǐ.', english: "I'd like water." },
        ],
      },
      {
        id: 2,
        titleChinese: '在商店',
        titleEnglish: 'In the store',
        trackNumber: '08-2',
        lines: [
          { speaker: 'A', chinese: '这个杯子多少钱？', pinyin: 'Zhège bēizi duōshao qián?', english: 'How much is this cup?' },
          { speaker: 'B', chinese: '二十块。', pinyin: 'Èrshí kuài.', english: '20 yuan.' },
          { speaker: 'A', chinese: '我买两个。', pinyin: 'Wǒ mǎi liǎng gè.', english: "I'll buy two." },
        ],
      },
      {
        id: 3,
        titleChinese: '下午计划',
        titleEnglish: 'Afternoon plans',
        trackNumber: '08-3',
        lines: [
          { speaker: 'A', chinese: '你下午想做什么？', pinyin: 'Nǐ xiàwǔ xiǎng zuò shénme?', english: 'What do you want to do this afternoon?' },
          { speaker: 'B', chinese: '我想去商店买东西。', pinyin: 'Wǒ xiǎng qù shāngdiàn mǎi dōngxi.', english: 'I want to go to the store to buy things.' },
        ],
      },
    ],
    grammarPoints: [
      {
        id: 1,
        titleChinese: '能愿动词"想"',
        titleEnglish: 'Modal Verb "想" — Want to / Would Like to',
        explanation: '"想" expresses a wish or desire. It is placed before the main verb.',
        structure: 'Subject + 想 + Verb',
        examples: [
          { chinese: '我想喝茶。', pinyin: 'Wǒ xiǎng hē chá.', english: "I'd like to drink tea." },
          { chinese: '她想去商店。', pinyin: 'Tā xiǎng qù shāngdiàn.', english: 'She wants to go to the store.' },
          { chinese: '你想吃什么？', pinyin: 'Nǐ xiǎng chī shénme?', english: 'What do you want to eat?' },
        ],
      },
      {
        id: 2,
        titleChinese: '疑问代词"多少"',
        titleEnglish: 'Interrogative Pronoun "多少" — How Much/Many',
        explanation: '"多少" asks about quantity. Unlike "几", it does not need a measure word and is used for larger or unknown numbers.',
        structure: '多少 + (Measure Word) + Noun',
        examples: [
          { chinese: '这个多少钱？', pinyin: 'Zhège duōshao qián?', english: 'How much is this?' },
          { chinese: '你有多少朋友？', pinyin: 'Nǐ yǒu duōshao péngyou?', english: 'How many friends do you have?' },
        ],
      },
      {
        id: 3,
        titleChinese: '量词"个"',
        titleEnglish: 'Measure Word "个" (general)',
        explanation: '"个" is the most common measure word in Chinese, used for people and many objects when no specific measure word applies.',
        structure: 'Number + 个 + Noun',
        examples: [
          { chinese: '两个杯子', pinyin: 'liǎng gè bēizi', english: 'two cups' },
          { chinese: '三个学生', pinyin: 'sān gè xuésheng', english: 'three students' },
          { chinese: '一个朋友', pinyin: 'yī gè péngyou', english: 'one friend' },
        ],
      },
      {
        id: 4,
        titleChinese: '钱数的表达',
        titleEnglish: 'Expressing Money Amounts',
        explanation: 'Chinese currency: 元/块 (yuan), 角/毛 (jiao = 0.1 yuan), 分 (fen = 0.01 yuan). In spoken Chinese, 块 and 毛 are used.',
        structure: 'Number + 块 (+ Number + 毛)',
        examples: [
          { chinese: '二十块', pinyin: 'èrshí kuài', english: '20 yuan' },
          { chinese: '五块五毛', pinyin: 'wǔ kuài wǔ máo', english: '5.5 yuan' },
          { chinese: '一百块', pinyin: 'yī bǎi kuài', english: '100 yuan' },
        ],
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: '"我想喝茶" means:',
        options: ["I can drink tea", "I'd like to drink tea", "I drink tea", "I don't want tea"],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: 'How do you ask "How much is this?"',
        options: ['这个几钱？', '这个多少钱？', '这个什么钱？', '这个有钱吗？'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: '"两个杯子" means:',
        options: ['one cup', 'two cups', 'three cups', 'a few cups'],
        answer: 1,
      },
    ],
    writingCharacters: [
      { character: '茶', pinyin: 'chá', strokes: 9, meaning: 'tea' },
      { character: '买', pinyin: 'mǎi', strokes: 6, meaning: 'to buy' },
      { character: '钱', pinyin: 'qián', strokes: 10, meaning: 'money' },
    ],
    speakingPrompts: [
      '你想喝什么？我想喝……',
      '在商店：这个多少钱？',
      '你下午想做什么？',
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 9: 你儿子在哪儿工作 (Where Does Your Son Work?)
  // ─────────────────────────────────────────────────────────────
  {
    id: 9,
    hskLevel: 1,
    titleChinese: '你儿子在哪儿工作',
    titlePinyin: 'Nǐ érzi zài nǎr gōngzuò',
    titleEnglish: 'Where Does Your Son Work?',
    pageNumber: 64,
    vocabulary: [
      { id: 78, chinese: '在', pinyin: 'zài', english: 'to be at/in; at (preposition)', partOfSpeech: 'v./prep.' },
      { id: 79, chinese: '哪儿', pinyin: 'nǎr', english: 'where', partOfSpeech: 'pron.' },
      { id: 80, chinese: '工作', pinyin: 'gōngzuò', english: 'to work; work/job', partOfSpeech: 'v./n.' },
      { id: 81, chinese: '儿子', pinyin: 'érzi', english: 'son', partOfSpeech: 'n.' },
      { id: 82, chinese: '医院', pinyin: 'yīyuàn', english: 'hospital', partOfSpeech: 'n.' },
      { id: 83, chinese: '医生', pinyin: 'yīshēng', english: 'doctor', partOfSpeech: 'n.' },
      { id: 84, chinese: '爸爸', pinyin: 'bàba', english: 'father / dad', partOfSpeech: 'n.' },
      { id: 85, chinese: '椅子', pinyin: 'yǐzi', english: 'chair', partOfSpeech: 'n.' },
      { id: 86, chinese: '下面', pinyin: 'xiàmian', english: 'under / below', partOfSpeech: 'n.' },
      { id: 87, chinese: '那儿', pinyin: 'nàr', english: 'there', partOfSpeech: 'pron.' },
    ],
    dialogues: [
      {
        id: 1,
        titleChinese: '问工作',
        titleEnglish: 'Asking about work',
        trackNumber: '09-1',
        lines: [
          { speaker: 'A', chinese: '你儿子在哪儿工作？', pinyin: 'Nǐ érzi zài nǎr gōngzuò?', english: 'Where does your son work?' },
          { speaker: 'B', chinese: '他在医院工作，他是医生。', pinyin: 'Tā zài yīyuàn gōngzuò, tā shì yīshēng.', english: 'He works at a hospital. He is a doctor.' },
        ],
      },
      {
        id: 2,
        titleChinese: '找东西',
        titleEnglish: 'Looking for something',
        trackNumber: '09-2',
        lines: [
          { speaker: 'A', chinese: '我的书在哪儿？', pinyin: 'Wǒ de shū zài nǎr?', english: 'Where is my book?' },
          { speaker: 'B', chinese: '在椅子下面。', pinyin: 'Zài yǐzi xiàmian.', english: "It's under the chair." },
        ],
      },
      {
        id: 3,
        titleChinese: '问位置',
        titleEnglish: 'Asking about location',
        trackNumber: '09-3',
        lines: [
          { speaker: 'A', chinese: '你爸爸在哪儿？', pinyin: 'Nǐ bàba zài nǎr?', english: 'Where is your father?' },
          { speaker: 'B', chinese: '他在那儿。', pinyin: 'Tā zài nàr.', english: "He's over there." },
        ],
      },
    ],
    grammarPoints: [
      {
        id: 1,
        titleChinese: '动词"在"',
        titleEnglish: 'Verb "在" — To Be Located At',
        explanation: '"在" as a verb means "to be at/in a place". It is used to indicate the location of a person or thing.',
        structure: 'Subject + 在 + Place',
        examples: [
          { chinese: '他在医院。', pinyin: 'Tā zài yīyuàn.', english: 'He is at the hospital.' },
          { chinese: '书在椅子下面。', pinyin: 'Shū zài yǐzi xiàmian.', english: 'The book is under the chair.' },
          { chinese: '你在哪儿？', pinyin: 'Nǐ zài nǎr?', english: 'Where are you?' },
        ],
      },
      {
        id: 2,
        titleChinese: '介词"在"',
        titleEnglish: 'Preposition "在" — At/In (doing something)',
        explanation: '"在" as a preposition indicates where an action takes place. It comes before the verb.',
        structure: 'Subject + 在 + Place + Verb',
        examples: [
          { chinese: '他在医院工作。', pinyin: 'Tā zài yīyuàn gōngzuò.', english: 'He works at the hospital.' },
          { chinese: '我在学校学习。', pinyin: 'Wǒ zài xuéxiào xuéxí.', english: 'I study at school.' },
        ],
      },
      {
        id: 3,
        titleChinese: '疑问代词"哪儿"',
        titleEnglish: 'Interrogative Pronoun "哪儿" — Where',
        explanation: '"哪儿" asks about location. It replaces the location in a statement.',
        structure: 'Subject + 在 + 哪儿？',
        examples: [
          { chinese: '你在哪儿？', pinyin: 'Nǐ zài nǎr?', english: 'Where are you?' },
          { chinese: '你儿子在哪儿工作？', pinyin: 'Nǐ érzi zài nǎr gōngzuò?', english: 'Where does your son work?' },
        ],
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: '"他在医院工作" means:',
        options: ['He is a doctor', 'He works at the hospital', 'He is at the hospital', 'He wants to work'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: 'How do you ask "Where are you?"',
        options: ['你在什么？', '你在哪儿？', '你去哪儿？', '你是哪儿人？'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: '"书在椅子下面" means:',
        options: ['The book is on the chair', 'The book is under the chair', 'The book is next to the chair', 'The book is in the chair'],
        answer: 1,
      },
    ],
    writingCharacters: [
      { character: '在', pinyin: 'zài', strokes: 6, meaning: 'to be at; at' },
      { character: '医', pinyin: 'yī', strokes: 7, meaning: 'medicine / doctor' },
      { character: '工', pinyin: 'gōng', strokes: 3, meaning: 'work' },
    ],
    speakingPrompts: [
      '你在哪儿学习汉语？',
      '你爸爸/妈妈在哪儿工作？他/她是做什么的？',
      '你的书/手机在哪儿？',
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 10: 我能坐这儿吗 (Can I Sit Here?)
  // ─────────────────────────────────────────────────────────────
  {
    id: 10,
    hskLevel: 1,
    titleChinese: '我能坐这儿吗',
    titlePinyin: 'Wǒ néng zuò zhèr ma',
    titleEnglish: 'Can I Sit Here?',
    pageNumber: 72,
    vocabulary: [
      { id: 88, chinese: '桌子', pinyin: 'zhuōzi', english: 'table / desk', partOfSpeech: 'n.' },
      { id: 89, chinese: '上', pinyin: 'shàng', english: 'on / above / up', partOfSpeech: 'n.' },
      { id: 90, chinese: '电脑', pinyin: 'diànnǎo', english: 'computer', partOfSpeech: 'n.' },
      { id: 91, chinese: '和', pinyin: 'hé', english: 'and (connecting nouns)', partOfSpeech: 'conj.' },
      { id: 92, chinese: '这儿', pinyin: 'zhèr', english: 'here', partOfSpeech: 'pron.' },
      { id: 93, chinese: '没有', pinyin: 'méiyǒu', english: 'do not have; there is no', partOfSpeech: 'v.' },
      { id: 94, chinese: '能', pinyin: 'néng', english: 'can / be able to', partOfSpeech: 'v.' },
      { id: 95, chinese: '坐', pinyin: 'zuò', english: 'to sit', partOfSpeech: 'v.' },
      { id: 96, chinese: '前面', pinyin: 'qiánmian', english: 'in front / ahead', partOfSpeech: 'n.' },
      { id: 97, chinese: '后面', pinyin: 'hòumian', english: 'behind / at the back', partOfSpeech: 'n.' },
    ],
    dialogues: [
      {
        id: 1,
        titleChinese: '找座位',
        titleEnglish: 'Finding a seat',
        trackNumber: '10-1',
        lines: [
          { speaker: 'A', chinese: '我能坐这儿吗？', pinyin: 'Wǒ néng zuò zhèr ma?', english: 'Can I sit here?' },
          { speaker: 'B', chinese: '能，请坐。', pinyin: 'Néng, qǐng zuò.', english: 'Yes, please sit down.' },
        ],
      },
      {
        id: 2,
        titleChinese: '桌子上有什么',
        titleEnglish: "What's on the table",
        trackNumber: '10-2',
        lines: [
          { speaker: 'A', chinese: '桌子上有什么？', pinyin: 'Zhuōzi shàng yǒu shénme?', english: "What's on the table?" },
          { speaker: 'B', chinese: '桌子上有电脑和书。', pinyin: 'Zhuōzi shàng yǒu diànnǎo hé shū.', english: "There are a computer and books on the table." },
        ],
      },
      {
        id: 3,
        titleChinese: '问位置',
        titleEnglish: 'Asking about position',
        trackNumber: '10-3',
        lines: [
          { speaker: 'A', chinese: '老师在哪儿？', pinyin: 'Lǎoshī zài nǎr?', english: 'Where is the teacher?' },
          { speaker: 'B', chinese: '老师在前面，学生在后面。', pinyin: 'Lǎoshī zài qiánmian, xuésheng zài hòumian.', english: 'The teacher is in front, the students are in the back.' },
        ],
      },
    ],
    grammarPoints: [
      {
        id: 1,
        titleChinese: '"有"字句：表示存在',
        titleEnglish: '"有" Sentences: Expressing Existence',
        explanation: '"有" can mean "there is/are" when the subject is a location. The structure is: Place + 有 + Object.',
        structure: 'Place + 有 + Object',
        examples: [
          { chinese: '桌子上有电脑。', pinyin: 'Zhuōzi shàng yǒu diànnǎo.', english: 'There is a computer on the table.' },
          { chinese: '学校里有很多学生。', pinyin: 'Xuéxiào lǐ yǒu hěn duō xuésheng.', english: 'There are many students in the school.' },
          { chinese: '这儿没有椅子。', pinyin: 'Zhèr méiyǒu yǐzi.', english: "There are no chairs here." },
        ],
      },
      {
        id: 2,
        titleChinese: '连词"和"',
        titleEnglish: 'Conjunction "和" — And (connecting nouns)',
        explanation: '"和" connects nouns and pronouns. It cannot connect verb phrases or sentences (unlike English "and").',
        structure: 'Noun + 和 + Noun',
        examples: [
          { chinese: '电脑和书', pinyin: 'diànnǎo hé shū', english: 'computer and books' },
          { chinese: '我和她', pinyin: 'wǒ hé tā', english: 'she and I' },
          { chinese: '老师和学生', pinyin: 'lǎoshī hé xuésheng', english: 'teachers and students' },
        ],
      },
      {
        id: 3,
        titleChinese: '能愿动词"能"',
        titleEnglish: 'Modal Verb "能" — Can (physical ability / permission)',
        explanation: '"能" expresses physical ability or permission. It differs from "会" (learned skill) and "可以" (permission).',
        structure: 'Subject + 能 + Verb',
        examples: [
          { chinese: '我能坐这儿吗？', pinyin: 'Wǒ néng zuò zhèr ma?', english: 'Can I sit here?' },
          { chinese: '他能喝很多茶。', pinyin: 'Tā néng hē hěn duō chá.', english: 'He can drink a lot of tea.' },
        ],
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: '"桌子上有电脑和书" means:',
        options: ['The computer is under the table', 'There is a computer and books on the table', 'The table has no computer', 'I want a computer and books'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: 'How do you ask "Can I sit here?"',
        options: ['我想坐这儿。', '我能坐这儿吗？', '我坐这儿吗？', '我会坐这儿吗？'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: '"和" is used to connect:',
        options: ['Verbs', 'Sentences', 'Nouns and pronouns', 'Adjectives'],
        answer: 2,
      },
    ],
    writingCharacters: [
      { character: '上', pinyin: 'shàng', strokes: 3, meaning: 'on / above' },
      { character: '下', pinyin: 'xià', strokes: 3, meaning: 'under / below' },
      { character: '前', pinyin: 'qián', strokes: 9, meaning: 'front / before' },
      { character: '后', pinyin: 'hòu', strokes: 6, meaning: 'back / after' },
    ],
    speakingPrompts: [
      '你的桌子上有什么？',
      '请问，我能坐这儿吗？',
      '教室的前面/后面有什么？',
    ],
    culturalNote: 'In Chinese restaurants and cafes, it is common to ask "我能坐这儿吗？" before sitting at a table, even if it appears empty, as seats may be reserved.',
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 11: 现在几点 (What Time Is It Now?)
  // ─────────────────────────────────────────────────────────────
  {
    id: 11,
    hskLevel: 1,
    titleChinese: '现在几点',
    titlePinyin: 'Xiànzài jǐ diǎn',
    titleEnglish: 'What Time Is It Now?',
    pageNumber: 82,
    vocabulary: [
      { id: 98, chinese: '现在', pinyin: 'xiànzài', english: 'now / at present', partOfSpeech: 'n.' },
      { id: 99, chinese: '点', pinyin: 'diǎn', english: "o'clock", partOfSpeech: 'n.' },
      { id: 100, chinese: '分', pinyin: 'fēn', english: 'minute', partOfSpeech: 'n.' },
      { id: 101, chinese: '中午', pinyin: 'zhōngwǔ', english: 'noon / midday', partOfSpeech: 'n.' },
      { id: 102, chinese: '吃饭', pinyin: 'chīfàn', english: 'to eat (a meal)', partOfSpeech: 'v.' },
      { id: 103, chinese: '时候', pinyin: 'shíhou', english: 'time / moment / when', partOfSpeech: 'n.' },
      { id: 104, chinese: '回', pinyin: 'huí', english: 'to return / to go back', partOfSpeech: 'v.' },
      { id: 105, chinese: '我们', pinyin: 'wǒmen', english: 'we / us', partOfSpeech: 'pron.' },
      { id: 106, chinese: '电影', pinyin: 'diànyǐng', english: 'movie / film', partOfSpeech: 'n.' },
      { id: 107, chinese: '上午', pinyin: 'shàngwǔ', english: 'morning (before noon)', partOfSpeech: 'n.' },
    ],
    dialogues: [
      {
        id: 1,
        titleChinese: '问时间',
        titleEnglish: 'Asking the time',
        trackNumber: '11-1',
        lines: [
          { speaker: 'A', chinese: '现在几点？', pinyin: 'Xiànzài jǐ diǎn?', english: 'What time is it now?' },
          { speaker: 'B', chinese: '现在十一点二十分。', pinyin: 'Xiànzài shíyī diǎn èrshí fēn.', english: "It's 11:20 now." },
        ],
      },
      {
        id: 2,
        titleChinese: '约吃饭',
        titleEnglish: 'Arranging to eat',
        trackNumber: '11-2',
        lines: [
          { speaker: 'A', chinese: '你什么时候吃饭？', pinyin: 'Nǐ shénme shíhou chīfàn?', english: 'When do you eat?' },
          { speaker: 'B', chinese: '我中午十二点吃饭。', pinyin: 'Wǒ zhōngwǔ shí\'èr diǎn chīfàn.', english: 'I eat at noon, 12 o\'clock.' },
        ],
      },
      {
        id: 3,
        titleChinese: '看电影',
        titleEnglish: 'Watching a movie',
        trackNumber: '11-3',
        lines: [
          { speaker: 'A', chinese: '我们几点去看电影？', pinyin: 'Wǒmen jǐ diǎn qù kàn diànyǐng?', english: 'What time are we going to watch the movie?' },
          { speaker: 'B', chinese: '下午三点半，怎么样？', pinyin: 'Xiàwǔ sān diǎn bàn, zěnmeyàng?', english: '3:30 in the afternoon, how about that?' },
          { speaker: 'A', chinese: '好的！', pinyin: 'Hǎo de!', english: 'Great!' },
        ],
      },
    ],
    grammarPoints: [
      {
        id: 1,
        titleChinese: '时间的表达',
        titleEnglish: 'Expressing Time',
        explanation: 'Time in Chinese: 点 = o\'clock, 分 = minute, 半 = half (30 min), 刻 = quarter (15 min).',
        structure: 'Number + 点 + Number + 分',
        examples: [
          { chinese: '三点 (3:00)', pinyin: 'sān diǎn', english: "three o'clock" },
          { chinese: '三点半 (3:30)', pinyin: 'sān diǎn bàn', english: 'three thirty / half past three' },
          { chinese: '三点一刻 (3:15)', pinyin: 'sān diǎn yī kè', english: 'quarter past three' },
          { chinese: '三点二十分 (3:20)', pinyin: 'sān diǎn èrshí fēn', english: 'three twenty' },
        ],
      },
      {
        id: 2,
        titleChinese: '时间词做状语',
        titleEnglish: 'Time Words as Adverbials',
        explanation: 'Time words in Chinese come BEFORE the verb (unlike English where they often come after).',
        structure: 'Subject + Time + Verb + Object',
        examples: [
          { chinese: '我中午吃饭。', pinyin: 'Wǒ zhōngwǔ chīfàn.', english: 'I eat at noon.' },
          { chinese: '她下午三点回家。', pinyin: 'Tā xiàwǔ sān diǎn huí jiā.', english: 'She goes home at 3pm.' },
          { chinese: '我们明天去看电影。', pinyin: 'Wǒmen míngtiān qù kàn diànyǐng.', english: "We're going to watch a movie tomorrow." },
        ],
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: 'How do you say "It\'s 3:30"?',
        options: ['三点三十', '三点半', '三十三点', '三点三'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: '"你什么时候吃饭？" means:',
        options: ['What do you eat?', 'Where do you eat?', 'When do you eat?', 'Do you want to eat?'],
        answer: 2,
      },
      {
        type: 'multiple_choice',
        question: 'In Chinese, where does the time word go in a sentence?',
        options: ['After the verb', 'At the end', 'Before the verb', 'Before the subject'],
        answer: 2,
      },
    ],
    writingCharacters: [
      { character: '点', pinyin: 'diǎn', strokes: 9, meaning: "o'clock / dot" },
      { character: '分', pinyin: 'fēn', strokes: 4, meaning: 'minute / divide' },
      { character: '回', pinyin: 'huí', strokes: 6, meaning: 'to return' },
    ],
    speakingPrompts: [
      '现在几点？',
      '你什么时候吃饭/睡觉/去学校？',
      '我们几点去……？',
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 12: 明天天气怎么样 (What Will the Weather Be Like Tomorrow?)
  // ─────────────────────────────────────────────────────────────
  {
    id: 12,
    hskLevel: 1,
    titleChinese: '明天天气怎么样',
    titlePinyin: 'Míngtiān tiānqì zěnmeyàng',
    titleEnglish: 'What Will the Weather Be Like Tomorrow?',
    pageNumber: 90,
    vocabulary: [
      { id: 108, chinese: '天气', pinyin: 'tiānqì', english: 'weather', partOfSpeech: 'n.' },
      { id: 109, chinese: '怎么样', pinyin: 'zěnmeyàng', english: 'how / what is it like', partOfSpeech: 'pron.' },
      { id: 110, chinese: '热', pinyin: 'rè', english: 'hot', partOfSpeech: 'adj.' },
      { id: 111, chinese: '冷', pinyin: 'lěng', english: 'cold', partOfSpeech: 'adj.' },
      { id: 112, chinese: '下雨', pinyin: 'xià yǔ', english: 'to rain', partOfSpeech: 'v.' },
      { id: 113, chinese: '小姐', pinyin: 'xiǎojiě', english: 'Miss / young woman', partOfSpeech: 'n.' },
      { id: 114, chinese: '来', pinyin: 'lái', english: 'to come', partOfSpeech: 'v.' },
      { id: 115, chinese: '身体', pinyin: 'shēntǐ', english: 'body / health', partOfSpeech: 'n.' },
      { id: 116, chinese: '爱', pinyin: 'ài', english: 'to love; love', partOfSpeech: 'v./n.' },
      { id: 117, chinese: '水果', pinyin: 'shuǐguǒ', english: 'fruit', partOfSpeech: 'n.' },
    ],
    dialogues: [
      {
        id: 1,
        titleChinese: '问天气',
        titleEnglish: 'Asking about the weather',
        trackNumber: '12-1',
        lines: [
          { speaker: 'A', chinese: '明天天气怎么样？', pinyin: 'Míngtiān tiānqì zěnmeyàng?', english: 'What will the weather be like tomorrow?' },
          { speaker: 'B', chinese: '明天会下雨。', pinyin: 'Míngtiān huì xià yǔ.', english: 'It will rain tomorrow.' },
        ],
      },
      {
        id: 2,
        titleChinese: '今天太热了',
        titleEnglish: "It's too hot today",
        trackNumber: '12-2',
        lines: [
          { speaker: 'A', chinese: '今天天气怎么样？', pinyin: 'Jīntiān tiānqì zěnmeyàng?', english: "What's the weather like today?" },
          { speaker: 'B', chinese: '太热了！', pinyin: 'Tài rè le!', english: "It's too hot!" },
          { speaker: 'A', chinese: '是啊，我不喜欢热天气。', pinyin: 'Shì a, wǒ bù xǐhuan rè tiānqì.', english: "Yes, I don't like hot weather." },
        ],
      },
      {
        id: 3,
        titleChinese: '问身体',
        titleEnglish: 'Asking about health',
        trackNumber: '12-3',
        lines: [
          { speaker: 'A', chinese: '你身体怎么样？', pinyin: 'Nǐ shēntǐ zěnmeyàng?', english: 'How is your health?' },
          { speaker: 'B', chinese: '很好，谢谢。我爱吃水果，对身体好。', pinyin: 'Hěn hǎo, xièxie. Wǒ ài chī shuǐguǒ, duì shēntǐ hǎo.', english: "Very good, thank you. I love eating fruit, it's good for health." },
        ],
      },
    ],
    grammarPoints: [
      {
        id: 1,
        titleChinese: '疑问代词"怎么样"',
        titleEnglish: 'Interrogative Pronoun "怎么样" — How / What is it like',
        explanation: '"怎么样" asks about the condition, quality, or opinion of something.',
        structure: 'Subject + 怎么样？',
        examples: [
          { chinese: '天气怎么样？', pinyin: 'Tiānqì zěnmeyàng?', english: "What's the weather like?" },
          { chinese: '你身体怎么样？', pinyin: 'Nǐ shēntǐ zěnmeyàng?', english: 'How is your health?' },
          { chinese: '这个菜怎么样？', pinyin: 'Zhège cài zěnmeyàng?', english: 'How is this dish?' },
        ],
      },
      {
        id: 2,
        titleChinese: '主谓谓语句',
        titleEnglish: 'Subject-Predicate Predicate Sentences',
        explanation: 'In these sentences, the predicate itself is a subject-predicate structure. The first subject sets the topic.',
        structure: 'Topic + Subject + Predicate',
        examples: [
          { chinese: '他身体很好。', pinyin: 'Tā shēntǐ hěn hǎo.', english: 'His health is very good.' },
          { chinese: '今天天气很热。', pinyin: 'Jīntiān tiānqì hěn rè.', english: "Today's weather is very hot." },
        ],
      },
      {
        id: 3,
        titleChinese: '程度副词"太"',
        titleEnglish: 'Degree Adverb "太" — Too / Extremely',
        explanation: '"太...了" expresses that something is excessive or extreme. The "了" at the end is required.',
        structure: '太 + Adjective + 了',
        examples: [
          { chinese: '太热了！', pinyin: 'Tài rè le!', english: "It's too hot!" },
          { chinese: '太好了！', pinyin: 'Tài hǎo le!', english: "That's great! / Excellent!" },
          { chinese: '太贵了！', pinyin: 'Tài guì le!', english: "It's too expensive!" },
        ],
      },
      {
        id: 4,
        titleChinese: '能愿动词"会"(2)',
        titleEnglish: 'Modal Verb "会" (2) — Will / Likely to Happen',
        explanation: '"会" can also express a future possibility or prediction.',
        structure: 'Subject + 会 + Verb',
        examples: [
          { chinese: '明天会下雨。', pinyin: 'Míngtiān huì xià yǔ.', english: 'It will rain tomorrow.' },
          { chinese: '她会来吗？', pinyin: 'Tā huì lái ma?', english: 'Will she come?' },
        ],
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: 'How do you ask "What\'s the weather like?"',
        options: ['天气怎么了？', '天气怎么样？', '天气是什么？', '天气好吗？'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: '"太热了！" means:',
        options: ["It's a bit hot", "It's not hot", "It's too hot!", "It's very hot"],
        answer: 2,
      },
      {
        type: 'multiple_choice',
        question: '"明天会下雨" means:',
        options: ['It rained yesterday', 'It is raining now', 'It will rain tomorrow', 'It might rain'],
        answer: 2,
      },
    ],
    writingCharacters: [
      { character: '天', pinyin: 'tiān', strokes: 4, meaning: 'sky / day' },
      { character: '气', pinyin: 'qì', strokes: 4, meaning: 'air / gas / weather' },
      { character: '热', pinyin: 'rè', strokes: 10, meaning: 'hot' },
      { character: '冷', pinyin: 'lěng', strokes: 7, meaning: 'cold' },
    ],
    speakingPrompts: [
      '今天/明天天气怎么样？',
      '你喜欢什么天气？为什么？',
      '你身体怎么样？',
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 13: 他在学做中国菜呢 (He Is Learning to Cook Chinese Food)
  // ─────────────────────────────────────────────────────────────
  {
    id: 13,
    hskLevel: 1,
    titleChinese: '他在学做中国菜呢',
    titlePinyin: 'Tā zài xué zuò Zhōngguó cài ne',
    titleEnglish: 'He Is Learning to Cook Chinese Food',
    pageNumber: 98,
    vocabulary: [
      { id: 118, chinese: '喂', pinyin: 'wèi', english: 'hello (on phone) / hey', partOfSpeech: 'interj.' },
      { id: 119, chinese: '学习', pinyin: 'xuéxí', english: 'to study / to learn', partOfSpeech: 'v.' },
      { id: 120, chinese: '上午', pinyin: 'shàngwǔ', english: 'morning (before noon)', partOfSpeech: 'n.' },
      { id: 121, chinese: '睡觉', pinyin: 'shuìjiào', english: 'to sleep', partOfSpeech: 'v.' },
      { id: 122, chinese: '电视', pinyin: 'diànshì', english: 'television / TV', partOfSpeech: 'n.' },
      { id: 123, chinese: '喜欢', pinyin: 'xǐhuan', english: 'to like / to be fond of', partOfSpeech: 'v.' },
      { id: 124, chinese: '打电话', pinyin: 'dǎ diànhuà', english: 'to make a phone call', partOfSpeech: 'v.' },
      { id: 125, chinese: '吧', pinyin: 'ba', english: 'particle (suggestion/assumption)', partOfSpeech: 'part.' },
    ],
    dialogues: [
      {
        id: 1,
        titleChinese: '打电话',
        titleEnglish: 'Making a phone call',
        trackNumber: '13-1',
        lines: [
          { speaker: 'A', chinese: '喂，大卫在吗？', pinyin: 'Wèi, Dàwèi zài ma?', english: 'Hello, is David there?' },
          { speaker: 'B', chinese: '他在，他在学做中国菜呢。', pinyin: 'Tā zài, tā zài xué zuò Zhōngguó cài ne.', english: "He's here. He's learning to cook Chinese food." },
          { speaker: 'A', chinese: '他喜欢做菜吗？', pinyin: 'Tā xǐhuan zuò cài ma?', english: 'Does he like cooking?' },
          { speaker: 'B', chinese: '很喜欢！', pinyin: 'Hěn xǐhuan!', english: 'Very much!' },
        ],
      },
      {
        id: 2,
        titleChinese: '问在做什么',
        titleEnglish: 'Asking what someone is doing',
        trackNumber: '13-2',
        lines: [
          { speaker: 'A', chinese: '你在做什么呢？', pinyin: 'Nǐ zài zuò shénme ne?', english: 'What are you doing?' },
          { speaker: 'B', chinese: '我在看电视呢。', pinyin: 'Wǒ zài kàn diànshì ne.', english: "I'm watching TV." },
        ],
      },
      {
        id: 3,
        titleChinese: '猜测',
        titleEnglish: 'Making assumptions',
        trackNumber: '13-3',
        lines: [
          { speaker: 'A', chinese: '她在睡觉吧？', pinyin: 'Tā zài shuìjiào ba?', english: "She's sleeping, isn't she?" },
          { speaker: 'B', chinese: '不，她在学习呢。', pinyin: 'Bù, tā zài xuéxí ne.', english: "No, she's studying." },
        ],
      },
    ],
    grammarPoints: [
      {
        id: 1,
        titleChinese: '"在……呢"表示动作正在进行',
        titleEnglish: '"在...呢" — Expressing an Ongoing Action (Present Progressive)',
        explanation: '"在" before a verb and "呢" at the end of a sentence indicate that an action is currently in progress.',
        structure: 'Subject + 在 + Verb + (Object) + 呢',
        examples: [
          { chinese: '他在学做中国菜呢。', pinyin: 'Tā zài xué zuò Zhōngguó cài ne.', english: 'He is learning to cook Chinese food.' },
          { chinese: '我在看电视呢。', pinyin: 'Wǒ zài kàn diànshì ne.', english: "I'm watching TV." },
          { chinese: '她在睡觉呢。', pinyin: 'Tā zài shuìjiào ne.', english: "She's sleeping." },
        ],
      },
      {
        id: 2,
        titleChinese: '语气助词"吧"',
        titleEnglish: 'Modal Particle "吧" — Assumption/Suggestion',
        explanation: '"吧" at the end of a sentence softens a statement into an assumption or suggestion.',
        structure: 'Statement + 吧？',
        examples: [
          { chinese: '她在睡觉吧？', pinyin: 'Tā zài shuìjiào ba?', english: "She's sleeping, right?" },
          { chinese: '你是学生吧？', pinyin: 'Nǐ shì xuésheng ba?', english: "You're a student, aren't you?" },
          { chinese: '我们走吧。', pinyin: 'Wǒmen zǒu ba.', english: "Let's go." },
        ],
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: '"他在看电视呢" means:',
        options: ['He watched TV', 'He wants to watch TV', 'He is watching TV', 'He likes watching TV'],
        answer: 2,
      },
      {
        type: 'multiple_choice',
        question: 'What does "吧" indicate at the end of a question?',
        options: ['A yes/no question', 'An assumption or seeking confirmation', 'A command', 'Surprise'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: 'How do you say "What are you doing?" in Chinese?',
        options: ['你做什么？', '你在做什么呢？', '你想做什么？', '你会做什么？'],
        answer: 1,
      },
    ],
    writingCharacters: [
      { character: '学', pinyin: 'xué', strokes: 8, meaning: 'to study / to learn' },
      { character: '习', pinyin: 'xí', strokes: 3, meaning: 'to practice' },
      { character: '看', pinyin: 'kàn', strokes: 9, meaning: 'to look / to watch' },
    ],
    speakingPrompts: [
      '你现在在做什么呢？',
      '你喜欢做什么？',
      '猜猜：他/她在做什么吧？',
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 14: 她买了不少衣服 (She Has Bought Quite a Few Clothes)
  // ─────────────────────────────────────────────────────────────
  {
    id: 14,
    hskLevel: 1,
    titleChinese: '她买了不少衣服',
    titlePinyin: 'Tā mǎi le bù shǎo yīfu',
    titleEnglish: 'She Has Bought Quite a Few Clothes',
    pageNumber: 104,
    vocabulary: [
      { id: 126, chinese: '东西', pinyin: 'dōngxi', english: 'thing / stuff', partOfSpeech: 'n.' },
      { id: 127, chinese: '一点儿', pinyin: 'yīdiǎnr', english: 'a little / a bit', partOfSpeech: 'n.' },
      { id: 128, chinese: '苹果', pinyin: 'píngguǒ', english: 'apple', partOfSpeech: 'n.' },
      { id: 129, chinese: '开', pinyin: 'kāi', english: 'to open; to drive', partOfSpeech: 'v.' },
      { id: 130, chinese: '回来', pinyin: 'huílai', english: 'to come back / to return', partOfSpeech: 'v.' },
      { id: 131, chinese: '分钟', pinyin: 'fēnzhōng', english: 'minute (duration)', partOfSpeech: 'n.' },
      { id: 132, chinese: '后', pinyin: 'hòu', english: 'after / later', partOfSpeech: 'n.' },
      { id: 133, chinese: '衣服', pinyin: 'yīfu', english: 'clothes', partOfSpeech: 'n.' },
      { id: 134, chinese: '漂亮', pinyin: 'piàoliang', english: 'beautiful / pretty', partOfSpeech: 'adj.' },
      { id: 135, chinese: '都', pinyin: 'dōu', english: 'all / both', partOfSpeech: 'adv.' },
    ],
    dialogues: [
      {
        id: 1,
        titleChinese: '买衣服回来了',
        titleEnglish: 'Back from shopping for clothes',
        trackNumber: '14-1',
        lines: [
          { speaker: 'A', chinese: '你买了什么东西？', pinyin: 'Nǐ mǎi le shénme dōngxi?', english: 'What did you buy?' },
          { speaker: 'B', chinese: '我买了不少衣服。', pinyin: 'Wǒ mǎi le bù shǎo yīfu.', english: 'I bought quite a few clothes.' },
          { speaker: 'A', chinese: '都很漂亮！', pinyin: 'Dōu hěn piàoliang!', english: "They're all very beautiful!" },
        ],
      },
      {
        id: 2,
        titleChinese: '等一会儿',
        titleEnglish: 'Wait a moment',
        trackNumber: '14-2',
        lines: [
          { speaker: 'A', chinese: '她回来了吗？', pinyin: 'Tā huílai le ma?', english: 'Has she come back?' },
          { speaker: 'B', chinese: '还没有，她说二十分钟后回来。', pinyin: 'Hái méiyǒu, tā shuō èrshí fēnzhōng hòu huílai.', english: "Not yet. She said she'd be back in 20 minutes." },
        ],
      },
      {
        id: 3,
        titleChinese: '买苹果',
        titleEnglish: 'Buying apples',
        trackNumber: '14-3',
        lines: [
          { speaker: 'A', chinese: '你买了多少苹果？', pinyin: 'Nǐ mǎi le duōshao píngguǒ?', english: 'How many apples did you buy?' },
          { speaker: 'B', chinese: '我买了一点儿。', pinyin: 'Wǒ mǎi le yīdiǎnr.', english: 'I bought a few.' },
        ],
      },
    ],
    grammarPoints: [
      {
        id: 1,
        titleChinese: '"了"表发生或完成',
        titleEnglish: '"了" Indicating Completion of an Action',
        explanation: '"了" placed after a verb indicates that the action has been completed.',
        structure: 'Subject + Verb + 了 + Object',
        examples: [
          { chinese: '她买了衣服。', pinyin: 'Tā mǎi le yīfu.', english: 'She bought clothes.' },
          { chinese: '我吃了米饭。', pinyin: 'Wǒ chī le mǐfàn.', english: 'I ate rice.' },
          { chinese: '他回来了。', pinyin: 'Tā huílai le.', english: 'He has come back.' },
        ],
      },
      {
        id: 2,
        titleChinese: '副词"都"',
        titleEnglish: 'Adverb "都" — All / Both',
        explanation: '"都" means "all" or "both". It comes before the verb and refers to a plural subject or object.',
        structure: 'Plural Subject + 都 + Verb',
        examples: [
          { chinese: '衣服都很漂亮。', pinyin: 'Yīfu dōu hěn piàoliang.', english: 'All the clothes are very beautiful.' },
          { chinese: '我们都是学生。', pinyin: 'Wǒmen dōu shì xuésheng.', english: 'We are all students.' },
          { chinese: '他们都喜欢喝茶。', pinyin: 'Tāmen dōu xǐhuan hē chá.', english: 'They all like drinking tea.' },
        ],
      },
      {
        id: 3,
        titleChinese: '名词"后"',
        titleEnglish: 'Noun "后" — After / Later',
        explanation: '"后" means "after" or "later" when used with a time expression.',
        structure: 'Time + 后',
        examples: [
          { chinese: '二十分钟后', pinyin: 'èrshí fēnzhōng hòu', english: 'after 20 minutes / in 20 minutes' },
          { chinese: '三天后', pinyin: 'sān tiān hòu', english: 'three days later' },
          { chinese: '吃饭后', pinyin: 'chīfàn hòu', english: 'after eating' },
        ],
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: '"她买了衣服" means:',
        options: ['She wants to buy clothes', 'She bought clothes', 'She is buying clothes', 'She has clothes'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: '"我们都是学生" means:',
        options: ['We are students', 'We are all students', 'Some of us are students', 'I am a student'],
        answer: 1,
      },
      {
        type: 'multiple_choice',
        question: '"二十分钟后" means:',
        options: ['20 minutes ago', 'for 20 minutes', 'after 20 minutes / in 20 minutes', 'at 20 minutes'],
        answer: 2,
      },
    ],
    writingCharacters: [
      { character: '买', pinyin: 'mǎi', strokes: 6, meaning: 'to buy' },
      { character: '来', pinyin: 'lái', strokes: 7, meaning: 'to come' },
      { character: '都', pinyin: 'dōu', strokes: 10, meaning: 'all / both' },
    ],
    speakingPrompts: [
      '你买了什么东西？',
      '你的衣服都很漂亮！',
      '你……分钟后回来吗？',
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 15: 我是坐飞机来的 (I Came Here by Air)
  // ─────────────────────────────────────────────────────────────
  {
    id: 15,
    hskLevel: 1,
    titleChinese: '我是坐飞机来的',
    titlePinyin: 'Wǒ shì zuò fēijī lái de',
    titleEnglish: 'I Came Here by Air',
    pageNumber: 112,
    vocabulary: [
      { id: 136, chinese: '认识', pinyin: 'rènshi', english: 'to know (a person) / to recognize', partOfSpeech: 'v.' },
      { id: 137, chinese: '年', pinyin: 'nián', english: 'year', partOfSpeech: 'n.' },
      { id: 138, chinese: '大学', pinyin: 'dàxué', english: 'university / college', partOfSpeech: 'n.' },
      { id: 139, chinese: '饭店', pinyin: 'fàndiàn', english: 'hotel / restaurant', partOfSpeech: 'n.' },
      { id: 140, chinese: '出租车', pinyin: 'chūzūchē', english: 'taxi', partOfSpeech: 'n.' },
      { id: 141, chinese: '一起', pinyin: 'yīqǐ', english: 'together', partOfSpeech: 'adv.' },
      { id: 142, chinese: '高兴', pinyin: 'gāoxìng', english: 'happy / glad', partOfSpeech: 'adj.' },
      { id: 143, chinese: '听', pinyin: 'tīng', english: 'to listen / to hear', partOfSpeech: 'v.' },
      { id: 144, chinese: '飞机', pinyin: 'fēijī', english: 'airplane', partOfSpeech: 'n.' },
    ],
    dialogues: [
      {
        id: 1,
        titleChinese: '初次见面',
        titleEnglish: 'Meeting for the first time',
        trackNumber: '15-1',
        lines: [
          { speaker: 'A', chinese: '认识你很高兴！', pinyin: 'Rènshi nǐ hěn gāoxìng!', english: 'Nice to meet you!' },
          { speaker: 'B', chinese: '我也很高兴认识你！', pinyin: 'Wǒ yě hěn gāoxìng rènshi nǐ!', english: 'Nice to meet you too!' },
        ],
      },
      {
        id: 2,
        titleChinese: '怎么来的',
        titleEnglish: 'How did you get here',
        trackNumber: '15-2',
        lines: [
          { speaker: 'A', chinese: '你是怎么来北京的？', pinyin: 'Nǐ shì zěnme lái Běijīng de?', english: 'How did you come to Beijing?' },
          { speaker: 'B', chinese: '我是坐飞机来的。你呢？', pinyin: 'Wǒ shì zuò fēijī lái de. Nǐ ne?', english: 'I came by plane. And you?' },
          { speaker: 'A', chinese: '我是坐出租车来的。', pinyin: 'Wǒ shì zuò chūzūchē lái de.', english: 'I came by taxi.' },
        ],
      },
      {
        id: 3,
        titleChinese: '问什么时候来的',
        titleEnglish: 'Asking when someone arrived',
        trackNumber: '15-3',
        lines: [
          { speaker: 'A', chinese: '你是什么时候来中国的？', pinyin: 'Nǐ shì shénme shíhou lái Zhōngguó de?', english: 'When did you come to China?' },
          { speaker: 'B', chinese: '我是去年九月来的。', pinyin: 'Wǒ shì qùnián jiǔ yuè lái de.', english: 'I came last September.' },
        ],
      },
    ],
    grammarPoints: [
      {
        id: 1,
        titleChinese: '"是……的"句：强调时间、地点、方式',
        titleEnglish: '"是...的" Construction: Emphasizing Time, Place, or Manner',
        explanation: 'The "是...的" construction emphasizes when, where, or how a past action occurred. "是" comes before the emphasized element, "的" comes at the end.',
        structure: 'Subject + 是 + [Time/Place/Manner] + Verb + 的',
        examples: [
          { chinese: '我是坐飞机来的。', pinyin: 'Wǒ shì zuò fēijī lái de.', english: 'I came by plane. (emphasizing manner)' },
          { chinese: '她是昨天来的。', pinyin: 'Tā shì zuótiān lái de.', english: 'She came yesterday. (emphasizing time)' },
          { chinese: '他是在北京学的汉语。', pinyin: 'Tā shì zài Běijīng xué de Hànyǔ.', english: 'He learned Chinese in Beijing. (emphasizing place)' },
        ],
      },
      {
        id: 2,
        titleChinese: '日期的表达(2)',
        titleEnglish: 'Expressing Dates (2): Year, Month, Day',
        explanation: 'Full date expression in Chinese goes from largest to smallest: Year + Month + Day + Day of Week.',
        structure: 'Year年 + Month月 + Day号/日 + 星期X',
        examples: [
          { chinese: '二〇二四年三月八号', pinyin: 'èr líng èr sì nián sān yuè bā hào', english: 'March 8, 2024' },
          { chinese: '去年九月', pinyin: 'qùnián jiǔ yuè', english: 'last September' },
          { chinese: '今年一月一号', pinyin: 'jīnnián yī yuè yī hào', english: 'January 1st this year' },
        ],
      },
    ],
    exercises: [
      {
        type: 'multiple_choice',
        question: 'Which sentence uses the correct pattern?',
        options: ['I came by plane.', 'I plane came by.', 'By plane I came.', 'Came I by plane.'],
        answer: 0,
      },
      {
        type: 'translate',
        question: 'I came to China last year.',
        answer: 'I came to China last year.',
      },
      {
        type: 'fill_blank',
        question: 'Nice to meet you! (happy to know you)',
        answer: 'happy',
      },
    ],
    writingCharacters: [
      { character: '\u8ba4', pinyin: 'ren', strokes: 4, meaning: 'to recognize' },
      { character: '\u5e74', pinyin: 'nian', strokes: 6, meaning: 'year' },
      { character: '\u673a', pinyin: 'ji', strokes: 6, meaning: 'machine / airplane' },
      { character: '\u5174', pinyin: 'xing', strokes: 6, meaning: 'happy / interest' },
    ],
    speakingPrompts: [
      'Tell a classmate how you came to school today.',
      'Ask your partner when they came to this city.',
      'Introduce yourself and say where you are from.',
      'Talk about a trip: where you went, how you got there, and when.',
    ],
    culturalNote: 'The shi...de construction is one of the most useful patterns in Chinese for talking about past events. It emphasizes the circumstances rather than the action itself.',
  },
];

export function getAllLessons(): Lesson[] {
  return HSK1_LESSONS;
}

export function getLessonById(id: number): Lesson | undefined {
  return HSK1_LESSONS.find(l => l.id === id);
}

export function getLessonsByLevel(level: number): Lesson[] {
  return HSK1_LESSONS.filter(l => l.hskLevel === level);
}