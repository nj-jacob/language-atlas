/* Grade 1: sounds in words (phonemic awareness). A full chapter: every idea has two worked examples, three questions
   together and five on your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 1, B2.1: "use understanding of the sound structure of spoken words to orally isolate, blend,
   and segment phonemes, from simple structures with two phonemes to structures with more phonemes".
   This is about hearing sounds, so the grown-up says each word aloud, and sound buttons (Atlas.W.sound) play each sound. A sound is written between slashes:
   /s/ is the sound s makes. All word lists are written for this site. Answer checks: tests/verify/grade1-sounds.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* words and their sounds, from two sounds up to five */
  var WORDS = ('up:u-p at:a-t in:i-n on:o-n it:i-t am:a-m egg:e-g ' +
    'sun:s-u-n map:m-a-p cat:k-a-t dog:d-o-g pig:p-i-g bed:b-e-d cup:k-u-p hat:h-a-t jet:j-e-t mop:m-o-p net:n-e-t rug:r-u-g van:v-a-n ' +
    'web:w-e-b zip:z-i-p lid:l-i-d ten:t-e-n bus:b-u-s fan:f-a-n ship:sh-i-p chin:ch-i-n fish:f-i-sh duck:d-u-k ' +
    'moon:m-oo-n kite:k-igh-t leaf:l-ee-f goose:g-oo-s ' +
    'fox:f-o-k-s box:b-o-k-s frog:f-r-o-g stop:s-t-o-p milk:m-i-l-k hand:h-a-n-d jump:j-u-m-p lamp:l-a-m-p crab:k-r-a-b flag:f-l-a-g sled:s-l-e-d nest:n-e-s-t snack:s-n-a-k drum:d-r-u-m ' +
    'split:s-p-l-i-t stamp:s-t-a-m-p plant:p-l-a-n-t crust:k-r-u-s-t').split(' ').map(function (x) { var p = x.split(':'); return { w: p[0], p: p[1].split('-') }; });
  var THREE = WORDS.filter(function (x) { return x.p.length === 3; });
  var PICTURED = WORDS.filter(function (x) { return W.pics.indexOf(x.w) >= 0; });
  var ALL_SOUNDS = ['s', 'm', 't', 'p', 'n', 'k', 'd', 'g', 'b', 'f', 'h', 'l', 'r', 'sh', 'ch', 'a', 'e', 'i', 'o', 'u'];
  /* change one sound to make a new word: [word, sound out, sound in, new word] */
  var SWAP = [['cat', 'k', 'h', 'hat'], ['map', 'a', 'o', 'mop'], ['sun', 's', 'b', 'bun'], ['bed', 'b', 'r', 'red'], ['dog', 'd', 'l', 'log'], ['ten', 't', 'h', 'hen'],
    ['cup', 'k', 'p', 'pup'], ['fan', 'f', 'v', 'van'], ['lid', 'd', 'p', 'lip'], ['pig', 'g', 'n', 'pin'], ['hat', 'a', 'i', 'hit'], ['net', 'e', 'u', 'nut'],
    ['bus', 'u', 'o', 'boss'], ['jet', 'j', 'w', 'wet'], ['rug', 'r', 'h', 'hug'], ['van', 'v', 'p', 'pan'], ['ship', 'p', 'n', 'shin'], ['mop', 'm', 't', 'top'],
    ['zip', 'z', 'l', 'lip']];
  /* take one sound away: [word, sound out, what is left] */
  var DROP = [['stop', 's', 'top'], ['sled', 's', 'led'], ['flag', 'f', 'lag'], ['snap', 's', 'nap'], ['spot', 's', 'pot'], ['slip', 's', 'lip'],
    ['trip', 't', 'rip'], ['clap', 'k', 'lap'], ['spin', 's', 'pin'], ['grip', 'g', 'rip'], ['bland', 'b', 'land']];

  function snd(p) { return '/' + p + '/'; }
  /* the same, as a button that plays the recorded sound (never inside an answer choice) */
  function say(p) { return W.sound(p, snd(p)); }
  /* the word's picture when there is one (the grown-up says the word), otherwise the written word */
  function show(w) { return W.pics.indexOf(w) >= 0 ? W.pic(w) : W.tile(w); }
  function sounds(x) { return W.soundRow(x.p, x.p.map(snd)); }
  function word(w) { return WORDS.filter(function (x) { return x.w === w; })[0]; }
  function noRepeat(x) { return x.p.every(function (p, i) { return x.p.indexOf(p) === i; }); }
  function posOf(x, where) { return where === 'first' ? 0 : where === 'last' ? x.p.length - 1 : 1; }
  function listFor(where, lv) { return where === 'middle' ? THREE : WORDS.filter(function (x) { return lv > 1 || x.p.length <= 3; }); }
  /* tiles: the right sound, other sounds from the word, and a sound that is often mixed up with it */
  function soundTiles(x, right, n) {
    var near = { s: 'sh', sh: 's', ch: 'sh', k: 'g', d: 'b', b: 'd', p: 'b', f: 'v', a: 'e', e: 'i', i: 'e', o: 'u', u: 'o' };
    var wrong = x.p.filter(function (p) { return p !== right; }).concat(near[right] ? [near[right]] : [], R.shuffle(ALL_SOUNDS));
    wrong = wrong.filter(function (p, i) { return p !== right && wrong.indexOf(p) === i; }).slice(0, n - 1);
    return [snd(right), wrong.map(snd)];
  }

  /* ---------- first, last and middle sound ---------- */
  /* where: 'first', 'last' or 'middle' */
  function isolate(where, lv) {
    var x = R.pick(listFor(where, lv)), at = posOf(x, where), t = soundTiles(x, x.p[at], lv > 1 ? 4 : 3);
    return Q.tiles('What is the <b>' + where + '</b> sound in <b>' + x.w + '</b>?', t[0], t[1], { fig: show(x.w),
      prompt: where === 'first' ? 'Say the word slowly. What do you hear first?' : where === 'last' ? 'Stretch the word. What do you hear at the very end?' : 'Stretch the word. What do you hear between the first and last sound?',
      hint: 'Say it slowly, one sound at a time.', explain: sounds(x),
      steps: ['Say <b>' + x.w + '</b> slowly.', 'Its sounds: ' + x.p.map(say).join(' ') + '.', 'The ' + where + ' one is ' + say(x.p[at]) + '.'],
      meta: { k: 'g1-isolate', word: x.w, where: where } });
  }
  /* Which word starts (ends, has in the middle) the same sound as sun? */
  function same(where, lv) {
    var list = listFor(where, lv), at = function (w) { return w.p[posOf(w, where)]; };
    var x = R.pick(list.filter(function (w) { return list.some(function (y) { return y !== w && at(y) === at(w); }); }));
    var right = R.pick(list.filter(function (y) { return y !== x && at(y) === at(x); }));
    var wrong = R.some(list.filter(function (y) { return at(y) !== at(x); }), lv > 1 ? 3 : 2);
    var verb = where === 'first' ? 'starts with' : where === 'last' ? 'ends with' : 'has in the middle';
    return Q.one('Which word ' + verb + ' the same sound as <b>' + x.w + '</b>?', right.w, wrong.map(function (y) { return y.w; }), {
      prompt: 'Say the ' + where + ' sound of <b>' + x.w + '</b>. Then say it for each word.', hint: 'Listen to the ' + where + ' sound, not the letters.',
      explain: '<b>' + x.w + '</b> and <b>' + right.w + '</b>: ' + say(at(x)) + '.', meta: { k: 'g1-same-sound', word: x.w, where: where } });
  }
  /* Which picture starts (ends) with /s/? */
  function picFor(where, lv) {
    var at = function (w) { return w.p[posOf(w, where)]; }, x = R.pick(PICTURED), s = at(x);
    var wrong = R.some(PICTURED.filter(function (y) { return at(y) !== s; }), lv > 1 ? 3 : 2), all = R.shuffle([x].concat(wrong));
    return { q: 'Which one ' + (where === 'first' ? 'starts' : 'ends') + ' with ' + say(s) + '?', type: 'tap', tiles: all.map(function (y) { return W.pic(y.w); }), answer: all.indexOf(x), answerText: x.w,
      prompt: 'Say the name of each picture.', hint: 'Say each name slowly. Listen to the ' + where + ' sound.', explain: W.pic(x.w) + sounds(x), meta: { k: 'g1-pic-sound', sound: s, where: where } };
  }
  /* Which word does not start (end, have in the middle) the same? */
  function odd(where, lv) {
    var list = listFor(where, lv), at = function (w) { return w.p[posOf(w, where)]; };
    var s = R.pick(list.filter(function (w) { return list.filter(function (y) { return at(y) === at(w); }).length >= 3; })).p, key = s[posOf({ p: s }, where)];
    var alike = R.some(list.filter(function (y) { return at(y) === key; }), lv > 1 ? 3 : 2), out = R.pick(list.filter(function (y) { return at(y) !== key; }));
    return Q.tiles('Which word has a <b>different ' + where + ' sound</b>?', out.w, alike.map(function (y) { return y.w; }), {
      hint: 'Say the ' + where + ' sound of each word.', explain: '<b>' + out.w + '</b> has ' + say(at(out)) + '. The others have ' + say(key) + '.', meta: { k: 'g1-odd-sound', where: where } });
  }
  function soundTf(where) {
    var x = R.pick(listFor(where, 2)), right = R.int(0, 1) === 1, real = x.p[posOf(x, where)], s = right ? real : soundTiles(x, real, 2)[1][0].slice(1, -1);
    return { q: 'Is ' + say(s) + ' the <b>' + where + '</b> sound in <b>' + x.w + '</b>?', fig: show(x.w), type: 'tf', answer: right,
      why: { options: ['I hear it there.', 'I hear a different sound there.'], answer: right ? 0 : 1 },
      hint: 'Say the word slowly.', explain: sounds(x), meta: { k: 'g1-sound-tf', word: x.w, where: where, s: s } };
  }
  function first(lv) { return isolate('first', lv); }
  function last(lv) { return isolate('last', lv); }
  function middle(lv) { return isolate('middle', lv); }

  /* ---------- blend ---------- */
  function blendable(lv) { return WORDS.filter(function (w) { return lv > 1 ? w.p.length >= 3 : w.p.length <= 3; }); }
  /* /m/ /a/ /p/: what word? */
  function blend(lv) {
    var x = R.pick(blendable(lv));
    var wrong = WORDS.filter(function (y) { return y !== x && y.p.length === x.p.length && (y.p[0] === x.p[0] || y.p[y.p.length - 1] === x.p[x.p.length - 1] || y.p[1] === x.p[1]); });
    if (wrong.length < 2) wrong = wrong.concat(R.some(WORDS.filter(function (y) { return y !== x && y.p.length === x.p.length; }), 2));
    return Q.one('Blend the sounds. What word do they make?', x.w, R.some(wrong, lv > 2 ? 3 : 2).map(function (y) { return y.w; }), { fig: sounds(x),
      prompt: 'Say each sound, then say them faster and faster.', hint: 'Say the sounds quickly, with no gaps.', explain: sounds(x) + ' makes <b>' + x.w + '</b>.',
      steps: ['Say ' + x.p.map(say).join(' ') + '.', 'Now say them fast, with no gaps: <b>' + x.w + '</b>.'], meta: { k: 'g1-blend', word: x.w } });
  }
  function blendPic(lv) {
    var x = R.pick(PICTURED), wrong = R.some(PICTURED.filter(function (y) { return y !== x; }), lv > 1 ? 3 : 2), all = R.shuffle([x].concat(wrong));
    return { q: 'Blend the sounds. Tap the picture.', fig: sounds(x), type: 'tap', tiles: all.map(function (y) { return W.pic(y.w); }), answer: all.indexOf(x), answerText: x.w,
      prompt: 'Say the sounds faster and faster.', hint: 'Say them quickly, with no gaps.', explain: sounds(x) + ' makes <b>' + x.w + '</b>.', meta: { k: 'g1-blend-pic' } };
  }
  /* /s/ + un */
  function onset(lv) {
    var x = R.pick(WORDS.filter(function (w) { return w.p.length >= 3 && w.p[0].length === 1 && w.w.charAt(0) !== 'c' && (lv > 1 || w.p.length === 3); })), rest = x.w.slice(1);
    var near = WORDS.filter(function (y) { return y !== x && (y.w.slice(1) === rest || y.p[0] === x.p[0]); });
    var wrong = R.some(near.length >= 2 ? near : near.concat(R.some(WORDS.filter(function (y) { return y !== x && near.indexOf(y) < 0 && y.p.length === x.p.length; }), 2)), 2);
    return Q.one('Put them together. What word?', x.w, wrong.map(function (y) { return y.w; }), { fig: say(x.p[0]) + ' + ' + W.tile(rest),
      prompt: 'Say the sound, then the rest, with no gap.', hint: 'Say ' + snd(x.p[0]) + ', then <b>' + rest + '</b>, quickly.', explain: say(x.p[0]) + ' + <b>' + rest + '</b> = <b>' + x.w + '</b>.',
      meta: { k: 'g1-onset', s: x.p[0], rest: rest } });
  }
  function blendTf(lv) {
    var x = R.pick(blendable(lv)), right = R.int(0, 1) === 1, others = WORDS.filter(function (y) { return y !== x && y.p.length === x.p.length; }), said = right ? x.w : R.pick(others).w;
    return { q: Q.name() + ' blends these sounds and says <b>' + said + '</b>.', fig: sounds(x), type: 'tf', answer: right,
      why: { options: ['The sounds make that word.', 'The sounds make a different word.'], answer: right ? 0 : 1 },
      hint: 'Say the sounds fast.', explain: sounds(x) + ' makes <b>' + x.w + '</b>.', meta: { k: 'g1-blend-tf', said: said } };
  }

  /* ---------- count and split ---------- */
  /* How many sounds in fish? */
  function count(lv) {
    var x = R.pick(WORDS.filter(function (w) { return lv > 1 || w.p.length <= 4; })), n = x.p.length;
    return Q.one('How many <b>sounds</b> in <b>' + x.w + '</b>?', String(n), ['2', '3', '4', '5'].filter(function (k) { return +k !== n; }).slice(0, lv > 1 ? 3 : 2), { fig: show(x.w),
      prompt: 'Tap one finger for each sound you say.', hint: 'Count sounds, not letters. <b>sh</b> is one sound.', explain: sounds(x),
      steps: ['Say <b>' + x.w + '</b> slowly.', 'One finger for each sound: ' + x.p.map(say).join(' ') + '.', 'That is ' + n + ' sounds.'], meta: { k: 'g1-count', word: x.w } });
  }
  /* put the sounds of frog in order */
  function segment(lv) {
    var x = R.pick(WORDS.filter(function (w) { return noRepeat(w) && w.p.length >= (lv > 2 ? 4 : 3); }));
    return { q: 'Put the sounds of <b>' + x.w + '</b> in order.', type: 'order', items: x.p.map(snd), first: 'First', last: 'Last', fig: show(x.w),
      hint: 'Say the word slowly. Which sound comes first?', explain: sounds(x), meta: { k: 'g1-segment', word: x.w } };
  }
  /* Which word has 4 sounds? */
  function countWhich(lv) {
    var n = R.int(3, 4), right = R.pick(WORDS.filter(function (w) { return w.p.length === n; })), wrong = R.some(WORDS.filter(function (w) { return w.p.length !== n && w.p.length < 5; }), lv > 1 ? 3 : 2);
    return Q.one('Which word has <b>' + n + ' sounds</b>?', right.w, wrong.map(function (y) { return y.w; }), { prompt: 'Say each word slowly and count.',
      hint: 'One finger for each sound.', explain: '<b>' + right.w + '</b>: ' + sounds(right), meta: { k: 'g1-count-which', n: n } });
  }
  function countTf() {
    var x = R.pick(WORDS), right = R.int(0, 1) === 1, n = right ? x.p.length : (x.w.length !== x.p.length ? x.w.length : x.p.length + 1);
    return { q: Q.name() + ' says <b>' + x.w + '</b> has <b>' + n + '</b> sounds.', fig: show(x.w), type: 'tf', answer: right,
      why: { options: ['That is how many sounds I hear.', 'I hear a different number of sounds.'], answer: right ? 0 : 1 },
      hint: 'Count sounds, not letters.', explain: sounds(x), meta: { k: 'g1-count-tf', word: x.w, n: n } };
  }

  /* ---------- swap or take away a sound ---------- */
  /* Say cat. Change /k/ to /h/. */
  function change(lv) {
    var s = R.pick(SWAP), others = SWAP.filter(function (o) { return o !== s; });
    var wrong = others.filter(function (o) { return o[3].length === s[3].length && o[3] !== s[3]; }).map(function (o) { return o[3]; });
    return Q.one('Say <b>' + s[0] + '</b>. Change ' + snd(s[1]) + ' to ' + snd(s[2]) + '. What new word do you get?', s[3], R.some(wrong, lv > 1 ? 2 : 1).concat(lv > 2 ? [s[0]] : []), {
      fig: W.tile(s[0]), prompt: 'Take out ' + say(s[1]) + '. Put in ' + say(s[2]) + '. Say it.', hint: 'Keep the other sounds the same.',
      explain: '<b>' + s[0] + '</b> becomes <b>' + s[3] + '</b>.', meta: { k: 'g1-change', from: s[0], out: s[1], into: s[2] } });
  }
  /* Say stop without /s/. */
  function drop(lv) {
    var d = R.pick(DROP), left = DROP.map(function (o) { return o[2]; }).filter(function (w, i, all) { return w !== d[2] && all.indexOf(w) === i; }), wrong = R.some(left, lv > 1 ? 2 : 1);
    return Q.one('Say <b>' + d[0] + '</b> without ' + snd(d[1]) + '. What is left?', d[2], wrong, { fig: W.tile(d[0]), prompt: 'Say it. Leave off ' + say(d[1]) + '.',
      hint: 'Take away only the first sound.', explain: '<b>' + d[0] + '</b> without ' + say(d[1]) + ' is <b>' + d[2] + '</b>.', meta: { k: 'g1-drop', from: d[0], out: d[1] } });
  }
  /* cat to hat: which sound changed? */
  function whichChanged(lv) {
    var s = R.pick(SWAP), x = word(s[0]), wrong = (x ? x.p : []).filter(function (p) { return p !== s[1]; }).slice(0, lv > 1 ? 2 : 1);
    if (!wrong.length) wrong = [s[2]];
    return Q.tiles('<b>' + s[0] + '</b> became <b>' + s[3] + '</b>. Which sound was taken out?', snd(s[1]), wrong.map(snd), { fig: W.tile(s[0]) + ' &rarr; ' + W.tile(s[3]),
      hint: 'Say both words slowly. Which sound is different?', explain: say(s[1]) + ' became ' + say(s[2]) + '.', meta: { k: 'g1-which-changed', from: s[0], to: s[3] } });
  }
  function changeTf() {
    var s = R.pick(SWAP), right = R.int(0, 1) === 1, said = right ? s[3] : R.pick(SWAP.filter(function (o) { return o !== s && o[3] !== s[3]; }))[3];
    return { q: 'Say <b>' + s[0] + '</b>. Change ' + snd(s[1]) + ' to ' + snd(s[2]) + '. ' + Q.name() + ' says <b>' + said + '</b>.', type: 'tf', answer: right,
      why: { options: ['Only that one sound changed.', 'That is not what you get.'], answer: right ? 0 : 1 },
      hint: 'Keep the other sounds the same.', explain: '<b>' + s[0] + '</b> becomes <b>' + s[3] + '</b>.', meta: { k: 'g1-change-tf', from: s[0], out: s[1], into: s[2], said: said } };
  }

  Atlas.register('sounds', {
    full: true,
    lessons: [{
      id: 'hear', title: 'Hear each sound', sub: 'The first, last and middle sound in a word.',
      concepts: [
        { slug: 'first', title: 'The first sound', exp: ['B2.1'], skill: 'first',
          model: [
            step(W.pic('sun'), 'Say it slowly: sss-un.'),
            step(W.tile(W.hl('sun', 0, 1)), 'You hear ' + say('s') + ' first.'),
            step(W.pic('fish'), 'Another: fff-ish.'),
            step(W.tile(W.hl('fish', 0, 1)), say('f') + ' comes first.'),
            step(W.tile(W.hl('ship', 0, 2)), '<b>sh</b> is one sound: ' + say('sh') + '.')
          ],
          guided: [function () { return first(1); }, function () { return same('first', 1); }, function () { return picFor('first', 1); }],
          check: [function () { return first(1); }, function () { return same('first', 2); }, function () { return picFor('first', 2); }, function () { return odd('first', 2); }, function () { return first(2); }],
          coach: '<p>Say the word aloud for the child, stretching the first sound: "mmmap". Then ask, "What sound do you hear first?" Accept the sound, not the letter name.</p>',
          mistake: '<p>Saying the letter name ("em") instead of the sound (/m/). Say: "That is its name. What sound does it make in the word?"</p>' },
        { slug: 'last', title: 'The last sound', exp: ['B2.1'], skill: 'last',
          model: [
            step(W.pic('map'), 'Stretch it: ma-p.'),
            step(W.tile(W.hl('map', 2, 3)), 'You hear ' + say('p') + ' at the very end.'),
            step(W.pic('bus'), 'Again: bu-sss.'),
            step(W.tile(W.hl('bus', 2, 3)), 'It ends with ' + say('s') + '.'),
            step(W.tile(W.hl('duck', 2, 4)), '<b>ck</b> makes one sound: ' + say('k') + '.')
          ],
          guided: [function () { return last(1); }, function () { return same('last', 1); }, function () { return picFor('last', 1); }],
          check: [function () { return last(1); }, function () { return picFor('last', 2); }, function () { return same('last', 2); }, function () { return soundTf('last'); }, function () { return last(2); }],
          coach: '<p>Say the word slowly and hold the last sound a little longer. Play "What is at the end?" with things in the room.</p>',
          mistake: '<p>Giving the first sound again. Point to the end of the word as you say the last sound.</p>' },
        { slug: 'middle', title: 'The middle sound', exp: ['B2.1'], skill: 'middle',
          model: [
            step(sounds(word('cat'))),
            step(W.tile(W.hl('cat', 1, 2)), 'Between ' + say('k') + ' and ' + say('t') + ': ' + say('a') + '.'),
            step(W.tile(W.hl('pig', 1, 2)), 'In <b>pig</b>: ' + say('i') + '.'),
            step(sounds(word('moon')), 'Now <b>moon</b>.'),
            step(W.tile(W.hl('moon', 1, 3)), 'Two letters, one sound: ' + say('oo') + '.')
          ],
          key: '<p>The middle sound is often a vowel: a, e, i, o or u.</p>',
          guided: [function () { return middle(1); }, function () { return same('middle', 1); }, function () { return soundTf('middle'); }],
          check: [function () { return middle(1); }, function () { return same('middle', 2); }, function () { return odd('middle', 2); }, function () { return soundTf('middle'); }, function () { return middle(2); }],
          coach: '<p>Use three coins or blocks in a row. Touch each one as you say a sound. Touch the middle one and ask for its sound.</p>',
          mistake: '<p>Mixing up /e/ and /i/ (bed and bid). Say both slowly and notice how the mouth moves: /e/ is more open.</p>' }
      ]
    }, {
      id: 'blend-split', title: 'Blend and split', sub: 'Put sounds together, take them apart, and swap one.',
      concepts: [
        { slug: 'blend', title: 'Blend sounds into a word', exp: ['B2.1'], skill: 'blend',
          model: [
            step(sounds(word('map'))),
            step(W.tile('m-a-p'), 'Say them faster.'),
            step(W.pic('map'), 'No gaps: <b>map</b>.'),
            step(sounds(word('nest')), 'Four sounds.'),
            step(W.tile('n-e-s-t'), 'Faster...'),
            step(W.pic('nest'), '<b>nest</b>.')
          ],
          guided: [function () { return blend(1); }, function () { return blendPic(1); }, function () { return onset(1); }],
          check: [function () { return blend(1); }, function () { return blendPic(2); }, function () { return blendTf(2); }, function () { return onset(2); }, function () { return blend(2); }],
          coach: '<p>Say the sounds with a short gap, then shorter, then none. Robot talk is fun: "/d/ /o/ /g/". The child answers in normal talk.</p>',
          mistake: '<p>Adding "uh" after a sound ("buh-a-tuh"). Keep stop sounds short and clipped: /b/, not "buh".</p>' },
        { slug: 'count', title: 'Count the sounds', exp: ['B2.1'], skill: 'count',
          model: [
            step(W.pic('fish'), 'One finger for each sound.'),
            step(sounds(word('fish')), 'Three sounds.'),
            step(W.tile('fish'), 'Four letters, but only three sounds.'),
            step(W.pic('fox'), 'Now <b>fox</b>.'),
            step(sounds(word('fox')), 'Four sounds: <b>x</b> says two of them.')
          ],
          guided: [function () { return count(1); }, function () { return segment(1); }, function () { return countWhich(1); }],
          check: [function () { return count(1); }, function () { return segment(2); }, countTf, function () { return countWhich(2); }, function () { return count(2); }],
          coach: '<p>Draw boxes, one per sound. The child slides a coin into a box for each sound as they say it. Words like "fish" and "duck" show that letters and sounds are not the same count.</p>',
          mistake: '<p>Counting letters instead of sounds. Ask the child to say the sounds out loud, not read the letters.</p>' },
        { slug: 'change', title: 'Swap one sound', exp: ['B2.1'], skill: 'change',
          model: [
            step(W.pic('cat'), 'Take away ' + say('k') + '.'),
            step(W.pic('hat') + W.tile(W.hl('hat', 0, 1)), 'Put in ' + say('h') + ': <b>hat</b>.'),
            step(W.tile('hat') + W.tile('hit'), 'Change the middle: ' + say('a') + ' to ' + say('i') + '.'),
            step(W.tile(W.hl('stop', 0, 1)), 'Or take one away: ' + say('s') + '.'),
            step(W.tile('top'), 'What is left: <b>top</b>.')
          ],
          guided: [function () { return change(1); }, function () { return drop(1); }, function () { return whichChanged(1); }],
          check: [function () { return change(2); }, function () { return drop(2); }, changeTf, function () { return whichChanged(2); }, function () { return change(3); }],
          coach: '<p>Make it a game in the car: "Say sun. Now change /s/ to /r/." Keep it out loud; no reading needed.</p>',
          mistake: '<p>Changing more than one sound. Say the new word slowly and check that only one sound is new.</p>' }
      ]
    }],
    practice: [
      { id: 'first', name: 'The first sound', code: 'B2.1', gen: first },
      { id: 'last', name: 'The last sound', code: 'B2.1', gen: last },
      { id: 'middle', name: 'The middle sound', code: 'B2.1', gen: middle },
      { id: 'blend', name: 'Blend sounds into a word', code: 'B2.1', gen: blend },
      { id: 'count', name: 'Count the sounds', code: 'B2.1', gen: count },
      { id: 'change', name: 'Swap one sound', code: 'B2.1', gen: change }
    ],
    tasks: [
      { id: 'i-spy', title: 'I spy a sound', code: 'B2.1', pic: W.icon('listen'), say: 'Play I spy with sounds. "I spy something that starts with /m/."',
        run: ['Take turns: "I spy something that starts with /b/." Use the sound, not the letter name.', 'Then try the last sound: "I spy something that ends with /t/."', 'Play for five minutes. Note which sounds are easy and which are hard.'],
        rubric: ['Cannot find the first sound yet, even with help.', 'Finds some first sounds with help.', 'Finds first and last sounds alone.', 'Finds first, last and middle sounds, and makes up their own turns.'] },
      { id: 'robot', title: 'Robot talk', code: 'B2.1', pic: W.icon('talk'), say: 'Talk like a robot. Then say the word.',
        run: ['Say a word in robot talk, one sound at a time: "/f/ /r/ /o/ /g/". The child says the word.', 'Swap: you say a word, the child says it in robot talk, tapping one finger per sound.', 'Start with 2 and 3 sounds; go up to 4 and 5 (stamp, split) when it is easy.'],
        rubric: ['Cannot blend or split two-sound words yet.', 'Blends and splits 3-sound words with help.', 'Blends and splits 3- and 4-sound words alone.', 'Blends and splits words of up to 5 sounds quickly.'] }
    ]
  });

  Q.shapes('sounds', {
    first: [[1, 'same', function (lv) { return same('first', lv); }], [1, 'picture', function (lv) { return picFor('first', lv); }], [2, 'odd', function (lv) { return odd('first', lv); }], [1, 'tf', function () { return soundTf('first'); }]],
    last: [[1, 'same', function (lv) { return same('last', lv); }], [1, 'picture', function (lv) { return picFor('last', lv); }], [2, 'odd', function (lv) { return odd('last', lv); }], [1, 'tf', function () { return soundTf('last'); }]],
    middle: [[1, 'same', function (lv) { return same('middle', lv); }], [2, 'odd', function (lv) { return odd('middle', lv); }], [1, 'tf', function () { return soundTf('middle'); }]],
    blend: [[1, 'picture', blendPic], [1, 'onset', onset], [2, 'tf', blendTf]],
    count: [[1, 'segment', segment], [1, 'which', countWhich], [2, 'tf', countTf]],
    change: [[1, 'drop', drop], [1, 'which', whichChanged], [2, 'tf', changeTf]]
  });
})();
