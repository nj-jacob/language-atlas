/* Grade 8: reading strategies.
   Ontario 2023 Language, Grade 8, Strand C (Comprehension):
   C1.1 read and comprehend complex texts, using knowledge of words, grammar, cohesive ties and sentence structures
   C2.2 purposes for reading, and choosing texts that suit them       C2.3 predictions, and questions that confirm or refute them
   C2.4 strategies such as rereading, the glossary and references, to monitor understanding
   C2.5 connect and compare ideas across texts, experiences and the world
   C2.6 summarize and synthesize important ideas, and draw conclusions
   With a grown-up: C2.1 prior knowledge, C2.5 connections to lived experience, C2.7 which strategies helped, and goals.
   Passages are in ../texts.js. Answer checks: tests/verify/grade8-reading.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  function body(t) { return t.lines.filter(function (l) { return l.charAt(0) !== '#'; }); }

  /* cohesive ties: [passage, the line, the word, what it points back to, wrong answers] */
  var TIES = [[T.ferry, 2, 'She', 'Amira', ['her grandmother', 'the ferry']], [T.ferry, 4, 'his', 'the deckhand', ['Amira', 'the island']],
    [T.river, 3, 'them', 'Mr. Tremblay and Josée', ['the river and the bridge', 'the town and the wall']], [T.rooftop, 8, 'which', 'the vegetables', ['the classrooms', 'the neighbours']],
    [T.library, 1, 'This', 'closing the library at 6 p.m.', ['saving money', 'the town council']]];
  /* a prediction made part way, and whether the rest of the text confirms it */
  var CONFIRM = [[T.ferry, 4, 'Amira will miss the ferry.', false], [T.river, 3, 'The river will flood.', true], [T.captain, 1, 'The narrator will stay calm all game.', false],
    [T.rooftop, 3, 'The text will describe a solution to the problem.', true], [T.roads, 4, 'Warmer winters will cause problems for the roads.', true]];
  /* [a reading problem, the strategy that fits] */
  var FIX = [['You meet a word like "asphalt" and do not know it.', 'Check the glossary.'], ['You lose track of who is speaking.', 'Reread the last few lines.'],
    ['The text mentions an event you know nothing about.', 'Look it up in a reliable reference.'], ['You are not sure what the main point is.', 'Ask yourself a question and read on to answer it.']];
  /* [a purpose, the passage that suits it] */
  var PURPOSE = [['to learn how northern communities get supplies', T.roads], ['to enjoy a suspenseful story', T.river], ['to understand an argument about a town decision', T.library],
    ['to laugh at the way gadgets are sold', T.spoon], ['to learn how one school solved a problem', T.rooftop]];
  /* two passages: [a, b, an idea both share, ideas that are not in both] */
  var SYNTH = [[T.rooftop, T.roads, 'Communities are responding to problems caused by heat and a changing climate.', ['Rooftop gardens are the answer for every school.', 'Ice roads are used in Toronto.']],
    [T.ferry, T.river, 'Both stories use water to build tension about what will happen next.', ['Both stories are about floods.', 'Both stories are told by a narrator who cannot be trusted.']],
    [T.library, T.rooftop, 'Young people can help solve problems in their community.', ['Libraries should grow vegetables.', 'Schools should close at 6 p.m.']]];
  /* [a, b, true of both, true of only one] */
  var BOTH = [[T.rooftop, T.roads, 'It describes a problem and a response to it.', ['It takes place in a city.', 'It mentions frozen lakes.', 'It mentions a food bank.']],
    [T.ferry, T.river, 'It is told in the third person.', ['It has a character named Amira.', 'It takes place in April.', 'A deckhand helps a passenger.']]];

  /* ---------- question makers: comprehension ---------- */
  function fact(lv) {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts);
    return Q.one(f[0], f[1], f.slice(2, lv > 1 ? 4 : 3), { fig: T.show(t), prompt: 'Find the sentence that tells you.', hint: 'Look back in the text.', explain: 'The text says it: <mark class="hl">' + f[4] + '</mark>.', meta: { k: 'g8-fact', t: t.title, q: f[0] } });
  }
  function findLine() {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts), lines = body(t), right = lines.filter(function (l) { return l.indexOf(f[4]) >= 0; })[0];
    return Q.one('Which sentence answers this? <b>' + f[0] + '</b>', right, R.some(lines.filter(function (l) { return l !== right; }), 2), { fig: T.show(t),
      hint: 'Which sentence has the answer in it?', explain: W.sent(right), meta: { k: 'g8-find-line', t: t.title, q: f[0] } });
  }
  function factTf() {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts), right = R.int(0, 1) === 1, said = right ? f[1] : f[2];
    return { q: 'True or false, according to the text?', fig: T.show(t) + W.sent(f[0].replace(/\?$/, '') + ': <b>' + said + '</b>'), type: 'tf', answer: right,
      why: { options: ['The text says so, or says something different.', 'It sounds likely, so it must be true.'], answer: 0 }, hint: 'Check it against the text, not your memory.', explain: 'The text says: <mark class="hl">' + f[4] + '</mark>.', meta: { k: 'g8-fact-tf', t: t.title, q: f[0], said: said } };
  }
  function tie(lv) {
    var x = R.pick(TIES), line = x[0].lines[x[1]];
    return Q.one('In this sentence, what does <b>' + x[2] + '</b> refer to?', x[3], x[4].slice(0, lv > 1 ? 2 : 1), { fig: T.show(x[0]) + W.sent(line.replace(new RegExp('\\b' + x[2] + '\\b'), '<mark class="hl">' + x[2] + '</mark>')),
      prompt: 'Look back for the noun or idea the word stands for.', hint: 'Words like she, his, them, which and this point back to something already named.', explain: '<b>' + x[2] + '</b> refers to <b>' + x[3] + '</b>.', meta: { k: 'g8-tie', t: x[0].title, w: x[2], line: x[1] } });
  }

  /* ---------- strategies ---------- */
  function predict() {
    var t = R.pick(T.list('predict')), p = t.predict;
    return Q.one('What will <b>most likely</b> happen next?', p.right, p.wrong, { fig: T.show(t, p.upTo), prompt: 'Use what you know and a clue from the text.',
      hint: 'Which words point to what happens next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g8-predict', t: t.title } });
  }
  function confirm() {
    var c = R.pick(CONFIRM), t = c[0];
    return Q.tiles('Part way through, a reader predicted: <b>' + c[2] + '</b> Read the whole text. Is the prediction confirmed or refuted?', c[3] ? 'confirmed' : 'refuted', [c[3] ? 'refuted' : 'confirmed'], {
      fig: T.show(t), hint: 'Find the part of the text that answers the prediction.', explain: c[3] ? 'The text confirms it.' : 'The text shows something different, so revise the prediction.', meta: { k: 'g8-confirm', t: t.title, p: c[2] } });
  }
  function fixUp(lv) {
    var f = R.pick(FIX);
    return Q.one('What should you do?', f[1], R.some(FIX.filter(function (x) { return x !== f; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }).concat(lv > 1 ? ['Skip it and keep reading.'] : []), {
      fig: W.means('think', f[0]), hint: 'Match the strategy to the problem.', explain: f[1], meta: { k: 'g8-fix', p: f[0] } });
  }
  function purpose(lv) {
    var p = R.pick(PURPOSE);
    return Q.tiles('Which text would you choose <b>' + p[0] + '</b>?', p[1].title, R.some(PURPOSE.filter(function (x) { return x !== p; }), lv > 1 ? 3 : 2).map(function (x) { return x[1].title; }), {
      hint: 'Think about what kind of text each title suggests.', explain: '<b>' + p[1].title + '</b> is ' + (p[1].kind === 'information text' ? 'an information text' : 'a ' + p[1].kind) + '.', meta: { k: 'g8-choose-text', purpose: p[0] } });
  }
  function matchFix() {
    var fs = R.some(FIX, 3);
    return { q: 'Match each problem to the strategy that fits.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Which strategy solves which problem?', explain: 'Good readers notice when they are lost and choose a fix.', meta: { k: 'g8-match-fix' } };
  }

  /* ---------- summarize, synthesize, compare ---------- */
  function summary(lv) {
    var t = R.pick(T.list('summary'));
    return Q.one('Which is the best <b>summary</b>?', t.summary[0], t.summary.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'A summary covers the whole text, briefly, without your opinion.',
      hint: 'Not one detail. Not an opinion.', explain: t.summary[0], meta: { k: 'g8-summary', t: t.title } });
  }
  function synth() {
    var s = R.pick(SYNTH);
    return Q.one('Read both. Which idea do they <b>share</b>?', s[2], s[3], { fig: T.show(s[0]) + T.show(s[1]), prompt: 'Look for an idea that fits both texts.',
      hint: 'Synthesizing means combining ideas from two texts into one new understanding.', explain: s[2], meta: { k: 'g8-synth', a: s[0].title } });
  }
  function both(lv) {
    var b = R.pick(BOTH);
    return Q.one('Which is true of <b>both</b> texts?', b[2], R.some(b[3], lv > 1 ? 3 : 2), { fig: T.show(b[0]) + T.show(b[1]), hint: 'Check each answer against both texts.', explain: b[2], meta: { k: 'g8-both', a: b[0].title } });
  }
  function summaryTf() {
    var t = R.pick(T.list('summary')), i = R.int(0, 2), right = R.int(0, 1) === 1, said = right === (i === 0) ? 'a good summary' : 'not a good summary';
    return { q: Q.name() + ' says this is <b>' + said + '</b>.', fig: T.show(t) + W.sent(t.summary[i]), type: 'tf', answer: right,
      why: { options: [i === 0 ? 'It covers the whole text briefly.' : i === 1 ? 'It gives only one detail.' : 'It gives an opinion that is not in the text.', 'Any sentence about the text is a summary.'], answer: 0 },
      hint: 'Does it cover the whole text, without opinion?', explain: t.summary[0], meta: { k: 'g8-summary-tf', t: t.title, s: t.summary[i], said: said } };
  }

  var F = T.ferry;
  Atlas.register('reading', {
    lessons: [{
      id: 'understand', title: 'Reading closely', sub: 'Details, and the words that tie a text together.',
      concepts: [
        { slug: 'details', title: 'Find the answer in the text', exp: ['C1.1'], skill: 'comprehension',
          model: [
            step(T.show(F), 'Read it once for the story.'),
            step(W.sent(F.facts[0][0]), 'A question.'),
            step(W.sent('She pictured <mark class="hl">her grandmother waiting</mark> on the island dock…'), 'Look back. The answer is there.')
          ],
          guided: [function () { return fact(1); }, findLine],
          check: [function () { return fact(2); }, factTf],
          coach: '<p>Insist on "show me where it says that". Pointing to the line is how strong readers check themselves.</p>',
          mistake: '<p>Answering from memory or what seems likely. Check the text.</p>' },
        { slug: 'ties', title: 'Small words point back', exp: ['C1.1'], skill: 'comprehension',
          model: [
            step(W.sent('<b>Amira</b> ran down the hill.'), 'A name.'),
            step(W.sent('<mark class="hl">She</mark> pictured her grandmother.'), '<b>She</b> points back to Amira.'),
            step(W.tile('she') + ' ' + W.tile('his') + ' ' + W.tile('them') + ' ' + W.tile('which') + ' ' + W.tile('this'), 'These tie sentences together.')
          ],
          guided: [function () { return tie(1); }, function () { return tie(1); }],
          check: [function () { return tie(2); }, function () { return tie(2); }],
          coach: '<p>In hard texts, have the child draw an arrow from each "it", "they" or "this" back to what it means.</p>',
          mistake: '<p>Linking a pronoun to the nearest noun instead of the right one.</p>' }
      ]
    }, {
      id: 'strategies', title: 'Reading strategies', sub: 'Predict, check, fix, and choose.',
      concepts: [
        { slug: 'predict', title: 'Predict, then confirm or refute', exp: ['C2.3'], skill: 'strategies',
          model: [
            step(T.show(F, 4), 'The ramp is rising…'),
            step(W.means('think', 'She will miss it.'), 'A prediction.'),
            step(W.sent('A deckhand spotted her… the ramp slowly lowered again.'), 'Refuted. Revise and read on.')
          ],
          guided: [predict, confirm],
          check: [predict, confirm],
          coach: '<p>Predictions are not about being right. Praise the child for changing a prediction when the text says otherwise.</p>',
          mistake: '<p>Holding on to a prediction after the text has refuted it.</p>' },
        { slug: 'monitor', title: 'Notice when you are lost, and fix it', exp: ['C2.4'], skill: 'strategies',
          model: [
            step(W.means('think', 'What is asphalt?'), 'Check the glossary.'),
            step(W.means('again', 'Who is speaking?'), 'Reread the last few lines.'),
            step(W.means('read', 'What happened in 1850?'), 'Look it up in a reliable reference.')
          ],
          guided: [function () { return fixUp(1); }, matchFix],
          check: [function () { return fixUp(2); }, matchFix],
          coach: '<p>Model it aloud as you read: "Wait, I lost the thread. Let me reread."</p>',
          mistake: '<p>Reading to the end of the page while confused, hoping it will clear up.</p>' },
        { slug: 'purpose', title: 'Choose a text that suits your purpose', exp: ['C2.2'], skill: 'strategies',
          model: [
            step(W.means('think', 'to learn how northern communities get supplies')),
            step(W.tile(T.roads.title), 'An information text: it fits.'),
            step(W.tile(T.spoon.title), 'Satire: for a different purpose.')
          ],
          guided: [function () { return purpose(1); }, function () { return purpose(1); }],
          check: [function () { return purpose(2); }, function () { return purpose(2); }],
          coach: '<p>At the library, give the child a purpose ("find out how bridges are built") and have them justify the book they choose.</p>',
          mistake: '<p>Choosing a text by its cover rather than its purpose and creator.</p>' }
      ]
    }, {
      id: 'summarize', title: 'Summarize and synthesize', sub: 'The whole text in brief, and ideas across texts.',
      concepts: [
        { slug: 'summary', title: 'A summary covers the whole text, briefly', exp: ['C2.6'], skill: 'summarize',
          model: [
            step(W.sent(F.summary[1]), 'Only a detail.'),
            step(W.sent(F.summary[2]), 'An opinion, not in the text.'),
            step(W.sent(F.summary[0]), 'Who, what, and how it ends.')
          ],
          guided: [function () { return summary(1); }, summaryTf],
          check: [function () { return summary(2); }, summaryTf],
          coach: '<p>Limit a summary to one or two sentences. Ask: "Would someone who has not read it understand the whole thing?"</p>',
          mistake: '<p>Retelling every event, or adding an opinion.</p>' },
        { slug: 'synthesize', title: 'Combine ideas from two texts', exp: ['C2.5', 'C2.6'], skill: 'summarize',
          model: [
            step(W.tile(T.rooftop.title) + ' ' + W.tile(T.roads.title), 'Two different texts.'),
            step(W.means('think', 'heat → a garden. Warm winters → new roads.'), 'Each one: a problem and a response.'),
            step(W.sent(SYNTH[0][2]), 'One idea that covers both.')
          ],
          guided: [synth, function () { return both(1); }],
          check: [synth, function () { return both(2); }],
          coach: '<p>After reading two texts on a topic, ask: "What do you understand now that neither text said on its own?"</p>',
          mistake: '<p>Summarizing each text separately instead of combining them.</p>' }
      ]
    }],
    practice: [
      { id: 'comprehension', name: 'Reading closely', code: 'C1.1', gen: fact },
      { id: 'strategies', name: 'Reading strategies', code: 'C2.2, C2.3, C2.4', gen: predict },
      { id: 'summarize', name: 'Summarize, synthesize and compare', code: 'C2.5, C2.6', gen: summary }
    ],
    tasks: [
      { id: 'prior', title: 'What do I already know?', code: 'C2.1', pic: W.icon('think'), say: 'Before you read, list what you already know about the topic, from life and other subjects.', write: true,
        run: ['Choose a non-fiction article or chapter.', 'Before reading, the child lists what they already know from experience, other subjects and other texts.', 'After reading, ask: "Which of those helped you understand it? What did you have to change?"'],
        rubric: ['Lists little.', 'Lists some knowledge with prompting.', 'Explains how prior knowledge helped understanding.', 'Draws on several sources and explains exactly how each one helped.'] },
      { id: 'connect', title: 'Text, me and the world', code: 'C2.5', pic: W.icon('people'), say: 'How does this text connect to your life, another text, and the world?', write: true,
        run: ['After reading one of the passages in this chapter, the child writes one connection to their own life, one to another text, and one to the world.', 'Discuss: "How is it similar? How is it different?"'],
        rubric: ['No real connection.', 'A connection with little explanation.', 'Clear connections, with how they are alike and different.', 'Thoughtful connections that deepen understanding of the text.'] },
      { id: 'strategy-goal', title: 'My reading strategies', code: 'C2.7', pic: W.icon('star'), say: 'Which strategy helped most this week? Which will you work on next?', write: true,
        run: ['Review the strategies: predicting, visualizing, rereading, asking questions, summarizing, connecting.', 'The child compares two that helped with different texts and sets a goal for one to improve.'],
        rubric: ['Cannot name a strategy.', 'Names a strategy that helped.', 'Compares two strategies and sets a goal.', 'Explains why each strategy suited each text, and sets a specific, realistic goal.'] }
    ]
  });

  Q.shapes('reading', {
    comprehension: [[1, 'find-line', findLine], [1, 'ties', tie], [2, 'true-false', factTf]],
    strategies: [[1, 'confirm', confirm], [1, 'fix-up', fixUp], [1, 'choose-text', purpose], [2, 'match', matchFix]],
    summarize: [[1, 'synthesize', synth], [1, 'both', both], [2, 'true-false', summaryTf]]
  });
})();
