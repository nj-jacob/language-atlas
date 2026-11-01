/* Grade 8: planning and research. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 8, D1 Developing Ideas and Organizing Content:
   D1.1 topic, purpose and audience; choose and justify a form, genre and medium
   D1.2 generate and develop ideas about challenging topics, using strategies, resources and lived experience
   D1.3 gather and synthesize information; evaluate currency, quality, bias and accuracy; verify sources; cite them
   D1.4 classify and sequence ideas, and organize content
   D1.5 evaluate the strategies and tools used to develop and organize ideas (with a grown-up)
   All examples are made up for this site. Answer checks: tests/verify/grade8-planning.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';
  function lvQ(lv, three) { return three[Math.min(Math.max(lv || 1, 1), 3) - 1]; }
  function tf(q, fig, answer, why, more) {
    var o = { q: q, fig: fig, type: 'tf', answer: answer, why: { options: why, answer: 0 } };
    Object.keys(more).forEach(function (k) { o[k] = more[k]; });
    return o;
  }
  function others(list, x) { return list.filter(function (y) { return y !== x; }); }

  /* [purpose and audience, the form that suits it, the main purpose] */
  var FORM = [['persuade town council to fund a skate park', 'a formal letter to council', 'to persuade'],
    ['teach Grade 4 students to build a birdhouse', 'step-by-step instructions with diagrams', 'to inform'],
    ['share a family story with your relatives', 'a personal narrative', 'to share an experience'],
    ['entertain teens with a spooky tale', 'a short story', 'to entertain'],
    ['report the results of a science experiment', 'a lab report', 'to inform'],
    ['get the whole school to come to a bake sale', 'a bold poster', 'to persuade'],
    ['convince listeners to join a shoreline cleanup', 'a radio announcement', 'to persuade'],
    ['explain how a bill becomes law to younger students', 'an infographic', 'to inform'],
    ['thank an Elder for teaching your class', 'a thank-you card', 'to share an experience'],
    ['tell the public your view on a news story', 'a letter to the editor', 'to persuade'],
    ['remember a summer trip, just for yourself', 'a journal entry', 'to share an experience'],
    ['make younger students laugh at an assembly', 'a funny skit', 'to entertain'],
    ['capture the feeling of the first snowfall', 'a poem', 'to share an experience'],
    ['show how your town changed over 100 years', 'a photo timeline with captions', 'to inform'],
    ['apply for a summer job at the library', 'a cover letter', 'to persuade']];
  var PURPOSES = ['to persuade', 'to inform', 'to entertain', 'to share an experience'];

  /* [a writing problem, the idea strategy that fits] */
  var STRAT = ['Draw a mind map.', 'Interview someone with experience.', 'Freewrite for five minutes without stopping.', 'List memories connected to the topic.', 'Read sources with different points of view.'];
  var IDEAS = [['You have many ideas and need to see how they connect.', 0], ['Your notes are a jumble and you cannot see the big picture.', 0], ['You want to branch out from one topic to smaller ones.', 0],
    ['You know little about how the topic affects your community.', 1], ['You are writing about a job you have never done.', 1], ['You want to know what it is like to arrive in Canada as a newcomer.', 1],
    ['You are stuck and cannot start.', 2], ['You keep crossing out every first sentence.', 2], ['Your mind goes blank when you look at the page.', 2],
    ['You want to draw on your own life.', 3], ['You are writing about a time you felt left out.', 3], ['You want a true story from your childhood.', 3],
    ['You only know one side of a debate.', 4], ['You want to understand why people disagree about a new highway.', 4], ['Your argument ignores what others think.', 4]];

  /* [topic, a reliable source, unreliable ones] */
  var SOURCES = [['facts about Ontario' + AP + 's provincial parks', 'the official Ontario Parks website', ['a comment on a travel forum', 'an ad from a camping store']],
    ['the health effects of energy drinks', 'a report from Health Canada', ['a video made by an energy drink company', 'a post by an influencer with no sources']],
    ['the history of the Underground Railroad in Ontario', 'a book by a historian, with sources listed', ['a meme with no source', 'an anonymous blog post']],
    ['this week' + AP + 's weather in Thunder Bay', 'Environment Canada' + AP + 's forecast', ['a forecast from last year', 'a friend' + AP + 's guess']],
    ['the population of Nunavut', 'Statistics Canada', ['a guess in a group chat', 'a social media poll']],
    ['how vaccines work', 'the Public Health Agency of Canada', ['a viral video with no sources', 'a comment section']],
    ['the War of 1812', 'a university history department website', ['a video game set in 1812', 'a fan forum']],
    ['how a bill becomes law', 'the Parliament of Canada website', ['a joke news website', 'an opinion post with no sources']],
    ['monarch butterfly migration', 'a study by wildlife scientists', ['an ad for a butterfly garden kit', 'a rumour shared online']],
    ['the history of Treaty 9', 'a history written with Elders from the treaty nations', ['an unsigned post on a message board', 'a novel loosely based on the time']],
    ['earthquake risk in British Columbia', 'Natural Resources Canada', ['a movie about a giant earthquake', 'a stranger' + AP + 's video']],
    ['healthy school lunches', 'Canada' + AP + 's Food Guide', ['an ad for a snack bar', 'a diet blog selling pills']],
    ['Ottawa bus fares', 'the official OC Transpo website', ['a post from five years ago', 'a friend' + AP + 's memory']],
    ['local election results', 'the city' + AP + 's official election results page', ['a candidate' + AP + 's own social media', 'a rumour at school']],
    ['the water quality of a lake', 'test results from the provincial environment ministry', ['a cottage rental ad', 'a fishing forum post']]];
  /* [what a website is about, who made it] */
  var BIAS = [['the safety of a toy', 'the company that sells it'], ['whether a new mine is safe', 'the mining company'], ['how healthy a cereal is', 'the cereal maker'],
    ['why one candidate is the best choice', 'that candidate' + AP + 's campaign'], ['how good a new phone is', 'the company that makes it'], ['whether a sports drink helps athletes', 'the drink company'],
    ['whether a resort is worth visiting', 'the resort itself'], ['how safe a weed killer is', 'the company that sells it']];
  var FAST = ['phones in schools', 'electric cars', 'social media and sleep', 'artificial intelligence', 'video game ratings', 'smartwatch health tracking'];
  var YEARS = [2025, 2023, 2019, 2016, 2012, 2009, 2004, 1998];

  /* times you must cite, and times you need not */
  var CITE = ['you quote someone' + AP + 's exact words', 'you use facts or numbers from a source', 'you use an image you found online', 'you retell an idea from an article in your own words',
    'you use a chart from a website', 'you summarize a video you watched for research', 'you include a statistic from a report', 'you use a song lyric in your speech'];
  var NOCITE = ['you give your own opinion', 'you describe your own experience', 'you state common knowledge, like Ottawa being Canada' + AP + 's capital', 'you draw a diagram of your own experiment',
    'you share a memory from your summer', 'you explain your own reasons for an argument', 'you describe a photo you took yourself', 'you state that a week has seven days'];
  /* [surname, initial, title, publisher, year] */
  var BOOKS = [['Okafor', 'J', 'Winter Roads in a Warming World', 'Northern Press', 2024], ['Singh', 'A', 'Bees in the City', 'Maple Leaf Books', 2022],
    ['Martin', 'L', 'Voices of the Métis', 'Prairie House', 2021], ['Chen', 'W', 'How Bridges Stand', 'Harbour Press', 2023], ['Nakamura', 'K', 'The Last Glacier', 'True North Publishing', 2020],
    ['Bouchard', 'R', 'Hockey Before Television', 'Laurentian Books', 2019], ['Morningstar', 'T', 'Planting the Three Sisters', 'Turtle Island Press', 2025],
    ['Ahmed', 'S', 'Plastic Oceans', 'Atlantic House', 2022], ['Kowalski', 'E', 'The Story of the Rideau Canal', 'Capital Press', 2018],
    ['Campbell', 'D', 'Lighthouses of Nova Scotia', 'Bluenose Books', 2021], ['Osei', 'F', 'Code for Beginners', 'Lakeshore Press', 2024], ['Lavoie', 'C', 'Northern Lights Explained', 'Aurora Books', 2023]];
  function cite(b, drop) {
    var who = b[0] + ', ' + b[1] + '. ', title = b[2] + '. ';
    return drop === 'author' ? title + b[3] + ', ' + b[4] + '.' : drop === 'title' ? who + b[3] + ', ' + b[4] + '.' : drop === 'publisher' ? who + title + b[4] + '.'
      : drop === 'year' ? who + title + b[3] + '.' : who + title + b[3] + ', ' + b[4] + '.';
  }
  var PARTS = ['author', 'title', 'publisher', 'year'];

  /* topics, each with three headings and three notes for each */
  var TOPICS = [['beavers', [['Habitat', ['live in ponds and slow streams', 'build lodges of sticks and mud', 'make dams that flood small valleys']],
      ['Diet', ['eat bark and water plants', 'store branches for winter food', 'chew on aspen and willow']],
      ['Behaviour', ['slap their tails to warn of danger', 'work mostly at night', 'live in family groups']]]],
    ['the Rideau Canal', [['History', ['opened in 1832', 'built by thousands of labourers', 'planned as a route for the army']],
      ['Uses today', ['carries pleasure boats in summer', 'becomes a skating rink in winter', 'draws tourists to Ottawa']],
      ['Nature', ['links lakes and rivers', 'is home to turtles and herons', 'has wetlands along its banks']]]],
    ['the Arctic', [['Climate', ['long, dark winters', 'temperatures below −30 °C', 'short, cool summers']],
      ['Wildlife', ['polar bears hunt on sea ice', 'caribou migrate in huge herds', 'Arctic foxes change colour']],
      ['People', ['Inuit have lived there for thousands of years', 'many communities speak Inuktitut', 'many towns are reached only by plane']]]]];
  var NOTES = [];
  TOPICS.forEach(function (t) { t[1].forEach(function (h) { h[1].forEach(function (n) { NOTES.push([n, h[0], t]); }); }); });
  function headsOf(t) { return t[1].map(function (h) { return h[0]; }); }

  /* [what you are planning, the organizer that fits] */
  var ORGS = ['a Venn diagram', 'a cause-and-effect chain', 'a story arc', 'a timeline', 'a problem-and-solution chart'];
  var ORG = [['compare two novels', 0], ['compare life in a city and on a farm', 0], ['compare two provinces', 0],
    ['explain what caused a flood', 1], ['show what happens when a forest is cut down', 1], ['explain why food prices went up', 1],
    ['plan the events of a short story', 2], ['plan a mystery with a twist ending', 2], ['plan a legend for a picture book', 2],
    ['order the events in a history report', 3], ['show the steps in building the railway across Canada', 3], ['show the life of a famous inventor', 3],
    ['plan a letter about a dangerous crossing', 4], ['plan a proposal to cut cafeteria waste', 4], ['plan an essay on ways to stop bullying', 4]];
  /* the parts of each kind of text, in order */
  var OUTLINES = [['a persuasive essay', ['Hook and main argument', 'First reason, with evidence', 'Second reason, with evidence', 'Answer to the other side', 'Conclusion and call to action']],
    ['a story', ['Characters and setting', 'Rising action: the problem grows', 'Climax: the turning point', 'Falling action', 'Resolution']],
    ['a report', ['Introduction with the main idea', 'First subtopic', 'Second subtopic', 'Third subtopic', 'Conclusion that sums up']],
    ['a news article', ['Headline', 'Lead: who, what, when, where', 'The most important details', 'Quotes from witnesses', 'Background details']]];

  /* ---------- purpose, audience and form ---------- */
  function form(lv) {
    var f = R.pick(FORM);
    return Q.one(lvQ(lv, ['Which form best suits this purpose and audience?', 'Which form would reach this audience best?', 'Choose the form, the genre and the medium.']), f[1],
      R.some(others(FORM, f), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: W.means('think', 'You want to <b>' + f[0] + '</b>.'), prompt: 'Who will read it, and what should it make them do or know?', hint: 'Match the form to the purpose and the audience.',
      explain: f[1] + ' suits that purpose and audience.', meta: { k: 'g8-form', p: f[0] } });
  }
  function matchForm() {
    return { q: 'Match each purpose to the best form.', type: 'match', pairs: R.some(FORM, 3).map(function (f) { return [f[0], f[1]]; }), hint: 'Think about the audience for each.',
      explain: 'The purpose and audience decide the form.', meta: { k: 'g8-match-form' } };
  }
  function formTf() {
    var f = R.pick(FORM), right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(others(FORM, f))[1];
    return tf(Q.name() + ' says the best form is <b>' + said + '</b>.', W.means('think', 'You want to <b>' + f[0] + '</b>.'), right,
      ['The form must suit the purpose and the audience.', 'Any form works for any purpose.'], { hint: 'Who is the audience? What is the purpose?', explain: f[1] + '.', meta: { k: 'g8-form-tf', p: f[0], said: said } });
  }
  function formPurpose() {
    var f = R.pick(FORM);
    return Q.tiles('What is the main <b>purpose</b>?', f[2], others(PURPOSES, f[2]), { fig: W.means('think', f[0]) + W.tile(f[1]),
      hint: 'Persuade, inform, entertain, or share an experience?', explain: f[2] + '.', meta: { k: 'g8-form-purpose', p: f[0] } });
  }

  /* ---------- finding ideas ---------- */
  function ideas(lv) {
    var i = R.pick(IDEAS);
    return Q.one(lvQ(lv, ['Which strategy would help most?', 'What should you try first?', 'Which strategy fits this problem?']), STRAT[i[1]], R.some(others(STRAT, STRAT[i[1]]), lv > 1 ? 3 : 2), {
      fig: W.means('think', i[0]), hint: 'Match the strategy to the problem.', explain: STRAT[i[1]], meta: { k: 'g8-ideas', p: i[0] } });
  }
  function ideasTf() {
    var i = R.pick(IDEAS), said = R.int(0, 1) ? STRAT[i[1]] : R.pick(others(STRAT, STRAT[i[1]]));
    return tf(Q.name() + ' suggests: <b>' + said + '</b> Does it fit?', W.means('think', i[0]), said === STRAT[i[1]],
      ['Each strategy solves a different planning problem.', 'Every strategy fixes every problem.'], { hint: 'What is the problem here?', explain: STRAT[i[1]], meta: { k: 'g8-ideas-tf', p: i[0], said: said } });
  }
  function ideasMatch() {
    var ks = R.some([0, 1, 2, 3, 4], 3);
    return { q: 'Match each problem to the strategy that helps.', type: 'match', pairs: ks.map(function (k) { return [R.pick(IDEAS.filter(function (i) { return i[1] === k; }))[0], STRAT[k]]; }),
      hint: 'Stuck, jumbled, one-sided, or missing experience?', explain: 'Each strategy solves a different problem.', meta: { k: 'g8-ideas-match' } };
  }
  function ideasWhen(lv) {
    var k = R.int(0, 4), right = R.pick(IDEAS.filter(function (i) { return i[1] === k; })), wrong = R.some(IDEAS.filter(function (i) { return i[1] !== k; }), lv > 1 ? 3 : 2);
    return Q.one('When would <b>' + STRAT[k].replace(/\.$/, '').toLowerCase() + '</b> help most?', right[0], wrong.map(function (i) { return i[0]; }), {
      hint: 'What problem does this strategy solve?', explain: right[0], meta: { k: 'g8-ideas-when', s: STRAT[k] } });
  }

  /* ---------- reliable sources ---------- */
  function reliable(lv) {
    var s = R.pick(SOURCES);
    return Q.one(lvQ(lv, ['Which source is most reliable for <b>' + s[0] + '</b>?', 'You are researching <b>' + s[0] + '</b>. Which source do you trust?', 'Which source would you cite for <b>' + s[0] + '</b>?']),
      s[1], s[2].slice(0, lv > 1 ? 2 : 1).concat(lv > 2 ? [R.pick(others(SOURCES, s))[2][0]] : []), {
      prompt: 'Who made it? Are they an expert? Do they gain from it?', hint: 'Trust experts and official sources that show their evidence.', explain: s[1] + ' is an expert, accountable source.', meta: { k: 'g8-reliable' } });
  }
  function sourceTf() {
    var s = R.pick(SOURCES), shown = R.int(0, 1) ? s[1] : R.pick(s[2]);
    return tf('Is this a reliable source for <b>' + s[0] + '</b>?', W.sent(shown), shown === s[1], ['Reliable sources are expert, accountable and show their evidence.', 'Any source online is reliable.'],
      { hint: 'Who made it? Do they gain from it?', explain: s[1] + ' is reliable.', meta: { k: 'g8-source-tf', s: shown } });
  }
  function current(lv) {
    var topic = R.pick(FAST), ys = R.some(YEARS, lv > 1 ? 4 : 3);
    return Q.one('Which source is most <b>current</b> for research on ' + topic + '?', 'an article from ' + Math.max.apply(null, ys),
      ys.filter(function (y) { return y !== Math.max.apply(null, ys); }).map(function (y) { return 'an article from ' + y; }), {
      hint: 'For fast-changing topics, newer is usually better.', explain: 'The most recent one.', meta: { k: 'g8-current' } });
  }
  function biasSource() {
    var b = R.pick(BIAS);
    return Q.one('A website about <b>' + b[0] + '</b> is made by <b>' + b[1] + '</b>. What is the problem?', 'It may be biased: they gain if you believe it.',
      R.some(['It is too old to use.', 'It has too many pictures.', 'It is too short to use.'], 2), {
      hint: 'Ask: who gains if I believe this?', explain: 'Check it against an independent source, such as a government agency or a scientist.', meta: { k: 'g8-bias-source' } });
  }

  /* ---------- citing ---------- */
  function citation(lv) {
    var b = R.pick(BOOKS);
    return Q.one(lvQ(lv, ['Which citation is <b>complete</b>?', 'Which citation has every part?', 'Which citation would a reader use to find the book?']), cite(b),
      R.some(PARTS, lv > 1 ? 3 : 2).map(function (p) { return cite(b, p); }), { hint: 'Author, title, publisher, year.', explain: W.sent(cite(b)), meta: { k: 'g8-citation' } });
  }
  function whenCite(lv) {
    return Q.all('Pick every time you must <b>cite</b> a source.', R.some(CITE, 2), R.some(NOCITE, lv > 1 ? 3 : 2), { hint: 'If the words, facts, image or idea came from someone else, cite it.',
      explain: 'Citing gives credit and lets readers check your facts.', meta: { k: 'g8-when-cite' } });
  }
  function citeTf() {
    var s = R.int(0, 1) ? R.pick(CITE) : R.pick(NOCITE);
    return tf('Do you need to cite a source?', W.means('write', 'When ' + s + '.'), CITE.indexOf(s) >= 0, ['Cite words, facts, images and ideas that came from someone else.', 'Only exact quotations need a citation.'],
      { hint: 'Did it come from someone else?', explain: CITE.indexOf(s) >= 0 ? 'Borrowed: cite it.' : 'Your own, or common knowledge: no citation.', meta: { k: 'g8-cite-tf', s: s } });
  }
  function citeMissing() {
    var b = R.pick(BOOKS), p = R.pick(PARTS);
    return Q.tiles('What is <b>missing</b> from this citation?', p, others(PARTS, p), { fig: W.sent(cite(b, p)), hint: 'Author. Title. Publisher, year.', explain: W.sent(cite(b)), meta: { k: 'g8-cite-missing' } });
  }

  /* ---------- grouping notes ---------- */
  function heading(lv) {
    var n = R.pick(NOTES);
    return Q.tiles(lvQ(lv, ['Which heading does this note go under?', 'Sort this note. Which heading?', 'Which paragraph would this note belong in?']), n[1], others(headsOf(n[2]), n[1]), {
      fig: W.means('write', n[0]), prompt: 'Notes about ' + n[2][0] + '.', hint: 'What is the note about?', explain: n[1] + '.', meta: { k: 'g8-heading', n: n[0] } });
  }
  function classify() {
    var t = R.pick(TOPICS);
    return { q: 'Sort each note about ' + t[0] + ' under a heading.', type: 'match', pairs: t[1].map(function (h) { return [R.pick(h[1]), h[0]]; }), hint: 'What is each note about?',
      explain: 'Grouping notes under headings makes a plan for paragraphs.', meta: { k: 'g8-classify' } };
  }
  function oddNote(lv) {
    var t = R.pick(TOPICS), h = R.pick(t[1]), odd = R.pick(R.pick(others(t[1], h))[1]);
    return Q.one('Which note does <b>not</b> belong under <b>' + h[0] + '</b>?', odd, R.some(h[1], lv > 1 ? 3 : 2), { prompt: 'Notes about ' + t[0] + '.', hint: 'Which one is about something else?',
      explain: odd + ' belongs under a different heading.', meta: { k: 'g8-odd-note', h: h[0] } });
  }
  function headingTf() {
    var n = R.pick(NOTES), said = R.int(0, 1) ? n[1] : R.pick(others(headsOf(n[2]), n[1]));
    return tf('Does this note belong under <b>' + said + '</b>?', W.means('write', n[0]), said === n[1], ['Each note goes under the heading it is about.', 'A note can go under any heading.'],
      { hint: 'What is the note about?', explain: n[1] + '.', meta: { k: 'g8-heading-tf', n: n[0], said: said } });
  }

  /* ---------- organizers and order ---------- */
  function organizer(lv) {
    var o = R.pick(ORG);
    return Q.tiles(lvQ(lv, ['You need to <b>' + o[0] + '</b>. Which organizer fits?', 'Which organizer would you use to <b>' + o[0] + '</b>?', 'You want to <b>' + o[0] + '</b>. Choose the organizer.']),
      ORGS[o[1]], R.some(others(ORGS, ORGS[o[1]]), lv > 1 ? 3 : 2), { hint: 'Compare, cause, story, time, or a problem to solve?', explain: ORGS[o[1]] + '.', meta: { k: 'g8-organizer', p: o[0] } });
  }
  function matchOrg() {
    var ks = R.some([0, 1, 2, 3, 4], 3);
    return { q: 'Match each plan to the organizer that fits.', type: 'match', pairs: ks.map(function (k) { return [R.pick(ORG.filter(function (o) { return o[1] === k; }))[0], ORGS[k]]; }),
      hint: 'Compare, cause, story, time, or a problem to solve?', explain: 'The organizer should match the text pattern.', meta: { k: 'g8-match-org' } };
  }
  function orgTf() {
    var o = R.pick(ORG), said = R.int(0, 1) ? ORGS[o[1]] : R.pick(others(ORGS, ORGS[o[1]]));
    return tf('To <b>' + o[0] + '</b>, use <b>' + said + '</b>.', W.icon('think'), said === ORGS[o[1]], ['The organizer should match the pattern of the ideas.', 'Any organizer works for any plan.'],
      { hint: 'Compare, cause, story, time, or a problem to solve?', explain: ORGS[o[1]] + '.', meta: { k: 'g8-org-tf', p: o[0], said: said } });
  }
  function outline(lv) {
    var o = R.pick(OUTLINES), items = lv > 1 ? o[1] : [o[1][0], o[1][2], o[1][4]];
    return { q: 'Put the parts of <b>' + o[0] + '</b> in order.', type: 'order', items: items, first: 'First', last: 'Last', hint: 'What does a reader need first? What comes last?',
      explain: o[1].join(' &rarr; '), meta: { k: 'g8-outline', kind: o[0] } };
  }

  var F0 = FORM[0], F1 = FORM[1], B0 = BOOKS[0], Tb = TOPICS[0][1], Ta = TOPICS[2][1];
  Atlas.register('planning', {
    full: true,
    lessons: [{
      id: 'purpose', title: 'Purpose, audience and ideas', sub: 'Decide why and for whom, then find ideas.',
      concepts: [
        { slug: 'form', title: 'Purpose and audience decide the form', exp: ['D1.1'], skill: 'purpose',
          model: [
            step(W.means('people', 'Town council'), 'Audience: adults who decide.'),
            step(W.means('think', 'Fund a skate park'), 'Purpose: to persuade.'),
            step(W.tile(F0[1]), 'It reaches them and sounds serious.'),
            step(W.means('people', 'Grade 4 students') + W.means('think', 'Build a birdhouse'), 'Young readers. Purpose: to inform.'),
            step(W.tile(F1[1]), 'Pictures help young readers follow.')
          ],
          guided: [function () { return form(1); }, formPurpose, formTf],
          check: [function () { return form(2); }, matchForm, formPurpose, formTf, function () { return form(3); }],
          coach: '<p>Before any writing, have the child say three things aloud: "I am writing to… (audience) so that they… (purpose), using… (form), because…"</p>',
          mistake: '<p>Choosing a form by habit (always an essay) rather than by purpose.</p>' },
        { slug: 'ideas', title: 'Use a strategy to find ideas', exp: ['D1.2'], skill: 'ideas',
          model: [
            step(W.means('think', IDEAS[6][0]), 'Freewrite for five minutes.'),
            step(W.means('people', IDEAS[5][0]), 'Interview someone who lived it.'),
            step(W.means('star', IDEAS[0][0]), 'Draw a mind map.'),
            step(W.means('read', IDEAS[12][0]), 'Read other points of view.')
          ],
          guided: [function () { return ideas(1); }, ideasTf, function () { return ideasWhen(1); }],
          check: [function () { return ideas(2); }, ideasMatch, ideasTf, function () { return ideasWhen(2); }, function () { return ideas(3); }],
          coach: '<p>Challenging topics, like fairness or inclusion, are easier to start from a story: "When did you see someone left out?"</p>',
          mistake: '<p>Waiting for the perfect idea instead of using a strategy.</p>' }
      ]
    }, {
      id: 'research', title: 'Research and sources', sub: 'Reliable, current, unbiased, and cited.',
      concepts: [
        { slug: 'reliable', title: 'Check who made the source', exp: ['D1.3'], skill: 'sources',
          model: [
            step(W.sent(SOURCES[1][1]), 'Experts, accountable, shows evidence.'),
            step(W.sent(SOURCES[1][2][0]), 'Gains from what you believe: biased.'),
            step(W.sent('an article from 2009'), 'Old, for a fast-changing topic.'),
            step(W.sent(SOURCES[4][1]), 'Official numbers for a population.'),
            step(W.sent(SOURCES[4][2][1]), 'Anyone can vote. Not a fact.')
          ],
          guided: [function () { return reliable(1); }, biasSource, sourceTf],
          check: [function () { return reliable(2); }, current, sourceTf, biasSource, function () { return reliable(3); }],
          coach: '<p>Teach "lateral reading": open a new tab and search for who is behind a source before trusting it.</p>',
          mistake: '<p>Trusting the first search result, or a site because it looks professional.</p>' },
        { slug: 'cite', title: 'Cite everything that is not yours', exp: ['D1.3'], skill: 'citing',
          model: [
            step(W.means('read', 'exact words, facts, images, ideas'), 'Borrowed: cite it.'),
            step(W.means('write', 'your own opinion or experience'), 'Yours: no citation.'),
            step(W.sent(cite(B0)), 'Author. Title. Publisher, year.'),
            step(W.sent(cite(BOOKS[2])), 'Same order every time.'),
            step(W.sent(cite(BOOKS[2], 'year')), 'Missing the year.')
          ],
          guided: [function () { return whenCite(1); }, citeTf, function () { return citation(1); }],
          check: [function () { return whenCite(2); }, citeMissing, function () { return citation(2); }, citeTf, citeMissing],
          coach: '<p>Keep a source list as you research, not at the end. It is much easier.</p>',
          mistake: '<p>Thinking that changing a few words means you do not need to cite.</p>' }
      ]
    }, {
      id: 'organize', title: 'Organizing ideas', sub: 'Group, order and choose an organizer.',
      concepts: [
        { slug: 'classify', title: 'Group notes under headings', exp: ['D1.4'], skill: 'grouping',
          model: [
            step(W.tile(Tb[0][0]) + ' ' + W.tile(Tb[1][0]) + ' ' + W.tile(Tb[2][0]), 'Three headings for beavers.'),
            step(W.sent(Tb[1][1][0]) + ' &rarr; ' + W.tile(Tb[1][0])),
            step(W.sent(Tb[2][1][0]) + ' &rarr; ' + W.tile(Tb[2][0])),
            step(W.tile(Ta[0][0]) + ' ' + W.tile(Ta[1][0]) + ' ' + W.tile(Ta[2][0]), 'Three headings for the Arctic.'),
            step(W.sent(Ta[1][1][1]) + ' &rarr; ' + W.tile(Ta[1][0]), 'Each heading becomes a paragraph.')
          ],
          guided: [function () { return heading(1); }, headingTf, classify],
          check: [function () { return heading(2); }, function () { return oddNote(2); }, classify, headingTf, function () { return heading(3); }],
          coach: '<p>Write each note on a sticky note, then physically sort them into piles. Each pile becomes a paragraph.</p>',
          mistake: '<p>Writing notes in the order they were found rather than grouping them.</p>' },
        { slug: 'outline', title: 'Choose an organizer and an order', exp: ['D1.4'], skill: 'order',
          model: [
            step(W.means('think', ORG[0][0]), ORGS[0] + ': alike and different.'),
            step(W.means('think', ORG[3][0]), ORGS[1] + ': one thing leads to the next.'),
            step(W.means('think', ORG[9][0]), ORGS[3] + ': events by date.'),
            step(W.sent(OUTLINES[0][1][0]) + W.sent(OUTLINES[0][1][1]) + W.sent(OUTLINES[0][1][2]), 'A persuasive essay starts strong.'),
            step(W.sent(OUTLINES[0][1][3]) + W.sent(OUTLINES[0][1][4]), 'Answer the other side, then end with action.')
          ],
          guided: [function () { return organizer(1); }, orgTf, function () { return outline(1); }],
          check: [function () { return organizer(2); }, matchOrg, function () { return outline(2); }, orgTf, function () { return organizer(3); }],
          coach: '<p>Save the strongest reason for last before the conclusion; readers remember endings.</p>',
          mistake: '<p>Ignoring the other side, which makes an argument less convincing.</p>' }
      ]
    }],
    practice: [
      { id: 'purpose', name: 'Purpose, audience and form', code: 'D1.1', gen: form },
      { id: 'ideas', name: 'Strategies for finding ideas', code: 'D1.2', gen: ideas },
      { id: 'sources', name: 'Reliable sources', code: 'D1.3', gen: reliable },
      { id: 'citing', name: 'Citing sources', code: 'D1.3', gen: citation },
      { id: 'grouping', name: 'Grouping notes', code: 'D1.4', gen: heading },
      { id: 'order', name: 'Organizers and order', code: 'D1.4', gen: organizer }
    ],
    tasks: [
      { id: 'challenging-topic', title: 'Ideas on a challenging topic', code: 'D1.2', pic: W.icon('think'), say: 'Choose a topic about fairness, diversity or inclusion. Use two strategies to gather ideas.', write: true,
        run: ['Help the child choose a challenging topic, such as accessibility at school or how newcomers are welcomed.', 'They use two strategies (a mind map and an interview, for example) and their own experiences to gather ideas.'],
        rubric: ['Few ideas.', 'Some ideas from one strategy.', 'Varied ideas from two strategies and lived experience.', 'Rich, thoughtful ideas that show several perspectives.'] },
      { id: 'research-notes', title: 'Research with sources', code: 'D1.3', pic: W.icon('screen'), say: 'Research a question. Use three sources and cite each one.', write: true,
        run: ['The child chooses a research question.', 'They find three sources, note who made each and when, and check facts across them.', 'They write their notes in their own words, with a citation for each source.'],
        rubric: ['One source, not checked or cited.', 'Some sources; some citations missing.', 'Three checked sources, synthesized and cited.', 'Evaluates each source' + AP + 's currency, bias and accuracy, and cites all correctly.'] },
      { id: 'planning-reflect', title: 'What helped me plan?', code: 'D1.5', pic: W.icon('star'), say: 'Which planning strategy or tool helped most? What will you do next time?', write: true,
        run: ['After a writing project, the child lists the strategies and tools they used (mind map, outline, sticky notes, an app).', 'They explain which helped most and set one goal for next time.'],
        rubric: ['No reflection.', 'Names a tool used.', 'Evaluates which tools helped most, and why.', 'Compares tools thoughtfully and sets a specific improvement goal.'] }
    ]
  });

  Q.shapes('planning', {
    purpose: [[1, 'purpose', formPurpose], [1, 'true-false', formTf], [2, 'match', matchForm]],
    ideas: [[1, 'true-false', ideasTf], [1, 'when', ideasWhen], [2, 'match', ideasMatch]],
    sources: [[1, 'true-false', sourceTf], [1, 'current', current], [1, 'bias', biasSource]],
    citing: [[1, 'when-cite', whenCite], [1, 'true-false', citeTf], [1, 'missing', citeMissing]],
    grouping: [[1, 'true-false', headingTf], [1, 'odd-one-out', oddNote], [2, 'match', classify]],
    order: [[1, 'true-false', orgTf], [1, 'outline', outline], [2, 'match', matchOrg]]
  });
})();
