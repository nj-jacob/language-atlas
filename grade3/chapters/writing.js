/* Grade 3: writing and publishing.
   Ontario 2023 Language, Grade 3:
   D2.1 drafting short texts of various forms (narrative, persuasive, informational)   D2.2 beginning to write in cursive
   D2.3 a personal voice, with describing words                                        D2.4 point of view (first person or third person) in their texts
   D2.5 revising content and style to improve clarity, focus and coherence             D2.6 editing and proofreading (spelling, punctuation, grammar)
   D3.1 producing final texts                                                           D3.2 presenting texts, including reading aloud with expression
   D3.3 the strategies that helped them present, and how they grew as a writer
   Drafting, handwriting, publishing and presenting are activities with a grown-up: never auto-marked, with a rubric.
   Answer checks: tests/verify/grade3-writing.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var FIRST = ['I fed my dog.', 'We walked to the park.', 'My sister and I baked muffins.', 'I put on my skates.', 'Our class planted a tree.'];
  var THIRD = ['She fed her dog.', 'They walked to the park.', 'Omar and his sister baked muffins.', 'He put on his skates.', 'The class planted a tree.'];
  var VOICE = [['We went to the fair.', 'The fair was the best day of my whole summer!'], ['I have a cat.', 'My cat, Pepper, is the silliest, sweetest cat I know.'],
    ['It rained.', 'Rain drummed on the roof all night, and I loved it.'], ['I like hockey.', 'Nothing beats the swish of my skates on fresh ice!']];
  /* paragraphs: [topic, sentences that belong, a sentence that does not] */
  var PARA = [['My dog Biscuit', ['Biscuit has soft brown fur.', 'He loves to chase balls.', 'He sleeps at the end of my bed.'], 'My aunt lives in Halifax.'],
    ['Winter fun', ['We build snow forts.', 'We skate on the pond.', 'We drink hot cocoa after.'], 'Summer camp starts in July.'],
    ['Our garden', ['We plant beans and squash.', 'I water the plants every morning.', 'In August we pick the tomatoes.'], 'My brother plays the drums.'],
    ['Moose', ['Moose are the biggest kind of deer.', 'They eat leaves and water plants.', 'Male moose grow wide antlers.'], 'Penguins live far to the south.']];
  /* [sentence with one mistake, the word with the mistake, the fixed sentence] */
  var ERR = [['my friend Zara came over.', 'my', 'My friend Zara came over.'], ['We visited sudbury last summer.', 'sudbury', 'We visited Sudbury last summer.'],
    ['I sed hello to the bus driver.', 'sed', 'I said hello to the bus driver.'], ['We played outside becuz it was sunny.', 'becuz', 'We played outside because it was sunny.'],
    ['Leila and omar went skating.', 'omar', 'Leila and Omar went skating.'], ['My frend lives next door.', 'frend', 'My friend lives next door.'],
    ['The geese is flying south.', 'is', 'The geese are flying south.']];

  /* ---------- question makers ---------- */
  function pov() {
    var first = R.int(0, 1) === 1, s = R.pick(first ? FIRST : THIRD);
    return { q: 'Is this written in the first person or the third person?', fig: W.sent(s), type: 'tap', tiles: ['First person (I, we)', 'Third person (he, she, they)'], answer: first ? 0 : 1,
      prompt: 'Look for <b>I</b>, <b>we</b>, <b>my</b>, <b>our</b>.', hint: 'I, we, my, our: first person.', explain: first ? 'The writer is in it: first person.' : 'The writer tells about others: third person.', meta: { k: 'g3-pov', s: s } };
  }
  function povSwitch() {
    var i = R.int(0, FIRST.length - 1);
    return Q.one('Change it to the <b>third person</b>.', THIRD[i], [FIRST[(i + 1) % FIRST.length], FIRST[i].replace(/\.$/, '!')], { fig: W.sent(FIRST[i]),
      hint: 'Swap I and my for he, she, they, his, her.', explain: W.sent(THIRD[i]), meta: { k: 'g3-pov-switch', s: FIRST[i] } });
  }
  function pickFirst() {
    var right = R.some(FIRST, 2), wrong = R.some(THIRD, 2);
    return Q.all('Pick every sentence in the <b>first person</b>.', right, wrong, { hint: 'Look for I, we, my, our.', explain: 'First person uses I, we, my, our.', meta: { k: 'g3-pick-first' } });
  }
  function voice() {
    var v = R.pick(VOICE);
    return Q.one('Which sentence shows the writer’s <b>voice</b>: their feelings and personality?', v[1], [v[0]], { hint: 'Which one sounds like a real person who cares?', explain: 'Feelings and describing words give writing a voice.', meta: { k: 'g3-writer-voice' } });
  }

  function noBelong(lv) {
    var p = R.pick(PARA), list = R.shuffle(p[1].concat([p[2]]));
    return Q.one('This paragraph is about <b>' + p[0] + '</b>. Which sentence does <b>not</b> belong?', p[2], p[1].slice(0, lv > 1 ? 3 : 2), { fig: W.passage(p[0], list),
      prompt: 'Read each sentence. Is it about ' + p[0] + '?', hint: 'One sentence is about something else.', explain: 'Take it out to keep the writing focused.', meta: { k: 'g3-no-belong', topic: p[0] } });
  }
  function addDetail() {
    var p = R.pick(PARA), keep = p[1].slice(0, 2), add = p[1][2], others = PARA.filter(function (x) { return x !== p; }).map(function (x) { return x[2]; });
    return Q.one('Which sentence would fit in this paragraph?', add, R.some(others, 2), { fig: W.passage(p[0], keep), hint: 'Which one is about ' + p[0] + '?', explain: 'It adds a detail about ' + p[0] + '.', meta: { k: 'g3-add-detail', topic: p[0] } });
  }
  function findError() {
    var e = R.pick(ERR), words = e[0].replace(/\.$/, '').split(' ');
    return { q: 'One word has a mistake. Tap it.', fig: W.sent(e[0]), type: 'tap', tiles: words, answer: words.indexOf(e[1]),
      hint: 'Check capitals for names and the first word. Check tricky spellings.', explain: W.sent(e[2]), meta: { k: 'g3-find-error', s: e[0] } };
  }
  function fixed() {
    var e = R.pick(ERR);
    return Q.one('Which is the <b>fixed</b> sentence?', e[2], [e[0], e[2].toLowerCase()], { fig: W.sent(e[0]), hint: 'Read slowly, one word at a time.', explain: W.sent(e[2]), meta: { k: 'g3-fixed', s: e[0] } });
  }

  Atlas.register('writing', {
    lessons: [{
      id: 'voice-pov', title: 'Voice and point of view', sub: 'Sound like you. Know who is telling it.',
      concepts: [
        { slug: 'voice', title: 'Your voice', exp: ['D2.3'], skill: 'voice-pov',
          model: [
            step(W.sent('We went to the fair.'), 'True, but flat.'),
            step(W.sent('The fair was the <b>best</b> day of my <b>whole</b> summer!'), 'Now I hear a real person.'),
            step(W.icon('write'), 'Add how you feel, and strong describing words.')
          ],
          key: '<p>Voice = your feelings + strong words.</p>',
          guided: [voice, voice],
          check: [voice, voice],
          coach: '<p>Ask "How did it feel?" and "What did it look like?" and help the child add one of those to a sentence.</p>',
          mistake: '<p>Adding "very" to everything. Look for a stronger word instead (very big: huge).</p>' },
        { slug: 'pov', title: 'First person or third person', exp: ['D2.4'], skill: 'voice-pov',
          model: [
            step(W.sent('<b>I</b> fed <b>my</b> dog.'), 'I am in it: <b>first person</b>.'),
            step(W.sent('<b>She</b> fed <b>her</b> dog.'), 'I tell about someone else: <b>third person</b>.')
          ],
          key: '<p>First person: I, we, my, our. Third person: he, she, they.</p>',
          guided: [pov, povSwitch],
          check: [pov, pickFirst],
          coach: '<p>Write one sentence about your day in the first person, then rewrite it as if it were about someone else.</p>',
          mistake: '<p>Switching between I and she in the same story. Pick one and stick with it.</p>' }
      ]
    }, {
      id: 'revise-edit', title: 'Revising and editing', sub: 'Make it clear, then make it correct.',
      concepts: [
        { slug: 'revise', title: 'Revise: keep it on topic', exp: ['D2.5'], skill: 'revise-edit',
          model: [
            step(W.passage('My dog Biscuit', ['Biscuit has soft brown fur.', 'My aunt lives in Halifax.', 'He loves to chase balls.']), 'Read it again.'),
            step(W.sent('My aunt lives in Halifax.'), 'Not about Biscuit. Take it out.'),
            step(W.sent('He sleeps at the end of my bed.'), 'Add a detail that fits.')
          ],
          key: '<p>Revise: take out what does not fit, add what helps.</p>',
          guided: [function () { return noBelong(1); }, addDetail],
          check: [function () { return noBelong(2); }, addDetail],
          coach: '<p>Read the child’s draft aloud to them. Ask: "Does every sentence tell about the topic? What could you add?"</p>',
          mistake: '<p>Thinking revising means recopying neatly. Revising changes what it says.</p>' },
        { slug: 'edit', title: 'Edit: fix the mistakes', exp: ['D2.6'], skill: 'revise-edit',
          model: [
            step(W.sent('<mark class="hl">my</mark> friend Zara came over.'), 'Check each word. This one needs a capital.'),
            step(W.sent('<mark class="hl">M</mark>y friend Zara came over.'))
          ],
          key: '<p>Check: capitals, end marks, spelling, and that it sounds right.</p>',
          guided: [findError, fixed],
          check: [findError, fixed],
          coach: '<p>Have the child read their writing aloud, pointing to each word. Many mistakes are heard before they are seen.</p>',
          mistake: '<p>Editing everything at once. Check one thing at a time: capitals, then end marks, then spelling.</p>' }
      ]
    }],
    practice: [
      { id: 'voice-pov', name: 'Voice and point of view', code: 'D2.3, D2.4', gen: pov },
      { id: 'revise-edit', name: 'Revising and editing', code: 'D2.5, D2.6', gen: noBelong }
    ],
    tasks: [
      { id: 'draft-story', title: 'Draft a story', code: 'D2.1', pic: W.icon('write'), say: 'Write a story about a time you were surprised.', write: true,
        run: ['Talk about the idea first: who, where, what happened, how it ended.', 'The child writes a short draft (five or more sentences). Spelling does not matter yet.', 'Then try an opinion piece another day: "The best season is... because..."'],
        rubric: ['A few words or one sentence.', 'Some sentences; the order is hard to follow.', 'A beginning, middle and end in five or more sentences.', 'A clear story with details and feelings, in the writer’s own voice.'] },
      { id: 'draft-opinion', title: 'Draft an opinion', code: 'D2.1', pic: W.icon('write'), say: 'Write what you think is the best pet, and why.', write: true,
        run: ['The child says their opinion, then gives two or three reasons.', 'They write it as a short paragraph: opinion, reasons, ending.'],
        rubric: ['An opinion with no reasons.', 'An opinion and one reason.', 'An opinion with two or more reasons and an ending.', 'A convincing opinion with reasons and examples.'] },
      { id: 'cursive', title: 'Begin cursive', code: 'D2.2', pic: W.icon('write'), say: 'Practise joined-up letters on paper: a, c, d, g.',
        run: ['On lined paper, model the letters a, c, d and g (they all start like c).', 'The child copies each letter five times, then joins them in short words: cad, dog.', 'Little and often: five minutes a day.'],
        rubric: ['Letters not yet formed.', 'Forms some letters with help.', 'Forms the letters with the right start, size and spacing.', 'Joins letters smoothly in short words.'] },
      { id: 'final-copy', title: 'Make a final copy', code: 'D3.1', pic: W.icon('star'), say: 'Choose your best draft. Make a neat final copy with a picture.',
        run: ['Choose a revised and edited draft.', 'The child makes a final copy, on paper or typed, and adds a picture or a title that fits.'],
        rubric: ['Not finished yet.', 'Finished, with some mistakes left in.', 'A neat, correct final copy.', 'A polished copy where the picture and layout add to the message.'] },
      { id: 'share', title: 'Share it aloud', code: 'D3.2', pic: W.icon('talk'), say: 'Read your writing aloud to your family, with expression.',
        run: ['The child reads their final copy aloud to the family.', 'Listeners give one star (what they liked) and one wish (something to try next time).'],
        rubric: ['Reads very quietly or stops often.', 'Reads it through with little expression.', 'Reads clearly with some expression.', 'Reads with expression and looks up at the listeners.'] },
      { id: 'writer-reflect', title: 'How I grew as a writer', code: 'D3.3', pic: W.icon('think'), say: 'What helped you share your writing? How have you grown?',
        run: ['Put an early draft next to a final copy.', 'Ask: "What is better now? What helped you most when you shared it?"'],
        rubric: ['Cannot say what helped yet.', 'Names one thing with help.', 'Names a strategy and one way they have grown.', 'Explains how they have grown, with examples from their writing.'] }
    ]
  });

  Q.shapes('writing', {
    'voice-pov': [[1, 'switch', povSwitch], [1, 'pick-first', pickFirst], [1, 'voice', voice]],
    'revise-edit': [[1, 'add-detail', addDetail], [1, 'find-error', findError], [1, 'fixed', fixed]]
  });
})();
