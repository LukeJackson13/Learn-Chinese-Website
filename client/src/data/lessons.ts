// Textbook dialogues for pronunciation practice, copied from 我會說華語 2 (I Can Speak Chinese 2).
// Pinyin follows the book, including its word grouping and Taiwan pronunciations.

export interface DialogueLine {
  speaker: string
  hanzi: string
  pinyin: string
  english: string
}

export interface DialogueScene {
  title: string
  lines: DialogueLine[]
}

export interface Lesson {
  id: string
  number: number
  title: string
  pinyin: string
  english: string
  book: string
  scenes: DialogueScene[]
}

const line = (speaker: string, hanzi: string, pinyin: string, english: string): DialogueLine => ({ speaker, hanzi, pinyin, english })

export const lessons: Lesson[] = [
  {
    id: '1',
    number: 1,
    title: '問候語',
    pinyin: 'wènhòuyǔ',
    english: 'Greetings',
    book: '我會說華語 2, Lesson 01',
    scenes: [
      {
        title: 'Bumping into a friend',
        lines: [
          line('朋友', '家明，好久不見。', 'Jiāmíng, hǎojiǔbújiàn.', 'Jiaming, long time no see.'),
          line('家明', '好久不見。最近怎麼樣？', 'Hǎojiǔbújiàn. Zuìjìn zěnmeyàng?', 'Long time no see. How are you doing?'),
          line('朋友', '很好。你要去哪裡？', 'Hěn hǎo. Nǐ yào qù nǎlǐ?', 'Fine. Where are you headed?'),
          line('家明', '我要去吃飯。你要不要一起去？', 'Wǒ yào qù chīfàn. Nǐ yào búyào yìqǐ qù?', 'I am going to get something to eat. Do you want to go with me?'),
          line('朋友', '好啊。', 'Hǎo a.', 'Okay.'),
        ],
      },
      {
        title: 'At the restaurant',
        lines: [
          line('服務生', '歡迎光臨！請問幾位？', 'Huānyíngguānglín! Qǐngwèn jǐwèi?', 'Welcome! How many are in your party?'),
          line('家明', '兩位。', 'Liǎng wèi.', 'A table for two, please.'),
          line('服務生', '這邊請。', 'Zhèbiān qǐng.', 'This way, please.'),
        ],
      },
      {
        title: 'On the basketball court',
        lines: [
          line('朋友', '安妮，好久不見！', 'Ānní, hǎojiǔbújiàn!', 'Annie, long time no see!'),
          line('安妮', '是啊！你最近都在做什麼？', 'Shì a! Nǐ zuìjìn dōu zài zuò shénme?', 'Yeah! What have you been doing lately?'),
          line('朋友', '我參加了籃球隊。你呢？', 'Wǒ cānjiāle lánqiú duì. Nǐ ne?', 'I\'ve joined the basketball team. How about you?'),
          line('安妮', '我今年開始上中文課了。漢字好難喔！', 'Wǒ jīnnián kāishǐ shàng Zhōngwén kè le. Hànzì hǎo nán ō!', 'I\'ve been taking Chinese lessons this year. Chinese characters are really difficult for me.'),
          line('朋友', '是嗎？加油！', 'Shì ma? Jiāyóu!', 'Really? You can do it!'),
        ],
      },
    ],
  },
]

// What the speaker labels mean, for readers who don't know them yet.
export const speakerNames: Record<string, string> = {
  朋友: 'friend',
  服務生: 'waiter',
  家明: 'Jiaming',
  安妮: 'Annie',
}
