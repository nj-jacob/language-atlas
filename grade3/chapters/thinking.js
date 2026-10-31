/* Grade 3: thinking about texts.
   Ontario 2023 Language, Grade 3, Strand C (Comprehension):
   C1.3 text patterns (such as cause and effect) and text features (such as headings and an index)
   C1.4 how images, graphics and visual design are used in a text      C1.5 elements of style: voice, word choice, word patterns
   C3.1 literary devices, including metaphor and assonance             C3.2 inferences from stated and implied information
   C3.3 main and supporting ideas, sequencing, comparing and contrasting C3.5 perspectives in texts, with evidence
   With a grown-up: C3.4 cultural elements in texts, C3.6 thoughts and feelings about ideas such as diversity, inclusion and
   accessibility, C3.7 texts by First Nations, Metis and Inuit creators about history and lived experience, C3.8 thinking skills.
   Passages are in ../texts.js; everything else is written here for this site. Answer checks: tests/verify/grade3-thinking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;

  var FEATURES = [['heading', 'tells what one part is about'], ['index', 'helps you find the page for a topic'], ['caption', 'tells about a picture'],
    ['label', 'names a part of a picture'], ['title', 'tells what the whole text is about'], ['diagram', 'shows the parts of something']];
  var METAPHOR = ['The moon is a lamp above the lake.', 'The wind is a whisper in the pines.', 'My brother is a rocket on his bike.', 'The snow is a white blanket on the field.', 'Her laugh is music.'];
  var PLAIN = ['The moon is bright tonight.', 'The wind blows through the pines.', 'My brother rides his bike fast.', 'The snow is deep on the field.', 'Her laugh is loud.'];
  var SOUND = [['The stars glow slow over the snow.', 'o'], ['I sleep deep and dream.', 'ee'], ['The cat sat at the back of the van.', 'a'], ['Light the kite at night.', 'i']];
  var NOSOUND = ['The bird flew past the house.', 'Rain fell on the hill.', 'A duck swam home.', 'We met Kai at the store.'];
  var PICTURE = [['The dog ate.', 'The hungry dog gobbled its dinner.'], ['It was cold.', 'An icy wind nipped at my cheeks.'], ['The bird sang.', 'A tiny robin sang a bright, cheerful song.'],
    ['We went down the hill.', 'We zoomed down the snowy hill on our toboggan.'], ['The lake was nice.', 'The lake sparkled like glass in the morning sun.']];
  var PATTERN = [[['Snow on the roof,', 'snow on the road,', 'snow on my nose!'], 'snow'], [['Splash in the puddle,', 'splash in the rain,', 'splash all the way home!'], 'splash'],
    [['Tap goes the rain,', 'tap on the glass,', 'tap, tap, tap.'], 'tap']];
  /* what you would read about under each heading of the information texts */
  var TOPIC = { Home: 'lodges', Teeth: 'chewing wood', Winter: 'swimming under the ice', 'A long history': 'who made syrup first', Sap: 'how sap starts to flow', Boiling: 'turning sap into syrup' };
  /* two animals to compare */
  var PAIR = { a: 'Snowshoe hare', b: 'Arctic fox', both: ['Its fur turns white in winter.', 'It lives where winters are long.'], onlyA: ['It eats plants.', 'It has very long ears.'], onlyB: ['It eats other animals.', 'It has small ears.'] };

  /* ---------- question makers ---------- */
  function featureJob(lv) {
    var f = R.pick(FEATURES);
    return Q.one('What does a <b>' + f[0] + '</b> do?', f[1], R.some(FEATURES.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Think of where you see a ' + f[0] + ' in a book.', explain: 'A ' + f[0] + ' ' + f[1] + '.', meta: { k: 'g3-feature', f: f[0] } });
  }
  function matchFeatures() {
    var fs = R.some(FEATURES, 3);
    return { q: 'Match each part of a book to its job.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Think of an information book.', explain: 'Text features help you find and understand facts.', meta: { k: 'g3-match-features' } };
  }
  function whichHeading() {
    var t = R.pick([T.beavers, T.maple]), heads = t.lines.filter(function (l) { return l.charAt(0) === '#'; }).map(function (l) { return l.slice(2); });
    var i = R.int(0, heads.length - 1), topic = TOPIC[heads[i]];
    return Q.tiles('Under which heading would you read about <b>' + topic + '</b>?', heads[i], heads.filter(function (h) { return h !== heads[i]; }), { fig: T.show(t),
      hint: 'Read the part under each heading.', explain: 'It is under <b>' + heads[i] + '</b>.', meta: { k: 'g3-heading', topic: topic } });
  }
  function causeEffect() {
    var t = R.pick([T.beavers, T.maple]), c = t.cause;
    return { q: 'Match each cause to what it makes happen.', fig: T.show(t), type: 'match', pairs: c.map(function (x) { return [x[0], x[1]]; }), hint: 'Ask: what happens because of this?', explain: 'A cause makes something happen. That is the effect.', meta: { k: 'g3-cause', t: t.title } };
  }

  function metaphor(lv) {
    var i = R.int(0, METAPHOR.length - 1), others = R.some(PLAIN.filter(function (p, j) { return j !== i; }), lv > 1 ? 2 : 1);
    return Q.one('Which sentence is a <b>metaphor</b>?', METAPHOR[i], [PLAIN[i]].concat(others), { prompt: 'Does it say one thing <b>is</b> something else?',
      hint: 'A metaphor says one thing is another thing, to compare them.', explain: W.sent(METAPHOR[i]) + ' compares two things.', meta: { k: 'g3-metaphor' } });
  }
  function sound(lv) {
    var s = R.pick(SOUND);
    return Q.one('Which line repeats the same <b>vowel sound</b>?', s[0], R.some(NOSOUND, lv > 1 ? 2 : 1), { prompt: 'Say each one aloud. Listen for a sound that comes back.',
      hint: 'Listen to the middle of the words.', explain: 'The <b>' + s[1] + '</b> sound comes again and again. This is called <b>assonance</b>.', meta: { k: 'g3-assonance' } });
  }
  function picture() {
    var p = R.pick(PICTURE);
    return Q.one('Which sentence helps you <b>picture</b> it best?', p[1], [p[0]], { hint: 'Which one uses describing and action words?', explain: 'Strong words help readers see it.', meta: { k: 'g3-picture' } });
  }
  function pattern() {
    var p = R.pick(PATTERN), words = p[0].join(' ').toLowerCase().replace(/[,.!]/g, '').split(' ').filter(function (w, i, all) { return all.indexOf(w) === all.lastIndexOf(w) && w.length > 2; }); /* words used only once */
    return Q.tiles('Which word repeats to make a pattern?', p[1], R.some(words, 2), { fig: W.passage('', p[0]), hint: 'Which word do you see again and again?', explain: '<b>' + p[1] + '</b> repeats. Patterns make writing fun to read aloud.', meta: { k: 'g3-pattern' } });
  }

  function infer(lv) {
    var t = R.pick(T.list('infer')), f = R.pick(t.infer), wrong = t.infer.filter(function (x) { return x !== f; }).map(function (x) { return x[1]; }).concat([f[2]]);
    return Q.one(f[0], f[1], wrong.slice(0, lv > 1 ? 2 : 1), { fig: T.show(t), prompt: 'The text does not say it. Look for a clue: <b>' + f[3] + '</b>.',
      hint: 'What do the character’s actions tell you?', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g3-infer', t: t.title, q: f[0] } });
  }
  function evidence() {
    var t = R.pick(T.list('infer')), f = R.pick(t.infer), other = t.infer.filter(function (x) { return x !== f; })[0];
    return Q.one('The answer is <b>' + f[1] + '</b>. Which words show it? <b>' + f[0] + '</b>', f[3], [other[3]], { fig: T.show(t),
      hint: 'Which words fit the feeling?', explain: '<mark class="hl">' + f[3] + '</mark> shows it.', meta: { k: 'g3-evidence', t: t.title, q: f[0] } });
  }
  function compare(lv) {
    var both = R.pick(PAIR.both), a = R.pick(PAIR.onlyA), b = R.pick(PAIR.onlyB);
    var fig = W.passage(PAIR.a, PAIR.both.concat(PAIR.onlyA)) + W.passage(PAIR.b, PAIR.both.concat(PAIR.onlyB));
    return Q.one('Which is true of <b>both</b> animals?', both, lv > 1 ? [a, b] : [R.pick([a, b])], { fig: '<div class="wpics">' + fig + '</div>', prompt: 'Find a sentence that is in both cards.',
      hint: 'It must be in both cards.', explain: 'Both: ' + both, meta: { k: 'g3-compare' } });
  }
  function perspective() {
    var t = T.rink, v = t.view;
    return Q.one('What does <b>' + v.who + '</b> think?', v.thinks, v.wrong, { fig: T.show(t), prompt: 'Who wrote it? What do they want?',
      hint: 'Look at what she asks for, and her reasons.', explain: v.who + ' thinks: ' + v.thinks, meta: { k: 'g3-perspective' } });
  }

  Atlas.register('thinking', {
    lessons: [{
      id: 'built', title: 'How texts are built', sub: 'Text features, pictures, and cause and effect.',
      concepts: [
        { slug: 'features', title: 'Headings, captions and labels', exp: ['C1.3', 'C1.4'], skill: 'features',
          model: [
            step(T.show(T.beavers), 'An information text.'),
            step(W.sent('<b>Teeth</b>'), 'A <b>heading</b> tells what this part is about.'),
            step(W.sent('<b>Index</b>: beavers, 4 &middot; lodges, 6'), 'An <b>index</b> tells you which page to turn to.'),
            step(W.sent('<b>Caption</b>: A beaver carries a branch.'), 'A <b>caption</b> tells about a picture.')
          ],
          key: '<p>Text features help you find facts and understand pictures.</p>',
          guided: [function () { return featureJob(1); }, whichHeading],
          check: [function () { return featureJob(2); }, matchFeatures],
          coach: '<p>Go on a "feature hunt" in a library information book: find a heading, a caption, a label and the index.</p>',
          mistake: '<p>Skipping headings and pictures. They are part of the text and help a lot.</p>' },
        { slug: 'cause-effect', title: 'Cause and effect', exp: ['C1.3'], skill: 'features',
          model: [
            step(W.sent('A beaver chews wood.'), 'A <b>cause</b>.'),
            step(W.sent('A beaver chews wood.') + ' &rarr; ' + W.sent('Its teeth stay short.'), 'What it makes happen: the <b>effect</b>.')
          ],
          key: '<p>Cause: why it happens. Effect: what happens.</p>',
          guided: [causeEffect, causeEffect],
          check: [causeEffect, whichHeading],
          coach: '<p>Use "because" and "so" in talk: "The ice melted because it was warm." "It was warm, so the ice melted."</p>',
          mistake: '<p>Swapping cause and effect. Ask: "Which one happened first?"</p>' }
      ]
    }, {
      id: 'craft', title: 'The writer' + '’' + 's craft', sub: 'Strong words, patterns, metaphors and sounds.',
      concepts: [
        { slug: 'word-choice', title: 'Words that paint a picture', exp: ['C1.5'], skill: 'craft',
          model: [
            step(W.sent('The dog ate.'), 'I can not picture much.'),
            step(W.sent('The <b>hungry</b> dog <b>gobbled</b> its dinner.'), 'Now I can see it.'),
            step(W.passage('', ['Snow on the roof,', 'snow on the road,', 'snow on my nose!']), 'Writers also repeat words to make a pattern.')
          ],
          key: '<p>Strong words help you picture it. Patterns make it fun to read aloud.</p>',
          guided: [picture, pattern],
          check: [picture, pattern],
          coach: '<p>While reading, stop at a sentence you love and ask: "Which words help you picture it?"</p>',
          mistake: '<p>Thinking longer always means better. The best words are exact, not just many.</p>' },
        { slug: 'metaphor', title: 'Metaphors', exp: ['C3.1'], skill: 'craft',
          model: [
            step(W.sent('The moon is bright.'), 'A plain sentence.'),
            step(W.sent('The moon <b>is a lamp</b> above the lake.'), 'The moon is not really a lamp.'),
            step(W.icon('think'), 'It compares them: both give light. This is a <b>metaphor</b>.')
          ],
          key: '<p>A metaphor says one thing <b>is</b> another, to compare them.</p>',
          guided: [function () { return metaphor(1); }, function () { return metaphor(1); }],
          check: [function () { return metaphor(2); }, function () { return metaphor(2); }],
          coach: '<p>Make some together: "My bed is a cloud." Ask: "How are they alike?"</p>',
          mistake: '<p>Taking it literally. Ask: "Is the moon really a lamp? Then what does the writer mean?"</p>' },
        { slug: 'assonance', title: 'Sounds that come back', exp: ['C3.1'], skill: 'craft',
          model: [
            step(W.sent('The stars gl<b>ow</b> sl<b>ow</b> <b>o</b>ver the sn<b>ow</b>.'), 'Listen: <b>o</b>, <b>o</b>, <b>o</b>, <b>o</b>.'),
            step(W.icon('listen'), 'The same vowel sound comes back.'),
            step(W.sent('I sl<b>ee</b>p d<b>ee</b>p and dr<b>ea</b>m.'), 'This is called <b>assonance</b>.')
          ],
          key: '<p>Assonance: the same vowel sound, again and again.</p>',
          guided: [function () { return sound(1); }, function () { return sound(1); }],
          check: [function () { return sound(2); }, function () { return sound(2); }],
          coach: '<p>Say the lines aloud and stretch the vowel sounds. Assonance is easier to hear than to see.</p>',
          mistake: '<p>Looking for the same letters. Listen for the same sound instead (glow, slow, over and snow all have it).</p>' }
      ]
    }, {
      id: 'deeper', title: 'Reading between the lines', sub: 'Feelings, comparisons and points of view.',
      concepts: [
        { slug: 'infer', title: 'Work out what is not said', exp: ['C3.2'], skill: 'deeper',
          model: [
            step(W.sent('Leila pulled it on and <b>grinned</b>.'), 'The text does not say how she feels.'),
            step(W.sent('grinned'), 'A clue.'),
            step(W.sent('She feels <b>happy</b>.'), 'Clue + what I know = an inference.')
          ],
          key: '<p>Clue from the text + what I know = what I can work out.</p>',
          guided: [function () { return infer(1); }, evidence],
          check: [function () { return infer(2); }, evidence],
          coach: '<p>Ask "How do you know?" after every answer about feelings. The answer should point to words in the text.</p>',
          mistake: '<p>Answering from their own feelings instead of the character’s. Point back to the clue.</p>' },
        { slug: 'compare', title: 'Same and different', exp: ['C3.3'], skill: 'deeper',
          model: [
            step('<div class="wpics">' + W.passage(PAIR.a, PAIR.both.concat(PAIR.onlyA)) + W.passage(PAIR.b, PAIR.both.concat(PAIR.onlyB)) + '</div>', 'Two animals.'),
            step(W.sent('Its fur turns white in winter.'), 'In both cards: the <b>same</b>.'),
            step(W.sent('It eats plants.'), 'In one card only: <b>different</b>.')
          ],
          key: '<p>Same: in both. Different: in only one.</p>',
          guided: [function () { return compare(1); }, function () { return compare(1); }],
          check: [function () { return compare(2); }, function () { return compare(2); }],
          coach: '<p>Draw two overlapping circles. Write what is the same in the middle and what is different on the sides.</p>',
          mistake: '<p>Picking something true of only one. It has to be in both.</p>' },
        { slug: 'perspective', title: 'What does the writer think?', exp: ['C3.5'], skill: 'deeper',
          model: [
            step(T.show(T.rink), 'Priya wrote this letter.'),
            step(W.sent('<b>Please build</b> a skating rink.'), 'She wants something.'),
            step(W.sent('Skating keeps us healthy.'), 'She gives reasons to change the mayor’s mind.')
          ],
          key: '<p>Ask: who wrote it, what do they think, and why?</p>',
          guided: [perspective, perspective],
          check: [perspective, function () { return infer(2); }],
          coach: '<p>Ask: "Who might disagree with Priya? What would they say?" Thinking about other views is the point.</p>',
          mistake: '<p>Mixing up the reader and the writer. The writer is the one with the opinion.</p>' }
      ]
    }],
    practice: [
      { id: 'features', name: 'Text features and patterns', code: 'C1.3, C1.4', gen: featureJob },
      { id: 'craft', name: 'The writer' + '’' + 's craft', code: 'C1.5, C3.1', gen: metaphor },
      { id: 'deeper', name: 'Reading between the lines', code: 'C3.2, C3.3, C3.5', gen: infer }
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
    features: [[1, 'match', matchFeatures], [1, 'heading', whichHeading], [1, 'cause-effect', causeEffect]],
    craft: [[1, 'assonance', sound], [1, 'picture-it', picture], [1, 'pattern', pattern]],
    deeper: [[1, 'evidence', evidence], [1, 'compare', compare], [1, 'perspective', perspective]]
  });
})();
