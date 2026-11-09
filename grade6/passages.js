/* Grade 6 reading passages for the tool box (assets/engine/library.js). Written for this site. */
(function () {
  'use strict';
  var P = Atlas.library, D = P.draw;
  function cloud(x, y) { return '<path class="t" d="M' + x + ' ' + y + ' q4 -14 18 -10 q8 -12 22 -4 q14 -4 16 10 q10 2 8 10 h-62 q-8 -6 -2 -6 Z"/>'; }

  P.add({
    id: 'g6-wing', subject: 'science', form: 'Explanation',
    title: 'How a Wing Lifts',
    deck: 'The four forces that carry a plane, and the shape that makes it fly',
    hero: {
      tall: 156,
      cap: 'Four forces act on a plane in flight. To stay up, lift must balance weight; to move forward, thrust must beat drag.',
      art: cloud(60, 48) + cloud(560, 40) + cloud(620, 128) +
        '<path class="k" d="M262 96 Q252 96 252 90 Q252 82 268 80 L440 80 Q472 82 482 92 Q472 102 440 104 L276 104 Q264 104 262 96 Z"/>' +
        '<path class="k" d="M270 80 L254 46 L274 46 L298 80 M258 92 L230 88 L232 96 L262 98"/><path class="k" d="M326 98 Q370 92 420 98 Q370 108 326 104 Z"/>' +
        '<path class="t" d="M452 84 Q466 86 470 92 L452 92 Z"/>' +
        [306, 320, 334, 348, 362, 376, 390, 404, 418, 432].map(function (x) { return '<circle class="t" cx="' + x + '" cy="88" r="2.2"/>'; }).join('') +
        D.arrow(370, 76, 370, 24, 'a') + D.arrow(370, 110, 370, 150, 'a') + D.arrow(486, 92, 572, 92, 'a') + D.arrow(226, 92, 150, 92, 'a') +
        '<text class="lb" x="380" y="32">lift</text><text class="lb" x="380" y="148">weight</text><text class="lb" x="540" y="82">thrust</text><text class="lb" x="150" y="82">drag</text>'
    },
    body: [
      'A large passenger jet can weigh more than 300&nbsp;000 kilograms at take-off, yet it rises into the sky as smoothly as a gull. There is no magic in it. A plane flies because four forces push and pull on it all the time.',
      { h: 'Four forces' },
      '<b>Weight</b> is the pull of gravity toward the ground. <b>Lift</b> is the upward push that holds the plane up. <b>Thrust</b>, made by the engines or propellers, moves the plane forward, while <b>drag</b>, the push of the air against the plane, tries to slow it down. To climb, a plane needs more lift than weight. To speed up, it needs more thrust than drag.',
      { fig: '<path class="h" d="M40 88 Q64 56 140 54 Q222 56 272 92 Q200 94 140 96 Q74 98 40 88 Z"/>' +
          D.arrow(0, 52, 60, 40, 't') + '<path class="t" d="M60 40 Q150 22 240 50 Q270 60 300 66"/><path class="t" d="M0 72 Q30 66 50 64 M0 112 Q150 108 300 116"/>' +
          D.arrow(274, 96, 298, 124, 'a') + D.arrow(250, 98, 270, 130, 'a') + D.arrow(150, 50, 150, 6, 'a') +
          '<text class="lb" x="126" y="14">lift</text>' + '<text class="l" x="196" y="16">faster air,</text><text class="l" x="196" y="30">lower pressure</text>' + '<text class="l" x="4" y="136">slower air, higher pressure</text>' +
          '<text class="l" x="196" y="146">air pushed down</text>',
        tall: 150, cap: 'An airfoil from the side. The air moves faster over the curved top.' },
      { h: 'The secret is in the wing' },
      'Look at a wing from the side and you will see its special shape, called an <b>airfoil</b>. The top is curved and the bottom is flatter, and the front edge is tilted up slightly. As the plane moves, the wing splits the air. Air flowing over the curved top speeds up, and its pressure drops. Below the wing, the pressure stays higher. At the same time, the tilted wing pushes air downward, and the air pushes the wing up in return. Together, these effects create lift.',
      'The faster a plane moves, the more lift its wings make. That is why a jet races down a long runway before its nose lifts off.',
      { box: 'Try it', text: 'Hold a strip of paper just under your bottom lip so that it droops. Blow hard across the top. The paper rises, because the fast-moving air above it has lower pressure than the still air below.' },
      { h: 'Wings for every job' },
      'Engineers shape each wing for its job. A glider has long, thin wings that make plenty of lift at low speed, so it can soar for hours on rising warm air. Bush planes in northern Canada have wide wings that lift them off short gravel strips and small lakes. A fighter jet has short, swept-back wings that slice through the air at high speed.',
      'Birds solved the problem of flight long before people did. Watch a Canada goose take off from a pond: its wings change shape with every beat, adjusting lift and thrust in ways engineers still study today.',
      { box: 'A Canadian first', text: 'In the 1930s, Elsie MacGill became one of the first women in the world to work as an aircraft engineer. At a factory in Fort William, now part of Thunder Bay, she designed a training plane and led the team that built more than 1400 fighter planes during the Second World War.' }
    ],
    guide: { before: 'Ask: what keeps a plane up? Push your flat hand through the air, then tilt it up slightly: feel the push. Teach the four forces with the top picture, and the word <b>airfoil</b> (air + foil, a thin blade).',
      after: 'Do the “Try it” test together. Then talk about it: which wing would you choose for a plane that lands on a small northern lake, and why?' },
    words: [['airfoil', 'the curved shape of a wing that makes lift'], ['thrust', 'the force that moves a plane forward'], ['drag', 'the force of air that slows a plane down']],
    qs: [
      { k: 'table', code: 'C1.4', q: 'Use the picture at the top of the passage. Fill in the chart.', cols: ['Force', 'What it does'],
        rows: [['Lift', null], [null, 'Pulls the plane toward the ground'], ['Thrust', null], [null, 'Tries to slow the plane down']],
        a: [[null, 'Pushes the plane up'], ['Weight', null], [null, 'Moves the plane forward'], ['Drag', null]] },
      { k: 'choice', code: 'C3.3', half: true, q: 'What must be true for a plane to climb?',
        opts: ['more thrust than lift', 'more lift than weight', 'more drag than thrust', 'less lift than weight'], a: 1 },
      { k: 'choice', code: 'C2.4', half: true, q: 'What would help you understand <b>airfoil</b>?',
        opts: ['skip the paragraph', 'reread it and study the wing diagram', 'read faster', 'read only the title'], a: 1 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Use the text and the wing diagram. Explain two ways a wing makes lift.',
        a: 'The air over the curved top moves faster, so the pressure above the wing is lower than below it. The tilted wing also pushes air down, and the air pushes the wing up.', look: 'both ideas: lower pressure above the wing, and air pushed down pushing the wing up' },
      { k: 'choice', code: 'C1.3', half: true, q: 'Which text pattern does the section “Wings for every job” use?',
        opts: ['compare and contrast', 'problem and solution', 'time order', 'question and answer'], a: 0 },
      { k: 'choice', code: 'B2.2', half: true, q: '<b>Swept-back</b> wings …',
        opts: ['angle back toward the tail', 'are cleaned after each flight', 'fold up on the ground', 'point straight out'], a: 0 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'Why does a jet need a long runway when a bush plane can take off from a small lake? Use details from the text.',
        a: 'Lift grows with speed. A jet is heavy and needs a lot of speed, so it needs a long runway. A bush plane has wide wings that make enough lift at a lower speed.', look: 'the link between speed and lift, and the bush plane’s wide wings' },
      { k: 'lines', code: 'C1.5', n: 2, q: 'The author begins with a gull and ends with a Canada goose. Why do you think the author mentions birds?',
        a: 'Birds are familiar, so they help readers picture flight. Ending with the goose shows that nature solved flight first and still teaches engineers.', look: 'a reason linked to the reader (a familiar picture) or to the message (nature as the first engineer)' }
    ]
  });
})();
