/* Grade 8: roots and word parts. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 8:
   B2.1 "use consolidated knowledge of the meanings of words and morphemes (i.e., bases, prefixes, and suffixes) to read and spell
   complex words with accuracy and automaticity"
   Greek and Latin roots, suffixes that change a word's job, and the spelling changes that come with suffixes and the prefix in-.
   All word lists are written for this site. Answer checks: tests/verify/grade8-roots.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* roots and what they mean */
  var ROOT = { port: 'carry', spect: 'look', dict: 'say', struct: 'build', rupt: 'break', aud: 'hear', vis: 'see', ject: 'throw', script: 'write', tract: 'pull',
    form: 'shape', cred: 'believe', manu: 'hand', tele: 'far', scope: 'look', phone: 'sound', bio: 'life', geo: 'earth', graph: 'write', thermo: 'heat', meter: 'measure',
    micro: 'small', photo: 'light', auto: 'self', logy: 'study', chrono: 'time', mega: 'large' };
  /* [word, its parts, what it means]. Roots are the 'base' parts. WORDS have one root; TWO have two or more. */
  var WORDS = [
    ['transport', [['trans', 'prefix'], ['port', 'base']], 'carry across'], ['portable', [['port', 'base'], ['able', 'suffix']], 'able to be carried'],
    ['export', [['ex', 'prefix'], ['port', 'base']], 'carry goods out of a country'],
    ['inspect', [['in', 'prefix'], ['spect', 'base']], 'look into closely'], ['spectator', [['spect', 'base'], ['ator', 'suffix']], 'a person who looks on'],
    ['spectacle', [['spect', 'base'], ['acle', 'suffix']], 'something amazing to look at'],
    ['predict', [['pre', 'prefix'], ['dict', 'base']], 'say before it happens'], ['contradict', [['contra', 'prefix'], ['dict', 'base']], 'say the opposite'],
    ['dictate', [['dict', 'base'], ['ate', 'suffix']], 'say aloud for someone to copy'],
    ['construct', [['con', 'prefix'], ['struct', 'base']], 'build by putting parts together'], ['structure', [['struct', 'base'], ['ure', 'suffix']], 'a thing people build, like a bridge'],
    ['interrupt', [['inter', 'prefix'], ['rupt', 'base']], 'break in between'], ['erupt', [['e', 'prefix'], ['rupt', 'base']], 'break out'],
    ['disrupt', [['dis', 'prefix'], ['rupt', 'base']], 'break up the normal order'],
    ['audible', [['aud', 'base'], ['ible', 'suffix']], 'able to be heard'], ['audience', [['aud', 'base'], ['ience', 'suffix']], 'the people who hear a show'],
    ['visible', [['vis', 'base'], ['ible', 'suffix']], 'able to be seen'], ['vision', [['vis', 'base'], ['ion', 'suffix']], 'the power to see'],
    ['eject', [['e', 'prefix'], ['ject', 'base']], 'throw out'], ['project', [['pro', 'prefix'], ['ject', 'base']], 'throw forward, as onto a screen'],
    ['reject', [['re', 'prefix'], ['ject', 'base']], 'throw back, or refuse'],
    ['tractor', [['tract', 'base'], ['or', 'suffix']], 'a machine that pulls heavy loads'], ['distract', [['dis', 'prefix'], ['tract', 'base']], 'pull attention away'],
    ['subtract', [['sub', 'prefix'], ['tract', 'base']], 'pull one number away from another'],
    ['transform', [['trans', 'prefix'], ['form', 'base']], 'change the shape of'], ['reform', [['re', 'prefix'], ['form', 'base']], 'shape again, to make better'],
    ['uniform', [['uni', 'prefix'], ['form', 'base']], 'clothing of one shape for everyone'],
    ['credible', [['cred', 'base'], ['ible', 'suffix']], 'easy to believe'], ['incredible', [['in', 'prefix'], ['cred', 'base'], ['ible', 'suffix']], 'too amazing to believe'],
    ['manual', [['manu', 'base'], ['al', 'suffix']], 'done by hand']];
  var TWO = [
    ['telescope', [['tele', 'base'], ['scope', 'base']], 'a tool for looking at far things'], ['telephone', [['tele', 'base'], ['phone', 'base']], 'a tool that sends sound far away'],
    ['biography', [['bio', 'base'], ['graph', 'base'], ['y', 'suffix']], 'writing about a life'], ['geography', [['geo', 'base'], ['graph', 'base'], ['y', 'suffix']], 'writing about the earth'],
    ['thermometer', [['thermo', 'base'], ['meter', 'base']], 'a tool that measures heat'], ['microscope', [['micro', 'base'], ['scope', 'base']], 'a tool for looking at small things'],
    ['photograph', [['photo', 'base'], ['graph', 'base']], 'a picture written with light'], ['autograph', [['auto', 'base'], ['graph', 'base']], 'your name, written by yourself'],
    ['biology', [['bio', 'base'], ['logy', 'base']], 'the study of life'], ['geology', [['geo', 'base'], ['logy', 'base']], 'the study of the earth and its rocks'],
    ['chronology', [['chrono', 'base'], ['logy', 'base']], 'the study of time order'], ['megaphone', [['mega', 'base'], ['phone', 'base']], 'a cone that makes sound large'],
    ['microphone', [['micro', 'base'], ['phone', 'base']], 'a tool that picks up small sounds'], ['telegraph', [['tele', 'base'], ['graph', 'base']], 'a machine that writes messages far away'],
    ['autobiography', [['auto', 'base'], ['bio', 'base'], ['graph', 'base'], ['y', 'suffix']], 'the story of your life, written by yourself'],
    ['television', [['tele', 'base'], ['vis', 'base'], ['ion', 'suffix']], 'a screen that lets you see far away'],
    ['manuscript', [['manu', 'base'], ['script', 'base']], 'writing done by hand']];
  var ALL = WORDS.concat(TWO);
  function roots(w) { return w[1].filter(function (p) { return p[1] === 'base'; }).map(function (p) { return p[0]; }); }
  /* two words share a meaning when any of their roots mean the same thing */
  function shares(a, b) { return roots(a).some(function (r) { return roots(b).some(function (s) { return ROOT[r] === ROOT[s]; }); }); }
  function others(w, list) { return (list || ALL).filter(function (x) { return x !== w && !shares(x, w); }); }
  /* words with no shared meaning between any two of them */
  function apart(list, n) { var out = []; R.shuffle(list.slice()).forEach(function (w) { if (out.length < n && out.every(function (x) { return !shares(x, w); })) out.push(w); }); return out; }
  function members(r) { return ALL.filter(function (w) { return roots(w).indexOf(r) >= 0; }); }
  var FAMILIES = Object.keys(ROOT).filter(function (r) { return members(r).length >= 3; });
  function meanings(r) { return roots(r).map(function (x) { return '<b>' + x + '</b> = ' + ROOT[x]; }); }

  /* ---------- one root ---------- */
  function meaning(list) {
    return function (lv) {
      var w = R.pick(list);
      return Q.one('What does <b>' + w[0] + '</b> mean?', w[2], R.some(others(w), lv > 1 ? 3 : 2).map(function (x) { return x[2]; }), {
        fig: lv > 1 ? W.tile(w[0]) : W.sum(w[1]), prompt: 'Find the root. What does it mean?', hint: meanings(w).join('. ') + '.',
        explain: W.sum(w[1]), steps: meanings(w).concat(['<b>' + w[0] + '</b>: ' + w[2] + '.']), meta: { k: 'g8-root-meaning', word: w[0] } });
    };
  }
  function whichPart() {
    var w = R.pick(WORDS), r = R.pick(roots(w));
    return Q.tiles('Which part of <b>' + w[0] + '</b> means <b>' + ROOT[r] + '</b>?', r, w[1].map(function (p) { return p[0]; }).filter(function (p) { return p !== r; }), {
      hint: 'The root is the part that carries the main meaning.', explain: W.sum(w[1]), meta: { k: 'g8-root-part', word: w[0], mean: ROOT[r] } });
  }
  function wordFor(list) {
    return function (lv) {
      var w = R.pick(list);
      return Q.tiles('Which word means <b>' + w[2] + '</b>?', w[0], R.some(others(w, list), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
        prompt: 'Which root fits the meaning?', hint: meanings(w).join('. ') + '.', explain: W.sum(w[1]), meta: { k: 'g8-root-word', mean: w[2] } });
    };
  }
  function tfRoot(list) {
    return function () {
      var w = R.pick(list), r = R.pick(roots(w)), right = R.int(0, 1) === 1;
      var said = right ? ROOT[r] : R.pick(Object.keys(ROOT).map(function (k) { return ROOT[k]; }).filter(function (m) { return m !== ROOT[r]; }));
      return { q: Q.name() + ' says:', fig: W.sent('In <b>' + w[0] + '</b>, the root <b>' + r + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
        why: { options: ['<b>' + r + '</b> means ' + ROOT[r] + '.', 'Roots change meaning in every word.'], answer: 0 },
        hint: 'Think of other words with this root.', explain: W.sum(w[1]) + ' <b>' + r + '</b> = ' + ROOT[r] + '.', meta: { k: 'g8-root-tf', root: r, said: said } };
    };
  }
  function matchWords() {
    var ws = apart(WORDS, 3);
    return { q: 'Match each word to its meaning.', type: 'match', pairs: ws.map(function (w) { return [w[0], w[2]]; }), hint: 'Find the root in each word first.',
      explain: ws.map(function (w) { return W.sum(w[1]); }).join(''), meta: { k: 'g8-root-words-match' } };
  }

  /* ---------- two roots ---------- */
  function buildTwo(lv) {
    var w = R.pick(TWO), extra = R.pick(others(w, TWO)), xr = roots(extra)[0];
    var list = w[1].map(function (p) { return W.tile(p[0], p[1]); }).concat([W.tile(xr, 'base')]);
    return { q: 'Build the word that means <b>' + w[2] + '</b>.', type: 'build', parts: list, answer: w[1].map(function (p, i) { return i; }),
      fig: lv > 1 ? '' : roots(w).map(function (r) { return W.tile(r, 'base') + ' ' + ROOT[r]; }).join(' &nbsp; '), hint: 'Which roots carry those meanings?',
      explain: W.sum(w[1]), meta: { k: 'g8-root-build', mean: w[2] } };
  }
  function matchRoots(list) {
    return function () {
      var seen = {}, rs = R.shuffle(list.slice()).filter(function (r) { var m = ROOT[r]; if (seen[m]) return false; seen[m] = 1; return true; }).slice(0, 3);
      return { q: 'Match each root to its meaning.', type: 'match', pairs: rs.map(function (r) { return [r, ROOT[r]]; }), hint: 'Think of a word you know with each root.',
        explain: 'Knowing a root unlocks a whole family of words.', meta: { k: 'g8-root-match' } };
    };
  }
  var TWOROOTS = ['tele', 'scope', 'phone', 'bio', 'geo', 'graph', 'thermo', 'meter', 'micro', 'photo', 'auto', 'logy', 'chrono', 'mega'];
  var ONEROOTS = Object.keys(ROOT).filter(function (r) { return TWOROOTS.indexOf(r) < 0; });

  /* ---------- word families ---------- */
  function family(lv) {
    var r = R.pick(FAMILIES), w = R.pick(members(r));
    return Q.tiles('Which word belongs to the <b>' + r + '</b> family (' + ROOT[r] + ')?', w[0], R.some(others(w), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      prompt: 'Look for the letters ' + r + '.', hint: 'Look for the same letters that carry the same meaning.', explain: W.sum(w[1]), meta: { k: 'g8-root-family', root: r } });
  }
  function oddOut() {
    var r = R.pick(FAMILIES), in3 = R.some(members(r), 3), out = R.pick(others(in3[0]).filter(function (x) { return in3.every(function (y) { return !shares(x, y); }); }));
    return Q.one('Which word is <b>not</b> in the same family?', out[0], in3.map(function (x) { return x[0]; }), { prompt: 'Which root do three of them share?',
      hint: 'Three words share a root.', explain: '<b>' + r + '</b> = ' + ROOT[r] + ': ' + in3.map(function (x) { return x[0]; }).join(', ') + '.', meta: { k: 'g8-root-odd', root: r } });
  }
  function pickFamily(lv) {
    var r = R.pick(FAMILIES), ins = R.some(members(r), lv > 1 ? 3 : 2), outs = apart(others(ins[0]).filter(function (x) { return ins.every(function (y) { return !shares(x, y); }); }), 2);
    return Q.all('Pick every word in the <b>' + r + '</b> family (' + ROOT[r] + ').', ins.map(function (x) { return x[0]; }), outs.map(function (x) { return x[0]; }), {
      hint: 'Look for the letters ' + r + ' carrying the meaning ' + ROOT[r] + '.', explain: ins.map(function (x) { return W.sum(x[1]); }).join(''), meta: { k: 'g8-root-pick-family', root: r } });
  }

  /* ---------- suffixes that change a word's job ---------- */
  /* [verb, noun, adjective, adverb, a sentence that needs the noun, the adjective, the adverb] */
  var FAM = [
    ['decide', 'decision', 'decisive', 'decisively', 'The judges announced their ___ at noon.', 'A ___ leader acts quickly.', 'She acted ___ when the alarm rang.'],
    ['create', 'creation', 'creative', 'creatively', 'The sculpture is her newest ___.', 'He had a ___ idea for the poster.', 'They solved the problem ___.'],
    ['protect', 'protection', 'protective', 'protectively', 'Sunscreen offers some ___ from the sun.', 'Wear ___ gloves in the lab.', 'The goose stood ___ over her goslings.'],
    ['persuade', 'persuasion', 'persuasive', 'persuasively', 'It took a lot of ___ to change his mind.', 'Write a ___ letter to council.', 'She argued ___ for a new park.'],
    ['attract', 'attraction', 'attractive', 'attractively', 'The waterfall is the park’s main ___.', 'The store has an ___ window display.', 'The cakes were arranged ___.'],
    ['describe', 'description', 'descriptive', 'descriptively', 'Read the ___ of the lost dog.', 'Use ___ words in your story.', 'The scene is written ___.'],
    ['imagine', 'imagination', 'imaginative', 'imaginatively', 'Use your ___ to picture the scene.', 'It was an ___ solution.', 'The room was decorated ___.'],
    ['act', 'action', 'active', 'actively', 'The creek was saved by their ___.', 'Choose an ___ hobby, like hiking.', 'Listen ___ during the discussion.'],
    ['inform', 'information', 'informative', 'informatively', 'Find the ___ on the website.', 'It was an ___ talk about bats.', 'The sign was written ___.'],
    ['reflect', 'reflection', 'reflective', 'reflectively', 'She saw her ___ in the lake.', 'Cyclists wear ___ vests at night.', 'He paused and spoke ___ about the trip.'],
    ['produce', 'production', 'productive', 'productively', 'Our class put on a ___ of the play.', 'It was a ___ morning in the garden.', 'The team worked ___ on the project.'],
    ['cooperate', 'cooperation', 'cooperative', 'cooperatively', 'The project needed the ___ of every student.', 'It was a ___ game, with no winners.', 'The groups worked ___ to clean the beach.']];
  var JOB = ['verb', 'noun', 'adjective', 'adverb'];
  var SUF = { noun: '-ion', adjective: '-ive', adverb: '-ly', verb: 'no suffix' };
  var JOBTIP = { noun: 'names a thing or idea', adjective: 'describes a noun', adverb: 'describes how an action is done', verb: 'is an action' };
  function an(j) { return (j === 'adjective' || j === 'adverb' ? 'an ' : 'a ') + j; }
  function jobOf(lv) {
    var f = R.pick(FAM), j = R.int(lv > 1 ? 0 : 1, 3);
    return Q.tiles('What job does <b>' + f[j] + '</b> do?', JOB[j], JOB.filter(function (x) { return x !== JOB[j]; }).slice(0, lv > 1 ? 3 : 2), {
      prompt: 'Look at the end of the word.', hint: '-ion makes a noun. -ive makes an adjective. -ly makes an adverb.', explain: '<b>' + f[j] + '</b> is ' + an(JOB[j]) + ': it ' + JOBTIP[JOB[j]] + '.', meta: { k: 'g8-suffix-job', word: f[j] } });
  }
  function jobTf() {
    var f = R.pick(FAM), j = R.int(1, 3), right = R.int(0, 1) === 1, said = right ? JOB[j] : R.pick(JOB.filter(function (x) { return x !== JOB[j]; }));
    return { q: Q.name() + ' says <b>' + f[j] + '</b> is ' + an(said) + '.', fig: W.tile(f[j]), type: 'tf', answer: right,
      why: { options: ['It ends in ' + SUF[JOB[j]] + ', which makes ' + an(JOB[j]) + '.', 'Every word in a family does the same job.'], answer: 0 },
      hint: 'Look at the suffix.', explain: '<b>' + f[j] + '</b> is ' + an(JOB[j]) + '.', meta: { k: 'g8-suffix-job-tf', word: f[j], said: said } };
  }
  function matchJobs() {
    var f = R.pick(FAM);
    return { q: 'Match each word to its job.', type: 'match', pairs: [1, 2, 3].map(function (j) { return [f[j], JOB[j]]; }), hint: 'Look at the suffix at the end.', explain: W.tile(f[0]) + ' &rarr; ' + [1, 2, 3].map(function (j) { return W.tile(f[j]); }).join(' '), meta: { k: 'g8-suffix-match' } };
  }
  function buildJob() {
    var f = R.pick(FAM.filter(function (x) { return x[2].indexOf(x[0]) === 0; })), j = R.int(2, 3), stem = f[0], suf = f[j].slice(stem.length);
    var list = [W.tile(stem, 'base'), W.tile(suf, 'suffix'), W.tile(j === 2 ? 'ion' : 'ive', 'suffix')];
    return { q: 'Build the <b>' + JOB[j] + '</b> from <b>' + stem + '</b>.', type: 'build', parts: list, answer: [0, 1], hint: JOB[j] === 'adjective' ? '-ive makes an adjective.' : '-ively makes an adverb.',
      explain: W.sum([[stem, 'base'], [suf, 'suffix']]), meta: { k: 'g8-suffix-build', want: JOB[j] } };
  }

  /* ---------- the form a sentence needs ---------- */
  function fit(lv) {
    var f = R.pick(FAM), j = R.int(1, 3), frame = f[3 + j];
    return Q.one('Which word fits?', f[j], [1, 2, 3].filter(function (x) { return x !== j; }).map(function (x) { return f[x]; }).concat([f[0]]).slice(0, lv > 1 ? 3 : 2), {
      fig: W.sent(frame.replace('___', W.gap())), prompt: 'Does the gap need a thing, a describing word, or a how word?', hint: 'The gap needs a word that ' + JOBTIP[JOB[j]] + '.',
      explain: W.sent(frame.replace('___', '<b>' + f[j] + '</b>')), meta: { k: 'g8-suffix-fit', frame: frame } });
  }
  function fixForm() {
    var f = R.pick(FAM), j = R.int(1, 3), frame = f[3 + j], bad = f[R.pick([1, 2, 3].filter(function (x) { return x !== j; }))];
    return Q.one('The word in bold is the wrong form. Which word should go there?', f[j], [0, 1, 2, 3].filter(function (x) { return x !== j; }).map(function (x) { return f[x]; }), {
      fig: W.sent(frame.replace('___', '<b>' + bad + '</b>')), prompt: 'What job does the gap need?', hint: 'The gap needs a word that ' + JOBTIP[JOB[j]] + '.',
      explain: W.sent(frame.replace('___', '<b>' + f[j] + '</b>')), meta: { k: 'g8-suffix-fix', frame: frame } });
  }
  function rightSentence(lv) {
    var f = R.pick(FAM), j = R.int(1, 3), frame = f[3 + j], fill = function (x) { return frame.replace('___', f[x]); };
    return Q.one('Which sentence uses the right form?', fill(j), R.some([1, 2, 3].filter(function (x) { return x !== j; }), lv > 1 ? 2 : 1).map(fill), {
      prompt: 'Read each one aloud.', hint: 'The gap needs a word that ' + JOBTIP[JOB[j]] + '.', explain: W.sent(frame.replace('___', '<b>' + f[j] + '</b>')), meta: { k: 'g8-suffix-sentence', frame: frame } });
  }
  function pickNouns() {
    var fs = R.some(FAM, 4), right = fs.slice(0, 2).map(function (f) { return f[1]; }), wrong = fs.slice(2).map(function (f, i) { return f[i ? 3 : 2]; });
    return Q.all('Pick every <b>noun</b>.', right, wrong, { hint: 'Here, the nouns end in -ion.', explain: 'A noun names a thing or an idea.', meta: { k: 'g8-suffix-nouns' } });
  }

  /* ---------- spelling changes ---------- */
  /* [base, suffix, right, wrong] */
  var SPELL = {
    e: [['create', 'ion', 'creation', 'createion'], ['hope', 'ing', 'hoping', 'hopeing'], ['value', 'able', 'valuable', 'valueable'], ['amaze', 'ing', 'amazing', 'amazeing'],
      ['excite', 'ment', 'excitement', 'excitment'], ['use', 'ful', 'useful', 'usful'], ['care', 'less', 'careless', 'carless'], ['manage', 'ment', 'management', 'managment'],
      ['write', 'ing', 'writing', 'writeing'], ['move', 'ment', 'movement', 'movment'], ['nerve', 'ous', 'nervous', 'nerveous'], ['adore', 'able', 'adorable', 'adoreable'],
      ['achieve', 'ment', 'achievement', 'achievment'], ['close', 'ness', 'closeness', 'closness'], ['complete', 'ly', 'completely', 'completly'], ['arrange', 'ment', 'arrangement', 'arrangment'],
      ['drive', 'er', 'driver', 'driveer'], ['safe', 'ty', 'safety', 'safty']],
    y: [['happy', 'ness', 'happiness', 'happyness'], ['beauty', 'ful', 'beautiful', 'beautyful'], ['carry', 'ed', 'carried', 'carryed'], ['busy', 'ly', 'busily', 'busyly'],
      ['play', 'ful', 'playful', 'plaiful'], ['enjoy', 'ment', 'enjoyment', 'enjoiment'], ['study', 'ing', 'studying', 'studiing'], ['try', 'ed', 'tried', 'tryed'],
      ['cry', 'ing', 'crying', 'criing'], ['angry', 'ly', 'angrily', 'angryly'], ['deny', 'al', 'denial', 'denyal'], ['pity', 'ful', 'pitiful', 'pityful'],
      ['employ', 'er', 'employer', 'emploier'], ['lazy', 'ness', 'laziness', 'lazyness'], ['hurry', 'ing', 'hurrying', 'hurriing'], ['pay', 'ment', 'payment', 'paiment'],
      ['delay', 'ed', 'delayed', 'delaied'], ['worry', 'ed', 'worried', 'worryed']],
    dbl: [['begin', 'ing', 'beginning', 'begining'], ['admit', 'ed', 'admitted', 'admited'], ['regret', 'able', 'regrettable', 'regretable'], ['refer', 'al', 'referral', 'referal'],
      ['visit', 'ed', 'visited', 'visitted'], ['open', 'ing', 'opening', 'openning'], ['forget', 'ing', 'forgetting', 'forgeting'], ['occur', 'ed', 'occurred', 'occured'],
      ['permit', 'ed', 'permitted', 'permited'], ['control', 'ed', 'controlled', 'controled'], ['prefer', 'ed', 'preferred', 'prefered'], ['limit', 'ed', 'limited', 'limitted'],
      ['happen', 'ing', 'happening', 'happenning'], ['edit', 'or', 'editor', 'edittor'], ['offer', 'ing', 'offering', 'offerring'], ['upset', 'ing', 'upsetting', 'upseting'],
      ['forbid', 'en', 'forbidden', 'forbiden'], ['commit', 'ed', 'committed', 'commited'], ['budget', 'ed', 'budgeted', 'budgetted']]
  };
  var RULE = { e: 'Drop the silent e before a suffix that starts with a vowel. Keep it before a consonant.', y: 'After a consonant, change y to i (but keep y before -ing). After a vowel, keep the y.',
    dbl: 'Double the last consonant when the stress is on the last beat and the suffix starts with a vowel.' };
  var PROMPT = { e: 'Does the suffix start with a vowel?', y: 'What comes before the y? What does the suffix start with?', dbl: 'Clap the beats. Where is the stress?' };
  /* the two things that can happen, the first being the change */
  var MOVES = { e: ['drop the e', 'keep the e'], y: ['change y to i', 'keep the y'], dbl: ['double the last letter', 'just add it'] };
  /* base + suffix = the right spelling, as tiles (whole: the word to show at the end, or '?') */
  function added(base, suf, whole) { return W.sum([[base, 'base'], [suf, 'suffix']]).replace(base + suf, whole); }
  function changed(k, s) { return k === 'dbl' ? s[2].indexOf(s[0] + s[0].slice(-1)) === 0 : s[2].indexOf(s[0]) !== 0; }
  function spell(k) {
    return function (lv) {
      var s = R.pick(SPELL[k]);
      return Q.one(lv > 1 ? 'Which spelling of <b>' + s[0] + ' + ' + s[1] + '</b> is right?' : 'Add the suffix. Which spelling is right?', s[2], [s[3]], { fig: lv > 1 ? '' : added(s[0], s[1], '?'),
        prompt: PROMPT[k], hint: RULE[k], explain: added(s[0], s[1], s[2]), meta: { k: 'g8-spell', base: s[0], suf: s[1] } });
    };
  }
  function spellTf(k) {
    return function () {
      var s = R.pick(SPELL[k]), right = R.int(0, 1) === 1, shown = right ? s[2] : s[3];
      return { q: 'Is this spelled right?', fig: W.sent(s[0] + ' + ' + s[1] + ' = <b>' + shown + '</b>'), type: 'tf', answer: right,
        why: { options: [RULE[k], 'Always just add the suffix to the end.'], answer: 0 }, hint: PROMPT[k], explain: W.tile(s[2], 'word'), meta: { k: 'g8-spell-tf', base: s[0], suf: s[1], shown: shown } };
    };
  }
  function spellPick(k) {
    return function (lv) {
      var ss = R.some(SPELL[k], 4), n = lv > 1 ? 2 : 1;
      return Q.all('Pick every word that is spelled right.', ss.slice(0, 2).map(function (s) { return s[2]; }), ss.slice(2, 2 + n).map(function (s) { return s[3]; }), {
        prompt: PROMPT[k], hint: RULE[k], explain: ss.slice(0, 2 + n).map(function (s) { return added(s[0], s[1], s[2]); }).join(''), meta: { k: 'g8-spell-pick' } });
    };
  }
  function spellMove(k) {
    return function () {
      var s = R.pick(SPELL[k]), m = MOVES[k][changed(k, s) ? 0 : 1];
      return Q.tiles('Add <b>-' + s[1] + '</b> to <b>' + s[0] + '</b>. What happens?', m, MOVES[k].filter(function (x) { return x !== m; }), { fig: added(s[0], s[1], '?'),
        prompt: PROMPT[k], hint: RULE[k], explain: added(s[0], s[1], s[2]), meta: { k: 'g8-spell-rule', base: s[0], suf: s[1] } });
    };
  }

  /* ---------- in- becomes im-, il-, ir- ---------- */
  var IN = ['possible', 'mature', 'balance', 'legal', 'logical', 'regular', 'responsible', 'correct', 'visible', 'complete', 'patient', 'mobile', 'polite', 'perfect', 'literate',
    'relevant', 'reversible', 'accurate', 'active', 'direct', 'moral', 'legible', 'rational', 'replaceable', 'mortal', 'measurable', 'partial', 'practical', 'edible', 'convenient',
    'sensitive', 'resistible'];
  function preFor(b) { return /^[bmp]/.test(b) ? 'im' : /^l/.test(b) ? 'il' : /^r/.test(b) ? 'ir' : 'in'; }
  function notWord(b) { return preFor(b) + b; }
  /* a common misspelling: one l, m or r instead of two, or the wrong prefix */
  function misspell(b) { var p = preFor(b); return /^[lmr]/.test(b) ? 'i' + b : p === 'im' ? 'in' + b : 'un' + b; }
  function inPrefix(lv) {
    var b = R.pick(IN), pre = preFor(b);
    return Q.tiles('Which prefix makes <b>not ' + b + '</b>?', pre, ['in', 'im', 'il', 'ir'].filter(function (p) { return p !== pre; }).slice(0, lv > 1 ? 3 : 2), {
      fig: '<span class="wsum">' + W.tile('?', 'prefix') + W.tile(b, 'base') + '</span>', prompt: 'Look at the first letter of ' + b + '.',
      hint: 'in- changes to im- before b, m or p, to il- before l, and to ir- before r.', explain: W.tile(notWord(b), 'word'), meta: { k: 'g8-in-prefix', base: b } });
  }
  function inTf() {
    var b = R.pick(IN), right = R.int(0, 1) === 1, shown = right ? notWord(b) : misspell(b);
    return { q: 'Is this spelled right?', fig: W.sent('not ' + b + ' = <b>' + shown + '</b>'), type: 'tf', answer: right,
      why: { options: ['Before ' + b.charAt(0) + ', the prefix is ' + preFor(b) + '-.', 'The prefix is always in-.'], answer: 0 }, hint: 'Look at the first letter of ' + b + '.',
      explain: W.tile(preFor(b), 'prefix') + W.tile(b, 'base') + ' = ' + W.tile(notWord(b), 'word'), meta: { k: 'g8-in-tf', base: b, shown: shown } };
  }
  function inPick(lv) {
    var bs = R.some(IN, 4), n = lv > 1 ? 2 : 1;
    return Q.all('Pick every word that is spelled right.', bs.slice(0, 2).map(notWord), bs.slice(2, 2 + n).map(misspell), { prompt: 'Check the letters where the prefix meets the base.',
      hint: 'il + legal = illegal: both l' + '’' + 's stay.', explain: bs.slice(0, 2 + n).map(notWord).join(', ') + '.', meta: { k: 'g8-in-pick' } });
  }
  function inMeaning(lv) {
    var b = R.pick(IN), w = notWord(b);
    return Q.one('What does <b>' + w + '</b> mean?', 'not ' + b, ['very ' + b, b + ' again', 'before ' + b].slice(0, lv > 1 ? 3 : 2), { fig: W.tile(preFor(b), 'prefix') + W.tile(b, 'base'),
      prompt: 'What does the prefix mean?', hint: 'in-, im-, il- and ir- all mean not.', explain: '<b>' + w + '</b> = not ' + b + '.', meta: { k: 'g8-in-mean', base: b } });
  }
  function inMatch() {
    var bs = ['im', 'il', 'ir', 'in'].map(function (p) { return R.pick(IN.filter(function (b) { return preFor(b) === p; })); });
    var three = R.some(bs, 3);
    return { q: 'Match each word to the prefix that makes it mean <b>not</b>.', type: 'match', pairs: three.map(function (b) { return [b, preFor(b)]; }), hint: 'Look at the first letter of each word.',
      explain: three.map(notWord).join(', ') + '.', meta: { k: 'g8-in-match' } };
  }

  Atlas.register('roots', {
    full: true,
    lessons: [{
      id: 'roots', title: 'Greek and Latin roots', sub: 'Most long words are built from old parts.',
      concepts: [
        { slug: 'root', title: 'A root holds the meaning', exp: ['B2.1'], skill: 'roots',
          model: [
            step(W.tile('port', 'base'), '<b>port</b> = carry. It comes from Latin.'),
            step(W.sum([['trans', 'prefix'], ['port', 'base']]), '<b>trans-</b> = across. Carry across.'),
            step(W.tile('spect', 'base'), '<b>spect</b> = look.'),
            step(W.sum([['in', 'prefix'], ['spect', 'base']]), 'Look into closely.'),
            step(W.sum([['spect', 'base'], ['ator', 'suffix']]), 'A person who looks on.')
          ],
          guided: [function () { return meaning(WORDS)(1); }, whichPart, function () { return wordFor(WORDS)(1); }],
          check: [function () { return meaning(WORDS)(2); }, function () { return wordFor(WORDS)(2); }, whichPart, tfRoot(WORDS), matchWords],
          coach: '<p>When a long word stops the reader, cover the prefix and suffix and ask: "What is the root? What does it mean?" Keep a growing list of roots on a card.</p>',
          mistake: '<p>Guessing from the first few letters. Find the root first, then build the meaning outward: prefix, root, suffix.</p>' },
        { slug: 'two-roots', title: 'Two roots, one word', exp: ['B2.1'], skill: 'two-roots',
          model: [
            step(W.sum([['tele', 'base'], ['scope', 'base']]), '<b>tele</b> = far. <b>scope</b> = look at.'),
            step(W.means('think', 'a tool for looking at far things')),
            step(W.sum([['bio', 'base'], ['graph', 'base'], ['y', 'suffix']]), '<b>bio</b> = life. <b>graph</b> = write.'),
            step(W.means('book', 'writing about a life'))
          ],
          guided: [function () { return meaning(TWO)(1); }, function () { return buildTwo(1); }, function () { return wordFor(TWO)(1); }],
          check: [function () { return meaning(TWO)(2); }, function () { return buildTwo(2); }, matchRoots(TWOROOTS), function () { return wordFor(TWO)(2); }, tfRoot(TWO)],
          coach: '<p>Science and math are full of two-root words. Collect them from other subjects: thermometer, photograph, geology.</p>',
          mistake: '<p>Reading the roots in the wrong order of meaning. A telescope is a tool for looking at far things; say the meaning, then check it makes sense.</p>' },
        { slug: 'family', title: 'A root makes a word family', exp: ['B2.1'], skill: 'families',
          model: [
            step(W.tile('rupt', 'base'), '<b>rupt</b> = break.'),
            step(W.tile('interrupt') + ' ' + W.tile('erupt') + ' ' + W.tile('disrupt'), 'Break in between. Break out. Break up.'),
            step(W.tile('tract', 'base'), '<b>tract</b> = pull.'),
            step(W.tile('tractor') + ' ' + W.tile('distract') + ' ' + W.tile('subtract'), 'Each one pulls something.')
          ],
          guided: [function () { return family(1); }, matchRoots(ONEROOTS), oddOut],
          check: [function () { return family(2); }, function () { return pickFamily(1); }, oddOut, matchRoots(ONEROOTS), function () { return pickFamily(2); }],
          coach: '<p>Pick one root a week. Hunt for it in reading across subjects and add each word to a family list.</p>',
          mistake: '<p>Lookalikes: not every "port" or "vis" is the root (sport, visa). Check that the meaning fits.</p>' }
      ]
    }, {
      id: 'suffixes', title: 'Suffixes and spelling', sub: 'Suffixes change a word’s job, and sometimes its spelling.',
      concepts: [
        { slug: 'jobs', title: 'A suffix can change a word’s job', exp: ['B2.1'], skill: 'suffix-jobs',
          model: [
            step(W.tile('decide'), 'A verb: an action.'),
            step(W.sum([['decis', 'base'], ['ion', 'suffix']]), '<b>-ion</b>: a noun, a thing or idea.'),
            step(W.sum([['decis', 'base'], ['ive', 'suffix']]), '<b>-ive</b>: an adjective.'),
            step(W.sum([['decisive', 'base'], ['ly', 'suffix']]), '<b>-ly</b>: an adverb, how it is done.'),
            step(W.tile('protect') + ' ' + W.tile('protection') + ' ' + W.tile('protective') + ' ' + W.tile('protectively'), 'Same suffixes, new word.')
          ],
          guided: [function () { return jobOf(1); }, matchJobs, jobTf],
          check: [function () { return jobOf(2); }, buildJob, jobTf, matchJobs, function () { return jobOf(3); }],
          coach: '<p>Say one word family aloud in sentences: "I decide. I made a decision. I am decisive. I acted decisively." The sentence shows the job.</p>',
          mistake: '<p>Using the right family but the wrong form ("a creatively idea"). Ask what the gap needs: a thing, a describing word, or a how word.</p>' },
        { slug: 'fit', title: 'Pick the form the sentence needs', exp: ['B2.1'], skill: 'suffix-fit',
          model: [
            step(W.sent('A ' + W.gap() + ' leader acts quickly.'), 'The gap describes <b>leader</b>.'),
            step(W.sent('A <b>decisive</b> leader acts quickly.'), 'An adjective: <b>-ive</b>.'),
            step(W.sent('The sculpture is her newest ' + W.gap() + '.'), 'After <b>her newest</b>: a thing.'),
            step(W.sent('The sculpture is her newest <b>creation</b>.'), 'A noun: <b>-ion</b>.'),
            step(W.sent('They solved the problem <b>creatively</b>.'), 'How they solved it: <b>-ly</b>.')
          ],
          guided: [function () { return fit(1); }, fixForm, function () { return rightSentence(1); }],
          check: [function () { return fit(2); }, pickNouns, fixForm, function () { return rightSentence(2); }, function () { return fit(3); }],
          coach: '<p>Read the sentence aloud with each form. The ear often catches the wrong one.</p>',
          mistake: '<p>Choosing by meaning only. All the options mean nearly the same; the job in the sentence decides.</p>' },
        { slug: 'e-drop', title: 'Drop the silent e before a vowel', exp: ['B2.1'], skill: 'e-drop',
          model: [
            step(added('create', 'ion', 'creation'), '<b>-ion</b> starts with a vowel. The e goes.'),
            step(added('excite', 'ment', 'excitement'), '<b>-ment</b> starts with a consonant. The e stays.'),
            step(added('hope', 'ing', 'hoping'), '<b>-ing</b> starts with i, a vowel.'),
            step(added('use', 'ful', 'useful'), '<b>-ful</b> starts with f, a consonant.')
          ],
          guided: [function () { return spell('e')(1); }, spellMove('e'), spellTf('e')],
          check: [function () { return spell('e')(2); }, spellMove('e'), spellTf('e'), function () { return spellPick('e')(2); }, function () { return spell('e')(1); }],
          coach: '<p>Have the child circle the first letter of the suffix: vowel or consonant? That one look decides.</p>',
          mistake: '<p>Dropping the e everywhere (excitment, usful).</p>' },
        { slug: 'y-i', title: 'Change y to i after a consonant', exp: ['B2.1'], skill: 'y-to-i',
          model: [
            step(added('happy', 'ness', 'happiness'), '<b>p</b> comes before the y.'),
            step(added('play', 'ful', 'playful'), '<b>a</b> comes before the y: keep it.'),
            step(added('carry', 'ed', 'carried'), '<b>r</b> comes before the y.'),
            step(added('study', 'ing', 'studying'), 'Keep the y before <b>-ing</b>.')
          ],
          guided: [function () { return spell('y')(1); }, spellMove('y'), spellTf('y')],
          check: [function () { return spell('y')(2); }, spellMove('y'), spellTf('y'), function () { return spellPick('y')(2); }, function () { return spell('y')(1); }],
          coach: '<p>"Studiing" looks wrong because English avoids two i’s in a row. Point that out once.</p>',
          mistake: '<p>Changing every y (plaiful). Check the letter before the y.</p>' },
        { slug: 'double', title: 'Double the last consonant when the end is stressed', exp: ['B2.1'], skill: 'doubling',
          model: [
            step(W.syl(['be', '<b>GIN</b>']), 'Stress on the last beat.'),
            step(added('begin', 'ing', 'beginning'), 'Two n’s.'),
            step(W.syl(['<b>VIS</b>', 'it']), 'Stress on the first beat.'),
            step(added('visit', 'ed', 'visited'), 'One t.'),
            step(W.syl(['ad', '<b>MIT</b>']) + ' ' + added('admit', 'ed', 'admitted'), 'Last beat again: two t’s.')
          ],
          guided: [function () { return spell('dbl')(1); }, spellMove('dbl'), spellTf('dbl')],
          check: [function () { return spell('dbl')(2); }, spellMove('dbl'), spellTf('dbl'), function () { return spellPick('dbl')(2); }, function () { return spell('dbl')(1); }],
          coach: '<p>Say the word and clap the beats. The loud clap is the stress.</p>',
          mistake: '<p>Doubling after an unstressed end (visitted, openning).</p>' },
        { slug: 'in-prefix', title: 'in- becomes im-, il- or ir-', exp: ['B2.1'], skill: 'in-prefix',
          model: [
            step(W.tile('im', 'prefix') + W.tile('possible', 'base'), 'Before b, m or p.'),
            step(W.tile('il', 'prefix') + W.tile('legal', 'base'), 'Before l.'),
            step(W.tile('ir', 'prefix') + W.tile('regular', 'base'), 'Before r.'),
            step(W.tile('in', 'prefix') + W.tile('correct', 'base'), 'Any other letter. All of them mean <b>not</b>.')
          ],
          guided: [function () { return inPrefix(1); }, function () { return inMeaning(1); }, inTf],
          check: [function () { return inPrefix(2); }, inTf, function () { return inPick(2); }, inMatch, function () { return inMeaning(2); }],
          coach: '<p>The prefix changes to make the word easier to say. Try saying "inpossible" quickly: the lips close for the p, so it becomes im-.</p>',
          mistake: '<p>Writing one l or one r (ilegal, iresponsible). The prefix keeps its own letter: il + legal.</p>' }
      ]
    }],
    practice: [
      { id: 'roots', name: 'Greek and Latin roots', code: 'B2.1', gen: meaning(WORDS) },
      { id: 'two-roots', name: 'Words with two roots', code: 'B2.1', gen: meaning(TWO) },
      { id: 'families', name: 'Word families', code: 'B2.1', gen: family },
      { id: 'suffix-jobs', name: 'Suffixes and word jobs', code: 'B2.1', gen: jobOf },
      { id: 'suffix-fit', name: 'The form a sentence needs', code: 'B2.1', gen: fit },
      { id: 'e-drop', name: 'Dropping the silent e', code: 'B2.1', gen: spell('e') },
      { id: 'y-to-i', name: 'Changing y to i', code: 'B2.1', gen: spell('y') },
      { id: 'doubling', name: 'Doubling the last consonant', code: 'B2.1', gen: spell('dbl') },
      { id: 'in-prefix', name: 'in-, im-, il- and ir-', code: 'B2.1', gen: inPrefix }
    ]
  });

  Q.shapes('roots', {
    roots: [[1, 'which-part', whichPart], [1, 'which-word', wordFor(WORDS)], [1, 'true-false', tfRoot(WORDS)], [2, 'match', matchWords]],
    'two-roots': [[1, 'build', buildTwo], [1, 'which-word', wordFor(TWO)], [1, 'true-false', tfRoot(TWO)], [2, 'match', matchRoots(TWOROOTS)]],
    families: [[1, 'odd-one-out', oddOut], [1, 'pick-all', pickFamily], [2, 'match', matchRoots(ONEROOTS)]],
    'suffix-jobs': [[1, 'true-false', jobTf], [1, 'match', matchJobs], [2, 'build', buildJob]],
    'suffix-fit': [[1, 'fix', fixForm], [1, 'right-sentence', rightSentence], [2, 'pick-nouns', pickNouns]],
    'e-drop': [[1, 'what-happens', spellMove('e')], [1, 'true-false', spellTf('e')], [2, 'pick', spellPick('e')]],
    'y-to-i': [[1, 'what-happens', spellMove('y')], [1, 'true-false', spellTf('y')], [2, 'pick', spellPick('y')]],
    doubling: [[1, 'what-happens', spellMove('dbl')], [1, 'true-false', spellTf('dbl')], [2, 'pick', spellPick('dbl')]],
    'in-prefix': [[1, 'meaning', inMeaning], [1, 'true-false', inTf], [2, 'pick', inPick], [2, 'match', inMatch]]
  });
})();
