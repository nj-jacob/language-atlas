/* Grade 4: grammar.
   Ontario 2023 Language, Grade 4, B3.2 "demonstrate an understanding of the functions of parts of speech in sentences, including
   relative pronouns, the perfect verb tense and interrogative and imperative verbs, and the use of pronouns as adjectives, and use
   this knowledge to support comprehension and communicate meaning clearly".
   All sentences are written for this site. Answer checks: tests/verify/grade4-grammar.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* ---------- relative pronouns: [sentence with a gap, who or which] ---------- */
  var REL = [['My neighbour, ___ grows tomatoes, gave us a basket.', 'who'], ['Our coach, ___ played in the NHL, taught us to skate backwards.', 'who'],
    ['The pilot, ___ flew us to Iqaluit, waved goodbye.', 'who'], ['My aunt, ___ lives in Halifax, is visiting.', 'who'], ['The doctor, ___ was very kind, checked my ears.', 'who'],
    ['Our canoe, ___ is red, is in the shed.', 'which'], ['The CN Tower, ___ is in Toronto, is very tall.', 'which'], ['My backpack, ___ has a broken zipper, needs fixing.', 'which'],
    ['The library, ___ opens at nine, has new computers.', 'which'], ['The moose, ___ was huge, crossed the road.', 'which'],
    ['Mr. Singh, ___ drives our bus, always says hello.', 'who'], ['My cousin, ___ is twelve, plays lacrosse.', 'who'],
    ['Our garden, ___ gets lots of sun, grows big squash.', 'which'], ['The ferry, ___ leaves at noon, goes to the island.', 'which']];
  function relFill() {
    var r = R.pick(REL);
    return { q: 'Which word fits?', fig: W.sent(r[0].replace('___', W.gap())), type: 'tap', tiles: ['who', 'which'], answer: r[1] === 'who' ? 0 : 1,
      prompt: 'Is it about a person, or a thing or animal?', hint: 'who: a person. which: a thing or an animal.', explain: W.sent(r[0].replace('___', '<b>' + r[1] + '</b>')), meta: { k: 'g4-rel-fill', s: r[0] } };
  }
  function relJoin(lv) {
    var r = R.pick(REL), right = r[0].replace('___', r[1]), other = r[0].replace('___', r[1] === 'who' ? 'which' : 'who');
    return Q.one('Which sentence is correct?', right, [other].concat(lv > 1 ? [r[0].replace('___', 'what')] : []), {
      hint: 'who: a person. which: a thing or an animal.', explain: W.sent(right), meta: { k: 'g4-rel-join', s: r[0] } });
  }
  function relTf() {
    var r = R.pick(REL), right = R.int(0, 1) === 1, w = right ? r[1] : (r[1] === 'who' ? 'which' : 'who'), s = r[0].replace('___', w);
    return { q: 'Is the right relative pronoun used?', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['Use who for people.', 'Use which for things and animals.'], answer: r[1] === 'who' ? 0 : 1 },
      hint: 'Who or what is it about?', explain: W.sent(r[0].replace('___', '<b>' + r[1] + '</b>')), meta: { k: 'g4-rel-tf', s: r[0], used: w } };
  }
  function relPick() {
    var ppl = R.some(REL.filter(function (r) { return r[1] === 'who'; }), 2), things = R.some(REL.filter(function (r) { return r[1] === 'which'; }), 2);
    var name = function (r) { return r[0].split(',')[0]; };
    return Q.all('Pick every one that needs <b>who</b>.', ppl.map(name), things.map(name), { hint: 'who is for people.', explain: 'who: people. which: things and animals.', meta: { k: 'g4-rel-pick' } });
  }
  function relOrder() {
    var r = R.pick(REL), parts = r[0].replace('___', r[1]).split(', ');
    return { q: 'Put the parts in order to make the sentence.', type: 'order', items: [parts[0] + ',', parts[1] + ',', parts[2]],
      hint: 'Who or what first, then the extra detail, then the rest.', explain: W.sent(r[0].replace('___', '<b>' + r[1] + '</b>')), meta: { k: 'g4-rel-order' } };
  }

  /* ---------- the perfect tense: [base, past, with has, have or had] ---------- */
  var VERB = [['eat', 'ate', 'eaten'], ['go', 'went', 'gone'], ['see', 'saw', 'seen'], ['write', 'wrote', 'written'], ['take', 'took', 'taken'], ['swim', 'swam', 'swum'],
    ['fly', 'flew', 'flown'], ['draw', 'drew', 'drawn'], ['ride', 'rode', 'ridden'], ['begin', 'began', 'begun']];
  /* [who, one or more] */
  var WHO = [['Mei', 1], ['The geese', 2], ['I', 2], ['We', 2], ['Our dog', 1], ['They', 2], ['Omar', 1], ['My grandparents', 2], ['The pilot', 1], ['You', 2]];
  var WHAT = { eat: 'lunch', go: 'home', see: 'a moose', write: 'a letter', take: 'the bus', swim: 'across the lake', fly: 'to Winnipeg', draw: 'a map', ride: 'the ferry', begin: 'the puzzle' };
  function helper(w) { return w[1] === 1 ? 'has' : 'have'; }
  function hasHave() {
    var w = R.pick(WHO), v = R.pick(VERB);
    return Q.tiles('Which helping verb fits?', helper(w), [helper(w) === 'has' ? 'have' : 'has'], { fig: W.sent(w[0] + ' ' + W.gap() + ' ' + v[2] + ' ' + WHAT[v[0]] + '.'),
      prompt: 'One person or thing, or more? (I and you use have.)', hint: 'One: has. More than one, I or you: have.', explain: W.sent(w[0] + ' <b>' + helper(w) + '</b> ' + v[2] + ' ' + WHAT[v[0]] + '.'), meta: { k: 'g4-has-have', who: w[0] } });
  }
  function participle(lv) {
    var w = R.pick(WHO), v = R.pick(VERB), h = helper(w);
    return Q.one('Which word fits?', v[2], [v[1], v[0] + 'ed'].concat(lv > 1 ? [v[0]] : []), { fig: W.sent(w[0] + ' ' + h + ' ' + W.gap() + ' ' + WHAT[v[0]] + '.') + W.tile('(' + v[0] + ')'),
      prompt: 'After <b>' + h + '</b>, use the helper form.', hint: 'has or have + eaten, gone, seen, written...', explain: W.sent(w[0] + ' ' + h + ' <b>' + v[2] + '</b> ' + WHAT[v[0]] + '.'), meta: { k: 'g4-participle', verb: v[0] } });
  }
  /* had: finished before something else in the past */
  var HAD = [['By the time we arrived, the movie', 'had started', 'will start', 'is starting'], ['When Dad got home, we', 'had eaten', 'will eat', 'are eating'],
    ['Before the storm hit, the boats', 'had come in', 'will come in', 'are coming in'], ['By lunch, Priya', 'had finished', 'will finish', 'is finishing'],
    ['When the bell rang, the class', 'had left', 'will leave', 'is leaving'], ['Before the snow fell, the geese', 'had flown south', 'will fly south', 'are flying south']];
  function hadBefore() {
    var h = R.pick(HAD), right = h[0] + ' ' + h[1] + '.';
    return Q.one('Which shows it happened <b>before</b> the other thing?', right, [h[0] + ' ' + h[2] + '.', h[0] + ' ' + h[3] + '.'], {
      hint: 'had + a helper form shows the earlier thing.', explain: W.sent(right), meta: { k: 'g4-had', s: h[0] } });
  }
  function perfectTf() {
    var w = R.pick(WHO), v = R.pick(VERB), right = R.int(0, 1) === 1, used = right ? v[2] : v[1], s = w[0] + ' ' + helper(w) + ' ' + used + ' ' + WHAT[v[0]] + '.';
    return { q: 'Is this sentence correct?', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['After has or have, use the helper form (eaten, gone, seen).', 'After has or have, use the simple past (ate, went, saw).'], answer: 0 },
      hint: 'Look at the word after ' + helper(w) + '.', explain: W.sent(w[0] + ' ' + helper(w) + ' <b>' + v[2] + '</b> ' + WHAT[v[0]] + '.'), meta: { k: 'g4-perfect-tf', verb: v[0], used: used } };
  }
  function perfectMatch() {
    var vs = R.some(VERB, 3);
    return { q: 'Match each verb to the form that goes after <b>has</b>.', type: 'match', pairs: vs.map(function (v) { return [v[0], 'has ' + v[2]]; }), hint: 'Think: today I eat, I have eaten.', explain: 'has or have + the helper form.', meta: { k: 'g4-perfect-match' } };
  }

  /* ---------- commands and questions ---------- */
  var KIND = {
    command: ['Close the door, please.', 'Put on your mitts.', 'Wait for the green light.', 'Stir the soup slowly.', 'Bring your library book tomorrow.'],
    question: ['Did you close the door?', 'Can you find my mitts?', 'Will the bus come soon?', 'Have you fed the cat?', 'Is the soup ready?'],
    statement: ['The door is closed.', 'Kai found his mitts.', 'The bus came early.', 'The soup is hot.', 'My library book is due.']
  };
  /* [a telling sentence, the same as a question] */
  var ASK = [['The bus is late.', 'Is the bus late?'], ['You can skate.', 'Can you skate?'], ['The lake is frozen.', 'Is the lake frozen?'], ['They will come.', 'Will they come?'], ['She has finished.', 'Has she finished?'],
    ['The store is open.', 'Is the store open?'], ['We can go now.', 'Can we go now?'], ['He will help.', 'Will he help?'], ['The dog has eaten.', 'Has the dog eaten?']];
  /* commands with the command verb */
  var CMD = [['Please stir the soup slowly.', 'stir'], ['Now close your eyes.', 'close'], ['Always wear a helmet.', 'wear'], ['Carefully pour the water.', 'pour'], ['Please wash your hands.', 'wash'],
    ['Gently pat the puppy.', 'pat'], ['Please hang up your coat.', 'hang']];
  function kindOf() {
    var k = R.pick(['command', 'question', 'statement']), s = R.pick(KIND[k]);
    return Q.tiles('What kind of sentence is this?', k, ['command', 'question', 'statement'].filter(function (x) { return x !== k; }), { fig: W.sent(s),
      prompt: 'Does it tell, ask, or tell someone to do something?', hint: 'A command starts with an action word and tells you to do something.', explain: 'It is a <b>' + k + '</b>.', meta: { k: 'g4-kind', s: s } });
  }
  function makeQuestion(lv) {
    var a = R.pick(ASK), words = a[0].replace('.', '').split(' ');
    return Q.one('Turn it into a question.', a[1], [a[0].replace('.', '?'), words.slice(1).join(' ') + ' ' + words[0].toLowerCase() + '?'].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(a[0]),
      hint: 'Move the helping verb (is, can, will, has) to the front.', explain: W.sent(a[1]), meta: { k: 'g4-make-question', s: a[0] } });
  }
  function tapCommand() {
    var c = R.pick(CMD), words = c[0].replace('.', '').split(' ');
    return { q: 'Tap the <b>command verb</b>: the action you are told to do.', fig: W.sent(c[0]), type: 'tap', tiles: words, answer: words.indexOf(c[1]),
      hint: 'What are you told to do?', explain: '<b>' + c[1] + '</b> is the command verb.', meta: { k: 'g4-tap-command', s: c[0] } };
  }
  function questionTf() {
    var a = R.pick(ASK), right = R.int(0, 1) === 1, s = right ? a[1] : a[0].replace('.', '?');
    return { q: 'True or false? This question is made correctly.', fig: W.sent(a[0]) + W.sent(s), type: 'tf', answer: right,
      why: { options: ['A question moves the helping verb to the front.', 'A question only needs a question mark.'], answer: 0 },
      hint: 'Where is the helping verb?', explain: W.sent(a[1]), meta: { k: 'g4-question-tf', s: a[0], shown: s } };
  }
  function pickCommands() {
    return Q.all('Pick every <b>command</b>.', R.some(KIND.command, 2), R.some(KIND.question, 1).concat(R.some(KIND.statement, 1)), { hint: 'A command tells someone to do something.', explain: 'Commands start with an action word.', meta: { k: 'g4-pick-commands' } });
  }

  /* ---------- pronouns as adjectives: [sentence with a gap, the word] ---------- */
  var OWN = [['Mei lost ___ hat.', 'her'], ['The twins packed ___ lunches.', 'their'], ['The dog wagged ___ tail.', 'its'], ['Owen fixed ___ bike.', 'his'],
    ['We cleaned ___ room.', 'our'], ['I found ___ mitts.', 'my'], ['The birds built ___ nest.', 'their'], ['Leila fed ___ cat.', 'her'], ['The tree lost ___ leaves.', 'its'],
    ['Ravi and I washed ___ boots.', 'our'], ['Grandpa lost ___ glasses.', 'his'], ['The kids hung up ___ coats.', 'their'], ['Can you find ___ shoes?', 'your']];
  var OWNERS = ['my', 'your', 'his', 'her', 'its', 'our', 'their'];
  function ownFill(lv) {
    var o = R.pick(OWN);
    return Q.tiles('Which word fits?', o[1], R.some(OWNERS.filter(function (x) { return x !== o[1]; }), lv > 1 ? 3 : 2), { fig: W.sent(o[0].replace('___', W.gap())),
      prompt: 'Who owns it?', hint: 'One boy: his. One girl: her. A thing or animal: its. More than one: their.', explain: W.sent(o[0].replace('___', '<b>' + o[1] + '</b>')), meta: { k: 'g4-own-fill', s: o[0] } });
  }
  /* sentences where "it is" fits */
  var ITIS = ['I think ___ going to snow.', 'Hurry, ___ almost time to go.', 'The soup smells good, but ___ too hot.'];
  function itsIts() {
    var own = R.int(0, 1) === 1, s = own ? R.pick(OWN.filter(function (x) { return x[1] === 'its'; }))[0] : R.pick(ITIS), right = own ? 'its' : 'it’s';
    return Q.tiles('Which is correct?', right, [own ? 'it’s' : 'its'], { fig: W.sent(s.replace('___', W.gap())), prompt: 'Try "it is" in the gap.',
      hint: 'it’s means "it is". its shows who owns something.', explain: W.sent(s.replace('___', '<b>' + right + '</b>')), meta: { k: 'g4-its', s: s } });
  }
  function tapOwner() {
    var o = R.pick(OWN.filter(function (x) { return x[1] !== 'its'; })), s = o[0].replace('___', o[1]), words = s.replace('.', '').split(' ');
    return { q: 'Tap the word that tells <b>whose</b>.', fig: W.sent(s), type: 'tap', tiles: words, answer: words.indexOf(o[1]),
      hint: 'Look for my, his, her, our or their.', explain: '<b>' + o[1] + '</b> tells whose. It works like an adjective.', meta: { k: 'g4-tap-owner', s: o[0] } };
  }
  function ownTf() {
    var o = R.pick(OWN), right = R.int(0, 1) === 1, w = right ? o[1] : R.pick(OWNERS.filter(function (x) { return x !== o[1]; }));
    return { q: 'True or false? <b>' + w + '</b> fits here.', fig: W.sent(o[0].replace('___', '<b>' + w + '</b>')), type: 'tf', answer: right,
      why: { options: ['The word must match who owns it.', 'Any of these words can go there.'], answer: 0 },
      hint: 'Who owns it? One or more?', explain: W.sent(o[0].replace('___', '<b>' + o[1] + '</b>')), meta: { k: 'g4-own-tf', s: o[0], used: w } };
  }
  function ownMatch() {
    return { q: 'Match each owner to the word you would use.', type: 'match', pairs: R.shuffle([['Owen', 'his'], ['Leila', 'her'], ['the two dogs', 'their'], ['the bird', 'its']]).slice(0, 3),
      hint: 'One boy, one girl, an animal, or more than one?', explain: 'his, her, its, their.', meta: { k: 'g4-own-match' } };
  }

  Atlas.register('grammar', {
    full: true,
    lessons: [{
      id: 'pronouns', title: 'Pronouns that do more', sub: 'who and which, and words that tell whose.',
      concepts: [
        { slug: 'relative', title: 'who for people, which for things', exp: ['B3.2'], skill: 'relative',
          model: [
            step(W.sent('My aunt, ' + W.gap() + ' lives in Halifax, is visiting.'), 'My aunt is a person.'),
            step(W.sent('My aunt, <b>who</b> lives in Halifax, is visiting.'), 'A person: <b>who</b>.'),
            step(W.pic('canoe') + W.sent('Our canoe, ' + W.gap() + ' is red, is in the shed.'), 'A canoe is a thing.'),
            step(W.sent('Our canoe, <b>which</b> is red, is in the shed.'), 'A thing or an animal: <b>which</b>.'),
            step(W.icon('think'), 'The commas hold the extra detail.')
          ],
          guided: [relFill, function () { return relJoin(1); }, relOrder],
          check: [relFill, function () { return relJoin(2); }, relTf, relPick, relOrder],
          coach: '<p>Point to people and things in the room and add a detail: "Dad, who is cooking..." "The lamp, which is on..."</p>',
          mistake: '<p>Using "which" for a person ("my friend, which..."). Ask: is it a person?</p>' },
        { slug: 'whose', title: 'Words that tell whose', exp: ['B3.2'], skill: 'owners',
          model: [
            step(W.sent('Mei lost <b>her</b> hat.'), '<b>her</b> tells whose hat.'),
            step(W.sent('The twins packed <b>their</b> lunches.'), 'More than one: <b>their</b>.'),
            step(W.pic('dog') + W.sent('The dog wagged ' + W.gap() + ' tail.'), 'An animal.'),
            step(W.sent('The dog wagged <b>its</b> tail.'), 'Try "it is tail". No? Then no apostrophe.'),
            step(W.sent('my &middot; your &middot; his &middot; her &middot; its &middot; our &middot; their'), 'Each one comes before a naming word.')
          ],
          guided: [function () { return ownFill(1); }, tapOwner, itsIts],
          check: [function () { return ownFill(2); }, itsIts, ownTf, tapOwner, ownMatch],
          coach: '<p>Hand objects around: "Whose pencil? Her pencil. Whose books? Their books."</p>',
          mistake: '<p>Writing "it' + '’' + 's tail". Try "it is tail": it does not work, so use its.</p>' }
      ]
    }, {
      id: 'verbs', title: 'Verbs that do more', sub: 'The perfect tense, commands and questions.',
      concepts: [
        { slug: 'perfect', title: 'has, have or had + the helper form', exp: ['B3.2'], skill: 'perfect',
          model: [
            step(W.chain(['eat', 'ate', 'has eaten'], ['today', 'yesterday', 'done'])),
            step(W.sent('I <b>have eaten</b> lunch.'), 'Done before now.'),
            step(W.chain(['go', 'went', 'has gone'], ['today', 'yesterday', 'done']), 'Another verb.'),
            step(W.sent('Omar <b>has gone</b> home.'), 'One person: <b>has</b>.'),
            step(W.sent('By the time Dad got home, we <b>had eaten</b>.'), '<b>had</b>: done before something else in the past.')
          ],
          guided: [hasHave, function () { return participle(1); }, perfectMatch],
          check: [function () { return participle(2); }, hadBefore, perfectTf, hasHave, perfectMatch],
          coach: '<p>Make a three-column chart: eat, ate, has eaten. Say each line aloud with the child: "Today I eat. Yesterday I ate. I have eaten."</p>',
          mistake: '<p>Saying "has went" or "have saw". After has or have, use gone, seen, eaten.</p>' },
        { slug: 'commands', title: 'Commands and questions', exp: ['B3.2'], skill: 'commands',
          model: [
            step(W.sent('<b>Stir</b> the soup slowly.'), 'A command starts with the action. "You" is hidden.'),
            step(W.sent('Please <b>wash</b> your hands.'), '"Please" is polite. It is still a command.'),
            step(W.sent('The soup <mark class="hl">is</mark> hot.'), 'A statement. Find the helping verb.'),
            step(W.sent('<mark class="hl">Is</mark> the soup hot?'), 'Move it to the front: a question.'),
            step(W.sent('<mark class="hl">Can</mark> you skate?'), 'can, will and has move too.')
          ],
          guided: [kindOf, tapCommand, function () { return makeQuestion(1); }],
          check: [kindOf, function () { return makeQuestion(2); }, questionTf, pickCommands, tapCommand],
          coach: '<p>Play "Simon says" with full sentences. Then switch: the child asks a question back ("Can I stop now?").</p>',
          mistake: '<p>Calling a sentence with "please" a question. A command can be polite and still end with a period.</p>' }
      ]
    }],
    practice: [
      { id: 'relative', name: 'who and which', code: 'B3.2', gen: relFill },
      { id: 'owners', name: 'Words that tell whose', code: 'B3.2', gen: ownFill },
      { id: 'perfect', name: 'The perfect tense', code: 'B3.2', gen: participle },
      { id: 'commands', name: 'Commands and questions', code: 'B3.2', gen: kindOf }
    ]
  });

  Q.shapes('grammar', {
    relative: [[1, 'join', relJoin], [1, 'order', relOrder], [1, 'true-false', relTf], [2, 'pick', relPick]],
    owners: [[1, 'tap', tapOwner], [1, 'its', itsIts], [2, 'true-false', ownTf], [2, 'match', ownMatch]],
    perfect: [[1, 'has-have', hasHave], [1, 'had', hadBefore], [2, 'true-false', perfectTf], [2, 'match', perfectMatch]],
    commands: [[1, 'question', makeQuestion], [1, 'tap', tapCommand], [2, 'true-false', questionTf], [2, 'pick', pickCommands]]
  });
})();
