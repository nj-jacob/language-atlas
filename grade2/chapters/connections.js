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

  /* the transferable skills, in plain words: [example from reading and writing, the skill] */
  var SKILLS = [['asking "Is this true?"', 'critical thinking'], ['checking if a fact makes sense', 'critical thinking'], ['drawing a new cover for a book', 'creativity'], ['making up a new ending', 'creativity'],
    ['choosing a book to read on my own', 'self-directed learning'], ['setting a reading goal', 'self-directed learning'], ['writing a list with a partner', 'collaboration'], ['sharing jobs in a group', 'collaboration'],
    ['telling my idea clearly', 'communication'], ['listening and then answering', 'communication'], ['reading about caring for the Earth', 'global citizenship'], ['learning about kids in other countries', 'global citizenship'],
    ['using a tablet safely', 'digital literacy'], ['searching for facts with a grown-up', 'digital literacy']];
  var NAMES = ['critical thinking', 'creativity', 'self-directed learning', 'collaboration', 'communication', 'global citizenship', 'digital literacy'];
  /* [a job, the subject it is from] */
  var USES = [['reading a thermometer chart', 'Science'], ['reading a math story problem', 'Math'], ['reading a map of our town', 'Social Studies'], ['singing the words of a song', 'Music'],
    ['reading the rules of a game', 'Phys Ed'], ['labelling the parts of a plant', 'Science'], ['writing a number sentence', 'Math'], ['writing about a community helper', 'Social Studies'],
    ['reading the lines in a class play', 'Drama'], ['writing the title of my painting', 'Art']];
  var DAILY = ['reading a recipe', 'reading a street sign', 'writing a card for Grandpa', 'reading a menu', 'writing a shopping list', 'reading a bus schedule', 'reading the label on a juice box', 'writing a note to a friend'];
  var NOTREAD = ['sleeping', 'brushing my teeth', 'jumping on a trampoline', 'swimming in the lake', 'petting the dog', 'eating an apple', 'running in the park', 'building a snowman'];
  function others(list, x) { return list.filter(function (y) { return y !== x; }); }
  function T(f, a) { return function () { return f(a); }; }

  /* ---------- skills that go everywhere ---------- */
  function skillFor(lv) {
    var x = R.pick(SKILLS);
    return Q.one('Which skill are you using when you are <b>' + x[0] + '</b>?', x[1], R.some(others(NAMES, x[1]), lv > 1 ? 3 : 2), {
      hint: 'Think about what you are doing.', explain: '<b>' + x[1] + '</b>.', meta: { k: 'g2-skill-for', ex: x[0] } });
  }
  function matchSkill() {
    var picked = R.shuffle(SKILLS).filter(function (x, i, all) { return all.findIndex(function (y) { return y[1] === x[1]; }) === i; }).slice(0, 3);
    return { q: 'Match each skill to an example.', type: 'match', pairs: picked.map(function (x) { return [x[1], x[0]]; }), hint: 'Picture yourself doing each one.', explain: 'These skills help in every subject.', meta: { k: 'g2-match-skill' } };
  }
  function skillShows(lv) {
    var x = R.pick(SKILLS), wrong = R.some(SKILLS.filter(function (y) { return y[1] !== x[1]; }), lv > 1 ? 2 : 1).map(function (y) { return y[0]; });
    return Q.one('Which one shows <b>' + x[1] + '</b>?', x[0], wrong, { hint: 'Picture yourself doing each one.', explain: '<b>' + x[0] + '</b>', meta: { k: 'g2-skill-shows', skill: x[1] } });
  }
  function skillTf() {
    var x = R.pick(SKILLS), yes = R.int(0, 1) === 1, said = yes ? x[1] : R.pick(others(NAMES, x[1])), n = Q.name();
    return { q: n + ' is ' + x[0] + '. ' + n + ' says that is <b>' + said + '</b>.', type: 'tf', answer: yes,
      why: { options: ['That is the skill being used.', 'A different skill is being used.'], answer: yes ? 0 : 1 },
      hint: 'Think about what ' + n + ' is doing.', explain: 'It is <b>' + x[1] + '</b>.', meta: { k: 'g2-skill-tf', ex: x[0], said: said } };
  }

  /* ---------- reading and writing everywhere ---------- */
  function subject(lv) {
    var u = R.pick(USES), subs = USES.map(function (x) { return x[1]; }).filter(function (x, i, all) { return x !== u[1] && all.indexOf(x) === i; });
    return Q.tiles('In which subject would you be <b>' + u[0] + '</b>?', u[1], R.some(subs, lv > 1 ? 3 : 2), {
      hint: 'Reading and writing help in every subject.', explain: '<b>' + u[1] + '</b>.', meta: { k: 'g2-subject', use: u[0] } });
  }
  function everyday(lv) {
    return Q.all('Pick every time you use <b>reading or writing</b>.', R.some(DAILY, 2), R.some(NOTREAD, lv > 1 ? 3 : 2), { hint: 'Are there words to read or write?', explain: 'Reading and writing are everywhere.', meta: { k: 'g2-everyday' } });
  }
  function useMatch() {
    var us = R.shuffle(USES).filter(function (x, i, all) { return all.findIndex(function (y) { return y[1] === x[1]; }) === i; }).slice(0, 3);
    return { q: 'Match each job to its subject.', type: 'match', pairs: us.map(function (x) { return [x[0], x[1]]; }), hint: 'Where would you do it at school?', explain: 'Reading and writing help in every subject.', meta: { k: 'g2-use-match' } };
  }
  function dailyOne(lv) {
    var right = R.pick(DAILY);
    return Q.one('Which one uses <b>reading or writing</b>?', right, R.some(NOTREAD, lv > 1 ? 2 : 1), { hint: 'Are there words to read or write?', explain: '<b>' + right + '</b>', meta: { k: 'g2-daily-one' } });
  }
  function dailyTf() {
    var yes = R.int(0, 1) === 1, x = R.pick(yes ? DAILY : NOTREAD), n = Q.name();
    return { q: n + ' is <b>' + x + '</b>. Is ' + n + ' using reading or writing?', type: 'tf', answer: yes,
      why: { options: ['There are words to read or write.', 'There are no words to read or write.'], answer: yes ? 0 : 1 },
      hint: 'Are there words?', explain: yes ? 'Yes: words to read or write.' : 'No words this time.', meta: { k: 'g2-daily-tf', x: x } };
  }

  Atlas.register('connections', {
    full: true,
    lessons: [{
      id: 'skills', title: 'Skills for learning', sub: 'Skills you use everywhere, not just in Language.',
      concepts: [
        { slug: 'skills', title: 'Skills that go everywhere', exp: ['A1.1'], skill: 'skills',
          model: [
            step(W.icon('think'), '<b>Critical thinking</b>: asking "Is this true?"'),
            step(W.icon('people'), '<b>Collaboration</b>: working with a partner.'),
            step(W.icon('star'), '<b>Creativity</b>: making something new.'),
            step(W.icon('screen'), '<b>Digital literacy</b>: using a tablet safely.')
          ],
          guided: [T(skillFor, 1), T(skillShows, 1), matchSkill],
          check: [T(skillFor, 2), skillTf, matchSkill, T(skillShows, 2), T(skillFor, 2)],
          coach: '<p>Name the skill when you see it: "You worked that out with your brother. That is collaboration."</p>',
          mistake: '<p>Thinking these skills are only for school. Point them out at home too.</p>' },
        { slug: 'everywhere', title: 'Reading and writing everywhere', exp: ['A3.1'], skill: 'everywhere',
          model: [
            step(W.icon('read'), 'Math: a story problem.'),
            step(W.icon('think'), 'Science: labels on a plant.'),
            step(W.icon('write'), 'At home: a card for Grandpa.'),
            step(W.sent('reading a street sign'), 'Out and about.')
          ],
          guided: [T(subject, 1), T(everyday, 1), T(dailyOne, 1)],
          check: [T(subject, 2), useMatch, dailyTf, T(everyday, 2), T(dailyOne, 2)],
          coach: '<p>Spot reading and writing on an outing: signs, menus, labels, maps.</p>',
          mistake: '<p>Thinking reading only happens in books.</p>' }
      ]
    }],
    practice: [
      { id: 'skills', name: 'Skills for learning', code: 'A1.1', gen: skillFor },
      { id: 'everywhere', name: 'Reading and writing everywhere', code: 'A3.1', gen: subject }
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
    skills: [[1, 'match', matchSkill], [1, 'shows', skillShows], [1, 'tf', skillTf]],
    everywhere: [[1, 'everyday', everyday], [1, 'match', useMatch], [1, 'one', dailyOne], [1, 'tf', dailyTf]]
  });
})();
