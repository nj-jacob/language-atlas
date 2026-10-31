/* Grade 5: grammar.
   Ontario 2023 Language, Grade 5, B3.2 "demonstrate an understanding of the functions of parts of speech in sentences, including direct objects
   for nouns, intensive and reflexive pronouns, proper adjectives, and correlative conjunctions, and use this knowledge to support comprehension
   and communicate meaning clearly". All sentences are written for this site. Answer checks: tests/verify/grade5-grammar.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* [who, action, what (the direct object), the rest, the action word in its plain form] */
  var DO = [['Ava', 'kicked', 'the ball', 'across the field', 'kick'], ['Grandpa', 'baked', 'a pie', 'for the fair', 'bake'], ['The beaver', 'dragged', 'a branch', 'into the pond', 'drag'],
    ['Kai', 'painted', 'a mural', 'at school', 'paint'], ['My sister', 'mailed', 'a letter', 'to her pen pal', 'mail'], ['The class', 'planted', 'six trees', 'by the fence', 'plant'],
    ['Noor', 'read', 'the poem', 'out loud', 'read'], ['Mr. Okafor', 'fixed', 'the bike', 'in an hour', 'fix']];
  /* reflexive: the pronoun points back to who did it. [sentence with a gap, the pronoun] */
  var REFL = [['Omar taught ___ to juggle.', 'himself'], ['Leila cut ___ on the paper.', 'herself'], ['The kids cleaned up after ___.', 'themselves'], ['I reminded ___ to breathe.', 'myself'],
    ['We gave ___ a short break.', 'ourselves'], ['The cat licked ___ clean.', 'itself'], ['You should be proud of ___.', 'yourself']];
  var SELVES = ['myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'themselves'];
  /* intensive: the pronoun adds emphasis and could be taken out */
  var INTENS = ['The mayor herself cut the ribbon.', 'The chef himself served our soup.', 'We built the canoe ourselves.', 'I painted the fence myself.', 'The players themselves cleaned the rink.'];
  /* [the place, its proper adjective, a thing] */
  var PROPER = [['Canada', 'Canadian', 'flag'], ['Italy', 'Italian', 'bread'], ['Mexico', 'Mexican', 'music'], ['Japan', 'Japanese', 'garden'], ['Jamaica', 'Jamaican', 'patties'],
    ['Ukraine', 'Ukrainian', 'dancers'], ['France', 'French', 'songs'], ['Korea', 'Korean', 'drums']];
  /* correlative conjunctions: joining words that work in pairs. [sentence with a gap, the partner word] */
  var PAIRS = [['either', 'or'], ['neither', 'nor'], ['both', 'and'], ['not only', 'but also']];
  var CORR = [['Either we leave now, ___ we miss the bus.', 'or'], ['Neither Sam ___ Ava likes olives.', 'nor'], ['Both my aunt ___ my uncle speak Cree.', 'and'],
    ['She is not only a fast skater ___ a kind friend.', 'but also'], ['You can have either soup ___ salad.', 'or'], ['Neither the lake ___ the river froze this year.', 'nor'],
    ['Both the girls ___ the boys signed up for choir.', 'and'], ['The trip was not only fun ___ cheap.', 'but also']];
  var PARTNERS = ['or', 'nor', 'and', 'but also'];

  function doSent(d) { return d.slice(0, 4).join(' ') + '.'; }
  function gap(s) { return s.replace('___', W.gap()); }

  /* ---------- question makers ---------- */
  function directObject(lv) {
    var d = R.pick(DO), tiles = d.slice(0, lv > 1 ? 4 : 3);
    return { q: 'Tap the <b>direct object</b>: what got the action?', fig: W.sent(doSent(d)), type: 'tap', tiles: tiles, answer: 2,
      prompt: 'Ask: ' + d[0] + ' ' + d[1] + ' <b>what</b>?', hint: 'Find the action word. Ask "what?" after it.', explain: d[0] + ' ' + d[1] + ' <b>' + d[2] + '</b>.', meta: { k: 'g5-direct-object', s: doSent(d) } };
  }
  function doQuestion() {
    var d = R.pick(DO), other = R.pick(DO.filter(function (x) { return x !== d; }));
    return Q.one('What did ' + d[0].replace(/^(The|My) /, function (w) { return w.toLowerCase(); }) + ' ' + d[4] + '?', d[2], [d[3], other[2]], { fig: W.sent(doSent(d)),
      hint: 'The direct object comes right after the action.', explain: '<b>' + d[2] + '</b> is the direct object.', meta: { k: 'g5-do-question', s: doSent(d) } });
  }
  function reflexive(lv) {
    var r = R.pick(REFL), wrong = R.some(SELVES.filter(function (x) { return x !== r[1]; }), lv > 1 ? 3 : 2);
    return Q.tiles('Which word fits?', r[1], wrong, { fig: W.sent(gap(r[0])), prompt: 'Who did it? The word points back to them.',
      hint: 'Match the -self word to who did it.', explain: W.sent(r[0].replace('___', '<b>' + r[1] + '</b>')), meta: { k: 'g5-reflexive', s: r[0] } });
  }
  function whichKind() {
    var intensive = R.int(0, 1) === 1, s = intensive ? R.pick(INTENS) : R.pick(REFL)[0], shown = intensive ? s : s.replace('___', REFL.filter(function (r) { return r[0] === s; })[0][1]);
    return { q: 'How is the <b>-self</b> word used here?', fig: W.sent(shown), type: 'tap', tiles: ['It points back to who did it (reflexive).', 'It adds emphasis and could be taken out (intensive).'], answer: intensive ? 1 : 0,
      prompt: 'Cover the -self word. Does the sentence still work?', hint: 'If you can take it out, it is intensive.', explain: intensive ? 'Take it out and the sentence still works: intensive.' : 'Take it out and the sentence breaks: reflexive.',
      meta: { k: 'g5-self-kind', s: shown } };
  }
  /* take out the -self word: an intensive sentence still works, a reflexive one breaks */
  function selfTf() {
    var intensive = R.int(0, 1) === 1, r = R.pick(REFL), full = intensive ? R.pick(INTENS) : r[0].replace('___', r[1]);
    var word = SELVES.filter(function (x) { return full.indexOf(' ' + x) >= 0; })[0], shown = full.replace(' ' + word, '');
    return { q: 'Take out <b>' + word + '</b>. Does the sentence still make sense?', fig: W.sent(shown), type: 'tf', answer: intensive,
      why: { options: ['The -self word only added emphasis (intensive).', 'The -self word was needed (reflexive).'], answer: intensive ? 0 : 1 },
      hint: 'Read it aloud without the word.', explain: W.sent(full), meta: { k: 'g5-self-tf', s: full, shown: shown } };
  }

  function properAdj(lv) {
    var p = R.pick(PROPER), right = 'We enjoyed the ' + p[1] + ' ' + p[2] + '.';
    return Q.one('Which is written the right way?', right, ['We enjoyed the ' + p[1].toLowerCase() + ' ' + p[2] + '.'].concat(lv > 1 ? ['We enjoyed the ' + p[0] + ' ' + p[2] + '.'] : []), {
      prompt: 'The describing word comes from the name ' + p[0] + '.', hint: 'An adjective made from a name keeps the capital.', explain: W.sent(right), meta: { k: 'g5-proper-adj', place: p[0] } });
  }
  function adjFrom() {
    var p = R.pick(PROPER), others = R.some(PROPER.filter(function (x) { return x !== p; }), 2).map(function (x) { return x[1]; });
    return Q.tiles('Which adjective comes from <b>' + p[0] + '</b>?', p[1], others.concat([p[1].toLowerCase()]), { hint: 'It keeps the capital letter.', explain: '<b>' + p[0] + '</b> &rarr; <b>' + p[1] + '</b>', meta: { k: 'g5-adj-from', place: p[0] } });
  }
  function correlative(lv) {
    var c = R.pick(CORR), wrong = R.some(PARTNERS.filter(function (x) { return x !== c[1]; }), lv > 1 ? 3 : 2);
    return Q.tiles('Which word finishes the pair?', c[1], wrong, { fig: W.sent(gap(c[0])), prompt: 'Find the first word of the pair.',
      hint: 'either... or, neither... nor, both... and, not only... but also.', explain: W.sent(c[0].replace('___', '<b>' + c[1] + '</b>')), meta: { k: 'g5-correlative', s: c[0] } });
  }
  function matchPairs() {
    var ps = R.some(PAIRS, 3);
    return { q: 'Match the words that work as a pair.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[1]]; }), hint: 'Say them together: either... or.', explain: 'Pairs of joining words are called <b>correlative conjunctions</b>.', meta: { k: 'g5-match-pairs' } };
  }

  Atlas.register('grammar', {
    lessons: [{
      id: 'nouns-pronouns', title: 'Objects and pronouns', sub: 'What gets the action, and words that end in -self.',
      concepts: [
        { slug: 'direct-object', title: 'The direct object gets the action', exp: ['B3.2'], skill: 'objects-pronouns',
          model: [
            step(W.sent('Ava <b>kicked</b> the ball.'), 'The action: kicked.'),
            step(W.sent('Ava kicked <b>what</b>?'), 'Ask "what?" after the action.'),
            step(W.sent('Ava kicked <mark class="hl">the ball</mark>.'), 'That noun is the direct object.')
          ],
          guided: [function () { return directObject(1); }, doQuestion],
          check: [function () { return directObject(2); }, doQuestion],
          coach: '<p>Act it out: throw a soft toy. "I threw what? The toy." The thing that moves is the direct object.</p>',
          mistake: '<p>Choosing the place (across the field). Ask "what?", not "where?".</p>' },
        { slug: 'reflexive', title: 'Reflexive pronouns point back', exp: ['B3.2'], skill: 'objects-pronouns',
          model: [
            step(W.sent('<b>Omar</b> taught <mark class="hl">himself</mark> to juggle.'), 'Omar did it, to Omar.'),
            step(W.tile('myself') + ' ' + W.tile('herself') + ' ' + W.tile('ourselves') + ' ' + W.tile('themselves'), 'They all end in -self or -selves.')
          ],
          guided: [function () { return reflexive(1); }, function () { return reflexive(1); }],
          check: [function () { return reflexive(2); }, function () { return reflexive(2); }],
          coach: '<p>Point at yourself as you say "myself", at the child as you say "yourself". The word points back to the doer.</p>',
          mistake: '<p>Saying "hisself" or "theirselves". The correct words are himself and themselves.</p>' },
        { slug: 'intensive', title: 'Intensive pronouns add emphasis', exp: ['B3.2'], skill: 'objects-pronouns',
          model: [
            step(W.sent('The mayor <mark class="hl">herself</mark> cut the ribbon.'), 'Not a helper. The mayor!'),
            step(W.sent('The mayor cut the ribbon.'), 'Take it out: still a sentence.'),
            step(W.sent('Omar taught himself.'), 'Take it out here, and it breaks: reflexive.')
          ],
          guided: [whichKind, selfTf],
          check: [whichKind, whichKind],
          coach: '<p>Use the cover test: cover the -self word with a finger. If the sentence still works, it was only adding emphasis.</p>',
          mistake: '<p>Using "myself" instead of "me": "Call Sam or myself." Say "Call Sam or me."</p>' }
      ]
    }, {
      id: 'adj-conj', title: 'Adjectives and joining pairs', sub: 'Describing words from names, and words that come in pairs.',
      concepts: [
        { slug: 'proper-adjectives', title: 'Proper adjectives start with a capital', exp: ['B3.2'], skill: 'adj-conj',
          model: [
            step(W.tile('Jamaica'), 'A name.'),
            step(W.sent('<mark class="hl">Jamaican</mark> patties'), 'A describing word made from the name.'),
            step(W.sent('<b>Ukrainian</b> dancers &middot; <b>Japanese</b> garden'), 'The capital stays.')
          ],
          guided: [function () { return properAdj(1); }, adjFrom],
          check: [function () { return properAdj(2); }, adjFrom],
          coach: '<p>Look at food labels and restaurant signs together: Italian bread, Korean barbecue. Each describing word has a capital.</p>',
          mistake: '<p>Writing "canadian" with a small c. A proper adjective always keeps its capital.</p>' },
        { slug: 'correlative', title: 'Some joining words work in pairs', exp: ['B3.2'], skill: 'adj-conj',
          model: [
            step(W.sent('<b>Either</b> soup <b>or</b> salad.'), 'One of the two.'),
            step(W.sent('<b>Neither</b> Sam <b>nor</b> Ava likes olives.'), 'Not one, and not the other.'),
            step(W.sent('<b>Both</b> my aunt <b>and</b> my uncle speak Cree.'), 'The two together.')
          ],
          guided: [function () { return correlative(1); }, matchPairs],
          check: [function () { return correlative(2); }, matchPairs],
          coach: '<p>Play "either or": offer two choices for everything at dinner. "Neither... nor" is the answer when the child wants neither.</p>',
          mistake: '<p>Writing "neither... or". Neither goes with nor.</p>' }
      ]
    }],
    practice: [
      { id: 'objects-pronouns', name: 'Direct objects and -self pronouns', code: 'B3.2', gen: directObject },
      { id: 'adj-conj', name: 'Proper adjectives and joining pairs', code: 'B3.2', gen: properAdj }
    ]
  });

  Q.shapes('grammar', {
    'objects-pronouns': [[1, 'reflexive', reflexive], [1, 'what', doQuestion], [2, 'self-kind', whichKind], [2, 'true-false', selfTf]],
    'adj-conj': [[1, 'adj-from', adjFrom], [1, 'correlative', correlative], [2, 'match', matchPairs]]
  });
})();
