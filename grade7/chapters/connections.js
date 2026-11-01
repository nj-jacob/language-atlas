/* Grade 7: skills and connections.
   Ontario 2023 Language, Grades 7 and 8:
   A1.1 analyze how the seven transferable skills support communication in different contexts     A1.2 how they help students express their voice, and a plan to develop their capabilities
   A3.1 how this grade's language skills support other subjects and everyday life                 A3.2 identity, self and belonging in culturally responsive texts, with historical contexts
   A3.3 themes in First Nations, Métis and Inuit cultures
   Identity and culture are explored with a grown-up and real texts, never auto-marked.
   Answer checks: tests/verify/grade7-connections.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* ---------- the seven transferable skills, each with Grade 7 examples ---------- */
  var SKILLS = ['critical thinking and problem solving', 'innovation, creativity and entrepreneurship', 'self-directed learning', 'collaboration', 'communication',
    'global citizenship and sustainability', 'digital literacy'];
  /* [example, which skill] */
  var EX = [['checking whether a viral claim is true before sharing it', 0], ['comparing two news reports to find what each leaves out', 0], ['working out why the class garden keeps flooding', 0],
    ['designing a new way to reduce lunchroom waste', 1], ['starting a small dog-walking business', 1], ['inventing a board game that teaches fractions', 1],
    ['setting a goal to read 20 minutes a day and tracking it', 2], ['reviewing notes before a test without being asked', 2], ['finding a tutorial to teach yourself to code', 2],
    ['editing a group report together in a shared document', 3], ['splitting up jobs fairly in a group project', 3], ['building on a teammate' + AP + 's idea in a discussion', 3],
    ['adjusting a talk for younger students so they understand it', 4], ['writing a clear, polite email to a coach', 4], ['using pauses and eye contact in a speech', 4],
    ['writing to council about protecting a local wetland', 5], ['organizing a clothing swap to cut waste', 5], ['raising money for the local food bank', 5],
    ['using privacy settings and citing images in a slideshow', 6], ['spotting a fake account before following it', 6], ['choosing the right app to record a podcast', 6]];
  function skillFor(lv) {
    var e = R.pick(EX);
    return Q.one('Which transferable skill is this?', SKILLS[e[1]], R.some(SKILLS.filter(function (x, i) { return i !== e[1]; }), lv > 1 ? 3 : 2), { fig: W.means('star', e[0]),
      hint: 'What is the person mainly doing: thinking, creating, learning on their own, working together, communicating, caring for the world, or using technology well?', explain: '<b>' + SKILLS[e[1]] + '</b>', meta: { k: 'g7-skill-for', ex: e[0] } });
  }
  function skillExample(lv) {
    var i = R.int(0, SKILLS.length - 1), right = R.pick(EX.filter(function (e) { return e[1] === i; })), wrong = R.some(EX.filter(function (e) { return e[1] !== i; }), lv > 1 ? 3 : 2);
    return Q.tiles('Which example shows <b>' + SKILLS[i] + '</b>?', right[0], wrong.map(function (e) { return e[0]; }), { hint: 'Picture yourself doing each one. Which skill does it use most?',
      explain: right[0] + ': ' + SKILLS[i] + '.', meta: { k: 'g7-skill-example', skill: SKILLS[i] } });
  }
  function skillMatch(lv) {
    var is = R.some(SKILLS.map(function (s, i) { return i; }), lv > 2 ? 4 : 3);
    return { q: 'Match each skill to an example.', type: 'match', pairs: is.map(function (i) { return [SKILLS[i], R.pick(EX.filter(function (e) { return e[1] === i; }))[0]]; }), hint: 'Picture yourself doing each example.', explain: 'These skills travel to every subject.', meta: { k: 'g7-skill-match' } };
  }
  function skillTf() {
    var e = R.pick(EX), right = R.int(0, 1) === 1, said = right ? e[1] : R.pick(SKILLS.map(function (s, i) { return i; }).filter(function (i) { return i !== e[1]; }));
    return { q: Q.name() + ' says this shows <b>' + SKILLS[said] + '</b>.', fig: W.means('star', e[0]), type: 'tf', answer: right,
      why: { options: ['That is the skill it uses most.', 'It mainly uses a different skill.'], answer: right ? 0 : 1 },
      hint: 'What is the person mainly doing?', explain: '<b>' + SKILLS[e[1]] + '</b>', meta: { k: 'g7-skill-tf', ex: e[0], said: SKILLS[said] } };
  }

  /* ---------- language skills in other subjects: [a language skill, a task in another subject or in daily life where it helps most] ---------- */
  var USES = [['summarizing the main idea', 'writing the conclusion of a science lab report'], ['checking sources for bias', 'researching a history project on Confederation'],
    ['reading graphs and diagrams', 'understanding a geography chart of rainfall'], ['persuasive writing', 'applying for a summer job'], ['using context clues', 'working out a new word in a math problem'],
    ['active listening', 'following a coach' + AP + 's instructions at practice'], ['taking notes while listening', 'learning from a guest speaker in social studies'],
    ['writing a clear procedure', 'explaining the steps of a science experiment'], ['spotting persuasive techniques', 'deciding whether to buy something you saw in an ad'],
    ['using a formal tone', 'emailing a teacher about a missed test'], ['organizing notes under headings', 'planning a report on Canada' + AP + 's regions'],
    ['reading a map key', 'finding a hiking route in a provincial park'], ['giving a clear oral presentation', 'presenting a science fair project'], ['reading instructions slowly and carefully', 'building a model from a kit']];
  function useFor(lv) {
    var u = R.pick(USES);
    return Q.one('Which language skill helps most with <b>' + u[1] + '</b>?', u[0], R.some(USES.filter(function (x) { return x !== u; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'What would you need to read, write, say or listen for?', explain: '<b>' + u[0] + '</b> helps with ' + u[1] + '.', meta: { k: 'g7-use-for', task: u[1] } });
  }
  function useWhere(lv) {
    var u = R.pick(USES);
    return Q.tiles('Where would <b>' + u[0] + '</b> help most?', u[1], R.some(USES.filter(function (x) { return x !== u; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), {
      hint: 'Picture doing each task. What would you need?', explain: '<b>' + u[0] + '</b>: ' + u[1] + '.', meta: { k: 'g7-use-where', skill: u[0] } });
  }
  function useMatch(lv) {
    var us = R.some(USES, lv > 2 ? 4 : 3);
    return { q: 'Match each language skill to where it helps.', type: 'match', pairs: us.map(function (u) { return [u[0], u[1]]; }), hint: 'Think about the subject each task comes from.', explain: 'Language skills strengthen every subject.', meta: { k: 'g7-use-match' } };
  }
  function useTf() {
    var u = R.pick(USES), right = R.int(0, 1) === 1, said = right ? u[0] : R.pick(USES.filter(function (x) { return x !== u; }))[0];
    return { q: Q.name() + ' says <b>' + said + '</b> helps most with this.', fig: W.means('think', u[1]), type: 'tf', answer: right,
      why: { options: ['That is the skill the task needs most.', 'The task needs a different skill more.'], answer: right ? 0 : 1 },
      hint: 'What would you need to read, write, say or listen for?', explain: '<b>' + u[0] + '</b>', meta: { k: 'g7-use-tf', task: u[1], said: said } };
  }

  Atlas.register('connections', {
    full: true,
    lessons: [{
      id: 'skills', title: 'Skills that travel', sub: 'Language skills in every subject and in life.',
      concepts: [
        { slug: 'transferable', title: 'Seven skills, many places', exp: ['A1.1'], skill: 'transferable',
          model: [
            step(W.means('think', 'Is this viral claim true?'), 'Critical thinking.'),
            step(W.means('people', 'editing a report together'), 'Collaboration.'),
            step(W.means('talk', 'explaining to younger students'), 'Communication.'),
            step(W.means('screen', 'citing images, using privacy settings'), 'Digital literacy.')
          ],
          guided: [function () { return skillFor(1); }, function () { return skillExample(1); }, skillTf],
          check: [function () { return skillFor(2); }, function () { return skillMatch(2); }, skillTf, function () { return skillExample(2); }, function () { return skillFor(3); }],
          coach: '<p>Name the skill when you see the child use it: "You just checked that fact before believing it. That is critical thinking."</p>',
          mistake: '<p>Thinking these skills belong only to Language. They are used in every subject and every job.</p>' },
        { slug: 'subjects', title: 'Language skills power other subjects', exp: ['A3.1'], skill: 'subjects',
          model: [
            step(W.means('read', 'summarizing'), 'A science lab conclusion.'),
            step(W.means('think', 'checking sources for bias'), 'A history project.'),
            step(W.means('write', 'persuasive writing'), 'A summer job application.'),
            step(W.means('listen', 'taking notes while listening'), 'A guest speaker in social studies.')
          ],
          guided: [function () { return useFor(1); }, function () { return useWhere(1); }, useTf],
          check: [function () { return useFor(2); }, function () { return useMatch(2); }, useTf, function () { return useWhere(2); }, function () { return useFor(3); }],
          coach: '<p>Look at homework from another subject together and ask, "Which language skill does this need?"</p>',
          mistake: '<p>Treating reading and writing in science or history as separate from Language class.</p>' }
      ]
    }],
    practice: [
      { id: 'transferable', name: 'Transferable skills', code: 'A1.1', gen: skillFor },
      { id: 'subjects', name: 'Language in other subjects', code: 'A3.1', gen: useFor }
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
    transferable: [[1, 'example', skillExample], [1, 'true-false', skillTf], [2, 'match', skillMatch]],
    subjects: [[1, 'where', useWhere], [1, 'true-false', useTf], [2, 'match', useMatch]]
  });
})();
