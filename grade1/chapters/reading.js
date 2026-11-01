/* Grade 1: reading for meaning. A full chapter: every idea has two worked examples, three questions together and five on
   your own, its own practice skill asked in four or more ways, and the chapter has "Read and answer" sets.
   Ontario 2023 Language, Grade 1, Strand C (Comprehension):
   C1.1 read and comprehend short, simple texts                 C1.2 simple literary and informational text forms
   C1.6 the narrator's point of view, and another point of view to tell the story
   C2.1 activate prior knowledge                                C2.2 purposes for reading (enjoyment or finding information)
   C2.3 predictions using evidence from the text                C2.4 rereading, visualizing and asking questions to check understanding
   C2.5 connections to their own lives and other texts          C2.6 important information, including the main idea
   With a grown-up: C1.7 texts by First Nations, Metis and Inuit creators, C2.7 which strategies helped.
   Passages are in ../texts.js. Answer checks: tests/verify/grade1-reading.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var KINDS = ['story', 'information', 'poem', 'instructions', 'letter'];
  var PURPOSE = { story: 'to enjoy a story', information: 'to learn facts', instructions: 'to learn how to do something', letter: 'to hear what someone thinks', poem: 'to enjoy a poem' };
  var CLUE = { story: 'It has characters and things that happen.', information: 'It has headings and facts.', instructions: 'It has numbered steps.',
    letter: 'It starts with ' + '“' + 'Dear' + '”' + '.', poem: 'It has short lines that rhyme.' };
  /* a problem while reading, the fix that helps, and its picture */
  var FIX = [['A sentence does not make sense.', 'Read it again, slowly.', 'again'], ['You cannot see it in your head.', 'Make a picture in your head.', 'think'],
    ['You do not know a word.', 'Look at the picture for a clue.', 'read'], ['You wonder why something happened.', 'Ask a question, then read on.', 'talk'],
    ['You forgot what happened.', 'Go back and look.', 'before']];
  var NOFIX = ['Skip to the end.', 'Close the book.', 'Read faster.', 'Keep going anyway.'];
  var Q1 = '“', Q2 = '”';

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function kindName(k) { return k === 'information' ? 'an information text' : k === 'instructions' ? 'instructions' : 'a ' + k; }
  /* the passage to use: the one given (in a "Read and answer" set), or one that has what the question needs, sized for the level */
  function text(need, lv, t) { return t && t[need] ? t : R.pick(T.list(need, lv)); }
  function at(t, words) { for (var i = 0; i < t.lines.length; i++) if (t.lines[i] && t.lines[i].charAt(0) !== '#' && t.lines[i].indexOf(words) >= 0) return i; return -1; }
  function stopOf(t) { return t.predict.stop || t.predict.upTo; }
  function shown(t) { return T.body({ lines: typeof stopOf(t) === 'number' ? t.lines.slice(0, stopOf(t)) : t.lines.slice(0, at(t, stopOf(t)) + 1) }); }
  function q(s) { return Q1 + s + Q2; }
  function stories() { return T.list('pov').filter(function (x) { return x.kind === 'story'; }); }
  /* outside speech marks, which word shows who is telling the story */
  function povWord(t) {
    var said = T.body(t).join(' ').replace(/“[^”]*”/g, '');
    if (t.pov === 'first') return 'I';
    return ['They', 'She', 'He'].filter(function (w) { return new RegExp('\\b' + w + '\\b', 'i').test(said); })[0];
  }

  /* ---------- find it in the text (C1.1) ---------- */
  function fact(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    return Q.one(f[0], f[1], f.slice(2, lv > 1 ? 4 : 3), { fig: T.show(t), prompt: 'Find the sentence that tells you.', hint: 'Look back in the text. The answer is there.',
      explain: 'The text says: ' + q(t.lines[at(t, f[4])]), meta: { k: 'g1-fact', t: t.title, q: f[0] } });
  }
  function evidence(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var i = at(t, f[4]);
    return { q: 'Tap the sentence that answers: <b>' + f[0] + '</b>', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Find the words from the question in the text.', hint: 'Find the question words. Read that sentence.', explain: 'It tells you: <b>' + f[1] + '</b>.',
      meta: { k: 'g1-tap-fact', t: t.title, q: f[0] } };
  }
  function findLine(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var right = t.lines[at(t, f[4])], others = T.body(t).filter(function (l) { return l !== right; });
    return Q.one('Which sentence answers this? <b>' + f[0] + '</b>', right, R.some(others, lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Which sentence has the answer in it?', explain: W.sent(right), meta: { k: 'g1-find-line', t: t.title, q: f[0] } });
  }
  function factTf(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(f.slice(2, 4));
    return { q: f[0] + '<br>' + Q.name() + ' says: <b>' + said + '</b>.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['The text says so.', 'The text says something else.'], answer: right ? 0 : 1 },
      hint: 'Find the sentence that answers the question.', explain: 'The text says: ' + q(t.lines[at(t, f[4])]), meta: { k: 'g1-fact-tf', t: t.title, q: f[0], said: said } };
  }

  /* ---------- what is it mostly about? (C2.6) ---------- */
  function mainIdea(lv, t) {
    t = text('main', lv, t);
    return Q.one('What is this text <b>mostly</b> about?', t.main[0], t.main.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which one fits the whole text, not just one part?',
      hint: 'The main idea is about the whole text.', explain: W.web(t.main[0], ['every part']), meta: { k: 'g1-main', t: t.title } });
  }
  function detail(lv, t) {
    t = text('main', lv, t);
    return Q.one('Which one is only <b>one small part</b> of the text?', t.main[1], [t.main[0]].concat(lv > 1 ? [t.main[2]] : []), { fig: T.show(t), prompt: 'Which one does not cover the whole text?',
      hint: 'A small part is just one thing in the text.', explain: W.web(t.main[0], [t.main[1]]), meta: { k: 'g1-detail', t: t.title } });
  }
  function bestTitle(lv, t) {
    t = text('main', lv, t);
    var others = R.some(T.list('main').filter(function (x) { return x !== t; }).map(function (x) { return x.title; }), lv > 1 ? 2 : 1);
    return Q.tiles('Which title fits this text best?', t.title, others, { fig: W.passage('', t.lines), hint: 'A good title tells what the whole text is about.',
      explain: 'It is mostly about this: ' + t.main[0], meta: { k: 'g1-best-title' } });
  }
  function mainTf(lv, t) {
    t = text('main', lv, t);
    var right = R.int(0, 1) === 1, said = right ? t.main[0] : t.main[1];
    return { q: Q.name() + ' says the text is mostly about this:', fig: W.sent(said) + T.show(t), type: 'tf', answer: right,
      why: { options: ['It fits the whole text.', 'It is only one small part.'], answer: right ? 0 : 1 },
      hint: 'Does it cover every part of the text?', explain: 'Mostly about: ' + t.main[0], meta: { k: 'g1-main-tf', t: t.title, said: said } };
  }

  /* ---------- kinds of texts (C1.2) ---------- */
  function form(lv, t) {
    t = text('kind', lv, t);
    return Q.tiles('What kind of text is this?', t.kind, R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Look at it: headings, numbers, short lines that rhyme, or "Dear"?', explain: 'It is <b>' + kindName(t.kind) + '</b>. ' + CLUE[t.kind], meta: { k: 'g1-form', t: t.title } });
  }
  function formClue(lv, t) {
    t = text('kind', lv, t);
    return Q.one('This is <b>' + kindName(t.kind) + '</b>. What shows it?', CLUE[t.kind], R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 2 : 1).map(function (k) { return CLUE[k]; }), {
      fig: T.show(t), hint: 'Look at how the text looks.', explain: CLUE[t.kind], meta: { k: 'g1-form-clue' } });
  }
  function oneOfEach(n) {
    return R.some(KINDS, n).map(function (k) { return R.pick(T.list('kind').filter(function (t) { return t.kind === k; })); });
  }
  function matchForm() {
    return { q: 'Match each title to its kind of text.', type: 'match', pairs: oneOfEach(3).map(function (t) { return [t.title, t.kind]; }), hint: 'Think about what each one would look like.', explain: 'The title is a clue.', meta: { k: 'g1-match-form' } };
  }
  function formTf(lv, t) {
    t = text('kind', lv, t);
    var right = R.int(0, 1) === 1, other = R.pick(KINDS.filter(function (k) { return k !== t.kind; })), said = right ? t.kind : other, why = R.shuffle([CLUE[t.kind], CLUE[other]]);
    return { q: Q.name() + ' says this is <b>' + kindName(said) + '</b>.', fig: T.show(t), type: 'tf', answer: right, why: { options: why, answer: why.indexOf(CLUE[t.kind]) },
      hint: 'Look at how it looks.', explain: 'It is <b>' + kindName(t.kind) + '</b>. ' + CLUE[t.kind], meta: { k: 'g1-kind-tf', said: said } };
  }

  /* ---------- think before you read (C2.1, C2.2) ---------- */
  function know(lv, t) {
    t = text('know', lv, t);
    return Q.one('Before you read <b>' + t.title + '</b>, what do you already know that could help?', t.know[0], t.know[1].slice(0, lv > 1 ? 2 : 1), { prompt: 'Which one is about the same thing as the title?',
      hint: 'Which one is about the same thing as the title?', explain: W.means('think', t.know[0]), meta: { k: 'g1-know', t: t.title } });
  }
  function knowTf(lv, t) {
    t = text('know', lv, t);
    var right = R.int(0, 1) === 1, said = right ? t.know[0] : R.pick(t.know[1]);
    return { q: 'Before reading <b>' + t.title + '</b>, ' + Q.name() + ' thinks:', fig: W.means('think', said), type: 'tf', answer: right,
      why: { options: ['It is about the same thing as the title.', 'It is about something else.'], answer: right ? 0 : 1 },
      hint: 'Does it fit the title?', explain: 'This could help: ' + t.know[0], meta: { k: 'g1-know-tf', t: t.title, said: said } };
  }
  function purpose(lv, t) {
    t = text('purpose', lv, t);
    return Q.one('Why would you read this?', t.purpose, R.some(KINDS.filter(function (k) { return PURPOSE[k] !== t.purpose; }).map(function (k) { return PURPOSE[k]; }), lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Is it a story, facts, steps, a poem or a letter?', explain: 'You would read it <b>' + t.purpose + '</b>.', meta: { k: 'g1-purpose', t: t.title } });
  }
  function whichText(lv) {
    var ts = oneOfEach(lv > 1 ? 3 : 2), want = ts[0];
    return Q.tiles('You want <b>' + want.purpose + '</b>. Which would you read?', want.title, ts.slice(1).map(function (t) { return t.title; }), {
      hint: 'Is each title a story, facts, steps, a letter or a poem?', explain: '<b>' + want.title + '</b> is ' + kindName(want.kind) + '.', meta: { k: 'g1-which-text', want: want.purpose } });
  }
  function purposeTf(lv, t) {
    t = text('purpose', lv, t);
    var right = R.int(0, 1) === 1, said = right ? t.purpose : PURPOSE[R.pick(KINDS.filter(function (k) { return PURPOSE[k] !== t.purpose; }))];
    return { q: Q.name() + ' says: I would read this <b>' + said + '</b>.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['That is what this kind of text is for.', 'This kind of text is for something else.'], answer: right ? 0 : 1 },
      hint: 'What kind of text is it?', explain: 'It is ' + kindName(t.kind) + ': you read it <b>' + t.purpose + '</b>.', meta: { k: 'g1-purpose-tf', said: said } };
  }

  /* ---------- guess what comes next (C2.3) ---------- */
  function predict(lv, t) {
    t = text('predict', lv, t); var p = t.predict;
    return Q.one('What will <b>most likely</b> happen next?', p.right, p.wrong.slice(0, lv > 1 ? 2 : 1), { fig: T.show(t, stopOf(t)), prompt: 'Look for a clue: <b>' + p.clue + '</b>.',
      hint: 'Use a clue from the text.', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g1-predict', t: t.title } });
  }
  function predictClue(lv, t) {
    t = text('predict', lv, t); var p = t.predict;
    var other = R.pick(shown(t).filter(function (l) { return l.indexOf(p.clue) < 0; }));
    return Q.one('You guess: <b>' + p.right + '</b> Which words in the text helped?', p.clue, [other.split(' ').slice(0, 4).join(' ')], { fig: T.show(t, stopOf(t)),
      hint: 'Which words point to what comes next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g1-predict-clue', t: t.title } });
  }
  function clueTap(lv, t) {
    t = text('predict', lv, t); var p = t.predict, i = at(t, p.clue);
    return { q: 'You guess: <b>' + p.right + '</b> Tap the sentence with the clue.', type: 'tap', pic: T.show(t, stopOf(t), { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which sentence makes you think so?', hint: 'Which sentence points to what comes next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g1-clue-tap', t: t.title } };
  }
  function predictTf(lv, t) {
    t = text('predict', lv, t); var p = t.predict, right = R.int(0, 1) === 1, said = right ? p.right : R.pick(p.wrong);
    return { q: Q.name() + ' guesses: <b>' + said + '</b>', fig: T.show(t, stopOf(t)), type: 'tf', answer: right,
      why: { options: ['A clue in the text points to it.', 'Nothing in the text points to it.'], answer: right ? 0 : 1 },
      hint: 'Is there a clue in the text?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g1-predict-tf', t: t.title, said: said } };
  }

  /* ---------- when it does not make sense (C2.4) ---------- */
  function fixFor(p) { return W.means(p[2], p[1]); }
  function whichFix(lv) {
    var p = R.pick(FIX);
    return Q.one('<b>Problem:</b> ' + p[0] + ' What could you do?', p[1], R.some(NOFIX, lv > 1 ? 2 : 1), { prompt: 'Good readers stop and fix it.',
      hint: 'Pick the one that fixes the problem.', explain: fixFor(p), meta: { k: 'g1-which-fix', p: p[0] } });
  }
  function fixUp() {
    return Q.all('A part does not make sense. Pick every good idea.', R.some(FIX, 2).map(function (p) { return p[1]; }), R.some(NOFIX, 2), {
      hint: 'Good readers slow down and check.', explain: 'Read it again, picture it, look at the picture, or ask a question.', meta: { k: 'g1-fix-up' } });
  }
  function matchFix() {
    return { q: 'Match each problem to a fix.', type: 'match', pairs: R.some(FIX, 3).map(function (p) { return [p[0], p[1]]; }), hint: 'Which fix solves that problem?', explain: 'Each problem has a fix.', meta: { k: 'g1-match-fix' } };
  }
  function fixTf() {
    var right = R.int(0, 1) === 1, said = right ? R.pick(FIX)[1] : R.pick(NOFIX), n = Q.name();
    return { q: n + ' reads a part that does not make sense. ' + n + ' says:', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['It helps fix the problem.', 'It does not fix the problem.'], answer: right ? 0 : 1 },
      hint: 'Will it help the reading make sense?', explain: right ? 'Good readers stop and fix it.' : 'Stop and fix it instead: read it again, or picture it.', meta: { k: 'g1-fixup-tf', said: said } };
  }

  /* ---------- make a connection (C2.5) ---------- */
  function connect(lv, t) {
    t = text('connect', lv, t);
    return Q.one('Which is a <b>connection</b> to this text?', t.connect[0], t.connect[1].slice(0, lv > 1 ? 2 : 1), { fig: T.show(t), prompt: 'Which one is like something in the text?',
      hint: 'A connection is like something in the text.', explain: W.sent('<mark class="hl">' + t.connect[2] + '</mark>') + W.means('people', t.connect[0]), meta: { k: 'g1-connect', t: t.title } });
  }
  function connectTf(lv, t) {
    t = text('connect', lv, t);
    var right = R.int(0, 1) === 1, said = right ? t.connect[0] : R.pick(t.connect[1]);
    return { q: Q.name() + ' reads this and says:', fig: W.means('people', said) + T.show(t), type: 'tf', answer: right,
      why: { options: ['It is like a part of the text.', 'It is not like the text.'], answer: right ? 0 : 1 },
      hint: 'Is it like something in the text?', explain: 'This is like the text: ' + t.connect[0], meta: { k: 'g1-connect-tf', t: t.title, said: said } };
  }
  function connectTap(lv, t) {
    t = text('connect', lv, t); var i = at(t, t.connect[2]);
    return { q: Q.name() + ' says: <b>' + t.connect[0] + '</b> Tap the part of the text it is like.', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which sentence is like that?', hint: 'Find the part that is the same.', explain: W.sent('<mark class="hl">' + t.connect[2] + '</mark>'), meta: { k: 'g1-connect-tap', t: t.title } };
  }
  function connectWhich(lv) {
    var ts = R.some(T.list('connect'), lv > 1 ? 3 : 2), want = ts[0];
    return Q.tiles(Q.name() + ' says: <b>' + want.connect[0] + '</b> Which text is it a connection to?', want.title, ts.slice(1).map(function (t) { return t.title; }), {
      hint: 'Which text is about the same thing?', explain: '<b>' + want.title + '</b>: ' + q(want.lines[at(want, want.connect[2])]), meta: { k: 'g1-connect-which', said: want.connect[0] } });
  }

  /* ---------- who is telling the story? (C1.6) ---------- */
  function narrator(lv, t) {
    t = t && t.kind === 'story' ? t : R.pick(stories());
    return { q: 'Who is telling this story?', fig: T.show(t), type: 'tap', tiles: ['Someone in the story (I)', 'Someone outside the story (she, he, they)'], answer: t.pov === 'first' ? 0 : 1,
      prompt: 'Look for <b>I</b> and <b>my</b> outside the speech marks.', hint: 'I and my: someone in the story is telling it.',
      explain: t.pov === 'first' ? 'The teller says <b>I</b>.' : 'The teller says <b>' + povWord(t).toLowerCase() + '</b>: they are outside the story.', meta: { k: 'g1-narrator', t: t.title } };
  }
  function narratorWord(lv, t) {
    t = t && t.kind === 'story' ? t : R.pick(stories());
    var first = t.pov === 'first', w = povWord(t);
    return Q.tiles('Which word shows who is telling the story?', w, first ? ['She', 'They'] : ['I', 'We'], { fig: T.show(t),
      hint: 'Look for I, or for she, he and they.', explain: first ? '<b>I</b>: the teller is in the story.' : '<b>' + w + '</b>: the teller is outside the story.', meta: { k: 'g1-narrator-word', t: t.title } });
  }
  function povTf(lv, t) {
    t = t && t.kind === 'story' ? t : R.pick(stories());
    var right = R.int(0, 1) === 1, saysIn = right === (t.pov === 'first');
    return { q: Q.name() + ' says: <b>' + (saysIn ? 'Someone in the story is telling it.' : 'Someone outside the story is telling it.') + '</b>', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['The teller says I and my.', 'The teller says she, he or they.'], answer: t.pov === 'first' ? 0 : 1 },
      hint: 'Look for I and my outside the speech marks.', explain: t.pov === 'first' ? 'The teller says <b>I</b>.' : 'The teller says <b>' + povWord(t).toLowerCase() + '</b>.', meta: { k: 'g1-pov-tf', t: t.title, inside: saysIn } };
  }
  function firstPersonLine(lv) {
    var plain = function (l) { return !/[“”]/.test(l); };
    var mine = R.pick(stories().filter(function (t) { return t.pov === 'first'; })), right = R.pick(T.body(mine).filter(function (l) { return plain(l) && /\b(I|my)\b/.test(l); }));
    var wrong = R.some(stories().filter(function (t) { return t.pov === 'third'; }).map(function (t) { return R.pick(T.body(t).filter(plain)); }), lv > 1 ? 2 : 1);
    return Q.one('Which sentence is told by someone <b>in</b> the story?', right, wrong, { hint: 'Look for I or my.', explain: 'It says <b>I</b> or <b>my</b>.', meta: { k: 'g1-first-line' } });
  }

  /* ---------- tell it another way (C1.6) ---------- */
  function otherTeller(lv, t) {
    t = text('other', lv, t);
    return Q.one('Who else in the story could tell it in a <b>different way</b>?', cap(t.other[0]), t.other[1].slice(0, lv > 1 ? 2 : 1).map(cap), { fig: T.show(t),
      prompt: 'Who else is in the story?', hint: 'Pick someone who was there.', explain: W.means('talk', cap(t.other[0]) + ': ' + q(t.other[2])), meta: { k: 'g1-other-teller', t: t.title } });
  }
  function otherTf(lv, t) {
    t = text('other', lv, t);
    var right = R.int(0, 1) === 1, who = right ? t.other[0] : R.pick(t.other[1]);
    return { q: Q.name() + ' says <b>' + who + '</b> could tell this story too.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['They are in the story.', 'They are not in the story.'], answer: right ? 0 : 1 },
      hint: 'Was that one in the story?', explain: cap(t.other[0]) + ' was there, and could tell it.', meta: { k: 'g1-other-tf', t: t.title, who: who } };
  }
  function otherSays(lv, t) {
    t = text('other', lv, t);
    var wrong = R.some(T.list('other').filter(function (x) { return x !== t; }).map(function (x) { return x.other[2]; }), lv > 1 ? 2 : 1);
    return Q.one('Now <b>' + t.other[0] + '</b> tells this story. Which fits?', t.other[2], wrong, { fig: T.show(t),
      hint: 'Which one is about this story?', explain: W.means('talk', cap(t.other[0]) + ': ' + q(t.other[2])), meta: { k: 'g1-other-says', t: t.title } });
  }
  function matchOther() {
    return { q: 'Match each story to someone else who could tell it.', type: 'match', pairs: R.some(T.list('other'), 3).map(function (t) { return [t.title, cap(t.other[0])]; }),
      hint: 'Who else was in that story?', explain: 'Someone else in the story could tell it their way.', meta: { k: 'g1-match-other' } };
  }

  /* ---------- read and answer: five questions about one passage ---------- */
  function ask(t) {
    var fs = R.some(t.facts, 2), lv = T.words(t) < 45 ? 1 : 2, more = [];
    if (t.main) more.push(function () { return mainIdea(lv, t); });
    if (t.predict) more.push(function () { return predict(lv, t); });
    if (t.kind === 'story') more.push(function () { return narrator(lv, t); });
    if (t.connect) more.push(function () { return connect(lv, t); });
    more.push(function () { return form(lv, t); }, function () { return purpose(lv, t); }, function () { return factTf(lv, t, R.pick(t.facts)); });
    return [fact(lv, t, fs[0]), evidence(lv, t, fs[1])].concat(R.some(more, 3).map(function (f) { return f(); }));
  }
  var readable = T.list('facts').filter(function (t) { return t.facts.length >= 2; }).sort(function (a, b) { return T.words(a) - T.words(b); });

  Atlas.register('reading', {
    full: true,
    read: { texts: readable, show: function (t) { return T.show(t); }, ask: ask },
    lessons: [{
      id: 'understand', title: 'Understanding what you read', sub: 'Find facts, the main idea, and the kind of text.',
      concepts: [
        { slug: 'find', title: 'Find it in the text', exp: ['C1.1'], skill: 'find',
          model: [
            step(T.show(T.kite), 'Read it.'),
            step(W.sent('What colours was the kite?'), 'A question.'),
            step(W.sent('It was <mark class="hl">red and yellow</mark>.'), 'Look back. The answer is there.'),
            step(T.show(T.geese), 'Now facts.'),
            step(W.sent('What are <mark class="hl">baby geese</mark> called?'), 'Find these words in the text.'),
            step(W.sent('<mark class="hl">Baby geese</mark> are called <b>goslings</b>.'), 'Same words. There is the answer.')
          ],
          guided: [function () { return fact(1); }, function () { return evidence(1); }, function () { return findLine(1); }],
          check: [function () { return fact(2); }, function () { return evidence(2); }, function () { return findLine(2); }, function () { return factTf(2); }, function () { return fact(3); }],
          coach: '<p>Read the passage aloud with the child first if needed. Then ask them to put a finger on the sentence that answers the question. Looking back is a skill, not cheating.</p>',
          mistake: '<p>Answering from memory or a guess. Always point to the words in the text.</p>' },
        { slug: 'main', title: 'What is it mostly about?', exp: ['C2.6'], skill: 'main',
          model: [
            step(T.show(T.kite), 'Read it all.'),
            step(W.sent('The field is big.'), 'Only one small part.'),
            step(W.web('Tala flies her new kite, and Grandpa watches.', ['red and yellow', 'ran across the field', 'Grandpa clapped']), 'This one fits every part.'),
            step(T.show(T.bees), 'Now facts.'),
            step(W.web('Bees visit flowers, make honey and help plants grow.', ['drink nectar', 'make honey', 'carry pollen']), 'Each heading holds up the roof.')
          ],
          key: '<p>This is called the <b>main idea</b>.</p>',
          guided: [function () { return mainIdea(1); }, function () { return detail(1); }, function () { return mainTf(1); }],
          check: [function () { return mainIdea(2); }, function () { return detail(2); }, function () { return bestTitle(2); }, function () { return mainTf(2); }, function () { return mainIdea(3); }],
          coach: '<p>After any book, ask: "Tell me what it was about in one sentence." Then: "Does that fit the whole book?"</p>',
          mistake: '<p>Choosing a small detail they liked. Ask: "Is that the whole story, or one part?"</p>' },
        { slug: 'kinds', title: 'Kinds of texts', exp: ['C1.2'], skill: 'forms',
          model: [
            step(T.show(T.kite), 'Characters and things that happen: a <b>story</b>.'),
            step(T.show(T.frogs), 'Headings and facts: <b>information</b>.'),
            step(T.show(T.seed), 'Numbered steps: <b>instructions</b>.'),
            step(T.show(T.note), '"Dear": a <b>letter</b>.'),
            step(T.show(T.rain), 'Short lines that rhyme: a <b>poem</b>.')
          ],
          guided: [function () { return form(1); }, function () { return formClue(1); }, matchForm],
          check: [function () { return form(2); }, function () { return formClue(2); }, function () { return formTf(2); }, matchForm, function () { return form(3); }],
          coach: '<p>At the library, sort books: stories, information books, poems. Ask how the child can tell.</p>',
          mistake: '<p>Calling every book a story. Ask: "Is it about made-up characters, or real facts?"</p>' }
      ]
    }, {
      id: 'strategies', title: 'Reading strategies', sub: 'What good readers do before, during and after reading.',
      concepts: [
        { slug: 'before', title: 'Think before you read', exp: ['C2.1', 'C2.2'], skill: 'before',
          model: [
            step(W.sent('Canada Geese'), 'Read the title.'),
            step(W.means('think', 'Some birds fly south for the winter.'), 'What do I know?'),
            step(W.means('read', 'to learn facts'), 'Why am I reading?'),
            step(W.sent('Tala and the Kite'), 'Another title.'),
            step(W.means('think', 'Wind can lift things into the air.')),
            step(W.means('star', 'to enjoy a story'))
          ],
          guided: [function () { return know(1); }, function () { return purpose(1); }, function () { return knowTf(1); }],
          check: [function () { return know(2); }, function () { return purpose(2); }, function () { return whichText(2); }, function () { return purposeTf(2); }, function () { return knowTf(2); }],
          coach: '<p>Before reading, look at the cover together and ask: "What do you know about this? Is this book for fun or for facts?"</p>',
          mistake: '<p>Sharing something unrelated to the topic. Bring it back to the title.</p>' },
        { slug: 'predict', title: 'Guess what comes next', exp: ['C2.3'], skill: 'predict',
          model: [
            step(T.show(T.kite, 3), 'Stop and think.'),
            step(W.sent('She <mark class="hl">ran across the big field</mark>.'), 'A clue.'),
            step(W.sent('The kite will fly up into the sky.'), 'My guess, from the clue.'),
            step(T.show(T.biscuit, 'came from the closet'), 'Another story.'),
            step(W.sent('It <mark class="hl">came from the closet</mark>.'), 'The clue this time.'),
            step(W.sent('The child will find Biscuit in the closet.'), 'Read on to check.')
          ],
          key: '<p>This is called a <b>prediction</b>. Use a clue from the text.</p>',
          guided: [function () { return predict(1); }, function () { return predictClue(1); }, function () { return clueTap(1); }],
          check: [function () { return predict(2); }, function () { return predictClue(2); }, function () { return predictTf(2); }, function () { return clueTap(2); }, function () { return predict(3); }],
          coach: '<p>Stop before turning a page and ask, "What do you think will happen? What makes you think so?"</p>',
          mistake: '<p>A wild guess with no clue. Ask: "What in the story made you think that?"</p>' },
        { slug: 'check', title: 'When it does not make sense', exp: ['C2.4'], skill: 'fix-up',
          model: [
            step(W.sent('The loon <mark class="hl">dove</mark> under the water.'), 'A word I do not know.'),
            step(fixFor(FIX[2]), 'The bird went down, under the water.'),
            step(W.icon('think'), 'Hmm. A whole sentence did not make sense.'),
            step(fixFor(FIX[0])),
            step(fixFor(FIX[1]), 'Still stuck? See it.'),
            step(fixFor(FIX[3]), 'Wondering why? Ask.')
          ],
          guided: [function () { return whichFix(1); }, fixUp, matchFix],
          check: [function () { return whichFix(2); }, fixUp, fixTf, matchFix, function () { return whichFix(3); }],
          coach: '<p>Model it: "Hmm, that did not make sense. I will read it again." Children copy what they see.</p>',
          mistake: '<p>Reading on when lost. Teach the child to stop and say, "Wait, that did not make sense."</p>' },
        { slug: 'connect', title: 'Make a connection', exp: ['C2.5'], skill: 'connect',
          model: [
            step(T.show(T.snow), 'Read it.'),
            step(W.sent('I <mark class="hl">made a snow angel</mark>.'), 'This part...'),
            step(W.means('people', 'I made a snow angel in my yard.'), '...is like my life.'),
            step(T.show(T.ferry), 'Another one.'),
            step(W.sent('We <mark class="hl">had a picnic</mark> by the water.')),
            step(W.means('people', 'I had a picnic at the beach.'), 'That part is like me too.')
          ],
          guided: [function () { return connect(1); }, function () { return connectTf(1); }, function () { return connectTap(1); }],
          check: [function () { return connect(2); }, function () { return connectTap(2); }, function () { return connectWhich(2); }, function () { return connectTf(2); }, function () { return connect(3); }],
          coach: '<p>Ask: "Does this remind you of anything you did, or another book?" Then: "Which part of the story is it like?"</p>',
          mistake: '<p>A connection to something not in the text. Ask: "Which part of the story is it like?"</p>' }
      ]
    }, {
      id: 'teller', title: 'Who is telling it?', sub: 'The teller of the story, and who else could tell it.',
      concepts: [
        { slug: 'narrator', title: 'Who is telling the story?', exp: ['C1.6'], skill: 'narrator',
          model: [
            step(W.sent('<b>I</b> made a snow angel.'), 'I: someone in the story.'),
            step(W.sent('<b>She</b> ran across the field.'), 'She: someone outside the story.'),
            step(W.sent(Q1 + 'We made it together!' + Q2 + ' <b>he</b> said.'), 'Skip the speech marks. Look for <b>he</b>.'),
            step(W.sent('<b>My</b> dog Biscuit was not in his bed.'), '<b>My</b>: the child is telling it.')
          ],
          key: '<p>The one telling a story is the <b>narrator</b>.</p>',
          guided: [function () { return narrator(1); }, function () { return narratorWord(1); }, function () { return povTf(1); }],
          check: [function () { return narrator(2); }, function () { return narratorWord(2); }, function () { return firstPersonLine(2); }, function () { return povTf(2); }, function () { return narrator(3); }],
          coach: '<p>Read a page and ask: "Who is telling this? How do you know?" Point to I, she or they.</p>',
          mistake: '<p>Thinking the main character always tells the story. Look for the word I.</p>' },
        { slug: 'other', title: 'Tell it another way', exp: ['C1.6'], skill: 'other',
          model: [
            step(T.show(T.kite), 'Tala is in this story. Who else?'),
            step(W.means('talk', 'Grandpa: ' + q(T.kite.other[2])), 'Grandpa saw it all.'),
            step(T.show(T.biscuit), 'Who else is here?'),
            step(W.means('talk', 'Biscuit: ' + q(T.biscuit.other[2])), 'Even the dog!')
          ],
          guided: [function () { return otherTeller(1); }, function () { return otherTf(1); }, function () { return otherSays(1); }],
          check: [function () { return otherTeller(2); }, function () { return otherSays(2); }, matchOther, function () { return otherTf(2); }, function () { return otherTeller(3); }],
          coach: '<p>Retell a favourite story as another character: "Now you are the dog. What happened?"</p>',
          mistake: '<p>Picking someone who was not in the story. Ask: "Was that person there?"</p>' }
      ]
    }],
    practice: [
      { id: 'find', name: 'Find it in the text', code: 'C1.1', gen: fact },
      { id: 'main', name: 'What is it mostly about?', code: 'C2.6', gen: mainIdea },
      { id: 'forms', name: 'Kinds of texts', code: 'C1.2', gen: form },
      { id: 'before', name: 'Think before you read', code: 'C2.1, C2.2', gen: know },
      { id: 'predict', name: 'Guess what comes next', code: 'C2.3', gen: predict },
      { id: 'fix-up', name: 'Fix it when it does not make sense', code: 'C2.4', gen: whichFix },
      { id: 'connect', name: 'Make a connection', code: 'C2.5', gen: connect },
      { id: 'narrator', name: 'Who is telling the story?', code: 'C1.6', gen: narrator },
      { id: 'other', name: 'Tell it another way', code: 'C1.6', gen: otherTeller }
    ],
    tasks: [
      { id: 'fnmi-books', title: 'Books by First Nations, Métis and Inuit creators', code: 'C1.7', pic: W.icon('read'), say: 'Read a book by a First Nations, Métis or Inuit author. Tell what you learned.',
        run: ['With your librarian, choose a picture book by a First Nations, Métis or Inuit author or illustrator.', 'Read it together. Look at the author note to learn which nation or community the creator is from.', 'Ask: "What did you learn about the people, the land or the family in this book?"'],
        rubric: ['Does not share anything yet.', 'Shares one thing with help.', 'Tells something they learned from the book.', 'Tells what they learned and connects it respectfully to the creator' + '’' + 's community.'],
        coach: '<p>Let the book and its creator lead. Each nation and community is distinct; avoid treating them as one culture.</p>' },
      { id: 'what-helped', title: 'What helped me read?', code: 'C2.7', pic: W.icon('think'), say: 'After reading, tell what helped you understand.',
        run: ['After reading a book together, ask: "What helped you understand it?"', 'Offer choices if needed: thinking about what you knew, picturing it, reading again, looking at the pictures.'],
        rubric: ['Cannot name anything yet.', 'Names a strategy with prompting.', 'Names a strategy that helped.', 'Names a strategy and explains how it helped.'] }
    ]
  });

  Q.shapes('reading', {
    find: [[1, 'tap-sentence', evidence], [1, 'find-line', findLine], [2, 'tf', factTf]],
    main: [[1, 'detail', detail], [2, 'title', bestTitle], [1, 'tf', mainTf]],
    forms: [[1, 'clue', formClue], [2, 'match', matchForm], [2, 'tf', formTf]],
    before: [[1, 'purpose', purpose], [1, 'tf', knowTf], [2, 'which-text', whichText], [2, 'purpose-tf', purposeTf]],
    predict: [[1, 'clue', predictClue], [1, 'tap-clue', clueTap], [2, 'tf', predictTf]],
    'fix-up': [[1, 'pick', fixUp], [1, 'match', matchFix], [2, 'tf', fixTf]],
    connect: [[1, 'tf', connectTf], [1, 'tap', connectTap], [2, 'which-text', connectWhich]],
    narrator: [[1, 'word', narratorWord], [1, 'tf', povTf], [2, 'first-line', firstPersonLine]],
    other: [[1, 'tf', otherTf], [1, 'says', otherSays], [2, 'match', matchOther]]
  });
})();
