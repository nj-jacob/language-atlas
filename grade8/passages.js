/* Grade 8 reading passages for the tool box (assets/engine/library.js). Written for this site. */
(function () {
  'use strict';
  var P = Atlas.library, D = P.draw;
  function locker(x, open) {
    var h = '<rect class="k" x="' + x + '" y="14" width="56" height="118" rx="2"/>';
    if (open) return h + '<path class="k" d="M' + (x + 56) + ' 14 L' + (x + 84) + ' 22 V124 L' + (x + 56) + ' 132"/><path class="t" d="M' + x + ' 60 H' + (x + 56) + '"/>' +
      '<rect class="a" x="' + (x + 18) + '" y="30" width="20" height="26" rx="3"/><path class="a" d="M' + (x + 25) + ' 51 h6"/>';
    return h + '<path class="t" d="M' + (x + 14) + ' 26 h28 M' + (x + 14) + ' 31 h28 M' + (x + 14) + ' 36 h28 M' + (x + 46) + ' 72 v12"/>';
  }
  function bar(i, pct, label) {
    var x = 56 + i * 60, h = pct * 2.4;
    return '<rect class="h" x="' + x + '" y="' + (140 - h) + '" width="38" height="' + h + '"/><text class="lb" x="' + (x + 19) + '" y="' + (134 - h) + '" text-anchor="middle">' + pct + '%</text>' +
      '<text class="n" x="' + (x + 19) + '" y="154" text-anchor="middle">' + label[0] + '</text><text class="n" x="' + (x + 19) + '" y="166" text-anchor="middle">' + label[1] + '</text>';
  }

  P.add({
    id: 'g8-phones', subject: 'health', form: 'Letter to the editor', plain: true,
    title: 'Lock Up the Phones',
    deck: 'A Grade 8 student makes her case before families vote',
    hero: {
      tall: 140,
      cap: 'Should phones stay in lockers from the first bell to the last? Families at one school are about to decide.',
      art: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (i) { return locker(18 + i * 68, i === 6); }).join('') + '<path class="k" d="M0 134 H700"/>'
    },
    body: [
      '<i>To the Editor:</i>',
      'Last week, our school council voted on whether phones should stay in lockers for the whole school day. The vote was tied, so the question goes to families next month. As a Grade 8 student at Northwood Public School, I am asking every parent and guardian to vote yes.',
      { h: 'The problem' },
      'Phones are pulling our attention away from learning and from each other. Our school already asks us to put phones away during lessons, but many students still check them under their desks. In a <b>survey</b> our student council ran in October, 61 <b>percent</b> of 214 students said they check their phones during class at least once a day. At lunch, the cafeteria is strangely quiet: instead of talking, many of us scroll.',
      { fig: '<path class="k" d="M44 30 V140 H300"/>' + [0, 20, 40].map(function (v) { return '<path class="t" d="M40 ' + (140 - v * 2.4) + ' H300"/><text class="n" x="36" y="' + (144 - v * 2.4) + '" text-anchor="end">' + v + '%</text>'; }).join('') +
          bar(0, 18, ['never', '']) + bar(1, 21, ['once a', 'week']) + bar(2, 27, ['once a', 'day']) + bar(3, 34, ['several', 'times a day']),
        tall: 172, cap: 'How often do you check your phone during class? Northwood student council survey, October.' },
      { box: 'About the survey', text: 'The student council wrote the questions. 214 students in Grades 6 to 8 answered on paper, and each chose one answer. Students in Grades 4 and 5 were not asked.' },
      { h: 'A solution that works' },
      'The solution is simple: phones stay in lockers from the first bell to the last. Schools that have tried this report calmer classes and more conversation at lunch. Students who need a phone for a medical reason or a disability would keep theirs. Families could call the office in an emergency, just as they did for <b>generations</b>. Ms. Okafor, who teaches Grade 7 science, told me that when phones were put away for a week during tests last spring, “students asked more questions and finished more work.”',
      { h: 'Answering the worries' },
      'Some students say a locker rule treats us like little kids. I understand, but learning to put a phone away is a grown-up skill. Others worry about emergencies. Yet in an emergency, the safest thing is to listen to teachers, not to scroll through rumours.',
      'Six hours a day without a screen is not a punishment. It is a chance to think, to talk and to notice the people around us. Please vote yes.',
      '<i>Priya Ramanathan, Grade 8, Northwood Public School</i>'
    ],
    guide: { before: 'Ask: what is a letter to the editor, and who reads one? Teach <b>claim</b> (the main point), <b>evidence</b> (facts that support it) and <b>counterargument</b> (an answer to the other side), and the Words to know. As you read, the child underlines the claim once and each piece of evidence twice.',
      after: 'Priya’s student council wrote the survey and also wants the rule. Does that matter? How could a fairer survey be run?' },
    words: [['survey', 'the same questions asked to many people, to learn what they think or do'], ['percent', 'out of every 100'], ['generations', 'the steps from grandparents to parents to children, about 25 to 30 years each']],
    qs: [
      { k: 'choice', code: 'C1.3', half: true, q: 'Which text pattern organizes this letter?',
        opts: ['problem and solution', 'time order', 'description', 'compare and contrast'], a: 0 },
      { k: 'choice', code: 'C3.2', half: true, q: 'Who is Priya mainly trying to persuade?',
        opts: ['students', 'teachers', 'parents and guardians', 'the school council'], a: 2 },
      { k: 'lines', code: 'C1.4', n: 2, q: 'Look at the bar graph. Does it support Priya’s claim that 61 percent check their phones at least once a day? Show how you know.',
        a: 'Yes. 27% check once a day and 34% several times a day: 27 + 34 = 61%.', look: 'adds the two bars (27% and 34%) to reach 61%' },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart with each worry and Priya’s answer to it.', cols: ['Worry', 'Priya’s answer'],
        rows: [['A locker rule treats students like little kids.', null], ['Students need phones in an emergency.', null], [null, 'Those students would keep their phones.']],
        a: [[null, 'Putting a phone away is a grown-up skill.'], [null, 'Families can call the office; students should listen to teachers.'], ['Some students need a phone for a medical reason or a disability.', null]] },
      { k: 'lines', code: 'C3.5', n: 3, q: 'Read “About the survey.” Give two reasons the survey might not tell the whole story.',
        a: 'The student council wrote the questions and wants the rule, so the questions might lean one way. Grades 4 and 5 were not asked, and students may not remember exactly how often they check.', look: 'two reasons, such as who wrote it, who was left out, or answers based on memory' },
      { k: 'choice', code: 'C1.5', q: '“At lunch, the cafeteria is strangely quiet.” Why is this detail persuasive?',
        opts: ['It paints a picture of students not talking to each other.', 'It proves that phones are dangerous.', 'It gives an exact number.', 'It shows the food is not good.'], a: 0 },
      { k: 'lines', code: 'C2.6', n: 4, q: 'Do you agree with Priya? Write your own short reply. State your opinion and give two reasons, one of which answers her argument.',
        a: 'Answers will differ. For example: I disagree. Phones can help us look things up for projects, and Priya’s own survey shows 39% check their phones less than once a day, so most students already manage them.', look: 'a clear opinion, two reasons, and one reason that responds directly to a point in Priya’s letter' }
    ]
  });
})();
