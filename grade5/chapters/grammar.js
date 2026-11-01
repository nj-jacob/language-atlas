/* Grade 5: grammar. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 5, B3.2 "demonstrate an understanding of the functions of parts of speech in sentences, including direct objects
   for nouns, intensive and reflexive pronouns, proper adjectives, and correlative conjunctions, and use this knowledge to support comprehension
   and communicate meaning clearly". All sentences are written for this site. Answer checks: tests/verify/grade5-grammar.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  /* [who, action, what (the direct object), the rest, the action word in its plain form] */
  var DO = [['Ava', 'kicked', 'the ball', 'across the field', 'kick'], ['Grandpa', 'baked', 'a pie', 'for the fair', 'bake'], ['The beaver', 'dragged', 'a branch', 'into the pond', 'drag'],
    ['Kai', 'painted', 'a mural', 'at school', 'paint'], ['My sister', 'mailed', 'a letter', 'to her pen pal', 'mail'], ['The class', 'planted', 'six trees', 'by the fence', 'plant'],
    ['Noor', 'read', 'the poem', 'out loud', 'read'], ['Mr. Okafor', 'fixed', 'the bike', 'in an hour', 'fix'], ['Mei', 'caught', 'a fish', 'at the dock', 'catch'],
    ['Dad', 'washed', 'the car', 'in the driveway', 'wash'], ['The fox', 'chased', 'a rabbit', 'through the snow', 'chase'], ['Theo', 'built', 'a snow fort', 'after school', 'build'],
    ['Grandma', 'knitted', 'a scarf', 'for my birthday', 'knit'], ['The team', 'won', 'the trophy', 'last spring', 'win'], ['Zara', 'carried', 'the canoe', 'to the lake', 'carry'],
    ['Our teacher', 'opened', 'the window', 'during class', 'open']];
  /* reflexive: the pronoun points back to who did it. [sentence with a gap, the pronoun, who did it] */
  var REFL = [['Omar taught ___ to juggle.', 'himself', 'Omar'], ['Leila cut ___ on the paper.', 'herself', 'Leila'], ['The kids cleaned up after ___.', 'themselves', 'The kids'],
    ['I reminded ___ to breathe.', 'myself', 'I'], ['We gave ___ a short break.', 'ourselves', 'We'], ['The cat licked ___ clean.', 'itself', 'The cat'], ['You should be proud of ___.', 'yourself', 'You'],
    ['Hana hurt ___ on the trampoline.', 'herself', 'Hana'], ['The boys splashed ___ with mud.', 'themselves', 'The boys'], ['I made ___ a sandwich.', 'myself', 'I'],
    ['You can help ___ to a muffin.', 'yourself', 'You'], ['We introduced ___ to the new neighbours.', 'ourselves', 'We'], ['Jun dried ___ with a towel.', 'himself', 'Jun'],
    ['The dog scratched ___ behind the ear.', 'itself', 'The dog'], ['My aunts treated ___ to lunch.', 'themselves', 'My aunts']];
  var SELVES = ['myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'themselves'];
  /* words that are not standard English, for the -self words that have one */
  var NOT_WORDS = { himself: 'hisself', themselves: 'theirselves', ourselves: 'ourself', itself: 'its self' };
  /* intensive: the pronoun adds emphasis and could be taken out */
  var INTENS = ['The mayor herself cut the ribbon.', 'The chef himself served our soup.', 'We built the canoe ourselves.', 'I painted the fence myself.', 'The players themselves cleaned the rink.',
    'The author herself signed my book.', 'Our principal himself shovelled the walk.', 'You yourself said it was a good idea.', 'The Elders themselves led the drumming.',
    'I myself have never seen a moose.', 'We ourselves planted every tree.', 'The goalie himself scored the winning goal.'];
  function filled(r) { return r[0].replace('___', r[1]); }
  function selfIn(s) { return SELVES.filter(function (x) { return new RegExp('\\b' + x + '\\b').test(s); })[0]; }
  /* [the place, its proper adjective, a thing] */
  var PROPER = [['Canada', 'Canadian', 'flag'], ['Italy', 'Italian', 'bread'], ['Mexico', 'Mexican', 'music'], ['Japan', 'Japanese', 'garden'], ['Jamaica', 'Jamaican', 'patties'],
    ['Ukraine', 'Ukrainian', 'dancers'], ['France', 'French', 'songs'], ['Korea', 'Korean', 'drums'], ['China', 'Chinese', 'dumplings'], ['India', 'Indian', 'spices'],
    ['Greece', 'Greek', 'salad'], ['Brazil', 'Brazilian', 'soccer team'], ['Ireland', 'Irish', 'music'], ['Germany', 'German', 'bakery'], ['Egypt', 'Egyptian', 'pyramids'], ['Australia', 'Australian', 'animals']];
  var FRAMES = ['We enjoyed the _.', 'My aunt loves _.', 'The class learned about _.'];
  /* correlative conjunctions: joining words that work in pairs. [sentence with a gap for the partner, the partner word] */
  var PAIRS = [['either', 'or'], ['neither', 'nor'], ['both', 'and'], ['not only', 'but also']];
  var CORR = [['Either we leave now, ___ we miss the bus.', 'or'], ['Neither Sam ___ Ava likes olives.', 'nor'], ['Both my aunt ___ my uncle speak Cree.', 'and'],
    ['She is not only a fast skater ___ a kind friend.', 'but also'], ['You can have either soup ___ salad.', 'or'], ['Neither the lake ___ the river froze this year.', 'nor'],
    ['Both the girls ___ the boys signed up for choir.', 'and'], ['The trip was not only fun ___ cheap.', 'but also'], ['We can either walk ___ take the bus.', 'or'],
    ['Neither the bus ___ the train goes there.', 'nor'], ['Both Mei ___ Arjun play the fiddle.', 'and'], ['Kai is not only funny ___ very smart.', 'but also'],
    ['Either Dad ___ Mom will drive us.', 'or'], ['Neither rain ___ snow stopped the parade.', 'nor'], ['Both the moose ___ its calf crossed the road.', 'and'], ['The book was not only long ___ hard to read.', 'but also']];
  var PARTNERS = ['or', 'nor', 'and', 'but also'];
  function firstOf(s) { return ['not only', 'neither', 'either', 'both'].filter(function (p) { return new RegExp('\\b' + p + '\\b', 'i').test(s); })[0]; }
  function partnerOf(f) { return PAIRS.filter(function (p) { return p[0] === f; })[0][1]; }

  function doSent(d) { return d.slice(0, 4).join(' ') + '.'; }
  function gap(s) { return s.replace('___', W.gap()); }
  function lower(w) { return w.replace(/^(The|My|Our) /, function (x) { return x.toLowerCase(); }); }

  /* ---------- direct objects ---------- */
  function directObject(lv) {
    var d = R.pick(DO), tiles = d.slice(0, lv > 1 ? 4 : 3);
    return { q: 'Tap the <b>direct object</b>: what got the action?', fig: W.sent(doSent(d)), type: 'tap', tiles: tiles, answer: 2,
      prompt: 'Ask: ' + d[0] + ' ' + d[1] + ' <b>what</b>?', hint: 'Find the action word. Ask "what?" after it.', explain: W.sent(d[0] + ' ' + d[1] + ' <mark class="hl">' + d[2] + '</mark> ' + d[3] + '.'), meta: { k: 'g5-direct-object', s: doSent(d) } };
  }
  function doQuestion(lv) {
    var d = R.pick(DO), other = R.pick(DO.filter(function (x) { return x !== d; }));
    return Q.one('What did ' + lower(d[0]) + ' ' + d[4] + '?', d[2], [d[3], other[2]], { fig: W.sent(doSent(d)), prompt: 'Find the action. What comes right after it?',
      hint: 'The direct object comes right after the action.', explain: '<b>' + d[2] + '</b> is the direct object.', meta: { k: 'g5-do-question', s: doSent(d) } });
  }
  function doTf(lv) {
    var d = R.pick(DO), right = R.int(0, 1) === 1, said = right ? d[2] : R.pick([d[0], d[3]]);
    return { q: Q.name() + ' says the direct object is <b>' + said + '</b>.', fig: W.sent(doSent(d)), type: 'tf', answer: right,
      why: { options: ['It answers "' + d[1] + ' what?"', 'It does not answer "' + d[1] + ' what?"'], answer: right ? 0 : 1 },
      hint: 'Ask: ' + d[0] + ' ' + d[1] + ' what?', explain: W.sent(d[0] + ' ' + d[1] + ' <mark class="hl">' + d[2] + '</mark> ' + d[3] + '.'), meta: { k: 'g5-do-tf', s: doSent(d), said: said } };
  }
  function doAsk(lv) {
    var d = R.pick(DO);
    return Q.one('Which question finds the direct object?', d[1] + ' what?', ['Who ' + d[1] + '?', d[1] + ' where?'].concat(lv > 1 ? [d[1] + ' when?'] : []), { fig: W.sent(doSent(d)),
      hint: 'The direct object is a thing. Which question asks for a thing?', explain: W.sent(d[0] + ' ' + d[1] + ' <mark class="hl">' + d[2] + '</mark> ' + d[3] + '.'), meta: { k: 'g5-do-ask', s: doSent(d) } });
  }

  /* ---------- reflexive pronouns ---------- */
  function reflexive(lv) {
    var r = R.pick(REFL), wrong = R.some(SELVES.filter(function (x) { return x !== r[1]; }), lv > 1 ? 3 : 2);
    return Q.tiles('Which word fits?', r[1], wrong, { fig: W.sent(gap(r[0])), prompt: 'Who did it? The word points back to them.',
      hint: 'Match the -self word to who did it.', explain: W.sent(r[0].replace('___', '<b>' + r[1] + '</b>')), meta: { k: 'g5-reflexive', s: r[0] } });
  }
  function reflexiveRight(lv) {
    var r = R.pick(REFL.filter(function (x) { return NOT_WORDS[x[1]]; }));
    return Q.one('Which is written the right way?', filled(r), [r[0].replace('___', NOT_WORDS[r[1]])].concat(lv > 1 ? [r[0].replace('___', R.pick(SELVES.filter(function (x) { return x !== r[1]; })))] : []), {
      prompt: 'Who did it? Which word points back to them?', hint: 'himself, themselves, ourselves, itself: no other spellings.', explain: W.sent(r[0].replace('___', '<b>' + r[1] + '</b>')), meta: { k: 'g5-reflexive-right', s: r[0] } });
  }
  function reflexiveTf(lv) {
    var r = R.pick(REFL), right = R.int(0, 1) === 1, said = right ? r[1] : R.pick(SELVES.filter(function (x) { return x !== r[1]; }));
    return { q: Q.name() + ' fills the gap with <b>' + said + '</b>.', fig: W.sent(gap(r[0])), type: 'tf', answer: right,
      why: { options: ['It points back to ' + lower(r[2]) + '.', 'It does not match ' + lower(r[2]) + '.'], answer: right ? 0 : 1 },
      hint: 'Who did it?', explain: W.sent(r[0].replace('___', '<b>' + r[1] + '</b>')), meta: { k: 'g5-reflexive-tf', s: r[0], said: said } };
  }
  function matchSelf(lv) {
    var seen = {}, rs = R.shuffle(REFL).filter(function (r) { if (seen[r[1]]) return false; seen[r[1]] = 1; return true; }).slice(0, lv > 1 ? 4 : 3);
    return { q: 'Match who did it to the word that points back.', type: 'match', pairs: rs.map(function (r) { return [r[2], r[1]]; }), hint: 'Say it: Omar... himself.', explain: 'Each -self word matches its doer.', meta: { k: 'g5-self-match' } };
  }

  /* ---------- intensive pronouns ---------- */
  function whichKind(lv) {
    var intensive = R.int(0, 1) === 1, shown = intensive ? R.pick(INTENS) : filled(R.pick(REFL));
    return { q: 'How is the <b>-self</b> word used here?', fig: W.sent(shown), type: 'tap', tiles: ['It points back to who did it (reflexive).', 'It adds emphasis and could be taken out (intensive).'], answer: intensive ? 1 : 0,
      prompt: 'Cover the -self word. Does the sentence still work?', hint: 'If you can take it out, it is intensive.', explain: intensive ? 'Take it out and the sentence still works: intensive.' : 'Take it out and the sentence breaks: reflexive.',
      meta: { k: 'g5-self-kind', s: shown } };
  }
  /* take out the -self word: an intensive sentence still works, a reflexive one breaks */
  function selfTf(lv) {
    var intensive = R.int(0, 1) === 1, full = intensive ? R.pick(INTENS) : filled(R.pick(REFL)), word = selfIn(full), shown = full.replace(' ' + word, '');
    return { q: 'Take out <b>' + word + '</b>. Does the sentence still make sense?', fig: W.sent(shown), type: 'tf', answer: intensive,
      why: { options: ['The -self word only added emphasis (intensive).', 'The -self word was needed (reflexive).'], answer: intensive ? 0 : 1 },
      hint: 'Read it aloud without the word.', explain: W.sent(full), meta: { k: 'g5-self-tf', s: full, shown: shown } };
  }
  function whichIntensive(lv) {
    var right = R.pick(INTENS), wrong = R.some(REFL, lv > 1 ? 3 : 2).map(filled);
    return Q.one('Which sentence uses a -self word for <b>emphasis</b>?', right, wrong, { prompt: 'Cover the -self word in each. Which still works?',
      hint: 'Cover the -self word. If the sentence still works, it adds emphasis.', explain: W.sent(right.replace(selfIn(right), '<mark class="hl">' + selfIn(right) + '</mark>')), meta: { k: 'g5-which-intensive' } });
  }
  function pickIntensive(lv) {
    var right = R.some(INTENS, 2), wrong = R.some(REFL, lv > 1 ? 3 : 2).map(filled);
    return Q.all('Pick every sentence where the -self word adds <b>emphasis</b>.', right, wrong, { hint: 'Cover the -self word. Does the sentence still work?',
      explain: 'Those still work without the -self word: intensive.', meta: { k: 'g5-pick-intensive' } });
  }

  /* ---------- proper adjectives ---------- */
  function phrase(p, adj) { return R.pick(FRAMES).replace('_', adj + ' ' + p[2]); }
  function properAdj(lv) {
    var p = R.pick(PROPER), f = R.pick(FRAMES), right = f.replace('_', p[1] + ' ' + p[2]);
    return Q.one('Which is written the right way?', right, [f.replace('_', p[1].toLowerCase() + ' ' + p[2])].concat(lv > 1 ? [f.replace('_', p[0] + ' ' + p[2])] : []), {
      prompt: 'The describing word comes from the name ' + p[0] + '.', hint: 'An adjective made from a name keeps the capital.', explain: W.sent(right), meta: { k: 'g5-proper-adj', place: p[0] } });
  }
  function adjFrom(lv) {
    var p = R.pick(PROPER), others = R.some(PROPER.filter(function (x) { return x !== p; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; });
    return Q.tiles('Which adjective comes from <b>' + p[0] + '</b>?', p[1], others.concat([p[1].toLowerCase()]), { prompt: 'It keeps the capital letter.', hint: 'It keeps the capital letter.', explain: '<b>' + p[0] + '</b> &rarr; <b>' + p[1] + '</b>', meta: { k: 'g5-adj-from', place: p[0] } });
  }
  function capTap(lv) {
    var p = R.pick(PROPER), s = phrase(p, p[1].toLowerCase()), words = s.replace(/\.$/, '').split(' ').slice(1), adj = p[1].toLowerCase();
    return Q.tiles('Which word needs a <b>capital</b> letter?', adj, R.some(words.filter(function (w) { return w !== adj; }), lv > 1 ? 3 : 2), { fig: W.sent(s),
      prompt: 'Which word comes from the name of a place?', hint: 'Which word comes from the name of a place?', explain: W.sent(s.replace(adj, '<b>' + p[1] + '</b>')), meta: { k: 'g5-cap-tap', place: p[0] } });
  }
  function matchAdj(lv) {
    var ps = R.some(PROPER, lv > 1 ? 4 : 3);
    return { q: 'Match each place to its adjective.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[1]]; }), hint: 'Say it with a thing: Italy... Italian bread.', explain: 'Each adjective keeps its capital.', meta: { k: 'g5-adj-match' } };
  }
  function adjTf(lv) {
    var p = R.pick(PROPER), right = R.int(0, 1) === 1, s = phrase(p, right ? p[1] : p[1].toLowerCase()), n = Q.name();
    return { q: n + ' wrote this. Is it written the right way?', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['The adjective from a place name has its capital.', 'The adjective from a place name needs a capital.'], answer: right ? 0 : 1 },
      hint: 'Find the word made from a place name. Does it have a capital?', explain: W.sent(s.replace(new RegExp(p[1], 'i'), '<b>' + p[1] + '</b>')), meta: { k: 'g5-adj-tf', s: s, place: p[0] } };
  }

  /* ---------- correlative conjunctions ---------- */
  function correlative(lv) {
    var c = R.pick(CORR), wrong = R.some(PARTNERS.filter(function (x) { return x !== c[1]; }), lv > 1 ? 3 : 2);
    return Q.tiles('Which word finishes the pair?', c[1], wrong, { fig: W.sent(gap(c[0])), prompt: 'Find the first word of the pair.',
      hint: 'either... or, neither... nor, both... and, not only... but also.', explain: W.sent(c[0].replace('___', '<b>' + c[1] + '</b>')), meta: { k: 'g5-correlative', s: c[0] } });
  }
  function firstWord(lv) {
    var c = R.pick(CORR), f = firstOf(c[0]), full = c[0].replace('___', c[1]), re = new RegExp('\\b' + f + '\\b', 'i'), at = full.search(re), cap = at === 0;
    var shown = full.slice(0, at) + '___' + full.slice(at + f.length), opts = PAIRS.map(function (p) { return cap ? p[0].charAt(0).toUpperCase() + p[0].slice(1) : p[0]; });
    var right = opts[PAIRS.map(function (p) { return p[0]; }).indexOf(f)];
    return Q.tiles('Which word starts the pair?', right, R.some(opts.filter(function (o) { return o !== right; }), lv > 1 ? 3 : 2), { fig: W.sent(gap(shown)), prompt: 'Look at the second word of the pair: <b>' + c[1] + '</b>.',
      hint: 'or goes with either; nor with neither; and with both; but also with not only.', explain: W.sent(full.replace(re, '<b>' + full.substr(at, f.length) + '</b>')), meta: { k: 'g5-corr-first', s: shown, second: c[1] } });
  }
  function matchPairs(lv) {
    var ps = R.some(PAIRS, lv > 1 ? 4 : 3);
    return { q: 'Match the words that work as a pair.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[1]]; }), hint: 'Say them together: either... or.', explain: 'Pairs of joining words are called <b>correlative conjunctions</b>.', meta: { k: 'g5-match-pairs' } };
  }
  function corrTf(lv) {
    var c = R.pick(CORR), right = R.int(0, 1) === 1, said = right ? c[1] : R.pick(PARTNERS.filter(function (x) { return x !== c[1]; })), s = c[0].replace('___', said);
    return { q: Q.name() + ' wrote this. Is the pair right?', fig: W.sent(s.replace(said, '<b>' + said + '</b>')), type: 'tf', answer: right,
      why: { options: ['The two words belong together.', 'The second word does not match the first.'], answer: right ? 0 : 1 },
      hint: 'either... or, neither... nor, both... and, not only... but also.', explain: W.sent(c[0].replace('___', '<b>' + c[1] + '</b>')), meta: { k: 'g5-corr-tf', s: c[0], said: said } };
  }

  var D0 = DO[0], D1 = DO[8];
  Atlas.register('grammar', {
    full: true,
    lessons: [{
      id: 'nouns-pronouns', title: 'Objects and pronouns', sub: 'What gets the action, and words that end in -self.',
      concepts: [
        { slug: 'direct-object', title: 'The direct object gets the action', exp: ['B3.2'], skill: 'objects',
          model: [
            step(W.sent(D0[0] + ' <b>' + D0[1] + '</b> ' + D0[2] + ' ' + D0[3] + '.'), 'The action: ' + D0[1] + '.'),
            step(W.sent(D0[0] + ' ' + D0[1] + ' <b>what</b>?'), 'Ask "what?" after the action.'),
            step(W.sent(D0[0] + ' ' + D0[1] + ' <mark class="hl">' + D0[2] + '</mark> ' + D0[3] + '.'), 'That noun is the direct object.'),
            step(W.sent(D1[0] + ' <b>' + D1[1] + '</b> ' + D1[2] + ' ' + D1[3] + '.'), 'Second example: ' + D1[1] + ' what?'),
            step(W.sent(D1[0] + ' ' + D1[1] + ' <mark class="hl">' + D1[2] + '</mark> ' + D1[3] + '.'), '"At the dock" tells where, not what.')
          ],
          guided: [function () { return directObject(1); }, function () { return doQuestion(1); }, function () { return doAsk(1); }],
          check: [function () { return directObject(2); }, function () { return doQuestion(2); }, function () { return doTf(2); }, function () { return doAsk(2); }, function () { return directObject(3); }],
          coach: '<p>Act it out: throw a soft toy. "I threw what? The toy." The thing that moves is the direct object.</p>',
          mistake: '<p>Choosing the place (across the field). Ask "what?", not "where?".</p>' },
        { slug: 'reflexive', title: 'Reflexive pronouns point back', exp: ['B3.2'], skill: 'reflexive',
          model: [
            step(W.sent('<b>Omar</b> taught <mark class="hl">himself</mark> to juggle.'), 'Omar did it, to Omar.'),
            step(W.sent('<b>The kids</b> cleaned up after <mark class="hl">themselves</mark>.'), 'Second example: more than one, so -selves.'),
            step(W.tile('myself') + ' ' + W.tile('yourself') + ' ' + W.tile('himself') + ' ' + W.tile('herself') + ' ' + W.tile('itself'), 'One person or thing.'),
            step(W.tile('ourselves') + ' ' + W.tile('themselves'), 'More than one.')
          ],
          guided: [function () { return reflexive(1); }, function () { return reflexiveTf(1); }, function () { return matchSelf(1); }],
          check: [function () { return reflexive(2); }, function () { return reflexiveRight(2); }, function () { return reflexiveTf(2); }, function () { return matchSelf(2); }, function () { return reflexive(3); }],
          coach: '<p>Point at yourself as you say "myself", at the child as you say "yourself". The word points back to the doer.</p>',
          mistake: '<p>Saying "hisself" or "theirselves". The correct words are himself and themselves.</p>' },
        { slug: 'intensive', title: 'Intensive pronouns add emphasis', exp: ['B3.2'], skill: 'intensive',
          model: [
            step(W.sent('The mayor <mark class="hl">herself</mark> cut the ribbon.'), 'Not a helper. The mayor!'),
            step(W.sent('The mayor cut the ribbon.'), 'Take it out: still a sentence.'),
            step(W.sent('The goalie <mark class="hl">himself</mark> scored the winning goal.'), 'Second example.'),
            step(W.sent('The goalie scored the winning goal.'), 'Still works: the word only adds emphasis.'),
            step(W.sent('Omar taught.'), 'Compare: take himself out of "Omar taught himself" and it breaks. That one is reflexive.')
          ],
          guided: [function () { return whichKind(1); }, function () { return selfTf(1); }, function () { return whichIntensive(1); }],
          check: [function () { return whichKind(2); }, function () { return selfTf(2); }, function () { return whichIntensive(2); }, function () { return pickIntensive(2); }, function () { return whichKind(3); }],
          coach: '<p>Use the cover test: cover the -self word with a finger. If the sentence still works, it was only adding emphasis.</p>',
          mistake: '<p>Using "myself" instead of "me": "Call Sam or myself." Say "Call Sam or me."</p>' }
      ]
    }, {
      id: 'adj-conj', title: 'Adjectives and joining pairs', sub: 'Describing words from names, and words that come in pairs.',
      concepts: [
        { slug: 'proper-adjectives', title: 'Proper adjectives start with a capital', exp: ['B3.2'], skill: 'proper-adjectives',
          model: [
            step(W.tile('Jamaica'), 'A name.'),
            step(W.sent('<mark class="hl">Jamaican</mark> patties'), 'A describing word made from the name.'),
            step(W.tile('Ukraine'), 'Second example.'),
            step(W.sent('<mark class="hl">Ukrainian</mark> dancers'), 'The capital stays.'),
            step(W.sent('<b>Greek</b> salad &middot; <b>French</b> songs'), 'Some change more, but every one keeps its capital.')
          ],
          guided: [function () { return properAdj(1); }, function () { return adjFrom(1); }, function () { return capTap(1); }],
          check: [function () { return properAdj(2); }, function () { return adjFrom(2); }, function () { return capTap(2); }, function () { return adjTf(2); }, function () { return matchAdj(2); }],
          coach: '<p>Look at food labels and restaurant signs together: Italian bread, Korean barbecue. Each describing word has a capital.</p>',
          mistake: '<p>Writing "canadian" with a small c. A proper adjective always keeps its capital.</p>' },
        { slug: 'correlative', title: 'Some joining words work in pairs', exp: ['B3.2'], skill: 'correlative',
          model: [
            step(W.sent('<b>Either</b> soup <b>or</b> salad.'), 'One of the two.'),
            step(W.sent('<b>Neither</b> Sam <b>nor</b> Ava likes olives.'), 'Second example: not one, and not the other.'),
            step(W.sent('<b>Both</b> my aunt <b>and</b> my uncle speak Cree.'), 'The two together.'),
            step(W.sent('Kai is <b>not only</b> funny <b>but also</b> very smart.'), 'One thing, and another too.')
          ],
          guided: [function () { return correlative(1); }, function () { return matchPairs(1); }, function () { return firstWord(1); }],
          check: [function () { return correlative(2); }, function () { return firstWord(2); }, function () { return corrTf(2); }, function () { return matchPairs(2); }, function () { return correlative(3); }],
          coach: '<p>Play "either or": offer two choices for everything at dinner. "Neither... nor" is the answer when the child wants neither.</p>',
          mistake: '<p>Writing "neither... or". Neither goes with nor.</p>' }
      ]
    }],
    practice: [
      { id: 'objects', name: 'Direct objects', code: 'B3.2', gen: directObject },
      { id: 'reflexive', name: 'Reflexive pronouns', code: 'B3.2', gen: reflexive },
      { id: 'intensive', name: 'Intensive pronouns', code: 'B3.2', gen: whichKind },
      { id: 'proper-adjectives', name: 'Proper adjectives', code: 'B3.2', gen: properAdj },
      { id: 'correlative', name: 'Joining words in pairs', code: 'B3.2', gen: correlative }
    ]
  });

  Q.shapes('grammar', {
    objects: [[1, 'what', doQuestion], [1, 'which-question', doAsk], [2, 'true-false', doTf]],
    reflexive: [[1, 'match', matchSelf], [1, 'true-false', reflexiveTf], [2, 'right-word', reflexiveRight]],
    intensive: [[1, 'true-false', selfTf], [1, 'which', whichIntensive], [2, 'pick', pickIntensive]],
    'proper-adjectives': [[1, 'adj-from', adjFrom], [1, 'capital', capTap], [2, 'true-false', adjTf], [2, 'match', matchAdj]],
    correlative: [[1, 'first-word', firstWord], [1, 'match', matchPairs], [2, 'true-false', corrTf]]
  });
})();
