/* Grade 6: planning and research.
   Ontario 2023 Language, Grade 6, D1 Developing Ideas and Organizing Content:
   D1.1 topic, purpose and audience, and why a form, genre and medium suit them   D1.2 generating and developing ideas, using various strategies and resources
   D1.3 gathering information from multiple sources, summarizing, checking reliability, and recording the creator and source
   D1.4 classifying and sequencing ideas for the chosen form                       D1.5 (with a grown-up) how strategies and tools helped
   Answer checks: tests/verify/grade6-planning.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  var AP = '’';

  function others(list, item) { return list.filter(function (x) { return x !== item; }); }
  function tfWhy(right, yes, no) { return { options: [yes, no], answer: right ? 0 : 1 }; }

  /* ---------- purpose: [a piece of writing, its main purpose] ---------- */
  var PURPOSES = ['to persuade', 'to inform', 'to entertain', 'to explain how'];
  var PURPOSE = [['a letter asking the mayor for a skate park', 0], ['an ad for the school bake sale', 0], ['a speech asking classmates to vote for you', 0], ['a poster urging people to save water', 0],
    ['a report on how glaciers form', 1], ['a news article about a new library', 1], ['a fact sheet about snowy owls', 1], ['a biography of a Canadian astronaut', 1],
    ['a funny story about a lost hamster', 2], ['a comic about a talking moose', 2], ['a mystery set at a summer camp', 2], ['a silly poem about socks', 2],
    ['steps for building a birdhouse', 3], ['a recipe for bannock', 3], ['instructions for a board game', 3], ['a guide to setting up a tent', 3]];
  function purposeOf(lv) {
    var p = R.pick(PURPOSE);
    return Q.one('What is the main <b>purpose</b> of ' + p[0] + '?', PURPOSES[p[1]], R.some(PURPOSES.filter(function (x, i) { return i !== p[1]; }), lv > 1 ? 3 : 2), {
      prompt: 'What does the writer want the reader to do or feel?', hint: 'Persuade, inform, entertain, or explain how?', explain: 'Its purpose is <b>' + PURPOSES[p[1]] + '</b>.', meta: { k: 'g6-purpose-of', piece: p[0] } });
  }
  function purposeTf() {
    var p = R.pick(PURPOSE), right = R.int(0, 1) === 1, said = right ? p[1] : R.pick([0, 1, 2, 3].filter(function (i) { return i !== p[1]; }));
    return { q: Q.name() + ' says ' + p[0] + ' is written <b>' + PURPOSES[said] + '</b>.', type: 'tf', answer: right, why: tfWhy(right, 'That is what it sets out to do.', 'It sets out to do something else.'),
      hint: 'Persuade, inform, entertain, or explain how?', explain: 'Its purpose is <b>' + PURPOSES[p[1]] + '</b>.', meta: { k: 'g6-plan-purpose-tf', piece: p[0], said: PURPOSES[said] } };
  }
  function onePerPurpose(n) { return R.some([0, 1, 2, 3], n).map(function (i) { return R.pick(PURPOSE.filter(function (p) { return p[1] === i; })); }); }
  function purposeMatch() {
    return { q: 'Match each piece to its purpose.', type: 'match', pairs: onePerPurpose(3).map(function (p) { return [p[0], PURPOSES[p[1]]]; }), hint: 'What does each one want the reader to do?',
      explain: 'Every piece has a main purpose.', meta: { k: 'g6-purpose-match' } };
  }
  function purposePick() {
    var i = R.int(0, 3);
    return Q.all('Pick every piece written <b>' + PURPOSES[i] + '</b>.', R.some(PURPOSE.filter(function (p) { return p[1] === i; }), 2).map(function (p) { return p[0]; }),
      R.some(PURPOSE.filter(function (p) { return p[1] !== i; }), 2).map(function (p) { return p[0]; }), { hint: 'What does each one want the reader to do?', explain: 'The purpose shapes the whole piece.', meta: { k: 'g6-purpose-pick', purpose: PURPOSES[i] } });
  }

  /* ---------- form: [what you want to do, the best form, forms that suit it less] ---------- */
  var FORM = [['convince the town council to add bike lanes', 'a formal letter', ['a comic strip', 'a poem']], ['teach Grade 1 students to wash their hands', 'an illustrated poster', ['a formal letter', 'a research report']],
    ['share your class trip with families', 'a blog post with photos', ['a memo', 'a formal letter']], ['explain how to set up a tent', 'numbered steps with diagrams', ['a poem', 'an opinion piece']],
    ['tell younger kids a story about kindness', 'a picture book', ['a memo', 'a research report']], ['remind classmates about the book fair date', 'a short notice on the bulletin board', ['a picture book', 'a research report']],
    ['share what you found out about local wetlands', 'a research report', ['a comic strip', 'a thank-you card']], ['thank an Elder for visiting the class', 'a thank-you card', ['a research report', 'numbered steps with diagrams']],
    ['tell the principal about a broken water fountain', 'a short memo', ['a picture book', 'a poem']], ['share your feelings about the first snowfall', 'a poem', ['a memo', 'numbered steps with diagrams']],
    ['persuade families to walk to school', 'an opinion piece in the newsletter', ['a picture book', 'numbered steps with diagrams']], ['teach your class about a science experiment', 'a slide show with diagrams', ['a poem', 'a thank-you card']]];
  function bestForm(lv) {
    var f = R.pick(FORM);
    return Q.one('You want to <b>' + f[0] + '</b>. Which form fits best?', f[1], f[2].slice(0, lv > 1 ? 2 : 1), { prompt: 'Who is the audience? What is the purpose?',
      hint: 'Match the form to the reader and the job.', explain: '<b>' + f[1] + '</b> suits that audience and purpose.', meta: { k: 'g6-best-form', want: f[0] } });
  }
  function formMatch() {
    var f = R.some(FORM, 3);
    return { q: 'Match each goal to the form that fits best.', type: 'match', pairs: f.map(function (x) { return [x[0], x[1]]; }), hint: 'Think about the audience.', explain: 'The form should suit the purpose and the audience.', meta: { k: 'g6-form-match' } };
  }
  function formTf() {
    var f = R.pick(FORM), right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(f[2]);
    return { q: Q.name() + ' wants to ' + f[0] + ', and chooses <b>' + said + '</b>.', type: 'tf', answer: right, why: tfWhy(right, 'It suits that reader and purpose.', 'Another form would suit the reader better.'),
      prompt: 'Is that the best form?', hint: 'Who will read it?', explain: '<b>' + f[1] + '</b> fits best.', meta: { k: 'g6-plan-form-tf', want: f[0], said: said } };
  }
  function formFor(lv) {
    var f = R.pick(FORM);
    return Q.one('Which goal is <b>' + f[1] + '</b> best for?', f[0], R.some(others(FORM, f), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Who would read it, and why?', explain: '<b>' + f[1] + '</b>: to ' + f[0] + '.', meta: { k: 'g6-form-for', form: f[1] } });
  }

  /* ---------- getting ideas: [the problem, the strategy that fits] ---------- */
  var STRATEGY = [['You have lots of ideas, but they are a mess.', 'Make an idea web.'], ['You want to know what school was like in the 1970s.', 'Interview a grandparent or Elder.'],
    ['You want to write about feeling included at school.', 'Think about your own experiences, and ask classmates about theirs.'], ['You are stuck for a topic.', 'Brainstorm a list for five minutes without judging.'],
    ['You need facts about how wind turbines work.', 'Search a library database or a reliable website.'], ['You want to describe a place, but cannot remember the details.', 'Look at photos of the place and list what you see.'],
    ['You cannot choose between two topics.', 'Make a quick list of what you know about each one.'], ['You want to write a story but have no plot.', 'Ask "What if?" questions about an ordinary day.'],
    ['You want to know what people in your school think.', 'Make a short survey and ask ten people.'], ['Your ideas feel flat and ordinary.', 'Talk them over with a partner and ask for questions.']];
  function strategy(lv) {
    var s = R.pick(STRATEGY);
    return Q.one('Which strategy would help most?', s[1], R.some(others(STRATEGY, s), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: W.means('think', s[0]), prompt: 'What exactly is the problem?', hint: 'What is the problem: too many ideas, too few, or missing facts?', explain: s[1], meta: { k: 'g6-strategy', s: s[0] } });
  }
  function strategyTf() {
    var s = R.pick(STRATEGY), right = R.int(0, 1) === 1, said = right ? s[1] : R.pick(others(STRATEGY, s))[1];
    return { q: Q.name() + ' suggests: <b>' + said + '</b>', fig: W.means('think', s[0]), type: 'tf', answer: right, why: tfWhy(right, 'It solves that problem.', 'It does not solve that problem.'),
      hint: 'Does it fix that exact problem?', explain: s[1], meta: { k: 'g6-strategy-tf', s: s[0], said: said } };
  }
  function strategyMatch() {
    var ss = R.some(STRATEGY, 3);
    return { q: 'Match each problem to a strategy that helps.', type: 'match', pairs: ss.map(function (s) { return [s[0], s[1]]; }), hint: 'What does each writer need?', explain: 'Pick the strategy that fits the problem.', meta: { k: 'g6-strategy-match' } };
  }
  function strategyFor(lv) {
    var s = R.pick(STRATEGY);
    return Q.one('Which problem does this strategy solve?', s[0], R.some(others(STRATEGY, s), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      fig: W.means('star', s[1]), hint: 'What would this give the writer?', explain: s[0], meta: { k: 'g6-strategy-for', said: s[1] } });
  }

  /* ---------- notes: [a sentence from a source, a note in your own words, an off-topic note] ---------- */
  var NOTES = [['Beavers are the largest rodents in North America, and their dams can be hundreds of metres long.', 'Beavers: biggest rodents in N. America; dams can be very long.', 'Beavers are cute.'],
    ['The Rideau Canal, opened in 1832, becomes the world' + AP + 's largest skating rink each winter.', 'Rideau Canal: opened 1832; huge skating rink in winter.', 'I like skating.'],
    ['Monarch butterflies travel up to 4500 km to spend the winter in Mexico.', 'Monarchs: fly up to 4500 km to Mexico for winter.', 'Mexico is hot.'],
    ['Canada has the longest coastline in the world, at more than 240 000 km.', 'Canada: longest coastline in the world, 240 000+ km.', 'I want to visit the ocean.'],
    ['An inuksuk is a stone landmark built by Inuit to guide travellers and mark important places.', 'Inuksuk: stone landmark by Inuit; guides travellers, marks places.', 'Stones are heavy.'],
    ['Honeybees visit about two million flowers to make one jar of honey.', 'Honeybees: about 2 million flowers per jar of honey.', 'Honey is sweet.'],
    ['The Trans Canada Trail is more than 28 000 km long and links every province and territory.', 'Trans Canada Trail: 28 000+ km; links all provinces and territories.', 'Hiking is fun.'],
    ['Loons can dive as deep as 60 m to catch fish.', 'Loons: dive up to 60 m for fish.', 'Fish are slippery.'],
    ['It takes about 40 litres of maple sap to make 1 litre of maple syrup.', 'Maple syrup: about 40 L sap makes 1 L syrup.', 'Pancakes are my favourite.'],
    ['Glaciers cover about one tenth of all the land on Earth.', 'Glaciers: cover about 1/10 of Earth' + AP + 's land.', 'Ice is cold.']];
  var WHAT = ['Nothing. It is a good note.', 'It copies the source word for word.', 'It is not about the source.'];
  function ownWords(lv) {
    var n = R.pick(NOTES);
    return Q.one('Which is the best <b>note</b>?', n[1], [n[0]].concat(lv > 1 ? [n[2]] : []), { fig: W.sent(n[0]), prompt: 'Short, in your own words, and on topic.',
      hint: 'Copying the whole sentence is not a summary.', explain: n[1], meta: { k: 'g6-own-words', src: n[0] } });
  }
  function noteTf() {
    var n = R.pick(NOTES), kind = R.int(0, 2), note = n[[1, 0, 2][kind]];
    return { q: Q.name() + ' wrote this note. Is it a good note?', fig: W.sent(n[0]) + W.means('write', note), type: 'tf', answer: kind === 0, why: tfWhy(kind === 0, 'It is short, in own words, and on topic.', 'It is copied or off topic.'),
      hint: 'Short, own words, on topic?', explain: n[1], meta: { k: 'g6-note-tf', src: n[0], note: note } };
  }
  function noteWhat() {
    var n = R.pick(NOTES), kind = R.int(0, 2), note = n[[1, 0, 2][kind]];
    return { q: 'What is wrong with this note?', fig: W.sent(n[0]) + W.means('write', note), type: 'tap', tiles: WHAT, answer: kind,
      hint: 'Compare the note with the source.', explain: n[1], meta: { k: 'g6-note-what', src: n[0], note: note } };
  }
  function noteMatch() {
    var ns = R.some(NOTES, 3);
    return { q: 'Match each source to its note.', type: 'match', pairs: ns.map(function (n) { return [n[0], n[1]]; }), hint: 'Look for the key fact.', explain: 'A note keeps the key facts, in fewer words.', meta: { k: 'g6-note-match' } };
  }
  function twoSources() {
    return Q.one('Two sources disagree about a fact. What should you do?', 'Check a third reliable source.', ['Use the one you found first.', 'Leave the fact out of every draft.'], {
      prompt: 'How can you find out which is right?', hint: 'How can you find out which is right?', explain: 'Check more reliable sources before you use it.', meta: { k: 'g6-two-sources' } });
  }

  /* ---------- crediting sources ---------- */
  var CITE = ['the author', 'the title', 'the date it was published', 'the website or publisher', 'the page number', 'the web address'];
  var NOCITE = ['the font it used', 'how many pictures it had', 'how you felt reading it', 'how long it took to read', 'the colour of the cover', 'where you were sitting'];
  /* [statement, true or false] */
  var CREDIT = [['Credit the creator of every photo or fact I use.', true], ['Write down where each fact came from.', true], ['Put words I copy exactly inside quotation marks.', true],
    ['Ask before using a friend' + AP + 's drawing.', true], ['Check the date to see if the facts are current.', true],
    ['If it is online, I can use it without saying where it came from.', false], ['Only books need to be credited.', false], ['Photos on the internet are free to use without credit.', false],
    ['Changing one word means I do not need to credit the source.', false], ['I can leave out the author if the title is long.', false]];
  /* [author, title, year, publisher] */
  var SOURCES = [['Jane Okafor', 'Beavers at Work', '2021', 'Maple Leaf Press'], ['Luc Tremblay', 'The Rideau Canal Story', '2019', 'Capital Books'], ['Mei Chen', 'Wings over Canada', '2022', 'Northern Lights Publishing'],
    ['Ravi Patel', 'Wind Power Today', '2023', 'GreenWorks Media'], ['Sarah Whitecloud', 'Stories of the Inuksuk', '2020', 'Arctic Press'], ['Tom Nakamura', 'Life in a Wetland', '2018', 'Riverbank Books']];
  function citePick() {
    return Q.all('Pick everything you should <b>record</b> about a source.', R.some(CITE, 2), R.some(NOCITE, 2), { hint: 'What would someone need to find it again, and to credit the creator?',
      explain: 'Record the author, title, date and website or publisher.', meta: { k: 'g6-cite' } });
  }
  function copiedTf() {
    var c = R.pick(CREDIT);
    return { q: 'True or false?', fig: W.sent(c[0]), type: 'tf', answer: c[1], why: { options: ['Creators deserve credit, and readers need to check sources.', 'Online content belongs to everyone.'], answer: 0 },
      hint: 'Who made it?', explain: 'Always record and credit the creator and the source.', meta: { k: 'g6-copied-tf', said: c[0] } };
  }
  function citeTf() {
    var right = R.int(0, 1) === 1, x = R.pick(right ? CITE : NOCITE);
    return { q: 'Should you record <b>' + x + '</b> about a source?', type: 'tf', answer: right, why: tfWhy(right, 'It helps you find and credit the source.', 'It does not help anyone find or credit the source.'),
      hint: 'Would it help someone find the source again?', explain: 'Record the author, title, date, publisher, page and web address.', meta: { k: 'g6-cite-tf', x: x } };
  }
  function record(s, drop) { return s.filter(function (x, i) { return i !== drop; }).join(', '); }
  function fullRecord(lv) {
    var s = R.pick(SOURCES);
    return Q.one('Which source record is <b>complete</b>?', record(s, -1), [record(s, 0), record(s, 2)].concat(lv > 1 ? [record(s, 3)] : []), {
      hint: 'Author, title, year and publisher.', explain: record(s, -1), meta: { k: 'g6-full-record' } });
  }

  /* ---------- sorting notes: [a note about bears, its heading] ---------- */
  var HEADS = ['Food', 'Habitat', 'Winter'];
  var SORT = [['eats berries and nuts', 'Food'], ['hunts seals on the ice', 'Food'], ['catches salmon in rivers', 'Food'], ['digs for roots and insects', 'Food'],
    ['lives in forests', 'Habitat'], ['roams the Arctic sea ice', 'Habitat'], ['lives in the mountains of British Columbia', 'Habitat'], ['makes its home near rivers and lakes', 'Habitat'],
    ['sleeps all winter in a den', 'Winter'], ['builds a snow den to have cubs', 'Winter'], ['loses weight while it hibernates', 'Winter'], ['wakes up hungry in the spring', 'Winter']];
  function sortNote() {
    var s = HEADS.map(function (h) { return R.pick(SORT.filter(function (x) { return x[1] === h; })); });
    return { q: 'Match each note to its heading in a report on bears.', type: 'match', pairs: s.map(function (x) { return [x[0], x[1]]; }), hint: 'Is it about food, home, or winter?', explain: 'Sort notes into groups before you write.', meta: { k: 'g6-sort' } };
  }
  function headingFor(lv) {
    var s = R.pick(SORT);
    return Q.tiles('Which heading does this note go under?', s[1], HEADS.filter(function (x) { return x !== s[1]; }).slice(0, lv > 1 ? 2 : 1), {
      fig: W.sent(s[0]), prompt: 'A report on bears has three headings.', hint: 'Food, home, or winter?', explain: '<b>' + s[1] + '</b>', meta: { k: 'g6-heading-for', note: s[0] } });
  }
  function sortTf() {
    var s = R.pick(SORT), right = R.int(0, 1) === 1, said = right ? s[1] : R.pick(HEADS.filter(function (h) { return h !== s[1]; }));
    return { q: Q.name() + ' puts this note under <b>' + said + '</b>.', fig: W.sent(s[0]), type: 'tf', answer: right, why: tfWhy(right, 'The note is about that.', 'The note is about something else.'),
      hint: 'Food, home, or winter?', explain: '<b>' + s[1] + '</b>', meta: { k: 'g6-sort-tf', note: s[0], said: said } };
  }
  function sortPick() {
    var h = R.pick(HEADS);
    return Q.all('Pick every note that goes under <b>' + h + '</b>.', R.some(SORT.filter(function (x) { return x[1] === h; }), 2).map(function (x) { return x[0]; }),
      R.some(SORT.filter(function (x) { return x[1] !== h; }), 2).map(function (x) { return x[0]; }), { hint: 'Food, home, or winter?', explain: 'Group notes before you write.', meta: { k: 'g6-sort-pick', head: h } });
  }

  /* ---------- outlines: the parts of each form, in order ---------- */
  var OUTLINE = { 'an opinion piece': ['Opinion: what I think', 'Reason 1, with evidence', 'Reason 2, with evidence', 'Call to action: what the reader should do'],
    'a report': ['Introduction: the topic', 'Section 1, with a subheading', 'Section 2, with a subheading', 'Conclusion: sum it up'],
    'a story': ['Beginning: characters and setting', 'A problem', 'Things get harder', 'The problem is solved'],
    'a how-to': ['Title: what you will make', 'What you need', 'The steps, in order', 'A tip to check it worked'],
    'a news article': ['Headline', 'Lead: who, what, when, where', 'More details and quotes', 'What happens next'],
    'a friendly letter': ['Date and greeting', 'Why you are writing', 'News and details', 'Closing and signature'],
    'a biography': ['Who the person is', 'Early life', 'Main achievements', 'Why the person matters today'] };
  var PLACE = ['At the start', 'In the middle', 'At the end'];
  function placeOf(i) { return i === 0 ? 0 : i === 3 ? 2 : 1; }
  function outline() {
    var f = R.pick(Object.keys(OUTLINE));
    return { q: 'Put the plan for <b>' + f + '</b> in order.', type: 'order', items: OUTLINE[f], first: 'First', last: 'Last', hint: 'How does this form usually start and end?', explain: OUTLINE[f].join(' &rarr; '), meta: { k: 'g6-outline', form: f } };
  }
  function partWhere() {
    var f = R.pick(Object.keys(OUTLINE)), i = R.int(0, 3);
    return { q: 'In <b>' + f + '</b>, where does this part go?', fig: W.sent(OUTLINE[f][i]), type: 'tap', tiles: PLACE, answer: placeOf(i),
      prompt: 'How does this form usually start and end?', hint: 'How does this form start and end?', explain: OUTLINE[f].join(' &rarr; '), meta: { k: 'g6-part-where', form: f } };
  }
  function outlineTf() {
    var f = R.pick(Object.keys(OUTLINE)), i = R.int(0, 3), right = R.int(0, 1) === 1, said = right ? placeOf(i) : R.pick([0, 1, 2].filter(function (p) { return p !== placeOf(i); }));
    return { q: Q.name() + ' says that in ' + f + ', this part goes <b>' + PLACE[said].toLowerCase() + '</b>.', fig: W.sent(OUTLINE[f][i]), type: 'tf', answer: right,
      why: tfWhy(right, 'That is where it belongs.', 'It belongs somewhere else.'), hint: 'How does this form start and end?', explain: OUTLINE[f].join(' &rarr; '), meta: { k: 'g6-outline-tf', form: f, said: PLACE[said] } };
  }
  function outlineFirst(lv) {
    var f = R.pick(Object.keys(OUTLINE)), o = OUTLINE[f];
    return Q.tiles('Which part comes <b>first</b> in ' + f + '?', o[0], [o[3]].concat(lv > 1 ? [o[2]] : []), { hint: 'What does the reader need to know first?', explain: o.join(' &rarr; '), meta: { k: 'g6-outline-first', form: f } });
  }

  Atlas.register('planning', {
    full: true,
    lessons: [{
      id: 'purpose', title: 'Purpose, audience and form', sub: 'Decide why, for whom, and in what form.',
      concepts: [
        { slug: 'purpose', title: 'Why am I writing?', exp: ['D1.1'], skill: 'purpose',
          model: [
            step(W.means('write', 'a letter asking for a skate park'), 'To persuade.'),
            step(W.means('write', 'a report on glaciers'), 'To inform.'),
            step(W.means('write', 'a funny story about a hamster'), 'To entertain.'),
            step(W.means('write', 'steps for a birdhouse'), 'To explain how.')
          ],
          guided: [function () { return purposeOf(1); }, purposeTf, purposeMatch],
          check: [function () { return purposeOf(2); }, purposePick, purposeTf, purposeMatch, function () { return purposeOf(2); }],
          coach: '<p>Before any writing, have the child say in one sentence: "I am writing to ___ so that ___ will ___."</p>',
          mistake: '<p>Starting to write before deciding the purpose. The purpose shapes everything else.</p>' },
        { slug: 'form', title: 'Choose a form that suits the reader', exp: ['D1.1'], skill: 'form',
          model: [
            step(W.means('people', 'the town council'), 'A formal letter.'),
            step(W.means('people', 'Grade 1 students'), 'An illustrated poster.'),
            step(W.means('people', 'families'), 'A blog post with photos.'),
            step(W.means('people', 'an Elder who visited'), 'A thank-you card.')
          ],
          guided: [function () { return bestForm(1); }, formMatch, formTf],
          check: [function () { return bestForm(2); }, function () { return formFor(2); }, formTf, formMatch, function () { return bestForm(2); }],
          coach: '<p>Ask: "Who will read this, and how would they like to get it?" Paper, screen, spoken, pictures?</p>',
          mistake: '<p>Using the same form for every audience.</p>' },
        { slug: 'ideas', title: 'Ways to get ideas', exp: ['D1.2'], skill: 'ideas',
          model: [
            step(W.means('think', 'Too many ideas?'), 'An idea web.'),
            step(W.means('people', 'Need facts from the past?'), 'Interview someone who was there.'),
            step(W.means('star', 'Stuck?'), 'Brainstorm for five minutes.'),
            step(W.means('think', 'No plot?'), 'Ask "What if?" about an ordinary day.')
          ],
          guided: [function () { return strategy(1); }, strategyTf, function () { return strategyFor(1); }],
          check: [function () { return strategy(2); }, strategyMatch, strategyTf, function () { return strategyFor(2); }, function () { return strategy(2); }],
          coach: '<p>The child’s own life is a rich source: family stories, languages spoken at home, places they know.</p>',
          mistake: '<p>Waiting for the perfect idea. Get many ideas first, then choose.</p>' }
      ]
    }, {
      id: 'research', title: 'Research', sub: 'Gather, sum up, check and credit.',
      concepts: [
        { slug: 'notes', title: 'Notes in your own words', exp: ['D1.3'], skill: 'notes',
          model: [
            step(W.sent(NOTES[0][0]), 'The source.'),
            step(W.means('write', NOTES[0][1]), 'Short, in my own words.'),
            step(W.sent(NOTES[7][0]), 'Another source.'),
            step(W.means('write', NOTES[7][1]), 'Keep the number. Drop extra words.')
          ],
          guided: [function () { return ownWords(1); }, noteTf, twoSources],
          check: [function () { return ownWords(2); }, noteWhat, noteMatch, noteTf, function () { return ownWords(2); }],
          coach: '<p>Read a paragraph, close the book, then write the note. That makes copying impossible.</p>',
          mistake: '<p>Copying whole sentences. Notes are short and in your own words.</p>' },
        { slug: 'credit', title: 'Record the source', exp: ['D1.3'], skill: 'credit',
          model: [
            step(W.means('read', 'author, title, date, publisher'), 'Write these down for every source.'),
            step(W.sent(record(SOURCES[0], -1)), 'A complete record.'),
            step(W.sent(record(SOURCES[0], 2)), 'No year: something is missing.'),
            step(W.means('people', 'photo by Mei Chen'), 'Photos and images need credit too.')
          ],
          guided: [citePick, copiedTf, function () { return fullRecord(1); }],
          check: [citePick, citeTf, copiedTf, function () { return fullRecord(2); }, citeTf],
          coach: '<p>Keep a simple source list as you research: author, title, date, website.</p>',
          mistake: '<p>Forgetting where a fact came from. Write the source next to every note.</p>' }
      ]
    }, {
      id: 'organize', title: 'Organizing ideas', sub: 'Sort your notes, then put them in order.',
      concepts: [
        { slug: 'sort', title: 'Sort notes into groups', exp: ['D1.4'], skill: 'sort',
          model: [
            step(W.web('Bears', ['Food', 'Habitat', 'Winter']), 'Three headings for a report.'),
            step(W.sent('eats berries and nuts') + W.sent('hunts seals on the ice'), 'Both about <b>Food</b>.'),
            step(W.sent('lives in forests'), '<b>Habitat</b>.'),
            step(W.sent('sleeps all winter in a den'), '<b>Winter</b>.')
          ],
          guided: [function () { return headingFor(1); }, sortNote, sortTf],
          check: [function () { return headingFor(2); }, sortPick, sortTf, sortNote, function () { return headingFor(2); }],
          coach: '<p>Write notes on separate slips of paper, then physically sort them into piles.</p>',
          mistake: '<p>Writing notes in the order they were found, instead of grouping them.</p>' },
        { slug: 'outline', title: 'Order ideas to fit the form', exp: ['D1.4'], skill: 'outline',
          model: [
            step(W.chain(['what I think', 'with evidence', 'with evidence', 'what to do'], ['Opinion', 'Reason 1', 'Reason 2', 'Call to action']), 'An opinion piece.'),
            step(W.chain(['the topic', 'with subheadings', 'sum it up'], ['Introduction', 'Sections', 'Conclusion']), 'A report.'),
            step(W.chain(['who, what, when, where', 'details and quotes', 'what happens next'], ['Lead', 'Middle', 'End']), 'A news article.'),
            step(W.chain(['characters and setting', 'a problem', 'it gets harder', 'solved'], ['Beginning', 'Problem', 'Rising action', 'Ending']), 'A story.')
          ],
          guided: [outline, partWhere, function () { return outlineFirst(1); }],
          check: [outline, outlineTf, partWhere, function () { return outlineFirst(2); }, outline],
          coach: '<p>Make the outline together first. Writing goes faster when the order is decided.</p>',
          mistake: '<p>Putting the strongest reason first and running out of steam. Save one strong reason for the end.</p>' }
      ]
    }],
    practice: [
      { id: 'purpose', name: 'Purpose', code: 'D1.1', gen: purposeOf },
      { id: 'form', name: 'Choosing a form', code: 'D1.1', gen: bestForm },
      { id: 'ideas', name: 'Getting ideas', code: 'D1.2', gen: strategy },
      { id: 'notes', name: 'Taking notes', code: 'D1.3', gen: ownWords },
      { id: 'credit', name: 'Crediting sources', code: 'D1.3', gen: citePick },
      { id: 'sort', name: 'Sorting notes', code: 'D1.4', gen: headingFor },
      { id: 'outline', name: 'Outlines', code: 'D1.4', gen: partWhere }
    ],
    tasks: [
      { id: 'idea-web', title: 'An idea web', code: 'D1.2', pic: W.icon('think'), say: 'Make an idea web about a topic that matters to you, like fairness or inclusion.', write: true,
        run: ['Help the child pick a topic, perhaps about diversity, fairness or inclusion, or from science or social studies.', 'Put the topic in the middle of a page. Add branches: what I know, what I have lived, what I want to find out, who I could ask.'],
        rubric: ['A few ideas, not connected.', 'Several ideas with some branches.', 'A full web with ideas from experience and other sources.', 'A rich web, with ideas developed into details and questions.'] },
      { id: 'research-notes', title: 'Research notes with sources', code: 'D1.3', pic: W.icon('read'), say: 'Find three sources on your topic. Take notes and record each source.', write: true,
        run: ['Choose a topic linked to another subject. Find three sources, at least one a book.', 'For each: short notes in the child’s own words, and a record of author, title, date and website or publisher.', 'Check: do the sources agree? Are they reliable?'],
        rubric: ['Copied notes, no sources.', 'Some own-word notes, sources incomplete.', 'Own-word notes from three sources, all recorded.', 'Clear notes, sources recorded, and reliability checked and explained.'] },
      { id: 'planning-reflect', title: 'What helped me plan?', code: 'D1.5', pic: W.icon('star'), say: 'Which planning tool helped you most? How has it made you a better writer?',
        run: ['After planning two pieces (for example, an idea web for one and an outline for the other), ask which tool helped more and why.', 'Ask: "How has planning changed your writing?"'],
        rubric: ['Cannot say yet.', 'Names a tool with help.', 'Compares two tools and explains which helped.', 'Explains in detail how the tools improved their writing.'] }
    ]
  });

  Q.shapes('planning', {
    purpose: [[1, 'true-false', purposeTf], [1, 'match', purposeMatch], [2, 'pick', purposePick]],
    form: [[1, 'match', formMatch], [1, 'true-false', formTf], [2, 'form-for', formFor]],
    ideas: [[1, 'true-false', strategyTf], [1, 'match', strategyMatch], [2, 'strategy-for', strategyFor]],
    notes: [[1, 'true-false', noteTf], [1, 'what', noteWhat], [2, 'match', noteMatch]],
    credit: [[1, 'true-false', copiedTf], [1, 'record', citeTf], [2, 'complete', fullRecord]],
    sort: [[1, 'match', sortNote], [1, 'true-false', sortTf], [2, 'pick', sortPick]],
    outline: [[1, 'order', outline], [1, 'true-false', outlineTf], [2, 'first', outlineFirst]]
  });
})();
