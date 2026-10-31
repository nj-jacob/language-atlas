/* Grade 1: planning writing.
   Ontario 2023 Language, Grade 1, D1 Developing Ideas and Organizing Content:
   D1.1 topic, purpose and audience for simple texts          D1.2 generating ideas, using lived experiences and other subjects
   D1.3 gathering information from a single source            D1.4 sorting and sequencing ideas for the text form
   D1.5 the strategies that helped them develop ideas (with a grown-up)
   All examples are written for this site. Answer checks: tests/verify/grade1-planning.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* [what you write, who reads it, why you write it] */
  var JOBS = [['a birthday card for Grandma', 'Grandma', 'to say happy birthday'], ['a thank-you note to your teacher', 'your teacher', 'to say thank you'],
    ['a sign for your lemonade stand', 'people walking by', 'to get people to buy'], ['the steps to make a paper boat', 'a friend who wants to make one', 'to tell how to do something'],
    ['a story about your dog', 'your class', 'to share a story'], ['a list of facts about owls', 'kids who want to learn', 'to share facts']];
  var WHY = JOBS.map(function (j) { return j[2]; });
  /* a topic, ideas that fit it, and ideas that do not */
  var TOPICS = [['My weekend', ['I went to the park.', 'We had pancakes.', 'I played with my cousin.'], ['Owls hunt at night.', 'The ocean is salty.']],
    ['Owls', ['Owls hunt at night.', 'Owls have big eyes.', 'Owls can turn their heads far.'], ['I went to the park.', 'My sister likes pizza.']],
    ['Winter', ['Snow falls.', 'We go skating.', 'Days are short.'], ['We swim in the lake.', 'Flowers bloom.']],
    ['My family', ['I have two brothers.', 'My mom is a nurse.', 'We speak Punjabi and English at home.'], ['Frogs lay eggs.', 'Rockets go to space.']]];
  /* where to find facts: [topic, a good source, poor sources] */
  var SOURCES = [['owls', 'a library book about owls', ['a cookbook', 'a book of jokes']], ['the planets', 'a book about space', ['a bus schedule', 'a colouring book']],
    ['maple trees', 'a book about trees', ['a menu', 'a toy catalogue']], ['how bees make honey', 'a video about bees from a nature centre', ['a cartoon about cars', 'a song about trains']]];
  /* steps in order, for a how-to text */
  var HOWTO = [['Brushing your teeth', ['Put toothpaste on the brush.', 'Brush every tooth.', 'Spit and rinse.']], ['Making a snowman', ['Roll a big ball.', 'Put a smaller ball on top.', 'Add eyes and a nose.']],
    ['Planting a seed', ['Fill a pot with soil.', 'Push in the seed.', 'Water it.']], ['Washing your hands', ['Wet your hands.', 'Rub on soap.', 'Rinse and dry.']]];

  /* ---------- question makers ---------- */
  function whoFor(lv) {
    var j = R.pick(JOBS);
    return Q.one('You are writing <b>' + j[0] + '</b>. Who will read it?', j[1], R.some(JOBS.filter(function (x) { return x !== j; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), {
      prompt: 'Who is it for?', hint: 'Think about who gets it.', explain: 'It is for <b>' + j[1] + '</b>.', meta: { k: 'g1-who-for', job: j[0] } });
  }
  function whyWrite(lv) {
    var j = R.pick(JOBS);
    return Q.one('Why would you write <b>' + j[0] + '</b>?', j[2], R.some(WHY.filter(function (w) { return w !== j[2]; }), lv > 1 ? 2 : 1), {
      hint: 'What do you want it to do?', explain: 'You write it <b>' + j[2] + '</b>.', meta: { k: 'g1-why-write', job: j[0] } });
  }
  function matchWhy() {
    var js = R.some(JOBS, 3);
    return { q: 'Match each piece of writing to why you write it.', type: 'match', pairs: js.map(function (j) { return [j[0], j[2]]; }), hint: 'What does each one do?', explain: 'Every piece of writing has a purpose.', meta: { k: 'g1-match-why' } };
  }
  function ideaFits(lv) {
    var t = R.pick(TOPICS);
    return Q.one('You are writing about <b>' + t[0] + '</b>. Which idea fits?', R.pick(t[1]), t[2].slice(0, lv > 1 ? 2 : 1), { prompt: 'Is it about ' + t[0].toLowerCase() + '?',
      hint: 'Keep to the topic.', explain: 'It is about ' + t[0].toLowerCase() + '.', meta: { k: 'g1-idea-fits', topic: t[0] } });
  }
  function pickIdeas() {
    var t = R.pick(TOPICS);
    return Q.all('You are writing about <b>' + t[0] + '</b>. Pick every idea that fits.', R.some(t[1], 2), t[2], { hint: 'Is each one about ' + t[0].toLowerCase() + '?', explain: 'Keep to the topic.', meta: { k: 'g1-pick-ideas', topic: t[0] } });
  }
  function source(lv) {
    var s = R.pick(SOURCES);
    return Q.one('You want facts about <b>' + s[0] + '</b>. Where should you look?', s[1], s[2].slice(0, lv > 1 ? 2 : 1), { hint: 'Find one place that is all about the topic.',
      explain: '<b>' + s[1] + '</b> has facts about ' + s[0] + '.', meta: { k: 'g1-source', topic: s[0] } });
  }
  function topicOf(lv) {
    var t = R.pick(TOPICS);
    return Q.one('What is the best title for these ideas?', t[0], R.some(TOPICS.filter(function (x) { return x !== t; }), lv > 1 ? 2 : 1).map(function (x) { return x[0]; }), {
      fig: t[1].map(function (i) { return W.sent(i); }).join(''), hint: 'What are all the ideas about?', explain: 'They are all about <b>' + t[0].toLowerCase() + '</b>.', meta: { k: 'g1-topic-of', topic: t[0] } });
  }
  function orderSteps() {
    var h = R.pick(HOWTO);
    return { q: 'Put the steps for <b>' + h[0].toLowerCase() + '</b> in order.', type: 'order', items: h[1].slice(), first: 'First', last: 'Last',
      hint: 'What do you do first? What do you do last?', explain: 'A how-to text goes step by step.', meta: { k: 'g1-order-steps', h: h[0] } };
  }

  Atlas.register('planning', {
    lessons: [{
      id: 'plan', title: 'Before you write', sub: 'Who it is for, why you write it, and what to say.',
      concepts: [
        { slug: 'who-why', title: 'Who is it for? Why write it?', exp: ['D1.1'], skill: 'purpose',
          model: [
            step(W.icon('write'), 'A birthday card for Grandma.'),
            step(W.icon('people'), 'For: Grandma.'),
            step(W.icon('star'), 'Why: to say happy birthday.')
          ],
          key: '<p>Topic, reader, reason: decide before you write.</p>',
          guided: [function () { return whoFor(1); }, function () { return whyWrite(1); }],
          check: [function () { return whoFor(2); }, matchWhy],
          coach: '<p>Before any writing, ask three questions: "What is it about? Who will read it? Why are you writing it?"</p>',
          mistake: '<p>Starting to write without knowing the reader. A card for Grandma sounds different from a sign for strangers.</p>' },
        { slug: 'ideas', title: 'Gather ideas that fit', exp: ['D1.2', 'D1.3'], skill: 'ideas',
          model: [
            step(W.sent('My weekend'), 'The topic.'),
            step(W.sent('I went to the park.') + W.sent('We had pancakes.'), 'Ideas from my own life.'),
            step(W.sent('Owls hunt at night.'), 'Not about my weekend. Leave it out.'),
            step(W.icon('read'), 'Need facts? Look in one good book about it.')
          ],
          guided: [function () { return ideaFits(1); }, function () { return source(1); }],
          check: [pickIdeas, function () { return source(2); }],
          coach: '<p>Let the child draw or talk first, then write. A quick drawing is a great plan for a Grade 1 writer.</p>',
          mistake: '<p>Adding ideas about something else. Ask: "Is that about your topic?"</p>' },
        { slug: 'order', title: 'Put your ideas in order', exp: ['D1.4'], skill: 'ideas',
          model: [
            step(W.sent('Spit and rinse.') + W.sent('Put toothpaste on the brush.') + W.sent('Brush every tooth.'), 'Mixed up.'),
            step(W.sent('1. Put toothpaste on the brush.') + W.sent('2. Brush every tooth.') + W.sent('3. Spit and rinse.'), 'Step by step.')
          ],
          guided: [orderSteps, orderSteps],
          check: [orderSteps, orderSteps],
          coach: '<p>Write each idea on a sticky note. Move the notes around until they are in order, then write.</p>',
          mistake: '<p>Writing ideas in the order they come to mind. Read them back and ask: "What comes first?"</p>' }
      ]
    }],
    practice: [
      { id: 'purpose', name: 'Who and why', code: 'D1.1', gen: whoFor },
      { id: 'ideas', name: 'Ideas and order', code: 'D1.2, D1.3, D1.4', gen: ideaFits }
    ],
    tasks: [
      { id: 'idea-list', title: 'My idea list', code: 'D1.2', pic: W.icon('think'), say: 'Draw or write three things you could write about.', write: true,
        run: ['Talk about things the child knows well: family, pets, trips, a game, something from Science.', 'The child draws or writes three topic ideas, and circles one to write about.'],
        rubric: ['No ideas yet.', 'One idea with help.', 'Three ideas from their own life or learning.', 'Three ideas, and explains why they picked one.'] },
      { id: 'one-book', title: 'Find facts in one book', code: 'D1.3', pic: W.icon('read'), say: 'Find two facts in a book. Tell or write them.', write: true,
        run: ['Choose one information book on a topic the child likes.', 'Read together. The child finds two facts and tells or writes them in their own words.'],
        rubric: ['Does not find a fact yet.', 'Finds one fact with help.', 'Finds two facts in the book.', 'Finds facts and says them in their own words.'] },
      { id: 'what-helped', title: 'What helped me get ideas?', code: 'D1.5', pic: W.icon('star'), say: 'Tell what helped you think of ideas.',
        run: ['After planning, ask: "What helped you think of ideas? Drawing? Talking? A book?"'],
        rubric: ['Cannot say yet.', 'Names something with prompting.', 'Names a strategy that helped.', 'Names it and explains how it helped.'] }
    ]
  });

  Q.shapes('planning', {
    purpose: [[1, 'why', whyWrite], [1, 'match', matchWhy], [1, 'topic', topicOf]],
    ideas: [[1, 'pick', pickIdeas], [1, 'source', source], [1, 'order', orderSteps]]
  });
})();
