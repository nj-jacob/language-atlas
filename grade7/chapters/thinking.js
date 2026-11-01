/* Grade 7: thinking critically about texts. A full chapter: every idea has two worked examples, three questions together and
   five on your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 7, C3 Critical Thinking in Literacy:
   C3.1 literary devices: foreshadowing, allegory and symbolism      C3.2 local and global inferences from explicit and implicit evidence
   C3.3 evaluating, synthesizing and sequencing information, and drawing conclusions                 C3.5 explicit and implicit perspectives, evidence of bias, and how to avoid it
   C3.6 how topics such as diversity, inclusion and accessibility are addressed, the messages, and the positions taken
   With a grown-up: C3.4 cultural elements, C3.7 First Nations, Métis and Inuit texts in their historical and social contexts, C3.8 which critical thinking skills helped.
   Passages are in ../texts.js; other examples are written for this site. Answer checks: tests/verify/grade7-thinking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var AP = '’', Q1 = '“', Q2 = '”';
  function at(t, words) { for (var i = 0; i < t.lines.length; i++) if (t.lines[i] && t.lines[i].charAt(0) !== '#' && t.lines[i].indexOf(words) >= 0) return i; return -1; }
  function hl(html, words) { return html.replace(words, '<mark class="hl">' + words + '</mark>'); }
  function others(list, item, n) { return R.some(list.filter(function (x) { return x !== item; }), n); }

  /* ---------- foreshadowing (C3.1): [early hint, what it hints at, two things it does not hint at] ---------- */
  var FORE = [['On the morning of the race, Dev noticed a crack in his bike frame.', 'The bike breaks during the race.', ['Dev wins easily.', 'The race moves indoors.']],
    ['Early in the trip, the guide says, ' + Q1 + 'Nothing could ever go wrong on this lake.' + Q2, 'Something goes wrong on the lake.', ['The guide quits.', 'They find a shipwreck.']],
    ['Grandma tucks an extra flashlight into Mina' + AP + 's pack, just in case.', 'Mina' + AP + 's light fails in the dark.', ['Mina loses her pack.', 'Grandma joins the trip.']],
    ['The ice near the point looks grey and slushy as the friends skate past.', 'The ice near the point cracks.', ['The friends join a hockey team.', 'The lake freezes solid.']],
    ['The new student keeps glancing at the piano in the corner of the gym.', 'The new student plays piano at the concert.', ['The piano is sold.', 'The gym is closed.']],
    ['Every time Leo locks the shed, the old latch slips open.', 'Something gets out of the shed.', ['Leo paints the shed.', 'The shed is moved.']],
    ['The forecast warns of freezing rain overnight, but the family drives north anyway.', 'The roads turn icy on the drive.', ['The car runs out of gas.', 'They stay home.']],
    ['Noor practises her speech, but she keeps losing her place on the second card.', 'Noor gets lost at the second card during her speech.', ['Noor forgets to bring her cards.', 'The speech is cancelled.']],
    ['A stray dog follows Sam home from school three days in a row.', 'Sam ends up keeping the dog.', ['Sam moves away.', 'The dog bites Sam.']],
    ['The captain jokes that the old canoe has a few more trips left in it, maybe.', 'The canoe leaks on the trip.', ['The captain buys a sailboat.', 'The trip is a race.']]];
  function forePassage(lv) { return R.pick(T.list('foreshadow', lv)); }
  function foreshadow(lv) {
    var t = forePassage(lv), f = t.foreshadow;
    return Q.one('Later, this happens: <b>' + f.later + '</b> Which early detail <b>foreshadows</b> it?', f.clue, f.wrong.slice(0, lv > 1 ? 2 : 1), { fig: T.show(t),
      prompt: 'Which early detail hints at trouble later?', hint: 'Foreshadowing is an early hint about what will happen.', explain: W.chain([f.clue, f.later], ['Early', 'Later']), meta: { k: 'g7-foreshadow', t: t.title } });
  }
  function foreTap(lv) {
    var t = forePassage(lv), f = t.foreshadow, i = at(t, f.clue);
    return { q: 'Later, this happens: <b>' + f.later + '</b> Tap the early sentence that hints at it.', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Look near the start.', hint: 'Find a small detail that seems to matter later.', explain: W.chain([f.clue, f.later], ['Early', 'Later']), meta: { k: 'g7-fore-tap', t: t.title } };
  }
  function foreLater(lv) {
    var f = R.pick(FORE);
    return Q.one('This comes early in a story. What does it most likely <b>hint at</b>?', f[1], f[2].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(f[0]), hint: 'Which later event would this detail set up?',
      explain: W.chain([f[0], f[1]], ['Early', 'Later']), meta: { k: 'g7-fore-later', s: f[0] } });
  }
  function foreWhich(lv) {
    var f = R.pick(FORE);
    return Q.one('Later in a story: <b>' + f[1] + '</b> Which early detail foreshadows it?', f[0], others(FORE, f, lv > 1 ? 2 : 1).map(function (x) { return x[0]; }), { hint: 'Which detail would make a careful reader expect this?',
      explain: W.chain([f[0], f[1]], ['Early', 'Later']), meta: { k: 'g7-fore-which', s: f[1] } });
  }
  function foreTf() {
    var f = R.pick(FORE), right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(f[2]);
    return { q: Q.name() + ' says this early detail hints that <b>' + said + '</b>', fig: W.sent(f[0]), type: 'tf', answer: right,
      why: { options: ['The detail sets that up.', 'Nothing in the detail points to that.'], answer: right ? 0 : 1 }, hint: 'Does the detail point to that event?',
      explain: W.chain([f[0], f[1]], ['Early', 'Later']), meta: { k: 'g7-fore-tf', s: f[0], said: said } };
  }

  /* ---------- symbolism (C3.1): [story detail, the object, what it stands for, two wrong meanings] ---------- */
  var SYMB = [['After the fire, Ava plants a single pine seedling where the old cabin stood.', 'the seedling', 'a fresh start', ['a fear of fire', 'a love of camping']],
    ['A broken watch appears whenever Kai runs out of time.', 'the broken watch', 'time running out', ['a birthday gift', 'a love of clocks']],
    ['A wilting plant on the windowsill comes back to life as the family heals.', 'the plant', 'the family' + AP + 's healing', ['the need for more sunlight', 'a gardening hobby']],
    ['Each night, Mei leaves the porch light on for her brother, who has not come home.', 'the porch light', 'hope that he will return', ['the cost of electricity', 'a fear of the dark']],
    ['The bridge between the two neighbourhoods is rebuilt after the friends make up.', 'the bridge', 'the friendship being repaired', ['better roads', 'a love of building']],
    ['Omar keeps his late father' + AP + 's toolbox under his bed and opens it before every big decision.', 'the toolbox', 'his father' + AP + 's guidance', ['a need for new tools', 'a messy bedroom']],
    ['A caged bird in the story sings only when the window is open.', 'the caged bird', 'a longing to be free', ['the noise of the city', 'a pet that needs food']],
    ['Zara wears her grandmother' + AP + 's beaded earrings on her first day at a new school.', 'the earrings', 'her family and where she comes from', ['the latest fashion', 'a lucky charm for tests']],
    ['The storm finally clears on the day the brothers stop arguing.', 'the clearing storm', 'the end of their conflict', ['the weather forecast', 'the start of summer']],
    ['A cracked mirror hangs in the hallway of the house where no one talks.', 'the cracked mirror', 'a family that has broken apart', ['an old house', 'bad luck']]];
  function symbol(lv) {
    var s = R.pick(SYMB);
    return Q.one('What does <b>' + s[1] + '</b> stand for?', s[2], s[3].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(s[0]), prompt: 'What changes with it? What bigger idea is tied to it?',
      hint: 'A symbol is an object that stands for a bigger idea.', explain: W.means('think', s[1] + ' = ' + s[2]), meta: { k: 'g7-symbol', s: s[0] } });
  }
  function symbolStory() {
    var t = R.pick(T.list('symbol')), s = t.symbol;
    return Q.one('What does <b>' + s.thing + '</b> stand for in this story?', s.means, s.wrong, { fig: T.show(t), prompt: 'Who gave it, and what does it help the character do?',
      hint: 'A symbol is an object that stands for a bigger idea.', explain: W.means('think', s.thing + ' = ' + s.means), meta: { k: 'g7-symbol-story', t: t.title } });
  }
  function symbolWhich(lv) {
    var s = R.pick(SYMB);
    return Q.tiles('Which object stands for <b>' + s[2] + '</b>?', s[1], others(SYMB, s, lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), { fig: W.sent(s[0]),
      hint: 'Which object in the sentence carries that idea?', explain: W.means('think', s[1] + ' = ' + s[2]), meta: { k: 'g7-symbol-which', s: s[0] } });
  }
  function symbolTf() {
    var s = R.pick(SYMB), right = R.int(0, 1) === 1, said = right ? s[2] : R.pick(s[3]);
    return { q: Q.name() + ' says <b>' + s[1] + '</b> stands for <b>' + said + '</b>.', fig: W.sent(s[0]), type: 'tf', answer: right,
      why: { options: ['It fits what happens with the object.', 'That is only on the surface, or not in the story.'], answer: right ? 0 : 1 }, hint: 'What bigger idea is tied to the object?',
      explain: W.means('think', s[1] + ' = ' + s[2]), meta: { k: 'g7-symbol-tf', s: s[0], said: said } };
  }
  function symbolMatch() {
    var ss = R.some(SYMB, 3);
    return { q: 'Match each symbol to what it stands for.', type: 'match', pairs: ss.map(function (s) { return [s[1], s[2]]; }), hint: 'What bigger idea could each object carry?',
      explain: 'Writers give objects meaning by tying them to feelings and events.', meta: { k: 'g7-symbol-match' } };
  }

  /* ---------- allegory (C3.1), and naming the device: [a whole story in brief, its lesson, two wrong lessons] ---------- */
  var ALLEG = [['A town bans all songbirds, and slowly its people forget how to laugh.', 'Taking away small joys can harm a whole community.', ['Birds are noisy.', 'Towns need more rules.']],
    ['The tallest tree in the forest will not share the sunlight, and it falls in a storm with no other trees to shelter it.', 'No one is strong enough to stand alone.', ['Tall trees grow fast.', 'Storms are dangerous.']],
    ['A crow collects shiny things until its nest is too heavy to stay in the tree.', 'Wanting more and more can destroy what you have.', ['Crows like shiny things.', 'Nests are hard to build.']],
    ['Ants from two colonies stop fighting when a flood comes, and together they build a raft.', 'Working together helps us survive hard times.', ['Ants are strong for their size.', 'Floods happen in spring.']],
    ['A king orders every clock in the land stopped so he will never grow old, and the harvest is missed.', 'Trying to stop change causes harm.', ['Clocks are hard to fix.', 'Kings are always wise.']],
    ['A fox lies to every animal, so no one warns him when the hunters come.', 'Dishonesty leaves you alone when you need help.', ['Foxes are clever.', 'Hunters are fast.']],
    ['A village paints over every new mural because it is different, until all the walls are grey.', 'Shutting out new ideas makes a community poorer.', ['Grey paint is cheap.', 'Murals take a long time.']],
    ['A wolf pack leaves its slowest member behind, then gets lost in the snow without her keen nose.', 'Every member of a group has something to offer.', ['Wolves live in packs.', 'Snow hides tracks.']]];
  var DEVICES = [['foreshadowing', 'an early hint about what will happen later'], ['symbolism', 'an object or image that stands for a bigger idea'], ['allegory', 'a whole story that stands for a lesson about real life']];
  function allegory(lv) {
    var a = R.pick(ALLEG);
    return Q.one('This story is an <b>allegory</b>. What lesson does it stand for?', a[1], a[2].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(a[0]), prompt: 'What could the characters stand for in real life?',
      hint: 'In an allegory, the whole story stands for a lesson about real life, not a fact about animals or things.', explain: W.web(a[1], [a[0]]), meta: { k: 'g7-allegory', s: a[0] } });
  }
  function allegoryRiver() {
    var t = T.river;
    return Q.one('This fable is an <b>allegory</b>. What bigger idea does it stand for?', t.allegory[0], t.allegory.slice(1), { fig: T.show(t), prompt: 'What could the two villages and the river stand for in real life?',
      hint: 'In an allegory, the whole story stands for a lesson about real life.', explain: t.allegory[0], meta: { k: 'g7-allegory-river' } });
  }
  function allegoryTf() {
    var a = R.pick(ALLEG), right = R.int(0, 1) === 1, said = right ? a[1] : R.pick(a[2]);
    return { q: Q.name() + ' says the lesson of this allegory is: <b>' + said + '</b>', fig: W.sent(a[0]), type: 'tf', answer: right,
      why: { options: ['It is a lesson about real life.', 'It is only a fact on the surface of the story.'], answer: right ? 0 : 1 }, hint: 'A lesson is true outside the story too.',
      explain: W.web(a[1], [a[0]]), meta: { k: 'g7-allegory-tf', s: a[0], said: said } };
  }
  /* any example from the three lists, and the device it shows */
  function examples() { return FORE.map(function (f) { return [f[0], 'foreshadowing']; }).concat(SYMB.map(function (s) { return [s[0], 'symbolism']; }), ALLEG.map(function (a) { return [a[0], 'allegory']; })); }
  function deviceName(lv) {
    var d = R.pick(examples());
    return Q.tiles('Which literary device is this?', d[1], DEVICES.map(function (x) { return x[0]; }).filter(function (x) { return x !== d[1]; }).slice(0, lv > 1 ? 2 : 1), { fig: W.sent(d[0]),
      hint: 'A hint about later? An object that stands for an idea? A whole story with a lesson?', explain: '<b>' + d[1] + '</b>: ' + DEVICES.filter(function (x) { return x[0] === d[1]; })[0][1], meta: { k: 'g7-device-name', s: d[0] } });
  }
  function deviceMatch() {
    return { q: 'Match each device to what it is.', type: 'match', pairs: R.shuffle(DEVICES).map(function (d) { return [d[0], d[1]]; }), hint: 'Think of an example of each.', explain: 'Writers use devices to build meaning.', meta: { k: 'g7-device-match' } };
  }

  /* ---------- local inferences (C3.2): from the passages' infer lists ---------- */
  function inferOf(lv) { var t = R.pick(T.list('infer', lv)); return [t, R.pick(t.infer)]; }
  function local(lv) {
    var p = inferOf(lv), t = p[0], f = p[1];
    return Q.one(f[0], f[1], [f[2]], { fig: hl(T.show(t), f[3]), prompt: 'The text does not say it. What do the marked words suggest?',
      hint: 'Use the clue words and what you know about people.', explain: W.chain([f[3], f[1]], ['The text says', 'So I infer']), meta: { k: 'g7-local', t: t.title, q: f[0] } });
  }
  function inferLine(lv) {
    var p = inferOf(lv), t = p[0], f = p[1], right = t.lines[at(t, f[3])];
    return Q.one('<b>' + f[0] + '</b> You infer: <b>' + f[1] + '</b>. Which sentence is your evidence?', right, R.some(T.body(t).filter(function (l) { return l !== right; }), lv > 1 ? 3 : 2), {
      fig: T.show(t), hint: 'Find the words that suggest it.', explain: W.chain([f[3], f[1]], ['The text says', 'So I infer']), meta: { k: 'g7-infer-line', t: t.title, q: f[0] } });
  }
  function inferTap(lv) {
    var p = inferOf(lv), t = p[0], f = p[1], i = at(t, f[3]);
    return { q: '<b>' + f[0] + '</b> You infer: <b>' + f[1] + '</b>. Tap your evidence.', type: 'tap', pic: T.show(t, null, { tap: true }), answer: String(i), answerText: t.lines[i],
      prompt: 'Which sentence would you point to?', hint: 'Find the words that suggest it, even if they do not say it.', explain: W.chain([f[3], f[1]], ['The text says', 'So I infer']), meta: { k: 'g7-infer-tap', t: t.title, q: f[0] } };
  }
  function inferTf(lv) {
    var p = inferOf(lv), t = p[0], f = p[1], right = R.int(0, 1) === 1, said = right ? f[1] : f[2];
    return { q: f[0] + '<br>' + Q.name() + ' infers: <b>' + said + '</b>', fig: hl(T.show(t), f[3]), type: 'tf', answer: right,
      why: { options: ['The marked words suggest it.', 'The marked words suggest something else.'], answer: right ? 0 : 1 }, hint: 'What do the marked words suggest?',
      explain: W.chain([f[3], f[1]], ['The text says', 'So I infer']), meta: { k: 'g7-infer-tf', t: t.title, q: f[0], said: said } };
  }

  /* ---------- the message of a whole text (C3.2): passages with a theme, and short stories in brief ---------- */
  var THEMES = [['Lena is afraid to sing, so she practises in the barn every night. At the concert her voice shakes, but she finishes, and the crowd stands.', 'Courage means doing something even when you are afraid.', ['Barns are good places to sing.', 'Lena sings at a concert.']],
    ['Tomas laughs at the new boy' + AP + 's lunch. A week later, Tomas moves to a new town, and no one will sit with him.', 'Treat others the way you want to be treated.', ['Lunches should be the same.', 'Tomas moves to a new town.']],
    ['Hana wins the science fair by copying her sister' + AP + 's old project. The trophy sits on her shelf, but she cannot look at it.', 'A win without honesty feels empty.', ['Science fairs are hard.', 'Hana keeps her trophy on a shelf.']],
    ['Two neighbours argue about a fence for years. When a storm knocks it down, they rebuild it together and become friends.', 'A shared problem can bring people together.', ['Fences need repairs.', 'A storm knocks down a fence.']],
    ['Kofi' + AP + 's grandmother teaches him to fish through the ice. Years later, he teaches his own daughter on the same lake.', 'Knowledge passed down connects generations.', ['Ice fishing is fun.', 'Kofi has a daughter.']],
    ['Isla saves for a year to buy the newest phone. A month later, a newer one comes out, and hers feels old.', 'Chasing new things does not bring lasting happiness.', ['Phones are expensive.', 'Isla saves for a year.']],
    ['The team' + AP + 's best player is injured, so the quiet players on the bench step up and win the final.', 'Everyone has strengths that can show in hard times.', ['Injuries happen in sports.', 'The team wins the final.']],
    ['Rafi pretends to love hockey to fit in with his cousins, until he tells them he loves painting, and they ask to see his work.', 'Being true to yourself lets others know the real you.', ['Hockey is popular.', 'Rafi likes painting.']]];
  function theme(lv) {
    var t = R.pick(T.list('theme', lv));
    return Q.one('What is the story <b>really</b> about? Pick the theme.', t.theme[0], t.theme.slice(1, lv > 1 ? 3 : 2), { fig: T.show(t), prompt: 'Think about the whole story, especially the ending.',
      hint: 'A theme is a message about life, not a detail from the story.', explain: W.web(t.theme[0], [t.main[1]]), meta: { k: 'g7-theme', t: t.title } });
  }
  function themeBrief(lv) {
    var s = R.pick(THEMES);
    return Q.one('What is the <b>theme</b> of this story?', s[1], s[2].slice(0, lv > 1 ? 2 : 1), { fig: W.passage('', s[0].split('. ').map(function (x, i, a) { return i < a.length - 1 ? x + '.' : x; })),
      prompt: 'What does the character learn, or what does the ending show?', hint: 'A theme is true outside the story too.', explain: s[1], meta: { k: 'g7-theme-brief', s: s[0] } });
  }
  function themeTf() {
    var s = R.pick(THEMES), right = R.int(0, 1) === 1, said = right ? s[1] : s[2][1];
    return { q: Q.name() + ' says the theme is: <b>' + said + '</b>', fig: W.passage('', [s[0]]), type: 'tf', answer: right,
      why: { options: ['It is a message about life.', 'It only retells what happens.'], answer: right ? 0 : 1 }, hint: 'Is it true outside the story too?',
      explain: 'The theme: ' + s[1], meta: { k: 'g7-theme-tf', s: s[0], said: said } };
  }
  function themeOrPlot() {
    var t = R.pick(T.list('theme'));
    return Q.one('Which one is a <b>theme</b>, not a detail of the plot?', t.theme[0], [t.main[1]], { fig: T.show(t), hint: 'A detail happens in the story. A theme is a lesson for anyone.',
      explain: W.web(t.theme[0], [t.main[1]]), meta: { k: 'g7-theme-or-plot', t: t.title } });
  }

  /* ---------- synthesize sources (C3.3): [source A, source B, the conclusion both support, conclusions they do not] ---------- */
  var SYN = [['A school survey: 70% of students say the halls are too noisy.', 'A study: short quiet breaks help students focus.', 'A quiet space could help many students at this school focus.', ['Every student wants more noise.', 'The study was done at this school.']],
    ['Winter roads now stay open for about six weeks, down from ten.', 'Flying supplies in costs several times more than trucking them.', 'Shorter winter road seasons are raising the cost of supplies.', ['Winter roads are open longer.', 'Trucks cost more than planes.']],
    ['Monarch butterflies lay their eggs only on milkweed.', 'Milkweed is disappearing from many fields in Ontario.', 'Losing milkweed could mean fewer monarchs.', ['Monarchs eat only flowers in fields.', 'Milkweed grows only in cities.']],
    ['The library' + AP + 's after-school club has a waiting list of 40 students.', 'The library is closed on Thursdays because it is short of staff.', 'Opening on Thursdays could let more students join the club.', ['The library has too many staff.', 'No students want the club.']],
    ['Lake trout need cold, deep water to survive.', 'The deep water in Lake Simcoe is getting warmer each decade.', 'Lake trout in Lake Simcoe may be at risk.', ['Lake trout like warm water.', 'Lake Simcoe is getting colder.']],
    ['Students who sleep 9 hours score higher on memory tests.', 'Most students in our class sleep about 7 hours on school nights.', 'More sleep could help many students in our class remember more.', ['Our class sleeps too much.', 'Memory tests are unfair.']],
    ['Bike lanes on Queen Street opened in May.', 'Bike counts on Queen Street doubled between April and August.', 'The new bike lanes may have encouraged more people to cycle.', ['Cars were banned from Queen Street.', 'Fewer people cycle in summer.']],
    ['Most plastic bags in Canada are used once and thrown away.', 'Plastic bags can take hundreds of years to break down.', 'Single-use bags add waste that lasts a very long time.', ['Plastic bags break down in a week.', 'Canadians reuse every bag.']]];
  function sources(s) { return W.passage('Source A', [s[0]]) + W.passage('Source B', [s[1]]); }
  function synthesize(lv) {
    var s = R.pick(SYN);
    return Q.one('Put the two sources together. Which conclusion do <b>both</b> support?', s[2], s[3].slice(0, lv > 1 ? 2 : 1), { fig: sources(s),
      prompt: 'What do you learn from A? From B? What do they add up to?', hint: 'A good synthesis uses both sources and goes no further than they allow.', explain: W.chain(['A', 'B', s[2]], ['', '+', '=']), meta: { k: 'g7-synthesize', a: s[0] } });
  }
  function synTf() {
    var s = R.pick(SYN), said = R.pick([s[2], s[2], s[3][0], s[3][1]]), right = said === s[2];
    return { q: Q.name() + ' puts the sources together: <b>' + said + '</b>', fig: sources(s), type: 'tf', answer: right,
      why: { options: ['Both sources back it up.', 'The sources do not support it.'], answer: right ? 0 : 1 }, hint: 'Check it against A, then against B.',
      explain: 'Both support: ' + s[2], meta: { k: 'g7-syn-tf', a: s[0], said: said } };
  }
  function synNeeds(lv) {
    var s = R.pick(SYN), other = others(SYN, s, lv > 1 ? 2 : 1).map(function (x) { return x[1]; });
    return Q.one('You know this: <b>' + s[0] + '</b> Which second source would let you conclude: <b>' + s[2] + '</b>?', s[1], other, {
      hint: 'Which fact joins up with the first one?', explain: sources(s), meta: { k: 'g7-syn-needs', a: s[0] } });
  }
  /* relevant information for a research question */
  var RELEVANT = [['Why are winter roads closing earlier?', ['Average winter temperatures in the north have risen.', 'Thinner ice cannot hold heavy trucks.', 'The ice now melts weeks sooner in spring.'],
      ['Some trucks are painted red.', 'Ice fishing is a popular winter sport.', 'Planes can fly at night.']],
    ['How do green roofs help cities?', ['Green roofs soak up rainwater.', 'Plants on roofs keep buildings cooler.', 'Green roofs slow the water going into storm drains.'],
      ['Toronto has a hockey team.', 'Some roofs are made of metal.', 'Parks have benches.']],
    ['Why are monarch butterflies declining?', ['Milkweed, which their caterpillars need, is disappearing.', 'The forests where they spend the winter are shrinking.', 'Some pesticides harm butterflies.'],
      ['Monarchs are orange and black.', 'Butterflies are popular in art.', 'Some people collect stamps.']]];
  function relevant() {
    var r = R.pick(RELEVANT);
    return Q.all('Your question: <b>' + r[0] + '</b> Pick every <b>relevant</b> fact.', R.some(r[1], 2), R.some(r[2], 2), {
      hint: 'Does it help answer the question?', explain: 'Relevant facts help answer the question directly.', meta: { k: 'g7-relevant-info', r: r[0] } });
  }

  /* ---------- positions on a topic (C3.6): the opinion passages, and short ones [text, position, other position, wrong] ---------- */
  var VIEWS = [['Our town should build a skatepark. Some say it will be noisy, but it would be beside the arena, far from homes.', 'The town should build a skatepark.', 'A skatepark will be noisy.', 'The arena should close.'],
    ['Teachers should turn on captions for every video. Some think captions distract, but they help students who are Deaf or hard of hearing, and many others too.', 'Videos in class should have captions.', 'Captions are distracting.', 'Videos should be banned.'],
    ['Phones should be put away during class. Some argue phones help with research, but the school already has laptops for that.', 'Phones should be put away during class.', 'Phones help with research.', 'Laptops should be taken away.'],
    ['The cafeteria should offer halal and vegetarian meals every day. Some say it would cost more, but more students would buy lunch.', 'The cafeteria should offer halal and vegetarian meals.', 'It would cost more.', 'The cafeteria should close.'],
    ['Our school should build a ramp to the stage. Some say students can be helped up the steps, but everyone deserves to reach the stage on their own.', 'The school should build a ramp to the stage.', 'Students can be helped up the steps.', 'The stage should be removed.'],
    ['More Ontario schools should teach Indigenous languages. Some ask if there are enough teachers, but communities are already training new ones.', 'More schools should teach Indigenous languages.', 'There are not enough teachers.', 'Only French should be taught.'],
    ['Recess should be longer. Some worry it takes time from lessons, but active breaks help students focus afterward.', 'Recess should be longer.', 'It takes time from lessons.', 'Lessons should be shorter.'],
    ['The town should keep the old trees in the park. Some say people need a parking lot there, but a bus stops right beside the park.', 'The town should keep the old trees.', 'People need a parking lot.', 'The bus should stop running.']];
  /* a text and its view, from a passage or a short text */
  function viewOf() {
    var ps = T.list('view'), i = R.int(0, ps.length + VIEWS.length - 1);
    if (i < ps.length) { var t = ps[i]; return { fig: T.show(t), pos: t.view.position, other: t.view.other, wrong: t.view.wrong, id: t.title }; }
    var v = VIEWS[i - ps.length]; return { fig: W.passage('', v[0].split(/(?<=\.) /)), pos: v[1], other: v[2], wrong: [v[3]], id: v[0] };
  }
  function position() {
    var v = viewOf();
    return Q.one('What is the writer' + AP + 's <b>position</b>?', v.pos, [v.other].concat(v.wrong.slice(0, 1)), { fig: v.fig, hint: 'What does the writer want to happen?',
      explain: W.chain([v.pos, v.other], ['Writer', 'Other side']), meta: { k: 'g7-position', id: v.id } });
  }
  function otherSide() {
    var v = viewOf();
    return Q.one('Which <b>other position</b> does the writer mention, then answer?', v.other, [v.pos].concat(v.wrong.slice(0, 1)), { fig: v.fig, hint: 'Look for ' + Q1 + 'Some say' + Q2 + ' or ' + Q1 + 'Some worry' + Q2 + '.',
      explain: W.chain([v.pos, v.other], ['Writer', 'Other side']), meta: { k: 'g7-other-side', id: v.id } });
  }
  function viewTf() {
    var v = viewOf(), right = R.int(0, 1) === 1, said = right ? v.pos : v.other;
    return { q: Q.name() + ' says the writer' + AP + 's position is: <b>' + said + '</b>', fig: v.fig, type: 'tf', answer: right,
      why: { options: ['That is what the writer argues for.', 'That is the other side, which the writer answers.'], answer: right ? 0 : 1 }, hint: 'Which view does the writer argue against?',
      explain: W.chain([v.pos, v.other], ['Writer', 'Other side']), meta: { k: 'g7-view-tf', id: v.id, said: said } };
  }
  function message() {
    var t = R.pick(T.list('topic'));
    var MSG = { 'Our School Needs a Quiet Room': 'It shows how one small change can help students who struggle with noise feel they belong.', 'Our School Needs a Late Bus': 'It shows that a ride home lets every student, wherever they live, join in.' };
    var right = MSG[t.title], wrong = Object.keys(MSG).filter(function (k) { return k !== t.title; }).map(function (k) { return MSG[k]; }).concat(['It says that clubs should be cancelled.']);
    return Q.one('How does this text address <b>' + t.topic + '</b>?', right, wrong, { fig: T.show(t), hint: 'Look at who is left out now, and the last lines.', explain: right, meta: { k: 'g7-message', t: t.title } });
  }

  /* ---------- bias (C3.5): [loaded sentence, the loaded words, a neutral version] ---------- */
  var BIAS = [['The greedy developers want to destroy our beautiful park.', 'greedy, destroy', 'A company plans to build homes on part of the park.'],
    ['Lazy teenagers waste hours on their phones.', 'Lazy, waste', 'Many teenagers spend several hours a day on their phones.'],
    ['The brilliant new mayor finally fixed the city' + AP + 's terrible roads.', 'brilliant, finally, terrible', 'The new mayor repaired several city roads this year.'],
    ['Only a fool would vote against the new arena.', 'Only a fool', 'Some voters support the new arena, and some oppose it.'],
    ['The ridiculous new rule ruins lunch for everyone.', 'ridiculous, ruins', 'A new rule changes when students can eat lunch.'],
    ['Heroic volunteers rescued the helpless ducks from the filthy pond.', 'Heroic, helpless, filthy', 'Volunteers moved ducks from a polluted pond.'],
    ['The so-called experts wrote yet another useless report.', 'so-called, useless', 'A group of scientists released a new report.'],
    ['Reckless drivers race through our school zone.', 'Reckless, race', 'Some drivers go faster than the limit in our school zone.'],
    ['Our amazing team crushed the hopeless visitors.', 'amazing, crushed, hopeless', 'Our team won the game against the visitors.'],
    ['The outrageous ticket prices are a total rip-off.', 'outrageous, rip-off', 'Tickets cost more than they did last year.']];
  function neutral(lv) {
    var b = R.pick(BIAS), other = R.pick(others(BIAS, b, 1));
    return Q.one('Which sentence is the most <b>neutral</b> (least biased)?', b[2], [b[0]].concat(lv > 1 ? [other[0]] : []), { prompt: 'Look for words that show strong feelings or insults.',
      hint: 'Neutral writing reports facts without loaded words.', explain: W.sent(b[2]), meta: { k: 'g7-neutral', n: b[2] } });
  }
  function loaded(lv) {
    var b = R.pick(BIAS);
    return Q.one('Which words show <b>bias</b> in this sentence?', b[1], others(BIAS, b, lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), { fig: W.sent(b[0]),
      hint: 'Which words judge instead of describe?', explain: '<b>' + b[1] + '</b> are loaded words.', meta: { k: 'g7-loaded', s: b[0] } });
  }
  function biasTf() {
    var b = R.pick(BIAS), right = R.int(0, 1) === 1, said = right ? b[2] : b[0];
    return { q: Q.name() + ' says this sentence is <b>neutral</b>.', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['It reports facts without judging.', 'It has loaded words that judge.'], answer: right ? 0 : 1 }, hint: 'Are there words that show strong feelings?',
      explain: 'Loaded: <b>' + b[1] + '</b>. Neutral: ' + b[2], meta: { k: 'g7-bias-tf', s: said } };
  }
  var AVOID = ['Present more than one side.', 'Use neutral words.', 'Include the voices of people affected.', 'Check facts in more than one source.', 'Say clearly when something is your opinion.'];
  var NOTAVOID = ['Use only sources that agree with you.', 'Leave out facts that do not fit.', 'Use strong insults to make the point.', 'Quote only people from one side.', 'Present opinions as if they were facts.'];
  function avoidBias() {
    return Q.all('Pick every way to <b>avoid</b> bias in a text.', R.some(AVOID, 2), R.some(NOTAVOID, 2), { hint: 'Fair writing lets readers decide.', explain: AVOID.join(' '), meta: { k: 'g7-avoid-bias' } });
  }

  var tryout = T.tryout, portage = T.portage;
  Atlas.register('thinking', {
    full: true,
    lessons: [{
      id: 'devices', title: 'Literary devices', sub: 'Foreshadowing, symbolism and allegory.',
      concepts: [
        { slug: 'foreshadow', title: 'Foreshadowing hints at what is coming', exp: ['C3.1'], skill: 'foreshadow',
          model: [
            step(W.sent('I tied my left shoe twice, but <mark class="hl">the lace kept slipping loose</mark>.'), 'Early in the story.'),
            step(W.sent('On my third sprint, the loose lace whipped against my ankle.'), 'Later: the hint comes true.'),
            step(W.chain(['the lace kept slipping loose', 'The narrator stumbles.'], ['Early', 'Later']), 'The reader worries before it happens.'),
            step(W.sent(Q1 + '<mark class="hl">Clouds are building in the west</mark>,' + Q2 + ' he added.'), 'A new story. A small detail.'),
            step(W.chain(['Clouds are building in the west', 'Thunder rolled behind the hills.'], ['Early', 'Later']), 'The weather sets up the storm.')
          ],
          guided: [function () { return foreshadow(1); }, function () { return foreLater(1); }, function () { return foreTap(1); }],
          check: [function () { return foreshadow(2); }, function () { return foreWhich(2); }, foreTf, function () { return foreTap(2); }, function () { return foreLater(3); }],
          coach: '<p>When reading a novel, keep a "hint list". Check it off when a hint comes true.</p>',
          mistake: '<p>Calling any early detail foreshadowing. It must point to something that really happens later.</p>' },
        { slug: 'symbol', title: 'A symbol stands for a bigger idea', exp: ['C3.1'], skill: 'symbol',
          model: [
            step(W.sent('He gave Arjun his old brass <mark class="hl">compass</mark>.'), 'An object from someone he loves.'),
            step(W.sent('He still carried the compass, though he no longer needed to hold it.'), 'It changes as Arjun changes.'),
            step(W.means('people', 'compass = his grandfather' + AP + 's support')),
            step(W.sent(SYMB[3][0]), 'Another object, every night.'),
            step(W.means('think', 'porch light = hope that he will return'), 'Ask: what feeling stays with it?')
          ],
          guided: [function () { return symbol(1); }, symbolStory, function () { return symbolWhich(1); }],
          check: [function () { return symbol(2); }, symbolTf, symbolMatch, function () { return symbolWhich(2); }, function () { return symbol(3); }],
          coach: '<p>Ask: "Why did the writer keep mentioning this object? What changes about it, or about how the character uses it?"</p>',
          mistake: '<p>Treating every object as a symbol. Look for one that is repeated and tied to the character' + AP + 's feelings.</p>' },
        { slug: 'allegory', title: 'An allegory teaches through a whole story', exp: ['C3.1'], skill: 'allegory',
          model: [
            step(T.show(T.river, 'laughed at their clever wall'), 'Two villages, one river.'),
            step(W.chain(['villages', 'the river'], ['people, countries', 'what they share']), 'The parts stand for real things.'),
            step(W.web(T.river.allegory[0], ['wall goes up', 'both suffer', 'wall comes down']), 'The whole story carries the lesson.'),
            step(W.sent(ALLEG[2][0]), 'A new one.'),
            step(W.web(ALLEG[2][1], ['crow = anyone', 'shiny things = wanting more']), 'Not a fact about crows: a lesson for people.')
          ],
          guided: [function () { return allegory(1); }, allegoryRiver, function () { return deviceName(1); }],
          check: [function () { return allegory(2); }, allegoryTf, deviceMatch, function () { return deviceName(2); }, function () { return allegory(3); }],
          coach: '<p>Talk about real situations the story could stand for: sharing water between provinces, or sharing a room between siblings.</p>',
          mistake: '<p>Reading an allegory only on the surface ("it is about a wall"). Ask what the whole story is saying.</p>' }
      ]
    }, {
      id: 'inference', title: 'Inferences and synthesis', sub: 'Reading between the lines, and putting sources together.',
      concepts: [
        { slug: 'local', title: 'Infer from a small clue', exp: ['C3.2'], skill: 'local',
          model: [
            step(W.sent('I stumbled, caught myself and kept running, <mark class="hl">my face burning</mark>.'), 'A clue.'),
            step(W.chain(['my face burning', 'A hot face can mean shame.', 'The narrator is embarrassed.'], ['The text says', 'I know', 'So I infer']), 'Clue plus what I know.'),
            step(W.sent('Priya looked at the clock, <mark class="hl">then at her sore hands</mark>.'), 'A new text. The text never says how she feels.'),
            step(W.chain(['then at her sore hands', 'Little time, tired hands.', 'Priya is worried but keeps going.'], ['The text says', 'I know', 'So I infer']), 'Same three steps.')
          ],
          guided: [function () { return local(1); }, function () { return inferLine(1); }, function () { return inferTap(1); }],
          check: [function () { return local(2); }, function () { return inferTap(2); }, function () { return inferLine(2); }, function () { return inferTf(2); }, function () { return local(3); }],
          coach: '<p>Use the frame: "The text says... I know... So I think..."</p>',
          mistake: '<p>An inference with no clue behind it. Ask: "Which words made you think that?"</p>' },
        { slug: 'global', title: 'Infer the message of the whole text', exp: ['C3.2'], skill: 'global',
          model: [
            step(T.show(tryout), 'The whole story.'),
            step(W.sent(Q1 + 'I watch who gets back up.' + Q2), 'The ending matters most.'),
            step(W.web(tryout.theme[0], ['stumbles', 'keeps running', 'coach notices']), 'A message about life, held up by the story.'),
            step(T.show(portage), 'Another story.'),
            step(W.web(portage.theme[0], ['shares the canoe', 'shelters together']), 'True outside the story too.')
          ],
          guided: [function () { return theme(1); }, function () { return themeBrief(1); }, themeOrPlot],
          check: [function () { return theme(2); }, function () { return themeBrief(2); }, themeTf, themeOrPlot, function () { return themeBrief(3); }],
          coach: '<p>Ask: "What might the writer want us to learn about life?" Then: "Where in the story do you see that?"</p>',
          mistake: '<p>Giving the plot instead of the theme. A theme is true outside the story too.</p>' },
        { slug: 'synthesize', title: 'Put sources together to conclude', exp: ['C3.3'], skill: 'synthesize',
          model: [
            step(W.passage('Source A', [SYN[2][0]])),
            step(W.passage('Source B', [SYN[2][1]])),
            step(W.chain(['eggs only on milkweed', 'milkweed disappearing', SYN[2][2]], ['A', 'B', 'Together']), 'Neither source says it alone.'),
            step(sources(SYN[1]), 'Again, with two new facts.'),
            step(W.chain(['shorter season', 'flying costs more', SYN[1][2]], ['A', 'B', 'Together']), 'Use both, and go no further.')
          ],
          guided: [function () { return synthesize(1); }, relevant, function () { return synNeeds(1); }],
          check: [function () { return synthesize(2); }, synTf, relevant, function () { return synNeeds(2); }, function () { return synthesize(3); }],
          coach: '<p>When researching, ask the child to state what each source adds, then what they mean together.</p>',
          mistake: '<p>Summarizing each source separately and calling it a synthesis. Synthesis creates a new idea from both.</p>' }
      ]
    }, {
      id: 'perspectives', title: 'Perspectives and bias', sub: 'Whose view, and is it fair?',
      concepts: [
        { slug: 'position', title: 'Find the position and the other side', exp: ['C3.6'], skill: 'position',
          model: [
            step(T.show(T.quietRoom, 4), 'Leila argues for something.'),
            step(W.sent('Some people worry that students will skip class there.'), 'Another position.'),
            step(W.chain([T.quietRoom.view.position, T.quietRoom.view.other, 'A sign-in sheet would solve that.'], ['Writer', 'Other side', 'Answer']), 'She names it, then answers it.'),
            step(W.passage('', VIEWS[4][0].split(/(?<=\.) /)), 'A new text, about accessibility.'),
            step(W.chain([VIEWS[4][1], VIEWS[4][2]], ['Writer', 'Other side']), 'Look for ' + Q1 + 'Some say' + Q2 + '.')
          ],
          guided: [position, otherSide, message],
          check: [position, otherSide, viewTf, message, position],
          coach: '<p>For any opinion piece, list: the writer' + AP + 's position, the other position, and who is affected.</p>',
          mistake: '<p>Agreeing or disagreeing before understanding both positions.</p>' },
        { slug: 'bias', title: 'Loaded words can reveal bias', exp: ['C3.5'], skill: 'bias',
          model: [
            step(W.sent('The <mark class="hl">greedy</mark> developers want to <mark class="hl">destroy</mark> our park.'), 'Loaded words judge.'),
            step(W.sent(BIAS[0][2]), 'Neutral: the facts.'),
            step(W.sent('<mark class="hl">Heroic</mark> volunteers rescued the <mark class="hl">helpless</mark> ducks from the <mark class="hl">filthy</mark> pond.'), 'Praise can be loaded too.'),
            step(W.sent(BIAS[5][2]), 'Same event, no judging.'),
            step(W.means('people', 'Who is not heard?'), 'Missing voices are a clue too.')
          ],
          guided: [function () { return neutral(1); }, function () { return loaded(1); }, avoidBias],
          check: [function () { return neutral(2); }, function () { return loaded(2); }, biasTf, avoidBias, function () { return neutral(3); }],
          coach: '<p>Find a news story and a comment about the same event. Highlight the loaded words in each.</p>',
          mistake: '<p>Thinking only opinions are biased. A news report can be biased by what it leaves out.</p>' }
      ]
    }],
    practice: [
      { id: 'foreshadow', name: 'Foreshadowing', code: 'C3.1', gen: foreLater },
      { id: 'symbol', name: 'Symbols', code: 'C3.1', gen: symbol },
      { id: 'allegory', name: 'Allegory and devices', code: 'C3.1', gen: allegory },
      { id: 'local', name: 'Infer from a clue', code: 'C3.2', gen: local },
      { id: 'global', name: 'The theme', code: 'C3.2', gen: themeBrief },
      { id: 'synthesize', name: 'Put sources together', code: 'C3.3', gen: synthesize },
      { id: 'position', name: 'Positions on a topic', code: 'C3.6', gen: position },
      { id: 'bias', name: 'Spot bias', code: 'C3.5', gen: neutral }
    ],
    tasks: [
      { id: 'cultural', title: 'Cultural elements in a text', code: 'C3.4', pic: W.icon('people'), say: 'Find a text that shows a celebration, ritual, art form or building from a culture. What does it mean?', write: true,
        run: ['Choose a text (a story, a film, a photo essay) that shows a cultural element: a ceremony, a dance, a meal, a building, an art form. The Red River Jig and The Night Before Diwali, in this grade' + AP + 's reading, are starting points.',
          'Research what the element means to the people it belongs to, using sources from that community.', 'The child connects it to their own life and culture, and shares their interpretation with you.'],
        rubric: ['Names the element only.', 'Describes it, but not its meaning.', 'Explains its meaning and connects it to their own life.', 'Explains its meaning with sources from the community, and shares a thoughtful, respectful interpretation.'] },
      { id: 'context', title: 'History behind a First Nations, Métis or Inuit text', code: 'C3.7', pic: W.icon('read'), say: 'Read a text by a First Nations, Métis or Inuit creator. What events or times shaped it?', write: true,
        run: ['Choose a text by a First Nations, Métis or Inuit creator that responds to history (for example residential schools, treaties, or relocation), in a form suitable for Grade 7.',
          'Together, learn about the historical period or events from reliable sources, including from the creator' + AP + 's community.', 'Ask: "How did these events shape the text? How do they connect to life today?"'],
        rubric: ['Retells part of the text only.', 'Names a historical event with help.', 'Explains how history shaped the text.', 'Explains how history and current lived experience connect in the text, with care and evidence.'],
        coach: '<p>Some of this history is painful. Preview the text yourself first, and let the child set the pace. Choose works recommended for this age by Indigenous educators or librarians.</p>' },
      { id: 'thinking-skills', title: 'Which thinking skill helped most?', code: 'C3.8', pic: W.icon('star'), say: 'Look back at two texts you analyzed. Which thinking skill helped most, and why?', write: true,
        run: ['Name the skills used this unit: inferring, synthesizing, spotting bias, finding the theme, comparing perspectives.', 'The child compares two of them and explains which helped them understand most, and why.'],
        rubric: ['Cannot name a skill.', 'Names a skill without explaining.', 'Compares two skills and explains which helped.', 'Explains clearly why one skill was most effective, with examples from the texts.'] }
    ]
  });

  Q.shapes('thinking', {
    foreshadow: [[1, 'passage', foreshadow], [1, 'which', foreWhich], [2, 'tap', foreTap], [1, 'tf', foreTf]],
    symbol: [[1, 'which', symbolWhich], [1, 'story', symbolStory], [2, 'match', symbolMatch], [1, 'tf', symbolTf]],
    allegory: [[1, 'river', allegoryRiver], [1, 'device', deviceName], [2, 'match', deviceMatch], [1, 'tf', allegoryTf]],
    local: [[1, 'evidence', inferLine], [1, 'tap', inferTap], [2, 'tf', inferTf]],
    global: [[1, 'story', theme], [1, 'or-plot', themeOrPlot], [2, 'tf', themeTf]],
    synthesize: [[1, 'needs', synNeeds], [1, 'relevant', relevant], [2, 'tf', synTf]],
    position: [[1, 'other-side', otherSide], [1, 'message', message], [2, 'tf', viewTf]],
    bias: [[1, 'loaded', loaded], [2, 'avoid', avoidBias], [1, 'tf', biasTf]]
  });
})();
