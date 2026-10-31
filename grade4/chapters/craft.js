/* Grade 4: how texts work.
   Ontario 2023 Language, Grade 4, Strand C:
   C1.3 text patterns (such as spatial order in a graphic text) and text features (such as type styles and hyperlinks), and how they help
   C1.4 how images, graphics and visual design create and contribute to meaning
   C1.5 elements of style: voice, word choice, word patterns and sentence structure
   C3.1 literary devices, including personification and anthropomorphism
   Pictures are drawn here in the page's own colours (currentColor). All texts are written for this site.
   Answer checks: tests/verify/grade4-craft.js (they read the pictures back to work out the answer). */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* ---------- text features ---------- */
  var FEATURES = [['bold type', 'shows an important word'], ['a hyperlink', 'takes you to another page online'], ['a caption', 'tells about a picture'],
    ['a heading', 'tells what one part is about'], ['a glossary', 'explains hard words'], ['italics', 'makes a word stand out, like a word from another language']];
  /* a small web page: each feature can be tapped */
  function page() {
    return W.passage('Monarchs', ['<b class="psh" data-hit="heading">Food</b>', 'Caterpillars eat only <b data-hit="bold">milkweed</b>. In Spanish, a butterfly is a <i data-hit="italics">mariposa</i>.',
      'Learn more: <u data-hit="link">how to plant milkweed</u>', '<small data-hit="caption">A monarch rests on a milkweed leaf.</small>']);
  }
  var TAPNAME = { heading: 'the heading', bold: 'the word in bold type', italics: 'the word in italics', link: 'the hyperlink', caption: 'the caption' };
  function featureJob(lv) {
    var f = R.pick(FEATURES);
    return Q.one('What does <b>' + f[0] + '</b> do?', f[1], R.some(FEATURES.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Think of where you see ' + f[0] + '.', explain: f[0].charAt(0).toUpperCase() + f[0].slice(1) + ' ' + f[1] + '.', meta: { k: 'g4-feature', f: f[0] } });
  }
  function featureMatch() {
    var fs = R.some(FEATURES.slice(0, 5), 3);
    return { q: 'Match each feature to its job.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Picture a web page or an information book.', explain: 'Features help you find and understand information.', meta: { k: 'g4-feature-match' } };
  }
  function tapPage() {
    var k = R.pick(Object.keys(TAPNAME));
    return { q: 'Tap <b>' + TAPNAME[k] + '</b>.', type: 'tap', pic: page(), answer: k, answerText: TAPNAME[k],
      hint: 'Bold is thick. Italics lean. A hyperlink is underlined. A caption sits under a picture.', explain: 'That is ' + TAPNAME[k] + '.', meta: { k: 'g4-tap-page', want: k } };
  }
  /* spatial order: the layers of a forest, top to bottom */
  var LAYERS = ['canopy', 'understory', 'shrubs', 'forest floor'];
  function forest(hit) {
    var ys = [34, 84, 132, 180];
    return '<svg viewBox="0 0 260 200" width="260" height="200" role="img" aria-label="the layers of a forest">' +
      '<path d="M40 190h70M75 190V60" stroke="currentColor" stroke-width="5"/><circle cx="75" cy="44" r="34" fill="none" stroke="currentColor" stroke-width="3"/>' +
      '<circle cx="64" cy="100" r="18" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M40 150q12-22 24 0q12-22 24 0" fill="none" stroke="currentColor" stroke-width="2.5"/>' +
      [0, 1, 2].map(function (i) { return '<path d="M130 ' + (ys[i] + 22) + 'h120" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity=".6"/>'; }).join('') +
      LAYERS.map(function (l, i) { return '<text x="140" y="' + ys[i] + '" font-size="17" fill="currentColor"' + (hit ? ' data-hit="' + l + '"' : '') + '>' + l + '</text>'; }).join('') + '</svg>';
  }
  function layerOrder() {
    return { q: 'The diagram goes from top to bottom. Put the layers in that order.', fig: forest(false), type: 'order', items: LAYERS.slice(), first: 'Top', last: 'Bottom',
      hint: 'Start at the top of the picture and move down.', explain: 'Diagrams can be read in spatial order: top to bottom.', meta: { k: 'g4-layers' } };
  }
  function layerTap() {
    var i = R.pick([0, 3]), where = i === 0 ? 'at the very top' : 'at the bottom';
    return { q: 'Tap the layer ' + where + ' of the forest.', type: 'tap', pic: forest(true), answer: LAYERS[i], answerText: LAYERS[i],
      hint: 'Look at where each label sits.', explain: 'The <b>' + LAYERS[i] + '</b> is ' + where + '.', meta: { k: 'g4-layer-tap', where: i === 0 ? 'top' : 'bottom' } };
  }

  /* ---------- images and graphics ---------- */
  var DAYS = ['Mon', 'Tue', 'Wed', 'Thu'];
  /* a bar graph of birds counted at a feeder; the counts are different so there is one most and one least */
  function graph(counts) {
    return '<svg viewBox="0 0 260 190" width="260" height="190" role="img" aria-label="a bar graph of birds counted each day">' +
      '<path d="M30 160H250M30 160V10" stroke="currentColor" stroke-width="2"/>' +
      counts.map(function (c, i) { var h = c * 14, x = 45 + i * 52; return '<rect data-day="' + DAYS[i] + '" x="' + x + '" y="' + (160 - h) + '" width="32" height="' + h + '" fill="currentColor" opacity=".55"/>' +
        '<text x="' + (x + 16) + '" y="180" font-size="14" text-anchor="middle" fill="currentColor">' + DAYS[i] + '</text>'; }).join('') + '</svg>';
  }
  function counts() { return R.some([2, 3, 4, 5, 6, 7, 8, 9, 10], 4); }
  function graphRead(lv, most0) {
    var c = counts(), most = most0 === undefined ? (lv > 1 ? R.int(0, 1) === 1 : true) : most0, v = most ? Math.max.apply(null, c) : Math.min.apply(null, c), d = DAYS[c.indexOf(v)];
    return Q.tiles('Birds at our feeder. On which day did we count the <b>' + (most ? 'most' : 'fewest') + '</b> birds?', d, DAYS.filter(function (x) { return x !== d; }), { fig: graph(c),
      prompt: 'Find the ' + (most ? 'tallest' : 'shortest') + ' bar.', hint: 'A taller bar means more birds.', explain: 'The ' + (most ? 'tallest' : 'shortest') + ' bar is <b>' + d + '</b>.', meta: { k: 'g4-graph' } });
  }
  function graphWhy() {
    return Q.one('Why did the writer use a graph instead of a list of numbers?', 'to compare the days at a glance', ['to tell a story', 'to make the page longer'], { fig: graph(counts()),
      hint: 'What can you see quickly?', explain: 'A bar graph lets you compare amounts at a glance.', meta: { k: 'g4-graph-why' } });
  }
  /* [a visual choice, what it does for the reader] */
  var DESIGN = [['a big, bold title', 'catches your eye and names the topic'], ['a photo of the real animal', 'shows what it really looks like'], ['arrows in a diagram', 'show the order or direction'],
    ['a map', 'shows where things are'], ['a bar graph', 'compares amounts'], ['a timeline', 'shows when things happened']];
  function designWhy(lv) {
    var d = R.pick(DESIGN);
    return Q.one('Why would a writer use <b>' + d[0] + '</b>?', d[1], R.some(DESIGN.filter(function (x) { return x !== d; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'What does it help the reader see?', explain: d[0].charAt(0).toUpperCase() + d[0].slice(1) + ' ' + d[1] + '.', meta: { k: 'g4-design', d: d[0] } });
  }
  function designMatch() {
    var ds = R.some(DESIGN, 3);
    return { q: 'Match each picture or design to its job.', type: 'match', pairs: ds.map(function (d) { return [d[0], d[1]]; }), hint: 'What does each one help you see?', explain: 'Images and design add meaning.', meta: { k: 'g4-design-match' } };
  }

  /* ---------- style ---------- */
  /* [an information-book voice, a chatty voice] */
  var VOICE = [['Monarch butterflies travel up to 4000 km each fall.', 'Guess what? Monarchs fly sooo far every fall!'], ['The museum opens at 10 a.m. on weekdays.', 'The museum opens at ten, so don' + '’' + 't be late, okay?'],
    ['Beavers build dams from sticks and mud.', 'Beavers are, like, the best builders ever!'], ['Maple sap flows in early spring.', 'Spring is here, and the sap is going wild!']];
  var SUSPENSE = ['The door creaked. Footsteps. Closer. Then silence.', 'Kai froze. A twig snapped. Something was there.', 'The lights went out. Nobody moved. A drip. Another drip.'];
  var CALM = ['We walked slowly along the quiet beach while the waves rolled gently onto the sand.', 'The cat stretched out in the warm sunshine and slept the whole afternoon away.',
    'Grandma hummed as she stirred the soup, and the kitchen filled with a warm smell.'];
  /* [sentence with a gap, a strong verb, a plain verb] */
  var VERB = [['The wind ___ the door shut.', 'slammed', 'moved'], ['The hungry puppy ___ its food.', 'gobbled', 'ate'], ['The runner ___ across the finish line.', 'dashed', 'went'],
    ['Snow ___ softly onto the roof.', 'drifted', 'came'], ['The campfire ___ in the dark.', 'crackled', 'was']];
  function voice() {
    var v = R.pick(VOICE), formal = R.int(0, 1) === 1;
    return Q.one('Which sounds like ' + (formal ? 'an <b>information book</b>' : 'a <b>friend talking</b>') + '?', formal ? v[0] : v[1], [formal ? v[1] : v[0]], {
      hint: 'Information books sound calm and exact. Friends sound chatty.', explain: 'The writer' + '’' + 's <b>voice</b> fits the kind of text.', meta: { k: 'g4-voice', formal: formal } });
  }
  function suspense(lv) {
    return Q.one('Which builds <b>suspense</b>?', R.pick(SUSPENSE), R.some(CALM, lv > 1 ? 2 : 1), { prompt: 'Read each aloud. Which one makes you hold your breath?',
      hint: 'Short sentences make the reader read faster and feel tense.', explain: 'Short, choppy sentences build suspense.', meta: { k: 'g4-suspense' } });
  }
  function whyShort() {
    return Q.one('Why does the writer use such short sentences?', 'to build suspense', ['to explain a fact', 'to sound calm and sleepy'], { fig: W.sent(R.pick(SUSPENSE)),
      hint: 'How does it feel to read?', explain: 'Short sentences speed you up and build suspense.', meta: { k: 'g4-why-short' } });
  }
  function strongVerb() {
    var v = R.pick(VERB);
    return Q.tiles('Which verb helps you <b>see and hear</b> it?', v[1], [v[2]], { fig: W.sent(v[0].replace('___', W.gap())), hint: 'Which one shows exactly how?', explain: W.sent(v[0].replace('___', '<b>' + v[1] + '</b>')), meta: { k: 'g4-strong-verb', s: v[0] } });
  }

  /* ---------- literary devices ---------- */
  var PERSON = ['The old maple stretches its arms to the sky.', 'The wind whispered through the pines.', 'The sun smiled down on the beach.', 'The kettle sang on the stove.', 'The stars winked at us.', 'Thunder grumbled in the distance.'];
  var PLAIN = ['The old maple is very tall.', 'The wind blew through the pines.', 'The sun was bright over the beach.', 'The kettle boiled on the stove.', 'The stars were bright.', 'Thunder was loud far away.'];
  var ANIMAL = ['Crow put on her reading glasses and opened a shop.', 'The bear family ate pancakes with forks.', 'Rabbit packed a suitcase for her trip to the city.', 'Two raccoons argued about whose turn it was to drive.'];
  var NATURAL = ['The crow picked up a shiny button.', 'The bear caught a fish in the river.', 'The rabbit hopped into its burrow.', 'Two raccoons dug through the leaves.'];
  function person(lv) {
    var i = R.int(0, PERSON.length - 1);
    return Q.one('Which sentence uses <b>personification</b>?', PERSON[i], [PLAIN[i]].concat(lv > 1 ? R.some(PLAIN.filter(function (p, j) { return j !== i; }), 1) : []), {
      prompt: 'Does a thing do something only a person can do?', hint: 'Personification gives a thing human actions.', explain: W.sent(PERSON[i]) + ' A thing acts like a person.', meta: { k: 'g4-person' } });
  }
  function animal(lv) {
    var i = R.int(0, ANIMAL.length - 1);
    return Q.one('Which shows an animal acting like a <b>person</b>?', ANIMAL[i], [NATURAL[i]].concat(lv > 1 ? R.some(NATURAL.filter(function (p, j) { return j !== i; }), 1) : []), {
      hint: 'Real animals do not wear glasses or drive.', explain: 'This is <b>anthropomorphism</b>: an animal acts like a person.', meta: { k: 'g4-animal' } });
  }
  function whichDevice() {
    var thing = R.int(0, 1) === 1, s = R.pick(thing ? PERSON : ANIMAL);
    return { q: 'Which device is this?', fig: W.sent(s), type: 'tap', tiles: ['personification', 'anthropomorphism'], answer: thing ? 0 : 1,
      prompt: 'Is it a thing, or an animal, acting like a person?', hint: 'A thing acting human: personification. An animal acting human: anthropomorphism.',
      explain: thing ? 'A thing acts like a person: <b>personification</b>.' : 'An animal acts like a person: <b>anthropomorphism</b>.', meta: { k: 'g4-which-device', s: s } };
  }
  function devicePick() {
    return Q.all('Pick every sentence where something that is <b>not a person</b> acts like one.', R.some(PERSON, 1).concat(R.some(ANIMAL, 1)), R.some(PLAIN, 1).concat(R.some(NATURAL, 1)), {
      hint: 'Could a real tree, kettle or bear do this?', explain: 'Writers use these devices to make things feel alive and help readers connect.', meta: { k: 'g4-device-pick' } });
  }

  Atlas.register('craft', {
    lessons: [{
      id: 'features', title: 'Features and visuals', sub: 'Type styles, links, diagrams and graphs.',
      concepts: [
        { slug: 'type', title: 'Bold, italics and links', exp: ['C1.3'], skill: 'features',
          model: [
            step(page(), 'A page from a website.'),
            step(W.sent('Caterpillars eat only <b>milkweed</b>.'), '<b>Bold</b>: an important word.'),
            step(W.sent('In Spanish, a butterfly is a <i>mariposa</i>.'), '<i>Italics</i>: a word from another language.'),
            step(W.sent('Learn more: <u>how to plant milkweed</u>'), 'A <b>hyperlink</b> takes you to another page.')
          ],
          guided: [function () { return featureJob(1); }, tapPage],
          check: [function () { return featureJob(2); }, tapPage],
          coach: '<p>On a kids' + '’' + ' website, hunt for bold words, captions and links. Ask: "Why did the writer make this one bold?"</p>',
          mistake: '<p>Skipping bold words and captions. They often hold the most important facts.</p>' },
        { slug: 'spatial', title: 'Read a diagram in order', exp: ['C1.3'], skill: 'features',
          model: [
            step(forest(false), 'The layers of a forest.'),
            step(W.sent('canopy &rarr; understory &rarr; shrubs &rarr; forest floor'), 'Top to bottom.'),
            step(W.icon('think'), 'Some diagrams go left to right, or inside to outside.')
          ],
          guided: [layerOrder, layerTap],
          check: [layerOrder, layerTap],
          coach: '<p>Ask: "Where does this diagram start? Which way does it go?" Run a finger along it before reading the labels.</p>',
          mistake: '<p>Reading labels in a random order. Find the pattern first: top to bottom, left to right, or in a cycle.</p>' },
        { slug: 'graphs', title: 'Pictures and graphs add meaning', exp: ['C1.4'], skill: 'visuals',
          model: [
            step(graph([3, 8, 5, 2]), 'Birds counted each day.'),
            step(W.sent('Tue: the tallest bar.'), 'Most birds.'),
            step(W.means('think', 'A graph compares at a glance.'))
          ],
          guided: [function () { return graphRead(1, true); }, function () { return designWhy(1); }],
          check: [function () { return graphRead(2); }, function () { return designWhy(2); }],
          coach: '<p>Make a quick bar graph of something at home (socks by colour, birds at a feeder) and ask questions about it.</p>',
          mistake: '<p>Reading the label under the shortest bar as "the most". Check: taller means more.</p>' }
      ]
    }, {
      id: 'style', title: 'The writer' + '’' + 's style', sub: 'Voice, word choice and sentence length.',
      concepts: [
        { slug: 'voice', title: 'Voice fits the text', exp: ['C1.5'], skill: 'style',
          model: [
            step(W.sent('Beavers build dams from sticks and mud.'), 'An information book: calm and exact.'),
            step(W.sent('Beavers are, like, the best builders ever!'), 'A friend: chatty.'),
            step(W.sent('The wind <b>slammed</b> the door shut.'), 'A strong verb lets you hear it.')
          ],
          guided: [voice, strongVerb],
          check: [voice, strongVerb],
          coach: '<p>Read a page from a science book and a page from a diary-style novel. Ask: "Who does each one sound like?"</p>',
          mistake: '<p>Thinking there is only one right voice. The right voice depends on the kind of text.</p>' },
        { slug: 'sentences', title: 'Short sentences build suspense', exp: ['C1.5'], skill: 'style',
          model: [
            step(W.sent('The door creaked. Footsteps. Closer.'), 'Short. Tense. You read faster.'),
            step(W.sent('We walked slowly along the quiet beach while the waves rolled gently onto the sand.'), 'Long and flowing: calm.')
          ],
          guided: [function () { return suspense(1); }, whyShort],
          check: [function () { return suspense(2); }, whyShort],
          coach: '<p>Read both kinds aloud. Notice how your voice speeds up in the short ones.</p>',
          mistake: '<p>Calling short sentences "bad writing". Writers choose them on purpose.</p>' }
      ]
    }, {
      id: 'devices', title: 'Literary devices', sub: 'Things and animals that act like people.',
      concepts: [
        { slug: 'personification', title: 'Personification', exp: ['C3.1'], skill: 'devices',
          model: [
            step(W.sent('The wind blew through the pines.'), 'Plain.'),
            step(W.sent('The wind <b>whispered</b> through the pines.'), 'Wind cannot really whisper.'),
            step(W.icon('think'), 'A thing acts like a person, so it feels alive.')
          ],
          guided: [function () { return person(1); }, function () { return person(1); }],
          check: [function () { return person(2); }, devicePick],
          coach: '<p>Pick an object in the room and make it act human: "The fridge hummed a tune." Ask how it changes the feeling.</p>',
          mistake: '<p>Calling any describing sentence personification. Look for a human action: smile, whisper, sing.</p>' },
        { slug: 'anthropomorphism', title: 'Animals who act like people', exp: ['C3.1'], skill: 'devices',
          model: [
            step(W.sent('The crow picked up a shiny button.'), 'A real crow could do this.'),
            step(W.sent('Crow put on her reading glasses and opened a shop.'), 'A crow acting like a person.'),
            step(W.tile('anthropomorphism'), 'Common in fables, to teach a lesson.')
          ],
          guided: [function () { return animal(1); }, whichDevice],
          check: [function () { return animal(2); }, whichDevice],
          coach: '<p>Break the long word into parts: anthropo (person) + morph (shape). The animal takes the shape of a person.</p>',
          mistake: '<p>Mixing the two. A thing acting human is personification; an animal acting human is anthropomorphism.</p>' }
      ]
    }],
    practice: [
      { id: 'features', name: 'Text features and diagrams', code: 'C1.3', gen: featureJob },
      { id: 'visuals', name: 'Pictures and graphs', code: 'C1.4', gen: graphRead },
      { id: 'style', name: 'The writer' + '’' + 's style', code: 'C1.5', gen: voice },
      { id: 'devices', name: 'Personification and anthropomorphism', code: 'C3.1', gen: person }
    ]
  });

  Q.shapes('craft', {
    features: [[1, 'tap-page', tapPage], [1, 'layers', layerOrder], [1, 'layer-tap', layerTap], [2, 'match', featureMatch]],
    visuals: [[1, 'why-graph', graphWhy], [1, 'design', designWhy], [2, 'match', designMatch]],
    style: [[1, 'suspense', suspense], [1, 'why-short', whyShort], [1, 'strong-verb', strongVerb]],
    devices: [[1, 'animal', animal], [1, 'which-device', whichDevice], [2, 'pick', devicePick]]
  });
})();
