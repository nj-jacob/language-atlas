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

  /* [what someone said, a response that builds on it, responses that do not] */
  var BUILD = [['Omar: The school should start a compost program.', 'Building on Omar' + AP + 's idea, we could use the compost in the school garden.', ['That is boring. Let' + AP + 's talk about recess.', 'I had cereal for breakfast.']],
    ['Priya: The library should stay open later.', 'I agree with Priya, because some students need a quiet place after school.', ['Libraries are old-fashioned.', 'Can we go outside now?']],
    ['Kai: Our class could raise money for the food bank.', 'That is a good idea, Kai. How would we collect the money?', ['Whatever.', 'My cousin has a new puppy.']],
    ['Leila: I disagree. A bake sale is not the best plan.', 'I see your point, Leila. What would you suggest instead?', ['You are wrong.', 'I like cookies.']]];
  /* [what the speaker said, a question that checks it, questions that do not] */
  var CLARIFY = [['The project is due in two weeks, and you can work in pairs.', 'Do we choose our own partners?', ['Did you watch the game last night?', 'Where did you buy your shoes?']],
    ['Bring your permission form and a water bottle on Friday.', 'Is the form due Friday, or before?', ['What is your favourite movie?', 'Is it lunch yet?']],
    ['The bus leaves at 8:15 sharp from the east doors.', 'Did you say the east doors?', ['What is for lunch?', 'Who won the hockey game?']],
    ['For the debate, each team gets three minutes to speak.', 'Is that three minutes for each person, or for the whole team?', ['Can I sharpen my pencil?', 'Is the gym open?']]];
  var LISTEN = ['Before: think about what I know, and why I am listening.', 'During: picture it, and note key words.', 'After: sum it up, and ask about anything unclear.'];
  var GOOD = ['Build on what others say.', 'Ask a question when something is unclear.', 'Let others finish speaking.', 'Invite a quiet person to share.'];
  var BAD = ['Interrupt to make your point.', 'Change the topic.', 'Laugh at a wrong answer.', 'Stay silent the whole time.'];

  function buildOn(lv) {
    var b = R.pick(BUILD);
    return Q.one('Which response <b>builds on</b> what was said?', b[1], b[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('talk', b[0]),
      prompt: 'Does it connect to the idea, and keep the discussion going?', hint: 'A good response names the idea and adds to it, or asks about it.', explain: b[1], meta: { k: 'g6-build-on', said: b[0] } });
  }
  function clarify(lv) {
    var c = R.pick(CLARIFY);
    return Q.one('Which question checks that you understood?', c[1], c[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('listen', c[0]),
      prompt: 'Which question is about what the speaker said?', hint: 'A clarifying question repeats part of what was said.', explain: c[1], meta: { k: 'g6-clarify', said: c[0] } });
  }
  function listenOrder() {
    return { q: 'Put the listening steps in order.', type: 'order', items: LISTEN, first: 'First', last: 'Last', hint: 'Before, during, after.', explain: 'Before, during and after listening.', meta: { k: 'g6-listen-order' } };
  }
  function goodMoves() {
    return Q.all('Pick every good move in a group discussion.', R.some(GOOD, 2), R.some(BAD, 2), { hint: 'Which ones help everyone think together?', explain: 'Build on ideas, ask, take turns, include others.', meta: { k: 'g6-good-moves' } });
  }

  /* ---------- speaking: [audience, formal or informal, what fits, what does not] ---------- */
  var AUD = [['the school council at a meeting', 'formal', 'Good afternoon. I would like to propose a new recycling plan.', 'Hey, so, we should totally recycle more.'],
    ['a museum guide you have just met', 'formal', 'Excuse me, could you tell me where the Inuit art gallery is?', 'Where' + AP + 's the art stuff?'],
    ['an Elder visiting the class', 'formal', 'Thank you for sharing your teachings with us today.', 'Thanks, that was cool.'],
    ['a judge at the science fair', 'formal', 'Our experiment tested which material keeps ice frozen longest.', 'So, like, we put ice in stuff.'],
    ['your little brother at home', 'informal', 'Want to play cards after dinner?', 'Would you care to join me for a game of cards this evening?'],
    ['your best friend at lunch', 'informal', 'Want to trade half my sandwich?', 'Good afternoon. Would you care to exchange sandwiches?']];
  /* [body language, what it says] */
  var BODY = [['leaning forward and nodding', 'I am interested.'], ['arms crossed, eyes rolling', 'I do not care.'], ['standing tall, open hands', 'I am confident.'],
    ['looking at a phone while someone speaks', 'I am not listening.'], ['a pause before a big point', 'Get ready: this matters.']];
  var CULTURE = [['In some cultures, looking down while an Elder speaks shows respect.', true], ['A thumbs up does not mean the same thing everywhere.', true],
    ['Eye contact means the same thing in every culture.', false], ['Every gesture means the same thing all over the world.', false]];
  /* [vague, precise] */
  var PRECISE = [['The dog went across the yard.', 'The terrier dashed across the snowy yard.'], ['She said it loudly.', 'She announced the winner proudly.'],
    ['The food was good.', 'The bannock was warm, golden and slightly sweet.'], ['It was a big storm.', 'The blizzard dropped 40 cm of snow overnight.'],
    ['He did the thing fast.', 'He solved the puzzle in four minutes.']];

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
      hint: 'Formal speech is polite, complete and careful.', explain: 'It is <b>' + (isFormal ? 'formal' : 'informal') + '</b>.', meta: { k: 'g6-formal-or-not', line: line } };
  }
  function bodySays(lv) {
    var b = R.pick(BODY);
    return Q.one('What does <b>' + b[0] + '</b> usually say to others?', b[1], R.some(BODY.filter(function (x) { return x !== b; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Picture someone doing it.', explain: b[1], meta: { k: 'g6-body', b: b[0] } });
  }
  function cultureTf() {
    var c = R.pick(CULTURE);
    return { q: 'True or false?', fig: W.sent(c[0]), type: 'tf', answer: c[1], why: { options: ['Body language can mean different things in different cultures.', 'Body language means the same everywhere.'], answer: 0 },
      hint: 'Do all cultures read gestures the same way?', explain: 'Body language and eye contact can mean different things in different cultures.', meta: { k: 'g6-culture', s: c[0] } };
  }
  function precise(lv) {
    var p = R.pick(PRECISE);
    return Q.one('Which sentence is more <b>precise</b>?', p[1], [p[0]].concat(lv > 1 ? [R.pick(PRECISE.filter(function (x) { return x !== p; }))[0]] : []), {
      prompt: 'Which one paints a clearer picture?', hint: 'Precise words: exact nouns, strong verbs, numbers, details.', explain: p[1], meta: { k: 'g6-precise' } });
  }

  Atlas.register('talking', {
    lessons: [{
      id: 'listening', title: 'Listening in discussions', sub: 'Listen with a plan, ask, and build on ideas.',
      concepts: [
        { slug: 'build-on', title: 'Build on what others say', exp: ['B1.1'], skill: 'discussion',
          model: [
            step(W.means('talk', 'Omar: The school should start a compost program.')),
            step(W.means('people', 'Building on Omar' + AP + 's idea, we could use it in the garden.'), 'Name the idea. Add to it.'),
            step(W.means('people', 'I see your point. What would you suggest instead?'), 'Or ask about it, even if you disagree.')
          ],
          guided: [function () { return buildOn(1); }, goodMoves],
          check: [function () { return buildOn(2); }, goodMoves],
          coach: '<p>At dinner, practise sentence starters: "I agree with... because", "Building on...", "I see it differently because...".</p>',
          mistake: '<p>Waiting to speak instead of listening. Ask the child to repeat the last speaker’s point before adding their own.</p>' },
        { slug: 'clarify', title: 'Ask to check you understood', exp: ['B1.2'], skill: 'discussion',
          model: [
            step(W.means('listen', 'The bus leaves at 8:15 from the east doors.')),
            step(W.means('talk', 'Did you say the east doors?'), 'Repeat a part you are not sure of.')
          ],
          guided: [function () { return clarify(1); }, function () { return clarify(1); }],
          check: [function () { return clarify(2); }, function () { return clarify(2); }],
          coach: '<p>Give a three-part instruction quickly. Praise the child for asking about the part they missed.</p>',
          mistake: '<p>Nodding along without understanding. Asking is a strength, not a weakness.</p>' },
        { slug: 'listen-plan', title: 'Before, during and after listening', exp: ['B1.2'], skill: 'discussion',
          model: [
            step(W.icon('think'), 'Before: what do I know? Why am I listening?'),
            step(W.icon('listen'), 'During: picture it. Note key words.'),
            step(W.icon('write'), 'After: sum it up. Ask what is unclear.')
          ],
          guided: [listenOrder, listenOrder],
          check: [listenOrder, goodMoves],
          coach: '<p>Before a podcast or news clip, agree on one question to listen for.</p>',
          mistake: '<p>Writing down everything. Key words are enough.</p>' }
      ]
    }, {
      id: 'speaking', title: 'Speaking to an audience', sub: 'Fit your words, voice and body to the audience.',
      concepts: [
        { slug: 'formal', title: 'Formal or informal', exp: ['B1.3'], skill: 'speaking',
          model: [
            step(W.means('people', 'the school council'), 'Formal: <b>Good afternoon. I would like to propose...</b>'),
            step(W.means('people', 'your best friend'), 'Informal: <b>Want to trade half my sandwich?</b>')
          ],
          guided: [function () { return register(1); }, formalOrNot],
          check: [function () { return register(2); }, formalOrNot],
          coach: '<p>Role-play: ask for directions from a museum guide, then from a cousin. Talk about what changed.</p>',
          mistake: '<p>Being too formal with friends is odd, but being too casual with an adult can seem rude.</p>' },
        { slug: 'body', title: 'Body language speaks too', exp: ['B1.4'], skill: 'speaking',
          model: [
            step(W.means('people', 'leaning forward, nodding'), 'I am interested.'),
            step(W.means('people', 'arms crossed, eyes rolling'), 'I do not care.'),
            step(W.means('think', 'eye contact'), 'Respectful in some cultures. Looking down is respectful in others.')
          ],
          guided: [function () { return bodySays(1); }, cultureTf],
          check: [function () { return bodySays(2); }, cultureTf],
          coach: '<p>Watch a short speech with the sound off. What do the speaker’s face and hands tell you?</p>',
          mistake: '<p>Judging others by one culture’s rules. A child who looks down may be showing respect.</p>' },
        { slug: 'precise', title: 'Precise words help the listener', exp: ['B1.5'], skill: 'speaking',
          model: [
            step(W.sent('The dog went across the yard.'), 'Which dog? How?'),
            step(W.sent('The <b>terrier dashed</b> across the <b>snowy</b> yard.'), 'An exact noun, a strong verb, a detail.')
          ],
          guided: [function () { return precise(1); }, function () { return precise(1); }],
          check: [function () { return precise(2); }, function () { return precise(2); }],
          coach: '<p>Play "zoom in": the child says a plain sentence, then makes it more exact three times.</p>',
          mistake: '<p>Piling on adjectives. One exact word beats three vague ones.</p>' }
      ]
    }],
    practice: [
      { id: 'discussion', name: 'Listening and discussion', code: 'B1.1, B1.2', gen: buildOn },
      { id: 'speaking', name: 'Speaking to an audience', code: 'B1.3, B1.4, B1.5', gen: register }
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
    discussion: [[1, 'clarify', clarify], [1, 'order', listenOrder], [1, 'good-moves', goodMoves]],
    speaking: [[1, 'formal-or-not', formalOrNot], [1, 'body', bodySays], [1, 'precise', precise], [2, 'culture', cultureTf]]
  });
})();
