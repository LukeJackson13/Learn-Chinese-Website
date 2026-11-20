// Textbook lessons for pronunciation practice, copied from 我會說華語 (I Can Speak Chinese) books 1 and 2.
// Pinyin follows the books, including their word grouping and Taiwan pronunciations.

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

export interface PracticeWord {
  hanzi: string
  pinyin: string
  english: string
}

// A headword (like 豬 zhū) and words built from it, a themed word list (like drinks), or a labelled drill.
export interface WordGroup {
  head?: PracticeWord
  label?: string
  words: PracticeWord[]
}

export interface FamilyMember extends PracticeWord {
  image: string
}

// One parent's side of the family: grandparents, the parent's brothers and sisters, and the parent.
export interface FamilySide {
  label: string
  grandparents: FamilyMember[]
  relatives: FamilyMember[]
  parent: FamilyMember
}

export interface FamilyTree {
  title: PracticeWord
  sides: FamilySide[]
  children: FamilyMember[]
}

export interface PracticeSection {
  title: string
  english: string
  description: string
  examples?: PracticeWord[]
  groups: WordGroup[]
}

export interface Lesson {
  id: string
  book: number
  number: number
  title: string
  pinyin: string
  english: string
  scenes: DialogueScene[]
  familyTree?: FamilyTree
  practice?: PracticeSection[]
}

const line = (speaker: string, hanzi: string, pinyin: string, english: string): DialogueLine => ({ speaker, hanzi, pinyin, english })
const word = (hanzi: string, pinyin: string, english: string): PracticeWord => ({ hanzi, pinyin, english })
const member = (hanzi: string, pinyin: string, english: string, image: string): FamilyMember =>
  ({ hanzi, pinyin, english, image: `/images/family/${image}.png` })

export const bookTitle = (book: number) => `我會說華語 ${book}`

