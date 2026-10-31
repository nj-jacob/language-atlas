/* Grade 6: skills and connections.
   Ontario 2023 Language, Grades 4 to 6:
   A1.1 explain how the seven transferable skills support communication, and apply them      A1.2 evaluate how they help students express their voice, engage, and plan next steps
   A3.1 explain how language skills support learning in other subjects and everyday life      A3.2 historical contexts, contributions, lived experiences and perspectives; identity and belonging
   A3.3 explain themes in First Nations, Metis and Inuit cultures
   Identity and culture are explored with a grown-up and real texts, never auto-marked. Answer checks: tests/verify/grade6-connections.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* the seven transferable skills, each with an example from language and literacy */
  var SKILLS = [['critical thinking', 'checking whether a website is reliable'], ['creativity', 'inventing a new form for a poem'], ['self-directed learning', 'setting a reading goal and tracking it'],
    ['collaboration', 'writing a script with a group'], ['communication', 'adjusting a talk for a younger audience'], ['global citizenship', 'reading news about climate change around the world'],
    ['digital literacy', 'using a word processor' + '’' + 's tools to edit']];
  /* [a language skill, where it helps beyond Language class] */
  var USES = [['summarizing', 'writing up a science experiment'], ['reading a chart', 'understanding data in math'], ['using primary sources', 'learning history in social studies'],
    ['following steps in order', 'cooking a recipe at home'], ['persuasive writing', 'asking the school council for a change'], ['listening carefully', 'learning a dance in phys ed']];

  function skillFor(lv) {
    var s = R.pick(SKILLS);
    return Q.one('Which transferable skill are you using when you are <b>' + s[1] + '</b>?', s[0], R.some(SKILLS.filter(function (x) { return x !== s; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'What are you really doing?', explain: s[1] + ': <b>' + s[0] + '</b>.', meta: { k: 'g6-skill-for', ex: s[1] } });
  }
  function matchSkill() {
    var s = R.some(SKILLS, 3);
    return { q: 'Match each skill to an example.', type: 'match', pairs: s.map(function (x) { return [x[0], x[1]]; }), hint: 'Picture yourself doing each one.', explain: 'These skills travel to every subject.', meta: { k: 'g6-match-skill' } };
  }
  function useIn(lv) {
    var u = R.pick(USES);
    return Q.one('Where would <b>' + u[0] + '</b> help you most?', u[1], R.some(USES.filter(function (x) { return x !== u; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Which task needs that skill?', explain: '<b>' + u[0] + '</b> helps with ' + u[1] + '.', meta: { k: 'g6-use-in', skill: u[0] } });
  }
  function useMatch() {
    var u = R.some(USES, 3);
    return { q: 'Match each language skill to where it helps.', type: 'match', pairs: u.map(function (x) { return [x[0], x[1]]; }), hint: 'Think about other subjects and home.', explain: 'Language skills are used everywhere.', meta: { k: 'g6-use-match' } };
  }

  Atlas.register('connections', {
    lessons: [{
      id: 'skills', title: 'Skills for learning and life', sub: 'Skills that travel to every subject.',
      concepts: [
        { slug: 'skills', title: 'Seven transferable skills', exp: ['A1.1'], skill: 'skills',
          model: [
            step(W.icon('think'), '<b>Critical thinking</b>: is this website reliable?'),
            step(W.icon('people'), '<b>Collaboration</b>: writing a script with a group.'),
            step(W.icon('talk'), '<b>Communication</b>: changing a talk for younger listeners.'),
            step(W.icon('screen'), '<b>Digital literacy</b>: editing with a word processor.')
          ],
          guided: [function () { return skillFor(1); }, matchSkill],
          check: [function () { return skillFor(2); }, matchSkill],
          coach: '<p>Name the skill when you see it: "You just checked that source. That is critical thinking."</p>',
          mistake: '<p>Thinking these skills belong only to school. They are life skills.</p>' },
        { slug: 'everywhere', title: 'Language in every subject', exp: ['A3.1'], skill: 'skills',
          model: [
            step(W.means('read', 'summarizing'), 'Science: write up an experiment.'),
            step(W.means('read', 'reading a chart'), 'Math: understand the data.'),
            step(W.means('write', 'persuasive writing'), 'Life: ask the school council for a change.')
          ],
          guided: [function () { return useIn(1); }, useMatch],
          check: [function () { return useIn(2); }, useMatch],
          coach: '<p>During homework in another subject, ask: "Which language skill are you using right now?"</p>',
          mistake: '<p>Forgetting good writing habits in other subjects. A science report still needs editing.</p>' }
      ]
    }],
    practice: [
      { id: 'skills', name: 'Skills and connections', code: 'A1.1, A3.1', gen: skillFor }
    ],
    tasks: [
      { id: 'my-goal', title: 'My skills and my next step', code: 'A1.2', pic: W.icon('star'), say: 'Which skill helps you share your ideas best? Choose one to grow, and make a plan.', write: true,
        run: ['Look at the seven skills together. Ask which ones help the child express their ideas and stay engaged, and why.', 'Choose one skill to grow. Write a plan: what to try, when, and how to check progress. Review it in two weeks.'],
        rubric: ['No goal yet.', 'A goal with help, no plan.', 'Explains a strength, sets a goal and a plan.', 'Evaluates their skills thoughtfully and follows a clear plan.'] },
      { id: 'identity', title: 'Identity and belonging', code: 'A3.2', pic: W.icon('people'), say: 'Read a book about someone whose life is different from yours. What shapes who they are?', write: true,
        run: ['Choose a novel or biography about a person or community from a different background or time in Canada, for example newcomers, Black Canadians, or Francophone communities.',
          'Talk about the history behind it, and what gives the person a sense of identity and belonging.', 'The child writes about what shapes their own identity, and what they learned.'],
        rubric: ['A few words.', 'Describes the person, with little on identity.', 'Explains what shapes the person’s identity and connects to their own.', 'Explains identity in its historical context, and reflects thoughtfully on their own.'] },
      { id: 'fnmi-themes', title: 'Themes in First Nations, Métis and Inuit stories', code: 'A3.3', pic: W.icon('read'), say: 'Read a story by a First Nations, Métis or Inuit creator. Explain a theme.',
        run: ['With your librarian, choose a book by a First Nations, Métis or Inuit author. Note the creator’s nation or community.',
          'After reading, ask: "What is the big idea? What does it show about relationships, the land, community or ways of knowing?" Ask the child to explain using evidence from the story.'],
        rubric: ['Does not name a theme yet.', 'Names a theme with help.', 'Explains a theme with evidence from the story.', 'Explains the theme, what it shows about the community, and connects it to today, respectfully.'],
        coach: '<p>Let the book and its creator lead. Each nation and community is distinct: avoid treating them as one culture.</p>' }
    ]
  });

  Q.shapes('connections', {
    skills: [[1, 'match', matchSkill], [1, 'use-in', useIn], [2, 'use-match', useMatch]]
  });
})();
