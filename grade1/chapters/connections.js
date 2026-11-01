/* Grade 1: skills and connections.
   Ontario 2023 Language, Grades 1 to 3:
   A1.1 how the seven transferable skills are used in language and literacy     A1.2 how they help students express their voice and be engaged
   A3.1 applying language skills in other subjects and everyday life            A3.2 identity, self and belonging in culturally responsive texts
   A3.3 themes in First Nations, Metis and Inuit cultures
   Identity and culture are explored with a grown-up and real books, never auto-marked.
   Answer checks: tests/verify/grade1-connections.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* the seven transferable skills, in plain words, each with two Grade 1 examples */
  var SKILLS = [['thinking carefully', ['checking if a story could really happen', 'working out a tricky word']], ['being creative', ['making up a new ending for a story', 'drawing a picture for my poem']],
    ['learning on my own', ['picking a book and reading it by myself', 'fixing my own spelling']], ['working together', ['building a story with a partner', 'taking turns reading with a friend']],
    ['communicating', ['telling my idea clearly', 'reading my writing to the class']], ['caring for the world', ['reading about how to help the Earth', 'making a sign to save water']],
    ['using technology well', ['using a tablet safely to find a fact', 'typing a short note with a grown-up']]];
  var EXAMPLES = SKILLS.reduce(function (a, s) { return a.concat(s[1].map(function (e) { return [s[0], e]; })); }, []);
  /* [a job, the subject it is from] */
  var USES = [['reading the steps of an experiment', 'Science'], ['reading a number story', 'Math'], ['reading a map of our town', 'Social Studies'], ['singing the words of a song', 'Music'], ['reading the rules of a game', 'Phys Ed'],
    ['writing what the plant looks like each day', 'Science'], ['writing the numbers on a graph', 'Math'], ['reading about how people lived long ago', 'Social Studies'], ['reading the words of a chant', 'Music'],
    ['reading the steps of a new stretch', 'Phys Ed']];
  var SUBJECTS = ['Science', 'Math', 'Social Studies', 'Music', 'Phys Ed'];
  var DAILY = ['reading a street sign', 'writing a birthday card', 'reading a recipe', 'reading the label on a toy box', 'reading a bus schedule', 'writing a grocery list',
    'reading the menu at a café', 'writing my name on my art'];
  var NOTREAD = ['sleeping', 'brushing my teeth', 'jumping on one foot', 'hugging my dog', 'swinging on a swing', 'eating an apple'];

  /* ---------- question makers: skills ---------- */
  function skillFor(lv) {
    var e = R.pick(EXAMPLES);
    return Q.one('Which skill are you using when you are <b>' + e[1] + '</b>?', e[0], R.some(SKILLS.filter(function (x) { return x[0] !== e[0]; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Think about what you are doing.', explain: e[1] + ': <b>' + e[0] + '</b>.', meta: { k: 'g1-skill-for', ex: e[1] } });
  }
  function matchSkill() {
    var s = R.some(SKILLS, 3);
    return { q: 'Match each skill to an example.', type: 'match', pairs: s.map(function (x) { return [x[0], R.pick(x[1])]; }), hint: 'Picture yourself doing each one.', explain: 'These skills help everywhere.', meta: { k: 'g1-match-skill' } };
  }
  function skillTf() {
    var e = R.pick(EXAMPLES), said = R.pick([e[0], R.pick(SKILLS)[0]]), right = said === e[0];
    return { q: 'True or false?', fig: W.sent('When I am ' + e[1] + ', I am <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['That is the skill I am using.', 'I am using a different skill.'], answer: right ? 0 : 1 }, hint: 'Think about what you are doing.', explain: e[1] + ': <b>' + e[0] + '</b>.', meta: { k: 'g1-skill-tf', ex: e[1], said: said } };
  }
  function pickSkill() {
    var s = R.pick(SKILLS), right = R.some(s[1], R.int(1, 2)), wrong = R.some(EXAMPLES.filter(function (e) { return e[0] !== s[0]; }), 4 - right.length).map(function (e) { return e[1]; });
    return Q.all('Pick every example of <b>' + s[0] + '</b>.', right, wrong, { hint: 'Picture yourself doing each one.', explain: s[1].join('; ') + '.', meta: { k: 'g1-pick-skill', skill: s[0] } });
  }

  /* ---------- question makers: reading and writing everywhere ---------- */
  function subject(lv) {
    var u = R.pick(USES);
    return Q.tiles('In which subject would you be <b>' + u[0] + '</b>?', u[1], R.some(SUBJECTS.filter(function (x) { return x !== u[1]; }), lv > 1 ? 3 : 2), {
      hint: 'Reading and writing help in every subject.', explain: u[0] + ': <b>' + u[1] + '</b>.', meta: { k: 'g1-subject', use: u[0] } });
  }
  function everyday() {
    var n = R.int(1, 3);
    return Q.all('Pick every time you use <b>reading or writing</b>.', R.some(DAILY, n), R.some(NOTREAD, 4 - n), { hint: 'Are there words to read or write?', explain: 'Reading and writing are everywhere.', meta: { k: 'g1-everyday' } });
  }
  function everydayTf() {
    var right = R.int(0, 1) === 1, w = R.pick(right ? DAILY : NOTREAD);
    return { q: 'Do you use reading or writing when you are <b>' + w + '</b>?', type: 'tf', answer: right,
      why: { options: ['There are words to read or write.', 'There are no words to read or write.'], answer: right ? 0 : 1 }, hint: 'Are there words?', explain: right ? 'Yes: there are words.' : 'No words there.', meta: { k: 'g1-everyday-tf', w: w } };
  }
  function matchSubject() {
    var subs = R.some(SUBJECTS, 3);
    return { q: 'Match each one to its subject.', type: 'match', pairs: subs.map(function (sb) { return [R.pick(USES.filter(function (u) { return u[1] === sb; }))[0], sb]; }),
      hint: 'Where at school would you do it?', explain: 'Reading and writing help in every subject.', meta: { k: 'g1-match-subject' } };
  }

  Atlas.register('connections', {
    full: true,
    lessons: [{
      id: 'skills', title: 'Skills for learning', sub: 'Skills you use in Language and everywhere else.',
      concepts: [
        { slug: 'skills', title: 'Skills that help me learn', exp: ['A1.1'], skill: 'skills',
          model: [
            step(W.icon('think'), '<b>Thinking carefully</b>: could this really happen?'),
            step(W.icon('people'), '<b>Working together</b>: a story with a partner.'),
            step(W.icon('star'), '<b>Being creative</b>: a new ending.'),
            step(W.icon('talk'), '<b>Communicating</b>: telling my idea clearly.')
          ],
          guided: [function () { return skillFor(1); }, skillTf, function () { return skillFor(1); }],
          check: [function () { return skillFor(2); }, matchSkill, pickSkill, skillTf, function () { return skillFor(2); }],
          coach: '<p>Name the skill when you see it: "You worked that out carefully. That is thinking carefully."</p>',
          mistake: '<p>Thinking these skills only matter at school. They help at home and in play too.</p>' },
        { slug: 'everywhere', title: 'Reading and writing everywhere', exp: ['A3.1'], skill: 'everywhere',
          model: [
            step(W.icon('read'), 'Science: read the steps.'),
            step(W.icon('write'), 'Math: read a number story.'),
            step(W.icon('screen'), 'Every day: a sign, a card, a recipe.'),
            step(W.icon('wrong'), 'Brushing your teeth? No words to read.')
          ],
          guided: [function () { return subject(1); }, everyday, everydayTf],
          check: [function () { return subject(2); }, everyday, matchSubject, everydayTf, function () { return subject(2); }],
          coach: '<p>On a walk, count how many things you read: signs, menus, labels, maps.</p>',
          mistake: '<p>Thinking reading only happens with books.</p>' }
      ]
    }],
    practice: [
      { id: 'skills', name: 'Skills for learning', code: 'A1.1', gen: skillFor },
      { id: 'everywhere', name: 'Reading and writing everywhere', code: 'A3.1', gen: subject }
    ],
    tasks: [
      { id: 'my-goal', title: 'My reading goal', code: 'A1.2', pic: W.icon('star'), say: 'Choose one reading or writing goal. Check it each week.', write: true,
        run: ['Help the child choose one goal ("I will read a book with my grown-up every night", "I will use finger spaces").', 'Write it down. Check it together each week and talk about what helped.'],
        rubric: ['No goal yet.', 'A goal with help; not checked.', 'Sets a goal and checks it.', 'Sets a goal, checks it, and says what helped them grow.'] },
      { id: 'about-me', title: 'All about me', code: 'A3.2', pic: W.icon('people'), say: 'Draw and write about you: your family, your languages, and things you love.', write: true,
        run: ['First read a picture book about family and belonging together, ideally one with a family or culture like the child' + '’' + 's.', 'The child draws themselves and writes or tells three things about who they are.'],
        rubric: ['A drawing only.', 'One thing about themselves.', 'Shares three things about who they are.', 'Shares who they are with detail, and links it to the book.'] },
      { id: 'fnmi-themes', title: 'Big ideas in First Nations, Métis and Inuit stories', code: 'A3.3', pic: W.icon('read'), say: 'Read a book by a First Nations, Métis or Inuit creator. What is it really about?',
        run: ['With your librarian, choose a picture book by a First Nations, Métis or Inuit author or illustrator.', 'After reading, ask: "What is the big idea? What does it show about family, community, or caring for the land?"', 'Use the author note to learn which nation or community the creator is from.'],
        rubric: ['Does not name a big idea yet.', 'Names one with help.', 'Names a big idea and points to the story.', 'Explains the big idea and what it shows, respectfully.'],
        coach: '<p>Let the book and its creator lead. Each nation and community is distinct; avoid treating them as one culture.</p>' }
    ]
  });

  Q.shapes('connections', {
    skills: [[1, 'match', matchSkill], [1, 'true or false', skillTf], [1, 'pick', pickSkill]],
    everywhere: [[1, 'pick', everyday], [1, 'true or false', everydayTf], [1, 'match', matchSubject]]
  });
})();
