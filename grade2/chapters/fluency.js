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

  var MARKS = [['.', 'Stop.'], ['?', 'Voice goes up.'], ['!', 'Strong voice.']], ORDER = ['.', '?', '!'];
  var ENDS = {
    '.': ['The cat is asleep.', 'We ate soup for lunch.', 'My sister has a red scarf.', 'The bus stops here.', 'The leaves are falling.', 'Dad made pancakes.', 'I read a book in bed.', 'Our dog is brown.'],
    '?': ['Is the pond frozen?', 'Can you find my boots?', 'Where did the ball go?', 'Do you like pancakes?', 'Who is at the door?', 'What time is it?', 'Can I have a turn?', 'Are we there yet?'],
    '!': ['Look out!', 'That is so cool!', 'We found it!', 'Stop that!', 'I did it!', 'What a big fish!', 'Hooray, it snowed!', 'Watch out for the puck!']
  };
  /* a sentence without its end mark, and the mark it needs */
  var NEED = [['Can we go skating', '?'], ['Wow, look at that moose', '!'], ['The library opens at ten', '.'], ['Who ate my apple', '?'], ['Our team won', '!'], ['My dog likes to dig', '.'],
    ['Where are my mittens', '?'], ['Hooray, we are going to the lake', '!'], ['The snow melted in the sun', '.'], ['Do you want to play', '?'], ['Wow, that is a huge pumpkin', '!'], ['We planted beans in May', '.']];
  /* sentences in smooth phrases */
  var PHRASED = [['At recess,', 'we played tag.'], ['The brown bear', 'went to sleep.'], ['On Saturday,', 'Mei went to the market.'], ['My little brother', 'loves trucks.'],
    ['After school,', 'we walked home', 'in the rain.'], ['The tall pine trees', 'swayed', 'in the wind.'], ['In the morning,', 'our lake was still.'], ['The little red fox', 'ran into the woods.'],
    ['After lunch,', 'we went to the library.'], ['My big sister', 'plays the drum.'], ['On the way home,', 'we saw a rainbow.'], ['The old brown dog', 'slept by the fire.']];
  var JOINS = ['the', 'a', 'my', 'to', 'in', 'little', 'brown', 'tall', 'pine', 'red', 'big', 'old'];
  var REREAD = ['Sound out the new word.', 'Say the word again, faster.', 'Read the whole sentence again, smoothly.'];
  /* new words in sentences, to sound out and reread */
  var NEW = [['plan', 'et', 'We saw a planet in the sky.'], ['cam', 'el', 'A camel can walk in the sand.'], ['bas', 'ket', 'Put the apples in the basket.'], ['hel', 'met', 'Wear a helmet on your bike.'],
    ['muf', 'fin', 'I ate a blueberry muffin.'], ['nap', 'kin', 'Wipe your hands on a napkin.'], ['rab', 'bit', 'The rabbit hopped away.'], ['in', 'sect', 'An ant is an insect.'], ['pump', 'kin', 'We carved a pumpkin.']];
  var HABITS = { good: ['Read the sentence again after a hard word.', 'Read in phrases, not word by word.', 'Pause at a comma.', 'Let your voice go up at a question mark.'],
    bad: ['Skip the hard word.', 'Read as fast as you can.', 'Use the same voice for every sentence.', 'Never stop at a period.'] };
  /* feelings, how a voice sounds for each, and sentences for each */
  var VOICE = { happy: 'bright and bouncy', sad: 'slow and soft', sleepy: 'slow, with a yawn', scared: 'quiet and shaky', excited: 'fast and loud' };
  var FEEL = { happy: ['I got a puppy today!', 'Grandma is here!', 'I love sunny days.', 'We won the game!'], sad: ['My balloon floated away.', 'The rain ruined our picnic.', 'I lost my favourite toy.', 'My friend moved away.'],
    sleepy: ['I can hardly keep my eyes open.', 'It is so late. Time for bed.', 'Yawn. I need a nap.', 'My bed feels so cosy.'], scared: ['What was that noise?', 'It is so dark in here.', 'I do not like thunder.', 'Is something under my bed?'],
    excited: ['We are going to the beach!', 'Hurry, the parade is starting!', 'It is my birthday!', 'Look, the first snow!'] };
  var PASSAGES = {
    skate: ['Skating Day', ['Zara laced up her skates. The rink was smooth and shiny.', '“Hold my hand,” said her dad.', 'Zara took one small step. Then another!',
      'Soon she was gliding across the ice.', '“Look at me!” she called. “I am skating!”']],
    bus: ['The Late Bus', ['The school bus was late. Owen waited at the stop with his friend Hana.', '“Where is it?” asked Hana.', 'Owen pointed down the road. “There it is!”',
      'The yellow bus rolled up, and the doors opened with a hiss.']]
  };
  var SIGHT = 'said, was, they, come, of, want, there, where, what, does, your, people, could, would, again';

  /* ---------- marks tell your voice what to do ---------- */
  function voice(lv, m0) {
    var mark = m0 || R.pick(ORDER), s = R.pick(ENDS[mark]), last = s.length - 1;
    return { q: 'How does your voice sound at the end?', fig: W.sent(W.hl(s, last, last + 1)), type: 'tap', tiles: MARKS.map(function (m) { return m[1]; }), answer: ORDER.indexOf(mark),
      prompt: 'Look at the mark at the end.', hint: 'A period: stop. A question mark: voice goes up. An exclamation mark: strong voice.', explain: W.hl(s, last, last + 1) + ' ' + MARKS[ORDER.indexOf(mark)][1],
      meta: { k: 'g2-voice', s: s } };
  }
  function needMark() {
    var n = R.pick(NEED);
    return { q: 'Which mark goes at the end?', fig: W.sent(n[0] + W.gap()), type: 'tap', tiles: ORDER.slice(), answer: ORDER.indexOf(n[1]),
      hint: 'Is it telling, asking, or saying something strongly?', explain: W.sent(n[0] + n[1]), meta: { k: 'g2-need-mark', s: n[0] } };
  }
  function markTf() {
    var mark = R.pick(ORDER), s = R.pick(ENDS[mark]), right = R.int(0, 1) === 1, said = right ? MARKS[ORDER.indexOf(mark)][1] : R.pick(MARKS.filter(function (m) { return m[0] !== mark; }))[1];
    return { q: Q.name() + ' reads this. At the end: <b>' + said + '</b>', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['The end mark says to.', 'The end mark says something else.'], answer: right ? 0 : 1 },
      hint: 'Look at the mark at the end.', explain: W.hl(s, s.length - 1, s.length) + ' ' + MARKS[ORDER.indexOf(mark)][1], meta: { k: 'g2-mark-tf', s: s, said: said } };
  }
  function whichUp(lv) {
    var mark = R.pick(ORDER), right = R.pick(ENDS[mark]), wrong = ORDER.filter(function (x) { return x !== mark; }).map(function (x) { return R.pick(ENDS[x]); }).slice(0, lv > 1 ? 2 : 1);
    return Q.one('Which sentence ends with: <b>' + MARKS[ORDER.indexOf(mark)][1] + '</b>', right, wrong, { hint: 'Look at the mark at the end of each one.',
      explain: W.sent(W.hl(right, right.length - 1, right.length)), meta: { k: 'g2-which-voice', want: mark } });
  }
  function matchMarks() {
    var ss = ORDER.map(function (m) { return R.pick(ENDS[m]); });
    return { q: 'Match each sentence to how your voice sounds at the end.', type: 'match', pairs: ss.map(function (x, i) { return [x, MARKS[i][1]]; }), hint: 'Look at each end mark.',
      explain: 'Period: stop. Question mark: up. Exclamation mark: strong.', meta: { k: 'g2-match-voice' } };
  }

  /* ---------- read in phrases ---------- */
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
  function phraseOrder() {
    var p = R.pick(PHRASED.filter(function (x) { return x.length === 3 || /,$/.test(x[0]); }));
    return { q: 'Put the phrases in order to make the sentence.', type: 'order', items: p.slice(), first: 'First', last: 'Last', hint: 'Which phrase starts with a capital letter?',
      explain: W.sent(p.join(' / ')), meta: { k: 'g2-phrase-order' } };
  }
  function phraseTf() {
    var p = R.pick(PHRASED.filter(function (x) { return badBreaks(x).length; })), right = R.int(0, 1) === 1, said = right ? p.join(' / ') : badBreaks(p)[0];
    return { q: Q.name() + ' reads it in these phrases. Does it sound smooth?', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['Words that go together stay together.', 'A break splits words that go together.'], answer: right ? 0 : 1 },
      hint: 'Read it aloud with a breath at each slash.', explain: W.sent(p.join(' / ')), meta: { k: 'g2-phrase-tf', said: said } };
  }

  /* ---------- sound it out, then reread ---------- */
  function newWord() { return R.pick(NEW); }
  function reread() {
    var n = newWord();
    return { q: 'You meet the word <b>' + n[0] + n[1] + '</b>. Put the steps in order.', fig: W.sent(n[2].replace(n[0] + n[1], '<b>' + n[0] + n[1] + '</b>')), type: 'order', items: REREAD.slice(), first: 'First', last: 'Last',
      hint: 'Work out the word first. Then make it smooth.', explain: W.syl([n[0], n[1]]) + ' ' + W.tile(n[0] + n[1]), meta: { k: 'g2-reread' } };
  }
  function rereadWhy() {
    var right = R.int(0, 1) === 1, n = newWord(), w = n[0] + n[1], said = right ? 'I sounded out <b>' + w + '</b>. Now I read the sentence again.' : 'I sounded out <b>' + w + '</b>. Now I skip to the next page.';
    return { q: Q.name() + ' says:', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['Rereading makes it smooth and helps it make sense.', 'Skipping helps me understand.'], answer: 0 },
      hint: 'What helps the sentence make sense?', explain: 'Reread the sentence so it sounds smooth and makes sense.', meta: { k: 'g2-reread-tf', said: said } };
  }
  function nextStep(lv) {
    var n = newWord(), i = R.int(0, 1), w = n[0] + n[1];
    return Q.one(Q.name() + ' just did this with <b>' + w + '</b>: ' + REREAD[i].replace('the new word', w).replace('the word', w) + ' What next?', REREAD[i + 1], REREAD.filter(function (x, j) { return j !== i + 1 && j !== i; }).concat(lv > 1 ? ['Skip to the next page.'] : []), {
      fig: W.syl([n[0], n[1]]), hint: 'Sound it out, say it faster, then reread.', explain: REREAD.join(' '), meta: { k: 'g2-next-step', i: i } });
  }
  function habits(lv) {
    return Q.all('Pick every habit of a smooth reader.', R.some(HABITS.good, 2), R.some(HABITS.bad, lv > 1 ? 3 : 2), { hint: 'Which ones help it sound like talking, and make sense?',
      explain: 'Smooth readers reread, read in phrases, and let the marks guide their voice.', meta: { k: 'g2-habits' } });
  }

  /* ---------- read with feeling ---------- */
  function feeling(lv) {
    var f = R.pick(Object.keys(FEEL)), s = R.pick(FEEL[f]);
    return Q.tiles('How should this sound when you read it aloud?', f, R.some(Object.keys(FEEL).filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2), { fig: W.sent(s), hint: 'How would the person feel?',
      explain: 'Read it with a ' + f + ' voice: ' + VOICE[f] + '.', meta: { k: 'g2-feeling', s: s } });
  }
  function voiceFor(lv) {
    var f = R.pick(Object.keys(FEEL)), s = R.pick(FEEL[f]);
    return Q.one('Which voice fits this line?', VOICE[f], R.some(Object.keys(VOICE).filter(function (x) { return x !== f; }), lv > 1 ? 2 : 1).map(function (x) { return VOICE[x]; }), { fig: W.sent(s),
      hint: 'How does the person feel? How would they sound?', explain: f + ': ' + VOICE[f] + '.', meta: { k: 'g2-voice-for', s: s } });
  }
  function feelTf() {
    var f = R.pick(Object.keys(FEEL)), s = R.pick(FEEL[f]), right = R.int(0, 1) === 1, said = right ? f : R.pick(Object.keys(FEEL).filter(function (x) { return x !== f; }));
    return { q: Q.name() + ' reads this with a <b>' + said + '</b> voice.', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['That is how the person feels.', 'The person feels something else.'], answer: right ? 0 : 1 },
      hint: 'How would the person feel?', explain: 'Read it with a ' + f + ' voice.', meta: { k: 'g2-feel-tf', s: s, said: said } };
  }
  function matchFeel() {
    var fs = R.some(Object.keys(FEEL), 3);
    return { q: 'Match each line to the feeling in your voice.', type: 'match', pairs: fs.map(function (f) { return [R.pick(FEEL[f]), f]; }), hint: 'How would each person feel?',
      explain: 'Your voice shows the feeling.', meta: { k: 'g2-match-feel' } };
  }

  Atlas.register('fluency', {
    full: true,
    lessons: [{
      id: 'smooth', title: 'Reading smoothly', sub: 'Marks, phrases and rereading.',
      concepts: [
        { slug: 'marks', title: 'Marks tell your voice what to do', exp: ['B2.5'], skill: 'marks',
          model: [
            step(W.sent(W.hl('The cat is asleep.', 17, 18)), 'Stop.'),
            step(W.sent(W.hl('Is the pond frozen?', 18, 19)), 'Voice goes up.'),
            step(W.sent(W.hl('We found it!', 11, 12)), 'Strong voice.'),
            step(W.sent('Can we go skating' + W.gap()), 'No mark yet. It asks something.'),
            step(W.sent(W.hl('Can we go skating?', 17, 18)), 'A question mark: voice goes up.')
          ],
          guided: [function () { return voice(1); }, needMark, function () { return whichUp(1); }],
          check: [function () { return voice(2); }, needMark, markTf, matchMarks, function () { return whichUp(2); }],
          coach: '<p>Read one sentence three ways (with a period, a question mark, an exclamation mark) and let the child hear the difference.</p>',
          mistake: '<p>Reading straight past the marks. Have the child tap the mark with a finger as they reach it.</p>' },
        { slug: 'phrases', title: 'Read in phrases', exp: ['B2.5'], skill: 'phrases',
          model: [
            step(W.sent('At recess, / we played tag.'), 'Two breaths.'),
            step(W.sent('At recess<mark class="hl">,</mark> we played tag.'), 'The comma shows the pause.'),
            step(W.sent('The brown bear / went to sleep.'), '<b>The brown bear</b> goes together.'),
            step(W.sent('The brown / bear went to sleep.'), 'Not here: it splits <b>brown bear</b>.')
          ],
          guided: [pause, function () { return phrases(1); }, phraseOrder],
          check: [pause, function () { return phrases(2); }, phraseTf, phraseOrder, function () { return phrases(3); }],
          coach: '<p>Draw light pencil slashes between phrases in a sentence and read it together, scooping each phrase in one breath.</p>',
          mistake: '<p>Reading word by word, like a robot. Model the phrase, then have the child echo it.</p>' },
        { slug: 'reread', title: 'Sound it out, then reread', exp: ['B2.5'], skill: 'reread',
          model: [
            step(W.syl(['plan', 'et']), 'A new word. Sound it out.'),
            step(W.tile('planet'), 'Say it again, faster.'),
            step(W.sent('We saw a <b>planet</b> in the sky.'), 'Reread the whole sentence.'),
            step(W.syl(['hel', 'met']), 'Another: hel, met.'),
            step(W.sent('Wear a <b>helmet</b> on your bike.'), 'Now it sounds like talking.')
          ],
          guided: [reread, function () { return nextStep(1); }, rereadWhy],
          check: [reread, function () { return nextStep(2); }, function () { return habits(2); }, rereadWhy, function () { return habits(3); }],
          coach: '<p>When the child works out a hard word, say: "Great. Now read that sentence again so it sounds like talking."</p>',
          mistake: '<p>Moving on after the hard word, so the sentence stays choppy and its meaning is lost.</p>' },
        { slug: 'feeling', title: 'Read with feeling', exp: ['B2.5'], skill: 'feeling',
          model: [
            step(W.sent('Grandma is here!'), 'Happy voice.'),
            step(W.sent('My balloon floated away.'), 'Slow, sad voice.'),
            step(W.sent('What was that noise?'), 'How does the person feel?'),
            step(W.means('think', 'scared: <b>quiet and shaky</b>'), 'Let your voice show it.')
          ],
          guided: [function () { return feeling(1); }, function () { return voiceFor(1); }, feelTf],
          check: [function () { return feeling(2); }, function () { return voiceFor(2); }, matchFeel, feelTf, function () { return feeling(3); }],
          coach: '<p>Take turns reading a line with a happy, sad or sleepy voice and guess each other\'s feeling.</p>',
          mistake: '<p>Using the same flat voice for everything. Ask: "How would the person feel?"</p>' }
      ]
    }],
    practice: [
      { id: 'marks', name: 'Marks tell your voice what to do', code: 'B2.5', gen: function (lv) { return voice(lv); } },
      { id: 'phrases', name: 'Read in phrases', code: 'B2.5', gen: phrases },
      { id: 'reread', name: 'Sound it out, then reread', code: 'B2.5', gen: reread },
      { id: 'feeling', name: 'Read with feeling', code: 'B2.5', gen: feeling }
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
    marks: [[1, 'need-mark', needMark], [1, 'which-sentence', whichUp], [2, 'tf', markTf], [2, 'match', matchMarks]],
    phrases: [[1, 'pause', pause], [1, 'order', phraseOrder], [2, 'tf', phraseTf]],
    reread: [[1, 'next-step', nextStep], [1, 'tf', rereadWhy], [2, 'habits', habits]],
    feeling: [[1, 'voice', voiceFor], [1, 'tf', feelTf], [2, 'match', matchFeel]]
  });
})();
