/* Grade 5: writing and publishing.
   Ontario 2023 Language, Grade 5, D2 Creating Texts and D3 Publishing, Presenting and Reflecting:
   D2.1 draft narrative, persuasive and informational texts         D2.2 fluent cursive, keyboarding and word-processing skills
   D2.3 a personal voice, varied language and a tone that fits the form    D2.4 point of view, perspectives and bias in their texts, and how readers might interpret them
   D2.5 revise content and style: word choice, adding or deleting sentences    D2.6 edit for spelling, punctuation, grammar and format
   D3.1 produce final texts with digital design tools    D3.2 publish and present    D3.3 strategies that helped, and next steps
   Drafting, handwriting, keyboarding, publishing and reflecting are activities with a grown-up, marked with a rubric. All sentences are written for this site.
   Answer checks: tests/verify/grade5-writing.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* [what you are writing, a line in a tone that fits, a line that does not] */
  var TONE = [['a letter to the mayor', 'I am writing to ask you to fix the broken lights in Elm Park.', 'Yo, the park lights are busted. Fix them.'],
    ['a funny story for your friends', 'My cat thinks she is the queen of the kitchen.', 'This text will now describe the behaviour of a cat.'],
    ['a report on wetlands', 'Wetlands filter water and reduce flooding.', 'Wetlands are, like, super awesome and stuff!'],
    ['a thank-you card to your coach', 'Thank you for cheering us on all season, even when we lost.', 'The hockey season has ended.']];
  /* [flat, with a personal voice] */
  var VOICE = [['I went to the lake.', 'That lake was my favourite place all summer, and I hated leaving it.'], ['The test was hard.', 'My brain felt like scrambled eggs after that test!'],
    ['We got a puppy.', 'The day we brought Pepper home, I could not stop grinning.'], ['It snowed a lot.', 'By morning the snow was up to my knees, and I loved every flake.']];
  /* [a one-sided sentence, a fairer one] */
  var FAIR = [['Only silly people own cats.', 'Dogs suit my family, but cats suit many others.'], ['Winter is the worst season and nobody likes it.', 'Winter is hard for me, though some people love it.'],
    ['Video games are a waste of time for everyone.', 'Video games can take up a lot of time, so I set limits.'], ['Soccer is the only sport worth playing.', 'Soccer is my favourite sport, but there are many good ones.']];
  /* [first person, third person] */
  var POV = [['I think the park needs a rink.', 'She thinks the park needs a rink.'], ['We planted trees by the river.', 'They planted trees by the river.'], ['My dog loves the snow.', 'His dog loves the snow.'], ['Our class wrote to the mayor.', 'Their class wrote to the mayor.']];
  /* paragraphs: [topic, sentences that belong, one that does not, a detail to add] */
  var PARA = [['My grandmother' + AP + 's garden', ['Nani grows tomatoes, mint and chilies.', 'Every morning she waters the beds.'], 'My school has a big gym.', 'In August, we pick tomatoes together.'],
    ['Our trip to Algonquin Park', ['We paddled across a calm lake.', 'At night we heard loons calling.'], 'My cousin likes video games.', 'In the morning, a moose waded past our campsite.'],
    ['Why we need a crosswalk', ['Cars drive fast on Elm Street.', 'Many kids cross there to get to school.'], 'I had pancakes for breakfast.', 'Last week, a car nearly hit a student.']];
  /* [a weak word in a sentence, a stronger word, another weak word] */
  var WORDS = [['The soup was <b>good</b>.', 'delicious', 'fine'], ['The dog was <b>big</b>.', 'enormous', 'large-ish'], ['She <b>said</b>, "Watch out!"', 'shouted', 'told'], ['The movie was <b>bad</b>.', 'dreadful', 'not good'], ['He <b>walked</b> quickly to the door.', 'hurried', 'went']];
  /* edits: [the sentence with an error, the error, the fix] */
  var ERR = [['We visted the museum on Friday.', 'visted', 'visited'], ['Their going to the rink later.', 'Their', 'They' + AP + 're'], ['The dog wagged it' + AP + 's tail.', 'it' + AP + 's', 'its'],
    ['My brother and me went skating.', 'me', 'I'], ['She runned to the bus.', 'runned', 'ran'], ['I recieved a letter from Halifax.', 'recieved', 'received']];

  /* ---------- question makers ---------- */
  function tone(lv) {
    var t = R.pick(TONE), other = R.pick(TONE.filter(function (x) { return x !== t; }));
    return Q.one('You are writing <b>' + t[0] + '</b>. Which line has the right tone?', t[1], [t[2]].concat(lv > 1 ? [other[2]] : []), { prompt: 'Formal, friendly or funny: what fits?',
      hint: 'Match the tone to the form and the reader.', explain: W.sent(t[1]), meta: { k: 'g5-tone', form: t[0] } });
  }
  function voice() {
    var v = R.pick(VOICE);
    return Q.one('Which sentence has a stronger <b>personal voice</b>?', v[1], [v[0]], { hint: 'Which one sounds like a real person with feelings?', explain: W.sent(v[1]), meta: { k: 'g5-voice-w' } });
  }
  function fair() {
    var f = R.pick(FAIR);
    return Q.one('Some readers will disagree with you. Which sentence is <b>fairer</b> to them?', f[1], [f[0]], { prompt: 'Which one leaves room for other views?',
      hint: 'Watch out for only, nobody, everyone, worst.', explain: 'One-sided words can upset readers with other views.', meta: { k: 'g5-fair' } });
  }
  function pov() {
    var p = R.pick(POV), first = R.int(0, 1) === 1;
    return { q: 'What point of view is this sentence written in?', fig: W.sent(first ? p[0] : p[1]), type: 'tap', tiles: ['First person', 'Third person'], answer: first ? 0 : 1,
      hint: 'I, we, my, our: first person. She, they, his, their: third person.', explain: first ? 'The writer is in it: first person.' : 'Told about others: third person.', meta: { k: 'g5-pov-w', s: first ? p[0] : p[1] } };
  }
  function biasTf() {
    var f = R.pick(FAIR), right = R.int(0, 1) === 1, s = right ? f[0] : f[1];
    return { q: 'True or false? This sentence is <b>one-sided</b>.', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['It shuts out other views.', 'It leaves room for other views.'], answer: right ? 0 : 1 }, hint: 'Does it allow that others might think differently?', explain: W.sent(f[1]), meta: { k: 'g5-bias-tf', s: s } };
  }

  function noBelong(lv) {
    var p = R.pick(PARA), list = R.shuffle(p[1].concat([p[2]]));
    return Q.one('Which sentence should be <b>deleted</b>?', p[2], p[1].slice(0, lv > 1 ? 2 : 1), { fig: W.passage(p[0], list), hint: 'Which one is not about the topic?', explain: 'Take it out to keep the focus.', meta: { k: 'g5-delete', topic: p[0] } });
  }
  function addDetail() {
    var p = R.pick(PARA), others = PARA.filter(function (x) { return x !== p; }).map(function (x) { return x[3]; });
    return Q.one('Which sentence would you <b>add</b>?', p[3], others, { fig: W.passage(p[0], p[1]), hint: 'Which one adds a detail about the topic?', explain: 'It adds to ' + p[0].toLowerCase() + '.', meta: { k: 'g5-add', topic: p[0] } });
  }
  function strongWord(lv) {
    var w = R.pick(WORDS);
    return Q.tiles('Which word is <b>more precise</b> than the bold one?', w[1], [w[2]].concat(lv > 1 ? [R.pick(WORDS.filter(function (x) { return x !== w; }))[2]] : []), { fig: W.sent(w[0]),
      hint: 'Which word paints a clearer picture?', explain: W.sent(w[0].replace(/<b>.*<\/b>/, '<b>' + w[1] + '</b>')), meta: { k: 'g5-strong-word', s: w[0] } });
  }
  function findError() {
    var e = R.pick(ERR), words = e[0].replace(/\.$/, '').split(' ');
    return Q.tiles('One word has a mistake. Tap it.', e[1], words.filter(function (w) { return w !== e[1]; }).slice(0, 3), { fig: W.sent(e[0]),
      hint: 'Check spelling, its or it' + AP + 's, their or they' + AP + 're, and verb forms.', explain: W.sent(e[0].replace(e[1], '<b>' + e[2] + '</b>')), meta: { k: 'g5-find-error', s: e[0] } });
  }
  function fixed() {
    var e = R.pick(ERR), right = e[0].replace(e[1], e[2]);
    return Q.one('Which is the <b>edited</b> sentence?', right, [e[0]], { hint: 'Read slowly, one word at a time.', explain: W.sent(right), meta: { k: 'g5-fixed', s: e[0] } });
  }

  Atlas.register('writing', {
    lessons: [{
      id: 'voice-view', title: 'Voice, tone and point of view', sub: 'Sound like you, fit the form, and be fair to readers.',
      concepts: [
        { slug: 'voice-tone', title: 'Your voice, in the right tone', exp: ['D2.3'], skill: 'voice-view',
          model: [
            step(W.sent('The test was hard.'), 'Flat.'),
            step(W.sent('My brain felt like scrambled eggs after that test!'), 'Now I hear you.'),
            step(W.sent('I am writing to ask you to fix the lights.'), 'To the mayor: polite and formal.')
          ],
          guided: [voice, function () { return tone(1); }],
          check: [voice, function () { return tone(2); }],
          coach: '<p>Read a draft aloud and ask: "Does this sound like you? Would the reader feel the right way?"</p>',
          mistake: '<p>Using a chatty tone in a formal letter, or a stiff tone in a funny story.</p>' },
        { slug: 'view', title: 'Know your point of view, and be fair', exp: ['D2.4'], skill: 'voice-view',
          model: [
            step(W.sent('<b>I</b> think the park needs a rink.'), 'First person: my view.'),
            step(W.sent('<mark class="hl">Only</mark> silly people own cats.'), 'One-sided. Cat lovers will stop reading.'),
            step(W.sent('Dogs suit my family, but cats suit many others.'), 'Fair: room for other views.')
          ],
          guided: [pov, fair],
          check: [biasTf, fair],
          coach: '<p>Before sharing persuasive writing, ask: "How would someone who disagrees feel reading this?"</p>',
          mistake: '<p>Thinking strong words make a stronger argument. Fair words persuade more readers.</p>' }
      ]
    }, {
      id: 'revise-edit', title: 'Revising and editing', sub: 'Make it clear and focused, then make it correct.',
      concepts: [
        { slug: 'revise', title: 'Revise: add, delete and choose better words', exp: ['D2.5'], skill: 'revise-edit',
          model: [
            step(W.passage('Our trip to Algonquin Park', ['We paddled across a calm lake.', 'My cousin likes video games.']), 'Read it again.'),
            step(W.sent('My cousin likes video games.'), 'Off topic: delete it.'),
            step(W.sent('The lake was <b>nice</b>.') + ' &rarr; ' + W.sent('The lake was <b>glassy</b>.'), 'A more precise word.')
          ],
          guided: [function () { return noBelong(1); }, addDetail],
          check: [function () { return noBelong(2); }, function () { return strongWord(1); }],
          coach: '<p>Ask for feedback: read the draft to someone and ask "What was clear? What would you like to know more about?"</p>',
          mistake: '<p>Thinking revising means recopying neatly. Revising changes what the writing says.</p>' },
        { slug: 'edit', title: 'Edit: fix spelling, punctuation and grammar', exp: ['D2.6'], skill: 'revise-edit',
          model: [
            step(W.sent('The dog wagged <mark class="hl">it' + AP + 's</mark> tail.'), 'it' + AP + 's means "it is".'),
            step(W.sent('The dog wagged <b>its</b> tail.'), 'Fixed.'),
            step(W.icon('screen'), 'A spell checker helps, but read it yourself too.')
          ],
          guided: [findError, fixed],
          check: [findError, fixed],
          coach: '<p>Edit one thing at a time: spelling, then punctuation, then grammar. Reading aloud catches many mistakes.</p>',
          mistake: '<p>Trusting the spell checker for everything. It will not catch "their" for "they' + AP + 're".</p>' }
      ]
    }],
    practice: [
      { id: 'voice-view', name: 'Voice, tone and point of view', code: 'D2.3, D2.4', gen: tone },
      { id: 'revise-edit', name: 'Revising and editing', code: 'D2.5, D2.6', gen: noBelong }
    ],
    tasks: [
      { id: 'draft-narrative', title: 'Draft a story', code: 'D2.1', pic: W.icon('write'), say: 'Write a story about a time you were brave.', write: true,
        run: ['Talk about it first: who, where, the problem, how it ended.', 'The child writes a draft of two or three paragraphs. Spelling can wait.'],
        rubric: ['A few sentences.', 'A beginning and some events; the order is hard to follow.', 'A clear beginning, middle and end with details.', 'A gripping story with a strong voice, dialogue and a satisfying end.'] },
      { id: 'draft-persuasive', title: 'Draft a persuasive piece', code: 'D2.1', pic: W.icon('write'), say: 'Write to persuade: what should change at your school?', write: true,
        run: ['The child states an opinion, then gives three reasons with evidence.', 'They end by asking the reader to act.'],
        rubric: ['An opinion with no reasons.', 'An opinion and one or two reasons.', 'An opinion, three reasons with evidence, and an ending.', 'A convincing, fair piece that answers the other side.'] },
      { id: 'draft-info', title: 'Draft an information text', code: 'D2.1', pic: W.icon('read'), say: 'Write an information text with headings about an animal.', write: true,
        run: ['Use the sorted notes from Planning Writing.', 'The child writes a short introduction, then a paragraph under each heading.'],
        rubric: ['A few facts, not grouped.', 'Facts under one or two headings.', 'An introduction and a paragraph for each heading.', 'Clear, well-organized facts with a strong introduction and conclusion.'] },
      { id: 'cursive-keys', title: 'Cursive and keyboarding', code: 'D2.2', pic: W.icon('screen'), say: 'Copy a paragraph in cursive. Then type it.',
        run: ['The child copies a short paragraph in joined-up cursive, aiming for even size and slant.', 'Then they type it with both hands, eyes on the screen, and choose a clear font and size.'],
        rubric: ['Letters not yet joined; types with one finger.', 'Some letters joined; slow typing.', 'Fluent cursive; types with both hands and picks a clear font.', 'Smooth, neat cursive; types steadily without looking at the keys.'] },
      { id: 'final-design', title: 'Design a final copy', code: 'D3.1', pic: W.icon('star'), say: 'Make a final copy with a title, headings and a picture.',
        run: ['Choose an edited draft.', 'The child makes the final copy, on paper or with a computer: a title, headings, a picture or chart, and a clear layout.'],
        rubric: ['Not finished yet.', 'Finished, with mistakes left in.', 'A neat, correct final copy with a clear layout.', 'A polished copy where the design adds to the message.'] },
      { id: 'publish', title: 'Publish and present', code: 'D3.2', pic: W.icon('talk'), say: 'Share your writing with an audience. Explain your choices.',
        run: ['The child shares the final copy: reads it aloud, posts it on a family board, or sends it to a relative.', 'Ask: "Why did you choose that way to share it? How did it help your message?"'],
        rubric: ['Shares it only with help.', 'Shares it; cannot explain the choice yet.', 'Shares it and explains why the medium fits.', 'Shares it with confidence and explains how each choice helped the message.'] },
      { id: 'next-steps', title: 'How I grew, and what is next', code: 'D3.3', pic: W.icon('think'), say: 'What helped you share your message? What will you try next time?', write: true,
        run: ['Look back at the piece together, from plan to final copy.', 'The child writes what helped (tools, feedback, strategies) and one goal for next time.'],
        rubric: ['Cannot say what helped yet.', 'Names one thing with help.', 'Names what helped and sets one goal.', 'Reflects clearly on what helped and sets specific next steps.'] }
    ]
  });

  Q.shapes('writing', {
    'voice-view': [[1, 'voice', voice], [1, 'point-of-view', pov], [1, 'fair', fair], [2, 'true-false', biasTf]],
    'revise-edit': [[1, 'add', addDetail], [1, 'strong-word', strongWord], [1, 'find-error', findError], [2, 'fixed', fixed]]
  });
})();
