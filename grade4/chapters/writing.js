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
  var TONE = [['a thank-you card to a guest speaker', 'Thank you for teaching us about bees. We learned so much!', 'Bees were okay, I guess.'],
    ['a persuasive letter to the mayor', 'Please build a crosswalk on Elm Street so students can cross safely.', 'Build a crosswalk now, or else!'],
    ['a report on volcanoes', 'Volcanoes form where melted rock rises through the crust.', 'Volcanoes are SO cool, trust me!'],
    ['a get-well card to a friend', 'I miss you at school. Feel better soon!', 'Volcanoes form where melted rock rises.']];
  /* [first person, third person, second person] */
  var POV = [['I opened the creaky door.', 'She opened the creaky door.', 'You opened the creaky door.'], ['My hands shook as I climbed.', 'His hands shook as he climbed.', 'Your hands shook as you climbed.'],
    ['We paddled to the island.', 'They paddled to the island.', 'You paddled to the island.'], ['I scored the last goal.', 'He scored the last goal.', 'You scored the last goal.']];
  /* [a one-sided line, a fairer line] */
  var FAIR = [['Cats are the best pets in the world.', 'Many people like cats because they are quiet and clean.'], ['Everyone hates homework.', 'Some students find homework hard, and others like the practice.'],
    ['Winter is the worst season.', 'Winter is cold, but it brings skating and snow days.'], ['Soccer is the only fun sport.', 'Soccer is fun for many people, and so are other sports.']];
  function toneFor(lv) {
    var t = R.pick(TONE);
    return Q.one('You are writing <b>' + t[0] + '</b>. Which line fits the tone?', t[1], [t[2]].concat(lv > 1 ? [R.pick(TONE.filter(function (x) { return x !== t; }))[1]] : []), {
      prompt: 'Who will read it? Should it be friendly, polite or factual?', hint: 'The tone should fit the form and the reader.', explain: W.sent(t[1]), meta: { k: 'g4-tone', form: t[0] } });
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

  /* ---------- revising ---------- */
  /* a paragraph, and the sentence that does not belong */
  var PARA = [[['Our class planted a garden.', 'We planted beans, corn and squash.', 'My cousin has a red bike.', 'By June, the beans were climbing the corn.'], 'My cousin has a red bike.'],
    [['Snowshoeing is a great winter sport.', 'You can walk on deep snow.', 'Pizza is my favourite food.', 'You can explore quiet trails.'], 'Pizza is my favourite food.'],
    [['Monarchs need our help.', 'Fewer milkweed plants grow today.', 'My dog likes to chase balls.', 'Every garden can help.'], 'My dog likes to chase balls.']];
  /* [a plain sentence, a sentence that adds detail after it, sentences that add nothing] */
  var DETAIL = [['The trail was beautiful.', 'Red and gold leaves covered the path.', ['It was a trail.', 'The trail was beautiful and nice.']],
    ['The storm was scary.', 'Thunder shook the windows, and the lights flickered.', ['It was a storm.', 'The storm was very scary.']],
    ['The festival was fun.', 'We danced to drums and tried warm bannock.', ['It was fun.', 'The festival was really fun.']]];
  /* [sentence with a gap, an exact word, a plain word] */
  var EXACT = [['The ___ sunset turned the lake pink.', 'glowing', 'nice'], ['We ate a ___ stew on the cold night.', 'steaming', 'good'], ['The ___ puppy licked my face.', 'wriggly', 'nice'], ['Grandpa told a ___ story about the old farm.', 'hilarious', 'good']];
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
    ['The dog wagged it' + AP + 's tail.', 'it' + AP + 's', 'its'], ['They was late for the bus.', 'was', 'were'], ['The geese has flown south.', 'has', 'have'], ['Our trip was the bestest day.', 'bestest', 'best']];
  var TOOLS = [['find spelling mistakes', 'spell check'], ['take back a change', 'the undo button'], ['move a sentence', 'cut and paste'], ['find a word you used too often', 'find (Ctrl + F)']];
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

  Atlas.register('writing', {
    lessons: [{
      id: 'voice-pov', title: 'Voice, tone and point of view', sub: 'Sound like you, fit the reader, and be fair.',
      concepts: [
        { slug: 'tone', title: 'Fit your tone to the form', exp: ['D2.3'], skill: 'voice-pov',
          model: [
            step(W.means('write', 'a thank-you card to a guest speaker')),
            step(W.sent('Thank you for teaching us about bees!'), 'Warm and polite.'),
            step(W.means('write', 'a report on volcanoes') + W.sent('Volcanoes form where melted rock rises.'), 'Calm and factual.')
          ],
          guided: [function () { return toneFor(1); }, function () { return toneFor(1); }],
          check: [function () { return toneFor(2); }, function () { return toneFor(2); }],
          coach: '<p>Read a draft aloud and ask: "Does it sound like you? Does it sound right for this reader?"</p>',
          mistake: '<p>Writing a report like a text message. Save "SO cool!!!" for friends.</p>' },
        { slug: 'pov-fair', title: 'Choose a point of view, and be fair', exp: ['D2.4'], skill: 'voice-pov',
          model: [
            step(W.sent('<b>I</b> opened the creaky door.'), 'First person.'),
            step(W.sent('<b>She</b> opened the creaky door.'), 'Third person.'),
            step(W.sent('Cats are the <b>best</b> pets in the world.'), 'One-sided.'),
            step(W.sent('Many people like cats because they are quiet.'), 'Fairer: it gives a reason.')
          ],
          guided: [toThird, fairer],
          check: [povTf, fairer],
          coach: '<p>After a draft, ask: "Whose view is this? Is anyone left out? Did you use words like everyone or best?"</p>',
          mistake: '<p>Switching between I and she in the same story. Pick a point of view and keep it.</p>' }
      ]
    }, {
      id: 'revise-edit', title: 'Revising and editing', sub: 'Make it clear, then make it correct.',
      concepts: [
        { slug: 'revise', title: 'Revise: cut, add and choose exact words', exp: ['D2.5'], skill: 'revise',
          model: [
            step(W.sent('Our class planted a garden. <s>My cousin has a red bike.</s>'), 'Cut what does not belong.'),
            step(W.sent('The trail was beautiful. <b>Red and gold leaves covered the path.</b>'), 'Add a detail.'),
            step(W.sent('The <s>nice</s> <b>glowing</b> sunset'), 'Choose an exact word.')
          ],
          guided: [offTopic, function () { return addDetail(1); }],
          check: [offTopic, exactWord],
          coach: '<p>Revise before you edit. Ask a family member for one thing they liked and one question they had, then make a change.</p>',
          mistake: '<p>Only fixing spelling when revising. Revising is about ideas: is it clear and focused?</p>' },
        { slug: 'edit', title: 'Edit: check every word', exp: ['D2.6'], skill: 'edit',
          model: [
            step(W.sent('We were <mark class="hl">hopeing</mark> for snow.'), 'Spelling.'),
            step(W.sent('Mei has <mark class="hl">went</mark> home.'), 'Grammar: has gone.'),
            step(W.icon('screen'), 'On a computer, spell check helps, but read it yourself too.')
          ],
          guided: [tapError, function () { return fixIt(1); }],
          check: [tapError, tools],
          coach: '<p>Edit in passes: one read for capitals and end marks, one for spelling, one for grammar. Reading aloud catches a lot.</p>',
          mistake: '<p>Trusting spell check for everything. It will not catch "has went" or "it' + AP + 's tail".</p>' }
      ]
    }],
    practice: [
      { id: 'voice-pov', name: 'Voice, tone and point of view', code: 'D2.3, D2.4', gen: toneFor },
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
    'voice-pov': [[1, 'third-person', toThird], [1, 'fairer', fairer], [1, 'pov', povTf]],
    revise: [[1, 'add-detail', addDetail], [1, 'exact-word', exactWord], [1, 'belongs', belongs]],
    edit: [[1, 'fix-it', fixIt], [1, 'tools', tools], [2, 'true-false', editTf]]
  });
})();
