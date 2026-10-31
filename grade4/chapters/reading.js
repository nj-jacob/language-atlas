/* Grade 4: reading for meaning.
   Ontario 2023 Language, Grade 4, Strand C (Comprehension):
   C1.1 read and comprehend various texts               C1.2 characteristics of text forms and genres, and how they help communicate meaning
   C1.6 the narrator's point of view (first, second or third person), and the advantages and disadvantages of each
   C2.2 purposes for reading, and choosing texts that suit them    C2.3 predictions from evidence, and questions to check them
   C2.4 strategies to monitor and confirm understanding (adjusting rate, visualizing, reading ahead, asking questions, consulting references)
   C2.6 the main idea and supporting details in sequence, and a simple conclusion
   With a grown-up: C1.7 texts by First Nations, Metis and Inuit creators, C2.1 prior knowledge, C2.5 connections, C2.7 which strategies helped.
   Passages are in ../texts.js. Answer checks: tests/verify/grade4-reading.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts, AP = '’';
  function body(t) { return t.lines.filter(function (l) { return l.charAt(0) !== '#'; }); }

  /* ---------- understanding ---------- */
  function fact(lv) {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts);
    return Q.one(f[0], f[1], f.slice(2, lv > 1 ? 4 : 3), { fig: T.show(t), prompt: 'Find the sentence that tells you.', hint: 'Look back in the text. The answer is there.',
      explain: 'The text says: <b>' + f[1] + '</b>.', meta: { k: 'g4-fact', t: t.title, q: f[0] } });
  }
  function findLine() {
    var t = R.pick(T.list('facts')), f = R.pick(t.facts), lines = body(t), right = lines.filter(function (l) { return l.indexOf(f[4]) >= 0; })[0];
    return Q.one('Which sentence answers this? <b>' + f[0] + '</b>', right, R.some(lines.filter(function (l) { return l !== right; }), 2), { fig: T.show(t),
      hint: 'Which sentence has the answer in it?', explain: W.sent(right), meta: { k: 'g4-find-line', t: t.title, q: f[0] } });
  }
  function mainIdea(lv) {
    var t = R.pick(T.list('main'));
    return Q.one('What is this text <b>mostly</b> about?', t.main[0], t.main.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which answer fits the whole text, not just one part?',
      hint: 'The main idea is about the whole text.', explain: t.main[0], meta: { k: 'g4-main', t: t.title } });
  }
  function support() {
    var t = R.pick(T.list('details'));
    return Q.one('Which detail <b>supports</b> the main idea?', R.pick(t.details.yes), R.some(t.details.no, 2), { fig: T.show(t) + W.sent('<b>Main idea:</b> ' + t.main[0]),
      hint: 'A supporting detail is in the text and tells more about the main idea.', explain: 'It comes from the text and backs up the main idea.', meta: { k: 'g4-support', t: t.title } });
  }
  function supportPick() {
    var t = R.pick(T.list('details'));
    return Q.all('Pick every detail that supports the main idea.', R.some(t.details.yes, 2), R.some(t.details.no, 2), { fig: T.show(t) + W.sent('<b>Main idea:</b> ' + t.main[0]),
      hint: 'Is it in the text? Does it tell more about the main idea?', explain: 'Supporting details come from the text.', meta: { k: 'g4-support-pick', t: t.title } });
  }
  function conclude(lv) {
    var t = R.pick(T.list('conclusion'));
    return Q.one('What can you <b>conclude</b> from this text?', t.conclusion[0], t.conclusion.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Which one do the facts lead to?',
      hint: 'A conclusion is what the facts add up to.', explain: t.conclusion[0], meta: { k: 'g4-conclude', t: t.title } });
  }
  function sequence(lv) {
    var t = R.pick(T.list('order')), ev = lv < 2 ? t.order.slice(0, 3) : t.order;
    return { q: 'Put these in the order they happen in the text.', fig: T.show(t), type: 'order', items: ev.map(function (e) { return '“' + e + '”'; }), first: 'First', last: 'Last',
      hint: 'Find each part in the text. Which comes first?', explain: 'They come in this order in the text.', meta: { k: 'g4-order', t: t.title } };
  }

  /* ---------- strategies ---------- */
  function predict() {
    var t = R.pick(T.list('predict')), p = t.predict;
    return Q.one('What will <b>most likely</b> happen next?', p.right, p.wrong, { fig: T.show(t, p.upTo), prompt: 'Look for a clue: <b>' + p.clue + '</b>.',
      hint: 'Use a clue from the text and what you know.', explain: 'The clue: <mark class="hl">' + p.clue + '</mark>.', meta: { k: 'g4-predict', t: t.title } });
  }
  function checkPredict() {
    var ts = T.list('predict'), t = R.pick(ts), others = ts.filter(function (x) { return x !== t; }).map(function (x) { return x.predict.check; });
    return Q.one('You predict: <b>' + t.predict.right + '</b> After reading on, which question checks your prediction?', t.predict.check, R.some(others, 2), { fig: T.show(t, t.predict.upTo),
      hint: 'The question should ask about what you predicted.', explain: 'Read on, then ask: <b>' + t.predict.check + '</b>', meta: { k: 'g4-check-predict', t: t.title } });
  }
  /* [a moment while reading, the strategy that fits] */
  /* [a moment while reading, the strategy that fits, the same two said short for matching] */
  var FIX = [['You do not know what <b>migrate</b> means.', 'Look it up in a glossary or dictionary.', 'A new word', 'Look it up'],
    ['A part is packed with new facts.', 'Slow down and reread it.', 'Lots of new facts', 'Slow down, reread'],
    ['You cannot picture the place in the story.', 'Make a picture in your mind.', 'Cannot picture it', 'Make a mind picture'],
    ['A word is unclear, but the next sentence might explain it.', 'Read ahead to see if it is explained.', 'Explained later?', 'Read ahead'],
    ['You want to know more than the text says.', 'Check another book or website.', 'Want to know more', 'Check another source'],
    ['You are confused about why a character did something.', 'Ask a question and look for the answer.', 'Confused about why', 'Ask a question']];
  function monitor(lv) {
    var f = R.pick(FIX);
    return Q.one('What could you do?', f[1], R.some(FIX.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), { fig: W.means('read', f[0]),
      prompt: 'What is the problem: a word, a fact, a picture, or a reason?', hint: 'Match the fix to the problem.', explain: f[1], meta: { k: 'g4-monitor', s: f[0] } });
  }
  function monitorMatch() {
    var fs = R.some(FIX, 3);
    return { q: 'Match each problem to a strategy that fixes it.', type: 'match', pairs: fs.map(function (f) { return [f[2], f[3]]; }), hint: 'What is each problem about?', explain: 'Good readers notice when they are lost, and fix it.', meta: { k: 'g4-monitor-match' } };
  }
  /* [what you want, the text to choose] */
  var CHOOSE = [['learn how to make something', 'lantern'], ['learn facts about butterflies', 'monarchs'], ['enjoy a story with a lesson', 'crow'], ['read someone' + AP + 's opinion', 'pool'], ['enjoy a poem', 'maple']];
  function choose() {
    var c = R.pick(CHOOSE), wrong = R.some(CHOOSE.filter(function (x) { return x !== c; }), 2).map(function (x) { return T[x[1]].title; });
    return Q.tiles('You want to <b>' + c[0] + '</b>. Which would you choose?', T[c[1]].title, wrong, { hint: 'What does each title tell you about the text?', explain: '<b>' + T[c[1]].title + '</b> fits that purpose.', meta: { k: 'g4-choose', want: c[0] } });
  }
  function purpose() {
    var t = R.pick(T.list('purpose')), all = ['to enjoy a story', 'to learn facts', 'to learn how to do something', 'to hear an opinion', 'to enjoy a poem', 'to learn a lesson from a story'];
    return Q.one('Why would you read this?', t.purpose, R.some(all.filter(function (p) { return p !== t.purpose; }), 2), { fig: T.show(t),
      hint: 'Is it a story, facts, steps, a poem, or someone' + AP + 's opinion?', explain: 'You would read it <b>' + t.purpose + '</b>.', meta: { k: 'g4-purpose', t: t.title } });
  }

  /* ---------- kinds of texts and narrators ---------- */
  var KINDS = ['story', 'fable', 'information', 'poem', 'instructions', 'letter'];
  var FEATURE = { story: 'characters, a problem and events', fable: 'animals who act like people, and a lesson', information: 'headings and facts', poem: 'short lines and pictures in words',
    instructions: 'materials and numbered steps', letter: 'a greeting and a closing' };
  function form(lv) {
    var t = R.pick(T.list('kind'));
    return Q.tiles('What kind of text is this?', t.kind, R.some(KINDS.filter(function (k) { return k !== t.kind; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Look at how it is built: headings, steps, "Dear", short lines, or talking animals?', explain: 'It has ' + FEATURE[t.kind] + ': <b>' + t.kind + '</b>.', meta: { k: 'g4-form', t: t.title } });
  }
  function formFeature() {
    var ks = R.some(KINDS, 3);
    return { q: 'Match each kind of text to what it usually has.', type: 'match', pairs: ks.map(function (k) { return [k, FEATURE[k]]; }), hint: 'Picture one of each.', explain: 'Each kind of text has its own features, and they help you read it.', meta: { k: 'g4-form-feature' } };
  }
  var STORIES = function () { return T.list('pov').filter(function (t) { return t.kind === 'story' || t.kind === 'fable'; }); };
  var POV = { first: 'first person (I)', second: 'second person (you)', third: 'third person (he, she, they)' };
  function narrator() {
    var t = R.pick(STORIES()), tiles = [POV.first, POV.second, POV.third];
    return { q: 'Who is telling this story?', fig: T.show(t), type: 'tap', tiles: tiles, answer: ['first', 'second', 'third'].indexOf(t.pov),
      prompt: 'Look at the words outside the speech marks: I, you, or he, she and they?', hint: 'I: first. You: second. He, she, they: third.', explain: 'It is told in the <b>' + POV[t.pov] + '</b>.', meta: { k: 'g4-narrator', t: t.title } };
  }
  /* [point of view, an advantage, a disadvantage] */
  var WHY = [['first person', 'You know what the narrator thinks and feels.', 'You only know what the narrator knows.'],
    ['second person', 'It puts you, the reader, in the story.', 'It can feel strange to be told what you do.'],
    ['third person', 'You can follow several characters.', 'You may not know what each character thinks.']];
  function povGood() {
    var w = R.pick(WHY), others = WHY.filter(function (x) { return x !== w; });
    return Q.one('What is good about a story told in the <b>' + w[0] + '</b>?', w[1], others.map(function (x) { return x[1]; }), { hint: 'Think about what the reader can know.', explain: w[0].charAt(0).toUpperCase() + w[0].slice(1) + ': ' + w[1], meta: { k: 'g4-pov-good', pov: w[0] } });
  }
  function povMatch() {
    return { q: 'Match each point of view to a <b>drawback</b>.', type: 'match', pairs: WHY.map(function (w) { return [w[0], w[2]]; }), hint: 'What can the reader not know or feel?', explain: 'Every point of view has good points and drawbacks.', meta: { k: 'g4-pov-match' } };
  }

  var storm = T.storm;
  Atlas.register('reading', {
    lessons: [{
      id: 'understand', title: 'Understanding what you read', sub: 'Facts, main ideas, details and conclusions.',
      concepts: [
        { slug: 'find', title: 'Find it in the text', exp: ['C1.1'], skill: 'understand',
          model: [
            step(T.show(storm), 'Read the story.'),
            step(W.sent('How did Amara get to the arena?'), 'A question.'),
            step(W.sent('When the bus finally came, Amara <mark class="hl">rode it to the arena</mark>.'), 'Look back. Find the sentence.')
          ],
          guided: [function () { return fact(1); }, findLine],
          check: [function () { return fact(2); }, findLine],
          coach: '<p>Ask the child to put a finger on the sentence that proves the answer before choosing. Looking back is a skill, not cheating.</p>',
          mistake: '<p>Answering from memory. Always point to the words in the text.</p>' },
        { slug: 'main-details', title: 'The main idea and its details', exp: ['C2.6'], skill: 'understand',
          model: [
            step(T.show(T.monarchs), 'What is it mostly about?'),
            step(W.sent('Monarchs travel far and need milkweed, and people can help them.'), 'The main idea fits all three parts.'),
            step(W.sent('Some fly more than 4000 km.'), 'A supporting detail tells more.'),
            step(W.sent('Mexico is a large country.'), 'True, but not from this text: not support.')
          ],
          guided: [function () { return mainIdea(1); }, support],
          check: [function () { return mainIdea(2); }, supportPick],
          coach: '<p>Use a hand: the palm is the main idea, the fingers are details. "Does this finger hold up the palm?"</p>',
          mistake: '<p>Choosing a detail they found interesting as the main idea. Check that it fits every part of the text.</p>' },
        { slug: 'conclude', title: 'Draw a conclusion', exp: ['C2.6'], skill: 'understand',
          model: [
            step(W.sent('Fewer milkweed plants, so fewer monarchs.'), 'A fact.'),
            step(W.sent('People can help by planting milkweed.'), 'Another fact.'),
            step(W.sent('Planting milkweed can help more monarchs survive.'), 'What they add up to: a conclusion.')
          ],
          guided: [function () { return conclude(1); }, function () { return sequence(1); }],
          check: [function () { return conclude(2); }, function () { return sequence(2); }],
          coach: '<p>After reading, ask: "So what? What do all these facts tell us?"</p>',
          mistake: '<p>Choosing something the text never says. A conclusion must be backed by the facts.</p>' }
      ]
    }, {
      id: 'strategies', title: 'Reading strategies', sub: 'Predict and check, fix it when you are lost, and choose a text.',
      concepts: [
        { slug: 'predict', title: 'Predict, then check', exp: ['C2.3'], skill: 'strategies',
          model: [
            step(T.show(T.fair, 4), 'Stop and think.'),
            step(W.sent('I took a deep breath and <mark class="hl">picked up the bottle of vinegar</mark>.'), 'A clue.'),
            step(W.sent('The narrator will pour the vinegar.'), 'A prediction.'),
            step(W.sent('Did the narrator pour the vinegar?'), 'Read on. Ask a question to check.')
          ],
          guided: [predict, checkPredict],
          check: [predict, checkPredict],
          coach: '<p>Stop at an exciting part and ask: "What will happen? What made you think so? What will you look for to check?"</p>',
          mistake: '<p>Changing the prediction to match the ending. It is fine to be wrong; good readers check and adjust.</p>' },
        { slug: 'monitor', title: 'Fix it when you are lost', exp: ['C2.4'], skill: 'strategies',
          model: [
            step(W.means('read', 'Packed with new facts?'), 'Slow down and reread.'),
            step(W.means('read', 'A word you do not know?'), 'Read ahead, or look it up.'),
            step(W.means('think', 'Cannot picture it?'), 'Make a picture in your mind.')
          ],
          guided: [function () { return monitor(1); }, monitorMatch],
          check: [function () { return monitor(2); }, monitorMatch],
          coach: '<p>Model it aloud: "Wait, I lost track. I will slow down and reread." Praise the child each time they stop to fix it.</p>',
          mistake: '<p>Reading on when meaning is lost. Stop at the end of each part and ask: "What did I just read?"</p>' },
        { slug: 'choose', title: 'Choose a text for your purpose', exp: ['C2.2'], skill: 'strategies',
          model: [
            step(W.means('think', 'I want to make a paper lantern.')),
            step(W.sent('How to Make a Paper Lantern'), 'Instructions fit that purpose.'),
            step(W.sent('The Old Maple'), 'A poem is for enjoying, not for making.')
          ],
          guided: [choose, purpose],
          check: [choose, purpose],
          coach: '<p>At the library, set a purpose first ("I want to learn about wolves") and choose two books that fit it.</p>',
          mistake: '<p>Choosing by the cover alone. Read the title and a page to check it suits your purpose.</p>' }
      ]
    }, {
      id: 'kinds', title: 'Kinds of texts', sub: 'Genres and who is telling the story.',
      concepts: [
        { slug: 'forms', title: 'Each kind of text has its features', exp: ['C1.2'], skill: 'forms',
          model: [
            step(T.show(T.lantern), 'Materials and numbered steps: <b>instructions</b>.'),
            step(T.show(T.crow, 2), 'Animals who act like people, and a lesson: a <b>fable</b>.'),
            step(T.show(T.pool, 2), '"Dear": a <b>letter</b>.')
          ],
          key: '<p>The features tell you how to read it: steps in order, facts to learn, or a lesson to find.</p>',
          guided: [function () { return form(1); }, formFeature],
          check: [function () { return form(2); }, formFeature],
          coach: '<p>Sort a pile of real texts (a recipe, a flyer, a picture book, a letter) by kind, and name a feature of each.</p>',
          mistake: '<p>Calling every text a "story". A story has characters and events; information has facts and headings.</p>' },
        { slug: 'narrator', title: 'First, second or third person', exp: ['C1.6'], skill: 'forms',
          model: [
            step(W.sent('<b>I</b> carried <b>my</b> volcano into the gym.'), 'First person: the narrator is in the story.'),
            step(W.sent('<b>You</b> click your boots into the skis.'), 'Second person: you are in the story.'),
            step(W.sent('<b>Amara</b> called home.'), 'Third person: the narrator is outside the story.')
          ],
          guided: [narrator, povGood],
          check: [narrator, povMatch],
          coach: '<p>Retell a scene three ways: "I ran...", "You run...", "She ran..." Ask which feels closest, and which shows the most characters.</p>',
          mistake: '<p>Being fooled by "I" or "you" inside speech marks. Look at the words outside the speech marks.</p>' }
      ]
    }],
    practice: [
      { id: 'understand', name: 'Understanding what you read', code: 'C1.1, C2.6', gen: fact },
      { id: 'strategies', name: 'Reading strategies', code: 'C2.2, C2.3, C2.4', gen: predict },
      { id: 'forms', name: 'Kinds of texts and narrators', code: 'C1.2, C1.6', gen: form }
    ],
    tasks: [
      { id: 'before', title: 'What I already know', code: 'C2.1', pic: W.icon('think'), say: 'Before you read, tell what you already know about the topic, and where you learned it.',
        run: ['Choose a new information book together.', 'Ask: "What do you already know about this? Where did you learn it: a trip, a show, another book, family?"', 'After reading, ask: "How did what you knew help you understand it?"'],
        rubric: ['Does not connect what they know, even with prompts.', 'Shares something they know with prompting.', 'Explains what they know and where it came from, and links it to the text.', 'Uses several sources of what they know to ask questions and make sense of the text.'] },
      { id: 'connect', title: 'Connections', code: 'C2.5', pic: W.icon('people'), say: 'How does this text connect to your life, another text, and the world?',
        run: ['After reading, ask: "Does this remind you of something in your life? In another book? In the news?"', 'Ask the child to explain how the two are alike and how they are different.'],
        rubric: ['No connection yet.', 'Makes a connection with help.', 'Explains a clear connection to self, another text or the world.', 'Explains several connections and how they deepen understanding.'] },
      { id: 'indigenous-creators', title: 'Stories by First Nations, Métis and Inuit creators', code: 'C1.7', pic: W.icon('read'), say: 'Read, listen to or watch a story by a First Nations, Métis or Inuit creator. Talk about what it teaches.',
        run: ['Ask your librarian for a book, recorded story or short film by a First Nations, Métis or Inuit creator. Check the author note to learn which community or nation they are from.',
          'Read, listen or watch together. Ask: "What does this story teach about the people, the land, relationships or history?"', 'Talk about how the story connects to life today.'],
        rubric: ['Recalls little of the story yet.', 'Retells some of it with help.', 'Retells it and explains something it teaches about the community, culture or history.', 'Explains what it teaches, connects it to life today, and speaks respectfully about the creator' + AP + 's community.'],
        coach: '<p>Choose creators who write about their own nation or community. Indigenous Storywork is about listening with respect: let the story lead, and use the author notes.</p>' },
      { id: 'what-helped', title: 'Which strategies helped me?', code: 'C2.7', pic: W.icon('star'), say: 'Which strategy helped you most today: picturing it, predicting, summarizing, or connecting?',
        run: ['After reading, show the strategies: picture it, predict, summarize, connect.', 'Ask: "Which one helped you today? Show me where in the text."'],
        rubric: ['Cannot name a strategy yet.', 'Names a strategy with help.', 'Names a strategy and explains where it helped.', 'Explains how two strategies helped, with examples from the text.'] }
    ]
  });

  Q.shapes('reading', {
    understand: [[1, 'find-line', findLine], [1, 'main-idea', mainIdea], [1, 'support', support], [1, 'conclude', conclude], [1, 'order', sequence], [2, 'pick-support', supportPick]],
    strategies: [[1, 'check', checkPredict], [1, 'fix-up', monitor], [1, 'choose', choose], [1, 'purpose', purpose], [2, 'match', monitorMatch]],
    forms: [[1, 'narrator', narrator], [1, 'pov-good', povGood], [1, 'features', formFeature], [2, 'pov-drawback', povMatch]]
  });
})();
