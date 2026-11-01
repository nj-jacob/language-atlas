/* Grade 4: writing and publishing.
   Ontario 2023 Language, Grade 4, D2 Creating Texts and D3 Publishing, Presenting and Reflecting:
   D2.3 a personal voice, varied language and a tone that fits the form      D2.4 point of view, perspectives and bias in their own texts
   D2.5 revising content and style for clarity, focus and coherence          D2.6 editing for spelling, punctuation, grammar and format; using a word processor
   With a grown-up: D2.1 drafting narrative, persuasive and informational texts, D2.2 cursive and touch-typing, D3.1 final texts with
   digital tools, D3.2 publishing and presenting, D3.3 reflecting on what helped.
   All sentences are written for this site. Answer checks: tests/verify/grade4-writing.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* ---------- voice, tone and point of view: [what you are writing, a line that fits, a line that does not] ---------- */
  var TONE = [['a thank-you card to a guest speaker', 'Thank you for teaching us about bees. We learned so much!', 'Bees were okay, I guess.', 'warm and thankful'],
    ['a persuasive letter to the mayor', 'Please build a crosswalk on Elm Street so students can cross safely.', 'Build a crosswalk now, or else!', 'polite and convincing'],
    ['a report on volcanoes', 'Volcanoes form where melted rock rises through the crust.', 'Volcanoes are SO cool, trust me!', 'calm and factual'],
    ['a get-well card to a friend', 'I miss you at school. Feel better soon!', 'Volcanoes form where melted rock rises.', 'kind and caring'],
    ['a thank-you note to Grandma for a sweater', 'Thank you for the cozy sweater, Grandma. I wear it every day!', 'The sweater arrived.', 'warm and thankful'],
    ['a persuasive letter to the principal', 'Please give us more library time, because reading helps us learn.', 'Give us more library time. You have to.', 'polite and convincing'],
    ['a report on loons', 'Loons dive under water to catch small fish.', 'Loons are the coolest birds EVER!!!', 'calm and factual'],
    ['a card for a friend who is moving away', 'I will miss you so much. Please write to me!', 'Moving happens.', 'kind and caring'],
    ['instructions for making bannock', 'First, mix the flour, baking powder and salt.', 'Just throw some stuff in a bowl, whatever.', 'clear and step by step'],
    ['instructions for planting a seed', 'Next, push the seed 2 cm into the soil.', 'Do the seed thing, you know how.', 'clear and step by step']];
  var TONES = ['warm and thankful', 'polite and convincing', 'calm and factual', 'kind and caring', 'clear and step by step'];
  /* [first person, third person, second person] */
  var POV = [['I opened the creaky door.', 'She opened the creaky door.', 'You opened the creaky door.'], ['My hands shook as I climbed.', 'His hands shook as he climbed.', 'Your hands shook as you climbed.'],
    ['We paddled to the island.', 'They paddled to the island.', 'You paddled to the island.'], ['I scored the last goal.', 'He scored the last goal.', 'You scored the last goal.'],
    ['I tripped on the dock.', 'She tripped on the dock.', 'You tripped on the dock.'], ['My dog ran to me.', 'Her dog ran to her.', 'Your dog ran to you.'],
    ['We built a snow fort.', 'They built a snow fort.', 'You built a snow fort.'], ['I heard a loon call.', 'He heard a loon call.', 'You heard a loon call.']];
  /* [a one-sided line, a fairer line] */
  var FAIR = [['Cats are the best pets in the world.', 'Many people like cats because they are quiet and clean.'], ['Everyone hates homework.', 'Some students find homework hard, and others like the practice.'],
    ['Winter is the worst season.', 'Winter is cold, but it brings skating and snow days.'], ['Soccer is the only fun sport.', 'Soccer is fun for many people, and so are other sports.'],
    ['Nobody likes broccoli.', 'Some people like broccoli, and some do not.'], ['Dogs are always better than cats.', 'Dogs and cats each make good pets for different families.'],
    ['Summer camp is the best thing ever.', 'Summer camp can be fun, though some kids prefer staying home.'], ['Reading on a screen is the worst.', 'Some people like paper books, and others like screens.']];
  function toneFor(lv) {
    var t = R.pick(TONE);
    return Q.one('You are writing <b>' + t[0] + '</b>. Which line fits the tone?', t[1], [t[2]].concat(lv > 1 ? [R.pick(TONE.filter(function (x) { return x[3] !== t[3]; }))[1]] : []), {
      prompt: 'Who will read it? Should it be friendly, polite or factual?', hint: 'The tone should fit the form and the reader.', explain: W.sent(t[1]), meta: { k: 'g4-tone', form: t[0] } });
  }
  function toneTf() {
    var t = R.pick(TONE), right = R.int(0, 1) === 1, line = right ? t[1] : t[2];
    return { q: 'True or false? This line fits the tone.', fig: W.means('write', t[0]) + W.sent(line), type: 'tf', answer: right,
      why: { options: ['It fits the form and the reader.', 'It does not fit the form or the reader.'], answer: right ? 0 : 1 }, hint: 'Who will read it?', explain: W.sent(t[1]), meta: { k: 'g4-tone-tf', form: t[0], line: line } };
  }
  function toneKind() {
    var t = R.pick(TONE);
    return Q.tiles('You are writing <b>' + t[0] + '</b>. Which tone fits?', t[3], R.some(TONES.filter(function (x) { return x !== t[3]; }), 2), {
      hint: 'Think of the reader, and why you are writing.', explain: '<b>' + t[3] + '</b>.', meta: { k: 'g4-tone-kind', form: t[0] } });
  }
  function toneMatch() {
    var ts = R.some(TONES, 3).map(function (k) { return R.pick(TONE.filter(function (x) { return x[3] === k; })); });
    return { q: 'Match each piece of writing to its tone.', type: 'match', pairs: ts.map(function (t) { return [t[0], t[3]]; }), hint: 'Who reads it, and why?', explain: 'The tone fits the form and the reader.', meta: { k: 'g4-tone-match' } };
  }
  function toThird() {
    var p = R.pick(POV);
    return Q.one('Change it to the <b>third person</b>.', p[1], [p[0], p[2]], { fig: W.sent(p[0]),
      hint: 'Third person uses he, she or they.', explain: W.sent(p[1]), meta: { k: 'g4-to-third', s: p[0] } });
  }
  function fairer() {
    var f = R.pick(FAIR);
    return Q.one('Your draft says this. Which change makes it <b>fairer</b>?', f[1], [f[0].replace('.', '!'), R.pick(FAIR.filter(function (x) { return x !== f; }))[0]], { fig: W.sent(f[0]),
      hint: 'Fair writing shows more than one side and avoids words like best, worst, everyone and only.', explain: W.sent(f[1]), meta: { k: 'g4-fairer', s: f[0] } });
  }
  function povTf() {
    var p = R.pick(POV), first = R.int(0, 1) === 1, s = first ? p[0] : p[1];
    return { q: 'Is this written in the <b>first person</b>?', fig: W.sent(s), type: 'tf', answer: first,
      why: { options: ['It uses I, my or we.', 'It uses he, she or they.'], answer: first ? 0 : 1 }, hint: 'Look for I, my or we.', explain: first ? 'I, my, we: first person.' : 'He, she, they: third person.', meta: { k: 'g4-pov-tf', s: s } };
  }

  function fairTf() {
    var f = R.pick(FAIR), fair = R.int(0, 1) === 1, s = fair ? f[1] : f[0];
    return { q: 'True or false? This sentence is fair.', fig: W.sent(s), type: 'tf', answer: fair,
      why: { options: ['It shows more than one side.', 'It uses words like best, worst, always or nobody.'], answer: fair ? 0 : 1 }, hint: 'Look for best, worst, everyone, nobody, always.', explain: W.sent(f[1]), meta: { k: 'g4-fair-tf', s: s } };
  }
  function povWhich() {
    var p = R.pick(POV), i = R.int(0, 2), names = ['first person', 'third person', 'second person'];
    return { q: 'Which point of view is this?', fig: W.sent(p[i]), type: 'tap', tiles: ['first person', 'second person', 'third person'], answer: ['first person', 'second person', 'third person'].indexOf(names[i]),
      hint: 'I or we: first. You: second. He, she or they: third.', explain: '<b>' + names[i] + '</b>.', meta: { k: 'g4-pov-which', s: p[i] } };
  }

  /* ---------- revising ---------- */
  /* a paragraph, and the sentence that does not belong */
  var PARA = [[['Our class planted a garden.', 'We planted beans, corn and squash.', 'My cousin has a red bike.', 'By June, the beans were climbing the corn.'], 'My cousin has a red bike.'],
    [['Snowshoeing is a great winter sport.', 'You can walk on deep snow.', 'Pizza is my favourite food.', 'You can explore quiet trails.'], 'Pizza is my favourite food.'],
    [['Monarchs need our help.', 'Fewer milkweed plants grow today.', 'My dog likes to chase balls.', 'Every garden can help.'], 'My dog likes to chase balls.'],
    [['Lacrosse is a fast game.', 'Players run up and down the field.', 'The ball can fly very quickly.', 'My aunt bakes bread.'], 'My aunt bakes bread.'],
    [['Our town has a farmers market.', 'Farmers sell fresh corn and berries.', 'Robots can build cars.', 'Families come every Saturday.'], 'Robots can build cars.'],
    [['Loons are amazing divers.', 'I lost my mitt at recess.', 'They can stay under water for a minute.', 'They chase fish deep in the lake.'], 'I lost my mitt at recess.'],
    [['Recycling helps our planet.', 'Old paper can become new paper.', 'Cans can be melted and used again.', 'My favourite colour is green.'], 'My favourite colour is green.'],
    [['Camping teaches you new skills.', 'You learn to put up a tent.', 'Hockey games are on Saturday.', 'You learn to cook over a fire.'], 'Hockey games are on Saturday.']];
  /* [a plain sentence, a sentence that adds detail after it, sentences that add nothing] */
  var DETAIL = [['The trail was beautiful.', 'Red and gold leaves covered the path.', ['It was a trail.', 'The trail was beautiful and nice.']],
    ['The storm was scary.', 'Thunder shook the windows, and the lights flickered.', ['It was a storm.', 'The storm was very scary.']],
    ['The festival was fun.', 'We danced to drums and tried warm bannock.', ['It was fun.', 'The festival was really fun.']],
    ['The kitchen smelled good.', 'Fresh bread and cinnamon filled the air.', ['It was a kitchen.', 'The kitchen smelled really good.']],
    ['The lake was calm.', 'Not one ripple moved across the water.', ['It was a lake.', 'The lake was very calm.']],
    ['The game was exciting.', 'The score was tied with ten seconds left.', ['It was a game.', 'The game was so exciting.']]];
  /* [sentence with a gap, an exact word, a plain word] */
  var EXACT = [['The ___ sunset turned the lake pink.', 'glowing', 'nice'], ['We ate a ___ stew on the cold night.', 'steaming', 'good'], ['The ___ puppy licked my face.', 'wriggly', 'nice'], ['Grandpa told a ___ story about the old farm.', 'hilarious', 'good'],
    ['The ___ wind rattled the windows.', 'howling', 'big'], ['A ___ moose stood in the river.', 'towering', 'big'], ['We heard a ___ crash in the kitchen.', 'thunderous', 'loud'], ['The ___ kitten slept in a basket.', 'fluffy', 'cute']];
  function offTopic() {
    var p = R.pick(PARA);
    return { q: 'Revise for focus. Tap the sentence that does not belong.', type: 'tap', tiles: p[0], answer: p[0].indexOf(p[1]),
      prompt: 'What is the paragraph about?', hint: 'Every sentence should tell about the first one.', explain: 'Delete it: it is about something else.', meta: { k: 'g4-off-topic' } };
  }
  function addDetail(lv) {
    var d = R.pick(DETAIL);
    return Q.one('Which sentence adds the best detail after this one?', d[1], d[2].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(d[0]), hint: 'Which one helps the reader see or hear it?', explain: W.sent(d[0] + ' ' + d[1]), meta: { k: 'g4-add-detail', s: d[0] } });
  }
  function belongs() {
    var p = R.pick(PARA), others = p[0].slice(1).filter(function (x) { return x !== p[1]; }), fits = R.int(0, 1) === 1, s = fits ? R.pick(others) : p[1];
    return { q: 'Does this sentence belong in the paragraph?', fig: W.sent('<b>' + p[0][0] + '</b> ' + s), type: 'tf', answer: fits,
      hint: 'Does it tell about the first sentence?', explain: fits ? 'It tells about the topic.' : 'It is about something else. Cut it.', meta: { k: 'g4-belongs', s: s } };
  }
  function exactWord() {
    var e = R.pick(EXACT);
    return Q.tiles('Which word is more exact?', e[1], [e[2]], { fig: W.sent(e[0].replace('___', W.gap())), hint: 'Which one paints a picture?', explain: W.sent(e[0].replace('___', '<b>' + e[1] + '</b>')), meta: { k: 'g4-exact-word', s: e[0] } });
  }

  /* ---------- editing: [sentence with one mistake, the mistake, the fix] ---------- */
  var EDIT = [['We were hopeing for snow.', 'hopeing', 'hoping'], ['The boxs were heavy.', 'boxs', 'boxes'], ['Mei has went home.', 'went', 'gone'], ['We waved the canadian flag.', 'canadian', 'Canadian'],
    ['The dog wagged it' + AP + 's tail.', 'it' + AP + 's', 'its'], ['They was late for the bus.', 'was', 'were'], ['The geese has flown south.', 'has', 'have'], ['Our trip was the bestest day.', 'bestest', 'best'],
    ['I live in ottawa.', 'ottawa', 'Ottawa'], ['We cryed at the end.', 'cryed', 'cried'], ['Leila and me went skating.', 'me', 'I'], ['The cityes were big.', 'cityes', 'cities']];
  var KINDS = { hopeing: 'spelling', boxs: 'spelling', went: 'grammar', canadian: 'capital letter', was: 'grammar', has: 'grammar', bestest: 'grammar',
    ottawa: 'capital letter', cryed: 'spelling', me: 'grammar', cityes: 'spelling' };
  KINDS['it' + AP + 's'] = 'spelling';
  var TOOLS = [['find spelling mistakes', 'spell check'], ['take back a change', 'the undo button'], ['move a sentence', 'cut and paste'], ['find a word you used too often', 'find (Ctrl + F)'],
    ['see how many words you wrote', 'word count'], ['find a better word', 'the thesaurus']];
  function fixOf(e) { return e[0].replace(e[1], e[2]); }
  function tapError() {
    var e = R.pick(EDIT), words = e[0].replace('.', '').split(' ');
    return { q: 'Edit it. Tap the word with a mistake.', fig: W.sent(e[0]), type: 'tap', tiles: words, answer: words.indexOf(e[1]),
      hint: 'Check spelling, capitals and grammar, one word at a time.', explain: W.sent(fixOf(e)), meta: { k: 'g4-tap-error', s: e[0] } };
  }
  function fixIt(lv) {
    var e = R.pick(EDIT);
    return Q.one('Which is the edited sentence?', fixOf(e), [e[0]].concat(lv > 1 ? [e[0].replace(/\.$/, '')] : []), { prompt: 'Read it aloud, slowly.', hint: 'Find the mistake first.', explain: W.sent(fixOf(e)), meta: { k: 'g4-fix-it', s: e[0] } });
  }
  function tools() {
    var ts = R.some(TOOLS, 3);
    return { q: 'Match each job to the word processor tool that does it.', type: 'match', pairs: ts.map(function (t) { return [t[0], t[1]]; }), hint: 'Think of the buttons you use when typing.', explain: 'A word processor helps you edit.', meta: { k: 'g4-tools' } };
  }
  function editTf() {
    var e = R.pick(EDIT), right = R.int(0, 1) === 1, s = right ? fixOf(e) : e[0];
    return { q: 'Is this sentence ready to publish?', fig: W.sent(s), type: 'tf', answer: right, hint: 'Check every word.', explain: W.sent(fixOf(e)), meta: { k: 'g4-edit-tf', s: s } };
  }

  function editKind() {
    var e = R.pick(EDIT);
    return { q: 'What kind of mistake is <b>' + e[1] + '</b>?', fig: W.sent(e[0].replace(e[1], '<mark class="hl">' + e[1] + '</mark>')), type: 'tap', tiles: ['spelling', 'capital letter', 'grammar'],
      answer: ['spelling', 'capital letter', 'grammar'].indexOf(KINDS[e[1]]), hint: 'Is the word spelled wrong, missing a capital, or the wrong word?', explain: W.sent(fixOf(e)), meta: { k: 'g4-edit-kind', w: e[1] } };
  }

  Atlas.register('writing', {
    full: true,
    lessons: [{
      id: 'voice-pov', title: 'Voice, tone and point of view', sub: 'Sound like you, fit the reader, and be fair.',
      concepts: [
        { slug: 'tone', title: 'Fit your tone to the form', exp: ['D2.3'], skill: 'tone',
          model: [
            step(W.means('write', 'a thank-you card to a guest speaker'), 'Who reads it? A guest.'),
            step(W.sent('Thank you for teaching us about bees!'), 'Warm and thankful.'),
            step(W.sent('<s>Bees were okay, I guess.</s>'), 'That sounds rude.'),
            step(W.means('write', 'a report on volcanoes'), 'Who reads it? Anyone learning.'),
            step(W.sent('Volcanoes form where melted rock rises.'), 'Calm and factual.'),
            step(W.sent('<s>Volcanoes are SO cool, trust me!</s>'), 'Too chatty for a report.')
          ],
          guided: [function () { return toneFor(1); }, toneKind, toneTf],
          check: [function () { return toneFor(2); }, toneKind, toneTf, toneMatch, function () { return toneFor(2); }],
          coach: '<p>Read a draft aloud and ask: "Does it sound like you? Does it sound right for this reader?"</p>',
          mistake: '<p>Writing a report like a text message. Save "SO cool!!!" for friends.</p>' },
        { slug: 'pov-fair', title: 'Choose a point of view, and be fair', exp: ['D2.4'], skill: 'pov',
          model: [
            step(W.sent('<b>I</b> opened the creaky door.'), 'First person: I or we.'),
            step(W.sent('<b>She</b> opened the creaky door.'), 'Third person: he, she or they.'),
            step(W.icon('think'), 'Pick one and keep it.'),
            step(W.sent('Cats are the <b>best</b> pets in the world.'), 'One-sided.'),
            step(W.sent('Many people like cats because they are quiet.'), 'Fairer: it gives a reason.')
          ],
          guided: [toThird, povWhich, fairer],
          check: [toThird, povTf, fairer, fairTf, povWhich],
          coach: '<p>After a draft, ask: "Whose view is this? Is anyone left out? Did you use words like everyone or best?"</p>',
          mistake: '<p>Switching between I and she in the same story. Pick a point of view and keep it.</p>' }
      ]
    }, {
      id: 'revise-edit', title: 'Revising and editing', sub: 'Make it clear, then make it correct.',
      concepts: [
        { slug: 'revise', title: 'Revise: cut, add and choose exact words', exp: ['D2.5'], skill: 'revise',
          model: [
            step(W.sent('Our class planted a garden. We planted beans. My cousin has a red bike.'), 'Read it. Does every sentence fit?'),
            step(W.sent('Our class planted a garden. We planted beans. <s>My cousin has a red bike.</s>'), 'Cut what does not belong.'),
            step(W.sent('The trail was beautiful.'), 'Can the reader see it?'),
            step(W.sent('The trail was beautiful. <b>Red and gold leaves covered the path.</b>'), 'Add a detail.'),
            step(W.sent('The <s>nice</s> <b>glowing</b> sunset'), 'Choose an exact word.')
          ],
          guided: [offTopic, function () { return addDetail(1); }, exactWord],
          check: [offTopic, function () { return addDetail(2); }, belongs, exactWord, offTopic],
          coach: '<p>Revise before you edit. Ask a family member for one thing they liked and one question they had, then make a change.</p>',
          mistake: '<p>Only fixing spelling when revising. Revising is about ideas: is it clear and focused?</p>' },
        { slug: 'edit', title: 'Edit: check every word', exp: ['D2.6'], skill: 'edit',
          model: [
            step(W.sent('We were <mark class="hl">hopeing</mark> for snow.'), 'Spelling: hoping.'),
            step(W.sent('Mei has <mark class="hl">went</mark> home.'), 'Grammar: has gone.'),
            step(W.sent('I live in <mark class="hl">ottawa</mark>.'), 'A capital: Ottawa.'),
            step(W.means('read', 'Read it aloud, slowly. One pass for each kind.')),
            step(W.icon('screen'), 'On a computer, spell check helps, but read it yourself too.')
          ],
          guided: [tapError, editKind, function () { return fixIt(1); }],
          check: [tapError, function () { return fixIt(2); }, editTf, editKind, tools],
          coach: '<p>Edit in passes: one read for capitals and end marks, one for spelling, one for grammar. Reading aloud catches a lot.</p>',
          mistake: '<p>Trusting spell check for everything. It will not catch "has went" or "it' + AP + 's tail".</p>' }
      ]
    }],
    practice: [
      { id: 'tone', name: 'Voice and tone', code: 'D2.3', gen: toneFor },
      { id: 'pov', name: 'Point of view and fairness', code: 'D2.4', gen: toThird },
      { id: 'revise', name: 'Revising', code: 'D2.5', gen: offTopic },
      { id: 'edit', name: 'Editing', code: 'D2.6', gen: tapError }
    ],
    tasks: [
      { id: 'draft-story', title: 'Draft a narrative', code: 'D2.1', pic: W.icon('write'), say: 'Write a story about a time something did not go as planned.', write: true,
        run: ['Plan with a story map first (character, problem, events, solution).', 'The child drafts the story by hand or on a computer. Do not fix spelling yet; focus on ideas.'],
        rubric: ['A few sentences, hard to follow.', 'A beginning and some events.', 'A clear beginning, problem, events and ending.', 'A well-told story with details, feelings and a satisfying ending.'] },
      { id: 'draft-persuade', title: 'Draft a persuasive letter', code: 'D2.1', pic: W.icon('write'), say: 'Write a letter to convince someone to make a change. Give three reasons.', write: true,
        run: ['Choose a real audience: a principal, a librarian, a council member.', 'The child states what they want, gives three reasons with facts, and ends politely.'],
        rubric: ['An opinion with no reasons.', 'An opinion with one or two reasons.', 'A clear opinion, three reasons, and a polite closing.', 'Convincing reasons with facts, aware of the other side, and a strong closing.'] },
      { id: 'draft-inform', title: 'Draft an information text', code: 'D2.1', pic: W.icon('write'), say: 'Write about an animal or place in three parts, with a heading for each.', write: true,
        run: ['Use research notes from the planning chapter.', 'The child writes three short sections with headings, each with facts in their own words.'],
        rubric: ['A few facts, not grouped.', 'Facts in some order.', 'Three clear sections with headings and facts in own words.', 'Well-organized sections, interesting facts, and a short conclusion.'] },
      { id: 'cursive-typing', title: 'Cursive and touch-typing', code: 'D2.2', pic: W.icon('write'), say: 'Write three sentences in cursive. Then type them with your fingers on the home row.',
        run: ['Cursive: practise joined letters for 10 minutes, checking shape, size and slant. Copy three sentences neatly.', 'Typing: fingers on the home row (a s d f, j k l ;). Type the same sentences without looking at the keys.'],
        rubric: ['Letters are hard to read; typing with one finger.', 'Mostly readable cursive; typing with a few fingers.', 'Neat, even cursive; starting to type with the home row.', 'Fluent, even cursive; types steadily without looking.'] },
      { id: 'final-copy', title: 'Make a final copy with digital tools', code: 'D3.1', pic: W.icon('screen'), say: 'Type your best draft. Add a title, a heading and one picture or diagram.',
        run: ['Choose the best draft. The child types it in a word processor or slide tool.', 'Add a title, headings, and a picture or diagram that adds meaning. Check the layout is easy to read.'],
        rubric: ['Not finished yet.', 'Typed, with little design.', 'Typed and edited, with a title, headings and a picture that fits.', 'A polished final copy where the design helps the reader.'] },
      { id: 'publish', title: 'Publish and present', code: 'D3.2', pic: W.icon('talk'), say: 'Share your writing with an audience. Then explain why you chose that way to share it.',
        run: ['Help the child choose how to share: read aloud to family, send an email, post on a class page, or make a slide show.', 'Ask: "Why did you choose this way? How did it help your message?"'],
        rubric: ['Not shared yet.', 'Shared with help; cannot explain the choice.', 'Shared clearly and explains why the medium fit.', 'Shared with confidence and explains how the medium and tools helped the message.'] },
      { id: 'writer-reflect', title: 'How I grew as a writer', code: 'D3.3', pic: W.icon('star'), say: 'What helped you share your message? How have you grown as a writer?',
        run: ['Look back at an early draft and the final copy together.', 'Ask: "What changed? Which strategy helped most? What is your next goal?"'],
        rubric: ['Cannot name a change yet.', 'Names a change with help.', 'Names strategies that helped and how they grew.', 'Explains growth with examples, and sets a clear next goal.'] }
    ]
  });

  Q.shapes('writing', {
    tone: [[1, 'kind', toneKind], [1, 'true-false', toneTf], [2, 'match', toneMatch], [2, 'line', toneFor]],
    pov: [[1, 'which', povWhich], [1, 'pov', povTf], [1, 'fairer', fairer], [2, 'fair-tf', fairTf]],
    revise: [[1, 'add-detail', addDetail], [1, 'exact-word', exactWord], [1, 'belongs', belongs], [2, 'focus', offTopic]],
    edit: [[1, 'fix-it', fixIt], [1, 'kind', editKind], [1, 'tools', tools], [2, 'true-false', editTf]]
  });
})();
