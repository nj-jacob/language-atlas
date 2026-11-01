/* Grade 6: reading for meaning. A full chapter: every idea has two worked examples, three questions together and five on
   your own, its own practice skill asked in four or more ways, and the chapter has "Read and answer" sets.
   Ontario 2023 Language, Grade 6, Strand C (Comprehension):
   C1.1 read and comprehend various texts                      C1.2 text forms and genres, and how their characteristics help communicate meaning
   C1.6 the narrator's point of view (first, second or third person), with evidence, and how another point of view would change the story
   C2.2 purposes for reading                                   C2.3 predictions, questions to check them, and adjusting understanding
   C2.4 strategies to monitor and confirm understanding         C2.6 summarize the main idea and supporting details, and draw conclusions
   With a grown-up: C1.7 texts by First Nations, Metis and Inuit creators, C2.1 prior knowledge, C2.5 connections, C2.7 comparing strategies.
   Passages are in ../texts.js. Answer checks: tests/verify/grade6-reading.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var Q1 = '“', Q2 = '”';
  var KINDS = ['story', 'report', 'opinion', 'poem', 'script', 'instructions'];
  var PURPOSE = { story: 'to enjoy a story', report: 'to learn facts', instructions: 'to learn how to do something', opinion: 'to hear an opinion', poem: 'to enjoy a poem', script: 'to enjoy a play' };
  /* how to read each form, once you know why you are reading it */
  var HOW = { story: 'Picture the events and follow the characters.', report: 'Use the headings to find the facts you need.', instructions: 'Read slowly and do one step at a time, in order.',
    opinion: 'Notice what the writer wants, and check the reasons.', poem: 'Read it aloud and listen to the sounds.', script: 'Follow who is speaking and read the stage directions.' };
  var CLUE = { story: 'Characters, a problem and events', report: 'Headings that split the facts', instructions: 'A list of things you need and numbered steps',
    opinion: 'One side of an argument, trying to convince you', poem: 'Short lines with rhythm and pictures in words', script: 'Speaker names and stage directions' };
  /* [a problem while reading, the strategy that fixes it, its picture] */
  var MONITOR = [['You meet a word you do not know.', 'Look it up in a glossary or dictionary.', 'read'], ['You cannot picture what is happening.', 'Make a picture of it in your mind.', 'think'],
    ['A paragraph is confusing.', 'Read ahead to see if it becomes clear.', 'before'], ['You are not sure a fact is right.', 'Check it in another source.', 'screen'],
    ['You wonder why a character acted that way.', 'Ask a question, then read on to answer it.', 'talk'], ['You realize you have not taken in the last page.', 'Go back and reread it slowly.', 'again']];
  var NOFIX = ['Skip to the end.', 'Read faster.', 'Guess and keep going.', 'Give up on the text.'];
  /* [what a reader did, the name of the strategy] */
  var USED = [['drew a quick sketch of the scene in her mind', 'visualizing'], ['kept reading to see if the next part explained it', 'reading ahead'],
    ['wrote a question in the margin, then looked for the answer', 'asking questions'], ['looked up the word in the glossary', 'using a reference'], ['checked the fact on a museum website', 'checking another source']];
  var POV = { first: 'first person (I, me, we)', second: 'second person (you)', third: 'third person (he, she, they)' };
  var PERSON = ['first', 'second', 'third'], SAYS = ['The narrator says I, me or we.', 'The narrator says you.', 'The narrator says he, she or they.'];

  function q(s) { return Q1 + s + Q2; }
  /* the passage to use: the one given (in a "Read and answer" set), or one that has what the question needs, sized for the level */
  function text(need, lv, t) { return t && t[need] ? t : R.pick(T.list(need, lv)); }
  function at(t, words) { for (var i = 0; i < t.lines.length; i++) if (t.lines[i] && t.lines[i].charAt(0) !== '#' && t.lines[i].indexOf(words) >= 0) return i; return -1; }
  function stopOf(t) { return t.predict.stop || t.predict.upTo; }
  function shown(t) { var s = stopOf(t), n = typeof s === 'number' ? s : at(t, s) + 1; return t.lines.slice(0, n).filter(function (l) { return l && l.charAt(0) !== '#'; }); }
  function kindName(k) { return k === 'instructions' ? 'instructions' : (/^[aeiou]/.test(k) ? 'an ' : 'a ') + k; }
  function stories() { return T.list('pov').filter(function (x) { return x.kind === 'story'; }); }
  function others(t, need) { return T.list(need).filter(function (x) { return x !== t; }); }

  /* ---------- evidence (C1.1) ---------- */
  function fact(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    return Q.one(f[0], f[1], f.slice(2, lv > 1 ? 4 : 3), { fig: T.show(t), prompt: 'Find the sentence that tells you.', hint: 'Look back in the text. The answer is there.',
      explain: 'The text says: ' + q(t.lines[at(t, f[4])]), meta: { k: 'g6-fact', t: t.title, q: f[0] } });
  }
  function evidenceTap(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var i = at(t, f[4]);
    return { q: 'Tap the <b>evidence</b>: the sentence that answers <b>' + f[0] + '</b>', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which words from the question can you find in the text?', hint: 'Find the question words in the text, then read that sentence.', explain: 'It tells you: <b>' + f[1] + '</b>.',
      meta: { k: 'g6-tap-fact', t: t.title, q: f[0] } };
  }
  function evidenceLine(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var right = t.lines[at(t, f[4])], rest = T.body(t).filter(function (l) { return l !== right; });
    return Q.one('Which sentence is the evidence? <b>' + f[0] + '</b> ' + f[1] + '.', right, R.some(rest, lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Which sentence has the answer in it?', explain: W.sent(right), meta: { k: 'g6-evidence', t: t.title, q: f[0] } });
  }
  function factTf(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(f.slice(2, 4));
    return { q: f[0] + '<br>' + Q.name() + ' answers: <b>' + said + '</b>', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['The text says so.', 'The text says something else.'], answer: right ? 0 : 1 },
      hint: 'Find the sentence that answers the question.', explain: 'The text says: ' + q(t.lines[at(t, f[4])]), meta: { k: 'g6-fact-tf', t: t.title, q: f[0], said: said } };
  }

  /* ---------- sum it up (C2.6) ---------- */
  function summary(lv, t) {
    t = text('main', lv, t);
    return Q.one('Which is the best <b>summary</b>?', t.main[0], t.main.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which one covers the whole text, not one detail?',
      hint: 'A summary gives the main idea of the whole text.', explain: W.web(t.main[0], ['every part']), meta: { k: 'g6-summary', t: t.title } });
  }
  function detail(lv, t) {
    t = text('main', lv, t);
    return Q.one('Which one is only <b>one detail</b> from the text?', t.main[1], [t.main[0]].concat(lv > 1 ? [t.main[2]] : []), { fig: T.show(t), prompt: 'Which one does not cover the whole text?',
      hint: 'A detail is in the text, but it is one small part.', explain: W.web(t.main[0], [t.main[1]]), meta: { k: 'g6-detail', t: t.title } });
  }
  function support(lv, t) {
    t = text('main', lv, t);
    var right = R.pick(T.body(t).filter(function (l) { return l.length < 120 && !/^Posted by/.test(l); })), wrong = R.some(others(t, 'main').map(function (x) { return R.pick(T.body(x)); }), lv > 1 ? 2 : 1);
    return Q.one('Which detail <b>supports</b> this main idea?', right, wrong, { fig: W.web(t.main[0], [W.gap(), W.gap()]),
      hint: 'A supporting detail comes from the same text and backs up the main idea.', explain: W.web(t.main[0], [right]), meta: { k: 'g6-support', t: t.title } });
  }
  function summaryTf(lv, t) {
    t = text('main', lv, t);
    var right = R.int(0, 1) === 1, said = right ? t.main[0] : t.main[1];
    return { q: Q.name() + ' sums up the text like this:', fig: W.sent(said) + T.show(t), type: 'tf', answer: right,
      why: { options: ['It covers the whole text.', 'It is only one detail.'], answer: right ? 0 : 1 },
      hint: 'Does it cover every part of the text?', explain: 'The best summary: ' + t.main[0], meta: { k: 'g6-summary-tf', t: t.title, said: said } };
  }
  function sequence(lv, t) {
    t = text('order', lv, t);
    var ev = t.order.slice(0, lv > 1 ? 5 : 4);
    return { q: 'Record the events in order for a summary.', fig: T.show(t), type: 'order', items: ev.map(q), first: 'First', last: 'Last',
      hint: 'Find each part in the text. Which comes first?', explain: W.chain(ev.map(q)), meta: { k: 'g6-order', t: t.title } };
  }

  /* ---------- draw a conclusion (C2.6) ---------- */
  function conclude(lv, t, f) {
    t = text('infer', lv, t); f = f || R.pick(t.infer);
    var more = lv > 1 ? [R.pick(R.pick(others(t, 'infer')).infer)[1]] : [];
    return Q.one(f[0], f[1], [f[2]].concat(more), { fig: T.show(t), prompt: 'The text does not say it. Which words give you a clue?',
      hint: 'Find the clue words, then think: what do they show?', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g6-conclude', t: t.title, q: f[0] } });
  }
  function clueWords(lv, t, f) {
    t = text('infer', lv, t); f = f || R.pick(t.infer);
    var rest = T.body(t).filter(function (l) { return l.indexOf(f[3]) < 0; }).map(function (l) { return l.replace(/[“”]/g, '').split(' ').slice(0, 5).join(' '); });
    return Q.one('Conclusion: <b>' + f[1].replace(/\.$/, '') + '</b>. Which words in the text support it?', f[3], R.some(rest, lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Which words show it without saying it?', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g6-reading-clue', t: t.title, q: f[0] } });
  }
  function concludeTap(lv, t, f) {
    t = text('infer', lv, t); f = f || R.pick(t.infer);
    var i = at(t, f[3]);
    return { q: f[0] + ' <b>' + f[1].replace(/\.$/, '') + '</b>. Tap the sentence that shows it.', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which sentence is the clue?', hint: 'Look for what a character does or says.', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g6-conclude-tap', t: t.title, q: f[0] } };
  }
  function concludeTf(lv, t, f) {
    t = text('infer', lv, t); f = f || R.pick(t.infer);
    var right = R.int(0, 1) === 1, said = right ? f[1] : f[2];
    return { q: f[0] + '<br>' + Q.name() + ' concludes: <b>' + said + '</b>', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['A clue in the text supports it.', 'No clue in the text supports it.'], answer: right ? 0 : 1 },
      hint: 'Find a clue. Does it fit?', explain: 'The clue: <mark class="hl">' + f[3] + '</mark> shows ' + f[1] + '.', meta: { k: 'g6-conclude-tf', t: t.title, q: f[0], said: said } };
  }

  /* ---------- predict, then check (C2.3) ---------- */
  function predict(lv, t) {
    t = text('predict', lv, t); var p = t.predict;
    return Q.one('What will <b>most likely</b> happen next?', p.right, p.wrong.slice(0, lv > 1 ? 2 : 1), { fig: T.show(t, stopOf(t)), prompt: 'Look for a clue: <b>' + p.clue + '</b>.',
      hint: 'Use a clue from the text and what you know.', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g6-predict', t: t.title } });
  }
  function predictClue(lv, t) {
    t = text('predict', lv, t); var p = t.predict, rest = shown(t).filter(function (l) { return l.indexOf(p.clue) < 0; });
    return Q.one('You predict: <b>' + p.right + '</b> Which words helped?', p.clue, R.some(rest, lv > 1 ? 2 : 1).map(function (l) { return l.replace(/[“”]/g, '').split(' ').slice(0, 5).join(' '); }), { fig: T.show(t, stopOf(t)),
      hint: 'Which words point to what happens next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g6-predict-clue', t: t.title } });
  }
  function clueTap(lv, t) {
    t = text('predict', lv, t); var p = t.predict, i = at(t, p.clue);
    return { q: 'You predict: <b>' + p.right + '</b> Tap the sentence with the clue.', type: 'tap', pic: T.show(t, stopOf(t), { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which sentence makes you think so?', hint: 'Which sentence points to what happens next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g6-clue-tap', t: t.title } };
  }
  function predictTf(lv, t) {
    t = text('predict', lv, t); var p = t.predict, right = R.int(0, 1) === 1, said = right ? p.right : R.pick(p.wrong);
    return { q: Q.name() + ' predicts: <b>' + said + '</b>', fig: T.show(t, stopOf(t)), type: 'tf', answer: right,
      why: { options: ['A clue in the text points to it.', 'Nothing in the text points to it.'], answer: right ? 0 : 1 },
      hint: 'Is there a clue in the text?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g6-predict-tf', t: t.title, said: said } };
  }
  function adjust(lv, t) {
    t = text('predict', lv, t); var p = t.predict, guess = R.pick(p.wrong);
    return Q.one('You predicted: <b>' + guess + '</b> Then you read the sentence below. What should you do?', 'Change my prediction to fit the new clue.',
      ['Keep my first prediction no matter what.', 'Stop reading the text.'].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(t.lines[at(t, p.clue)].replace(p.clue, '<mark class="hl">' + p.clue + '</mark>')),
        hint: 'Does the new clue fit your prediction?', explain: 'Check it against the clue, then adjust: ' + p.right, meta: { k: 'g6-adjust', t: t.title, guess: guess } });
  }

  /* ---------- notice when it stops making sense (C2.4) ---------- */
  function whichFix(lv) {
    var m = R.pick(MONITOR);
    return Q.one('What could you do?', m[1], R.some(MONITOR.filter(function (x) { return x !== m; }).map(function (x) { return x[1]; }).concat(NOFIX), lv > 1 ? 3 : 2), {
      fig: W.means(m[2], m[0]), hint: 'Which strategy fixes this problem?', explain: W.means(m[2], m[1]), meta: { k: 'g6-monitor', s: m[0] } });
  }
  function matchFix() {
    var ms = R.some(MONITOR, 3);
    return { q: 'Match each problem to a strategy.', type: 'match', pairs: ms.map(function (m) { return [m[0], m[1]]; }), hint: 'Which strategy solves that problem?', explain: 'Strong readers choose the strategy that fits.', meta: { k: 'g6-match-fix' } };
  }
  function fixTf() {
    var right = R.int(0, 1) === 1, m = R.pick(MONITOR), said = right ? m[1] : R.pick(NOFIX), n = Q.name();
    return { q: n + ' has a problem: <b>' + m[0] + '</b> ' + n + ' decides:', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['It helps fix the problem.', 'It does not fix the problem.'], answer: right ? 0 : 1 },
      hint: 'Will it help the text make sense?', explain: W.means(m[2], m[1]), meta: { k: 'g6-fix-tf', s: m[0], said: said } };
  }
  function nameIt(lv) {
    var u = R.pick(USED), n = R.pick(['Priya', 'Zara', 'Sofia', 'Hana', 'Amara', 'Leila']);
    return Q.tiles(n + ' ' + u[0] + '. Which strategy is that?', u[1], R.some(USED.filter(function (x) { return x !== u; }).map(function (x) { return x[1]; }), lv > 1 ? 3 : 2), {
      hint: 'What did ' + n + ' actually do?', explain: 'That is <b>' + u[1] + '</b>.', meta: { k: 'g6-name-strategy', did: u[0] } });
  }
  function goodFixes() {
    return Q.all('Your reading gets confusing. Pick every strategy that helps.', R.some(MONITOR, 2).map(function (m) { return m[1]; }), R.some(NOFIX, 2), {
      hint: 'Strong readers slow down and check.', explain: 'Picture it, read ahead, ask, reread or check a reference.', meta: { k: 'g6-good-fixes' } });
  }

  /* ---------- know why you are reading (C2.2) ---------- */
  function purpose(lv, t) {
    t = text('purpose', lv, t);
    return Q.one('Why would you read this?', t.purpose, R.some(KINDS.filter(function (k) { return PURPOSE[k] !== t.purpose; }).map(function (k) { return PURPOSE[k]; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Is it a story, facts, steps, an opinion, a poem or a play?', explain: 'You would read it <b>' + t.purpose + '</b>.', meta: { k: 'g6-purpose', t: t.title } });
  }
  function oneOfEach(n) { return R.some(KINDS, n).map(function (k) { return R.pick(T.list('kind').filter(function (t) { return t.kind === k; })); }); }
  function whichText(lv) {
    var ts = oneOfEach(lv > 1 ? 4 : 3), want = ts[0];
    return Q.tiles('You want <b>' + want.purpose + '</b>. Which would you choose?', want.title, ts.slice(1).map(function (t) { return t.title; }), {
      hint: 'Think about what each title is: a story, a report, steps, an opinion, a poem or a play.', explain: '<b>' + want.title + '</b> is ' + kindName(want.kind) + '.', meta: { k: 'g6-which-text', want: want.purpose } });
  }
  function howToRead(lv, t) {
    t = text('purpose', lv, t);
    return Q.one('You are reading this ' + t.purpose + '. How should you read it?', HOW[t.kind], R.some(KINDS.filter(function (k) { return k !== t.kind; }).map(function (k) { return HOW[k]; }), lv > 1 ? 2 : 1), {
      fig: T.show(t), hint: 'What is this kind of text for?', explain: HOW[t.kind], meta: { k: 'g6-how-read', t: t.title } });
  }
  function purposeTf(lv, t) {
    t = text('purpose', lv, t);
    var right = R.int(0, 1) === 1, said = right ? t.purpose : PURPOSE[R.pick(KINDS.filter(function (k) { return PURPOSE[k] !== t.purpose; }))];
    return { q: Q.name() + ' says: I would read this <b>' + said + '</b>.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['That is what this kind of text is for.', 'This kind of text is for something else.'], answer: right ? 0 : 1 },
      hint: 'What kind of text is it?', explain: 'It is ' + kindName(t.kind) + ': you read it <b>' + t.purpose + '</b>.', meta: { k: 'g6-purpose-tf', said: said } };
  }

  /* ---------- forms and their features (C1.2) ---------- */
  function form(lv, t) {
    t = text('kind', lv, t);
    return Q.tiles('What form of text is this?', t.kind, R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Look at how it is set out: headings, numbers, short lines, speaker names, or one side of an argument?', explain: 'It is ' + kindName(t.kind) + '. ' + CLUE[t.kind] + '.', meta: { k: 'g6-form', t: t.title } });
  }
  function formClue(lv, t) {
    t = text('kind', lv, t);
    return Q.one('This is ' + kindName(t.kind) + '. What shows it?', CLUE[t.kind], R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 2 : 1).map(function (k) { return CLUE[k]; }), {
      fig: T.show(t), hint: 'Look at how the text is set out.', explain: CLUE[t.kind] + '.', meta: { k: 'g6-form-clue', t: t.title } });
  }
  function formTf(lv, t) {
    t = text('kind', lv, t);
    var right = R.int(0, 1) === 1, other = R.pick(KINDS.filter(function (k) { return k !== t.kind; })), said = right ? t.kind : other, why = R.shuffle([CLUE[t.kind], CLUE[other]]);
    return { q: Q.name() + ' says this is ' + kindName(said) + '.', fig: T.show(t), type: 'tf', answer: right, why: { options: why, answer: why.indexOf(CLUE[t.kind]) },
      hint: 'Look at how it is set out.', explain: 'It is ' + kindName(t.kind) + '. ' + CLUE[t.kind] + '.', meta: { k: 'g6-form-tf', t: t.title, said: said } };
  }
  function matchForm() {
    var ks = R.some(KINDS, 3);
    return { q: 'Match each form to what gives it away.', type: 'match', pairs: ks.map(function (k) { return [k, CLUE[k]]; }), hint: 'Picture each form on a page.', explain: 'The way a text is set out helps you read it.', meta: { k: 'g6-match-form' } };
  }

  /* ---------- first, second or third person (C1.6) ---------- */
  function narrator(lv, t) {
    t = t && t.kind === 'story' ? t : R.pick(stories());
    return { q: 'What point of view is this story told from?', fig: T.show(t), type: 'tap', tiles: [POV.first, POV.second, POV.third], answer: PERSON.indexOf(t.pov),
      prompt: 'Look at the words outside the quotation marks.', hint: 'I: first. You: second. He, she, they: third.', explain: 'It is told in the <b>' + POV[t.pov] + '</b>.', meta: { k: 'g6-narrator', t: t.title } };
  }
  function narratorWord(lv, t) {
    t = t && t.kind === 'story' ? t : R.pick(stories());
    var w = { first: 'I', second: 'You', third: /\bShe\b/.test(T.body(t).join(' ')) ? 'She' : 'He' }[t.pov];
    return Q.tiles('Which word is the evidence that this is told in the <b>' + t.pov + ' person</b>?', w, ['I', 'You', w === 'He' ? 'He' : 'She'].filter(function (x) { return x !== w; }), { fig: T.show(t),
      hint: 'First: I. Second: you. Third: she or he.', explain: '<b>' + w + '</b> shows the ' + t.pov + ' person.', meta: { k: 'g6-narrator-word', t: t.title } });
  }
  function narratorTf(lv, t) {
    t = t && t.kind === 'story' ? t : R.pick(stories());
    var said = R.int(0, 1) === 1 ? t.pov : R.pick(PERSON.filter(function (p) { return p !== t.pov; }));
    return { q: Q.name() + ' says this story is told in the <b>' + said + ' person</b>.', fig: T.show(t), type: 'tf', answer: said === t.pov,
      why: { options: SAYS, answer: PERSON.indexOf(t.pov) },
      hint: 'Look outside the quotation marks.', explain: 'It is told in the <b>' + POV[t.pov] + '</b>.', meta: { k: 'g6-narrator-tf', t: t.title, said: said } };
  }
  function povLine(lv) {
    var t = R.pick(T.list('retell')), want = R.pick(PERSON);
    return Q.one('Which sentence is told in the <b>' + want + ' person</b>?', t.retell[want], PERSON.filter(function (p) { return p !== want; }).slice(0, lv > 1 ? 2 : 1).map(function (p) { return t.retell[p]; }), {
      hint: 'First: I and my. Second: you and your. Third: he, she, his, her.', explain: 'It uses the words of the <b>' + POV[want] + '</b>.', meta: { k: 'g6-pov-line', want: want } });
  }

  /* ---------- another narrator changes the story (C1.6) ---------- */
  function altPov(lv, t) {
    t = text('altPov', lv, t); var a = t.altPov;
    return Q.one('If <b>' + a[0] + '</b> told this story, what would change most?', a[1], a.slice(2, lv > 1 ? 4 : 3), { fig: T.show(t),
      prompt: 'What does only the narrator know?', hint: 'A new narrator knows different things.', explain: a[1], meta: { k: 'g6-alt-pov', t: t.title } });
  }
  function altTf(lv, t) {
    t = text('altPov', lv, t); var a = t.altPov, right = R.int(0, 1) === 1, said = right ? a[1] : R.pick(a.slice(2));
    return { q: 'If ' + a[0] + ' told this story, ' + Q.name() + ' says:', fig: W.sent(said) + T.show(t), type: 'tf', answer: right,
      why: { options: ['A new narrator knows different things.', 'The events would stay the same.'], answer: right ? 0 : 1 },
      hint: 'Mostly what we know changes, not what happens.', explain: a[1], meta: { k: 'g6-alt-tf', t: t.title, said: said } };
  }
  function retell(lv) {
    var t = R.pick(T.list('retell')), want = R.pick(PERSON.filter(function (p) { return p !== t.pov; })), rest = PERSON.filter(function (p) { return p !== want; });
    return Q.one('Retell it in the <b>' + want + ' person</b>.', t.retell[want], rest.slice(0, lv > 1 ? 2 : 1).map(function (p) { return t.retell[p]; }).filter(function (s) { return s !== t.retell[want]; }), {
      fig: W.sent(t.retell[t.pov]), hint: 'First: I. Second: you. Third: he or she.', explain: 'The ' + want + ' person: ' + q(t.retell[want]), meta: { k: 'g6-retell', want: want } });
  }
  function whoKnows(lv, t) {
    t = text('altPov', lv, t);
    return Q.one('Who could tell us <b>what the main character felt inside</b>?', 'the main character, as narrator (first person)', ['someone watching from outside', R.pick(['a character who only hears about it later', 'a reader who skips the middle'])].slice(0, lv > 1 ? 2 : 1), {
      fig: T.show(t), hint: 'Only one person truly knows their own feelings.', explain: 'A first-person narrator can tell us their own thoughts and feelings.', meta: { k: 'g6-who-knows', t: t.title } });
  }

  /* ---------- read and answer: five questions about one passage ---------- */
  function ask(t) {
    var fs = R.some(t.facts, 2), lv = T.words(t) < 100 ? 1 : 2, more = [];
    if (t.main) more.push(function () { return summary(lv, t); });
    if (t.order) more.push(function () { return sequence(lv, t); });
    if (t.infer) more.push(function () { return conclude(lv, t); });
    if (t.predict) more.push(function () { return predict(lv, t); });
    if (t.kind === 'story') more.push(function () { return narrator(lv, t); });
    more.push(function () { return form(lv, t); }, function () { return factTf(lv, t, R.pick(t.facts)); });
    return [fact(lv, t, fs[0]), evidenceTap(lv, t, fs[1] || fs[0])].concat(R.some(more, 3).map(function (f) { return f(); }));
  }
  var readable = T.list('facts').filter(function (t) { return t.facts.length >= 2; }).sort(function (a, b) { return T.words(a) - T.words(b); });

  var road = T.winterRoad, market = T.market;
  Atlas.register('reading', {
    full: true,
    read: { texts: readable, show: function (t) { return T.show(t); }, ask: ask },
    lessons: [{
      id: 'understand', title: 'Understanding what you read', sub: 'Evidence, summaries and conclusions.',
      concepts: [
        { slug: 'evidence', title: 'Back it up with evidence', exp: ['C1.1'], skill: 'evidence',
          model: [
            step(T.show(road), 'Read the story.'),
            step(W.sent('How long is the winter road open each year?'), 'A question.'),
            step(W.sent('<mark class="hl">For eight weeks</mark> each year, a winter road joined his town to the highway.'), 'Question words point to this sentence.'),
            step(W.tile('eight weeks'), 'Answer, with proof.'),
            step(T.show(T.swifts), 'Now a report.'),
            step(W.sent('How much money did the class raise?'), 'Find money words.'),
            step(W.sent('Local builders gave the wood, and the class <mark class="hl">raised $900</mark> for the rest.'), 'The evidence.')
          ],
          guided: [function () { return fact(1); }, function () { return evidenceTap(1); }, function () { return evidenceLine(1); }],
          check: [function () { return fact(2); }, function () { return evidenceTap(2); }, function () { return evidenceLine(2); }, function () { return factTf(2); }, function () { return fact(3); }],
          coach: '<p>Ask "How do you know?" after every answer, and wait for the child to point to the words.</p>',
          mistake: '<p>Answering from memory of the story. Always go back to the text.</p>' },
        { slug: 'summary', title: 'Sum it up', exp: ['C2.6'], skill: 'summary',
          model: [
            step(T.show(market), 'What is it mostly about?'),
            step(W.sent('The line stretched past the lemonade stand.'), 'One detail. Too small.'),
            step(W.web('Mei and her mother run the stall alone, a neighbour helps, and Mei saves a bun for her father.', ['father is sick', 'wind and a helper', 'one bun saved']), 'Who, what, and how it ends. Details hold it up.'),
            step(W.chain(['father had a fever', 'a long line', 'the wind', 'a neighbour helps', 'last bun'].map(q)), 'Record the events in order.'),
            step(T.show(T.milkweed), 'Now a report.'),
            step(W.web('Monarchs depend on milkweed, so planting it helps them survive.', ['one plant', 'fewer plants', 'helping']), 'Each heading is a supporting detail.')
          ],
          guided: [function () { return summary(1); }, function () { return detail(1); }, function () { return sequence(1); }],
          check: [function () { return summary(2); }, function () { return support(2); }, function () { return detail(2); }, function () { return summaryTf(2); }, function () { return summary(3); }],
          coach: '<p>Use "Somebody, wanted, but, so, then" to sum up a story in one or two sentences. For a report, turn each heading into one point.</p>',
          mistake: '<p>Retelling every event. A summary is short and covers the whole text.</p>' },
        { slug: 'conclude', title: 'Draw a conclusion', exp: ['C2.6'], skill: 'conclude',
          model: [
            step(W.sent('Mei saved one from the steamer and wrapped it carefully.'), 'A clue.'),
            step(W.sent('This week, <mark class="hl">her father had a fever</mark>.'), 'Something I read earlier.'),
            step(W.means('think', 'The bun is for her father.'), 'Clue plus what I know. The text never says it.'),
            step(W.sent('Jonah <mark class="hl">wanted to keep going</mark>, but he said nothing.'), 'Another clue.'),
            step(W.means('think', 'Jonah is impatient.'), 'Check: does every clue fit?')
          ],
          guided: [function () { return conclude(1); }, function () { return clueWords(1); }, function () { return concludeTap(1); }],
          check: [function () { return conclude(2); }, function () { return concludeTap(2); }, function () { return clueWords(2); }, function () { return concludeTf(2); }, function () { return conclude(3); }],
          coach: '<p>Clue + what I know = conclusion. Say it out loud as a sum.</p>',
          mistake: '<p>A conclusion with no clue behind it. Ask: "What in the text made you think that?"</p>' }
      ]
    }, {
      id: 'strategies', title: 'Reading strategies', sub: 'Predict and check, fix it, and know why you read.',
      concepts: [
        { slug: 'predict', title: 'Predict, then check', exp: ['C2.3'], skill: 'predict',
          model: [
            step(T.show(T.lemon, 'one word I had skipped'), 'Stop and think.'),
            step(W.sent('...noticed <mark class="hl">one word I had skipped: LED</mark>.'), 'A clue.'),
            step(W.sent('The narrator will try again with an LED.'), 'My prediction.'),
            step(W.sent('This time, a faint red dot glowed.'), 'Read on. It was right.'),
            step(W.sent('Kokum will drive straight over the crack.'), 'Another story. A first guess.'),
            step(W.sent('<mark class="hl">We wait for the crew to check it.</mark>'), 'A new clue. Change the prediction.')
          ],
          guided: [function () { return predict(1); }, function () { return predictClue(1); }, function () { return clueTap(1); }],
          check: [function () { return predict(2); }, function () { return adjust(2); }, function () { return predictClue(2); }, function () { return predictTf(2); }, function () { return clueTap(3); }],
          coach: '<p>Write a prediction on a sticky note. Ask: "What question will tell us if you were right?" Read on, then mark it: right, partly right, or changed.</p>',
          mistake: '<p>Holding on to a prediction after the text proves it wrong.</p>' },
        { slug: 'monitor', title: 'Notice when it stops making sense', exp: ['C2.4'], skill: 'monitor',
          model: [
            step(W.means(MONITOR[0][2], MONITOR[0][0]), 'Stop. Notice.'),
            step(W.means(MONITOR[0][2], MONITOR[0][1])),
            step(W.means(MONITOR[1][2], MONITOR[1][0]), 'A different problem.'),
            step(W.means(MONITOR[1][2], MONITOR[1][1])),
            step(W.means(MONITOR[2][2], MONITOR[2][1]), 'Still lost? Read on a little.'),
            step(W.means(MONITOR[3][2], MONITOR[3][1]), 'Not sure a fact is right?')
          ],
          guided: [function () { return whichFix(1); }, matchFix, function () { return nameIt(1); }],
          check: [function () { return whichFix(2); }, goodFixes, fixTf, function () { return nameIt(2); }, function () { return whichFix(3); }],
          coach: '<p>Model it: "Hmm, I lost track there. I' + '’' + 'll read ahead a little and see."</p>',
          mistake: '<p>Reading to the end without understanding. Stopping to fix it is what strong readers do.</p>' },
        { slug: 'purpose', title: 'Know why you are reading', exp: ['C2.2'], skill: 'purpose',
          model: [
            step(T.show(T.birdbox), 'Numbered steps.'),
            step(W.means('write', 'to learn how to do something'), 'So I go slowly, one step at a time.'),
            step(T.show(T.lunch), 'One side, trying to convince.'),
            step(W.means('talk', 'to hear an opinion'), 'So I check the reasons.'),
            step(T.show(T.snow), 'Short lines that sound good.'),
            step(W.means('star', 'to enjoy a poem'), 'So I read it aloud.')
          ],
          guided: [function () { return purpose(1); }, function () { return whichText(1); }, function () { return howToRead(1); }],
          check: [function () { return purpose(2); }, function () { return whichText(2); }, function () { return howToRead(2); }, function () { return purposeTf(2); }, function () { return purpose(3); }],
          coach: '<p>When choosing a library book, ask: "What do you want from it: facts, fun, an opinion, or how to do something?"</p>',
          mistake: '<p>Reading every text the same way.</p>' }
      ]
    }, {
      id: 'forms', title: 'Forms and points of view', sub: 'How a text is built, and who tells it.',
      concepts: [
        { slug: 'forms', title: 'Forms and their features', exp: ['C1.2'], skill: 'forms',
          model: [
            step(T.show(T.swifts), 'Headings that split the facts: a <b>report</b>.'),
            step(T.show(T.tickets, 4), 'Speaker names and stage directions: a <b>script</b>.'),
            step(T.show(T.lunch, 4), 'One side, trying to convince: an <b>opinion</b>.'),
            step(T.show(T.leaf), 'Things you need, then numbered steps: <b>instructions</b>.'),
            step(T.show(T.snow), 'Short lines, pictures in words: a <b>poem</b>.')
          ],
          guided: [function () { return form(1); }, function () { return formClue(1); }, matchForm],
          check: [function () { return form(2); }, function () { return formClue(2); }, function () { return formTf(2); }, matchForm, function () { return form(3); }],
          coach: '<p>Collect real examples at home: a recipe, a news report, a flyer, a poem. Ask what gives each one away.</p>',
          mistake: '<p>Calling every text a story. Ask: does it have characters and events, or facts?</p>' },
        { slug: 'pov', title: 'First, second or third person', exp: ['C1.6'], skill: 'pov',
          model: [
            step(W.sent('<b>I</b> checked every wire twice, and <b>my</b> stomach sank.'), '<b>First</b> person: the narrator is in the story.'),
            step(W.sent('<b>You</b> push up with <b>your</b> legs.'), '<b>Second</b> person: the reader is in the story.'),
            step(W.sent('<b>She</b> knew exactly who it was for.'), '<b>Third</b> person: told from outside.'),
            step(W.sent(Q1 + 'We help each other,' + Q2 + ' he said.'), 'Words inside quotation marks are a character speaking. Skip them.'),
            step(W.tile('he said'), 'Outside the marks: <b>he</b>. Third person.')
          ],
          guided: [function () { return narrator(1); }, function () { return narratorWord(1); }, function () { return povLine(1); }],
          check: [function () { return narrator(2); }, function () { return narratorWord(2); }, function () { return narratorTf(2); }, function () { return povLine(2); }, function () { return narrator(3); }],
          coach: '<p>Retell a familiar story in a different person. "I lost my mitten" becomes "She lost her mitten".</p>',
          mistake: '<p>Being fooled by I inside quotation marks. Check the words outside them.</p>' },
        { slug: 'other-view', title: 'Another narrator changes the story', exp: ['C1.6'], skill: 'other-view',
          model: [
            step(W.sent('At the gym door, <b>I</b> almost got cold feet.'), 'Only the narrator knows this feeling.'),
            step(W.means('people', 'Told by Coach Ahmed?'), 'We would see a player at the door, but not the fear inside.'),
            step(W.sent('Jonah wanted to keep going, but <b>he</b> said nothing.'), 'Third person.'),
            step(W.sent('<b>I</b> wanted to keep going, but <b>I</b> said nothing.'), 'As Jonah, first person: now we hear him from the inside.'),
            step(W.means('think', 'Told by Kokum?'), 'We would learn what she knows about the ice.')
          ],
          guided: [function () { return altPov(1); }, function () { return retell(1); }, function () { return whoKnows(1); }],
          check: [function () { return altPov(2); }, function () { return retell(2); }, function () { return altTf(2); }, function () { return whoKnows(2); }, function () { return altPov(3); }],
          coach: '<p>Ask: "How would the chipmunk tell ' + '‘' + 'Your First Night in the Tent' + '’' + '?" Write two lines of it together.</p>',
          mistake: '<p>Thinking the events change. Mostly what we know, and how we feel about it, changes.</p>' }
      ]
    }],
    practice: [
      { id: 'evidence', name: 'Back it up with evidence', code: 'C1.1', gen: fact },
      { id: 'summary', name: 'Sum it up', code: 'C2.6', gen: summary },
      { id: 'conclude', name: 'Draw a conclusion', code: 'C2.6', gen: conclude },
      { id: 'predict', name: 'Predict, then check', code: 'C2.3', gen: predict },
      { id: 'monitor', name: 'Fix it when it stops making sense', code: 'C2.4', gen: whichFix },
      { id: 'purpose', name: 'Know why you are reading', code: 'C2.2', gen: purpose },
      { id: 'forms', name: 'Forms and their features', code: 'C1.2', gen: form },
      { id: 'pov', name: 'First, second or third person', code: 'C1.6', gen: narrator },
      { id: 'other-view', name: 'Another narrator', code: 'C1.6', gen: altPov }
    ],
    tasks: [
      { id: 'before', title: 'What I already know', code: 'C2.1', pic: W.icon('think'), say: 'Before reading, list what you already know about the topic.', write: true,
        run: ['Choose an information book or article linked to science or social studies.', 'Before reading, the child lists what they know, from life and from other subjects.', 'After reading, ask: "What did you already know that helped? What was new?"'],
        rubric: ['Lists nothing yet.', 'Lists a little with help.', 'Lists what they know and links it to the text.', 'Uses knowledge from several sources to understand and question the text.'] },
      { id: 'connect', title: 'Connections', code: 'C2.5', pic: W.icon('people'), say: 'How does this text connect to your life, another text, and the world?', write: true,
        run: ['After reading, ask for three connections: to the child' + '’' + 's own life, to another book or film, and to something happening in the world.', 'Ask them to explain how each one helps them understand the text.'],
        rubric: ['No connection yet.', 'One connection with help.', 'Three clear connections.', 'Three connections, each explained and used to deepen understanding.'] },
      { id: 'indigenous-creators', title: 'Texts by First Nations, Métis and Inuit creators', code: 'C1.7', pic: W.icon('read'), say: 'Read, listen to or watch a work by a First Nations, Métis or Inuit creator.',
        run: ['With your librarian, choose a novel, graphic novel, podcast or film by a First Nations, Métis or Inuit creator. Check the creator' + '’' + 's nation or community.',
          'After reading, talk about the history, relationships, community and lived experience it shows.', 'Ask: "What did the creator want readers to understand?"'],
        rubric: ['Recalls little of it yet.', 'Retells it with help.', 'Explains what it shows about the community and its history.', 'Explains the creator' + '’' + 's message and connects it to life today, respectfully.'],
        coach: '<p>Let the creator' + '’' + 's own voice lead. Each nation and community is distinct: avoid treating Indigenous cultures as one.</p>' },
      { id: 'what-helped', title: 'Which strategies helped?', code: 'C2.7', pic: W.icon('star'), say: 'Which reading strategies helped you most? Set a goal for next time.', write: true,
        run: ['After reading two different texts (one story, one information text), ask which strategies helped with each: predicting, picturing, summarizing, connecting.', 'Compare: did the same strategy help both times? Set one reading goal.'],
        rubric: ['Cannot name a strategy yet.', 'Names a strategy with help.', 'Compares two strategies and sets a goal.', 'Explains clearly why each strategy worked, and sets a specific goal.'] }
    ]
  });

  Q.shapes('reading', {
    evidence: [[1, 'tap-sentence', evidenceTap], [1, 'which-line', evidenceLine], [2, 'tf', factTf]],
    summary: [[1, 'detail', detail], [1, 'support', support], [1, 'order', sequence], [2, 'tf', summaryTf]],
    conclude: [[1, 'clue-words', clueWords], [1, 'tap-clue', concludeTap], [2, 'tf', concludeTf]],
    predict: [[1, 'clue', predictClue], [1, 'tap-clue', clueTap], [2, 'adjust', adjust], [2, 'tf', predictTf]],
    monitor: [[1, 'match', matchFix], [1, 'name-it', nameIt], [1, 'pick', goodFixes], [2, 'tf', fixTf]],
    purpose: [[1, 'which-text', whichText], [1, 'how-to-read', howToRead], [2, 'tf', purposeTf]],
    forms: [[1, 'clue', formClue], [1, 'match', matchForm], [2, 'tf', formTf]],
    pov: [[1, 'word', narratorWord], [1, 'which-line', povLine], [2, 'tf', narratorTf]],
    'other-view': [[1, 'retell', retell], [1, 'who-knows', whoKnows], [2, 'tf', altTf]]
  });
})();
