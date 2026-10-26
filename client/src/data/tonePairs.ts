// Two-syllable words for every tone combination, in traditional characters.
// pairs[first][second]: first = 1-4, second = 1-4 or 5 (neutral). Pinyin is split into its two syllables
// so each can be coloured by its tone. Add more words to any cell; "Refresh for more" cycles through them.

export interface TonePairWord {
  hanzi: string
  pinyin: [string, string]
  english: string
}

export type ToneNumber = 1 | 2 | 3 | 4 | 5

export const firstTones: ToneNumber[] = [1, 2, 3, 4]
export const secondTones: ToneNumber[] = [1, 2, 3, 4, 5]

export const toneNames: Record<ToneNumber, string> = {
  1: '1st tone',
  2: '2nd tone',
  3: '3rd tone',
  4: '4th tone',
  5: 'Neutral',
}

const w = (hanzi: string, a: string, b: string, english: string): TonePairWord => ({ hanzi, pinyin: [a, b], english })

export const tonePairs: Record<number, Record<number, TonePairWord[]>> = {
  1: {
    1: [w('咖啡', 'kā', 'fēi', 'coffee'), w('飛機', 'fēi', 'jī', 'aeroplane'), w('今天', 'jīn', 'tiān', 'today'), w('家鄉', 'jiā', 'xiāng', 'hometown')],
    2: [w('中國', 'Zhōng', 'guó', 'China'), w('歡迎', 'huān', 'yíng', 'welcome'), w('公園', 'gōng', 'yuán', 'park')],
    3: [w('喝水', 'hē', 'shuǐ', 'to drink water'), w('鉛筆', 'qiān', 'bǐ', 'pencil'), w('開始', 'kāi', 'shǐ', 'to begin')],
    4: [w('高興', 'gāo', 'xìng', 'happy'), w('音樂', 'yīn', 'yuè', 'music'), w('商店', 'shāng', 'diàn', 'shop')],
    5: [w('媽媽', 'mā', 'ma', 'mum'), w('哥哥', 'gē', 'ge', 'older brother'), w('東西', 'dōng', 'xi', 'thing'), w('衣服', 'yī', 'fu', 'clothes')],
  },
  2: {
    1: [w('明天', 'míng', 'tiān', 'tomorrow'), w('房間', 'fáng', 'jiān', 'room'), w('茶杯', 'chá', 'bēi', 'teacup')],
    2: [w('學習', 'xué', 'xí', 'to study'), w('銀行', 'yín', 'háng', 'bank'), w('同學', 'tóng', 'xué', 'classmate')],
    3: [w('蘋果', 'píng', 'guǒ', 'apple'), w('牛奶', 'niú', 'nǎi', 'milk'), w('游泳', 'yóu', 'yǒng', 'to swim')],
    4: [w('學校', 'xué', 'xiào', 'school'), w('牛肉', 'niú', 'ròu', 'beef'), w('遲到', 'chí', 'dào', 'to arrive late')],
    5: [w('朋友', 'péng', 'you', 'friend'), w('爺爺', 'yé', 'ye', 'grandfather (paternal)'), w('什麼', 'shén', 'me', 'what'), w('孩子', 'hái', 'zi', 'child')],
  },
  3: {
    1: [w('老師', 'lǎo', 'shī', 'teacher'), w('手機', 'shǒu', 'jī', 'mobile phone'), w('北京', 'Běi', 'jīng', 'Beijing')],
    2: [w('美國', 'Měi', 'guó', 'the USA'), w('女人', 'nǚ', 'rén', 'woman'), w('有名', 'yǒu', 'míng', 'famous')],
    3: [w('你好', 'nǐ', 'hǎo', 'hello'), w('水果', 'shuǐ', 'guǒ', 'fruit'), w('可以', 'kě', 'yǐ', 'can / may')],
    4: [w('晚飯', 'wǎn', 'fàn', 'dinner'), w('考試', 'kǎo', 'shì', 'exam'), w('好看', 'hǎo', 'kàn', 'good-looking')],
    5: [w('奶奶', 'nǎi', 'nai', 'grandmother (paternal)'), w('姊姊', 'jiě', 'jie', 'older sister'), w('耳朵', 'ěr', 'duo', 'ear'), w('喜歡', 'xǐ', 'huan', 'to like')],
  },
  4: {
    1: [w('麵包', 'miàn', 'bāo', 'bread'), w('汽車', 'qì', 'chē', 'car'), w('上班', 'shàng', 'bān', 'to go to work')],
    2: [w('不同', 'bù', 'tóng', 'different'), w('練習', 'liàn', 'xí', 'to practise'), w('問題', 'wèn', 'tí', 'question')],
    3: [w('字母', 'zì', 'mǔ', 'letter (of an alphabet)'), w('電腦', 'diàn', 'nǎo', 'computer'), w('報紙', 'bào', 'zhǐ', 'newspaper')],
    4: [w('再見', 'zài', 'jiàn', 'goodbye'), w('電視', 'diàn', 'shì', 'television'), w('作業', 'zuò', 'yè', 'homework')],
    5: [w('爸爸', 'bà', 'ba', 'dad'), w('弟弟', 'dì', 'di', 'younger brother'), w('妹妹', 'mèi', 'mei', 'younger sister'), w('謝謝', 'xiè', 'xie', 'thank you')],
  },
}
