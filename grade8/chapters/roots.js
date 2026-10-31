/* Grade 8: roots and word parts.
   Ontario 2023 Language, Grade 8:
   B2.1 "use consolidated knowledge of the meanings of words and morphemes (i.e., bases, prefixes, and suffixes) to read and spell
   complex words with accuracy and automaticity"
   Greek and Latin roots, suffixes that change a word's job, and the spelling changes that come with suffixes and the prefix in-.
   All word lists are written for this site. Answer checks: tests/verify/grade8-roots.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* roots and what they mean */
  var ROOT = { port: 'carry', spect: 'look', dict: 'say', struct: 'build', rupt: 'break', aud: 'hear', vis: 'see', ject: 'throw', script: 'write',
    tele: 'far', scope: 'look', phone: 'sound', bio: 'life', geo: 'earth', graph: 'write', thermo: 'heat', meter: 'measure', micro: 'small', photo: 'light', manu: 'hand' };
  /* [word, its parts, what it means]. Roots are the 'base' parts. */
  var WORDS = [
    ['transport', [['trans', 'prefix'], ['port', 'base']], 'carry across'], ['portable', [['port', 'base'], ['able', 'suffix']], 'able to be carried'],
    ['inspect', [['in', 'prefix'], ['spect', 'base']], 'look into closely'], ['spectator', [['spect', 'base'], ['ator', 'suffix']], 'a person who looks on'],
    ['predict', [['pre', 'prefix'], ['dict', 'base']], 'say before it happens'], ['contradict', [['contra', 'prefix'], ['dict', 'base']], 'say the opposite'],
    ['construct', [['con', 'prefix'], ['struct', 'base']], 'build by putting parts together'], ['interrupt', [['inter', 'prefix'], ['rupt', 'base']], 'break in between'],
    ['erupt', [['e', 'prefix'], ['rupt', 'base']], 'break out'], ['audible', [['aud', 'base'], ['ible', 'suffix']], 'able to be heard'],
    ['visible', [['vis', 'base'], ['ible', 'suffix']], 'able to be seen'], ['eject', [['e', 'prefix'], ['ject', 'base']], 'throw out'],
    ['manuscript', [['manu', 'base'], ['script', 'base']], 'writing done by hand']];
  /* words made of two roots */
  var TWO = [
    ['telescope', [['tele', 'base'], ['scope', 'base']], 'a tool for looking at far things'], ['telephone', [['tele', 'base'], ['phone', 'base']], 'a tool that sends sound far away'],
    ['biography', [['bio', 'base'], ['graph', 'base'], ['y', 'suffix']], 'writing about a life'], ['geography', [['geo', 'base'], ['graph', 'base'], ['y', 'suffix']], 'writing about the earth'],
    ['thermometer', [['thermo', 'base'], ['meter', 'base']], 'a tool that measures heat'], ['microscope', [['micro', 'base'], ['scope', 'base']], 'a tool for looking at small things'],
    ['photograph', [['photo', 'base'], ['graph', 'base']], 'a picture written with light']];
  var ALL = WORDS.concat(TWO);
  function roots(w) { return w[1].filter(function (p) { return p[1] === 'base'; }).map(function (p) { return p[0]; }); }
  /* two words share a meaning when any of their roots mean the same thing */
  function shares(a, b) { return roots(a).some(function (r) { return roots(b).some(function (s) { return ROOT[r] === ROOT[s]; }); }); }
  function others(w, list) { return (list || ALL).filter(function (x) { return x !== w && !shares(x, w); }); }

  /* ---------- question makers: roots ---------- */
  function meaning(lv, list) {
    var w = R.pick(list || ALL);
    return Q.one('What does <b>' + w[0] + '</b> mean?', w[2], R.some(others(w), lv > 1 ? 3 : 2).map(function (x) { return x[2]; }), {
      fig: lv > 1 ? W.tile(w[0]) : W.sum(w[1]), prompt: 'Find the root. What does it mean?', hint: roots(w).map(function (r) { return '<b>' + r + '</b> means ' + ROOT[r]; }).join('. ') + '.',
      explain: W.sum(w[1]), steps: roots(w).map(function (r) { return '<b>' + r + '</b> = ' + ROOT[r]; }).concat(['<b>' + w[0] + '</b>: ' + w[2] + '.']),
      meta: { k: 'g8-root-meaning', word: w[0] } });
  }
  function whichPart() {
    var w = R.pick(WORDS), r = roots(w)[0];
    return Q.tiles('Which part of <b>' + w[0] + '</b> means <b>' + ROOT[r] + '</b>?', r, w[1].map(function (p) { return p[0]; }).filter(function (p) { return p !== r; }), {
      hint: 'The root is the part that carries the main meaning.', explain: W.sum(w[1]), meta: { k: 'g8-root-part', word: w[0], mean: ROOT[r] } });
  }
  function wordFor(lv) {
    var w = R.pick(ALL);
    return Q.tiles('Which word means <b>' + w[2] + '</b>?', w[0], R.some(others(w), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Which root fits the meaning?', explain: W.sum(w[1]), meta: { k: 'g8-root-word', mean: w[2] } });
  }
  function matchRoots() {
    var rs = R.some(Object.keys(ROOT).filter(function (r) { return ['scope', 'graph', 'script', 'spect'].indexOf(r) < 0; }), 3);
    return { q: 'Match each root to its meaning.', type: 'match', pairs: rs.map(function (r) { return [r, ROOT[r]]; }), hint: 'Think of a word you know with each root.', explain: 'Knowing a root unlocks a whole family of words.', meta: { k: 'g8-root-match' } };
  }
  function family(lv) {
    var w = R.pick(ALL), r = R.pick(roots(w));
    return Q.tiles('Which word belongs to the <b>' + r + '</b> family (' + ROOT[r] + ')?', w[0], R.some(others(w), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Look for the same letters that carry the same meaning.', explain: 'Both have the root <b>' + r + '</b> (' + ROOT[r] + ').', meta: { k: 'g8-root-family', root: r } });
  }
  function buildTwo(lv) {
    var w = R.pick(TWO), extra = R.pick(others(w, TWO)), xr = roots(extra)[0];
    var list = w[1].map(function (p) { return W.tile(p[0], p[1]); }).concat([W.tile(xr, 'base')]);
    return { q: 'Build the word that means <b>' + w[2] + '</b>.', type: 'build', parts: list, answer: w[1].map(function (p, i) { return i; }),
      fig: lv > 1 ? '' : roots(w).map(function (r) { return W.tile(r, 'base') + ' ' + ROOT[r]; }).join(' &nbsp; '), hint: 'Put the roots in the order of the meaning.',
      explain: W.sum(w[1]), meta: { k: 'g8-root-build', mean: w[2] } };
  }
  function tfRoot() {
    var w = R.pick(ALL), r = R.pick(roots(w)), right = R.int(0, 1) === 1, said = right ? ROOT[r] : R.pick(Object.keys(ROOT).map(function (k) { return ROOT[k]; }).filter(function (m) { return m !== ROOT[r] && m.indexOf(ROOT[r]) < 0 && ROOT[r].indexOf(m) < 0; }));
    return { q: Q.name() + ' says:', fig: W.sent('In <b>' + w[0] + '</b>, the root <b>' + r + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['<b>' + r + '</b> means ' + ROOT[r] + '.', 'Roots change meaning in every word.'], answer: 0 },
      hint: 'Think of other words with this root.', explain: '<b>' + r + '</b> means <b>' + ROOT[r] + '</b>.', meta: { k: 'g8-root-tf', root: r, said: said } };
  }

  /* ---------- suffixes that change a word's job ---------- */
  /* [verb, noun, adjective, adverb, a sentence that needs the noun, the adjective, the adverb] */
  var FAM = [
    ['decide', 'decision', 'decisive', 'decisively', 'The judges announced their ___ at noon.', 'A ___ leader acts quickly.', 'She acted ___ when the alarm rang.'],
    ['create', 'creation', 'creative', 'creatively', 'The sculpture is her newest ___.', 'He had a ___ idea for the poster.', 'They solved the problem ___.'],
    ['protect', 'protection', 'protective', 'protectively', 'Sunscreen offers some ___ from the sun.', 'Wear ___ gloves in the lab.', 'The goose stood ___ over her goslings.'],
    ['persuade', 'persuasion', 'persuasive', 'persuasively', 'It took a lot of ___ to change his mind.', 'Write a ___ letter to council.', 'She argued ___ for a new park.'],
    ['attract', 'attraction', 'attractive', 'attractively', 'The waterfall is the park' + '’' + 's main ___.', 'The store has an ___ window display.', 'The cakes were arranged ___.'],
    ['describe', 'description', 'descriptive', 'descriptively', 'Read the ___ of the lost dog.', 'Use ___ words in your story.', 'The scene is written ___.'],
    ['imagine', 'imagination', 'imaginative', 'imaginatively', 'Use your ___ to picture the scene.', 'It was an ___ solution.', 'The room was decorated ___.'],
    ['act', 'action', 'active', 'actively', 'The creek was saved by their ___.', 'Choose an ___ hobby, like hiking.', 'Listen ___ during the discussion.']];
  var JOB = ['verb', 'noun', 'adjective', 'adverb'];
  var JOBTIP = { noun: 'names a thing or idea', adjective: 'describes a noun', adverb: 'describes how an action is done', verb: 'is an action' };
  function fit(lv) {
    var f = R.pick(FAM), j = R.int(1, 3), frame = f[3 + j];
    return Q.one('Which word fits?', f[j], [1, 2, 3].filter(function (x) { return x !== j; }).map(function (x) { return f[x]; }).concat([f[0]]).slice(0, lv > 1 ? 3 : 2), {
      fig: W.sent(frame.replace('___', W.gap())), prompt: 'Does the gap need a thing, a describing word, or a how word?', hint: 'The gap needs a word that ' + JOBTIP[JOB[j]] + '.',
      explain: W.sent(frame.replace('___', '<b>' + f[j] + '</b>')), meta: { k: 'g8-suffix-fit', frame: frame } });
  }
  function jobOf(lv) {
    var f = R.pick(FAM), j = R.int(lv > 1 ? 0 : 1, 3);
    return Q.tiles('What job does <b>' + f[j] + '</b> do?', JOB[j], JOB.filter(function (x) { return x !== JOB[j]; }).slice(0, lv > 1 ? 3 : 2), {
      hint: '-ion makes a noun. -ive makes an adjective. -ly makes an adverb.', explain: '<b>' + f[j] + '</b> is a' + (JOB[j] === 'adjective' || JOB[j] === 'adverb' ? 'n ' : ' ') + JOB[j] + '.', meta: { k: 'g8-suffix-job', word: f[j] } });
  }
  function matchJobs() {
    var f = R.pick(FAM);
    return { q: 'Match each word to its job.', type: 'match', pairs: [1, 2, 3].map(function (j) { return [f[j], JOB[j]]; }), hint: 'Look at the suffix at the end.', explain: W.tile(f[0]) + ' &rarr; ' + [1, 2, 3].map(function (j) { return W.tile(f[j]); }).join(' '), meta: { k: 'g8-suffix-match' } };
  }
  function pickNouns() {
    var fs = R.some(FAM, 4), right = fs.slice(0, 2).map(function (f) { return f[1]; }), wrong = fs.slice(2).map(function (f, i) { return f[i ? 3 : 2]; });
    return Q.all('Pick every <b>noun</b>.', right, wrong, { hint: 'Here, the nouns end in -ion.', explain: 'A noun names a thing or an idea.', meta: { k: 'g8-suffix-nouns' } });
  }
  function buildJob() {
    var f = R.pick(FAM.filter(function (x) { return x[2].indexOf(x[0]) === 0; })), j = R.int(2, 3), stem = f[0], suf = f[j].slice(stem.length);
    var list = [W.tile(stem, 'base'), W.tile(suf, 'suffix'), W.tile(j === 2 ? 'ion' : 'ive', 'suffix')];
    return { q: 'Build the <b>' + JOB[j] + '</b> from <b>' + stem + '</b>.', type: 'build', parts: list, answer: [0, 1], hint: JOB[j] === 'adjective' ? '-ive makes an adjective.' : '-ively makes an adverb.',
      explain: W.sum([[stem, 'base'], [suf, 'suffix']]), meta: { k: 'g8-suffix-build', want: JOB[j] } };
  }

  /* ---------- spelling changes ---------- */
  /* [base, suffix, right, wrong] */
  var SPELL = {
    e: [['create', 'ion', 'creation', 'createion'], ['hope', 'ing', 'hoping', 'hopeing'], ['value', 'able', 'valuable', 'valueable'], ['amaze', 'ing', 'amazing', 'amazeing'],
      ['excite', 'ment', 'excitement', 'excitment'], ['use', 'ful', 'useful', 'usful'], ['care', 'less', 'careless', 'carless'], ['manage', 'ment', 'management', 'managment']],
    y: [['happy', 'ness', 'happiness', 'happyness'], ['beauty', 'ful', 'beautiful', 'beautyful'], ['carry', 'ed', 'carried', 'carryed'], ['busy', 'ly', 'busily', 'busyly'],
      ['play', 'ful', 'playful', 'plaiful'], ['enjoy', 'ment', 'enjoyment', 'enjoiment'], ['study', 'ing', 'studying', 'studiing']],
    dbl: [['begin', 'ing', 'beginning', 'begining'], ['admit', 'ed', 'admitted', 'admited'], ['regret', 'able', 'regrettable', 'regretable'], ['refer', 'al', 'referral', 'referal'],
      ['visit', 'ed', 'visited', 'visitted'], ['open', 'ing', 'opening', 'openning']]
  };
  var IN = [['possible', 'impossible'], ['mature', 'immature'], ['balance', 'imbalance'], ['legal', 'illegal'], ['logical', 'illogical'], ['regular', 'irregular'],
    ['responsible', 'irresponsible'], ['correct', 'incorrect'], ['visible', 'invisible'], ['complete', 'incomplete']];
  var RULE = { e: 'Drop the silent e before a suffix that starts with a vowel. Keep it before a consonant.', y: 'After a consonant, change y to i (but keep y before -ing). After a vowel, keep the y.',
    dbl: 'Double the last consonant when the stress is on the last beat and the suffix starts with a vowel.' };
  /* base + suffix = the right spelling, as tiles (whole: the word to show at the end, or '?') */
  function added(base, suf, whole) { return W.sum([[base, 'base'], [suf, 'suffix']]).replace(base + suf, whole); }
  function spellAny() { var k = R.pick(Object.keys(SPELL)); return [k, R.pick(SPELL[k])]; }
  function spell(lv, kind) {
    var k = kind || R.pick(Object.keys(SPELL)), s = R.pick(SPELL[k]);
    return Q.one('Add the suffix. Which spelling is right?', s[2], [s[3]], { fig: added(s[0], s[1], '?'),
      prompt: k === 'e' ? 'Does the suffix start with a vowel?' : k === 'y' ? 'Is there a consonant before the y?' : 'Where is the stress?', hint: RULE[k],
      explain: added(s[0], s[1], s[2]), meta: { k: 'g8-spell', base: s[0], suf: s[1] } });
  }
  function spellTf() {
    var p = spellAny(), s = p[1], right = R.int(0, 1) === 1, shown = right ? s[2] : s[3];
    return { q: 'Is this spelled right?', fig: W.sent(s[0] + ' + ' + s[1] + ' = <b>' + shown + '</b>'), type: 'tf', answer: right,
      why: { options: [RULE[p[0]], 'Always just add the suffix to the end.'], answer: 0 }, hint: RULE[p[0]], explain: W.tile(s[2], 'word'), meta: { k: 'g8-spell-tf', base: s[0], suf: s[1], shown: shown } };
  }
  function spellPick() {
    var p = spellAny(), q = spellAny(), list = [p[1], q[1]].filter(function (x, i, a) { return a.indexOf(x) === i; });
    var right = list.map(function (s) { return s[2]; }), wrong = [p[1][3]].concat(q[1] !== p[1] ? [q[1][3]] : [R.pick(SPELL.dbl.filter(function (x) { return x !== p[1]; }))[3]]);
    return Q.all('Pick every word that is spelled right.', right, wrong, { hint: 'Check the end of each base word: a silent e, a y, or one last consonant.', explain: right.join(', '), meta: { k: 'g8-spell-pick' } });
  }
  function inPrefix(lv) {
    var x = R.pick(IN), pre = x[1].slice(0, 2);
    return Q.tiles('Which prefix makes <b>not ' + x[0] + '</b>?', pre, ['in', 'im', 'il', 'ir'].filter(function (p) { return p !== pre; }).slice(0, lv > 1 ? 3 : 2), {
      fig: '<span class="wsum">' + W.tile('?', 'prefix') + W.tile(x[0], 'base') + '</span>', hint: 'in- changes to im- before b, m or p, to il- before l, and to ir- before r.',
      explain: W.tile(x[1], 'word'), meta: { k: 'g8-in-prefix', base: x[0] } });
  }

  Atlas.register('roots', {
    lessons: [{
      id: 'roots', title: 'Greek and Latin roots', sub: 'Most long words are built from old parts.',
      concepts: [
        { slug: 'root', title: 'A root holds the meaning', exp: ['B2.1'], skill: 'roots',
          model: [
            step(W.tile('port', 'base'), '<b>port</b> = carry. It comes from Latin.'),
            step(W.sum([['trans', 'prefix'], ['port', 'base']]), '<b>trans-</b> = across. Carry across.'),
            step(W.sum([['port', 'base'], ['able', 'suffix']]), 'Able to be carried.'),
            step(W.sum([['in', 'prefix'], ['spect', 'base']]), '<b>spect</b> = look. Look into closely.')
          ],
          guided: [function () { return meaning(1, WORDS); }, whichPart],
          check: [function () { return meaning(2, WORDS); }, function () { return wordFor(1); }],
          coach: '<p>When a long word stops the reader, cover the prefix and suffix and ask: "What is the root? What does it mean?" Keep a growing list of roots on a card.</p>',
          mistake: '<p>Guessing from the first few letters. Make the child find the root first, then build the meaning outward: prefix, root, suffix.</p>' },
        { slug: 'two-roots', title: 'Two roots, one word', exp: ['B2.1'], skill: 'roots',
          model: [
            step(W.sum([['tele', 'base'], ['scope', 'base']]), '<b>tele</b> = far. <b>scope</b> = look at.'),
            step(W.means('think', 'a tool for looking at far things')),
            step(W.sum([['bio', 'base'], ['graph', 'base'], ['y', 'suffix']]), '<b>bio</b> = life. <b>graph</b> = write.')
          ],
          guided: [function () { return meaning(1, TWO); }, function () { return buildTwo(1); }],
          check: [function () { return meaning(2, TWO); }, function () { return buildTwo(2); }],
          coach: '<p>Science and math are full of two-root words. Collect them from other subjects: thermometer, photograph, geology.</p>',
          mistake: '<p>Reading the roots in the wrong order of meaning. A telescope is a tool for looking at far things; say the meaning, then check it makes sense.</p>' },
        { slug: 'family', title: 'A root makes a word family', exp: ['B2.1'], skill: 'roots',
          model: [
            step(W.tile('rupt', 'base'), '<b>rupt</b> = break.'),
            step(W.tile('interrupt') + ' ' + W.tile('erupt'), 'Break in between. Break out.'),
            step(W.tile('dict', 'base') + ' ' + W.tile('predict') + ' ' + W.tile('contradict'), '<b>dict</b> = say.')
          ],
          guided: [function () { return family(1); }, matchRoots],
          check: [function () { return family(2); }, tfRoot],
          coach: '<p>Pick one root a week. Hunt for it in reading across subjects and add each word to a family list.</p>',
          mistake: '<p>Lookalikes: not every "port" or "vis" is the root (sport, visa). Check that the meaning fits.</p>' }
      ]
    }, {
      id: 'suffixes', title: 'Suffixes and spelling', sub: 'Suffixes change a word' + '’' + 's job, and sometimes its spelling.',
      concepts: [
        { slug: 'jobs', title: 'A suffix can change a word' + '’' + 's job', exp: ['B2.1'], skill: 'suffix-jobs',
          model: [
            step(W.tile('decide'), 'A verb: an action.'),
            step(W.sum([['decis', 'base'], ['ion', 'suffix']]), '<b>-ion</b>: a noun, a thing or idea.'),
            step(W.sum([['decis', 'base'], ['ive', 'suffix']]), '<b>-ive</b>: an adjective.'),
            step(W.sum([['decisive', 'base'], ['ly', 'suffix']]), '<b>-ly</b>: an adverb, how it is done.')
          ],
          guided: [function () { return jobOf(1); }, matchJobs],
          check: [function () { return jobOf(2); }, buildJob],
          coach: '<p>Say one word family aloud in sentences: "I decide. I made a decision. I am decisive. I acted decisively." The sentence shows the job.</p>',
          mistake: '<p>Using the right family but the wrong form ("a creatively idea"). Ask what the gap needs: a thing, a describing word, or a how word.</p>' },
        { slug: 'fit', title: 'Pick the form the sentence needs', exp: ['B2.1'], skill: 'suffix-jobs',
          model: [
            step(W.sent('A ' + W.gap() + ' leader acts quickly.'), 'The gap describes <b>leader</b>.'),
            step(W.sent('A <b>decisive</b> leader acts quickly.'), 'An adjective: <b>-ive</b>.'),
            step(W.sent('She acted <b>decisively</b>.'), 'How she acted: <b>-ly</b>.')
          ],
          guided: [function () { return fit(1); }, function () { return fit(1); }],
          check: [function () { return fit(2); }, pickNouns],
          coach: '<p>Read the sentence aloud with each form. The ear often catches the wrong one.</p>',
          mistake: '<p>Choosing by meaning only. All the options mean nearly the same; the job in the sentence decides.</p>' },
        { slug: 'e-drop', title: 'Drop the silent e before a vowel', exp: ['B2.1'], skill: 'spelling',
          model: [
            step(added('create', 'ion', 'creation'), '<b>-ion</b> starts with a vowel. The e goes.'),
            step(added('excite', 'ment', 'excitement'), '<b>-ment</b> starts with a consonant. The e stays.')
          ],
          guided: [function () { return spell(1, 'e'); }, function () { return spell(1, 'e'); }],
          check: [function () { return spell(2, 'e'); }, function () { return spell(2, 'e'); }],
          coach: '<p>Have the child circle the first letter of the suffix: vowel or consonant? That one look decides.</p>',
          mistake: '<p>Dropping the e everywhere (excitment, usful).</p>' },
        { slug: 'y-i', title: 'Change y to i after a consonant', exp: ['B2.1'], skill: 'spelling',
          model: [
            step(added('happy', 'ness', 'happiness'), '<b>p</b> comes before the y.'),
            step(W.sum([['play', 'base'], ['ful', 'suffix']]), '<b>a</b> comes before the y: keep it.'),
            step(W.sum([['study', 'base'], ['ing', 'suffix']]), 'Keep the y before <b>-ing</b>.')
          ],
          guided: [function () { return spell(1, 'y'); }, function () { return spell(1, 'y'); }],
          check: [function () { return spell(2, 'y'); }, function () { return spell(2, 'y'); }],
          coach: '<p>"Studiing" looks wrong because English avoids two i' + '’' + 's in a row. Point that out once.</p>',
          mistake: '<p>Changing every y (plaiful). Check the letter before the y.</p>' },
        { slug: 'double', title: 'Double the last consonant when the end is stressed', exp: ['B2.1'], skill: 'spelling',
          model: [
            step(W.syl(['be', '<b>GIN</b>']), 'Stress on the last beat.'),
            step(added('begin', 'ing', 'beginning'), 'Double the n.'),
            step(W.syl(['<b>VIS</b>', 'it']) + ' ' + W.tile('visited', 'word'), 'Stress on the first beat: no double.')
          ],
          guided: [function () { return spell(1, 'dbl'); }, function () { return spell(1, 'dbl'); }],
          check: [function () { return spell(2, 'dbl'); }, spellTf],
          coach: '<p>Say the word and clap the beats. The loud clap is the stress.</p>',
          mistake: '<p>Doubling after an unstressed end (visitted, openning).</p>' },
        { slug: 'in-prefix', title: 'in- becomes im-, il- or ir-', exp: ['B2.1'], skill: 'spelling',
          model: [
            step(W.tile('im', 'prefix') + W.tile('possible', 'base'), 'Before b, m or p.'),
            step(W.tile('il', 'prefix') + W.tile('legal', 'base'), 'Before l.'),
            step(W.tile('ir', 'prefix') + W.tile('regular', 'base'), 'Before r. All of them mean <b>not</b>.')
          ],
          guided: [function () { return inPrefix(1); }, function () { return inPrefix(1); }],
          check: [function () { return inPrefix(2); }, spellPick],
          coach: '<p>The prefix changes to make the word easier to say. Try saying "inpossible" quickly: the lips close for the p, so it becomes im-.</p>',
          mistake: '<p>Writing one l or one r (ilegal, iresponsible). The prefix keeps its own letter: il + legal.</p>' }
      ]
    }],
    practice: [
      { id: 'roots', name: 'Greek and Latin roots', code: 'B2.1', gen: meaning },
      { id: 'suffix-jobs', name: 'Suffixes and word jobs', code: 'B2.1', gen: fit },
      { id: 'spelling', name: 'Spelling with suffixes and prefixes', code: 'B2.1', gen: function (lv) { return spell(lv); } }
    ]
  });

  Q.shapes('roots', {
    roots: [[1, 'which-part', whichPart], [1, 'which-word', wordFor], [1, 'family', family], [2, 'match', matchRoots], [2, 'build', buildTwo], [2, 'true-false', tfRoot]],
    'suffix-jobs': [[1, 'job', jobOf], [1, 'match', matchJobs], [2, 'pick-nouns', pickNouns], [2, 'build', buildJob]],
    spelling: [[1, 'in-prefix', inPrefix], [2, 'true-false', spellTf], [2, 'pick', spellPick]]
  });
})();
