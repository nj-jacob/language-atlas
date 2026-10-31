/* Grade 5: how texts work.
   Ontario 2023 Language, Grade 5, Strand C (Comprehension):
   C1.3 text patterns, such as cause and effect in a persuasive text, and text features, such as a preface and glossary, and how they help readers
   C1.4 how images, graphics and visual design create, communicate and contribute to meaning
   C1.5 elements of style (voice, word choice, word patterns, sentence structure) and how each helps create meaning
   C3.1 literary devices, including imagery and humour, and how they help create meaning
   Passages are in ../texts.js; everything else is written here for this site. Answer checks: tests/verify/grade5-features.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;

  var FEATURES = [['preface', 'tells what the book is about, before it begins'], ['glossary', 'explains key words, at the back'], ['index', 'lists topics and their pages, at the back'],
    ['table of contents', 'lists the chapters, at the front'], ['caption', 'tells about a picture'], ['sidebar', 'gives extra facts in a box beside the main text']];
  /* [what you want to find, the feature to use] */
  var WHERE = [['what the word <b>bog</b> means', 'glossary'], ['which page tells about turtles', 'index'], ['why the author wrote the book', 'preface'], ['what chapter 3 is called', 'table of contents'], ['what a photo shows', 'caption']];
  /* [what you want to show, the visual that shows it best] */
  var VIS = [['how many students rode the bus each month', 'a bar graph'], ['where the wetlands are in Ontario', 'a map'], ['the parts of a canoe', 'a labelled diagram'],
    ['the steps to harvest manoomin, in order', 'a numbered flow chart'], ['what a marsh looks like', 'a photo with a caption']];
  /* [an example, what the writer did, why] */
  var STYLE = [['Then, silence.', 'a very short sentence', 'to make a sudden, dramatic moment'], ['Snow on the roof, snow on the road, snow on my nose.', 'repeated words', 'to create a pattern and rhythm'],
    ['I could not believe it. I made the team. Me!', 'a personal, excited voice', 'to show how the narrator feels'], ['Wetlands soak up rain like a sponge.', 'a simple comparison for a hard idea', 'to help readers understand a fact'],
    ['The crowd roared, stomped and cheered.', 'three strong action words', 'to help you hear how loud it was']];
  /* imagery: [a line, the sense it speaks to] */
  var IMAGERY = T.storm.senses.concat([['The cocoa warmed my frozen fingers.', 'touch'], ['The bannock tasted sweet and buttery.', 'taste'], ['Gravel crunched under our boots.', 'hearing'],
    ['The lake glittered like broken glass.', 'sight'], ['Wood smoke drifted from the cabin.', 'smell'], ['The ice was smooth and cold under my hand.', 'touch']]);
  var SENSES = ['sight', 'hearing', 'smell', 'taste', 'touch'];
  /* humour: [a line, the trick that makes it funny] */
  var FUNNY = T.pancakes.funny.concat([['My little brother is so loud that people in Vancouver can hear him.', 'exaggeration'], ['The toaster coughed out a black slice of bread.', 'a thing acting like a person'],
    ['We searched the whole house for my glasses. They were on my head.', 'a surprise ending']]);
  var TRICKS = ['exaggeration', 'a thing acting like a person', 'a surprise ending'];

  /* ---------- question makers ---------- */
  function featureJob(lv) {
    var f = R.pick(FEATURES);
    return Q.one('What does a <b>' + f[0] + '</b> do?', f[1], R.some(FEATURES.filter(function (x) { return x !== f; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Think of where it is in a book.', explain: 'A ' + f[0] + ' ' + f[1] + '.', meta: { k: 'g5-feature', f: f[0] } });
  }
  function whereLook() {
    var w = R.pick(WHERE);
    return Q.tiles('Where would you look to find ' + w[0] + '?', w[1], R.some(FEATURES.map(function (f) { return f[0]; }).filter(function (x) { return x !== w[1]; }), 2), {
      hint: 'Which feature is made for that?', explain: 'The <b>' + w[1] + '</b>.', meta: { k: 'g5-where', want: w[0] } });
  }
  function causeEffect() {
    var t = R.pick(T.list('cause').filter(function (x) { return x.cause.length > 1; }));
    return { q: 'Match each cause to its effect.', fig: T.show(t), type: 'match', pairs: t.cause.map(function (c) { return [c[0], c[1]]; }), hint: 'Ask: what happens because of this?',
      explain: 'Cause: why it happens. Effect: what happens.', meta: { k: 'g5-cause', t: t.title } };
  }
  function persuadeCause() {
    var t = T.bus, c = t.cause[0];
    return Q.one('The writer says one thing will <b>cause</b> another. What effect does she warn about?', c[1], ['The bus will be faster.', 'More students will ride the bus.'], { fig: T.show(t),
      prompt: 'Find the sentence with <b>If</b>.', hint: 'Persuasive writers say what will happen if you do not agree.', explain: 'Cause: ' + c[0] + ' Effect: ' + c[1], meta: { k: 'g5-persuade-cause' } });
  }
  function visual(lv) {
    var v = R.pick(VIS);
    return Q.one('Which would best show <b>' + v[0] + '</b>?', v[1], R.some(VIS.filter(function (x) { return x !== v; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Numbers, places, parts, steps, or how it looks?', explain: '<b>' + v[1] + '</b> shows it best.', meta: { k: 'g5-visual', show: v[0] } });
  }

  function sense(lv) {
    var i = R.pick(IMAGERY);
    return Q.tiles('Which sense does this line speak to?', i[1], R.some(SENSES.filter(function (s) { return s !== i[1]; }), lv > 1 ? 3 : 2), { fig: W.sent(i[0]),
      prompt: 'Would you see it, hear it, smell it, taste it or feel it?', hint: 'Picture yourself there.', explain: 'It speaks to <b>' + i[1] + '</b>.', meta: { k: 'g5-sense', line: i[0] } });
  }
  function matchSenses() {
    var picked = [], used = {};
    R.shuffle(IMAGERY).forEach(function (i) { if (picked.length < 3 && !used[i[1]]) { used[i[1]] = 1; picked.push(i); } });
    return { q: 'Match each line to the sense it speaks to.', type: 'match', pairs: picked.map(function (i) { return [i[0], i[1]]; }), hint: 'Which sense would notice it?', explain: 'Imagery uses the senses to paint a picture.', meta: { k: 'g5-match-senses' } };
  }
  function funny() {
    var f = R.pick(FUNNY);
    return Q.tiles('What makes this line funny?', f[1], TRICKS.filter(function (x) { return x !== f[1]; }), { fig: W.sent(f[0]), hint: 'Is it too big to be true? A thing acting like a person? A twist?',
      explain: 'It is <b>' + f[1] + '</b>.', meta: { k: 'g5-funny', line: f[0] } });
  }
  function styleWhy(lv) {
    var s = R.pick(STYLE);
    return Q.one('The writer used <b>' + s[1] + '</b>. Why?', s[2], R.some(STYLE.filter(function (x) { return x !== s; }), lv > 1 ? 2 : 1).map(function (x) { return x[2]; }), { fig: W.sent(s[0]),
      hint: 'What does it make you feel, see or understand?', explain: s[2] + '.', meta: { k: 'g5-style', ex: s[0] } });
  }

  Atlas.register('features', {
    lessons: [{
      id: 'patterns', title: 'Patterns, features and visuals', sub: 'How a text is organized, and what helps you find your way.',
      concepts: [
        { slug: 'cause-effect', title: 'Persuasive texts use cause and effect', exp: ['C1.3'], skill: 'text-features',
          model: [
            step(W.sent('<mark class="hl">If the late bus is cut</mark>,'), 'The cause.'),
            step(W.sent('many students will have to quit clubs.'), 'The effect she warns about.'),
            step(W.icon('think'), 'Ask: will that really happen?')
          ],
          guided: [persuadeCause, causeEffect],
          check: [persuadeCause, causeEffect],
          coach: '<p>Notice "if... then" warnings in ads and letters. Ask: "Is that effect certain, or just possible?"</p>',
          mistake: '<p>Accepting every predicted effect as a fact. Writers sometimes exaggerate effects to persuade.</p>' },
        { slug: 'features', title: 'A preface and a glossary help readers', exp: ['C1.3'], skill: 'text-features',
          model: [
            step(W.sent('Preface: This short book explains what wetlands are...'), 'Before the book begins: what it is about.'),
            step(W.sent('<b>bog</b>: a wetland with soft, spongy ground'), 'At the back: key words explained.'),
            step(W.sent('Words in <b>bold</b> are in the glossary.'), 'Bold words tell you to look.')
          ],
          guided: [function () { return featureJob(1); }, whereLook],
          check: [function () { return featureJob(2); }, whereLook],
          coach: '<p>Before reading a non-fiction book, read the preface and flip to the glossary together. It saves time later.</p>',
          mistake: '<p>Skipping the preface. It tells you what to look for in the book.</p>' },
        { slug: 'visuals', title: 'Images and graphics add meaning', exp: ['C1.4'], skill: 'text-features',
          model: [
            step(W.sent('how many students rode each month'), 'Numbers: a <b>bar graph</b>.'),
            step(W.sent('where the wetlands are'), 'Places: a <b>map</b>.'),
            step(W.sent('the parts of a canoe'), 'Parts: a <b>labelled diagram</b>.')
          ],
          guided: [function () { return visual(1); }, function () { return visual(1); }],
          check: [function () { return visual(2); }, function () { return visual(2); }],
          coach: '<p>Look at a news website together. Ask: "What does this picture or chart tell you that the words do not?"</p>',
          mistake: '<p>Skipping graphs and maps. They often hold facts that are not in the words.</p>' }
      ]
    }, {
      id: 'style', title: 'Style, imagery and humour', sub: 'The choices writers make, and why.',
      concepts: [
        { slug: 'style', title: 'Every style choice has a reason', exp: ['C1.5'], skill: 'style',
          model: [
            step(W.sent('Then, silence.'), 'Two words. A sudden stop.'),
            step(W.sent('Snow on the roof, snow on the road...'), 'Repeated words make a rhythm.'),
            step(W.sent('I made the team. Me!'), 'An excited voice shows feelings.')
          ],
          guided: [function () { return styleWhy(1); }, function () { return styleWhy(1); }],
          check: [function () { return styleWhy(2); }, function () { return styleWhy(2); }],
          coach: '<p>When a sentence stands out, ask: "Why do you think the writer wrote it like that?" There is no single right answer, but there should be a reason.</p>',
          mistake: '<p>Thinking short sentences are always "baby" writing. Writers use them on purpose for effect.</p>' },
        { slug: 'imagery', title: 'Imagery speaks to the senses', exp: ['C3.1'], skill: 'style',
          model: [
            step(T.show(T.storm), 'A poem full of images.'),
            step(W.sent('The sky turns the colour of a bruise.'), 'I can <b>see</b> it.'),
            step(W.sent('The air smells clean and green.'), 'I can <b>smell</b> it.')
          ],
          guided: [function () { return sense(1); }, function () { return sense(1); }],
          check: [function () { return sense(2); }, matchSenses],
          coach: '<p>Read a line, close your eyes, and ask: "What do you see, hear, smell, taste or feel?"</p>',
          mistake: '<p>Thinking imagery is only about seeing. It can use any of the five senses.</p>' },
        { slug: 'humour', title: 'Writers make us laugh on purpose', exp: ['C3.1'], skill: 'style',
          model: [
            step(W.sent('There was batter on the ceiling.'), 'Too big to be true: <b>exaggeration</b>.'),
            step(W.sent('The smoke alarm sang us its loudest song.'), 'A thing acting like a person.'),
            step(W.sent('Biscuit had the best breakfast of all.'), 'A twist at the end.')
          ],
          guided: [funny, funny],
          check: [funny, funny],
          coach: '<p>Read a funny book together and stop at each laugh: "What made that funny?"</p>',
          mistake: '<p>Missing that humour has a purpose: it keeps readers reading and makes a point easier to remember.</p>' }
      ]
    }],
    practice: [
      { id: 'text-features', name: 'Patterns, features and visuals', code: 'C1.3, C1.4', gen: featureJob },
      { id: 'style', name: 'Style, imagery and humour', code: 'C1.5, C3.1', gen: sense }
    ]
  });

  Q.shapes('features', {
    'text-features': [[1, 'where', whereLook], [1, 'visual', visual], [1, 'persuade-cause', persuadeCause], [2, 'cause-effect', causeEffect]],
    style: [[1, 'funny', funny], [1, 'style', styleWhy], [2, 'match', matchSenses]]
  });
})();
