/* Grade 6: reading fluently.
   Ontario 2023 Language, Grade 6:
   B2.3 "read a variety of texts fluently, with accuracy and appropriate pacing to support comprehension, and when reading aloud, adjust
   expression and intonation according to the purpose of reading"
   The computer checks knowing how to phrase, pace and express a text. Reading aloud itself is an activity with a grown-up.
   All sentences are written for this site. Answer checks: tests/verify/grade6-fluency.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* sentences split into meaningful phrases */
  var PHRASES = [['The old canoe', 'drifted slowly', 'across the lake.'], ['After the storm,', 'the whole town', 'helped clean up.'], ['My cousin from Iqaluit', 'sent us a photo', 'of the northern lights.'],
    ['When the bell rang,', 'the students', 'lined up quietly.'], ['Beside the river,', 'a great blue heron', 'stood perfectly still.'], ['If you finish early,', 'read a chapter', 'of your book.'],
    ['On Saturday morning,', 'Priya and her dad', 'biked to the market.'], ['The hungry raccoon', 'tipped over', 'our green bin.'], ['Before the game started,', 'the coach', 'gave a short speech.'],
    ['Under the frozen pond,', 'the turtles', 'sleep all winter.'], ['At the powwow,', 'the jingle dancers', 'moved in a circle.'], ['During the long drive,', 'we counted', 'red barns and cows.'],
    ['The tall maple tree', 'turned bright red', 'in October.'], ['Without a word,', 'Mateo handed me', 'the missing puzzle piece.'], ['Every spring,', 'the geese fly north', 'in a V shape.'],
    ['Near the end of the trail,', 'we spotted', 'a family of deer.']];
  /* the same words, split in the wrong places: move every break one word later */
  function badSplit(p) {
    var words = p.join(' ').split(' '), cuts = [], n = 0;
    p.slice(0, -1).forEach(function (c) { n += c.split(' ').length; cuts.push(n + 1); });
    var out = [], from = 0;
    cuts.concat([words.length]).forEach(function (c) { if (c > from && c <= words.length) { out.push(words.slice(from, c).join(' ')); from = c; } });
    return out;
  }
  /* break after the first word, then every two words */
  function badSplit2(p) {
    var words = p.join(' ').split(' '), out = [], cur = [];
    words.forEach(function (w, i) { cur.push(w); if (i === 0 || i === words.length - 1 || (i % 2 === 1 && i < words.length - 2)) { out.push(cur.join(' ')); cur = []; } });
    return out;
  }
  function slashed(parts) { return parts.join(' / '); }
  /* [mark, what your voice does, sentences that end in it] */
  var VOICE = [['?', 'rises at the end', ['Is the bus late?', 'Did you pack the tent?', 'Where is my other mitten?']],
    [',', 'pauses briefly', ['First, wash your hands.', 'In the morning, we left for camp.', 'Yes, I can help.']],
    ['!', 'sounds strong and excited', ['We won the final!', 'Look at that moose!', 'The ice is cracking!']],
    ['...', 'trails off, as if more is coming', ['I opened the door and...', 'Maybe we could...', 'The lights went out, and then...']],
    ['.', 'drops and stops', ['The lake was calm.', 'Dinner is ready.', 'The snow kept falling.']]];
  function others(list, item) { return list.filter(function (x) { return x !== item; }); }
  /* [why you are reading, the pace that fits] */
  var PACES = ['slowly and carefully', 'at a quick, easy pace', 'slower, with pauses for effect', 'quickly, then slow down at the fact', 'steadily, with the rhythm of the lines'];
  var PACE = [['the steps of a science experiment', 0], ['a recipe you are cooking from', 0], ['the rules of a new board game', 0],
    ['a favourite comic, just for fun', 1], ['a funny story you have read before', 1],
    ['a tense, scary part of a story aloud', 2], ['a sad ending to the class', 2],
    ['a website, to find one fact', 3], ['a bus schedule, to find your bus time', 3], ['an index, to find one page', 3],
    ['a poem to the class', 4], ['song lyrics, while you sing along', 4]];
  function paceOf(p) { return PACES[p[1]]; }
  /* [a line, how to say it]: each speaking word is used once */
  var EXPRESS = [['“Watch out for the ice!” shouted Omar.', 'loud and urgent'], ['“I miss Grandma,” whispered Hana.', 'soft and sad'], ['“We did it!” cheered the team.', 'loud and joyful'],
    ['“Do I have to?” groaned Theo.', 'tired and unwilling'], ['“Who is there?” asked Noor nervously.', 'quiet and nervous'], ['“Welcome, everyone,” said the principal warmly.', 'calm and warm'],
    ['“Get off my bike!” snapped Lucas.', 'sharp and angry'], ['“Is it really mine?” gasped Amara.', 'surprised and amazed'], ['“This is so boring,” sighed Ravi.', 'bored and flat'],
    ['“I am sorry I broke it,” mumbled Ella.', 'quiet and sorry'], ['“I am not scared of anything,” boasted Kiran.', 'proud and showy'],
    ['“Please, can I stay up late?” begged Sofia.', 'pleading and hopeful'], ['“The trip is on Monday,” announced Ms. Cardinal.', 'clear and firm']];
  var SAYS = ['shouted', 'whispered', 'cheered', 'groaned', 'nervously', 'warmly', 'snapped', 'gasped', 'sighed', 'mumbled', 'boasted', 'begged', 'announced'];
  /* [sentence words, { stressed word: what it means }] */
  var STRESS = [[['I', 'did', 'not', 'eat', 'the', 'last', 'muffin.'], { I: 'Someone else ate it.', eat: 'I did something else with it.', last: 'I ate a different muffin.' }],
    [['Ava', 'said', 'the', 'test', 'is', 'on', 'Friday.'], { Ava: 'Ava said it, not someone else.', 'Friday.': 'Friday, not another day.', test: 'A test, not a quiz.' }],
    [['We', 'walked', 'to', 'the', 'park.'], { We: 'Us, not other people.', walked: 'We did not drive.', 'park.': 'The park, not somewhere else.' }],
    [['She', 'lent', 'me', 'her', 'blue', 'jacket.'], { She: 'She lent it, not her brother.', lent: 'I have to give it back.', blue: 'The blue one, not the green one.' }],
    [['Can', 'you', 'carry', 'the', 'big', 'box?'], { you: 'You, not your friend.', carry: 'Lift it, do not drag it.', big: 'The big one, not the small one.' }],
    [['Dad', 'made', 'pancakes', 'this', 'morning.'], { Dad: 'Dad made them, not Grandpa.', pancakes: 'Pancakes, not waffles.', 'morning.': 'This morning, not last night.' }],
    [['I', 'said', 'the', 'game', 'starts', 'at', 'noon.'], { said: 'I told you already.', game: 'The game, not the practice.', 'noon.': 'At noon, not at one.' }],
    [['Our', 'team', 'scored', 'two', 'goals.'], { Our: 'Our team, not theirs.', two: 'Two, not three.', scored: 'We scored them, we did not let them in.' }]];
  function bolded(s, w) { return s[0].map(function (x) { return x === w ? '<b>' + x + '</b>' : x; }).join(' '); }

  /* phrases */
  function phrasing(lv) {
    var p = R.pick(PHRASES);
    return Q.one('Which way reads in <b>meaningful phrases</b>?', slashed(p), [slashed(badSplit(p))].concat(lv > 1 ? [slashed(badSplit2(p))] : []), {
      prompt: 'Read each one aloud. Which groups of words belong together?', hint: 'Each group should make sense on its own.',
      explain: W.sent(slashed(p)), meta: { k: 'g6-phrasing', s: p.join(' ') } });
  }
  function phraseTf() {
    var p = R.pick(PHRASES), right = R.int(0, 1) === 1, shown = right ? slashed(p) : slashed(R.pick([badSplit(p), badSplit2(p)]));
    return { q: Q.name() + ' reads it like this. Is it in meaningful phrases?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['Each group makes sense on its own.', 'Some breaks split words that belong together.'], answer: right ? 0 : 1 },
      hint: 'Read each group on its own. Does it make sense?', explain: W.sent(slashed(p)), meta: { k: 'g6-phrase-tf', shown: shown } };
  }
  /* tap tiles must not repeat, so tapping uses sentences with no repeated word */
  var UNIQUE = PHRASES.filter(function (p) { var w = p.join(' ').split(' '); return w.every(function (x, i) { return w.indexOf(x) === i; }); });
  function phraseBreak(lv) {
    var p = R.pick(UNIQUE), which = lv > 1 ? R.int(0, 1) : 0, words = p.join(' ').split(' '), end = p.slice(0, which + 1).join(' ').split(' ').length - 1;
    return { q: 'Tap the last word of the <b>' + (which ? 'second' : 'first') + '</b> phrase.', type: 'tap', tiles: words, answer: end,
      prompt: 'Where do you take a small breath?', hint: 'Find the group of words that belongs together.',
      explain: W.sent(slashed(p)), meta: { k: 'g6-phrase-break', which: which } };
  }
  function phrasePick() {
    var p = R.pick(PHRASES), bad = badSplit(p).filter(function (c) { return p.indexOf(c) < 0; });
    return Q.all('Pick every <b>meaningful phrase</b> from this sentence.', R.some(p, 2), R.some(bad, Math.min(2, bad.length)), {
      fig: W.sent(p.join(' ')), hint: 'A phrase makes sense on its own.', explain: W.sent(slashed(p)), meta: { k: 'g6-phrase-pick', s: p.join(' ') } });
  }

  /* punctuation and voice */
  function example(v) { return R.pick(v[2]); }
  function voice(lv) {
    var v = R.pick(VOICE);
    return Q.one('At the <b>' + v[0] + '</b>, your voice...', v[1], R.some(others(VOICE, v), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: W.sent(example(v)), prompt: 'Read it aloud. Listen to the end.', hint: 'Read it aloud. What does your voice do at the mark?', explain: v[0] + ' : your voice ' + v[1] + '.', meta: { k: 'g6-voice', mark: v[0] } });
  }
  function voiceMatch() {
    var v = R.some(VOICE, 3);
    return { q: 'Match each sentence to what your voice does.', type: 'match', pairs: v.map(function (x) { return [example(x), x[1]]; }), hint: 'Look at the mark in each sentence.',
      explain: 'Punctuation tells your voice what to do.', meta: { k: 'g6-voice-match' } };
  }
  function voiceTf() {
    var v = R.pick(VOICE), right = R.int(0, 1) === 1, said = right ? v[1] : R.pick(others(VOICE, v))[1];
    return { q: Q.name() + ' says: at the <b>' + v[0] + '</b>, your voice <b>' + said + '</b>.', fig: W.sent(example(v)), type: 'tf', answer: right,
      why: { options: ['That is what the mark tells your voice.', 'The mark tells your voice to do something else.'], answer: right ? 0 : 1 },
      hint: 'Read it aloud and listen.', explain: v[0] + ' : your voice ' + v[1] + '.', meta: { k: 'g6-voice-tf', said: said } };
  }
  function voicePick() {
    var v = R.pick(VOICE), wrong = R.some(others(VOICE, v), 2).map(example);
    return Q.all('Pick every sentence where your voice <b>' + v[1] + '</b>.', R.some(v[2], 2), wrong, {
      hint: 'Look at the mark in each one.', explain: v[0] + ' : your voice ' + v[1] + '.', meta: { k: 'g6-voice-pick', does: v[1] } });
  }

  /* pace */
  function pace(lv) {
    var p = R.pick(PACE);
    return Q.one('You are reading <b>' + p[0] + '</b>. Which pace fits?', paceOf(p), R.some(PACES.filter(function (x) { return x !== paceOf(p); }), lv > 1 ? 3 : 2), {
      prompt: 'Why are you reading it?', hint: 'Slow down when every detail matters.', explain: 'Your purpose sets your pace.', meta: { k: 'g6-pace', why: p[0] } });
  }
  function paceTf() {
    var p = R.pick(PACE), right = R.int(0, 1) === 1, said = right ? paceOf(p) : R.pick(PACES.filter(function (x) { return x !== paceOf(p); }));
    return { q: Q.name() + ' says:', fig: W.sent('When I read ' + p[0] + ', I read ' + said + '.'), type: 'tf', answer: right,
      why: { options: ['That pace fits the purpose.', 'The purpose needs a different pace.'], answer: right ? 0 : 1 },
      hint: 'Does that pace fit the purpose?', explain: 'For ' + p[0] + ': ' + paceOf(p) + '.', meta: { k: 'g6-pace-tf', why: p[0], said: said } };
  }
  function oneEach(n) {
    return R.some([0, 1, 2, 3, 4], n).map(function (i) { return R.pick(PACE.filter(function (p) { return p[1] === i; })); });
  }
  function paceMatch() {
    return { q: 'Match each reading to the pace that fits.', type: 'match', pairs: oneEach(3).map(function (p) { return [p[0], paceOf(p)]; }),
      hint: 'Ask why you are reading each one.', explain: 'Your purpose sets your pace.', meta: { k: 'g6-pace-match' } };
  }
  function paceWhich(lv) {
    var set = oneEach(lv > 1 ? 4 : 3), p = set[0];
    return Q.one('Which one should you read <b>' + paceOf(p) + '</b>?', p[0], set.slice(1).map(function (x) { return x[0]; }), {
      hint: 'Think about why you would read each one.', explain: 'For ' + p[0] + ': ' + paceOf(p) + '.', meta: { k: 'g6-pace-which', pace: paceOf(p) } });
  }

  /* expression */
  function otherHows(e, n) { return R.some(others(EXPRESS, e), n).map(function (x) { return x[1]; }); }
  function express(lv) {
    var e = R.pick(EXPRESS);
    return Q.one('How should this line sound?', e[1], otherHows(e, lv > 1 ? 3 : 2), {
      fig: W.sent(e[0]), prompt: 'Look at the word that tells how it was said.', hint: 'Shouted, whispered, groaned: these words are clues.', explain: '<b>' + e[1] + '</b>', meta: { k: 'g6-express', line: e[0] } });
  }
  function expressMatch() {
    var e = R.some(EXPRESS, 3);
    return { q: 'Match each line to how it should sound.', type: 'match', pairs: e.map(function (x) { return [x[0], x[1]]; }), hint: 'Find the speaking word in each line.', explain: 'Speaking words like whispered and shouted tell you how.', meta: { k: 'g6-express-match' } };
  }
  function expressTap() {
    var e = R.pick(EXPRESS), words = e[0].split(' '), at = words.findIndex(function (w) { return SAYS.indexOf(w.replace(/[^A-Za-z]/g, '')) >= 0; });
    return { q: 'Tap the word that tells you <b>how</b> to say it.', type: 'tap', tiles: words, answer: at,
      prompt: 'It is outside the quotation marks.', hint: 'Look after the speech.', explain: 'Read it <b>' + e[1] + '</b>.', meta: { k: 'g6-express-tap' } };
  }
  function expressTf() {
    var e = R.pick(EXPRESS), right = R.int(0, 1) === 1, said = right ? e[1] : R.pick(others(EXPRESS, e))[1];
    return { q: Q.name() + ' reads this line <b>' + said + '</b>.', fig: W.sent(e[0]), type: 'tf', answer: right,
      why: { options: ['The speaking word says to read it that way.', 'The speaking word says to read it another way.'], answer: right ? 0 : 1 },
      hint: 'Find the speaking word.', explain: 'Read it <b>' + e[1] + '</b>.', meta: { k: 'g6-express-tf', said: said } };
  }

  /* stress */
  function stress() {
    var s = R.pick(STRESS), w = R.pick(Object.keys(s[1]));
    return { q: 'Which word would you stress to mean: <b>' + s[1][w] + '</b>', type: 'tap', tiles: s[0], answer: s[0].indexOf(w),
      prompt: 'Say it a few ways. Lean on one word each time.', hint: 'Say the sentence, leaning on a different word each time.', explain: 'Stress <b>' + w.replace(/[.?]/, '') + '</b>.', meta: { k: 'g6-stress', means: s[1][w] } };
  }
  function stressMean(lv) {
    var s = R.pick(STRESS), w = R.pick(Object.keys(s[1])), more = lv > 1 ? [R.pick(others(STRESS, s).map(function (x) { return R.pick(Object.keys(x[1]).map(function (k) { return x[1][k]; })); }))] : [];
    return Q.one('Stress the bold word. What does it mean?', s[1][w], Object.keys(s[1]).filter(function (k) { return k !== w; }).map(function (k) { return s[1][k]; }).concat(more), {
      fig: W.sent(bolded(s, w)), hint: 'Say it aloud, leaning on the bold word.', explain: 'Stress <b>' + w.replace(/[.?]/, '') + '</b>: ' + s[1][w], meta: { k: 'g6-stress-mean' } });
  }
  function stressTf() {
    var s = R.pick(STRESS), keys = Object.keys(s[1]), w = R.pick(keys), right = R.int(0, 1) === 1, said = right ? s[1][w] : s[1][R.pick(keys.filter(function (k) { return k !== w; }))];
    return { q: Q.name() + ' says it means: <b>' + said + '</b>', fig: W.sent(bolded(s, w)), type: 'tf', answer: right,
      why: { options: ['That is what the stressed word points to.', 'That meaning needs a different stressed word.'], answer: right ? 0 : 1 },
      hint: 'Say it aloud, leaning on the bold word.', explain: 'Stress <b>' + w.replace(/[.?]/, '') + '</b>: ' + s[1][w], meta: { k: 'g6-stress-tf', said: said } };
  }
  function stressMatch() {
    var s = R.pick(STRESS);
    return { q: 'Match each stressed word to what it means.', fig: W.sent(s[0].join(' ')), type: 'match', pairs: R.shuffle(Object.keys(s[1])).map(function (k) { return ['<b>' + k.replace(/[.?]/, '') + '</b>', s[1][k]]; }),
      hint: 'Say the sentence once for each word.', explain: 'The stressed word changes the meaning.', meta: { k: 'g6-stress-match' } };
  }

  var READ = ['# The Ice Road', 'Every winter, when the lakes freeze solid, trucks drive north on roads made of ice.', 'The drivers go slowly. A fast truck can push a wave under the ice, and the wave can crack it.',
    'For a few weeks, the ice road brings fuel, food and building supplies to communities with no year-round road.', 'Then spring comes, the ice softens, and the road disappears until next year.'];
  var SCRIPT = ['NOOR: (whispering) Did you hear that?', 'KAI: Hear what? It is just the wind.', 'NOOR: No. Listen. Something is scratching at the door.', 'KAI: (slowly opening the door) It is... a very wet dog.', 'NOOR: (laughing) Well, let it in!'];

  Atlas.register('fluency', {
    full: true,
    lessons: [{
      id: 'phrasing', title: 'Phrasing and punctuation', sub: 'Read groups of words, and let the marks guide your voice.',
      concepts: [
        { slug: 'phrases', title: 'Read in meaningful phrases', exp: ['B2.3'], skill: 'phrases',
          model: [
            step(W.sent('The / old / canoe / drifted / slowly...'), 'Word by word is hard to follow.'),
            step(W.sent('The old canoe / drifted slowly / across the lake.'), 'Words that belong together.'),
            step(W.sent('After the storm, the whole town helped clean up.'), 'A new sentence.'),
            step(W.sent('After the storm, / the whole town / helped clean up.'), 'The comma marks one break.'),
            step(W.sent('After the / storm, the whole / town helped...'), 'Odd breaks blur the meaning.')
          ],
          guided: [function () { return phrasing(1); }, function () { return phraseBreak(1); }, phraseTf],
          check: [function () { return phrasing(2); }, phrasePick, function () { return phraseBreak(2); }, phraseTf, function () { return phrasing(2); }],
          coach: '<p>Mark phrase breaks with light pencil slashes on a photocopy, then read it aloud together.</p>',
          mistake: '<p>Pausing at the end of every line of print instead of at the end of an idea.</p>' },
        { slug: 'marks', title: 'Punctuation guides your voice', exp: ['B2.3'], skill: 'marks',
          model: [
            step(W.sent('Is the bus late<mark class="hl">?</mark>'), 'Rise at the end.'),
            step(W.sent('First<mark class="hl">,</mark> wash your hands.'), 'A short pause.'),
            step(W.sent('I opened the door and<mark class="hl">...</mark>'), 'Trail off.'),
            step(W.sent('Look at that moose<mark class="hl">!</mark>'), 'Strong and excited.'),
            step(W.sent('The lake was calm<mark class="hl">.</mark>'), 'Drop and stop.')
          ],
          guided: [function () { return voice(1); }, voiceMatch, voiceTf],
          check: [function () { return voice(2); }, voicePick, voiceTf, voiceMatch, function () { return voice(2); }],
          coach: '<p>Read a sentence aloud wrongly on purpose (no pause, flat question). Ask the child to fix it.</p>',
          mistake: '<p>Racing through commas. A comma is a short breath.</p>' }
      ]
    }, {
      id: 'expression', title: 'Pace and expression', sub: 'Change how you read to fit the purpose.',
      concepts: [
        { slug: 'pace', title: 'Purpose sets the pace', exp: ['B2.3'], skill: 'pace',
          model: [
            step(W.means('read', 'science steps'), 'Slow. Every detail matters.'),
            step(W.means('star', 'a comic for fun'), 'Quick and easy.'),
            step(W.means('think', 'a tense scene, aloud'), 'Slower, with pauses.'),
            step(W.means('screen', 'a bus schedule'), 'Skim fast, then slow down at your bus.'),
            step(W.means('talk', 'a poem to the class'), 'Steady, with the rhythm.')
          ],
          guided: [function () { return pace(1); }, paceTf, function () { return paceWhich(1); }],
          check: [function () { return pace(2); }, paceMatch, paceTf, function () { return paceWhich(2); }, function () { return pace(2); }],
          coach: '<p>Before reading, ask "Why am I reading this?" and agree on a pace together.</p>',
          mistake: '<p>Reading everything at one speed. Fast is not the same as fluent.</p>' },
        { slug: 'expression', title: 'Make the voice fit the words', exp: ['B2.3'], skill: 'expression',
          model: [
            step(W.sent('“Watch out for the ice!” <mark class="hl">shouted</mark> Omar.'), 'Loud and urgent.'),
            step(W.sent('“I miss Grandma,” <mark class="hl">whispered</mark> Hana.'), 'Soft and sad.'),
            step(W.sent('“Do I have to?” <mark class="hl">groaned</mark> Theo.'), 'Tired and unwilling.'),
            step(W.sent('“Is it really mine?” <mark class="hl">gasped</mark> Amara.'), 'Surprised and amazed.')
          ],
          guided: [function () { return express(1); }, expressTap, expressMatch],
          check: [function () { return express(2); }, expressTf, expressMatch, expressTap, function () { return express(2); }],
          coach: '<p>Take turns reading the same line in two ways. Ask: "Which one matches the word whispered?"</p>',
          mistake: '<p>Reading speech in a flat voice. Speaking words like groaned and cheered are stage directions.</p>' },
        { slug: 'stress', title: 'The stressed word changes the meaning', exp: ['B2.3'], skill: 'stress',
          model: [
            step(W.sent('<b>I</b> did not eat the last muffin.'), 'Someone else did.'),
            step(W.sent('I did not eat the <b>last</b> muffin.'), 'I ate a different one.'),
            step(W.sent('<b>Dad</b> made pancakes this morning.'), 'Not Grandpa.'),
            step(W.sent('Dad made <b>pancakes</b> this morning.'), 'Not waffles.')
          ],
          guided: [stress, function () { return stressMean(1); }, stressTf],
          check: [stress, stressMatch, function () { return stressMean(2); }, stressTf, stress],
          coach: '<p>Play with one sentence. Say it five ways, leaning on a different word each time, and talk about how the meaning changes.</p>',
          mistake: '<p>Stressing every word the same, so the reader’s meaning is lost.</p>' }
      ]
    }],
    practice: [
      { id: 'phrases', name: 'Meaningful phrases', code: 'B2.3', gen: phrasing },
      { id: 'marks', name: 'Punctuation and voice', code: 'B2.3', gen: voice },
      { id: 'pace', name: 'Pace for the purpose', code: 'B2.3', gen: pace },
      { id: 'expression', name: 'Expression', code: 'B2.3', gen: express },
      { id: 'stress', name: 'Stressing a word', code: 'B2.3', gen: stressMean }
    ],
    tasks: [
      { id: 'read-aloud', title: 'Read aloud', code: 'B2.3', pic: W.icon('read'), say: 'Read this aloud. Make it sound like a news reporter.', text: W.passage('', READ),
        run: ['The child reads the passage silently first.', 'Then they read it aloud. Listen for phrasing, pace and expression, and whether they fix their own slips.', 'Reread once more, aiming to sound like a calm news reporter.'],
        rubric: ['Word by word, with many errors.', 'Mostly accurate, but choppy or rushed.', 'Accurate, in phrases, at a steady pace.', 'Accurate and smooth, with expression that fits a news report.'] },
      { id: 'script', title: 'Read a short script', code: 'B2.3', pic: W.icon('talk'), say: 'Read Noor or Kai. Follow the stage directions.', text: W.passage('Something at the Door', SCRIPT),
        run: ['Take one part each. Read the script twice, then swap parts.', 'Point out the stage directions in brackets: they tell you how to say the line.'],
        rubric: ['Reads the lines flatly.', 'Some expression, misses directions.', 'Follows the directions with clear expression.', 'Uses voice, pace and pauses to bring the character to life.'] },
      { id: 'one-minute', title: 'A one-minute read', code: 'B2.3', pic: W.icon('star'), say: 'Read a page of your own book for one minute.',
        run: ['Choose a page from a book the child is reading. Time one minute while they read aloud.', 'Count the words read correctly. Write it down with the date.', 'Do it again in a few weeks with a new page. Look for smoother reading, not just more words.'],
        rubric: ['Many stops and errors.', 'Some smooth parts, some stops.', 'Mostly smooth and accurate.', 'Smooth, accurate and expressive throughout.'],
        coach: '<p>Speed is a by-product of fluent reading, never the goal. Praise phrasing and self-correction.</p>' }
    ]
  });

  Q.shapes('fluency', {
    phrases: [[1, 'tap-break', phraseBreak], [1, 'true-false', phraseTf], [2, 'pick', phrasePick]],
    marks: [[1, 'match', voiceMatch], [1, 'true-false', voiceTf], [2, 'pick', voicePick]],
    pace: [[1, 'true-false', paceTf], [1, 'which', paceWhich], [2, 'match', paceMatch]],
    expression: [[1, 'tap-word', expressTap], [1, 'match', expressMatch], [2, 'true-false', expressTf]],
    stress: [[1, 'tap', stress], [1, 'true-false', stressTf], [2, 'match', stressMatch]]
  });
})();
