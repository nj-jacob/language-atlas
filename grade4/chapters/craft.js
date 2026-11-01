/* Grade 4: how texts work. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 4, Strand C:
   C1.3 text patterns (such as spatial order in a graphic text) and text features (such as type styles and hyperlinks), and how they help
   C1.4 how images, graphics and visual design create and contribute to meaning
   C1.5 elements of style: voice, word choice, word patterns and sentence structure
   C3.1 literary devices, including personification and anthropomorphism
   Pictures are drawn here in the page's own colours (currentColor). All texts are written for this site.
   Answer checks: tests/verify/grade4-craft.js (they read the pictures back to work out the answer). */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- type styles, links and other features (C1.3) ---------- */
  var FEATURES = [['bold type', 'shows an important word'], ['a hyperlink', 'takes you to another page online'], ['a caption', 'tells about a picture'],
    ['a heading', 'tells what one part is about'], ['a glossary', 'explains hard words'], ['italics', 'makes a word stand out, like a word from another language'],
    ['a table of contents', 'shows where each part starts'], ['a label', 'names a part of a picture']];
  /* small web pages: each feature can be tapped */
  var PAGES = [{ title: 'Monarchs', head: 'Food', before: 'Caterpillars eat only ', bold: 'milkweed', mid: '. In Spanish, a butterfly is a ', ital: 'mariposa', link: 'how to plant milkweed', caption: 'A monarch rests on a milkweed leaf.' },
    { title: 'Inuksuit', head: 'Finding the way', before: 'An inuksuk is built from ', bold: 'stones', mid: '. The word comes from ', ital: 'Inuktitut', link: 'the flag of Nunavut', caption: 'An inuksuk stands on the tundra.' },
    { title: 'Maple Syrup', head: 'Spring sap', before: 'Sap flows when nights are cold and days are ', bold: 'warm', mid: '. In French, a sugar shack is a ', ital: 'cabane à sucre', link: 'how sap is boiled', caption: 'Buckets hang on maple trees.' }];
  function page(p) {
    return W.passage(p.title, ['<b class="psh" data-hit="heading">' + p.head + '</b>', p.before + '<b data-hit="bold">' + p.bold + '</b>' + p.mid + '<i data-hit="italics">' + p.ital + '</i>.',
      'Learn more: <u data-hit="link">' + p.link + '</u>', '<small data-hit="caption">' + p.caption + '</small>']);
  }
  var TAPNAME = { heading: 'the heading', bold: 'the word in bold type', italics: 'the words in italics', link: 'the hyperlink', caption: 'the caption' };
  function featureJob(lv) {
    var f = R.pick(FEATURES);
    return Q.one('What does <b>' + f[0] + '</b> do?', f[1], R.some(FEATURES.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Think of where you see ' + f[0] + '.', explain: cap(f[0]) + ' ' + f[1] + '.', meta: { k: 'g4-feature', f: f[0] } });
  }
  function featureFor(lv) {
    var f = R.pick(FEATURES);
    return Q.tiles('You want something that <b>' + f[1] + '</b>. Which feature?', f[0], R.some(FEATURES.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Picture an information book or a web page.', explain: cap(f[0]) + ' ' + f[1] + '.', meta: { k: 'g4-feature-for', job: f[1] } });
  }
  function featureMatch(lv) {
    var fs = R.some(FEATURES, lv > 1 ? 4 : 3);
    return { q: 'Match each feature to its job.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Picture a web page or an information book.', explain: 'Features help you find and understand information.', meta: { k: 'g4-feature-match' } };
  }
  function tapPage() {
    var k = R.pick(Object.keys(TAPNAME)), p = R.pick(PAGES);
    return { q: 'Tap <b>' + TAPNAME[k] + '</b>.', type: 'tap', pic: page(p), answer: k, answerText: TAPNAME[k],
      hint: 'Bold is thick. Italics lean. A hyperlink is underlined. A caption sits under a picture.', explain: 'That is ' + TAPNAME[k] + '.', meta: { k: 'g4-tap-page', want: k } };
  }
  function featureTf() {
    var f = R.pick(FEATURES), right = R.int(0, 1) === 1, job = right ? f[1] : R.pick(FEATURES.filter(function (x) { return x !== f; }))[1];
    return { q: Q.name() + ' says: <b>' + cap(f[0]) + ' ' + job + '.</b>', type: 'tf', answer: right,
      why: { options: ['That is its job.', 'Another feature does that.'], answer: right ? 0 : 1 },
      hint: 'What does ' + f[0] + ' do?', explain: cap(f[0]) + ' ' + f[1] + '.', meta: { k: 'g4-feature-tf', f: f[0], job: job } };
  }

  /* ---------- reading a diagram in order (C1.3) ---------- */
  /* each diagram: its parts in order, and the way to read it (down: top to bottom; across: left to right) */
  var DIAGRAMS = [{ name: 'the layers of a forest', way: 'down', parts: ['canopy', 'understory', 'shrubs', 'forest floor'] },
    { name: 'the layers of soil', way: 'down', parts: ['leaf litter', 'topsoil', 'subsoil', 'bedrock'] },
    { name: 'a frozen lake', way: 'down', parts: ['snow', 'ice', 'cold water', 'mud'] },
    { name: 'the life of a monarch', way: 'across', parts: ['egg', 'caterpillar', 'chrysalis', 'butterfly'] },
    { name: 'making maple syrup', way: 'across', parts: ['tap the tree', 'collect sap', 'boil it', 'bottle it'] },
    { name: 'a seed grows', way: 'across', parts: ['seed', 'sprout', 'seedling', 'plant'] }];
  var WAY = { down: 'top to bottom', across: 'left to right' };
  function diagram(d, hit) {
    var lab = function (l, x, y, size, mid) { return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" fill="currentColor"' + (mid ? ' text-anchor="middle"' : '') + (hit ? ' data-hit="' + l + '"' : '') + '>' + l + '</text>'; };
    if (d.way === 'down') return '<svg viewBox="0 0 260 200" width="260" height="200" role="img" aria-label="' + d.name + '">' +
      d.parts.map(function (l, i) { var y = 6 + i * 48; return '<rect x="6" y="' + y + '" width="248" height="44" rx="6" fill="currentColor" opacity="' + (0.08 + i * 0.1).toFixed(2) + '"/>' + lab(l, 20, y + 28, 15); }).join('') + '</svg>';
    return '<svg viewBox="0 0 308 80" width="308" height="80" role="img" aria-label="' + d.name + '">' +
      d.parts.map(function (l, i) { var x = 2 + i * 78; return '<rect x="' + x + '" y="14" width="68" height="52" rx="8" fill="none" stroke="currentColor" stroke-width="2"/>' + lab(l, x + 34, 45, l.length > 9 ? 10 : 12, true) +
        (i < 3 ? '<path d="M' + (x + 69) + ' 40h8m-4-4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2"/>' : ''); }).join('') + '</svg>';
  }
  function partsOrder(lv) {
    var d = R.pick(DIAGRAMS), parts = lv > 1 ? d.parts.slice() : d.parts.slice(0, 3);
    return { q: 'This diagram shows ' + d.name + '. Read it ' + WAY[d.way] + '. Put the parts in that order.', fig: diagram(d, false), type: 'order', items: parts, first: d.way === 'down' ? 'Top' : 'Left', last: d.way === 'down' ? 'Bottom' : 'Right',
      hint: 'Start at the ' + (d.way === 'down' ? 'top' : 'left') + ' and move ' + (d.way === 'down' ? 'down' : 'right') + '.', explain: 'Diagrams are read in an order: ' + WAY[d.way] + '.', meta: { k: 'g4-parts-order', d: d.name } };
  }
  function partTap() {
    var d = R.pick(DIAGRAMS), start = R.int(0, 1) === 1, l = d.parts[start ? 0 : d.parts.length - 1], where = d.way === 'down' ? (start ? 'at the top' : 'at the bottom') : (start ? 'first' : 'last');
    return { q: 'This diagram shows ' + d.name + '. Tap the part that comes <b>' + where + '</b>.', type: 'tap', pic: diagram(d, true), answer: l, answerText: l,
      hint: 'Look at where each label sits.', explain: '<b>' + l + '</b> comes ' + where + '.', meta: { k: 'g4-part-tap', start: start } };
  }
  function whichWay() {
    var d = R.pick(DIAGRAMS);
    return Q.tiles('Which way do you read this diagram?', WAY[d.way], [WAY[d.way === 'down' ? 'across' : 'down'], 'in a circle'], { fig: diagram(d, false),
      hint: 'Where do the parts start, and where do the arrows or layers go?', explain: 'You read it <b>' + WAY[d.way] + '</b>.', meta: { k: 'g4-which-way' } });
  }
  function partNext(lv) {
    var d = R.pick(DIAGRAMS), i = R.int(0, 2), wrong = d.parts.filter(function (p, j) { return j !== i + 1 && j !== i; });
    return Q.one('In the diagram, what comes right after <b>' + d.parts[i] + '</b>?', d.parts[i + 1], R.some(wrong, lv > 1 ? 2 : 1), { fig: diagram(d, false),
      hint: 'Find it, then move one step ' + (d.way === 'down' ? 'down' : 'right') + '.', explain: d.parts[i] + ', then <b>' + d.parts[i + 1] + '</b>.', meta: { k: 'g4-part-next', after: d.parts[i] } });
  }

  /* ---------- pictures and graphs (C1.4) ---------- */
  var DAYS = ['Mon', 'Tue', 'Wed', 'Thu'];
  var TOPICS = ['Birds at our feeder', 'Books our class read', 'Goals our team scored', 'Rain at camp, in millimetres'];
  /* a bar graph with a scale; the counts are different so there is one most and one least */
  function graph(counts) {
    var ticks = [0, 2, 4, 6, 8, 10].map(function (n) { var y = 160 - n * 14; return '<text x="22" y="' + (y + 5) + '" font-size="11" text-anchor="end" fill="currentColor">' + n + '</text><path d="M28 ' + y + 'h4" stroke="currentColor"/>'; }).join('');
    return '<svg viewBox="0 0 260 190" width="260" height="190" role="img" aria-label="a bar graph, one bar each day">' +
      '<path d="M32 160H250M32 160V10" stroke="currentColor" stroke-width="2"/>' + ticks +
      counts.map(function (c, i) { var h = c * 14, x = 47 + i * 52; return '<rect data-day="' + DAYS[i] + '" x="' + x + '" y="' + (160 - h) + '" width="32" height="' + h + '" fill="currentColor" opacity=".55"/>' +
        '<text x="' + (x + 16) + '" y="180" font-size="14" text-anchor="middle" fill="currentColor">' + DAYS[i] + '</text>'; }).join('') + '</svg>';
  }
  function counts() { return R.some([2, 4, 6, 8, 10], 4); }
  function graphRead(lv) {
    var c = counts(), most = lv > 1 ? R.int(0, 1) === 1 : true, v = most ? Math.max.apply(null, c) : Math.min.apply(null, c), d = DAYS[c.indexOf(v)], topic = R.pick(TOPICS);
    return Q.tiles(topic + '. On which day was the count the <b>' + (most ? 'highest' : 'lowest') + '</b>?', d, DAYS.filter(function (x) { return x !== d; }), { fig: graph(c),
      prompt: 'Find the ' + (most ? 'tallest' : 'shortest') + ' bar.', hint: 'A taller bar means more.', explain: 'The ' + (most ? 'tallest' : 'shortest') + ' bar is <b>' + d + '</b>.', meta: { k: 'g4-graph', topic: topic } });
  }
  function graphHowMany() {
    var c = counts(), i = R.int(0, 3), topic = R.pick(TOPICS);
    return Q.tiles(topic + '. What was the count on <b>' + DAYS[i] + '</b>?', String(c[i]), [2, 4, 6, 8, 10].filter(function (n) { return n !== c[i]; }).slice(0, 3).map(String), { fig: graph(c),
      prompt: 'Find the top of the bar. Look across to the numbers.', hint: 'Run your finger from the top of the bar to the scale.', explain: 'The bar for ' + DAYS[i] + ' reaches <b>' + c[i] + '</b>.', meta: { k: 'g4-graph-count', day: DAYS[i] } });
  }
  function graphWhy() {
    var topic = R.pick(TOPICS);
    return Q.one(topic + '. Why use a bar graph instead of a list of numbers?', 'to compare the days at a glance', ['to tell a story', 'to make the page longer'], { fig: graph(counts()),
      hint: 'What can you see quickly?', explain: 'A bar graph lets you compare amounts at a glance.', meta: { k: 'g4-graph-why' } });
  }
  /* [a visual choice, what it does for the reader] */
  var DESIGN = [['a big, bold title', 'catches your eye and names the topic'], ['a photo of the real animal', 'shows what it really looks like'], ['arrows in a diagram', 'show the order or direction'],
    ['a map', 'shows where things are'], ['a bar graph', 'compares amounts'], ['a timeline', 'shows when things happened'], ['a close-up picture', 'shows small details'], ['bright colours on a poster', 'grab attention from far away']];
  function designWhy(lv) {
    var d = R.pick(DESIGN);
    return Q.one('Why would a writer use <b>' + d[0] + '</b>?', d[1], R.some(DESIGN.filter(function (x) { return x !== d; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'What does it help the reader see?', explain: cap(d[0]) + ' ' + d[1] + '.', meta: { k: 'g4-design', d: d[0] } });
  }
  function designMatch(lv) {
    var ds = R.some(DESIGN, lv > 1 ? 4 : 3);
    return { q: 'Match each picture or design to its job.', type: 'match', pairs: ds.map(function (d) { return [d[0], d[1]]; }), hint: 'What does each one help you see?', explain: 'Images and design add meaning.', meta: { k: 'g4-design-match' } };
  }

  /* ---------- voice and word choice (C1.5) ---------- */
  /* [an information-book voice, a chatty voice] */
  var VOICE = [['Monarch butterflies travel up to 4000 km each fall.', 'Guess what? Monarchs fly sooo far every fall!'], ['The museum opens at 10 a.m. on weekdays.', 'The museum opens at ten, so don' + AP + 't be late, okay?'],
    ['Beavers build dams from sticks and mud.', 'Beavers are, like, the best builders ever!'], ['Maple sap flows in early spring.', 'Spring is here, and the sap is going wild!'],
    ['Snowy owls hunt during the day.', 'Hey, did you know snowy owls hunt in the daytime?'], ['Lacrosse is played with a stick and a ball.', 'Lacrosse is so much fun, you have to try it!'],
    ['A moose can weigh more than 400 kg.', 'Whoa, a moose is super heavy!'], ['The library closes at 6 p.m.', 'Hurry, the library closes soon!']];
  /* [sentence with a gap, a strong verb, a plain verb] */
  var VERB = [['The wind ___ the door shut.', 'slammed', 'moved'], ['The hungry puppy ___ its food.', 'gobbled', 'ate'], ['The runner ___ across the finish line.', 'dashed', 'went'],
    ['Snow ___ softly onto the roof.', 'drifted', 'came'], ['The campfire ___ in the dark.', 'crackled', 'was'], ['The baby ___ when the dog barked.', 'shrieked', 'made a noise'],
    ['The canoe ___ across the calm lake.', 'glided', 'went'], ['Thunder ___ over the hills.', 'rumbled', 'happened'], ['Maya ___ the last cookie from the plate.', 'snatched', 'got'],
    ['The tired hiker ___ up the hill.', 'trudged', 'walked']];
  var STRONG = VERB.map(function (v) { return v[1]; });
  function voice(lv) {
    var v = R.pick(VOICE), formal = R.int(0, 1) === 1, others = VOICE.filter(function (x) { return x !== v; });
    return Q.one('Which sounds like ' + (formal ? 'an <b>information book</b>' : 'a <b>friend talking</b>') + '?', formal ? v[0] : v[1], [formal ? v[1] : v[0]].concat(lv > 1 ? [R.pick(others)[formal ? 1 : 0]] : []), {
      hint: 'Information books sound calm and exact. Friends sound chatty.', explain: 'The writer' + AP + 's <b>voice</b> fits the kind of text.', meta: { k: 'g4-voice', formal: formal } });
  }
  function voiceWhere() {
    var v = R.pick(VOICE), formal = R.int(0, 1) === 1;
    return { q: 'Where would you most likely read this?', fig: W.sent(formal ? v[0] : v[1]), type: 'tap', tiles: ['an information book', 'a text message to a friend'], answer: formal ? 0 : 1,
      prompt: 'Is it calm and exact, or chatty?', hint: 'Chatty voices use words like hey, so and whoa.', explain: formal ? 'Calm and exact: an information book.' : 'Chatty: a message to a friend.', meta: { k: 'g4-voice-where', s: formal ? v[0] : v[1] } };
  }
  function strongVerb(lv) {
    var v = R.pick(VERB), others = VERB.filter(function (x) { return x !== v; });
    return Q.tiles('Which verb helps you <b>see and hear</b> it?', v[1], [v[2]].concat(lv > 1 ? [R.pick(others)[2]] : []), { fig: W.sent(v[0].replace('___', W.gap())), hint: 'Which one shows exactly how?',
      explain: W.sent(v[0].replace('___', '<b>' + v[1] + '</b>')), meta: { k: 'g4-strong-verb', s: v[0] } });
  }
  function verbTf() {
    var v = R.pick(VERB), right = R.int(0, 1) === 1, w = right ? v[1] : v[2];
    return { q: Q.name() + ' says <b>' + w + '</b> is the stronger verb here.', fig: W.sent(v[0].replace('___', W.gap())), type: 'tf', answer: right,
      why: { options: ['It shows exactly how it happened.', 'It is plain. Another word shows it better.'], answer: right ? 0 : 1 },
      hint: 'Can you see and hear it?', explain: W.sent(v[0].replace('___', '<b>' + v[1] + '</b>')), meta: { k: 'g4-verb-tf', w: w } };
  }

  /* ---------- sentence length and word patterns (C1.5) ---------- */
  var SUSPENSE = ['The door creaked. Footsteps. Closer. Then silence.', 'Kai froze. A twig snapped. Something was there.', 'The lights went out. Nobody moved. A drip. Another drip.',
    'The ice cracked. Noor stopped. Another crack. Louder.', 'A shadow moved. Ben gasped. It was coming.', 'Knock. Knock. Nobody was expected. The handle turned.'];
  var CALM = ['We walked slowly along the quiet beach while the waves rolled gently onto the sand.', 'The cat stretched out in the warm sunshine and slept the whole afternoon away.',
    'Grandma hummed as she stirred the soup, and the kitchen filled with a warm smell.', 'The canoe drifted across the still lake as the sun slipped behind the hills.',
    'Snow fell softly all evening, covering the yard in a thick white blanket.', 'We sat by the fire and listened to the loons calling across the water.'];
  /* repeated sounds or words */
  var PATTERN = ['Slowly, slowly, the snail slid home.', 'Big brown bears bounce on the banks.', 'Drip, drop, drip, the rain will not stop.', 'Round and round and round we went.',
    'Six silly seals sang songs.', 'Tick, tock, tick, tock, went the clock.'];
  var NOPATTERN = ['The snail went home after lunch.', 'Two bears walked by the river.', 'It rained all day on Tuesday.', 'We rode the merry-go-round.', 'The seals swam near the dock.', 'The clock was on the wall.'];
  function suspense(lv) {
    return Q.one('Which builds <b>suspense</b>?', R.pick(SUSPENSE), R.some(CALM, lv > 1 ? 2 : 1), { prompt: 'Read each in your head. Which one makes you hold your breath?',
      hint: 'Short sentences make the reader read faster and feel tense.', explain: 'Short, choppy sentences build suspense.', meta: { k: 'g4-suspense' } });
  }
  function calm(lv) {
    return Q.one('Which feels <b>calm and slow</b>?', R.pick(CALM), R.some(SUSPENSE, lv > 1 ? 2 : 1), { hint: 'Long, flowing sentences slow the reader down.', explain: 'Long, flowing sentences feel calm.', meta: { k: 'g4-calm' } });
  }
  function whyShort() {
    return Q.one('Why does the writer use such short sentences?', 'to build suspense', ['to explain a fact', 'to sound calm and sleepy'], { fig: W.sent(R.pick(SUSPENSE)),
      hint: 'How does it feel to read?', explain: 'Short sentences speed you up and build suspense.', meta: { k: 'g4-why-short' } });
  }
  function pattern(lv) {
    var i = R.int(0, PATTERN.length - 1);
    return Q.one('Which uses a <b>word pattern</b>: repeated sounds or words?', PATTERN[i], [NOPATTERN[i]].concat(lv > 1 ? R.some(NOPATTERN.filter(function (p, j) { return j !== i; }), 1) : []), {
      hint: 'Listen for the same sound or word again and again.', explain: W.sent(PATTERN[i]) + ' The repeats make it fun to say.', meta: { k: 'g4-pattern' } });
  }
  function styleTf() {
    var short = R.int(0, 1) === 1, s = short ? R.pick(SUSPENSE) : R.pick(CALM), right = R.int(0, 1) === 1, said = right === short ? 'tense' : 'calm';
    return { q: Q.name() + ' says this feels <b>' + said + '</b>.', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['Short, choppy sentences feel tense.', 'Long, flowing sentences feel calm.'], answer: short ? 0 : 1 },
      hint: 'Are the sentences short or long?', explain: short ? 'Short and choppy: tense.' : 'Long and flowing: calm.', meta: { k: 'g4-style-tf', s: s, said: said } };
  }

  /* ---------- personification (C3.1) ---------- */
  /* [sentence, the human word, a plain version] */
  var PERSON = [['The old maple stretches its arms to the sky.', 'stretches its arms', 'The old maple is very tall.'], ['The wind whispered through the pines.', 'whispered', 'The wind blew through the pines.'],
    ['The sun smiled down on the beach.', 'smiled', 'The sun was bright over the beach.'], ['The kettle sang on the stove.', 'sang', 'The kettle boiled on the stove.'],
    ['The stars winked at us.', 'winked', 'The stars were bright.'], ['Thunder grumbled in the distance.', 'grumbled', 'Thunder was loud far away.'],
    ['The old car coughed up the hill.', 'coughed', 'The old car went slowly up the hill.'], ['The waves danced on the lake.', 'danced', 'The waves moved on the lake.'],
    ['My alarm clock yelled at me to get up.', 'yelled', 'My alarm clock rang loudly.'], ['The flowers nodded in the breeze.', 'nodded', 'The flowers moved in the breeze.']];
  var WHYPERSON = 'It makes the thing feel alive, so you can picture it.';
  function person(lv) {
    var p = R.pick(PERSON), others = PERSON.filter(function (x) { return x !== p; });
    return Q.one('Which sentence uses <b>personification</b>?', p[0], [p[2]].concat(lv > 1 ? [R.pick(others)[2]] : []), {
      prompt: 'Does a thing do something only a person can do?', hint: 'Personification gives a thing human actions.', explain: W.sent(p[0]) + ' A thing acts like a person.', meta: { k: 'g4-person' } });
  }
  function personWord() {
    var p = R.pick(PERSON), words = p[0].replace(/[.,]/g, '').split(' '), human = p[1].split(' ')[0], wrong = R.some(words.filter(function (w) { return p[1].split(' ').indexOf(w) < 0 && w.length > 2 && w !== 'The'; }), 2);
    return Q.tiles('Which word makes it act like a <b>person</b>?', human, wrong, { fig: W.sent(p[0]), prompt: 'What does it do that only a person could do?',
      hint: 'Look at the action word.', explain: 'Only a person can really <b>' + human + '</b>.', meta: { k: 'g4-person-word', s: p[0] } });
  }
  function personTf() {
    var p = R.pick(PERSON), right = R.int(0, 1) === 1, s = right ? p[0] : p[2];
    return { q: Q.name() + ' says this sentence uses <b>personification</b>.', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['A thing does something only a person can do.', 'Nothing acts like a person.'], answer: right ? 0 : 1 },
      hint: 'Is a thing acting like a person?', explain: right ? 'The thing acts like a person.' : 'It just says what happens.', meta: { k: 'g4-person-tf', s: s } };
  }
  function personWhy() {
    var p = R.pick(PERSON);
    return Q.one('Why did the writer say it this way?', WHYPERSON, ['It gives you a fact to learn.', 'It makes the sentence shorter.'], { fig: W.sent(p[0]),
      hint: 'How does it change the picture in your mind?', explain: WHYPERSON, meta: { k: 'g4-person-why' } });
  }

  /* ---------- animals who act like people: anthropomorphism (C3.1) ---------- */
  /* [an animal acting like a person, the human part, the same animal acting like an animal] */
  var ANIMAL = [['Crow put on her reading glasses and opened a shop.', 'put on her reading glasses', 'The crow picked up a shiny button.'], ['The bear family ate pancakes with forks.', 'ate pancakes with forks', 'The bear caught a fish in the river.'],
    ['Rabbit packed a suitcase for her trip to the city.', 'packed a suitcase', 'The rabbit hopped into its burrow.'], ['Two raccoons argued about whose turn it was to drive.', 'argued about whose turn it was to drive', 'Two raccoons dug through the leaves.'],
    ['Otter said, ' + '“' + 'Next winter, we will be ready together.' + '”', 'said', 'The otter slid down the muddy bank.'], ['Moose wrote a letter to the mayor.', 'wrote a letter', 'The moose waded into the lake.'],
    ['Goose read a map to plan the trip south.', 'read a map', 'The goose flew south with its flock.'], ['Squirrel opened a bank for acorns.', 'opened a bank', 'The squirrel buried an acorn.']];
  var WHYFABLE = 'Animals make the lesson easy to see and remember.';
  function animal(lv) {
    var a = R.pick(ANIMAL), others = ANIMAL.filter(function (x) { return x !== a; });
    return Q.one('Which shows an animal acting like a <b>person</b>?', a[0], [a[2]].concat(lv > 1 ? [R.pick(others)[2]] : []), {
      hint: 'Real animals do not wear glasses, write or drive.', explain: 'This is <b>anthropomorphism</b>: an animal acts like a person.', meta: { k: 'g4-animal' } });
  }
  function whichDevice() {
    var thing = R.int(0, 1) === 1, s = thing ? R.pick(PERSON)[0] : R.pick(ANIMAL)[0];
    return { q: 'Which device is this?', fig: W.sent(s), type: 'tap', tiles: ['personification', 'anthropomorphism'], answer: thing ? 0 : 1,
      prompt: 'Is it a thing, or an animal, acting like a person?', hint: 'A thing acting human: personification. An animal acting human: anthropomorphism.',
      explain: thing ? 'A thing acts like a person: <b>personification</b>.' : 'An animal acts like a person: <b>anthropomorphism</b>.', meta: { k: 'g4-which-device', s: s } };
  }
  function animalPart() {
    var a = R.pick(ANIMAL), who = a[0].slice(0, a[0].indexOf(a[1])).trim();
    return Q.one('Which part shows the animal acting like a person?', a[1], [who, 'nothing: a real animal could do this'], { fig: W.sent(a[0]),
      hint: 'What does it do that a real animal could not?', explain: 'A real animal could not ' + a[1] + '.', meta: { k: 'g4-animal-part', s: a[0] } });
  }
  function animalTf() {
    var a = R.pick(ANIMAL), right = R.int(0, 1) === 1, s = right ? a[0] : a[2];
    return { q: Q.name() + ' says the animal here acts like a <b>person</b>.', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['A real animal could not do this.', 'A real animal could do this.'], answer: right ? 0 : 1 },
      hint: 'Could a real animal do it?', explain: right ? 'Only a person could do that.' : 'A real animal does that.', meta: { k: 'g4-animal-tf', s: s } };
  }
  function animalWhy() {
    return Q.one('Why do fables often use animals who act like people?', WHYFABLE, ['Animals cannot really talk.', 'Fables are only for very young children.'], { fig: W.sent(R.pick(ANIMAL)[0]),
      hint: 'What is a fable for?', explain: WHYFABLE, meta: { k: 'g4-animal-why' } });
  }

  var MON = PAGES[0], forest = DIAGRAMS[0], monarch = DIAGRAMS[3];
  Atlas.register('craft', {
    full: true,
    lessons: [{
      id: 'features', title: 'Features and visuals', sub: 'Type styles, links, diagrams and graphs.',
      concepts: [
        { slug: 'type', title: 'Bold, italics and links', exp: ['C1.3'], skill: 'features',
          model: [
            step(page(MON), 'A page from a website.'),
            step(W.sent('Caterpillars eat only <b>milkweed</b>.'), '<b>Bold</b>: an important word.'),
            step(W.sent('In Spanish, a butterfly is a <i>mariposa</i>.'), '<i>Italics</i>: a word from another language.'),
            step(W.sent('Learn more: <u>how to plant milkweed</u>'), 'A <b>hyperlink</b> takes you to another page.'),
            step(page(PAGES[1]), 'Another page. Find the same features.'),
            step(W.sent('<small>An inuksuk stands on the tundra.</small>'), 'A <b>caption</b> tells about the picture.')
          ],
          guided: [function () { return featureJob(1); }, tapPage, function () { return featureFor(1); }],
          check: [function () { return featureJob(2); }, tapPage, featureTf, function () { return featureFor(2); }, function () { return featureMatch(2); }],
          coach: '<p>On a kids' + AP + ' website, hunt for bold words, captions and links. Ask: "Why did the writer make this one bold?"</p>',
          mistake: '<p>Skipping bold words and captions. They often hold the most important facts.</p>' },
        { slug: 'spatial', title: 'Read a diagram in order', exp: ['C1.3'], skill: 'diagrams',
          model: [
            step(diagram(forest, false), 'The layers of a forest.'),
            step(W.chain(forest.parts), 'Top to bottom.'),
            step(diagram(monarch, false), 'The life of a monarch.'),
            step(W.chain(monarch.parts), 'Left to right: follow the arrows.')
          ],
          guided: [function () { return partsOrder(1); }, partTap, whichWay],
          check: [function () { return partsOrder(2); }, partTap, function () { return partNext(2); }, whichWay, function () { return partsOrder(3); }],
          coach: '<p>Ask: "Where does this diagram start? Which way does it go?" Run a finger along it before reading the labels.</p>',
          mistake: '<p>Reading labels in a random order. Find the pattern first: top to bottom, or left to right along the arrows.</p>' },
        { slug: 'graphs', title: 'Pictures and graphs add meaning', exp: ['C1.4'], skill: 'visuals',
          model: [
            step(graph([4, 8, 6, 2]), 'Birds counted each day.'),
            step(W.sent('Tue: the tallest bar.'), 'Most birds.'),
            step(W.sent('Thu: the bar reaches 2.'), 'Read across to the scale.'),
            step(W.means('think', 'A graph compares at a glance.')),
            step(W.means('screen', 'A map shows where. A timeline shows when.'), 'Each picture has a job.')
          ],
          guided: [function () { return graphRead(1); }, graphHowMany, function () { return designWhy(1); }],
          check: [function () { return graphRead(2); }, graphHowMany, function () { return designWhy(2); }, graphWhy, function () { return designMatch(2); }],
          coach: '<p>Make a quick bar graph of something at home (socks by colour, birds at a feeder) and ask questions about it.</p>',
          mistake: '<p>Reading the label under the shortest bar as "the most". Check: taller means more.</p>' }
      ]
    }, {
      id: 'style', title: 'The writer' + AP + 's style', sub: 'Voice, word choice, sentence length and word patterns.',
      concepts: [
        { slug: 'voice', title: 'Voice fits the text', exp: ['C1.5'], skill: 'voice',
          model: [
            step(W.sent('Beavers build dams from sticks and mud.'), 'An information book: calm and exact.'),
            step(W.sent('Beavers are, like, the best builders ever!'), 'A friend: chatty.'),
            step(W.sent('The wind ' + W.gap() + ' the door shut.'), 'Now word choice.'),
            step(W.sent('The wind <s>moved</s> <b>slammed</b> the door shut.'), 'A strong verb lets you hear it.')
          ],
          guided: [function () { return voice(1); }, function () { return strongVerb(1); }, voiceWhere],
          check: [function () { return voice(2); }, function () { return strongVerb(2); }, verbTf, voiceWhere, function () { return strongVerb(3); }],
          coach: '<p>Read a page from a science book and a page from a diary-style novel. Ask: "Who does each one sound like?"</p>',
          mistake: '<p>Thinking there is only one right voice. The right voice depends on the kind of text.</p>' },
        { slug: 'sentences', title: 'Short sentences build suspense', exp: ['C1.5'], skill: 'sentence-style',
          model: [
            step(W.sent('The door creaked. Footsteps. Closer.'), 'Short. Tense. You read faster.'),
            step(W.sent('We walked slowly along the quiet beach while the waves rolled gently onto the sand.'), 'Long and flowing: calm.'),
            step(W.sent('<b>Drip, drop, drip</b>, the rain will not stop.'), 'A word pattern: the same sounds again.'),
            step(W.sent('<b>S</b>ix <b>s</b>illy <b>s</b>eals <b>s</b>ang <b>s</b>ongs.'), 'Repeated sounds are fun to say.')
          ],
          guided: [function () { return suspense(1); }, whyShort, function () { return pattern(1); }],
          check: [function () { return suspense(2); }, function () { return calm(2); }, styleTf, function () { return pattern(2); }, whyShort],
          coach: '<p>Read both kinds aloud. Notice how your voice speeds up in the short ones.</p>',
          mistake: '<p>Calling short sentences "bad writing". Writers choose them on purpose.</p>' }
      ]
    }, {
      id: 'devices', title: 'Literary devices', sub: 'Things and animals that act like people.',
      concepts: [
        { slug: 'personification', title: 'Personification', exp: ['C3.1'], skill: 'personify',
          model: [
            step(W.sent('The wind blew through the pines.'), 'Plain.'),
            step(W.sent('The wind <b>whispered</b> through the pines.'), 'Wind cannot really whisper.'),
            step(W.means('think', 'A thing acts like a person.'), 'It feels alive.'),
            step(W.sent('The waves moved on the lake.'), 'Plain again.'),
            step(W.sent('The waves <b>danced</b> on the lake.'), 'Now you can see them move.')
          ],
          guided: [function () { return person(1); }, personWord, personTf],
          check: [function () { return person(2); }, personWord, personWhy, personTf, function () { return person(3); }],
          coach: '<p>Pick an object in the room and make it act human: "The fridge hummed a tune." Ask how it changes the feeling.</p>',
          mistake: '<p>Calling any describing sentence personification. Look for a human action: smile, whisper, sing.</p>' },
        { slug: 'anthropomorphism', title: 'Animals who act like people', exp: ['C3.1'], skill: 'animals',
          model: [
            step(W.sent('The crow picked up a shiny button.'), 'A real crow could do this.'),
            step(W.sent('Crow <b>put on her reading glasses</b> and opened a shop.'), 'A crow acting like a person.'),
            step(W.tile('anthropomorphism'), 'The long name for it.'),
            step(W.sent('The otter slid down the muddy bank.'), 'A real otter.'),
            step(W.sent('Otter <b>said</b>, ' + '“' + 'Next winter, we will be ready together.' + '”'), 'Talking animals teach the lesson in fables.')
          ],
          guided: [function () { return animal(1); }, whichDevice, animalPart],
          check: [function () { return animal(2); }, whichDevice, animalTf, animalPart, animalWhy],
          coach: '<p>Break the long word into parts: anthropo (person) + morph (shape). The animal takes the shape of a person.</p>',
          mistake: '<p>Mixing the two. A thing acting human is personification; an animal acting human is anthropomorphism.</p>' }
      ]
    }],
    practice: [
      { id: 'features', name: 'Bold, italics and links', code: 'C1.3', gen: featureJob },
      { id: 'diagrams', name: 'Read a diagram in order', code: 'C1.3', gen: partsOrder },
      { id: 'visuals', name: 'Pictures and graphs', code: 'C1.4', gen: graphRead },
      { id: 'voice', name: 'Voice and word choice', code: 'C1.5', gen: voice },
      { id: 'sentence-style', name: 'Sentence length and word patterns', code: 'C1.5', gen: suspense },
      { id: 'personify', name: 'Personification', code: 'C3.1', gen: person },
      { id: 'animals', name: 'Animals who act like people', code: 'C3.1', gen: animal }
    ]
  });

  Q.shapes('craft', {
    features: [[1, 'tap-page', tapPage], [1, 'which', featureFor], [2, 'tf', featureTf], [2, 'match', featureMatch]],
    diagrams: [[1, 'tap', partTap], [1, 'which-way', whichWay], [2, 'next', partNext]],
    visuals: [[1, 'count', graphHowMany], [1, 'design', designWhy], [2, 'why-graph', graphWhy], [2, 'match', designMatch]],
    voice: [[1, 'strong-verb', strongVerb], [1, 'where', voiceWhere], [2, 'verb-tf', verbTf]],
    'sentence-style': [[1, 'why-short', whyShort], [1, 'pattern', pattern], [2, 'calm', calm], [2, 'tf', styleTf]],
    personify: [[1, 'word', personWord], [1, 'tf', personTf], [2, 'why', personWhy]],
    animals: [[1, 'which-device', whichDevice], [1, 'part', animalPart], [2, 'tf', animalTf], [2, 'why', animalWhy]]
  });
})();
