/* Grade 8: listening and speaking.
   Ontario 2023 Language, Grade 8, B1 Oral and Non-Verbal Communication:
   B1.1 effective listening skills: paraphrasing, open-ended questions, relevant responses, reflecting
   B1.2 listening strategies; analyze information given orally and non-verbally; seek clarification; identify relevant evidence
   B1.3 purpose and audience in formal and informal contexts; adapt speaking strategies
   B1.4 oral and non-verbal strategies, and how their use may vary across cultures
   B1.5 precise, descriptive and subject-specific words, and cohesive sentences
   The computer checks the knowing parts. Speaking and listening themselves are activities with a grown-up, marked with a rubric.
   All sentences are written for this site. Answer checks: tests/verify/grade8-talking.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;

  /* [what someone says, a fair paraphrase, two that change the meaning] */
  var SAID = [
    ['We should hold the fundraiser in March, because people have more time after the holidays.', 'You think March is better because people are less busy then.', ['You think the fundraiser should be cancelled.', 'You think the holidays are the best time to raise money.']],
    ['The new bike lanes are safer, but they make the street too narrow for buses.', 'So the lanes help cyclists but cause problems for buses.', ['So the bike lanes should be removed right away.', 'So buses are faster now.']],
    ['I liked the novel, although the ending felt rushed.', 'You enjoyed it overall, but wanted a slower ending.', ['You did not like the novel at all.', 'You thought the ending was the best part.']],
    ['Our group needs one more source, preferably a recent one.', 'So we still need a source, ideally a new one.', ['So we have enough sources already.', 'So any old source will do.']]];
  var OPEN = ['What made you choose that ending?', 'How could we make the plan work for everyone?', 'Why do you think the character lied?', 'What would you change about the proposal?', 'How did the experiment surprise you?'];
  var CLOSED = ['Did you like it?', 'Is it finished?', 'Was it long?', 'Do you agree?', 'Are you done?'];
  /* [the discussion topic, a response that stays on topic, two that do not] */
  var TOPIC = [['Should our school have a longer lunch?', 'A longer lunch would give clubs more time to meet.', ['My cousin has a new puppy.', 'I saw a great movie on the weekend.']],
    ['How can we reduce waste in the cafeteria?', 'We could switch to reusable trays and cutlery.', ['The gym needs new basketballs.', 'My favourite subject is history.']],
    ['Was the main character right to leave home?', 'She left to protect her brother, so I think she was right.', ['I have read four books this month.', 'The cover of the book is blue.']]];
  var CLARIFY = ['Could you explain what you mean by that?', 'Do you mean the meeting is on Thursday, not Tuesday?', 'What do you mean by "sustainable"?'];
  var NOCLARIFY = ['That sounds great.', 'I already knew that.', 'Okay, whatever you think.', 'Let' + '’' + 's change the subject.'];
  /* [a passage, the claim, the detail that supports it, details that do not] */
  var EVID = [[T.library, 'The library should stay open late.', 'Last year, the library had more than 12 000 visits between 6 p.m. and 9 p.m.', ['Sincerely, Mei Lin Chen, Grade 8 student', 'Dear Editor,']],
    [T.rooftop, 'The garden helps the school.', 'The classrooms below stay cooler in June.', ['Many city schoolyards are covered in asphalt and have almost no shade.', 'Soil, plants and shade cloth now cover about 400 square metres.']],
    [T.roads, 'Warmer winters are a problem for some northern communities.', 'As a result, the roads stay open for fewer weeks, and less can be delivered.', ['Some communities in Northern Ontario have no road that is open all year.', 'Some First Nations are working with governments to plan roads that can be used all year.']]];

  /* [situation, formal or informal] */
  var SITU = [['presenting to the school board', 'formal'], ['chatting with a friend at lunch', 'informal'], ['a job interview at a garden centre', 'formal'],
    ['a group chat with your teammates', 'informal'], ['a speech at a Remembrance Day assembly', 'formal'], ['telling your cousin about a movie', 'informal']];
  var FORMAL = ['Good evening. Thank you for the chance to speak today.', 'I would like to explain why this proposal matters.', 'Thank you for your time and attention.'];
  var INFORMAL = ['Hey, so basically here' + '’' + 's the thing.', 'Okay, you' + '’' + 're gonna love this.', 'Anyway, that' + '’' + 's it, I guess.'];
  /* [body language, what it often shows] */
  var BODY = [['leaning forward', 'interest'], ['nodding', 'following along or agreeing'], ['arms crossed tightly', 'disagreement or discomfort'], ['checking a phone', 'not paying attention'], ['an open, relaxed stance', 'confidence']];
  /* [vague, precise] */
  var PRECISE = [['The thing in the cell makes energy.', 'The mitochondria in the cell release energy.'], ['It went up a lot.', 'The temperature rose by 12 degrees.'],
    ['The guy in charge back then signed it.', 'Sir John A. Macdonald, the first prime minister, signed it.'], ['The plant stuff happens in the leaves.', 'Photosynthesis happens in the leaves.'],
    ['We put the stuff together.', 'We assembled the circuit.']];
  /* [first sentence, the linking word, the second sentence] */
  var LINK = [['Recycling saves resources.', 'In addition', 'it keeps waste out of landfills.'], ['The plan is costly.', 'However', 'it would help hundreds of students.'],
    ['The pipes froze overnight.', 'As a result', 'the school closed for the day.'], ['Mix the dry ingredients.', 'Next', 'add the milk slowly.']];

  /* ---------- question makers: listening ---------- */
  function paraphrase(lv) {
    var s = R.pick(SAID);
    return Q.one('Which is the best <b>paraphrase</b>?', s[1], s[2].slice(0, lv > 1 ? 2 : 1).concat(lv > 2 ? ['You said, "' + s[0] + '"'] : []), { fig: W.means('talk', s[0]),
      prompt: 'Same meaning, your own words.', hint: 'A paraphrase keeps the speaker' + '’' + 's meaning but uses different words.', explain: s[1], meta: { k: 'g8-paraphrase', s: s[0] } });
  }
  function openQ(lv) {
    return Q.one('Which question is <b>open-ended</b>?', R.pick(OPEN), R.some(CLOSED, lv > 1 ? 3 : 2), { hint: 'An open-ended question cannot be answered with yes or no.', explain: 'Open questions start with what, how or why, and invite a longer answer.', meta: { k: 'g8-open' } });
  }
  function pickOpen() {
    return Q.all('Pick every <b>open-ended</b> question.', R.some(OPEN, 2), R.some(CLOSED, 2), { hint: 'Could someone answer it with just yes or no?', explain: 'Open questions keep a discussion going.', meta: { k: 'g8-pick-open' } });
  }
  function relevant() {
    var t = R.pick(TOPIC);
    return Q.one('Which response is <b>relevant</b> to the discussion?', t[1], t[2], { fig: W.means('people', t[0]), hint: 'Stay on the topic everyone is discussing.', explain: t[1], meta: { k: 'g8-relevant', t: t[0] } });
  }
  function clarify() {
    return Q.one('You did not understand. Which response <b>asks for clarification</b>?', R.pick(CLARIFY), R.some(NOCLARIFY, 2), { hint: 'Ask a question about the part you did not understand.', explain: 'A clarifying question checks the speaker' + '’' + 's meaning.', meta: { k: 'g8-clarify' } });
  }
  function evidence() {
    var e = R.pick(EVID);
    return Q.one('Which detail best supports this claim: <b>' + e[1] + '</b>', e[2], e[3], { fig: T.show(e[0]), prompt: 'Which detail gives a reason or a fact for the claim?',
      hint: 'Evidence is a fact or detail that makes the claim believable.', explain: W.sent(e[2]), meta: { k: 'g8-evidence-talk', claim: e[1] } });
  }

  /* ---------- speaking ---------- */
  function register(lv) {
    var s = R.pick(SITU), formal = s[1] === 'formal';
    return Q.one('You are <b>' + s[0] + '</b>. Which opening fits?', R.pick(formal ? FORMAL : INFORMAL), R.some(formal ? INFORMAL : FORMAL, lv > 1 ? 2 : 1), { prompt: 'Formal or informal?',
      hint: 'Formal: complete sentences, no slang. Informal: relaxed, like talking to a friend.', explain: 'This situation is <b>' + s[1] + '</b>.', meta: { k: 'g8-register', sit: s[0] } });
  }
  function formalOrNot() {
    var s = R.pick(SITU);
    return Q.tiles('Is a <b>formal</b> or an <b>informal</b> style best for ' + s[0] + '?', s[1], [s[1] === 'formal' ? 'informal' : 'formal'], { hint: 'Who is listening? How well do you know them?', explain: s[1] + '.', meta: { k: 'g8-formal', sit: s[0] } });
  }
  function body() {
    var b = R.pick(BODY);
    return Q.one('A listener is <b>' + b[0] + '</b>. What does it often show?', b[1], R.some(BODY.filter(function (x) { return x !== b; }), 2).map(function (x) { return x[1]; }), { fig: W.icon('people'),
      hint: 'Picture the body language.', explain: b[0] + ' often shows ' + b[1] + '. Meanings can differ across cultures, so check before you assume.', meta: { k: 'g8-body', b: b[0] } });
  }
  function cultureTf() {
    var claims = [['Body language can mean different things in different cultures.', true], ['Direct eye contact means the same thing in every culture.', false], ['In some cultures, looking down while an elder speaks shows respect.', true], ['A thumbs-up is a friendly sign everywhere in the world.', false]];
    var c = R.pick(claims);
    return { q: 'True or false?', fig: W.sent(c[0]), type: 'tf', answer: c[1], why: { options: ['Non-verbal signals are learned in a culture, so their meanings vary.', 'Every gesture has one meaning worldwide.'], answer: 0 },
      hint: 'Are gestures learned, or the same for everyone?', explain: 'Non-verbal signals vary across cultures. Watch, ask, and do not assume.', meta: { k: 'g8-culture', s: c[0] } };
  }
  function precise(lv) {
    var p = R.pick(PRECISE), other = R.pick(PRECISE.filter(function (x) { return x !== p; }));
    return Q.one('Which sentence is <b>more precise</b>?', p[1], [p[0]].concat(lv > 1 ? [other[0]] : []), { hint: 'Precise words name exactly what you mean: no "thing" or "stuff".', explain: W.sent(p[1]), meta: { k: 'g8-precise' } });
  }
  function link() {
    var l = R.pick(LINK);
    return Q.tiles('Which linking words make the talk flow?', l[1], LINK.filter(function (x) { return x !== l; }).map(function (x) { return x[1]; }).slice(0, 2), { fig: W.sent(l[0] + ' ' + W.gap() + ', ' + l[2]),
      hint: 'Adding, contrasting, a result, or a next step?', explain: W.sent(l[0] + ' <b>' + l[1] + '</b>, ' + l[2]), meta: { k: 'g8-link', s: l[0] } });
  }

  Atlas.register('talking', {
    lessons: [{
      id: 'listening', title: 'Listening well', sub: 'Paraphrase, ask, clarify and listen for evidence.',
      concepts: [
        { slug: 'paraphrase', title: 'Paraphrase to show you understood', exp: ['B1.1'], skill: 'listening',
          model: [
            step(W.means('talk', SAID[2][0])),
            step(W.means('think', SAID[2][1]), 'Same meaning. My own words.'),
            step(W.means('not', 'You did not like the novel at all.'), 'That changes the meaning.')
          ],
          guided: [function () { return paraphrase(1); }, function () { return paraphrase(1); }],
          check: [function () { return paraphrase(2); }, relevant],
          coach: '<p>In discussions, ask the child to start a reply with "So you are saying…" before giving their own view.</p>',
          mistake: '<p>Repeating the speaker word for word, or slipping in your own opinion.</p>' },
        { slug: 'open', title: 'Open questions keep a talk going', exp: ['B1.1'], skill: 'listening',
          model: [
            step(W.sent(CLOSED[0]), 'Yes or no. The talk stops.'),
            step(W.sent(OPEN[0]), 'An open question invites thinking.'),
            step(W.tile('What') + ' ' + W.tile('How') + ' ' + W.tile('Why'), 'Good starting words.')
          ],
          guided: [function () { return openQ(1); }, function () { return openQ(1); }],
          check: [function () { return openQ(2); }, pickOpen],
          coach: '<p>Turn closed questions into open ones together: "Did you like it?" becomes "What did you like about it?"</p>',
          mistake: '<p>Asking questions that already contain the answer.</p>' },
        { slug: 'clarify', title: 'Ask to clarify, and listen for evidence', exp: ['B1.2'], skill: 'listening',
          model: [
            step(W.means('think', 'Not sure what they meant?'), 'Ask about that exact part.'),
            step(W.sent(CLARIFY[2])),
            step(W.sent('Last year, the library had more than 12 000 visits…'), 'A fact that supports the claim: evidence.')
          ],
          guided: [clarify, evidence],
          check: [clarify, evidence],
          coach: '<p>While listening to a podcast or news clip, have the child jot down one claim and one piece of evidence for it.</p>',
          mistake: '<p>Nodding along without understanding. A clarifying question is a strength, not a weakness.</p>' }
      ]
    }, {
      id: 'speaking', title: 'Speaking for an audience', sub: 'Style, body language and precise words.',
      concepts: [
        { slug: 'audience', title: 'Formal or informal: fit the audience', exp: ['B1.3'], skill: 'speaking',
          model: [
            step(W.means('people', 'the school board'), FORMAL[0]),
            step(W.means('talk', 'a friend at lunch'), INFORMAL[0]),
            step(W.icon('think'), 'Ask: who is listening, and why?')
          ],
          guided: [function () { return register(1); }, formalOrNot],
          check: [function () { return register(2); }, formalOrNot],
          coach: '<p>Before any talk, decide the purpose (inform, persuade, entertain) and the audience. Both shape every choice.</p>',
          mistake: '<p>Slang and filler words ("like", "basically") in a formal talk.</p>' },
        { slug: 'body', title: 'Body language speaks too', exp: ['B1.4'], skill: 'speaking',
          model: [
            step(W.icon('people'), 'Leaning forward: interest.'),
            step(W.icon('people'), 'Arms crossed tightly: possible disagreement.'),
            step(W.icon('think'), 'Meanings vary across cultures. Do not assume.')
          ],
          guided: [body, cultureTf],
          check: [body, cultureTf],
          coach: '<p>Watch a short video with the sound off. What do faces and gestures tell you? Then talk about how customs differ, for example eye contact with elders.</p>',
          mistake: '<p>Judging someone as rude because their culture uses different signals.</p>' },
        { slug: 'precise', title: 'Precise words, smooth links', exp: ['B1.5'], skill: 'speaking',
          model: [
            step(W.sent(PRECISE[0][0]), 'Vague: what thing?'),
            step(W.sent(PRECISE[0][1]), 'The subject' + '’' + 's own word.'),
            step(W.sent(LINK[2][0] + ' <b>' + LINK[2][1] + '</b>, ' + LINK[2][2]), 'A link shows how ideas connect.')
          ],
          guided: [function () { return precise(1); }, link],
          check: [function () { return precise(2); }, link],
          coach: '<p>Ban "thing" and "stuff" for one talk. Each time, the child must name it exactly.</p>',
          mistake: '<p>A string of ideas joined only with "and then".</p>' }
      ]
    }],
    practice: [
      { id: 'listening', name: 'Listening skills', code: 'B1.1, B1.2', gen: paraphrase },
      { id: 'speaking', name: 'Speaking for an audience', code: 'B1.3, B1.4, B1.5', gen: register }
    ],
    tasks: [
      { id: 'discussion', title: 'A real discussion', code: 'B1.1', pic: W.icon('people'), say: 'Discuss a question. Paraphrase before you reply, and ask one open question.',
        run: ['Choose a question with two sides, for example: "Should phones be allowed at lunch?"', 'Before each reply, the child paraphrases what you said ("So you think…").', 'They ask at least one open question, then reflect: "What changed in your thinking?"'],
        rubric: ['Interrupts or replies off topic.', 'Paraphrases with prompting; mostly closed questions.', 'Paraphrases accurately, asks an open question, and stays on topic.', 'Builds on others' + '’' + ' ideas, asks probing questions, and reflects on what changed.'] },
      { id: 'podcast', title: 'Listen for evidence', code: 'B1.2', pic: W.icon('listen'), say: 'Listen to a short podcast or news clip. Note one claim and its evidence.', write: true,
        run: ['Choose a short podcast or news clip for young people (3 to 5 minutes).', 'Before: predict what it will say. During: note one claim and the evidence for it. After: ask one clarifying question about anything unclear.', 'Talk about any tone of voice or pauses that changed the meaning.'],
        rubric: ['Recalls little.', 'Names the topic and a detail.', 'Identifies a claim and relevant evidence.', 'Identifies claims and evidence, notes tone, and asks a sharp clarifying question.'] },
      { id: 'formal-talk', title: 'A two-minute formal talk', code: 'B1.3', pic: W.icon('talk'), say: 'Give a two-minute talk to persuade an audience.',
        run: ['The child chooses a real audience (a school council, a club) and a purpose (to persuade).', 'They plan an opening, three points with evidence, and a closing.', 'They present standing up, without slang, adapting if the audience looks confused.'],
        rubric: ['Hard to follow; informal throughout.', 'Some structure; style slips into informal.', 'Clear purpose and structure, in a style that suits the audience.', 'Confident and persuasive; adapts to the audience as they go.'] },
      { id: 'nonverbal', title: 'Body language across cultures', code: 'B1.4', pic: W.icon('people'), say: 'Watch people speak. What do their gestures show? Ask how customs differ.',
        run: ['Watch two short speeches or interviews. Note gestures, eye contact, posture and pauses.', 'Ask: "How did these help or distract?"', 'Talk with a family member or friend about how eye contact or gestures are used in their culture or in another culture you know.'],
        rubric: ['Notices little.', 'Names some gestures.', 'Explains how non-verbal strategies helped or hurt, and notes one cultural difference.', 'Compares strategies thoughtfully and explains how meaning changes across cultures.'] },
      { id: 'explain-it', title: 'Explain it precisely', code: 'B1.5', pic: W.icon('think'), say: 'Explain something from science or history to a younger child, using exact words.',
        run: ['The child picks a process from another subject (how a bill becomes law, how a volcano erupts).', 'They explain it in order, using the subject' + '’' + 's own words and linking words like first, as a result, however.', 'You ask one question; they answer precisely.'],
        rubric: ['Vague words; ideas jumbled.', 'Some precise words; few links.', 'Precise subject words in clear, linked sentences.', 'Precise and vivid; adjusts words so a younger listener understands.'] }
    ]
  });

  Q.shapes('talking', {
    listening: [[1, 'open', openQ], [1, 'relevant', relevant], [1, 'clarify', clarify], [2, 'evidence', evidence], [2, 'pick-open', pickOpen]],
    speaking: [[1, 'formal', formalOrNot], [1, 'body', body], [1, 'precise', precise], [1, 'link', link], [2, 'culture', cultureTf]]
  });
})();
