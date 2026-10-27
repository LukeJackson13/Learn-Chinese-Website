// Pinyin finals (韻母): the part of a syllable after the initial consonant.
// Each has a sound tip, examples in traditional characters, and a spelling note where the written form changes.
// The first example is the final on its own where Mandarin has one (e.g. 有 yǒu for iu); otherwise both have initials.

export interface FinalExample {
  hanzi: string
  pinyin: string
  english: string
}

export interface PinyinFinal {
  id: string
  label: string
  tip: string
  examples: FinalExample[]
  spelling?: string
}

export interface FinalGroup {
  title: string
  description: string
  finals: PinyinFinal[]
}

const ex = (hanzi: string, pinyin: string, english: string): FinalExample => ({ hanzi, pinyin, english })

export const finalGroups: FinalGroup[] = [
  {
    title: 'Simple finals',
    description: 'One vowel. Learn these first: every other final is built from them.',
    finals: [
      { id: 'a', label: 'a', tip: '"ah" as in "father". Mouth wide open.', examples: [ex('啊', 'ā', 'ah!'), ex('爸', 'bà', 'dad')] },
      { id: 'o', label: 'o', tip: '"aw" with rounded lips. After b, p, m, f it has a little "w" glide: bo ≈ "bwaw".', examples: [ex('喔', 'ō', 'oh!'), ex('破', 'pò', 'broken')] },
      { id: 'e', label: 'e', tip: 'Not "eh"! An unrounded "uh" from the back of the throat, like "ur" in "fur" with no r.', examples: [ex('餓', 'è', 'hungry'), ex('喝', 'hē', 'to drink')] },
      { id: 'i', label: 'i', tip: '"ee" as in "see". (After z, c, s, zh, ch, sh, r it\'s a different sound; see the two -i finals.)', examples: [ex('一', 'yī', 'one'), ex('你', 'nǐ', 'you')], spelling: 'On its own it\'s written yi.' },
      { id: 'u', label: 'u', tip: '"oo" as in "food", lips well rounded.', examples: [ex('五', 'wǔ', 'five'), ex('不', 'bù', 'not')], spelling: 'On its own it\'s written wu.' },
      { id: 'ü', label: 'ü', tip: 'Say "ee", then round your lips as if for "oo" without moving your tongue. Like French "u" or German "ü".', examples: [ex('魚', 'yú', 'fish'), ex('女', 'nǚ', 'woman')], spelling: 'On its own it\'s written yu. After j, q, x the dots are dropped: 去 qù is still ü.' },
    ],
  },
  {
    title: 'Compound finals',
    description: 'Two vowels gliding together.',
    finals: [
      { id: 'ai', label: 'ai', tip: '"eye".', examples: [ex('愛', 'ài', 'love'), ex('來', 'lái', 'to come')] },
      { id: 'ei', label: 'ei', tip: '"ay" as in "say".', examples: [ex('杯', 'bēi', 'cup'), ex('給', 'gěi', 'to give')] },
      { id: 'ao', label: 'ao', tip: '"ow" as in "cow".', examples: [ex('奧', 'ào', 'as in 奧運, Olympics'), ex('好', 'hǎo', 'good')] },
      { id: 'ou', label: 'ou', tip: '"oh" as in "go".', examples: [ex('歐', 'ōu', 'as in 歐洲, Europe'), ex('狗', 'gǒu', 'dog')] },
    ],
  },
  {
    title: 'Nasal finals',
    description: 'Ending in -n (tongue tip behind your top teeth) or -ng (back of the tongue up, mouth open).',
    finals: [
      { id: 'an', label: 'an', tip: '"ahn". Finish with the tongue tip touching behind the top teeth.', examples: [ex('安', 'ān', 'safe, peaceful'), ex('看', 'kàn', 'to look')] },
      { id: 'en', label: 'en', tip: '"un" as in "taken".', examples: [ex('恩', 'ēn', 'kindness'), ex('人', 'rén', 'person')] },
      { id: 'ang', label: 'ang', tip: '"ahng". Mouth open, back of the tongue raised, like "ah" + the end of "sung".', examples: [ex('昂', 'áng', 'as in 昂貴, expensive'), ex('忙', 'máng', 'busy')] },
      { id: 'eng', label: 'eng', tip: '"ung" as in "lung".', examples: [ex('冷', 'lěng', 'cold'), ex('風', 'fēng', 'wind')] },
      { id: 'ong', label: 'ong', tip: '"oong": the "u" in "put" followed by "ng". Never on its own.', examples: [ex('東', 'dōng', 'east'), ex('紅', 'hóng', 'red')] },
    ],
  },
  {
    title: 'Finals starting with i',
    description: 'A quick "ee" glide before the main vowel. With no initial, i is written y.',
    finals: [
      { id: 'ia', label: 'ia', tip: '"yah".', examples: [ex('牙', 'yá', 'tooth'), ex('家', 'jiā', 'home, family')], spelling: 'On its own: ya.' },
      { id: 'ie', label: 'ie', tip: '"yeh" as in "yes". Here the e really is "eh".', examples: [ex('也', 'yě', 'also'), ex('謝', 'xiè', 'to thank')], spelling: 'On its own: ye.' },
      { id: 'iao', label: 'iao', tip: '"yow" as in "yowl".', examples: [ex('要', 'yào', 'to want'), ex('小', 'xiǎo', 'small')], spelling: 'On its own: yao.' },
      { id: 'iu', label: 'iu', tip: '"yoh". The full sound is i-o-u, but the o is short after a consonant.', examples: [ex('有', 'yǒu', 'to have'), ex('六', 'liù', 'six')], spelling: 'Short for iou: written you on its own, iu after a consonant.' },
      { id: 'ian', label: 'ian', tip: '"yen", not "yan". The a is pulled up to an "e" sound.', examples: [ex('眼', 'yǎn', 'eye'), ex('天', 'tiān', 'sky, day')], spelling: 'On its own: yan.' },
      { id: 'in', label: 'in', tip: '"een", a long "ee" ending in -n.', examples: [ex('音', 'yīn', 'sound'), ex('心', 'xīn', 'heart')], spelling: 'On its own: yin.' },
      { id: 'iang', label: 'iang', tip: '"yahng".', examples: [ex('羊', 'yáng', 'sheep'), ex('想', 'xiǎng', 'to think')], spelling: 'On its own: yang.' },
      { id: 'ing', label: 'ing', tip: '"eeng", like "sing" with a longer ee.', examples: [ex('英', 'yīng', 'as in 英國, the UK'), ex('聽', 'tīng', 'to listen')], spelling: 'On its own: ying.' },
      { id: 'iong', label: 'iong', tip: '"yoong".', examples: [ex('用', 'yòng', 'to use'), ex('熊', 'xióng', 'bear')], spelling: 'On its own: yong.' },
    ],
  },
  {
    title: 'Finals starting with u',
    description: 'A quick "oo" glide before the main vowel. With no initial, u is written w.',
    finals: [
      { id: 'ua', label: 'ua', tip: '"wah".', examples: [ex('哇', 'wā', 'wow!'), ex('花', 'huā', 'flower')], spelling: 'On its own: wa.' },
      { id: 'uo', label: 'uo', tip: '"waw", like "wor" in "worn" without the r.', examples: [ex('我', 'wǒ', 'I, me'), ex('多', 'duō', 'many')], spelling: 'On its own: wo. After b, p, m, f it\'s written just o.' },
      { id: 'uai', label: 'uai', tip: '"why".', examples: [ex('外', 'wài', 'outside'), ex('快', 'kuài', 'fast')], spelling: 'On its own: wai.' },
      { id: 'ui', label: 'ui', tip: '"way". The full sound is u-e-i, so it\'s not "wee".', examples: [ex('位', 'wèi', 'polite measure word for people'), ex('對', 'duì', 'correct')], spelling: 'Short for uei: written wei on its own, ui after a consonant.' },
      { id: 'uan', label: 'uan', tip: '"wahn".', examples: [ex('晚', 'wǎn', 'late, evening'), ex('換', 'huàn', 'to change')], spelling: 'On its own: wan. After j, q, x, y it\'s really üan.' },
      { id: 'un', label: 'un', tip: '"wun", with a light "uh" before the n.', examples: [ex('問', 'wèn', 'to ask'), ex('春', 'chūn', 'spring')], spelling: 'Short for uen: written wen on its own, un after a consonant. After j, q, x, y it\'s really ün.' },
      { id: 'uang', label: 'uang', tip: '"wahng".', examples: [ex('王', 'wáng', 'king; a surname'), ex('黃', 'huáng', 'yellow')], spelling: 'On its own: wang.' },
      { id: 'ueng', label: 'ueng', tip: '"wung". Rare: it only exists with no initial.', examples: [ex('翁', 'wēng', 'old man')], spelling: 'Only ever written weng. After a consonant the same sound is spelled ong.' },
    ],
  },
  {
    title: 'Finals starting with ü',
    description: 'Lips rounded for ü the whole way through. Only after j, q, x, n, l, or on their own.',
    finals: [
      { id: 'üe', label: 'üe', tip: '"ü" + "eh".', examples: [ex('月', 'yuè', 'moon, month'), ex('學', 'xué', 'to study')], spelling: 'On its own: yue. After j, q, x written ue: 學 xué.' },
      { id: 'üan', label: 'üan', tip: '"ü" + "en", rhymes with ian, not with "an".', examples: [ex('遠', 'yuǎn', 'far'), ex('全', 'quán', 'whole')], spelling: 'On its own: yuan. After j, q, x written uan: 全 quán.' },
      { id: 'ün', label: 'ün', tip: '"ü" + "n".', examples: [ex('雲', 'yún', 'cloud'), ex('軍', 'jūn', 'army')], spelling: 'On its own: yun. After j, q, x written un: 軍 jūn.' },
    ],
  },
  {
    title: 'Special finals',
    description: 'Sounds with no English equivalent.',
    finals: [
      { id: 'er', label: 'er', tip: 'Like "ar" in an American "bar": say "uh" while curling your tongue tip back.', examples: [ex('二', 'èr', 'two'), ex('兒', 'ér', 'son, as in 兒子')] },
      { id: 'zi', label: '-i (zi)', tip: 'After z, c, s: not "ee"! Hold the buzzing "zzz" of the consonant and voice it.', examples: [ex('字', 'zì', 'character'), ex('四', 'sì', 'four')], spelling: 'Only in zi, ci, si.' },
      { id: 'zhi', label: '-i (zhi)', tip: 'After zh, ch, sh, r: not "ee"! Keep the tongue curled back and let the sound ring, a bit like "rr".', examples: [ex('是', 'shì', 'to be'), ex('日', 'rì', 'day, sun')], spelling: 'Only in zhi, chi, shi, ri.' },
    ],
  },
]

export const allFinals: PinyinFinal[] = finalGroups.flatMap(g => g.finals)