export const lessons: Lesson[] = [
  {
    id: 'book1-2',
    book: 1,
    number: 2,
    title: '在餐廳',
    pinyin: 'zài cāntīng',
    english: 'At the restaurant',
    scenes: [
      {
        title: 'Ordering a drink',
        lines: [
          line('服務生', '請問，你要喝什麼？', 'Qǐngwèn, nǐ yào hē shénme?', 'Excuse me. What would you like to drink?'),
          line('客人', '我要喝咖啡。', 'Wǒ yào hē kāfēi.', 'I\'d like a cup of coffee.'),
        ],
      },
    ],
    practice: [
      {
        title: '語音練習',
        english: 'Pronunciation',
        description: 'Four key characters and the words built from them. Click a word to hear it.',
        groups: [
          {
            head: word('豬', 'zhū', 'pig'),
            words: [
              word('豬肉', 'zhūròu', 'pork'),
              word('大豬', 'dà zhū', 'big pig'),
              word('小豬', 'xiǎo zhū', 'piggy'),
              word('豬排', 'zhūpái', 'pork chop'),
              word('豬腳', 'zhū jiǎo', 'pork knuckle'),
              word('豬耳朵', 'zhū ěrduo', 'roasted pork ears'),
            ],
          },
          {
            head: word('吃', 'chī', 'to eat'),
            words: [
              word('吃飯', 'chīfàn', 'to have a meal'),
              word('吃麵', 'chī miàn', 'to eat noodles'),
              word('吃水餃', 'chī shuǐjiǎo', 'to eat dumplings'),
              word('吃肉', 'chī ròu', 'to eat meat'),
              word('吃菜', 'chī cài', 'to eat vegetables'),
              word('吃素', 'chīsù', 'to be vegetarian'),
            ],
          },
          {
            head: word('雞', 'jī', 'chicken'),
            words: [
              word('雞蛋', 'jīdàn', 'egg'),
              word('雞腿', 'jītuǐ', 'chicken drumstick'),
              word('雞肉', 'jīròu', 'chicken (meat)'),
              word('雞排', 'jīpái', 'chicken cutlet'),
              word('雞腳', 'jījiǎo', 'chicken feet'),
              word('小雞', 'xiǎojī', 'chick'),
            ],
          },
          {
            head: word('請', 'qǐng', 'please'),
            words: [
              word('請問', 'qǐngwèn', 'May I ask…'),
              word('請進', 'qǐngjìn', 'Please come in.'),
              word('請坐', 'qǐng zuò', 'Please have a seat.'),
              word('請慢用', 'qǐng màn yòng', 'Enjoy your meal.'),
              word('請說慢一點', 'qǐng shuō màn yì diǎn', 'Would you speak more slowly?'),
              word('請再說一次', 'qǐng zài shuō yí cì', 'Could you repeat that, please?'),
            ],
          },
        ],
      },
      {
        title: '情境練習',
        english: 'Situational practice',
        description: 'Swap words from these lists into the sentence pattern to make your own sentences.',
        examples: [
          word('他喜歡喝可樂，他不吃豬肉。', 'Tā xǐhuān hē kělè, tā bù chī zhūròu.', 'He likes Coke, and he doesn\'t eat pork.'),
        ],
        groups: [
          {
            head: word('代名詞', 'dàimíngcí', 'pronouns'),
            words: [
              word('我', 'wǒ', 'I'),
              word('你', 'nǐ', 'you'),
              word('他／她', 'tā', 'he / she'),
              word('我們', 'wǒmen', 'we'),
              word('你們', 'nǐmen', 'you (plural)'),
              word('他們', 'tāmen', 'they'),
            ],
          },
          {
            head: word('飲料', 'yǐnliào', 'drinks'),
            words: [
              word('水', 'shuǐ', 'water'),
              word('茶', 'chá', 'tea'),
              word('牛奶', 'niúnǎi', 'milk'),
              word('汽水', 'qìshuǐ', 'soft drink'),
              word('果汁', 'guǒzhī', 'juice'),
              word('杏仁茶', 'xìngrén chá', 'almond tea'),
            ],
          },
          {
            head: word('食物', 'shíwù', 'food'),
            words: [
              word('牛肉', 'niúròu', 'beef'),
              word('羊肉', 'yángròu', 'lamb'),
              word('蝦子', 'xiāzi', 'shrimp'),
              word('雞肉', 'jīròu', 'chicken'),
              word('魚', 'yú', 'fish'),
              word('花生', 'huāshēng', 'peanut'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'book1-3',
    book: 1,
    number: 3,
    title: '我的家',
    pinyin: 'wǒ de jiā',
    english: 'My family',
    scenes: [
      {
        title: 'Talking about our families',
        lines: [
          line('同學', '請問，你家有幾個人？', 'Qǐngwèn, nǐ jiā yǒu jǐ ge rén?', 'How many people are there in your family?'),
          line('朋友', '我家有五個人。（我家有）爸爸、媽媽、弟弟、妹妹和我。我是老大。', 'Wǒ jiā yǒu wǔ ge rén. (Wǒ jiā yǒu) Bàba, māma, dìdi, mèimei hàn wǒ. Wǒ shì lǎodà.', 'There are five people in my family: my dad, mom, brother, sister and I. I am the first-born.'),
          line('同學', '你有幾個叔叔？', 'Nǐ yǒu jǐ ge shúshu?', 'How many uncles do you have?'),
          line('朋友', '（我）（有）一個（叔叔）。', '(Wǒ) (yǒu) yí ge (shúshu).', 'I have one.'),
          line('同學', '（你）（有）幾個姑姑？', '(Nǐ) (yǒu) jǐ ge gūgu?', 'How many aunts do you have?'),
          line('朋友', '我沒有姑姑。', 'Wǒ méiyǒu gūgu.', 'I don\'t have any aunts.'),
        ],
      },
    ],
    familyTree: {
      title: word('親屬稱謂', 'qīnshǔ chēngwèi', 'what to call your relatives'),
      sides: [
        {
          label: 'Dad\'s side',
          grandparents: [
            member('爺爺', 'yéye', 'grandfather (dad\'s father)', 'yeye'),
            member('奶奶', 'nǎinai', 'grandmother (dad\'s mother)', 'nainai'),
          ],
          relatives: [
            member('伯伯', 'bóbo', 'uncle (older than your father)', 'bobo'),
            member('叔叔', 'shúshu', 'uncle (younger than your father)', 'shushu'),
            member('姑姑', 'gūgu', 'aunt (father\'s sister)', 'gugu'),
          ],
          parent: member('爸爸', 'bàba', 'dad', 'baba'),
        },
        {
          label: 'Mom\'s side',
          grandparents: [
            member('外公', 'wàigōng', 'grandfather (mom\'s father)', 'waigong'),
            member('外婆', 'wàipó', 'grandmother (mom\'s mother)', 'waipo'),
          ],
          relatives: [
            member('舅舅', 'jiùjiu', 'uncle (mother\'s brother)', 'jiujiu'),
            member('阿姨', 'āyí', 'aunt (mother\'s sister)', 'ayi'),
          ],
          parent: member('媽媽', 'māma', 'mom', 'mama'),
        },
      ],
      children: [
        member('哥哥', 'gēge', 'older brother', 'gege'),
        member('姐姐', 'jiějie', 'older sister', 'jiejie'),
        member('我', 'wǒ', 'I, me', 'wo'),
        member('弟弟', 'dìdi', 'younger brother', 'didi'),
        member('妹妹', 'mèimei', 'younger sister', 'meimei'),
      ],
    },
    practice: [
      {
        title: '情境練習',
        english: 'Situational practice',
        description: 'Describe your own family: swap in the right number, family members and birth order.',
        examples: [
          word('我家有七個人，爺爺、奶奶、爸爸、媽媽、姐姐、哥哥和我。我是老么。', 'Wǒ jiā yǒu qī ge rén, yéye, nǎinai, bàba, māma, jiějie, gēge hàn wǒ. Wǒ shì lǎoyāo.', 'There are seven people in my family: my grandfather, grandmother, dad, mom, sister, brother and I. I am the youngest.'),
        ],
        groups: [
          {
            head: word('數字', 'shùzì', 'numbers'),
            words: [
              word('一', 'yī', 'one'),
              word('二', 'èr', 'two'),
              word('三', 'sān', 'three'),
              word('四', 'sì', 'four'),
              word('五', 'wǔ', 'five'),
              word('六', 'liù', 'six'),
              word('七', 'qī', 'seven'),
              word('八', 'bā', 'eight'),
              word('九', 'jiǔ', 'nine'),
              word('十', 'shí', 'ten'),
            ],
          },
          {
            head: word('排行', 'páiháng', 'birth order'),
            words: [
              word('老大', 'lǎodà', 'first-born, eldest child'),
              word('老二', 'lǎo\'èr', 'second-born'),
              word('老三', 'lǎosān', 'third-born'),
              word('老四', 'lǎosì', 'fourth-born'),
              word('老五', 'lǎowǔ', 'fifth-born'),
              word('老么', 'lǎoyāo', 'youngest child'),
            ],
          },
        ],
      },
      {
        title: '語音練習',
        english: 'Pronunciation: neutral tone',
        description: 'Most family words repeat a character, and the second one is neutral tone: short, light and unstressed. Practise it after each of the four tones.',
        groups: [
          {
            label: '1st tone + neutral  ˉ + ·',
            words: [
              word('媽媽', 'māma', 'mother'),
              word('哥哥', 'gēge', 'older brother'),
              word('姑姑', 'gūgu', 'aunt (father\'s sister)'),
            ],
          },
          {
            label: '2nd tone + neutral  ˊ + ·',
            words: [
              word('爺爺', 'yéye', 'grandfather'),
              word('伯伯', 'bóbo', 'uncle (older than your father)'),
              word('叔叔', 'shúshu', 'uncle (younger than your father)'),
            ],
          },
          {
            label: '3rd tone + neutral  ˇ + ·',
            words: [
              word('姐姐', 'jiějie', 'older sister'),
              word('嬸嬸', 'shěnshen', 'aunt (wife of your father\'s younger brother)'),
            ],
          },
          {
            label: '4th tone + neutral  ˋ + ·',
            words: [
              word('爸爸', 'bàba', 'father'),
              word('舅舅', 'jiùjiu', 'uncle (mother\'s brother)'),
              word('弟弟', 'dìdi', 'younger brother'),
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'book2-1',
    book: 2,
    number: 1,
    title: '問候語',
    pinyin: 'wènhòuyǔ',
    english: 'Greetings',
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
  客人: 'customer',
  同學: 'classmate',
  家明: 'Jiaming',
  安妮: 'Annie',
}
