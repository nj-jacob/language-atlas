/* Grade 2: reading smoothly.
   Ontario 2023 Language, Grade 2:
   B2.5 "read words, sentences, and paragraphs in a variety of texts fluently, with accuracy and appropriate pacing to support comprehension,
        and read aloud with expression and intonation"
   From the Language Foundations Continuum, Grade 2: rereading newly decoded words, pausing at punctuation and longer phrase boundaries,
   and knowing high-frequency words at a glance.
   The computer checks knowing what to do. Reading aloud itself is an activity with a grown-up, marked with a rubric.
   All passages and sentences are written for this site. Answer checks: tests/verify/grade2-fluency.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var MARKS = [['.', 'Stop.'], ['?', 'Voice goes up.'], ['!', 'Strong voice.']];
  var ENDS = {
    '.': ['The cat is asleep.', 'We ate soup for lunch.', 'My sister has a red scarf.', 'The bus stops here.'],
    '?': ['Is the pond frozen?', 'Can you find my boots?', 'Where did the ball go?', 'Do you like pancakes?'],
    '!': ['Look out!', 'That is so cool!', 'We found it!', 'Stop that!']
  };
  /* a sentence without its end mark, and the mark it needs */
  var NEED = [['Can we go skating', '?'], ['Wow, look at that moose', '!'], ['The library opens at ten', '.'], ['Who ate my apple', '?'], ['Our team won', '!'], ['My dog likes to dig', '.']];
  /* sentences in smooth phrases */
  var PHRASED = [['At recess,', 'we played tag.'], ['The brown bear', 'went to sleep.'], ['On Saturday,', 'Mei went to the market.'], ['My little brother', 'loves trucks.'],
    ['After school,', 'we walked home', 'in the rain.'], ['The tall pine trees', 'swayed', 'in the wind.']];
  var JOINS = ['the', 'a', 'my', 'to', 'in', 'little', 'brown', 'tall', 'pine'];
  var REREAD = ['Sound out the new word.', 'Say the word again, faster.', 'Read the whole sentence again, smoothly.'];
  var FEEL = { happy: ['I got a puppy today!', 'We are going to the beach!', 'Grandma is here!'], sad: ['My balloon floated away.', 'The rain ruined our picnic.', 'I lost my favourite toy.'],
    sleepy: ['I can hardly keep my eyes open.', 'It is so late. Time for bed.', 'Yawn. I need a nap.'] };
  var PASSAGES = {
    skate: ['Skating Day', ['Zara laced up her skates. The rink was smooth and shiny.', '“Hold my hand,” said her dad.', 'Zara took one small step. Then another!',
      'Soon she was gliding across the ice.', '“Look at me!” she called. “I am skating!”']],
    bus: ['The Late Bus', ['The school bus was late. Owen waited at the stop with his friend Hana.', '“Where is it?” asked Hana.', 'Owen pointed down the road. “There it is!”',
      'The yellow bus rolled up, and the doors opened with a hiss.']]
  };
  var SIGHT = 'said, was, they, come, of, want, there, where, what, does, your, people, could, would, again';

  /* ---------- question makers ---------- */
  function voice(lv, m0) {
    var mark = m0 || R.pick(['.', '?', '!']), s = R.pick(ENDS[mark]), last = s.length - 1;
    return { q: 'How does your voice sound at the end?', fig: W.sent(W.hl(s, last, last + 1)), type: 'tap', tiles: MARKS.map(function (m) { return m[1]; }), answer: ['.', '?', '!'].indexOf(mark),
      prompt: 'Look at the mark at the end.', hint: 'A period: stop. A question mark: voice goes up. An exclamation mark: strong voice.', explain: W.hl(s, last, last + 1) + ' ' + MARKS[['.', '?', '!'].indexOf(mark)][1],
      meta: { k: 'g2-voice', s: s } };
  }
  function needMark() {
    var n = R.pick(NEED);
    return { q: 'Which mark goes at the end?', fig: W.sent(n[0] + W.gap()), type: 'tap', tiles: ['.', '?', '!'], answer: ['.', '?', '!'].indexOf(n[1]),
      hint: 'Is it telling, asking, or saying something strongly?', explain: W.sent(n[0] + n[1]), meta: { k: 'g2-need-mark', s: n[0] } };
  }
  function pause() {
    var p = R.pick(PHRASED.filter(function (x) { return /,$/.test(x[0]); })), words = p.join(' ').split(' ');
    return { q: 'Where do you take a <b>short pause</b>? Tap the word just before it.', fig: W.sent(p.join(' ')), type: 'tap', tiles: words, answer: words.findIndex(function (w) { return /,$/.test(w); }),
      hint: 'Look for a comma.', explain: 'A comma means a short pause.', meta: { k: 'g2-pause' } };
  }
  function badBreaks(p) {
    var words = p.join(' ').split(' '), spots = [];
    words.forEach(function (w, i) { if (i < words.length - 1 && JOINS.indexOf(w.toLowerCase()) >= 0) spots.push(i); });
    return R.shuffle(spots).slice(0, 2).map(function (i) { return words.slice(0, i + 1).join(' ') + ' / ' + words.slice(i + 1).join(' '); });
  }
  function phrases(lv) {
    var p = R.pick(PHRASED.filter(function (x) { return badBreaks(x).length >= (lv > 1 ? 2 : 1); }));
    return Q.one('Which way reads in <b>smooth phrases</b>?', p.join(' / '), badBreaks(p).slice(0, lv > 1 ? 2 : 1), { prompt: 'Read each one aloud. Which sounds like talking?',
      hint: 'Keep words that go together in one breath, like "the brown bear".', explain: W.sent(p.join(' / ')), meta: { k: 'g2-phrases' } });
  }
  function reread() {
    return { q: 'You meet a new word. Put the steps in order.', type: 'order', items: REREAD.slice(), first: 'First', last: 'Last', hint: 'Work out the word first. Then make it smooth.',
      explain: 'Sound it out, say it faster, then reread the sentence.', meta: { k: 'g2-reread' } };
  }
  function rereadWhy() {
    var right = R.int(0, 1) === 1, said = right ? 'After I sound out a word, I read the sentence again.' : 'After I sound out a word, I skip to the next page.';
    return { q: Q.name() + ' says:', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['Rereading makes it smooth and helps it make sense.', 'Skipping helps me understand.'], answer: 0 },
      hint: 'What helps the sentence make sense?', explain: 'Reread the sentence so it sounds smooth and makes sense.', meta: { k: 'g2-reread-tf', said: said } };
  }
  function feeling() {
    var f = R.pick(Object.keys(FEEL)), s = R.pick(FEEL[f]);
    return Q.tiles('How should this sound when you read it aloud?', f, Object.keys(FEEL).filter(function (x) { return x !== f; }), { fig: W.sent(s), hint: 'How would the person feel?',
      explain: 'Read it with a ' + f + ' voice.', meta: { k: 'g2-feeling', s: s } });
  }

  Atlas.register('fluency', {
    lessons: [{
      id: 'smooth', title: 'Reading smoothly', sub: 'Marks, phrases and rereading.',
      concepts: [
        { slug: 'marks', title: 'Marks tell your voice what to do', exp: ['B2.5'], skill: 'fluency',
          model: [
            step(W.sent(W.hl('The cat is asleep.', 17, 18)), 'Stop.'),
            step(W.sent(W.hl('Is the pond frozen?', 18, 19)), 'Voice goes up.'),
            step(W.sent(W.hl('We found it!', 11, 12)), 'Strong voice.')
          ],
          guided: [function () { return voice(1); }, needMark],
          check: [function () { return voice(1); }, needMark],
          coach: '<p>Read one sentence three ways (with a period, a question mark, an exclamation mark) and let the child hear the difference.</p>',
          mistake: '<p>Reading straight past the marks. Have the child tap the mark with a finger as they reach it.</p>' },
        { slug: 'phrases', title: 'Read in phrases', exp: ['B2.5'], skill: 'fluency',
          model: [
            step(W.sent('At recess, / we played tag.'), 'Two breaths.'),
            step(W.sent('The brown bear / went to sleep.'), '<b>The brown bear</b> goes together.')
          ],
          guided: [pause, function () { return phrases(1); }],
          check: [pause, function () { return phrases(2); }],
          coach: '<p>Draw light pencil slashes between phrases in a sentence and read it together, scooping each phrase in one breath.</p>',
          mistake: '<p>Reading word by word, like a robot. Model the phrase, then have the child echo it.</p>' },
        { slug: 'reread', title: 'Sound it out, then reread', exp: ['B2.5'], skill: 'fluency',
          model: [
            step(W.syl(['plan', 'et']), 'A new word. Sound it out.'),
            step(W.tile('planet'), 'Say it again, faster.'),
            step(W.sent('We saw a <b>planet</b> in the sky.'), 'Reread the whole sentence.')
          ],
          guided: [reread, rereadWhy],
          check: [reread, rereadWhy],
          coach: '<p>When the child works out a hard word, say: "Great. Now read that sentence again so it sounds like talking."</p>',
          mistake: '<p>Moving on after the hard word, so the sentence stays choppy and its meaning is lost.</p>' },
        { slug: 'feeling', title: 'Read with feeling', exp: ['B2.5'], skill: 'fluency',
          model: [
            step(W.sent('Grandma is here!'), 'Happy voice.'),
            step(W.sent('My balloon floated away.'), 'Slow, sad voice.')
          ],
          guided: [feeling, feeling],
          check: [feeling, feeling],
          coach: '<p>Take turns reading a line with a happy, sad or sleepy voice and guess each other\'s feeling.</p>',
          mistake: '<p>Using the same flat voice for everything. Ask: "How would the person feel?"</p>' }
      ]
    }],
    practice: [
      { id: 'fluency', name: 'Reading smoothly', code: 'B2.5', gen: function (lv) { return voice(lv); } }
    ],
    tasks: [
      { id: 'read-skate', title: 'Read aloud: Skating Day', code: 'B2.5', pic: W.icon('read'), text: W.passage(PASSAGES.skate[0], PASSAGES.skate[1]), say: 'Read it aloud to your grown-up.',
        run: ['Let the child read the passage silently first.', 'Then the child reads it aloud. Do not correct mid-sentence; note the words that were tricky.', 'Talk about how Zara feels at the end, then read it once more.'],
        rubric: ['Many words are tricky; reads word by word.', 'Most words right; some phrasing; little expression.', 'Reads accurately in phrases, with some expression.', 'Smooth, accurate and expressive, at a talking pace.'],
        coach: '<p>A good Grade 2 pace sounds like slow, careful talking. Accuracy and phrasing matter more than speed.</p>' },
      { id: 'read-bus', title: 'Read it three times: The Late Bus', code: 'B2.5', pic: W.icon('read'), text: W.passage(PASSAGES.bus[0], PASSAGES.bus[1]), say: 'Read it three times. It gets smoother each time.',
        run: ['Read the passage to the child first, with expression.', 'The child reads it three times, a little smoother each time.', 'After the third reading, ask which time sounded best and why.'],
        rubric: ['Still word by word after three readings.', 'A little smoother by the third reading.', 'Clearly smoother and more expressive by the third reading.', 'Smooth and expressive; the question and the shout sound different.'] },
      { id: 'sight-words', title: 'Words at a glance', code: 'B2.5', pic: W.icon('star'), text: W.sent(SIGHT), say: 'Read each word as fast as you can see it.',
        run: ['Write each word on a small card: ' + SIGHT + '.', 'Show one card at a time. The child reads it.', 'Keep the cards the child reads at once; practise the others again tomorrow.'],
        rubric: ['Reads fewer than 5 at a glance.', 'Reads 5 to 9 at a glance.', 'Reads 10 to 14 at a glance.', 'Reads all 15 at a glance, and in books too.'],
        coach: '<p>These words have a part that does not follow the usual patterns. Sound out the regular parts together and point to the tricky part, then practise for speed.</p>' }
    ]
  });

  Q.shapes('fluency', {
    fluency: [[1, 'need-mark', needMark], [1, 'pause', pause], [1, 'phrases', phrases], [1, 'feeling', feeling], [2, 'reread', reread]]
  });
})();
