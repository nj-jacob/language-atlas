/* Grade 3: planning writing.
   Ontario 2023 Language, Grade 3, D1 Developing Ideas and Organizing Content:
   D1.1 topic, purpose and audience, and how the text form helps        D1.2 generating ideas, including from lived experience
   D1.3 gathering information from three or more sources                D1.4 sorting and sequencing ideas
   With a grown-up: D1.5 the strategies that helped.
   Answer checks: tests/verify/grade3-planning.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* [why you are writing, the form that fits] */
  var FORM = [['to tell how to make something', 'instructions'], ['to share your opinion with the mayor', 'a letter'], ['to tell a made-up adventure', 'a story'],
    ['to give facts about an animal', 'a report'], ['to share a feeling in a few lines', 'a poem']];
  /* [who will read it, what helps that reader] */
  var AUDIENCE = [['a kindergarten class', 'short sentences and big pictures'], ['the principal', 'polite, careful sentences'], ['your best friend', 'a friendly, chatty voice']];
  /* topics, ideas that fit, and ideas that do not */
  var TOPIC = [['My favourite season: winter', ['building a snow fort', 'skating on the pond', 'hot cocoa after sledding'], ['swimming at the beach', 'picking strawberries']],
    ['A report on beavers', ['what beavers eat', 'how beavers build lodges', 'where beavers live'], ['my favourite video game', 'how to bake bread']],
    ['A day at the farm', ['feeding the goats', 'collecting eggs', 'riding on the tractor'], ['going to the dentist', 'my school bus']]];
  var GOODSRC = ['a library book about owls', 'a website from a nature centre', 'a park ranger who studies owls', 'a video from a science museum'];
  var BADSRC = ['a made-up story about a talking owl', 'a guess', 'a comic where owls drive cars'];
  var STEPS = [['Pick a topic.', 'Write down ideas.', 'Put the ideas in order.', 'Write the first draft.'],
    ['Wash the apple.', 'Cut it into slices.', 'Put the slices on a plate.', 'Share them with a friend.']];
  /* ideas to sort under report headings */
  var SORT = [['Food', ['eats leaves and bark', 'chews on twigs']], ['Home', ['lives in a lodge', 'builds a dam on the creek']], ['Body', ['has a flat tail', 'has orange front teeth']]];

  /* ---------- question makers ---------- */
  function formFor(lv) {
    var f = R.pick(FORM);
    return Q.tiles('You want to write <b>' + f[0] + '</b>. Which form fits?', f[1], R.some(FORM.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }),
      { prompt: 'What is your purpose?', hint: 'Steps: instructions. Facts: a report. Opinion to someone: a letter.', explain: '<b>' + f[1] + '</b> fits ' + f[0] + '.', meta: { k: 'g3-form-for', why: f[0] } });
  }
  function matchForm() {
    var fs = R.some(FORM, 3);
    return { q: 'Match each purpose to the form that fits.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Think of what each one looks like.', explain: 'The form helps the reader understand your purpose.', meta: { k: 'g3-match-purpose' } };
  }
  function audience() {
    var a = R.pick(AUDIENCE);
    return Q.one('You are writing for <b>' + a[0] + '</b>. What will help them?', a[1], AUDIENCE.filter(function (x) { return x !== a; }).map(function (x) { return x[1]; }), {
      hint: 'Think about who will read it.', explain: 'For ' + a[0] + ': ' + a[1] + '.', meta: { k: 'g3-audience', who: a[0] } });
  }
  function formTf() {
    var f = R.pick(FORM), right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(FORM.filter(function (x) { return x !== f; }))[1];
    return { q: Q.name() + ' says:', fig: W.sent('To write ' + f[0] + ', use ' + said + '.'), type: 'tf', answer: right, hint: 'Match the form to the purpose.', explain: 'Use ' + f[1] + '.', meta: { k: 'g3-form-tf', why: f[0], said: said } };
  }

  function fitTopic() {
    var t = R.pick(TOPIC);
    return Q.all('Your topic: <b>' + t[0] + '</b>. Pick every idea that fits.', R.some(t[1], 2), R.some(t[2], 1).concat([R.pick(R.pick(TOPIC.filter(function (x) { return x !== t; }))[2])]).filter(function (x, i, a) { return a.indexOf(x) === i; }), {
      hint: 'Does the idea belong with the topic?', explain: 'Keep only ideas about ' + t[0].toLowerCase() + '.', meta: { k: 'g3-fit-topic', topic: t[0] } });
  }
  function sources() {
    return Q.all('You need facts about owls. Pick every <b>good place</b> to find them.', R.some(GOODSRC, 3), R.some(BADSRC, 1), {
      hint: 'Facts come from people and places that know. Use three or more.', explain: 'Books, trusted websites and experts give facts. Use three or more.', meta: { k: 'g3-sources' } });
  }
  function orderSteps() {
    var s = R.pick(STEPS);
    return { q: 'Put the ideas in order.', type: 'order', items: s.slice(), first: 'First', last: 'Last', hint: 'What has to happen first?', explain: s.join(' '), meta: { k: 'g3-order-steps' } };
  }
  function sortIdeas() {
    var groups = R.some(SORT, 3);
    return { q: 'A report on beavers. Match each idea to its heading.', type: 'match', pairs: groups.map(function (g) { return [R.pick(g[1]), g[0]]; }), hint: 'Is it about food, home, or body?', explain: 'Sort ideas into groups before you write.', meta: { k: 'g3-sort-ideas' } };
  }

  Atlas.register('planning', {
    lessons: [{
      id: 'why-who', title: 'Why and who', sub: 'Purpose, audience and form.',
      concepts: [
        { slug: 'purpose', title: 'Purpose and form', exp: ['D1.1'], skill: 'purpose-form',
          model: [
            step(W.icon('think'), 'Why am I writing?'),
            step(W.sent('to tell how to make something'), 'My purpose.'),
            step(W.sent('1. Wash the apple. 2. Cut it.'), 'So I write <b>instructions</b>.')
          ],
          key: '<p>Purpose first. Then pick the form that fits.</p>',
          guided: [function () { return formFor(1); }, function () { return formFor(1); }],
          check: [function () { return formFor(2); }, matchForm],
          coach: '<p>Before any writing, ask: "Why are you writing this, and what will it look like?"</p>',
          mistake: '<p>Writing every piece as a story. Facts belong in a report; steps belong in instructions.</p>' },
        { slug: 'audience', title: 'Who will read it?', exp: ['D1.1'], skill: 'purpose-form',
          model: [
            step(W.icon('people') + W.sent('a kindergarten class'), 'My readers are young.'),
            step(W.sent('short sentences and big pictures'), 'So I keep it simple.')
          ],
          key: '<p>Write for your reader.</p>',
          guided: [audience, audience],
          check: [audience, formTf],
          coach: '<p>Write the same message twice: a note to a friend, and a note to the principal. Compare them.</p>',
          mistake: '<p>Forgetting the reader. Ask: "Will they understand this?"</p>' }
      ]
    }, {
      id: 'ideas', title: 'Ideas and order', sub: 'Find ideas, gather facts, sort and order them.',
      concepts: [
        { slug: 'ideas', title: 'Ideas that fit', exp: ['D1.2'], skill: 'ideas',
          model: [
            step(W.sent('My favourite season: winter'), 'My topic.'),
            step(W.sent('snow fort') + W.sent('skating') + W.sent('hot cocoa'), 'Ideas from my own life.'),
            step(W.sent('swimming at the beach'), 'Not winter. Leave it out.')
          ],
          key: '<p>Think of your own life. Keep ideas that fit the topic.</p>',
          guided: [fitTopic, fitTopic],
          check: [fitTopic, fitTopic],
          coach: '<p>Draw an idea web: the topic in the middle, ideas around it. Ask about real things the child has done.</p>',
          mistake: '<p>Adding everything they can think of. Check each idea: does it fit the topic?</p>' },
        { slug: 'sources', title: 'Gather facts from three sources', exp: ['D1.3'], skill: 'ideas',
          model: [
            step(W.icon('read'), 'A library book.'),
            step(W.icon('screen'), 'A trusted website.'),
            step(W.icon('people'), 'An expert. That makes three sources.')
          ],
          key: '<p>Use three or more places that know the facts.</p>',
          guided: [sources, sources],
          check: [sources, sources],
          coach: '<p>For a mini report, find one book, one website and one person to ask. Write one fact from each on a sticky note.</p>',
          mistake: '<p>Using a made-up story as a source of facts.</p>' },
        { slug: 'order', title: 'Sort and order', exp: ['D1.4'], skill: 'ideas',
          model: [
            step(W.sent('Food') + W.sent('Home') + W.sent('Body'), 'Headings for a report.'),
            step(W.sent('lives in a lodge') + ' &rarr; ' + W.sent('Home'), 'Each idea goes in a group.'),
            step(W.sent('First') + W.sent('Next') + W.sent('Last'), 'For steps or a story, put them in order.')
          ],
          key: '<p>Group ideas that go together. Put steps in order.</p>',
          guided: [sortIdeas, orderSteps],
          check: [sortIdeas, orderSteps],
          coach: '<p>Write ideas on cards and sort them into piles on the table before writing.</p>',
          mistake: '<p>Writing ideas in the order they were thought of. Sort them first.</p>' }
      ]
    }],
    practice: [
      { id: 'purpose-form', name: 'Purpose, audience and form', code: 'D1.1', gen: formFor },
      { id: 'ideas', name: 'Ideas and order', code: 'D1.2, D1.3, D1.4', gen: fitTopic }
    ],
    tasks: [
      { id: 'idea-web', title: 'My idea web', code: 'D1.2', pic: W.icon('think'), say: 'Make an idea web about something you have done.', write: true,
        run: ['Choose a topic from the child’s life (a trip, a pet, a family celebration).', 'The child writes the topic, then at least four ideas. On paper, draw it as a web.'],
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
    'purpose-form': [[1, 'audience', audience], [1, 'match', matchForm], [1, 'true-false', formTf]],
    ideas: [[1, 'sources', sources], [1, 'order', orderSteps], [1, 'sort', sortIdeas]]
  });
})();
