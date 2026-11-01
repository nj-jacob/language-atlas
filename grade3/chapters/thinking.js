/* Grade 3: thinking about texts.
   Ontario 2023 Language, Grade 3, Strand C (Comprehension):
   C1.3 text patterns (such as cause and effect) and text features (such as headings and an index)
   C1.4 how images, graphics and visual design are used in a text      C1.5 elements of style: voice, word choice, word patterns
   C3.1 literary devices, including metaphor and assonance             C3.2 inferences from stated and implied information
   C3.3 main and supporting ideas, sequencing, comparing and contrasting C3.5 perspectives in texts, with evidence
   With a grown-up: C3.4 cultural elements in texts, C3.6 thoughts and feelings about ideas such as diversity, inclusion and
   accessibility, C3.7 texts by First Nations, Metis and Inuit creators about history and lived experience, C3.8 thinking skills.
   Passages (with their clues, causes and opinions) are in ../texts.js; everything else is written here for this site.
   Answer checks: tests/verify/grade3-thinking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts, AP = '’', OQ = '“', CQ = '”';
  function text(need, lv, t) { return t || R.pick(T.list(need, lv)); }
  function at(t, words) { return t.lines.findIndex(function (l) { return l.indexOf(words) >= 0; }); }
  function others(list, x) { return list.filter(function (y) { return y !== x; }); }

  /* ---------- text features (C1.3, C1.4): [feature, its job, when you would use it] ---------- */
  var FEATURES = [
    ['title', 'tells what the whole text is about', 'You want to know what the whole book is about.'],
    ['heading', 'tells what one part is about', 'You want to know what one part of the page is about.'],
    ['table of contents', 'lists the chapters at the front', 'You want to see what chapters the book has.'],
    ['index', 'lists topics and their pages at the back', 'You want to find the page about lodges.'],
    ['glossary', 'tells what hard words mean', 'You want to know what a hard word means.'],
    ['caption', 'tells about a picture', 'You want to know what a photo shows.'],
    ['label', 'names a part of a picture', 'You want the name of one part of a drawing.'],
    ['diagram', 'is a drawing that shows how parts fit together', 'You want to see how the parts of a canoe fit together.'],
    ['map', 'shows where places are', 'You want to see where the geese fly in winter.'],
    ['bold print', 'makes an important word stand out', 'You want to spot the most important words.'],
    ['chart', 'shows facts in rows and columns', 'You want to compare how tall three animals are.']
  ];
  /* what you would read about under each heading of the information texts */
  var HEADS = {
    'Busy Beavers': { Home: 'lodges', Teeth: 'chewing wood', Winter: 'swimming under the ice' },
    'Maple Syrup': { 'A long history': 'who made syrup first', Sap: 'how sap starts to flow', Boiling: 'turning sap into syrup' },
    'Snowshoe Hares': { 'Two coats': 'changing colour', 'Big feet': 'hopping on deep snow' },
    'Canada Geese': { 'What they look like': 'the white patch under the chin', 'Flying south': 'the V shape', 'Coming home': 'goslings', 'Staying together': 'honking to keep in touch' },
    'The Three Sisters': { 'Planting together': 'who planted them long ago', 'How the sisters help each other': 'how beans climb the corn', 'Good food': 'saving corn for winter' },
    'The Mighty Moose': { 'The biggest deer': 'antlers', Food: 'eating plants under the water', Winter: 'hollow hairs', Calves: 'baby moose' },
    'The Northern Lights': { 'Lights in the sky': 'the colours of the lights', 'Where to see them': 'the best places to look', 'Names and stories': 'Indigenous names for the lights', 'A tip': 'staying away from city lights' }
  };
  var INFO = T.list('main').filter(function (t) { return HEADS[t.title]; });
  function job(f) { return 'The ' + f[0] + ' ' + f[1] + '.'; }

  function featureJob(lv) {
    var f = R.pick(FEATURES);
    return Q.one('What does the <b>' + f[0] + '</b> do?', f[1], R.some(others(FEATURES, f), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Think of where you see the ' + f[0] + ' in a book.', explain: job(f), meta: { k: 'g3-feature', f: f[0] } });
  }
  function featureUse(lv) {
    var f = R.pick(FEATURES);
    return Q.one(f[2] + ' Which part of the book helps?', f[0], R.some(others(FEATURES, f), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Which one has that job?', explain: job(f), meta: { k: 'g3-feature-use', f: f[0] } });
  }
  function matchFeatures(lv) {
    var fs = R.some(FEATURES, lv > 1 ? 4 : 3);
    return { q: 'Match each part of a book to its job.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Picture an information book.', explain: 'Text features help you find facts and understand pictures.', meta: { k: 'g3-match-features' } };
  }
  function featureTf() {
    var f = R.pick(FEATURES), right = R.int(0, 1) === 1, said = right ? f : R.pick(others(FEATURES, f));
    return { q: Q.name() + ' says: the <b>' + f[0] + '</b> ' + said[1] + '.', type: 'tf', answer: right,
      hint: 'Picture where the ' + f[0] + ' is in a book.', explain: job(f), meta: { k: 'g3-feature-tf', f: f[0], said: said[1] } };
  }
  function whichHeading(lv, t) {
    t = t || R.pick(INFO);
    var h = HEADS[t.title], heads = Object.keys(h), right = R.pick(heads);
    return Q.tiles('Under which heading would you read about <b>' + h[right] + '</b>?', right, R.some(others(heads, right), lv > 1 ? 3 : 2), { fig: T.show(t),
      hint: 'Read the part under each heading.', explain: 'It is under <b>' + right + '</b>.', meta: { k: 'g3-heading', topic: h[right] } });
  }

  /* ---------- cause and effect (C1.3) ---------- */
  var KEEP = /^(Leila|Tala|Omar|Jayden|Mateo|First)\b/;
  function low(s) { return KEEP.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1); }
  function cut(s) { return s.replace(/\.$/, ''); }
  var ALLCAUSE = T.list('cause').reduce(function (a, t) { return a.concat(t.cause); }, []);
  function effectsBut(t, c, n) {
    var near = R.some(others(t.cause, c), n).map(function (x) { return x[1]; });
    return near.concat(R.some(ALLCAUSE.filter(function (x) { return t.cause.indexOf(x) < 0; }), n - near.length).map(function (x) { return x[1]; }));
  }
  function causesBut(t, c, n) {
    var near = R.some(others(t.cause, c), n).map(function (x) { return x[0]; });
    return near.concat(R.some(ALLCAUSE.filter(function (x) { return t.cause.indexOf(x) < 0; }), n - near.length).map(function (x) { return x[0]; }));
  }
  function causeMatch(lv, t) {
    t = text('cause', lv, t);
    return { q: 'Match each cause to what it makes happen.', fig: T.show(t), type: 'match', pairs: R.some(t.cause, 3).map(function (x) { return [x[0], x[1]]; }),
      hint: 'Ask: what happens because of this?', explain: 'A cause makes something happen. That is the effect.', meta: { k: 'g3-cause', t: t.title } };
  }
  function whichEffect(lv, t) {
    t = text('cause', lv, t); var c = R.pick(t.cause);
    return Q.one('<b>Cause:</b> ' + c[0] + ' What happens because of it?', c[1], effectsBut(t, c, lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Find the cause in the text. Read what comes next.', explain: W.chain([c[0], c[1]], ['Cause', 'Effect']), meta: { k: 'g3-effect', c: c[0] } });
  }
  function whichCause(lv, t) {
    t = text('cause', lv, t); var c = R.pick(t.cause);
    return Q.one('<b>Effect:</b> ' + c[1] + ' What made it happen?', c[0], causesBut(t, c, lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Ask: why did this happen?', explain: W.chain([c[0], c[1]], ['Cause', 'Effect']), meta: { k: 'g3-which-cause', e: c[1] } });
  }
  function causeTf(lv, t) {
    t = text('cause', lv, t); var c = R.pick(t.cause), right = R.int(0, 1) === 1, e = right ? c[1] : effectsBut(t, c, 1)[0];
    return { q: 'Does the cause make this happen?', fig: W.chain([c[0], e], ['Cause', 'Effect?']), type: 'tf', answer: right,
      hint: 'Ask: does the first one lead to the second?', explain: W.chain([c[0], c[1]], ['Cause', 'Effect']), meta: { k: 'g3-cause-tf', c: c[0], e: e } };
  }
  function because(lv, t) {
    t = text('cause', lv, t); var c = R.pick(t.cause), right = cut(c[1]) + ' because ' + low(c[0]);
    var wrong = [cut(c[0]) + ' because ' + low(c[1])];
    if (lv > 1) { var d = R.pick(others(t.cause, c)); wrong.push(cut(d[1]) + ' because ' + low(c[0])); }
    return Q.one('Which sentence tells the cause and effect the right way?', right, wrong, { prompt: 'The cause comes after <b>because</b>.',
      hint: 'Which one happened first? It goes after because.', explain: W.chain([c[0], c[1]], ['Cause', 'Effect']), meta: { k: 'g3-because' } });
  }

  /* ---------- word choice and patterns (C1.5) ---------- */
  var PICTURE = [['The dog ate.', 'The hungry dog gobbled its dinner.'], ['It was cold.', 'An icy wind nipped at my cheeks.'], ['The bird sang.', 'A tiny robin sang a bright, cheerful song.'],
    ['We went down the hill.', 'We zoomed down the snowy hill on our toboggan.'], ['The lake was nice.', 'The lake sparkled like glass in the morning sun.'],
    ['The fire was hot.', 'The campfire crackled and popped in the dark.'], ['It rained.', 'Rain drummed on the tin roof all night.'], ['The cat played.', 'The kitten pounced on a ball of red yarn.'],
    ['The moose walked.', 'The huge moose trudged through the deep snow.'], ['The leaves fell.', 'Golden leaves twirled down to the ground.'], ['There was thunder.', 'Thunder rumbled over the dark hills.'],
    ['The goalie got the puck.', 'The goalie snatched the puck out of the air.'], ['The baby laughed.', 'The baby giggled and kicked her feet.'], ['The soup was good.', 'The hot corn soup smelled sweet and smoky.'],
    ['The puppy ran.', 'The puppy scampered across the muddy yard.'], ['The door closed.', 'The heavy door slammed shut with a bang.']];
  /* [sentence with a gap, the strong word, plain words] */
  var BETTER = [['The hungry dog _ its dinner.', 'gobbled', 'ate', 'had'], ['We _ down the snowy hill.', 'zoomed', 'went', 'got'], ['Rain _ on the tin roof.', 'drummed', 'fell', 'was'],
    ['The lake _ in the sun.', 'sparkled', 'was', 'sat'], ['Thunder _ over the hills.', 'rumbled', 'went', 'came'], ['The goalie _ the puck.', 'snatched', 'got', 'had'],
    ['Golden leaves _ to the ground.', 'twirled', 'went', 'came'], ['The campfire _ in the dark.', 'crackled', 'was', 'stayed'], ['The puppy _ across the yard.', 'scampered', 'went', 'moved'],
    ['The baby _ at the bubbles.', 'giggled', 'looked', 'was'], ['The huge moose _ through the snow.', 'trudged', 'went', 'moved'], ['Mia _ the heavy door.', 'slammed', 'closed', 'moved'],
    ['The kitten _ on the yarn.', 'pounced', 'went', 'got'], ['An icy wind _ at my cheeks.', 'nipped', 'was', 'came']];
  var PATTERN = [[['Snow on the roof,', 'snow on the road,', 'snow on my nose!'], 'snow'], [['Splash in the puddle,', 'splash in the rain,', 'splash all the way home!'], 'splash'],
    [['Tap goes the rain,', 'tap on the glass,', 'tap, tap, tap.'], 'tap'], [['Round and round the skaters go,', 'round the rink,', 'round in the snow.'], 'round'],
    [['Up goes the kite,', 'up past the tree,', 'up to the clouds!'], 'up'], [['Hop, little hare,', 'hop through the snow,', 'hop to your home.'], 'hop'],
    [['Paddle the canoe,', 'paddle to shore,', 'paddle home at night.'], 'paddle'], [['Buzz goes the bee,', 'buzz by the flower,', 'buzz, buzz, buzz.'], 'buzz'],
    [['Crunch go my boots,', 'crunch on the path,', 'crunch all the way to school.'], 'crunch']];
  function words(s) { return s.replace(/[,.!?]/g, '').split(' '); }

  function picture(lv) {
    var p = R.pick(PICTURE), wrong = [p[0]];
    if (lv > 1) wrong.push(R.pick(others(PICTURE, p))[0]);
    return Q.one('Which sentence helps you <b>picture</b> it best?', p[1], wrong, { hint: 'Which one uses describing and action words?', explain: 'Strong words help readers see it.', meta: { k: 'g3-picture' } });
  }
  function better(lv) {
    var b = R.pick(BETTER);
    return Q.one('Which word helps you picture it best?', b[1], lv > 1 ? [b[2], b[3]] : [R.pick([b[2], b[3]])], { fig: W.sent(b[0].replace('_', W.gap())),
      hint: 'Which word shows exactly how?', explain: W.sent(b[0].replace('_', '<b>' + b[1] + '</b>')), meta: { k: 'g3-better-word' } });
  }
  function strongTap(lv) {
    var b = R.pick(BETTER), s = b[0].replace('_', b[1]), ws = words(s).filter(function (w, i, all) { return all.map(function (x) { return x.toLowerCase(); }).indexOf(w.toLowerCase()) === i; });
    return Q.tiles('Tap the strong <b>action</b> word.', b[1], R.some(others(ws, b[1]), lv > 1 ? 4 : 3), { fig: W.sent(s), prompt: 'An action word tells what someone or something does.',
      hint: 'Which word shows exactly how it was done?', explain: '<b>' + b[1] + '</b> paints a clear picture.', meta: { k: 'g3-strong-tap' } });
  }
  function pattern(lv) {
    var p = R.pick(PATTERN), all = words(p[0].join(' ').toLowerCase());
    var once = all.filter(function (w) { return all.indexOf(w) === all.lastIndexOf(w) && w.length > 2; });
    return Q.tiles('Which word repeats to make a pattern?', p[1], R.some(once, lv > 1 ? 3 : 2), { fig: W.passage('', p[0]),
      hint: 'Which word do you see again and again?', explain: '<b>' + p[1] + '</b> repeats. Patterns make writing fun to read aloud.', meta: { k: 'g3-pattern' } });
  }

  /* ---------- metaphors (C3.1): [metaphor, plain sentence, thing, what it is called, how they are alike] ---------- */
  var METAPHOR = [
    ['The moon is a lamp above the lake.', 'The moon is bright above the lake.', 'the moon', 'a lamp', 'Both give light.'],
    ['The wind is a whisper in the pines.', 'The wind blows softly in the pines.', 'the wind', 'a whisper', 'Both are soft and quiet.'],
    ['My brother is a rocket on his bike.', 'My brother rides his bike fast.', 'my brother', 'a rocket', 'Both go very fast.'],
    ['The snow is a white blanket on the field.', 'The snow is deep on the field.', 'the snow', 'a blanket', 'Both cover things.'],
    ['Her laugh is music.', 'Her laugh is loud.', 'her laugh', 'music', 'Both are nice to hear.'],
    ['The lake is a mirror.', 'The lake is very still.', 'the lake', 'a mirror', 'You can see yourself in both.'],
    ['The classroom was a zoo.', 'The classroom was noisy.', 'the classroom', 'a zoo', 'Both are loud and busy.'],
    ['Dad is a bear in the morning.', 'Dad is grumpy in the morning.', 'Dad', 'a bear', 'Both can be grumpy.'],
    ['The stars are diamonds in the sky.', 'The stars shine in the sky.', 'the stars', 'diamonds', 'Both sparkle.'],
    ['The rink is a sheet of glass.', 'The rink is smooth.', 'the rink', 'a sheet of glass', 'Both are smooth and shiny.'],
    ['My cat is a heater on my lap.', 'My cat is warm on my lap.', 'my cat', 'a heater', 'Both are warm.'],
    ['The road was a ribbon over the hills.', 'The road went over the hills.', 'the road', 'a ribbon', 'Both are long and thin.'],
    ['The puppy is a ball of fluff.', 'The puppy is soft.', 'the puppy', 'a ball of fluff', 'Both are soft and round.'],
    ['The fog was a grey wall.', 'The fog was thick.', 'the fog', 'a wall', 'You cannot see through either.']
  ];
  function metaphor(lv) {
    var m = R.pick(METAPHOR), wrong = [m[1]];
    if (lv > 1) wrong.push(R.pick(others(METAPHOR, m))[1]);
    return Q.one('Which sentence is a <b>metaphor</b>?', m[0], wrong, { prompt: 'Does it say one thing <b>is</b> something else?',
      hint: 'A metaphor says one thing is another thing.', explain: W.sent(m[0]) + ' compares ' + m[2] + ' and ' + m[3] + '.', meta: { k: 'g3-metaphor' } });
  }
  function compared(lv) {
    var m = R.pick(METAPHOR), o = R.some(others(METAPHOR, m), 2), wrong = [m[2] + ' and ' + o[0][3]];
    if (lv > 1) wrong.push(o[1][2] + ' and ' + m[3]);
    return Q.one('Which two things are compared?', m[2] + ' and ' + m[3], wrong, { fig: W.sent(m[0]),
      hint: 'Look on each side of the word is, are or was.', explain: 'It compares ' + m[2] + ' and ' + m[3] + '.', meta: { k: 'g3-compared', s: m[0] } });
  }
  function alike(lv) {
    var m = R.pick(METAPHOR);
    return Q.one('How are ' + m[2] + ' and ' + m[3] + ' alike?', m[4], R.some(others(METAPHOR, m), lv > 1 ? 2 : 1).map(function (x) { return x[4]; }), { fig: W.sent(m[0]),
      hint: 'Think about what ' + m[3] + ' is like.', explain: m[4], meta: { k: 'g3-alike', s: m[0] } });
  }
  function metaphorTf() {
    var m = R.pick(METAPHOR), right = R.int(0, 1) === 1, s = right ? m[0] : m[1];
    return { q: Q.name() + ' says this is a metaphor.', fig: W.sent(s), type: 'tf', answer: right,
      hint: 'Does it say one thing is another thing?', explain: right ? 'It compares ' + m[2] + ' and ' + m[3] + '.' : 'It tells what ' + m[2] + ' is like, but compares it to nothing.', meta: { k: 'g3-metaphor-tf', s: s } };
  }

  /* ---------- assonance (C3.1): [line, the vowel sound, the words that have it] ---------- */
  var VOWEL = { o: 'ō as in snow', ee: 'ē as in tree', a: 'ă as in cat', i: 'ī as in kite', ay: 'ā as in rain', u: 'ŭ as in sun', oo: 'oo as in moon', ih: 'ĭ as in fish' };
  var SOUND = [
    ['The stars glow slow over the snow.', 'o', ['glow', 'slow', 'over', 'snow']], ['Go home, old goat, down the cold road.', 'o', ['Go', 'home', 'old', 'goat', 'cold', 'road']],
    ['I sleep deep and dream.', 'ee', ['sleep', 'deep', 'dream']], ['Three green trees by the sea.', 'ee', ['Three', 'green', 'trees', 'sea']],
    ['The cat sat at the back of the van.', 'a', ['cat', 'sat', 'at', 'back', 'van']], ['Max packs a black hat for the trip.', 'a', ['Max', 'packs', 'black', 'hat']],
    ['Light the kite at night.', 'i', ['Light', 'kite', 'night']], ['I like to ride my bike.', 'i', ['I', 'like', 'ride', 'my', 'bike']],
    ['The rain came late that day.', 'ay', ['rain', 'came', 'late', 'day']], ['We play in the lake all day.', 'ay', ['play', 'lake', 'day']],
    ['The pup dug in the mud.', 'u', ['pup', 'dug', 'mud']], ['Just a bug on the rug.', 'u', ['Just', 'bug', 'rug']],
    ['The moon is cool and blue.', 'oo', ['moon', 'cool', 'blue']], ['A goose flew by the pool.', 'oo', ['goose', 'flew', 'pool']],
    ['Six fish swim near the dock.', 'ih', ['Six', 'fish', 'swim']]
  ];
  var NOSOUND = ['The bird flew past the house.', 'Rain fell on the hill.', 'A duck swam home.', 'We met Kai at the store.', 'Dad cooked lunch.', 'The fox ran up the hill.',
    'Pat the dog gently.', 'Ben rode a bus to town.', 'Sara put on her boots.', 'My aunt sent a card.', 'The owl woke up.', 'Lin baked bread.'];
  function sound(lv) {
    var s = R.pick(SOUND);
    return Q.one('Which line repeats the same <b>vowel sound</b>?', s[0], R.some(NOSOUND, lv > 1 ? 2 : 1), { prompt: 'Say each one aloud. Listen for a sound that comes back.',
      hint: 'Listen to the middle of the words.', explain: 'The <b>' + VOWEL[s[1]] + '</b> comes back: ' + s[2].join(', ') + '.', meta: { k: 'g3-assonance' } });
  }
  function whichSound(lv) {
    var s = R.pick(SOUND);
    return Q.one('Which vowel sound comes back?', VOWEL[s[1]], R.some(others(Object.keys(VOWEL), s[1]), lv > 1 ? 2 : 1).map(function (k) { return VOWEL[k]; }), { fig: W.sent(s[0]),
      prompt: 'Say it aloud.', hint: 'Stretch the middle of each word.', explain: s[2].join(', ') + ': <b>' + VOWEL[s[1]] + '</b>.', meta: { k: 'g3-which-vowel', s: s[0] } });
  }
  function pickSound() {
    var s = R.pick(SOUND), rest = words(s[0]).filter(function (w, i, all) { return s[2].indexOf(w) < 0 && !/^(the|a)$/i.test(w) && all.indexOf(w) === i; });
    return Q.all('Pick every word with the <b>' + VOWEL[s[1]] + '</b>.', s[2], rest, { fig: W.sent(s[0]), prompt: 'Say each word aloud.',
      hint: 'Listen for the sound, not the letters.', explain: s[2].join(', ') + '.', meta: { k: 'g3-pick-vowel', v: s[1] } });
  }
  function soundTf() {
    var right = R.int(0, 1) === 1, s = right ? R.pick(SOUND)[0] : R.pick(NOSOUND);
    return { q: Q.name() + ' says this line has <b>assonance</b>.', fig: W.sent(s), type: 'tf', answer: right, prompt: 'Does a vowel sound come back?',
      hint: 'Say it aloud and listen.', explain: right ? 'A vowel sound comes back again and again.' : 'Each word has a different vowel sound.', meta: { k: 'g3-assonance-tf', s: s } };
  }

  /* ---------- inferences (C3.2): the passages' infer lists ---------- */
  function infer(lv, t, f) {
    t = text('infer', lv, t); f = f || R.pick(t.infer);
    return Q.one(f[0], f[1], lv > 1 ? [f[2], f[3]] : [R.pick([f[2], f[3]])], { fig: T.show(t), prompt: 'The text does not say it. Look for a clue.',
      hint: 'The clue: <b>' + f[4] + '</b>.', explain: 'The clue: <mark class="hl">' + f[4] + '</mark>.', meta: { k: 'g3-infer', t: t.title, q: f[0] } });
  }
  function evidence(lv, t, f) {
    t = text('infer', lv, t); f = f || R.pick(t.infer);
    var right = t.lines[at(t, f[4])];
    return Q.one(f[0] + ' Answer: <b>' + f[1] + '</b>. Which sentence shows it?', right, R.some(others(T.body(t), right), lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Which sentence fits the answer?', explain: '<mark class="hl">' + f[4] + '</mark> shows it.', meta: { k: 'g3-evidence', t: t.title, q: f[0] } });
  }
  function clueTap(lv, t, f) {
    t = text('infer', lv, t); f = f || R.pick(t.infer);
    var i = at(t, f[4]);
    return { q: f[0] + ' Answer: <b>' + f[1] + '</b>. Tap the clue.', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which sentence makes you think so?', hint: 'Look for what someone does or says.', explain: 'The clue: <mark class="hl">' + f[4] + '</mark>.', meta: { k: 'g3-infer-tap', t: t.title, q: f[0] } };
  }
  function inferTf(lv, t, f) {
    t = text('infer', lv, t); f = f || R.pick(t.infer);
    var right = R.int(0, 1) === 1, said = right ? f[1] : R.pick([f[2], f[3]]);
    return { q: f[0] + '<br>' + Q.name() + ' says: <b>' + said + '</b>.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['A clue in the text shows it.', 'No clue in the text shows it.'], answer: right ? 0 : 1 },
      hint: 'Find the clue first.', explain: 'The clue: <mark class="hl">' + f[4] + '</mark>. So: <b>' + f[1] + '</b>.', meta: { k: 'g3-infer-tf', t: t.title, q: f[0], said: said } };
  }

  /* ---------- compare and contrast (C3.3) ---------- */
  var PAIRS = [
    { a: 'Snowshoe hare', b: 'Arctic fox', both: ['Its fur turns white in winter.', 'It lives where winters are long.'], onlyA: ['It eats plants.', 'It has very long ears.'], onlyB: ['It eats other animals.', 'It has small ears.'] },
    { a: 'Beaver', b: 'Moose', both: ['It eats bark and twigs.', 'It can swim well.'], onlyA: ['It builds a lodge.', 'It has a flat tail.'], onlyB: ['It has very long legs.', 'The male grows antlers.'] },
    { a: 'Canoe', b: 'Kayak', both: ['You move it with a paddle.', 'It floats on water.'], onlyA: ['It is open on top.', 'Its paddle has one blade.'], onlyB: ['It has a closed top.', 'Its paddle has two blades.'] },
    { a: 'Summer', b: 'Winter', both: ['Many kids play outside.', 'It is a season.'], onlyA: ['The days are long and hot.', 'People swim in lakes.'], onlyB: ['Snow covers the ground.', 'People skate on ponds.'] },
    { a: 'Canada goose', b: 'Robin', both: ['It has feathers and wings.', 'It lays eggs.'], onlyA: ['It flies in a V.', 'It swims on ponds.'], onlyB: ['It pulls worms from the grass.', 'It has a red chest.'] }
  ];
  function cards(p) { return '<div class="wpics">' + W.passage(p.a, p.both.concat(p.onlyA)) + W.passage(p.b, p.both.concat(p.onlyB)) + '</div>'; }
  function compare(lv) {
    var p = R.pick(PAIRS), a = R.pick(p.onlyA), b = R.pick(p.onlyB);
    return Q.one('Which is true of <b>both</b>?', R.pick(p.both), lv > 1 ? [a, b] : [R.pick([a, b])], { fig: cards(p), prompt: 'Find a sentence that is in both cards.',
      hint: 'It must be in both cards.', explain: 'Same: it is in both cards.', meta: { k: 'g3-compare' } });
  }
  function onlyOne(lv) {
    var p = R.pick(PAIRS), side = R.int(0, 1), mine = side ? p.onlyB : p.onlyA, theirs = side ? p.onlyA : p.onlyB, name = side ? p.b : p.a;
    var wrong = [R.pick(p.both)];
    if (lv > 1) wrong.push(R.pick(theirs));
    return Q.one('Which is true of the <b>' + name + '</b> only?', R.pick(mine), wrong, { fig: cards(p), prompt: 'Find a sentence in that card and not the other.',
      hint: 'Check the other card too.', explain: 'Different: it is only in the ' + name + ' card.', meta: { k: 'g3-only-one', side: side } });
  }
  function sortCompare() {
    var p = R.pick(PAIRS);
    return { q: 'Match each sentence to where it belongs.', fig: cards(p), type: 'match',
      pairs: [[R.pick(p.both), 'In both'], [R.pick(p.onlyA), 'Only ' + p.a], [R.pick(p.onlyB), 'Only ' + p.b]],
      hint: 'Look for each sentence in both cards.', explain: 'Same goes in the middle. Different goes on its own side.', meta: { k: 'g3-sort-compare' } };
  }
  function compareTf() {
    var p = R.pick(PAIRS), s = R.pick(p.both.concat(p.onlyA, p.onlyB)), right = p.both.indexOf(s) >= 0;
    return { q: Q.name() + ' says this is true of <b>both</b>: ' + s, fig: cards(p), type: 'tf', answer: right,
      hint: 'Is it in both cards?', explain: right ? 'It is in both cards.' : 'It is in one card only.', meta: { k: 'g3-compare-tf', s: s } };
  }

  /* ---------- perspective (C3.5): the letters' views, and what different people might say ---------- */
  var SIDES = [
    { topic: 'A new skating rink in the park', says: [['a child who loves to skate', 'I will skate there every day after school!'], ['a neighbour beside the park', 'The bright lights may keep me awake at night.'],
      ['a city worker', 'It will take a lot of work to keep the ice smooth.'], ['a parent', 'It will be a safe place to play close to home.']] },
    { topic: 'Keeping the splash pad open', says: [['a child', 'It is the best place to cool down!'], ['a parent', 'It is free, so every family can use it.'],
      ['a city worker', 'The water pipes are old and need fixing.'], ['an older neighbour', 'I like to sit in the shade and watch the kids play.']] },
    { topic: 'A longer recess', says: [['a student', 'We could play more games outside!'], ['a teacher', 'We would have less time for reading.'],
      ['a yard helper', 'I would need to watch the yard for longer.'], ['a parent', 'Fresh air and play are good for kids.']] },
    { topic: 'A class pet', says: [['a student who loves animals', 'I would help feed it every day!'], ['a student with allergies', 'Fur makes me sneeze.'],
      ['the teacher', 'Who will care for it on the weekends?'], ['the caretaker', 'The cage will need cleaning.']] },
    { topic: 'A new bike path by the river', says: [['a child who bikes', 'I could ride to my friend' + AP + 's house safely!'], ['a person walking a dog', 'Fast bikes might scare my dog.'],
      ['a bird watcher', 'Building it could disturb the nests by the river.'], ['a bus driver', 'Fewer cars would make the roads less busy.']] }
  ];
  var LETTERS = T.list('view');
  function said(x) { return W.sent(OQ + x[1] + CQ); }
  function perspective(lv, t) {
    t = t || R.pick(LETTERS); var v = t.view;
    return Q.one('What does <b>' + v.who + '</b> think?', v.thinks, lv > 1 ? v.wrong : [R.pick(v.wrong)], { fig: T.show(t), prompt: 'Who wrote it? What do they ask for?',
      hint: 'Look at what ' + v.who + ' asks for.', explain: v.who + ' thinks: ' + v.thinks, meta: { k: 'g3-perspective', who: v.who } });
  }
  function reason(lv, t) {
    t = t || R.pick(LETTERS.filter(function (x) { return x.view.reasons.length; })); var v = t.view;
    var wrong = LETTERS.filter(function (x) { return x !== t; }).reduce(function (a, x) { return a.concat(x.view.reasons); }, []);
    return Q.one('Which is one of ' + v.who + AP + 's reasons?', R.pick(v.reasons), R.some(wrong, lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'A reason is in the letter. It tells why.', explain: v.who + ' gives reasons to change the reader' + AP + 's mind.', meta: { k: 'g3-reason', who: v.who } });
  }
  function whoSays(lv) {
    var s = R.pick(SIDES), x = R.pick(s.says);
    return Q.one('<b>' + s.topic + '</b>: who might say this?', x[0], R.some(others(s.says, x), lv > 1 ? 2 : 1).map(function (y) { return y[0]; }), { fig: said(x),
      hint: 'Who would care about that most?', explain: x[0].charAt(0).toUpperCase() + x[0].slice(1) + ' might say it. People see things in different ways.', meta: { k: 'g3-who-says', topic: s.topic } });
  }
  function matchSides(lv) {
    var s = R.pick(SIDES);
    return { q: '<b>' + s.topic + '</b>: match each person to what they might say.', type: 'match', pairs: R.some(s.says, lv > 1 ? 4 : 3).map(function (x) { return [x[0], x[1]]; }),
      hint: 'Think about what each person cares about.', explain: 'Each person sees it in their own way.', meta: { k: 'g3-match-sides', topic: s.topic } };
  }
  function viewTf(lv, t) {
    t = t || R.pick(LETTERS); var v = t.view, right = R.int(0, 1) === 1, s = right ? v.thinks : R.pick(v.wrong);
    return { q: Q.name() + ' says ' + v.who + ' thinks this: <b>' + s + '</b>', fig: T.show(t), type: 'tf', answer: right,
      hint: 'What does ' + v.who + ' ask for?', explain: v.who + ' thinks: ' + v.thinks, meta: { k: 'g3-view-tf', who: v.who, s: s } };
  }

  /* ---------- think about a text: about five questions on one passage ---------- */
  function ask(t) {
    var lv = T.words(t) < 100 ? 1 : 2, qs = [];
    if (t.infer) { var f = R.pick(t.infer); qs.push(infer(lv, t, f), clueTap(lv, t, f)); if (t.infer.length > 1) qs.push(inferTf(lv, t, R.pick(others(t.infer, f)))); }
    if (t.view) qs.push(perspective(lv, t), t.view.reasons.length ? reason(lv, t) : viewTf(lv, t));
    if (t.cause) qs.push(whichEffect(lv, t), because(lv, t), whichCause(lv, t));
    if (HEADS[t.title]) qs.push(whichHeading(lv, t));
    return qs.slice(0, 5);
  }
  var thinkable = T.list('cause').concat(T.list('infer'), T.list('view')).filter(function (t, i, all) { return all.indexOf(t) === i; })
    .sort(function (a, b) { return T.words(a) - T.words(b); });

  Atlas.register('thinking', {
    full: true,
    read: { texts: thinkable, show: function (t) { return T.show(t); }, ask: ask },
    lessons: [{
      id: 'built', title: 'How texts are built', sub: 'Text features, and cause and effect.',
      concepts: [
        { slug: 'features', title: 'Text features help you find facts', exp: ['C1.3', 'C1.4'], skill: 'features',
          model: [
            step(T.show(T.hares), 'An information page.'),
            step(W.sent('<b>Big feet</b>'), 'A heading: this part is about feet.'),
            step(W.pic('moose') + W.sent('<b>Caption:</b> A moose wades into a lake.'), 'A caption tells about a picture.'),
            step(W.sent('Baby moose are called <b>calves</b>.'), 'Bold print: an important word.'),
            step(W.sent('<b>Glossary</b> &middot; calf: a baby moose'), 'At the back, a glossary tells what words mean.'),
            step(W.sent('<b>Index</b> &middot; antlers 4 &middot; calves 9 &middot; food 6'), 'An index gives the page for each topic.')
          ],
          guided: [function () { return featureJob(1); }, function () { return featureUse(1); }, function () { return whichHeading(1); }],
          check: [function () { return featureJob(2); }, function () { return featureUse(2); }, function () { return matchFeatures(2); }, featureTf, function () { return whichHeading(3); }],
          coach: '<p>Go on a "feature hunt" in a library information book: find a heading, a caption, a label, bold print, the glossary and the index.</p>',
          mistake: '<p>Skipping headings and pictures. They are part of the text and help a lot.</p>' },
        { slug: 'cause-effect', title: 'A cause makes an effect happen', exp: ['C1.3'], skill: 'cause',
          model: [
            step(T.show(T.beavers), 'Read to find why things happen.'),
            step(W.chain(['A beaver chews wood.'], ['Cause'])),
            step(W.chain(['A beaver chews wood.', 'Its teeth stay short.'], ['Cause', 'Effect']), 'Ask: what happens because of it?'),
            step(W.chain(['The hare grows a white coat.', 'It is hard to see in the snow.'], ['Cause', 'Effect']), 'Again, with hares.'),
            step(W.sent('It is hard to see <b>because</b> it grows a white coat.'), 'The cause comes after <b>because</b>.')
          ],
          guided: [function () { return causeMatch(1); }, function () { return whichEffect(1); }, function () { return because(1); }],
          check: [function () { return whichCause(2); }, function () { return causeTf(2); }, function () { return causeMatch(2); }, function () { return because(2); }, function () { return whichEffect(3); }],
          coach: '<p>Use "because" and "so" in talk: "The ice melted because it was warm." "It was warm, so the ice melted."</p>',
          mistake: '<p>Swapping cause and effect. Ask: "Which one happened first?"</p>' }
      ]
    }, {
      id: 'craft', title: 'The writer' + AP + 's craft', sub: 'Strong words, patterns, metaphors and sounds.',
      concepts: [
        { slug: 'word-choice', title: 'Strong words paint a picture', exp: ['C1.5'], skill: 'words',
          model: [
            step(W.sent('The dog ate.'), 'I can not picture much.'),
            step(W.sent('The <b>hungry</b> dog <b>gobbled</b> its dinner.'), 'Now I can see it.'),
            step(W.sent('The moose walked.'), 'Again.'),
            step(W.sent('The <b>huge</b> moose <b>trudged</b> through the <b>deep</b> snow.'), 'Trudged: slow, heavy steps.'),
            step(W.passage('', ['Snow on the roof,', 'snow on the road,', 'snow on my nose!']), 'A word that comes back makes a pattern.')
          ],
          guided: [function () { return picture(1); }, function () { return better(1); }, function () { return pattern(1); }],
          check: [function () { return picture(2); }, function () { return better(2); }, function () { return strongTap(2); }, function () { return pattern(2); }, function () { return picture(3); }],
          coach: '<p>While reading, stop at a sentence you love and ask: "Which words help you picture it?"</p>',
          mistake: '<p>Thinking longer always means better. The best words are exact, not just many.</p>' },
        { slug: 'metaphor', title: 'A metaphor says one thing is another', exp: ['C3.1'], skill: 'metaphor',
          model: [
            step(W.sent('The moon is bright above the lake.'), 'A plain sentence.'),
            step(W.sent('The moon <b>is a lamp</b> above the lake.'), 'The moon is not really a lamp.'),
            step(W.means('think', 'Both give light.'), 'How are they alike?'),
            step(W.sent('The rink <b>is a sheet of glass</b>.'), 'Now the rink.'),
            step(W.means('think', 'Both are smooth and shiny.'), 'It helps you picture the ice.')
          ],
          guided: [function () { return metaphor(1); }, function () { return compared(1); }, function () { return alike(1); }],
          check: [function () { return metaphor(2); }, function () { return compared(2); }, function () { return alike(2); }, metaphorTf, function () { return metaphor(3); }],
          coach: '<p>Make some together: "My bed is a cloud." Ask: "How are they alike?"</p>',
          mistake: '<p>Taking it literally. Ask: "Is the moon really a lamp? Then what does the writer mean?"</p>' },
        { slug: 'assonance', title: 'Assonance: a vowel sound comes back', exp: ['C3.1'], skill: 'assonance',
          model: [
            step(W.sent('The stars gl<b>ow</b> sl<b>ow</b> <b>o</b>ver the sn<b>ow</b>.'), 'Listen: ō, ō, ō, ō.'),
            step(W.icon('listen'), 'Say it aloud. Can you hear it?'),
            step(W.sent('Thr<b>ee</b> gr<b>ee</b>n tr<b>ee</b>s by the s<b>ea</b>.'), 'Now ē, four times.'),
            step(W.sent('s<b>ea</b> &middot; tr<b>ee</b>'), 'Different letters, same sound.'),
            step(W.sent('Rain fell on the hill.'), 'No sound comes back here.')
          ],
          guided: [function () { return sound(1); }, function () { return whichSound(1); }, pickSound],
          check: [function () { return sound(2); }, function () { return whichSound(2); }, pickSound, soundTf, function () { return sound(3); }],
          coach: '<p>Say the lines aloud and stretch the vowel sounds. Assonance is easier to hear than to see.</p>',
          mistake: '<p>Looking for the same letters. Listen for the same sound instead (sea and tree have it, with different letters).</p>' }
      ]
    }, {
      id: 'deeper', title: 'Reading between the lines', sub: 'Clues, comparisons and points of view.',
      concepts: [
        { slug: 'infer', title: 'Use clues to work out what is not said', exp: ['C3.2'], skill: 'infer',
          model: [
            step(T.show(T.mitten), 'It does not say how Leila feels.'),
            step(W.sent('Leila pulled it on and <mark class="hl">grinned</mark>.'), 'A clue.'),
            step(W.means('think', 'People grin when they are glad.'), 'What I know.'),
            step(W.sent('Leila feels <b>happy</b>.'), 'Clue + what I know.'),
            step(W.sent('<mark class="hl">My heart was pounding.</mark>'), 'Again: a goalie in a big game.'),
            step(W.sent('The goalie feels <b>nervous</b>.'), 'Point to the clue to show how you know.')
          ],
          guided: [function () { return infer(1); }, function () { return clueTap(1); }, function () { return evidence(1); }],
          check: [function () { return infer(2); }, function () { return clueTap(2); }, function () { return evidence(2); }, function () { return inferTf(2); }, function () { return infer(3); }],
          coach: '<p>Ask "How do you know?" after every answer about feelings. The answer should point to words in the text.</p>',
          mistake: '<p>Answering from their own feelings instead of the character' + AP + 's. Point back to the clue.</p>' },
        { slug: 'compare', title: 'Compare: same and different', exp: ['C3.3'], skill: 'compare',
          model: [
            step(cards(PAIRS[0]), 'Two animal cards.'),
            step(W.sent('Its fur turns white in winter.'), 'In both cards.'),
            step(W.sent('It eats plants.'), 'Only the hare.'),
            step(cards(PAIRS[2]), 'Now two boats.'),
            step(W.web('In both', ['paddle', 'floats']), 'What matches goes in the middle.'),
            step(W.sent('Its paddle has two blades.'), 'Only the kayak.')
          ],
          guided: [function () { return compare(1); }, function () { return onlyOne(1); }, sortCompare],
          check: [function () { return compare(2); }, function () { return onlyOne(2); }, sortCompare, compareTf, function () { return compare(3); }],
          coach: '<p>Draw two overlapping circles. Write what is the same in the middle and what is different on the sides.</p>',
          mistake: '<p>Picking something true of only one. It has to be in both.</p>' },
        { slug: 'perspective', title: 'Who wrote it, and what do they think?', exp: ['C3.5'], skill: 'perspective',
          model: [
            step(T.show(T.rink), 'Priya wrote this letter.'),
            step(W.sent('<b>Please build</b> a skating rink in Elm Park.'), 'What she asks for.'),
            step(W.web('The park needs a rink.', ['a safe place to skate', 'keeps us healthy', 'families would use it']), 'Her reasons hold it up.'),
            step(W.means('people', 'A neighbour: the lights may keep me awake.'), 'Other people may see it another way.'),
            step(said(SIDES[3].says[1]), 'A class pet? A child with allergies might say this.')
          ],
          guided: [function () { return perspective(1); }, function () { return reason(1); }, function () { return whoSays(1); }],
          check: [function () { return perspective(2); }, function () { return reason(2); }, function () { return whoSays(2); }, function () { return matchSides(2); }, function () { return viewTf(2); }],
          coach: '<p>Ask: "Who might disagree with Priya? What would they say?" Thinking about other views is the point.</p>',
          mistake: '<p>Mixing up the reader and the writer. The writer is the one with the opinion.</p>' }
      ]
    }],
    practice: [
      { id: 'features', name: 'Text features', code: 'C1.3, C1.4', gen: featureJob },
      { id: 'cause', name: 'Cause and effect', code: 'C1.3', gen: function (lv) { return causeMatch(lv); } },
      { id: 'words', name: 'Strong words and patterns', code: 'C1.5', gen: picture },
      { id: 'metaphor', name: 'Metaphors', code: 'C3.1', gen: metaphor },
      { id: 'assonance', name: 'Assonance', code: 'C3.1', gen: sound },
      { id: 'infer', name: 'Clues and inferences', code: 'C3.2', gen: function (lv) { return infer(lv); } },
      { id: 'compare', name: 'Same and different', code: 'C3.3', gen: compare },
      { id: 'perspective', name: 'Points of view', code: 'C3.5', gen: function (lv) { return perspective(lv); } }
    ],
    tasks: [
      { id: 'culture', title: 'Culture in a story', code: 'C3.4', pic: W.icon('people'), say: 'Find something in a story that shows a culture: food, words, a symbol, a celebration.',
        run: ['Read a picture book set in a family or community with a culture the child knows, or one they are learning about.', 'Ask: "What did you notice? Food, words, clothing, a symbol, a celebration?"', 'Ask: "Why do you think the author put that in? What does it tell us?"'],
        rubric: ['Does not notice cultural details yet.', 'Notices a detail with help.', 'Names a cultural detail and asks a question about it.', 'Explains how the detail adds to the meaning of the story.'] },
      { id: 'everyone', title: 'Everyone belongs', code: 'C3.6', pic: W.icon('people'), say: 'How did you feel about this story? Was anyone left out?',
        run: ['Read a story about a character who is different in some way (for example, uses a wheelchair, is new to the country, or is left out).', 'Ask: "How did you feel? What would you do if you were in the story?"', 'Talk about ways to include everyone.'],
        rubric: ['Shares no thoughts yet.', 'Shares a feeling with help.', 'Shares thoughts and feelings with a reason.', 'Connects the story to real ways to include others.'] },
      { id: 'past-present', title: 'Then and now', code: 'C3.7', pic: W.icon('read'), say: 'Read a story by a First Nations, Métis or Inuit creator about the past. How does it connect to today?',
        run: ['With your librarian, choose a book by a First Nations, Métis or Inuit creator that tells about a time in the past or a cultural experience.', 'Read it together. Ask: "What happened in the past? What does it tell us about life today?"'],
        rubric: ['Recalls little of the book yet.', 'Retells some of it with help.', 'Tells what the book shows about the past or culture.', 'Connects the past in the book to life today, respectfully and with detail.'],
        coach: '<p>Let the book lead. Choose creators writing about their own nation or community, and use the author notes.</p>' },
      { id: 'thinking-skills', title: 'How I thought about it', code: 'C3.8', pic: W.icon('think'), say: 'Which thinking helped you: comparing, finding clues, or asking questions?',
        run: ['After a discussion about a book, ask: "What helped you understand it best?"', 'Name the skills used: finding clues, comparing, asking questions, thinking about the writer.'],
        rubric: ['Cannot name a thinking skill yet.', 'Names one with help.', 'Names one and tells when it helped.', 'Explains how two skills helped, with examples.'] }
    ]
  });

  Q.shapes('thinking', {
    features: [[1, 'use', featureUse], [1, 'match', matchFeatures], [1, 'true-false', featureTf], [1, 'heading', function (lv) { return whichHeading(lv); }]],
    cause: [[1, 'effect', function (lv) { return whichEffect(lv); }], [1, 'cause', function (lv) { return whichCause(lv); }], [1, 'true-false', function (lv) { return causeTf(lv); }], [1, 'because', function (lv) { return because(lv); }]],
    words: [[1, 'better-word', better], [1, 'tap-strong', strongTap], [1, 'pattern', pattern]],
    metaphor: [[1, 'compared', compared], [1, 'alike', alike], [1, 'true-false', metaphorTf]],
    assonance: [[1, 'which-sound', whichSound], [1, 'pick-words', pickSound], [1, 'true-false', soundTf]],
    infer: [[1, 'evidence', function (lv) { return evidence(lv); }], [1, 'tap-clue', function (lv) { return clueTap(lv); }], [1, 'true-false', function (lv) { return inferTf(lv); }]],
    compare: [[1, 'only-one', onlyOne], [1, 'sort', sortCompare], [1, 'true-false', compareTf]],
    perspective: [[1, 'reason', function (lv) { return reason(lv); }], [1, 'who-says', whoSays], [1, 'match', matchSides], [1, 'true-false', function (lv) { return viewTf(lv); }]]
  });
})();
