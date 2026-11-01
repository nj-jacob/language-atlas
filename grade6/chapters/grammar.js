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
    'The|- loud|adjective thunder|noun woke|verb us,|pronoun but|conjunction nobody|pronoun was|verb afraid.|adjective',
    'Ravi|noun gently|adverb lifted|verb the|- injured|adjective bird|noun from|preposition the|- road.|noun',
    'We|pronoun paddled|verb across|preposition the|- calm|adjective lake|noun at|preposition sunrise.|noun',
    'The|- curious|adjective fox|noun crept|verb silently|adverb toward|preposition our|- tent.|noun',
    'He|pronoun shovelled|verb the|- heavy|adjective snow|noun and|conjunction salted|verb the|- steps.|noun',
    'Noor|noun sang|verb beautifully|adverb at|preposition the|- spring|adjective concert.|noun',
    'Mateo|noun and|conjunction Ella|noun cheerfully|adverb cleaned|verb the|- messy|adjective garage.|noun'
  ].map(function (s) { return s.split(' ').map(function (w) { var p = w.split('|'); return [p[0], p[1]]; }); });
  function said(t, mark) { return t.map(function (w) { return w[0] === mark ? '<b>' + w[0] + '</b>' : w[0]; }).join(' '); }
  function bare(w) { return w.replace(/[.,]$/, ''); }
  function jobsIn(t) { return Object.keys(JOBS).filter(function (j) { return t.filter(function (w) { return w[1] === j; }).length === 1; }); }
  /* a sentence and a job that only one word in it does */
  function oneJob() {
    var t = R.pick(TAGGED), j = R.pick(jobsIn(t));
    return { t: t, j: j, w: t.filter(function (w) { return w[1] === j; })[0][0] };
  }
  function tapJob() {
    var x = oneJob(), tiles = x.t.filter(function (w) { return w[1] !== '-'; }).map(function (w) { return bare(w[0]); });
    return { q: 'Tap the <b>' + x.j + '</b>.', fig: W.sent(said(x.t)), type: 'tap', tiles: tiles, answer: tiles.indexOf(bare(x.w)),
      prompt: 'A ' + x.j + ' ' + JOBS[x.j] + '.', hint: 'A ' + x.j + ' ' + JOBS[x.j] + '.', explain: '<b>' + bare(x.w) + '</b> is the ' + x.j + '.', meta: { k: 'g6-tap-job', job: x.j } };
  }
  function jobOf(lv) {
    var x = oneJob(), wrong = R.some(Object.keys(JOBS).filter(function (j) { return j !== x.j; }), lv > 1 ? 3 : 2);
    return Q.one('What is the job of <b>' + bare(x.w) + '</b> in this sentence?', x.j, wrong, { fig: W.sent(said(x.t, x.w)),
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
  function jobTf() {
    var x = oneJob(), right = R.int(0, 1) === 1, claim = right ? x.j : R.pick(Object.keys(JOBS).filter(function (j) { return j !== x.j; }));
    return { q: Q.name() + ' says <b>' + bare(x.w) + '</b> is a <b>' + claim + '</b> here.', fig: W.sent(said(x.t, x.w)), type: 'tf', answer: right,
      why: { options: ['That is the job it does in this sentence.', 'It does a different job in this sentence.'], answer: right ? 0 : 1 },
      hint: 'What does the word do here?', explain: '<b>' + bare(x.w) + '</b> ' + JOBS[x.j] + ': a <b>' + x.j + '</b>.', meta: { k: 'g6-job-tf', word: bare(x.w), claim: claim } };
  }

  /* ---------- gerunds: [sentence with the -ing word in bold, the -ing word] ---------- */
  var GER = [['<b>Swimming</b> is great exercise.', 'Swimming'], ['Kai is <b>swimming</b> across the pool.', 'swimming'], ['<b>Reading</b> before bed helps me relax.', 'Reading'],
    ['Mei was <b>reading</b> when the phone rang.', 'reading'], ['I love <b>skating</b> on the canal.', 'skating'], ['We are <b>skating</b> on the Rideau Canal today.', 'skating'],
    ['<b>Drawing</b> maps takes patience.', 'Drawing'], ['Omar is <b>drawing</b> a map of the park.', 'drawing'], ['My favourite hobby is <b>baking</b>.', 'baking'], ['Dad is <b>baking</b> bannock for the feast.', 'baking'],
    ['<b>Hiking</b> in Algonquin Park is my favourite weekend activity.', 'Hiking'], ['We were <b>hiking</b> when it started to rain.', 'hiking'],
    ['<b>Singing</b> in a choir builds confidence.', 'Singing'], ['Grandma is <b>singing</b> an old Cree song.', 'singing'],
    ['Ella enjoys <b>painting</b> with watercolours.', 'painting'], ['Ella is <b>painting</b> a canoe on the wall.', 'painting'],
    ['<b>Fishing</b> through the ice takes patience.', 'Fishing'], ['They are <b>fishing</b> through a hole in the ice.', 'fishing'],
    ['<b>Recycling</b> keeps plastic out of the lake.', 'Recycling'], ['Our class is <b>recycling</b> old batteries.', 'recycling']];
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
      prompt: 'Which -ing word names an activity?', hint: 'Look for a word ending in -ing that names an activity.', explain: '<b>' + g[1] + '</b> names an activity.', meta: { k: 'g6-find-gerund' } };
  }
  function gerundTf() {
    var g = R.pick(GER), claim = R.int(0, 1) === 1, right = claim !== isVerb(g);
    return { q: Q.name() + ' says the bold word is ' + (claim ? 'a noun' : 'a verb') + '.', fig: W.sent(g[0]), type: 'tf', answer: right,
      hint: 'Look right before the -ing word.', explain: 'It is ' + (isVerb(g) ? VERB : NOUN) + '.', meta: { k: 'g6-gerund-tf', s: g[0], claim: claim ? 'noun' : 'verb' } };
  }

  /* ---------- active and passive voice: [doer, action, receiver, plural receiver] ---------- */
  var VOICE = [['the beaver', 'built', 'the dam'], ['Leila', 'painted', 'the mural'], ['the wind', 'knocked down', 'the fence'], ['our class', 'planted', 'the trees', 1],
    ['the goalie', 'stopped', 'the puck'], ['a volunteer', 'found', 'the lost dog'], ['the chef', 'cooked', 'the meals', 1], ['Grandpa', 'carved', 'the paddle'],
    ['the storm', 'flooded', 'the basement'], ['Mr. Singh', 'fixed', 'the furnace'], ['the students', 'recorded', 'the songs', 1], ['a bear', 'tipped over', 'the garbage bins', 1],
    ['Aunt Rosa', 'knitted', 'the scarf'], ['the lifeguard', 'rescued', 'the swimmer']];
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function active(v) { return cap(v[0]) + ' ' + v[1] + ' ' + v[2] + '.'; }
  function passive(v) { return cap(v[2]) + ' ' + (v[3] ? 'were' : 'was') + ' ' + v[1] + ' by ' + v[0] + '.'; }
  function swapped(v) { return cap(v[0]) + ' was ' + v[1] + ' by ' + v[2] + '.'; }
  function backwards(v) { return cap(v[2]) + ' ' + v[1] + ' ' + v[0] + '.'; }
  function whichVoice() {
    var v = R.pick(VOICE), pas = R.int(0, 1) === 1;
    return { q: 'Is this sentence active or passive?', fig: W.sent(pas ? passive(v) : active(v)), type: 'tap', tiles: ['active', 'passive'], answer: pas ? 1 : 0,
      prompt: 'Does the doer come first, or does the receiver?', hint: 'Passive: was or were, then "by" the doer.', explain: pas ? 'The receiver comes first: <b>passive</b>.' : 'The doer comes first: <b>active</b>.', meta: { k: 'g6-which-voice' } };
  }
  function doer() {
    var v = R.pick(VOICE);
    return Q.tiles('Who or what <b>did</b> the action?', v[0], [v[2]], { fig: W.sent(passive(v)), prompt: 'Look for the word by.', hint: 'Look after the word "by".', explain: '<b>' + v[0] + '</b> did it.', meta: { k: 'g6-doer' } });
  }
  function voiceTf() {
    var v = R.pick(VOICE), pas = R.int(0, 1) === 1, claim = R.pick(['active', 'passive']), right = (claim === 'passive') === pas;
    return { q: Q.name() + ' says this sentence is <b>' + claim + '</b>.', fig: W.sent(pas ? passive(v) : active(v)), type: 'tf', answer: right,
      why: { options: ['The word order shows it.', 'Look again at who comes first.'], answer: right ? 0 : 1 },
      hint: 'Who comes first: the doer or the receiver?', explain: pas ? 'The receiver comes first: <b>passive</b>.' : 'The doer comes first: <b>active</b>.', meta: { k: 'g6-active-tf', claim: claim } };
  }
  function pickPassive() {
    var vs = R.some(VOICE, 4);
    return Q.all('Pick every sentence in the <b>passive</b> voice.', vs.slice(0, 2).map(passive), vs.slice(2).map(active), {
      hint: 'Passive: the receiver first, then was or were, then by.', explain: 'In a passive sentence, the action is done <b>to</b> the subject.', meta: { k: 'g6-pick-passive' } });
  }

  /* switching voice */
  function toPassive(lv) {
    var v = R.pick(VOICE);
    return Q.one('Which is the same sentence in the <b>passive</b> voice?', passive(v), [swapped(v)].concat(lv > 1 ? [backwards(v)] : []), {
      fig: W.sent(active(v)), prompt: 'Who receives the action? Start with that.', hint: 'Receiver + was/were + action + by + doer.', explain: W.sent(passive(v)), meta: { k: 'g6-to-passive', doer: v[0], got: v[2] } });
  }
  function toActive(lv) {
    var v = R.pick(VOICE);
    return Q.one('Which is the same sentence in the <b>active</b> voice?', active(v), [backwards(v)].concat(lv > 1 ? [swapped(v)] : []), {
      fig: W.sent(passive(v)), prompt: 'Who did it? Start with them.', hint: 'Find the doer after "by". Put them first.', explain: W.sent(active(v)), meta: { k: 'g6-to-active', doer: v[0], got: v[2] } });
  }
  function convertTf() {
    var v = R.pick(VOICE), right = R.int(0, 1) === 1, shown = right ? passive(v) : swapped(v);
    return { q: Q.name() + ' changed it to the passive voice. Is it right?', fig: W.sent(active(v)) + W.sent(shown), type: 'tf', answer: right,
      why: { options: ['The receiver comes first, and the doer after by.', 'The doer and the receiver are mixed up.'], answer: right ? 0 : 1 },
      hint: 'Does it still say who did what?', explain: W.sent(passive(v)), meta: { k: 'g6-convert-tf', doer: v[0], got: v[2], shown: shown } };
  }
  function buildPassive() {
    var v = R.pick(VOICE);
    return { q: 'Build the <b>passive</b> sentence.', fig: W.sent(active(v)), type: 'order', items: [cap(v[2]), (v[3] ? 'were ' : 'was ') + v[1], 'by ' + v[0] + '.'], first: 'First', last: 'Last',
      hint: 'Start with the receiver.', explain: W.sent(passive(v)), meta: { k: 'g6-build-passive', doer: v[0], got: v[2] } };
  }

  /* ---------- when the passive voice is the better choice: [sentence, reason] ---------- */
  var REASONS = ['We do not know who did it.', 'Who did it is not important here.', 'The writer does not want to say who did it.'];
  var WHY = [['My bike was stolen last night.', 0], ['The window was broken during the night.', 0], ['A wallet was found on the bus.', 0], ['Strange tracks were seen near the cabin.', 0],
    ['The school was built in 1952.', 1], ['The roads were plowed early this morning.', 1], ['Rice is grown in many countries.', 1], ['The mail is delivered every weekday.', 1],
    ['Mistakes were made.', 2], ['The rules were not followed.', 2], ['The last cookie was eaten.', 2], ['The trophy was dropped, but it is fine.', 2]];
  var NOT = ['The doer is the most important part.', 'Passive sentences are always shorter.'];
  function whyPassive(lv) {
    var w = R.pick(WHY);
    return Q.one('Why does this sentence use the passive voice?', REASONS[w[1]], R.some(REASONS.filter(function (r, i) { return i !== w[1]; }).concat(NOT), lv > 1 ? 3 : 2), {
      fig: W.sent(w[0]), prompt: 'Is the doer named?', hint: 'Is the doer named? Could you name them?', explain: 'The passive voice leaves out or hides the doer.', meta: { k: 'g6-why-passive', s: w[0] } });
  }
  function whyTf() {
    var w = R.pick(WHY), right = R.int(0, 1) === 1, said = right ? REASONS[w[1]] : R.pick(REASONS.filter(function (r, i) { return i !== w[1]; }).concat(NOT));
    return { q: Q.name() + ' says it uses the passive voice because: <b>' + said + '</b>', fig: W.sent(w[0]), type: 'tf', answer: right,
      why: { options: ['That is why the doer is left out.', 'There is a different reason.'], answer: right ? 0 : 1 },
      hint: 'Is the doer unknown, unimportant, or hidden?', explain: REASONS[w[1]], meta: { k: 'g6-why-tf', s: w[0], said: said } };
  }
  function whyMatch() {
    var ws = [0, 1, 2].map(function (i) { return R.pick(WHY.filter(function (w) { return w[1] === i; })); });
    return { q: 'Match each sentence to why it uses the passive voice.', type: 'match', pairs: ws.map(function (w) { return [w[0], REASONS[w[1]]]; }),
      hint: 'Unknown, not important, or hidden?', explain: 'The passive voice leaves out or hides the doer.', meta: { k: 'g6-why-match' } };
  }
  function noDoer(lv) {
    var w = R.pick(WHY);
    return Q.one('Which passive sentence leaves out the doer?', w[0], R.some(VOICE, lv > 1 ? 2 : 1).map(passive), {
      hint: 'Look for a sentence with no "by".', explain: W.sent(w[0]) + ' Nobody is named.', meta: { k: 'g6-no-doer' } });
  }

  Atlas.register('grammar', {
    full: true,
    lessons: [{
      id: 'parts', title: 'Parts of speech', sub: 'Every word does a job in its sentence.',
      concepts: [
        { slug: 'jobs', title: 'Words have jobs', exp: ['B3.2'], skill: 'parts-of-speech',
          model: [
            step(W.sent('The tired <b>hikers</b> walked slowly up the hill.'), '<b>Noun</b>: names a thing or person.'),
            step(W.sent('The tired hikers <b>walked</b> slowly up the hill.'), '<b>Verb</b>: the action.'),
            step(W.sent('The <b>tired</b> hikers walked <b>slowly</b> up the hill.'), '<b>Adjective</b> describes the hikers. <b>Adverb</b> tells how they walked.'),
            step(W.sent('The tired hikers walked slowly <b>up</b> the hill.'), '<b>Preposition</b>: where.'),
            step(W.sent('<b>She</b> quickly packed a warm sweater <b>and</b> mittens.'), '<b>Pronoun</b> for a person. <b>Conjunction</b> joins two things.')
          ],
          guided: [tapJob, function () { return jobOf(1); }, jobTf],
          check: [tapJob, function () { return jobOf(2); }, pickNouns, jobTf, matchJobs],
          coach: '<p>The same word can do different jobs: "a <b>hard</b> test" (adjective), "we practised <b>hard</b>" (adverb). Always ask what it does here.</p>',
          mistake: '<p>Naming parts of speech from memory lists. Look at the job in this sentence.</p>' },
        { slug: 'gerunds', title: 'An -ing word can be a noun', exp: ['B3.2'], skill: 'gerunds',
          model: [
            step(W.sent('Kai is <b>swimming</b> across the pool.'), 'After <b>is</b>: a verb.'),
            step(W.sent('<b>Swimming</b> is great exercise.'), 'Names an activity: a noun.'),
            step(W.tile('gerund'), 'An -ing noun has a name: a <b>gerund</b>.'),
            step(W.sent('Grandma is <b>singing</b> an old Cree song.'), 'After <b>is</b> again: a verb.'),
            step(W.sent('<b>Singing</b> in a choir builds confidence.'), 'Swap in "Sport": it still works. A gerund.')
          ],
          guided: [gerundIs, findGerund, gerundTf],
          check: [gerundIs, pickGerunds, gerundTf, findGerund, gerundIs],
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
            step(W.sent('The dam <mark class="hl">was</mark> built <mark class="hl">by</mark> the beaver.'), 'Clues: was or were, and by.'),
            step(W.sent('The swimmer was rescued by the lifeguard.'), 'Who did it? The lifeguard, at the end.'),
            step(W.sent('<b>The lifeguard</b> rescued the swimmer.'), 'Doer first: active.')
          ],
          guided: [whichVoice, doer, voiceTf],
          check: [whichVoice, pickPassive, doer, voiceTf, whichVoice],
          coach: '<p>Ask "Who did it?" first. If the answer is at the start, it is active.</p>',
          mistake: '<p>Thinking any sentence with "was" is passive. "The goalie was fast" has no action done to anyone.</p>' },
        { slug: 'convert', title: 'Switch between active and passive', exp: ['B3.2'], skill: 'convert',
          model: [
            step(W.sent('Leila painted the mural.')),
            step(W.sent('<b>The mural</b> was painted'), 'Start with the receiver. Add was.'),
            step(W.sent('The mural was painted <b>by Leila</b>.'), 'End with by and the doer.'),
            step(W.sent('The garbage bins were tipped over by a bear.'), 'Now back the other way.'),
            step(W.sent('<b>A bear</b> tipped over the garbage bins.'), 'Doer first. Drop were and by.')
          ],
          guided: [function () { return toPassive(1); }, buildPassive, function () { return toActive(1); }],
          check: [function () { return toPassive(2); }, convertTf, function () { return toActive(2); }, buildPassive, convertTf],
          coach: '<p>Active voice is usually clearer and stronger. Use passive when the doer is unknown or not important.</p>',
          mistake: '<p>Swapping the nouns but keeping the meaning wrong ("Leila was painted by the mural").</p>' },
        { slug: 'why-passive', title: 'When the passive voice helps', exp: ['B3.2'], skill: 'why-passive',
          model: [
            step(W.sent('My bike was stolen.'), 'Who did it? We do not know.'),
            step(W.sent('The school was built in 1952.'), 'Who built it does not matter here.'),
            step(W.sent('Mistakes were made.'), 'The writer hides who made them.'),
            step(W.chain(['unknown', 'not important', 'hidden'], ['stolen', 'built', 'made']), 'Three reasons to leave out the doer.')
          ],
          guided: [function () { return whyPassive(1); }, function () { return noDoer(1); }, whyTf],
          check: [function () { return whyPassive(2); }, whyMatch, whyTf, function () { return noDoer(2); }, function () { return whyPassive(2); }],
          coach: '<p>Spot passive voice in news headlines together and ask: "Who is missing, and why?"</p>',
          mistake: '<p>Using the passive voice everywhere. It can make writing vague.</p>' }
      ]
    }],
    practice: [
      { id: 'parts-of-speech', name: 'Parts of speech', code: 'B3.2', gen: jobOf },
      { id: 'gerunds', name: 'Gerunds', code: 'B3.2', gen: gerundIs },
      { id: 'voice', name: 'Active or passive', code: 'B3.2', gen: whichVoice },
      { id: 'convert', name: 'Switching voice', code: 'B3.2', gen: toPassive },
      { id: 'why-passive', name: 'When to use passive', code: 'B3.2', gen: whyPassive }
    ]
  });

  Q.shapes('grammar', {
    'parts-of-speech': [[1, 'tap', tapJob], [1, 'true-false', jobTf], [1, 'match', matchJobs], [2, 'pick-nouns', pickNouns]],
    gerunds: [[1, 'find', findGerund], [1, 'pick', pickGerunds], [2, 'true-false', gerundTf]],
    voice: [[1, 'doer', doer], [1, 'true-false', voiceTf], [2, 'pick', pickPassive]],
    convert: [[1, 'to-active', toActive], [1, 'build', buildPassive], [2, 'true-false', convertTf]],
    'why-passive': [[1, 'true-false', whyTf], [1, 'no-doer', noDoer], [2, 'match', whyMatch]]
  });
})();
