/* Grade 8: critical reading. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 8, Strand C (Comprehension), C3 Critical Thinking in Literacy:
   C3.1 literary devices, including irony, satire and allusion          C3.2 local and global inferences, with explicit and implicit evidence
   C3.3 evaluate, synthesize and sequence information, and draw conclusions
   C3.4 cultural elements in texts: norms, values, social hierarchy, past times, language and taboos
   C3.5 explicit and implicit perspectives, evidence of bias, and ways to avoid it
   C3.6 how topics such as diversity, inclusion and accessibility are addressed, and the positions presented
   With a grown-up: C3.4 cultural elements in a longer text, C3.6 a written response, C3.7 comparing texts by First Nations, Metis and
   Inuit creators, C3.8 critical thinking goals.
   Passages are in ../texts.js; everything else is written here for this site. Answer checks: tests/verify/grade8-thinking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts, AP = '’', OQ = '“', CQ = '”';
  function q(s) { return OQ + s + CQ; }
  function mark(s, w) { return s.replace(w, '<mark class="hl">' + w + '</mark>'); }

  /* ---------- irony: [the ironic moment, the same moment without irony, the kind, what you would expect] ---------- */
  var IRONY = [['The fire station burned down.', 'The fire station was repainted.', 'situational', 'A fire station should be the safest place from fire.'],
    [q('Lovely weather,') + ' Kai said, as hail smashed the windshield.', q('Lovely weather,') + ' Kai said, as the sun warmed the dock.', 'verbal', 'Someone who says lovely means it.'],
    ['The spelling bee champion misspelled her own name on the trophy.', 'The spelling bee champion signed her name on the trophy.', 'situational', 'A spelling champion should spell her own name.'],
    ['The sign for the quiet zone flashed and beeped all day.', 'The sign for the quiet zone was small and plain.', 'situational', 'A quiet zone sign should be quiet.'],
    ['The lifeguard had to be rescued from the pool.', 'The lifeguard rescued a swimmer from the pool.', 'situational', 'A lifeguard rescues others.'],
    [q('Thanks for the help,') + ' Mei said to her brother, who had eaten all the cookies she baked for the sale.', q('Thanks for the help,') + ' Mei said to her brother, who had packed the cookies for the sale.', 'verbal', 'Someone who says thanks is grateful.'],
    [q('What a great idea,') + ' Owen muttered, as the canoe tipped over.', q('What a great idea,') + ' Owen said, as the canoe glided across the lake.', 'verbal', 'Someone who praises an idea likes it.'],
    ['The book about staying organized was lost under a pile of papers.', 'The book about staying organized sat neatly on the shelf.', 'situational', 'A book about organizing should be easy to find.'],
    ['The audience knows the gift is broken, but Theo smiles and waits for his friend to open it.', 'The audience and Theo both watch his friend open the gift.', 'dramatic', 'Theo would worry if he knew what the audience knows.'],
    ['We know the ice is thin, but the skaters in the story race happily toward the middle of the lake.', 'The skaters in the story test the ice carefully before they race.', 'dramatic', 'The skaters would stop if they knew what we know.'],
    ['We know the surprise party is waiting inside, but Zara grumbles that everyone forgot her birthday.', 'Zara grins because she knows about the surprise party inside.', 'dramatic', 'Zara would be happy if she knew what we know.']];
  var IRONYKIND = { situational: 'what happens is the opposite of what you expect', verbal: 'someone says the opposite of what they mean', dramatic: 'the reader knows something a character does not' };
  function ironic(lv) {
    var x = R.pick(IRONY), others = R.some(IRONY.filter(function (y) { return y !== x; }), lv > 1 ? 2 : 1).map(function (y) { return y[1]; });
    return Q.one('Which sentence uses <b>irony</b>?', x[0], [x[1]].concat(others), { prompt: 'Which one turns out the opposite of what you would expect?',
      hint: 'Irony: the opposite of what is said or expected.', explain: W.chain([x[3], x[0]], ['Expected', 'Instead']), meta: { k: 'g8-irony', s: x[0] } });
  }
  function ironyKind(lv) {
    var x = R.pick(IRONY);
    return Q.tiles('What kind of irony is this?', x[2], Object.keys(IRONYKIND).filter(function (k) { return k !== x[2]; }), { fig: W.sent(x[0]), prompt: 'Is it what happens, what someone says, or what the reader knows?',
      hint: 'Situational: what happens. Verbal: what is said. Dramatic: what the reader knows.', explain: x[2] + ': ' + IRONYKIND[x[2]] + '.', meta: { k: 'g8-irony-kind', s: x[0] } });
  }
  function ironyExpect(lv) {
    var x = R.pick(IRONY);
    return Q.one('What would you <b>expect</b> instead?', x[3], R.some(IRONY.filter(function (y) { return y !== x; }), lv > 1 ? 2 : 1).map(function (y) { return y[3]; }), { fig: W.sent(x[0]),
      prompt: 'Irony works against what we expect.', hint: 'Which expectation does this sentence break?', explain: W.chain([x[3], x[0]], ['Expected', 'Instead']), meta: { k: 'g8-irony-expect', s: x[0] } });
  }
  function ironyTf() {
    var x = R.pick(IRONY), right = R.int(0, 1) === 1, s = right ? x[0] : x[1];
    return { q: Q.name() + ' says this sentence is <b>ironic</b>.', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['It turns against what we expect.', 'It is what we would expect.'], answer: right ? 0 : 1 }, hint: 'What would you expect? Does it happen?',
      explain: right ? W.chain([x[3], x[0]], ['Expected', 'Instead']) : 'Nothing unexpected happens.', meta: { k: 'g8-irony-tf', s: s } };
  }

  /* ---------- satire: short original satires, and what each mocks ---------- */
  var SATIRE = [[T.spoon.title, T.spoon.lines, 'adding technology and fees to things that work fine without them'],
    ['New Law Bans Rain on Weekends', ['Town council voted today to ban rain on Saturdays and Sundays.', 'Clouds that break the rule will be fined $500.', q('We listened to voters,') + ' said the mayor, holding an umbrella.'], 'politicians who promise what they cannot deliver'],
    ['A Nature Lover' + AP + 's Guide to the Lake', ['Step 1: Drive four hours to the quietest lake in Ontario.', 'Step 2: Take 300 photos of yourself in front of it.', 'Step 3: Leave before you actually look at it.'], 'people who care more about posting photos than about the place'],
    ['Student Reads the Terms and Conditions', ['For the first time in history, a Grade 8 student has read an app' + AP + 's terms and conditions.', 'It took eleven days and two pots of tea.', 'She now knows the app owns her photos, her voice and her cat' + AP + 's name.'], 'apps that hide what they do with your data in long, unreadable terms'],
    ['The Meeting About Meetings', ['The committee met for three hours to plan a shorter meeting.', 'It agreed to meet again next week to discuss the plan.', 'No one remembered what the first meeting was for.'], 'groups that waste time on pointless meetings'],
    ['Now With More Air!', ['Our chip bag is bigger than ever.', 'Inside, you will find the same six chips, now with extra room to breathe.', 'Freshness you can see right through.'], 'packaging that looks bigger than what is inside'],
    ['Phone-Free Week Lasts Four Minutes', ['Our family began Phone-Free Week at 7:00 p.m. on Sunday.', 'By 7:04, Dad needed to check the score, Mom needed the weather, and I needed to tell everyone about it online.', 'We will try again next year, once we check our calendars.'], 'how hard it is to put our phones down']];
  var REAL = ['New Library Hours Start Monday', 'How to Patch a Bike Tube', 'Ferry Schedule for the Long Weekend', 'Recycling Pickup Moves to Thursday', 'Results of the Science Fair', 'Tips for Your First Canoe Trip'];
  function satireShow(x) { return W.passage(x[0], x[1], x[0] === T.spoon.title ? { pics: T.spoon.pics } : {}); }
  function satire(lv) {
    var x = R.pick(SATIRE);
    return Q.one('What is this satire <b>really</b> making fun of?', x[2], R.some(SATIRE.filter(function (y) { return y !== x; }), lv > 1 ? 2 : 1).map(function (y) { return y[2]; }), { fig: satireShow(x),
      prompt: 'Satire exaggerates something real to make a point.', hint: 'What real thing does it copy and stretch?', explain: 'It mocks ' + x[2] + '.', meta: { k: 'g8-satire', t: x[0] } });
  }
  function satireWhich(lv) {
    var x = R.pick(SATIRE);
    return Q.tiles('Which headline is most likely <b>satire</b>?', x[0], R.some(REAL, lv > 1 ? 3 : 2), { prompt: 'Which one could not be completely serious?',
      hint: 'Satire stretches something real until it is absurd.', explain: x[0] + ': it mocks ' + x[2] + '.', meta: { k: 'g8-satire-which' } });
  }
  function satireTf() {
    var x = R.pick(SATIRE), right = R.int(0, 1) === 1, said = right ? x[2] : R.pick(SATIRE.filter(function (y) { return y !== x; }))[2];
    return { q: Q.name() + ' says this satire mocks <b>' + said + '</b>.', fig: satireShow(x), type: 'tf', answer: right,
      why: { options: ['That is what it exaggerates.', 'It exaggerates something else.'], answer: right ? 0 : 1 }, hint: 'What does it copy and stretch?',
      explain: 'It mocks ' + x[2] + '.', meta: { k: 'g8-satire-tf', t: x[0], said: said } };
  }
  function satireMatch() {
    var xs = R.some(SATIRE, 3);
    return { q: 'Match each satire to what it mocks.', type: 'match', pairs: xs.map(function (x) { return [x[0], x[2]]; }), hint: 'What real thing does each title stretch?',
      explain: 'Satire makes its audience question something real.', meta: { k: 'g8-satire-match' } };
  }

  /* ---------- allusion: [sentence, the allusion, what it refers to, the same idea without one] ---------- */
  var ALLUSION = [['Opening that box of old letters was like opening Pandora' + AP + 's box.', 'Pandora' + AP + 's box', 'a Greek myth about releasing troubles into the world', 'Opening that box of old letters caused a lot of trouble.'],
    ['Against the senior team, our small squad felt like David facing Goliath.', 'David facing Goliath', 'a story of a small fighter defeating a giant', 'Against the senior team, our small squad felt outmatched.'],
    ['He has the Midas touch: every business he starts makes money.', 'the Midas touch', 'a myth about a king who turned everything he touched to gold', 'Every business he starts makes money.'],
    ['Math was my Achilles' + AP + ' heel all year.', 'Achilles' + AP + ' heel', 'a Greek hero with one weak spot', 'Math was my weakest subject all year.'],
    ['After the long holiday, I felt like Rip Van Winkle.', 'Rip Van Winkle', 'a story about a man who sleeps for twenty years', 'After the long holiday, I felt very out of date.'],
    ['If you keep crying wolf, no one will believe you when the alarm is real.', 'crying wolf', 'a fable about a boy who lied so often that no one believed him', 'If you keep raising false alarms, no one will believe you.'],
    ['The free game was a Trojan horse that filled the tablet with ads.', 'a Trojan horse', 'a Greek story of soldiers hidden inside a gift', 'The free game secretly filled the tablet with ads.'],
    ['Cleaning out the garage was a Herculean task.', 'Herculean', 'a Greek hero famous for impossible labours', 'Cleaning out the garage was a huge job.'],
    ['Slow and steady, like the tortoise, Hana finished the marathon ahead of faster runners.', 'like the tortoise', 'a fable about a slow, steady racer who beats a fast one', 'Slow and steady, Hana finished the marathon ahead of faster runners.'],
    ['The final exam was where my study plan met its Waterloo.', 'its Waterloo', 'a famous battle where Napoleon was finally defeated', 'The final exam was where my study plan failed.']];
  function allusion(lv) {
    var a = R.pick(ALLUSION);
    return Q.one('What does the <b>allusion</b> refer to?', a[2], R.some(ALLUSION.filter(function (x) { return x !== a; }), lv > 1 ? 2 : 1).map(function (x) { return x[2]; }), { fig: W.sent(mark(a[0], a[1])),
      prompt: 'Which famous story, myth or event does it borrow?', hint: 'An allusion is a short reference to a well-known story, myth or event.', explain: a[2] + '.', meta: { k: 'g8-allusion', s: a[0] } });
  }
  function whichAllusion(lv) {
    var a = R.pick(ALLUSION), others = R.some(ALLUSION.filter(function (x) { return x !== a; }), lv > 1 ? 2 : 1).map(function (x) { return x[3]; });
    return Q.one('Which sentence contains an <b>allusion</b>?', a[0], [a[3]].concat(others), { prompt: 'Look for a name or phrase from a famous story.',
      hint: 'Look for a name from a famous story or myth.', explain: W.sent(mark(a[0], a[1])), meta: { k: 'g8-which-allusion' } });
  }
  function allusionWords(lv) {
    var a = R.pick(ALLUSION), words = a[0].replace(/[.,:]/g, '').split(' ').filter(function (w) { return w.length > 3 && a[1].indexOf(w) < 0; });
    return Q.tiles('Which words are the <b>allusion</b>?', a[1], R.some(words, lv > 1 ? 3 : 2), { fig: W.sent(a[0]), prompt: 'Which words point to a famous story?',
      hint: 'Look for a name or phrase from a myth, fable, story or history.', explain: W.sent(mark(a[0], a[1])) + ' ' + a[2] + '.', meta: { k: 'g8-allusion-words', s: a[0] } });
  }
  function allusionTf() {
    var a = R.pick(ALLUSION), right = R.int(0, 1) === 1, said = right ? a[2] : R.pick(ALLUSION.filter(function (x) { return x !== a; }))[2];
    return { q: Q.name() + ' says this allusion refers to <b>' + said + '</b>.', fig: W.sent(mark(a[0], a[1])), type: 'tf', answer: right,
      why: { options: ['That is the story it borrows.', 'It borrows a different story.'], answer: right ? 0 : 1 }, hint: 'Which story does the name come from?', explain: a[2] + '.', meta: { k: 'g8-allusion-tf', s: a[0], said: said } };
  }

  /* ---------- inferences, from the passages ---------- */
  function inferOf(lv) { var t = R.pick(T.list('infer', lv)); return [t, R.pick(t.infer)]; }
  function line(t, words) { return T.body(t).filter(function (l) { return l.indexOf(words) >= 0; })[0]; }
  function infer(lv) {
    var p = inferOf(lv), t = p[0], f = p[1];
    return Q.one(f[0], f[1], [f[2]].concat(lv > 1 ? t.infer.filter(function (x) { return x !== f; }).map(function (x) { return x[1]; }).slice(0, 1) : []), { fig: T.show(t),
      prompt: 'The text does not say it. Look for a clue.', hint: 'Actions and details hint at what is not said.', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g8-infer', t: t.title, q: f[0] } });
  }
  function evidence(lv) {
    var p = inferOf(lv), t = p[0], f = p[1], right = line(t, f[3]);
    return Q.one('<b>' + f[0] + '</b> ' + f[1].charAt(0).toUpperCase() + f[1].slice(1).replace(/\.$/, '') + '. Which sentence is the best evidence?', right, R.some(T.body(t).filter(function (l) { return l !== right; }), lv > 1 ? 2 : 1), { fig: T.show(t),
      prompt: 'Which sentence would you point to?', hint: 'Which sentence would you point to if someone asked "How do you know?"', explain: W.sent(mark(right, f[3])), meta: { k: 'g8-evidence', t: t.title, q: f[0] } });
  }
  function inferTap(lv) {
    var p = inferOf(lv), t = p[0], f = p[1], i = t.lines.indexOf(line(t, f[3]));
    return { q: '<b>' + f[0] + '</b> ' + f[1].charAt(0).toUpperCase() + f[1].slice(1).replace(/\.$/, '') + '. Tap the sentence that shows it.', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Find the clue in the text.', hint: 'Which sentence hints at it without saying it?', explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g8-infer-tap', t: t.title, q: f[0] } };
  }
  function inferTf(lv) {
    var p = inferOf(lv), t = p[0], f = p[1], right = R.int(0, 1) === 1, said = right ? f[1] : f[2];
    return { q: f[0] + '<br>' + Q.name() + ' infers: <b>' + said + '</b>', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['A clue in the text supports it.', 'The clues point another way.'], answer: right ? 0 : 1 }, hint: 'Find a clue. Does it support this?',
      explain: 'The clue: <mark class="hl">' + f[3] + '</mark>.', meta: { k: 'g8-infer-tf', t: t.title, q: f[0], said: said } };
  }

  /* ---------- conclusions: [passage, a conclusion the text supports, conclusions that go too far] ---------- */
  var CONCLUDE = [['roads', 'Communities that rely on ice roads may need other ways to get supplies.', ['Ice roads will never be used again.', 'Northern Ontario no longer has winter.']],
    ['rooftop', 'Green spaces can help keep buildings cooler.', ['Every roof in Canada should be a garden.', 'Asphalt should be banned.']],
    ['library', 'Closing the library early would affect many students.', ['The council does not care about students.', 'Libraries are always better than schools.']],
    ['sturgeon', 'Working together can help a species recover, but it takes time.', ['Sturgeon will always be rare.', 'Every dam should be removed.']],
    ['tides', 'The shape of a bay can make its tides much bigger.', ['Every bay has huge tides.', 'The Moon has no effect on other oceans.']],
    ['skatepark', 'A skate park could give young people a safer place to skate.', ['Skate parks always stop all trouble.', 'Every town in Canada needs a skate park.']],
    ['repair', 'Repairing things can reduce waste.', ['Nobody should ever buy anything new.', 'Repair cafés will end all garbage.']],
    ['radio', 'A local radio station can help a community in an emergency.', ['Radio is always better than phones.', 'Every storm is dangerous.']],
    ['orchard', 'Weather can decide whether a farm has a good year.', ['Frost always destroys cherry crops.', 'Farmers never sleep in spring.']],
    ['tryout', 'Effort on defence can matter to a coach, not just scoring.', ['Shots never matter in basketball.', 'Every tryout is won by stealing the ball.']]];
  var FAR = ['never', 'always', 'every', 'Every', 'no longer', 'banned', 'Nobody', 'end all', 'does not care', 'no effect', 'all'];
  function conclude(lv) {
    var c = R.pick(CONCLUDE), t = T[c[0]];
    return Q.one('Which conclusion does the text <b>support</b>?', c[1], c[2].slice(0, lv > 1 ? 2 : 1), { fig: T.show(t), prompt: 'Which one goes only as far as the evidence?',
      hint: 'Watch for words like never, always and every: they often go further than the text.', explain: c[1], meta: { k: 'g8-conclude', t: t.title } });
  }
  function concludeTf(lv) {
    var c = R.pick(CONCLUDE), t = T[c[0]], right = R.int(0, 1) === 1, said = right ? c[1] : R.pick(c[2]);
    return { q: Q.name() + ' concludes: <b>' + said + '</b>', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['The text supports it.', 'It goes further than the text.'], answer: right ? 0 : 1 }, hint: 'Does the text really prove that much?',
      explain: 'Supported: ' + c[1], meta: { k: 'g8-conclude-tf', t: t.title, said: said } };
  }
  function tooFar(lv) {
    var c = R.pick(CONCLUDE), s = R.pick(c[2]), w = FAR.filter(function (f) { return new RegExp('\\b' + f + '\\b').test(s); })[0];
    var others = s.replace(/[.,]/g, '').split(' ').filter(function (x) { return x.length > 3 && w.indexOf(x) < 0 && FAR.indexOf(x) < 0; });
    return Q.tiles('Which word makes this conclusion go <b>too far</b>?', w, R.some(others, lv > 1 ? 3 : 2), { fig: W.sent(s), prompt: 'Which word claims more than any text could prove?',
      hint: 'Look for words like never, always, every and all.', explain: W.sent(mark(s, w)), meta: { k: 'g8-too-far', s: s } });
  }
  function sequence(lv) {
    var t = R.pick(T.list('order')), ev = lv > 1 ? t.order : R.some(t.order.map(function (e, i) { return i; }), 3).sort().map(function (i) { return t.order[i]; });
    return { q: 'Put these events in order.', fig: T.show(t), type: 'order', items: ev.map(q), first: 'First', last: 'Last', prompt: 'Find each one in the text.',
      hint: 'Find each one in the text.', explain: W.chain(ev.map(q)), meta: { k: 'g8-sequence', t: t.title } };
  }

  /* ---------- cultural elements: [an excerpt, the element it shows] ---------- */
  var ELEMENT = { norm: 'a norm (an expected way to behave)', value: 'a value (what people believe is important)', hierarchy: 'social hierarchy (who has more power or status)',
    past: 'a past time (how life was in an earlier era)', language: 'language (the words a community uses)', taboo: 'a taboo (something that is not done or said)' };
  var CULTURE = [['In Dev' + AP + 's home, everyone takes off their shoes at the door without being asked.', 'norm'],
    ['In Ayesha' + AP + 's family, the youngest person always serves tea to the elders first.', 'norm'],
    ['For Rosa' + AP + 's grandmother, sharing a meal with neighbours mattered more than any gift.', 'value'],
    ['For the Okafor family, finishing school came before everything, even soccer.', 'value'],
    ['In the old kingdom, only nobles sat at the high table; servants ate in the kitchen.', 'hierarchy'],
    ['On the ship, the captain ate first, then the officers, and the deckhands last of all.', 'hierarchy'],
    ['Before telephones reached the village, news arrived once a month by dog sled.', 'past'],
    ['In 1923, Lena' + AP + 's great-grandmother crossed the ocean with one trunk and a letter of introduction.', 'past'],
    ['Lolo greeted us in Tagalog, then switched to English for my friends.', 'language'],
    ['At home, Mateo' + AP + 's family mixed Spanish and English in the same sentence without thinking about it.', 'language'],
    ['In the story, no one spoke the name of the mountain aloud; it was considered disrespectful.', 'taboo'],
    ['In the village, whistling indoors was thought to bring bad luck, so no one ever did it.', 'taboo']];
  function culture(lv) {
    var c = R.pick(CULTURE);
    return Q.one('Which cultural element does this show?', ELEMENT[c[1]], R.some(Object.keys(ELEMENT).filter(function (k) { return k !== c[1]; }), lv > 1 ? 3 : 2).map(function (k) { return ELEMENT[k]; }), { fig: W.sent(c[0]),
      prompt: 'Behaviour, beliefs, status, an earlier era, words, or something not done?', hint: 'Behaviour, beliefs, status, an earlier era, words, or something not done?', explain: ELEMENT[c[1]] + '.', meta: { k: 'g8-culture-el', s: c[0] } });
  }
  function cultureWhich(lv) {
    var k = R.pick(Object.keys(ELEMENT)), right = R.pick(CULTURE.filter(function (c) { return c[1] === k; }));
    return Q.one('Which excerpt shows <b>' + ELEMENT[k] + '</b>?', right[0], R.some(CULTURE.filter(function (c) { return c[1] !== k; }), lv > 1 ? 2 : 1).map(function (c) { return c[0]; }), {
      prompt: 'Read the meaning in brackets first.', hint: 'Match the excerpt to the meaning in brackets.', explain: W.sent(right[0]), meta: { k: 'g8-culture-which', el: k } });
  }
  function cultureTf() {
    var c = R.pick(CULTURE), right = R.int(0, 1) === 1, said = right ? c[1] : R.pick(Object.keys(ELEMENT).filter(function (k) { return k !== c[1]; }));
    return { q: Q.name() + ' says this shows <b>' + ELEMENT[said] + '</b>.', fig: W.sent(c[0]), type: 'tf', answer: right,
      why: { options: ['The excerpt shows that.', 'It shows a different element.'], answer: right ? 0 : 1 }, hint: 'Read the meaning in brackets. Does it fit?', explain: ELEMENT[c[1]] + '.', meta: { k: 'g8-culture-tf', s: c[0], said: said } };
  }
  function cultureMatch() {
    var ks = R.some(Object.keys(ELEMENT), 3);
    return { q: 'Match each cultural element to what it means.', type: 'match', pairs: ks.map(function (k) { return [ELEMENT[k].split(' (')[0], ELEMENT[k].split(' (')[1].replace(')', '')]; }),
      hint: 'Think of an example of each.', explain: 'Cultural elements help readers understand the world of a text.', meta: { k: 'g8-culture-match' } };
  }

  /* ---------- bias: claims, and fairer ways to say the biased ones ---------- */
  var CLAIMS = [['Our survey of 200 students found that 70% walk to school.', false], ['Only lazy people take the bus.', true], ['Everyone who plays video games is antisocial.', true],
    ['The study measured the sleep of 50 teens over one month.', false], ['Old people cannot learn new technology.', true], ['The library recorded 12 000 evening visits last year.', false],
    ['Girls are bad at building things.', true], ['In our class poll, 18 of 27 students chose the gym.', false], ['People from the city know nothing about nature.', true],
    ['The town counted 340 cyclists on the bridge on Saturday.', false], ['Everyone knows that teens with nowhere to go will end up in trouble.', true], ['Three of the five council members voted for the plan.', false]];
  var FAIR = [['Only lazy people take the bus.', 'Some people take the bus because it is cheaper or greener.', 'Lazy people should take the bus more.'],
    ['Old people cannot learn new technology.', 'Some older people find new apps hard at first, and many learn them quickly.', 'Old people should not try new technology.'],
    ['Everyone who plays video games is antisocial.', 'Some studies look at how gaming affects friendships, with mixed results.', 'Video games are the worst hobby.'],
    ['Girls are bad at building things.', 'Building skills come from practice, not from being a boy or a girl.', 'Boys are bad at building things.'],
    ['People from the city know nothing about nature.', 'People learn about nature in many ways, wherever they live.', 'People from the country know everything about nature.'],
    ['Everyone knows that teens with nowhere to go will end up in trouble.', 'A student survey could show how many teens use the library at night.', 'All teens are in trouble.']];
  function biasWhich(lv) {
    var b = R.pick(CLAIMS.filter(function (c) { return c[1]; }));
    return Q.one('Which claim shows <b>bias</b>?', b[0], R.some(CLAIMS.filter(function (c) { return !c[1]; }), lv > 1 ? 2 : 1).map(function (c) { return c[0]; }), {
      prompt: 'Which one judges a whole group, with no evidence?', hint: 'Bias: an unfair claim about a whole group, with no evidence.', explain: '<mark class="hl">' + b[0] + '</mark> judges a whole group.', meta: { k: 'g8-bias-which' } });
  }
  function pickBias() {
    var b = CLAIMS.filter(function (c) { return c[1]; }), f = CLAIMS.filter(function (c) { return !c[1]; });
    return Q.all('Pick every claim that shows <b>bias</b>.', R.some(b, 2).map(function (c) { return c[0]; }), R.some(f, 2).map(function (c) { return c[0]; }), {
      hint: 'Look for unfair claims about a whole group, with no evidence.', explain: 'Claims with numbers and methods are evidence. Sweeping claims about groups show bias.', meta: { k: 'g8-pick-bias' } });
  }
  function biasTf() {
    var c = R.pick(CLAIMS), right = R.int(0, 1) === 1, says = right === c[1];
    return { q: Q.name() + ' says this claim ' + (says ? '<b>shows bias</b>' : '<b>is fair evidence</b>') + '.', fig: W.sent(c[0]), type: 'tf', answer: right,
      why: { options: [c[1] ? 'It judges a whole group with no evidence.' : 'It reports what was counted or measured.', 'Any claim in a text is fair.'], answer: 0 },
      hint: 'Does it judge a whole group, or report what was measured?', explain: c[1] ? 'It judges a whole group: bias.' : 'It reports a measurement: evidence.', meta: { k: 'g8-bias-tf', s: c[0], says: says } };
  }
  function fixBias(lv) {
    var f = R.pick(FAIR);
    return Q.one('How could the writer say this <b>without bias</b>?', f[1], [f[2]].concat(lv > 1 ? [R.pick(FAIR.filter(function (x) { return x !== f; }))[2]] : []), { fig: W.sent(f[0]),
      prompt: 'Which one is fair to everyone, and could be checked?', hint: 'A fair claim is about some people, or gives evidence.', explain: f[1], meta: { k: 'g8-fix-bias', s: f[0] } });
  }

  /* ---------- positions in a discussion about inclusion: [title, lines, each speaker's view, [[question, right, wrong, wrong], ...]] ---------- */
  var TALKS = [['Moving the Spring Dance', ['Amir: ' + q('The stage room has stairs only. In the gym, everyone can get in, including students who use wheelchairs.'),
      'Ms. Li: ' + q('The gym is bigger, but the sound echoes. Students who use hearing aids may struggle.'), 'Tala: ' + q('Let' + AP + 's use the gym and rent sound panels, so the space works for everyone.')],
    ['Use the gym, because everyone can get in.', 'The echo is a problem for hearing aids.', 'Use the gym, with sound panels.'],
    [['What is Amir' + AP + 's position?', 'The gym is better because everyone can get in.', 'The dance should be cancelled.', 'The stage room is better because it is quieter.'],
      ['What is Ms. Li' + AP + 's concern?', 'Echoes in the gym could leave out students who use hearing aids.', 'The gym is too small.', 'Students who use wheelchairs cannot get into the gym.'],
      ['Whose idea answers both concerns?', 'Tala' + AP + 's', 'Amir' + AP + 's', 'Ms. Li' + AP + 's'],
      ['What topic do they all address?', 'making the dance accessible to all students', 'the cost of tickets', 'what music to play']]],
    ['Paying for the Field Trip', ['Jin: ' + q('Forty dollars is too much for some families. Some students might stay home.'),
      'Ms. Roy: ' + q('The bus alone costs $25 each. The school cannot make the trip free.'), 'Kemal: ' + q('Let' + AP + 's hold a bake sale so every student can go.')],
    ['The cost could keep some students home.', 'The school cannot pay for the bus.', 'Raise money so everyone can go.'],
    [['What is Jin' + AP + 's position?', 'The cost could leave some students out.', 'The trip is too long.', 'The bus is unsafe.'],
      ['What is Ms. Roy' + AP + 's concern?', 'The bus costs money the school does not have.', 'Students will not behave.', 'The trip is too short.'],
      ['Whose idea answers both concerns?', 'Kemal' + AP + 's', 'Jin' + AP + 's', 'Ms. Roy' + AP + 's'],
      ['What topic do they all address?', 'making the trip affordable for every student', 'where to go on the trip', 'who drives the bus']]],
    ['Captions for the Announcements', ['Hana: ' + q('Students who are Deaf or hard of hearing miss the video announcements. We need captions.'),
      'Mr. Patel: ' + q('Typing captions every morning takes time we do not have.'), 'Leo: ' + q('The video app can make captions on its own, and a student volunteer could check them.')],
    ['Add captions so everyone can follow.', 'Typing captions takes too much time.', 'Use automatic captions, checked by a volunteer.'],
    [['What is Hana' + AP + 's position?', 'Without captions, some students miss the announcements.', 'The announcements are too long.', 'The video should be cancelled.'],
      ['What is Mr. Patel' + AP + 's concern?', 'There is not enough time to type captions.', 'Captions are too small to read.', 'Nobody watches the announcements.'],
      ['Whose idea answers both concerns?', 'Leo' + AP + 's', 'Hana' + AP + 's', 'Mr. Patel' + AP + 's'],
      ['What topic do they all address?', 'making the announcements accessible to everyone', 'what the announcements should say', 'who reads the announcements']]],
    ['Books for the Class Library', ['Zoe: ' + q('Most of our books are about kids from only a few backgrounds. Many of us never see ourselves in them.'),
      'Ms. Grant: ' + q('Our budget for new books is small this year.'), 'Ibrahim: ' + q('We could borrow a box of books from the public library each month and change them often.')],
    ['Get books that reflect the whole class.', 'There is little money for new books.', 'Borrow books from the public library.'],
    [['What is Zoe' + AP + 's position?', 'The books do not reflect the diversity of the class.', 'There are too many books.', 'The books are too hard to read.'],
      ['What is Ms. Grant' + AP + 's concern?', 'There is little money for new books.', 'The shelves are full.', 'Students do not like to read.'],
      ['Whose idea answers both concerns?', 'Ibrahim' + AP + 's', 'Zoe' + AP + 's', 'Ms. Grant' + AP + 's'],
      ['What topic do they all address?', 'making the class library reflect everyone in the class', 'how to sort the books', 'when the library is open']]]];
  function talk(t) { return W.passage(t[0], t[1]); }
  function speakers(t) { return t[1].map(function (l) { return l.split(':')[0]; }); }
  function position(lv) {
    var t = R.pick(TALKS), p = R.pick(lv > 1 ? t[3] : t[3].slice(0, 2));
    return Q.one(p[0], p[1], p.slice(2, lv > 1 ? 4 : 3), { fig: talk(t), prompt: 'Read each speaker' + AP + 's words closely.', hint: 'Read each speaker' + AP + 's words closely.', explain: p[1], meta: { k: 'g8-position', t: t[0], q: p[0] } });
  }
  function whoSays() {
    var t = R.pick(TALKS), i = R.int(0, 2), names = speakers(t);
    return Q.tiles('Who holds this view? <b>' + t[2][i] + '</b>', names[i], names.filter(function (n, j) { return j !== i; }), { fig: talk(t), prompt: 'Match the view to the speaker' + AP + 's words.',
      hint: 'Find the speaker whose words say this.', explain: names[i] + '.', meta: { k: 'g8-who-says', t: t[0], v: t[2][i] } });
  }
  function positionTf() {
    var t = R.pick(TALKS), p = R.pick(t[3]), right = R.int(0, 1) === 1, said = right ? p[1] : R.pick(p.slice(2));
    return { q: p[0] + '<br>' + Q.name() + ' says: <b>' + said + '</b>', fig: talk(t), type: 'tf', answer: right,
      why: { options: ['The speakers' + AP + ' words show it.', 'The words show something else.'], answer: right ? 0 : 1 }, hint: 'Read each speaker' + AP + 's words closely.',
      explain: p[1], meta: { k: 'g8-position-tf', t: t[0], q: p[0], said: said } };
  }
  function positionMatch() {
    var t = R.pick(TALKS);
    return { q: 'Match each speaker to their view.', fig: talk(t), type: 'match', pairs: speakers(t).map(function (n, i) { return [n, t[2][i]]; }),
      hint: 'Read each speaker' + AP + 's words closely.', explain: 'Each speaker sees the topic from a different position.', meta: { k: 'g8-position-match', t: t[0] } };
  }

  var CAP = T.captain, IX = IRONY, SR = SATIRE[1], AL = ALLUSION, D = TALKS[0];
  Atlas.register('thinking', {
    full: true,
    lessons: [{
      id: 'devices', title: 'Irony, satire and allusion', sub: 'Devices that say more than the words.',
      concepts: [
        { slug: 'irony', title: 'Irony: the opposite of what is expected', exp: ['C3.1'], skill: 'irony',
          model: [
            step(W.sent(IX[0][0]), 'A fire station, of all places.'),
            step(W.chain([IX[0][3], IX[0][0]], ['Expected', 'Instead']), 'Situational irony.'),
            step(W.sent(IX[1][0]), 'Hail, and he says lovely.'),
            step(W.chain(['lovely', 'hail smashing the windshield'], ['Says', 'Really']), 'Verbal irony.'),
            step(W.sent('I can' + AP + 't imagine why.'), 'We know why; the narrator does not. Dramatic irony.')
          ],
          guided: [function () { return ironic(1); }, function () { return ironyKind(1); }, ironyTf],
          check: [function () { return ironic(2); }, function () { return ironyKind(2); }, function () { return ironyExpect(2); }, ironyTf, function () { return ironyKind(3); }],
          coach: '<p>Irony can be funny or sad. Ask: "What did you expect? What happened instead?"</p>',
          mistake: '<p>Calling any bad luck "ironic". Irony needs a twist against expectations.</p>' },
        { slug: 'satire', title: 'Satire exaggerates to criticize', exp: ['C3.1'], skill: 'satire',
          model: [
            step(T.show(T.spoon), 'It looks like an ad.'),
            step(W.sent('Battery life: almost one whole bowl of soup.'), 'Stretched until it is absurd.'),
            step(W.means('think', T.spoon.target), 'The real target.'),
            step(W.passage(SR[0], SR[1]), 'A news story? Read it closely.'),
            step(W.means('think', SR[2]), 'The mayor holds an umbrella. The real target.')
          ],
          guided: [function () { return satire(1); }, function () { return satireWhich(1); }, satireTf],
          check: [function () { return satire(2); }, function () { return satireWhich(2); }, satireTf, satireMatch, function () { return satire(3); }],
          coach: '<p>Satire works only if the audience knows what is being mocked. Ask: "Who is this for, and what should they question afterward?"</p>',
          mistake: '<p>Taking satire at face value, as if the product or law were real.</p>' },
        { slug: 'allusion', title: 'An allusion borrows a famous story', exp: ['C3.1'], skill: 'allusion',
          model: [
            step(W.sent(mark(AL[1][0], AL[1][1]))),
            step(W.means('think', AL[1][2]), 'A few words bring the whole story.'),
            step(W.sent(AL[1][3]), 'Without it: flat.'),
            step(W.sent(mark(AL[6][0], AL[6][1]))),
            step(W.means('think', AL[6][2]), 'A harmful thing hidden inside a gift.')
          ],
          guided: [function () { return allusion(1); }, function () { return whichAllusion(1); }, function () { return allusionWords(1); }],
          check: [function () { return allusion(2); }, function () { return whichAllusion(2); }, function () { return allusionWords(2); }, allusionTf, function () { return allusion(3); }],
          coach: '<p>When an allusion is unfamiliar, look it up. Many come from myths, fables, history and well-known books.</p>',
          mistake: '<p>Skipping over a name that seems out of place. It is often an allusion.</p>' }
      ]
    }, {
      id: 'inference', title: 'Inferences and conclusions', sub: 'Reading between the lines, with evidence.',
      concepts: [
        { slug: 'infer', title: 'Infer from clues, then prove it', exp: ['C3.2'], skill: 'infer',
          model: [
            step(T.show(CAP), 'The narrator says: calm.'),
            step(W.sent(mark(CAP.lines[2], 'kicked the water bottle')), 'The actions say otherwise.'),
            step(W.chain(['kicked the water bottle', 'Not calm at all.'], ['Clue', 'Inference'])),
            step(W.sent(mark(T.radio.lines[9], 'hands shook')), 'A longer story.'),
            step(W.chain(['hands shook', 'Elisapee is nervous.'], ['Clue', 'Inference']), 'The text never says nervous.')
          ],
          guided: [function () { return infer(1); }, function () { return evidence(1); }, function () { return inferTap(1); }],
          check: [function () { return infer(2); }, function () { return evidence(2); }, function () { return inferTap(2); }, function () { return inferTf(2); }, function () { return infer(3); }],
          coach: '<p>Use the frame: "I think… because the text says…" every time.</p>',
          mistake: '<p>Inferences with no evidence, or guesses that the text contradicts.</p>' },
        { slug: 'conclude', title: 'Conclusions go only as far as the evidence', exp: ['C3.3'], skill: 'conclude',
          model: [
            step(T.show(T.roads), 'Warmer winters, shorter road season.'),
            step(W.sent(mark(CONCLUDE[0][2][0], 'never')), 'Too far: the text does not prove never.'),
            step(W.sent(CONCLUDE[0][1]), 'Supported by the text.'),
            step(W.sent(mark(CONCLUDE[3][2][1], 'Every')), 'A longer text. Too far again.'),
            step(W.sent(mark(CONCLUDE[3][1], 'can help')), 'Careful words: can help, takes time.')
          ],
          guided: [function () { return conclude(1); }, function () { return tooFar(1); }, function () { return sequence(1); }],
          check: [function () { return conclude(2); }, function () { return tooFar(2); }, function () { return concludeTf(2); }, function () { return sequence(2); }, function () { return conclude(3); }],
          coach: '<p>Circle words like all, every, never and always in conclusions. Ask: "Does the text really prove that?"</p>',
          mistake: '<p>Jumping from one example to a rule about everything.</p>' }
      ]
    }, {
      id: 'perspective', title: 'Culture, bias and perspective', sub: 'Whose view, whose values, and what is fair.',
      concepts: [
        { slug: 'culture', title: 'Texts carry cultural elements', exp: ['C3.4'], skill: 'culture',
          model: [
            step(W.sent(CULTURE[0][0])),
            step(W.means('people', ELEMENT.norm)),
            step(W.sent(CULTURE[2][0])),
            step(W.means('star', ELEMENT.value)),
            step(W.sent(CULTURE[10][0])),
            step(W.means('not', ELEMENT.taboo))
          ],
          guided: [function () { return culture(1); }, function () { return cultureWhich(1); }, cultureTf],
          check: [function () { return culture(2); }, function () { return cultureWhich(2); }, cultureTf, cultureMatch, function () { return culture(3); }],
          coach: '<p>Connect to the child' + AP + 's own life: "What norms or values does our family have? How would a reader from outside see them?"</p>',
          mistake: '<p>Judging another culture' + AP + 's norms as strange. Ask what they mean to the people in the text.</p>' },
        { slug: 'bias', title: 'Spot bias, and find a fairer way', exp: ['C3.5'], skill: 'bias',
          model: [
            step(W.sent(T.library.view.evidence), 'Evidence: something counted.'),
            step(W.sent(mark(T.library.view.bias, 'Everyone knows')), 'Bias: a sweeping claim about a group.'),
            step(W.means('people', T.library.view.missing), 'A missing perspective.'),
            step(W.sent(mark(FAIR[0][0], 'Only lazy people')), 'Another sweeping claim.'),
            step(W.sent(FAIR[0][1]), 'Fairer: about some people, with reasons.')
          ],
          guided: [function () { return biasWhich(1); }, biasTf, function () { return fixBias(1); }],
          check: [function () { return biasWhich(2); }, pickBias, biasTf, function () { return fixBias(2); }, function () { return biasWhich(3); }],
          coach: '<p>For any persuasive text ask three questions: Who wrote it? What do they want? Who is not heard?</p>',
          mistake: '<p>Thinking a text with some facts cannot be biased.</p>' },
        { slug: 'inclusion', title: 'Identify each position in a discussion', exp: ['C3.6'], skill: 'inclusion',
          model: [
            step(talk(D), 'Three people, one topic: accessibility.'),
            step(W.means('people', 'Amir: ' + D[2][0]) + W.means('listen', 'Ms. Li: ' + D[2][1])),
            step(W.means('star', 'Tala: ' + D[2][2]), 'A position that answers both.'),
            step(talk(TALKS[1]), 'A new topic: who can afford the trip.'),
            step(W.chain(TALKS[1][2], speakers(TALKS[1])), 'Three positions.')
          ],
          guided: [function () { return position(1); }, whoSays, positionTf],
          check: [function () { return position(2); }, whoSays, positionTf, positionMatch, function () { return position(3); }],
          coach: '<p>Accessibility means more than ramps. Talk about who might be left out of an event, and how to plan so no one is.</p>',
          mistake: '<p>Seeing only two sides. Often a third position combines the best of both.</p>' }
      ]
    }],
    practice: [
      { id: 'irony', name: 'Irony', code: 'C3.1', gen: ironic },
      { id: 'satire', name: 'Satire', code: 'C3.1', gen: satire },
      { id: 'allusion', name: 'Allusion', code: 'C3.1', gen: allusion },
      { id: 'infer', name: 'Inferences with evidence', code: 'C3.2', gen: infer },
      { id: 'conclude', name: 'Conclusions and order', code: 'C3.3', gen: conclude },
      { id: 'culture', name: 'Cultural elements', code: 'C3.4', gen: culture },
      { id: 'bias', name: 'Bias', code: 'C3.5', gen: biasWhich },
      { id: 'inclusion', name: 'Positions on inclusion', code: 'C3.6', gen: position }
    ],
    tasks: [
      { id: 'culture-novel', title: 'Culture in a longer text', code: 'C3.4', pic: W.icon('read'), say: 'In a novel or film, find two cultural elements. What do they add to the story?', write: true,
        run: ['Choose a novel or film set in a culture or time different from the child' + AP + 's own.', 'The child finds two cultural elements (norms, values, status, an earlier era, language or a taboo) and explains what each means in the story.', 'They connect one to their own life and culture.'],
        rubric: ['Cannot find a cultural element yet.', 'Names an element with help.', 'Explains two elements and how they shape the story.', 'Analyzes elements insightfully and makes a respectful personal connection.'] },
      { id: 'respond-inclusion', title: 'Respond to a text about inclusion', code: 'C3.6', pic: W.icon('write'), say: 'Read an article about diversity, inclusion or accessibility. Write your response.', write: true,
        run: ['Choose a current article for young people about diversity, inclusion or accessibility.', 'The child identifies the different positions in it, then writes their own response with reasons.'],
        rubric: ['Restates the topic only.', 'Identifies one position and gives an opinion.', 'Identifies different positions and responds with reasons.', 'Weighs the positions fairly and responds with insight and evidence.'] },
      { id: 'fnmi-compare', title: 'Compare two texts by First Nations, Métis or Inuit creators', code: 'C3.7', pic: W.icon('read'), say: 'Compare two works by First Nations, Métis or Inuit creators from different times.', write: true,
        run: ['With your librarian, choose two texts by First Nations, Métis or Inuit creators from different periods, for example one written about residential schools and one about life today.',
          'Ask: "How did the times, the events or the conditions of each period shape these texts? How do they relate to lived experiences today?"', 'The child writes a short comparison.'],
        rubric: ['Describes one text only.', 'Notes a simple similarity or difference.', 'Compares how history and conditions shaped each text, and links to today.', 'Insightful, respectful comparison with clear links to current lived experiences.'],
        coach: '<p>Approach residential schools and other painful histories with care. Choose age-appropriate texts recommended by Indigenous educators, and let the creators' + AP + ' voices lead.</p>' },
      { id: 'critical-goal', title: 'How well did I think?', code: 'C3.8', pic: W.icon('star'), say: 'Which critical thinking skill did you use best? Set one goal.', write: true,
        run: ['After the chapter, the child reviews the skills: inferring, finding bias, drawing conclusions, identifying positions.', 'They rate how well each worked for them and set one goal.'],
        rubric: ['No reflection.', 'Names a skill used.', 'Assesses two skills honestly and sets a goal.', 'Gives examples of each skill in use and sets a specific plan.'] }
    ]
  });

  Q.shapes('thinking', {
    irony: [[1, 'kind', ironyKind], [1, 'expected', ironyExpect], [1, 'true-false', ironyTf]],
    satire: [[1, 'which-headline', satireWhich], [1, 'true-false', satireTf], [2, 'match', satireMatch]],
    allusion: [[1, 'which-sentence', whichAllusion], [1, 'which-words', allusionWords], [2, 'true-false', allusionTf]],
    infer: [[1, 'evidence', evidence], [1, 'tap-clue', inferTap], [2, 'true-false', inferTf]],
    conclude: [[1, 'too-far', tooFar], [1, 'true-false', concludeTf], [1, 'order', sequence]],
    culture: [[1, 'which-excerpt', cultureWhich], [1, 'true-false', cultureTf], [2, 'match', cultureMatch]],
    bias: [[1, 'pick-all', pickBias], [1, 'true-false', biasTf], [1, 'fairer', fixBias]],
    inclusion: [[1, 'who-says', whoSays], [1, 'true-false', positionTf], [2, 'match', positionMatch]]
  });
})();
