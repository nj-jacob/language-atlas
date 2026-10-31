/* Grade 6: reading for meaning.
   Ontario 2023 Language, Grade 6, Strand C (Comprehension):
   C1.1 read and comprehend various texts                      C1.2 text forms and genres, and how their characteristics help communicate meaning
   C1.6 the narrator's point of view (first, second or third person), with evidence, and how another point of view would change the story
   C2.2 purposes for reading                                   C2.3 predictions, checking them, and adjusting understanding
   C2.4 strategies to monitor and confirm understanding         C2.6 summarize the main idea and supporting details, and draw conclusions
   With a grown-up: C1.7 texts by First Nations, Metis and Inuit creators, C2.1 prior knowledge, C2.5 connections, C2.7 comparing strategies.
   Passages are in ../texts.js. Answer checks: tests/verify/grade6-reading.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var KINDS = ['story', 'report', 'opinion', 'poem', 'script', 'instructions'];
  var PURPOSES = ['to enjoy a story', 'to learn facts', 'to learn how to do something', 'to hear an opinion', 'to enjoy a poem', 'to enjoy a play'];
  /* [what happens while reading, the strategy that fits] */
  var MONITOR = [['You meet a word you do not know.', 'Look it up in a glossary or dictionary.'], ['You cannot picture what is happening.', 'Make a picture of it in your mind.'],
    ['A paragraph is confusing.', 'Read ahead to see if it becomes clear.'], ['You are not sure a fact is right.', 'Check it in another source.']];
  var POV = { first: 'first person (I, me, we)', second: 'second person (you)', third: 'third person (he, she, they)' };
  function body(t) { return t.lines.filter(function (l) { return l.charAt(0) !== '#'; }); }
  function stories() { return T.list('pov').filter(function (x) { return x.kind === 'story'; }); }

  /* ---------- question makers ---------- */
  function fact(lv) {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts);
    return Q.one(f[0], f[1], f.slice(2, lv > 1 ? 4 : 3), { fig: T.show(t), prompt: 'Find the sentence that tells you.', hint: 'Look back in the text.',
      explain: 'The text says: <mark class="hl">' + f[4] + '</mark>.', meta: { k: 'g6-fact', t: t.title, q: f[0] } });
  }
  function evidence() {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts), lines = body(t), right = lines.filter(function (l) { return l.indexOf(f[4]) >= 0; })[0];
    return Q.one('Which sentence is the <b>evidence</b> for this answer? <b>' + f[0] + '</b> ' + f[1] + '.', right, R.some(lines.filter(function (l) { return l !== right; }), 2), {
      fig: T.show(t), hint: 'Which sentence has the answer in it?', explain: W.sent(right), meta: { k: 'g6-evidence', t: t.title, q: f[0] } });
  }
  function summary(lv) {
    var t = R.pick(T.list('main'));
    return Q.one('Which is the best <b>summary</b>?', t.main[0], t.main.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which one covers the whole text, not one detail?',
      hint: 'A summary gives the main idea in a few words.', explain: t.main[0], meta: { k: 'g6-summary', t: t.title } });
  }
  function sequence() {
    var t = R.pick(T.list('order'));
    return { q: 'Put these in the order they happen.', fig: T.show(t), type: 'order', items: t.order.map(function (e) { return '“' + e + '”'; }), first: 'First', last: 'Last',
      hint: 'Find each part in the text.', explain: 'They come in this order in the text.', meta: { k: 'g6-order', t: t.title } };
  }
  function conclude() {
    var t = R.pick(T.list('infer')), f = R.pick(t.infer);
    return Q.one(f[0], f[1], [f[2]], { fig: T.show(t), prompt: 'Which words in the text give you a clue?',
      hint: 'The text does not say it. Use the clue words.', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g6-conclude', t: t.title, q: f[0] } });
  }
  function predict() {
    var t = R.pick(T.list('predict')), p = t.predict;
    return Q.one('What will <b>most likely</b> happen next?', p.right, p.wrong, { fig: T.show(t, p.upTo), prompt: 'Look for a clue: <b>' + p.clue + '</b>.',
      hint: 'Use a clue from the text and what you know.', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g6-predict', t: t.title } });
  }
  function predictClue() {
    var t = R.pick(T.list('predict')), p = t.predict, other = R.pick(body(t).slice(0, p.upTo).filter(function (l) { return l.indexOf(p.clue) < 0; }));
    return Q.one('You predict: <b>' + p.right + '</b> Which words helped?', p.clue, [other.split(' ').slice(0, 5).join(' ')], { fig: T.show(t, p.upTo),
      hint: 'Which words point to what happens next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g6-predict-clue', t: t.title } });
  }
  function adjust() {
    return Q.one('You predicted Tala would turn back. Then you read: <b>she kept walking, one step at a time</b>. What should you do?', 'Change my prediction to fit the new clue.',
      ['Keep my first prediction no matter what.', 'Stop reading the story.'], { hint: 'Good readers check their predictions as they read.', explain: 'Check, then adjust your prediction.', meta: { k: 'g6-adjust' } });
  }
  function monitor(lv) {
    var m = R.pick(MONITOR);
    return Q.one('What could you do?', m[1], R.some(MONITOR.filter(function (x) { return x !== m; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: W.means('think', m[0]), hint: 'Which strategy fixes this problem?', explain: m[1], meta: { k: 'g6-monitor', s: m[0] } });
  }
  function purpose() {
    var t = R.pick(T.list('purpose'));
    return Q.one('Why would you read this?', t.purpose, R.some(PURPOSES.filter(function (p) { return p !== t.purpose; }), 2), { fig: T.show(t),
      hint: 'Is it a story, facts, steps, an opinion, a poem or a play?', explain: 'You would read it <b>' + t.purpose + '</b>.', meta: { k: 'g6-purpose', t: t.title } });
  }
  function form(lv) {
    var t = R.pick(T.list('kind'));
    return Q.tiles('What form of text is this?', t.kind, R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Look at how it is laid out: headings, numbers, short lines, speaker names, or one side of an argument?', explain: 'It is a <b>' + t.kind + '</b>.', meta: { k: 'g6-form', t: t.title } });
  }
  function formClue() {
    var t = R.pick([T.ramp, T.dock, T.leaf, T.snow]), clue = { ramp: 'Headings that split the facts', dock: 'Speaker names and stage directions', leaf: 'A list of things you need and numbered steps', snow: 'Short lines with a rhythm' };
    var key = Object.keys(clue).filter(function (k) { return T[k] === t; })[0];
    return Q.one('What tells you this is a <b>' + t.kind + '</b>?', clue[key], Object.keys(clue).filter(function (k) { return k !== key; }).map(function (k) { return clue[k]; }).slice(0, 2), {
      fig: T.show(t), hint: 'Look at how the text is set out.', explain: clue[key], meta: { k: 'g6-form-clue', t: t.title } });
  }
  function narrator() {
    var t = R.pick(stories());
    return { q: 'What point of view is this story told from?', fig: T.show(t), type: 'tap', tiles: [POV.first, POV.second, POV.third], answer: ['first', 'second', 'third'].indexOf(t.pov),
      prompt: 'Look at the words outside the quotation marks.', hint: 'I: first. You: second. He, she, they: third.', explain: 'It is told in the <b>' + POV[t.pov] + '</b>.', meta: { k: 'g6-narrator', t: t.title } };
  }
  function narratorWord() {
    var t = R.pick(stories()), w = { first: 'I', second: 'You', third: 'She' }[t.pov];
    return Q.tiles('Which word is the evidence that this is told in the <b>' + t.pov + ' person</b>?', w, ['I', 'You', 'She'].filter(function (x) { return x !== w; }), { fig: T.show(t),
      hint: 'First: I. Second: you. Third: she or he.', explain: '<b>' + w + '</b> shows the ' + t.pov + ' person.', meta: { k: 'g6-narrator-word', t: t.title } });
  }
  function altPov() {
    var a = T.tryouts.altPov;
    return Q.one('If <b>Coach Ahmed</b> told this story, what would change most?', a[0], a.slice(1), { fig: T.show(T.tryouts),
      prompt: 'What does only the narrator know?', hint: 'Who knows what the narrator feels inside?', explain: a[0], meta: { k: 'g6-alt-pov' } });
  }

  var tryouts = T.tryouts, portage = T.portage;
  Atlas.register('reading', {
    lessons: [{
      id: 'understand', title: 'Understanding what you read', sub: 'Evidence, summaries and conclusions.',
      concepts: [
        { slug: 'evidence', title: 'Back it up with evidence', exp: ['C1.1'], skill: 'understand',
          model: [
            step(T.show(portage), 'Read the story.'),
            step(W.sent('Who carried the canoe?'), 'A question.'),
            step(W.sent('Uncle Ray <mark class="hl">lifted the canoe</mark> onto his shoulders.'), 'Find the sentence that proves it.')
          ],
          guided: [function () { return fact(1); }, evidence],
          check: [function () { return fact(2); }, evidence],
          coach: '<p>Ask "How do you know?" after every answer, and wait for the child to point to the words.</p>',
          mistake: '<p>Answering from memory of the story. Always go back to the text.</p>' },
        { slug: 'summary', title: 'Sum it up', exp: ['C2.6'], skill: 'understand',
          model: [
            step(W.sent('Uncle Ray is very strong.'), 'One detail. Too small.'),
            step(W.sent('Mosquitoes are a problem on canoe trips.'), 'Not what the story is about.'),
            step(W.sent('Tala keeps going on a hard portage and is glad when she reaches the lake.'), 'Who, what and how it ends.')
          ],
          guided: [function () { return summary(1); }, sequence],
          check: [function () { return summary(2); }, sequence],
          coach: '<p>Use "Somebody, wanted, but, so, then" to sum up a story in one or two sentences.</p>',
          mistake: '<p>Retelling every event. A summary is short.</p>' },
        { slug: 'conclude', title: 'Draw a conclusion', exp: ['C2.6'], skill: 'understand',
          model: [
            step(W.sent('...the <mark class="hl">straps dug into her shoulders</mark>...'), 'A clue.'),
            step(W.tile('Tala is tired and sore.'), 'The text does not say it. The clue shows it.')
          ],
          guided: [function () { return conclude(); }, function () { return conclude(); }],
          check: [function () { return conclude(); }, function () { return conclude(); }],
          coach: '<p>Clue + what I know = conclusion. Say it out loud as a sum.</p>',
          mistake: '<p>A conclusion with no clue behind it. Ask: "What in the text made you think that?"</p>' }
      ]
    }, {
      id: 'strategies', title: 'Reading strategies', sub: 'Purpose, prediction and checking your understanding.',
      concepts: [
        { slug: 'predict', title: 'Predict, then check', exp: ['C2.3'], skill: 'strategies',
          model: [
            step(T.show(tryouts, 5), 'Stop and think.'),
            step(W.sent('I missed my first shot, but <mark class="hl">I made the next three</mark>.'), 'A clue.'),
            step(W.sent('The narrator will make the team.'), 'Read on to check. Change it if the text says otherwise.')
          ],
          guided: [predict, predictClue],
          check: [predict, adjust],
          coach: '<p>Write a prediction on a sticky note. Read on, then mark it: right, partly right, or changed.</p>',
          mistake: '<p>Holding on to a prediction after the text proves it wrong.</p>' },
        { slug: 'monitor', title: 'Notice when it stops making sense', exp: ['C2.4'], skill: 'strategies',
          model: [
            step(W.means('think', 'A word I do not know'), 'Look it up.'),
            step(W.means('think', 'I cannot picture it'), 'Make a picture in my mind.'),
            step(W.means('think', 'A confusing paragraph'), 'Read ahead.')
          ],
          guided: [function () { return monitor(1); }, function () { return monitor(1); }],
          check: [function () { return monitor(2); }, function () { return monitor(2); }],
          coach: '<p>Model it: "Hmm, I lost track there. I’ll read ahead a little and see."</p>',
          mistake: '<p>Reading to the end without understanding. Stopping to fix it is what strong readers do.</p>' },
        { slug: 'purpose', title: 'Know why you are reading', exp: ['C2.2'], skill: 'strategies',
          model: [
            step(T.show(T.leaf), 'Numbered steps.'),
            step(W.sent('to learn how to do something'), 'So I read it slowly and in order.')
          ],
          guided: [purpose, purpose],
          check: [purpose, purpose],
          coach: '<p>When choosing a library book, ask: "What do you want from it: facts, fun, or how to do something?"</p>',
          mistake: '<p>Reading every text the same way.</p>' }
      ]
    }, {
      id: 'forms', title: 'Forms and points of view', sub: 'How a text is built, and who tells it.',
      concepts: [
        { slug: 'forms', title: 'Forms and their features', exp: ['C1.2'], skill: 'forms',
          model: [
            step(T.show(T.ramp), 'Headings and facts: a <b>report</b>.'),
            step(T.show(T.dock), 'Speaker names: a <b>script</b>.'),
            step(T.show(T.trails), 'One side, trying to convince: an <b>opinion</b>.')
          ],
          guided: [function () { return form(1); }, formClue],
          check: [function () { return form(2); }, formClue],
          coach: '<p>Collect real examples at home: a recipe, a news report, a flyer, a poem. Ask what gives each one away.</p>',
          mistake: '<p>Calling every text a story. Ask: does it have characters and events, or facts?</p>' },
        { slug: 'pov', title: 'First, second or third person', exp: ['C1.6'], skill: 'forms',
          model: [
            step(W.sent('<b>I</b> barely slept a wink.'), '<b>First</b> person: the narrator is in the story.'),
            step(W.sent('<b>You</b> zip the tent shut.'), '<b>Second</b> person: the reader is in the story.'),
            step(W.sent('<b>She</b> kept walking.'), '<b>Third</b> person: told from outside.')
          ],
          guided: [narrator, narratorWord],
          check: [narrator, narratorWord],
          coach: '<p>Retell a familiar story in a different person. "I lost my mitten" becomes "She lost her mitten".</p>',
          mistake: '<p>Being fooled by I inside quotation marks. Check the words outside them.</p>' },
        { slug: 'other-view', title: 'Another narrator changes the story', exp: ['C1.6'], skill: 'forms',
          model: [
            step(W.sent('<b>I</b> almost got cold feet.'), 'Only the narrator knows this feeling.'),
            step(W.means('people', 'Told by Coach Ahmed?'), 'We would see a player at the door, but not the fear inside.')
          ],
          guided: [altPov, narrator],
          check: [altPov, narratorWord],
          coach: '<p>Ask: "How would the chipmunk tell ‘Your First Night in the Tent’?" Write two lines of it together.</p>',
          mistake: '<p>Thinking the events change. Mostly what we know, and how we feel about it, changes.</p>' }
      ]
    }],
    practice: [
      { id: 'understand', name: 'Evidence, summaries and conclusions', code: 'C1.1, C2.6', gen: fact },
      { id: 'strategies', name: 'Reading strategies', code: 'C2.2, C2.3, C2.4', gen: predict },
      { id: 'forms', name: 'Forms and point of view', code: 'C1.2, C1.6', gen: form }
    ],
    tasks: [
      { id: 'before', title: 'What I already know', code: 'C2.1', pic: W.icon('think'), say: 'Before reading, list what you already know about the topic.', write: true,
        run: ['Choose an information book or article linked to science or social studies.', 'Before reading, the child lists what they know, from life and from other subjects.', 'After reading, ask: "What did you already know that helped? What was new?"'],
        rubric: ['Lists nothing yet.', 'Lists a little with help.', 'Lists what they know and links it to the text.', 'Uses knowledge from several sources to understand and question the text.'] },
      { id: 'connect', title: 'Connections', code: 'C2.5', pic: W.icon('people'), say: 'How does this text connect to your life, another text, and the world?', write: true,
        run: ['After reading, ask for three connections: to the child’s own life, to another book or film, and to something happening in the world.', 'Ask them to explain how each one helps them understand the text.'],
        rubric: ['No connection yet.', 'One connection with help.', 'Three clear connections.', 'Three connections, each explained and used to deepen understanding.'] },
      { id: 'indigenous-creators', title: 'Texts by First Nations, Métis and Inuit creators', code: 'C1.7', pic: W.icon('read'), say: 'Read, listen to or watch a work by a First Nations, Métis or Inuit creator.',
        run: ['With your librarian, choose a novel, graphic novel, podcast or film by a First Nations, Métis or Inuit creator. Check the creator’s nation or community.',
          'After reading, talk about the history, relationships, community and lived experience it shows.', 'Ask: "What did the creator want readers to understand?"'],
        rubric: ['Recalls little of it yet.', 'Retells it with help.', 'Explains what it shows about the community and its history.', 'Explains the creator’s message and connects it to life today, respectfully.'],
        coach: '<p>Let the creator’s own voice lead. Each nation and community is distinct: avoid treating Indigenous cultures as one.</p>' },
      { id: 'what-helped', title: 'Which strategies helped?', code: 'C2.7', pic: W.icon('star'), say: 'Which reading strategies helped you most? Set a goal for next time.', write: true,
        run: ['After reading two different texts (one story, one information text), ask which strategies helped with each: predicting, picturing, summarizing, connecting.', 'Compare: did the same strategy help both times? Set one reading goal.'],
        rubric: ['Cannot name a strategy yet.', 'Names a strategy with help.', 'Compares two strategies and sets a goal.', 'Explains clearly why each strategy worked, and sets a specific goal.'] }
    ]
  });

  Q.shapes('reading', {
    understand: [[1, 'evidence', evidence], [1, 'summary', summary], [1, 'order', sequence], [2, 'conclude', conclude]],
    strategies: [[1, 'clue', predictClue], [1, 'monitor', monitor], [1, 'purpose', purpose], [2, 'adjust', adjust]],
    forms: [[1, 'narrator', narrator], [1, 'narrator-word', narratorWord], [1, 'form-clue', formClue], [2, 'other-view', altPov]]
  });
})();
