/* Language Atlas Spelling path: the steps (words, sorts, endings, dictation), loaded when the tool first opens. Written for this site.
   Each step is a decodable reader step (same id, same order; tests/decodable.js), so a child spells the pattern they have just read.
   Atlas.spelling.add({ id, band, group, name, focus, key, rule, tip, mistake, heart, words, sort, endings, review, sounds, sentence })
   words     10 words: [word, its sounds (one spelling for each sound, a_e for a silent-e vowel), a clue with ___ for the word]
   sort      { q, bins: [[spelling, label, where]], items: 'word/bin ...' }: where is 'start', 'middle' or 'end' (the choice map),
             or left out (plain columns); bin is the number of the bin the word goes in, from 0
   endings   [[word, ending]]: the tool works the new word out with the spelling rules (tools.js join)
   review    2 words from earlier steps for the dictation; sounds: 2 earlier spellings for the dictation warm-up
   sentence  the dictation sentence: every word can be spelled at this step, or is a heart word
   tests/spelling.js checks all of it again on its own. */
(function () {
  var add = Atlas.spelling.add;
  var LONG = 'Long vowels: silent e';
  var TEAMS = 'Vowel teams';
  var OPEN = 'Open syllables and y';

  add({ id: 'a-e', band: '1', group: LONG, name: 'Silent e: a_e', focus: ['a_e'], key: 'cake',
    rule: 'The e at the end makes the a say its name.',
    tip: 'Write cap, then add an e: cape. The child hears the a change to its name. The e is silent: it has no box of its own, it rides with the a (one tile, a–e).',
    mistake: 'Leaves off the e (cak for cake), or writes ai in the middle of a short word (caik).',
    heart: ['move'],
    words: [['cake', 'c a_e k', 'You bake a ___ for a birthday.'], ['lake', 'l a_e k', 'We swim in the ___.'], ['gate', 'g a_e t', 'Shut the ___ so the dog stays in.'],
      ['plate', 'p l a_e t', 'Put the food on a ___.'], ['name', 'n a_e m', 'Write your ___ at the top.'], ['game', 'g a_e m', 'Let us play a ___.'],
      ['snake', 's n a_e k', 'A ___ has no legs.'], ['grape', 'g r a_e p', 'A ___ is a small purple fruit.'], ['wave', 'w a_e v', '___ your hand to say hello.'],
      ['skate', 's k a_e t', 'We ___ on the ice at the rink.']],
    sort: { q: 'Short a or a with a silent e?', bins: [['a', 'Short a', ''], ['a_e', 'a_e', '']], items: 'cap/0 cape/1 tap/0 tape/1 mad/0 made/1 can/0 cane/1 hat/0 hate/1' },
    endings: [['bake', 'ing'], ['tape', 'ing'], ['tap', 'ing'], ['wave', 'ed'], ['skate', 'er']],
    review: ['fish', 'jump'], sounds: ['sh', 'ck'],
    sentence: 'Kate made a cake at the lake.' });

  add({ id: 'i-e', band: '1', group: LONG, name: 'Silent e: i_e', focus: ['i_e'], key: 'bike',
    rule: 'The e at the end makes the i say its name.',
    tip: 'Pin and pine, kit and kite: say each pair and let the child hear the i change. Tap one finger for each sound: b, i–e, k is three taps, not four.',
    mistake: 'Writes the short sound (bik), or puts the e straight after the i (bieke).',
    heart: ['buy'],
    words: [['bike', 'b i_e k', 'I ride my ___ to school.'], ['kite', 'k i_e t', 'Fly a ___ in the wind.'], ['five', 'f i_e v', 'Four and one make ___.'],
      ['line', 'l i_e n', 'Stand in a ___ at the door.'], ['time', 't i_e m', 'What ___ is it?'], ['smile', 's m i_e l', 'A ___ shows you are happy.'],
      ['slide', 's l i_e d', 'Go down the ___ at the park.'], ['white', 'wh i_e t', 'Snow is ___.'], ['prize', 'p r i_e z', 'She won a ___ at the fair.'],
      ['ride', 'r i_e d', 'Can I ___ on the bus?']],
    sort: { q: 'Short i or i with a silent e?', bins: [['i', 'Short i', ''], ['i_e', 'i_e', '']], items: 'pin/0 pine/1 kit/0 kite/1 rid/0 ride/1 slid/0 slide/1 fin/0 fine/1' },
    endings: [['ride', 'ing'], ['smile', 'ed'], ['slip', 'ing'], ['time', 'er'], ['bike', 's']],
    review: ['made', 'snake'], sounds: ['a_e', 'sh'],
    sentence: 'Mike and I ride bikes in a line.' });

  add({ id: 'o-e', band: '1', group: LONG, name: 'Silent e: o_e', focus: ['o_e'], key: 'rope',
    rule: 'The e at the end makes the o say its name.',
    tip: 'Hop and hope, not and note: write the short word, add the e, read both. In hoping, the e drops off, but the single p still keeps the o long.',
    mistake: 'Writes rop for rope, or doubles the letter in hoping (hopping is a different word).',
    heart: ['front'],
    words: [['bone', 'b o_e n', 'The dog digs up a ___.'], ['home', 'h o_e m', 'It is time to go ___.'], ['rope', 'r o_e p', 'Jump over the ___.'],
      ['nose', 'n o_e s', 'You smell with your ___.'], ['stone', 's t o_e n', 'A ___ is a small rock.'], ['stove', 's t o_e v', 'Cook the soup on the ___.'],
      ['note', 'n o_e t', 'Write a ___ to your friend.'], ['smoke', 's m o_e k', '___ comes from a fire.'], ['globe', 'g l o_e b', 'A ___ is a round map of the world.'],
      ['hole', 'h o_e l', 'The fox hid in a ___.']],
    sort: { q: 'Short o or o with a silent e?', bins: [['o', 'Short o', ''], ['o_e', 'o_e', '']], items: 'hop/0 hope/1 not/0 note/1 rob/0 robe/1 cod/0 code/1 mop/0 mope/1' },
    endings: [['hope', 'ing'], ['hop', 'ing'], ['joke', 'ed'], ['smoke', 'y'], ['home', 'less']],
    review: ['kite', 'smile'], sounds: ['i_e', 'a_e'],
    sentence: 'Rose hopes to fix the rope.' });

  add({ id: 'u-e', band: '1', group: LONG, name: 'Silent e: u_e and e_e', focus: ['u_e', 'e_e'], key: 'cube',
    rule: 'The e at the end makes the u or the e say its name.',
    tip: 'U with a silent e says /yoo/ (cube) or /oo/ (June). E with a silent e is rare: these, theme. Compare cub and cube, them and theme.',
    mistake: 'Writes oo for the /oo/ in June or rule (Joon). In the middle of a word with a silent e at the end, u–e is the usual spelling.',
    heart: ['sure'],
    words: [['cube', 'c u_e b', 'Put an ice ___ in my cup.'], ['cute', 'c u_e t', 'The puppy is so ___.'], ['mule', 'm u_e l', 'A ___ is a lot like a horse.'],
      ['tube', 't u_e b', 'Toothpaste comes in a ___.'], ['flute', 'f l u_e t', 'She plays the ___ in the band.'], ['tune', 't u_e n', 'Hum a ___.'],
      ['June', 'J u_e n', 'My birthday is in ___.'], ['rule', 'r u_e l', 'Follow the ___ of the game.'], ['these', 'th e_e s', 'Are ___ your boots?'],
      ['theme', 'th e_e m', 'The party had a space ___.']],
    sort: { q: 'Short u or u with a silent e?', bins: [['u', 'Short u', ''], ['u_e', 'u_e', '']], items: 'cub/0 cube/1 tub/0 tube/1 cut/0 cute/1 us/0 use/1' },
    endings: [['use', 'ing'], ['cute', 'er'], ['rule', 'ed'], ['tub', 's'], ['flute', 's']],
    review: ['bone', 'home'], sounds: ['o_e', 'i_e'],
    sentence: 'June has a cute mule.' });

  add({ id: 'open', band: '1', group: OPEN, name: 'Open syllables', focus: ['go', 'me', 'hi'], key: 'go',
    rule: 'A vowel at the end of a beat says its name.',
    tip: 'An open beat ends with its vowel, so nothing closes it in: go, me, hi, and ze in zebra. Compare go and got: the t closes the beat and the o goes short.',
    mistake: 'Adds an e (goe, mee) or a w (gow): the open vowel needs nothing after it.',
    heart: ['over'],
    words: [['go', 'g o', 'Ready, set, ___!'], ['no', 'n o', 'Yes or ___?'], ['so', 's o', 'I was ___ cold.'], ['me', 'm e', 'Can you help ___?'],
      ['he', 'h e', '___ is my brother.'], ['she', 'sh e', '___ is my sister.'], ['we', 'w e', '___ all went home.'], ['be', 'b e', 'I will ___ there soon.'],
      ['hi', 'h i', 'Say ___ to your friend.'], ['zebra', 'z e b r a', 'A ___ has black and white stripes.']],
    sort: { q: 'Does the beat end with its vowel?', bins: [['open', 'Open: ends with the vowel', ''], ['closed', 'Closed: a letter after the vowel', '']], items: 'go/0 got/1 he/0 hen/1 me/0 met/1 hi/0 him/1 no/0 not/1 we/0 wet/1' },
    review: ['cube', 'flute'], sounds: ['u_e', 'o_e'],
    sentence: 'He and she go to the shop.' });

  add({ id: 'y-vowel', band: '1', group: OPEN, name: 'y as a vowel', focus: ['y'], key: 'sky',
    rule: 'At the end of a word, y can be a vowel.',
    tip: 'Y says /eye/ at the end of a short word (my, sky) and /ee/ at the end of a longer word (happy). Clap the beats: one beat, /eye/; two beats, /ee/.',
    mistake: 'Writes i or ie at the end (skie, happi). An English word almost never ends in i.',
    heart: ['pretty'],
    words: [['my', 'm y', 'This is ___ hat.'], ['fly', 'f l y', 'A bird can ___.'], ['cry', 'c r y', 'Babies ___ when they are hungry.'], ['sky', 's k y', 'The ___ is blue.'],
      ['try', 't r y', '___ again!'], ['happy', 'h a pp y', 'A smile shows you are ___.'], ['puppy', 'p u pp y', 'A ___ is a baby dog.'],
      ['funny', 'f u nn y', 'The joke was ___.'], ['sunny', 's u nn y', 'It is hot and ___ today.'], ['candy', 'c a n d y', 'Do not eat too much ___.']],
    sort: { q: 'Does y say /eye/ or /ee/?', bins: [['y-eye', 'y says /eye/ (my)', ''], ['y-ee', 'y says /ee/ (happy)', '']], items: 'my/0 happy/1 fly/0 puppy/1 cry/0 funny/1 sky/0 candy/1' },
    endings: [['cry', 'ed'], ['cry', 'ing'], ['try', 'ed'], ['happy', 'er'], ['funny', 'est']],
    review: ['she', 'zebra'], sounds: ['u_e', 'a_e'],
    sentence: 'My puppy is funny.' });

  add({ id: 'ai-ay', band: '1', group: TEAMS, name: 'ai and ay', focus: ['ai', 'ay'], key: 'rain',
    rule: 'ai sits in the middle of a word. ay sits at the end.',
    tip: 'Ai and ay both say the name of a. Ask: where is the sound? In the middle, write ai (rain). At the end, write ay (day). English words do not end in i, so ai cannot go at the end.',
    mistake: 'Writes ai at the end (plai) or ay in the middle (trayn).',
    heart: ['eight'],
    words: [['rain', 'r ai n', '___ falls from a cloud.'], ['train', 't r ai n', 'The ___ goes on the tracks.'], ['paint', 'p ai n t', 'We ___ a picture.'],
      ['snail', 's n ai l', 'A ___ is slow.'], ['tail', 't ai l', 'The dog wags its ___.'], ['wait', 'w ai t', '___ for me!'], ['day', 'd ay', 'It is a sunny ___.'],
      ['play', 'p l ay', 'Can you come out to ___?'], ['stay', 's t ay', 'Please ___ for dinner.'], ['tray', 't r ay', 'Put the cups on a ___.']],
    sort: { q: 'Where is the /ay/ sound?', bins: [['ai', 'ai', 'middle'], ['ay', 'ay', 'end']], items: 'rain/0 play/1 mail/0 day/1 wait/0 tray/1 paint/0 stay/1 snail/0 hay/1' },
    endings: [['play', 'ed'], ['stay', 'ing'], ['rain', 'y'], ['paint', 'er'], ['spray', 'ing']],
    review: ['fly', 'happy'], sounds: ['a_e', 'i_e'],
    sentence: 'We play in the rain all day.' });

  add({ id: 'ee-ea', band: '1', group: TEAMS, name: 'ee, ea and ey', focus: ['ee', 'ea', 'ey'], key: 'tree',
    rule: 'ee and ea say the name of e.',
    tip: 'Ee is the most common spelling of /ee/ in a short word, then ea. Ey says /ee/ at the end of a few words (key). There is no rule for ee or ea: sort the words and learn which is which, a few at a time.',
    mistake: 'Mixes ee and ea (seel for seal). Write the word both ways and ask which looks right; check it in the word list.',
    heart: ['head'],
    words: [['tree', 't r ee', 'A bird sat in the ___.'], ['bee', 'b ee', 'A ___ makes honey.'], ['feet', 'f ee t', 'Put socks on your ___.'],
      ['green', 'g r ee n', 'Grass is ___.'], ['sleep', 's l ee p', 'Go to ___ in your bed.'], ['seal', 's ea l', 'A ___ swims in the sea.'],
      ['beach', 'b ea ch', 'We dig in the sand at the ___.'], ['team', 't ea m', 'Our ___ won the game.'], ['leaf', 'l ea f', 'A ___ fell from the maple.'],
      ['key', 'k ey', 'Lock the door with a ___.']],
    sort: { q: 'Which spelling says /ee/?', bins: [['ee', 'ee', ''], ['ea', 'ea', ''], ['ey', 'ey', '']], items: 'bee/0 seal/1 key/2 feet/0 team/1 sheep/0 leaf/1 monkey/2' },
    endings: [['sleep', 'ing'], ['read', 'er'], ['green', 'est'], ['team', 's'], ['sweet', 'ly']],
    review: ['rain', 'play'], sounds: ['ai', 'ay'],
    sentence: 'We see green trees by the sea.' });

  add({ id: 'oa-ow', band: '1', group: TEAMS, name: 'oa, ow and oe', focus: ['oa', 'ow', 'oe'], key: 'boat',
    rule: 'oa sits in the middle of a word. ow sits at the end.',
    tip: 'Oa, ow and oe all say the name of o. Oa is in the middle (boat), ow is at the end (snow), and oe is at the end of a few short words (toe). Ow can also say /ow/ as in cow: that comes later.',
    mistake: 'Writes ow in the middle (bowt) or oa at the end (snoa).',
    heart: ['four'],
    words: [['boat', 'b oa t', 'We row the ___ on the lake.'], ['coat', 'c oa t', 'Put on your ___, it is cold.'], ['goat', 'g oa t', 'A ___ eats grass on the farm.'],
      ['road', 'r oa d', 'The truck drives on the ___.'], ['soap', 's oa p', 'Wash your hands with ___.'], ['snow', 's n ow', 'We make a snowman in the ___.'],
      ['grow', 'g r ow', 'Plants ___ in the sun.'], ['slow', 's l ow', 'A snail is ___.'], ['show', 'sh ow', '___ me your picture.'], ['toe', 't oe', 'I hurt my big ___.']],
    sort: { q: 'Where is the /oh/ sound?', bins: [['oa', 'oa', 'middle'], ['ow', 'ow', 'end'], ['oe', 'oe', 'end']], items: 'boat/0 snow/1 toe/2 road/0 grow/1 soap/0 slow/1 coat/0 show/1' },
    endings: [['grow', 'ing'], ['float', 'ed'], ['slow', 'ly'], ['snow', 'y'], ['coat', 's']],
    review: ['tree', 'seal'], sounds: ['ee', 'ea'],
    sentence: 'The goat sat in the snow by the road.' });

  add({ id: 'igh-ie', band: '1', group: TEAMS, name: 'igh and ie', focus: ['igh', 'ie'], key: 'light',
    rule: 'igh and ie say the name of i.',
    tip: 'Igh is three letters for one sound: the g and h are silent, so the whole igh goes in one box. Ie says /eye/ at the end of a few short words (pie, tie). In the middle of a word, i–e is still the most common spelling (kite).',
    mistake: 'Leaves out the g or the h (lite, liht), or gives igh three boxes.',
    heart: ['through'],
    words: [['light', 'l igh t', 'Turn on the ___.'], ['night', 'n igh t', 'The moon comes out at ___.'], ['right', 'r igh t', 'Write with your ___ hand.'],
      ['high', 'h igh', 'The kite is up ___.'], ['bright', 'b r igh t', 'The sun is ___.'], ['flight', 'f l igh t', 'Our ___ goes to Halifax.'],
      ['sight', 's igh t', 'The ship is out of ___.'], ['pie', 'p ie', 'We bake an apple ___.'], ['tie', 't ie', 'Can you ___ your shoes?'], ['lie', 'l ie', '___ down on the bed.']],
    sort: { q: 'Which spelling says /eye/?', bins: [['igh', 'igh', ''], ['ie', 'ie', ''], ['i_e', 'i_e', '']], items: 'light/0 pie/1 kite/2 night/0 tie/1 bike/2 high/0 lie/1 time/2' },
    endings: [['light', 'er'], ['bright', 'est'], ['night', 'ly'], ['high', 'er'], ['fight', 'ing']],
    review: ['boat', 'snow'], sounds: ['oa', 'ow'],
    sentence: 'The night sky is bright.' });
})();
