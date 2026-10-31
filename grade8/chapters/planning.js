/* Grade 8: planning and research.
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

  /* [purpose and audience, the form that suits it] */
  var FORM = [['persuade town council to fund a skate park', 'a formal letter to council'], ['teach Grade 4 students to build a birdhouse', 'step-by-step instructions with diagrams'],
    ['share a family story with your relatives', 'a personal narrative'], ['entertain teens with a spooky tale', 'a short story'],
    ['report the results of a science experiment', 'a lab report'], ['get the whole school to come to a bake sale', 'a bold poster']];
  /* [a writing problem, the idea strategy that fits] */
  var IDEAS = [['You have many ideas and need to see how they connect.', 'Draw a mind map.'], ['You know little about how the topic affects your community.', 'Interview someone with experience.'],
    ['You are stuck and cannot start.', 'Freewrite for five minutes without stopping.'], ['You want to draw on your own life.', 'List memories connected to the topic.']];
  /* [topic, a reliable source, unreliable ones] */
  var SOURCES = [['facts about Ontario' + AP + 's provincial parks', 'the official Ontario Parks website', ['a comment on a travel forum', 'an ad from a camping store']],
    ['the health effects of energy drinks', 'a report from Health Canada', ['a video made by an energy drink company', 'a post by an influencer with no sources']],
    ['the history of the Underground Railroad in Ontario', 'a book by a historian, with sources listed', ['a meme with no source', 'an anonymous blog post']],
    ['this week' + AP + 's weather in Thunder Bay', 'Environment Canada' + AP + 's forecast', ['a forecast from last year', 'a friend' + AP + 's guess']]];
  var YEARS = [2025, 2016, 2009, 1998];
  /* [reasons to cite, things that need no citation] */
  var CITE = ['you quote someone' + AP + 's exact words', 'you use facts or numbers from a source', 'you use an image you found online', 'you retell an idea from an article in your own words'];
  var NOCITE = ['you give your own opinion', 'you describe your own experience', 'you state common knowledge, like Ottawa being Canada' + AP + 's capital'];
  var CITATION = 'Okafor, J. Winter Roads in a Warming World. Northern Press, 2024.';
  var BADCITE = ['Winter Roads in a Warming World.', 'Okafor, J. Northern Press.', 'A book about roads, 2024.'];
  /* notes about beavers: [note, the heading it belongs under] */
  var NOTES = [['live in ponds and slow streams', 'Habitat'], ['build lodges of sticks and mud', 'Habitat'], ['eat bark and water plants', 'Diet'], ['store branches for winter food', 'Diet'],
    ['slap their tails to warn of danger', 'Behaviour'], ['work mostly at night', 'Behaviour']];
  var OUTLINE = ['Hook and main argument', 'First reason, with evidence', 'Second reason, with evidence', 'Answer to the other side', 'Conclusion and call to action'];
  /* [what you are planning, the organizer that fits] */
  var ORG = [['compare two novels', 'a Venn diagram'], ['explain what caused a flood', 'a cause-and-effect chain'], ['plan the events of a short story', 'a story arc'], ['order the events in a history report', 'a timeline']];

  /* ---------- question makers: purpose ---------- */
  function form(lv) {
    var f = R.pick(FORM);
    return Q.one('Which form best suits this purpose and audience?', f[1], R.some(FORM.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: W.means('think', 'You want to <b>' + f[0] + '</b>.'), prompt: 'Who will read it, and what should it make them do or know?', hint: 'Match the form to the purpose and the audience.',
      explain: f[1] + ' suits that purpose and audience.', meta: { k: 'g8-form', p: f[0] } });
  }
  function matchForm() {
    var fs = R.some(FORM, 3);
    return { q: 'Match each purpose to the best form.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Think about the audience for each.', explain: 'The purpose and audience decide the form.', meta: { k: 'g8-match-form' } };
  }
  function ideas() {
    var i = R.pick(IDEAS);
    return Q.one('Which strategy would help most?', i[1], IDEAS.filter(function (x) { return x !== i; }).map(function (x) { return x[1]; }).slice(0, 2), { fig: W.means('think', i[0]),
      hint: 'Match the strategy to the problem.', explain: i[1], meta: { k: 'g8-ideas', p: i[0] } });
  }

  function formTf() {
    var f = R.pick(FORM), right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(FORM.filter(function (x) { return x !== f; }))[1];
    return { q: Q.name() + ' says the best form is <b>' + said + '</b>.', fig: W.means('think', 'You want to <b>' + f[0] + '</b>.'), type: 'tf', answer: right,
      why: { options: ['The form must suit the purpose and the audience.', 'Any form works for any purpose.'], answer: 0 }, hint: 'Who is the audience? What is the purpose?', explain: f[1] + '.', meta: { k: 'g8-form-tf', p: f[0], said: said } };
  }

  /* ---------- research ---------- */
  function reliable(lv) {
    var s = R.pick(SOURCES);
    return Q.one('Which source is most reliable for <b>' + s[0] + '</b>?', s[1], s[2].slice(0, lv > 1 ? 2 : 1).concat(lv > 2 ? [R.pick(SOURCES.filter(function (x) { return x !== s; }))[2][0]] : []), {
      prompt: 'Who made it? Are they an expert? Do they gain from it?', hint: 'Trust experts and official sources that show their evidence.', explain: s[1] + ' is an expert, accountable source.', meta: { k: 'g8-reliable' } });
  }
  function current() {
    var topic = R.pick(['phones in schools', 'electric cars', 'social media and sleep']);
    return Q.one('Which source is most <b>current</b> for research on ' + topic + '?', 'an article from ' + YEARS[0], YEARS.slice(1, 3).map(function (y) { return 'an article from ' + y; }), {
      hint: 'For fast-changing topics, newer is usually better.', explain: 'The most recent one.', meta: { k: 'g8-current' } });
  }
  function biasSource() {
    return Q.one('A website about the safety of a toy is run by the company that sells it. What is the problem?', 'It may be biased, because the company wants to sell the toy.', ['It is too old to use.', 'It has too many pictures.'], {
      hint: 'Ask: who gains if I believe this?', explain: 'Check it against an independent source, such as a government safety agency.', meta: { k: 'g8-bias-source' } });
  }
  function whenCite() {
    return Q.all('Pick every time you must <b>cite</b> a source.', R.some(CITE, 2), R.some(NOCITE, 2), { hint: 'If the words, facts, image or idea came from someone else, cite it.', explain: 'Citing gives credit and lets readers check your facts.', meta: { k: 'g8-when-cite' } });
  }
  function citation() {
    return Q.one('Which citation is <b>complete</b>?', CITATION, R.some(BADCITE, 2), { hint: 'Author, title, publisher, year.', explain: W.sent(CITATION), meta: { k: 'g8-citation' } });
  }

  /* ---------- organizing ---------- */
  function classify() {
    var ns = R.some(['Habitat', 'Diet', 'Behaviour'].map(function (h) { return R.pick(NOTES.filter(function (n) { return n[1] === h; })); }), 3);
    return { q: 'Sort each note about beavers under a heading.', type: 'match', pairs: ns.map(function (n) { return [n[0], n[1]]; }), hint: 'Where they live, what they eat, how they act.', explain: 'Grouping notes under headings makes a plan for paragraphs.', meta: { k: 'g8-classify' } };
  }
  function outline(lv) {
    var items = lv > 1 ? OUTLINE : [OUTLINE[0], OUTLINE[1], OUTLINE[4]];
    return { q: 'Put the parts of a persuasive essay in order.', type: 'order', items: items, first: 'First', last: 'Last', hint: 'Start with your argument. End with what you want the reader to do.', explain: OUTLINE.join(' &rarr; '), meta: { k: 'g8-outline' } };
  }
  function organizer() {
    var o = R.pick(ORG);
    return Q.tiles('You need to <b>' + o[0] + '</b>. Which organizer fits?', o[1], ORG.filter(function (x) { return x !== o; }).map(function (x) { return x[1]; }).slice(0, 2), {
      hint: 'Compare, cause, story, or time?', explain: o[1] + '.', meta: { k: 'g8-organizer', p: o[0] } });
  }

  function matchOrg() {
    var os = R.some(ORG, 3);
    return { q: 'Match each plan to the organizer that fits.', type: 'match', pairs: os.map(function (o) { return [o[0], o[1]]; }), hint: 'Compare, cause, story, or time?', explain: 'The organizer should match the text pattern.', meta: { k: 'g8-match-org' } };
  }

  Atlas.register('planning', {
    lessons: [{
      id: 'purpose', title: 'Purpose, audience and ideas', sub: 'Decide why and for whom, then find ideas.',
      concepts: [
        { slug: 'form', title: 'Purpose and audience decide the form', exp: ['D1.1'], skill: 'purpose',
          model: [
            step(W.means('people', 'Town council'), 'Audience: adults who decide.'),
            step(W.means('think', 'Fund a skate park'), 'Purpose: to persuade.'),
            step(W.tile('a formal letter to council'), 'Form: it reaches them and sounds serious.')
          ],
          guided: [function () { return form(1); }, matchForm],
          check: [function () { return form(2); }, matchForm],
          coach: '<p>Before any writing, have the child say three things aloud: "I am writing to… (audience) so that they… (purpose), using… (form), because…"</p>',
          mistake: '<p>Choosing a form by habit (always an essay) rather than by purpose.</p>' },
        { slug: 'ideas', title: 'Use a strategy to find ideas', exp: ['D1.2'], skill: 'purpose',
          model: [
            step(W.means('think', 'Stuck?'), 'Freewrite for five minutes.'),
            step(W.means('people', 'Need real experience?'), 'Interview someone.'),
            step(W.means('star', 'Too many ideas?'), 'Draw a mind map.')
          ],
          guided: [ideas, ideas],
          check: [ideas, ideas],
          coach: '<p>Challenging topics, like fairness or inclusion, are easier to start from a story: "When did you see someone left out?"</p>',
          mistake: '<p>Waiting for the perfect idea instead of using a strategy.</p>' }
      ]
    }, {
      id: 'research', title: 'Research and sources', sub: 'Reliable, current, unbiased, and cited.',
      concepts: [
        { slug: 'reliable', title: 'Check who made the source', exp: ['D1.3'], skill: 'research',
          model: [
            step(W.sent(SOURCES[1][1]), 'Experts, accountable, shows evidence.'),
            step(W.sent(SOURCES[1][2][0]), 'Gains from what you believe: biased.'),
            step(W.sent('an article from 2009'), 'Old, for a fast-changing topic.')
          ],
          guided: [function () { return reliable(1); }, biasSource],
          check: [function () { return reliable(2); }, current],
          coach: '<p>Teach "lateral reading": open a new tab and search for who is behind a source before trusting it.</p>',
          mistake: '<p>Trusting the first search result, or a site because it looks professional.</p>' },
        { slug: 'cite', title: 'Cite everything that is not yours', exp: ['D1.3'], skill: 'research',
          model: [
            step(W.means('read', 'exact words, facts, images, ideas'), 'Borrowed: cite it.'),
            step(W.sent(CITATION), 'Author. Title. Publisher, year.')
          ],
          guided: [whenCite, citation],
          check: [whenCite, citation],
          coach: '<p>Keep a source list as you research, not at the end. It is much easier.</p>',
          mistake: '<p>Thinking that changing a few words means you do not need to cite.</p>' }
      ]
    }, {
      id: 'organize', title: 'Organizing ideas', sub: 'Group, order and choose an organizer.',
      concepts: [
        { slug: 'classify', title: 'Group notes under headings', exp: ['D1.4'], skill: 'organize',
          model: [
            step(W.tile('Habitat') + ' ' + W.tile('Diet') + ' ' + W.tile('Behaviour'), 'Three headings.'),
            step(W.sent('eat bark and water plants') + ' &rarr; ' + W.tile('Diet')),
            step(W.sent('slap their tails to warn of danger') + ' &rarr; ' + W.tile('Behaviour'))
          ],
          guided: [classify, organizer],
          check: [classify, organizer],
          coach: '<p>Write each note on a sticky note, then physically sort them into piles. Each pile becomes a paragraph.</p>',
          mistake: '<p>Writing notes in the order they were found rather than grouping them.</p>' },
        { slug: 'outline', title: 'Order the parts for your purpose', exp: ['D1.4'], skill: 'organize',
          model: [
            step(W.sent(OUTLINE[0]), 'Start strong.'),
            step(W.sent(OUTLINE[1]) + W.sent(OUTLINE[2]), 'Reasons with evidence.'),
            step(W.sent(OUTLINE[3]) + W.sent(OUTLINE[4]), 'Answer the other side, then end with action.')
          ],
          guided: [function () { return outline(1); }, function () { return outline(1); }],
          check: [function () { return outline(2); }, organizer],
          coach: '<p>Save the strongest reason for last before the conclusion; readers remember endings.</p>',
          mistake: '<p>Ignoring the other side, which makes an argument less convincing.</p>' }
      ]
    }],
    practice: [
      { id: 'purpose', name: 'Purpose, audience and ideas', code: 'D1.1, D1.2', gen: form },
      { id: 'research', name: 'Reliable sources and citing', code: 'D1.3', gen: reliable },
      { id: 'organize', name: 'Organizing ideas', code: 'D1.4', gen: classify }
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
    purpose: [[1, 'ideas', ideas], [1, 'match', matchForm], [2, 'true-false', formTf]],
    research: [[1, 'current', current], [1, 'bias', biasSource], [1, 'when-cite', whenCite], [2, 'citation', citation]],
    organize: [[1, 'outline', outline], [1, 'organizer', organizer], [2, 'match-organizer', matchOrg]]
  });
})();
