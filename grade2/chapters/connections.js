/* Grade 2: skills and connections.
   Ontario 2023 Language, Grades 1 to 3:
   A1.1 how transferable skills can be used in language and literacy     A1.2 how they help students express themselves and be engaged
   A3.1 applying language knowledge and skills in other subjects and in everyday life
   A3.2 identity, self and belonging, in texts that reflect many cultures   A3.3 themes in First Nations, Métis and Inuit texts
   Identity and culture are explored with a grown-up and real books, never auto-marked.
   Answer checks: tests/verify/grade2-connections.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* the transferable skills, in plain words, with an example from reading and writing */
  var SKILLS = [['critical thinking', 'asking "Is this true?"'], ['creativity', 'drawing a new cover for a book'], ['self-directed learning', 'choosing a book to read on my own'],
    ['collaboration', 'writing a list with a partner'], ['communication', 'telling my idea clearly'], ['global citizenship', 'reading about caring for the Earth'], ['digital literacy', 'using a tablet safely']];
  /* [a job, the subject it is from] */
  var USES = [['reading a thermometer chart', 'Science'], ['reading a math story problem', 'Math'], ['reading a map of our town', 'Social Studies'], ['singing the words of a song', 'Music'], ['reading the rules of a game', 'Phys Ed']];
  var DAILY = ['reading a recipe', 'reading a street sign', 'writing a card for Grandpa', 'reading a menu'];
  var NOTREAD = ['sleeping', 'brushing my teeth', 'jumping on a trampoline'];

  /* ---------- question makers ---------- */
  function skillFor(lv) {
    var s = R.pick(SKILLS);
    return Q.one('Which skill are you using when you are <b>' + s[1] + '</b>?', s[0], R.some(SKILLS.filter(function (x) { return x !== s; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Think about what you are doing.', explain: '<b>' + s[0] + '</b>.', meta: { k: 'g2-skill-for', ex: s[1] } });
  }
  function matchSkill() {
    var s = R.some(SKILLS, 3);
    return { q: 'Match each skill to an example.', type: 'match', pairs: s.map(function (x) { return [x[0], x[1]]; }), hint: 'Picture yourself doing each one.', explain: 'These skills help in every subject.', meta: { k: 'g2-match-skill' } };
  }
  function subject() {
    var u = R.pick(USES);
    return Q.tiles('In which subject would you be <b>' + u[0] + '</b>?', u[1], R.some(USES.filter(function (x) { return x !== u; }), 2).map(function (x) { return x[1]; }), {
      hint: 'Reading and writing help in every subject.', explain: '<b>' + u[1] + '</b>.', meta: { k: 'g2-subject', use: u[0] } });
  }
  function everyday() {
    return Q.all('Pick every time you use <b>reading or writing</b>.', R.some(DAILY, 2), R.some(NOTREAD, 2), { hint: 'Are there words to read or write?', explain: 'Reading and writing are everywhere.', meta: { k: 'g2-everyday' } });
  }

  Atlas.register('connections', {
    lessons: [{
      id: 'skills', title: 'Skills for learning', sub: 'Skills you use everywhere, not just in Language.',
      concepts: [
        { slug: 'skills', title: 'Skills that go everywhere', exp: ['A1.1'], skill: 'skills',
          model: [
            step(W.icon('think'), '<b>Critical thinking</b>: asking "Is this true?"'),
            step(W.icon('people'), '<b>Collaboration</b>: working with a partner.'),
            step(W.icon('star'), '<b>Creativity</b>: making something new.')
          ],
          guided: [function () { return skillFor(1); }, matchSkill],
          check: [function () { return skillFor(2); }, matchSkill],
          coach: '<p>Name the skill when you see it: "You worked that out with your brother. That is collaboration."</p>',
          mistake: '<p>Thinking these skills are only for school. Point them out at home too.</p>' },
        { slug: 'everywhere', title: 'Reading and writing everywhere', exp: ['A3.1'], skill: 'skills',
          model: [
            step(W.icon('read'), 'Math: a story problem.'),
            step(W.icon('write'), 'At home: a card for Grandpa.')
          ],
          guided: [subject, everyday],
          check: [subject, everyday],
          coach: '<p>Spot reading and writing on an outing: signs, menus, labels, maps.</p>',
          mistake: '<p>Thinking reading only happens in books.</p>' }
      ]
    }],
    practice: [
      { id: 'skills', name: 'Skills and connections', code: 'A1.1, A3.1', gen: skillFor }
    ],
    tasks: [
      { id: 'my-goal', title: 'My reading goal', code: 'A1.2', pic: W.icon('star'), say: 'Choose one goal for reading or writing. Check it each week.', write: true,
        run: ['Help the child choose one small goal, such as "Read a book on my own each night" or "Use a capital for names".', 'Check it together each week and talk about how it helps them share their ideas.'],
        rubric: ['No goal yet.', 'Sets a goal with help.', 'Sets a goal and checks it.', 'Sets a goal, checks it, and says how it helped.'] },
      { id: 'about-me', title: 'All about me', code: 'A3.2', pic: W.icon('people'), say: 'Draw and write about you: family, languages, places and things you love.', write: true,
        run: ['Read a picture book about a child and their family or culture.', 'The child draws and writes about themselves: family, languages they hear, places, foods, celebrations.', 'Talk about how everyone belongs.'],
        rubric: ['Shares little yet.', 'Shares one or two things with help.', 'Shares several things about who they are.', 'Shares who they are and links it to a book they read.'] },
      { id: 'fnmi-themes', title: 'Themes in First Nations, Métis and Inuit stories', code: 'A3.3', pic: W.icon('read'), say: 'Read a book by a First Nations, Métis or Inuit creator. What big idea does it share?',
        run: ['With your librarian, choose a picture book by a First Nations, Métis or Inuit creator.', 'After reading, talk about a big idea in it, such as family, caring for the land, or sharing.'],
        rubric: ['Recalls little of the book yet.', 'Retells part of it with help.', 'Names a big idea in the book.', 'Names a big idea and explains how the story shows it.'],
        coach: '<p>Choose creators writing about their own nation or community, and read the author notes together.</p>' }
    ]
  });

  Q.shapes('connections', {
    skills: [[1, 'match', matchSkill], [1, 'subject', subject], [1, 'everyday', everyday]]
  });
})();
