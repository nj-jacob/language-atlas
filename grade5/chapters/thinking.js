/* Grade 5: thinking critically. A full chapter: every idea has two worked examples, three questions together and five on
   your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 5, Strand C (Comprehension):
   C3.2 local and global inferences, using explicit and implicit evidence
   C3.3 analyze texts: main and supporting ideas, the events of multiple plots, relevant information, cause and effect
   C3.5 explicit and implicit perspectives, how they are conveyed, evidence of bias, and how bias could influence an audience
   C3.6 how topics such as diversity, inclusion and accessibility are addressed in texts, and the messages conveyed
   With a grown-up: C3.4 cultural elements in texts, C3.7 texts by First Nations, Metis and Inuit creators and the times and events that shaped them,
   C3.8 the critical thinking skills used.
   Passages are in ../texts.js; the short opinion and inclusion texts below are written here for this site. Answer checks: tests/verify/grade5-thinking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var OQ = '“', CQ = '”', AP = '’';

  /* [main idea, two details that support it, two true details that do not] */
  var SUPPORT = [['Wetlands are important.', ['Wetlands help stop floods.', 'Wetlands clean the water.'], ['Some people like to walk in the rain.', 'Ducks have webbed feet.']],
    ['Jun worked hard for the tryout.', ['Jun practised every day for a month.', 'Jun kept going after he missed.'], ['The gym had twenty kids in it.', 'The coach wore a whistle.']],
    ['The new playground welcomes everyone.', ['It has ramps for kids who use wheelchairs.', 'Signs have pictures and braille.'], ['The town is called Maple Ridge.', 'It opened in the spring.']],
    ['Manoomin is harvested with care.', ['The grains are knocked gently into the canoe.', 'Some grains are left to grow next year.'], ['Manitoba is west of Ontario.', 'Canoes can be made of wood.']],
    ['The ice road takes special care.', ['Uncle Ray never drove faster than 25 kilometres an hour.', 'Orange markers show the safe path.'], ['Kenji brought hot chocolate.', 'The town has a school.']],
    ['Inuksuit help people on the land.', ['An inuksuk can show the way home.', 'Some mark a safe place to cross a river.'], ['Nunavut has its own flag.', 'Stones can be heavy.']],
    ['Making maple syrup takes time.', ['The sap is boiled for hours.', 'It takes 40 litres of sap to make 1 litre of syrup.'], ['Quebec is a province.', 'Maple leaves turn red in the fall.']],
    ['Monarchs make an amazing journey.', ['Some fly more than 4000 kilometres.', 'They make the trip without a map.'], ['Monarchs are orange and black.', 'Mexico has tall mountains.']],
    ['Elm Street is not safe to cross.', ['Cars often drive faster than the speed limit.', 'There is no crossing guard.'], ['The school is called Lakeview.', 'Brookfield is a nearby town.']],
    ['Ada is brave.', ['She climbed the tower in the storm.', 'She lit the lamp with shaking hands.'], ['The lighthouse is on Gull Rock.', 'It was October.']],
    ['The volcano did not go as planned.', ['Nothing happened when the judge arrived.', 'The foam filled Priya' + AP + 's solar oven.'], ['Priya made a solar oven.', 'The judge had a clipboard.']],
    ['The goalie helped the team win.', ['You caught the hard shot in your glove.', 'Your save kept the score tied.'], ['Your helmet is on.', 'The buzzer sounds at the end.']]];

  /* texts with a point of view: who wrote it, what they think, sentences that are facts and opinions, the biased sentence and its word, a missing voice */
  var VIEWS = [
    { t: T.bus, who: 'Ananya', thinks: 'The school board should keep the late bus.', wrong: ['The school board should cut the late bus.', 'Clubs should end earlier.'],
      facts: ['Last year, more than 80 students rode it every week.'], opinions: ['The late bus is the best thing about our school, and cutting it would be a terrible mistake.', 'Everyone agrees that clubs make school better.'],
      bias: 'Everyone agrees that clubs make school better.', word: 'Everyone', missing: 'how much the bus costs the board', notMissing: ['what Ananya thinks', 'how many students rode the bus'] },
    { t: T.crosswalk, who: 'Amara', thinks: 'The town should add a crosswalk on Elm Street.', wrong: ['Elm Street is safe enough.', 'The school should move.'],
      facts: ['Every morning, more than 200 students cross Elm Street to get to school.', 'There is no crosswalk and no crossing guard.'],
      opinions: ['I know that crosswalks cost money, but nothing is more important than keeping people safe.'] },
    { title: 'Zoom Sneakers', pics: ['ball'], lines: ['Zoom Sneakers are the best shoes ever made.', 'Every kid in Canada wants a pair!', 'Each pair has a rubber sole and reflective laces.', 'They cost $120 at Main Street Sports.', 'Get yours today!'],
      who: 'the company that sells Zoom Sneakers', thinks: 'You should buy Zoom Sneakers.', wrong: ['You should save your money.', 'Sneakers are bad for your feet.'],
      facts: ['Each pair has a rubber sole and reflective laces.', 'They cost $120 at Main Street Sports.'], opinions: ['Zoom Sneakers are the best shoes ever made.', 'Every kid in Canada wants a pair!'],
      bias: 'Every kid in Canada wants a pair!', word: 'Every', missing: 'what people who bought them think', notMissing: ['how much they cost', 'what the laces are like'] },
    { title: 'Our New Library', pics: ['book'], lines: ['The new library on King Street is the best place in town.', 'It has more than 3000 books and a reading nook by the window.', 'It is open until 8 o' + AP + 'clock on weeknights.',
      'The old library was boring, and nobody ever went there.', 'Everyone should get a library card.'],
      who: 'a student who loves the new library', thinks: 'The new library is a great place to go.', wrong: ['The old library was better.', 'Libraries should close early.'],
      facts: ['It has more than 3000 books and a reading nook by the window.', 'It is open until 8 o' + AP + 'clock on weeknights.'], opinions: ['The new library on King Street is the best place in town.', 'The old library was boring, and nobody ever went there.'],
      bias: 'The old library was boring, and nobody ever went there.', word: 'nobody', missing: 'what people who liked the old library think', notMissing: ['how many books it has', 'when it is open'] },
    { title: 'Build Us a Skatepark', pics: ['sun'], lines: ['Skateboarders are the most responsible kids in town.', 'Our town has four parks, and none of them has a ramp.', 'Last summer, 60 people signed a petition for a skatepark.',
      'A skatepark would be the best thing ever to happen here.', 'Come to the town meeting on June 3!'],
      who: 'a group of skateboarders', thinks: 'The town should build a skatepark.', wrong: ['The town needs more parking.', 'Skateboarding should be banned.'],
      facts: ['Our town has four parks, and none of them has a ramp.', 'Last summer, 60 people signed a petition for a skatepark.'], opinions: ['Skateboarders are the most responsible kids in town.', 'A skatepark would be the best thing ever to happen here.'],
      bias: 'Skateboarders are the most responsible kids in town.', word: 'most', missing: 'people who want the money spent on something else', notMissing: ['how many parks the town has', 'when the meeting is'] },
    { title: 'Camp Wapiti', pics: ['canoe', 'tree'], lines: ['Camp Wapiti is the most fun summer camp ever!', 'Campers canoe, hike and learn to cook bannock over a fire.', 'The camp is on Lake Nipissing, near North Bay.',
      'All campers love it, and nobody ever gets homesick.', 'Sign up by May 15.'],
      who: 'the people who run Camp Wapiti', thinks: 'You should sign up for Camp Wapiti.', wrong: ['Summer camps are too far away.', 'You should stay home all summer.'],
      facts: ['Campers canoe, hike and learn to cook bannock over a fire.', 'The camp is on Lake Nipissing, near North Bay.'], opinions: ['Camp Wapiti is the most fun summer camp ever!', 'All campers love it, and nobody ever gets homesick.'],
      bias: 'All campers love it, and nobody ever gets homesick.', word: 'All', missing: 'what campers who did not enjoy it think', notMissing: ['what campers do', 'where the camp is'] }];
  var BIASED = VIEWS.filter(function (v) { return v.bias; });
  var BIASWORD = /^(every|everyone|all|nobody|never|always|best|most|ever)$/i;

  /* texts about inclusion: the message, features that help more people take part, features that do not, and who a feature helps */
  var INCLUDE = [
    { t: T.park, message: T.park.message, good: ['smooth ramps instead of stairs', 'pictures and braille on signs', 'a quiet corner'], not: ['a tall slide', 'bright red paint', 'a big parking lot'],
      helps: [['smooth ramps', 'kids who use wheelchairs'], ['braille on signs', 'kids who are blind'], ['a quiet corner', 'kids who need a calm place']] },
    { title: 'Mei' + AP + 's First Week', pics: ['map'], lines: ['On her first day, Mei did not speak much English yet.', 'Kofi drew her a map of the school with pictures instead of words.',
      'At lunch, the class learned to say hello in Mandarin.', 'By Friday, Mei was teaching everyone a clapping game.'],
      message: ['Small kind acts help a new student belong.', 'New students should stay quiet.', 'Maps are the best way to learn.'], good: ['a map with pictures', 'saying hello in Mandarin'], not: ['a longer recess', 'a new desk'],
      helps: [['a map with pictures', 'a student learning English']] },
    { title: 'Everyone on the Ice', pics: ['hockey'], lines: ['The Riverside Rink bought sledges so players who use wheelchairs can play sledge hockey.', 'Low benches were built right beside the ice.',
      'Now Thursday nights are open to everyone.', OQ + 'I used to just watch,' + CQ + ' said Sam. ' + OQ + 'Now I play.' + CQ],
      message: ['Changes can let everyone take part in sport.', 'Hockey is the best sport.', 'Rinks should be for experts only.'], good: ['sledges for sledge hockey', 'low benches beside the ice', 'nights open to everyone'],
      not: ['a bigger scoreboard', 'a snack bar', 'louder music'], helps: [['sledges', 'hockey players who use wheelchairs']] },
    { title: 'Stories for Everyone', pics: ['book'], lines: ['The library in Kapuskasing holds story time in English and in French.', 'Each month, an Elder visits to share stories in Cree.',
      'Many books come in large print, and some come as audiobooks.', 'Everyone in town can find a story that fits them.'],
      message: ['A library can welcome people of many languages and needs.', 'Everyone should read in one language.', 'Libraries should be quiet.'], good: ['story time in English and French', 'stories shared in Cree', 'large-print books and audiobooks'],
      not: ['a new carpet', 'a taller roof'], helps: [['large-print books', 'readers who find small print hard to see'], ['stories in Cree', 'families who speak Cree'], ['audiobooks', 'people who learn best by listening']] },
    { title: 'A Festival for All', pics: ['sun', 'house'], lines: ['This year, the town festival added a quiet tent for people who find noise hard.', 'Signs used pictures as well as words.',
      'Volunteers used sign language at the main stage.', 'More families came than ever before.'],
      message: ['Planning ahead lets more people enjoy an event.', 'Festivals should be louder.', 'Signs are not needed.'], good: ['a quiet tent', 'signs with pictures', 'sign language at the main stage'],
      not: ['more fireworks', 'louder music'], helps: [['a quiet tent', 'people who find noise hard'], ['sign language', 'people who are Deaf']] }];
  var HELPS = [].concat.apply([], INCLUDE.map(function (x) { return x.helps; }));

  function card(x) { return x.t ? T.show(x.t) : W.passage(x.title, x.lines, { pics: x.pics }); }
  function titleOf(x) { return x.t ? x.t.title : x.title; }
  function linesOf(x) { return x.t ? T.body(x.t) : x.lines; }
  function why(right, yes, no) { return { options: [yes, no], answer: right ? 0 : 1 }; }
  function at(t, words) { for (var i = 0; i < t.lines.length; i++) if (t.lines[i] && t.lines[i].indexOf(words) >= 0) return i; return -1; }
  var INF = [].concat.apply([], T.list('infer').map(function (t) { return t.infer.map(function (f) { return { t: t, f: f }; }); }));

  /* ---------- infer from a clue (C3.2) ---------- */
  function infer(lv) {
    var x = R.pick(INF), t = x.t, f = x.f, wrong = [f[2]].concat(lv > 1 ? t.infer.filter(function (y) { return y !== f; }).map(function (y) { return y[1]; }) : []);
    return Q.one(f[0], f[1], wrong, { fig: T.show(t), prompt: 'The text does not say it. Look for a clue.',
      hint: 'Use a clue and what you know.', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g5-infer', t: t.title, q: f[0] } });
  }
  function evidence() {
    var x = R.pick(INF.filter(function (y) { return y.t.infer.length > 1; })), t = x.t, f = x.f, other = t.infer.filter(function (y) { return y !== f; })[0];
    return Q.one(f[0] + ' <b>' + f[1] + '</b> Which words in the text show it?', f[3], [other[3]], { fig: T.show(t),
      hint: 'Which words fit the answer?', explain: '<mark class="hl">' + f[3] + '</mark> shows it.', meta: { k: 'g5-evidence', t: t.title, q: f[0] } });
  }
  function inferTap() {
    var x = R.pick(INF), t = x.t, f = x.f, i = at(t, f[3]);
    return { q: f[0] + ' <b>' + f[1] + '</b> Tap the sentence with the clue.', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      hint: 'Which sentence shows it without saying it?', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g5-infer-tap', t: t.title, q: f[0] } };
  }
  function inferTf() {
    var x = R.pick(INF), f = x.f, right = R.int(0, 1) === 1, said = right ? f[1] : f[2];
    return { q: f[0] + '<br>' + Q.name() + ' infers: <b>' + said + '</b>', fig: T.show(x.t), type: 'tf', answer: right, why: why(right, 'A clue in the text shows it.', 'No clue in the text shows it.'),
      hint: 'Find a clue. Does it fit?', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g5-infer-tf', t: x.t.title, q: f[0], said: said } };
  }

  /* ---------- infer from the whole text (C3.2) ---------- */
  function global() {
    var t = R.pick(T.list('global')), g = t.global;
    return Q.one(g[0], g[1], [g[2]], { fig: T.show(t), prompt: 'Think about the whole text, not one line.', hint: 'What do all the parts add up to?', explain: 'Evidence: <mark class="hl">' + g[3] + '</mark>.', meta: { k: 'g5-global', t: t.title } });
  }
  function globalClue() {
    var t = R.pick(T.list('global')), g = t.global, other = R.pick(T.body(t).filter(function (l) { return l.indexOf(g[3]) < 0; }));
    return Q.one('<b>' + g[1] + '</b> Which words support this?', g[3], [other.split(' ').slice(0, 5).join(' ')], { fig: T.show(t), hint: 'Which words show it?', explain: '<mark class="hl">' + g[3] + '</mark>', meta: { k: 'g5-global-clue', t: t.title } });
  }
  function globalTap() {
    var t = R.pick(T.list('global')), g = t.global, i = at(t, g[3]);
    return { q: g[0] + ' <b>' + g[1] + '</b> Tap a sentence that shows it.', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      hint: 'Which sentence is the proof?', explain: 'Evidence: <mark class="hl">' + g[3] + '</mark>.', meta: { k: 'g5-global-tap', t: t.title } };
  }
  function globalTf() {
    var t = R.pick(T.list('global')), g = t.global, right = R.int(0, 1) === 1, said = right ? g[1] : g[2];
    return { q: g[0] + '<br>' + Q.name() + ' says: <b>' + said + '</b>', fig: T.show(t), type: 'tf', answer: right, why: why(right, 'The whole text shows it.', 'The text shows the opposite.'),
      hint: 'What do all the parts add up to?', explain: 'Evidence: <mark class="hl">' + g[3] + '</mark>.', meta: { k: 'g5-global-tf', t: t.title, said: said } };
  }

  /* ---------- details support the main idea (C3.3) ---------- */
  function support(lv) {
    var s = R.pick(SUPPORT);
    return Q.one('Main idea: <b>' + s[0] + '</b> Which detail <b>supports</b> it?', R.pick(s[1]), s[2].slice(0, lv > 1 ? 2 : 1), { hint: 'Which detail proves the main idea?',
      explain: W.web(s[0], s[1]), meta: { k: 'g5-support', main: s[0] } });
  }
  function notSupport() {
    var s = R.pick(SUPPORT), odd = R.pick(s[2]);
    return Q.one('Main idea: <b>' + s[0] + '</b> Which detail does <b>not</b> support it?', odd, s[1], { hint: 'Two details prove it. One is true, but off topic.',
      explain: W.web(s[0], s[1]), meta: { k: 'g5-not-support', main: s[0] } });
  }
  function supportTf() {
    var s = R.pick(SUPPORT), right = R.int(0, 1) === 1, d = R.pick(right ? s[1] : s[2]);
    return { q: Q.name() + ' says this detail supports the main idea.', fig: W.web(s[0], [d]), type: 'tf', answer: right, why: why(right, 'It proves the main idea.', 'It is true, but it does not prove it.'),
      hint: 'Does the detail prove the main idea?', explain: W.web(s[0], s[1]), meta: { k: 'g5-support-tf', main: s[0], d: d } };
  }
  function mainFor(lv) {
    var s = R.pick(SUPPORT);
    return Q.one('Which main idea do these details support?', s[0], R.some(SUPPORT.filter(function (x) { return x !== s; }), lv > 1 ? 2 : 1).map(function (x) { return x[0]; }), {
      fig: W.web(W.gap(), s[1]), hint: 'What do the details prove together?', explain: W.web(s[0], s[1]), meta: { k: 'g5-main-for', main: s[0] } });
  }

  /* ---------- following two plots (C3.3) ---------- */
  var PLOTTED = T.list('plots'), EVENTS = [].concat.apply([], PLOTTED.map(function (t) { return [].concat.apply([], t.plots.map(function (p) { return p[1].map(function (e) { return { t: t, p: p, e: e }; }); })); }));
  function plotOf() {
    var x = R.pick(EVENTS);
    return Q.tiles('Where does this happen?', x.p[0], x.t.plots.filter(function (p) { return p !== x.p; }).map(function (p) { return p[0]; }), { fig: W.sent(OQ + x.e + CQ) + T.show(x.t),
      prompt: 'This story follows two places at once.', hint: 'Find it in the story. Who is there?', explain: 'It happens <b>' + x.p[0].toLowerCase() + '</b>.', meta: { k: 'g5-plot', e: x.e } });
  }
  function matchPlots() {
    var t = R.pick(PLOTTED);
    return { q: 'Match each place to something that happens there.', fig: T.show(t), type: 'match', pairs: t.plots.map(function (p) { return [p[0], R.pick(p[1])]; }), hint: 'Two plots, two places.',
      explain: 'Keep the two plots apart in your head.', meta: { k: 'g5-match-plots' } };
  }
  function plotOrder() {
    var t = R.pick(PLOTTED.filter(function (x) { return x.plots.some(function (p) { return p[1].length > 2; }); })), p = R.pick(t.plots.filter(function (x) { return x[1].length > 2; }));
    return { q: 'Put the <b>' + p[0].toLowerCase() + '</b> events in order.', fig: T.show(t), type: 'order', items: p[1].map(function (e) { return OQ + e + CQ; }), first: 'First', last: 'Last',
      hint: 'Follow just one plot.', explain: W.chain(p[1].map(function (e) { return OQ + e + CQ; })), meta: { k: 'g5-plot-order', place: p[0] } };
  }
  function plotTf() {
    var x = R.pick(EVENTS), right = R.int(0, 1) === 1, place = right ? x.p[0] : x.t.plots.filter(function (p) { return p !== x.p; })[0][0];
    return { q: Q.name() + ' says this happens <b>' + place.toLowerCase() + '</b>.', fig: W.sent(OQ + x.e + CQ) + T.show(x.t), type: 'tf', answer: right,
      why: why(right, 'That is where it happens.', 'It happens in the other plot.'), hint: 'Find it in the story. Where is it?', explain: 'It happens <b>' + x.p[0].toLowerCase() + '</b>.',
      meta: { k: 'g5-plot-tf', e: x.e, place: place } };
  }

  /* ---------- every text has a point of view (C3.5) ---------- */
  function view(lv) {
    var v = R.pick(VIEWS);
    return Q.one('What does <b>' + v.who + '</b> want you to think?', v.thinks, v.wrong.slice(0, lv > 1 ? 2 : 1), { fig: card(v), prompt: 'Who wrote it? What do they ask for?',
      hint: 'Look at what the writer asks for.', explain: v.thinks, meta: { k: 'g5-view', t: titleOf(v) } });
  }
  function factOpinion() {
    var v = R.pick(VIEWS);
    return Q.one('Which sentence is a <b>fact</b> that could be checked?', R.pick(v.facts), v.opinions, { fig: card(v), hint: 'Could you count it, measure it or look it up?',
      explain: 'A fact can be checked. An opinion is what someone thinks.', meta: { k: 'g5-fact-opinion', t: titleOf(v) } });
  }
  function factTf() {
    var v = R.pick(VIEWS), isFact = R.int(0, 1) === 1, s = R.pick(isFact ? v.facts : v.opinions), right = R.int(0, 1) === 1, says = right === isFact ? 'a fact' : 'an opinion';
    return { q: Q.name() + ' says this is <b>' + says + '</b>.', fig: W.sent(s) + card(v), type: 'tf', answer: right, why: { options: ['It can be checked.', 'It is what someone thinks.'], answer: isFact ? 0 : 1 },
      hint: 'Could you check it?', explain: isFact ? 'It is a fact: you could check it.' : 'It is an opinion: what someone thinks.', meta: { k: 'g5-fact-or-opinion', t: titleOf(v), s: s, says: says } };
  }
  function pickFacts() {
    var v = R.pick(VIEWS.filter(function (x) { return x.facts.length > 1; }));
    return Q.all('Pick every <b>fact</b>.', v.facts, v.opinions, { fig: card(v), hint: 'A fact can be counted, measured or looked up.', explain: 'Facts can be checked. Opinions cannot.', meta: { k: 'g5-pick-facts', t: titleOf(v) } });
  }

  /* ---------- spot bias and missing voices (C3.5) ---------- */
  function bias() {
    var v = R.pick(BIASED), others = linesOf(v).filter(function (l) { return l !== v.bias && v.facts.indexOf(l) >= 0; });
    return Q.one('Which sentence shows <b>bias</b>: a claim with no proof, to sway you?', v.bias, others, { fig: card(v), prompt: 'Does everyone really agree?',
      hint: 'Look for words like everyone, all, nobody, best, most.', explain: '<mark class="hl">' + v.bias + '</mark> No proof is given.', meta: { k: 'g5-bias', t: titleOf(v) } });
  }
  function biasWord() {
    var v = R.pick(BIASED), words = v.bias.replace(/[.,!]/g, '').split(' ').filter(function (w) { return w !== v.word && w.length > 3 && !BIASWORD.test(w); });
    return Q.tiles('Which word shows the <b>bias</b>?', v.word, R.some(words, 3), { fig: W.sent(v.bias), hint: 'Which word claims too much?',
      explain: '<b>' + v.word + '</b>? How could the writer know that?', meta: { k: 'g5-bias-word', t: titleOf(v) } });
  }
  function missing() {
    var v = R.pick(BIASED);
    return Q.one('Whose side is <b>missing</b>? What does the text not tell you?', v.missing, v.notMissing, { fig: card(v),
      hint: 'Who might disagree? What would they say?', explain: 'It does not say ' + v.missing + '. A fair reader asks.', meta: { k: 'g5-missing', t: titleOf(v) } });
  }
  function biasTf() {
    var v = R.pick(BIASED), right = R.int(0, 1) === 1, s = right ? v.bias : R.pick(v.facts);
    return { q: Q.name() + ' says this sentence shows bias.', fig: W.sent(s) + card(v), type: 'tf', answer: right, why: why(right, 'It claims too much, with no proof.', 'It is a fact you could check.'),
      hint: 'Does it claim too much?', explain: 'The biased sentence: <mark class="hl">' + v.bias + '</mark>', meta: { k: 'g5-spot-bias-tf', t: titleOf(v), s: s } };
  }

  /* ---------- the message about inclusion (C3.6) ---------- */
  function message(lv) {
    var x = R.pick(INCLUDE);
    return Q.one('What <b>message</b> does this text give?', x.message[0], x.message.slice(1, lv > 1 ? 3 : 2), { fig: card(x), prompt: 'Why do you think the writer wrote it?',
      hint: 'What changed, and who can take part now?', explain: x.message[0], meta: { k: 'g5-message', t: titleOf(x) } });
  }
  function access() {
    var x = R.pick(INCLUDE);
    return Q.all('Pick every change that helps <b>more people</b> take part.', R.some(x.good, 2), R.some(x.not, 2), { fig: card(x), hint: 'Which ones are in the text, and help someone take part?',
      explain: 'These help: ' + x.good.join(', ') + '.', meta: { k: 'g5-access', t: titleOf(x) } });
  }
  function messageTf() {
    var x = R.pick(INCLUDE), right = R.int(0, 1) === 1, said = right ? x.message[0] : R.pick(x.message.slice(1));
    return { q: Q.name() + ' says the message is: <b>' + said + '</b>', fig: card(x), type: 'tf', answer: right, why: why(right, 'The whole text shows it.', 'The text does not show it.'),
      hint: 'What changed, and who can take part now?', explain: x.message[0], meta: { k: 'g5-message-tf', t: titleOf(x), said: said } };
  }
  function matchHelps() {
    var ps = R.some(HELPS, 3);
    return { q: 'Match each change to who it helps.', type: 'match', pairs: ps.map(function (h) { return [h[0], h[1]]; }), hint: 'Who could not take part before?',
      explain: 'Each change opens the door to someone.', meta: { k: 'g5-match-helps' } };
  }

  var out = T.outage, ad = VIEWS[2], rink = INCLUDE[2];
  Atlas.register('thinking', {
    full: true,
    lessons: [{
      id: 'between', title: 'Reading between the lines', sub: 'Inferences from one clue, and from the whole text.',
      concepts: [
        { slug: 'local', title: 'Infer from a clue', exp: ['C3.2'], skill: 'infer',
          model: [
            step(W.sent('My hands were shaking.'), 'The text never says ' + OQ + 'nervous' + CQ + '.'),
            step(W.sent('shaking hands + what I know'), 'A clue plus what I know.'),
            step(W.tile('Jun is nervous.'), 'An inference.'),
            step(W.sent('Kenji <mark class="hl">gripped the seat</mark>.'), 'Another story, another clue.'),
            step(W.tile('Kenji is scared.'), 'The text shows it without saying it.')
          ],
          guided: [function () { return infer(1); }, evidence, inferTap],
          check: [function () { return infer(2); }, inferTf, evidence, inferTap, function () { return infer(3); }],
          coach: '<p>Ask "How do you know?" after every inference. The child should point to words in the text.</p>',
          mistake: '<p>Guessing without a clue. An inference always comes from evidence.</p>' },
        { slug: 'global', title: 'Infer from the whole text', exp: ['C3.2'], skill: 'global',
          model: [
            step(T.show(T.tryout), 'Read it all.'),
            step(W.sent('practised every day ... missed ... kept going'), 'Clues from start to end.'),
            step(W.tile('Jun does not give up.'), 'A big idea about Jun.'),
            step(W.sent('never faster than 25 ... the ice talking ... cold and strong'), 'The Ice Road: clues all through.'),
            step(W.tile('Uncle Ray is careful and knows the land.'), 'What the whole story shows.')
          ],
          guided: [global, globalClue, globalTap],
          check: [global, globalTf, globalClue, globalTap, global],
          coach: '<p>After a chapter, ask: "What kind of person is this character? What did they do that shows it?"</p>',
          mistake: '<p>Basing a big inference on one line. Look across the whole text.</p>' }
      ]
    }, {
      id: 'analyze', title: 'Analyzing texts', sub: 'Main and supporting ideas, and two plots at once.',
      concepts: [
        { slug: 'support', title: 'Details support the main idea', exp: ['C3.3'], skill: 'support',
          model: [
            step(W.sent('Wetlands are important.'), 'The big point.'),
            step(W.web('Wetlands are important.', ['stop floods', 'clean the water']), 'These details hold it up.'),
            step(W.sent('Ducks have webbed feet.'), 'True, but it does not prove it.'),
            step(W.sent('Ada is brave.'), 'Another big point.'),
            step(W.web('Ada is brave.', ['climbed in the storm', 'lit the lamp']), 'Each detail proves it.')
          ],
          guided: [function () { return support(1); }, notSupport, function () { return mainFor(1); }],
          check: [function () { return support(2); }, supportTf, notSupport, function () { return mainFor(2); }, function () { return support(3); }],
          coach: '<p>Draw a table: the main idea on top, supporting details as the legs. A detail that does not hold it up is not a leg.</p>',
          mistake: '<p>Choosing any true detail. A supporting detail must back up the main idea.</p>' },
        { slug: 'plots', title: 'Following two plots', exp: ['C3.3'], skill: 'plots',
          model: [
            step(T.show(out), 'Two places at once.'),
            step(W.chain(['found a flashlight', 'cards by candlelight'], ['At home', 'Then']), 'Plot 1.'),
            step(W.chain(['the arena went black', 'walk to the exit'], ['At the arena', 'Then']), 'Plot 2.'),
            step(W.chain(['father slips', 'Ada climbs', 'the lamp blazes'], ['In the lighthouse', 'Then', 'Then']), 'The Night of the Storm: plot 1.'),
            step(W.chain(['the captain sees the beam', 'the boat reaches the harbour'], ['Out at sea', 'Then']), 'Plot 2. The beam joins them.')
          ],
          guided: [plotOf, matchPlots, plotTf],
          check: [plotOf, plotOrder, plotTf, matchPlots, plotOf],
          coach: '<p>Use two colours of highlighter (or sticky notes) for the two plots, then retell each one on its own.</p>',
          mistake: '<p>Mixing the plots into one timeline. Track each one separately, then see where they meet.</p>' }
      ]
    }, {
      id: 'views', title: 'Perspectives and messages', sub: 'Whose view, what is left out, and what the text teaches.',
      concepts: [
        { slug: 'perspective', title: 'Every text has a point of view', exp: ['C3.5'], skill: 'perspective',
          model: [
            step(T.show(T.bus), 'A letter from a student.'),
            step(W.sent('Please keep the late bus running.'), 'Her view: keep the bus.'),
            step(W.sent('more than 80 students rode it'), 'A fact. You could check it.'),
            step(W.sent('the best thing about our school'), 'An opinion. Not everyone would agree.'),
            step(card(ad), 'An ad. The company wants you to buy.')
          ],
          guided: [function () { return view(1); }, factOpinion, pickFacts],
          check: [function () { return view(2); }, factTf, factOpinion, pickFacts, function () { return view(3); }],
          coach: '<p>Ask: "Who wrote this? What do they want me to think? What do they gain if I agree?"</p>',
          mistake: '<p>Treating an opinion as a fact because it is written down.</p>' },
        { slug: 'bias', title: 'Spot bias and missing voices', exp: ['C3.5'], skill: 'bias',
          model: [
            step(W.sent('<mark class="hl">Everyone</mark> agrees that clubs make school better.'), 'Everyone? No proof.'),
            step(W.sent('a terrible mistake'), 'Strong words to sway you.'),
            step(W.icon('people'), 'Missing: the school board' + AP + 's view.'),
            step(W.sent('<mark class="hl">Every</mark> kid in Canada wants a pair!'), 'An ad. Every kid? How would they know?'),
            step(W.icon('people'), 'Missing: what buyers think of them.')
          ],
          guided: [bias, biasWord, missing],
          check: [bias, biasTf, missing, biasWord, bias],
          coach: '<p>Bias is not always bad: Ananya cares about her school. The point is to notice it, so readers can decide for themselves.</p>',
          mistake: '<p>Being swayed by "everyone" and "always". Ask: "How do they know?"</p>' },
        { slug: 'message', title: 'The message about inclusion', exp: ['C3.6'], skill: 'message',
          model: [
            step(T.show(T.park), 'A new playground.'),
            step(W.sent('ramps &middot; braille &middot; a quiet corner'), 'How it includes more kids.'),
            step(W.sent('Now my whole class can play together.'), 'The message, in Leo' + AP + 's words.'),
            step(card(rink), 'Another text: a hockey rink.'),
            step(W.sent('I used to just watch. Now I play.'), 'Sam shows the message.')
          ],
          guided: [function () { return message(1); }, access, matchHelps],
          check: [function () { return message(2); }, messageTf, access, matchHelps, function () { return message(3); }],
          coach: '<p>Look around your neighbourhood together: which places are easy for everyone to use? Which are not?</p>',
          mistake: '<p>Thinking accessibility only means wheelchairs. It also means signs, sound, language, calm spaces and more.</p>' }
      ]
    }],
    practice: [
      { id: 'infer', name: 'Infer from a clue', code: 'C3.2', gen: infer },
      { id: 'global', name: 'Infer from the whole text', code: 'C3.2', gen: global },
      { id: 'support', name: 'Main and supporting ideas', code: 'C3.3', gen: support },
      { id: 'plots', name: 'Two plots', code: 'C3.3', gen: plotOf },
      { id: 'perspective', name: 'Point of view, fact and opinion', code: 'C3.5', gen: view },
      { id: 'bias', name: 'Bias and missing voices', code: 'C3.5', gen: bias },
      { id: 'message', name: 'Messages about inclusion', code: 'C3.6', gen: message }
    ],
    tasks: [
      { id: 'culture', title: 'Culture in a text', code: 'C3.4', pic: W.icon('read'), say: 'Find foods, music, sports, objects or values from a culture in a story.',
        run: ['Read a story set in a culture, ideally one connected to your family or community.', 'The child finds cultural elements: foods, music, sports, objects, celebrations, values.', 'Look up one together, and talk about how it connects to the child' + AP + 's own life and culture.'],
        rubric: ['Finds none yet.', 'Finds one with help.', 'Finds several and explains what one means.', 'Explains their meaning and makes thoughtful links to their own culture.'] },
      { id: 'fnmi-history', title: 'A First Nations, Métis or Inuit text and its times', code: 'C3.7', pic: W.icon('read'), say: 'Read a text by a First Nations, Métis or Inuit creator. How did history shape it?',
        run: ['With your librarian, choose a text by a First Nations, Métis or Inuit creator about history or lived experience.', 'Read the author note to learn the creator' + AP + 's nation or community and when it was written.',
          'Talk about the events or times that shaped the text, and how its ideas connect to people' + AP + 's lives today.'],
        rubric: ['Recalls little of the text yet.', 'Retells it; links to history with help.', 'Explains how events or experiences shaped the text.', 'Explains this respectfully and connects it to lived experience today.'],
        coach: '<p>Let the creator' + AP + 's words lead. Avoid treating First Nations, Métis and Inuit peoples as one group; each nation and community is distinct.</p>' },
      { id: 'thinking-skills', title: 'How did I think about this text?', code: 'C3.8', pic: W.icon('think'), say: 'Which thinking skills did you use? How did they help?',
        run: ['After reading a text with an opinion in it, ask: "Did you check facts? Look for bias? Compare views? Ask who is missing?"', 'The child names two thinking skills and explains how each helped them understand.'],
        rubric: ['Cannot name a skill yet.', 'Names one with help.', 'Names two and how they helped.', 'Explains clearly how the skills changed their understanding.'] }
    ]
  });

  Q.shapes('thinking', {
    infer: [[1, 'evidence', evidence], [1, 'tap-clue', inferTap], [2, 'tf', inferTf]],
    global: [[1, 'clue', globalClue], [1, 'tap', globalTap], [2, 'tf', globalTf]],
    support: [[1, 'not', notSupport], [1, 'main', mainFor], [2, 'tf', supportTf]],
    plots: [[1, 'match', matchPlots], [2, 'order', plotOrder], [1, 'tf', plotTf]],
    perspective: [[1, 'fact', factOpinion], [1, 'tf', factTf], [2, 'pick', pickFacts]],
    bias: [[1, 'word', biasWord], [1, 'missing', missing], [2, 'tf', biasTf]],
    message: [[1, 'pick', access], [1, 'tf', messageTf], [2, 'match', matchHelps]]
  });
})();
