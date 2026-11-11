/* Language Atlas Spelling path: the steps (words, sorts, endings, dictation), loaded when the tool first opens. Written for this site.
   Each step is a decodable reader step (same id, same order; tests/decodable.js), so a child spells the pattern they have just read.
   The consonant pages and the short vowel review have no spelling step of their own, nor has wh (too few words a child can spell).
   Atlas.spelling.add({ id, band, group, name, focus, key, rule, tip, mistake, heart, words, sort, endings, review, sounds, sentence, beats })
   band      'K', '1', '2' or '3': the grade where Ontario's Language Foundations Continuum (2026) teaches the spelling
   words     8 to 10 words: [word, its sounds (one spelling for each sound, a_e for a silent-e vowel), a clue with ___ for the word]
   beats     true: the words split into beats (syllables) instead of sounds, one box for each beat (longer words)
   sort      { q, bins: [[spelling, label, where]], items: 'word/bin ...' }: where is 'start', 'middle' or 'end' (the choice map),
             or left out (plain columns); bin is the number of the bin the word goes in, from 0
   endings   [[word, ending]]: the tool works the new word out with the spelling rules (tools.js join); an ending like 'un-' is a prefix
   review    2 words from earlier steps for the dictation (none on the first step); sounds: 2 earlier spellings for the dictation warm-up
   sentence  the dictation sentence: every word can be spelled at this step, or is a heart word
   tests/spelling.js checks all of it again on its own. */
