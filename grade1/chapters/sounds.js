/* Grade 1: sounds in words (phonemic awareness).
   Ontario 2023 Language, Grade 1, B2.1: "use understanding of the sound structure of spoken words to orally isolate, blend,
   and segment phonemes, from simple structures with two phonemes to structures with more phonemes".
   This is about hearing sounds, so the grown-up says each word and each sound aloud. A sound is written between slashes:
   /s/ is the sound s makes. All word lists are written for this site. Answer checks: tests/verify/grade1-sounds.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* words and their sounds, from two sounds up to five */
  var WORDS = ('up:u-p at:a-t in:i-n on:o-n it:i-t am:a-m ' +
    'sun:s-u-n map:m-a-p cat:k-a-t dog:d-o-g pig:p-i-g bed:b-e-d cup:k-u-p hat:h-a-t jet:j-e-t mop:m-o-p net:n-e-t rug:r-u-g van:v-a-n ' +
    'web:w-e-b zip:z-i-p lid:l-i-d ten:t-e-n bus:b-u-s fan:f-a-n ship:sh-i-p chin:ch-i-n fish:f-i-sh duck:d-u-k ' +
    'frog:f-r-o-g stop:s-t-o-p milk:m-i-l-k hand:h-a-n-d jump:j-u-m-p lamp:l-a-m-p crab:k-r-a-b flag:f-l-a-g sled:s-l-e-d nest:n-e-s-t snack:s-n-a-k drum:d-r-u-m ' +
    'split:s-p-l-i-t stamp:s-t-a-m-p plant:p-l-a-n-t crust:k-r-u-s-t').split(' ').map(function (x) { var p = x.split(':'); return { w: p[0], p: p[1].split('-') }; });
  var THREE = WORDS.filter(function (x) { return x.p.length === 3; });
  var ALL_SOUNDS = ['s', 'm', 't', 'p', 'n', 'k', 'd', 'g', 'b', 'f', 'h', 'l', 'r', 'sh', 'ch', 'a', 'e', 'i', 'o', 'u'];
  /* change one sound to make a new word: [word, sound out, sound in, new word] */
  var SWAP = [['cat', 'k', 'h', 'hat'], ['map', 'a', 'o', 'mop'], ['sun', 's', 'b', 'bun'], ['bed', 'b', 'r', 'red'], ['dog', 'd', 'l', 'log'], ['ten', 't', 'h', 'hen'],
    ['cup', 'k', 'p', 'pup'], ['fan', 'f', 'v', 'van'], ['lid', 'd', 'p', 'lip'], ['pig', 'g', 'n', 'pin'], ['hat', 'a', 'i', 'hit'], ['net', 'e', 'u', 'nut']];

  function snd(p) { return '/' + p + '/'; }
  /* the word's picture when there is one (the grown-up says the word), otherwise the written word */
  function show(w) { return W.pics.indexOf(w) >= 0 ? W.pic(w) : W.tile(w); }
  function sounds(x) { return '<span class="wsyl">' + x.p.map(function (p) { return W.tile(snd(p), 'syl'); }).join('') + '</span>'; }
  function noRepeat(x) { return x.p.every(function (p, i) { return x.p.indexOf(p) === i; }); }
  /* tiles: the right sound, other sounds from the word, and a sound that is often mixed up with it */
  function soundTiles(x, right, n) {
    var near = { s: 'sh', sh: 's', ch: 'sh', k: 'g', d: 'b', b: 'd', p: 'b', f: 'v', a: 'e', e: 'i', i: 'e', o: 'u', u: 'o' };
    var wrong = x.p.filter(function (p) { return p !== right; }).concat(near[right] ? [near[right]] : [], R.shuffle(ALL_SOUNDS));
    wrong = wrong.filter(function (p, i) { return p !== right && wrong.indexOf(p) === i; }).slice(0, n - 1);
    return [snd(right), wrong.map(snd)];
  }

  /* ---------- question makers ---------- */
  /* where: 'first', 'last' or 'middle' */
  function isolate(where, lv) {
    var list = where === 'middle' ? THREE : WORDS.filter(function (x) { return lv > 1 || x.p.length <= 3; }), x = R.pick(list);
    var at = where === 'first' ? 0 : where === 'last' ? x.p.length - 1 : 1, t = soundTiles(x, x.p[at], lv > 1 ? 4 : 3);
    return Q.tiles('What is the <b>' + where + '</b> sound in <b>' + x.w + '</b>?', t[0], t[1], { fig: show(x.w),
      prompt: where === 'first' ? 'Say the word slowly. What do you hear first?' : where === 'last' ? 'Stretch the word. What do you hear at the very end?' : 'Stretch the word. What do you hear between the first and last sound?',
      hint: 'Say it slowly, one sound at a time.', explain: sounds(x),
      steps: ['Say <b>' + x.w + '</b> slowly.', 'Its sounds: ' + x.p.map(snd).join(' ') + '.', 'The ' + where + ' one is ' + snd(x.p[at]) + '.'],
      meta: { k: 'g1-isolate', word: x.w, where: where } });
  }
  function first(lv) { return isolate('first', lv); }
  function last(lv) { return isolate('last', lv); }
  function middle(lv) { return isolate('middle', lv); }
  /* Which word starts with the same sound as sun? */
  function sameFirst(lv) {
    var x = R.pick(WORDS.filter(function (w) { return WORDS.some(function (y) { return y !== w && y.p[0] === w.p[0]; }); }));
    var right = R.pick(WORDS.filter(function (y) { return y !== x && y.p[0] === x.p[0]; }));
    var wrong = R.some(WORDS.filter(function (y) { return y.p[0] !== x.p[0]; }), lv > 1 ? 3 : 2);
    return Q.one('Which word starts with the same sound as <b>' + x.w + '</b>?', right.w, wrong.map(function (y) { return y.w; }), {
      prompt: 'Say the first sound of <b>' + x.w + '</b>. Then say the first sound of each word.', hint: 'Listen to the very first sound, not the letter.',
      explain: '<b>' + x.w + '</b> and <b>' + right.w + '</b> both start with ' + snd(x.p[0]) + '.', meta: { k: 'g1-same-first', word: x.w } });
  }

  /* /m/ /a/ /p/: what word? */
  function blend(lv) {
    var x = R.pick(WORDS.filter(function (w) { return lv > 1 ? w.p.length >= 3 : w.p.length <= 3; }));
    var wrong = WORDS.filter(function (y) { return y !== x && y.p.length === x.p.length && (y.p[0] === x.p[0] || y.p[y.p.length - 1] === x.p[x.p.length - 1] || y.p[1] === x.p[1]); });
    if (wrong.length < 2) wrong = wrong.concat(R.some(WORDS.filter(function (y) { return y !== x && y.p.length === x.p.length; }), 2));
    return Q.one('Blend the sounds. What word do they make?', x.w, R.some(wrong, lv > 2 ? 3 : 2).map(function (y) { return y.w; }), { fig: sounds(x),
      prompt: 'Say each sound, then say them faster and faster.', hint: 'Say the sounds quickly, with no gaps.', explain: x.p.map(snd).join(' ') + ' makes <b>' + x.w + '</b>.',
      steps: ['Say ' + x.p.map(snd).join(', ') + '.', 'Now say them fast, with no gaps: <b>' + x.w + '</b>.'], meta: { k: 'g1-blend', word: x.w } });
  }
  /* How many sounds in fish? */
  function count(lv) {
    var x = R.pick(WORDS.filter(function (w) { return lv > 1 || w.p.length <= 4; })), n = x.p.length;
    return Q.one('How many <b>sounds</b> in <b>' + x.w + '</b>?', String(n), ['2', '3', '4', '5'].filter(function (k) { return +k !== n; }).slice(0, lv > 1 ? 3 : 2), { fig: show(x.w),
      prompt: 'Tap one finger for each sound you say.', hint: 'Count sounds, not letters. <b>sh</b> is one sound.', explain: sounds(x),
      steps: ['Say <b>' + x.w + '</b> slowly.', 'One finger for each sound: ' + x.p.map(snd).join(' ') + '.', 'That is ' + n + ' sounds.'], meta: { k: 'g1-count', word: x.w } });
  }
  /* put the sounds of frog in order */
  function segment(lv) {
    var x = R.pick(WORDS.filter(function (w) { return noRepeat(w) && w.p.length >= (lv > 2 ? 4 : 3); }));
    return { q: 'Put the sounds of <b>' + x.w + '</b> in order.', type: 'order', items: x.p.map(snd), first: 'First', last: 'Last', fig: W.tile(x.w),
      hint: 'Say the word slowly. Which sound comes first?', explain: sounds(x), meta: { k: 'g1-segment', word: x.w } };
  }
  /* Say cat. Change /k/ to /h/. */
  function change(lv) {
    var s = R.pick(SWAP), others = SWAP.filter(function (o) { return o !== s; });
    var wrong = [s[0]].concat(others.filter(function (o) { return o[3].length === s[3].length && o[3] !== s[3]; }).map(function (o) { return o[3]; }));
    return Q.one('Say <b>' + s[0] + '</b>. Change ' + snd(s[1]) + ' to ' + snd(s[2]) + '. What new word do you get?', s[3], R.some(wrong.slice(1), lv > 1 ? 2 : 1).concat(lv > 2 ? [s[0]] : []), {
      fig: W.tile(s[0]), prompt: 'Take out ' + snd(s[1]) + '. Put in ' + snd(s[2]) + '. Say it.', hint: 'Keep the other sounds the same.',
      explain: '<b>' + s[0] + '</b> becomes <b>' + s[3] + '</b>.', meta: { k: 'g1-change', from: s[0], out: s[1], into: s[2] } });
  }

  var x0 = function (w) { return WORDS.filter(function (x) { return x.w === w; })[0]; };
  Atlas.register('sounds', {
    lessons: [{
      id: 'hear', title: 'Hear each sound', sub: 'The first, last and middle sound in a word.',
      concepts: [
        { slug: 'first', title: 'The first sound', exp: ['B2.1'], skill: 'hear',
          model: [
            step(W.pic('sun'), 'Say it slowly: sss-un.'),
            step(W.tile(W.hl('sun', 0, 1)), 'You hear /s/ first.'),
            step(W.tile(W.hl('ship', 0, 2)), '<b>sh</b> is one sound: /sh/.')
          ],
          guided: [function () { return first(1); }, function () { return first(1); }],
          check: [function () { return first(1); }, function () { return sameFirst(1); }],
          coach: '<p>Say the word aloud for the child, stretching the first sound: "mmmap". Then ask, "What sound do you hear first?" Accept the sound, not the letter name.</p>',
          mistake: '<p>Saying the letter name ("em") instead of the sound (/m/). Say: "That is its name. What sound does it make in the word?"</p>' },
        { slug: 'last', title: 'The last sound', exp: ['B2.1'], skill: 'hear',
          model: [
            step(W.pic('map'), 'Stretch it: ma-p.'),
            step(W.tile(W.hl('map', 2, 3)), 'You hear /p/ at the very end.'),
            step(W.tile(W.hl('duck', 2, 4)), '<b>ck</b> makes one sound: /k/.')
          ],
          guided: [function () { return last(1); }, function () { return last(1); }],
          check: [function () { return last(1); }, function () { return last(2); }],
          coach: '<p>Say the word slowly and hold the last sound a little longer. Play "What is at the end?" with things in the room.</p>',
          mistake: '<p>Giving the first sound again. Point to the end of the word as you say the last sound.</p>' },
        { slug: 'middle', title: 'The middle sound', exp: ['B2.1'], skill: 'hear',
          model: [
            step(sounds(x0('cat'))),
            step(W.tile(W.hl('cat', 1, 2)), 'Between /k/ and /t/: /a/.'),
            step(W.tile(W.hl('pig', 1, 2)), 'In <b>pig</b>: /i/.')
          ],
          key: '<p>The middle sound is often a vowel: a, e, i, o or u.</p>',
          guided: [function () { return middle(1); }, function () { return middle(1); }],
          check: [function () { return middle(1); }, function () { return middle(2); }],
          coach: '<p>Use three coins or blocks in a row. Touch each one as you say a sound. Touch the middle one and ask for its sound.</p>',
          mistake: '<p>Mixing up /e/ and /i/ (bed and bid). Say both slowly and notice how the mouth moves: /e/ is more open.</p>' }
      ]
    }, {
      id: 'blend-split', title: 'Blend and split', sub: 'Put sounds together, take them apart, and swap one.',
      concepts: [
        { slug: 'blend', title: 'Blend sounds into a word', exp: ['B2.1'], skill: 'blend',
          model: [
            step(sounds(x0('map'))),
            step(W.tile('m-a-p'), 'Say them faster.'),
            step(W.tile('map'), 'No gaps: <b>map</b>.')
          ],
          guided: [function () { return blend(1); }, function () { return blend(1); }],
          check: [function () { return blend(1); }, function () { return blend(2); }],
          coach: '<p>Say the sounds with a short gap, then shorter, then none. Robot talk is fun: "/d/ /o/ /g/". The child answers in normal talk.</p>',
          mistake: '<p>Adding "uh" after a sound ("buh-a-tuh"). Keep stop sounds short and clipped: /b/, not "buh".</p>' },
        { slug: 'count', title: 'Count the sounds', exp: ['B2.1'], skill: 'blend',
          model: [
            step(W.pic('fish'), 'One finger for each sound.'),
            step(sounds(x0('fish')), 'Three sounds.'),
            step(W.tile('fish'), 'Four letters, but only three sounds.')
          ],
          guided: [function () { return count(1); }, function () { return segment(1); }],
          check: [function () { return count(1); }, function () { return segment(2); }],
          coach: '<p>Draw boxes, one per sound. The child slides a coin into a box for each sound as they say it. Words like "fish" and "duck" show that letters and sounds are not the same count.</p>',
          mistake: '<p>Counting letters instead of sounds. Ask the child to say the sounds out loud, not read the letters.</p>' },
        { slug: 'change', title: 'Swap one sound', exp: ['B2.1'], skill: 'blend',
          model: [
            step(W.pic('cat'), 'Take away /k/.'),
            step(W.pic('hat') + W.tile(W.hl('hat', 0, 1)), 'Put in /h/: <b>hat</b>.'),
            step(W.tile('hat') + W.tile('hit'), 'Change the middle: /a/ to /i/.')
          ],
          guided: [function () { return change(1); }, function () { return change(1); }],
          check: [function () { return change(2); }, function () { return change(2); }],
          coach: '<p>Make it a game in the car: "Say sun. Now change /s/ to /r/." Keep it out loud; no reading needed.</p>',
          mistake: '<p>Changing more than one sound. Say the new word slowly and check that only one sound is new.</p>' }
      ]
    }],
    practice: [
      { id: 'hear', name: 'Hear each sound', code: 'B2.1', gen: first },
      { id: 'blend', name: 'Blend and split sounds', code: 'B2.1', gen: blend }
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
    hear: [[1, 'last', last], [1, 'same-first', sameFirst], [2, 'middle', middle]],
    blend: [[1, 'count', count], [2, 'segment', segment], [2, 'change', change]]
  });
})();
