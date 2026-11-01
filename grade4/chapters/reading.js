/* Grade 4: reading for meaning. A full chapter: every idea has two worked examples, three questions together and five on
   your own, its own practice skill asked in four or more ways, and the chapter has "Read and answer" sets.
   Ontario 2023 Language, Grade 4, Strand C (Comprehension):
   C1.1 read and comprehend various texts               C1.2 characteristics of text forms and genres, and how they help communicate meaning
   C1.6 the narrator's point of view (first, second or third person), and the advantages and disadvantages of each
   C2.2 purposes for reading, and choosing texts that suit them    C2.3 predictions from evidence, and questions to check them
   C2.4 strategies to monitor and confirm understanding (adjusting rate, visualizing, reading ahead, asking questions, consulting references)
   C2.6 the main idea and supporting details in sequence, and a simple conclusion
   With a grown-up: C1.7 texts by First Nations, Metis and Inuit creators, C2.1 prior knowledge, C2.5 connections, C2.7 which strategies helped.
   Passages are in ../texts.js. Answer checks: tests/verify/grade4-reading.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts, AP = '’', Q1 = '“', Q2 = '”';
  function q(s) { return Q1 + s + Q2; }
  /* the passage to use: the one given (in a "Read and answer" set), or one that has what the question needs, sized for the level */
  function text(need, lv, t) { return t && t[need] ? t : R.pick(T.list(need, lv)); }
  function at(t, words) { for (var i = 0; i < t.lines.length; i++) if (t.lines[i] && t.lines[i].charAt(0) !== '#' && t.lines[i].indexOf(words) >= 0) return i; return -1; }
  function line(t, words) { return t.lines[at(t, words)]; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- find it in the text (C1.1) ---------- */
  function fact(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    return Q.one(f[0], f[1], f.slice(2, lv > 1 ? 4 : 3), { fig: T.show(t), prompt: 'Find the sentence that tells you.', hint: 'Look back in the text. The answer is there.',
      explain: 'The text says: ' + q(line(t, f[4])), meta: { k: 'g4-fact', t: t.title, q: f[0] } });
  }
  function evidence(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var i = at(t, f[4]);
    return { q: 'Tap the sentence that answers: <b>' + f[0] + '</b>', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which words in the question can you find in the text?', hint: 'Find the question words in the text. Read that sentence.', explain: 'It tells you: <b>' + f[1] + '</b>.',
      meta: { k: 'g4-tap-fact', t: t.title, q: f[0] } };
  }
  function findLine(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var right = line(t, f[4]), others = T.body(t).filter(function (l) { return l !== right; });
    return Q.one('Which sentence answers this? <b>' + f[0] + '</b>', right, R.some(others, lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Which sentence has the answer in it?', explain: W.sent(right), meta: { k: 'g4-find-line', t: t.title, q: f[0] } });
  }
  function factTf(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(f.slice(2, 4));
    return { q: f[0] + '<br>' + Q.name() + ' says: <b>' + said + '</b>.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['The text says so.', 'The text says something else.'], answer: right ? 0 : 1 },
      hint: 'Find the sentence that answers the question.', explain: 'The text says: ' + q(line(t, f[4])), meta: { k: 'g4-read-fact-tf', t: t.title, q: f[0], said: said } };
  }

  /* ---------- the main idea and its details (C2.6) ---------- */
  function mainIdea(lv, t) {
    t = text('main', lv, t);
    return Q.one('What is this text <b>mostly</b> about?', t.main[0], t.main.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which answer fits the whole text, not just one part?',
      hint: 'The main idea is about the whole text.', explain: W.web(t.main[0], ['every part']), meta: { k: 'g4-main', t: t.title } });
  }
  function support(lv, t) {
    t = text('details', lv, t);
    return Q.one('Which detail <b>holds up</b> the main idea?', R.pick(t.details.yes), R.some(t.details.no, lv > 1 ? 3 : 2), { fig: T.show(t) + W.web(t.main[0], [W.gap(), W.gap()]),
      prompt: 'Is it in the text? Does it tell more about the main idea?', hint: 'A supporting detail comes from the text and tells more about the main idea.',
      explain: 'It comes from the text and holds up the roof.', meta: { k: 'g4-support', t: t.title } });
  }
  function supportPick(lv, t) {
    t = text('details', lv, t);
    return Q.all('Pick every detail that holds up the main idea.', R.some(t.details.yes, 2), R.some(t.details.no, 2), { fig: T.show(t) + W.web(t.main[0], [W.gap(), W.gap()]),
      hint: 'Is it in the text? Does it tell more about the main idea?', explain: 'Supporting details come from the text.', meta: { k: 'g4-support-pick', t: t.title } });
  }
  function detailOdd(lv, t) {
    t = text('details', lv, t);
    return Q.one('Which one does <b>not</b> hold up the main idea?', R.pick(t.details.no), R.some(t.details.yes, lv > 1 ? 3 : 2), { fig: T.show(t) + W.web(t.main[0], [W.gap(), W.gap()]),
      prompt: 'Which one is not in the text?', hint: 'Find each one in the text. One of them is not there.', explain: 'It may be true, but it is not in the text, so it does not hold up the roof.', meta: { k: 'g4-detail-odd', t: t.title } });
  }
  function mainTf(lv, t) {
    t = text('main', lv, t);
    var right = R.int(0, 1) === 1, said = right ? t.main[0] : t.main[1];
    return { q: Q.name() + ' says the text is mostly about this:', fig: W.sent(said) + T.show(t), type: 'tf', answer: right,
      why: { options: ['It fits the whole text.', 'It is only one small part, or not in the text.'], answer: right ? 0 : 1 },
      hint: 'Does it cover every part of the text?', explain: 'The main idea: ' + t.main[0], meta: { k: 'g4-main-tf', t: t.title, said: said } };
  }

  /* ---------- retell it in order (C2.6) ---------- */
  function events(t, lv) { return t.order.length > 3 && lv < 2 ? t.order.slice(0, 3) : t.order.slice(0, 5); }
  function sequence(lv, t) {
    t = text('order', lv, t);
    return { q: 'Put these in the order they happen in the text.', fig: T.show(t), type: 'order', items: events(t, lv).map(q), first: 'First', last: 'Last',
      hint: 'Find each part in the text. Which comes first?', explain: W.chain(events(t, lv).map(q)), meta: { k: 'g4-order', t: t.title } };
  }
  function longOrder(lv, t) { return t && t.order && t.order.length >= 4 ? t : R.pick(T.list('order', lv).filter(function (x) { return x.order.length >= 4; })); }
  function firstLast(lv, t) {
    t = longOrder(lv, t);
    var ev = events(t, 2), idx = R.some(ev.map(function (e, i) { return i; }), 3).sort(), first = R.int(0, 1) === 1, right = ev[first ? idx[0] : idx[2]];
    return Q.tiles('Which happened <b>' + (first ? 'first' : 'last') + '</b>?', q(right), idx.map(function (i) { return q(ev[i]); }).filter(function (x) { return x !== q(right); }), { fig: T.show(t),
      hint: 'Find each one in the text. Which comes ' + (first ? 'before' : 'after') + ' the others?', explain: W.chain(idx.map(function (i) { return q(ev[i]); })), meta: { k: 'g4-first-last', t: t.title, first: first } });
  }
  function after(lv, t) {
    t = longOrder(lv, t);
    var ev = events(t, 2), i = R.int(0, ev.length - 2), wrong = ev.filter(function (e, j) { return j !== i && j !== i + 1; });
    return Q.one('What happens <b>right after</b> this? ' + q(ev[i]), q(ev[i + 1]), R.some(wrong, 2).map(q), { fig: T.show(t), prompt: 'Find it in the text. Read the next part.',
      hint: 'Find it in the text, then read on.', explain: W.chain([q(ev[i]), q(ev[i + 1])], ['Then', 'Next']), meta: { k: 'g4-after', t: t.title, ev: ev[i] } });
  }
  function storyMap(lv, t) {
    t = longOrder(lv, t);
    var ev = events(t, 2), i = R.int(1, ev.length - 2), other = R.pick(T.list('order').filter(function (x) { return x !== t; }));
    return Q.one('What goes in the empty box?', q(ev[i]), R.some(other.order, 2).map(q), { fig: W.chain([q(ev[i - 1]), W.gap(), q(ev[i + 1])]) + T.show(t),
      hint: 'What happens between the two boxes?', explain: W.chain([q(ev[i - 1]), q(ev[i]), q(ev[i + 1])]), meta: { k: 'g4-map', t: t.title } });
  }

  /* ---------- draw a conclusion (C2.6) ---------- */
  function conclude(lv, t) {
    t = text('conclusion', lv, t);
    return Q.one('What can you <b>conclude</b> from this text?', t.conclusion[0], t.conclusion.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which one do the clues in the text add up to?',
      hint: 'A conclusion is what the facts and clues add up to.', explain: W.means('think', t.conclusion[0]) + ' The clue: <mark class="hl">' + t.conclusion[3] + '</mark>.', meta: { k: 'g4-conclude', t: t.title } });
  }
  function concludeTap(lv, t) {
    t = text('conclusion', lv, t);
    var i = at(t, t.conclusion[3]);
    return { q: 'You conclude: <b>' + t.conclusion[0] + '</b> Tap the sentence that backs it up.', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which sentence is a clue for it?', hint: 'Which sentence makes you think so?', explain: 'The clue: <mark class="hl">' + t.conclusion[3] + '</mark>.', meta: { k: 'g4-conclude-tap', t: t.title } };
  }
  function concludeWhy(lv, t) {
    t = text('conclusion', lv, t);
    var right = line(t, t.conclusion[3]), others = T.body(t).filter(function (l) { return l !== right; });
    return Q.one('You conclude: <b>' + t.conclusion[0] + '</b> Which sentence backs it up best?', right, R.some(others, lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Which sentence is a clue that leads to the conclusion?', explain: W.sent(right), meta: { k: 'g4-conclude-why', t: t.title } });
  }
  function concludeTf(lv, t) {
    t = text('conclusion', lv, t);
    var right = R.int(0, 1) === 1, said = right ? t.conclusion[0] : R.pick(t.conclusion.slice(1, 3));
    return { q: Q.name() + ' concludes: <b>' + said + '</b>', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['Clues in the text add up to it.', 'Nothing in the text backs it up.'], answer: right ? 0 : 1 },
      hint: 'Can you find a clue in the text for it?', explain: 'A fair conclusion: ' + t.conclusion[0], meta: { k: 'g4-conclude-tf', t: t.title, said: said } };
  }

  /* ---------- predict, then check (C2.3) ---------- */
  function predict(lv, t) {
    t = text('predict', lv, t); var p = t.predict;
    return Q.one('What will <b>most likely</b> happen next?', p.right, p.wrong.slice(0, lv > 1 ? 2 : 1), { fig: T.show(t, p.stop), prompt: 'Look for a clue: <b>' + p.clue + '</b>.',
      hint: 'Use a clue from the text and what you know.', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g4-predict', t: t.title } });
  }
  function clueTap(lv, t) {
    t = text('predict', lv, t); var p = t.predict, i = at(t, p.clue);
    return { q: 'You predict: <b>' + p.right + '</b> Tap the sentence with the clue.', type: 'tap', pic: T.show(t, p.stop, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which sentence makes you think so?', hint: 'Which sentence points to what happens next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g4-clue-tap', t: t.title } };
  }
  function predictTf(lv, t) {
    t = text('predict', lv, t); var p = t.predict, right = R.int(0, 1) === 1, said = right ? p.right : R.pick(p.wrong);
    return { q: Q.name() + ' predicts: <b>' + said + '</b>', fig: T.show(t, p.stop), type: 'tf', answer: right,
      why: { options: ['A clue in the text points to it.', 'Nothing in the text points to it.'], answer: right ? 0 : 1 },
      hint: 'Is there a clue in the text?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g4-predict-tf', t: t.title, said: said } };
  }
  function checkPredict(lv, t) {
    t = text('predict', lv, t);
    var others = T.list('predict').filter(function (x) { return x !== t; }).map(function (x) { return x.predict.check; });
    return Q.one('You predict: <b>' + t.predict.right + '</b> After you read on, which question checks your prediction?', t.predict.check, R.some(others, lv > 1 ? 2 : 1), { fig: T.show(t, t.predict.stop),
      hint: 'The question should ask about what you predicted.', explain: 'Read on, then ask: <b>' + t.predict.check + '</b>', meta: { k: 'g4-check-predict', t: t.title } });
  }

  /* ---------- fix it when you are lost (C2.4) ---------- */
  /* [a moment while reading, the strategy that fits, the same two said short for matching, its picture] */
  var FIX = [['You do not know what <b>migrate</b> means, and the text does not say.', 'Look it up in a glossary or dictionary.', 'A word the text never explains', 'Look it up', 'read'],
    ['A part is packed with new facts.', 'Slow down and reread it.', 'Lots of new facts', 'Slow down, reread', 'again'],
    ['You cannot picture the place in the story.', 'Make a picture in your mind.', 'Cannot picture it', 'Make a mind picture', 'think'],
    ['A word is new, but the next sentence might explain it.', 'Read ahead to see if it is explained.', 'Explained later?', 'Read ahead', 'read'],
    ['You want to know more than the text says.', 'Check another book or website.', 'Want to know more', 'Check another source', 'screen'],
    ['You are confused about why a character did something.', 'Ask a question and look for the answer.', 'Confused about why', 'Ask a question', 'talk'],
    ['You read fast and cannot remember the last page.', 'Stop and tell yourself what just happened.', 'Cannot remember it', 'Retell it to yourself', 'talk'],
    ['A chart in the text is confusing.', 'Read its title and labels slowly.', 'A confusing chart', 'Read the labels', 'screen']];
  var NOFIX = ['Skip the hard part and hope it makes sense.', 'Read even faster.', 'Stop reading for good.', 'Guess and keep going without checking.', 'Close the book and pick a new one.'];
  function monitor(lv) {
    var f = R.pick(FIX);
    return Q.one('What could you do?', f[1], R.some(FIX.filter(function (x) { return x !== f; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }).concat(lv > 2 ? [R.pick(NOFIX)] : []), { fig: W.means(f[4], f[0]),
      prompt: 'What is the problem: a word, a fact, a picture, or a reason?', hint: 'Match the fix to the problem.', explain: f[1], meta: { k: 'g4-monitor', s: f[0] } });
  }
  function monitorMatch(lv) {
    var fs = R.some(FIX, lv > 1 ? 4 : 3);
    return { q: 'Match each problem to a strategy that fixes it.', type: 'match', pairs: fs.map(function (f) { return [f[2], f[3]]; }), hint: 'What is each problem about?', explain: 'Good readers notice when they are lost, and fix it.', meta: { k: 'g4-monitor-match' } };
  }
  function fixUp() {
    return Q.all('Reading gets hard. Pick every good idea.', R.some(FIX, 2).map(function (f) { return f[1]; }), R.some(NOFIX, 2), {
      hint: 'Good readers slow down and check.', explain: 'Slow down, reread, picture it, read ahead, ask a question, or look it up.', meta: { k: 'g4-fix-up' } });
  }
  function monitorTf() {
    var right = R.int(0, 1) === 1, f = R.pick(FIX), other = R.pick(FIX.filter(function (x) { return x[1] !== f[1]; })), said = right ? f[1] : R.pick([other[1], R.pick(NOFIX)]), n = Q.name();
    return { q: n + ' has a problem while reading. ' + n + ' decides: <b>' + said + '</b>', fig: W.means(f[4], f[0]), type: 'tf', answer: right,
      why: { options: ['It fixes this problem.', 'It does not fix this problem.'], answer: right ? 0 : 1 },
      hint: 'Will it help with this problem?', explain: 'For this problem: ' + f[1], meta: { k: 'g4-monitor-tf', s: f[0], said: said } };
  }
  function whichProblem(lv) {
    var f = R.pick(FIX);
    return Q.one('When would you use this strategy?', f[0], R.some(FIX.filter(function (x) { return x[1] !== f[1]; }), lv > 1 ? 2 : 1).map(function (x) { return x[0]; }), { fig: W.means(f[4], f[1]),
      hint: 'What problem does it fix?', explain: f[1] + ' fits when: ' + f[0], meta: { k: 'g4-which-problem', fix: f[1] } });
  }

  /* ---------- choose a text for your purpose (C2.2) ---------- */
  var PURPOSE = { story: 'to enjoy a story', fable: 'to learn a lesson from a story', information: 'to learn facts', poem: 'to enjoy a poem', instructions: 'to learn how to do something', letter: 'to hear an opinion' };
  var KINDS = Object.keys(PURPOSE);
  function oneOfEach(n) { return R.some(KINDS, n).map(function (k) { return R.pick(T.list('kind').filter(function (t) { return t.kind === k; })); }); }
  function choose(lv) {
    var topic = R.int(0, 1) === 1;
    if (topic) {
      var info = T.list('topic'), t = R.pick(info);
      return Q.tiles('You want to learn about <b>' + t.topic + '</b>. Which would you choose?', t.title, R.some(info.filter(function (x) { return x !== t; }), lv > 1 ? 2 : 1).map(function (x) { return x.title; }), {
        hint: 'Which title is about that topic?', explain: '<b>' + t.title + '</b> is about ' + t.topic + '.', meta: { k: 'g4-choose-topic', want: t.topic } });
    }
    var ts = oneOfEach(lv > 1 ? 3 : 2), want = ts[0];
    return Q.tiles('You want <b>' + want.purpose + '</b>. Which would you choose?', want.title, ts.slice(1).map(function (x) { return x.title; }), {
      hint: 'What kind of text does each title sound like?', explain: 'You read <b>' + want.title + '</b> ' + want.purpose + '.', meta: { k: 'g4-choose', want: want.purpose } });
  }
  function purpose(lv, t) {
    t = text('purpose', lv, t);
    return Q.one('Why would you read this?', t.purpose, R.some(KINDS.filter(function (k) { return PURPOSE[k] !== t.purpose; }).map(function (k) { return PURPOSE[k]; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Is it a story, a fable, facts, steps, a poem, or someone' + AP + 's opinion?', explain: 'You would read it <b>' + t.purpose + '</b>.', meta: { k: 'g4-purpose', t: t.title } });
  }
  function purposeTf(lv, t) {
    t = text('purpose', lv, t);
    var right = R.int(0, 1) === 1, said = right ? t.purpose : PURPOSE[R.pick(KINDS.filter(function (k) { return PURPOSE[k] !== t.purpose; }))];
    return { q: Q.name() + ' says: I would read this <b>' + said + '</b>.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['That is what this kind of text is for.', 'This kind of text is for something else.'], answer: right ? 0 : 1 },
      hint: 'What kind of text is it?', explain: 'You read it <b>' + t.purpose + '</b>.', meta: { k: 'g4-purpose-tf', said: said } };
  }
  function matchPurpose() {
    var ts = oneOfEach(3);
    return { q: 'Match each text to why you would read it.', type: 'match', pairs: ts.map(function (t) { return [t.title, t.purpose.replace(/^to /, '')]; }), hint: 'What kind of text is each one?',
      explain: 'The title is a clue to the kind of text, and the kind tells you why you would read it.', meta: { k: 'g4-match-purpose' } };
  }

  /* ---------- each kind of text has its features (C1.2) ---------- */
  var FEATURE = { story: 'characters, a problem and events', fable: 'animals who act like people, and a lesson', information: 'headings and facts', poem: 'short lines and pictures in words',
    instructions: 'materials and numbered steps', letter: 'a greeting and a closing' };
  /* how a feature helps the reader */
  var HELP = { story: 'You follow the problem to see how it ends.', fable: 'You look for the lesson at the end.', information: 'Headings tell you where to find each fact.',
    poem: 'Short lines make you slow down and picture it.', instructions: 'The numbers tell you what to do first.', letter: 'The greeting tells you who it is for.' };
  function kindOf(lv, t) { return text('kind', lv, t); }
  function form(lv, t) {
    t = kindOf(lv, t);
    return Q.tiles('What kind of text is this?', t.kind, R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Look at how it is built: headings, steps, "Dear", short lines, or talking animals?', explain: 'It has ' + FEATURE[t.kind] + ': a <b>' + t.kind + '</b>.', meta: { k: 'g4-form', t: t.title } });
  }
  function formFeature(lv) {
    var ks = R.some(KINDS, lv > 1 ? 4 : 3);
    return { q: 'Match each kind of text to what it usually has.', type: 'match', pairs: ks.map(function (k) { return [k, FEATURE[k]]; }), hint: 'Picture one of each.', explain: 'Each kind of text has its own features.', meta: { k: 'g4-form-feature' } };
  }
  function formHelp(lv, t) {
    t = kindOf(lv, t);
    return Q.one('How does the way this text is built help you read it?', HELP[t.kind], R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 2 : 1).map(function (k) { return HELP[k]; }), { fig: T.show(t),
      hint: 'What kind of text is it? What does that kind always have?', explain: 'A ' + t.kind + ' has ' + FEATURE[t.kind] + '. ' + HELP[t.kind], meta: { k: 'g4-form-help', t: t.title } });
  }
  function formTf(lv, t) {
    t = kindOf(lv, t);
    var right = R.int(0, 1) === 1, other = R.pick(KINDS.filter(function (k) { return k !== t.kind; })), said = right ? t.kind : other, why = R.shuffle(['It has ' + FEATURE[t.kind] + '.', 'It has ' + FEATURE[other] + '.']);
    return { q: Q.name() + ' says this is a <b>' + said + '</b>.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: why, answer: why.indexOf('It has ' + FEATURE[t.kind] + '.') },
      hint: 'Look at how it is built.', explain: 'It is a <b>' + t.kind + '</b>: it has ' + FEATURE[t.kind] + '.', meta: { k: 'g4-form-tf', t: t.title, said: said } };
  }

  /* ---------- first, second or third person (C1.6) ---------- */
  var POV = { first: 'first person (I)', second: 'second person (you)', third: 'third person (he, she, they)' };
  function stories() { return T.list('pov').filter(function (t) { return t.kind === 'story' || t.kind === 'fable'; }); }
  function story(lv, t) { return t && (t.kind === 'story' || t.kind === 'fable') ? t : R.pick(stories()); }
  /* outside speech marks, the word that shows who is telling the story */
  function povWord(t) {
    var said = T.body(t).join(' ').replace(/“[^”]*”/g, '');
    if (t.pov === 'first') return 'I';
    if (t.pov === 'second') return 'You';
    return ['She', 'He', 'They'].filter(function (w) { return new RegExp('\\b' + w + '\\b', 'i').test(said); })[0];
  }
  function narrator(lv, t) {
    t = story(lv, t);
    return { q: 'Who is telling this story?', fig: T.show(t), type: 'tap', tiles: [POV.first, POV.second, POV.third], answer: ['first', 'second', 'third'].indexOf(t.pov), answerText: POV[t.pov],
      prompt: 'Look at the words outside the speech marks: I, you, or he, she and they?', hint: 'I: first. You: second. He, she, they: third.', explain: 'The narrator says <b>' + povWord(t).toLowerCase() + '</b>: ' + POV[t.pov] + '.', meta: { k: 'g4-narrator', t: t.title } };
  }
  function narratorWord(lv, t) {
    t = story(lv, t);
    var w = povWord(t), wrong = { first: ['You', 'They'], second: ['I', 'He'], third: ['I', 'You'] }[t.pov];
    return Q.tiles('Which word shows this story is told in the <b>' + t.pov + ' person</b>?', w, wrong, { fig: T.show(t),
      hint: 'First person: I, me, my. Second: you, your. Third: he, she, they.', explain: 'The narrator uses <b>' + w + '</b>.', meta: { k: 'g4-narrator-word', t: t.title } });
  }
  function narratorTf(lv, t) {
    t = story(lv, t);
    var right = R.int(0, 1) === 1, said = right ? t.pov : R.pick(['first', 'second', 'third'].filter(function (p) { return p !== t.pov; }));
    return { q: Q.name() + ' says this story is told in the <b>' + POV[said] + '</b>.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['The words outside the speech marks show it.', 'The words outside the speech marks show another point of view.'], answer: right ? 0 : 1 },
      hint: 'Look outside the speech marks.', explain: 'It is told in the <b>' + POV[t.pov] + '</b>.', meta: { k: 'g4-narrator-tf', t: t.title, said: said } };
  }
  /* [point of view, an advantage, a disadvantage] */
  var WHY = [['first person', 'You know what the narrator thinks and feels.', 'You only know what the narrator knows.'],
    ['second person', 'It puts you, the reader, in the story.', 'It can feel strange to be told what you do.'],
    ['third person', 'You can follow several characters.', 'You may not know what each character thinks.']];
  function povGood() {
    var w = R.pick(WHY), others = WHY.filter(function (x) { return x !== w; });
    return Q.one('What is <b>good</b> about a story told in the <b>' + w[0] + '</b>?', w[1], others.map(function (x) { return x[1]; }), { hint: 'Think about what the reader can know.', explain: cap(w[0]) + ': ' + w[1], meta: { k: 'g4-pov-good', pov: w[0] } });
  }
  function povBad() {
    var w = R.pick(WHY), others = WHY.filter(function (x) { return x !== w; });
    return Q.one('What is a <b>drawback</b> of a story told in the <b>' + w[0] + '</b>?', w[2], others.map(function (x) { return x[2]; }), { hint: 'What can the reader not know or feel?', explain: cap(w[0]) + ': ' + w[2], meta: { k: 'g4-pov-bad', pov: w[0] } });
  }
  function povMatch() {
    var good = R.int(0, 1) === 1;
    return { q: 'Match each point of view to ' + (good ? 'something <b>good</b> about it' : 'a <b>drawback</b>') + '.', type: 'match', pairs: WHY.map(function (w) { return [w[0], w[good ? 1 : 2]]; }),
      hint: 'Who is telling it? What can the reader know?', explain: 'Every point of view has good points and drawbacks.', meta: { k: 'g4-pov-match' } };
  }

  /* ---------- read and answer: five questions about one passage ---------- */
  function ask(t) {
    var fs = R.some(t.facts, 2), lv = T.words(t) < 120 ? 1 : 2, more = [];
    if (t.main) more.push(function () { return mainIdea(lv, t); });
    if (t.details) more.push(function () { return support(lv, t); });
    if (t.order && t.order.length >= 3) more.push(function () { return sequence(lv, t); });
    if (t.order && t.order.length >= 4) more.push(function () { return after(lv, t); });
    if (t.conclusion) more.push(function () { return conclude(lv, t); });
    if (t.kind === 'story' || t.kind === 'fable') more.push(function () { return narrator(lv, t); });
    more.push(function () { return form(lv, t); }, function () { return factTf(lv, t, R.pick(t.facts)); });
    return [fact(lv, t, fs[0]), evidence(lv, t, fs[1])].concat(R.some(more, 3).map(function (f) { return f(); }));
  }
  var readable = T.list('facts').filter(function (t) { return t.facts.length >= 2; }).sort(function (a, b) { return T.words(a) - T.words(b); });

  var P = T.portage, B = T.bees;
  Atlas.register('reading', {
    full: true,
    read: { texts: readable, show: function (t) { return T.show(t); }, ask: ask },
    lessons: [{
      id: 'understand', title: 'Understanding what you read', sub: 'Facts, the main idea, the order of events, and conclusions.',
      concepts: [
        { slug: 'find', title: 'Find it in the text', exp: ['C1.1'], skill: 'find',
          model: [
            step(T.show(P), 'Read the story.'),
            step(W.sent('What did Priya carry?'), 'A question.'),
            step(W.sent('<mark class="hl">Priya carried</mark> the paddles and the food pack.'), 'Words from the question point to the sentence.'),
            step(W.tile('the paddles and the food pack'), 'The answer was there all along.'),
            step(W.sent('How do bees dry the nectar?'), 'Again, with facts.'),
            step(W.sent('Then they <mark class="hl">fan their wings</mark> over the cells to dry the nectar out.'), 'The heading "Making honey" shows where to look.')
          ],
          guided: [function () { return fact(1); }, function () { return evidence(1); }, function () { return findLine(1); }],
          check: [function () { return fact(2); }, function () { return evidence(2); }, function () { return findLine(2); }, function () { return factTf(2); }, function () { return fact(3); }],
          coach: '<p>Ask the child to put a finger on the sentence that proves the answer before choosing. Looking back is a skill, not cheating.</p>',
          mistake: '<p>Answering from memory. Always point to the words in the text.</p>' },
        { slug: 'main-details', title: 'The main idea and its details', exp: ['C2.6'], skill: 'main',
          model: [
            step(T.show(T.moose), 'What is it mostly about?'),
            step(W.sent('Then it took a huge bite of Mrs. Lavoie' + AP + 's red geraniums.'), 'Only one part. Too small.'),
            step(W.web(T.moose.main[0], ['traffic stops', 'eats geraniums', 'trots away']), 'This covers every part. The details hold it up.'),
            step(T.show(B), 'Now an information text.'),
            step(W.web(B.main[0], ['collect nectar', 'make honey', 'carry pollen']), 'Each heading is a detail under the roof.'),
            step(W.sent('<s>Wasps can sting people.</s>'), 'True, but not in the text. It does not hold up the roof.')
          ],
          guided: [function () { return mainIdea(1); }, function () { return support(1); }, function () { return mainTf(1); }],
          check: [function () { return mainIdea(2); }, function () { return supportPick(2); }, function () { return detailOdd(2); }, function () { return mainTf(2); }, function () { return mainIdea(3); }],
          coach: '<p>Use a hand: the palm is the main idea, the fingers are details. "Does this finger hold up the palm?"</p>',
          mistake: '<p>Choosing a detail they found interesting as the main idea. Check that it fits every part of the text.</p>' },
        { slug: 'sequence', title: 'Retell it in order', exp: ['C2.6'], skill: 'order',
          model: [
            step(W.chain([q(P.order[0])], ['First'])),
            step(W.chain([q(P.order[0]), q(P.order[1])], ['First', 'Next']), 'Find each part in the text.'),
            step(W.chain(P.order.slice(0, 4).map(q), ['First', 'Next', 'Then', 'Then']), 'Only the big events. Skip the mosquitoes.'),
            step(W.chain(P.order.map(q), ['First', 'Next', 'Then', 'Then', 'Last']), 'Five boxes: the whole story, short.'),
            step(T.show(T.gauge), 'Instructions have an order too.'),
            step(W.chain(['Cut the top off.', 'Add pebbles.', 'Pour in water.', 'Tape on the ruler.']), 'The numbers show the order.')
          ],
          guided: [function () { return sequence(1); }, function () { return firstLast(1); }, function () { return after(1); }],
          check: [function () { return sequence(2); }, function () { return firstLast(2); }, function () { return after(2); }, function () { return storyMap(2); }, function () { return sequence(3); }],
          coach: '<p>Retell a story using five fingers: first, next, then, then, last. Only the big events get a finger.</p>',
          mistake: '<p>Putting the most exciting part first, or retelling every small detail. Find each event in the text to check.</p>' },
        { slug: 'conclude', title: 'Draw a conclusion', exp: ['C2.6'], skill: 'conclude',
          model: [
            step(W.sent('Bees carry pollen, which helps plants make fruit.'), 'A fact.'),
            step(W.sent('Without bees, there would be fewer apples.'), 'Another fact.'),
            step(W.means('think', B.conclusion[0]), 'Add them up.'),
            step(T.show(T.camp), 'Now a story.'),
            step(W.sent('It sniffs at the food bag your counsellor <mark class="hl">forgot to hang in the tree</mark>.'), 'A clue.'),
            step(W.means('think', T.camp.conclusion[0]), 'The text never says it. The clue does.')
          ],
          guided: [function () { return conclude(1); }, function () { return concludeWhy(1); }, function () { return concludeTf(1); }],
          check: [function () { return conclude(2); }, function () { return concludeTap(2); }, function () { return concludeWhy(2); }, function () { return concludeTf(2); }, function () { return conclude(3); }],
          coach: '<p>After reading, ask: "So what? What do all these facts tell us?" Then: "Which sentence makes you think so?"</p>',
          mistake: '<p>Choosing something the text never backs up. A conclusion needs a clue from the text.</p>' }
      ]
    }, {
      id: 'strategies', title: 'Reading strategies', sub: 'Predict and check, fix it when you are lost, and choose a text.',
      concepts: [
        { slug: 'predict', title: 'Predict, then check', exp: ['C2.3'], skill: 'predict',
          model: [
            step(T.show(T.moose, 'kick hard'), 'Stop and think.'),
            step(W.sent(Q1 + '<mark class="hl">Never get close to a moose</mark>,' + Q2 + ' Mom said.'), 'A clue.'),
            step(W.means('think', T.moose.predict.right), 'A prediction that uses the clue.'),
            step(W.sent(T.moose.predict.check), 'Read on. Ask a question to check.'),
            step(W.sent(Q1 + '<mark class="hl">Winter is coming</mark>,' + Q2 + ' said Beaver.'), 'Another story. Another clue.'),
            step(W.sent('Otter shivered on the shore.'), 'Read on: the prediction was right.')
          ],
          guided: [function () { return predict(1); }, function () { return clueTap(1); }, function () { return checkPredict(1); }],
          check: [function () { return predict(2); }, function () { return clueTap(2); }, function () { return predictTf(2); }, function () { return checkPredict(2); }, function () { return predict(3); }],
          coach: '<p>Stop at an exciting part and ask: "What will happen? What made you think so? What will you look for to check?"</p>',
          mistake: '<p>Changing the prediction to match the ending. It is fine to be wrong; good readers check and adjust.</p>' },
        { slug: 'monitor', title: 'Fix it when you are lost', exp: ['C2.4'], skill: 'fix-up',
          model: [
            step(W.sent('An <mark class="hl">inuksuk</mark> stands on the tundra.'), 'A word I do not know.'),
            step(W.means('read', 'Read ahead.'), 'The next sentence may explain it.'),
            step(W.sent('An inuksuk is a figure built from stones.'), 'It did.'),
            step(W.means('again', 'Packed with new facts?'), 'Slow down. Reread.'),
            step(W.means('think', 'Cannot picture it?'), 'Make a picture in your mind.'),
            step(W.means('screen', 'Want to know more?'), 'Check another book or website.')
          ],
          guided: [function () { return monitor(1); }, function () { return whichProblem(1); }, monitorMatch],
          check: [function () { return monitor(2); }, fixUp, monitorTf, function () { return whichProblem(2); }, function () { return monitorMatch(2); }],
          coach: '<p>Model it aloud: "Wait, I lost track. I will slow down and reread." Praise the child each time they stop to fix it.</p>',
          mistake: '<p>Reading on when meaning is lost. Stop at the end of each part and ask: "What did I just read?"</p>' },
        { slug: 'choose', title: 'Choose a text for your purpose', exp: ['C2.2'], skill: 'purpose',
          model: [
            step(W.means('think', 'I want to learn how bees make honey.')),
            step(W.sent(B.title), 'Headings and facts fit that purpose.'),
            step(W.sent('<s>' + T.otter.title + '</s>'), 'A fable gives a lesson, not facts.'),
            step(W.means('star', 'I want a story with a lesson.')),
            step(W.sent(T.otter.title), 'Animals who act like people, and a lesson.'),
            step(W.means('people', 'Look for creators from many communities.'), 'Different voices, different stories.')
          ],
          guided: [function () { return choose(1); }, function () { return purpose(1); }, function () { return purposeTf(1); }],
          check: [function () { return choose(2); }, function () { return purpose(2); }, matchPurpose, function () { return purposeTf(2); }, function () { return choose(3); }],
          coach: '<p>At the library, set a purpose first ("I want to learn about wolves") and choose two books that fit it. Include creators from different communities, including First Nations, Métis and Inuit authors.</p>',
          mistake: '<p>Choosing by the cover alone. Read the title and a page to check it suits your purpose.</p>' }
      ]
    }, {
      id: 'kinds', title: 'Kinds of texts', sub: 'Genres and who is telling the story.',
      concepts: [
        { slug: 'forms', title: 'Each kind of text has its features', exp: ['C1.2'], skill: 'forms',
          model: [
            step(T.show(T.gauge), 'Materials and numbered steps: <b>instructions</b>.'),
            step(W.chain(['1. Cut', '2. Fill', '3. Pour']), 'The numbers tell you what to do first.'),
            step(T.show(T.otter, 'she kept chewing'), 'Animals who act like people, and a lesson: a <b>fable</b>.'),
            step(T.show(T.garden, 'bring back the garden'), '"Dear" and a closing: a <b>letter</b>.'),
            step(T.show(T.geese, 'goodbye'), 'Short lines and pictures in words: a <b>poem</b>.')
          ],
          guided: [function () { return form(1); }, function () { return formFeature(1); }, function () { return formHelp(1); }],
          check: [function () { return form(2); }, function () { return formHelp(2); }, function () { return formTf(2); }, function () { return formFeature(2); }, function () { return form(3); }],
          coach: '<p>Sort a pile of real texts (a recipe, a flyer, a picture book, a letter) by kind. For each, ask: "How does this layout help you read it?"</p>',
          mistake: '<p>Calling every text a "story". A story has characters and events; information has facts and headings.</p>' },
        { slug: 'narrator', title: 'First, second or third person', exp: ['C1.6'], skill: 'narrator',
          model: [
            step(W.sent('<b>I</b> was eating <b>my</b> oatmeal.'), 'First person: the narrator is in the story.'),
            step(W.sent('<b>You</b> zip the tent door shut.'), 'Second person: you are in the story.'),
            step(W.sent('<b>Priya</b> carried the paddles.'), 'Third person: the narrator is outside the story.'),
            step(W.sent(Q1 + 'Now <b>we</b> carry the canoe,' + Q2 + ' said Uncle Dev.'), 'Inside speech marks does not count. Look outside them.'),
            step(W.means('think', 'I: you feel what I feel.'), 'Each one has good points and drawbacks.')
          ],
          guided: [function () { return narrator(1); }, function () { return narratorWord(1); }, povGood],
          check: [function () { return narrator(2); }, function () { return narratorTf(2); }, povBad, povMatch, function () { return narrator(3); }],
          coach: '<p>Retell a scene three ways: "I ran...", "You run...", "She ran..." Ask which feels closest, and which shows the most characters.</p>',
          mistake: '<p>Being fooled by "I" or "you" inside speech marks. Look at the words outside the speech marks.</p>' }
      ]
    }],
    practice: [
      { id: 'find', name: 'Find it in the text', code: 'C1.1', gen: fact },
      { id: 'main', name: 'The main idea and its details', code: 'C2.6', gen: mainIdea },
      { id: 'order', name: 'Retell it in order', code: 'C2.6', gen: sequence },
      { id: 'conclude', name: 'Draw a conclusion', code: 'C2.6', gen: conclude },
      { id: 'predict', name: 'Predict, then check', code: 'C2.3', gen: predict },
      { id: 'fix-up', name: 'Fix it when you are lost', code: 'C2.4', gen: monitor },
      { id: 'purpose', name: 'Choose a text for your purpose', code: 'C2.2', gen: purpose },
      { id: 'forms', name: 'Kinds of texts', code: 'C1.2', gen: form },
      { id: 'narrator', name: 'First, second or third person', code: 'C1.6', gen: narrator }
    ],
    tasks: [
      { id: 'before', title: 'What I already know', code: 'C2.1', pic: W.icon('think'), say: 'Before you read, tell what you already know about the topic, and where you learned it.',
        run: ['Choose a new information book together.', 'Ask: "What do you already know about this? Where did you learn it: a trip, a show, another book, family?"', 'After reading, ask: "How did what you knew help you understand it?"'],
        rubric: ['Does not connect what they know, even with prompts.', 'Shares something they know with prompting.', 'Explains what they know and where it came from, and links it to the text.', 'Uses several sources of what they know to ask questions and make sense of the text.'] },
      { id: 'connect', title: 'Connections', code: 'C2.5', pic: W.icon('people'), say: 'How does this text connect to your life, another text, and the world?',
        run: ['After reading, ask: "Does this remind you of something in your life? In another book? In the news?"', 'Ask the child to explain how the two are alike and how they are different.'],
        rubric: ['No connection yet.', 'Makes a connection with help.', 'Explains a clear connection to self, another text or the world.', 'Explains several connections and how they deepen understanding.'] },
      { id: 'indigenous-creators', title: 'Stories by First Nations, Métis and Inuit creators', code: 'C1.7', pic: W.icon('read'), say: 'Read, listen to or watch a story by a First Nations, Métis or Inuit creator. Talk about what it teaches.',
        run: ['Ask your librarian for a book, recorded story or short film by a First Nations, Métis or Inuit creator. Check the author note to learn which community or nation they are from.',
          'Read, listen or watch together. Ask: "What does this story teach about the people, the land, relationships or history?"', 'Talk about how the story connects to life today.'],
        rubric: ['Recalls little of the story yet.', 'Retells some of it with help.', 'Retells it and explains something it teaches about the community, culture or history.', 'Explains what it teaches, connects it to life today, and speaks respectfully about the creator' + AP + 's community.'],
        coach: '<p>Choose creators who write about their own nation or community. Indigenous Storywork is about listening with respect: let the story lead, and use the author notes.</p>' },
      { id: 'what-helped', title: 'Which strategies helped me?', code: 'C2.7', pic: W.icon('star'), say: 'Which strategy helped you most today: picturing it, predicting, summarizing, or connecting?',
        run: ['After reading, show the strategies: picture it, predict, summarize, connect.', 'Ask: "Which one helped you today? Show me where in the text."'],
        rubric: ['Cannot name a strategy yet.', 'Names a strategy with help.', 'Names a strategy and explains where it helped.', 'Explains how two strategies helped, with examples from the text.'] }
    ]
  });

  Q.shapes('reading', {
    find: [[1, 'tap-sentence', evidence], [1, 'find-line', findLine], [2, 'tf', factTf]],
    main: [[1, 'support', support], [1, 'tf', mainTf], [2, 'pick-support', supportPick], [2, 'odd-one', detailOdd]],
    order: [[1, 'first-last', firstLast], [1, 'after', after], [2, 'story-map', storyMap]],
    conclude: [[1, 'why', concludeWhy], [1, 'tf', concludeTf], [2, 'tap-clue', concludeTap]],
    predict: [[1, 'tap-clue', clueTap], [1, 'check', checkPredict], [2, 'tf', predictTf]],
    'fix-up': [[1, 'which-problem', whichProblem], [1, 'match', monitorMatch], [2, 'pick', fixUp], [2, 'tf', monitorTf]],
    purpose: [[1, 'choose', choose], [1, 'tf', purposeTf], [2, 'match', matchPurpose]],
    forms: [[1, 'features', formFeature], [1, 'help', formHelp], [2, 'tf', formTf]],
    narrator: [[1, 'word', narratorWord], [1, 'good', povGood], [2, 'drawback', povBad], [2, 'tf', narratorTf], [2, 'match', povMatch]]
  });
})();
