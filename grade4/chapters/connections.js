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

  /* the seven transferable skills, with a Grade 4 example */
  var SKILLS = [['critical thinking', 'checking if a website is credible'], ['creativity', 'inventing a new way to tell a story'], ['self-directed learning', 'tracking your own reading goal'],
    ['collaboration', 'sharing jobs on a group project'], ['communication', 'explaining an idea clearly'], ['global citizenship', 'learning how communities care for water'],
    ['digital literacy', 'editing a draft on a computer']];
  /* [a job, the subject it is from] */
  var USES = [['reading a report on habitats', 'Science'], ['explaining how you solved a problem', 'Math'], ['reading a timeline of early Canada', 'Social Studies'],
    ['writing a review of a play', 'Drama'], ['reading the rules of a new game', 'Phys Ed']];
  var DAILY = ['reading a bus schedule', 'filling in a library card form', 'writing a grocery list', 'reading a recipe'];
  var NOREAD = ['riding a bike', 'brushing your teeth', 'swimming laps'];
  var GOOD = ['I will read for 20 minutes every night this week.', 'I will learn five new science words by Friday.', 'I will add one detail to every paragraph I write this week.'];
  var FUZZY = ['I will be the best reader ever.', 'I will read every book in the library.', 'I will be good at writing.'];

  function skillFor(lv) {
    var s = R.pick(SKILLS);
    return Q.one('Which skill are you using when you are <b>' + s[1] + '</b>?', s[0], R.some(SKILLS.filter(function (x) { return x !== s; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Think about what you are doing.', explain: '<b>' + s[0] + '</b>', meta: { k: 'g4-skill-for', ex: s[1] } });
  }
  function matchSkill() {
    var s = R.some(SKILLS, 3);
    return { q: 'Match each skill to an example.', type: 'match', pairs: s.map(function (x) { return [x[0], x[1]]; }), hint: 'Picture yourself doing each one.', explain: 'These skills help in every subject.', meta: { k: 'g4-match-skill' } };
  }
  function subject() {
    var u = R.pick(USES);
    return Q.tiles('In which subject would you be <b>' + u[0] + '</b>?', u[1], R.some(USES.filter(function (x) { return x !== u; }), 2).map(function (x) { return x[1]; }), {
      hint: 'Reading and writing help in every subject.', explain: '<b>' + u[1] + '</b>', meta: { k: 'g4-subject', use: u[0] } });
  }
  function everyday() {
    return Q.all('Pick every time you use <b>reading or writing</b> in everyday life.', R.some(DAILY, 2), R.some(NOREAD, 2), { hint: 'Are there words to read or write?', explain: 'Reading and writing are everywhere.', meta: { k: 'g4-everyday' } });
  }
  function goal(lv) {
    return Q.one('Which goal can you <b>check</b>?', R.pick(GOOD), R.some(FUZZY, lv > 1 ? 3 : 2), { prompt: 'Does it say what, how much and when?',
      hint: 'A good goal is small and clear, so you know when you have done it.', explain: 'What, how much and when.', meta: { k: 'g4-goal' } });
  }

  Atlas.register('connections', {
    lessons: [{
      id: 'skills', title: 'Skills for learning', sub: 'Skills you use everywhere, and goals to grow them.',
      concepts: [
        { slug: 'skills', title: 'Skills that travel with you', exp: ['A1.1'], skill: 'skills',
          model: [
            step(W.icon('think'), '<b>Critical thinking</b>: is this source credible?'),
            step(W.icon('people'), '<b>Collaboration</b>: share the jobs.'),
            step(W.icon('star'), '<b>Creativity</b>: a new way to tell it.'),
            step(W.icon('talk'), '<b>Communication</b>: explain it so others understand.')
          ],
          guided: [function () { return skillFor(1); }, function () { return skillFor(1); }],
          check: [function () { return skillFor(2); }, matchSkill],
          coach: '<p>Name the skill when you see it, at home or out: "You just changed how you explained that for your little cousin. That is communication."</p>',
          mistake: '<p>Thinking the skills belong to one subject. They travel to every subject, language and community.</p>' },
        { slug: 'goals', title: 'Set a goal you can check', exp: ['A1.2'], skill: 'skills',
          model: [
            step(W.sent('I will be good at reading.'), 'Too fuzzy to check.'),
            step(W.sent('I will read for 20 minutes every night this week.'), 'Clear: what, how much, when.'),
            step(W.icon('again'), 'Check it. Then set the next one.')
          ],
          guided: [function () { return goal(1); }, function () { return goal(1); }],
          check: [function () { return goal(2); }, function () { return goal(2); }],
          coach: '<p>Use the "My learning goal" activity. Review it each week and ask which skill helped.</p>',
          mistake: '<p>Setting a goal so big it cannot be checked, then giving up.</p>' },
        { slug: 'everywhere', title: 'Language in every subject', exp: ['A3.1'], skill: 'skills',
          model: [
            step(W.icon('read'), 'Science: a report on habitats.'),
            step(W.icon('write'), 'Math: explain how you solved it.'),
            step(W.icon('screen'), 'Every day: a bus schedule, a recipe, a form.')
          ],
          guided: [subject, everyday],
          check: [subject, everyday],
          coach: '<p>On an outing, count how many times you read or write something: signs, menus, forms, maps.</p>',
          mistake: '<p>Thinking reading only happens with books.</p>' }
      ]
    }],
    practice: [
      { id: 'skills', name: 'Skills and connections', code: 'A1.1, A1.2, A3.1', gen: skillFor }
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
    skills: [[1, 'match', matchSkill], [1, 'subject', subject], [1, 'everyday', everyday], [1, 'goal', goal]]
  });
})();
