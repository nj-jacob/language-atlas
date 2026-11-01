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
    ['a story about your dog', 'your class', 'to share a story'], ['a list of facts about owls', 'kids who want to learn', 'to share facts'],
    ['an invitation to your party', 'your friends', 'to invite people'], ['a get-well card for your cousin', 'your cousin', 'to help someone feel better'],
    ['a label for the class fish tank', 'visitors to your classroom', 'to tell what something is'], ['a poem about the first snow', 'your family', 'to share a feeling'],
    ['a note to remind Dad to buy milk', 'Dad', 'to remind someone'], ['a grocery list', 'whoever does the shopping', 'to remember what to buy']];
  /* a topic, ideas that fit it, and ideas that do not */
  var TOPICS = [['My weekend', ['I went to the park.', 'We had pancakes.', 'I played with my cousin.'], ['Owls hunt at night.', 'The ocean is salty.']],
    ['Owls', ['Owls hunt at night.', 'Owls have big eyes.', 'Owls can turn their heads far.'], ['I went to the park.', 'My sister likes pizza.']],
    ['Winter', ['Snow falls.', 'We go skating.', 'Days are short.'], ['We swim in the lake.', 'Flowers bloom.']],
    ['My family', ['I have two brothers.', 'My mom is a nurse.', 'We speak Punjabi and English at home.'], ['Frogs lay eggs.', 'Rockets go to space.']],
    ['Frogs', ['Frogs lay eggs.', 'Tadpoles grow into frogs.', 'Frogs catch bugs with their tongues.'], ['We go skating.', 'My mom is a nurse.']],
    ['My school', ['My teacher reads to us.', 'We play tag at recess.', 'Our class has a fish.'], ['Snow falls.', 'Owls have big eyes.']],
    ['Summer', ['We swim in the lake.', 'It is hot.', 'We eat outside.'], ['Days are short.', 'We go skating.']],
    ['Our garden', ['We grow beans.', 'Worms help the soil.', 'I water the plants.'], ['Rockets go to space.', 'We play tag at recess.']]];
  /* where to find facts: [topic, a good source, poor sources] */
  var SOURCES = [['owls', 'a library book about owls', ['a cookbook', 'a book of jokes']], ['the planets', 'a book about space', ['a bus schedule', 'a colouring book']],
    ['maple trees', 'a book about trees', ['a menu', 'a toy catalogue']], ['how bees make honey', 'a video about bees from a nature centre', ['a cartoon about cars', 'a song about trains']],
    ['beavers', 'a book about Canadian animals', ['a book of riddles', 'a calendar']], ['the weather', 'a weather report', ['a storybook about a dragon', 'a shopping list']],
    ['frogs', 'a book about ponds', ['a hockey card', 'a phone book']], ['how canoes are made', 'an Elder who builds canoes', ['a comic about robots', 'a recipe card']]];
  /* steps in order, for a how-to text */
  var HOWTO = [['Brushing your teeth', ['Put toothpaste on the brush.', 'Brush every tooth.', 'Spit and rinse.']], ['Making a snowman', ['Roll a big ball.', 'Put a smaller ball on top.', 'Add eyes and a nose.']],
    ['Planting a seed', ['Fill a pot with soil.', 'Push in the seed.', 'Water it.']], ['Washing your hands', ['Wet your hands.', 'Rub on soap.', 'Rinse and dry.']],
    ['Making toast', ['Put bread in the toaster.', 'Push the lever down.', 'Spread butter on the toast.']], ['Getting ready for snow', ['Put on your snow pants.', 'Put on your boots.', 'Pull on your mitts.']],
    ['Feeding a cat', ['Get the cat bowl.', 'Fill it with food.', 'Put it on the floor.']], ['Sending a letter', ['Write the letter.', 'Put it in an envelope.', 'Drop it in the mailbox.']],
    ['Making a sandwich', ['Lay out two slices of bread.', 'Add cheese and lettuce.', 'Put the top slice on.']], ['Reading a book', ['Look at the cover.', 'Read each page.', 'Tell what you liked.']]];

  function cap(x) { return x.charAt(0).toUpperCase() + x.slice(1); }
  function distinct(list, i) { return list.filter(function (x, n) { return list.map(function (y) { return y[i]; }).indexOf(x[i]) === n; }); }

  /* ---------- question makers: who and why ---------- */
  function whoFor(lv) {
    var j = R.pick(JOBS);
    return Q.one('You are writing <b>' + j[0] + '</b>. Who will read it?', j[1], R.some(JOBS.filter(function (x) { return x !== j; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), {
      prompt: 'Who is it for?', hint: 'Think about who gets it.', explain: 'It is for <b>' + j[1] + '</b>.', meta: { k: 'g1-who-for', job: j[0] } });
  }
  function whyWrite(lv) {
    var j = R.pick(JOBS), why = distinct(JOBS, 2).map(function (x) { return x[2]; });
    return Q.one('Why would you write <b>' + j[0] + '</b>?', j[2], R.some(why.filter(function (w) { return w !== j[2]; }), lv > 1 ? 2 : 1), {
      hint: 'What do you want it to do?', explain: 'You write it <b>' + j[2] + '</b>.', meta: { k: 'g1-why-write', job: j[0] } });
  }
  function matchWhy() {
    var js = R.some(distinct(JOBS, 2), 3);
    return { q: 'Match each piece of writing to why you write it.', type: 'match', pairs: js.map(function (j) { return [j[0], j[2]]; }), hint: 'What does each one do?', explain: 'Every piece of writing has a purpose.', meta: { k: 'g1-match-why' } };
  }
  function purposeTf() {
    var j = R.pick(JOBS), said = R.pick([j, R.pick(JOBS)]), right = said[2] === j[2];
    return { q: 'True or false?', fig: W.means('write', 'You write ' + j[0] + ' <b>' + said[2] + '</b>.'), type: 'tf', answer: right,
      why: { options: ['That is what it is for.', 'It is for something else.'], answer: right ? 0 : 1 }, hint: 'What do you want it to do?', explain: cap(j[0]) + ': <b>' + j[2] + '</b>.', meta: { k: 'g1-write-why-tf', job: j[0], said: said[2] } };
  }

  /* ---------- question makers: ideas and sources ---------- */
  function ideaFits(lv) {
    var t = R.pick(TOPICS);
    return Q.one('You are writing about <b>' + t[0] + '</b>. Which idea fits?', R.pick(t[1]), t[2].slice(0, lv > 1 ? 2 : 1), { prompt: 'Is it about ' + t[0].toLowerCase() + '?',
      hint: 'Keep to the topic.', explain: 'It is about ' + t[0].toLowerCase() + '.', meta: { k: 'g1-idea-fits', topic: t[0] } });
  }
  function pickIdeas() {
    var t = R.pick(TOPICS), n = R.int(1, 3);
    return Q.all('You are writing about <b>' + t[0] + '</b>. Pick every idea that fits.', R.some(t[1], n), R.some(t[2], Math.min(2, 4 - n)), { hint: 'Is each one about ' + t[0].toLowerCase() + '?', explain: 'Keep to the topic.', meta: { k: 'g1-pick-ideas', topic: t[0] } });
  }
  function ideaTf() {
    var t = R.pick(TOPICS), right = R.int(0, 1) === 1, idea = R.pick(right ? t[1] : t[2]);
    return { q: 'You are writing about <b>' + t[0] + '</b>. Does this idea fit?', fig: W.sent(idea), type: 'tf', answer: right,
      why: { options: ['It is about the topic.', 'It is about something else.'], answer: right ? 0 : 1 }, hint: 'Keep to the topic.', explain: right ? 'Yes: keep it.' : 'No: leave it out.', meta: { k: 'g1-idea-tf', topic: t[0], idea: idea } };
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

  /* ---------- question makers: order ---------- */
  function orderSteps() {
    var h = R.pick(HOWTO);
    return { q: 'Put the steps for <b>' + h[0].toLowerCase() + '</b> in order.', type: 'order', items: h[1].slice(), first: 'First', last: 'Last',
      hint: 'What do you do first? What do you do last?', explain: 'A how-to text goes step by step.', meta: { k: 'g1-order-steps', h: h[0] } };
  }
  function firstStep(lv) {
    var h = R.pick(HOWTO), last = R.int(0, 1) === 1 && lv > 1;
    return Q.one('<b>' + h[0] + '</b>: what do you do <b>' + (last ? 'last' : 'first') + '</b>?', h[1][last ? 2 : 0], last ? h[1].slice(0, 2) : h[1].slice(1), {
      hint: 'Act it out in your head.', explain: h[1].map(function (x, i) { return W.sent((i + 1) + '. ' + x); }).join(''), meta: { k: 'g1-first-step', h: h[0], last: last } });
  }
  function nextStep() {
    var h = R.pick(HOWTO), i = R.int(0, 1);
    return Q.one('<b>' + h[0] + '</b>. What comes next?', h[1][i + 1], [h[1][i === 0 ? 2 : 0]], { fig: W.sent((i + 1) + '. ' + h[1][i]) + W.sent((i + 2) + '. ' + W.gap()),
      hint: 'What has to happen before the last step?', explain: h[1].map(function (x, n) { return W.sent((n + 1) + '. ' + x); }).join(''), meta: { k: 'g1-next-step', h: h[0], after: h[1][i] } });
  }
  function orderTf() {
    var h = R.pick(HOWTO), right = R.int(0, 1) === 1, shown = right ? h[1].slice() : [h[1][1], h[1][0], h[1][2]];
    if (!right && R.int(0, 1)) shown = [h[1][0], h[1][2], h[1][1]];
    return { q: 'Are the steps for <b>' + h[0].toLowerCase() + '</b> in order?', fig: shown.map(function (x, i) { return W.sent((i + 1) + '. ' + x); }).join(''), type: 'tf', answer: right,
      why: { options: ['Each step comes after the one it needs.', 'A step comes too soon.'], answer: right ? 0 : 1 }, hint: 'Act it out in your head.',
      explain: h[1].map(function (x, i) { return W.sent((i + 1) + '. ' + x); }).join(''), meta: { k: 'g1-order-tf', h: h[0], shown: shown.join('|') } };
  }

  Atlas.register('planning', {
    full: true,
    lessons: [{
      id: 'plan', title: 'Before you write', sub: 'Who it is for, why you write it, and what to say.',
      concepts: [
        { slug: 'who-why', title: 'Who is it for? Why write it?', exp: ['D1.1'], skill: 'purpose',
          model: [
            step(W.icon('write'), 'A birthday card for Grandma.'),
            step(W.icon('people'), 'For: Grandma.'),
            step(W.icon('star'), 'Why: to say happy birthday.'),
            step(W.icon('write'), 'A sign for a lemonade stand.'),
            step(W.icon('people'), 'For: people walking by. Why: to get them to buy.')
          ],
          key: '<p>Topic, reader, reason: decide before you write.</p>',
          guided: [function () { return whoFor(1); }, function () { return whyWrite(1); }, purposeTf],
          check: [function () { return whoFor(2); }, matchWhy, function () { return whyWrite(2); }, purposeTf, function () { return whoFor(2); }],
          coach: '<p>Before any writing, ask three questions: "What is it about? Who will read it? Why are you writing it?"</p>',
          mistake: '<p>Starting to write without knowing the reader. A card for Grandma sounds different from a sign for strangers.</p>' },
        { slug: 'ideas', title: 'Gather ideas that fit', exp: ['D1.2', 'D1.3'], skill: 'ideas',
          model: [
            step(W.sent('My weekend'), 'The topic.'),
            step(W.sent('I went to the park.') + W.sent('We had pancakes.'), 'Ideas from my own life.'),
            step(W.sent('Owls hunt at night.'), 'Not about my weekend. Leave it out.'),
            step(W.icon('read') + W.sent('a book about Canadian animals'), 'Need facts about beavers? Look here.')
          ],
          guided: [function () { return ideaFits(1); }, function () { return source(1); }, ideaTf],
          check: [pickIdeas, function () { return source(2); }, function () { return topicOf(2); }, ideaTf, function () { return ideaFits(2); }],
          coach: '<p>Let the child draw or talk first, then write. A quick drawing is a great plan for a Grade 1 writer.</p>',
          mistake: '<p>Adding ideas about something else. Ask: "Is that about your topic?"</p>' },
        { slug: 'order', title: 'Put your ideas in order', exp: ['D1.4'], skill: 'order-ideas',
          model: [
            step(W.sent('Spit and rinse.') + W.sent('Put toothpaste on the brush.') + W.sent('Brush every tooth.'), 'Mixed up.'),
            step(W.sent('1. Put toothpaste on the brush.') + W.sent('2. Brush every tooth.') + W.sent('3. Spit and rinse.'), 'Step by step.'),
            step(W.sent('Add eyes and a nose.') + W.sent('Roll a big ball.') + W.sent('Put a smaller ball on top.'), 'What has to come first?'),
            step(W.sent('1. Roll a big ball.') + W.sent('2. Put a smaller ball on top.') + W.sent('3. Add eyes and a nose.'), 'Each step needs the one before.')
          ],
          guided: [orderSteps, function () { return firstStep(1); }, orderTf],
          check: [orderSteps, nextStep, function () { return firstStep(2); }, orderTf, orderSteps],
          coach: '<p>Write each idea on a sticky note. Move the notes around until they are in order, then write.</p>',
          mistake: '<p>Writing ideas in the order they come to mind. Read them back and ask: "What comes first?"</p>' }
      ]
    }],
    practice: [
      { id: 'purpose', name: 'Who and why', code: 'D1.1', gen: whoFor },
      { id: 'ideas', name: 'Ideas that fit', code: 'D1.2, D1.3', gen: ideaFits },
      { id: 'order-ideas', name: 'Ideas in order', code: 'D1.4', gen: orderSteps }
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
    purpose: [[1, 'why', whyWrite], [1, 'match', matchWhy], [1, 'true or false', purposeTf]],
    ideas: [[1, 'pick', pickIdeas], [1, 'source', source], [1, 'title', topicOf], [1, 'true or false', ideaTf]],
    'order-ideas': [[1, 'first or last', firstStep], [1, 'next', nextStep], [1, 'true or false', orderTf]]
  });
})();
