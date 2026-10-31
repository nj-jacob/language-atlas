/* Grade 8: critical reading.
   Ontario 2023 Language, Grade 8, Strand C (Comprehension), C3 Critical Thinking in Literacy:
   C3.1 literary devices, including irony, satire and allusion          C3.2 local and global inferences, with explicit and implicit evidence
   C3.3 evaluate, synthesize and sequence information, and draw conclusions
   C3.4 cultural elements in texts: norms, values, social hierarchy, past times, language and taboos
   C3.5 explicit and implicit perspectives, evidence of bias, and ways to avoid it
   C3.6 how topics such as diversity, inclusion and accessibility are addressed, and the positions presented
   With a grown-up: C3.4 cultural elements in a longer text, C3.6 a written response, C3.7 comparing texts by First Nations, Metis and
   Inuit creators, C3.8 critical thinking goals.
   Passages are in ../texts.js; everything else is written here for this site. Answer checks: tests/verify/grade8-thinking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts, AP = '’', OQ = '“', CQ = '”';

  /* [ironic, the same moment without irony] */
  var IRONY = [['The fire station burned down.', 'The fire station was repainted.'], [OQ + 'Lovely weather,' + CQ + ' Kai said, as hail smashed the windshield.', OQ + 'Lovely weather,' + CQ + ' Kai said, as the sun warmed the dock.'],
    ['The spelling bee champion misspelled her own name on the trophy.', 'The spelling bee champion signed her name on the trophy.'], ['The sign for the quiet zone flashed and beeped all day.', 'The sign for the quiet zone was small and plain.'],
    ['The lifeguard had to be rescued from the pool.', 'The lifeguard rescued a swimmer from the pool.']];
  /* [sentence with an allusion, what it refers to, the same idea without one] */
  var ALLUSION = [['Opening that box of old letters was like opening Pandora' + AP + 's box.', 'a Greek myth about releasing troubles into the world', 'Opening that box of old letters caused a lot of trouble.'],
    ['Against the senior team, our small squad felt like David facing Goliath.', 'a story of a small fighter defeating a giant', 'Against the senior team, our small squad felt outmatched.'],
    ['He has the Midas touch: every business he starts makes money.', 'a myth about a king who turned everything he touched to gold', 'Every business he starts makes money.'],
    ['Math was my Achilles' + AP + ' heel all year.', 'a Greek hero with one weak spot', 'Math was my weakest subject all year.'],
    ['After the long holiday, I felt like Rip Van Winkle.', 'a story about a man who sleeps for twenty years', 'After the long holiday, I felt very sleepy.']];
  /* [conclusion the text supports, conclusions that go too far] */
  var CONCLUDE = [[T.roads, 'Communities that rely on ice roads may need other ways to get supplies.', ['Ice roads will never be used again.', 'Northern Ontario no longer has winter.']],
    [T.rooftop, 'Green spaces can help keep buildings cooler.', ['Every roof in Canada should be a garden.', 'Asphalt should be banned.']],
    [T.library, 'Closing the library early would affect many students.', ['The council does not care about students.', 'Libraries are always better than schools.']]];
  /* [an excerpt, the cultural element it shows] */
  var CULTURE = [['In Dev' + AP + 's home, everyone takes off their shoes at the door without being asked.', 'a norm (an expected way to behave)'],
    ['For Rosa' + AP + 's grandmother, sharing a meal with neighbours mattered more than any gift.', 'a value (what people believe is important)'],
    ['In the old kingdom, only nobles sat at the high table; servants ate in the kitchen.', 'social hierarchy (who has more power or status)'],
    ['Before telephones reached the village, news arrived once a month by dog sled.', 'a past time (how life was in an earlier era)'],
    ['Lolo greeted us in Tagalog, then switched to English for my friends.', 'language (the words a community uses)'],
    ['In the story, no one spoke the name of the mountain aloud; it was considered disrespectful.', 'a taboo (something that is not done or said)']];
  /* claims: [claim, is it biased] */
  var CLAIMS = [['Our survey of 200 students found that 70% walk to school.', false], ['Only lazy people take the bus.', true], ['Everyone who plays video games is antisocial.', true],
    ['The study measured the sleep of 50 teens over one month.', false], ['Old people cannot learn new technology.', true], ['The library recorded 12 000 evening visits last year.', false]];
  var DANCE = W.passage('Moving the Spring Dance', [
    'Amir: ' + OQ + 'The stage room has stairs only. In the gym, everyone can get in, including students who use wheelchairs.' + CQ,
    'Ms. Li: ' + OQ + 'The gym is bigger, but the sound echoes. Students who use hearing aids may struggle.' + CQ,
    'Tala: ' + OQ + 'Let' + AP + 's use the gym and rent sound panels, so the space works for everyone.' + CQ]);
  /* [question, right, wrong] */
  var POSITIONS = [['What is Amir' + AP + 's position?', 'The gym is better because everyone can get in.', ['The dance should be cancelled.', 'The stage room is better because it is quieter.']],
    ['What is Ms. Li' + AP + 's concern?', 'Echoes in the gym could leave out students who use hearing aids.', ['The gym is too small.', 'Students who use wheelchairs cannot get into the gym.']],
    ['Whose idea answers both concerns?', 'Tala' + AP + 's', ['Amir' + AP + 's', 'Ms. Li' + AP + 's']],
    ['What topic does everyone in the discussion address?', 'making the dance accessible to all students', ['the cost of tickets', 'what music to play']]];

  /* ---------- question makers: devices ---------- */
  function irony(lv) {
    var i = R.int(0, IRONY.length - 1), others = IRONY.filter(function (x, j) { return j !== i; });
    return Q.one('Which sentence uses <b>irony</b>?', IRONY[i][0], [IRONY[i][1]].concat(R.some(others, lv > 1 ? 2 : 1).map(function (x) { return x[1]; })), {
      prompt: 'Which one turns out the opposite of what you would expect?', hint: 'Irony: the opposite of what is said or expected.', explain: W.sent(IRONY[i][0]) + ' is the opposite of what you would expect.', meta: { k: 'g8-irony' } });
  }
  function ironyCaptain() {
    return Q.one('Why is <b>' + OQ + 'I can' + AP + 't imagine why.' + CQ + '</b> ironic?', 'The reader can easily see why, but the narrator cannot.', ['The narrator really does not know the teammates.', 'It is a joke the teammates told.'], {
      fig: T.show(T.captain), hint: 'Do you know why the teammates were worried?', explain: 'The reader knows more than the narrator. This is called dramatic irony.', meta: { k: 'g8-irony-captain' } });
  }
  function satire() {
    return Q.one('What is this satire <b>really</b> making fun of?', T.spoon.target, ['people who cannot afford spoons', 'soup that is too hot'], { fig: T.show(T.spoon),
      prompt: 'Satire exaggerates something real to make a point.', hint: 'What real kind of product does it copy?', explain: 'It mocks ' + T.spoon.target + '.', meta: { k: 'g8-satire' } });
  }
  function allusion(lv) {
    var a = R.pick(ALLUSION);
    return Q.one('What does the <b>allusion</b> refer to?', a[1], R.some(ALLUSION.filter(function (x) { return x !== a; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), { fig: W.sent(a[0]),
      hint: 'An allusion is a short reference to a well-known story, myth or event.', explain: a[1] + '.', meta: { k: 'g8-allusion', s: a[0] } });
  }
  function whichAllusion() {
    var a = R.pick(ALLUSION), b = R.pick(ALLUSION.filter(function (x) { return x !== a; }));
    return Q.one('Which sentence contains an <b>allusion</b>?', a[0], [a[2], b[2]], { hint: 'Look for a name from a famous story or myth.', explain: W.sent(a[0]), meta: { k: 'g8-which-allusion' } });
  }
  function matchDevice() {
    var a = R.pick(ALLUSION), i = R.pick(IRONY);
    return { q: 'Match each example to its device.', type: 'match', pairs: [[a[0], 'allusion'], [i[0], 'irony'], ['A spoon that sends a weekly chewing report.', 'satire']],
      hint: 'A famous reference, the opposite of what is expected, or exaggeration that mocks.', explain: 'Writers choose devices to suit their purpose and audience.', meta: { k: 'g8-match-device' } };
  }

  /* ---------- inference and conclusions ---------- */
  function infer(lv) {
    var t = R.pick(T.list('infer')), f = R.pick(t.infer);
    return Q.one(f[0], f[1], [f[2]].concat(lv > 1 ? t.infer.filter(function (x) { return x !== f; }).map(function (x) { return x[1]; }) : []), { fig: T.show(t),
      prompt: 'The text does not say it. Look for a clue.', hint: 'Actions and details hint at what is not said.', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g8-infer', t: t.title, q: f[0] } });
  }
  function evidence() {
    var t = R.pick(T.list('infer')), f = R.pick(t.infer), lines = body(t), right = lines.filter(function (l) { return l.indexOf(f[3]) >= 0; })[0];
    return Q.one('The answer is <b>' + f[1] + '</b> Which sentence is the best evidence? <b>' + f[0] + '</b>', right, R.some(lines.filter(function (l) { return l !== right; }), 2), { fig: T.show(t),
      hint: 'Which sentence would you point to if someone asked "How do you know?"', explain: W.sent(right), meta: { k: 'g8-evidence', t: t.title, q: f[0] } });
  }
  function body(t) { return t.lines.filter(function (l) { return l.charAt(0) !== '#'; }); }
  function conclude(lv) {
    var c = R.pick(CONCLUDE);
    return Q.one('Which conclusion does the text <b>support</b>?', c[1], c[2].slice(0, lv > 1 ? 2 : 1), { fig: T.show(c[0]), prompt: 'Which one goes only as far as the evidence?',
      hint: 'Watch for words like never, always and every: they often go further than the text.', explain: c[1], meta: { k: 'g8-conclude', t: c[0].title } });
  }
  function sequence() {
    var ev = ['ran down the hill', 'ferry horn sounded', 'ramp was already rising', 'ramp slowly lowered', 'stepped aboard'];
    return { q: 'Put these events in order.', fig: T.show(T.ferry), type: 'order', items: ev.map(function (e) { return OQ + e + CQ; }), first: 'First', last: 'Last', hint: 'Find each one in the text.', explain: 'They come in this order in the text.', meta: { k: 'g8-sequence' } };
  }

  /* ---------- perspectives ---------- */
  function culture(lv) {
    var c = R.pick(CULTURE);
    return Q.one('Which cultural element does this show?', c[1], R.some(CULTURE.filter(function (x) { return x !== c; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), { fig: W.sent(c[0]),
      hint: 'Behaviour, beliefs, status, an earlier era, words, or something forbidden?', explain: c[1] + '.', meta: { k: 'g8-culture-el', s: c[0] } });
  }
  function biasLine() {
    var v = T.library.view;
    return Q.one('Which sentence in the letter shows <b>bias</b>?', v.bias, [v.evidence, 'Sincerely, Mei Lin Chen, Grade 8 student'], { fig: T.show(T.library),
      hint: 'Bias: an unfair claim about a whole group, with no evidence.', explain: '<mark class="hl">' + v.bias + '</mark> is a stereotype, not evidence.', meta: { k: 'g8-bias-line' } });
  }
  function pickBias() {
    var b = CLAIMS.filter(function (c) { return c[1]; }), f = CLAIMS.filter(function (c) { return !c[1]; });
    return Q.all('Pick every claim that shows <b>bias</b>.', R.some(b, 2).map(function (c) { return c[0]; }), R.some(f, 2).map(function (c) { return c[0]; }), {
      hint: 'Look for unfair claims about a whole group, with no evidence.', explain: 'Claims with numbers and methods are evidence. Sweeping claims about groups show bias.', meta: { k: 'g8-pick-bias' } });
  }
  function fixBias() {
    return Q.one('How could Mei Lin make her letter <b>less biased</b>?', 'Replace the claim about teens with evidence, such as a survey of students.', ['Add more exclamation marks.', 'Remove the visit numbers.'], {
      fig: W.sent(T.library.view.bias), hint: 'Bias weakens an argument. What would make the claim fair?', explain: 'Use evidence, and acknowledge other views, such as ' + T.library.view.missing + '.', meta: { k: 'g8-fix-bias' } });
  }
  function missing() {
    return Q.one('Whose <b>perspective</b> is missing from the letter?', T.library.view.missing, ['students who use the library', 'the writer, Mei Lin Chen'], { fig: T.show(T.library),
      hint: 'Who made the decision, and why?', explain: 'The letter does not consider ' + T.library.view.missing + '.', meta: { k: 'g8-missing' } });
  }
  function position(lv) {
    var p = R.pick(lv > 1 ? POSITIONS : POSITIONS.slice(0, 2));
    return Q.one(p[0], p[1], p[2], { fig: DANCE, hint: 'Read each speaker' + AP + 's words closely.', explain: p[1], meta: { k: 'g8-position', q: p[0] } });
  }

  Atlas.register('thinking', {
    lessons: [{
      id: 'devices', title: 'Irony, satire and allusion', sub: 'Devices that say more than the words.',
      concepts: [
        { slug: 'irony', title: 'Irony: the opposite of what is expected', exp: ['C3.1'], skill: 'devices',
          model: [
            step(W.sent(IRONY[0][0]), 'A fire station, of all places.'),
            step(W.sent(IRONY[1][0]), 'He says the opposite of what he means.'),
            step(W.sent('I can' + AP + 't imagine why.'), 'We know why; the narrator does not.')
          ],
          guided: [function () { return irony(1); }, ironyCaptain],
          check: [function () { return irony(2); }, ironyCaptain],
          coach: '<p>Irony can be funny or sad. Ask: "What did you expect? What happened instead?"</p>',
          mistake: '<p>Calling any bad luck "ironic". Irony needs a twist against expectations.</p>' },
        { slug: 'satire', title: 'Satire exaggerates to criticize', exp: ['C3.1'], skill: 'devices',
          model: [
            step(T.show(T.spoon), 'It looks like an ad.'),
            step(W.sent('Battery life: almost one whole bowl of soup.'), 'Exaggerated on purpose.'),
            step(W.means('think', T.spoon.target), 'The real target.')
          ],
          guided: [satire, matchDevice],
          check: [satire, matchDevice],
          coach: '<p>Satire works only if the audience knows what is being mocked. Ask: "Who is this for, and what should they question afterward?"</p>',
          mistake: '<p>Taking satire at face value, as if the product were real.</p>' },
        { slug: 'allusion', title: 'An allusion borrows a famous story', exp: ['C3.1'], skill: 'devices',
          model: [
            step(W.sent(ALLUSION[1][0]), 'David and Goliath: a famous story.'),
            step(W.means('think', ALLUSION[1][1]), 'A few words bring the whole story.')
          ],
          guided: [function () { return allusion(1); }, whichAllusion],
          check: [function () { return allusion(2); }, whichAllusion],
          coach: '<p>When an allusion is unfamiliar, look it up. Many come from myths, religious texts, history and well-known books.</p>',
          mistake: '<p>Skipping over a name that seems out of place. It is often an allusion.</p>' }
      ]
    }, {
      id: 'inference', title: 'Inferences and conclusions', sub: 'Reading between the lines, with evidence.',
      concepts: [
        { slug: 'infer', title: 'Infer from clues, then prove it', exp: ['C3.2'], skill: 'inference',
          model: [
            step(T.show(T.captain), 'The narrator says: calm.'),
            step(W.sent('I <mark class="hl">kicked the water bottle</mark>…'), 'The actions say otherwise.'),
            step(W.means('think', 'Not calm at all.'), 'A global inference: about the whole text.')
          ],
          guided: [function () { return infer(1); }, evidence],
          check: [function () { return infer(2); }, evidence],
          coach: '<p>Use the frame: "I think… because the text says…" every time.</p>',
          mistake: '<p>Inferences with no evidence, or guesses that the text contradicts.</p>' },
        { slug: 'conclude', title: 'Conclusions go only as far as the evidence', exp: ['C3.3'], skill: 'inference',
          model: [
            step(T.show(T.roads), 'Warmer winters, shorter road season.'),
            step(W.sent(CONCLUDE[0][2][0]), 'Too far: "never" is not supported.'),
            step(W.sent(CONCLUDE[0][1]), 'Supported by the text.')
          ],
          guided: [function () { return conclude(1); }, sequence],
          check: [function () { return conclude(2); }, sequence],
          coach: '<p>Circle words like all, every, never and always in conclusions. Ask: "Does the text really prove that?"</p>',
          mistake: '<p>Jumping from one example to a rule about everything.</p>' }
      ]
    }, {
      id: 'perspective', title: 'Culture, bias and perspective', sub: 'Whose view, whose values, and what is fair.',
      concepts: [
        { slug: 'culture', title: 'Texts carry cultural elements', exp: ['C3.4'], skill: 'perspective',
          model: [
            step(W.sent(CULTURE[0][0]), 'A norm: how people are expected to behave.'),
            step(W.sent(CULTURE[1][0]), 'A value: what matters most.'),
            step(W.sent(CULTURE[5][0]), 'A taboo: something not said or done.')
          ],
          guided: [function () { return culture(1); }, function () { return culture(1); }],
          check: [function () { return culture(2); }, function () { return culture(2); }],
          coach: '<p>Connect to the child' + AP + 's own life: "What norms or values does our family have? How would a reader from outside see them?"</p>',
          mistake: '<p>Judging another culture' + AP + 's norms as strange. Ask what they mean to the people in the text.</p>' },
        { slug: 'bias', title: 'Spot bias, and find what is missing', exp: ['C3.5'], skill: 'perspective',
          model: [
            step(W.sent(T.library.view.evidence), 'Evidence: numbers.'),
            step(W.sent(T.library.view.bias), 'Bias: a sweeping claim about a group.'),
            step(W.means('people', T.library.view.missing), 'A missing perspective.')
          ],
          guided: [biasLine, pickBias],
          check: [missing, fixBias],
          coach: '<p>For any persuasive text ask three questions: Who wrote it? What do they want? Who is not heard?</p>',
          mistake: '<p>Thinking a text with some facts cannot be biased.</p>' },
        { slug: 'inclusion', title: 'Identify each position in a discussion', exp: ['C3.6'], skill: 'perspective',
          model: [
            step(DANCE, 'Three people, one topic: accessibility.'),
            step(W.means('people', 'Amir: everyone can get in.') + W.means('listen', 'Ms. Li: the echo excludes some.')),
            step(W.means('star', 'Tala: a solution for both.'))
          ],
          guided: [function () { return position(1); }, function () { return position(1); }],
          check: [function () { return position(2); }, function () { return position(2); }],
          coach: '<p>Accessibility means more than ramps. Talk about who might be left out of an event, and how to plan so no one is.</p>',
          mistake: '<p>Seeing only two sides. Often a third position combines the best of both.</p>' }
      ]
    }],
    practice: [
      { id: 'devices', name: 'Irony, satire and allusion', code: 'C3.1', gen: irony },
      { id: 'inference', name: 'Inferences and conclusions', code: 'C3.2, C3.3', gen: infer },
      { id: 'perspective', name: 'Culture, bias and perspective', code: 'C3.4, C3.5, C3.6', gen: culture }
    ],
    tasks: [
      { id: 'culture-novel', title: 'Culture in a longer text', code: 'C3.4', pic: W.icon('read'), say: 'In a novel or film, find two cultural elements. What do they add to the story?', write: true,
        run: ['Choose a novel or film set in a culture or time different from the child' + AP + 's own.', 'The child finds two cultural elements (norms, values, status, an earlier era, language or a taboo) and explains what each means in the story.', 'They connect one to their own life and culture.'],
        rubric: ['Cannot find a cultural element yet.', 'Names an element with help.', 'Explains two elements and how they shape the story.', 'Analyzes elements insightfully and makes a respectful personal connection.'] },
      { id: 'respond-inclusion', title: 'Respond to a text about inclusion', code: 'C3.6', pic: W.icon('write'), say: 'Read an article about diversity, inclusion or accessibility. Write your response.', write: true,
        run: ['Choose a current article for young people about diversity, inclusion or accessibility.', 'The child identifies the different positions in it, then writes their own response with reasons.'],
        rubric: ['Restates the topic only.', 'Identifies one position and gives an opinion.', 'Identifies different positions and responds with reasons.', 'Weighs the positions fairly and responds with insight and evidence.'] },
      { id: 'fnmi-compare', title: 'Compare two texts by First Nations, Métis or Inuit creators', code: 'C3.7', pic: W.icon('read'), say: 'Compare two works by First Nations, Métis or Inuit creators from different times.', write: true,
        run: ['With your librarian, choose two texts by First Nations, Métis or Inuit creators from different periods, for example one written about residential schools and one about life today.',
          'Ask: "How did the times, the events or the conditions of each period shape these texts? How do they relate to lived experiences today?"', 'The child writes a short comparison.'],
        rubric: ['Describes one text only.', 'Notes a simple similarity or difference.', 'Compares how history and conditions shaped each text, and links to today.', 'Insightful, respectful comparison with clear links to current lived experiences.'],
        coach: '<p>Approach residential schools and other painful histories with care. Choose age-appropriate texts recommended by Indigenous educators, and let the creators' + AP + ' voices lead.</p>' },
      { id: 'critical-goal', title: 'How well did I think?', code: 'C3.8', pic: W.icon('star'), say: 'Which critical thinking skill did you use best? Set one goal.', write: true,
        run: ['After the chapter, the child reviews the skills: inferring, finding bias, drawing conclusions, identifying positions.', 'They rate how well each worked for them and set one goal.'],
        rubric: ['No reflection.', 'Names a skill used.', 'Assesses two skills honestly and sets a goal.', 'Gives examples of each skill in use and sets a specific plan.'] }
    ]
  });

  Q.shapes('thinking', {
    devices: [[1, 'satire', satire], [1, 'allusion', allusion], [1, 'which-allusion', whichAllusion], [2, 'dramatic-irony', ironyCaptain], [2, 'match', matchDevice]],
    inference: [[1, 'evidence', evidence], [1, 'conclude', conclude], [2, 'sequence', sequence]],
    perspective: [[1, 'bias', biasLine], [1, 'pick-bias', pickBias], [1, 'missing', missing], [1, 'position', position], [2, 'fix-bias', fixBias]]
  });
})();
