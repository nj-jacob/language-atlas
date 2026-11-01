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
    ['I lost my first tooth!', 'Did it hurt?', ['Can we play tag?', 'What is for lunch?']],
    ['We built a snow fort.', 'How big was it?', ['What is your favourite colour?', 'Can I borrow a pencil?']],
    ['My cousin came to visit from Saskatoon.', 'How long is your cousin staying?', ['Do you like hockey?', 'Is it lunch time?']],
    ['I saw a moose on our road trip.', 'Was it close to the car?', ['Can we play outside?', 'What book are you reading?']],
    ['We planted beans in the garden.', 'How tall are they now?', ['Where is my backpack?', 'Do you have a sister?']],
    ['I started swimming lessons.', 'What did you learn first?', ['What did you eat for breakfast?', 'Is your dog brown?']],
    ['My dad and I made bannock.', 'How did it taste?', ['Can I have a turn?', 'Is it snowing?']],
    ['Our family got a new puppy.', 'What is its name?', ['Where is the gym?', 'Can you skip?']],
    ['I finished a big puzzle.', 'How many pieces did it have?', ['What time is recess?', 'Do you like soup?']]];
  var INTEREST = ['Nod and look at them.', 'Say, "Wow, tell me more!"', 'Ask a question about it.', 'Smile and face them.', 'Say, "Then what happened?"', 'Keep your eyes on the speaker.'];
  var BORED = ['Look at a screen.', 'Yawn and look away.', 'Start talking about something else.', 'Play with a toy.', 'Turn your back.', 'Hum a song.'];
  /* [what someone said, saying it back, wrong say-backs] */
  var BACK = [['Put your boots by the door, then wash your hands.', 'Boots by the door, then wash my hands.', ['Wash the boots.', 'Hands by the door.']],
    ['The library trip is on Thursday. Bring your book.', 'Thursday, and bring my book.', ['The trip is today.', 'Bring a snack on Friday.']],
    ['Feed the cat one scoop of food.', 'One scoop for the cat.', ['Two scoops for the dog.', 'Feed the fish.']],
    ['Hang up your coat, then sit on the carpet.', 'Coat on the hook, then sit on the carpet.', ['Sit on your coat.', 'Hang up the carpet.']],
    ['Bring your mittens. We are going sledding.', 'Bring my mittens for sledding.', ['We are going swimming.', 'Leave the mittens at home.']],
    ['Read for ten minutes, then turn off the light.', 'Read ten minutes, then lights off.', ['Turn off the light now.', 'Read for one hour.']],
    ['The bus comes at eight. Wait by the gate.', 'Bus at eight, wait by the gate.', ['The bus comes at nine.', 'Wait by the door.']],
    ['Water the plant on Monday and Friday.', 'Water it Monday and Friday.', ['Water it every day.', 'Water it on Sunday.']],
    ['Put the forks on the left and the cups on the right.', 'Forks left, cups right.', ['Forks right, cups left.', 'Cups on the floor.']],
    ['Draw a tree, then colour the sky blue.', 'Draw a tree, then a blue sky.', ['Colour the tree blue.', 'Colour the sky green.']]];
  var HARD = ['Ask them to say it again.', 'Say what part you did not understand.', 'Ask them to slow down.', 'Ask what a new word means.'];
  var NOT = ['Pretend you understood.', 'Walk away.', 'Guess and say nothing.', 'Cover your ears.'];
  var STEPS = ['Before: think about what it will be about.', 'During: look at the speaker and picture it.', 'After: say back what you heard.'];
  var WHEN = { Before: ['Think about what you already know.', 'Sit still and face the speaker.', 'Guess what it will be about.'],
    During: ['Picture it in your head.', 'Notice words you do not know.', 'Keep your eyes on the speaker.'],
    After: ['Say back what you heard.', 'Tell someone what it was about.', 'Ask about a part that was hard.'] };
  /* a topic, an idea that stays on it, ideas that wander off */
  var TOPIC = [['our trip to the farm', 'We fed the goats.', ['My shoes are new.', 'I like the colour blue.']], ['how to plant a seed', 'Push the seed into the soil.', ['My cat is orange.', 'We had pasta.']],
    ['our favourite winter game', 'We love sledding down the big hill.', ['My cousin lives in Regina.', 'Summer is hot.']], ['our class pet', 'Our hamster runs on its wheel at night.', ['I have new boots.', 'My uncle drives a truck.']],
    ['a trip to the beach', 'We dug a big hole in the sand.', ['My favourite food is rice.', 'Our school has a gym.']], ['how to make a sandwich', 'First, spread butter on the bread.', ['My cat sleeps a lot.', 'It rained on Tuesday.']],
    ['the first snow', 'Big flakes landed on my mittens.', ['I can count to one hundred.', 'We have a red car.']], ['my favourite book', 'The story is about a lost loon.', ['I like soccer.', 'My sister is six.']],
    ['a visit to the dentist', 'The dentist counted my teeth.', ['Our dog barks at squirrels.', 'I want a kite.']], ['our garden', 'The tomatoes are turning red.', ['My bike has a bell.', 'The bus was late.']]];
  var TURN = ['Wait until the speaker stops.', 'Raise your hand in a group.', 'Let everyone have a turn.', 'Say, "Your turn."', 'Listen, then add your idea.'];
  var NOTURN = ['Talk at the same time.', 'Keep talking so no one else can.', 'Shout over others.', 'Cut in when someone is talking.', 'Leave someone out.'];
  /* [who you are talking to, words that fit, words that do not] */
  var WHO = [['your teacher', 'Excuse me, may I get a drink of water?', 'Gimme water.'], ['a visitor to the class', 'Hello, thank you for coming.', 'Hey you.'],
    ['your best friend', 'Want to play tag?', 'Would you kindly join me in a game of tag?'], ['the principal', 'Good morning. May I bring this note to the office?', 'Take this.'],
    ['your little cousin', 'Want to build a block tower with me?', 'Would you care to construct a tower?'], ['a store clerk', 'Excuse me, where are the apples, please?', 'Apples. Where?'],
    ['your grandpa on the phone', 'Hi, Grandpa! I learned to skate today.', 'Skate. Bye.'], ['the whole class', 'Good morning, everyone. Today I will tell you about my pet.', 'Um, pet.']];
  /* [face or body move, what it shows] */
  var BODY = [['a big smile', 'happy'], ['a frown', 'upset'], ['wide eyes', 'surprised'], ['a shrug', 'not sure'], ['a thumbs up', 'it is good'], ['a nod', 'yes'],
    ['shaking your head', 'no'], ['a wave', 'hello or goodbye'], ['a finger to your lips', 'be quiet'], ['a yawn', 'tired']];
  /* [when you are talking, the voice that fits, voices that do not] */
  var VOICE = [['telling a spooky part of a story', 'soft and slow', ['fast and bright', 'loud and clear']], ['sharing exciting news', 'fast and bright', ['soft and slow', 'quiet']],
    ['talking in the library', 'quiet', ['loud and clear', 'fast and bright']], ['speaking to the whole class', 'loud and clear', ['quiet', 'soft and slow']],
    ['saying sorry to a friend', 'gentle', ['loud and clear', 'fast and bright']], ['calling a friend across the field', 'loud and clear', ['quiet', 'soft and slow']]];
  /* [unclear, exact] */
  var CLEAR = [['I saw a thing.', 'I saw a big grey heron by the pond.'], ['It was fun.', 'Building the snow fort was so much fun.'], ['Give me that.', 'Please pass me the green crayon.'],
    ['We went there.', 'We went to the science centre.'], ['She did it.', 'Ava scored a goal.'], ['Look over there.', 'Look at the eagle on the tall pine.'], ['I want the stuff.', 'I want the blue paint.'],
    ['We ate food.', 'We ate warm bannock with jam.'], ['It was big.', 'The moose was taller than a door.'], ['They came over.', 'Grandma and Grandpa came for supper.'],
    ['I got a thing.', 'I got a new library card.'], ['It broke.', 'The tip of my pencil broke.']];
  /* [sentence with a word that is not exact, that word, an exact word to use instead] */
  var VAGUE = [['I found a thing by the lake.', 'thing', 'feather'], ['Pass me that stuff please.', 'stuff', 'glue'], ['We went to the place after school.', 'place', 'library'],
    ['A bird sat on the thing.', 'thing', 'fence'], ['My dog ate some stuff.', 'stuff', 'carrots'], ['I saw an animal at the pond.', 'animal', 'frog'], ['Grandpa made food for supper.', 'food', 'stew'],
    ['Mei got a toy for her birthday.', 'toy', 'kite'], ['The weather was bad today.', 'bad', 'stormy'], ['Kai drew a nice picture.', 'nice', 'colourful'], ['We heard a sound in the tree.', 'sound', 'woodpecker']];
  function words(x) { return x.replace(/[.,!?]/g, '').split(' '); }

  /* ---------- show you are listening ---------- */
  function goodQuestion(lv) {
    var a = R.pick(ASK);
    return Q.one('Your friend says this. Which question fits best?', a[1], a[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('talk', a[0]), prompt: 'Which question is about what your friend said?',
      hint: 'A good question stays on what the speaker said.', explain: 'It is about what your friend told you.', meta: { k: 'g2-good-question', said: a[0] } });
  }
  function interest(lv) {
    return Q.all('Pick every way to show you are <b>interested</b>.', R.some(INTEREST, 2), R.some(BORED, lv > 1 ? 3 : 2), { hint: 'How do you show you care about what they say?', explain: 'Look, nod, and ask about it.', meta: { k: 'g2-interest' } });
  }
  function interestTf() {
    var yes = R.int(0, 1) === 1, move = R.pick(yes ? INTEREST : BORED), n = Q.name();
    return { q: 'While a friend talks, ' + n + ' does this. Does it show interest?', fig: W.sent(move), type: 'tf', answer: yes,
      why: { options: ['It shows ' + n + ' cares about what the friend says.', 'It shows ' + n + ' is not listening.'], answer: yes ? 0 : 1 },
      hint: 'Would you feel listened to?', explain: yes ? 'That shows interest.' : 'That does not show interest.', meta: { k: 'g2-interest-tf', move: move } };
  }
  function questionTf() {
    var a = R.pick(ASK), yes = R.int(0, 1) === 1, ask = yes ? a[1] : R.pick(a[2]);
    return { q: 'Your friend says this. Is the question a good one?', fig: W.means('talk', a[0]) + W.means('think', ask), type: 'tf', answer: yes,
      why: { options: ['It is about what the friend said.', 'It is about something else.'], answer: yes ? 0 : 1 },
      hint: 'Is the question about what your friend said?', explain: 'A good question: <b>' + a[1] + '</b>', meta: { k: 'g2-question-tf', said: a[0], ask: ask } };
  }

  /* ---------- say it back ---------- */
  function sayBack(lv) {
    var b = R.pick(BACK);
    return Q.one('Which is the best way to <b>say it back</b>?', b[1], b[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('talk', b[0]), hint: 'Say the main words again, in the same order.',
      explain: 'Saying it back shows you heard it right.', meta: { k: 'g2-say-back', said: b[0] } });
  }
  function sayBackTf() {
    var b = R.pick(BACK), yes = R.int(0, 1) === 1, back = yes ? b[1] : R.pick(b[2]), n = Q.name();
    return { q: 'This was said. ' + n + ' says it back. Is that right?', fig: W.means('talk', b[0]) + W.means('think', back), type: 'tf', answer: yes,
      why: { options: ['It has the main words, in order.', 'It changes what was said.'], answer: yes ? 0 : 1 },
      hint: 'Check each main word.', explain: W.means('think', b[1]), meta: { k: 'g2-say-back-tf', said: b[0], back: back } };
  }
  function hardToHear(lv) {
    return Q.one('You did not understand what someone said. What should you do?', R.pick(HARD), R.some(NOT, lv > 1 ? 3 : 2), { hint: 'It is fine to ask.', explain: 'Ask them to say it again, or say which part was hard.', meta: { k: 'g2-hard' } });
  }
  function listenOrder() {
    return { q: 'Put the listening steps in order.', type: 'order', items: STEPS.slice(), first: 'Before', last: 'After', hint: 'Before, during, after.', explain: 'Think first, picture it, then say it back.', meta: { k: 'g2-listen-order' } };
  }
  function listenWhen() {
    var w = R.pick(Object.keys(WHEN)), x = R.pick(WHEN[w]), tiles = ['Before', 'During', 'After'];
    return { q: 'When do you do this?', fig: W.sent(x), type: 'tap', tiles: tiles, answer: tiles.indexOf(w), hint: 'Before they talk, while they talk, or after?', explain: '<b>' + w + '</b> listening.', meta: { k: 'g2-listen-when', s: x } };
  }

  /* ---------- take turns and stay on topic ---------- */
  function onTopic(lv) {
    var t = R.pick(TOPIC);
    return Q.one('You are talking about <b>' + t[0] + '</b>. Which idea stays on topic?', t[1], t[2].slice(0, lv > 1 ? 2 : 1), { hint: 'Does it tell about ' + t[0] + '?', explain: 'It is about ' + t[0] + '.', meta: { k: 'g2-on-topic', topic: t[0] } });
  }
  function offTopic() {
    var t = R.pick(TOPIC), off = R.pick(t[2]);
    return Q.one('You are talking about <b>' + t[0] + '</b>. Which idea is <b>off</b> topic?', off, [t[1]], { hint: 'Which one is about something else?', explain: '<b>' + off + '</b> is about something else.', meta: { k: 'g2-off-topic', topic: t[0] } });
  }
  function turns(lv) {
    return Q.all('Pick every way to <b>take turns</b> when you talk.', R.some(TURN, 2), R.some(NOTURN, lv > 1 ? 3 : 2), { hint: 'Everyone gets a chance.', explain: 'Wait, listen, and let everyone talk.', meta: { k: 'g2-turns' } });
  }
  function whoFor(lv) {
    var w = R.pick(WHO), wrong = [w[2]].concat(lv > 1 ? [R.pick(WHO.filter(function (x) { return x !== w; }))[2]] : []);
    return Q.one('You are talking to <b>' + w[0] + '</b>. Which fits best?', w[1], wrong, { prompt: 'Is it a friend, or someone to be more polite with?', hint: 'Friends: easy, friendly words. Teachers and visitors: polite words.',
      explain: 'This one fits ' + w[0] + '.', meta: { k: 'g2-who-for', who: w[0] } });
  }

  /* ---------- face, body and voice ---------- */
  function bodyMeans(lv) {
    var b = R.pick(BODY);
    return Q.tiles('What does <b>' + b[0] + '</b> usually show?', b[1], R.some(BODY.filter(function (x) { return x !== b; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), { hint: 'Try it with your own face or body.',
      explain: b[0] + ' usually shows <b>' + b[1] + '</b>.', meta: { k: 'g2-body', move: b[0] } });
  }
  function bodyMatch() {
    var b = R.some(BODY, 3);
    return { q: 'Match each one to what it shows.', type: 'match', pairs: b.map(function (x) { return [x[0], x[1]]; }), hint: 'Try each one.', explain: 'Your face and body help tell your meaning.', meta: { k: 'g2-body-match' } };
  }
  function bodyShow(lv) {
    var b = R.pick(BODY);
    return Q.tiles('You want to show <b>' + b[1] + '</b> without words. What could you do?', b[0], R.some(BODY.filter(function (x) { return x !== b; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Try each one in a mirror.', explain: '<b>' + b[0] + '</b> shows ' + b[1] + '.', meta: { k: 'g2-body-show', shows: b[1] } });
  }
  function voiceFit() {
    var v = R.pick(VOICE);
    return Q.tiles('You are <b>' + v[0] + '</b>. Which voice fits?', v[1], v[2], { hint: 'Your voice can match your words.', explain: 'A <b>' + v[1] + '</b> voice fits.', meta: { k: 'g2-talk-voice', when: v[0] } });
  }

  /* ---------- choose exact words ---------- */
  function clearer(lv) {
    var c = R.pick(CLEAR), wrong = [c[0]].concat(lv > 1 ? [R.pick(CLEAR.filter(function (x) { return x !== c; }))[0]] : []);
    return Q.one('Which one is <b>clearer</b> for the listener?', c[1], wrong, { hint: 'Which one tells exactly what you mean?', explain: 'Exact words help listeners picture it.', meta: { k: 'g2-clearer' } });
  }
  function vagueTap() {
    var v = R.pick(VAGUE), ws = words(v[0]);
    return { q: 'Which word could be more <b>exact</b>?', fig: W.sent(v[0]), type: 'tap', tiles: ws, answer: ws.indexOf(v[1]), hint: 'Which word could mean lots of things?',
      explain: W.sent(v[0].replace(v[1], '<b>' + v[2] + '</b>')), meta: { k: 'g2-vague-tap', s: v[0] } };
  }
  function exactSwap(lv) {
    var v = R.pick(VAGUE), wrong = R.some(['thing', 'stuff', 'place', 'something'].filter(function (x) { return x !== v[1]; }), lv > 1 ? 2 : 1);
    return Q.tiles('Which word makes it <b>clearer</b>?', v[2], wrong, { fig: W.sent(v[0].replace(v[1], '<mark class="hl">' + v[1] + '</mark>')), hint: 'Which word helps you picture it?',
      explain: W.sent(v[0].replace(v[1], '<b>' + v[2] + '</b>')), meta: { k: 'g2-exact-swap', s: v[0] } });
  }
  function clearTf() {
    var c = R.pick(CLEAR), yes = R.int(0, 1) === 1, said = yes ? c[1] : c[0];
    return { q: Q.name() + ' says this. Is it clear to the listener?', fig: W.means('talk', said), type: 'tf', answer: yes,
      why: { options: ['It says exactly what or who.', 'It leaves out what or who.'], answer: yes ? 0 : 1 },
      hint: 'Could you picture it?', explain: W.means('talk', c[1]), meta: { k: 'g2-clear-tf', said: said } };
  }
  function T(f, a) { return function () { return f(a); }; }

  Atlas.register('talking', {
    full: true,
    lessons: [{
      id: 'listen', title: 'Listening well', sub: 'Show interest, ask, and say it back.',
      concepts: [
        { slug: 'interest', title: 'Show you are listening', exp: ['B1.1'], skill: 'interest',
          model: [
            step(W.icon('listen'), 'Look at the speaker. Nod.'),
            step(W.means('talk', 'Wow, tell me more!')),
            step(W.means('talk', 'I went camping last weekend.'), 'Your friend tells you something.'),
            step(W.means('think', 'Where did you sleep?'), 'Ask a question about it.')
          ],
          guided: [T(interest, 1), T(goodQuestion, 1), interestTf],
          check: [T(goodQuestion, 2), T(interest, 2), questionTf, interestTf, T(goodQuestion, 2)],
          coach: '<p>At dinner, take turns telling one thing about your day. The listener asks one question about it.</p>',
          mistake: '<p>Asking about something else entirely. Ask: "Is your question about what they said?"</p>' },
        { slug: 'say-back', title: 'Say it back', exp: ['B1.1', 'B1.2'], skill: 'say-back',
          model: [
            step(W.means('talk', 'Put your boots by the door, then wash your hands.')),
            step(W.means('think', 'Boots by the door, then wash my hands.'), 'The main words, in order.'),
            step(W.means('talk', 'Feed the cat one scoop of food.')),
            step(W.means('think', 'One scoop for the cat.'), 'Short is fine.'),
            step(W.icon('again'), 'Not sure? Ask them to say it again.')
          ],
          guided: [T(sayBack, 1), T(hardToHear, 1), listenWhen],
          check: [T(sayBack, 2), sayBackTf, listenOrder, T(hardToHear, 2), listenWhen],
          coach: '<p>Give two-step instructions and ask the child to say them back before doing them.</p>',
          mistake: '<p>Doing only the last step. Saying it back helps the child keep both steps.</p>' }
      ]
    }, {
      id: 'speak', title: 'Speaking clearly', sub: 'Take turns, stay on topic, and use your face and words.',
      concepts: [
        { slug: 'turns-topic', title: 'Take turns and stay on topic', exp: ['B1.3'], skill: 'turns-topic',
          model: [
            step(W.icon('people'), 'One person talks. The others listen.'),
            step(W.sent('Topic: our trip to the farm'), 'Every idea is about the farm.'),
            step(W.sent('We fed the goats.'), 'On topic.'),
            step(W.sent('My shoes are new.'), 'Off topic.'),
            step(W.means('talk', 'Excuse me, may I get a drink of water?'), 'Polite words for a teacher.')
          ],
          guided: [T(turns, 1), T(onTopic, 1), T(whoFor, 1)],
          check: [T(onTopic, 2), offTopic, T(turns, 2), T(whoFor, 2), T(onTopic, 2)],
          coach: '<p>Use a talking object: only the person holding it speaks. Pick a topic and see who can stay on it.</p>',
          mistake: '<p>Jumping to a new topic. Gently ask: "Is that about the farm?"</p>' },
        { slug: 'body', title: 'Your face and body help you talk', exp: ['B1.4'], skill: 'body',
          model: [
            step(W.tile('a big smile'), 'Happy.'),
            step(W.tile('a shrug'), 'Not sure.'),
            step(W.icon('talk'), 'Your voice can be soft, loud, fast or slow.'),
            step(W.sent('Shh... the door creaked open.'), 'A spooky part: soft and slow.')
          ],
          guided: [T(bodyMeans, 1), T(bodyShow, 1), voiceFit],
          check: [T(bodyMeans, 2), bodyMatch, voiceFit, T(bodyShow, 2), bodyMatch],
          coach: '<p>Say "I found a frog" three ways: happy, scared, bored. Talk about what changed.</p>',
          mistake: '<p>A flat face and voice for an exciting story. Model it, then let the child try.</p>' },
        { slug: 'clear-words', title: 'Choose exact words', exp: ['B1.5'], skill: 'clear-words',
          model: [
            step(W.sent('I saw a thing.'), 'What thing?'),
            step(W.sent('I saw a big grey heron by the pond.'), 'Now I can picture it.'),
            step(W.sent('Pass me that <b>stuff</b>, please.'), 'Which stuff?'),
            step(W.sent('Pass me the <b>glue</b>, please.'), 'Now I know.')
          ],
          guided: [T(clearer, 1), vagueTap, T(exactSwap, 1)],
          check: [T(clearer, 2), clearTf, vagueTap, T(exactSwap, 2), T(clearer, 2)],
          coach: '<p>When the child says "thing" or "stuff", ask a gentle question: "Which thing?" Then help them say the exact word.</p>',
          mistake: '<p>Using "it" and "there" without saying what or where.</p>' }
      ]
    }],
    practice: [
      { id: 'interest', name: 'Show you are listening', code: 'B1.1', gen: goodQuestion },
      { id: 'say-back', name: 'Say it back', code: 'B1.1, B1.2', gen: sayBack },
      { id: 'turns-topic', name: 'Turns and topic', code: 'B1.3', gen: onTopic },
      { id: 'body', name: 'Face, body and voice', code: 'B1.4', gen: bodyMeans },
      { id: 'clear-words', name: 'Exact words', code: 'B1.5', gen: clearer }
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
    interest: [[1, 'interest', interest], [1, 'tf', interestTf], [1, 'question-tf', questionTf]],
    'say-back': [[1, 'tf', sayBackTf], [1, 'hard', hardToHear], [1, 'when', listenWhen], [1, 'order', listenOrder]],
    'turns-topic': [[1, 'off', offTopic], [1, 'turns', turns], [1, 'who-for', whoFor]],
    body: [[1, 'show', bodyShow], [1, 'voice', voiceFit], [1, 'match', bodyMatch]],
    'clear-words': [[1, 'vague', vagueTap], [1, 'swap', exactSwap], [1, 'tf', clearTf]]
  });
})();
