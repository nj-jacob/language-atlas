/* Grade 3: reading for meaning. A full chapter: every idea has two worked examples, three questions together and five on
   your own, its own practice skill asked in four or more ways, and the chapter has "Read and answer" sets.
   Ontario 2023 Language, Grade 3, Strand C (Comprehension):
   C1.1 read and comprehend various texts      C1.2 characteristics of literary and informational text forms and genres
   C1.6 the narrator's point of view (first person or third person)
   C2.2 purposes for reading                   C2.3 predictions using evidence from the text
   C2.4 strategies such as rereading, visualizing and asking questions to check understanding
   C2.6 the main idea, and important details in sequence
   With a grown-up: C1.7 texts by First Nations, Metis and Inuit creators, C2.1 using what you already know,
   C2.5 connections, C2.7 which strategies helped.
   Passages are in ../texts.js. Answer checks: tests/verify/grade3-reading.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var KINDS = ['story', 'information', 'poem', 'instructions', 'letter'];
  var PURPOSE = { story: 'to enjoy a story', information: 'to learn facts', instructions: 'to learn how to do something', letter: 'to hear an opinion', poem: 'to enjoy a poem' };
  var CLUE = { story: 'It has characters and things that happen.', information: 'It has headings and facts.', instructions: 'It has numbered steps.',
    letter: 'It starts with ' + '“' + 'Dear' + '”' + '.', poem: 'It has short lines that sound good together.' };
  /* a problem while reading, the fix that helps, and its picture */
  var FIX = [['A sentence does not make sense.', 'Go back and read it again, slowly.', 'again'], ['You cannot picture what is happening.', 'Make a picture in your head.', 'think'],
    ['You meet a word you do not know.', 'Read the rest of the sentence for clues.', 'read'], ['You do not know what a part is about.', 'Look at the heading and the pictures.', 'screen'],
    ['You wonder why a character did something.', 'Ask a question, then read on to find out.', 'talk']];
  var NOFIX = ['Skip the rest of the page.', 'Read faster.', 'Stop reading for good.', 'Keep going without checking.'];
  var Q1 = '“', Q2 = '”';

  function kindName(k) { return k === 'information' ? 'an information text' : k === 'instructions' ? 'instructions' : 'a ' + k; }
  /* the passage to use: the one given (in a "Read and answer" set), or one that has what the question needs, sized for the level */
  function text(need, lv, t) { return t && t[need] ? t : R.pick(T.list(need, lv)); }
  /* a passage with at least n events in order */
  function longOrder(lv, t, n) { return t && t.order && t.order.length >= n ? t : R.pick(T.list('order', lv).filter(function (x) { return x.order.length >= n; })); }
  function at(t, words) { for (var i = 0; i < t.lines.length; i++) if (t.lines[i] && t.lines[i].charAt(0) !== '#' && t.lines[i].indexOf(words) >= 0) return i; return -1; }
  function stopOf(t) { return t.predict.stop || t.predict.upTo; }
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
      explain: 'The text says: ' + q(t.lines[at(t, f[4])]), meta: { k: 'g3-fact', t: t.title, q: f[0] } });
  }
  function evidence(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var i = at(t, f[4]);
    return { q: 'Tap the sentence that answers: <b>' + f[0] + '</b>', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which words in the question can you find in the text?', hint: 'Find the question words in the text. Read that sentence.', explain: 'It tells you: <b>' + f[1] + '</b>.',
      meta: { k: 'g3-tap-fact', t: t.title, q: f[0] } };
  }
  function findLine(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var right = t.lines[at(t, f[4])], others = T.body(t).filter(function (l) { return l !== right; });
    return Q.one('Which sentence answers this? <b>' + f[0] + '</b>', right, R.some(others, lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Which sentence has the answer in it?', explain: W.sent(right), meta: { k: 'g3-find-line', t: t.title, q: f[0] } });
  }
  function factTf(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(f.slice(2, 4));
    return { q: f[0] + '<br>' + Q.name() + ' says: <b>' + said + '</b>.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['The text says so.', 'The text says something else.'], answer: right ? 0 : 1 },
      hint: 'Find the sentence that answers the question.', explain: 'The text says: ' + q(t.lines[at(t, f[4])]), meta: { k: 'g3-fact-tf', t: t.title, q: f[0], said: said } };
  }

  /* ---------- the main idea (C2.6) ---------- */
  function mainIdea(lv, t) {
    t = text('main', lv, t);
    return Q.one('What is this text <b>mostly</b> about?', t.main[0], t.main.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which answer fits the whole text, not just one part?',
      hint: 'The main idea is about the whole text.', explain: W.web(t.main[0], ['every part']), meta: { k: 'g3-main', t: t.title } });
  }
  function detail(lv, t) {
    t = text('main', lv, t);
    return Q.one('Which one is only <b>one small part</b> of the text?', t.main[1], [t.main[0]].concat(lv > 1 ? [t.main[2]] : []), { fig: T.show(t), prompt: 'Which one does not cover the whole text?',
      hint: 'A detail is one part. The main idea covers it all.', explain: W.web(t.main[0], [t.main[1]]), meta: { k: 'g3-detail', t: t.title } });
  }
  function bestTitle(lv, t) {
    t = text('main', lv, t);
    var others = R.some(T.list('main').filter(function (x) { return x !== t; }).map(function (x) { return x.title; }), 2);
    return Q.one('Which title fits this text best?', t.title, others, { fig: W.passage('', t.lines), hint: 'A good title tells what the whole text is about.',
      explain: 'It is mostly about this: ' + t.main[0], meta: { k: 'g3-best-title' } });
  }
  function mainTf(lv, t) {
    t = text('main', lv, t);
    var right = R.int(0, 1) === 1, said = right ? t.main[0] : t.main[1];
    return { q: Q.name() + ' says the text is mostly about this:', fig: W.sent(said) + T.show(t), type: 'tf', answer: right,
      why: { options: ['It fits the whole text.', 'It is only one small part.'], answer: right ? 0 : 1 },
      hint: 'Does it cover every part of the text?', explain: 'The main idea: ' + t.main[0], meta: { k: 'g3-main-tf', t: t.title, said: said } };
  }

  /* ---------- in order (C2.6) ---------- */
  function events(t, lv) { return t.order.length > 3 && lv < 2 ? t.order.slice(0, 3) : t.order.slice(0, 5); }
  function sequence(lv, t) {
    t = text('order', lv, t);
    return { q: 'Put these in the order they happen.', fig: T.show(t), type: 'order', items: events(t, lv).map(q), first: 'First', last: 'Last',
      hint: 'Find each part in the text. Which comes first?', explain: W.chain(events(t, lv).map(q)), meta: { k: 'g3-order', t: t.title } };
  }
  function firstLast(lv, t) {
    t = text('order', lv, t);
    var ev = events(t, 2), pickN = Math.min(ev.length, 3), idx = R.some(ev.map(function (e, i) { return i; }), pickN).sort(), first = R.int(0, 1) === 1, right = ev[first ? idx[0] : idx[pickN - 1]];
    return Q.tiles('Which happened <b>' + (first ? 'first' : 'last') + '</b>?', q(right), idx.map(function (i) { return q(ev[i]); }).filter(function (x) { return x !== q(right); }), { fig: T.show(t),
      hint: 'Find each one in the text. Which comes ' + (first ? 'before' : 'after') + ' the others?', explain: W.chain(idx.map(function (i) { return q(ev[i]); })),
      meta: { k: 'g3-first-last', t: t.title, first: first } });
  }
  function after(lv, t) {
    t = longOrder(lv, t, 4);
    var ev = events(t, 2), i = R.int(0, ev.length - 2), wrong = ev.filter(function (e, j) { return j !== i && j !== i + 1; });
    return Q.one('What happens <b>right after</b> this? ' + q(ev[i]), q(ev[i + 1]), R.some(wrong, 2).map(q), { fig: T.show(t), prompt: 'Find it in the text. Read the next part.',
      hint: 'Find it in the text, then read on.', explain: W.chain([q(ev[i]), q(ev[i + 1])], ['Then', 'Next']), meta: { k: 'g3-after', t: t.title, ev: ev[i] } });
  }
  function storyMap(lv, t) {
    t = longOrder(lv, t, 4);
    var ev = events(t, 2), i = R.int(1, ev.length - 2), other = R.pick(T.list('order').filter(function (x) { return x !== t; }));
    return Q.one('What goes in the empty box?', q(ev[i]), R.some(other.order, 2).map(q), { fig: W.chain([q(ev[i - 1]), W.gap(), q(ev[i + 1])]) + T.show(t),
      hint: 'What happens between the two boxes?', explain: W.chain([q(ev[i - 1]), q(ev[i]), q(ev[i + 1])]), meta: { k: 'g3-map', t: t.title } });
  }

  /* ---------- predict with a clue (C2.3) ---------- */
  function predict(lv, t) {
    t = text('predict', lv, t); var p = t.predict;
    return Q.one('What will <b>most likely</b> happen next?', p.right, p.wrong.slice(0, lv > 1 ? 2 : 1), { fig: T.show(t, stopOf(t)), prompt: 'Look for a clue: <b>' + p.clue + '</b>.',
      hint: 'Use a clue from the text.', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g3-predict', t: t.title } });
  }
  function predictClue(lv, t) {
    t = text('predict', lv, t); var p = t.predict, shown = T.body(t).slice(0, T.body(t).indexOf(t.lines[at(t, String(stopOf(t)))]) + 1);
    if (typeof stopOf(t) === 'number') shown = t.lines.slice(0, stopOf(t));
    var other = R.pick(shown.filter(function (l) { return l.indexOf(p.clue) < 0; }));
    return Q.one('You predict: <b>' + p.right + '</b> Which words in the text helped?', p.clue, [other.split(' ').slice(0, 5).join(' ')], { fig: T.show(t, stopOf(t)),
      hint: 'Which words point to what happens next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g3-predict-clue', t: t.title } });
  }
  function predictTf(lv, t) {
    t = text('predict', lv, t); var p = t.predict, right = R.int(0, 1) === 1, said = right ? p.right : R.pick(p.wrong);
    return { q: Q.name() + ' predicts: <b>' + said + '</b>', fig: T.show(t, stopOf(t)), type: 'tf', answer: right,
      why: { options: ['A clue in the text points to it.', 'Nothing in the text points to it.'], answer: right ? 0 : 1 },
      hint: 'Is there a clue in the text?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g3-predict-tf', t: t.title, said: said } };
  }
  function clueTap(lv, t) {
    t = text('predict', lv, t); var p = t.predict, i = at(t, p.clue);
    return { q: 'You predict: <b>' + p.right + '</b> Tap the sentence with the clue.', type: 'tap', pic: T.show(t, stopOf(t), { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which sentence makes you think so?', hint: 'Which sentence points to what happens next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g3-clue-tap', t: t.title } };
  }

  /* ---------- when it does not make sense (C2.4) ---------- */
  function fixFor(p) { return W.means(p[2], p[1]); }
  function whichFix(lv) {
    var p = R.pick(FIX);
    return Q.one('<b>Problem:</b> ' + p[0] + ' What could you do?', p[1], R.some(NOFIX, lv > 1 ? 2 : 1), { prompt: 'Good readers stop and fix it.',
      hint: 'Pick the one that fixes the problem.', explain: fixFor(p), meta: { k: 'g3-which-fix', p: p[0] } });
  }
  function fixUp() {
    return Q.all('Reading gets hard. Pick every good idea.', R.some(FIX, 2).map(function (p) { return p[1]; }), R.some(NOFIX, 2), {
      hint: 'Good readers slow down and check.', explain: 'Reread, picture it, use clues, look at headings, or ask a question.', meta: { k: 'g3-fix-up' } });
  }
  function matchFix() {
    var ps = R.some(FIX, 3);
    return { q: 'Match each problem to a fix.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[1]]; }), hint: 'Which fix solves that problem?', explain: 'Each problem has a fix.', meta: { k: 'g3-match-fix' } };
  }
  function fixTf() {
    var right = R.int(0, 1) === 1, said = right ? R.pick(FIX)[1] : R.pick(NOFIX), n = Q.name();
    return { q: n + ' reads a part that does not make sense. ' + n + ' decides:', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['It helps to fix the problem.', 'It does not fix the problem.'], answer: right ? 0 : 1 },
      hint: 'Will it help the reading make sense?', explain: right ? 'Good readers stop and fix it.' : 'Stop and fix it instead: reread, picture it, or ask a question.', meta: { k: 'g3-fix-tf', said: said } };
  }

  /* ---------- why am I reading this? (C2.2) ---------- */
  function purpose(lv, t) {
    t = text('purpose', lv, t);
    return Q.one('Why would you read this?', t.purpose, R.some(KINDS.filter(function (k) { return PURPOSE[k] !== t.purpose; }).map(function (k) { return PURPOSE[k]; }), lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Is it a story, facts, steps, an opinion, or a poem?', explain: 'You would read it <b>' + t.purpose + '</b>.', meta: { k: 'g3-purpose', t: t.title } });
  }
  function oneOfEach(n) {
    var kinds = R.some(KINDS, n);
    return kinds.map(function (k) { return R.pick(T.list('kind').filter(function (t) { return t.kind === k; })); });
  }
  function whichText(lv) {
    var ts = oneOfEach(lv > 1 ? 3 : 2), want = ts[0];
    return Q.tiles('You want <b>' + want.purpose + '</b>. Which would you read?', want.title, ts.slice(1).map(function (t) { return t.title; }), {
      hint: 'Think about what each title is: a story, facts, steps, a letter or a poem.', explain: '<b>' + want.title + '</b> is ' + kindName(want.kind) + '.', meta: { k: 'g3-which-text', want: want.purpose } });
  }
  function matchPurpose() {
    var ts = oneOfEach(3);
    return { q: 'Match each text to why you would read it.', type: 'match', pairs: ts.map(function (t) { return [t.title, t.purpose]; }), hint: 'What kind of text is each one?', explain: 'Stories and poems to enjoy; information to learn; instructions to do; letters to hear an opinion.', meta: { k: 'g3-match-why-read' } };
  }
  function purposeTf(lv, t) {
    t = text('purpose', lv, t);
    var right = R.int(0, 1) === 1, said = right ? t.purpose : PURPOSE[R.pick(KINDS.filter(function (k) { return PURPOSE[k] !== t.purpose; }))];
    return { q: Q.name() + ' says: I would read this <b>' + said + '</b>.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['That is what this kind of text is for.', 'This kind of text is for something else.'], answer: right ? 0 : 1 },
      hint: 'What kind of text is it?', explain: 'It is ' + kindName(t.kind) + ': you read it <b>' + t.purpose + '</b>.', meta: { k: 'g3-purpose-tf', said: said } };
  }

  /* ---------- kinds of texts (C1.2) ---------- */
  function form(lv, t) {
    t = text('kind', lv, t);
    return Q.tiles('What kind of text is this?', t.kind, R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Look at how it is laid out: headings, numbers, short lines, or "Dear"?', explain: 'It is <b>' + kindName(t.kind) + '</b>. ' + CLUE[t.kind], meta: { k: 'g3-form', t: t.title } });
  }
  function formClue(lv, t) {
    t = text('kind', lv, t);
    return Q.one('This is <b>' + kindName(t.kind) + '</b>. What shows it?', CLUE[t.kind], R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 2 : 1).map(function (k) { return CLUE[k]; }), {
      fig: T.show(t), hint: 'Look at how the text is laid out.', explain: CLUE[t.kind], meta: { k: 'g3-form-clue' } });
  }
  function formTf(lv, t) {
    t = text('kind', lv, t);
    var right = R.int(0, 1) === 1, other = R.pick(KINDS.filter(function (k) { return k !== t.kind; })), said = right ? t.kind : other, why = R.shuffle([CLUE[t.kind], CLUE[other]]);
    return { q: Q.name() + ' says this is <b>' + kindName(said) + '</b>.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: why, answer: why.indexOf(CLUE[t.kind]) },
      hint: 'Look at how it is laid out.', explain: 'It is <b>' + kindName(t.kind) + '</b>. ' + CLUE[t.kind], meta: { k: 'g3-kind-tf', said: said } };
  }
  function matchForm() {
    var ts = oneOfEach(3);
    return { q: 'Match each title to its kind of text.', type: 'match', pairs: ts.map(function (t) { return [t.title, t.kind]; }), hint: 'Think about what each one would look like.', explain: 'The title is a clue to the kind of text.', meta: { k: 'g3-match-form' } };
  }

  /* ---------- who is telling the story? (C1.6) ---------- */
  function narrator(lv, t) {
    t = t && t.kind === 'story' ? t : R.pick(stories());
    return { q: 'Who is telling this story?', fig: T.show(t), type: 'tap', tiles: ['Someone in the story (first person)', 'Someone outside the story (third person)'], answer: t.pov === 'first' ? 0 : 1,
      prompt: 'Look outside the speech marks for <b>I</b> and <b>my</b>, or <b>he</b>, <b>she</b> and <b>they</b>.', hint: 'I and my: first person. He, she, they: third person.',
      explain: t.pov === 'first' ? 'The narrator says <b>I</b>: first person.' : 'The narrator says <b>' + povWord(t).toLowerCase() + '</b>: third person.', meta: { k: 'g3-narrator', t: t.title } };
  }
  function narratorWord(lv, t) {
    t = t && t.kind === 'story' ? t : R.pick(stories());
    var first = t.pov === 'first', w = povWord(t);
    return Q.tiles('Which word tells you this story is told in the <b>' + (first ? 'first' : 'third') + ' person</b>?', w, first ? ['They', 'He'] : ['I', 'We'], { fig: T.show(t),
      hint: 'First person: I, me, my. Third person: he, she, they.', explain: first ? '<b>I</b> means the narrator is in the story.' : '<b>' + w + '</b> means the narrator is watching from outside.', meta: { k: 'g3-narrator-word', t: t.title } });
  }
  function narratorTf(lv, t) {
    t = t && t.kind === 'story' ? t : R.pick(stories());
    var right = R.int(0, 1) === 1, saysFirst = right === (t.pov === 'first');
    return { q: Q.name() + ' says: <b>' + (saysFirst ? 'The narrator is someone in the story.' : 'The narrator is someone outside the story.') + '</b>', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['The narrator says I and my.', 'The narrator says he, she or they.'], answer: t.pov === 'first' ? 0 : 1 },
      hint: 'Look outside the speech marks.', explain: t.pov === 'first' ? 'First person: the narrator says <b>I</b>.' : 'Third person: the narrator says <b>' + povWord(t).toLowerCase() + '</b>.', meta: { k: 'g3-narrator-tf', t: t.title, first: saysFirst } };
  }
  function firstPersonLine(lv) {
    var plain = function (l) { return !/[“”]/.test(l); };
    var mine = R.pick(stories().filter(function (t) { return t.pov === 'first'; })), right = R.pick(T.body(mine).filter(function (l) { return plain(l) && /\b(I|my)\b/.test(l); }));
    var wrong = R.some(stories().filter(function (t) { return t.pov === 'third'; }).map(function (t) { return R.pick(T.body(t).filter(plain)); }), lv > 1 ? 2 : 1);
    return Q.one('Which sentence is told in the <b>first person</b>?', right, wrong, { hint: 'Look for I or my.', explain: 'It says <b>I</b> or <b>my</b>: the narrator is in the story.', meta: { k: 'g3-first-line' } });
  }

  /* ---------- read and answer: five questions about one passage ---------- */
  function ask(t) {
    var fs = R.some(t.facts, 2), lv = T.words(t) < 100 ? 1 : 2, more = [];
    if (t.main) more.push(function () { return mainIdea(lv, t); });
    if (t.order) more.push(function () { return sequence(lv, t); });
    if (t.order && t.order.length >= 4) more.push(function () { return after(lv, t); });
    if (t.kind === 'story') more.push(function () { return narrator(lv, t); });
    more.push(function () { return form(lv, t); }, function () { return purpose(lv, t); }, function () { return factTf(lv, t, R.pick(t.facts)); });
    return [fact(lv, t, fs[0]), evidence(lv, t, fs[1])].concat(R.some(more, 3).map(function (f) { return f(); }));
  }
  var readable = T.list('facts').filter(function (t) { return t.facts.length >= 2; }).sort(function (a, b) { return T.words(a) - T.words(b); });

  Atlas.register('reading', {
    full: true,
    read: { texts: readable, show: function (t) { return T.show(t); }, ask: ask },
    lessons: [{
      id: 'understand', title: 'Understanding what you read', sub: 'Facts, the main idea, and the order things happen.',
      concepts: [
        { slug: 'find', title: 'Find it in the text', exp: ['C1.1'], skill: 'find',
          model: [
            step(T.show(T.mitten), 'Read the story.'),
            step(W.sent('Where did they find the mitten?'), 'A question.'),
            step(W.sent('There, <mark class="hl">on top of the slide</mark>, sat a small red mitten.'), 'Look back. Find the sentence.'),
            step(W.tile('on top of the slide'), 'The answer was there all along.'),
            step(W.sent('What helps the hare hop on deep snow?'), 'Again, with facts.'),
            step(W.sent('<mark class="hl">Its big feet</mark> help it hop on top of deep snow without sinking.'), 'Words from the question point to the sentence.')
          ],
          guided: [function () { return fact(1); }, function () { return evidence(1); }, function () { return findLine(1); }],
          check: [function () { return fact(2); }, function () { return evidence(2); }, function () { return findLine(2); }, function () { return factTf(2); }, function () { return fact(3); }],
          coach: '<p>Ask the child to put a finger on the sentence that answers the question before choosing. Looking back is a skill, not cheating.</p>',
          mistake: '<p>Answering from memory or a guess. Always point to the words in the text.</p>' },
        { slug: 'main-idea', title: 'The main idea', exp: ['C2.6'], skill: 'main',
          model: [
            step(T.show(T.kite), 'What is it mostly about?'),
            step(W.sent('Tala painted a sun on her kite.'), 'Only one part. Too small.'),
            step(W.web('Tala loses her kite, and Omar gets it back.', ['painted a sun', 'string slipped', 'stuck in a tree']), 'This covers every part. The details hold it up.'),
            step(T.show(T.hares), 'Now an information text.'),
            step(W.web('Snowshoe hares are made for the snow.', ['two coats', 'big feet']), 'Each heading is a detail under the roof.')
          ],
          guided: [function () { return mainIdea(1); }, function () { return detail(1); }, function () { return mainTf(1); }],
          check: [function () { return mainIdea(2); }, function () { return detail(2); }, function () { return bestTitle(2); }, function () { return mainTf(2); }, function () { return mainIdea(3); }],
          coach: '<p>After any book, ask: "Tell me what it was about in one sentence." Then: "Does that fit the whole book?"</p>',
          mistake: '<p>Choosing a detail they liked rather than the big idea.</p>' },
        { slug: 'sequence', title: 'What happened first, next, last', exp: ['C2.6'], skill: 'order',
          model: [
            step(W.chain(['Tala made a kite.'], ['First'])),
            step(W.chain(['Tala made a kite.', 'The string slipped.'], ['First', 'Next']), 'Find each part in the text.'),
            step(W.chain(['Tala made a kite.', 'The string slipped.', 'It got stuck in a tree.', 'Omar climbed up.'], ['First', 'Next', 'Then', 'Last']), 'Keep the order of the text.'),
            step(T.show(T.bean), 'Instructions have an order too.'),
            step(W.chain(['Poke holes.', 'Fill with soil.', 'Push in the seed.', 'Water it.']), 'The numbers show the order.')
          ],
          guided: [function () { return sequence(1); }, function () { return firstLast(1); }, function () { return after(1); }],
          check: [function () { return sequence(2); }, function () { return firstLast(2); }, function () { return after(2); }, function () { return storyMap(2); }, function () { return sequence(3); }],
          coach: '<p>Retell a story using four fingers: first, next, then, last.</p>',
          mistake: '<p>Putting the most exciting part first. Find each event in the text to check.</p>' }
      ]
    }, {
      id: 'strategies', title: 'Reading strategies', sub: 'Predict, fix it, and know why you read.',
      concepts: [
        { slug: 'predict', title: 'Predict with a clue', exp: ['C2.3'], skill: 'predict',
          model: [
            step(T.show(T.mitten, 3), 'Stop and think.'),
            step(W.sent('<mark class="hl">Their footprints made a long trail</mark> behind them.'), 'A clue.'),
            step(W.sent('They will follow the footprints.'), 'A prediction that uses the clue.'),
            step(W.sent('Then the string <mark class="hl">slipped out of her hand</mark>!'), 'Another story. Another clue.'),
            step(W.sent('Tala will chase after the kite.'), 'Read on to check.')
          ],
          guided: [function () { return predict(1); }, function () { return predictClue(1); }, function () { return clueTap(1); }],
          check: [function () { return predict(2); }, function () { return predictClue(2); }, function () { return predictTf(2); }, function () { return clueTap(2); }, function () { return predict(3); }],
          coach: '<p>Stop at an exciting part of a book and ask: "What do you think happens next? What made you think that?"</p>',
          mistake: '<p>Wild guesses with no clue. Ask: "What in the text makes you think so?"</p>' },
        { slug: 'fix-up', title: 'When it does not make sense', exp: ['C2.4'], skill: 'fix-up',
          model: [
            step(W.sent('The moose <mark class="hl">waded</mark> into the lake.'), 'A word I do not know.'),
            step(fixFor(FIX[2]), 'Into the lake: waded means walked through water.'),
            step(W.icon('think'), 'Hmm. A whole sentence did not make sense.'),
            step(fixFor(FIX[0])),
            step(fixFor(FIX[1]), 'Still stuck? See it.'),
            step(fixFor(FIX[4]), 'Curious? Ask.')
          ],
          guided: [function () { return whichFix(1); }, fixUp, matchFix],
          check: [function () { return whichFix(2); }, fixUp, fixTf, matchFix, function () { return whichFix(3); }],
          coach: '<p>Model it aloud: "Wait, that did not make sense. Let me reread." Children copy what they see.</p>',
          mistake: '<p>Reading on when meaning is lost. Praise every time the child stops to fix it.</p>' },
        { slug: 'purpose', title: 'Why am I reading this?', exp: ['C2.2'], skill: 'purpose',
          model: [
            step(T.show(T.hares), 'Headings and facts.'),
            step(W.means('read', 'to learn facts')),
            step(T.show(T.bean), 'Numbered steps.'),
            step(W.means('write', 'to learn how to do something')),
            step(T.show(T.kite, 3), 'Characters and a problem.'),
            step(W.means('star', 'to enjoy a story'))
          ],
          guided: [function () { return purpose(1); }, function () { return whichText(1); }, function () { return purposeTf(1); }],
          check: [function () { return purpose(2); }, function () { return whichText(2); }, matchPurpose, function () { return purposeTf(2); }, function () { return purpose(3); }],
          coach: '<p>Before reading, ask: "What do you think you will get from this?"</p>',
          mistake: '<p>Reading every text the same way. Facts can be read slowly and checked; a story can be enjoyed.</p>' }
      ]
    }, {
      id: 'kinds', title: 'Kinds of texts', sub: 'Stories, information, poems, instructions, letters.',
      concepts: [
        { slug: 'forms', title: 'What kind of text?', exp: ['C1.2'], skill: 'forms',
          model: [
            step(T.show(T.kite, 3), 'Characters and things that happen: a <b>story</b>.'),
            step(T.show(T.hares), 'Headings and facts: <b>information</b>.'),
            step(T.show(T.bean), 'Numbered steps: <b>instructions</b>.'),
            step(T.show(T.coach, 3), '"Dear": a <b>letter</b>.'),
            step(T.show(T.rain), 'Short lines that sound good: a <b>poem</b>.')
          ],
          guided: [function () { return form(1); }, function () { return formClue(1); }, matchForm],
          check: [function () { return form(2); }, function () { return formClue(2); }, function () { return formTf(2); }, matchForm, function () { return form(3); }],
          coach: '<p>At the library, sort a pile of books and papers into stories, information, poems, instructions and letters.</p>',
          mistake: '<p>Calling every text a "story". A story has characters and events; information has facts.</p>' },
        { slug: 'narrator', title: 'Who is telling the story?', exp: ['C1.6'], skill: 'narrator',
          model: [
            step(W.sent('<b>I</b> held <b>my</b> paddle tight.'), '<b>I</b>, <b>my</b>: the narrator is in the story. <b>First person</b>.'),
            step(W.sent('<b>They</b> followed the footprints.'), '<b>They</b>: the narrator is outside the story. <b>Third person</b>.'),
            step(W.sent(Q1 + 'We need a roof!' + Q2 + ' <b>she</b> said.'), 'Speech marks hold a character' + '’' + 's words. Look outside them: <b>she</b>.'),
            step(W.sent('<b>I</b> was the goalie for our team.'), 'The goalie tells this one.')
          ],
          guided: [function () { return narrator(1); }, function () { return narratorWord(1); }, function () { return narratorTf(1); }],
          check: [function () { return narrator(2); }, function () { return narratorWord(2); }, function () { return firstPersonLine(2); }, function () { return narratorTf(2); }, function () { return narrator(3); }],
          coach: '<p>Retell a story as if you were one of the characters ("I lost my mitten..."). Talk about how it changes.</p>',
          mistake: '<p>Being fooled by "I" inside speech marks. Look at the words outside the speech marks.</p>' }
      ]
    }],
    practice: [
      { id: 'find', name: 'Find it in the text', code: 'C1.1', gen: fact },
      { id: 'main', name: 'The main idea', code: 'C2.6', gen: mainIdea },
      { id: 'order', name: 'First, next, last', code: 'C2.6', gen: sequence },
      { id: 'predict', name: 'Predict with a clue', code: 'C2.3', gen: predict },
      { id: 'fix-up', name: 'Fix it when it does not make sense', code: 'C2.4', gen: whichFix },
      { id: 'purpose', name: 'Why am I reading this?', code: 'C2.2', gen: purpose },
      { id: 'forms', name: 'Kinds of texts', code: 'C1.2', gen: form },
      { id: 'narrator', name: 'Who is telling the story?', code: 'C1.6', gen: narrator }
    ],
    tasks: [
      { id: 'before', title: 'Before you read', code: 'C2.1', pic: W.icon('think'), say: 'Look at the cover. What do you already know about this?',
        run: ['Choose a new book together.', 'Look at the cover, title and a few pictures. Ask: "What do you already know about this?"', 'After reading, ask: "Did what you knew help you understand it?"'],
        rubric: ['Does not connect what they know, even with prompts.', 'Shares something they know with prompting.', 'Shares what they know and links it to the book.', 'Uses what they know to ask questions and predict.'] },
      { id: 'connect', title: 'This reminds me of...', code: 'C2.5', pic: W.icon('people'), say: 'What does this remind you of?',
        run: ['After reading, ask: "Does this remind you of something in your life? Another book? Something in the world?"', 'Help the child explain how the two things are alike.'],
        rubric: ['No connection yet.', 'Makes a connection with help.', 'Makes a clear connection and explains it.', 'Makes several connections, to self, other texts and the world.'] },
      { id: 'indigenous-creators', title: 'A book by a First Nations, Métis or Inuit creator', code: 'C1.7', pic: W.icon('read'), say: 'Read a book by a First Nations, Métis or Inuit author. Talk about it.',
        run: ['Ask your librarian for a picture book or early chapter book written or illustrated by a First Nations, Métis or Inuit creator. Check the author note to learn which community or nation they are from.',
          'Read it together. Ask: "What did you learn about the people, the land, or the community in this book?"', 'Talk about how the story or ideas connect to life today.'],
        rubric: ['Recalls little of the book yet.', 'Retells some of it with help.', 'Retells it and names something they learned about the community or culture.', 'Explains what they learned and connects it to life today, respectfully.'],
        coach: '<p>Choose books by creators from the community they write about. Many public libraries in Ontario keep a list of books by Indigenous authors.</p>' },
      { id: 'what-helped', title: 'What helped me read?', code: 'C2.7', pic: W.icon('star'), say: 'Which strategy helped you most today?',
        run: ['After reading, show the strategies: picture it, predict, reread, connect.', 'Ask: "Which one helped you today? When did you use it?"'],
        rubric: ['Cannot name a strategy yet.', 'Names a strategy with help.', 'Names a strategy and when it helped.', 'Explains how two strategies helped, with examples.'] }
    ]
  });

  Q.shapes('reading', {
    find: [[1, 'tap-sentence', evidence], [1, 'find-line', findLine], [2, 'tf', factTf]],
    main: [[1, 'detail', detail], [2, 'title', bestTitle], [1, 'tf', mainTf]],
    order: [[1, 'first-last', firstLast], [1, 'after', after], [2, 'story-map', storyMap]],
    predict: [[1, 'clue', predictClue], [1, 'tap-clue', clueTap], [2, 'tf', predictTf]],
    'fix-up': [[1, 'pick', fixUp], [1, 'match', matchFix], [2, 'tf', fixTf]],
    purpose: [[1, 'which-text', whichText], [2, 'match', matchPurpose], [1, 'tf', purposeTf]],
    forms: [[1, 'clue', formClue], [2, 'match', matchForm], [2, 'tf', formTf]],
    narrator: [[1, 'word', narratorWord], [1, 'tf', narratorTf], [2, 'first-line', firstPersonLine]]
  });
})();
