/* Grade 6: critical reading. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 6, C3 Critical Thinking in Literacy:
   C3.2 local and global inferences, using explicit and implicit evidence
   C3.3 main and supporting ideas, the quality of information and its relevance for a purpose, and conclusions
   C3.5 explicit and implicit perspectives, evidence of bias, and ways to avoid bias
   C3.6 how topics such as diversity, inclusion and accessibility are addressed, the messages, and the positions presented
   With a grown-up: C3.4 cultural elements in texts, C3.7 texts by First Nations, Metis and Inuit creators and their contexts,
   C3.8 comparing the critical thinking skills that helped.
   Passages are in ../texts.js. Answer checks: tests/verify/grade6-critical.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var AP = '’';

  /* ---------- said or worked out: a fact (stated) or a conclusion (inferred) from a passage ---------- */
  function both() { return T.list('infer').filter(function (t) { return t.facts; }); }
  function stmt(f) { return f[0] + ' <b>' + f[1].replace(/\.$/, '') + '</b>'; }
  function said(t) { return R.int(0, 1) === 1 ? [stmt(R.pick(t.facts)), true] : [stmt(R.pick(t.infer)), false]; }
  function stated(lv) {
    var t = R.pick(both()), s = said(t);
    return { q: 'Does the text <b>say</b> this, or do you <b>work it out</b>?', fig: W.sent(s[0]) + T.show(t), type: 'tap', tiles: ['The text says it.', 'I work it out from clues.'], answer: s[1] ? 0 : 1,
      prompt: 'Can you point to the exact words?', hint: 'If the words are there, it is stated. If you used clues, it is an inference.',
      explain: s[1] ? 'The words are in the text: <b>explicit</b> evidence.' : 'You worked it out from clues: an <b>inference</b>.', meta: { k: 'g6-stated', t: t.title } };
  }
  function whichInferred(lv) {
    var t = R.pick(both());
    return Q.one('Which one is an <b>inference</b>, not stated in the text?', stmt(R.pick(t.infer)), R.some(t.facts, lv > 1 ? 2 : 1).map(stmt), { fig: T.show(t),
      hint: 'Which one can you NOT point to in the text?', explain: 'You work it out from clues.', meta: { k: 'g6-which-inferred', t: t.title } });
  }
  function pickInferred() {
    var t = R.pick(both().filter(function (x) { return x.infer.length >= 2; }));
    return Q.all('Pick every idea you <b>work out</b> from clues.', R.some(t.infer, 2).map(stmt), R.some(t.facts, 2).map(stmt), { fig: T.show(t),
      hint: 'Look for the exact words. If they are not there, it is an inference.', explain: 'The others are stated in the text.', meta: { k: 'g6-pick-inferred', t: t.title } });
  }
  function statedTf() {
    var t = R.pick(both()), s = said(t);
    return { q: Q.name() + ' says the text <b>states</b> this directly:', fig: W.sent(s[0]) + T.show(t), type: 'tf', answer: s[1],
      why: { options: ['The exact words are in the text.', 'It is worked out from clues.'], answer: s[1] ? 0 : 1 },
      hint: 'Can you point to it?', explain: s[1] ? 'Stated: the words are there.' : 'Inferred: you work it out.', meta: { k: 'g6-stated-tf', t: t.title } };
  }

  /* ---------- the big message (a global inference) ---------- */
  function themes() { return T.list('theme'); }
  function theme(lv, t) {
    t = t || R.pick(themes());
    return Q.one('What is the <b>big message</b> of the whole text?', t.theme[0], t.theme.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t),
      prompt: 'What does the writer want you to understand about life?', hint: 'A message fits the whole text, and goes beyond it.', explain: W.web(t.theme[0], [t.theme[3]]), meta: { k: 'g6-theme', t: t.title } });
  }
  function topicOrMessage(lv) {
    var t = R.pick(themes()), wantTopic = R.int(0, 1) === 1;
    return Q.tiles('Which is the <b>' + (wantTopic ? 'topic' : 'message') + '</b> of this text?', wantTopic ? t.theme[3] : t.theme[0], [wantTopic ? t.theme[0] : t.theme[3]], { fig: T.show(t),
      hint: 'The topic is what it is about. The message is what it teaches.', explain: W.web(t.theme[0], [t.theme[3]]), meta: { k: 'g6-topic-message', t: t.title, topic: wantTopic } });
  }
  function themeTap(lv) {
    var t = R.pick(themes()), i = t.lines.findIndex(function (l) { return l.indexOf(t.theme[4]) >= 0; });
    return { q: 'The message: <b>' + t.theme[0] + '</b> Tap the sentence that shows it best.', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      hint: 'Which moment teaches the lesson?', explain: 'This moment shows it.', meta: { k: 'g6-theme-tap', t: t.title } };
  }
  function themeTf(lv) {
    var t = R.pick(themes()), right = R.int(0, 1) === 1, s = right ? t.theme[0] : R.pick(t.theme.slice(1, 3));
    return { q: Q.name() + ' says the message is:', fig: W.sent(s) + T.show(t), type: 'tf', answer: right,
      why: { options: ['It fits the whole text and teaches about life.', 'It does not fit the whole text.'], answer: right ? 0 : 1 },
      hint: 'Does the whole text show it?', explain: 'The message: ' + t.theme[0], meta: { k: 'g6-theme-tf', t: t.title, said: s } };
  }

  /* ---------- details that support, and facts that fit the purpose ---------- */
  /* [main idea, two details that support it, a true detail that does not] */
  var SUPPORT = [['Beavers change the land around them.', ['Their dams flood streams and make new ponds.', 'New ponds become homes for frogs and ducks.'], 'Beavers have orange front teeth.'],
    ['Walking to school is good for students.', ['It gives them exercise before class.', 'Fresh air helps them feel awake.'], 'Some students live in apartments.'],
    ['The ramp made the school fairer.', ['Now everyone can use the same front door.', 'Visitors in wheelchairs no longer wait at a side door.'], 'The steps are made of concrete.'],
    ['Recycling saves resources.', ['Aluminum cans can be made into new cans again and again.', 'Recycled paper means fewer trees are cut down.'], 'Recycling trucks are often blue.'],
    ['Lacrosse matters deeply to many Haudenosaunee people.', ['It is played to give thanks and to help people heal.', 'Many call it the Creator' + AP + 's Game.'], 'Lacrosse balls are made of rubber.'],
    ['Chimney swifts need our help.', ['They are losing places to roost.', 'They are a threatened species in Ontario.'], 'Swifts are small, dark birds.'],
    ['Libraries offer more than books.', ['Many lend tools, games and museum passes.', 'They offer free homework help.'], 'Some libraries have red doors.'],
    ['Monarchs depend on milkweed.', ['Their caterpillars eat only milkweed leaves.', 'They lay their eggs only on milkweed.'], 'Monarch wings are orange and black.']];
  /* [purpose, a relevant fact, a true fact that is not relevant] */
  var RELEVANT = [['a report on how beavers build dams', 'Beavers pile sticks and pack them with mud.', 'Beavers appear on the Canadian nickel.'],
    ['a poster about staying safe on lake ice', 'Ice should be at least 10 cm thick to walk on.', 'Some lakes have fish called pike.'],
    ['a speech asking for a town skate park', 'Teens now skate in the library parking lot.', 'The first skateboards were made in the 1950s.'],
    ['a report on how monarchs migrate', 'Monarchs fly about 4000 kilometres to Mexico.', 'Monarch caterpillars have stripes.'],
    ['a speech asking for a school garden', 'A garden would let students grow food for the food bank.', 'Tomatoes were first grown in South America.'],
    ['a guide to packing for a canoe trip', 'Pack food in a waterproof barrel.', 'Some canoes are made of aluminum.'],
    ['a poster about saving water at home', 'A five-minute shower uses less water than a bath.', 'Water boils at 100 degrees Celsius.'],
    ['a report on the history of lacrosse', 'First Nations played lacrosse long before Europeans arrived.', 'Lacrosse sticks can be bought online.']];
  function supports(lv) {
    var s = R.pick(SUPPORT);
    return Q.one('Which detail <b>supports</b> the main idea?', R.pick(s[1]), [s[2]].concat(lv > 1 ? [R.pick(R.pick(SUPPORT.filter(function (x) { return x !== s; }))[1])] : []), {
      fig: W.web(s[0], [W.gap(), W.gap()]), prompt: 'Does it prove or explain the main idea?', hint: 'A detail can be true and still not help.', explain: W.web(s[0], s[1]), meta: { k: 'g6-supports', main: s[0] } });
  }
  function notSupport() {
    var s = R.pick(SUPPORT);
    return Q.one('Which detail does <b>not</b> support the main idea?', s[2], s[1], { fig: W.web(s[0], [W.gap(), W.gap(), W.gap()]),
      hint: 'Which one is true, but does not help prove it?', explain: 'True, but off topic: ' + s[2], meta: { k: 'g6-not-support', main: s[0] } });
  }
  function relevant(lv) {
    var r = R.pick(RELEVANT);
    return Q.one('You are writing <b>' + r[0] + '</b>. Which fact belongs?', r[1], [r[2]].concat(lv > 1 ? [R.pick(RELEVANT.filter(function (x) { return x !== r; }))[1]] : []), { prompt: 'Does it help the purpose?',
      hint: 'Every fact may be true. Which one fits the purpose?', explain: r[1], meta: { k: 'g6-relevant', purpose: r[0] } });
  }
  function supportTf() {
    var s = R.pick(SUPPORT), right = R.int(0, 1) === 1, d = right ? R.pick(s[1]) : s[2];
    return { q: Q.name() + ' uses this detail to support the main idea.', fig: W.web(s[0], [d]), type: 'tf', answer: right,
      why: { options: ['It proves or explains the main idea.', 'It is true, but it does not help.'], answer: right ? 0 : 1 },
      hint: 'Does it help prove the main idea?', explain: W.web(s[0], s[1]), meta: { k: 'g6-support-tf', main: s[0], d: d } };
  }

  /* ---------- reliable sources ---------- */
  /* [what you need, a reliable source, a weak source, why the first is better] */
  var SOURCES = [['a report on polar bear numbers', 'a recent study by Arctic scientists', 'an old blog post by a tourist', 'It is recent, and experts made it.'],
    ['facts about Ontario' + AP + 's lakes', 'the Ontario government website', 'a comment under a fishing video', 'It is an official source that checks its facts.'],
    ['how to treat a bee sting', 'a children' + AP + 's hospital website', 'a post from a stranger on social media', 'Medical experts wrote it.'],
    ['the history of a treaty', 'a book by historians that lists its sources', 'a meme about the treaty', 'Experts wrote it, and it shows its sources.'],
    ['the date of a solar eclipse', 'the Canadian Space Agency website', 'a rumour from a friend', 'Space experts made it.'],
    ['how to care for a pet turtle', 'a guide written by a veterinarian', 'a comment on a pet photo', 'An animal expert wrote it.'],
    ['today' + AP + 's weather warning', 'Environment Canada', 'a weather post from last year', 'It is official and up to date.'],
    ['how many people live in Toronto', 'Statistics Canada', 'a guess in an online forum', 'It is an official source that counts carefully.']];
  var WEAK_WHY = ['It has more likes.', 'It looks more colourful.', 'It is shorter.', 'It came up first in the search.'];
  var CHECKS = ['Who made it?', 'When was it made or updated?', 'Does it show where its facts come from?', 'Do other reliable sources agree?'];
  var NOCHECK = ['Does it have lots of likes?', 'Is it colourful?', 'Is it short?', 'Was it the first search result?'];
  function reliable(lv) {
    var s = R.pick(SOURCES);
    return Q.one('You need <b>' + s[0] + '</b>. Which source is more reliable?', s[1], [s[2]].concat(lv > 1 ? [R.pick(SOURCES.filter(function (x) { return x !== s; }))[2]] : []), {
      prompt: 'Who made it? Do they know the topic? Is it up to date?', hint: 'Experts, up to date, with sources.', explain: W.means('read', s[1]), meta: { k: 'g6-reliable', need: s[0] } });
  }
  function reliableTf() {
    var s = R.pick(SOURCES), good = R.int(0, 1) === 1;
    return { q: 'You need ' + s[0] + '. Is this a reliable source?', fig: W.means(good ? 'read' : 'screen', good ? s[1] : s[2]), type: 'tf', answer: good,
      why: { options: ['Experts or an official source made it.', 'Anyone could have made it, or it is out of date.'], answer: good ? 0 : 1 },
      hint: 'Who made it, and do they know the topic?', explain: 'Reliable: <b>' + s[1] + '</b>.', meta: { k: 'g6-reliable-tf', src: good ? s[1] : s[2] } };
  }
  function whyReliable(lv) {
    var s = R.pick(SOURCES);
    return Q.one('Why is <b>' + s[1] + '</b> better than <b>' + s[2] + '</b>?', s[3], R.some(WEAK_WHY, lv > 1 ? 3 : 2), {
      hint: 'Think about who made it and when.', explain: s[3], meta: { k: 'g6-why-reliable', need: s[0] } });
  }
  function pickChecks() {
    return Q.all('Pick every question that helps you check a source.', R.some(CHECKS, 2), R.some(NOCHECK, 2), {
      hint: 'Who, when, and where the facts come from.', explain: 'Who made it, when, where the facts come from, and whether others agree.', meta: { k: 'g6-pick-checks' } });
  }

  /* ---------- perspective and bias ---------- */
  function opinions() { return T.list('view'); }
  function whosePov(lv) {
    var t = R.pick(opinions());
    return Q.one('Whose <b>perspective</b> is this?', t.view.who, opinions().filter(function (x) { return x !== t; }).map(function (x) { return x.view.who; }).slice(0, lv > 1 ? 2 : 1).concat([t.view.missing]), { fig: T.show(t),
      hint: 'Look at who posted it.', explain: 'It was posted by <b>' + t.view.who + '</b>.', meta: { k: 'g6-whose-pov', t: t.title } });
  }
  function thinks(lv) {
    var t = R.pick(opinions());
    return Q.one('What does the writer want?', t.view.thinks, t.view.wrong.slice(0, lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'Look at the first and last sentences.', explain: t.view.thinks, meta: { k: 'g6-thinks', t: t.title } });
  }
  function biasClue(lv) {
    var t = R.pick(opinions()), b = R.pick(t.view.bias), plain = T.body(t).filter(function (l) { return t.view.bias.every(function (x) { return l.indexOf(x) < 0; }) && !/^Posted by/.test(l); });
    return Q.one('Which words are a clue of <b>bias</b> (one-sided thinking)?', b, R.some(plain, lv > 1 ? 2 : 1).map(function (l) { return l.split(' ').slice(0, 5).join(' '); }), { fig: T.show(t),
      prompt: 'Look for loaded words, or claims about everyone.', hint: 'Did they really ask everyone? Are the words fair?', explain: '<mark class="hl">' + b + '</mark>', meta: { k: 'g6-bias-clue', t: t.title } });
  }
  function biasTap() {
    var t = R.pick(opinions()), b = R.pick(t.view.bias), i = t.lines.findIndex(function (l) { return l.indexOf(b) >= 0; });
    return { q: 'Tap a sentence that shows <b>bias</b>.', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      hint: 'Look for a claim about everyone, or an unkind word.', explain: '<mark class="hl">' + b + '</mark>', meta: { k: 'g6-bias-tap', t: t.title, b: b } };
  }

  function biasTf() {
    var t = R.pick(opinions()), lines = T.body(t).filter(function (l) { return !/^Posted by/.test(l); }), l = R.pick(lines), biased = t.view.bias.some(function (b) { return l.indexOf(b) >= 0; });
    return { q: Q.name() + ' says this sentence shows <b>bias</b>.', fig: W.sent(l), type: 'tf', answer: biased,
      why: { options: ['It uses loaded words or a claim about everyone.', 'It is a plain fact or a request.'], answer: biased ? 0 : 1 },
      hint: 'Look for unkind words, or words like everyone and nobody.', explain: biased ? 'One-sided words.' : 'No loaded words here.', meta: { k: 'g6-bias-tf', t: t.title } };
  }

  /* ---------- missing voices, and fairer writing ---------- */
  /* [a loaded sentence, a fairer way to say it] */
  var LOADED = [['Snowmobiles are loud, smelly machines that ruin our trails.', 'Snowmobiles can be loud, and some skiers find the noise bothers them.'],
    ['Only a grumpy person would want a short lunch.', 'Some people prefer a short lunch so the day ends earlier.'], ['Everyone hates the new bus schedule.', 'Many riders say the new bus schedule is hard to use.'],
    ['That ugly old library is a waste of money.', 'The old library needs repairs that will cost money.'], ['Nobody reads paper books anymore.', 'Many people now read on screens as well as on paper.'],
    ['The new park is a total disaster.', 'The new park has fewer benches than people hoped.'], ['Video games rot your brain.', 'Some studies link too much screen time with less sleep.'],
    ['Anyone who wants parking does not care about nature.', 'Some drivers need parking close to the shops.']];
  function missing(lv) {
    var t = R.pick(opinions());
    return Q.one('Whose voice is <b>missing</b> from this text?', t.view.missing, [t.view.who].concat(lv > 1 ? [R.pick(opinions().filter(function (x) { return x !== t; })).view.missing] : []), { fig: T.show(t),
      hint: 'Who else is affected, but not heard?', explain: 'We do not hear from <b>' + t.view.missing + '</b>.', meta: { k: 'g6-missing', t: t.title } });
  }
  function avoidBias(lv) {
    var t = R.pick(opinions());
    return Q.one('How could the writer make this <b>less biased</b>?', t.view.fix, ['Use more exclamation marks.', 'Ask more people who already agree.'].slice(0, lv > 1 ? 2 : 1), {
      fig: T.show(t), hint: 'Fair writing gives more than one side, with facts.', explain: t.view.fix, meta: { k: 'g6-avoid-bias', t: t.title } });
  }
  function fairer(lv) {
    var p = R.pick(LOADED);
    return Q.one('Which way of saying it is <b>fairer</b>?', p[1], [p[0]].concat(lv > 1 ? [R.pick(LOADED.filter(function (x) { return x !== p; }))[0]] : []), {
      hint: 'Fair words do not insult, and do not claim everyone agrees.', explain: W.sent(p[1]), meta: { k: 'g6-fair-words' } });
  }
  function fairTf() {
    var p = R.pick(LOADED), fair = R.int(0, 1) === 1;
    return { q: Q.name() + ' rewrote a sentence. Is it fair?', fig: W.sent(fair ? p[1] : p[0]), type: 'tf', answer: fair,
      why: { options: ['It is calm and does not claim too much.', 'It uses loaded words or claims about everyone.'], answer: fair ? 0 : 1 },
      hint: 'Look for insults, or words like everyone and nobody.', explain: 'Fair: ' + q(p[1]), meta: { k: 'g6-fair-tf', s: fair ? p[1] : p[0] } };
  }
  function q(s) { return '“' + s + '”'; }

  /* ---------- positions on an issue ---------- */
  var ISSUES = [{ topic: 'Every school event should be wheelchair accessible.', for: ['Every student should be able to join every event.', 'Ramps and lifts are worth the cost.'],
    against: ['Changing old buildings costs too much.', 'Only some events need to be accessible.'] },
    { topic: 'School news should be shared in several languages.', for: ['Families who speak other languages should get the news too.', 'It shows that every family belongs.'],
      against: ['Translating every message takes too much time.', 'Most families already read English.'] },
    { topic: 'Library shelves should include characters from many cultures.', for: ['Every reader should see themselves in a book.', 'Reading about others builds understanding.'],
      against: ['The library has no space for new books.', 'Readers should only choose classic books.'] },
    { topic: 'School teams should give every player time on the field.', for: ['Everyone deserves a chance to learn the game.', 'Playing time builds confidence.'],
      against: ['Teams win more with only the strongest players.', 'Top players will get bored on the bench.'] },
    { topic: 'The town should add captions to all its online videos.', for: ['People who are Deaf or hard of hearing can follow along.', 'Captions also help people learning English.'],
      against: ['Captions cost money to make.', 'Most viewers turn the sound on anyway.'] }];
  function position() {
    var iss = R.pick(ISSUES), forIt = R.int(0, 1) === 1, s = R.pick(forIt ? iss.for : iss.against);
    return { q: 'Is this person <b>for</b> or <b>against</b> the idea?', fig: W.sent(iss.topic) + W.means('talk', s), type: 'tap', tiles: ['for', 'against'], answer: forIt ? 0 : 1,
      hint: 'Do they want the change?', explain: 'They are <b>' + (forIt ? 'for' : 'against') + '</b> it.', meta: { k: 'g6-position', s: s } };
  }
  function whichSide(lv) {
    var iss = R.pick(ISSUES), forIt = R.int(0, 1) === 1;
    return Q.one('Which person is <b>' + (forIt ? 'for' : 'against') + '</b> the idea?', R.pick(forIt ? iss.for : iss.against), R.some(forIt ? iss.against : iss.for, lv > 1 ? 2 : 1), {
      fig: W.sent(iss.topic), hint: 'Who wants the change? Who does not?', explain: 'Each side gives its own reasons.', meta: { k: 'g6-which-side', topic: iss.topic, for: forIt } });
  }
  function sortSides() {
    var iss = R.pick(ISSUES);
    return Q.all('Pick every reason <b>for</b> the idea.', iss.for, iss.against, { fig: W.sent(iss.topic),
      hint: 'A reason for it wants the change.', explain: 'For: ' + iss.for.join(' '), meta: { k: 'g6-sort-sides', topic: iss.topic } });
  }
  function messageOf(lv) {
    var t = T.ramp;
    return Q.one('This text is about accessibility. What <b>message</b> does it give?', t.message[0], t.message[1].slice(0, lv > 1 ? 2 : 1), { fig: T.show(t),
      hint: 'What does the writer think is fair?', explain: t.message[0], meta: { k: 'g6-message' } });
  }

  Atlas.register('critical', {
    full: true,
    lessons: [{
      id: 'between', title: 'Reading between the lines', sub: 'What the text says, and what it shows.',
      concepts: [
        { slug: 'stated', title: 'Stated or worked out?', exp: ['C3.2'], skill: 'stated',
          model: [
            step(T.show(T.market), 'Read it.'),
            step(W.sent('What did Mei' + AP + 's family sell? <b>steamed buns</b>'), 'The words are there: <b>explicit</b>.'),
            step(W.sent('Mei <mark class="hl">saved one</mark> and knew who it was for.'), 'A clue.'),
            step(W.tile('The bun is for her father.'), 'Worked out: an <b>inference</b>.'),
            step(W.sent('Tala <mark class="hl">carried both packs</mark>.'), 'Point to it: stated.'),
            step(W.sent('The <mark class="hl">straps dug into her shoulders</mark>.'), 'Tired and sore? Worked out from a clue.')
          ],
          guided: [function () { return stated(1); }, function () { return whichInferred(1); }, function () { return stated(1); }],
          check: [function () { return stated(2); }, pickInferred, function () { return whichInferred(2); }, statedTf, function () { return stated(3); }],
          coach: '<p>Two questions after any chapter: "What did it say?" and "What did it show without saying?"</p>',
          mistake: '<p>Treating an inference as a fact. Ask: "Which clue tells you that?"</p>' },
        { slug: 'theme', title: 'The big message', exp: ['C3.2'], skill: 'theme',
          model: [
            step(T.show(T.lemon), 'Look at the whole story.'),
            step(W.sent('a science fair project'), 'The topic: what it is about.'),
            step(W.web(T.lemon.theme[0], ['the bulb fails', 'finds the mistake', 'judge likes it']), 'The message: what it teaches. Every part holds it up.'),
            step(T.show(T.swifts), 'A report has one too.'),
            step(W.web(T.swifts.theme[0], ['a letter', 'a tower', '200 swifts']), 'Look past the birds to the lesson.')
          ],
          guided: [function () { return theme(1); }, function () { return topicOrMessage(1); }, function () { return themeTap(1); }],
          check: [function () { return theme(2); }, function () { return topicOrMessage(2); }, themeTf, function () { return themeTap(2); }, function () { return theme(3); }],
          coach: '<p>After a film or book, ask: "What did the creator want us to learn about people or life?"</p>',
          mistake: '<p>Naming the topic (basketball) instead of the message (bravery).</p>' }
      ]
    }, {
      id: 'evaluate', title: 'Judging information', sub: 'Is it good enough, and does it fit the purpose?',
      concepts: [
        { slug: 'support', title: 'Details that support the main idea', exp: ['C3.3'], skill: 'supports',
          model: [
            step(W.web(SUPPORT[0][0], [W.gap(), W.gap()]), 'A main idea needs support.'),
            step(W.web(SUPPORT[0][0], SUPPORT[0][1]), 'These prove it.'),
            step(W.sent(SUPPORT[0][2]), 'True, but it does not help. Leave it out.'),
            step(W.means('write', RELEVANT[1][0]), 'Now a purpose.'),
            step(W.sent(RELEVANT[1][1]), 'Fits the purpose: keep it.'),
            step(W.sent(RELEVANT[1][2]), 'True, but off purpose.')
          ],
          guided: [function () { return supports(1); }, notSupport, function () { return relevant(1); }],
          check: [function () { return supports(2); }, function () { return relevant(2); }, notSupport, supportTf, function () { return supports(3); }],
          coach: '<p>When the child writes a paragraph, ask of each sentence: "Does this help prove your main idea?"</p>',
          mistake: '<p>Keeping a detail because it is interesting, even though it does not fit.</p>' },
        { slug: 'reliable', title: 'Reliable sources', exp: ['C3.3'], skill: 'reliable',
          model: [
            step(W.means('read', 'a recent study by Arctic scientists'), 'Experts. Up to date.'),
            step(W.means('screen', 'an old blog post by a tourist'), 'Not an expert. Out of date.'),
            step(W.chain(['Who made it?', 'When?', 'Where are the facts from?']), 'Ask three questions.'),
            step(W.means('read', 'Environment Canada'), 'A weather warning? Official and current.'),
            step(W.means('screen', 'a weather post from last year'), 'Old news. Not for today.')
          ],
          guided: [function () { return reliable(1); }, reliableTf, pickChecks],
          check: [function () { return reliable(2); }, function () { return whyReliable(2); }, reliableTf, pickChecks, function () { return reliable(3); }],
          coach: '<p>Check three things together: Who made it? When? Do they show where their facts come from?</p>',
          mistake: '<p>Trusting a source because it looks professional or has many likes.</p>' }
      ]
    }, {
      id: 'perspective', title: 'Perspective and bias', sub: 'Whose voice is heard, and whose is missing.',
      concepts: [
        { slug: 'perspective', title: 'Whose perspective?', exp: ['C3.5'], skill: 'perspective',
          model: [
            step(T.show(T.trails), 'Read it.'),
            step(W.sent('<mark class="hl">Posted by the Pine Ridge Ski Club</mark>'), 'Skiers wrote it.'),
            step(W.sent('<mark class="hl">Every skier we asked</mark> agrees...'), 'Only one side was asked: a sign of <b>bias</b>.'),
            step(T.show(T.arena), 'Another post.'),
            step(W.sent('That would be <mark class="hl">a disaster that ruins hockey for every child</mark>.'), 'Huge claims, no facts: more bias.')
          ],
          guided: [function () { return whosePov(1); }, function () { return biasClue(1); }, function () { return thinks(1); }],
          check: [function () { return whosePov(2); }, biasTap, function () { return thinks(2); }, function () { return biasClue(2); }, biasTap],
          coach: '<p>For any opinion piece, ask: "Who wrote it, and what do they gain if we agree?"</p>',
          mistake: '<p>Thinking biased means lying. Biased texts can contain true facts but leave out the other side.</p>' },
        { slug: 'missing', title: 'Missing voices', exp: ['C3.5'], skill: 'missing',
          model: [
            step(W.means('people', 'skiers'), 'Heard.'),
            step(W.means('people', 'snowmobile riders'), 'Not heard.'),
            step(W.means('think', 'Ask both sides. Use facts.'), 'Less bias.'),
            step(W.sent(LOADED[1][0]), 'Name-calling.'),
            step(W.sent(LOADED[1][1]), 'Calmer. Fair to the other side.')
          ],
          guided: [function () { return missing(1); }, function () { return avoidBias(1); }, function () { return fairer(1); }],
          check: [function () { return missing(2); }, function () { return fairer(2); }, function () { return avoidBias(2); }, fairTf, function () { return missing(3); }],
          coach: '<p>Rewrite one sentence of the ski club post fairly, together.</p>',
          mistake: '<p>Adding more voices from the same side.</p>' },
        { slug: 'positions', title: 'Different positions on an issue', exp: ['C3.6'], skill: 'positions',
          model: [
            step(W.sent(ISSUES[0].topic), 'An issue about accessibility.'),
            step(W.means('talk', ISSUES[0].for[0]), '<b>For</b>.'),
            step(W.means('talk', ISSUES[0].against[0]), '<b>Against</b>.'),
            step(W.sent(ISSUES[1].topic), 'An issue about including every family.'),
            step(W.means('talk', ISSUES[1].for[1]), 'For. Each side has reasons.')
          ],
          guided: [position, function () { return whichSide(1); }, function () { return messageOf(1); }],
          check: [position, function () { return whichSide(2); }, sortSides, function () { return messageOf(2); }, position],
          coach: '<p>Talk about how the ramp story shows an issue of accessibility, and how people might see it differently.</p>',
          mistake: '<p>Hearing only the side you agree with. Name each position fairly first.</p>' }
      ]
    }],
    practice: [
      { id: 'stated', name: 'Stated or worked out?', code: 'C3.2', gen: stated },
      { id: 'theme', name: 'The big message', code: 'C3.2', gen: theme },
      { id: 'supports', name: 'Supporting details', code: 'C3.3', gen: supports },
      { id: 'reliable', name: 'Reliable sources', code: 'C3.3', gen: reliable },
      { id: 'perspective', name: 'Perspective and bias', code: 'C3.5', gen: biasClue },
      { id: 'missing', name: 'Missing voices', code: 'C3.5', gen: missing },
      { id: 'positions', name: 'Positions on an issue', code: 'C3.6', gen: whichSide }
    ],
    tasks: [
      { id: 'culture', title: 'Cultural elements in a text', code: 'C3.4', pic: W.icon('people'), say: 'Find a value, celebration, building, artwork or dance in a book. What does it mean?', write: true,
        run: ['Choose a book or film set in a culture the child knows, and one set in a culture new to them.', 'Find cultural elements: values, celebrations or ceremonies, buildings, art, dance.', 'Ask: "What does it mean to the people in the story? How does it connect to your own life?" Share ideas with someone else.'],
        rubric: ['Does not name an element yet.', 'Names an element with help.', 'Explains what an element means and connects it to their life.', 'Explains several elements thoughtfully and shares their interpretation respectfully.'] },
      { id: 'indigenous-contexts', title: 'History and today in First Nations, Métis and Inuit texts', code: 'C3.7', pic: W.icon('read'), say: 'Read a text by a First Nations, Métis or Inuit creator. How does history shape it?',
        run: ['Choose a text by a First Nations, Métis or Inuit creator that touches on a historical period or event, such as residential schools, treaties or relocation. Check that it suits your child.',
          'Talk about how that history shaped the text, and how it connects to people' + AP + 's lives today.'],
        rubric: ['Recalls little of it.', 'Names the historical context with help.', 'Explains how history influenced the text.', 'Explains the influence and connects it thoughtfully to lived experiences today.'],
        coach: '<p>Approach this with care. Use resources written by Indigenous creators and organizations, and let the child ask questions freely.</p>' },
      { id: 'thinking-skills', title: 'Which thinking skills helped?', code: 'C3.8', pic: W.icon('think'), say: 'Which thinking skills helped you most: inferring, checking sources, or spotting bias?',
        run: ['After the lessons in this chapter, ask which skill helped most with each text: inferring, judging sources, or spotting bias.', 'Ask the child to explain why it worked, with an example.'],
        rubric: ['Cannot name a skill yet.', 'Names a skill with help.', 'Compares two skills and says which helped.', 'Explains clearly why a skill was effective, with examples.'] }
    ]
  });

  Q.shapes('critical', {
    stated: [[1, 'which', whichInferred], [1, 'pick', pickInferred], [2, 'tf', statedTf]],
    theme: [[1, 'topic-or-message', topicOrMessage], [1, 'tap', themeTap], [2, 'tf', themeTf]],
    supports: [[1, 'not', notSupport], [1, 'relevant', relevant], [2, 'tf', supportTf]],
    reliable: [[1, 'why', whyReliable], [1, 'checks', pickChecks], [2, 'tf', reliableTf]],
    perspective: [[1, 'whose', whosePov], [1, 'wants', thinks], [1, 'tap', biasTap], [2, 'tf', biasTf]],
    missing: [[1, 'fix', avoidBias], [1, 'fairer', fairer], [2, 'tf', fairTf]],
    positions: [[1, 'for-against', position], [1, 'sort', sortSides], [2, 'message', messageOf]]
  });
})();
