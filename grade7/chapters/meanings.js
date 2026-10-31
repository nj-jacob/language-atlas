/* Grade 7: word meanings. Context clues, shades of meaning (connotation and strength), and vocabulary from other subjects.
   Ontario 2023 Language, Grade 7:
   B2.2 "demonstrate an understanding of a wide variety of words, acquire and use explicitly taught vocabulary flexibly in various contexts,
   including other subject areas, and use generalized morphological knowledge to analyze and understand new words in context"
   All sentences and word lists are written for this site. Answer checks: tests/verify/grade7-meanings.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* [sentence, word, meaning, wrong meanings, kind of clue, the clue words, other words from the sentence] */
  var CLUES = [
    ['The bear was <b>dormant</b>, or resting deeply, all winter.', 'dormant', 'resting deeply', ['very hungry', 'wide awake'], 'definition', 'or resting deeply', 'The bear was'],
    ['The scientist made a <b>hypothesis</b>, or a careful guess, before the experiment.', 'hypothesis', 'a careful guess to test', ['a final result', 'a lab coat'], 'definition', 'or a careful guess', 'before the experiment'],
    ['Many birds <b>migrate</b>, which means they fly to warmer places for the winter.', 'migrate', 'move to another place for the season', ['build nests', 'sing loudly'], 'definition', 'which means they fly to warmer places', 'Many birds'],
    ['<b>Precipitation</b>, such as rain, snow and hail, fell all week.', 'Precipitation', 'water that falls from the sky', ['strong wind', 'bright sunshine'], 'example', 'such as rain, snow and hail', 'fell all week'],
    ['Omar is <b>meticulous</b>. For example, he checks every line of his code three times.', 'meticulous', 'very careful about details', ['careless', 'quick'], 'example', 'he checks every line of his code three times', 'Omar is'],
    ['<b>Renewable</b> energy, including wind and solar power, can be used again and again.', 'Renewable', 'able to be replaced by nature', ['very costly', 'made in a factory'], 'example', 'including wind and solar power', 'energy'],
    ['Unlike her <b>gregarious</b> brother, Mei was quiet at parties.', 'gregarious', 'outgoing and sociable', ['shy and quiet', 'tall'], 'contrast', 'Unlike her', 'at parties'],
    ['Her speech was <b>concise</b>, not long and rambling like the last one.', 'concise', 'short and clear', ['long and confusing', 'loud'], 'contrast', 'not long and rambling', 'Her speech was'],
    ['Instead of being <b>frugal</b> with his allowance, Theo spent it all in one day.', 'frugal', 'careful with money', ['generous', 'lucky'], 'contrast', 'spent it all in one day', 'with his allowance'],
    ['The trail was <b>treacherous</b> because ice covered the steep rocks.', 'treacherous', 'dangerous', ['beautiful', 'short'], 'cause and effect', 'because ice covered the steep rocks', 'The trail was'],
    ['The village was <b>isolated</b> because no roads reached it.', 'isolated', 'far away from others', ['crowded', 'modern'], 'cause and effect', 'because no roads reached it', 'The village was'],
    ['The old ferry became <b>obsolete</b> because a new bridge replaced it.', 'obsolete', 'no longer used', ['brand new', 'very fast'], 'cause and effect', 'because a new bridge replaced it', 'The old ferry']
  ];
  var KINDS = ['definition', 'example', 'contrast', 'cause and effect'];
  var SIGNAL = { definition: 'or, which means', example: 'such as, for example, including', contrast: 'unlike, not, instead of', 'cause and effect': 'because, so' };
  function clue(kind) { return R.pick(kind ? CLUES.filter(function (c) { return c[4] === kind; }) : CLUES); }
  function clueMeaning(lv, kind) {
    var c = clue(kind);
    return Q.one('What does <b>' + c[1] + '</b> mean?', c[2], c[3].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(c[0]), prompt: 'Look for a clue: ' + SIGNAL[c[4]] + '.',
      hint: 'Find the words in the sentence that help.', explain: 'The clue: <mark class="hl">' + c[5] + '</mark>.', meta: { k: 'g7-clue-meaning', word: c[1] } });
  }
  function clueWords(lv, kind) {
    var c = clue(kind);
    return Q.tiles('Which words are the clue to <b>' + c[1] + '</b>?', c[5], [c[6]], { fig: W.sent(c[0]), hint: 'Which words explain, give an example, or show the opposite?',
      explain: '<mark class="hl">' + c[5] + '</mark>', meta: { k: 'g7-clue-words', word: c[1] } });
  }
  function clueKind(lv) {
    var c = clue();
    return Q.tiles('What kind of clue does this sentence give?', c[4], R.some(KINDS.filter(function (k) { return k !== c[4]; }), lv > 1 ? 3 : 2), { fig: W.sent(c[0]),
      hint: 'Look for the signal words: ' + SIGNAL[c[4]] + '.', explain: 'A <b>' + c[4] + '</b> clue: ' + c[5] + '.', meta: { k: 'g7-clue-kind', word: c[1] } });
  }
  function clueTf() {
    var c = clue(), right = R.int(0, 1) === 1, said = right ? c[2] : c[3][0];
    return { q: Q.name() + ' says:', fig: W.sent(c[0]) + W.sent('<b>' + c[1] + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['The clue in the sentence fits that meaning.', 'The clue in the sentence points to a different meaning.'], answer: right ? 0 : 1 },
      hint: 'Put the meaning in place of the word. Does the sentence still make sense?', explain: '<b>' + c[1] + '</b> means <b>' + c[2] + '</b>.', meta: { k: 'g7-clue-tf', word: c[1], said: said } };
  }

  /* ---------- shades of meaning ---------- */
  /* [positive word, negative word] with about the same meaning */
  var CONN = [['thrifty', 'cheap'], ['confident', 'arrogant'], ['curious', 'nosy'], ['determined', 'stubborn'], ['slender', 'scrawny'], ['aroma', 'stench'],
    ['relaxed', 'lazy'], ['youthful', 'childish'], ['unique', 'weird'], ['cautious', 'timid']];
  /* weakest to strongest */
  var SCALE = [['annoyed', 'angry', 'furious'], ['like', 'love', 'adore'], ['tired', 'weary', 'exhausted'], ['cool', 'cold', 'frigid'], ['big', 'huge', 'enormous'], ['murmur', 'speak', 'shout'], ['glad', 'happy', 'thrilled']];
  function connotation(lv) {
    var c = R.pick(CONN), pos = R.int(0, 1) === 1;
    return Q.tiles('Which word gives a more <b>' + (pos ? 'positive' : 'negative') + '</b> feeling?', pos ? c[0] : c[1], [pos ? c[1] : c[0]], {
      prompt: 'Would you like to be called this?', hint: 'Both mean about the same. Which one sounds ' + (pos ? 'kind' : 'unkind') + '?',
      explain: '<b>' + c[0] + '</b> is positive. <b>' + c[1] + '</b> is negative.', meta: { k: 'g7-connotation', pos: pos, words: c.join(' ') } });
  }
  function connSentence(lv) {
    var c = R.pick(CONN.filter(function (x) { return x[0] !== 'aroma'; })), other = lv > 1 ? [R.pick(CONN.filter(function (x) { return x !== c; }))[1]] : [];
    return Q.one('You are writing a <b>kind</b> note about a friend. Which word fits best?', c[0], [c[1]].concat(other), { fig: W.sent('My friend is very ' + W.gap() + '.'),
      hint: 'Pick the word with a positive feeling.', explain: '<b>' + c[0] + '</b> says it kindly.', meta: { k: 'g7-conn-sentence' } });
  }
  function connMatch() {
    var cs = R.some(CONN, 3);
    return { q: 'Match each positive word to its negative partner.', type: 'match', pairs: cs.map(function (c) { return [c[0], c[1]]; }), hint: 'The partners mean about the same thing.',
      explain: 'Same meaning, different feeling.', meta: { k: 'g7-conn-match' } };
  }
  function scaleOrder() {
    var s = R.pick(SCALE);
    return { q: 'Put these words in order, from weakest to strongest.', type: 'order', items: s.slice(), first: 'Weakest', last: 'Strongest', hint: 'Which one is the mildest?',
      explain: s.join(' &rarr; '), meta: { k: 'g7-scale-order' } };
  }
  function scaleStrong(lv) {
    var s = R.pick(SCALE);
    return Q.tiles('Which word is the <b>strongest</b>?', s[2], s.slice(0, 2), { hint: 'Picture each one. Which is the most extreme?', explain: s.join(' &rarr; '), meta: { k: 'g7-scale-strong' } });
  }

  /* ---------- words from other subjects: [word, subject, meaning] ---------- */
  var SUBJ = [['photosynthesis', 'Science', 'how plants make food from sunlight'], ['erosion', 'Science', 'land being worn away by water or wind'], ['habitat', 'Science', 'the natural home of a plant or animal'],
    ['ratio', 'Math', 'a comparison of two amounts'], ['variable', 'Math', 'a letter that stands for an unknown number'], ['treaty', 'History', 'a formal agreement between nations'],
    ['Confederation', 'History', 'the joining of colonies to form Canada in 1867'], ['latitude', 'Geography', 'distance north or south of the equator'], ['tundra', 'Geography', 'a cold, treeless region in the far north'],
    ['tempo', 'Music', 'the speed of the music']];
  /* [word, sentence, meaning here, another meaning of the word] */
  var MULTI = [['current', 'The <b>current</b> flows through the copper wire.', 'a flow of electricity', 'happening now'], ['table', 'The <b>table</b> shows the rainfall for each month.', 'a chart of rows and columns', 'a piece of furniture'],
    ['cell', 'Every living thing is made of <b>cells</b>.', 'the smallest unit of life', 'a small room in a prison'], ['product', 'The <b>product</b> of 6 and 7 is 42.', 'the answer when you multiply', 'something made to be sold'],
    ['mass', 'The rock has a <b>mass</b> of 2 kg.', 'how much matter something has', 'a large crowd'], ['range', 'The <b>range</b> of the data is 15.', 'the difference between the highest and lowest values', 'a line of mountains'],
    ['bill', 'Parliament voted on the new <b>bill</b>.', 'a proposed law', 'a bird' + AP + 's beak']];
  function subjectMeaning(lv) {
    var s = R.pick(SUBJ);
    return Q.one('In ' + s[1] + ', what does <b>' + s[0] + '</b> mean?', s[2], R.some(SUBJ.filter(function (x) { return x !== s; }), lv > 1 ? 3 : 2).map(function (x) { return x[2]; }), {
      hint: 'Think about what you learned in ' + s[1] + '.', explain: '<b>' + s[0] + '</b>: ' + s[2] + '.', meta: { k: 'g7-subject-meaning', word: s[0] } });
  }
  function whichSubject() {
    var s = R.pick(SUBJ), subs = ['Science', 'Math', 'History', 'Geography', 'Music'];
    return Q.tiles('In which subject would you most likely meet the word <b>' + s[0] + '</b>?', s[1], R.some(subs.filter(function (x) { return x !== s[1]; }), 2), {
      hint: 'What is the word about?', explain: '<b>' + s[0] + '</b> (' + s[1] + '): ' + s[2] + '.', meta: { k: 'g7-which-subject', word: s[0] } });
  }
  function subjectMatch() {
    var ss = R.some(SUBJ, 3);
    return { q: 'Match each subject word to its meaning.', type: 'match', pairs: ss.map(function (s) { return [s[0], s[2]]; }), hint: 'Start with the word you know best.', explain: 'Each subject has its own words.', meta: { k: 'g7-subject-match' } };
  }
  function multiMeaning(lv) {
    var m = R.pick(MULTI), extra = R.pick(MULTI.filter(function (x) { return x !== m; }))[2];
    return Q.one('What does <b>' + m[0] + '</b> mean in this sentence?', m[2], [m[3]].concat(lv > 1 ? [extra] : []), { fig: W.sent(m[1]), prompt: 'Which subject is this sentence from?',
      hint: 'The word has more than one meaning. Which one fits here?', explain: 'Here, <b>' + m[0] + '</b> means <b>' + m[2] + '</b>.', meta: { k: 'g7-multi', s: m[1] } });
  }

  Atlas.register('meanings', {
    lessons: [{
      id: 'context', title: 'Context clues', sub: 'The sentence helps you work out a new word.',
      concepts: [
        { slug: 'definition', title: 'The sentence may define the word', exp: ['B2.2'], skill: 'context',
          model: [
            step(W.sent('The bear was <b>dormant</b>, <mark class="hl">or resting deeply</mark>, all winter.'), 'Signal words: <b>or</b>, <b>which means</b>.'),
            step(W.tile('dormant') + ' = ' + W.tile('resting deeply'))
          ],
          guided: [function () { return clueMeaning(1, 'definition'); }, function () { return clueWords(1, 'definition'); }],
          check: [function () { return clueMeaning(2, 'definition'); }, function () { return clueWords(1, 'definition'); }],
          coach: '<p>Ask the child to put a finger on the clue before answering. Naming the clue is the skill.</p>',
          mistake: '<p>Skipping a hard word and reading on. Teach the habit: stop, look around the word, then decide.</p>' },
        { slug: 'example-contrast', title: 'Examples and opposites are clues', exp: ['B2.2'], skill: 'context',
          model: [
            step(W.sent('<b>Precipitation</b>, <mark class="hl">such as rain, snow and hail</mark>, fell all week.'), 'Examples: water from the sky.'),
            step(W.sent('<mark class="hl">Unlike</mark> her <b>gregarious</b> brother, Mei was <mark class="hl">quiet</mark>.'), 'Opposite of quiet: outgoing.')
          ],
          guided: [function () { return clueMeaning(1, 'example'); }, function () { return clueMeaning(1, 'contrast'); }],
          check: [function () { return clueKind(1); }, function () { return clueMeaning(2, 'contrast'); }],
          coach: '<p>Make a small chart of signal words: such as, including, for example (examples); unlike, not, instead of (opposites).</p>',
          mistake: '<p>With an opposite clue, choosing the meaning of the clue itself (gregarious = quiet). Flip it.</p>' },
        { slug: 'cause', title: 'A reason can explain the word', exp: ['B2.2'], skill: 'context',
          model: [
            step(W.sent('The trail was <b>treacherous</b> <mark class="hl">because ice covered the steep rocks</mark>.'), 'Ice on steep rocks?'),
            step(W.tile('treacherous') + ' = ' + W.tile('dangerous'), 'The reason tells you.')
          ],
          guided: [function () { return clueMeaning(1, 'cause and effect'); }, function () { return clueWords(1, 'cause and effect'); }],
          check: [function () { return clueMeaning(2, 'cause and effect'); }, clueTf],
          coach: '<p>Ask "Why?" about the sentence. The answer often explains the word.</p>',
          mistake: '<p>Guessing from how the word sounds. Always test the meaning back in the sentence.</p>' }
      ]
    }, {
      id: 'shades', title: 'Shades of meaning', sub: 'Words that mean almost the same thing.',
      concepts: [
        { slug: 'feeling', title: 'Words carry feelings', exp: ['B2.2'], skill: 'shades',
          model: [
            step(W.tile('thrifty') + ' ' + W.tile('cheap'), 'Both mean careful with money.'),
            step(W.means('star', '<b>thrifty</b>: sounds wise')),
            step(W.means('not', '<b>cheap</b>: sounds mean'))
          ],
          guided: [function () { return connotation(1); }, function () { return connSentence(1); }],
          check: [function () { return connotation(2); }, connMatch],
          coach: '<p>Play "kind or unkind": say one word and have the child give the partner word with the opposite feeling.</p>',
          mistake: '<p>Thinking words with the same meaning are always interchangeable. The feeling changes the message.</p>' },
        { slug: 'strength', title: 'Some words are stronger', exp: ['B2.2'], skill: 'shades',
          model: [
            step(W.tile('annoyed'), 'A little.'),
            step(W.tile('annoyed') + ' &rarr; ' + W.tile('angry'), 'More.'),
            step(W.tile('annoyed') + ' &rarr; ' + W.tile('angry') + ' &rarr; ' + W.tile('furious'), 'The most.')
          ],
          guided: [scaleOrder, function () { return scaleStrong(1); }],
          check: [scaleOrder, function () { return scaleStrong(2); }],
          coach: '<p>Draw a line on paper from "a little" to "a lot", and place word cards along it.</p>',
          mistake: '<p>Using the strongest word for everything ("furious" about a small thing). Match the word to the size of the feeling.</p>' }
      ]
    }, {
      id: 'subjects', title: 'Words in other subjects', sub: 'Science, math, history and more.',
      concepts: [
        { slug: 'subject-words', title: 'Each subject has its own words', exp: ['B2.2'], skill: 'subject-words',
          model: [
            step(W.tile('erosion') + ' ' + W.tile('habitat'), 'Science.'),
            step(W.tile('ratio') + ' ' + W.tile('variable'), 'Math.'),
            step(W.tile('treaty') + ' ' + W.tile('Confederation'), 'History.')
          ],
          guided: [function () { return subjectMeaning(1); }, whichSubject],
          check: [function () { return subjectMeaning(2); }, subjectMatch],
          coach: '<p>Keep a word log for each subject: the word, a short meaning, and a quick sketch.</p>',
          mistake: '<p>Learning the word but not using it. Ask the child to use each new word in a sentence about the subject.</p>' },
        { slug: 'multiple', title: 'One word can mean different things', exp: ['B2.2'], skill: 'subject-words',
          model: [
            step(W.sent('We swam against the <b>current</b>.'), 'A flow of water.'),
            step(W.sent('The <b>current</b> flows through the wire.'), 'In science: a flow of electricity.'),
            step(W.sent('Read the <b>current</b> news.'), 'Happening now.')
          ],
          guided: [function () { return multiMeaning(1); }, function () { return multiMeaning(1); }],
          check: [function () { return multiMeaning(2); }, function () { return multiMeaning(2); }],
          coach: '<p>When a familiar word looks odd in a textbook, ask: "Does this word mean something special in this subject?"</p>',
          mistake: '<p>Using the everyday meaning in a subject (a "table" in math is a chart, not furniture).</p>' }
      ]
    }],
    practice: [
      { id: 'context', name: 'Context clues', code: 'B2.2', gen: function (lv) { return clueMeaning(lv); } },
      { id: 'shades', name: 'Shades of meaning', code: 'B2.2', gen: connotation },
      { id: 'subject-words', name: 'Words in other subjects', code: 'B2.2', gen: subjectMeaning }
    ],
    tasks: [
      { id: 'word-log', title: 'My word log', code: 'B2.2', pic: W.icon('write'), say: 'Add five new words from your reading this week. Use each one in a sentence.', write: true,
        run: ['Each week, help the child pick five new words from any subject: a textbook, a novel, the news.', 'For each word, the child writes a short meaning in their own words and a new sentence.', 'Later in the week, ask the child to use two of the words when talking to you.'],
        rubric: ['Copies words but no meaning yet.', 'Meanings with help; sentences are unclear.', 'Clear meanings and correct sentences.', 'Uses the new words naturally when speaking and writing.'] }
    ]
  });

  Q.shapes('meanings', {
    context: [[1, 'clue-words', function (lv) { return clueWords(lv); }], [1, 'clue-kind', clueKind], [2, 'true-false', clueTf]],
    shades: [[1, 'sentence', connSentence], [1, 'order', scaleOrder], [1, 'strongest', scaleStrong], [2, 'match', connMatch]],
    'subject-words': [[1, 'which-subject', whichSubject], [1, 'multiple', multiMeaning], [2, 'match', subjectMatch]]
  });
})();
