/* Grade 2: reading for meaning.
   Ontario 2023 Language, Grade 2, Strand C (Comprehension):
   C1.1 read and comprehend short texts                C1.2 some characteristics of literary and informational text forms
   C1.6 the narrator's point of view (first or third person), and an alternative point of view to tell the story
   C2.2 purposes for reading, including enjoyment or finding information
   C2.3 predictions using background knowledge, text features and evidence from the text
   C2.4 rereading, visualizing and asking questions to check understanding
   C2.6 the main idea in a simple text, and important details in sequence
   With a grown-up: C1.7 texts by First Nations, Métis and Inuit creators, C2.1 using what you already know,
   C2.5 connections, C2.7 which strategies helped.
   Passages are in ../texts.js. Answer checks: tests/verify/grade2-reading.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var KINDS = ['story', 'journal entry', 'information', 'instructions', 'poem', 'letter'];
  var HELP = ['Read it again, slowly.', 'Picture it in my head.', 'Ask a question about it.'];
  var NOHELP = ['Skip the whole page.', 'Read faster.', 'Close the book.'];
  function body(t) { return t.lines.filter(function (l) { return l.charAt(0) !== '#'; }); }
  function an(k) { return (/^[aeiou]/.test(k) ? 'an ' : 'a ') + k; }

  /* ---------- question makers ---------- */
  function fact(lv) {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts);
    return Q.one(f[0], f[1], f.slice(2, lv > 1 ? 4 : 3), { fig: T.show(t), prompt: 'Find the sentence that tells you.', hint: 'Look back in the text. The answer is there.',
      explain: 'The text says: <b>' + f[1] + '</b>.', meta: { k: 'g2-fact', t: t.title, q: f[0] } });
  }
  function findLine() {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts), lines = body(t), right = lines.filter(function (l) { return l.indexOf(f[4]) >= 0; })[0];
    return Q.one('Which sentence answers this? <b>' + f[0] + '</b>', right, R.some(lines.filter(function (l) { return l !== right; }), 2), { fig: T.show(t),
      hint: 'Which sentence has the answer in it?', explain: W.sent(right), meta: { k: 'g2-find-line', t: t.title, q: f[0] } });
  }
  function mainIdea(lv) {
    var t = R.pick(T.list('main'));
    return Q.one('What is this text <b>mostly</b> about?', t.main[0], t.main.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which answer fits the whole text, not just one part?',
      hint: 'The main idea is about the whole text.', explain: t.main[0], meta: { k: 'g2-main', t: t.title } });
  }
  function sequence(lv) {
    var t = R.pick(T.list('order').filter(function (x) { return x.order.length > 2; })), ev = lv < 2 ? t.order.slice(0, 3) : t.order;
    return { q: 'Put these in the order they happen.', fig: T.show(t), type: 'order', items: ev.map(function (e) { return '“' + e + '”'; }), first: 'First', last: 'Last',
      hint: 'Find each part in the text. Which comes first?', explain: 'They come in this order in the text.', meta: { k: 'g2-order', t: t.title } };
  }
  function predict() {
    var t = R.pick(T.list('predict')), p = t.predict;
    return Q.one('What will <b>most likely</b> happen next?', p.right, p.wrong, { fig: T.show(t, p.upTo), prompt: 'Look for a clue: <b>' + p.clue + '</b>.',
      hint: 'Use a clue from the text, and what you know.', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g2-predict', t: t.title } });
  }
  function predictTitle() {
    var t = R.pick(T.list('main').filter(function (x) { return x.kind !== 'poem'; }));
    return Q.one('Look at the title only: <b>' + t.title + '</b>. What will this text most likely be about?', t.main[0], [R.pick(T.list('main').filter(function (x) { return x !== t; })).main[0]], {
      hint: 'The title is a clue.', explain: 'The title <b>' + t.title + '</b> tells you.', meta: { k: 'g2-predict-title', t: t.title } });
  }
  function fixUp() {
    return Q.all('A sentence does not make sense to you. What could you do? Pick every good idea.', R.some(HELP, 2), R.some(NOHELP, 2), {
      hint: 'Good readers slow down and check.', explain: 'Reread, picture it, or ask a question.', meta: { k: 'g2-fix-up' } });
  }
  function purpose() {
    var t = R.pick(T.list('purpose').filter(function (x) { return x.purpose === 'to enjoy a story' || x.purpose === 'to learn facts'; }));
    return Q.tiles('Why would you read this?', t.purpose === 'to learn facts' ? 'to find information' : 'for enjoyment', [t.purpose === 'to learn facts' ? 'for enjoyment' : 'to find information'], {
      fig: T.show(t), hint: 'Is it a story, or facts?', explain: t.purpose === 'to learn facts' ? 'It gives facts.' : 'It tells a story.', meta: { k: 'g2-purpose', t: t.title } });
  }
  function form(lv) {
    var t = R.pick(T.list('kind'));
    return Q.tiles('What kind of text is this?', t.kind, R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Look at how it is laid out: headings, days, numbers, short lines, or "Dear"?', explain: 'It is <b>' + an(t.kind) + '</b>.', meta: { k: 'g2-form', t: t.title } });
  }
  function realOrMade() {
    var t = R.pick(T.list('kind').filter(function (x) { return x.kind === 'information' || x.kind === 'story'; })), info = t.kind === 'information';
    return Q.tiles('Does this text give facts, or tell a story?', info ? 'It gives facts.' : 'It tells a story.', [info ? 'It tells a story.' : 'It gives facts.'], { fig: T.show(t),
      hint: 'A story has characters and things that happen. Facts teach you something true.', explain: info ? 'Headings and facts: an information text.' : 'Characters and events: a story.', meta: { k: 'g2-real-made', t: t.title } });
  }
  function narrator() {
    var t = R.pick(T.list('pov').filter(function (x) { return x.kind === 'story' || x.kind === 'journal entry'; }));
    return { q: 'Who is telling this?', fig: T.show(t), type: 'tap', tiles: ['Someone in it (first person)', 'Someone outside it (third person)'], answer: t.pov === 'first' ? 0 : 1,
      prompt: 'Look for <b>I</b> and <b>my</b>, or <b>he</b>, <b>she</b> and <b>they</b>.', hint: 'I and my: first person. He, she, they: third person.',
      explain: t.pov === 'first' ? 'The narrator says <b>I</b>: first person.' : 'The narrator says <b>he</b> and <b>his</b>: third person.', meta: { k: 'g2-narrator', t: t.title } };
  }
  function otherView() {
    var t = R.pick(T.list('alt')), a = t.alt;
    return Q.one('What if <b>' + a.who + '</b> told this story? How would it start?', a.right, a.wrong, { fig: T.show(t, 1), prompt: a.who + ' would say <b>I</b> and <b>my</b>.',
      hint: 'When a character tells the story, it is in the first person.', explain: W.sent(a.right), meta: { k: 'g2-other-view', t: t.title } });
  }

  var kite = T.kite;
  Atlas.register('reading', {
    lessons: [{
      id: 'understand', title: 'Understanding what you read', sub: 'Facts, the main idea, and the order things happen.',
      concepts: [
        { slug: 'find', title: 'Find it in the text', exp: ['C1.1'], skill: 'understand',
          model: [
            step(T.show(kite), 'Read the story.'),
            step(W.sent('Where did the kite land?'), 'A question.'),
            step(W.sent('The kite landed in the top of a <mark class="hl">tall pine tree</mark>.'), 'Look back. Find the sentence.')
          ],
          guided: [function () { return fact(1); }, findLine],
          check: [function () { return fact(2); }, findLine],
          coach: '<p>Ask the child to put a finger on the sentence that answers the question before choosing. Looking back is a skill, not cheating.</p>',
          mistake: '<p>Answering from memory or a guess. Always point to the words in the text.</p>' },
        { slug: 'main-idea', title: 'The main idea', exp: ['C2.6'], skill: 'understand',
          model: [
            step(T.show(kite), 'What is it mostly about?'),
            step(W.sent('Pine trees are tall.'), 'Only one part. Too small.'),
            step(W.sent('Kai' + '’' + 's kite gets stuck in a tree, and his grandpa helps get it down.'), 'It fits the whole story.')
          ],
          guided: [function () { return mainIdea(1); }, function () { return mainIdea(1); }],
          check: [function () { return mainIdea(2); }, function () { return mainIdea(2); }],
          coach: '<p>After any book, ask: "Tell me what it was about in one sentence." Then: "Does that fit the whole book?"</p>',
          mistake: '<p>Choosing a detail they liked rather than the big idea.</p>' },
        { slug: 'sequence', title: 'What happened first, next, last', exp: ['C2.6'], skill: 'understand',
          model: [
            step(W.sent('ran across the field'), 'First.'),
            step(W.sent('ran across the field') + W.sent('string slipped out'), 'Next.'),
            step(W.sent('ran across the field') + W.sent('string slipped out') + W.sent('landed in the top'), 'Then. Keep the order of the text.')
          ],
          guided: [function () { return sequence(1); }, function () { return sequence(1); }],
          check: [function () { return sequence(2); }, function () { return sequence(2); }],
          coach: '<p>Retell a story using four fingers: first, next, then, last.</p>',
          mistake: '<p>Putting the most exciting part first. Find each event in the text to check.</p>' }
      ]
    }, {
      id: 'strategies', title: 'Reading strategies', sub: 'Predict, check, and know why you read.',
      concepts: [
        { slug: 'predict', title: 'Predict with a clue', exp: ['C2.3'], skill: 'strategies',
          model: [
            step(T.show(kite, 4), 'Stop and think.'),
            step(W.sent('The kite landed in <mark class="hl">the top of a tall pine tree</mark>.'), 'A clue.'),
            step(W.sent('Someone will help Kai get the kite down.'), 'A prediction. Read on to check.')
          ],
          guided: [predict, predictTitle],
          check: [predict, predictTitle],
          coach: '<p>Stop at an exciting part of a book and ask: "What do you think happens next? What made you think that?"</p>',
          mistake: '<p>Wild guesses with no clue. Ask: "What in the text makes you think so?"</p>' },
        { slug: 'fix-up', title: 'When it does not make sense', exp: ['C2.4'], skill: 'strategies',
          model: [
            step(W.icon('think'), 'Hmm. That did not make sense.'),
            step(W.icon('again'), 'Read it again, slowly.'),
            step(W.icon('read'), 'Picture it. Ask a question about it.')
          ],
          guided: [fixUp, fixUp],
          check: [fixUp, fixUp],
          coach: '<p>Model it aloud: "Wait, that did not make sense. Let me reread." Children copy what they see.</p>',
          mistake: '<p>Reading on when meaning is lost. Praise every time the child stops to fix it.</p>' },
        { slug: 'purpose', title: 'Why am I reading this?', exp: ['C2.2'], skill: 'strategies',
          model: [
            step(T.show(T.loons), 'Headings and facts.'),
            step(W.tile('to find information')),
            step(T.show(T.kite, 2), 'A story? I read it for enjoyment.')
          ],
          guided: [purpose, purpose],
          check: [purpose, purpose],
          coach: '<p>Before reading, ask: "Are we reading this for fun, or to find something out?"</p>',
          mistake: '<p>Reading every text the same way. Facts can be read slowly and checked; a story can be enjoyed.</p>' }
      ]
    }, {
      id: 'kinds', title: 'Kinds of texts', sub: 'Stories, journals, information, instructions, poems, letters.',
      concepts: [
        { slug: 'forms', title: 'What kind of text?', exp: ['C1.2'], skill: 'forms',
          model: [
            step(T.show(T.loons), 'Headings and facts: <b>information</b>.'),
            step(T.show(T.seed), 'Numbered steps: <b>instructions</b>.'),
            step(T.show(T.beans), 'Days, and what I did: a <b>journal entry</b>.'),
            step(T.show(T.bench), '"Dear": a <b>letter</b>.')
          ],
          guided: [realOrMade, function () { return form(1); }],
          check: [realOrMade, function () { return form(2); }],
          coach: '<p>At the library, sort books and papers into stories and information. Then find a poem, a letter and a set of instructions.</p>',
          mistake: '<p>Calling every text a "story". A story has characters and events; information has facts.</p>' },
        { slug: 'narrator', title: 'Who is telling it?', exp: ['C1.6'], skill: 'forms',
          model: [
            step(W.sent('<b>I</b> planted a bean seed.'), '<b>I</b>: the narrator is in it. <b>First person</b>.'),
            step(W.sent('Kai ran with <b>his</b> new kite.'), '<b>his</b>: told from outside. <b>Third person</b>.'),
            step(W.sent('<b>I</b> ran with <b>my</b> new kite.'), 'Kai telling it: first person.')
          ],
          guided: [narrator, otherView],
          check: [narrator, otherView],
          coach: '<p>Retell a favourite story as one of the characters ("I lost my kite..."). Talk about what changes.</p>',
          mistake: '<p>Being fooled by "I" inside speech marks. Look at the words outside the speech marks.</p>' }
      ]
    }],
    practice: [
      { id: 'understand', name: 'Understanding what you read', code: 'C1.1, C2.6', gen: fact },
      { id: 'strategies', name: 'Reading strategies', code: 'C2.2, C2.3, C2.4', gen: predict },
      { id: 'forms', name: 'Kinds of texts and narrators', code: 'C1.2, C1.6', gen: form }
    ],
    tasks: [
      { id: 'before', title: 'Before you read', code: 'C2.1', pic: W.icon('think'), say: 'Look at the cover. What do you already know about this?',
        run: ['Choose a new book together.', 'Look at the cover, title and a few pictures. Ask: "What do you already know about this?"', 'After reading, ask: "Did what you knew help you understand it?"'],
        rubric: ['Does not connect what they know, even with prompts.', 'Shares something they know with prompting.', 'Shares what they know and links it to the book.', 'Uses what they know to ask questions and predict.'] },
      { id: 'connect', title: 'This reminds me of...', code: 'C2.5', pic: W.icon('people'), say: 'What does this remind you of?',
        run: ['After reading, ask: "Does this remind you of something in your life? Another book? Something in the world?"', 'Help the child say how the two things are alike.'],
        rubric: ['No connection yet.', 'Makes a connection with help.', 'Makes a clear connection and explains it.', 'Makes several connections, to self, other books and the world.'] },
      { id: 'indigenous-creators', title: 'A book by a First Nations, Métis or Inuit creator', code: 'C1.7', pic: W.icon('read'), say: 'Read a book by a First Nations, Métis or Inuit author. Talk about it.',
        run: ['Ask your librarian for a picture book written or illustrated by a First Nations, Métis or Inuit creator. Check the author note to learn which community or nation they are from.',
          'Read it together. Ask: "What did you learn about the people, the land, or the community in this book?"', 'Talk about what the family or community in the book does together.'],
        rubric: ['Recalls little of the book yet.', 'Retells some of it with help.', 'Retells it and names something they learned about the community or culture.', 'Explains what they learned and links it to their own life, respectfully.'],
        coach: '<p>Choose books by creators from the community they write about. Many public libraries in Ontario keep a list of books by Indigenous authors.</p>' },
      { id: 'what-helped', title: 'What helped me read?', code: 'C2.7', pic: W.icon('star'), say: 'Which strategy helped you most today?',
        run: ['After reading, show the strategies: reread, picture it, ask a question.', 'Ask: "Which one helped you today? When did you use it?"'],
        rubric: ['Cannot name a strategy yet.', 'Names a strategy with help.', 'Names a strategy and when it helped.', 'Explains how two strategies helped, with examples.'] }
    ]
  });

  Q.shapes('reading', {
    understand: [[1, 'find-line', findLine], [1, 'main-idea', mainIdea], [1, 'order', sequence]],
    strategies: [[1, 'title', predictTitle], [1, 'fix-up', fixUp], [1, 'purpose', purpose]],
    forms: [[1, 'facts-or-story', realOrMade], [1, 'narrator', narrator], [1, 'other-view', otherView]]
  });
})();
