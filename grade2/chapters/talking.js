/* Grade 2: listening and speaking.
   Ontario 2023 Language, Grade 2, B1 Oral and Non-Verbal Communication:
   B1.1 effective listening, including asking relevant questions, restating what they heard, and expressing interest
   B1.2 listening strategies before, during and after listening, and recognizing when a message is difficult to understand
   B1.3 purpose and audience for speaking, and speaking strategies, including taking turns and staying on topic
   B1.4 oral and non-verbal strategies, including expression, gestures and body language
   B1.5 word choice, including new vocabulary, grammar and cohesive sentences when speaking
   The computer checks knowing what to do. Listening and speaking themselves are activities with a grown-up, marked with a rubric.
   Answer checks: tests/verify/grade2-talking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* [what a friend says, a question that fits, questions that do not] */
  var ASK = [['I went camping last weekend.', 'Where did you sleep?', ['Do you like pizza?', 'Can I have your pencil?']],
    ['My grandma taught me to make dumplings.', 'What did you put inside them?', ['What time is it?', 'Is it raining?']],
    ['Our class has a new fish.', 'What colour is it?', ['Where is the gym?', 'Do you have a dog?']],
    ['I lost my first tooth!', 'Did it hurt?', ['Can we play tag?', 'What is for lunch?']]];
  /* [what someone said, saying it back, wrong say-backs] */
  var BACK = [['Put your boots by the door, then wash your hands.', 'Boots by the door, then wash my hands.', ['Wash the boots.', 'Hands by the door.']],
    ['The library trip is on Thursday. Bring your book.', 'Thursday, and bring my book.', ['The trip is today.', 'Bring a snack on Friday.']],
    ['Feed the cat one scoop of food.', 'One scoop for the cat.', ['Two scoops for the dog.', 'Feed the fish.']]];
  var INTEREST = ['Nod and look at them.', 'Say, "Wow, tell me more!"', 'Ask a question about it.'];
  var BORED = ['Look at a screen.', 'Yawn and look away.', 'Start talking about something else.'];
  var HARD = ['Ask them to say it again.', 'Say what part you did not understand.'];
  var NOT = ['Pretend you understood.', 'Walk away.'];
  var STEPS = ['Before: think about what it will be about.', 'During: look at the speaker and picture it.', 'After: say back what you heard.'];
  /* a topic, an idea that stays on it, ideas that wander off */
  var TOPIC = [['our trip to the farm', 'We fed the goats.', ['My shoes are new.', 'I like the colour blue.']], ['how to plant a seed', 'Push the seed into the soil.', ['My cat is orange.', 'We had pasta.']],
    ['our favourite winter game', 'We love sledding down the big hill.', ['My cousin lives in Regina.', 'Summer is hot.']]];
  var TURN = ['Wait until the speaker stops.', 'Raise your hand in a group.', 'Let everyone have a turn.'];
  var NOTURN = ['Talk at the same time.', 'Keep talking so no one else can.'];
  /* [face or body move, what it shows] */
  var BODY = [['a big smile', 'happy'], ['a frown', 'upset'], ['wide eyes', 'surprised'], ['a shrug', 'not sure'], ['a thumbs up', 'it is good']];
  var WHO = [['your teacher', 'Excuse me, may I get a drink of water?', 'Gimme water.'], ['a visitor to the class', 'Hello, thank you for coming.', 'Hey you.'],
    ['your best friend', 'Want to play tag?', 'Would you kindly join me in a game of tag?']];
  var CLEAR = [['I saw a thing.', 'I saw a big grey heron by the pond.'], ['It was fun.', 'Building the snow fort was so much fun.'], ['Give me that.', 'Please pass me the green crayon.'],
    ['We went there.', 'We went to the science centre.']];

  /* ---------- question makers ---------- */
  function goodQuestion(lv) {
    var a = R.pick(ASK);
    return Q.one('Your friend says this. Which question fits best?', a[1], a[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('talk', a[0]), prompt: 'Which question is about what your friend said?',
      hint: 'A good question stays on what the speaker said.', explain: 'It is about what your friend told you.', meta: { k: 'g2-good-question', said: a[0] } });
  }
  function sayBack(lv) {
    var b = R.pick(BACK);
    return Q.one('Which is the best way to <b>say it back</b>?', b[1], b[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('talk', b[0]), hint: 'Say the main words again, in the same order.',
      explain: 'Saying it back shows you heard it right.', meta: { k: 'g2-say-back', said: b[0] } });
  }
  function interest() {
    return Q.all('Pick every way to show you are <b>interested</b>.', R.some(INTEREST, 2), R.some(BORED, 2), { hint: 'How do you show you care about what they say?', explain: 'Nod, look, ask, and say "Tell me more!"', meta: { k: 'g2-interest' } });
  }
  function hardToHear() {
    return Q.one('You did not understand what someone said. What should you do?', R.pick(HARD), NOT, { hint: 'It is fine to ask.', explain: 'Ask them to say it again, or say which part was hard.', meta: { k: 'g2-hard' } });
  }
  function listenOrder() {
    return { q: 'Put the listening steps in order.', type: 'order', items: STEPS.slice(), first: 'Before', last: 'After', hint: 'Before, during, after.', explain: 'Think first, picture it, then say it back.', meta: { k: 'g2-listen-order' } };
  }

  function onTopic(lv) {
    var t = R.pick(TOPIC);
    return Q.one('You are talking about <b>' + t[0] + '</b>. Which idea stays on topic?', t[1], t[2].slice(0, lv > 1 ? 2 : 1), { hint: 'Does it tell about ' + t[0] + '?', explain: 'It is about ' + t[0] + '.', meta: { k: 'g2-on-topic', topic: t[0] } });
  }
  function turns() {
    return Q.all('Pick every way to <b>take turns</b> when you talk.', R.some(TURN, 2), NOTURN, { hint: 'Everyone gets a chance.', explain: 'Wait, raise your hand, and let everyone talk.', meta: { k: 'g2-turns' } });
  }
  function bodyMeans() {
    var b = R.pick(BODY);
    return Q.tiles('What does <b>' + b[0] + '</b> usually show?', b[1], R.some(BODY.filter(function (x) { return x !== b; }), 2).map(function (x) { return x[1]; }), { hint: 'Try it with your own face or body.',
      explain: b[0] + ' usually shows <b>' + b[1] + '</b>.', meta: { k: 'g2-body', move: b[0] } });
  }
  function bodyMatch() {
    var b = R.some(BODY, 3);
    return { q: 'Match each one to what it shows.', type: 'match', pairs: b.map(function (x) { return [x[0], x[1]]; }), hint: 'Try each one.', explain: 'Your face and body help tell your meaning.', meta: { k: 'g2-body-match' } };
  }
  function whoFor() {
    var w = R.pick(WHO);
    return Q.one('You are talking to <b>' + w[0] + '</b>. Which fits best?', w[1], [w[2]], { prompt: 'Is it a friend, or someone to be more polite with?', hint: 'Friends: easy, friendly words. Teachers and visitors: polite words.',
      explain: 'This one fits ' + w[0] + '.', meta: { k: 'g2-who-for', who: w[0] } });
  }
  function clearer() {
    var c = R.pick(CLEAR);
    return Q.one('Which one is <b>clearer</b> for the listener?', c[1], [c[0]], { hint: 'Which one tells exactly what you mean?', explain: 'Exact words help listeners understand.', meta: { k: 'g2-clearer' } });
  }

  Atlas.register('talking', {
    lessons: [{
      id: 'listen', title: 'Listening well', sub: 'Show interest, ask, and say it back.',
      concepts: [
        { slug: 'interest', title: 'Show you are listening', exp: ['B1.1'], skill: 'listening',
          model: [
            step(W.icon('listen'), 'Look at the speaker. Nod.'),
            step(W.means('talk', 'Wow, tell me more!')),
            step(W.means('talk', 'Where did you sleep?'), 'Ask a question about it.')
          ],
          guided: [interest, function () { return goodQuestion(1); }],
          check: [interest, function () { return goodQuestion(2); }],
          coach: '<p>At dinner, take turns telling one thing about your day. The listener asks one question about it.</p>',
          mistake: '<p>Asking about something else entirely. Ask: "Is your question about what they said?"</p>' },
        { slug: 'say-back', title: 'Say it back', exp: ['B1.1', 'B1.2'], skill: 'listening',
          model: [
            step(W.means('talk', 'Put your boots by the door, then wash your hands.')),
            step(W.means('think', 'Boots by the door, then wash my hands.'), 'The main words, in order.'),
            step(W.icon('again'), 'Not sure? Ask them to say it again.')
          ],
          guided: [function () { return sayBack(1); }, hardToHear],
          check: [function () { return sayBack(2); }, listenOrder],
          coach: '<p>Give two-step instructions and ask the child to say them back before doing them.</p>',
          mistake: '<p>Doing only the last step. Saying it back helps the child keep both steps.</p>' }
      ]
    }, {
      id: 'speak', title: 'Speaking clearly', sub: 'Take turns, stay on topic, and use your face and words.',
      concepts: [
        { slug: 'turns-topic', title: 'Take turns and stay on topic', exp: ['B1.3'], skill: 'speaking',
          model: [
            step(W.icon('people'), 'One person talks. The others listen.'),
            step(W.sent('Topic: our trip to the farm'), 'Every idea is about the farm.'),
            step(W.sent('We fed the goats.'), 'On topic.')
          ],
          guided: [turns, function () { return onTopic(1); }],
          check: [whoFor, function () { return onTopic(2); }],
          coach: '<p>Use a talking object: only the person holding it speaks. Pick a topic and see who can stay on it.</p>',
          mistake: '<p>Jumping to a new topic. Gently ask: "Is that about the farm?"</p>' },
        { slug: 'body', title: 'Your face and body help you talk', exp: ['B1.4'], skill: 'speaking',
          model: [
            step(W.icon('people'), 'Wide eyes: surprised.'),
            step(W.icon('talk'), 'Your voice can be soft, loud, fast or slow.')
          ],
          guided: [bodyMeans, bodyMatch],
          check: [bodyMeans, bodyMatch],
          coach: '<p>Say "I found a frog" three ways: happy, scared, bored. Talk about what changed.</p>',
          mistake: '<p>A flat face and voice for an exciting story. Model it, then let the child try.</p>' },
        { slug: 'clear-words', title: 'Choose exact words', exp: ['B1.5'], skill: 'speaking',
          model: [
            step(W.sent('I saw a thing.'), 'What thing?'),
            step(W.sent('I saw a big grey heron by the pond.'), 'Now I can picture it.')
          ],
          guided: [clearer, clearer],
          check: [clearer, clearer],
          coach: '<p>When the child says "thing" or "stuff", ask a gentle question: "Which thing?" Then help them say the exact word.</p>',
          mistake: '<p>Using "it" and "there" without saying what or where.</p>' }
      ]
    }],
    practice: [
      { id: 'listening', name: 'Listening well', code: 'B1.1, B1.2', gen: goodQuestion },
      { id: 'speaking', name: 'Speaking clearly', code: 'B1.3, B1.4, B1.5', gen: onTopic }
    ],
    tasks: [
      { id: 'chat', title: 'A real conversation', code: 'B1.1', pic: W.icon('people'), say: 'Talk with your grown-up. Listen, take turns, and ask one question.',
        run: ['Choose a topic at a meal: a trip, a pet, a game.', 'The child listens, shows interest, asks a question, and says back one thing they heard.'],
        rubric: ['Interrupts or does not listen yet.', 'Listens for part of it; asks a question with prompting.', 'Listens, asks a question and says something back.', 'Listens closely; the question and say-back show real understanding.'] },
      { id: 'retell', title: 'Listen and retell', code: 'B1.2', pic: W.icon('listen'), say: 'Listen to a story. Then tell it back.',
        run: ['Before: show the cover and ask what it might be about.', 'Read a short story aloud without showing the pictures.', 'After: the child retells the beginning, middle and end, and says if any part was hard to understand.'],
        rubric: ['Recalls little of it.', 'Recalls some parts, out of order.', 'Retells the main parts in order.', 'Retells in order with details, and names a part that was hard.'] },
      { id: 'show-tell', title: 'Show and tell', code: 'B1.3', pic: W.icon('talk'), say: 'Show something you love. Tell three things about it.',
        run: ['The child picks an object and plans three things to say.', 'They talk to the family, stay on topic, then take one question.'],
        rubric: ['Hard to follow; drifts off topic.', 'Some ideas; needs reminders to stay on topic.', 'Three clear ideas on topic, then answers a question.', 'Clear and interesting; answers questions with detail.'] },
      { id: 'act-it', title: 'Tell it with your face and voice', code: 'B1.4', pic: W.icon('people'), say: 'Tell about a moment from your day. Use your face, hands and voice.',
        run: ['The child tells a short moment from the day.', 'Encourage facial expression, gestures, and a voice that changes with feelings.'],
        rubric: ['Little expression yet.', 'Some expression with prompting.', 'Face, hands and voice add meaning.', 'Expression clearly adds to the story and keeps listeners interested.'] },
      { id: 'describe', title: 'Describe it so I can guess', code: 'B1.5', pic: W.icon('think'), say: 'Describe something in a bag. Do not say its name.',
        run: ['Hide an object in a bag. The child describes it (size, shape, colour, what it is for) in full sentences.', 'You guess. Then swap.'],
        rubric: ['Uses few describing words.', 'Some describing words; some vague words like "thing".', 'Clear, exact words in full sentences.', 'Exact, varied words, including new words learned this year.'] }
    ]
  });

  Q.shapes('talking', {
    listening: [[1, 'say-back', sayBack], [1, 'interest', interest], [1, 'hard', hardToHear], [1, 'order', listenOrder]],
    speaking: [[1, 'turns', turns], [1, 'body', bodyMeans], [1, 'who-for', whoFor], [1, 'clearer', clearer], [2, 'body-match', bodyMatch]]
  });
})();
