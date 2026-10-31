/* Grade 6: grammar.
   Ontario 2023 Language, Grade 6:
   B3.2 "demonstrate an understanding of the functions of parts of speech in sentences, including nouns that are gerunds, distinguishing
   and converting between active and passive voice, and use this knowledge to support comprehension and communicate meaning clearly"
   All sentences are written for this site. Answer checks: tests/verify/grade6-grammar.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* ---------- parts of speech: each word with its job ('-' for words not asked about) ---------- */
  var JOBS = { noun: 'names a person, place or thing', verb: 'shows an action or being', adjective: 'describes a noun', adverb: 'tells how, when or where',
    pronoun: 'takes the place of a noun', preposition: 'shows where or when', conjunction: 'joins words or ideas' };
  var TAGGED = [
    'The|- tired|adjective hikers|noun walked|verb slowly|adverb up|preposition the|- hill.|noun',
    'She|pronoun quickly|adverb packed|verb a|- warm|adjective sweater|noun and|conjunction mittens.|noun',
    'Our|- team|noun practised|verb hard|adverb because|conjunction the|- final|noun was|verb on|preposition Saturday.|noun',
    'Amara|noun carefully|adverb placed|verb the|- fragile|adjective vase|noun on|preposition the|- shelf.|noun',
    'They|pronoun waited|verb patiently|adverb under|preposition the|- old|adjective bridge.|noun',
    'The|- loud|adjective thunder|noun woke|verb us,|pronoun but|conjunction nobody|pronoun was|verb afraid.|adjective'
  ].map(function (s) { return s.split(' ').map(function (w) { var p = w.split('|'); return [p[0], p[1]]; }); });
  function said(t) { return t.map(function (w) { return w[0]; }).join(' '); }
  function bare(w) { return w.replace(/[.,]$/, ''); }
  /* a sentence and a job that only one word in it does */
  function oneJob() {
    var t = R.pick(TAGGED), jobs = Object.keys(JOBS).filter(function (j) { return t.filter(function (w) { return w[1] === j; }).length === 1; });
    var j = R.pick(jobs);
    return { t: t, j: j, w: t.filter(function (w) { return w[1] === j; })[0][0] };
  }
  function tapJob() {
    var x = oneJob(), tiles = x.t.filter(function (w) { return w[1] !== '-'; }).map(function (w) { return bare(w[0]); });
    return { q: 'Tap the <b>' + x.j + '</b>.', fig: W.sent(said(x.t)), type: 'tap', tiles: tiles, answer: tiles.indexOf(bare(x.w)),
      prompt: 'A ' + x.j + ' ' + JOBS[x.j] + '.', hint: 'A ' + x.j + ' ' + JOBS[x.j] + '.', explain: '<b>' + bare(x.w) + '</b> is the ' + x.j + '.', meta: { k: 'g6-tap-job', job: x.j } };
  }
  function jobOf(lv) {
    var x = oneJob(), wrong = R.some(Object.keys(JOBS).filter(function (j) { return j !== x.j; }), lv > 1 ? 3 : 2);
    return Q.one('What is the job of <b>' + bare(x.w) + '</b> in this sentence?', x.j, wrong, { fig: W.sent(said(x.t).replace(x.w, '<b>' + x.w + '</b>')),
      prompt: 'What does the word do in the sentence?', hint: 'Ask: does it name, act, describe, tell how, replace, show where, or join?', explain: '<b>' + bare(x.w) + '</b> ' + JOBS[x.j] + ': a <b>' + x.j + '</b>.', meta: { k: 'g6-job-of', word: bare(x.w) } });
  }
  function matchJobs() {
    var js = R.some(Object.keys(JOBS), 3);
    return { q: 'Match each part of speech to its job.', type: 'match', pairs: js.map(function (j) { return [j, JOBS[j]]; }), hint: 'Think of an example of each.', explain: 'Every word does a job in its sentence.', meta: { k: 'g6-match-jobs' } };
  }
  function pickNouns() {
    var t = R.pick(TAGGED), words = t.filter(function (w) { return w[1] !== '-'; }), nouns = words.filter(function (w) { return w[1] === 'noun'; }).map(function (w) { return bare(w[0]); });
    var rest = words.filter(function (w) { return w[1] !== 'noun'; }).map(function (w) { return bare(w[0]); });
    return Q.all('Pick every <b>noun</b>.', nouns, R.some(rest, Math.min(rest.length, 3)), { fig: W.sent(said(t)), hint: 'A noun names a person, place or thing.', explain: 'Nouns: ' + nouns.join(', '), meta: { k: 'g6-pick-nouns' } });
  }

  /* ---------- gerunds: [sentence with the -ing word in bold, the -ing word] ---------- */
  var GER = [['<b>Swimming</b> is great exercise.', 'Swimming'], ['Kai is <b>swimming</b> across the pool.', 'swimming'], ['<b>Reading</b> before bed helps me relax.', 'Reading'],
    ['Mei was <b>reading</b> when the phone rang.', 'reading'], ['I love <b>skating</b> on the canal.', 'skating'], ['We are <b>skating</b> on the Rideau Canal today.', 'skating'],
    ['<b>Drawing</b> maps takes patience.', 'Drawing'], ['Omar is <b>drawing</b> a map of the park.', 'drawing'], ['My favourite hobby is <b>baking</b>.', 'baking'], ['Dad is <b>baking</b> bannock for the feast.', 'baking']];
  /* an -ing word is a verb here when a helping verb comes right before it and the sentence goes on after it */
  function isVerb(g) { return /\b(is|are|was|were|am) <b>\w+<\/b> \w/.test(g[0]); }
  var NOUN = 'a noun (a gerund)', VERB = 'a verb (an action happening)';
  function gerundIs() {
    var g = R.pick(GER);
    return { q: 'In this sentence, the <b>-ing</b> word is...', fig: W.sent(g[0]), type: 'tap', tiles: [NOUN, VERB], answer: isVerb(g) ? 1 : 0,
      prompt: 'Is there a helping verb (is, are, was) right before it?', hint: 'Could you swap it for a noun like "Sport"?', explain: isVerb(g) ? 'A helping verb comes first: it is a verb.' : 'It names an activity: a noun, called a <b>gerund</b>.', meta: { k: 'g6-gerund-is', s: g[0] } };
  }
  function pickGerunds() {
    var n = R.some(GER.filter(function (g) { return !isVerb(g); }), 2), v = R.some(GER.filter(isVerb), 2);
    return Q.all('Pick every sentence where the bold word is a <b>noun</b> (a gerund).', n.map(function (g) { return g[0]; }), v.map(function (g) { return g[0]; }), {
      hint: 'A gerund names an activity. No helping verb comes right before it.', explain: 'Gerunds: ' + n.map(function (g) { return g[1].toLowerCase(); }).join(', '), meta: { k: 'g6-pick-gerunds' } });
  }
  function findGerund() {
    var g = R.pick(GER.filter(function (x) { return !isVerb(x); })), words = g[0].replace(/<\/?b>/g, '').replace(/\.$/, '').split(' ');
    return { q: 'Tap the <b>gerund</b>: the -ing word used as a noun.', type: 'tap', tiles: words, answer: words.indexOf(g[1]),
      hint: 'Look for a word ending in -ing that names an activity.', explain: '<b>' + g[1] + '</b> names an activity.', meta: { k: 'g6-find-gerund' } };
  }
  function gerundTf() {
    var g = R.pick(GER), claim = R.int(0, 1) === 1, right = claim !== isVerb(g);
    return { q: Q.name() + ' says the bold word is ' + (claim ? 'a noun' : 'a verb') + '.', fig: W.sent(g[0]), type: 'tf', answer: right,
      hint: 'Look right before the -ing word.', explain: 'It is ' + (isVerb(g) ? VERB : NOUN) + '.', meta: { k: 'g6-gerund-tf', s: g[0], claim: claim ? 'noun' : 'verb' } };
  }

  /* ---------- active and passive voice: [doer, action, receiver, plural receiver] ---------- */
  var VOICE = [['the beaver', 'built', 'the dam'], ['Leila', 'painted', 'the mural'], ['the wind', 'knocked down', 'the fence'], ['our class', 'planted', 'the trees', 1],
    ['the goalie', 'stopped', 'the puck'], ['a volunteer', 'found', 'the lost dog'], ['the chef', 'cooked', 'the meals', 1], ['Grandpa', 'carved', 'the paddle']];
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function active(v) { return cap(v[0]) + ' ' + v[1] + ' ' + v[2] + '.'; }
  function passive(v) { return cap(v[2]) + ' ' + (v[3] ? 'were' : 'was') + ' ' + v[1] + ' by ' + v[0] + '.'; }
  function swapped(v) { return cap(v[0]) + ' was ' + v[1] + ' by ' + v[2] + '.'; }
  function whichVoice() {
    var v = R.pick(VOICE), pas = R.int(0, 1) === 1;
    return { q: 'Is this sentence active or passive?', fig: W.sent(pas ? passive(v) : active(v)), type: 'tap', tiles: ['active', 'passive'], answer: pas ? 1 : 0,
      prompt: 'Does the doer come first, or does the receiver?', hint: 'Passive: was or were, then "by" the doer.', explain: pas ? 'The receiver comes first: <b>passive</b>.' : 'The doer comes first: <b>active</b>.', meta: { k: 'g6-which-voice' } };
  }
  function toPassive(lv) {
    var v = R.pick(VOICE);
    return Q.one('Which is the same sentence in the <b>passive</b> voice?', passive(v), [swapped(v)].concat(lv > 1 ? [cap(v[2]) + ' ' + v[1] + ' ' + v[0] + '.'] : []), {
      fig: W.sent(active(v)), prompt: 'Who receives the action? Start with that.', hint: 'Receiver + was/were + action + by + doer.', explain: W.sent(passive(v)), meta: { k: 'g6-to-passive', doer: v[0], got: v[2] } });
  }
  function toActive(lv) {
    var v = R.pick(VOICE);
    return Q.one('Which is the same sentence in the <b>active</b> voice?', active(v), [cap(v[2]) + ' ' + v[1] + ' ' + v[0] + '.'].concat(lv > 1 ? [swapped(v)] : []), {
      fig: W.sent(passive(v)), prompt: 'Who did it? Start with them.', hint: 'Find the doer after "by". Put them first.', explain: W.sent(active(v)), meta: { k: 'g6-to-active', doer: v[0], got: v[2] } });
  }
  function doer() {
    var v = R.pick(VOICE);
    return Q.tiles('Who or what <b>did</b> the action?', v[0], [v[2]], { fig: W.sent(passive(v)), hint: 'Look after the word "by".', explain: '<b>' + v[0] + '</b> did it.', meta: { k: 'g6-doer' } });
  }
  /* when the passive voice is the better choice */
  var WHY = [['My bike was stolen last night.', 'We do not know who did it.'], ['The school was built in 1952.', 'Who built it is not important here.'], ['Mistakes were made.', 'The writer does not want to say who did it.']];
  function whyPassive() {
    var w = R.pick(WHY);
    return Q.one('Why does this sentence use the passive voice?', w[1], ['The doer is the most important part.', 'Passive sentences are always shorter.'], {
      fig: W.sent(w[0]), hint: 'Is the doer named?', explain: 'The passive voice leaves out or hides the doer.', meta: { k: 'g6-why-passive', s: w[0] } });
  }

  Atlas.register('grammar', {
    lessons: [{
      id: 'parts', title: 'Parts of speech', sub: 'Every word does a job in its sentence.',
      concepts: [
        { slug: 'jobs', title: 'Words have jobs', exp: ['B3.2'], skill: 'parts-of-speech',
          model: [
            step(W.sent('The tired <b>hikers</b> walked slowly up the hill.'), '<b>Noun</b>: names a thing or person.'),
            step(W.sent('The tired hikers <b>walked</b> slowly up the hill.'), '<b>Verb</b>: the action.'),
            step(W.sent('The <b>tired</b> hikers walked <b>slowly</b> up the hill.'), '<b>Adjective</b> describes the hikers. <b>Adverb</b> tells how they walked.'),
            step(W.sent('The tired hikers walked slowly <b>up</b> the hill.'), '<b>Preposition</b>: where.')
          ],
          guided: [tapJob, function () { return jobOf(1); }],
          check: [tapJob, function () { return jobOf(2); }],
          coach: '<p>The same word can do different jobs: "a <b>hard</b> test" (adjective), "we practised <b>hard</b>" (adverb). Always ask what it does here.</p>',
          mistake: '<p>Naming parts of speech from memory lists. Look at the job in this sentence.</p>' },
        { slug: 'gerunds', title: 'An -ing word can be a noun', exp: ['B3.2'], skill: 'gerunds',
          model: [
            step(W.sent('Kai is <b>swimming</b> across the pool.'), 'After <b>is</b>: a verb.'),
            step(W.sent('<b>Swimming</b> is great exercise.'), 'Names an activity: a noun.'),
            step(W.tile('gerund'), 'An -ing noun has a name: a <b>gerund</b>.')
          ],
          guided: [gerundIs, findGerund],
          check: [gerundIs, pickGerunds],
          coach: '<p>Test it: swap the -ing word for "Sport" or "It". If the sentence still works, it is a gerund.</p>',
          mistake: '<p>Calling every -ing word a verb. Check for a helping verb (is, are, was) right before it.</p>' }
      ]
    }, {
      id: 'voice', title: 'Active and passive voice', sub: 'Who did it, and what had it done to it.',
      concepts: [
        { slug: 'active-passive', title: 'Active or passive?', exp: ['B3.2'], skill: 'voice',
          model: [
            step(W.sent('<b>The beaver</b> built the dam.'), 'The doer comes first: <b>active</b>.'),
            step(W.sent('<b>The dam</b> was built by the beaver.'), 'The receiver comes first: <b>passive</b>.'),
            step(W.sent('The dam <mark class="hl">was</mark> built <mark class="hl">by</mark> the beaver.'), 'Clues: was or were, and by.')
          ],
          guided: [whichVoice, doer],
          check: [whichVoice, doer],
          coach: '<p>Ask "Who did it?" first. If the answer is at the start, it is active.</p>',
          mistake: '<p>Thinking any sentence with "was" is passive. "The goalie was fast" has no action done to anyone.</p>' },
        { slug: 'convert', title: 'Switch between active and passive', exp: ['B3.2'], skill: 'voice',
          model: [
            step(W.sent('Leila painted the mural.')),
            step(W.sent('<b>The mural</b> was painted'), 'Start with the receiver. Add was.'),
            step(W.sent('The mural was painted <b>by Leila</b>.'), 'End with by and the doer.')
          ],
          guided: [function () { return toPassive(1); }, function () { return toActive(1); }],
          check: [function () { return toPassive(2); }, function () { return toActive(2); }],
          coach: '<p>Active voice is usually clearer and stronger. Use passive when the doer is unknown or not important.</p>',
          mistake: '<p>Swapping the nouns but keeping the meaning wrong ("Leila was painted by the mural").</p>' },
        { slug: 'why-passive', title: 'When the passive voice helps', exp: ['B3.2'], skill: 'voice',
          model: [
            step(W.sent('My bike was stolen.'), 'Who did it? We do not know.'),
            step(W.sent('The school was built in 1952.'), 'Who built it does not matter here.')
          ],
          guided: [whyPassive, whyPassive],
          check: [whyPassive, whichVoice],
          coach: '<p>Spot passive voice in news headlines together and ask: "Who is missing, and why?"</p>',
          mistake: '<p>Using the passive voice everywhere. It can make writing vague.</p>' }
      ]
    }],
    practice: [
      { id: 'parts-of-speech', name: 'Parts of speech', code: 'B3.2', gen: function (lv) { return jobOf(lv); } },
      { id: 'gerunds', name: 'Gerunds', code: 'B3.2', gen: gerundIs },
      { id: 'voice', name: 'Active and passive voice', code: 'B3.2', gen: whichVoice }
    ]
  });

  Q.shapes('grammar', {
    'parts-of-speech': [[1, 'tap', tapJob], [1, 'match', matchJobs], [2, 'pick-nouns', pickNouns]],
    gerunds: [[1, 'find', findGerund], [1, 'pick', pickGerunds], [2, 'true-false', gerundTf]],
    voice: [[1, 'to-passive', toPassive], [1, 'to-active', toActive], [1, 'doer', doer], [2, 'why', whyPassive]]
  });
})();
