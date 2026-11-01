/* Grade 4: skills and connections.
   Ontario 2023 Language, Grades 4 to 6:
   A1.1 transferable skills in cultural, social, linguistic and subject contexts   A1.2 how the skills help voice, engagement and next steps
   A3.1 language skills in other subjects and everyday life                        A3.2 identity, self and belonging across individuals and communities in Canada
   A3.3 themes in First Nations, Métis and Inuit cultures
   Identity and culture are explored with a grown-up and real books, never auto-marked.
   Answer checks: tests/verify/grade4-connections.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* the seven transferable skills, each with two Grade 4 examples */
  var SKILLS = [['critical thinking', 'checking if a website is credible'], ['creativity', 'inventing a new way to tell a story'], ['self-directed learning', 'tracking your own reading goal'],
    ['collaboration', 'sharing jobs on a group project'], ['communication', 'explaining an idea clearly'], ['global citizenship', 'learning how communities care for water'],
    ['digital literacy', 'editing a draft on a computer'], ['critical thinking', 'asking if an ad tells the whole truth'], ['creativity', 'designing a cover for your story'],
    ['self-directed learning', 'choosing what to practise next on your own'], ['collaboration', 'taking turns in a group discussion'], ['communication', 'giving a short talk to your class'],
    ['global citizenship', 'learning about kids in another country'], ['digital literacy', 'saving your work in the right folder']];
  var NAMES = SKILLS.map(function (x) { return x[0]; }).filter(function (x, i, a) { return a.indexOf(x) === i; });
  /* [a job, the subject it is from] */
  var USES = [['reading a report on habitats', 'Science'], ['explaining how you solved a problem', 'Math'], ['reading a timeline of early Canada', 'Social Studies'],
    ['writing a review of a play', 'Drama'], ['reading the rules of a new game', 'Phys Ed'], ['labelling a diagram of a plant', 'Science'], ['writing a word problem for a friend', 'Math'],
    ['reading a map of Ontario' + '’' + 's regions', 'Social Studies'], ['writing lines for a short skit', 'Drama'], ['writing down your running times', 'Phys Ed']];
  var SUBJECTS = ['Science', 'Math', 'Social Studies', 'Drama', 'Phys Ed'];
  var DAILY = ['reading a bus schedule', 'filling in a library card form', 'writing a grocery list', 'reading a recipe', 'reading a sign at the park', 'writing a birthday card',
    'reading a map at the zoo', 'texting a family member'];
  var NOREAD = ['riding a bike', 'brushing your teeth', 'swimming laps', 'catching a ball', 'sleeping', 'drinking water'];
  /* [a fuzzy goal, a clear goal you can check] */
  var GOALS = [['I will be good at reading.', 'I will read for 20 minutes every night this week.'], ['I will know more science words.', 'I will learn five new science words by Friday.'],
    ['I will write better.', 'I will add one detail to every paragraph I write this week.'], ['I will be the best reader ever.', 'I will finish two chapters of my book by Friday.'],
    ['I will read every book in the library.', 'I will borrow three library books this week.'], ['I will be good at spelling.', 'I will practise ten spelling words each day this week.'],
    ['I will be a great speaker.', 'I will practise my 2-minute talk three times by Friday.'], ['I will be good at typing.', 'I will type for 15 minutes twice this week.']];
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function skillFor(lv) {
    var s = R.pick(SKILLS);
    return Q.one('Which skill are you using when you are <b>' + s[1] + '</b>?', s[0], R.some(NAMES.filter(function (x) { return x !== s[0]; }), lv > 1 ? 3 : 2), {
      hint: 'Think about what you are doing.', explain: '<b>' + s[0] + '</b>', meta: { k: 'g4-skill-for', ex: s[1] } });
  }
  function matchSkill() {
    var s = R.some(NAMES, 3).map(function (n) { return R.pick(SKILLS.filter(function (x) { return x[0] === n; })); });
    return { q: 'Match each skill to an example.', type: 'match', pairs: s.map(function (x) { return [x[0], x[1]]; }), hint: 'Picture yourself doing each one.', explain: 'These skills help in every subject.', meta: { k: 'g4-match-skill' } };
  }
  function skillTf() {
    var s = R.pick(SKILLS), right = R.int(0, 1) === 1, said = right ? s[0] : R.pick(NAMES.filter(function (x) { return x !== s[0]; }));
    return { q: 'True or false? This is <b>' + said + '</b>.', fig: W.means('think', cap(s[1]) + '.'), type: 'tf', answer: right, hint: 'Think about what you are doing.', explain: '<b>' + s[0] + '</b>', meta: { k: 'g4-skill-tf', ex: s[1], said: said } };
  }
  function skillExample() {
    var s = R.pick(SKILLS), o = R.some(SKILLS.filter(function (x) { return x[0] !== s[0]; }), 2);
    return Q.one('Which one shows <b>' + s[0] + '</b>?', s[1], o.map(function (x) { return x[1]; }), { hint: 'Picture yourself doing each one.', explain: cap(s[1]) + ': <b>' + s[0] + '</b>.', meta: { k: 'g4-skill-example', skill: s[0] } });
  }
  function subject() {
    var u = R.pick(USES);
    return Q.tiles('In which subject would you be <b>' + u[0] + '</b>?', u[1], R.some(SUBJECTS.filter(function (x) { return x !== u[1]; }), 2), {
      hint: 'Reading and writing help in every subject.', explain: '<b>' + u[1] + '</b>', meta: { k: 'g4-subject', use: u[0] } });
  }
  function useMatch() {
    var us = R.some(SUBJECTS, 3).map(function (n) { return R.pick(USES.filter(function (x) { return x[1] === n; })); });
    return { q: 'Match each job to its subject.', type: 'match', pairs: us.map(function (u) { return [u[0], u[1]]; }), hint: 'Where would you do it at school?', explain: 'Language helps in every subject.', meta: { k: 'g4-use-match' } };
  }
  function everyday() {
    return Q.all('Pick every time you use <b>reading or writing</b> in everyday life.', R.some(DAILY, 2), R.some(NOREAD, 2), { hint: 'Are there words to read or write?', explain: 'Reading and writing are everywhere.', meta: { k: 'g4-everyday' } });
  }
  function dailyTf() {
    var yes = R.int(0, 1) === 1, s = R.pick(yes ? DAILY : NOREAD);
    return { q: 'True or false? You use reading or writing for this.', fig: W.means('think', cap(s) + '.'), type: 'tf', answer: yes, hint: 'Are there words to read or write?', explain: yes ? 'Yes: there are words.' : 'No words needed.', meta: { k: 'g4-daily-tf', s: s } };
  }
  function goal(lv) {
    var g = R.pick(GOALS);
    return Q.one('Which goal can you <b>check</b>?', g[1], R.some(GOALS.filter(function (x) { return x !== g; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), { prompt: 'Does it say what, how much and when?',
      hint: 'A good goal is small and clear, so you know when you have done it.', explain: 'What, how much and when.', meta: { k: 'g4-goal' } });
  }
  function goalTf() {
    var g = R.pick(GOALS), clear = R.int(0, 1) === 1, s = clear ? g[1] : g[0];
    return { q: 'True or false? You can check this goal.', fig: W.sent(s), type: 'tf', answer: clear, why: { options: ['It says what, how much and when.', 'It does not say how much or when.'], answer: clear ? 0 : 1 },
      hint: 'Does it say how much and when?', explain: W.sent(g[1]), meta: { k: 'g4-goal-tf', s: s } };
  }
  function goalFix() {
    var g = R.pick(GOALS);
    return Q.one('Which makes this goal clear?', g[1], R.some(GOALS.filter(function (x) { return x !== g; }), 2).map(function (x) { return x[0]; }), { fig: W.sent(g[0]),
      hint: 'Add how much and when.', explain: W.sent(g[1]), meta: { k: 'g4-goal-fix', s: g[0] } });
  }
  function goalPick() {
    var gs = R.some(GOALS, 4);
    return Q.all('Pick every goal you can <b>check</b>.', [gs[0][1], gs[1][1]], [gs[2][0], gs[3][0]], { hint: 'What, how much and when.', explain: 'Clear goals say how much and when.', meta: { k: 'g4-goal-pick' } });
  }

  Atlas.register('connections', {
    full: true,
    lessons: [{
      id: 'skills', title: 'Skills for learning', sub: 'Skills you use everywhere, and goals to grow them.',
      concepts: [
        { slug: 'skills', title: 'Skills that travel with you', exp: ['A1.1'], skill: 'skills',
          model: [
            step(W.icon('think'), '<b>Critical thinking</b>: is this source credible?'),
            step(W.icon('people'), '<b>Collaboration</b>: share the jobs.'),
            step(W.icon('star'), '<b>Creativity</b>: a new way to tell it.'),
            step(W.icon('talk'), '<b>Communication</b>: explain it so others understand.'),
            step(W.icon('screen'), '<b>Digital literacy</b>: save your work in the right folder.')
          ],
          guided: [function () { return skillFor(1); }, skillExample, matchSkill],
          check: [function () { return skillFor(2); }, skillExample, skillTf, matchSkill, function () { return skillFor(2); }],
          coach: '<p>Name the skill when you see it, at home or out: "You just changed how you explained that for your little cousin. That is communication."</p>',
          mistake: '<p>Thinking the skills belong to one subject. They travel to every subject, language and community.</p>' },
        { slug: 'goals', title: 'Set a goal you can check', exp: ['A1.2'], skill: 'goals',
          model: [
            step(W.sent('I will be good at reading.'), 'Too fuzzy to check.'),
            step(W.sent('I will read for <b>20 minutes</b> every night <b>this week</b>.'), 'How much, and when.'),
            step(W.sent('I will be good at spelling.'), 'Another fuzzy one.'),
            step(W.sent('I will practise <b>ten</b> spelling words each day <b>this week</b>.'), 'Now you can check it.'),
            step(W.icon('again'), 'Check it. Then set the next one.')
          ],
          guided: [function () { return goal(1); }, goalFix, goalTf],
          check: [function () { return goal(2); }, goalTf, goalPick, goalFix, goalTf],
          coach: '<p>Use the "My learning goal" activity. Review it each week and ask which skill helped.</p>',
          mistake: '<p>Setting a goal so big it cannot be checked, then giving up.</p>' },
        { slug: 'everywhere', title: 'Language in every subject', exp: ['A3.1'], skill: 'everywhere',
          model: [
            step(W.icon('read'), 'Science: a report on habitats.'),
            step(W.icon('write'), 'Math: explain how you solved it.'),
            step(W.icon('talk'), 'Drama: lines for a skit.'),
            step(W.means('screen', 'a bus schedule'), 'Every day, too.'),
            step(W.means('write', 'a grocery list'), 'Reading and writing are everywhere.')
          ],
          guided: [subject, everyday, dailyTf],
          check: [subject, everyday, useMatch, dailyTf, subject],
          coach: '<p>On an outing, count how many times you read or write something: signs, menus, forms, maps.</p>',
          mistake: '<p>Thinking reading only happens with books.</p>' }
      ]
    }],
    practice: [
      { id: 'skills', name: 'Transferable skills', code: 'A1.1', gen: skillFor },
      { id: 'goals', name: 'Goals you can check', code: 'A1.2', gen: goal },
      { id: 'everywhere', name: 'Language everywhere', code: 'A3.1', gen: subject }
    ],
    tasks: [
      { id: 'my-goal', title: 'My learning goal', code: 'A1.2', pic: W.icon('star'), say: 'Choose one goal for reading or writing. Check it each week.', write: true,
        run: ['Help the child choose one clear goal ("I will read for 20 minutes a night", "I will use quotation marks for titles").', 'Write it down. Each week, check it together and talk about which skills helped and what the next step is.'],
        rubric: ['No goal yet.', 'A goal with help; not checked.', 'Sets a clear goal and checks it.', 'Sets and checks a goal, explains which skills helped, and plans a next step.'] },
      { id: 'belonging', title: 'Identity and belonging', code: 'A3.2', pic: W.icon('people'), say: 'Read about someone whose life is different from yours. Where do you each belong?', write: true,
        run: ['Choose a book or article about a person or community in Canada different from the child’s: a newcomer family, a farming town, a Francophone community, a Black Canadian pioneer.', 'The child writes about what helps that person feel they belong, and what helps them belong too.'],
        rubric: ['A word or two.', 'Describes the person or self, but not both.', 'Compares both, with details about identity and belonging.', 'Compares thoughtfully, with respect, and connects to history or community.'] },
      { id: 'fnmi-themes', title: 'Themes in First Nations, Métis and Inuit stories', code: 'A3.3', pic: W.icon('read'), say: 'Read two texts by First Nations, Métis or Inuit creators. What big ideas do they share?',
        run: ['With your librarian, choose two texts by First Nations, Métis or Inuit authors or illustrators (a story, a poem, an article or a video).', 'After reading, ask: "What does each one show about family, community, the land, language, or the past and present?"', 'Use the author notes to learn which nation or community each creator is from.'],
        rubric: ['Does not name a theme yet.', 'Names a theme in one text with help.', 'Names a shared theme and points to both texts.', 'Explains the theme, how each creator shows it, and what it teaches, respectfully.'],
        coach: '<p>Let the texts and their creators lead. Each nation and community is distinct, so avoid treating First Nations, Métis and Inuit cultures as one.</p>' }
    ]
  });

  Q.shapes('connections', {
    skills: [[1, 'example', skillExample], [1, 'match', matchSkill], [1, 'true-false', skillTf], [2, 'which', skillFor]],
    goals: [[1, 'fix', goalFix], [1, 'true-false', goalTf], [2, 'pick', goalPick], [2, 'which', goal]],
    everywhere: [[1, 'everyday', everyday], [1, 'true-false', dailyTf], [1, 'match', useMatch], [2, 'subject', subject]]
  });
})();
