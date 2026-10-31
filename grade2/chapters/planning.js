/* Grade 2: planning writing.
   Ontario 2023 Language, Grade 2, Strand D (Composition), Developing Ideas and Organizing Content:
   D1.1 the topic, purpose and audience for texts they plan to create
   D1.2 generating ideas using simple strategies and drawing on lived experiences and other subjects
   D1.3 gathering information relevant to a topic from three or more sources
   D1.4 sorting and sequencing ideas, taking into account the text form
   With a grown-up: D1.5 the strategies that helped them develop ideas.
   All topics and ideas are written for this site. Answer checks: tests/verify/grade2-planning.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* [why you are writing, the form that fits] */
  var FORM = [['to tell about something that happened to you', 'a true story about me'], ['to get someone to agree with you', 'an opinion piece'], ['to tell someone how to do something', 'how-to steps'],
    ['to give facts about frogs', 'a fact book'], ['to thank Grandma for a gift', 'a thank-you card']];
  /* [who will read it, what helps that reader] */
  var AUDIENCE = [['your little cousin, who is four', 'short words and big pictures'], ['your teacher', 'neat writing and full sentences'], ['your best friend', 'a friendly, chatty voice']];
  /* [a piece of writing, its topic, wrong topics] */
  var TOPICS = [['We fed the goats. A lamb was born. I collected eggs.', 'a day at the farm', ['my new shoes', 'how to make soup']],
    ['First, fill the cup with soil. Next, push in a seed. Last, water it.', 'how to plant a seed', ['our trip to the lake', 'why cats are best']],
    ['Dogs make the best pets. They are loyal. They love to play.', 'why dogs make the best pets', ['how to wash a dog', 'a visit to the dentist']]];
  /* topics, ideas that fit, and ideas that do not */
  var TOPIC = [['My birthday party', ['the cake Grandma baked', 'playing games with friends', 'opening a gift'], ['how frogs hop', 'my bus ride to school']],
    ['All about frogs', ['what frogs eat', 'how tadpoles grow', 'where frogs live'], ['my favourite song', 'how to bake cookies']],
    ['Winter fun', ['sledding down a big hill', 'building a snow fort', 'skating at the rink'], ['swimming in the lake', 'picking apples']]];
  var GOODSRC = ['a library book about frogs', 'a website from a nature centre', 'a scientist who studies frogs', 'a video from a science museum'];
  var BADSRC = ['a cartoon where frogs drive cars', 'a guess', 'a made-up story about a talking frog'];
  /* plans in the right order, for each form */
  var ORDER = { 'a true story about me': ['We drove to the lake.', 'We set up our tent.', 'We swam until supper.', 'We roasted marshmallows.'],
    'how-to steps': ['Get two slices of bread.', 'Spread on the sunflower butter.', 'Put the slices together.', 'Cut it in half.'] };
  /* ideas to sort under fact book headings */
  var SORT = [['Food', ['eats flies', 'eats worms']], ['Home', ['lives near a pond', 'hides under logs']], ['Body', ['has long back legs', 'has wet, smooth skin']]];

  /* ---------- question makers ---------- */
  function formFor(lv) {
    var f = R.pick(FORM);
    return Q.tiles('You want to write <b>' + f[0] + '</b>. What will you write?', f[1], R.some(FORM.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }),
      { prompt: 'What is your purpose?', hint: 'Something that happened: a true story. Steps: how-to. Your view: an opinion.', explain: '<b>' + f[1] + '</b>.', meta: { k: 'g2-form-for', why: f[0] } });
  }
  function matchForm() {
    var fs = R.some(FORM, 3);
    return { q: 'Match each purpose to what you would write.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Think of what each one looks like.', explain: 'Your purpose tells you what to write.', meta: { k: 'g2-match-form' } };
  }
  function audience() {
    var a = R.pick(AUDIENCE);
    return Q.one('You are writing for <b>' + a[0] + '</b>. What will help them?', a[1], AUDIENCE.filter(function (x) { return x !== a; }).map(function (x) { return x[1]; }), {
      hint: 'Think about who will read it.', explain: 'For ' + a[0] + ': ' + a[1] + '.', meta: { k: 'g2-audience', who: a[0] } });
  }
  function topicOf() {
    var t = R.pick(TOPICS);
    return Q.one('What is the <b>topic</b> of this writing?', t[1], t[2], { fig: W.sent(t[0]), hint: 'What is all of it about?', explain: 'Every sentence is about ' + t[1] + '.', meta: { k: 'g2-topic-of', s: t[0] } });
  }
  function fitTopic() {
    var t = R.pick(TOPIC);
    return Q.all('Your topic: <b>' + t[0] + '</b>. Pick every idea that fits.', R.some(t[1], 2), [R.pick(t[2])], { hint: 'Does the idea belong with the topic?',
      explain: 'Keep only ideas about ' + t[0].toLowerCase() + '.', meta: { k: 'g2-fit-topic', topic: t[0] } });
  }
  function sources() {
    return Q.all('You need facts about frogs. Pick every <b>good place</b> to find them.', R.some(GOODSRC, 3), R.some(BADSRC, 1), {
      hint: 'Facts come from people and places that know. Use three or more.', explain: 'Books, trusted websites and experts give facts.', meta: { k: 'g2-sources' } });
  }
  function orderPlan() {
    var f = R.pick(Object.keys(ORDER)), s = ORDER[f];
    return { q: 'Your plan for <b>' + f + '</b>. Put the ideas in order.', type: 'order', items: s.slice(), first: 'First', last: 'Last', hint: 'What happens first? What has to come before the next part?', explain: s.join(' '), meta: { k: 'g2-order-plan' } };
  }
  function sortIdeas() {
    var groups = R.some(SORT, 3);
    return { q: 'A fact book about frogs. Match each idea to its heading.', type: 'match', pairs: groups.map(function (g) { return [R.pick(g[1]), g[0]]; }), hint: 'Is it about food, home, or body?', explain: 'Sort ideas into groups before you write.', meta: { k: 'g2-sort-ideas' } };
  }

  Atlas.register('planning', {
    lessons: [{
      id: 'what-why-who', title: 'What, why and who', sub: 'Topic, purpose and audience.',
      concepts: [
        { slug: 'topic', title: 'The topic is what it is all about', exp: ['D1.1'], skill: 'purpose-audience',
          model: [
            step(W.sent('We fed the goats. A lamb was born. I collected eggs.')),
            step(W.tile('a day at the farm'), 'Every sentence is about this.')
          ],
          guided: [topicOf, topicOf],
          check: [topicOf, topicOf],
          coach: '<p>Before writing, ask the child to say the topic in a few words. Write it at the top of the page.</p>',
          mistake: '<p>Choosing a topic that is too big ("animals"). Make it smaller: "my dog Biscuit".</p>' },
        { slug: 'purpose', title: 'Why are you writing?', exp: ['D1.1'], skill: 'purpose-audience',
          model: [
            step(W.icon('star'), 'Something happened to me: <b>a true story</b>.'),
            step(W.icon('think'), 'I want you to agree: <b>an opinion</b>.'),
            step(W.icon('write'), 'I want to tell how: <b>how-to steps</b>.')
          ],
          guided: [function () { return formFor(1); }, function () { return formFor(1); }],
          check: [function () { return formFor(2); }, matchForm],
          coach: '<p>Ask "Why are we writing this?" before any writing, even a shopping list.</p>',
          mistake: '<p>Starting to write before knowing why. The purpose decides what the writing looks like.</p>' },
        { slug: 'audience', title: 'Who will read it?', exp: ['D1.1'], skill: 'purpose-audience',
          model: [
            step(W.icon('people'), 'A little cousin: short words, big pictures.'),
            step(W.icon('read'), 'Your teacher: neat writing, full sentences.')
          ],
          guided: [audience, audience],
          check: [audience, audience],
          coach: '<p>Write the same message twice, once for a friend and once for a teacher. Talk about what changed.</p>',
          mistake: '<p>Writing for everyone the same way.</p>' }
      ]
    }, {
      id: 'ideas', title: 'Ideas and order', sub: 'Find ideas, gather facts, sort and order them.',
      concepts: [
        { slug: 'ideas', title: 'Ideas that fit the topic', exp: ['D1.2'], skill: 'ideas',
          model: [
            step(W.tile('Winter fun'), 'The topic.'),
            step(W.sent('sledding') + W.sent('a snow fort') + W.sent('skating'), 'These fit.'),
            step(W.sent('swimming in the lake'), 'This does not fit. Leave it out.')
          ],
          guided: [fitTopic, fitTopic],
          check: [fitTopic, fitTopic],
          coach: '<p>Make an idea web: the topic in the middle, ideas around it. Use things the child has done and learned in science or social studies.</p>',
          mistake: '<p>Keeping every idea. Ask: "Is this about our topic?"</p>' },
        { slug: 'sources', title: 'Facts from three places', exp: ['D1.3'], skill: 'ideas',
          model: [
            step(W.icon('read'), 'A book.'),
            step(W.icon('screen'), 'A website you can trust.'),
            step(W.icon('people'), 'A person who knows. That makes three.')
          ],
          guided: [sources, sources],
          check: [sources, sources],
          coach: '<p>For a fact book, find one fact in a library book, one on a trusted website, and one by asking someone.</p>',
          mistake: '<p>Using a made-up story as a source of facts.</p>' },
        { slug: 'order', title: 'Sort and order your ideas', exp: ['D1.4'], skill: 'ideas',
          model: [
            step(W.sent('We drove to the lake.') + W.sent('We set up our tent.'), 'A true story: the order it happened.'),
            step(W.sent('Food') + W.sent('Home') + W.sent('Body'), 'A fact book: group the facts.')
          ],
          guided: [orderPlan, sortIdeas],
          check: [orderPlan, sortIdeas],
          coach: '<p>Write each idea on a sticky note. Move the notes around until the order makes sense.</p>',
          mistake: '<p>Writing ideas in the order they were thought of. Sort them first.</p>' }
      ]
    }],
    practice: [
      { id: 'purpose-audience', name: 'Topic, purpose and audience', code: 'D1.1', gen: formFor },
      { id: 'ideas', name: 'Ideas and order', code: 'D1.2, D1.3, D1.4', gen: fitTopic }
    ],
    tasks: [
      { id: 'idea-web', title: 'My idea web', code: 'D1.2', pic: W.icon('think'), say: 'Make an idea web about something you did.', write: true,
        run: ['Write a topic in a circle in the middle of a page, such as "My weekend".', 'The child says ideas; draw lines out to each one. Use pictures as well as words.'],
        rubric: ['One idea, or ideas off topic.', 'Two or three ideas with help.', 'Four or more ideas on topic.', 'Many ideas on topic, with details added to some.'] },
      { id: 'three-sources', title: 'Three sources', code: 'D1.3', pic: W.icon('read'), say: 'Find one fact in a book, one on a website, and one from a person.', write: true,
        run: ['Choose an animal or place the child is curious about.', 'Find one fact in each of three places: a book, a trusted website, and a person.', 'Write or draw each fact.'],
        rubric: ['Finds no facts yet.', 'Finds one or two facts with help.', 'Finds a fact in each of three sources.', 'Finds facts in three sources and says which source was most helpful.'] },
      { id: 'plan-reflect', title: 'What helped me plan?', code: 'D1.5', pic: W.icon('star'), say: 'What helped you get ideas?',
        run: ['After planning, ask: "What helped you think of ideas? Talking, drawing, the web, a book?"'],
        rubric: ['Cannot say yet.', 'Names one thing with help.', 'Names a strategy that helped.', 'Names two strategies and says how each one helped.'] }
    ]
  });

  Q.shapes('planning', {
    'purpose-audience': [[1, 'topic', topicOf], [1, 'audience', audience], [2, 'match', matchForm]],
    ideas: [[1, 'sources', sources], [1, 'order', orderPlan], [1, 'sort', sortIdeas]]
  });
})();
