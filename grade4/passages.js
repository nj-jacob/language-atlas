/* Grade 4 reading passages for the tool box (assets/engine/library.js). Written for this site. */
(function () {
  'use strict';
  var P = Atlas.library, D = P.draw;

  P.add({
    id: 'g4-beavers', subject: 'science', form: 'Report',
    title: 'The Beaver Engineers',
    deck: 'How one busy animal changes a whole wetland',
    hero: {
      tall: 164,
      cap: 'A beaver pond in northern Ontario. The dam holds back the stream, and the lodge sits safely in deep water.',
      art: '<path class="t" d="M0 70 Q90 30 190 58 T400 46 T700 60"/>' +
        D.spruce(28, 120, 80) + D.spruce(62, 118, 64) + D.spruce(96, 122, 72) + D.spruce(618, 116, 74) + D.spruce(652, 120, 86) + D.spruce(684, 118, 60) +
        '<path class="k" d="M0 122 Q120 116 160 124 L520 124 Q600 118 700 122"/>' +
        '<path class="h" d="M210 124 Q250 66 300 64 Q352 66 392 124 Z"/>' +
        '<path class="k" d="M226 112 L262 88 M244 120 L300 78 M286 118 L336 82 M318 120 L360 96 M240 96 L300 106 M300 70 L330 114"/>' +
        '<path class="k" d="M520 124 L538 102 L560 124 M532 112 L566 104 M548 96 L556 124 M562 102 L584 124 M572 98 L590 112"/>' +
        '<path class="a" d="M586 124 Q600 140 597 160 M594 124 Q610 142 609 162"/>' +
        D.ripple(130, 200, 140) + D.ripple(400, 510, 140) + D.ripple(240, 360, 158) +
        '<path class="k" d="M444 150 q8 -9 18 -6 q8 3 6 10"/><circle class="dot" cx="461" cy="148" r="1.6"/>' +
        '<path class="a" d="M444 154 L404 166 M444 154 L410 146"/>'
    },
    body: [
      'Walk along a stream in Ontario and you might find a strange wall of sticks and mud stretched across the water. No person built it. A beaver did. Beavers are the largest rodents in Canada, and they are also some of the best builders in nature.',
      { h: 'Building the dam' },
      'A beaver starts a dam by pushing branches into the bottom of the stream. Then it packs mud, stones and plants into the gaps. Water backs up behind the wall, and a deep, quiet pond forms. The beaver checks its dam every night. If it hears running water, it hurries to fix the leak.',
      { h: 'A safe home' },
      'In the middle of the pond, the beaver family builds a <b>lodge</b>, a dome of sticks and mud. The doors are under the water, so wolves and bears cannot follow the beavers inside. Above the water is a dry room where the family eats, sleeps and raises its young, called kits. In winter, the mud freezes as hard as rock.',
      { fig: '<path class="a" d="M0 72 H300"/>' + D.ripple(4, 70, 84) + D.ripple(230, 296, 84) +
          '<path class="h" d="M70 128 Q88 30 150 26 Q212 30 230 128"/>' +
          '<path class="k" d="M110 72 Q150 50 190 72 Z"/><path class="k" d="M96 128 Q112 102 124 76 M204 128 Q190 102 176 76"/>' +
          '<path class="k" d="M10 128 H290"/><path class="d" d="M146 30 V18 M154 30 V16"/>' +
          D.arrow(70, 114, 102, 96, 'a') + D.arrow(232, 114, 200, 96, 'a') +
          D.label(186, 12, 'air vent', 156, 22) + D.label(8, 58, 'water line', 40, 72) + D.label(204, 50, 'dry room', 166, 64) +
          D.label(8, 146, 'underwater entrance', 92, 120) + D.label(226, 146, 'pond bottom', 262, 128),
        tall: 152, cap: 'Inside a beaver lodge. The entrances are below the water line.' },
      { box: 'Did you know?', text: 'A beaver’s front teeth never stop growing. Chewing wood keeps them from getting too long. The teeth are orange because they contain iron, which makes them strong.' },
      { h: 'A home for many' },
      'A beaver pond changes the land around it. Trees that stand in the deep water slowly die, and woodpeckers drill nests in their trunks. Frogs, ducks, fish and moose move into the new <b>wetland</b>. Because so many plants and animals depend on the work of beavers, scientists call the beaver a <b>keystone species</b>.',
      { h: 'Not everyone is happy' },
      'Beavers can cause problems, too. A pond can flood a road or a farmer’s field. Some communities now put a pipe through the dam. The pipe lets some water flow out, so the pond stays at a safe level and the beavers can stay as well.',
      'The next time you see a pond full of grey stumps, look for a dome of sticks. You may be looking at the work of a family of engineers.'
    ],
    guide: { before: 'Ask what the child already knows about beavers. Show the lodge diagram and point to the water line. Teach <b>dam</b>, <b>lodge</b> and <b>wetland</b>, and say each word together.',
      after: 'Beaver dams help some living things and cause problems for others. Should people remove a dam that floods a road, or find a way to live with it? Why?' },
    words: [['lodge', 'a beaver home made of sticks and mud'], ['wetland', 'land covered by shallow water for much of the year'], ['keystone species', 'a living thing that many others in a habitat depend on']],
    qs: [
      { k: 'choice', code: 'C3.3', q: 'What is the main idea of the whole text?',
        opts: ['Beavers have orange teeth.', 'Beavers build dams and lodges that change the land and help many living things.', 'Beaver ponds flood roads and fields.', 'Wolves and bears hunt beavers.'], a: 1 },
      { k: 'order', code: 'C3.3', half: true, q: 'Number the steps to show how a beaver makes a pond.',
        items: ['It pushes branches into the stream bed.', 'It packs mud and stones into the gaps.', 'Water backs up and a pond forms.', 'It checks the dam every night.'], show: [2, 0, 3, 1] },
      { k: 'choice', code: 'C1.3', half: true, q: 'Why are some words in <b>bold</b> type?',
        opts: ['They are the most fun words.', 'They are in Words to know.', 'They are names of people.', 'They are said loudly.'], a: 1 },
      { k: 'table', code: 'C3.3', q: 'Fill in the chart. Each cause leads to an effect.', cols: ['Cause', 'Effect'],
        rows: [['A beaver builds a dam across a stream.', null], [null, 'Woodpeckers drill nests in the trunks.'], ['A beaver pond floods a road.', null]],
        a: [[null, 'Water backs up and a pond forms.'], ['Trees standing in deep water die.', null], [null, 'People put a pipe through the dam.']] },
      { k: 'lines', code: 'C1.4', n: 3, q: 'Look at the diagram of the lodge. Why are the entrances under the water? Use the diagram and the text.',
        a: 'The entrances are under the water so wolves and bears cannot get in. The beavers swim in and climb up to the dry room.', look: 'a reason (safety from predators) and a detail from the diagram, such as the dry room above the water line' },
      { k: 'choice', code: 'C3.2', half: true, q: '“The mud freezes as hard as rock.” This tells you the lodge in winter is …',
        opts: ['cold and wet inside', 'strong and hard to break into', 'about to fall down', 'empty'], a: 1 },
      { k: 'choice', code: 'B2.2', half: true, q: '“So many plants and animals <b>depend</b> on the work of beavers.” Here, <b>depend</b> means …',
        opts: ['need', 'build', 'fear', 'watch'], a: 0 },
      { k: 'lines', code: 'C3.5', n: 3, q: 'A farmer whose field is flooded and a frog living in the pond might feel very differently about beavers. Explain both points of view. Use details from the text.',
        a: 'The farmer may be upset because the pond floods the field and the crops are lost. The frog benefits because the beaver made a new wetland where it can live.', look: 'both points of view, each with a detail from the text (flooded field; new wetland for frogs)' }
    ]
  });
})();
