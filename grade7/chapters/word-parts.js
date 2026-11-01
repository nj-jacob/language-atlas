/* Grade 7: word parts. Greek and Latin roots, prefixes and suffixes in complex words, and spelling rules for adding suffixes.
   A full chapter: every idea has two worked examples, three questions together and five on your own, and its own practice skill
   asked in four or more ways.
   Ontario 2023 Language, Grade 7:
   B2.1 "use generalized knowledge of the meanings of words and morphemes (i.e., bases, prefixes, and suffixes) to read and spell complex words with accuracy and automaticity"
   B2.2 "... use generalized morphological knowledge to analyze and understand new words in context"
   All word lists and sentences are written for this site. Answer checks: tests/verify/grade7-word-parts.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';
  function others(list, item, n) { return R.some(list.filter(function (x) { return x !== item; }), n); }

  /* ---------- roots: what each one means, and words built on it (no word appears under two roots) ---------- */
  var ROOTS = {
    port: ['carry', ['transport', 'portable', 'export', 'import']], dict: ['say', ['predict', 'dictate', 'contradict', 'verdict']],
    rupt: ['break', ['erupt', 'interrupt', 'disrupt', 'rupture']], struct: ['build', ['construct', 'structure', 'instruct', 'destruction']],
    spect: ['look', ['inspect', 'spectator', 'respect', 'spectacle']], aud: ['hear', ['audience', 'audible', 'audio', 'auditorium']],
    vis: ['see', ['visible', 'vision', 'visual', 'invisible']], ject: ['throw', ['project', 'reject', 'eject', 'inject']],
    tract: ['pull', ['tractor', 'attract', 'subtract', 'distract']], mit: ['send', ['transmit', 'submit', 'emit']],
    cred: ['believe', ['credible', 'incredible', 'credit']], scrib: ['write', ['describe', 'scribble', 'inscribe']],
    geo: ['earth', ['geology', 'geometry', 'geologist']], chron: ['time', ['chronological', 'chronicle', 'chronic']],
    graph: ['write or draw', ['autograph', 'paragraph', 'graphic', 'photograph']], bio: ['life', ['biology', 'biome', 'biosphere']],
    tele: ['far', ['telescope', 'telegram', 'telecast']], phon: ['sound', ['microphone', 'symphony', 'phonics']], therm: ['heat', ['thermal', 'thermometer', 'thermostat']]
  };
  var KEYS = Object.keys(ROOTS), GREEK = ['geo', 'chron', 'graph', 'bio', 'tele', 'phon', 'therm'];
  function root(list) { return R.pick(list || KEYS); }
  function otherRoots(r, n) { return R.some(KEYS.filter(function (k) { return k !== r; }), n); }
  /* a word with its root marked */
  function marked(w, r) { var i = w.indexOf(r); return w.slice(0, i) + '<mark class="hl">' + r + '</mark>' + w.slice(i + r.length); }
  function rootLine(r) { return '<b>' + r + '</b> = ' + ROOTS[r][0]; }

  function rootMeaning(lv, list) {
    var r = root(list), ex = R.some(ROOTS[r][1], 2);
    return Q.one('What does the root <b>' + r + '</b> mean?', ROOTS[r][0], otherRoots(r, lv > 1 ? 3 : 2).map(function (k) { return ROOTS[k][0]; }).filter(function (m) { return m !== ROOTS[r][0]; }), {
      fig: W.tile(marked(ex[0], r)) + ' ' + W.tile(marked(ex[1], r)), prompt: 'What do these two words share?', hint: 'Think of a word you know with this root.',
      explain: rootLine(r), meta: { k: 'g7-root-meaning', root: r } });
  }
  function rootWhich(lv, list) {
    var r = root(list), right = R.pick(ROOTS[r][1]), wrong = otherRoots(r, 4).filter(function (k) { return ROOTS[k][0] !== ROOTS[r][0]; }).slice(0, lv > 1 ? 3 : 2).map(function (k) { return R.pick(ROOTS[k][1]); });
    return Q.tiles('Which word has a root that means <b>' + ROOTS[r][0] + '</b>?', right, wrong, { hint: 'Look for the root inside each word.',
      explain: W.tile(marked(right, r)) + ' ' + rootLine(r), meta: { k: 'g7-root-which', mean: ROOTS[r][0] } });
  }
  function rootMatch() {
    var rs = R.some(KEYS, 3);
    return { q: 'Match each root to its meaning.', type: 'match', pairs: rs.map(function (r) { return [r, ROOTS[r][0]]; }), hint: 'Think of one word for each root.',
      explain: rs.map(rootLine).join(' &middot; '), meta: { k: 'g7-root-match' } };
  }
  function rootTf() {
    var r = root(), w = R.pick(ROOTS[r][1]), right = R.int(0, 1) === 1, said = right ? ROOTS[r][0] : ROOTS[otherRoots(r, 1)[0]][0];
    return { q: Q.name() + ' says:', fig: W.sent('<b>' + w + '</b> has the root <b>' + r + '</b>, which means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['<b>' + r + '</b> means ' + ROOTS[r][0] + '.', '<b>' + w + '</b> has no root.'], answer: 0 },
      hint: 'What does ' + r + ' mean in other words you know?', explain: rootLine(r), meta: { k: 'g7-root-tf', root: r, said: said } };
  }

  /* ---------- word families ---------- */
  function rootFamily() {
    var r = root(), right = R.some(ROOTS[r][1], 2), wrong = otherRoots(r, 2).map(function (k) { return R.pick(ROOTS[k][1]); });
    return Q.all('Pick every word in the <b>' + r + '</b> family.', right, wrong, { hint: 'Find <b>' + r + '</b> inside the word.', explain: 'They share ' + rootLine(r) + '.', meta: { k: 'g7-root-family', root: r } });
  }
  function familyOdd(lv) {
    var r = root(), fam = R.some(ROOTS[r][1], lv > 1 ? 3 : 2), odd = R.pick(ROOTS[otherRoots(r, 1)[0]][1]);
    return Q.tiles('Which word is <b>not</b> in the <b>' + r + '</b> family?', odd, fam, { hint: 'Which word does not have <b>' + r + '</b> inside it?',
      explain: fam.map(function (w) { return W.tile(marked(w, r)); }).join(' '), meta: { k: 'g7-family-odd', root: r } });
  }
  function familyMatch() {
    var rs = R.some(KEYS, 3);
    return { q: 'Match each word to its root.', type: 'match', pairs: rs.map(function (r) { return [R.pick(ROOTS[r][1]), r]; }), hint: 'Find the root hiding inside each word.',
      explain: rs.map(rootLine).join(' &middot; '), meta: { k: 'g7-family-match' } };
  }
  function familyTf() {
    var r = root(), right = R.int(0, 1) === 1, w = right ? R.pick(ROOTS[r][1]) : R.pick(ROOTS[otherRoots(r, 1)[0]][1]);
    return { q: Q.name() + ' says <b>' + w + '</b> is in the <b>' + r + '</b> family.', fig: W.tile(w), type: 'tf', answer: right,
      why: { options: ['It has <b>' + r + '</b> inside it.', 'It is built on a different root.'], answer: right ? 0 : 1 }, hint: 'Look for <b>' + r + '</b> inside the word.',
      explain: rootLine(r), meta: { k: 'g7-family-tf', root: r, w: w } };
  }

  /* ---------- Greek parts in science and subject words: [first part, second part, meaning, word] ---------- */
  var GPART = { geo: 'earth', bio: 'life', chrono: 'time', graph: 'write or draw', graphy: 'writing about', tele: 'far', scope: 'a tool to look', micro: 'small', phone: 'sound', thermo: 'heat',
    meter: 'a tool to measure', logy: 'the study of', photo: 'light', thermal: 'heat' };
  var GW = [['geo', 'logy', 'the study of the earth', 'geology'], ['bio', 'logy', 'the study of life', 'biology'], ['tele', 'scope', 'a tool to see far things', 'telescope'],
    ['micro', 'scope', 'a tool to see tiny things', 'microscope'], ['thermo', 'meter', 'a tool to measure heat', 'thermometer'], ['tele', 'phone', 'a tool to hear sound from far away', 'telephone'],
    ['micro', 'phone', 'a tool that picks up small sounds', 'microphone'], ['photo', 'graph', 'a picture made with light', 'photograph'], ['bio', 'graphy', 'writing about a person' + AP + 's life', 'biography'],
    ['geo', 'graphy', 'writing about the earth and its places', 'geography'], ['chrono', 'logy', 'the order of events in time', 'chronology'], ['geo', 'thermal', 'heat from the earth', 'geothermal']];
  function gsum(g) { return W.sum([[g[0], 'base'], [g[1], 'suffix']]); }
  function gline(g) { return '<b>' + g[0] + '</b> = ' + GPART[g[0]] + ', <b>' + g[1] + '</b> = ' + GPART[g[1]]; }
  function greekWord(lv) {
    var g = R.pick(GW);
    return Q.tiles('Which word means <b>' + g[2] + '</b>?', g[3], others(GW, g, lv > 1 ? 3 : 2).map(function (x) { return x[3]; }), { prompt: 'Which two parts would you need?',
      hint: 'Think of the Greek part for each idea.', explain: gsum(g) + '<p>' + gline(g) + '</p>', meta: { k: 'g7-greek-word', mean: g[2] } });
  }
  function greekBuild(lv) {
    var g = R.pick(GW), x = R.pick(GW.filter(function (y) { return y[0] !== g[0] && y[1] !== g[1]; }));
    var list = [W.tile(g[0], 'base'), W.tile(g[1], 'suffix'), W.tile(x[0], 'base')].concat(lv > 1 ? [W.tile(x[1], 'suffix')] : []);
    return { q: 'Build the word that means <b>' + g[2] + '</b>.', type: 'build', parts: list, answer: [0, 1], hint: 'Which part means ' + GPART[g[0]] + '?',
      explain: gsum(g), meta: { k: 'g7-greek-build', mean: g[2] } };
  }
  function greekPart() {
    var g = R.pick(GW), ask = R.int(0, 1), want = g[ask];
    return Q.tiles('In <b>' + g[3] + '</b>, which part means <b>' + GPART[want] + '</b>?', want, [g[1 - ask], g[3]], { fig: gsum(g), hint: 'Say what each part means.',
      explain: gline(g), meta: { k: 'g7-greek-part', word: g[3], mean: GPART[want] } });
  }
  function greekTf() {
    var g = R.pick(GW), right = R.int(0, 1) === 1, said = right ? g[2] : R.pick(others(GW, g, 1))[2];
    return { q: Q.name() + ' says <b>' + g[3] + '</b> means <b>' + said + '</b>.', fig: gsum(g), type: 'tf', answer: right,
      why: { options: ['The parts add up to that.', 'The parts mean something else.'], answer: right ? 0 : 1 }, hint: 'What does each part mean?', explain: gline(g), meta: { k: 'g7-greek-tf', word: g[3], said: said } };
  }

  /* ---------- prefix and root: [prefix, its meaning, root, what the word means, word] ---------- */
  var PARTS = [['trans', 'across', 'port', 'carry across', 'transport'], ['ex', 'out', 'port', 'carry out of a country', 'export'], ['im', 'into', 'port', 'carry into a country', 'import'],
    ['inter', 'between', 'rupt', 'break in between', 'interrupt'], ['e', 'out', 'rupt', 'break out', 'erupt'], ['dis', 'apart', 'rupt', 'break apart', 'disrupt'],
    ['pre', 'before', 'dict', 'say before it happens', 'predict'], ['contra', 'against', 'dict', 'say the opposite', 'contradict'], ['in', 'into', 'spect', 'look into closely', 'inspect'],
    ['re', 'back', 'ject', 'throw back, or turn down', 'reject'], ['pro', 'forward', 'ject', 'throw forward', 'project'], ['e', 'out', 'ject', 'throw out', 'eject'],
    ['con', 'together', 'struct', 'build by putting parts together', 'construct'], ['at', 'toward', 'tract', 'pull toward', 'attract'], ['dis', 'away', 'tract', 'pull attention away', 'distract'],
    ['sub', 'under', 'tract', 'take away from', 'subtract'], ['trans', 'across', 'mit', 'send across', 'transmit'], ['re', 'back', 'port', 'carry back news, or tell about', 'report']];
  function ptiles(p) { return [[p[0], 'prefix'], [p[2], 'base']]; }
  function pline(p) { return '<b>' + p[0] + '</b> = ' + p[1] + ', ' + rootLine(p[2]); }
  function wordMeaning(lv) {
    var p = R.pick(PARTS), wrong = others(PARTS, p, lv > 1 ? 3 : 2).map(function (x) { return x[3]; });
    return Q.one('What does <b>' + p[4] + '</b> mean?', p[3], wrong, { fig: lv > 1 ? W.tile(p[4]) : W.sum(ptiles(p)), prompt: 'Split it into parts. What does each part mean?',
      hint: 'Find the root first.', explain: pline(p), steps: ['Find the root: ' + rootLine(p[2]) + '.', 'Add the meaning of the prefix: <b>' + p[0] + '</b> = ' + p[1] + '.', 'So <b>' + p[4] + '</b> means <b>' + p[3] + '</b>.'],
      meta: { k: 'g7-word-meaning', word: p[4] } });
  }
  function buildWord(lv) {
    var p = R.pick(PARTS), x = R.pick(PARTS.filter(function (y) { return y[0] !== p[0] && y[2] !== p[2]; }));
    var list = [W.tile(p[0], 'prefix'), W.tile(p[2], 'base'), W.tile(x[0], 'prefix')].concat(lv > 1 ? [W.tile(x[2], 'base')] : []);
    return { q: 'Build the word that means <b>' + p[3] + '</b>.', type: 'build', parts: list, answer: [0, 1], hint: 'Which root means ' + ROOTS[p[2]][0] + '? Which prefix fits?',
      explain: W.sum(ptiles(p)), meta: { k: 'g7-build', mean: p[3] } };
  }
  function whichPart() {
    var p = R.pick(PARTS), ask = R.int(0, 1), want = ask ? p[2] : p[0], mean = ask ? ROOTS[p[2]][0] : p[1];
    return Q.tiles('In <b>' + p[4] + '</b>, which part means <b>' + mean + '</b>?', want, [ask ? p[0] : p[2], p[4]], { fig: W.sum(ptiles(p)), hint: 'The root holds the core meaning; the prefix comes first.',
      explain: pline(p), meta: { k: 'g7-which-part', word: p[4], mean: mean } });
  }
  function splitTf() {
    var p = R.pick(PARTS), right = R.int(0, 1) === 1, said = right ? p[3] : R.pick(others(PARTS, p, 1))[3];
    return { q: Q.name() + ' says <b>' + p[4] + '</b> means <b>' + said + '</b>.', fig: W.sum(ptiles(p)), type: 'tf', answer: right,
      why: { options: ['The prefix and root add up to that.', 'The parts mean something else.'], answer: right ? 0 : 1 }, hint: 'What does each part mean?', explain: pline(p), meta: { k: 'g7-split-tf', word: p[4], said: said } };
  }

  /* ---------- suffixes: [base or root, suffix, word, what the word means] ---------- */
  var SUF = { ible: 'able to be', able: 'able to be', ator: 'a person who', or: 'a person who', logy: 'the study of', ion: 'the act or result of', less: 'without', ful: 'full of', ous: 'full of', ment: 'the act or state of' };
  var SUFX = [['aud', 'ible', 'audible', 'able to be heard'], ['vis', 'ible', 'visible', 'able to be seen'], ['port', 'able', 'portable', 'able to be carried'], ['cred', 'ible', 'credible', 'able to be believed'],
    ['spect', 'ator', 'spectator', 'a person who watches'], ['instruct', 'or', 'instructor', 'a person who teaches'], ['inspect', 'or', 'inspector', 'a person who checks things closely'],
    ['geo', 'logy', 'geology', 'the study of the earth'], ['bio', 'logy', 'biology', 'the study of life'], ['construct', 'ion', 'construction', 'the act of building'], ['predict', 'ion', 'prediction', 'something said before it happens'],
    ['erupt', 'ion', 'eruption', 'a bursting out'], ['fear', 'less', 'fearless', 'without fear'], ['respect', 'ful', 'respectful', 'full of respect'], ['danger', 'ous', 'dangerous', 'full of danger'], ['enjoy', 'ment', 'enjoyment', 'the state of enjoying']];
  var SUFKEYS = ['ible', 'ator', 'logy', 'ion', 'less', 'ful', 'ment'];
  function ssum(s) { return W.sum([[s[0], 'base'], [s[1], 'suffix']]); }
  function sline(s) { return '<b>-' + s[1] + '</b> = ' + SUF[s[1]]; }
  function suffixWord(lv) {
    var s = R.pick(SUFX), wrong = others(SUFX, s, lv > 1 ? 3 : 2).map(function (x) { return x[3]; });
    return Q.one('What does <b>' + s[2] + '</b> mean?', s[3], wrong, { fig: lv > 1 ? W.tile(s[2]) : ssum(s), prompt: 'Cover the suffix. What is left? Now add the suffix back.',
      hint: 'The suffix changes the job of the word.', explain: ssum(s) + '<p>' + sline(s) + '</p>', meta: { k: 'g7-suffix-word', word: s[2] } });
  }
  function suffixMeaning(lv) {
    var s = R.pick(SUFX), wrong = SUFKEYS.map(function (k) { return SUF[k]; }).filter(function (m, i, a) { return m !== SUF[s[1]] && a.indexOf(m) === i; });
    return Q.tiles('What does the suffix <b>-' + s[1] + '</b> mean?', SUF[s[1]], R.some(wrong, lv > 1 ? 3 : 2), { fig: W.tile(s[2].replace(new RegExp(s[1] + '$'), '<mark class="hl">' + s[1] + '</mark>')),
      hint: 'Think of other words that end the same way.', explain: sline(s), meta: { k: 'g7-suffix-meaning', suf: s[1], word: s[2] } });
  }
  function suffixWhich(lv) {
    var s = R.pick(SUFX), wrong = R.some(Object.keys(SUF).filter(function (k) { return SUF[k] !== SUF[s[1]]; }), lv > 1 ? 3 : 2);
    return Q.tiles('Which suffix turns <b>' + s[0] + '</b> into a word that means <b>' + s[3] + '</b>?', '-' + s[1], wrong.map(function (k) { return '-' + k; }), { fig: W.tile(s[0], 'base') + ' + ' + W.tile('?', 'suffix'),
      hint: 'Which ending means ' + SUF[s[1]] + '?', explain: ssum(s), meta: { k: 'g7-suffix-which', word: s[2] } });
  }
  function suffixTf() {
    var s = R.pick(SUFX), right = R.int(0, 1) === 1, said = right ? s[3] : R.pick(others(SUFX, s, 1))[3];
    return { q: Q.name() + ' says <b>' + s[2] + '</b> means <b>' + said + '</b>.', fig: ssum(s), type: 'tf', answer: right,
      why: { options: ['The base and suffix add up to that.', 'The parts mean something else.'], answer: right ? 0 : 1 }, hint: 'What does the suffix add?', explain: sline(s), meta: { k: 'g7-suffix-tf', word: s[2], said: said } };
  }

  /* ---------- in a sentence: [word, sentence, meaning, wrong meanings] ---------- */
  var CTX = [['audible', 'The coach' + AP + 's voice was barely <b>audible</b> over the wind.', 'able to be heard', ['easy to see', 'able to be carried']],
    ['visible', 'On clear nights, the northern lights are <b>visible</b> from the dock.', 'able to be seen', ['able to be heard', 'hidden']],
    ['portable', 'The <b>portable</b> speaker fit in her backpack.', 'able to be carried', ['able to be heard', 'broken']],
    ['interrupt', 'Please do not <b>interrupt</b> while a classmate is presenting.', 'break in while someone is talking', ['agree with', 'carry away']],
    ['inspect', 'Before the trip, we <b>inspect</b> every canoe for cracks.', 'look at closely', ['throw out', 'build']],
    ['reject', 'The council may <b>reject</b> the plan if it costs too much.', 'turn down', ['say again', 'look into']],
    ['spectators', 'Hundreds of <b>spectators</b> lined the trail to watch the dogsled race.', 'people who watch', ['people who build', 'people who race']],
    ['chronological', 'Put the events in <b>chronological</b> order, from first to last.', 'in time order', ['in size order', 'in order of importance']],
    ['geothermal', 'The building is heated with <b>geothermal</b> energy from deep underground.', 'heat from the earth', ['heat from the sun', 'heat from the wind']],
    ['predict', 'Forecasters <b>predict</b> the storm will reach Thunder Bay tonight.', 'say before it happens', ['say the opposite', 'break apart']],
    ['credible', 'The reporter checked that her source was <b>credible</b> before using the quote.', 'able to be believed', ['able to be carried', 'famous']],
    ['distract', 'Loud music can <b>distract</b> you from your homework.', 'pull your attention away', ['help you focus', 'send away']],
    ['transmit', 'The tower can <b>transmit</b> radio signals to remote communities.', 'send across a distance', ['break apart', 'look at closely']],
    ['microscope', 'Under the <b>microscope</b>, the pond water was full of tiny creatures.', 'a tool to see tiny things', ['a tool to measure heat', 'a tool to see far things']],
    ['describe', 'Can you <b>describe</b> the moose you saw at the lake?', 'tell or write what it is like', ['throw away', 'carry across']],
    ['eruption', 'The <b>eruption</b> sent ash high into the sky.', 'a bursting out', ['a building', 'a quiet time']]];
  function inContext(lv) {
    var c = R.pick(CTX);
    return Q.one('What does <b>' + c[0] + '</b> mean here?', c[2], c[3].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(c[1]), prompt: 'Use the parts, then check that the meaning fits the sentence.',
      hint: 'Find the root. Does your meaning make sense in the sentence?', explain: W.sent(c[1].replace('<b>' + c[0] + '</b>', '<mark class="hl">' + c[2] + '</mark>')), meta: { k: 'g7-in-context', word: c[0] } });
  }
  function contextGap(lv) {
    var c = R.pick(CTX);
    return Q.tiles('Which word fits the gap?', c[0], others(CTX, c, lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), { fig: W.sent(c[1].replace('<b>' + c[0] + '</b>', W.gap())),
      hint: 'What would make sense here? Which word has a part that means that?', explain: W.sent(c[1]), meta: { k: 'g7-context-gap', word: c[0] } });
  }
  function contextTf() {
    var c = R.pick(CTX), right = R.int(0, 1) === 1, said = right ? c[2] : R.pick(c[3]);
    return { q: Q.name() + ' says <b>' + c[0] + '</b> means <b>' + said + '</b> here.', fig: W.sent(c[1]), type: 'tf', answer: right,
      why: { options: ['It fits the parts and the sentence.', 'It does not fit the sentence.'], answer: right ? 0 : 1 }, hint: 'Put the meaning in place of the word. Does it make sense?',
      explain: '<b>' + c[0] + '</b> = ' + c[2], meta: { k: 'g7-context-tf', word: c[0], said: said } };
  }
  function contextMatch() {
    var cs = R.some(CTX, 3);
    return { q: 'Match each word to its meaning.', type: 'match', pairs: cs.map(function (c) { return [c[0], c[2]]; }), hint: 'Split each word into parts.',
      explain: 'Parts first, then the sentence.', meta: { k: 'g7-context-match' } };
  }

  /* ---------- spelling with suffixes: [base, suffix, right, wrong spellings, rule] ---------- */
  var SP = [
    ['create', 'ion', 'creation', ['createion', 'creasion'], 'drop'], ['value', 'able', 'valuable', ['valueable', 'valuble'], 'drop'], ['hope', 'ing', 'hoping', ['hopeing', 'hoppeing'], 'drop'],
    ['amaze', 'ing', 'amazing', ['amazeing', 'amazzing'], 'drop'], ['believe', 'able', 'believable', ['believeable', 'beleivable'], 'drop'], ['write', 'ing', 'writing', ['writeing', 'writting'], 'drop'],
    ['combine', 'ation', 'combination', ['combineation', 'combanation'], 'drop'], ['care', 'ing', 'caring', ['careing', 'carring'], 'drop'], ['note', 'able', 'notable', ['noteable', 'notible'], 'drop'],
    ['manage', 'ment', 'management', ['managment', 'managemint'], 'keep'], ['excite', 'ment', 'excitement', ['excitment', 'excitemint'], 'keep'], ['complete', 'ly', 'completely', ['completly', 'completeley'], 'keep'],
    ['care', 'ful', 'careful', ['carful', 'carefull'], 'keep'], ['hope', 'less', 'hopeless', ['hopless', 'hopeles'], 'keep'], ['safe', 'ty', 'safety', ['safty', 'saftey'], 'keep'], ['use', 'ful', 'useful', ['usful', 'usefull'], 'keep'],
    ['occur', 'ed', 'occurred', ['occured', 'ocurred'], 'double'], ['begin', 'ing', 'beginning', ['begining', 'beginnig'], 'double'], ['admit', 'ed', 'admitted', ['admited', 'addmited'], 'double'],
    ['regret', 'able', 'regrettable', ['regretable', 'regretible'], 'double'], ['permit', 'ed', 'permitted', ['permited', 'permmited'], 'double'], ['refer', 'ed', 'referred', ['refered', 'reffered'], 'double'],
    ['forget', 'ing', 'forgetting', ['forgeting', 'forgitting'], 'double'], ['control', 'ed', 'controlled', ['controled', 'contrroled'], 'double'], ['commit', 'ed', 'committed', ['commited', 'comitted'], 'double'],
    ['visit', 'ed', 'visited', ['visitted', 'visitid'], 'single'], ['open', 'ing', 'opening', ['openning', 'opeing'], 'single'], ['limit', 'ed', 'limited', ['limitted', 'limitid'], 'single'],
    ['happen', 'ing', 'happening', ['happenning', 'hapening'], 'single'], ['offer', 'ed', 'offered', ['offerred', 'ofered'], 'single'], ['answer', 'ed', 'answered', ['answerred', 'anserwed'], 'single'],
    ['enter', 'ing', 'entering', ['enterring', 'entring'], 'single'],
    ['happy', 'ness', 'happiness', ['happyness', 'hapiness'], 'y-i'], ['rely', 'able', 'reliable', ['relyable', 'relieable'], 'y-i'], ['carry', 'ed', 'carried', ['carryed', 'caried'], 'y-i'],
    ['beauty', 'ful', 'beautiful', ['beautyful', 'beutiful'], 'y-i'], ['easy', 'ly', 'easily', ['easyly', 'easly'], 'y-i'], ['try', 'ed', 'tried', ['tryed', 'trid'], 'y-i'],
    ['lazy', 'ness', 'laziness', ['lazyness', 'lazness'], 'y-i'], ['deny', 'al', 'denial', ['denyal', 'denail'], 'y-i'],
    ['carry', 'ing', 'carrying', ['carriing', 'carying'], 'keep-y'], ['study', 'ing', 'studying', ['studiing', 'studing'], 'keep-y'], ['enjoy', 'ment', 'enjoyment', ['enjoiment', 'enjoyement'], 'keep-y'],
    ['play', 'ful', 'playful', ['plaiful', 'playfull'], 'keep-y'], ['destroy', 'ed', 'destroyed', ['destroied', 'distroyed'], 'keep-y'], ['try', 'ing', 'trying', ['triing', 'tring'], 'keep-y'],
    ['employ', 'er', 'employer', ['emploier', 'imployer'], 'keep-y']
  ];
  var RULE = { drop: 'Drop the silent e.', keep: 'Keep the e.', double: 'Double the last consonant.', single: 'Just add the suffix.', 'y-i': 'Change y to i.', 'keep-y': 'Keep the y.' };
  var GROUP = { drop: ['drop', 'keep'], double: ['double', 'single'], 'y-i': ['y-i', 'keep-y'] };
  function sp(g) { return R.pick(SP.filter(function (s) { return GROUP[g].indexOf(s[4]) >= 0; })); }
  function plus(s) { return '<span class="wsum">' + W.tile(s[0], 'base') + '<span class="wop" aria-hidden="true">+</span>' + W.tile(s[1], 'suffix') + '</span>'; }
  function addSuffix(lv, g) {
    var s = sp(g);
    return Q.tiles('Add <b>-' + s[1] + '</b> to <b>' + s[0] + '</b>.', s[2], s[3].slice(0, lv > 1 ? 2 : 1), { fig: plus(s),
      prompt: 'Does the suffix start with a vowel? Does the base end in e or y?', hint: RULE[s[4]], explain: W.tile(s[2]) + ' ' + RULE[s[4]], meta: { k: 'g7-add-suffix', base: s[0], suf: s[1] } });
  }
  function whichRule(lv, g) {
    var s = sp(g);
    return Q.tiles('How do you spell <b>' + s[0] + '</b> + <b>-' + s[1] + '</b>?', RULE[s[4]], GROUP[g].filter(function (x) { return x !== s[4]; }).map(function (x) { return RULE[x]; }), { fig: plus(s),
      hint: 'Look at the last letters of the base word and the first letter of the suffix.', explain: W.tile(s[2]), meta: { k: 'g7-which-rule', base: s[0], suf: s[1] } });
  }
  function spellChoose(lv, g) {
    var s = sp(g);
    return Q.one('Which word is spelled correctly?', s[2], s[3].slice(0, lv > 1 ? 2 : 1), { hint: RULE[s[4]], explain: '<b>' + s[0] + '</b> + <b>-' + s[1] + '</b> = <b>' + s[2] + '</b>', meta: { k: 'g7-spell-choose', base: s[0], suf: s[1] } });
  }
  function spellPick(lv, g) {
    var list = R.some(SP.filter(function (s) { return GROUP[g].indexOf(s[4]) >= 0; }), 4), right = list.slice(0, 2).map(function (s) { return s[2]; }), wrong = list.slice(2).map(function (s) { return R.pick(s[3]); });
    return Q.all('Pick every word that is spelled correctly.', right, wrong, { hint: 'Check each base word and its suffix.', explain: 'Spelled correctly: <b>' + right.join('</b>, <b>') + '</b>.', meta: { k: 'g7-spell-pick' } });
  }
  function spellTf(lv, g) {
    var s = sp(g), right = R.int(0, 1) === 1, said = right ? s[2] : R.pick(s[3]);
    return { q: Q.name() + ' writes <b>' + s[0] + '</b> + <b>-' + s[1] + '</b> like this:', fig: W.tile(said), type: 'tf', answer: right,
      why: { options: ['It follows the rule.', 'It breaks the rule.'], answer: right ? 0 : 1 }, hint: RULE[s[4]], explain: W.tile(s[2]) + ' ' + RULE[s[4]], meta: { k: 'g7-spell-tf', base: s[0], suf: s[1], said: said } };
  }
  /* the shapes of one spelling skill, for one group of rules */
  function spelling(g) {
    function f(fn) { return function (lv) { return fn(lv, g); }; }
    return { plain: f(addSuffix), shapes: [[1, 'which-rule', f(whichRule)], [1, 'choose', f(spellChoose)], [2, 'pick', f(spellPick)], [1, 'tf', f(spellTf)]] };
  }
  var DROP = spelling('drop'), DOUBLE = spelling('double'), YI = spelling('y-i');
  function greek(fn) { return function (lv) { return fn(lv, GREEK); }; }

  Atlas.register('word-parts', {
    full: true,
    lessons: [{
      id: 'roots', title: 'Greek and Latin roots', sub: 'The core of a long word.',
      concepts: [
        { slug: 'root', title: 'A root carries the core meaning', exp: ['B2.1'], skill: 'roots',
          model: [
            step(W.tile('port', 'base'), 'Latin <b>port</b>: carry.'),
            step(W.sum([['trans', 'prefix'], ['port', 'base']]), 'Carry across.'),
            step(W.sum([['port', 'base'], ['able', 'suffix']]), 'Able to be carried.'),
            step(W.tile('rupt', 'base'), 'Latin <b>rupt</b>: break.'),
            step(W.tile(marked('erupt', 'rupt')) + ' ' + W.tile(marked('interrupt', 'rupt')), 'Break out. Break in between.')
          ],
          guided: [function () { return rootMeaning(1); }, function () { return rootWhich(1); }, rootMatch],
          check: [function () { return rootMeaning(2); }, function () { return rootWhich(2); }, rootTf, rootMatch, function () { return rootMeaning(3); }],
          coach: '<p>Keep a root wall or list. Each time you meet a long word, ask: "Is there a root I know in here?"</p>',
          mistake: '<p>Expecting the root alone to give the exact meaning. It gives the core; the sentence gives the rest.</p>' },
        { slug: 'family', title: 'Words in a family share a root', exp: ['B2.1'], skill: 'family',
          model: [
            step(W.tile(marked('inspect', 'spect')) + ' ' + W.tile(marked('spectator', 'spect')) + ' ' + W.tile(marked('respect', 'spect')), '<b>spect</b>: look.'),
            step(W.tile(marked('tractor', 'tract')) + ' ' + W.tile(marked('attract', 'tract')) + ' ' + W.tile(marked('distract', 'tract')), '<b>tract</b>: pull.'),
            step(W.tile(marked('audience', 'aud')) + ' ' + W.tile(marked('audible', 'aud')) + ' ' + W.tile(marked('audio', 'aud')), '<b>aud</b>: hear.'),
            step(W.tile('vision') + ' ' + W.tile('audio'), 'One sees, one hears: different families.')
          ],
          guided: [rootFamily, function () { return familyOdd(1); }, familyMatch],
          check: [rootFamily, function () { return familyOdd(2); }, familyTf, familyMatch, function () { return familyOdd(3); }],
          coach: '<p>Pick a root and race to list five family members. Then check them in a dictionary together.</p>',
          mistake: '<p>Grouping words that only share letters. "Sport" looks like a "port" word, but check the meaning.</p>' },
        { slug: 'greek', title: 'Greek roots build science words', exp: ['B2.1'], skill: 'greek',
          model: [
            step(W.sum([['geo', 'base'], ['logy', 'suffix']]), 'Earth + the study of.'),
            step(W.sum([['bio', 'base'], ['logy', 'suffix']]), 'Life + the study of.'),
            step(W.sum([['tele', 'base'], ['scope', 'suffix']]), 'Far + a tool to look.'),
            step(W.sum([['micro', 'base'], ['scope', 'suffix']]), 'Change one part: small + a tool to look.'),
            step(W.sum([['thermo', 'base'], ['meter', 'suffix']]), 'Heat + a tool to measure.')
          ],
          guided: [function () { return greekWord(1); }, function () { return greekBuild(1); }, greekPart],
          check: [function () { return greekWord(2); }, function () { return greekBuild(2); }, greekTf, greekPart, function () { return rootMeaning(2, GREEK); }],
          coach: '<p>Look through a science or geography textbook together and circle Greek parts. Many subject words are built this way.</p>',
          mistake: '<p>Skipping long science words. Slow down and split them: the parts are usually familiar.</p>' }
      ]
    }, {
      id: 'analyze', title: 'Taking long words apart', sub: 'Prefix, root and suffix, then check the sentence.',
      concepts: [
        { slug: 'split', title: 'Split a long word into parts', exp: ['B2.1', 'B2.2'], skill: 'analyze',
          model: [
            step(W.tile('interrupt')),
            step(W.sum([['inter', 'prefix'], ['rupt', 'base']]), '<b>inter</b> = between. <b>rupt</b> = break.'),
            step(W.sent('to break in between'), 'Put the meanings together.'),
            step(W.tile('attract'), 'Another one.'),
            step(W.sum([['at', 'prefix'], ['tract', 'base']]), '<b>at</b> = toward. <b>tract</b> = pull. To pull toward.')
          ],
          guided: [function () { return wordMeaning(1); }, whichPart, function () { return buildWord(1); }],
          check: [function () { return wordMeaning(2); }, function () { return buildWord(2); }, splitTf, whichPart, function () { return wordMeaning(3); }],
          coach: '<p>Cover the prefix with a finger. What is left is the root.</p>',
          mistake: '<p>Splitting in the wrong place (in-ter-rupt by syllables). Split by meaning parts, not by beats.</p>' },
        { slug: 'suffix', title: 'A suffix adds to the meaning', exp: ['B2.1'], skill: 'suffix',
          model: [
            step(W.sum([['aud', 'base'], ['ible', 'suffix']]), '<b>-ible</b>: able to be. Able to be heard.'),
            step(W.sum([['spect', 'base'], ['ator', 'suffix']]), '<b>-ator</b>: a person who. A person who watches.'),
            step(W.sum([['fear', 'base'], ['less', 'suffix']]), '<b>-less</b>: without.'),
            step(W.sum([['danger', 'base'], ['ous', 'suffix']]), '<b>-ous</b>: full of. Opposite job.')
          ],
          guided: [function () { return suffixWord(1); }, function () { return suffixMeaning(1); }, function () { return suffixWhich(1); }],
          check: [function () { return suffixWord(2); }, function () { return suffixWhich(2); }, suffixTf, function () { return suffixMeaning(2); }, function () { return suffixWord(3); }],
          coach: '<p>Sort words by suffix: -able and -ible words, -or and -ator people, -logy subjects.</p>',
          mistake: '<p>Ignoring the suffix and giving only the root meaning ("audible means hear"). The suffix changes the job of the word.</p>' },
        { slug: 'context', title: 'Check the parts against the sentence', exp: ['B2.2'], skill: 'context',
          model: [
            step(W.sent(CTX[0][1]), 'A new word.'),
            step(W.sum([['aud', 'base'], ['ible', 'suffix']]), 'Able to be heard.'),
            step(W.sent(CTX[0][1].replace('<b>audible</b>', '<mark class="hl">able to be heard</mark>')), 'Put it in the sentence. It fits.'),
            step(W.sent(CTX[12][1]), 'Again.'),
            step(W.sum([['trans', 'prefix'], ['mit', 'base']]), 'Send across.'),
            step(W.sent(CTX[12][1].replace('<b>transmit</b>', '<mark class="hl">send across a distance</mark>')), 'The sentence agrees.')
          ],
          guided: [function () { return inContext(1); }, function () { return contextGap(1); }, contextTf],
          check: [function () { return inContext(2); }, function () { return contextGap(2); }, contextTf, contextMatch, function () { return inContext(3); }],
          coach: '<p>After working out a word, read the sentence again with the meaning in its place. If it sounds right, it probably is.</p>',
          mistake: '<p>Stopping at the parts. Some words have drifted from their roots; the sentence is the final check.</p>' }
      ]
    }, {
      id: 'spelling', title: 'Spelling with suffixes', sub: 'Three rules for adding an ending.',
      concepts: [
        { slug: 'drop-e', title: 'Drop the silent e before a vowel suffix', exp: ['B2.1'], skill: 'drop-e',
          model: [
            step(W.tile('hope', 'base') + ' + ' + W.tile('ing', 'suffix') + ' = ' + W.tile('hoping'), '<b>-ing</b> starts with a vowel.'),
            step(W.tile('hope', 'base') + ' + ' + W.tile('less', 'suffix') + ' = ' + W.tile('hopeless'), '<b>-less</b> starts with a consonant: keep the e.'),
            step(W.tile('value', 'base') + ' + ' + W.tile('able', 'suffix') + ' = ' + W.tile('valuable'), 'Another vowel suffix.'),
            step(W.tile('manage', 'base') + ' + ' + W.tile('ment', 'suffix') + ' = ' + W.tile('management'), 'A consonant suffix: the e stays.')
          ],
          guided: [function () { return DROP.plain(1); }, function () { return DROP.shapes[0][2](1); }, function () { return DROP.shapes[3][2](1); }],
          check: [function () { return DROP.plain(2); }, function () { return DROP.shapes[1][2](2); }, function () { return DROP.shapes[0][2](2); }, function () { return DROP.shapes[2][2](2); }, function () { return DROP.plain(3); }],
          coach: '<p>Say the rule as a question: "Does the suffix start with a vowel? Then the e goes."</p>',
          mistake: '<p>Dropping the e before every suffix (managment). Only a vowel suffix pushes the e out.</p>' },
        { slug: 'double', title: 'Double the last consonant when it is stressed', exp: ['B2.1'], skill: 'double',
          model: [
            step(W.syl(['oc', '<b>CUR</b>']) + ' &rarr; ' + W.tile('occurred'), 'Stress at the end: double the r.'),
            step(W.syl(['<b>VIS</b>', 'it']) + ' &rarr; ' + W.tile('visited'), 'Stress at the start: just add -ed.'),
            step(W.syl(['be', '<b>GIN</b>']) + ' &rarr; ' + W.tile('beginning'), 'Stress at the end again.'),
            step(W.syl(['<b>O</b>', 'pen']) + ' &rarr; ' + W.tile('opening'), 'Clap it. The first beat is strong.')
          ],
          guided: [function () { return DOUBLE.plain(1); }, function () { return DOUBLE.shapes[0][2](1); }, function () { return DOUBLE.shapes[3][2](1); }],
          check: [function () { return DOUBLE.plain(2); }, function () { return DOUBLE.shapes[1][2](2); }, function () { return DOUBLE.shapes[0][2](2); }, function () { return DOUBLE.shapes[2][2](2); }, function () { return DOUBLE.plain(3); }],
          coach: '<p>Clap the word and say it with the stress on each beat in turn. The one that sounds right tells you where the stress is.</p>',
          mistake: '<p>Doubling in words like visit and limit. The stress is on the first beat, so there is no double.</p>' },
        { slug: 'y-i', title: 'Change y to i, but not before -ing', exp: ['B2.1'], skill: 'y-i',
          model: [
            step(W.tile('happy', 'base') + ' + ' + W.tile('ness', 'suffix') + ' = ' + W.tile('happiness'), 'A consonant before the y.'),
            step(W.tile('carry', 'base') + ' + ' + W.tile('ing', 'suffix') + ' = ' + W.tile('carrying'), 'Two i' + AP + 's in a row look wrong.'),
            step(W.tile('enjoy', 'base') + ' + ' + W.tile('ment', 'suffix') + ' = ' + W.tile('enjoyment'), 'A vowel before the y: keep it.'),
            step(W.tile('try', 'base') + ' + ' + W.tile('ed', 'suffix') + ' = ' + W.tile('tried'), 'The same word, a new suffix.'),
            step(W.tile('try', 'base') + ' + ' + W.tile('ing', 'suffix') + ' = ' + W.tile('trying'), 'Before -ing, the y stays.')
          ],
          guided: [function () { return YI.plain(1); }, function () { return YI.shapes[0][2](1); }, function () { return YI.shapes[3][2](1); }],
          check: [function () { return YI.plain(2); }, function () { return YI.shapes[1][2](2); }, function () { return YI.shapes[0][2](2); }, function () { return YI.shapes[2][2](2); }, function () { return YI.plain(3); }],
          coach: '<p>Check the letter before the y. A consonant (carry) means change it; a vowel (enjoy) means keep it.</p>',
          mistake: '<p>Writing "carriing" or "studiing". Before -ing, always keep the y.</p>' }
      ]
    }],
    practice: [
      { id: 'roots', name: 'Greek and Latin roots', code: 'B2.1', gen: rootMeaning },
      { id: 'family', name: 'Word families', code: 'B2.1', gen: rootFamily },
      { id: 'greek', name: 'Greek parts', code: 'B2.1', gen: greekWord },
      { id: 'analyze', name: 'Prefix and root', code: 'B2.1, B2.2', gen: wordMeaning },
      { id: 'suffix', name: 'Suffixes', code: 'B2.1', gen: suffixWord },
      { id: 'context', name: 'Word parts in a sentence', code: 'B2.2', gen: inContext },
      { id: 'drop-e', name: 'Drop or keep the e', code: 'B2.1', gen: DROP.plain },
      { id: 'double', name: 'Double or not', code: 'B2.1', gen: DOUBLE.plain },
      { id: 'y-i', name: 'Change the y or keep it', code: 'B2.1', gen: YI.plain }
    ]
  });

  Q.shapes('word-parts', {
    roots: [[1, 'which-word', rootWhich], [1, 'match', rootMatch], [2, 'tf', rootTf], [2, 'greek', greek(rootMeaning)]],
    family: [[1, 'odd-one-out', familyOdd], [1, 'match', familyMatch], [2, 'tf', familyTf]],
    greek: [[1, 'build', greekBuild], [1, 'which-part', greekPart], [2, 'tf', greekTf], [2, 'root', greek(rootWhich)]],
    analyze: [[1, 'which-part', whichPart], [1, 'build', buildWord], [2, 'tf', splitTf]],
    suffix: [[1, 'meaning', suffixMeaning], [1, 'which', suffixWhich], [2, 'tf', suffixTf]],
    context: [[1, 'gap', contextGap], [2, 'match', contextMatch], [1, 'tf', contextTf]],
    'drop-e': DROP.shapes, double: DOUBLE.shapes, 'y-i': YI.shapes
  });
})();
