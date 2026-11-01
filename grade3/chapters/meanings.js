/* Grade 3: word meanings. A full chapter: every idea has two worked examples, three questions together and five on your
   own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 3, B2.4 Vocabulary: "demonstrate an understanding of a variety of words, acquire and use
   explicitly taught vocabulary in various contexts, including other subject areas, and use morphological knowledge to analyze
   and understand new words in context". Here: words that mean the same (synonyms) and the opposite (antonyms), clues in the
   sentence, and words from science, math and social studies.
   All words and sentences are written for this site. Answer checks: tests/verify/grade3-meanings.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* words that mean the same: each group shares one meaning */
  var SAME = [['big', 'large', 'huge'], ['small', 'tiny', 'little'], ['happy', 'glad', 'cheerful'], ['fast', 'quick', 'speedy'], ['begin', 'start'], ['smart', 'clever', 'wise'],
    ['cold', 'chilly', 'frosty'], ['shout', 'yell', 'holler'], ['scared', 'afraid', 'frightened'], ['leap', 'jump'], ['rock', 'stone'], ['gift', 'present'], ['tired', 'sleepy', 'weary'],
    ['angry', 'mad', 'cross'], ['sad', 'unhappy', 'gloomy'], ['easy', 'simple'], ['pretty', 'lovely', 'beautiful'], ['shut', 'close'], ['quiet', 'silent'], ['rich', 'wealthy'],
    ['end', 'finish'], ['grab', 'snatch'], ['street', 'road'], ['kind', 'nice', 'gentle']];
  /* opposites: each word is in one pair only */
  var OPP = [['hot', 'cold'], ['full', 'empty'], ['early', 'late'], ['wet', 'dry'], ['loud', 'quiet'], ['light', 'heavy'], ['push', 'pull'], ['win', 'lose'], ['first', 'last'],
    ['top', 'bottom'], ['float', 'sink'], ['asleep', 'awake'], ['strong', 'weak'], ['rough', 'smooth'], ['old', 'young'], ['sharp', 'dull'], ['tall', 'short'], ['above', 'below'],
    ['arrive', 'leave'], ['buy', 'sell'], ['laugh', 'cry'], ['remember', 'forget'], ['inside', 'outside'], ['thick', 'thin'], ['shallow', 'deep'], ['never', 'always']];
  /* [new word, what it means, two wrong meanings, the sentence, the clue in the sentence] */
  var CLUE = [
    ['drowsy', 'sleepy', 'angry', 'hungry', 'The puppy was so drowsy that it fell asleep in my lap.', 'fell asleep'],
    ['famished', 'starving', 'freezing', 'cheerful', 'Mei was famished after skating, so she ate two bowls of soup.', 'ate two bowls'],
    ['narrow', 'thin', 'long', 'muddy', 'The trail was narrow, so we walked one at a time.', 'one at a time'],
    ['furious', 'angry', 'sleepy', 'proud', 'Grandpa was furious when the raccoons tipped the bin over again.', 'tipped the bin over again'],
    ['calm', 'still', 'wavy', 'deep', 'The lake was so calm that it looked like glass.', 'looked like glass'],
    ['gather', 'collect', 'paint', 'hide', 'We had to gather sticks from all over the yard to build a fire.', 'from all over the yard'],
    ['timid', 'shy', 'loud', 'tall', 'Arjun was timid on the first day, so he stayed close to his dad.', 'stayed close to his dad'],
    ['scalding', 'boiling', 'salty', 'frozen', 'The soup was scalding, so Tala waited for it to cool.', 'waited for it to cool'],
    ['sturdy', 'strong', 'tiny', 'broken', 'The canoe was sturdy, so it did not tip in the waves.', 'did not tip'],
    ['brief', 'short', 'noisy', 'funny', 'Hana gave a brief talk that took only one minute.', 'only one minute'],
    ['anxious', 'worried', 'bored', 'sleepy', 'Zara felt anxious before the test, and her hands shook a little.', 'hands shook'],
    ['soggy', 'wet', 'crunchy', 'warm', 'Owen left his cereal too long, and it went soggy in the milk.', 'in the milk'],
    ['enormous', 'huge', 'tiny', 'soft', 'The moose was enormous, taller than our car.', 'taller than our car'],
    ['damp', 'a little wet', 'dusty', 'sunny', 'The grass was damp from the morning dew.', 'morning dew'],
    ['exhausted', 'very tired', 'excited', 'lost', 'After the long hike, Kai was exhausted and lay down right away.', 'lay down right away'],
    ['delighted', 'very happy', 'bored', 'grumpy', 'Priya was delighted when her cousin came to visit, and she hugged him tight.', 'hugged him tight'],
    ['fragile', 'easy to break', 'heavy', 'sticky', 'The egg is fragile, so carry it with care.', 'carry it with care'],
    ['peered', 'looked closely', 'shouted', 'jumped', 'Theo peered through the ice to see the fish below.', 'to see the fish below'],
    ['vanished', 'disappeared', 'grew', 'sang', 'The rabbit vanished into its hole, and we could not see it anymore.', 'could not see it anymore'],
    ['frigid', 'very cold', 'very hot', 'very loud', 'It was so frigid outside that our breath turned to ice.', 'breath turned to ice'],
    ['clumsy', 'bumping into things', 'very quiet', 'very neat', 'The clumsy puppy tripped over its own paws.', 'tripped over its own paws'],
    ['hollow', 'empty inside', 'full of water', 'very tall', 'The log was hollow, so a fox could hide inside it.', 'hide inside it'],
    ['soar', 'fly high', 'swim deep', 'walk slowly', 'The eagles soar high above the trees.', 'high above the trees'],
    ['grumpy', 'in a bad mood', 'very sleepy', 'very kind', 'Amara was grumpy and frowned at everyone all morning.', 'frowned at everyone'],
    ['spotless', 'very clean', 'very dirty', 'very old', 'The kitchen was spotless after we scrubbed it.', 'after we scrubbed it'],
    ['stroll', 'slow walk', 'fast race', 'long swim', 'We went for a stroll by the river, walking slowly and chatting.', 'walking slowly'],
    ['ancient', 'very old', 'very new', 'very small', 'The ancient pine has stood here for five hundred years.', 'five hundred years'],
    ['plummeted', 'fell fast', 'rose up', 'stood still', 'The kite plummeted to the ground when the wind stopped.', 'when the wind stopped'],
    ['nibble', 'take small bites', 'gulp down', 'throw away', 'The mouse began to nibble the cheese, one tiny bite at a time.', 'one tiny bite at a time'],
    ['dim', 'not bright', 'very loud', 'very wet', 'The room was dim, so we turned on a lamp.', 'turned on a lamp'],
    ['soaked', 'very wet', 'very dry', 'very warm', 'Liam was soaked after he fell into the creek.', 'fell into the creek'],
    ['swift', 'fast', 'slow', 'heavy', 'The swift fox ran past us in a flash.', 'in a flash'],
    ['cautious', 'careful', 'careless', 'noisy', 'Be cautious on the icy steps, or you might slip.', 'or you might slip'],
    ['glance', 'a quick look', 'a long nap', 'a loud shout', 'Chloe gave the clock one glance, just for a second, and ran out.', 'just for a second'],
    ['devour', 'eat quickly', 'cook slowly', 'share', 'The hungry kids devour the bannock in two minutes flat.', 'in two minutes flat'],
    ['shiver', 'shake from cold', 'laugh', 'sing', 'We began to shiver in the wind without our mittens.', 'without our mittens']
  ];
  /* words from other subjects: [word, subject, what it means, a sentence with a gap for it] */
  var SUBJ = [
    ['habitat', 'science', 'the place where a plant or animal lives', 'A pond is a ___ for frogs and turtles.'],
    ['predator', 'science', 'an animal that hunts other animals', 'The owl is a ___ that hunts mice at night.'],
    ['prey', 'science', 'an animal that is hunted for food', 'Mice are ___ for owls and foxes.'],
    ['recycle', 'science', 'to make used things into something new', 'We ___ old paper so it can become new paper.'],
    ['migrate', 'science', 'to move to another place when the season changes', 'Canada geese ___ south before winter.'],
    ['hibernate', 'science', 'to sleep through the winter', 'Black bears ___ in their dens until spring.'],
    ['liquid', 'science', 'something that flows, like water', 'Milk is a ___: you can pour it.'],
    ['solid', 'science', 'something that keeps its shape, like ice', 'A rock is a ___: it keeps its shape.'],
    ['magnet', 'science', 'a thing that pulls iron and steel', 'The ___ picked up all the paper clips.'],
    ['soil', 'science', 'the earth that plants grow in', 'Plant the seed in rich, dark ___.'],
    ['force', 'science', 'a push or a pull', 'A kick is a ___ that moves the ball.'],
    ['estimate', 'math', 'a careful guess', 'My ___ was 20 beans, and there were 22.'],
    ['measure', 'math', 'to find out how long or heavy something is', 'Use a ruler to ___ the pencil.'],
    ['total', 'math', 'the amount when you add it all up', 'Three apples and four apples make a ___ of seven.'],
    ['pattern', 'math', 'something that repeats in the same way', 'Red, blue, red, blue is a ___.'],
    ['equal', 'math', 'the same amount', 'We cut the bannock into two ___ parts.'],
    ['centimetre', 'math', 'a small unit for measuring length', 'The ant is about one ___ long.'],
    ['symmetry', 'math', 'when both halves match', 'A butterfly has ___: its two wings match.'],
    ['community', 'social studies', 'a group of people who live in the same place', 'Our ___ has a library, a park and a school.'],
    ['mayor', 'social studies', 'the leader of a town or city', 'The ___ came to open the new park.'],
    ['ancestor', 'social studies', 'someone in your family who lived long ago', 'This old photo shows my ___, who lived 100 years ago.'],
    ['tradition', 'social studies', 'something a group has done for a long time', 'Making maple taffy in the spring is a family ___.'],
    ['Elder', 'social studies', 'a respected older person who shares knowledge', 'The ___ shared a teaching about caring for the land.'],
    ['province', 'social studies', 'a part of Canada, like Ontario', 'Ontario is the ___ where we live.'],
    ['citizen', 'social studies', 'a person who belongs to a country', 'Hana became a Canadian ___ last year.'],
    ['treaty', 'social studies', 'an agreement between nations', 'The nations signed a ___ to share the land.'],
    ['compass', 'social studies', 'a tool that shows which way is north', 'Use a ___ to find which way is north.'],
    ['rhythm', 'music', 'a pattern of beats', 'Clap the ___ of the song with me.'],
    ['nutrient', 'health', 'something in food that helps your body grow', 'Milk has calcium, a ___ that builds strong bones.'],
    ['weather', 'science', 'what the air outside is like each day', 'The ___ today is windy and cold.']
  ];
  var PIC = { science: 'science', math: 'box', 'social studies': 'map', music: 'book', health: 'apple' };

  function groupOf(w) { return SAME.filter(function (g) { return g.indexOf(w) >= 0; })[0]; }
  function oppOf(w) { var p = OPP.filter(function (x) { return x.indexOf(w) >= 0; })[0]; return p && (p[0] === w ? p[1] : p[0]); }
  /* one word from each of n other synonym groups */
  function fromOther(g, n) { return R.some(SAME.filter(function (x) { return x !== g && !x.some(function (w) { return oppOf(w) && g.indexOf(oppOf(w)) >= 0; }); }), n).map(R.pick); }
  function bold(c) { return c[4].replace(c[0], '<b>' + c[0] + '</b>'); }
  function lit(c) { return c[4].replace(c[0], '<b>' + c[0] + '</b>').replace(c[5], '<mark class="hl">' + c[5] + '</mark>'); }
  function gapped(s) { return s.replace('___', W.gap()); }

  /* ---------- words that mean the same ---------- */
  function same(lv) {
    var g = R.pick(SAME), two = R.some(g, 2), w = two[0], wrong = fromOther(g, 2);
    if (lv > 1 && oppOf(w)) wrong[1] = oppOf(w); /* a harder choice: the opposite is offered too */
    return Q.tiles('Which word means the <b>same</b> as <b>' + w + '</b>?', two[1], wrong, {
      fig: W.tile(w), prompt: 'Swap it into a sentence. Does it still make sense?', hint: 'Which word could take its place?', explain: W.tile(w) + ' = ' + W.tile(two[1]),
      meta: { k: 'g3-same', word: w } });
  }
  function matchSame() {
    var ps = R.some(SAME, 3).map(function (g) { return R.some(g, 2); });
    return { q: 'Match the words that mean the <b>same</b>.', type: 'match', pairs: ps, hint: 'Try each pair in a sentence.', explain: 'Words that mean the same are called synonyms.', meta: { k: 'g3-match-same' } };
  }
  function oddOut(lv) {
    var g = R.pick(SAME.filter(function (x) { return lv > 1 ? x.length === 3 : true; })), odd = fromOther(g, 1)[0], keep = lv > 1 ? g : R.some(g, 2);
    return Q.tiles('Which word does <b>not</b> mean the same as the others?', odd, keep, { hint: 'Find the words that could swap. Which one is left?',
      explain: keep.map(function (w) { return W.tile(w); }).join(' = '), meta: { k: 'g3-odd-out' } });
  }
  function sameTf() {
    var g = R.pick(SAME), two = R.some(g, 2), right = R.int(0, 1) === 1, b = right ? two[1] : (oppOf(two[0]) || fromOther(g, 1)[0]);
    return { q: Q.name() + ' says these mean the <b>same</b>.', fig: '<span class="wsum">' + W.tile(two[0]) + W.tile(b) + '</span>', type: 'tf', answer: right,
      hint: 'Put one word in a sentence, then swap in the other.', explain: W.tile(two[0]) + ' = ' + W.tile(two[1]), meta: { k: 'g3-same-tf', a: two[0], b: b } };
  }

  /* ---------- words that mean the opposite ---------- */
  function opposite(lv) {
    var p = R.pick(OPP), w = p[R.int(0, 1)], ans = oppOf(w), wrong = R.some(OPP.filter(function (x) { return x !== p; }), lv > 1 ? 2 : 1).map(R.pick);
    var g = groupOf(w);
    if (g && lv > 1) wrong.push(R.pick(g.filter(function (x) { return x !== w; })));
    return Q.tiles('Which word means the <b>opposite</b> of <b>' + w + '</b>?', ans, wrong, {
      fig: W.tile(w), prompt: 'Opposite means as different as can be.', hint: 'What is the other end?', explain: W.tile(w) + ' &harr; ' + W.tile(ans), meta: { k: 'g3-opposite', word: w } });
  }
  function sameOrOpp() {
    var isSame = R.int(0, 1) === 1, p = isSame ? R.some(R.pick(SAME), 2) : R.pick(OPP);
    return { q: 'Do these words mean the <b>same</b> or the <b>opposite</b>?', fig: '<span class="wsum">' + W.tile(p[0]) + W.tile(p[1]) + '</span>', type: 'tap', tiles: ['Same', 'Opposite'], answer: isSame ? 0 : 1,
      hint: 'Put each word in a sentence.', explain: p[0] + ' and ' + p[1] + ' mean the ' + (isSame ? 'same' : 'opposite') + '.', meta: { k: 'g3-same-or-opp', a: p[0], b: p[1] } };
  }
  function matchOpp() {
    var ps = R.some(OPP, 3);
    return { q: 'Match each word to its <b>opposite</b>.', type: 'match', pairs: ps.map(function (p) { return R.int(0, 1) ? [p[0], p[1]] : [p[1], p[0]]; }), hint: 'Think of the other end.', explain: 'Words with opposite meanings are called antonyms.', meta: { k: 'g3-match-opp' } };
  }
  function oppTf() {
    var p = R.pick(OPP), w = p[R.int(0, 1)], right = R.int(0, 1) === 1, g = groupOf(w), said = right ? oppOf(w) : (g ? R.pick(g.filter(function (x) { return x !== w; })) : R.pick(R.pick(OPP.filter(function (x) { return x !== p; }))));
    return { q: Q.name() + ' says the opposite of <b>' + w + '</b> is <b>' + said + '</b>.', fig: '<span class="wsum">' + W.tile(w) + ' &harr; ' + W.tile(said) + '</span>', type: 'tf', answer: right,
      hint: 'Is it the other end, or just a different word?', explain: W.tile(w) + ' &harr; ' + W.tile(oppOf(w)), meta: { k: 'g3-opp-tf', word: w, said: said } };
  }

  /* ---------- clues in the sentence ---------- */
  function clueMeaning(lv) {
    var c = R.pick(CLUE);
    return Q.one('What does <b>' + c[0] + '</b> mean?', c[1], [c[2], c[3]].slice(0, lv > 1 ? 2 : 1), {
      fig: W.sent(bold(c)), prompt: lv > 1 ? 'Which words in the sentence give a clue?' : 'Find the clue: <b>' + c[5] + '</b>.', hint: 'Read the whole sentence. Which words give a clue?',
      explain: W.sent(lit(c)), steps: ['Read the whole sentence.', 'Find the clue: <b>' + c[5] + '</b>.', 'So <b>' + c[0] + '</b> means <b>' + c[1] + '</b>.'], meta: { k: 'g3-clue-meaning', word: c[0] } });
  }
  function clueFind() {
    var c = R.pick(CLUE), other = R.pick(CLUE.filter(function (x) { return x !== c; })), start = c[4].split(' ').slice(0, 2).join(' ');
    return Q.tiles('Which words are the <b>clue</b> to what <b>' + c[0] + '</b> means?', c[5], [start, other[5]].filter(function (x) { return c[5].indexOf(x) < 0 && x.indexOf(c[0]) < 0; }), {
      fig: W.sent(bold(c)), hint: 'Which words help you picture it?', explain: W.sent(lit(c)), meta: { k: 'g3-clue-find', word: c[0] } });
  }
  function clueSwap() {
    var c = R.pick(CLUE);
    return Q.tiles('Which could take the place of <b>' + c[0] + '</b>?', c[1], [c[2], c[3]], {
      fig: W.sent(bold(c)), hint: 'Read the sentence with each one. Which still makes sense?', explain: W.sent(lit(c)), meta: { k: 'g3-clue-swap', word: c[0] } });
  }
  function clueTf() {
    var c = R.pick(CLUE), right = R.int(0, 1) === 1, said = right ? c[1] : c[R.int(2, 3)], first = R.int(0, 1);
    var reasons = ['The clue is "' + c[5] + '".', 'The clue is "' + c[4].split(' ').slice(0, 2).join(' ') + '".'];
    return { q: Q.name() + ' says <b>' + c[0] + '</b> means <b>' + said + '</b>.', fig: W.sent(bold(c)), type: 'tf', answer: right,
      why: { options: first ? reasons : reasons.slice().reverse(), answer: first ? 0 : 1 },
      hint: 'Find the clue in the sentence.', explain: '<b>' + c[0] + '</b> means <b>' + c[1] + '</b>.', meta: { k: 'g3-clue-tf', word: c[0], said: said } };
  }

  /* ---------- words from other subjects ---------- */
  function subjPic(s) { return W.pic(PIC[s[1]]); }
  function subjMeaning(lv) {
    var s = R.pick(SUBJ), wrong = R.some(SUBJ.filter(function (x) { return x !== s; }), lv > 1 ? 2 : 1).map(function (x) { return x[2]; });
    return Q.one('What does <b>' + s[0] + '</b> mean?', s[2], wrong, { fig: lv > 1 ? W.tile(s[0]) : subjPic(s) + W.sent(s[3].replace('___', '<b>' + s[0] + '</b>')),
      hint: 'Think about where you met this word: in ' + s[1] + '.', explain: W.tile(s[0]) + ' ' + s[2], meta: { k: 'g3-subject-meaning', word: s[0] } });
  }
  function subjGap(lv) {
    var s = R.pick(lv > 1 ? SUBJ.filter(function (x) { return x[1] === 'science' || x[1] === 'math' || x[1] === 'social studies'; }) : SUBJ);
    var wrong = R.some(SUBJ.filter(function (x) { return x !== s && (lv < 2 || x[1] === s[1]); }), 2).map(function (x) { return x[0]; });
    return Q.tiles('Which word fills the gap?', s[0], wrong, { fig: W.sent(gapped(s[3])), hint: 'Try each word in the sentence.', explain: W.tile(s[0]) + ' ' + s[2],
      meta: { k: 'g3-subject-gap', word: s[0] } });
  }
  function subjMatch() {
    var ss = R.some(SUBJ, 3);
    return { q: 'Match each word to what it means.', type: 'match', pairs: ss.map(function (s) { return [s[0], s[2]]; }), hint: 'Start with the word you know best.',
      explain: 'You meet these words in science, math and social studies.', meta: { k: 'g3-subject-match' } };
  }
  function subjTf() {
    var s = R.pick(SUBJ), right = R.int(0, 1) === 1, said = right ? s[2] : R.pick(SUBJ.filter(function (x) { return x !== s; }))[2];
    return { q: Q.name() + ' says <b>' + s[0] + '</b> means <b>' + said + '</b>.', fig: subjPic(s), type: 'tf', answer: right, hint: 'Put the word in a sentence. Does the meaning fit?',
      explain: W.tile(s[0]) + ' ' + s[2], meta: { k: 'g3-subject-tf', word: s[0], said: said } };
  }

  Atlas.register('meanings', {
    full: true,
    lessons: [{
      id: 'same-opposite', title: 'Same and opposite', sub: 'Words that mean the same, and words that mean the opposite.',
      concepts: [
        { slug: 'same', title: 'Words that mean the same', exp: ['B2.4'], skill: 'same',
          model: [
            step(W.tile('big') + ' = ' + W.tile('large'), 'These are <b>synonyms</b>.'),
            step(W.sent('The bear is <b>large</b>.'), 'Swap it in. It still makes sense.'),
            step(W.tile('small') + ' = ' + W.tile('tiny'), 'Another pair.'),
            step(W.sent('A <b>tiny</b> bug sat on my hand.'), 'tiny for small: it still works.')
          ],
          guided: [function () { return same(1); }, matchSame, function () { return oddOut(1); }],
          check: [function () { return same(2); }, sameTf, function () { return oddOut(2); }, matchSame, function () { return same(3); }],
          coach: '<p>Play "say it another way": you say a word, the child gives a word that means the same.</p>',
          mistake: '<p>Picking a word that goes with it (big and bear) rather than one that means the same. Test it in a sentence.</p>' },
        { slug: 'opposite', title: 'Words that mean the opposite', exp: ['B2.4'], skill: 'opposite',
          model: [
            step(W.tile('hot') + ' &harr; ' + W.tile('cold'), 'These are <b>antonyms</b>: the other end.'),
            step(W.sent('The soup is <b>hot</b>. The ice is <b>cold</b>.')),
            step(W.tile('full') + ' &harr; ' + W.tile('empty'), 'Another pair.'),
            step(W.pic('cup'), 'The cup was <b>full</b>. Now it is <b>empty</b>.')
          ],
          guided: [function () { return opposite(1); }, sameOrOpp, matchOpp],
          check: [function () { return opposite(2); }, oppTf, sameOrOpp, matchOpp, function () { return opposite(3); }],
          coach: '<p>Use your hands: one high, one low. Say a word with the high hand, and the child says its opposite with the low hand.</p>',
          mistake: '<p>Choosing a word that means the same (cold and chilly) when the opposite is asked.</p>' }
      ]
    }, {
      id: 'clues', title: 'Working out new words', sub: 'Clues in the sentence, and words from other subjects.',
      concepts: [
        { slug: 'clue', title: 'Find the clue', exp: ['B2.4'], skill: 'clues',
          model: [
            step(W.sent('The puppy was so <b>drowsy</b> that it fell asleep in my lap.'), 'A new word: <b>drowsy</b>.'),
            step(W.sent('The puppy was so <b>drowsy</b> that it <mark class="hl">fell asleep</mark> in my lap.'), 'These words help.'),
            step(W.tile('drowsy') + ' = ' + W.tile('sleepy'), 'Swap it in: it makes sense.'),
            step(W.sent('The canoe was <b>sturdy</b>, so it did not tip in the waves.'), 'Another new word.'),
            step(W.sent('The canoe was <b>sturdy</b>, so it <mark class="hl">did not tip</mark> in the waves.')),
            step(W.tile('sturdy') + ' = ' + W.tile('strong'))
          ],
          guided: [function () { return clueMeaning(1); }, clueFind, clueSwap],
          check: [function () { return clueMeaning(2); }, clueSwap, clueTf, clueFind, function () { return clueMeaning(3); }],
          coach: '<p>When you meet a new word in a book, stop and ask: "What words around it help?" Then try a simpler word in its place.</p>',
          mistake: '<p>Guessing from how the word looks. Point to the clue words first.</p>' },
        { slug: 'subject', title: 'Words for science, math and social studies', exp: ['B2.4'], skill: 'subject-words',
          model: [
            step(W.pic('science') + W.tile('habitat'), 'A science word.'),
            step(W.sent('A pond is a <b>habitat</b> for frogs and turtles.'), 'The place where they live.'),
            step(W.pic('box') + W.tile('estimate'), 'A math word.'),
            step(W.sent('My <b>estimate</b> was 20 beans, and there were 22.'), 'A careful guess.'),
            step(W.icon('write'), 'Keep a list of new words for each subject.')
          ],
          guided: [function () { return subjMeaning(1); }, function () { return subjGap(1); }, subjMatch],
          check: [function () { return subjMeaning(2); }, function () { return subjGap(2); }, subjTf, subjMatch, function () { return subjMeaning(3); }],
          coach: '<p>Ask what new words came up in science, math or social studies this week. Use each one at dinner.</p>',
          mistake: '<p>Knowing a word in one subject but not using it anywhere else. Use new words in talk and writing too.</p>' }
      ]
    }],
    practice: [
      { id: 'same', name: 'Words that mean the same', code: 'B2.4', gen: same },
      { id: 'opposite', name: 'Words that mean the opposite', code: 'B2.4', gen: opposite },
      { id: 'clues', name: 'Clues in the sentence', code: 'B2.4', gen: clueMeaning },
      { id: 'subject-words', name: 'Words for other subjects', code: 'B2.4', gen: subjMeaning }
    ],
    tasks: [
      { id: 'word-hunt', title: 'New word hunt', code: 'B2.4', pic: W.icon('read'), say: 'Find a new word in a book. Find the clue. Say what it means.',
        run: ['While reading together, stop at a word the child does not know.', 'Ask: "Which words around it help?"', 'The child says what the word might mean, then checks it makes sense in the sentence.'],
        rubric: ['Cannot find a clue yet, even with help.', 'Finds a clue with help.', 'Finds a clue and makes a sensible guess.', 'Does it alone, and uses the new word later.'] }
    ]
  });

  Q.shapes('meanings', {
    same: [[1, 'match', matchSame], [1, 'odd-one-out', oddOut], [2, 'true-false', sameTf]],
    opposite: [[1, 'same-or-opposite', sameOrOpp], [1, 'match', matchOpp], [2, 'true-false', oppTf]],
    clues: [[1, 'find-clue', clueFind], [1, 'swap', clueSwap], [2, 'true-false', clueTf]],
    'subject-words': [[1, 'gap', subjGap], [1, 'match', subjMatch], [2, 'true-false', subjTf]]
  });
})();
