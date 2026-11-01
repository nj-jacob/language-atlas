/* Grade 8: reading strategies. A full chapter: every idea has two worked examples, three questions together and five on
   your own, its own practice skill asked in four or more ways, and the chapter has "Read and answer" sets.
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
  var Q1 = '“', Q2 = '”';
  /* what can be true of a passage, for comparing two texts (each passage lists its tags) */
  var TAGS = { story: 'It is a story.', info: 'It gives facts about a topic.', opinion: 'It argues for an opinion.', first: 'It is told by a character, in the first person.',
    third: 'It is a story told in the third person.', winter: 'It takes place in winter.', water: 'A river, lake or ocean matters in it.',
    indigenous: 'It includes First Nations or Inuit communities.', sport: 'It involves a sport.', problem: 'It is organized as a problem and a solution.', cause: 'It explains causes and effects.' };
  /* why people read each kind of text */
  var WHY = { 'short story': 'to enjoy a story', 'information text': 'to learn facts', 'letter to the editor': 'to be persuaded', 'opinion piece': 'to be persuaded', satire: 'to laugh and to think', poem: 'to enjoy a poem' };
  /* [a purpose, the passage that suits it] */
  var PURPOSE = [['to learn how northern communities get supplies', 'roads'], ['to enjoy a story about a spring flood', 'river'], ['to understand an argument about library hours', 'library'],
    ['to laugh at the way gadgets are sold', 'spoon'], ['to learn how one school cooled its classrooms', 'rooftop'], ['to learn how a rare fish is being brought back', 'sturgeon'],
    ['to find out why some tides are so high', 'tides'], ['to enjoy a story about a sports tryout', 'tryout'], ['to understand an argument for a skate park', 'skatepark'],
    ['to learn how to keep broken things out of the garbage', 'repair'], ['to enjoy a story about saving a crop from frost', 'orchard'], ['to enjoy a story set in a northern blizzard', 'radio'],
    ['to enjoy a short poem about carrying a canoe', 'portage'], ['to enjoy a story about catching a ferry', 'ferry']];
  /* [a reading problem, the strategy that fits, its picture, a group: strategies in one group could fix each other's problem] */
  var FIX = [['A word in bold, like ' + Q1 + 'asphalt' + Q2 + ', is new to you.', 'Check the glossary.', 'read', 'word'],
    ['A new word, like ' + Q1 + 'waded' + Q2 + ', sits in a sentence full of clues.', 'Use the clues in the sentence around it.', 'read', 'word'],
    ['You lose track of who is speaking.', 'Reread, and find the last speaker the text named.', 'again', 'back'],
    ['You are not sure who ' + Q1 + 'they' + Q2 + ' means.', 'Look back for the noun it stands for.', 'before', 'back'],
    ['The text mentions an event you know nothing about.', 'Look it up in a reliable reference.', 'screen', 'ref'],
    ['You are not sure what the main point is.', 'Ask yourself a question, then read on to answer it.', 'think', 'gist'],
    ['By the end, you forget what the first section said.', 'Stop and sum up each section in a few words.', 'write', 'gist'],
    ['A long sentence has so many parts that you lose the meaning.', 'Break it into smaller parts and read each one.', 'full', 'long'],
    ['You cannot picture how the water fills the bay.', 'Make a picture of it in your mind.', 'think', 'see']];
  var NOFIX = ['Skip the hard part and hope it makes sense later.', 'Read faster to reach the end.', 'Stop reading the text for good.', 'Guess, and keep going without checking.'];
  /* two passages: [a, b, an idea both share, ideas that do not fit both] */
  var SYNTH = [['rooftop', 'roads', 'Communities are responding to problems caused by heat and a changing climate.', ['Rooftop gardens are the answer for every school.', 'Ice roads are used in Toronto.']],
    ['ferry', 'river', 'Both stories use water to build tension about what will happen next.', ['Both stories are about floods.', 'Both stories are told by a narrator who cannot be trusted.']],
    ['library', 'rooftop', 'Young people can help solve problems in their community.', ['Libraries should grow vegetables.', 'Schools should close at 6 p.m.']],
    ['sturgeon', 'roads', 'Changes made by people or by climate can harm a way of life, and communities are working on solutions.', ['Sturgeon travel on the ice roads.', 'Both texts are about the Bay of Fundy.']],
    ['radio', 'roads', 'Northern communities find ways to stay connected in hard winter conditions.', ['Radio stations build the ice roads.', 'Both texts say winters are getting colder.']],
    ['tryout', 'captain', 'How a player acts under pressure matters as much as skill.', ['Both narrators make the team.', 'Both stories are about soccer.']],
    ['skatepark', 'library', 'Young people use evidence to persuade their town council.', ['Both writers want a new library.', 'Both texts are stories with a narrator.']],
    ['orchard', 'river', 'Weather and nature can threaten what people care about.', ['Both stories end in a flood.', 'Both stories take place in winter.']],
    ['repair', 'rooftop', 'People can reduce harm to the environment by changing how they use things.', ['Repair cafés grow vegetables.', 'Both texts are about schools.']]];

  function q(s) { return Q1 + s + Q2; }
  /* the passage to use: the one given (in a "Read and answer" set), or one that has what the question needs, sized for the level */
  function text(need, lv, t) { return t && t[need] ? t : R.pick(T.list(need, lv)); }
  function at(t, words) { for (var i = 0; i < t.lines.length; i++) if (t.lines[i] && t.lines[i].charAt(0) !== '#' && t.lines[i].indexOf(words) >= 0) return i; return -1; }
  function stopOf(t) { return t.predict.stop || t.predict.upTo; }
  /* a passage as a book cover: its pictures and title */
  function cover(t) { return W.passage(t.title, [], { pics: t.pics }); }
  function word(w) { return new RegExp('\\b' + w + '\\b'); }

  /* ---------- find it in the text (C1.1) ---------- */
  function fact(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    return Q.one(f[0], f[1], f.slice(2, lv > 1 ? 4 : 3), { fig: T.show(t), prompt: 'Find the sentence that tells you.', hint: 'Look back in the text. The answer is there.',
      explain: 'The text says: ' + q(t.lines[at(t, f[4])]), meta: { k: 'g8-fact', t: t.title, q: f[0] } });
  }
  function evidence(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var i = at(t, f[4]);
    return { q: 'Tap the sentence that answers: <b>' + f[0] + '</b>', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which words in the question can you find in the text?', hint: 'Find the question' + '’' + 's key words in the text. Read that sentence.', explain: 'It tells you: <b>' + f[1] + '</b>.',
      meta: { k: 'g8-tap-fact', t: t.title, q: f[0] } };
  }
  function findLine(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var right = t.lines[at(t, f[4])], others = T.body(t).filter(function (l) { return l !== right; });
    return Q.one('Which sentence answers this? <b>' + f[0] + '</b>', right, R.some(others, lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Which sentence has the answer in it?', explain: W.sent(right), meta: { k: 'g8-find-line', t: t.title, q: f[0] } });
  }
  function factTf(lv, t, f) {
    t = text('facts', lv, t); f = f || R.pick(t.facts);
    var right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(f.slice(2, 4));
    return { q: f[0] + '<br>' + Q.name() + ' says: <b>' + said + '</b>', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['The text says so.', 'The text says something else.'], answer: right ? 0 : 1 },
      hint: 'Find the sentence that answers the question.', explain: 'The text says: ' + q(t.lines[at(t, f[4])]), meta: { k: 'g8-fact-tf', t: t.title, q: f[0], said: said } };
  }

  /* ---------- small words point back (C1.1): [words that find the sentence, the word, what it points to, wrong, wrong] ---------- */
  var POINTERS = /^(i|me|my|mine|we|us|our|you|your|he|him|his|she|her|it|its|they|them|their|this|that|these|those|which|who|one|others)$/i;
  function tieLine(t, x) { return t.lines[at(t, x[0])]; }
  function marked(t, x) { return tieLine(t, x).replace(word(x[1]), '<mark class="hl">' + x[1] + '</mark>'); }
  /* the passage with the small word marked where it sits */
  function showTie(t, x) { var i = at(t, x[0]); return W.passage(t.title, t.lines.map(function (l, j) { return j === i ? marked(t, x) : l; }), { pics: t.pics }); }
  function arrow(x) { return W.chain([x[1], x[2]], ['This word', 'points back to']); }
  function pickTie(lv, t, x) { t = text('ties', lv, t); return [t, x || R.pick(t.ties)]; }
  function tie(lv, t0, x0) {
    var p = pickTie(lv, t0, x0), t = p[0], x = p[1];
    return Q.one('What does <b>' + x[1] + '</b> point back to?', x[2], x.slice(3, lv > 1 ? 5 : 4), { fig: showTie(t, x),
      prompt: 'Look back for the noun or idea it stands for.', hint: 'Words like she, his, them, which and this point back to something already named.', explain: arrow(x),
      meta: { k: 'g8-tie', t: t.title, w: x[1], line: at(t, x[0]) } });
  }
  function tieWord(lv) {
    var p = pickTie(lv), t = p[0], x = p[1], line = tieLine(t, x);
    var others = line.replace(/[“”.,!?:;]/g, '').split(' ').filter(function (w) { return w.length > 3 && !POINTERS.test(w.replace(/’s$/, '')) && w !== x[1] && x[2].indexOf(w) < 0; });
    return Q.tiles('Which word points back to <b>' + x[2] + '</b>?', x[1], R.some(others, lv > 1 ? 3 : 2), { fig: W.sent(line), prompt: 'Which small word stands for it?',
      hint: 'Look for a short word that stands in for a name or an idea.', explain: arrow(x), meta: { k: 'g8-tie-word', t: t.title, to: x[2] } });
  }
  function tieTf(lv) {
    var p = pickTie(lv), t = p[0], x = p[1], right = R.int(0, 1) === 1, said = right ? x[2] : R.pick(x.slice(3, 5));
    return { q: Q.name() + ' says <b>' + x[1] + '</b> points back to <b>' + said + '</b>.', fig: showTie(t, x), type: 'tf', answer: right,
      why: { options: ['That is what it stands for.', 'It stands for something else.'], answer: right ? 0 : 1 }, hint: 'Look back. What was named before it?', explain: arrow(x),
      meta: { k: 'g8-tie-tf', t: t.title, w: x[1], said: said } };
  }
  function tieMatch(lv) {
    var t = R.pick(T.list('ties', lv).filter(function (t) { return t.ties.length >= 2; })), seen = {};
    var ts = R.shuffle(t.ties).filter(function (x) { var k = x[1].toLowerCase(); if (seen[k]) return false; seen[k] = true; return true; }).slice(0, 3);
    return { q: 'Match each small word to what it points back to.', fig: T.show(t), type: 'match', pairs: ts.map(function (x) { return [x[0].replace(word(x[1]), '<b>' + x[1] + '</b>'), x[2]]; }),
      hint: 'Find each one in the text, then look back.', explain: ts.map(arrow).join(''), meta: { k: 'g8-tie-match', t: t.title } };
  }

  /* ---------- predict, then confirm or refute (C2.3) ---------- */
  function predict(lv, t) {
    t = text('predict', lv, t); var p = t.predict;
    return Q.one('What will <b>most likely</b> come next?', p.right, p.wrong.slice(0, lv > 1 ? 2 : 1), { fig: T.show(t, stopOf(t)), prompt: 'Use what you know and a clue from the text.',
      hint: 'Which words point to what comes next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g8-predict', t: t.title } });
  }
  function clueTap(lv, t) {
    t = text('predict', lv, t); var p = t.predict, i = at(t, p.clue);
    return { q: 'You predict: <b>' + p.right + '</b> Tap the sentence with the clue.', type: 'tap', pic: T.show(t, stopOf(t), { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which sentence makes you think so?', hint: 'Which sentence points to what comes next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g8-clue-tap', t: t.title } };
  }
  function predictTf(lv, t) {
    t = text('predict', lv, t); var p = t.predict, right = R.int(0, 1) === 1, said = right ? p.right : R.pick(p.wrong);
    return { q: Q.name() + ' predicts: <b>' + said + '</b>', fig: T.show(t, stopOf(t)), type: 'tf', answer: right,
      why: { options: ['A clue in the text points to it.', 'Nothing in the text points to it.'], answer: right ? 0 : 1 },
      hint: 'Is there a clue in the text?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g8-predict-tf', t: t.title, said: said } };
  }
  function confirm(lv, t, c) {
    t = text('check', lv, t); c = c || R.pick(t.check);
    var said = c[1] ? 'confirmed' : 'refuted';
    return Q.tiles('Part way through, a reader predicted: <b>' + c[0] + '</b> Read the whole text. Is it confirmed or refuted?', said, [c[1] ? 'refuted' : 'confirmed'], {
      fig: T.show(t), prompt: 'Find the part of the text that answers the prediction.', hint: 'Confirmed: the text shows it. Refuted: the text shows something else.',
      explain: W.chain([c[0], '<mark class="hl">' + c[2] + '</mark>', said], ['Predict', 'Read on', 'So']), meta: { k: 'g8-confirm', t: t.title, p: c[0] } });
  }

  /* ---------- notice when you are lost, and fix it (C2.4) ---------- */
  function fixCard(f) { return W.means(f[2], f[1]); }
  function otherGroups(f) { return FIX.filter(function (x) { return x[3] !== f[3]; }); }
  function whichFix(lv) {
    var f = R.pick(FIX);
    return Q.one('<b>Problem:</b> ' + f[0] + ' What should you do?', f[1], R.some(otherGroups(f), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }).concat(lv > 2 ? [R.pick(NOFIX)] : []), {
      prompt: 'Which strategy fixes this problem?', hint: 'Match the strategy to the problem.', explain: fixCard(f), meta: { k: 'g8-fix', p: f[0] } });
  }
  function threeGroups() {
    var out = [];
    R.shuffle(FIX).forEach(function (f) { if (out.length < 3 && !out.some(function (x) { return x[3] === f[3]; })) out.push(f); });
    return out;
  }
  function matchFix() {
    var fs = threeGroups();
    return { q: 'Match each problem to the strategy that fits.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Which strategy solves which problem?',
      explain: fs.map(fixCard).join(''), meta: { k: 'g8-match-fix' } };
  }
  function fixTf() {
    var f = R.pick(FIX), right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(NOFIX), n = Q.name();
    return { q: '<b>Problem:</b> ' + f[0] + '<br>' + n + ' decides: <b>' + said + '</b>', type: 'tf', answer: right,
      why: { options: ['It fixes the problem.', 'It leaves the problem unfixed.'], answer: right ? 0 : 1 },
      hint: 'Will it help the text make sense?', explain: fixCard(f), meta: { k: 'g8-fix-tf', p: f[0], said: said } };
  }
  function fixAll(lv) {
    var good = threeGroups().slice(0, 2).map(function (f) { return f[1]; });
    return Q.all('Reading gets hard. Pick every strategy that would help.', good, R.some(NOFIX, lv > 1 ? 2 : 1), {
      hint: 'Good readers slow down and check.', explain: 'Good readers notice when they are lost and choose a fix.', meta: { k: 'g8-fix-all' } });
  }

  /* ---------- choose a text for your purpose (C2.2) ---------- */
  function choose(lv) {
    var p = R.pick(PURPOSE);
    return Q.tiles('Which text would you choose <b>' + p[0] + '</b>?', T[p[1]].title, R.some(PURPOSE.filter(function (x) { return x !== p; }), lv > 1 ? 3 : 2).map(function (x) { return T[x[1]].title; }), {
      prompt: 'What does each title promise?', hint: 'Think about what kind of text each title suggests.', explain: cover(T[p[1]]), meta: { k: 'g8-choose-text', purpose: p[0] } });
  }
  function purposeOf(lv, t) {
    t = text('purpose', lv, t);
    var wrong = R.some(Object.keys(WHY).map(function (k) { return WHY[k]; }).filter(function (w, i, a) { return w !== WHY[t.kind] && a.indexOf(w) === i; }), lv > 1 ? 3 : 2);
    return Q.one('Why would most people read this?', WHY[t.kind], wrong, { fig: T.show(t), prompt: 'What kind of text is it?',
      hint: 'A story, facts, an argument, a joke with a point, or a poem?', explain: 'It is ' + (/^[aeiou]/.test(t.kind) ? 'an ' : 'a ') + t.kind + ': people read it <b>' + WHY[t.kind] + '</b>.', meta: { k: 'g8-purpose', t: t.title } });
  }
  function matchPurpose() {
    var kinds = {}, ts = R.shuffle(T.list('purpose')).filter(function (t) { if (kinds[WHY[t.kind]]) return false; kinds[WHY[t.kind]] = true; return true; }).slice(0, 3);
    return { q: 'Match each text to why people read it.', type: 'match', pairs: ts.map(function (t) { return [t.title, WHY[t.kind]]; }), hint: 'What kind of text does each title suggest?',
      explain: 'Stories to enjoy, information to learn, opinions to be persuaded, satire to laugh and think.', meta: { k: 'g8-match-why-read' } };
  }
  function purposeTf(lv) {
    var p = R.pick(PURPOSE), right = R.int(0, 1) === 1, t = right ? T[p[1]] : T[R.pick(PURPOSE.filter(function (x) { return x !== p; }))[1]];
    return { q: Q.name() + ' wants <b>' + p[0] + '</b>, and picks this text.', fig: cover(t), type: 'tf', answer: right,
      why: { options: ['It suits that purpose.', 'It suits a different purpose.'], answer: right ? 0 : 1 }, hint: 'What does the title promise?',
      explain: 'For that purpose: ' + cover(T[p[1]]), meta: { k: 'g8-purpose-tf', purpose: p[0], t: t.title } };
  }

  /* ---------- a summary covers the whole text, briefly (C2.6) ---------- */
  function summary(lv, t) {
    t = text('summary', lv, t);
    return Q.one('Which is the best <b>summary</b>?', t.summary[0], t.summary.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which one covers the whole text, briefly, without an opinion?',
      hint: 'Not one detail. Not an opinion.', explain: W.web(t.summary[0], t.points), meta: { k: 'g8-summary', t: t.title } });
  }
  function summaryTf(lv, t) {
    t = text('summary', lv, t);
    var i = R.int(0, 2), good = i === 0, says = R.int(0, 1) === 1;
    return { q: Q.name() + ' says this is ' + (says ? '<b>a good summary</b>' : '<b>not a good summary</b>') + ':', fig: W.sent(t.summary[i]) + T.show(t), type: 'tf', answer: says === good,
      why: { options: ['It covers the whole text briefly.', i === 2 ? 'It adds an opinion.' : 'It gives only one detail.'], answer: good ? 0 : 1 },
      hint: 'Does it cover the whole text, without opinion?', explain: W.web(t.summary[0], t.points), meta: { k: 'g8-summary-tf', t: t.title, s: t.summary[i], says: says } };
  }
  function roof(lv, t) {
    t = text('points', lv, t);
    var other = R.pick(T.list('summary').filter(function (x) { return x !== t; }));
    return Q.one('What goes on the roof, over these details?', t.summary[0], [t.summary[1]].concat(lv > 1 ? [other.summary[0]] : []), { fig: W.web(W.gap(), t.points) + T.show(t),
      prompt: 'Which one holds up every detail?', hint: 'The roof covers the whole text, not one part.', explain: W.web(t.summary[0], t.points), meta: { k: 'g8-roof', t: t.title } });
  }
  function detail(lv, t) {
    t = text('summary', lv, t);
    return Q.one('Which is only <b>one detail</b>, not a summary?', t.summary[1], [t.summary[0]].concat(lv > 1 ? [t.summary[2]] : []), { fig: T.show(t),
      hint: 'A detail is one small part of the text.', explain: W.web(t.summary[0], [t.summary[1]]), meta: { k: 'g8-detail', t: t.title } });
  }

  /* ---------- combine ideas from two texts (C2.5, C2.6) ---------- */
  function two(a, b) { return T.show(a) + T.show(b); }
  function synth(lv) {
    var s = R.pick(SYNTH), a = T[s[0]], b = T[s[1]];
    return Q.one('Read both. Which idea do they <b>share</b>?', s[2], s[3].slice(0, lv > 1 ? 2 : 1), { fig: two(a, b), prompt: 'Look for an idea that fits both texts.',
      hint: 'Synthesizing means combining ideas from two texts into one new understanding.', explain: W.web(s[2], [a.title, b.title]), meta: { k: 'g8-synth', a: a.title } });
  }
  function synthTf() {
    var s = R.pick(SYNTH), a = T[s[0]], b = T[s[1]], right = R.int(0, 1) === 1, said = right ? s[2] : R.pick(s[3]);
    return { q: Q.name() + ' says both texts share this idea: <b>' + said + '</b>', fig: two(a, b), type: 'tf', answer: right,
      why: { options: ['It fits both texts.', 'It fits one text, or neither.'], answer: right ? 0 : 1 }, hint: 'Check it against each text.',
      explain: W.web(s[2], [a.title, b.title]), meta: { k: 'g8-synth-tf', a: a.title, said: said } };
  }
  function tagged(lv) { return T.list('tags', lv); }
  function has(t, g) { return t.tags.indexOf(g) >= 0; }
  /* two different passages that share a tag, and one that each has alone */
  function pair(lv, test) {
    for (var n = 0; n < 50; n++) { var a = R.pick(tagged(lv)), b = R.pick(T.list('tags')); if (a !== b && test(a, b)) return [a, b]; }
    return [T.ferry, T.river];
  }
  function both(lv) {
    var p = pair(lv, function (a, b) { return a.tags.some(function (g) { return has(b, g); }) && Object.keys(TAGS).filter(function (g) { return !(has(a, g) && has(b, g)); }).length >= 3; });
    var a = p[0], b = p[1], common = Object.keys(TAGS).filter(function (g) { return has(a, g) && has(b, g); }), g = R.pick(common);
    var oneOnly = Object.keys(TAGS).filter(function (x) { return has(a, x) !== has(b, x); }), neither = Object.keys(TAGS).filter(function (x) { return !has(a, x) && !has(b, x); });
    var wrong = R.some(oneOnly, Math.min(oneOnly.length, lv > 1 ? 2 : 1));
    wrong = wrong.concat(R.some(neither, (lv > 1 ? 3 : 2) - wrong.length));
    return Q.one('Which is true of <b>both</b> texts?', TAGS[g], wrong.map(function (x) { return TAGS[x]; }), { fig: two(a, b), prompt: 'Check each answer against both texts.',
      hint: 'It must fit the first text and the second.', explain: W.web(TAGS[g], [a.title, b.title]), meta: { k: 'g8-both', a: a.title, b: b.title } });
  }
  function onlyOne(lv) {
    var p = pair(lv, function (a, b) { return a.tags.some(function (g) { return !has(b, g); }) && a.tags.some(function (g) { return has(b, g); }); });
    var a = p[0], b = p[1], mine = a.tags.filter(function (g) { return !has(b, g); }), g = R.pick(mine);
    var wrong = R.some(Object.keys(TAGS).filter(function (x) { return has(b, x) || !has(a, x); }), lv > 1 ? 2 : 1);
    return Q.one('Which is true of <b>' + a.title + '</b> but not <b>' + b.title + '</b>?', TAGS[g], wrong.map(function (x) { return TAGS[x]; }), { fig: two(a, b),
      prompt: 'Compare and contrast: what does only the first text do?', hint: 'It must fit the first text and not the second.', explain: TAGS[g] + ' Only ' + q(a.title) + '.', meta: { k: 'g8-only-one', a: a.title, b: b.title } });
  }

  /* ---------- read and answer: five questions about one passage ---------- */
  function ask(t) {
    var fs = R.some(t.facts, 2), lv = T.words(t) < 150 ? 1 : 3, more = [];
    if (t.summary) more.push(function () { return summary(lv, t); });
    if (t.ties) more.push(function () { return tie(lv, t); });
    if (t.check) more.push(function () { return confirm(lv, t); });
    if (t.points) more.push(function () { return roof(lv, t); });
    more.push(function () { return purposeOf(lv, t); }, function () { return factTf(lv, t, R.pick(t.facts)); });
    return [fact(lv, t, fs[0]), evidence(lv, t, fs[1])].concat(R.some(more, 3).map(function (f) { return f(); }));
  }
  var readable = T.list('facts').filter(function (t) { return t.facts.length >= 2; }).sort(function (a, b) { return T.words(a) - T.words(b); });

  var F = T.ferry, TR = T.tryout;
  Atlas.register('reading', {
    full: true,
    read: { texts: readable, show: function (t) { return T.show(t); }, ask: ask },
    lessons: [{
      id: 'understand', title: 'Reading closely', sub: 'Details, and the words that tie a text together.',
      concepts: [
        { slug: 'details', title: 'Find the answer in the text', exp: ['C1.1'], skill: 'details',
          model: [
            step(T.show(F), 'Read it once for the story.'),
            step(W.sent(F.facts[0][0]), 'A question.'),
            step(W.sent('She pictured <mark class="hl">her grandmother waiting</mark> on the island dock…'), 'Look back. The answer is there.'),
            step(W.passage(TR.title, TR.lines.slice(0, 3), { pics: TR.pics }), 'A longer text.'),
            step(W.sent('How many spots were on the team?'), 'Find its key words: <b>spots</b>, <b>team</b>.'),
            step(W.sent('Twenty players were trying out for <mark class="hl">twelve spots</mark> on the… team.'), 'Twelve, not twenty.')
          ],
          guided: [function () { return fact(1); }, function () { return evidence(1); }, function () { return findLine(1); }],
          check: [function () { return fact(2); }, function () { return evidence(2); }, function () { return findLine(2); }, function () { return factTf(2); }, function () { return evidence(3); }],
          coach: '<p>Insist on "show me where it says that". Pointing to the line is how strong readers check themselves.</p>',
          mistake: '<p>Answering from memory or what seems likely. Check the text.</p>' },
        { slug: 'ties', title: 'Small words point back', exp: ['C1.1'], skill: 'ties',
          model: [
            step(W.sent('<b>Amira</b> ran down the hill.'), 'A name.'),
            step(W.sent('<mark class="hl">She</mark> pictured her grandmother waiting…')),
            step(arrow(F.ties[0]), 'Look back for the name.'),
            step(W.sent('Coach Dubois watched, then wrote something on <mark class="hl">her</mark> clipboard.'), 'Two people could be <b>her</b>.'),
            step(arrow(TR.ties[0]), 'The coach holds the clipboard, not the narrator.')
          ],
          guided: [function () { return tie(1); }, function () { return tieWord(1); }, function () { return tieTf(1); }],
          check: [function () { return tie(2); }, function () { return tieWord(2); }, function () { return tieTf(2); }, function () { return tieMatch(2); }, function () { return tie(3); }],
          coach: '<p>In hard texts, have the child draw an arrow from each "it", "they" or "this" back to what it means.</p>',
          mistake: '<p>Linking a pronoun to the nearest noun instead of the right one.</p>' }
      ]
    }, {
      id: 'strategies', title: 'Reading strategies', sub: 'Predict, check, fix, and choose.',
      concepts: [
        { slug: 'predict', title: 'Predict, then confirm or refute', exp: ['C2.3'], skill: 'predict',
          model: [
            step(T.show(F, 4), 'The ramp is rising…'),
            step(W.means('think', 'She will miss it.'), 'A prediction.'),
            step(W.chain(['She will miss it.', 'the ramp slowly lowered again', 'refuted'], ['Predict', 'Read on', 'So']), 'The text says otherwise. Revise it.'),
            step(W.sent('Some people say a skate park would be too expensive.'), 'An opinion piece answers a worry…'),
            step(W.sent('Others worry that a skate park would be noisy…'), '…so it will answer this one too.'),
            step(W.chain(['It will answer the worry.', 'However, the Port Ellis police report…', 'confirmed'], ['Predict', 'Read on', 'So']))
          ],
          guided: [function () { return predict(1); }, function () { return clueTap(1); }, function () { return confirm(1); }],
          check: [function () { return predict(2); }, function () { return clueTap(2); }, function () { return predictTf(2); }, function () { return confirm(2); }, function () { return confirm(3); }],
          coach: '<p>Predictions are not about being right. Praise the child for changing a prediction when the text says otherwise.</p>',
          mistake: '<p>Holding on to a prediction after the text has refuted it.</p>' },
        { slug: 'monitor', title: 'Notice when you are lost, and fix it', exp: ['C2.4'], skill: 'monitor',
          model: [
            step(W.means('think', 'What is <b>asphalt</b>?'), 'A bold word.'),
            step(W.means('read', '<b>asphalt</b>: a black, sticky material used to pave roads'), 'The glossary at the back.'),
            step(W.sent('…the dams blocked the rocky places where <mark class="hl">they</mark> lay their eggs.'), 'Who are <b>they</b>?'),
            step(fixCard(FIX[3])),
            step(arrow(T.sturgeon.ties[1]), 'Now it makes sense.')
          ],
          guided: [function () { return whichFix(1); }, matchFix, fixTf],
          check: [function () { return whichFix(2); }, matchFix, fixTf, function () { return fixAll(2); }, function () { return whichFix(3); }],
          coach: '<p>Model it aloud as you read: "Wait, I lost the thread. Let me reread."</p>',
          mistake: '<p>Reading to the end of the page while confused, hoping it will clear up.</p>' },
        { slug: 'purpose', title: 'Choose a text that suits your purpose', exp: ['C2.2'], skill: 'purpose',
          model: [
            step(W.means('think', 'to find out why some tides are so high')),
            step(cover(T.tides), 'An information text: it fits.'),
            step(cover(T.orchard), 'A story: for a different purpose.'),
            step(W.means('think', 'to understand an argument for a skate park'), 'A new purpose.'),
            step(cover(T.skatepark), 'An opinion piece: it argues.')
          ],
          guided: [function () { return choose(1); }, function () { return purposeOf(1); }, function () { return purposeTf(1); }],
          check: [function () { return choose(2); }, function () { return purposeOf(2); }, matchPurpose, function () { return purposeTf(2); }, function () { return choose(3); }],
          coach: '<p>At the library, give the child a purpose ("find out how bridges are built") and have them justify the book they choose.</p>',
          mistake: '<p>Choosing a text by its cover rather than its purpose and creator.</p>' }
      ]
    }, {
      id: 'summarize', title: 'Summarize and synthesize', sub: 'The whole text in brief, and ideas across texts.',
      concepts: [
        { slug: 'summary', title: 'A summary covers the whole text, briefly', exp: ['C2.6'], skill: 'summary',
          model: [
            step(W.sent(F.summary[1]), 'Only a detail.'),
            step(W.sent(F.summary[2]), 'An opinion, not in the text.'),
            step(W.web(F.summary[0], F.points), 'Who, what, and how it ends.'),
            step(W.web(W.gap(), T.tides.points), 'A longer text: three key details.'),
            step(W.web(T.tides.summary[0], T.tides.points), 'One sentence holds them all up.')
          ],
          guided: [function () { return summary(1); }, function () { return detail(1); }, function () { return roof(1); }],
          check: [function () { return summary(2); }, function () { return summaryTf(2); }, function () { return roof(2); }, function () { return detail(2); }, function () { return summary(3); }],
          coach: '<p>Limit a summary to one or two sentences. Ask: "Would someone who has not read it understand the whole thing?"</p>',
          mistake: '<p>Retelling every event, or adding an opinion.</p>' },
        { slug: 'synthesize', title: 'Combine ideas from two texts', exp: ['C2.5', 'C2.6'], skill: 'synthesize',
          model: [
            step(cover(T.rooftop) + cover(T.roads), 'Two different texts.'),
            step(W.chain(['heat → a garden', 'warm winters → new roads'], ['First text', 'Second text']), 'Each one: a problem and a response.'),
            step(W.web(SYNTH[0][2], [T.rooftop.title, T.roads.title])),
            step(cover(T.tryout) + cover(T.captain), 'Two players, two stories.'),
            step(W.chain(['steals the ball', 'kicks a bottle'], ['Tryout', 'The Calmest Player']), 'Under pressure, one keeps going. One loses it.'),
            step(W.web(SYNTH[5][2], [T.tryout.title, T.captain.title]))
          ],
          guided: [function () { return synth(1); }, function () { return both(1); }, synthTf],
          check: [function () { return synth(2); }, function () { return both(2); }, synthTf, function () { return onlyOne(2); }, function () { return both(3); }],
          coach: '<p>After reading two texts on a topic, ask: "What do you understand now that neither text said on its own?"</p>',
          mistake: '<p>Summarizing each text separately instead of combining them.</p>' }
      ]
    }],
    practice: [
      { id: 'details', name: 'Find it in the text', code: 'C1.1', gen: fact },
      { id: 'ties', name: 'Words that point back', code: 'C1.1', gen: tie },
      { id: 'predict', name: 'Predict and check', code: 'C2.3', gen: predict },
      { id: 'monitor', name: 'Fix confusion', code: 'C2.4', gen: whichFix },
      { id: 'purpose', name: 'Read for a purpose', code: 'C2.2', gen: choose },
      { id: 'summary', name: 'Summarize', code: 'C2.6', gen: summary },
      { id: 'synthesize', name: 'Combine two texts', code: 'C2.5, C2.6', gen: synth }
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
    details: [[1, 'tap-sentence', evidence], [1, 'find-line', findLine], [2, 'true-false', factTf]],
    ties: [[1, 'which-word', tieWord], [1, 'true-false', tieTf], [2, 'match', tieMatch]],
    predict: [[1, 'tap-clue', clueTap], [1, 'confirm', confirm], [2, 'true-false', predictTf]],
    monitor: [[1, 'match', matchFix], [1, 'true-false', fixTf], [2, 'pick-all', fixAll]],
    purpose: [[1, 'why-read', purposeOf], [1, 'true-false', purposeTf], [2, 'match', matchPurpose]],
    summary: [[1, 'roof', roof], [1, 'only-a-detail', detail], [2, 'true-false', summaryTf]],
    synthesize: [[1, 'both', both], [1, 'true-false', synthTf], [2, 'only-one', onlyOne]]
  });
})();
