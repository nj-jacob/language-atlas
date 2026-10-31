/* Grade 4: spelling word endings. What happens to a base word when you add an ending: drop the silent e, double the last
   letter, change y to i; and plurals with -s, -es and -ies.
   Ontario 2023 Language, Grade 4, B2.1 "use knowledge of the meanings of words and morphemes (i.e., bases, prefixes, and suffixes)
   to read and spell words". The rules are shown with letter tiles, and every rule is shown next to the words it does not touch.
   Word lists are written for this site. Answer checks: tests/verify/grade4-spelling.js (its own list of right spellings). */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* [base, ending] for each rule, and for the words the rule leaves alone */
  var RULES = {
    e: { name: 'Drop the e', words: [['hope', 'ing'], ['make', 'ing'], ['bake', 'ed'], ['smile', 'ing'], ['ride', 'ing'], ['save', 'ed'], ['share', 'ing'], ['skate', 'er'], ['dance', 'er']] },
    keepE: { name: 'Keep the e', words: [['hope', 'ful'], ['care', 'ful'], ['move', 'ment'], ['safe', 'ly'], ['use', 'ful'], ['excite', 'ment'], ['lone', 'ly'], ['late', 'ly']] },
    dbl: { name: 'Double the last letter', words: [['hop', 'ing'], ['run', 'ing'], ['plan', 'ed'], ['swim', 'er'], ['stop', 'ed'], ['drop', 'ing'], ['skip', 'ed'], ['shop', 'ing'], ['grab', 'ed'], ['big', 'er'], ['sad', 'est'], ['chat', 'ing']] },
    noDbl: { name: 'Just add it', words: [['jump', 'ing'], ['rain', 'ed'], ['help', 'er'], ['look', 'ing'], ['camp', 'ed'], ['read', 'er'], ['sing', 'ing'], ['cool', 'er']] },
    yi: { name: 'Change y to i', words: [['cry', 'ed'], ['happy', 'ness'], ['carry', 'ed'], ['try', 'es'], ['busy', 'ly'], ['study', 'ed'], ['funny', 'er'], ['hurry', 'ed'], ['easy', 'ly']] },
    keepY: { name: 'Keep the y', words: [['cry', 'ing'], ['play', 'ed'], ['enjoy', 'ed'], ['carry', 'ing'], ['stay', 'ed'], ['study', 'ing'], ['spray', 'ed'], ['hurry', 'ing']] }
  };
  var MAIN = ['e', 'dbl', 'yi'], PAIR = { e: 'keepE', dbl: 'noDbl', yi: 'keepY' };
  /* the right spelling, and the parts it is built from (the base as it is written, any added letter, the ending) */
  function partsOf(rule, w) {
    var b = w[0], end = w[1];
    if (rule === 'e') return [b.slice(0, -1), end];
    if (rule === 'dbl') return [b, b.slice(-1), end];
    if (rule === 'yi') return [b.slice(0, -1), 'i', end];
    return [b, end];
  }
  function spell(rule, w) { return partsOf(rule, w).join(''); }
  /* the usual mistakes: the plain join, and the wrong rule */
  function mistakes(rule, w) {
    var b = w[0], end = w[1], plain = b + end, out = [];
    if (rule === 'e') out = [plain, b.slice(0, -1) + b.slice(-2, -1) + end];
    else if (rule === 'keepE') out = [b.slice(0, -1) + end];
    else if (rule === 'dbl') out = [plain, b + 'e' + end];
    else if (rule === 'noDbl') out = [b + b.slice(-1) + end];
    else if (rule === 'yi') out = [plain, b.slice(0, -1) + 'ie' + end];
    else out = [b.slice(0, -1) + 'i' + end];
    return out.filter(function (x) { return x !== spell(rule, w); });
  }
  function ruleOf(r0) { return r0 || R.pick(MAIN); }
  function sum(rule, w) { return '<span class="wsum">' + W.tile(w[0], 'base') + '<span class="wop" aria-hidden="true">+</span>' + W.tile(w[1], 'suffix') + '<span class="wop" aria-hidden="true">=</span>' + W.tile(spell(rule, w), 'word') + '</span>'; }
  var WHY = { e: 'The ending starts with a vowel, so the e goes.', keepE: 'The ending starts with a consonant, so the e stays.', dbl: 'One short vowel, then one consonant: double it.',
    noDbl: 'Two consonants or two vowels at the end: just add it.', yi: 'A consonant comes before the y, so y changes to i.', keepY: 'The y stays: a vowel comes before it, or the ending is -ing.' };

  /* ---------- endings ---------- */
  function addEnding(lv, r0) {
    var main = ruleOf(r0), rule = lv > 1 && R.int(0, 2) === 0 ? PAIR[main] : main, w = R.pick(RULES[rule].words), right = spell(rule, w);
    return Q.one('Add <b>-' + w[1] + '</b> to <b>' + w[0] + '</b>.', right, mistakes(rule, w), {
      fig: '<span class="wsum">' + W.tile(w[0], 'base') + '<span class="wop" aria-hidden="true">+</span>' + W.tile(w[1], 'suffix') + '</span>',
      prompt: 'Look at the end of <b>' + w[0] + '</b> and the start of <b>-' + w[1] + '</b>.', hint: WHY[rule], explain: sum(rule, w) + ' ' + WHY[rule],
      meta: { k: 'g4-sp-add', base: w[0], end: w[1] } });
  }
  function buildEnding(lv, r0) {
    var rule = ruleOf(r0), w = R.pick(RULES[rule].words), p = partsOf(rule, w), extra = rule === 'yi' ? 'y' : 'e';
    var list = p.map(function (x, i) { return W.tile(x, i === 0 ? 'base' : i === p.length - 1 ? 'suffix' : 'word'); }).concat([W.tile(extra, 'word')]);
    if (lv > 1 && rule !== 'dbl') list.push(W.tile(w[0].slice(-1) === 'e' ? w[0].slice(-2, -1) : w[0].slice(-1) + w[0].slice(-1), 'word'));
    return { q: 'Build <b>' + w[0] + '</b> + <b>-' + w[1] + '</b>.', type: 'build', parts: list, answer: p.map(function (x, i) { return i; }),
      hint: WHY[rule], explain: sum(rule, w), meta: { k: 'g4-sp-build', base: w[0], end: w[1] } };
  }
  function whichRight() {
    var rule = R.pick(Object.keys(RULES)), w = R.pick(RULES[rule].words);
    return Q.tiles('Which is spelled correctly?', spell(rule, w), mistakes(rule, w), { fig: W.sent(w[0] + ' + ' + w[1]),
      hint: 'Check the end of the base word.', explain: sum(rule, w) + ' ' + WHY[rule], meta: { k: 'g4-sp-which', base: w[0], end: w[1] } });
  }
  function tfSpell() {
    var rule = R.pick(MAIN), w = R.pick(RULES[rule].words), right = R.int(0, 1) === 1, shown = right ? spell(rule, w) : mistakes(rule, w)[0];
    return { q: 'Is this spelled correctly?', fig: W.sent(w[0] + ' + ' + w[1] + ' = <b>' + shown + '</b>'), type: 'tf', answer: right,
      why: { options: [WHY.e, WHY.dbl, WHY.yi], answer: MAIN.indexOf(rule) },
      hint: 'Which rule fits this word?', explain: sum(rule, w), meta: { k: 'g4-sp-tf', base: w[0], end: w[1], shown: shown } };
  }
  function matchRule() {
    var list = MAIN.map(function (r) { var w = R.pick(RULES[r].words); return [spell(r, w), RULES[r].name]; });
    return { q: 'Match each word to the rule it used.', type: 'match', pairs: R.shuffle(list), hint: 'Find the base word in each one.', explain: 'hoping: drop the e. hopping: double. cried: y to i.', meta: { k: 'g4-sp-match' } };
  }

  /* ---------- plurals ---------- */
  var PLURAL = {
    s: ['book', 'lake', 'canoe', 'map', 'kite', 'tree', 'day', 'key', 'toy', 'tray', 'monkey', 'boy'],
    es: ['box', 'bus', 'dish', 'lunch', 'fox', 'glass', 'bench', 'brush', 'peach', 'wish'],
    ies: ['city', 'berry', 'story', 'puppy', 'family', 'pony', 'lily', 'party']
  };
  function plural(kind, w) { return kind === 'ies' ? w.slice(0, -1) + 'ies' : w + kind; }
  function pWrong(kind, w) {
    var all = [w + 's', w + 'es', w.slice(0, -1) + 'ies'].filter(function (x) { return x !== plural(kind, w); });
    return /y$/.test(w) ? all : all.slice(0, 2);
  }
  var PWHY = { s: 'Most words just add -s. A vowel before the y? Just add -s.', es: 'After s, x, ch and sh, add -es.', ies: 'A consonant before the y: change y to i, add -es.' };
  function pick(kind) { var k = kind || R.pick(Object.keys(PLURAL)); return [k, R.pick(PLURAL[k])]; }
  function pluralOne(lv, kind) {
    var x = pick(kind), w = x[1];
    return Q.one('One <b>' + w + '</b>. Two ___?', plural(x[0], w), pWrong(x[0], w).slice(0, lv > 1 ? 3 : 1), {
      prompt: 'Look at the last letters of <b>' + w + '</b>.', hint: PWHY[x[0]], explain: W.sent('two <b>' + plural(x[0], w) + '</b>') + ' ' + PWHY[x[0]], meta: { k: 'g4-pl-one', w: w } });
  }
  function pluralTiles() {
    var x = pick(), w = x[1];
    return Q.tiles('Which is the plural of <b>' + w + '</b>?', plural(x[0], w), pWrong(x[0], w), { hint: PWHY[x[0]], explain: PWHY[x[0]], meta: { k: 'g4-pl-tiles', w: w } });
  }
  function pluralPick() {
    var right = R.some(PLURAL.es, 2), wrong = R.some(PLURAL.s, 1).concat(R.some(PLURAL.ies, 1));
    return Q.all('Pick every word that adds <b>-es</b> to make more than one.', right, wrong, { hint: 'Look for s, x, ch or sh at the end.', explain: PWHY.es, meta: { k: 'g4-pl-pick' } });
  }
  function pluralBuild() {
    var x = pick('ies'), w = x[1];
    return { q: 'Build the plural of <b>' + w + '</b>.', type: 'build', parts: [W.tile(w.slice(0, -1), 'base'), W.tile('ies', 'suffix'), W.tile('s', 'suffix'), W.tile('y', 'word')], answer: [0, 1],
      hint: PWHY.ies, explain: W.sent(w + ' &rarr; <b>' + plural('ies', w) + '</b>'), meta: { k: 'g4-pl-build', w: w } };
  }
  function pluralMatch() {
    var list = Object.keys(PLURAL).map(function (k) { var w = R.pick(PLURAL[k]); return [w, plural(k, w)]; });
    return { q: 'Match each word to its plural.', type: 'match', pairs: R.shuffle(list), hint: 'Check the last letters.', explain: 'Add -s, add -es, or change y to i and add -es.', meta: { k: 'g4-pl-match' } };
  }

  Atlas.register('spelling', {
    lessons: [{
      id: 'endings', title: 'Adding endings', sub: 'Sometimes the base word changes a little.',
      concepts: [
        { slug: 'drop-e', title: 'Drop the e before a vowel', exp: ['B2.1'], skill: 'endings',
          model: [
            step(W.hl('hope', 3, 4), 'A silent e at the end.'),
            step(sum('e', ['hope', 'ing']), '<b>-ing</b> starts with a vowel. The e goes.'),
            step(sum('keepE', ['hope', 'ful']), '<b>-ful</b> starts with a consonant. The e stays.')
          ],
          key: '<p>Vowel ending (-ing, -ed, -er, -able): drop the e. Consonant ending (-ful, -ly, -ment): keep it.</p>',
          guided: [function () { return addEnding(1, 'e'); }, function () { return buildEnding(1, 'e'); }],
          check: [function () { return addEnding(2, 'e'); }, function () { return buildEnding(1, 'e'); }],
          coach: '<p>Say the vowels together first: a, e, i, o, u. Then look at the first letter of the ending before you spell.</p>',
          mistake: '<p>Writing "hopeing" or "makeing". The silent e drops before any ending that starts with a vowel.</p>' },
        { slug: 'double', title: 'Double the last letter', exp: ['B2.1'], skill: 'endings',
          model: [
            step(W.hl('hop', 1, 3), 'One short vowel, then one consonant.'),
            step(sum('dbl', ['hop', 'ing']), 'Double the <b>p</b>, then add <b>-ing</b>.'),
            step(sum('noDbl', ['jump', 'ing']), 'Two consonants at the end: just add it.')
          ],
          key: '<p>hop &rarr; hopping, but hope &rarr; hoping. The double letter keeps the vowel short.</p>',
          guided: [function () { return addEnding(1, 'dbl'); }, function () { return buildEnding(1, 'dbl'); }],
          check: [function () { return addEnding(2, 'dbl'); }, function () { return buildEnding(1, 'dbl'); }],
          coach: '<p>Write hoping and hopping side by side and read them. The double letter is a fence that keeps the vowel short.</p>',
          mistake: '<p>Doubling after two vowels (rain &rarr; rainned). Count the letters before the end: one vowel and one consonant only.</p>' },
        { slug: 'y-to-i', title: 'Change y to i', exp: ['B2.1'], skill: 'endings',
          model: [
            step(W.hl('cry', 1, 2), 'A consonant before the y.'),
            step(sum('yi', ['cry', 'ed']), 'The y changes to <b>i</b>.'),
            step(sum('keepY', ['cry', 'ing']), 'With <b>-ing</b>, keep the y: no double i.'),
            step(sum('keepY', ['play', 'ed']), 'A vowel before the y: keep it.')
          ],
          guided: [function () { return addEnding(1, 'yi'); }, function () { return buildEnding(1, 'yi'); }],
          check: [function () { return addEnding(2, 'yi'); }, tfSpell],
          coach: '<p>Cover the y and look at the letter before it. A consonant? The y changes. A vowel? It stays.</p>',
          mistake: '<p>Writing "criing". Keep the y before -ing so there are not two i letters.</p>' }
      ]
    }, {
      id: 'plurals', title: 'Plurals', sub: 'More than one: -s, -es or -ies.',
      concepts: [
        { slug: 'es', title: 'Add -es after s, x, ch and sh', exp: ['B2.1'], skill: 'plurals',
          model: [
            step(W.sent('one book &rarr; two book<b>s</b>'), 'Most words add <b>-s</b>.'),
            step(W.sent('one bo<b>x</b> &rarr; two box<b>es</b>'), 'Say it: box-es. The extra beat needs <b>-es</b>.'),
            step(W.sent('one lun<b>ch</b> &rarr; two lunch<b>es</b>'))
          ],
          guided: [function () { return pluralOne(1, 'es'); }, pluralPick],
          check: [function () { return pluralOne(2, 'es'); }, pluralPick],
          coach: '<p>Clap the plural: "box-es" has two beats, so you can hear the -es.</p>',
          mistake: '<p>Writing "boxs" or "dishs". After s, x, ch and sh, add -es.</p>' },
        { slug: 'ies', title: 'Consonant + y: change to -ies', exp: ['B2.1'], skill: 'plurals',
          model: [
            step(W.sent('one ci<b>ty</b>'), 'A consonant before the y.'),
            step(W.sent('two cit<b>ies</b>'), 'Change y to i, add <b>-es</b>.'),
            step(W.sent('one d<b>ay</b> &rarr; two day<b>s</b>'), 'A vowel before the y: just add -s.')
          ],
          guided: [function () { return pluralOne(1, 'ies'); }, pluralBuild],
          check: [function () { return pluralOne(2, 'ies'); }, pluralMatch],
          coach: '<p>This is the same rule as cried and happiness: a consonant before the y means the y changes.</p>',
          mistake: '<p>Writing "daies" or "keies". A vowel before the y means just add -s.</p>' }
      ]
    }],
    practice: [
      { id: 'endings', name: 'Adding endings', code: 'B2.1', gen: function (lv) { return addEnding(lv); } },
      { id: 'plurals', name: 'Plurals', code: 'B2.1', gen: function (lv) { return pluralOne(lv); } }
    ]
  });

  Q.shapes('spelling', {
    endings: [[1, 'build', function (lv) { return buildEnding(lv); }], [1, 'which', whichRight], [2, 'true-false', tfSpell], [2, 'match', matchRule]],
    plurals: [[1, 'which', pluralTiles], [1, 'pick-es', pluralPick], [1, 'build', pluralBuild], [2, 'match', pluralMatch]]
  });
})();
