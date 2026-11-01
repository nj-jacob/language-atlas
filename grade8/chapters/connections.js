/* Grade 8: skills and connections. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 8:
   A1.1 how transferable skills support communication in cultural, social, linguistic and subject contexts
   A1.2 how they help students express their voice and be engaged; a plan to grow them (with a grown-up)
   A3.1 how this grade's language skills support other subjects and everyday life
   A3.2 historical contexts, lived experiences and perspectives; identity, self and belonging in culturally responsive texts
   A3.3 themes in First Nations, Métis and Inuit cultures (with a grown-up and real books by those creators)
   The stories are written for this site. Answer checks: tests/verify/grade8-connections.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';
  function tf(q, fig, answer, why, more) {
    var o = { q: q, fig: fig, type: 'tf', answer: answer, why: { options: why, answer: 0 } };
    Object.keys(more).forEach(function (k) { o[k] = more[k]; });
    return o;
  }
  function others(list, x) { return list.filter(function (y) { return y !== x; }); }

  /* the seven transferable skills, each with two Grade 8 examples */
  var SKILLS = [['critical thinking', 'comparing two news reports of the same event'], ['critical thinking', 'questioning whether a statistic is fair'],
    ['creativity', 'turning your research into a podcast script'], ['creativity', 'designing a new way to show data'],
    ['self-directed learning', 'tracking your own reading goal each week'], ['self-directed learning', 'choosing what to study when a test is coming'],
    ['collaboration', 'co-writing a play with a group'], ['collaboration', 'sharing tasks fairly in a science project'],
    ['communication', 'adjusting your words for a Grade 2 audience'], ['communication', 'explaining your idea clearly in a debate'],
    ['global citizenship', 'reading how other countries protect clean water'], ['global citizenship', 'learning how your choices affect people far away'],
    ['digital literacy', 'checking who made a website before using it'], ['digital literacy', 'protecting your passwords online']];
  var NAMES = ['critical thinking', 'creativity', 'self-directed learning', 'collaboration', 'communication', 'global citizenship', 'digital literacy'];
  /* [a situation, the skill it calls for most] */
  var CONTEXT = [['Your group cannot agree on how to end your story.', 'collaboration'], ['Four people must finish one slideshow by Friday.', 'collaboration'],
    ['A new classmate speaks Tagalog and is learning English.', 'communication'], ['You must explain a science idea to your little cousin.', 'communication'],
    ['A post claims a local beach is closed.', 'critical thinking'], ['Two websites give different dates for the same event.', 'critical thinking'],
    ['You want to show your research in a new way.', 'creativity'], ['Your class needs a fresh idea for the fundraiser.', 'creativity'],
    ['You have a big project and no one is checking on you.', 'self-directed learning'], ['You want to get better at writing over the summer.', 'self-directed learning'],
    ['Your class is learning about clean water in other countries.', 'global citizenship'], ['You wonder where your clothes are made, and by whom.', 'global citizenship'],
    ['A website asks for your home address.', 'digital literacy'], ['You need to know if an online photo was edited.', 'digital literacy']];
  var BELIEFS = [['Collaboration helps in every subject, not only Language.', true], ['Critical thinking helps you spot misinformation.', true],
    ['Communication changes with your audience and culture.', true], ['Creativity helps in Science and Math, not only Art.', true],
    ['Self-directed learners set their own goals.', true], ['Digital literacy helps you stay safe online.', true],
    ['Communication means talking the same way to everyone.', false], ['Transferable skills are only for school.', false], ['Creativity is only for artists.', false],
    ['Global citizenship is only about travelling.', false], ['Collaboration means letting one person do the work.', false], ['Critical thinking means disagreeing with everything.', false]];

  /* [a job, the subject it is from] */
  var USES = [['writing a lab report on plant growth', 'Science'], ['reading the safety steps before an experiment', 'Science'],
    ['explaining how you solved a ratio problem', 'Math'], ['reading a word problem about bus fares', 'Math'],
    ['reading a letter written in 1837', 'History'], ['comparing two accounts of the War of 1812', 'History'],
    ['writing an artist' + AP + 's statement', 'Visual Arts'], ['describing the colours in a painting', 'Visual Arts'],
    ['reading a map of trade routes', 'Geography'], ['reading a climate graph for Iqaluit', 'Geography'],
    ['writing a fitness plan', 'Health and Physical Education'], ['reading a food label for sugar', 'Health and Physical Education'],
    ['writing lyrics for a class song', 'Music'], ['reading a review of a concert', 'Music']];
  var SUBJECTS = ['Science', 'Math', 'History', 'Visual Arts', 'Geography', 'Health and Physical Education', 'Music'];
  var DAILY = ['reading the terms before signing up for an app', 'writing an email to apply for a summer job', 'reading the instructions on a medicine label', 'comparing two phone plans',
    'reading a bus schedule', 'writing a thank-you card', 'reading a recipe', 'filling out a library card form', 'reading safety signs at a pool', 'writing a list for a camping trip'];
  var NOTREAD = ['sleeping', 'swimming laps', 'tying your shoes', 'kicking a soccer ball', 'brushing your teeth', 'humming a tune', 'stretching before a run', 'walking the dog'];
  var CARRY = [['Note-taking from Language helps you study for a Science test.', true], ['Writing a clear paragraph helps you answer a History question.', true],
    ['Reading carefully helps you solve Math word problems.', true], ['Summarizing helps you study in every subject.', true], ['Persuasive writing helps you apply for a job.', true],
    ['Reading a map legend uses reading skills.', true], ['Reading skills are only useful in English class.', false], ['Math word problems need no reading.', false],
    ['Spelling does not matter outside school.', false], ['You never need to write in Science.', false], ['Adults stop reading once they finish school.', false], ['Instructions are fine to skip.', false]];

  /* short stories about identity and belonging. belong: the line that shows it, and what to ask; theme, past and turn: [question, right, wrong, wrong] */
  var STORIES = [
    { title: 'Say It Right', lines: ['On her first day in Brampton, Lan heard her name said four different ways.', 'By lunch, she was answering to "Lynn" just to make it stop.',
      'At home, her grandmother asked, "Who is Lynn?"', '"Your name means orchid," Bà said. "It came across an ocean with us."',
      'The next morning, Lan wrote her name on the board and said it slowly.', 'Her classmates tried it until they got it right.', 'For the first time, the classroom felt like hers too.'],
      belong: [6, 'Lan now feels she belongs'], theme: ['A name carries family history, and it is worth sharing.', 'Changing your name is the best way to fit in.', 'New schools are always unfriendly.'],
      past: ['"It came across an ocean with us." What does this tell you?', 'Lan' + AP + 's family moved to Canada from far away.', 'Lan' + AP + 's family went on a holiday by boat.', 'Lan' + AP + 's name is brand new.'],
      turn: ['Why does Lan write her name on the board?', 'She wants to be known by her real name.', 'She wants to practise her handwriting.', 'The teacher told her to.'] },
    { title: 'The Goal Call', lines: ['Every Saturday night, Jaspreet watched hockey with her grandfather, with the commentary in Punjabi.', 'At school, she never mentioned it.',
      'When her teammates talked about the English broadcast, she just nodded.', 'Then her team scored in overtime, and Dadaji shouted the Punjabi goal call from the stands.',
      'Everyone turned around.', '"Teach us that!" said the captain.', 'By the end of the season, the whole bench yelled it after every goal.'],
      belong: [6, 'the team has made Jaspreet' + AP + 's tradition its own'], theme: ['Sharing a part of your culture can bring a team closer.', 'You should keep your family' + AP + 's habits to yourself.', 'Hockey is only for one kind of fan.'],
      past: ['Why did Jaspreet only nod when her teammates talked about the game?', 'She worried her way of watching was too different.', 'She did not like hockey.', 'She had not seen the game.'],
      turn: ['What changes how the team sees Jaspreet' + AP + 's tradition?', 'Her grandfather' + AP + 's goal call in the stands.', 'A new coach.', 'A lost game.'] },
    { title: 'Finger Weaving', lines: ['Josée' + AP + 's aunt kept a half-finished sash in a basket by the window.', '"Our family has woven these for generations," she said. "It is part of being Métis."',
      'Josée thought finger weaving looked slow and old-fashioned.', 'But each evening, her aunt showed her one more row.', 'At the heritage fair, Josée wore the short sash she had woven herself.',
      'When classmates asked about it, she explained every colour.', 'She stood a little taller as she spoke.'],
      belong: [6, 'Josée is proud of who she is'], theme: ['Learning a family tradition can strengthen your identity.', 'Old traditions have nothing to teach young people.', 'Heritage fairs are only about winning prizes.'],
      past: ['What does "woven these for generations" tell you?', 'The tradition has been passed down for a long time.', 'Her aunt just learned it.', 'The sash came from a store.'],
      turn: ['How does Josée' + AP + 's view of finger weaving change?', 'She goes from finding it old-fashioned to feeling proud of it.', 'She goes from loving it to disliking it.', 'Her view stays the same.'] },
    { title: 'Bread for the Hallway', lines: ['Omar' + AP + 's family had lived in Halifax for three months, and the apartment still felt quiet.', 'He missed the smell of his grandmother' + AP + 's bread in Aleppo.',
      'One Sunday, his mother baked the same round loaves.', 'Omar carried a warm plate to the neighbours across the hall.', 'The next week, they knocked with a pot of chowder.',
      'Soon, Sunday doors stood open all along the hallway.', 'Halifax still was not Aleppo, but it was starting to feel like home.'],
      belong: [6, 'Omar is starting to belong'], theme: ['Sharing food and traditions can turn neighbours into a community.', 'Newcomers should forget where they came from.', 'Neighbours never want to meet each other.'],
      past: ['Why did the apartment "still feel quiet"?', 'The family was new and did not know anyone yet.', 'The building was empty.', 'Omar had lost his voice.'],
      turn: ['What first begins to change things for Omar?', 'He shares his mother' + AP + 's bread with the neighbours.', 'He moves to a new city.', 'He stops missing his grandmother.'] },
    { title: 'Two Languages at Dinner', lines: ['At dinner, Maya' + AP + 's family talked with their hands.', 'Her brother Eli is Deaf, and American Sign Language is their home language.',
      'When friends came over, Maya felt embarrassed and rushed them to her room.', 'One night, her friend Priya asked Eli to teach her a sign.', 'Eli taught her "friend," hooking two fingers together.',
      'Priya practised it all through dessert.', 'Maya laughed and signed along, proud of her family' + AP + 's language.'],
      belong: [6, 'Maya is now proud of her family' + AP + 's language'], theme: ['Your family' + AP + 's language is part of who you are.', 'Only spoken languages are real languages.', 'Friends should never meet your family.'],
      past: ['Why did Maya rush her friends to her room?', 'She worried they would think her family was strange.', 'Her room was the only warm place.', 'Her friends were tired.'],
      turn: ['What changes how Maya feels?', 'Priya wants to learn a sign from Eli.', 'Eli stops signing.', 'Maya moves to a new school.'] }];
  function story(s) { return W.passage(s.title, s.lines); }

  /* ---------- transferable skills ---------- */
  function skillFor(lv) {
    var s = R.pick(SKILLS);
    return Q.one((lv > 1 ? 'You are ' : 'Which skill are you using when you are ') + '<b>' + s[1] + '</b>' + (lv > 1 ? '. Which skill is that?' : '?'), s[0],
      R.some(others(NAMES, s[0]), lv > 1 ? 3 : 2), { hint: 'Think about what you are actually doing.', explain: s[1] + ' is <b>' + s[0] + '</b>.', meta: { k: 'g8-skill-for', ex: s[1] } });
  }
  function matchSkill() {
    return { q: 'Match each skill to an example.', type: 'match', pairs: R.some(NAMES, 3).map(function (n) { return [n, R.pick(SKILLS.filter(function (s) { return s[0] === n; }))[1]]; }),
      hint: 'Picture yourself doing each one.', explain: 'These skills travel to every subject.', meta: { k: 'g8-match-skill' } };
  }
  function contextSkill(lv) {
    var c = R.pick(CONTEXT);
    return Q.one('Which skill does this call for most?', c[1], R.some(others(NAMES, c[1]), lv > 1 ? 3 : 2), { fig: W.means('people', c[0]),
      hint: 'Working together, being understood, checking, new ideas, learning on your own, the wider world, or staying safe online?', explain: '<b>' + c[1] + '</b>.', meta: { k: 'g8-context-skill', s: c[0] } });
  }
  function skillTf() {
    var b = R.pick(BELIEFS);
    return tf(Q.name() + ' says:', W.sent(b[0]), b[1], ['These skills work in every subject, culture and setting.', 'Each skill belongs to one subject.'],
      { hint: 'Where else would this skill help?', explain: 'Transferable skills go with you everywhere.', meta: { k: 'g8-skill-tf', said: b[0] } });
  }

  /* ---------- language everywhere ---------- */
  function subject(lv) {
    var u = R.pick(USES);
    return Q.tiles((lv > 1 ? 'Which subject uses this: ' : 'In which subject would you be ') + '<b>' + u[0] + '</b>?', u[1], R.some(others(SUBJECTS, u[1]), lv > 1 ? 3 : 2), {
      hint: 'Reading and writing help in every subject.', explain: u[0] + ': <b>' + u[1] + '</b>.', meta: { k: 'g8-subject-use', use: u[0] } });
  }
  function matchSubject() {
    return { q: 'Match each job to its subject.', type: 'match', pairs: R.some(SUBJECTS, 3).map(function (s) { return [R.pick(USES.filter(function (u) { return u[1] === s; }))[0], s]; }),
      hint: 'What would you be learning about?', explain: 'Language skills are used in every subject.', meta: { k: 'g8-match-subject' } };
  }
  function everyday(lv) {
    return Q.all('Pick every time you use <b>reading or writing</b> in everyday life.', R.some(DAILY, 2), R.some(NOTREAD, lv > 1 ? 3 : 2), { hint: 'Are there words to read or write?',
      explain: 'Careful reading protects you in everyday life.', meta: { k: 'g8-everyday' } });
  }
  function carryTf(lv) {
    var c = R.pick(CARRY);
    return tf(lv > 1 ? 'Is this true?' : 'True or false?', W.sent(c[0]), c[1], ['Language skills help in every subject.', 'Language skills stay in Language class.'],
      { hint: 'Do you read and write in that subject too?', explain: 'Reading and writing carry into every subject.', meta: { k: 'g8-carry-tf', said: c[0] } });
  }

  /* ---------- identity and belonging ---------- */
  function belongLine(lv) {
    var s = R.pick(STORIES), right = s.lines[s.belong[0]], wrong = R.some(s.lines.slice(0, s.belong[0]), 2);
    return Q.tiles((lv > 1 ? 'Which line shows that ' : 'Tap the line that shows ') + '<b>' + s.belong[1] + '</b>' + (lv > 1 ? '? Tap it.' : '.'), right, wrong, { fig: story(s),
      hint: 'Look near the end.', explain: W.sent(right), meta: { k: 'g8-belong-line', t: s.title } });
  }
  function theme(lv) {
    var s = R.pick(STORIES);
    return Q.one(lv > 1 ? 'Which theme fits the story best?' : 'What does the story show about identity?', s.theme[0], s.theme.slice(1, lv > 1 ? 3 : 2), {
      fig: story(s), hint: 'What does the main character learn?', explain: s.theme[0], meta: { k: 'g8-theme', t: s.title } });
  }
  function history(lv) {
    var s = R.pick(STORIES);
    return Q.one(s.past[0], s.past[1], s.past.slice(2, lv > 1 ? 4 : 3), { fig: story(s), hint: 'What happened before, and what does it say about the character' + AP + 's life?',
      explain: s.past[1], meta: { k: 'g8-history', t: s.title } });
  }
  function change(lv) {
    var s = R.pick(STORIES);
    return Q.one((lv > 1 ? 'Look back at the story. ' : '') + s.turn[0], s.turn[1], s.turn.slice(2, lv > 1 ? 4 : 3), { fig: story(s), hint: 'What happens just before things change?',
      explain: s.turn[1], meta: { k: 'g8-change', t: s.title } });
  }

  var S1 = STORIES[0], S4 = STORIES[3];
  Atlas.register('connections', {
    full: true,
    lessons: [{
      id: 'skills', title: 'Skills for learning', sub: 'Transferable skills, in every subject and every day.',
      concepts: [
        { slug: 'skills', title: 'Seven skills that travel with you', exp: ['A1.1'], skill: 'skills',
          model: [
            step(W.icon('think'), '<b>Critical thinking</b>: compare two news reports.'),
            step(W.icon('people'), '<b>Collaboration</b>: co-write a play.'),
            step(W.icon('talk'), '<b>Communication</b>: change your words for your audience.'),
            step(W.means('people', CONTEXT[2][0]), 'Communication: plain words, and patience.'),
            step(W.means('screen', CONTEXT[12][0]), 'Digital literacy: keep it private.')
          ],
          key: '<p>Also: creativity, self-directed learning and global citizenship.</p>',
          guided: [function () { return skillFor(1); }, function () { return contextSkill(1); }, skillTf],
          check: [function () { return skillFor(2); }, matchSkill, function () { return contextSkill(2); }, skillTf, function () { return skillFor(3); }],
          coach: '<p>Name the skill when you see it at home: "You just compared two sources. That is critical thinking."</p>',
          mistake: '<p>Thinking communication means speaking the same way to everyone. Audience and culture change how we say things.</p>' },
        { slug: 'everywhere', title: 'Language in every subject', exp: ['A3.1'], skill: 'uses',
          model: [
            step(W.icon('write'), 'Science: write a lab report.'),
            step(W.icon('read'), 'History: read a letter from 1837.'),
            step(W.icon('think'), 'Math: read the word problem twice.'),
            step(W.icon('screen'), 'Life: read the terms before you sign up.'),
            step(W.icon('write'), 'Life: an email to apply for a summer job.')
          ],
          guided: [function () { return subject(1); }, everyday, carryTf],
          check: [function () { return subject(2); }, matchSubject, function () { return everyday(2); }, function () { return carryTf(2); }, function () { return subject(3); }],
          coach: '<p>Before the child signs up for an app or a summer job, read the fine print together.</p>',
          mistake: '<p>Skimming instructions in other subjects. Close reading matters everywhere.</p>' }
      ]
    }, {
      id: 'identity', title: 'Identity and belonging', sub: 'Lived experiences and perspectives in stories.',
      concepts: [
        { slug: 'belonging', title: 'Read for identity and belonging', exp: ['A3.2'], skill: 'identity',
          model: [
            step(W.sent(S1.lines[1]), 'Lan hides her name to fit in.'),
            step(W.sent(S1.lines[3]), 'Her family' + AP + 's history lives in her name.'),
            step(W.sent(S1.lines[6]), 'Sharing who she is brings belonging.'),
            step(W.sent(S4.lines[1]), 'Omar misses home.'),
            step(W.sent(S4.lines[3]), 'He shares a tradition, and the hallway opens up.')
          ],
          guided: [function () { return belongLine(1); }, function () { return history(1); }, function () { return theme(1); }],
          check: [function () { return theme(2); }, function () { return change(2); }, function () { return belongLine(2); }, function () { return history(2); }, function () { return change(3); }],
          coach: '<p>Ask: "Is there a story behind your name, or a family member' + AP + 's name?"</p>',
          mistake: '<p>Treating a character' + AP + 's culture as a background detail. It often shapes the whole story.</p>' }
      ]
    }],
    practice: [
      { id: 'skills', name: 'Transferable skills', code: 'A1.1', gen: skillFor },
      { id: 'uses', name: 'Language everywhere', code: 'A3.1', gen: subject },
      { id: 'identity', name: 'Identity and belonging', code: 'A3.2', gen: theme }
    ],
    tasks: [
      { id: 'my-plan', title: 'My skills plan', code: 'A1.2', pic: W.icon('star'), say: 'Which skill helps you share your voice? Choose one to grow, and make a plan.', write: true,
        run: ['Talk about a time a skill helped the child speak up or get involved (a debate, a group project, a club).', 'They choose one skill to grow, write three steps to grow it, and check in each week.'],
        rubric: ['No plan yet.', 'Names a skill; plan is vague.', 'Explains how the skill helps their voice, with a clear plan.', 'Evaluates their growth over time and adjusts the plan.'] },
      { id: 'identity-text', title: 'Identity in a novel', code: 'A3.2', pic: W.icon('read'), say: 'Read a novel about a culture or history new to you. How does it shape the character' + AP + 's identity?', write: true,
        run: ['With your librarian, choose a novel by a creator from the culture it portrays (for example, Black Canadian, newcomer or Asian Canadian stories).', 'The child explains how history, lived experience and culture shape the character' + AP + 's identity and sense of belonging.'],
        rubric: ['Retells the plot only.', 'Names a part of the character' + AP + 's identity.', 'Explains how history and experience shape identity, with evidence.', 'Connects the character' + AP + 's identity to their own and to the wider history, respectfully.'] },
      { id: 'fnmi-themes', title: 'Themes in First Nations, Métis and Inuit texts', code: 'A3.3', pic: W.icon('read'), say: 'Read a novel or graphic novel by a First Nations, Métis or Inuit creator. What themes does it explore?', write: true,
        run: ['With your librarian, choose a book by a First Nations, Métis or Inuit author.', 'After reading, discuss themes such as identity, relationships, the land, legacies, truths and ways of knowing.', 'Use the author note to learn which nation or community the creator is from.'],
        rubric: ['Does not name a theme yet.', 'Names a theme with help.', 'Analyzes a theme with evidence from the text.', 'Analyzes several themes and what they show about the community' + AP + 's perspectives, respectfully.'],
        coach: '<p>Let the book and its creator lead. Each First Nation, the Métis Nation and Inuit communities are distinct; avoid treating them as one culture.</p>' }
    ]
  });

  Q.shapes('connections', {
    skills: [[1, 'match', matchSkill], [1, 'context', contextSkill], [1, 'true-false', skillTf]],
    uses: [[1, 'match', matchSubject], [1, 'everyday', everyday], [1, 'true-false', carryTf]],
    identity: [[1, 'belong', belongLine], [1, 'history', history], [1, 'change', change]]
  });
})();
