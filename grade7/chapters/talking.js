/* Grade 7: listening and speaking.
   Ontario 2023 Language, Grade 7, B1 Oral and Non-Verbal Communication:
   B1.1 listening skills, relevant questions and responding to others in group discussions   B1.2 listening strategies before, during and after listening
   B1.3 purpose and audience for speaking in formal and informal contexts                     B1.4 oral and non-verbal strategies, and how they vary across cultures
   B1.5 precise word choice, sentence variety, and the active or passive voice as appropriate
   Speaking and listening themselves are activities with a grown-up, marked with a rubric; the computer checks knowing what to do.
   All examples are written for this site. Answer checks: tests/verify/grade7-talking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* ---------- group discussions: [topic, relevant questions, off-topic questions] ---------- */
  var DISC = [['Should our school start later in the morning?', ['How would a later start change bus times?', 'What does research say about teens and sleep?'], ['What is your favourite breakfast?', 'Who has the best phone?']],
    ['How can our town cut down on food waste?', ['Could grocery stores give unsold food to food banks?', 'How much food does a family throw out each week?'], ['Which restaurant has the best fries?', 'Did anyone watch the game last night?']],
    ['Should cellphones be allowed in class?', ['Could phones help with research in class?', 'How would teachers handle distractions?'], ['What colour is your phone case?', 'Which video game is the hardest?']]];
  var GOOD_REPLY = ['I agree with Noor, and I would add that buses would be less crowded.', 'Could you explain what you mean by that?', 'I see it differently, because some students have jobs after school.'];
  var BAD_REPLY = ['That is a ridiculous idea.', 'Anyway, I want to talk about something else.', 'Whatever. It does not matter.'];
  function relevant(lv) {
    var d = R.pick(DISC);
    return Q.one('The group is discussing this. Which question is <b>relevant</b>?', R.pick(d[1]), R.some(d[2], lv > 1 ? 2 : 1), { fig: W.means('people', d[0]),
      prompt: 'Does the question help the group answer the topic?', hint: 'A relevant question is about the topic and moves the talk forward.', explain: 'It keeps the discussion on the topic.', meta: { k: 'g7-relevant', topic: d[0] } });
  }
  function reply(lv) {
    return Q.one('Which response respects others and moves the discussion forward?', R.pick(GOOD_REPLY), R.some(BAD_REPLY, lv > 1 ? 2 : 1), {
      hint: 'Build on, ask about, or respectfully disagree with what someone said.', explain: 'Good responses connect to what the last speaker said.', meta: { k: 'g7-reply' } });
  }
  function replyPick() {
    return Q.all('Pick every response that helps a group discussion.', R.some(GOOD_REPLY, 2), R.some(BAD_REPLY, 2), { hint: 'Would it make the speaker want to keep talking?',
      explain: 'Build on ideas, ask for more, and disagree with reasons.', meta: { k: 'g7-reply-pick' } });
  }
  /* listening strategies by stage */
  var STAGE = [['Think about what you already know about the topic.', 'before'], ['Set a purpose: what do I want to find out?', 'before'], ['Jot down key words and ideas.', 'during'],
    ['Watch the speaker' + '’' + 's face and gestures for clues.', 'during'], ['Summarize the main idea in your own words.', 'after'], ['Ask a question to clear up something confusing.', 'after']];
  function stage(lv) {
    var s = R.pick(STAGE), all = ['before', 'during', 'after'];
    return Q.tiles('When do you use this listening strategy?', s[1] + ' listening', all.filter(function (x) { return x !== s[1]; }).map(function (x) { return x + ' listening'; }).slice(0, lv > 1 ? 2 : 1), {
      fig: W.means('listen', s[0]), hint: 'Getting ready, listening now, or thinking back?', explain: s[0] + ' <b>' + cap(s[1]) + '</b> listening.', meta: { k: 'g7-stage', s: s[0] } });
  }
  function stageOrder() {
    var b = R.pick(STAGE.filter(function (s) { return s[1] === 'before'; })), d = R.pick(STAGE.filter(function (s) { return s[1] === 'during'; })), a = R.pick(STAGE.filter(function (s) { return s[1] === 'after'; }));
    return { q: 'Put these listening strategies in order.', type: 'order', items: [b[0], d[0], a[0]], first: 'First', last: 'Last', hint: 'Before, during, then after.', explain: 'Before, during, after.', meta: { k: 'g7-stage-order' } };
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  /* asking for clarification: [what you heard, a good clarifying question, not clarifying] */
  var CLARIFY = [['The speaker says the plan will cost "a lot".', 'About how much will it cost?', 'Can we go now?'], ['The speaker uses the word "sustainable" quickly.', 'What do you mean by sustainable?', 'That word is too long.'],
    ['The speaker mentions "the report" but not which one.', 'Which report are you talking about?', 'I already know everything about it.']];
  function clarify() {
    var c = R.pick(CLARIFY);
    return Q.one('Which question asks for <b>clarification</b>?', c[1], [c[2]], { fig: W.means('listen', c[0]), hint: 'It asks the speaker to explain or give more detail.', explain: c[1], meta: { k: 'g7-clarify', s: c[0] } });
  }

  /* ---------- speaking for an audience: [situation, formal or informal, a fitting opening, one that does not fit] ---------- */
  var AUD = [['presenting to the school council', 'formal', 'Good afternoon. Today I will propose a quiet room for our school.', 'Hey, so, like, we want a quiet room.'],
    ['telling a friend about your weekend', 'informal', 'You will not believe what happened at the lake!', 'Good afternoon. I will now describe my weekend.'],
    ['giving a speech at a Remembrance Day assembly', 'formal', 'Today we gather to remember those who served.', 'Okay, guys, quick thing about Remembrance Day.'],
    ['explaining a game to your younger cousin', 'informal', 'Okay, here is how it works. You roll first.', 'I shall now explain the regulations of this game.'],
    ['asking the principal for a meeting', 'formal', 'Excuse me, Ms. Okafor. May I set up a time to talk with you?', 'Yo, can we chat later?'],
    ['cheering on your team at a game', 'informal', 'Let' + '’' + 's go, Hawks! You have got this!', 'I would like to formally encourage the team.']];
  function audience(lv) {
    var a = R.pick(AUD), other = R.pick(AUD.filter(function (x) { return x !== a && x[1] === a[1]; }));
    return Q.one('Which opening fits best when <b>' + a[0] + '</b>?', a[2], [a[3]].concat(lv > 1 && other ? [other[3]] : []), { prompt: 'Who is listening? Is it formal or informal?',
      hint: 'Match your words to the audience and purpose.', explain: 'This is <b>' + a[1] + '</b>: ' + a[2], meta: { k: 'g7-audience', s: a[0] } });
  }
  function formality() {
    var a = R.pick(AUD);
    return Q.tiles('Is this a <b>formal</b> or <b>informal</b> speaking situation?', a[1], [a[1] === 'formal' ? 'informal' : 'formal'], { fig: W.means('talk', a[0]),
      hint: 'Formal: a larger or more official audience. Informal: friends and family.', explain: cap(a[0]) + ': <b>' + a[1] + '</b>.', meta: { k: 'g7-formality', s: a[0] } });
  }
  /* body language: [what the speaker does, what it usually shows] */
  var BODY = [['leans forward and nods', 'interest'], ['crosses arms and looks away', 'not wanting to listen'], ['speaks slowly and pauses after a key point', 'that the point matters'],
    ['uses open hands while explaining', 'openness and honesty'], ['taps a foot and checks the clock', 'impatience']];
  function body(lv) {
    var b = R.pick(BODY);
    return Q.one('A speaker <b>' + b[0] + '</b>. What does it usually show?', b[1], R.some(BODY.filter(function (x) { return x !== b; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: W.icon('people'), hint: 'Picture someone doing it. How do they seem?', explain: 'It usually shows <b>' + b[1] + '</b>, though meanings can differ between people and cultures.', meta: { k: 'g7-body', s: b[0] } });
  }
  function cultureTf() {
    var right = R.int(0, 1) === 1, said = right ? 'Eye contact can mean respect in one culture and rudeness in another.' : 'Every gesture means the same thing in every culture.';
    return { q: Q.name() + ' says:', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['Non-verbal signals can mean different things across cultures.', 'Non-verbal signals never change.'], answer: 0 },
      hint: 'Do all families and cultures use gestures the same way?', explain: 'Signals like eye contact, gestures and personal space vary across cultures.', meta: { k: 'g7-culture-tf', said: said } };
  }

  /* ---------- active and passive voice: [active, passive] ---------- */
  var VOICE = [['The goalie stopped the puck.', 'The puck was stopped by the goalie.'], ['Our class planted twenty trees.', 'Twenty trees were planted by our class.'],
    ['The storm knocked down the power lines.', 'The power lines were knocked down by the storm.'], ['Hana wrote the winning essay.', 'The winning essay was written by Hana.'],
    ['The council approved the new park.', 'The new park was approved by the council.'], ['A volunteer fixed the broken bench.', 'The broken bench was fixed by a volunteer.']];
  function whichVoice(lv) {
    var v = R.pick(VOICE), act = R.int(0, 1) === 1, s = act ? v[0] : v[1];
    return { q: 'Is this sentence in the <b>active</b> or <b>passive</b> voice?', fig: W.sent(s), type: 'tap', tiles: ['active: the subject does the action', 'passive: the subject receives the action'], answer: act ? 0 : 1,
      prompt: 'Who does the action? Is that person or thing the subject?', hint: 'Passive voice often uses was or were plus "by".', explain: act ? 'The subject does the action: active.' : 'The subject receives the action: passive.', meta: { k: 'g7-which-voice', s: s } };
  }
  function toActive(lv) {
    var v = R.pick(VOICE), other = R.pick(VOICE.filter(function (x) { return x !== v; }));
    return Q.one('Rewrite it in the <b>active</b> voice.', v[0], [v[1]].concat(lv > 1 ? [other[0]] : []), { fig: W.sent(v[1]), hint: 'Start with who did it.',
      explain: W.sent(v[0]), meta: { k: 'g7-to-active', s: v[1] } });
  }
  /* when the passive is the better choice: the doer is unknown or does not matter */
  var PASSIVE_FITS = [['The window was broken overnight.', 'Nobody knows who did it.'], ['The results will be posted on Friday.', 'Who posts them does not matter.'], ['The bridge was built in 1932.', 'The builders are not the point.']];
  function whenPassive() {
    var p = R.pick(PASSIVE_FITS);
    return Q.one('Why is the passive voice a good choice here?', p[1], ['It makes the sentence shorter.', 'Passive is always more correct.'], { fig: W.sent(p[0]),
      hint: 'Passive voice puts the focus on what happened, not who did it.', explain: p[1], meta: { k: 'g7-when-passive', s: p[0] } });
  }
  /* precise words: [plain sentence, the vague word, a precise and descriptive choice, weaker choices] */
  var PRECISE = [['The dog ate its food.', 'ate', 'gulped down', ['had', 'got']], ['She said, “Stop!”', 'said', 'shouted', ['told', 'went']], ['The view from the lookout was nice.', 'nice', 'breathtaking', ['good', 'okay']],
    ['He walked into the room after losing the game.', 'walked', 'trudged', ['went', 'moved']], ['The soup was good.', 'good', 'rich and spicy', ['fine', 'okay']], ['They ran to catch the bus.', 'ran', 'sprinted', ['went', 'moved']]];
  function precise(lv) {
    var p = R.pick(PRECISE);
    return Q.one('Which word or phrase is most <b>precise</b> in place of <b>' + p[1] + '</b>?', p[2], p[3].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(p[0].replace(p[1], '<mark class="hl">' + p[1] + '</mark>')),
      hint: 'Which choice paints the clearest picture?', explain: W.sent(p[0].replace(p[1], '<b>' + p[2] + '</b>')), meta: { k: 'g7-precise', s: p[0] } });
  }

  Atlas.register('talking', {
    lessons: [{
      id: 'listening', title: 'Listening in discussions', sub: 'Relevant questions, helpful replies and listening strategies.',
      concepts: [
        { slug: 'relevant', title: 'Ask questions that move the talk forward', exp: ['B1.1'], skill: 'listening',
          model: [
            step(W.means('people', 'Should cellphones be allowed in class?'), 'The topic.'),
            step(W.sent('Could phones help with research in class?'), 'On topic: relevant.'),
            step(W.sent('What colour is your phone case?'), 'Off topic.'),
            step(W.sent('I agree with Noor, and I would add...'), 'Build on what was said.')
          ],
          guided: [function () { return relevant(1); }, function () { return reply(1); }],
          check: [function () { return relevant(2); }, replyPick],
          coach: '<p>At dinner, hold a five-minute discussion on a real question. Afterward, ask: "Which question helped us most?"</p>',
          mistake: '<p>Waiting to talk instead of listening. A good reply starts with what the last speaker said.</p>' },
        { slug: 'strategies', title: 'Listen before, during and after', exp: ['B1.2'], skill: 'listening',
          model: [
            step(W.means('think', 'What do I already know?'), 'Before.'),
            step(W.means('write', 'Jot key words.'), 'During.'),
            step(W.means('talk', 'Sum it up. Ask about what was unclear.'), 'After.')
          ],
          guided: [function () { return stage(1); }, clarify],
          check: [stageOrder, clarify],
          coach: '<p>Before a podcast or video, ask the child to name one thing they want to find out. Afterward, check if they found it.</p>',
          mistake: '<p>Writing down every word. Key words and ideas are enough.</p>' }
      ]
    }, {
      id: 'speaking', title: 'Speaking to an audience', sub: 'Words, voice and body for the situation.',
      concepts: [
        { slug: 'audience', title: 'Formal or informal?', exp: ['B1.3'], skill: 'speaking',
          model: [
            step(W.means('people', 'the school council'), 'Formal: full sentences, polite openings.'),
            step(W.means('talk', 'a friend'), 'Informal: relaxed, everyday words.')
          ],
          guided: [formality, function () { return audience(1); }],
          check: [function () { return audience(2); }, formality],
          coach: '<p>Practise one message twice: once for a friend, once for the principal. Notice the changes in words and voice.</p>',
          mistake: '<p>Slang in a formal talk, or sounding stiff with friends. Ask: "Who is listening?"</p>' },
        { slug: 'body', title: 'Your body speaks too', exp: ['B1.4'], skill: 'speaking',
          model: [
            step(W.means('people', 'leans in, nods'), 'Interested.'),
            step(W.means('not', 'arms crossed, looks away'), 'Closed off.'),
            step(W.means('think', 'eye contact'), 'Respectful in some cultures, rude in others.')
          ],
          guided: [function () { return body(1); }, cultureTf],
          check: [function () { return body(2); }, cultureTf],
          coach: '<p>Watch a short speech with the sound off. What do the speaker' + '’' + 's face and hands tell you? Talk about how customs differ between families and cultures.</p>',
          mistake: '<p>Judging others by one set of rules. A listener who looks down may be showing respect, not boredom.</p>' }
      ]
    }, {
      id: 'word-choice', title: 'Word choice and voice', sub: 'Precise words, active and passive.',
      concepts: [
        { slug: 'active', title: 'Active voice: the subject does the action', exp: ['B1.5'], skill: 'voice',
          model: [
            step(W.sent('<b>The goalie</b> stopped the puck.'), 'The goalie acts: active.'),
            step(W.sent('<b>The puck</b> was stopped by the goalie.'), 'The puck receives: passive.'),
            step(W.sent('The window was broken overnight.'), 'Doer unknown? Passive fits.')
          ],
          guided: [function () { return whichVoice(1); }, function () { return toActive(1); }],
          check: [function () { return whichVoice(2); }, whenPassive],
          coach: '<p>Active voice is usually clearer and livelier. Passive is useful when the doer is unknown or unimportant.</p>',
          mistake: '<p>Thinking passive voice is wrong. It is a choice; use it on purpose.</p>' },
        { slug: 'precise', title: 'Precise words paint a picture', exp: ['B1.5'], skill: 'voice',
          model: [
            step(W.sent('The dog <mark class="hl">ate</mark> its food.'), 'Vague.'),
            step(W.sent('The dog <b>gulped down</b> its food.'), 'Now you can see it.')
          ],
          guided: [function () { return precise(1); }, function () { return precise(1); }],
          check: [function () { return precise(2); }, function () { return precise(2); }],
          coach: '<p>Keep a list of tired words (nice, good, went, said) and three better choices for each.</p>',
          mistake: '<p>Choosing the longest word. Precise means the most exact, not the fanciest.</p>' }
      ]
    }],
    practice: [
      { id: 'listening', name: 'Listening in discussions', code: 'B1.1, B1.2', gen: relevant },
      { id: 'speaking', name: 'Speaking to an audience', code: 'B1.3, B1.4', gen: audience },
      { id: 'voice', name: 'Precise words and active voice', code: 'B1.5', gen: whichVoice }
    ],
    tasks: [
      { id: 'discussion', title: 'A real discussion', code: 'B1.1', pic: W.icon('people'), say: 'Discuss: should our town ban plastic bags? Ask one relevant question and build on one idea.',
        run: ['Hold a 10-minute discussion with two or three people (family is fine).', 'Listen for: a relevant question, a reply that builds on someone else, and a respectful disagreement.', 'Afterward, ask the child which reply moved the discussion forward most.'],
        rubric: ['Rarely joins in, or goes off topic.', 'Joins in, but replies do not connect to others.', 'Asks a relevant question and builds on others.', 'Leads the talk forward, disagrees respectfully with reasons, and invites quiet voices in.'] },
      { id: 'podcast', title: 'Listen and sum it up', code: 'B1.2', pic: W.icon('listen'), say: 'Listen to a short podcast or news clip. Then tell the main idea in two sentences.', write: true,
        run: ['Choose a 3 to 5 minute clip for young people (a news podcast, a radio piece).', 'Before: the child writes one question they hope it answers. During: key words only. After: two-sentence summary and one clarifying question.'],
        rubric: ['Cannot say what it was about.', 'Recalls details but not the main idea.', 'Gives the main idea and some key details.', 'Clear summary, a thoughtful question, and notes on the speaker' + '’' + 's tone.'] },
      { id: 'formal-talk', title: 'A two-minute formal talk', code: 'B1.3', pic: W.icon('talk'), say: 'Give a two-minute talk to your family as if they were the school council.',
        run: ['The child picks a change they want at school and plans an opening, three points and a closing.', 'They present standing up. Listen for formal words, a clear order and a strong close.'],
        rubric: ['Unclear purpose; informal throughout.', 'Some structure; slips into slang often.', 'Clear purpose, formal language, logical order.', 'Persuasive, well paced and confident, and suits the audience throughout.'] },
      { id: 'delivery', title: 'Voice and body', code: 'B1.4', pic: W.icon('people'), say: 'Give your talk again. This time use pauses, eye contact and gestures.',
        run: ['Watch the talk again (or a recording of it).', 'Look for pauses after key points, natural gestures, and posture that shows confidence.', 'Ask: "Which of your choices helped the audience most?"'],
        rubric: ['Reads from notes; little expression.', 'Some expression; gestures distract.', 'Pauses, gestures and posture support the message.', 'Delivery is natural and adjusted to the audience, and the child explains the choices.'],
        coach: '<p>Talk about how expectations for eye contact and gestures differ between cultures and settings. There is no single right way.</p>' }
    ]
  });

  Q.shapes('talking', {
    listening: [[1, 'reply', reply], [1, 'stage', stage], [1, 'clarify', clarify], [2, 'order', stageOrder], [2, 'pick', replyPick]],
    speaking: [[1, 'formality', formality], [1, 'body', body], [2, 'culture', cultureTf]],
    voice: [[1, 'to-active', toActive], [1, 'precise', precise], [2, 'when-passive', whenPassive]]
  });
})();
