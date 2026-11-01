/* Grade 5: how texts work. A full chapter: every idea has two worked examples, three questions together and five on
   your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 5, Strand C (Comprehension):
   C1.3 text patterns, such as cause and effect in a persuasive text, and text features, such as a preface and glossary, and how they help readers
   C1.4 how images, graphics and visual design create, communicate and contribute to meaning
   C1.5 elements of style (voice, word choice, word patterns, sentence structure) and how each helps create meaning and suits the form
   C3.1 literary devices, including imagery and humour, and how they help create meaning
   Passages are in ../texts.js; everything else is written here for this site. Answer checks: tests/verify/grade5-features.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var Q1 = '“', Q2 = '”';

  /* ---------- word banks ---------- */
  /* sentences with a word that signals cause and effect: [sentence, the signal word] */
  var SIGNAL = [['Wetlands soak up rain like a sponge, so they help stop floods.', 'so'], ['If the late bus is cut, many students will have to quit clubs and teams.', 'If'],
    ['If we go fast, the truck pushes a wave under the ice.', 'If'], ['Each inuksuk was built for a reason, so people are taught not to knock one down.', 'so'],
    ['As the water turns to steam, the sap becomes thicker and sweeter.', 'As'], ['Monarch caterpillars eat only milkweed, so planting milkweed helps them grow.', 'so'],
    ['Because the lake froze so thick, trucks could drive across it.', 'Because'], ['The power went out because a tree fell on the lines.', 'because'],
    ['Since the lamp was lit, the boat found the harbour.', 'Since'], ['The crosswalk was added, so drivers slowed down.', 'so']];
  /* in a persuasive letter: [the letter, the cause, the effect the writer predicts, effects the writer does not predict] */
  var PERSUADE = [[T.bus, 'If the late bus is cut', 'Many students will have to quit clubs and teams.', ['The bus will be faster.', 'More students will ride the bus.']],
    [T.crosswalk, 'A crosswalk with flashing lights', 'Drivers will slow down and watch for children.', ['Students will be late for school.', 'The seniors will stop walking.']]];
  var FEATURES = [['preface', 'tells what the book is about, before it begins'], ['glossary', 'explains key words, at the back'], ['index', 'lists topics and their pages, at the back'],
    ['table of contents', 'lists the chapters, at the front'], ['caption', 'tells about a picture'], ['sidebar', 'gives extra facts in a box beside the main text'],
    ['heading', 'tells what the next part is about'], ['bold word', 'shows a key word you can find in the glossary']];
  /* [what you want to find, the feature to use] */
  var WHERE = [['what the word <b>bog</b> means', 'glossary'], ['which page tells about turtles', 'index'], ['why the author wrote the book', 'preface'], ['what chapter 3 is called', 'table of contents'],
    ['what a photo shows', 'caption'], ['what the next section is about', 'heading'], ['the meaning of the word <b>evaporator</b>', 'glossary'], ['which pages talk about maple syrup', 'index'],
    ['how many chapters the book has', 'table of contents'], ['who the book was written for', 'preface']];
  /* visuals: [what it is best for]; and [what you want to show, the visual that shows it best] */
  var VISUALS = { 'a bar graph': 'compares amounts', 'a map': 'shows where places are', 'a labelled diagram': 'names the parts of something', 'a flow chart': 'shows steps in order',
    'a photo with a caption': 'shows what something really looks like', 'a timeline': 'shows when events happened' };
  var VIS = [['how many students rode the bus each month', 'a bar graph'], ['which sport the class likes best', 'a bar graph'], ['where the wetlands are in Ontario', 'a map'],
    ['the route of the monarchs to Mexico', 'a map'], ['the parts of a canoe', 'a labelled diagram'], ['the parts of a butterfly', 'a labelled diagram'],
    ['the steps to make maple syrup, in order', 'a flow chart'], ['the steps to harvest manoomin, in order', 'a flow chart'], ['what a marsh looks like', 'a photo with a caption'],
    ['what an inuksuk looks like', 'a photo with a caption'], ['the dates of each part of a long journey', 'a timeline'], ['the years each province joined Canada', 'a timeline']];
  /* style: [an example, what the writer did, why] */
  var STYLE = [['Then, silence.', 'a very short sentence', 'to make a sudden, dramatic moment'], ['Snow on the roof, snow on the road, snow on my nose.', 'repeated words', 'to create a pattern and rhythm'],
    ['I could not believe it. I made the team. Me!', 'a personal, excited voice', 'to show how the narrator feels'], ['Wetlands soak up rain like a sponge.', 'a simple comparison for a hard idea', 'to help readers understand a fact'],
    ['The crowd roared, stomped and cheered.', 'three strong action words', 'to help you hear how loud it was'], ['Thwack!', 'a sound word on its own', 'to let you hear the moment'],
    ['Please vote to add a crosswalk on Elm Street this year.', 'a polite, direct request', 'to tell the reader exactly what to do'],
    ['Her legs burned, and the wind howled through the cracks.', 'strong verbs', 'to make the climb feel hard and scary'],
    ['First, drill a hole. Next, collect the sap. Then boil it.', 'order words', 'to make the steps easy to follow'],
    ['Inuit have built inuksuit across the Arctic for hundreds of years.', 'calm, factual words', 'to teach facts clearly']];
  /* [a text form, a sentence whose voice suits it, one whose voice does not] */
  var FIT = [['a letter to the mayor', 'I am writing to ask for a crosswalk on Elm Street.', 'Yo, Mayor! We totally need a crosswalk!!'],
    ['an information text about monarchs', 'Monarchs fly more than 4000 kilometres each fall.', 'Monarchs are, like, the coolest bugs ever!!!'],
    ['a scary story', 'The stairs creaked. Something moved in the dark.', 'The stairs were made of wood and had ninety steps.'],
    ['a funny story', 'Our dog ate three pancakes and burped proudly.', 'Dogs should not be fed pancakes, for health reasons.'],
    ['a poem about rain', 'Rain drums softly on the roof.', 'Rain is water that falls from clouds.'],
    ['a how-to guide', 'First, drill a small hole in the trunk.', 'Long ago, on a cold spring day, Grandpa drilled a hole.']];
  /* imagery: [a line, the sense it speaks to] */
  var IMAGERY = T.storm.senses.concat([['The cocoa warmed my frozen fingers.', 'touch'], ['The bannock tasted sweet and buttery.', 'taste'], ['Gravel crunched under our boots.', 'hearing'],
    ['The lake glittered like broken glass.', 'sight'], ['Wood smoke drifted from the cabin.', 'smell'], ['The ice was smooth and cold under my hand.', 'touch'],
    ['The ice stretched ahead like a white highway.', 'sight'], ['Halfway across, they heard a long, low boom.', 'hearing'], ['The puck stings your hand.', 'touch'],
    ['The kitchen smelled of warm maple syrup.', 'smell'], ['The wild rice tasted nutty and smoky.', 'taste'], ['The snow squeaked under my boots.', 'hearing'],
    ['The sour apple made my mouth pucker.', 'taste'], ['Pink foam shot up like a fountain.', 'sight'], ['The pine needles smelled sharp and fresh.', 'smell']]);
  var SENSES = ['sight', 'hearing', 'smell', 'taste', 'touch'];
  var SENSE_VERB = { sight: 'see', hearing: 'hear', smell: 'smell', taste: 'taste', touch: 'feel' };
  /* humour: [a line, the trick that makes it funny] */
  var FUNNY = T.pancakes.funny.concat(T.volcano.funny, [['My little brother is so loud that people in Vancouver can hear him.', 'exaggeration'], ['The toaster coughed out a black slice of bread.', 'a thing acting like a person'],
    ['We searched the whole house for my glasses. They were on my head.', 'a surprise ending'], ['I was so hungry I could have eaten a moose.', 'exaggeration'],
    ['Our old car groaned and grumbled up the hill.', 'a thing acting like a person'], ['Grandpa said he would fix the roof in a jiffy. That was three summers ago.', 'a surprise ending'],
    ['The line for the water slide was a hundred kilometres long.', 'exaggeration'], ['My alarm clock yelled at me to get up.', 'a thing acting like a person']]);
  var TRICKS = ['exaggeration', 'a thing acting like a person', 'a surprise ending'];

  function others(list, x, n, f) { return R.some(list.filter(function (y) { return y !== x; }), n).map(f || function (y) { return y; }); }
  function why(right, yes, no) { return { options: [yes, no], answer: right ? 0 : 1 }; }

  /* ---------- cause and effect (C1.3) ---------- */
  var CAUSED = T.list('cause'), ALL = [].concat.apply([], CAUSED.map(function (t) { return t.cause.map(function (c) { return { t: t, c: c }; }); }));
  function effectOf(lv) {
    var x = R.pick(ALL);
    return Q.one('<b>Cause:</b> ' + x.c[0] + ' What is the effect?', x.c[1], others(ALL, x, lv > 1 ? 2 : 1, function (y) { return y.c[1]; }), { fig: T.show(x.t),
      prompt: 'Ask: what happens because of this?', hint: 'The effect is what happens because of the cause.', explain: W.chain(x.c, ['Cause', 'Effect']), meta: { k: 'g5-effect', c: x.c[0] } });
  }
  function causeOf(lv) {
    var x = R.pick(ALL);
    return Q.one('<b>Effect:</b> ' + x.c[1] + ' What caused it?', x.c[0], others(ALL, x, lv > 1 ? 2 : 1, function (y) { return y.c[0]; }), { fig: T.show(x.t),
      prompt: 'Ask: why did this happen?', hint: 'The cause comes first and makes the effect happen.', explain: W.chain(x.c, ['Cause', 'Effect']), meta: { k: 'g5-cause-of', e: x.c[1] } });
  }
  function causeEffect() {
    var t = R.pick(CAUSED.filter(function (x) { return x.cause.length > 1; }));
    return { q: 'Match each cause to its effect.', fig: T.show(t), type: 'match', pairs: t.cause.map(function (c) { return [c[0], c[1]]; }), hint: 'Ask: what happens because of this?',
      explain: 'Cause: why it happens. Effect: what happens.', meta: { k: 'g5-cause', t: t.title } };
  }
  function causeTf() {
    var x = R.pick(ALL), right = R.int(0, 1) === 1, e = right ? x.c[1] : R.pick(ALL.filter(function (y) { return y !== x; })).c[1];
    return { q: Q.name() + ' says the first causes the second.', fig: W.chain([x.c[0], e], ['Cause', 'Effect']), type: 'tf', answer: right,
      why: why(right, 'One makes the other happen.', 'They are not linked.'), hint: 'Does the first one make the second one happen?', explain: W.chain(x.c, ['Cause', 'Effect']),
      meta: { k: 'g5-cause-tf', c: x.c[0], e: e } };
  }
  function signal() {
    var s = R.pick(SIGNAL), words = s[0].replace(/[.,]/g, '').split(' ').filter(function (w) { return w !== s[1] && w.length > 3; });
    return Q.tiles('Which word signals cause and effect?', s[1], R.some(words, 3), { fig: W.sent(s[0]), hint: 'Look for so, if, because, as or since.',
      explain: W.sent(s[0].replace(s[1], '<mark class="hl">' + s[1] + '</mark>')), meta: { k: 'g5-signal', s: s[0] } });
  }
  function persuadeCause() {
    var p = R.pick(PERSUADE);
    return Q.one('The writer says one thing will <b>cause</b> another. What effect does the writer predict?', p[2], p[3], { fig: T.show(p[0]),
      hint: 'Persuasive writers say what will happen, to make you agree.', explain: W.chain([p[1], p[2]], ['Cause', 'Effect']), meta: { k: 'g5-persuade-cause', t: p[0].title } });
  }

  /* ---------- text features (C1.3) ---------- */
  function featureJob(lv) {
    var f = R.pick(FEATURES);
    return Q.one('What does a <b>' + f[0] + '</b> do?', f[1], others(FEATURES, f, lv > 1 ? 3 : 2, function (x) { return x[1]; }), {
      hint: 'Think of where it is in a book.', explain: 'A ' + f[0] + ' ' + f[1] + '.', meta: { k: 'g5-feature', f: f[0] } });
  }
  function whereLook() {
    var w = R.pick(WHERE);
    return Q.tiles('Where would you look to find ' + w[0] + '?', w[1], R.some(FEATURES.map(function (f) { return f[0]; }).filter(function (x) { return x !== w[1]; }), 2), {
      hint: 'Which feature is made for that?', explain: 'The <b>' + w[1] + '</b>.', meta: { k: 'g5-where', want: w[0] } });
  }
  function featureTf() {
    var f = R.pick(FEATURES), right = R.int(0, 1) === 1, job = right ? f[1] : R.pick(FEATURES.filter(function (x) { return x !== f; }))[1];
    return { q: Q.name() + ' says: a <b>' + f[0] + '</b> ' + job + '.', type: 'tf', answer: right, why: why(right, 'That is its job.', 'That is the job of a different feature.'),
      hint: 'Where is it in a book, and what is it for?', explain: 'A ' + f[0] + ' ' + f[1] + '.', meta: { k: 'g5-feature-tf', f: f[0], job: job } };
  }
  function matchFeatures() {
    var fs = R.some(FEATURES, 3);
    return { q: 'Match each feature to its job.', type: 'match', pairs: fs.map(function (f) { return [f[0], f[1]]; }), hint: 'Where would you find each one?', explain: 'Each feature helps you find or understand something.', meta: { k: 'g5-match-features' } };
  }

  /* ---------- images and graphics (C1.4) ---------- */
  var KINDS_V = Object.keys(VISUALS);
  function visual(lv) {
    var v = R.pick(VIS);
    return Q.one('Which would best show <b>' + v[0] + '</b>?', v[1], R.some(KINDS_V.filter(function (x) { return x !== v[1]; }), lv > 1 ? 3 : 2), {
      hint: 'Amounts, places, parts, steps, how it looks, or when?', explain: '<b>' + v[1] + '</b> ' + VISUALS[v[1]] + '.', meta: { k: 'g5-visual', show: v[0] } });
  }
  function visualJob(lv) {
    var v = R.pick(KINDS_V);
    return Q.one('What is <b>' + v + '</b> best for?', VISUALS[v], others(KINDS_V, v, lv > 1 ? 3 : 2, function (x) { return VISUALS[x]; }), {
      hint: 'Picture one. What does it show?', explain: '<b>' + v + '</b> ' + VISUALS[v] + '.', meta: { k: 'g5-visual-job', v: v } });
  }
  function visualTf() {
    var v = R.pick(VIS), right = R.int(0, 1) === 1, use = right ? v[1] : R.pick(KINDS_V.filter(function (x) { return x !== v[1]; }));
    return { q: Q.name() + ' will use <b>' + use + '</b> to show ' + v[0] + '.', type: 'tf', answer: right, why: why(right, 'It shows that best.', 'Another visual shows it better.'),
      hint: 'Amounts, places, parts, steps, how it looks, or when?', explain: '<b>' + v[1] + '</b> ' + VISUALS[v[1]] + '.', meta: { k: 'g5-visual-tf', show: v[0], use: use } };
  }
  function matchVisual() {
    var vs = R.some(KINDS_V, 3);
    return { q: 'Match each visual to what it is best for.', type: 'match', pairs: vs.map(function (v) { return [v, VISUALS[v]]; }), hint: 'Picture each one.', explain: 'A good visual shows what words alone cannot.', meta: { k: 'g5-match-visual' } };
  }

  /* ---------- style (C1.5) ---------- */
  function styleWhy(lv) {
    var s = R.pick(STYLE);
    return Q.one('The writer used <b>' + s[1] + '</b>. Why?', s[2], others(STYLE, s, lv > 1 ? 2 : 1, function (x) { return x[2]; }), { fig: W.sent(s[0]),
      hint: 'What does it make you feel, see or understand?', explain: s[2] + '.', meta: { k: 'g5-style', ex: s[0] } });
  }
  function styleWhat(lv) {
    var s = R.pick(STYLE);
    return Q.one('What did the writer do here?', s[1], others(STYLE, s, lv > 1 ? 2 : 1, function (x) { return x[1]; }), { fig: W.sent(s[0]),
      hint: 'Look at the length, the words, and the pattern.', explain: 'The writer used <b>' + s[1] + '</b> ' + s[2] + '.', meta: { k: 'g5-style-what', ex: s[0] } });
  }
  function styleFit() {
    var f = R.pick(FIT);
    return Q.one('Which sentence suits <b>' + f[0] + '</b>?', f[1], [f[2]], { hint: 'Who will read it, and why? Choose the voice that fits.',
      explain: W.sent(f[1]), meta: { k: 'g5-style-fit', form: f[0] } });
  }
  function matchStyle() {
    var ss = R.some(STYLE, 3);
    return { q: 'Match each example to what the writer did.', type: 'match', pairs: ss.map(function (s) { return [s[0], s[1]]; }), hint: 'Look at the length, the words, and the pattern.',
      explain: 'Every style choice has a reason.', meta: { k: 'g5-match-style' } };
  }
  function styleTf() {
    var s = R.pick(STYLE), right = R.int(0, 1) === 1, said = right ? s[2] : R.pick(STYLE.filter(function (x) { return x !== s; }))[2];
    return { q: Q.name() + ' says the writer wrote it this way ' + said + '.', fig: W.sent(s[0]), type: 'tf', answer: right, why: why(right, 'That is what it does.', 'That is not what it does.'),
      hint: 'What does it make you feel, see or understand?', explain: s[2] + '.', meta: { k: 'g5-style-tf', ex: s[0], said: said } };
  }

  /* ---------- imagery (C3.1) ---------- */
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
  function senseLine(lv) {
    var s = R.pick(SENSES), right = R.pick(IMAGERY.filter(function (i) { return i[1] === s; })), used = {}, wrong = [];
    used[s] = 1;
    R.shuffle(IMAGERY).forEach(function (i) { if (wrong.length < (lv > 1 ? 2 : 1) && !used[i[1]]) { used[i[1]] = 1; wrong.push(i[0]); } });
    return Q.one('Which line helps you <b>' + SENSE_VERB[s] + '</b> it?', right[0], wrong, { hint: 'Picture yourself there. Which sense notices it?', explain: W.sent(right[0]), meta: { k: 'g5-sense-line', s: s } });
  }
  function senseTf() {
    var i = R.pick(IMAGERY), right = R.int(0, 1) === 1, said = right ? i[1] : R.pick(SENSES.filter(function (s) { return s !== i[1]; }));
    return { q: Q.name() + ' says this line speaks to <b>' + said + '</b>.', fig: W.sent(i[0]), type: 'tf', answer: right, why: why(right, 'That sense would notice it.', 'Another sense would notice it.'),
      hint: 'Would you see it, hear it, smell it, taste it or feel it?', explain: 'It speaks to <b>' + i[1] + '</b>.', meta: { k: 'g5-sense-tf', line: i[0], said: said } };
  }

  /* ---------- humour (C3.1) ---------- */
  function funny() {
    var f = R.pick(FUNNY);
    return Q.tiles('What makes this line funny?', f[1], TRICKS.filter(function (x) { return x !== f[1]; }), { fig: W.sent(f[0]), hint: 'Is it too big to be true? A thing acting like a person? A twist?',
      explain: 'It is <b>' + f[1] + '</b>.', meta: { k: 'g5-funny', line: f[0] } });
  }
  function funnyLine(lv) {
    var trick = R.pick(TRICKS), right = R.pick(FUNNY.filter(function (f) { return f[1] === trick; }))[0];
    var wrong = TRICKS.filter(function (x) { return x !== trick; }).slice(0, lv > 1 ? 2 : 1).map(function (x) { return R.pick(FUNNY.filter(function (f) { return f[1] === x; }))[0]; });
    return Q.one('Which line uses <b>' + trick + '</b>?', right, wrong, { hint: 'Too big to be true? A thing acting like a person? A twist?', explain: W.sent(right), meta: { k: 'g5-funny-line', trick: trick } });
  }
  function funnyTf() {
    var f = R.pick(FUNNY), right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(TRICKS.filter(function (x) { return x !== f[1]; }));
    return { q: Q.name() + ' says this line is funny because of <b>' + said + '</b>.', fig: W.sent(f[0]), type: 'tf', answer: right, why: why(right, 'That is the trick.', 'It uses a different trick.'),
      hint: 'Too big to be true? A thing acting like a person? A twist?', explain: 'It is <b>' + f[1] + '</b>.', meta: { k: 'g5-funny-tf', line: f[0], said: said } };
  }
  function matchFunny() {
    var ls = TRICKS.map(function (t) { return R.pick(FUNNY.filter(function (f) { return f[1] === t; })); });
    return { q: 'Match each line to what makes it funny.', type: 'match', pairs: ls.map(function (f) { return [f[0], f[1]]; }), hint: 'Too big to be true? A thing acting like a person? A twist?',
      explain: 'Humour keeps readers reading and makes a point easy to remember.', meta: { k: 'g5-match-funny' } };
  }

  Atlas.register('features', {
    full: true,
    lessons: [{
      id: 'patterns', title: 'Patterns, features and visuals', sub: 'How a text is organized, and what helps you find your way.',
      concepts: [
        { slug: 'cause-effect', title: 'Persuasive texts use cause and effect', exp: ['C1.3'], skill: 'cause-effect',
          model: [
            step(W.chain(['The late bus is cut.', 'Students quit clubs and teams.'], ['Cause', 'Effect']), 'A warning in a letter.'),
            step(W.sent('<mark class="hl">If</mark> the late bus is cut, ...'), '<b>If</b> signals it.'),
            step(W.icon('think'), 'Ask: will that really happen?'),
            step(W.chain(['There is no crosswalk.', 'A driver had to stop suddenly.'], ['Cause', 'Effect']), 'Another letter: a reason to act.'),
            step(W.chain(['A crosswalk with flashing lights', 'Drivers slow down.'], ['Cause', 'Effect']), 'Then the good effect she wants.')
          ],
          guided: [persuadeCause, function () { return effectOf(1); }, signal],
          check: [function () { return effectOf(2); }, causeEffect, function () { return causeOf(2); }, causeTf, persuadeCause],
          coach: '<p>Notice "if... then" warnings in ads and letters. Ask: "Is that effect certain, or just possible?"</p>',
          mistake: '<p>Accepting every predicted effect as a fact. Writers sometimes exaggerate effects to persuade.</p>' },
        { slug: 'features', title: 'A preface and a glossary help readers', exp: ['C1.3'], skill: 'features',
          model: [
            step(W.sent('Preface: This short book explains what wetlands are...'), 'Before the book begins: what it is about.'),
            step(W.sent('Words in <b>bold</b> are in the glossary.'), 'Bold words tell you to look.'),
            step(W.sent('<b>bog</b>: a wetland with soft, spongy ground'), 'At the back: key words explained.'),
            step(T.show(T.monarchs, 5), 'Headings name each part.'),
            step(W.means('screen', 'Index: monarchs, pages 4 and 12'), 'At the back: which page to turn to.')
          ],
          guided: [function () { return featureJob(1); }, whereLook, matchFeatures],
          check: [function () { return featureJob(2); }, whereLook, featureTf, matchFeatures, function () { return featureJob(3); }],
          coach: '<p>Before reading a non-fiction book, read the preface and flip to the glossary together. It saves time later.</p>',
          mistake: '<p>Skipping the preface. It tells you what to look for in the book.</p>' },
        { slug: 'visuals', title: 'Images and graphics add meaning', exp: ['C1.4'], skill: 'visuals',
          model: [
            step(W.sent('how many students rode the bus each month'), 'Amounts: a <b>bar graph</b>.'),
            step(W.sent('the route of the monarchs to Mexico'), 'Places: a <b>map</b>.'),
            step(W.chain(['tap', 'collect', 'boil', 'bottle']), 'Steps in order: a <b>flow chart</b>.'),
            step(W.web(W.pic('canoe'), ['bow', 'paddle', 'stern']), 'Parts with names: a <b>labelled diagram</b>.'),
            step(W.sent('what a marsh looks like'), 'How it really looks: a <b>photo with a caption</b>.')
          ],
          guided: [function () { return visual(1); }, function () { return visualJob(1); }, visualTf],
          check: [function () { return visual(2); }, matchVisual, function () { return visualJob(2); }, visualTf, function () { return visual(3); }],
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
            step(W.sent('I made the team. Me!'), 'An excited voice shows feelings.'),
            step(W.sent('Please vote to add a crosswalk.'), 'A letter to the mayor: polite and direct.'),
            step(W.sent('Yo, Mayor! We totally need a crosswalk!!'), 'The wrong voice for that letter.')
          ],
          guided: [function () { return styleWhy(1); }, function () { return styleWhat(1); }, styleFit],
          check: [function () { return styleWhy(2); }, matchStyle, styleTf, styleFit, function () { return styleWhat(3); }],
          coach: '<p>When a sentence stands out, ask: "Why do you think the writer wrote it like that?" There is no single right answer, but there should be a reason.</p>',
          mistake: '<p>Thinking short sentences are always "baby" writing. Writers use them on purpose for effect.</p>' },
        { slug: 'imagery', title: 'Imagery speaks to the senses', exp: ['C3.1'], skill: 'imagery',
          model: [
            step(T.show(T.storm), 'A poem full of images.'),
            step(W.sent('The sky turns the colour of a bruise.'), 'I can <b>see</b> it.'),
            step(W.sent('The air smells clean and green.'), 'I can <b>smell</b> it.'),
            step(W.sent('Halfway across, they heard a long, low boom.'), 'A story. I <b>hear</b> it.'),
            step(W.sent('The puck stings your hand.'), 'I <b>feel</b> it.')
          ],
          guided: [function () { return sense(1); }, function () { return senseLine(1); }, matchSenses],
          check: [function () { return sense(2); }, senseTf, function () { return senseLine(2); }, matchSenses, function () { return sense(3); }],
          coach: '<p>Read a line, close your eyes, and ask: "What do you see, hear, smell, taste or feel?"</p>',
          mistake: '<p>Thinking imagery is only about seeing. It can use any of the five senses.</p>' },
        { slug: 'humour', title: 'Writers make us laugh on purpose', exp: ['C3.1'], skill: 'humour',
          model: [
            step(W.sent('There was batter on the ceiling.'), 'Too big to be true: <b>exaggeration</b>.'),
            step(W.sent('The smoke alarm sang us its loudest song.'), 'A thing acting like a person.'),
            step(W.sent('Biscuit had the best breakfast of all.'), 'A twist at the end.'),
            step(W.sent('My volcano gave a loud burp.'), 'Another story. A volcano with bad manners.'),
            step(W.sent('Always measure your vinegar.'), 'The lesson, told as a joke.')
          ],
          guided: [funny, function () { return funnyLine(1); }, matchFunny],
          check: [funny, funnyTf, function () { return funnyLine(2); }, matchFunny, funny],
          coach: '<p>Read a funny book together and stop at each laugh: "What made that funny? Why did the writer want us to laugh here?"</p>',
          mistake: '<p>Missing that humour has a purpose: it keeps readers reading and makes a point easier to remember.</p>' }
      ]
    }],
    practice: [
      { id: 'cause-effect', name: 'Cause and effect', code: 'C1.3', gen: effectOf },
      { id: 'features', name: 'Text features', code: 'C1.3', gen: featureJob },
      { id: 'visuals', name: 'Images and graphics', code: 'C1.4', gen: visual },
      { id: 'style', name: 'Style choices', code: 'C1.5', gen: styleWhy },
      { id: 'imagery', name: 'Imagery', code: 'C3.1', gen: sense },
      { id: 'humour', name: 'Humour', code: 'C3.1', gen: funny }
    ]
  });

  Q.shapes('features', {
    'cause-effect': [[1, 'cause-of', causeOf], [1, 'signal', signal], [2, 'match', causeEffect], [2, 'tf', causeTf], [1, 'persuade', persuadeCause]],
    features: [[1, 'where', whereLook], [2, 'match', matchFeatures], [1, 'tf', featureTf]],
    visuals: [[1, 'job', visualJob], [2, 'match', matchVisual], [1, 'tf', visualTf]],
    style: [[1, 'what', styleWhat], [1, 'fit', styleFit], [2, 'match', matchStyle], [2, 'tf', styleTf]],
    imagery: [[1, 'line', senseLine], [2, 'match', matchSenses], [1, 'tf', senseTf]],
    humour: [[1, 'line', funnyLine], [2, 'match', matchFunny], [1, 'tf', funnyTf]]
  });
})();
