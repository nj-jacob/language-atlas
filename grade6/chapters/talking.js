/* Grade 6: listening and speaking.
   Ontario 2023 Language, Grade 6, B1 Oral and Non-Verbal Communication:
   B1.1 effective listening, including when to ask relevant questions and how to respond to others in group discussions
   B1.2 listening strategies before, during and after listening; seeking clarification; a relevant response
   B1.3 purpose and audience for speaking in formal and informal contexts
   B1.4 oral and non-verbal strategies (expression, gestures, body language), and how their use may vary across cultures
   B1.5 precise and descriptive word choice, varied sentences, cohesive sentences, active or passive voice as appropriate
   The computer checks knowing what to do. Discussing, listening and speaking themselves are activities with a grown-up.
   Answer checks: tests/verify/grade6-talking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  var AP = '’';

  /* ---------- discussion: [what someone said, a response that builds on it (it names the speaker), responses that do not] ---------- */
  var BUILD = [['Omar: The school should start a compost program.', 'Building on Omar' + AP + 's idea, we could use the compost in the school garden.', ['That is boring. Let' + AP + 's talk about recess.', 'I had cereal for breakfast.']],
    ['Priya: The library should stay open later.', 'I agree with Priya, because some students need a quiet place after school.', ['Libraries are old-fashioned.', 'Can we go outside now?']],
    ['Kai: Our class could raise money for the food bank.', 'That is a good idea, Kai. How would we collect the money?', ['Whatever.', 'My cousin has a new puppy.']],
    ['Leila: I disagree. A bake sale is not the best plan.', 'I see your point, Leila. What would you suggest instead?', ['You are wrong.', 'I like cookies.']],
    ['Mateo: We should plant milkweed for the monarchs.', 'Mateo, that would help. We could also add a sign to explain it.', ['Bugs are gross.', 'When is lunch?']],
    ['Hana: Phones should be put away during class.', 'I partly agree with Hana, but phones can help with research.', ['That is so dumb.', 'I got a new phone case.']],
    ['Jonah: Our town needs more bike lanes.', 'Adding to what Jonah said, safe lanes would help kids bike to school.', ['Cars are faster anyway.', 'My bike is red.']],
    ['Amara: The class trip should be to the science centre.', 'Amara, why do you think it is better than the museum?', ['Trips are boring.', 'I went to the beach last summer.']],
    ['Ravi: Older students could read with the kindergarten class.', 'Like Ravi said, it would help both groups. We could start on Fridays.', ['Kindergarten kids are loud.', 'I lost my pencil.']],
    ['Noor: We should learn some Anishinaabemowin words in class.', 'I agree with Noor. We could ask an Elder to visit and teach us.', ['That will take too long.', 'Is it snowing outside?']]];
  var GOOD = ['Build on what others say.', 'Ask a question when something is unclear.', 'Let others finish speaking.', 'Invite a quiet person to share.',
    'Disagree with the idea, not the person.', 'Sum up what was said before adding to it.', 'Give a reason for your opinion.', 'Stay on the topic.'];
  var BAD = ['Interrupt to make your point.', 'Change the topic.', 'Laugh at a wrong answer.', 'Stay silent the whole time.',
    'Repeat your idea louder.', 'Roll your eyes when you disagree.', 'Talk to a friend while someone shares.', 'Take every turn yourself.'];

  function buildOn(lv) {
    var b = R.pick(BUILD);
    return Q.one('Which response <b>builds on</b> what was said?', b[1], b[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('talk', b[0]),
      prompt: 'Does it connect to the idea, and keep the discussion going?', hint: 'A good response names the idea and adds to it, or asks about it.', explain: b[1], meta: { k: 'g6-build-on', said: b[0] } });
  }
  function goodMoves() {
    return Q.all('Pick every good move in a group discussion.', R.some(GOOD, 2), R.some(BAD, 2), { hint: 'Which ones help everyone think together?', explain: 'Build on ideas, ask, take turns, include others.', meta: { k: 'g6-good-moves' } });
  }
  function buildTf() {
    var b = R.pick(BUILD), right = R.int(0, 1) === 1, reply = right ? b[1] : R.pick(b[2]);
    return { q: Q.name() + ' replies. Does the reply build on what was said?', fig: W.means('talk', b[0]) + W.means('people', reply), type: 'tf', answer: right,
      why: { options: ['It connects to the idea and keeps it going.', 'It ignores the idea or puts it down.'], answer: right ? 0 : 1 },
      hint: 'Does it mention the idea?', explain: b[1], meta: { k: 'g6-build-tf', said: b[0], reply: reply } };
  }
  function moveTf() {
    var right = R.int(0, 1) === 1, m = R.pick(right ? GOOD : BAD);
    return { q: 'Is this a good move in a group discussion?', fig: W.means('people', m), type: 'tf', answer: right,
      why: { options: ['It helps everyone think together.', 'It shuts others out.'], answer: right ? 0 : 1 },
      hint: 'Does it help the group?', explain: right ? 'It helps the group.' : 'It does not help the group.', meta: { k: 'g6-move-tf', move: m } };
  }

  /* ---------- clarifying: [what the speaker said, two questions that check it, questions that do not] ---------- */
  var CLARIFY = [['The project is due in two weeks, and you can work in pairs.', ['Do we choose our own partners for the project?', 'Is the project due two weeks from today?'], ['Did you watch the game last night?', 'Where did you buy your shoes?']],
    ['Bring your permission form and a water bottle on Friday.', ['Is the permission form due Friday, or before?', 'Do we need a water bottle and the form?'], ['What is your favourite movie?', 'Is it lunch yet?']],
    ['The bus leaves at 8:15 sharp from the east doors.', ['Did you say the bus leaves from the east doors?', 'Is that 8:15 in the morning?'], ['What is for lunch?', 'Who won the hockey game?']],
    ['For the debate, each team gets three minutes to speak.', ['Is that three minutes for each person, or for the whole team?', 'Does the timer start when the team begins to speak?'], ['Can I sharpen my pencil?', 'Is the gym open?']],
    ['The pool is closed Monday, so swim club moves to Wednesday.', ['So swim club is on Wednesday this week?', 'Is the pool open again on Tuesday?'], ['Do you like my new hat?', 'Can I get a drink?']],
    ['Read chapters four and five, and answer the first three questions.', ['Do we answer only the first three questions?', 'Is it chapters four and five, or four to six?'], ['Is there a fire drill today?', 'Who is your best friend?']],
    ['The science fair boards must be no taller than 90 cm.', ['Is 90 cm the limit for the science fair board?', 'Does the 90 cm include the stand?'], ['What did you have for dinner?', 'Is it raining?']],
    ['Practice starts at 6:00, but the rink opens at 5:30.', ['Can we get on the rink at 5:30?', 'So practice itself starts at 6:00?'], ['Did you like the movie?', 'Where is my scarf?']],
    ['The guest speaker will talk about the Inuit art of soapstone carving.', ['Will the speaker show us real soapstone carving?', 'Is the talk about soapstone carving or about prints?'], ['What time is recess?', 'Can I borrow a pen?']],
    ['Hand in the poster by Thursday, with your name on the back.', ['Should my name go on the back of the poster?', 'Is the poster due Thursday morning?'], ['Is today a holiday?', 'Who has the ball?']]];
  function clarify(lv) {
    var c = R.pick(CLARIFY), g = R.pick(c[1]);
    return Q.one('Which question checks that you understood?', g, c[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('listen', c[0]),
      prompt: 'Which question is about what the speaker said?', hint: 'A clarifying question repeats part of what was said.', explain: g, meta: { k: 'g6-clarify', said: c[0] } });
  }
  function clarifyTf() {
    var c = R.pick(CLARIFY), right = R.int(0, 1) === 1, ask = R.pick(right ? c[1] : c[2]);
    return { q: Q.name() + ' asks this. Does it check what the speaker said?', fig: W.means('listen', c[0]) + W.means('talk', ask), type: 'tf', answer: right,
      why: { options: ['It asks about part of what was said.', 'It is about something else.'], answer: right ? 0 : 1 },
      hint: 'Is it about what the speaker said?', explain: 'A clarifying question uses the speaker' + AP + 's own words.', meta: { k: 'g6-clarify-tf', said: c[0], ask: ask } };
  }
  function clarifyPick() {
    var c = R.pick(CLARIFY);
    return Q.all('Pick every question that checks what the speaker said.', c[1], c[2], { fig: W.means('listen', c[0]),
      hint: 'Which questions repeat part of what was said?', explain: 'Clarifying questions stay on what was said.', meta: { k: 'g6-clarify-pick', said: c[0] } });
  }
  function clarifyMatch() {
    var cs = R.some(CLARIFY, 3);
    return { q: 'Match what was said to the question that checks it.', type: 'match', pairs: cs.map(function (c) { return [c[0], R.pick(c[1])]; }),
      hint: 'Find a word they share.', explain: 'Clarifying questions use the speaker' + AP + 's words.', meta: { k: 'g6-clarify-match' } };
  }

  /* ---------- a listening plan: [when, what you do] ---------- */
  var WHEN = ['Before', 'During', 'After'];
  var STRAT = [[0, 'Think about what you already know.'], [0, 'Ask yourself why you are listening.'], [0, 'Predict what the speaker will say.'], [0, 'Write one question to listen for.'],
    [1, 'Picture what the speaker describes.'], [1, 'Jot down key words.'], [1, 'Listen for signal words like first and finally.'], [1, 'Notice the speaker' + AP + 's tone of voice.'],
    [2, 'Sum up the main idea.'], [2, 'Ask about anything unclear.'], [2, 'Check your prediction.'], [2, 'Share your opinion and give a reason.']];
  function whenStrat() {
    var s = R.pick(STRAT);
    return { q: 'When do you do this?', fig: W.means('listen', s[1]), type: 'tap', tiles: WHEN.map(function (w) { return w + ' listening'; }), answer: s[0],
      prompt: 'Is it getting ready, listening, or thinking back?', hint: 'Getting ready? Listening? Thinking back?', explain: '<b>' + WHEN[s[0]] + '</b> listening.', meta: { k: 'g6-when-strat', s: s[1] } };
  }
  function listenOrder() {
    var items = [0, 1, 2].map(function (i) { return R.pick(STRAT.filter(function (s) { return s[0] === i; }))[1]; });
    return { q: 'Put the listening steps in order.', type: 'order', items: items, first: 'First', last: 'Last', hint: 'Before, during, after.', explain: items.join(' &rarr; '), meta: { k: 'g6-listen-order' } };
  }
  function stratTf() {
    var s = R.pick(STRAT), right = R.int(0, 1) === 1, said = right ? s[0] : R.pick([0, 1, 2].filter(function (i) { return i !== s[0]; }));
    return { q: Q.name() + ' says you do this <b>' + WHEN[said].toLowerCase() + '</b> listening.', fig: W.means('listen', s[1]), type: 'tf', answer: right,
      why: { options: ['That is when it helps most.', 'It belongs at another time.'], answer: right ? 0 : 1 },
      hint: 'Getting ready? Listening? Thinking back?', explain: '<b>' + WHEN[s[0]] + '</b> listening.', meta: { k: 'g6-strat-tf', s: s[1], said: WHEN[said] } };
  }
  function stratPick() {
    var w = R.int(0, 2);
    return Q.all('Pick every thing you do <b>' + WHEN[w].toLowerCase() + '</b> listening.', R.some(STRAT.filter(function (s) { return s[0] === w; }), 2).map(function (s) { return s[1]; }),
      R.some(STRAT.filter(function (s) { return s[0] !== w; }), 2).map(function (s) { return s[1]; }), { hint: 'Getting ready? Listening? Thinking back?', explain: WHEN[w] + ' listening.', meta: { k: 'g6-strat-pick', when: WHEN[w] } });
  }

  /* ---------- formal or informal: [audience, formal or informal, what fits, what does not] ---------- */
  var AUD = [['the school council at a meeting', 'formal', 'Good afternoon. I would like to propose a new recycling plan.', 'Hey, so, we should totally recycle more.'],
    ['a museum guide you have just met', 'formal', 'Excuse me, could you tell me where the Inuit art gallery is?', 'Where' + AP + 's the art stuff?'],
    ['an Elder visiting the class', 'formal', 'Thank you for sharing your teachings with us today.', 'Thanks, that was cool.'],
    ['a judge at the science fair', 'formal', 'Our experiment tested which material keeps ice frozen longest.', 'So, like, we put ice in stuff.'],
    ['a police officer giving a safety talk', 'formal', 'Excuse me, officer. May I ask a question about bike helmets?', 'Yo, what about helmets?'],
    ['the principal, in her office', 'formal', 'Good morning, Ms. Lee. May I speak with you about the garden club?', 'Hey, can we chat about the garden thing?'],
    ['a radio host interviewing you', 'formal', 'Thank you for having me. Our team built a solar oven.', 'Thanks! So we made this oven thing.'],
    ['your little brother at home', 'informal', 'Want to play cards after dinner?', 'Would you care to join me for a game of cards this evening?'],
    ['your best friend at lunch', 'informal', 'Want to trade half my sandwich?', 'Good afternoon. Would you care to exchange sandwiches?'],
    ['your cousin on a video call', 'informal', 'Hey! Guess what happened at school today?', 'Good evening. I wish to report on the events of my school day.'],
    ['your teammate during practice', 'informal', 'Nice pass! Want to try that again?', 'That was an excellent pass. Shall we attempt it once more?'],
    ['your grandpa while baking together', 'informal', 'Can I crack the eggs, Grandpa?', 'Grandfather, I request permission to crack the eggs.']];
  function register(lv) {
    var a = R.pick(AUD);
    return Q.one('You are speaking to <b>' + a[0] + '</b>. Which fits best?', a[2], [a[3]].concat(lv > 1 ? [R.pick(AUD.filter(function (x) { return x !== a && x[1] !== a[1]; }))[2]] : []), {
      prompt: 'Is this formal or informal?', hint: 'Formal: polite and complete. Informal: relaxed, for people you know well.', explain: a[1] === 'formal' ? 'This audience needs <b>formal</b> speech.' : 'This is a relaxed, <b>informal</b> moment.',
      meta: { k: 'g6-register', aud: a[0] } });
  }
  function formalOrNot() {
    var a = R.pick(AUD), line = R.int(0, 1) === 1 ? a[2] : a[3];
    var isFormal = (line === a[2]) === (a[1] === 'formal');
    return { q: 'Is this formal or informal?', fig: W.means('talk', line), type: 'tap', tiles: ['formal', 'informal'], answer: isFormal ? 0 : 1,
      prompt: 'Is it polite and complete, or relaxed?', hint: 'Formal speech is polite, complete and careful.', explain: 'It is <b>' + (isFormal ? 'formal' : 'informal') + '</b>.', meta: { k: 'g6-formal-or-not', line: line } };
  }
  function audKind() {
    var a = R.pick(AUD);
    return { q: 'How should you speak to <b>' + a[0] + '</b>?', type: 'tap', tiles: ['formally', 'informally'], answer: a[1] === 'formal' ? 0 : 1,
      hint: 'Is it someone you know well, in a relaxed moment?', explain: a[1] === 'formal' ? 'Formally.' : 'Informally.', meta: { k: 'g6-aud-kind', aud: a[0] } };
  }
  function registerTf() {
    var a = R.pick(AUD), right = R.int(0, 1) === 1, line = right ? a[2] : a[3];
    return { q: Q.name() + ' says this to <b>' + a[0] + '</b>. Does it fit?', fig: W.means('talk', line), type: 'tf', answer: right,
      why: { options: ['The words suit the audience.', 'It is too formal or too casual for them.'], answer: right ? 0 : 1 },
      hint: 'Formal or informal audience?', explain: W.means('talk', a[2]), meta: { k: 'g6-register-tf', aud: a[0], line: line } };
  }

  /* ---------- body language: [what you see, what it says] ---------- */
  var BODY = [['leaning forward and nodding', 'I am interested.'], ['arms crossed, eyes rolling', 'I do not care.'], ['standing tall, open hands', 'I am confident.'],
    ['looking at a phone while someone speaks', 'I am not listening.'], ['a pause before a big point', 'Get ready: this matters.'], ['a warm smile while greeting someone', 'I am friendly.'],
    ['fidgeting and looking at the clock', 'I want to leave.'], ['a shaky voice and looking at the floor', 'I am nervous.'], ['raising a hand and waiting', 'I would like a turn.'],
    ['a slow nod with a thoughtful face', 'I am thinking it over.']];
  var CULTURE = [['In some cultures, looking down while an Elder speaks shows respect.', true], ['A thumbs up does not mean the same thing everywhere.', true],
    ['A nod can mean yes in one place and no in another.', true], ['In some Indigenous communities, a pause before answering shows respect for the question.', true],
    ['Eye contact means the same thing in every culture.', false], ['Every gesture means the same thing all over the world.', false],
    ['Standing very close to someone feels friendly to everyone.', false], ['A gesture that is polite in Canada is polite everywhere.', false]];
  function bodySays(lv) {
    var b = R.pick(BODY);
    return Q.one('What does <b>' + b[0] + '</b> usually say to others?', b[1], R.some(BODY.filter(function (x) { return x !== b; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      prompt: 'Picture someone doing it.', hint: 'Picture someone doing it.', explain: b[1], meta: { k: 'g6-body', b: b[0] } });
  }
  function cultureTf() {
    var c = R.pick(CULTURE);
    return { q: 'True or false?', fig: W.sent(c[0]), type: 'tf', answer: c[1], why: { options: ['Body language can mean different things in different cultures.', 'Body language means the same everywhere.'], answer: 0 },
      hint: 'Do all cultures read gestures the same way?', explain: 'Body language and eye contact can mean different things in different cultures.', meta: { k: 'g6-culture', s: c[0] } };
  }
  function bodyMatch() {
    var bs = R.some(BODY, 3);
    return { q: 'Match what you see to what it usually says.', type: 'match', pairs: bs.map(function (b) { return [b[0], b[1]]; }), hint: 'Picture each one.', explain: 'Bodies speak too.', meta: { k: 'g6-body-match' } };
  }
  function bodyTf() {
    var b = R.pick(BODY), right = R.int(0, 1) === 1, said = right ? b[1] : R.pick(BODY.filter(function (x) { return x !== b; }))[1];
    return { q: Q.name() + ' says <b>' + b[0] + '</b> usually means: <b>' + said + '</b>', type: 'tf', answer: right,
      why: { options: ['That is what it usually tells others.', 'It usually tells others something else.'], answer: right ? 0 : 1 },
      hint: 'Picture someone doing it.', explain: b[1], meta: { k: 'g6-body-tf', b: b[0], said: said } };
  }

  /* ---------- precise words: [vague, precise] ---------- */
  var PRECISE = [['The dog went across the yard.', 'The terrier dashed across the snowy yard.'], ['She said it loudly.', 'She announced the winner proudly.'],
    ['The food was good.', 'The bannock was warm, golden and slightly sweet.'], ['It was a big storm.', 'The blizzard dropped 40 cm of snow overnight.'],
    ['He did the thing fast.', 'He solved the puzzle in four minutes.'], ['The bird was nice.', 'The blue jay had bright blue wings and a loud call.'],
    ['We went to a place.', 'We canoed to a quiet island on Lake of the Woods.'], ['The movie was good.', 'The whole audience gasped at the ending.'],
    ['There was a lot of rain.', 'Almost 60 mm of rain fell in one hour.'], ['She got a prize.', 'She won first prize for her drawing of a loon.'],
    ['The building was big.', 'The CN Tower rises 553 m above Toronto.'], ['He ate some stuff.', 'He ate two slices of apple pie.']];
  function precise(lv) {
    var p = R.pick(PRECISE);
    return Q.one('Which sentence is more <b>precise</b>?', p[1], [p[0]].concat(lv > 1 ? [R.pick(PRECISE.filter(function (x) { return x !== p; }))[0]] : []), {
      prompt: 'Which one paints a clearer picture?', hint: 'Precise words: exact nouns, strong verbs, numbers, details.', explain: p[1], meta: { k: 'g6-precise' } });
  }
  function preciseTf() {
    var p = R.pick(PRECISE), right = R.int(0, 1) === 1, from = right ? p[0] : p[1], to = right ? p[1] : p[0];
    return { q: Q.name() + ' changed the first sentence to the second. Is the second more precise?', fig: W.sent(from) + W.sent(to), type: 'tf', answer: right,
      why: { options: ['It uses exact words and details.', 'It uses vaguer words.'], answer: right ? 0 : 1 },
      hint: 'Which one paints a clearer picture?', explain: p[1], meta: { k: 'g6-precise-tf', to: to } };
  }
  function precisePick() {
    var ps = R.some(PRECISE, 4);
    return Q.all('Pick every <b>precise</b> sentence.', ps.slice(0, 2).map(function (p) { return p[1]; }), ps.slice(2).map(function (p) { return p[0]; }), {
      hint: 'Exact nouns, strong verbs, numbers and details.', explain: 'Precise words help the listener picture it.', meta: { k: 'g6-precise-pick' } });
  }
  function preciseMatch() {
    var ps = R.some(PRECISE, 3);
    return { q: 'Match each vague sentence to a precise one.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[1]]; }), hint: 'What is each one about?', explain: 'Same idea, clearer words.', meta: { k: 'g6-precise-match' } };
  }

  Atlas.register('talking', {
    full: true,
    lessons: [{
      id: 'listening', title: 'Listening in discussions', sub: 'Listen with a plan, ask, and build on ideas.',
      concepts: [
        { slug: 'build-on', title: 'Build on what others say', exp: ['B1.1'], skill: 'build-on',
          model: [
            step(W.means('talk', 'Omar: The school should start a compost program.')),
            step(W.means('people', 'Building on Omar' + AP + 's idea, we could use it in the garden.'), 'Name the idea. Add to it.'),
            step(W.means('talk', 'Leila: A bake sale is not the best plan.')),
            step(W.means('people', 'I see your point, Leila. What would you suggest instead?'), 'Or ask about it, even if you disagree.'),
            step(W.means('wrong', 'Whatever.'), 'This ends the talk. Avoid it.')
          ],
          guided: [function () { return buildOn(1); }, goodMoves, buildTf],
          check: [function () { return buildOn(2); }, moveTf, buildTf, goodMoves, function () { return buildOn(2); }],
          coach: '<p>At dinner, practise sentence starters: "I agree with... because", "Building on...", "I see it differently because...".</p>',
          mistake: '<p>Waiting to speak instead of listening. Ask the child to repeat the last speaker’s point before adding their own.</p>' },
        { slug: 'clarify', title: 'Ask to check you understood', exp: ['B1.2'], skill: 'clarify',
          model: [
            step(W.means('listen', 'The bus leaves at 8:15 from the east doors.')),
            step(W.means('talk', 'Did you say the east doors?'), 'Repeat a part you are not sure of.'),
            step(W.means('listen', 'Read chapters four and five, and answer the first three questions.')),
            step(W.means('talk', 'Is it chapters four and five, or four to six?'), 'Check the numbers.')
          ],
          guided: [function () { return clarify(1); }, clarifyTf, clarifyPick],
          check: [function () { return clarify(2); }, clarifyMatch, clarifyTf, clarifyPick, function () { return clarify(2); }],
          coach: '<p>Give a three-part instruction quickly. Praise the child for asking about the part they missed.</p>',
          mistake: '<p>Nodding along without understanding. Asking is a strength, not a weakness.</p>' },
        { slug: 'listen-plan', title: 'Before, during and after listening', exp: ['B1.2'], skill: 'listen-plan',
          model: [
            step(W.icon('think'), 'Before: what do I know? Why am I listening?'),
            step(W.icon('listen'), 'During: picture it. Note key words.'),
            step(W.icon('write'), 'After: sum it up. Ask what is unclear.'),
            step(W.chain(['Predict what the speaker will say.', 'Listen for first and finally.', 'Check your prediction.'], ['Before', 'During', 'After']), 'A plan for a class talk.')
          ],
          guided: [whenStrat, listenOrder, stratTf],
          check: [whenStrat, stratPick, listenOrder, stratTf, whenStrat],
          coach: '<p>Before a podcast or news clip, agree on one question to listen for.</p>',
          mistake: '<p>Writing down everything. Key words are enough.</p>' }
      ]
    }, {
      id: 'speaking', title: 'Speaking to an audience', sub: 'Fit your words, voice and body to the audience.',
      concepts: [
        { slug: 'formal', title: 'Formal or informal', exp: ['B1.3'], skill: 'formal',
          model: [
            step(W.means('people', 'the school council'), 'Formal: <b>Good afternoon. I would like to propose...</b>'),
            step(W.means('people', 'your best friend'), 'Informal: <b>Want to trade half my sandwich?</b>'),
            step(W.means('people', 'a radio host'), 'Formal: <b>Thank you for having me.</b>'),
            step(W.means('people', 'your teammate'), 'Informal: <b>Nice pass!</b>')
          ],
          guided: [function () { return register(1); }, formalOrNot, audKind],
          check: [function () { return register(2); }, registerTf, formalOrNot, audKind, function () { return register(2); }],
          coach: '<p>Role-play: ask for directions from a museum guide, then from a cousin. Talk about what changed.</p>',
          mistake: '<p>Being too formal with friends is odd, but being too casual with an adult can seem rude.</p>' },
        { slug: 'body', title: 'Body language speaks too', exp: ['B1.4'], skill: 'body',
          model: [
            step(W.means('people', 'leaning forward, nodding'), 'I am interested.'),
            step(W.means('people', 'arms crossed, eyes rolling'), 'I do not care.'),
            step(W.means('think', 'eye contact'), 'Respectful in some cultures. Looking down is respectful in others.'),
            step(W.means('people', 'a pause before answering'), 'In some communities, it shows respect for the question.')
          ],
          guided: [function () { return bodySays(1); }, cultureTf, bodyTf],
          check: [function () { return bodySays(2); }, bodyMatch, cultureTf, bodyTf, function () { return bodySays(2); }],
          coach: '<p>Watch a short speech with the sound off. What do the speaker’s face and hands tell you?</p>',
          mistake: '<p>Judging others by one culture’s rules. A child who looks down may be showing respect.</p>' },
        { slug: 'precise', title: 'Precise words help the listener', exp: ['B1.5'], skill: 'precise',
          model: [
            step(W.sent('The dog went across the yard.'), 'Which dog? How?'),
            step(W.sent('The <b>terrier dashed</b> across the <b>snowy</b> yard.'), 'An exact noun, a strong verb, a detail.'),
            step(W.sent('There was a lot of rain.'), 'How much?'),
            step(W.sent('Almost <b>60 mm</b> of rain fell in <b>one hour</b>.'), 'Numbers make it exact.')
          ],
          guided: [function () { return precise(1); }, preciseTf, precisePick],
          check: [function () { return precise(2); }, preciseMatch, preciseTf, precisePick, function () { return precise(2); }],
          coach: '<p>Play "zoom in": the child says a plain sentence, then makes it more exact three times.</p>',
          mistake: '<p>Piling on adjectives. One exact word beats three vague ones.</p>' }
      ]
    }],
    practice: [
      { id: 'build-on', name: 'Building on ideas', code: 'B1.1', gen: buildOn },
      { id: 'clarify', name: 'Clarifying questions', code: 'B1.2', gen: clarify },
      { id: 'listen-plan', name: 'A listening plan', code: 'B1.2', gen: whenStrat },
      { id: 'formal', name: 'Formal or informal', code: 'B1.3', gen: register },
      { id: 'body', name: 'Body language', code: 'B1.4', gen: bodySays },
      { id: 'precise', name: 'Precise words', code: 'B1.5', gen: precise }
    ],
    tasks: [
      { id: 'discuss', title: 'A family discussion', code: 'B1.1', pic: W.icon('people'), say: 'Should our town ban plastic bags? Discuss it. Build on what others say.',
        run: ['Hold a 10-minute discussion with two or more people. Agree on the rules: one speaker at a time.', 'Watch for the child building on others’ ideas, asking relevant questions and disagreeing politely.'],
        rubric: ['Does not join in, or talks over others.', 'Shares ideas but does not respond to others.', 'Responds to others and asks relevant questions.', 'Builds on ideas, invites others in, and disagrees respectfully.'] },
      { id: 'listen-summary', title: 'Listen and sum it up', code: 'B1.2', pic: W.icon('listen'), say: 'Listen to a short news story or podcast. Then sum it up in three sentences.', write: true,
        run: ['Choose a 3 to 5 minute news story or podcast for young people.', 'Before: ask what the child already knows. During: they note key words. After: they write a three-sentence summary and one question.'],
        rubric: ['Recalls little.', 'Recalls some details but not the main idea.', 'Sums up the main idea with key details.', 'A clear summary plus a thoughtful question or response.'] },
      { id: 'talk', title: 'Give a two-minute talk', code: 'B1.3', pic: W.icon('talk'), say: 'Give a two-minute talk about a place in Canada you would like to visit.',
        run: ['Help the child plan: who is the audience, and what is the purpose (to inform or persuade)?', 'They give the talk standing up. Use formal language and a clear opening and closing.'],
        rubric: ['Hard to follow, or very short.', 'Some ideas, but the purpose is unclear.', 'Clear purpose and language that suits the audience.', 'Engaging, well organized, and suited to the audience.'] },
      { id: 'non-verbal', title: 'Voice and body', code: 'B1.4', pic: W.icon('people'), say: 'Retell a story using only your face and hands. Then add your voice.',
        run: ['The child retells a short story silently, using gestures and facial expressions. Then they tell it again with their voice.', 'Talk about which gestures helped, and how gestures and eye contact can mean different things in different cultures.'],
        rubric: ['Little expression or gesture.', 'Some gestures, not always matching.', 'Gestures and expression support the message.', 'Uses voice and body with skill, and explains how meanings can vary across cultures.'] },
      { id: 'describe', title: 'Describe it exactly', code: 'B1.5', pic: W.icon('talk'), say: 'Describe an object without naming it. Can your listener guess it?',
        run: ['Hide an object in a bag. The child describes it using exact words: size in centimetres, shape, texture, use.', 'The listener guesses. Talk about which words helped most.'],
        rubric: ['Vague words; the listener cannot guess.', 'Some exact words.', 'Precise words; the listener guesses it.', 'Rich, precise language in varied, connected sentences.'] }
    ]
  });

  Q.shapes('talking', {
    'build-on': [[1, 'good-moves', goodMoves], [1, 'true-false', buildTf], [1, 'move', moveTf]],
    clarify: [[1, 'true-false', clarifyTf], [1, 'pick', clarifyPick], [2, 'match', clarifyMatch]],
    'listen-plan': [[1, 'order', listenOrder], [1, 'true-false', stratTf], [2, 'pick', stratPick]],
    formal: [[1, 'formal-or-not', formalOrNot], [1, 'audience', audKind], [2, 'true-false', registerTf]],
    body: [[1, 'culture', cultureTf], [1, 'true-false', bodyTf], [2, 'match', bodyMatch]],
    precise: [[1, 'true-false', preciseTf], [1, 'pick', precisePick], [2, 'match', preciseMatch]]
  });
})();
