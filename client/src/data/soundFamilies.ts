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
]
