/* Grade 8: grammar. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 8:
   B3.2 "demonstrate an understanding of the functions of parts of speech in sentences, refine their understanding of grammar, and use
   this knowledge to support comprehension and communicate meaning clearly and precisely"
   From the Language Conventions Continuum (Appendix B), Grade 8: active and passive voice, gerunds as nouns, participles, direct and
   indirect objects, predicate nouns and adjectives, prepositional and adverbial phrases, and reflexive and intensive pronouns.
   All sentences are written for this site. Answer checks: tests/verify/grade8-grammar.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* ---------- data ---------- */
  /* [active, passive] */
  var VOICE = [['The beaver built the dam.', 'The dam was built by the beaver.'], ['Our class planted the trees.', 'The trees were planted by our class.'],
    ['The mayor opened the new library.', 'The new library was opened by the mayor.'], ['A storm damaged the dock.', 'The dock was damaged by a storm.'],
    ['Jamal wrote the winning essay.', 'The winning essay was written by Jamal.'], ['The chef prepared the bannock.', 'The bannock was prepared by the chef.'],
    ['Volunteers cleaned the shoreline.', 'The shoreline was cleaned by volunteers.'], ['The referee stopped the game.', 'The game was stopped by the referee.'],
    ['The Raptors won the game.', 'The game was won by the Raptors.'], ['Ms. Singh graded the tests.', 'The tests were graded by Ms. Singh.'],
    ['A tornado flattened the barn.', 'The barn was flattened by a tornado.'], ['The students painted the mural.', 'The mural was painted by the students.'],
    ['The fox caught the rabbit.', 'The rabbit was caught by the fox.'], ['My grandfather carved the paddle.', 'The paddle was carved by my grandfather.'],
    ['The council approved the plan.', 'The plan was approved by the council.'], ['Lightning struck the old oak.', 'The old oak was struck by lightning.']];
  var VERBS = 'built|planted|opened|damaged|wrote|prepared|cleaned|stopped|won|graded|flattened|painted|caught|carved|approved|struck';
  /* names keep their capital in the middle of a sentence */
  function low(s) { return /^(The|A|An|Our|My|Volunteers|Lightning)\b/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  /* the doer, the verb and the receiver, read from the active sentence */
  function bits(v) { var m = v[0].replace(/\.$/, '').match(new RegExp('^(.*?) (' + VERBS + ') (.*)$')); return { doer: m[1], verb: m[2], thing: m[3] }; }
  /* the common mistake: swap the nouns and keep the verb */
  function swapped(v) { var b = bits(v); return cap(b.thing) + ' ' + b.verb + ' ' + low(b.doer) + '.'; }

  /* -ing words: [sentence, the -ing word, how it is used, the noun a participle describes] */
  var ING = [['Running is my favourite summer activity.', 'Running', 'gerund'], ['Kai enjoys sketching birds.', 'sketching', 'gerund'], ['Swimming in the lake keeps me cool.', 'Swimming', 'gerund'],
    ['Reading before bed helps me sleep.', 'Reading', 'gerund'], ['Paddling against the wind is hard work.', 'Paddling', 'gerund'], ['Amira loves baking bread.', 'baking', 'gerund'],
    ['Skating on the canal is a winter tradition.', 'Skating', 'gerund'], ['My brother finished cleaning his room.', 'cleaning', 'gerund'], ['Theo avoids speaking in front of crowds.', 'speaking', 'gerund'],
    ['Fishing through the ice takes patience.', 'Fishing', 'gerund'], ['Leila started learning Cree last year.', 'learning', 'gerund'],
    ['The barking dog woke the baby.', 'barking', 'participle', 'dog'], ['We watched the falling snow.', 'falling', 'participle', 'snow'],
    ['The girl holding the map led the group.', 'holding', 'participle', 'girl'], ['A smiling stranger held the door.', 'smiling', 'participle', 'stranger'],
    ['The howling wind kept us awake.', 'howling', 'participle', 'wind'], ['The boy wearing the red toque waved.', 'wearing', 'participle', 'boy'],
    ['The melting ice dripped from the roof.', 'melting', 'participle', 'ice'], ['We heard the crackling fire.', 'crackling', 'participle', 'fire'],
    ['The team celebrating on the ice won the cup.', 'celebrating', 'participle', 'team'], ['A rising tide covered the rocks.', 'rising', 'participle', 'tide'],
    ['The child reading quietly is my cousin.', 'reading', 'participle', 'child'],
    ['Mei is painting a mural.', 'painting', 'verb'], ['The wind was howling all night.', 'howling', 'verb'], ['We are leaving at noon.', 'leaving', 'verb'],
    ['The geese were flying south.', 'flying', 'verb'], ['I am packing my bag.', 'packing', 'verb'], ['Omar was fixing his bike.', 'fixing', 'verb'],
    ['The kids are building a fort.', 'building', 'verb'], ['It is snowing again.', 'snowing', 'verb'], ['My parents were cooking dinner.', 'cooking', 'verb'],
    ['The river is rising fast.', 'rising', 'verb'], ['Zara was practising her speech.', 'practising', 'verb']];
  var USE = { gerund: 'as a noun (a gerund)', participle: 'to describe a noun (a participle)', verb: 'as part of the verb' };
  function ingOf(k) { return ING.filter(function (i) { return i[2] === k; }); }
  function bold(s, w) { return s.replace(new RegExp('\\b' + w + '\\b'), '<b>' + w + '</b>'); }
  function words(s) { return s.replace(/[.]$/, '').split(' '); }
  /* a sentence can be tapped word by word only if no word appears twice */
  function tappable(x) { var w = words(x[0]).map(function (y) { return y.toLowerCase(); }); return w.every(function (y, i) { return w.indexOf(y) === i; }); }

  /* [sentence, indirect object (who receives), direct object (what is given), to or for] */
  var OBJ = [['They gave me a pencil.', 'me', 'pencil', 'to'], ['Grandma told us a story.', 'us', 'story', 'to'], ['Nadia sent her cousin a postcard.', 'cousin', 'postcard', 'to'],
    ['The coach showed the team a new play.', 'team', 'play', 'to'], ['Mr. Lee offered Sam a ride.', 'Sam', 'ride', 'to'], ['I bought my sister a scarf.', 'sister', 'scarf', 'for'],
    ['Dad made us pancakes.', 'us', 'pancakes', 'for'], ['The librarian found Omar a quiet table.', 'Omar', 'table', 'for'], ['Zara lent her friend a pen.', 'friend', 'pen', 'to'],
    ['The guide handed each hiker a map.', 'hiker', 'map', 'to'], ['Our neighbour baked the class a cake.', 'class', 'cake', 'for'], ['Mom read the twins a bedtime story.', 'twins', 'story', 'to'],
    ['The coach threw Kai the ball.', 'Kai', 'ball', 'to'], ['I wrote my grandmother a letter.', 'grandmother', 'letter', 'to'], ['The server brought us the menus.', 'us', 'menus', 'to']];
  /* the same sentence with to or for: "They gave a pencil to me." */
  function withTo(o, swap) {
    var w = words(o[0]), io = w.indexOf(o[1]), start = w.slice(0, io), dobj = w.slice(io + 1).join(' ');
    if (/^(her|my|the|each)$/.test(w[io - 1])) { start = w.slice(0, io - 1); dobj = w.slice(io + 1).join(' '); }
    var ioPhrase = w.slice(start.length, io + 1).join(' ');
    return swap ? start.join(' ') + ' ' + ioPhrase + ' ' + o[3] + ' ' + dobj + '.' : start.join(' ') + ' ' + dobj + ' ' + o[3] + ' ' + ioPhrase + '.';
  }

  /* after a linking verb: [sentence, the linking verb, the word, noun or adjective] */
  var PRED = [['Her aunt is a pilot.', 'is', 'pilot', 'noun'], ['That music sounds wonderful.', 'sounds', 'wonderful', 'adjective'], ['The soup tastes salty.', 'tastes', 'salty', 'adjective'],
    ['Our captain is Tala.', 'is', 'Tala', 'noun'], ['The lake looked calm.', 'looked', 'calm', 'adjective'], ['Ottawa is the capital of Canada.', 'is', 'capital', 'noun'],
    ['The students seemed nervous.', 'seemed', 'nervous', 'adjective'], ['My brother became a nurse.', 'became', 'nurse', 'noun'], ['The night grew cold.', 'grew', 'cold', 'adjective'],
    ['Mr. Okafor is our principal.', 'is', 'principal', 'noun'], ['The bread smells fresh.', 'smells', 'fresh', 'adjective'], ['Kai became the captain.', 'became', 'captain', 'noun'],
    ['The puppy felt sleepy.', 'felt', 'sleepy', 'adjective'], ['This painting is a gift.', 'is', 'gift', 'noun'], ['The hallway was silent.', 'was', 'silent', 'adjective'],
    ['Winnipeg is a city on the prairies.', 'is', 'city', 'noun']];
  /* [sentence, the phrase, what it tells] */
  var PHR = [['We hiked along the river.', 'along the river', 'where'], ['The keys are under the mat.', 'under the mat', 'where'], ['After lunch, the class went outside.', 'After lunch', 'when'],
    ['The library closes during the holidays.', 'during the holidays', 'when'], ['The crowd was cheering very loudly.', 'very loudly', 'how'], ['She handled the eggs very carefully.', 'very carefully', 'how'],
    ['A heron stood beside the dock.', 'beside the dock', 'where'], ['We stayed inside until noon.', 'until noon', 'when'], ['The canoe drifted across the bay.', 'across the bay', 'where'],
    ['We will meet before the game.', 'before the game', 'when'], ['Hana spoke very softly.', 'very softly', 'how'], ['The cat hid behind the couch.', 'behind the couch', 'where'],
    ['The store has been closed since March.', 'since March', 'when'], ['He carried the eggs with great care.', 'with great care', 'how'], ['The fox ran through the snow.', 'through the snow', 'where'],
    ['Zara answered the question quite confidently.', 'quite confidently', 'how']];
  var TELLS = ['where', 'when', 'how'];
  /* [sentence, the -self word, reflexive or intensive] */
  var SELF = [['She bought herself a mango.', 'herself', 'reflexive'], ['He himself fixed the bike.', 'himself', 'intensive'], ['We taught ourselves to knit.', 'ourselves', 'reflexive'],
    ['The author herself signed my copy.', 'herself', 'intensive'], ['They prepared themselves for the test.', 'themselves', 'reflexive'], ['I painted the mural myself.', 'myself', 'intensive'],
    ['The cat washed itself in the sun.', 'itself', 'reflexive'], ['The premier himself answered the letter.', 'himself', 'intensive'], ['I made myself a sandwich.', 'myself', 'reflexive'],
    ['The mayor herself cut the ribbon.', 'herself', 'intensive'], ['You should trust yourself.', 'yourself', 'reflexive'], ['We built the shed ourselves.', 'ourselves', 'intensive'],
    ['He hurt himself on the ice.', 'himself', 'reflexive'], ['The players themselves chose the name.', 'themselves', 'intensive'], ['The dog scratched itself.', 'itself', 'reflexive'],
    ['You yourself said it was easy.', 'yourself', 'intensive']];
  /* -self words used where a plain pronoun belongs */
  var MISUSE = ['Kai and myself went to the rink.', 'Send the photos to Hana and myself.', 'Myself and Omar wrote the report.', 'The coach picked Leo and myself.',
    'Ourselves and our cousins went camping.', 'Please call Mei or myself.'];

  /* ---------- active voice ---------- */
  function whichVoice() {
    var v = R.pick(VOICE), pass = R.int(0, 1) === 1;
    return Q.tiles('Is this sentence <b>active</b> or <b>passive</b>?', pass ? 'passive' : 'active', [pass ? 'active' : 'passive'], { fig: W.sent(v[pass ? 1 : 0]),
      prompt: 'Does the subject do the action, or receive it?', hint: 'Passive: was or were, an action word, and often "by".', explain: pass ? 'The subject receives the action: passive.' : 'The subject does the action: active.', meta: { k: 'g8-voice', s: v[pass ? 1 : 0] } });
  }
  function whichActive(lv) {
    var vs = R.some(VOICE, 3);
    return Q.one('Which sentence is in the <b>active</b> voice?', vs[0][0], vs.slice(1, lv > 1 ? 3 : 2).map(function (v) { return v[1]; }), { prompt: 'In which one does the subject do the action?',
      hint: 'Active: the doer comes first.', explain: W.sent(vs[0][0]), meta: { k: 'g8-which-active' } });
  }
  function pickActive(lv) {
    var vs = R.some(VOICE, 4), n = lv > 1 ? 2 : 1;
    return Q.all('Pick every sentence in the <b>active</b> voice.', [vs[0][0], vs[1][0]], vs.slice(2, 2 + n).map(function (v) { return v[1]; }), {
      hint: 'Is the doer first?', explain: 'In the active voice, the subject does the action.', meta: { k: 'g8-pick-active' } });
  }
  function voiceTf() {
    var v = R.pick(VOICE), pass = R.int(0, 1) === 1, right = R.int(0, 1) === 1, said = right === pass ? 'passive' : 'active';
    return { q: Q.name() + ' says this sentence is <b>' + said + '</b>.', fig: W.sent(v[pass ? 1 : 0]), type: 'tf', answer: right,
      why: { options: [pass ? 'The subject receives the action.' : 'The subject does the action.', 'Every sentence in the past tense is passive.'], answer: 0 },
      hint: 'Who does the action? Is that the subject?', explain: pass ? 'Passive.' : 'Active.', meta: { k: 'g8-active-tf', s: v[pass ? 1 : 0], said: said } };
  }

  /* ---------- passive voice ---------- */
  function role() {
    var v = R.pick(VOICE), b = bits(v), doer = R.int(0, 1) === 1;
    return Q.tiles('Who or what <b>' + (doer ? 'does' : 'receives') + '</b> the action?', doer ? b.doer : cap(b.thing), [doer ? cap(b.thing) : b.doer], { fig: W.sent(v[1]),
      prompt: doer ? 'Look after the word <b>by</b>.' : 'Look at the start of the sentence.', hint: 'In a passive sentence, the subject receives the action and the doer comes after <b>by</b>.',
      explain: W.sent(v[1].replace('by ' + low(b.doer), 'by <mark class="hl">' + low(b.doer) + '</mark>')), meta: { k: 'g8-doer', s: v[1], want: doer ? 'doer' : 'receiver' } });
  }
  function whichPassive(lv) {
    var vs = R.some(VOICE, 3);
    return Q.one('Which sentence is in the <b>passive</b> voice?', vs[0][1], vs.slice(1, lv > 1 ? 3 : 2).map(function (v) { return v[0]; }), { prompt: 'Look for was or were.',
      hint: 'Passive: the subject receives the action.', explain: W.sent(vs[0][1]), meta: { k: 'g8-which-passive' } });
  }
  function pickPassive() {
    var vs = R.some(VOICE, 4);
    return Q.all('Pick every sentence in the <b>passive</b> voice.', [vs[0][1], vs[1][1]], [vs[2][0], vs[3][0]], { hint: 'Look for was or were with an action word.', explain: 'In the passive voice, the subject receives the action.', meta: { k: 'g8-pick-passive' } });
  }
  function passiveTf() {
    var v = R.pick(VOICE), b = bits(v), right = R.int(0, 1) === 1, said = right ? b.doer : cap(b.thing);
    return { q: Q.name() + ' says <b>' + said + '</b> does the action.', fig: W.sent(v[1]), type: 'tf', answer: right,
      why: { options: ['The doer comes after <b>by</b>.', 'The first noun always does the action.'], answer: right ? 0 : 1 }, hint: 'Look after the word <b>by</b>.',
      explain: 'The doer: <b>' + b.doer + '</b>.', meta: { k: 'g8-passive-tf', s: v[1], said: said } };
  }

  /* ---------- switching ---------- */
  function change(lv) {
    var v = R.pick(VOICE), toAct = R.int(0, 1) === 1, other = R.pick(VOICE.filter(function (x) { return x !== v; }));
    return Q.one('Which is the same idea in <b>' + (toAct ? 'active' : 'passive') + '</b> voice?', v[toAct ? 0 : 1], [swapped(v)].concat(lv > 1 ? [other[toAct ? 0 : 1]] : []), {
      fig: W.sent(v[toAct ? 1 : 0]), prompt: toAct ? 'Put the doer first.' : 'Put the receiver first.', hint: toAct ? 'Start with the words after <b>by</b>.' : 'Start with what received the action, then was or were, then by and the doer.',
      explain: W.sent(v[toAct ? 0 : 1]), meta: { k: 'g8-switch-voice', s: v[toAct ? 1 : 0] } });
  }
  function buildActive() {
    var v = R.pick(VOICE), b = bits(v);
    return { q: 'Build the same idea in <b>active</b> voice.', type: 'build', fig: W.sent(v[1]), parts: [W.tile(b.doer), W.tile(b.verb), W.tile(b.thing), W.tile('was'), W.tile('by')], answer: [0, 1, 2],
      hint: 'Doer, then the action, then what received it.', explain: W.sent(v[0]), meta: { k: 'g8-build-active', s: v[1] } };
  }
  function changeTf() {
    var v = R.pick(VOICE), right = R.int(0, 1) === 1, shown = right ? v[0] : swapped(v);
    return { q: Q.name() + ' changed the passive sentence to active. Same meaning?', fig: W.sent(v[1]) + W.sent('&rarr; ' + shown), type: 'tf', answer: right,
      why: { options: ['The same doer still does the action.', 'The nouns swapped places, so the meaning changed.'], answer: right ? 0 : 1 }, hint: 'Who does the action in each one?',
      explain: W.sent(v[0]), meta: { k: 'g8-change-tf', s: v[1], shown: shown } };
  }

  function spotSwap(lv) {
    var v = R.pick(VOICE), other = R.pick(VOICE.filter(function (x) { return x !== v; }));
    return Q.one('Each rewrite tries to say this in active voice. Which one <b>changed the meaning</b>?', swapped(v), [v[0]].concat(lv > 1 ? [other[0]] : []), { fig: W.sent(v[1]),
      prompt: 'Who does the action in each one?', hint: 'Swapping the nouns but keeping the verb flips the meaning.', explain: W.sent(v[0]) + ' keeps the meaning.', meta: { k: 'g8-spot-swap', s: v[1] } });
  }

  /* ---------- gerunds ---------- */
  function gerundOrNot() {
    var x = R.pick(ING), g = x[2] === 'gerund';
    return Q.tiles('Is <b>' + x[1] + '</b> a gerund here?', g ? 'yes, it names an activity' : 'no, it does another job', [g ? 'no, it does another job' : 'yes, it names an activity'], {
      fig: W.sent(bold(x[0], x[1])), prompt: 'Could you swap it for "this activity"?', hint: 'A gerund is an -ing word used as a noun.', explain: '<b>' + x[1] + '</b> is used ' + USE[x[2]] + '.', meta: { k: 'g8-gerund', s: x[0], w: x[1] } });
  }
  function tapGerund() {
    var x = R.pick(ingOf('gerund').filter(tappable)), ws = words(x[0]);
    return { q: 'Tap the <b>gerund</b>.', fig: W.sent(x[0]), type: 'tap', tiles: ws, answer: ws.indexOf(x[1]), hint: 'Find the -ing word that names an activity.', explain: '<b>' + x[1] + '</b> names an activity: a gerund.', meta: { k: 'g8-tap-gerund', s: x[0] } };
  }
  function gerundTf() {
    var x = R.pick(ING), right = R.int(0, 1) === 1, said = right === (x[2] === 'gerund') ? 'a gerund' : 'not a gerund';
    return { q: Q.name() + ' says <b>' + x[1] + '</b> is <b>' + said + '</b>.', fig: W.sent(x[0]), type: 'tf', answer: right,
      why: { options: ['It is used ' + USE[x[2]] + '.', 'Every word ending in -ing is a gerund.'], answer: 0 }, hint: 'Does it name an activity?', explain: '<b>' + x[1] + '</b> is used ' + USE[x[2]] + '.', meta: { k: 'g8-gerund-tf', s: x[0], w: x[1], said: said } };
  }
  function pickGerunds(lv) {
    var g = R.some(ingOf('gerund'), 2), o = R.some(ingOf('participle'), 1).concat(R.some(ingOf('verb'), lv > 1 ? 2 : 1));
    return Q.all('Pick every sentence with a <b>gerund</b>.', g.map(function (x) { return x[0]; }), o.map(function (x) { return x[0]; }), { hint: 'A gerund names an activity, like a noun.',
      explain: g.map(function (x) { return W.sent(bold(x[0], x[1])); }).join(''), meta: { k: 'g8-pick-gerunds' } });
  }

  /* ---------- participles ---------- */
  function ingUse(lv) {
    var x = R.pick(ING), uses = Object.keys(USE);
    return Q.tiles('How is <b>' + x[1] + '</b> used here?', USE[x[2]], uses.filter(function (u) { return u !== x[2]; }).slice(0, lv > 1 ? 2 : 1).map(function (u) { return USE[u]; }), {
      fig: W.sent(bold(x[0], x[1])), prompt: 'Does it name an activity, describe a noun, or go with is, was or are?',
      hint: 'A gerund can be the subject or object. A participle sits next to a noun and describes it.', explain: '<b>' + x[1] + '</b> is used ' + USE[x[2]] + '.', meta: { k: 'g8-ing', s: x[0], w: x[1] } });
  }
  function tapParticiple() {
    var x = R.pick(ingOf('participle').filter(tappable)), ws = words(x[0]);
    return { q: 'Tap the <b>participle</b>: the -ing word that describes a noun.', fig: W.sent(x[0]), type: 'tap', tiles: ws, answer: ws.indexOf(x[1]), hint: 'It sits right next to the noun it describes.',
      explain: '<b>' + x[1] + '</b> describes the ' + x[3] + '.', meta: { k: 'g8-tap-participle', s: x[0] } };
  }
  function participleNoun() {
    var x = R.pick(ingOf('participle')), others = words(x[0]).filter(function (w) { return w !== x[1] && w !== x[3] && w.length > 2 && !/^the$/i.test(w) && !/ing$/.test(w); });
    return Q.tiles('Which noun does <b>' + x[1] + '</b> describe?', x[3], R.some(others, 2), { fig: W.sent(bold(x[0], x[1])), prompt: 'Which one?', hint: 'Look right before or right after it.',
      explain: 'The ' + x[1] + ' ' + x[3] + '.', meta: { k: 'g8-participle-noun', s: x[0], w: x[1] } });
  }
  function matchIng() {
    var xs = ['gerund', 'participle', 'verb'].map(function (k) { return R.pick(ingOf(k)); });
    return { q: 'Match each sentence to how its -ing word is used.', type: 'match', pairs: xs.map(function (x) { return [x[0], USE[x[2]]]; }), hint: 'Look at the words just before each -ing word.', explain: 'The same ending can do three jobs.', meta: { k: 'g8-match-ing' } };
  }

  /* ---------- objects ---------- */
  function object() {
    var o = R.pick(OBJ), direct = R.int(0, 1) === 1;
    return Q.tiles('Tap the <b>' + (direct ? 'direct object' : 'indirect object') + '</b>.', o[direct ? 2 : 1], [o[direct ? 1 : 2]], { fig: W.sent(o[0]),
      prompt: direct ? 'What was given, made or shown?' : 'Who received it?', hint: 'Direct object: what. Indirect object: to whom or for whom.', explain: 'Direct: <b>' + o[2] + '</b>. Indirect: <b>' + o[1] + '</b>.', meta: { k: 'g8-object', s: o[0], want: direct ? 'direct' : 'indirect' } });
  }
  function objectKind() {
    var o = R.pick(OBJ), direct = R.int(0, 1) === 1, w = o[direct ? 2 : 1];
    return Q.tiles('Is <b>' + w + '</b> the direct object or the indirect object?', direct ? 'direct object' : 'indirect object', [direct ? 'indirect object' : 'direct object'], { fig: W.sent(bold(o[0], w)),
      prompt: 'Is it the thing, or the one who receives it?', hint: 'Direct object: what. Indirect object: to whom or for whom.', explain: 'Direct: <b>' + o[2] + '</b>. Indirect: <b>' + o[1] + '</b>.', meta: { k: 'g8-object-kind', s: o[0], w: w } });
  }
  function objectTo() {
    var o = R.pick(OBJ);
    return Q.one('Which sentence means the same, using <b>' + o[3] + '</b>?', withTo(o), [withTo(o, true)], { fig: W.sent(o[0]), prompt: 'Who received it?',
      hint: 'The indirect object goes after ' + o[3] + '.', explain: W.sent(withTo(o)), meta: { k: 'g8-object-to', s: o[0] } });
  }
  function objectTf() {
    var o = R.pick(OBJ), w = o[R.pick([1, 2])], right = R.int(0, 1) === 1, isDirect = w === o[2], said = right === isDirect ? 'direct object' : 'indirect object';
    return { q: Q.name() + ' says <b>' + w + '</b> is the <b>' + said + '</b>.', fig: W.sent(o[0]), type: 'tf', answer: right,
      why: { options: [isDirect ? 'It is the thing that was given.' : 'It is the one who received it.', 'The first noun after the verb is always the direct object.'], answer: 0 },
      hint: 'Rewrite with ' + o[3] + '.', explain: W.sent(withTo(o)), meta: { k: 'g8-object-tf', s: o[0], w: w, said: said } };
  }

  /* ---------- predicate nouns and adjectives ---------- */
  /* level 1 asks noun or adjective; higher levels ask the child to find the word */
  function predicate(lv) {
    var p = R.pick(lv > 1 ? PRED.filter(tappable) : PRED);
    if (lv > 1) {
      var ws = words(p[0]);
      return { q: 'Tap the word that <b>renames or describes</b> the subject.', fig: W.sent(p[0]), type: 'tap', tiles: ws, answer: ws.indexOf(p[2]), prompt: 'Find the linking verb. Look after it.',
        hint: 'It comes after the linking verb <b>' + p[1] + '</b>.', explain: W.sent(bold(p[0], p[2])), meta: { k: 'g8-predicate-word', s: p[0] } };
    }
    return Q.tiles('After the linking verb, is <b>' + p[2] + '</b> a predicate <b>noun</b> or a predicate <b>adjective</b>?', p[3], [p[3] === 'noun' ? 'adjective' : 'noun'], { fig: W.sent(p[0]),
      prompt: 'Does it rename the subject, or describe it?', hint: 'A predicate noun renames the subject. A predicate adjective describes it.', explain: '<b>' + p[2] + '</b> ' + (p[3] === 'noun' ? 'renames' : 'describes') + ' the subject.', meta: { k: 'g8-predicate', s: p[0], w: p[2] } });
  }
  function linking() {
    var p = R.pick(PRED.filter(tappable)), ws = words(p[0]);
    return { q: 'Tap the <b>linking verb</b>.', fig: W.sent(p[0]), type: 'tap', tiles: ws, answer: ws.indexOf(p[1]), prompt: 'Which word joins the subject to what is said about it?',
      hint: 'Linking verbs: is, was, became, seems, looks, sounds, tastes, smells, feels, grows.', explain: W.sent(bold(p[0], p[1])), meta: { k: 'g8-linking', s: p[0] } };
  }
  function predTf() {
    var p = R.pick(PRED), right = R.int(0, 1) === 1, said = right ? p[3] : (p[3] === 'noun' ? 'adjective' : 'noun');
    return { q: Q.name() + ' says <b>' + p[2] + '</b> is a predicate <b>' + said + '</b>.', fig: W.sent(p[0]), type: 'tf', answer: right,
      why: { options: ['It ' + (p[3] === 'noun' ? 'renames' : 'describes') + ' the subject.', 'Every word after a verb is an adjective.'], answer: 0 }, hint: 'Rename or describe?',
      explain: '<b>' + p[2] + '</b>: a predicate ' + p[3] + '.', meta: { k: 'g8-predicate-tf', s: p[0], w: p[2], said: said } };
  }
  function pickPredAdj(lv) {
    var adj = R.some(PRED.filter(function (p) { return p[3] === 'adjective'; }), 2), nouns = R.some(PRED.filter(function (p) { return p[3] === 'noun'; }), lv > 1 ? 2 : 1);
    return Q.all('Pick every sentence with a <b>predicate adjective</b>.', adj.map(function (p) { return p[0]; }), nouns.map(function (p) { return p[0]; }), {
      hint: 'A predicate adjective describes the subject.', explain: adj.map(function (p) { return W.sent(bold(p[0], p[2])); }).join(''), meta: { k: 'g8-pick-pred-adj' } });
  }

  /* ---------- phrases ---------- */
  function phraseWords(p, lv) {
    var rest = p[0].replace(/[.,]/g, '').replace(p[1] + ' ', '').replace(' ' + p[1], '').split(' ');
    return [rest.slice(0, 2).join(' '), rest.slice(-2).join(' ')].slice(0, lv > 1 ? 2 : 1);
  }
  /* level 1 asks what the phrase tells; higher levels ask the child to find it */
  function phrase(lv) {
    var p = R.pick(PHR);
    if (lv > 1) return Q.one('Which words are the <b>phrase</b> that tells <b>' + p[2] + '</b>?', p[1], phraseWords(p, lv), { fig: W.sent(p[0]), prompt: 'Ask: ' + p[2] + '?',
      hint: 'It often starts with a word like along, under, after, during, with or very.', explain: W.sent(p[0].replace(p[1], '<mark class="hl">' + p[1] + '</mark>')), meta: { k: 'g8-phrase', s: p[0], tells: p[2] } });
    return Q.tiles('What does <b>' + p[1] + '</b> tell?', p[2], TELLS.filter(function (x) { return x !== p[2]; }), { fig: W.sent(p[0]),
      prompt: 'Ask: where? when? how?', hint: 'Ask: where? when? how?', explain: '<b>' + p[1] + '</b> tells ' + p[2] + '.', meta: { k: 'g8-phrase-tells', ph: p[1] } });
  }
  function whichPhrase() {
    var t = R.pick(TELLS), right = R.pick(PHR.filter(function (p) { return p[2] === t; })), wrong = TELLS.filter(function (x) { return x !== t; }).map(function (x) { return R.pick(PHR.filter(function (p) { return p[2] === x; }))[1]; });
    return Q.one('Which phrase tells <b>' + t + '</b>?', right[1], wrong, { prompt: 'Ask ' + t + '? of each one.', hint: 'Where: along, under, beside. When: after, during, until. How: very, with.',
      explain: W.sent(right[0].replace(right[1], '<mark class="hl">' + right[1] + '</mark>')), meta: { k: 'g8-which-phrase', tells: t } });
  }
  function phraseMatch() {
    var ps = TELLS.map(function (t) { return R.pick(PHR.filter(function (p) { return p[2] === t; })); });
    return { q: 'Match each phrase to what it tells.', type: 'match', pairs: ps.map(function (p) { return [p[1], p[2]]; }), hint: 'Ask where, when or how.', explain: 'Phrases add detail without a new sentence.', meta: { k: 'g8-phrase-match' } };
  }
  function phraseTf() {
    var p = R.pick(PHR), right = R.int(0, 1) === 1, said = right ? p[2] : R.pick(TELLS.filter(function (x) { return x !== p[2]; }));
    return { q: Q.name() + ' says <b>' + p[1] + '</b> tells <b>' + said + '</b>.', fig: W.sent(p[0]), type: 'tf', answer: right,
      why: { options: ['It answers the question ' + p[2] + '?', 'Every phrase tells where.'], answer: 0 }, hint: 'Ask where, when or how.',
      explain: '<b>' + p[1] + '</b> tells ' + p[2] + '.', meta: { k: 'g8-phrase-tells-tf', ph: p[1], said: said } };
  }

  /* ---------- -self pronouns ---------- */
  /* level 1 names the kind; higher levels ask the removal test */
  function self(lv) {
    var s = R.pick(SELF);
    if (lv > 1) return Q.tiles('Take out <b>' + s[1] + '</b>. Does the sentence still work?', s[2] === 'intensive' ? 'yes: it is intensive' : 'no: it is reflexive', [s[2] === 'intensive' ? 'no: it is reflexive' : 'yes: it is intensive'], {
      fig: W.sent(bold(s[0], s[1])), prompt: 'Read it aloud without the -self word.', hint: 'An intensive pronoun only adds emphasis.', explain: W.sent(s[0].replace(' ' + s[1], '')), meta: { k: 'g8-self-remove', s: s[0], w: s[1] } });
    return Q.tiles('Is <b>' + s[1] + '</b> reflexive or intensive?', s[2], [s[2] === 'reflexive' ? 'intensive' : 'reflexive'], { fig: W.sent(bold(s[0], s[1])),
      prompt: 'Take it out. Does the sentence still work?', hint: 'Reflexive: the action comes back to the subject. Intensive: it adds emphasis and can be removed.', explain: s[2] === 'intensive' ? 'You can remove it: it adds emphasis.' : 'The action comes back to the subject.', meta: { k: 'g8-self', s: s[0], w: s[1] } });
  }
  function selfTf() {
    var s = R.pick(SELF), right = R.int(0, 1) === 1, said = right ? s[2] : (s[2] === 'reflexive' ? 'intensive' : 'reflexive');
    return { q: Q.name() + ' says <b>' + s[1] + '</b> is <b>' + said + '</b> here.', fig: W.sent(bold(s[0], s[1])), type: 'tf', answer: right,
      why: { options: [s[2] === 'intensive' ? 'It only adds emphasis; you can take it out.' : 'The action comes back to the subject.', 'All -self words do the same job.'], answer: 0 },
      hint: 'Take it out. Does the sentence still work?', explain: '<b>' + s[1] + '</b>: ' + s[2] + '.', meta: { k: 'g8-self-tf', s: s[0], w: s[1], said: said } };
  }
  function selfRight(lv) {
    var s = R.pick(SELF);
    return Q.one('Which sentence uses a -self word <b>correctly</b>?', s[0], R.some(MISUSE, lv > 1 ? 2 : 1), { prompt: 'Does the -self word point back to the subject, or add emphasis?',
      hint: 'Use me or I, not myself, when you are just naming people.', explain: W.sent(bold(s[0], s[1])), meta: { k: 'g8-self-right' } });
  }
  function pickIntensive(lv) {
    var i = R.some(SELF.filter(function (s) { return s[2] === 'intensive'; }), 2), r = R.some(SELF.filter(function (s) { return s[2] === 'reflexive'; }), lv > 1 ? 2 : 1);
    return Q.all('Pick every sentence with an <b>intensive</b> pronoun.', i.map(function (s) { return s[0]; }), r.map(function (s) { return s[0]; }), {
      hint: 'You could take an intensive pronoun out.', explain: i.map(function (s) { return W.sent(bold(s[0], s[1])); }).join(''), meta: { k: 'g8-pick-intensive' } });
  }

  var V0 = VOICE[0], V12 = VOICE[12];
  Atlas.register('grammar', {
    full: true,
    lessons: [{
      id: 'voice', title: 'Active and passive voice', sub: 'Who does the action, and who receives it.',
      concepts: [
        { slug: 'active', title: 'Active voice: the subject does the action', exp: ['B3.2'], skill: 'active',
          model: [
            step(W.sent('<b>The beaver</b> built the dam.'), 'Who built it? The beaver.'),
            step(W.chain(['The beaver', 'built', 'the dam'], ['Doer', 'Action', 'Receiver']), 'The doer comes first.'),
            step(W.sent('<b>The fox</b> caught the rabbit.'), 'Who caught it? The fox.'),
            step(W.chain(['The fox', 'caught', 'the rabbit'], ['Doer', 'Action', 'Receiver']), 'Clear and direct.')
          ],
          guided: [whichVoice, function () { return whichActive(1); }, voiceTf],
          check: [whichVoice, function () { return pickActive(1); }, voiceTf, function () { return whichActive(2); }, function () { return pickActive(2); }],
          coach: '<p>Ask "Who did it?" If the answer comes first in the sentence, it is active.</p>',
          mistake: '<p>Thinking past tense means passive. "The beaver built the dam" is past and active.</p>' },
        { slug: 'passive', title: 'Passive voice: the subject receives the action', exp: ['B3.2'], skill: 'passive',
          model: [
            step(W.sent('<b>The dam</b> <mark class="hl">was built</mark> by the beaver.'), 'The dam did nothing.'),
            step(W.tile('was') + ' ' + W.tile('built'), 'was or were, plus an action word.'),
            step(W.sent('The dam was built by <mark class="hl">the beaver</mark>.'), 'The doer comes after <b>by</b>, or is left out.'),
            step(W.sent('<b>The rabbit</b> <mark class="hl">was caught</mark> by the fox.'), 'Who caught it? Look after <b>by</b>.')
          ],
          guided: [role, function () { return whichPassive(1); }, passiveTf],
          check: [role, pickPassive, passiveTf, function () { return whichPassive(2); }, role],
          coach: '<p>Passive voice is useful when the doer is unknown or unimportant ("The window was broken."), and common in science reports.</p>',
          mistake: '<p>Using passive voice everywhere, which makes writing wordy and vague.</p>' },
        { slug: 'change', title: 'Switch between active and passive', exp: ['B3.2'], skill: 'switch',
          model: [
            step(W.sent(V0[1]), 'Passive.'),
            step(W.sent('The dam was built by <mark class="hl">the beaver</mark>.'), 'Find the doer.'),
            step(W.sent('<mark class="hl">The beaver</mark> built the dam.'), 'Put the doer first.'),
            step(W.sent(V12[0]), 'Active.'),
            step(W.sent(V12[1]), 'Receiver first, then <b>was caught by</b>.')
          ],
          guided: [function () { return change(1); }, buildActive, changeTf],
          check: [function () { return change(2); }, buildActive, changeTf, function () { return spotSwap(2); }, function () { return change(2); }],
          coach: '<p>When revising, change two or three passive sentences to active and read both aloud. Which is clearer?</p>',
          mistake: '<p>Swapping the nouns but keeping the verb ("The dam built the beaver"). Check that the meaning stayed the same.</p>' }
      ]
    }, {
      id: 'verbals', title: 'Gerunds and participles', sub: 'Verb forms that do other jobs.',
      concepts: [
        { slug: 'gerund', title: 'A gerund is an -ing verb used as a noun', exp: ['B3.2'], skill: 'gerunds',
          model: [
            step(W.sent('<b>Running</b> is my favourite summer activity.'), 'It names an activity.'),
            step(W.sent('<b>This activity</b> is my favourite summer activity.'), 'Swap test: it still works.'),
            step(W.sent('Kai enjoys <b>sketching</b> birds.'), 'Enjoys what? Sketching.'),
            step(W.sent('Kai enjoys <b>this activity</b>.'), 'Swap test again.')
          ],
          guided: [gerundOrNot, tapGerund, gerundTf],
          check: [gerundOrNot, tapGerund, gerundTf, function () { return pickGerunds(2); }, gerundOrNot],
          coach: '<p>Test: replace the -ing word with "it" or "this activity". If the sentence still works, it is a gerund.</p>',
          mistake: '<p>Calling every -ing word a gerund.</p>' },
        { slug: 'participle', title: 'A participle describes a noun', exp: ['B3.2'], skill: 'participles',
          model: [
            step(W.sent('The <b>barking</b> dog woke the baby.'), 'Which dog? The barking one.'),
            step(W.sent('The girl <b>holding the map</b> led the group.'), 'It can come after the noun, too.'),
            step(W.sent('Mei <mark class="hl">is painting</mark> a mural.'), 'With is or was: part of the verb.'),
            step(W.sent('The <b>howling</b> wind kept us awake.') + W.sent('The wind <mark class="hl">was howling</mark> all night.'), 'Same word, two jobs.')
          ],
          guided: [function () { return ingUse(1); }, tapParticiple, participleNoun],
          check: [function () { return ingUse(2); }, tapParticiple, matchIng, participleNoun, function () { return ingUse(2); }],
          coach: '<p>Ask "Which one?" A participle answers it: which dog, which girl.</p>',
          mistake: '<p>Mixing up a participle with part of the verb. Look for is, are, was or were just before it.</p>' }
      ]
    }, {
      id: 'parts', title: 'Parts of a sentence', sub: 'Objects, predicates, phrases and -self pronouns.',
      concepts: [
        { slug: 'objects', title: 'Direct and indirect objects', exp: ['B3.2'], skill: 'objects',
          model: [
            step(W.sent('They gave me <b>a pencil</b>.'), 'Gave what? A pencil: the direct object.'),
            step(W.sent('They gave <b>me</b> a pencil.'), 'Gave it to whom? Me: the indirect object.'),
            step(W.sent('They gave a pencil <b>to me</b>.'), 'The to test.'),
            step(W.sent('Dad made <b>us</b> <b>pancakes</b>.') + W.sent('Dad made pancakes <b>for us</b>.'), 'Some verbs take <b>for</b>.')
          ],
          guided: [object, objectKind, objectTo],
          check: [object, objectKind, objectTf, objectTo, object],
          coach: '<p>Rewrite with "to" or "for": "They gave a pencil to me." The word after "to" is the indirect object.</p>',
          mistake: '<p>Choosing the first noun after the verb as the direct object every time.</p>' },
        { slug: 'predicate', title: 'After a linking verb: rename or describe', exp: ['B3.2'], skill: 'predicates',
          model: [
            step(W.tile('is') + ' ' + W.tile('seems') + ' ' + W.tile('became') + ' ' + W.tile('sounds'), 'Linking verbs: no action.'),
            step(W.sent('Her aunt is <b>a pilot</b>.'), 'Aunt = pilot: a predicate noun.'),
            step(W.sent('That music sounds <b>wonderful</b>.'), 'Describes the music: a predicate adjective.'),
            step(W.sent('Kai became <b>the captain</b>.'), 'Kai = captain: a noun.'),
            step(W.sent('The night grew <b>cold</b>.'), 'Describes the night: an adjective.')
          ],
          guided: [function () { return predicate(1); }, linking, predTf],
          check: [function () { return predicate(2); }, linking, predTf, function () { return pickPredAdj(2); }, function () { return predicate(1); }],
          coach: '<p>Replace the linking verb with an equals sign. If both sides name the same thing, it is a predicate noun.</p>',
          mistake: '<p>Treating "sounds", "looks" and "tastes" as action verbs when they link.</p>' },
        { slug: 'phrases', title: 'Phrases tell where, when or how', exp: ['B3.2'], skill: 'phrases',
          model: [
            step(W.sent('We hiked <mark class="hl">along the river</mark>.'), 'Where? A prepositional phrase.'),
            step(W.sent('<mark class="hl">After lunch</mark>, the class went outside.'), 'When?'),
            step(W.sent('The crowd was cheering <mark class="hl">very loudly</mark>.'), 'How? An adverbial phrase.'),
            step(W.sent('He carried the eggs <mark class="hl">with great care</mark>.'), 'How, again.')
          ],
          guided: [function () { return phrase(1); }, whichPhrase, phraseTf],
          check: [function () { return phrase(2); }, whichPhrase, phraseTf, phraseMatch, function () { return phrase(2); }],
          coach: '<p>Phrases let a writer add detail without starting a new sentence. Have the child add one where, when and how phrase to a plain sentence.</p>',
          mistake: '<p>Stopping the phrase too early ("along") or running it into the next idea.</p>' },
        { slug: 'self', title: 'Reflexive or intensive?', exp: ['B3.2'], skill: 'self-pronouns',
          model: [
            step(W.sent('She bought <b>herself</b> a mango.'), 'Reflexive: the action comes back to her.'),
            step(W.sent('The author <b>herself</b> signed my copy.'), 'Intensive: it adds emphasis.'),
            step(W.sent('The author signed my copy.'), 'Remove an intensive and the sentence still works.'),
            step(W.sent('He hurt <b>himself</b> on the ice.') + W.sent('He hurt on the ice.'), 'Remove a reflexive and it breaks.')
          ],
          guided: [function () { return self(1); }, selfTf, function () { return selfRight(1); }],
          check: [function () { return self(2); }, selfTf, function () { return pickIntensive(2); }, function () { return selfRight(2); }, function () { return self(1); }],
          coach: '<p>Cover the -self word. If the sentence still makes complete sense, it is intensive.</p>',
          mistake: '<p>Using "myself" instead of "me" ("Send it to Kai and myself"). Use -self words only for these two jobs.</p>' }
      ]
    }],
    practice: [
      { id: 'active', name: 'Active voice', code: 'B3.2', gen: whichVoice },
      { id: 'passive', name: 'Passive voice', code: 'B3.2', gen: role },
      { id: 'switch', name: 'Switching voice', code: 'B3.2', gen: change },
      { id: 'gerunds', name: 'Gerunds', code: 'B3.2', gen: gerundOrNot },
      { id: 'participles', name: 'Participles', code: 'B3.2', gen: ingUse },
      { id: 'objects', name: 'Direct and indirect objects', code: 'B3.2', gen: object },
      { id: 'predicates', name: 'Predicate nouns and adjectives', code: 'B3.2', gen: predicate },
      { id: 'phrases', name: 'Phrases', code: 'B3.2', gen: phrase },
      { id: 'self-pronouns', name: 'Reflexive and intensive pronouns', code: 'B3.2', gen: self }
    ]
  });

  Q.shapes('grammar', {
    active: [[1, 'which', whichActive], [1, 'true-false', voiceTf], [2, 'pick', pickActive]],
    passive: [[1, 'which', whichPassive], [1, 'true-false', passiveTf], [2, 'pick', pickPassive]],
    switch: [[1, 'build', buildActive], [1, 'true-false', changeTf], [2, 'spot-the-swap', spotSwap]],
    gerunds: [[1, 'tap', tapGerund], [1, 'true-false', gerundTf], [2, 'pick', pickGerunds]],
    participles: [[1, 'tap', tapParticiple], [1, 'which-noun', participleNoun], [2, 'match', matchIng]],
    objects: [[1, 'kind', objectKind], [1, 'with-to', objectTo], [2, 'true-false', objectTf]],
    predicates: [[1, 'linking-verb', linking], [1, 'true-false', predTf], [2, 'pick', pickPredAdj]],
    phrases: [[1, 'which', whichPhrase], [1, 'true-false', phraseTf], [2, 'match', phraseMatch]],
    'self-pronouns': [[1, 'true-false', selfTf], [1, 'correct-use', selfRight], [2, 'pick', pickIntensive]]
  });
})();
