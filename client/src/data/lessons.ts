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
  scenes?: DialogueScene[]
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
    id: 'book1-4',
    book: 1,
    number: 4,
    title: '跟朋友打招呼',
    pinyin: 'gēn péngyǒu dǎ zhāohū',
    english: 'Greeting friends',
    scenes: [
      {
        title: 'Have you eaten?',
        lines: [
          line('同學', '你吃飯了嗎？', 'Nǐ chīfànle ma?', 'Have you eaten?'),
          line('朋友', '還沒。', 'Hái méi.', 'Not yet.'),
          line('同學', '要不要一起去吃？', 'Yào bú yào yìqǐ qù chī?', 'Do you want to get something to eat with me?'),
          line('朋友', '好啊！', 'Hǎo a!', 'Sure!'),
        ],
      },
    ],
    practice: [
      {
        title: '情境練習',
        english: 'Situational practice',
        description: 'The same greeting works for anything: swap a word from 吃, 買 or 看 into 你…了嗎？ and 要不要一起去…？',
        scenes: [
          {
            title: 'Buying a book',
            lines: [
              line('A', '你買書了嗎？', 'Nǐ mǎi shū le ma?', 'Have you bought the book?'),
              line('B', '還沒。', 'Hái méi.', 'Not yet.'),
              line('A', '要不要一起去買？', 'Yào bú yào yìqǐ qù mǎi?', 'Do you want to go and buy it together?'),
              line('B', '好啊！', 'Hǎo a!', 'Sure!'),
            ],
          },
          {
            title: 'The book fair',
            lines: [
              line('A', '你看書展了嗎？', 'Nǐ kàn shūzhǎn le ma?', 'Have you been to the book fair?'),
              line('B', '還沒。', 'Hái méi.', 'Not yet.'),
              line('A', '要不要一起去看？', 'Yào bú yào yìqǐ qù kàn?', 'Do you want to go and visit it with me?'),
              line('B', '好啊！', 'Hǎo a!', 'Sure!'),
            ],
          },
          {
            title: 'Signing up',
            lines: [
              line('A', '你報名了嗎？', 'Nǐ bàomíng le ma?', 'Have you signed up?'),
              line('B', '還沒。', 'Hái méi.', 'Not yet.'),
              line('A', '要不要一起去報？', 'Yào bú yào yìqǐ qù bào?', 'Do you want to go and sign up together?'),
              line('B', '好啊！', 'Hǎo a!', 'Sure!'),
            ],
          },
        ],
        groups: [
          {
            head: word('吃', 'chī', 'to eat'),
            words: [
              word('飯', 'fàn', 'rice'),
              word('麵', 'miàn', 'noodles'),
              word('晚飯', 'wǎnfàn', 'dinner'),
              word('早點', 'zǎodiǎn', 'breakfast'),
              word('甜點', 'tiándiǎn', 'dessert'),
              word('水果', 'shuǐguǒ', 'fruit'),
            ],
          },
          {
            head: word('買', 'mǎi', 'to buy'),
            words: [
              word('書', 'shū', 'book'),
              word('牛奶', 'niúnǎi', 'milk'),
              word('麵包', 'miànbāo', 'bread'),
              word('手錶', 'shǒubiǎo', 'watch'),
              word('機票', 'jīpiào', 'airplane ticket'),
              word('電影票', 'diànyǐng piào', 'movie ticket'),
            ],
          },
          {
            head: word('看', 'kàn', 'to see; to watch'),
            words: [
              word('報紙', 'bàozhǐ', 'newspaper'),
              word('球賽', 'qiúsài', 'ball game'),
              word('表演', 'biǎoyǎn', 'performance'),
              word('畫展', 'huàzhǎn', 'art exhibition'),
              word('車展', 'chēzhǎn', 'car exhibition'),
              word('電腦展', 'diànnǎo zhǎn', 'computer exhibition'),
            ],
          },
        ],
      },
      {
        title: '語音練習',
        english: 'Pronunciation: f and h, u and ü',
        description: '飯 fàn and 畫 huà practise the initials f (top teeth on the lower lip) and h (a breathy sound from the back of the throat). 不 bù and 去 qù practise the finals u and ü.',
        groups: [
          {
            head: word('飯', 'fàn', 'meal; rice'),
            words: [
              word('吃飯', 'chīfàn', 'to eat'),
              word('做飯', 'zuòfàn', 'to cook'),
              word('炒飯', 'chǎofàn', 'fried rice'),
              word('菜飯', 'cài fàn', 'steamed rice with minced vegetables'),
              word('飯菜', 'fàncài', 'meal'),
              word('滷肉飯', 'lǔròu fàn', 'stewed pork rice'),
            ],
          },
          {
            head: word('畫', 'huà', 'to paint; painting'),
            words: [
              word('繪畫', 'huìhuà', 'painting; to paint'),
              word('圖畫', 'túhuà', 'picture; painting'),
              word('畫圖', 'huàtú', 'to draw'),
              word('畫畫', 'huàhuà', 'to paint'),
              word('漫畫', 'mànhuà', 'comics'),
              word('動畫', 'dònghuà', 'animation; cartoons'),
            ],
          },
          {
            head: word('不', 'bù / bú', 'no, not (bú before a 4th tone)'),
            words: [
              word('不去', 'bú qù', 'do not go'),
              word('不好', 'bù hǎo', 'not good'),
              word('不行', 'bù xíng', 'not acceptable'),
              word('不能', 'bù néng', 'cannot'),
              word('不可以', 'bù kěyǐ', 'may not'),
              word('不吃', 'bù chī', 'do not eat'),
            ],
          },
          {
            head: word('去', 'qù', 'to go'),
            words: [
              word('去年', 'qùnián', 'last year'),
              word('出去', 'chūqù', 'to go out'),
              word('去旅行', 'qù lǚxíng', 'to travel'),
              word('去學校', 'qù xuéxiào', 'to go to school'),
              word('去醫院', 'qù yīyuàn', 'to go to the hospital'),
              word('你要去哪裡？', 'Nǐ yào qù nǎlǐ?', 'Where are you going?'),
            ],
          },
        ],
      },
      {
        title: '漢語拼音延伸練習',
        english: 'Pinyin practice: u or ü?',
        description: 'Listen for the difference between u (lips rounded, "oo") and ü (say "ee", then round your lips). After j, q, x and y the dots are left off, so 去 qù and 需 xū are really ü sounds.',
        groups: [
          {
            label: 'u after l and n',
            words: [word('滷', 'lǔ', 'stew; braise'), word('路', 'lù', 'road'), word('努', 'nǔ', 'effort')],
          },
          {
            label: 'ü after l and n',
            words: [word('旅', 'lǚ', 'travel'), word('綠', 'lǜ', 'green'), word('女', 'nǚ', 'female')],
          },
          {
            label: 'u after zh, ch, sh',
            words: [word('竹', 'zhú', 'bamboo'), word('出', 'chū', 'to go out'), word('書', 'shū', 'book')],
          },
          {
            label: 'ü after q, x, j (written u)',
            words: [word('去', 'qù', 'to go'), word('需', 'xū', 'to need'), word('句', 'jù', 'sentence')],
          },
          {
            label: 'wu: u on its own',
            words: [word('無', 'wú', 'no; nothing'), word('五', 'wǔ', 'five'), word('霧', 'wù', 'mist; fog')],
          },
          {
            label: 'yu: ü on its own',
            words: [word('魚', 'yú', 'fish'), word('雨', 'yǔ', 'rain'), word('玉', 'yù', 'jade')],
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
