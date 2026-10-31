/* Grade 3: syllables and spelling patterns.
   Ontario 2023 Language, Grade 3:
   B2.1 Phonics: decoding words of more than one syllable (here: hearing beats, splitting long words into syllables, reading by parts).
   B2.2 Orthographic knowledge: spelling patterns and high-frequency words (here: ai/ay, oa/ow, and words that do not follow the rules).
   All word lists are written for this site. Answer checks: tests/verify/grade3-sounds.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* words split into syllables (beats) */
  var SYL = [
    ['sun', 'set'], ['rab', 'bit'], ['nap', 'kin'], ['bas', 'ket'], ['muf', 'fin'], ['pic', 'nic'], ['kit', 'ten'], ['hel', 'met'], ['pup', 'pet'], ['den', 'tist'],
    ['ti', 'ger'], ['ro', 'bot'], ['pa', 'per'], ['mu', 'sic'], ['ze', 'ro'], ['ba', 'by'], ['ca', 'noe'], ['mo', 'ment'],
    ['but', 'ter', 'fly'], ['ca', 'ri', 'bou'], ['hos', 'pi', 'tal'], ['to', 'bog', 'gan'], ['fan', 'tas', 'tic'], ['com', 'put', 'er'], ['bi', 'cy', 'cle'], ['an', 'i', 'mal'],
    ['cat'], ['dog'], ['snow'], ['frog'], ['tree'], ['lake']
  ];
  /* the two kinds of split this lesson teaches */
  var SPLIT2 = SYL.filter(function (w) { return w.length === 2 && /[^aeiouy]$/.test(w[0]) && /^[^aeiouy]/.test(w[1]); }); /* rab|bit */
  var OPEN = SYL.filter(function (w) { return w.length === 2 && /[aeiou]$/.test(w[0]); }); /* ti|ger */
  var LONG = SYL.filter(function (w) { return w.length === 3; });
  var word = function (w) { return w.join(''); };

  /* vowel teams: the team that goes in the middle of a word, and the one that goes at the end */
  var TEAM = {
    a: { mid: 'ai', end: 'ay', midWords: ['rain', 'paint', 'train', 'snail', 'wait', 'tail', 'chain'], endWords: ['day', 'play', 'stay', 'tray', 'clay', 'spray', 'way'] },
    o: { mid: 'oa', end: 'ow', midWords: ['boat', 'coat', 'road', 'soap', 'goat', 'toast', 'float'], endWords: ['snow', 'grow', 'show', 'slow', 'glow', 'throw', 'below'] }
  };
  /* high-frequency words that do not follow the rules, with spellings children often try */
  var TRICKY = [['said', 'sed', 'siad'], ['because', 'becuz', 'becaus'], ['friend', 'frend', 'freind'], ['people', 'peple', 'peeple'], ['again', 'agen', 'agian'],
    ['could', 'cud', 'coud'], ['their', 'thier', 'ther'], ['laugh', 'laf', 'lagh'], ['answer', 'anser', 'ansur'], ['beautiful', 'butiful', 'beutiful']];

  function beats(w) { return w.length + (w.length === 1 ? ' beat' : ' beats'); }
  function splitShow(w) { return w.join('-'); }
  /* the wrong ways to split a word: off by one letter */
  function badSplits(w) {
    var s = word(w), at = w[0].length, out = [];
    [at - 1, at + 1].forEach(function (k) { if (k > 0 && k < s.length) out.push(s.slice(0, k) + '-' + s.slice(k)); });
    return out;
  }

  /* ---------- question makers ---------- */
  /* How many beats in "butterfly"? */
  function count(lv) {
    var w = R.pick(lv > 1 ? SYL : SYL.filter(function (x) { return x.length > 1; })), n = w.length;
    return Q.one('How many <b>beats</b> in this word?', String(n), ['1', '2', '3', '4'].filter(function (x) { return +x !== n; }).slice(0, lv > 1 ? 3 : 2),
      { fig: lv > 1 ? W.tile(word(w)) : W.syl(w), prompt: 'Clap it. Each clap is one beat.', hint: 'Say it slowly and clap each part.', explain: W.syl(w),
        steps: ['Say <b>' + word(w) + '</b> slowly.', 'Clap each part: ' + w.join(', ') + '.', 'That is ' + beats(w) + '.'], meta: { k: 'g3-beats', word: word(w) } });
  }
  /* Where does "rabbit" split? */
  function split(lv) {
    var list = lv > 1 ? SPLIT2.concat(OPEN) : SPLIT2, w = R.pick(list);
    return Q.tiles('Where does <b>' + word(w) + '</b> split into beats?', splitShow(w), badSplits(w), {
      fig: W.tile(word(w)), prompt: 'Find the two letters in the middle that are not vowels.', hint: 'Split between two consonants, or after a long vowel.',
      explain: W.syl(w), meta: { k: 'g3-split', word: word(w) } });
  }
  /* Build "basket" from beats */
  function buildBeats(lv) {
    var w = R.pick(lv > 1 ? LONG : SYL.filter(function (x) { return x.length === 2; })), other = R.pick(SYL.filter(function (x) { return x.length > 1 && x !== w; }));
    var parts = w.slice(), extra = other.filter(function (p) { return w.indexOf(p) < 0; })[0] || 'mop';
    parts.push(extra);
    var tiles = parts.map(function (p) { return W.tile(p, 'syl'); });
    return { q: 'Build the word <b>' + word(w) + '</b> from its beats.', type: 'build', parts: tiles, answer: w.map(function (x, i) { return i; }),
      hint: 'Say the word slowly. Which beat comes first?', explain: W.syl(w), meta: { k: 'g3-build-beats', word: word(w) } };
  }
  /* match words to their number of beats */
  function matchBeats() {
    var pick = [R.pick(SYL.filter(function (w) { return w.length === 1; })), R.pick(SYL.filter(function (w) { return w.length === 2; })), R.pick(LONG)];
    return { q: 'Match each word to its number of beats.', type: 'match', pairs: R.shuffle(pick).map(function (w) { return [word(w), beats(w)]; }),
      hint: 'Clap each word.', explain: 'One clap for each beat.', meta: { k: 'g3-match-beats' } };
  }
  /* pick every word with 3 beats */
  function pickLong() {
    var right = R.some(LONG, R.int(1, 2)), wrong = R.some(SYL.filter(function (w) { return w.length < 3; }), 4 - right.length);
    return Q.all('Pick every word with <b>3 beats</b>.', right.map(word), wrong.map(word), { hint: 'Clap each word. Count the claps.', explain: right.map(function (w) { return W.syl(w); }).join(' '), meta: { k: 'g3-pick-long' } });
  }

  /* ai or ay? oa or ow? */
  function teamPlace(t, end) { var w = R.pick(end ? t.endWords : t.midWords), team = end ? t.end : t.mid; return { w: w, team: team, at: w.indexOf(team) }; }
  function fillTeam(lv, v0) {
    var t = TEAM[v0 || R.pick(['a', 'o'])], x = teamPlace(t, R.int(0, 1) === 1);
    var shown = x.w.slice(0, x.at) + W.gap() + x.w.slice(x.at + 2);
    return { q: 'Which letters fill the gap?', type: 'tap', tiles: [t.mid, t.end], answer: x.team === t.mid ? 0 : 1,
      fig: '<span class="sent">' + shown + '</span>', prompt: 'Is the gap at the <b>end</b> of the word?', hint: t.end + ' goes at the end. ' + t.mid + ' goes in the middle.',
      explain: W.hl(x.w, x.at, x.at + 2), steps: ['Look where the gap is.', x.at + 2 === x.w.length ? 'It is at the end, so use <b>' + t.end + '</b>.' : 'It is in the middle, so use <b>' + t.mid + '</b>.'],
      meta: { k: 'g3-fill-team', word: x.w } };
  }
  /* Which is spelled right: rayn or rain? */
  function spellTeam() {
    var t = TEAM[R.pick(['a', 'o'])], x = teamPlace(t, R.int(0, 1) === 1), other = x.team === t.mid ? t.end : t.mid;
    var wrong = x.w.slice(0, x.at) + other + x.w.slice(x.at + 2);
    return Q.one('Which word is spelled right?', x.w, [wrong], { hint: t.end + ' goes at the end. ' + t.mid + ' goes in the middle.', explain: W.hl(x.w, x.at, x.at + 2), meta: { k: 'g3-spell-team', word: x.w } });
  }
  /* sort: pick every word where the team is at the end */
  function sortTeam() {
    var t = TEAM[R.pick(['a', 'o'])], right = R.some(t.endWords, 2), wrong = R.some(t.midWords, 2);
    return Q.all('Pick every word that ends with <b>' + t.end + '</b>.', right, wrong, { hint: 'Look at the last two letters.', explain: t.end + ' comes at the end of a word.', meta: { k: 'g3-sort-team', team: t.end } });
  }
  /* true or false: "ay goes in the middle of a word" */
  function tfTeam() {
    var t = TEAM[R.pick(['a', 'o'])], which = R.pick(['mid', 'end']), sayEnd = R.int(0, 1) === 1, team = t[which];
    var right = (which === 'end') === sayEnd;
    return { q: Q.name() + ' says:', fig: W.sent('<b>' + team + '</b> goes at the ' + (sayEnd ? 'end' : 'middle') + ' of a word.'), type: 'tf', answer: right,
      why: { options: ['Like ' + t.endWords[0] + ': ' + t.end + ' is at the end.', 'Like ' + t.midWords[0] + ': ' + t.mid + ' is in the middle.'], answer: which === 'end' ? 0 : 1 },
      hint: 'Think of a word you know with ' + team + '.', explain: t.end + ' at the end (' + t.endWords[0] + '). ' + t.mid + ' in the middle (' + t.midWords[0] + ').', meta: { k: 'g3-tf-team', team: team, end: sayEnd } };
  }
  /* tricky words */
  function tricky(lv) {
    var w = R.pick(TRICKY);
    return Q.one('Which is spelled right?', w[0], w.slice(1, lv > 1 ? 3 : 2), { prompt: 'Picture the word. Which one looks right?', hint: 'This word does not follow the rules. You have to know it.', explain: W.tile(w[0]), meta: { k: 'g3-tricky', word: w[0] } });
  }

  var syllableSkill = 'syllables', patternSkill = 'patterns';
  Atlas.register('sounds', {
    lessons: [{
      id: 'beats', title: 'Beats in long words', sub: 'Split a long word into beats, then read it part by part.',
      concepts: [
        { slug: 'beats', title: 'Count the beats', exp: ['B2.1'], skill: syllableSkill,
          model: [
            step(W.tile('basket'), 'Say the word.'),
            step(W.syl(['bas', 'ket']), 'Clap it: <b>bas</b> &middot; <b>ket</b>.'),
            step(W.syl(['but', 'ter', 'fly']), 'Three claps: three beats.')
          ],
          key: '<p>Each beat has <b>one vowel sound</b>.</p>',
          guided: [function () { return count(1); }, function () { return count(1); }],
          check: [function () { return count(2); }, matchBeats],
          coach: '<p>Clap together first, then let the child clap alone. Put a hand under the chin: the chin drops once for each beat.</p>',
          mistake: '<p>Clapping each letter, or each sound, instead of each beat. Keep the claps to vowel sounds.</p>' },
        { slug: 'split', title: 'Split between two consonants', exp: ['B2.1'], skill: syllableSkill,
          model: [
            step(W.tile(W.hl('rabbit', 2, 4)), 'Two consonants in the middle.'),
            step(W.syl(['rab', 'bit']), 'Split between them.'),
            step(W.syl(['ti', 'ger']), 'One consonant? Split after the long vowel.')
          ],
          key: W.syl(['nap', 'kin']) + ' ' + W.syl(['pa', 'per']),
          guided: [function () { return split(1); }, function () { return split(1); }],
          check: [function () { return split(1); }, function () { return split(2); }],
          coach: '<p>Cover the second half of the word with a card, read the first beat, then uncover the rest.</p>',
          mistake: '<p>Splitting after the first letter (r-abbit). The first beat needs its vowel.</p>' },
        { slug: 'long-words', title: 'Read a long word in parts', exp: ['B2.1'], skill: syllableSkill,
          model: [
            step(W.tile('toboggan')),
            step(W.syl(['to', 'bog', 'gan']), 'Split it. Read each beat.'),
            step(W.tile('toboggan'), 'Blend the beats.')
          ],
          key: '<p>Split, read each beat, blend.</p>',
          guided: [function () { return buildBeats(1); }, function () { return buildBeats(2); }],
          check: [function () { return buildBeats(2); }, pickLong],
          coach: '<p>Write a long word from a book on a strip of paper and cut it into beats. Mix them up and rebuild it.</p>',
          mistake: '<p>Guessing from the first beat. Point to each beat as it is read.</p>' }
      ]
    }, {
      id: 'patterns', title: 'Spelling patterns', sub: 'Where a vowel team goes, and words to just know.',
      concepts: [
        { slug: 'ai-ay', title: 'ai or ay?', exp: ['B2.2'], skill: patternSkill,
          model: [
            step(W.tile(W.hl('rain', 1, 3)), '<b>ai</b> in the middle.'),
            step(W.tile(W.hl('play', 2, 4)), '<b>ay</b> at the end.'),
            step('<span class="sent">tr' + W.gap() + 'n</span>', 'Gap in the middle? Use <b>ai</b>: <b>train</b>.')
          ],
          key: '<p><b>ai</b> in the middle. <b>ay</b> at the end.</p>',
          guided: [function () { return fillTeam(1, 'a'); }, function () { return fillTeam(1, 'a'); }],
          check: [function () { return fillTeam(1, 'a'); }, spellTeam],
          coach: '<p>Say: "y at the end, i in the middle." Sort word cards into two piles.</p>',
          mistake: '<p>Writing "dai" or "rayn". Ask: is the sound at the end of the word?</p>' },
        { slug: 'oa-ow', title: 'oa or ow?', exp: ['B2.2'], skill: patternSkill,
          model: [
            step(W.tile(W.hl('boat', 1, 3)), '<b>oa</b> in the middle.'),
            step(W.tile(W.hl('snow', 2, 4)), '<b>ow</b> at the end.'),
            step('<span class="sent">r' + W.gap() + 'd</span>', 'Gap in the middle? Use <b>oa</b>: <b>road</b>.')
          ],
          key: '<p><b>oa</b> in the middle. <b>ow</b> at the end.</p>',
          guided: [function () { return fillTeam(1, 'o'); }, function () { return fillTeam(1, 'o'); }],
          check: [function () { return fillTeam(1, 'o'); }, sortTeam],
          coach: '<p>It works like ai and ay: the team with w goes at the end, like the one with y.</p>',
          mistake: '<p>Writing "snoa". Point to where the sound is in the word.</p>' },
        { slug: 'tricky', title: 'Words to just know', exp: ['B2.2'], skill: patternSkill,
          model: [
            step(W.tile(W.hl('said', 1, 3)), 'It breaks the rules here.'),
            step(W.icon('write'), 'Say it, spell it, cover it, write it.')
          ],
          guided: [function () { return tricky(1); }, function () { return tricky(1); }],
          check: [function () { return tricky(2); }, function () { return tricky(2); }],
          coach: '<p>Pick three tricky words a week. Write each on a card with the tricky part in a different colour.</p>',
          mistake: '<p>Spelling by sound only ("becuz"). These words have to be learned by sight.</p>' }
      ]
    }],
    practice: [
      { id: syllableSkill, name: 'Beats in long words', code: 'B2.1', gen: count },
      { id: patternSkill, name: 'Spelling patterns', code: 'B2.2', gen: function (lv) { return fillTeam(lv); } }
    ],
    tasks: [
      { id: 'read-long', title: 'Read long words in a book', code: 'B2.1', pic: W.icon('read'), say: 'Find 5 long words in a book. Read each one in beats.',
        run: ['Pick a book the child enjoys, at an easy level.', 'Together, find five words with two or three beats.', 'The child reads each word beat by beat, then blends it.'],
        rubric: ['Cannot split the words yet, even with help.', 'Splits with help; blends some.', 'Splits and reads most words alone.', 'Reads all five smoothly, and new long words too.'] }
    ]
  });

  Q.shapes('sounds', {
    syllables: [[1, 'split', split], [1, 'build', buildBeats], [2, 'match', matchBeats], [2, 'pick-long', pickLong]],
    patterns: [[1, 'spell', spellTeam], [1, 'tricky', tricky], [2, 'sort', sortTeam], [2, 'true-false', tfTeam]]
  });
})();
