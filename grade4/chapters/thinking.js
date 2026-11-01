/* Grade 4: thinking about texts. A full chapter: every idea has two worked examples, three questions together and five on
   your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 4, Strand C (Critical Literacy):
   C3.2 local and global inferences, using explicit and implicit evidence
   C3.3 main and supporting ideas, sequencing the events of multiple plots, and cause and effect
   C3.5 explicit and implicit perspectives, how they are conveyed, evidence of bias, and how bias could influence an audience
   With a grown-up: C3.4 cultural elements in texts, C3.6 topics such as diversity, inclusion and accessibility, C3.7 texts by First
   Nations, Metis and Inuit creators and their contexts, C3.8 the critical thinking skills used.
   Passages are in ../texts.js. Answer checks: tests/verify/grade4-thinking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts, AP = '’', Q1 = '“', Q2 = '”';
  function q(s) { return Q1 + s + Q2; }
  function text(need, lv, t) { return t && t[need] ? t : R.pick(T.list(need, lv)); }
  function at(t, words) { for (var i = 0; i < t.lines.length; i++) if (t.lines[i] && t.lines[i].charAt(0) !== '#' && t.lines[i].indexOf(words) >= 0) return i; return -1; }
  function tapText(t, words, more) {
    var i = at(t, words);
    return Object.assign({ type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i] }, more);
  }

  /* ---------- clues for what is not said: local inferences (C3.2) ---------- */
  function local(lv, t) {
    t = text('infer', lv, t); var f = R.pick(t.infer);
    return Q.one(f[0], f[1], [f[2]], { fig: T.show(t), prompt: 'The text does not say it. Look for a clue: <b>' + f[3] + '</b>.',
      hint: 'What do the words and actions tell you?', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g4-local', t: t.title, q: f[0] } });
  }
  function twoClues(lv) { return R.pick(T.list('infer', lv).filter(function (x) { return x.infer.length > 1; })); }
  function evidence(lv) {
    var t = twoClues(lv), f = R.pick(t.infer), others = t.infer.filter(function (x) { return x !== f; }).map(function (x) { return x[3]; });
    return Q.one('<b>' + f[0] + '</b> The answer is <b>' + f[1] + '</b>. Which words show it?', f[3], others, { fig: T.show(t),
      hint: 'Which words fit that answer?', explain: '<mark class="hl">' + f[3] + '</mark> shows it.', meta: { k: 'g4-evidence', t: t.title, q: f[0] } });
  }
  function inferTap(lv, t) {
    t = text('infer', lv, t); var f = R.pick(t.infer);
    return tapText(t, f[3], { q: '<b>' + f[0] + '</b> ' + cap(f[1]) + '. Tap the sentence with the clue.', prompt: 'Which sentence shows it, without saying it?',
      hint: 'Look for what a character does or says.', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g4-infer-tap', t: t.title, q: f[0] } });
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function clueMatch(lv) {
    var t = twoClues(lv);
    return { q: 'Match each question to the clue that answers it.', fig: T.show(t), type: 'match', pairs: t.infer.map(function (f) { return [f[0], f[3]]; }),
      hint: 'Find each clue in the text.', explain: 'Each clue answers a different question.', meta: { k: 'g4-clue-match-text', t: t.title } };
  }
  function inferTf(lv, t) {
    t = text('infer', lv, t); var f = R.pick(t.infer), right = R.int(0, 1) === 1, said = right ? f[1] : f[2];
    return { q: f[0] + '<br>' + Q.name() + ' says: <b>' + said + '</b>.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['A clue in the text shows it.', 'The clues show something else.'], answer: right ? 0 : 1 },
      hint: 'Find a clue. What does it show?', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g4-infer-tf', t: t.title, q: f[0], said: said } };
  }

  /* ---------- the big message: global inferences (C3.2) ---------- */
  function global(lv, t) {
    t = text('theme', lv, t);
    return Q.one('What is the <b>big message</b> of the whole text?', t.theme[0], t.theme.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Think about the whole text, not one sentence.',
      hint: 'What does the writer want you to learn from it all?', explain: W.means('star', t.theme[0]), meta: { k: 'g4-global', t: t.title } });
  }
  function themeTap(lv, t) {
    t = text('theme', lv, t);
    return tapText(t, t.theme[3], { q: 'The big message: <b>' + t.theme[0] + '</b> Tap a sentence that shows it.', prompt: 'Which part of the ending shows the message?',
      hint: 'Look near the end. How do things turn out?', explain: 'It shows it: <mark class="hl">' + t.theme[3] + '</mark>.', meta: { k: 'g4-theme-tap', t: t.title } });
  }
  function themeTf(lv, t) {
    t = text('theme', lv, t); var right = R.int(0, 1) === 1, said = right ? t.theme[0] : R.pick(t.theme.slice(1, 3));
    return { q: Q.name() + ' says the big message is: <b>' + said + '</b>', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['It fits the whole text.', 'It is only a small detail.'], answer: right ? 0 : 1 },
      hint: 'Does it fit the whole text, or one small part?', explain: 'The big message: ' + t.theme[0], meta: { k: 'g4-theme-tf', t: t.title, said: said } };
  }
  function themeMatch() {
    var ts = R.some(T.list('theme'), 3);
    return { q: 'Match each text to its big message.', type: 'match', pairs: ts.map(function (t) { return [t.title, t.theme[0]]; }), hint: 'Think about how each one ends.', explain: 'Each text teaches something.', meta: { k: 'g4-theme-match' } };
  }

  /* ---------- two plots (C3.3) ---------- */
  function twoPlots(lv, t) { return t && t.plots ? t : R.pick(T.list('plots', lv)); }
  function names(t) { return Object.keys(t.plots); }
  function plotPick(lv, t) {
    t = twoPlots(lv, t); var ns = R.shuffle(names(t)), who = ns[0];
    return Q.all('This story has two plots. Pick every event in <b>' + who + '</b>' + AP + 's plot.', R.some(t.plots[who], 2), R.some(t.plots[ns[1]], 2), { fig: T.show(t),
      hint: 'Who is in each event?', explain: 'The story switches between ' + names(t).join(' and ') + '.', meta: { k: 'g4-plot-pick', t: t.title, who: who } });
  }
  function plotOrder(lv, t) {
    t = twoPlots(lv, t); var who = R.pick(names(t)), ev = t.plots[who].slice(0, lv > 1 ? 4 : 3);
    return { q: 'Put the events of <b>' + who + '</b>' + AP + 's plot in order.', fig: T.show(t), type: 'order', items: ev.map(q), first: 'First', last: 'Last',
      hint: 'Follow only ' + who + '. Find each event in the text.', explain: W.chain(ev.map(q)), meta: { k: 'g4-plot-order', t: t.title, who: who } };
  }
  function whosePlot(lv, t) {
    t = twoPlots(lv, t); var who = R.pick(names(t)), e = R.pick(t.plots[who]);
    return { q: 'Whose plot is this event in? <b>' + q(e) + '</b>', fig: T.show(t), type: 'tap', tiles: names(t), answer: names(t).indexOf(who),
      prompt: 'Find it in the text. Who is doing it, or who is it happening to?', hint: 'Find the event. Who is it about?', explain: 'It is part of <b>' + who + '</b>' + AP + 's plot.', meta: { k: 'g4-whose-plot', t: t.title, e: e } };
  }
  function plotTf(lv, t) {
    t = twoPlots(lv, t); var ns = names(t), who = R.pick(ns), right = R.int(0, 1) === 1, e = R.pick(t.plots[right ? who : ns[1 - ns.indexOf(who)]]);
    return { q: Q.name() + ' says ' + q(e) + ' is part of <b>' + who + '</b>' + AP + 's plot.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['It happens to ' + who + '.', 'It happens to someone else.'], answer: right ? 0 : 1 },
      hint: 'Find the event in the text. Who is in it?', explain: 'Follow one character at a time.', meta: { k: 'g4-plot-tf', t: t.title, who: who, e: e } };
  }

  /* ---------- cause and effect (C3.3) ---------- */
  function allCauses() { return T.list('cause').reduce(function (a, x) { return a.concat(x.cause); }, []); }
  function effectOf(lv, t) {
    t = text('cause', lv, t); var c = R.pick(t.cause), others = allCauses().filter(function (x) { return x !== c; });
    return Q.one('What happened <b>because</b>: ' + c[0], c[1], R.some(others, lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), { fig: T.show(t), prompt: 'Find the cause in the text. What did it make happen?',
      hint: 'Find the cause in the text. What did it lead to?', explain: W.chain([c[0], c[1]], ['Cause', 'Effect']), meta: { k: 'g4-effect', c: c[0] } });
  }
  function causeOf(lv, t) {
    t = text('cause', lv, t); var c = R.pick(t.cause), others = allCauses().filter(function (x) { return x !== c; });
    return Q.one('<b>' + c[1] + '</b> What made this happen?', c[0], R.some(others, lv > 1 ? 2 : 1).map(function (x) { return x[0]; }), { fig: T.show(t), prompt: 'Ask: why did it happen?',
      hint: 'Look for what came before it in the text.', explain: W.chain([c[0], c[1]], ['Cause', 'Effect']), meta: { k: 'g4-cause-of', e: c[1] } });
  }
  function cause(lv, t) {
    t = t && t.cause && t.cause.length > 1 ? t : R.pick(T.list('cause', lv).filter(function (x) { return x.cause.length > 1; }));
    return { q: 'Match each cause to its effect.', fig: T.show(t), type: 'match', pairs: t.cause.map(function (c) { return [c[0], c[1]]; }), hint: 'Ask: what happened because of this?', explain: 'A cause makes something happen: the effect.', meta: { k: 'g4-cause', t: t.title } };
  }
  function causeTf(lv) {
    var cs = allCauses(), c = R.pick(cs), right = R.int(0, 1) === 1, e = right ? c[1] : R.pick(cs.filter(function (x) { return x !== c; }))[1];
    return { q: Q.name() + ' joins two ideas with <b>so</b>:', fig: W.chain([c[0], e], ['Cause', 'so']), type: 'tf', answer: right,
      why: { options: ['The first one makes the second happen.', 'The first one does not cause the second.'], answer: right ? 0 : 1 },
      hint: 'Did the first one make the second one happen?', explain: c[0] + ' So: ' + c[1], meta: { k: 'g4-cause-tf', c: c[0], e: e } };
  }

  /* ---------- whose view, and whose is missing (C3.5) ---------- */
  function view(lv, t) { return t && t.view ? t : R.pick(T.list('view', lv)); }
  function thinks(lv, t) {
    t = view(lv, t); var v = t.view;
    return Q.one('What does <b>' + v.who + '</b> think?', v.thinks, v.wrong.slice(0, lv > 1 ? 2 : 1), { fig: T.show(t), prompt: 'Who wrote it? What do they ask for?', hint: 'Look at what the writer asks for.',
      explain: v.who + ' thinks: ' + v.thinks, meta: { k: 'g4-thinks', t: t.title } });
  }
  function missing(lv, t) {
    t = view(lv, t); var v = t.view;
    return Q.one('Whose point of view is <b>missing</b> from this letter?', v.missing, v.notMissing, { fig: T.show(t), prompt: 'Who else cares about this, and is not heard?',
      hint: 'Who might see it another way? The letter talks about the others.', explain: 'We do not hear from ' + v.missing + '.', meta: { k: 'g4-missing', t: t.title } });
  }
  function viewTap(lv, t) {
    t = view(lv, t); var v = t.view;
    return tapText(t, v.wants, { q: 'Tap the sentence that shows what <b>' + v.who + '</b> wants.', prompt: 'Where does the writer ask for something?',
      hint: 'Look near the start of the letter.', explain: v.who + ' thinks: ' + v.thinks, meta: { k: 'g4-view-tap', t: t.title } });
  }
  function against(lv, t) {
    t = view(lv, t); var v = t.view, others = T.list('view').filter(function (x) { return x !== t; }).map(function (x) { return x.view.against; });
    return Q.one('What might <b>' + v.missing + '</b> say?', v.against, R.some(others, lv > 1 ? 2 : 1), { fig: T.show(t), prompt: 'How might they see it differently?',
      hint: 'Which answer is about this letter, from the other side?', explain: 'Another view: ' + v.against, meta: { k: 'g4-against', t: t.title } });
  }
  function viewTf(lv, t) {
    t = view(lv, t); var v = t.view, right = R.int(0, 1) === 1, said = right ? v.thinks : R.pick(v.wrong);
    return { q: Q.name() + ' says the writer thinks: <b>' + said + '</b>', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['That is what the writer asks for.', 'The writer asks for something else.'], answer: right ? 0 : 1 },
      hint: 'What does the writer ask for?', explain: v.who + ' thinks: ' + v.thinks, meta: { k: 'g4-view-tf', t: t.title, said: said } };
  }

  /* ---------- spot bias (C3.5) ---------- */
  function bias(lv, t) {
    t = view(lv, t); var v = t.view;
    return Q.one('Which sentence states an <b>opinion as if it were a fact</b>?', R.pick(v.bias), R.some(v.fair, lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Can it be checked? Words like best, everyone, every and nobody are clues.', explain: 'That is a one-sided opinion: a sign of <b>bias</b>.', meta: { k: 'g4-bias', t: t.title } });
  }
  function fairReason(lv, t) {
    t = view(lv, t); var v = t.view;
    return Q.one('Which reason is <b>fair</b>: it can be checked?', R.pick(v.fair), v.bias.slice(0, lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Could you check it, or find out if it is true?', explain: 'A fair reason can be checked.', meta: { k: 'g4-fair-reason', t: t.title } });
  }
  function biasPick(lv, t) {
    t = view(lv, t); var v = t.view;
    return Q.all('Pick every sentence that shows <b>bias</b>.', v.bias, v.fair, { fig: T.show(t), hint: 'Look for big claims that cannot be checked.', explain: 'Words like best, everyone, every and nobody show only one side.', meta: { k: 'g4-bias-pick', t: t.title } });
  }
  function biasTf(lv, t) {
    t = view(lv, t); var v = t.view, right = R.int(0, 1) === 1, s = right ? R.pick(v.bias) : R.pick(v.fair);
    return { q: Q.name() + ' says this sentence shows <b>bias</b>:', fig: W.sent(s) + T.show(t), type: 'tf', answer: right,
      why: { options: ['It is a big claim that cannot be checked.', 'It is a reason that can be checked.'], answer: right ? 0 : 1 },
      hint: 'Could you check it?', explain: right ? 'It shows only one side.' : 'It can be checked: a fair reason.', meta: { k: 'g4-bias-tf', t: t.title, s: s } };
  }
  function influence(lv, t) {
    t = view(lv, t);
    return Q.one('How could the bias in this letter affect readers?', 'They might think everyone agrees, without hearing other views.', ['They will check every fact first.', 'They will hear from both sides.'], {
      fig: T.show(t), hint: 'What do big claims like these make you believe?', explain: 'Bias can make one side seem like the only side.', meta: { k: 'g4-influence', t: t.title } });
  }

  var pool = T.pool, leash = T.leash;
  Atlas.register('thinking', {
    full: true,
    lessons: [{
      id: 'between', title: 'Reading between the lines', sub: 'Small clues and the big message.',
      concepts: [
        { slug: 'local', title: 'Use clues to work out what is not said', exp: ['C3.2'], skill: 'infer',
          model: [
            step(W.sent('I carried my volcano into the gym with <mark class="hl">shaking hands</mark>.'), 'How does the narrator feel? The text does not say.'),
            step(W.means('think', 'shaking hands = nervous'), 'A clue, plus what I know.'),
            step(W.tile('nervous'), 'An inference.'),
            step(W.sent('Noah <mark class="hl">slammed his stick</mark> on the ice.'), 'Another story. How does Noah feel?'),
            step(W.means('think', 'slammed his stick = upset'), 'Actions are clues too.')
          ],
          guided: [function () { return local(1); }, function () { return evidence(1); }, function () { return inferTap(1); }],
          check: [function () { return local(2); }, function () { return inferTap(2); }, function () { return evidence(2); }, function () { return inferTf(2); }, function () { return local(3); }],
          coach: '<p>After every answer about feelings or reasons, ask: "How do you know?" The answer should point to words in the text.</p>',
          mistake: '<p>Answering from their own feelings instead of the character' + AP + 's. Point back to the clue.</p>' },
        { slug: 'global', title: 'Find the big message', exp: ['C3.2'], skill: 'message',
          model: [
            step(T.show(T.crow), 'Read the whole fable.'),
            step(W.sent('nothing to eat') + W.sent('Food welcome'), 'Clues from across the text.'),
            step(W.means('star', T.crow.theme[0]), 'It fits the whole fable.'),
            step(T.show(T.otter), 'Another fable.'),
            step(W.chain(['Beaver gets ready.', 'Otter plays.', 'Ice comes.', 'Beaver shares.', 'Otter helps.']), 'How does it all turn out?'),
            step(W.means('star', T.otter.theme[0]), 'One sentence for the whole story.')
          ],
          guided: [function () { return global(1); }, function () { return themeTf(1); }, function () { return themeTap(1); }],
          check: [function () { return global(2); }, function () { return themeTap(2); }, themeMatch, function () { return themeTf(2); }, function () { return global(3); }],
          coach: '<p>Ask: "If this story were a lesson for us, what would it teach?" Then: "Which part of the story shows that?"</p>',
          mistake: '<p>Choosing a detail as the message (squirrels like buttons). A message fits the whole text.</p>' }
      ]
    }, {
      id: 'analyse', title: 'Taking a text apart', sub: 'Two plots, and causes and effects.',
      concepts: [
        { slug: 'plots', title: 'Follow two plots', exp: ['C3.3'], skill: 'plots',
          model: [
            step(T.show(T.storm), 'One story, two people.'),
            step(W.chain(['library', 'calls home', 'bus'], ['Amara', '', '']), 'One plot.'),
            step(W.chain(['practice', 'roads close', 'waits'], ['Jayden', '', '']), 'The other plot. They meet at the end.'),
            step(T.show(T.tournament), 'A longer story.'),
            step(W.chain(['tapes his stick', 'slams his stick', 'makes saves'], ['Noah', '', '']), 'Noah, at the arena.'),
            step(W.chain(['car will not start', 'takes the bus', 'waves the banner'], ['Lola Rosa', '', '']), 'Lola Rosa, across town. The plots meet when she arrives.')
          ],
          guided: [function () { return plotPick(1); }, function () { return whosePlot(1); }, function () { return plotOrder(1); }],
          check: [function () { return plotPick(2); }, function () { return plotOrder(2); }, function () { return whosePlot(2); }, function () { return plotTf(2); }, function () { return plotOrder(3); }],
          coach: '<p>Use two colours of sticky notes, one for each character. Line them up as you read.</p>',
          mistake: '<p>Mixing the two plots into one list. Follow one character at a time.</p>' },
        { slug: 'cause', title: 'Cause and effect', exp: ['C3.3'], skill: 'cause',
          model: [
            step(W.sent('Milkweed tastes bitter.'), 'Why does it matter?'),
            step(W.chain(['Milkweed tastes bitter.', 'Birds learn not to eat monarchs.'], ['Cause', 'Effect']), 'The cause comes first. It makes the effect happen.'),
            step(W.sent('so &middot; because &middot; as a result'), 'Clue words.'),
            step(W.sent('Then they fan their wings over the cells to dry the nectar out.'), 'Information texts have causes too.'),
            step(W.chain(['Bees fan their wings.', 'The nectar dries into honey.'], ['Cause', 'Effect']), 'Ask: what did it make happen?')
          ],
          guided: [function () { return effectOf(1); }, function () { return causeOf(1); }, function () { return cause(1); }],
          check: [function () { return effectOf(2); }, function () { return causeOf(2); }, function () { return causeTf(2); }, function () { return cause(2); }, function () { return effectOf(3); }],
          coach: '<p>Use "because" and "so" in everyday talk: "The road was icy, so we drove slowly."</p>',
          mistake: '<p>Swapping cause and effect. Ask: "Which happened first? Which one made the other happen?"</p>' }
      ]
    }, {
      id: 'views', title: 'Points of view and bias', sub: 'Whose voice, whose is missing, and why it matters.',
      concepts: [
        { slug: 'perspective', title: 'Whose view is it, and whose is missing?', exp: ['C3.5'], skill: 'perspective',
          model: [
            step(T.show(pool), 'Omar wrote this letter.'),
            step(W.sent('<mark class="hl">Please keep Riverside Pool open</mark> all summer.'), 'His view: keep it open.'),
            step(W.means('people', pool.view.missing), 'Not heard.'),
            step(W.means('talk', pool.view.against), 'They might say this.'),
            step(T.show(leash), 'Another letter: Grace wants leashes.'),
            step(W.means('talk', leash.view.against), 'Dog owners are not heard. They might disagree.')
          ],
          guided: [function () { return thinks(1); }, function () { return viewTap(1); }, function () { return missing(1); }],
          check: [function () { return thinks(2); }, function () { return missing(2); }, function () { return against(2); }, function () { return viewTf(2); }, function () { return missing(3); }],
          coach: '<p>Ask: "Who might disagree with this writer? What would they say?" Thinking about missing voices is the point.</p>',
          mistake: '<p>Thinking a letter tells the whole story. It shows one view.</p>' },
        { slug: 'bias', title: 'Spot bias', exp: ['C3.5'], skill: 'bias',
          model: [
            step(W.sent('It is the <mark class="hl">best</mark> pool in the whole city, and <mark class="hl">everyone</mark> loves it.'), 'Can this be checked? No.'),
            step(W.sent('Swimming lessons there teach children to be safe near water.'), 'This can be checked: a fair reason.'),
            step(W.sent('<mark class="hl">Every</mark> dog off its leash is dangerous.'), 'Another letter. Every dog? A big claim.'),
            step(W.sent('Last week, a big dog knocked over a small child near the slide.'), 'Something that happened: fair.'),
            step(W.means('think', 'Everyone agrees?'), 'Bias makes one side seem like the only side.')
          ],
          guided: [function () { return bias(1); }, function () { return fairReason(1); }, function () { return influence(1); }],
          check: [function () { return bias(2); }, function () { return biasPick(2); }, function () { return biasTf(2); }, function () { return fairReason(2); }, function () { return influence(2); }],
          coach: '<p>Look at ads and flyers together. Circle words like best, everyone, never and always. Ask: "Can that be checked?"</p>',
          mistake: '<p>Thinking bias means lying. It means showing only one side.</p>' }
      ]
    }],
    practice: [
      { id: 'infer', name: 'Clues for what is not said', code: 'C3.2', gen: local },
      { id: 'message', name: 'The big message', code: 'C3.2', gen: global },
      { id: 'plots', name: 'Two plots', code: 'C3.3', gen: plotPick },
      { id: 'cause', name: 'Cause and effect', code: 'C3.3', gen: effectOf },
      { id: 'perspective', name: 'Whose view, and whose is missing', code: 'C3.5', gen: thinks },
      { id: 'bias', name: 'Spot bias', code: 'C3.5', gen: bias }
    ],
    tasks: [
      { id: 'culture', title: 'Culture in a text', code: 'C3.4', pic: W.icon('people'), say: 'Find something in a text that shows a culture: food, music, a sport, an object, a value. What does it mean?',
        run: ['Read a story or watch a short film set in a family or community with a culture the child knows, or one they are learning about.', 'Ask: "What did you notice? Food, music, a sport, clothing, a celebration, a value?"', 'Ask: "What does it mean to the people in the story? Is there anything like it in your life?"'],
        rubric: ['Does not notice cultural details yet.', 'Notices a detail with help.', 'Names a cultural detail, finds out what it means, and connects it to their own life.', 'Explains how several cultural details add to the meaning, with respect and curiosity.'] },
      { id: 'everyone', title: 'Everyone belongs', code: 'C3.6', pic: W.icon('people'), say: 'How does this text show diversity, inclusion or accessibility? What is its message?',
        run: ['Read a story or article about a character or person who is included or left out (for example, a wheelchair user, a newcomer, or someone who speaks another language).', 'Ask: "What did the text show about including everyone? What message does it give?"'],
        rubric: ['Shares no thoughts yet.', 'Shares a feeling with help.', 'Explains how the text deals with the topic and names its message.', 'Explains the message and connects it to real ways to include others.'] },
      { id: 'then-now', title: 'Then and now', code: 'C3.7', pic: W.icon('read'), say: 'Read a text by a First Nations, Métis or Inuit creator about the past. How does it connect to today?',
        run: ['With your librarian, choose a book or article by a First Nations, Métis or Inuit creator about a time in history or a cultural experience.', 'Read it together. Ask: "What happened then? How did it shape the creator' + '’' + 's story? How does it connect to people' + '’' + 's lives today?"'],
        rubric: ['Recalls little of the text yet.', 'Retells some of it with help.', 'Explains how history or culture shaped the text.', 'Explains how the text connects the past to lives today, respectfully and with detail.'],
        coach: '<p>Let the creator lead. Choose creators writing about their own nation or community, and use the author notes.</p>' },
      { id: 'thinking-skills', title: 'How I thought about it', code: 'C3.8', pic: W.icon('think'), say: 'Which thinking helped you most: finding clues, following causes, or spotting bias?',
        run: ['After talking about a text, ask: "What helped you understand it best?"', 'Name the skills used: finding clues, following causes, comparing views, spotting bias.'],
        rubric: ['Cannot name a thinking skill yet.', 'Names one with help.', 'Names one and explains how it helped.', 'Explains how two skills helped, with examples from the text.'] }
    ]
  });


  Q.shapes('thinking', {
    infer: [[1, 'evidence', evidence], [1, 'tap-clue', inferTap], [2, 'tf', inferTf], [2, 'clue-match', clueMatch]],
    message: [[1, 'tf', themeTf], [1, 'tap', themeTap], [2, 'match', themeMatch]],
    plots: [[1, 'whose', whosePlot], [1, 'order', plotOrder], [2, 'tf', plotTf]],
    cause: [[1, 'cause-of', causeOf], [1, 'match', cause], [2, 'tf', causeTf]],
    perspective: [[1, 'tap', viewTap], [1, 'missing', missing], [2, 'against', against], [2, 'tf', viewTf]],
    bias: [[1, 'fair', fairReason], [1, 'tf', biasTf], [2, 'pick', biasPick], [2, 'influence', influence]]
  });
})();
