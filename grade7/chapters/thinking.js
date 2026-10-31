/* Grade 7: thinking critically about texts.
   Ontario 2023 Language, Grade 7, C3 Critical Thinking in Literacy:
   C3.1 literary devices: foreshadowing, allegory and symbolism      C3.2 local and global inferences from explicit and implicit evidence
   C3.3 evaluating, synthesizing and sequencing information, and drawing conclusions                 C3.5 explicit and implicit perspectives, evidence of bias, and how to avoid it
   C3.6 how topics such as diversity, inclusion and accessibility are addressed, the messages, and the positions taken
   With a grown-up: C3.4 cultural elements, C3.7 First Nations, Métis and Inuit texts in their historical and social contexts, C3.8 which critical thinking skills helped.
   Passages are in ../texts.js; other examples are written for this site. Answer checks: tests/verify/grade7-thinking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;

  /* ---------- literary devices ---------- */
  function foreshadow() {
    var t = T.tryout, f = t.foreshadow;
    return Q.one('Which detail <b>foreshadows</b> the stumble?', f.clue, f.wrong, { fig: T.show(t), prompt: 'Which early detail hints at trouble later?',
      hint: 'Foreshadowing is an early hint about what will happen.', explain: '<mark class="hl">' + f.clue + '</mark> hints at the fall.', meta: { k: 'g7-foreshadow' } });
  }
  function symbol() {
    var t = T.compass, s = t.symbol;
    return Q.one('What does <b>' + s.thing + '</b> stand for in this story?', s.means, s.wrong, { fig: T.show(t), prompt: 'What does it help Arjun do? Who gave it to him?',
      hint: 'A symbol is an object that stands for a bigger idea.', explain: s.thing + ': ' + s.means + '.', meta: { k: 'g7-symbol' } });
  }
  function allegory() {
    var t = T.river;
    return Q.one('This story is an <b>allegory</b>. What bigger idea does it stand for?', t.allegory[0], t.allegory.slice(1), { fig: T.show(t), prompt: 'What could the two villages and the river stand for in real life?',
      hint: 'In an allegory, the whole story stands for a lesson about real life.', explain: t.allegory[0], meta: { k: 'g7-allegory' } });
  }
  var DEVICES = [['foreshadowing', 'an early hint about what will happen later'], ['symbolism', 'an object or image that stands for a bigger idea'], ['allegory', 'a whole story that stands for a lesson or idea about real life']];
  var DEVEX = [['A character notices dark clouds on the morning of the big race.', 'foreshadowing'], ['A wilting plant on the windowsill comes back to life as a family heals.', 'symbolism'],
    ['A town bans all songbirds, and slowly its people forget how to laugh.', 'allegory'], ['A broken watch appears whenever a character runs out of time.', 'symbolism'],
    ['Early in the story, a character says, “Nothing could ever go wrong on this trip.”', 'foreshadowing'], ['Two villages fight over one river until both lose everything.', 'allegory']];
  function deviceName(lv) {
    var d = R.pick(DEVEX);
    return Q.tiles('Which literary device is this?', d[1], DEVICES.map(function (x) { return x[0]; }).filter(function (x) { return x !== d[1]; }).slice(0, lv > 1 ? 2 : 1), { fig: W.sent(d[0]),
      hint: 'A hint? An object that stands for an idea? A whole story with a hidden lesson?', explain: '<b>' + d[1] + '</b>: ' + DEVICES.filter(function (x) { return x[0] === d[1]; })[0][1] + '.', meta: { k: 'g7-device-name', s: d[0] } });
  }
  function deviceMatch() {
    return { q: 'Match each device to what it is.', type: 'match', pairs: DEVICES.map(function (d) { return [d[0], d[1]]; }), hint: 'Think of an example of each.', explain: 'Writers use devices to build meaning.', meta: { k: 'g7-device-match' } };
  }

  /* ---------- inferences ---------- */
  function local() {
    var t = R.pick(T.list('infer')), f = R.pick(t.infer);
    return Q.one(f[0], f[1], [f[2]], { fig: T.show(t).replace(f[3], '<mark class="hl">' + f[3] + '</mark>'),
      prompt: 'The text does not say it. What do the marked words suggest?', hint: 'Use the clue words and what you know about people.', explain: '<mark class="hl">' + f[3] + '</mark> suggests <b>' + f[1] + '</b>.',
      meta: { k: 'g7-local', t: t.title, q: f[0] } });
  }
  function global(lv) {
    var t = R.pick(T.list('theme'));
    return Q.one('What is the story <b>really</b> about? Pick the theme.', t.theme[0], t.theme.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Think about the whole story, especially the ending.',
      hint: 'A theme is a message about life, not a detail from the story.', explain: t.theme[0], meta: { k: 'g7-global', t: t.title } });
  }
  function evidence() {
    var t = R.pick(T.list('infer')), f = R.pick(t.infer), lines = t.lines.filter(function (l) { return l.charAt(0) !== '#'; }), right = lines.filter(function (l) { return l.indexOf(f[3]) >= 0; })[0];
    return Q.one('<b>' + f[0] + '</b> You infer: <b>' + f[1] + '</b>. Which sentence is your evidence?', right, R.some(lines.filter(function (l) { return l !== right; }), 2), {
      fig: T.show(t), hint: 'Find the words that suggest it.', explain: W.sent(right), meta: { k: 'g7-evidence-line', t: t.title, q: f[0] } });
  }
  /* synthesizing two sources: [source A, source B, the conclusion both support, conclusions they do not] */
  var SYN = [['A school survey: 70% of students say the halls are too noisy.', 'A study: short quiet breaks help students focus.', 'A quiet space could help many students at this school focus.', ['Every student wants more noise.', 'The study was done at this school.']],
    ['Ice roads now stay open for about six weeks, down from ten.', 'Flying supplies in costs several times more than trucking them.', 'Shorter ice road seasons are raising the cost of supplies.', ['Ice roads are getting longer.', 'Trucks are more expensive than planes.']],
    ['Monarch butterflies lay their eggs only on milkweed.', 'Milkweed is disappearing from many fields in Ontario.', 'Losing milkweed could mean fewer monarchs.', ['Monarchs eat only flowers in fields.', 'Milkweed grows only in cities.']]];
  function synthesize(lv) {
    var s = R.pick(SYN);
    return Q.one('Put the two sources together. Which conclusion do <b>both</b> support?', s[2], s[3].slice(0, lv > 1 ? 2 : 1), { fig: W.passage('Source A', [s[0]]) + W.passage('Source B', [s[1]]),
      prompt: 'What do you learn from A? From B? What do they add up to?', hint: 'A good synthesis uses both sources and goes no further than they allow.', explain: s[2], meta: { k: 'g7-synthesize', a: s[0] } });
  }
  /* relevant information for a research question */
  var RELEVANT = { q: 'Why are ice roads closing earlier?', yes: ['Average winter temperatures in the north have risen.', 'Thinner ice cannot hold heavy trucks.', 'The ice now melts weeks sooner in spring.'],
    no: ['Some trucks are painted red.', 'Ice fishing is a popular winter sport.', 'Planes can fly at night.'] };
  function relevant() {
    return Q.all('Your question: <b>' + RELEVANT.q + '</b> Pick every <b>relevant</b> fact.', R.some(RELEVANT.yes, 2), R.some(RELEVANT.no, 2), {
      hint: 'Does it help answer the question?', explain: 'Relevant facts help answer the question directly.', meta: { k: 'g7-relevant-info' } });
  }

  /* ---------- perspectives and bias ---------- */
  function position() {
    var t = T.quietRoom, v = t.view;
    return Q.one('What is the writer' + '’' + 's <b>position</b>?', v.position, v.wrong, { fig: T.show(t), hint: 'What does the writer want to happen?', explain: v.position, meta: { k: 'g7-position' } });
  }
  function otherSide() {
    var t = T.quietRoom, v = t.view;
    return Q.one('Which <b>other position</b> does the writer mention and answer?', v.other, v.wrong, { fig: T.show(t), hint: 'Look for "Some people worry...".',
      explain: 'The writer answers it: a sign-in sheet would solve that.', meta: { k: 'g7-other-side' } });
  }
  function message() {
    var t = T.quietRoom;
    return Q.one('How does this text address <b>' + t.topic + '</b>?', 'It shows how one small change can help students who struggle with noise feel they belong.',
      ['It says noise is good for everyone.', 'It argues that students should stay home.'], { fig: T.show(t), hint: 'Look at the last sentence.', explain: '"It tells every student that they belong here."', meta: { k: 'g7-message' } });
  }
  /* [loaded sentence, the loaded words, a neutral version] */
  var BIAS = [['The greedy developers want to destroy our beautiful park.', 'greedy, destroy', 'A company plans to build homes on part of the park.'],
    ['Lazy teenagers waste hours on their phones.', 'Lazy, waste', 'Many teenagers spend several hours a day on their phones.'],
    ['The brilliant new mayor finally fixed the city' + '’' + 's terrible roads.', 'brilliant, finally, terrible', 'The new mayor repaired several city roads this year.'],
    ['Only a fool would vote against the new arena.', 'Only a fool', 'Some voters support the new arena, and some oppose it.']];
  function neutral(lv) {
    var b = R.pick(BIAS), other = R.pick(BIAS.filter(function (x) { return x !== b; }));
    return Q.one('Which sentence is the most <b>neutral</b> (least biased)?', b[2], [b[0]].concat(lv > 1 ? [other[0]] : []), { prompt: 'Look for words that show strong feelings or insults.',
      hint: 'Neutral writing reports facts without loaded words.', explain: W.sent(b[2]), meta: { k: 'g7-neutral', n: b[2] } });
  }
  function loaded() {
    var b = R.pick(BIAS);
    return Q.one('Which words show <b>bias</b> in this sentence?', b[1], R.some(BIAS.filter(function (x) { return x !== b; }), 2).map(function (x) { return x[1]; }), { fig: W.sent(b[0]),
      hint: 'Which words judge instead of describe?', explain: '<b>' + b[1] + '</b> are loaded words.', meta: { k: 'g7-loaded', s: b[0] } });
  }
  var AVOID = ['Present more than one side.', 'Use neutral words.', 'Include the voices of people affected.'];
  var NOTAVOID = ['Use only sources that agree with you.', 'Leave out facts that do not fit.', 'Use strong insults to make the point.'];
  function avoidBias() {
    return Q.all('Pick every way to <b>avoid</b> bias in a text.', R.some(AVOID, 2), R.some(NOTAVOID, 2), { hint: 'Fair writing lets readers decide.', explain: 'More sides, neutral words, affected voices.', meta: { k: 'g7-avoid-bias' } });
  }

  var tryout = T.tryout, compass = T.compass;
  Atlas.register('thinking', {
    lessons: [{
      id: 'devices', title: 'Literary devices', sub: 'Foreshadowing, symbolism and allegory.',
      concepts: [
        { slug: 'foreshadow', title: 'Foreshadowing hints at what is coming', exp: ['C3.1'], skill: 'devices',
          model: [
            step(W.sent('<mark class="hl">the lace kept slipping loose</mark>'), 'Early in the story.'),
            step(W.sent('the loose lace whipped against my ankle. I stumbled.'), 'Later: the hint comes true.'),
            step(W.means('think', 'tension'), 'The reader worries before it happens.')
          ],
          guided: [foreshadow, function () { return deviceName(1); }],
          check: [foreshadow, function () { return deviceName(2); }],
          coach: '<p>When reading a novel, keep a "hint list". Check it off when a hint comes true.</p>',
          mistake: '<p>Calling any early detail foreshadowing. It must point to something that really happens later.</p>' },
        { slug: 'symbol', title: 'A symbol stands for a bigger idea', exp: ['C3.1'], skill: 'devices',
          model: [
            step(W.sent('He gave Arjun his old brass compass.'), 'An object.'),
            step(W.sent('the needle still swung north'), 'It shows the way.'),
            step(W.means('people', 'his grandfather' + '’' + 's support'), 'What it stands for.')
          ],
          guided: [symbol, function () { return deviceName(1); }],
          check: [symbol, deviceMatch],
          coach: '<p>Ask: "Why did the writer keep mentioning this object? What changes about it, or about how the character uses it?"</p>',
          mistake: '<p>Treating every object as a symbol. Look for one that is repeated and tied to the character' + '’' + 's feelings.</p>' },
        { slug: 'allegory', title: 'An allegory teaches through a whole story', exp: ['C3.1'], skill: 'devices',
          model: [
            step(T.show(T.river, 2), 'Two villages, one river.'),
            step(W.means('people', 'villages = people, countries'), 'The parts stand for real things.'),
            step(W.sent('Sharing resources helps everyone.'), 'The lesson.')
          ],
          guided: [allegory, deviceMatch],
          check: [allegory, function () { return deviceName(2); }],
          coach: '<p>Talk about real situations the story could stand for: sharing water between provinces, or sharing a room between siblings.</p>',
          mistake: '<p>Reading an allegory only on the surface ("it is about a wall"). Ask what the whole story is saying.</p>' }
      ]
    }, {
      id: 'inference', title: 'Inferences and synthesis', sub: 'Reading between the lines, and putting sources together.',
      concepts: [
        { slug: 'local', title: 'Infer from a small clue', exp: ['C3.2'], skill: 'inference',
          model: [
            step(W.sent('I stumbled, caught myself and kept running, <mark class="hl">my face burning</mark>.'), 'A clue.'),
            step(W.means('think', 'A burning face means embarrassment.'), 'Clue + what I know.')
          ],
          guided: [function () { return local(1); }, evidence],
          check: [function () { return local(2); }, evidence],
          coach: '<p>Use the frame: "The text says... I know... So I think..."</p>',
          mistake: '<p>An inference with no clue behind it. Ask: "Which words made you think that?"</p>' },
        { slug: 'global', title: 'Infer the message of the whole text', exp: ['C3.2'], skill: 'inference',
          model: [
            step(T.show(tryout), 'The whole story.'),
            step(W.sent('Anyone can run fast. I watch who gets back up.'), 'The ending matters.'),
            step(W.sent('Getting back up after a mistake matters more than being perfect.'), 'A message about life.')
          ],
          guided: [function () { return global(1); }, function () { return global(1); }],
          check: [function () { return global(2); }, function () { return global(2); }],
          coach: '<p>Ask: "What might the writer want us to learn about life?" Then: "Where in the story do you see that?"</p>',
          mistake: '<p>Giving the plot instead of the theme. A theme is true outside the story too.</p>' },
        { slug: 'synthesize', title: 'Put sources together to conclude', exp: ['C3.3'], skill: 'inference',
          model: [
            step(W.passage('Source A', ['Monarch butterflies lay their eggs only on milkweed.'])),
            step(W.passage('Source B', ['Milkweed is disappearing from many fields in Ontario.'])),
            step(W.sent('Losing milkweed could mean fewer monarchs.'), 'Neither source says it alone.')
          ],
          guided: [function () { return synthesize(1); }, relevant],
          check: [function () { return synthesize(2); }, relevant],
          coach: '<p>When researching, ask the child to state what each source adds, then what they mean together.</p>',
          mistake: '<p>Summarizing each source separately and calling it a synthesis. Synthesis creates a new idea from both.</p>' }
      ]
    }, {
      id: 'perspectives', title: 'Perspectives and bias', sub: 'Whose view, and is it fair?',
      concepts: [
        { slug: 'position', title: 'Find the position and the other side', exp: ['C3.6'], skill: 'perspectives',
          model: [
            step(T.show(T.quietRoom, 3), 'Leila' + '’' + 's view: the school needs a quiet room.'),
            step(W.sent('Some people worry that students will skip class there.'), 'Another position.'),
            step(W.sent('it tells every student that they belong here'), 'The message: inclusion.')
          ],
          guided: [position, otherSide],
          check: [message, otherSide],
          coach: '<p>For any opinion piece, list: the writer' + '’' + 's position, the other position, and who is affected.</p>',
          mistake: '<p>Agreeing or disagreeing before understanding both positions.</p>' },
        { slug: 'bias', title: 'Loaded words can reveal bias', exp: ['C3.5'], skill: 'perspectives',
          model: [
            step(W.sent('The <mark class="hl">greedy</mark> developers want to <mark class="hl">destroy</mark> our park.'), 'Loaded words judge.'),
            step(W.sent('A company plans to build homes on part of the park.'), 'Neutral: the facts.'),
            step(W.means('people', 'Who is not heard?'), 'Missing voices are a clue too.')
          ],
          guided: [function () { return neutral(1); }, loaded],
          check: [function () { return neutral(2); }, avoidBias],
          coach: '<p>Find a news story and a comment about the same event. Highlight the loaded words in each.</p>',
          mistake: '<p>Thinking only opinions are biased. A news report can be biased by what it leaves out.</p>' }
      ]
    }],
    practice: [
      { id: 'devices', name: 'Literary devices', code: 'C3.1', gen: deviceName },
      { id: 'inference', name: 'Inferences and synthesis', code: 'C3.2, C3.3', gen: local },
      { id: 'perspectives', name: 'Perspectives and bias', code: 'C3.5, C3.6', gen: neutral }
    ],
    tasks: [
      { id: 'cultural', title: 'Cultural elements in a text', code: 'C3.4', pic: W.icon('people'), say: 'Find a text that shows a celebration, ritual, art form or building from a culture. What does it mean?', write: true,
        run: ['Choose a text (a story, a film, a photo essay) that shows a cultural element: a ceremony, a dance, a meal, a building, an art form.', 'Research what the element means to the people it belongs to, using sources from that community.',
          'The child connects it to their own life and culture, and shares their interpretation with you.'],
        rubric: ['Names the element only.', 'Describes it, but not its meaning.', 'Explains its meaning and connects it to their own life.', 'Explains its meaning with sources from the community, and shares a thoughtful, respectful interpretation.'] },
      { id: 'context', title: 'History behind a First Nations, Métis or Inuit text', code: 'C3.7', pic: W.icon('read'), say: 'Read a text by a First Nations, Métis or Inuit creator. What events or times shaped it?', write: true,
        run: ['Choose a text by a First Nations, Métis or Inuit creator that responds to history (for example residential schools, treaties, or relocation), in a form suitable for Grade 7.',
          'Together, learn about the historical period or events from reliable sources, including from the creator' + '’' + 's community.', 'Ask: "How did these events shape the text? How do they connect to life today?"'],
        rubric: ['Retells part of the text only.', 'Names a historical event with help.', 'Explains how history shaped the text.', 'Explains how history and current lived experience connect in the text, with care and evidence.'],
        coach: '<p>Some of this history is painful. Preview the text yourself first, and let the child set the pace. Choose works recommended for this age by Indigenous educators or librarians.</p>' },
      { id: 'thinking-skills', title: 'Which thinking skill helped most?', code: 'C3.8', pic: W.icon('star'), say: 'Look back at two texts you analyzed. Which thinking skill helped most, and why?', write: true,
        run: ['Name the skills used this unit: inferring, synthesizing, spotting bias, finding the theme, comparing perspectives.', 'The child compares two of them and explains which helped them understand most, and why.'],
        rubric: ['Cannot name a skill.', 'Names a skill without explaining.', 'Compares two skills and explains which helped.', 'Explains clearly why one skill was most effective, with examples from the texts.'] }
    ]
  });

  Q.shapes('thinking', {
    devices: [[1, 'foreshadow', foreshadow], [1, 'symbol', symbol], [1, 'allegory', allegory], [2, 'match', deviceMatch]],
    inference: [[1, 'global', global], [1, 'evidence', evidence], [1, 'synthesize', synthesize], [2, 'relevant', relevant]],
    perspectives: [[1, 'loaded', loaded], [1, 'position', position], [1, 'other-side', otherSide], [2, 'avoid-bias', avoidBias], [2, 'message', message]]
  });
})();
