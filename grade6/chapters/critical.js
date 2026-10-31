/* Grade 6: critical reading.
   Ontario 2023 Language, Grade 6, C3 Critical Thinking in Literacy:
   C3.2 local and global inferences, using explicit and implicit evidence
   C3.3 main and supporting ideas, the quality of information and its relevance for a purpose, and conclusions
   C3.5 explicit and implicit perspectives, evidence of bias, and ways to avoid bias
   C3.6 how topics such as diversity, inclusion and accessibility are addressed, the messages, and the positions presented
   With a grown-up: C3.4 cultural elements in texts, C3.7 texts by First Nations, Metis and Inuit creators and their contexts,
   C3.8 comparing the critical thinking skills that helped.
   Passages are in ../texts.js. Answer checks: tests/verify/grade6-critical.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var AP = '’';

  /* ---------- inferences: [passage, statement, stated in the text?] ---------- */
  var SAID = [[T.tryouts, 'The tryouts were for basketball.', true], [T.tryouts, 'The narrator made three shots in a row.', true], [T.tryouts, 'The narrator was nervous.', false],
    [T.tryouts, 'Coach Ahmed is kind.', false], [T.portage, 'Uncle Ray carried the canoe.', true], [T.portage, 'The trail was muddy.', true], [T.portage, 'Tala was tired.', false], [T.portage, 'Tala felt proud at the end.', false]];
  /* the big message of a whole text: [passage, theme, wrong themes] */
  var THEME = [[T.tryouts, 'Being brave means trying even when you are nervous.', ['Basketball is the best sport.', 'Coaches should be strict.']],
    [T.portage, 'Hard things can be worth finishing.', ['Canoe trips are dangerous.', 'Uncles should carry everything.']],
    [T.ramp, 'Everyone should be able to enter a building the same way.', ['Ramps are cheaper than stairs.', 'Side doors should always stay open.']]];

  function stated() {
    var s = R.pick(SAID);
    return { q: 'Does the text <b>say</b> this, or do you <b>work it out</b>?', fig: T.show(s[0]) + W.sent(s[1]), type: 'tap', tiles: ['The text says it.', 'I work it out from clues.'], answer: s[2] ? 0 : 1,
      prompt: 'Can you point to the exact words?', hint: 'If the words are there, it is stated. If you used clues, it is an inference.', explain: s[2] ? 'The words are in the text: <b>explicit</b>.' : 'You worked it out from clues: an <b>inference</b>.',
      meta: { k: 'g6-stated', s: s[1] } };
  }
  function theme(lv) {
    var t = R.pick(THEME);
    return Q.one('What is the <b>big message</b> of the whole text?', t[1], t[2].slice(0, lv > 1 ? 2 : 1), { fig: T.show(t[0]),
      prompt: 'What does the writer want you to understand about life?', hint: 'A message fits the whole text, and goes beyond it.', explain: t[1], meta: { k: 'g6-theme', t: t[0].title } });
  }
  var CLUES = [[T.tryouts, 'The narrator was nervous.', 'got cold feet'], [T.tryouts, 'Coach Ahmed is kind.', 'Everyone starts somewhere'], [T.portage, 'Tala was tired.', 'straps dug into her shoulders'],
    [T.portage, 'Tala felt proud at the end.', 'dropped the packs and laughed']];
  function inferClue() {
    var c = R.pick(CLUES), other = R.pick(CLUES.filter(function (x) { return x[0] === c[0] && x !== c; }));
    return Q.one('You infer: <b>' + c[1] + '</b> Which words are your evidence?', c[2], [other[2]], { fig: T.show(c[0]), hint: 'Which words show it without saying it?',
      explain: '<mark class="hl">' + c[2] + '</mark>', meta: { k: 'g6-infer-clue', s: c[1] } });
  }
  function pickInferred() {
    var ss = SAID.filter(function (x) { return x[0] === T.tryouts; }), right = ss.filter(function (x) { return !x[2]; }).map(function (x) { return x[1]; }), wrong = ss.filter(function (x) { return x[2]; }).map(function (x) { return x[1]; });
    return Q.all('Pick every idea you <b>work out</b> from clues (the text does not say it).', right, wrong, { fig: T.show(T.tryouts), hint: 'Look for the exact words. If they are not there, it is an inference.',
      explain: 'Inferences: ' + right.join(' '), meta: { k: 'g6-pick-inferred' } });
  }

  /* ---------- evaluating information ---------- */
  /* [main idea, a detail that supports it, a true detail that does not] */
  var SUPPORT = [['Beavers change the land around them.', 'Their dams flood streams and make new ponds.', 'Beavers have orange front teeth.'],
    ['Walking to school is good for students.', 'It gives them exercise before class.', 'Some students live in apartments.'],
    ['The ramp made the school fairer.', 'Now everyone can use the same front door.', 'The steps are made of concrete.'],
    ['Recycling saves resources.', 'Aluminum cans can be recycled into new cans again and again.', 'Recycling trucks are often blue.']];
  /* [what you need it for, a reliable source, a weak source] */
  var SOURCES = [['a report on polar bear numbers', 'a recent study by Arctic scientists', 'an old blog post by a tourist'], ['facts about Ontario' + AP + 's lakes', 'the Ontario government website', 'a comment under a fishing video'],
    ['how to treat a bee sting', 'a children' + AP + 's hospital website', 'a post from a stranger on social media'], ['the history of a treaty', 'a book by historians that lists its sources', 'a meme about the treaty']];
  /* [purpose, a relevant fact, a true fact that is not relevant] */
  var RELEVANT = [['a report on how beavers build dams', 'Beavers pile sticks and pack them with mud.', 'Beavers appear on the Canadian nickel.'],
    ['a poster about staying safe on lake ice', 'Ice should be at least 10 cm thick to walk on.', 'Some lakes have fish called pike.'],
    ['a speech asking for a town skate park', 'Teens now skate in the library parking lot.', 'The first skateboards were made in the 1950s.']];
  function supports(lv) {
    var s = R.pick(SUPPORT);
    return Q.one('Which detail <b>supports</b> the main idea?', s[1], [s[2]].concat(lv > 1 ? [R.pick(SUPPORT.filter(function (x) { return x !== s; }))[1]] : []), {
      fig: W.sent(s[0]), prompt: 'Does it prove or explain the main idea?', hint: 'A detail can be true and still not help.', explain: s[1], meta: { k: 'g6-supports', main: s[0] } });
  }
  function reliable(lv) {
    var s = R.pick(SOURCES);
    return Q.one('You need <b>' + s[0] + '</b>. Which source is more reliable?', s[1], [s[2]].concat(lv > 1 ? ['a video with a catchy song'] : []), {
      prompt: 'Who made it? Do they know the topic? Is it up to date?', hint: 'Experts, recent, with sources.', explain: '<b>' + s[1] + '</b>: experts who check their facts.', meta: { k: 'g6-reliable', need: s[0] } });
  }
  function relevant() {
    var r = R.pick(RELEVANT);
    return Q.one('You are writing <b>' + r[0] + '</b>. Which fact belongs?', r[1], [r[2]], { prompt: 'Does it help the purpose?', hint: 'Both facts may be true. Which one fits the purpose?',
      explain: r[1], meta: { k: 'g6-relevant', purpose: r[0] } });
  }
  function reliableTf() {
    var s = R.pick(SOURCES), good = R.int(0, 1) === 1;
    return { q: 'True or false? This is a reliable source for ' + s[0] + '.', fig: W.sent(good ? s[1] : s[2]), type: 'tf', answer: good, hint: 'Who made it, and do they know the topic?',
      explain: 'Reliable: <b>' + s[1] + '</b>.', meta: { k: 'g6-reliable-tf', src: good ? s[1] : s[2] } };
  }

  /* ---------- perspective, bias and positions ---------- */
  var V = T.trails.view;
  var POS = { topic: 'Every school event should be wheelchair accessible.', for: ['Every student should be able to join every event.', 'Ramps and lifts are worth the cost.'],
    against: ['Changing old buildings costs too much.', 'Only some events need to be accessible.'] };
  function whosePov(lv) {
    return Q.one('Whose <b>perspective</b> is this?', V.who, ['snowmobile riders', 'the town council'].slice(0, lv > 1 ? 2 : 1), { fig: T.show(T.trails), hint: 'Look at who posted it.',
      explain: 'It was posted by <b>' + V.who + '</b>.', meta: { k: 'g6-whose-pov' } });
  }
  function biasClue() {
    var b = R.pick(V.bias);
    return Q.one('Which words are a clue of <b>bias</b> (one-sided thinking)?', b, ['the Pine Ridge trails', 'this winter'], { fig: T.show(T.trails),
      prompt: 'Look for loaded words, or claims about everyone.', hint: 'Did they really ask everyone? Are the words fair?', explain: '<mark class="hl">' + b + '</mark>', meta: { k: 'g6-bias-clue' } });
  }
  function missing() {
    return Q.one('Whose voice is <b>missing</b> from this text?', V.missing, ['the ski club', 'skiers'], { fig: T.show(T.trails), hint: 'Who else uses the trails?',
      explain: 'We do not hear from <b>' + V.missing + '</b>.', meta: { k: 'g6-missing' } });
  }
  function avoidBias() {
    return Q.one('How could the writer make this text <b>less biased</b>?', 'Include what snowmobile riders think, with facts.', ['Use more exclamation marks.', 'Only ask more skiers.'], {
      fig: T.show(T.trails), hint: 'Fair writing gives more than one side.', explain: 'Include other perspectives, and use facts instead of loaded words.', meta: { k: 'g6-avoid-bias' } });
  }
  function position() {
    var forIt = R.int(0, 1) === 1, s = R.pick(forIt ? POS.for : POS.against);
    return { q: 'Is this person <b>for</b> or <b>against</b> the idea?', fig: W.sent(POS.topic) + W.means('talk', s), type: 'tap', tiles: ['for', 'against'], answer: forIt ? 0 : 1,
      hint: 'Do they want the change?', explain: 'They are <b>' + (forIt ? 'for' : 'against') + '</b> it.', meta: { k: 'g6-position', s: s } };
  }

  Atlas.register('critical', {
    lessons: [{
      id: 'between', title: 'Reading between the lines', sub: 'What the text says, and what it shows.',
      concepts: [
        { slug: 'stated', title: 'Stated or worked out?', exp: ['C3.2'], skill: 'infer',
          model: [
            step(W.sent('The tryouts were for <mark class="hl">basketball</mark>.'), 'The words are there: <b>explicit</b>.'),
            step(W.sent('I almost got <mark class="hl">cold feet</mark>.'), 'A clue.'),
            step(W.tile('The narrator was nervous.'), 'Worked out from the clue: an <b>inference</b>.')
          ],
          guided: [stated, stated],
          check: [stated, pickInferred],
          coach: '<p>Two questions after any chapter: "What did it say?" and "What did it show without saying?"</p>',
          mistake: '<p>Treating an inference as a fact. Ask: "Which clue tells you that?"</p>' },
        { slug: 'theme', title: 'The big message', exp: ['C3.2'], skill: 'infer',
          model: [
            step(T.show(T.tryouts), 'Look at the whole story.'),
            step(W.sent('Basketball is the best sport.'), 'Not what the story is saying.'),
            step(W.sent('Being brave means trying even when you are nervous.'), 'A lesson about life.')
          ],
          guided: [function () { return theme(1); }, function () { return theme(1); }],
          check: [function () { return theme(2); }, function () { return theme(2); }],
          coach: '<p>After a film or book, ask: "What did the creator want us to learn about people or life?"</p>',
          mistake: '<p>Naming the topic (basketball) instead of the message (bravery).</p>' }
      ]
    }, {
      id: 'evaluate', title: 'Judging information', sub: 'Is it good enough, and does it fit the purpose?',
      concepts: [
        { slug: 'support', title: 'Details that support the main idea', exp: ['C3.3'], skill: 'evaluate',
          model: [
            step(W.sent('Beavers change the land around them.')),
            step(W.sent('Their dams flood streams and make new ponds.'), 'Supports it.'),
            step(W.sent('Beavers have orange front teeth.'), 'True, but it does not help.')
          ],
          guided: [function () { return supports(1); }, relevant],
          check: [function () { return supports(2); }, relevant],
          coach: '<p>When the child writes a paragraph, ask of each sentence: "Does this help prove your main idea?"</p>',
          mistake: '<p>Keeping a detail because it is interesting, even though it does not fit.</p>' },
        { slug: 'reliable', title: 'Reliable sources', exp: ['C3.3'], skill: 'evaluate',
          model: [
            step(W.means('read', 'a recent study by Arctic scientists'), 'Experts. Up to date.'),
            step(W.means('screen', 'an old blog post by a tourist'), 'Not an expert. Out of date.')
          ],
          guided: [function () { return reliable(1); }, reliableTf],
          check: [function () { return reliable(2); }, reliableTf],
          coach: '<p>Check three things together: Who made it? When? Do they show where their facts come from?</p>',
          mistake: '<p>Trusting a source because it looks professional or has many likes.</p>' }
      ]
    }, {
      id: 'perspective', title: 'Perspective and bias', sub: 'Whose voice is heard, and whose is missing.',
      concepts: [
        { slug: 'perspective', title: 'Whose perspective?', exp: ['C3.5'], skill: 'perspective',
          model: [
            step(T.show(T.trails), 'Read it.'),
            step(W.sent('<mark class="hl">Posted by the Pine Ridge Ski Club</mark>'), 'Skiers wrote it.'),
            step(W.sent('<mark class="hl">Every skier we asked</mark> agrees...'), 'Only one side was asked: a sign of <b>bias</b>.')
          ],
          guided: [function () { return whosePov(1); }, biasClue],
          check: [function () { return whosePov(2); }, biasClue],
          coach: '<p>For any opinion piece, ask: "Who wrote it, and what do they gain if we agree?"</p>',
          mistake: '<p>Thinking biased means lying. Biased texts can contain true facts but leave out the other side.</p>' },
        { slug: 'missing', title: 'Missing voices', exp: ['C3.5'], skill: 'perspective',
          model: [
            step(W.means('people', 'skiers'), 'Heard.'),
            step(W.means('people', 'snowmobile riders'), 'Not heard.'),
            step(W.means('think', 'Ask both sides. Use facts.'), 'Less bias.')
          ],
          guided: [missing, avoidBias],
          check: [missing, avoidBias],
          coach: '<p>Rewrite one sentence of the ski club post fairly, together.</p>',
          mistake: '<p>Adding more voices from the same side.</p>' },
        { slug: 'positions', title: 'Different positions on an issue', exp: ['C3.6'], skill: 'perspective',
          model: [
            step(W.sent('Every school event should be wheelchair accessible.'), 'An issue about inclusion.'),
            step(W.means('talk', 'Every student should be able to join every event.'), '<b>For</b>.'),
            step(W.means('talk', 'Changing old buildings costs too much.'), '<b>Against</b>.')
          ],
          guided: [position, function () { return theme(1); }],
          check: [position, position],
          coach: '<p>Talk about how the ramp story shows an issue of accessibility, and how people might see it differently.</p>',
          mistake: '<p>Hearing only the side you agree with. Name each position fairly first.</p>' }
      ]
    }],
    practice: [
      { id: 'infer', name: 'Inferences and messages', code: 'C3.2', gen: stated },
      { id: 'evaluate', name: 'Judging information', code: 'C3.3', gen: supports },
      { id: 'perspective', name: 'Perspective, bias and positions', code: 'C3.5, C3.6', gen: biasClue }
    ],
    tasks: [
      { id: 'culture', title: 'Cultural elements in a text', code: 'C3.4', pic: W.icon('people'), say: 'Find a value, celebration, building, artwork or dance in a book. What does it mean?', write: true,
        run: ['Choose a book or film set in a culture the child knows, and one set in a culture new to them.', 'Find cultural elements: values, celebrations or ceremonies, buildings, art, dance.', 'Ask: "What does it mean to the people in the story? How does it connect to your own life?" Share ideas with someone else.'],
        rubric: ['Does not name an element yet.', 'Names an element with help.', 'Explains what an element means and connects it to their life.', 'Explains several elements thoughtfully and shares their interpretation respectfully.'] },
      { id: 'indigenous-contexts', title: 'History and today in First Nations, Métis and Inuit texts', code: 'C3.7', pic: W.icon('read'), say: 'Read a text by a First Nations, Métis or Inuit creator. How does history shape it?',
        run: ['Choose a text by a First Nations, Métis or Inuit creator that touches on a historical period or event, such as residential schools, treaties or relocation. Check that it suits your child.',
          'Talk about how that history shaped the text, and how it connects to people’s lives today.'],
        rubric: ['Recalls little of it.', 'Names the historical context with help.', 'Explains how history influenced the text.', 'Explains the influence and connects it thoughtfully to lived experiences today.'],
        coach: '<p>Approach this with care. Use resources written by Indigenous creators and organizations, and let the child ask questions freely.</p>' },
      { id: 'thinking-skills', title: 'Which thinking skills helped?', code: 'C3.8', pic: W.icon('think'), say: 'Which thinking skills helped you most: inferring, checking sources, or spotting bias?',
        run: ['After the lessons in this chapter, ask which skill helped most with each text: inferring, judging sources, or spotting bias.', 'Ask the child to explain why it worked, with an example.'],
        rubric: ['Cannot name a skill yet.', 'Names a skill with help.', 'Compares two skills and says which helped.', 'Explains clearly why a skill was effective, with examples.'] }
    ]
  });

  Q.shapes('critical', {
    infer: [[1, 'theme', theme], [1, 'clue', inferClue], [2, 'pick', pickInferred]],
    evaluate: [[1, 'reliable', reliable], [1, 'relevant', relevant], [2, 'true-false', reliableTf]],
    perspective: [[1, 'whose', whosePov], [1, 'missing', missing], [1, 'avoid', avoidBias], [1, 'position', position]]
  });
})();
