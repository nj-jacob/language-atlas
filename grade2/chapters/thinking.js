/* Grade 2: thinking about texts. A full chapter: every idea has two worked examples, three questions together and five on
   your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 2, Strand C (Comprehension):
   C1.3 text patterns (such as chronological order and journal entry) and text features (table of contents, charts, icons)
   C1.4 how images, graphics and visual design create meaning   C1.5 simple elements of style: voice, word choice, word patterns, sentence structure
   C3.1 simple literary devices, including consonance and simile C3.2 simple inferences from stated and implied information
   C3.3 identifying and sequencing important information, and comparing and contrasting simple elements
   C3.5 explicit and implicit perspectives in a text, with evidence, and how they could influence an audience
   With a grown-up: C3.4 cultural elements (symbols, language, values), C3.6 thoughts and feelings about diversity, inclusion and accessibility,
   C3.7 texts by First Nations, Métis and Inuit creators about history and lived experience, C3.8 thinking skills that helped.
   Passages are in ../texts.js; everything else is written here for this site. Answer checks: tests/verify/grade2-thinking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var AP = '’', Q1 = '“', Q2 = '”';

  /* ---------- text features: what each one does, contents pages, charts, icons and pictures ---------- */
  var FEATURES = [['table of contents', 'shows what is in a book, and on which page'], ['chart', 'shows facts in rows and columns'], ['icon', 'a small picture that stands for something'],
    ['heading', 'tells what one part is about'], ['caption', 'tells about a picture'], ['label', 'names a part of a picture']];
  var BOOKS = [
    { title: 'All About Frogs', pic: 'fish', rows: [['Eggs', 2], ['Tadpoles', 5], ['Frogs on land', 8], ['Food', 11], ['Winter', 14]],
      topic: { Eggs: 'where frogs lay their eggs', Tadpoles: 'how tadpoles swim', 'Frogs on land': 'how frogs hop', Food: 'what frogs eat', Winter: 'how frogs sleep in the cold' } },
    { title: 'Life in a Hive', pic: 'bee', rows: [['The queen', 3], ['Worker bees', 6], ['Making honey', 9], ['Flowers', 12]],
      topic: { 'The queen': 'the bee that lays the eggs', 'Worker bees': 'the bees that do the jobs', 'Making honey': 'how nectar turns into honey', Flowers: 'why bees visit flowers' } },
    { title: 'Our Solar System', pic: 'sun', rows: [['The sun', 4], ['Earth', 7], ['The moon', 10], ['Stars', 13]],
      topic: { 'The sun': 'the star at the centre', Earth: 'the planet we live on', 'The moon': 'what goes around Earth', Stars: 'lights in the night sky' } }
  ];
  var CHARTS = [
    { title: 'Our Class Pets', head: ['Pet', 'Legs', 'Food'], rows: [['hamster', '4', 'seeds'], ['budgie', '2', 'seeds'], ['goldfish', '0', 'flakes']], ask: 1 },
    { title: 'Weather This Week', head: ['Day', 'Weather', 'High'], rows: [['Monday', 'sunny', '18°C'], ['Tuesday', 'rainy', '12°C'], ['Wednesday', 'cloudy', '15°C'], ['Thursday', 'windy', '14°C']], ask: 1 },
    { title: 'Lunch Votes', head: ['Food', 'Votes'], rows: [['soup', '6'], ['pasta', '9'], ['tacos', '4'], ['rice bowls', '7']], ask: 1 }
  ];
  /* icons in a book, and what each one tells the reader to do */
  var ICONS = [['listen', 'Listen to this part.'], ['write', 'Write your answer.'], ['talk', 'Talk with a partner.'], ['read', 'Read this part aloud.'], ['think', 'Stop and think.'], ['lock', 'Keep this private.']];
  /* a picture that fits a sentence */
  var FITS = [['The goose flew south for the winter.', 'goose'], ['We paddled across the still lake.', 'canoe'], ['A bee buzzed from flower to flower.', 'bee'],
    ['The fox curled up in the snow.', 'fox'], ['We rode the ferry to the island.', 'ferry'], ['The moose waded into the pond.', 'moose'], ['I read my new library book.', 'book'], ['Our team won the hockey game.', 'hockey']];

  function contents(b) { return W.passage('Contents', b.rows.map(function (r) { return r[0] + ' . . . page ' + r[1]; }), { pics: [b.pic] }); }
  function chart(c) { return W.passage(c.title, [c.head.join('  |  ')].map(function (h) { return '<b>' + h + '</b>'; }).concat(c.rows.map(function (r) { return r.join('  |  '); }))); }

  function featureJob(lv) {
    var f = R.pick(FEATURES);
    return Q.one('What does a <b>' + f[0] + '</b> do?', f[1], R.some(FEATURES.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Think of where you see a ' + f[0] + ' in a book.', explain: 'A ' + f[0] + ': ' + f[1] + '.', meta: { k: 'g2-feature', f: f[0] } });
  }
  function matchFeatures() {
    var fs = R.some(FEATURES, 3);
    return { q: 'Match each part of a book to its job.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Think of an information book.', explain: 'Text features help you find and understand facts.', meta: { k: 'g2-match-features' } };
  }
  function whichPage(lv) {
    var b = R.pick(BOOKS), r = R.pick(b.rows), topic = b.topic[r[0]];
    return Q.tiles('On which page would you read about <b>' + topic + '</b>?', 'page ' + r[1], R.some(b.rows.filter(function (x) { return x !== r; }), lv > 1 ? 3 : 2).map(function (x) { return 'page ' + x[1]; }), {
      fig: contents(b), prompt: 'Which part is about that?', hint: 'Find the part, then follow the dots to the page.', explain: '<b>' + r[0] + '</b> starts on page ' + r[1] + '.', meta: { k: 'g2-page', book: b.title, topic: topic } });
  }
  function readChart(lv) {
    var c = R.pick(CHARTS), row = R.pick(c.rows), col = lv > 1 && c.head.length > 2 ? R.int(1, c.head.length - 1) : 1, right = row[col];
    var wrong = c.rows.map(function (r) { return r[col]; }).filter(function (x, i, all) { return x !== right && all.indexOf(x) === i; });
    return Q.tiles('Find <b>' + row[0] + '</b>. What is under <b>' + c.head[col] + '</b>?', right, R.some(wrong, 2), {
      fig: chart(c), hint: 'Find the row for ' + row[0] + '. Then look under ' + c.head[col] + '.', explain: 'The chart says <b>' + right + '</b>.', meta: { k: 'g2-chart', chart: c.title, row: row[0], col: c.head[col] } });
  }
  function iconMeans(lv) {
    var i = R.pick(ICONS);
    return Q.one('In a workbook, this icon tells you:', i[1], R.some(ICONS.filter(function (x) { return x !== i; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), {
      fig: W.icon(i[0]), hint: 'What does the little picture show?', explain: W.means(i[0], i[1]), meta: { k: 'g2-icon', icon: i[0] } });
  }
  function pictureFits(lv) {
    var f = R.pick(FITS), wrong = R.some(FITS.filter(function (x) { return x !== f; }), lv > 1 ? 2 : 1);
    return Q.tiles('Which picture fits this sentence?', W.pic(f[1]), wrong.map(function (x) { return W.pic(x[1]); }), { fig: W.sent(f[0]), answerText: f[1],
      hint: 'Which picture shows what the sentence says?', explain: 'Pictures help the reader see what the words say.', meta: { k: 'g2-picture-fits', s: f[0] } });
  }

  /* ---------- text patterns: a journal goes day by day (C1.3) ---------- */
  var PATTERNS = [['day by day', 'journal entry'], ['step by step', 'instructions'], ['topic by topic', 'information']];
  function patternOf(t) { return PATTERNS.filter(function (p) { return p[1] === t.kind; })[0][0]; }
  function patterned() { return R.pick(T.list('kind').filter(function (t) { return t.kind === 'journal entry' || t.kind === 'instructions' || t.kind === 'information'; })); }
  function journals() { return T.list('kind').filter(function (t) { return t.kind === 'journal entry'; }); }
  function days(t) { var out = []; t.lines.forEach(function (l, i) { if (l.charAt(0) === '#') out.push([l.slice(2), t.lines[i + 1]]); }); return out; }
  function pattern(lv) {
    var t = patterned();
    return Q.one('How is this text put in order?', patternOf(t), PATTERNS.filter(function (p) { return p[1] !== t.kind; }).map(function (p) { return p[0]; }).slice(0, lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Look at the headings or numbers.', explain: 'It goes <b>' + patternOf(t) + '</b>.', meta: { k: 'g2-text-pattern', t: t.title } });
  }
  function whichDay() {
    var t = R.pick(journals()), d = days(t), pick = R.pick(d), words = pick[1].match(/^[^.!]+[.!]/)[0];
    return Q.tiles('On which day did this happen? <b>' + words + '</b>', pick[0], d.filter(function (x) { return x !== pick; }).map(function (x) { return x[0]; }), { fig: T.show(t),
      hint: 'Find the sentence. Look at the heading above it.', explain: 'It is under <b>' + pick[0] + '</b>.', meta: { k: 'g2-which-day', t: t.title } });
  }
  function dayOrder() {
    var t = R.pick(journals()), d = days(t);
    return { q: 'Put the days in the order of the journal.', fig: T.show(t), type: 'order', items: d.map(function (x) { return x[0]; }), first: 'First', last: 'Last',
      hint: 'A journal goes in time order.', explain: W.chain(d.map(function (x) { return x[0]; })), meta: { k: 'g2-day-order', t: t.title } };
  }
  function matchPattern() {
    var ts = ['journal entry', 'instructions', 'information'].map(function (k) { return R.pick(T.list('kind').filter(function (t) { return t.kind === k; })); });
    return { q: 'Match each text to how it is put in order.', type: 'match', pairs: ts.map(function (t) { return [t.title, patternOf(t)]; }), hint: 'Picture each one: days, steps, or headings?',
      explain: 'Journals go by days, instructions by steps, information by topic.', meta: { k: 'g2-match-pattern' } };
  }

  /* ---------- the writer's craft: words that paint a picture, and patterns (C1.5) ---------- */
  var PICTURE = [['The dog ate.', 'The hungry puppy gobbled its dinner.'], ['It was cold.', 'An icy wind nipped my nose.'], ['The bird sang.', 'A tiny robin sang a cheerful song.'],
    ['We went down the hill.', 'We zoomed down the snowy hill on our sled.'], ['The cat sat.', 'The fluffy cat curled up on the warm rug.'], ['It rained.', 'Heavy rain drummed on the window.'],
    ['The boy ran.', 'Liam raced across the wet grass.'], ['The soup was good.', 'The hot soup was thick and spicy.'], ['The leaves fell.', 'Red and orange leaves drifted down.'], ['The baby cried.', 'The baby wailed loudly in her crib.']];
  /* a plain word, a word that shows it exactly, and a sentence for it */
  var EXACT = [['ate', 'gobbled', 'The hungry dog ___ its food.'], ['walked', 'tiptoed', 'Mei ___ past her sleeping brother.'], ['said', 'shouted', 'Omar ___ across the field.'],
    ['ran', 'dashed', 'The fox ___ into the trees.'], ['looked', 'peeked', 'Zara ___ through the tiny hole.'], ['went', 'zoomed', 'The sled ___ down the hill.'],
    ['drank', 'sipped', 'Grandma ___ her hot tea.'], ['cut', 'chopped', 'Dad ___ the carrots for the soup.']];
  var REPEAT = [[['Up the hill,', 'up the tree,', 'up so high', 'for all to see!'], 'up'], [['Drip on the leaf,', 'drip on the stone,', 'drip, drip, drip,', 'all the way home.'], 'drip'],
    [['Snow on the roof,', 'snow on the car,', 'snow on the mitten,', 'snow near and far.'], 'snow'], [['Run to the lake,', 'run to the dock,', 'run past the canoe,', 'run round the rock.'], 'run'],
    [['Hop, little frog,', 'hop on the log,', 'hop in the pond,', 'hop through the fog.'], 'hop']];
  function picture(lv) {
    var p = R.pick(PICTURE), more = lv > 1 ? [R.pick(PICTURE.filter(function (x) { return x !== p; }))[0]] : [];
    return Q.one('Which sentence helps you <b>picture</b> it best?', p[1], [p[0]].concat(more), { hint: 'Which one uses describing and action words?', explain: 'Strong words help readers see it.', meta: { k: 'g2-picture', s: p[1] } });
  }
  function exactWord(lv) {
    var e = R.pick(EXACT), other = R.pick(EXACT.filter(function (x) { return x !== e; }));
    return Q.tiles('Which word helps you <b>see</b> it best?', e[1], [e[0]].concat(lv > 1 ? [other[0]] : []), { fig: W.sent(e[2].replace('___', W.gap())),
      hint: 'Which word shows exactly how?', explain: W.sent(e[2].replace('___', '<b>' + e[1] + '</b>')), meta: { k: 'g2-exact-word', s: e[2] } });
  }
  function repeatWord() {
    var p = R.pick(REPEAT), words = p[0].join(' ').toLowerCase().replace(/[,.!]/g, '').split(' ').filter(function (w, i, all) { return all.indexOf(w) === all.lastIndexOf(w) && w.length > 2; });
    return Q.tiles('Which word repeats to make a pattern?', p[1], R.some(words, 2), { fig: W.passage('', p[0]), hint: 'Which word do you see again and again?', explain: '<b>' + p[1] + '</b> repeats. Patterns make writing fun to read aloud.', meta: { k: 'g2-pattern' } });
  }
  function pictureTf() {
    var p = R.pick(PICTURE), right = R.int(0, 1) === 1, n = Q.name();
    return { q: n + ' says this sentence helps you picture it:', fig: W.sent(right ? p[1] : p[0]), type: 'tf', answer: right,
      why: { options: ['It has describing and action words.', 'It is plain. It tells, but does not show.'], answer: right ? 0 : 1 },
      hint: 'Can you see it in your head?', explain: W.sent(p[1]), meta: { k: 'g2-picture-tf', s: right ? p[1] : p[0] } };
  }

  /* ---------- similes (C3.1) ---------- */
  /* a simile, what it describes, what it is compared to, and the plain way to say it */
  /* a simile, what it describes, what it is compared to, the plain way to say it, and what the two share (so wrong endings never fit) */
  var SIMILE = [['Rain on the roof is like tiny drums.', 'rain on the roof', 'tiny drums', 'Rain falls on the roof.', 'loud'], ['The puddles shine like silver plates.', 'the puddles', 'silver plates', 'The puddles shine.', 'shiny'],
    ['The snow was as soft as a pillow.', 'the snow', 'a pillow', 'The snow was soft.', 'soft'], ['Mateo ran like the wind.', 'how Mateo ran', 'the wind', 'Mateo ran fast.', 'fast'],
    ['The kitten was as small as a mitten.', 'the kitten', 'a mitten', 'The kitten was small.', 'small'], ['My cheeks are as red as apples.', 'my cheeks', 'apples', 'My cheeks are red.', 'red'],
    ['The lake was as smooth as glass.', 'the lake', 'glass', 'The lake was smooth.', 'shiny'], ['Snow falls soft like feathers.', 'falling snow', 'feathers', 'Snow falls softly.', 'soft'],
    ['The baby was as quiet as a mouse.', 'the baby', 'a mouse', 'The baby was quiet.', 'quiet'], ['The ice was as cold as a freezer.', 'the ice', 'a freezer', 'The ice was cold.', 'cold']];
  function unlike(s) { return SIMILE.filter(function (x) { return x[4] !== s[4]; }).map(function (x) { return x[2]; }); }
  function simile(lv) {
    var s = R.pick(SIMILE), others = R.some(SIMILE.filter(function (x) { return x !== s; }), lv > 1 ? 2 : 1).map(function (x) { return x[3]; });
    return Q.one('Which sentence is a <b>simile</b>?', s[0], [s[3]].concat(others), { prompt: 'Look for <b>like</b> or <b>as</b>.',
      hint: 'A simile compares two things using like or as.', explain: W.sent(s[0]), meta: { k: 'g2-simile' } });
  }
  function simileWhat(lv) {
    var s = R.pick(SIMILE), wrong = R.some(unlike(s), lv > 1 ? 3 : 2);
    return Q.tiles('This simile compares <b>' + s[1] + '</b> to what?', s[2], wrong, { fig: W.sent(s[0]),
      hint: 'Look at the words after like or as.', explain: W.sent(s[0]), meta: { k: 'g2-simile-what', s: s[0] } });
  }
  function simileEnd(lv) {
    var s = R.pick(SIMILE), cut = s[0].replace(/\.$/, '').split(/( like | as \w+ as )/), wrong = R.some(unlike(s), lv > 1 ? 2 : 1);
    return Q.tiles('Finish the simile.', s[2], wrong, { fig: W.sent(cut[0] + cut[1] + W.gap() + '.'), prompt: 'Which one makes sense?',
      hint: 'Which thing is really like that?', explain: W.sent(s[0]), meta: { k: 'g2-simile-end', s: s[0] } });
  }
  function simileTf() {
    var s = R.pick(SIMILE), right = R.int(0, 1) === 1, said = right ? s[0] : s[3];
    return { q: Q.name() + ' says this is a simile:', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['It compares two things with like or as.', 'It does not compare two things.'], answer: right ? 0 : 1 },
      hint: 'Look for like or as, and two things.', explain: W.sent(s[0]), meta: { k: 'g2-simile-tf', said: said } };
  }

  /* ---------- sounds that come back: consonance (C3.1) ---------- */
  var SOUND = [['Tap, tip, tap, it taps and drips.', 't'], ['Tick, tock, the clock ticks.', 'k'], ['Six snakes slid past.', 's'], ['Pat the pup on the top.', 'p'], ['Lily will fill a little pail.', 'l'],
    ['Sled, slide, slip, we zoom down the hill.', 's'], ['Mmm, my mom makes muffins.', 'm'], ['Bob the bear bumps a big bin.', 'b'], ['Fuzzy fox, fluffy fur.', 'f'], ['Dad dug deep in the dirt.', 'd']];
  var NOSOUND = ['A cow ate hay.', 'Owen is up early.', 'I hear a crow.', 'Ava drew a red bow.', 'We saw one owl.', 'The egg is in a nest.'];
  function sound(lv) {
    var s = R.pick(SOUND);
    return Q.one('Which line repeats the same <b>consonant sound</b>?', s[0], R.some(NOSOUND, lv > 1 ? 2 : 1), { prompt: 'Say each one aloud. Listen for a sound that comes back.',
      hint: 'Listen for a sound that comes again and again.', explain: 'The <b>' + s[1] + '</b> sound comes back again and again.', meta: { k: 'g2-consonance' } });
  }
  function whichSound(lv) {
    var s = R.pick(SOUND), wrong = R.some('t k s p l m b f d'.split(' ').filter(function (x) { return x !== s[1] && s[0].toLowerCase().indexOf(x) < 0; }), lv > 1 ? 3 : 2);
    return Q.tiles('Which sound comes back again and again?', s[1], wrong, { fig: W.sent(s[0]), hint: 'Say it aloud. Which sound do you hear most?',
      explain: 'Listen: <b>' + s[1] + '</b> again and again.', meta: { k: 'g2-which-sound', s: s[0] } });
  }
  function soundTf() {
    var right = R.int(0, 1) === 1, said = right ? R.pick(SOUND)[0] : R.pick(NOSOUND);
    return { q: Q.name() + ' says a sound comes back in this line:', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['The same sound comes again and again.', 'No sound comes back.'], answer: right ? 0 : 1 },
      hint: 'Say it aloud and listen.', explain: right ? 'You can hear the same sound again and again.' : 'Each word starts with a different sound.', meta: { k: 'g2-sound-tf', said: said } };
  }
  function soundTap() {
    var t = R.pick(T.list('consonance')), line = t.consonance[0][0], i = t.lines.indexOf(line);
    return { q: 'Tap the line where a sound comes back.', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: line,
      hint: 'Say each line aloud.', explain: 'The <b>' + t.consonance[0][1] + '</b> sound comes back.', meta: { k: 'g2-sound-tap', t: t.title } };
  }

  /* ---------- reading between the lines (C3.2) ---------- */
  /* a sentence that shows a feeling without naming it */
  var SHOW = [['Ava' + AP + 's lip shook, and a tear ran down her cheek.', 'sad'], ['Liam jumped up and down and clapped.', 'excited'], ['Noor stomped her feet and crossed her arms.', 'angry'],
    ['Theo hid behind his dad and held on tight.', 'shy'], ['Priya yawned and rubbed her eyes.', 'tired'], ['Sam smiled from ear to ear.', 'happy'], ['Mei' + AP + 's hands shook as the thunder boomed.', 'scared'],
    ['Arjun stood tall and showed everyone his picture.', 'proud']];
  var FEEL = ['sad', 'excited', 'angry', 'shy', 'tired', 'happy', 'scared', 'proud'];
  function feeler(lv) { return R.pick(T.list('infer', lv)); }
  function infer(lv) {
    var t = feeler(lv), f = R.pick(t.infer);
    return Q.one(f[0], f[1], [f[2]], { fig: T.show(t), prompt: 'The text does not say it. Look for a clue.',
      hint: 'What do the actions and words tell you?', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g2-infer', t: t.title, q: f[0] } });
  }
  function showFeeling(lv) {
    var s = R.pick(SHOW);
    return Q.tiles('How does this person feel?', s[1], R.some(FEEL.filter(function (x) { return x !== s[1]; }), lv > 1 ? 3 : 2), { fig: W.sent(s[0]),
      hint: 'What would you do if you felt that way?', explain: 'The actions show it: <b>' + s[1] + '</b>.', meta: { k: 'g2-show-feeling', s: s[0] } });
  }
  function evidence(lv) {
    var t = R.pick(T.list('infer', lv).filter(function (x) { return x.infer.length > 1; })), f = R.pick(t.infer), other = t.infer.filter(function (x) { return x !== f; })[0];
    return Q.one('<b>' + f[0] + '</b> The answer is <b>' + f[1] + '</b>. Which words show it?', f[3], [other[3]], { fig: T.show(t),
      hint: 'Which words fit the feeling?', explain: '<mark class="hl">' + f[3] + '</mark> shows it.', meta: { k: 'g2-evidence', t: t.title, q: f[0] } });
  }
  function inferTap(lv) {
    var t = feeler(lv), f = R.pick(t.infer), i = t.lines.findIndex(function (l) { return l.indexOf(f[3]) >= 0; });
    return { q: f[0] + ' (<b>' + f[1] + '</b>) Tap the sentence that shows it.', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which actions or words show the feeling?', hint: 'Find what the character does or says.', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g2-infer-tap', t: t.title, q: f[0] } };
  }

  /* ---------- same and different (C3.3) ---------- */
  var PAIRS = [
    { a: 'Canada goose', b: 'Loon', pa: 'goose', pb: 'canoe', both: ['It swims on lakes.', 'It flies south in the fall.'], onlyA: ['It eats grass.', 'It honks loudly.'], onlyB: ['It dives for fish.', 'It has red eyes in summer.'] },
    { a: 'Bee', b: 'Butterfly', pa: 'bee', pb: 'leaf', both: ['It has six legs.', 'It visits flowers.'], onlyA: ['It makes honey.', 'It can sting.'], onlyB: ['It starts as a caterpillar.', 'It has big, bright wings.'] },
    { a: 'Cat', b: 'Dog', pa: 'cat', pb: 'dog', both: ['It has four legs.', 'It can be a pet.'], onlyA: ['It purrs.', 'It climbs trees.'], onlyB: ['It barks.', 'It fetches a ball.'] }
  ];
  function cards(p) { return '<div class="wpics">' + W.passage(p.a, p.both.concat(p.onlyA), { pics: [p.pa] }) + W.passage(p.b, p.both.concat(p.onlyB), { pics: [p.pb] }) + '</div>'; }
  function compare(lv) {
    var p = R.pick(PAIRS), both = R.pick(p.both), a = R.pick(p.onlyA), b = R.pick(p.onlyB);
    return Q.one('Which is true of <b>both</b>?', both, lv > 1 ? [a, b] : [R.pick([a, b])], { fig: cards(p), prompt: 'Find a sentence that is in both cards.',
      hint: 'It must be in both cards.', explain: 'Both: ' + both, meta: { k: 'g2-compare-both' } });
  }
  function contrast() {
    var p = R.pick(PAIRS), onlyB = R.int(0, 1) === 1, s = R.pick(onlyB ? p.onlyB : p.onlyA);
    return Q.tiles('Which one is this true of? <b>' + s + '</b>', onlyB ? p.b : p.a, [onlyB ? p.a : p.b, 'both'], { fig: cards(p), hint: 'Find the sentence. Which card is it in?',
      explain: 'Only the ' + (onlyB ? p.b : p.a).toLowerCase() + '.', meta: { k: 'g2-contrast', s: s } });
  }
  function different(lv) {
    var p = R.pick(PAIRS), a = R.pick(p.onlyA), b = R.pick(p.onlyB);
    return Q.all('Pick every way they are <b>different</b>.', [a, b], R.some(p.both, lv > 1 ? 2 : 1), { fig: cards(p), hint: 'A difference is in only one card.',
      explain: 'Only one of them: ' + a + ' ' + b, meta: { k: 'g2-different' } });
  }
  function sortSame() {
    var p = R.pick(PAIRS), s = [R.pick(p.both), R.pick(p.onlyA), R.pick(p.onlyB)];
    return { q: 'Match each sentence to who it is true of.', type: 'match', pairs: [[s[0], 'both'], [s[1], p.a], [s[2], p.b]], fig: cards(p), hint: 'Check each card.',
      explain: 'Same: in both cards. Different: in only one.', meta: { k: 'g2-sort-same' } };
  }

  /* ---------- what does the writer think? (C3.5) ---------- */
  /* short opinions: who, what they say, what they think, and a view they do not hold */
  var SAYS = [['Noor', 'Winter is the best season. I can skate on the pond every day!', 'Winter is the best season.', 'Winter is too cold.'],
    ['Lucas', 'Our town needs a dog park. Dogs need a safe place to run.', 'The town needs a dog park.', 'Dogs should stay inside.'],
    ['Hana', 'Recess should be longer. We need time to play and rest.', 'Recess should be longer.', 'Recess is not needed.'],
    ['Ethan', 'Everyone should ride a bike to school. It is fun and keeps the air clean.', 'Kids should bike to school.', 'Bikes are not safe.'],
    ['Sofia', 'Our class should plant a garden. We could grow food to share.', 'The class should plant a garden.', 'Gardens are a waste of time.'],
    ['Jayden', 'Libraries are the best place in town. You can borrow books for free!', 'Libraries are great.', 'Libraries are boring.']];
  function letters() { return T.list('view'); }
  function perspective(lv) {
    var t = R.pick(letters()), v = t.view;
    return Q.one('What does <b>' + v.who + '</b> think?', v.thinks, v.wrong.slice(0, lv > 1 ? 2 : 1), { fig: T.show(t), prompt: 'Who wrote it? What do they want?',
      hint: 'Look at what ' + v.who + ' asks for, and the reasons.', explain: v.who + ' thinks: ' + v.thinks, meta: { k: 'g2-perspective', t: t.title } });
  }
  function reason(lv) {
    var t = R.pick(letters()), v = t.view, r = R.pick(v.reasons), other = T.body(t).filter(function (l) { return v.reasons.indexOf(l) < 0; });
    return Q.one('Which sentence is one of <b>' + v.who + AP + 's reasons</b>?', r, R.some(other, lv > 1 ? 2 : 1), { fig: T.show(t), hint: 'A reason tells why.',
      explain: W.sent(r), meta: { k: 'g2-reason', t: t.title } });
  }
  function opinion(lv) {
    var s = R.pick(SAYS), wrong = [s[3]].concat(lv > 1 ? [R.pick(SAYS.filter(function (x) { return x !== s; }))[2]] : []);
    return Q.one('What does <b>' + s[0] + '</b> think?', s[2], wrong, { fig: W.sent(s[0] + ' says: ' + Q1 + s[1] + Q2), hint: 'What does ' + s[0] + ' want, or like?',
      explain: s[0] + ' thinks: ' + s[2], meta: { k: 'g2-opinion', who: s[0] } });
  }
  function opinionTf() {
    var s = R.pick(SAYS), right = R.int(0, 1) === 1, said = right ? s[2] : s[3];
    return { q: Q.name() + ' says ' + s[0] + ' thinks this: <b>' + said + '</b>', fig: W.sent(s[0] + ' says: ' + Q1 + s[1] + Q2), type: 'tf', answer: right,
      why: { options: [s[0] + AP + 's words show it.', s[0] + AP + 's words show the opposite.'], answer: right ? 0 : 1 },
      hint: 'Read ' + s[0] + AP + 's words again.', explain: s[0] + ' thinks: ' + s[2], meta: { k: 'g2-opinion-tf', who: s[0], said: said } };
  }

  /* ---------- worked-example pictures ---------- */
  var frogs = BOOKS[0], pets = CHARTS[0], birds = PAIRS[0], bugs = PAIRS[1];

  Atlas.register('thinking', {
    full: true,
    lessons: [{
      id: 'built', title: 'How texts are built', sub: 'Contents pages, charts, icons, pictures and journals.',
      concepts: [
        { slug: 'features', title: 'Parts that help you find facts', exp: ['C1.3', 'C1.4'], skill: 'features',
          model: [
            step(contents(frogs), 'A <b>table of contents</b>: what is inside, and the page.'),
            step(W.sent('How do tadpoles swim?'), 'I want to know this.'),
            step(W.tile('Tadpoles . . . page 5'), 'Find the part. Follow the dots.'),
            step(chart(pets), 'A <b>chart</b>: facts in rows and columns.'),
            step(W.tile('budgie  |  2'), 'Find the row. Look under Legs.'),
            step(W.means('listen', 'Listen to this part.'), 'An <b>icon</b> stands for something.')
          ],
          guided: [function () { return whichPage(1); }, function () { return readChart(1); }, function () { return iconMeans(1); }],
          check: [function () { return featureJob(2); }, function () { return whichPage(2); }, function () { return readChart(2); }, function () { return pictureFits(2); }, matchFeatures],
          coach: '<p>Pick an information book. Before reading, look at the contents together and choose a page to start on.</p>',
          mistake: '<p>Reading an information book from the first page every time. The contents page lets you jump to what you need.</p>' },
        { slug: 'journal', title: 'A journal tells it day by day', exp: ['C1.3'], skill: 'patterns',
          model: [
            step(T.show(T.beans), 'Headings are days.'),
            step(W.chain(['Monday', 'Thursday', 'Saturday', 'Next Monday']), 'Time order.'),
            step(W.sent('A tiny green shoot poked out.'), 'When? Look at the heading above.'),
            step(W.tile('Thursday')),
            step(T.show(T.seed), 'Instructions go by numbered steps.'),
            step(T.show(T.fox), 'Information goes by topic.')
          ],
          guided: [function () { return pattern(1); }, whichDay, dayOrder],
          check: [function () { return pattern(2); }, whichDay, dayOrder, matchPattern, function () { return pattern(3); }],
          coach: '<p>Keep a short journal together for a week: one line and a picture each day.</p>',
          mistake: '<p>Mixing up the days. Point to each heading and say it in order.</p>' }
      ]
    }, {
      id: 'craft', title: 'The writer' + AP + 's craft', sub: 'Strong words, patterns, similes and sounds.',
      concepts: [
        { slug: 'word-choice', title: 'Words that paint a picture', exp: ['C1.5'], skill: 'craft',
          model: [
            step(W.sent('The dog ate.'), 'Plain.'),
            step(W.sent('The <b>hungry puppy gobbled</b> its dinner.'), 'Now I can see it.'),
            step(W.sent('Mei <b>tiptoed</b> past her sleeping brother.'), 'One exact word shows how.'),
            step(W.passage('', REPEAT[0][0]), 'Now a poem.'),
            step(W.tile('up'), 'It comes back: a pattern.')
          ],
          guided: [function () { return picture(1); }, function () { return exactWord(1); }, repeatWord],
          check: [function () { return picture(2); }, function () { return exactWord(2); }, repeatWord, pictureTf, function () { return exactWord(3); }],
          coach: '<p>Pick a plain sentence from the child' + AP + 's writing and ask: "How can we help the reader see it?"</p>',
          mistake: '<p>Adding lots of words that do not help ("very very very"). One exact word is better.</p>' },
        { slug: 'simile', title: 'A simile compares with like or as', exp: ['C3.1'], skill: 'simile',
          model: [
            step(W.sent('The snow was as soft <b>as</b> a pillow.'), 'Snow and a pillow: both soft.'),
            step(W.web('soft', ['snow', 'a pillow']), 'What is the same about them?'),
            step(W.sent('Mateo ran <b>like</b> the wind.'), 'Mateo and the wind: both fast.'),
            step(W.sent('Mateo ran fast.'), 'Without a simile, it is plain.')
          ],
          guided: [function () { return simile(1); }, function () { return simileWhat(1); }, function () { return simileEnd(1); }],
          check: [function () { return simile(2); }, function () { return simileWhat(2); }, simileTf, function () { return simileEnd(2); }, function () { return simile(3); }],
          coach: '<p>Make up similes on a walk: "The clouds look like..." "The ice is as smooth as..."</p>',
          mistake: '<p>Calling any sentence with "like" a simile ("I like pizza"). A simile compares two things.</p>' },
        { slug: 'consonance', title: 'Sounds that come back', exp: ['C3.1'], skill: 'sounds',
          model: [
            step(W.sent('<b>T</b>ick, <b>t</b>ock, the cloc<b>k</b> <b>t</b>icks.'), 'Listen: t and k again and again.'),
            step(W.icon('listen'), 'It sounds like a clock.'),
            step(W.sent('<b>S</b>ix <b>s</b>nakes <b>s</b>lid pa<b>s</b>t.'), 'Another one. Say it aloud.'),
            step(W.tile('s'), 'The s sound hisses, like a snake.')
          ],
          guided: [function () { return sound(1); }, function () { return whichSound(1); }, soundTap],
          check: [function () { return sound(2); }, function () { return whichSound(2); }, soundTf, soundTap, function () { return sound(3); }],
          coach: '<p>Read poems aloud and clap when a sound comes back. This pattern is called <b>consonance</b>.</p>',
          mistake: '<p>Looking at letters, not sounds. Say it aloud and listen.</p>' }
      ]
    }, {
      id: 'deeper', title: 'Reading between the lines', sub: 'Feelings, comparisons and points of view.',
      concepts: [
        { slug: 'infer', title: 'Work out what is not said', exp: ['C3.2'], skill: 'infer',
          model: [
            step(W.sent('Then the string slipped out of his hand!'), 'It does not say how Kai feels.'),
            step(W.means('think', 'He lost his kite. He is <b>worried</b>.'), 'Clue plus what I know.'),
            step(W.sent('Ava' + AP + 's lip shook, and a tear ran down her cheek.'), 'Another clue: what Ava does.'),
            step(W.means('think', 'Ava is <b>sad</b>.'), 'Actions show feelings.')
          ],
          guided: [function () { return infer(1); }, function () { return showFeeling(1); }, function () { return evidence(1); }],
          check: [function () { return infer(2); }, function () { return showFeeling(2); }, function () { return evidence(2); }, function () { return inferTap(2); }, function () { return infer(3); }],
          coach: '<p>Ask "How do you know?" after every answer about feelings. Point to the words together.</p>',
          mistake: '<p>Guessing with no clue. The text must show it somehow.</p>' },
        { slug: 'compare', title: 'Same and different', exp: ['C3.3'], skill: 'compare',
          model: [
            step(cards(birds), 'Two birds.'),
            step(W.sent('It swims on lakes.'), 'In both cards: the same.'),
            step(W.sent('It dives for fish.'), 'Only the loon: different.'),
            step(cards(bugs), 'Now two bugs.'),
            step(W.sent('It visits flowers.'), 'Both.'),
            step(W.sent('It makes honey.'), 'Only the bee.')
          ],
          guided: [function () { return compare(1); }, contrast, function () { return different(1); }],
          check: [function () { return compare(2); }, contrast, sortSame, function () { return different(2); }, function () { return compare(3); }],
          coach: '<p>Compare two things at home (two fruits, two toys): one way they are the same, one way they are different.</p>',
          mistake: '<p>Choosing something true of only one. Check that it is in both cards.</p>' },
        { slug: 'perspective', title: 'What does the writer think?', exp: ['C3.5'], skill: 'perspective',
          model: [
            step(T.show(T.bench), 'A letter from Amara.'),
            step(W.sent('Please put a bench in our schoolyard.'), 'What she wants.'),
            step(W.sent('Some students get tired at recess and need to rest.'), 'Her reason.'),
            step(W.sent('Noor says: ' + Q1 + 'Winter is the best season. I can skate on the pond every day!' + Q2), 'Another view.'),
            step(W.means('think', 'Noor thinks winter is best.'), 'Skating is her reason.')
          ],
          guided: [function () { return perspective(1); }, function () { return opinion(1); }, function () { return reason(1); }],
          check: [function () { return perspective(2); }, function () { return reason(2); }, function () { return opinion(2); }, opinionTf, function () { return reason(3); }],
          coach: '<p>Ask: "Do you agree with Amara? Would her letter change the principal' + AP + 's mind? Why?"</p>',
          mistake: '<p>Mixing up what the writer thinks with what the child thinks. Ask: "What does Amara think?"</p>' }
      ]
    }],
    practice: [
      { id: 'features', name: 'Text features', code: 'C1.3, C1.4', gen: featureJob },
      { id: 'patterns', name: 'How a text is put in order', code: 'C1.3', gen: pattern },
      { id: 'craft', name: 'Words that paint a picture', code: 'C1.5', gen: picture },
      { id: 'simile', name: 'Similes', code: 'C3.1', gen: simile },
      { id: 'sounds', name: 'Sounds that come back', code: 'C3.1', gen: sound },
      { id: 'infer', name: 'Work out what is not said', code: 'C3.2', gen: infer },
      { id: 'compare', name: 'Same and different', code: 'C3.3', gen: compare },
      { id: 'perspective', name: 'What does the writer think?', code: 'C3.5', gen: perspective }
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
    features: [[1, 'page', whichPage], [1, 'chart', readChart], [1, 'icon', iconMeans], [1, 'picture', pictureFits], [2, 'match', matchFeatures]],
    patterns: [[1, 'which-day', whichDay], [1, 'day-order', dayOrder], [2, 'match', matchPattern]],
    craft: [[1, 'exact-word', exactWord], [1, 'repeat', repeatWord], [2, 'tf', pictureTf]],
    simile: [[1, 'compares-to', simileWhat], [1, 'finish', simileEnd], [2, 'tf', simileTf]],
    sounds: [[1, 'which-sound', whichSound], [1, 'tap-line', soundTap], [2, 'tf', soundTf]],
    infer: [[1, 'show-feeling', showFeeling], [1, 'evidence', evidence], [2, 'tap', inferTap]],
    compare: [[1, 'contrast', contrast], [1, 'different', different], [2, 'sort', sortSame]],
    perspective: [[1, 'opinion', opinion], [1, 'reason', reason], [2, 'tf', opinionTf]]
  });
})();
