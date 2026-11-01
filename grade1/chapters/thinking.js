/* Grade 1: thinking about texts. A full chapter: every idea has two worked examples, three questions together and five on
   your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 1, Strand C:
   C1.3 text patterns and features: order, illustrations, symbols and titles     C1.4 how pictures and words go together
   C1.5 simple elements of style: word choice and word patterns                  C3.1 rhyme, alliteration and onomatopoeia
   C3.2 simple inferences                                                         C3.3 identifying and sequencing important events
   C3.5 perspectives in a text
   With a grown-up: C3.4 cultural elements, C3.6 personal thoughts and feelings about ideas such as diversity and inclusion,
   C3.7 texts by First Nations, Metis and Inuit creators, C3.8 thinking skills that helped.
   Passages are in ../texts.js. Answer checks: tests/verify/grade1-thinking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var Q1 = '“', Q2 = '”', AP = '’';

  /* [title, what the book is about, other topics] */
  var TITLES = [['Bears in Winter', 'how bears live in the cold months', ['how to bake bread', 'a trip to the beach']], ['My First Day of School', 'a child starting school', ['how planes fly', 'life in the ocean']],
    ['How to Build a Snowman', 'the steps to make a snowman', ['why leaves are green', 'a birthday party']], ['The Lost Puppy', 'a puppy that gets lost', ['how to grow carrots', 'the moon and stars']],
    ['All About Owls', 'facts about owls', ['a trip to the moon', 'how to ride a bike']], ['Grandma' + AP + 's Garden', 'the plants Grandma grows', ['a soccer game', 'how trains work']],
    ['Fun at the Fall Fair', 'a day at a fair in the fall', ['how fish breathe', 'brushing your teeth']], ['How to Make a Paper Boat', 'the steps to fold a boat', ['a family of foxes', 'why snow melts']],
    ['The Big Storm', 'a day with wind and rain', ['how to make soup', 'a new baby sister']], ['Life in a Pond', 'animals that live in a pond', ['a trip to the city', 'how to tie shoes']]];
  var SYMBOLS = [['+', 'add'], ['&rarr;', 'go this way'], ['&hearts;', 'love'], ['?', 'a question'], ['=', 'the same as'], ['✓', 'yes, done'], ['✗', 'no, or wrong']];
  /* a sentence and the picture that goes with it (the picture names a word in the sentence) */
  var PICS = [['The bee buzzed near the flowers.', 'bee'], ['We ate an apple at snack time.', 'apple'], ['The moon is bright tonight.', 'moon'], ['I kicked the ball to Sam.', 'ball'],
    ['The fox ran into the woods.', 'fox'], ['Dad opened the door with a key.', 'key'], ['A bird sat on its nest.', 'nest'], ['The bus stopped at the school.', 'bus'], ['I put my hat on my head.', 'hat'], ['A fish swam in the lake.', 'fish'],
    ['The cat slept on my bed.', 'cat'], ['A pig rolled in the mud.', 'pig'], ['Mom drank tea from a cup.', 'cup'], ['A jet flew over the city.', 'jet'], ['A red leaf fell on the path.', 'leaf'],
    ['We read a book at bedtime.', 'book'], ['A goose swam on the pond.', 'goose'], ['The sun came up over the hill.', 'sun']];
  /* [plain sentence, a sentence with words that help you picture it, those picture words] */
  var VIVID = [['The dog was on the grass.', 'The fluffy white puppy rolled in the soft grass.', ['fluffy', 'white', 'rolled', 'soft']], ['It was a day.', 'It was a hot, sunny day at the beach.', ['hot', 'sunny']],
    ['The cat ate.', 'The hungry orange cat gobbled its fish.', ['hungry', 'orange', 'gobbled']], ['We saw a tree.', 'We saw a tall pine tree covered in snow.', ['tall', 'pine', 'covered']],
    ['She went down.', 'She zoomed down the icy hill on her sled.', ['zoomed', 'icy']], ['The bird sang.', 'The tiny yellow bird sang a happy song.', ['tiny', 'yellow', 'happy']],
    ['The car went.', 'The shiny red car raced down the road.', ['shiny', 'red', 'raced']], ['The snow fell.', 'Soft, white snow drifted down all night.', ['Soft', 'white', 'drifted']],
    ['The frog moved.', 'The green frog leaped into the cold pond.', ['green', 'leaped', 'cold']], ['I had soup.', 'I slurped warm, salty soup from a big bowl.', ['slurped', 'warm', 'salty', 'big']]];
  var LITTLE = ['The', 'the', 'was', 'in', 'on', 'a', 'It', 'at', 'its', 'We', 'She', 'her', 'down', 'into', 'from', 'all', 'I', 'saw', 'sang', 'had'];
  var RHYME = [['cat', 'hat', 'mat', 'bat'], ['sun', 'fun', 'run', 'bun'], ['top', 'hop', 'mop', 'stop'], ['pig', 'big', 'dig', 'wig'], ['cake', 'lake', 'snake', 'rake'], ['bee', 'tree', 'see', 'three'],
    ['bed', 'red', 'fed', 'sled'], ['dog', 'log', 'frog', 'fog'], ['bug', 'hug', 'mug', 'rug'], ['fan', 'can', 'pan', 'van'], ['ring', 'sing', 'king', 'wing']];
  /* a sound word and what makes it */
  var SOUND_OF = [['buzz', 'a bee'], ['moo', 'a cow'], ['quack', 'a duck'], ['hiss', 'a snake'], ['splash', 'a jump in a pool'], ['boom', 'a big drum'], ['honk', 'a car horn'], ['woof', 'a dog'], ['pop', 'a balloon'], ['crash', 'falling blocks']];
  var SOUNDS = SOUND_OF.map(function (s) { return s[0]; });
  var PLAIN = ['tree', 'blue', 'jump', 'happy', 'table', 'garden', 'slow', 'green', 'chair', 'sock', 'little', 'yard'];
  var SAME_START = [['Silly Sam sings songs.', 'Sam sings a song for us.'], ['Big bears bake bread.', 'The bear makes bread.'], ['Five frogs found food.', 'The frogs ate some food.'],
    ['Many moose munch moss.', 'A moose eats moss.'], ['Tiny turtles tap toes.', 'The turtle is very small.'], ['Lucky Leo licks lemons.', 'Leo has a lemon.'],
    ['Pink pigs play piano.', 'The pigs can play.'], ['Dizzy ducks dance daily.', 'The duck likes to dance.'], ['Red robins run races.', 'A robin is a bird.'], ['Happy hens hop high.', 'The hen can hop.']];
  /* a short text, how someone feels, wrong feelings, and the words that show it */
  var FEEL = [['Mia' + AP + 's ice cream fell on the ground. She looked down at it.', 'sad', ['happy', 'proud'], 'fell on the ground'],
    ['Liam jumped up and down. ' + Q1 + 'I can' + AP + 't wait for my party!' + Q2 + ' he said.', 'excited', ['bored', 'sad'], 'jumped up and down'],
    ['Zara heard a loud bang in the dark. She hid under her blanket.', 'scared', ['happy', 'sleepy'], 'hid under her blanket'],
    ['Owen finished his puzzle all by himself. He smiled and showed his mom.', 'proud', ['angry', 'scared'], 'smiled and showed'],
    ['Priya yawned. Her eyes kept closing.', 'tired', ['excited', 'angry'], 'eyes kept closing'],
    ['Kai stomped his feet. His tower fell over again!', 'angry', ['sleepy', 'proud'], 'stomped his feet'],
    ['Noor hugged her new puppy and laughed.', 'happy', ['scared', 'sad'], 'hugged her new puppy'],
    ['Theo looked out the window. All his friends were gone.', 'lonely', ['excited', 'proud'], 'friends were gone']];
  /* [who, what they say, what they think, other ideas, the words that show it] */
  var VIEWS = [['Omar', Q1 + 'Winter is the best! I love skating and sledding.' + Q2, 'Winter is great.', ['Winter is boring.', 'Summer is the best.'], 'Winter is the best'],
    ['Hana', Q1 + 'I do not like loud places. The library is my favourite spot.' + Q2, 'Quiet places are best.', ['Loud places are fun.', 'The library is too noisy.'], 'favourite spot'],
    ['Mateo', Q1 + 'Dogs are the best pets. They play with you every day.' + Q2, 'Dogs make great pets.', ['Cats make the best pets.', 'Pets are too much work.'], 'best pets'],
    ['Sofia', Q1 + 'I love rainy days. I can jump in puddles!' + Q2, 'Rainy days are fun.', ['Rain is no fun.', 'Sunny days are best.'], 'love rainy days'],
    ['Ethan', Q1 + 'Broccoli is yucky. I do not like green food.' + Q2, 'Broccoli is not good.', ['Broccoli is yummy.', 'Green food is the best.'], 'Broccoli is yucky'],
    ['Amara', Q1 + 'Reading is my favourite thing. I read every night.' + Q2, 'Reading is great.', ['Reading is boring.', 'Books are too long.'], 'my favourite thing']];
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function q(s) { return Q1 + s + Q2; }
  function at(t, words) { for (var i = 0; i < t.lines.length; i++) if (t.lines[i] && t.lines[i].charAt(0) !== '#' && t.lines[i].indexOf(words) >= 0) return i; return -1; }
  function bare(s) { return s.replace(/[.,!?]/g, ''); }

  /* ---------- titles and symbols (C1.3) ---------- */
  function titleTells(lv) {
    var t = R.pick(TITLES);
    return Q.one('What will a book called <b>' + t[0] + '</b> be about?', t[1], t[2].slice(0, lv > 1 ? 2 : 1), { prompt: 'What words in the title are clues?', hint: 'The title tells you the topic.',
      explain: 'The title is a clue: ' + t[1] + '.', meta: { k: 'g1-title-tells', t: t[0] } });
  }
  function titleFor(lv) {
    var t = R.pick(TITLES);
    return Q.tiles('Which title fits a book about <b>' + t[1] + '</b>?', t[0], R.some(TITLES.filter(function (x) { return x !== t; }), lv > 1 ? 2 : 1).map(function (x) { return x[0]; }), {
      hint: 'Which title names the topic?', explain: '<b>' + t[0] + '</b> tells you the topic.', meta: { k: 'g1-title-for', about: t[1] } });
  }
  function titleTf() {
    var t = R.pick(TITLES), right = R.int(0, 1) === 1, said = right ? t[1] : R.pick(t[2]);
    return { q: 'A book is called <b>' + t[0] + '</b>. ' + Q.name() + ' says it will be about ' + said + '.', type: 'tf', answer: right,
      why: { options: ['The title is a clue to that.', 'The title is about something else.'], answer: right ? 0 : 1 },
      hint: 'What does the title say?', explain: 'It will be about ' + t[1] + '.', meta: { k: 'g1-title-tf', t: t[0], said: said } };
  }
  function symbolMeans() {
    var s = R.pick(SYMBOLS);
    return Q.tiles('What does this symbol mean?', s[1], R.some(SYMBOLS.filter(function (x) { return x !== s; }), 2).map(function (x) { return x[1]; }), { fig: W.tile(s[0]),
      hint: 'Where have you seen it?', explain: s[0] + ' means <b>' + s[1] + '</b>.', meta: { k: 'g1-symbol', s: W.tile(s[0]) } });
  }
  function stepsWhy() {
    var t = R.pick(T.list('order').filter(function (x) { return x.kind === 'instructions'; }));
    return Q.one('Why do these instructions have numbers?', 'to show the order of the steps', ['to count the pages', 'to make it look nice'], { fig: T.show(t),
      hint: 'What would happen if you did the steps in a mixed-up order?', explain: 'The numbers show what to do first, next and last.', meta: { k: 'g1-steps-why', t: t.title } });
  }

  /* ---------- pictures and words (C1.4) ---------- */
  function picMatch(lv) {
    var p = R.pick(PICS), wrong = R.some(PICS.filter(function (x) { return x !== p; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), names = R.shuffle([p[1]].concat(wrong));
    return { q: 'Which picture goes with the sentence?', type: 'tap', tiles: names.map(function (n) { return W.pic(n); }), answer: names.indexOf(p[1]), answerText: p[1], fig: W.sent(p[0]),
      prompt: 'Which word in the sentence names something you could draw?', hint: 'Find the naming word. Find its picture.', explain: W.pic(p[1]), meta: { k: 'g1-pic-match', s: p[0] } };
  }
  function picSentence(lv) {
    var p = R.pick(PICS);
    return Q.one('Which sentence goes with the picture?', p[0], R.some(PICS.filter(function (x) { return x !== p; }), lv > 1 ? 2 : 1).map(function (x) { return x[0]; }), { fig: W.pic(p[1]),
      hint: 'What does the picture show? Find that word.', explain: W.sent(p[0].replace(p[1], '<mark class="hl">' + p[1] + '</mark>')), meta: { k: 'g1-pic-sentence', pic: p[1] } });
  }
  function picWord(lv) {
    var p = R.pick(PICS), others = bare(p[0]).split(' ').filter(function (w) { return w !== p[1] && LITTLE.indexOf(w) < 0 && w.length > 2; });
    return Q.tiles('Which word does the picture show?', p[1], R.some(others, lv > 1 ? 2 : 1), { fig: W.pic(p[1]) + W.sent(p[0]),
      hint: 'Look at the picture. Find that thing in the sentence.', explain: 'The picture shows the <b>' + p[1] + '</b>.', meta: { k: 'g1-pic-word', s: p[0] } });
  }
  function picTf() {
    var p = R.pick(PICS), right = R.int(0, 1) === 1, shown = right ? p[1] : R.pick(PICS.filter(function (x) { return x !== p; }))[1];
    return { q: 'Does the picture go with the sentence?', fig: W.pic(shown) + W.sent(p[0]), type: 'tf', answer: right,
      why: { options: ['The picture shows something in the sentence.', 'The picture shows something else.'], answer: right ? 0 : 1 },
      hint: 'Is the thing in the picture in the sentence?', explain: W.pic(p[1]), meta: { k: 'g1-pic-tf', s: p[0], pic: shown } };
  }

  /* ---------- words that paint a picture (C1.5) ---------- */
  function wordChoice(lv) {
    var v = R.pick(VIVID), other = R.pick(VIVID.filter(function (x) { return x !== v; }));
    return Q.one('Which sentence helps you <b>picture it</b> best?', v[1], [v[0]].concat(lv > 1 ? [other[0]] : []), { prompt: 'Which words tell what it looks like, or how it moves?',
      hint: 'Look for describing words and strong action words.', explain: W.sent(v[1].replace(new RegExp('\\b(' + v[2].join('|') + ')\\b', 'g'), '<b>$1</b>')), meta: { k: 'g1-word-choice' } });
  }
  function vividWord(lv) {
    var v = R.pick(VIVID), little = bare(v[1]).split(' ').filter(function (w) { return LITTLE.indexOf(w) >= 0; });
    return Q.tiles('Which word helps you <b>picture</b> it?', R.pick(v[2]), R.some(little.filter(function (w, i) { return little.indexOf(w) === i; }), lv > 1 ? 2 : 1), { fig: W.sent(v[1]),
      prompt: 'Which word tells how it looks, feels or moves?', hint: 'Small words like "the" do not paint a picture.', explain: 'Picture words: <b>' + v[2].join(', ') + '</b>.', meta: { k: 'g1-vivid-word', s: v[1] } });
  }
  function pickVivid() {
    var v = R.pick(VIVID), little = bare(v[1]).split(' ').filter(function (w, i, all) { return LITTLE.indexOf(w) >= 0 && all.indexOf(w) === i; });
    return Q.all('Pick every word that helps you picture it.', R.some(v[2], 2), R.some(little, 2), { fig: W.sent(v[1]), hint: 'Which words tell how it looks, feels or moves?',
      explain: 'Picture words: <b>' + v[2].join(', ') + '</b>.', meta: { k: 'g1-pick-vivid', s: v[1] } });
  }
  function vividTf() {
    var v = R.pick(VIVID), right = R.int(0, 1) === 1, said = right ? v[1] : v[0];
    return { q: Q.name() + ' says this sentence paints a picture:', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['It tells how it looks or moves.', 'It does not tell much.'], answer: right ? 0 : 1 },
      hint: 'Can you see it in your head?', explain: 'This one paints a picture: ' + v[1], meta: { k: 'g1-vivid-tf', said: said } };
  }

  /* ---------- rhyming words (C3.1) ---------- */
  function rhyme(lv) {
    var f = R.pick(RHYME), w = f[0], right = R.pick(f.slice(1)), others = RHYME.filter(function (x) { return x !== f; });
    return Q.one('Which word <b>rhymes</b> with <b>' + w + '</b>?', right, R.some(others, lv > 1 ? 3 : 2).map(function (x) { return x[0].charAt(0) === w.charAt(0) ? x[1] : x[0]; }), {
      prompt: 'Say both words. Do they end with the same sound?', hint: 'Rhyming words sound the same at the end.', explain: '<b>' + w + '</b> and <b>' + right + '</b> rhyme.', meta: { k: 'g1-rhyme', w: w } });
  }
  function rhymePoem() {
    var t = R.pick(T.list('rhyme')), r = R.pick(t.rhyme.slice(0, 2));
    return Q.one('In the poem, which word rhymes with <b>' + r[1] + '</b>?', r[0], R.some(t.plain, 2), { fig: T.show(t), hint: 'Look at the ends of the lines.', explain: '<b>' + r[0] + '</b> and <b>' + r[1] + '</b> rhyme.', meta: { k: 'g1-rhyme-poem', t: t.title, w: r[1] } });
  }
  function rhymeOdd(lv) {
    var f = R.pick(RHYME), odd = R.pick(R.pick(RHYME.filter(function (x) { return x !== f; })));
    return Q.tiles('Which word does <b>not</b> rhyme?', odd, R.some(f, lv > 1 ? 3 : 2), { hint: 'Say them all. Which one ends with a different sound?',
      explain: '<b>' + odd + '</b> ends with a different sound.', meta: { k: 'g1-rhyme-odd', odd: odd } });
  }
  function matchRhyme() {
    return { q: 'Match the words that rhyme.', type: 'match', pairs: R.some(RHYME, 3).map(function (f) { var two = R.some(f, 2); return [two[0], two[1]]; }),
      hint: 'Say each pair. Do the ends sound the same?', explain: 'Rhyming words end with the same sound.', meta: { k: 'g1-match-rhyme' } };
  }

  /* ---------- sound words (C3.1) ---------- */
  function soundWord(lv) {
    return Q.one('Which is a <b>sound word</b>?', R.pick(SOUNDS), R.some(PLAIN, lv > 1 ? 3 : 2), { prompt: 'Say each word. Which one sounds like the noise it names?', hint: 'A sound word sounds like the noise.',
      explain: 'Sound words copy a sound, like buzz or splash.', meta: { k: 'g1-sound-word' } });
  }
  function pickSound() {
    return Q.all('Pick every <b>sound word</b>.', R.some(SOUNDS, 2), R.some(PLAIN, 2), { hint: 'Which ones make a noise when you say them?', explain: 'Sound words copy a sound.', meta: { k: 'g1-pick-sound' } });
  }
  function soundInText(lv) {
    var t = R.pick(T.list('sound')), w = R.pick(t.sound), plain = T.body(t).join(' ').replace(/[.,!?“”]/g, '').split(' ').filter(function (x) { return x.length > 3 && t.sound.join(' ').toLowerCase().split(' ').indexOf(x.toLowerCase()) < 0; });
    return Q.tiles('Which word in the text is a <b>sound word</b>?', w, R.some(plain.filter(function (x, i) { return plain.indexOf(x) === i; }), lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Which word sounds like a noise?', explain: '<b>' + w + '</b> sounds like the noise.', meta: { k: 'g1-sound-in-text', t: t.title } });
  }
  function matchSound() {
    return { q: 'Match each sound word to what makes it.', type: 'match', pairs: R.some(SOUND_OF, 3).map(function (s) { return [s[0], s[1]]; }),
      hint: 'Say the sound. What makes that noise?', explain: 'Sound words copy a real noise.', meta: { k: 'g1-match-sound' } };
  }

  /* ---------- words that start the same (C3.1) ---------- */
  function sameStart(lv) {
    var s = R.pick(SAME_START), other = R.pick(SAME_START.filter(function (x) { return x !== s; }));
    return Q.one('Which sentence has words that all <b>start with the same sound</b>?', s[0], [s[1]].concat(lv > 1 ? [other[1]] : []), { hint: 'Say the first sound of each word.',
      explain: W.sent(s[0]) + ': the same first sound again and again.', meta: { k: 'g1-same-start' } });
  }
  function sameStartFill(lv) {
    var s = R.pick(SAME_START), w = bare(s[0]).split(' '), last = w.pop(), c = last.charAt(0).toLowerCase();
    var wrong = SAME_START.map(function (x) { return bare(x[0]).split(' ').pop(); }).filter(function (x) { return x.charAt(0).toLowerCase() !== c; });
    return Q.tiles('Which word finishes it, so every word starts the same?', last, R.some(wrong, lv > 1 ? 2 : 1), { fig: W.sent(w.join(' ') + ' ' + W.gap() + '.'),
      hint: 'Say the first sound of each word.', explain: W.sent(s[0]), meta: { k: 'g1-same-fill', s: w.join(' ') } });
  }
  function sameStartLetter() {
    var s = R.pick(SAME_START), c = s[0].charAt(0).toLowerCase(), other = R.some(SAME_START.map(function (x) { return x[0].charAt(0).toLowerCase(); }).filter(function (x, i, a) { return x !== c && a.indexOf(x) === i; }), 2);
    return Q.tiles('Every word starts with the same sound. Which letter makes it?', c, other, { fig: W.sent(s[0]), hint: 'Look at the first letter of each word.',
      explain: 'Each word starts with <b>' + c + '</b>.', meta: { k: 'g1-same-letter', s: s[0] } });
  }
  function sameStartTf() {
    var s = R.pick(SAME_START), right = R.int(0, 1) === 1, said = right ? s[0] : s[1];
    return { q: Q.name() + ' says every word here starts with the same sound:', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['Each word starts the same.', 'Some words start with a different sound.'], answer: right ? 0 : 1 },
      hint: 'Say the first sound of each word.', explain: W.sent(s[0]) + ' starts the same every time.', meta: { k: 'g1-same-tf', said: said } };
  }

  /* ---------- find the feeling (C3.2) ---------- */
  function feeling(lv) {
    var f = R.pick(FEEL);
    return Q.tiles('How does this person feel?', f[1], f[2].concat(lv > 1 ? [R.pick(['hungry', 'cold'])] : []), { fig: W.passage('', [f[0]]), prompt: 'Look for a clue: what do they do?',
      hint: 'The text does not say the feeling. What do they do?', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g1-feeling', text: f[0] } });
  }
  function feelClue(lv) {
    var f = R.pick(FEEL), others = R.some(FEEL.filter(function (x) { return x !== f; }), lv > 1 ? 2 : 1).map(function (x) { return x[3]; });
    return Q.one('This person feels <b>' + f[1] + '</b>. Which words show it?', f[3], others, { fig: W.passage('', [f[0]]), hint: 'Which words are in the text?',
      explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g1-feel-clue', text: f[0] } });
  }
  function textFeel(lv) {
    var t = R.pick(T.list('infer', lv)), f = R.pick(t.infer);
    return Q.one(f[0], f[1], [f[2]], { fig: T.show(t), prompt: 'What does the character do or say?', hint: 'What does the character do or say?', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g1-text-feel', t: t.title, q: f[0] } });
  }
  function feelTap(lv) {
    var t = R.pick(T.list('infer', lv)), f = R.pick(t.infer), i = at(t, f[3]);
    return { q: f[0] + ' <b>' + cap(f[1]) + '.</b> Tap the sentence that shows it.', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'What does the character do or say?', hint: 'Find what the character does or says.', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g1-feel-tap', t: t.title, q: f[0] } };
  }
  function feelTf() {
    var f = R.pick(FEEL), right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(f[2]);
    return { q: Q.name() + ' says this person feels <b>' + said + '</b>.', fig: W.passage('', [f[0]]), type: 'tf', answer: right,
      why: { options: ['A clue in the text shows it.', 'The clues show a different feeling.'], answer: right ? 0 : 1 },
      hint: 'What do they do?', explain: 'They feel ' + f[1] + '. The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g1-feel-tf', text: f[0], said: said } };
  }

  /* ---------- what happened, in order (C3.3) ---------- */
  function events(t, lv) { return t.order.length > 3 && lv < 2 ? t.order.slice(0, 3) : t.order.slice(0, 5); }
  function story(lv) { return R.pick(T.list('order', lv).filter(function (x) { return x.order.length >= 4; })); }
  function sequence(lv) {
    var t = R.pick(T.list('order', lv)), ev = events(t, lv);
    return { q: 'Put these in the order they happen.', fig: T.show(t), type: 'order', items: ev.map(q), first: 'First', last: 'Last',
      hint: 'Find each part in the text. Which comes first?', explain: W.chain(ev.map(q)), meta: { k: 'g1-order', t: t.title } };
  }
  function firstLast(lv) {
    var t = story(lv), ev = events(t, 2), idx = R.some(ev.map(function (e, i) { return i; }), 3).sort(), first = R.int(0, 1) === 1, right = ev[first ? idx[0] : idx[2]];
    return Q.tiles('Which happened <b>' + (first ? 'first' : 'last') + '</b>?', q(right), idx.map(function (i) { return q(ev[i]); }).filter(function (x) { return x !== q(right); }), { fig: T.show(t),
      hint: 'Find each one in the text. Which comes ' + (first ? 'before' : 'after') + ' the others?', explain: W.chain(idx.map(function (i) { return q(ev[i]); })), meta: { k: 'g1-first-last', t: t.title, first: first } });
  }
  function after(lv) {
    var t = story(lv), ev = events(t, 2), i = R.int(0, ev.length - 2), wrong = ev.filter(function (e, j) { return j !== i && j !== i + 1; });
    return Q.one('What happens <b>right after</b> this? ' + q(ev[i]), q(ev[i + 1]), R.some(wrong, 2).map(q), { fig: T.show(t), prompt: 'Find it in the text. Read the next part.',
      hint: 'Find it in the text, then read on.', explain: W.chain([q(ev[i]), q(ev[i + 1])], ['Then', 'Next']), meta: { k: 'g1-after', t: t.title } });
  }
  function storyMap(lv) {
    var t = story(lv), ev = events(t, 2), i = R.int(1, ev.length - 2), other = R.pick(T.list('order').filter(function (x) { return x !== t; }));
    return Q.one('What goes in the empty box?', q(ev[i]), R.some(other.order, 2).map(q), { fig: W.chain([q(ev[i - 1]), W.gap(), q(ev[i + 1])]) + T.show(t),
      hint: 'What happens between the two boxes?', explain: W.chain([q(ev[i - 1]), q(ev[i]), q(ev[i + 1])]), meta: { k: 'g1-map', t: t.title } });
  }

  /* ---------- what does someone think? (C3.5) ---------- */
  function view(lv) {
    var v = R.pick(VIEWS);
    return Q.one('What does <b>' + v[0] + '</b> think?', v[2], v[3].slice(0, lv > 1 ? 2 : 1), { fig: W.means('talk', v[1]), prompt: 'Look for words like best, love or do not like.', hint: 'Look for words like best, love or do not like.',
      explain: v[0] + ' thinks: ' + v[2], meta: { k: 'g1-view', who: v[0] } });
  }
  function viewClue(lv) {
    var v = R.pick(VIEWS), others = R.some(VIEWS.filter(function (x) { return x !== v; }), lv > 1 ? 2 : 1).map(function (x) { return x[4]; });
    return Q.one(v[0] + ' thinks: <b>' + v[2] + '</b> Which words show it?', v[4], others, { fig: W.means('talk', v[1]), hint: 'Which words are in what ' + v[0] + ' says?',
      explain: 'The clue: <mark class="hl">' + v[4] + '</mark>.', meta: { k: 'g1-view-clue', who: v[0] } });
  }
  function viewTf() {
    var v = R.pick(VIEWS), right = R.int(0, 1) === 1, said = right ? v[2] : R.pick(v[3]);
    return { q: Q.name() + ' says ' + v[0] + ' thinks this: <b>' + said + '</b>', fig: W.means('talk', v[1]), type: 'tf', answer: right,
      why: { options: [v[0] + ' says so.', v[0] + ' says something else.'], answer: right ? 0 : 1 },
      hint: 'What does ' + v[0] + ' say?', explain: v[0] + ' thinks: ' + v[2], meta: { k: 'g1-view-tf', who: v[0], said: said } };
  }
  function letterView() {
    var t = R.pick(T.list('view')), v = t.view;
    return Q.one('What does <b>' + v.who + '</b> think about ' + v.about + '?', v.thinks, v.wrong, { fig: T.show(t), hint: 'Look for a clue: <b>' + v.clue + '</b>.',
      explain: 'The clue: <mark class="hl">' + v.clue + '</mark>.', meta: { k: 'g1-letter-view', t: t.title } });
  }

  var kite = T.kite;
  Atlas.register('thinking', {
    full: true,
    lessons: [{
      id: 'features', title: 'Titles, pictures and words', sub: 'How titles, symbols, pictures and word choice help you understand.',
      concepts: [
        { slug: 'titles', title: 'Titles and symbols give clues', exp: ['C1.3'], skill: 'titles',
          model: [
            step(W.sent('Bears in Winter'), 'Read the title first.'),
            step(W.means('think', 'how bears live in the cold months'), 'Bears + Winter: now I know the topic.'),
            step(W.tile('+') + W.tile('&rarr;') + W.tile('?'), 'Symbols are small clues too.'),
            step(W.means('think', 'add, go this way, a question')),
            step(T.show(T.seed), 'Numbers: 1, 2, 3, 4.'),
            step(W.chain(['Fill', 'Push', 'Water', 'Sun']), 'They show the order.')
          ],
          guided: [function () { return titleTells(1); }, symbolMeans, function () { return titleFor(1); }],
          check: [stepsWhy, function () { return titleTells(2); }, symbolMeans, titleTf, function () { return titleFor(2); }],
          coach: '<p>Before reading, cover the pictures and read only the title. Ask: "What do you think it is about?"</p>',
          mistake: '<p>Ignoring the title and starting at the first page. Always read the title first.</p>' },
        { slug: 'pictures', title: 'Pictures and words go together', exp: ['C1.4'], skill: 'pictures',
          model: [
            step(W.sent('A bee buzzed near the flowers.'), 'Read the words.'),
            step(W.pic('bee'), 'The picture shows the bee.'),
            step(W.sent('A <mark class="hl">bee</mark> buzzed near the flowers.'), 'Picture and word match.'),
            step(W.pic('canoe'), 'Now the picture first.'),
            step(W.sent('Dad and I carried the <mark class="hl">canoe</mark>.'), 'Find its word.')
          ],
          guided: [function () { return picMatch(1); }, function () { return picSentence(1); }, function () { return picWord(1); }],
          check: [function () { return picMatch(2); }, function () { return picSentence(2); }, picTf, function () { return picWord(2); }, function () { return picMatch(3); }],
          coach: '<p>On each page, ask: "What does the picture show that the words do not?" and "What do the words tell that the picture does not?"</p>',
          mistake: '<p>Guessing the words from the picture only. Read the words, then check the picture.</p>' },
        { slug: 'word-choice', title: 'Words that paint a picture', exp: ['C1.5'], skill: 'word-choice',
          model: [
            step(W.sent('The dog was on the grass.'), 'Hard to picture.'),
            step(W.sent('The <b>fluffy white</b> puppy <b>rolled</b> in the <b>soft</b> grass.'), 'Now I can see it.'),
            step(W.sent('The car went.'), 'Which car? How?'),
            step(W.sent('The <b>shiny red</b> car <b>raced</b> down the road.'), 'Colour and speed.')
          ],
          guided: [function () { return wordChoice(1); }, function () { return vividWord(1); }, vividTf],
          check: [function () { return wordChoice(2); }, function () { return vividWord(2); }, pickVivid, vividTf, function () { return wordChoice(3); }],
          coach: '<p>Read a page aloud and ask: "Which words helped you see it in your head?"</p>',
          mistake: '<p>Choosing the shorter sentence because it is easier. Ask which one you can picture better.</p>' }
      ]
    }, {
      id: 'sound-play', title: 'Playing with sounds', sub: 'Rhyme, sound words, and words that start the same.',
      concepts: [
        { slug: 'rhyme', title: 'Rhyming words', exp: ['C3.1'], skill: 'rhyme',
          model: [
            step(W.tile(W.hl('cat', 1, 3)) + W.tile(W.hl('hat', 1, 3)), 'The ends sound the same.'),
            step(W.tile('cat') + W.tile('cup'), 'Same start, different end: no rhyme.'),
            step(T.show(T.moon), 'Poems use rhyme.'),
            step(W.tile(W.hl('night', 1, 5)) + W.tile(W.hl('bright', 2, 6)), 'Listen at the ends of the lines.')
          ],
          key: '<p>Rhymes make poems and songs fun to say.</p>',
          guided: [function () { return rhyme(1); }, function () { return rhymeOdd(1); }, rhymePoem],
          check: [function () { return rhyme(2); }, rhymePoem, matchRhyme, function () { return rhymeOdd(2); }, function () { return rhyme(3); }],
          coach: '<p>Say a word and take turns finding rhymes, even silly made-up ones.</p>',
          mistake: '<p>Choosing a word with the same start (cat, cup). Listen to the end of the word.</p>' },
        { slug: 'sound-words', title: 'Sound words', exp: ['C3.1'], skill: 'sound-words',
          model: [
            step(W.tile('buzz') + W.tile('splash') + W.tile('pop'), 'They sound like the noise.'),
            step(W.means('star', 'buzz: a bee'), 'Say it. Hear the bee?'),
            step(T.show(T.rain), 'Find them in a poem.'),
            step(W.sent('<b>Splash</b> in the puddle, <b>plop, plop, plop</b>.'), 'You can hear the rain.')
          ],
          guided: [function () { return soundWord(1); }, pickSound, matchSound],
          check: [function () { return soundWord(2); }, pickSound, function () { return soundInText(2); }, matchSound, function () { return soundWord(3); }],
          coach: '<p>Go on a sound walk. Make up words for what you hear: the bus goes "vroom", the door goes "creak".</p>',
          mistake: '<p>Picking any action word. Ask: "Does the word sound like the noise?"</p>' },
        { slug: 'same-start', title: 'Words that start the same', exp: ['C3.1'], skill: 'same-start',
          model: [
            step(W.sent(W.hl('Silly', 0, 1) + ' ' + W.hl('Sam', 0, 1) + ' ' + W.hl('sings', 0, 1) + ' ' + W.hl('songs', 0, 1) + '.'), 'The same first sound, again and again.'),
            step(W.icon('talk'), 'It is fun to say, and easy to remember.'),
            step(W.sent(W.hl('Big', 0, 1) + ' ' + W.hl('bears', 0, 1) + ' ' + W.hl('bake', 0, 1) + ' ' + W.gap() + '.'), 'What could come next?'),
            step(W.sent(W.hl('Big', 0, 1) + ' ' + W.hl('bears', 0, 1) + ' ' + W.hl('bake', 0, 1) + ' ' + W.hl('bread', 0, 1) + '.'), 'Another <b>b</b> word.')
          ],
          guided: [function () { return sameStart(1); }, function () { return sameStartFill(1); }, sameStartLetter],
          check: [function () { return sameStart(2); }, function () { return sameStartFill(2); }, sameStartTf, sameStartLetter, function () { return sameStart(3); }],
          coach: '<p>Make a silly sentence with the child' + AP + 's name: "Kai keeps kicking kites."</p>',
          mistake: '<p>Choosing a sentence with only two words that start the same. Look at every word.</p>' }
      ]
    }, {
      id: 'think', title: 'Thinking about what you read', sub: 'Feelings, what happened, and what someone thinks.',
      concepts: [
        { slug: 'feelings', title: 'Find the feeling', exp: ['C3.2'], skill: 'feelings',
          model: [
            step(W.passage('', [FEEL[0][0]]), 'It does not say how she feels.'),
            step(W.sent('<mark class="hl">fell on the ground</mark>'), 'A clue.'),
            step(W.tile('sad'), 'So Mia feels sad.'),
            step(T.show(T.hockey, 3), 'Another one.'),
            step(W.sent('Her tummy felt <mark class="hl">full of butterflies</mark>.'), 'Butterflies in your tummy?'),
            step(W.tile('nervous'), 'Ava is nervous.')
          ],
          guided: [function () { return feeling(1); }, function () { return feelClue(1); }, function () { return textFeel(1); }],
          check: [function () { return feeling(2); }, function () { return textFeel(2); }, feelTf, function () { return feelTap(2); }, function () { return feeling(3); }],
          coach: '<p>When reading, ask: "How do you think they feel? What made you think that?"</p>',
          mistake: '<p>Guessing a feeling with no clue. Ask the child to point to the words that show it.</p>' },
        { slug: 'order', title: 'What happened, in order', exp: ['C3.3'], skill: 'order',
          model: [
            step(T.show(kite), 'Read the story.'),
            step(W.chain([q('had a new kite')], ['First'])),
            step(W.chain([q('had a new kite'), q('ran across the big field'), q('clapped and smiled')], ['First', 'Next', 'Last']), 'Keep the order of the story.'),
            step(T.show(T.biscuit), 'A longer one.'),
            step(W.chain(['Not in his bed', 'Under the table', 'Behind the couch', 'A little sound', 'The closet']), 'Five boxes, one after another.')
          ],
          guided: [function () { return sequence(1); }, function () { return firstLast(1); }, function () { return after(1); }],
          check: [function () { return sequence(2); }, function () { return firstLast(2); }, function () { return after(2); }, function () { return storyMap(2); }, function () { return sequence(3); }],
          coach: '<p>Retell a story with three fingers: first, next, last.</p>',
          mistake: '<p>Putting the most exciting part first. Find each part in the text to check.</p>' },
        { slug: 'view', title: 'What does someone think?', exp: ['C3.5'], skill: 'view',
          model: [
            step(W.means('talk', VIEWS[0][1])),
            step(W.sent('<mark class="hl">Winter is the best</mark>'), 'A clue.'),
            step(W.sent('Omar thinks winter is great.'), 'Someone else might think something different.'),
            step(T.show(T.garden), 'A letter.'),
            step(W.sent('<mark class="hl">I think our school should</mark> have a garden.'), '"I think" shows it.')
          ],
          guided: [function () { return view(1); }, function () { return viewClue(1); }, letterView],
          check: [function () { return view(2); }, letterView, viewTf, function () { return viewClue(2); }, function () { return view(3); }],
          coach: '<p>Ask: "What does this character think? Do you agree? Would someone else think the same?"</p>',
          mistake: '<p>Giving their own opinion instead of the character' + AP + 's. Ask: "What does Omar think?"</p>' }
      ]
    }],
    practice: [
      { id: 'titles', name: 'Titles and symbols', code: 'C1.3', gen: titleTells },
      { id: 'pictures', name: 'Pictures and words', code: 'C1.4', gen: picMatch },
      { id: 'word-choice', name: 'Words that paint a picture', code: 'C1.5', gen: wordChoice },
      { id: 'rhyme', name: 'Rhyming words', code: 'C3.1', gen: rhyme },
      { id: 'sound-words', name: 'Sound words', code: 'C3.1', gen: soundWord },
      { id: 'same-start', name: 'Words that start the same', code: 'C3.1', gen: sameStart },
      { id: 'feelings', name: 'Find the feeling', code: 'C3.2', gen: feeling },
      { id: 'order', name: 'What happened, in order', code: 'C3.3', gen: sequence },
      { id: 'view', name: 'What does someone think?', code: 'C3.5', gen: view }
    ],
    tasks: [
      { id: 'culture', title: 'Celebrations in books', code: 'C3.4', pic: W.icon('people'), say: 'Read a book about a celebration. What does it show is important?',
        run: ['Choose a picture book about a family celebration, ideally one like the child' + AP + 's own and one that is different.', 'Talk about the symbols in it (food, clothing, music, decorations) and what they mean to the family.', 'Ask: "What is important to this family? How do you know?"'],
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
    titles: [[1, 'title-for', titleFor], [1, 'symbol', symbolMeans], [1, 'steps', stepsWhy], [2, 'tf', titleTf]],
    pictures: [[1, 'sentence', picSentence], [1, 'word', picWord], [2, 'tf', picTf]],
    'word-choice': [[1, 'word', vividWord], [2, 'pick', pickVivid], [1, 'tf', vividTf]],
    rhyme: [[1, 'odd', rhymeOdd], [1, 'poem', rhymePoem], [2, 'match', matchRhyme]],
    'sound-words': [[1, 'pick', pickSound], [2, 'in-text', soundInText], [1, 'match', matchSound]],
    'same-start': [[1, 'fill', sameStartFill], [1, 'letter', sameStartLetter], [2, 'tf', sameStartTf]],
    feelings: [[1, 'clue', feelClue], [2, 'text', textFeel], [2, 'tap', feelTap], [1, 'tf', feelTf]],
    order: [[1, 'first-last', firstLast], [1, 'after', after], [2, 'story-map', storyMap]],
    view: [[1, 'clue', viewClue], [1, 'tf', viewTf], [2, 'letter', letterView]]
  });
})();
