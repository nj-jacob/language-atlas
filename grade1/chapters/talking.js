/* Grade 1: listening and speaking.
   Ontario 2023 Language, Grade 1, B1 Oral and Non-Verbal Communication:
   B1.1 listening attentively and asking relevant questions                 B1.2 listening strategies before, during and after listening
   B1.3 purpose and audience; taking turns, knowing when to speak and how much to say
   B1.4 expression, gestures and body language                              B1.5 word choice, new vocabulary, grammar and clear sentences when speaking
   The computer checks knowing what to do. Listening and speaking themselves are activities with a grown-up, marked with a rubric.
   Answer checks: tests/verify/grade1-talking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var GOOD = ['Look at the person talking.', 'Keep my hands still.', 'Think about the words.', 'Wait until they finish.'];
  var BAD = ['Talk to my friend at the same time.', 'Play with my shoelaces.', 'Look out the window.', 'Hum a song.'];
  /* what someone said, a question about it, and questions about something else */
  var ASKS = [['I got a new puppy.', 'What is its name?', ['Do you like pizza?', 'Is it raining?']], ['We went camping on the weekend.', 'Where did you camp?', ['What is your favourite colour?', 'Can I have a snack?']],
    ['My grandma is visiting from Winnipeg.', 'How long is she staying?', ['Do you have a bike?', 'What time is lunch?']], ['I made a card for my teacher.', 'What did you draw on it?', ['Is it Friday?', 'Can I go outside?']],
    ['I lost my first tooth.', 'Did it hurt?', ['Do you like hockey?', 'What is for dinner?']]];
  var STEPS = ['Before: think about what I know.', 'During: look and picture it.', 'After: tell it back.'];
  /* [the question, an answer of the right size, too little, too much] */
  var SIZE = [['What colour is your coat?', 'It is blue.', 'Um.', 'It is blue and I got it at the store and the store had shoes and we had lunch and then we went home.'],
    ['What did you have for lunch?', 'I had a sandwich and an apple.', 'Food.', 'I had a sandwich, and my brother had a sandwich, and my cousin likes sandwiches, and we have a dog.'],
    ['What is your favourite animal?', 'I like owls best.', 'Animals.', 'Owls, and also bears, and also fish, and my uncle has a fish, and he lives far away, and I visited him once.']];
  var WHEN = ['when the speaker stops', 'when it is my turn', 'when I put up my hand and am asked'];
  var NOTWHEN = ['while someone else is talking', 'whenever I think of something', 'in the middle of a story'];
  /* [what the body does, what it shows] */
  var BODY = [['a big smile and arms up high', 'excited'], ['a frown and crossed arms', 'angry'], ['head down and tears', 'sad'], ['wide eyes and hands over the mouth', 'surprised'], ['a yawn and droopy eyes', 'tired']];
  var MOVES = [['a nod', 'yes'], ['shaking your head', 'no'], ['a wave', 'hello'], ['a shrug', 'I do not know'], ['a thumbs up', 'good']];
  var VOICES = [['in the library', 'a quiet voice'], ['on the playground', 'a loud voice'], ['talking to a friend at the table', 'a talking voice']];
  var CLEAR = [['Give me that.', 'Please pass me the red crayon.'], ['It was fun.', 'We built a snow fort in the park.'], ['Put it there.', 'Put the book on the shelf.'], ['I saw a thing.', 'I saw a fox in our yard.']];

  /* ---------- question makers: listening ---------- */
  function goodListen() {
    return Q.all('Pick every way to <b>listen well</b>.', R.some(GOOD, 2), R.some(BAD, 2), { hint: 'A good listener shows they are listening.', explain: 'Eyes on the speaker, still hands, thinking about the words.', meta: { k: 'g1-good-listen' } });
  }
  function askAbout(lv) {
    var a = R.pick(ASKS);
    return Q.one('Your friend says this. Which question is about what they said?', a[1], a[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('talk', a[0]),
      prompt: 'Which question goes with the friend' + '’' + 's words?', hint: 'A good question is about what the speaker just said.', explain: 'It asks about what your friend said.', meta: { k: 'g1-ask-about', said: a[0] } });
  }
  function listenOrder() {
    return { q: 'Put the listening steps in order.', type: 'order', items: STEPS.slice(), first: 'Before', last: 'After', hint: 'Before, during, after.', explain: 'Think, picture it, then tell it back.', meta: { k: 'g1-listen-order' } };
  }
  function lostTf() {
    var right = R.int(0, 1) === 1, said = right ? 'If I do not understand, I ask a question.' : 'If I do not understand, I just stay quiet.';
    return { q: Q.name() + ' says:', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['Asking helps you understand.', 'Staying quiet helps you understand.'], answer: 0 },
      hint: 'What helps you understand?', explain: 'When you do not understand, ask.', meta: { k: 'g1-lost-tf', said: said } };
  }

  /* ---------- question makers: speaking ---------- */
  function whenTalk(lv) {
    return Q.one('When is a good time to talk in a group?', R.pick(WHEN), R.some(NOTWHEN, lv > 1 ? 2 : 1), { prompt: 'Think about taking turns.', hint: 'Wait for your turn.',
      explain: 'Take turns: talk when the speaker stops or when it is your turn.', meta: { k: 'g1-when-talk' } });
  }
  function howMuch(lv) {
    var s = R.pick(SIZE);
    return Q.one('Someone asks: <b>' + s[0] + '</b> Which answer says just enough?', s[1], s.slice(2, lv > 1 ? 4 : 3), { prompt: 'Not too little. Not too much.',
      hint: 'Answer the question, in a full sentence, then stop.', explain: '"' + s[1] + '" answers the question in one clear sentence.', meta: { k: 'g1-how-much', ask: s[0] } });
  }
  function feelsFrom(lv) {
    var b = R.pick(BODY);
    return Q.tiles('Someone has <b>' + b[0] + '</b>. How do they feel?', b[1], R.some(BODY.filter(function (x) { return x !== b; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      prompt: 'Make the face yourself. How do you feel?', hint: 'Faces and bodies show feelings.', explain: b[0] + ' shows they feel <b>' + b[1] + '</b>.', meta: { k: 'g1-feels-from', body: b[0] } });
  }
  function moveMeans() {
    var m = R.pick(MOVES);
    return Q.tiles('What does <b>' + m[0] + '</b> mean?', m[1], R.some(MOVES.filter(function (x) { return x !== m; }), 2).map(function (x) { return x[1]; }), {
      hint: 'Try it. What are you saying without words?', explain: m[0] + ' means <b>' + m[1] + '</b>.', meta: { k: 'g1-move-means', move: m[0] } });
  }
  function matchMove() {
    var ms = R.some(MOVES, 3);
    return { q: 'Match each move to what it means.', type: 'match', pairs: ms.map(function (m) { return [m[0], m[1]]; }), hint: 'Try each move.', explain: 'Your body talks without words.', meta: { k: 'g1-match-move' } };
  }
  function voiceFor() {
    var v = R.pick(VOICES);
    return Q.tiles('Which voice fits <b>' + v[0] + '</b>?', v[1], VOICES.filter(function (x) { return x !== v; }).map(function (x) { return x[1]; }), {
      hint: 'Who needs to hear you? Who might you bother?', explain: v[0] + ': <b>' + v[1] + '</b>.', meta: { k: 'g1-voice-fits', where: v[0] } });
  }
  function clearer() {
    var c = R.pick(CLEAR);
    return Q.one('Which is <b>clearer</b>?', c[1], [c[0]], { prompt: 'Which one tells exactly what you mean?', hint: 'Name the thing, and say where.', explain: 'Exact words help the listener.', meta: { k: 'g1-clearer' } });
  }

  Atlas.register('talking', {
    lessons: [{
      id: 'listen', title: 'Listening well', sub: 'Look, think, and ask about what you hear.',
      concepts: [
        { slug: 'listen', title: 'Show you are listening', exp: ['B1.1'], skill: 'listening',
          model: [
            step(W.icon('listen'), 'Eyes on the person talking.'),
            step(W.icon('think'), 'Think about the words.'),
            step(W.icon('talk'), 'When they finish, ask about what they said.')
          ],
          guided: [goodListen, function () { return askAbout(1); }],
          check: [goodListen, function () { return askAbout(2); }],
          coach: '<p>Tell the child about your day in three sentences. Ask them to ask you one question about it.</p>',
          mistake: '<p>Asking about something else ("Can I have a snack?"). Say: "Ask me about what I just told you."</p>' },
        { slug: 'steps', title: 'Before, during, after', exp: ['B1.2'], skill: 'listening',
          model: [
            step(W.icon('think'), '<b>Before</b>: what do I know about it?'),
            step(W.icon('listen'), '<b>During</b>: look, and picture it.'),
            step(W.icon('talk'), '<b>After</b>: tell it back. Not sure? Ask.')
          ],
          guided: [listenOrder, lostTf],
          check: [lostTf, listenOrder],
          coach: '<p>Before a story, ask what the child knows about the topic. After, ask them to tell you what happened.</p>',
          mistake: '<p>Staying quiet when lost. Make "Can you say that again?" a normal thing to say.</p>' }
      ]
    }, {
      id: 'speak', title: 'Speaking clearly', sub: 'Take turns, say enough, and use your face and voice.',
      concepts: [
        { slug: 'turns', title: 'Take turns', exp: ['B1.3'], skill: 'speaking',
          model: [
            step(W.icon('people'), 'One person talks. The others listen.'),
            step(W.icon('talk'), 'Wait until they stop.'),
            step(W.sent('It is blue.'), 'Answer what was asked, then stop.')
          ],
          guided: [function () { return whenTalk(1); }, function () { return howMuch(1); }],
          check: [function () { return whenTalk(2); }, function () { return howMuch(2); }],
          coach: '<p>Pass a "talking stone" at dinner. Only the person holding it talks.</p>',
          mistake: '<p>Telling a long story when a short answer was asked for. Ask: "What was the question?"</p>' },
        { slug: 'body', title: 'Faces and hands talk too', exp: ['B1.4'], skill: 'speaking',
          model: [
            step(W.sent('a big smile and arms up high'), 'Excited.'),
            step(W.sent('a nod'), 'Yes.'),
            step(W.icon('people'), 'Look at your listener while you talk.')
          ],
          guided: [function () { return feelsFrom(1); }, moveMeans],
          check: [function () { return feelsFrom(2); }, matchMove],
          coach: '<p>Play "guess my feeling": make a face and body shape, and the child names the feeling. Swap.</p>',
          mistake: '<p>Looking at the floor while talking. Practise looking at the listener.</p>' },
        { slug: 'words', title: 'Clear words', exp: ['B1.5'], skill: 'speaking',
          model: [
            step(W.sent('Give me that.'), 'Which thing?'),
            step(W.sent('Please pass me the <b>red crayon</b>.'), 'Now I know.')
          ],
          key: '<p>Name the thing. Say it in a full sentence.</p>',
          guided: [clearer, voiceFor],
          check: [clearer, voiceFor],
          coach: '<p>Play "describe it": the child describes something in the room without naming it, and you guess.</p>',
          mistake: '<p>Using "that" and "thing". Ask: "Which thing? Tell me more."</p>' }
      ]
    }],
    practice: [
      { id: 'listening', name: 'Listening well', code: 'B1.1, B1.2', gen: goodListen },
      { id: 'speaking', name: 'Speaking clearly', code: 'B1.3, B1.4, B1.5', gen: howMuch }
    ],
    tasks: [
      { id: 'ask-me', title: 'Ask me a question', code: 'B1.1', pic: W.icon('listen'), say: 'Listen to your grown-up. Then ask a question about it.',
        run: ['Tell the child something short about your day or a memory.', 'The child listens, waits until you finish, and asks a question about it.', 'Do this three times over a week.'],
        rubric: ['Does not listen yet, or interrupts.', 'Listens for part; asks an unrelated question.', 'Listens and asks a question about what was said.', 'Listens closely and asks a question that shows real interest.'] },
      { id: 'tell-back', title: 'Listen and tell it back', code: 'B1.2', pic: W.icon('read'), say: 'Listen to a story. Then tell what happened.',
        run: ['Before reading: ask what the child thinks the story is about.', 'Read a short picture book aloud.', 'After: the child tells the beginning, middle and end.'],
        rubric: ['Recalls very little.', 'Recalls a part or two.', 'Tells the beginning, middle and end.', 'Tells it in order with details.'] },
      { id: 'show-tell', title: 'Show and tell', code: 'B1.3', pic: W.icon('talk'), say: 'Show something special. Tell three things about it.',
        run: ['The child picks an object to show the family.', 'They say what it is and three things about it, then take one question.', 'Talk about taking turns: the family listens, then asks.'],
        rubric: ['Says a word or two.', 'Says one or two things; needs prompting.', 'Says three things clearly and takes a question.', 'Speaks clearly, looks at the listeners, and answers questions well.'] },
      { id: 'feelings', title: 'Show a feeling', code: 'B1.4', pic: W.icon('people'), say: 'Tell a short story. Use your face and voice to show how you felt.',
        run: ['The child tells about a time they felt happy, scared or surprised.', 'Encourage a face, hands and voice that match the feeling.'],
        rubric: ['Little expression yet.', 'Some expression with prompting.', 'Face and voice match the feeling.', 'Expression makes the story come alive for the listener.'] },
      { id: 'new-word', title: 'Use a new word', code: 'B1.5', pic: W.icon('star'), say: 'Use a new word when you talk today.',
        run: ['Choose a new word together (enormous, delicious, gentle).', 'The child uses it in a full sentence when talking, at least twice that day.'],
        rubric: ['Does not use the word yet.', 'Uses it once with a reminder.', 'Uses it correctly in full sentences.', 'Uses it correctly and naturally, without reminders.'] }
    ]
  });

  Q.shapes('talking', {
    listening: [[1, 'ask-about', askAbout], [1, 'order', listenOrder], [1, 'lost', lostTf]],
    speaking: [[1, 'when', whenTalk], [1, 'feels', feelsFrom], [1, 'move', moveMeans], [1, 'voice', voiceFor], [1, 'clearer', clearer], [2, 'match', matchMove]]
  });
})();
