/* Grade 3: syllables and spelling patterns. A full chapter: every idea has two worked examples, three questions together and
   five on your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 3:
   B2.1 phonics: blend and segment to read and spell one- and many-syllable words (here: count beats, split words into beats,
        read long words beat by beat).
   B2.2 orthographic knowledge, including position-based tendencies, to make a spelling choice (here: ai/ay, oa/ow, and
        high-frequency words that do not follow the rules).
   All word lists are written for this site. Answer checks: tests/verify/grade3-sounds.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* words split into syllables (beats) */
  var SYL = [
    /* two consonants in the middle: split between them */
    ['sun', 'set'], ['rab', 'bit'], ['nap', 'kin'], ['bas', 'ket'], ['muf', 'fin'], ['pic', 'nic'], ['kit', 'ten'], ['hel', 'met'], ['pup', 'pet'], ['den', 'tist'],
    ['mit', 'ten'], ['blan', 'ket'], ['win', 'dow'], ['gar', 'den'], ['win', 'ter'], ['sis', 'ter'], ['hap', 'pen'], ['but', 'ton'], ['tun', 'nel'], ['lad', 'der'],
    ['pen', 'cil'], ['cac', 'tus'], ['trum', 'pet'], ['ten', 'nis'], ['plas', 'tic'], ['mag', 'net'], ['in', 'sect'], ['fos', 'sil'],
    /* one consonant in the middle after a long vowel: split before it */
    ['ti', 'ger'], ['ro', 'bot'], ['pa', 'per'], ['mu', 'sic'], ['ze', 'ro'], ['ba', 'by'], ['ca', 'noe'], ['mo', 'ment'], ['pi', 'lot'], ['ba', 'con'],
    ['o', 'pen'], ['hu', 'man'], ['ra', 'ven'], ['so', 'fa'], ['spi', 'der'], ['si', 'lent'], ['fe', 'ver'],
    /* three and four beats */
    ['but', 'ter', 'fly'], ['ca', 'ri', 'bou'], ['hos', 'pi', 'tal'], ['to', 'bog', 'gan'], ['fan', 'tas', 'tic'], ['com', 'put', 'er'], ['bi', 'cy', 'cle'], ['an', 'i', 'mal'],
    ['kan', 'ga', 'roo'], ['um', 'brel', 'la'], ['oc', 'to', 'pus'], ['to', 'ma', 'to'], ['po', 'ta', 'to'], ['el', 'e', 'phant'], ['car', 'pen', 'ter'], ['hol', 'i', 'day'],
    ['buf', 'fa', 'lo'], ['cin', 'na', 'mon'], ['por', 'cu', 'pine'], ['ad', 'ven', 'ture'],
    ['wa', 'ter', 'mel', 'on'], ['cat', 'er', 'pil', 'lar'], ['al', 'li', 'ga', 'tor'], ['hel', 'i', 'cop', 'ter'],
    /* one beat */
    ['cat'], ['dog'], ['snow'], ['frog'], ['tree'], ['lake'], ['moose'], ['train'], ['bread'], ['sled'], ['fox'], ['park']
  ];
  var word = function (w) { return w.join(''); };
  var VOW = /[aeiouy]/;
  var SPLIT2 = SYL.filter(function (w) { return w.length === 2 && !VOW.test(w[0].slice(-1)) && !VOW.test(w[1].charAt(0)); }); /* rab|bit */
  var OPEN = SYL.filter(function (w) { return w.length === 2 && VOW.test(w[0].slice(-1)); }); /* ti|ger */
  var TWO = SPLIT2.concat(OPEN);
  var LONG = SYL.filter(function (w) { return w.length >= 3; });
  /* long words whose beats are all different, so the beat tiles never repeat */
  var LONGU = LONG.filter(function (w) { return w.every(function (p, i) { return w.indexOf(p) === i; }); });
  function withBeats(n) { return SYL.filter(function (w) { return w.length === n; }); }
  function beats(n) { return n + (n === 1 ? ' beat' : ' beats'); }
  /* the wrong ways to split a two-beat word: off by one letter */
  function badSplits(w) {
    var s = word(w), at = w[0].length, out = [];
    [at - 1, at + 1].forEach(function (k) { if (k > 0 && k < s.length) out.push(s.slice(0, k) + '-' + s.slice(k)); });
    return out;
  }
  function twoFor(lv) { return lv > 1 ? TWO : SPLIT2; }
  function rule(w) { return SPLIT2.indexOf(w) >= 0 ? 'Split between the two consonants.' : 'Split before the consonant. The vowel says its name.'; }

  /* ---------- count the beats ---------- */
  function count(lv) {
    var w = R.pick(lv > 1 ? SYL : SYL.filter(function (x) { return x.length > 1 && x.length < 4; })), n = w.length;
    return Q.one('How many <b>beats</b> in this word?', String(n), ['1', '2', '3', '4'].filter(function (x) { return +x !== n; }).slice(0, lv > 1 ? 3 : 2),
      { fig: lv > 1 ? W.tile(word(w)) : W.syl(w), prompt: 'Clap it. Each clap is one beat.', hint: 'Say it slowly and clap each part.', explain: W.syl(w),
        steps: ['Say <b>' + word(w) + '</b> slowly.', 'Clap each part: ' + w.join(', ') + '.', 'That is ' + beats(n) + '.'], meta: { k: 'g3-beats', word: word(w) } });
  }
  function matchBeats(lv) {
    var ns = lv > 2 ? [2, 3, 4] : [1, 2, 3], pick = ns.map(function (n) { return R.pick(withBeats(n)); });
    return { q: 'Match each word to its number of beats.', type: 'match', pairs: R.shuffle(pick).map(function (w) { return [word(w), beats(w.length)]; }),
      hint: 'Clap each word.', explain: pick.map(function (w) { return W.syl(w); }).join(' '), meta: { k: 'g3-match-beats' } };
  }
  /* pick every word with 2 (or 3) beats */
  function pickBeats(lv) {
    var n = lv > 1 ? 3 : 2, right = R.some(withBeats(n), R.int(1, 2)), wrong = R.some(SYL.filter(function (w) { return w.length !== n && w.length < 4; }), 4 - right.length);
    return Q.all('Pick every word with <b>' + beats(n) + '</b>.', right.map(word), wrong.map(word), { hint: 'Clap each word. Count the claps.',
      explain: right.map(function (w) { return W.syl(w); }).join(' '), meta: { k: 'g3-pick-long', n: n } });
  }
  function mostBeats(lv) {
    var ns = lv > 1 ? [1, 2, 3, 4] : [1, 2, 3], ws = ns.map(function (n) { return R.pick(withBeats(n)); }), top = ws[ws.length - 1];
    return Q.tiles('Which word has the <b>most</b> beats?', word(top), ws.slice(0, -1).map(word), { hint: 'Clap each one. Which needs the most claps?',
      explain: W.syl(top), meta: { k: 'g3-most-beats' } });
  }
  function beatsTf() {
    var w = R.pick(SYL.filter(function (x) { return x.length > 1; })), right = R.int(0, 1) === 1, said = right ? w.length : w.length + R.pick([-1, 1]);
    return { q: Q.name() + ' says <b>' + word(w) + '</b> has <b>' + beats(said) + '</b>.', type: 'tf', answer: right, fig: W.tile(word(w)),
      hint: 'Clap it and count.', explain: W.syl(w), meta: { k: 'g3-beats-tf', word: word(w), said: said } };
  }

  /* ---------- where a word splits ---------- */
  function split(lv) {
    var w = R.pick(twoFor(lv));
    return Q.tiles('Where does <b>' + word(w) + '</b> split into beats?', w.join('-'), badSplits(w), {
      fig: W.tile(word(w)), prompt: 'Look at the letters in the middle.', hint: 'Two consonants: split between them. One: split before it.',
      explain: W.syl(w), meta: { k: 'g3-split', word: word(w) } });
  }
  function firstBeat(lv) {
    var w = R.pick(twoFor(lv)), s = word(w), a = w[0].length, wrong = [s.slice(0, a - 1), s.slice(0, a + 1)].filter(function (x) { return x.length > 0; });
    return Q.tiles('What is the <b>first beat</b> of <b>' + s + '</b>?', w[0], wrong, { fig: W.tile(s), hint: rule(w),
      explain: W.syl(w), meta: { k: 'g3-first-beat', word: s } });
  }
  function splitTf(lv) {
    var w = R.pick(twoFor(lv)), right = R.int(0, 1) === 1, said = right ? w.join('-') : R.pick(badSplits(w));
    return { q: Q.name() + ' splits <b>' + word(w) + '</b> like this:', fig: W.sent('<b>' + said + '</b>'), type: 'tf', answer: right,
      why: { options: ['Split between the two consonants.', 'Split before the consonant. The vowel says its name.'], answer: SPLIT2.indexOf(w) >= 0 ? 0 : 1 },
      hint: 'Look at the letters in the middle.', explain: W.syl(w), meta: { k: 'g3-split-tf', word: word(w), said: said } };
  }
  /* pick every word that splits between two consonants */
  function splitKind() {
    var right = R.some(SPLIT2, R.int(1, 2)), wrong = R.some(OPEN, 4 - right.length);
    return Q.all('Pick every word that splits between <b>two consonants</b>, like <b>rab-bit</b>.', right.map(word), wrong.map(word), {
      hint: 'Look at the middle. Two consonants side by side?', explain: right.map(function (w) { return W.syl(w); }).join(' '), meta: { k: 'g3-split-kind' } });
  }

  /* ---------- read a long word in parts ---------- */
  function decoy(w) { return R.pick(SYL.filter(function (x) { return x.length > 1; }).reduce(function (a, x) { return a.concat(x); }, []).filter(function (p) { return w.indexOf(p) < 0; })); }
  function buildBeats(lv) {
    var w = R.pick(lv > 1 ? LONGU : TWO), parts = w.concat([decoy(w)]);
    return { q: 'Build the word <b>' + word(w) + '</b> from its beats.', type: 'build', parts: parts.map(function (p) { return W.tile(p, 'syl'); }), answer: w.map(function (x, i) { return i; }),
      hint: 'Say the word slowly. Which beat comes first?', explain: W.syl(w), meta: { k: 'g3-build-beats', word: word(w) } };
  }
  function orderBeats(lv) {
    var w = R.pick(lv > 2 ? LONGU.filter(function (x) { return x.length === 4; }) : LONGU.filter(function (x) { return x.length === 3; }));
    return { q: 'Put the beats in order to make <b>' + word(w) + '</b>.', type: 'order', items: w.slice(), first: 'First beat', last: 'Last beat',
      hint: 'Say the word slowly. Which beat do you hear first?', explain: W.syl(w), meta: { k: 'g3-order-beats', word: word(w) } };
  }
  function missingBeat(lv) {
    var w = R.pick(LONGU), i = R.int(0, w.length - 1), shown = w.map(function (p, j) { return j === i ? '?' : p; });
    return Q.tiles('Which beat is missing from <b>' + word(w) + '</b>?', w[i], R.some(LONGU.filter(function (x) { return x !== w; }).reduce(function (a, x) { return a.concat(x); }, []).filter(function (p) { return w.indexOf(p) < 0; }), lv > 1 ? 2 : 1),
      { fig: W.syl(shown), hint: 'Say the whole word. Listen for the missing part.', explain: W.syl(w), meta: { k: 'g3-missing-beat', word: word(w), at: i } });
  }
  function blend(lv) {
    var w = R.pick(LONGU), others = R.some(LONG.filter(function (x) { return x !== w && x.length === w.length; }), lv > 1 ? 2 : 1);
    return Q.tiles('Read each beat, then blend. Which word is it?', word(w), others.map(word), { fig: W.syl(w), hint: 'Read the beats one by one, then say them fast.',
      explain: W.tile(word(w)), meta: { k: 'g3-blend', beats: w.join('-') } });
  }

  /* ---------- vowel teams: ai/ay and oa/ow ---------- */
  var TEAM = {
    a: { mid: 'ai', end: 'ay', midWords: ['rain', 'paint', 'train', 'snail', 'wait', 'tail', 'chain', 'brain', 'nail', 'sail', 'mail', 'pain', 'grain', 'paid', 'afraid', 'faint', 'trail'],
      endWords: ['day', 'play', 'stay', 'tray', 'clay', 'spray', 'way', 'say', 'may', 'pay', 'hay', 'stray', 'away', 'today', 'sway', 'birthday', 'holiday'] },
    o: { mid: 'oa', end: 'ow', midWords: ['boat', 'coat', 'road', 'soap', 'goat', 'toast', 'float', 'loaf', 'coach', 'roast', 'foam', 'load', 'groan', 'cloak', 'throat', 'moan'],
      endWords: ['snow', 'grow', 'show', 'slow', 'glow', 'throw', 'below', 'blow', 'flow', 'crow', 'elbow', 'window', 'yellow', 'shadow', 'pillow', 'arrow', 'follow'] }
  };
  function teamPlace(t, end) { var w = R.pick(end ? t.endWords : t.midWords), team = end ? t.end : t.mid; return { w: w, team: team, at: w.lastIndexOf(team) }; }
  function misspell(t, x) { return x.w.slice(0, x.at) + (x.team === t.mid ? t.end : t.mid) + x.w.slice(x.at + 2); }
  function ruleLine(t) { return '<b>' + t.mid + '</b> in the middle. <b>' + t.end + '</b> at the end.'; }
  function fillTeam(lv, v) {
    var t = TEAM[v], x = teamPlace(t, R.int(0, 1) === 1), atEnd = x.at + 2 === x.w.length;
    var shown = x.w.slice(0, x.at) + W.gap() + x.w.slice(x.at + 2);
    return { q: 'Which letters fill the gap?', type: 'tap', tiles: [t.mid, t.end], answer: x.team === t.mid ? 0 : 1,
      fig: W.sent(shown), prompt: 'Is the gap at the <b>end</b> of the word?', hint: ruleLine(t),
      explain: W.tile(W.hl(x.w, x.at, x.at + 2)), steps: ['Look where the gap is.', atEnd ? 'It is at the end, so use <b>' + t.end + '</b>.' : 'It is not at the end, so use <b>' + t.mid + '</b>.'],
      meta: { k: 'g3-fill-team', word: x.w } };
  }
  function spellTeam(lv, v) {
    var t = TEAM[v], x = teamPlace(t, R.int(0, 1) === 1);
    return Q.one('Which word is spelled right?', x.w, [misspell(t, x)], { hint: ruleLine(t), explain: W.tile(W.hl(x.w, x.at, x.at + 2)), meta: { k: 'g3-spell-team', word: x.w } });
  }
  function sortTeam(lv, v) {
    var t = TEAM[v], right = R.some(t.endWords, 2), wrong = R.some(t.midWords, lv > 1 ? 3 : 2);
    return Q.all('Pick every word that ends with <b>' + t.end + '</b>.', right, wrong, { hint: 'Look at the last two letters.', explain: ruleLine(t), meta: { k: 'g3-sort-team', team: t.end } });
  }
  function tfTeam(lv, v) {
    var t = TEAM[v], which = R.pick(['mid', 'end']), sayEnd = R.int(0, 1) === 1, team = t[which];
    return { q: Q.name() + ' says:', fig: W.sent('<b>' + team + '</b> goes at the ' + (sayEnd ? 'end' : 'middle') + ' of a word.'), type: 'tf', answer: (which === 'end') === sayEnd,
      why: { options: ['Like ' + R.pick(t.endWords) + ': ' + t.end + ' is at the end.', 'Like ' + R.pick(t.midWords) + ': ' + t.mid + ' is in the middle.'], answer: which === 'end' ? 0 : 1 },
      hint: 'Think of a word you know with ' + team + '.', explain: ruleLine(t), meta: { k: 'g3-tf-team', team: team, end: sayEnd } };
  }
  /* pick every word spelled right: some have the team in the wrong place */
  function teamAll(lv, v) {
    var t = TEAM[v], xs = [0, 1, 2, 3].map(function (i) { return teamPlace(t, i % 2 === 0); }).filter(function (x, i, a) { return a.map(function (y) { return y.w; }).indexOf(x.w) === i; });
    var nRight = R.int(1, xs.length - 1), right = xs.slice(0, nRight).map(function (x) { return x.w; }), wrong = xs.slice(nRight).map(function (x) { return misspell(t, x); });
    return Q.all('Pick every word that is spelled right.', right, wrong, { hint: ruleLine(t), explain: right.map(function (w) { return W.tile(w); }).join(' '), meta: { k: 'g3-team-all', team: t.mid } });
  }

  /* ---------- words to just know ---------- */
  /* [letters before, the tricky part, letters after, wrong ways to spell the tricky part] */
  var TRICKY = [['s', 'ai', 'd', ['e', 'ay']], ['bec', 'au', 'se', ['u', 'aw']], ['fr', 'ie', 'nd', ['e', 'ei']], ['p', 'eo', 'ple', ['ee', 'e']], ['ag', 'ai', 'n', ['e', 'ia']],
    ['c', 'oul', 'd', ['u', 'oo']], ['w', 'oul', 'd', ['u', 'oo']], ['sh', 'oul', 'd', ['u', 'oo']], ['th', 'ei', 'r', ['ie', 'e']], ['l', 'augh', '', ['af', 'aff']],
    ['an', 'sw', 'er', ['s', 'ss']], ['b', 'eau', 'tiful', ['u', 'ew']], ['wh', 'ere', '', ['air', 'are']], ['th', 'ere', '', ['air', 'are']], ['d', 'oes', '', ['uz', 'os']],
    ['m', 'a', 'ny', ['e', 'en']], ['', 'a', 'ny', ['e', 'en']], ['', 'ei', 'ght', ['ai', 'a']], ['en', 'ough', '', ['uf', 'uff']], ['thr', 'ough', '', ['oo', 'ue']],
    ['b', 'u', 'sy', ['i', 'e']], ['s', 'ch', 'ool', ['k', 'c']], ['', 's', 'ure', ['sh', 'ch']], ['', 'o', 'nce', ['wu', 'wo']], ['l', 'o', 've', ['u', 'a']],
    ['li', 'st', 'en', ['s', 'ss']], ['w', 'a', 's', ['u', 'o']], ['h', 'al', 'f', ['a', 'aa']], ['w', 'al', 'k', ['au', 'aw']], ['t', 'al', 'k', ['au', 'aw']], ['fr', 'ui', 't', ['oo', 'u']]];
  function tw(t) { return t[0] + t[1] + t[2]; }
  function wrongs(t) { return t[3].map(function (p) { return t[0] + p + t[2]; }); }
  function marked(t) { return W.tile(t[0] + '<mark class="hl">' + t[1] + '</mark>' + t[2]); }
  function tricky(lv) {
    var t = R.pick(TRICKY);
    return Q.one('Which is spelled right?', tw(t), wrongs(t).slice(0, lv > 1 ? 2 : 1), { prompt: 'Picture the word. Which one looks right?', hint: 'This word does not follow the rules. You have to know it.',
      explain: marked(t), meta: { k: 'g3-tricky', word: tw(t) } });
  }
  function trickyFill(lv) {
    var t = R.pick(TRICKY);
    return Q.tiles('Which letters fill the gap?', t[1], t[3].slice(0, lv > 1 ? 2 : 1), {
      fig: W.sent(t[0] + W.gap() + t[2]), hint: 'Picture the word. Which letters look right?', explain: marked(t), meta: { k: 'g3-tricky-fill', word: tw(t), before: t[0], after: t[2] } });
  }
  function trickyTf() {
    var t = R.pick(TRICKY), right = R.int(0, 1) === 1, said = right ? tw(t) : R.pick(wrongs(t));
    return { q: Q.name() + ' writes this word. Is it spelled right?', fig: W.tile(said), type: 'tf', answer: right,
      hint: 'Picture the word. Does it look right?', explain: marked(t), meta: { k: 'g3-tricky-tf', said: said } };
  }
  function trickyAll(lv) {
    var ts = R.some(TRICKY, 4), nRight = R.int(1, 3), right = ts.slice(0, nRight).map(tw), wrong = ts.slice(nRight).map(function (t) { return R.pick(wrongs(t)); });
    return Q.all('Pick every word that is spelled right.', right, wrong, { hint: 'Picture each word. Does it look right?', explain: ts.map(marked).join(' '), meta: { k: 'g3-tricky-all' } });
  }

  Atlas.register('sounds', {
    full: true,
    lessons: [{
      id: 'beats', title: 'Beats in long words', sub: 'Count the beats, split the word, then read it part by part.',
      concepts: [
        { slug: 'beats', title: 'Count the beats', exp: ['B2.1'], skill: 'beats',
          model: [
            step(W.tile('basket'), 'Say the word.'),
            step(W.syl(['bas', 'ket']), 'Clap each part: two claps.'),
            step(W.icon('listen'), 'Each clap has one vowel sound.'),
            step(W.tile('caterpillar'), 'A longer one.'),
            step(W.syl(['cat', 'er', 'pil', 'lar']), 'Four claps.')
          ],
          guided: [function () { return count(1); }, function () { return matchBeats(1); }, function () { return mostBeats(1); }],
          check: [function () { return count(2); }, function () { return pickBeats(2); }, function () { return mostBeats(2); }, beatsTf, function () { return count(3); }],
          coach: '<p>Clap together first, then let the child clap alone. Put a hand under the chin: the chin drops once for each beat.</p>',
          mistake: '<p>Clapping each letter, or each sound, instead of each beat. Keep the claps to vowel sounds.</p>' },
        { slug: 'split', title: 'Where a word splits', exp: ['B2.1'], skill: 'split',
          model: [
            step(W.tile(W.hl('rabbit', 2, 4)), 'Two consonants in the middle.'),
            step(W.syl(['rab', 'bit']), 'Split between them.'),
            step(W.tile(W.hl('basket', 2, 4)), 'Again: s and k.'),
            step(W.syl(['bas', 'ket'])),
            step(W.tile(W.hl('tiger', 2, 3)), 'Only one consonant, and the i says its name.'),
            step(W.syl(['ti', 'ger']), 'Split before the consonant.')
          ],
          guided: [function () { return split(1); }, function () { return firstBeat(1); }, function () { return splitTf(1); }],
          check: [function () { return split(2); }, function () { return firstBeat(2); }, splitKind, function () { return splitTf(2); }, function () { return split(3); }],
          coach: '<p>Cover the second half of the word with a card, read the first beat, then uncover the rest.</p>',
          mistake: '<p>Splitting after the first letter (r-abbit). The first beat needs its vowel.</p>' },
        { slug: 'long-words', title: 'Read a long word in parts', exp: ['B2.1'], skill: 'long-words',
          model: [
            step(W.tile('toboggan'), 'Too long to read in one go?'),
            step(W.syl(['to', 'bog', 'gan']), 'Split it. Read each beat.'),
            step(W.tile('toboggan'), 'Then say the beats fast.'),
            step(W.tile('hospital'), 'Another one.'),
            step(W.syl(['hos', 'pi', 'tal']), 'hos, pi, tal: hospital.')
          ],
          guided: [function () { return buildBeats(1); }, function () { return blend(1); }, function () { return missingBeat(1); }],
          check: [function () { return buildBeats(2); }, function () { return orderBeats(2); }, function () { return missingBeat(2); }, function () { return blend(2); }, function () { return orderBeats(3); }],
          coach: '<p>Write a long word from a book on a strip of paper and cut it into beats. Mix them up and rebuild it.</p>',
          mistake: '<p>Guessing from the first beat. Point to each beat as it is read.</p>' }
      ]
    }, {
      id: 'patterns', title: 'Spelling patterns', sub: 'Where a vowel team goes, and words to just know.',
      concepts: [
        { slug: 'ai-ay', title: 'ai or ay?', exp: ['B2.2'], skill: 'ai-ay',
          model: [
            step(W.tile(W.hl('rain', 1, 3)), '<b>ai</b> in the middle.'),
            step(W.tile(W.hl('play', 2, 4)), '<b>ay</b> at the end.'),
            step(W.sent('tr' + W.gap() + 'n'), 'The gap is in the middle.'),
            step(W.tile(W.hl('train', 2, 4)), 'So: train.'),
            step(W.sent('st' + W.gap()), 'This gap is at the end.'),
            step(W.tile(W.hl('stay', 2, 4)), 'So: stay.')
          ],
          guided: [function () { return fillTeam(1, 'a'); }, function () { return spellTeam(1, 'a'); }, function () { return sortTeam(1, 'a'); }],
          check: [function () { return fillTeam(2, 'a'); }, function () { return teamAll(2, 'a'); }, function () { return tfTeam(2, 'a'); }, function () { return spellTeam(2, 'a'); }, function () { return fillTeam(3, 'a'); }],
          coach: '<p>Say: "y at the end, i in the middle." Sort word cards into two piles.</p>',
          mistake: '<p>Writing "dai" or "rayn". Ask: is the sound at the end of the word?</p>' },
        { slug: 'oa-ow', title: 'oa or ow?', exp: ['B2.2'], skill: 'oa-ow',
          model: [
            step(W.tile(W.hl('boat', 1, 3)), '<b>oa</b> in the middle.'),
            step(W.tile(W.hl('snow', 2, 4)), '<b>ow</b> at the end.'),
            step(W.sent('r' + W.gap() + 'd'), 'The gap is in the middle.'),
            step(W.tile(W.hl('road', 1, 3)), 'So: road.'),
            step(W.sent('yell' + W.gap()), 'This gap is at the end.'),
            step(W.tile(W.hl('yellow', 4, 6)), 'So: yellow.')
          ],
          guided: [function () { return fillTeam(1, 'o'); }, function () { return spellTeam(1, 'o'); }, function () { return sortTeam(1, 'o'); }],
          check: [function () { return fillTeam(2, 'o'); }, function () { return teamAll(2, 'o'); }, function () { return tfTeam(2, 'o'); }, function () { return spellTeam(2, 'o'); }, function () { return fillTeam(3, 'o'); }],
          coach: '<p>It works like ai and ay: the team with w goes at the end, like the one with y.</p>',
          mistake: '<p>Writing "snoa" or "bowt". Point to where the sound is in the word.</p>' },
        { slug: 'tricky', title: 'Words to just know', exp: ['B2.2'], skill: 'tricky',
          model: [
            step(W.tile('said'), 'It sounds like "sed".'),
            step(marked(TRICKY[0]), 'But it is spelled with <b>ai</b>.'),
            step(W.icon('write'), 'Look, say, cover, write, check.'),
            step(W.tile('friend'), 'Another one.'),
            step(marked(TRICKY[2]), 'Picture the <b>ie</b>.'),
            step(W.sent('fr' + W.gap() + 'nd'), 'Can you see it in the gap?')
          ],
          guided: [function () { return tricky(1); }, function () { return trickyFill(1); }, trickyTf],
          check: [function () { return tricky(2); }, function () { return trickyFill(2); }, function () { return trickyAll(2); }, trickyTf, function () { return tricky(3); }],
          coach: '<p>Pick three tricky words a week. Write each on a card with the tricky part in a different colour.</p>',
          mistake: '<p>Spelling by sound only ("becuz"). These words have to be learned by sight.</p>' }
      ]
    }],
    practice: [
      { id: 'beats', name: 'Count the beats', code: 'B2.1', gen: count },
      { id: 'split', name: 'Where a word splits', code: 'B2.1', gen: split },
      { id: 'long-words', name: 'Read a long word in parts', code: 'B2.1', gen: buildBeats },
      { id: 'ai-ay', name: 'ai or ay?', code: 'B2.2', gen: function (lv) { return fillTeam(lv, 'a'); } },
      { id: 'oa-ow', name: 'oa or ow?', code: 'B2.2', gen: function (lv) { return fillTeam(lv, 'o'); } },
      { id: 'tricky', name: 'Words to just know', code: 'B2.2', gen: tricky }
    ],
    tasks: [
      { id: 'read-long', title: 'Read long words in a book', code: 'B2.1', pic: W.icon('read'), say: 'Find 5 long words in a book. Read each one in beats.',
        run: ['Pick a book the child enjoys, at an easy level.', 'Together, find five words with two or three beats.', 'The child reads each word beat by beat, then blends it.'],
        rubric: ['Cannot split the words yet, even with help.', 'Splits with help; blends some.', 'Splits and reads most words alone.', 'Reads all five smoothly, and new long words too.'] }
    ]
  });

  function team(f, v) { return function (lv) { return f(lv, v); }; }
  Q.shapes('sounds', {
    beats: [[1, 'match', matchBeats], [1, 'most', mostBeats], [2, 'pick', pickBeats], [1, 'true-false', beatsTf]],
    split: [[1, 'first-beat', firstBeat], [1, 'true-false', splitTf], [2, 'kind', splitKind]],
    'long-words': [[1, 'blend', blend], [1, 'missing', missingBeat], [2, 'order', orderBeats]],
    'ai-ay': [[1, 'spell', team(spellTeam, 'a')], [1, 'sort', team(sortTeam, 'a')], [2, 'true-false', team(tfTeam, 'a')], [2, 'pick-right', team(teamAll, 'a')]],
    'oa-ow': [[1, 'spell', team(spellTeam, 'o')], [1, 'sort', team(sortTeam, 'o')], [2, 'true-false', team(tfTeam, 'o')], [2, 'pick-right', team(teamAll, 'o')]],
    tricky: [[1, 'fill', trickyFill], [1, 'true-false', trickyTf], [2, 'pick-right', trickyAll]]
  });
})();
