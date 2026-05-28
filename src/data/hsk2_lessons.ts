// HSK Standard Course 2 - Complete Lesson Data
// Based on: HSK标准教程 2 (HSK Biaozhun Jiaocheng 2)
// Publisher: Beijing Language and Culture University Press, 2014
// Generated to match the app data structure used by hsk1_lessons.ts

export interface VocabWord {
    id: number;
    chinese: string;
    pinyin: string;
    english: string;
    partOfSpeech: string; // n., v., pron., adj., adv., part., conj., prep., interj., aux., m., num.
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
    structure: string;
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
  
  export const HSK2_LESSONS: Lesson[] = [
    {
      "id": 1,
      "hskLevel": 2,
      "titleChinese": "九月去北京旅游最好",
      "titlePinyin": "Jiǔ yuè qù Běijīng lǚyóu zuì hǎo",
      "titleEnglish": "September is the best time to visit Beijing",
      "pageNumber": 1,
      "vocabulary": [
        {
          "id": 1,
          "chinese": "旅游",
          "pinyin": "lǚyóu",
          "english": "to travel; to take a trip",
          "partOfSpeech": "v."
        },
        {
          "id": 2,
          "chinese": "觉得",
          "pinyin": "juéde",
          "english": "to think; to feel",
          "partOfSpeech": "v."
        },
        {
          "id": 3,
          "chinese": "最",
          "pinyin": "zuì",
          "english": "most; -est",
          "partOfSpeech": "adv."
        },
        {
          "id": 4,
          "chinese": "为什么",
          "pinyin": "wèishénme",
          "english": "why",
          "partOfSpeech": "pron."
        },
        {
          "id": 5,
          "chinese": "也",
          "pinyin": "yě",
          "english": "also; too",
          "partOfSpeech": "adv."
        },
        {
          "id": 6,
          "chinese": "运动",
          "pinyin": "yùndòng",
          "english": "sport; to exercise",
          "partOfSpeech": "n./v."
        },
        {
          "id": 7,
          "chinese": "踢足球",
          "pinyin": "tī zúqiú",
          "english": "to play football/soccer",
          "partOfSpeech": "v."
        },
        {
          "id": 8,
          "chinese": "一起",
          "pinyin": "yìqǐ",
          "english": "together",
          "partOfSpeech": "adv."
        },
        {
          "id": 9,
          "chinese": "要",
          "pinyin": "yào",
          "english": "to want to; would like to",
          "partOfSpeech": "aux."
        },
        {
          "id": 10,
          "chinese": "新",
          "pinyin": "xīn",
          "english": "new",
          "partOfSpeech": "adj."
        },
        {
          "id": 11,
          "chinese": "它",
          "pinyin": "tā",
          "english": "it",
          "partOfSpeech": "pron."
        },
        {
          "id": 12,
          "chinese": "眼睛",
          "pinyin": "yǎnjing",
          "english": "eye",
          "partOfSpeech": "n."
        }
      ],
      "dialogues": [
        {
          "id": 1,
          "titleChinese": "谈旅游",
          "titleEnglish": "Talking about travel",
          "trackNumber": "01-1",
          "lines": [
            {
              "speaker": "A",
              "chinese": "我想去北京旅游，你觉得什么时候最好？",
              "pinyin": "Wǒ xiǎng qù Běijīng lǚyóu, nǐ juéde shénme shíhou zuì hǎo?",
              "english": "I want to travel to Beijing. When do you think is best?"
            },
            {
              "speaker": "B",
              "chinese": "九月最好，因为天气不冷也不热。",
              "pinyin": "Jiǔ yuè zuì hǎo, yīnwèi tiānqì bù lěng yě bú rè.",
              "english": "September is best, because the weather is neither cold nor hot."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "约运动",
          "titleEnglish": "Arranging exercise",
          "trackNumber": "01-2",
          "lines": [
            {
              "speaker": "A",
              "chinese": "你喜欢什么运动？",
              "pinyin": "Nǐ xǐhuan shénme yùndòng?",
              "english": "What sport do you like?"
            },
            {
              "speaker": "B",
              "chinese": "我最喜欢踢足球。",
              "pinyin": "Wǒ zuì xǐhuan tī zúqiú.",
              "english": "I like playing football most."
            },
            {
              "speaker": "A",
              "chinese": "下午我们一起去踢足球吧。",
              "pinyin": "Xiàwǔ wǒmen yìqǐ qù tī zúqiú ba.",
              "english": "Let’s go play football together this afternoon."
            }
          ]
        },
        {
          "id": 3,
          "titleChinese": "买椅子",
          "titleEnglish": "Buying chairs",
          "trackNumber": "01-3",
          "lines": [
            {
              "speaker": "A",
              "chinese": "我们要买几把新椅子。",
              "pinyin": "Wǒmen yào mǎi jǐ bǎ xīn yǐzi.",
              "english": "We need to buy a few new chairs."
            },
            {
              "speaker": "B",
              "chinese": "好，明天下午怎么样？",
              "pinyin": "Hǎo, míngtiān xiàwǔ zěnmeyàng?",
              "english": "Okay. How about tomorrow afternoon?"
            }
          ]
        }
      ],
      "grammarPoints": [
        {
          "id": 1,
          "titleChinese": "助动词“要”",
          "titleEnglish": "The Auxiliary Verb 要",
          "explanation": "要 before a verb expresses wanting or planning to do something. The negative form is 不想 when the focus is desire, and 不要 when giving a prohibition.",
          "structure": "Subject + 要 + Verb/Object",
          "examples": [
            {
              "chinese": "我要去北京。",
              "pinyin": "Wǒ yào qù Běijīng.",
              "english": "I want to go to Beijing."
            },
            {
              "chinese": "你要买什么？",
              "pinyin": "Nǐ yào mǎi shénme?",
              "english": "What do you want to buy?"
            },
            {
              "chinese": "我不要咖啡。",
              "pinyin": "Wǒ bú yào kāfēi.",
              "english": "I do not want coffee."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "程度副词“最”",
          "titleEnglish": "The Degree Adverb 最",
          "explanation": "最 marks the highest degree among a group, similar to 'most' or the '-est' form in English.",
          "structure": "Subject + 最 + Adj./Verb",
          "examples": [
            {
              "chinese": "我最喜欢九月。",
              "pinyin": "Wǒ zuì xǐhuan jiǔ yuè.",
              "english": "I like September most."
            },
            {
              "chinese": "今天最热。",
              "pinyin": "Jīntiān zuì rè.",
              "english": "Today is the hottest."
            },
            {
              "chinese": "他跑得最快。",
              "pinyin": "Tā pǎo de zuì kuài.",
              "english": "He runs the fastest."
            }
          ]
        },
        {
          "id": 3,
          "titleChinese": "概数：几、十几、几十",
          "titleEnglish": "Approximate Numbers with 几",
          "explanation": "几 indicates an indefinite small number. With 十, it can express approximate quantities such as a dozen or several dozen.",
          "structure": "几 + Measure Word + Noun",
          "examples": [
            {
              "chinese": "我有几个朋友。",
              "pinyin": "Wǒ yǒu jǐ ge péngyou.",
              "english": "I have a few friends."
            },
            {
              "chinese": "十几个人",
              "pinyin": "shí jǐ ge rén",
              "english": "a dozen or so people"
            },
            {
              "chinese": "几十本书",
              "pinyin": "jǐ shí běn shū",
              "english": "several dozen books"
            }
          ]
        }
      ],
      "exercises": [
        {
          "type": "multiple_choice",
          "question": "What does 最 mean?",
          "options": [
            "also",
            "most",
            "why",
            "new"
          ],
          "answer": 1
        },
        {
          "type": "fill_blank",
          "question": "我____去北京旅游。",
          "answer": "要",
          "questionPinyin": "Wǒ ____ qù Běijīng lǚyóu."
        },
        {
          "type": "translate",
          "question": "I like playing football most.",
          "answer": "我最喜欢踢足球。"
        }
      ],
      "writingCharacters": [
        {
          "character": "旅",
          "pinyin": "lǚ",
          "strokes": 10,
          "meaning": "travel"
        },
        {
          "character": "游",
          "pinyin": "yóu",
          "strokes": 12,
          "meaning": "travel; swim"
        },
        {
          "character": "最",
          "pinyin": "zuì",
          "strokes": 12,
          "meaning": "most"
        },
        {
          "character": "新",
          "pinyin": "xīn",
          "strokes": 13,
          "meaning": "new"
        }
      ],
      "speakingPrompts": [
        "Say where you want to travel and why.",
        "Ask your partner what sport they like most.",
        "Invite a classmate to do something together."
      ],
      "culturalNote": "When Chinese speakers discuss travel, they often mention weather and season first because timing is considered an important part of a pleasant trip."
    },
    {
      "id": 2,
      "hskLevel": 2,
      "titleChinese": "我每天六点起床",
      "titlePinyin": "Wǒ měi tiān liù diǎn qǐ chuáng",
      "titleEnglish": "I get up at six every day",
      "pageNumber": 9,
      "vocabulary": [
        {
          "id": 13,
          "chinese": "高",
          "pinyin": "gāo",
          "english": "tall; high",
          "partOfSpeech": "adj."
        },
        {
          "id": 14,
          "chinese": "出",
          "pinyin": "chū",
          "english": "to go/come out",
          "partOfSpeech": "v."
        },
        {
          "id": 15,
          "chinese": "忙",
          "pinyin": "máng",
          "english": "busy",
          "partOfSpeech": "adj."
        },
        {
          "id": 16,
          "chinese": "每",
          "pinyin": "měi",
          "english": "every; each",
          "partOfSpeech": "pron."
        },
        {
          "id": 17,
          "chinese": "跑步",
          "pinyin": "pǎobù",
          "english": "to run; to jog",
          "partOfSpeech": "v."
        },
        {
          "id": 18,
          "chinese": "起床",
          "pinyin": "qǐchuáng",
          "english": "to get up",
          "partOfSpeech": "v."
        },
        {
          "id": 19,
          "chinese": "身体",
          "pinyin": "shēntǐ",
          "english": "body; health",
          "partOfSpeech": "n."
        },
        {
          "id": 20,
          "chinese": "生病",
          "pinyin": "shēngbìng",
          "english": "to fall ill",
          "partOfSpeech": "v."
        },
        {
          "id": 21,
          "chinese": "时间",
          "pinyin": "shíjiān",
          "english": "time",
          "partOfSpeech": "n."
        },
        {
          "id": 22,
          "chinese": "休息",
          "pinyin": "xiūxi",
          "english": "to rest",
          "partOfSpeech": "v."
        },
        {
          "id": 23,
          "chinese": "早上",
          "pinyin": "zǎoshang",
          "english": "morning",
          "partOfSpeech": "n."
        },
        {
          "id": 24,
          "chinese": "知道",
          "pinyin": "zhīdào",
          "english": "to know",
          "partOfSpeech": "v."
        },
        {
          "id": 25,
          "chinese": "药",
          "pinyin": "yào",
          "english": "medicine",
          "partOfSpeech": "n."
        }
      ],
      "dialogues": [
        {
          "id": 1,
          "titleChinese": "日常作息",
          "titleEnglish": "Daily routine",
          "trackNumber": "02-1",
          "lines": [
            {
              "speaker": "A",
              "chinese": "你每天几点起床？",
              "pinyin": "Nǐ měi tiān jǐ diǎn qǐchuáng?",
              "english": "What time do you get up every day?"
            },
            {
              "speaker": "B",
              "chinese": "我每天六点起床，然后去跑步。",
              "pinyin": "Wǒ měi tiān liù diǎn qǐchuáng, ránhòu qù pǎobù.",
              "english": "I get up at six every day, then go running."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "身体不舒服",
          "titleEnglish": "Not feeling well",
          "trackNumber": "02-2",
          "lines": [
            {
              "speaker": "A",
              "chinese": "你是不是生病了？",
              "pinyin": "Nǐ shì bu shì shēngbìng le?",
              "english": "Are you sick?"
            },
            {
              "speaker": "B",
              "chinese": "我有点儿累，想休息一下。",
              "pinyin": "Wǒ yǒudiǎnr lèi, xiǎng xiūxi yíxià.",
              "english": "I’m a little tired and want to rest for a bit."
            }
          ]
        }
      ],
      "grammarPoints": [
        {
          "id": 1,
          "titleChinese": "“是不是”疑问句",
          "titleEnglish": "Questions with 是不是",
          "explanation": "是不是 can be placed before the predicate or at the end of a sentence to ask for confirmation.",
          "structure": "Subject + 是不是 + Predicate?",
          "examples": [
            {
              "chinese": "你是不是很忙？",
              "pinyin": "Nǐ shì bu shì hěn máng?",
              "english": "Are you busy?"
            },
            {
              "chinese": "他生病了，是不是？",
              "pinyin": "Tā shēngbìng le, shì bu shì?",
              "english": "He is sick, isn’t he?"
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "代词“每”",
          "titleEnglish": "The Pronoun 每",
          "explanation": "每 means every or each and is usually followed by a measure word or time word.",
          "structure": "每 + Measure Word/Noun",
          "examples": [
            {
              "chinese": "我每天跑步。",
              "pinyin": "Wǒ měi tiān pǎobù.",
              "english": "I run every day."
            },
            {
              "chinese": "每个人都知道。",
              "pinyin": "Měi ge rén dōu zhīdào.",
              "english": "Everyone knows."
            }
          ]
        },
        {
          "id": 3,
          "titleChinese": "疑问代词“多”",
          "titleEnglish": "The Interrogative 多",
          "explanation": "多 can ask about degree, age, distance, height, or quantity in set expressions.",
          "structure": "多 + Adj.?",
          "examples": [
            {
              "chinese": "他多高？",
              "pinyin": "Tā duō gāo?",
              "english": "How tall is he?"
            },
            {
              "chinese": "你多大？",
              "pinyin": "Nǐ duō dà?",
              "english": "How old are you?"
            },
            {
              "chinese": "这条路多长？",
              "pinyin": "Zhè tiáo lù duō cháng?",
              "english": "How long is this road?"
            }
          ]
        }
      ],
      "exercises": [
        {
          "type": "multiple_choice",
          "question": "How do you ask 'Are you sick?'",
          "options": [
            "你生病吗？",
            "你是不是生病了？",
            "你多生病？",
            "你每生病？"
          ],
          "answer": 1
        },
        {
          "type": "fill_blank",
          "question": "我____天早上跑步。",
          "answer": "每",
          "questionPinyin": "Wǒ ____ tiān zǎoshang pǎobù."
        },
        {
          "type": "translate",
          "question": "I get up at six every day.",
          "answer": "我每天六点起床。"
        }
      ],
      "writingCharacters": [
        {
          "character": "每",
          "pinyin": "měi",
          "strokes": 7,
          "meaning": "every"
        },
        {
          "character": "跑",
          "pinyin": "pǎo",
          "strokes": 12,
          "meaning": "run"
        },
        {
          "character": "步",
          "pinyin": "bù",
          "strokes": 7,
          "meaning": "step"
        },
        {
          "character": "药",
          "pinyin": "yào",
          "strokes": 9,
          "meaning": "medicine"
        }
      ],
      "speakingPrompts": [
        "Ask your partner what time they get up.",
        "Describe one healthy habit you do every day.",
        "Ask a confirmation question with 是不是."
      ]
    },
    {
      "id": 3,
      "hskLevel": 2,
      "titleChinese": "左边那个红色的是我的",
      "titlePinyin": "Zuǒbian nà ge hóngsè de shì wǒ de",
      "titleEnglish": "The red one on the left is mine",
      "pageNumber": 17,
      "vocabulary": [
        {
          "id": 26,
          "chinese": "报纸",
          "pinyin": "bàozhǐ",
          "english": "newspaper",
          "partOfSpeech": "n."
        },
        {
          "id": 27,
          "chinese": "房间",
          "pinyin": "fángjiān",
          "english": "room",
          "partOfSpeech": "n."
        },
        {
          "id": 28,
          "chinese": "红",
          "pinyin": "hóng",
          "english": "red",
          "partOfSpeech": "adj."
        },
        {
          "id": 29,
          "chinese": "牛奶",
          "pinyin": "niúnǎi",
          "english": "milk",
          "partOfSpeech": "n."
        },
        {
          "id": 30,
          "chinese": "旁边",
          "pinyin": "pángbiān",
          "english": "beside; next to",
          "partOfSpeech": "n."
        },
        {
          "id": 31,
          "chinese": "千",
          "pinyin": "qiān",
          "english": "thousand",
          "partOfSpeech": "num."
        },
        {
          "id": 32,
          "chinese": "手表",
          "pinyin": "shǒubiǎo",
          "english": "watch",
          "partOfSpeech": "n."
        },
        {
          "id": 33,
          "chinese": "送",
          "pinyin": "sòng",
          "english": "to give; to deliver",
          "partOfSpeech": "v."
        },
        {
          "id": 34,
          "chinese": "一下",
          "pinyin": "yíxià",
          "english": "a little; briefly",
          "partOfSpeech": "num.-m."
        },
        {
          "id": 35,
          "chinese": "颜色",
          "pinyin": "yánsè",
          "english": "color",
          "partOfSpeech": "n."
        },
        {
          "id": 36,
          "chinese": "丈夫",
          "pinyin": "zhàngfu",
          "english": "husband",
          "partOfSpeech": "n."
        },
        {
          "id": 37,
          "chinese": "左边",
          "pinyin": "zuǒbian",
          "english": "left side",
          "partOfSpeech": "n."
        },
        {
          "id": 38,
          "chinese": "真",
          "pinyin": "zhēn",
          "english": "really; indeed",
          "partOfSpeech": "adv."
        }
      ],
      "dialogues": [
        {
          "id": 1,
          "titleChinese": "找东西",
          "titleEnglish": "Looking for something",
          "trackNumber": "03-1",
          "lines": [
            {
              "speaker": "A",
              "chinese": "哪个手表是你的？",
              "pinyin": "Nǎ ge shǒubiǎo shì nǐ de?",
              "english": "Which watch is yours?"
            },
            {
              "speaker": "B",
              "chinese": "左边那个红色的是我的。",
              "pinyin": "Zuǒbian nà ge hóngsè de shì wǒ de.",
              "english": "The red one on the left is mine."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "送礼物",
          "titleEnglish": "Giving a gift",
          "trackNumber": "03-2",
          "lines": [
            {
              "speaker": "A",
              "chinese": "这个手表真漂亮！",
              "pinyin": "Zhè ge shǒubiǎo zhēn piàoliang!",
              "english": "This watch is really beautiful!"
            },
            {
              "speaker": "B",
              "chinese": "是我丈夫送给我的。",
              "pinyin": "Shì wǒ zhàngfu sòng gěi wǒ de.",
              "english": "My husband gave it to me."
            }
          ]
        }
      ],
      "grammarPoints": [
        {
          "id": 1,
          "titleChinese": "“的”字短语",
          "titleEnglish": "The 的 Phrase",
          "explanation": "A noun can be omitted after 的 when it is clear from context, allowing 的 to stand for 'the one that is...'.",
          "structure": "Modifier + 的",
          "examples": [
            {
              "chinese": "红色的是我的。",
              "pinyin": "Hóngsè de shì wǒ de.",
              "english": "The red one is mine."
            },
            {
              "chinese": "旁边的是报纸。",
              "pinyin": "Pángbiān de shì bàozhǐ.",
              "english": "The one beside it is a newspaper."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "数量词“一下”",
          "titleEnglish": "The Numeral-Measure Word 一下",
          "explanation": "一下 after a verb means doing an action briefly or trying it once.",
          "structure": "Verb + 一下",
          "examples": [
            {
              "chinese": "请看一下。",
              "pinyin": "Qǐng kàn yíxià.",
              "english": "Please take a quick look."
            },
            {
              "chinese": "我问一下老师。",
              "pinyin": "Wǒ wèn yíxià lǎoshī.",
              "english": "I’ll ask the teacher briefly."
            }
          ]
        },
        {
          "id": 3,
          "titleChinese": "语气副词“真”",
          "titleEnglish": "The Modal Adverb 真",
          "explanation": "真 emphasizes that the speaker genuinely feels something is true or strong.",
          "structure": "真 + Adj.",
          "examples": [
            {
              "chinese": "这个房间真大。",
              "pinyin": "Zhè ge fángjiān zhēn dà.",
              "english": "This room is really big."
            },
            {
              "chinese": "牛奶真好喝。",
              "pinyin": "Niúnǎi zhēn hǎo hē.",
              "english": "The milk is really good."
            }
          ]
        }
      ],
      "exercises": [
        {
          "type": "multiple_choice",
          "question": "What does 红色的 mean in context?",
          "options": [
            "red color",
            "the red one",
            "red newspaper",
            "very red"
          ],
          "answer": 1
        },
        {
          "type": "fill_blank",
          "question": "请等____。",
          "answer": "一下",
          "questionPinyin": "Qǐng děng ____.",
          "explanation": "Use 一下 for a short action."
        },
        {
          "type": "translate",
          "question": "The one on the left is mine.",
          "answer": "左边那个是我的。"
        }
      ],
      "writingCharacters": [
        {
          "character": "红",
          "pinyin": "hóng",
          "strokes": 6,
          "meaning": "red"
        },
        {
          "character": "色",
          "pinyin": "sè",
          "strokes": 6,
          "meaning": "color"
        },
        {
          "character": "左",
          "pinyin": "zuǒ",
          "strokes": 5,
          "meaning": "left"
        },
        {
          "character": "送",
          "pinyin": "sòng",
          "strokes": 9,
          "meaning": "send; give"
        }
      ],
      "speakingPrompts": [
        "Describe which object is yours using 的.",
        "Ask someone to look at something briefly with 一下.",
        "Describe a color you like."
      ]
    },
    {
      "id": 4,
      "hskLevel": 2,
      "titleChinese": "这个工作是他帮我介绍的",
      "titlePinyin": "Zhè ge gōngzuò shì tā bāng wǒ jièshào de",
      "titleEnglish": "He recommended me for this job",
      "pageNumber": 25,
      "vocabulary": [
        {
          "id": 39,
          "chinese": "长",
          "pinyin": "cháng",
          "english": "long",
          "partOfSpeech": "adj."
        },
        {
          "id": 40,
          "chinese": "非常",
          "pinyin": "fēicháng",
          "english": "very; extremely",
          "partOfSpeech": "adv."
        },
        {
          "id": 41,
          "chinese": "给",
          "pinyin": "gěi",
          "english": "to; for",
          "partOfSpeech": "prep."
        },
        {
          "id": 42,
          "chinese": "介绍",
          "pinyin": "jièshào",
          "english": "to introduce; to recommend",
          "partOfSpeech": "v."
        },
        {
          "id": 43,
          "chinese": "开始",
          "pinyin": "kāishǐ",
          "english": "to begin; to start",
          "partOfSpeech": "v."
        },
        {
          "id": 44,
          "chinese": "快乐",
          "pinyin": "kuàilè",
          "english": "happy",
          "partOfSpeech": "adj."
        },
        {
          "id": 45,
          "chinese": "两",
          "pinyin": "liǎng",
          "english": "two",
          "partOfSpeech": "num."
        },
        {
          "id": 46,
          "chinese": "生日",
          "pinyin": "shēngrì",
          "english": "birthday",
          "partOfSpeech": "n."
        },
        {
          "id": 47,
          "chinese": "晚上",
          "pinyin": "wǎnshang",
          "english": "evening; night",
          "partOfSpeech": "n."
        },
        {
          "id": 48,
          "chinese": "问",
          "pinyin": "wèn",
          "english": "to ask",
          "partOfSpeech": "v."
        },
        {
          "id": 49,
          "chinese": "已经",
          "pinyin": "yǐjīng",
          "english": "already",
          "partOfSpeech": "adv."
        }
      ],
      "dialogues": [
        {
          "id": 1,
          "titleChinese": "介绍工作",
          "titleEnglish": "Introducing a job",
          "trackNumber": "04-1",
          "lines": [
            {
              "speaker": "A",
              "chinese": "这个工作是谁帮你介绍的？",
              "pinyin": "Zhè ge gōngzuò shì shéi bāng nǐ jièshào de?",
              "english": "Who introduced this job to you?"
            },
            {
              "speaker": "B",
              "chinese": "是他帮我介绍的。",
              "pinyin": "Shì tā bāng wǒ jièshào de.",
              "english": "He introduced it to me."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "生日快乐",
          "titleEnglish": "Happy birthday",
          "trackNumber": "04-2",
          "lines": [
            {
              "speaker": "A",
              "chinese": "今天是你的生日吗？",
              "pinyin": "Jīntiān shì nǐ de shēngrì ma?",
              "english": "Is today your birthday?"
            },
            {
              "speaker": "B",
              "chinese": "是。谢谢你给我打电话。",
              "pinyin": "Shì. Xièxie nǐ gěi wǒ dǎ diànhuà.",
              "english": "Yes. Thank you for calling me."
            },
            {
              "speaker": "A",
              "chinese": "生日快乐！",
              "pinyin": "Shēngrì kuàilè!",
              "english": "Happy birthday!"
            }
          ]
        }
      ],
      "grammarPoints": [
        {
          "id": 1,
          "titleChinese": "“是……的”：强调动作发出者",
          "titleEnglish": "是...的 Emphasizing the Doer",
          "explanation": "The 是...的 construction can emphasize who did a completed action.",
          "structure": "Subject + 是 + Doer + Verb + 的",
          "examples": [
            {
              "chinese": "这个工作是他介绍的。",
              "pinyin": "Zhè ge gōngzuò shì tā jièshào de.",
              "english": "He was the one who introduced this job."
            },
            {
              "chinese": "这本书是老师给我的。",
              "pinyin": "Zhè běn shū shì lǎoshī gěi wǒ de.",
              "english": "The teacher was the one who gave me this book."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "时间表达：……的时候",
          "titleEnglish": "Time Expression: ...的时候",
          "explanation": "的时候 forms a time clause meaning 'when...' or 'at the time when...'.",
          "structure": "Clause + 的时候",
          "examples": [
            {
              "chinese": "我生日的时候，你来吗？",
              "pinyin": "Wǒ shēngrì de shíhou, nǐ lái ma?",
              "english": "Will you come on my birthday?"
            },
            {
              "chinese": "开始上课的时候，他已经来了。",
              "pinyin": "Kāishǐ shàng kè de shíhou, tā yǐjīng lái le.",
              "english": "When class started, he had already arrived."
            }
          ]
        },
        {
          "id": 3,
          "titleChinese": "时间副词“已经”",
          "titleEnglish": "The Time Adverb 已经",
          "explanation": "已经 indicates that something has already happened or a state already exists.",
          "structure": "Subject + 已经 + Verb/Adj. + 了",
          "examples": [
            {
              "chinese": "电影已经开始了。",
              "pinyin": "Diànyǐng yǐjīng kāishǐ le.",
              "english": "The movie has already started."
            },
            {
              "chinese": "我已经问老师了。",
              "pinyin": "Wǒ yǐjīng wèn lǎoshī le.",
              "english": "I have already asked the teacher."
            }
          ]
        }
      ],
      "exercises": [
        {
          "type": "multiple_choice",
          "question": "Which structure emphasizes the doer?",
          "options": [
            "是……的",
            "越来越",
            "因为……所以",
            "比"
          ],
          "answer": 0
        },
        {
          "type": "fill_blank",
          "question": "电影____开始了。",
          "answer": "已经"
        },
        {
          "type": "translate",
          "question": "This job was introduced by him.",
          "answer": "这个工作是他帮我介绍的。"
        }
      ],
      "writingCharacters": [
        {
          "character": "介",
          "pinyin": "jiè",
          "strokes": 4,
          "meaning": "introduce; between"
        },
        {
          "character": "绍",
          "pinyin": "shào",
          "strokes": 8,
          "meaning": "continue; introduce"
        },
        {
          "character": "已",
          "pinyin": "yǐ",
          "strokes": 3,
          "meaning": "already"
        },
        {
          "character": "问",
          "pinyin": "wèn",
          "strokes": 6,
          "meaning": "ask"
        }
      ],
      "speakingPrompts": [
        "Tell who introduced a friend, job, or class to you.",
        "Say what you do when it is your birthday.",
        "Use 已经 to say something is already finished."
      ]
    },
    {
      "id": 5,
      "hskLevel": 2,
      "titleChinese": "就买这件吧",
      "titlePinyin": "Jiù mǎi zhè jiàn ba",
      "titleEnglish": "Take this one",
      "pageNumber": 33,
      "vocabulary": [
        {
          "id": 50,
          "chinese": "吧",
          "pinyin": "ba",
          "english": "particle for suggestion or request",
          "partOfSpeech": "part."
        },
        {
          "id": 51,
          "chinese": "对",
          "pinyin": "duì",
          "english": "to; for; correct",
          "partOfSpeech": "prep./adj."
        },
        {
          "id": 52,
          "chinese": "还",
          "pinyin": "hái",
          "english": "still; also; fairly",
          "partOfSpeech": "adv."
        },
        {
          "id": 53,
          "chinese": "件",
          "pinyin": "jiàn",
          "english": "measure word for clothes/items",
          "partOfSpeech": "m."
        },
        {
          "id": 54,
          "chinese": "就",
          "pinyin": "jiù",
          "english": "then; just; used for decision",
          "partOfSpeech": "adv."
        },
        {
          "id": 55,
          "chinese": "咖啡",
          "pinyin": "kāfēi",
          "english": "coffee",
          "partOfSpeech": "n."
        },
        {
          "id": 56,
          "chinese": "考试",
          "pinyin": "kǎoshì",
          "english": "test; exam",
          "partOfSpeech": "n."
        },
        {
          "id": 57,
          "chinese": "可以",
          "pinyin": "kěyǐ",
          "english": "not bad; okay; can",
          "partOfSpeech": "adj./aux."
        },
        {
          "id": 58,
          "chinese": "意思",
          "pinyin": "yìsi",
          "english": "meaning",
          "partOfSpeech": "n."
        },
        {
          "id": 59,
          "chinese": "鱼",
          "pinyin": "yú",
          "english": "fish",
          "partOfSpeech": "n."
        },
        {
          "id": 60,
          "chinese": "准备",
          "pinyin": "zhǔnbèi",
          "english": "to prepare; to plan",
          "partOfSpeech": "v."
        }
      ],
      "dialogues": [
        {
          "id": 1,
          "titleChinese": "买衣服",
          "titleEnglish": "Buying clothes",
          "trackNumber": "05-1",
          "lines": [
            {
              "speaker": "A",
              "chinese": "这件衣服怎么样？",
              "pinyin": "Zhè jiàn yīfu zěnmeyàng?",
              "english": "How is this piece of clothing?"
            },
            {
              "speaker": "B",
              "chinese": "还可以。就买这件吧。",
              "pinyin": "Hái kěyǐ. Jiù mǎi zhè jiàn ba.",
              "english": "It’s not bad. Let’s buy this one."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "准备考试",
          "titleEnglish": "Preparing for an exam",
          "trackNumber": "05-2",
          "lines": [
            {
              "speaker": "A",
              "chinese": "你准备好明天的考试了吗？",
              "pinyin": "Nǐ zhǔnbèi hǎo míngtiān de kǎoshì le ma?",
              "english": "Have you prepared for tomorrow’s exam?"
            },
            {
              "speaker": "B",
              "chinese": "还没有，我想喝杯咖啡再学习。",
              "pinyin": "Hái méiyǒu, wǒ xiǎng hē bēi kāfēi zài xuéxí.",
              "english": "Not yet. I want to drink a cup of coffee and then study."
            }
          ]
        }
      ],
      "grammarPoints": [
        {
          "id": 1,
          "titleChinese": "副词“就”",
          "titleEnglish": "The Adverb 就",
          "explanation": "就 can mark an early time, a quick conclusion, or a speaker’s decision in context.",
          "structure": "Subject + 就 + Verb",
          "examples": [
            {
              "chinese": "我就买这件。",
              "pinyin": "Wǒ jiù mǎi zhè jiàn.",
              "english": "I’ll just buy this one."
            },
            {
              "chinese": "他八点就来了。",
              "pinyin": "Tā bā diǎn jiù lái le.",
              "english": "He came as early as eight."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "语气副词“还”（一）",
          "titleEnglish": "The Modal Adverb 还 (1)",
          "explanation": "还 can mean still, yet, or fairly/not bad depending on the sentence.",
          "structure": "还 + Verb/Adj.",
          "examples": [
            {
              "chinese": "我还没有准备好。",
              "pinyin": "Wǒ hái méiyǒu zhǔnbèi hǎo.",
              "english": "I am not prepared yet."
            },
            {
              "chinese": "这件衣服还可以。",
              "pinyin": "Zhè jiàn yīfu hái kěyǐ.",
              "english": "This piece of clothing is not bad."
            }
          ]
        },
        {
          "id": 3,
          "titleChinese": "“地”作状语标记",
          "titleEnglish": "Adverbial Modifier with 地",
          "explanation": "An adjective or phrase before 地 describes how an action is done.",
          "structure": "Adj./Phrase + 地 + Verb",
          "examples": [
            {
              "chinese": "他高兴地说话。",
              "pinyin": "Tā gāoxìng de shuōhuà.",
              "english": "He speaks happily."
            },
            {
              "chinese": "她认真地准备考试。",
              "pinyin": "Tā rènzhēn de zhǔnbèi kǎoshì.",
              "english": "She prepares for the exam carefully."
            }
          ]
        }
      ],
      "exercises": [
        {
          "type": "multiple_choice",
          "question": "Which measure word is used for clothes?",
          "options": [
            "杯",
            "件",
            "只",
            "本"
          ],
          "answer": 1
        },
        {
          "type": "fill_blank",
          "question": "____买这件吧。",
          "answer": "就"
        },
        {
          "type": "translate",
          "question": "This one is not bad.",
          "answer": "这件还可以。"
        }
      ],
      "writingCharacters": [
        {
          "character": "件",
          "pinyin": "jiàn",
          "strokes": 6,
          "meaning": "piece"
        },
        {
          "character": "吧",
          "pinyin": "ba",
          "strokes": 7,
          "meaning": "suggestion particle"
        },
        {
          "character": "考",
          "pinyin": "kǎo",
          "strokes": 6,
          "meaning": "test"
        },
        {
          "character": "鱼",
          "pinyin": "yú",
          "strokes": 8,
          "meaning": "fish"
        }
      ],
      "speakingPrompts": [
        "Choose an item and say 就买这个吧.",
        "Say what you are preparing for.",
        "Use 还 to say something is still not finished."
      ],
      "culturalNote": "Chinese dining etiquette often values shared dishes and group harmony. Expressions such as 一起 and 吧 are useful for making polite suggestions in group situations."
    },
    {
      "id": 6,
      "hskLevel": 2,
      "titleChinese": "你怎么不吃了",
      "titlePinyin": "Nǐ zěnme bù chī le",
      "titleEnglish": "Why don’t you eat more?",
      "pageNumber": 41,
      "vocabulary": [
        {
          "id": 61,
          "chinese": "打篮球",
          "pinyin": "dǎ lánqiú",
          "english": "to play basketball",
          "partOfSpeech": "v."
        },
        {
          "id": 62,
          "chinese": "姐姐",
          "pinyin": "jiějie",
          "english": "elder sister",
          "partOfSpeech": "n."
        },
        {
          "id": 63,
          "chinese": "好吃",
          "pinyin": "hǎochī",
          "english": "delicious",
          "partOfSpeech": "adj."
        },
        {
          "id": 64,
          "chinese": "门",
          "pinyin": "mén",
          "english": "door; gate",
          "partOfSpeech": "n."
        },
        {
          "id": 65,
          "chinese": "面条",
          "pinyin": "miàntiáo",
          "english": "noodles",
          "partOfSpeech": "n."
        },
        {
          "id": 66,
          "chinese": "所以",
          "pinyin": "suǒyǐ",
          "english": "so; therefore",
          "partOfSpeech": "conj."
        },
        {
          "id": 67,
          "chinese": "外",
          "pinyin": "wài",
          "english": "outside",
          "partOfSpeech": "n."
        },
        {
          "id": 68,
          "chinese": "羊肉",
          "pinyin": "yángròu",
          "english": "mutton; lamb",
          "partOfSpeech": "n."
        },
        {
          "id": 69,
          "chinese": "因为",
          "pinyin": "yīnwèi",
          "english": "because",
          "partOfSpeech": "conj."
        },
        {
          "id": 70,
          "chinese": "游泳",
          "pinyin": "yóuyǒng",
          "english": "to swim",
          "partOfSpeech": "v."
        }
      ],
      "dialogues": [
        {
          "id": 1,
          "titleChinese": "吃饭",
          "titleEnglish": "Eating",
          "trackNumber": "06-1",
          "lines": [
            {
              "speaker": "A",
              "chinese": "你怎么不吃了？面条不好吃吗？",
              "pinyin": "Nǐ zěnme bù chī le? Miàntiáo bù hǎochī ma?",
              "english": "Why did you stop eating? Are the noodles not tasty?"
            },
            {
              "speaker": "B",
              "chinese": "很好吃，因为我不太饿，所以吃不下了。",
              "pinyin": "Hěn hǎochī, yīnwèi wǒ bú tài è, suǒyǐ chī bú xià le.",
              "english": "They are tasty. Because I’m not very hungry, I can’t eat more."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "运动安排",
          "titleEnglish": "Sports plan",
          "trackNumber": "06-2",
          "lines": [
            {
              "speaker": "A",
              "chinese": "今天我们去游泳还是打篮球？",
              "pinyin": "Jīntiān wǒmen qù yóuyǒng háishi dǎ lánqiú?",
              "english": "Are we swimming or playing basketball today?"
            },
            {
              "speaker": "B",
              "chinese": "门外太冷了，我们去打篮球吧。",
              "pinyin": "Mén wài tài lěng le, wǒmen qù dǎ lánqiú ba.",
              "english": "It is too cold outside the door. Let’s play basketball."
            }
          ]
        }
      ],
      "grammarPoints": [
        {
          "id": 1,
          "titleChinese": "疑问代词“怎么”",
          "titleEnglish": "The Interrogative 怎么",
          "explanation": "怎么 asks about manner, reason, or an unexpected situation depending on context.",
          "structure": "怎么 + Verb/Adj.?",
          "examples": [
            {
              "chinese": "你怎么不吃了？",
              "pinyin": "Nǐ zěnme bù chī le?",
              "english": "Why did you stop eating?"
            },
            {
              "chinese": "这个字怎么写？",
              "pinyin": "Zhè ge zì zěnme xiě?",
              "english": "How do you write this character?"
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "量词重叠",
          "titleEnglish": "Reduplication of Measure Words",
          "explanation": "Measure word reduplication expresses 'every' or 'each', usually with 都.",
          "structure": "Measure Word + Measure Word + 都",
          "examples": [
            {
              "chinese": "个个都很好。",
              "pinyin": "Gè ge dōu hěn hǎo.",
              "english": "Every one is good."
            },
            {
              "chinese": "条条路都很长。",
              "pinyin": "Tiáo tiáo lù dōu hěn cháng.",
              "english": "Every road is long."
            }
          ]
        },
        {
          "id": 3,
          "titleChinese": "连词“因为……所以……”",
          "titleEnglish": "Because...Therefore",
          "explanation": "因为 introduces a reason, and 所以 introduces the result. Either part may sometimes be omitted when context is clear.",
          "structure": "因为 + Reason，所以 + Result",
          "examples": [
            {
              "chinese": "因为下雨，所以我没去。",
              "pinyin": "Yīnwèi xià yǔ, suǒyǐ wǒ méi qù.",
              "english": "Because it rained, I didn’t go."
            },
            {
              "chinese": "因为面条很好吃，所以我想再吃。",
              "pinyin": "Yīnwèi miàntiáo hěn hǎochī, suǒyǐ wǒ xiǎng zài chī.",
              "english": "Because the noodles are tasty, I want to eat more."
            }
          ]
        }
      ],
      "exercises": [
        {
          "type": "multiple_choice",
          "question": "Which word means 'because'?",
          "options": [
            "所以",
            "因为",
            "怎么",
            "外"
          ],
          "answer": 1
        },
        {
          "type": "fill_blank",
          "question": "____我生病了，____我没去游泳。",
          "answer": "因为；所以"
        },
        {
          "type": "translate",
          "question": "Why did you stop eating?",
          "answer": "你怎么不吃了？"
        }
      ],
      "writingCharacters": [
        {
          "character": "因",
          "pinyin": "yīn",
          "strokes": 6,
          "meaning": "cause"
        },
        {
          "character": "所",
          "pinyin": "suǒ",
          "strokes": 8,
          "meaning": "therefore component"
        },
        {
          "character": "门",
          "pinyin": "mén",
          "strokes": 3,
          "meaning": "door"
        },
        {
          "character": "肉",
          "pinyin": "ròu",
          "strokes": 6,
          "meaning": "meat"
        }
      ],
      "speakingPrompts": [
        "Explain why you like or dislike one food.",
        "Ask a 怎么 question about a surprising situation.",
        "Say what sport you want to do and why."
      ]
    },
    {
      "id": 7,
      "hskLevel": 2,
      "titleChinese": "你家离公司远吗",
      "titlePinyin": "Nǐ jiā lí gōngsī yuǎn ma",
      "titleEnglish": "Do you live far from your company?",
      "pageNumber": 49,
      "vocabulary": [
        {
          "id": 71,
          "chinese": "到",
          "pinyin": "dào",
          "english": "to arrive; to reach",
          "partOfSpeech": "v."
        },
        {
          "id": 72,
          "chinese": "公共汽车",
          "pinyin": "gōnggòng qìchē",
          "english": "bus",
          "partOfSpeech": "n."
        },
        {
          "id": 73,
          "chinese": "公司",
          "pinyin": "gōngsī",
          "english": "company",
          "partOfSpeech": "n."
        },
        {
          "id": 74,
          "chinese": "机场",
          "pinyin": "jīchǎng",
          "english": "airport",
          "partOfSpeech": "n."
        },
        {
          "id": 75,
          "chinese": "教室",
          "pinyin": "jiàoshì",
          "english": "classroom",
          "partOfSpeech": "n."
        },
        {
          "id": 76,
          "chinese": "快",
          "pinyin": "kuài",
          "english": "fast; quick",
          "partOfSpeech": "adj."
        },
        {
          "id": 77,
          "chinese": "离",
          "pinyin": "lí",
          "english": "to be away from",
          "partOfSpeech": "v."
        },
        {
          "id": 78,
          "chinese": "路",
          "pinyin": "lù",
          "english": "road; way",
          "partOfSpeech": "n."
        },
        {
          "id": 79,
          "chinese": "慢",
          "pinyin": "màn",
          "english": "slow",
          "partOfSpeech": "adj."
        },
        {
          "id": 80,
          "chinese": "小时",
          "pinyin": "xiǎoshí",
          "english": "hour",
          "partOfSpeech": "n."
        },
        {
          "id": 81,
          "chinese": "远",
          "pinyin": "yuǎn",
          "english": "far",
          "partOfSpeech": "adj."
        },
        {
          "id": 82,
          "chinese": "走",
          "pinyin": "zǒu",
          "english": "to walk; to leave",
          "partOfSpeech": "v."
        }
      ],
      "dialogues": [
        {
          "id": 1,
          "titleChinese": "上班路上",
          "titleEnglish": "On the way to work",
          "trackNumber": "07-1",
          "lines": [
            {
              "speaker": "A",
              "chinese": "你家离公司远吗？",
              "pinyin": "Nǐ jiā lí gōngsī yuǎn ma?",
              "english": "Is your home far from the company?"
            },
            {
              "speaker": "B",
              "chinese": "不远，坐公共汽车二十分钟就到。",
              "pinyin": "Bù yuǎn, zuò gōnggòng qìchē èrshí fēnzhōng jiù dào.",
              "english": "Not far. It takes only twenty minutes by bus."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "去机场",
          "titleEnglish": "Going to the airport",
          "trackNumber": "07-2",
          "lines": [
            {
              "speaker": "A",
              "chinese": "去机场的路远吗？",
              "pinyin": "Qù jīchǎng de lù yuǎn ma?",
              "english": "Is the road to the airport far?"
            },
            {
              "speaker": "B",
              "chinese": "有点儿远，开车要一个小时呢。",
              "pinyin": "Yǒudiǎnr yuǎn, kāi chē yào yí ge xiǎoshí ne.",
              "english": "It’s a little far; driving takes an hour."
            }
          ]
        }
      ],
      "grammarPoints": [
        {
          "id": 1,
          "titleChinese": "语气副词“还”（二）",
          "titleEnglish": "The Modal Adverb 还 (2)",
          "explanation": "还 can indicate continuation, addition, or that a degree is acceptable.",
          "structure": "还 + Verb/Adj.",
          "examples": [
            {
              "chinese": "他还在教室。",
              "pinyin": "Tā hái zài jiàoshì.",
              "english": "He is still in the classroom."
            },
            {
              "chinese": "这条路还不远。",
              "pinyin": "Zhè tiáo lù hái bù yuǎn.",
              "english": "This road is not too far."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "时间副词“就”",
          "titleEnglish": "The Time Adverb 就",
          "explanation": "When used with time or distance, 就 can mean something happens sooner or more quickly than expected.",
          "structure": "Time/Distance + 就 + Verb",
          "examples": [
            {
              "chinese": "十分钟就到。",
              "pinyin": "Shí fēnzhōng jiù dào.",
              "english": "It takes only ten minutes to arrive."
            },
            {
              "chinese": "他明天就走。",
              "pinyin": "Tā míngtiān jiù zǒu.",
              "english": "He is leaving as early as tomorrow."
            }
          ]
        },
        {
          "id": 3,
          "titleChinese": "动词“离”",
          "titleEnglish": "The Verb 离",
          "explanation": "离 introduces the distance between two places or events.",
          "structure": "Place A + 离 + Place B + Distance/Adj.",
          "examples": [
            {
              "chinese": "我家离公司很近。",
              "pinyin": "Wǒ jiā lí gōngsī hěn jìn.",
              "english": "My home is close to the company."
            },
            {
              "chinese": "机场离这儿很远。",
              "pinyin": "Jīchǎng lí zhèr hěn yuǎn.",
              "english": "The airport is far from here."
            }
          ]
        },
        {
          "id": 4,
          "titleChinese": "语气助词“呢”",
          "titleEnglish": "The Modal Particle 呢",
          "explanation": "呢 can soften a statement or mark continuation in context.",
          "structure": "Statement + 呢",
          "examples": [
            {
              "chinese": "他还在路上呢。",
              "pinyin": "Tā hái zài lù shang ne.",
              "english": "He is still on the way."
            },
            {
              "chinese": "要一个小时呢。",
              "pinyin": "Yào yí ge xiǎoshí ne.",
              "english": "It takes a whole hour."
            }
          ]
        }
      ],
      "exercises": [
        {
          "type": "multiple_choice",
          "question": "Which sentence correctly uses 离?",
          "options": [
            "我离去公司。",
            "我家离公司很远。",
            "公司离去远。",
            "离我家公司远。"
          ],
          "answer": 1
        },
        {
          "type": "fill_blank",
          "question": "坐公共汽车二十分钟____到。",
          "answer": "就"
        },
        {
          "type": "translate",
          "question": "Is your home far from the company?",
          "answer": "你家离公司远吗？"
        }
      ],
      "writingCharacters": [
        {
          "character": "离",
          "pinyin": "lí",
          "strokes": 10,
          "meaning": "away from"
        },
        {
          "character": "远",
          "pinyin": "yuǎn",
          "strokes": 7,
          "meaning": "far"
        },
        {
          "character": "路",
          "pinyin": "lù",
          "strokes": 13,
          "meaning": "road"
        },
        {
          "character": "走",
          "pinyin": "zǒu",
          "strokes": 7,
          "meaning": "walk; leave"
        }
      ],
      "speakingPrompts": [
        "Describe how far your home is from school or work.",
        "Say how long it takes you to arrive somewhere.",
        "Use 呢 to emphasize a current situation."
      ]
    },
    {
      "id": 8,
      "hskLevel": 2,
      "titleChinese": "让我想想再告诉你",
      "titlePinyin": "Ràng wǒ xiǎngxiang zài gàosu nǐ",
      "titleEnglish": "Let me think about it and I’ll tell you later",
      "pageNumber": 57,
      "vocabulary": [
        {
          "id": 83,
          "chinese": "白",
          "pinyin": "bái",
          "english": "white",
          "partOfSpeech": "adj."
        },
        {
          "id": 84,
          "chinese": "服务员",
          "pinyin": "fúwùyuán",
          "english": "waiter; attendant",
          "partOfSpeech": "n."
        },
        {
          "id": 85,
          "chinese": "告诉",
          "pinyin": "gàosu",
          "english": "to tell",
          "partOfSpeech": "v."
        },
        {
          "id": 86,
          "chinese": "贵",
          "pinyin": "guì",
          "english": "expensive",
          "partOfSpeech": "adj."
        },
        {
          "id": 87,
          "chinese": "黑",
          "pinyin": "hēi",
          "english": "black",
          "partOfSpeech": "adj."
        },
        {
          "id": 88,
          "chinese": "让",
          "pinyin": "ràng",
          "english": "to let; to allow",
          "partOfSpeech": "v."
        },
        {
          "id": 89,
          "chinese": "事情",
          "pinyin": "shìqing",
          "english": "matter; thing",
          "partOfSpeech": "n."
        },
        {
          "id": 90,
          "chinese": "再",
          "pinyin": "zài",
          "english": "again; then/later",
          "partOfSpeech": "adv."
        },
        {
          "id": 91,
          "chinese": "找",
          "pinyin": "zhǎo",
          "english": "to look for",
          "partOfSpeech": "v."
        },
        {
          "id": 92,
          "chinese": "等",
          "pinyin": "děng",
          "english": "to wait",
          "partOfSpeech": "v."
        }
      ],
      "dialogues": [
        {
          "id": 1,
          "titleChinese": "做决定",
          "titleEnglish": "Making a decision",
          "trackNumber": "08-1",
          "lines": [
            {
              "speaker": "A",
              "chinese": "这件黑色的衣服贵不贵？",
              "pinyin": "Zhè jiàn hēisè de yīfu guì bu guì?",
              "english": "Is this black piece of clothing expensive?"
            },
            {
              "speaker": "B",
              "chinese": "让我想想再告诉你。",
              "pinyin": "Ràng wǒ xiǎngxiang zài gàosu nǐ.",
              "english": "Let me think about it and tell you later."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "找服务员",
          "titleEnglish": "Looking for the waiter",
          "trackNumber": "08-2",
          "lines": [
            {
              "speaker": "A",
              "chinese": "服务员在哪儿？",
              "pinyin": "Fúwùyuán zài nǎr?",
              "english": "Where is the waiter?"
            },
            {
              "speaker": "B",
              "chinese": "请等一下，我去找他。",
              "pinyin": "Qǐng děng yíxià, wǒ qù zhǎo tā.",
              "english": "Please wait a moment. I’ll go look for him."
            }
          ]
        }
      ],
      "grammarPoints": [
        {
          "id": 1,
          "titleChinese": "“……怎么样？”疑问句",
          "titleEnglish": "Questions with 怎么样",
          "explanation": "怎么样 asks for an opinion or suggestion about a person, object, or plan.",
          "structure": "Topic + 怎么样?",
          "examples": [
            {
              "chinese": "这件衣服怎么样？",
              "pinyin": "Zhè jiàn yīfu zěnmeyàng?",
              "english": "How is this clothing?"
            },
            {
              "chinese": "明天去怎么样？",
              "pinyin": "Míngtiān qù zěnmeyàng?",
              "english": "How about going tomorrow?"
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "副词“再”",
          "titleEnglish": "The Adverb 再",
          "explanation": "再 indicates doing something again or doing something later after another action.",
          "structure": "Action 1 + 再 + Action 2",
          "examples": [
            {
              "chinese": "我想想再告诉你。",
              "pinyin": "Wǒ xiǎngxiang zài gàosu nǐ.",
              "english": "I’ll think and then tell you."
            },
            {
              "chinese": "请再说一遍。",
              "pinyin": "Qǐng zài shuō yí biàn.",
              "english": "Please say it again."
            }
          ]
        },
        {
          "id": 3,
          "titleChinese": "兼语句",
          "titleEnglish": "Pivotal Sentences",
          "explanation": "In a pivotal sentence, the object of the first verb is also the subject of the second verb.",
          "structure": "Subject + Verb1 + Person + Verb2",
          "examples": [
            {
              "chinese": "妈妈让我学习。",
              "pinyin": "Māma ràng wǒ xuéxí.",
              "english": "Mom lets/tells me to study."
            },
            {
              "chinese": "老师让他进来。",
              "pinyin": "Lǎoshī ràng tā jìnlái.",
              "english": "The teacher let him come in."
            }
          ]
        },
        {
          "id": 4,
          "titleChinese": "动词重叠",
          "titleEnglish": "Reduplication of Verbs",
          "explanation": "Verb reduplication makes an action sound brief, casual, or tentative.",
          "structure": "Verb + Verb",
          "examples": [
            {
              "chinese": "你看看。",
              "pinyin": "Nǐ kànkan.",
              "english": "Take a look."
            },
            {
              "chinese": "我想想。",
              "pinyin": "Wǒ xiǎngxiang.",
              "english": "Let me think a bit."
            }
          ]
        }
      ],
      "exercises": [
        {
          "type": "multiple_choice",
          "question": "What does 再 often mean in 我想想再告诉你?",
          "options": [
            "already",
            "then/later",
            "very",
            "because"
          ],
          "answer": 1
        },
        {
          "type": "fill_blank",
          "question": "让____想想。",
          "answer": "我"
        },
        {
          "type": "translate",
          "question": "Please wait a moment.",
          "answer": "请等一下。"
        }
      ],
      "writingCharacters": [
        {
          "character": "让",
          "pinyin": "ràng",
          "strokes": 5,
          "meaning": "let"
        },
        {
          "character": "告",
          "pinyin": "gào",
          "strokes": 7,
          "meaning": "tell"
        },
        {
          "character": "诉",
          "pinyin": "sù",
          "strokes": 7,
          "meaning": "tell"
        },
        {
          "character": "黑",
          "pinyin": "hēi",
          "strokes": 12,
          "meaning": "black"
        }
      ],
      "speakingPrompts": [
        "Ask for more time before answering a question.",
        "Use 怎么样 to ask for an opinion.",
        "Make a sentence with 让."
      ]
    },
    {
      "id": 9,
      "hskLevel": 2,
      "titleChinese": "题太多，我没做完",
      "titlePinyin": "Tí tài duō, wǒ méi zuò wán",
      "titleEnglish": "There were too many questions; I didn’t finish all of them",
      "pageNumber": 65,
      "vocabulary": [
        {
          "id": 93,
          "chinese": "从",
          "pinyin": "cóng",
          "english": "from",
          "partOfSpeech": "prep."
        },
        {
          "id": 94,
          "chinese": "错",
          "pinyin": "cuò",
          "english": "wrong; incorrect",
          "partOfSpeech": "adj."
        },
        {
          "id": 95,
          "chinese": "第一",
          "pinyin": "dì-yī",
          "english": "first",
          "partOfSpeech": "num."
        },
        {
          "id": 96,
          "chinese": "懂",
          "pinyin": "dǒng",
          "english": "to understand",
          "partOfSpeech": "v."
        },
        {
          "id": 97,
          "chinese": "上班",
          "pinyin": "shàngbān",
          "english": "to go to work; be at work",
          "partOfSpeech": "v."
        },
        {
          "id": 98,
          "chinese": "题",
          "pinyin": "tí",
          "english": "question; problem",
          "partOfSpeech": "n."
        },
        {
          "id": 99,
          "chinese": "跳舞",
          "pinyin": "tiàowǔ",
          "english": "to dance",
          "partOfSpeech": "v."
        },
        {
          "id": 100,
          "chinese": "完",
          "pinyin": "wán",
          "english": "to finish",
          "partOfSpeech": "v./comp."
        },
        {
          "id": 101,
          "chinese": "问题",
          "pinyin": "wèntí",
          "english": "question; problem",
          "partOfSpeech": "n."
        },
        {
          "id": 102,
          "chinese": "希望",
          "pinyin": "xīwàng",
          "english": "to hope; hope",
          "partOfSpeech": "v./n."
        }
      ],
      "dialogues": [
        {
          "id": 1,
          "titleChinese": "考试以后",
          "titleEnglish": "After an exam",
          "trackNumber": "09-1",
          "lines": [
            {
              "speaker": "A",
              "chinese": "今天的题难吗？",
              "pinyin": "Jīntiān de tí nán ma?",
              "english": "Were today’s questions hard?"
            },
            {
              "speaker": "B",
              "chinese": "题太多，我没做完。",
              "pinyin": "Tí tài duō, wǒ méi zuò wán.",
              "english": "There were too many questions; I didn’t finish them."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "从哪儿来",
          "titleEnglish": "Where from",
          "trackNumber": "09-2",
          "lines": [
            {
              "speaker": "A",
              "chinese": "你从哪儿来？",
              "pinyin": "Nǐ cóng nǎr lái?",
              "english": "Where did you come from?"
            },
            {
              "speaker": "B",
              "chinese": "我从公司来，刚下班。",
              "pinyin": "Wǒ cóng gōngsī lái, gāng xiàbān.",
              "english": "I came from the company; I just got off work."
            }
          ]
        }
      ],
      "grammarPoints": [
        {
          "id": 1,
          "titleChinese": "结果补语",
          "titleEnglish": "Complements of Result",
          "explanation": "A result complement after a verb shows the result or completion of the action.",
          "structure": "Verb + Result Complement",
          "examples": [
            {
              "chinese": "我听懂了。",
              "pinyin": "Wǒ tīng dǒng le.",
              "english": "I understood what I heard."
            },
            {
              "chinese": "题没做完。",
              "pinyin": "Tí méi zuò wán.",
              "english": "The questions were not finished."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "介词“从”",
          "titleEnglish": "The Preposition 从",
          "explanation": "从 introduces a starting point in time, place, or sequence.",
          "structure": "从 + Place/Time + Verb",
          "examples": [
            {
              "chinese": "我从公司来。",
              "pinyin": "Wǒ cóng gōngsī lái.",
              "english": "I came from the company."
            },
            {
              "chinese": "从今天开始。",
              "pinyin": "Cóng jīntiān kāishǐ.",
              "english": "Starting from today."
            }
          ]
        },
        {
          "id": 3,
          "titleChinese": "“第”表示顺序",
          "titleEnglish": "第 Indicating Order",
          "explanation": "第 before a number forms ordinal numbers such as first, second, and third.",
          "structure": "第 + Number",
          "examples": [
            {
              "chinese": "第一题",
              "pinyin": "dì-yī tí",
              "english": "the first question"
            },
            {
              "chinese": "他是第一个到的。",
              "pinyin": "Tā shì dì-yī ge dào de.",
              "english": "He was the first to arrive."
            }
          ]
        }
      ],
      "exercises": [
        {
          "type": "multiple_choice",
          "question": "What does 做完 mean?",
          "options": [
            "to do wrong",
            "to finish doing",
            "to do from",
            "to hope"
          ],
          "answer": 1
        },
        {
          "type": "fill_blank",
          "question": "我____公司来。",
          "answer": "从"
        },
        {
          "type": "translate",
          "question": "I didn’t finish the questions.",
          "answer": "我没做完题。"
        }
      ],
      "writingCharacters": [
        {
          "character": "题",
          "pinyin": "tí",
          "strokes": 15,
          "meaning": "question"
        },
        {
          "character": "错",
          "pinyin": "cuò",
          "strokes": 13,
          "meaning": "wrong"
        },
        {
          "character": "完",
          "pinyin": "wán",
          "strokes": 7,
          "meaning": "finish"
        },
        {
          "character": "懂",
          "pinyin": "dǒng",
          "strokes": 15,
          "meaning": "understand"
        }
      ],
      "speakingPrompts": [
        "Talk about a test you did or did not finish.",
        "Say where you came from today using 从.",
        "Make two ordinal numbers with 第."
      ]
    },
    {
      "id": 10,
      "hskLevel": 2,
      "titleChinese": "别找了，手机在桌子上呢",
      "titlePinyin": "Bié zhǎo le, shǒujī zài zhuōzi shàng ne",
      "titleEnglish": "Stop looking for your cell phone; it’s on the desk",
      "pageNumber": 73,
      "vocabulary": [
        {
          "id": 103,
          "chinese": "帮助",
          "pinyin": "bāngzhù",
          "english": "to help; help",
          "partOfSpeech": "v./n."
        },
        {
          "id": 104,
          "chinese": "别",
          "pinyin": "bié",
          "english": "don’t",
          "partOfSpeech": "adv."
        },
        {
          "id": 105,
          "chinese": "哥哥",
          "pinyin": "gēge",
          "english": "elder brother",
          "partOfSpeech": "n."
        },
        {
          "id": 106,
          "chinese": "鸡蛋",
          "pinyin": "jīdàn",
          "english": "egg",
          "partOfSpeech": "n."
        },
        {
          "id": 107,
          "chinese": "课",
          "pinyin": "kè",
          "english": "class; lesson",
          "partOfSpeech": "n."
        },
        {
          "id": 108,
          "chinese": "手机",
          "pinyin": "shǒujī",
          "english": "cell phone",
          "partOfSpeech": "n."
        },
        {
          "id": 109,
          "chinese": "西瓜",
          "pinyin": "xīguā",
          "english": "watermelon",
          "partOfSpeech": "n."
        },
        {
          "id": 110,
          "chinese": "洗",
          "pinyin": "xǐ",
          "english": "to wash",
          "partOfSpeech": "v."
        },
        {
          "id": 111,
          "chinese": "正在",
          "pinyin": "zhèngzài",
          "english": "be in the process of",
          "partOfSpeech": "adv."
        }
      ],
      "dialogues": [
        {
          "id": 1,
          "titleChinese": "找手机",
          "titleEnglish": "Looking for a phone",
          "trackNumber": "10-1",
          "lines": [
            {
              "speaker": "A",
              "chinese": "我的手机在哪儿？",
              "pinyin": "Wǒ de shǒujī zài nǎr?",
              "english": "Where is my phone?"
            },
            {
              "speaker": "B",
              "chinese": "别找了，手机在桌子上呢。",
              "pinyin": "Bié zhǎo le, shǒujī zài zhuōzi shàng ne.",
              "english": "Stop looking. The phone is on the desk."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "正在做什么",
          "titleEnglish": "What are you doing",
          "trackNumber": "10-2",
          "lines": [
            {
              "speaker": "A",
              "chinese": "你哥哥正在做什么？",
              "pinyin": "Nǐ gēge zhèngzài zuò shénme?",
              "english": "What is your older brother doing?"
            },
            {
              "speaker": "B",
              "chinese": "他正在洗西瓜。",
              "pinyin": "Tā zhèngzài xǐ xīguā.",
              "english": "He is washing the watermelon."
            }
          ]
        }
      ],
      "grammarPoints": [
        {
          "id": 1,
          "titleChinese": "祈使句：别……了 / 不要……了",
          "titleEnglish": "Imperatives with 别...了 / 不要...了",
          "explanation": "别 or 不要 before a verb tells someone not to do something; 了 often signals stopping an action already happening.",
          "structure": "别/不要 + Verb + 了",
          "examples": [
            {
              "chinese": "别找了。",
              "pinyin": "Bié zhǎo le.",
              "english": "Stop looking."
            },
            {
              "chinese": "不要说话了。",
              "pinyin": "Bú yào shuōhuà le.",
              "english": "Stop talking."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "介词“对”",
          "titleEnglish": "The Preposition 对",
          "explanation": "对 introduces the object affected by an attitude, action, or statement.",
          "structure": "对 + Person/Thing + Verb/Adj.",
          "examples": [
            {
              "chinese": "他对我很好。",
              "pinyin": "Tā duì wǒ hěn hǎo.",
              "english": "He is very good to me."
            },
            {
              "chinese": "这个问题对我很难。",
              "pinyin": "Zhè ge wèntí duì wǒ hěn nán.",
              "english": "This question is difficult for me."
            }
          ]
        },
        {
          "id": 3,
          "titleChinese": "“正在”表示进行",
          "titleEnglish": "Ongoing Action with 正在",
          "explanation": "正在 before a verb marks that an action is happening right now.",
          "structure": "Subject + 正在 + Verb",
          "examples": [
            {
              "chinese": "他正在洗衣服。",
              "pinyin": "Tā zhèngzài xǐ yīfu.",
              "english": "He is washing clothes."
            },
            {
              "chinese": "我们正在上课。",
              "pinyin": "Wǒmen zhèngzài shàng kè.",
              "english": "We are having class."
            }
          ]
        }
      ],
      "exercises": [
        {
          "type": "multiple_choice",
          "question": "Which phrase means 'don’t look anymore'?",
          "options": [
            "再找",
            "别找了",
            "正在找",
            "找一下"
          ],
          "answer": 1
        },
        {
          "type": "fill_blank",
          "question": "他____洗西瓜。",
          "answer": "正在"
        },
        {
          "type": "translate",
          "question": "The phone is on the desk.",
          "answer": "手机在桌子上。"
        }
      ],
      "writingCharacters": [
        {
          "character": "别",
          "pinyin": "bié",
          "strokes": 7,
          "meaning": "do not"
        },
        {
          "character": "机",
          "pinyin": "jī",
          "strokes": 6,
          "meaning": "machine"
        },
        {
          "character": "洗",
          "pinyin": "xǐ",
          "strokes": 9,
          "meaning": "wash"
        },
        {
          "character": "课",
          "pinyin": "kè",
          "strokes": 10,
          "meaning": "lesson"
        }
      ],
      "speakingPrompts": [
        "Tell someone politely not to do something.",
        "Say what someone is doing right now.",
        "Describe where your phone is."
      ],
      "culturalNote": "Chinese tea culture is commonly discussed through ideas of hospitality, conversation, and serving guests. Offering tea is often a simple but meaningful gesture of welcome."
    },
    {
      "id": 11,
      "hskLevel": 2,
      "titleChinese": "他比我大三岁",
      "titlePinyin": "Tā bǐ wǒ dà sān suì",
      "titleEnglish": "He is three years older than me",
      "pageNumber": 81,
      "vocabulary": [
        {
          "id": 112,
          "chinese": "比",
          "pinyin": "bǐ",
          "english": "than; compare",
          "partOfSpeech": "prep."
        },
        {
          "id": 113,
          "chinese": "唱歌",
          "pinyin": "chàng gē",
          "english": "to sing",
          "partOfSpeech": "v."
        },
        {
          "id": 114,
          "chinese": "孩子",
          "pinyin": "háizi",
          "english": "child",
          "partOfSpeech": "n."
        },
        {
          "id": 115,
          "chinese": "男",
          "pinyin": "nán",
          "english": "male; man",
          "partOfSpeech": "adj./n."
        },
        {
          "id": 116,
          "chinese": "女",
          "pinyin": "nǚ",
          "english": "female; woman",
          "partOfSpeech": "adj./n."
        },
        {
          "id": 117,
          "chinese": "便宜",
          "pinyin": "piányi",
          "english": "cheap; inexpensive",
          "partOfSpeech": "adj."
        },
        {
          "id": 118,
          "chinese": "去年",
          "pinyin": "qùnián",
          "english": "last year",
          "partOfSpeech": "n."
        },
        {
          "id": 119,
          "chinese": "说话",
          "pinyin": "shuōhuà",
          "english": "to speak; to talk",
          "partOfSpeech": "v."
        },
        {
          "id": 120,
          "chinese": "姓",
          "pinyin": "xìng",
          "english": "to be surnamed; surname",
          "partOfSpeech": "v./n."
        },
        {
          "id": 121,
          "chinese": "右边",
          "pinyin": "yòubian",
          "english": "right side",
          "partOfSpeech": "n."
        },
        {
          "id": 122,
          "chinese": "可能",
          "pinyin": "kěnéng",
          "english": "maybe; possible",
          "partOfSpeech": "aux./adj."
        }
      ],
      "dialogues": [
        {
          "id": 1,
          "titleChinese": "年龄比较",
          "titleEnglish": "Comparing ages",
          "trackNumber": "11-1",
          "lines": [
            {
              "speaker": "A",
              "chinese": "你哥哥多大？",
              "pinyin": "Nǐ gēge duō dà?",
              "english": "How old is your older brother?"
            },
            {
              "speaker": "B",
              "chinese": "他比我大三岁。",
              "pinyin": "Tā bǐ wǒ dà sān suì.",
              "english": "He is three years older than me."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "介绍孩子",
          "titleEnglish": "Introducing a child",
          "trackNumber": "11-2",
          "lines": [
            {
              "speaker": "A",
              "chinese": "右边那个男孩子姓什么？",
              "pinyin": "Yòubian nà ge nán háizi xìng shénme?",
              "english": "What is the surname of the boy on the right?"
            },
            {
              "speaker": "B",
              "chinese": "他姓王，可能很喜欢唱歌。",
              "pinyin": "Tā xìng Wáng, kěnéng hěn xǐhuan chàng gē.",
              "english": "His surname is Wang. He may really like singing."
            }
          ]
        }
      ],
      "grammarPoints": [
        {
          "id": 1,
          "titleChinese": "动词短语作定语",
          "titleEnglish": "Verb Phrase as Attributive",
          "explanation": "A verb phrase can modify a noun before 的, describing the noun by an action or relationship.",
          "structure": "Verb Phrase + 的 + Noun",
          "examples": [
            {
              "chinese": "唱歌的孩子",
              "pinyin": "chàng gē de háizi",
              "english": "the child who sings"
            },
            {
              "chinese": "说话的人",
              "pinyin": "shuōhuà de rén",
              "english": "the person who is speaking"
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "“比”字句（一）",
          "titleEnglish": "The 比 Sentence (1)",
          "explanation": "比 compares two people or things with respect to an adjective or verb phrase.",
          "structure": "A + 比 + B + Adj.",
          "examples": [
            {
              "chinese": "他比我高。",
              "pinyin": "Tā bǐ wǒ gāo.",
              "english": "He is taller than me."
            },
            {
              "chinese": "这个比那个便宜。",
              "pinyin": "Zhè ge bǐ nà ge piányi.",
              "english": "This one is cheaper than that one."
            }
          ]
        },
        {
          "id": 3,
          "titleChinese": "助动词“可能”",
          "titleEnglish": "The Auxiliary Verb 可能",
          "explanation": "可能 expresses possibility or uncertainty.",
          "structure": "Subject + 可能 + Verb/Adj.",
          "examples": [
            {
              "chinese": "他可能在家。",
              "pinyin": "Tā kěnéng zài jiā.",
              "english": "He may be at home."
            },
            {
              "chinese": "明天可能下雪。",
              "pinyin": "Míngtiān kěnéng xià xuě.",
              "english": "It may snow tomorrow."
            }
          ]
        }
      ],
      "exercises": [
        {
          "type": "multiple_choice",
          "question": "Which sentence means 'He is older than me'?",
          "options": [
            "他比我大。",
            "他对我大。",
            "他从我大。",
            "他离我大。"
          ],
          "answer": 0
        },
        {
          "type": "fill_blank",
          "question": "明天____下雨。",
          "answer": "可能"
        },
        {
          "type": "translate",
          "question": "This one is cheaper than that one.",
          "answer": "这个比那个便宜。"
        }
      ],
      "writingCharacters": [
        {
          "character": "比",
          "pinyin": "bǐ",
          "strokes": 4,
          "meaning": "compare"
        },
        {
          "character": "男",
          "pinyin": "nán",
          "strokes": 7,
          "meaning": "male"
        },
        {
          "character": "女",
          "pinyin": "nǚ",
          "strokes": 3,
          "meaning": "female"
        },
        {
          "character": "姓",
          "pinyin": "xìng",
          "strokes": 8,
          "meaning": "surname"
        }
      ],
      "speakingPrompts": [
        "Compare your age with a friend’s age.",
        "Describe a person using a verb phrase plus 的.",
        "Say one thing that may happen tomorrow."
      ]
    },
    {
      "id": 12,
      "hskLevel": 2,
      "titleChinese": "你穿得太少了",
      "titlePinyin": "Nǐ chuān de tài shǎo le",
      "titleEnglish": "You wear too little",
      "pageNumber": 89,
      "vocabulary": [
        {
          "id": 123,
          "chinese": "穿",
          "pinyin": "chuān",
          "english": "to wear; to put on",
          "partOfSpeech": "v."
        },
        {
          "id": 124,
          "chinese": "得",
          "pinyin": "de",
          "english": "structural particle for complements",
          "partOfSpeech": "part."
        },
        {
          "id": 125,
          "chinese": "弟弟",
          "pinyin": "dìdi",
          "english": "younger brother",
          "partOfSpeech": "n."
        },
        {
          "id": 126,
          "chinese": "进",
          "pinyin": "jìn",
          "english": "to enter; to come/go in",
          "partOfSpeech": "v."
        },
        {
          "id": 127,
          "chinese": "近",
          "pinyin": "jìn",
          "english": "near; close",
          "partOfSpeech": "adj."
        },
        {
          "id": 128,
          "chinese": "零",
          "pinyin": "líng",
          "english": "zero",
          "partOfSpeech": "num."
        },
        {
          "id": 129,
          "chinese": "妻子",
          "pinyin": "qīzi",
          "english": "wife",
          "partOfSpeech": "n."
        },
        {
          "id": 130,
          "chinese": "雪",
          "pinyin": "xuě",
          "english": "snow",
          "partOfSpeech": "n."
        }
      ],
      "dialogues": [
        {
          "id": 1,
          "titleChinese": "天气冷",
          "titleEnglish": "Cold weather",
          "trackNumber": "12-1",
          "lines": [
            {
              "speaker": "A",
              "chinese": "外面下雪了，你穿得太少了。",
              "pinyin": "Wàimian xià xuě le, nǐ chuān de tài shǎo le.",
              "english": "It’s snowing outside. You are wearing too little."
            },
            {
              "speaker": "B",
              "chinese": "我马上进去穿一件衣服。",
              "pinyin": "Wǒ mǎshàng jìnqù chuān yí jiàn yīfu.",
              "english": "I’ll go in and put on a piece of clothing right away."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "住得近",
          "titleEnglish": "Living nearby",
          "trackNumber": "12-2",
          "lines": [
            {
              "speaker": "A",
              "chinese": "你弟弟住得离学校近吗？",
              "pinyin": "Nǐ dìdi zhù de lí xuéxiào jìn ma?",
              "english": "Does your younger brother live close to school?"
            },
            {
              "speaker": "B",
              "chinese": "很近，走路十分钟就到。",
              "pinyin": "Hěn jìn, zǒulù shí fēnzhōng jiù dào.",
              "english": "Very close. Walking takes only ten minutes."
            }
          ]
        }
      ],
      "grammarPoints": [
        {
          "id": 1,
          "titleChinese": "程度补语",
          "titleEnglish": "Complements of Degree",
          "explanation": "A degree complement after 得 describes how well, much, or intensely an action is done.",
          "structure": "Verb + 得 + Degree/Description",
          "examples": [
            {
              "chinese": "他说得很好。",
              "pinyin": "Tā shuō de hěn hǎo.",
              "english": "He speaks very well."
            },
            {
              "chinese": "你穿得太少了。",
              "pinyin": "Nǐ chuān de tài shǎo le.",
              "english": "You are wearing too little."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "“比”字句（二）",
          "titleEnglish": "The 比 Sentence (2)",
          "explanation": "比 sentences can include a specific difference after the adjective.",
          "structure": "A + 比 + B + Adj. + Difference",
          "examples": [
            {
              "chinese": "他比我大三岁。",
              "pinyin": "Tā bǐ wǒ dà sān suì.",
              "english": "He is three years older than me."
            },
            {
              "chinese": "今天比昨天冷两度。",
              "pinyin": "Jīntiān bǐ zuótiān lěng liǎng dù.",
              "english": "Today is two degrees colder than yesterday."
            }
          ]
        }
      ],
      "exercises": [
        {
          "type": "multiple_choice",
          "question": "What does 得 introduce in 说得很好?",
          "options": [
            "object",
            "degree complement",
            "time",
            "question"
          ],
          "answer": 1
        },
        {
          "type": "fill_blank",
          "question": "他说____很快。",
          "answer": "得"
        },
        {
          "type": "translate",
          "question": "You are wearing too little.",
          "answer": "你穿得太少了。"
        }
      ],
      "writingCharacters": [
        {
          "character": "穿",
          "pinyin": "chuān",
          "strokes": 9,
          "meaning": "wear"
        },
        {
          "character": "雪",
          "pinyin": "xuě",
          "strokes": 11,
          "meaning": "snow"
        },
        {
          "character": "进",
          "pinyin": "jìn",
          "strokes": 7,
          "meaning": "enter"
        },
        {
          "character": "近",
          "pinyin": "jìn",
          "strokes": 7,
          "meaning": "near"
        }
      ],
      "speakingPrompts": [
        "Describe how well you speak Chinese using 得.",
        "Compare two places by distance.",
        "Talk about what you wear when it snows."
      ]
    },
    {
      "id": 13,
      "hskLevel": 2,
      "titleChinese": "门开着呢",
      "titlePinyin": "Mén kāi zhe ne",
      "titleEnglish": "The door is open",
      "pageNumber": 97,
      "vocabulary": [
        {
          "id": 131,
          "chinese": "宾馆",
          "pinyin": "bīnguǎn",
          "english": "hotel",
          "partOfSpeech": "n."
        },
        {
          "id": 132,
          "chinese": "铅笔",
          "pinyin": "qiānbǐ",
          "english": "pencil",
          "partOfSpeech": "n."
        },
        {
          "id": 133,
          "chinese": "笑",
          "pinyin": "xiào",
          "english": "to smile; to laugh",
          "partOfSpeech": "v."
        },
        {
          "id": 134,
          "chinese": "往",
          "pinyin": "wǎng",
          "english": "towards",
          "partOfSpeech": "prep."
        },
        {
          "id": 135,
          "chinese": "着",
          "pinyin": "zhe",
          "english": "particle indicating a continuing state",
          "partOfSpeech": "part."
        }
      ],
      "dialogues": [
        {
          "id": 1,
          "titleChinese": "进房间",
          "titleEnglish": "Entering a room",
          "trackNumber": "13-1",
          "lines": [
            {
              "speaker": "A",
              "chinese": "门开着呢，进来吧。",
              "pinyin": "Mén kāi zhe ne, jìnlái ba.",
              "english": "The door is open. Come in."
            },
            {
              "speaker": "B",
              "chinese": "谢谢。我正在找我的铅笔。",
              "pinyin": "Xièxie. Wǒ zhèngzài zhǎo wǒ de qiānbǐ.",
              "english": "Thanks. I’m looking for my pencil."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "去宾馆",
          "titleEnglish": "Going to the hotel",
          "trackNumber": "13-2",
          "lines": [
            {
              "speaker": "A",
              "chinese": "宾馆在哪儿？",
              "pinyin": "Bīnguǎn zài nǎr?",
              "english": "Where is the hotel?"
            },
            {
              "speaker": "B",
              "chinese": "往前走，右边那个就是。",
              "pinyin": "Wǎng qián zǒu, yòubian nà ge jiù shì.",
              "english": "Walk forward; the one on the right is it."
            }
          ]
        }
      ],
      "grammarPoints": [
        {
          "id": 1,
          "titleChinese": "动态助词“着”",
          "titleEnglish": "The Structural Particle 着",
          "explanation": "着 after a verb indicates that a state continues after an action.",
          "structure": "Verb + 着",
          "examples": [
            {
              "chinese": "门开着。",
              "pinyin": "Mén kāi zhe.",
              "english": "The door is open."
            },
            {
              "chinese": "他笑着说话。",
              "pinyin": "Tā xiào zhe shuōhuà.",
              "english": "He speaks while smiling."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "反问句“不是……吗？”",
          "titleEnglish": "Rhetorical Question 不是...吗",
          "explanation": "不是...吗 is often used when the speaker expects agreement or reminds the listener of something known.",
          "structure": "不是 + Statement + 吗?",
          "examples": [
            {
              "chinese": "你不是知道吗？",
              "pinyin": "Nǐ bú shì zhīdào ma?",
              "english": "Don’t you already know?"
            },
            {
              "chinese": "他不是在宾馆吗？",
              "pinyin": "Tā bú shì zài bīnguǎn ma?",
              "english": "Isn’t he at the hotel?"
            }
          ]
        },
        {
          "id": 3,
          "titleChinese": "介词“往”",
          "titleEnglish": "The Preposition 往",
          "explanation": "往 introduces the direction of movement.",
          "structure": "往 + Direction/Place + Verb",
          "examples": [
            {
              "chinese": "往前走。",
              "pinyin": "Wǎng qián zǒu.",
              "english": "Walk forward."
            },
            {
              "chinese": "往左边看。",
              "pinyin": "Wǎng zuǒbian kàn.",
              "english": "Look to the left."
            }
          ]
        }
      ],
      "exercises": [
        {
          "type": "multiple_choice",
          "question": "What does 着 indicate in 门开着?",
          "options": [
            "completed action",
            "continuing state",
            "future plan",
            "comparison"
          ],
          "answer": 1
        },
        {
          "type": "fill_blank",
          "question": "____前走。",
          "answer": "往"
        },
        {
          "type": "translate",
          "question": "The door is open.",
          "answer": "门开着呢。"
        }
      ],
      "writingCharacters": [
        {
          "character": "着",
          "pinyin": "zhe",
          "strokes": 11,
          "meaning": "state particle"
        },
        {
          "character": "笑",
          "pinyin": "xiào",
          "strokes": 10,
          "meaning": "smile"
        },
        {
          "character": "铅",
          "pinyin": "qiān",
          "strokes": 10,
          "meaning": "lead"
        },
        {
          "character": "笔",
          "pinyin": "bǐ",
          "strokes": 10,
          "meaning": "pen; pencil"
        }
      ],
      "speakingPrompts": [
        "Describe the state of an object using 着.",
        "Give directions using 往.",
        "Ask a rhetorical question using 不是……吗."
      ]
    },
    {
      "id": 14,
      "hskLevel": 2,
      "titleChinese": "你看过那个电影吗",
      "titlePinyin": "Nǐ kànguo nà ge diànyǐng ma",
      "titleEnglish": "Have you seen that movie?",
      "pageNumber": 105,
      "vocabulary": [
        {
          "id": 136,
          "chinese": "百",
          "pinyin": "bǎi",
          "english": "hundred",
          "partOfSpeech": "num."
        },
        {
          "id": 137,
          "chinese": "次",
          "pinyin": "cì",
          "english": "time; occurrence",
          "partOfSpeech": "m."
        },
        {
          "id": 138,
          "chinese": "但是",
          "pinyin": "dànshì",
          "english": "but; however",
          "partOfSpeech": "conj."
        },
        {
          "id": 139,
          "chinese": "晴",
          "pinyin": "qíng",
          "english": "sunny; clear",
          "partOfSpeech": "adj."
        },
        {
          "id": 140,
          "chinese": "虽然",
          "pinyin": "suīrán",
          "english": "although",
          "partOfSpeech": "conj."
        },
        {
          "id": 141,
          "chinese": "玩儿",
          "pinyin": "wánr",
          "english": "to play; to have fun",
          "partOfSpeech": "v."
        },
        {
          "id": 142,
          "chinese": "过",
          "pinyin": "guo",
          "english": "particle indicating experience",
          "partOfSpeech": "part."
        },
        {
          "id": 143,
          "chinese": "有意思",
          "pinyin": "yǒu yìsi",
          "english": "interesting; fun",
          "partOfSpeech": "adj."
        }
      ],
      "dialogues": [
        {
          "id": 1,
          "titleChinese": "看电影",
          "titleEnglish": "Watching a movie",
          "trackNumber": "14-1",
          "lines": [
            {
              "speaker": "A",
              "chinese": "你看过那个电影吗？",
              "pinyin": "Nǐ kànguo nà ge diànyǐng ma?",
              "english": "Have you seen that movie?"
            },
            {
              "speaker": "B",
              "chinese": "看过一次，很有意思。",
              "pinyin": "Kànguo yí cì, hěn yǒu yìsi.",
              "english": "I’ve seen it once. It’s very interesting."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "出去玩儿",
          "titleEnglish": "Going out for fun",
          "trackNumber": "14-2",
          "lines": [
            {
              "speaker": "A",
              "chinese": "虽然今天不晴，但是我们还去玩儿吗？",
              "pinyin": "Suīrán jīntiān bù qíng, dànshì wǒmen hái qù wánr ma?",
              "english": "Although it isn’t sunny today, are we still going out to have fun?"
            },
            {
              "speaker": "B",
              "chinese": "去吧，我已经准备好了。",
              "pinyin": "Qù ba, wǒ yǐjīng zhǔnbèi hǎo le.",
              "english": "Let’s go. I’m already ready."
            }
          ]
        }
      ],
      "grammarPoints": [
        {
          "id": 1,
          "titleChinese": "动态助词“过”",
          "titleEnglish": "The Experiential Particle 过",
          "explanation": "过 after a verb indicates that someone has had an experience before.",
          "structure": "Verb + 过 + Object",
          "examples": [
            {
              "chinese": "我看过这个电影。",
              "pinyin": "Wǒ kànguo zhè ge diànyǐng.",
              "english": "I have seen this movie."
            },
            {
              "chinese": "你去过北京吗？",
              "pinyin": "Nǐ qùguo Běijīng ma?",
              "english": "Have you been to Beijing?"
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "连词“虽然……但是……”",
          "titleEnglish": "Although...But",
          "explanation": "虽然 introduces a concession, and 但是 introduces the contrasting result.",
          "structure": "虽然 + Clause，但是 + Clause",
          "examples": [
            {
              "chinese": "虽然很冷，但是我想出去。",
              "pinyin": "Suīrán hěn lěng, dànshì wǒ xiǎng chūqù.",
              "english": "Although it is cold, I want to go out."
            },
            {
              "chinese": "虽然题很多，但是我做完了。",
              "pinyin": "Suīrán tí hěn duō, dànshì wǒ zuòwán le.",
              "english": "Although there were many questions, I finished them."
            }
          ]
        },
        {
          "id": 3,
          "titleChinese": "次数补语",
          "titleEnglish": "Complement of Frequency",
          "explanation": "A frequency complement tells how many times an action has occurred.",
          "structure": "Verb + Number + 次",
          "examples": [
            {
              "chinese": "我看过一次。",
              "pinyin": "Wǒ kànguo yí cì.",
              "english": "I have seen it once."
            },
            {
              "chinese": "他去过两次。",
              "pinyin": "Tā qùguo liǎng cì.",
              "english": "He has gone twice."
            }
          ]
        }
      ],
      "exercises": [
        {
          "type": "multiple_choice",
          "question": "Which particle marks experience?",
          "options": [
            "着",
            "过",
            "吧",
            "呢"
          ],
          "answer": 1
        },
        {
          "type": "fill_blank",
          "question": "我看____这个电影。",
          "answer": "过"
        },
        {
          "type": "translate",
          "question": "Although it is cold, I still want to go.",
          "answer": "虽然很冷，但是我还想去。"
        }
      ],
      "writingCharacters": [
        {
          "character": "百",
          "pinyin": "bǎi",
          "strokes": 6,
          "meaning": "hundred"
        },
        {
          "character": "次",
          "pinyin": "cì",
          "strokes": 6,
          "meaning": "time"
        },
        {
          "character": "晴",
          "pinyin": "qíng",
          "strokes": 12,
          "meaning": "sunny"
        },
        {
          "character": "过",
          "pinyin": "guo",
          "strokes": 6,
          "meaning": "experience particle"
        }
      ],
      "speakingPrompts": [
        "Ask a classmate whether they have been to a city.",
        "Say how many times you have watched a movie.",
        "Make a sentence with 虽然……但是……."
      ]
    },
    {
      "id": 15,
      "hskLevel": 2,
      "titleChinese": "新年就要到了",
      "titlePinyin": "Xīnnián jiù yào dào le",
      "titleEnglish": "The New Year is coming",
      "pageNumber": 113,
      "vocabulary": [
        {
          "id": 144,
          "chinese": "大家",
          "pinyin": "dàjiā",
          "english": "everyone; everybody",
          "partOfSpeech": "pron."
        },
        {
          "id": 145,
          "chinese": "火车站",
          "pinyin": "huǒchēzhàn",
          "english": "railway station",
          "partOfSpeech": "n."
        },
        {
          "id": 146,
          "chinese": "妹妹",
          "pinyin": "mèimei",
          "english": "younger sister",
          "partOfSpeech": "n."
        },
        {
          "id": 147,
          "chinese": "票",
          "pinyin": "piào",
          "english": "ticket",
          "partOfSpeech": "n."
        },
        {
          "id": 148,
          "chinese": "日",
          "pinyin": "rì",
          "english": "day; date",
          "partOfSpeech": "n."
        },
        {
          "id": 149,
          "chinese": "阴",
          "pinyin": "yīn",
          "english": "overcast; cloudy",
          "partOfSpeech": "adj."
        },
        {
          "id": 150,
          "chinese": "新年",
          "pinyin": "xīnnián",
          "english": "New Year",
          "partOfSpeech": "n."
        }
      ],
      "dialogues": [
        {
          "id": 1,
          "titleChinese": "新年计划",
          "titleEnglish": "New Year plans",
          "trackNumber": "15-1",
          "lines": [
            {
              "speaker": "A",
              "chinese": "新年就要到了，你准备做什么？",
              "pinyin": "Xīnnián jiù yào dào le, nǐ zhǔnbèi zuò shénme?",
              "english": "The New Year is coming. What are you planning to do?"
            },
            {
              "speaker": "B",
              "chinese": "我想给大家买票，一起去看电影。",
              "pinyin": "Wǒ xiǎng gěi dàjiā mǎi piào, yìqǐ qù kàn diànyǐng.",
              "english": "I want to buy tickets for everyone and go see a movie together."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "去火车站",
          "titleEnglish": "Going to the railway station",
          "trackNumber": "15-2",
          "lines": [
            {
              "speaker": "A",
              "chinese": "你妹妹哪天到火车站？",
              "pinyin": "Nǐ mèimei nǎ tiān dào huǒchēzhàn?",
              "english": "Which day will your younger sister arrive at the railway station?"
            },
            {
              "speaker": "B",
              "chinese": "十二月二十日到。",
              "pinyin": "Shí'èr yuè èrshí rì dào.",
              "english": "She will arrive on December 20."
            },
            {
              "speaker": "A",
              "chinese": "天气可能是阴天。",
              "pinyin": "Tiānqì kěnéng shì yīn tiān.",
              "english": "The weather may be overcast."
            }
          ]
        }
      ],
      "grammarPoints": [
        {
          "id": 1,
          "titleChinese": "“就要……了”表示即将发生",
          "titleEnglish": "就要...了 Indicating Imminence",
          "explanation": "就要...了 shows that something will happen very soon, often used with a near future event.",
          "structure": "Subject + 就要 + Verb/Adj. + 了",
          "examples": [
            {
              "chinese": "新年就要到了。",
              "pinyin": "Xīnnián jiù yào dào le.",
              "english": "The New Year is coming soon."
            },
            {
              "chinese": "电影就要开始了。",
              "pinyin": "Diànyǐng jiù yào kāishǐ le.",
              "english": "The movie is about to start."
            }
          ]
        },
        {
          "id": 2,
          "titleChinese": "“快要……了”结构",
          "titleEnglish": "The 快要...了 Structure",
          "explanation": "快要...了 also means an action or event is about to happen. It cannot normally be used with a specific future time word.",
          "structure": "Subject + 快要 + Verb/Adj. + 了",
          "examples": [
            {
              "chinese": "快要下雪了。",
              "pinyin": "Kuài yào xià xuě le.",
              "english": "It is about to snow."
            },
            {
              "chinese": "火车快要到了。",
              "pinyin": "Huǒchē kuài yào dào le.",
              "english": "The train is about to arrive."
            }
          ]
        }
      ],
      "exercises": [
        {
          "type": "multiple_choice",
          "question": "Which phrase means 'is about to arrive'?",
          "options": [
            "已经到了",
            "就要到了",
            "到过了",
            "正在到"
          ],
          "answer": 1
        },
        {
          "type": "fill_blank",
          "question": "新年____到了。",
          "answer": "就要"
        },
        {
          "type": "translate",
          "question": "The train is about to arrive.",
          "answer": "火车快要到了。"
        }
      ],
      "writingCharacters": [
        {
          "character": "新",
          "pinyin": "xīn",
          "strokes": 13,
          "meaning": "new"
        },
        {
          "character": "年",
          "pinyin": "nián",
          "strokes": 6,
          "meaning": "year"
        },
        {
          "character": "票",
          "pinyin": "piào",
          "strokes": 11,
          "meaning": "ticket"
        },
        {
          "character": "站",
          "pinyin": "zhàn",
          "strokes": 10,
          "meaning": "station"
        }
      ],
      "speakingPrompts": [
        "Tell your partner what you will do for New Year.",
        "Say that an event is about to begin.",
        "Ask what date someone will arrive."
      ],
      "culturalNote": "The Spring Festival is the most important traditional Chinese festival. People commonly travel home, gather with family, eat symbolic foods, and exchange New Year greetings."
    }
  ];
  
  export function getAllHSK2Lessons(): Lesson[] {
    return HSK2_LESSONS;
  }
  
  export function getHSK2LessonById(id: number): Lesson | undefined {
    return HSK2_LESSONS.find(l => l.id === id);
  }
  
  export function getHSK2LessonsByLevel(level: number): Lesson[] {
    return HSK2_LESSONS.filter(l => l.hskLevel === level);
  }
  
  // Compatibility aliases matching the HSK 1 lesson file API.
  export function getAllLessons(): Lesson[] {
    return HSK2_LESSONS;
  }
  
  export function getLessonById(id: number): Lesson | undefined {
    return HSK2_LESSONS.find(l => l.id === id);
  }
  
  export function getLessonsByLevel(level: number): Lesson[] {
    return HSK2_LESSONS.filter(l => l.hskLevel === level);
  }