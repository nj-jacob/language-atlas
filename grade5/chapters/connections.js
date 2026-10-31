/* Grade 5: skills and connections.
   Ontario 2023 Language, Grades 4 to 6:
   A1.1 explain how the transferable skills support communication, and apply them       A1.2 evaluate how they help students express their voice and be engaged, and plan next steps
   A3.1 explain how the knowledge and skills of this grade support learning in other subjects and everyday life
   A3.2 historical contexts, contributions, lived experiences and perspectives, exploring identity, self and belonging in culturally responsive texts
   A3.3 themes in First Nations, Metis and Inuit cultures
   Goals, identity and culture are explored with a grown-up and real books, never auto-marked. Answer checks: tests/verify/grade5-connections.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* the seven transferable skills, with an example from reading, writing, listening or speaking */
  var SKILLS = [['critical thinking', 'checking whether a website is reliable'], ['creativity', 'inventing a new ending for a story'], ['self-directed learning', 'setting a goal to read 20 minutes a day and tracking it'],
    ['collaboration', 'planning a group presentation and sharing the jobs'], ['communication', 'paraphrasing directions for a younger student'], ['global citizenship', 'writing a letter about protecting wetlands'],
    ['digital literacy', 'checking the privacy settings on a class blog']];
  /* [what you do, the subject, the Language skill it uses] */
  var USES = [['writing up a science experiment', 'Science', 'putting steps in order'], ['reading a word problem twice', 'Math', 'monitoring your understanding'], ['comparing two accounts of an event', 'Social Studies', 'spotting perspective and bias'],
    ['writing the words for a song', 'Music', 'choosing vivid words'], ['explaining a game' + '’' + 's rules to a team', 'Phys Ed', 'speaking clearly']];
  var DAILY = ['reading the label on a medicine bottle', 'checking a bus schedule', 'writing a message to a relative', 'comparing two products before buying'];
  var NOLANG = ['sleeping', 'swimming laps', 'tying your shoes'];

  /* ---------- question makers ---------- */
  function skillFor(lv) {
    var s = R.pick(SKILLS);
    return Q.one('Which skill are you using when you are <b>' + s[1] + '</b>?', s[0], R.some(SKILLS.filter(function (x) { return x !== s; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Think about what you are really doing.', explain: 'That is <b>' + s[0] + '</b>.', meta: { k: 'g5-skill-for', ex: s[1] } });
  }
  function matchSkill() {
    var s = R.some(SKILLS, 3);
    return { q: 'Match each skill to an example.', type: 'match', pairs: s.map(function (x) { return [x[0], x[1]]; }), hint: 'Picture yourself doing each one.', explain: 'These skills travel to every subject.', meta: { k: 'g5-match-skill' } };
  }
  function subject() {
    var u = R.pick(USES);
    return Q.tiles('In which subject would you be <b>' + u[0] + '</b>?', u[1], R.some(USES.filter(function (x) { return x !== u; }), 2).map(function (x) { return x[1]; }), {
      hint: 'Language skills help in every subject.', explain: u[1] + ': it uses <b>' + u[2] + '</b>.', meta: { k: 'g5-subject', use: u[0] } });
  }
  function langSkill() {
    var u = R.pick(USES);
    return Q.one('<b>' + u[0] + '</b> (' + u[1] + '). Which Language skill helps most?', u[2], R.some(USES.filter(function (x) { return x !== u; }), 2).map(function (x) { return x[2]; }), {
      hint: 'What would make this job easier?', explain: '<b>' + u[2] + '</b> helps.', meta: { k: 'g5-lang-skill', use: u[0] } });
  }
  function everyday() {
    return Q.all('Pick every time you use <b>reading or writing</b> in everyday life.', R.some(DAILY, 2), R.some(NOLANG, 2), { hint: 'Are there words to read or write?', explain: 'Reading and writing are everywhere.', meta: { k: 'g5-everyday' } });
  }

  Atlas.register('connections', {
    lessons: [{
      id: 'skills', title: 'Skills that travel', sub: 'The skills you use in Language help everywhere.',
      concepts: [
        { slug: 'seven', title: 'Seven transferable skills', exp: ['A1.1'], skill: 'skills',
          model: [
            step(W.icon('think'), '<b>Critical thinking</b>: is this website reliable?'),
            step(W.icon('people'), '<b>Collaboration</b>: sharing the jobs in a group.'),
            step(W.icon('screen'), '<b>Digital literacy</b>: safe settings on a class blog.'),
            step(W.icon('talk'), '<b>Communication</b>: explaining so others understand.')
          ],
          guided: [function () { return skillFor(1); }, function () { return skillFor(1); }],
          check: [function () { return skillFor(2); }, matchSkill],
          coach: '<p>Name the skill when you see it: "You just checked who wrote that. That is critical thinking."</p>',
          mistake: '<p>Thinking these skills belong to one subject. They are used everywhere, including at home.</p>' },
        { slug: 'everywhere', title: 'Language helps in every subject', exp: ['A3.1'], skill: 'skills',
          model: [
            step(W.icon('write'), 'Science: write steps in order.'),
            step(W.icon('read'), 'Math: reread the word problem.'),
            step(W.icon('screen'), 'Every day: labels, schedules, messages.')
          ],
          guided: [subject, langSkill],
          check: [langSkill, everyday],
          coach: '<p>On an outing, count how many times you read or write something: signs, menus, tickets, maps.</p>',
          mistake: '<p>Thinking reading only happens in books.</p>' }
      ]
    }],
    practice: [
      { id: 'skills', name: 'Skills and connections', code: 'A1.1, A3.1', gen: skillFor }
    ],
    tasks: [
      { id: 'next-steps', title: 'My voice and my next steps', code: 'A1.2', pic: W.icon('star'), say: 'Which skills help you share your ideas? What will you work on next?', write: true,
        run: ['Talk about a recent piece of work the child was proud of. Which skills helped them share their voice?', 'Together, choose one skill to grow and plan two small steps for the next month. Check in each week.'],
        rubric: ['No goal yet.', 'A goal with help; no steps.', 'Explains which skills helped and sets a goal with steps.', 'Evaluates their skills honestly, sets a goal with steps, and checks progress.'] },
      { id: 'identity', title: 'Identity and belonging', code: 'A3.2', pic: W.icon('people'), say: 'Read a story about identity. How does it connect to who you are?', write: true,
        run: ['Read a book about identity and belonging, ideally by a creator whose culture or experience is shared with or different from the child' + '’' + 's.',
          'Talk about the character' + '’' + 's history, family and community, and what helps them feel they belong.', 'The child writes about their own identity and connects it to the book.'],
        rubric: ['A word or two.', 'A few sentences about self.', 'Shares their identity and connects it to the book.', 'Thoughtful links between the book' + '’' + 's context and their own identity and belonging.'] },
      { id: 'fnmi-themes', title: 'Themes in First Nations, Métis and Inuit texts', code: 'A3.3', pic: W.icon('read'), say: 'Read a text by a First Nations, Métis or Inuit creator. What is it really about?',
        run: ['With your librarian, choose a text by a First Nations, Métis or Inuit creator. Check the author note for their nation or community.',
          'After reading, ask: "What is the big idea? What does it show about identity, relationships, the land, or legacy?"', 'Explain the theme using parts of the text.'],
        rubric: ['Does not name a theme yet.', 'Names a theme with help.', 'Explains a theme with evidence from the text.', 'Explains the theme and what it shows about the community, respectfully and in depth.'],
        coach: '<p>Let the text and its creator lead. Each First Nation, Métis and Inuit community is distinct; avoid treating them as one culture.</p>' }
    ]
  });

  Q.shapes('connections', {
    skills: [[1, 'match', matchSkill], [1, 'subject', subject], [1, 'lang-skill', langSkill], [1, 'everyday', everyday]]
  });
})();
