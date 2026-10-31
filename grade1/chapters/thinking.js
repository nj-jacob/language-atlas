/* Grade 1: thinking about texts.
   Ontario 2023 Language, Grade 1, Strand C:
   C1.3 text patterns and features: order, illustrations, symbols and titles     C1.4 how pictures and words go together
   C1.5 simple elements of style: word choice and word patterns                  C3.1 rhyme, alliteration and onomatopoeia
   C3.2 simple inferences                                                         C3.3 identifying and sequencing important events
   C3.5 perspectives in a text
   With a grown-up: C3.4 cultural elements, C3.6 personal thoughts and feelings about ideas such as diversity and inclusion,
   C3.7 texts by First Nations, Metis and Inuit creators, C3.8 thinking skills that helped.
   Passages are in ../texts.js. Answer checks: tests/verify/grade1-thinking.js (and grade1-reading.js for the passages). */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;

  /* [title, what the book is about, other topics] */
  var TITLES = [['Bears in Winter', 'how bears live in the cold months', ['how to bake bread', 'a trip to the beach']], ['My First Day of School', 'a child starting school', ['how planes fly', 'life in the ocean']],
    ['How to Build a Snowman', 'the steps to make a snowman', ['why leaves are green', 'a birthday party']], ['The Lost Puppy', 'a puppy that gets lost', ['how to grow carrots', 'the moon and stars']]];
  var SYMBOLS = [['+', 'add'], ['&rarr;', 'go this way'], ['&hearts;', 'love'], ['?', 'a question'], ['=', 'the same as']];
  /* a sentence and the picture that goes with it */
  var PICS = [['The bee buzzed near the flowers.', 'bee'], ['We ate an apple at snack time.', 'apple'], ['The moon is bright tonight.', 'moon'], ['I kicked the ball to Sam.', 'ball'],
    ['The fox ran into the woods.', 'fox'], ['Dad opened the door with a key.', 'key'], ['A bird sat on its nest.', 'nest'], ['The bus stopped at the school.', 'bus'], ['I put my hat on my head.', 'hat'], ['A fish swam in the lake.', 'fish']];
  /* [plain sentence, a sentence with words that help you picture it] */
  var VIVID = [['The dog was on the grass.', 'The fluffy white puppy rolled in the soft grass.'], ['It was a day.', 'It was a hot, sunny day at the beach.'], ['The cat ate.', 'The hungry orange cat gobbled its fish.'],
    ['We saw a tree.', 'We saw a tall pine tree covered in snow.'], ['She went down.', 'She zoomed down the icy hill on her sled.']];
  var RHYME = [['cat', 'hat', 'mat', 'bat'], ['sun', 'fun', 'run', 'bun'], ['top', 'hop', 'mop', 'stop'], ['pig', 'big', 'dig', 'wig'], ['cake', 'lake', 'snake', 'rake'], ['bee', 'tree', 'see', 'three']];
  var SOUNDS = ['buzz', 'splash', 'moo', 'pop', 'crash', 'boom', 'hiss', 'quack'];
  var PLAIN = ['tree', 'blue', 'jump', 'happy', 'table', 'garden', 'slow', 'green'];
  var SAME_START = [['Silly Sam sings songs.', 'Sam sings a song for us.'], ['Big bears bake bread.', 'The bear makes bread.'], ['Five frogs found food.', 'The frogs ate some food.'],
    ['Many moose munch moss.', 'A moose eats moss.'], ['Tiny turtles tap toes.', 'The turtle is very small.']];
  /* a short text, how someone feels, wrong feelings, and the words that show it */
  var FEEL = [['Mia' + '’' + 's ice cream fell on the ground. She looked down at it.', 'sad', ['happy', 'proud'], 'fell on the ground'],
    ['Liam jumped up and down. "I can' + '’' + 't wait for my party!" he said.', 'excited', ['bored', 'sad'], 'jumped up and down'],
    ['Zara heard a loud bang in the dark. She hid under her blanket.', 'scared', ['happy', 'sleepy'], 'hid under her blanket'],
    ['Owen finished his puzzle all by himself. He smiled and showed his mom.', 'proud', ['angry', 'scared'], 'smiled and showed'],
    ['Priya yawned. Her eyes kept closing.', 'tired', ['excited', 'angry'], 'eyes kept closing']];
  /* [who, what they say, what they think, other ideas] */
  var VIEWS = [['Omar', '"Winter is the best! I love skating and sledding."', 'Winter is great.', ['Winter is boring.', 'Summer is the best.']],
    ['Hana', '"I do not like loud places. The library is my favourite spot."', 'Quiet places are best.', ['Loud places are fun.', 'The library is too noisy.']],
    ['Mateo', '"Dogs are the best pets. They play with you every day."', 'Dogs make great pets.', ['Cats make the best pets.', 'Pets are too much work.']]];

  /* ---------- question makers: features, pictures and words ---------- */
  function picMatch(lv) {
    var p = R.pick(PICS), wrong = R.some(PICS.filter(function (x) { return x !== p; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), names = R.shuffle([p[1]].concat(wrong));
    return { q: 'Which picture goes with the sentence?', type: 'tap', tiles: names.map(function (n) { return W.pic(n); }), answer: names.indexOf(p[1]), answerText: p[1], fig: W.sent(p[0]),
      prompt: 'Which word in the sentence names something you could draw?', hint: 'Find the naming word. Find its picture.', explain: W.pic(p[1]), meta: { k: 'g1-pic-match', s: p[0] } };
  }
  function titleTells(lv) {
    var t = R.pick(TITLES);
    return Q.one('What will a book called <b>' + t[0] + '</b> be about?', t[1], t[2].slice(0, lv > 1 ? 2 : 1), { hint: 'The title tells you the topic.', explain: 'The title is a clue: ' + t[1] + '.', meta: { k: 'g1-title-tells', t: t[0] } });
  }
  function symbolMeans() {
    var s = R.pick(SYMBOLS);
    return Q.tiles('What does this symbol mean?', s[1], R.some(SYMBOLS.filter(function (x) { return x !== s; }), 2).map(function (x) { return x[1]; }), { fig: W.tile(s[0]),
      hint: 'Where have you seen it?', explain: s[0] + ' means <b>' + s[1] + '</b>.', meta: { k: 'g1-symbol', s: W.tile(s[0]) } });
  }
  function stepsWhy() {
    return Q.one('Why do instructions have the numbers 1, 2, 3, 4?', 'to show the order of the steps', ['to count the pages', 'to make it look nice'], { fig: T.show(T.seed),
      hint: 'What would happen if you did the steps in a mixed-up order?', explain: 'The numbers show what to do first, next and last.', meta: { k: 'g1-steps-why' } });
  }
  function wordChoice(lv) {
    var v = R.pick(VIVID), other = R.pick(VIVID.filter(function (x) { return x !== v; }));
    return Q.one('Which sentence helps you <b>picture it</b> best?', v[1], [v[0]].concat(lv > 1 ? [other[0]] : []), { prompt: 'Which words tell what it looks like, or how it moves?',
      hint: 'Look for describing words and strong action words.', explain: 'Words like these help you see it in your head.', meta: { k: 'g1-word-choice' } });
  }

  /* ---------- question makers: sound play ---------- */
  function rhyme(lv) {
    var f = R.pick(RHYME), w = f[0], right = R.pick(f.slice(1)), others = RHYME.filter(function (x) { return x !== f; });
    return Q.one('Which word <b>rhymes</b> with <b>' + w + '</b>?', right, R.some(others, lv > 1 ? 3 : 2).map(function (x) { return x[0].charAt(0) === w.charAt(0) ? x[1] : x[0]; }), {
      prompt: 'Say both words. Do they end with the same sound?', hint: 'Rhyming words sound the same at the end.', explain: '<b>' + w + '</b> and <b>' + right + '</b> rhyme.', meta: { k: 'g1-rhyme', w: w } });
  }
  function rhymePoem() {
    var t = T.rain, r = R.pick(t.rhyme.slice(0, 2)), words = ['rain', 'yellow', 'puddle', 'warm'];
    return Q.one('In the poem, which word rhymes with <b>' + r[1] + '</b>?', r[0], R.some(words, 2), { fig: T.show(t), hint: 'Look at the ends of the lines.', explain: '<b>' + r[0] + '</b> and <b>' + r[1] + '</b> rhyme.', meta: { k: 'g1-rhyme-poem', w: r[1] } });
  }
  function soundWord(lv) {
    return Q.one('Which is a <b>sound word</b>?', R.pick(SOUNDS), R.some(PLAIN, lv > 1 ? 3 : 2), { prompt: 'Say each word. Which one sounds like the noise it names?', hint: 'A sound word sounds like the noise.',
      explain: 'Sound words copy a sound, like buzz or splash.', meta: { k: 'g1-sound-word' } });
  }
  function pickSound() {
    return Q.all('Pick every <b>sound word</b>.', R.some(SOUNDS, 2), R.some(PLAIN, 2), { hint: 'Which ones make a noise when you say them?', explain: 'Sound words copy a sound.', meta: { k: 'g1-pick-sound' } });
  }
  function sameStart(lv) {
    var s = R.pick(SAME_START), other = R.pick(SAME_START.filter(function (x) { return x !== s; }));
    return Q.one('Which sentence has words that all <b>start with the same sound</b>?', s[0], [s[1]].concat(lv > 1 ? [other[1]] : []), { hint: 'Say the first sound of each word.',
      explain: W.sent(s[0]) + ': the same first sound again and again.', meta: { k: 'g1-same-start' } });
  }

  /* ---------- question makers: thinking ---------- */
  function feeling(lv) {
    var f = R.pick(FEEL);
    return Q.tiles('How does this person feel?', f[1], f[2].concat(lv > 1 ? [R.pick(['hungry', 'cold'])] : []), { fig: W.passage('', [f[0]]), prompt: 'Look for a clue: what do they do?',
      hint: 'The text does not say the feeling. What do they do?', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g1-feeling', text: f[0] } });
  }
  function textFeel() {
    var t = R.pick(T.list('infer')), f = R.pick(t.infer);
    return Q.one(f[0], f[1], [f[2]], { fig: T.show(t), hint: 'What does the character do or say?', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g1-text-feel', t: t.title, q: f[0] } });
  }
  function sequence(lv) {
    var t = R.pick(T.list('order')), ev = t.order.length > 3 && lv < 2 ? t.order.slice(0, 3) : t.order;
    return { q: 'Put these in the order they happen.', fig: T.show(t), type: 'order', items: ev.map(function (e) { return '“' + e + '”'; }), first: 'First', last: 'Last',
      hint: 'Find each part in the text. Which comes first?', explain: 'They come in this order in the text.', meta: { k: 'g1-order', t: t.title } };
  }
  function view(lv) {
    var v = R.pick(VIEWS);
    return Q.one('What does <b>' + v[0] + '</b> think?', v[2], v[3].slice(0, lv > 1 ? 2 : 1), { fig: W.means('talk', v[1]), hint: 'Look at the words "best", "love" or "do not like".',
      explain: v[0] + ' thinks: ' + v[2], meta: { k: 'g1-view', who: v[0] } });
  }
  function letterView() {
    var t = T.note, v = t.view;
    return Q.one('What does <b>' + v.who + '</b> think about the scarf?', v.thinks, v.wrong, { fig: T.show(t), hint: 'Look for a clue: <b>' + v.clue + '</b>.', explain: 'The clue: <mark class="hl">' + v.clue + '</mark>.', meta: { k: 'g1-letter-view' } });
  }

  Atlas.register('thinking', {
    lessons: [{
      id: 'features', title: 'Titles, pictures and words', sub: 'How titles, symbols, pictures and word choice help you understand.',
      concepts: [
        { slug: 'titles', title: 'Titles and symbols give clues', exp: ['C1.3'], skill: 'features',
          model: [
            step(W.sent('Bears in Winter'), 'The title tells the topic.'),
            step(W.tile('+') + W.tile('&rarr;'), 'Symbols: add, go this way.'),
            step(W.passage('', ['1. Fill the pot.', '2. Push the seed in.']), 'Numbers show the order.')
          ],
          guided: [function () { return titleTells(1); }, symbolMeans],
          check: [stepsWhy, function () { return titleTells(2); }],
          coach: '<p>Before reading, cover the pictures and read only the title. Ask: "What do you think it is about?"</p>',
          mistake: '<p>Ignoring the title and starting at the first page. Always read the title first.</p>' },
        { slug: 'pictures', title: 'Pictures and words go together', exp: ['C1.4'], skill: 'features',
          model: [
            step(W.sent('A bee buzzed near the flowers.')),
            step(W.pic('bee'), 'The picture shows the bee.'),
            step(W.icon('read'), 'The picture helps you read the words.')
          ],
          guided: [function () { return picMatch(1); }, function () { return picMatch(1); }],
          check: [function () { return picMatch(2); }, function () { return picMatch(2); }],
          coach: '<p>On each page, ask: "What does the picture show that the words do not?" and "What do the words tell that the picture does not?"</p>',
          mistake: '<p>Guessing the words from the picture only. Read the words, then check the picture.</p>' },
        { slug: 'word-choice', title: 'Words that paint a picture', exp: ['C1.5'], skill: 'features',
          model: [
            step(W.sent('The dog was on the grass.'), 'Hard to picture.'),
            step(W.sent('The <b>fluffy white</b> puppy <b>rolled</b> in the <b>soft</b> grass.'), 'Now I can see it.')
          ],
          guided: [function () { return wordChoice(1); }, function () { return wordChoice(1); }],
          check: [function () { return wordChoice(2); }, function () { return wordChoice(2); }],
          coach: '<p>Read a page aloud and ask: "Which words helped you see it in your head?"</p>',
          mistake: '<p>Choosing the shorter sentence because it is easier. Ask which one you can picture better.</p>' }
      ]
    }, {
      id: 'sound-play', title: 'Playing with sounds', sub: 'Rhyme, sound words, and words that start the same.',
      concepts: [
        { slug: 'rhyme', title: 'Rhyming words', exp: ['C3.1'], skill: 'sound-play',
          model: [
            step(W.tile(W.hl('cat', 1, 3)) + W.tile(W.hl('hat', 1, 3)), 'The ends sound the same.'),
            step(W.tile('cat') + W.tile('cup'), 'Same start, different end: no rhyme.')
          ],
          key: '<p>Rhymes make poems and songs fun to say.</p>',
          guided: [function () { return rhyme(1); }, function () { return rhyme(1); }],
          check: [function () { return rhyme(2); }, rhymePoem],
          coach: '<p>Say a word and take turns finding rhymes, even silly made-up ones.</p>',
          mistake: '<p>Choosing a word with the same start (cat, cup). Listen to the end of the word.</p>' },
        { slug: 'sound-words', title: 'Sound words', exp: ['C3.1'], skill: 'sound-play',
          model: [
            step(W.tile('buzz') + W.tile('splash') + W.tile('pop'), 'They sound like the noise.'),
            step(W.sent('<b>Splash</b> in the puddle, <b>plop, plop, plop</b>.'), 'You can hear the rain.')
          ],
          guided: [function () { return soundWord(1); }, pickSound],
          check: [function () { return soundWord(2); }, pickSound],
          coach: '<p>Go on a sound walk. Make up words for what you hear: the bus goes "vroom", the door goes "creak".</p>',
          mistake: '<p>Picking any action word. Ask: "Does the word sound like the noise?"</p>' },
        { slug: 'same-start', title: 'Words that start the same', exp: ['C3.1'], skill: 'sound-play',
          model: [
            step(W.sent(W.hl('Silly', 0, 1) + ' ' + W.hl('Sam', 0, 1) + ' ' + W.hl('sings', 0, 1) + ' ' + W.hl('songs', 0, 1) + '.'), 'The same first sound, again and again.'),
            step(W.icon('talk'), 'It is fun to say, and easy to remember.')
          ],
          guided: [function () { return sameStart(1); }, function () { return sameStart(1); }],
          check: [function () { return sameStart(2); }, function () { return sameStart(2); }],
          coach: '<p>Make a silly sentence with the child' + '’' + 's name: "Kai keeps kicking kites."</p>',
          mistake: '<p>Choosing a sentence with only two words that start the same. Look at every word.</p>' }
      ]
    }, {
      id: 'think', title: 'Thinking about what you read', sub: 'Feelings, what happened, and what someone thinks.',
      concepts: [
        { slug: 'feelings', title: 'Find the feeling', exp: ['C3.2'], skill: 'thinking',
          model: [
            step(W.passage('', ['Mia' + '’' + 's ice cream fell on the ground. She looked down at it.']), 'It does not say how she feels.'),
            step(W.sent('<mark class="hl">fell on the ground</mark>'), 'A clue.'),
            step(W.tile('sad'), 'So Mia feels sad.')
          ],
          guided: [function () { return feeling(1); }, function () { return feeling(1); }],
          check: [function () { return feeling(2); }, textFeel],
          coach: '<p>When reading, ask: "How do you think they feel? What made you think that?"</p>',
          mistake: '<p>Guessing a feeling with no clue. Ask the child to point to the words that show it.</p>' },
        { slug: 'order', title: 'What happened, in order', exp: ['C3.3'], skill: 'thinking',
          model: [
            step(W.sent('had a new kite'), 'First.'),
            step(W.sent('had a new kite') + W.sent('ran across the big field'), 'Next.'),
            step(W.sent('had a new kite') + W.sent('ran across the big field') + W.sent('clapped and smiled'), 'Last. Keep the order of the story.')
          ],
          guided: [function () { return sequence(1); }, function () { return sequence(1); }],
          check: [function () { return sequence(2); }, function () { return sequence(2); }],
          coach: '<p>Retell a story with three fingers: first, next, last.</p>',
          mistake: '<p>Putting the most exciting part first. Find each part in the text to check.</p>' },
        { slug: 'view', title: 'What does someone think?', exp: ['C3.5'], skill: 'thinking',
          model: [
            step(W.means('talk', '"Winter is the best! I love skating."')),
            step(W.sent('Omar thinks winter is great.'), '"best" and "love" are clues.'),
            step(W.icon('people'), 'Someone else might think something different.')
          ],
          guided: [function () { return view(1); }, letterView],
          check: [function () { return view(2); }, letterView],
          coach: '<p>Ask: "What does this character think? Do you agree? Would someone else think the same?"</p>',
          mistake: '<p>Giving their own opinion instead of the character' + '’' + 's. Ask: "What does Omar think?"</p>' }
      ]
    }],
    practice: [
      { id: 'features', name: 'Titles, pictures and words', code: 'C1.3, C1.4, C1.5', gen: picMatch },
      { id: 'sound-play', name: 'Playing with sounds', code: 'C3.1', gen: rhyme },
      { id: 'thinking', name: 'Thinking about what you read', code: 'C3.2, C3.3, C3.5', gen: feeling }
    ],
    tasks: [
      { id: 'culture', title: 'Celebrations in books', code: 'C3.4', pic: W.icon('people'), say: 'Read a book about a celebration. What does it show is important?',
        run: ['Choose a picture book about a family celebration, ideally one like the child' + '’' + 's own and one that is different.', 'Talk about the symbols in it (food, clothing, music, decorations) and what they mean to the family.', 'Ask: "What is important to this family? How do you know?"'],
        rubric: ['Does not name anything yet.', 'Names a symbol with help.', 'Names a symbol and what it means in the story.', 'Explains what the family values, using details from the book.'] },
      { id: 'my-thoughts', title: 'What I think about it', code: 'C3.6', pic: W.icon('think'), say: 'Read a book about friends who are different. Tell what you think.',
        run: ['Read a picture book about being included, or about people with different abilities, families or languages.', 'Ask: "How did the character feel? What would you do? Is everyone included in our class?"'],
        rubric: ['Does not share a thought yet.', 'Shares a thought with prompting.', 'Shares a thought and a feeling about the ideas.', 'Shares thoughtful ideas and connects them to their own life.'] },
      { id: 'fnmi-story', title: 'What does the story teach?', code: 'C3.7', pic: W.icon('read'), say: 'Read a story by a First Nations, Métis or Inuit creator. What does it teach?',
        run: ['Choose a picture book by a First Nations, Métis or Inuit author. Your librarian can help.', 'After reading, ask: "What does this story tell us about the past, or about family, community or the land? How is it like life today?"'],
        rubric: ['Does not share anything yet.', 'Shares one idea with help.', 'Shares what the story teaches.', 'Shares what it teaches and links it to life today, respectfully.'],
        coach: '<p>Let the book and its creator lead. Each nation and community is distinct.</p>' },
      { id: 'thinking-skills', title: 'How did I work it out?', code: 'C3.8', pic: W.icon('star'), say: 'Tell how you worked out a feeling or what comes next.',
        run: ['After a question like "How does she feel?", ask: "How did you work that out?"', 'Name the skill: "You used a clue from the story. That is called making an inference."'],
        rubric: ['Cannot say yet.', 'Says how with prompting.', 'Names a thinking skill they used.', 'Names the skill and points to the clue they used.'] }
    ]
  });

  Q.shapes('thinking', {
    features: [[1, 'title', titleTells], [1, 'symbol', symbolMeans], [1, 'steps', stepsWhy], [2, 'word-choice', wordChoice]],
    'sound-play': [[1, 'sound-word', soundWord], [1, 'same-start', sameStart], [2, 'pick-sound', pickSound], [2, 'rhyme-poem', rhymePoem]],
    thinking: [[1, 'order', sequence], [1, 'view', view], [2, 'text-feel', textFeel], [2, 'letter-view', letterView]]
  });
})();
