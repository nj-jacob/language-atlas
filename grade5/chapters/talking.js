/* Grade 5: listening and speaking.
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

  /* [what a classmate said, a question that invites them to say more, a yes-or-no question, a question about something else] */
  var ELAB = [['I went to Manitoulin Island this summer.', 'What was your favourite part of the trip?', 'Was it hot?', 'Do you like pizza?'],
    ['I built a robot for the science fair.', 'How did you get it to move?', 'Is it big?', 'Where is the gym?'],
    ['My grandmother taught me to bead.', 'What was the hardest part to learn?', 'Is it fun?', 'Can I borrow a pencil?'],
    ['Our team lost the final game.', 'What happened in the last period?', 'Was it sad?', 'Is it recess yet?'],
    ['I read a book about the Arctic.', 'What surprised you most about it?', 'Was it long?', 'Do you have a dog?']];
  var BUILD_GOOD = ['I agree with Mia, because I saw that too.', 'Adding to what Omar said, the park also needs benches.', 'I see it a bit differently. Here is why.', 'Can you say more about that idea?'];
  var BUILD_BAD = ['That is a silly idea.', 'Talk over Mia to give my idea first.', 'Change the topic to my weekend.', 'Stay silent the whole time.'];
  var PURPOSES = ['to give directions', 'to persuade', 'to inform', 'to entertain'];
  var SAID = [['Turn left at the library, then walk two blocks.', 0], ['Stir the soup, then turn the heat down low.', 0], ['You should all vote for a longer recess. It helps us learn!', 1],
    ['Please sign our petition to save the old oak tree.', 1], ['Loons can dive deeper than a ten-storey building is tall.', 2], ['The CN Tower opened in 1976.', 2],
    ['So there I was, stuck in a snowbank, with a pizza on my head!', 3], ['Want to hear about the day my hamster escaped into the piano?', 3]];
  /* [what was said, a paraphrase in new words, a version that changes the meaning] */
  var PARA = [['The field trip is cancelled because of the storm warning.', 'We are not going on the trip, since a storm is coming.', 'The field trip is moving to the museum.'],
    ['Please hand in your permission forms by Friday.', 'Your forms are due at the end of the week.', 'You can bring the forms whenever you like.'],
    ['Wetlands soak up rain, so they help prevent floods.', 'Because wetlands hold water, there are fewer floods.', 'Wetlands cause floods when it rains.'],
    ['The library will be closed on Monday for repairs.', 'On Monday the library is shut while it is being fixed.', 'The library is open late on Monday.'],
    ['Bring a water bottle, because the hike is long and hot.', 'The hike will be hot and long, so pack water.', 'The hike is short, so no water is needed.']];
  /* [who you are speaking to, what fits, what does not fit] */
  var AUD = [['the school council', 'Good afternoon. Today I will explain why we need more recycling bins.', 'Hey, so, bins. We need more.'],
    ['a museum guide', 'Excuse me, could you tell us where the dinosaur exhibit is?', 'Where are the dinos?'],
    ['your best friend at lunch', 'Want to trade half my sandwich for your apple?', 'I wish to propose an exchange of food items.'],
    ['an Elder visiting the class', 'Thank you for sharing your teachings with us today.', 'Thanks, that was cool, bye.'],
    ['your little cousin', 'Let' + '’' + 's build a fort with the couch cushions!', 'I recommend that we construct a shelter.']];
  /* [a move, what it tells the other person] */
  var BODY = [['leaning in', 'I am interested.'], ['steady eye contact', 'I am listening to you.'], ['crossed arms', 'I am closed off.'], ['a slow nod', 'I understand.'],
    ['looking at the floor', 'I am not confident.'], ['an open palm', 'I welcome your idea.']];
  /* [plain, with vivid adjectives and adverbs] */
  var VIVID = [['The dog ran.', 'The muddy dog raced wildly across the yard.'], ['The girl sang.', 'The nervous girl sang softly into the microphone.'], ['The wind blew.', 'The icy wind howled fiercely all night.'],
    ['We ate dinner.', 'We hungrily ate Grandma' + '’' + 's spicy jollof rice.'], ['The car went up the hill.', 'The rusty car rattled slowly up the steep hill.']];

  /* ---------- question makers ---------- */
  function elaborate(lv) {
    var e = R.pick(ELAB);
    return Q.one('A classmate says this. Which question invites them to <b>say more</b>?', e[1], [e[2]].concat(lv > 1 ? [e[3]] : []), { fig: W.means('talk', e[0]),
      prompt: 'Which question cannot be answered with just yes or no?', hint: 'Questions that start with what, how or why invite more.', explain: 'An open question keeps them talking.', meta: { k: 'g5-elaborate', said: e[0] } });
  }
  function buildOn() {
    return Q.all('In a group discussion, pick every good way to <b>respond to others</b>.', R.some(BUILD_GOOD, 2), R.some(BUILD_BAD, 2), {
      hint: 'Good responses link to what someone said.', explain: 'Agree, add on, disagree politely, or ask for more.', meta: { k: 'g5-build-on' } });
  }
  function interestTf() {
    var right = R.int(0, 1) === 1, said = right ? 'Nodding while a speaker talks shows interest.' : 'Calling out in the middle of a speaker' + '’' + 's sentence shows interest.';
    return { q: 'True or false?', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['It shows interest without stopping the speaker.', 'It stops the speaker, so wait for a pause.'], answer: right ? 0 : 1 },
      hint: 'Does it let the speaker keep going?', explain: 'Show interest at the right times: nod, smile, then speak at a pause.', meta: { k: 'g5-interest-tf', said: said } };
  }
  function purpose(lv) {
    var s = R.pick(SAID);
    return Q.tiles('Why is the speaker saying this?', PURPOSES[s[1]], R.some(PURPOSES.filter(function (p, i) { return i !== s[1]; }), lv > 1 ? 3 : 2), { fig: W.means('listen', s[0]),
      hint: 'Steps? An opinion? Facts? A story for fun?', explain: 'It is <b>' + PURPOSES[s[1]] + '</b>.', meta: { k: 'g5-listen-purpose', said: s[0] } });
  }

  function paraphrase(lv) {
    var p = R.pick(PARA);
    return Q.one('Which is the best <b>paraphrase</b>?', p[1], [p[2]].concat(lv > 1 ? [p[0]] : []), { fig: W.means('talk', p[0]), prompt: 'Same meaning, your own words.',
      hint: 'Keep the meaning. Change the words.', explain: W.sent(p[1]), meta: { k: 'g5-paraphrase', said: p[0] } });
  }
  function audience() {
    var a = R.pick(AUD);
    return Q.one('You are speaking to <b>' + a[0] + '</b>. Which fits best?', a[1], [a[2]], { prompt: 'Formal or informal: who is listening?', hint: 'Match how you speak to who is listening.',
      explain: 'This fits ' + a[0] + '.', meta: { k: 'g5-audience', who: a[0] } });
  }
  function bodyMeans(lv) {
    var b = R.pick(BODY);
    return Q.tiles('What does <b>' + b[0] + '</b> usually tell the other person?', b[1], R.some(BODY.filter(function (x) { return x !== b; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Try it yourself. How does it feel?', explain: '<b>' + b[0] + '</b>: ' + b[1], meta: { k: 'g5-body', move: b[0] } });
  }
  function matchBody() {
    var b = R.some(BODY, 3);
    return { q: 'Match each move to what it tells others.', type: 'match', pairs: b.map(function (x) { return [x[0], x[1]]; }), hint: 'Your body speaks before you do.', explain: 'Body language adds to your words.', meta: { k: 'g5-match-body' } };
  }
  function vivid() {
    var v = R.pick(VIVID);
    return Q.one('Which uses <b>vivid adjectives and adverbs</b> to say more?', v[1], [v[0]], { hint: 'Which one helps you see and hear it?', explain: W.sent(v[1]), meta: { k: 'g5-vivid' } });
  }

  Atlas.register('talking', {
    lessons: [{
      id: 'group', title: 'Listening in a group', sub: 'Show interest, invite more, and build on ideas.',
      concepts: [
        { slug: 'say-more', title: 'Ask a question that invites more', exp: ['B1.1'], skill: 'listening',
          model: [
            step(W.means('talk', 'I built a robot for the science fair.'), 'A classmate shares.'),
            step(W.sent('Is it big?'), 'Yes or no. The talk stops.'),
            step(W.sent('How did you get it to move?'), 'An open question: now they explain.')
          ],
          guided: [function () { return elaborate(1); }, interestTf],
          check: [function () { return elaborate(2); }, interestTf],
          coach: '<p>At dinner, practise "tell me more" questions: What was the best part? How did you do it? Why did you choose it?</p>',
          mistake: '<p>Asking yes-or-no questions. They end the conversation. Start with what, how or why.</p>' },
        { slug: 'build-on', title: 'Build on what others say', exp: ['B1.1'], skill: 'listening',
          model: [
            step(W.sent('I agree with Mia, because...'), 'Link to their idea.'),
            step(W.sent('Adding to what Omar said...'), 'Add something new.'),
            step(W.sent('I see it a bit differently...'), 'Disagree politely, with a reason.')
          ],
          guided: [buildOn, buildOn],
          check: [buildOn, buildOn],
          coach: '<p>Put three sentence starters on the fridge: "I agree with... because", "Adding to...", "I see it differently...". Use them in family talks.</p>',
          mistake: '<p>Waiting for a turn without really listening. A good response uses the last speaker' + '’' + 's words.</p>' },
        { slug: 'purpose', title: 'Listen for the purpose', exp: ['B1.2'], skill: 'listening',
          model: [
            step(W.means('listen', 'Turn left at the library...'), 'Steps: <b>directions</b>.'),
            step(W.means('listen', 'You should all vote for...'), 'An opinion: <b>to persuade</b>.'),
            step(W.means('listen', 'Loons can dive very deep.'), 'Facts: <b>to inform</b>.')
          ],
          guided: [function () { return purpose(1); }, function () { return purpose(1); }],
          check: [function () { return purpose(2); }, function () { return purpose(2); }],
          coach: '<p>Before listening to a podcast or announcement, ask: "Why do you think they are telling us this?" After, check.</p>',
          mistake: '<p>Believing every persuasive message. Knowing the purpose helps you decide what to think.</p>' }
      ]
    }, {
      id: 'speak', title: 'Speaking clearly', sub: 'Your own words, the right style, and vivid details.',
      concepts: [
        { slug: 'paraphrase', title: 'Paraphrase: same meaning, new words', exp: ['B1.3'], skill: 'speaking',
          model: [
            step(W.means('talk', 'Please hand in your forms by Friday.'), 'The teacher said this.'),
            step(W.sent('Your forms are due at the end of the week.'), 'Same meaning, my words.'),
            step(W.sent('Bring the forms whenever you like.'), 'The meaning changed. Not a paraphrase.')
          ],
          guided: [function () { return paraphrase(1); }, audience],
          check: [function () { return paraphrase(2); }, audience],
          coach: '<p>After you give the child directions, ask them to "tell it back in your own words". It checks understanding, too.</p>',
          mistake: '<p>Repeating the exact words. That is restating; a paraphrase uses new words with the same meaning.</p>' },
        { slug: 'body', title: 'Your body helps your message', exp: ['B1.4'], skill: 'speaking',
          model: [
            step(W.sent('leaning in'), '"I am interested."'),
            step(W.sent('crossed arms'), '"I am closed off."'),
            step(W.icon('people'), 'Eye contact and open hands help listeners trust you.')
          ],
          guided: [function () { return bodyMeans(1); }, function () { return bodyMeans(1); }],
          check: [function () { return bodyMeans(2); }, matchBody],
          coach: '<p>Watch a short speech with the sound off. Ask: "What can you tell just from their body?"</p>',
          mistake: '<p>Standing stiff with arms crossed while presenting. Relax your arms and use them to show size, shape or feeling.</p>' },
        { slug: 'vivid', title: 'Vivid words say more', exp: ['B1.5'], skill: 'speaking',
          model: [
            step(W.sent('The wind blew.'), 'Plain.'),
            step(W.sent('The <b>icy</b> wind howled <b>fiercely</b> all night.'), 'An adjective (icy) and an adverb (fiercely).'),
            step(W.sent('Have you ever heard a wind like that?'), 'Mix in a question to pull listeners in.')
          ],
          guided: [vivid, vivid],
          check: [vivid, vivid],
          coach: '<p>Play "add two": the child says a plain sentence, then adds one describing word and one -ly word.</p>',
          mistake: '<p>Piling on too many describing words. One or two strong ones work better than five.</p>' }
      ]
    }],
    practice: [
      { id: 'listening', name: 'Listening in a group', code: 'B1.1, B1.2', gen: elaborate },
      { id: 'speaking', name: 'Speaking clearly', code: 'B1.3, B1.4, B1.5', gen: paraphrase }
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
    listening: [[1, 'build-on', buildOn], [1, 'purpose', purpose], [1, 'true-false', interestTf]],
    speaking: [[1, 'audience', audience], [1, 'body', bodyMeans], [1, 'vivid', vivid], [2, 'match-body', matchBody]]
  });
})();
