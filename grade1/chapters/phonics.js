/* Grade 1: letters and sounds (phonics: grapheme-phoneme correspondence).
   Ontario 2023 Language, Grade 1, B2.3: "identify, read, and spell most common grapheme-phoneme correspondences of
   consonants and vowels, with automaticity". Following the Language Foundations Continuum for Grade 1: short vowels,
   the digraphs sh, ch, th, wh and ck, silent e (VCe), the vowel teams ee, ai, ay and oa, and ar and or.
   All sentences, clues and word lists are written for this site. Answer checks: tests/verify/grade1-phonics.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  var VOWELS = ['a', 'e', 'i', 'o', 'u'];

  /* a sentence that only one short vowel fits: [sentence with {word}, word] */
  var GAPS = [['A {pig} rolls in the mud.', 'pig'], ['The {cat} naps in the sun.', 'cat'], ['I sleep in my {bed}.', 'bed'], ['The {dog} digs a hole.', 'dog'],
    ['Sit on the {rug}.', 'rug'], ['My {hat} is red.', 'hat'], ['A {hen} lays an egg.', 'hen'], ['Fill the {cup} with milk.', 'cup'], ['Put the {lid} on the pot.', 'lid'],
    ['The {map} shows the lake.', 'map'], ['I can {hop} on one foot.', 'hop'], ['The {sun} is hot today.', 'sun'], ['We ride the {bus} to school.', 'bus'], ['A {fox} has a bushy tail.', 'fox']];
  var CVC = ['cat', 'map', 'hat', 'bag', 'van', 'jam', 'bed', 'hen', 'net', 'web', 'leg', 'pig', 'lid', 'zip', 'fin', 'six', 'dog', 'mop', 'pot', 'log', 'box', 'cup', 'bus', 'rug', 'sun', 'hug'];
  var vowelOf = function (w) { return w.split('').filter(function (c) { return VOWELS.indexOf(c) >= 0; })[0]; };

  /* two letters, one sound */
  var DIGRAPHS = ['sh', 'ch', 'th', 'wh', 'ck'];
  var DWORDS = ['ship', 'shop', 'shell', 'fish', 'dish', 'chin', 'chop', 'lunch', 'thin', 'bath', 'moth', 'whale', 'when', 'whip', 'duck', 'sock', 'back', 'neck'];
  /* a gap and a clue that only one word fits: [word, clue] */
  var DCLUES = [['ship', 'a big boat'], ['fish', 'it swims in a lake'], ['chin', 'the part of your face under your mouth'], ['bath', 'you wash in it'], ['whale', 'a huge animal in the sea'],
    ['duck', 'a bird that quacks'], ['lunch', 'a meal in the middle of the day'], ['moth', 'it flies at night, like a butterfly'], ['shell', 'a snail lives in it'], ['sock', 'you wear it on your foot']];
  var dOf = function (w) { return DIGRAPHS.filter(function (d) { return w.indexOf(d) >= 0; })[0]; };

  /* long vowels: silent e, vowel teams, and vowels with r. [word, clue, a word with one letter different] */
  var SILENT = [['kite', 'it flies on a string', 'kit'], ['pine', 'a tree with needles', 'pin'], ['cape', 'a superhero wears it', 'cap'], ['tube', 'toothpaste comes in it', 'tub'],
    ['cane', 'it helps someone walk', 'can'], ['note', 'a short letter', 'not'], ['cube', 'a box shape with six sides', 'cub'], ['hide', 'what you do in hide-and-seek', 'hid'], ['made', 'I ___ a card for Mom.', 'mad']];
  var TEAMS = { ee: ['tree', 'bee', 'feet', 'seed', 'sheep', 'green'], ai: ['rain', 'tail', 'snail', 'paint', 'train'], ay: ['day', 'play', 'hay', 'tray'], oa: ['boat', 'coat', 'road', 'soap', 'goat'] };
  var TCLUES = [['boat', 'it floats on the lake'], ['tree', 'it has leaves and a trunk'], ['rain', 'it falls from the clouds'], ['feet', 'you stand on them'], ['coat', 'you wear it when it is cold'],
    ['tail', 'a dog wags it'], ['seed', 'a plant grows from it'], ['road', 'cars drive on it'], ['day', 'the opposite of night'], ['soap', 'you wash your hands with it']];
  var RCLUES = [['car', 'it drives on the road'], ['star', 'it shines in the night sky'], ['farm', 'cows and pigs live there'], ['corn', 'a yellow vegetable on a cob'], ['fork', 'you eat with it'], ['horse', 'an animal you can ride']];
  var teamOf = function (w) { return ['ee', 'ai', 'ay', 'oa', 'ar', 'or'].filter(function (t) { return w.indexOf(t) >= 0; })[0]; };
  function gapAt(w, part) { var at = w.indexOf(part); return '<span class="sent">' + w.slice(0, at) + W.gap() + w.slice(at + part.length) + '</span>'; }

  /* ---------- question makers: short vowels ---------- */
  function vowelGap(lv) {
    var g = R.pick(GAPS), w = g[1], v = vowelOf(w), at = w.indexOf(v);
    var shown = g[0].replace('{' + w + '}', '<b>' + w.slice(0, at) + '</b>' + W.gap() + '<b>' + w.slice(at + 1) + '</b>');
    return Q.tiles('Which vowel fills the gap?', v, R.some(VOWELS.filter(function (x) { return x !== v; }), lv > 1 ? 4 : 2), { fig: W.sent(shown),
      prompt: 'Try each vowel in the word. Which one makes sense in the sentence?', hint: 'Say the word with each vowel. Which word fits?',
      explain: W.sent(g[0].replace('{' + w + '}', W.hl(w, at, at + 1))), meta: { k: 'g1-vowel-gap', word: w } });
  }
  function sameVowel(lv) {
    var w = R.pick(CVC), v = vowelOf(w), right = R.pick(CVC.filter(function (x) { return x !== w && vowelOf(x) === v; }));
    var wrong = R.some(CVC.filter(function (x) { return vowelOf(x) !== v; }), lv > 1 ? 3 : 2);
    return Q.one('Which word has the same <b>middle sound</b> as <b>' + w + '</b>?', right, wrong, { prompt: 'Say the middle sound of <b>' + w + '</b>: ' + W.sound(v) + '.',
      hint: 'Look at the vowel in the middle.', explain: W.tile(W.hl(w, 1, 2)) + ' ' + W.tile(W.hl(right, 1, 2)), meta: { k: 'g1-same-vowel', word: w } });
  }
  function whichVowel(lv) {
    var w = R.pick(CVC), v = vowelOf(w);
    return Q.tiles('Which vowel do you hear in <b>' + w + '</b>?', v, R.some(VOWELS.filter(function (x) { return x !== v; }), lv > 1 ? 4 : 2), { fig: (W.pics.indexOf(w) >= 0 ? W.pic(w) : '') + W.tile(w),
      hint: 'a e i o u: which one is in the word?', explain: W.tile(W.hl(w, 1, 2)), meta: { k: 'g1-which-vowel', word: w } });
  }
  function pickVowel() {
    var v = R.pick(VOWELS), right = R.some(CVC.filter(function (x) { return vowelOf(x) === v; }), 2), wrong = R.some(CVC.filter(function (x) { return vowelOf(x) !== v; }), 2);
    return Q.all('Pick every word with the short <b>' + v + '</b> sound.', right, wrong, { hint: 'Look for the letter ' + v + ' in the middle.', explain: right.join(', ') + ' have /' + v + '/.', meta: { k: 'g1-pick-vowel', v: v } });
  }

  /* ---------- question makers: two letters, one sound ---------- */
  function whichDigraph(lv) {
    var w = R.pick(DWORDS), d = dOf(w);
    return Q.tiles('Which two letters make <b>one sound</b> in <b>' + w + '</b>?', d, R.some(DIGRAPHS.filter(function (x) { return x !== d; }), lv > 1 ? 3 : 2), { fig: W.tile(w),
      hint: 'Look for sh, ch, th, wh or ck.', explain: W.tile(W.hl(w, w.indexOf(d), w.indexOf(d) + 2)), meta: { k: 'g1-which-digraph', word: w } });
  }
  function fillDigraph(lv) {
    var c = R.pick(DCLUES), d = dOf(c[0]);
    return Q.tiles('Which letters fill the gap? <i>' + c[1].charAt(0).toUpperCase() + c[1].slice(1) + '.</i>', d, R.some(DIGRAPHS.filter(function (x) { return x !== d; }), lv > 1 ? 3 : 2), {
      fig: gapAt(c[0], d), prompt: 'Read the clue. What is the word?', hint: 'Think of the word that fits the clue. Which two letters make its sound?',
      explain: W.tile(W.hl(c[0], c[0].indexOf(d), c[0].indexOf(d) + 2)), meta: { k: 'g1-fill-digraph', clue: c[1] } });
  }
  function pickDigraph() {
    var d = R.pick(['sh', 'ch', 'th', 'ck']), right = R.some(DWORDS.filter(function (w) { return dOf(w) === d; }), 2), wrong = R.some(DWORDS.filter(function (w) { return dOf(w) !== d; }), 2);
    return Q.all('Pick every word with <b>' + d + '</b>.', right, wrong, { hint: 'Look for the two letters together.', explain: right.join(', ') + ' have ' + d + '.', meta: { k: 'g1-pick-digraph', d: d } });
  }
  function matchDigraph() {
    var ds = R.some(DIGRAPHS, 3), ws = ds.map(function (d) { return R.pick(DWORDS.filter(function (w) { return dOf(w) === d; })); });
    return { q: 'Match each word to its two-letter sound.', type: 'match', pairs: ws.map(function (w, i) { return [w, ds[i]]; }), hint: 'Find the two letters that go together.', explain: 'Two letters, one sound.', meta: { k: 'g1-match-digraph' } };
  }

  /* ---------- question makers: long vowels ---------- */
  function silentE(lv) {
    var s = R.pick(SILENT);
    return Q.one('Which word fits? <i>' + s[1].charAt(0).toUpperCase() + s[1].slice(1) + (/[.?]$/.test(s[1]) ? '' : '.') + '</i>', s[0], [s[2]].concat(lv > 1 ? [R.pick(SILENT.filter(function (x) { return x !== s; }))[0]] : []), {
      prompt: 'Does the word have a silent <b>e</b>? Then the vowel says its name.', hint: 'Read each word. With a silent e, the vowel says its name.',
      explain: W.tile(W.hl(s[0], s[0].length - 1, s[0].length)) + ': the e is silent and the vowel says its name.', meta: { k: 'g1-silent-e', w: s[0] } });
  }
  function addE(lv) {
    var s = R.pick(SILENT), other = R.pick(SILENT.filter(function (x) { return x !== s; }));
    return Q.one('Add a silent <b>e</b> to <b>' + s[2] + '</b>. What word do you get?', s[0], [s[2] + 's', other[0]].slice(0, lv > 1 ? 2 : 1), { fig: W.tile(s[2]) + W.tile('+ e'),
      hint: 'Put e on the end. The vowel now says its name.', explain: W.tile(s[2]) + ' + e = ' + W.tile(s[0]), meta: { k: 'g1-add-e', base: s[2] } });
  }
  function teamIn(lv) {
    var t = R.pick(Object.keys(TEAMS)), w = R.pick(TEAMS[t]);
    return Q.tiles('Which vowel team is in <b>' + w + '</b>?', t, R.some(Object.keys(TEAMS).filter(function (x) { return x !== t; }), lv > 1 ? 3 : 2), { fig: W.tile(w),
      hint: 'Look for two vowels side by side, or ay.', explain: W.tile(W.hl(w, w.indexOf(t), w.indexOf(t) + 2)), meta: { k: 'g1-team-in', word: w } });
  }
  function fillTeam(lv) {
    var c = R.pick(lv > 2 ? TCLUES.concat(RCLUES) : TCLUES), t = teamOf(c[0]);
    return Q.tiles('Which letters fill the gap? <i>' + c[1].charAt(0).toUpperCase() + c[1].slice(1) + '.</i>', t, R.some(['ee', 'ai', 'oa', 'ar', 'or'].filter(function (x) { return x !== t; }), lv > 1 ? 3 : 2), {
      fig: gapAt(c[0], t), prompt: 'Read the clue. What is the word?', hint: 'Say the word that fits the clue. Which letters make its vowel sound?',
      explain: W.tile(W.hl(c[0], c[0].indexOf(t), c[0].indexOf(t) + 2)), meta: { k: 'g1-fill-team', clue: c[1] } });
  }
  function fillR(lv) {
    var c = R.pick(RCLUES), t = teamOf(c[0]);
    return Q.tiles('Which letters fill the gap? <i>' + c[1].charAt(0).toUpperCase() + c[1].slice(1) + '.</i>', t, [t === 'ar' ? 'or' : 'ar'].concat(lv > 1 ? ['ee'] : []), {
      fig: gapAt(c[0], t), prompt: 'Say the word. Is it ' + W.sound('ar') + ' like car, or ' + W.sound('or') + ' like fork?', hint: '<b>ar</b> as in car. <b>or</b> as in fork.',
      explain: W.tile(W.hl(c[0], c[0].indexOf(t), c[0].indexOf(t) + 2)), meta: { k: 'g1-fill-team', clue: c[1] } });
  }

  Atlas.register('phonics', {
    lessons: [{
      id: 'short', title: 'Short vowels', sub: 'a, e, i, o and u in short words.',
      concepts: [
        { slug: 'vowels', title: 'Five vowels', exp: ['B2.3'], skill: 'short-vowels',
          model: [
            step(W.tile('a') + W.tile('e') + W.tile('i') + W.tile('o') + W.tile('u'), 'Every word has at least one.'),
            step(W.pic('cat') + W.tile(W.hl('cat', 1, 2)), W.sound('a') + ' as in cat.'),
            step(W.tile(W.hl('pig', 1, 2)) + W.tile(W.hl('dog', 1, 2)), W.sound('i') + ' as in pig. ' + W.sound('o') + ' as in dog.')
          ],
          guided: [function () { return whichVowel(1); }, function () { return whichVowel(1); }],
          check: [function () { return whichVowel(1); }, function () { return sameVowel(1); }],
          coach: '<p>Give each vowel an anchor word and say it with the sound: a, apple; e, egg; i, igloo; o, otter; u, up. Say the sound, not the name.</p>',
          mistake: '<p>Mixing up e and i (pen and pin). Exaggerate the mouth: /e/ is a wide, open smile; /i/ is a small smile.</p>' },
        { slug: 'vowel-fit', title: 'Which vowel makes sense?', exp: ['B2.3'], skill: 'short-vowels',
          model: [
            step(W.sent('The <b>c</b>' + W.gap() + '<b>t</b> naps in the sun.'), 'Try each vowel.'),
            step(W.sent('cot? cut? <b>cat</b>!'), 'Only one makes sense.'),
            step(W.sent('The c' + W.hl('a', 0, 1) + 't naps in the sun.'))
          ],
          guided: [function () { return vowelGap(1); }, function () { return vowelGap(1); }],
          check: [function () { return vowelGap(1); }, function () { return vowelGap(2); }],
          coach: '<p>Write the word with a gap on paper. Let the child write each vowel in the gap, read the word, and decide if it makes sense.</p>',
          mistake: '<p>Picking a vowel without reading the whole sentence. Read the sentence aloud with each choice.</p>' }
      ]
    }, {
      id: 'digraphs', title: 'Two letters, one sound', sub: 'sh, ch, th, wh and ck.',
      concepts: [
        { slug: 'sh-ch-th', title: 'Two letters can make one sound', exp: ['B2.3'], skill: 'digraphs',
          model: [
            step(W.tile(W.hl('ship', 0, 2)), '<b>sh</b>: ' + W.sound('sh') + ', like hush.'),
            step(W.tile(W.hl('chin', 0, 2)), '<b>ch</b>: ' + W.sound('ch') + ', like a train.'),
            step(W.tile(W.hl('thin', 0, 2)) + W.tile(W.hl('whale', 0, 2)), '<b>th</b>: ' + W.sound('th') + ', tongue out. <b>wh</b>: ' + W.sound('wh', '/w/') + '.'),
            step(W.tile(W.hl('duck', 2, 4)), '<b>ck</b>: ' + W.sound('ck', '/k/') + ', at the end.')
          ],
          guided: [function () { return whichDigraph(1); }, function () { return whichDigraph(1); }],
          check: [function () { return whichDigraph(1); }, function () { return fillDigraph(1); }],
          coach: '<p>Write each pair on a card. Tape the two letters together so the child sees them as one sound. Read words with a finger under the pair.</p>',
          mistake: '<p>Reading sh as /s/ /h/. Cover the rest of the word and say the pair as one sound first.</p>' },
        { slug: 'clue', title: 'Use the clue', exp: ['B2.3'], skill: 'digraphs',
          model: [
            step(gapAt('fish', 'sh'), '<i>It swims in a lake.</i>'),
            step(W.tile(W.hl('fish', 2, 4)), 'The word is fish: <b>sh</b>.')
          ],
          guided: [function () { return fillDigraph(1); }, function () { return fillDigraph(1); }],
          check: [function () { return fillDigraph(2); }, function () { return fillDigraph(2); }],
          coach: '<p>Say the word aloud and stretch the two-letter sound: "fi-shhh". Ask which pair of letters makes that sound.</p>',
          mistake: '<p>Choosing ch for sh. Say both: /ch/ is a short burst, /sh/ is a long, quiet sound.</p>' }
      ]
    }, {
      id: 'long', title: 'Long vowels', sub: 'Silent e, vowel teams, and ar and or.',
      concepts: [
        { slug: 'silent-e', title: 'Silent e', exp: ['B2.3'], skill: 'vowel-patterns',
          model: [
            step(W.tile('kit'), 'Short i.'),
            step(W.tile('kit') + W.tile('+ e'), 'Add e on the end.'),
            step(W.pic('kite') + W.tile(W.hl('kite', 3, 4)), 'You do not hear the e. The i says its name.')
          ],
          guided: [function () { return addE(1); }, function () { return silentE(1); }],
          check: [function () { return silentE(1); }, function () { return silentE(2); }],
          coach: '<p>Write pairs on cards (cap and cape, pin and pine). Read the first, then add the e and read again. Notice the vowel saying its name.</p>',
          mistake: '<p>Reading the e out loud ("kit-eh"). The e is silent; its job is to change the vowel.</p>' },
        { slug: 'teams', title: 'Vowel teams', exp: ['B2.3'], skill: 'vowel-patterns',
          model: [
            step(W.pic('tree') + W.tile(W.hl('tree', 2, 4)), '<b>ee</b> says ' + W.sound('ee', '/ē/') + '.'),
            step(W.tile(W.hl('rain', 1, 3)) + W.tile(W.hl('day', 1, 3)), '<b>ai</b> and <b>ay</b> say ' + W.sound('ai', '/ā/') + '.'),
            step(W.tile(W.hl('boat', 1, 3)), '<b>oa</b> says ' + W.sound('oa', '/ō/') + '.')
          ],
          key: '<p>Two vowels together: the first one often says its name.</p>',
          guided: [function () { return teamIn(1); }, function () { return fillTeam(1); }],
          check: [function () { return teamIn(2); }, function () { return fillTeam(2); }],
          coach: '<p>Sort word cards into piles: ee, ai, ay, oa. Read each pile aloud.</p>',
          mistake: '<p>Reading each vowel on its own (bo-at). Cover one vowel to show that the pair makes one sound.</p>' },
        { slug: 'ar-or', title: 'ar and or', exp: ['B2.3'], skill: 'vowel-patterns',
          model: [
            step(W.tile(W.hl('car', 1, 3)), W.sound('ar', '<b>ar</b>') + ' as in car.'),
            step(W.tile(W.hl('fork', 1, 3)), W.sound('or', '<b>or</b>') + ' as in fork.'),
            step(W.tile(W.hl('star', 2, 4)) + W.tile(W.hl('corn', 1, 3)))
          ],
          key: '<p>The r changes the sound of the vowel.</p>',
          guided: [function () { return fillR(1); }, function () { return fillR(1); }],
          check: [function () { return fillR(1); }, function () { return fillR(2); }],
          coach: '<p>Practise with a pirate "arrr" for ar, and a foghorn "orrr" for or.</p>',
          mistake: '<p>Spelling "car" as "cr". The vowel is still there: a, then r.</p>' }
      ]
    }],
    practice: [
      { id: 'short-vowels', name: 'Short vowels', code: 'B2.3', gen: vowelGap },
      { id: 'digraphs', name: 'Two letters, one sound', code: 'B2.3', gen: whichDigraph },
      { id: 'vowel-patterns', name: 'Long vowels', code: 'B2.3', gen: silentE }
    ],
    tasks: [
      { id: 'sound-cards', title: 'Letter-sound cards', code: 'B2.3', pic: W.icon('read'), say: 'Say the sound for each card.',
        run: ['Make cards: the consonants, a e i o u, sh ch th wh ck, ee ai ay oa, ar or.', 'Show one card at a time. The child says its sound (not the letter name).', 'Then say a sound and the child points to the card. Note any that are slow.'],
        rubric: ['Knows a few sounds.', 'Knows most single letters; unsure of pairs.', 'Knows letters and most pairs quickly.', 'Knows every card quickly, both ways.'] }
    ]
  });

  Q.shapes('phonics', {
    'short-vowels': [[1, 'same-vowel', sameVowel], [1, 'which-vowel', whichVowel], [2, 'pick', pickVowel]],
    digraphs: [[1, 'fill', fillDigraph], [2, 'pick', pickDigraph], [2, 'match', matchDigraph]],
    'vowel-patterns': [[1, 'add-e', addE], [1, 'team', teamIn], [1, 'fill-team', fillTeam], [2, 'ar-or', fillR]]
  });
})();
