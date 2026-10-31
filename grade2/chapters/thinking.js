/* Grade 2: thinking about texts.
   Ontario 2023 Language, Grade 2, Strand C (Comprehension):
   C1.3 text patterns (such as chronological order and journal entry) and text features (table of contents, charts, icons)
   C1.4 how images, graphics and visual design create meaning   C1.5 simple elements of style: voice, word choice, word patterns, sentence structure
   C3.1 simple literary devices, including consonance and simile C3.2 simple inferences from stated and implied information
   C3.3 identifying and sequencing important information, and comparing and contrasting simple elements
   C3.5 explicit and implicit perspectives in a text, with evidence
   With a grown-up: C3.4 cultural elements (symbols, language, values), C3.6 thoughts and feelings about diversity, inclusion and accessibility,
   C3.7 texts by First Nations, Métis and Inuit creators about history and lived experience, C3.8 thinking skills that helped.
   Passages are in ../texts.js; everything else is written here for this site. Answer checks: tests/verify/grade2-thinking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;

  var FEATURES = [['table of contents', 'shows what is in a book, and on which page'], ['chart', 'shows facts in rows and columns'], ['icon', 'a small picture that stands for something'],
    ['heading', 'tells what one part is about'], ['caption', 'tells about a picture'], ['label', 'names a part of a picture']];
  var CONTENTS = { title: 'All About Frogs', rows: [['Eggs', 2], ['Tadpoles', 5], ['Frogs on land', 8], ['Food', 11], ['Winter', 14]] };
  var TOPIC = { Eggs: 'where frogs lay their eggs', Tadpoles: 'how tadpoles swim', 'Frogs on land': 'how frogs hop', Food: 'what frogs eat', Winter: 'how frogs sleep in the cold' };
  var CHART = { title: 'Our Class Pets', rows: [['Pet', 'Legs', 'Food'], ['hamster', '4', 'seeds'], ['budgie', '2', 'seeds'], ['goldfish', '0', 'flakes']] };
  function contents() { return W.passage('Contents', CONTENTS.rows.map(function (r) { return r[0] + ' . . . page ' + r[1]; })); }
  function chart() { return W.passage(CHART.title, CHART.rows.map(function (r, i) { return i ? r.join('  |  ') : '<b>' + r.join('  |  ') + '</b>'; })); }

  var SIMILE = ['Rain on the roof is like tiny drums.', 'The puddles shine like silver plates.', 'The snow was as soft as a pillow.', 'Mateo ran like the wind.', 'The kitten was as small as a mitten.'];
  var PLAIN = ['Rain falls on the roof.', 'The puddles shine.', 'The snow was soft.', 'Mateo ran fast.', 'The kitten was small.'];
  var SOUND = [['Tap, tip, tap, it taps and drips.', 't'], ['Tick, tock, the clock ticks.', 'k'], ['Six snakes slid past.', 's'], ['Pat the pup on the top.', 'p'], ['Lily will fill a little pail.', 'l']];
  var NOSOUND = ['A cow ate hay.', 'Owen is up early.', 'I hear a crow.', 'Ava drew a red bow.'];
  var PICTURE = [['The dog ate.', 'The hungry puppy gobbled its dinner.'], ['It was cold.', 'An icy wind nipped my nose.'], ['The bird sang.', 'A tiny robin sang a cheerful song.'],
    ['We went down the hill.', 'We zoomed down the snowy hill on our sled.']];
  var PATTERN = [[['Up the hill,', 'up the tree,', 'up so high', 'for all to see!'], 'up'], [['Drip on the leaf,', 'drip on the stone,', 'drip, drip, drip,', 'all the way home.'], 'drip']];
  /* two animals to compare */
  var PAIR = { a: 'Canada goose', b: 'Loon', both: ['It swims on lakes.', 'It flies south in the fall.'], onlyA: ['It eats grass.', 'It honks loudly.'], onlyB: ['It dives for fish.', 'It has red eyes.'] };
  function cards() { return '<div class="wpics">' + W.passage(PAIR.a, PAIR.both.concat(PAIR.onlyA)) + W.passage(PAIR.b, PAIR.both.concat(PAIR.onlyB)) + '</div>'; }

  /* ---------- question makers: how texts are built ---------- */
  function featureJob(lv) {
    var f = R.pick(FEATURES);
    return Q.one('What does a <b>' + f[0] + '</b> do?', f[1], R.some(FEATURES.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Think of where you see a ' + f[0] + ' in a book.', explain: 'A ' + f[0] + ': ' + f[1] + '.', meta: { k: 'g2-feature', f: f[0] } });
  }
  function matchFeatures() {
    var fs = R.some(FEATURES, 3);
    return { q: 'Match each part of a book to its job.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Think of an information book.', explain: 'Text features help you find and understand facts.', meta: { k: 'g2-match-features' } };
  }
  function whichPage() {
    var r = R.pick(CONTENTS.rows), topic = TOPIC[r[0]];
    return Q.tiles('On which page would you read about <b>' + topic + '</b>?', 'page ' + r[1], R.some(CONTENTS.rows.filter(function (x) { return x !== r; }), 2).map(function (x) { return 'page ' + x[1]; }), {
      fig: contents(), prompt: 'Which part is about that?', hint: 'Find the part, then follow the dots to the page.', explain: '<b>' + r[0] + '</b> starts on page ' + r[1] + '.', meta: { k: 'g2-page', topic: topic } });
  }
  function readChart() {
    var row = R.pick(CHART.rows.slice(1));
    return Q.tiles('How many legs does the <b>' + row[0] + '</b> have?', row[1], CHART.rows.slice(1).filter(function (x) { return x[1] !== row[1]; }).map(function (x) { return x[1]; }), {
      fig: chart(), hint: 'Find the row for the ' + row[0] + '. Then look under Legs.', explain: 'The chart says ' + row[1] + '.', meta: { k: 'g2-chart', pet: row[0] } });
  }
  function journal() {
    return Q.one('How is this journal entry put in order?', 'by days, in the order things happened', ['by topic, like Food and Babies', 'as numbered steps to follow'], { fig: T.show(T.beans),
      hint: 'Look at the headings.', explain: 'A journal tells what happened, day by day.', meta: { k: 'g2-journal' } });
  }

  /* ---------- question makers: the writer's craft ---------- */
  function simile(lv) {
    var i = R.int(0, SIMILE.length - 1), others = R.some(PLAIN.filter(function (p, j) { return j !== i; }), lv > 1 ? 2 : 1);
    return Q.one('Which sentence is a <b>simile</b>?', SIMILE[i], [PLAIN[i]].concat(others), { prompt: 'Look for <b>like</b> or <b>as</b>.',
      hint: 'A simile compares two things using like or as.', explain: W.sent(SIMILE[i]), meta: { k: 'g2-simile' } });
  }
  function simileWhat() {
    var s = R.pick([['The snow was as soft as a pillow.', 'snow', 'a pillow'], ['Mateo ran like the wind.', 'how Mateo ran', 'the wind'], ['The kitten was as small as a mitten.', 'the kitten', 'a mitten']]);
    return Q.tiles('This simile compares <b>' + s[1] + '</b> to what?', s[2], ['a pillow', 'the wind', 'a mitten'].filter(function (x) { return x !== s[2]; }).slice(0, 2), { fig: W.sent(s[0]),
      hint: 'Look at the words after like or as.', explain: W.sent(s[0]), meta: { k: 'g2-simile-what', s: s[0] } });
  }
  function sound(lv) {
    var s = R.pick(SOUND);
    return Q.one('Which line repeats the same <b>consonant sound</b>?', s[0], R.some(NOSOUND, lv > 1 ? 2 : 1), { prompt: 'Say each one aloud. Listen for a sound that comes back.',
      hint: 'Listen for t, k, s, p or l again and again.', explain: 'The <b>' + s[1] + '</b> sound comes back again and again.', meta: { k: 'g2-consonance' } });
  }
  function picture() {
    var p = R.pick(PICTURE);
    return Q.one('Which sentence helps you <b>picture</b> it best?', p[1], [p[0]], { hint: 'Which one uses describing and action words?', explain: 'Strong words help readers see it.', meta: { k: 'g2-picture' } });
  }
  function pattern() {
    var p = R.pick(PATTERN), words = p[0].join(' ').toLowerCase().replace(/[,.!]/g, '').split(' ').filter(function (w, i, all) { return all.indexOf(w) === all.lastIndexOf(w) && w.length > 2; });
    return Q.tiles('Which word repeats to make a pattern?', p[1], R.some(words, 2), { fig: W.passage('', p[0]), hint: 'Which word do you see again and again?', explain: '<b>' + p[1] + '</b> repeats. Patterns make writing fun to read aloud.', meta: { k: 'g2-pattern' } });
  }

  /* ---------- question makers: reading between the lines ---------- */
  function infer(lv) {
    var t = R.pick(T.list('infer')), f = R.pick(t.infer), wrong = t.infer.filter(function (x) { return x !== f; }).map(function (x) { return x[1]; }).concat([f[2]]);
    return Q.one(f[0], f[1], wrong.slice(0, lv > 1 ? 2 : 1).filter(function (w) { return w !== f[1]; }), { fig: T.show(t), prompt: 'The text does not say it. Look for a clue: <b>' + f[3] + '</b>.',
      hint: 'What do the actions and words tell you?', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g2-infer', t: t.title, q: f[0] } });
  }
  function evidence() {
    var t = R.pick(T.list('infer')), f = R.pick(t.infer), other = t.infer.filter(function (x) { return x !== f; })[0];
    return Q.one('<b>' + f[0] + '</b> The answer is <b>' + f[1] + '</b>. Which words show it?', f[3], [other[3]], { fig: T.show(t),
      hint: 'Which words fit the feeling?', explain: '<mark class="hl">' + f[3] + '</mark> shows it.', meta: { k: 'g2-evidence', t: t.title, q: f[0] } });
  }
  function compare(lv) {
    var both = R.pick(PAIR.both), a = R.pick(PAIR.onlyA), b = R.pick(PAIR.onlyB);
    return Q.one('Which is true of <b>both</b> birds?', both, lv > 1 ? [a, b] : [R.pick([a, b])], { fig: cards(), prompt: 'Find a sentence that is in both cards.',
      hint: 'It must be in both cards.', explain: 'Both: ' + both, meta: { k: 'g2-compare-both' } });
  }
  function contrast() {
    var onlyB = R.int(0, 1) === 1, s = R.pick(onlyB ? PAIR.onlyB : PAIR.onlyA);
    return Q.tiles('Which bird is this true of? <b>' + s + '</b>', onlyB ? PAIR.b : PAIR.a, [onlyB ? PAIR.a : PAIR.b, 'both'], { fig: cards(), hint: 'Find the sentence. Which card is it in?',
      explain: 'Only the ' + (onlyB ? PAIR.b : PAIR.a).toLowerCase() + '.', meta: { k: 'g2-contrast', s: s } });
  }
  function perspective() {
    var t = T.bench, v = t.view;
    return Q.one('What does <b>' + v.who + '</b> think?', v.thinks, v.wrong, { fig: T.show(t), prompt: 'Who wrote it? What do they want?',
      hint: 'Look at what Amara asks for, and her reasons.', explain: v.who + ' thinks: ' + v.thinks, meta: { k: 'g2-perspective' } });
  }
  function reason() {
    var t = T.bench, lines = t.lines;
    return Q.one('Which sentence is one of <b>Amara' + '’' + 's reasons</b>?', lines[2], [lines[0], lines[5]], { fig: T.show(t), hint: 'A reason tells why.',
      explain: W.sent(lines[2]), meta: { k: 'g2-reason' } });
  }

  Atlas.register('thinking', {
    lessons: [{
      id: 'built', title: 'How texts are built', sub: 'Contents pages, charts, icons and journals.',
      concepts: [
        { slug: 'features', title: 'Parts that help you find facts', exp: ['C1.3', 'C1.4'], skill: 'features',
          model: [
            step(contents(), 'A <b>table of contents</b>: what is inside, and the page.'),
            step(chart(), 'A <b>chart</b>: facts in rows.'),
            step(W.icon('lock'), 'An <b>icon</b>: a small picture that stands for something.')
          ],
          guided: [whichPage, readChart],
          check: [function () { return featureJob(1); }, matchFeatures],
          coach: '<p>Pick an information book. Before reading, look at the contents together and choose a page to start on.</p>',
          mistake: '<p>Reading an information book from the first page every time. The contents page lets you jump to what you need.</p>' },
        { slug: 'journal', title: 'A journal tells it day by day', exp: ['C1.3'], skill: 'features',
          model: [
            step(T.show(T.beans), 'Headings are days.'),
            step(W.sent('Monday') + W.sent('Thursday') + W.sent('Saturday'), 'Time order.')
          ],
          guided: [journal, journal],
          check: [journal, whichPage],
          coach: '<p>Keep a short journal together for a week: one line and a picture each day.</p>',
          mistake: '<p>Mixing up the days. Point to each heading and say it in order.</p>' }
      ]
    }, {
      id: 'craft', title: 'The writer' + '’' + 's craft', sub: 'Strong words, patterns, similes and sounds.',
      concepts: [
        { slug: 'word-choice', title: 'Words that paint a picture', exp: ['C1.5'], skill: 'craft',
          model: [
            step(W.sent('The dog ate.'), 'Plain.'),
            step(W.sent('The hungry puppy gobbled its dinner.'), 'Now I can see it.'),
            step(W.passage('', PATTERN[0][0]), '<b>up</b> again and again: a pattern.')
          ],
          guided: [picture, pattern],
          check: [picture, pattern],
          coach: '<p>Pick a plain sentence from the child\'s writing and ask: "How can we help the reader see it?"</p>',
          mistake: '<p>Adding lots of words that do not help ("very very very"). One exact word is better.</p>' },
        { slug: 'simile', title: 'A simile compares with like or as', exp: ['C3.1'], skill: 'craft',
          model: [
            step(W.sent('The snow was as soft <b>as</b> a pillow.'), 'Snow and a pillow: both soft.'),
            step(W.sent('Mateo ran <b>like</b> the wind.'), 'Fast, like the wind.')
          ],
          guided: [function () { return simile(1); }, simileWhat],
          check: [function () { return simile(2); }, simileWhat],
          coach: '<p>Make up similes on a walk: "The clouds look like..." "The ice is as smooth as..."</p>',
          mistake: '<p>Calling any sentence with "like" a simile ("I like pizza"). A simile compares two things.</p>' },
        { slug: 'consonance', title: 'Sounds that come back', exp: ['C3.1'], skill: 'craft',
          model: [
            step(W.sent('<b>T</b>ick, <b>t</b>ock, the cloc<b>k</b> <b>t</b>icks.'), 'Listen: t and k again and again.'),
            step(W.icon('listen'), 'It sounds like a clock.')
          ],
          guided: [function () { return sound(1); }, function () { return sound(1); }],
          check: [function () { return sound(2); }, function () { return sound(2); }],
          coach: '<p>Read poems aloud and clap when a sound comes back. This pattern is called <b>consonance</b>.</p>',
          mistake: '<p>Looking at letters, not sounds. Say it aloud and listen.</p>' }
      ]
    }, {
      id: 'deeper', title: 'Reading between the lines', sub: 'Feelings, comparisons and points of view.',
      concepts: [
        { slug: 'infer', title: 'Work out what is not said', exp: ['C3.2'], skill: 'deeper',
          model: [
            step(W.sent('Then the string slipped out of his hand!'), 'It does not say how Kai feels.'),
            step(W.means('think', 'He lost his kite. He is <b>worried</b>.'), 'Clue plus what I know.')
          ],
          guided: [function () { return infer(1); }, evidence],
          check: [function () { return infer(2); }, evidence],
          coach: '<p>Ask "How do you know?" after every answer about feelings. Point to the words together.</p>',
          mistake: '<p>Guessing with no clue. The text must show it somehow.</p>' },
        { slug: 'compare', title: 'Same and different', exp: ['C3.3'], skill: 'deeper',
          model: [
            step(cards(), 'Two birds.'),
            step(W.sent('It swims on lakes.'), 'In both cards: the same.'),
            step(W.sent('It dives for fish.'), 'Only the loon: different.')
          ],
          guided: [function () { return compare(1); }, contrast],
          check: [function () { return compare(2); }, contrast],
          coach: '<p>Compare two things at home (two fruits, two toys): one way they are the same, one way they are different.</p>',
          mistake: '<p>Choosing something true of only one. Check that it is in both cards.</p>' },
        { slug: 'perspective', title: 'What does the writer think?', exp: ['C3.5'], skill: 'deeper',
          model: [
            step(T.show(T.bench), 'A letter from Amara.'),
            step(W.sent('Please put a bench in our schoolyard.'), 'What she wants.'),
            step(W.sent('Some students get tired at recess and need to rest.'), 'Her reason.')
          ],
          guided: [perspective, reason],
          check: [perspective, reason],
          coach: '<p>Ask: "Do you agree with Amara? Would her letter change the principal' + '’' + 's mind? Why?"</p>',
          mistake: '<p>Mixing up what the writer thinks with what the child thinks. Ask: "What does Amara think?"</p>' }
      ]
    }],
    practice: [
      { id: 'features', name: 'Text features and patterns', code: 'C1.3, C1.4', gen: featureJob },
      { id: 'craft', name: 'The writer' + '’' + 's craft', code: 'C1.5, C3.1', gen: simile },
      { id: 'deeper', name: 'Reading between the lines', code: 'C3.2, C3.3, C3.5', gen: infer }
    ],
    tasks: [
      { id: 'culture', title: 'Culture in a story', code: 'C3.4', pic: W.icon('people'), say: 'Find something in a story that shows a culture: food, words, a symbol, a celebration.',
        run: ['Read a picture book set in a family or community with a culture the child knows, or one they are learning about.', 'Ask: "What did you notice? Food, words in another language, a symbol, something the family cares about?"', 'Ask: "Why do you think the author put that in?"'],
        rubric: ['Does not notice cultural details yet.', 'Notices a detail with help.', 'Names a cultural detail and asks a question about it.', 'Explains how the detail adds to the meaning of the story.'] },
      { id: 'everyone', title: 'Everyone belongs', code: 'C3.6', pic: W.icon('people'), say: 'How did you feel about this story? Could everyone join in?',
        run: ['Read a story about a character who is different in some way (for example, uses a wheelchair, speaks another language, or is new to school).', 'Ask: "How did you feel? What would you do if you were there?"', 'Talk about ways to include everyone.'],
        rubric: ['Shares no thoughts yet.', 'Shares a feeling with help.', 'Shares thoughts and feelings with a reason.', 'Connects the story to real ways to include others.'] },
      { id: 'past-present', title: 'Then and now', code: 'C3.7', pic: W.icon('read'), say: 'Read a story by a First Nations, Métis or Inuit creator. What does it show about the past and today?',
        run: ['With your librarian, choose a picture book by a First Nations, Métis or Inuit creator that tells about the past or a cultural experience.', 'Read it together. Ask: "What happened in the story? Is anything the same in life today?"'],
        rubric: ['Recalls little of the book yet.', 'Retells some of it with help.', 'Tells what the book shows about the past or culture.', 'Connects the book to life today, respectfully and with detail.'],
        coach: '<p>Let the book lead. Choose creators writing about their own nation or community, and use the author notes.</p>' },
      { id: 'thinking-skills', title: 'How I thought about it', code: 'C3.8', pic: W.icon('think'), say: 'Which thinking helped you: finding clues, comparing, or asking questions?',
        run: ['After talking about a book, ask: "What helped you understand it best?"', 'Name the skills used: finding clues, comparing, asking questions.'],
        rubric: ['Cannot name a thinking skill yet.', 'Names one with help.', 'Names one and tells when it helped.', 'Explains how two skills helped, with examples.'] }
    ]
  });

  Q.shapes('thinking', {
    features: [[1, 'page', whichPage], [1, 'chart', readChart], [1, 'journal', journal], [2, 'match', matchFeatures]],
    craft: [[1, 'consonance', sound], [1, 'picture-it', picture], [1, 'pattern', pattern], [2, 'simile-what', simileWhat]],
    deeper: [[1, 'evidence', evidence], [1, 'compare', compare], [1, 'contrast', contrast], [1, 'perspective', perspective], [2, 'reason', reason]]
  });
})();
