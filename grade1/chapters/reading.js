/* Grade 1: reading for meaning.
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
  var PURPOSES = ['to enjoy a story', 'to learn facts', 'to learn how to do something', 'to hear what someone thinks', 'to enjoy a poem'];
  var HELP = ['Read it again, slowly.', 'Picture it in my head.', 'Ask a question about it.', 'Look at the pictures.'];
  var NOHELP = ['Skip to the end.', 'Close the book.', 'Read faster.', 'Keep going anyway.'];
  function body(t) { return t.lines.filter(function (l) { return l.charAt(0) !== '#'; }); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- question makers: understanding ---------- */
  function fact(lv) {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts);
    return Q.one(f[0], f[1], f.slice(2, lv > 1 ? 4 : 3), { fig: T.show(t), prompt: 'Find the sentence that tells you.', hint: 'Look back in the text. The answer is there.',
      explain: 'The text says: <b>' + f[1] + '</b>.', meta: { k: 'g1-fact', t: t.title, q: f[0] } });
  }
  function findLine() {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts), lines = body(t), right = lines.filter(function (l) { return l.indexOf(f[4]) >= 0; })[0];
    return Q.one('Which sentence answers this? <b>' + f[0] + '</b>', right, R.some(lines.filter(function (l) { return l !== right; }), 2), { fig: T.show(t),
      hint: 'Which sentence has the answer in it?', explain: W.sent(right), meta: { k: 'g1-find-line', t: t.title, q: f[0] } });
  }
  function mainIdea(lv) {
    var t = R.pick(T.list('main'));
    return Q.one('What is this text <b>mostly</b> about?', t.main[0], t.main.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which answer fits the whole text, not just one part?',
      hint: 'The main idea is about the whole text.', explain: t.main[0], meta: { k: 'g1-main', t: t.title } });
  }
  function form(lv) {
    var t = R.pick(T.list('kind'));
    return Q.tiles('What kind of text is this?', t.kind, R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Look at how it looks: headings, numbers, short rhyming lines, or "Dear"?', explain: 'It is ' + (t.kind === 'information' ? 'an information text' : t.kind === 'instructions' ? 'a set of instructions' : 'a ' + t.kind) + '.', meta: { k: 'g1-form', t: t.title } });
  }
  function matchForm() {
    var ts = R.some(T.list('kind').filter(function (t, i, all) { return all.findIndex(function (x) { return x.kind === t.kind; }) === i; }), 3);
    return { q: 'Match each title to its kind of text.', type: 'match', pairs: ts.map(function (t) { return [t.title, t.kind]; }), hint: 'Think about what each one would look like.', explain: 'The title is a clue.', meta: { k: 'g1-match-form' } };
  }

  /* ---------- question makers: reading strategies ---------- */
  function predict() {
    var t = R.pick(T.list('predict')), p = t.predict;
    return Q.one('What will <b>most likely</b> happen next?', p.right, p.wrong, { fig: T.show(t, p.upTo), prompt: 'Look for a clue: <b>' + p.clue + '</b>.',
      hint: 'Use a clue from the text.', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g1-predict', t: t.title } });
  }
  function know() {
    var t = R.pick(T.list('know'));
    return Q.one('Before you read <b>' + t.title + '</b>, what do you already know that could help?', t.know[0], t.know[1], { hint: 'Which one is about the same topic as the title?',
      explain: 'Thinking about what you know helps you understand.', meta: { k: 'g1-know', t: t.title } });
  }
  function purpose() {
    var t = R.pick(T.list('purpose'));
    return Q.one('Why would you read this?', t.purpose, R.some(PURPOSES.filter(function (p) { return p !== t.purpose; }), 2), { fig: T.show(t),
      hint: 'Is it a story, facts, steps, a poem or a note?', explain: 'You would read it <b>' + t.purpose + '</b>.', meta: { k: 'g1-purpose', t: t.title } });
  }
  function fixUp() {
    return Q.all('A part does not make sense. What could you do? Pick every good idea.', R.some(HELP, 2), R.some(NOHELP, 2), {
      hint: 'Good readers slow down and check.', explain: 'Read it again, picture it, ask a question, or look at the pictures.', meta: { k: 'g1-fix-up' } });
  }
  function connect() {
    var t = R.pick(T.list('connect'));
    return Q.one('Which is a <b>connection</b> to this text?', t.connect[0], t.connect[1], { fig: T.show(t), prompt: 'Which one is like something in the text?',
      hint: 'A connection links the text to your life.', explain: 'It is like something in the text.', meta: { k: 'g1-connect', t: t.title } });
  }

  /* ---------- question makers: who is telling it ---------- */
  function narrator() {
    var t = R.pick(T.list('pov').filter(function (x) { return x.kind === 'story'; }));
    return { q: 'Who is telling this story?', fig: T.show(t), type: 'tap', tiles: ['Someone in the story (I)', 'Someone outside the story (she, he, they)'], answer: t.pov === 'first' ? 0 : 1,
      prompt: 'Look for <b>I</b> and <b>my</b>.', hint: 'I and my: someone in the story is telling it.', explain: t.pov === 'first' ? 'The teller says <b>I</b>.' : 'The teller says <b>she</b>: they are outside the story.', meta: { k: 'g1-narrator', t: t.title } };
  }
  function narratorWord() {
    var t = R.pick(T.list('pov').filter(function (x) { return x.kind === 'story'; })), first = t.pov === 'first';
    return Q.tiles('Which word shows who is telling the story?', first ? 'I' : 'She', first ? ['She', 'They'] : ['I', 'We'], { fig: T.show(t),
      hint: 'Look for I, or for she, he and they.', explain: first ? '<b>I</b>: the teller is in the story.' : '<b>She</b>: the teller is outside the story.', meta: { k: 'g1-narrator-word', t: t.title } });
  }
  function otherTeller(lv) {
    var t = R.pick(T.list('other'));
    return Q.one('Who else in the story could tell it in a <b>different way</b>?', cap(t.other[0]), t.other[1].slice(0, lv > 1 ? 2 : 1).map(cap), { fig: T.show(t),
      prompt: 'Who else is in the story?', hint: 'Pick someone who was there.', explain: cap(t.other[0]) + ' was there, and could tell what they saw.', meta: { k: 'g1-other-teller', t: t.title } });
  }
  function povTf() {
    var t = R.pick(T.list('pov').filter(function (x) { return x.kind === 'story'; }));
    return { q: 'True or false?', fig: T.show(t) + W.sent('Someone <b>in</b> the story is telling it.'), type: 'tf', answer: t.pov === 'first',
      hint: 'Look for I and my.', explain: t.pov === 'first' ? 'True: the teller says I.' : 'False: the teller says she.', meta: { k: 'g1-pov-tf', t: t.title } };
  }

  var kite = T.kite;
  Atlas.register('reading', {
    lessons: [{
      id: 'understand', title: 'Understanding what you read', sub: 'Find facts, the main idea, and the kind of text.',
      concepts: [
        { slug: 'find', title: 'Find it in the text', exp: ['C1.1'], skill: 'understand',
          model: [
            step(T.show(kite), 'Read it.'),
            step(W.sent('What colours was the kite?'), 'A question.'),
            step(W.sent('It was <mark class="hl">red and yellow</mark>.'), 'Look back. The answer is there.')
          ],
          guided: [function () { return fact(1); }, findLine],
          check: [function () { return fact(2); }, findLine],
          coach: '<p>Read the passage aloud with the child first if needed. Then ask them to put a finger on the sentence that answers the question. Looking back is a skill, not cheating.</p>',
          mistake: '<p>Answering from memory or a guess. Always point to the words in the text.</p>' },
        { slug: 'main', title: 'What is it mostly about?', exp: ['C2.6'], skill: 'understand',
          model: [
            step(T.show(kite)),
            step(W.sent('The field is big.'), 'Only one small part.'),
            step(W.sent('Tala flies her new kite, and Grandpa watches.'), 'It fits the whole story.')
          ],
          key: '<p>This is called the <b>main idea</b>.</p>',
          guided: [function () { return mainIdea(1); }, function () { return mainIdea(1); }],
          check: [function () { return mainIdea(2); }, function () { return fact(1); }],
          coach: '<p>After any book, ask: "Tell me what it was about in one sentence."</p>',
          mistake: '<p>Choosing a small detail they liked. Ask: "Is that the whole story, or one part?"</p>' },
        { slug: 'kinds', title: 'Kinds of texts', exp: ['C1.2'], skill: 'understand',
          model: [
            step(W.icon('read'), 'A <b>story</b> has characters and things that happen.'),
            step(W.passage('', ['# Eggs', 'A frog starts as a tiny egg.']), 'Headings and facts: <b>information</b>.'),
            step(W.passage('', ['1. Fill the pot with soil.', '2. Push the seed in.']), 'Numbered steps: <b>instructions</b>.'),
            step(W.passage('', ['Dear Grandma,']), '"Dear": a <b>letter</b>. Short lines that rhyme: a <b>poem</b>.')
          ],
          guided: [function () { return form(1); }, function () { return form(1); }],
          check: [function () { return form(2); }, matchForm],
          coach: '<p>At the library, sort books: stories, information books, poems. Ask how the child can tell.</p>',
          mistake: '<p>Calling every book a story. Ask: "Is it about made-up characters, or real facts?"</p>' }
      ]
    }, {
      id: 'strategies', title: 'Reading strategies', sub: 'What good readers do before, during and after reading.',
      concepts: [
        { slug: 'before', title: 'Think before you read', exp: ['C2.1', 'C2.2'], skill: 'strategies',
          model: [
            step(W.sent('From Egg to Frog'), 'Read the title.'),
            step(W.icon('think'), 'What do I know? Frogs live near ponds.'),
            step(W.icon('read'), 'Why am I reading? To learn facts.')
          ],
          guided: [know, purpose],
          check: [know, purpose],
          coach: '<p>Before reading, look at the cover together and ask: "What do you know about this? Is this book for fun or for facts?"</p>',
          mistake: '<p>Sharing something unrelated to the topic. Bring it back to the title.</p>' },
        { slug: 'predict', title: 'Guess what comes next', exp: ['C2.3'], skill: 'strategies',
          model: [
            step(T.show(kite, 3)),
            step(W.sent('She ran across the big field.'), 'A clue.'),
            step(W.sent('The kite will fly up into the sky.'), 'My guess, from the clue.')
          ],
          key: '<p>This is called a <b>prediction</b>. Use a clue from the text.</p>',
          guided: [predict, predict],
          check: [predict, predict],
          coach: '<p>Stop before turning a page and ask, "What do you think will happen? What makes you think so?"</p>',
          mistake: '<p>A wild guess with no clue. Ask: "What in the story made you think that?"</p>' },
        { slug: 'check', title: 'When it does not make sense', exp: ['C2.4'], skill: 'strategies',
          model: [
            step(W.icon('read'), 'Read it again, slowly.'),
            step(W.icon('think'), 'Picture it in your head.'),
            step(W.icon('talk'), 'Ask a question about it.')
          ],
          guided: [fixUp, fixUp],
          check: [fixUp, fixUp],
          coach: '<p>Model it: "Hmm, that did not make sense. I will read it again." Children copy what they see.</p>',
          mistake: '<p>Reading on when lost. Teach the child to stop and say, "Wait, that did not make sense."</p>' },
        { slug: 'connect', title: 'Make a connection', exp: ['C2.5'], skill: 'strategies',
          model: [
            step(T.show(T.snow)),
            step(W.sent('I made a snow angel in my yard.'), 'Like me!')
          ],
          guided: [connect, connect],
          check: [connect, connect],
          coach: '<p>Ask: "Does this remind you of anything you did, or another book?"</p>',
          mistake: '<p>A connection to something not in the text. Ask: "Which part of the story is it like?"</p>' }
      ]
    }, {
      id: 'teller', title: 'Who is telling it?', sub: 'The teller of the story, and who else could tell it.',
      concepts: [
        { slug: 'narrator', title: 'Who is telling the story?', exp: ['C1.6'], skill: 'teller',
          model: [
            step(W.sent('<b>I</b> made a snow angel.'), 'I: someone in the story.'),
            step(W.sent('<b>She</b> ran across the field.'), 'She: someone outside the story.')
          ],
          key: '<p>The one telling a story is the <b>narrator</b>.</p>',
          guided: [narrator, narratorWord],
          check: [narrator, narratorWord],
          coach: '<p>Read a page and ask: "Who is telling this? How do you know?" Point to I, she or they.</p>',
          mistake: '<p>Thinking the main character always tells the story. Look for the word I.</p>' },
        { slug: 'other', title: 'Tell it another way', exp: ['C1.6'], skill: 'teller',
          model: [
            step(T.show(kite)),
            step(W.sent('Grandpa: I watched Tala run. The kite went up, and I clapped.'), 'Grandpa could tell it too.')
          ],
          guided: [function () { return otherTeller(1); }, function () { return otherTeller(1); }],
          check: [function () { return otherTeller(2); }, function () { return otherTeller(2); }],
          coach: '<p>Retell a favourite story as another character: "Now you are the wolf. What happened?"</p>',
          mistake: '<p>Picking someone who was not in the story. Ask: "Was that person there?"</p>' }
      ]
    }],
    practice: [
      { id: 'understand', name: 'Understanding what you read', code: 'C1.1, C1.2, C2.6', gen: fact },
      { id: 'strategies', name: 'Reading strategies', code: 'C2.1, C2.2, C2.3, C2.4, C2.5', gen: predict },
      { id: 'teller', name: 'Who is telling it?', code: 'C1.6', gen: narrator }
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
    understand: [[1, 'find-line', findLine], [1, 'main', mainIdea], [1, 'form', form], [2, 'match-form', matchForm]],
    strategies: [[1, 'know', know], [1, 'purpose', purpose], [1, 'fix-up', fixUp], [1, 'connect', connect]],
    teller: [[1, 'word', narratorWord], [1, 'other', otherTeller], [1, 'true-false', povTf]]
  });
})();
