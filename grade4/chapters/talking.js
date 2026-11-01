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
    ['I want to be a vet one day.', 'What makes you want to be a vet?', 'Do you?', 'It is sunny today.'],
    ['We went camping at Algonquin Park.', 'What was the best part of the trip?', 'Was it fun?', 'I have a new pencil.'],
    ['I built a birdhouse with my uncle.', 'How did you build it?', 'Did you build it?', 'My sister is six.'],
    ['My family visited Nova Scotia this summer.', 'What did you see in Nova Scotia?', 'Was it far?', 'I like hockey.'],
    ['I learned to fold a paper crane.', 'How do you fold one?', 'Was it hard?', 'The bus is late.'],
    ['Our class has a new pet turtle.', 'What does the turtle eat?', 'Is it a turtle?', 'I went skating.']];
  /* [what someone said in a group, a reply that builds on it, replies that do not] */
  var BUILD = [['Noor: I think our school should plant a garden.', 'I agree with Noor, and we could grow beans for the food bank.', ['That is wrong.', 'What is for lunch?']],
    ['Liam: Recess should be longer.', 'I see your point, Liam, but we might lose reading time.', ['No.', 'I have a new bike.']],
    ['Mei: The ending of the story was sad.', 'I felt that too, Mei, because the dog moved away.', ['Whatever.', 'Can we go outside?']],
    ['Omar: We should collect cans to raise money.', 'Good idea, Omar. We could also collect bottles.', ['That will never work.', 'My cat is orange.']],
    ['Ana: We should start reading buddies.', 'Building on Ana' + AP + 's idea, older kids could read with the kindergarten class.', ['Reading is boring.', 'Is it snowing?']],
    ['Kai: The school needs more bike racks.', 'I agree with Kai, and a bike safety day would help too.', ['Bikes are dumb.', 'I lost my mitt.']],
    ['Priya: The class pet should visit a new family each weekend.', 'I like that, Priya, but we would need a sign-up list.', ['No way.', 'I had toast today.']],
    ['Ben: We should clean up the park on Saturday.', 'Ben has a good idea, and we could bring gloves and bags.', ['Who cares?', 'My hat is blue.']]];
  /* [a moment, the best thing to say, other things] */
  var CLARIFY = [['You did not hear the second step.', 'Could you say the second step again, please?', ['I will guess.', 'Stop talking.']],
    ['A word in the talk was new to you.', 'What does that word mean?', ['I will ignore it.', 'That word is silly.']],
    ['You are not sure when the project is due.', 'Can you tell me the due date again?', ['I will hand it in whenever.', 'I do not care.']],
    ['The speaker talked too fast.', 'Could you slow down a little, please?', ['I will stop listening.', 'Talk slower!']],
    ['You missed the page number.', 'Which page did you say?', ['I will read any page.', 'You never say it right.']],
    ['You do not understand a rule of the game.', 'Can you show me how that rule works?', ['I will make up my own rule.', 'This game is dumb.']],
    ['The speaker said a name you did not catch.', 'Sorry, who did you say?', ['I will pretend I know.', 'Never mind.']],
    ['You got lost in the middle of the directions.', 'Can you tell me the part after the bridge again?', ['I will find it myself.', 'Whatever.']]];
  var LISTEN = ['Look at the speaker.', 'Nod to show you follow.', 'Wait for a pause to ask.', 'Think of a question to ask after.', 'Keep your hands still and quiet.', 'Ask to check if you get lost.'];
  var NOTLISTEN = ['Look at your tablet.', 'Talk over the speaker.', 'Play with your pencil case.', 'Think about recess.', 'Interrupt to tell your own story.', 'Walk away in the middle.'];

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

  function morePick() {
    var ms = R.some(MORE, 4);
    return Q.all('Pick every question that gets the speaker to say <b>more</b>.', [ms[0][1], ms[1][1]], [ms[2][2], ms[3][2]], {
      hint: 'What, how and why questions need a longer answer.', explain: 'Ask what, how or why.', meta: { k: 'g4-more-pick' } });
  }
  function offTopic() {
    var m = R.pick(MORE);
    return Q.one('Which reply goes <b>off topic</b>?', m[3], [m[1], m[2]], { fig: W.means('talk', m[0]), hint: 'Which one has nothing to do with what was said?',
      explain: '"' + m[3] + '" changes the topic.', meta: { k: 'g4-talk-off-topic', said: m[0] } });
  }
  function buildTf() {
    var b = R.pick(BUILD), good = R.int(0, 1) === 1, reply = good ? b[1] : R.pick(b[2]);
    return { q: 'Does this reply build on the idea?', fig: W.means('people', b[0]) + W.sent(reply), type: 'tf', answer: good,
      why: { options: ['It names the idea and adds to it, or kindly disagrees.', 'It does not link to what was said.'], answer: good ? 0 : 1 },
      hint: 'Does it link to what the speaker said?', explain: W.sent(b[1]), meta: { k: 'g4-build-tf', reply: reply, said: b[0] } };
  }
  function buildKind() {
    var b = R.pick(BUILD), disagree = / but /.test(b[1]);
    return { q: 'What does this reply do?', fig: W.means('people', b[0]) + W.sent(b[1]), type: 'tap', tiles: ['agrees and adds', 'disagrees kindly'], answer: disagree ? 1 : 0,
      hint: 'Look for <b>and</b> or <b>but</b>.', explain: disagree ? 'It kindly disagrees: <b>but</b>.' : 'It agrees and adds an idea.', meta: { k: 'g4-build-kind', reply: b[1] } };
  }
  function buildMatch() {
    var bs = R.some(BUILD, 3);
    return { q: 'Match each idea to the reply that builds on it.', type: 'match', pairs: bs.map(function (b) { return [b[0], b[1]]; }), hint: 'The reply names the speaker.',
      explain: 'A good reply links to the idea before it.', meta: { k: 'g4-build-match' } };
  }
  function clarifyTf() {
    var c = R.pick(CLARIFY), good = R.int(0, 1) === 1, say = good ? c[1] : R.pick(c[2]);
    return { q: 'Is this a good thing to say?', fig: W.means('listen', c[0]) + W.sent(say), type: 'tf', answer: good,
      why: { options: ['It politely asks so you can understand.', 'It does not help you understand.'], answer: good ? 0 : 1 },
      hint: 'Does it help you understand?', explain: W.sent(c[1]), meta: { k: 'g4-clarify-tf', say: say } };
  }
  function listenTf() {
    var good = R.int(0, 1) === 1, s = R.pick(good ? LISTEN : NOTLISTEN);
    return { q: 'True or false? A good listener does this.', fig: W.sent(s), type: 'tf', answer: good,
      why: { options: ['It helps you follow and shows interest.', 'It stops you from following the speaker.'], answer: good ? 0 : 1 },
      hint: 'Does it help you understand the speaker?', explain: good ? 'Yes, it helps you listen.' : 'No, it gets in the way.', meta: { k: 'g4-listen-tf', s: s } };
  }

  /* ---------- speaking ---------- */
  /* [what was said, a good retelling in other words, retellings that change the meaning] */
  var SAID = [['The library will close early on Friday because of a staff meeting.', 'On Friday, the library closes early for a meeting.', ['The library is closed every Friday.', 'The staff meeting is in the library on Monday.']],
    ['Bring water and a hat, because the field trip is outdoors.', 'The trip is outside, so pack water and a hat.', ['Do not bring anything on the trip.', 'The trip is indoors.']],
    ['Practice is cancelled tonight, but the game is still on Saturday.', 'No practice tonight, but the Saturday game is still on.', ['The game on Saturday is cancelled.', 'Practice is on Saturday instead.']],
    ['Please walk in the halls, because running can cause accidents.', 'Walk, do not run, in the halls so nobody gets hurt.', ['Run in the halls.', 'The halls are closed.']],
    ['The pool opens at noon on Sunday, not at ten.', 'On Sunday, the pool opens at noon instead of ten.', ['The pool opens at ten on Sunday.', 'The pool is closed on Sunday.']],
    ['Wear boots tomorrow, because the field is muddy.', 'The field is muddy, so wear boots tomorrow.', ['Wear sandals tomorrow.', 'The field is dry, so wear boots.']],
    ['The bake sale money will buy books for the library.', 'The money from the bake sale will buy library books.', ['The bake sale will sell books.', 'The money will buy a new library.']],
    ['Hand in your permission form by Thursday, or you cannot go.', 'You must hand in the form by Thursday to go.', ['Hand in the form any day you like.', 'You can go without a form.']]];
  /* [who you are speaking to, formal or friendly] */
  var AUD = [['the principal, about starting a club', 'formal'], ['a guest speaker, to thank them', 'formal'], ['the town council, about a new crosswalk', 'formal'],
    ['your best friend, at recess', 'friendly'], ['your cousin, at a birthday party', 'friendly'], ['your little brother, at home', 'friendly'],
    ['a librarian you do not know, to ask for help', 'formal'], ['a police officer visiting your class', 'formal'], ['your teammate, after a game', 'friendly'], ['your grandma, at dinner', 'friendly']];
  var LINES = { formal: ['Good morning. May I tell you about an idea?', 'Thank you for speaking to our class today.', 'Excuse me, may I ask a question?', 'Could you please help me find a book?', 'Thank you for your time.'],
    friendly: ['Hey! Want to hear my idea?', 'That was so cool!', 'Guess what?', 'Wow, you were awesome!', 'Want to play after school?'] };
  /* [a gesture, what it says] */
  var BODY = [['a thumbs up', 'Good job!'], ['a shrug', 'I do not know.'], ['a nod', 'Yes.'], ['a hand up, palm out', 'Stop.'], ['a wave', 'Hello!'], ['a finger to the lips', 'Be quiet.'],
    ['a high five', 'We did it!'], ['a big smile', 'I am glad.'], ['pointing at the door', 'Go that way.'], ['a hand cupped to the ear', 'I cannot hear you.']];
  /* [a part you are telling, how your voice sounds] */
  var MOOD = [['a sad part', 'soft and slow'], ['an exciting part', 'fast and loud'], ['a scary part', 'quiet, with pauses'], ['a funny part', 'light and bright'], ['an important fact', 'clear and steady']];
  /* [plain, with describing words] */
  var DETAIL = [['The dog ran.', 'The muddy dog ran happily through the puddles.'], ['We ate soup.', 'We slowly ate warm, spicy soup by the fire.'], ['The bird sang.', 'A tiny yellow bird sang sweetly at dawn.'],
    ['Kai skated.', 'Kai skated swiftly across the smooth, frozen pond.'], ['The wind blew.', 'The icy wind blew fiercely all night.'],
    ['The car stopped.', 'The old red car stopped suddenly at the corner.'], ['Mia laughed.', 'Mia laughed loudly at her brother' + AP + 's silly joke.'],
    ['The rain fell.', 'Cold, heavy rain fell steadily on the tent.'], ['We walked.', 'We walked quietly through the dark, snowy woods.'], ['The cat slept.', 'The fluffy grey cat slept peacefully in the sun.']];
  /* [sentence, the word that tells how] */
  var HOW = [['Hana whispered softly to the baby.', 'softly'], ['The turtle crawled slowly to the pond.', 'slowly'], ['Arjun carefully carried the eggs.', 'carefully'],
    ['The crowd cheered loudly for the team.', 'loudly'], ['Zara quickly packed her bag.', 'quickly'], ['The fox crept quietly past the den.', 'quietly'],
    ['Mia happily hugged her grandma.', 'happily'], ['The snow fell gently on the roof.', 'gently'], ['Leo bravely jumped into the cold lake.', 'bravely'], ['The kettle whistled sharply.', 'sharply']];
  var ADJ = ['muddy', 'tiny', 'warm', 'yellow', 'icy', 'smooth'];

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

  function restateTf() {
    var s = R.pick(SAID), good = R.int(0, 1) === 1, said = good ? s[1] : R.pick(s[2]);
    return { q: 'Does this say the same thing?', fig: W.means('talk', s[0]) + W.sent(said), type: 'tf', answer: good,
      why: { options: ['Every fact stayed the same.', 'A fact changed.'], answer: good ? 0 : 1 }, hint: 'Check every fact.', explain: W.sent(s[1]), meta: { k: 'g4-restate-tf', said: s[0], shown: said } };
  }
  function restateBad() {
    var s = R.pick(SAID), bad = R.pick(s[2]);
    return Q.one('Which one <b>changes</b> a fact?', bad, [s[1]], { fig: W.means('talk', s[0]), hint: 'Check each detail: who, what, when.', explain: '"' + bad + '" changes the meaning.', meta: { k: 'g4-restate-bad', said: s[0] } });
  }
  function restateMatch() {
    var ss = R.some(SAID, 3);
    return { q: 'Match each message to the same thing in other words.', type: 'match', pairs: ss.map(function (s) { return [s[0], s[1]]; }), hint: 'Look for the same facts.', explain: 'Same meaning, new words.', meta: { k: 'g4-restate-match' } };
  }
  function audKind() {
    var a = R.pick(AUD);
    return { q: 'You are speaking to <b>' + a[0] + '</b>. What kind of talk fits?', type: 'tap', tiles: ['formal', 'friendly'], answer: a[1] === 'formal' ? 0 : 1,
      hint: 'Someone you do not know well, or a serious time: formal.', explain: 'A <b>' + a[1] + '</b> time to talk.', meta: { k: 'g4-aud-kind', who: a[0] } };
  }
  function audTf() {
    var a = R.pick(AUD), kind = R.pick(['formal', 'friendly']), line = R.pick(LINES[kind]);
    return { q: 'True or false? This fits.', fig: W.means('people', a[0]) + W.sent(line), type: 'tf', answer: kind === a[1],
      why: { options: ['The words should fit the listener.', 'You can talk the same way to everyone.'], answer: 0 }, hint: 'Formal or friendly?', explain: 'This is a <b>' + a[1] + '</b> time to talk.', meta: { k: 'g4-aud-tf', who: a[0], line: line } };
  }
  function audSort() {
    return Q.all('Pick every line for a <b>formal</b> time.', R.some(LINES.formal, 2), R.some(LINES.friendly, 2), { hint: 'Formal: polite and complete.', explain: 'Formal lines are polite and complete.', meta: { k: 'g4-aud-sort' } });
  }
  function bodyWhich() {
    var b = R.pick(BODY);
    return Q.one('Which gesture says <b>' + b[1] + '</b>?', b[0], R.some(BODY.filter(function (x) { return x !== b; }), 2).map(function (x) { return x[0]; }), { hint: 'Try each one yourself.', explain: b[0].charAt(0).toUpperCase() + b[0].slice(1) + '.', meta: { k: 'g4-body-which', mean: b[1] } });
  }
  function bodyTf() {
    var b = R.pick(BODY), good = R.int(0, 1) === 1, said = good ? b[1] : R.pick(BODY.filter(function (x) { return x !== b; }))[1];
    return { q: 'True or false? <b>' + b[0].charAt(0).toUpperCase() + b[0].slice(1) + '</b> says "' + said + '"', type: 'tf', answer: good,
      hint: 'Try it yourself.', explain: b[0].charAt(0).toUpperCase() + b[0].slice(1) + ' says "' + b[1] + '"', meta: { k: 'g4-body-tf', g: b[0], said: said } };
  }
  function voiceMood() {
    var m = R.pick(MOOD);
    return Q.tiles('You are telling <b>' + m[0] + '</b>. How does your voice sound?', m[1], R.some(MOOD.filter(function (x) { return x !== m; }), 2).map(function (x) { return x[1]; }), {
      hint: 'Your voice should match the feeling.', explain: m[0].charAt(0).toUpperCase() + m[0].slice(1) + ': <b>' + m[1] + '</b>.', meta: { k: 'g4-voice-mood', part: m[0] } });
  }
  function detailTf() {
    var d = R.pick(DETAIL), rich = R.int(0, 1) === 1, s = rich ? d[1] : d[0];
    return { q: 'True or false? This helps the listener picture it.', fig: W.sent(s), type: 'tf', answer: rich,
      why: { options: ['It tells what kind, how or where.', 'It is too plain to picture.'], answer: rich ? 0 : 1 }, hint: 'Can you see it in your mind?', explain: W.sent(d[1]), meta: { k: 'g4-detail-tf', s: s } };
  }
  function howPick() {
    return Q.all('Pick every word that tells <b>how</b>.', R.some(HOW, 2).map(function (h) { return h[1]; }), R.some(ADJ, 2), {
      hint: 'Words that tell how often end in -ly.', explain: 'Words that tell how are adverbs.', meta: { k: 'g4-how-pick' } });
  }

  Atlas.register('talking', {
    full: true,
    lessons: [{
      id: 'listen', title: 'Listening and discussing', sub: 'Ask for more, build on ideas, and check what you heard.',
      concepts: [
        { slug: 'ask-more', title: 'Ask a question that gets more', exp: ['B1.1'], skill: 'ask-more',
          model: [
            step(W.means('talk', 'I went to my cousin' + AP + 's farm.'), 'A friend tells you something.'),
            step(W.sent('Did you go?'), 'Yes or no. The talk stops.'),
            step(W.sent('<b>What</b> did you do at the farm?'), 'Now they tell you more.'),
            step(W.means('talk', 'I learned to fold a paper crane.'), 'Another one.'),
            step(W.sent('<b>How</b> do you fold one?'), 'Start with what, how or why.')
          ],
          guided: [function () { return moreQ(1); }, moreTf, offTopic],
          check: [function () { return moreQ(2); }, moreTf, morePick, offTopic, function () { return moreQ(2); }],
          coach: '<p>At dinner, take turns: one person shares, the other must ask a what, how or why question before changing the topic.</p>',
          mistake: '<p>Asking yes-or-no questions only. Turn "Did you like it?" into "What did you like about it?"</p>' },
        { slug: 'build-on', title: 'Build on what others say', exp: ['B1.1'], skill: 'build-on',
          model: [
            step(W.means('people', 'Noor: Our school should plant a garden.')),
            step(W.sent('I agree with Noor, <b>and</b> we could grow beans.'), 'Name the idea, then add to it.'),
            step(W.means('people', 'Liam: Recess should be longer.'), 'Another idea.'),
            step(W.sent('I see your point, Liam, <b>but</b> we might lose reading time.'), 'You can disagree kindly.'),
            step(W.sent('What is for lunch?'), 'Off topic: it does not build.')
          ],
          guided: [function () { return buildOn(1); }, buildKind, buildTf],
          check: [function () { return buildOn(2); }, buildTf, buildKind, buildMatch, function () { return buildOn(2); }],
          coach: '<p>Give sentence starters on a card: "I agree with... and...", "I see your point, but...", "Building on what ... said..."</p>',
          mistake: '<p>Waiting for a turn and then saying something unrelated. Link your idea to the last speaker' + AP + 's.</p>' },
        { slug: 'clarify', title: 'Show you are listening, and ask to check', exp: ['B1.2'], skill: 'clarify',
          model: [
            step(W.icon('listen'), 'Look at the speaker. Nod.'),
            step(W.means('listen', 'You did not hear the second step.'), 'Lost? Wait for a pause.'),
            step(W.sent('Could you say the second step again, please?'), 'Ask politely.'),
            step(W.means('listen', 'The speaker talked too fast.')),
            step(W.sent('Could you slow down a little, please?'), 'Asking is smart, not rude.')
          ],
          guided: [clarify, listenPick, clarifyTf],
          check: [clarify, listenTf, clarifyTf, listenPick, clarify],
          coach: '<p>After any instructions, ask the child to say them back. If something is unclear, practise asking politely.</p>',
          mistake: '<p>Nodding along without understanding. It is fine, and smart, to ask.</p>' }
      ]
    }, {
      id: 'speak', title: 'Speaking clearly', sub: 'Fit your listener, say it your way, show it, and add detail.',
      concepts: [
        { slug: 'audience', title: 'Fit your words to your listener', exp: ['B1.3'], skill: 'audience',
          model: [
            step(W.means('people', 'the principal'), 'A formal time.'),
            step(W.sent('Good morning. May I tell you about an idea?'), 'Polite and complete.'),
            step(W.means('people', 'your best friend'), 'A friendly time.'),
            step(W.sent('Hey! Want to hear my idea?'), 'Relaxed is fine here.'),
            step(W.icon('think'), 'Ask: who am I talking to, and why?')
          ],
          guided: [audKind, audience, audSort],
          check: [audience, audKind, audTf, audSort, audience],
          coach: '<p>Role-play: ask for the same thing from a friend, and then from a store clerk. Talk about what changed.</p>',
          mistake: '<p>Using friendly talk with adults you do not know well. Ask: "Who am I talking to, and why?"</p>' },
        { slug: 'restate', title: 'Say it again in your own words', exp: ['B1.3'], skill: 'restate',
          model: [
            step(W.means('talk', 'Bring water and a hat, because the field trip is outdoors.')),
            step(W.sent('The trip is outside, so pack water and a hat.'), 'Same meaning, my own words.'),
            step(W.means('talk', 'The pool opens at noon on Sunday, not at ten.'), 'Another one.'),
            step(W.sent('The pool opens at ten on Sunday.'), 'Ten? A fact changed.'),
            step(W.sent('On Sunday, the pool opens at noon instead of ten.'), 'Every fact stays.')
          ],
          guided: [function () { return restate(1); }, restateBad, restateTf],
          check: [function () { return restate(2); }, restateTf, restateBad, restateMatch, function () { return restate(2); }],
          coach: '<p>After a short news story or announcement, ask the child to tell it to another family member in their own words.</p>',
          mistake: '<p>Changing a fact while restating (Friday becomes every Friday). Check each detail.</p>' },
        { slug: 'body', title: 'Your face and hands speak too', exp: ['B1.4'], skill: 'body',
          model: [
            step(W.icon('people'), 'A shrug says "I do not know."'),
            step(W.icon('people'), 'A thumbs up says "Good job!"'),
            step(W.means('talk', 'A sad part: soft and slow.'), 'Your voice shows feelings too.'),
            step(W.means('talk', 'An exciting part: fast and loud.')),
            step(W.icon('star'), 'Show size with your hands as you speak.')
          ],
          guided: [bodyOne, bodyWhich, voiceMood],
          check: [bodyOne, bodyTf, voiceMood, bodyMatch, bodyWhich],
          coach: '<p>Watch a short video with the sound off. Ask: "What can you tell from faces and hands alone?"</p>',
          mistake: '<p>Standing still and reading flat. Plan one gesture and one voice change before you speak.</p>' },
        { slug: 'detail', title: 'Add describing words', exp: ['B1.5'], skill: 'detail',
          model: [
            step(W.sent('The dog ran.'), 'Hard to picture.'),
            step(W.sent('The <b>muddy</b> dog ran <b>happily</b>.'), 'What kind? How?'),
            step(W.sent('The muddy dog ran happily <b>through the puddles</b>.'), 'Where? Now I can see it.'),
            step(W.sent('The cat slept.'), 'Another one.'),
            step(W.sent('The <b>fluffy grey</b> cat slept <b>peacefully</b> in the sun.'), 'Words that tell how often end in -ly.')
          ],
          guided: [detail, tapHow, detailTf],
          check: [detail, tapHow, detailTf, howPick, tapHow],
          coach: '<p>Play "stretch it": one person says a short sentence, the other adds a describing word or a word that tells how.</p>',
          mistake: '<p>Using the same words every time (nice, good, fun). Ask: "What kind? How? Where?"</p>' }
      ]
    }],
    practice: [
      { id: 'ask-more', name: 'Questions that get more', code: 'B1.1', gen: moreQ },
      { id: 'build-on', name: 'Building on ideas', code: 'B1.1', gen: buildOn },
      { id: 'clarify', name: 'Listening and checking', code: 'B1.2', gen: clarify },
      { id: 'audience', name: 'Fitting the listener', code: 'B1.3', gen: audience },
      { id: 'restate', name: 'Saying it in your own words', code: 'B1.3', gen: restate },
      { id: 'body', name: 'Face, hands and voice', code: 'B1.4', gen: bodyOne },
      { id: 'detail', name: 'Describing words', code: 'B1.5', gen: detail }
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
    'ask-more': [[1, 'true-false', moreTf], [1, 'off-topic', offTopic], [1, 'pick', morePick], [2, 'which', moreQ]],
    'build-on': [[1, 'kind', buildKind], [1, 'true-false', buildTf], [2, 'match', buildMatch], [2, 'which', buildOn]],
    clarify: [[1, 'listener', listenPick], [1, 'true-false', clarifyTf], [1, 'listener-tf', listenTf], [2, 'what-to-say', clarify]],
    audience: [[1, 'kind', audKind], [1, 'true-false', audTf], [2, 'sort', audSort], [2, 'which', audience]],
    restate: [[1, 'changed', restateBad], [1, 'true-false', restateTf], [2, 'match', restateMatch], [2, 'which', restate]],
    body: [[1, 'which', bodyWhich], [1, 'true-false', bodyTf], [1, 'voice', voiceMood], [2, 'match', bodyMatch]],
    detail: [[1, 'how-word', tapHow], [1, 'true-false', detailTf], [2, 'pick', howPick], [2, 'picture', detail]]
  });
})();
