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
    ['capture the first snowfall in a few vivid lines', 'a poem', 'to describe a feeling', 'anyone who reads it']];
  /* [goal, the medium that fits, a medium that does not] */
  var MEDIUM = [['show people how to tie a knot, step by step', 'a short video', 'a poem on a card'], ['remind your family to recycle every day', 'a sign on the fridge', 'a long speech'],
    ['share your science fair results with the whole school', 'a slide show', 'a note in your pocket'], ['send a birthday wish to a grandparent far away', 'an email or a card in the mail', 'a poster at school']];
  function formFor(lv) {
    var j = R.pick(JOBS);
    return Q.one('You want to <b>' + j[0] + '</b>. Which form fits best?', j[1], R.some(JOBS.filter(function (x) { return x !== j; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      prompt: 'What is your purpose? Who will read it?', hint: 'Steps: instructions. Convince: a persuasive letter. Facts: an information text. Fun: a story.', explain: '<b>' + j[1] + '</b> fits: its purpose is ' + j[2] + '.', meta: { k: 'g4-form-for', job: j[0] } });
  }
  function purposeOf() {
    var j = R.pick(JOBS);
    return Q.tiles('You want to <b>' + j[0] + '</b>. What is your <b>purpose</b>?', j[2], R.some(JOBS.filter(function (x) { return x[2] !== j[2]; }), 2).map(function (x) { return x[2]; }), {
      hint: 'Purpose means why you are writing.', explain: 'Your purpose is <b>' + j[2] + '</b>.', meta: { k: 'g4-purpose-of', job: j[0] } });
  }
  function audienceOf() {
    var j = R.pick(JOBS.filter(function (x) { return x[3] !== 'anyone who reads it'; }));
    return Q.tiles('You want to <b>' + j[0] + '</b>. Who is your <b>audience</b>?', j[3], R.some(JOBS.filter(function (x) { return x[3] !== j[3]; }), 2).map(function (x) { return x[3]; }), {
      hint: 'The audience is who will read it.', explain: 'You are writing for <b>' + j[3] + '</b>.', meta: { k: 'g4-audience-of', job: j[0] } });
  }
  function mediumFor() {
    var m = R.pick(MEDIUM);
    return Q.one('You want to <b>' + m[0] + '</b>. Which medium fits better?', m[1], [m[2]], { hint: 'Who will see it, and how?', explain: '<b>' + m[1] + '</b> fits that goal.', meta: { k: 'g4-medium', goal: m[0] } });
  }
  function formMatch() {
    var js = R.some(JOBS, 3);
    return { q: 'Match each form to its purpose.', type: 'match', pairs: js.map(function (j) { return [j[1], j[2]]; }), hint: 'Why would someone write each one?', explain: 'Choose the form that fits your purpose.', meta: { k: 'g4-form-match' } };
  }

  /* ---------- ideas, sources and order ---------- */
  var IDEAWAYS = ['Make an idea web.', 'Brainstorm a list.', 'Talk it over with someone.', 'Think about your own experiences.'];
  var NOTWAYS = ['Copy a friend' + '’' + 's story.', 'Wait until an idea appears.', 'Write the first word you see.', 'Give up and pick any topic.'];
  var RECORD = ['the title', 'the author or website name', 'the date it was published'];
  var NORECORD = ['the colour of the cover', 'how many pages you liked', 'the font'];
  /* facts to sort under headings for a report on beavers */
  var SORT = { Home: ['Beavers build lodges of sticks and mud.', 'A lodge has an underwater door.'], Food: ['Beavers eat bark and twigs.', 'They store branches for winter.'],
    Body: ['Beavers have flat, wide tails.', 'Their front teeth never stop growing.'] };
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
  function planOrder(lv) {
    var items = lv > 1 ? STORYPLAN : STORYPLAN.slice(0, 4);
    return { q: 'Put the story plan in order.', type: 'order', items: items, first: 'Start', last: 'End', hint: 'A story starts with the character and ends with the problem solved.', explain: 'Beginning, problem, events, solution.', meta: { k: 'g4-plan-order' } };
  }

  Atlas.register('planning', {
    lessons: [{
      id: 'why-who', title: 'Purpose, audience and form', sub: 'Why you write and who for decide how.',
      concepts: [
        { slug: 'purpose-audience', title: 'Why are you writing, and who for?', exp: ['D1.1'], skill: 'purpose-form',
          model: [
            step(W.means('think', 'Convince the principal to start a chess club.')),
            step(W.sent('Purpose: <b>to persuade</b>. Audience: <b>the principal</b>.')),
            step(W.sent('Form: a persuasive letter'), 'It fits the purpose and the reader.')
          ],
          guided: [purposeOf, audienceOf],
          check: [purposeOf, function () { return formFor(1); }],
          coach: '<p>Before any writing, ask three questions out loud: "Why am I writing? Who will read it? What form fits?"</p>',
          mistake: '<p>Starting to write before deciding the purpose. The purpose changes the words, the length and the form.</p>' },
        { slug: 'form-medium', title: 'Choose the form and the medium', exp: ['D1.1'], skill: 'purpose-form',
          model: [
            step(W.sent('Show how to tie a knot, step by step.'), 'Moving pictures help.'),
            step(W.sent('a short video'), 'The medium fits.'),
            step(W.sent('Remind your family to recycle.') + W.sent('a sign on the fridge'), 'Where they will see it every day.')
          ],
          guided: [mediumFor, formMatch],
          check: [mediumFor, function () { return formFor(2); }],
          coach: '<p>Look at the same message in different media (a poster, a video, a text message) and talk about which reaches which audience.</p>',
          mistake: '<p>Always choosing a poster or a story. Match the medium to how the audience will see it.</p>' }
      ]
    }, {
      id: 'ideas', title: 'Ideas, research and order', sub: 'Find ideas, gather facts, note sources, sort and order.',
      concepts: [
        { slug: 'find-ideas', title: 'Ways to find ideas', exp: ['D1.2'], skill: 'ideas',
          model: [
            step(W.icon('think'), 'Make an idea web.'),
            step(W.icon('talk'), 'Talk it over with someone.'),
            step(W.icon('star'), 'Use your own experiences.')
          ],
          guided: [ideaWays, ideaWays],
          check: [ideaWays, ideaWays],
          coach: '<p>Set a timer for two minutes and brainstorm together without judging. Then circle the best idea.</p>',
          mistake: '<p>Waiting for the perfect idea. Get many ideas down first, then choose.</p>' },
        { slug: 'sources', title: 'Gather facts and record the source', exp: ['D1.3'], skill: 'ideas',
          model: [
            step(W.icon('read'), 'Find a fact in a book or on a trusted website.'),
            step(W.passage('Note card', ['Fact: Beaver teeth never stop growing.', 'Source: Canadian Animals, by M. Ross, 2021'])),
            step(W.sent('title &middot; author or website &middot; date'), 'Now you can find it again.')
          ],
          guided: [function () { return record(1); }, function () { return record(1); }],
          check: [function () { return record(2); }, function () { return record(2); }],
          coach: '<p>Make note cards together: one fact per card, with the source written at the bottom.</p>',
          mistake: '<p>Copying sentences word for word. Write the fact in your own words and record where it came from.</p>' },
        { slug: 'sort-order', title: 'Sort facts and put ideas in order', exp: ['D1.4'], skill: 'ideas',
          model: [
            step(W.sent('Home &middot; Food &middot; Body'), 'Headings for a report on beavers.'),
            step(W.sent('Beavers eat bark and twigs.'), 'This goes under <b>Food</b>.'),
            step(W.sent('character &rarr; problem &rarr; events &rarr; solution'), 'A story needs a different order.')
          ],
          guided: [whichHeading, function () { return planOrder(1); }],
          check: [sortFacts, function () { return planOrder(2); }],
          coach: '<p>Spread note cards on a table and sort them into piles by heading. Then put each pile in order.</p>',
          mistake: '<p>Writing facts in the order they were found. Sort first, then order.</p>' }
      ]
    }],
    practice: [
      { id: 'purpose-form', name: 'Purpose, audience, form and medium', code: 'D1.1', gen: formFor },
      { id: 'ideas', name: 'Ideas, sources and order', code: 'D1.2, D1.3, D1.4', gen: whichHeading }
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
    'purpose-form': [[1, 'purpose', purposeOf], [1, 'audience', audienceOf], [1, 'medium', mediumFor], [2, 'match', formMatch]],
    ideas: [[1, 'idea-ways', ideaWays], [1, 'record', record], [1, 'sort', sortFacts], [1, 'plan-order', planOrder]]
  });
})();
