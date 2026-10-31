/* Grade 3: reading for meaning.
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
  var HELP = ['Read it again, slowly.', 'Picture it in my head.', 'Ask a question about it.', 'Look at the pictures and headings.'];
  var NOHELP = ['Skip the rest of the page.', 'Stop reading for good.', 'Read faster.', 'Keep going without checking.'];
  var PURPOSES = ['to enjoy a story', 'to learn facts', 'to learn how to do something', 'to hear an opinion', 'to enjoy a poem'];
  function body(t) { return t.lines.filter(function (l) { return l.charAt(0) !== '#'; }); }

  /* ---------- question makers ---------- */
  function fact(lv) {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts);
    return Q.one(f[0], f[1], f.slice(2, lv > 1 ? 4 : 3), { fig: T.show(t), prompt: 'Find the sentence that tells you.', hint: 'Look back in the text. The answer is there.',
      explain: 'The text says: <b>' + f[1] + '</b>.', meta: { k: 'g3-fact', t: t.title, q: f[0] } });
  }
  function findLine() {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts), lines = body(t), right = lines.filter(function (l) { return l.indexOf(f[4]) >= 0; })[0];
    return Q.one('Which sentence answers this? <b>' + f[0] + '</b>', right, R.some(lines.filter(function (l) { return l !== right; }), 2), { fig: T.show(t),
      hint: 'Which sentence has the answer in it?', explain: W.sent(right), meta: { k: 'g3-find-line', t: t.title, q: f[0] } });
  }
  function mainIdea(lv) {
    var t = R.pick(T.list('main'));
    return Q.one('What is this text <b>mostly</b> about?', t.main[0], t.main.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which answer fits the whole text, not just one part?',
      hint: 'The main idea is about the whole text.', explain: t.main[0], meta: { k: 'g3-main', t: t.title } });
  }
  function sequence(lv) {
    var t = R.pick(T.list('order')), ev = t.order.length > 3 && lv < 2 ? t.order.slice(0, 3) : t.order;
    return { q: 'Put these in the order they happen.', fig: T.show(t), type: 'order', items: ev.map(function (e) { return '“' + e + '”'; }), first: 'First', last: 'Last',
      hint: 'Find each part in the text. Which comes first?', explain: 'They come in this order in the text.', meta: { k: 'g3-order', t: t.title } };
  }
  function predict() {
    var t = R.pick(T.list('predict')), p = t.predict;
    return Q.one('What will <b>most likely</b> happen next?', p.right, p.wrong, { fig: T.show(t, p.upTo), prompt: 'Look for a clue: <b>' + p.clue + '</b>.',
      hint: 'Use a clue from the text.', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g3-predict', t: t.title } });
  }
  function predictClue() {
    var t = R.pick(T.list('predict')), p = t.predict, other = R.pick(body(t).slice(0, p.upTo).filter(function (l) { return l.indexOf(p.clue) < 0; }));
    return Q.one('You predict: <b>' + p.right + '</b> Which words in the text helped?', p.clue, [other.split(' ').slice(0, 5).join(' ')], { fig: T.show(t, p.upTo),
      hint: 'Which words point to what happens next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g3-predict-clue', t: t.title } });
  }
  function fixUp() {
    return Q.all('A sentence does not make sense to you. What could you do? Pick every good idea.', R.some(HELP, 2), R.some(NOHELP, 2), {
      hint: 'Good readers slow down and check.', explain: 'Reread, picture it, ask a question, or use the pictures and headings.', meta: { k: 'g3-fix-up' } });
  }
  function purpose() {
    var t = R.pick(T.list('purpose'));
    return Q.one('Why would you read this?', t.purpose, R.some(PURPOSES.filter(function (p) { return p !== t.purpose; }), 2), { fig: T.show(t),
      hint: 'Is it a story, facts, steps, or someone' + '’' + 's opinion?', explain: 'You would read it <b>' + t.purpose + '</b>.', meta: { k: 'g3-purpose', t: t.title } });
  }
  function form(lv) {
    var t = R.pick(T.list('kind'));
    return Q.tiles('What kind of text is this?', t.kind, R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Look at how it is laid out: headings, numbers, lines, or "Dear"?', explain: 'It is <b>' + (t.kind === 'information' ? 'an information text' : 'a ' + t.kind) + '</b>.', meta: { k: 'g3-form', t: t.title } });
  }
  function matchForm() {
    var ts = R.some(T.list('kind').filter(function (t, i, all) { return all.findIndex(function (x) { return x.kind === t.kind; }) === i; }), 3);
    return { q: 'Match each title to its kind of text.', type: 'match', pairs: ts.map(function (t) { return [t.title, t.kind]; }), hint: 'Think about what each one would look like.', explain: 'The title is a clue to the kind of text.', meta: { k: 'g3-match-form' } };
  }
  function narrator() {
    var t = R.pick(T.list('pov').filter(function (x) { return x.kind === 'story'; }));
    return { q: 'Who is telling this story?', fig: T.show(t), type: 'tap', tiles: ['Someone in the story (first person)', 'Someone outside the story (third person)'], answer: t.pov === 'first' ? 0 : 1,
      prompt: 'Look for <b>I</b> and <b>my</b>, or <b>he</b>, <b>she</b> and <b>they</b>.', hint: 'I and my: first person. He, she, they: third person.',
      explain: t.pov === 'first' ? 'The narrator says <b>I</b>: first person.' : 'The narrator says <b>they</b> and <b>she</b>: third person.', meta: { k: 'g3-narrator', t: t.title } };
  }
  function narratorWord() {
    var t = R.pick(T.list('pov').filter(function (x) { return x.kind === 'story'; })), first = t.pov === 'first';
    return Q.tiles('Which word tells you this story is told in the <b>' + (first ? 'first' : 'third') + ' person</b>?', first ? 'I' : 'They', first ? ['They', 'He'] : ['I', 'We'], { fig: T.show(t),
      hint: 'First person: I, me, my. Third person: he, she, they.', explain: (first ? '<b>I</b> means the narrator is in the story.' : '<b>They</b> means the narrator is watching from outside.'), meta: { k: 'g3-narrator-word', t: t.title } });
  }

  var mitten = T.mitten;
  Atlas.register('reading', {
    lessons: [{
      id: 'understand', title: 'Understanding what you read', sub: 'Facts, the main idea, and the order things happen.',
      concepts: [
        { slug: 'find', title: 'Find it in the text', exp: ['C1.1'], skill: 'understand',
          model: [
            step(T.show(mitten), 'Read the story.'),
            step(W.sent('Where did they find the mitten?'), 'A question.'),
            step(W.sent('There, <mark class="hl">on top of the slide</mark>, sat a small red mitten.'), 'Look back. Find the sentence.'),
            step(W.tile('on top of the slide'), 'The answer was in the text.')
          ],
          key: '<p>Look back in the text to find the answer.</p>',
          guided: [function () { return fact(1); }, findLine],
          check: [function () { return fact(2); }, findLine],
          coach: '<p>Ask the child to put a finger on the sentence that answers the question before choosing. Looking back is a skill, not cheating.</p>',
          mistake: '<p>Answering from memory or a guess. Always point to the words in the text.</p>' },
        { slug: 'main-idea', title: 'The main idea', exp: ['C2.6'], skill: 'understand',
          model: [
            step(T.show(mitten), 'What is it mostly about?'),
            step(W.sent('The park has a tall slide.'), 'Only one part. Too small.'),
            step(W.sent('Leila loses her mitten, and they find it by following their footprints.'), 'It fits the whole story.')
          ],
          key: '<p>The main idea fits the <b>whole</b> text.</p>',
          guided: [function () { return mainIdea(1); }, function () { return mainIdea(1); }],
          check: [function () { return mainIdea(2); }, function () { return mainIdea(2); }],
          coach: '<p>After any book, ask: "Tell me what it was about in one sentence." Then: "Does that fit the whole book?"</p>',
          mistake: '<p>Choosing a detail they liked rather than the big idea.</p>' },
        { slug: 'sequence', title: 'What happened first, next, last', exp: ['C2.6'], skill: 'understand',
          model: [
            step(W.sent('walked home'), 'First.'),
            step(W.sent('walked home') + W.sent('mitten is gone'), 'Next.'),
            step(W.sent('walked home') + W.sent('mitten is gone') + W.sent('followed the footprints'), 'Then. Keep the order of the text.')
          ],
          key: '<p>First, next, then, last.</p>',
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
            step(T.show(mitten, 3), 'Stop and think.'),
            step(W.sent('<mark class="hl">Their footprints made a long trail</mark> behind them.'), 'A clue.'),
            step(W.sent('They will follow the footprints.'), 'A prediction that uses the clue.')
          ],
          key: '<p>Use a clue from the text to guess what happens next. Then read on to check.</p>',
          guided: [predict, predictClue],
          check: [predict, predictClue],
          coach: '<p>Stop at an exciting part of a book and ask: "What do you think happens next? What made you think that?"</p>',
          mistake: '<p>Wild guesses with no clue. Ask: "What in the text makes you think so?"</p>' },
        { slug: 'fix-up', title: 'When it does not make sense', exp: ['C2.4'], skill: 'strategies',
          model: [
            step(W.icon('think'), 'Hmm. That did not make sense.'),
            step(W.icon('again'), 'Read it again, slowly.'),
            step(W.icon('read'), 'Picture it. Ask a question about it.')
          ],
          key: '<p>Stop, reread, picture it, ask a question.</p>',
          guided: [fixUp, fixUp],
          check: [fixUp, fixUp],
          coach: '<p>Model it aloud: "Wait, that did not make sense. Let me reread." Children copy what they see.</p>',
          mistake: '<p>Reading on when meaning is lost. Praise every time the child stops to fix it.</p>' },
        { slug: 'purpose', title: 'Why am I reading this?', exp: ['C2.2'], skill: 'strategies',
          model: [
            step(T.show(T.beavers), 'Headings and facts.'),
            step(W.sent('to learn facts'), 'I read this to learn.'),
            step(T.show(T.mitten, 2), 'A story? I read it to enjoy it.')
          ],
          key: '<p>To enjoy, to learn facts, to learn how, or to hear an opinion.</p>',
          guided: [purpose, purpose],
          check: [purpose, purpose],
          coach: '<p>Before reading, ask: "What do you think you will get from this?"</p>',
          mistake: '<p>Reading every text the same way. Facts can be read slowly and checked; a story can be enjoyed.</p>' }
      ]
    }, {
      id: 'kinds', title: 'Kinds of texts', sub: 'Stories, information, poems, instructions, letters.',
      concepts: [
        { slug: 'forms', title: 'What kind of text?', exp: ['C1.2'], skill: 'forms',
          model: [
            step(T.show(T.beavers), 'Headings and facts: <b>information</b>.'),
            step(T.show(T.feeder), 'Numbered steps: <b>instructions</b>.'),
            step(T.show(T.rink), '"Dear": a <b>letter</b>.'),
            step(T.show(T.night), 'Short lines that sound good: a <b>poem</b>.')
          ],
          key: '<p>How it looks is a clue to what kind of text it is.</p>',
          guided: [function () { return form(1); }, function () { return form(1); }],
          check: [function () { return form(2); }, matchForm],
          coach: '<p>At the library, sort a pile of books and papers into stories, information, poems, instructions and letters.</p>',
          mistake: '<p>Calling every text a "story". A story has characters and events; information has facts.</p>' },
        { slug: 'narrator', title: 'Who is telling the story?', exp: ['C1.6'], skill: 'forms',
          model: [
            step(W.sent('<b>I</b> held <b>my</b> paddle tight.'), '<b>I</b>, <b>my</b>: the narrator is in the story. <b>First person</b>.'),
            step(W.sent('<b>They</b> followed the footprints.'), '<b>They</b>: the narrator is outside the story. <b>Third person</b>.')
          ],
          key: '<p>I, me, my: first person. He, she, they: third person.</p>',
          guided: [narrator, narratorWord],
          check: [narrator, narratorWord],
          coach: '<p>Retell a story as if you were one of the characters ("I lost my mitten..."). Talk about how it changes.</p>',
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
    understand: [[1, 'find-line', findLine], [1, 'main-idea', mainIdea], [1, 'order', sequence]],
    strategies: [[1, 'clue', predictClue], [1, 'fix-up', fixUp], [1, 'purpose', purpose]],
    forms: [[1, 'narrator', narrator], [1, 'narrator-word', narratorWord], [2, 'match', matchForm]]
  });
})();
