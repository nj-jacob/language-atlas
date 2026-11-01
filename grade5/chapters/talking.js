/* Grade 5: listening and speaking. A full chapter: every idea has two worked examples, three questions together and five on
   your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 5, B1 Oral and Non-Verbal Communication:
   B1.1 effective listening: expressing interest at appropriate times, asking questions to encourage a speaker to elaborate, and responding to
        the contributions of others in group discussions                 B1.2 listening strategies before, during and after listening, including the purpose of a text
   B1.3 purpose and audience for speaking, using paraphrasing and restating   B1.4 oral and non-verbal strategies, and how they help communicate meaning
   B1.5 word choice, including new vocabulary, varied adjectives and adverbs to elaborate, and a variety of sentence types
   The computer checks knowing what to do. Listening and speaking themselves are activities with a grown-up, marked with a rubric.
   Answer checks: tests/verify/grade5-talking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var RQ = '’';
  /* [what a classmate said, a question that invites them to say more, a yes-or-no question, a question about something else] */
  var ELAB = [['I went to Manitoulin Island this summer.', 'What was your favourite part of the trip?', 'Was it hot?', 'Do you like pizza?'],
    ['I built a robot for the science fair.', 'How did you get it to move?', 'Is it big?', 'Where is the gym?'],
    ['My grandmother taught me to bead.', 'What was the hardest part to learn?', 'Is it fun?', 'Can I borrow a pencil?'],
    ['Our team lost the final game.', 'What happened in the last period?', 'Was it sad?', 'Is it recess yet?'],
    ['I read a book about the Arctic.', 'What surprised you most about it?', 'Was it long?', 'Do you have a dog?'],
    ['We adopted a puppy last week.', 'How has the puppy changed your mornings?', 'Is it cute?', 'Did you finish the math?'],
    ['I started learning the guitar.', 'Why did you choose the guitar?', 'Is it hard?', 'Are you going to the dance?'],
    ['My family went ice fishing.', 'What did you do while you waited for a bite?', 'Was it cold?', 'Do you like hockey?'],
    ['I made a short film with my cousin.', 'How did you decide what it would be about?', 'Was it good?', 'Is lunch at noon?'],
    ['We planted a garden at school.', 'Why did the class pick those plants?', 'Is it sunny there?', 'Can we go outside?'],
    ['I visited my aunt in Whitehorse.', 'What is life like there in winter?', 'Was it far?', 'Do you like soup?'],
    ['I learned to make dumplings.', 'How do you fold them so they stay closed?', 'Were they good?', 'Is it Friday?']];
  /* showing interest at the right time, and moves that only seem to */
  var INTEREST = ['Nodding while a speaker talks', 'Smiling at a funny part', 'Looking at the speaker', 'Saying "Wow!" when the speaker pauses', 'Asking a question when they finish',
    'Leaning in a little', 'Turning to face the speaker', 'Saying "Tell me more" at the end'];
  var NOT_INTEREST = ['Calling out in the middle of a speaker' + RQ + 's sentence', 'Looking at a tablet while they talk', 'Starting your own story before they finish', 'Yawning loudly',
    'Whispering to a friend while they speak', 'Finishing their sentences for them', 'Playing with a pencil the whole time', 'Walking away while they talk'];
  /* responses in a group discussion: [what you say, the move it makes] */
  var MOVES = [['I agree with Mia, because I saw that too.', 'agree'], ['I agree with Sam that recess is too short.', 'agree'], ['Like Noor said, the bus is often late.', 'agree'],
    ['Adding to what Omar said, the park also needs benches.', 'add on'], ['To build on that, we could plant trees as well.', 'add on'], ['Another reason for that is the long line at lunch.', 'add on'],
    ['I see it a bit differently. Here is why.', 'disagree politely'], ['I respect that idea, but I think the gym is a better place.', 'disagree politely'], ['That is a good point, but what about the cost?', 'disagree politely'],
    ['Can you say more about that idea?', 'ask for more'], ['What made you think of that?', 'ask for more'], ['Could you give an example?', 'ask for more']];
  var MOVE_KINDS = ['agree', 'add on', 'disagree politely', 'ask for more'];
  var BUILD_BAD = ['That is a silly idea.', 'Talk over Mia to give my idea first.', 'Change the topic to my weekend.', 'Stay silent the whole time.', 'Laugh at Omar' + RQ + 's answer.',
    'Repeat my own idea louder.', 'Say "Whatever" and look away.', 'Interrupt to say "No, you' + RQ + 're wrong."'];
  /* [a classmate's idea, a reply that builds on it, a reply about something else, a rude reply] */
  var REPLY = [['We should have a reading corner in our class.', 'Adding to that, we could ask families to donate books.', 'My cousin has a new bike.', 'Reading is boring.'],
    ['The school needs more recycling bins.', 'I agree, because the bins by the gym are always full.', 'When is the field trip?', 'Nobody cares about bins.'],
    ['Our class should raise money for the animal shelter.', 'Could you say more about how we would raise it?', 'I like pizza day.', 'That will never work.'],
    ['Recess should be longer in the spring.', 'I see it a bit differently, because we might lose class time.', 'My shoes are new.', 'That is a dumb idea.'],
    ['We could start a chess club at lunch.', 'To build on that, older students could teach the younger ones.', 'Did you watch the game?', 'Chess is for babies.'],
    ['The library should stay open after school.', 'I agree, because some kids have nowhere quiet to read at home.', 'What is for lunch?', 'Who would even go?']];
  var PURPOSES = ['to give directions', 'to persuade', 'to inform', 'to entertain'];
  var SAID = [['Turn left at the library, then walk two blocks.', 0], ['Stir the soup, then turn the heat down low.', 0], ['You should all vote for a longer recess. It helps us learn!', 1],
    ['Please sign our petition to save the old oak tree.', 1], ['Loons can dive deeper than a ten-storey building is tall.', 2], ['The CN Tower opened in 1976.', 2],
    ['So there I was, stuck in a snowbank, with a pizza on my head!', 3], ['Want to hear about the day my hamster escaped into the piano?', 3],
    ['First, plug in the tablet. Next, hold the button for three seconds.', 0], ['Line up at the door, then walk quietly to the gym.', 0],
    ['Everyone should bring a reusable bottle. It is better for the planet!', 1], ['Choose me for class rep, and I will listen to every idea.', 1],
    ['Beavers can hold their breath for about 15 minutes.', 2], ['Nunavut became a territory in 1999.', 2],
    ['My little brother tried to feed his cereal to the goldfish!', 3], ['You will not believe what my cat did with my sock.', 3]];
  /* [what was said, a paraphrase in new words, a version that changes the meaning] */
  var PARA = [['The field trip is cancelled because of the storm warning.', 'We are not going on the trip, since a storm is coming.', 'The field trip is moving to the museum.'],
    ['Please hand in your permission forms by Friday.', 'Your forms are due at the end of the week.', 'You can bring the forms whenever you like.'],
    ['Wetlands soak up rain, so they help prevent floods.', 'Because wetlands hold water, there are fewer floods.', 'Wetlands cause floods when it rains.'],
    ['The library will be closed on Monday for repairs.', 'On Monday the library is shut while it is being fixed.', 'The library is open late on Monday.'],
    ['Bring a water bottle, because the hike is long and hot.', 'The hike will be hot and long, so pack water.', 'The hike is short, so no water is needed.'],
    ['The concert starts at seven, so arrive by a quarter to.', 'Get there 15 minutes early, because the show begins at seven.', 'The concert starts at a quarter to seven.'],
    ['Wash your hands before you help with the cooking.', 'Clean hands first, then you can help cook.', 'You can cook now and wash your hands later.'],
    ['Bears are most active at dawn and dusk.', 'You are most likely to see bears early and late in the day.', 'Bears sleep all day and all night.'],
    ['The new rink opens next month, and skating will be free.', 'Next month you can skate at the new rink for no cost.', 'The new rink is closing next month.'],
    ['Only two people may use the computers at a time.', 'No more than two can be at the computers at once.', 'Everyone may use the computers together.']];
  /* [who you are speaking to, what fits, what does not fit] */
  var AUD = [['the school council', 'Good afternoon. Today I will explain why we need more recycling bins.', 'Hey, so, bins. We need more.'],
    ['a museum guide', 'Excuse me, could you tell us where the dinosaur exhibit is?', 'Where are the dinos?'],
    ['your best friend at lunch', 'Want to trade half my sandwich for your apple?', 'I wish to propose an exchange of food items.'],
    ['an Elder visiting the class', 'Thank you for sharing your teachings with us today.', 'Thanks, that was cool, bye.'],
    ['your little cousin', 'Let' + RQ + 's build a fort with the couch cushions!', 'I recommend that we construct a shelter.'],
    ['the principal', 'Good morning. May I ask a question about the new schedule?', 'Yo, what is up with the schedule?'],
    ['your teammate during a game', 'Pass! I am open!', 'Excuse me, would you kindly consider passing the ball to me?']];
  /* [a move, what it tells the other person, whether it helps a speaker's message] */
  var BODY = [['leaning in', 'I am interested.', true], ['steady eye contact', 'I am listening to you.', true], ['crossed arms', 'I am closed off.', false], ['a slow nod', 'I understand.', true],
    ['looking at the floor', 'I am not confident.', false], ['an open palm', 'I welcome your idea.', true], ['a warm smile', 'I am friendly.', true], ['shrugging your shoulders', 'I am not sure.', false],
    ['tapping your foot', 'I am impatient.', false], ['a thumbs up', 'Good job.', true], ['turning away', 'I am not interested.', false], ['hands on hips', 'I am annoyed.', false]];
  /* [plain, with vivid adjectives and adverbs, the adjective, the adverb, a noun] */
  var VIVID = [['The dog ran.', 'The muddy dog raced wildly across the yard.', 'muddy', 'wildly', 'dog'], ['The girl sang.', 'The nervous girl sang softly into the microphone.', 'nervous', 'softly', 'girl'],
    ['The wind blew.', 'The icy wind howled fiercely all night.', 'icy', 'fiercely', 'wind'], ['We ate dinner.', 'We hungrily ate Grandma' + RQ + 's spicy jollof rice.', 'spicy', 'hungrily', 'rice'],
    ['The car went up the hill.', 'The rusty car rattled slowly up the steep hill.', 'rusty', 'slowly', 'car'], ['The baby slept.', 'The tiny baby slept peacefully in her crib.', 'tiny', 'peacefully', 'baby'],
    ['The boy opened the gift.', 'The excited boy eagerly tore open the shiny gift.', 'shiny', 'eagerly', 'gift'], ['The river moved.', 'The wide river flowed gently past the village.', 'wide', 'gently', 'river'],
    ['The team played.', 'The tired team played bravely until the final whistle.', 'tired', 'bravely', 'team'], ['The fire burned.', 'The crackling fire burned brightly in the cold night.', 'crackling', 'brightly', 'fire'],
    ['The cat climbed the tree.', 'The curious cat climbed quickly up the tall pine.', 'curious', 'quickly', 'cat'], ['The bell rang.', 'The loud bell rang suddenly in the quiet hall.', 'loud', 'suddenly', 'bell']];

  /* ---------- invite more ---------- */
  function elaborate(lv) {
    var e = R.pick(ELAB);
    return Q.one('A classmate says this. Which question invites them to <b>say more</b>?', e[1], [e[2]].concat(lv > 1 ? [e[3]] : []), { fig: W.means('talk', e[0]),
      prompt: 'Which question cannot be answered with just yes or no?', hint: 'Questions that start with what, how or why invite more.', explain: W.means('talk', e[1]), meta: { k: 'g5-elaborate', said: e[0] } });
  }
  function interestTf(lv) {
    var right = R.int(0, 1) === 1, said = R.pick(right ? INTEREST : NOT_INTEREST) + ' shows interest.';
    return { q: Q.name() + ' says:', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['It shows interest without stopping the speaker.', 'It stops or ignores the speaker.'], answer: right ? 0 : 1 },
      hint: 'Does it let the speaker keep going?', explain: 'Show interest at the right times: nod, smile, then speak at a pause.', meta: { k: 'g5-interest-tf', said: said } };
  }
  function openOrNot(lv) {
    var e = R.pick(ELAB), open = R.int(0, 1) === 1, qn = open ? e[1] : e[2];
    return { q: 'Does this question invite the speaker to <b>say more</b>?', fig: W.means('talk', e[0]) + W.sent(qn), type: 'tap', tiles: ['Yes: it needs a longer answer.', 'No: yes or no will do.'], answer: open ? 0 : 1,
      prompt: 'Could they answer with one word?', hint: 'Could they answer with one word?', explain: W.means('talk', e[1]), meta: { k: 'g5-open-or-not', qn: qn } };
  }
  function pickOpen(lv) {
    var es = R.some(ELAB, 4);
    return Q.all('Pick every question that invites someone to <b>say more</b>.', es.slice(0, 2).map(function (e) { return e[1]; }), es.slice(2, lv > 1 ? 4 : 3).map(function (e) { return e[2]; }), {
      hint: 'What, how and why questions need longer answers.', explain: 'Open questions keep people talking.', meta: { k: 'g5-pick-open' } });
  }

  /* ---------- build on ideas ---------- */
  function buildOn(lv) {
    return Q.all('In a group discussion, pick every good way to <b>respond to others</b>.', R.some(MOVES, 2).map(function (m) { return m[0]; }), R.some(BUILD_BAD, lv > 1 ? 3 : 2), {
      hint: 'Good responses link to what someone said.', explain: 'Agree, add on, disagree politely, or ask for more.', meta: { k: 'g5-build-on' } });
  }
  function whichMove(lv) {
    var m = R.pick(MOVES);
    return Q.tiles('What is this speaker doing?', m[1], R.some(MOVE_KINDS.filter(function (k) { return k !== m[1]; }), lv > 1 ? 3 : 2), { fig: W.means('talk', m[0]),
      prompt: 'Agree, add on, disagree politely, or ask for more?', hint: 'Look at how it starts.', explain: 'This speaker is <b>' + m[1] + '</b>.', meta: { k: 'g5-which-move', said: m[0] } });
  }
  function bestReply(lv) {
    var r = R.pick(REPLY);
    return Q.one('A classmate says this. Which reply <b>builds on</b> the idea?', r[1], [r[2]].concat(lv > 1 ? [r[3]] : []), { fig: W.means('talk', r[0]),
      prompt: 'Which reply uses the classmate' + RQ + 's idea?', hint: 'A good reply links to what was just said.', explain: W.means('people', r[1]), meta: { k: 'g5-best-reply', idea: r[0] } });
  }
  function buildTf(lv) {
    var good = R.int(0, 1) === 1, said = good ? R.pick(MOVES)[0] : R.pick(BUILD_BAD);
    return { q: Q.name() + ' does this in a group discussion. Does it build on what others say?', fig: W.sent(said), type: 'tf', answer: good,
      why: { options: ['It links to someone' + RQ + 's idea, kindly.', 'It ignores or puts down someone' + RQ + 's idea.'], answer: good ? 0 : 1 },
      hint: 'Does it link to someone else' + RQ + 's idea?', explain: 'Agree, add on, disagree politely, or ask for more.', meta: { k: 'g5-build-tf', said: said } };
  }

  /* ---------- listen for the purpose ---------- */
  function purpose(lv) {
    var s = R.pick(SAID);
    return Q.tiles('Why is the speaker saying this?', PURPOSES[s[1]], R.some(PURPOSES.filter(function (p, i) { return i !== s[1]; }), lv > 1 ? 3 : 2), { fig: W.means('listen', s[0]),
      prompt: 'Steps? An opinion? Facts? A story for fun?', hint: 'Steps? An opinion? Facts? A story for fun?', explain: 'It is <b>' + PURPOSES[s[1]] + '</b>.', meta: { k: 'g5-listen-purpose', said: s[0] } });
  }
  function whichSaid(lv) {
    var i = R.int(0, 3), right = R.pick(SAID.filter(function (s) { return s[1] === i; })), seen = {};
    var wrong = R.shuffle(SAID.filter(function (s) { return s[1] !== i; })).filter(function (s) { if (seen[s[1]]) return false; seen[s[1]] = 1; return true; }).slice(0, lv > 1 ? 3 : 2);
    return Q.one('Which one is meant <b>' + PURPOSES[i] + '</b>?', right[0], wrong.map(function (s) { return s[0]; }), { prompt: 'Why would someone say each one?',
      hint: 'Steps give directions; opinions persuade; facts inform; funny stories entertain.', explain: W.means('listen', right[0]), meta: { k: 'g5-which-said', p: PURPOSES[i] } });
  }
  function purposeTf(lv) {
    var s = R.pick(SAID), right = R.int(0, 1) === 1, said = right ? PURPOSES[s[1]] : R.pick(PURPOSES.filter(function (p, i) { return i !== s[1]; }));
    return { q: Q.name() + ' says the speaker is talking <b>' + said + '</b>.', fig: W.means('listen', s[0]), type: 'tf', answer: right,
      hint: 'Steps? An opinion? Facts? A story for fun?', explain: 'It is <b>' + PURPOSES[s[1]] + '</b>.', meta: { k: 'g5-purpose-said-tf', said: s[0], p: said } };
  }
  function matchPurpose(lv) {
    var ps = R.some([0, 1, 2, 3], lv > 1 ? 4 : 3);
    return { q: 'Match what was said to why it was said.', type: 'match', pairs: ps.map(function (i) { return [R.pick(SAID.filter(function (s) { return s[1] === i; }))[0], PURPOSES[i]]; }),
      hint: 'Steps, an opinion, facts, or a story for fun?', explain: 'Knowing the purpose helps you listen.', meta: { k: 'g5-match-listen-purpose' } };
  }

  /* ---------- paraphrase ---------- */
  function paraphrase(lv) {
    var p = R.pick(PARA);
    return Q.one('Which is the best <b>paraphrase</b>?', p[1], [p[2]].concat(lv > 1 ? [p[0]] : []), { fig: W.means('talk', p[0]), prompt: 'Same meaning, your own words.',
      hint: 'Keep the meaning. Change the words.', explain: W.sent(p[1]), meta: { k: 'g5-paraphrase', said: p[0] } });
  }
  function paraTf(lv) {
    var p = R.pick(PARA), r = R.int(0, 2), said = [p[1], p[2], p[0]][r];
    return { q: Q.name() + ' paraphrases it like this. Is it a good paraphrase?', fig: W.means('talk', p[0]) + W.sent(said), type: 'tf', answer: r === 0,
      why: { options: ['Same meaning, new words.', 'It changes the meaning.', 'It copies the exact words.'], answer: r },
      hint: 'Same meaning? New words?', explain: W.sent(p[1]), meta: { k: 'g5-para-tf', said: p[0], para: said } };
  }
  function whyNot(lv) {
    var p = R.pick(PARA), copy = R.int(0, 1) === 1, said = copy ? p[0] : p[2], tiles = ['It changes the meaning.', 'It copies the exact words.', 'It is a good paraphrase.'];
    return { q: 'Why is this <b>not</b> a good paraphrase?', fig: W.means('talk', p[0]) + W.sent(said), type: 'tap', tiles: tiles, answer: copy ? 1 : 0,
      prompt: 'Compare the two. Same words? Same meaning?', hint: 'Compare the two. Same words? Same meaning?', explain: W.sent(p[1]), meta: { k: 'g5-why-not-para', said: p[0], para: said } };
  }
  function audience(lv) {
    var a = R.pick(AUD);
    return Q.one('You are speaking to <b>' + a[0] + '</b>. Which fits best?', a[1], [a[2]], { prompt: 'Formal or informal: who is listening?', hint: 'Match how you speak to who is listening.',
      explain: W.means('people', a[1]), meta: { k: 'g5-audience', who: a[0] } });
  }

  /* ---------- body language ---------- */
  function bodyMeans(lv) {
    var b = R.pick(BODY);
    return Q.tiles('What does <b>' + b[0] + '</b> usually tell the other person?', b[1], R.some(BODY.filter(function (x) { return x !== b; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      prompt: 'Try it yourself. How does it feel?', hint: 'Try it yourself. How does it feel?', explain: '<b>' + b[0] + '</b>: ' + b[1], meta: { k: 'g5-body', move: b[0] } });
  }
  function matchBody(lv) {
    var b = R.some(BODY, lv > 1 ? 4 : 3);
    return { q: 'Match each move to what it tells others.', type: 'match', pairs: b.map(function (x) { return [x[0], x[1]]; }), hint: 'Your body speaks before you do.', explain: 'Body language adds to your words.', meta: { k: 'g5-match-body' } };
  }
  function whichBody(lv) {
    var b = R.pick(BODY);
    return Q.tiles('You want to show: <b>' + b[1] + '</b> Which move?', b[0], R.some(BODY.filter(function (x) { return x !== b; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Try each move. Which matches the message?', explain: '<b>' + b[0] + '</b>: ' + b[1], meta: { k: 'g5-which-body', means: b[1] } });
  }
  function helpOrHurt(lv) {
    var b = R.pick(BODY);
    return { q: 'You are giving a talk. Does <b>' + b[0] + '</b> help your message?', type: 'tap', tiles: ['It helps.', 'It gets in the way.'], answer: b[2] ? 0 : 1,
      prompt: 'What does it tell your listeners?', hint: 'What does it tell your listeners?', explain: '<b>' + b[0] + '</b>: ' + b[1], meta: { k: 'g5-body-help', move: b[0] } };
  }

  /* ---------- vivid words ---------- */
  function vivid(lv) {
    var v = R.pick(VIVID);
    return Q.one('Which uses <b>vivid adjectives and adverbs</b> to say more?', v[1], [v[0]], { prompt: 'Which one helps you see and hear it?', hint: 'Which one helps you see and hear it?', explain: W.sent(v[1]), meta: { k: 'g5-vivid' } });
  }
  function bold(v, w) { return W.sent(v[1].replace(new RegExp('\\b' + w + '\\b'), '<mark class="hl">' + w + '</mark>')); }
  function tapAdverb(lv) {
    var v = R.pick(VIVID);
    return Q.tiles('Which word is the <b>adverb</b>? It tells <b>how</b>.', v[3], [v[2], v[4]], { fig: W.sent(v[1]), prompt: 'Many adverbs end in -ly.',
      hint: 'Which word tells how something was done?', explain: bold(v, v[3]), meta: { k: 'g5-tap-adverb', s: v[1] } });
  }
  function tapAdj(lv) {
    var v = R.pick(VIVID);
    return Q.tiles('Which word is an <b>adjective</b>? It describes a noun.', v[2], [v[3], v[4]], { fig: W.sent(v[1]), prompt: 'Which word tells what something is like?',
      hint: 'Which word tells what something is like?', explain: bold(v, v[2]), meta: { k: 'g5-tap-adj', s: v[1] } });
  }
  function vividTf(lv) {
    var v = R.pick(VIVID), right = R.int(0, 1) === 1, said = right ? v[1] : v[0];
    return { q: Q.name() + ' says this sentence uses vivid adjectives and adverbs.', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['It has words that describe and tell how.', 'It is plain: nothing describes or tells how.'], answer: right ? 0 : 1 },
      hint: 'Can you see and hear it?', explain: W.sent(v[1]), meta: { k: 'g5-vivid-tf', s: said } };
  }

  var E0 = ELAB[1], E1 = ELAB[11], R0 = REPLY[0], R1 = REPLY[3], P0 = PARA[1], P1 = PARA[7], V0 = VIVID[2], V1 = VIVID[10];
  Atlas.register('talking', {
    full: true,
    lessons: [{
      id: 'group', title: 'Listening in a group', sub: 'Show interest, invite more, and build on ideas.',
      concepts: [
        { slug: 'say-more', title: 'Ask a question that invites more', exp: ['B1.1'], skill: 'say-more',
          model: [
            step(W.means('talk', E0[0]), 'A classmate shares.'),
            step(W.sent(E0[2]), 'Yes or no. The talk stops.'),
            step(W.sent(E0[1]), 'An open question: now they explain.'),
            step(W.means('talk', E1[0]), 'Second example.'),
            step(W.sent(E1[1]), 'Start with what, how or why.')
          ],
          guided: [function () { return elaborate(1); }, function () { return openOrNot(1); }, function () { return interestTf(1); }],
          check: [function () { return elaborate(2); }, function () { return openOrNot(2); }, function () { return interestTf(2); }, function () { return pickOpen(2); }, function () { return elaborate(3); }],
          coach: '<p>At dinner, practise "tell me more" questions: What was the best part? How did you do it? Why did you choose it?</p>',
          mistake: '<p>Asking yes-or-no questions. They end the conversation. Start with what, how or why.</p>' },
        { slug: 'build-on', title: 'Build on what others say', exp: ['B1.1'], skill: 'build-on',
          model: [
            step(W.means('talk', R0[0]), 'A classmate' + RQ + 's idea.'),
            step(W.means('people', R0[1]), 'Add on: use their idea, then add yours.'),
            step(W.means('talk', R1[0]), 'Second example.'),
            step(W.means('people', R1[1]), 'Disagree politely, with a reason.'),
            step(W.tile('agree') + ' ' + W.tile('add on') + ' ' + W.tile('disagree politely') + ' ' + W.tile('ask for more'), 'Four ways to build.')
          ],
          guided: [function () { return bestReply(1); }, function () { return whichMove(1); }, function () { return buildOn(1); }],
          check: [function () { return bestReply(2); }, function () { return whichMove(2); }, function () { return buildTf(2); }, function () { return buildOn(2); }, function () { return bestReply(3); }],
          coach: '<p>Put three sentence starters on the fridge: "I agree with... because", "Adding to...", "I see it differently...". Use them in family talks.</p>',
          mistake: '<p>Waiting for a turn without really listening. A good response uses the last speaker' + RQ + 's words.</p>' },
        { slug: 'purpose', title: 'Listen for the purpose', exp: ['B1.2'], skill: 'listen-purpose',
          model: [
            step(W.means('listen', SAID[0][0]), 'Steps.'),
            step(W.means('write', PURPOSES[0])),
            step(W.means('listen', SAID[2][0]), 'Second example: an opinion.'),
            step(W.means('star', PURPOSES[1]), 'Ask: do I agree?'),
            step(W.means('listen', SAID[4][0]), 'Facts: <b>' + PURPOSES[2] + '</b>.')
          ],
          guided: [function () { return purpose(1); }, function () { return whichSaid(1); }, function () { return purposeTf(1); }],
          check: [function () { return purpose(2); }, function () { return whichSaid(2); }, function () { return purposeTf(2); }, function () { return matchPurpose(2); }, function () { return purpose(3); }],
          coach: '<p>Before listening to a podcast or announcement, ask: "Why do you think they are telling us this?" After, check.</p>',
          mistake: '<p>Believing every persuasive message. Knowing the purpose helps you decide what to think.</p>' }
      ]
    }, {
      id: 'speak', title: 'Speaking clearly', sub: 'Your own words, the right style, and vivid details.',
      concepts: [
        { slug: 'paraphrase', title: 'Paraphrase: same meaning, new words', exp: ['B1.3'], skill: 'paraphrase',
          model: [
            step(W.means('talk', P0[0]), 'The teacher said this.'),
            step(W.sent(P0[1]), 'My words, the same message.'),
            step(W.sent(P0[2]), 'The meaning changed. Not a paraphrase.'),
            step(W.means('talk', P1[0]), 'Second example.'),
            step(W.sent(P1[1]), 'Early and late in the day: dawn and dusk.')
          ],
          guided: [function () { return paraphrase(1); }, function () { return whyNot(1); }, function () { return audience(1); }],
          check: [function () { return paraphrase(2); }, function () { return whyNot(2); }, function () { return paraTf(2); }, function () { return audience(2); }, function () { return paraphrase(3); }],
          coach: '<p>After you give the child directions, ask them to "tell it back in your own words". It checks understanding, too.</p>',
          mistake: '<p>Repeating the exact words. That is restating; a paraphrase uses new words with the same meaning.</p>' },
        { slug: 'body', title: 'Your body helps your message', exp: ['B1.4'], skill: 'body',
          model: [
            step(W.sent('leaning in'), '"I am interested."'),
            step(W.sent('crossed arms'), '"I am closed off."'),
            step(W.sent('steady eye contact'), 'Second pair. "I am listening to you."'),
            step(W.sent('looking at the floor'), '"I am not confident."'),
            step(W.icon('people'), 'Eye contact and open hands help listeners trust you.')
          ],
          guided: [function () { return bodyMeans(1); }, function () { return whichBody(1); }, function () { return helpOrHurt(1); }],
          check: [function () { return bodyMeans(2); }, function () { return whichBody(2); }, function () { return helpOrHurt(2); }, function () { return matchBody(2); }, function () { return bodyMeans(3); }],
          coach: '<p>Watch a short speech with the sound off. Ask: "What can you tell just from their body?"</p>',
          mistake: '<p>Standing stiff with arms crossed while presenting. Relax your arms and use them to show size, shape or feeling.</p>' },
        { slug: 'vivid', title: 'Vivid words say more', exp: ['B1.5'], skill: 'vivid',
          model: [
            step(W.sent(V0[0]), 'Plain.'),
            step(W.sent(V0[1].replace(V0[2], '<b>' + V0[2] + '</b>').replace(V0[3], '<b>' + V0[3] + '</b>')), 'An adjective (' + V0[2] + ') and an adverb (' + V0[3] + ').'),
            step(W.sent(V1[0]), 'Second example.'),
            step(W.sent(V1[1].replace(V1[2], '<b>' + V1[2] + '</b>').replace(V1[3], '<b>' + V1[3] + '</b>')), 'What was the cat like? How did it climb?'),
            step(W.sent('Have you ever heard a wind like that?'), 'Mix in a question to pull listeners in.')
          ],
          guided: [function () { return vivid(1); }, function () { return tapAdverb(1); }, function () { return tapAdj(1); }],
          check: [function () { return vivid(2); }, function () { return tapAdverb(2); }, function () { return tapAdj(2); }, function () { return vividTf(2); }, function () { return vivid(3); }],
          coach: '<p>Play "add two": the child says a plain sentence, then adds one describing word and one -ly word.</p>',
          mistake: '<p>Piling on too many describing words. One or two strong ones work better than five.</p>' }
      ]
    }],
    practice: [
      { id: 'say-more', name: 'Questions that invite more', code: 'B1.1', gen: elaborate },
      { id: 'build-on', name: 'Building on ideas', code: 'B1.1', gen: bestReply },
      { id: 'listen-purpose', name: 'Listening for the purpose', code: 'B1.2', gen: purpose },
      { id: 'paraphrase', name: 'Paraphrasing', code: 'B1.3', gen: paraphrase },
      { id: 'body', name: 'Body language', code: 'B1.4', gen: bodyMeans },
      { id: 'vivid', name: 'Vivid words', code: 'B1.5', gen: vivid }
    ],
    tasks: [
      { id: 'discussion', title: 'A family discussion', code: 'B1.1', pic: W.icon('people'), say: 'Discuss a question with your family. Ask one "tell me more" question.',
        run: ['Choose a question with more than one answer: "Should kids have phones?" "What makes a good friend?"', 'Everyone shares. The child shows interest, asks at least one open question, and builds on someone' + '’' + 's idea.'],
        rubric: ['Interrupts or does not take part yet.', 'Takes a turn; responses do not link to others yet.', 'Shows interest, asks an open question and builds on an idea.', 'Leads the talk forward: invites quiet voices and links ideas together.'] },
      { id: 'listen-respond', title: 'Listen and respond', code: 'B1.2', pic: W.icon('listen'), say: 'Listen to a short news story or podcast. Then respond.',
        run: ['Before: ask what the child already knows about the topic.', 'During: the child notes two key points.', 'After: the child tells the purpose, asks about anything unclear, and shares their own response.'],
        rubric: ['Recalls little of it.', 'Recalls one point; purpose unclear.', 'Gives the main points and the purpose, and responds.', 'Gives the main points, the purpose, a thoughtful response and a question.'] },
      { id: 'restate', title: 'Pass on the message', code: 'B1.3', pic: W.icon('talk'), say: 'Give someone a message in your own words.',
        run: ['Give the child a message with three details (time, place, what to bring).', 'The child passes it on to another family member in their own words.', 'Check: did all three details arrive?'],
        rubric: ['The message is lost.', 'One or two details arrive.', 'All details arrive, in the child' + '’' + 's own words.', 'All details arrive, clearly, in a style that fits the listener.'] },
      { id: 'present', title: 'A two-minute talk', code: 'B1.4', pic: W.icon('people'), say: 'Give a two-minute talk. Use your face, hands and voice.',
        run: ['The child chooses a topic and plans a start, three points and an end.', 'They present to the family, standing, with eye contact and gestures.', 'Afterwards ask: "Which move helped your message most?"'],
        rubric: ['Reads from notes without looking up.', 'Some eye contact; few gestures.', 'Eye contact, gestures and a clear voice support the message.', 'Body, face and voice work together; can explain how they helped.'] },
      { id: 'retell-vivid', title: 'Tell it so I can see it', code: 'B1.5', pic: W.icon('think'), say: 'Tell about a place you love. Make me see it.',
        run: ['The child describes a favourite place aloud for one minute.', 'Listen for new vocabulary, vivid adjectives and adverbs, and different kinds of sentences (a question, an exclamation).'],
        rubric: ['Very few describing words.', 'Some describing words; mostly the same kind of sentence.', 'Vivid adjectives and adverbs and varied sentences.', 'Rich, precise words, including new vocabulary, that bring the place to life.'] }
    ]
  });

  Q.shapes('talking', {
    'say-more': [[1, 'open-or-not', openOrNot], [1, 'true-false', interestTf], [2, 'pick', pickOpen]],
    'build-on': [[1, 'which-move', whichMove], [1, 'true-false', buildTf], [2, 'pick', buildOn]],
    'listen-purpose': [[1, 'which-one', whichSaid], [1, 'true-false', purposeTf], [2, 'match', matchPurpose]],
    paraphrase: [[1, 'why-not', whyNot], [1, 'audience', audience], [2, 'true-false', paraTf]],
    body: [[1, 'which-move', whichBody], [1, 'help-or-hurt', helpOrHurt], [2, 'match', matchBody]],
    vivid: [[1, 'adverb', tapAdverb], [1, 'adjective', tapAdj], [2, 'true-false', vividTf]]
  });
})();
