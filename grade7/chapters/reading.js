/* Grade 7: reading for meaning. A full chapter: every idea has two worked examples, three questions together and five on
   your own, its own practice skill asked in four or more ways, and the chapter has "Read and answer" sets.
   Ontario 2023 Language, Grade 7, Strand C (Comprehension):
   C1.1 read complex texts, using words, grammar, cohesive ties and background knowledge     C2.2 purposes for reading, and choosing suitable texts from diverse creators
   C2.3 predictions, and questions to check them                                              C2.4 strategies to monitor understanding (visualize, read ahead, ask, consult references)
   C2.6 summarize the main idea and supporting details, and draw well-supported conclusions
   With a grown-up: C2.1 prior knowledge, C2.5 connections, C2.7 which strategies helped, and comprehension goals.
   Passages are in ../texts.js. Answer checks: tests/verify/grade7-reading.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var Q1 = '“', Q2 = '”';
  function q(s) { return Q1 + s + Q2; }
  /* the passage to use: the one given (in a "Read and answer" set), or one that has what the question needs, sized for the level */
  function text(need, lv, t) { return t && t[need] ? t : R.pick(T.list(need, lv)); }
  function at(t, words) { for (var i = 0; i < t.lines.length; i++) if (t.lines[i] && t.lines[i].charAt(0) !== '#' && t.lines[i].indexOf(words) >= 0) return i; return -1; }
  /* where a tie word starts in its sentence, as a whole word */
  function wordAt(s, w) { var m = new RegExp('(^|[^A-Za-z’])(' + w + ')(?![A-Za-z])').exec(s); return m ? m.index + m[1].length : -1; }
  function marked(c) { var i = wordAt(c[0], c[1]); return W.hl(c[0], i, i + c[1].length); }

  /* ---------- find the evidence (C1.1) ---------- */
  function fact(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    return Q.one(f[0], f[1], f.slice(2, lv > 1 ? 4 : 3), { fig: T.show(t), prompt: 'Find the sentence that tells you.', hint: 'Look back in the text. The answer is there.',
      explain: 'The text says: ' + q(t.lines[at(t, f[4])]), meta: { k: 'g7-fact', t: t.title, q: f[0] } });
  }
  function evidence(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var i = at(t, f[4]);
    return { q: 'Tap the sentence that answers: <b>' + f[0] + '</b>', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which words in the question can you find in the text?', hint: 'Find the question words in the text. Read that sentence.', explain: 'It tells you: <b>' + f[1] + '</b>',
      meta: { k: 'g7-tap-fact', t: t.title, q: f[0] } };
  }
  function findLine(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var right = t.lines[at(t, f[4])], others = T.body(t).filter(function (l) { return l !== right; });
    return Q.one('Which sentence answers this? <b>' + f[0] + '</b>', right, R.some(others, lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Which sentence has the answer in it?', explain: W.sent(right), meta: { k: 'g7-find-line', t: t.title, q: f[0] } });
  }
  function factTf(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(f.slice(2, 4));
    return { q: f[0] + '<br>' + Q.name() + ' answers: <b>' + said + '</b>', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['The text says so.', 'The text says something different.'], answer: right ? 0 : 1 }, hint: 'Find the sentence that answers the question.',
      explain: 'The text says: ' + q(t.lines[at(t, f[4])]), meta: { k: 'g7-fact-tf', t: t.title, q: f[0], said: said } };
  }

  /* ---------- words that point back (C1.1) ---------- */
  function tieOf(lv, t, src) {
    t = t && t.ties ? t : R.pick(T.list('ties', lv).filter(function (x) { return !src || x.ties.some(function (c) { return c[4]; }); }));
    return [t, R.pick(t.ties.filter(function (c) { return !src || c[4]; }))];
  }
  function tie(lv, t) {
    var p = tieOf(lv, t), c = p[1]; t = p[0];
    return Q.one('In the marked sentence, what does <b>' + c[1] + '</b> point back to?', c[2], [c[3]], { fig: T.show(t).replace(c[0], marked(c)),
      prompt: 'Look back. What came just before?', hint: 'Words like they, it, that and as a result point back to something earlier.', explain: '<b>' + c[1] + '</b> = ' + c[2], meta: { k: 'g7-tie', t: t.title, w: c[1], s: c[0] } });
  }
  function tieTap(lv, t) {
    var p = tieOf(lv, t, true), c = p[1]; t = p[0];
    var i = at(t, c[4]);
    return { q: 'Tap the earlier sentence that <b>' + c[1] + '</b> points back to.', type: 'tap', pic: T.show(t, null, { tap: true }).replace(c[0], marked(c)), answer: String(i), answerText: t.lines[i],
      prompt: 'Read the marked sentence. Then look back.', hint: 'The tie word stands for something you read just before it.', explain: '<b>' + c[1] + '</b> = ' + c[2], meta: { k: 'g7-tie-tap', t: t.title, w: c[1], s: c[0] } };
  }
  function tieWord(lv, t) {
    var p = tieOf(lv, t), c = p[1], tw = c[1].toLowerCase().split(' ');
    var others = c[0].replace(/[“”,.!?:;]/g, '').split(' ').filter(function (w) { return w.length > 3 && tw.indexOf(w.toLowerCase()) < 0 && c[2].indexOf(w) < 0; });
    return Q.tiles('Which word or words in this sentence point back to <b>' + c[2] + '</b>?', c[1], R.some(others, lv > 1 ? 3 : 2), { fig: W.sent(c[0]),
      hint: 'Look for a word that stands in for something said before: it, they, that, as a result.', explain: W.sent(marked(c)), meta: { k: 'g7-tie-word', w: c[1], s: c[0] } });
  }
  function tieTf(lv, t) {
    var p = tieOf(lv, t), c = p[1], right = R.int(0, 1) === 1, said = right ? c[2] : c[3]; t = p[0];
    return { q: Q.name() + ' says <b>' + c[1] + '</b> points back to <b>' + said + '</b>.', fig: T.show(t).replace(c[0], marked(c)), type: 'tf', answer: right,
      why: { options: ['That is what makes sense when you read back.', 'Reading back shows it means something else.'], answer: right ? 0 : 1 },
      hint: 'Put the answer in place of the tie word. Does the sentence still make sense?', explain: '<b>' + c[1] + '</b> = ' + c[2], meta: { k: 'g7-tie-tf', t: t.title, w: c[1], s: c[0], said: said } };
  }

  /* ---------- the main idea and its support (C2.6) ---------- */
  function mainIdea(lv, t) {
    t = text('main', lv, t);
    return Q.one('Which sentence best sums up the <b>main idea</b>?', t.main[0], t.main.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which answer fits the whole text, not just one part?',
      hint: 'The main idea covers every part of the text.', explain: W.web(t.main[0], t.details ? t.details.right : ['every part']), meta: { k: 'g7-main', t: t.title } });
  }
  function detail(lv, t) {
    t = text('main', lv, t);
    return Q.one('Which one is only <b>one detail</b>, not the main idea?', t.main[1], [t.main[0]], { fig: T.show(t), prompt: 'Which one does not cover the whole text?',
      hint: 'A detail is one part. The main idea is the roof over all of them.', explain: W.web(t.main[0], [t.main[1]]), meta: { k: 'g7-detail', t: t.title } });
  }
  function bestTitle(lv, t) {
    t = text('main', lv, t);
    var others = R.some(T.list('main').filter(function (x) { return x !== t; }).map(function (x) { return x.title; }), lv > 1 ? 3 : 2);
    return Q.one('Which title fits this text?', t.title, others, { fig: W.passage('', t.lines, { pics: t.pics }), hint: 'A good title names what the whole text is about.',
      explain: 'It is mostly about this: ' + t.main[0], meta: { k: 'g7-best-title' } });
  }
  function mainTf(lv, t) {
    t = text('main', lv, t);
    var right = R.int(0, 1) === 1, said = right ? t.main[0] : t.main[1];
    return { q: Q.name() + ' sums up the text like this:', fig: W.sent(said) + T.show(t), type: 'tf', answer: right,
      why: { options: ['It covers the whole text.', 'It is only one detail.'], answer: right ? 0 : 1 }, hint: 'Does it fit every part of the text?',
      explain: 'The main idea: ' + t.main[0], meta: { k: 'g7-main-tf', t: t.title, said: said } };
  }
  function supports(lv, t) {
    t = text('details', lv, t);
    return Q.all('Pick every detail that <b>supports</b> the main idea.', t.details.right, t.details.wrong, { fig: W.web(t.main[0], [W.gap(), W.gap()]) + T.show(t),
      hint: 'A supporting detail holds up the main idea. A true fact can still be unimportant.', explain: W.web(t.main[0], t.details.right), meta: { k: 'g7-supports', t: t.title } });
  }

  /* ---------- a well-supported conclusion (C2.6) ---------- */
  function conclude(lv, t) {
    t = text('conclusion', lv, t); var c = t.conclusion;
    return Q.one('Which conclusion is <b>best supported</b> by the text?', c.right, lv > 1 ? [c.far, c.against] : [R.pick([c.far, c.against])], { fig: T.show(t), prompt: 'Which one can you back up with words from the text?',
      hint: 'A good conclusion goes a step beyond the text, and the text backs it up.', explain: W.chain([q(t.lines[at(t, c.proof)]), c.right], ['The text', 'So']), meta: { k: 'g7-conclude', t: t.title } });
  }
  function concludeTf(lv, t) {
    t = text('conclusion', lv, t); var c = t.conclusion, said = R.pick([c.right, c.right, c.far, c.against]), right = said === c.right;
    return { q: Q.name() + ' concludes: <b>' + said + '</b>', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['The text backs it up.', said === c.far ? 'It goes further than the text can support.' : 'The text says the opposite.'], answer: right ? 0 : 1 },
      hint: 'Can you point to words that support it? Does it go too far?', explain: 'Best supported: ' + c.right, meta: { k: 'g7-conclude-tf', t: t.title, said: said } };
  }
  function proofTap(lv, t) {
    t = text('conclusion', lv, t); var c = t.conclusion, i = at(t, c.proof);
    return { q: 'You conclude: <b>' + c.right + '</b> Tap the sentence that supports it best.', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which sentence would you point to if someone asked: what makes you say that?', hint: 'Find the sentence that makes the conclusion believable.',
      explain: W.chain([q(t.lines[i]), c.right], ['The text', 'So']), meta: { k: 'g7-proof-tap', t: t.title } };
  }
  function tooFar(lv, t) {
    t = text('conclusion', lv, t); var c = t.conclusion;
    return Q.one('Which conclusion <b>goes too far</b>?', c.far, [c.right], { fig: T.show(t), prompt: 'Which one claims more than the text can show?',
      hint: 'Watch for big words like every, forever, always and never.', explain: '<b>' + c.far + '</b> The text does not say anything that big.', meta: { k: 'g7-too-far', t: t.title } });
  }

  /* ---------- predict, then check (C2.3) ---------- */
  function predict(lv, t) {
    t = text('predict', lv, t); var p = t.predict;
    return Q.one('What will <b>most likely</b> happen next?', p.right, p.wrong.slice(0, lv > 1 ? 2 : 1), { fig: T.show(t, p.stop), prompt: 'Look for a clue: <b>' + p.clue + '</b>.',
      hint: 'Use a clue from the text and what you know.', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>', meta: { k: 'g7-predict', t: t.title } });
  }
  function predictClue(lv, t) {
    t = text('predict', lv, t); var p = t.predict, shown = T.body(t).slice(0, T.body(t).indexOf(t.lines[at(t, p.stop)]) + 1);
    var other = R.pick(shown.filter(function (l) { return l.indexOf(p.clue) < 0; })).replace(/[“”]/g, '').split(' ').slice(0, 5).join(' ');
    return Q.one('You predict: <b>' + p.right + '</b> Which words in the text helped?', p.clue, [other], { fig: T.show(t, p.stop),
      hint: 'Which words point to what happens next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>', meta: { k: 'g7-predict-clue', t: t.title } });
  }
  function clueTap(lv, t) {
    t = text('predict', lv, t); var p = t.predict, i = at(t, p.clue);
    return { q: 'You predict: <b>' + p.right + '</b> Tap the sentence with the clue.', type: 'tap', pic: T.show(t, p.stop, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which sentence makes you think so?', hint: 'Which sentence points to what happens next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>', meta: { k: 'g7-clue-tap', t: t.title } };
  }
  function predictTf(lv, t) {
    t = text('predict', lv, t); var p = t.predict, right = R.int(0, 1) === 1, said = right ? p.right : R.pick(p.wrong);
    return { q: Q.name() + ' predicts: <b>' + said + '</b>', fig: T.show(t, p.stop), type: 'tf', answer: right,
      why: { options: ['A clue in the text points to it.', 'Nothing in the text points to it.'], answer: right ? 0 : 1 },
      hint: 'Is there a clue in the text?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>', meta: { k: 'g7-predict-tf', t: t.title, said: said } };
  }
  function checkPrediction(lv, t) {
    t = text('predict', lv, t); var p = t.predict, after = T.body(t).slice(T.body(t).indexOf(t.lines[at(t, p.stop)]) + 1), proof = t.lines[at(t, p.proof)];
    return Q.one('You predicted: <b>' + p.right + '</b> Read on. Which sentence shows you were right?', proof, R.some(after.filter(function (l) { return l !== proof; }), lv > 1 ? 2 : 1), { fig: T.show(t),
      prompt: 'Ask yourself: did it happen? Find where.', hint: 'Find the sentence where the prediction comes true.', explain: W.chain([p.right, q(proof)], ['I predicted', 'It happened']), meta: { k: 'g7-check-prediction', t: t.title } });
  }

  /* ---------- fix confusion (C2.4): [the problem, the strategy that fixes it] ---------- */
  var FIXES = { lookup: ['screen', 'Look it up in a dictionary or glossary.'], picture: ['think', 'Picture it in your mind, like a movie.'], ahead: ['read', 'Read ahead to see if it is explained.'],
    ask: ['talk', 'Ask yourself a question, then reread to answer it.'], source: ['people', 'Check another source for background.'] };
  var FIX = [['An article uses the word ' + q('muskeg') + ' and does not explain it.', 'lookup'], ['A science text keeps using the word ' + q('photosynthesis') + '.', 'lookup'],
    ['A long description of a forest is hard to follow.', 'picture'], ['You lose track of where each character is standing in a scene.', 'picture'],
    ['A character does something strange, but the chapter is not over.', 'ahead'], ['A paragraph starts with a puzzling question.', 'ahead'],
    ['You reach the end of a page and cannot say what it was about.', 'ask'], ['You are not sure what the main point of a paragraph is.', 'ask'],
    ['An article mentions an event you know nothing about.', 'source'], ['A story is set during a war you have never heard of.', 'source']];
  function fixCard(k) { return W.means(FIXES[k][0], FIXES[k][1]); }
  function otherFixes(k, n) { return R.some(Object.keys(FIXES).filter(function (x) { return x !== k; }), n).map(function (x) { return FIXES[x][1]; }); }
  function monitor(lv) {
    var f = R.pick(FIX);
    return Q.one('Which strategy fits best?', FIXES[f[1]][1], otherFixes(f[1], lv > 1 ? 3 : 2), { fig: W.means('think', f[0]), prompt: 'What is the problem: a word, a picture, a missing reason, the main point, or background?',
      hint: 'Match the fix to the problem.', explain: fixCard(f[1]), meta: { k: 'g7-monitor', s: f[0] } });
  }
  function monitorMatch() {
    var ks = R.some(Object.keys(FIXES), 3);
    return { q: 'Match each problem to a strategy.', type: 'match', pairs: ks.map(function (k) { return [R.pick(FIX.filter(function (f) { return f[1] === k; }))[0], FIXES[k][1]]; }),
      hint: 'Each problem needs a different fix.', explain: 'Good readers pick the strategy that fits the problem.', meta: { k: 'g7-monitor-match' } };
  }
  function monitorTf() {
    var f = R.pick(FIX), right = R.int(0, 1) === 1, said = right ? FIXES[f[1]][1] : otherFixes(f[1], 1)[0], n = Q.name();
    return { q: n + ' has a problem: <b>' + f[0] + '</b> ' + n + ' decides:', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['That strategy fixes this problem.', 'A different strategy would fix it.'], answer: right ? 0 : 1 }, hint: 'Will it solve this exact problem?',
      explain: fixCard(f[1]), meta: { k: 'g7-monitor-tf', s: f[0], said: said } };
  }
  function whichProblem(lv) {
    var f = R.pick(FIX), wrong = R.some(FIX.filter(function (x) { return x[1] !== f[1]; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; });
    return Q.one('Which problem would this strategy fix?', f[0], wrong, { fig: fixCard(f[1]), hint: 'Think about when you would use it.', explain: W.means('think', f[0]) + fixCard(f[1]), meta: { k: 'g7-which-problem', s: f[0] } });
  }

  /* ---------- choose a text for your purpose (C2.2): [purpose, the suitable text, less suitable texts, why it suits] ---------- */
  var PURPOSE = [['to learn what it is like to grow up in Iqaluit', 'a memoir by someone who grew up there', ['a travel ad for Nunavut', 'a weather report'], 'It is told from the inside, by someone who lived it.'],
    ['to fix a flat bike tire', 'a step-by-step guide with diagrams', ['a novel about a bike race', 'a poem about summer'], 'It shows each step in order.'],
    ['to understand both sides of a debate about a new mine', 'articles from writers on each side', ['one company' + '’' + 's ad', 'a comic strip'], 'It gives more than one perspective.'],
    ['to enjoy a funny story on a long trip', 'a humorous novel', ['a science textbook', 'a bus schedule'], 'It is written to entertain.'],
    ['to learn about Treaty 9 from a First Nations point of view', 'a book by First Nations creators from the treaty area', ['a quiz website', 'a toy catalogue'], 'Its creators speak from their own community' + '’' + 's experience.'],
    ['to check the weather for a canoe trip tomorrow', 'a current forecast from Environment Canada', ['a novel set on a lake', 'an almanac from last year'], 'It is up to date and comes from experts.'],
    ['to compare two laptops before buying one', 'a review that tests both laptops', ['an ad for one laptop', 'a history of computers'], 'It compares both fairly, with tests.'],
    ['to learn how families in Canada celebrate Diwali', 'interviews with families who celebrate it', ['a cookbook for birthday cakes', 'a sports magazine'], 'People share their own traditions in their own words.'],
    ['to get facts for a report on monarch butterflies', 'an encyclopedia article that lists its sources', ['a cartoon about a butterfly', 'a post with no source'], 'It is accurate and shows where its facts come from.'],
    ['to feel inspired before a big race', 'a biography of a Paralympic athlete', ['a list of race rules', 'a map of the track'], 'It tells a real story of effort and success.']];
  function purpose(lv) {
    var p = R.pick(PURPOSE);
    return Q.one('You want <b>' + p[0] + '</b>. Which text suits your purpose best?', p[1], p[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('star', p[0]), prompt: 'Who made it, and why?',
      hint: 'Match the kind of text, and who made it, to what you need.', explain: '<b>' + p[1] + '</b> ' + p[3], meta: { k: 'g7-purpose', p: p[0] } });
  }
  function purposeTf() {
    var p = R.pick(PURPOSE), right = R.int(0, 1) === 1, said = right ? p[1] : R.pick(p[2]), n = Q.name();
    return { q: n + ' wants <b>' + p[0] + '</b>. ' + n + ' chooses:', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['It fits that purpose.', 'Another kind of text would fit better.'], answer: right ? 0 : 1 }, hint: 'Would this text give what is needed?',
      explain: 'Best: <b>' + p[1] + '</b>', meta: { k: 'g7-purpose-tf', p: p[0], said: said } };
  }
  function purposeWhy(lv) {
    var p = R.pick(PURPOSE), wrong = R.some(PURPOSE.filter(function (x) { return x !== p; }), lv > 1 ? 2 : 1).map(function (x) { return x[3]; });
    return Q.one('You want <b>' + p[0] + '</b>, so you choose <b>' + p[1] + '</b>. Why is it a good choice?', p[3], wrong, { hint: 'What does this text give you that the others do not?',
      explain: p[3], meta: { k: 'g7-purpose-why', p: p[0] } });
  }
  function purposeMatch() {
    var ps = R.some(PURPOSE, 3);
    return { q: 'Match each purpose to the text that suits it.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[1]]; }), hint: 'What would you need for each one?',
      explain: 'Choose a text by what you need from it, and who made it.', meta: { k: 'g7-purpose-match' } };
  }

  /* ---------- read and answer: five questions about one passage ---------- */
  function ask(t) {
    var fs = R.some(t.facts, 2), lv = T.words(t) < 140 ? 1 : 2, more = [function () { return factTf(lv, t, R.pick(t.facts)); }];
    if (t.main) more.push(function () { return mainIdea(lv, t); });
    if (t.conclusion) more.push(function () { return conclude(lv, t); });
    if (t.ties) more.push(function () { return tie(lv, t); });
    if (t.details) more.push(function () { return supports(lv, t); });
    return [fact(lv, t, fs[0]), evidence(lv, t, fs[1])].concat(R.some(more, 3).map(function (f) { return f(); }));
  }
  var readable = T.list('facts').filter(function (t) { return t.facts.length >= 2; }).sort(function (a, b) { return T.words(a) - T.words(b); });

  var ice = T.iceRoad, rice = T.rice, tryout = T.tryout, portage = T.portage;
  Atlas.register('reading', {
    full: true,
    read: { texts: readable, show: function (t) { return T.show(t); }, ask: ask },
    lessons: [{
      id: 'understand', title: 'Understanding complex texts', sub: 'Evidence, and the words that tie a text together.',
      concepts: [
        { slug: 'find', title: 'Find the evidence in the text', exp: ['C1.1'], skill: 'find',
          model: [
            step(T.show(ice), 'Read it once, all the way.'),
            step(W.sent('Why is the winter road season getting shorter?'), 'A question.'),
            step(W.sent('<mark class="hl">Warmer winters mean</mark> the ice forms later and melts sooner.'), 'Words from the question point to the sentence.'),
            step(T.show(rice), 'Again, with a new text.'),
            step(W.sent('Why is the rice danced on?'), 'Find the word ' + q('danced') + ' in the text.'),
            step(W.sent('Then it is danced on, or trampled lightly, to <mark class="hl">loosen the husks</mark>.'), 'The answer sits right beside it.')
          ],
          guided: [function () { return fact(1); }, function () { return evidence(1); }, function () { return findLine(1); }],
          check: [function () { return fact(2); }, function () { return evidence(2); }, function () { return findLine(2); }, function () { return factTf(2); }, function () { return evidence(3); }],
          coach: '<p>Ask the child to point to the words that prove the answer before choosing it. Evidence first, answer second.</p>',
          mistake: '<p>Answering from what they already know instead of what the text says.</p>' },
        { slug: 'ties', title: 'Words that point back tie a text together', exp: ['C1.1'], skill: 'ties',
          model: [
            step(W.sent('These winter roads link about thirty remote communities.') + W.sent('<mark class="hl">They</mark> are made by clearing snow.'), 'Read back: <b>They</b> = the winter roads.'),
            step(W.sent('Warmer winters mean the ice forms later.') + W.sent('<mark class="hl">As a result</mark>, the roads stay open for only a few weeks.'), '<b>As a result</b> points back to a cause.'),
            step(W.chain(['Warmer winters', 'the roads close sooner'], ['Cause', 'As a result']), 'Ties join ideas into a chain.'),
            step(W.sent('Many grains fall into the water.') + W.sent('<mark class="hl">They</mark> seed the bed for next year.'), 'A new text. Who are <b>They</b>?'),
            step(W.web('They = the grains', ['not the sticks', 'not the canoe']), 'Try each one in its place. Only one makes sense.')
          ],
          guided: [function () { return tie(1); }, function () { return tieWord(1); }, function () { return tieTap(1); }],
          check: [function () { return tie(2); }, function () { return tieTap(2); }, function () { return tieWord(2); }, function () { return tieTf(2); }, function () { return tie(3); }],
          coach: '<p>When reading a textbook, stop at each "it", "they", "this" or "as a result" and ask: "What does it stand for here?"</p>',
          mistake: '<p>Linking a pronoun to the nearest noun instead of the one that makes sense. Put the answer in place of the word and reread.</p>' }
      ]
    }, {
      id: 'summarize', title: 'Summaries and conclusions', sub: 'The main idea, its support, and what follows.',
      concepts: [
        { slug: 'main-idea', title: 'A summary gives the main idea', exp: ['C2.6'], skill: 'summarize',
          model: [
            step(T.show(ice), 'What is the whole text about?'),
            step(W.sent('Milk can cost twice as much when it comes by air.'), 'True, but only one part. Too small.'),
            step(W.web('Winter roads link remote communities to supplies, but warmer winters are shortening their season.', ['a year of supplies', 'ice forms later']), 'This covers every part. The details hold it up.'),
            step(T.show(T.creek), 'Now a news report.'),
            step(W.web('Students helped a creek become cool enough for fish again.', ['water tests', '300 trees']), 'One sentence, two details: a summary.')
          ],
          guided: [function () { return mainIdea(1); }, function () { return detail(1); }, function () { return mainTf(1); }],
          check: [function () { return mainIdea(2); }, function () { return supports(2); }, function () { return bestTitle(2); }, function () { return mainTf(2); }, function () { return mainIdea(3); }],
          coach: '<p>Limit the summary to one sentence of 20 words or fewer. Then add two details that prove it.</p>',
          mistake: '<p>Retelling everything in order. A summary is short: the main idea and the key support.</p>' },
        { slug: 'conclude', title: 'Draw a conclusion the text supports', exp: ['C2.6'], skill: 'conclude',
          model: [
            step(W.sent('Without them, goods must come by plane, which costs far more.') + W.sent('The roads stay open for only a few weeks.'), 'Two facts.'),
            step(W.chain(['Planes cost more.', 'The road season is shorter.', 'These communities may pay more for supplies.'], ['Fact', 'Fact', 'So']), 'A step beyond, backed by both.'),
            step(W.means('wrong', 'Winter roads will disappear forever next year.'), 'Too far. Nothing in the text says that.'),
            step(T.show(tryout), 'A story works the same way.'),
            step(W.chain(['She looked straight at me.', 'The narrator has a good chance of making the team.'], ['The text', 'So']), 'Point to the words that back it up.')
          ],
          guided: [function () { return conclude(1); }, function () { return proofTap(1); }, function () { return tooFar(1); }],
          check: [function () { return conclude(2); }, function () { return concludeTf(2); }, function () { return proofTap(2); }, function () { return tooFar(2); }, function () { return conclude(3); }],
          coach: '<p>Ask "What makes you say that?" after every conclusion. The answer should point to the text.</p>',
          mistake: '<p>A conclusion that goes too far ("always", "forever", "every") or one the text contradicts.</p>' }
      ]
    }, {
      id: 'strategies', title: 'Reading strategies', sub: 'Predict, check, fix confusion, and choose texts.',
      concepts: [
        { slug: 'predict', title: 'Predict, then check', exp: ['C2.3'], skill: 'predict',
          model: [
            step(T.show(tryout, tryout.predict.stop), 'Stop and think.'),
            step(W.sent('I tied my left shoe twice, but <mark class="hl">the lace kept slipping loose</mark>.'), 'A clue.'),
            step(W.chain(['The loose lace will cause trouble.', 'the loose lace whipped against my ankle'], ['I predict', 'Read on']), 'The prediction came true.'),
            step(T.show(portage, portage.predict.stop), 'Another story. Stop here.'),
            step(W.sent('<mark class="hl">Clouds are building in the west</mark>.'), 'A clue, plus what I know about clouds.'),
            step(W.chain(['A storm will reach them.', 'Thunder rolled somewhere behind the hills.'], ['I predict', 'Read on']), 'Ask: was I right? Check as you read.')
          ],
          guided: [function () { return predict(1); }, function () { return predictClue(1); }, function () { return clueTap(1); }],
          check: [function () { return predict(2); }, function () { return checkPrediction(2); }, function () { return predictTf(2); }, function () { return clueTap(2); }, function () { return predict(3); }],
          coach: '<p>Write predictions on sticky notes and move them to "right", "changed" or "wrong" as you read.</p>',
          mistake: '<p>Holding on to a prediction after the text proves it wrong. Changing your mind is good reading.</p>' },
        { slug: 'monitor', title: 'Fix confusion with the right strategy', exp: ['C2.4'], skill: 'monitor',
          model: [
            step(W.means('think', FIX[0][0]), 'An unknown word.'),
            step(fixCard('lookup')),
            step(W.means('think', FIX[2][0]), 'Hard to follow.'),
            step(fixCard('picture')),
            step(W.means('think', FIX[4][0]), 'Not explained yet.'),
            step(fixCard('ahead'), 'Each problem has its own fix.')
          ],
          guided: [function () { return monitor(1); }, monitorMatch, function () { return whichProblem(1); }],
          check: [function () { return monitor(2); }, monitorMatch, monitorTf, function () { return whichProblem(2); }, function () { return monitor(3); }],
          coach: '<p>Model it aloud: "I lost the thread there. I will read ahead a little to see if it gets explained."</p>',
          mistake: '<p>Using one strategy for every problem, such as rereading the same line again and again.</p>' },
        { slug: 'purpose', title: 'Choose a text that fits your purpose', exp: ['C2.2'], skill: 'purpose',
          model: [
            step(W.means('star', PURPOSE[1][0]), 'What do I need? Steps.'),
            step(W.means('read', PURPOSE[1][1]), 'Steps in order, with pictures.'),
            step(W.means('star', PURPOSE[0][0]), 'Now I need someone who lived it.'),
            step(W.means('people', PURPOSE[0][1]), 'Told from the inside.'),
            step(W.means('wrong', PURPOSE[0][2][0]), 'An ad wants to sell, not to tell.')
          ],
          guided: [function () { return purpose(1); }, function () { return purposeWhy(1); }, purposeTf],
          check: [function () { return purpose(2); }, purposeMatch, purposeTf, function () { return purposeWhy(2); }, function () { return purpose(3); }],
          coach: '<p>Before research, ask: "Who would know this best from the inside?" Look for creators from the community you are reading about.</p>',
          mistake: '<p>Choosing the first search result. Ask what the text is for and who made it.</p>' }
      ]
    }],
    practice: [
      { id: 'find', name: 'Find the evidence', code: 'C1.1', gen: fact },
      { id: 'ties', name: 'Words that point back', code: 'C1.1', gen: tie },
      { id: 'summarize', name: 'The main idea', code: 'C2.6', gen: mainIdea },
      { id: 'conclude', name: 'Conclusions', code: 'C2.6', gen: conclude },
      { id: 'predict', name: 'Predict, then check', code: 'C2.3', gen: predict },
      { id: 'monitor', name: 'Fix confusion', code: 'C2.4', gen: monitor },
      { id: 'purpose', name: 'Texts for a purpose', code: 'C2.2', gen: purpose }
    ],
    tasks: [
      { id: 'prior', title: 'What do I already know?', code: 'C2.1', pic: W.icon('think'), say: 'Before reading, list what you already know about the topic, and where you learned it.', write: true,
        run: ['Choose a new non-fiction text (an article, a chapter of a textbook).', 'Before reading, the child lists what they know and where from: experience, school subjects, other texts.', 'After reading, ask: "Which thing you knew helped you understand it?"'],
        rubric: ['Lists nothing, even with prompts.', 'Lists some facts but no sources.', 'Lists what they know and where it came from.', 'Explains how specific prior knowledge helped them understand the text.'] },
      { id: 'connections', title: 'Connections', code: 'C2.5', pic: W.icon('people'), say: 'How does this text connect to your life, to another text, and to the world?', write: true,
        run: ['After reading any text, the child writes three short connections: to their own life, to another text, to the world.', 'Ask them to explain how each connection deepened their understanding.'],
        rubric: ['No connection yet.', 'One connection, loosely explained.', 'Three clear connections.', 'Connections that explain how they changed the reader' + '’' + 's understanding.'] },
      { id: 'goals', title: 'What helped me, and my next goal', code: 'C2.7', pic: W.icon('star'), say: 'Which strategy helped you most this week? Set one goal for your reading.', write: true,
        run: ['Show the strategies: predict, visualize, summarize, connect, ask questions, read ahead.', 'The child compares two that they used: which helped more, and why?', 'They set one specific goal (for example "I will summarize each chapter in one sentence").'],
        rubric: ['Cannot name a strategy.', 'Names a strategy, but not how it helped.', 'Compares two strategies and sets a goal.', 'Explains clearly why one worked better and sets a specific, checkable goal.'] }
    ]
  });

  Q.shapes('reading', {
    find: [[1, 'tap-sentence', evidence], [1, 'find-line', findLine], [2, 'tf', factTf]],
    ties: [[1, 'tap-back', tieTap], [1, 'which-word', tieWord], [2, 'tf', tieTf]],
    summarize: [[1, 'detail', detail], [1, 'supports', supports], [2, 'title', bestTitle], [1, 'tf', mainTf]],
    conclude: [[1, 'tap-proof', proofTap], [1, 'too-far', tooFar], [2, 'tf', concludeTf]],
    predict: [[1, 'clue', predictClue], [1, 'tap-clue', clueTap], [2, 'tf', predictTf], [2, 'check', checkPrediction]],
    monitor: [[1, 'which-problem', whichProblem], [1, 'match', monitorMatch], [2, 'tf', monitorTf]],
    purpose: [[1, 'why', purposeWhy], [2, 'match', purposeMatch], [1, 'tf', purposeTf]]
  });
})();
