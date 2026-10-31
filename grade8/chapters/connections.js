/* Grade 8: skills and connections.
   Ontario 2023 Language, Grade 8:
   A1.1 how transferable skills support communication in cultural, social, linguistic and subject contexts
   A1.2 how they help students express their voice and be engaged; a plan to grow them (with a grown-up)
   A3.1 how this grade's language skills support other subjects and everyday life
   A3.2 historical contexts, lived experiences and perspectives; identity, self and belonging in culturally responsive texts
   A3.3 themes in First Nations, Métis and Inuit cultures (with a grown-up and real books by those creators)
   The story is written for this site. Answer checks: tests/verify/grade8-connections.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* the seven transferable skills, with a Grade 8 example */
  var SKILLS = [['critical thinking', 'comparing two news reports of the same event'], ['creativity', 'turning your research into a podcast script'],
    ['self-directed learning', 'tracking your own reading goal each week'], ['collaboration', 'co-writing a play with a group'],
    ['communication', 'adjusting your words for a Grade 2 audience'], ['global citizenship', 'reading how other countries protect clean water'],
    ['digital literacy', 'checking who made a website before using it']];
  /* [a situation, the skill it calls for most] */
  var CONTEXT = [['Your group cannot agree on how to end your story.', 'collaboration'], ['A new classmate speaks Tagalog and is learning English.', 'communication'],
    ['A post claims a local beach is closed.', 'critical thinking'], ['You want to show your research in a new way.', 'creativity']];
  var BELIEFS = [['Collaboration helps in every subject, not only Language.', true], ['Communication means talking the same way to everyone.', false],
    ['Critical thinking helps you spot misinformation.', true], ['Transferable skills are only for school.', false]];
  /* [a job, the subject it is from] */
  var USES = [['writing a lab report on plant growth', 'Science'], ['explaining how you solved a ratio problem', 'Math'], ['reading a letter written in 1837', 'History'],
    ['writing an artist' + AP + 's statement', 'Visual Arts'], ['reading a map of trade routes', 'Geography'], ['writing a fitness plan', 'Health and Physical Education']];
  var DAILY = ['reading the terms before signing up for an app', 'writing an email to apply for a summer job', 'reading the instructions on a medicine label', 'comparing two phone plans'];
  var NOTREAD = ['sleeping', 'swimming laps', 'tying your shoes'];
  var CARRY = [['Note-taking from Language helps you study for a Science test.', true], ['Reading skills are only useful in English class.', false],
    ['Writing a clear paragraph helps you answer a History question.', true], ['Math word problems need no reading.', false]];

  var STORY = ['On her first day in Brampton, Lan heard her name said four different ways.', 'By lunch, she was answering to "Lynn" just to make it stop.',
    'At home, her grandmother asked, "Who is Lynn?"', '"Your name means orchid," Bà said. "It came across an ocean with us."',
    'The next morning, Lan wrote her name on the board and said it slowly.', 'Her classmates tried it until they got it right.',
    'For the first time, the classroom felt like hers too.'];
  var TITLE = 'Say It Right';

  /* ---------- question makers: skills ---------- */
  function skillFor(lv) {
    var s = R.pick(SKILLS);
    return Q.one('Which skill are you using when you are <b>' + s[1] + '</b>?', s[0], R.some(SKILLS.filter(function (x) { return x !== s; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Think about what you are actually doing.', explain: s[1] + ' is <b>' + s[0] + '</b>.', meta: { k: 'g8-skill-for', ex: s[1] } });
  }
  function matchSkill() {
    var s = R.some(SKILLS, 3);
    return { q: 'Match each skill to an example.', type: 'match', pairs: s.map(function (x) { return [x[0], x[1]]; }), hint: 'Picture yourself doing each one.', explain: 'These skills travel to every subject.', meta: { k: 'g8-match-skill' } };
  }
  function contextSkill() {
    var c = R.pick(CONTEXT);
    return Q.one('Which skill does this call for most?', c[1], CONTEXT.filter(function (x) { return x !== c; }).map(function (x) { return x[1]; }).slice(0, 2), { fig: W.means('people', c[0]),
      hint: 'Is it about working together, being understood, checking, or new ideas?', explain: '<b>' + c[1] + '</b>.', meta: { k: 'g8-context-skill', s: c[0] } });
  }
  function skillTf() {
    var b = R.pick(BELIEFS);
    return { q: Q.name() + ' says:', fig: W.sent(b[0]), type: 'tf', answer: b[1],
      why: { options: ['These skills work in every subject, culture and setting.', 'Each skill belongs to one subject.'], answer: 0 },
      hint: 'Where else would this skill help?', explain: 'Transferable skills go with you everywhere.', meta: { k: 'g8-skill-tf', said: b[0] } };
  }

  /* ---------- question makers: everywhere ---------- */
  function subject() {
    var u = R.pick(USES);
    return Q.tiles('In which subject would you be <b>' + u[0] + '</b>?', u[1], R.some(USES.filter(function (x) { return x !== u; }), 2).map(function (x) { return x[1]; }), {
      hint: 'Reading and writing help in every subject.', explain: u[0] + ': <b>' + u[1] + '</b>.', meta: { k: 'g8-subject-use', use: u[0] } });
  }
  function matchSubject() {
    var u = R.some(USES, 3);
    return { q: 'Match each job to its subject.', type: 'match', pairs: u.map(function (x) { return [x[0], x[1]]; }), hint: 'What would you be learning about?', explain: 'Language skills are used in every subject.', meta: { k: 'g8-match-subject' } };
  }
  function everyday() {
    return Q.all('Pick every time you use <b>reading or writing</b> in everyday life.', R.some(DAILY, 2), R.some(NOTREAD, 2), { hint: 'Are there words to read or write?', explain: 'Careful reading protects you in everyday life.', meta: { k: 'g8-everyday' } });
  }
  function carryTf() {
    var c = R.pick(CARRY);
    return { q: 'True or false?', fig: W.sent(c[0]), type: 'tf', answer: c[1],
      why: { options: ['Language skills help in every subject.', 'Language skills stay in Language class.'], answer: 0 },
      hint: 'Do you read and write in that subject too?', explain: 'Reading and writing carry into every subject.', meta: { k: 'g8-carry-tf', said: c[0] } };
  }

  /* ---------- question makers: identity and belonging ---------- */
  function story() { return W.passage(TITLE, STORY); }
  function belongLine() {
    return Q.tiles('Tap the line that shows Lan now feels she <b>belongs</b>.', STORY[6], [STORY[1], STORY[4]], { fig: story(),
      hint: 'Look near the end.', explain: '"The classroom felt like hers too."', meta: { k: 'g8-belong-line' } });
  }
  function theme() {
    return Q.one('What does the story show about identity?', 'A name carries family history, and it is worth sharing.', ['Changing your name is the best way to fit in.', 'New schools are always unfriendly.'], { fig: story(),
      hint: 'What did Lan learn from her grandmother?', explain: 'Lan chose to share her name, and her history, with her class.', meta: { k: 'g8-theme' } });
  }
  function history() {
    return Q.one('"It came across an ocean with us." What does this tell you?', 'Lan' + AP + 's family moved to Canada from far away.', ['Lan' + AP + 's family went on a holiday by boat.', 'Lan' + AP + 's name is brand new.'], { fig: story(),
      hint: 'Who came across the ocean, and why mention it?', explain: 'Her family immigrated, and the name is part of that journey.', meta: { k: 'g8-history' } });
  }
  function change() {
    return Q.one('Why does Lan write her name on the board?', 'She wants to be known by her real name.', ['She wants to practise her handwriting.', 'The teacher told her to.'], { fig: story(),
      hint: 'What changed after she talked with her grandmother?', explain: 'She decided her name, and her identity, matter.', meta: { k: 'g8-change' } });
  }

  Atlas.register('connections', {
    lessons: [{
      id: 'skills', title: 'Skills for learning', sub: 'Transferable skills, in every subject and every day.',
      concepts: [
        { slug: 'skills', title: 'Seven skills that travel with you', exp: ['A1.1'], skill: 'skills',
          model: [
            step(W.icon('think'), '<b>Critical thinking</b>: compare two news reports.'),
            step(W.icon('people'), '<b>Collaboration</b>: co-write a play.'),
            step(W.icon('talk'), '<b>Communication</b>: change your words for your audience.')
          ],
          key: '<p>Also: creativity, self-directed learning, global citizenship and digital literacy.</p>',
          guided: [function () { return skillFor(1); }, contextSkill],
          check: [function () { return skillFor(2); }, matchSkill],
          coach: '<p>Name the skill when you see it at home: "You just compared two sources. That is critical thinking."</p>',
          mistake: '<p>Thinking communication means speaking the same way to everyone. Audience and culture change how we say things.</p>' },
        { slug: 'everywhere', title: 'Language in every subject', exp: ['A3.1'], skill: 'uses',
          model: [
            step(W.icon('write'), 'Science: write a lab report.'),
            step(W.icon('read'), 'History: read a letter from 1837.'),
            step(W.icon('screen'), 'Life: read the terms before you sign up.')
          ],
          guided: [subject, everyday],
          check: [matchSubject, everyday],
          coach: '<p>Before the child signs up for an app or a summer job, read the fine print together.</p>',
          mistake: '<p>Skimming instructions in other subjects. Close reading matters everywhere.</p>' }
      ]
    }, {
      id: 'identity', title: 'Identity and belonging', sub: 'Lived experiences and perspectives in stories.',
      concepts: [
        { slug: 'belonging', title: 'Read for identity and belonging', exp: ['A3.2'], skill: 'identity',
          model: [
            step(W.sent(STORY[1]), 'Lan hides her name to fit in.'),
            step(W.sent(STORY[3]), 'Her family' + AP + 's history lives in her name.'),
            step(W.sent(STORY[6]), 'Sharing who she is brings belonging.')
          ],
          guided: [belongLine, history],
          check: [theme, change],
          coach: '<p>Ask: "Is there a story behind your name, or a family member' + AP + 's name?"</p>',
          mistake: '<p>Treating a character' + AP + 's culture as a background detail. It often shapes the whole story.</p>' }
      ]
    }],
    practice: [
      { id: 'skills', name: 'Transferable skills', code: 'A1.1', gen: skillFor },
      { id: 'uses', name: 'Language everywhere', code: 'A3.1', gen: subject },
      { id: 'identity', name: 'Identity and belonging', code: 'A3.2', gen: belongLine }
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
    identity: [[1, 'theme', theme], [1, 'history', history], [1, 'change', change]]
  });
})();
