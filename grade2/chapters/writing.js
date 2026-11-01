/* Grade 2: writing and publishing.
   Ontario 2023 Language, Grade 2, Strand D (Composition):
   D2.1 draft short texts, including personal narratives, persuasive texts and procedural texts   D2.2 print legibly and fluently
   D2.3 a personal voice, using descriptive words for thoughts, feelings and opinions             D2.4 the point of view, including first person
   D2.5 revisions using feedback, such as adding or deleting sentences                              D2.6 simple edits: capitals, punctuation, spelling
   D3.1 final texts using simple techniques   D3.2 presenting, including reading aloud with expression   D3.3 strategies that helped when presenting
   Drafting, printing, publishing and presenting are activities with a grown-up: never auto-marked, with a rubric.
   All sentences are written for this site. Answer checks: tests/verify/grade2-writing.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* [told by the writer (first person), told about someone else] */
  var POV = [['I fed the fish.', 'She fed the fish.'], ['We went to the market.', 'They went to the market.'], ['My dad and I made pancakes.', 'Kai and his dad made pancakes.'],
    ['I lost my mitten.', 'He lost his mitten.'], ['Our class went on a nature walk.', 'The class went on a nature walk.'], ['I scored a goal.', 'Mia scored a goal.'], ['We saw a moose.', 'They saw a moose.'],
    ['My tooth fell out.', 'His tooth fell out.'], ['I helped Grandpa rake.', 'Omar helped Grandpa rake.'], ['Our tent leaked.', 'Their tent leaked.']];
  var FIRST = POV.map(function (p) { return p[0]; }), OTHER = POV.map(function (p) { return p[1]; });
  /* [plain, with describing words and feeling] */
  var VOICE = [['I have a dog.', 'My fluffy dog, Biscuit, makes me laugh every day.'], ['We went to the beach.', 'The warm sand and cold waves made it the best day ever!'],
    ['I ate soup.', 'The hot, spicy soup warmed me right up.'], ['It snowed.', 'Soft, fat snowflakes floated down, and I cheered.'], ['We went skating.', 'We glided on the shiny ice, and I felt like I could fly.'],
    ['I saw a bird.', 'A tiny red cardinal sang right outside my window!'], ['We had a picnic.', 'We munched crunchy apples under the big maple tree.'], ['I got a book.', 'I could not wait to open my brand-new book about sharks.'],
    ['It rained.', 'Heavy rain drummed on the roof, and I felt cozy inside.'], ['We went to the farm.', 'The baby goats nibbled my sleeve, and I giggled.']];
  var DESCRIBE = [['The fluffy kitten slept.', 'fluffy'], ['I ate a crunchy apple.', 'crunchy'], ['We saw a huge moose.', 'huge'], ['A bright moon came up.', 'bright'], ['My sticky hands needed washing.', 'sticky'],
    ['We heard a loud crash.', 'loud'], ['Mei wore her shiny boots.', 'shiny'], ['The icy road was slippery.', 'icy'], ['A tiny ant crawled by.', 'tiny'], ['Kai drank warm cocoa.', 'warm'], ['Grandma has a soft quilt.', 'soft'], ['The muddy dog shook.', 'muddy']];
  var FEEL = [['I felt proud after the puzzle.', 'proud'], ['I was nervous before my swim lesson.', 'nervous'], ['We were so excited to see the loons.', 'excited'], ['I felt calm by the lake.', 'calm'],
    ['I am thankful for my grandma.', 'thankful'], ['I felt scared during the storm.', 'scared'], ['I was surprised by the gift.', 'surprised'], ['I feel happy when it snows.', 'happy']];
  /* [topic, sentences that belong, one that does not, a detail to add] */
  var PARA = [['My dog Biscuit', ['Biscuit has soft brown fur.', 'He loves to fetch.'], 'My aunt lives in Regina.', 'He sleeps at the end of my bed.'],
    ['Making a snowman', ['First we rolled a big ball.', 'Then we added a smaller one on top.'], 'Summer is my favourite season.', 'Last, we gave him a carrot nose.'],
    ['Our class garden', ['We planted beans and squash.', 'I water the plants on Fridays.'], 'My brother plays the drums.', 'In September we picked the beans.'],
    ['Our trip to the lake', ['We swam to the raft.', 'A loon dove under the water.'], 'My shoes are too small.', 'We ate sandwiches on the dock.'],
    ['My grandma', ['Grandma tells funny stories.', 'She makes the best bannock.'], 'Buses are yellow.', 'She taught me to bead.'],
    ['Hockey practice', ['We skated in circles.', 'Coach showed us how to pass.'], 'My cat likes boxes.', 'I scored on the last drill.'],
    ['All about bees', ['Bees make honey.', 'They visit flowers.'], 'I have a blue bike.', 'They live in a hive.'],
    ['A rainy day', ['Rain tapped on the window.', 'We built a fort inside.'], 'Pizza is my favourite food.', 'We read books by the window.']];
  /* [sentence with one mistake, the word with the mistake, the fixed sentence, the kind of mistake] */
  var ERR = [['my cat is black.', 'my', 'My cat is black.', 'capital'], ['We drove to london.', 'london.', 'We drove to London.', 'capital'], ['Where is my hat.', 'hat.', 'Where is my hat?', 'end mark'],
    ['I like to swim', 'swim', 'I like to swim.', 'end mark'], ['We had fun at the parck.', 'parck.', 'We had fun at the park.', 'spelling'], ['I sed thank you.', 'sed', 'I said thank you.', 'spelling'],
    ['ava has a red bike.', 'ava', 'Ava has a red bike.', 'capital'], ['the bus is late.', 'the', 'The bus is late.', 'capital'], ['We live in canada.', 'canada.', 'We live in Canada.', 'capital'],
    ['Can you help me.', 'me.', 'Can you help me?', 'end mark'], ['We won the game', 'game', 'We won the game.', 'end mark'], ['My frend is kind.', 'frend', 'My friend is kind.', 'spelling'],
    ['I went to skool.', 'skool.', 'I went to school.', 'spelling'], ['omar likes soup.', 'omar', 'Omar likes soup.', 'capital'], ['Is it raining.', 'raining.', 'Is it raining?', 'end mark']];
  var KINDS = ['capital', 'end mark', 'spelling'];
  function words(x) { return x.replace(/[.,!?]$/, '').split(' '); }
  function others(list, x) { return list.filter(function (y) { return y !== x; }); }
  function T(f, a) { return function () { return f(a); }; }

  /* ---------- your voice ---------- */
  function voice(lv) {
    var v = R.pick(VOICE), wrong = [v[0]].concat(lv > 1 ? [R.pick(others(VOICE, v))[0]] : []);
    return Q.one('Which sentence shows more of the writer' + '’' + 's <b>voice</b>?', v[1], wrong, { prompt: 'Which one shows how the writer feels?', hint: 'Look for describing words and feelings.',
      explain: 'Describing words and feelings make it sound like you.', meta: { k: 'g2-voice-w' } });
  }
  function describe() {
    var d = R.pick(DESCRIBE), ws = words(d[0]);
    return { q: 'Tap the <b>describing word</b>.', fig: W.sent(d[0]), type: 'tap', tiles: ws, answer: ws.indexOf(d[1]), hint: 'Which word tells what it is like?',
      explain: W.sent(d[0].replace(d[1], '<b>' + d[1] + '</b>')), meta: { k: 'g2-describe', s: d[0] } };
  }
  function feelWord() {
    var f = R.pick(FEEL), ws = words(f[0]);
    return { q: 'Tap the word that tells a <b>feeling</b>.', fig: W.sent(f[0]), type: 'tap', tiles: ws, answer: ws.indexOf(f[1]), hint: 'How did the writer feel?',
      explain: W.sent(f[0].replace(f[1], '<b>' + f[1] + '</b>')), meta: { k: 'g2-feel-word', s: f[0] } };
  }
  function voiceTf() {
    var v = R.pick(VOICE), yes = R.int(0, 1) === 1, x = yes ? v[1] : v[0];
    return { q: Q.name() + ' wrote this. Does it show the writer' + '’' + 's voice?', fig: W.sent(x), type: 'tf', answer: yes,
      why: { options: ['It has describing words or a feeling.', 'It is plain, with no describing words or feelings.'], answer: yes ? 0 : 1 },
      hint: 'Can you hear how the writer feels?', explain: W.sent(v[1]), meta: { k: 'g2-voice-tf', s: x } };
  }

  /* ---------- first person ---------- */
  function pov() {
    var first = R.int(0, 1) === 1, x = R.pick(first ? FIRST : OTHER);
    return { q: 'Who is telling this?', fig: W.sent(x), type: 'tap', tiles: ['The writer: first person (I, we, my)', 'Someone else is being told about'], answer: first ? 0 : 1,
      prompt: 'Look for <b>I</b>, <b>we</b>, <b>my</b>, <b>our</b>.', hint: 'I, we, my, our: first person.', explain: first ? 'The writer is in it: first person.' : 'It tells about someone else.', meta: { k: 'g2-pov', s: x } };
  }
  function povPick(lv) {
    var right = R.some(FIRST, 2), wrong = R.some(OTHER, lv > 1 ? 3 : 2);
    return Q.all('Pick every sentence written in the <b>first person</b>.', right, wrong, { hint: 'Look for I, we, my, our.', explain: 'The writer says I or we.', meta: { k: 'g2-pov-pick' } });
  }
  function povChange(lv) {
    var p = R.pick(POV), wrong = [p[1]].concat(lv > 1 ? [R.pick(others(POV, p))[1]] : []);
    return Q.one('Which one tells it in the <b>first person</b>?', p[0], wrong, { fig: W.sent(p[1]), hint: 'Tell it as if it happened to you.', explain: W.sent(p[1]) + ' &rarr; ' + W.sent(p[0]), meta: { k: 'g2-pov-change' } });
  }
  function povTf() {
    var p = R.pick(POV), first = R.int(0, 1) === 1, x = first ? p[0] : p[1], yes = R.int(0, 1) === 1, saysFirst = yes === first;
    return { q: Q.name() + ' says this is ' + (saysFirst ? '' : '<b>not</b> ') + 'in the first person.', fig: W.sent(x), type: 'tf', answer: yes,
      why: { options: ['It uses I, we, my or our.', 'It does not use I, we, my or our.'], answer: first ? 0 : 1 },
      hint: 'Look for I, we, my, our.', explain: first ? 'First person.' : 'Not first person.', meta: { k: 'g2-pov-tf', s: x, says: saysFirst } };
  }

  /* ---------- revise: add or take out ---------- */
  function noBelong(lv) {
    var p = R.pick(PARA), all = R.shuffle(p[1].concat([p[2]]));
    return Q.tiles('Topic: <b>' + p[0] + '</b>. Which sentence should you <b>take out</b>?', p[2], p[1].slice(0, lv > 1 ? 2 : 1), { fig: W.passage('', all),
      hint: 'Which one is not about the topic?', explain: '<b>' + p[2] + '</b> is not about ' + p[0].toLowerCase() + '.', meta: { k: 'g2-no-belong', topic: p[0] } });
  }
  function addOne(lv) {
    var p = R.pick(PARA), other = R.pick(others(PARA, p)), wrong = [p[2]].concat(lv > 1 ? [other[2]] : []);
    return Q.one('Your friend says, "Add one more detail." Which sentence would you <b>add</b>?', p[3], wrong, { fig: W.passage(p[0], p[1]),
      hint: 'It must be about the topic, and new.', explain: W.sent(p[3]), meta: { k: 'g2-add-one', topic: p[0] } });
  }
  function reviseTf() {
    var p = R.pick(PARA), yes = R.int(0, 1) === 1, out = yes ? p[2] : R.pick(p[1]);
    return { q: 'Topic: <b>' + p[0] + '</b>. ' + Q.name() + ' wants to take out <b>' + out + '</b>. Is that a good change?', fig: W.passage('', R.shuffle(p[1].concat([p[2]]))), type: 'tf', answer: yes,
      why: { options: ['It is not about the topic.', 'It is about the topic. Keep it.'], answer: yes ? 0 : 1 },
      hint: 'Is that sentence about the topic?', explain: 'Take out <b>' + p[2] + '</b>.', meta: { k: 'g2-revise-tf', topic: p[0], out: out } };
  }
  function reviseWhich() {
    var p = R.pick(PARA), added = R.int(0, 1) === 1, before = added ? p[1] : p[1].concat([p[2]]), after = added ? p[1].concat([p[3]]) : p[1], tiles = ['added a sentence', 'took out a sentence'];
    return { q: 'Before and after. What did the writer do?', fig: W.passage('Before', before) + W.passage('After', after), type: 'tap', tiles: tiles, answer: added ? 0 : 1,
      hint: 'Count the sentences. Which one is new, or gone?', explain: added ? 'Added <b>' + p[3] + '</b>' : 'Took out <b>' + p[2] + '</b>', meta: { k: 'g2-revise-which', before: before, after: after } };
  }

  /* ---------- edit: capitals, end marks, spelling ---------- */
  function findErr() {
    var e = R.pick(ERR), ws = e[0].split(' ');
    return { q: 'Tap the word with the mistake.', fig: W.sent(e[0]), type: 'tap', tiles: ws, answer: ws.indexOf(e[1]), prompt: 'Check capitals, end marks and spelling.',
      hint: 'Read it slowly, one word at a time.', explain: W.sent(e[2]), meta: { k: 'g2-find-err', s: e[0] } };
  }
  /* a fix that is only half done: one problem is fixed, but a new one is made */
  function halfFix(e) { return e[3] === 'capital' ? e[2].slice(0, -1) : e[2].charAt(0).toLowerCase() + e[2].slice(1); }
  function fixErr(lv) {
    var e = R.pick(ERR);
    return Q.one('Which sentence is fixed the right way?', e[2], lv > 1 ? [e[0], halfFix(e)] : [e[0]], { hint: 'A capital at the start and for names, a mark at the end, and words spelled right.',
      explain: W.sent(e[2]), meta: { k: 'g2-fix-err', s: e[0] } });
  }
  function errKind() {
    var e = R.pick(ERR);
    return Q.tiles('What kind of mistake is in this sentence?', e[3], others(KINDS, e[3]), { fig: W.sent(e[0]),
      hint: 'Look at the first letter, the names, the end, and each word.', explain: W.sent(e[2]), meta: { k: 'g2-err-kind', s: e[0] } });
  }
  function editTf() {
    var e = R.pick(ERR), yes = R.int(0, 1) === 1, x = yes ? e[2] : e[0];
    return { q: 'Is this sentence ready to publish?', fig: W.sent(x), type: 'tf', answer: yes,
      why: { options: ['Capitals, end mark and spelling are all right.', 'It still has a mistake.'], answer: yes ? 0 : 1 },
      hint: 'Check capitals, then the end mark, then spelling.', explain: W.sent(e[2]), meta: { k: 'g2-edit-tf', s: x } };
  }

  Atlas.register('writing', {
    full: true,
    lessons: [{
      id: 'voice-pov', title: 'Voice and point of view', sub: 'Sound like you. Know who is telling it.',
      concepts: [
        { slug: 'voice', title: 'Your voice', exp: ['D2.3'], skill: 'voice',
          model: [
            step(W.sent('I have a dog.'), 'Plain.'),
            step(W.sent('My <b>fluffy</b> dog, Biscuit, makes me <b>laugh</b> every day.'), 'Describing words and a feeling. It sounds like you.'),
            step(W.sent('It snowed.'), 'Plain again.'),
            step(W.sent('<b>Soft, fat</b> snowflakes floated down, and I <b>cheered</b>.'), 'Now you can see it, and feel it.')
          ],
          guided: [T(voice, 1), describe, feelWord],
          check: [T(voice, 2), voiceTf, describe, feelWord, T(voice, 2)],
          coach: '<p>Ask: "How did it feel? What did it look like?" Then help the child add one describing word.</p>',
          mistake: '<p>Writing only plain, flat sentences. One describing word or feeling makes a big difference.</p>' },
        { slug: 'pov', title: 'First person: I and we', exp: ['D2.4'], skill: 'pov',
          model: [
            step(W.sent('<b>I</b> lost <b>my</b> mitten.'), 'The writer tells it.'),
            step(W.sent('<b>He</b> lost <b>his</b> mitten.'), 'About someone else.'),
            step(W.sent('<b>Our</b> tent leaked.'), 'The writer was there.'),
            step(W.sent('<b>Their</b> tent leaked.'), 'Someone else' + '’' + 's tent.')
          ],
          guided: [pov, T(povChange, 1), T(povPick, 1)],
          check: [T(povPick, 2), pov, povTf, T(povChange, 2), pov],
          coach: '<p>A true story about you is written in the first person. Point to the "I" in the child\'s writing.</p>',
          mistake: '<p>Switching between I and he in one story.</p>' }
      ]
    }, {
      id: 'revise-edit', title: 'Revising and editing', sub: 'Make it better, then make it correct.',
      concepts: [
        { slug: 'revise', title: 'Revise: add or take out a sentence', exp: ['D2.5'], skill: 'revise',
          model: [
            step(W.passage('My dog Biscuit', ['Biscuit has soft brown fur.', 'My aunt lives in Regina.']), 'Not about Biscuit. Take it out.'),
            step(W.sent('He sleeps at the end of my bed.'), 'A new detail. Add it.'),
            step(W.passage('All about bees', ['Bees make honey.', 'I have a blue bike.']), 'Which one is off topic?'),
            step(W.passage('All about bees', ['Bees make honey.', 'They live in a hive.']), 'Out with the bike. In with the hive.')
          ],
          guided: [T(noBelong, 1), T(addOne, 1), reviseWhich],
          check: [T(noBelong, 2), reviseTf, T(addOne, 2), reviseWhich, T(noBelong, 2)],
          coach: '<p>Read the child\'s draft aloud. Ask one question ("What colour was it?") and help them add the answer as a sentence.</p>',
          mistake: '<p>Thinking revising means recopying neatly. Revising changes the ideas.</p>' },
        { slug: 'edit', title: 'Edit: capitals, marks and spelling', exp: ['D2.6'], skill: 'edit',
          model: [
            step(W.sent('<mark class="hl">m</mark>y cat is black.'), 'A capital to start.'),
            step(W.sent('Where is my hat<mark class="hl">.</mark>'), 'An asking sentence needs ?'),
            step(W.sent('We had fun at the <mark class="hl">parck</mark>.'), 'Check spelling: park.'),
            step(W.sent('We live in <mark class="hl">C</mark>anada.'), 'Names need a capital too.')
          ],
          guided: [findErr, errKind, T(fixErr, 1)],
          check: [findErr, T(fixErr, 2), editTf, errKind, findErr],
          coach: '<p>Edit one thing at a time: first capitals, then end marks, then spelling. Use a different colour pencil for editing.</p>',
          mistake: '<p>Trying to find every mistake at once. Check one thing per read.</p>' }
      ]
    }],
    practice: [
      { id: 'voice', name: 'Your voice', code: 'D2.3', gen: voice },
      { id: 'pov', name: 'First person', code: 'D2.4', gen: pov },
      { id: 'revise', name: 'Revising', code: 'D2.5', gen: noBelong },
      { id: 'edit', name: 'Editing', code: 'D2.6', gen: findErr }
    ],
    tasks: [
      { id: 'draft-story', title: 'Draft a true story', code: 'D2.1', pic: W.icon('write'), say: 'Write about something that really happened to you.', write: true,
        run: ['Talk about a real moment: a trip, a first time, a funny moment.', 'The child tells it aloud first, then writes three to five sentences in order: first, next, last.', 'Drawing or typing is fine too.'],
        rubric: ['A few words; hard to follow.', 'Some sentences, not yet in order.', 'Three or more sentences in order, about one moment.', 'In order, with a beginning, an end, and a feeling.'] },
      { id: 'draft-opinion', title: 'Draft an opinion', code: 'D2.1', pic: W.icon('write'), say: 'Write what you think is the best snack, and give two reasons.', write: true,
        run: ['The child says their opinion and two reasons.', 'They write: "I think... because... Also..."'],
        rubric: ['No clear opinion yet.', 'An opinion with no reasons.', 'An opinion and one or two reasons.', 'A clear opinion, two reasons and an ending.'] },
      { id: 'draft-how-to', title: 'Draft how-to steps', code: 'D2.1', pic: W.icon('write'), say: 'Write the steps to make something, like a sandwich.', write: true,
        run: ['Choose something the child can do: brush teeth, make toast, plant a seed.', 'They write the steps in order with first, next, then, last.', 'Test it: follow the steps exactly as written.'],
        rubric: ['Steps are missing or mixed up.', 'Some steps in order.', 'All steps in order, with order words.', 'Clear steps anyone could follow, with what you need listed first.'] },
      { id: 'printing', title: 'Neat printing', code: 'D2.2', pic: W.icon('write'), say: 'Print one sentence carefully on lined paper.',
        run: ['Copy a short sentence onto lined paper.', 'Check: letters sit on the line, tall letters reach the top line, finger spaces between words.'],
        rubric: ['Letters are hard to read.', 'Most letters readable; size and spacing vary.', 'Neat letters on the line, with spaces between words.', 'Neat, even and quick, and kept neat in everyday writing.'] },
      { id: 'final-copy', title: 'Make a final copy', code: 'D3.1', pic: W.icon('star'), say: 'Choose your best draft. Make a neat final copy with a picture.',
        run: ['Choose a draft that has been revised and edited.', 'Make a final copy with a title and a picture that matches the words.'],
        rubric: ['Not finished yet.', 'Finished, with some mistakes left.', 'Neat, with a title and a matching picture.', 'Polished, with a title, picture and a special touch (a cover or a label).'] },
      { id: 'share', title: 'Read it aloud', code: 'D3.2', pic: W.icon('talk'), say: 'Read your writing aloud to your family, with expression.',
        run: ['The child practises once, then reads the final copy to family.', 'Remind them: look up, read with feeling, and show the picture.'],
        rubric: ['Very quiet or rushed.', 'Readable, with little expression.', 'Clear, with expression.', 'Clear and expressive, and looks up at the listeners.'] },
      { id: 'present-reflect', title: 'What helped me share?', code: 'D3.3', pic: W.icon('think'), say: 'What helped you when you read your writing aloud?',
        run: ['After sharing, ask: "What helped? Practising? Looking up? Reading slowly?"'],
        rubric: ['Cannot say yet.', 'Names one thing with help.', 'Names a strategy that helped.', 'Names a few strategies and one to try next time.'] }
    ]
  });

  Q.shapes('writing', {
    voice: [[1, 'describe', describe], [1, 'feeling', feelWord], [1, 'tf', voiceTf]],
    pov: [[1, 'pick', povPick], [1, 'change', povChange], [2, 'tf', povTf]],
    revise: [[1, 'add', addOne], [1, 'which', reviseWhich], [2, 'tf', reviseTf]],
    edit: [[1, 'fix', fixErr], [1, 'kind', errKind], [1, 'tf', editTf]]
  });
})();
