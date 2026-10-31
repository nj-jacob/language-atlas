/* Grade 4: listening and speaking.
   Ontario 2023 Language, Grade 4, B1 Oral and Non-Verbal Communication:
   B1.1 listening skills, including asking questions that encourage a speaker to elaborate, and responding to others in group discussions
   B1.2 listening strategies before, during and after listening; showing interest; seeking clarification; developing a response
   B1.3 purpose and audience for speaking; speaking strategies including paraphrasing and restating
   B1.4 oral and non-verbal strategies (expression, gestures, body language) and how they help communicate meaning
   B1.5 word choice, including varied adjectives and adverbs to elaborate, a variety of sentence types, and cohesive sentences
   The computer checks knowing what to do; real talking and listening are activities with a grown-up, marked with a rubric.
   All sentences are written for this site. Answer checks: tests/verify/grade4-talking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* [what someone says, a question that gets them to say more, a yes-or-no question, an off-topic reply] */
  var MORE = [['I went to my cousin' + AP + 's farm last weekend.', 'What did you do at the farm?', 'Did you go?', 'I have a dog.'],
    ['Our team lost, but I scored a goal.', 'How did you score the goal?', 'Was it a game?', 'I like pizza.'],
    ['I am reading a book about space.', 'What is the most surprising thing you learned?', 'Is it a book?', 'My shoes are new.'],
    ['We made bannock with my kokum.', 'How did you make it together?', 'Did you make it?', 'I went swimming.'],
    ['I want to be a vet one day.', 'What makes you want to be a vet?', 'Do you?', 'It is sunny today.']];
  /* [what someone said in a group, a reply that builds on it, replies that do not] */
  var BUILD = [['Noor: I think our school should plant a garden.', 'I agree with Noor, and we could grow beans for the food bank.', ['That is wrong.', 'What is for lunch?']],
    ['Liam: Recess should be longer.', 'I see your point, Liam, but we might lose reading time.', ['No.', 'I have a new bike.']],
    ['Mei: The ending of the story was sad.', 'I felt that too, Mei, because the dog moved away.', ['Whatever.', 'Can we go outside?']],
    ['Omar: We should collect cans to raise money.', 'Good idea, Omar. We could also collect bottles.', ['That will never work.', 'My cat is orange.']]];
  /* [a moment, the best thing to say, other things] */
  var CLARIFY = [['You did not hear the second step.', 'Could you say the second step again, please?', ['I will guess.', 'Stop talking.']],
    ['A word in the talk was new to you.', 'What does that word mean?', ['I will ignore it.', 'That word is silly.']],
    ['You are not sure when the project is due.', 'Can you tell me the due date again?', ['I will hand it in whenever.', 'I do not care.']]];
  var LISTEN = ['Look at the speaker.', 'Nod to show you follow.', 'Wait for a pause to ask.', 'Think of a question to ask after.'];
  var NOTLISTEN = ['Look at your tablet.', 'Talk over the speaker.', 'Play with your pencil case.', 'Think about recess.'];

  function moreQ(lv) {
    var m = R.pick(MORE);
    return Q.one('Which question gets the speaker to tell you <b>more</b>?', m[1], m.slice(2, lv > 1 ? 4 : 3), { fig: W.means('talk', m[0]), prompt: 'A yes-or-no answer is short. Which question needs a longer answer?',
      hint: 'Start with what, how or why.', explain: '"' + m[1] + '" invites a longer answer.', meta: { k: 'g4-more', said: m[0] } });
  }
  function buildOn(lv) {
    var b = R.pick(BUILD);
    return Q.one('Which reply builds on what was said?', b[1], b[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('people', b[0]),
      hint: 'Name the speaker, then add your own idea or a respectful "but".', explain: W.sent(b[1]), meta: { k: 'g4-build-on', said: b[0] } });
  }
  function clarify() {
    var c = R.pick(CLARIFY);
    return Q.one('What could you say?', c[1], c[2], { fig: W.means('listen', c[0]), hint: 'Ask politely so you can understand.', explain: 'Asking helps you understand.', meta: { k: 'g4-clarify', s: c[0] } });
  }
  function listenPick() {
    return Q.all('Pick everything a good listener does.', R.some(LISTEN, 2), R.some(NOTLISTEN, 2), { hint: 'What helps you understand and shows interest?', explain: 'Look, nod, wait for a pause, and think of a question.', meta: { k: 'g4-listen-pick' } });
  }
  function moreTf() {
    var m = R.pick(MORE), good = R.int(0, 1) === 1, ask = good ? m[1] : m[2];
    return { q: 'Will this question get the speaker to say more?', fig: W.means('talk', m[0]) + W.sent(ask), type: 'tf', answer: good,
      why: { options: ['What, how and why questions need a longer answer.', 'A yes-or-no question gets a short answer.'], answer: good ? 0 : 1 },
      hint: 'Can they answer with just yes or no?', explain: 'Ask what, how or why.', meta: { k: 'g4-more-tf', ask: ask } };
  }

  /* ---------- speaking ---------- */
  /* [what was said, a good retelling in other words, retellings that change the meaning] */
  var SAID = [['The library will close early on Friday because of a staff meeting.', 'On Friday, the library closes early for a meeting.', ['The library is closed every Friday.', 'The staff meeting is in the library on Monday.']],
    ['Bring water and a hat, because the field trip is outdoors.', 'The trip is outside, so pack water and a hat.', ['Do not bring anything on the trip.', 'The trip is indoors.']],
    ['Practice is cancelled tonight, but the game is still on Saturday.', 'No practice tonight, but the Saturday game is still on.', ['The game on Saturday is cancelled.', 'Practice is on Saturday instead.']],
    ['Please walk in the halls, because running can cause accidents.', 'Walk, do not run, in the halls so nobody gets hurt.', ['Run in the halls.', 'The halls are closed.']]];
  /* [who you are speaking to, formal or friendly] */
  var AUD = [['the principal, about starting a club', 'formal'], ['a guest speaker, to thank them', 'formal'], ['the town council, about a new crosswalk', 'formal'],
    ['your best friend, at recess', 'friendly'], ['your cousin, at a birthday party', 'friendly'], ['your little brother, at home', 'friendly']];
  var LINES = { formal: ['Good morning. May I tell you about an idea?', 'Thank you for speaking to our class today.', 'Excuse me, may I ask a question?'],
    friendly: ['Hey! Want to hear my idea?', 'That was so cool!', 'Guess what?'] };
  /* [a gesture, what it says] */
  var BODY = [['a thumbs up', 'Good job!'], ['a shrug', 'I do not know.'], ['a nod', 'Yes.'], ['a hand up, palm out', 'Stop.'], ['a wave', 'Hello!'], ['a finger to the lips', 'Be quiet.']];
  /* [plain, with describing words] */
  var DETAIL = [['The dog ran.', 'The muddy dog ran happily through the puddles.'], ['We ate soup.', 'We slowly ate warm, spicy soup by the fire.'], ['The bird sang.', 'A tiny yellow bird sang sweetly at dawn.'],
    ['Kai skated.', 'Kai skated swiftly across the smooth, frozen pond.'], ['The wind blew.', 'The icy wind blew fiercely all night.']];
  /* [sentence, the word that tells how] */
  var HOW = [['Hana whispered softly to the baby.', 'softly'], ['The turtle crawled slowly to the pond.', 'slowly'], ['Arjun carefully carried the eggs.', 'carefully'],
    ['The crowd cheered loudly for the team.', 'loudly'], ['Zara quickly packed her bag.', 'quickly']];

  function restate(lv) {
    var s = R.pick(SAID);
    return Q.one('Which says the <b>same thing</b> in other words?', s[1], s[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('talk', s[0]), prompt: 'Keep the meaning. Change the words.',
      hint: 'Check every fact: is it the same?', explain: 'Restating keeps the meaning and changes the words.', meta: { k: 'g4-restate', said: s[0] } });
  }
  function audience() {
    var a = R.pick(AUD), right = R.pick(LINES[a[1]]), wrong = R.pick(LINES[a[1] === 'formal' ? 'friendly' : 'formal']);
    return Q.one('You are speaking to <b>' + a[0] + '</b>. Which fits best?', right, [wrong], { prompt: 'Is this a formal or a friendly time to talk?',
      hint: 'Formal: polite and complete. Friendly: relaxed.', explain: 'This is a <b>' + a[1] + '</b> time to talk.', meta: { k: 'g4-audience', who: a[0] } });
  }
  function bodyMatch() {
    return { q: 'Match each gesture to what it says.', type: 'match', pairs: R.some(BODY, 3), hint: 'Try each one yourself.', explain: 'Your body can say things without words.', meta: { k: 'g4-body-match' } };
  }
  function bodyOne() {
    var b = R.pick(BODY);
    return Q.one('What does <b>' + b[0] + '</b> say?', b[1], R.some(BODY.filter(function (x) { return x !== b; }), 2).map(function (x) { return x[1]; }), { hint: 'Try it yourself.', explain: b[0].charAt(0).toUpperCase() + b[0].slice(1) + ' says "' + b[1] + '"', meta: { k: 'g4-body-one', g: b[0] } });
  }
  function detail() {
    var d = R.pick(DETAIL);
    return Q.one('Which sentence helps the listener <b>picture it</b>?', d[1], [d[0]], { hint: 'Look for describing words and words that tell how.', explain: W.sent(d[1]), meta: { k: 'g4-detail' } });
  }
  function tapHow() {
    var h = R.pick(HOW), words = h[0].replace('.', '').split(' ');
    return { q: 'Tap the word that tells <b>how</b>.', fig: W.sent(h[0]), type: 'tap', tiles: words, answer: words.indexOf(h[1]),
      hint: 'Many words that tell how end in -ly.', explain: '<b>' + h[1] + '</b> tells how. It is an adverb.', meta: { k: 'g4-tap-how', s: h[0] } };
  }

  Atlas.register('talking', {
    lessons: [{
      id: 'listen', title: 'Listening and discussing', sub: 'Ask for more, build on ideas, and check what you heard.',
      concepts: [
        { slug: 'ask-more', title: 'Ask a question that gets more', exp: ['B1.1'], skill: 'listening',
          model: [
            step(W.means('talk', 'I went to my cousin' + AP + 's farm.'), 'A friend tells you something.'),
            step(W.sent('Did you go?'), 'Yes or no. The talk stops.'),
            step(W.sent('What did you do at the farm?'), 'Now they tell you more.')
          ],
          key: '<p>Start with what, how or why.</p>',
          guided: [function () { return moreQ(1); }, moreTf],
          check: [function () { return moreQ(2); }, moreTf],
          coach: '<p>At dinner, take turns: one person shares, the other must ask a what, how or why question before changing the topic.</p>',
          mistake: '<p>Asking yes-or-no questions only. Turn "Did you like it?" into "What did you like about it?"</p>' },
        { slug: 'build-on', title: 'Build on what others say', exp: ['B1.1'], skill: 'listening',
          model: [
            step(W.means('people', 'Noor: Our school should plant a garden.')),
            step(W.sent('I agree with Noor, <b>and</b> we could grow beans.'), 'Name the idea, then add to it.'),
            step(W.sent('I see your point, <b>but</b> who will water it?'), 'You can disagree kindly.')
          ],
          guided: [function () { return buildOn(1); }, function () { return buildOn(1); }],
          check: [function () { return buildOn(2); }, function () { return buildOn(2); }],
          coach: '<p>Give sentence starters on a card: "I agree with... and...", "I see your point, but...", "Building on what ... said..."</p>',
          mistake: '<p>Waiting for a turn and then saying something unrelated. Link your idea to the last speaker' + AP + 's.</p>' },
        { slug: 'clarify', title: 'Show you are listening, and ask to check', exp: ['B1.2'], skill: 'listening',
          model: [
            step(W.icon('listen'), 'Look at the speaker. Nod.'),
            step(W.icon('think'), 'Lost? Wait for a pause.'),
            step(W.sent('Could you say the second step again, please?'))
          ],
          guided: [clarify, listenPick],
          check: [clarify, listenPick],
          coach: '<p>After any instructions, ask the child to say them back. If something is unclear, practise asking politely.</p>',
          mistake: '<p>Nodding along without understanding. It is fine, and smart, to ask.</p>' }
      ]
    }, {
      id: 'speak', title: 'Speaking clearly', sub: 'Fit your listener, say it your way, show it, and add detail.',
      concepts: [
        { slug: 'audience', title: 'Fit your words to your listener', exp: ['B1.3'], skill: 'speaking',
          model: [
            step(W.means('people', 'the principal'), 'A formal time.'),
            step(W.sent('Good morning. May I tell you about an idea?'), 'Polite and complete.'),
            step(W.means('people', 'your best friend') + W.sent('Hey! Want to hear my idea?'), 'Relaxed is fine here.')
          ],
          guided: [audience, audience],
          check: [audience, audience],
          coach: '<p>Role-play: ask for the same thing from a friend, and then from a store clerk. Talk about what changed.</p>',
          mistake: '<p>Using friendly talk with adults you do not know well. Ask: "Who am I talking to, and why?"</p>' },
        { slug: 'restate', title: 'Say it again in your own words', exp: ['B1.3'], skill: 'speaking',
          model: [
            step(W.means('talk', 'Bring water and a hat, because the field trip is outdoors.')),
            step(W.sent('The trip is outside, so pack water and a hat.'), 'Same meaning, my own words.'),
            step(W.icon('think'), 'Check every fact stayed the same.')
          ],
          guided: [function () { return restate(1); }, function () { return restate(1); }],
          check: [function () { return restate(2); }, function () { return restate(2); }],
          coach: '<p>After a short news story or announcement, ask the child to tell it to another family member in their own words.</p>',
          mistake: '<p>Changing a fact while restating (Friday becomes every Friday). Check each detail.</p>' },
        { slug: 'body', title: 'Your face and hands speak too', exp: ['B1.4'], skill: 'speaking',
          model: [
            step(W.icon('people'), 'A shrug says "I do not know."'),
            step(W.icon('talk'), 'A sad part? A soft voice and a slow pace.'),
            step(W.icon('star'), 'Show size with your hands as you speak.')
          ],
          guided: [bodyOne, bodyMatch],
          check: [bodyOne, bodyMatch],
          coach: '<p>Watch a short video with the sound off. Ask: "What can you tell from faces and hands alone?"</p>',
          mistake: '<p>Standing still and reading flat. Plan one gesture and one voice change before you speak.</p>' },
        { slug: 'detail', title: 'Add describing words', exp: ['B1.5'], skill: 'speaking',
          model: [
            step(W.sent('The dog ran.'), 'Hard to picture.'),
            step(W.sent('The <b>muddy</b> dog ran <b>happily</b>.'), 'What kind? How?'),
            step(W.sent('The muddy dog ran happily <b>through the puddles</b>.'), 'Where? Now I can see it.')
          ],
          guided: [detail, tapHow],
          check: [detail, tapHow],
          coach: '<p>Play "stretch it": one person says a short sentence, the other adds a describing word or a word that tells how.</p>',
          mistake: '<p>Using the same words every time (nice, good, fun). Ask: "What kind? How? Where?"</p>' }
      ]
    }],
    practice: [
      { id: 'listening', name: 'Listening and discussing', code: 'B1.1, B1.2', gen: moreQ },
      { id: 'speaking', name: 'Speaking clearly', code: 'B1.3, B1.4, B1.5', gen: restate }
    ],
    tasks: [
      { id: 'discussion', title: 'A family discussion', code: 'B1.1', pic: W.icon('people'), say: 'Talk about a question with your family. Ask for more, and build on ideas.',
        run: ['Choose a question with no single right answer, such as "Should kids have homework?"', 'Each person shares an idea. The child must ask one what, how or why question, and build on one idea ("I agree, and...").'],
        rubric: ['Does not join in yet.', 'Shares an idea when asked.', 'Asks a question that gets more, and builds on one idea.', 'Asks good questions, builds on and kindly challenges ideas, and keeps the talk going.'] },
      { id: 'podcast', title: 'Listen, then respond', code: 'B1.2', pic: W.icon('listen'), say: 'Listen to a short talk or kids' + AP + ' news story. Then tell what it was about, and what you think.',
        run: ['Before: ask "What do you think it will be about?"', 'During: pause once. Ask "What has happened so far? Anything you want to check?"', 'After: the child retells the main points and gives a response ("I think... because...").'],
        rubric: ['Recalls little of what was said.', 'Recalls some points with help.', 'Retells the main points, asks to check one thing, and responds.', 'Retells clearly, asks a sharp question, and gives a thoughtful response with a reason.'] },
      { id: 'presentation', title: 'A short presentation', code: 'B1.3', pic: W.icon('talk'), say: 'Give a 2-minute talk to your family about something you know well.',
        run: ['Help the child choose a topic and the audience (for example, explaining a game to a grandparent).', 'The child speaks for about two minutes, then restates the most important point at the end.'],
        rubric: ['Hard to follow; loses the topic.', 'Mostly on topic, with little order.', 'Clear and in order, fits the audience, and restates the main point.', 'Clear, well paced, fits the audience well, and handles a question.'] },
      { id: 'act-it', title: 'Tell it with your face, hands and voice', code: 'B1.4', pic: W.icon('people'), say: 'Retell part of a story. Use your face, hands and voice.',
        run: ['The child retells a favourite part of a story.', 'Ask them to plan one gesture, one facial expression and one voice change.', 'Afterwards ask: "How did your face and hands help us understand?"'],
        rubric: ['Little expression or movement.', 'Some expression with reminders.', 'Uses face, hands and voice to show meaning, and explains how they helped.', 'Expressive and natural; uses pauses and gestures for effect.'] },
      { id: 'describe', title: 'Describe it so I can picture it', code: 'B1.5', pic: W.icon('think'), say: 'Describe a place you love. Use describing words and words that tell how.',
        run: ['The child describes a place for about a minute without naming it.', 'Listen for describing words, words that tell how (-ly), and a mix of short and long sentences.', 'Guess the place, then talk about the best words they used.'],
        rubric: ['Very few details.', 'Some describing words, mostly short sentences.', 'Clear details with varied describing words and some adverbs.', 'Vivid, exact words and a mix of sentence types that are easy to follow.'] }
    ]
  });

  Q.shapes('talking', {
    listening: [[1, 'build-on', buildOn], [1, 'clarify', clarify], [1, 'listener', listenPick], [2, 'true-false', moreTf]],
    speaking: [[1, 'audience', audience], [1, 'gesture', bodyOne], [1, 'detail', detail], [1, 'how-word', tapHow], [2, 'match', bodyMatch]]
  });
})();
