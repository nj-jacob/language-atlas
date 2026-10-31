/* Grade 1: writing and sharing.
   Ontario 2023 Language, Grade 1, D2 Creating Texts and D3 Publishing, Presenting, and Reflecting:
   D2.1 draft short, simple texts: personal narratives, persuasive texts and procedural texts (with a grown-up)
   D2.2 print letters and words with appropriate formation, size, placement and spacing
   D2.3 personal voice: words that express their thoughts, feelings and opinions     D2.4 the point of view, including first person
   D2.5 simple edits to capitalization, punctuation and spelling
   D3.1 final texts (with a grown-up)   D3.2 presenting, including reading aloud with expression   D3.3 a strategy that helped when presenting
   Writing is never auto-marked: drafts are activities the grown-up marks with a rubric. All examples are written for this site.
   Answer checks: tests/verify/grade1-writing.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var SENTS = ['I like my cat.', 'We can run fast.', 'The sun is hot.', 'Mom has a red hat.', 'My dog can sit.', 'I see a big bus.', 'We play in the snow.'];
  /* sentences that share a thought, feeling or opinion, and plain ones */
  var VOICE = ['I love the smell of rain.', 'I think dogs are the best pets.', 'I felt so proud when I learned to swim.', 'Skating is my favourite thing to do.', 'I was nervous on my first day.'];
  var FLAT = ['It rained.', 'There is a dog.', 'We went to the pool.', 'The rink is open.', 'School starts at nine.'];
  /* [first person, the same thing in third person] */
  var POV = [['I rode my bike.', 'She rode her bike.'], ['We baked bread.', 'They baked bread.'], ['I lost my mitten.', 'He lost his mitten.'], ['My cat sleeps on my bed.', 'Her cat sleeps on her bed.']];
  /* a sentence with one mistake, and its fix: [shown, fixed, the wrong word, the kind of mistake] */
  var EDITS = [['the dog ran home.', 'The dog ran home.', 'the', 'capital'], ['We went to the park', 'We went to the park.', 'park', 'mark'], ['I sed hello.', 'I said hello.', 'sed', 'spelling'],
    ['my mom is a nurse.', 'My mom is a nurse.', 'my', 'capital'], ['Can we go now.', 'Can we go now?', 'now.', 'mark'], ['The cat wuz hungry.', 'The cat was hungry.', 'wuz', 'spelling'],
    ['Sam and i played.', 'Sam and I played.', 'i', 'capital'], ['They hav a boat.', 'They have a boat.', 'hav', 'spelling'], ['I like snow', 'I like snow.', 'snow', 'mark']];
  var KINDLINE = { capital: 'It needs a capital letter.', mark: 'It needs the right end mark.', spelling: 'A word is spelled wrong.' };

  function squash(s) { var w = s.split(' '), i = R.int(0, w.length - 2); return w.slice(0, i).concat([w[i] + w[i + 1]]).concat(w.slice(i + 2)).join(' '); }
  function stretch(s) { return s.split(' ').map(function (w, i) { return i === 1 ? w.split('').join(' ') : w; }).join('  '); }

  /* ---------- question makers: printing, voice and point of view ---------- */
  function spacing(lv) {
    var s = R.pick(SENTS);
    return Q.one('Which sentence has a <b>space</b> between each word?', s, [squash(s)].concat(lv > 1 ? [stretch(s)] : []), { prompt: 'Look for a finger space between words.',
      hint: 'One space between words. No space inside a word.', explain: W.sent(s), meta: { k: 'g1-spacing', s: s } });
  }
  function feeling(lv) {
    return Q.one('Which sentence shares a <b>thought or feeling</b>?', R.pick(VOICE), R.some(FLAT, lv > 1 ? 2 : 1), { prompt: 'Which one tells what the writer thinks or feels?',
      hint: 'Look for words like love, think, felt, favourite.', explain: 'Sharing what you think and feel gives your writing your own voice.', meta: { k: 'g1-voice' } });
  }
  function pickVoice() {
    return Q.all('Pick every sentence that shares a <b>thought or feeling</b>.', R.some(VOICE, 2), R.some(FLAT, 2), { hint: 'Which ones tell what the writer thinks or feels?', explain: 'Those show the writer' + '’' + 's voice.', meta: { k: 'g1-pick-voice' } });
  }
  function firstPerson(lv) {
    var p = R.pick(POV), other = R.pick(POV.filter(function (x) { return x !== p; }));
    return Q.one('Which sentence is about <b>me</b> (first person)?', p[0], [p[1]].concat(lv > 1 ? [other[1]] : []), { prompt: 'Look for I, me, my or we.',
      hint: 'First person uses I, my and we.', explain: W.sent(p[0]) + ' uses ' + (/^We/.test(p[0]) ? 'we' : 'I or my') + '.', meta: { k: 'g1-first-person' } });
  }

  /* ---------- question makers: editing ---------- */
  function fixIt(lv) {
    var e = R.pick(EDITS), other = R.pick(EDITS.filter(function (x) { return x !== e; }));
    return Q.one('Which is the <b>fixed</b> sentence?', e[1], [e[0]].concat(lv > 1 ? [e[1].replace(/[.?]$/, '')] : []).filter(function (x) { return x !== e[1]; }), { fig: W.sent(e[0]),
      prompt: 'Check the capital, the end mark, and the spelling.', hint: 'Capital at the start. A mark at the end. Words spelled right.', explain: W.sent(e[1]), meta: { k: 'g1-fix-it', shown: e[0] } });
  }
  function tapMistake() {
    var e = R.pick(EDITS), t = e[0].split(' ');
    return { q: 'Tap the word with the mistake.', type: 'tap', tiles: t, answer: t.indexOf(e[2]), fig: W.sent(e[0]), prompt: 'Read it slowly. Check each word.',
      hint: 'Check the first word, the last word and the spelling.', explain: W.sent(e[1]), meta: { k: 'g1-tap-mistake', shown: e[0] } };
  }
  function whatWrong() {
    var e = R.pick(EDITS);
    return Q.one('What needs fixing?', KINDLINE[e[3]], Object.keys(KINDLINE).filter(function (k) { return k !== e[3]; }).map(function (k) { return KINDLINE[k]; }), { fig: W.sent(e[0]),
      hint: 'Capital? End mark? Spelling?', explain: W.sent(e[1]), meta: { k: 'g1-what-wrong', shown: e[0] } });
  }
  function editTf() {
    var e = R.pick(EDITS), right = R.int(0, 1) === 1, shown = right ? e[1] : e[0];
    return { q: Q.name() + ' checked this sentence. Is it written right?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['It has a capital, an end mark, and words spelled right.', KINDLINE[e[3]]], answer: right ? 0 : 1 },
      hint: 'Capital, end mark, spelling.', explain: W.sent(e[1]), meta: { k: 'g1-edit-tf', shown: shown } };
  }

  Atlas.register('writing', {
    lessons: [{
      id: 'write', title: 'Writing your ideas', sub: 'Neat spaces, your own voice, and writing about you.',
      concepts: [
        { slug: 'spaces', title: 'A space between words', exp: ['D2.2'], skill: 'craft',
          model: [
            step(W.sent('Ilikemycat.'), 'Hard to read.'),
            step(W.sent('I like my cat.'), 'A finger space between words.'),
            step(W.icon('write'), 'Letters sit on the line. Tall letters reach up.')
          ],
          guided: [function () { return spacing(1); }, function () { return spacing(1); }],
          check: [function () { return spacing(2); }, function () { return spacing(2); }],
          coach: '<p>Use a finger (or a craft stick) as a spacer between words. Use lined paper with a dotted middle line so the child sees where small and tall letters go.</p>',
          mistake: '<p>Words running together, or spaces inside a word. Read the sentence aloud while pointing to each word.</p>' },
        { slug: 'voice', title: 'Say what you think and feel', exp: ['D2.3'], skill: 'craft',
          model: [
            step(W.sent('It rained.'), 'Just a fact.'),
            step(W.sent('I <b>love</b> the smell of rain.'), 'Now I hear the writer.')
          ],
          guided: [function () { return feeling(1); }, pickVoice],
          check: [function () { return feeling(2); }, pickVoice],
          coach: '<p>After the child writes a fact, ask: "How did you feel about it?" Add that sentence.</p>',
          mistake: '<p>Writing only "I like it." Ask: "Why? What did you love about it?"</p>' },
        { slug: 'about-me', title: 'Writing about me', exp: ['D2.4'], skill: 'craft',
          model: [
            step(W.sent('<b>I</b> rode <b>my</b> bike.'), 'I and my: first person.'),
            step(W.sent('<b>She</b> rode <b>her</b> bike.'), 'She and her: about someone else.')
          ],
          guided: [function () { return firstPerson(1); }, function () { return firstPerson(1); }],
          check: [function () { return firstPerson(2); }, function () { return firstPerson(2); }],
          coach: '<p>After the child writes about their day, ask: "Who is this about? How can you tell?" Point to I and my.</p>',
          mistake: '<p>Switching between I and she in one story. Read it back and check.</p>' }
      ]
    }, {
      id: 'edit', title: 'Fix it up', sub: 'Check capitals, end marks and spelling.',
      concepts: [
        { slug: 'check', title: 'Check your writing', exp: ['D2.5'], skill: 'editing',
          model: [
            step(W.sent(W.hl('t', 0, 1) + 'he dog ran home.'), 'A capital at the start?'),
            step(W.sent('We went to the park' + W.gap()), 'A mark at the end?'),
            step(W.sent('I ' + W.hl('sed', 0, 3) + ' hello.'), 'Words spelled right? <b>said</b>.')
          ],
          key: '<p>Capital, mark, spelling: check all three.</p>',
          guided: [function () { return fixIt(1); }, tapMistake],
          check: [function () { return fixIt(2); }, whatWrong],
          coach: '<p>Make a three-picture checklist card: a capital A, a period, and an eye for "does it look right?" The child checks each sentence against the card.</p>',
          mistake: '<p>Reading what they meant, not what they wrote. Read it aloud slowly, pointing to each word.</p>' }
      ]
    }],
    practice: [
      { id: 'craft', name: 'Spaces, voice and first person', code: 'D2.2, D2.3, D2.4', gen: spacing },
      { id: 'editing', name: 'Fix it up', code: 'D2.5', gen: fixIt }
    ],
    tasks: [
      { id: 'my-story', title: 'Write about something that happened to you', code: 'D2.1', pic: W.icon('write'), say: 'Write 3 sentences about something you did. Draw a picture too.', write: true,
        run: ['Talk first: what happened, who was there, how did it feel?', 'The child writes three sentences (or more). Spell words the way they sound; do not correct spelling yet.', 'Add a picture.'],
        rubric: ['A word or a picture only.', 'One or two sentences.', 'Three sentences in order about one event.', 'Three or more sentences, in order, with a feeling or detail.'] },
      { id: 'how-to', title: 'Write how to do something', code: 'D2.1', pic: W.icon('write'), say: 'Write the steps to make or do something you know.', write: true,
        run: ['Choose something the child can do: make a sandwich, plant a seed, feed a pet.', 'The child writes the steps with numbers 1, 2, 3.'],
        rubric: ['No steps yet.', 'One or two steps.', 'Three steps in order.', 'Clear steps in order, with a title.'] },
      { id: 'please', title: 'Write to change a mind', code: 'D2.1', pic: W.icon('talk'), say: 'Write to your grown-up: "We should... because..."', write: true,
        run: ['The child picks something they want (a trip to the library, a pet, a picnic).', 'They write what they want and one or two reasons why.'],
        rubric: ['No reason yet.', 'Says what they want.', 'Says what they want and one reason.', 'Says what they want with two good reasons.'] },
      { id: 'print', title: 'Print neatly', code: 'D2.2', pic: W.icon('write'), say: 'Copy this sentence on lined paper. Use finger spaces.',
        text: W.sent('The moose and the duck swim in the lake.'),
        run: ['Use lined paper. The child copies the sentence.', 'Check: letters formed from the top, sitting on the line, tall letters tall, finger spaces between words.'],
        rubric: ['Letters hard to read; no spaces.', 'Most letters readable; some spaces.', 'Letters formed well, on the line, with spaces.', 'Neat, even letters and spaces throughout.'] },
      { id: 'publish', title: 'Make a final copy', code: 'D3.1', pic: W.icon('star'), say: 'Make a neat copy of your best writing, with a title and a picture.',
        run: ['Pick one draft. Fix the capitals, end marks and a few spellings together.', 'The child copies it neatly, adds a title and a picture, and puts it on the wall or in a book.'],
        rubric: ['Not finished.', 'Copied with help; few fixes.', 'Neat final copy with a title and picture.', 'Neat, fixed and decorated with care for a reader.'] },
      { id: 'read-mine', title: 'Read my writing aloud', code: 'D3.2', pic: W.icon('talk'), say: 'Read your writing to your family. Use your best reading voice.',
        run: ['The child reads their final copy aloud to the family, standing up, showing the picture.', 'Family listens and says one thing they liked.'],
        rubric: ['Too quiet or stops often.', 'Reads it with help.', 'Reads clearly, with some expression.', 'Reads clearly with expression and looks at the listeners.'] },
      { id: 'what-helped', title: 'What helped me share?', code: 'D3.3', pic: W.icon('think'), say: 'Tell one thing that helped you when you shared your writing.',
        run: ['After sharing, ask: "What helped? Practising first? Looking up? Reading slowly?"'],
        rubric: ['Cannot say yet.', 'Names something with prompting.', 'Names one thing that helped.', 'Names it and says they will do it again.'] }
    ]
  });

  Q.shapes('writing', {
    craft: [[1, 'voice', feeling], [1, 'first-person', firstPerson], [2, 'pick-voice', pickVoice]],
    editing: [[1, 'tap', tapMistake], [1, 'what-wrong', whatWrong], [2, 'true-false', editTf]]
  });
})();
