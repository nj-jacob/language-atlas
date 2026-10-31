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

  var FIRST = ['I fed the fish.', 'We went to the market.', 'My dad and I made pancakes.', 'I lost my mitten.', 'Our class went on a nature walk.'];
  var OTHER = ['She fed the fish.', 'They went to the market.', 'Kai and his dad made pancakes.', 'He lost his mitten.', 'The class went on a nature walk.'];
  /* [plain, with describing words and feeling] */
  var VOICE = [['I have a dog.', 'My fluffy dog, Biscuit, makes me laugh every day.'], ['We went to the beach.', 'The warm sand and cold waves made it the best day ever!'],
    ['I ate soup.', 'The hot, spicy soup warmed me right up.'], ['It snowed.', 'Soft, fat snowflakes floated down, and I cheered.']];
  var DESCRIBE = [['The <b>fluffy</b> kitten slept.', 'fluffy'], ['I ate a <b>crunchy</b> apple.', 'crunchy'], ['We saw a <b>huge</b> moose.', 'huge'], ['A <b>bright</b> moon came up.', 'bright']];
  /* [topic, sentences that belong, one that does not, a detail to add] */
  var PARA = [['My dog Biscuit', ['Biscuit has soft brown fur.', 'He loves to fetch.'], 'My aunt lives in Regina.', 'He sleeps at the end of my bed.'],
    ['Making a snowman', ['First we rolled a big ball.', 'Then we added a smaller one on top.'], 'Summer is my favourite season.', 'Last, we gave him a carrot nose.'],
    ['Our class garden', ['We planted beans and squash.', 'I water the plants on Fridays.'], 'My brother plays the drums.', 'In September we picked the beans.']];
  /* [sentence with one mistake, the word with the mistake, the fixed sentence, the kind of mistake] */
  var ERR = [['my cat is black.', 'my', 'My cat is black.', 'capital'], ['We drove to london.', 'london.', 'We drove to London.', 'capital'], ['Where is my hat.', 'hat.', 'Where is my hat?', 'end mark'],
    ['I like to swim', 'swim', 'I like to swim.', 'end mark'], ['We had fun at the parck.', 'parck.', 'We had fun at the park.', 'spelling'], ['I sed thank you.', 'sed', 'I said thank you.', 'spelling'],
    ['ava has a red bike.', 'ava', 'Ava has a red bike.', 'capital']];

  function plain(s) { return s.replace(/<\/?b>/g, ''); }

  /* ---------- question makers ---------- */
  function pov() {
    var first = R.int(0, 1) === 1, s = R.pick(first ? FIRST : OTHER);
    return { q: 'Who is telling this?', fig: W.sent(s), type: 'tap', tiles: ['The writer: first person (I, we, my)', 'Someone else is being told about'], answer: first ? 0 : 1,
      prompt: 'Look for <b>I</b>, <b>we</b>, <b>my</b>, <b>our</b>.', hint: 'I, we, my, our: first person.', explain: first ? 'The writer is in it: first person.' : 'It tells about someone else.', meta: { k: 'g2-pov', s: s } };
  }
  function povPick() {
    var right = R.some(FIRST, 2), wrong = R.some(OTHER, 2);
    return Q.all('Pick every sentence written in the <b>first person</b>.', right, wrong, { hint: 'Look for I, we, my, our.', explain: 'The writer says I or we.', meta: { k: 'g2-pov-pick' } });
  }
  function voice() {
    var v = R.pick(VOICE);
    return Q.one('Which sentence shows more of the writer' + '’' + 's <b>voice</b>?', v[1], [v[0]], { prompt: 'Which one shows how the writer feels?', hint: 'Look for describing words and feelings.',
      explain: 'Describing words and feelings make it sound like you.', meta: { k: 'g2-voice-w' } });
  }
  function describe() {
    var d = R.pick(DESCRIBE), words = plain(d[0]).replace(/\.$/, '').split(' ');
    return { q: 'Tap the <b>describing word</b>.', fig: W.sent(plain(d[0])), type: 'tap', tiles: words, answer: words.indexOf(d[1]), hint: 'Which word tells what it is like?',
      explain: W.sent(d[0]), meta: { k: 'g2-describe', w: d[1] } };
  }
  function noBelong(lv) {
    var p = R.pick(PARA), all = R.shuffle(p[1].concat([p[2]]));
    return Q.tiles('Topic: <b>' + p[0] + '</b>. Which sentence should you <b>take out</b>?', p[2], p[1].slice(0, lv > 1 ? 2 : 1), { fig: W.passage('', all),
      hint: 'Which one is not about the topic?', explain: '<b>' + p[2] + '</b> is not about ' + p[0].toLowerCase() + '.', meta: { k: 'g2-no-belong', topic: p[0] } });
  }
  function addOne() {
    var p = R.pick(PARA), other = R.pick(PARA.filter(function (x) { return x !== p; }));
    return Q.one('Your friend says, "Add one more detail." Which sentence would you <b>add</b>?', p[3], [other[3], p[2]], { fig: W.passage(p[0], p[1]),
      hint: 'It must be about the topic, and new.', explain: W.sent(p[3]), meta: { k: 'g2-add-one', topic: p[0] } });
  }
  function findErr() {
    var e = R.pick(ERR), words = e[0].split(' ');
    return { q: 'Tap the word with the mistake.', fig: W.sent(e[0]), type: 'tap', tiles: words, answer: words.indexOf(e[1]), prompt: 'Check capitals, end marks and spelling.',
      hint: 'Read it slowly, one word at a time.', explain: W.sent(e[2]), meta: { k: 'g2-find-err', s: e[0] } };
  }
  /* a fix that is only half done: one problem is fixed, but a new one is made */
  function halfFix(e) { return e[3] === 'capital' ? e[2].slice(0, -1) : e[2].charAt(0).toLowerCase() + e[2].slice(1); }
  function fixErr() {
    var e = R.pick(ERR);
    return Q.one('Which sentence is fixed the right way?', e[2], [e[0], halfFix(e)], { hint: 'A capital at the start and for names, a mark at the end, and words spelled right.',
      explain: W.sent(e[2]), meta: { k: 'g2-fix-err', s: e[0] } });
  }
  function errKind() {
    var e = R.pick(ERR);
    return Q.tiles('What kind of mistake is in this sentence?', e[3], ['capital', 'end mark', 'spelling'].filter(function (x) { return x !== e[3]; }), { fig: W.sent(e[0]),
      hint: 'Look at the first letter, the names, the end, and each word.', explain: W.sent(e[2]), meta: { k: 'g2-err-kind', s: e[0] } });
  }

  Atlas.register('writing', {
    lessons: [{
      id: 'voice-pov', title: 'Voice and point of view', sub: 'Sound like you. Know who is telling it.',
      concepts: [
        { slug: 'voice', title: 'Your voice', exp: ['D2.3'], skill: 'voice-pov',
          model: [
            step(W.sent('I have a dog.'), 'Plain.'),
            step(W.sent('My <b>fluffy</b> dog, Biscuit, makes me <b>laugh</b> every day.'), 'Describing words and a feeling. It sounds like you.')
          ],
          guided: [voice, describe],
          check: [voice, describe],
          coach: '<p>Ask: "How did it feel? What did it look like?" Then help the child add one describing word.</p>',
          mistake: '<p>Writing only plain, flat sentences. One describing word or feeling makes a big difference.</p>' },
        { slug: 'pov', title: 'First person: I and we', exp: ['D2.4'], skill: 'voice-pov',
          model: [
            step(W.sent('<b>I</b> lost <b>my</b> mitten.'), 'The writer tells it.'),
            step(W.sent('<b>He</b> lost <b>his</b> mitten.'), 'About someone else.')
          ],
          guided: [pov, pov],
          check: [povPick, pov],
          coach: '<p>A true story about you is written in the first person. Point to the "I" in the child\'s writing.</p>',
          mistake: '<p>Switching between I and he in one story.</p>' }
      ]
    }, {
      id: 'revise-edit', title: 'Revising and editing', sub: 'Make it better, then make it correct.',
      concepts: [
        { slug: 'revise', title: 'Revise: add or take out a sentence', exp: ['D2.5'], skill: 'revise-edit',
          model: [
            step(W.passage('My dog Biscuit', ['Biscuit has soft brown fur.', 'My aunt lives in Regina.']), 'Not about Biscuit. Take it out.'),
            step(W.sent('He sleeps at the end of my bed.'), 'A new detail. Add it.')
          ],
          guided: [function () { return noBelong(1); }, addOne],
          check: [function () { return noBelong(2); }, addOne],
          coach: '<p>Read the child\'s draft aloud. Ask one question ("What colour was it?") and help them add the answer as a sentence.</p>',
          mistake: '<p>Thinking revising means recopying neatly. Revising changes the ideas.</p>' },
        { slug: 'edit', title: 'Edit: capitals, marks and spelling', exp: ['D2.6'], skill: 'revise-edit',
          model: [
            step(W.sent('<mark class="hl">m</mark>y cat is black.'), 'A capital to start.'),
            step(W.sent('Where is my hat<mark class="hl">.</mark>'), 'An asking sentence needs ?'),
            step(W.sent('We had fun at the <mark class="hl">parck</mark>.'), 'Check spelling: park.')
          ],
          guided: [findErr, errKind],
          check: [findErr, fixErr],
          coach: '<p>Edit one thing at a time: first capitals, then end marks, then spelling. Use a different colour pencil for editing.</p>',
          mistake: '<p>Trying to find every mistake at once. Check one thing per read.</p>' }
      ]
    }],
    practice: [
      { id: 'voice-pov', name: 'Voice and point of view', code: 'D2.3, D2.4', gen: pov },
      { id: 'revise-edit', name: 'Revising and editing', code: 'D2.5, D2.6', gen: noBelong }
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
    'voice-pov': [[1, 'pov-pick', povPick], [1, 'voice', voice], [1, 'describe', describe]],
    'revise-edit': [[1, 'add', addOne], [1, 'find', findErr], [1, 'kind', errKind], [2, 'fix', fixErr]]
  });
})();
