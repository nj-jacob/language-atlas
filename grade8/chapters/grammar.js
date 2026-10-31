/* Grade 8: grammar.
   Ontario 2023 Language, Grade 8:
   B3.2 "demonstrate an understanding of the functions of parts of speech in sentences, refine their understanding of grammar, and use
   this knowledge to support comprehension and communicate meaning clearly and precisely"
   From the Language Conventions Continuum (Appendix B), Grade 8: active and passive voice, gerunds as nouns, participles, direct and
   indirect objects, predicate nouns and adjectives, prepositional and adverbial phrases, and reflexive and intensive pronouns.
   All sentences are written for this site. Answer checks: tests/verify/grade8-grammar.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* [active, passive] */
  var VOICE = [['The beaver built the dam.', 'The dam was built by the beaver.'], ['Our class planted the trees.', 'The trees were planted by our class.'],
    ['The mayor opened the new library.', 'The new library was opened by the mayor.'], ['A storm damaged the dock.', 'The dock was damaged by a storm.'],
    ['Jamal wrote the winning essay.', 'The winning essay was written by Jamal.'], ['The chef prepared the bannock.', 'The bannock was prepared by the chef.'],
    ['Volunteers cleaned the shoreline.', 'The shoreline was cleaned by volunteers.'], ['The referee stopped the game.', 'The game was stopped by the referee.']];
  function low(s) { return s === 'Jamal' ? s : s.charAt(0).toLowerCase() + s.slice(1); }
  /* the doer and the receiver, read from the passive sentence */
  function parts(v) { var m = v[1].replace(/\.$/, '').match(/^(.*) (was|were) (\w+) by (.*)$/); return { thing: m[1], doer: m[4] }; }
  function swapped(v) { var p = parts(v), a = v[0]; return a.replace(/^(.*?) (built|planted|opened|damaged|wrote|prepared|cleaned|stopped) (.*)\.$/, function (x, s, vb, o) { return o.charAt(0).toUpperCase() + o.slice(1) + ' ' + vb + ' ' + low(s) + '.'; }) || p.thing; }

  /* -ing words: [sentence, the -ing word, how it is used] */
  var ING = [['Running is my favourite summer activity.', 'Running', 'gerund'], ['Kai enjoys sketching birds.', 'sketching', 'gerund'], ['Swimming in the lake keeps me cool.', 'Swimming', 'gerund'],
    ['Reading before bed helps me sleep.', 'Reading', 'gerund'], ['The barking dog woke the baby.', 'barking', 'participle'], ['We watched the falling snow.', 'falling', 'participle'],
    ['The girl holding the map led the group.', 'holding', 'participle'], ['A smiling stranger held the door.', 'smiling', 'participle'],
    ['Mei is painting a mural.', 'painting', 'verb'], ['The wind was howling all night.', 'howling', 'verb'], ['We are leaving at noon.', 'leaving', 'verb']];
  var USE = { gerund: 'as a noun (a gerund)', participle: 'to describe a noun (a participle)', verb: 'as part of the verb' };

  /* [sentence, indirect object (who receives), direct object (what is given)] */
  var OBJ = [['They gave me a pencil.', 'me', 'pencil'], ['Grandma told us a story.', 'us', 'story'], ['Nadia sent her cousin a postcard.', 'cousin', 'postcard'],
    ['The coach showed the team a new play.', 'team', 'play'], ['Mr. Lee offered Sam a ride.', 'Sam', 'ride'], ['I bought my sister a scarf.', 'sister', 'scarf']];
  /* after a linking verb: [sentence, the word, noun or adjective] */
  var PRED = [['Her aunt is a pilot.', 'pilot', 'noun'], ['That music sounds wonderful.', 'wonderful', 'adjective'], ['The soup tastes salty.', 'salty', 'adjective'],
    ['Our captain is Tala.', 'Tala', 'noun'], ['The lake looked calm.', 'calm', 'adjective'], ['Ottawa is the capital of Canada.', 'capital', 'noun'],
    ['The students seemed nervous.', 'nervous', 'adjective'], ['My brother became a nurse.', 'nurse', 'noun']];
  /* [sentence, the phrase, what it tells] */
  var PHR = [['We hiked along the river.', 'along the river', 'where'], ['The keys are under the mat.', 'under the mat', 'where'], ['After lunch, the class went outside.', 'After lunch', 'when'],
    ['The library closes during the holidays.', 'during the holidays', 'when'], ['The crowd was cheering very loudly.', 'very loudly', 'how'], ['She handled the eggs very carefully.', 'very carefully', 'how'],
    ['A heron stood beside the dock.', 'beside the dock', 'where'], ['We stayed inside until noon.', 'until noon', 'when']];
  /* [sentence, the -self word, reflexive or intensive] */
  var SELF = [['She bought herself a mango.', 'herself', 'reflexive'], ['He himself fixed the bike.', 'himself', 'intensive'], ['We taught ourselves to knit.', 'ourselves', 'reflexive'],
    ['The author herself signed my copy.', 'herself', 'intensive'], ['They prepared themselves for the test.', 'themselves', 'reflexive'], ['I painted the mural myself.', 'myself', 'intensive'],
    ['The cat washed itself in the sun.', 'itself', 'reflexive'], ['The premier himself answered the letter.', 'himself', 'intensive']];

  /* ---------- question makers: voice ---------- */
  function whichVoice(lv) {
    var v = R.pick(VOICE), pass = R.int(0, 1) === 1;
    return Q.tiles('Is this sentence <b>active</b> or <b>passive</b>?', pass ? 'passive' : 'active', [pass ? 'active' : 'passive'], { fig: W.sent(v[pass ? 1 : 0]),
      prompt: 'Does the subject do the action, or receive it?', hint: 'Passive: was or were, an action word, and often "by".', explain: pass ? 'The subject receives the action: passive.' : 'The subject does the action: active.', meta: { k: 'g8-voice', s: v[pass ? 1 : 0] } });
  }
  function doer() {
    var v = R.pick(VOICE), p = parts(v);
    return Q.tiles('Who or what <b>does</b> the action?', p.doer, [p.thing], { fig: W.sent(v[1]), hint: 'In a passive sentence, the doer comes after <b>by</b>.', explain: W.sent(v[1].replace('by ' + p.doer, 'by <mark class="hl">' + p.doer + '</mark>')), meta: { k: 'g8-doer', s: v[1] } });
  }
  function toActive(lv) {
    var v = R.pick(VOICE), other = R.pick(VOICE.filter(function (x) { return x !== v; }));
    return Q.one('Which is the same idea in <b>active</b> voice?', v[0], [swapped(v)].concat(lv > 1 ? [other[1]] : []), { fig: W.sent(v[1]),
      prompt: 'Put the doer first.', hint: 'Start with the words after <b>by</b>.', explain: W.sent(v[0]), steps: ['Find the doer: <b>' + parts(v).doer + '</b>.', 'Put it first, then the action, then what received it.'], meta: { k: 'g8-to-active', s: v[1] } });
  }
  function toPassive() {
    var v = R.pick(VOICE);
    return Q.one('Which is the same idea in <b>passive</b> voice?', v[1], [swapped(v), R.pick(VOICE.filter(function (x) { return x !== v; }))[0]], { fig: W.sent(v[0]),
      hint: 'Start with what received the action, then was or were, then by and the doer.', explain: W.sent(v[1]), meta: { k: 'g8-to-passive', s: v[0] } });
  }
  function pickPassive() {
    var vs = R.some(VOICE, 4);
    return Q.all('Pick every sentence in the <b>passive</b> voice.', [vs[0][1], vs[1][1]], [vs[2][0], vs[3][0]], { hint: 'Look for was or were with an action word.', explain: 'In the passive voice, the subject receives the action.', meta: { k: 'g8-pick-passive' } });
  }

  /* ---------- verbals ---------- */
  function ingUse(lv) {
    var x = R.pick(lv > 1 ? ING : ING.filter(function (i) { return i[2] !== 'verb'; })), uses = lv > 1 ? Object.keys(USE) : ['gerund', 'participle'];
    return Q.tiles('How is <b>' + x[1] + '</b> used here?', USE[x[2]], uses.filter(function (u) { return u !== x[2]; }).map(function (u) { return USE[u]; }), {
      fig: W.sent(x[0].replace(x[1], '<b>' + x[1] + '</b>')), prompt: 'Does it name an activity, describe a noun, or go with is, was or are?',
      hint: 'A gerund can be the subject or object. A participle sits next to a noun and describes it.', explain: '<b>' + x[1] + '</b> is used ' + USE[x[2]] + '.', meta: { k: 'g8-ing', s: x[0], w: x[1] } });
  }
  function tapGerund() {
    var x = R.pick(ING.filter(function (i) { return i[2] === 'gerund'; })), words = x[0].replace(/[.]$/, '').split(' ');
    return { q: 'Tap the <b>gerund</b>.', fig: W.sent(x[0]), type: 'tap', tiles: words, answer: words.indexOf(x[1]), hint: 'Find the -ing word that names an activity.', explain: '<b>' + x[1] + '</b> names an activity: a gerund.', meta: { k: 'g8-tap-gerund', s: x[0] } };
  }
  function matchIng() {
    var xs = ['gerund', 'participle', 'verb'].map(function (k) { return R.pick(ING.filter(function (i) { return i[2] === k; })); });
    return { q: 'Match each sentence to how its -ing word is used.', type: 'match', pairs: xs.map(function (x) { return [x[0], USE[x[2]]]; }), hint: 'Look at the words just before each -ing word.', explain: 'The same ending can do three jobs.', meta: { k: 'g8-match-ing' } };
  }
  function gerundTf() {
    var x = R.pick(ING), right = R.int(0, 1) === 1, said = right === (x[2] === 'gerund') ? 'a gerund' : 'not a gerund';
    return { q: Q.name() + ' says <b>' + x[1] + '</b> is <b>' + said + '</b>.', fig: W.sent(x[0]), type: 'tf', answer: right,
      why: { options: ['It is used ' + USE[x[2]] + '.', 'Every word ending in -ing is a gerund.'], answer: 0 }, hint: 'Does it name an activity?', explain: '<b>' + x[1] + '</b> is used ' + USE[x[2]] + '.', meta: { k: 'g8-gerund-tf', s: x[0], w: x[1], said: said } };
  }

  /* ---------- sentence parts ---------- */
  function object() {
    var o = R.pick(OBJ), direct = R.int(0, 1) === 1;
    return Q.tiles('Tap the <b>' + (direct ? 'direct object' : 'indirect object') + '</b>.', o[direct ? 2 : 1], [o[direct ? 1 : 2]], { fig: W.sent(o[0]),
      prompt: direct ? 'What was given, told or shown?' : 'Who received it?', hint: 'Direct object: what. Indirect object: to whom.', explain: 'Direct: <b>' + o[2] + '</b>. Indirect: <b>' + o[1] + '</b>.', meta: { k: 'g8-object', s: o[0], want: direct ? 'direct' : 'indirect' } });
  }
  function predicate() {
    var p = R.pick(PRED);
    return Q.tiles('After the linking verb, is <b>' + p[1] + '</b> a predicate <b>noun</b> or a predicate <b>adjective</b>?', p[2], [p[2] === 'noun' ? 'adjective' : 'noun'], { fig: W.sent(p[0]),
      prompt: 'Does it rename the subject, or describe it?', hint: 'A predicate noun renames the subject. A predicate adjective describes it.', explain: '<b>' + p[1] + '</b> ' + (p[2] === 'noun' ? 'renames' : 'describes') + ' the subject.', meta: { k: 'g8-predicate', s: p[0], w: p[1] } });
  }
  function phrase(lv) {
    var p = R.pick(PHR), rest = p[0].replace(/[.,]/g, '').replace(p[1] + ' ', '').replace(' ' + p[1], '').split(' ');
    return Q.one('Which words are the <b>phrase</b> that tells <b>' + p[2] + '</b>?', p[1], [rest.slice(0, 2).join(' '), rest.slice(-2).join(' ')].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(p[0]),
      hint: 'It often starts with a word like along, under, after, during, or very.', explain: W.sent(p[0].replace(p[1], '<mark class="hl">' + p[1] + '</mark>')), meta: { k: 'g8-phrase', s: p[0], tells: p[2] } });
  }
  function phraseTells() {
    var p = R.pick(PHR);
    return Q.tiles('What does <b>' + p[1] + '</b> tell?', p[2], ['where', 'when', 'how'].filter(function (x) { return x !== p[2]; }), { fig: W.sent(p[0]),
      hint: 'Ask: where? when? how?', explain: '<b>' + p[1] + '</b> tells ' + p[2] + '.', meta: { k: 'g8-phrase-tells', ph: p[1] } });
  }
  function self() {
    var s = R.pick(SELF);
    return Q.tiles('Is <b>' + s[1] + '</b> reflexive or intensive?', s[2], [s[2] === 'reflexive' ? 'intensive' : 'reflexive'], { fig: W.sent(s[0].replace(s[1], '<b>' + s[1] + '</b>')),
      prompt: 'Take it out. Does the sentence still work?', hint: 'Reflexive: the action comes back to the subject. Intensive: it adds emphasis and can be removed.', explain: s[2] === 'intensive' ? 'You can remove it: it adds emphasis.' : 'The action comes back to the subject.', meta: { k: 'g8-self', s: s[0], w: s[1] } });
  }

  var V0 = VOICE[0];
  Atlas.register('grammar', {
    lessons: [{
      id: 'voice', title: 'Active and passive voice', sub: 'Who does the action, and who receives it.',
      concepts: [
        { slug: 'active', title: 'Active voice: the subject does the action', exp: ['B3.2'], skill: 'voice',
          model: [
            step(W.sent('<b>The beaver</b> built the dam.'), 'The beaver did the building.'),
            step(W.sent('<b>Our class</b> planted the trees.'), 'Clear, direct, and usually shorter.')
          ],
          guided: [function () { return whichVoice(1); }, function () { return whichVoice(1); }],
          check: [function () { return whichVoice(2); }, pickPassive],
          coach: '<p>Ask "Who did it?" If the answer comes first in the sentence, it is active.</p>',
          mistake: '<p>Thinking past tense means passive. "The beaver built the dam" is past and active.</p>' },
        { slug: 'passive', title: 'Passive voice: the subject receives the action', exp: ['B3.2'], skill: 'voice',
          model: [
            step(W.sent('<b>The dam</b> <mark class="hl">was built</mark> by the beaver.'), 'The dam did nothing. It received the action.'),
            step(W.tile('was') + ' ' + W.tile('built'), 'was or were, plus an action word.'),
            step(W.sent('The dam was built by <mark class="hl">the beaver</mark>.'), 'The doer comes after <b>by</b>, or is left out.')
          ],
          guided: [doer, function () { return whichVoice(1); }],
          check: [doer, function () { return whichVoice(2); }],
          coach: '<p>Passive voice is useful when the doer is unknown or unimportant ("The window was broken."), and common in science reports.</p>',
          mistake: '<p>Using passive voice everywhere, which makes writing wordy and vague.</p>' },
        { slug: 'change', title: 'Switch between active and passive', exp: ['B3.2'], skill: 'voice',
          model: [
            step(W.sent(V0[1]), 'Passive.'),
            step(W.sent('The dam was built by <mark class="hl">the beaver</mark>.'), 'Find the doer.'),
            step(W.sent('<mark class="hl">The beaver</mark> built the dam.'), 'Put the doer first.')
          ],
          guided: [function () { return toActive(1); }, toPassive],
          check: [function () { return toActive(2); }, toPassive],
          coach: '<p>When revising, change two or three passive sentences to active and read both aloud. Which is clearer?</p>',
          mistake: '<p>Swapping the nouns but keeping the verb ("The dam built the beaver"). Check that the meaning stayed the same.</p>' }
      ]
    }, {
      id: 'verbals', title: 'Gerunds and participles', sub: 'Verb forms that do other jobs.',
      concepts: [
        { slug: 'gerund', title: 'A gerund is an -ing verb used as a noun', exp: ['B3.2'], skill: 'verbals',
          model: [
            step(W.sent('<b>Running</b> is my favourite summer activity.'), 'It names an activity.'),
            step(W.sent('Kai enjoys <b>sketching</b> birds.'), 'Enjoys what? Sketching.')
          ],
          guided: [tapGerund, function () { return ingUse(1); }],
          check: [tapGerund, gerundTf],
          coach: '<p>Test: replace the -ing word with "it" or "this activity". If the sentence still works, it is a gerund.</p>',
          mistake: '<p>Calling every -ing word a gerund.</p>' },
        { slug: 'participle', title: 'A participle describes a noun', exp: ['B3.2'], skill: 'verbals',
          model: [
            step(W.sent('The <b>barking</b> dog woke the baby.'), 'Which dog? The barking one.'),
            step(W.sent('The girl <b>holding the map</b> led the group.'), 'It can come after the noun, too.'),
            step(W.sent('Mei <mark class="hl">is painting</mark> a mural.'), 'With is or was: part of the verb.')
          ],
          guided: [function () { return ingUse(1); }, function () { return ingUse(2); }],
          check: [function () { return ingUse(2); }, matchIng],
          coach: '<p>Ask "Which one?" A participle answers it: which dog, which girl.</p>',
          mistake: '<p>Mixing up a participle with part of the verb. Look for is, are, was or were just before it.</p>' }
      ]
    }, {
      id: 'parts', title: 'Parts of a sentence', sub: 'Objects, predicates, phrases and -self pronouns.',
      concepts: [
        { slug: 'objects', title: 'Direct and indirect objects', exp: ['B3.2'], skill: 'sentence-parts',
          model: [
            step(W.sent('They gave me <b>a pencil</b>.'), 'Gave what? A pencil: the direct object.'),
            step(W.sent('They gave <b>me</b> a pencil.'), 'Gave it to whom? Me: the indirect object.')
          ],
          guided: [object, object],
          check: [object, object],
          coach: '<p>Rewrite with "to": "They gave a pencil to me." The word after "to" is the indirect object.</p>',
          mistake: '<p>Choosing the first noun after the verb as the direct object every time.</p>' },
        { slug: 'predicate', title: 'After a linking verb: rename or describe', exp: ['B3.2'], skill: 'sentence-parts',
          model: [
            step(W.tile('is') + ' ' + W.tile('seems') + ' ' + W.tile('became') + ' ' + W.tile('sounds'), 'Linking verbs: no action.'),
            step(W.sent('Her aunt is <b>a pilot</b>.'), 'Aunt = pilot: a predicate noun.'),
            step(W.sent('That music sounds <b>wonderful</b>.'), 'Describes the music: a predicate adjective.')
          ],
          guided: [predicate, predicate],
          check: [predicate, predicate],
          coach: '<p>Replace the linking verb with an equals sign. If both sides name the same thing, it is a predicate noun.</p>',
          mistake: '<p>Treating "sounds", "looks" and "tastes" as action verbs when they link.</p>' },
        { slug: 'phrases', title: 'Phrases tell where, when or how', exp: ['B3.2'], skill: 'sentence-parts',
          model: [
            step(W.sent('We hiked <mark class="hl">along the river</mark>.'), 'Where? A prepositional phrase.'),
            step(W.sent('<mark class="hl">After lunch</mark>, the class went outside.'), 'When?'),
            step(W.sent('The crowd was cheering <mark class="hl">very loudly</mark>.'), 'How? An adverbial phrase.')
          ],
          guided: [function () { return phrase(1); }, phraseTells],
          check: [function () { return phrase(2); }, phraseTells],
          coach: '<p>Phrases let a writer add detail without starting a new sentence. Have the child add one where, when and how phrase to a plain sentence.</p>',
          mistake: '<p>Stopping the phrase too early ("along") or running it into the next idea.</p>' },
        { slug: 'self', title: 'Reflexive or intensive?', exp: ['B3.2'], skill: 'sentence-parts',
          model: [
            step(W.sent('She bought <b>herself</b> a mango.'), 'Reflexive: the action comes back to her.'),
            step(W.sent('The author <b>herself</b> signed my copy.'), 'Intensive: it adds emphasis.'),
            step(W.sent('The author signed my copy.'), 'Remove an intensive and the sentence still works.')
          ],
          guided: [self, self],
          check: [self, self],
          coach: '<p>Cover the -self word. If the sentence still makes complete sense, it is intensive.</p>',
          mistake: '<p>Using "myself" instead of "me" ("Send it to Kai and myself"). Use -self words only for these two jobs.</p>' }
      ]
    }],
    practice: [
      { id: 'voice', name: 'Active and passive voice', code: 'B3.2', gen: whichVoice },
      { id: 'verbals', name: 'Gerunds and participles', code: 'B3.2', gen: ingUse },
      { id: 'sentence-parts', name: 'Objects, predicates, phrases and pronouns', code: 'B3.2', gen: object }
    ]
  });

  Q.shapes('grammar', {
    voice: [[1, 'doer', doer], [1, 'to-active', toActive], [2, 'to-passive', toPassive], [2, 'pick', pickPassive]],
    verbals: [[1, 'tap-gerund', tapGerund], [2, 'match', matchIng], [2, 'true-false', gerundTf]],
    'sentence-parts': [[1, 'predicate', predicate], [1, 'phrase', phrase], [1, 'phrase-tells', phraseTells], [2, 'self', self]]
  });
})();
