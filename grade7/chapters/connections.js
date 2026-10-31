/* Grade 7: skills and connections.
   Ontario 2023 Language, Grades 7 and 8:
   A1.1 analyze how the seven transferable skills support communication in different contexts     A1.2 how they help students express their voice, and a plan to develop their capabilities
   A3.1 how this grade's language skills support other subjects and everyday life                 A3.2 identity, self and belonging in culturally responsive texts, with historical contexts
   A3.3 themes in First Nations, Métis and Inuit cultures
   Identity and culture are explored with a grown-up and real texts, never auto-marked.
   Answer checks: tests/verify/grade7-connections.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* the seven transferable skills, each with a Grade 7 example */
  var SKILLS = [['critical thinking and problem solving', 'checking whether a viral claim is true before sharing it'], ['innovation, creativity and entrepreneurship', 'designing a new way to reduce lunchroom waste'],
    ['self-directed learning', 'setting a goal to read 20 minutes a day and tracking it'], ['collaboration', 'editing a group report together in a shared document'],
    ['communication', 'adjusting a talk for younger students so they understand it'], ['global citizenship and sustainability', 'writing to council about protecting a local wetland'],
    ['digital literacy', 'using privacy settings and citing images in a slideshow']];
  /* [a language skill from this grade, a task in another subject or in daily life where it helps] */
  var USES = [['summarizing the main idea', 'writing the conclusion of a science lab report'], ['checking sources for bias', 'researching a history project on Confederation'],
    ['reading graphs and diagrams', 'understanding a geography chart of rainfall'], ['persuasive writing', 'applying for a summer job'], ['using context clues', 'reading a new word in a math problem'],
    ['active listening', 'following a coach' + '’' + 's instructions at practice']];
  function skillFor(lv) {
    var s = R.pick(SKILLS);
    return Q.one('Which transferable skill is this?', s[0], R.some(SKILLS.filter(function (x) { return x !== s; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), { fig: W.means('star', s[1]),
      hint: 'What is the person mainly doing: thinking, creating, learning on their own, working together, communicating, caring for the world, or using technology well?', explain: '<b>' + s[0] + '</b>', meta: { k: 'g7-skill-for', ex: s[1] } });
  }
  function skillMatch() {
    var ss = R.some(SKILLS, 3);
    return { q: 'Match each skill to an example.', type: 'match', pairs: ss.map(function (s) { return [s[0], s[1]]; }), hint: 'Picture yourself doing each example.', explain: 'These skills travel to every subject.', meta: { k: 'g7-skill-match' } };
  }
  function useFor(lv) {
    var u = R.pick(USES);
    return Q.one('Which language skill helps most with <b>' + u[1] + '</b>?', u[0], R.some(USES.filter(function (x) { return x !== u; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'What would you need to read, write, say or listen for?', explain: '<b>' + u[0] + '</b> helps with ' + u[1] + '.', meta: { k: 'g7-use-for', task: u[1] } });
  }
  function useMatch() {
    var us = R.some(USES, 3);
    return { q: 'Match each language skill to where it helps.', type: 'match', pairs: us.map(function (u) { return [u[0], u[1]]; }), hint: 'Think about the subject each task comes from.', explain: 'Language skills strengthen every subject.', meta: { k: 'g7-use-match' } };
  }

  Atlas.register('connections', {
    lessons: [{
      id: 'skills', title: 'Skills that travel', sub: 'Language skills in every subject and in life.',
      concepts: [
        { slug: 'transferable', title: 'Seven skills, many places', exp: ['A1.1'], skill: 'skills',
          model: [
            step(W.means('think', 'Is this viral claim true?'), 'Critical thinking.'),
            step(W.means('people', 'editing a report together'), 'Collaboration.'),
            step(W.means('talk', 'explaining to younger students'), 'Communication.'),
            step(W.means('screen', 'citing images, using privacy settings'), 'Digital literacy.')
          ],
          guided: [function () { return skillFor(1); }, skillMatch],
          check: [function () { return skillFor(2); }, skillMatch],
          coach: '<p>Name the skill when you see the child use it: "You just checked that fact before believing it. That is critical thinking."</p>',
          mistake: '<p>Thinking these skills belong only to Language. They are used in every subject and every job.</p>' },
        { slug: 'subjects', title: 'Language skills power other subjects', exp: ['A3.1'], skill: 'skills',
          model: [
            step(W.means('read', 'summarizing'), 'A science lab conclusion.'),
            step(W.means('think', 'checking sources for bias'), 'A history project.'),
            step(W.means('write', 'persuasive writing'), 'A summer job application.')
          ],
          guided: [function () { return useFor(1); }, useMatch],
          check: [function () { return useFor(2); }, useMatch],
          coach: '<p>Look at homework from another subject together and ask, "Which language skill does this need?"</p>',
          mistake: '<p>Treating reading and writing in science or history as separate from Language class.</p>' }
      ]
    }],
    practice: [
      { id: 'skills', name: 'Skills and connections', code: 'A1.1, A3.1', gen: skillFor }
    ],
    tasks: [
      { id: 'growth-plan', title: 'My growth plan', code: 'A1.2', pic: W.icon('star'), say: 'Pick one transferable skill to grow. Write a plan: what you will do, when, and how you will know it worked.', write: true,
        run: ['Help the child choose one skill (for example communication or self-directed learning) and explain how it helps them express their voice.', 'They write a plan with two concrete actions and a date to check.', 'On the check date, talk about what worked and update the plan.'],
        rubric: ['No plan yet.', 'A goal, but no actions or check.', 'A clear plan with actions and a check date.', 'A plan carried out, reviewed honestly, and updated.'] },
      { id: 'identity-texts', title: 'Identity and belonging', code: 'A3.2', pic: W.icon('people'), say: 'Read a text about identity and belonging. How does history shape the main character' + '’' + 's sense of who they are?', write: true,
        run: ['Choose a novel, memoir or film about identity, for example by a Canadian creator whose background differs from the child' + '’' + 's, or is similar to it.',
          'Talk about the historical context: what was happening at the time, and how it affects the character.', 'The child writes about how the character' + '’' + 's identity and belonging change, and connects it to their own life.'],
        rubric: ['Retells the plot only.', 'Describes the character' + '’' + 's identity with help.', 'Analyzes identity and belonging, with the historical context.', 'A thoughtful analysis that links history, the text and the child' + '’' + 's own identity, respectfully.'] },
      { id: 'fnmi-themes', title: 'Themes in First Nations, Métis and Inuit works', code: 'A3.3', pic: W.icon('read'), say: 'Explore a work by a First Nations, Métis or Inuit creator. What themes does it explore, and what does it teach?', write: true,
        run: ['With your librarian, choose a work by a First Nations, Métis or Inuit creator (a novel, poems, a song, a film). Use the creator' + '’' + 's own words to learn which nation or community they are from.',
          'Discuss themes such as relationships with the land, family and community, identity, resilience, or truth and reconciliation.', 'The child writes how the work shows the theme, with evidence, and what it taught them.'],
        rubric: ['Does not name a theme yet.', 'Names a theme with help.', 'Analyzes a theme with evidence from the work.', 'Analyzes how the theme reflects the creator' + '’' + 's nation or community' + '’' + 's perspectives and ways of knowing, respectfully.'],
        coach: '<p>Each First Nation, the Métis Nation and Inuit communities are distinct. Let the creator lead, and avoid generalizing about "Indigenous culture" as one thing.</p>' }
    ]
  });

  Q.shapes('connections', {
    skills: [[1, 'match', skillMatch], [1, 'use-for', useFor], [2, 'use-match', useMatch]]
  });
})();
