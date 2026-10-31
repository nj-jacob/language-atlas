/* Grade 3: listening and speaking.
   Ontario 2023 Language, Grade 3, B1 Oral and Non-Verbal Communication:
   B1.1 effective listening, including asking questions to clarify       B1.2 listening strategies before, during and after listening
   B1.3 purpose and audience for speaking, formal and informal          B1.4 oral and non-verbal strategies (expression, gestures, body language)
   B1.5 word choice, grammar and cohesive sentences when speaking
   The computer checks knowing what to do. Listening and speaking themselves are activities with a grown-up, marked with a rubric.
   Answer checks: tests/verify/grade3-talking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var GOOD = ['Look at the speaker.', 'Keep my body still.', 'Think about what they say.', 'Wait for my turn to talk.', 'Ask a question if I am not sure.'];
  var BAD = ['Play with something in my hands.', 'Talk at the same time.', 'Look out the window.', 'Think about lunch.'];
  /* what someone said, a question that checks you understood, and questions that do not */
  var CLARIFY = [['We meet at the front doors at nine.', 'Did you say the front doors?', ['What is your favourite food?', 'Can I go now?']],
    ['Bring two things for the bake sale.', 'Two things each, or two for the whole family?', ['Do you like cake?', 'Is it sunny?']],
    ['The library is closed on Monday.', 'Is it open again on Tuesday?', ['Can I have a snack?', 'Where is my hat?']],
    ['Draw a map of your street.', 'Should I label the houses?', ['What is for dinner?', 'Can we go outside?']]];
  var LISTEN_STEPS = ['Before: think about what I already know.', 'During: look at the speaker and picture it.', 'After: say back the main idea.'];
  /* [who you are talking to, the formal way, the informal way] */
  var FORMAL = [['the principal', 'Good morning, Ms. Chen. May I ask a question?', 'Hey, can I ask something?'],
    ['the whole school at an assembly', 'Hello, everyone. Today I will tell you about our garden.', 'Hi guys, so like, our garden.'],
    ['a librarian you do not know', 'Excuse me, could you help me find a book about owls?', 'Where are the owl books?'],
    ['an Elder visiting the class', 'Thank you for coming to share your story with us.', 'Thanks, that was cool.']];
  var BODY = [['a nod', 'yes'], ['a thumbs up', 'good job'], ['a shrug', 'I do not know'], ['a wave', 'hello'], ['a finger on your lips', 'please be quiet']];
  var VOICE = [['reading to a partner', 'a talking voice'], ['in the library', 'a quiet voice'], ['giving a talk to the class', 'a loud, clear voice']];
  var CLEAR = [['Put the thing over there.', 'Put the red bowl on the table.'], ['It was good.', 'The soup was warm and tasted of ginger.'], ['We did stuff.', 'We skated on the pond, then drank hot cocoa.'],
    ['Get that.', 'Please pass me the blue marker.']];

  /* ---------- question makers ---------- */
  function goodMoves() {
    return Q.all('Pick every way to <b>listen well</b>.', R.some(GOOD, 2), R.some(BAD, 2), { hint: 'A good listener shows they are listening.', explain: 'Eyes on the speaker, still body, thinking about the words.', meta: { k: 'g3-listen-good' } });
  }
  function clarify(lv) {
    var c = R.pick(CLARIFY);
    return Q.one('Your teacher says this. Which question checks that you understood?', c[1], c[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('talk', c[0]),
      prompt: 'Which question is about what was said?', hint: 'A good question is about what the speaker said.', explain: 'A checking question is about the speaker’s words.', meta: { k: 'g3-clarify', said: c[0] } });
  }
  function notSure() {
    var right = R.int(0, 1) === 1, said = right ? 'If I do not understand, I ask a question.' : 'If I do not understand, I just nod.';
    return { q: Q.name() + ' says:', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['Asking helps you understand.', 'Nodding helps you understand.'], answer: 0 }, hint: 'What helps you understand?', explain: 'When a message is hard to understand, ask about it.', meta: { k: 'g3-not-sure', said: said } };
  }
  function listenOrder() {
    return { q: 'Put these listening steps in order.', type: 'order', items: LISTEN_STEPS.slice(), first: 'Before', last: 'After', hint: 'Before, during, after.', explain: 'Think first, picture it while you listen, then say it back.', meta: { k: 'g3-listen-order' } };
  }

  function formal(lv) {
    var f = R.pick(FORMAL);
    return Q.one('You are talking to <b>' + f[0] + '</b>. Which is the best way to say it?', f[1], [f[2]].concat(lv > 1 ? [R.pick(FORMAL.filter(function (x) { return x !== f; }))[2]] : []), {
      prompt: 'Is this a friend, or someone you should be more polite with?', hint: 'For a teacher, a visitor, or a big group, use polite, full sentences.', explain: 'Polite, full sentences fit this audience.', meta: { k: 'g3-formal', who: f[0] } });
  }
  function matchBody() {
    var b = R.some(BODY, 3);
    return { q: 'Match each move to what it means.', type: 'match', pairs: b.map(function (x) { return [x[0], x[1]]; }), hint: 'Try each move yourself.', explain: 'Your body can talk without words.', meta: { k: 'g3-match-body' } };
  }
  function bodyMeans() {
    var b = R.pick(BODY);
    return Q.tiles('What does <b>' + b[0] + '</b> usually mean?', b[1], R.some(BODY.filter(function (x) { return x !== b; }), 2).map(function (x) { return x[1]; }), { hint: 'Try it. What are you saying?', explain: b[0] + ' usually means <b>' + b[1] + '</b>.', meta: { k: 'g3-body', move: b[0] } });
  }
  function voiceFor() {
    var v = R.pick(VOICE);
    return Q.tiles('Which voice fits when you are <b>' + v[0] + '</b>?', v[1], VOICE.filter(function (x) { return x !== v; }).map(function (x) { return x[1]; }), { hint: 'Who needs to hear you?', explain: 'Use <b>' + v[1] + '</b>.', meta: { k: 'g3-voice-level', where: v[0] } });
  }
  function clearer() {
    var c = R.pick(CLEAR);
    return Q.one('Which one is <b>clearer</b> for the listener?', c[1], [c[0]], { hint: 'Which one tells exactly what you mean?', explain: 'Exact words help listeners understand.', meta: { k: 'g3-clearer' } });
  }

  Atlas.register('talking', {
    lessons: [{
      id: 'listen', title: 'Listening well', sub: 'Show you are listening, and ask when you are not sure.',
      concepts: [
        { slug: 'listen-well', title: 'A good listener', exp: ['B1.1'], skill: 'listening',
          model: [
            step(W.icon('listen'), 'Eyes on the speaker.'),
            step(W.icon('think'), 'Think about what they say.'),
            step(W.icon('talk'), 'Wait for your turn, then ask a question.')
          ],
          key: '<p>Look, think, wait, then ask.</p>',
          guided: [goodMoves, function () { return clarify(1); }],
          check: [goodMoves, function () { return clarify(2); }],
          coach: '<p>At dinner, let the child give a short message and you "forget" a part. Praise them for asking to check.</p>',
          mistake: '<p>Asking a question about something else. A checking question is about what was just said.</p>' },
        { slug: 'listen-check', title: 'Before, during, after', exp: ['B1.2'], skill: 'listening',
          model: [
            step(W.icon('think'), '<b>Before</b>: what do I already know?'),
            step(W.icon('listen'), '<b>During</b>: picture it in my head.'),
            step(W.icon('talk'), '<b>After</b>: say back the main idea. Not sure? Ask.')
          ],
          key: '<p>Before: think. During: picture it. After: say it back.</p>',
          guided: [listenOrder, notSure],
          check: [notSure, listenOrder],
          coach: '<p>Before a short podcast or story, ask "What do you know about this?" After, ask "What was it mostly about?"</p>',
          mistake: '<p>Nodding along when lost. Make it normal to say "Can you say that again?"</p>' }
      ]
    }, {
      id: 'speak', title: 'Speaking clearly', sub: 'Fit your words, voice and body to your listener.',
      concepts: [
        { slug: 'audience', title: 'Who is listening?', exp: ['B1.3'], skill: 'speaking',
          model: [
            step(W.icon('people'), 'Talking to a friend: <b>informal</b>.'),
            step(W.sent('Hey, can I ask something?'), 'Fine for a friend.'),
            step(W.sent('Good morning, Ms. Chen. May I ask a question?'), 'For the principal: <b>formal</b>, polite, full sentences.')
          ],
          key: '<p>Think about who is listening. Then choose your words.</p>',
          guided: [function () { return formal(1); }, voiceFor],
          check: [function () { return formal(2); }, voiceFor],
          coach: '<p>Role-play ordering at a restaurant, then chatting with a cousin. Talk about what changed.</p>',
          mistake: '<p>Using the same words for everyone. Ask: "Is this a friend, or someone you should be more polite with?"</p>' },
        { slug: 'body', title: 'Your face and hands talk too', exp: ['B1.4'], skill: 'speaking',
          model: [
            step(W.sent('a nod'), 'Means <b>yes</b>.'),
            step(W.sent('a shrug'), 'Means <b>I do not know</b>.'),
            step(W.icon('people'), 'Smile, look at your listeners, and use your hands to show size or shape.')
          ],
          key: '<p>Face, hands and body add to your words.</p>',
          guided: [bodyMeans, bodyMeans],
          check: [matchBody, bodyMeans],
          coach: '<p>Play charades with feelings. Then tell a short story using your face and hands.</p>',
          mistake: '<p>Looking at the floor while talking. Practise looking at the listener’s eyes or forehead.</p>' },
        { slug: 'clear-words', title: 'Exact words', exp: ['B1.5'], skill: 'speaking',
          model: [
            step(W.sent('Put the thing over there.'), 'Which thing? Where?'),
            step(W.sent('Put the <b>red bowl</b> on the <b>table</b>.'), 'Exact words. Now I know.')
          ],
          key: '<p>Say exactly what you mean, in full sentences.</p>',
          guided: [clearer, clearer],
          check: [clearer, clearer],
          coach: '<p>Play "describe it": the child describes an object in the room without naming it, and you guess.</p>',
          mistake: '<p>Using "thing" and "stuff". Ask: "Which thing? Tell me more."</p>' }
      ]
    }],
    practice: [
      { id: 'listening', name: 'Listening well', code: 'B1.1, B1.2', gen: goodMoves },
      { id: 'speaking', name: 'Speaking clearly', code: 'B1.3, B1.4, B1.5', gen: formal }
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
    listening: [[1, 'clarify', clarify], [1, 'not-sure', notSure], [1, 'order', listenOrder]],
    speaking: [[1, 'body', bodyMeans], [1, 'voice', voiceFor], [1, 'clearer', clearer], [2, 'match-body', matchBody]]
  });
})();
