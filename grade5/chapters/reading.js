/* Grade 5: reading for meaning. A full chapter: every idea has two worked examples, three questions together and five on
   your own, its own practice skill asked in four or more ways, and the chapter has "Read and answer" sets.
   Ontario 2023 Language, Grade 5, Strand C (Comprehension):
   C1.1 read and comprehend various texts            C1.2 characteristics of text forms and genres, including cultural text forms, and how they help communicate meaning
   C1.6 the narrator's point of view (first, second or third person), and its advantages and disadvantages
   C2.2 purposes for reading, and texts that suit them    C2.3 predictions using background knowledge, text features and evidence, checked by questions
   C2.4 strategies to monitor understanding: adjusting rate, visualizing, reading ahead, asking questions, consulting references
   C2.6 summarize the main idea and supporting details in sequence, and draw a well-supported conclusion
   With a grown-up: C1.7 texts by diverse First Nations, Metis and Inuit creators, C2.1 prior knowledge, C2.5 connections, C2.7 which strategies helped.
   Passages are in ../texts.js. Answer checks: tests/verify/grade5-reading.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var Q1 = '“', Q2 = '”', AP = '’';
  var POVS = { first: 'First person (I, we)', second: 'Second person (you)', third: 'Third person (he, she, they)' };
  /* [a problem while reading, the strategy that fixes it]; each strategy fixes two problems */
  var FIX = [['The facts are coming fast and you are lost.', 'Slow down and reread.'], ['You read a whole page and cannot remember any of it.', 'Slow down and reread.'],
    ['You cannot picture what is happening.', 'Make a picture in your head.'], ['A description of a place is hard to follow.', 'Make a picture in your head.'],
    ['A sentence confuses you, but the next part might explain it.', 'Read ahead to see if it is explained.'], ['The writer says an idea will be explained later.', 'Read ahead to see if it is explained.'],
    ['You wonder why a character acted that way.', 'Ask a question, then look for the answer.'], ['You are not sure what the writer is trying to tell you.', 'Ask a question, then look for the answer.'],
    ['You do not know what a word means, and the sentence does not help.', 'Look it up in the glossary or a dictionary.'], ['A word in bold is new to you.', 'Look it up in the glossary or a dictionary.']];
  var FIXES = FIX.map(function (f) { return f[1]; }).filter(function (f, i, a) { return a.indexOf(f) === i; });
  var NOFIX = ['Skip to the end.', 'Keep reading as fast as you can.', 'Give up on the book.', 'Pretend you understood it.'];
  var FIXPIC = { 'Slow down and reread.': 'again', 'Make a picture in your head.': 'think', 'Read ahead to see if it is explained.': 'read', 'Ask a question, then look for the answer.': 'talk', 'Look it up in the glossary or a dictionary.': 'screen' };
  /* [what you want, a text that suits it, texts that do not] */
  var CHOOSE = [['to learn how to build a birdhouse', 'a how-to guide with numbered steps', ['a poem about birds', 'a novel about a pigeon']],
    ['to find out about life in Nunavut', 'an information book by an Inuit author', ['a comic about superheroes', 'a cookbook']],
    ['to enjoy a funny story before bed', 'a humorous short story', ['a bus schedule', 'a science textbook']],
    ['to decide which bike to buy', 'a review that compares two bikes', ['a poem about wheels', 'a story about a bike race']],
    ['to learn what a word means', 'a dictionary', ['an atlas', 'a joke book']],
    ['to find where Lake Superior is', 'an atlas', ['a dictionary', 'a fairy tale']],
    ['to cook bannock for a family dinner', 'a recipe', ['a poem about bread', 'a hockey magazine']],
    ['to know if it will rain tomorrow', 'a weather forecast', ['a fairy tale', 'a joke book']],
    ['to learn about the life of Terry Fox', 'a biography of Terry Fox', ['a cookbook', 'a comic about superheroes']],
    ['to enjoy the sound and rhythm of words', 'a book of poems', ['a bus schedule', 'a dictionary']]];
  var KINDS = ['story', 'information', 'poem', 'letter'];
  var PURPOSE = { story: 'to enjoy a story', information: 'to learn facts', letter: 'to be persuaded', poem: 'to enjoy a poem' };
  var CLUE = { story: 'It has characters, a problem and events.', information: 'It gives facts about a real topic.', letter: 'It starts with ' + Q1 + 'Dear' + Q2 + ' and gives an opinion.', poem: 'It has short lines and vivid images.' };
  /* [a form, what it does] */
  var FORMS = [['a narrative', 'has characters, a problem and events'], ['an information text', 'uses headings and facts to teach'], ['a persuasive letter', 'gives an opinion and reasons'],
    ['a poem', 'uses short lines and vivid images'], ['a biography', 'tells the true story of a person' + AP + 's life'], ['an oral story', 'is passed on by telling, often by Elders or family'],
    ['a graphic novel', 'tells a story in pictures and speech bubbles'], ['a how-to guide', 'gives numbered steps to follow']];
  /* what each narrator gives you, and what it costs */
  var PLUS = { first: 'You know exactly what the narrator thinks and feels.', second: 'You feel as if it is happening to you.', third: 'The narrator can show what happens in more than one place.' };
  var MINUS = { first: 'You only know what the narrator knows.', second: 'It can feel strange if it is not like your own life.', third: 'You may not know every character' + AP + 's thoughts.' };

  function q(s) { return Q1 + s + Q2; }
  function kindName(k) { return k === 'information' ? 'an information text' : 'a ' + k; }
  /* the passage to use: the one given (in a "Read and answer" set), or one that has what the question needs, sized for the level */
  function text(need, lv, t) { return t && t[need] ? t : R.pick(T.list(need, lv)); }
  function at(t, words) { for (var i = 0; i < t.lines.length; i++) if (t.lines[i] && t.lines[i].charAt(0) !== '#' && t.lines[i].indexOf(words) >= 0) return i; return -1; }
  function stopOf(t) { return t.predict.stop || t.predict.upTo; }
  /* the sentences shown up to the place a prediction stops */
  function before(t) { var s = stopOf(t), n = typeof s === 'number' ? s : at(t, s) + 1; return t.lines.slice(0, n).filter(function (l) { return l && l.charAt(0) !== '#'; }); }
  function stories() { return T.list('pov').filter(function (x) { return x.kind === 'story'; }); }
  /* outside speech marks, which word shows who is telling the story */
  function said(t) { return T.body(t).join(' ').replace(/“[^”]*”/g, ''); }
  function povWord(t) {
    var words = t.pov === 'first' ? ['I', 'We', 'Our'] : t.pov === 'second' ? ['You'] : ['She', 'He', 'They'];
    return words.filter(function (w) { return new RegExp('\\b' + w + '\\b', 'i').test(said(t)); })[0];
  }

  /* ---------- find it in the text (C1.1) ---------- */
  function fact(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    return Q.one(f[0], f[1], f.slice(2, lv > 1 ? 4 : 3), { fig: T.show(t), prompt: 'Find the sentence that tells you.', hint: 'Look back in the text. The answer is there.',
      explain: 'The text says: ' + q(t.lines[at(t, f[4])]), meta: { k: 'g5-fact', t: t.title, q: f[0] } });
  }
  function evidence(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var i = at(t, f[4]);
    return { q: 'Tap the sentence that answers: <b>' + f[0] + '</b>', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which words in the question can you find in the text?', hint: 'Find the question words in the text. Read that sentence.', explain: 'It tells you: <b>' + f[1] + '</b>.',
      meta: { k: 'g5-tap-fact', t: t.title, q: f[0] } };
  }
  function findLine(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var right = t.lines[at(t, f[4])], others = T.body(t).filter(function (l) { return l !== right; });
    return Q.one('Which sentence answers this? <b>' + f[0] + '</b>', right, R.some(others, lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Which sentence has the answer in it?', explain: W.sent(right), meta: { k: 'g5-find-line', t: t.title, q: f[0] } });
  }
  function factTf(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var right = R.int(0, 1) === 1, says = right ? f[1] : R.pick(f.slice(2, 4));
    return { q: f[0] + '<br>' + Q.name() + ' says: <b>' + says + '</b>.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['The text says so.', 'The text says something else.'], answer: right ? 0 : 1 },
      hint: 'Find the sentence that answers the question.', explain: 'The text says: ' + q(t.lines[at(t, f[4])]), meta: { k: 'g5-fact-tf', t: t.title, q: f[0] } };
  }

  /* ---------- sum it up: the main idea and key events, in order (C2.6) ---------- */
  function summary(lv, t) {
    t = text('summary', lv, t);
    return Q.one('Which is the best <b>summary</b>?', t.summary[0], t.summary.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Short, in order, and only what the text says.',
      hint: 'A summary keeps the big events and leaves out small details and opinions.', explain: t.summary[0], meta: { k: 'g5-summary', t: t.title } });
  }
  var WHY_NOT = ['It is a good summary.', 'It has too many small details.', 'It gives an opinion, not what the text says.'];
  function summaryWhy(lv, t) {
    t = text('summary', lv, t);
    var i = R.int(0, 2);
    return Q.one('What is true about this summary?', WHY_NOT[i], WHY_NOT.filter(function (w, j) { return j !== i; }), { fig: W.sent(t.summary[i]) + T.show(t),
      hint: 'Is it short? Is it all from the text?', explain: WHY_NOT[i], meta: { k: 'g5-summary-why', t: t.title, i: i } });
  }
  function mainIdea(lv, t) {
    t = text('main', lv, t);
    return Q.one('What is this text <b>mostly</b> about?', t.main[0], t.main.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which answer covers the whole text, not one part?',
      hint: 'The main idea fits every part of the text.', explain: W.web(t.main[0], ['every part']), meta: { k: 'g5-main', t: t.title } });
  }
  function detail(lv, t) {
    t = text('main', lv, t);
    return Q.one('Which one is only a <b>supporting detail</b>?', t.main[1], [t.main[0]].concat(lv > 1 ? [t.main[2]] : []), { fig: T.show(t), prompt: 'Which one is true, but only one small part?',
      hint: 'A detail holds up the main idea. It does not cover it all.', explain: W.web(t.main[0], [t.main[1]]), meta: { k: 'g5-detail', t: t.title } });
  }
  function events(t, lv) { return t.order.slice(0, lv > 2 ? 5 : 4); }
  function sequence(lv, t) {
    t = text('order', lv, t);
    return { q: 'Put these in the order they happen.', fig: T.show(t), type: 'order', items: events(t, lv).map(q), first: 'First', last: 'Last',
      hint: 'Find each part in the text. Which comes first?', explain: W.chain(events(t, lv).map(q)), meta: { k: 'g5-order', t: t.title } };
  }
  function after(lv, t) {
    t = t && t.order && t.order.length >= 4 ? t : R.pick(T.list('order', lv).filter(function (x) { return x.order.length >= 4; }));
    var ev = t.order, i = R.int(0, ev.length - 2), wrong = ev.filter(function (e, j) { return j !== i && j !== i + 1; });
    return Q.one('What happens <b>right after</b> this? ' + q(ev[i]), q(ev[i + 1]), R.some(wrong, 2).map(q), { fig: T.show(t), prompt: 'Find it in the text. Read the next part.',
      hint: 'Find it in the text, then read on.', explain: W.chain([q(ev[i]), q(ev[i + 1])], ['Then', 'Next']), meta: { k: 'g5-after', t: t.title } });
  }

  /* ---------- a conclusion the text supports (C2.6) ---------- */
  function conclude(lv, t) {
    t = text('conclude', lv, t);
    return Q.one('Which conclusion does the text <b>support</b>?', t.conclude[0], t.conclude.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Can you point to words that back it up?',
      hint: 'A good conclusion fits the evidence in the text.', explain: W.means('think', t.conclude[0]), meta: { k: 'g5-conclude', t: t.title } });
  }
  function concludeTap(lv, t) {
    t = text('conclude', lv, t);
    var i = at(t, t.conclude[3]);
    return { q: 'Conclusion: <b>' + t.conclude[0] + '</b> Tap the sentence that supports it.', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      hint: 'Which sentence is the proof?', explain: 'The evidence: <mark class="hl">' + t.conclude[3] + '</mark>.', meta: { k: 'g5-conclude-tap', t: t.title } };
  }
  function concludeTf(lv, t) {
    t = text('conclude', lv, t);
    var right = R.int(0, 1) === 1, says = right ? t.conclude[0] : R.pick(t.conclude.slice(1, 3));
    return { q: Q.name() + ' concludes: <b>' + says + '</b>', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['Words in the text support it.', 'Nothing in the text supports it.'], answer: right ? 0 : 1 },
      hint: 'Can you find words in the text that prove it?', explain: 'Supported: ' + t.conclude[0], meta: { k: 'g5-conclude-tf', t: t.title, said: says } };
  }
  function concludeWords(lv, t) {
    t = text('conclude', lv, t);
    var others = T.body(t).filter(function (l) { return l.indexOf(t.conclude[3]) < 0; }).map(function (l) { return l.split(' ').slice(0, 5).join(' '); });
    return Q.one('Conclusion: <b>' + t.conclude[0] + '</b> Which words support it?', t.conclude[3], R.some(others, lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Which words prove the conclusion?', explain: 'The evidence: <mark class="hl">' + t.conclude[3] + '</mark>.', meta: { k: 'g5-conclude-words', t: t.title } });
  }

  /* ---------- predict, then check (C2.3) ---------- */
  function predict(lv, t) {
    t = text('predict', lv, t); var p = t.predict;
    return Q.one('What will <b>most likely</b> happen next?', p.right, p.wrong.slice(0, lv > 1 ? 2 : 1), { fig: T.show(t, stopOf(t)), prompt: 'Look for a clue in the text.',
      hint: 'Use a clue from the text and what you know.', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g5-predict', t: t.title } });
  }
  function predictClue(lv, t) {
    t = text('predict', lv, t); var p = t.predict, other = R.pick(before(t).filter(function (l) { return l.indexOf(p.clue) < 0; }));
    return Q.one('You predict: <b>' + p.right + '</b> Which words in the text support it?', p.clue, [other.split(' ').slice(0, 5).join(' ')], { fig: T.show(t, stopOf(t)),
      hint: 'Which words point to what happens next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g5-predict-clue', t: t.title } });
  }
  function clueTap(lv, t) {
    t = text('predict', lv, t); var p = t.predict, i = at(t, p.clue);
    return { q: 'You predict: <b>' + p.right + '</b> Tap the sentence with the clue.', type: 'tap', pic: T.show(t, stopOf(t), { tap: true }), answer: String(i), answerText: t.lines[i],
      hint: 'Which sentence points to what happens next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g5-clue-tap', t: t.title } };
  }
  function predictTf(lv, t) {
    t = text('predict', lv, t); var p = t.predict, right = R.int(0, 1) === 1, says = right ? p.right : R.pick(p.wrong);
    return { q: Q.name() + ' predicts: <b>' + says + '</b>', fig: T.show(t, stopOf(t)), type: 'tf', answer: right,
      why: { options: ['A clue in the text points to it.', 'Nothing in the text points to it.'], answer: right ? 0 : 1 },
      hint: 'Is there a clue in the text?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g5-predict-tf', t: t.title, said: says } };
  }
  function predictCheck(lv, t) {
    t = text('predict', lv, t); var p = t.predict, right = R.int(0, 1) === 1, says = right ? p.right : R.pick(p.wrong);
    return { q: 'Before reading on, ' + Q.name() + ' predicted: <b>' + says + '</b> Now read it all. Was the prediction right?', fig: T.show(t), type: 'tf', answer: right,
      hint: 'Read past the clue. What really happened?', explain: 'What happened fits this: ' + p.right, meta: { k: 'g5-predict-check', t: t.title, said: says } };
  }

  /* ---------- notice when you are lost, and fix it (C2.4) ---------- */
  function fixFor(f) { return W.means(FIXPIC[f], f); }
  function monitor(lv) {
    var f = R.pick(FIX);
    return Q.one('<b>Problem:</b> ' + f[0] + ' What should you do?', f[1], R.some(FIXES.filter(function (x) { return x !== f[1]; }), lv > 1 ? 3 : 2), { prompt: 'Good readers stop and fix it.',
      hint: 'Which strategy fixes this problem?', explain: fixFor(f[1]), meta: { k: 'g5-monitor', problem: f[0] } });
  }
  function fixWhich(lv) {
    var s = R.pick(FIXES), right = R.pick(FIX.filter(function (f) { return f[1] === s; }))[0];
    var wrong = R.some(FIX.filter(function (f) { return f[1] !== s; }), lv > 1 ? 2 : 1).map(function (f) { return f[0]; });
    return Q.one('Which problem does this fix?', right, wrong, { fig: fixFor(s), hint: 'When would this strategy help?', explain: right, meta: { k: 'g5-fix-for', fix: s } });
  }
  function fixAll() {
    return Q.all('Reading stops making sense. Pick every good idea.', R.some(FIXES, 2), R.some(NOFIX, 2), {
      hint: 'Good readers slow down, check and look things up.', explain: 'Reread, picture it, read ahead, ask a question, or look it up.', meta: { k: 'g5-fix-all' } });
  }
  function matchFix() {
    var ps = R.some(FIXES, 3).map(function (s) { return [R.pick(FIX.filter(function (f) { return f[1] === s; }))[0], s]; });
    return { q: 'Match each problem to a fix.', type: 'match', pairs: ps, hint: 'Which strategy solves that problem?', explain: 'Each problem has a fix.', meta: { k: 'g5-match-fix' } };
  }
  function fixTf() {
    var f = R.pick(FIX), right = R.int(0, 1) === 1, says = right ? f[1] : R.pick(FIXES.filter(function (x) { return x !== f[1]; }).concat(NOFIX));
    return { q: '<b>Problem:</b> ' + f[0] + ' ' + Q.name() + ' decides:', fig: W.sent(says), type: 'tf', answer: right,
      why: { options: ['It fixes this problem.', 'It does not fix this problem.'], answer: right ? 0 : 1 },
      hint: 'Will it fix this problem?', explain: 'For this problem: ' + f[1], meta: { k: 'g5-monitor-tf', problem: f[0], said: says } };
  }

  /* ---------- choose a text that fits your purpose (C2.2) ---------- */
  function choose(lv) {
    var c = R.pick(CHOOSE);
    return Q.one('You want <b>' + c[0] + '</b>. Which text suits your purpose?', c[1], c[2].slice(0, lv > 1 ? 2 : 1), { hint: 'Match the text to what you want to get from it.',
      explain: c[1] + ' fits.', meta: { k: 'g5-choose', want: c[0] } });
  }
  function chooseTf() {
    var c = R.pick(CHOOSE), right = R.int(0, 1) === 1, pick = right ? c[1] : R.pick(c[2]), n = Q.name();
    return { q: n + ' wants <b>' + c[0] + '</b>, and picks <b>' + pick + '</b>. Good choice?', type: 'tf', answer: right,
      why: { options: ['It suits the purpose.', 'It does not suit the purpose.'], answer: right ? 0 : 1 },
      hint: 'Will that text give ' + n + ' what they want?', explain: c[1] + ' fits.', meta: { k: 'g5-choose-tf', want: c[0], pick: pick } };
  }
  function purpose(lv, t) {
    t = text('purpose', lv, t);
    return Q.one('Why would you read this?', t.purpose, R.some(KINDS.filter(function (k) { return PURPOSE[k] !== t.purpose; }).map(function (k) { return PURPOSE[k]; }), lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Is it a story, facts, an opinion, or a poem?', explain: 'It is ' + kindName(t.kind) + ': you read it <b>' + t.purpose + '</b>.', meta: { k: 'g5-read-purpose', t: t.title } });
  }
  function oneOfEach(n) {
    return R.some(KINDS, n).map(function (k) { return R.pick(T.list('kind').filter(function (t) { return t.kind === k; })); });
  }
  function whichText(lv) {
    var ts = oneOfEach(lv > 1 ? 3 : 2), want = ts[0];
    return Q.tiles('You want <b>' + want.purpose + '</b>. Which would you read?', want.title, ts.slice(1).map(function (t) { return t.title; }), {
      hint: 'What is each title: a story, facts, a letter or a poem?', explain: '<b>' + want.title + '</b> is ' + kindName(want.kind) + '.', meta: { k: 'g5-which-text', want: want.purpose } });
  }
  function matchPurpose() {
    var ts = oneOfEach(3);
    return { q: 'Match each text to why you would read it.', type: 'match', pairs: ts.map(function (t) { return [t.title, t.purpose]; }), hint: 'What kind of text is each one?',
      explain: 'Stories and poems to enjoy; information to learn; a persuasive letter to be persuaded.', meta: { k: 'g5-match-read' } };
  }

  /* ---------- each form has a job (C1.2) ---------- */
  function form(lv, t) {
    t = text('kind', lv, t);
    return Q.tiles('What kind of text is this?', t.kind, R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Characters and events? Facts? ' + Q1 + 'Dear' + Q2 + '? Short lines?', explain: 'It is <b>' + kindName(t.kind) + '</b>. ' + CLUE[t.kind], meta: { k: 'g5-form', t: t.title } });
  }
  function formClue(lv, t) {
    t = text('kind', lv, t);
    return Q.one('This is <b>' + kindName(t.kind) + '</b>. What shows it?', CLUE[t.kind], R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 2 : 1).map(function (k) { return CLUE[k]; }), {
      fig: T.show(t), hint: 'Look at how the text is built.', explain: CLUE[t.kind], meta: { k: 'g5-form-clue', t: t.title } });
  }
  function formTf(lv, t) {
    t = text('kind', lv, t);
    var right = R.int(0, 1) === 1, other = R.pick(KINDS.filter(function (k) { return k !== t.kind; })), says = right ? t.kind : other, why = R.shuffle([CLUE[t.kind], CLUE[other]]);
    return { q: Q.name() + ' says this is <b>' + kindName(says) + '</b>.', fig: T.show(t), type: 'tf', answer: right, why: { options: why, answer: why.indexOf(CLUE[t.kind]) },
      hint: 'Look at how it is built.', explain: 'It is <b>' + kindName(t.kind) + '</b>. ' + CLUE[t.kind], meta: { k: 'g5-form-tf', t: t.title, said: says } };
  }
  function formJob(lv) {
    var f = R.pick(FORMS);
    return Q.one('What does <b>' + f[0] + '</b> do?', f[1], R.some(FORMS.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Think of one you have read or heard.', explain: f[0] + ' ' + f[1] + '.', meta: { k: 'g5-form-job', form: f[0] } });
  }
  function matchForms() {
    var fs = R.some(FORMS, 3);
    return { q: 'Match each form to what it does.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Each form is built for a purpose.', explain: 'The form helps carry the meaning.', meta: { k: 'g5-match-forms' } };
  }

  /* ---------- first, second or third person (C1.6) ---------- */
  function narrator(lv, t) {
    t = t && t.pov ? t : R.pick(T.list('pov'));
    var all = ['first', 'second', 'third'], other = R.pick(all.filter(function (x) { return x !== t.pov; })), keys = lv > 1 ? all : all.filter(function (k) { return k === t.pov || k === other; });
    return { q: 'Who is telling this?', fig: T.show(t), type: 'tap', tiles: keys.map(function (k) { return POVS[k]; }), answer: keys.indexOf(t.pov),
      prompt: 'Look outside the speech marks for I or we, you, or he, she and they.', hint: 'I or we: first. You: second. He, she, they: third.',
      explain: 'The narrator says <b>' + povWord(t).toLowerCase() + '</b>: ' + POVS[t.pov].toLowerCase() + '.', meta: { k: 'g5-narrator', t: t.title } };
  }
  function narratorWord(lv, t) {
    t = t && t.kind === 'story' ? t : R.pick(stories());
    var w = povWord(t), wrong = { first: ['You', 'They'], second: ['I', 'She'], third: ['I', 'You'] }[t.pov];
    return Q.tiles('Which word shows this story is told in the <b>' + t.pov + ' person</b>?', w, wrong, { fig: T.show(t),
      hint: 'First: I, we. Second: you. Third: he, she, they.', explain: '<b>' + w + '</b>, outside the speech marks.', meta: { k: 'g5-pov-word', t: t.title } });
  }
  function narratorTf(lv, t) {
    t = t && t.pov ? t : R.pick(T.list('pov'));
    var right = R.int(0, 1) === 1, says = right ? t.pov : R.pick(['first', 'second', 'third'].filter(function (x) { return x !== t.pov; }));
    return { q: Q.name() + ' says this is told in the <b>' + says + ' person</b>.', fig: T.show(t), type: 'tf', answer: right,
      hint: 'Look outside the speech marks.', explain: 'The narrator says <b>' + povWord(t).toLowerCase() + '</b>: ' + POVS[t.pov].toLowerCase() + '.', meta: { k: 'g5-narrator-tf', t: t.title, said: says } };
  }
  function povLine(lv) {
    var p = R.pick(['first', 'second']), plain = function (l) { return !/[“”]/.test(l); };
    var word = p === 'first' ? /\b(I|my|we|our)\b/i : /\b(you|your)\b/i;
    var mine = R.pick(stories().filter(function (t) { return t.pov === p; })), right = R.pick(T.body(mine).filter(function (l) { return plain(l) && word.test(l); }));
    var wrong = R.some(stories().filter(function (t) { return t.pov === 'third'; }).map(function (t) { return R.pick(T.body(t).filter(plain)); }), lv > 1 ? 2 : 1);
    return Q.one('Which sentence is told in the <b>' + p + ' person</b>?', right, wrong, { hint: p === 'first' ? 'Look for I, my or we.' : 'Look for you or your.',
      explain: W.sent(right), meta: { k: 'g5-pov-line', pov: p } });
  }
  function povWhy() {
    var p = R.pick(['first', 'second', 'third']), plus = R.int(0, 1) === 1, list = plus ? PLUS : MINUS;
    return Q.one('A story told in the <b>' + p + ' person</b>. What is one ' + (plus ? '<b>advantage</b>' : '<b>disadvantage</b>') + '?', list[p],
      Object.keys(list).filter(function (k) { return k !== p; }).map(function (k) { return list[k]; }), { hint: 'Think about what that narrator can and cannot know.',
        explain: list[p], meta: { k: 'g5-pov-why', pov: p, plus: plus } });
  }

  /* ---------- read and answer: five questions about one passage ---------- */
  function ask(t) {
    var fs = R.some(t.facts, 2), lv = T.words(t) < 120 ? 2 : 3, more = [];
    if (t.main) more.push(function () { return mainIdea(lv, t); });
    if (t.summary) more.push(function () { return summary(lv, t); });
    if (t.conclude) more.push(function () { return conclude(lv, t); });
    if (t.order) more.push(function () { return sequence(lv, t); });
    if (t.pov) more.push(function () { return narrator(lv, t); });
    more.push(function () { return form(lv, t); }, function () { return purpose(lv, t); }, function () { return factTf(lv, t, R.pick(t.facts)); });
    return [fact(lv, t, fs[0]), evidence(lv, t, fs[1])].concat(R.some(more, 3).map(function (f) { return f(); }));
  }
  var readable = T.list('facts').filter(function (t) { return t.facts.length >= 2; }).sort(function (a, b) { return T.words(a) - T.words(b); });
  var L = T.lighthouse, ice = T.iceRoad;

  Atlas.register('reading', {
    full: true,
    read: { texts: readable, show: function (t) { return T.show(t); }, ask: ask },
    lessons: [{
      id: 'understand', title: 'Understanding the text', sub: 'Find it, sum it up, and draw a conclusion.',
      concepts: [
        { slug: 'find', title: 'Find it in the text', exp: ['C1.1'], skill: 'find',
          model: [
            step(T.show(T.inuksuk), 'Read it first.'),
            step(W.sent('Where does an inuksuk appear today?'), 'A question.'),
            step(W.sent('Today, an inuksuk appears on the <mark class="hl">flag of Nunavut</mark>.'), 'Its words point to one sentence.'),
            step(W.tile('on the flag of Nunavut'), 'The answer, straight from the text.'),
            step(W.sent('How fast did Uncle Ray drive?'), 'A story this time.'),
            step(W.sent('Uncle Ray drove slowly, <mark class="hl">never faster than 25 kilometres an hour</mark>.'), 'Put your finger on the proof.')
          ],
          guided: [function () { return fact(1); }, function () { return evidence(1); }, function () { return findLine(1); }],
          check: [function () { return fact(2); }, function () { return evidence(3); }, function () { return findLine(2); }, function () { return factTf(2); }, function () { return fact(3); }],
          coach: '<p>Ask the child to point to the sentence that proves their answer. Looking back is what strong readers do.</p>',
          mistake: '<p>Answering from memory or from what they already knew. The answer must come from this text.</p>' },
        { slug: 'summary', title: 'Sum it up', exp: ['C2.6'], skill: 'summary',
          model: [
            step(T.show(L), 'Read the story.'),
            step(W.sent(L.summary[1]), 'Every detail: too long.'),
            step(W.sent(L.summary[2]), 'An opinion: not in the story.'),
            step(W.sent(L.summary[0]), 'The problem, the key events, the ending. In order.'),
            step(T.show(T.maple), 'Now an information text.'),
            step(W.chain(['tap the tree', 'collect the sap', 'boil it down', 'filter and bottle'], ['First', 'Next', 'Then', 'Last']), 'Its key steps, in order.')
          ],
          guided: [function () { return summary(1); }, function () { return mainIdea(1); }, function () { return sequence(1); }],
          check: [function () { return summary(2); }, function () { return summaryWhy(2); }, function () { return detail(2); }, function () { return after(2); }, function () { return summary(3); }],
          coach: '<p>Use "Somebody wanted... but... so... then..." to sum up a story in one breath. For facts: "It is mostly about... First... then..."</p>',
          mistake: '<p>Retelling every detail, or adding an opinion. A summary is short, in order, and sticks to the text.</p>' },
        { slug: 'conclude', title: 'Draw a conclusion the text supports', exp: ['C2.6'], skill: 'conclude',
          model: [
            step(W.sent('Uncle Ray drove slowly, <mark class="hl">never faster than 25</mark> kilometres an hour.'), 'Evidence.'),
            step(W.sent(q('<mark class="hl">That is the ice talking</mark>,') + ' he said.'), 'More evidence.'),
            step(W.means('think', ice.conclude[0]), 'Put the evidence together.'),
            step(W.means('wrong', ice.conclude[1]), 'Nothing in the story shows this.'),
            step(W.sent('Monarch caterpillars <mark class="hl">eat only milkweed</mark>.'), 'Facts work too.'),
            step(W.means('think', T.monarchs.conclude[0]), 'Backed up by the text.')
          ],
          guided: [function () { return conclude(1); }, function () { return concludeTf(1); }, function () { return concludeWords(1); }],
          check: [function () { return conclude(2); }, function () { return concludeTap(2); }, function () { return concludeTf(2); }, function () { return concludeWords(3); }, function () { return conclude(3); }],
          coach: '<p>After a chapter, ask: "What can we decide from this? Show me the words that prove it."</p>',
          mistake: '<p>Jumping to a conclusion the text does not back up. Every conclusion needs evidence.</p>' }
      ]
    }, {
      id: 'strategies', title: 'Reading strategies', sub: 'Predict, check your understanding, and choose the right text.',
      concepts: [
        { slug: 'predict', title: 'Predict, then check', exp: ['C2.3'], skill: 'predict',
          model: [
            step(T.show(L, stopOf(L)), 'Stop here.'),
            step(W.sent(q('<mark class="hl">The fishing boats are still out</mark>.')), 'A clue.'),
            step(W.means('think', L.predict.right), 'The clue plus what I know.'),
            step(W.sent('She grabbed the matches and began to climb.'), 'Read on. I was right.'),
            step(T.show(T.goalie, stopOf(T.goalie)), 'Another one.'),
            step(W.means('think', T.goalie.predict.right), 'A tied game, two minutes left.')
          ],
          guided: [function () { return predict(1); }, function () { return predictClue(1); }, function () { return clueTap(1); }],
          check: [function () { return predict(2); }, function () { return predictTf(2); }, function () { return clueTap(3); }, function () { return predictCheck(3); }, function () { return predict(3); }],
          coach: '<p>Before reading, look at the title, headings and pictures and ask: "What do you think this will be about? Why?" After, check together.</p>',
          mistake: '<p>Never checking a prediction. The check is what makes it a strategy.</p>' },
        { slug: 'monitor', title: 'Notice when you are lost, and fix it', exp: ['C2.4'], skill: 'monitor',
          model: [
            step(W.sent('Marshes, swamps and <b>bogs</b> are all wetlands.'), 'What is a bog? The sentence does not say.'),
            step(fixFor(FIXES[4])),
            step(W.sent('<b>bog</b>: a wetland with soft, spongy ground made of moss'), 'Fixed. Back to reading.'),
            step(W.icon('think'), 'A whole page, and I remember none of it.'),
            step(fixFor(FIXES[0]), 'This time, more slowly.'),
            step(fixFor(FIXES[1]), 'Then see it as I go.')
          ],
          guided: [function () { return monitor(1); }, fixAll, matchFix],
          check: [function () { return monitor(2); }, fixTf, function () { return fixWhich(2); }, matchFix, function () { return monitor(3); }],
          coach: '<p>Model it aloud: "Hmm, I do not get this part. I will read ahead and see if it is explained." Children copy what they hear.</p>',
          mistake: '<p>Reading to the end of the page while lost. Stop as soon as it stops making sense.</p>' },
        { slug: 'choose', title: 'Choose a text that fits your purpose', exp: ['C2.2'], skill: 'choose',
          model: [
            step(W.means('think', 'I want to cook bannock for dinner.'), 'My purpose.'),
            step(W.sent('a recipe'), 'Fits: ingredients and steps.'),
            step(W.sent('a poem about bread'), 'Lovely, but not for this.'),
            step(T.show(T.crosswalk, 3), 'Why read this one?'),
            step(W.means('star', 'to be persuaded'), 'An opinion and reasons.')
          ],
          guided: [function () { return choose(1); }, function () { return purpose(1); }, chooseTf],
          check: [function () { return choose(2); }, function () { return whichText(2); }, matchPurpose, chooseTf, function () { return choose(3); }],
          coach: '<p>At the library, give the child a purpose ("find out how to care for a hamster") and let them choose the book.</p>',
          mistake: '<p>Picking the first book with the right word on the cover. Check that it suits what you want.</p>' }
      ]
    }, {
      id: 'forms', title: 'Forms and narrators', sub: 'How a text is built, and who is telling it.',
      concepts: [
        { slug: 'forms', title: 'Each form has a job', exp: ['C1.2'], skill: 'forms',
          model: [
            step(T.show(T.crosswalk, 6), Q1 + 'Dear' + Q2 + ', an opinion, reasons: a <b>persuasive letter</b>.'),
            step(T.show(T.monarchs, 5), 'Headings and facts: an <b>information text</b>.'),
            step(T.show(T.storm), 'Short lines and images: a <b>poem</b>.'),
            step(T.show(T.volcano, 3), 'Characters and a problem: a <b>narrative</b>.'),
            step(W.icon('people'), 'Told aloud by Elders or family: an <b>oral story</b>.')
          ],
          guided: [function () { return form(1); }, function () { return formClue(1); }, function () { return formJob(1); }],
          check: [function () { return form(2); }, function () { return formTf(2); }, matchForms, function () { return formClue(3); }, function () { return form(3); }],
          coach: '<p>Sort a pile of texts at home: flyers, recipes, poems, letters, novels. Ask: "Why is this one built this way?"</p>',
          mistake: '<p>Calling everything a story. A story has characters and events; an information text has facts.</p>' },
        { slug: 'narrator', title: 'First, second or third person', exp: ['C1.6'], skill: 'narrator',
          model: [
            step(W.sent('<b>I</b> poured in more vinegar.'), '<b>First person</b>: the narrator is in it.'),
            step(W.sent('<b>You</b> snap up <b>your</b> glove.'), '<b>Second person</b>: it puts you in it.'),
            step(W.sent('<b>She</b> grabbed the matches.'), '<b>Third person</b>: told from outside.'),
            step(W.sent(q('If <b>we</b> go fast...') + ' Uncle Ray said.'), 'Speech marks hold a character' + AP + 's words. Look outside them.'),
            step(W.means('star', PLUS.first), 'First person: a plus.'),
            step(W.means('wrong', MINUS.first), 'And a minus.')
          ],
          guided: [function () { return narrator(1); }, function () { return narratorWord(1); }, povWhy],
          check: [function () { return narrator(2); }, function () { return narratorTf(2); }, function () { return povLine(2); }, povWhy, function () { return narrator(3); }],
          coach: '<p>Retell a family story three ways: "I...", "You...", "She...". Ask which felt closest, and which showed the most.</p>',
          mistake: '<p>Being fooled by "I" inside speech marks. Look at the words outside the quotes.</p>' }
      ]
    }],
    practice: [
      { id: 'find', name: 'Find it in the text', code: 'C1.1', gen: fact },
      { id: 'summary', name: 'Sum it up', code: 'C2.6', gen: summary },
      { id: 'conclude', name: 'Draw a conclusion', code: 'C2.6', gen: conclude },
      { id: 'predict', name: 'Predict, then check', code: 'C2.3', gen: predict },
      { id: 'monitor', name: 'Fix it when you are lost', code: 'C2.4', gen: monitor },
      { id: 'choose', name: 'Choose the right text', code: 'C2.2', gen: choose },
      { id: 'forms', name: 'Text forms', code: 'C1.2', gen: form },
      { id: 'narrator', name: 'Who is telling it?', code: 'C1.6', gen: narrator }
    ],
    tasks: [
      { id: 'know-before', title: 'What I already know', code: 'C2.1', pic: W.icon('think'), say: 'Before you read: what do you already know about this topic?',
        run: ['Choose a new information book together.', 'Before reading, the child lists what they know from their own life, other books, school and media.', 'After reading, ask: "What did you already know that helped? What was new?"'],
        rubric: ['Shares nothing they know yet.', 'Shares one thing with prompting.', 'Shares what they know from more than one place and links it to the text.', 'Uses what they know to ask sharp questions and to make sense of new ideas.'] },
      { id: 'connections', title: 'This connects to...', code: 'C2.5', pic: W.icon('people'), say: 'How does this text connect to your life, other texts, and the world?',
        run: ['After reading, ask for three connections: to the child' + AP + 's life, to another book or show, and to something in the world.', 'Ask the child to explain how each one helps them understand the text.'],
        rubric: ['No connection yet.', 'One connection with help.', 'Clear connections of more than one kind, explained.', 'Thoughtful connections that deepen understanding of the text.'] },
      { id: 'indigenous-creators', title: 'Read a First Nations, Métis or Inuit creator', code: 'C1.7', pic: W.icon('read'), say: 'Read a book by a First Nations, Métis or Inuit author. Talk about it.',
        run: ['Ask your librarian for a novel, picture book, graphic novel or poetry by a First Nations, Métis or Inuit creator. Check the author note for their nation or community.',
          'Read it together. Ask: "What does this story teach about history, culture, relationships or the land? How does the creator tell it?"', 'If the creator shares their own Storywork (how stories teach in their community), talk about what that means.'],
        rubric: ['Recalls little of the text yet.', 'Retells parts with help.', 'Explains what the text shows about the community' + AP + 's history, culture or lived experience.', 'Explains it respectfully, with evidence, and connects it to life today.'],
        coach: '<p>Choose texts by creators from the community they write about, and let the creator' + AP + 's voice lead. Each nation and community is distinct.</p>' },
      { id: 'strategy-talk', title: 'What helped me understand?', code: 'C2.7', pic: W.icon('star'), say: 'Which strategy helped you most with this text?',
        run: ['After reading, show the strategies: visualize, predict, summarize, connect, reread.', 'The child names two that helped and explains when they used each one.'],
        rubric: ['Cannot name a strategy yet.', 'Names a strategy with help.', 'Names two strategies and when they helped.', 'Explains how the strategies worked together, with examples from the text.'] }
    ]
  });

  Q.shapes('reading', {
    find: [[1, 'tap-sentence', evidence], [1, 'find-line', findLine], [2, 'tf', factTf]],
    summary: [[1, 'main-idea', mainIdea], [1, 'detail', detail], [2, 'what-is-wrong', summaryWhy], [1, 'order', sequence], [2, 'after', after]],
    conclude: [[1, 'tap-proof', concludeTap], [1, 'tf', concludeTf], [2, 'words', concludeWords]],
    predict: [[1, 'clue', predictClue], [1, 'tap-clue', clueTap], [2, 'tf', predictTf], [2, 'check', predictCheck]],
    monitor: [[1, 'which-problem', fixWhich], [1, 'pick', fixAll], [2, 'match', matchFix], [1, 'tf', fixTf]],
    choose: [[1, 'purpose', purpose], [1, 'which-text', whichText], [2, 'match', matchPurpose], [2, 'tf', chooseTf]],
    forms: [[1, 'clue', formClue], [1, 'job', formJob], [2, 'match', matchForms], [2, 'tf', formTf]],
    narrator: [[1, 'word', narratorWord], [1, 'tf', narratorTf], [2, 'line', povLine], [2, 'why', povWhy]]
  });
})();
