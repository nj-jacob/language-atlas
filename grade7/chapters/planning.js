/* Grade 7: planning and research.
   Ontario 2023 Language, Grade 7, D1 Developing Ideas and Organizing Content:
   D1.1 topic, purpose and audience, and why a form, genre and medium suit them      D1.2 generating and developing ideas with a variety of strategies and resources
   D1.3 gathering and synthesizing information; evaluating quality, bias and accuracy; verifying sources; recording the creator and source
   D1.4 classifying and sequencing ideas and information, and organizing relevant content
   With a grown-up: D1.5 how the strategies and tools helped.
   All examples are written for this site. Answer checks: tests/verify/grade7-planning.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* ---------- purpose, audience and form: [purpose and audience, the form that fits] ---------- */
  var FIT = [['persuade city council to add bike lanes', 'a formal letter'], ['explain to classmates how a wind turbine works', 'an information report with a diagram'],
    ['entertain young children at the library', 'a picture book'], ['share your family' + AP + 's story with relatives', 'a memoir'], ['warn students about a slippery hallway', 'a poster'],
    ['teach a friend to make pancakes', 'a procedure with numbered steps'], ['invite neighbours to a community garden day', 'a flyer'], ['thank a guest speaker for visiting', 'a thank-you letter'],
    ['describe a sunset in a few vivid lines', 'a poem'], ['tell parents about the school science fair', 'a newsletter article'], ['convince classmates to join the recycling club', 'a persuasive speech'],
    ['record what you saw and felt each day of a canoe trip', 'a journal']];
  function formFit(lv) {
    var f = R.pick(FIT);
    return Q.one('You want to <b>' + f[0] + '</b>. Which form fits best?', f[1], R.some(FIT.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      prompt: 'Who is the audience? What do you want them to do or know?', hint: 'Match the form to the purpose and the audience.', explain: '<b>' + f[1] + '</b>', meta: { k: 'g7-form-fit', p: f[0] } });
  }
  function fitMatch(lv) {
    var fs = R.some(FIT, lv > 2 ? 4 : 3);
    return { q: 'Match each purpose to its form.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Picture the reader of each one.', explain: 'Purpose and audience decide the form.', meta: { k: 'g7-fit-match' } };
  }
  function formTf() {
    var f = R.pick(FIT), right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(FIT.filter(function (x) { return x !== f; }))[1];
    return { q: Q.name() + ' wants to <b>' + f[0] + '</b>, and plans to write <b>' + said + '</b>. Good choice?', fig: W.means('write', said), type: 'tf', answer: right,
      why: { options: ['That form suits the purpose and audience.', 'Another form would reach that audience better.'], answer: right ? 0 : 1 },
      hint: 'Who will read it, and what should they do?', explain: 'Best fit: <b>' + f[1] + '</b>.', meta: { k: 'g7-plan-form-tf', p: f[0], said: said } };
  }
  /* [audience situation, the medium that suits it] */
  var MEDIUM = [['people who listen while they commute', 'a podcast'], ['shoppers walking past a bulletin board', 'a poster'], ['a large audience in the school gym', 'a speech with slides'],
    ['readers who want to search for details later', 'a website with headings and links'], ['friends who scroll on their phones', 'a short video'],
    ['grandparents who like to hold something to read', 'a printed booklet'], ['drivers passing the school', 'a large sign']];
  function medium(lv) {
    var m = R.pick(MEDIUM);
    return Q.tiles('Your audience is <b>' + m[0] + '</b>. Which medium suits them?', m[1], R.some(MEDIUM.filter(function (x) { return x !== m; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'How and where will they meet your text?', explain: '<b>' + m[1] + '</b> suits ' + m[0] + '.', meta: { k: 'g7-medium', a: m[0] } });
  }

  /* ---------- generating ideas: [strategy, what it is good for] ---------- */
  var IDEAS = [['a mind map', 'seeing how ideas connect'], ['a quick list', 'getting many ideas down fast'], ['freewriting', 'writing nonstop to find what you think'],
    ['5W questions', 'asking who, what, when, where and why'], ['an interview', 'learning from someone' + AP + 's lived experience'], ['a T-chart', 'comparing two sides of an issue'],
    ['a timeline', 'putting events in order'], ['looking at old photos', 'sparking memories and details']];
  function ideaStrategy(lv) {
    var i = R.pick(IDEAS);
    return Q.one('Which strategy is best for <b>' + i[1] + '</b>?', i[0], R.some(IDEAS.filter(function (x) { return x !== i; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Think about what each strategy produces.', explain: '<b>' + i[0] + '</b>: ' + i[1] + '.', meta: { k: 'g7-idea-strategy', use: i[1] } });
  }
  function ideaUse(lv) {
    var i = R.pick(IDEAS);
    return Q.tiles('What is <b>' + i[0] + '</b> best for?', i[1], R.some(IDEAS.filter(function (x) { return x !== i; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), {
      hint: 'Picture yourself using it.', explain: '<b>' + i[0] + '</b>: ' + i[1] + '.', meta: { k: 'g7-idea-use', s: i[0] } });
  }
  function ideaMatch(lv) {
    var is = R.some(IDEAS, lv > 2 ? 4 : 3);
    return { q: 'Match each strategy to what it is good for.', type: 'match', pairs: is.map(function (i) { return [i[0], i[1]]; }), hint: 'Picture yourself using each one.', explain: 'Different strategies help at different moments.', meta: { k: 'g7-idea-match' } };
  }
  function ideaTf() {
    var i = R.pick(IDEAS), right = R.int(0, 1) === 1, said = right ? i[1] : R.pick(IDEAS.filter(function (x) { return x !== i; }))[1];
    return { q: Q.name() + ' says <b>' + i[0] + '</b> is best for <b>' + said + '</b>.', fig: W.means('think', i[0]), type: 'tf', answer: right,
      why: { options: ['That is what this strategy does well.', 'A different strategy does that better.'], answer: right ? 0 : 1 },
      hint: 'What does this strategy produce?', explain: '<b>' + i[0] + '</b>: ' + i[1] + '.', meta: { k: 'g7-idea-tf', s: i[0], said: said } };
  }

  /* ---------- reliable sources: [topic, a reliable source, less reliable sources] ---------- */
  var SOURCES = [['the health effects of energy drinks', 'a report from a children' + AP + 's hospital, updated this year', ['an energy drink company' + AP + 's ad', 'a post by an anonymous account']],
    ['the history of the Underground Railroad in Ontario', 'a museum website with named historians and sources', ['a video with no named creator', 'a meme shared 10 000 times']],
    ['the number of moose in Algonquin Park', 'a government wildlife survey from last year', ['a blog post from 2009', 'a comment on a hunting forum']],
    ['how wind turbines affect birds', 'a university study that lists its methods', ['a turbine company' + AP + 's sales page', 'a rumour from a classmate']],
    ['how much sleep teens need', 'a health guide from a national paediatric society', ['a mattress company' + AP + 's blog', 'a video by a stranger who gives no sources']],
    ['the weather this weekend', 'the national weather service forecast from today', ['a forecast posted last month', 'a guess in a group chat']],
    ['the treaty that covers your area', 'a First Nation' + AP + 's own website and a government treaty page', ['a quiz app with no sources', 'an unsigned comment']],
    ['plastic in the Great Lakes', 'a science article that names its researchers', ['a bottled water ad', 'a post that says "trust me"']]];
  function reliable(lv) {
    var s = R.pick(SOURCES);
    return Q.one('You are researching <b>' + s[0] + '</b>. Which source is most reliable?', s[1], s[2].slice(0, lv > 1 ? 2 : 1), { prompt: 'Who made it? When? Why? Do they show evidence?',
      hint: 'Look for experts, recent dates, evidence, and no reason to sell or mislead.', explain: s[1] + ': named experts, recent, with evidence.', meta: { k: 'g7-reliable', t: s[0] } });
  }
  var WARN = ['No author or organization is named.', 'It is trying to sell you something.', 'It is many years out of date.', 'Other sources say something very different.',
    'It uses insults instead of evidence.', 'It gives no evidence for its claims.'];
  var GOODSIGN = ['It names its sources.', 'Experts on the topic wrote it.', 'It was updated recently.', 'Other trusted sources agree.', 'It shows evidence, like data.'];
  function warnings() {
    return Q.all('Pick every <b>warning sign</b> that a source may not be reliable.', R.some(WARN, 2), R.some(GOODSIGN, 2), { hint: 'Would you trust it if you knew this?',
      explain: 'Missing authors, a reason to sell, old dates, no evidence and disagreement with other sources are warning signs.', meta: { k: 'g7-warnings' } });
  }
  function signSort() {
    var warn = R.int(0, 1) === 1, s = R.pick(warn ? WARN : GOODSIGN);
    return { q: 'You notice this about a source. Is it a good sign or a warning sign?', fig: W.means('read', s), type: 'tap', tiles: ['A good sign', 'A warning sign'], answer: warn ? 1 : 0,
      hint: 'Would it make you trust the source more or less?', explain: warn ? 'A warning sign.' : 'A good sign.', meta: { k: 'g7-sign-sort', s: s } };
  }
  function reliableTf() {
    var s = R.pick(SOURCES), good = R.int(0, 1) === 1, shown = good ? s[1] : R.pick(s[2]), right = R.int(0, 1) === 1, said = right === good;
    return { q: Q.name() + ' is researching <b>' + s[0] + '</b> and says this source is <b>' + (said ? 'reliable' : 'not reliable') + '</b>.', fig: W.means('read', shown), type: 'tf', answer: right,
      why: { options: [said ? 'It shows who made it and has no reason to mislead.' : 'Its creator is unknown, out of date, or wants to sell.', said ? 'Its creator is unknown, out of date, or wants to sell.' : 'It shows who made it and has no reason to mislead.'], answer: right ? 0 : 1 },
      hint: 'Who made it? When? Why?', explain: 'Most reliable: ' + s[1] + '.', meta: { k: 'g7-reliable-tf', shown: shown, said: said } };
  }

  /* ---------- recording and crediting sources ---------- */
  var RECORD = ['the creator or author', 'the title', 'the date it was published', 'the website or publisher', 'the link or page number'];
  var NORECORD = ['how long it took you to read', 'your favourite colour on the page', 'how many ads it had', 'what you ate while reading'];
  function citeWhat() {
    return Q.all('Pick every detail you should <b>record</b> about a source.', R.some(RECORD, 2), R.some(NORECORD, 2), { hint: 'What would someone need to find the same source?',
      explain: 'Record the creator, the title, the date and where it came from.', meta: { k: 'g7-cite-what' } });
  }
  var CITE_SAYS = [['I must give credit when I use someone else' + AP + 's words, images or ideas.', true], ['A quotation needs quotation marks and the speaker' + AP + 's name.', true],
    ['Putting an idea in my own words still needs credit.', true], ['Keeping a source log as I research saves time later.', true],
    ['If I found it online, I do not need to say where it came from.', false], ['Changing a few words means I can skip the credit.', false],
    ['Only books need to be credited, not videos.', false], ['I can add the sources at the end from memory.', false]];
  function citeTf() {
    var c = R.pick(CITE_SAYS);
    return { q: Q.name() + ' says:', fig: W.sent(c[0]), type: 'tf', answer: c[1], why: { options: ['Creators deserve credit, and readers need to check sources.', 'Online content belongs to everyone.'], answer: 0 },
      hint: 'Who made it?', explain: 'Always record and credit the creator and source.', meta: { k: 'g7-cite-tf', said: c[0] } };
  }
  /* [what you use, does it need credit?] */
  var CREDIT = [['a photo from a museum website', true], ['a quotation from a scientist in a video', true], ['an idea from a book, in your own words', true], ['a chart from a government report', true],
    ['your own drawing', false], ['something you saw yourself on a class trip', false], ['a fact everyone knows, like Ottawa is Canada' + AP + 's capital', false], ['the results of your own survey of classmates', false]];
  function creditOrNot() {
    var c = R.pick(CREDIT);
    return { q: 'You use <b>' + c[0] + '</b>. Do you need to give credit?', fig: W.means('lock', c[0]), type: 'tap', tiles: ['Yes: someone else made it', 'No: it is your own or common knowledge'], answer: c[1] ? 0 : 1,
      hint: 'Who made it or found it first?', explain: c[1] ? 'Credit the creator.' : 'No credit needed.', meta: { k: 'g7-credit', s: c[0] } };
  }
  /* source notes: [creator, title, date, where] */
  var NOTES = [['L. Chen', 'Monarchs on the Move', '2025', 'Lakeside Science Centre website'], ['A. Bearskin', 'Stories of the Grand River', '2023', 'Riverbend Press'],
    ['M. Okafor', 'Clean Water for All', '2024', 'Ontario Water News'], ['K. Tremblay', 'The First Snow', '2022', 'North Shore Books']];
  var NOTE_PARTS = ['Creator', 'Title', 'Date', 'From'];
  function noteLine(n, skip) { return NOTE_PARTS.map(function (p, i) { return i === skip ? '' : p + ': ' + n[i] + '.'; }).filter(Boolean).join(' '); }
  function citeLine(lv) {
    var n = R.pick(NOTES), skips = R.some([0, 1, 2, 3], lv > 1 ? 2 : 1);
    return Q.one('Which source note is <b>complete</b>?', noteLine(n, -1), skips.map(function (s) { return noteLine(n, s); }), { hint: 'Look for the creator, title, date and where it came from.',
      explain: noteLine(n, -1), meta: { k: 'g7-cite-line' } });
  }

  /* ---------- organizing notes for a report ---------- */
  var TOPICS = {
    'monarch butterflies': { heads: { 'Life cycle': ['Monarchs hatch from eggs as caterpillars.', 'A caterpillar forms a chrysalis.', 'An adult comes out after about two weeks.'],
      'Migration': ['Monarchs fly to Mexico each fall.', 'The trip can be over 4000 km.', 'They use the sun to find their way.'],
      'Threats': ['Milkweed is disappearing from fields.', 'Storms can kill thousands during migration.', 'Pesticides harm caterpillars.'] },
      off: ['My cousin has a pet rabbit.', 'Butterfly stickers are sold at the mall.'] },
    beavers: { heads: { 'Homes': ['Beavers build lodges from sticks and mud.', 'A lodge has an underwater entrance.', 'Families of up to eight live in one lodge.'],
      'Food': ['Beavers eat bark, twigs and leaves.', 'They store branches underwater for winter.', 'Pond plants are a summer treat.'],
      'Dams': ['Dams make ponds deeper.', 'Beaver ponds give homes to fish and birds.', 'A dam can be longer than a hockey rink.'] },
      off: ['The Canadian five-cent coin is shiny.', 'My uncle likes fishing on Saturdays.'] }
  };
  var TNAMES = Object.keys(TOPICS);
  function classify(lv) {
    var t = TOPICS[R.pick(TNAMES)], hs = Object.keys(t.heads);
    return { q: 'Match each note to its heading.', type: 'match', pairs: hs.map(function (h) { return [R.pick(t.heads[h]), h]; }), hint: 'What is each note mostly about?', explain: 'Sorting notes under headings builds the report' + AP + 's sections.', meta: { k: 'g7-classify' } };
  }
  function headingFor(lv) {
    var t = TOPICS[R.pick(TNAMES)], hs = Object.keys(t.heads), h = R.pick(hs), n = R.pick(t.heads[h]);
    return Q.tiles('Which heading does this note belong under?', h, hs.filter(function (x) { return x !== h; }).slice(0, lv > 1 ? 2 : 1), { fig: W.sent(n), hint: 'What is the note mostly about?', explain: '<b>' + h + '</b>', meta: { k: 'g7-heading-for', n: n } });
  }
  function offTopic(lv) {
    var name = R.pick(TNAMES), t = TOPICS[name], hs = R.some(Object.keys(t.heads), lv > 1 ? 3 : 2);
    return Q.one('Which note does <b>not</b> belong in a report on ' + name + '?', R.pick(t.off), hs.map(function (h) { return R.pick(t.heads[h]); }), {
      hint: 'Does it help explain ' + name + '?', explain: 'Leave out notes that are not relevant.', meta: { k: 'g7-off-topic', t: name } });
  }
  function classifyTf() {
    var t = TOPICS[R.pick(TNAMES)], hs = Object.keys(t.heads), h = R.pick(hs), n = R.pick(t.heads[h]), right = R.int(0, 1) === 1, said = right ? h : R.pick(hs.filter(function (x) { return x !== h; }));
    return { q: Q.name() + ' puts this note under <b>' + said + '</b>.', fig: W.sent(n), type: 'tf', answer: right,
      why: { options: ['The note is mostly about that.', 'The note is mostly about something else.'], answer: right ? 0 : 1 },
      hint: 'What is the note mostly about?', explain: '<b>' + h + '</b>', meta: { k: 'g7-classify-tf', n: n, said: said } };
  }

  /* ---------- putting sections in order ---------- */
  var OUTLINES = [['Introduction: why monarchs matter', 'Life cycle', 'Migration', 'Threats', 'Conclusion: how people can help'],
    ['Introduction: meet the beaver', 'Homes', 'Food', 'Dams', 'Conclusion: why beavers matter to wetlands'],
    ['Opening: state your position', 'Your strongest reason', 'Another reason with evidence', 'Answer the other side', 'Closing: what you want them to do'],
    ['Headline', 'Lead: who, what, when and where', 'Key details', 'Quotes from people involved', 'Background information'],
    ['Introduction: who the person is', 'Childhood', 'Later life and work', 'Conclusion: why they matter today']];
  function outline() {
    var o = R.pick(OUTLINES);
    return { q: 'Put the outline in a logical order.', type: 'order', items: o.slice(), first: 'First', last: 'Last', hint: 'What does the reader need to know first?',
      explain: o.join(' &rarr; '), meta: { k: 'g7-outline' } };
  }
  function firstSection(lv) {
    var o = R.pick(OUTLINES);
    return Q.tiles('Which section should come <b>first</b>?', o[0], R.some(o.slice(1), lv > 1 ? 3 : 2), { hint: 'What does the reader need before anything else?', explain: o.join(' &rarr; '), meta: { k: 'g7-first-section' } });
  }
  function sectionAfter(lv) {
    var o = R.pick(OUTLINES), i = R.int(0, o.length - 2);
    return Q.tiles('Which section comes right after <b>' + o[i] + '</b>?', o[i + 1], R.some(o.filter(function (x, j) { return j !== i && j !== i + 1; }), lv > 1 ? 3 : 2), {
      hint: 'What would the reader want to know next?', explain: o.join(' &rarr; '), meta: { k: 'g7-section-after', after: o[i] } });
  }
  function orderTf() {
    var o = R.pick(OUTLINES), two = R.some(o.map(function (x, i) { return i; }), 2), a = o[two[0]], b = o[two[1]];
    return { q: Q.name() + ' says <b>' + a + '</b> should come before <b>' + b + '</b>.', fig: W.means('write', R.shuffle(o.slice()).join(' / ')), type: 'tf', answer: two[0] < two[1],
      why: { options: ['The reader needs that part first.', 'The reader needs the other part first.'], answer: two[0] < two[1] ? 0 : 1 },
      hint: 'Picture the reader. What do they need first?', explain: o.join(' &rarr; '), meta: { k: 'g7-order-tf', a: a, b: b } };
  }

  Atlas.register('planning', {
    full: true,
    lessons: [{
      id: 'purpose', title: 'Purpose, audience and ideas', sub: 'Decide who it is for, then find what to say.',
      concepts: [
        { slug: 'form-fit', title: 'Purpose and audience decide the form', exp: ['D1.1'], skill: 'form',
          model: [
            step(W.means('people', 'city council'), 'A formal audience.'),
            step(W.means('star', 'persuade them to add bike lanes'), 'The purpose.'),
            step(W.means('write', 'a formal letter'), 'The form that fits both.'),
            step(W.means('people', 'young children at the library'), 'A new audience, to entertain.'),
            step(W.means('read', 'a picture book'), 'A different form.')
          ],
          guided: [function () { return formFit(1); }, function () { return medium(1); }, formTf],
          check: [function () { return formFit(2); }, function () { return fitMatch(2); }, formTf, function () { return medium(2); }, function () { return formFit(3); }],
          coach: '<p>Before any writing task, fill in three blanks together: "I am writing for ___ so that they will ___. So I will write a ___."</p>',
          mistake: '<p>Choosing the form first ("I will make a poster") without asking whether it reaches the audience.</p>' },
        { slug: 'ideas', title: 'Use a strategy to find ideas', exp: ['D1.2'], skill: 'ideas',
          model: [
            step(W.means('think', 'a mind map'), 'See how ideas connect.'),
            step(W.means('write', 'freewriting'), 'Write nonstop for five minutes.'),
            step(W.means('people', 'an interview'), 'Learn from someone' + AP + 's lived experience.'),
            step(W.means('before', 'a timeline'), 'Put events in order.')
          ],
          guided: [function () { return ideaStrategy(1); }, function () { return ideaUse(1); }, ideaTf],
          check: [function () { return ideaStrategy(2); }, function () { return ideaMatch(2); }, ideaTf, function () { return ideaUse(2); }, function () { return ideaStrategy(3); }],
          coach: '<p>Try two strategies on the same topic and compare which gave better ideas.</p>',
          mistake: '<p>Starting to draft with only one idea. Generate many, then choose.</p>' }
      ]
    }, {
      id: 'research', title: 'Research', sub: 'Check sources and record them.',
      concepts: [
        { slug: 'reliable', title: 'Check who made it, when and why', exp: ['D1.3'], skill: 'reliable',
          model: [
            step(W.means('people', 'Who made it?'), 'Experts, named.'),
            step(W.means('again', 'When?'), 'Recent enough.'),
            step(W.means('think', 'Why?'), 'To inform, not to sell.'),
            step(W.means('read', 'Check another source.'), 'Do they agree?')
          ],
          guided: [function () { return reliable(1); }, signSort, reliableTf],
          check: [function () { return reliable(2); }, warnings, reliableTf, signSort, function () { return reliable(3); }],
          coach: '<p>Open two websites on the same topic and score each one: who, when, why, evidence. Talk about the differences.</p>',
          mistake: '<p>Trusting a source because it looks professional or appears first in a search.</p>' },
        { slug: 'cite', title: 'Record every source you use', exp: ['D1.3'], skill: 'cite',
          model: [
            step(W.means('write', 'creator, title, date, where it came from'), 'Write it down as you go.'),
            step(W.sent('Creator: L. Chen. Title: Monarchs on the Move. Date: 2025. From: Lakeside Science Centre website.'), 'One complete source note.'),
            step(W.means('lock', 'someone else' + AP + 's words or images'), 'Give credit.'),
            step(W.means('star', 'your own drawing'), 'No credit needed.')
          ],
          guided: [citeWhat, creditOrNot, citeTf],
          check: [function () { return citeLine(2); }, creditOrNot, citeTf, citeWhat, creditOrNot],
          coach: '<p>Keep a simple source log while researching: one line per source. It saves time at the end.</p>',
          mistake: '<p>Copying a sentence into notes without quotation marks, then forgetting it was someone else' + AP + 's words.</p>' }
      ]
    }, {
      id: 'organize', title: 'Organizing', sub: 'Sort, cut and order your notes.',
      concepts: [
        { slug: 'classify', title: 'Sort notes under headings', exp: ['D1.4'], skill: 'classify',
          model: [
            step(W.tile('Life cycle') + ' ' + W.tile('Migration') + ' ' + W.tile('Threats'), 'Headings.'),
            step(W.sent('Monarchs fly to Mexico each fall.') + ' &rarr; ' + W.tile('Migration')),
            step(W.sent('Pesticides harm caterpillars.') + ' &rarr; ' + W.tile('Threats')),
            step(W.sent('My cousin has a pet rabbit.'), 'Not relevant: cut it.')
          ],
          guided: [classify, function () { return headingFor(1); }, classifyTf],
          check: [classify, function () { return offTopic(2); }, classifyTf, function () { return headingFor(2); }, function () { return offTopic(3); }],
          coach: '<p>Write each note on a sticky note and sort them into piles on the table. It is easier to move paper than text.</p>',
          mistake: '<p>Keeping every note because it was hard to find. Only relevant notes belong.</p>' },
        { slug: 'sequence', title: 'Put the sections in a logical order', exp: ['D1.4'], skill: 'sequence',
          model: [
            step(W.sent('Introduction'), 'Why it matters.'),
            step(W.sent('Life cycle') + W.sent('Migration') + W.sent('Threats'), 'The body, in an order that builds.'),
            step(W.sent('Conclusion'), 'What people can do.'),
            step(W.chain(['Position', 'Reasons', 'Other side', 'Closing']), 'A persuasive letter has its own order.')
          ],
          guided: [outline, function () { return firstSection(1); }, orderTf],
          check: [outline, function () { return sectionAfter(2); }, orderTf, function () { return firstSection(2); }, outline],
          coach: '<p>Ask "What does the reader need to know first?" for each section.</p>',
          mistake: '<p>Putting sections in the order the notes were found rather than the order a reader needs.</p>' }
      ]
    }],
    practice: [
      { id: 'form', name: 'Purpose, audience and form', code: 'D1.1', gen: formFit },
      { id: 'ideas', name: 'Strategies for ideas', code: 'D1.2', gen: ideaStrategy },
      { id: 'reliable', name: 'Reliable sources', code: 'D1.3', gen: reliable },
      { id: 'cite', name: 'Recording and crediting sources', code: 'D1.3', gen: creditOrNot },
      { id: 'classify', name: 'Sorting notes', code: 'D1.4', gen: headingFor },
      { id: 'sequence', name: 'Ordering sections', code: 'D1.4', gen: sectionAfter }
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
    form: [[1, 'medium', medium], [1, 'true-false', formTf], [2, 'match', fitMatch]],
    ideas: [[1, 'use', ideaUse], [1, 'true-false', ideaTf], [2, 'match', ideaMatch]],
    reliable: [[1, 'sign', signSort], [1, 'true-false', reliableTf], [2, 'warnings', warnings]],
    cite: [[1, 'what', citeWhat], [1, 'true-false', citeTf], [2, 'complete-note', citeLine]],
    classify: [[1, 'match', classify], [1, 'true-false', classifyTf], [2, 'off-topic', offTopic]],
    sequence: [[1, 'first', firstSection], [1, 'true-false', orderTf], [2, 'order', outline]]
  });
})();
