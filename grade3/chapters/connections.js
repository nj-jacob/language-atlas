/* Grade 3: skills and connections.
   Ontario 2023 Language, Grades 1 to 3:
   A1.1 how the seven transferable skills are used in language and literacy     A1.2 how they help students express their voice and be engaged
   A3.1 applying language skills in other subjects and everyday life            A3.2 identity, self and belonging in culturally responsive texts
   A3.3 themes in First Nations, Metis and Inuit cultures
   Identity and culture are explored with a grown-up and real books, never auto-marked.
   Answer checks: tests/verify/grade3-connections.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  function others(list, x) { return list.filter(function (y) { return y !== x; }); }

  /* ---------- the seven transferable skills (A1.1): [skill, examples from reading, writing, listening and speaking] ---------- */
  var SKILLS = [['critical thinking', ['checking if a fact is true', 'asking if an ad tells the whole story', 'finding a clue that explains a character' + AP + 's choice']],
    ['creativity', ['making up a new ending for a story', 'inventing a word for a poem', 'drawing a new cover for a book']],
    ['self-directed learning', ['setting a reading goal and checking it', 'choosing a book to read on your own', 'checking your own writing before you hand it in']],
    ['collaboration', ['planning a story with a partner', 'sharing the jobs in a group project', 'taking turns in a book club']],
    ['communication', ['explaining your idea clearly', 'giving a short talk to the class', 'writing a clear note to a friend']],
    ['global citizenship', ['reading about how people care for the Earth', 'learning how kids in another country go to school', 'writing a letter about keeping a lake clean']],
    ['digital literacy', ['using a tablet safely to find facts', 'making a slideshow for a project', 'keeping your password private']]];
  var NAMES = SKILLS.map(function (s) { return s[0]; });
  function skillOf(name) { return SKILLS.filter(function (s) { return s[0] === name; })[0]; }

  function skillFor(lv) {
    var s = R.pick(SKILLS), ex = R.pick(s[1]);
    return Q.one('Which skill are you using when you are <b>' + ex + '</b>?', s[0], R.some(others(NAMES, s[0]), lv > 1 ? 3 : 2), {
      hint: 'Think about what you are doing.', explain: ex + ' is <b>' + s[0] + '</b>.', meta: { k: 'g3-skill-for', ex: ex } });
  }
  function matchSkill(lv) {
    return { q: 'Match each skill to an example.', type: 'match', pairs: R.some(SKILLS, lv > 1 ? 4 : 3).map(function (s) { return [s[0], R.pick(s[1])]; }),
      hint: 'Picture yourself doing each one.', explain: 'These skills help in every subject.', meta: { k: 'g3-match-skill' } };
  }
  function pickSkill(lv) {
    var s = R.pick(SKILLS), wrong = R.some(others(SKILLS, s), lv > 1 ? 3 : 2).map(function (x) { return R.pick(x[1]); });
    return Q.all('Pick every example of <b>' + s[0] + '</b>.', R.some(s[1], 2), wrong, { hint: 'What does ' + s[0] + ' look like?', explain: s[1].join('; ') + '.', meta: { k: 'g3-pick-skill', skill: s[0] } });
  }
  function skillTf() {
    var s = R.pick(SKILLS), right = R.int(0, 1) === 1, ex = R.pick(right ? s[1] : R.pick(others(SKILLS, s))[1]);
    return { q: Q.name() + ' says this is <b>' + s[0] + '</b>.', fig: W.sent(ex), type: 'tf', answer: right, hint: 'What does ' + s[0] + ' look like?', explain: 'It is ' + (right ? '' : 'not ') + s[0] + '.', meta: { k: 'g3-skill-tf', skill: s[0], ex: ex } };
  }

  /* ---------- language in other subjects and everyday life (A3.1) ---------- */
  /* [a job, the subject it is from] */
  var USES = [['reading the steps of an experiment', 'Science'], ['labelling the parts of a plant', 'Science'], ['writing what you saw in a science journal', 'Science'],
    ['reading a word problem', 'Math'], ['explaining how you solved a problem', 'Math'], ['reading the title of a graph', 'Math'],
    ['reading a map of Ontario', 'Social Studies'], ['reading about life long ago', 'Social Studies'], ['writing about your community', 'Social Studies'],
    ['writing a song', 'Music'], ['reading the words of a song', 'Music'], ['reading the rules of a game', 'Phys Ed'], ['reading a fitness chart', 'Phys Ed'],
    ['reading a food label', 'Health'], ['writing a title for your painting', 'Art']];
  var SUBJECTS = USES.map(function (u) { return u[1]; }).filter(function (x, i, all) { return all.indexOf(x) === i; });
  var DAILY = ['reading a recipe', 'reading a bus schedule', 'writing a birthday card', 'reading signs at the hospital', 'reading a cereal box', 'writing a shopping list',
    'reading a text from Grandma', 'reading street signs', 'filling in a library form', 'reading the menu at a restaurant'];
  var NOTREAD = ['sleeping', 'brushing my teeth', 'swimming laps', 'riding a bike', 'petting the cat', 'catching a ball', 'humming a tune', 'skating on the pond'];

  function subject(lv) {
    var u = R.pick(USES);
    return Q.tiles('In which subject would you be <b>' + u[0] + '</b>?', u[1], R.some(others(SUBJECTS, u[1]), lv > 1 ? 3 : 2), {
      hint: 'Reading and writing help in every subject.', explain: u[0] + ': <b>' + u[1] + '</b>.', meta: { k: 'g3-subject', use: u[0] } });
  }
  function matchSubject(lv) {
    var subs = R.some(SUBJECTS, lv > 1 ? 4 : 3);
    return { q: 'Match each job to its subject.', type: 'match', pairs: subs.map(function (sb) { return [R.pick(USES.filter(function (u) { return u[1] === sb; }))[0], sb]; }),
      hint: 'Where would you do it at school?', explain: 'Reading and writing help in every subject.', meta: { k: 'g3-match-subject' } };
  }
  function everyday(lv) {
    return Q.all('Pick every time you use <b>reading or writing</b> in everyday life.', R.some(DAILY, lv > 1 ? 3 : 2), R.some(NOTREAD, 2), { hint: 'Are there words to read or write?', explain: 'Reading and writing are everywhere.', meta: { k: 'g3-everyday' } });
  }
  function everydayTf() {
    var right = R.int(0, 1) === 1, s = R.pick(right ? DAILY : NOTREAD);
    return { q: Q.name() + ' says this uses reading or writing.', fig: W.sent(s), type: 'tf', answer: right, hint: 'Are there words to read or write?', explain: right ? 'There are words to read or write.' : 'No words needed.', meta: { k: 'g3-everyday-tf', s: s } };
  }

  Atlas.register('connections', {
    full: true,
    lessons: [{
      id: 'skills', title: 'Skills for learning', sub: 'Skills you use everywhere, not just in Language.',
      concepts: [
        { slug: 'skills', title: 'Seven skills that help you learn', exp: ['A1.1'], skill: 'skills',
          model: [
            step(W.icon('think'), '<b>Critical thinking</b>: is this true?'),
            step(W.icon('star'), '<b>Creativity</b>: a new idea.'),
            step(W.icon('again'), '<b>Self-directed learning</b>: set a goal, then check it.'),
            step(W.icon('people'), '<b>Collaboration</b>: working with a partner.'),
            step(W.icon('talk'), '<b>Communication</b>: saying your idea clearly.'),
            step(W.icon('read'), '<b>Global citizenship</b>: caring for people and the planet.'),
            step(W.icon('screen'), '<b>Digital literacy</b>: using devices safely and well.')
          ],
          guided: [function () { return skillFor(1); }, function () { return matchSkill(1); }, function () { return pickSkill(1); }],
          check: [function () { return skillFor(2); }, function () { return matchSkill(2); }, skillTf, function () { return pickSkill(2); }, function () { return skillFor(3); }],
          coach: '<p>Name the skill when you see it: "You just checked if that was true. That is critical thinking."</p>',
          mistake: '<p>Thinking skills only belong to one subject. They travel everywhere.</p>' },
        { slug: 'everywhere', title: 'Reading and writing everywhere', exp: ['A3.1'], skill: 'everywhere',
          model: [
            step(W.icon('read'), 'Science: read the steps of an experiment.'),
            step(W.icon('write'), 'Math: explain how you solved it.'),
            step(W.means('read', 'a map of Ontario'), 'Social studies: read a map.'),
            step(W.icon('screen'), 'Every day: a recipe, a sign, a bus schedule.'),
            step(W.sent('Milk, apples, bread'), 'Even a shopping list is writing.')
          ],
          guided: [function () { return subject(1); }, function () { return everyday(1); }, function () { return matchSubject(1); }],
          check: [function () { return subject(2); }, function () { return everyday(2); }, everydayTf, function () { return matchSubject(2); }, function () { return subject(3); }],
          coach: '<p>On an outing, count how many times you read something: signs, menus, labels, maps.</p>',
          mistake: '<p>Thinking reading only happens with books.</p>' }
      ]
    }],
    practice: [
      { id: 'skills', name: 'Seven skills', code: 'A1.1', gen: skillFor },
      { id: 'everywhere', name: 'Language everywhere', code: 'A3.1', gen: subject }
    ],
    tasks: [
      { id: 'my-goal', title: 'My learning goal', code: 'A1.2', pic: W.icon('star'), say: 'Choose one goal for reading or writing. Check it each week.', write: true,
        run: ['Help the child choose one goal ("I will read for 15 minutes a day", "I will use speech marks").', 'Write it down. Check it together each week and talk about which skills helped.'],
        rubric: ['No goal yet.', 'A goal with help; not checked.', 'Sets a goal and checks it.', 'Sets a goal, checks it, and explains what helped them grow.'] },
      { id: 'about-me', title: 'All about me', code: 'A3.2', pic: W.icon('people'), say: 'Write about who you are: family, languages, places and things you love.', write: true,
        run: ['First read a picture book about identity and belonging together, ideally one with a family or culture like the child' + AP + 's.', 'The child writes about who they are and what makes them feel they belong.'],
        rubric: ['A word or two.', 'A few sentences about self.', 'Shares several parts of who they are and where they belong.', 'Shares their identity with detail and connects it to the book.'] },
      { id: 'fnmi-themes', title: 'Themes in First Nations, Métis and Inuit stories', code: 'A3.3', pic: W.icon('read'), say: 'Read a book by a First Nations, Métis or Inuit creator. What is it really about?',
        run: ['With your librarian, choose a book by a First Nations, Métis or Inuit author or illustrator.', 'After reading, ask: "What is the big idea? What does the story show about family, community, the land or ways of knowing?"', 'Use the author note to learn which nation or community the creator is from.'],
        rubric: ['Does not name a theme yet.', 'Names a theme with help.', 'Names a theme and points to the story to show it.', 'Explains the theme and what it shows about the community, respectfully.'],
        coach: '<p>Let the book and its creator lead. Avoid treating First Nations, Métis and Inuit cultures as one culture: each nation and community is distinct.</p>' }
    ]
  });

  Q.shapes('connections', {
    skills: [[1, 'match', matchSkill], [1, 'pick', pickSkill], [1, 'true-false', skillTf]],
    everywhere: [[1, 'match', matchSubject], [1, 'everyday', everyday], [1, 'true-false', everydayTf]]
  });
})();
