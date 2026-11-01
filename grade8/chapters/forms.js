/* Grade 8: forms, features and style. A full chapter: every idea has two worked examples, three questions together and
   five on your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 8, Strand C (Comprehension):
   C1.2 characteristics of text forms and genres, and how they help communicate meaning
   C1.3 text patterns (such as problem-solution) and text features (such as a glossary and infographics)
   C1.4 how images, graphics and visual design create and contribute to meaning
   C1.5 elements of style: voice, word choice, word patterns and sentence structure
   C1.6 the narrator's point of view: limited, omniscient or unreliable, and other points of view
   With a grown-up: C1.7 texts by diverse First Nations, Metis and Inuit creators, through Indigenous Storywork.
   Passages are in ../texts.js; short extracts are written here. The graphs are drawn here from made-up survey numbers.
   Answer checks: tests/verify/grade8-forms.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts, AP = '’';

  /* ---------- forms: each form, the features that show it, and short extracts written in it ---------- */
  var GENRE = { 'short story': 'characters, a setting and a problem', 'information text': 'headings and facts', 'letter to the editor': 'a greeting, an opinion and a signature',
    'opinion piece': 'a claim, reasons and a call to act', satire: 'exaggeration that mocks something', poem: 'short lines, rhythm and repetition',
    'news report': 'a dateline and the facts of an event', 'play script': 'speakers' + AP + ' names and stage directions', interview: 'questions and answers',
    'diary entry': 'a date and private thoughts', review: 'a rating and a judgment', procedure: 'materials and numbered steps' };
  var EXTRACT = [
    ['news report', ['THUNDER BAY — A new footbridge over the Current River opened on Saturday.', 'About 300 people walked across in the first hour, city staff said.']],
    ['news report', ['MONCTON — Heavy rain closed two schools on Tuesday.', 'Classes will start again on Thursday, the school board announced.']],
    ['play script', ['MAYA: (whispering) Is anyone there?', 'JONAH: (from the dark) Only me. Turn on the light.']],
    ['play script', ['COACH: (holding up a stopwatch) One more lap.', 'PRIYA: (groaning) You said that last time.']],
    ['interview', ['Q: What made you start the repair café?', 'A: I hated seeing good things in the garbage.']],
    ['interview', ['Q: How long have you been paddling?', 'A: Six years, mostly on the Ottawa River.']],
    ['diary entry', ['Monday, March 3', 'I couldn' + AP + 't sleep again. Tomorrow is the speech, and I still don' + AP + 't know how to start it.']],
    ['diary entry', ['Saturday, July 12', 'We reached the cabin at last. Nobody knows how relieved I felt.']],
    ['review', ['★★★★☆', 'The Long Portage is a gripping read. The ending felt rushed, but the characters stayed with me for days.']],
    ['review', ['★★☆☆☆', 'The new bus app looks good, but it crashed three times in one week.']],
    ['procedure', ['You will need: two paper cups, string, a pencil.', '1. Poke a hole in the bottom of each cup.', '2. Thread the string through both holes.']],
    ['procedure', ['You will need: a jar, soil, three bean seeds.', '1. Fill the jar with soil.', '2. Plant the seeds 2 cm deep.']]];
  function article(k) { return (/^[aeiou]/.test(k) ? 'an ' : 'a ') + k; }
  /* a text to name: a passage (any length at level 3) or a short extract */
  function sample(lv) {
    var ps = T.list('kind', lv > 2 ? 2 : 1).filter(function (t) { return GENRE[t.kind]; }).map(function (t) { return [t.kind, T.show(t), t.title]; });
    var ex = EXTRACT.map(function (e) { return [e[0], W.passage('', e[1]), e[1][0]]; });
    return R.pick(R.int(0, 1) ? ps : ex);
  }
  function genre(lv) {
    var s = sample(lv);
    return Q.tiles('What form is this?', s[0], R.some(Object.keys(GENRE).filter(function (g) { return g !== s[0]; }), lv > 1 ? 3 : 2), { fig: s[1], prompt: 'What features do you see?',
      hint: 'Look at how it is laid out, not only what it is about.', explain: 'It is ' + article(s[0]) + ': ' + GENRE[s[0]] + '.', meta: { k: 'g8-genre', s: s[2] } });
  }
  function genreClue(lv) {
    var s = sample(lv);
    return Q.one('This is ' + article(s[0]) + '. Which features show it?', GENRE[s[0]], R.some(Object.keys(GENRE).filter(function (g) { return g !== s[0]; }), lv > 1 ? 2 : 1).map(function (g) { return GENRE[g]; }), {
      fig: s[1], prompt: 'Point to the features.', hint: 'Which features can you actually point to in it?', explain: GENRE[s[0]] + '.', meta: { k: 'g8-genre-clue', s: s[2] } });
  }
  function genreMatch() {
    var gs = R.some(Object.keys(GENRE), 3);
    return { q: 'Match each form to its features.', type: 'match', pairs: gs.map(function (g) { return [g, GENRE[g]]; }), hint: 'Picture an example of each.', explain: 'A form' + AP + 's features tell readers how to read it.', meta: { k: 'g8-genre-match' } };
  }
  function genreTf(lv) {
    var s = sample(lv), right = R.int(0, 1) === 1, said = right ? s[0] : R.pick(Object.keys(GENRE).filter(function (g) { return g !== s[0]; }));
    return { q: Q.name() + ' says this is <b>' + article(said) + '</b>.', fig: s[1], type: 'tf', answer: right,
      why: { options: ['It has those features.', 'It has the features of another form.'], answer: right ? 0 : 1 }, hint: 'Look for the features of each form.',
      explain: 'It is ' + article(s[0]) + ': ' + GENRE[s[0]] + '.', meta: { k: 'g8-genre-tf', s: s[2], said: said } };
  }

  /* ---------- patterns: short paragraphs, their pattern and the signal words that show it ---------- */
  var PATTERNS = ['problem and solution', 'cause and effect', 'compare and contrast', 'time order', 'description'];
  var PATTERN = [['Many schoolyards have no shade. One solution is to plant trees along the fence.', 'problem and solution', 'One solution'],
    ['The bridge was unsafe for trucks. To fix this, the town built a new one.', 'problem and solution', 'To fix this'],
    ['Students kept losing their gym clothes. The answer was a row of labelled hooks.', 'problem and solution', 'The answer was'],
    ['Because the ice formed late, the winter road opened three weeks behind schedule.', 'cause and effect', 'Because'],
    ['As a result of the heavy rain, the creek overflowed its banks.', 'cause and effect', 'As a result'],
    ['The power went out, so the freezer slowly warmed up.', 'cause and effect', 'so'],
    ['Canoes are light and quiet. Kayaks, on the other hand, are faster in open water.', 'compare and contrast', 'on the other hand'],
    ['Both owls and hawks hunt small animals. However, owls hunt at night.', 'compare and contrast', 'However'],
    ['Like Toronto, Vancouver is a large port city. Unlike Toronto, it rarely gets snow.', 'compare and contrast', 'Unlike'],
    ['First, the sap is collected. Next, it is boiled. Finally, the syrup is bottled.', 'time order', 'Finally'],
    ['In 1867, four provinces joined. Later, others followed.', 'time order', 'Later'],
    ['After the bell rang, the students lined up. Then they walked to the gym.', 'time order', 'Then'],
    ['The snowy owl has thick white feathers, bright yellow eyes and feathered feet.', 'description', 'has thick white feathers'],
    ['The market is loud and crowded, with stalls of apples, honey and warm bread.', 'description', 'loud and crowded']];
  var SIGNAL = { 'problem and solution': 'solution, to fix this, the answer', 'cause and effect': 'because, so, as a result', 'compare and contrast': 'however, both, unlike, on the other hand',
    'time order': 'first, next, then, later, finally', description: 'details that describe one thing' };
  function pattern(lv) {
    var p = R.pick(PATTERN);
    return Q.tiles('Which pattern is this?', p[1], R.some(PATTERNS.filter(function (x) { return x !== p[1]; }), lv > 1 ? 3 : 2), { fig: W.sent(p[0].replace(p[2], '<mark class="hl">' + p[2] + '</mark>')),
      prompt: 'The marked words are a signal.', hint: 'Signal words: ' + SIGNAL[p[1]] + '.', explain: p[1] + ': ' + SIGNAL[p[1]] + '.', meta: { k: 'g8-pattern', s: p[0] } });
  }
  function signal(lv) {
    var p = R.pick(PATTERN.filter(function (x) { return x[1] !== 'description'; })), words = p[0].replace(/[.,]/g, '').split(' ').filter(function (w) { return w.length > 3 && p[2].indexOf(w) < 0 && !/^(First|Next|Then|Later|Finally|Both|However|Because|solution)$/.test(w); });
    return Q.tiles('This paragraph is <b>' + p[1] + '</b>. Which words signal it?', p[2], R.some(words, lv > 1 ? 3 : 2), { fig: W.sent(p[0]), prompt: 'Look for a linking word or phrase.',
      hint: SIGNAL[p[1]] + '.', explain: W.sent(p[0].replace(p[2], '<mark class="hl">' + p[2] + '</mark>')), meta: { k: 'g8-signal', s: p[0] } });
  }
  function passagePattern(lv) {
    var t = R.pick(T.list('pattern', lv > 1 ? 2 : 1));
    return Q.tiles('Which pattern organizes this whole text?', t.pattern, R.some(PATTERNS.filter(function (x) { return x !== t.pattern; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      prompt: 'Look at the headings and signal words.', hint: 'What does the text set up first, and what follows from it?', explain: t.pattern + '.', meta: { k: 'g8-passage-pattern', t: t.title } });
  }
  function patternTf() {
    var p = R.pick(PATTERN), right = R.int(0, 1) === 1, said = right ? p[1] : R.pick(PATTERNS.filter(function (x) { return x !== p[1]; }));
    return { q: Q.name() + ' says this is <b>' + said + '</b>.', fig: W.sent(p[0]), type: 'tf', answer: right,
      why: { options: ['The signal words show it.', 'The signal words show another pattern.'], answer: right ? 0 : 1 }, hint: 'Find the signal words first.',
      explain: W.sent(p[0].replace(p[2], '<mark class="hl">' + p[2] + '</mark>')) + p[1] + '.', meta: { k: 'g8-pattern-tf', s: p[0], said: said } };
  }

  /* ---------- features: what each does, when you would use it, and what one looks like ---------- */
  var FEATURE = [['glossary', 'explains key words', 'to find what a bold word means'], ['infographic', 'shows facts with pictures and numbers', 'to see facts at a glance'],
    ['sidebar', 'adds extra information beside the main text', 'to read a related fun fact'], ['caption', 'explains an image', 'to learn what a photo shows'],
    ['timeline', 'shows events in time order', 'to see which event came first'], ['heading', 'tells what a section is about', 'to find the section you need'],
    ['index', 'lists topics with their page numbers', 'to find every page about one topic'], ['table of contents', 'lists the chapters at the front', 'to see how the book is organized'],
    ['legend', 'explains the symbols on a map', 'to know what a map symbol means']];
  var LOOK = { glossary: W.passage('Glossary', ['<b>asphalt</b>: a black, sticky material used to pave roads', '<b>spawn</b>: to lay eggs']),
    timeline: W.chain(['Confederation', 'Newfoundland joins Canada', 'Nunavut is created'], ['1867', '1949', '1999']),
    caption: '<div class="fig">' + W.pic('canoe') + '<p><i>Two paddlers cross the lake at dawn.</i></p></div>',
    index: W.passage('Index', ['sturgeon, 12, 45', 'tides, 30 to 33', 'tundra, 51']),
    'table of contents': W.passage('Contents', ['1. Ice Roads, page 3', '2. The Tides, page 17', '3. Repair Cafés, page 29']),
    legend: W.passage('Legend', ['● school', '▲ campsite', '■ library']),
    sidebar: W.passage('Did you know?', ['Sturgeon were swimming in these lakes before the time of the dinosaurs ended.']),
    infographic: '<div class="fig">' + W.pic('bus') + W.pic('bus') + W.pic('bus') + '<p><b>3 in 10</b> students take the bus to school</p></div>' };
  function featureOf(name) { return FEATURE.filter(function (f) { return f[0] === name; })[0]; }
  function feature(lv) {
    var f = R.pick(FEATURE);
    return Q.one('What does ' + article(f[0]) + ' <b>' + f[0].replace(/^an? /, '') + '</b> do?', f[1], R.some(FEATURE.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: LOOK[f[0]] || '', prompt: 'Picture where you have seen one.', hint: 'Picture where you have seen one.', explain: 'It ' + f[1] + '.', meta: { k: 'g8-feature', f: f[0] } });
  }
  function whichFeature(lv) {
    var f = R.pick(FEATURE);
    return Q.tiles('You want <b>' + f[2] + '</b>. Which feature would you use?', f[0], R.some(FEATURE.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      prompt: 'What does each feature do?', hint: 'Which feature ' + f[1] + '?', explain: 'The ' + f[0] + ' ' + f[1] + '.', meta: { k: 'g8-which-feature', want: f[2] } });
  }
  function featureLook(lv) {
    var names = Object.keys(LOOK), n = R.pick(names);
    return Q.tiles('What text feature is this?', n, R.some(names.filter(function (x) { return x !== n; }), lv > 1 ? 3 : 2), { fig: LOOK[n], prompt: 'How is it laid out?',
      hint: 'What would it help a reader do?', explain: 'It is ' + article(n) + ': it ' + featureOf(n)[1] + '.', meta: { k: 'g8-feature-look', f: n } });
  }
  function featureMatch() {
    var fs = R.some(FEATURE, 3);
    return { q: 'Match each feature to what it does.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Picture where each one sits in a book.', explain: 'Features help readers find and understand information.', meta: { k: 'g8-feature-match' } };
  }

  /* ---------- graphs and visual design ---------- */
  /* a bar graph drawn in the theme's own colour. lo is where the scale starts: 0 is honest, more than 0 exaggerates differences */
  function graph(title, bars, lo) {
    var hi = Math.max.apply(null, bars.map(function (b) { return b[1]; })) + 2, H = 120, x0 = 34, bw = 46, gap = 26;
    var y = function (v) { return 20 + H - (v - lo) / (hi - lo) * H; };
    var s = '<svg viewBox="0 0 260 175" width="260" role="img" aria-label="' + title + '"><text x="130" y="12" text-anchor="middle" font-size="12" fill="currentColor">' + title + '</text>' +
      '<line x1="' + x0 + '" y1="20" x2="' + x0 + '" y2="' + (20 + H) + '" stroke="currentColor"/><line x1="' + x0 + '" y1="' + (20 + H) + '" x2="250" y2="' + (20 + H) + '" stroke="currentColor"/>' +
      '<text x="' + (x0 - 4) + '" y="' + (24 + H) + '" text-anchor="end" font-size="12" fill="currentColor" class="axis">' + lo + '</text>' +
      '<text x="' + (x0 - 4) + '" y="26" text-anchor="end" font-size="12" fill="currentColor" class="axis">' + hi + '</text>';
    bars.forEach(function (b, i) {
      var bx = x0 + 14 + i * (bw + gap);
      s += '<rect x="' + bx + '" y="' + y(b[1]) + '" width="' + bw + '" height="' + (20 + H - y(b[1])) + '" fill="currentColor" fill-opacity=".35"/>' +
        '<text x="' + (bx + bw / 2) + '" y="' + (y(b[1]) - 4) + '" text-anchor="middle" font-size="12" fill="currentColor" class="val">' + b[1] + '</text>' +
        '<text x="' + (bx + bw / 2) + '" y="' + (34 + H) + '" text-anchor="middle" font-size="12" fill="currentColor" class="lab">' + b[0] + '</text>';
    });
    return '<div class="fig">' + s + '</svg></div>';
  }
  var DATA = [['Books borrowed', [['Sept.', 40], ['Oct.', 44], ['Nov.', 46]]], ['Students who walk to school', [['2023', 52], ['2024', 55], ['2025', 57]]],
    ['Bird species counted', [['Spring', 31], ['Summer', 36], ['Fall', 33]]], ['Litres of sap collected', [['Mon.', 18], ['Tue.', 25], ['Wed.', 21]]],
    ['Ferry trips each day', [['May', 14], ['June', 19], ['July', 22]]], ['Bikes repaired', [['Jan.', 12], ['Feb.', 9], ['Mar.', 17]]],
    ['Sturgeon released', [['2022', 60], ['2023', 72], ['2024', 65]]], ['Visitors to the rocks (thousands)', [['Fri.', 26], ['Sat.', 38], ['Sun.', 35]]]];
  function graphMost(lv) {
    var d = R.pick(DATA), most = R.int(0, 1) === 1, top = d[1].reduce(function (a, b) { return (most ? b[1] > a[1] : b[1] < a[1]) ? b : a; });
    return Q.tiles('Which bar shows the <b>' + (most ? 'most' : 'least') + '</b>?', top[0], d[1].filter(function (b) { return b !== top; }).map(function (b) { return b[0]; }), {
      fig: graph(d[0], d[1], lv > 2 ? Math.min.apply(null, d[1].map(function (b) { return b[1]; })) - 3 : 0), prompt: 'Read the number on each bar.',
      hint: 'Read the number on each bar.', explain: top[0] + ': ' + top[1] + '.', meta: { k: 'g8-graph-most', most: most } });
  }
  function misleading() {
    var d = R.pick(DATA), lo = Math.min.apply(null, d[1].map(function (b) { return b[1]; })) - 3, honest = R.int(0, 1) === 1;
    var right = honest ? 'No. The scale starts at 0, so the bars compare fairly.' : 'Yes. The scale starts at ' + lo + ', so small differences look huge.';
    var wrong = honest ? 'Yes. The scale starts at ' + lo + ', so small differences look huge.' : 'No. The scale starts at 0, so the bars compare fairly.';
    return Q.one('Does this graph make the differences look <b>bigger</b> than they are?', right, [wrong], { fig: graph(d[0], d[1], honest ? 0 : lo), prompt: 'Check the lowest number on the scale.',
      hint: 'A bar graph should start at 0. If it does not, differences look bigger.', explain: right, meta: { k: 'g8-misleading' } });
  }
  function graphDiff(lv) {
    var d = R.pick(DATA), ab = R.some(d[1], 2).sort(function (a, b) { return b[1] - a[1]; }), n = ab[0][1] - ab[1][1];
    var wrong = [n + 2, n > 2 ? n - 2 : n + 4, ab[0][1]].filter(function (x, i, a) { return x !== n && a.indexOf(x) === i; }).slice(0, lv > 1 ? 3 : 2);
    return Q.tiles('How many more for <b>' + ab[0][0] + '</b> than for <b>' + ab[1][0] + '</b>?', String(n), wrong.map(String), { fig: graph(d[0], d[1], 0), prompt: 'Read both numbers, then subtract.',
      hint: 'Read both numbers, then subtract.', explain: ab[0][1] + ' − ' + ab[1][1] + ' = ' + n + '.', meta: { k: 'g8-graph-diff', a: ab[0][0], b: ab[1][0] } });
  }
  function graphTf() {
    var d = R.pick(DATA), honest = R.int(0, 1) === 1, lo = honest ? 0 : Math.min.apply(null, d[1].map(function (b) { return b[1]; })) - 3;
    var ab = R.some(d[1], 2), more = ab[0][1] > ab[1][1];
    return { q: Q.name() + ' says: <b>' + ab[0][0] + ' had more than ' + ab[1][0] + '.</b>', fig: graph(d[0], d[1], lo), type: 'tf', answer: more,
      why: { options: ['The numbers show it.', 'The numbers show the opposite.'], answer: more ? 0 : 1 }, hint: 'Read the numbers on the bars.',
      explain: ab[0][0] + ': ' + ab[0][1] + '. ' + ab[1][0] + ': ' + ab[1][1] + '.', meta: { k: 'g8-graph-tf', a: ab[0][0], b: ab[1][0] } };
  }

  /* ---------- voice: [a line, the voice you hear, the words that create it] ---------- */
  var VOICE = [['Honestly, I am the best goalie this town has ever seen. Just ask me.', 'boastful', 'the best goalie this town has ever seen'],
    ['Introducing the SmartSpoon, because lifting a spoon yourself is simply too much work.', 'mock-serious', 'simply too much work'],
    ['Council must act now. Our students cannot wait another year.', 'formal and urgent', 'must act now'],
    ['Kokum' + AP + 's kitchen always smelled of bannock and woodsmoke, and I miss it every winter.', 'warm and longing', 'I miss it every winter'],
    ['Oh, great. Another fire drill in the pouring rain. Just what I wanted.', 'sarcastic', 'Just what I wanted'],
    ['The tide rises and falls about 16 metres, twice a day.', 'calm and factual', 'about 16 metres'],
    ['We won! We actually won! I still can' + AP + 't believe it!', 'excited', 'We actually won'],
    ['Um, I think, maybe, the answer is… no, never mind.', 'nervous and unsure', 'never mind'],
    ['Who left the gate open? Again! Every single time!', 'angry and frustrated', 'Every single time'],
    ['The puddle stared up at me, daring me to jump. So I did.', 'playful', 'daring me to jump']];
  function voice(lv) {
    var v = R.pick(VOICE);
    return Q.one('How would you describe the <b>voice</b>?', v[1], R.some(VOICE.filter(function (x) { return x !== v; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), { fig: W.sent(v[0]),
      prompt: 'Read it aloud the way the writer would say it.', hint: 'Voice is the personality you hear in the writing.', explain: W.sent(v[0].replace(v[2], '<mark class="hl">' + v[2] + '</mark>')) + ' ' + v[1] + '.',
      meta: { k: 'g8-voice-style', s: v[0] } });
  }
  function voiceWords(lv) {
    var v = R.pick(VOICE), others = R.some(VOICE.filter(function (x) { return x !== v; }), lv > 1 ? 3 : 2).map(function (x) { return x[2]; });
    return Q.tiles('The voice is <b>' + v[1] + '</b>. Which words create it?', v[2], others, { fig: W.sent(v[0]), prompt: 'Which words would you stress?',
      hint: 'The words must come from this line.', explain: W.sent(v[0].replace(v[2], '<mark class="hl">' + v[2] + '</mark>')), meta: { k: 'g8-voice-words', s: v[0] } });
  }
  function voiceTf() {
    var v = R.pick(VOICE), right = R.int(0, 1) === 1, said = right ? v[1] : R.pick(VOICE.filter(function (x) { return x !== v; }))[1];
    return { q: Q.name() + ' says the voice is <b>' + said + '</b>.', fig: W.sent(v[0]), type: 'tf', answer: right,
      why: { options: ['The words create that voice.', 'The words create a different voice.'], answer: right ? 0 : 1 }, hint: 'Which words show the writer' + AP + 's attitude?',
      explain: W.sent(v[0].replace(v[2], '<mark class="hl">' + v[2] + '</mark>')) + ' ' + v[1] + '.', meta: { k: 'g8-voice-tf', s: v[0], said: said } };
  }
  function voiceMatch() {
    var vs = R.some(VOICE, 3);
    return { q: 'Match the words to the voice they create.', type: 'match', pairs: vs.map(function (v) { return [v[2], v[1]]; }), hint: 'How would someone say each one aloud?', explain: 'Word choice creates the voice.', meta: { k: 'g8-voice-match' } };
  }

  /* ---------- sentence shape and word patterns: [extract, technique, its effect] ---------- */
  var EFFECT = { 'short sentences': 'Short sentences build tension.', 'one long sentence': 'One long sentence creates a calm, flowing mood.', repetition: 'Repeating words adds force.',
    'questions to the reader': 'Questions make the reader think.', alliteration: 'Repeated first sounds make it memorable.', 'a list of three': 'A list of three builds rhythm.' };
  var SHAPE = [['The footsteps stopped. Someone was outside. I held my breath.', 'short sentences'], ['The lights went out. Wind howled outside. Nobody moved.', 'short sentences'],
    ['The ice cracked. Water rushed in. We ran.', 'short sentences'],
    ['The canoe drifted across the lake, past the sleeping cottages and the tall pines, until the shore was only a dark line behind us.', 'one long sentence'],
    ['We wandered through the market all afternoon, tasting honey and warm bread and listening to the fiddler play until the sun went down.', 'one long sentence'],
    ['We can do better. We must do better. We will do better.', 'repetition'], ['Keep going. Keep paddling. Keep believing the shore is near.', 'repetition'],
    ['Would you walk past a child in danger? Would you stay silent? Then why do we ignore the river?', 'questions to the reader'],
    ['What if the library closed tomorrow? Where would you go after school?', 'questions to the reader'],
    ['Silver snow settled softly on the silent street.', 'alliteration'], ['Big brown bears bounded by the bay.', 'alliteration'],
    ['The trail was steep, rocky and endless.', 'a list of three'], ['She was tired, hungry and very far from home.', 'a list of three']];
  var TECH = Object.keys(EFFECT);
  function shape(lv) {
    var s = R.pick(SHAPE);
    return Q.one('Why is it written this way?', EFFECT[s[1]], R.some(TECH.filter(function (x) { return x !== s[1]; }), lv > 1 ? 2 : 1).map(function (x) { return EFFECT[x]; }), {
      fig: W.sent(s[0]), prompt: 'Look at the length of each sentence, and anything that repeats.', hint: 'Count the words in each sentence. Look for patterns.', explain: EFFECT[s[1]], meta: { k: 'g8-shape', s: s[0] } });
  }
  function technique(lv) {
    var s = R.pick(SHAPE);
    return Q.tiles('What does the writer use here?', s[1], R.some(TECH.filter(function (x) { return x !== s[1]; }), lv > 1 ? 3 : 2), { fig: W.sent(s[0]), prompt: 'What do you notice first?',
      hint: 'Count the sentences. Look at the first sounds. Look for questions.', explain: EFFECT[s[1]], meta: { k: 'g8-sentence-technique', s: s[0] } });
  }
  function shapeTf() {
    var s = R.pick(SHAPE), right = R.int(0, 1) === 1, said = right ? s[1] : R.pick(TECH.filter(function (x) { return x !== s[1]; }));
    return { q: Q.name() + ' says the writer uses <b>' + said + '</b> here.', fig: W.sent(s[0]), type: 'tf', answer: right,
      why: { options: ['The sentences show it.', 'The sentences show something else.'], answer: right ? 0 : 1 }, hint: 'Look at the length of the sentences, and what repeats.',
      explain: EFFECT[s[1]], meta: { k: 'g8-shape-tf', s: s[0], said: said } };
  }
  function repeat() {
    var t = T.portage, line = R.int(0, 1) === 1;
    return Q.tiles('Which words repeat to make a rhythm, like walking?', line ? 'Lift the canoe' : 'Step over', line ? ['The trail is long', 'the lake will wait'] : ['Carry it home', 'the lake will wait'], { fig: T.show(t),
      hint: 'Which words come back?', explain: '<b>Lift the canoe</b> and <b>Step over</b> repeat, like steady steps on a portage.', meta: { k: 'g8-repeat' } });
  }

  /* ---------- narrators: passages and short extracts, each with the words that show the narrator ---------- */
  var POVTIP = { limited: 'inside one character' + AP + 's thoughts only', omniscient: 'knows what every character thinks, and more', unreliable: 'tells it in a way we cannot fully trust' };
  var NARR = [['limited', T.ferry.title, T.ferry.lines, 'She pictured her grandmother waiting'], ['limited', T.radio.title, T.radio.lines.slice(6, 10), 'hands shook'],
    ['limited', '', ['Theo watched the clock.', 'He was sure Ms. Grant had forgotten about him.', 'He had no idea she was searching the halls for him.'], 'He was sure'],
    ['limited', '', ['Noor did not know why her brother had gone quiet.', 'She only knew that the car felt colder.'], 'She only knew'],
    ['omniscient', T.river.title, T.river.lines, 'Neither of them knew'], ['omniscient', T.orchard.title, T.orchard.lines.slice(10, 14), 'Neither of them noticed'],
    ['omniscient', '', ['Kai thought the plan was perfect.', 'His sister thought it was doomed.', 'Neither guessed that the dog had already eaten the map.'], 'Neither guessed'],
    ['omniscient', '', ['Across town, the mayor worried about the vote.', 'Meanwhile, Zara, unaware, practised her speech in the mirror.'], 'unaware'],
    ['unreliable', T.captain.title, T.captain.lines, 'I can' + AP + 't imagine why.'],
    ['unreliable', '', ['I never lose things. My keys just like to travel.', 'This is the fourth time this week.'], 'My keys just like to travel'],
    ['unreliable', '', ['I am not scared of the dark.', 'I just like to sleep with every light on, and the radio, and the door wide open.'], 'every light on']];
  function narr(n) { return W.passage(n[1], n[2], n[1] === T.ferry.title ? { pics: T.ferry.pics } : {}); }
  function narrator(lv) {
    var n = R.pick(NARR);
    return Q.tiles('What kind of narrator does this have?', n[0], Object.keys(POVTIP).filter(function (x) { return x !== n[0]; }), { fig: narr(n), prompt: 'Whose thoughts do we hear? Can we trust what we are told?',
      hint: 'Limited: one character' + AP + 's thoughts. Omniscient: everyone' + AP + 's, and more. Unreliable: we cannot fully trust it.', explain: 'This narrator ' + POVTIP[n[0]] + '.', meta: { k: 'g8-narrator', s: n[2][0] } });
  }
  function narratorLine(lv) {
    var n = R.pick(NARR.filter(function (x) { return x[2].length > 1; })), right = n[2].filter(function (l) { return l.indexOf(n[3]) >= 0; })[0];
    return Q.one('Which line best shows this narrator is <b>' + n[0] + '</b>?', right, R.some(n[2].filter(function (l) { return l !== right && l; }), lv > 1 ? 2 : 1), { fig: narr(n),
      prompt: 'This narrator ' + POVTIP[n[0]] + '.', hint: 'This narrator ' + POVTIP[n[0]] + '.', explain: '<mark class="hl">' + n[3] + '</mark>', meta: { k: 'g8-narrator-line', s: n[2][0] } });
  }
  function narratorTf() {
    var n = R.pick(NARR), right = R.int(0, 1) === 1, said = right ? n[0] : R.pick(Object.keys(POVTIP).filter(function (x) { return x !== n[0]; }));
    return { q: Q.name() + ' says the narrator is <b>' + said + '</b>.', fig: narr(n), type: 'tf', answer: right,
      why: { options: ['The words show it.', 'The words show another kind.'], answer: right ? 0 : 1 }, hint: 'Whose thoughts do we hear?',
      explain: '<mark class="hl">' + n[3] + '</mark>: this narrator ' + POVTIP[n[0]] + '.', meta: { k: 'g8-narrator-tf', s: n[2][0], said: said } };
  }
  /* how a story would change from another point of view */
  var ALT = [[T.ferry, 'the deckhand', 'We would learn why he decided to hold the ferry.', 'We would learn what Amira pictured on the dock.'],
    [T.captain, 'Coach Ahmed', 'We would learn why the narrator was benched.', 'We would hear the narrator insist on being calm.'],
    [T.river, 'Josée', 'We would know only her thoughts, not Mr. Tremblay' + AP + 's.', 'We would still know what both neighbours think.'],
    [T.radio, 'the elder on the hill', 'We would learn how it felt to wait for help with a cold stove.', 'We would learn what Elisapee read on air.'],
    [T.tryout, 'Coach Dubois', 'We would learn what she wrote on her clipboard.', 'We would feel the narrator' + AP + 's stomach flip.'],
    [T.orchard, 'Claire alone', 'We would no longer know what Desmond was thinking.', 'We would still hear Desmond' + AP + 's private thoughts.']];
  function altPov(lv) {
    var a = R.pick(ALT);
    return Q.one('How would the story change if <b>' + a[1] + '</b> told it?', a[2], [a[3]], { fig: lv > 1 ? T.show(a[0]) : W.passage(a[0].title, [], { pics: a[0].pics }),
      prompt: 'What could this person know that the current narrator does not?', hint: 'What could this person know that the current narrator does not?', explain: a[2], meta: { k: 'g8-alt-pov', t: a[0].title } });
  }

  var L = T.library, SP = T.spoon;
  Atlas.register('forms', {
    full: true,
    lessons: [{
      id: 'forms', title: 'Forms and patterns', sub: 'What kind of text, and how it is organized.',
      concepts: [
        { slug: 'genre', title: 'Each form has its own features', exp: ['C1.2'], skill: 'genre',
          model: [
            step(W.passage(L.title, [L.lines[0], '…', L.lines[L.lines.length - 1]], { pics: L.pics }), 'A greeting and a signature.'),
            step(W.sent(L.lines[1]), 'An opinion: a letter to the editor.'),
            step(W.passage('', EXTRACT[2][1]), 'Names in capitals. Directions in brackets.'),
            step(W.tile('play script'), 'Written to be performed.'),
            step(W.passage('', EXTRACT[8][1]), 'Stars, then a judgment: a review.')
          ],
          guided: [function () { return genre(1); }, function () { return genreClue(1); }, function () { return genreTf(1); }],
          check: [function () { return genre(2); }, function () { return genreClue(2); }, genreMatch, function () { return genreTf(2); }, function () { return genre(3); }],
          coach: '<p>Cultural forms count too: oral stories, songs, and community traditions such as teachings shared by Elders. Talk about how each form shapes the message.</p>',
          mistake: '<p>Naming the form from the topic ("it is about soccer, so it is a story") instead of the features that prove it.</p>' },
        { slug: 'patterns', title: 'Signal words reveal the pattern', exp: ['C1.3'], skill: 'patterns',
          model: [
            step(W.sent(PATTERN[0][0].replace('One solution', '<mark class="hl">One solution</mark>'))),
            step(W.chain(['no shade', 'plant trees'], ['Problem', 'Solution']), 'Problem and solution.'),
            step(W.sent(PATTERN[3][0].replace('Because', '<mark class="hl">Because</mark>')), 'A different signal.'),
            step(W.chain(['the ice formed late', 'the road opened late'], ['Cause', 'Effect']), 'Cause and effect.'),
            step(W.passage(T.roads.title, [], { pics: T.roads.pics }), 'A whole text can follow one pattern too.')
          ],
          guided: [function () { return pattern(1); }, function () { return signal(1); }, patternTf],
          check: [function () { return pattern(2); }, function () { return signal(2); }, function () { return passagePattern(1); }, patternTf, function () { return passagePattern(2); }],
          coach: '<p>Knowing the pattern tells you what to look for: in problem-solution, find the problem first, then the solution and whether it worked.</p>',
          mistake: '<p>Calling every text "time order" because it has a beginning and an end.</p>' },
        { slug: 'features', title: 'Features help readers find and understand', exp: ['C1.3'], skill: 'features',
          model: [
            step(W.sent('Sturgeon swim upstream to <b>spawn</b>.'), 'A bold word.'),
            step(LOOK.glossary, 'Its meaning is in the glossary at the back.'),
            step(LOOK.index, 'The index finds every page on a topic.'),
            step(LOOK.timeline, 'A timeline shows which came first.'),
            step(LOOK.infographic, 'An infographic: facts at a glance.')
          ],
          guided: [function () { return feature(1); }, function () { return whichFeature(1); }, function () { return featureLook(1); }],
          check: [function () { return feature(2); }, function () { return whichFeature(2); }, function () { return featureLook(2); }, featureMatch, function () { return whichFeature(3); }],
          coach: '<p>Before reading an information text, preview its features: headings, glossary, captions, sidebars. It builds a map.</p>',
          mistake: '<p>Skipping captions and sidebars, where key facts often sit.</p>' },
        { slug: 'graphs', title: 'Check the scale before you trust a graph', exp: ['C1.4'], skill: 'graphs',
          model: [
            step(graph(DATA[0][0], DATA[0][1], 0), 'Starts at 0: a fair picture.'),
            step(graph(DATA[0][0], DATA[0][1], 37), 'Starts at 37: the same numbers look dramatic.'),
            step(graph(DATA[4][0], DATA[4][1], 12), 'July looks about five times June' + AP + 's height…'),
            step(W.chain(['22', '19'], ['July', 'June']), '…but the numbers are close. Read them.')
          ],
          guided: [function () { return graphMost(1); }, misleading, function () { return graphDiff(1); }],
          check: [misleading, function () { return graphDiff(2); }, graphTf, function () { return graphMost(3); }, misleading],
          coach: '<p>Find a graph in a newspaper or ad and check its scale together. Ask: "What does the designer want me to feel?"</p>',
          mistake: '<p>Judging by bar height without reading the numbers.</p>' }
      ]
    }, {
      id: 'style', title: 'Style and narrators', sub: 'How it is written, and who is telling it.',
      concepts: [
        { slug: 'voice', title: 'Voice is the personality in the writing', exp: ['C1.5'], skill: 'voice',
          model: [
            step(W.sent(VOICE[0][0])),
            step(W.sent(VOICE[0][0].replace(VOICE[0][2], '<mark class="hl">' + VOICE[0][2] + '</mark>')), 'Boastful.'),
            step(W.sent(VOICE[4][0])),
            step(W.sent(VOICE[4][0].replace(VOICE[4][2], '<mark class="hl">' + VOICE[4][2] + '</mark>')), 'Sarcastic: the writer means the opposite.')
          ],
          guided: [function () { return voice(1); }, function () { return voiceWords(1); }, voiceTf],
          check: [function () { return voice(2); }, function () { return voiceWords(2); }, voiceTf, voiceMatch, function () { return voice(3); }],
          coach: '<p>Read a line aloud in the voice you hear. Then ask which words created that voice.</p>',
          mistake: '<p>Describing the topic instead of the voice ("it is about soccer").</p>' },
        { slug: 'sentence-style', title: 'Sentence shape and repetition create effects', exp: ['C1.5'], skill: 'shape',
          model: [
            step(W.sent(SHAPE[0][0]), 'Three short sentences.'),
            step(W.means('before', 'Short and sharp: tension.')),
            step(W.sent(SHAPE[3][0]), 'One long sentence.'),
            step(W.means('full', 'Long and flowing: calm.')),
            step(T.show(T.portage), '<b>Lift the canoe</b> comes back, like steady steps.')
          ],
          guided: [function () { return technique(1); }, function () { return shape(1); }, repeat],
          check: [function () { return technique(2); }, function () { return shape(2); }, shapeTf, repeat, function () { return shape(3); }],
          coach: '<p>Have the child rewrite a tense moment from a story as one long sentence. What is lost?</p>',
          mistake: '<p>Noticing a pattern without saying what effect it has.</p>' },
        { slug: 'narrator', title: 'Limited, omniscient or unreliable', exp: ['C1.6'], skill: 'narrator',
          model: [
            step(W.sent('She pictured her grandmother waiting…'), 'Limited: inside one character.'),
            step(W.sent('Neither of them knew…'), 'Omniscient: knows more than anyone in the story.'),
            step(W.sent('I can' + AP + 't imagine why.'), 'Unreliable: we see what the narrator cannot.'),
            step(W.passage(T.orchard.title, [T.orchard.lines[5]], { pics: T.orchard.pics }), 'Desmond' + AP + 's private thoughts…'),
            step(W.sent('She was sure the crop was lost…'), '…and Claire' + AP + 's too: omniscient.')
          ],
          guided: [function () { return narrator(1); }, function () { return narratorLine(1); }, function () { return altPov(1); }],
          check: [function () { return narrator(2); }, function () { return narratorLine(2); }, narratorTf, function () { return altPov(2); }, function () { return narrator(3); }],
          coach: '<p>Retell a scene from another character' + AP + 's point of view. What can they know, and what is hidden from them?</p>',
          mistake: '<p>Assuming the narrator is always telling the truth.</p>' }
      ]
    }],
    practice: [
      { id: 'genre', name: 'Forms and their features', code: 'C1.2', gen: genre },
      { id: 'patterns', name: 'Text patterns', code: 'C1.3', gen: pattern },
      { id: 'features', name: 'Text features', code: 'C1.3', gen: feature },
      { id: 'graphs', name: 'Reading graphs', code: 'C1.4', gen: misleading },
      { id: 'voice', name: 'Voice', code: 'C1.5', gen: voice },
      { id: 'shape', name: 'Sentence style', code: 'C1.5', gen: technique },
      { id: 'narrator', name: 'Narrators', code: 'C1.6', gen: narrator }
    ],
    tasks: [
      { id: 'indigenous-storywork', title: 'Texts by First Nations, Métis and Inuit creators', code: 'C1.7', pic: W.icon('read'), say: 'Read, listen to or view works by First Nations, Métis or Inuit creators. Talk about what they teach.',
        run: ['With your librarian, choose two works by First Nations, Métis or Inuit creators in different forms, for example a graphic novel, a poem, a film or a recorded story. Check the creator' + AP + 's nation or community in the author note.',
          'Read, listen or view together. Ask: "What does this teach about history, relationships, community or the land? How does the form help?"', 'Talk about the creator' + AP + 's purpose and audience, and connect respectfully to life today.'],
        rubric: ['Recalls little of the works.', 'Retells them with help.', 'Explains what the works teach and how the form helps, respectfully.', 'Makes insightful, respectful connections across both works and to life today.'],
        coach: '<p>Indigenous Storywork centres the creator' + AP + 's own voice and knowledge. Choose works by creators from the community they write about, and avoid treating different nations as one culture.</p>' }
    ]
  });

  Q.shapes('forms', {
    genre: [[1, 'clue', genreClue], [1, 'match', genreMatch], [2, 'true-false', genreTf]],
    patterns: [[1, 'signal-words', signal], [1, 'true-false', patternTf], [2, 'whole-text', passagePattern]],
    features: [[1, 'which-feature', whichFeature], [1, 'what-is-this', featureLook], [2, 'match', featureMatch]],
    graphs: [[1, 'most-least', graphMost], [1, 'difference', graphDiff], [2, 'true-false', graphTf]],
    voice: [[1, 'which-words', voiceWords], [1, 'true-false', voiceTf], [2, 'match', voiceMatch]],
    shape: [[1, 'effect', shape], [1, 'true-false', shapeTf], [1, 'repeat', repeat]],
    narrator: [[1, 'line', narratorLine], [1, 'true-false', narratorTf], [2, 'other-view', altPov]]
  });
})();
