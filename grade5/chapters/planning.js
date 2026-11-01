/* Grade 5: planning writing. A full chapter: every idea has two worked examples, three questions together and five on
   your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 5, D1 Developing Ideas and Organizing Content:
   D1.1 topic, purpose and audience, and why the chosen form, genre and medium suit them      D1.2 generate and develop ideas, drawing on various resources and lived experience
   D1.3 gather information from multiple sources, verify reliability with simple criteria, and record the creator and source
   D1.4 select and classify ideas and information, and sequence content for the chosen form
   With a grown-up: D1.5 the strategies and tools that helped. All topics and notes are written for this site.
   Answer checks: tests/verify/grade5-planning.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* [what you want to do, its purpose, the form that suits it] */
  var TASKS = [['convince the principal to start a school garden', 'to persuade', 'a persuasive letter'], ['teach Grade 2 students how to make a bird feeder', 'to instruct', 'a how-to guide with pictures'],
    ['share facts about wetlands with your class', 'to inform', 'a slide presentation'], ['tell a funny thing that happened at camp', 'to entertain', 'a short story'],
    ['invite neighbours to a park clean-up', 'to persuade', 'a poster'], ['explain how a canoe is built', 'to inform', 'a labelled diagram with notes'],
    ['ask the town to fix the bumpy bike path', 'to persuade', 'a letter to the town council'], ['teach your cousin a new card game', 'to instruct', 'a list of numbered steps'],
    ['tell a spooky story around a campfire', 'to entertain', 'an oral story'], ['report what you learned about monarchs', 'to inform', 'an information report with headings'],
    ['convince your family to recycle more', 'to persuade', 'a short speech'], ['teach a friend how to tie a knot', 'to instruct', 'a short how-to video'],
    ['tell about the day you learned to skate', 'to entertain', 'a personal narrative'], ['share the results of your class survey', 'to inform', 'a bar graph with a caption']];
  var PURPOSES = ['to persuade', 'to instruct', 'to inform', 'to entertain'];
  /* [topic, ideas that fit, ideas that do not] */
  var TOPICS = [['Why our town needs a library', ['a quiet place to study', 'free books for every family', 'computers for people without one'], ['my favourite pizza', 'how volcanoes erupt']],
    ['How to care for a puppy', ['feed it at the same times each day', 'take it outside often', 'give it safe toys to chew'], ['the history of hockey', 'how to bake bread']],
    ['A day I will never forget', ['where I was', 'what happened first', 'how I felt at the end'], ['the rules of chess', 'facts about the moon']],
    ['Making our school welcoming for everyone', ['signs in more than one language', 'a buddy for each new student', 'ramps and wide doors'], ['the tallest mountain in the world', 'my favourite video game']],
    ['How the water cycle works', ['water evaporates in the sun', 'clouds form as the air cools', 'rain and snow fall back down'], ['how to train a dog', 'the best pizza toppings']],
    ['Why Orange Shirt Day matters', ['it honours residential school survivors and their families', 'its message: every child matters', 'how we can listen and learn'], ['the rules of soccer', 'how to make pancakes']],
    ['Life in a beaver pond', ['beavers build a dam', 'ducks and frogs move in', 'the pond floods nearby land'], ['how cars are made', 'the price of skates']],
    ['Our family' + AP + 's favourite celebration', ['the food we cook', 'who comes to visit', 'the clothes we wear'], ['how bridges are built', 'the planets in order']]];
  /* ways to find ideas, and ways that do not help */
  var FINDERS = ['talk to a family member', 'think about your own life', 'draw an idea web', 'read about the topic', 'look at photos'], NOFIND = ['copy a friend' + AP + 's story', 'wait for an idea to arrive', 'write the ending first'];
  /* [a source, reliable or not] */
  var SOURCES = [['a government parks website, updated this year', 1], ['a book about wetlands by a scientist', 1], ['a museum' + AP + 's website', 1], ['an encyclopedia from the library', 1],
    ['a news article with the writer' + AP + 's name and the date', 1], ['a website from a university', 1],
    ['a post by someone with no name', 0], ['an ad for a frog toy', 0], ['a comment under a video', 0], ['a rumour from a friend' + AP + 's cousin', 0], ['a website with no date and no author', 0], ['a joke page that makes up facts', 0]];
  var CHECKS = ['Who made it?', 'When was it made?', 'Do other sources agree?', 'Does the creator know the topic?'], NOCHECK = ['Is it long?', 'Is it colourful?', 'Does it have a funny title?'];
  var RECORD = ['who made it', 'the title', 'the website or publisher', 'the date'], NORECORD = ['your favourite part', 'how long you read', 'the colour of the cover'];
  /* source notes: [who made it, title, where it is from, when] */
  var NOTED = [['R. Okafor', 'Wetlands of Ontario', 'Maple Press', '2025'], ['Parks Canada', 'Monarchs on the Move', 'parks.canada.ca', '2026'], ['L. Martin', 'The Ice Road Truckers', 'Northern Books', '2023'],
    ['Royal Ontario Museum', 'Life in a Beaver Pond', 'rom.on.ca', '2024'], ['S. Tremblay', 'From Sap to Syrup', 'Sugar Shack Press', '2022'], ['A. Kaur', 'Canoes of Canada', 'Lakeside Books', '2025']];
  /* notes to sort under headings */
  var NOTESETS = [{ Food: ['eats leaves and twigs', 'stores branches for winter'], Home: ['lives in a lodge', 'builds dams of mud and sticks'], Body: ['has orange front teeth', 'has a flat, wide tail'] },
    { Food: ['caterpillars eat milkweed', 'adults drink nectar'], Journey: ['flies to Mexico', 'rests in trees at night'], Body: ['has orange and black wings', 'weighs less than a paper clip'] },
    { Food: ['eats water plants', 'chews twigs in winter'], Home: ['lives in forests near lakes', 'rests in thick bush'], Body: ['has long legs', 'grows wide antlers'] }];
  var STEPS = [['Gather a pine cone, string and seeds.', 'Tie the string to the cone.', 'Spread sunflower butter on it.', 'Roll it in the seeds.', 'Hang it outside.'],
    ['Choose a topic.', 'Gather ideas.', 'Check your sources.', 'Sort your notes.', 'Write a draft.'],
    ['Fill a pot with soil.', 'Push a bean seed into the soil.', 'Water it gently.', 'Set it in a sunny window.', 'Watch for a sprout.'],
    ['Put on your life jacket.', 'Carry the canoe to the water.', 'Climb in at the middle.', 'Push off from the shore.', 'Paddle together.'],
    ['Mix the flour and milk.', 'Heat the pan.', 'Pour in the batter.', 'Flip the pancake.', 'Serve it warm.']];
  /* the order that suits each form */
  var FORMORDER = [['a story', 'a beginning, a problem, then an ending'], ['a how-to guide', 'what you need, then the steps in order'], ['a persuasive letter', 'your opinion, your reasons, then what you ask for'],
    ['an information report', 'an introduction, a part for each heading, then a conclusion']];

  function why(right, yes, no) { return { options: [yes, no], answer: right ? 0 : 1 }; }

  /* ---------- purpose, audience and form (D1.1) ---------- */
  function formFit(lv) {
    var t = R.pick(TASKS), wrong = R.some(TASKS.filter(function (x) { return x[1] !== t[1]; }), lv > 1 ? 3 : 2).map(function (x) { return x[2]; });
    return Q.one('You want to <b>' + t[0] + '</b>. Which form suits it best?', t[2], wrong, { prompt: 'What is the purpose? Who is the audience?',
      hint: 'Match the form to what you want the reader to do.', explain: '<b>' + t[2] + '</b> suits it: ' + t[1].replace('to ', '') + '.', meta: { k: 'g5-form-fit', task: t[0] } });
  }
  function purposeOf() {
    var t = R.pick(TASKS);
    return Q.tiles('You want to <b>' + t[0] + '</b>. What is your purpose?', t[1], PURPOSES.filter(function (p) { return p !== t[1]; }), { hint: 'Persuade, instruct, inform or entertain?',
      explain: 'Your purpose: <b>' + t[1] + '</b>.', meta: { k: 'g5-purpose', task: t[0] } });
  }
  function matchPurpose() {
    var seen = {}, list = R.shuffle(TASKS).filter(function (t) { if (seen[t[1]]) return false; seen[t[1]] = 1; return true; }).slice(0, 3);
    return { q: 'Match each writing job to its purpose.', type: 'match', pairs: list.map(function (t) { return [t[0], t[1]]; }), hint: 'What should the reader do or feel?', explain: 'Purpose first, then form.', meta: { k: 'g5-match-purpose' } };
  }
  function formTf() {
    var t = R.pick(TASKS), right = R.int(0, 1) === 1, form = right ? t[2] : R.pick(TASKS.filter(function (x) { return x[1] !== t[1]; }))[2];
    return { q: Q.name() + ' wants to <b>' + t[0] + '</b>, and chooses <b>' + form + '</b>. Good choice?', type: 'tf', answer: right,
      why: why(right, 'It suits the purpose.', 'It suits a different purpose.'), hint: 'What is the purpose? Does the form fit it?', explain: '<b>' + t[2] + '</b> suits it.', meta: { k: 'g5-form-fit-tf', task: t[0], form: form } };
  }

  /* ---------- gather ideas (D1.2) ---------- */
  function ideas() {
    var t = R.pick(TOPICS);
    return Q.all('Your topic: <b>' + t[0] + '</b>. Pick every idea that fits.', R.some(t[1], 2), t[2], { fig: W.web(t[0], [W.gap(), W.gap(), W.gap()]), hint: 'Does it belong with the topic?',
      explain: W.web(t[0], t[1]), meta: { k: 'g5-ideas', topic: t[0] } });
  }
  function offTopic(lv) {
    var t = R.pick(TOPICS), odd = R.pick(t[2]);
    return Q.one('Your topic: <b>' + t[0] + '</b>. Which idea is <b>off topic</b>?', odd, R.some(t[1], lv > 1 ? 3 : 2), { hint: 'Which one wanders away from the topic?',
      explain: W.web(t[0], t[1]), meta: { k: 'g5-off-topic', topic: t[0] } });
  }
  function ideaTf() {
    var t = R.pick(TOPICS), right = R.int(0, 1) === 1, idea = R.pick(right ? t[1] : t[2]);
    return { q: Q.name() + ' adds this idea to the web.', fig: W.web(t[0], [idea]), type: 'tf', answer: right, why: why(right, 'It fits the topic.', 'It is off topic.'),
      hint: 'Does it belong with the topic?', explain: W.web(t[0], t[1]), meta: { k: 'g5-idea-tf', topic: t[0], idea: idea } };
  }
  function ideaSource() {
    return Q.all('You need ideas. Pick every good way to find them.', R.some(FINDERS, 2), R.some(NOFIND, 2), { hint: 'Which ones give you new ideas of your own?',
      explain: 'Talk, remember, read, look, and draw a web.', meta: { k: 'g5-idea-source' } });
  }

  /* ---------- reliable sources, recorded (D1.3) ---------- */
  function reliable(lv) {
    var good = R.pick(SOURCES.filter(function (s) { return s[1]; })), bad = R.some(SOURCES.filter(function (s) { return !s[1]; }), lv > 1 ? 3 : 2);
    return Q.one('Which source is most <b>reliable</b> for facts?', good[0], bad.map(function (s) { return s[0]; }), { prompt: 'Who made it? Do they know the topic? Is it recent?',
      hint: 'Trust sources with a known, expert creator and a date.', explain: good[0] + ': a known creator who knows the topic.', meta: { k: 'g5-reliable' } });
  }
  function sourceTf() {
    var s = R.pick(SOURCES), right = R.int(0, 1) === 1, says = right === !!s[1] ? 'reliable' : 'not reliable';
    return { q: Q.name() + ' says this source is <b>' + says + '</b>.', fig: W.sent(s[0]), type: 'tf', answer: right,
      why: { options: ['A known creator who knows the topic.', 'No clear creator, or not meant to be true.'], answer: s[1] ? 0 : 1 },
      hint: 'Who made it? Do they know the topic?', explain: s[1] ? 'You can trust it.' : 'Check it against a better source.', meta: { k: 'g5-source-tf', s: s[0], says: says } };
  }
  function sourceCheck() {
    return Q.all('Pick every question that checks if a source is reliable.', R.some(CHECKS, 2), R.some(NOCHECK, 2), { hint: 'Who, when, do they know, and do others agree?',
      explain: CHECKS.join(' '), meta: { k: 'g5-source-check' } });
  }
  function record() {
    return Q.all('You use facts from a website. Pick every thing you should <b>record</b> about it.', R.some(RECORD, 3), R.some(NORECORD, 1), { hint: 'So someone else could find it again, and so you credit its creator.',
      explain: 'Record who made it, the title, where it is, and the date.', meta: { k: 'g5-record' } });
  }
  function sourceNote() {
    var n = R.pick(NOTED);
    return { q: 'Build the source note: who made it, the title, where it is from, then when.', type: 'order', items: n.slice(), first: 'Who', last: 'When',
      hint: 'A name, a title, a publisher or website, a year.', explain: W.chain(n, ['Who', 'Title', 'Where', 'When']), meta: { k: 'g5-source-note' } };
  }

  /* ---------- sort notes, then sequence (D1.4) ---------- */
  function sortNotes() {
    var set = R.pick(NOTESETS), heads = Object.keys(set);
    return { q: 'Sort each note under the right heading.', type: 'match', pairs: heads.map(function (h) { return [R.pick(set[h]), h]; }), hint: 'Which heading is each note about?',
      explain: 'Grouping notes makes paragraphs.', meta: { k: 'g5-sort-notes' } };
  }
  function headingFor(lv) {
    var set = R.pick(NOTESETS), heads = Object.keys(set), h = R.pick(heads);
    return Q.tiles('Which heading fits these notes?', h, R.some(heads.filter(function (x) { return x !== h; }), lv > 1 ? 2 : 1), { fig: W.web(W.gap(), set[h]),
      hint: 'What are both notes about?', explain: W.web(h, set[h]), meta: { k: 'g5-heading-for', notes: set[h].join(' / ') } });
  }
  function noteTf() {
    var set = R.pick(NOTESETS), heads = Object.keys(set), h = R.pick(heads), n = R.pick(set[h]), right = R.int(0, 1) === 1, put = right ? h : R.pick(heads.filter(function (x) { return x !== h; }));
    return { q: Q.name() + ' puts this note under <b>' + put + '</b>.', fig: W.sent(n), type: 'tf', answer: right, why: why(right, 'That is what the note is about.', 'It belongs under another heading.'),
      hint: 'What is the note about?', explain: 'It goes under <b>' + h + '</b>.', meta: { k: 'g5-note-tf', n: n, put: put } };
  }
  function orderSteps(lv) {
    var s = R.pick(STEPS);
    return { q: 'Put the steps in order.', type: 'order', items: s.slice(0, lv > 1 ? 5 : 4), first: 'First', last: 'Last', hint: 'What has to happen before the next step can?', explain: W.chain(s), meta: { k: 'g5-order-steps' } };
  }
  function formOrder() {
    var f = R.pick(FORMORDER);
    return Q.one('Which order suits <b>' + f[0] + '</b>?', f[1], FORMORDER.filter(function (x) { return x !== f; }).map(function (x) { return x[1]; }), {
      hint: 'Think of one you have read.', explain: f[0] + ': ' + f[1] + '.', meta: { k: 'g5-form-order', form: f[0] } });
  }

  Atlas.register('planning', {
    full: true,
    lessons: [{
      id: 'purpose', title: 'Purpose, audience and form', sub: 'Decide why, for whom, and how.',
      concepts: [
        { slug: 'purpose', title: 'Purpose and audience decide the form', exp: ['D1.1'], skill: 'purpose',
          model: [
            step(W.sent('Convince the principal to start a garden.'), 'Why? <b>To persuade</b>. Who? The principal.'),
            step(W.tile('a persuasive letter'), 'Reasons, said politely.'),
            step(W.sent('Teach Grade 2s to make a bird feeder.'), 'Why? <b>To instruct</b>. Who? Young readers.'),
            step(W.tile('a how-to guide with pictures'), 'Short steps and pictures suit them.')
          ],
          guided: [function () { return formFit(1); }, purposeOf, formTf],
          check: [function () { return formFit(2); }, matchPurpose, purposeOf, formTf, function () { return formFit(3); }],
          coach: '<p>Before any writing, ask three questions: Why am I writing? Who will read it? What form will work best?</p>',
          mistake: '<p>Picking a form first because it is fun. Start with the purpose and the reader.</p>' },
        { slug: 'ideas', title: 'Gather ideas that fit the topic', exp: ['D1.2'], skill: 'ideas',
          model: [
            step(W.web('Why our town needs a library', ['a quiet place', 'free books', 'computers']), 'Ideas branch out from the topic.'),
            step(W.means('wrong', 'my favourite pizza'), 'Off topic. Cross it out.'),
            step(W.icon('people'), 'Ask family. Think about your own life.'),
            step(W.web('Making our school welcoming', ['signs in many languages', 'a buddy', 'ramps']), 'A topic about inclusion.'),
            step(W.means('think', 'What would help a new student?'), 'Your own experience is a resource.')
          ],
          guided: [ideas, function () { return offTopic(1); }, ideaSource],
          check: [ideas, ideaTf, function () { return offTopic(2); }, ideaSource, ideas],
          coach: '<p>Make an idea web on paper. Ask the child to talk to one family member and add their ideas too.</p>',
          mistake: '<p>Keeping every idea. Cross out the ones that wander off the topic.</p>' }
      ]
    }, {
      id: 'research', title: 'Research and organizing', sub: 'Good sources, credit, and sorted notes.',
      concepts: [
        { slug: 'reliable', title: 'Check that a source is reliable', exp: ['D1.3'], skill: 'sources',
          model: [
            step(W.sent('a book about wetlands by a scientist'), 'An expert. Trust it.'),
            step(W.sent('a post by someone with no name'), 'Who wrote it? Unknown.'),
            step(W.icon('think'), 'Ask: who, when, and do other sources agree?'),
            step(W.chain(NOTED[0], ['Who', 'Title', 'Where', 'When']), 'Then record where the facts came from.')
          ],
          guided: [function () { return reliable(1); }, sourceTf, record],
          check: [function () { return reliable(2); }, sourceCheck, sourceNote, sourceTf, function () { return reliable(3); }],
          coach: '<p>Use three simple tests: Who made it? When? Do two other sources say the same?</p>',
          mistake: '<p>Copying facts without writing down where they came from. Always record the creator and source.</p>' },
        { slug: 'organize', title: 'Sort notes, then put them in order', exp: ['D1.4'], skill: 'organize',
          model: [
            step(W.sent('Food &middot; Home &middot; Body'), 'Headings for the notes.'),
            step(W.sent('lives in a lodge') + ' &rarr; ' + W.tile('Home'), 'Each note under its heading.'),
            step(W.icon('write'), 'Each heading becomes a paragraph.'),
            step(W.chain(['Gather a pine cone.', 'Tie on string.', 'Spread sunflower butter.', 'Roll it in seeds.']), 'A how-to: the order you do it.')
          ],
          guided: [sortNotes, function () { return headingFor(1); }, function () { return orderSteps(1); }],
          check: [sortNotes, noteTf, function () { return orderSteps(2); }, formOrder, function () { return headingFor(2); }],
          coach: '<p>Write each note on a sticky note and sort them into piles on the table. Then put the piles in order.</p>',
          mistake: '<p>Writing facts in the order they were found. Group them first.</p>' }
      ]
    }],
    practice: [
      { id: 'purpose', name: 'Purpose, audience and form', code: 'D1.1', gen: formFit },
      { id: 'ideas', name: 'Gather ideas', code: 'D1.2', gen: ideas },
      { id: 'sources', name: 'Reliable sources', code: 'D1.3', gen: reliable },
      { id: 'organize', name: 'Sort and sequence', code: 'D1.4', gen: sortNotes }
    ],
    tasks: [
      { id: 'my-tools', title: 'What helped me plan?', code: 'D1.5', pic: W.icon('star'), say: 'Which planning tool helped you most? Why?',
        run: ['After planning a piece of writing, lay out the tools used: idea web, notes, headings, outline, talking it through.', 'The child explains which ones helped most, and how they made the writing better.'],
        rubric: ['Cannot name a tool yet.', 'Names a tool with help.', 'Names two tools and how they helped.', 'Explains how the tools helped and what they will use next time.'] }
    ]
  });

  Q.shapes('planning', {
    purpose: [[1, 'purpose', purposeOf], [2, 'match', matchPurpose], [1, 'tf', formTf]],
    ideas: [[1, 'off-topic', offTopic], [1, 'tf', ideaTf], [2, 'ways', ideaSource]],
    sources: [[1, 'record', record], [1, 'tf', sourceTf], [2, 'checks', sourceCheck], [2, 'note', sourceNote]],
    organize: [[1, 'heading', headingFor], [1, 'tf', noteTf], [1, 'order', orderSteps], [2, 'form-order', formOrder]]
  });
})();
