/* Grade 3: planning writing.
   Ontario 2023 Language, Grade 3, D1 Developing Ideas and Organizing Content:
   D1.1 topic, purpose and audience, and how the text form helps        D1.2 generating ideas, including from lived experience
   D1.3 gathering information from three or more sources                D1.4 sorting and sequencing ideas
   With a grown-up: D1.5 the strategies that helped.
   Answer checks: tests/verify/grade3-planning.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';
  function others(list, x) { return list.filter(function (y) { return y !== x; }); }

  /* ---------- purpose and form (D1.1) ---------- */
  /* [why you are writing, the form that fits] */
  var FORM = [['to tell how to make something', 'instructions'], ['to explain how to play a game', 'instructions'], ['to show how to plant a seed', 'instructions'],
    ['to share your opinion with the mayor', 'a letter'], ['to thank your coach', 'a letter'], ['to ask the principal for a bike rack', 'a letter'],
    ['to tell a made-up adventure', 'a story'], ['to entertain with a tale about a talking moose', 'a story'],
    ['to give facts about an animal', 'a report'], ['to teach facts about the northern lights', 'a report'],
    ['to share a feeling in a few lines', 'a poem'], ['to describe the first snow in a few short lines', 'a poem'],
    ['to tell what really happened on your class trip', 'a recount'], ['to tell about your first hockey practice', 'a recount']];
  var FORMS = ['instructions', 'a letter', 'a story', 'a report', 'a poem', 'a recount'];
  /* what each form looks like */
  var LOOKS = { instructions: 'numbered steps in order', 'a letter': 'a greeting, reasons and a closing', 'a story': 'characters, a problem and an ending',
    'a report': 'headings and facts', 'a poem': 'short lines and strong feelings', 'a recount': 'what I did, in the order it happened' };
  function notForm(f, n) { return R.some(others(FORMS, f), n); }

  function formFor(lv) {
    var f = R.pick(FORM);
    return Q.tiles('You want <b>' + f[0] + '</b>. Which form fits?', f[1], notForm(f[1], lv > 1 ? 3 : 2), { prompt: 'What is your purpose?',
      hint: 'Steps: instructions. Facts: a report. Something that really happened to you: a recount.', explain: '<b>' + f[1] + '</b> fits.', meta: { k: 'g3-form-for', why: f[0] } });
  }
  function purposeOf(lv) {
    var f = R.pick(FORM), wrong = R.some(FORM.filter(function (x) { return x[1] !== f[1]; }), lv > 1 ? 2 : 1).filter(function (x, i, all) {
      return all.findIndex(function (y) { return y[1] === x[1]; }) === i; }).map(function (x) { return x[0]; });
    return Q.one('Which purpose fits <b>' + f[1] + '</b>?', f[0], wrong, { hint: 'What does ' + f[1] + ' do for a reader?', explain: LOOKS[f[1]] + ': ' + f[1] + '.', meta: { k: 'g3-purpose-of', form: f[1] } });
  }
  function matchForm(lv) {
    var fs = R.some(FORMS, lv > 1 ? 4 : 3).map(function (f) { return R.pick(FORM.filter(function (x) { return x[1] === f; })); });
    return { q: 'Match each purpose to the form that fits.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Picture what each one looks like.', explain: 'The form helps the reader understand your purpose.', meta: { k: 'g3-match-purpose' } };
  }
  function formTf() {
    var f = R.pick(FORM), right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(others(FORMS, f[1]));
    return { q: Q.name() + ' says:', fig: W.sent('To write ' + f[0] + ', use ' + said + '.'), type: 'tf', answer: right, hint: 'Match the form to the purpose.', explain: 'Use ' + f[1] + '.', meta: { k: 'g3-form-tf', why: f[0], said: said } };
  }
  function formLooks(lv) {
    var f = R.pick(FORMS);
    return Q.one('You are writing <b>' + f + '</b>. What will it have?', LOOKS[f], notForm(f, lv > 1 ? 2 : 1).map(function (x) { return LOOKS[x]; }), {
      hint: 'Picture ' + f + ' you have read.', explain: f.charAt(0).toUpperCase() + f.slice(1) + ' has ' + LOOKS[f] + '.', meta: { k: 'g3-form-looks', form: f } });
  }

  /* ---------- audience (D1.1) ---------- */
  /* [who will read it, what helps that reader] */
  var AUDIENCE = [['a kindergarten class', 'short sentences and big pictures'], ['the principal', 'polite, careful sentences'], ['your best friend', 'a friendly, chatty voice'],
    ['your grandma far away', 'news about your week and a warm hello'], ['a scientist', 'exact facts and the right science words'],
    ['a new student who is learning English', 'simple words and pictures that explain'], ['the mayor', 'polite words and strong reasons'],
    ['your soccer team', 'lively words that cheer them on'], ['someone who has never played the game', 'clear steps that explain every rule']];
  /* greetings: [who, greeting, formal?] */
  var GREET = [['the principal', 'Dear Principal Ahmed,', 1], ['the mayor', 'Dear Mayor Singh,', 1], ['a scientist', 'Dear Dr. Roy,', 1], ['a councillor', 'Dear Councillor Tremblay,', 1],
    ['your best friend', 'Hi Sam!', 0], ['your cousin', 'Hey, Leo!', 0], ['your grandpa', 'Hi Grandpa!', 0], ['your teammate', 'Hey, Zara!', 0]];

  function audience(lv) {
    var a = R.pick(AUDIENCE);
    return Q.one('You are writing for <b>' + a[0] + '</b>. What will help them?', a[1], R.some(others(AUDIENCE, a), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), {
      hint: 'Think about who will read it.', explain: 'For ' + a[0] + ': ' + a[1] + '.', meta: { k: 'g3-audience', who: a[0] } });
  }
  function matchAudience(lv) {
    return { q: 'Match each reader to what helps them.', type: 'match', pairs: R.some(AUDIENCE, lv > 1 ? 4 : 3).map(function (a) { return [a[0], a[1]]; }),
      hint: 'Who are they? What do they need?', explain: 'Write for your reader.', meta: { k: 'g3-match-audience' } };
  }
  function greeting(lv) {
    var g = R.pick(GREET);
    return Q.one('You are writing to <b>' + g[0] + '</b>. Which greeting fits?', g[1], R.some(GREET.filter(function (x) { return x[2] !== g[2]; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), {
      hint: g[2] ? 'Use Dear and their title.' : 'A friend gets a friendly hello.', explain: g[1] + (g[2] ? ' is polite and careful.' : ' is friendly.'), meta: { k: 'g3-greeting', who: g[0] } });
  }
  function audienceTf() {
    var a = R.pick(AUDIENCE), right = R.int(0, 1) === 1, s = right ? a[1] : R.pick(others(AUDIENCE, a))[1];
    return { q: Q.name() + ' is writing for <b>' + a[0] + '</b> and will use <b>' + s + '</b>.', type: 'tf', answer: right, prompt: 'Will it help that reader?',
      hint: 'Think about who will read it.', explain: 'For ' + a[0] + ': ' + a[1] + '.', meta: { k: 'g3-audience-tf', who: a[0], s: s } };
  }

  /* ---------- ideas that fit (D1.2): [topic, ideas that fit, ideas that do not] ---------- */
  var TOPIC = [['My favourite season: winter', ['building a snow fort', 'skating on the pond', 'hot cocoa after sledding', 'catching snowflakes'], ['swimming at the beach', 'picking strawberries', 'planting a garden']],
    ['A report on beavers', ['what beavers eat', 'how beavers build lodges', 'where beavers live', 'how beavers use their tails'], ['my favourite video game', 'how to bake bread', 'why cats purr']],
    ['A day at the farm', ['feeding the goats', 'collecting eggs', 'riding on the tractor', 'milking a cow'], ['going to the dentist', 'my school bus', 'a trip to the mall']],
    ['My family celebration', ['the food we cooked', 'the music we played', 'the people who came', 'the special clothes we wore'], ['how planes fly', 'the rules of chess', 'what sharks eat']],
    ['How to care for a pet', ['giving it fresh water', 'feeding it each day', 'brushing its fur', 'taking it for walks'], ['building a sandcastle', 'the planets', 'my bike helmet']],
    ['Our class trip to the museum', ['the dinosaur bones', 'the bus ride there', 'the gift shop', 'the guide who led us'], ['my birthday party', 'how to tie a shoe', 'a hockey game on TV']],
    ['Water in our community', ['where our tap water comes from', 'saving water at home', 'keeping lakes clean', 'the water treatment plant'], ['my favourite cartoon', 'how to draw a horse', 'the best pizza toppings']],
    ['Ways to stay healthy', ['eating fruits and vegetables', 'getting enough sleep', 'playing outside', 'drinking water'], ['the tallest building', 'how volcanoes form', 'collecting stamps']]];

  function fitTopic(lv) {
    var t = R.pick(TOPIC);
    return Q.all('Your topic: <b>' + t[0] + '</b>. Pick every idea that fits.', R.some(t[1], lv > 1 ? 3 : 2), R.some(t[2], lv > 1 ? 2 : 1), {
      hint: 'Does the idea belong with the topic?', explain: 'Keep only ideas about ' + t[0].charAt(0).toLowerCase() + t[0].slice(1) + '.', meta: { k: 'g3-fit-topic', topic: t[0] } });
  }
  function offTopic(lv) {
    var t = R.pick(TOPIC);
    return Q.one('Your topic: <b>' + t[0] + '</b>. Which idea does <b>not</b> fit?', R.pick(t[2]), R.some(t[1], lv > 1 ? 3 : 2), {
      hint: 'Which one is about something else?', explain: 'Leave it out. It is not about the topic.', meta: { k: 'g3-off-topic', topic: t[0] } });
  }
  function addToWeb(lv) {
    var t = R.pick(TOPIC), on = R.some(t[1], 4);
    return Q.one('Which idea could you add to the web?', on[3], R.some(t[2], lv > 1 ? 2 : 1), { fig: W.web(t[0], on.slice(0, 3)),
      hint: 'It must fit the topic at the top.', explain: on[3] + ' fits ' + t[0] + '.', meta: { k: 'g3-add-web', topic: t[0] } });
  }
  function ideaTf() {
    var t = R.pick(TOPIC), right = R.int(0, 1) === 1, idea = R.pick(right ? t[1] : t[2]);
    return { q: Q.name() + ' says this idea fits the topic.', fig: W.web(t[0], [idea]), type: 'tf', answer: right,
      hint: 'Is the idea about the topic?', explain: right ? 'It fits.' : 'It is about something else. Leave it out.', meta: { k: 'g3-idea-tf', topic: t[0], idea: idea } };
  }

  /* ---------- sources (D1.3) ---------- */
  var ANIMALS = [['owls', 'owl'], ['bees', 'bee'], ['frogs', 'frog'], ['turtles', 'turtle'], ['bats', 'bat'], ['loons', 'loon']];
  var GOODSRC = ['a library book about #', 'an encyclopedia page on #', 'a website from a nature centre', 'an expert who studies #', 'a video from a science museum', 'a magazine article about #'];
  var BADSRC = ['a made-up story about a talking %', 'a guess', 'a cartoon where # drive cars', 'a rumour from a friend', 'a joke book about #'];
  function fill(s, a) { return s.replace('#', a[0]).replace('%', a[1]); }

  function sources(lv) {
    var a = R.pick(ANIMALS);
    return Q.all('You need facts about ' + a[0] + '. Pick every <b>good place</b> to find them.', R.some(GOODSRC, 3).map(function (s) { return fill(s, a); }), R.some(BADSRC, lv > 1 ? 2 : 1).map(function (s) { return fill(s, a); }), {
      hint: 'Facts come from people and places that know.', explain: 'Books, trusted websites and experts give facts. Use three or more.', meta: { k: 'g3-sources' } });
  }
  function badSource(lv) {
    var a = R.pick(ANIMALS);
    return Q.one('You need facts about ' + a[0] + '. Which is <b>not</b> a good source?', fill(R.pick(BADSRC), a), R.some(GOODSRC, lv > 1 ? 3 : 2).map(function (s) { return fill(s, a); }), {
      hint: 'Which one might not be true?', explain: 'It is not a place that knows the facts.', meta: { k: 'g3-bad-source' } });
  }
  function sourceTf() {
    var a = R.pick(ANIMALS), right = R.int(0, 1) === 1, s = fill(R.pick(right ? GOODSRC : BADSRC), a);
    return { q: Q.name() + ' says this is a good place to find facts about ' + a[0] + '.', fig: W.sent(s), type: 'tf', answer: right,
      hint: 'Does it know the real facts?', explain: right ? 'It is a source you can trust.' : 'It may not be true.', meta: { k: 'g3-source-tf', s: s } };
  }
  function needMore() {
    var a = R.pick(ANIMALS), have = R.some(GOODSRC, R.int(1, 3)).map(function (s) { return fill(s, a); }), want = 3 - have.length;
    return Q.tiles('You have facts about ' + a[0] + ' from these sources. How many more do you need to have three?', String(want), ['0', '1', '2', '3'].filter(function (n) { return +n !== want; }),
      { fig: have.map(function (s) { return W.sent(s); }).join(''), hint: 'Count the sources. Three or more.', explain: have.length + ' + ' + want + ' = 3.', meta: { k: 'g3-need-more' } });
  }

  /* ---------- sort and order (D1.4) ---------- */
  var STEPS = [['Pick a topic.', 'Write down ideas.', 'Put the ideas in order.', 'Write the first draft.'],
    ['Wash the apple.', 'Cut it into slices.', 'Put the slices on a plate.', 'Share them with a friend.'],
    ['Fill the pot with soil.', 'Poke a hole with your finger.', 'Drop in the seed.', 'Water it gently.'],
    ['Get out of bed.', 'Eat breakfast.', 'Ride the bus to school.', 'Hang up your coat.'],
    ['Lace up your skates.', 'Step onto the ice.', 'Glide around the rink.', 'Take off your skates.'],
    ['Pour the flour into a bowl.', 'Add the milk and eggs.', 'Stir the batter.', 'Cook the pancakes.'],
    ['Pack the canoe.', 'Push off from the dock.', 'Paddle across the lake.', 'Set up the tent.'],
    ['Write the letter.', 'Fold it.', 'Put it in the envelope.', 'Mail it.']];
  /* ideas to sort under report headings */
  var SORT = [['beavers', [['Food', ['eats leaves and bark', 'chews on twigs', 'stores branches to eat in winter']], ['Home', ['lives in a lodge', 'builds a dam on the creek', 'makes a door under the water']], ['Body', ['has a flat tail', 'has orange front teeth', 'has webbed back feet']]]],
    ['moose', [['Food', ['eats water plants', 'nibbles on bark', 'eats leaves in summer']], ['Body', ['has long legs', 'grows big antlers', 'has a thick winter coat']], ['Babies', ['calves can walk in a day', 'calves stay with their mother', 'a mother has one or two calves']]]],
    ['Canada geese', [['Looks', ['has a long black neck', 'has a white chin strap', 'has grey-brown feathers']], ['Travel', ['flies south in the fall', 'flies in a V', 'comes back in the spring']], ['Babies', ['goslings swim right away', 'the mother lays four to seven eggs', 'the nest is on the ground']]]]];
  var PLAN = { 'a report': 'Group the ideas under headings.', instructions: 'Put the steps in order.', 'a story': 'Plan a beginning, middle and end.',
    'a recount': 'List what happened, first to last.', 'a letter': 'Plan the greeting, the reasons and the closing.' };

  function orderSteps(lv) {
    var s = R.pick(STEPS), n = lv > 1 ? 4 : 3, from = R.int(0, s.length - n), items = s.slice(from, from + n);
    return { q: 'Put the ideas in order.', type: 'order', items: items, first: 'First', last: 'Last', hint: 'What has to happen first?', explain: items.join(' '), meta: { k: 'g3-order-steps' } };
  }
  function firstStep(lv) {
    var s = R.pick(STEPS), pick = R.some([0, 1, 2, 3], lv > 1 ? 3 : 2).sort(), first = s[pick[0]];
    return Q.one('Which comes <b>first</b>?', first, pick.slice(1).map(function (i) { return s[i]; }), { hint: 'What has to happen before the others?', explain: first, meta: { k: 'g3-first-step' } });
  }
  function sortIdeas() {
    var t = R.pick(SORT);
    return { q: 'A report on ' + t[0] + '. Match each idea to its heading.', type: 'match', pairs: t[1].map(function (g) { return [R.pick(g[1]), g[0]]; }),
      hint: 'Which heading is it about?', explain: 'Sort ideas into groups before you write.', meta: { k: 'g3-sort-ideas' } };
  }
  function whichGroup(lv) {
    var t = R.pick(SORT), g = R.pick(t[1]), idea = R.pick(g[1]);
    return Q.tiles('A report on ' + t[0] + '. Which heading fits this idea?', g[0], R.some(others(t[1], g), lv > 1 ? 2 : 1).map(function (x) { return x[0]; }), { fig: W.sent(idea),
      hint: 'What is the idea about?', explain: idea + ': <b>' + g[0] + '</b>.', meta: { k: 'g3-which-group', idea: idea } });
  }
  function planType(lv) {
    var f = R.pick(Object.keys(PLAN));
    return Q.one('You are planning <b>' + f + '</b>. How should you sort your ideas?', PLAN[f], R.some(others(Object.keys(PLAN), f), lv > 1 ? 2 : 1).map(function (x) { return PLAN[x]; }), {
      hint: 'Think of what ' + f + ' looks like.', explain: PLAN[f], meta: { k: 'g3-plan-type', form: f } });
  }

  Atlas.register('planning', {
    full: true,
    lessons: [{
      id: 'why-who', title: 'Why and who', sub: 'Purpose, form and audience.',
      concepts: [
        { slug: 'purpose', title: 'Your purpose picks the form', exp: ['D1.1'], skill: 'purpose-form',
          model: [
            step(W.icon('think'), 'Why am I writing?'),
            step(W.sent('to tell how to make pancakes'), 'My purpose.'),
            step(W.chain(['Pour the flour.', 'Add milk and eggs.', 'Stir.']), 'Numbered steps: <b>instructions</b>.'),
            step(W.sent('to thank my coach'), 'A new purpose.'),
            step(W.passage('', ['Dear Coach Ana,', 'Thank you for a great season.', 'From, Noor']), 'Dear and From: <b>a letter</b>.')
          ],
          guided: [function () { return formFor(1); }, function () { return purposeOf(1); }, function () { return formLooks(1); }],
          check: [function () { return formFor(2); }, function () { return matchForm(2); }, formTf, function () { return formLooks(2); }, function () { return purposeOf(3); }],
          coach: '<p>Before any writing, ask: "Why are you writing this, and what will it look like?"</p>',
          mistake: '<p>Writing every piece as a story. Facts belong in a report; steps belong in instructions.</p>' },
        { slug: 'audience', title: 'Write for your reader', exp: ['D1.1'], skill: 'audience',
          model: [
            step(W.icon('people') + W.sent('a kindergarten class'), 'My readers are young.'),
            step(W.sent('The frog hops. It is green.'), 'Short sentences, big pictures.'),
            step(W.sent('the principal'), 'A new reader.'),
            step(W.sent('Dear Principal Ahmed,'), 'Polite and careful.'),
            step(W.sent('Hi Sam!'), 'A friend gets a chatty hello.')
          ],
          guided: [function () { return audience(1); }, function () { return greeting(1); }, function () { return matchAudience(1); }],
          check: [function () { return audience(2); }, function () { return greeting(2); }, function () { return matchAudience(2); }, audienceTf, function () { return audience(3); }],
          coach: '<p>Write the same message twice: a note to a friend, and a note to the principal. Compare them.</p>',
          mistake: '<p>Forgetting the reader. Ask: "Will they understand this?"</p>' }
      ]
    }, {
      id: 'ideas', title: 'Ideas and order', sub: 'Find ideas, gather facts, sort and order them.',
      concepts: [
        { slug: 'ideas', title: 'Keep the ideas that fit your topic', exp: ['D1.2'], skill: 'ideas',
          model: [
            step(W.web('Winter', ['snow fort', 'skating', 'hot cocoa']), 'Ideas from my own life.'),
            step(W.sent('swimming at the beach'), 'Not winter. Leave it out.'),
            step(W.web('Water in our community', ['tap water', 'keeping lakes clean']), 'Ideas from science class too.'),
            step(W.sent('the best pizza toppings'), 'Off the topic. Cross it out.')
          ],
          guided: [function () { return fitTopic(1); }, function () { return offTopic(1); }, function () { return addToWeb(1); }],
          check: [function () { return fitTopic(2); }, function () { return offTopic(2); }, ideaTf, function () { return addToWeb(2); }, function () { return fitTopic(3); }],
          coach: '<p>Draw an idea web: the topic in the middle, ideas around it. Ask about real things the child has done, and things learned in science or social studies.</p>',
          mistake: '<p>Adding everything they can think of. Check each idea: does it fit the topic?</p>' },
        { slug: 'sources', title: 'Gather facts from three or more sources', exp: ['D1.3'], skill: 'sources',
          model: [
            step(W.means('read', 'a library book about owls'), 'One.'),
            step(W.means('screen', 'a website from a nature centre'), 'Two.'),
            step(W.means('people', 'an expert who studies owls'), 'Three.'),
            step(W.sent('a made-up story about a talking owl'), 'Fun to read, but not facts.'),
            step(W.means('again', 'Two books say owls hunt at night.'), 'When they agree, you can trust the fact.')
          ],
          guided: [function () { return sources(1); }, function () { return badSource(1); }, needMore],
          check: [function () { return sources(2); }, function () { return badSource(2); }, sourceTf, needMore, function () { return sources(3); }],
          coach: '<p>For a mini report, find one book, one website and one person to ask. Write one fact from each on a sticky note.</p>',
          mistake: '<p>Using a made-up story as a source of facts.</p>' },
        { slug: 'order', title: 'Group ideas, then put them in order', exp: ['D1.4'], skill: 'order',
          model: [
            step(W.web('Beavers', ['Food', 'Home', 'Body']), 'Headings for a report.'),
            step(W.sent('lives in a lodge') + ' &rarr; ' + W.sent('Home'), 'Each idea goes under one heading.'),
            step(W.sent('has a flat tail') + ' &rarr; ' + W.sent('Body')),
            step(W.chain(['Lace up your skates.', 'Step onto the ice.', 'Glide around the rink.'], ['First', 'Next', 'Last']), 'Steps go in time order.')
          ],
          guided: [function () { return orderSteps(1); }, sortIdeas, function () { return planType(1); }],
          check: [function () { return orderSteps(2); }, function () { return firstStep(2); }, function () { return whichGroup(2); }, function () { return planType(2); }, sortIdeas],
          coach: '<p>Write ideas on cards and sort them into piles on the table before writing.</p>',
          mistake: '<p>Writing ideas in the order they were thought of. Sort them first.</p>' }
      ]
    }],
    practice: [
      { id: 'purpose-form', name: 'Purpose and form', code: 'D1.1', gen: formFor },
      { id: 'audience', name: 'Writing for a reader', code: 'D1.1', gen: audience },
      { id: 'ideas', name: 'Ideas that fit', code: 'D1.2', gen: fitTopic },
      { id: 'sources', name: 'Three or more sources', code: 'D1.3', gen: sources },
      { id: 'order', name: 'Sort and order', code: 'D1.4', gen: orderSteps }
    ],
    tasks: [
      { id: 'idea-web', title: 'My idea web', code: 'D1.2', pic: W.icon('think'), say: 'Make an idea web about something you have done.', write: true,
        run: ['Choose a topic from the child' + AP + 's life (a trip, a pet, a family celebration).', 'The child writes the topic, then at least four ideas. On paper, draw it as a web.'],
        rubric: ['One or two ideas, or off topic.', 'A few ideas, some off topic.', 'Four or more ideas that fit the topic.', 'Many ideas with details from their own life.'] },
      { id: 'three-sources', title: 'Three sources', code: 'D1.3', pic: W.icon('read'), say: 'Find one fact in a book, one on a website, and one from a person.', write: true,
        run: ['Pick an animal or a place in Ontario.', 'Help the child find one fact from a book, one from a trusted website, and one from a person who knows.', 'The child writes each fact and where it came from.'],
        rubric: ['Fewer than three facts, or no sources named.', 'Three facts, sources not clear.', 'Three facts, each with its source.', 'Three or more facts with sources, and checks that they agree.'] },
      { id: 'plan-reflect', title: 'What helped me plan?', code: 'D1.5', pic: W.icon('star'), say: 'What helped you get ideas and put them in order?',
        run: ['After planning, ask: "What helped you most: the idea web, talking, or sorting cards?"'],
        rubric: ['Cannot name a strategy yet.', 'Names one with help.', 'Names one and says how it helped.', 'Names more than one and says when to use each.'] }
    ]
  });

  Q.shapes('planning', {
    'purpose-form': [[1, 'purpose-of', purposeOf], [1, 'match', matchForm], [1, 'true-false', formTf], [1, 'looks', formLooks]],
    audience: [[1, 'match', matchAudience], [1, 'greeting', greeting], [1, 'true-false', audienceTf]],
    ideas: [[1, 'off-topic', offTopic], [1, 'web', addToWeb], [1, 'true-false', ideaTf]],
    sources: [[1, 'not-good', badSource], [1, 'true-false', sourceTf], [1, 'how-many', needMore]],
    order: [[1, 'first', firstStep], [1, 'sort', sortIdeas], [1, 'heading', whichGroup], [1, 'plan', planType]]
  });
})();
