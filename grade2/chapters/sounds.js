/* Grade 2: sounding out and spelling choices.
   Ontario 2023 Language, Grade 2:
   B2.1 "use phonics knowledge, including phonemic blending to read words and set for variability to correct approximations,
        and phonemic segmentation to spell phonetically regular monosyllabic and multisyllabic words, in isolation and various text contexts"
   B2.2 "use orthographic knowledge, including position-based tendencies, to make a spelling choice or accurately pronounce a word when reading"
   From the Language Foundations Continuum, Grade 2: soft c and g before e, i and y; long o spelled o-e (most common in the middle), then oa;
   the /air/ sound spelled air, are or ear.
   All word lists are written for this site. Answer checks: tests/verify/grade2-sounds.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* words as their sounds (one tile for each sound) */
  var SOUNDS = [['sh', 'o', 'p'], ['ch', 'i', 'p'], ['f', 'r', 'o', 'g'], ['c', 'l', 'a', 'p'], ['s', 't', 'e', 'p'], ['b', 'e', 'n', 'ch'], ['s', 'p', 'l', 'i', 't'],
    ['b', 'r', 'u', 'sh'], ['s', 't', 'o', 'm', 'p'], ['th', 'i', 'n'], ['d', 'u', 'ck'], ['s', 'n', 'a', 'ck'], ['f', 'i', 'sh'], ['g', 'r', 'a', 'n', 'd']];
  /* words that sound close, so a wrong blend is a real trap */
  var NEAR = { shop: ['ship', 'chop'], chip: ['ship', 'chop'], frog: ['fog', 'from'], clap: ['cap', 'clip'], step: ['stop', 'set'], bench: ['bunch', 'bend'], split: ['spit', 'slit'],
    brush: ['bush', 'blush'], stomp: ['stop', 'stamp'], thin: ['tin', 'than'], duck: ['dock', 'luck'], snack: ['sack', 'snake'], fish: ['dish', 'fist'], grand: ['gran', 'band'] };
  var word = function (s) { return s.join(''); };

  /* two-beat words: the split that makes a real word. Some keep the vowel short (rob-in), some long (ro-bot). */
  var FLEX = [['rob', 'in'], ['cab', 'in'], ['lem', 'on'], ['wag', 'on'], ['sev', 'en'], ['riv', 'er'], ['plan', 'et'], ['vis', 'it'], ['cam', 'el'], ['lim', 'it'],
    ['ro', 'bot'], ['pa', 'per'], ['ti', 'ger'], ['mu', 'sic'], ['ba', 'by'], ['o', 'pen']];
  var SHORT = FLEX.filter(function (f) { return /[^aeiou]$/.test(f[0]); });
  function otherSplit(f) { var s = word(f), at = f[0].length, k = SHORT.indexOf(f) >= 0 ? at - 1 : at + 1; return s.slice(0, k) + '-' + s.slice(k); }

  /* c and g: soft before e, i or y. Every g word here follows the pattern. */
  var C = { soft: ['city', 'cent', 'face', 'rice', 'cycle', 'fancy', 'pencil', 'dance'], hard: ['cat', 'cup', 'cave', 'clap', 'coat', 'cub', 'music', 'cold'] };
  var G = { soft: ['gem', 'giant', 'gym', 'page', 'cage', 'huge', 'magic', 'stage'], hard: ['go', 'gum', 'gate', 'flag', 'bag', 'gold', 'wagon', 'frog'] };
  var KS = { c: [C, 's as in sun', 'k as in kite'], g: [G, 'j as in jam', 'g as in goat'] };
  /* the letter after the first soft c or g in the word, to show where to look */
  function after(w, l) { var i = w.indexOf(l); return { at: i, next: w.charAt(i + 1) }; }

  /* long o: o-e is the most common spelling in the middle of a word, then oa */
  var LONGO = [['bone', 'boan'], ['home', 'hoam'], ['rope', 'roap'], ['stone', 'stoan'], ['nose', 'noas'], ['hole', 'hoal'], ['boat', 'bote'], ['road', 'rode'], ['coat', 'cote'], ['soap', 'sope'], ['goat', 'gote'], ['toast', 'tost']];
  /* the /air/ sound */
  var AIR = { air: ['chair', 'hair', 'fair', 'stairs', 'pair'], are: ['care', 'share', 'scare', 'square', 'bare'], ear: ['bear', 'pear', 'wear'] };
  var AIRWRONG = { chair: ['chare', 'chear'], hair: ['hare', 'hear'], fair: ['fare', 'fear'], stairs: ['stares', 'stears'], pair: ['pare', 'pear'],
    care: ['cair', 'cear'], share: ['shair', 'shear'], scare: ['scair', 'scear'], square: ['squair', 'squear'], bare: ['bair', 'bear'], bear: ['bair', 'bare'], pear: ['pair', 'pare'], wear: ['wair', 'ware'] };
  /* hare, hear, fare, fear, pare, bare, bear... are real words with another meaning, so "spelled right" questions give a picture of the meaning */
  var AIRMEAN = { chair: 'something you sit on', hair: 'it grows on your head', fair: 'the same for everyone', stairs: 'steps in a house', pair: 'two of something',
    care: 'to look after', share: 'to give some away', scare: 'to make someone afraid', square: 'a shape with four equal sides', bare: 'with nothing on it',
    bear: 'a big furry animal', pear: 'a fruit', wear: 'to have clothes on' };
  function airTeam(w) { return Object.keys(AIR).filter(function (t) { return AIR[t].indexOf(w) >= 0; })[0]; }

  /* ---------- question makers: sounding out (B2.1) ---------- */
  /* Blend these sounds. Which word? */
  function blend(lv) {
    var s = R.pick(lv > 1 ? SOUNDS.filter(function (x) { return x.length > 3; }) : SOUNDS.filter(function (x) { return x.length <= 4; })), w = word(s);
    return Q.tiles('Blend the sounds. Which word is it?', w, NEAR[w].slice(0, lv > 1 ? 2 : 1), { fig: W.syl(s), prompt: 'Say each sound. Then say them fast.',
      hint: 'Touch each tile and say its sound.', explain: W.syl(s) + ' ' + W.tile(w), steps: ['Say the sounds: ' + s.join(', ') + '.', 'Say them fast: <b>' + w + '</b>.'], meta: { k: 'g2-blend', word: w } });
  }
  /* How many sounds in "ship"? */
  function countSounds(lv) {
    var s = R.pick(SOUNDS), w = word(s), n = s.length;
    return Q.one('How many <b>sounds</b> are in this word?', String(n), ['2', '3', '4', '5', '6'].filter(function (x) { return +x !== n; }).slice(0, lv > 1 ? 3 : 2),
      { fig: lv > 1 ? W.tile(w) : W.syl(s), prompt: 'Say it slowly. Hold up a finger for each sound.', hint: 'Letters like sh, ch, th and ck make one sound.',
        explain: W.syl(s), meta: { k: 'g2-count-sounds', word: w } });
  }
  /* Spell "frog": tap the sounds in order (one tile is not needed) */
  function spellSounds(lv) {
    var s = R.pick(lv > 1 ? SOUNDS.filter(function (x) { return x.length > 3; }) : SOUNDS), w = word(s), extra = R.pick(['m', 'z', 'v', 'j', 'w'].filter(function (x) { return s.indexOf(x) < 0; }));
    var tiles = s.map(function (p) { return W.tile(p, 'syl'); }).concat([W.tile(extra, 'syl')]);
    return { q: 'Spell <b>' + w + '</b>. Tap the sounds in order.', type: 'build', parts: tiles, answer: s.map(function (p, i) { return i; }),
      hint: 'Say the word slowly. What is the first sound?', explain: W.syl(s), meta: { k: 'g2-spell-sounds', word: w } };
  }
  /* match words to their number of sounds */
  function matchSounds() {
    var by = {};
    R.shuffle(SOUNDS).forEach(function (s) { if (!by[s.length]) by[s.length] = s; });
    var three = Object.keys(by).slice(0, 3).map(function (n) { return by[n]; });
    return { q: 'Match each word to its number of sounds.', type: 'match', pairs: three.map(function (s) { return [word(s), s.length + ' sounds']; }),
      hint: 'Say each word slowly. Count the sounds, not the letters.', explain: 'sh, ch, th and ck are one sound each.', meta: { k: 'g2-match-sounds' } };
  }
  /* Which split makes a real word: ro-bin or rob-in? */
  function flex(lv) {
    var f = R.pick(lv > 1 ? FLEX : SHORT), right = f.join('-');
    return Q.tiles('Which way makes a real word?', right, [otherSplit(f)], { fig: W.tile(word(f)), prompt: 'Read it one way. Is it a word? If not, try the other vowel sound.',
      hint: 'Try a short vowel sound, then a long one. Which one is a word you know?', explain: W.syl(f), meta: { k: 'g2-flex', word: word(f) } });
  }
  /* Ben read "ro-bin". Is that right? */
  function flexTf() {
    var f = R.pick(FLEX), right = R.int(0, 1) === 1, said = right ? f.join('-') : otherSplit(f);
    return { q: Q.name() + ' reads <b>' + word(f) + '</b> like this:', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['That makes a word I know.', 'That is not a word. Try the other vowel sound.'], answer: right ? 0 : 1 },
      hint: 'Say it aloud. Is it a word you know?', explain: W.syl(f), meta: { k: 'g2-flex-tf', word: word(f), said: said } };
  }

  /* ---------- question makers: spelling choices (B2.2) ---------- */
  /* Does c say /s/ or /k/ in "city"? */
  function softSound(lv, l0) {
    var l = l0 || R.pick(['c', 'g']), k = KS[l], soft = R.int(0, 1) === 1, w = R.pick(soft ? k[0].soft : k[0].hard), a = after(w, l);
    return { q: 'What sound does <b>' + l + '</b> make in this word?', fig: W.tile(W.hl(w, a.at, a.at + 1)), type: 'tap', tiles: [k[1], k[2]], answer: soft ? 0 : 1,
      prompt: 'Look at the letter after <b>' + l + '</b>. Is it e, i or y?', hint: l + ' before e, i or y makes its soft sound.',
      explain: W.tile(W.hl(w, a.at, a.at + 2)) + ' ' + (soft ? a.next + ' comes next: soft ' + l + '.' : 'No e, i or y next: hard ' + l + '.'),
      meta: { k: 'g2-soft', word: w, letter: l } };
  }
  /* Pick every word where c says /s/ */
  function softPick(lv, l0) {
    var l = l0 || R.pick(['c', 'g']), k = KS[l], right = R.some(k[0].soft, R.int(1, 2)), wrong = R.some(k[0].hard, 4 - right.length);
    return Q.all('Pick every word where <b>' + l + '</b> sounds like <b>' + k[1] + '</b>.', right, wrong, { hint: 'Look for e, i or y right after the ' + l + '.',
      explain: right.map(function (w) { var a = after(w, l); return W.tile(W.hl(w, a.at, a.at + 2)); }).join(' '), meta: { k: 'g2-soft-pick', letter: l } });
  }
  /* Which is spelled right: bone or boan? (with long o) */
  function longO(lv) {
    var p = R.pick(lv > 1 ? LONGO : LONGO.slice(0, 6));
    return Q.one('Which is spelled right?', p[0], [p[1]], { prompt: 'In the middle of a word, try <b>o-e</b> first. Does it look right?', hint: 'Picture the word. Which one have you seen in books?',
      explain: W.tile(p[0]), meta: { k: 'g2-long-o', word: p[0] } });
  }
  /* Which is spelled right? A picture of the meaning, because hare and hair are both words */
  function airSpell(lv) {
    var t = R.pick(Object.keys(AIR)), w = R.pick(AIR[t]);
    return Q.one('Which word means <b>' + AIRMEAN[w] + '</b>?', w, AIRWRONG[w].slice(0, lv > 1 ? 2 : 1), { prompt: 'Which spelling of the /air/ sound does this word use?',
      hint: 'air as in chair, are as in care, ear as in bear.', explain: W.tile(W.hl(w, w.indexOf(t), w.indexOf(t) + 3)), meta: { k: 'g2-air', word: w } });
  }
  /* sort: pick every word that spells /air/ with "are" */
  function airSort() {
    var t = R.pick(['air', 'are']), other = t === 'air' ? 'are' : 'air', right = R.some(AIR[t], 2), wrong = R.some(AIR[other], 2);
    return Q.all('Pick every word that spells the /air/ sound <b>' + t + '</b>.', right, wrong, { hint: 'Look at the letters after the first sound.', explain: right.map(function (w) { return W.tile(W.hl(w, w.indexOf(t), w.indexOf(t) + 3)); }).join(' '), meta: { k: 'g2-air-sort', team: t } });
  }
  /* "In city, c sounds like k as in kite." True or false? Then why. */
  function softTf() {
    var l = R.pick(['c', 'g']), k = KS[l], soft = R.int(0, 1) === 1, w = R.pick(soft ? k[0].soft : k[0].hard), sayS = R.int(0, 1) === 1, said = sayS ? k[1] : k[2];
    return { q: Q.name() + ' says:', fig: W.sent('In <b>' + w + '</b>, ' + l + ' sounds like <b>' + said + '</b>.'), type: 'tf', answer: sayS === soft,
      why: { options: ['e, i or y comes after the ' + l + '.', 'No e, i or y comes after the ' + l + '.'], answer: soft ? 0 : 1 },
      hint: 'Look at the letter after the ' + l + '.', explain: W.tile(W.hl(w, after(w, l).at, after(w, l).at + 2)), meta: { k: 'g2-soft-tf', word: w, letter: l, said: said } };
  }

  Atlas.register('sounds', {
    lessons: [{
      id: 'sound-out', title: 'Sound it out', sub: 'Blend sounds to read. Split sounds to spell.',
      concepts: [
        { slug: 'blend', title: 'Blend the sounds', exp: ['B2.1'], skill: 'sound-out',
          model: [
            step(W.syl(['f', 'r', 'o', 'g']), 'One tile for each sound.'),
            step(W.syl(['f', 'r', 'o', 'g']), 'Say them slowly: f, r, o, g.'),
            step(W.tile('frog'), 'Say them fast.'),
            step(W.syl(['sh', 'o', 'p']) + ' ' + W.tile('shop'), '<b>sh</b> is one sound.')
          ],
          guided: [function () { return blend(1); }, function () { return blend(1); }],
          check: [function () { return blend(2); }, function () { return blend(2); }],
          coach: '<p>Say the sounds, not letter names: "fff, rrr, o, g". Stretch the sounds that can be stretched, then say the word fast.</p>',
          mistake: '<p>Adding "uh" to sounds ("fuh-ruh-o-guh"), which makes blending hard. Keep stop sounds short and crisp.</p>' },
        { slug: 'segment', title: 'Split a word into sounds to spell it', exp: ['B2.1'], skill: 'sound-out',
          model: [
            step(W.tile('stomp'), 'Say it slowly.'),
            step(W.syl(['s', 't', 'o', 'm', 'p']), 'Five sounds. Five fingers.'),
            step(W.syl(['d', 'u', 'ck']), '<b>ck</b> is one sound: three fingers.')
          ],
          guided: [function () { return countSounds(1); }, function () { return spellSounds(1); }],
          check: [function () { return countSounds(2); }, function () { return spellSounds(2); }],
          coach: '<p>Hold up a finger for each sound, then write one spelling for each finger. Letter teams like sh and ck share one finger.</p>',
          mistake: '<p>Counting letters instead of sounds. <b>duck</b> has four letters but three sounds.</p>' },
        { slug: 'flex', title: 'Not a word? Try the other vowel sound', exp: ['B2.1'], skill: 'sound-out',
          model: [
            step(W.tile('robin'), 'A new word.'),
            step(W.syl(['ro', 'bin']), 'Long o: ro-bin? Not a word.'),
            step(W.syl(['rob', 'in']), 'Short o: rob-in. A bird!'),
            step(W.syl(['ro', 'bot']), 'Here the long o is right.')
          ],
          guided: [function () { return flex(1); }, flexTf],
          check: [function () { return flex(2); }, flexTf],
          coach: '<p>When a word comes out wrong, ask: "Is that a word you know? Try the vowel the other way." This is called <b>flexing</b> the vowel.</p>',
          mistake: '<p>Keeping a made-up word and reading on. Praise every time the child stops and tries again.</p>' }
      ]
    }, {
      id: 'choices', title: 'Spelling choices', sub: 'One sound, more than one spelling. Where it is helps you choose.',
      concepts: [
        { slug: 'soft-c', title: 'c before e, i or y says s', exp: ['B2.2'], skill: 'spelling-choices',
          model: [
            step(W.tile(W.hl('cat', 0, 1)), 'Hard c: like k.'),
            step(W.tile(W.hl('city', 0, 2)), '<b>i</b> comes next: like s.'),
            step(W.tile(W.hl('face', 2, 4)), '<b>e</b> next: s again.')
          ],
          guided: [function () { return softSound(1, 'c'); }, function () { return softSound(1, 'c'); }],
          check: [function () { return softSound(1, 'c'); }, function () { return softPick(1, 'c'); }],
          coach: '<p>Have the child put a finger on the letter after the c. "Is it e, i or y? Then c says s."</p>',
          mistake: '<p>Reading <b>city</b> as "kitty". Look at the letter after c.</p>' },
        { slug: 'soft-g', title: 'g before e, i or y often says j', exp: ['B2.2'], skill: 'spelling-choices',
          model: [
            step(W.tile(W.hl('gate', 0, 1)), 'Hard g, like in goat.'),
            step(W.tile(W.hl('giant', 0, 2)), '<b>i</b> next: j, like in jam.'),
            step(W.tile(W.hl('page', 2, 4)), '<b>e</b> next: j again.')
          ],
          guided: [function () { return softSound(1, 'g'); }, function () { return softSound(1, 'g'); }],
          check: [function () { return softSound(1, 'g'); }, function () { return softPick(1, 'g'); }],
          coach: '<p>Say "often" on purpose: some common words break this pattern (get, give, girl). Teach those as words to just know.</p>',
          mistake: '<p>Using the pattern on <b>get</b> or <b>girl</b>. Tell the child: "Try soft g first. If it is not a word, try hard g."</p>' },
        { slug: 'long-o', title: 'Long o in the middle: try o-e first', exp: ['B2.2'], skill: 'spelling-choices',
          model: [
            step(W.tile(W.hl('bone', 1, 4)), 'o, a consonant, then e.'),
            step(W.tile(W.hl('boat', 1, 3)), 'Sometimes <b>oa</b>.'),
            step(W.icon('read'), 'Not sure? Write it both ways. Which one looks right?')
          ],
          guided: [function () { return longO(1); }, function () { return longO(1); }],
          check: [function () { return longO(2); }, function () { return longO(2); }],
          coach: '<p>Write the word both ways on scrap paper and ask: "Which one have you seen in books?" Seeing words often is what builds this.</p>',
          mistake: '<p>Writing <b>oa</b> everywhere ("hoam"). o-e is the more common spelling in the middle of a word.</p>' },
        { slug: 'air', title: 'The air sound: air, are or ear', exp: ['B2.2'], skill: 'spelling-choices',
          model: [
            step(W.tile(W.hl('chair', 2, 5)), '<b>air</b>, as in hair.'),
            step(W.tile(W.hl('care', 1, 4)), '<b>are</b>, as in share.'),
            step(W.tile(W.hl('bear', 1, 4)), '<b>ear</b>, in only a few words.'),
            step(W.means('people', '<b>pair</b> of socks, <b>pear</b> to eat'), 'Same sound, different meaning.')
          ],
          guided: [function () { return airSpell(1); }, airSort],
          check: [function () { return airSpell(2); }, airSort],
          coach: '<p>Make three columns, air, are and ear, and sort words from books into them.</p>',
          mistake: '<p>Mixing up words that sound the same, like <b>pair</b> and <b>pear</b>. Ask: "Which one do you mean?"</p>' }
      ]
    }],
    practice: [
      { id: 'sound-out', name: 'Blending and splitting sounds', code: 'B2.1', gen: blend },
      { id: 'spelling-choices', name: 'Spelling choices', code: 'B2.2', gen: function (lv) { return softSound(lv); } }
    ],
    tasks: [
      { id: 'dictation', title: 'Spell by sounds', code: 'B2.1', pic: W.icon('write'), say: 'Listen to each word. Say its sounds. Write it.', write: true,
        run: ['Say five words, one at a time: frog, shop, stomp, brush, planet.', 'The child says the sounds aloud, holding up a finger for each, then writes the word.', 'Check together, sound by sound.'],
        rubric: ['Writes few of the sounds yet.', 'Writes the first and last sounds.', 'Writes every sound in most words.', 'Spells all five, including the two-beat word.'] }
    ]
  });

  Q.shapes('sounds', {
    'sound-out': [[1, 'count', countSounds], [1, 'spell', spellSounds], [1, 'flex', flex], [2, 'match', matchSounds], [2, 'flex-tf', flexTf]],
    'spelling-choices': [[1, 'soft-pick', softPick], [1, 'long-o', longO], [1, 'air', airSpell], [2, 'air-sort', airSort], [2, 'soft-tf', softTf]]
  });
})();
