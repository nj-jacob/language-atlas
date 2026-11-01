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
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  function others(list, x) { return list.filter(function (y) { return y !== x; }); }

  /* ---------- voice (D2.3) ---------- */
  /* [a flat sentence, the same idea with the writer's voice] */
  var VOICE = [['We went to the fair.', 'The fair was the best day of my whole summer!'], ['I have a cat.', 'My cat, Pepper, is the silliest, sweetest cat I know.'],
    ['It rained.', 'Rain drummed on the roof all night, and I loved it.'], ['I like hockey.', 'Nothing beats the swish of my skates on fresh ice!'],
    ['We ate soup.', 'Grandma' + AP + 's corn soup warmed me right down to my toes.'], ['The test was hard.', 'My stomach did flips when I saw that test!'],
    ['I saw a moose.', 'I froze when a giant moose stepped out of the trees.'], ['We had a snow day.', 'A snow day! I cheered so loud that my dog barked.'],
    ['My brother is annoying.', 'My little brother hums the same song all day, and it drives me bananas.'], ['I read a book.', 'I could not put that book down, even at bedtime.'],
    ['The beach was nice.', 'I love the way warm sand squishes between my toes.'], ['I made a card.', 'I was so proud of the card I made for Nani.']];
  /* [very + a plain word, one stronger word] */
  var STRONGER = [['very big', 'huge'], ['very small', 'tiny'], ['very happy', 'thrilled'], ['very tired', 'exhausted'], ['very cold', 'freezing'], ['very hot', 'scorching'],
    ['very scared', 'terrified'], ['very hungry', 'starving'], ['very funny', 'hilarious'], ['very wet', 'soaked'], ['very quiet', 'silent'], ['very good', 'excellent'], ['very angry', 'furious']];

  function voice(lv) {
    var v = R.pick(VOICE), wrong = [v[0]];
    if (lv > 1) wrong.push(R.pick(others(VOICE, v))[0]);
    return Q.one('Which sentence shows the writer' + AP + 's <b>voice</b>: their feelings and personality?', v[1], wrong, { hint: 'Which one sounds like a real person who cares?', explain: 'Feelings and describing words give writing a voice.', meta: { k: 'g3-writer-voice' } });
  }
  function stronger(lv) {
    var s = R.pick(STRONGER);
    return Q.one('Which one word could replace <b>' + s[0] + '</b>?', s[1], R.some(others(STRONGER, s), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), {
      hint: 'Which word means ' + s[0] + '?', explain: s[0] + ': <b>' + s[1] + '</b>.', meta: { k: 'g3-stronger', plain: s[0] } });
  }
  function matchStronger(lv) {
    return { q: 'Match each pair of words to one strong word.', type: 'match', pairs: R.some(STRONGER, lv > 1 ? 4 : 3).map(function (s) { return [s[0], s[1]]; }),
      hint: 'Which strong word means the same?', explain: 'One strong word beats very.', meta: { k: 'g3-match-stronger' } };
  }
  function voiceTf() {
    var v = R.pick(VOICE), right = R.int(0, 1) === 1, s = right ? v[1] : v[0];
    return { q: Q.name() + ' says this sentence shows the writer' + AP + 's feelings.', fig: W.sent(s), type: 'tf', answer: right,
      hint: 'Can you tell how the writer feels?', explain: right ? 'You can hear the writer' + AP + 's feelings.' : 'It is true, but you cannot tell how the writer feels.', meta: { k: 'g3-voice-tf', s: s } };
  }

  /* ---------- point of view (D2.4): [first person, the same sentence in the third person] ---------- */
  var POV = [['I fed my dog.', 'She fed her dog.'], ['We walked to the park.', 'They walked to the park.'], ['My sister and I baked muffins.', 'Omar and his sister baked muffins.'],
    ['I put on my skates.', 'He put on his skates.'], ['Our class planted a tree.', 'The class planted a tree.'], ['I lost my mitten in the snow.', 'Leila lost her mitten in the snow.'],
    ['We paddled across the lake.', 'They paddled across the lake.'], ['My grandpa told me a story.', 'His grandpa told him a story.'], ['I scored a goal at recess.', 'Zara scored a goal at recess.'],
    ['We picked apples at the farm.', 'The twins picked apples at the farm.'], ['I read my library book.', 'Kai read his library book.'], ['Our team won the game.', 'Their team won the game.'],
    ['I helped my mom make bannock.', 'Tala helped her mom make bannock.']];
  var FIRSTS = POV.map(function (p) { return p[0]; }), THIRDS = POV.map(function (p) { return p[1]; });

  function pov() {
    var first = R.int(0, 1) === 1, s = R.pick(first ? FIRSTS : THIRDS);
    return { q: 'Is this written in the first person or the third person?', fig: W.sent(s), type: 'tap', tiles: ['First person (I, we)', 'Third person (he, she, they)'], answer: first ? 0 : 1,
      prompt: 'Look for <b>I</b>, <b>we</b>, <b>my</b>, <b>our</b>.', hint: 'I, we, my, our: first person.', explain: first ? 'The writer is in it: first person.' : 'The writer tells about others: third person.', meta: { k: 'g3-pov', s: s } };
  }
  function povSwitch(lv) {
    var p = R.pick(POV), toThird = R.int(0, 1) === 1, from = toThird ? p[0] : p[1], to = toThird ? p[1] : p[0], o = R.pick(others(POV, p));
    var wrong = [from.replace(/\.$/, '!'), toThird ? o[1] : o[0]];
    return Q.one('Change it to the <b>' + (toThird ? 'third' : 'first') + ' person</b>.', to, lv > 1 ? wrong : [wrong[0]], { fig: W.sent(from),
      hint: toThird ? 'Swap I and my for he, she, they, his, her.' : 'Tell it as if it happened to you: I, we, my, our.', explain: W.sent(to), meta: { k: 'g3-pov-switch', s: from, to: toThird ? 'third' : 'first' } });
  }
  function pickFirst(lv) {
    return Q.all('Pick every sentence in the <b>first person</b>.', R.some(FIRSTS, 2), R.some(THIRDS, lv > 1 ? 3 : 2), { hint: 'Look for I, we, my, our.', explain: 'First person uses I, we, my, our.', meta: { k: 'g3-pick-first' } });
  }
  function povFits(lv) {
    var first = R.int(0, 1) === 1, start = R.pick(first ? FIRSTS : THIRDS), right = R.pick(others(first ? FIRSTS : THIRDS, start));
    return Q.one('Keep the same point of view. Which sentence comes next?', right, R.some(first ? THIRDS : FIRSTS, lv > 1 ? 2 : 1), { fig: W.sent(start),
      hint: 'Is the story told with I and we, or with he, she and they?', explain: 'Keep the ' + (first ? 'first' : 'third') + ' person the whole way.', meta: { k: 'g3-pov-fits', s: start } });
  }

  /* ---------- revising (D2.5) ---------- */
  /* paragraphs: [topic, sentences that belong, a sentence that does not] */
  var PARA = [['My dog Biscuit', ['Biscuit has soft brown fur.', 'He loves to chase balls.', 'He sleeps at the end of my bed.', 'Biscuit barks at the mail carrier.'], 'My aunt lives in Halifax.'],
    ['Winter fun', ['We build snow forts.', 'We skate on the pond.', 'We drink hot cocoa after.', 'We slide down the big hill.'], 'Summer camp starts in July.'],
    ['Our garden', ['We plant beans and squash.', 'I water the plants every morning.', 'In August we pick the tomatoes.', 'Bees visit the flowers.'], 'My brother plays the drums.'],
    ['Moose', ['Moose are the biggest kind of deer.', 'They eat leaves and water plants.', 'Male moose grow wide antlers.', 'A baby moose is called a calf.'], 'Penguins live far to the south.'],
    ['My first sleepover', ['I packed my sleeping bag.', 'We told stories with a flashlight.', 'We ate popcorn at midnight.', 'In the morning, we had pancakes.'], 'Hockey season starts in October.'],
    ['Recycling at school', ['We sort paper into the blue bin.', 'Cans and bottles go in another bin.', 'Our class checks the bins every Friday.', 'Less garbage goes to the dump.'], 'My cousin has a new bike.'],
    ['The Three Sisters garden', ['Corn grows tall and straight.', 'Beans climb up the corn.', 'Squash leaves shade the soil.', 'The plants help each other grow.'], 'My favourite colour is blue.'],
    ['Skating at the rink', ['I lace my skates up tight.', 'I glide around the rink.', 'Sometimes I fall, but I get back up.', 'After skating, my toes are cold.'], 'Our cat likes to sleep in the sun.']];
  /* [a sentence, its tired word, a clearer word with the same meaning, words that change the meaning] */
  var TIRED = [['The cake was good.', 'good', 'delicious', 'stale', 'loud'], ['The dog was big.', 'big', 'enormous', 'tiny', 'thin'], ['The movie was fun.', 'fun', 'exciting', 'boring', 'wet'],
    ['It was cold outside.', 'cold', 'freezing', 'sunny', 'warm'], ['The puppy was little.', 'little', 'tiny', 'huge', 'loud'], ['The music was loud.', 'loud', 'booming', 'quiet', 'soft'],
    ['Mia was happy.', 'happy', 'thrilled', 'grumpy', 'tired'], ['The room was messy.', 'messy', 'cluttered', 'tidy', 'empty'], ['The soup was hot.', 'hot', 'steaming', 'icy', 'cold'],
    ['The hill was high.', 'high', 'towering', 'flat', 'low']];

  function noBelong(lv) {
    var p = R.pick(PARA), keep = R.some(p[1], lv > 1 ? 3 : 2), list = R.shuffle(keep.concat([p[2]]));
    return Q.one('This paragraph is about <b>' + p[0] + '</b>. Which sentence does <b>not</b> belong?', p[2], keep, { fig: W.passage(p[0], list),
      prompt: 'Read each sentence. Is it about ' + p[0] + '?', hint: 'One sentence is about something else.', explain: 'Take it out to keep the writing focused.', meta: { k: 'g3-no-belong', topic: p[0] } });
  }
  function addDetail(lv) {
    var p = R.pick(PARA), pick = R.some(p[1], 3), wrong = R.some(others(PARA, p), lv > 1 ? 2 : 1).map(function (x) { return R.pick(x[1].concat([x[2]])); });
    return Q.one('Which sentence would fit in this paragraph?', pick[2], wrong, { fig: W.passage(p[0], pick.slice(0, 2)), hint: 'Which one is about ' + p[0] + '?', explain: 'It adds a detail about ' + p[0] + '.', meta: { k: 'g3-add-detail', topic: p[0] } });
  }
  function replaceWord(lv) {
    var t = R.pick(TIRED);
    return Q.one('Make it clearer. Which word could replace <b>' + t[1] + '</b>?', t[2], lv > 1 ? [t[3], t[4]] : [R.pick([t[3], t[4]])], { fig: W.sent(t[0].replace(t[1], '<mark class="hl">' + t[1] + '</mark>')),
      hint: 'It must mean the same thing, only clearer.', explain: W.sent(t[0].replace(t[1], '<b>' + t[2] + '</b>')), meta: { k: 'g3-replace-word', s: t[0] } });
  }
  function reviseTf() {
    var p = R.pick(PARA), right = R.int(0, 1) === 1, s = right ? R.pick(p[1]) : p[2];
    return { q: Q.name() + ' says this sentence belongs in a paragraph about <b>' + p[0] + '</b>.', fig: W.sent(s), type: 'tf', answer: right,
      hint: 'Is it about ' + p[0] + '?', explain: right ? 'It tells about ' + p[0] + '.' : 'It is about something else. Take it out.', meta: { k: 'g3-revise-tf', topic: p[0], s: s } };
  }

  /* ---------- editing (D2.6): [sentence with one mistake, the word with the mistake, the fixed sentence, kind of mistake] ---------- */
  var ERR = [['my friend Zara came over.', 'my', 'My friend Zara came over.', 'cap'], ['We visited sudbury last summer.', 'sudbury', 'We visited Sudbury last summer.', 'cap'],
    ['I sed hello to the bus driver.', 'sed', 'I said hello to the bus driver.', 'spell'], ['We played outside becuz it was sunny.', 'becuz', 'We played outside because it was sunny.', 'spell'],
    ['Leila and omar went skating.', 'omar', 'Leila and Omar went skating.', 'cap'], ['My frend lives next door.', 'frend', 'My friend lives next door.', 'spell'],
    ['The geese is flying south.', 'is', 'The geese are flying south.', 'sound'], ['We goed to the library.', 'goed', 'We went to the library.', 'sound'],
    ['i like to read comics.', 'i', 'I like to read comics.', 'cap'], ['The dogs runs in our yard.', 'runs', 'The dogs run in our yard.', 'sound'],
    ['We swam in Lake huron.', 'huron', 'We swam in Lake Huron.', 'cap'], ['My birthday is in june.', 'june', 'My birthday is in June.', 'cap'],
    ['They was late for school.', 'was', 'They were late for school.', 'sound'], ['The bus was rilly full.', 'rilly', 'The bus was really full.', 'spell'],
    ['We have gym on munday.', 'munday', 'We have gym on Monday.', 'spell'], ['She has too cats.', 'too', 'She has two cats.', 'spell'],
    ['I can see there house from here.', 'there', 'I can see their house from here.', 'spell'], ['We had sum apples.', 'sum', 'We had some apples.', 'spell'],
    ['Hana writed a poem.', 'writed', 'Hana wrote a poem.', 'sound'], ['Red leafs fell from our tree.', 'leafs', 'Red leaves fell from our tree.', 'sound']];
  var KIND = { cap: 'A word needs a capital letter.', spell: 'A word is spelled wrong.', sound: 'A word does not sound right.' };

  function findError() {
    var e = R.pick(ERR), words = e[0].replace(/\.$/, '').split(' ');
    return { q: 'One word has a mistake. Tap it.', fig: W.sent(e[0]), type: 'tap', tiles: words, answer: words.indexOf(e[1]),
      hint: 'Check capitals for names and the first word. Check tricky spellings. Read it aloud.', explain: W.sent(e[2]), meta: { k: 'g3-find-error', s: e[0] } };
  }
  function fixed(lv) {
    var e = R.pick(ERR), wrong = [e[0]];
    if (lv > 1) wrong.push(e[2].charAt(0).toLowerCase() + e[2].slice(1).replace(/\.$/, ''));
    return Q.one('Which is the <b>fixed</b> sentence?', e[2], wrong, { fig: W.sent(e[0]), hint: 'Read slowly, one word at a time.', explain: W.sent(e[2]), meta: { k: 'g3-fixed', s: e[0] } });
  }
  function editKind(lv) {
    var e = R.pick(ERR);
    return Q.one('What kind of mistake is it?', KIND[e[3]], R.some(others(Object.keys(KIND), e[3]), lv > 1 ? 2 : 1).map(function (k) { return KIND[k]; }), {
      fig: W.sent(e[0].replace(e[1], '<mark class="hl">' + e[1] + '</mark>')), hint: 'Is it a name or a first word? Does it look right? Does it sound right?', explain: W.sent(e[2]), meta: { k: 'g3-edit-kind', s: e[0] } });
  }
  function editTf() {
    var e = R.pick(ERR), right = R.int(0, 1) === 1, s = right ? e[2] : e[0];
    return { q: Q.name() + ' says this sentence has no mistakes.', fig: W.sent(s), type: 'tf', answer: right,
      hint: 'Check capitals, spelling, and how it sounds.', explain: W.sent(e[2]), meta: { k: 'g3-edit-tf', s: s } };
  }

  Atlas.register('writing', {
    full: true,
    lessons: [{
      id: 'voice-pov', title: 'Voice and point of view', sub: 'Sound like you. Know who is telling it.',
      concepts: [
        { slug: 'voice', title: 'Your voice: feelings and strong words', exp: ['D2.3'], skill: 'voice',
          model: [
            step(W.sent('We went to the fair.'), 'True, but flat.'),
            step(W.sent('The fair was the <b>best</b> day of my <b>whole</b> summer!'), 'Now I hear a real person.'),
            step(W.sent('The ride was <b>very big</b>.'), 'Very big? Try one word.'),
            step(W.sent('The ride was <b>enormous</b>.'), 'Shorter, and it hits harder.'),
            step(W.sent('I have a cat.'), 'Flat again.'),
            step(W.sent('My cat, Pepper, is the <b>silliest, sweetest</b> cat I know.'), 'A name and a feeling bring it to life.')
          ],
          guided: [function () { return voice(1); }, function () { return stronger(1); }, function () { return matchStronger(1); }],
          check: [function () { return voice(2); }, function () { return stronger(2); }, voiceTf, function () { return matchStronger(2); }, function () { return voice(3); }],
          coach: '<p>Ask "How did it feel?" and "What did it look like?" and help the child add one of those to a sentence.</p>',
          mistake: '<p>Adding "very" to everything. Look for a stronger word instead (very big: huge).</p>' },
        { slug: 'pov', title: 'First person or third person', exp: ['D2.4'], skill: 'pov',
          model: [
            step(W.sent('<b>I</b> fed <b>my</b> dog.'), 'The writer is in it.'),
            step(W.sent('<b>She</b> fed <b>her</b> dog.'), 'Now it tells about someone else.'),
            step(W.sent('<b>We</b> paddled across the lake.'), 'I, we, my, our: the writer is in the story.'),
            step(W.sent('<b>They</b> paddled across the lake.'), 'He, she, they: the writer watches from outside.'),
            step(W.passage('', ['I put on my skates.', 'I step onto the ice.']), 'Pick one and keep it the whole way.')
          ],
          guided: [pov, function () { return povSwitch(1); }, function () { return povFits(1); }],
          check: [pov, function () { return povSwitch(2); }, function () { return pickFirst(2); }, function () { return povFits(2); }, function () { return pickFirst(3); }],
          coach: '<p>Write one sentence about your day in the first person, then rewrite it as if it were about someone else.</p>',
          mistake: '<p>Switching between I and she in the same story. Pick one and stick with it.</p>' }
      ]
    }, {
      id: 'revise-edit', title: 'Revising and editing', sub: 'Make it clear, then make it correct.',
      concepts: [
        { slug: 'revise', title: 'Revise: take out, add, replace', exp: ['D2.5'], skill: 'revise',
          model: [
            step(W.passage('My dog Biscuit', ['Biscuit has soft brown fur.', 'My aunt lives in Halifax.', 'He loves to chase balls.']), 'Read it again.'),
            step(W.sent('My aunt lives in Halifax.'), 'Not about Biscuit. Out it goes.'),
            step(W.sent('He sleeps at the end of my bed.'), 'A detail that fits.'),
            step(W.sent('The cake was <mark class="hl">good</mark>.'), 'Good is a tired word.'),
            step(W.sent('The cake was <b>delicious</b>.'), 'Same meaning, clearer picture.')
          ],
          guided: [function () { return noBelong(1); }, function () { return addDetail(1); }, function () { return replaceWord(1); }],
          check: [function () { return noBelong(2); }, function () { return addDetail(2); }, function () { return replaceWord(2); }, reviseTf, function () { return noBelong(3); }],
          coach: '<p>Read the child' + AP + 's draft aloud to them. Ask: "Does every sentence tell about the topic? What could you add? Which word could be clearer?"</p>',
          mistake: '<p>Thinking revising means recopying neatly. Revising changes what it says.</p>' },
        { slug: 'edit', title: 'Edit: fix the mistakes', exp: ['D2.6'], skill: 'edit',
          model: [
            step(W.sent('<mark class="hl">my</mark> friend Zara came over.'), 'A sentence starts with a capital.'),
            step(W.sent('<mark class="hl">M</mark>y friend Zara came over.')),
            step(W.sent('I <mark class="hl">sed</mark> hello to the bus driver.'), 'This word looks wrong.'),
            step(W.sent('I <mark class="hl">said</mark> hello to the bus driver.'), 'Check it in a word list.'),
            step(W.sent('The geese <mark class="hl">is</mark> flying south.'), 'Read it aloud. Does it sound right?'),
            step(W.sent('The geese <mark class="hl">are</mark> flying south.'))
          ],
          guided: [findError, function () { return fixed(1); }, function () { return editKind(1); }],
          check: [findError, function () { return fixed(2); }, function () { return editKind(2); }, editTf, findError],
          coach: '<p>Have the child read their writing aloud, pointing to each word. Many mistakes are heard before they are seen.</p>',
          mistake: '<p>Editing everything at once. Check one thing at a time: capitals, then end marks, then spelling.</p>' }
      ]
    }],
    practice: [
      { id: 'voice', name: 'Voice and strong words', code: 'D2.3', gen: voice },
      { id: 'pov', name: 'First or third person', code: 'D2.4', gen: pov },
      { id: 'revise', name: 'Revising', code: 'D2.5', gen: noBelong },
      { id: 'edit', name: 'Editing', code: 'D2.6', gen: findError }
    ],
    tasks: [
      { id: 'draft-story', title: 'Draft a story', code: 'D2.1', pic: W.icon('write'), say: 'Write a story about a time you were surprised.', write: true,
        run: ['Talk about the idea first: who, where, what happened, how it ended.', 'The child writes a short draft (five or more sentences). Spelling does not matter yet.', 'Then try an opinion piece another day: "The best season is... because..."'],
        rubric: ['A few words or one sentence.', 'Some sentences; the order is hard to follow.', 'A beginning, middle and end in five or more sentences.', 'A clear story with details and feelings, in the writer' + AP + 's own voice.'] },
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
    voice: [[1, 'stronger', stronger], [1, 'match', matchStronger], [1, 'true-false', voiceTf]],
    pov: [[1, 'switch', povSwitch], [1, 'pick-first', pickFirst], [1, 'keep-it', povFits]],
    revise: [[1, 'add-detail', addDetail], [1, 'replace', replaceWord], [1, 'true-false', reviseTf]],
    edit: [[1, 'fixed', fixed], [1, 'kind', editKind], [1, 'true-false', editTf]]
  });
})();
