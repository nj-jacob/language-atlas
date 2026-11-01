/* Grade 8: forms, features and style.
   Ontario 2023 Language, Grade 8, Strand C (Comprehension):
   C1.2 characteristics of text forms and genres, and how they help communicate meaning
   C1.3 text patterns (such as problem-solution) and text features (such as a glossary and infographics)
   C1.4 how images, graphics and visual design create and contribute to meaning
   C1.5 elements of style: voice, word choice, word patterns and sentence structure
   C1.6 the narrator's point of view: limited, omniscient or unreliable, and other points of view
   With a grown-up: C1.7 texts by diverse First Nations, Metis and Inuit creators, through Indigenous Storywork.
   Passages are in ../texts.js. The graphs are drawn here from made-up survey numbers. Answer checks: tests/verify/grade8-forms.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;

  var GENRE = { 'short story': 'characters, a setting and a problem', 'information text': 'headings and facts', 'letter to the editor': 'a greeting, an opinion and a signature',
    satire: 'exaggeration that mocks something', poem: 'short lines, rhythm and repetition' };
  var FEATURE = [['glossary', 'explains key words'], ['infographic', 'shows facts with pictures and numbers'], ['sidebar', 'adds extra information beside the main text'],
    ['caption', 'explains an image'], ['timeline', 'shows events in time order'], ['heading', 'tells what a section is about']];
  /* short paragraphs and the pattern their signal words show */
  var PATTERN = [['Many schoolyards have no shade. One solution is to plant trees along the fence.', 'problem and solution'],
    ['Because the ice formed late, the winter road opened three weeks behind schedule.', 'cause and effect'],
    ['Canoes are light and quiet. Kayaks, on the other hand, are faster in open water.', 'compare and contrast'],
    ['First, the sap is collected. Next, it is boiled. Finally, the syrup is bottled.', 'time order'],
    ['The bridge was unsafe for trucks. To fix this, the town built a new one.', 'problem and solution'],
    ['As a result of the heavy rain, the creek overflowed its banks.', 'cause and effect'],
    ['Both owls and hawks hunt small animals. However, owls hunt at night.', 'compare and contrast'],
    ['In 1867, four provinces joined. Later, others followed.', 'time order']];
  var PATTERNS = ['problem and solution', 'cause and effect', 'compare and contrast', 'time order'];

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
    ['Bird species counted', [['Spring', 31], ['Summer', 36], ['Fall', 33]]]];

  /* style: [text, the voice] */
  var VOICE = [[T.captain, 'boastful, and blind to their own behaviour'], [T.spoon, 'mock-serious, like a real ad'], [T.library, 'formal and urgent']];
  /* sentence structure: [lines, the effect] */
  var SHAPE = [['The footsteps stopped. Someone was outside. I held my breath.', 'short sentences build tension'],
    ['The canoe drifted across the lake, past the sleeping cottages and the tall pines, until the shore was only a dark line behind us.', 'one long sentence creates a calm, flowing mood'],
    ['We can do better. We must do better. We will do better.', 'repeated sentence patterns add force']];
  var EFFECTS = SHAPE.map(function (s) { return s[1]; });
  /* [narrator, the passage, a line that shows it] */
  var POV = { limited: [T.ferry, 'She pictured her grandmother waiting'], omniscient: [T.river, 'Neither of them knew'], unreliable: [T.captain, 'I can' + '’' + 't imagine why.'] };
  var POVTIP = { limited: 'inside one character' + '’' + 's thoughts only', omniscient: 'knows what every character thinks, and more', unreliable: 'tells it in a way we cannot fully trust' };
  /* how a story would change from another point of view */
  var ALT = [[T.ferry, 'the deckhand', 'We would learn why he decided to hold the ferry.', 'We would learn what Amira pictured on the dock.'],
    [T.captain, 'Coach Ahmed', 'We would learn why the narrator was benched.', 'We would hear the narrator insist on being calm.'],
    [T.river, 'Josée', 'We would know only her thoughts, not Mr. Tremblay' + '’' + 's.', 'We would still know what both neighbours think.']];

  /* ---------- question makers: forms ---------- */
  function genre(lv) {
    var t = R.pick(T.list('kind', 1)), others = Object.keys(GENRE).filter(function (g) { return g !== t.kind; });
    return Q.tiles('What form or genre is this?', t.kind, R.some(others, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'What features do you see?',
      hint: 'Look for: ' + GENRE[t.kind] + '?', explain: 'It is ' + (t.kind === 'information text' ? 'an information text' : 'a ' + t.kind) + ': ' + GENRE[t.kind] + '.', meta: { k: 'g8-genre', t: t.title } });
  }
  function genreMatch() {
    var gs = R.some(Object.keys(GENRE), 3);
    return { q: 'Match each form to its features.', type: 'match', pairs: gs.map(function (g) { return [g, GENRE[g]]; }), hint: 'Picture an example of each.', explain: 'A form' + '’' + 's features help readers know how to read it.', meta: { k: 'g8-genre-match' } };
  }
  function genreClue() {
    var t = R.pick([T.library, T.spoon, T.portage, T.rooftop]);
    return Q.one('What tells you this is ' + (t.kind === 'information text' ? 'an information text' : 'a ' + t.kind) + '?', GENRE[t.kind], Object.keys(GENRE).filter(function (g) { return g !== t.kind; }).slice(0, 2).map(function (g) { return GENRE[g]; }), {
      fig: T.show(t), hint: 'Point to the features.', explain: GENRE[t.kind] + '.', meta: { k: 'g8-genre-clue', t: t.title } });
  }

  function genreTf() {
    var t = R.pick(T.list('kind', 1)), right = R.int(0, 1) === 1, said = right ? t.kind : R.pick(Object.keys(GENRE).filter(function (g) { return g !== t.kind; }));
    return { q: Q.name() + ' says this is ' + (said === 'information text' ? 'an ' : 'a ') + '<b>' + said + '</b>.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['Its features show what form it is.', 'Every text with a title is a short story.'], answer: 0 }, hint: 'Look for the features of each form.', explain: 'It is ' + (t.kind === 'information text' ? 'an information text' : 'a ' + t.kind) + '.', meta: { k: 'g8-genre-tf', t: t.title, said: said } };
  }

  /* ---------- patterns, features, graphs ---------- */
  function pattern(lv) {
    var p = R.pick(PATTERN);
    return Q.tiles('Which text pattern is this?', p[1], R.some(PATTERNS.filter(function (x) { return x !== p[1]; }), lv > 1 ? 3 : 2), { fig: W.sent(p[0]),
      prompt: 'Look for signal words.', hint: 'solution: problem. because, as a result: cause. however, on the other hand: compare. first, next: time order.', explain: p[1] + '.', meta: { k: 'g8-pattern', s: p[0] } });
  }
  function passagePattern() {
    var t = R.pick(T.list('pattern', 1));
    return Q.tiles('Which pattern organizes this text?', t.pattern, PATTERNS.filter(function (x) { return x !== t.pattern; }).slice(0, 2), { fig: T.show(t), hint: 'Look at the headings and signal words.', explain: t.pattern + '.', meta: { k: 'g8-passage-pattern', t: t.title } });
  }
  function feature(lv) {
    var f = R.pick(FEATURE);
    return Q.one('What does a <b>' + f[0] + '</b> do?', f[1], R.some(FEATURE.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), { hint: 'Picture where you see one.', explain: 'A ' + f[0] + ' ' + f[1] + '.', meta: { k: 'g8-feature', f: f[0] } });
  }
  function glossary() {
    var g = T.rooftop.glossary;
    return Q.one('Where would a reader find this?', 'in the glossary', ['in a caption', 'in the timeline'], { fig: W.sent('<b>' + g[0] + '</b>: ' + g[1]), hint: 'It explains a key word.', explain: 'A glossary explains key words used in the text.', meta: { k: 'g8-glossary' } });
  }
  function graphMost() {
    var d = R.pick(DATA), top = d[1].reduce(function (a, b) { return b[1] > a[1] ? b : a; });
    return Q.tiles('Which bar shows the most?', top[0], d[1].filter(function (b) { return b !== top; }).map(function (b) { return b[0]; }), { fig: graph(d[0], d[1], 0), hint: 'Read the number on each bar.', explain: top[0] + ': ' + top[1] + '.', meta: { k: 'g8-graph-most' } });
  }
  function misleading() {
    var d = R.pick(DATA), lo = Math.min.apply(null, d[1].map(function (b) { return b[1]; })) - 3, honest = R.int(0, 1) === 1;
    var right = honest ? 'No. The scale starts at 0, so the bars compare fairly.' : 'Yes. The scale starts at ' + lo + ', so small differences look huge.';
    var wrong = honest ? 'Yes. The scale starts at ' + lo + ', so small differences look huge.' : 'No. The scale starts at 0, so the bars compare fairly.';
    return Q.one('Does this graph make the differences look <b>bigger</b> than they are?', right, [wrong], { fig: graph(d[0], d[1], honest ? 0 : lo), prompt: 'Check the lowest number on the scale.',
      hint: 'A bar graph should start at 0. If it does not, differences look bigger.', explain: right, meta: { k: 'g8-misleading' } });
  }

  /* ---------- style and narrators ---------- */
  function voice(lv) {
    var v = R.pick(VOICE);
    return Q.one('How would you describe the <b>voice</b>?', v[1], VOICE.filter(function (x) { return x !== v; }).map(function (x) { return x[1]; }).slice(0, lv > 1 ? 2 : 1), { fig: T.show(v[0]),
      hint: 'Voice is the personality you hear in the writing.', explain: v[1] + '.', meta: { k: 'g8-voice-style', t: v[0].title } });
  }
  function shape() {
    var s = R.pick(SHAPE);
    return Q.one('Why are the sentences built this way?', s[1], EFFECTS.filter(function (e) { return e !== s[1]; }), { fig: W.sent(s[0]), hint: 'Count the words in each sentence. Look for patterns.', explain: s[1] + '.', meta: { k: 'g8-shape', s: s[0] } });
  }
  function repeat() {
    var t = T.portage;
    return Q.tiles('Which words repeat to create a rhythm, like walking?', 'Lift the canoe', ['The trail is long', 'the lake will wait'], { fig: T.show(t), hint: 'Which words come back?', explain: '<b>Lift the canoe</b> and <b>Step over</b> repeat, like steady steps on a portage.', meta: { k: 'g8-repeat' } });
  }
  function narrator(lv) {
    var k = R.pick(Object.keys(POV)), p = POV[k];
    return Q.tiles('What kind of narrator does this story have?', k, Object.keys(POV).filter(function (x) { return x !== k; }), { fig: T.show(p[0]), prompt: 'Whose thoughts do we hear? Can we trust what we are told?',
      hint: 'Limited: one character' + '’' + 's thoughts. Omniscient: everyone' + '’' + 's. Unreliable: we cannot fully trust it.', explain: 'This narrator ' + POVTIP[k] + '.', meta: { k: 'g8-narrator', t: p[0].title } });
  }
  function narratorLine() {
    var k = R.pick(Object.keys(POV)), p = POV[k], other = R.pick(p[0].lines.filter(function (l) { return l.indexOf(p[1]) < 0; }));
    return Q.one('Which line best shows this narrator is <b>' + k + '</b>?', p[0].lines.filter(function (l) { return l.indexOf(p[1]) >= 0; })[0], [other], { fig: T.show(p[0]),
      hint: 'This narrator ' + POVTIP[k] + '.', explain: '<mark class="hl">' + p[1] + '</mark>', meta: { k: 'g8-narrator-line', t: p[0].title } });
  }
  function altPov() {
    var a = R.pick(ALT);
    return Q.one('How would the story change if <b>' + a[1] + '</b> told it?', a[2], [a[3]], { fig: T.show(a[0]), hint: 'What could this person know that the current narrator does not?', explain: a[2], meta: { k: 'g8-alt-pov', t: a[0].title } });
  }

  Atlas.register('forms', {
    lessons: [{
      id: 'forms', title: 'Forms and patterns', sub: 'What kind of text, and how it is organized.',
      concepts: [
        { slug: 'genre', title: 'Each form has its own features', exp: ['C1.2'], skill: 'forms',
          model: [
            step(T.show(T.library), 'A greeting, an opinion, a signature: a letter to the editor.'),
            step(T.show(T.spoon), 'Exaggeration that mocks: satire.'),
            step(T.show(T.portage), 'Short lines and repetition: a poem.')
          ],
          guided: [function () { return genre(1); }, genreClue],
          check: [function () { return genre(2); }, genreMatch],
          coach: '<p>Cultural forms count too: oral stories, songs, and community traditions such as teachings shared by Elders. Talk about how each form shapes the message.</p>',
          mistake: '<p>Naming the form without pointing to the features that prove it.</p>' },
        { slug: 'patterns', title: 'Signal words reveal the pattern', exp: ['C1.3'], skill: 'patterns',
          model: [
            step(W.sent(PATTERN[0][0].replace('solution', '<mark class="hl">solution</mark>')), 'Problem and solution.'),
            step(W.sent(PATTERN[1][0].replace('Because', '<mark class="hl">Because</mark>')), 'Cause and effect.'),
            step(W.sent(PATTERN[2][0].replace('on the other hand', '<mark class="hl">on the other hand</mark>')), 'Compare and contrast.')
          ],
          guided: [function () { return pattern(1); }, passagePattern],
          check: [function () { return pattern(2); }, passagePattern],
          coach: '<p>Knowing the pattern tells you what to look for: in problem-solution, find the problem first, then the solution and whether it worked.</p>',
          mistake: '<p>Calling every text "time order" because it has a beginning and an end.</p>' },
        { slug: 'features', title: 'Features help readers find and understand', exp: ['C1.3'], skill: 'patterns',
          model: [
            step(W.sent('<b>asphalt</b>: ' + T.rooftop.glossary[1]), 'A glossary explains key words.'),
            step(W.tile('sidebar'), 'Extra information beside the main text.'),
            step(W.tile('infographic'), 'Facts as pictures and numbers.')
          ],
          guided: [function () { return feature(1); }, glossary],
          check: [function () { return feature(2); }, glossary],
          coach: '<p>Before reading an information text, preview its features: headings, glossary, captions, sidebars. It builds a map.</p>',
          mistake: '<p>Skipping captions and sidebars, where key facts often sit.</p>' },
        { slug: 'graphs', title: 'Check the scale before you trust a graph', exp: ['C1.4'], skill: 'patterns',
          model: [
            step(graph(DATA[0][0], DATA[0][1], 0), 'Starts at 0: a fair picture.'),
            step(graph(DATA[0][0], DATA[0][1], 37), 'Starts at 37: the same numbers look dramatic.')
          ],
          guided: [graphMost, misleading],
          check: [misleading, misleading],
          coach: '<p>Find a graph in a newspaper or ad and check its scale together. Ask: "What does the designer want me to feel?"</p>',
          mistake: '<p>Judging by bar height without reading the numbers.</p>' }
      ]
    }, {
      id: 'style', title: 'Style and narrators', sub: 'How it is written, and who is telling it.',
      concepts: [
        { slug: 'voice', title: 'Voice is the personality in the writing', exp: ['C1.5'], skill: 'style',
          model: [
            step(T.show(T.captain), 'Boastful, and blind to it.'),
            step(T.show(T.spoon), 'Mock-serious, like a real ad.')
          ],
          guided: [function () { return voice(1); }, shape],
          check: [function () { return voice(2); }, shape],
          coach: '<p>Read a line aloud in the voice you hear. Then ask which words created that voice.</p>',
          mistake: '<p>Describing the topic instead of the voice ("it is about soccer").</p>' },
        { slug: 'sentence-style', title: 'Sentence shape and repetition create effects', exp: ['C1.5'], skill: 'style',
          model: [
            step(W.sent(SHAPE[0][0]), 'Short sentences: tension.'),
            step(T.show(T.portage), '<b>Lift the canoe</b> comes back, like steady steps.')
          ],
          guided: [shape, repeat],
          check: [shape, repeat],
          coach: '<p>Have the child rewrite a tense moment from a story as one long sentence. What is lost?</p>',
          mistake: '<p>Noticing a pattern without saying what effect it has.</p>' },
        { slug: 'narrator', title: 'Limited, omniscient or unreliable', exp: ['C1.6'], skill: 'style',
          model: [
            step(W.sent('She pictured her grandmother waiting…'), 'Limited: inside one character.'),
            step(W.sent('Neither of them knew…'), 'Omniscient: knows more than anyone in the story.'),
            step(W.sent('I can' + '’' + 't imagine why.'), 'Unreliable: we see what the narrator cannot.')
          ],
          guided: [function () { return narrator(1); }, narratorLine],
          check: [function () { return narrator(2); }, altPov],
          coach: '<p>Retell a scene from another character' + '’' + 's point of view. What can they know, and what is hidden from them?</p>',
          mistake: '<p>Assuming the narrator is always telling the truth.</p>' }
      ]
    }],
    practice: [
      { id: 'forms', name: 'Forms and genres', code: 'C1.2', gen: genre },
      { id: 'patterns', name: 'Patterns, features and graphs', code: 'C1.3, C1.4', gen: pattern },
      { id: 'style', name: 'Style and narrators', code: 'C1.5, C1.6', gen: narrator }
    ],
    tasks: [
      { id: 'indigenous-storywork', title: 'Texts by First Nations, Métis and Inuit creators', code: 'C1.7', pic: W.icon('read'), say: 'Read, listen to or view works by First Nations, Métis or Inuit creators. Talk about what they teach.',
        run: ['With your librarian, choose two works by First Nations, Métis or Inuit creators in different forms, for example a graphic novel, a poem, a film or a recorded story. Check the creator' + '’' + 's nation or community in the author note.',
          'Read, listen or view together. Ask: "What does this teach about history, relationships, community or the land? How does the form help?"', 'Talk about the creator' + '’' + 's purpose and audience, and connect respectfully to life today.'],
        rubric: ['Recalls little of the works.', 'Retells them with help.', 'Explains what the works teach and how the form helps, respectfully.', 'Makes insightful, respectful connections across both works and to life today.'],
        coach: '<p>Indigenous Storywork centres the creator' + '’' + 's own voice and knowledge. Choose works by creators from the community they write about, and avoid treating different nations as one culture.</p>' }
    ]
  });

  Q.shapes('forms', {
    forms: [[1, 'clue', genreClue], [1, 'match', genreMatch], [2, 'true-false', genreTf]],
    patterns: [[1, 'in-passage', passagePattern], [1, 'feature', feature], [1, 'graph', graphMost], [1, 'misleading', misleading], [2, 'glossary', glossary]],
    style: [[1, 'voice', voice], [1, 'sentence-shape', shape], [1, 'repeat', repeat], [2, 'line', narratorLine], [2, 'other-view', altPov]]
  });
})();
