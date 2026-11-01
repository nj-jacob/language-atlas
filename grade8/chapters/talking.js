/* Grade 8: listening and speaking. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 8, B1 Oral and Non-Verbal Communication:
   B1.1 effective listening skills: paraphrasing, open-ended questions, relevant responses, reflecting
   B1.2 listening strategies; analyze information given orally and non-verbally; seek clarification; identify relevant evidence
   B1.3 purpose and audience in formal and informal contexts; adapt speaking strategies
   B1.4 oral and non-verbal strategies, and how their use may vary across cultures
   B1.5 precise, descriptive and subject-specific words, and cohesive sentences
   The computer checks the knowing parts. Speaking and listening themselves are activities with a grown-up, marked with a rubric.
   All sentences are written for this site. Answer checks: tests/verify/grade8-talking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';
  function lvQ(lv, three) { return three[Math.min(Math.max(lv || 1, 1), 3) - 1]; }
  function words(s) { return s.replace(/[.,]/g, '').split(' '); }

  /* [what someone says, a fair paraphrase, two that change the meaning] */
  var SAID = [
    ['We should hold the fundraiser in March, because people have more time after the holidays.', 'You think March is better because people are less busy then.', ['You think the fundraiser should be cancelled.', 'You think the holidays are the best time to raise money.']],
    ['The new bike lanes are safer, but they make the street too narrow for buses.', 'So the lanes help cyclists but cause problems for buses.', ['So the bike lanes should be removed right away.', 'So buses are faster now.']],
    ['I liked the novel, although the ending felt rushed.', 'You enjoyed it overall, but wanted a slower ending.', ['You did not like the novel at all.', 'You thought the ending was the best part.']],
    ['Our group needs one more source, preferably a recent one.', 'So we still need a source, ideally a new one.', ['So we have enough sources already.', 'So any old source will do.']],
    ['The arena should open earlier on Saturdays so younger players can practise before the public skate.', 'You want earlier Saturday hours so young players get ice time first.', ['You want the public skate cancelled.', 'You think younger players practise too much.']],
    ['I would join the robotics club, but it meets on the same night as my guitar lesson.', 'So you are interested, but the timing clashes with guitar.', ['So you are not interested in robotics.', 'So you want to quit guitar.']],
    ['The documentary was interesting, but it only showed one side of the pipeline debate.', 'You found it interesting but felt it was one-sided.', ['You thought the documentary was boring.', 'You think the pipeline should be built.']],
    ['If we split the poster into sections, each of us can finish our part by Thursday.', 'So dividing the work lets everyone finish by Thursday.', ['So the poster is already finished.', 'So one person should make the whole poster.']],
    ['My grandfather says the lake freezes later every year than when he was a boy.', 'So he has noticed the ice forming later over the years.', ['So the lake no longer freezes at all.', 'So your grandfather likes skating on the lake.']],
    ['The bus is usually on time, except when it snows heavily.', 'So the bus is reliable unless there is a big snowfall.', ['So the bus is always late.', 'So the bus does not run in winter.']],
    ['I think the school should plant trees along the field, since there is no shade at recess.', 'You want trees by the field to give shade at recess.', ['You want the field turned into a parking lot.', 'You think recess should be indoors.']],
    ['The volunteers sorted twice as much food this year, mostly because more students signed up.', 'So more student helpers meant much more food was sorted.', ['So less food was donated this year.', 'So the students did not help.']],
    ['Learning Cree from my aunt is slow, but I can already greet people and count to ten.', 'So progress is slow, but you have learned some basics.', ['So you have given up on learning Cree.', 'So you speak Cree fluently.']],
    ['Our soccer team lost, but we played much better in the second half.', 'So you lost, but your play improved after halftime.', ['So your team won the game.', 'So you played badly the whole game.']],
    ['The museum is free on Wednesday evenings, which is when most families visit.', 'So the free Wednesday evenings draw the most families.', ['So the museum is closed on Wednesdays.', 'So families never visit the museum.']]];
  function copied(s) { return 'You said, "' + s[0] + '"'; }

  /* [a closed question, an open question about the same thing] */
  var TURN = [['Did you like the book?', 'What did you like most about the book?'], ['Is the plan finished?', 'How could we improve the plan?'], ['Was the trip long?', 'What happened on the trip?'],
    ['Do you agree with Sam?', 'Why do you agree or disagree with Sam?'], ['Are you done with the experiment?', 'What surprised you in the experiment?'], ['Did the character lie?', 'Why do you think the character lied?'],
    ['Is the new park good?', 'How has the new park changed the neighbourhood?'], ['Was the game exciting?', 'What was the most exciting moment of the game?'], ['Do you want to change the ending?', 'How would you change the ending?'],
    ['Did you enjoy the powwow?', 'What did you notice at the powwow?'], ['Is recycling important?', 'Why is recycling important to you?'], ['Was the test hard?', 'What made the test feel hard?'],
    ['Do you like the new schedule?', 'How does the new schedule affect your day?'], ['Can we finish by Friday?', 'What do we need to finish by Friday?'], ['Did the speaker convince you?', 'What part of the speech convinced you most?']];
  var OPEN = TURN.map(function (t) { return t[1]; }), CLOSED = TURN.map(function (t) { return t[0]; });

  /* [something said that is not clear, a question that asks about that exact part] */
  var UNCLEAR = [['Meet at the usual spot after the thing.', 'What do you mean by "the thing"?'], ['The project is due soon, maybe next week.', 'Could you tell us the exact due date?'],
    ['The new rule is fair, mostly.', 'When you say "mostly", which part is not fair?'], ['Bring the stuff for the lab.', 'What do you mean by "the stuff"?'],
    ['The council voted for a sustainable plan.', 'What do you mean by "sustainable"?'], ['The trail is closed in some places.', 'Could you explain which parts are closed?'],
    ['Practice is moved to Tuesday, or was it Thursday?', 'Do you mean Tuesday or Thursday?'], ['That idea would never work here.', 'Could you explain why it would not work?'],
    ['The ferry might be late because of the weather.', 'Do you mean the ferry could be cancelled?'], ['We need a few more volunteers.', 'Could you tell us how many more you need?'],
    ['The results were pretty significant.', 'What do you mean by "significant"?'], ['Our class can take the bus, or maybe walk.', 'Could you tell us how we will decide?'],
    ['The author uses a lot of symbolism.', 'Can you give an example of the symbolism?'], ['The recipe calls for a pinch of something.', 'Could you tell us which spice it is?'],
    ['The game was postponed for reasons.', 'Could you explain the reasons?']];
  var NOCLARIFY = ['That sounds great.', 'I already knew that.', 'Okay, whatever you think.', 'Let' + AP + 's change the subject.', 'Sure, I will figure it out.', 'Cool.',
    'Never mind.', 'That is a terrible idea.', 'My favourite colour is green.', 'Nobody cares about that.', 'Yes, totally.', 'I will just guess.'];

  /* [a claim a speaker makes, the evidence for it, two details that are not evidence] */
  var EVID = [
    ['The library should stay open late.', 'Last year, the library had more than 12 000 visits after 6 p.m.', ['I really, really think it should stay open.', 'The library has a blue front door.']],
    ['The rooftop garden helps the school.', 'The classrooms below the garden stay 3 degrees cooler in June.', ['Gardens are just the best.', 'The roof was built in 1985.']],
    ['Winter roads are open for fewer weeks.', 'This year the ice road opened for 6 weeks, down from 10 a decade ago.', ['Everyone knows winters are different now.', 'Ice roads are fun to drive on.']],
    ['Our school should start later.', 'A study of 9 000 students found that later starts improved attendance.', ['Mornings are the worst.', 'The school bell is very loud.']],
    ['Cycling to school is growing.', 'The bike racks were full 4 days a week this spring, up from 1 last year.', ['Bikes are better than cars.', 'My bike is red.']],
    ['The food drive was a success.', 'We collected 1 200 kilograms of food, twice our goal.', ['It was a success, no question.', 'The boxes were brown.']],
    ['Recess should be longer.', 'Our survey found that 8 out of 10 students want more time outside.', ['Recess is my favourite part of the day.', 'The field has two soccer nets.']],
    ['The new crosswalk made the street safer.', 'There were no collisions at the corner in the six months after it was built.', ['The crosswalk looks very nice.', 'The street is named after a maple tree.']],
    ['Reading every day builds vocabulary.', 'Students who read 20 minutes a day meet about 1 800 000 words a year.', ['Reading is better than watching TV.', 'My favourite author lives in Vancouver.']],
    ['The river is cleaner than it was.', 'Salmon now spawn in a stretch where none were seen for 30 years.', ['The river looks pretty in the fall.', 'People should care more about rivers.']],
    ['Our team needs a second goalie.', 'Our only goalie played every minute of all 14 games this season.', ['Goalies wear the coolest gear.', 'The rink opens at 7 a.m.']],
    ['The community garden brings neighbours together.', 'Forty families now share the plots, and many say they met there.', ['Gardens are relaxing.', 'Tomatoes need lots of sun.']],
    ['Phones distract students in class.', 'In our class trial, quiz scores rose 15 percent in the week phones were put away.', ['Phones are annoying.', 'My phone has a cracked screen.']],
    ['The play was a hit.', 'All three shows sold out, and 200 people joined the waiting list.', ['The play was amazing, honestly.', 'The costumes were made of cotton.']],
    ['The tree planting helped the park.', 'The 150 new trees now shade the playground on hot afternoons.', ['Trees are very important.', 'The park has a new sign.']]];

  /* [situation, formal or informal] */
  var SITU = [['presenting to the school board', 'formal'], ['a job interview at a garden centre', 'formal'], ['a speech at a Remembrance Day assembly', 'formal'],
    ['asking the principal for a new club', 'formal'], ['welcoming guests at a graduation', 'formal'], ['a debate in front of judges', 'formal'],
    ['thanking an Elder who visited your class', 'formal'], ['reading the morning announcements', 'formal'],
    ['chatting with a friend at lunch', 'informal'], ['a group chat with your teammates', 'informal'], ['telling your cousin about a movie', 'informal'],
    ['planning a sleepover with friends', 'informal'], ['joking with your brother at dinner', 'informal'], ['texting a friend about homework', 'informal'],
    ['talking with teammates on the bus', 'informal'], ['telling a friend about your weekend', 'informal']];
  var FORMAL = ['Good evening. Thank you for the chance to speak today.', 'I would like to explain why this proposal matters.', 'Thank you for your time and attention.',
    'Good morning, everyone. My name is Priya, and I am here to share our plan.', 'It is an honour to speak with you today.', 'I appreciate the opportunity to answer your questions.',
    'Allow me to begin with a short story.', 'Today I will present three reasons for this change.', 'Thank you for welcoming us this afternoon.', 'I am grateful to be here and to learn from you.'];
  var INFORMAL = ['Hey, so basically here' + AP + 's the thing.', 'Okay, you' + AP + 're gonna love this.', 'Anyway, that' + AP + 's it, I guess.', 'Dude, guess what happened.',
    'So yeah, it was kinda wild.', 'Hey, what' + AP + 's up?', 'Wanna hear something funny?', 'Okay, so like, listen to this.', 'Ugh, you will not believe it.', 'Lol, that was so random.'];
  function situOf(s) { return s[1] === 'formal' ? FORMAL : INFORMAL; }
  function otherOf(s) { return s[1] === 'formal' ? INFORMAL : FORMAL; }

  /* [body language, what it often shows] */
  var BODY = [['leaning forward', 'interest'], ['nodding', 'agreement or following along'], ['arms crossed tightly', 'discomfort or disagreement'], ['checking a phone', 'not paying attention'],
    ['an open, relaxed stance', 'confidence'], ['frowning', 'confusion or concern'], ['tapping a foot', 'impatience'], ['raising a hand', 'wanting a turn to speak'],
    ['pausing before a key point', 'emphasis on what comes next'], ['counting points on fingers', 'ideas in order'], ['looking away often', 'distraction or shyness'], ['a warm smile', 'friendliness']];
  /* [a statement about body language and culture, true or false] */
  var CULTURE = [['Body language can mean different things in different cultures.', true], ['In some cultures, looking down while an Elder speaks shows respect.', true],
    ['How close people stand when talking varies from place to place.', true], ['A gesture that is friendly in one country can be rude in another.', true],
    ['Some people show they are listening by staying quiet and still.', true], ['Pausing before you answer can show that you are thinking carefully.', true],
    ['Asking someone about their customs is a respectful way to learn.', true], ['A nod can mean yes in some places and no in others.', true],
    ['Direct eye contact means the same thing in every culture.', false], ['A thumbs-up is a friendly sign everywhere in the world.', false],
    ['People who avoid eye contact are always being rude.', false], ['Every culture uses the same hand gestures.', false], ['Silence in a conversation always means someone is bored.', false],
    ['Standing close to someone is polite everywhere.', false], ['All people show interest by nodding.', false], ['Body language always means the same thing.', false]];

  /* [vague, precise, the vague word] */
  var PRECISE = [['This thing inside cells makes energy.', 'The mitochondria in the cell release energy.', 'thing'], ['It went up a bunch.', 'The temperature rose by 12 degrees.', 'bunch'],
    ['The guy in charge back then signed it.', 'Sir John A. Macdonald, the first prime minister, signed it.', 'guy'], ['Plant stuff happens in the leaves.', 'Photosynthesis happens in the leaves.', 'stuff'],
    ['We put the stuff together.', 'We assembled the circuit.', 'stuff'], ['Lava poured out of the thing on top.', 'The lava poured out of the crater.', 'thing'],
    ['Add those things to water and stir.', 'Add the salt and sugar to the water and stir.', 'things'], ['The treaty was about land and stuff.', 'The treaty set out how the land would be shared.', 'stuff'],
    ['The guy who wrote it was from Montreal.', 'The playwright Michel Tremblay was from Montreal.', 'guy'], ['Put that thing on a slide.', 'Place a drop of pond water on the slide.', 'thing'],
    ['The storm did something to our power lines.', 'The storm snapped the power lines.', 'something'], ['A beaver built a thing across the creek.', 'The beaver built a dam across the creek.', 'thing'],
    ['Water turns into stuff when it boils.', 'Water turns into steam when it boils.', 'stuff'], ['The magnet does something to paper clips.', 'The magnet attracts the paper clips.', 'something'],
    ['Mix the chemicals in a glass thing.', 'Mix the chemicals in the beaker.', 'thing']];
  /* [first sentence, the linking words, the second sentence] */
  var LINK = [['Recycling saves resources.', 'In addition', 'it keeps waste out of landfills.'], ['The plan is costly.', 'However', 'it would help hundreds of students.'],
    ['The pipes froze overnight.', 'As a result', 'the school closed for the day.'], ['Mix the dry ingredients.', 'Next', 'add the milk slowly.'],
    ['Many animals adapt to winter.', 'For example', 'snowshoe hares turn white.'], ['The trail is short.', 'However', 'it is very steep.'],
    ['Heavy rain fell for days.', 'As a result', 'the river overflowed.'], ['First, measure the board.', 'Next', 'cut it along the line.'],
    ['Volunteers cleaned the shoreline.', 'In addition', 'they planted native grasses.'], ['Some birds migrate long distances.', 'For example', 'Arctic terns fly from pole to pole.'],
    ['The bridge was old.', 'As a result', 'trucks had to take another road.'], ['Phones can be useful in class.', 'However', 'they can also distract us.'],
    ['Our club raises money for the shelter.', 'In addition', 'we collect blankets.'], ['Boil the water.', 'Next', 'pour it over the tea leaves.'],
    ['Canada has many official symbols.', 'For example', 'the beaver is a national symbol.']];
  var LINKWORDS = ['In addition', 'However', 'As a result', 'Next', 'For example'];
  function linked(l, b) { return l[0] + ' ' + (b ? '<b>' + l[1] + '</b>' : l[1]) + ', ' + l[2]; }

  function tf(q, fig, answer, why, more) {
    var o = { q: q, fig: fig, type: 'tf', answer: answer, why: { options: why, answer: 0 } };
    Object.keys(more).forEach(function (k) { o[k] = more[k]; });
    return o;
  }

  /* ---------- paraphrase ---------- */
  function paraphrase(lv) {
    var s = R.pick(SAID);
    return Q.one(lvQ(lv, ['Which is the best <b>paraphrase</b>?', 'Which keeps the speaker' + AP + 's meaning?', 'Which shows you understood?']), s[1],
      s[2].slice(0, lv > 1 ? 2 : 1).concat(lv > 2 ? [copied(s)] : []), { fig: W.means('talk', s[0]),
      prompt: 'Same meaning, your own words.', hint: 'A paraphrase keeps the speaker' + AP + 's meaning but uses different words.', explain: s[1], meta: { k: 'g8-paraphrase', s: s[0] } });
  }
  function paraTf() {
    var s = R.pick(SAID), shown = R.int(0, 1) ? s[1] : R.pick(s[2]);
    return tf('Is this a fair <b>paraphrase</b>?', W.means('talk', s[0]) + W.means('think', shown), shown === s[1],
      ['A fair paraphrase keeps the meaning in new words.', 'Any reply on the same topic is a paraphrase.'],
      { hint: 'Does it say the same thing?', explain: s[1], meta: { k: 'g8-para-tf', s: s[0], shown: shown } });
  }
  function paraProblem() {
    var s = R.pick(SAID), shown = R.pick([s[1], copied(s), s[2][0], s[2][1]]),
      right = shown === s[1] ? 'It is a fair paraphrase.' : shown === copied(s) ? 'It copies the words exactly.' : 'It changes the meaning.';
    return Q.one('How good is this paraphrase?', right, ['It is a fair paraphrase.', 'It copies the words exactly.', 'It changes the meaning.'].filter(function (x) { return x !== right; }), {
      fig: W.means('talk', s[0]) + W.means('think', shown), hint: 'Same meaning? Own words?', explain: W.means('think', s[1]), meta: { k: 'g8-para-problem', s: s[0], shown: shown } });
  }
  function paraMatch() {
    return { q: 'Match what was said to its paraphrase.', type: 'match', pairs: R.some(SAID, 3).map(function (s) { return [s[0], s[1]]; }),
      hint: 'Find the reply with the same meaning.', explain: 'A paraphrase keeps the meaning and changes the words.', meta: { k: 'g8-para-match' } };
  }

  /* ---------- open questions ---------- */
  function openQ(lv) {
    return Q.one(lvQ(lv, ['Which question is <b>open-ended</b>?', 'Which question invites a longer answer?', 'Which question would keep a discussion going?']), R.pick(OPEN), R.some(CLOSED, lv > 1 ? 3 : 2), {
      hint: 'An open-ended question cannot be answered with yes or no.', explain: 'Open questions start with what, how or why, and invite a longer answer.', meta: { k: 'g8-open' } });
  }
  function pickOpen(lv) {
    return Q.all('Pick every <b>open-ended</b> question.', R.some(OPEN, 2), R.some(CLOSED, lv > 1 ? 3 : 2), { hint: 'Could someone answer it with just yes or no?', explain: 'Open questions keep a discussion going.', meta: { k: 'g8-pick-open' } });
  }
  function openTf() {
    var s = R.pick(R.int(0, 1) ? OPEN : CLOSED);
    return tf('Is this question <b>open-ended</b>?', W.sent(s), OPEN.indexOf(s) >= 0, ['Open questions cannot be answered with just yes or no.', 'Every question is open-ended.'],
      { hint: 'Could the answer be just yes or no?', explain: 'What, how and why invite longer answers.', meta: { k: 'g8-open-tf', s: s } });
  }
  function turnOpen(lv) {
    var t = R.pick(TURN), others = R.some(TURN.filter(function (x) { return x !== t; }), 2);
    return Q.one(lv > 1 ? 'Which open question asks about the same thing?' : 'Turn it into an <b>open</b> question.', t[1], [others[0][0], others[1][1]], {
      fig: W.sent(t[0]), hint: 'Open, and about the same thing.', explain: W.sent(t[0]) + ' ' + W.sent('<b>' + t[1] + '</b>'), meta: { k: 'g8-open-turn', s: t[0] } });
  }

  /* ---------- clarify and evidence ---------- */
  function clarify(lv) {
    var u = R.pick(UNCLEAR);
    return Q.one(lvQ(lv, ['Which reply <b>asks for clarification</b>?', 'You did not understand. What do you say?', 'Which reply checks the speaker' + AP + 's meaning?']), u[1], R.some(NOCLARIFY, lv > 1 ? 3 : 2), {
      fig: W.means('talk', u[0]), hint: 'Ask about the part you did not understand.', explain: 'A clarifying question checks the speaker' + AP + 's meaning.', meta: { k: 'g8-clarify', s: u[0] } });
  }
  function clarifyTf() {
    var u = R.pick(UNCLEAR), shown = R.int(0, 1) ? u[1] : R.pick(NOCLARIFY);
    return tf('Does this reply <b>ask for clarification</b>?', W.means('talk', u[0]) + W.means('think', shown), shown === u[1],
      ['A clarifying question asks about the exact part that was unclear.', 'Any polite reply asks for clarification.'],
      { hint: 'Does it ask about the unclear part?', explain: W.sent(u[1]), meta: { k: 'g8-clarify-tf', shown: shown } });
  }
  function evidence(lv) {
    var e = R.pick(EVID), other = R.pick(EVID.filter(function (x) { return x !== e; }));
    return Q.one(lvQ(lv, ['Which detail is <b>evidence</b> for the claim?', 'Which detail makes the claim believable?', 'Which detail best supports this claim?']), e[1],
      e[2].slice(0, lv > 1 ? 2 : 1).concat(lv > 2 ? [other[1]] : []), { fig: W.means('talk', e[0]),
      hint: 'Evidence is a fact or number that backs up the claim.', explain: W.sent(e[1]), meta: { k: 'g8-evidence-talk', claim: e[0] } });
  }
  function evidenceTf() {
    var e = R.pick(EVID), shown = R.int(0, 1) ? e[1] : R.pick(e[2]);
    return tf('Is this detail <b>evidence</b> for the claim?', W.means('talk', e[0]) + W.sent(shown), shown === e[1],
      ['Evidence is a fact that backs up the claim.', 'Saying the claim louder makes it evidence.'],
      { hint: 'Is it a fact about the claim, or just an opinion?', explain: W.sent(e[1]), meta: { k: 'g8-evidence-tf', claim: e[0], shown: shown } });
  }

  /* ---------- audience ---------- */
  function register(lv) {
    var s = R.pick(SITU);
    return Q.one('You are <b>' + s[0] + '</b>. Which opening fits?', R.pick(situOf(s)), R.some(otherOf(s), lv > 1 ? 2 : 1), { prompt: 'Formal or informal?',
      hint: 'Formal: complete sentences, no slang. Informal: relaxed, like talking to a friend.', explain: 'This situation is <b>' + s[1] + '</b>.', meta: { k: 'g8-register', sit: s[0] } });
  }
  function formalOrNot(lv) {
    var s = R.pick(SITU);
    return Q.tiles(lv > 1 ? 'Which style fits <b>' + s[0] + '</b>?' : 'Is a formal or an informal style best for <b>' + s[0] + '</b>?', s[1], [s[1] === 'formal' ? 'informal' : 'formal'], {
      hint: 'Who is listening? How well do you know them?', explain: s[1] + '.', meta: { k: 'g8-formal', sit: s[0] } });
  }
  function registerTf() {
    var s = R.pick(SITU), line = R.int(0, 1) ? R.pick(situOf(s)) : R.pick(otherOf(s));
    return tf('Does this line fit?', W.means('people', s[0]) + W.sent(line), situOf(s).indexOf(line) >= 0, ['The style must match who is listening.', 'Any style works anywhere.'],
      { hint: 'Formal or informal situation? Formal or informal line?', explain: 'This situation is <b>' + s[1] + '</b>.', meta: { k: 'g8-register-tf', sit: s[0], s: line } });
  }
  function pickFormal(lv) {
    return Q.all('Pick every line that suits a <b>formal</b> talk.', R.some(FORMAL, 2), R.some(INFORMAL, lv > 1 ? 3 : 2), { hint: 'No slang, complete sentences.',
      explain: 'Formal lines are polite and complete.', meta: { k: 'g8-pick-formal' } });
  }

  /* ---------- body language ---------- */
  function body(lv) {
    var b = R.pick(BODY);
    return Q.one(lvQ(lv, ['A listener is <b>' + b[0] + '</b>. What does it often show?', 'Someone in the audience is <b>' + b[0] + '</b>. What might it show?', 'In a discussion, a classmate is <b>' + b[0] + '</b>. What might it mean?']),
      b[1], R.some(BODY.filter(function (x) { return x !== b; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), { fig: W.icon('people'),
      hint: 'Picture the body language.', explain: b[0] + ' often shows ' + b[1] + '. Meanings can differ across cultures.', meta: { k: 'g8-body', b: b[0] } });
  }
  function bodySignal(lv) {
    var b = R.pick(BODY);
    return Q.one(lvQ(lv, ['Which body language often shows <b>' + b[1] + '</b>?', 'Which signal might mean <b>' + b[1] + '</b>?', 'You notice <b>' + b[1] + '</b>. What might you see?']),
      b[0], R.some(BODY.filter(function (x) { return x !== b; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), { fig: W.icon('people'),
      hint: 'Picture each one.', explain: b[0] + ' often shows ' + b[1] + '.', meta: { k: 'g8-body-signal', mean: b[1] } });
  }
  function bodyMatch() {
    return { q: 'Match each signal to what it often shows.', type: 'match', pairs: R.some(BODY, 3).map(function (b) { return [b[0], b[1]]; }),
      hint: 'Picture each one.', explain: 'Meanings can differ across cultures, so check before you assume.', meta: { k: 'g8-body-match' } };
  }
  function cultureTf(lv) {
    var c = R.pick(CULTURE);
    return tf(lv > 1 ? 'Is this statement true?' : 'True or false?', W.sent(c[0]), c[1], ['Non-verbal signals are learned in a culture, so their meanings vary.', 'Every gesture has one meaning worldwide.'],
      { hint: 'Are gestures learned, or the same for everyone?', explain: 'Non-verbal signals vary across cultures. Watch, ask, and do not assume.', meta: { k: 'g8-culture', s: c[0] } });
  }

  /* ---------- precise words and links ---------- */
  function precise(lv) {
    var p = R.pick(PRECISE), other = R.pick(PRECISE.filter(function (x) { return x !== p; }));
    return Q.one(lvQ(lv, ['Which sentence is <b>more precise</b>?', 'Which sentence uses exact words?', 'Which sentence would a scientist or historian say?']), p[1], [p[0]].concat(lv > 1 ? [other[0]] : []), {
      hint: 'Precise words name exactly what you mean: no "thing" or "stuff".', explain: W.sent(p[1]), meta: { k: 'g8-precise' } });
  }
  function preciseTf() {
    var p = R.pick(PRECISE), shown = R.int(0, 1) ? p[1] : p[0];
    return tf('Is this sentence <b>precise</b>?', W.sent(shown), shown === p[1], ['Precise words name exactly what you mean.', 'Short sentences are always precise.'],
      { hint: 'Look for thing, stuff or guy.', explain: W.sent(p[1]), meta: { k: 'g8-precise-tf', s: shown } });
  }
  function tapVague() {
    var p = R.pick(PRECISE), ws = words(p[0]);
    return { q: 'Tap the <b>vague</b> word.', type: 'tap', tiles: ws, answer: ws.indexOf(p[2]), prompt: 'Which word does not say exactly what it means?',
      hint: 'Thing? Stuff? Guy?', explain: W.sent(p[1]), meta: { k: 'g8-tap-vague' } };
  }
  function link(lv) {
    var l = R.pick(LINK);
    return Q.tiles(lv > 1 ? 'Which linking words show how the ideas connect?' : 'Which linking words make the talk flow?', l[1], R.some(LINKWORDS.filter(function (w) { return w !== l[1]; }), 2), {
      fig: W.sent(l[0] + ' ' + W.gap() + ', ' + l[2]), hint: 'Adding, contrasting, a result, an example, or a next step?', explain: W.sent(linked(l, true)), meta: { k: 'g8-link', s: l[0] } });
  }

  var S0 = SAID[2], S1 = SAID[13], T0 = TURN[0], T1 = TURN[5], U0 = UNCLEAR[4], E0 = EVID[0], P0 = PRECISE[0], P1 = PRECISE[11];
  Atlas.register('talking', {
    full: true,
    lessons: [{
      id: 'listening', title: 'Listening well', sub: 'Paraphrase, ask, clarify and listen for evidence.',
      concepts: [
        { slug: 'paraphrase', title: 'Paraphrase to show you understood', exp: ['B1.1'], skill: 'paraphrase',
          model: [
            step(W.means('talk', S0[0])),
            step(W.means('think', S0[1]), 'Same meaning. My own words.'),
            step(W.means('not', S0[2][0]), 'That changes the meaning.'),
            step(W.means('talk', S1[0])),
            step(W.means('think', S1[1]), 'Both parts kept.')
          ],
          guided: [function () { return paraphrase(1); }, paraTf, paraProblem],
          check: [function () { return paraphrase(2); }, paraTf, paraMatch, paraProblem, function () { return paraphrase(3); }],
          coach: '<p>In discussions, ask the child to start a reply with "So you are saying…" before giving their own view.</p>',
          mistake: '<p>Repeating the speaker word for word, or slipping in your own opinion.</p>' },
        { slug: 'open', title: 'Open questions keep a talk going', exp: ['B1.1'], skill: 'questions',
          model: [
            step(W.sent(T0[0]), 'Yes or no. The talk stops.'),
            step(W.sent(T0[1]), 'Now there is more to say.'),
            step(W.tile('What') + ' ' + W.tile('How') + ' ' + W.tile('Why'), 'Good starting words.'),
            step(W.sent(T1[0]), 'Closed.'),
            step(W.sent(T1[1]), 'Open: same topic.')
          ],
          guided: [function () { return openQ(1); }, openTf, function () { return turnOpen(1); }],
          check: [function () { return openQ(2); }, openTf, function () { return pickOpen(2); }, function () { return turnOpen(2); }, function () { return openQ(3); }],
          coach: '<p>Turn closed questions into open ones together: "Did you like it?" becomes "What did you like about it?"</p>',
          mistake: '<p>Asking questions that already contain the answer.</p>' },
        { slug: 'clarify', title: 'Ask to clarify, and listen for evidence', exp: ['B1.2'], skill: 'clarify',
          model: [
            step(W.means('talk', U0[0]), 'Not sure what one word means?'),
            step(W.means('think', U0[1]), 'Ask about that exact word.'),
            step(W.means('talk', E0[0]), 'A claim.'),
            step(W.sent(E0[1]), 'A fact that backs it up: evidence.'),
            step(W.means('not', E0[2][0]), 'Only an opinion.')
          ],
          guided: [function () { return clarify(1); }, clarifyTf, function () { return evidence(1); }],
          check: [function () { return clarify(2); }, function () { return evidence(2); }, clarifyTf, evidenceTf, function () { return evidence(3); }],
          coach: '<p>While listening to a podcast or news clip, have the child jot down one claim and one piece of evidence for it.</p>',
          mistake: '<p>Nodding along without understanding. A clarifying question is a strength, not a weakness.</p>' }
      ]
    }, {
      id: 'speaking', title: 'Speaking for an audience', sub: 'Style, body language and precise words.',
      concepts: [
        { slug: 'audience', title: 'Formal or informal: fit the audience', exp: ['B1.3'], skill: 'audience',
          model: [
            step(W.means('people', SITU[0][0]), FORMAL[0]),
            step(W.means('talk', SITU[8][0]), INFORMAL[0]),
            step(W.icon('think'), 'Ask: who is listening, and why?'),
            step(W.means('people', SITU[6][0]), FORMAL[9]),
            step(W.means('talk', SITU[10][0]), INFORMAL[1])
          ],
          guided: [function () { return register(1); }, formalOrNot, registerTf],
          check: [function () { return register(2); }, function () { return formalOrNot(2); }, registerTf, function () { return pickFormal(2); }, function () { return register(2); }],
          coach: '<p>Before any talk, decide the purpose (inform, persuade, entertain) and the audience. Both shape every choice.</p>',
          mistake: '<p>Slang and filler words ("like", "basically") in a formal talk.</p>' },
        { slug: 'body', title: 'Body language speaks too', exp: ['B1.4'], skill: 'body-language',
          model: [
            step(W.icon('people'), 'Leaning forward: interest.'),
            step(W.icon('people'), 'Arms crossed tightly: possible disagreement.'),
            step(W.icon('talk'), 'A pause before a key point: emphasis.'),
            step(W.icon('think'), 'Looking down while an Elder speaks: respect, in some cultures.'),
            step(W.icon('people'), 'Not sure? Ask. Do not assume.')
          ],
          guided: [function () { return body(1); }, cultureTf, function () { return bodySignal(1); }],
          check: [function () { return body(2); }, function () { return cultureTf(2); }, bodyMatch, function () { return bodySignal(2); }, function () { return body(3); }],
          coach: '<p>Watch a short video with the sound off. What do faces and gestures tell you? Then talk about how customs differ, for example eye contact with Elders.</p>',
          mistake: '<p>Judging someone as rude because their culture uses different signals.</p>' },
        { slug: 'precise', title: 'Precise words, smooth links', exp: ['B1.5'], skill: 'precise',
          model: [
            step(W.sent(P0[0]), 'Vague: what thing?'),
            step(W.sent(P0[1]), 'The subject' + AP + 's own word.'),
            step(W.sent(P1[0]) + ' ' + W.sent(P1[1]), 'Name it exactly.'),
            step(W.sent(LINK[2][0] + ' ' + W.gap() + ', ' + LINK[2][2]), 'How do these connect?'),
            step(W.sent(linked(LINK[2], true)), 'A result.')
          ],
          guided: [function () { return precise(1); }, tapVague, function () { return link(1); }],
          check: [function () { return precise(2); }, preciseTf, function () { return link(2); }, tapVague, function () { return precise(3); }],
          coach: '<p>Ban "thing" and "stuff" for one talk. Each time, the child must name it exactly.</p>',
          mistake: '<p>A string of ideas joined only with "and then".</p>' }
      ]
    }],
    practice: [
      { id: 'paraphrase', name: 'Paraphrasing', code: 'B1.1', gen: paraphrase },
      { id: 'questions', name: 'Open-ended questions', code: 'B1.1', gen: openQ },
      { id: 'clarify', name: 'Clarifying and listening for evidence', code: 'B1.2', gen: clarify },
      { id: 'audience', name: 'Formal and informal speaking', code: 'B1.3', gen: register },
      { id: 'body-language', name: 'Body language', code: 'B1.4', gen: body },
      { id: 'precise', name: 'Precise words and linking words', code: 'B1.5', gen: precise }
    ],
    tasks: [
      { id: 'discussion', title: 'A real discussion', code: 'B1.1', pic: W.icon('people'), say: 'Discuss a question. Paraphrase before you reply, and ask one open question.',
        run: ['Choose a question with two sides, for example: "Should phones be allowed at lunch?"', 'Before each reply, the child paraphrases what you said ("So you think…").', 'They ask at least one open question, then reflect: "What changed in your thinking?"'],
        rubric: ['Interrupts or replies off topic.', 'Paraphrases with prompting; mostly closed questions.', 'Paraphrases accurately, asks an open question, and stays on topic.', 'Builds on others' + '’' + ' ideas, asks probing questions, and reflects on what changed.'] },
      { id: 'podcast', title: 'Listen for evidence', code: 'B1.2', pic: W.icon('listen'), say: 'Listen to a short podcast or news clip. Note one claim and its evidence.', write: true,
        run: ['Choose a short podcast or news clip for young people (3 to 5 minutes).', 'Before: predict what it will say. During: note one claim and the evidence for it. After: ask one clarifying question about anything unclear.', 'Talk about any tone of voice or pauses that changed the meaning.'],
        rubric: ['Recalls little.', 'Names the topic and a detail.', 'Identifies a claim and relevant evidence.', 'Identifies claims and evidence, notes tone, and asks a sharp clarifying question.'] },
      { id: 'formal-talk', title: 'A two-minute formal talk', code: 'B1.3', pic: W.icon('talk'), say: 'Give a two-minute talk to persuade an audience.',
        run: ['The child chooses a real audience (a school council, a club) and a purpose (to persuade).', 'They plan an opening, three points with evidence, and a closing.', 'They present standing up, without slang, adapting if the audience looks confused.'],
        rubric: ['Hard to follow; informal throughout.', 'Some structure; style slips into informal.', 'Clear purpose and structure, in a style that suits the audience.', 'Confident and persuasive; adapts to the audience as they go.'] },
      { id: 'nonverbal', title: 'Body language across cultures', code: 'B1.4', pic: W.icon('people'), say: 'Watch people speak. What do their gestures show? Ask how customs differ.',
        run: ['Watch two short speeches or interviews. Note gestures, eye contact, posture and pauses.', 'Ask: "How did these help or distract?"', 'Talk with a family member or friend about how eye contact or gestures are used in their culture or in another culture you know.'],
        rubric: ['Notices little.', 'Names some gestures.', 'Explains how non-verbal strategies helped or hurt, and notes one cultural difference.', 'Compares strategies thoughtfully and explains how meaning changes across cultures.'] },
      { id: 'explain-it', title: 'Explain it precisely', code: 'B1.5', pic: W.icon('think'), say: 'Explain something from science or history to a younger child, using exact words.',
        run: ['The child picks a process from another subject (how a bill becomes law, how a volcano erupts).', 'They explain it in order, using the subject' + '’' + 's own words and linking words like first, as a result, however.', 'You ask one question; they answer precisely.'],
        rubric: ['Vague words; ideas jumbled.', 'Some precise words; few links.', 'Precise subject words in clear, linked sentences.', 'Precise and vivid; adjusts words so a younger listener understands.'] }
    ]
  });

  Q.shapes('talking', {
    paraphrase: [[1, 'true-false', paraTf], [1, 'how-good', paraProblem], [2, 'match', paraMatch]],
    questions: [[1, 'true-false', openTf], [1, 'turn-open', turnOpen], [2, 'pick', pickOpen]],
    clarify: [[1, 'true-false', clarifyTf], [1, 'evidence', evidence], [2, 'evidence-true-false', evidenceTf]],
    audience: [[1, 'style', formalOrNot], [1, 'true-false', registerTf], [2, 'pick', pickFormal]],
    'body-language': [[1, 'signal', bodySignal], [1, 'culture', cultureTf], [2, 'match', bodyMatch]],
    precise: [[1, 'true-false', preciseTf], [1, 'tap', tapVague], [1, 'link', link]]
  });
})();
