/* Grade 7: word parts. Greek and Latin roots, prefixes and suffixes in complex words, and spelling rules for adding suffixes.
   Ontario 2023 Language, Grade 7:
   B2.1 "use generalized knowledge of the meanings of words and morphemes (i.e., bases, prefixes, and suffixes) to read and spell complex words with accuracy and automaticity"
   B2.2 "... use generalized morphological knowledge to analyze and understand new words in context"
   All word lists and sentences are written for this site. Answer checks: tests/verify/grade7-word-parts.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* ---------- roots: what each one means, and words built on it ---------- */
  var ROOTS = {
    port: ['carry', ['transport', 'portable', 'export', 'import']],
    dict: ['say', ['predict', 'dictate', 'contradict', 'verdict']],
    rupt: ['break', ['erupt', 'interrupt', 'disrupt', 'rupture']],
    struct: ['build', ['construct', 'structure', 'instruct', 'destruction']],
    spect: ['look', ['inspect', 'spectator', 'respect', 'spectacle']],
    aud: ['hear', ['audience', 'audible', 'audio', 'auditorium']],
    vis: ['see', ['visible', 'vision', 'visual', 'invisible']],
    ject: ['throw', ['project', 'reject', 'eject', 'inject']],
    geo: ['earth', ['geology', 'geometry', 'geothermal']],
    chron: ['time', ['chronological', 'chronicle', 'chronic']],
    graph: ['write', ['autograph', 'paragraph', 'graphic', 'photograph']],
    bio: ['life', ['biology', 'biome', 'biosphere']]
  };
  var KEYS = Object.keys(ROOTS);
  function root(r) { return r || R.pick(KEYS); }
  function others(r, n) { return R.some(KEYS.filter(function (k) { return k !== r; }), n); }
  /* a word with its root marked */
  function marked(w, r) { var i = w.indexOf(r); return w.slice(0, i) + '<mark class="hl">' + r + '</mark>' + w.slice(i + r.length); }

  function rootMeaning(lv) {
    var r = root(), ex = R.some(ROOTS[r][1], 2);
    return Q.one('What does the root <b>' + r + '</b> mean?', ROOTS[r][0], others(r, lv > 1 ? 3 : 2).map(function (k) { return ROOTS[k][0]; }), {
      fig: W.tile(marked(ex[0], r)) + ' ' + W.tile(marked(ex[1], r)), prompt: 'What do these two words share?', hint: 'Think of a word you know with this root.',
      explain: '<b>' + r + '</b> means <b>' + ROOTS[r][0] + '</b>.', meta: { k: 'g7-root-meaning', root: r } });
  }
  function rootWhich(lv) {
    var r = root(), right = R.pick(ROOTS[r][1]), wrong = others(r, lv > 1 ? 3 : 2).map(function (k) { return R.pick(ROOTS[k][1]); });
    return Q.tiles('Which word has a root that means <b>' + ROOTS[r][0] + '</b>?', right, wrong, { hint: 'Look for the root inside each word.',
      explain: W.tile(marked(right, r)) + ' <b>' + r + '</b> = ' + ROOTS[r][0], meta: { k: 'g7-root-which', mean: ROOTS[r][0] } });
  }
  function rootMatch() {
    var rs = R.some(KEYS, 3);
    return { q: 'Match each root to its meaning.', type: 'match', pairs: rs.map(function (r) { return [r, ROOTS[r][0]]; }), hint: 'Think of one word for each root.',
      explain: rs.map(function (r) { return '<b>' + r + '</b> = ' + ROOTS[r][0]; }).join(' &middot; '), meta: { k: 'g7-root-match' } };
  }
  function rootTf() {
    var r = root(), w = R.pick(ROOTS[r][1]), right = R.int(0, 1) === 1, said = right ? ROOTS[r][0] : ROOTS[others(r, 1)[0]][0];
    return { q: Q.name() + ' says:', fig: W.sent('<b>' + w + '</b> has the root <b>' + r + '</b>, which means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['<b>' + r + '</b> means ' + ROOTS[r][0] + '.', '<b>' + w + '</b> has no root.'], answer: 0 },
      hint: 'What does ' + r + ' mean in other words you know?', explain: '<b>' + r + '</b> means <b>' + ROOTS[r][0] + '</b>.', meta: { k: 'g7-root-tf', root: r, said: said } };
  }
  function rootFamily() {
    var r = root(), right = R.some(ROOTS[r][1], 2), wrong = others(r, 2).map(function (k) { return R.pick(ROOTS[k][1]); });
    return Q.all('Pick every word in the <b>' + r + '</b> family.', right, wrong, { hint: 'Find <b>' + r + '</b> inside the word.', explain: 'They all share <b>' + r + '</b>: ' + ROOTS[r][0] + '.', meta: { k: 'g7-root-family', root: r } });
  }

  /* ---------- taking long words apart: [prefix, its meaning, root, suffix, what the word means] ---------- */
  var PARTS = [
    ['trans', 'across', 'port', '', 'carry across', 'transport'], ['ex', 'out', 'port', '', 'carry out of a country', 'export'],
    ['inter', 'between', 'rupt', '', 'break in between', 'interrupt'], ['e', 'out', 'rupt', '', 'break out', 'erupt'],
    ['pre', 'before', 'dict', '', 'say before it happens', 'predict'], ['contra', 'against', 'dict', '', 'say the opposite', 'contradict'],
    ['in', 'into', 'spect', '', 'look into closely', 'inspect'], ['re', 'back', 'ject', '', 'throw back, or turn down', 'reject'],
    ['con', 'together', 'struct', '', 'build by putting parts together', 'construct'], ['', '', 'aud', 'ible', 'able to be heard', 'audible'],
    ['', '', 'vis', 'ible', 'able to be seen', 'visible'], ['', '', 'port', 'able', 'able to be carried', 'portable'],
    ['', '', 'spect', 'ator', 'a person who watches', 'spectator'], ['', '', 'geo', 'logy', 'the study of the earth', 'geology'], ['', '', 'bio', 'logy', 'the study of life', 'biology']
  ];
  var SUF = { ible: 'able to be', able: 'able to be', ator: 'a person who', logy: 'the study of' };
  function tiles(p) { return (p[0] ? [[p[0], 'prefix']] : []).concat([[p[2], 'base']]).concat(p[3] ? [[p[3], 'suffix']] : []); }
  function partLine(p) { return (p[0] ? '<b>' + p[0] + '</b> = ' + p[1] + ', ' : '') + '<b>' + p[2] + '</b> = ' + ROOTS[p[2]][0] + (p[3] ? ', <b>' + p[3] + '</b> = ' + SUF[p[3]] : ''); }
  function wordMeaning(lv) {
    var p = R.pick(PARTS), wrong = R.some(PARTS.filter(function (x) { return x !== p; }), lv > 1 ? 3 : 2).map(function (x) { return x[4]; });
    return Q.one('What does <b>' + p[5] + '</b> mean?', p[4], wrong, { fig: lv > 1 ? W.tile(p[5]) : W.sum(tiles(p)), prompt: 'Split it into parts. What does each part mean?',
      hint: 'Find the root first.', explain: partLine(p), steps: ['Find the root: <b>' + p[2] + '</b> = ' + ROOTS[p[2]][0] + '.', 'Add the meaning of the other part.', 'So <b>' + p[5] + '</b> means <b>' + p[4] + '</b>.'],
      meta: { k: 'g7-word-meaning', word: p[5] } });
  }
  function buildWord(lv) {
    var p = R.pick(PARTS.filter(function (x) { return x[0]; })), q = R.pick(PARTS.filter(function (x) { return x[0] && x[0] !== p[0] && x[2] !== p[2]; }));
    var list = [W.tile(p[0], 'prefix'), W.tile(p[2], 'base'), W.tile(q[0], 'prefix')].concat(lv > 1 ? [W.tile(q[2], 'base')] : []);
    return { q: 'Build the word that means <b>' + p[4] + '</b>.', type: 'build', parts: list, answer: [0, 1], hint: 'Which root means ' + ROOTS[p[2]][0] + '? Which prefix fits?',
      explain: W.sum(tiles(p)), meta: { k: 'g7-build', mean: p[4] } };
  }
  function whichPart() {
    var p = R.pick(PARTS.filter(function (x) { return x[0]; })), list = [p[0], p[2]], ask = R.int(0, 1);
    return Q.tiles('In <b>' + p[5] + '</b>, which part means <b>' + (ask ? ROOTS[p[2]][0] : p[1]) + '</b>?', list[ask], [list[1 - ask], p[5]], { fig: W.sum(tiles(p)), hint: 'The root holds the core meaning; the prefix comes first.',
      explain: partLine(p), meta: { k: 'g7-which-part', word: p[5], mean: ask ? ROOTS[p[2]][0] : p[1] } });
  }
  /* [word, sentence, meaning, wrong meanings] */
  var CTX = [
    ['audible', 'The coach' + AP + 's voice was barely <b>audible</b> over the wind.', 'able to be heard', ['easy to see', 'able to be carried']],
    ['visible', 'On clear nights, the northern lights are <b>visible</b> from the dock.', 'able to be seen', ['able to be heard', 'hidden']],
    ['portable', 'The <b>portable</b> speaker fit in her backpack.', 'able to be carried', ['able to be heard', 'broken']],
    ['interrupt', 'Please do not <b>interrupt</b> while a classmate is presenting.', 'break in while someone is talking', ['agree with', 'carry away']],
    ['inspect', 'Before the trip, we <b>inspect</b> every canoe for cracks.', 'look at closely', ['throw out', 'build']],
    ['reject', 'The council may <b>reject</b> the plan if it costs too much.', 'turn down', ['say again', 'look into']],
    ['spectators', 'Hundreds of <b>spectators</b> lined the trail to watch the dogsled race.', 'people who watch', ['people who build', 'people who race']],
    ['chronological', 'Put the events in <b>chronological</b> order, from first to last.', 'in time order', ['in size order', 'in order of importance']],
    ['geothermal', 'The building is heated with <b>geothermal</b> energy from deep underground.', 'heat from the earth', ['heat from the sun', 'heat from the wind']],
    ['predict', 'Forecasters <b>predict</b> the storm will reach Thunder Bay tonight.', 'say before it happens', ['say the opposite', 'break apart']]
  ];
  function inContext(lv) {
    var c = R.pick(CTX);
    return Q.one('What does <b>' + c[0] + '</b> mean here?', c[2], c[3].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(c[1]), prompt: 'Use the root, then check that the meaning fits the sentence.',
      hint: 'Find the root. Does your meaning make sense in the sentence?', explain: W.sent(c[1]) + '<p><b>' + c[0] + '</b> means <b>' + c[2] + '</b>.</p>', meta: { k: 'g7-in-context', word: c[0] } });
  }

  /* ---------- spelling with suffixes: [base, suffix, right, wrong spellings, rule] ---------- */
  var SP = [
    ['create', 'ion', 'creation', ['createion', 'creasion'], 'drop'], ['value', 'able', 'valuable', ['valueable', 'valuble'], 'drop'], ['hope', 'ing', 'hoping', ['hopeing', 'hopping'], 'drop'],
    ['amaze', 'ing', 'amazing', ['amazeing', 'amazzing'], 'drop'], ['believe', 'able', 'believable', ['believeable', 'beleivable'], 'drop'],
    ['manage', 'ment', 'management', ['managment', 'managemint'], 'keep'], ['excite', 'ment', 'excitement', ['excitment', 'excitemint'], 'keep'], ['complete', 'ly', 'completely', ['completly', 'completeley'], 'keep'],
    ['occur', 'ed', 'occurred', ['occured', 'ocurred'], 'double'], ['begin', 'ing', 'beginning', ['begining', 'beginnig'], 'double'], ['admit', 'ed', 'admitted', ['admited', 'addmited'], 'double'],
    ['regret', 'able', 'regrettable', ['regretable', 'regretible'], 'double'], ['permit', 'ed', 'permitted', ['permited', 'permmited'], 'double'],
    ['visit', 'ed', 'visited', ['visitted', 'visitid'], 'single'], ['open', 'ing', 'opening', ['openning', 'opining'], 'single'], ['limit', 'ed', 'limited', ['limitted', 'limitid'], 'single'], ['happen', 'ing', 'happening', ['happenning', 'hapening'], 'single'],
    ['happy', 'ness', 'happiness', ['happyness', 'hapiness'], 'y-i'], ['rely', 'able', 'reliable', ['relyable', 'relieable'], 'y-i'], ['carry', 'ed', 'carried', ['carryed', 'caried'], 'y-i'], ['beauty', 'ful', 'beautiful', ['beautyful', 'beutiful'], 'y-i'],
    ['carry', 'ing', 'carrying', ['carriing', 'carying'], 'keep-y'], ['study', 'ing', 'studying', ['studiing', 'studing'], 'keep-y'], ['enjoy', 'ment', 'enjoyment', ['enjoiment', 'enjoyement'], 'keep-y']
  ];
  var RULE = { drop: 'Drop the silent e.', keep: 'Keep the e.', double: 'Double the last consonant.', single: 'Just add the suffix.', 'y-i': 'Change y to i.', 'keep-y': 'Keep the y.' };
  var GROUP = { drop: ['drop', 'keep'], keep: ['drop', 'keep'], double: ['double', 'single'], single: ['double', 'single'], 'y-i': ['y-i', 'keep-y'], 'keep-y': ['y-i', 'keep-y'] };
  function sp(rule) { return R.pick(rule ? SP.filter(function (s) { return GROUP[rule].indexOf(s[4]) >= 0; }) : SP); }
  function addSuffix(lv, rule) {
    var s = sp(rule);
    return Q.tiles('Add <b>-' + s[1] + '</b> to <b>' + s[0] + '</b>.', s[2], s[3].slice(0, lv > 1 ? 2 : 1), { fig: '<span class="wsum">' + W.tile(s[0], 'base') + '<span class="wop" aria-hidden="true">+</span>' + W.tile(s[1], 'suffix') + '</span>',
      prompt: 'Does the suffix start with a vowel? Does the base end in e or y?', hint: RULE[s[4]], explain: W.tile(s[2]) + ' ' + RULE[s[4]], meta: { k: 'g7-add-suffix', base: s[0], suf: s[1] } });
  }
  function whichRule(lv, rule) {
    var s = sp(rule), opts = GROUP[s[4]].map(function (g) { return RULE[g]; });
    return Q.tiles('How do you spell <b>' + s[0] + '</b> + <b>-' + s[1] + '</b>?', RULE[s[4]], opts.filter(function (o) { return o !== RULE[s[4]]; }), {
      hint: 'Look at the last letters of the base word and the first letter of the suffix.', explain: W.tile(s[2]), meta: { k: 'g7-which-rule', base: s[0], suf: s[1] } });
  }
  function spellPick() {
    var list = R.some(SP, 4), right = list.slice(0, 2).map(function (s) { return s[2]; }), wrong = list.slice(2).map(function (s) { return R.pick(s[3]); });
    return Q.all('Pick every word that is spelled correctly.', right, wrong, { hint: 'Check each base word and its suffix.', explain: 'Spelled correctly: <b>' + right.join('</b>, <b>') + '</b>.', meta: { k: 'g7-spell-pick' } });
  }
  function spellChoose(lv) {
    var s = sp();
    return Q.one('Which word is spelled correctly?', s[2], s[3].slice(0, lv > 1 ? 2 : 1), { hint: RULE[s[4]], explain: '<b>' + s[0] + '</b> + <b>-' + s[1] + '</b> = <b>' + s[2] + '</b>', meta: { k: 'g7-spell-choose', base: s[0], suf: s[1] } });
  }

  Atlas.register('word-parts', {
    lessons: [{
      id: 'roots', title: 'Greek and Latin roots', sub: 'The core of a long word.',
      concepts: [
        { slug: 'root', title: 'A root carries the core meaning', exp: ['B2.1'], skill: 'roots',
          model: [
            step(W.tile('port', 'base'), 'Latin <b>port</b>: carry.'),
            step(W.sum([['trans', 'prefix'], ['port', 'base']]), 'Carry across.'),
            step(W.sum([['port', 'base'], ['able', 'suffix']]), 'Able to be carried.')
          ],
          guided: [function () { return rootMeaning(1); }, function () { return rootWhich(1); }],
          check: [function () { return rootMeaning(2); }, function () { return rootWhich(2); }],
          coach: '<p>Keep a root wall or list. Each time you meet a long word, ask: "Is there a root I know in here?"</p>',
          mistake: '<p>Expecting the root alone to give the exact meaning. It gives the core; the sentence gives the rest.</p>' },
        { slug: 'family', title: 'Words in a family share a root', exp: ['B2.1'], skill: 'roots',
          model: [
            step(W.tile(marked('inspect', 'spect')) + ' ' + W.tile(marked('spectator', 'spect')) + ' ' + W.tile(marked('respect', 'spect')), '<b>spect</b>: look.'),
            step(W.tile(marked('audience', 'aud')) + ' ' + W.tile(marked('audible', 'aud')), '<b>aud</b>: hear.'),
            step(W.tile(marked('visible', 'vis')) + ' ' + W.tile(marked('vision', 'vis')), '<b>vis</b>: see.')
          ],
          guided: [rootFamily, rootMatch],
          check: [rootFamily, rootTf],
          coach: '<p>Pick a root and race to list five family members. Then check them in a dictionary together.</p>',
          mistake: '<p>Grouping words that only share letters. "Sport" and "support" look similar to "port" words, but check the meaning.</p>' },
        { slug: 'greek', title: 'Greek roots build science words', exp: ['B2.1'], skill: 'roots',
          model: [
            step(W.sum([['geo', 'base'], ['logy', 'suffix']]), 'Earth + the study of.'),
            step(W.sum([['bio', 'base'], ['logy', 'suffix']]), 'Life + the study of.'),
            step(W.tile(marked('chronological', 'chron')), '<b>chron</b>: time. In time order.')
          ],
          guided: [function () { return rootMeaning(1); }, rootMatch],
          check: [rootTf, function () { return rootWhich(2); }],
          coach: '<p>Look through a science or geography textbook together and circle roots. Many subject words are built this way.</p>',
          mistake: '<p>Skipping long science words. Slow down and split them: the parts are usually familiar.</p>' }
      ]
    }, {
      id: 'analyze', title: 'Taking long words apart', sub: 'Prefix, root and suffix, then check the sentence.',
      concepts: [
        { slug: 'split', title: 'Split a long word into parts', exp: ['B2.1', 'B2.2'], skill: 'analyze',
          model: [
            step(W.tile('interrupt')),
            step(W.sum([['inter', 'prefix'], ['rupt', 'base']]), '<b>inter</b> = between. <b>rupt</b> = break.'),
            step(W.sent('to break in between'), 'Put the meanings together.')
          ],
          guided: [function () { return wordMeaning(1); }, whichPart],
          check: [function () { return wordMeaning(2); }, function () { return buildWord(1); }],
          coach: '<p>Cover the prefix with a finger, then the suffix. What is left is the root.</p>',
          mistake: '<p>Splitting in the wrong place (in-ter-rupt by syllables). Split by meaning parts, not by beats.</p>' },
        { slug: 'suffix', title: 'A suffix adds to the meaning', exp: ['B2.1'], skill: 'analyze',
          model: [
            step(W.sum([['aud', 'base'], ['ible', 'suffix']]), '<b>-ible</b>: able to be. Able to be heard.'),
            step(W.sum([['spect', 'base'], ['ator', 'suffix']]), '<b>-ator</b>: a person who. A person who watches.')
          ],
          guided: [function () { return wordMeaning(1); }, function () { return wordMeaning(1); }],
          check: [function () { return wordMeaning(2); }, whichPart],
          coach: '<p>Sort words by suffix: -able and -ible words, -or and -er people, -logy subjects.</p>',
          mistake: '<p>Ignoring the suffix and giving only the root meaning ("audible means hear"). The suffix changes the job of the word.</p>' },
        { slug: 'context', title: 'Check the parts against the sentence', exp: ['B2.2'], skill: 'analyze',
          model: [
            step(W.sent('The coach' + AP + 's voice was barely <b>audible</b> over the wind.'), 'A new word.'),
            step(W.sum([['aud', 'base'], ['ible', 'suffix']]), 'Able to be heard.'),
            step(W.sent('barely able to be heard over the wind'), 'It fits the sentence.')
          ],
          guided: [function () { return inContext(1); }, function () { return inContext(1); }],
          check: [function () { return inContext(2); }, function () { return buildWord(2); }],
          coach: '<p>After working out a word, read the sentence again with the meaning in its place. If it sounds right, it probably is.</p>',
          mistake: '<p>Stopping at the parts. Some words have drifted from their roots; the sentence is the final check.</p>' }
      ]
    }, {
      id: 'spelling', title: 'Spelling with suffixes', sub: 'Three rules for adding an ending.',
      concepts: [
        { slug: 'drop-e', title: 'Drop the silent e before a vowel suffix', exp: ['B2.1'], skill: 'spelling',
          model: [
            step(W.tile('hope', 'base') + ' + ' + W.tile('ing', 'suffix') + ' = ' + W.tile('hoping'), '<b>-ing</b> starts with a vowel.'),
            step(W.tile('hope', 'base') + ' + ' + W.tile('ful', 'suffix') + ' = ' + W.tile('hopeful'), '<b>-ful</b> starts with a consonant: keep the e.')
          ],
          guided: [function () { return addSuffix(1, 'drop'); }, function () { return whichRule(1, 'drop'); }],
          check: [function () { return addSuffix(2, 'drop'); }, function () { return whichRule(1, 'keep'); }],
          coach: '<p>Say the rule as a question: "Does the suffix start with a vowel? Then the e goes."</p>',
          mistake: '<p>Dropping the e before every suffix (managment). Only a vowel suffix pushes the e out.</p>' },
        { slug: 'double', title: 'Double the last consonant when it is stressed', exp: ['B2.1'], skill: 'spelling',
          model: [
            step(W.syl(['oc', '<b>CUR</b>']) + ' &rarr; ' + W.tile('occurred'), 'Stress at the end: double the r.'),
            step(W.syl(['<b>VIS</b>', 'it']) + ' &rarr; ' + W.tile('visited'), 'Stress at the start: just add -ed.')
          ],
          guided: [function () { return addSuffix(1, 'double'); }, function () { return whichRule(1, 'double'); }],
          check: [function () { return addSuffix(2, 'double'); }, function () { return whichRule(2, 'single'); }],
          coach: '<p>Clap the word and say it with the stress on each beat in turn. The one that sounds right tells you where the stress is.</p>',
          mistake: '<p>Doubling in words like visit and limit. The stress is on the first beat, so there is no double.</p>' },
        { slug: 'y-i', title: 'Change y to i, but not before -ing', exp: ['B2.1'], skill: 'spelling',
          model: [
            step(W.tile('happy', 'base') + ' + ' + W.tile('ness', 'suffix') + ' = ' + W.tile('happiness')),
            step(W.tile('carry', 'base') + ' + ' + W.tile('ing', 'suffix') + ' = ' + W.tile('carrying'), 'Two i' + AP + 's in a row look wrong.'),
            step(W.tile('enjoy', 'base') + ' + ' + W.tile('ment', 'suffix') + ' = ' + W.tile('enjoyment'), 'A vowel before the y: keep it.')
          ],
          guided: [function () { return addSuffix(1, 'y-i'); }, function () { return whichRule(1, 'y-i'); }],
          check: [function () { return addSuffix(2, 'y-i'); }, spellPick],
          coach: '<p>Check the letter before the y. A consonant (carry) means change it; a vowel (enjoy) means keep it.</p>',
          mistake: '<p>Writing "carriing" or "studiing". Before -ing, always keep the y.</p>' }
      ]
    }],
    practice: [
      { id: 'roots', name: 'Greek and Latin roots', code: 'B2.1', gen: rootMeaning },
      { id: 'analyze', name: 'Taking long words apart', code: 'B2.1, B2.2', gen: wordMeaning },
      { id: 'spelling', name: 'Spelling with suffixes', code: 'B2.1', gen: function (lv) { return addSuffix(lv); } }
    ]
  });

  Q.shapes('word-parts', {
    roots: [[1, 'which-word', rootWhich], [1, 'match', rootMatch], [2, 'true-false', rootTf], [2, 'family', rootFamily]],
    analyze: [[1, 'which-part', whichPart], [1, 'in-context', inContext], [2, 'build', buildWord]],
    spelling: [[1, 'which-rule', function (lv) { return whichRule(lv); }], [2, 'choose', spellChoose], [2, 'pick', spellPick]]
  });
})();
