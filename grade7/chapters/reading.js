/* Grade 7: reading for meaning.
   Ontario 2023 Language, Grade 7, Strand C (Comprehension):
   C1.1 read complex texts, using words, grammar, cohesive ties and background knowledge     C2.2 purposes for reading, and choosing suitable texts from diverse creators
   C2.3 predictions, and questions to check them                                              C2.4 strategies to monitor understanding (visualize, read ahead, ask, consult references)
   C2.6 summarize the main idea and supporting details, and draw well-supported conclusions
   With a grown-up: C2.1 prior knowledge, C2.5 connections, C2.7 which strategies helped, and comprehension goals.
   Passages are in ../texts.js. Answer checks: tests/verify/grade7-reading.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  function body(t) { return t.lines.filter(function (l) { return l.charAt(0) !== '#'; }); }

  /* ---------- understanding ---------- */
  function fact(lv) {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts);
    return Q.one(f[0], f[1], f.slice(2, lv > 1 ? 4 : 3), { fig: T.show(t), prompt: 'Find the sentence that tells you.', hint: 'Look back in the text. The answer is there.',
      explain: 'The text: <mark class="hl">' + f[4] + '</mark>', meta: { k: 'g7-fact', t: t.title, q: f[0] } });
  }
  function findLine() {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts), lines = body(t), right = lines.filter(function (l) { return l.indexOf(f[4]) >= 0; })[0];
    return Q.one('Which sentence answers this? <b>' + f[0] + '</b>', right, R.some(lines.filter(function (l) { return l !== right; }), 2), { fig: T.show(t),
      hint: 'Which sentence has the answer in it?', explain: W.sent(right), meta: { k: 'g7-find-line', t: t.title, q: f[0] } });
  }
  /* cohesive ties: a word that points back to something earlier */
  function tie(lv) {
    var t = R.pick(T.list('ties')), c = R.pick(t.ties), i = c[0].indexOf(c[1]);
    return Q.one('In the marked sentence, what does <b>' + c[1] + '</b> refer to?', c[2], [c[3]], { fig: T.show(t).replace(c[0], W.hl(c[0], i, i + c[1].length)),
      prompt: 'Look back. What came just before?', hint: 'Words like they, it, that and as a result point back to something earlier.', explain: '<b>' + c[1] + '</b> = ' + c[2] + '.', meta: { k: 'g7-tie', t: t.title, w: c[1], s: c[0] } });
  }

  function factTf() {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts), right = R.int(0, 1) === 1, said = right ? f[1] : f[2];
    return { q: Q.name() + ' answers: <b>' + f[0] + '</b>', fig: T.show(t) + W.sent(said), type: 'tf', answer: right,
      why: { options: ['The text says so.', 'The text says something different.'], answer: right ? 0 : 1 }, hint: 'Find the sentence that answers it.',
      explain: 'The text: <mark class="hl">' + f[4] + '</mark>', meta: { k: 'g7-fact-tf', t: t.title, q: f[0], said: said } };
  }

  /* ---------- summarizing ---------- */
  function mainIdea(lv) {
    var t = R.pick(T.list('main'));
    return Q.one('Which sentence best sums up the <b>main idea</b>?', t.main[0], t.main.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which answer covers the whole text, not just one part?',
      hint: 'The main idea fits every part of the text.', explain: t.main[0], meta: { k: 'g7-main', t: t.title } });
  }
  function mainTf() {
    var t = R.pick(T.list('main')), right = R.int(0, 1) === 1, said = right ? t.main[0] : R.pick(t.main.slice(1));
    return { q: Q.name() + ' says the main idea is:', fig: T.show(t) + W.sent(said), type: 'tf', answer: right,
      why: { options: ['It covers the whole text.', 'It is only one small detail.'], answer: right ? 0 : 1 }, hint: 'Does it fit every part of the text?', explain: t.main[0], meta: { k: 'g7-main-tf', t: t.title, said: said } };
  }
  function details() {
    var t = R.pick(T.list('details'));
    return Q.all('Pick every detail that <b>supports</b> the main idea.', t.details.right, t.details.wrong, { fig: T.show(t), hint: 'A supporting detail is evidence for the main idea.',
      explain: t.details.right.join(' '), meta: { k: 'g7-details', t: t.title } });
  }
  function conclude(lv) {
    var t = R.pick(T.list('conclusion'));
    return Q.one('Which conclusion is <b>best supported</b> by the text?', t.conclusion[0], t.conclusion.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which one can you back up with words from the text?',
      hint: 'A good conclusion goes a step beyond the text, but the text supports it.', explain: t.conclusion[0], meta: { k: 'g7-conclude', t: t.title } });
  }

  /* ---------- strategies ---------- */
  function predict() {
    var t = R.pick(T.list('predict')), p = t.predict;
    return Q.one('What will <b>most likely</b> happen?', p.right, p.wrong, { fig: T.show(t, p.upTo), prompt: 'Look for a clue: <b>' + p.clue + '</b>.',
      hint: 'Use a clue from the text and what you know.', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g7-predict', t: t.title } });
  }
  function checkPrediction() {
    var t = R.pick(T.list('predict')), p = t.predict, proof = body(t).slice(p.upTo).filter(function (l) { return l.indexOf(p.proof) >= 0; })[0];
    return Q.one('You predicted: <b>' + p.right + '</b> Read on. Which sentence checks it?', proof, R.some(body(t).slice(p.upTo).filter(function (l) { return l !== proof; }), 2), { fig: T.show(t),
      hint: 'Find the sentence where the clue comes back.', explain: W.sent(proof) + '<p>The prediction was right.</p>', meta: { k: 'g7-check-prediction', t: t.title } });
  }
  /* [the problem, the strategy that fits, others] */
  var FIX = [['You meet the word "muskeg" and the sentence does not explain it.', 'Look it up in a dictionary or glossary.'],
    ['A long description of a place is hard to follow.', 'Picture it in your mind, like a movie.'],
    ['A character does something confusing, but the chapter is not over.', 'Read ahead to see if it is explained.'],
    ['You are not sure what the main point of a paragraph is.', 'Ask yourself a question, then reread to answer it.'],
    ['An article mentions an event you know nothing about.', 'Check another source to fill in the background.']];
  function monitor(lv) {
    var f = R.pick(FIX);
    return Q.one('Which strategy fits best?', f[1], R.some(FIX.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), { fig: W.means('think', f[0]),
      hint: 'What is the problem: a word, a picture, a missing reason, the main point, or background?', explain: f[1], meta: { k: 'g7-monitor', s: f[0] } });
  }
  function monitorMatch() {
    var fs = R.some(FIX, 3);
    return { q: 'Match each problem to a strategy.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Each problem needs a different fix.', explain: 'Good readers pick the strategy that fits the problem.', meta: { k: 'g7-monitor-match' } };
  }
  /* [your purpose, a suitable text, less suitable texts] */
  var PURPOSE = [['to learn what it is like to grow up in Iqaluit', 'a memoir by someone who grew up there', ['a travel ad for Nunavut', 'a weather report']],
    ['to fix a flat bike tire', 'a step-by-step guide with diagrams', ['a novel about a bike race', 'a poem about summer']],
    ['to understand both sides of a debate about a new mine', 'articles from writers on each side', ['one company' + '’' + 's ad', 'a comic strip']],
    ['to enjoy a funny story on a long trip', 'a humorous novel', ['a science textbook', 'a bus schedule']],
    ['to learn about Treaty 9 from a First Nations point of view', 'a book or website by First Nations creators from that treaty area', ['a quiz website', 'a toy catalogue']]];
  function purpose(lv) {
    var p = R.pick(PURPOSE);
    return Q.one('You want <b>' + p[0] + '</b>. Which text suits your purpose best?', p[1], p[2].slice(0, lv > 1 ? 2 : 1), { prompt: 'Who made it, and why?',
      hint: 'Match the kind of text, and its creator, to what you need.', explain: p[1] + '.', meta: { k: 'g7-purpose', p: p[0] } });
  }

  var ice = T.iceRoad, tryout = T.tryout;
  Atlas.register('reading', {
    lessons: [{
      id: 'understand', title: 'Understanding complex texts', sub: 'Facts, and the words that tie a text together.',
      concepts: [
        { slug: 'find', title: 'Find the evidence in the text', exp: ['C1.1'], skill: 'understand',
          model: [
            step(T.show(ice), 'Read it once, all the way.'),
            step(W.sent('Why is the season getting shorter?'), 'A question.'),
            step(W.sent('<mark class="hl">Warmer winters mean</mark> the ice forms later and melts sooner.'), 'Look back and point to it.')
          ],
          guided: [function () { return fact(1); }, findLine],
          check: [function () { return fact(2); }, findLine],
          coach: '<p>Ask the child to point to the words that prove the answer before choosing it. Evidence first, answer second.</p>',
          mistake: '<p>Answering from what they already know instead of what the text says.</p>' },
        { slug: 'ties', title: 'Words that point back tie a text together', exp: ['C1.1'], skill: 'understand',
          model: [
            step(W.sent('Each winter, roads are built across frozen lakes.') + W.sent('<mark class="hl">They</mark> link many communities.'), '<b>They</b> = the roads.'),
            step(W.sent('<mark class="hl">As a result</mark>, the roads stay open for only a few weeks.'), 'Points back to a cause.')
          ],
          guided: [function () { return tie(1); }, function () { return tie(1); }],
          check: [function () { return tie(2); }, function () { return tie(2); }],
          coach: '<p>When reading a textbook, stop at each "it", "they" or "this" and ask: "What does it mean here?"</p>',
          mistake: '<p>Linking a pronoun to the nearest noun instead of the one that makes sense.</p>' }
      ]
    }, {
      id: 'summarize', title: 'Summaries and conclusions', sub: 'The main idea, its support, and what follows.',
      concepts: [
        { slug: 'main-idea', title: 'A summary gives the main idea', exp: ['C2.6'], skill: 'summarize',
          model: [
            step(T.show(ice), 'What is the whole text about?'),
            step(W.sent('Trucks drive in northern Ontario.'), 'Too small.'),
            step(W.sent('Ice roads link remote communities, but warmer winters are shortening their season.'), 'Covers every part.')
          ],
          guided: [function () { return mainIdea(1); }, details],
          check: [function () { return mainIdea(2); }, details],
          coach: '<p>Limit the summary to one sentence of 20 words or fewer. Then add two details that prove it.</p>',
          mistake: '<p>Retelling everything in order. A summary is short: the main idea and the key support.</p>' },
        { slug: 'conclude', title: 'Draw a conclusion the text supports', exp: ['C2.6'], skill: 'summarize',
          model: [
            step(W.sent('Without ice roads, goods must come by plane.') + W.sent('The roads are open for less time.'), 'Two facts.'),
            step(W.sent('These communities may pay more for supplies.'), 'A step beyond, backed by both.')
          ],
          guided: [function () { return conclude(1); }, function () { return conclude(1); }],
          check: [function () { return conclude(2); }, function () { return conclude(2); }],
          coach: '<p>Ask "What makes you say that?" after every conclusion. The answer should point to the text.</p>',
          mistake: '<p>A conclusion that goes too far ("Ice roads will disappear forever") or that the text contradicts.</p>' }
      ]
    }, {
      id: 'strategies', title: 'Reading strategies', sub: 'Predict, check, fix confusion, and choose texts.',
      concepts: [
        { slug: 'predict', title: 'Predict, then check', exp: ['C2.3'], skill: 'strategies',
          model: [
            step(T.show(tryout, 3), 'Stop and think.'),
            step(W.sent('<mark class="hl">the lace kept slipping loose</mark>'), 'A clue.'),
            step(W.sent('The loose lace will cause trouble.'), 'Predict. Then read on to check.')
          ],
          guided: [predict, checkPrediction],
          check: [predict, checkPrediction],
          coach: '<p>Write predictions on sticky notes and move them to "right", "changed" or "wrong" as you read.</p>',
          mistake: '<p>Holding on to a prediction after the text proves it wrong. Changing your mind is good reading.</p>' },
        { slug: 'monitor', title: 'Fix confusion with the right strategy', exp: ['C2.4'], skill: 'strategies',
          model: [
            step(W.means('read', 'an unknown word'), 'Look it up.'),
            step(W.means('think', 'hard to picture'), 'Visualize it.'),
            step(W.means('again', 'not explained yet'), 'Read ahead.')
          ],
          guided: [function () { return monitor(1); }, monitorMatch],
          check: [function () { return monitor(2); }, monitorMatch],
          coach: '<p>Model it aloud: "I lost the thread there. I will read ahead a little to see if it gets explained."</p>',
          mistake: '<p>Using one strategy for every problem, such as rereading the same line again and again.</p>' },
        { slug: 'purpose', title: 'Choose a text that fits your purpose', exp: ['C2.2'], skill: 'strategies',
          model: [
            step(W.means('star', 'to fix a bike tire'), 'A step-by-step guide.'),
            step(W.means('people', 'to learn what life is like in Iqaluit'), 'A memoir by someone from there.')
          ],
          guided: [function () { return purpose(1); }, function () { return purpose(1); }],
          check: [function () { return purpose(2); }, function () { return purpose(2); }],
          coach: '<p>Before research, ask: "Who would know this best from the inside?" Look for creators from the community you are reading about.</p>',
          mistake: '<p>Choosing the first search result. Ask what the text is for and who made it.</p>' }
      ]
    }],
    practice: [
      { id: 'understand', name: 'Understanding complex texts', code: 'C1.1', gen: fact },
      { id: 'summarize', name: 'Summaries and conclusions', code: 'C2.6', gen: mainIdea },
      { id: 'strategies', name: 'Reading strategies', code: 'C2.2, C2.3, C2.4', gen: function (lv) { return monitor(lv); } }
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
    understand: [[1, 'find-line', findLine], [1, 'ties', tie], [2, 'true-false', factTf]],
    summarize: [[1, 'details', details], [1, 'conclude', conclude], [2, 'true-false', mainTf]],
    strategies: [[1, 'predict', predict], [1, 'check', checkPrediction], [1, 'purpose', purpose], [2, 'match', monitorMatch]]
  });
})();
