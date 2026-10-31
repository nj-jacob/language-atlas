/* Grade 4: thinking about texts.
   Ontario 2023 Language, Grade 4, Strand C (Critical Literacy):
   C3.2 local and global inferences, using explicit and implicit evidence
   C3.3 main and supporting ideas, sequencing the events of multiple plots, and cause and effect
   C3.5 explicit and implicit perspectives, how they are conveyed, evidence of bias, and how bias could influence an audience
   With a grown-up: C3.4 cultural elements in texts, C3.6 topics such as diversity, inclusion and accessibility, C3.7 texts by First
   Nations, Metis and Inuit creators and their contexts, C3.8 the critical thinking skills used.
   Passages are in ../texts.js. Answer checks: tests/verify/grade4-thinking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;

  /* ---------- inferences ---------- */
  function local() {
    var t = R.pick(T.list('infer')), f = R.pick(t.infer);
    return Q.one(f[0], f[1], [f[2]], { fig: T.show(t), prompt: 'The text does not say it. Look for a clue: <b>' + f[3] + '</b>.',
      hint: 'What do the words and actions tell you?', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g4-local', t: t.title, q: f[0] } });
  }
  function evidence() {
    var t = R.pick(T.list('infer').filter(function (x) { return x.infer.length > 1; })), f = R.pick(t.infer), other = t.infer.filter(function (x) { return x !== f; })[0];
    return Q.one('<b>' + f[0] + '</b> The answer is <b>' + f[1] + '</b>. Which words show it?', f[3], [other[3]], { fig: T.show(t),
      hint: 'Which words fit that answer?', explain: '<mark class="hl">' + f[3] + '</mark> shows it.', meta: { k: 'g4-evidence', t: t.title, q: f[0] } });
  }
  function clueMatch() {
    var t = R.pick(T.list('infer').filter(function (x) { return x.infer.length > 1; }));
    return { q: 'Match each question to the clue that answers it.', fig: T.show(t), type: 'match', pairs: t.infer.map(function (f) { return [f[0], f[3]]; }),
      hint: 'Find each clue in the text.', explain: 'Each clue answers a different question.', meta: { k: 'g4-clue-match-text', t: t.title } };
  }
  function global(lv) {
    var t = R.pick(T.list('theme'));
    return Q.one('What is the <b>big message</b> of the whole text?', t.theme[0], t.theme.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Think about the whole text, not one sentence.',
      hint: 'What does the writer want you to learn from it all?', explain: t.theme[0], meta: { k: 'g4-global', t: t.title } });
  }

  /* ---------- analysing ---------- */
  function plotPick() {
    var t = T.storm, who = R.pick(['Amara', 'Jayden']), other = who === 'Amara' ? 'Jayden' : 'Amara';
    return Q.all('This story has two plots. Pick every event in <b>' + who + '</b>' + '’' + 's plot.', R.some(t.plots[who], 2), R.some(t.plots[other], 2), { fig: T.show(t),
      hint: 'Who is in each event?', explain: 'The story switches between Amara and Jayden.', meta: { k: 'g4-plot-pick', who: who } });
  }
  function plotOrder() {
    var who = R.pick(['Amara', 'Jayden']);
    return { q: 'Put the events of <b>' + who + '</b>' + '’' + 's plot in order.', fig: T.show(T.storm), type: 'order', items: T.storm.plots[who].map(function (e) { return '“' + e + '”'; }), first: 'First', last: 'Last',
      hint: 'Follow only ' + who + '. Find each event in the text.', explain: 'Follow one character at a time.', meta: { k: 'g4-plot-order', who: who } };
  }
  function cause() {
    var t = R.pick(T.list('cause'));
    return { q: 'Match each cause to its effect.', fig: T.show(t), type: 'match', pairs: t.cause.map(function (c) { return [c[0], c[1]]; }), hint: 'Ask: what happened because of this?', explain: 'A cause makes something happen: the effect.', meta: { k: 'g4-cause', t: t.title } };
  }
  function effectOf() {
    var t = R.pick(T.list('cause')), c = R.pick(t.cause), others = T.list('cause').reduce(function (a, x) { return a.concat(x.cause); }, []).filter(function (x) { return x !== c; });
    return Q.one('What happened <b>because</b>: ' + c[0], c[1], R.some(others, 2).map(function (x) { return x[1]; }), { fig: T.show(t), hint: 'Find the cause in the text. What comes after "so"?',
      explain: c[0] + ' &rarr; ' + c[1], meta: { k: 'g4-effect', c: c[0] } });
  }
  function mainOrDetail() {
    var t = R.pick(T.list('details')), main = R.int(0, 1) === 1, s = main ? t.main[0] : R.pick(t.details.yes);
    return { q: 'Is this the <b>main idea</b> or a <b>supporting detail</b>?', fig: T.show(t) + W.sent(s), type: 'tap', tiles: ['main idea', 'supporting detail'], answer: main ? 0 : 1,
      hint: 'The main idea covers the whole text. A detail tells about one part.', explain: main ? 'It covers the whole text.' : 'It tells about one part.', meta: { k: 'g4-main-detail', t: t.title, s: s } };
  }

  /* ---------- perspective and bias ---------- */
  var pool = T.pool, V = pool.view;
  function thinks() {
    return Q.one('What does <b>' + V.who + '</b> think?', V.thinks, V.wrong, { fig: T.show(pool), prompt: 'Who wrote it? What do they want?', hint: 'Look at what he asks for.', explain: V.who + ' thinks: ' + V.thinks, meta: { k: 'g4-thinks' } });
  }
  function missing() {
    return Q.one('Whose point of view is <b>missing</b> from this letter?', V.missing, V.notMissing, { fig: T.show(pool), prompt: 'Who else cares about the pool, and is not heard?',
      hint: 'Who has to decide, and might see it another way?', explain: 'We do not hear from ' + V.missing + '.', meta: { k: 'g4-missing' } });
  }
  function bias(lv) {
    return Q.one('Which sentence states an <b>opinion as if it were a fact</b>?', R.pick(V.bias), R.some(V.fair, lv > 1 ? 2 : 1), { fig: T.show(pool),
      hint: 'Can it be checked? Words like best, everyone and terrible are clues.', explain: 'That is a one-sided opinion: a sign of <b>bias</b>.', meta: { k: 'g4-bias' } });
  }
  function biasPick() {
    return Q.all('Pick every sentence that shows <b>bias</b>.', V.bias, V.fair, { fig: T.show(pool), hint: 'Look for big claims that cannot be checked.', explain: 'Best, everyone and terrible show only one side.', meta: { k: 'g4-bias-pick' } });
  }
  function influence() {
    return Q.one('How could this letter' + '’' + 's bias affect readers?', 'They might think everyone agrees, without hearing other views.', ['They will learn how to swim.', 'They will know the pool' + '’' + 's opening hours.'], {
      fig: T.show(pool, 3), hint: 'What does "everyone loves it" make you believe?', explain: 'Bias can make one side seem like the only side.', meta: { k: 'g4-influence' } });
  }

  Atlas.register('thinking', {
    lessons: [{
      id: 'between', title: 'Reading between the lines', sub: 'Small clues and the big message.',
      concepts: [
        { slug: 'local', title: 'Use clues to work out what is not said', exp: ['C3.2'], skill: 'infer',
          model: [
            step(W.sent('I carried my volcano into the gym with <b>shaking hands</b>.'), 'The text does not say how the narrator feels.'),
            step(W.sent('shaking hands'), 'A clue.'),
            step(W.sent('The narrator feels <b>nervous</b>.'), 'Clue + what I know.')
          ],
          guided: [function () { return local(1); }, evidence],
          check: [function () { return local(2); }, evidence],
          coach: '<p>After every answer about feelings or reasons, ask: "How do you know?" The answer should point to words in the text.</p>',
          mistake: '<p>Answering from their own feelings instead of the character' + '’' + 's. Point back to the clue.</p>' },
        { slug: 'global', title: 'Find the big message', exp: ['C3.2'], skill: 'infer',
          model: [
            step(T.show(T.crow), 'Read the whole fable.'),
            step(W.sent('nothing to eat') + W.sent('Food welcome'), 'Clues from across the text.'),
            step(W.sent('What you need matters more than what looks nice.'), 'It fits the whole fable.')
          ],
          key: '<p>A small clue answers a small question. Clues from the whole text show the big message.</p>',
          guided: [function () { return global(1); }, function () { return global(1); }],
          check: [function () { return global(2); }, function () { return global(2); }],
          coach: '<p>Ask: "If this story were a lesson for us, what would it teach?"</p>',
          mistake: '<p>Choosing a detail as the message (squirrels like buttons). A message fits the whole text.</p>' }
      ]
    }, {
      id: 'analyse', title: 'Taking a text apart', sub: 'Two plots, causes and effects, main ideas and details.',
      concepts: [
        { slug: 'plots', title: 'Follow two plots', exp: ['C3.3'], skill: 'analyze',
          model: [
            step(T.show(T.storm), 'One story, two people.'),
            step(W.sent('Amara: library &rarr; calls home &rarr; bus'), 'One plot.'),
            step(W.sent('Jayden: practice &rarr; roads close &rarr; waits'), 'The other plot. They meet at the end.')
          ],
          guided: [plotPick, plotOrder],
          check: [plotPick, plotOrder],
          coach: '<p>Use two colours of sticky notes, one for each character. Line them up as you read.</p>',
          mistake: '<p>Mixing the two plots into one list. Follow one character at a time.</p>' },
        { slug: 'cause', title: 'Cause and effect', exp: ['C3.3'], skill: 'analyze',
          model: [
            step(W.sent('Milkweed tastes bitter.'), 'A cause.'),
            step(W.sent('Milkweed tastes bitter.') + ' &rarr; ' + W.sent('Birds learn not to eat monarchs.'), 'Its effect.'),
            step(W.sent('so &middot; because &middot; as a result'), 'Clue words.')
          ],
          guided: [cause, effectOf],
          check: [cause, mainOrDetail],
          coach: '<p>Use "because" and "so" in everyday talk: "The road was icy, so we drove slowly."</p>',
          mistake: '<p>Swapping cause and effect. Ask: "Which happened first?"</p>' }
      ]
    }, {
      id: 'views', title: 'Points of view and bias', sub: 'Whose voice, whose is missing, and why it matters.',
      concepts: [
        { slug: 'perspective', title: 'Whose view is it, and whose is missing?', exp: ['C3.5'], skill: 'perspective',
          model: [
            step(T.show(pool), 'Omar wrote this letter.'),
            step(W.sent('Please keep Riverside Pool open.'), 'His view: keep it open.'),
            step(W.icon('people'), 'Not heard: the people who decide how the city spends its money.')
          ],
          guided: [thinks, missing],
          check: [thinks, missing],
          coach: '<p>Ask: "Who might disagree with Omar? What would they say?" Thinking about missing voices is the point.</p>',
          mistake: '<p>Thinking a letter tells the whole story. It shows one view.</p>' },
        { slug: 'bias', title: 'Spot bias', exp: ['C3.5'], skill: 'perspective',
          model: [
            step(W.sent('It is the <b>best</b> pool in the whole city, and <b>everyone</b> loves it.'), 'Can this be checked? No.'),
            step(W.sent('Swimming lessons there teach children to be safe near water.'), 'A fair reason.'),
            step(W.icon('think'), 'Bias makes one side seem like the only side.')
          ],
          guided: [function () { return bias(1); }, influence],
          check: [function () { return bias(2); }, biasPick],
          coach: '<p>Look at ads and flyers together. Circle words like best, everyone, never and always. Ask: "Can that be checked?"</p>',
          mistake: '<p>Thinking bias means lying. It means showing only one side.</p>' }
      ]
    }],
    practice: [
      { id: 'infer', name: 'Inferences', code: 'C3.2', gen: local },
      { id: 'analyze', name: 'Plots, causes and main ideas', code: 'C3.3', gen: function () { return cause(); } },
      { id: 'perspective', name: 'Points of view and bias', code: 'C3.5', gen: bias }
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
    infer: [[1, 'evidence', evidence], [1, 'global', global], [2, 'clue-match', clueMatch]],
    analyze: [[1, 'effect', effectOf], [1, 'main-detail', mainOrDetail], [1, 'plot-pick', plotPick], [2, 'plot-order', plotOrder]],
    perspective: [[1, 'thinks', thinks], [1, 'missing', missing], [1, 'influence', influence], [2, 'pick', biasPick]]
  });
})();
