/* Grade 6: drafting, revising and publishing.
   Ontario 2023 Language, Grade 6, D2 Creating Texts and D3 Publishing, Presenting and Reflecting:
   D2.1 drafting complex texts of various forms        D2.2 fluent cursive, and keyboarding        D2.3 personal voice and a tone that suits the form
   D2.4 point of view, perspectives and bias in their own texts, and how other audiences might read them
   D2.5 revising: adding and deleting sentences for clarity, focus and coherence, using feedback
   D2.6 editing for spelling, punctuation, grammar and format, including with spell- and grammar-checkers
   D3.1 producing final texts      D3.2 publishing and presenting, and how their choices helped      D3.3 comparing strategies and next steps
   Drafting, handwriting, keyboarding and publishing are activities with a grown-up. Answer checks: tests/verify/grade6-writing.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  var AP = '’';

  /* ---------- voice, tone and bias ---------- */
  /* [what you are writing, a sentence in the right tone, sentences in the wrong tone] */
  var TONE = [['a thank-you note to your hockey coach', 'Thank you for believing in me all season.', ['Whatever, thanks I guess.', 'The season had 20 games.']],
    ['a news report about a flood', 'Heavy rain flooded three streets on Tuesday.', ['The streets were totally drowning, it was wild!', 'I hate rain so much.']],
    ['a card to a neighbour whose pet died', 'We are thinking of you, and we are so sorry.', ['Cheer up, it is not a big deal!', 'Here are some facts about pets.']],
    ['a speech asking for a longer recess', 'A longer recess would help us focus and stay healthy.', ['Recess is fine, I guess.', 'Give us more recess or else!']]];
  /* [a sentence, its tone] */
  var MOOD = [['Heavy rain flooded three streets on Tuesday.', 'calm and factual'], ['I can' + AP + 't believe they cut down the old oak. It was ours.', 'upset'],
    ['Best. Day. Ever!', 'excited'], ['We are thinking of you, and we are so sorry.', 'caring']];
  /* [one-sided, fairer] */
  var FAIR = [['Cats are better than dogs, and everyone knows it.', 'Many people prefer cats because they are independent.'], ['Only lazy people take the bus.', 'Some people take the bus to save money and cut pollution.'],
    ['Video games rot your brain.', 'Some studies link too much screen time to poor sleep.'], ['Winter is the worst season, period.', 'Winter can be hard, but many people love skiing and skating.']];
  function tone(lv) {
    var t = R.pick(TONE);
    return Q.one('You are writing <b>' + t[0] + '</b>. Which sentence has the right tone?', t[1], t[2].slice(0, lv > 1 ? 2 : 1), { prompt: 'Who will read it, and how should they feel?',
      hint: 'The tone should suit the form and the reader.', explain: t[1], meta: { k: 'g6-tone', form: t[0] } });
  }
  function moodMatch() {
    var m = R.some(MOOD, 3);
    return { q: 'Match each sentence to its tone.', type: 'match', pairs: m.map(function (x) { return [x[0], x[1]]; }), hint: 'Read each one aloud in the voice it needs.', explain: 'Word choice and punctuation create tone.', meta: { k: 'g6-mood-match' } };
  }
  function fairer(lv) {
    var f = R.pick(FAIR);
    return Q.one('Which sentence is <b>fairer</b> (less biased)?', f[1], [f[0]].concat(lv > 1 ? [R.pick(FAIR.filter(function (x) { return x !== f; }))[0]] : []), {
      prompt: 'Look for words like everyone, only, worst, period.', hint: 'Fair writing uses facts and does not insult.', explain: f[1], meta: { k: 'g6-fairer' } });
  }
  function otherReader() {
    return Q.one('You wrote: <b>Only lazy people take the bus.</b> How might a bus driver read it?', 'They may feel insulted and stop listening to your ideas.', ['They will agree with you.', 'They will not notice anything.'], {
      hint: 'Picture someone with a different point of view reading it.', explain: 'Readers with other perspectives may feel judged. Fair words keep them reading.', meta: { k: 'g6-other-reader' } });
  }
  function pickBiased() {
    var fs = R.some(FAIR, 4);
    return Q.all('Pick every sentence that is <b>one-sided</b>.', fs.slice(0, 2).map(function (f) { return f[0]; }), fs.slice(2).map(function (f) { return f[1]; }), {
      hint: 'Look for everyone, only, worst, rot.', explain: 'One-sided words judge without facts.', meta: { k: 'g6-pick-biased' } });
  }

  /* ---------- revising and editing ---------- */
  /* [topic sentence and details, the sentence that does not belong] */
  var PARA = [[['Our town needs a public library.', 'Students need a quiet place to study.', 'Seniors could join book clubs there.'], 'My cousin has a red bike.'],
    [['Canoeing is a great summer activity.', 'It builds strong arms and shoulders.', 'You can explore lakes and rivers.'], 'Pizza is my favourite food.'],
    [['Recycling helps our community.', 'It keeps waste out of landfills.', 'It saves materials that can be used again.'], 'Snow fell early this year.']];
  var ORDER = [['Our town needs a public library.', 'For example, students need a quiet place to study.', 'That is why the council should build one.'],
    ['Canoeing is a great summer activity.', 'For example, you can explore lakes and rivers.', 'That is why every family should try it.']];
  /* [sentence with a mistake, the word that is wrong, the fixed sentence, the kind of mistake] */
  var EDIT = [['Their going to the arena after school.', 'Their', 'They' + AP + 're going to the arena after school.', 'spelling'], ['The dog wagged it' + AP + 's tail.', 'it' + AP + 's', 'The dog wagged its tail.', 'spelling'],
    ['Each of the students have a locker.', 'have', 'Each of the students has a locker.', 'grammar'], ['Yesterday we walk to the park.', 'walk', 'Yesterday we walked to the park.', 'grammar'],
    ['We visited ottawa last summer.', 'ottawa', 'We visited Ottawa last summer.', 'capitals']];
  function cutOne(lv) {
    var p = R.pick(PARA), lines = p[0].slice(0, 1).concat(R.shuffle(p[0].slice(1).concat([p[1]])));
    return Q.one('Which sentence should you <b>delete</b> to keep the paragraph focused?', p[1], lines.filter(function (l) { return l !== p[1]; }).slice(1, lv > 1 ? 3 : 2), {
      fig: W.passage('', lines), prompt: 'What is the paragraph about? Which sentence wanders off?', hint: 'Check every sentence against the first one.', explain: 'Delete: <b>' + p[1] + '</b>', meta: { k: 'g6-cut-one', topic: p[0][0] } });
  }
  function addOne() {
    var p = R.pick(PARA), other = R.pick(PARA.filter(function (x) { return x !== p; }));
    return Q.one('Which sentence would you <b>add</b> to this paragraph?', p[0][2], [p[1], other[0][1]], { fig: W.passage('', p[0].slice(0, 2)),
      hint: 'It must fit the topic sentence.', explain: p[0][2], meta: { k: 'g6-add-one', topic: p[0][0] } });
  }
  function paraOrder() {
    var o = R.pick(ORDER);
    return { q: 'Put the sentences in order to make a clear paragraph.', type: 'order', items: o, first: 'First', last: 'Last', hint: 'Topic sentence, example, conclusion.', explain: 'The topic sentence comes first; "That is why" wraps up.', meta: { k: 'g6-para-order' } };
  }
  function findError() {
    var e = R.pick(EDIT), words = e[0].replace(/\.$/, '').split(' ');
    return { q: 'Tap the word with a mistake.', fig: W.sent(e[0]), type: 'tap', tiles: words, answer: words.indexOf(e[1]), prompt: 'Check spelling, grammar and capitals, one at a time.',
      hint: 'Read it aloud slowly. Which word sounds or looks wrong?', explain: W.sent(e[2]), meta: { k: 'g6-find-error', s: e[0] } };
  }
  function fixIt(lv) {
    var e = R.pick(EDIT);
    return Q.one('Which sentence is fixed correctly?', e[2], [e[0]].concat(lv > 1 ? [R.pick(EDIT.filter(function (x) { return x !== e; }))[0]] : []), {
      hint: 'Check each word.', explain: e[2], meta: { k: 'g6-fix-it', s: e[0] } });
  }
  function spellCheck() {
    var catches = R.int(0, 1) === 1, s = catches ? 'We went to the libary.' : 'Their going to the arena.';
    return { q: 'Will a spell-checker catch the mistake?', fig: W.sent(s), type: 'tf', answer: catches,
      why: { options: ['It catches words that are not real words, but not real words in the wrong place.', 'It catches every mistake.'], answer: 0 },
      hint: 'Is the wrong word a real word?', explain: catches ? '"libary" is not a word, so it is flagged.' : '"Their" is a real word, so it may not be flagged. Read it yourself too.', meta: { k: 'g6-spell-check', s: s } };
  }

  Atlas.register('writing', {
    lessons: [{
      id: 'voice', title: 'Voice, tone and fairness', sub: 'Sound like yourself, suit the form, and be fair.',
      concepts: [
        { slug: 'tone', title: 'Match the tone to the form', exp: ['D2.3'], skill: 'voice-tone',
          model: [
            step(W.means('write', 'a news report'), '<b>Heavy rain flooded three streets on Tuesday.</b> Calm and factual.'),
            step(W.means('write', 'a card to a neighbour'), '<b>We are thinking of you.</b> Caring.'),
            step(W.means('write', 'a diary'), 'Your own voice: <b>Best. Day. Ever!</b>')
          ],
          guided: [function () { return tone(1); }, moodMatch],
          check: [function () { return tone(2); }, moodMatch],
          coach: '<p>Read a paragraph of the child’s writing aloud. Ask: "Does this sound like you? Does it suit the reader?"</p>',
          mistake: '<p>Using texting style in formal writing, or stiff formal writing in a diary.</p>' },
        { slug: 'fair', title: 'Check your writing for bias', exp: ['D2.4'], skill: 'voice-tone',
          model: [
            step(W.sent('Only lazy people take the bus.'), 'One-sided. It insults.'),
            step(W.sent('Some people take the bus to save money and cut pollution.'), 'Fair. It gives reasons.'),
            step(W.means('people', 'a bus driver reading it'), 'Think of readers who see it differently.')
          ],
          guided: [function () { return fairer(1); }, otherReader],
          check: [function () { return fairer(2); }, pickBiased],
          coach: '<p>Before publishing an opinion, ask: "Who might disagree? Would they feel respected reading this?"</p>',
          mistake: '<p>Thinking an opinion must be one-sided. Strong opinions can be fair.</p>' }
      ]
    }, {
      id: 'revise-edit', title: 'Revising and editing', sub: 'First make it clear. Then make it correct.',
      concepts: [
        { slug: 'revise', title: 'Add and delete for focus', exp: ['D2.5'], skill: 'revise-edit',
          model: [
            step(W.passage('', ['Our town needs a public library.', 'Students need a quiet place to study.', 'My cousin has a red bike.']), 'Read it again.'),
            step(W.sent('<s>My cousin has a red bike.</s>'), 'Off topic. Delete it.'),
            step(W.sent('Seniors could join book clubs there.'), 'Add a detail that fits.')
          ],
          guided: [function () { return cutOne(1); }, addOne],
          check: [function () { return cutOne(2); }, paraOrder],
          coach: '<p>Ask for feedback from one reader, then let the child choose which suggestions to use. Not every suggestion has to be taken.</p>',
          mistake: '<p>Thinking revising means recopying neatly. Revising changes what it says.</p>' },
        { slug: 'edit', title: 'Edit: one check at a time', exp: ['D2.6'], skill: 'revise-edit',
          model: [
            step(W.sent('<mark class="hl">Their</mark> going to the arena.'), 'A real word in the wrong place.'),
            step(W.sent('<b>They' + AP + 're</b> going to the arena.')),
            step(W.means('screen', 'spell-checker'), 'It misses words like this. Read it yourself too.')
          ],
          guided: [findError, spellCheck],
          check: [findError, function () { return fixIt(2); }],
          coach: '<p>Edit in passes: capitals, then punctuation, then spelling, then grammar. Use the spell-checker last, not first.</p>',
          mistake: '<p>Trusting the spell-checker completely. It misses their, there and they’re.</p>' }
      ]
    }],
    practice: [
      { id: 'voice-tone', name: 'Voice, tone and fairness', code: 'D2.3, D2.4', gen: tone },
      { id: 'revise-edit', name: 'Revising and editing', code: 'D2.5, D2.6', gen: cutOne }
    ],
    tasks: [
      { id: 'draft-narrative', title: 'Draft a narrative', code: 'D2.1', pic: W.icon('write'), say: 'Write a story about a time you kept going when something was hard.', write: true,
        run: ['Plan first: characters, setting, problem, how it gets harder, how it ends.', 'The child drafts at least three paragraphs. Spelling can wait for editing.', 'Another day, draft an information text (a short report) using research notes.'],
        rubric: ['A few sentences, hard to follow.', 'A beginning and an end, little development.', 'A clear story in paragraphs with a problem and an ending.', 'A well-developed story with detail, dialogue and a strong ending.'] },
      { id: 'draft-report', title: 'Draft a report', code: 'D2.1', pic: W.icon('read'), say: 'Write a short report with subheadings, using your research notes.', write: true,
        run: ['Use the notes and outline from the Planning chapter.', 'The child writes an introduction, two or three sections with subheadings, and a conclusion.'],
        rubric: ['Notes copied out, no structure.', 'Some sections, missing an introduction or conclusion.', 'A clear report with subheadings, introduction and conclusion.', 'A clear, well-organized report in the writer’s own words, with sources listed.'] },
      { id: 'cursive-keyboard', title: 'Cursive and keyboarding', code: 'D2.2', pic: W.icon('write'), say: 'Copy a short paragraph in cursive. Then type it.',
        run: ['The child copies a four-sentence paragraph in cursive, then types it.', 'For typing, aim for correct finger positions over speed. Five minutes a day helps.'],
        rubric: ['Letters not yet joined; typing with one finger.', 'Some joined writing; slow typing.', 'Fluent, readable cursive and steady typing.', 'Smooth cursive and confident, accurate typing.'],
        coach: '<p>For a child with fine-motor challenges, focus on readable writing and keyboarding. Talk to the teacher about supports.</p>' },
      { id: 'final-copy', title: 'Make a final copy', code: 'D3.1', pic: W.icon('star'), say: 'Choose your best draft. Make a polished final copy, on paper or on screen.',
        run: ['Choose a revised and edited draft.', 'The child chooses a layout, font, title and images that suit the purpose and audience.'],
        rubric: ['Not finished.', 'Finished, with mistakes or a layout that does not help.', 'A correct final copy with a suitable layout.', 'A polished copy where design choices strengthen the message.'] },
      { id: 'present', title: 'Publish or present it', code: 'D3.2', pic: W.icon('talk'), say: 'Share your writing with a real audience. What did your choices do?',
        run: ['Publish to a real audience: read it to the family, send it to a relative, or record it as a podcast.', 'Ask: "Which choices helped your message come across?"'],
        rubric: ['Shares reluctantly, little reflection.', 'Shares and names one choice.', 'Shares clearly and explains how choices helped.', 'Presents with confidence and analyzes how choices shaped the audience’s response.'] },
      { id: 'writer-reflect', title: 'How I grew as a writer', code: 'D3.3', pic: W.icon('think'), say: 'Compare two pieces you published. What helped most? What will you try next?', write: true,
        run: ['Lay out two published pieces from different times.', 'Ask: "What strategies and tools helped? What is better now? What is your next step?"'],
        rubric: ['Cannot say what helped yet.', 'Names one thing with help.', 'Compares strategies and names a next step.', 'Explains growth with examples and sets specific goals.'] }
    ]
  });

  Q.shapes('writing', {
    'voice-tone': [[1, 'mood', moodMatch], [1, 'fairer', fairer], [1, 'other-reader', otherReader], [2, 'pick-biased', pickBiased]],
    'revise-edit': [[1, 'add', addOne], [1, 'find-error', findError], [1, 'spell-check', spellCheck], [2, 'order', paraOrder]]
  });
})();
