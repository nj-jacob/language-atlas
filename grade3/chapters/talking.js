/* Grade 3: listening and speaking. A full chapter: every idea has two worked examples, three questions together and five on
   your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 3, B1 Oral and Non-Verbal Communication:
   B1.1 effective listening, including asking questions to clarify       B1.2 listening strategies before, during and after listening
   B1.3 purpose and audience for speaking, formal and informal          B1.4 oral and non-verbal strategies (expression, gestures, body language)
   B1.5 word choice, grammar and cohesive sentences when speaking
   The computer checks knowing what to do. Listening and speaking themselves are activities with a grown-up, marked with a rubric.
   Answer checks: tests/verify/grade3-talking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var AP = '’';
  var GOOD = ['Look at the speaker.', 'Keep my body still.', 'Think about what they say.', 'Wait for my turn to talk.', 'Ask a question if I am not sure.',
    'Nod to show I am following.', 'Picture what they describe.', 'Say back what I heard.'];
  var BAD = ['Play with something in my hands.', 'Talk at the same time.', 'Look out the window.', 'Think about lunch.', 'Interrupt to tell my own story.',
    'Hum a song.', 'Turn my back to the speaker.', 'Read a book while they talk.'];
  /* what someone said, and a question that checks you understood it */
  var CLARIFY = [['We meet at the front doors at nine.', 'Did you say the front doors?'], ['Bring two things for the bake sale.', 'Two things each, or two for the whole family?'],
    ['The library is closed on Monday.', 'Is it open again on Tuesday?'], ['Draw a map of your street.', 'Should I label the houses?'],
    ['Practice is moved to Thursday.', 'Is it at the same time on Thursday?'], ['Put your boots on the mat.', 'The mat by the front door or the back door?'],
    ['Read chapter two tonight.', 'Do we read all of chapter two?'], ['The trip costs five dollars.', 'Do we bring the five dollars tomorrow?'],
    ['Feed the fish one pinch of food.', 'Once in the morning, or twice a day?'], ['We will plant beans next week.', 'Do we need to bring a pot?'],
    ['Write three facts about owls.', 'Can the facts come from a website?'], ['Grandma arrives on the late bus.', 'What time does the late bus come?'],
    ['Your team will play in the gym.', 'Which gym, the big one or the small one?'], ['Bring a water bottle for the hike.', 'How long is the hike?']];
  var OFFTOPIC = ['What is your favourite food?', 'Can I go now?', 'Do you like cake?', 'Is it sunny?', 'Where is my hat?', 'What is for dinner?', 'Did you see my drawing?', 'Who has a pet?'];
  /* listening steps, and when you do each one */
  var STEPS = { Before: ['Think about what I already know.', 'Guess what it will be about.', 'Turn to face the speaker.'],
    During: ['Picture it in my head.', 'Listen for the main idea.', 'Watch the speaker' + AP + 's face and hands.'],
    After: ['Say back the main idea.', 'Ask about a part I missed.', 'Tell how it connects to me.'] };
  var WHEN = ['Before', 'During', 'After'];
  var FIXES = ['Ask the speaker to say it again.', 'Ask what a word means.', 'Say back what I heard, and check.'];
  var NOFIX = ['Pretend I understood.', 'Stop listening.', 'Talk about something else.'];
  /* [who you are talking to, the formal way, the informal way] */
  var FORMAL = [['the principal', 'Good morning, Ms. Chen. May I ask a question?', 'Hey, can I ask something?'],
    ['the whole school at an assembly', 'Hello, everyone. Today I will tell you about our garden.', 'Hi guys, so like, our garden.'],
    ['a librarian you do not know', 'Excuse me, could you help me find a book about owls?', 'Where are the owl books?'],
    ['an Elder visiting the class', 'Thank you for coming to share your story with us.', 'Thanks, that was cool.'],
    ['a doctor at a check-up', 'My ear has been sore since Monday.', 'My ear is like, ow.'],
    ['a parent helper you have not met', 'Hello, my name is Kai. Nice to meet you.', 'Who are you?'],
    ['a store clerk', 'Excuse me, how much does this cost?', 'How much is this thing?'],
    ['your class at show and tell', 'Good morning, everyone. This is my grandmother' + AP + 's quilt.', 'So, um, this is a blanket thing.'],
    ['a guest speaker', 'Thank you for teaching us about the river.', 'That was OK, I guess.'],
    ['the bus driver', 'Good morning. Thank you for waiting.', 'Wait up!']];
  var CASUAL = ['your best friend', 'your little brother', 'your cousin at a picnic', 'your teammate at practice', 'your sister at home'];
  var VOICE = [['reading to a partner', 'a talking voice'], ['in the library', 'a quiet voice'], ['giving a talk to the class', 'a loud, clear voice'], ['while the baby sleeps', 'a quiet voice'],
    ['chatting with a friend at lunch', 'a talking voice'], ['calling your team on a big field', 'a loud, clear voice'], ['on stage at an assembly', 'a loud, clear voice'],
    ['playing a board game with family', 'a talking voice']];
  var VOICES = ['a quiet voice', 'a talking voice', 'a loud, clear voice'];
  var BODY = [['a nod', 'yes'], ['a head shake', 'no'], ['a thumbs up', 'good job'], ['a shrug', 'I do not know'], ['a wave', 'hello'], ['a finger on your lips', 'please be quiet'],
    ['a raised hand', 'I want to speak'], ['pointing', 'look over there'], ['a frown', 'I am not happy'], ['a big smile', 'I am glad']];
  /* [a sentence with a vague word, the vague word, exact words to use instead] */
  var CLEAR = [['Put the thing on the table.', 'thing', 'red bowl'], ['We saw stuff at the lake.', 'stuff', 'two loons and a beaver'], ['Pass me that.', 'that', 'the blue marker'],
    ['The soup was good.', 'good', 'warm and spicy'], ['I found a thing in the yard.', 'thing', 'smooth grey stone'], ['My bag is full of stuff.', 'stuff', 'books and mitts'],
    ['The movie was good.', 'good', 'funny and exciting'], ['Look at that over there.', 'that', 'the hawk'], ['Can you get the thing for the door?', 'thing', 'key'],
    ['We ate stuff at the party.', 'stuff', 'pizza and cake'], ['The trip was good.', 'good', 'fun and full of surprises'], ['Grandpa fixed the thing.', 'thing', 'broken chair'],
    ['I like that.', 'that', 'your blue scarf'], ['There is stuff on the floor.', 'stuff', 'sand from the beach'], ['Put it over there.', 'it', 'your wet boots'],
    ['My drawing is good.', 'good', 'bright and colourful']];
  function exact(c) { return c[0].replace(new RegExp('\\b' + c[1] + '\\b'), c[2]).replace(/^[a-z]/, function (x) { return x.toUpperCase(); }); }

  /* ---------- a good listener (B1.1) ---------- */
  function goodMoves(lv) {
    return Q.all('Pick every way to <b>listen well</b>.', R.some(GOOD, 2), R.some(BAD, lv > 1 ? 3 : 2), { hint: 'A good listener shows they are listening.', explain: 'Eyes on the speaker, still body, thinking about the words.', meta: { k: 'g3-listen-good' } });
  }
  function clarify(lv) {
    var c = R.pick(CLARIFY);
    return Q.one('Your teacher says this. Which question checks that you understood?', c[1], R.some(OFFTOPIC, lv > 1 ? 2 : 1), { fig: W.means('talk', c[0]),
      prompt: 'Which question is about what was said?', hint: 'A good question is about what the speaker said.', explain: 'A checking question is about the speaker' + AP + 's words.', meta: { k: 'g3-clarify', said: c[0] } });
  }
  function listenTf() {
    var right = R.int(0, 1) === 1, move = R.pick(right ? GOOD : BAD), n = Q.name();
    return { q: 'While the teacher talks, ' + n + ' does this. Is it good listening?', fig: W.sent(move), type: 'tf', answer: right, hint: 'Does it help ' + n + ' hear and understand?',
      explain: right ? 'Yes: it helps you understand.' : 'No: it gets in the way.', meta: { k: 'g3-listen-tf', move: move } };
  }
  function notGood(lv) {
    var bad = R.pick(BAD);
    return Q.tiles('Which one is <b>not</b> good listening?', bad, R.some(GOOD, lv > 1 ? 3 : 2), { hint: 'Which one gets in the way?', explain: '<b>' + bad + '</b> gets in the way of listening.', meta: { k: 'g3-not-listening' } });
  }
  function clarifyTf() {
    var c = R.pick(CLARIFY), right = R.int(0, 1) === 1, asked = right ? c[1] : R.pick(OFFTOPIC);
    return { q: 'The teacher says this. ' + Q.name() + ' asks: <b>' + asked + '</b> Does it check what was said?', fig: W.means('talk', c[0]), type: 'tf', answer: right,
      hint: 'Is the question about the teacher' + AP + 's words?', explain: 'A checking question: ' + c[1], meta: { k: 'g3-clarify-tf', said: c[0], asked: asked } };
  }

  /* ---------- before, during, after (B1.2) ---------- */
  function whenOf(a) { return WHEN.filter(function (w) { return STEPS[w].indexOf(a) >= 0; })[0]; }
  function whenStep() {
    var w = R.pick(WHEN), a = R.pick(STEPS[w]);
    return { q: 'When do you do this?', fig: W.sent(a), type: 'tap', tiles: WHEN.map(function (x) { return x + ' listening'; }), answer: WHEN.indexOf(w),
      hint: 'Before: get ready. During: picture it. After: say it back.', explain: '<b>' + w + '</b> listening.', meta: { k: 'g3-when-step', a: a } };
  }
  function listenOrder() {
    return { q: 'Put these listening steps in order.', type: 'order', items: WHEN.map(function (w) { return R.pick(STEPS[w]); }), first: 'Before', last: 'After', hint: 'Get ready, listen, then say it back.',
      explain: 'Before: think. During: picture it. After: say it back.', meta: { k: 'g3-listen-order' } };
  }
  function matchStep() {
    return { q: 'Match each step to when you do it.', type: 'match', pairs: R.shuffle(WHEN).map(function (w) { return [R.pick(STEPS[w]), w]; }), hint: 'Is it getting ready, listening, or after?',
      explain: 'Before: get ready. During: picture it. After: say it back.', meta: { k: 'g3-match-step' } };
  }
  function hardMessage(lv) {
    return Q.one('A message is <b>hard to understand</b>. What should you do?', R.pick(FIXES), R.some(NOFIX, lv > 1 ? 2 : 1), { hint: 'What would help you understand?',
      explain: 'Ask, or say it back and check.', meta: { k: 'g3-hard-message' } });
  }
  function notSure() {
    var right = R.int(0, 1) === 1, said = right ? 'If I do not understand, I ' + R.pick(['ask a question.', 'ask them to say it again.', 'say back what I heard.']) : 'If I do not understand, I ' + R.pick(['just nod.', 'stop listening.', 'pretend I know.']);
    return { q: Q.name() + ' says:', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['Asking or checking helps you understand.', 'Hiding it helps you understand.'], answer: 0 }, hint: 'What helps you understand?', explain: 'When a message is hard to understand, ask about it.', meta: { k: 'g3-not-sure', said: said } };
  }

  /* ---------- who is listening? (B1.3) ---------- */
  function formal(lv) {
    var f = R.pick(FORMAL);
    return Q.one('You are talking to <b>' + f[0] + '</b>. Which is the best way to say it?', f[1], [f[2]].concat(lv > 1 ? [R.pick(FORMAL.filter(function (x) { return x !== f; }))[2]] : []), {
      prompt: 'Is this a friend, or someone you should be more polite with?', hint: 'For a teacher, a visitor, or a big group, use polite, full sentences.', explain: 'Polite, full sentences fit this audience.', meta: { k: 'g3-formal', who: f[0] } });
  }
  function voiceFor(lv) {
    var v = R.pick(VOICE);
    return Q.tiles('Which voice fits when you are <b>' + v[0] + '</b>?', v[1], VOICES.filter(function (x) { return x !== v[1]; }), { hint: 'Who needs to hear you?', explain: 'Use <b>' + v[1] + '</b>.', meta: { k: 'g3-voice-level', where: v[0] } });
  }
  function formalTf() {
    var f = R.pick(FORMAL), right = R.int(0, 1) === 1, said = right ? f[1] : f[2];
    return { q: 'You are talking to <b>' + f[0] + '</b>. You say this. Does it fit?', fig: W.sent(said), type: 'tf', answer: right, hint: 'Is it polite, with full sentences?',
      explain: 'This fits: ' + f[1], meta: { k: 'g3-formal-tf', who: f[0], said: said } };
  }
  function formalOrNot() {
    var formalOne = R.int(0, 1) === 1, who = formalOne ? R.pick(FORMAL)[0] : R.pick(CASUAL);
    return { q: 'You are talking to <b>' + who + '</b>. Which way of talking fits?', type: 'tap', tiles: ['Formal: polite, full sentences', 'Informal: relaxed, like with a friend'], answer: formalOne ? 0 : 1,
      hint: 'Do you know them well? Is it a big group or a grown-up in charge?', explain: formalOne ? 'Formal fits.' : 'Informal is fine.', meta: { k: 'g3-formal-kind', who: who } };
  }

  /* ---------- your face and hands talk too (B1.4) ---------- */
  function bodyMeans(lv) {
    var b = R.pick(BODY);
    return Q.tiles('What does <b>' + b[0] + '</b> usually mean?', b[1], R.some(BODY.filter(function (x) { return x !== b; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), { hint: 'Try it. What are you saying?', explain: b[0] + ' usually means <b>' + b[1] + '</b>.', meta: { k: 'g3-body', move: b[0] } });
  }
  function matchBody() {
    var b = R.some(BODY, 3);
    return { q: 'Match each move to what it means.', type: 'match', pairs: b.map(function (x) { return [x[0], x[1]]; }), hint: 'Try each move yourself.', explain: 'Your body can talk without words.', meta: { k: 'g3-match-body' } };
  }
  function showIt(lv) {
    var b = R.pick(BODY);
    return Q.tiles('You want to say <b>' + b[1] + '</b> without words. What do you do?', b[0], R.some(BODY.filter(function (x) { return x !== b; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Try each one. Which says it?', explain: '<b>' + b[0] + '</b> says it.', meta: { k: 'g3-show-it', means: b[1] } });
  }
  function bodyTf() {
    var b = R.pick(BODY), right = R.int(0, 1) === 1, said = right ? b[1] : R.pick(BODY.filter(function (x) { return x !== b; }))[1];
    return { q: Q.name() + ' says <b>' + b[0] + '</b> means <b>' + said + '</b>.', type: 'tf', answer: right, hint: 'Try the move. What are you saying?',
      explain: b[0] + ' usually means <b>' + b[1] + '</b>.', meta: { k: 'g3-body-tf', move: b[0], said: said } };
  }

  /* ---------- exact words (B1.5) ---------- */
  function clearer(lv) {
    var c = R.pick(CLEAR);
    return Q.one('Which one is <b>clearer</b> for the listener?', exact(c), [c[0]].concat(lv > 1 ? [R.pick(CLEAR.filter(function (x) { return x !== c; }))[0]] : []), {
      hint: 'Which one tells exactly what you mean?', explain: 'Exact words help listeners understand.', meta: { k: 'g3-clearer' } });
  }
  function vagueWord() {
    var c = R.pick(CLEAR.filter(function (x) { var w = x[0].toLowerCase().split(' '); return w.every(function (y, i) { return w.indexOf(y) === i; }); })), words = c[0].split(' ');
    return { q: 'Tap the word that is <b>not clear</b>.', fig: W.sent(c[0]), type: 'tap', tiles: words, answer: words.findIndex(function (w) { return w.replace(/[.?]$/, '').toLowerCase() === c[1]; }),
      hint: 'Which word could mean almost anything?', explain: W.sent(exact(c)), meta: { k: 'g3-vague-word' } };
  }
  function replaceVague(lv) {
    var c = R.pick(CLEAR.filter(function (x) { return x[1] !== 'good'; }));
    return Q.tiles('Which words make it clearer?', c[2], ['stuff', 'something', 'it'].filter(function (x) { return x !== c[1]; }).slice(0, lv > 1 ? 2 : 1), {
      fig: W.sent(c[0].replace(new RegExp('\\b' + c[1] + '\\b'), '<s>' + c[1] + '</s> ' + W.gap())), hint: 'Which one tells exactly what you mean?', explain: W.sent(exact(c)), meta: { k: 'g3-replace-vague' } });
  }
  function clearTf() {
    var c = R.pick(CLEAR), right = R.int(0, 1) === 1, said = right ? exact(c) : c[0];
    return { q: Q.name() + ' says this. Is it <b>clear</b> for the listener?', fig: W.sent(said), type: 'tf', answer: right, hint: 'Does it say exactly what is meant?',
      explain: 'Clear: ' + exact(c), meta: { k: 'g3-clear-tf', said: said } };
  }

  Atlas.register('talking', {
    full: true,
    lessons: [{
      id: 'listen', title: 'Listening well', sub: 'Show you are listening, and ask when you are not sure.',
      concepts: [
        { slug: 'listen-well', title: 'A good listener', exp: ['B1.1'], skill: 'listening',
          model: [
            step(W.icon('listen'), 'Eyes on the speaker. Body still.'),
            step(W.icon('think'), 'Think about what they say.'),
            step(W.means('talk', 'Bring two things for the bake sale.'), 'Not sure what they mean?'),
            step(W.sent('Two things each, or two for the whole family?'), 'Ask a question about their words.'),
            step(W.sent('<s>What is your favourite food?</s>'), 'Not a question about something else.')
          ],
          guided: [function () { return goodMoves(1); }, function () { return clarify(1); }, listenTf],
          check: [function () { return goodMoves(2); }, clarifyTf, function () { return notGood(2); }, function () { return clarify(2); }, function () { return clarify(3); }],
          coach: '<p>At dinner, let the child give a short message and you "forget" a part. Praise them for asking to check.</p>',
          mistake: '<p>Asking a question about something else. A checking question is about what was just said.</p>' },
        { slug: 'listen-check', title: 'Before, during, after', exp: ['B1.2'], skill: 'listen-steps',
          model: [
            step(W.icon('think'), '<b>Before</b>: what do I already know?'),
            step(W.icon('listen'), '<b>During</b>: picture it in my head.'),
            step(W.icon('talk'), '<b>After</b>: say back the main idea.'),
            step(W.means('talk', 'The trip costs five dollars.'), 'Hard to follow? Fix it.'),
            step(W.sent('Do we bring the five dollars tomorrow?'), 'Ask, then say back what you heard.')
          ],
          guided: [whenStep, listenOrder, function () { return hardMessage(1); }],
          check: [whenStep, notSure, matchStep, function () { return hardMessage(2); }, listenOrder],
          coach: '<p>Before a short podcast or story, ask "What do you know about this?" After, ask "What was it mostly about?"</p>',
          mistake: '<p>Nodding along when lost. Make it normal to say "Can you say that again?"</p>' }
      ]
    }, {
      id: 'speak', title: 'Speaking clearly', sub: 'Fit your words, voice and body to your listener.',
      concepts: [
        { slug: 'audience', title: 'Who is listening?', exp: ['B1.3'], skill: 'audience',
          model: [
            step(W.icon('people'), 'Talking to a friend: <b>informal</b>.'),
            step(W.sent('Hey, can I ask something?'), 'Fine for a friend.'),
            step(W.sent('Good morning, Ms. Chen. May I ask a question?'), 'For the principal: <b>formal</b>, polite, full sentences.'),
            step(W.icon('screen'), 'At an assembly: formal, and a loud, clear voice.'),
            step(W.sent('Hello, everyone. Today I will tell you about our garden.'))
          ],
          guided: [function () { return formal(1); }, formalOrNot, function () { return voiceFor(1); }],
          check: [function () { return formal(2); }, formalTf, function () { return voiceFor(2); }, formalOrNot, function () { return formal(3); }],
          coach: '<p>Role-play ordering at a restaurant, then chatting with a cousin. Talk about what changed.</p>',
          mistake: '<p>Using the same words for everyone. Ask: "Is this a friend, or someone you should be more polite with?"</p>' },
        { slug: 'body', title: 'Your face and hands talk too', exp: ['B1.4'], skill: 'body',
          model: [
            step(W.sent('a nod'), 'Means <b>yes</b>.'),
            step(W.sent('a shrug'), 'Means <b>I do not know</b>.'),
            step(W.sent('The fish was <b>this</b> big!'), 'Hands show the size.'),
            step(W.sent('Then the lights went out...'), 'Wide eyes and a quiet voice: it feels scary.')
          ],
          guided: [function () { return bodyMeans(1); }, function () { return showIt(1); }, matchBody],
          check: [function () { return bodyMeans(2); }, bodyTf, function () { return showIt(2); }, matchBody, function () { return bodyMeans(3); }],
          coach: '<p>Play charades with feelings. Then tell a short story using your face and hands.</p>',
          mistake: '<p>Looking at the floor while talking. Practise looking at the listener' + AP + 's eyes or forehead.</p>' },
        { slug: 'clear-words', title: 'Exact words', exp: ['B1.5'], skill: 'clear-words',
          model: [
            step(W.sent('Put the thing over there.'), 'Which thing? Where?'),
            step(W.sent('Put the <b>red bowl</b> on the <b>table</b>.'), 'Now I know which one, and where.'),
            step(W.sent('The soup was good.'), 'Good how?'),
            step(W.sent('The soup was <b>warm and spicy</b>.'), 'Now I can almost taste it.')
          ],
          guided: [function () { return clearer(1); }, vagueWord, function () { return replaceVague(1); }],
          check: [function () { return clearer(2); }, clearTf, function () { return replaceVague(2); }, vagueWord, function () { return clearer(3); }],
          coach: '<p>Play "describe it": the child describes an object in the room without naming it, and you guess.</p>',
          mistake: '<p>Using "thing" and "stuff". Ask: "Which thing? Tell me more."</p>' }
      ]
    }],
    practice: [
      { id: 'listening', name: 'A good listener', code: 'B1.1', gen: goodMoves },
      { id: 'listen-steps', name: 'Before, during, after', code: 'B1.2', gen: whenStep },
      { id: 'audience', name: 'Who is listening?', code: 'B1.3', gen: formal },
      { id: 'body', name: 'Your face and hands talk too', code: 'B1.4', gen: bodyMeans },
      { id: 'clear-words', name: 'Exact words', code: 'B1.5', gen: clearer }
    ],
    tasks: [
      { id: 'family-talk', title: 'A family conversation', code: 'B1.1', pic: W.icon('people'), say: 'Talk with your family. Listen, take turns, ask one question.',
        run: ['Choose a topic at a meal: a trip, a game, a favourite animal.', 'The child listens, takes turns, and asks at least one question to check or learn more.'],
        rubric: ['Interrupts or does not listen yet.', 'Listens for part of the talk; asks a question with prompting.', 'Listens, takes turns and asks a question.', 'Listens closely and asks a question that shows they understood.'] },
      { id: 'retell', title: 'Listen and retell', code: 'B1.2', pic: W.icon('listen'), say: 'Listen to a story. Then tell it back.',
        run: ['Read a short story aloud, without showing the pictures.', 'Before: ask what the child thinks it will be about. After: the child retells the beginning, middle and end.'],
        rubric: ['Recalls little of it.', 'Recalls some parts, out of order.', 'Retells the main parts in order.', 'Retells in order with details, and says if anything was hard to understand.'] },
      { id: 'talk', title: 'A short talk', code: 'B1.3', pic: W.icon('talk'), say: 'Give a 1-minute talk about something you love.',
        run: ['Help the child choose a topic and three things to say.', 'The child gives the talk to the family, standing up, with a start and an end.'],
        rubric: ['Hard to follow; very quiet.', 'Some ideas; needs reminders about voice.', 'Clear ideas in order, with a voice that fits the audience.', 'Clear, interesting, and connects with the listeners (for example, asks them a question).'] },
      { id: 'act-it', title: 'Tell it with your face and hands', code: 'B1.4', pic: W.icon('people'), say: 'Tell a story. Use your face, hands and voice.',
        run: ['The child retells a favourite story or a moment from their day.', 'Encourage facial expression, gestures and a voice that changes with feelings.'],
        rubric: ['Little expression yet.', 'Some expression with prompting.', 'Uses face, hands and voice to add meaning.', 'Expression clearly adds to the story and keeps listeners interested.'] },
      { id: 'describe', title: 'Describe it so I can guess', code: 'B1.5', pic: W.icon('think'), say: 'Describe something. Do not say its name.',
        run: ['Hide an object in a bag. The child describes it (size, shape, colour, use) without naming it.', 'You guess. Then swap.'],
        rubric: ['Uses few describing words.', 'Some describing words; some vague words like "thing".', 'Clear, exact words in full sentences.', 'Exact, varied words, including new vocabulary.'] }
    ]
  });

  Q.shapes('talking', {
    listening: [[1, 'clarify', clarify], [1, 'true-false', listenTf], [2, 'not-listening', notGood], [2, 'clarify-true-false', clarifyTf]],
    'listen-steps': [[1, 'order', listenOrder], [1, 'match', matchStep], [1, 'hard-message', hardMessage], [2, 'true-false', notSure]],
    audience: [[1, 'formal-or-not', formalOrNot], [1, 'voice', voiceFor], [2, 'true-false', formalTf]],
    body: [[1, 'show-it', showIt], [1, 'match', matchBody], [2, 'true-false', bodyTf]],
    'clear-words': [[1, 'vague-word', vagueWord], [1, 'replace', replaceVague], [2, 'true-false', clearTf]]
  });
})();
