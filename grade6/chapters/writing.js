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

  function others(list, item) { return list.filter(function (x) { return x !== item; }); }
  function tfWhy(right, yes, no) { return { options: [yes, no], answer: right ? 0 : 1 }; }

  /* ---------- tone: [what you are writing, a sentence in the right tone, sentences in the wrong tone] ---------- */
  var TONE = [['a thank-you note to your hockey coach', 'Thank you for believing in me all season.', ['Whatever, thanks I guess.', 'The season had 20 games.']],
    ['a news report about a flood', 'Heavy rain flooded three streets on Tuesday.', ['The streets were totally drowning, it was wild!', 'I hate rain so much.']],
    ['a card to a neighbour whose pet died', 'We are thinking of you, and we are so sorry.', ['Cheer up, it is not a big deal!', 'Here are some facts about pets.']],
    ['a speech asking for a longer recess', 'A longer recess would help us focus and stay healthy.', ['Recess is fine, I guess.', 'Give us more recess or else!']],
    ['an invitation to a class party', 'Please join us in Room 12 on Friday for snacks and games!', ['Party. Friday. Be there or else.', 'Parties have existed for thousands of years.']],
    ['a science lab report', 'The ice melted in 12 minutes on the metal tray.', ['OMG the ice melted SO fast!!', 'I think ice is kind of boring.']],
    ['an apology to a friend', 'I am sorry I forgot your birthday. Can we celebrate this weekend?', ['Sorry, I guess. Whatever.', 'Birthdays happen once a year.']],
    ['a complaint letter to a store', 'The jacket I bought on May 2 has a broken zipper, and I would like a refund.', ['Your jacket is garbage and so is your store!', 'Jackets keep you warm.']],
    ['a welcome sign for new students', 'Welcome! We are so glad you are here.', ['New kids go to the office.', 'Our school has 300 students.']],
    ['a review of a favourite book', 'This book kept me reading late into the night.', ['Books are made of paper.', 'It was okay or whatever.']]];
  /* [a sentence, its tone] */
  var MOOD = [['Heavy rain flooded three streets on Tuesday.', 'calm and factual'], ['I can' + AP + 't believe they cut down the old oak. It was ours.', 'upset'],
    ['Best. Day. Ever!', 'excited'], ['We are thinking of you, and we are so sorry.', 'caring'], ['Thank you so much for driving us to the tournament.', 'grateful'],
    ['This is the third time my bike has been stolen!', 'angry'], ['What if the ice is too thin to cross?', 'worried'], ['I finally finished the whole 5 km run.', 'proud'],
    ['Another rainy day. Nothing to do. Again.', 'bored'], ['Maybe next year our team will make the finals.', 'hopeful']];
  function tone(lv) {
    var t = R.pick(TONE);
    return Q.one('You are writing <b>' + t[0] + '</b>. Which sentence has the right tone?', t[1], t[2].slice(0, lv > 1 ? 2 : 1), { prompt: 'Who will read it, and how should they feel?',
      hint: 'The tone should suit the form and the reader.', explain: t[1], meta: { k: 'g6-tone', form: t[0] } });
  }
  function toneTf() {
    var t = R.pick(TONE), right = R.int(0, 1) === 1, s = right ? t[1] : R.pick(t[2]);
    return { q: Q.name() + ' is writing ' + t[0] + '. Is the tone right?', fig: W.means('write', s), type: 'tf', answer: right, why: tfWhy(right, 'It suits the form and the reader.', 'It is too casual, rude or off topic.'),
      hint: 'How should the reader feel?', explain: t[1], meta: { k: 'g6-tone-tf', form: t[0], s: s } };
  }
  function moodMatch() {
    var m = R.some(MOOD, 3);
    return { q: 'Match each sentence to its tone.', type: 'match', pairs: m.map(function (x) { return [x[0], x[1]]; }), hint: 'Read each one aloud in the voice it needs.', explain: 'Word choice and punctuation create tone.', meta: { k: 'g6-mood-match' } };
  }
  function moodOf(lv) {
    var m = R.pick(MOOD);
    return Q.one('What is the <b>tone</b> of this sentence?', m[1], R.some(others(MOOD, m), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: W.sent(m[0]), hint: 'Read it aloud. How does the writer feel?', explain: 'The tone is <b>' + m[1] + '</b>.', meta: { k: 'g6-mood-of', s: m[0] } });
  }

  /* ---------- fairness: [one-sided, fairer, a reader who sees it differently] ---------- */
  var FAIR = [['Cats are better than dogs, and everyone knows it.', 'Many people prefer cats because they are independent.', 'a dog owner'],
    ['Only lazy people take the bus.', 'Some people take the bus to save money and cut pollution.', 'a bus driver'],
    ['Video games rot your brain.', 'Some studies link too much screen time to poor sleep.', 'a game designer'],
    ['Winter is the worst season, period.', 'Winter can be hard, but many people love skiing and skating.', 'a ski instructor'],
    ['Kids today never read books.', 'Some kids read less on paper but read a lot online.', 'a Grade 6 student who loves books'],
    ['City people know nothing about nature.', 'People in cities can learn about nature in parks and ravines.', 'someone who lives in Toronto'],
    ['Old people cannot use computers.', 'Many older people use computers every day.', 'a grandparent who sends email'],
    ['Soccer is the only real sport.', 'Soccer is the most-played sport in many countries.', 'a hockey player'],
    ['Anyone who likes pineapple on pizza has terrible taste.', 'Some people enjoy pineapple on pizza, and some do not.', 'a pizza cook'],
    ['Homework is a total waste of time.', 'Some homework helps practise skills, but too much can be stressful.', 'a teacher']];
  var READS = ['They may feel judged and stop listening to your ideas.', 'They will agree with you.', 'They will not notice anything.'];
  function fairer(lv) {
    var f = R.pick(FAIR);
    return Q.one('Which sentence is <b>fairer</b> (less biased)?', f[1], [f[0]].concat(lv > 1 ? [R.pick(others(FAIR, f))[0]] : []), {
      prompt: 'Look for words like everyone, only, worst, never.', hint: 'Fair writing uses facts and does not insult.', explain: f[1], meta: { k: 'g6-fairer' } });
  }
  function otherReader() {
    var f = R.pick(FAIR);
    return Q.one('You wrote: <b>' + f[0] + '</b> How might ' + f[2] + ' read it?', READS[0], READS.slice(1), {
      hint: 'Picture someone with a different point of view reading it.', explain: 'Readers with other perspectives may feel judged. Fair words keep them reading.', meta: { k: 'g6-other-reader' } });
  }
  function pickBiased() {
    var fs = R.some(FAIR, 4);
    return Q.all('Pick every sentence that is <b>one-sided</b>.', fs.slice(0, 2).map(function (f) { return f[0]; }), fs.slice(2).map(function (f) { return f[1]; }), {
      hint: 'Look for everyone, only, never, worst.', explain: 'One-sided words judge without facts.', meta: { k: 'g6-pick-biased' } });
  }
  function fairTf() {
    var f = R.pick(FAIR), right = R.int(0, 1) === 1, s = right ? f[1] : f[0];
    return { q: 'Is this sentence fair?', fig: W.sent(s), type: 'tf', answer: right, why: tfWhy(right, 'It gives reasons and does not judge.', 'It judges a whole group without facts.'),
      hint: 'Look for everyone, only, never, worst.', explain: f[1], meta: { k: 'g6-write-fair-tf', s: s } };
  }

  /* ---------- revising: [topic sentence and two details, the sentence that does not belong] ---------- */
  var PARA = [[['Our town needs a public library.', 'Students need a quiet place to study.', 'Seniors could join book clubs there.'], 'My cousin has a red bike.'],
    [['Canoeing is a great summer activity.', 'It builds strong arms and shoulders.', 'You can explore lakes and rivers.'], 'Pizza is my favourite food.'],
    [['Recycling helps our community.', 'It keeps waste out of landfills.', 'It saves materials that can be used again.'], 'Snow fell early this year.'],
    [['Bikes are good for the environment.', 'They do not burn gas.', 'They take up less space on the road.'], 'My sister likes to paint.'],
    [['Beavers are skilled builders.', 'They cut trees with their sharp teeth.', 'Their dams can block whole streams.'], 'The mall closes at nine.'],
    [['Our school garden is growing well.', 'The beans are already climbing the fence.', 'We picked our first tomatoes on Monday.'], 'I watched a movie last night.'],
    [['Learning a second language has benefits.', 'It helps you talk with more people.', 'It can make travel easier.'], 'My shoes are too small.'],
    [['The northern lights are amazing to see.', 'They glow green and purple in the sky.', 'They are easiest to see far from city lights.'], 'Our car needs new tires.'],
    [['Sleep is important for students.', 'It helps you remember what you learned.', 'It gives you energy for the next day.'], 'The cafeteria sells muffins.'],
    [['Volunteering helps our community.', 'Volunteers serve meals at the shelter.', 'They also clean up local parks.'], 'Basketball is played with a ball.']];
  var ORDER = [['Our town needs a public library.', 'For example, students need a quiet place to study.', 'That is why the council should build one.'],
    ['Canoeing is a great summer activity.', 'For example, you can explore lakes and rivers.', 'That is why every family should try it.'],
    ['Bikes are good for the environment.', 'For example, they do not burn gas.', 'That is why our town should build more bike lanes.'],
    ['Sleep is important for students.', 'For example, it helps you remember what you learned.', 'That is why students should go to bed on time.'],
    ['Volunteering helps our community.', 'For example, volunteers serve meals at the shelter.', 'That is why everyone should try volunteering.'],
    ['Beavers are skilled builders.', 'For example, they cut trees with their sharp teeth.', 'That is why beavers are called nature' + AP + 's engineers.']];
  function cutOne(lv) {
    var p = R.pick(PARA), lines = p[0].slice(0, 1).concat(R.shuffle(p[0].slice(1).concat([p[1]])));
    return Q.one('Which sentence should you <b>delete</b> to keep the paragraph focused?', p[1], others(lines, p[1]).slice(1, lv > 1 ? 3 : 2), {
      fig: W.passage('', lines), prompt: 'What is the paragraph about? Which sentence wanders off?', hint: 'Check every sentence against the first one.', explain: 'Delete: <b>' + p[1] + '</b>', meta: { k: 'g6-cut-one', topic: p[0][0] } });
  }
  function addOne() {
    var p = R.pick(PARA), other = R.pick(others(PARA, p));
    return Q.one('Which sentence would you <b>add</b> to this paragraph?', p[0][2], [p[1], other[0][1]], { fig: W.passage('', p[0].slice(0, 2)),
      prompt: 'Which one is about the topic?', hint: 'It must fit the topic sentence.', explain: p[0][2], meta: { k: 'g6-add-one', topic: p[0][0] } });
  }
  function paraOrder() {
    var o = R.pick(ORDER);
    return { q: 'Put the sentences in order to make a clear paragraph.', type: 'order', items: o, first: 'First', last: 'Last', hint: 'Topic sentence, example, conclusion.', explain: 'The topic sentence comes first; "That is why" wraps up.', meta: { k: 'g6-para-order' } };
  }
  function reviseTf() {
    var p = R.pick(PARA), right = R.int(0, 1) === 1, cut = right ? p[1] : R.pick(p[0].slice(1)), lines = p[0].concat([p[1]]);
    return { q: Q.name() + ' deletes <b>' + cut + '</b> Is that a good choice?', fig: W.passage('', lines), type: 'tf', answer: right, why: tfWhy(right, 'It wanders off the topic.', 'It supports the topic.'),
      hint: 'Does it fit the first sentence?', explain: 'Delete: <b>' + p[1] + '</b>', meta: { k: 'g6-revise-tf', cut: cut } };
  }

  /* ---------- editing: [sentence with a mistake, the word that is wrong, the fixed sentence, the kind of mistake] ---------- */
  var EDIT = [['Their going to the arena after school.', 'Their', 'They' + AP + 're going to the arena after school.', 'spelling'], ['The dog wagged it' + AP + 's tail.', 'it' + AP + 's', 'The dog wagged its tail.', 'spelling'],
    ['There dog barked all night.', 'There', 'Their dog barked all night.', 'spelling'],
    ['Each of the students have a locker.', 'have', 'Each of the students has a locker.', 'grammar'], ['Yesterday we walk to the park.', 'walk', 'Yesterday we walked to the park.', 'grammar'],
    ['I could of finished sooner.', 'of', 'I could have finished sooner.', 'grammar'], ['Me and Kai built a fort.', 'Me', 'Kai and I built a fort.', 'grammar'],
    ['She has went to Halifax twice.', 'went', 'She has gone to Halifax twice.', 'grammar'], ['The team played good today.', 'good', 'The team played well today.', 'grammar'],
    ['We visited ottawa last summer.', 'ottawa', 'We visited Ottawa last summer.', 'capitals'], ['My birthday is in june.', 'june', 'My birthday is in June.', 'capitals'],
    ['We met dr. Ahmed at the clinic.', 'dr.', 'We met Dr. Ahmed at the clinic.', 'capitals']];
  var KINDS = ['spelling', 'grammar', 'capitals'];
  /* [sentence, whether a spell-checker flags it] */
  var SPELL = [['We went to the libary.', true], ['I was late becuase of the snow.', true], ['My freind lives in Moncton.', true], ['I will definately come.', true], ['See you tommorow.', true],
    ['Their going to the arena.', false], ['I would like to by a new book.', false], ['The whether is cold today.', false], ['We one the game.', false], ['Can you here the music?', false]];
  function findError() {
    var e = R.pick(EDIT), words = e[0].replace(/\.$/, '').split(' ');
    return { q: 'Tap the word with a mistake.', fig: W.sent(e[0]), type: 'tap', tiles: words, answer: words.indexOf(e[1]), prompt: 'Check spelling, grammar and capitals, one at a time.',
      hint: 'Read it aloud slowly. Which word sounds or looks wrong?', explain: W.sent(e[2]), meta: { k: 'g6-find-error', s: e[0] } };
  }
  function fixIt(lv) {
    var e = R.pick(EDIT);
    return Q.one('Which sentence is fixed correctly?', e[2], [e[0]].concat(lv > 1 ? [R.pick(others(EDIT, e))[0]] : []), {
      fig: W.sent(e[0]), hint: 'Check each word.', explain: e[2], meta: { k: 'g6-fix-it', s: e[0] } });
  }
  function editKind() {
    var e = R.pick(EDIT);
    return { q: 'What kind of mistake is this?', fig: W.sent(e[0].replace(e[1], '<mark class="hl">' + e[1] + '</mark>')), type: 'tap', tiles: KINDS, answer: KINDS.indexOf(e[3]),
      hint: 'Is the word spelled wrong, used wrong, or missing a capital?', explain: W.sent(e[2]), meta: { k: 'g6-edit-kind', s: e[0] } };
  }
  function spellCheck() {
    var s = R.pick(SPELL);
    return { q: 'Will a spell-checker catch the mistake?', fig: W.sent(s[0]), type: 'tf', answer: s[1],
      why: { options: ['It catches words that are not real words, but not real words in the wrong place.', 'It catches every mistake.'], answer: 0 },
      hint: 'Is the wrong word a real word?', explain: s[1] ? 'That word is not a real word, so it is flagged.' : 'The wrong word is a real word, so it may not be flagged. Read it yourself too.', meta: { k: 'g6-spell-check', s: s[0] } };
  }

  Atlas.register('writing', {
    full: true,
    lessons: [{
      id: 'voice', title: 'Voice, tone and fairness', sub: 'Sound like yourself, suit the form, and be fair.',
      concepts: [
        { slug: 'tone', title: 'Match the tone to the form', exp: ['D2.3'], skill: 'tone',
          model: [
            step(W.means('write', 'a news report'), '<b>Heavy rain flooded three streets on Tuesday.</b> Calm and factual.'),
            step(W.means('write', 'a card to a neighbour'), '<b>We are thinking of you.</b> Caring.'),
            step(W.means('write', 'a diary'), 'Your own voice: <b>Best. Day. Ever!</b>'),
            step(W.means('write', 'a complaint to a store'), '<b>I would like a refund.</b> Firm, but polite.')
          ],
          guided: [function () { return tone(1); }, moodMatch, toneTf],
          check: [function () { return tone(2); }, function () { return moodOf(2); }, toneTf, moodMatch, function () { return tone(2); }],
          coach: '<p>Read a paragraph of the child’s writing aloud. Ask: "Does this sound like you? Does it suit the reader?"</p>',
          mistake: '<p>Using texting style in formal writing, or stiff formal writing in a diary.</p>' },
        { slug: 'fair', title: 'Check your writing for bias', exp: ['D2.4'], skill: 'fair',
          model: [
            step(W.sent('Only lazy people take the bus.'), 'One-sided. It insults.'),
            step(W.sent('Some people take the bus to save money and cut pollution.'), 'Fair. It gives reasons.'),
            step(W.means('people', 'a bus driver reading it'), 'Think of readers who see it differently.'),
            step(W.sent('Kids today <mark class="hl">never</mark> read books.'), 'Never, always, everyone, only: warning words.'),
            step(W.sent('Some kids read less on paper but read a lot online.'), 'Fairer, and more exact.')
          ],
          guided: [function () { return fairer(1); }, otherReader, fairTf],
          check: [function () { return fairer(2); }, pickBiased, fairTf, otherReader, function () { return fairer(2); }],
          coach: '<p>Before publishing an opinion, ask: "Who might disagree? Would they feel respected reading this?"</p>',
          mistake: '<p>Thinking an opinion must be one-sided. Strong opinions can be fair.</p>' }
      ]
    }, {
      id: 'revise-edit', title: 'Revising and editing', sub: 'First make it clear. Then make it correct.',
      concepts: [
        { slug: 'revise', title: 'Add and delete for focus', exp: ['D2.5'], skill: 'revise',
          model: [
            step(W.passage('', ['Our town needs a public library.', 'Students need a quiet place to study.', 'My cousin has a red bike.']), 'Read it again.'),
            step(W.sent('<s>My cousin has a red bike.</s>'), 'Off topic. Delete it.'),
            step(W.sent('Seniors could join book clubs there.'), 'Add a detail that fits.'),
            step(W.chain(['the main idea', 'a detail', 'wrap it up'], ['Topic sentence', 'For example', 'That is why']), 'Then check the order.')
          ],
          guided: [function () { return cutOne(1); }, addOne, reviseTf],
          check: [function () { return cutOne(2); }, paraOrder, reviseTf, addOne, function () { return cutOne(2); }],
          coach: '<p>Ask for feedback from one reader, then let the child choose which suggestions to use. Not every suggestion has to be taken.</p>',
          mistake: '<p>Thinking revising means recopying neatly. Revising changes what it says.</p>' },
        { slug: 'edit', title: 'Edit: one check at a time', exp: ['D2.6'], skill: 'edit',
          model: [
            step(W.sent('<mark class="hl">Their</mark> going to the arena.'), 'A real word in the wrong place.'),
            step(W.sent('<b>They' + AP + 're</b> going to the arena.')),
            step(W.means('screen', 'spell-checker'), 'It misses words like this. Read it yourself too.'),
            step(W.sent('Yesterday we <mark class="hl">walk</mark> to the park.'), 'Grammar: yesterday needs the past.'),
            step(W.sent('We visited <mark class="hl">ottawa</mark> last summer.'), 'Capitals: a place name.')
          ],
          guided: [findError, spellCheck, editKind],
          check: [findError, function () { return fixIt(2); }, editKind, spellCheck, findError],
          coach: '<p>Edit in passes: capitals, then punctuation, then spelling, then grammar. Use the spell-checker last, not first.</p>',
          mistake: '<p>Trusting the spell-checker completely. It misses their, there and they’re.</p>' }
      ]
    }],
    practice: [
      { id: 'tone', name: 'Voice and tone', code: 'D2.3', gen: tone },
      { id: 'fair', name: 'Fair writing', code: 'D2.4', gen: fairer },
      { id: 'revise', name: 'Revising', code: 'D2.5', gen: cutOne },
      { id: 'edit', name: 'Editing', code: 'D2.6', gen: fixIt }
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
    tone: [[1, 'match', moodMatch], [1, 'true-false', toneTf], [2, 'mood', moodOf]],
    fair: [[1, 'other-reader', otherReader], [1, 'true-false', fairTf], [2, 'pick', pickBiased]],
    revise: [[1, 'add', addOne], [1, 'true-false', reviseTf], [2, 'order', paraOrder]],
    edit: [[1, 'find-error', findError], [1, 'kind', editKind], [1, 'spell-check', spellCheck]]
  });
})();
