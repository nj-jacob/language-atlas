/* Grade 5: reading for meaning.
   Ontario 2023 Language, Grade 5, Strand C (Comprehension):
   C1.1 read and comprehend various texts            C1.2 characteristics of text forms and genres, including cultural text forms, and how they help communicate meaning
   C1.6 the narrator's point of view (first, second or third person), and its advantages and disadvantages
   C2.2 purposes for reading, and texts that suit them    C2.3 predictions using background knowledge, text features and evidence, checked by questions
   C2.4 strategies to monitor understanding: adjusting rate, visualizing, reading ahead, asking questions, consulting references
   C2.6 summarize the main idea and supporting details in sequence, and draw a well-supported conclusion
   With a grown-up: C1.7 texts by diverse First Nations, Metis and Inuit creators, C2.1 prior knowledge, C2.5 connections, C2.7 which strategies helped.
   Passages are in ../texts.js. Answer checks: tests/verify/grade5-reading.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var POVS = { first: 'First person (I, we)', second: 'Second person (you)', third: 'Third person (he, she, they)' };
  /* [the problem, the strategy that helps] */
  var FIX = [['You do not know what a word means, and the sentence does not help.', 'Look it up in the glossary or a dictionary.'], ['The facts are coming fast and you are lost.', 'Slow down and reread.'],
    ['You cannot picture what is happening.', 'Make a picture in your head.'], ['A sentence confuses you, but the next part might explain it.', 'Read ahead to see if it is explained.'],
    ['You wonder why a character acted that way.', 'Ask a question, then look for the answer.']];
  /* [what you want, a text that suits it, texts that do not] */
  var CHOOSE = [['to learn how to build a birdhouse', 'a how-to guide with numbered steps', ['a poem about birds', 'a novel about a pigeon']],
    ['to find out about life in Nunavut', 'an information book by an Inuit author', ['a comic about superheroes', 'a cookbook']],
    ['to enjoy a funny story before bed', 'a humorous short story', ['a bus schedule', 'a science textbook']],
    ['to decide which bike to buy', 'a review that compares two bikes', ['a poem about wheels', 'a story about a bike race']],
    ['to learn what a word means', 'a dictionary', ['an atlas', 'a joke book']]];
  /* [a form, what it does] */
  var FORMS = [['a narrative', 'has characters, a problem and events'], ['an information text', 'uses headings and facts to teach'], ['a persuasive letter', 'gives an opinion and reasons'],
    ['a poem', 'uses short lines and vivid images'], ['a biography', 'tells the true story of a person' + '’' + 's life'], ['an oral story', 'is passed on by telling, often by Elders or family']];
  var KINDS = ['story', 'information', 'poem', 'letter'];
  /* what each narrator gives you, and what it costs */
  var PLUS = { first: 'You know exactly what the narrator thinks and feels.', second: 'You feel as if it is happening to you.', third: 'The narrator can show what happens in more than one place.' };
  var MINUS = { first: 'You only know what the narrator knows.', second: 'It can feel strange if it is not like your own life.', third: 'You may not know every character' + '’' + 's thoughts.' };
  function body(t) { return t.lines.filter(function (l) { return l.charAt(0) !== '#'; }); }

  /* ---------- question makers ---------- */
  function fact(lv) {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts);
    return Q.one(f[0], f[1], f.slice(2, lv > 1 ? 4 : 3), { fig: T.show(t), prompt: 'Find the sentence that tells you.', hint: 'Look back in the text.',
      explain: 'The text says: <b>' + f[1] + '</b>.', meta: { k: 'g5-fact', t: t.title, q: f[0] } });
  }
  function findLine() {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts), lines = body(t), right = lines.filter(function (l) { return l.indexOf(f[4]) >= 0; })[0];
    return Q.one('Which sentence answers this? <b>' + f[0] + '</b>', right, R.some(lines.filter(function (l) { return l !== right; }), 2), { fig: T.show(t),
      hint: 'Which sentence has the answer in it?', explain: W.sent(right), meta: { k: 'g5-find-line', t: t.title, q: f[0] } });
  }
  function mainIdea(lv) {
    var t = R.pick(T.list('main'));
    return Q.one('What is this text <b>mostly</b> about?', t.main[0], t.main.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which answer covers the whole text?',
      hint: 'The main idea fits the whole text, not one detail.', explain: t.main[0], meta: { k: 'g5-main', t: t.title } });
  }
  function summary(lv) {
    var t = R.pick(T.list('summary'));
    return Q.one('Which is the best <b>summary</b>?', t.summary[0], t.summary.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Main idea and key events, in order, in a few sentences.',
      hint: 'A summary is short, in order, and has no opinions.', explain: t.summary[0], meta: { k: 'g5-summary', t: t.title } });
  }
  function conclude() {
    var t = R.pick(T.list('conclude'));
    return Q.one('Which conclusion does the text <b>support</b>?', t.conclude[0], t.conclude.slice(1), { fig: T.show(t), prompt: 'Can you point to words that back it up?',
      hint: 'A good conclusion fits the evidence in the text.', explain: t.conclude[0], meta: { k: 'g5-conclude', t: t.title } });
  }
  function sequence() {
    var t = R.pick(T.list('order')), ev = t.order.length > 4 ? t.order.slice(0, 4) : t.order;
    return { q: 'Put these in the order they happen.', fig: T.show(t), type: 'order', items: ev.map(function (e) { return '“' + e + '”'; }), first: 'First', last: 'Last',
      hint: 'Find each part in the text.', explain: 'This is the order in the text.', meta: { k: 'g5-order', t: t.title } };
  }

  function predict() {
    var t = R.pick(T.list('predict')), p = t.predict;
    return Q.one('What will <b>most likely</b> happen next?', p.right, p.wrong, { fig: T.show(t, p.upTo), prompt: 'Look for a clue: <b>' + p.clue + '</b>.',
      hint: 'Use a clue from the text and what you know.', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g5-predict', t: t.title } });
  }
  function predictClue() {
    var t = R.pick(T.list('predict')), p = t.predict, other = R.pick(body(t).slice(0, p.upTo).filter(function (l) { return l.indexOf(p.clue) < 0; }));
    return Q.one('You predict: <b>' + p.right + '</b> Which words in the text support it?', p.clue, [other.split(' ').slice(0, 4).join(' ')], { fig: T.show(t, p.upTo),
      hint: 'Which words point to what happens next?', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g5-predict-clue', t: t.title } });
  }
  function monitor(lv) {
    var f = R.pick(FIX), wrong = FIX.filter(function (x) { return x !== f; }).map(function (x) { return x[1]; });
    return Q.one('What should you do?', f[1], R.some(wrong, lv > 1 ? 3 : 2), { fig: W.means('think', f[0]), hint: 'Which strategy fixes this problem?', explain: f[1], meta: { k: 'g5-monitor', problem: f[0] } });
  }
  function choose(lv) {
    var c = R.pick(CHOOSE);
    return Q.one('You want <b>' + c[0] + '</b>. Which text suits your purpose?', c[1], c[2].slice(0, lv > 1 ? 2 : 1), { hint: 'Match the text to what you want to get from it.',
      explain: c[1] + ' fits.', meta: { k: 'g5-choose', want: c[0] } });
  }

  function form(lv) {
    var t = R.pick(T.list('kind'));
    return Q.tiles('What kind of text is this?', t.kind, R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Headings and facts? "Dear"? Short lines? Characters and events?', explain: 'It is ' + (t.kind === 'information' ? 'an information text' : 'a ' + t.kind) + '.', meta: { k: 'g5-form', t: t.title } });
  }
  function formJob(lv) {
    var f = R.pick(FORMS);
    return Q.one('What does <b>' + f[0] + '</b> do?', f[1], R.some(FORMS.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Think of one you have read or heard.', explain: f[0] + ' ' + f[1] + '.', meta: { k: 'g5-form-job', form: f[0] } });
  }
  function matchForms() {
    var fs = R.some(FORMS, 3);
    return { q: 'Match each form to what it does.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Each form is built for a purpose.', explain: 'The form helps carry the meaning.', meta: { k: 'g5-match-forms' } };
  }
  function narrator(lv) {
    var t = R.pick(T.list('pov')), all = ['first', 'second', 'third'];
    var other = R.pick(all.filter(function (x) { return x !== t.pov; })), keys = lv > 1 ? all : all.filter(function (k) { return k === t.pov || k === other; });
    var tiles = keys.map(function (k) { return POVS[k]; });
    return { q: 'Who is telling this?', fig: T.show(t), type: 'tap', tiles: tiles, answer: keys.indexOf(t.pov), prompt: 'Look for I or we, you, or he, she and they.',
      hint: 'I or we: first. You: second. He, she, they: third.', explain: POVS[t.pov] + '.', meta: { k: 'g5-narrator', t: t.title } };
  }
  function povWhy() {
    var p = R.pick(['first', 'second', 'third']), plus = R.int(0, 1) === 1, list = plus ? PLUS : MINUS;
    return Q.one('A story told in the <b>' + p + ' person</b>. What is one ' + (plus ? '<b>advantage</b>' : '<b>disadvantage</b>') + '?', list[p],
      Object.keys(list).filter(function (k) { return k !== p; }).map(function (k) { return list[k]; }), { hint: 'Think about what that narrator can and cannot know.',
        explain: list[p], meta: { k: 'g5-pov-why', pov: p, plus: plus } });
  }

  var tryout = T.tryout;
  Atlas.register('reading', {
    lessons: [{
      id: 'understand', title: 'Understanding the text', sub: 'Find it, sum it up, and draw a conclusion.',
      concepts: [
        { slug: 'find', title: 'Find it in the text', exp: ['C1.1'], skill: 'understand',
          model: [
            step(T.show(T.wetlands), 'Read it first.'),
            step(W.sent('What do wetlands help stop?'), 'A question.'),
            step(W.sent('Wetlands soak up rain like a sponge, so they <mark class="hl">help stop floods</mark>.'), 'Look back. Put your finger on it.')
          ],
          guided: [function () { return fact(1); }, findLine],
          check: [function () { return fact(2); }, findLine],
          coach: '<p>Ask the child to point to the sentence that proves their answer. Looking back is what strong readers do.</p>',
          mistake: '<p>Answering from memory or from what they already knew. The answer must come from this text.</p>' },
        { slug: 'summary', title: 'A summary: main idea and key events, in order', exp: ['C2.6'], skill: 'understand',
          model: [
            step(T.show(tryout), 'Read the story.'),
            step(W.sent('Jun walks in. Kids bounce balls. Jun breathes. Jun shoots...'), 'Every detail: too long.'),
            step(W.sent(tryout.summary[0]), 'Just what matters, in a few sentences.')
          ],
          guided: [function () { return summary(1); }, function () { return mainIdea(1); }],
          check: [function () { return summary(2); }, function () { return mainIdea(2); }],
          coach: '<p>Use "Somebody wanted... but... so... then..." to sum up a story in one breath.</p>',
          mistake: '<p>Retelling every detail, or adding an opinion. A summary is short and sticks to the text.</p>' },
        { slug: 'conclude', title: 'Draw a conclusion the text supports', exp: ['C2.6'], skill: 'understand',
          model: [
            step(W.sent('<mark class="hl">practised every day</mark> ... <mark class="hl">I kept going</mark>'), 'Evidence.'),
            step(W.sent(tryout.conclude[0]), 'A conclusion built on it.'),
            step(W.sent(tryout.conclude[1]), 'No evidence for this.')
          ],
          guided: [conclude, sequence],
          check: [conclude, sequence],
          coach: '<p>After a chapter, ask: "What can we decide from this? Show me the words that prove it."</p>',
          mistake: '<p>Jumping to a conclusion the text does not back up. Every conclusion needs evidence.</p>' }
      ]
    }, {
      id: 'strategies', title: 'Reading strategies', sub: 'Predict, check your understanding, and choose the right text.',
      concepts: [
        { slug: 'predict', title: 'Predict, then check', exp: ['C2.3'], skill: 'strategies',
          model: [
            step(T.show(tryout, 3), 'Stop and think.'),
            step(W.sent('<mark class="hl">practised every day for a month</mark>'), 'A clue.'),
            step(W.sent(tryout.predict.right), 'My prediction.'),
            step(W.icon('read'), 'Read on. Was I right?')
          ],
          guided: [predict, predictClue],
          check: [predict, predictClue],
          coach: '<p>Before reading, look at the title, headings and pictures and ask: "What do you think this will be about? Why?" After, check together.</p>',
          mistake: '<p>Never checking a prediction. The check is what makes it a strategy.</p>' },
        { slug: 'monitor', title: 'Notice when you are lost, and fix it', exp: ['C2.4'], skill: 'strategies',
          model: [
            step(W.icon('think'), 'Wait. I am lost.'),
            step(W.icon('again'), 'Slow down. Reread. Read ahead.'),
            step(W.icon('read'), 'Picture it, ask a question, or look up a word.')
          ],
          guided: [function () { return monitor(1); }, function () { return monitor(1); }],
          check: [function () { return monitor(2); }, function () { return monitor(2); }],
          coach: '<p>Model it aloud: "Hmm, I do not get this part. I will read ahead and see if it is explained." Children copy what they hear.</p>',
          mistake: '<p>Reading to the end of the page while lost. Stop as soon as it stops making sense.</p>' },
        { slug: 'choose', title: 'Choose a text that fits your purpose', exp: ['C2.2'], skill: 'strategies',
          model: [
            step(W.sent('I want to build a birdhouse.'), 'My purpose.'),
            step(W.sent('a how-to guide with numbered steps'), 'This fits.'),
            step(W.sent('a poem about birds'), 'Lovely, but not for this.')
          ],
          guided: [function () { return choose(1); }, function () { return choose(1); }],
          check: [function () { return choose(2); }, function () { return choose(2); }],
          coach: '<p>At the library, give the child a purpose ("find out how to care for a hamster") and let them choose the book.</p>',
          mistake: '<p>Picking the first book with the right word on the cover. Check that it suits what you want.</p>' }
      ]
    }, {
      id: 'forms', title: 'Forms and narrators', sub: 'How a text is built, and who is telling it.',
      concepts: [
        { slug: 'forms', title: 'Each form has a job', exp: ['C1.2'], skill: 'forms',
          model: [
            step(T.show(T.bus), '"Dear", an opinion, reasons: a <b>persuasive letter</b>.'),
            step(T.show(T.storm), 'Short lines and images: a <b>poem</b>.'),
            step(W.icon('people'), 'Told aloud by Elders or family: an <b>oral story</b>.')
          ],
          guided: [function () { return form(1); }, function () { return formJob(1); }],
          check: [function () { return form(2); }, matchForms],
          coach: '<p>Sort a pile of texts at home: flyers, recipes, poems, letters, novels. Ask: "Why is this one built this way?"</p>',
          mistake: '<p>Calling everything a story. A story has characters and events; an information text has facts.</p>' },
        { slug: 'narrator', title: 'First, second or third person', exp: ['C1.6'], skill: 'forms',
          model: [
            step(W.sent('<b>I</b> walked into the gym.'), '<b>First person</b>: the narrator is in it.'),
            step(W.sent('<b>You</b> step onto the ice.'), '<b>Second person</b>: it puts you in it.'),
            step(W.sent('<b>Rosa</b> was at practice.'), '<b>Third person</b>: told from outside.')
          ],
          guided: [function () { return narrator(1); }, povWhy],
          check: [function () { return narrator(2); }, povWhy],
          coach: '<p>Retell a family story three ways: "I...", "You...", "She...". Ask which felt closest, and which showed the most.</p>',
          mistake: '<p>Being fooled by "I" inside speech marks. Look at the words outside the quotes.</p>' }
      ]
    }],
    practice: [
      { id: 'understand', name: 'Understanding the text', code: 'C1.1, C2.6', gen: fact },
      { id: 'strategies', name: 'Reading strategies', code: 'C2.2, C2.3, C2.4', gen: predict },
      { id: 'forms', name: 'Forms and narrators', code: 'C1.2, C1.6', gen: form }
    ],
    tasks: [
      { id: 'know-before', title: 'What I already know', code: 'C2.1', pic: W.icon('think'), say: 'Before you read: what do you already know about this topic?',
        run: ['Choose a new information book together.', 'Before reading, the child lists what they know from their own life, other books, school and media.', 'After reading, ask: "What did you already know that helped? What was new?"'],
        rubric: ['Shares nothing they know yet.', 'Shares one thing with prompting.', 'Shares what they know from more than one place and links it to the text.', 'Uses what they know to ask sharp questions and to make sense of new ideas.'] },
      { id: 'connections', title: 'This connects to...', code: 'C2.5', pic: W.icon('people'), say: 'How does this text connect to your life, other texts, and the world?',
        run: ['After reading, ask for three connections: to the child' + '’' + 's life, to another book or show, and to something in the world.', 'Ask the child to explain how each one helps them understand the text.'],
        rubric: ['No connection yet.', 'One connection with help.', 'Clear connections of more than one kind, explained.', 'Thoughtful connections that deepen understanding of the text.'] },
      { id: 'indigenous-creators', title: 'Read a First Nations, Métis or Inuit creator', code: 'C1.7', pic: W.icon('read'), say: 'Read a book by a First Nations, Métis or Inuit author. Talk about it.',
        run: ['Ask your librarian for a novel, picture book, graphic novel or poetry by a First Nations, Métis or Inuit creator. Check the author note for their nation or community.',
          'Read it together. Ask: "What does this story teach about history, culture, relationships or the land? How does the creator tell it?"', 'If the creator shares their own Storywork (how stories teach in their community), talk about what that means.'],
        rubric: ['Recalls little of the text yet.', 'Retells parts with help.', 'Explains what the text shows about the community' + '’' + 's history, culture or lived experience.', 'Explains it respectfully, with evidence, and connects it to life today.'],
        coach: '<p>Choose texts by creators from the community they write about, and let the creator' + '’' + 's voice lead. Each nation and community is distinct.</p>' },
      { id: 'strategy-talk', title: 'What helped me understand?', code: 'C2.7', pic: W.icon('star'), say: 'Which strategy helped you most with this text?',
        run: ['After reading, show the strategies: visualize, predict, summarize, connect, reread.', 'The child names two that helped and explains when they used each one.'],
        rubric: ['Cannot name a strategy yet.', 'Names a strategy with help.', 'Names two strategies and when they helped.', 'Explains how the strategies worked together, with examples from the text.'] }
    ]
  });

  Q.shapes('reading', {
    understand: [[1, 'find-line', findLine], [1, 'main-idea', mainIdea], [1, 'summary', summary], [2, 'conclusion', conclude], [2, 'order', sequence]],
    strategies: [[1, 'clue', predictClue], [1, 'monitor', monitor], [1, 'choose', choose]],
    forms: [[1, 'form-job', formJob], [1, 'narrator', narrator], [2, 'match', matchForms], [2, 'pov-why', povWhy]]
  });
})();
