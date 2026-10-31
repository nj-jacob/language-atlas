/* Grade 1: word parts and meanings.
   Ontario 2023 Language, Grade 1:
   B2.6 use developing knowledge of the meanings of words and common morphemes (bases, prefixes, and suffixes) to read and spell
        words (here: -s and -es for more than one, -ing and -ed, and compound words).
   B2.7 demonstrate an understanding of commonly used words, acquire and use explicitly taught vocabulary in various contexts,
        including other subject areas (here: words that mean the same or the opposite, word groups, words from math and science,
        and working out a new word from the sentence).
   All words and sentences are written for this site. Answer checks: tests/verify/grade1-word-parts.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var NOUNS = ['cat', 'dog', 'hat', 'cup', 'bed', 'pig', 'map', 'tent', 'drum', 'frog', 'box', 'fox', 'bus', 'dish', 'brush', 'lunch', 'glass', 'bench', 'dress', 'kiss'];
  var esWord = function (w) { return /(s|x|z|sh|ch)$/.test(w); };
  var plural = function (w) { return w + (esWord(w) ? 'es' : 's'); };
  var VERBS = ['jump', 'play', 'help', 'walk', 'kick', 'look', 'pick', 'rest', 'paint', 'call', 'melt', 'pull', 'push', 'fish', 'spell', 'mix'];
  /* when it happens, and the ending that fits */
  var WHEN = [['Right now, I am', 'ing'], ['Yesterday, I', 'ed'], ['Last night, we', 'ed'], ['Look! The kids are', 'ing'], ['Every day, she', 's']];
  var COMPOUND = [['sun', 'set'], ['rain', 'bow'], ['snow', 'man'], ['pop', 'corn'], ['cup', 'cake'], ['back', 'pack'], ['foot', 'ball'], ['bed', 'room'], ['star', 'fish'], ['tooth', 'brush'], ['play', 'ground'], ['pan', 'cake']];
  var NOT_COMPOUND = ['rabbit', 'pencil', 'jacket', 'lemon', 'tiger', 'button', 'wagon', 'carrot'];

  var SAME = [['big', 'large'], ['small', 'little'], ['happy', 'glad'], ['fast', 'quick'], ['start', 'begin'], ['shout', 'yell'], ['shut', 'close'], ['sick', 'ill'], ['jump', 'leap'], ['look', 'see']];
  var OPP = [['hot', 'cold'], ['up', 'down'], ['wet', 'dry'], ['full', 'empty'], ['day', 'night'], ['fast', 'slow'], ['happy', 'sad'], ['in', 'out'], ['loud', 'quiet'], ['open', 'shut']];
  var GROUPS = { colours: ['red', 'blue', 'green', 'yellow', 'purple', 'pink'], animals: ['moose', 'beaver', 'goose', 'otter', 'bear', 'fox'], fruits: ['apple', 'pear', 'plum', 'grape', 'peach', 'cherry'],
    weather: ['rain', 'snow', 'wind', 'sleet', 'fog', 'hail'], shapes: ['circle', 'square', 'triangle', 'oval', 'rectangle', 'star'] };
  /* words from other subjects: [word, meaning, subject] */
  var SUBJECT = [['add', 'put numbers together', 'Math'], ['equal', 'the same amount', 'Math'], ['more', 'a bigger amount', 'Math'], ['seed', 'a plant grows from it', 'Science'],
    ['root', 'the part of a plant under the soil', 'Science'], ['melt', 'turn from solid to liquid, like ice in the sun', 'Science'], ['map', 'a drawing of a place from above', 'Social Studies'],
    ['community', 'people who live, work and play in one place', 'Social Studies']];
  /* a new word, a sentence that explains it, its meaning, and wrong meanings */
  var CONTEXT = [['steaming', 'The soup was steaming, so I waited for it to cool.', 'very hot', ['very cold', 'very sweet']], ['soaked', 'I fell in the puddle and my socks were soaked.', 'very wet', ['very clean', 'very small']],
    ['enormous', 'The whale was enormous, as long as a bus.', 'very big', ['very fast', 'very quiet']], ['tiny', 'The ant was so tiny that I could hardly see it.', 'very small', ['very loud', 'very red']],
    ['exhausted', 'After the long hike, Omar was exhausted and fell asleep.', 'very tired', ['very hungry', 'very happy']], ['delighted', 'Mei was delighted with her new puppy and smiled all day.', 'very happy', ['very angry', 'very sleepy']],
    ['chilly', 'It was chilly, so we put on our coats and mittens.', 'cold', ['dark', 'sunny']], ['whisper', 'We whisper in the library so we do not bother anyone.', 'talk very quietly', ['shout loudly', 'sing a song']]];

  /* ---------- question makers: word parts ---------- */
  function pluralQ(lv) {
    var w = R.pick(lv > 1 ? NOUNS : NOUNS.filter(function (x) { return !esWord(x) || x.length < 4; })), right = plural(w), wrong = esWord(w) ? w + 's' : w + 'es';
    return Q.one('One <b>' + w + '</b>. Two ___?', right, [wrong].concat(lv > 1 ? [w] : []), { prompt: 'Does the word end in s, x, sh or ch?',
      hint: 'Add -es after s, x, sh or ch. Add -s to most words.', explain: W.sum([[w, 'base'], [esWord(w) ? 'es' : 's', 'suffix']]), meta: { k: 'g1-plural', w: w } });
  }
  function ingEd(lv) {
    var v = R.pick(VERBS), t = R.pick(lv > 1 ? WHEN : WHEN.slice(0, 2)), suf = t[1] === 's' ? (esWord(v) ? 'es' : 's') : t[1];
    var opts = ['ing', 'ed', 's'].map(function (s) { return v + (s === 's' && esWord(v) ? 'es' : s); });
    return Q.one('Which word fits?', v + suf, opts.filter(function (o) { return o !== v + suf; }).slice(0, lv > 1 ? 2 : 1), { fig: W.sent(t[0] + ' ' + W.gap() + '.'),
      prompt: 'When does it happen: now, or before now?', hint: '-ing: it is happening now. -ed: it happened before now.',
      explain: W.sum([[v, 'base'], [suf, 'suffix']]), meta: { k: 'g1-ing-ed', when: t[0], v: v } });
  }
  function buildWord(lv) {
    var useVerb = R.int(0, 1) === 1, base = useVerb ? R.pick(VERBS) : R.pick(NOUNS), suf = useVerb ? R.pick(['ing', 'ed']) : (esWord(base) ? 'es' : 's');
    var others = ['ing', 'ed', 's', 'es'].filter(function (s) { return s !== suf; }).slice(0, lv > 1 ? 2 : 1);
    return { q: 'Build the word <b>' + base + suf + '</b>.', type: 'build', parts: [W.tile(base, 'base'), W.tile(suf, 'suffix')].concat(others.map(function (s) { return W.tile(s, 'suffix'); })), answer: [0, 1],
      hint: 'Find the base word first. Then the ending.', explain: W.sum([[base, 'base'], [suf, 'suffix']]), meta: { k: 'g1-build-word', word: base + suf } };
  }
  function compound(lv) {
    var c = R.pick(COMPOUND), other = R.pick(COMPOUND.filter(function (x) { return x !== c; }));
    return Q.one('Join the two words. What new word do you get?', c[0] + c[1], [c[0] + other[1], other[0] + c[1]].slice(0, lv > 1 ? 2 : 1), { fig: W.tile(c[0], 'base') + ' + ' + W.tile(c[1], 'base'),
      hint: 'Put the second word right after the first.', explain: W.sum([[c[0], 'base'], [c[1], 'base']]), meta: { k: 'g1-compound', a: c[0], b: c[1] } });
  }
  function splitCompound(lv) {
    var c = R.pick(COMPOUND), w = c[0] + c[1], bad = [w.slice(0, c[0].length - 1) + ' + ' + w.slice(c[0].length - 1), w.slice(0, c[0].length + 1) + ' + ' + w.slice(c[0].length + 1)];
    return Q.tiles('Which two words make <b>' + w + '</b>?', c[0] + ' + ' + c[1], bad.slice(0, lv > 1 ? 2 : 1), { hint: 'Find a whole word at the start.', explain: W.sum([[c[0], 'base'], [c[1], 'base']]), meta: { k: 'g1-split-compound', w: w } });
  }
  function pickCompound() {
    var right = R.some(COMPOUND, 2).map(function (c) { return c[0] + c[1]; });
    return Q.all('Pick every word made of <b>two words</b>.', right, R.some(NOT_COMPOUND, 2), { hint: 'Can you find two whole words inside it?', explain: right.join(', ') + ' are each made of two words.', meta: { k: 'g1-pick-compound' } });
  }

  /* ---------- question makers: word meanings ---------- */
  function sameMeaning(lv) {
    var p = R.pick(SAME), flip = R.int(0, 1), w = p[flip], right = p[1 - flip];
    return Q.one('Which word means the <b>same</b> as <b>' + w + '</b>?', right, R.some(OPP, lv > 1 ? 3 : 2).map(function (o) { return o[R.int(0, 1)]; }).filter(function (o) { return o !== w; }), {
      prompt: 'Try each word in a sentence: "The dog is ' + w + '."', hint: 'Which word could take its place?', explain: '<b>' + w + '</b> and <b>' + right + '</b> mean the same.', meta: { k: 'g1-same', w: w } });
  }
  function opposite(lv) {
    var p = R.pick(OPP), flip = R.int(0, 1), w = p[flip], right = p[1 - flip];
    var wrong = [w].concat(R.some(OPP.filter(function (o) { return o !== p; }), 2).map(function (o) { return o[0]; }));
    return Q.one('Which word means the <b>opposite</b> of <b>' + w + '</b>?', right, wrong.slice(lv > 1 ? 0 : 1, lv > 1 ? 3 : 2), { hint: 'Opposites are as different as can be.',
      explain: '<b>' + w + '</b> and <b>' + right + '</b> are opposites.', meta: { k: 'g1-opposite', w: w } });
  }
  function matchOpp() {
    var ps = R.some(OPP, 3);
    return { q: 'Match each word to its opposite.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[1]]; }), hint: 'Think: as different as can be.', explain: 'Opposites go together.', meta: { k: 'g1-match-opp' } };
  }
  function oddOne(lv) {
    var keys = Object.keys(GROUPS), g = R.pick(keys), other = R.pick(keys.filter(function (k) { return k !== g; }));
    var odd = R.pick(GROUPS[other]);
    return Q.one('Which word does <b>not</b> belong?', odd, R.some(GROUPS[g], lv > 1 ? 3 : 2), { prompt: 'What are most of the words? Find the one that is different.',
      hint: 'Most of the words are ' + g + '.', explain: '<b>' + odd + '</b> is not one of the ' + g + '.', meta: { k: 'g1-odd-one', odd: odd } });
  }
  function groupName() {
    var keys = Object.keys(GROUPS), g = R.pick(keys);
    return Q.tiles('What group are these words in?', g, R.some(keys.filter(function (k) { return k !== g; }), 2), { fig: R.some(GROUPS[g], 3).map(function (w) { return W.tile(w); }).join(''),
      hint: 'What is the same about all of them?', explain: 'They are all ' + g + '.', meta: { k: 'g1-group-name' } });
  }
  function context(lv) {
    var c = R.pick(CONTEXT);
    return Q.one('What does <b>' + c[0] + '</b> mean?', c[2], c[3].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(c[1].replace(c[0], '<mark class="hl">' + c[0] + '</mark>')),
      prompt: 'Read the whole sentence. What clue helps?', hint: 'Look at the words after the new word.', explain: '<b>' + c[0] + '</b> means ' + c[2] + '.', meta: { k: 'g1-context', w: c[0] } });
  }
  function subjectWord(lv) {
    var s = R.pick(SUBJECT);
    return Q.one('In ' + s[2] + ', what does <b>' + s[0] + '</b> mean?', s[1], R.some(SUBJECT.filter(function (x) { return x !== s; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), {
      hint: 'Think about when you use this word in ' + s[2] + '.', explain: '<b>' + s[0] + '</b>: ' + s[1] + '.', meta: { k: 'g1-subject-word', w: s[0] } });
  }

  Atlas.register('word-parts', {
    lessons: [{
      id: 'endings', title: 'Word parts', sub: 'Endings change a word. Two words can make one.',
      concepts: [
        { slug: 'plural', title: 'More than one: -s or -es', exp: ['B2.6'], skill: 'parts',
          model: [
            step(W.sum([['cat', 'base'], ['s', 'suffix']]), 'Most words: add <b>-s</b>.'),
            step(W.sum([['box', 'base'], ['es', 'suffix']]), 'After s, x, sh or ch: add <b>-es</b>.'),
            step(W.sum([['dish', 'base'], ['es', 'suffix']]), 'You can hear the extra beat: dish-es.')
          ],
          guided: [function () { return pluralQ(1); }, function () { return pluralQ(1); }],
          check: [function () { return pluralQ(1); }, function () { return pluralQ(2); }],
          coach: '<p>Say the plural out loud. If you hear an extra beat (box-es, dish-es), it needs -es.</p>',
          mistake: '<p>Writing "boxs". Say it: you hear two beats, so add -es.</p>' },
        { slug: 'ing-ed', title: '-ing and -ed', exp: ['B2.6'], skill: 'parts',
          model: [
            step(W.sum([['jump', 'base'], ['ing', 'suffix']]), 'Happening now.'),
            step(W.sum([['jump', 'base'], ['ed', 'suffix']]), 'Already happened.'),
            step(W.sent('Yesterday, I <b>jumped</b>.'), 'Yesterday is a clue.')
          ],
          guided: [function () { return ingEd(1); }, function () { return buildWord(1); }],
          check: [function () { return ingEd(1); }, function () { return ingEd(2); }],
          coach: '<p>Act it out. "I am jumping" while jumping; "I jumped" after stopping. Point out that -ed can sound like /t/ (jumped) or /d/ (played) but is spelled the same.</p>',
          mistake: '<p>Spelling -ed as it sounds ("jumpt"). It is always spelled -ed.</p>' },
        { slug: 'compound', title: 'Two words make one', exp: ['B2.6'], skill: 'parts',
          model: [
            step(W.sum([['snow', 'base'], ['man', 'base']])),
            step(W.sum([['rain', 'base'], ['bow', 'base']]), 'Read each small word, then the big word.')
          ],
          key: '<p>These are called <b>compound words</b>.</p>',
          guided: [function () { return compound(1); }, function () { return splitCompound(1); }],
          check: [function () { return compound(2); }, pickCompound],
          coach: '<p>Write compound words on cards and cut them in two. Mix the halves and rebuild them. Some silly ones (snowcake) are fun to talk about.</p>',
          mistake: '<p>Splitting in the wrong place (sn + owman). Look for a whole word at the start.</p>' }
      ]
    }, {
      id: 'meanings', title: 'Word meanings', sub: 'Same, opposite, groups and new words.',
      concepts: [
        { slug: 'same', title: 'Words that mean the same', exp: ['B2.7'], skill: 'meanings',
          model: [
            step(W.tile('big') + ' = ' + W.tile('large')),
            step(W.sent('The moose is <b>big</b>. The moose is <b>large</b>.'), 'Either word works.')
          ],
          guided: [function () { return sameMeaning(1); }, function () { return sameMeaning(1); }],
          check: [function () { return sameMeaning(1); }, function () { return sameMeaning(2); }],
          coach: '<p>When reading, stop at a word and ask: "What is another word for that?"</p>',
          mistake: '<p>Picking an opposite. Put the word into the sentence and check that it means the same thing.</p>' },
        { slug: 'opposite', title: 'Opposites', exp: ['B2.7'], skill: 'meanings',
          model: [
            step(W.tile('hot') + ' &harr; ' + W.tile('cold')),
            step(W.tile('full') + ' &harr; ' + W.tile('empty'), 'As different as can be.')
          ],
          guided: [function () { return opposite(1); }, function () { return opposite(1); }],
          check: [function () { return opposite(2); }, matchOpp],
          coach: '<p>Play "say the opposite" in the car: you say up, the child says down.</p>',
          mistake: '<p>Choosing a word that is just different (hot and wet). Opposites are on the same line, at each end.</p>' },
        { slug: 'groups', title: 'Word groups', exp: ['B2.7'], skill: 'meanings',
          model: [
            step(W.tile('red') + W.tile('blue') + W.tile('green'), 'All colours.'),
            step(W.tile('moose') + W.tile('plum') + W.tile('beaver'), 'Plum does not belong.')
          ],
          guided: [groupName, function () { return oddOne(1); }],
          check: [function () { return oddOne(1); }, function () { return oddOne(2); }],
          coach: '<p>Sort groceries or toys into groups and name each group.</p>',
          mistake: '<p>Choosing by sound or length. Ask: "What kind of thing is each word?"</p>' },
        { slug: 'new-words', title: 'Work out a new word', exp: ['B2.7'], skill: 'meanings',
          model: [
            step(W.sent('The soup was <mark class="hl">steaming</mark>, so I waited for it to cool.'), 'Read the whole sentence.'),
            step(W.sent('so I waited for it to <b>cool</b>'), 'A clue.'),
            step(W.tile('steaming') + ' = very hot')
          ],
          guided: [function () { return context(1); }, function () { return subjectWord(1); }],
          check: [function () { return context(2); }, function () { return subjectWord(2); }],
          coach: '<p>Teach two or three new words a week from books, Math or Science. Use each one in a sentence of your own every day that week.</p>',
          mistake: '<p>Guessing from the first letter. Read the whole sentence and look for a clue.</p>' }
      ]
    }],
    practice: [
      { id: 'parts', name: 'Word parts', code: 'B2.6', gen: pluralQ },
      { id: 'meanings', name: 'Word meanings', code: 'B2.7', gen: sameMeaning }
    ],
    tasks: [
      { id: 'word-wall', title: 'My new words', code: 'B2.7', pic: W.icon('star'), say: 'Learn one new word each day. Use it in a sentence.', write: true,
        run: ['Choose a new word from a book, Math or Science (for example: enormous, melt, equal).', 'Say what it means in simple words. The child uses it in a sentence out loud, then writes the word.', 'Keep a list. At the end of the week, ask the child to explain each word.'],
        rubric: ['Cannot explain the words yet.', 'Explains some words with help.', 'Explains most words and uses them in sentences.', 'Uses the new words on their own when talking or writing.'] }
    ]
  });

  Q.shapes('word-parts', {
    parts: [[1, 'ing-ed', ingEd], [1, 'build', buildWord], [1, 'compound', compound], [2, 'split', splitCompound], [2, 'pick', pickCompound]],
    meanings: [[1, 'opposite', opposite], [1, 'group', groupName], [2, 'odd-one', oddOne], [2, 'context', context], [2, 'subject', subjectWord], [3, 'match', matchOpp]]
  });
})();
