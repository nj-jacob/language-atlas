/* Grade 7: planning and research.
   Ontario 2023 Language, Grade 7, D1 Developing Ideas and Organizing Content:
   D1.1 topic, purpose and audience, and why a form, genre and medium suit them      D1.2 generating and developing ideas with a variety of strategies and resources
   D1.3 gathering and synthesizing information; evaluating quality, bias and accuracy; verifying sources; recording the creator and source
   D1.4 classifying and sequencing ideas and information, and organizing relevant content
   With a grown-up: D1.5 how the strategies and tools helped.
   All examples are written for this site. Answer checks: tests/verify/grade7-planning.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* ---------- purpose, audience and form: [purpose and audience, the form that fits] ---------- */
  var FIT = [['persuade city council to add bike lanes', 'a formal letter'], ['explain to classmates how a wind turbine works', 'an information report with a diagram'],
    ['entertain young children at the library', 'a picture book'], ['share your family' + '’' + 's story with relatives', 'a memoir'], ['warn students about a slippery hallway', 'a poster'],
    ['teach a friend to make pancakes', 'a procedure with numbered steps']];
  function formFit(lv) {
    var f = R.pick(FIT);
    return Q.one('You want to <b>' + f[0] + '</b>. Which form fits best?', f[1], R.some(FIT.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      prompt: 'Who is the audience? What do you want them to do or know?', hint: 'Match the form to the purpose and the audience.', explain: '<b>' + f[1] + '</b>', meta: { k: 'g7-form-fit', p: f[0] } });
  }
  /* [audience situation, the medium that suits it] */
  var MEDIUM = [['people who listen while they commute', 'a podcast'], ['shoppers walking past a bulletin board', 'a poster'], ['a large audience in the school gym', 'a speech with slides'],
    ['readers who want to search for details later', 'a website with headings and links']];
  function medium() {
    var m = R.pick(MEDIUM);
    return Q.tiles('Your audience is <b>' + m[0] + '</b>. Which medium suits them?', m[1], R.some(MEDIUM.filter(function (x) { return x !== m; }), 2).map(function (x) { return x[1]; }), {
      hint: 'How and where will they meet your text?', explain: '<b>' + m[1] + '</b> suits ' + m[0] + '.', meta: { k: 'g7-medium', a: m[0] } });
  }
  function fitMatch() {
    var fs = R.some(FIT, 3);
    return { q: 'Match each purpose to its form.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Picture the reader of each one.', explain: 'Purpose and audience decide the form.', meta: { k: 'g7-fit-match' } };
  }

  /* ---------- generating ideas: [strategy, what it is good for] ---------- */
  var IDEAS = [['a mind map', 'seeing how ideas connect'], ['a quick list', 'getting many ideas down fast'], ['freewriting', 'writing nonstop to find what you think'],
    ['5W questions', 'asking who, what, when, where and why'], ['an interview', 'learning from someone' + '’' + 's lived experience']];
  function ideaStrategy(lv) {
    var i = R.pick(IDEAS);
    return Q.one('Which strategy is best for <b>' + i[1] + '</b>?', i[0], R.some(IDEAS.filter(function (x) { return x !== i; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Think about what each strategy produces.', explain: '<b>' + i[0] + '</b>: ' + i[1] + '.', meta: { k: 'g7-idea-strategy', use: i[1] } });
  }
  function ideaMatch() {
    var is = R.some(IDEAS, 3);
    return { q: 'Match each strategy to what it is good for.', type: 'match', pairs: is.map(function (i) { return [i[0], i[1]]; }), hint: 'Picture yourself using each one.', explain: 'Different strategies help at different moments.', meta: { k: 'g7-idea-match' } };
  }

  /* ---------- sources ---------- */
  /* [topic, a reliable source, less reliable sources] */
  var SOURCES = [['the health effects of energy drinks', 'a report from a children' + '’' + 's hospital, updated this year', ['an energy drink company' + '’' + 's ad', 'a post by an anonymous account']],
    ['the history of the Underground Railroad in Ontario', 'a museum website with named historians and sources', ['a video with no named creator', 'a meme shared 10 000 times']],
    ['the number of moose in Algonquin Park', 'a government wildlife survey from last year', ['a blog post from 2009', 'a comment on a hunting forum']],
    ['how wind turbines affect birds', 'a university study that lists its methods', ['a turbine company' + '’' + 's sales page', 'a rumour from a classmate']]];
  function reliable(lv) {
    var s = R.pick(SOURCES);
    return Q.one('You are researching <b>' + s[0] + '</b>. Which source is most reliable?', s[1], s[2].slice(0, lv > 1 ? 2 : 1), { prompt: 'Who made it? When? Why? Do they show evidence?',
      hint: 'Look for experts, recent dates, evidence, and no reason to sell or mislead.', explain: s[1] + ': named experts, recent, with evidence.', meta: { k: 'g7-reliable', t: s[0] } });
  }
  var WARN = ['No author or organization is named.', 'It is trying to sell you something.', 'It is many years out of date.', 'Other sources say something very different.'];
  var GOODSIGN = ['It names its sources.', 'Experts on the topic wrote it.', 'It was updated recently.'];
  function warnings() {
    return Q.all('Pick every <b>warning sign</b> that a source may not be reliable.', R.some(WARN, 2), R.some(GOODSIGN, 2), { hint: 'Would you trust it if you knew this?',
      explain: 'Missing authors, a reason to sell, old dates and disagreement with other sources are warning signs.', meta: { k: 'g7-warnings' } });
  }
  var RECORD = ['the creator or author', 'the title', 'the date it was published', 'the website or publisher'];
  var NORECORD = ['how long it took you to read', 'your favourite colour on the page', 'how many ads it had'];
  function citeWhat() {
    return Q.all('Pick every detail you should <b>record</b> about a source.', R.some(RECORD, 2), R.some(NORECORD, 2), { hint: 'What would someone need to find the same source?',
      explain: 'Record the creator, the title, the date and where it came from.', meta: { k: 'g7-cite-what' } });
  }
  function citeTf() {
    var right = R.int(0, 1) === 1, said = right ? 'I must give credit when I use someone else' + '’' + 's words, images or ideas.' : 'If I found it online, I do not need to say where it came from.';
    return { q: Q.name() + ' says:', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['Creators deserve credit, and readers need to check sources.', 'Online content belongs to everyone.'], answer: 0 },
      hint: 'Who made it?', explain: 'Always record and credit the creator and source.', meta: { k: 'g7-cite-tf', said: said } };
  }

  /* ---------- organizing: notes for a report on monarch butterflies ---------- */
  var HEADS = { 'Life cycle': ['Monarchs hatch from eggs as caterpillars.', 'A caterpillar forms a chrysalis.'], 'Migration': ['Monarchs fly to Mexico each fall.', 'The trip can be over 4000 km.'],
    'Threats': ['Milkweed is disappearing from fields.', 'Storms can kill thousands during migration.'] };
  var OFF = ['My cousin has a pet rabbit.', 'Butterfly stickers are sold at the mall.'];
  function classify() {
    var hs = Object.keys(HEADS);
    return { q: 'Match each note to its heading.', type: 'match', pairs: hs.map(function (h) { return [R.pick(HEADS[h]), h]; }), hint: 'What is each note mostly about?', explain: 'Sorting notes under headings builds the report' + '’' + 's sections.', meta: { k: 'g7-classify' } };
  }
  function headingFor() {
    var hs = Object.keys(HEADS), h = R.pick(hs), n = R.pick(HEADS[h]);
    return Q.tiles('Which heading does this note belong under?', h, hs.filter(function (x) { return x !== h; }), { fig: W.sent(n), hint: 'What is the note mostly about?', explain: '<b>' + h + '</b>', meta: { k: 'g7-heading-for', n: n } });
  }
  function offTopic() {
    var h = R.pick(Object.keys(HEADS));
    return Q.one('Which note does <b>not</b> belong in a report on monarch butterflies?', R.pick(OFF), HEADS[h].concat(HEADS[R.pick(Object.keys(HEADS).filter(function (x) { return x !== h; }))].slice(0, 1)), {
      hint: 'Does it help explain monarchs?', explain: 'Leave out notes that are not relevant.', meta: { k: 'g7-off-topic' } });
  }
  var OUTLINE = ['Introduction: why monarchs matter', 'Life cycle', 'Migration', 'Threats', 'Conclusion: how people can help'];
  function outline() {
    return { q: 'Put the report outline in a logical order.', type: 'order', items: OUTLINE.slice(), first: 'First', last: 'Last', hint: 'Start with an introduction. Tell the life cycle before the trip, and the problems before the solution.',
      explain: OUTLINE.join(' &rarr; '), meta: { k: 'g7-outline' } };
  }

  Atlas.register('planning', {
    lessons: [{
      id: 'purpose', title: 'Purpose, audience and ideas', sub: 'Decide who it is for, then find what to say.',
      concepts: [
        { slug: 'form-fit', title: 'Purpose and audience decide the form', exp: ['D1.1'], skill: 'plan',
          model: [
            step(W.means('people', 'city council'), 'A formal audience.'),
            step(W.means('star', 'persuade them to add bike lanes'), 'The purpose.'),
            step(W.means('write', 'a formal letter'), 'The form that fits both.')
          ],
          guided: [function () { return formFit(1); }, medium],
          check: [function () { return formFit(2); }, fitMatch],
          coach: '<p>Before any writing task, fill in three blanks together: "I am writing for ___ so that they will ___. So I will write a ___."</p>',
          mistake: '<p>Choosing the form first ("I will make a poster") without asking whether it reaches the audience.</p>' },
        { slug: 'ideas', title: 'Use a strategy to find ideas', exp: ['D1.2'], skill: 'plan',
          model: [
            step(W.means('think', 'a mind map'), 'See how ideas connect.'),
            step(W.means('write', 'freewriting'), 'Write nonstop for five minutes.'),
            step(W.means('people', 'an interview'), 'Learn from someone' + '’' + 's lived experience.')
          ],
          guided: [function () { return ideaStrategy(1); }, ideaMatch],
          check: [function () { return ideaStrategy(2); }, ideaMatch],
          coach: '<p>Try two strategies on the same topic and compare which gave better ideas.</p>',
          mistake: '<p>Starting to draft with only one idea. Generate many, then choose.</p>' }
      ]
    }, {
      id: 'research', title: 'Research', sub: 'Check sources and record them.',
      concepts: [
        { slug: 'reliable', title: 'Check who made it, when and why', exp: ['D1.3'], skill: 'research',
          model: [
            step(W.means('people', 'Who made it?'), 'Experts, named.'),
            step(W.means('again', 'When?'), 'Recent enough.'),
            step(W.means('think', 'Why?'), 'To inform, not to sell.'),
            step(W.means('read', 'Check another source.'), 'Do they agree?')
          ],
          guided: [function () { return reliable(1); }, warnings],
          check: [function () { return reliable(2); }, warnings],
          coach: '<p>Open two websites on the same topic and score each one: who, when, why, evidence. Talk about the differences.</p>',
          mistake: '<p>Trusting a source because it looks professional or appears first in a search.</p>' },
        { slug: 'cite', title: 'Record every source you use', exp: ['D1.3'], skill: 'research',
          model: [
            step(W.means('write', 'creator, title, date, website'), 'Write it down as you go.'),
            step(W.means('lock', 'someone else' + '’' + 's words or images'), 'Give credit.')
          ],
          guided: [citeWhat, citeTf],
          check: [citeWhat, citeTf],
          coach: '<p>Keep a simple source log while researching: one line per source. It saves time at the end.</p>',
          mistake: '<p>Copying a sentence into notes without quotation marks, then forgetting it was someone else' + '’' + 's words.</p>' }
      ]
    }, {
      id: 'organize', title: 'Organizing', sub: 'Sort, cut and order your notes.',
      concepts: [
        { slug: 'classify', title: 'Sort notes under headings', exp: ['D1.4'], skill: 'organize',
          model: [
            step(W.tile('Life cycle') + ' ' + W.tile('Migration') + ' ' + W.tile('Threats'), 'Headings.'),
            step(W.sent('Monarchs fly to Mexico each fall.') + ' &rarr; ' + W.tile('Migration')),
            step(W.sent('My cousin has a pet rabbit.'), 'Not relevant: cut it.')
          ],
          guided: [classify, offTopic],
          check: [classify, offTopic],
          coach: '<p>Write each note on a sticky note and sort them into piles on the table. It is easier to move paper than text.</p>',
          mistake: '<p>Keeping every note because it was hard to find. Only relevant notes belong.</p>' },
        { slug: 'sequence', title: 'Put the sections in a logical order', exp: ['D1.4'], skill: 'organize',
          model: [
            step(W.sent('Introduction'), 'Why it matters.'),
            step(W.sent('Life cycle') + W.sent('Migration') + W.sent('Threats'), 'The body, in an order that builds.'),
            step(W.sent('Conclusion'), 'What people can do.')
          ],
          guided: [outline, classify],
          check: [outline, offTopic],
          coach: '<p>Ask "What does the reader need to know first?" for each section.</p>',
          mistake: '<p>Putting sections in the order the notes were found rather than the order a reader needs.</p>' }
      ]
    }],
    practice: [
      { id: 'plan', name: 'Purpose, audience and ideas', code: 'D1.1, D1.2', gen: formFit },
      { id: 'research', name: 'Checking and recording sources', code: 'D1.3', gen: reliable },
      { id: 'organize', name: 'Organizing notes', code: 'D1.4', gen: function () { return classify(); } }
    ],
    tasks: [
      { id: 'idea-web', title: 'Plan a piece of writing', code: 'D1.2', pic: W.icon('think'), say: 'Choose a topic about fairness or belonging. Make a mind map of ideas, then circle the three best.', write: true,
        run: ['Help the child choose a topic connected to diversity, equity or inclusion, or to another subject.', 'They brainstorm ideas with a mind map (on paper or in the box), including at least one idea from their own experience.', 'They circle three ideas and say which form and audience they would write for.'],
        rubric: ['One or two ideas only.', 'Several ideas, but not developed.', 'Many ideas, three chosen with reasons.', 'Rich, connected ideas drawn from several resources, with a clear plan for form and audience.'] },
      { id: 'what-helped', title: 'Which planning tool helped?', code: 'D1.5', pic: W.icon('star'), say: 'Compare two planning tools you used. Which helped you more, and why?', write: true,
        run: ['After a planning session, the child compares two tools or strategies (for example a mind map and an outline).', 'Ask: "Which helped you organize better? Will you use it next time?"'],
        rubric: ['Cannot name a tool.', 'Names a tool but not how it helped.', 'Compares two tools and explains which helped.', 'Explains how the tools helped them grow as a writer and plans what to use next.'] }
    ]
  });

  Q.shapes('planning', {
    plan: [[1, 'medium', medium], [1, 'idea-strategy', ideaStrategy], [2, 'match', fitMatch], [2, 'idea-match', ideaMatch]],
    research: [[1, 'warnings', warnings], [1, 'cite-what', citeWhat], [2, 'true-false', citeTf]],
    organize: [[1, 'off-topic', offTopic], [1, 'outline', outline], [1, 'heading', headingFor]]
  });
})();
