/* Grade 5: skills and connections. A full chapter: every idea has two worked examples, three questions together and five on
   your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grades 4 to 6:
   A1.1 explain how the transferable skills support communication, and apply them       A1.2 evaluate how they help students express their voice and be engaged, and plan next steps
   A3.1 explain how the knowledge and skills of this grade support learning in other subjects and everyday life
   A3.2 historical contexts, contributions, lived experiences and perspectives, exploring identity, self and belonging in culturally responsive texts
   A3.3 themes in First Nations, Metis and Inuit cultures
   Goals, identity and culture are explored with a grown-up and real books, never auto-marked. Answer checks: tests/verify/grade5-connections.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* the seven transferable skills, each with two examples from reading, writing, listening or speaking */
  var SKILLS = [['critical thinking', ['checking whether a website is reliable', 'asking whose voice is missing from a story']],
    ['creativity', ['inventing a new ending for a story', 'drawing a comic to explain the water cycle']],
    ['self-directed learning', ['setting a goal to read 20 minutes a day and tracking it', 'choosing a strategy when you get stuck reading']],
    ['collaboration', ['planning a group presentation and sharing the jobs', 'building on a classmate' + AP + 's idea in a group talk']],
    ['communication', ['paraphrasing directions for a younger student', 'speaking clearly so the back row can hear']],
    ['global citizenship', ['writing a letter about protecting wetlands', 'learning a greeting in a classmate' + AP + 's language']],
    ['digital literacy', ['checking the privacy settings on a class blog', 'naming the website where you found a photo']]];
  var EXAMPLES = [].concat.apply([], SKILLS.map(function (s) { return s[1].map(function (e) { return [s[0], e]; }); }));
  /* [what you do, the subject, the Language skill it uses] */
  var USES = [['writing up a science experiment', 'Science', 'putting steps in order'], ['reading a word problem twice', 'Math', 'monitoring your understanding'],
    ['comparing two accounts of an event', 'Social Studies', 'spotting perspective and bias'], ['writing the words for a song', 'Music', 'choosing vivid words'],
    ['explaining a game' + AP + 's rules to a team', 'Phys Ed', 'speaking clearly'], ['labelling a diagram of a plant', 'Science', 'using the right subject words'],
    ['reading a map legend', 'Social Studies', 'using text features'], ['writing about the choices in your painting', 'Visual Arts', 'explaining your choices'],
    ['learning the steps of a dance', 'Dance', 'listening for directions'], ['explaining how you solved a math problem', 'Math', 'giving reasons for each step'],
    ['researching an animal for a report', 'Science', 'checking that sources are reliable'], ['performing a scene in a play', 'Drama', 'reading with expression']];
  var SUBJECTS = USES.map(function (u) { return u[1]; }).filter(function (x, i, a) { return a.indexOf(x) === i; });
  var DAILY = ['reading the label on a medicine bottle', 'checking a bus schedule', 'writing a message to a relative', 'comparing two products before buying',
    'following a recipe', 'reading a street sign', 'texting a friend about plans', 'filling in a library card form'];
  var NOLANG = ['sleeping', 'swimming laps', 'tying your shoes', 'brushing your teeth', 'riding a bike', 'catching a ball'];

  function why(right, yes, no) { return { options: [yes, no], answer: right ? 0 : 1 }; }

  /* ---------- seven transferable skills (A1.1) ---------- */
  function skillFor(lv) {
    var e = R.pick(EXAMPLES);
    return Q.one('Which skill are you using when you are <b>' + e[1] + '</b>?', e[0], R.some(SKILLS.filter(function (x) { return x[0] !== e[0]; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Think about what you are really doing.', explain: 'That is <b>' + e[0] + '</b>.', meta: { k: 'g5-skill-for', ex: e[1] } });
  }
  function matchSkill() {
    var s = R.some(SKILLS, 3);
    return { q: 'Match each skill to an example.', type: 'match', pairs: s.map(function (x) { return [x[0], R.pick(x[1])]; }), hint: 'Picture yourself doing each one.', explain: 'These skills travel to every subject.', meta: { k: 'g5-match-skill' } };
  }
  function skillExample(lv) {
    var s = R.pick(SKILLS);
    return Q.one('Which one shows <b>' + s[0] + '</b>?', R.pick(s[1]), R.some(EXAMPLES.filter(function (e) { return e[0] !== s[0]; }), lv > 1 ? 2 : 1).map(function (e) { return e[1]; }), {
      hint: 'Picture yourself doing each one.', explain: s[0] + ': ' + s[1].join('; ') + '.', meta: { k: 'g5-skill-example', s: s[0] } });
  }
  function skillTf() {
    var e = R.pick(EXAMPLES), right = R.int(0, 1) === 1, said = right ? e[0] : R.pick(SKILLS.filter(function (x) { return x[0] !== e[0]; }))[0];
    return { q: Q.name() + ' is <b>' + e[1] + '</b>, and says: I am using <b>' + said + '</b>.', type: 'tf', answer: right, why: why(right, 'That is the skill it uses most.', 'It mostly uses a different skill.'),
      hint: 'What are they really doing?', explain: 'That is <b>' + e[0] + '</b>.', meta: { k: 'g5-skill-tf', ex: e[1], said: said } };
  }

  /* ---------- Language helps in every subject (A3.1) ---------- */
  function subject() {
    var u = R.pick(USES);
    return Q.tiles('In which subject would you be <b>' + u[0] + '</b>?', u[1], R.some(SUBJECTS.filter(function (x) { return x !== u[1]; }), 2), {
      hint: 'Language skills help in every subject.', explain: u[1] + ': it uses <b>' + u[2] + '</b>.', meta: { k: 'g5-subject', use: u[0] } });
  }
  function langSkill(lv) {
    var u = R.pick(USES);
    return Q.one('<b>' + u[0] + '</b> (' + u[1] + '). Which Language skill helps most?', u[2], R.some(USES.filter(function (x) { return x !== u; }), lv > 1 ? 2 : 1).map(function (x) { return x[2]; }), {
      hint: 'What would make this job easier?', explain: '<b>' + u[2] + '</b> helps.', meta: { k: 'g5-lang-skill', use: u[0] } });
  }
  function everyday() {
    return Q.all('Pick every time you use <b>reading or writing</b> in everyday life.', R.some(DAILY, 2), R.some(NOLANG, 2), { hint: 'Are there words to read or write?', explain: 'Reading and writing are everywhere.', meta: { k: 'g5-everyday' } });
  }
  function dailyTf() {
    var right = R.int(0, 1) === 1, act = R.pick(right ? DAILY : NOLANG);
    return { q: Q.name() + ' says you use reading or writing when you are <b>' + act + '</b>.', type: 'tf', answer: right, why: why(right, 'There are words to read or write.', 'There are no words to read or write.'),
      hint: 'Are there words to read or write?', explain: right ? 'Yes: reading and writing are everywhere.' : 'No words there.', meta: { k: 'g5-daily-tf', act: act } };
  }

  Atlas.register('connections', {
    full: true,
    lessons: [{
      id: 'skills', title: 'Skills that travel', sub: 'The skills you use in Language help everywhere.',
      concepts: [
        { slug: 'seven', title: 'Seven transferable skills', exp: ['A1.1'], skill: 'skills',
          model: [
            step(W.icon('think'), '<b>Critical thinking</b>: is this website reliable?'),
            step(W.icon('people'), '<b>Collaboration</b>: sharing the jobs in a group.'),
            step(W.icon('screen'), '<b>Digital literacy</b>: safe settings on a class blog.'),
            step(W.icon('talk'), '<b>Communication</b>: explaining so others understand.'),
            step(W.icon('star'), '<b>Creativity</b>: a new ending for a story.')
          ],
          guided: [function () { return skillFor(1); }, function () { return skillExample(1); }, skillTf],
          check: [function () { return skillFor(2); }, matchSkill, skillTf, function () { return skillExample(2); }, function () { return skillFor(3); }],
          coach: '<p>Name the skill when you see it: "You just checked who wrote that. That is critical thinking."</p>',
          mistake: '<p>Thinking these skills belong to one subject. They are used everywhere, including at home.</p>' },
        { slug: 'everywhere', title: 'Language helps in every subject', exp: ['A3.1'], skill: 'everywhere',
          model: [
            step(W.icon('write'), 'Science: write steps in order.'),
            step(W.icon('read'), 'Math: reread the word problem.'),
            step(W.icon('talk'), 'Drama: read with expression.'),
            step(W.icon('screen'), 'Every day: labels, schedules, messages.')
          ],
          guided: [function () { return langSkill(1); }, subject, everyday],
          check: [function () { return langSkill(2); }, dailyTf, subject, everyday, function () { return langSkill(3); }],
          coach: '<p>On an outing, count how many times you read or write something: signs, menus, tickets, maps.</p>',
          mistake: '<p>Thinking reading only happens in books.</p>' }
      ]
    }],
    practice: [
      { id: 'skills', name: 'Seven transferable skills', code: 'A1.1', gen: skillFor },
      { id: 'everywhere', name: 'Language in every subject', code: 'A3.1', gen: langSkill }
    ],
    tasks: [
      { id: 'next-steps', title: 'My voice and my next steps', code: 'A1.2', pic: W.icon('star'), say: 'Which skills help you share your ideas? What will you work on next?', write: true,
        run: ['Talk about a recent piece of work the child was proud of. Which skills helped them share their voice?', 'Together, choose one skill to grow and plan two small steps for the next month. Check in each week.'],
        rubric: ['No goal yet.', 'A goal with help; no steps.', 'Explains which skills helped and sets a goal with steps.', 'Evaluates their skills honestly, sets a goal with steps, and checks progress.'] },
      { id: 'identity', title: 'Identity and belonging', code: 'A3.2', pic: W.icon('people'), say: 'Read a story about identity. How does it connect to who you are?', write: true,
        run: ['Read a book about identity and belonging, ideally by a creator whose culture or experience is shared with or different from the child' + AP + 's.',
          'Talk about the character' + AP + 's history, family and community, and what helps them feel they belong.', 'The child writes about their own identity and connects it to the book.'],
        rubric: ['A word or two.', 'A few sentences about self.', 'Shares their identity and connects it to the book.', 'Thoughtful links between the book' + AP + 's context and their own identity and belonging.'] },
      { id: 'fnmi-themes', title: 'Themes in First Nations, Métis and Inuit texts', code: 'A3.3', pic: W.icon('read'), say: 'Read a text by a First Nations, Métis or Inuit creator. What is it really about?',
        run: ['With your librarian, choose a text by a First Nations, Métis or Inuit creator. Check the author note for their nation or community.',
          'After reading, ask: "What is the big idea? What does it show about identity, relationships, the land, or legacy?"', 'Explain the theme using parts of the text.'],
        rubric: ['Does not name a theme yet.', 'Names a theme with help.', 'Explains a theme with evidence from the text.', 'Explains the theme and what it shows about the community, respectfully and in depth.'],
        coach: '<p>Let the text and its creator lead. Each First Nation, Métis and Inuit community is distinct; avoid treating them as one culture.</p>' }
    ]
  });

  Q.shapes('connections', {
    skills: [[1, 'example', skillExample], [2, 'match', matchSkill], [1, 'tf', skillTf]],
    everywhere: [[1, 'subject', subject], [1, 'everyday', everyday], [1, 'tf', dailyTf]]
  });
})();
