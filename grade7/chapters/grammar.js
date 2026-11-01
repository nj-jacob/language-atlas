/* Grade 7: grammar. Indirect objects, predicate nouns and predicate adjectives, participles, and adverbial phrases.
   Ontario 2023 Language, Grade 7, B3.2 "demonstrate an understanding of the functions of parts of speech in sentences, including indirect objects and
   predicate nouns, predicate adjectives, participles, and adverbial phrases, and use this knowledge to support comprehension and communicate meaning clearly".
   All sentences are written for this site. Answer checks: tests/verify/grade7-grammar.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* ---------- objects: [subject, verb, indirect object, direct object] ---------- */
  var OBJ = [['Ms. Chen', 'gave', 'the class', 'a quiz'], ['Priya', 'sent', 'her cousin', 'a postcard'], ['The coach', 'handed', 'Kai', 'the trophy'],
    ['Our neighbour', 'baked', 'my family', 'a pie'], ['Theo', 'showed', 'the judges', 'his robot'], ['Grandpa', 'told', 'my sister', 'a funny story'], ['Mom', 'bought', 'my brother', 'new skates'],
    ['Jamal', 'wrote', 'his grandmother', 'a letter'], ['The librarian', 'lent', 'Mei', 'a novel'], ['Dad', 'made', 'the team', 'bannock'], ['Ms. Roy', 'offered', 'the students', 'a choice'],
    ['Ana', 'brought', 'her teacher', 'a plant'], ['The elder', 'taught', 'the children', 'a song'], ['Lucas', 'threw', 'the dog', 'a stick'], ['Zara', 'read', 'her little brother', 'a story'],
    ['Our principal', 'gave', 'every class', 'a garden bed']];
  var FOR = ['baked', 'bought', 'made'];
  function sent(o) { return o.join(' ') + '.'; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  /* a subject moved later in the sentence: "The coach" becomes "the coach", names stay as they are */
  function low(s) { return /^(The|Our|My) /.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s; }
  function tapObject(lv, which) {
    var o = R.pick(OBJ), io = which === undefined ? R.int(0, 1) === 1 : which;
    return { q: 'Tap the <b>' + (io ? 'indirect' : 'direct') + ' object</b>.', fig: W.sent(sent(o)), type: 'tap', tiles: o.slice(), answer: io ? 2 : 3,
      prompt: io ? 'Ask: to whom or for whom?' : 'Ask: ' + o[1] + ' what?', hint: 'Direct object: what was ' + o[1] + '. Indirect object: who received it.',
      explain: '<b>' + o[3] + '</b> is the direct object. <b>' + o[2] + '</b> is the indirect object.', meta: { k: 'g7-tap-object', io: io } };
  }
  function receives(lv) {
    var o = R.pick(OBJ);
    return Q.one('In this sentence, who or what <b>receives</b> ' + o[3] + '?', o[2], [o[0]].concat(lv > 1 ? [R.pick(OBJ.filter(function (x) { return x !== o; }))[2]] : []), { fig: W.sent(sent(o)),
      hint: 'The indirect object comes between the verb and the direct object.', explain: '<b>' + o[2] + '</b> receives it: the indirect object.', meta: { k: 'g7-receives', s: sent(o) } });
  }
  function sameMeaning(lv) {
    var o = R.pick(OBJ), to = FOR.indexOf(o[1]) >= 0 ? 'for' : 'to', right = o[0] + ' ' + o[1] + ' ' + o[3] + ' ' + to + ' ' + o[2] + '.';
    var wrong = [cap(o[2]) + ' ' + o[1] + ' ' + low(o[0]) + ' ' + o[3] + '.', o[0] + ' ' + o[1] + ' ' + o[2] + ' to ' + o[3] + '.'];
    return Q.one('Which sentence means the same?', right, wrong.slice(0, lv > 1 ? 2 : 1), { fig: W.sent(sent(o)), hint: 'The indirect object can move after <b>to</b> or <b>for</b>.',
      explain: W.sent(right), meta: { k: 'g7-same-meaning', s: sent(o) } });
  }
  function objTf() {
    var o = R.pick(OBJ), right = R.int(0, 1) === 1, said = right ? o[2] : o[3];
    return { q: Q.name() + ' says:', fig: W.sent(sent(o)) + W.sent('The indirect object is <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: [o[2] + ' receives ' + o[3] + '.', o[3] + ' receives ' + o[2] + '.'], answer: 0 },
      hint: 'Who received something?', explain: '<b>' + o[2] + '</b> is the indirect object.', meta: { k: 'g7-obj-tf', s: sent(o), said: said } };
  }

  /* ---------- after a linking verb: [subject, linking verb, the word after it] ---------- */
  var PRED = [['Her aunt', 'is', 'a pilot'], ['My brother', 'is', 'the captain'], ['Ms. Okafor', 'became', 'the principal'], ['That song', 'was', 'a hit'], ['Tala', 'is', 'an artist'],
    ['The soup', 'smells', 'delicious'], ['The lake', 'became', 'calm'], ['The forecast', 'seems', 'accurate'], ['The trail', 'looks', 'muddy'], ['Arjun', 'felt', 'nervous'],
    ['Our team', 'became', 'the champions'], ['Mr. Singh', 'is', 'a firefighter'], ['Ms. Bell', 'was', 'a nurse'], ['That book', 'became', 'a movie'],
    ['The puppy', 'seems', 'sleepy'], ['The ice', 'looks', 'thin'], ['The bread', 'smells', 'fresh'], ['The water', 'felt', 'icy']];
  function isNoun(p) { return /^(a|an|the) /.test(p[2]); }
  function predKind(lv) {
    var p = R.pick(PRED), n = isNoun(p);
    return { q: 'What is <b>' + p[2] + '</b> in this sentence?', fig: W.sent(p.join(' ') + '.'), type: 'tap', tiles: ['a predicate noun: it renames the subject', 'a predicate adjective: it describes the subject'], answer: n ? 0 : 1,
      prompt: 'Is ' + p[2] + ' another name for ' + low(p[0]) + ', or a description?', hint: 'A predicate noun names. A predicate adjective describes.',
      explain: p[0] + ' = ' + p[2] + ': ' + (n ? 'it renames the subject.' : 'it describes the subject.'), meta: { k: 'g7-pred-kind', p: p[2] } };
  }
  function tapLinking() {
    var p = R.pick(PRED), tiles = [p[0], p[1], p[2]];
    return { q: 'Tap the <b>linking verb</b>.', fig: W.sent(p.join(' ') + '.'), type: 'tap', tiles: tiles, answer: 1, hint: 'A linking verb joins the subject to a word that names or describes it: is, was, became, seems, looks, feels.',
      explain: '<b>' + p[1] + '</b> links ' + low(p[0]) + ' and ' + p[2] + '.', meta: { k: 'g7-tap-linking' } };
  }
  function predPick() {
    var adj = R.int(0, 1) === 1, right = R.some(PRED.filter(function (p) { return isNoun(p) !== adj; }), 2), wrong = R.some(PRED.filter(function (p) { return isNoun(p) === adj; }), 2);
    return Q.all('Pick every sentence with a <b>predicate ' + (adj ? 'adjective' : 'noun') + '</b>.', right.map(function (p) { return p.join(' ') + '.'; }), wrong.map(function (p) { return p.join(' ') + '.'; }), {
      hint: adj ? 'Look for a describing word after the linking verb.' : 'Look for a naming word (a, an, the + noun) after the linking verb.', explain: adj ? 'Predicate adjectives describe.' : 'Predicate nouns rename.', meta: { k: 'g7-pred-pick', adj: adj } });
  }
  function predTf() {
    var p = R.pick(PRED), right = R.int(0, 1) === 1, said = right === isNoun(p) ? 'noun' : 'adjective';
    return { q: Q.name() + ' says:', fig: W.sent(p.join(' ') + '.') + W.sent('<b>' + p[2] + '</b> is a predicate ' + said + '.'), type: 'tf', answer: right,
      why: { options: [p[2] + ' renames ' + low(p[0]) + '.', p[2] + ' describes ' + low(p[0]) + '.'], answer: isNoun(p) ? 0 : 1 },
      hint: 'Does it rename or describe?', explain: '<b>' + p[2] + '</b> is a predicate ' + (isNoun(p) ? 'noun' : 'adjective') + '.', meta: { k: 'g7-pred-tf', p: p[2], said: said } };
  }

  /* ---------- participles: [sentence, participle, the noun it describes, another noun or verb in the sentence, the main verb] ---------- */
  var PART = [['The frozen pond glittered in the sun.', 'frozen', 'pond', 'sun', 'glittered'], ['We heard a barking dog behind the fence.', 'barking', 'dog', 'fence', 'heard'],
    ['The broken window let in the cold.', 'broken', 'window', 'cold', 'let'], ['The rising sun lit the lake.', 'rising', 'sun', 'lake', 'lit'],
    ['Shivering in the wind, Kai waited for the bus.', 'Shivering', 'Kai', 'bus', 'waited'], ['The canoe, filled with water, sank slowly.', 'filled', 'canoe', 'water', 'sank'],
    ['Tired from the hike, the campers fell asleep.', 'Tired', 'campers', 'hike', 'fell'], ['The girl holding the flag is my cousin.', 'holding', 'girl', 'flag', 'is'],
    ['The melting snow flooded the path.', 'melting', 'snow', 'path', 'flooded'], ['A smiling volunteer opened the door.', 'smiling', 'volunteer', 'door', 'opened'],
    ['The stolen bike turned up in the park.', 'stolen', 'bike', 'park', 'turned'], ['Excited by the news, Amir called his friend.', 'Excited', 'Amir', 'friend', 'called'],
    ['The howling wind rattled the windows.', 'howling', 'wind', 'windows', 'rattled'], ['The hikers crossed the fallen tree.', 'fallen', 'tree', 'hikers', 'crossed']];
  /* the same verb forms used as part of the verb, after a helping verb: not participles describing a noun */
  var VERBISH = [['Kai is shivering in the wind.', 'shivering'], ['The dog was barking all night.', 'barking'], ['The pond has frozen solid.', 'frozen'],
    ['The sun is rising over the lake.', 'rising'], ['Someone has broken the window.', 'broken'], ['The girl is holding the flag.', 'holding'], ['The snow was melting fast.', 'melting']];
  function partOrVerb() {
    var verb = R.int(0, 1) === 1, p = verb ? R.pick(VERBISH) : R.pick(PART), s = p[0], w = p[1];
    return { q: 'Here, is <b>' + w + '</b> a participle describing a noun?', fig: W.sent(s), type: 'tap', tiles: ['Yes: it describes a noun', 'No: it is part of the verb'], answer: verb ? 1 : 0,
      hint: 'Is there a helping verb (is, was, has) right before it?', explain: verb ? 'A helping verb comes before it: part of the verb.' : '<b>' + w + '</b> describes <b>' + p[2] + '</b>.', meta: { k: 'g7-part-or-verb', s: s, w: w } };
  }
  function tapParticiple() {
    var p = R.pick(PART);
    return Q.tiles('Which word is a <b>participle</b> describing a noun?', p[1], [p[4], p[2]], { fig: W.sent(p[0]), prompt: 'Find the verb form that tells what kind.', hint: 'A participle often ends in -ing, -ed or -en, and it describes a noun.',
      explain: '<b>' + p[1] + '</b> describes <b>' + p[2] + '</b>.', meta: { k: 'g7-tap-participle', s: p[0] } });
  }
  function describes(lv) {
    var p = R.pick(PART);
    return Q.tiles('Which noun does <b>' + p[1] + '</b> describe?', p[2], [p[3]], { fig: W.sent(p[0]), hint: 'Ask: who or what was ' + p[1].toLowerCase() + '?',
      explain: 'The <b>' + p[2] + '</b> was ' + p[1].toLowerCase() + '.', meta: { k: 'g7-describes', s: p[0] } });
  }
  /* a participial phrase at the start must describe the subject that comes right after it:
     [clear sentence, unclear sentence, who the phrase should describe, what it describes in the unclear one] */
  var DANGLE = [['Walking to school, I got soaked by the rain.', 'Walking to school, the rain soaked me.', 'I', 'the rain'],
    ['Hanging on the wall, the painting caught my eye.', 'Hanging on the wall, I noticed the painting.', 'the painting', 'I'],
    ['Hearing the bell, the students lined up.', 'Hearing the bell, the line formed quickly.', 'the students', 'the line'],
    ['Paddling hard, we reached the island before dark.', 'Paddling hard, the island came into view.', 'we', 'the island'],
    ['Covered in mud, the dog ran into the kitchen.', 'Covered in mud, Mom chased the dog out of the kitchen.', 'the dog', 'Mom'],
    ['Tired after the game, Noor went straight to bed.', 'Tired after the game, the bed looked inviting.', 'Noor', 'the bed'],
    ['Looking out the window, Kai saw a moose.', 'Looking out the window, a moose appeared.', 'Kai', 'a moose'],
    ['Baked this morning, the bread was still warm.', 'Baked this morning, I ate the warm bread.', 'the bread', 'I'],
    ['Running for the bus, Ana dropped her mitt.', 'Running for the bus, the mitt fell in the snow.', 'Ana', 'the mitt'],
    ['Excited about the trip, the class packed early.', 'Excited about the trip, the bags were packed early.', 'the class', 'the bags']];
  function opening(d) { return d[0].split(', ')[0]; }
  function dangling() {
    var d = R.pick(DANGLE);
    return Q.one('Which sentence is clear?', d[0], [d[1]], { prompt: 'Who is doing the action in the opening phrase?', hint: 'The noun right after the comma must be the one doing the action.',
      explain: W.sent(d[0]), meta: { k: 'g7-dangling', s: d[0] } });
  }
  function openWho() {
    var d = R.pick(DANGLE);
    return Q.tiles('Who or what does <b>' + opening(d) + '</b> describe?', d[2], [d[3]], { fig: W.sent(d[0]), hint: 'Look right after the comma.',
      explain: '<b>' + opening(d) + '</b>: ' + d[2] + '.', meta: { k: 'g7-open-who', s: d[0] } });
  }
  function openWrong() {
    var d = R.pick(DANGLE);
    return Q.tiles('This sentence is unclear. Which noun does the opening phrase describe by mistake?', d[3], [d[2]], { fig: W.sent(d[1]), hint: 'The opening phrase always describes the noun right after the comma.',
      explain: 'It says <b>' + d[3] + '</b> was the one. Clear: ' + d[0], meta: { k: 'g7-open-wrong', s: d[1] } });
  }
  function openTf() {
    var d = R.pick(DANGLE), right = R.int(0, 1) === 1, clear = R.int(0, 1) === 1, s = clear ? d[0] : d[1], said = right === clear;
    return { q: Q.name() + ' says this sentence is <b>' + (said ? 'clear' : 'unclear') + '</b>.', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['The noun after the comma ' + (said ? 'is' : 'is not') + ' the one doing the action.', 'The noun after the comma ' + (said ? 'is not' : 'is') + ' the one doing the action.'], answer: right ? 0 : 1 },
      hint: 'Can the noun after the comma do the action in the opening phrase?', explain: W.sent(d[0]), meta: { k: 'g7-open-tf', s: s, clear: said } };
  }
  function partTf() {
    var p = R.pick(PART), right = R.int(0, 1) === 1, said = right ? p[2] : p[3];
    return { q: Q.name() + ' says:', fig: W.sent(p[0]) + W.sent('<b>' + p[1] + '</b> describes <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['Ask who or what is ' + p[1].toLowerCase() + ': ' + p[2] + '.', 'A participle describes the last noun in the sentence.'], answer: 0 },
      hint: 'Who or what is ' + p[1].toLowerCase() + '?', explain: '<b>' + p[1] + '</b> describes <b>' + p[2] + '</b>.', meta: { k: 'g7-part-tf', s: p[0], said: said } };
  }

  /* ---------- adverbial phrases: [sentence before, phrase, sentence after] ---------- */
  var ADV = [['We left ', 'after lunch', '.'], ['', 'Before sunrise', ', the loons called.'], ['The fox ran ', 'across the frozen lake', '.'], ['The kids played ', 'in the gym', '.'],
    ['She opened the box ', 'with great care', '.'], ['Omar spoke ', 'in a calm voice', '.'], ['He saved his money ', 'to buy a bike', '.'], ['We wore boots ', 'to keep our feet dry', '.'],
    ['We stayed inside ', 'during the storm', '.'], ['The team met ', 'after the final bell', '.'], ['A turtle sunned itself ', 'under the dock', '.'], ['We built a snow fort ', 'behind the school', '.'],
    ['The tree fell ', 'with a loud crash', '.'], ['Ravi packed his bag ', 'in a hurry', '.'], ['We woke up early ', 'to see the eclipse', '.'], ['Lena shovelled the snow ', 'to help her grandfather', '.']];
  var ASK = { 'after lunch': 'when', 'Before sunrise': 'when', 'across the frozen lake': 'where', 'in the gym': 'where', 'with great care': 'how', 'in a calm voice': 'how', 'to buy a bike': 'why', 'to keep our feet dry': 'why',
    'during the storm': 'when', 'after the final bell': 'when', 'under the dock': 'where', 'behind the school': 'where', 'with a loud crash': 'how', 'in a hurry': 'how', 'to see the eclipse': 'why', 'to help her grandfather': 'why' };
  var ASKS = ['when', 'where', 'how', 'why'];
  function advQuestion(lv) {
    var a = R.pick(ADV), ask = ASK[a[1]];
    return Q.tiles('What does the phrase <b>' + a[1] + '</b> tell?', ask, R.some(['when', 'where', 'how', 'why'].filter(function (x) { return x !== ask; }), lv > 1 ? 3 : 2), {
      fig: W.sent(a[0] + '<mark class="hl">' + a[1] + '</mark>' + a[2]), prompt: 'Ask: when? where? how? why?', hint: 'Adverbial phrases tell when, where, how or why.',
      explain: '<b>' + a[1] + '</b> tells <b>' + ask + '</b>.', meta: { k: 'g7-adv-question', phrase: a[1] } });
  }
  function advMatch(lv) {
    var asks = R.some(ASKS, lv > 2 ? 4 : 3), list = asks.map(function (k) { return R.pick(ADV.filter(function (a) { return ASK[a[1]] === k; }))[1]; });
    return { q: 'Match each phrase to what it tells.', type: 'match', pairs: list.map(function (p) { return [p, ASK[p]]; }), hint: 'Ask when, where, how or why of each one.', explain: 'Adverbial phrases add when, where, how or why.', meta: { k: 'g7-adv-match' } };
  }
  function advTf() {
    var a = R.pick(ADV), right = R.int(0, 1) === 1, said = right ? ASK[a[1]] : R.pick(ASKS.filter(function (x) { return x !== ASK[a[1]]; }));
    return { q: Q.name() + ' says the phrase tells <b>' + said + '</b>.', fig: W.sent(a[0] + '<mark class="hl">' + a[1] + '</mark>' + a[2]), type: 'tf', answer: right,
      why: { options: ['The phrase answers ' + said + '?', 'The phrase answers a different question.'], answer: right ? 0 : 1 },
      hint: 'Ask when? where? how? why?', explain: '<b>' + a[1] + '</b> tells <b>' + ASK[a[1]] + '</b>.', meta: { k: 'g7-adv-tf', phrase: a[1], said: said } };
  }
  function advPick() {
    var ask = R.pick(ASKS), right = R.some(ADV.filter(function (a) { return ASK[a[1]] === ask; }), 2).map(function (a) { return a[1]; });
    var wrong = R.some(ADV.filter(function (a) { return ASK[a[1]] !== ask; }), 2).map(function (a) { return a[1]; });
    return Q.all('Pick every phrase that tells <b>' + ask + '</b>.', right, wrong, { hint: 'Try each one after the question ' + ask + '?', explain: 'These tell ' + ask + '.', meta: { k: 'g7-adv-pick', ask: ask } });
  }
  /* a plain sentence and a phrase for each question */
  var ADD = [['Leila finished the puzzle', { when: 'after dinner', where: 'on the kitchen table', how: 'with a steady hand', why: 'to surprise her sister' }],
    ['The loons dove', { when: 'before sunset', where: 'under the water', how: 'with a quiet splash', why: 'to catch fish' }],
    ['Our class planted trees', { when: 'during the spring', where: 'behind the library', how: 'with great care', why: 'to give the birds shade' }]];
  function advAdd(lv) {
    var b = R.pick(ADD), ask = R.pick(ASKS), base = b[0], opts = b[1];
    return Q.one('Add a phrase that tells <b>' + ask + '</b>.', base + ' ' + opts[ask] + '.', Object.keys(opts).filter(function (k) { return k !== ask; }).slice(0, lv > 1 ? 3 : 2).map(function (k) { return base + ' ' + opts[k] + '.'; }), {
      fig: W.sent(base + ' ' + W.gap() + '.'), hint: 'Which phrase answers ' + ask + '?', explain: W.sent(base + ' <b>' + opts[ask] + '</b>.'), meta: { k: 'g7-adv-add', ask: ask, base: base } });
  }

  Atlas.register('grammar', {
    full: true,
    lessons: [{
      id: 'objects', title: 'Objects and predicates', sub: 'Who receives it, and what the subject is.',
      concepts: [
        { slug: 'indirect', title: 'An indirect object receives the direct object', exp: ['B3.2'], skill: 'objects',
          model: [
            step(W.sent('Ms. Chen gave the class a quiz.')),
            step(W.sent('Ms. Chen gave the class <mark class="hl">a quiz</mark>.'), 'Gave what? The <b>direct object</b>.'),
            step(W.sent('Ms. Chen gave <mark class="hl">the class</mark> a quiz.'), 'To whom? The <b>indirect object</b>.'),
            step(W.sent('Dad made <mark class="hl">the team</mark> bannock.'), 'Made what? Bannock. For whom? The team.'),
            step(W.sent('Dad made bannock <b>for</b> the team.'), 'Same meaning, with <b>for</b>.')
          ],
          guided: [function () { return tapObject(1, false); }, function () { return tapObject(1, true); }, objTf],
          check: [function () { return tapObject(2, true); }, function () { return receives(2); }, objTf, function () { return sameMeaning(2); }, function () { return tapObject(3); }],
          coach: '<p>Two questions in order: first "verb what?" (direct object), then "to whom or for whom?" (indirect object).</p>',
          mistake: '<p>Calling the indirect object the direct object because it comes first. It comes first, but it receives.</p>' },
        { slug: 'predicate', title: 'After a linking verb: rename or describe', exp: ['B3.2'], skill: 'predicates',
          model: [
            step(W.sent('Her aunt <b>is</b> a pilot.'), 'aunt = pilot. A <b>predicate noun</b>.'),
            step(W.sent('The soup <b>smells</b> delicious.'), 'Delicious tells what kind. A <b>predicate adjective</b>.'),
            step(W.sent('That book <b>became</b> a movie.'), 'book = movie: a predicate noun.'),
            step(W.sent('The ice <b>looks</b> thin.'), 'Thin describes: a predicate adjective.')
          ],
          guided: [function () { return predKind(1); }, tapLinking, predTf],
          check: [function () { return predKind(2); }, predTf, predPick, tapLinking, function () { return predKind(3); }],
          coach: '<p>Try an equals sign: "aunt = pilot" works, so pilot is a predicate noun. If it only describes, it is an adjective.</p>',
          mistake: '<p>Missing linking verbs other than "is": seems, looks, became, felt and smells can link too.</p>' }
      ]
    }, {
      id: 'phrases', title: 'Participles and adverbial phrases', sub: 'Phrases that add detail.',
      concepts: [
        { slug: 'participle', title: 'A participle is a verb acting as an adjective', exp: ['B3.2'], skill: 'participles',
          model: [
            step(W.sent('The pond froze.'), 'A verb.'),
            step(W.sent('the <b>frozen</b> pond'), 'Now it describes the pond.'),
            step(W.sent('The wind howled.'), 'A verb again.'),
            step(W.sent('the <b>howling</b> wind'), '-ing works too.'),
            step(W.sent('The pond <b>has frozen</b>.'), 'After a helping verb, it is still part of the verb.')
          ],
          guided: [tapParticiple, function () { return describes(1); }, partOrVerb],
          check: [tapParticiple, function () { return describes(2); }, partTf, partOrVerb, tapParticiple],
          coach: '<p>Point to the participle and ask, "Who or what is like that?" The answer is the noun it describes.</p>',
          mistake: '<p>Calling every -ing word a participle. In "Kai is shivering", it is part of the verb.</p>' },
        { slug: 'opening', title: 'An opening phrase describes the next noun', exp: ['B3.2'], skill: 'opening',
          model: [
            step(W.sent('<mark class="hl">Shivering in the wind</mark>, Kai waited.'), 'Who was shivering? Kai.'),
            step(W.sent('Walking to school, <b>the rain</b> soaked me.'), 'The rain was walking? Unclear.'),
            step(W.sent('Walking to school, <b>I</b> got soaked.'), 'Clear.'),
            step(W.sent('Looking out the window, <b>a moose</b> appeared.'), 'A moose looking out the window?'),
            step(W.sent('Looking out the window, <b>Kai</b> saw a moose.'), 'Fixed.')
          ],
          guided: [dangling, openWho, openTf],
          check: [dangling, openWrong, openTf, openWho, dangling],
          coach: '<p>Read the opening phrase, then the noun after the comma, and ask: "Can that noun do that?"</p>',
          mistake: '<p>A dangling phrase that describes the wrong noun. It can make the sentence funny or confusing.</p>' },
        { slug: 'adverbial', title: 'An adverbial phrase tells when, where, how or why', exp: ['B3.2'], skill: 'adverbials',
          model: [
            step(W.sent('We left <mark class="hl">after lunch</mark>.'), 'When.'),
            step(W.sent('The fox ran <mark class="hl">across the frozen lake</mark>.'), 'Where.'),
            step(W.sent('She opened the box <mark class="hl">with great care</mark>.'), 'How.'),
            step(W.sent('We wore boots <mark class="hl">to keep our feet dry</mark>.'), 'Why.')
          ],
          guided: [function () { return advQuestion(1); }, function () { return advAdd(1); }, advTf],
          check: [function () { return advQuestion(2); }, function () { return advMatch(2); }, advTf, advPick, function () { return advAdd(3); }],
          coach: '<p>Write a plain sentence and add one phrase at a time: when, where, how, why. Notice how the picture sharpens.</p>',
          mistake: '<p>Mixing up where and how with "in" phrases: "in the gym" is where; "in a calm voice" is how.</p>' }
      ]
    }],
    practice: [
      { id: 'objects', name: 'Direct and indirect objects', code: 'B3.2', gen: function (lv) { return tapObject(lv); } },
      { id: 'predicates', name: 'Predicate nouns and adjectives', code: 'B3.2', gen: predKind },
      { id: 'participles', name: 'Participles', code: 'B3.2', gen: tapParticiple },
      { id: 'opening', name: 'Opening phrases', code: 'B3.2', gen: dangling },
      { id: 'adverbials', name: 'Adverbial phrases', code: 'B3.2', gen: advQuestion }
    ]
  });

  Q.shapes('grammar', {
    objects: [[1, 'receives', receives], [1, 'true-false', objTf], [2, 'same-meaning', sameMeaning]],
    predicates: [[1, 'linking', tapLinking], [1, 'true-false', predTf], [2, 'pick', predPick]],
    participles: [[1, 'describes', describes], [1, 'participle-or-verb', partOrVerb], [2, 'true-false', partTf]],
    opening: [[1, 'who', openWho], [1, 'true-false', openTf], [2, 'by-mistake', openWrong]],
    adverbials: [[1, 'add', advAdd], [1, 'true-false', advTf], [2, 'match', advMatch], [2, 'pick', advPick]]
  });
})();
