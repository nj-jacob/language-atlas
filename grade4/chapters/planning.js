/* Grade 4: planning writing.
   Ontario 2023 Language, Grade 4, D1 Developing Ideas and Organizing Content:
   D1.1 topic, purpose and audience, and why the chosen form, genre and medium suit them
   D1.2 generating and developing ideas, using a variety of strategies and resources
   D1.3 gathering information from a variety of sources, and recording the sources
   D1.4 selecting, classifying and sequencing ideas and information for the chosen form
   D1.5 (with a grown-up) describing the strategies and tools that helped
   All examples are written for this site. Answer checks: tests/verify/grade4-planning.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* [what you want to do, the form that fits, the purpose, the audience] */
  var JOBS = [['tell your class how to make a paper lantern', 'instructions', 'to explain how', 'your class'],
    ['convince the principal to start a chess club', 'a persuasive letter', 'to persuade', 'the principal'],
    ['share monarch facts with a Grade 2 class', 'an information poster', 'to inform', 'a Grade 2 class'],
    ['make your cousin laugh with a funny adventure', 'a story', 'to entertain', 'your cousin'],
    ['thank a guest speaker for visiting', 'a thank-you card', 'to thank', 'a guest speaker'],
    ['capture the first snowfall in a few vivid lines', 'a poem', 'to describe a feeling', 'anyone who reads it'],
    ['invite the neighbours to a garden party', 'an invitation', 'to invite', 'your neighbours'],
    ['tell a pen pal in Yukon about your week', 'a friendly letter', 'to share news', 'your pen pal'],
    ['retell your class trip to the science centre', 'a recount', 'to retell what happened', 'your teacher'],
    ['list the choices for a family pancake breakfast', 'a menu', 'to list choices', 'your family']];
  function others(col, not) { return JOBS.map(function (x) { return x[col]; }).filter(function (v) { return v !== not; }); }
  /* [goal, the medium that fits, a medium that does not] */
  var MEDIUM = [['show people how to tie a knot, step by step', 'a short video', 'a poem on a card'], ['remind your family to recycle every day', 'a sign on the fridge', 'a long speech'],
    ['share your science fair results with the whole school', 'a slide show', 'a note in your pocket'], ['send a birthday wish to a grandparent far away', 'an email or a card in the mail', 'a poster at school'],
    ['tell the whole school about a bake sale', 'a poster in the hallway', 'a diary entry'], ['tell a story to your little cousin at bedtime', 'a picture book', 'a bar graph'],
    ['show how the weather changed over a month', 'a chart or graph', 'a song'], ['send a quick reminder to a friend', 'a text message', 'a newspaper article']];
  function formFor(lv) {
    var j = R.pick(JOBS);
    return Q.one('You want to <b>' + j[0] + '</b>. Which form fits best?', j[1], R.some(others(1, j[1]), lv > 1 ? 3 : 2), {
      prompt: 'What is your purpose? Who will read it?', hint: 'Steps: instructions. Convince: a persuasive letter. Facts: an information text. Fun: a story.', explain: '<b>' + j[1] + '</b> fits: its purpose is ' + j[2] + '.', meta: { k: 'g4-form-for', job: j[0] } });
  }
  function purposeOf() {
    var j = R.pick(JOBS);
    return Q.tiles('You want to <b>' + j[0] + '</b>. What is your <b>purpose</b>?', j[2], R.some(others(2, j[2]), 2), {
      hint: 'Purpose means why you are writing.', explain: 'Your purpose is <b>' + j[2] + '</b>.', meta: { k: 'g4-purpose-of', job: j[0] } });
  }
  function audienceOf() {
    var j = R.pick(JOBS.filter(function (x) { return x[3] !== 'anyone who reads it'; }));
    return Q.tiles('You want to <b>' + j[0] + '</b>. Who is your <b>audience</b>?', j[3], R.some(others(3, j[3]), 2), {
      hint: 'The audience is who will read it.', explain: 'You are writing for <b>' + j[3] + '</b>.', meta: { k: 'g4-audience-of', job: j[0] } });
  }
  function mediumFor() {
    var m = R.pick(MEDIUM);
    return Q.one('You want to <b>' + m[0] + '</b>. Which medium fits better?', m[1], [m[2]], { hint: 'Who will see it, and how?', explain: '<b>' + m[1] + '</b> fits that goal.', meta: { k: 'g4-medium', goal: m[0] } });
  }
  function purposeTf() {
    var j = R.pick(JOBS), right = R.int(0, 1) === 1, said = right ? j[2] : R.pick(others(2, j[2]));
    return { q: 'True or false? Your purpose is <b>' + said + '</b>.', fig: W.means('think', 'I want to ' + j[0] + '.'), type: 'tf', answer: right,
      why: { options: ['The purpose is why you are writing.', 'Every piece of writing has the same purpose.'], answer: 0 }, hint: 'Why are you writing it?', explain: 'Your purpose is <b>' + j[2] + '</b>.', meta: { k: 'g4-write-purpose-tf', job: j[0], said: said } };
  }
  function jobFor() {
    var j = R.pick(JOBS), o = R.some(JOBS.filter(function (x) { return x !== j; }), 2);
    return Q.one('Which one is written <b>' + j[2] + '</b>?', 'to ' + j[0], o.map(function (x) { return 'to ' + x[0]; }), { hint: 'Think about why each one is written.', explain: 'To ' + j[0] + ': ' + j[2] + '.', meta: { k: 'g4-job-for', purpose: j[2] } });
  }
  function mediumTf() {
    var m = R.pick(MEDIUM), right = R.int(0, 1) === 1, med = right ? m[1] : m[2];
    return { q: 'True or false? <b>' + med + '</b> is a good medium for this.', fig: W.means('think', 'I want to ' + m[0] + '.'), type: 'tf', answer: right,
      why: { options: ['It fits how the audience will see it.', 'It does not reach the audience in the right way.'], answer: right ? 0 : 1 }, hint: 'Who will see it, and how?', explain: '<b>' + m[1] + '</b> fits.', meta: { k: 'g4-medium-tf', goal: m[0], med: med } };
  }
  function formTf() {
    var j = R.pick(JOBS), right = R.int(0, 1) === 1, f = right ? j[1] : R.pick(others(1, j[1]));
    return { q: 'True or false? <b>' + f + '</b> is the best form for this.', fig: W.means('think', 'I want to ' + j[0] + '.'), type: 'tf', answer: right,
      why: { options: ['The form must fit the purpose.', 'Any form works for any purpose.'], answer: 0 }, hint: 'What is your purpose?', explain: '<b>' + j[1] + '</b> fits: ' + j[2] + '.', meta: { k: 'g4-plan-form-tf', job: j[0], f: f } };
  }
  function formMatch() {
    var js = R.some(JOBS, 3);
    return { q: 'Match each form to its purpose.', type: 'match', pairs: js.map(function (j) { return [j[1], j[2]]; }), hint: 'Why would someone write each one?', explain: 'Choose the form that fits your purpose.', meta: { k: 'g4-form-match' } };
  }

  /* ---------- ideas, sources and order ---------- */
  var IDEAWAYS = ['Make an idea web.', 'Brainstorm a list.', 'Talk it over with someone.', 'Think about your own experiences.', 'Read about the topic.', 'Draw a quick sketch.', 'Ask yourself questions.'];
  var NOTWAYS = ['Copy a friend' + '’' + 's story.', 'Wait until an idea appears.', 'Write the first word you see.', 'Give up and pick any topic.', 'Copy a page from a book.', 'Let someone else choose everything.', 'Stop after one idea.'];
  /* idea webs: [topic, ideas that fit, ideas that do not] */
  var WEBS = [['Winter fun', ['skating', 'sledding', 'building a snow fort', 'ice fishing'], ['swimming at the beach', 'picking strawberries']],
    ['My dog', ['how she looks', 'tricks she knows', 'what she eats', 'where she sleeps'], ['my new bike', 'the weather in Peru']],
    ['Fall', ['colourful leaves', 'apple picking', 'geese flying south', 'Thanksgiving dinner'], ['swimming in the lake', 'planting seeds']],
    ['Being a good friend', ['sharing', 'listening', 'helping', 'being honest'], ['eating lunch fast', 'my favourite colour']],
    ['Our garden', ['planting seeds', 'watering', 'pulling weeds', 'picking beans'], ['skating', 'sledding']]];
  var RECORD = ['the title', 'the author or website name', 'the date it was published', 'the page or web address'];
  var NORECORD = ['the colour of the cover', 'how many pages you liked', 'the font', 'who lent it to you', 'how heavy the book is'];
  /* [what the source says, the same fact in your own words, a note that changes the fact] */
  var NOTES = [['Beavers have orange front teeth that never stop growing.', 'Beaver teeth keep growing all their lives.', 'Beaver teeth stop growing when they are one.'],
    ['Monarch butterflies fly up to 4000 km to reach Mexico each fall.', 'Each fall, monarchs travel as far as 4000 km to Mexico.', 'Monarchs fly 40 km to Mexico in the spring.'],
    ['The Canadian Shield covers almost half of Canada.', 'Almost half of Canada is part of the Canadian Shield.', 'The Canadian Shield covers all of Canada.'],
    ['Maple sap is boiled for hours to make syrup.', 'To make syrup, people boil maple sap for a long time.', 'Maple syrup comes straight out of the tree.'],
    ['Loons can dive as deep as 60 m to catch fish.', 'A loon can go 60 m under water to find fish.', 'Loons catch fish by flying over the water.']];
  /* [what you want to know, a source you can trust, one you cannot] */
  var TRUST = [['facts about polar bears', 'a zoo or science centre website', 'a comment under a video'], ['the history of your town', 'a library book by a historian', 'a rumour from a friend'],
    ['tomorrow' + '’' + 's weather', 'a weather service website', 'a guess from your brother'], ['how volcanoes work', 'a science encyclopedia', 'a cartoon about a volcano'],
    ['the rules of lacrosse', 'the official league website', 'a random post online']];
  /* facts to sort under headings for a report on beavers */
  var SORT = { Home: ['Beavers build lodges of sticks and mud.', 'A lodge has an underwater door.', 'Beavers build dams across streams.', 'The lodge stays warm in winter.'],
    Food: ['Beavers eat bark and twigs.', 'They store branches for winter.', 'Beavers eat water lilies in summer.', 'Aspen is a favourite tree to eat.'],
    Body: ['Beavers have flat, wide tails.', 'Their front teeth never stop growing.', 'Beavers have webbed back feet.', 'Thick fur keeps them dry.'] };
  var STORYPLAN = ['Meet the character and setting.', 'A problem starts.', 'Things get harder.', 'The problem is solved.', 'How the character feels at the end.'];
  function ideaWays() {
    return Q.all('Pick every good way to find ideas for writing.', R.some(IDEAWAYS, 2), R.some(NOTWAYS, 2), { hint: 'Which ones help you think of your own ideas?', explain: 'Webs, lists, talking and your own experiences all help.', meta: { k: 'g4-idea-ways' } });
  }
  function record(lv) {
    return Q.all('You found a fact in a book. Pick everything you should <b>record</b> about the source.', R.some(RECORD, lv > 1 ? 3 : 2), R.some(NORECORD, 2), {
      hint: 'What would someone need to find it again?', explain: 'Record the title, the author or website, and the date.', meta: { k: 'g4-record' } });
  }
  function sortFacts() {
    var heads = Object.keys(SORT);
    return { q: 'Match each fact to the heading it belongs under.', type: 'match', pairs: heads.map(function (h) { return [R.pick(SORT[h]), h]; }), hint: 'Is it about where they live, what they eat, or their body?',
      explain: 'Sorting facts under headings makes a report easy to follow.', meta: { k: 'g4-sort-facts' } };
  }
  function whichHeading() {
    var h = R.pick(Object.keys(SORT)), f = R.pick(SORT[h]);
    return Q.tiles('Which heading does this fact belong under?', h, Object.keys(SORT).filter(function (x) { return x !== h; }), { fig: W.sent(f), hint: 'What is the fact about?', explain: 'It belongs under <b>' + h + '</b>.', meta: { k: 'g4-which-heading', f: f } });
  }
  function ideaTf() {
    var good = R.int(0, 1) === 1, s = R.pick(good ? IDEAWAYS : NOTWAYS);
    return { q: 'True or false? This is a good way to find ideas.', fig: W.sent(s), type: 'tf', answer: good,
      why: { options: ['It helps you think of your own ideas.', 'It does not give you your own ideas.'], answer: good ? 0 : 1 }, hint: 'Does it help you think of your own ideas?', explain: good ? 'Yes, it helps.' : 'No, try a web or a list.', meta: { k: 'g4-idea-tf', s: s } };
  }
  function webFit() {
    var w = R.pick(WEBS), shown = R.some(w[1], 3), right = w[1].filter(function (x) { return shown.indexOf(x) < 0; })[0];
    return Q.tiles('Which idea also fits this web?', right, w[2], { fig: W.web(w[0], shown.concat([W.gap()])), hint: 'Is it about ' + w[0].toLowerCase() + '?', explain: '<b>' + right + '</b> fits: it is about ' + w[0].toLowerCase() + '.', meta: { k: 'g4-web-fit', topic: w[0] } });
  }
  function webOdd() {
    var w = R.pick(WEBS), shown = R.shuffle(R.some(w[1], 3).concat([R.pick(w[2])]));
    var odd = shown.filter(function (x) { return w[2].indexOf(x) >= 0; })[0];
    return { q: 'Which idea does <b>not</b> belong on this web?', fig: W.web(w[0], shown), type: 'tap', tiles: shown, answer: shown.indexOf(odd),
      hint: 'Which one is not about ' + w[0].toLowerCase() + '?', explain: '<b>' + odd + '</b> is about something else.', meta: { k: 'g4-web-odd', topic: w[0] } };
  }
  function sourceTf() {
    var good = R.int(0, 1) === 1, s = R.pick(good ? RECORD : NORECORD);
    return { q: 'True or false? Record <b>' + s + '</b> for your source.', type: 'tf', answer: good,
      why: { options: ['It helps someone find the source again.', 'It does not help anyone find the source.'], answer: good ? 0 : 1 }, hint: 'Would it help someone find it again?', explain: 'Record the title, the author or website, the date, and the page or web address.', meta: { k: 'g4-source-tf', s: s } };
  }
  function ownWords() {
    var n = R.pick(NOTES);
    return Q.one('Which note puts the fact in <b>your own words</b>?', n[1], [n[0], n[2]], { fig: W.passage('The source says', [n[0]]),
      hint: 'Same fact, new words. Do not copy, and do not change the fact.', explain: W.sent(n[1]), meta: { k: 'g4-own-words', src: n[0] } });
  }
  function trusted() {
    var t = R.pick(TRUST);
    return Q.tiles('You need <b>' + t[0] + '</b>. Which source can you trust more?', t[1], [t[2]], { hint: 'Who wrote it? Do they know the topic?', explain: '<b>' + t[1] + '</b>: experts check it.', meta: { k: 'g4-trusted', need: t[0] } });
  }
  function headingTf() {
    var hs = Object.keys(SORT), h = R.pick(hs), f = R.pick(SORT[h]), right = R.int(0, 1) === 1, said = right ? h : R.pick(hs.filter(function (x) { return x !== h; }));
    return { q: 'True or false? This fact goes under <b>' + said + '</b>.', fig: W.sent(f), type: 'tf', answer: right, hint: 'Is it about home, food or body?', explain: 'It goes under <b>' + h + '</b>.', meta: { k: 'g4-heading-tf', f: f, said: said } };
  }
  function planOrder(lv) {
    var items = lv > 1 ? STORYPLAN : STORYPLAN.slice(0, 4);
    return { q: 'Put the story plan in order.', type: 'order', items: items, first: 'Start', last: 'End', hint: 'A story starts with the character and ends with the problem solved.', explain: 'Beginning, problem, events, solution.', meta: { k: 'g4-plan-order' } };
  }

  Atlas.register('planning', {
    full: true,
    lessons: [{
      id: 'why-who', title: 'Purpose, audience and form', sub: 'Why you write and who for decide how.',
      concepts: [
        { slug: 'purpose-audience', title: 'Why are you writing, and who for?', exp: ['D1.1'], skill: 'purpose',
          model: [
            step(W.means('think', 'Convince the principal to start a chess club.')),
            step(W.sent('Purpose: <b>to persuade</b>'), 'Why I write.'),
            step(W.sent('Audience: <b>the principal</b>'), 'Who will read it.'),
            step(W.means('think', 'Tell a pen pal in Yukon about my week.'), 'Another one.'),
            step(W.sent('Purpose: <b>to share news</b>') + W.sent('Audience: <b>my pen pal</b>'), 'A friend: relaxed words are fine.')
          ],
          guided: [purposeOf, audienceOf, jobFor],
          check: [purposeOf, audienceOf, purposeTf, jobFor, purposeOf],
          coach: '<p>Before any writing, ask three questions out loud: "Why am I writing? Who will read it? What form fits?"</p>',
          mistake: '<p>Starting to write before deciding the purpose. The purpose changes the words, the length and the form.</p>' },
        { slug: 'form-medium', title: 'Choose the form and the medium', exp: ['D1.1'], skill: 'form-medium',
          model: [
            step(W.sent('to persuade the principal'), 'The form follows the purpose.'),
            step(W.sent('Form: <b>a persuasive letter</b>')),
            step(W.sent('Show how to tie a knot, step by step.'), 'Moving pictures help.'),
            step(W.sent('Medium: <b>a short video</b>'), 'The medium is how it reaches people.'),
            step(W.sent('Remind your family to recycle.') + W.sent('Medium: <b>a sign on the fridge</b>'), 'Where they will see it every day.')
          ],
          guided: [function () { return formFor(1); }, mediumFor, formMatch],
          check: [function () { return formFor(2); }, mediumFor, mediumTf, formTf, formMatch],
          coach: '<p>Look at the same message in different media (a poster, a video, a text message) and talk about which reaches which audience.</p>',
          mistake: '<p>Always choosing a poster or a story. Match the medium to how the audience will see it.</p>' }
      ]
    }, {
      id: 'ideas', title: 'Ideas, research and order', sub: 'Find ideas, gather facts, note sources, sort and order.',
      concepts: [
        { slug: 'find-ideas', title: 'Ways to find ideas', exp: ['D1.2'], skill: 'ideas',
          model: [
            step(W.web('Winter fun', [W.gap(), W.gap(), W.gap()]), 'Make an idea web. The topic goes in the middle.'),
            step(W.web('Winter fun', ['skating', 'sledding', 'a snow fort']), 'Add ideas from your own life.'),
            step(W.means('talk', 'Talk it over with someone.'), 'More ideas come.'),
            step(W.web('Winter fun', ['skating', 'sledding', 'a snow fort', '<s>beach</s>']), 'Cross out what does not fit.')
          ],
          guided: [ideaWays, webFit, ideaTf],
          check: [ideaWays, webFit, webOdd, ideaTf, webOdd],
          coach: '<p>Set a timer for two minutes and brainstorm together without judging. Then circle the best idea.</p>',
          mistake: '<p>Waiting for the perfect idea. Get many ideas down first, then choose.</p>' },
        { slug: 'sources', title: 'Gather facts and record the source', exp: ['D1.3'], skill: 'sources',
          model: [
            step(W.icon('read'), 'Find a fact in a book or on a trusted website.'),
            step(W.passage('The source says', ['Beavers have orange front teeth that never stop growing.'])),
            step(W.passage('Note card', ['Fact: Beaver teeth keep growing all their lives.']), 'Write it in your own words.'),
            step(W.passage('Note card', ['Fact: Beaver teeth keep growing all their lives.', 'Source: Canadian Animals, by M. Ross, 2021, page 12']), 'Add the source.'),
            step(W.sent('title &middot; author or website &middot; date &middot; page'), 'Now you can find it again.')
          ],
          guided: [function () { return record(1); }, ownWords, trusted],
          check: [function () { return record(2); }, ownWords, sourceTf, trusted, ownWords],
          coach: '<p>Make note cards together: one fact per card, with the source written at the bottom.</p>',
          mistake: '<p>Copying sentences word for word. Write the fact in your own words and record where it came from.</p>' },
        { slug: 'sort-order', title: 'Sort facts and put ideas in order', exp: ['D1.4'], skill: 'sort-order',
          model: [
            step(W.sent('Home &middot; Food &middot; Body'), 'Headings for a report on beavers.'),
            step(W.sent('Beavers eat bark and twigs.'), 'This goes under <b>Food</b>.'),
            step(W.sent('Beavers build dams across streams.'), 'This goes under <b>Home</b>.'),
            step(W.chain(['character', 'problem', 'events', 'solution']), 'A story needs a different order.'),
            step(W.icon('think'), 'Sort first, then put each group in order.')
          ],
          guided: [whichHeading, headingTf, function () { return planOrder(1); }],
          check: [whichHeading, sortFacts, headingTf, function () { return planOrder(2); }, whichHeading],
          coach: '<p>Spread note cards on a table and sort them into piles by heading. Then put each pile in order.</p>',
          mistake: '<p>Writing facts in the order they were found. Sort first, then order.</p>' }
      ]
    }],
    practice: [
      { id: 'purpose', name: 'Purpose and audience', code: 'D1.1', gen: purposeOf },
      { id: 'form-medium', name: 'Form and medium', code: 'D1.1', gen: formFor },
      { id: 'ideas', name: 'Finding ideas', code: 'D1.2', gen: ideaWays },
      { id: 'sources', name: 'Facts and sources', code: 'D1.3', gen: record },
      { id: 'sort-order', name: 'Sorting and ordering', code: 'D1.4', gen: whichHeading }
    ],
    tasks: [
      { id: 'idea-web', title: 'My idea web', code: 'D1.2', pic: W.icon('think'), say: 'Make an idea web about a topic that matters to you, like fairness or a place you love.', write: true,
        run: ['Help the child choose a topic. Topics about fairness, including others, or another school subject work well.', 'Write the topic in the middle of a page. Branch out ideas from reading, talking and their own life.', 'Choose the three best branches to write about.'],
        rubric: ['Few ideas, even with help.', 'Some ideas, mostly from prompts.', 'A full web of ideas from several sources, including their own life.', 'A rich web with ideas grouped and the best ones chosen with reasons.'] },
      { id: 'research', title: 'Research notes', code: 'D1.3', pic: W.icon('read'), say: 'Find three facts from two different sources. Write each fact and where it came from.', write: true,
        run: ['Choose a topic from science or social studies.', 'Find facts in a library book and a trusted website. Write each fact in the child' + '’' + 's own words.', 'Under each fact, record the title, the author or website, and the date.'],
        rubric: ['Copies facts; no sources recorded.', 'Some facts in own words; sources partly recorded.', 'Three facts in own words from two sources, each recorded.', 'Well-chosen facts from varied sources, all clearly recorded.'] },
      { id: 'plan-reflect', title: 'What helped me plan?', code: 'D1.5', pic: W.icon('star'), say: 'Which strategies and tools helped you plan? How did they make you a better writer?',
        run: ['After planning a piece, ask: "What helped you get ideas? What helped you put them in order?"', 'Ask: "What would you do the same next time? What would you change?"'],
        rubric: ['Cannot name a strategy yet.', 'Names a strategy with help.', 'Describes two strategies and how they helped.', 'Explains how strategies and tools helped, and sets a goal for next time.'] }
    ]
  });

  Q.shapes('planning', {
    purpose: [[1, 'audience', audienceOf], [1, 'which-job', jobFor], [1, 'true-false', purposeTf], [2, 'purpose', purposeOf]],
    'form-medium': [[1, 'medium', mediumFor], [1, 'medium-tf', mediumTf], [2, 'form-tf', formTf], [2, 'match', formMatch]],
    ideas: [[1, 'web-fit', webFit], [1, 'web-odd', webOdd], [1, 'true-false', ideaTf], [2, 'pick', ideaWays]],
    sources: [[1, 'own-words', ownWords], [1, 'trusted', trusted], [1, 'true-false', sourceTf], [2, 'record', record]],
    'sort-order': [[1, 'sort', sortFacts], [1, 'true-false', headingTf], [1, 'plan-order', planOrder], [2, 'heading', whichHeading]]
  });
})();
