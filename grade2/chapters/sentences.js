/* Grade 2: sentences.
   Ontario 2023 Language, Grade 2:
   B3.1 "identify and construct declarative, imperative, interrogative, and exclamatory sentences, including compound sentences"
   B3.2 (in part) "... the functions of parts of speech in sentences, including ... conjunctions ..." (and, but, or, so join two sentences)
   For the child: telling, asking, command and strong feeling sentences.
   All sentences are written for this site. Answer checks: tests/verify/grade2-sentences.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var KINDS = ['Telling', 'Asking', 'Command', 'Strong feeling'];
  var S = {
    Telling: ['The frog sat on a log.', 'We have a new puppy.', 'My aunt lives in Moncton.', 'The milk is cold.', 'Rain fell all night.', 'Owen plays the drum.', 'The leaves are orange.', 'Our school has a garden.', 'Mei likes to swim.', 'The moon is full tonight.'],
    Asking: ['Is the bus here?', 'Can I have a turn?', 'Where are my mittens?', 'Do you want to play?', 'Who is at the door?', 'What is for lunch?', 'Are you ready?', 'Does your dog bark?', 'Can we go outside?', 'Where is the library?'],
    Command: ['Shut the gate.', 'Hang up your coat.', 'Please feed the fish.', 'Sit down, please.', 'Brush your teeth.', 'Wash your hands.', 'Close the window.', 'Please pass the salt.', 'Put on your boots.', 'Wait for me.'],
    'Strong feeling': ['That was amazing!', 'Wow, a shooting star!', 'I am so excited!', 'We won!', 'What a huge pumpkin!', 'Hooray, it snowed!', 'Ouch, that hurt!', 'I love this song!']
  };
  var MARK = { Telling: '.', Asking: '?', 'Strong feeling': '!' };
  /* telling sentences and the asking sentence made from each */
  var TURN = [['The bus is here.', 'Is the bus here?'], ['You can swim.', 'Can you swim?'], ['The cat is hungry.', 'Is the cat hungry?'], ['We are late.', 'Are we late?'],
    ['Kai can skate.', 'Can Kai skate?'], ['The soup is hot.', 'Is the soup hot?'], ['They are at the park.', 'Are they at the park?'], ['Ava can come.', 'Can Ava come?']];
  /* [first part, second part, the joining word, endings that do not fit (so and but only)] */
  var JOIN = [
    ['The sun came out', 'the snow melted', 'so', ['my brother likes salad', 'Priya played chess']], ['Ava was thirsty', 'she drank some water', 'so', ['the rain poured down', 'it did not rain']],
    ['Our dog was muddy', 'we gave him a bath', 'so', ['my brother likes salad', 'it did not rain']], ['It was cold', 'I wore my mittens', 'so', ['he did not win', 'Priya played chess']],
    ['The bus was late', 'we were late for school', 'so', ['my brother likes salad', 'she kept playing']],
    ['I like soup', 'my brother likes salad', 'but', ['the snow melted', 'we gave him a bath']], ['The pond looked frozen', 'the ice was thin', 'but', ['she drank some water', 'Priya played chess']],
    ['Theo ran fast', 'he did not win', 'but', ['the snow melted', 'I wore my mittens']], ['The sky was grey', 'it did not rain', 'but', ['we gave him a bath', 'she drank some water']],
    ['Mei was tired', 'she kept playing', 'but', ['the snow melted', 'we gave him a bath']],
    ['We can walk', 'we can take the bus', 'or'], ['You can draw', 'you can paint', 'or'], ['Do you want milk', 'do you want juice', 'or'], ['We can play tag', 'we can play catch', 'or'],
    ['Mei likes to paint', 'she likes to sing', 'and'], ['The wind howled', 'the rain poured down', 'and'], ['Sam read a book', 'Priya played chess', 'and'], ['Grandpa baked bread', 'Grandma made soup', 'and']
  ];
  var MEANING = { and: 'adds more', but: 'shows a surprise', or: 'gives a choice', so: 'tells what happened because of it' };
  var SIMPLE = ['The cat slept.', 'We ate lunch.', 'Kai has a red hat.', 'The bus is late.', 'Hana jumped in the pile of leaves.', 'My tall brother plays hockey.'];
  /* asking words that do not fit each sentence's gap */
  var NOFIT = { 'Is the bus here?': ['Do', 'Who', 'Does'], 'Can I have a turn?': ['Is', 'Who', 'Are'], 'Where are my mittens?': ['Is', 'Does', 'Can'], 'Do you want to play?': ['Is', 'Who', 'Are'],
    'Who is at the door?': ['Do', 'Does', 'Can'], 'What is for lunch?': ['Do', 'Can', 'Are'], 'Are you ready?': ['Do', 'Does', 'Can'], 'Does your dog bark?': ['Is', 'Are', 'Who'],
    'Can we go outside?': ['Is', 'Are', 'Who'], 'Where is the library?': ['Do', 'Can', 'Does'] };
  function endOf(j) { return /^Do /.test(j[0]) ? '?' : '.'; }
  function joined(j) { return j[0] + ', ' + j[2] + ' ' + j[1] + endOf(j); }
  function gapped(j) { return j[0] + ', ' + W.gap() + ' ' + j[1] + endOf(j); }
  function cap(x) { return x.charAt(0).toUpperCase() + x.slice(1); }
  function two(j) { return W.sent(j[0] + endOf(j)) + W.sent(cap(j[1]) + endOf(j)); }

  /* ---------- four kinds of sentences ---------- */
  function kind(lv) {
    var k = R.pick(lv > 1 ? KINDS : ['Telling', 'Asking', 'Strong feeling']), s = R.pick(S[k]);
    return { q: 'What kind of sentence is this?', fig: W.sent(s), type: 'tap', tiles: KINDS, answer: KINDS.indexOf(k), prompt: 'Look at the end mark and the first word.',
      hint: 'A command tells someone to do something.', explain: 'It is a <b>' + k.toLowerCase() + '</b> sentence.', meta: { k: 'g2-kind', s: s } };
  }
  function endMark() {
    var k = R.pick(Object.keys(MARK)), s = R.pick(S[k]);
    return { q: 'Which mark ends this sentence?', fig: W.sent(s.slice(0, -1) + W.gap()), type: 'tap', tiles: ['.', '?', '!'], answer: ['.', '?', '!'].indexOf(MARK[k]),
      hint: 'Is it telling, asking, or showing strong feeling?', explain: W.sent(s), meta: { k: 'g2-end-mark', s: s } };
  }
  function matchKind() {
    var ks = R.some(KINDS, 3);
    return { q: 'Match each sentence to its kind.', type: 'match', pairs: ks.map(function (k) { return [R.pick(S[k]), k]; }), hint: 'Look at the end mark and the first word.',
      explain: 'A command starts with a doing word, or with please.', meta: { k: 'g2-match-kind' } };
  }
  function whichKind(lv) {
    var k = R.pick(KINDS), right = R.pick(S[k]), wrong = R.some(KINDS.filter(function (x) { return x !== k; }), lv > 1 ? 3 : 2).map(function (x) { return R.pick(S[x]); });
    return Q.one('Which one is a <b>' + k.toLowerCase() + '</b> sentence?', right, wrong, { hint: 'Look at the end mark and the first word.', explain: W.sent(right), meta: { k: 'g2-which-kind', want: k } });
  }
  function kindTf() {
    var k = R.pick(KINDS), s = R.pick(S[k]), right = R.int(0, 1) === 1, said = right ? k : R.pick(KINDS.filter(function (x) { return x !== k; }));
    return { q: Q.name() + ' says this is a <b>' + said.toLowerCase() + '</b> sentence.', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['The end mark and first word show it.', 'The end mark and first word show another kind.'], answer: right ? 0 : 1 },
      hint: 'Look at the end mark and the first word.', explain: 'It is a <b>' + k.toLowerCase() + '</b> sentence.', meta: { k: 'g2-kind-tf', s: s, said: said } };
  }

  /* ---------- a command tells someone what to do ---------- */
  function pickCommand(lv) {
    var right = R.some(S.Command, 2), wrong = [R.pick(S.Telling), R.pick(S.Asking)].concat(lv > 1 ? [R.pick(S['Strong feeling'])] : []);
    return Q.all('Pick every <b>command</b>.', right, wrong, { hint: 'A command tells someone to do something.', explain: 'Commands start with a doing word, or with please.', meta: { k: 'g2-pick-command' } });
  }
  function isCommand() {
    var yes = R.int(0, 1) === 1, s = R.pick(yes ? S.Command : S.Telling);
    return { q: 'Does this sentence tell someone to do something?', fig: W.sent(s), type: 'tap', tiles: ['Yes, it is a command.', 'No, it tells something.'], answer: yes ? 0 : 1,
      hint: 'Could you do it right now?', explain: yes ? 'A command: someone is told to do it.' : 'A telling sentence: it tells a fact.', meta: { k: 'g2-is-command', s: s } };
  }
  function commandWord() {
    var s = R.pick(S.Command.filter(function (x) { return !/^Please/.test(x); })), words = s.replace(/[.,]/g, '').split(' ');
    return Q.tiles('Which word tells you what to <b>do</b>?', words[0], words.slice(1).filter(function (w, i, all) { return w !== 'please' && all.indexOf(w) === i; }).slice(0, 2), { fig: W.sent(s),
      hint: 'A command often starts with the doing word.', explain: W.sent('<b>' + words[0] + '</b>' + s.slice(words[0].length)), meta: { k: 'g2-command-word', s: s } });
  }
  function commandTf() {
    var yes = R.int(0, 1) === 1, s = R.pick(yes ? S.Command : S.Telling.concat(S.Asking)), right = R.int(0, 1) === 1, saysCommand = right === yes;
    return { q: Q.name() + ' says this is ' + (saysCommand ? '' : '<b>not</b> ') + 'a command.', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['It tells someone to do something.', 'It does not tell anyone to do something.'], answer: yes ? 0 : 1 },
      hint: 'Is someone being told to do something?', explain: yes ? 'A command.' : 'Not a command.', meta: { k: 'g2-command-tf', s: s, says: saysCommand } };
  }

  /* ---------- build an asking sentence ---------- */
  function orderAsk() {
    var s = R.pick(S.Asking);
    return { q: 'Put the words in order to make an asking sentence.', type: 'order', items: s.split(' '), hint: 'An asking sentence often starts with Is, Can, Where, Do or Who.', explain: W.sent(s), meta: { k: 'g2-order-ask' } };
  }
  function turnAsk(lv) {
    var t = R.pick(TURN), v = t[1].split(' ')[0].toLowerCase(), plain = t[0].replace('.', ''),
      bad = [plain + '?'].concat(lv > 1 ? [plain.replace(' ' + v + ' ', ' ') + ' ' + v + '?'] : []);
    return Q.one('Turn it into an asking sentence.', t[1], bad, { fig: W.sent(t[0]), hint: 'Move the word is, are or can to the front.',
      explain: W.sent(t[0]) + ' &rarr; ' + W.sent(t[1]), meta: { k: 'g2-turn-ask', s: t[0] } });
  }
  function askWord(lv) {
    var s = R.pick(S.Asking), first = s.split(' ')[0];
    return Q.tiles('Which word starts this asking sentence?', first, R.some(NOFIT[s], lv > 1 ? 3 : 2), { fig: W.sent(W.gap() + ' ' + s.split(' ').slice(1).join(' ')),
      hint: 'Which one makes sense with the rest?', explain: W.sent(s), meta: { k: 'g2-ask-word', s: s } });
  }
  function askTf() {
    var t = R.pick(TURN), right = R.int(0, 1) === 1, shown = right ? t[1] : t[0].replace('.', '?');
    return { q: Q.name() + ' wrote this asking sentence. Is it right?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['The asking word comes first.', 'The asking word should come first.'], answer: right ? 0 : 1 },
      hint: 'Where is the word is, are or can?', explain: W.sent(t[1]), meta: { k: 'g2-ask-tf', shown: shown } };
  }

  /* ---------- join two sentences ---------- */
  function orderJoin() {
    var j = R.pick(JOIN);
    return { q: 'Make one sentence. Put the parts in order.', fig: two(j), type: 'order', items: [j[0] + ',', j[2], j[1] + endOf(j)], hint: 'Comma, then the joining word, in the middle.',
      explain: W.sent(joined(j)), meta: { k: 'g2-order-join', a: j[0] } };
  }
  function pickCompound(lv) {
    var j = R.pick(JOIN);
    return Q.one('Which sentence joins <b>two</b> ideas?', joined(j), R.some(SIMPLE, lv > 1 ? 2 : 1), { hint: 'Look for two parts that could each be a sentence, and a joining word.',
      explain: W.sent(joined(j).replace(', ' + j[2] + ' ', ', <b>' + j[2] + '</b> ')), meta: { k: 'g2-pick-compound', a: j[0] } });
  }
  function commaTf() {
    var j = R.pick(JOIN), right = R.int(0, 1) === 1, shown = right ? joined(j) : joined(j).replace(', ', ' ');
    return { q: 'Is this joined sentence written the right way?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['It has a comma before the joining word.', 'It is missing a comma before the joining word.'], answer: right ? 0 : 1 },
      hint: 'Look just before the joining word.', explain: W.sent(joined(j)), meta: { k: 'g2-comma-join', shown: shown, w: j[2] } };
  }
  function splitTwo() {
    var j = R.pick(JOIN), right = j[0] + endOf(j) + ' ' + cap(j[1]) + endOf(j), other = R.pick(JOIN.filter(function (x) { return x !== j; }));
    return Q.one('Which two sentences were joined to make this?', right, [j[0] + endOf(j) + ' ' + cap(other[1]) + endOf(other)], { fig: W.sent(joined(j)),
      hint: 'Find the joining word. What comes before it, and after?', explain: two(j), meta: { k: 'g2-split-two', a: j[0] } });
  }

  /* ---------- and, but, or, so ---------- */
  function joinWord(lv) {
    var j = R.pick(lv > 1 ? JOIN : JOIN.filter(function (x) { return x[2] !== 'or'; })), tiles = lv > 1 ? ['and', 'but', 'or', 'so'] : ['and', 'but', 'so'];
    return { q: 'Which word joins these best?', fig: W.sent(gapped(j)), type: 'tap', tiles: tiles, answer: tiles.indexOf(j[2]), prompt: 'Does it add more, show a surprise, give a choice, or tell what happened because of it?',
      hint: 'and adds more. but: a surprise. or: a choice. so: because of it.', explain: W.sent(joined(j)), meta: { k: 'g2-join', a: j[0] } };
  }
  function joinMeans() {
    var w = R.pick(Object.keys(MEANING)), j = R.pick(JOIN.filter(function (x) { return x[2] === w; }));
    return Q.tiles('What does <b>' + w + '</b> do in this sentence?', MEANING[w], Object.keys(MEANING).filter(function (x) { return x !== w; }).map(function (x) { return MEANING[x]; }).slice(0, 2), {
      fig: W.sent(joined(j)), hint: 'Read the sentence. How are the two parts linked?', explain: '<b>' + w + '</b> ' + MEANING[w] + '.', meta: { k: 'g2-join-means', w: w, a: j[0] } });
  }
  function joinFinish(lv) {
    var w = R.pick(['so', 'but']), j = R.pick(JOIN.filter(function (x) { return x[2] === w; })), wrong = lv > 1 ? j[3] : [R.pick(j[3])];
    return Q.one('Which ending fits?', j[1] + '.', wrong.map(function (x) { return x + '.'; }), { fig: W.sent(j[0] + ', <b>' + w + '</b> ' + W.gap()),
      hint: w + ' ' + MEANING[w] + '.', explain: W.sent(joined(j)), meta: { k: 'g2-join-finish', a: j[0] } });
  }
  function joinTf() {
    var j = R.pick(JOIN), right = R.int(0, 1) === 1, w = right ? j[2] : R.pick(['but', 'or', 'so'].filter(function (x) { return x !== j[2]; }));
    return { q: Q.name() + ' joined two sentences with <b>' + w + '</b>. Is it the best joining word?', fig: W.sent(j[0] + ', ' + w + ' ' + j[1] + endOf(j)), type: 'tf', answer: right,
      why: { options: [cap(w) + ' fits what the two parts mean.', 'Another joining word fits better.'], answer: right ? 0 : 1 },
      hint: 'Does it add more, show a surprise, give a choice, or tell what happened because of it?', explain: W.sent(joined(j)), meta: { k: 'g2-join-tf', a: j[0], w: w } };
  }

  Atlas.register('sentences', {
    full: true,
    lessons: [{
      id: 'kinds', title: 'Kinds of sentences', sub: 'Telling, asking, command, strong feeling.',
      concepts: [
        { slug: 'kinds', title: 'Four kinds of sentences', exp: ['B3.1'], skill: 'kinds',
          model: [
            step(W.sent('The frog sat on a log.'), '<b>Telling</b>. It ends with a period.'),
            step(W.sent('Is the bus here?'), '<b>Asking</b>. A question mark.'),
            step(W.sent('Wow, a shooting star!'), '<b>Strong feeling</b>. An exclamation mark.'),
            step(W.sent('Hang up your coat.'), 'A period, but it tells you to do something.'),
            step(W.tile('Command'), 'Look at the first word too.')
          ],
          guided: [function () { return kind(1); }, endMark, function () { return whichKind(1); }],
          check: [function () { return kind(2); }, endMark, kindTf, matchKind, function () { return whichKind(2); }],
          coach: '<p>Say a sentence aloud and have the child show a finger for its kind: one for telling, two for asking, three for strong feeling, four for a command.</p>',
          mistake: '<p>Calling any sentence with "!" a command. Look at what it does: a command tells someone to do something.</p>' },
        { slug: 'command', title: 'A command tells someone what to do', exp: ['B3.1'], skill: 'command',
          model: [
            step(W.sent('<b>Hang</b> up your coat.'), 'It starts with a doing word.'),
            step(W.sent('<b>Please</b> feed the fish.'), 'Or with please.'),
            step(W.sent('Owen plays the drum.'), 'Is anyone told to do something? No.'),
            step(W.sent('<b>Wash</b> your hands.'), 'Yes: you could do it right now.')
          ],
          guided: [isCommand, function () { return pickCommand(1); }, commandWord],
          check: [function () { return pickCommand(2); }, isCommand, commandTf, commandWord, function () { return pickCommand(3); }],
          coach: '<p>Play "Grown-up says": give commands (touch your nose, hop twice). Then let the child give you some.</p>',
          mistake: '<p>Mixing up commands and telling sentences. Ask: "Is someone being told to do something?"</p>' },
        { slug: 'ask-order', title: 'Build an asking sentence', exp: ['B3.1'], skill: 'asking',
          model: [
            step(W.tile('Can') + W.tile('I') + W.tile('have') + W.tile('a') + W.tile('turn?'), 'The asking word goes first.'),
            step(W.sent('Can I have a turn?')),
            step(W.sent('The bus <b>is</b> here.'), 'Now turn a telling sentence around.'),
            step(W.sent('<b>Is</b> the bus here?'), 'Move <b>is</b> to the front. Add a question mark.')
          ],
          guided: [orderAsk, function () { return turnAsk(1); }, function () { return askWord(1); }],
          check: [orderAsk, function () { return turnAsk(2); }, askTf, function () { return askWord(2); }, orderAsk],
          coach: '<p>Turn a telling sentence into a question together: "The bus is here." becomes "Is the bus here?"</p>',
          mistake: '<p>Leaving the asking word in the middle ("The bus is here?"). Start with Is, Can, Where, Do or Who.</p>' }
      ]
    }, {
      id: 'joining', title: 'Joining sentences', sub: 'Two short sentences become one longer one.',
      concepts: [
        { slug: 'compound', title: 'Join two sentences into one', exp: ['B3.1'], skill: 'joining',
          model: [
            step(W.sent('The sun came out.') + W.sent('The snow melted.')),
            step(W.sent('The sun came out<b>,</b> <b>so</b> the snow melted.'), 'A comma and a joining word.'),
            step(W.sent('It was cold.') + W.sent('I wore my mittens.'), 'Two more.'),
            step(W.sent('It was cold<b>,</b> <b>so</b> I wore my mittens.'), 'The period goes. The comma comes in.')
          ],
          guided: [orderJoin, function () { return pickCompound(1); }, splitTwo],
          check: [orderJoin, function () { return pickCompound(2); }, commaTf, splitTwo, function () { return pickCompound(3); }],
          coach: '<p>Write two short sentences on strips of paper. Cut off the period of the first, add a comma card and a joining word card, and slide them together.</p>',
          mistake: '<p>Joining with "and" every time ("and then and then"). Ask which joining word fits the meaning best.</p>' },
        { slug: 'join-words', title: 'and, but, or, so', exp: ['B3.1', 'B3.2'], skill: 'join-words',
          model: [
            step(W.sent('Sam read a book, <b>and</b> Priya played chess.'), '<b>and</b> adds more.'),
            step(W.sent('Theo ran fast, <b>but</b> he did not win.'), '<b>but</b>: a surprise.'),
            step(W.sent('We can walk, <b>or</b> we can take the bus.'), '<b>or</b>: a choice.'),
            step(W.sent('Ava was thirsty, <b>so</b> she drank some water.'), '<b>so</b>: because of it.')
          ],
          guided: [function () { return joinWord(1); }, joinMeans, function () { return joinFinish(1); }],
          check: [function () { return joinWord(2); }, joinMeans, joinTf, function () { return joinFinish(2); }, function () { return joinWord(3); }],
          coach: '<p>Say the first half of a sentence and a joining word, and let the child finish it: "I was cold, so..."</p>',
          mistake: '<p>Using "but" when nothing is a surprise. Ask: "Is the second part what you expected?"</p>' }
      ]
    }],
    practice: [
      { id: 'kinds', name: 'Kinds of sentences', code: 'B3.1', gen: kind },
      { id: 'command', name: 'Commands', code: 'B3.1', gen: pickCommand },
      { id: 'asking', name: 'Asking sentences', code: 'B3.1', gen: orderAsk },
      { id: 'joining', name: 'Join two sentences', code: 'B3.1', gen: pickCompound },
      { id: 'join-words', name: 'and, but, or, so', code: 'B3.1, B3.2', gen: joinWord }
    ]
  });

  Q.shapes('sentences', {
    kinds: [[1, 'end-mark', endMark], [1, 'which', whichKind], [2, 'tf', kindTf], [2, 'match', matchKind]],
    command: [[1, 'yes-no', isCommand], [1, 'doing-word', commandWord], [2, 'tf', commandTf]],
    asking: [[1, 'turn-around', turnAsk], [1, 'first-word', askWord], [2, 'tf', askTf]],
    joining: [[1, 'order', orderJoin], [1, 'split', splitTwo], [2, 'comma', commaTf]],
    'join-words': [[1, 'means', joinMeans], [1, 'finish', joinFinish], [2, 'tf', joinTf]]
  });
})();
