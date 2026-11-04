// Sound families: characters that share a pronunciation (ignoring tone), with common words built from each.
// Traditional characters first, as TOCFL uses them; `simplified` is only set where the forms differ.

export interface SoundWord {
  hanzi: string
  simplified?: string
  pinyin: string
  english: string
  literal?: string
}

export interface SoundCharacter {
  hanzi: string
  simplified?: string
  pinyin: string
  meaning: string
  note?: string
  words: SoundWord[]
}

export interface SoundFamily {
  id: string
  sound: string
  summary: string
  characters: SoundCharacter[]
}

const w = (hanzi: string, pinyin: string, english: string, extra: Partial<SoundWord> = {}): SoundWord => ({ hanzi, pinyin, english, ...extra })

export const soundFamilies: SoundFamily[] = [
  {
    id: 'dian',
    sound: 'dian',
    summary: 'Four everyday characters. 點 is 3rd tone; the other three are 4th tone.',
    characters: [
      {
        hanzi: '點', simplified: '点', pinyin: 'diǎn', meaning: 'point, dot; o\'clock; to order',
        note: 'The most common of the four. 奌 is an old variant of the same character.',
        words: [
          w('現在三點', 'xiànzài sān diǎn', 'it\'s 3 o\'clock now', { simplified: '现在三点' }),
          w('點菜', 'diǎn cài', 'to order food', { simplified: '点菜' }),
        ],
      },
      {
        hanzi: '電', simplified: '电', pinyin: 'diàn', meaning: 'electricity',
        note: 'Used as a prefix for almost every electronic item.',
        words: [
          w('電腦', 'diànnǎo', 'computer', { simplified: '电脑', literal: 'electric brain' }),
          w('電話', 'diànhuà', 'telephone', { simplified: '电话', literal: 'electric speech' }),
          w('電影', 'diànyǐng', 'movie, film', { simplified: '电影', literal: 'electric shadow' }),
          w('電梯', 'diàntī', 'elevator, lift', { simplified: '电梯', literal: 'electric ladder' }),
          w('電池', 'diànchí', 'battery', { simplified: '电池', literal: 'electric pool' }),
        ],
      },
      {
        hanzi: '店', pinyin: 'diàn', meaning: 'shop, store',
        words: [
          w('商店', 'shāngdiàn', 'store, shop'),
          w('飯店', 'fàndiàn', 'restaurant; hotel', { simplified: '饭店' }),
          w('酒店', 'jiǔdiàn', 'hotel; bar'),
          w('書店', 'shūdiàn', 'bookstore', { simplified: '书店' }),
        ],
      },
      {
        hanzi: '殿', pinyin: 'diàn', meaning: 'palace, hall',
        words: [
          w('宮殿', 'gōngdiàn', 'palace', { simplified: '宫殿' }),
        ],
      },
    ],
  },
  {
    id: 'shi',
    sound: 'shi',
    summary: 'One of the most common sounds in Mandarin, in all four tones. Most shi characters are 4th tone.',
    characters: [
      {
        hanzi: '師', simplified: '师', pinyin: 'shī', meaning: 'teacher, master',
        words: [
          w('老師', 'lǎoshī', 'teacher', { simplified: '老师' }),
          w('師傅', 'shīfu', 'master; skilled worker (also a polite way to address a driver)', { simplified: '师傅' }),
        ],
      },
      {
        hanzi: '十', pinyin: 'shí', meaning: 'ten',
        words: [
          w('十一', 'shíyī', 'eleven'),
          w('十月', 'shíyuè', 'October'),
        ],
      },
      {
        hanzi: '時', simplified: '时', pinyin: 'shí', meaning: 'time, hour',
        words: [
          w('時間', 'shíjiān', 'time', { simplified: '时间' }),
          w('小時', 'xiǎoshí', 'hour', { simplified: '小时', literal: 'small time' }),
          w('有時候', 'yǒu shíhou', 'sometimes', { simplified: '有时候' }),
        ],
      },
      {
        hanzi: '始', pinyin: 'shǐ', meaning: 'to begin',
        words: [
          w('開始', 'kāishǐ', 'to start, to begin', { simplified: '开始' }),
        ],
      },
      {
        hanzi: '是', pinyin: 'shì', meaning: 'to be; yes',
        note: 'One of the most used characters in Chinese.',
        words: [
          w('不是', 'bú shì', 'isn\'t, aren\'t (不 changes to 2nd tone before 4th)'),
          w('還是', 'háishi', 'or (in questions); still', { simplified: '还是' }),
        ],
      },
      {
        hanzi: '事', pinyin: 'shì', meaning: 'matter, thing, affair',
        words: [
          w('事情', 'shìqing', 'thing, matter'),
          w('沒事', 'méishì', 'it\'s nothing, no problem', { simplified: '没事' }),
        ],
      },
      {
        hanzi: '試', simplified: '试', pinyin: 'shì', meaning: 'to try, to test',
        words: [
          w('考試', 'kǎoshì', 'exam, test', { simplified: '考试' }),
          w('試試看', 'shìshi kàn', 'give it a try', { simplified: '试试看' }),
        ],
      },
      {
        hanzi: '市', pinyin: 'shì', meaning: 'market, city',
        words: [
          w('超市', 'chāoshì', 'supermarket', { literal: 'super market' }),
          w('市場', 'shìchǎng', 'market', { simplified: '市场' }),
        ],
      },
      {
        hanzi: '室', pinyin: 'shì', meaning: 'room',
        words: [
          w('教室', 'jiàoshì', 'classroom', { literal: 'teaching room' }),
          w('辦公室', 'bàngōngshì', 'office', { simplified: '办公室' }),
        ],
      },
      {
        hanzi: '視', simplified: '视', pinyin: 'shì', meaning: 'to look at, to view',
        words: [
          w('電視', 'diànshì', 'TV', { simplified: '电视', literal: 'electric viewing' }),
        ],
      },
    ],
  },
  {
    id: 'ma',
    sound: 'ma',
    summary: 'The classic tone drill: one syllable, five tones, five different meanings.',
    characters: [
      {
        hanzi: '媽', simplified: '妈', pinyin: 'mā', meaning: 'mother',
        words: [
          w('媽媽', 'māma', 'mum, mother', { simplified: '妈妈' }),
        ],
      },
      {
        hanzi: '麻', pinyin: 'má', meaning: 'hemp; numb',
        words: [
          w('麻煩', 'máfan', 'trouble; troublesome; to bother someone', { simplified: '麻烦' }),
        ],
      },
      {
        hanzi: '馬', simplified: '马', pinyin: 'mǎ', meaning: 'horse',
        words: [
          w('馬上', 'mǎshàng', 'right away, immediately', { simplified: '马上', literal: 'on horseback' }),
        ],
      },
      {
        hanzi: '罵', simplified: '骂', pinyin: 'mà', meaning: 'to scold',
        words: [
          w('罵人', 'mà rén', 'to insult someone, to swear at someone', { simplified: '骂人' }),
        ],
      },
      {
        hanzi: '嗎', simplified: '吗', pinyin: 'ma', meaning: 'question particle',
        note: 'Neutral tone: short and light. Put it at the end of a statement to make a yes/no question.',
        words: [
          w('好嗎', 'hǎo ma', 'OK?, is that all right?', { simplified: '好吗' }),
          w('你好嗎', 'nǐ hǎo ma', 'how are you?', { simplified: '你好吗' }),
        ],
      },
    ],
  },
  {
    id: 'yi',
    sound: 'yi',
    summary: 'Lots of beginner words. 一 衣 醫 are 1st tone, 姨 2nd, 椅 以 已 3rd, and 意 易 4th.',
    characters: [
      {
        hanzi: '一', pinyin: 'yī', meaning: 'one',
        note: 'Its tone changes: yì before tones 1–3, yí before a 4th tone.',
        words: [
          w('一起', 'yìqǐ', 'together'),
          w('一樣', 'yíyàng', 'the same', { simplified: '一样' }),
        ],
      },
      {
        hanzi: '衣', pinyin: 'yī', meaning: 'clothing',
        words: [
          w('衣服', 'yīfu', 'clothes'),
        ],
      },
      {
        hanzi: '醫', simplified: '医', pinyin: 'yī', meaning: 'medicine, doctor',
        words: [
          w('醫生', 'yīshēng', 'doctor', { simplified: '医生' }),
          w('醫院', 'yīyuàn', 'hospital', { simplified: '医院' }),
        ],
      },
      {
        hanzi: '姨', pinyin: 'yí', meaning: 'aunt (mother\'s sister)',
        words: [
          w('阿姨', 'āyí', 'auntie; a polite way to address an older woman'),
        ],
      },
      {
        hanzi: '椅', pinyin: 'yǐ', meaning: 'chair',
        words: [
          w('椅子', 'yǐzi', 'chair'),
        ],
      },
      {
        hanzi: '以', pinyin: 'yǐ', meaning: 'by means of; so as to',
        words: [
          w('可以', 'kěyǐ', 'can, may'),
          w('以前', 'yǐqián', 'before, in the past'),
        ],
      },
      {
        hanzi: '已', pinyin: 'yǐ', meaning: 'already',
        note: 'Looks almost the same as 己 jǐ (self). 已 is half closed at the top left.',
        words: [
          w('已經', 'yǐjīng', 'already', { simplified: '已经' }),
        ],
      },
      {
        hanzi: '意', pinyin: 'yì', meaning: 'meaning, idea, wish',
        words: [
          w('意思', 'yìsi', 'meaning'),
          w('意見', 'yìjiàn', 'opinion', { simplified: '意见' }),
        ],
      },
      {
        hanzi: '易', pinyin: 'yì', meaning: 'easy',
        words: [
          w('容易', 'róngyì', 'easy'),
        ],
      },
    ],
  },
  {
    id: 'jian',
    sound: 'jian',
    summary: 'Sounds like "jyen", not "jan". 間 is 1st tone, 簡 3rd, and 見 件 健 are 4th.',
    characters: [
      {
        hanzi: '間', simplified: '间', pinyin: 'jiān', meaning: 'between; room; measure word for rooms',
        words: [
          w('時間', 'shíjiān', 'time', { simplified: '时间' }),
          w('房間', 'fángjiān', 'room, bedroom', { simplified: '房间' }),
        ],
      },
      {
        hanzi: '簡', simplified: '简', pinyin: 'jiǎn', meaning: 'simple',
        words: [
          w('簡單', 'jiǎndān', 'simple, easy', { simplified: '简单' }),
        ],
      },
      {
        hanzi: '見', simplified: '见', pinyin: 'jiàn', meaning: 'to see, to meet',
        words: [
          w('再見', 'zàijiàn', 'goodbye', { simplified: '再见', literal: 'see again' }),
          w('看見', 'kànjiàn', 'to see, to catch sight of', { simplified: '看见' }),
        ],
      },
      {
        hanzi: '件', pinyin: 'jiàn', meaning: 'measure word for clothes, matters and items',
        words: [
          w('一件衣服', 'yí jiàn yīfu', 'a piece of clothing'),
          w('文件', 'wénjiàn', 'document, file'),
        ],
      },
      {
        hanzi: '健', pinyin: 'jiàn', meaning: 'healthy, strong',
        words: [
          w('健康', 'jiànkāng', 'healthy; health'),
        ],
      },
    ],
  },
  {
    id: 'ji',
    sound: 'ji',
    summary: 'The j is like "j" in "jeep" with the tongue flat. 雞 機 are 1st tone, 級 急 2nd, 幾 3rd, 記 4th.',
    characters: [
      {
        hanzi: '雞', simplified: '鸡', pinyin: 'jī', meaning: 'chicken',
        words: [
          w('雞肉', 'jīròu', 'chicken (meat)', { simplified: '鸡肉' }),
          w('雞蛋', 'jīdàn', 'egg', { simplified: '鸡蛋', literal: 'chicken egg' }),
        ],
      },
      {
        hanzi: '機', simplified: '机', pinyin: 'jī', meaning: 'machine',
        words: [
          w('手機', 'shǒujī', 'mobile phone', { simplified: '手机', literal: 'hand machine' }),
          w('飛機', 'fēijī', 'aeroplane', { simplified: '飞机', literal: 'flying machine' }),
        ],
      },
      {
        hanzi: '級', simplified: '级', pinyin: 'jí', meaning: 'level, grade',
        words: [
          w('年級', 'niánjí', 'school year, grade', { simplified: '年级' }),
        ],
      },
      {
        hanzi: '急', pinyin: 'jí', meaning: 'urgent, in a hurry',
        words: [
          w('著急', 'zháojí', 'worried, anxious', { simplified: '着急' }),
        ],
      },
      {
        hanzi: '幾', simplified: '几', pinyin: 'jǐ', meaning: 'how many (small numbers); a few',
        words: [
          w('幾點', 'jǐ diǎn', 'what time?', { simplified: '几点', literal: 'how many o\'clock' }),
          w('幾個', 'jǐ ge', 'how many? (things or people)', { simplified: '几个' }),
        ],
      },
      {
        hanzi: '記', simplified: '记', pinyin: 'jì', meaning: 'to remember, to record',
        words: [
          w('記得', 'jìde', 'to remember', { simplified: '记得' }),
          w('日記', 'rìjì', 'diary', { simplified: '日记' }),
        ],
      },
    ],
  },
]
