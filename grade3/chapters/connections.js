/* Grade 3: skills and connections.
   Ontario 2023 Language, Grades 1 to 3:
   A1.1 how the seven transferable skills are used in language and literacy     A1.2 how they help students express their voice and be engaged
   A3.1 applying language skills in other subjects and everyday life            A3.2 identity, self and belonging in culturally responsive texts
   A3.3 themes in First Nations, Metis and Inuit cultures
   Identity and culture are explored with a grown-up and real books, never auto-marked.
   Answer checks: tests/verify/grade3-connections.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* the seven transferable skills, in plain words, with an example from reading and writing */
  var SKILLS = [['critical thinking', 'checking if a fact is true'], ['creativity', 'making up a new ending for a story'], ['self-directed learning', 'setting a reading goal and checking it'],
    ['collaboration', 'planning a story with a partner'], ['communication', 'explaining your idea clearly'], ['global citizenship', 'reading about how people care for the Earth'],
    ['digital literacy', 'using a tablet safely to find facts']];
  /* [a job, the subject it is from] */
  var USES = [['reading the steps of an experiment', 'Science'], ['reading a word problem', 'Math'], ['reading a map of Ontario', 'Social Studies'], ['writing a song', 'Music'], ['reading the rules of a game', 'Phys Ed']];
  var DAILY = ['reading a recipe', 'reading a bus schedule', 'writing a birthday card', 'reading signs at the hospital'];
  var NOTREAD = ['sleeping', 'brushing my teeth', 'swimming laps'];

  /* ---------- question makers ---------- */
  function skillFor(lv) {
    var s = R.pick(SKILLS);
    return Q.one('Which skill are you using when you are <b>' + s[1] + '</b>?', s[0], R.some(SKILLS.filter(function (x) { return x !== s; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Think about what you are doing.', explain: s[1] + ' is <b>' + s[0] + '</b>.', meta: { k: 'g3-skill-for', ex: s[1] } });
  }
  function matchSkill() {
    var s = R.some(SKILLS, 3);
    return { q: 'Match each skill to an example.', type: 'match', pairs: s.map(function (x) { return [x[0], x[1]]; }), hint: 'Picture yourself doing each one.', explain: 'These skills help in every subject.', meta: { k: 'g3-match-skill' } };
  }
  function subject() {
    var u = R.pick(USES);
    return Q.tiles('In which subject would you be <b>' + u[0] + '</b>?', u[1], R.some(USES.filter(function (x) { return x !== u; }), 2).map(function (x) { return x[1]; }), {
      hint: 'Reading and writing help in every subject.', explain: u[0] + ': <b>' + u[1] + '</b>.', meta: { k: 'g3-subject', use: u[0] } });
  }
  function everyday() {
    return Q.all('Pick every time you use <b>reading or writing</b> in everyday life.', R.some(DAILY, 2), R.some(NOTREAD, 2), { hint: 'Are there words to read or write?', explain: 'Reading and writing are everywhere.', meta: { k: 'g3-everyday' } });
  }

  Atlas.register('connections', {
    lessons: [{
      id: 'skills', title: 'Skills for learning', sub: 'Skills you use everywhere, not just in Language.',
      concepts: [
        { slug: 'skills', title: 'Seven skills', exp: ['A1.1'], skill: 'skills',
          model: [
            step(W.icon('think'), '<b>Critical thinking</b>: is this true?'),
            step(W.icon('people'), '<b>Collaboration</b>: working with a partner.'),
            step(W.icon('star'), '<b>Creativity</b>: a new idea.'),
            step(W.icon('talk'), '<b>Communication</b>: saying your idea clearly.')
          ],
          key: '<p>You use these skills when you read, write, listen and speak.</p>',
          guided: [function () { return skillFor(1); }, function () { return skillFor(1); }],
          check: [function () { return skillFor(2); }, matchSkill],
          coach: '<p>Name the skill when you see it: "You just checked if that was true. That is critical thinking."</p>',
          mistake: '<p>Thinking skills only belong to one subject. They travel everywhere.</p>' },
        { slug: 'everywhere', title: 'Reading and writing everywhere', exp: ['A3.1'], skill: 'skills',
          model: [
            step(W.icon('read'), 'Science: read the steps of an experiment.'),
            step(W.icon('write'), 'Math: read a word problem.'),
            step(W.icon('screen'), 'Every day: a recipe, a sign, a bus schedule.')
          ],
          key: '<p>Language helps in every subject and every day.</p>',
          guided: [subject, everyday],
          check: [subject, everyday],
          coach: '<p>On an outing, count how many times you read something: signs, menus, labels, maps.</p>',
          mistake: '<p>Thinking reading only happens with books.</p>' }
      ]
    }],
    practice: [
      { id: 'skills', name: 'Skills and connections', code: 'A1.1, A3.1', gen: skillFor }
    ],
    tasks: [
      { id: 'my-goal', title: 'My learning goal', code: 'A1.2', pic: W.icon('star'), say: 'Choose one goal for reading or writing. Check it each week.', write: true,
        run: ['Help the child choose one goal ("I will read for 15 minutes a day", "I will use speech marks").', 'Write it down. Check it together each week and talk about which skills helped.'],
        rubric: ['No goal yet.', 'A goal with help; not checked.', 'Sets a goal and checks it.', 'Sets a goal, checks it, and explains what helped them grow.'] },
      { id: 'about-me', title: 'All about me', code: 'A3.2', pic: W.icon('people'), say: 'Write about who you are: family, languages, places and things you love.', write: true,
        run: ['First read a picture book about identity and belonging together, ideally one with a family or culture like the child’s.', 'The child writes about who they are and what makes them feel they belong.'],
        rubric: ['A word or two.', 'A few sentences about self.', 'Shares several parts of who they are and where they belong.', 'Shares their identity with detail and connects it to the book.'] },
      { id: 'fnmi-themes', title: 'Themes in First Nations, Métis and Inuit stories', code: 'A3.3', pic: W.icon('read'), say: 'Read a book by a First Nations, Métis or Inuit creator. What is it really about?',
        run: ['With your librarian, choose a book by a First Nations, Métis or Inuit author or illustrator.', 'After reading, ask: "What is the big idea? What does the story show about family, community, the land or ways of knowing?"', 'Use the author note to learn which nation or community the creator is from.'],
        rubric: ['Does not name a theme yet.', 'Names a theme with help.', 'Names a theme and points to the story to show it.', 'Explains the theme and what it shows about the community, respectfully.'],
        coach: '<p>Let the book and its creator lead. Avoid treating First Nations, Métis and Inuit cultures as one culture: each nation and community is distinct.</p>' }
    ]
  });

  Q.shapes('connections', {
    skills: [[1, 'match', matchSkill], [1, 'subject', subject], [1, 'everyday', everyday]]
  });
})();
