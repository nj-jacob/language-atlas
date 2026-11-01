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

  /* [a piece of writing, its topic, wrong topics] */
  var TOPICS = [['We fed the goats. A lamb was born. I collected eggs.', 'a day at the farm', ['my new shoes', 'how to make soup']],
    ['First, fill the cup with soil. Next, push in a seed. Last, water it.', 'how to plant a seed', ['our trip to the lake', 'why cats are best']],
    ['Dogs make the best pets. They are loyal. They love to play.', 'why dogs make the best pets', ['how to wash a dog', 'a visit to the dentist']],
    ['Beavers have flat tails. They chew trees. They build lodges.', 'all about beavers', ['my birthday party', 'how to skate']],
    ['The snow was deep. We rolled three balls. Our snowman got a carrot nose.', 'building a snowman', ['why summer is best', 'facts about owls']],
    ['Grandma came by bus. She brought bannock. We played cards all night.', 'a visit from Grandma', ['how to bake bread', 'all about buses']],
    ['Recess should be longer. We need to move. We learn better after we play.', 'why recess should be longer', ['how to play tag', 'my first day of school']],
    ['Owls hunt at night. They can turn their heads far. They eat mice.', 'all about owls', ['a night at the cabin', 'how to draw a bird']],
    ['First, get a bowl. Next, add oats and milk. Last, stir and eat.', 'how to make oatmeal', ['my favourite breakfast place', 'all about cows']],
    ['We paddled to the island. A loon called. We ate lunch on a rock.', 'a canoe trip', ['how to build a canoe', 'why loons are best']]];
  /* [a topic small enough to write about, one that is too big] */
  var SIZE = [['my dog Biscuit', 'animals'], ['our trip to the lake', 'water'], ['how to make a snack', 'food'], ['the day I lost my tooth', 'my whole life'], ['my favourite hockey game', 'sports'],
    ['how monarch caterpillars grow', 'bugs'], ['our school garden', 'plants'], ['my first ride on a ferry', 'boats']];
  /* [why you are writing, the form that fits] */
  var FORM = [['to tell about something that happened to you', 'a true story about me'], ['to get someone to agree with you', 'an opinion piece'], ['to tell someone how to do something', 'how-to steps'],
    ['to give facts about frogs', 'a fact book'], ['to thank Grandma for a gift', 'a thank-you card'], ['to ask friends to come to your party', 'an invitation'],
    ['to remember what to buy at the store', 'a list'], ['to share a feeling with rhythm and sound', 'a poem']];
  /* [the start of a piece of writing, its form] */
  var SAMPLE = [['Last summer, I caught my first fish.', 'a true story about me'], ['I think recess should be longer.', 'an opinion piece'], ['First, wash your hands. Next, get a bowl.', 'how-to steps'],
    ['Frogs lay their eggs in ponds.', 'a fact book'], ['Dear Grandma, Thank you for the mittens.', 'a thank-you card'], ['Come to my party on Saturday at 2:00!', 'an invitation'],
    ['milk, eggs, apples, bread', 'a list'], ['Snow falls soft, snow falls slow, over the hills where the cold winds blow.', 'a poem']];
  /* [who will read it, what helps that reader] */
  var AUD = [['your little cousin, who is four', 'short words and big pictures'], ['your teacher', 'neat writing and full sentences'], ['your best friend', 'a friendly, chatty voice'],
    ['a visitor who has never been to your school', 'a map and clear directions'], ['people walking past your poster', 'big, bold words they can read from far away'],
    ['your grandma, who lives far away', 'news about what you have been doing']];
  /* [writing, who it is for] */
  var FOR = [['Hi Mo! Guess what? I got a puppy!', 'your best friend'], ['Dear Ms. Patel, I finished my reading log.', 'your teacher'], ['Big dog. Red ball. Dog runs!', 'your little cousin, who is four'],
    ['LOST CAT! Grey with white paws.', 'people walking past your poster'], ['Turn left at the gym. Our class is Room 4.', 'a visitor who has never been to your school'],
    ['Dear Grandma, We went skating on the canal. I miss you!', 'your grandma, who lives far away']];
  /* topics, ideas that fit, and ideas that do not */
  var IDEAS = [['My birthday party', ['the cake Grandma baked', 'playing games with friends', 'opening a gift'], ['how frogs hop', 'my bus ride to school']],
    ['All about frogs', ['what frogs eat', 'how tadpoles grow', 'where frogs live'], ['my favourite song', 'how to bake cookies']],
    ['Winter fun', ['sledding down a big hill', 'building a snow fort', 'skating at the rink'], ['swimming in the lake', 'picking apples']],
    ['A day at the beach', ['digging in the sand', 'finding shells', 'swimming in the waves'], ['raking leaves', 'my new pencil case']],
    ['All about moose', ['what moose eat', 'how big moose grow', 'where moose live'], ['my best friend', 'how to fly a kite']],
    ['How to care for a cat', ['feeding it every day', 'cleaning the litter box', 'brushing its fur'], ['planting tulips', 'the first day of school']],
    ['Our class trip to the farm', ['feeding the goats', 'seeing the barn', 'riding on the wagon'], ['my cousin in Calgary', 'how stars shine']],
    ['Why reading is fun', ['stories take you to new places', 'you learn new facts', 'you can share books with friends'], ['my favourite colour', 'how to tie a shoe']]];
  /* subjects to find facts about, and places to look */
  var SUBJ = ['frogs', 'moose', 'beavers', 'owls', 'maple trees', 'the moon', 'bees', 'whales'];
  function goodSrc(x) { return ['a library book about ' + x, 'a website from a science centre', 'an expert who studies ' + x, 'a video from a science museum']; }
  function badSrc(x) { return ['a cartoon where ' + x + ' can talk', 'a guess', 'a made-up story about ' + x]; }
  /* plans in the right order */
  var PLANS = [['a true story about me', ['We drove to the lake.', 'We set up our tent.', 'We swam until supper.', 'We roasted marshmallows.']],
    ['how-to steps', ['Get two slices of bread.', 'Spread on the sunflower butter.', 'Put the slices together.', 'Cut it in half.']],
    ['a true story about me', ['Snow fell all night.', 'We put on our snow pants.', 'We built a snowman.', 'We drank hot chocolate inside.']],
    ['how-to steps', ['Fill a cup with soil.', 'Push a seed into the soil.', 'Water the seed.', 'Put the cup in the sun.']],
    ['how-to steps', ['Wet your toothbrush.', 'Add a little toothpaste.', 'Brush every tooth.', 'Rinse your mouth.']],
    ['a true story about me', ['I woke up early.', 'We drove to the arena.', 'I put on my skates.', 'I scored my first goal.']]];
  /* ideas to sort under fact book headings */
  var SORT = { frogs: [['Food', ['eats flies', 'eats worms']], ['Home', ['lives near a pond', 'hides under logs']], ['Body', ['has long back legs', 'has wet, smooth skin']]],
    beavers: [['Food', ['eats bark', 'eats water plants']], ['Home', ['builds a lodge', 'lives in a pond']], ['Body', ['has a flat tail', 'has big front teeth']]] };
  var HOW = { 'a true story about me': 'the order it happened', 'how-to steps': 'the order of the steps', 'a fact book': 'in groups, with headings' };
  function others(list, x) { return list.filter(function (y) { return y !== x; }); }
  function T(f, a) { return function () { return f(a); }; }

  /* ---------- the topic ---------- */
  function topicOf(lv) {
    var t = R.pick(TOPICS);
    return Q.one('What is the <b>topic</b> of this writing?', t[1], t[2].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(t[0]), hint: 'What is all of it about?', explain: 'Every sentence is about ' + t[1] + '.', meta: { k: 'g2-topic-of', s: t[0] } });
  }
  function topicTf() {
    var t = R.pick(TOPICS), yes = R.int(0, 1) === 1, said = yes ? t[1] : R.pick(t[2]);
    return { q: Q.name() + ' says the topic is <b>' + said + '</b>.', fig: W.sent(t[0]), type: 'tf', answer: yes,
      why: { options: ['Every sentence is about that.', 'The sentences are about something else.'], answer: yes ? 0 : 1 },
      hint: 'What is all of it about?', explain: 'The topic: <b>' + t[1] + '</b>.', meta: { k: 'g2-topic-tf', s: t[0], said: said } };
  }
  function topicOff(lv) {
    var t = R.pick(TOPICS), mine = t[0].split(/(?<=\.) /), other = R.pick(others(TOPICS, t))[0].split(/(?<=\.) /), off = R.pick(other.filter(function (x) { return !/^(They|She|It) /.test(x); }));
    return Q.one('The topic is <b>' + t[1] + '</b>. Which sentence does <b>not</b> belong?', off, R.some(mine, lv > 1 ? 2 : 1), { hint: 'Which one is about something else?',
      explain: '<b>' + off + '</b> is about something else.', meta: { k: 'g2-topic-off', topic: t[1] } });
  }
  function topicSize() {
    var z = R.pick(SIZE);
    return Q.tiles('Which topic is <b>small enough</b> to write about?', z[0], [z[1]], { hint: 'A big topic has too much to say. Choose one part of it.', explain: '<b>' + z[0] + '</b> is one part of ' + z[1] + '.', meta: { k: 'g2-topic-size', big: z[1] } });
  }

  /* ---------- why you are writing ---------- */
  function formFor(lv) {
    var f = R.pick(FORM);
    return Q.tiles('You want to write <b>' + f[0] + '</b>. What will you write?', f[1], R.some(others(FORM, f), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }),
      { prompt: 'What is your purpose?', hint: 'Something that happened: a true story. Steps: how-to. Your view: an opinion.', explain: '<b>' + f[1] + '</b>.', meta: { k: 'g2-form-for', why: f[0] } });
  }
  function matchForm() {
    var fs = R.some(FORM, 3);
    return { q: 'Match each purpose to what you would write.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Think of what each one looks like.', explain: 'Your purpose tells you what to write.', meta: { k: 'g2-match-purpose' } };
  }
  function formTf() {
    var f = R.pick(FORM), yes = R.int(0, 1) === 1, said = yes ? f[1] : R.pick(others(FORM, f))[1];
    return { q: 'You want to write <b>' + f[0] + '</b>. ' + Q.name() + ' says to write <b>' + said + '</b>.', type: 'tf', answer: yes,
      why: { options: ['That form fits the purpose.', 'Another form fits the purpose better.'], answer: yes ? 0 : 1 },
      hint: 'What is your purpose?', explain: 'Write <b>' + f[1] + '</b>.', meta: { k: 'g2-form-tf', why: f[0], said: said } };
  }
  function formLooks(lv) {
    var x = R.pick(SAMPLE);
    return Q.tiles('What kind of writing does this start?', x[1], R.some(others(SAMPLE, x), lv > 1 ? 3 : 2).map(function (y) { return y[1]; }), { fig: W.sent(x[0]),
      hint: 'Is it a story, steps, facts, an opinion, a card, a list or a poem?', explain: 'It starts <b>' + x[1] + '</b>.', meta: { k: 'g2-form-looks', s: x[0] } });
  }

  /* ---------- who will read it ---------- */
  function audience(lv) {
    var a = R.pick(AUD);
    return Q.one('You are writing for <b>' + a[0] + '</b>. What will help them most?', a[1], R.some(others(AUD, a), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), {
      hint: 'Think about who will read it.', explain: 'For ' + a[0] + ': ' + a[1] + '.', meta: { k: 'g2-audience', who: a[0] } });
  }
  function audMatch() {
    var as = R.some(AUD, 3);
    return { q: 'Match each reader to what helps them.', type: 'match', pairs: as.map(function (a) { return [a[0], a[1]]; }), hint: 'Picture each reader.', explain: 'Think about the reader before you write.', meta: { k: 'g2-aud-match' } };
  }
  function audWho(lv) {
    var f = R.pick(FOR);
    return Q.one('Who is this written for?', f[1], R.some(others(FOR, f), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), { fig: W.sent(f[0]), hint: 'Look at the words, and how long the sentences are.',
      explain: 'It is written for <b>' + f[1] + '</b>.', meta: { k: 'g2-aud-who', s: f[0] } });
  }
  function audTf() {
    var a = R.pick(AUD), yes = R.int(0, 1) === 1, said = yes ? a[1] : R.pick(others(AUD, a))[1];
    return { q: 'You are writing for <b>' + a[0] + '</b>. ' + Q.name() + ' says to use <b>' + said + '</b>.', type: 'tf', answer: yes,
      why: { options: ['It helps that reader.', 'It helps a different reader.'], answer: yes ? 0 : 1 },
      hint: 'Picture the reader.', explain: 'For ' + a[0] + ': <b>' + a[1] + '</b>.', meta: { k: 'g2-aud-tf', who: a[0], said: said } };
  }

  /* ---------- ideas that fit ---------- */
  function fitTopic(lv) {
    var t = R.pick(IDEAS);
    return Q.all('Your topic: <b>' + t[0] + '</b>. Pick every idea that fits.', R.some(t[1], 2), lv > 1 ? t[2] : [R.pick(t[2])], { hint: 'Does the idea belong with the topic?',
      explain: 'Keep only ideas about ' + t[0].toLowerCase() + '.', meta: { k: 'g2-fit-topic', topic: t[0] } });
  }
  function ideaOut() {
    var t = R.pick(IDEAS), off = R.pick(t[2]), ideas = R.shuffle(R.some(t[1], 2).concat([off]));
    return { q: 'Which idea does <b>not</b> belong in this web?', fig: W.web(t[0], ideas), type: 'tap', tiles: ideas, answer: ideas.indexOf(off), hint: 'Is each idea about the topic?',
      explain: 'Leave out <b>' + off + '</b>.', meta: { k: 'g2-idea-out', topic: t[0] } };
  }
  function ideaTf() {
    var t = R.pick(IDEAS), yes = R.int(0, 1) === 1, idea = yes ? R.pick(t[1]) : R.pick(t[2]);
    return { q: 'Your topic: <b>' + t[0] + '</b>. ' + Q.name() + ' wants to add <b>' + idea + '</b>. Does it fit?', type: 'tf', answer: yes,
      why: { options: ['It is about the topic.', 'It is about something else.'], answer: yes ? 0 : 1 },
      hint: 'Does the idea belong with the topic?', explain: yes ? 'It fits.' : 'Leave it out.', meta: { k: 'g2-idea-tf', topic: t[0], idea: idea } };
  }
  function ideaMore(lv) {
    var t = R.pick(IDEAS), right = R.pick(t[1]);
    return Q.one('Your topic: <b>' + t[0] + '</b>. Which idea could you add?', right, lv > 1 ? t[2] : [R.pick(t[2])], { hint: 'Think of things you have done or learned.', explain: '<b>' + right + '</b> fits.', meta: { k: 'g2-idea-more', topic: t[0] } });
  }

  /* ---------- facts from three places ---------- */
  function sources(lv) {
    var x = R.pick(SUBJ);
    return Q.all('You need facts about <b>' + x + '</b>. Pick every <b>good place</b> to find them.', R.some(goodSrc(x), 3), R.some(badSrc(x), lv > 1 ? 2 : 1), {
      hint: 'Facts come from people and places that know.', explain: 'Books, trusted websites and experts give facts.', meta: { k: 'g2-sources', x: x } });
  }
  function srcBest(lv) {
    var x = R.pick(SUBJ), right = R.pick(goodSrc(x));
    return Q.one('Which is a good place to find facts about <b>' + x + '</b>?', right, R.some(badSrc(x), lv > 1 ? 2 : 1), { hint: 'Who or what really knows?', explain: '<b>' + right + '</b>.', meta: { k: 'g2-src-best', x: x } });
  }
  function srcTf() {
    var x = R.pick(SUBJ), yes = R.int(0, 1) === 1, src = R.pick(yes ? goodSrc(x) : badSrc(x));
    return { q: Q.name() + ' needs facts about ' + x + ' and uses <b>' + src + '</b>. Is that a good source?', type: 'tf', answer: yes,
      why: { options: ['It comes from someone who knows.', 'It is made up, or a guess.'], answer: yes ? 0 : 1 },
      hint: 'Are the facts real?', explain: yes ? 'A good source.' : 'Not a source of facts.', meta: { k: 'g2-src-tf', x: x, src: src } };
  }
  function srcCount() {
    var x = R.pick(SUBJ), tiles = ['one', 'two', 'three or more'];
    return { q: 'You are writing a fact book about <b>' + x + '</b>. How many sources should you use?', type: 'tap', tiles: tiles, answer: 2, hint: 'Check facts in more than one place.',
      explain: 'Use <b>three or more</b>: a book, a website, a person.', meta: { k: 'g2-src-count' } };
  }

  /* ---------- sort and order ---------- */
  function orderPlan() {
    var p = R.pick(PLANS);
    return { q: 'Your plan for <b>' + p[0] + '</b>. Put the ideas in order.', type: 'order', items: p[1].slice(), first: 'First', last: 'Last', hint: 'What happens first? What has to come before the next part?', explain: p[1].join(' '), meta: { k: 'g2-order-plan' } };
  }
  function sortIdeas() {
    var x = R.pick(Object.keys(SORT)), groups = SORT[x];
    return { q: 'A fact book about ' + x + '. Match each idea to its heading.', type: 'match', pairs: groups.map(function (g) { return [R.pick(g[1]), g[0]]; }), hint: 'Is it about food, home, or body?', explain: 'Sort ideas into groups before you write.', meta: { k: 'g2-sort-ideas', x: x } };
  }
  function firstIdea(lv) {
    var p = R.pick(PLANS);
    return Q.one('Your plan for <b>' + p[0] + '</b>. Which comes <b>first</b>?', p[1][0], R.some(p[1].slice(1), lv > 1 ? 2 : 1), { hint: 'What has to happen before the rest?', explain: '<b>' + p[1][0] + '</b>', meta: { k: 'g2-first-idea' } });
  }
  function orderHow() {
    var f = R.pick(Object.keys(HOW)), tiles = Object.keys(HOW).map(function (k) { return HOW[k]; });
    return { q: 'You are writing <b>' + f + '</b>. How will you order your ideas?', type: 'tap', tiles: tiles, answer: tiles.indexOf(HOW[f]),
      hint: 'A story: when. Steps: what comes next. Facts: what goes together.', explain: '<b>' + HOW[f] + '</b>', meta: { k: 'g2-order-how', form: f } };
  }

  Atlas.register('planning', {
    full: true,
    lessons: [{
      id: 'what-why-who', title: 'What, why and who', sub: 'Topic, purpose and audience.',
      concepts: [
        { slug: 'topic', title: 'The topic is what it is all about', exp: ['D1.1'], skill: 'topic',
          model: [
            step(W.sent('We fed the goats. A lamb was born. I collected eggs.')),
            step(W.tile('a day at the farm'), 'Every sentence is about this.'),
            step(W.tile('animals'), 'Too big. There is too much to say.'),
            step(W.tile('my dog Biscuit'), 'Small enough to write about.')
          ],
          guided: [T(topicOf, 1), topicSize, topicTf],
          check: [T(topicOf, 2), T(topicOff, 1), topicTf, topicSize, T(topicOff, 2)],
          coach: '<p>Before writing, ask the child to say the topic in a few words. Write it at the top of the page.</p>',
          mistake: '<p>Choosing a topic that is too big ("animals"). Make it smaller: "my dog Biscuit".</p>' },
        { slug: 'purpose', title: 'Why are you writing?', exp: ['D1.1'], skill: 'purpose',
          model: [
            step(W.icon('star'), 'Something happened to me: <b>a true story</b>.'),
            step(W.icon('think'), 'I want you to agree: <b>an opinion</b>.'),
            step(W.icon('write'), 'I want to tell how: <b>how-to steps</b>.'),
            step(W.sent('First, wash your hands. Next, get a bowl.'), 'You can tell from the start.')
          ],
          guided: [T(formFor, 1), T(formLooks, 1), formTf],
          check: [T(formFor, 2), matchForm, T(formLooks, 2), formTf, T(formFor, 2)],
          coach: '<p>Ask "Why are we writing this?" before any writing, even a shopping list.</p>',
          mistake: '<p>Starting to write before knowing why. The purpose decides what the writing looks like.</p>' },
        { slug: 'audience', title: 'Who will read it?', exp: ['D1.1'], skill: 'audience',
          model: [
            step(W.icon('people'), 'A little cousin: short words, big pictures.'),
            step(W.sent('Big dog. Red ball. Dog runs!')),
            step(W.icon('read'), 'Your teacher: neat writing, full sentences.'),
            step(W.sent('Dear Ms. Patel, I finished my reading log.'))
          ],
          guided: [T(audience, 1), T(audWho, 1), audTf],
          check: [T(audience, 2), audMatch, T(audWho, 2), audTf, T(audience, 2)],
          coach: '<p>Write the same message twice, once for a friend and once for a teacher. Talk about what changed.</p>',
          mistake: '<p>Writing for everyone the same way.</p>' }
      ]
    }, {
      id: 'ideas', title: 'Ideas and order', sub: 'Find ideas, gather facts, sort and order them.',
      concepts: [
        { slug: 'ideas', title: 'Ideas that fit the topic', exp: ['D1.2'], skill: 'ideas',
          model: [
            step(W.tile('Winter fun'), 'The topic.'),
            step(W.web('Winter fun', ['sledding', 'a snow fort', 'skating']), 'These fit.'),
            step(W.sent('swimming in the lake'), 'This does not fit. Leave it out.'),
            step(W.web('All about frogs', ['what they eat', 'how tadpoles grow', 'where they live']), 'Ideas from science class.')
          ],
          guided: [T(fitTopic, 1), T(ideaMore, 1), ideaOut],
          check: [T(fitTopic, 2), ideaTf, ideaOut, T(ideaMore, 2), T(fitTopic, 2)],
          coach: '<p>Make an idea web: the topic in the middle, ideas around it. Use things the child has done and learned in science or social studies.</p>',
          mistake: '<p>Keeping every idea. Ask: "Is this about our topic?"</p>' },
        { slug: 'sources', title: 'Facts from three places', exp: ['D1.3'], skill: 'sources',
          model: [
            step(W.icon('read'), 'A book.'),
            step(W.icon('screen'), 'A website you can trust.'),
            step(W.icon('people'), 'A person who knows. That makes three.'),
            step(W.sent('a cartoon where frogs can talk'), 'Made up. Not a source of facts.')
          ],
          guided: [T(sources, 1), T(srcBest, 1), srcCount],
          check: [T(sources, 2), srcTf, T(srcBest, 2), srcCount, T(sources, 2)],
          coach: '<p>For a fact book, find one fact in a library book, one on a trusted website, and one by asking someone.</p>',
          mistake: '<p>Using a made-up story as a source of facts.</p>' },
        { slug: 'order', title: 'Sort and order your ideas', exp: ['D1.4'], skill: 'order',
          model: [
            step(W.chain(['We drove to the lake.', 'We set up our tent.', 'We swam.']), 'A true story: the order it happened.'),
            step(W.chain(['Get bread.', 'Spread it.', 'Cut it.']), 'How-to: the order of the steps.'),
            step(W.sent('Food') + W.sent('Home') + W.sent('Body'), 'A fact book: group the facts.'),
            step(W.sent('eats flies') + ' &rarr; ' + W.tile('Food'))
          ],
          guided: [orderPlan, T(firstIdea, 1), orderHow],
          check: [orderPlan, sortIdeas, T(firstIdea, 2), orderHow, sortIdeas],
          coach: '<p>Write each idea on a sticky note. Move the notes around until the order makes sense.</p>',
          mistake: '<p>Writing ideas in the order they were thought of. Sort them first.</p>' }
      ]
    }],
    practice: [
      { id: 'topic', name: 'The topic', code: 'D1.1', gen: topicOf },
      { id: 'purpose', name: 'Purpose and form', code: 'D1.1', gen: formFor },
      { id: 'audience', name: 'Audience', code: 'D1.1', gen: audience },
      { id: 'ideas', name: 'Ideas that fit', code: 'D1.2', gen: fitTopic },
      { id: 'sources', name: 'Sources of facts', code: 'D1.3', gen: sources },
      { id: 'order', name: 'Sort and order', code: 'D1.4', gen: orderPlan }
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
    topic: [[1, 'tf', topicTf], [1, 'size', topicSize], [1, 'off', topicOff]],
    purpose: [[1, 'looks', formLooks], [1, 'tf', formTf], [2, 'match', matchForm]],
    audience: [[1, 'who', audWho], [1, 'tf', audTf], [2, 'match', audMatch]],
    ideas: [[1, 'more', ideaMore], [1, 'out', ideaOut], [1, 'tf', ideaTf]],
    sources: [[1, 'best', srcBest], [1, 'tf', srcTf], [1, 'count', srcCount]],
    order: [[1, 'first', firstIdea], [1, 'how', orderHow], [1, 'sort', sortIdeas]]
  });
})();
