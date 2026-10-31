/* Grade 8: words in context.
   Ontario 2023 Language, Grade 8:
   B2.2 "demonstrate an understanding of a wide variety of words, acquire and use explicitly taught vocabulary flexibly in various
   contexts, including other subject areas, and use consolidated morphological knowledge to analyze and understand new words in context"
   Context clues (definition, contrast, example), word parts in context, academic and subject words, words with more than one meaning,
   and connotation. All sentences are written for this site. Answer checks: tests/verify/grade8-vocabulary.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* [sentence, the word, what it means, two wrong meanings, the clue words] */
  var CLUE = [
    ['The old bridge was <b>precarious</b>, so unsafe that no one dared to cross it.', 'precarious', 'likely to fall or fail', ['very beautiful', 'newly built'], 'so unsafe that no one dared to cross it'],
    ['Our class worked to <b>mitigate</b>, or lessen, the damage from the flood.', 'mitigate', 'make less severe', ['make worse', 'measure carefully'], 'or lessen'],
    ['After hours of rain, the field was <b>saturated</b>: it could not hold another drop.', 'saturated', 'completely soaked', ['dry and dusty', 'freshly mowed'], 'it could not hold another drop'],
    ['Owls are <b>nocturnal</b>, which means they sleep by day and hunt at night.', 'nocturnal', 'active at night', ['active in the daytime', 'living near water'], 'which means they sleep by day and hunt at night'],
    ['Unlike her <b>gregarious</b> brother, Hana is quiet and likes to be alone.', 'gregarious', 'enjoying the company of others', ['shy and quiet', 'tall and strong'], 'Unlike'],
    ['The first speech was <b>verbose</b>; however, the second was short and to the point.', 'verbose', 'using more words than needed', ['short and clear', 'very loud'], 'however'],
    ['Leo was <b>reluctant</b> to jump into the cold lake, but his sister dove right in.', 'reluctant', 'not willing; hesitant', ['excited', 'proud'], 'but'],
    ['Although the map looked <b>accurate</b>, several roads were in the wrong place.', 'accurate', 'correct in every detail', ['colourful', 'very old'], 'Although'],
    ['The museum displays <b>artifacts</b>, such as tools, pottery and beaded clothing.', 'artifacts', 'objects made by people long ago', ['paintings of landscapes', 'tickets for an event'], 'such as'],
    ['Many <b>amphibians</b>, including frogs, toads and salamanders, live near the pond.', 'amphibians', 'animals that live both in water and on land', ['birds that migrate', 'fish with no scales'], 'including'],
    ['Pack <b>nonperishable</b> food for the trip, for example canned beans and dried fruit.', 'nonperishable', 'food that will not spoil quickly', ['fresh food from a market', 'food that must be frozen'], 'for example']];
  var KIND = { definition: 'The sentence explains the word.', contrast: 'The sentence gives the opposite.', example: 'The sentence gives examples.' };
  function kindOf(c) { return /Unlike|however|but|Although/.test(c[0]) ? 'contrast' : /such as|including|for example/.test(c[0]) ? 'example' : 'definition'; }
  function byKind(k) { return CLUE.filter(function (c) { return kindOf(c) === k; }); }

  /* [sentence, the word, its parts, what it means, two wrong meanings] */
  var PARTS = [
    ['After the storm, the trail was <b>impassable</b>, so we turned back.', 'impassable', [['im', 'prefix'], ['pass', 'base'], ['able', 'suffix']], 'not able to be passed through', ['easy to walk on', 'very short']],
    ['The coach gave <b>constructive</b> advice that helped us improve.', 'constructive', [['con', 'prefix'], ['struct', 'base'], ['ive', 'suffix']], 'helpful; meant to build up', ['rude and unkind', 'very long']],
    ['The fire alarm caused a short <b>disruption</b> to the test.', 'disruption', [['dis', 'prefix'], ['rupt', 'base'], ['ion', 'suffix']], 'a break in what was happening', ['a reward', 'a quiet moment']],
    ['Her writing was so tiny that it was barely <b>legible</b>.', 'legible', [['leg', 'base'], ['ible', 'suffix']], 'able to be read', ['able to be heard', 'easy to carry']],
    ['The two towns are <b>interdependent</b>: each one needs the other.', 'interdependent', [['inter', 'prefix'], ['depend', 'base'], ['ent', 'suffix']], 'depending on each other', ['totally separate', 'always competing']],
    ['The <b>invisible</b> ink only appeared under a special light.', 'invisible', [['in', 'prefix'], ['vis', 'base'], ['ible', 'suffix']], 'not able to be seen', ['very bright', 'easy to erase']]];
  var PMEAN = { im: 'not', in: 'not', con: 'together', dis: 'apart', inter: 'between', pass: 'pass', struct: 'build', rupt: 'break', leg: 'read', depend: 'depend', vis: 'see', able: 'able to', ible: 'able to', ive: 'tends to', ion: 'act of', ent: 'being' };

  /* academic words, the ones every subject uses: [word, meaning, a sentence that needs it] */
  var TIER = [['analyze', 'break into parts to study closely', 'To ___ the poem, look at each stanza and its images.'], ['evaluate', 'judge how good or useful something is', 'Before you choose, ___ both sources to see which is more reliable.'],
    ['infer', 'work out from clues', 'Use the clues to ___ how the character feels.'], ['synthesize', 'combine ideas from several places', 'Read both articles, then ___ them into one report.'],
    ['justify', 'give reasons for', 'Be ready to ___ your answer with two reasons from the text.'], ['summarize', 'give the main points briefly', 'In three sentences, ___ the main points of the chapter.']];
  /* [word, the subject it belongs to] */
  var SUBJ = [['photosynthesis', 'Science'], ['ecosystem', 'Science'], ['denominator', 'Math'], ['hypotenuse', 'Math'], ['treaty', 'History'], ['confederation', 'History'],
    ['latitude', 'Geography'], ['urbanization', 'Geography'], ['tempo', 'Music'], ['palette', 'Visual Arts']];
  /* [word, subject, sentence, meaning there, everyday meaning] */
  var MULTI = [
    ['product', 'Math', 'The <b>product</b> of 6 and 7 is 42.', 'the answer to a multiplication', 'something made to be sold'],
    ['mean', 'Math', 'The <b>mean</b> of 2, 4 and 6 is 4.', 'the average', 'unkind'],
    ['volume', 'Math', 'The <b>volume</b> of the box is 24 cubic centimetres.', 'the space something takes up', 'how loud a sound is'],
    ['cell', 'Science', 'Every living thing is made of at least one <b>cell</b>.', 'the smallest unit of life', 'a mobile phone'],
    ['current', 'Science', 'The <b>current</b> in the river pulled the canoe downstream.', 'a flow of water in one direction', 'happening now'],
    ['revolution', 'History', 'The <b>revolution</b> ended the rule of the king.', 'a sudden change of government', 'one full turn'],
    ['scale', 'Geography', 'The map' + AP + 's <b>scale</b> shows that 1 cm stands for 10 km.', 'how map distance compares to real distance', 'a thin plate on a fish']];
  /* [positive word, negative word with a similar meaning] */
  var TONE = [['thrifty', 'cheap'], ['confident', 'arrogant'], ['curious', 'nosy'], ['determined', 'stubborn'], ['relaxed', 'lazy'], ['slender', 'scrawny'],
    ['youthful', 'childish'], ['unique', 'weird'], ['assertive', 'pushy'], ['cautious', 'cowardly']];

  /* ---------- question makers ---------- */
  function clueMeaning(lv, kind) {
    var c = R.pick(kind ? byKind(kind) : CLUE);
    return Q.one('What does <b>' + c[1] + '</b> mean?', c[2], c[3].slice(0, lv > 1 ? 2 : 1).concat(lv > 2 ? [R.pick(CLUE.filter(function (x) { return x !== c; }))[2]] : []), {
      fig: W.sent(c[0]), prompt: 'Find the clue in the sentence.', hint: KIND[kindOf(c)], explain: W.sent(c[0].replace(c[4], '<mark class="hl">' + c[4] + '</mark>')),
      meta: { k: 'g8-clue-meaning', word: c[1] } });
  }
  function clueKind() {
    var c = R.pick(CLUE), k = kindOf(c);
    return Q.tiles('What kind of clue helps you with <b>' + c[1] + '</b>?', k, Object.keys(KIND).filter(function (x) { return x !== k; }), {
      fig: W.sent(c[0]), hint: 'Look for <b>or</b> and <b>which means</b>, <b>unlike</b> and <b>but</b>, or <b>such as</b>.', explain: KIND[k], meta: { k: 'g8-clue-kind', word: c[1] } });
  }
  function clueWords() {
    var c = R.pick(CLUE), ws = c[0].replace(/<[^>]+>/g, '').replace(/[.,;:]/g, '').split(' ');
    var chunks = [ws.slice(0, 3).join(' '), ws.slice(-3).join(' ')].filter(function (ch) { return ch.indexOf(c[4]) < 0 && c[4].indexOf(ch) < 0 && ch.indexOf(c[1]) < 0; });
    return Q.one('Which words are the clue to <b>' + c[1] + '</b>?', c[4], chunks.slice(0, 1).concat([c[1]]), {
      fig: W.sent(c[0]), hint: 'The clue is not the word itself. It is the words that help you understand it.', explain: W.sent(c[0].replace(c[4], '<mark class="hl">' + c[4] + '</mark>')), meta: { k: 'g8-clue-words', word: c[1] } });
  }
  function partsMeaning(lv) {
    var p = R.pick(PARTS);
    return Q.one('What does <b>' + p[1] + '</b> mean?', p[3], p[4].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(p[0]) + (lv > 1 ? '' : W.sum(p[2])),
      prompt: 'Use the word parts and the sentence together.', hint: p[2].map(function (x) { return '<b>' + x[0] + '</b> = ' + PMEAN[x[0]]; }).join('. ') + '.',
      explain: W.sum(p[2]), meta: { k: 'g8-parts-meaning', word: p[1] } });
  }

  function tierFit(lv) {
    var t = R.pick(TIER);
    return Q.one('Which word fits?', t[0], R.some(TIER.filter(function (x) { return x !== t; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      fig: W.sent(t[2].replace('___', W.gap())), prompt: 'What is the reader being asked to do?', hint: '<b>' + t[0] + '</b> means ' + t[1] + '.',
      explain: W.sent(t[2].replace('___', '<b>' + t[0] + '</b>')), meta: { k: 'g8-tier-fit', frame: t[2] } });
  }
  function tierMatch() {
    var ts = R.some(TIER, 3);
    return { q: 'Match each thinking word to what it asks you to do.', type: 'match', pairs: ts.map(function (t) { return [t[0], t[1]]; }), hint: 'These words appear in every subject' + AP + 's questions.', explain: 'Knowing these words tells you exactly what a question wants.', meta: { k: 'g8-tier-match' } };
  }
  function subject(lv) {
    var s = R.pick(SUBJ), subs = SUBJ.map(function (x) { return x[1]; }).filter(function (x, i, a) { return x !== s[1] && a.indexOf(x) === i; });
    return Q.tiles('In which subject would you most likely use <b>' + s[0] + '</b>?', s[1], R.some(subs, lv > 1 ? 3 : 2), { hint: 'Picture the textbook it would appear in.', explain: '<b>' + s[0] + '</b>: ' + s[1] + '.', meta: { k: 'g8-subject', word: s[0] } });
  }
  function multi() {
    var m = R.pick(MULTI);
    return Q.one('What does <b>' + m[0] + '</b> mean <b>here</b>?', m[3], [m[4]], { fig: W.sent(m[2]), prompt: 'Which subject is this sentence from?', hint: 'This is a ' + m[1] + ' sentence. Use the meaning from ' + m[1] + '.',
      explain: 'In ' + m[1] + ', <b>' + m[0] + '</b> means ' + m[3] + '.', meta: { k: 'g8-multi', word: m[0] } });
  }

  function tonePos(lv) {
    var t = R.pick(TONE), pos = R.int(0, 1) === 1;
    return Q.tiles('Which word sounds more <b>' + (pos ? 'positive' : 'negative') + '</b>?', t[pos ? 0 : 1], [t[pos ? 1 : 0]], { prompt: 'Would you like to be called this?',
      hint: 'The words mean nearly the same thing. Listen to the feeling.', explain: '<b>' + t[0] + '</b> sounds positive. <b>' + t[1] + '</b> sounds negative.', meta: { k: 'g8-tone', want: pos ? 'pos' : 'neg' } });
  }
  function toneFit() {
    var t = R.pick(TONE), praise = R.int(0, 1) === 1;
    return Q.one('You are writing to <b>' + (praise ? 'praise' : 'criticize') + '</b> someone. Which word fits?', t[praise ? 0 : 1], [t[praise ? 1 : 0]], {
      fig: W.sent(Q.name() + ' is ' + W.gap() + '.'), hint: 'Choose the word whose feeling matches your purpose.', explain: 'To ' + (praise ? 'praise' : 'criticize') + ', use <b>' + t[praise ? 0 : 1] + '</b>.', meta: { k: 'g8-tone-fit', want: praise ? 'pos' : 'neg' } });
  }
  function toneMatch() {
    var ts = R.some(TONE, 3);
    return { q: 'Match each positive word to the negative word that means nearly the same.', type: 'match', pairs: ts.map(function (t) { return [t[0], t[1]]; }), hint: 'Each pair names the same quality, seen in a good or a bad light.', explain: 'This feeling is called a word' + AP + 's <b>connotation</b>.', meta: { k: 'g8-tone-match' } };
  }
  function toneTf() {
    var t = R.pick(TONE), w = R.pick(t), right = R.int(0, 1) === 1, said = right === (w === t[0]) ? 'a compliment' : 'an insult';
    return { q: Q.name() + ' says:', fig: W.sent('Calling someone <b>' + w + '</b> is ' + said + '.'), type: 'tf', answer: right,
      why: { options: ['<b>' + t[0] + '</b> sounds positive; <b>' + t[1] + '</b> sounds negative.', 'Words with the same meaning always feel the same.'], answer: 0 },
      hint: 'Would you be pleased to hear it?', explain: '<b>' + t[0] + '</b> is a compliment. <b>' + t[1] + '</b> is an insult.', meta: { k: 'g8-tone-tf', word: w, said: said } };
  }

  var hl = function (s, clue) { return W.sent(s.replace(clue, '<mark class="hl">' + clue + '</mark>')); };
  Atlas.register('vocabulary', {
    lessons: [{
      id: 'clues', title: 'Context clues', sub: 'The sentence around a word often explains it.',
      concepts: [
        { slug: 'definition', title: 'The sentence may explain the word', exp: ['B2.2'], skill: 'context',
          model: [
            step(W.sent(CLUE[1][0]), 'A new word: <b>mitigate</b>.'),
            step(hl(CLUE[1][0], 'or lessen'), '<b>or</b> signals a definition.'),
            step(hl(CLUE[3][0], 'which means'), '<b>which means</b> and a colon signal one too.')
          ],
          guided: [function () { return clueMeaning(1, 'definition'); }, function () { return clueMeaning(1, 'definition'); }],
          check: [function () { return clueMeaning(2, 'definition'); }, clueWords],
          coach: '<p>Teach the signals: commas around a phrase, "or", "which means", "that is", a dash or a colon.</p>',
          mistake: '<p>Skipping the word and reading on. Train the habit: stop, look left and right for a clue, then decide.</p>' },
        { slug: 'contrast', title: 'A contrast clue gives the opposite', exp: ['B2.2'], skill: 'context',
          model: [
            step(hl(CLUE[4][0], 'Unlike'), '<b>Unlike</b>: the brother is the opposite of Hana.'),
            step(W.means('think', 'Hana: quiet. Brother: <b>gregarious</b>, social.')),
            step(W.tile('but') + ' ' + W.tile('however') + ' ' + W.tile('although'), 'More contrast signals.')
          ],
          guided: [function () { return clueMeaning(1, 'contrast'); }, clueKind],
          check: [function () { return clueMeaning(2, 'contrast'); }, clueKind],
          coach: '<p>Ask: "Who is being compared? What is the other person like? So the word means the opposite."</p>',
          mistake: '<p>Choosing the meaning that describes the wrong person (Hana is shy, so "gregarious" must mean shy). Find who the word describes.</p>' },
        { slug: 'example', title: 'Examples point to the meaning', exp: ['B2.2'], skill: 'context',
          model: [
            step(hl(CLUE[8][0], 'such as'), 'Tools, pottery, clothing: what do they share?'),
            step(W.means('think', 'old objects people made')),
            step(W.tile('including') + ' ' + W.tile('for example'), 'Other example signals.')
          ],
          guided: [function () { return clueMeaning(1, 'example'); }, function () { return clueMeaning(1, 'example'); }],
          check: [function () { return clueMeaning(2, 'example'); }, clueKind],
          coach: '<p>List the examples on paper and ask what they have in common. That common thread is the meaning.</p>',
          mistake: '<p>Thinking the word means just one example ("artifacts means pottery").</p>' },
        { slug: 'parts', title: 'Use word parts and the sentence together', exp: ['B2.2'], skill: 'context',
          model: [
            step(W.sent(PARTS[0][0])),
            step(W.sum(PARTS[0][2]), 'Not + pass + able.'),
            step(W.means('think', 'could not be passed through'), 'The sentence agrees: we turned back.')
          ],
          guided: [function () { return partsMeaning(1); }, function () { return partsMeaning(1); }],
          check: [function () { return partsMeaning(2); }, function () { return partsMeaning(2); }],
          coach: '<p>Two checks are better than one: the parts suggest a meaning, and the sentence confirms it.</p>',
          mistake: '<p>Trusting the parts when the sentence disagrees. If they clash, look it up.</p>' }
      ]
    }, {
      id: 'academic', title: 'Words across subjects', sub: 'Thinking words, subject words, and words that change meaning.',
      concepts: [
        { slug: 'thinking-words', title: 'Thinking words tell you what to do', exp: ['B2.2'], skill: 'academic',
          model: [
            step(W.tile('analyze'), 'Break it into parts and study each one.'),
            step(W.tile('evaluate'), 'Judge how good or useful it is.'),
            step(W.tile('synthesize'), 'Combine ideas from several places.')
          ],
          guided: [function () { return tierFit(1); }, tierMatch],
          check: [function () { return tierFit(2); }, tierMatch],
          coach: '<p>Circle the thinking word in every test question across subjects. Ask: "What exactly does it want me to do?"</p>',
          mistake: '<p>Summarizing when asked to analyze or evaluate. The thinking word sets the task.</p>' },
        { slug: 'subject-words', title: 'Each subject has its own words', exp: ['B2.2'], skill: 'academic',
          model: [
            step(W.tile('photosynthesis') + ' ' + W.tile('ecosystem'), 'Science.'),
            step(W.tile('treaty') + ' ' + W.tile('confederation'), 'History.'),
            step(W.tile('denominator') + ' ' + W.tile('hypotenuse'), 'Math.')
          ],
          guided: [function () { return subject(1); }, function () { return subject(1); }],
          check: [function () { return subject(2); }, function () { return subject(2); }],
          coach: '<p>Keep one page per subject for new words, with a picture or example for each.</p>',
          mistake: '<p>Using a subject word loosely in writing. Check the glossary of the textbook.</p>' },
        { slug: 'multiple', title: 'Some words change meaning by subject', exp: ['B2.2'], skill: 'academic',
          model: [
            step(W.tile('product'), 'Every day: something made to sell.'),
            step(W.sent(MULTI[0][2]), 'In Math: the answer to a multiplication.'),
            step(W.sent(MULTI[3][2]), 'Science: the smallest unit of life.')
          ],
          guided: [multi, multi],
          check: [multi, multi],
          coach: '<p>Collect "double agent" words: mean, volume, current, scale, cell. Write each one in two sentences.</p>',
          mistake: '<p>Reading a Math question with the everyday meaning ("mean" as unkind).</p>' },
        { slug: 'connotation', title: 'Words can feel positive or negative', exp: ['B2.2'], skill: 'connotation',
          model: [
            step(W.tile('thrifty') + ' ' + W.tile('cheap'), 'Both spend little money.'),
            step(W.means('star', '<b>thrifty</b>: wise with money')),
            step(W.means('not', '<b>cheap</b>: mean with money'))
          ],
          guided: [function () { return tonePos(1); }, toneFit],
          check: [function () { return tonePos(2); }, toneTf],
          coach: '<p>Play "same but different": the grown-up says a word, and the child finds a twin with the opposite feeling.</p>',
          mistake: '<p>Choosing a negative word by accident in persuasive writing. Read the sentence aloud and ask how the person would feel.</p>' }
      ]
    }],
    practice: [
      { id: 'context', name: 'Context clues and word parts', code: 'B2.2', gen: clueMeaning },
      { id: 'academic', name: 'Academic and subject words', code: 'B2.2', gen: tierFit },
      { id: 'connotation', name: 'Positive and negative words', code: 'B2.2', gen: tonePos }
    ]
  });

  Q.shapes('vocabulary', {
    context: [[1, 'clue-kind', clueKind], [1, 'clue-words', clueWords], [1, 'word-parts', partsMeaning]],
    academic: [[1, 'match', tierMatch], [1, 'subject', subject], [1, 'two-meanings', multi]],
    connotation: [[1, 'fit', toneFit], [2, 'match', toneMatch], [2, 'true-false', toneTf]]
  });
})();