(function () {
  var add = Atlas.spelling.add;
  var LONG = 'Long vowels: silent e';
  var TEAMS = 'Vowel teams';
  var OPEN = 'Open syllables and y';

  var SHORT = 'Short vowels';
  var DIG = 'Digraphs: two letters, one sound';

  add({ id: 'short-a', band: 'K', group: SHORT, name: 'Short a', focus: ['a'], key: 'cat',
    rule: 'Short a says /a/, as in apple.',
    tip: 'Say the word slowly, stretching each sound: mmm-aaa-p. The child taps a finger for each sound, then writes one letter in each box. Three sounds, three boxes.',
    mistake: 'Leaves out the vowel (ct for cat), or writes the letter name instead of the sound.',
    heart: ['the', 'is'],
    words: [['cat', 'c a t', 'The ___ says meow.'], ['hat', 'h a t', 'Put a ___ on your head.'], ['map', 'm a p', 'A ___ shows us the way.'], ['van', 'v a n', 'We ride in a ___.'],
      ['jam', 'j a m', 'Put ___ on the toast.'], ['bag', 'b a g', 'Pack your lunch in a ___.'], ['fan', 'f a n', 'A ___ keeps us cool.'], ['rat', 'r a t', 'A ___ has a long tail.'],
      ['pan', 'p a n', 'Cook the egg in a ___.'], ['dad', 'd a d', 'My ___ is tall.']],
    review: [], sounds: ['m', 't'],
    sentence: 'A cat and a rat sat.' });

  add({ id: 'short-i', band: 'K', group: SHORT, name: 'Short i', focus: ['i'], key: 'pig',
    rule: 'Short i says /i/, as in itch.',
    tip: 'Short i and short e sound close. Ask the child to watch your mouth: for /i/ the smile is small. Say pin and pen and let the child hear the change.',
    mistake: 'Writes e for i (pen for pin). Say the word again with a big, clear vowel.',
    heart: ['was', 'said'],
    words: [['pig', 'p i g', 'A ___ rolls in the mud.'], ['big', 'b i g', 'An elephant is very ___.'], ['dig', 'd i g', 'Dogs like to ___ holes.'], ['sit', 's i t', 'Please ___ on the mat.'],
      ['lip', 'l i p', 'I bit my ___.'], ['zip', 'z i p', '___ up your coat.'], ['pin', 'p i n', 'A ___ is sharp.'], ['six', 's i x', 'Five and one make ___.'],
      ['wig', 'w i g', 'The clown has a red ___.'], ['fin', 'f i n', 'A fish swims with its ___.']],
    sort: { q: 'Short a or short i?', bins: [['a', 'Short a', ''], ['i', 'Short i', '']], items: 'cat/0 pig/1 map/0 lip/1 fan/0 fin/1 hat/0 hit/1' },
    review: ['cat', 'map'], sounds: ['a', 'm'],
    sentence: 'The pig sat in a big pit.' });

  add({ id: 'short-o', band: 'K', group: SHORT, name: 'Short o', focus: ['o'], key: 'pot',
    rule: 'Short o says /o/, as in octopus.',
    tip: 'Open the mouth wide for /o/, as if the doctor asks you to say ahh. Tap the sounds of hot: h, o, t. Three taps, three boxes.',
    mistake: 'Writes u for o (hut for hot), or a for o.',
    heart: ['of', 'do'],
    words: [['hot', 'h o t', 'The sun is ___.'], ['pot', 'p o t', 'Cook the soup in a ___.'], ['top', 't o p', 'Spin the ___.'], ['mop', 'm o p', 'Wipe the floor with a ___.'],
      ['fox', 'f o x', 'A ___ has a bushy tail.'], ['box', 'b o x', 'Put the toys in the ___.'], ['log', 'l o g', 'The frog sits on a ___.'], ['dog', 'd o g', 'The ___ wags its tail.'],
      ['jog', 'j o g', 'We ___ around the track.'], ['cot', 'c o t', 'The baby naps in a ___.']],
    sort: { q: 'Which short vowel?', bins: [['a', 'Short a', ''], ['i', 'Short i', ''], ['o', 'Short o', '']], items: 'cat/0 pig/1 dog/2 map/0 lip/1 top/2 hat/0 sit/1 box/2' },
    review: ['pig', 'six'], sounds: ['i', 'a'],
    sentence: 'The dog sat on a log.' });

  add({ id: 'short-u', band: 'K', group: SHORT, name: 'Short u', focus: ['u'], key: 'sun',
    rule: 'Short u says /u/, as in up.',
    tip: 'Short u is the sound we make when we lift something heavy: uh. Compare hot and hut, cot and cut: only the vowel changes.',
    mistake: 'Writes o or a for u (cop for cup).',
    heart: ['put', 'she'],
    words: [['bug', 'b u g', 'A ___ is on the leaf.'], ['hug', 'h u g', 'Give your mom a ___.'], ['rug', 'r u g', 'The cat naps on the ___.'], ['mug', 'm u g', 'Hot milk is in my ___.'],
      ['cup', 'c u p', 'Drink from a ___.'], ['sun', 's u n', 'The ___ is hot.'], ['run', 'r u n', 'I can ___ fast.'], ['nut', 'n u t', 'A squirrel eats a ___.'],
      ['tub', 't u b', 'Take a bath in the ___.'], ['bus', 'b u s', 'Ride the ___ to school.']],
    sort: { q: 'Short o or short u?', bins: [['o', 'Short o', ''], ['u', 'Short u', '']], items: 'hot/0 hut/1 cot/0 cut/1 dog/0 dug/1 pop/0 pup/1' },
    review: ['fox', 'log'], sounds: ['o', 'i'],
    sentence: 'The pup dug in the mud.' });

  add({ id: 'short-e', band: 'K', group: SHORT, name: 'Short e', focus: ['e'], key: 'bed',
    rule: 'Short e says /e/, as in egg.',
    tip: 'Short e is the hardest short vowel to hear. Say pin, pen; bit, bet. The child holds up one finger for i and two for e before writing.',
    mistake: 'Writes i or a for e (pin for pen, bad for bed).',
    heart: ['are', 'have'],
    words: [['bed', 'b e d', 'I sleep in my ___.'], ['red', 'r e d', 'A fire truck is ___.'], ['wet', 'w e t', 'Rain makes us ___.'], ['pet', 'p e t', 'A cat is a good ___.'],
      ['net', 'n e t', 'Catch the fish in a ___.'], ['ten', 't e n', 'Count to ___ on your fingers.'], ['hen', 'h e n', 'A ___ lays eggs.'], ['pen', 'p e n', 'Write with a ___.'],
      ['leg', 'l e g', 'I hurt my ___.'], ['web', 'w e b', 'A spider spins a ___.']],
    sort: { q: 'Short i or short e?', bins: [['i', 'Short i', ''], ['e', 'Short e', '']], items: 'pin/0 pen/1 bit/0 bet/1 big/0 beg/1 sit/0 set/1 lid/0 led/1' },
    review: ['sun', 'cup'], sounds: ['u', 'o'],
    sentence: 'The red hen is wet.' });

  add({ id: 'sh', band: 'K', group: DIG, name: 'sh', focus: ['sh'], key: 'ship',
    rule: 'sh is two letters for one sound.',
    tip: 'Put a finger to the lips: shh. Two letters, one sound, so sh goes in one box. Tap ship: sh, i, p is three taps.',
    mistake: 'Writes s alone (sip for ship), or gives s and h a box each.',
    heart: ['what', 'who'],
    words: [['ship', 'sh i p', 'A ___ sails on the sea.'], ['shop', 'sh o p', 'We buy milk at the ___.'], ['shed', 'sh e d', 'The rake is in the ___.'], ['shut', 'sh u t', '___ the door, please.'],
      ['shin', 'sh i n', 'Your ___ is the front of your leg.'], ['fish', 'f i sh', 'A ___ swims in the lake.'], ['dish', 'd i sh', 'Put the food in a ___.'], ['wish', 'w i sh', 'Make a ___ and blow.'],
      ['cash', 'c a sh', 'Pay with ___ at the store.'], ['rush', 'r u sh', 'Do not ___, take your time.']],
    sort: { q: 'Which sound?', bins: [['s', 's', ''], ['h', 'h', ''], ['sh', 'sh', '']], items: 'sun/0 hat/1 ship/2 sit/0 hop/1 shop/2 sad/0 hen/1 fish/2' },
    review: ['bed', 'hen'], sounds: ['e', 'u'],
    sentence: 'The fish is in a dish.' });

  add({ id: 'ch', band: 'K', group: DIG, name: 'ch', focus: ['ch'], key: 'chin',
    rule: 'ch is two letters for one sound.',
    tip: 'Ch is a sneeze sound: ch, ch. Put the hand under the chin to feel it. Sort sh and ch out loud first: ship, chip; shop, chop.',
    mistake: 'Mixes up ch and sh (shop for chop).',
    heart: ['where', 'come'],
    words: [['chin', 'ch i n', 'Your ___ is under your mouth.'], ['chip', 'ch i p', 'I ate a potato ___.'], ['chop', 'ch o p', '___ the wood for the fire.'], ['chat', 'ch a t', 'Let us sit and ___.'],
      ['chug', 'ch u g', 'The train will ___ up the hill.'], ['chum', 'ch u m', 'A ___ is a good friend.'], ['rich', 'r i ch', 'A king is ___.'], ['much', 'm u ch', 'Thank you very ___.'],
      ['such', 's u ch', 'It was ___ a fun day.'], ['chap', 'ch a p', 'Cold wind can ___ your lips.']],
    sort: { q: 'sh or ch?', bins: [['sh', 'sh', ''], ['ch', 'ch', '']], items: 'ship/0 chip/1 shop/0 chop/1 dish/0 rich/1 shin/0 chin/1' },
    review: ['fish', 'shop'], sounds: ['sh', 'e'],
    sentence: 'Rich has a chip in his cup.' });

  add({ id: 'th', band: 'K', group: DIG, name: 'th', focus: ['th'], key: 'thin',
    rule: 'th is two letters for one sound.',
    tip: 'For th, the tongue peeks out between the teeth. Use a mirror. Th can be quiet (thin) or buzzy (this), but it is spelled the same way.',
    mistake: 'Writes f or v for th (fin for thin), or t alone.',
    heart: ['your', 'from'],
    words: [['this', 'th i s', 'Is ___ your hat?'], ['that', 'th a t', 'Look at ___ big dog!'], ['then', 'th e n', 'Wash your hands, ___ eat.'], ['them', 'th e m', 'Give the cups to ___.'],
      ['thin', 'th i n', 'A stick is long and ___.'], ['with', 'w i th', 'Come ___ me.'], ['path', 'p a th', 'Walk on the ___ in the woods.'], ['bath', 'b a th', 'Take a ___ in the tub.'],
      ['math', 'm a th', 'We add in ___ class.'], ['moth', 'm o th', 'A ___ flies to the light.']],
    sort: { q: 't or th?', bins: [['t', 't', ''], ['th', 'th', '']], items: 'ten/0 then/1 tap/0 path/1 tub/0 bath/1 cat/0 moth/1' },
    review: ['chin', 'much'], sounds: ['ch', 'sh'],
    sentence: 'The moth is on the path.' });

  add({ id: 'ck', band: 'K', group: DIG, name: 'ck at the end', focus: ['ck'], key: 'duck',
    rule: 'ck says /k/ at the end, right after a short vowel.',
    tip: 'C and k are partners: ck is one sound, one box. It comes straight after a short vowel at the end of a short word (duck, sock). At the start, use c or k.',
    mistake: 'Writes c or k alone at the end (duc, sok), or ck at the start (ckat).',
    heart: ['says', 'does'],
    words: [['duck', 'd u ck', 'A ___ swims on the pond.'], ['back', 'b a ck', 'Carry the bag on your ___.'], ['sack', 's a ck', 'Put the potatoes in a ___.'], ['rock', 'r o ck', 'I sat on a big ___.'],
      ['sock', 's o ck', 'Put a ___ on each foot.'], ['kick', 'k i ck', '___ the ball to me.'], ['lick', 'l i ck', 'The dog likes to ___ my hand.'], ['sick', 's i ck', 'I stay home when I am ___.'],
      ['neck', 'n e ck', 'A giraffe has a long ___.'], ['deck', 'd e ck', 'We sat on the ___ in the sun.']],
    sort: { q: 'Where is the /k/ sound?', bins: [['c', 'c', 'start'], ['k', 'k', 'start'], ['ck', 'ck', 'end']], items: 'cat/0 kid/1 duck/2 cup/0 kit/1 sock/2 cot/0 keg/1 neck/2' },
    review: ['thin', 'bath'], sounds: ['th', 'ch'],
    sentence: 'Nick has a duck in a sack.' });

  var GLUED = 'FLOSS and glued sounds';
  var ENDS = 'oll and ull, -ed, -ing, -es';
  var PLURAL = 'Ending -s';
  var BLEND = 'Blends';
  var TCH = 'tch, dge and two beats';

  add({ id: 'floss', band: '1', group: GLUED, name: 'FLOSS: ff, ll, ss, zz', focus: ['ff', 'll', 'ss', 'zz'], key: 'bell',
    rule: 'After a short vowel, f, l, s and z double at the end of a short word.',
    tip: 'The FLOSS rule: a one-beat word with a short vowel that ends in f, l, s or z doubles that letter (puff, bell, kiss, buzz). The double letter is one sound, so it goes in one box. A few words do not follow it: bus, yes, gas, if.',
    mistake: 'Writes one letter (bel, kis), or doubles after a long vowel or a blend.',
    heart: ['push'],
    words: [['puff', 'p u ff', 'Blow out the candle in one ___.'], ['off', 'o ff', 'Turn ___ the light.'], ['cuff', 'c u ff', 'Roll up the ___ of your sleeve.'], ['hill', 'h i ll', 'We ran up the ___.'],
      ['bell', 'b e ll', 'Ring the ___.'], ['doll', 'd o ll', 'She has a ___ with red hair.'], ['kiss', 'k i ss', 'Give the baby a ___.'], ['mess', 'm e ss', 'Clean up the ___.'],
      ['buzz', 'b u zz', 'Bees ___ in the garden.'], ['fizz', 'f i zz', 'The pop has lots of ___.']],
    sort: { q: 'Which double letter?', bins: [['ff', 'ff', ''], ['ll', 'll', ''], ['ss', 'ss', ''], ['zz', 'zz', '']], items: 'puff/0 hill/1 kiss/2 buzz/3 off/0 bell/1 mess/2 fizz/3' },
    review: ['duck', 'kick'], sounds: ['ck', 'sh'],
    sentence: 'Jill fell off the hill.' });

  add({ id: 'all', band: '1', group: GLUED, name: 'Glued sound all', focus: ['all'], key: 'ball',
    rule: 'all is a glued sound: one tile, said together.',
    tip: 'In all, the a does not say /a/: the a and the l are glued together. Teach all as one tile, then add a letter in front: b-all, c-all, t-all.',
    mistake: 'Writes one l (bal) or spells it with aw (bawl).',
    heart: ['walk', 'talk'],
    words: [['all', 'all', 'We ate ___ the cake.'], ['ball', 'b all', 'Throw the ___ to me.'], ['call', 'c all', '___ me on the phone.'], ['fall', 'f all', 'Leaves ___ from the trees.'],
      ['hall', 'h all', 'Walk down the ___ to the class.'], ['mall', 'm all', 'We shop at the ___.'], ['tall', 't all', 'A giraffe is very ___.'], ['wall', 'w all', 'Hang the picture on the ___.'],
      ['shall', 'sh all', '___ we go out to play?']],
    review: ['hill', 'kiss'], sounds: ['ll', 'ff'],
    sentence: 'The tall man will call.' });

  add({ id: 'ng', band: '1', group: GLUED, name: 'Glued sounds ang, ing, ong, ung', focus: ['ang', 'ing', 'ong', 'ung'], key: 'king',
    rule: 'ang, ing, ong and ung are glued sounds: one tile each.',
    tip: 'Before ng, the vowel changes a little, so it is easier to hear the whole glued sound: k-ing, s-ong. Hum the ng: it is said through the nose.',
    mistake: 'Leaves out the g (kin for king), or writes n and g in two boxes.',
    heart: ['only', 'other'],
    words: [['king', 'k ing', 'The ___ wears a crown.'], ['ring', 'r ing', 'She has a gold ___ on her finger.'], ['sing', 's ing', 'We ___ a song in music class.'], ['wing', 'w ing', 'A bird has a ___ on each side.'],
      ['thing', 'th ing', 'What is that ___?'], ['bang', 'b ang', 'The door shut with a ___.'], ['hang', 'h ang', '___ your coat on the hook.'], ['long', 'l ong', 'A snake is ___.'],
      ['song', 's ong', 'Sing a ___ with me.'], ['lung', 'l ung', 'Air fills each ___ when you breathe.']],
    sort: { q: 'Which glued sound?', bins: [['ang', 'ang', ''], ['ing', 'ing', ''], ['ong', 'ong', ''], ['ung', 'ung', '']], items: 'bang/0 king/1 long/2 lung/3 hang/0 ring/1 song/2 sung/3' },
    review: ['ball', 'tall'], sounds: ['all', 'll'],
    sentence: 'The king sang a long song.' });

  add({ id: 'nk', band: '1', group: GLUED, name: 'Glued sounds ank, ink, onk, unk', focus: ['ank', 'ink', 'onk', 'unk'], key: 'pink',
    rule: 'ank, ink, onk and unk are glued sounds: one tile each.',
    tip: 'Nk sounds like ng with a /k/ at the end. Say think slowly: th-ink. The child can hear the /k/, so the k is easy; the n is the one to watch.',
    mistake: 'Leaves out the n (pik for pink), or writes ng (thingk).',
    heart: ['friend', 'many'],
    words: [['pink', 'p ink', 'Mix red and white to make ___.'], ['sink', 's ink', 'Wash the dishes in the ___.'], ['wink', 'w ink', 'Close one eye to ___.'], ['think', 'th ink', 'I ___ it will rain.'],
      ['bank', 'b ank', 'Keep your money in a ___.'], ['tank', 't ank', 'The fish swims in a ___.'], ['thank', 'th ank', '___ you for the gift.'], ['honk', 'h onk', 'Geese ___ as they fly south.'],
      ['bunk', 'b unk', 'I sleep on the top ___.'], ['junk', 'j unk', 'Throw out the old ___.']],
    sort: { q: 'Which glued sound?', bins: [['ank', 'ank', ''], ['ink', 'ink', ''], ['onk', 'onk', ''], ['unk', 'unk', '']], items: 'bank/0 pink/1 honk/2 bunk/3 tank/0 sink/1 junk/3 wink/1' },
    review: ['king', 'song'], sounds: ['ing', 'ang'],
    sentence: 'I think the pink tank sank.' });

  add({ id: 'plural-s', band: '1', group: PLURAL, name: 'Ending -s', focus: ['-s'], key: 'cats',
    rule: 'Add -s to mean more than one.',
    tip: 'The -s can sound like /s/ (cats) or /z/ (dogs), but it is always spelled s. Spell the base word first, then add the s.',
    mistake: 'Writes z for the /z/ sound (dogz).',
    heart: ['could', 'would'],
    words: [['cats', 'c a t s', 'Two ___ sat on the mat.'], ['dogs', 'd o g s', 'The ___ ran to the park.'], ['hens', 'h e n s', 'The ___ lay eggs.'], ['pigs', 'p i g s', 'The ___ roll in the mud.'],
      ['bugs', 'b u g s', 'Some ___ have six legs.'], ['cups', 'c u p s', 'Put the ___ on the table.'], ['kids', 'k i d s', 'The ___ play at recess.'], ['hats', 'h a t s', 'We wear ___ in the sun.'],
      ['bells', 'b e ll s', 'The ___ ring at noon.'], ['ducks', 'd u ck s', 'The ___ swim on the pond.']],
    endings: [['cat', 's'], ['dog', 's'], ['bell', 's'], ['sock', 's'], ['ship', 's']],
    review: ['pink', 'bank'], sounds: ['ink', 'ank'],
    sentence: 'The cats and dogs had fun.' });

  add({ id: 'blend-start', band: '1', group: BLEND, name: 'Blends at the start', focus: ['bl', 'fr', 'st'], key: 'frog',
    rule: 'In a blend, you hear every sound.',
    tip: 'A blend is two consonants side by side, each with its own sound: f-r-o-g is four sounds, four boxes. Say it slowly and tap each sound; the second sound of the blend is the one that hides.',
    mistake: 'Leaves out the second letter of the blend (fog for frog, sop for stop).',
    heart: ['people', 'again'],
    words: [['flag', 'f l a g', 'The Canadian ___ has a red maple leaf.'], ['clap', 'c l a p', '___ your hands to the beat.'], ['plum', 'p l u m', 'A ___ is a purple fruit.'], ['sled', 's l e d', 'We ride the ___ down the hill.'],
      ['frog', 'f r o g', 'A ___ hops into the pond.'], ['crab', 'c r a b', 'A ___ walks sideways.'], ['drum', 'd r u m', 'Bang the ___ in the band.'], ['trip', 't r i p', 'We went on a ___ to the city.'],
      ['swim', 's w i m', 'Fish ___ in the lake.'], ['stop', 's t o p', 'Red means ___.']],
    review: ['cats', 'bells'], sounds: ['ck', 'sh'],
    sentence: 'The frog can swim and stop.' });

  add({ id: 'blend-end', band: '1', group: BLEND, name: 'Blends at the end', focus: ['nd', 'mp', 'st'], key: 'jump',
    rule: 'At the end of a word, a blend has two sounds too.',
    tip: 'End blends hide their first sound, the n in hand or the m in jump. Stretch the word: ha-n-d. Four sounds, four boxes.',
    mistake: 'Leaves out the n or m (had for hand, jup for jump).',
    heart: ['love', 'done'],
    words: [['hand', 'h a n d', 'Hold my ___.'], ['jump', 'j u m p', 'Frogs can ___ high.'], ['nest', 'n e s t', 'A bird sits in its ___.'], ['tent', 't e n t', 'We sleep in a ___ when we camp.'],
      ['camp', 'c a m p', 'We ___ by the lake.'], ['lamp', 'l a m p', 'Turn on the ___ to read.'], ['desk', 'd e s k', 'Sit at your ___.'], ['milk', 'm i l k', 'A cow gives ___.'],
      ['gift', 'g i f t', 'I got a ___ for my birthday.'], ['belt', 'b e l t', 'A ___ holds up your pants.']],
    review: ['frog', 'drum'], sounds: ['sh', 'th'],
    sentence: 'The tent is next to the pond.' });

  add({ id: 'blend-three', band: '1', group: BLEND, name: 'Three-letter blends', focus: ['str', 'spl', 'scr'], key: 'string',
    rule: 'A three-letter blend has three sounds.',
    tip: 'Str, spl and scr start with s, then a two-letter blend. Tap all three: s-t-r. Have the child say the blend alone, then the whole word.',
    mistake: 'Leaves out the middle letter (sring for string, sap for strap).',
    heart: ['once', 'both'],
    words: [['string', 's t r ing', 'Tie the box with ___.'], ['strap', 's t r a p', 'Do up the ___ on your helmet.'], ['split', 's p l i t', 'Let us ___ the apple in half.'], ['splash', 's p l a sh', 'The kids ___ in the pool.'],
      ['scrap', 's c r a p', 'Write on a ___ of paper.'], ['scrub', 's c r u b', '___ the pot until it is clean.'], ['spring', 's p r ing', 'Flowers grow in the ___.'], ['strip', 's t r i p', 'Cut a long ___ of tape.'],
      ['sprint', 's p r i n t', 'We ___ to the finish line.'], ['strum', 's t r u m', '___ the guitar.']],
    review: ['hand', 'jump'], sounds: ['ing', 'ck'],
    sentence: 'Split the string and strap it.' });

  add({ id: 'oll-ull', band: '1', group: ENDS, name: 'oll and ull', focus: ['oll', 'ull'], key: 'roll',
    rule: 'oll says /ole/; ull says /ool/ as in full.',
    tip: 'These break the short vowel pattern: roll has a long o, and full has the /oo/ of book. Teach them as glued tiles, oll and ull, with the FLOSS double l.',
    mistake: 'Writes ole for oll (role and roll are different words), or one l (ful).',
    heart: ['wolf'],
    words: [['roll', 'r oll', '___ the ball to me.'], ['toll', 't oll', 'We paid a ___ to cross the bridge.'], ['poll', 'p oll', 'The class took a ___ to pick a game.'], ['troll', 't r oll', 'A ___ lives under the bridge in the story.'],
      ['stroll', 's t r oll', 'Let us ___ in the park.'], ['scroll', 's c r oll', '___ down the page.'], ['full', 'f ull', 'My plate is ___.'], ['pull', 'p ull', '___ the wagon up the hill.'],
      ['bull', 'b ull', 'A ___ has horns.']],
    sort: { q: 'oll or ull?', bins: [['oll', 'oll', ''], ['ull', 'ull', '']], items: 'roll/0 full/1 toll/0 pull/1 troll/0 bull/1 scroll/0' },
    review: ['string', 'split'], sounds: ['all', 'll'],
    sentence: 'Roll the ball up the hill.' });

  add({ id: 'suffix-ed', band: '1', group: ENDS, name: 'Ending -ed', focus: ['-ed'], key: 'jumped',
    rule: '-ed means it already happened.',
    tip: 'The -ed ending says /t/ (jumped), /d/ (filled) or /id/ (landed), but it is always spelled ed. When a short word ends in one vowel and one consonant, double the consonant first (hop, hopped).',
    mistake: 'Spells the sound (jumpt, fild), or forgets to double (hoped for hopped).',
    heart: ['work', 'word'],
    words: [['jumped', 'j u m p ed', 'The frog ___ into the pond.'], ['landed', 'l a n d ed', 'The plane ___ at the airport.'], ['rested', 'r e s t ed', 'We ___ after the long walk.'], ['melted', 'm e l t ed', 'The snow ___ in the sun.'],
      ['hopped', 'h o pp ed', 'The rabbit ___ away.'], ['planted', 'p l a n t ed', 'We ___ seeds in the garden.'], ['filled', 'f i ll ed', 'I ___ my cup with milk.'], ['yelled', 'y e ll ed', 'He ___ for help.'],
      ['packed', 'p a ck ed', 'Mom ___ my lunch.'], ['kicked', 'k i ck ed', 'She ___ the ball into the net.']],
    endings: [['jump', 'ed'], ['hop', 'ed'], ['land', 'ed'], ['fill', 'ed'], ['plan', 'ed']],
    review: ['roll', 'pull'], sounds: ['oll', 'ull'],
    sentence: 'I jumped and landed in the pond.' });

  add({ id: 'suffix-ing', band: '1', group: ENDS, name: 'Ending -ing', focus: ['-ing'], key: 'running',
    rule: '-ing means it is happening now.',
    tip: 'One beat, one short vowel, one last consonant: double it before -ing (run, running). With two consonants at the end, just add -ing (jump, jumping). The double keeps the vowel short.',
    mistake: 'Forgets to double (runing), or doubles after two consonants (jumpping).',
    heart: ['mother', 'brother'],
    words: [['jumping', 'j u m p ing', 'The kids are ___ rope.'], ['running', 'r u nn ing', 'The dog is ___ in the field.'], ['sitting', 's i tt ing', 'The cat is ___ on the mat.'], ['hopping', 'h o pp ing', 'The bunny is ___ away.'],
      ['fishing', 'f i sh ing', 'We go ___ at the lake.'], ['resting', 'r e s t ing', 'Grandpa is ___ in his chair.'], ['helping', 'h e l p ing', 'Thank you for ___ me.'], ['digging', 'd i gg ing', 'The dog is ___ a hole.'],
      ['swimming', 's w i mm ing', 'We are ___ in the pool.'], ['camping', 'c a m p ing', 'We went ___ in the woods.']],
    endings: [['run', 'ing'], ['sit', 'ing'], ['jump', 'ing'], ['dig', 'ing'], ['fish', 'ing']],
    review: ['jumped', 'hopped'], sounds: ['ed', 'ck'],
    sentence: 'I am sitting and resting.' });

  add({ id: 'suffix-es', band: '1', group: ENDS, name: 'Ending -es', focus: ['-es'], key: 'boxes',
    rule: 'After s, x, sh, ch and z, add -es.',
    tip: 'Say boxes: you can hear the extra beat. When a word ends in s, x, z, sh or ch, you cannot say a plain s after it, so add -es. Clap the beats: box (one), box-es (two).',
    mistake: 'Adds only s (boxs, wishs).',
    heart: ['goes', 'shoe'],
    words: [['boxes', 'b o x es', 'Stack the ___ by the door.'], ['foxes', 'f o x es', 'Two ___ ran into the woods.'], ['wishes', 'w i sh es', 'She made three ___.'], ['dishes', 'd i sh es', 'Help me wash the ___.'],
      ['brushes', 'b r u sh es', 'Paint with small ___.'], ['benches', 'b e n ch es', 'We sat on the park ___.'], ['lunches', 'l u n ch es', 'Pack the ___ for the trip.'], ['glasses', 'g l a ss es', 'Grandma reads with her ___.'],
      ['kisses', 'k i ss es', 'The baby got lots of ___.'], ['buzzes', 'b u zz es', 'A bee ___ by the flower.']],
    endings: [['box', 'es'], ['wish', 'es'], ['dish', 'es'], ['glass', 'es'], ['bench', 'es']],
    review: ['running', 'fishing'], sounds: ['ing', 'ed'],
    sentence: 'Put the dishes in the boxes.' });

  add({ id: 'tch', band: '1', group: TCH, name: 'tch', focus: ['tch'], key: 'catch',
    rule: 'After a short vowel, /ch/ at the end is spelled tch.',
    tip: 'Tch is one sound in one box; the t is silent and guards the short vowel. Use tch right after a short vowel (catch). Use ch at the start, or after a consonant (bench). A few words break the rule: much, such, rich, which.',
    mistake: 'Writes ch after a short vowel (cach, mach).',
    heart: ['watch', 'wash'],
    words: [['catch', 'c a tch', '___ the ball!'], ['match', 'm a tch', 'Find the socks that ___.'], ['patch', 'p a tch', 'Sew a ___ on the jeans.'], ['hatch', 'h a tch', 'The chicks will ___ from the eggs.'],
      ['pitch', 'p i tch', '___ the ball to the batter.'], ['ditch', 'd i tch', 'Water ran into the ___.'], ['switch', 's w i tch', 'Flip the light ___.'], ['fetch', 'f e tch', 'The dog will ___ the stick.'],
      ['sketch', 's k e tch', 'Draw a quick ___ of the tree.'], ['hutch', 'h u tch', 'The rabbit sleeps in a ___.']],
    sort: { q: 'Where is the /ch/ sound?', bins: [['ch', 'ch', 'start'], ['tch', 'tch', 'end']], items: 'chip/0 catch/1 chin/0 match/1 chop/0 fetch/1 chat/0 pitch/1' },
    endings: [['catch', 'es'], ['match', 'es'], ['fetch', 'ing'], ['switch', 'ed'], ['patch', 'es']],
    review: ['boxes', 'dishes'], sounds: ['ch', 'es'],
    sentence: 'Catch the ball and fetch the bat.' });

  add({ id: 'dge', band: '1', group: TCH, name: 'dge', focus: ['dge'], key: 'bridge',
    rule: 'After a short vowel, /j/ at the end is spelled dge.',
    tip: 'Dge is one sound in one box. Like tch, it comes right after a short vowel (badge, edge). No English word ends in j, so /j/ at the end is dge or ge.',
    mistake: 'Writes j or ge after a short vowel (baj, bage).',
    heart: ['very', 'every'],
    words: [['bridge', 'b r i dge', 'Cross the ___ over the river.'], ['edge', 'e dge', 'Do not stand at the ___ of the cliff.'], ['ledge', 'l e dge', 'The bird sat on the window ___.'], ['hedge', 'h e dge', 'Cut the ___ in the yard.'],
      ['badge', 'b a dge', 'The police officer wears a ___.'], ['fudge', 'f u dge', '___ is a sweet treat.'], ['judge', 'j u dge', 'The ___ picked the best pie.'], ['nudge', 'n u dge', 'Give him a ___ to wake him.'],
      ['ridge', 'r i dge', 'We hiked up the ___.'], ['lodge', 'l o dge', 'We stayed at a ___ by the lake.']],
    sort: { q: 'Where is the /j/ sound?', bins: [['j', 'j', 'start'], ['dge', 'dge', 'end']], items: 'jam/0 badge/1 jet/0 edge/1 jug/0 fudge/1 job/0 ridge/1' },
    endings: [['judge', 'ing'], ['nudge', 'ed'], ['edge', 'es'], ['badge', 's']],
    review: ['catch', 'match'], sounds: ['tch', 'ch'],
    sentence: 'The badge is on the ledge.' });

  add({ id: 'two-closed', band: '1', group: TCH, beats: true, name: 'Two closed beats', focus: ['rab·bit'], key: 'rabbit',
    rule: 'Split a long word into beats. Spell one beat at a time.',
    tip: 'Clap the beats: rab-bit. Each beat has one vowel and ends with a consonant, so the vowel is short. Two consonants in the middle split between them (nap-kin). Spell each beat in its own box, then read the whole word.',
    mistake: 'Leaves out a middle consonant (rabit, kiten), or a whole beat.',
    heart: ['great', 'break'],
    words: [['napkin', 'nap kin', 'Wipe your mouth with a ___.'], ['rabbit', 'rab bit', 'A ___ has long ears.'], ['kitten', 'kit ten', 'A ___ is a baby cat.'], ['mitten', 'mit ten', 'I lost my left ___.'],
      ['basket', 'bas ket', 'Put the eggs in the ___.'], ['picnic', 'pic nic', 'We ate lunch at a ___ in the park.'], ['sunset', 'sun set', 'The sky is orange at ___.'], ['insect', 'in sect', 'An ant is an ___.'],
      ['problem', 'prob lem', 'Can you solve this ___?'], ['dentist', 'den tist', 'The ___ checks your teeth.']],
    review: ['bridge', 'edge'], sounds: ['dge', 'tch'],
    sentence: 'The rabbit hid in the basket.' });

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

  var SOFT = 'Soft c and g, and ph';
  var RV = 'Vowels with r';

  add({ id: 'soft-cg', band: '1', group: SOFT, name: 'Soft c and soft g', focus: ['ce', 'ci', 'ge'], key: 'city',
    rule: 'Before e, i or y, c says /s/ and g often says /j/.',
    tip: 'Look at the letter after the c: e, i or y makes it soft (city, face); a, o or u keeps it hard (cat). Soft c is the s sound, spelled c. At the end of a word, /s/ after a long vowel is often ce (rice), and /j/ is ge (page).',
    mistake: 'Writes s for soft c (sity, ris), or j at the end (paj).',
    heart: ['listen', 'often'],
    words: [['city', 'c i t y', 'Toronto is a big ___.'], ['cent', 'c e n t', 'A penny was one ___.'], ['face', 'f a_e c', 'Wash your ___.'], ['ice', 'i_e c', 'We skate on the ___.'],
      ['race', 'r a_e c', 'Who will win the ___?'], ['rice', 'r i_e c', 'We ate ___ with dinner.'], ['page', 'p a_e g', 'Turn the ___ of the book.'], ['cage', 'c a_e g', 'The bird sings in its ___.'],
      ['huge', 'h u_e g', 'A whale is ___.'], ['stage', 's t a_e g', 'The band played on the ___.']],
    sort: { q: 'Does the c say /s/ or /k/?', bins: [['soft-c', 'c says /s/', ''], ['hard-c', 'c says /k/', '']], items: 'city/0 cat/1 cent/0 cup/1 face/0 cot/1 ice/0 cub/1 rice/0' },
    endings: [['race', 'ing'], ['dance', 'ed'], ['ice', 'y'], ['page', 'es']],
    review: ['cake', 'bike'], sounds: ['a_e', 'i_e'],
    sentence: 'Grace put ice in the cup.' });

  add({ id: 'ph', band: '1', group: SOFT, name: 'ph', focus: ['ph'], key: 'phone',
    rule: 'ph says /f/.',
    tip: 'Ph comes from Greek words, often about science and sound (phone, graph, photo). Most words with /f/ use f; when the child knows the word is a ph word, write ph in one box.',
    mistake: 'Writes f for ph (fone), or p and h in two boxes.',
    heart: ['island'],
    words: [['phone', 'ph o_e n', 'Call me on the ___.'], ['graph', 'g r a ph', 'Show the numbers on a bar ___.'], ['photo', 'ph o t o', 'Take a ___ of the lake.'], ['dolphin', 'd o l ph i n', 'A ___ swims in the ocean.'],
      ['trophy', 't r o ph y', 'The team won a ___.'], ['elephant', 'e l e ph a n t', 'An ___ has a long trunk.'], ['alphabet', 'a l ph a b e t', 'Sing the ___ song from a to z.'], ['phonics', 'ph o n i c s', 'In ___, we learn the sounds of letters.']],
    sort: { q: 'f or ph?', bins: [['f', 'f', ''], ['ph', 'ph', '']], items: 'fan/0 phone/1 fish/0 graph/1 fox/0 photo/1 fun/0 dolphin/1' },
    review: ['city', 'face'], sounds: ['ff', 'o_e'],
    sentence: 'Phil has a photo of a dolphin.' });

  add({ id: 'ar', band: '1', group: RV, name: 'ar', focus: ['ar'], key: 'car',
    rule: 'ar says /ar/, as in car.',
    tip: 'When r comes after a vowel, it changes the vowel: a and r are said together, so ar is one tile in one box. Car is two sounds: c, ar.',
    mistake: 'Writes r alone (cr for car) or or for ar.',
    heart: ['warm', 'war'],
    words: [['car', 'c ar', 'We drive in the ___.'], ['star', 's t ar', 'A ___ shines at night.'], ['jar', 'j ar', 'The jam is in a ___.'], ['farm', 'f ar m', 'Cows live on a ___.'],
      ['barn', 'b ar n', 'The horse sleeps in the ___.'], ['park', 'p ar k', 'We play at the ___.'], ['dark', 'd ar k', 'It is ___ at night.'], ['shark', 'sh ar k', 'A ___ has sharp teeth.'],
      ['cart', 'c ar t', 'Push the ___ at the store.'], ['yard', 'y ar d', 'We play in the back ___.']],
    endings: [['park', 'ing'], ['farm', 'er'], ['dark', 'est'], ['star', 's']],
    review: ['phone', 'graph'], sounds: ['ph', 'igh'],
    sentence: 'The car is in the dark yard.' });

  add({ id: 'or', band: '1', group: RV, name: 'or and ore', focus: ['or', 'ore'], key: 'corn',
    rule: 'or and ore say /or/. ore sits at the end.',
    tip: 'Or is one tile in one box (c-or-n). At the end of a word, /or/ is often ore (more, store): the e is silent.',
    mistake: 'Leaves off the e at the end (mor, stor), or writes ar.',
    heart: ['door', 'floor'],
    words: [['corn', 'c or n', 'We ate ___ on the cob.'], ['fork', 'f or k', 'Eat with a ___.'], ['horn', 'h or n', 'The car ___ went beep.'], ['north', 'n or th', 'Geese fly ___ in the spring.'],
      ['storm', 's t or m', 'A ___ brings rain and wind.'], ['sport', 's p or t', 'Hockey is my favourite ___.'], ['short', 'sh or t', 'A mouse has ___ legs.'], ['fort', 'f or t', 'We built a snow ___.'],
      ['store', 's t ore', 'Buy bread at the ___.'], ['more', 'm ore', 'Can I have ___ please?']],
    sort: { q: 'Where is the /or/ sound?', bins: [['or', 'or', 'middle'], ['ore', 'ore', 'end']], items: 'corn/0 more/1 fork/0 store/1 horn/0 shore/1 sport/0 core/1' },
    endings: [['store', 'ing'], ['short', 'er'], ['storm', 'y'], ['sport', 's']],
    review: ['car', 'farm'], sounds: ['ar', 'ph'],
    sentence: 'The storm hit the store and the fort.' });

  add({ id: 'er-ir-ur', band: '1', group: RV, name: 'er, ir and ur', focus: ['er', 'ir', 'ur'], key: 'bird',
    rule: 'er, ir and ur all say /er/.',
    tip: 'Three spellings, one sound. Er is the most common, especially at the end of a word (her, sister). Learn the ir and ur words in small groups: bird, girl, first; fur, turn, burn.',
    mistake: 'Mixes up the three (berd, gurl), or writes r alone (brd).',
    heart: ['learn', 'early'],
    words: [['her', 'h er', 'That is ___ coat.'], ['fern', 'f er n', 'A ___ grows in the shade.'], ['bird', 'b ir d', 'A ___ sings in the tree.'], ['girl', 'g ir l', 'The ___ rode her bike.'],
      ['first', 'f ir s t', 'Who came ___ in the race?'], ['shirt', 'sh ir t', 'Put on a clean ___.'], ['dirt', 'd ir t', 'The worm lives in the ___.'], ['fur', 'f ur', 'A bear has thick ___.'],
      ['burn', 'b ur n', 'Do not ___ your hand on the stove.'], ['turn', 't ur n', 'It is your ___.']],
    sort: { q: 'Which spelling says /er/?', bins: [['er', 'er', ''], ['ir', 'ir', ''], ['ur', 'ur', '']], items: 'her/0 bird/1 fur/2 fern/0 girl/1 burn/2 dirt/1 turn/2' },
    endings: [['turn', 'ing'], ['burn', 'ed'], ['dirt', 'y'], ['fur', 'y']],
    review: ['corn', 'store'], sounds: ['or', 'ar'],
    sentence: 'Her bird sat on the fern.' });

  add({ id: 'air-are', band: '1', group: RV, name: 'air, are and ear', focus: ['air', 'are', 'ear'], key: 'chair',
    rule: 'air, are and ear can all say /air/.',
    tip: 'Air is the usual spelling inside a word (chair), are at the end (care). Ear says /air/ in only a few words: bear, pear, wear. Each is one tile in one box.',
    mistake: 'Mixes up the spellings (cair, bare for bear), or leaves off the e of are.',
    heart: ['were'],
    words: [['hair', 'h air', 'Brush your ___.'], ['fair', 'f air', 'We rode on the swings at the ___.'], ['chair', 'ch air', 'Sit on the ___.'], ['pair', 'p air', 'I got a new ___ of boots.'],
      ['care', 'c are', 'Take ___ of your pet.'], ['share', 'sh are', 'Please ___ your toys.'], ['scare', 's c are', 'Did the noise ___ you?'], ['square', 's qu are', 'A ___ has four equal sides.'],
      ['bear', 'b ear', 'A ___ sleeps all winter.'], ['pear', 'p ear', 'A ___ is a green fruit.']],
    sort: { q: 'Which spelling says /air/?', bins: [['air', 'air', ''], ['are', 'are', ''], ['ear-air', 'ear', '']], items: 'hair/0 care/1 bear/2 fair/0 share/1 pear/2 chair/0 stare/1 wear/2' },
    endings: [['care', 'ful'], ['share', 'ing'], ['scare', 'y'], ['stare', 'ed']],
    review: ['bird', 'turn'], sounds: ['er', 'ir'],
    sentence: 'The bear sat on a chair.' });

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

  add({ id: 'ea-bread', band: '1', group: TEAMS, name: 'ea as in bread', focus: ['ea'], key: 'head',
    rule: 'Sometimes ea says /e/, as in bread.',
    tip: 'Ea has a second sound, short e. Group these words and learn them together: head, bread, ready, heavy, weather, feather. If a word with /e/ looks wrong with e, try ea.',
    mistake: 'Writes e for ea (hed, bred).',
    heart: ['heart'],
    words: [['head', 'h ea d', 'Put a hat on your ___.'], ['bread', 'b r ea d', 'Make a sandwich with ___.'], ['ready', 'r ea d y', 'Are you ___ to go?'], ['heavy', 'h ea v y', 'The big rock is too ___ to lift.'],
      ['spread', 's p r ea d', '___ the butter on the toast.'], ['thread', 'th r ea d', 'Sew the button with ___.'], ['breath', 'b r ea th', 'Take a deep ___.'], ['feather', 'f ea th er', 'A bird has a ___ on its wing.'],
      ['weather', 'w ea th er', 'The ___ is cold and snowy.'], ['sweater', 's w ea t er', 'Wear a warm ___.']],
    sort: { q: 'Does ea say /ee/ or /e/?', bins: [['ea', 'ea as in leaf', ''], ['ea-short', 'ea as in head', '']], items: 'seal/0 head/1 team/0 bread/1 leaf/0 ready/1 beach/0 thread/1' },
    review: ['green', 'team'], sounds: ['ee', 'ea'],
    sentence: 'Spread the bread with jam.' });

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

  var MORE = 'More vowel teams';
  var ODD = 'Consonant-le, kind and old, silent letters';
  var AFFIX = 'Prefixes and suffixes';

  add({ id: 'oo-moon', band: '1', group: MORE, name: 'oo as in moon', focus: ['oo'], key: 'moon',
    rule: 'oo says /oo/, as in moon.',
    tip: 'Oo is one tile in one box. In the middle of a short word, /oo/ is usually oo (moon, food); u with a silent e is the other common choice (June, rule).',
    mistake: 'Writes u or ew (mun, mewn).',
    heart: ['soup', 'group'],
    words: [['moon', 'm oo n', 'The ___ is bright tonight.'], ['spoon', 's p oo n', 'Eat soup with a ___.'], ['food', 'f oo d', 'We need ___ to grow.'], ['room', 'r oo m', 'Clean your ___.'],
      ['boot', 'b oo t', 'Put a ___ on each foot.'], ['cool', 'c oo l', 'The lake is ___ in the morning.'], ['pool', 'p oo l', 'We swim in the ___.'], ['zoo', 'z oo', 'We saw a tiger at the ___.'],
      ['tooth', 't oo th', 'My front ___ is loose.'], ['broom', 'b r oo m', 'Sweep the floor with a ___.']],
    sort: { q: 'oo or u_e?', bins: [['oo', 'oo', ''], ['u_e', 'u_e', '']], items: 'moon/0 tube/1 spoon/0 June/1 food/0 rule/1 boot/0 flute/1' },
    endings: [['cool', 'er'], ['zoom', 'ing'], ['boot', 's'], ['spoon', 'ful']],
    review: ['light', 'night'], sounds: ['igh', 'ie'],
    sentence: 'We zoom to the zoo at noon.' });

  add({ id: 'oo-book', band: '1', group: MORE, name: 'oo as in book', focus: ['oo'], key: 'book',
    rule: 'oo can also say /oo/, as in book.',
    tip: 'The same tile, a shorter sound. Most oo words with this sound end in k or d (book, good). If a word sounds odd, try the other oo sound.',
    mistake: 'Writes u (buk, gud).',
    heart: ['blood', 'flood'],
    words: [['book', 'b oo k', 'Read a ___ before bed.'], ['cook', 'c oo k', 'Dad will ___ dinner.'], ['look', 'l oo k', '___ at the big moose!'], ['took', 't oo k', 'She ___ the dog for a walk.'],
      ['hook', 'h oo k', 'Hang your coat on the ___.'], ['good', 'g oo d', 'This soup is very ___.'], ['wood', 'w oo d', 'We burn ___ in the fire.'], ['foot', 'f oo t', 'I hurt my ___.'],
      ['stood', 's t oo d', 'We ___ in a line.'], ['shook', 'sh oo k', 'The dog ___ off the water.']],
    endings: [['cook', 'ing'], ['look', 'ed'], ['hook', 's']],
    review: ['moon', 'spoon'], sounds: ['oo', 'ow'],
    sentence: 'Look at the good book.' });

  add({ id: 'ou-ow', band: '1', group: MORE, name: 'ou and ow as in cloud and cow', focus: ['ou', 'ow'], key: 'cloud',
    rule: 'ou and ow say /ow/. ou sits in the middle; ow is often at the end.',
    tip: 'Ou is in the middle (cloud, mouth), ow is at the end (cow, now) or before n, l or er (town, owl, flower). Ow can also say long o (snow): read both and pick the one that makes sense.',
    mistake: 'Writes ow in the middle (clowd) or ou at the end (cou).',
    heart: ['our', 'hour'],
    words: [['cloud', 'c l ou d', 'A dark ___ brings rain.'], ['loud', 'l ou d', 'The drum is very ___.'], ['out', 'ou t', 'Let us go ___ to play.'], ['shout', 'sh ou t', 'Do not ___ inside.'],
      ['round', 'r ou n d', 'A ball is ___.'], ['ground', 'g r ou n d', 'The apple fell to the ___.'], ['sound', 's ou n d', 'I heard a funny ___.'], ['mouth', 'm ou th', 'Open your ___ wide.'],
      ['south', 's ou th', 'Birds fly ___ in the fall.'], ['count', 'c ou n t', '___ to ten.']],
    sort: { q: 'Where is the /ow/ sound?', bins: [['ou', 'ou', 'middle'], ['ow', 'ow', 'end']], items: 'cloud/0 cow/1 out/0 now/1 shout/0 how/1 round/0 wow/1' },
    endings: [['shout', 'ed'], ['loud', 'er'], ['round', 'est'], ['count', 'ing']],
    review: ['book', 'good'], sounds: ['oo', 'oa'],
    sentence: 'The cow is out on the ground.' });

  add({ id: 'oi-oy', band: '1', group: MORE, name: 'oi and oy', focus: ['oi', 'oy'], key: 'coin',
    rule: 'oi sits in the middle of a word. oy sits at the end.',
    tip: 'Like ai and ay: oi in the middle (coin, soil), oy at the end (boy, toy). English words do not end in i, so the end needs oy.',
    mistake: 'Writes oy in the middle (coyn) or oi at the end (boi).',
    heart: ['laugh'],
    words: [['coin', 'c oi n', 'I found a ___ on the ground.'], ['boy', 'b oy', 'The ___ rode his bike.'], ['toy', 't oy', 'The baby has a new ___.'], ['join', 'j oi n', 'Come ___ our game.'],
      ['soil', 's oi l', 'Plant the seed in the ___.'], ['oil', 'oi l', 'Cook the egg in a bit of ___.'], ['point', 'p oi n t', '___ to the one you want.'], ['boil', 'b oi l', '___ the water for tea.'],
      ['joy', 'j oy', 'The puppy fills us with ___.'], ['enjoy', 'e n j oy', 'I ___ reading books.']],
    sort: { q: 'Where is the /oy/ sound?', bins: [['oi', 'oi', 'middle'], ['oy', 'oy', 'end']], items: 'coin/0 boy/1 soil/0 toy/1 join/0 joy/1 boil/0 enjoy/1' },
    endings: [['boil', 'ing'], ['point', 'ed'], ['toy', 's'], ['enjoy', 'ed']],
    review: ['cloud', 'shout'], sounds: ['ou', 'ow'],
    sentence: 'The boy had a coin and a toy.' });

  add({ id: 'au-aw', band: '1', group: MORE, name: 'au, aw and augh', focus: ['au', 'aw', 'augh'], key: 'saw',
    rule: 'au, aw and augh say /aw/.',
    tip: 'Aw is at the end (saw, paw) or before n, l or k (yawn, crawl, hawk). Au is at the start or in the middle (haul, launch). Augh is in a few words: caught, taught, daughter.',
    mistake: 'Writes aw in the middle (hawl for haul), or leaves out the gh (caut).',
    heart: ['chalk'],
    words: [['saw', 's aw', 'I ___ a moose in the woods.'], ['paw', 'p aw', 'The dog hurt its ___.'], ['claw', 'c l aw', 'A cat has a sharp ___.'], ['draw', 'd r aw', '___ a picture of your home.'],
      ['straw', 's t r aw', 'Drink the milk with a ___.'], ['yawn', 'y aw n', 'I ___ when I am sleepy.'], ['hawk', 'h aw k', 'A ___ flies high in the sky.'], ['haul', 'h au l', 'The truck can ___ the logs.'],
      ['launch', 'l au n ch', 'Count down to the rocket ___.'], ['caught', 'c augh t', 'She ___ the ball.']],
    sort: { q: 'Which spelling says /aw/?', bins: [['au', 'au', ''], ['aw', 'aw', ''], ['augh', 'augh', '']], items: 'haul/0 saw/1 caught/2 launch/0 paw/1 taught/2 sauce/0 draw/1' },
    endings: [['draw', 'ing'], ['crawl', 'ed'], ['haul', 'ing'], ['yawn', 's']],
    review: ['coin', 'boy'], sounds: ['oi', 'oy'],
    sentence: 'I saw a hawk at dawn.' });

  add({ id: 'ew-ue', band: '1', group: MORE, name: 'ew, ue and ui', focus: ['ew', 'ue', 'ui'], key: 'blue',
    rule: 'ew, ue and ui say /oo/.',
    tip: 'Ew and ue come at the end of a word (new, blue). Ui is in the middle of a few words (fruit, suit). Each is one tile in one box.',
    mistake: 'Writes oo for these (noo, bloo).',
    heart: ['whose', 'lose'],
    words: [['new', 'n ew', 'I got ___ boots.'], ['few', 'f ew', 'Only a ___ kids came.'], ['grew', 'g r ew', 'The plant ___ tall.'], ['chew', 'ch ew', '___ your food well.'],
      ['flew', 'f l ew', 'The bird ___ away.'], ['drew', 'd r ew', 'He ___ a picture of a cat.'], ['blue', 'b l ue', 'The sky is ___.'], ['glue', 'g l ue', 'Stick it down with ___.'],
      ['fruit', 'f r ui t', 'An apple is a ___.'], ['suit', 's ui t', 'He wore a ___ to the wedding.']],
    sort: { q: 'Which spelling says /oo/?', bins: [['ew', 'ew', ''], ['ue', 'ue', ''], ['ui', 'ui', '']], items: 'new/0 blue/1 fruit/2 chew/0 glue/1 suit/2 grew/0 true/1' },
    endings: [['chew', 'ing'], ['few', 'er'], ['fruit', 'y'], ['new', 'est']],
    review: ['saw', 'draw'], sounds: ['aw', 'au'],
    sentence: 'The new glue is blue.' });

  add({ id: 'cle', band: '1', group: ODD, beats: true, name: 'Consonant-le', focus: ['-ble', '-tle', '-dle'], key: 'table',
    rule: 'A word that ends in -le: the last beat is a consonant and le.',
    tip: 'Count back three letters from the end: that is the last beat (ta-ble, ap-ple). The e is silent. If the first beat ends in a consonant, the vowel is short (lit-tle); if it ends in the vowel, it is long (ta-ble).',
    mistake: 'Writes el for le (tabel), or leaves out the doubled letter (litle).',
    heart: ['double', 'trouble'],
    words: [['table', 'ta ble', 'Set the ___ for dinner.'], ['apple', 'ap ple', 'An ___ a day is good for you.'], ['little', 'lit tle', 'A mouse is ___.'], ['puddle', 'pud dle', 'Jump in the ___.'],
      ['candle', 'can dle', 'Light the ___ on the cake.'], ['bubble', 'bub ble', 'Blow a big ___.'], ['turtle', 'tur tle', 'A ___ has a hard shell.'], ['purple', 'pur ple', 'Grapes can be ___.'],
      ['simple', 'sim ple', 'This puzzle is ___.'], ['giggle', 'gig gle', 'The joke made us ___.']],
    review: ['new', 'blue'], sounds: ['ew', 'ue'],
    sentence: 'The little turtle is in a puddle.' });

  add({ id: 'kind-old', band: '1', group: ODD, name: 'Kind and old words', focus: ['ind', 'ild', 'old', 'olt', 'ost'], key: 'kind',
    rule: 'Before nd, ld, lt and st, i and o often say their names.',
    tip: 'These look like short vowel words, but the vowel says its name: kind, wild, cold. Teach each as a glued tile: ind, ild, old.',
    mistake: 'Adds an e (kinde, colde), or reads them with a short vowel.',
    heart: ['ghost'],
    words: [['kind', 'k ind', 'Be ___ to your friends.'], ['find', 'f ind', 'I cannot ___ my hat.'], ['mind', 'm ind', 'Do you ___ if I sit here?'], ['wild', 'w ild', 'A bear is a ___ animal.'],
      ['child', 'ch ild', 'A ___ is a young person.'], ['cold', 'c old', 'The snow is ___.'], ['gold', 'g old', 'The medal is made of ___.'], ['told', 't old', 'Mom ___ me a story.'],
      ['hold', 'h old', '___ my hand.'], ['colt', 'c olt', 'A ___ is a young horse.']],
    sort: { q: 'Which glued sound?', bins: [['ind', 'ind', ''], ['ild', 'ild', ''], ['old', 'old', '']], items: 'kind/0 wild/1 cold/2 find/0 child/1 gold/2 mind/0 mild/1 told/2' },
    endings: [['find', 'ing'], ['cold', 'er'], ['hold', 'ing'], ['wild', 'ly']],
    review: ['table', 'little'], sounds: ['ow', 'oa'],
    sentence: 'The child told me to hold the gold.' });

  add({ id: 'silent', band: '1', group: ODD, name: 'Silent letters: kn, wr, mb', focus: ['kn', 'wr', 'mb'], key: 'knee',
    rule: 'In kn, wr and mb, one letter is silent.',
    tip: 'Kn and wr come at the start (knee, write); mb comes at the end (lamb). The two letters make one sound, so they share one box. Say the word the funny way to remember it: k-nee.',
    mistake: 'Leaves out the silent letter (nee, rite, lam).',
    heart: ['answer'],
    words: [['knot', 'kn o t', 'Tie a ___ in the rope.'], ['knee', 'kn ee', 'I fell and hurt my ___.'], ['knock', 'kn o ck', '___ on the door.'], ['knife', 'kn i_e f', 'Cut the bread with a ___.'],
      ['know', 'kn ow', 'Do you ___ the way home?'], ['wrap', 'wr a p', '___ the gift in paper.'], ['write', 'wr i_e t', '___ your name on the line.'], ['wrist', 'wr i s t', 'A watch goes on your ___.'],
      ['lamb', 'l a mb', 'A ___ is a baby sheep.'], ['thumb', 'th u mb', 'Give me a ___ up!']],
    sort: { q: 'Which pair has a silent letter?', bins: [['kn', 'kn', 'start'], ['wr', 'wr', 'start'], ['mb', 'mb', 'end']], items: 'knot/0 wrap/1 lamb/2 knee/0 write/1 thumb/2 knock/0 wrist/1 climb/2' },
    endings: [['knit', 'ing'], ['knock', 'ed'], ['write', 'ing'], ['climb', 'er']],
    review: ['kind', 'cold'], sounds: ['ind', 'old'],
    sentence: 'I know the lamb hurt its knee.' });

  add({ id: 'prefix', band: '1', group: AFFIX, name: 'Prefixes un-, re- and dis-', focus: ['un-', 're-', 'dis-'], key: 'unlock',
    rule: 'A prefix goes on the front and changes the meaning.',
    tip: 'Un- and dis- mean not or the opposite (unlock, dislike); re- means again (refill). Spell the prefix, then the base word: nothing changes where they join, so unzip has one n and misspell has two s.',
    mistake: 'Drops or doubles a letter where the parts join (unnzip), or spells the base word wrong.',
    heart: ['another', 'nothing'],
    words: [['unpack', 'un p a ck', '___ your bag when you get home.'], ['unlock', 'un l o ck', 'Use the key to ___ the door.'], ['unzip', 'un z i p', '___ your coat.'], ['unkind', 'un k ind', 'It is ___ to tease.'],
      ['unwrap', 'un wr a p', '___ the gift.'], ['repack', 're p a ck', '___ the box so it shuts.'], ['refill', 're f i ll', '___ my cup, please.'], ['retell', 're t e ll', '___ the story in your own words.'],
      ['dislike', 'dis l i_e k', 'I ___ cold soup.'], ['distrust', 'dis t r u s t', 'I ___ that old ladder.']],
    sort: { q: 'Which prefix?', bins: [['un-', 'un-', ''], ['re-', 're-', ''], ['dis-', 'dis-', '']], items: 'unpack/0 refill/1 dislike/2 unzip/0 retell/1 distrust/2 unlock/0 repack/1' },
    endings: [['lock', 'un-'], ['fill', 're-'], ['like', 'dis-'], ['tell', 're-'], ['kind', 'un-']],
    review: ['knot', 'wrap'], sounds: ['kn', 'wr'],
    sentence: 'Unpack the box and refill the cup.' });

  add({ id: 'suffix-more', band: '1', group: AFFIX, name: 'Suffixes -ful, -less, -ly, -er, -est', focus: ['-ful', '-less', '-ly'], key: 'helpful',
    rule: 'A suffix goes on the end and changes the meaning.',
    tip: '-ful means full of, -less means without, -ly tells how. -ful has one l. A suffix that starts with a consonant does not change the base word (hope, hopeful), unless it ends in a consonant and y (happy, happily).',
    mistake: 'Writes -full with two l, or drops the e before -ful (hopful).',
    heart: ['women', 'country'],
    words: [['helpful', 'h e l p ful', 'Thank you for being so ___.'], ['thankful', 'th ank ful', 'I am ___ for my family.'], ['useful', 'u_e s ful', 'A map is ___ on a trip.'], ['spotless', 's p o t less', 'The kitchen is ___.'],
      ['endless', 'e n d less', 'The road seemed ___.'], ['slowly', 's l ow ly', 'The snail moves ___.'], ['softly', 's o f t ly', 'Speak ___ in the library.'], ['sadly', 's a d ly', 'The puppy looked at me ___.'],
      ['taller', 't all er', 'I am ___ than my sister.'], ['tallest', 't all est', 'He is the ___ in the class.']],
    sort: { q: 'Which suffix?', bins: [['-ful', '-ful', ''], ['-less', '-less', ''], ['-ly', '-ly', '']], items: 'helpful/0 spotless/1 slowly/2 thankful/0 endless/1 sadly/2 useful/0 softly/2' },
    endings: [['help', 'ful'], ['hope', 'less'], ['sad', 'ly'], ['tall', 'est'], ['spot', 'less']],
    review: ['unlock', 'refill'], sounds: ['un', 're'],
    sentence: 'Sadly, the endless rain fell softly.' });

  add({ id: 'y-to-i', band: '1', group: AFFIX, name: 'Change y to i', focus: ['y → i'], key: 'cried',
    rule: 'After a consonant, y changes to i before an ending.',
    tip: 'Look at the letter before the y. A consonant: change y to i, then add the ending (cry, cried; baby, babies). A vowel: keep the y (play, played). Before -ing, always keep the y (crying), so English does not get two i in a row.',
    mistake: 'Keeps the y (cryed, babys), or changes it before -ing (criing).',
    heart: ['said'],
    words: [['cries', 'c r i es', 'The baby ___ when she is hungry.'], ['cried', 'c r i ed', 'He ___ when he fell.'], ['tried', 't r i ed', 'I ___ my best.'], ['babies', 'b a b i es', 'The ___ are asleep.'],
      ['puppies', 'p u pp i es', 'The ___ play in the grass.'], ['ponies', 'p o n i es', 'We rode the ___ at the farm.'], ['dried', 'd r i ed', 'I ___ the dishes.'], ['carried', 'c a rr i ed', 'She ___ the bag home.'],
      ['happier', 'h a pp i er', 'The sun makes me ___.'], ['flies', 'f l i es', 'The bird ___ to its nest.']],
    endings: [['cry', 'ed'], ['baby', 'es'], ['carry', 'ed'], ['happy', 'er'], ['pony', 'es'], ['dry', 'ing']],
    review: ['helpful', 'slowly'], sounds: ['ed', 'es'],
    sentence: 'The puppies cried and the babies slept.' });

  var RARE = 'Less common spellings';
  var PARTS2 = 'Word parts';
  var LONGW = 'Longer words';
  var PARTS3 = 'Prefixes and suffixes';

  add({ id: 'er-spellings', band: '2', group: RARE, name: 'ar, or and our saying /er/', focus: ['ar', 'or', 'our'], key: 'doctor',
    rule: 'At the end of a longer word, /er/ can be ar, or or our.',
    tip: 'Er is still the most common. Or is for people who do a job (doctor, sailor, actor). Ar is in a few words (dollar, polar). Our is the Canadian spelling in colour, harbour, favour and neighbour.',
    mistake: 'Writes er for every one (docter, doller), or leaves the u out of colour.',
    heart: ['people'],
    words: [['dollar', 'd o ll ar', 'A loonie is one ___.'], ['collar', 'c o ll ar', 'The dog wears a ___.'], ['polar', 'p o l ar', 'A ___ bear lives in the Arctic.'], ['solar', 's o l ar', 'A ___ panel uses the sun.'],
      ['doctor', 'd o c t or', 'The ___ checks your heart.'], ['actor', 'a c t or', 'The ___ was in a play.'], ['sailor', 's ai l or', 'A ___ works on a ship.'], ['tractor', 't r a c t or', 'The farmer drives a ___.'],
      ['colour', 'c o l our', 'Red is my favourite ___.'], ['harbour', 'h ar b our', 'The boats are in the ___.']],
    sort: { q: 'Which spelling says /er/?', bins: [['ar-er', 'ar', ''], ['or-er', 'or', ''], ['our-er', 'our', '']], items: 'dollar/0 doctor/1 colour/2 polar/0 actor/1 harbour/2 solar/0 sailor/1 favour/2' },
    review: ['cried', 'happier'], sounds: ['er', 'ur'],
    sentence: 'The sailor lost a dollar in the harbour.' });

  add({ id: 'ei-eigh', band: '2', group: RARE, name: 'ei, eigh and ey saying long a', focus: ['eigh', 'ei', 'ey'], key: 'eight',
    rule: 'eigh, ei and ey can say /ay/.',
    tip: 'Eigh is four letters for one sound (eight, weigh): the g and h are silent. Ei is in a few words (vein, rein, reindeer); ey says /ay/ in grey, they and obey.',
    mistake: 'Writes ay or a for these (ate for eight, wayt for weight).',
    heart: ['their'],
    words: [['eight', 'eigh t', 'Four and four make ___.'], ['weigh', 'w eigh', '___ the apples on the scale.'], ['sleigh', 's l eigh', 'Horses pull the ___ in the snow.'], ['neigh', 'n eigh', 'Horses ___.'],
      ['weight', 'w eigh t', 'What is the ___ of the box?'], ['freight', 'f r eigh t', 'A ___ train carries goods.'], ['vein', 'v ei n', 'Blood flows in a ___.'], ['reindeer', 'r ei n d ee r', 'A ___ has big antlers.'],
      ['veil', 'v ei l', 'The bride wore a ___.'], ['grey', 'g r ey', 'Clouds can be ___.']],
    sort: { q: 'Which spelling says /ay/?', bins: [['eigh', 'eigh', ''], ['ei', 'ei', ''], ['ey-a', 'ey', '']], items: 'eight/0 vein/1 grey/2 weigh/0 veil/1 prey/2 sleigh/0 rein/1 obey/2' },
    review: ['doctor', 'dollar'], sounds: ['ai', 'ay'],
    sentence: 'Eight reindeer pull the sleigh.' });

  add({ id: 'ou-ough', band: '2', group: RARE, name: 'ou as in soup, ough as in bought', focus: ['ou', 'ough'], key: 'soup',
    rule: 'ou can say /oo/, and ough can say /aw/.',
    tip: 'Ou says /oo/ in a few words (soup, group, youth). Ough before t says /aw/ (bought, thought, fought). Learn them as small word families.',
    mistake: 'Writes oo (soop), or leaves out letters of ough (bot, thot).',
    heart: ['though'],
    words: [['soup', 's ou p', 'Hot ___ is good on a cold day.'], ['group', 'g r ou p', 'Work in a small ___.'], ['youth', 'y ou th', 'A ___ is a young person.'], ['coupon', 'c ou p o n', 'Use a ___ to save money.'],
      ['caribou', 'c ar i b ou', 'A ___ lives in the North.'], ['toucan', 't ou c a n', 'A ___ has a big, bright beak.'], ['bought', 'b ough t', 'Mom ___ some milk.'], ['thought', 'th ough t', 'I ___ about my friend.'],
      ['brought', 'b r ough t', 'She ___ a cake to the party.'], ['fought', 'f ough t', 'The two cats ___.']],
    sort: { q: 'Which sound?', bins: [['ou-soup', 'ou says /oo/', ''], ['ough', 'ough says /aw/', '']], items: 'soup/0 bought/1 group/0 thought/1 youth/0 brought/1 coupon/0 fought/1' },
    review: ['eight', 'sleigh'], sounds: ['eigh', 'ou'],
    sentence: 'The group brought soup.' });

  add({ id: 'ch-gh', band: '2', group: RARE, name: 'ch as in chef and school, gh as in ghost', focus: ['ch', 'gh'], key: 'school',
    rule: 'ch can say /sh/ or /k/, and gh can say /g/.',
    tip: 'Ch says /sh/ in words from French (chef, machine) and /k/ in words from Greek (school, echo, stomach). Gh at the start says /g/ (ghost). The word\'s family is the clue.',
    mistake: 'Writes sh or k (shef, skool), or leaves out the h (gost).',
    heart: ['island'],
    words: [['chef', 'ch e f', 'The ___ cooks in a restaurant.'], ['school', 's ch oo l', 'We learn at ___.'], ['chorus', 'ch o r u s', 'Sing the ___ of the song.'], ['echo', 'e ch o', 'Shout in the cave and hear the ___.'],
      ['stomach', 's t o m a ch', 'My ___ is full.'], ['anchor', 'a n ch or', 'Drop the ___ to stop the boat.'], ['mechanic', 'm e ch a n i c', 'A ___ fixes cars.'], ['chemist', 'ch e m i s t', 'A ___ mixes things in a lab.'],
      ['ghost', 'gh o s t', 'A ___ in the story said boo.']],
    sort: { q: 'What does ch say?', bins: [['ch-sh', 'ch says /sh/', ''], ['ch-k', 'ch says /k/', ''], ['ch', 'ch says /ch/', '']], items: 'chef/0 school/1 chin/2 parachute/0 echo/1 chop/2 machine/0 anchor/1 lunch/2' },
    review: ['soup', 'group'], sounds: ['ou', 'oo'],
    sentence: 'The chef at the school had a stomach ache.' });

  add({ id: 'tion', band: '2', group: PARTS2, beats: true, name: '-tion and -sion', focus: ['tion', 'sion'], key: 'station',
    rule: '/shun/ at the end is spelled tion or sion.',
    tip: 'Tion is far more common (station, action). Sion often follows s or l (mission, session). Spell the beat before it, then tion: va-ca-tion.',
    mistake: 'Writes shun or shon (stashun).',
    heart: ['ocean'],
    words: [['station', 'sta tion', 'The train is at the ___.'], ['nation', 'na tion', 'Canada is a ___.'], ['lotion', 'lo tion', 'Put ___ on dry skin.'], ['motion', 'mo tion', 'The rocking ___ made me sleepy.'],
      ['action', 'ac tion', 'The movie had lots of ___.'], ['fiction', 'fic tion', 'A made-up story is ___.'], ['vacation', 'va ca tion', 'We went on ___ to the coast.'], ['section', 'sec tion', 'Read the next ___ of the book.'],
      ['mission', 'mis sion', 'The rocket\'s ___ was to reach the moon.'], ['session', 'ses sion', 'The swim ___ starts at noon.']],
    endings: [['act', 'ion'], ['direct', 'ion'], ['collect', 'ion']],
    review: ['school', 'echo'], sounds: ['sh', 'ch'],
    sentence: 'The train left the station.' });

  add({ id: 'affix-more', band: '2', group: PARTS2, name: 'More prefixes and suffixes', focus: ['mis-', 'pre-', '-ness', '-ish', '-able'], key: 'kindness',
    rule: 'A prefix or a suffix builds a new word. Check the spelling where the parts join.',
    tip: 'Mis- and pre- go on the front with no change (misspell keeps both s). -ness and -ish: change y to i (happiness). -able: drop a silent e (usable). Build the word, then check the join.',
    mistake: 'Drops a letter where parts join (mispell), or keeps the y (happyness).',
    heart: ['busy'],
    words: [['misplace', 'mis p l a_e c', 'Do not ___ your keys.'], ['mislead', 'mis l ea d', 'A wrong sign can ___ you.'], ['misspell', 'mis s p e ll', 'It is easy to ___ a long word.'], ['preheat', 'pre h ea t', '___ the oven before you bake.'],
      ['pretest', 'pre t e s t', 'We took a ___ before the unit.'], ['kindness', 'k ind ness', 'Show ___ to others.'], ['sadness', 's a d ness', 'Tears can show ___.'], ['darkness', 'd ar k ness', 'Owls hunt in the ___.'],
      ['childish', 'ch ild ish', 'Do not be ___.'], ['readable', 'r ea d able', 'Write so your work is ___.']],
    endings: [['spell', 'mis-'], ['heat', 'pre-'], ['kind', 'ness'], ['child', 'ish'], ['read', 'able'], ['happy', 'ness']],
    review: ['station', 'action'], sounds: ['tion', 'sion'],
    sentence: 'Do not misspell this word.' });

  add({ id: 'schwa', band: '3', group: LONGW, beats: true, name: 'The schwa', focus: ['a·bout'], key: 'about',
    rule: 'In a beat that is not stressed, a vowel can say a lazy /uh/.',
    tip: 'Say about: the a is quiet, just uh. That lazy sound is the schwa, and any vowel can make it. Say the word in a robot voice, every vowel clear (a-bout, ba-na-na), to hear which letter to write.',
    mistake: 'Writes u for the schwa (ubout, bunana), or leaves it out (bout).',
    heart: ['again'],
    words: [['about', 'a bout', 'Tell me ___ your day.'], ['ago', 'a go', 'Long ___, there were dinosaurs.'], ['alone', 'a lone', 'The cat sat ___ on the step.'], ['along', 'a long', 'Walk ___ the path.'],
      ['around', 'a round', 'Run ___ the track.'], ['away', 'a way', 'The bird flew ___.'], ['awake', 'a wake', 'I am wide ___.'], ['asleep', 'a sleep', 'The baby is ___.'],
      ['ahead', 'a head', 'Go ___, I will wait.'], ['banana', 'ba na na', 'A ___ is yellow.']],
    review: ['kindness', 'sadness'], sounds: ['a', 'u'],
    sentence: 'A zebra was asleep in the sun.' });

  add({ id: 'long-words', band: '3', group: LONGW, beats: true, name: 'Long words: three beats and more', focus: ['syl·la·ble'], key: 'fantastic',
    rule: 'Spell a long word one beat at a time.',
    tip: 'Clap the beats, then spell each beat on its own: fan-tas-tic. Every beat has a vowel. Check each beat, then read the whole word.',
    mistake: 'Leaves out a whole beat (rember for remember) or a vowel in the middle.',
    heart: ['Wednesday'],
    words: [['fantastic', 'fan tas tic', 'The show was ___.'], ['dinosaur', 'di no saur', 'A ___ lived long ago.'], ['important', 'im por tant', 'Sleep is ___ for your body.'], ['remember', 're mem ber', 'Do you ___ my name?'],
      ['skeleton', 'skel e ton', 'Your ___ holds up your body.'], ['gigantic', 'gi gan tic', 'A whale is ___.'], ['animal', 'an i mal', 'A moose is a big ___.'], ['hospital', 'hos pi tal', 'Nurses work in a ___.'],
      ['volcano', 'vol ca no', 'Lava comes out of a ___.'], ['September', 'sep tem ber', 'School starts in ___.']],
    review: ['about', 'around'], sounds: ['tion', 'ar'],
    sentence: 'Remember the dinosaur skeleton.' });

  add({ id: 'prefix-g3', band: '3', group: PARTS3, beats: true, name: 'Prefixes over-, under-, sub-, mid- and more', focus: ['over-', 'under-', 'sub-', 'mid-'], key: 'midnight',
    rule: 'A prefix is its own beat or beats. Spell it, then the base word.',
    tip: 'Over- means above or too much, under- below, sub- under, mid- the middle, non- not. Each prefix keeps its spelling, and so does the base word.',
    mistake: 'Leaves out a letter where the parts meet (midight, overoad).',
    heart: ['ocean'],
    words: [['overflow', 'o ver flow', 'Do not let the bath ___.'], ['overcoat', 'o ver coat', 'Wear an ___ in the cold.'], ['overnight', 'o ver night', 'We stayed ___ at Grandma\'s.'], ['underground', 'un der ground', 'Moles live ___.'],
      ['underline', 'un der line', '___ the title.'], ['subway', 'sub way', 'We rode the ___ in Montreal.'], ['submarine', 'sub ma rine', 'A ___ goes under the sea.'], ['midnight', 'mid night', 'At ___ it is very dark.'],
      ['midday', 'mid day', 'We eat lunch at ___.'], ['nonstop', 'non stop', 'The flight was ___.']],
    sort: { q: 'Which prefix?', bins: [['over-', 'over-', ''], ['under-', 'under-', ''], ['sub-', 'sub-', ''], ['mid-', 'mid-', '']], items: 'overflow/0 underline/1 subway/2 midday/3 overnight/0 underground/1 submarine/2 midnight/3' },
    endings: [['flow', 'over-'], ['line', 'under-'], ['way', 'sub-'], ['night', 'mid-'], ['stop', 'non-']],
    review: ['animal', 'remember'], sounds: ['igh', 'ow'],
    sentence: 'The subway runs at midnight.' });

  add({ id: 'suffix-g3', band: '3', group: PARTS3, beats: true, name: 'Suffixes -ic, -al, -ous and -ive', focus: ['-ic', '-al', '-ous', '-ive'], key: 'magnetic',
    rule: 'A suffix is the last beat. It can change the word\'s job.',
    tip: '-ic, -al and -ous make describing words (magnetic, musical, famous). -ive means able to (active). A silent e drops before them (fame, famous). -ous sounds like us but has an o.',
    mistake: 'Writes -us for -ous (famus), or -ick for -ic.',
    heart: ['science'],
    words: [['magnetic', 'mag net ic', 'A fridge door is ___.'], ['metallic', 'me tal lic', 'The robot is shiny and ___.'], ['artistic', 'ar tis tic', 'She loves to paint; she is very ___.'], ['athletic', 'ath let ic', 'An ___ kid runs fast.'],
      ['magical', 'mag i cal', 'The forest looked ___.'], ['musical', 'mu si cal', 'He plays a ___ instrument.'], ['national', 'na tion al', 'Banff is a ___ park.'], ['coastal', 'coast al', 'Halifax is a ___ city.'],
      ['famous', 'fa mous', 'The singer is ___.'], ['nervous', 'ner vous', 'I was ___ before the test.']],
    sort: { q: 'Which suffix?', bins: [['-ic', '-ic', ''], ['-al', '-al', ''], ['-ous', '-ous', '']], items: 'magnetic/0 magical/1 famous/2 artistic/0 musical/1 nervous/2 athletic/0 coastal/1 joyous/2' },
    endings: [['magnet', 'ic'], ['magic', 'al'], ['fame', 'ous'], ['nation', 'al'], ['act', 'ive']],
    review: ['subway', 'midnight'], sounds: ['tion', 'sion'],
    sentence: 'The famous artist is nervous.' });
})();
