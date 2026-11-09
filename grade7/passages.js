/* Grade 7 reading passages for the tool box (assets/engine/library.js). Written for this site. */
(function () {
  'use strict';
  var P = Atlas.library, D = P.draw;
  function paddler(x, y) { return '<circle class="k" cx="' + x + '" cy="' + y + '" r="5"/><path class="k" d="M' + x + ' ' + (y + 5) + ' V' + (y + 18) + ' M' + (x + 10) + ' ' + (y + 4) + ' L' + (x - 10) + ' ' + (y + 36) + '"/>'; }
  function place(x, y, name, dx, dy, end) { return '<circle class="dot" cx="' + x + '" cy="' + y + '" r="2.6"/><text class="n" x="' + (x + dx) + '" y="' + (y + dy) + '"' + (end ? ' text-anchor="end"' : '') + '>' + name + '</text>'; }

  P.add({
    id: 'g7-voyageur', subject: 'history', form: 'Diary',
    title: 'The Paddle and the Portage',
    deck: 'From the diary of Étienne Brisebois, voyageur, 1794 (a made-up diary based on real journeys)',
    hero: {
      tall: 150,
      cap: 'A fur trade canoe on the Ottawa River. Large canoes carried about ten paddlers and as much as three tonnes of cargo.',
      art: D.spruce(570, 86, 60) + D.spruce(600, 84, 74) + D.spruce(632, 88, 56) + D.spruce(664, 84, 70) +
        '<path class="k" d="M520 90 Q560 80 600 86 T700 82"/><path class="t" d="M0 70 Q80 56 160 64 T330 60"/>' +
        '<path class="k" d="M110 112 Q300 134 490 112 Q300 120 110 112 Z M110 112 Q100 92 116 86 M490 112 Q500 92 484 86"/>' +
        [150, 196, 242, 288, 334, 380, 426].map(function (x) { return paddler(x, 84); }).join('') +
        '<path class="a" d="M462 92 L482 72 M466 86 L478 96"/>' +
        D.ripple(40, 140, 126) + D.ripple(200, 420, 138) + D.ripple(470, 640, 124) + D.ripple(60, 180, 146)
    },
    body: [
      { h: 'May 8 · Lachine' },
      'Today I signed my contract with the fur company: three years, for wages that will help Maman and my four sisters. Now I am a <b>voyageur</b>. Our canoe is more than ten metres long, made of birchbark sewn with spruce root and sealed with spruce gum. Old Thomas, our steersman, says the Anishinaabe and other First Nations built canoes like this long before any French ship crossed the ocean. Without their knowledge, he says, none of us would ever reach the <b>pays d’en haut</b>.',
      { h: 'May 21 · Ottawa River' },
      'My shoulders burn. We paddle from before sunrise until dark, about forty strokes a minute, singing to keep time. At the Chaudière Falls we made our first <b>portage</b>. I carried two packs of trade goods, each about forty kilograms, on a leather strap across my forehead. I fell twice. Nobody laughed. Everyone falls the first time, Thomas says.',
      { fig: '<path class="t" d="M8 44 Q50 10 104 22 Q132 30 128 50 Q110 70 60 66 Q20 66 8 44 Z"/>' +
          '<path class="t" d="M146 76 Q184 70 200 100 Q206 136 184 154 Q160 160 150 132 Q140 104 146 76 Z"/><ellipse class="t" cx="226" cy="98" rx="9" ry="5"/>' +
          '<path class="t" d="M235 96 Q248 94 254 110 Q260 128 268 140 Q280 152 298 160"/>' +
          '<path class="a" stroke-dasharray="5 4" d="M292 158 L268 140 Q254 112 246 98 L226 98 L206 104 Q196 84 178 74 Q156 64 132 64 Q120 22 70 22 Q30 26 18 46"/>' +
          place(292, 158, '1', -12, 4) + place(268, 140, '2', -12, 4) + place(226, 98, '3', -4, -9) + place(132, 64, '4', 4, 14) + place(18, 46, '5', -4, 16) +
          '<text class="n" x="40" y="54">Lake Superior</text><text class="n" x="156" y="118">Lake</text><text class="n" x="156" y="130">Huron</text>' +
          ['1 Lachine', '2 Chaudière Falls', '3 Lake Nipissing', '4 Sault', '5 Grand Portage'].map(function (t, i) { return '<text class="l" x="214" y="' + (12 + i * 13) + '">' + t + '</text>'; }).join('') +
          D.arrow(20, 156, 20, 128, 'k') + '<text class="lb" x="28" y="150">N</text>',
        tall: 168, cap: 'The route from Lachine, near Montréal, to Grand Portage. The dashed line shows the canoe route.' },
      { h: 'June 2 · Lake Nipissing' },
      'Wind kept us on shore all day. An Anishinaabe family camped near us and traded fresh fish for tea and flour. Their daughter, who is perhaps ten, laughed at the way I held my paddle, then showed me how to turn the blade at the end of each stroke. It works. I am faster already.',
      { h: 'June 10 · Sault' },
      'We passed the rapids at the Sault today, where the water of the great lake rushes down toward Lake Huron. Fishers stood up in their canoes in the white water and scooped whitefish with long nets. I would have tipped over in a moment.',
      { h: 'June 19 · Lake Superior' },
      'This lake is not a lake. It is a sea. Waves taller than our canoe roll in from the west, so we hug the rocky shore and wait out the storms. Thomas reads the sky the way the priest reads his book.',
      { h: 'July 4 · Grand Portage' },
      'We have arrived. Tonight there is music, dancing and more food than I have seen since home. Tomorrow we load the bales of beaver pelts and turn back toward Montréal. My hands are hard now, and my shoulders no longer burn. I am not the same boy who left Lachine.',
      { box: 'The real voyageurs', text: 'From the late 1600s to the mid-1800s, thousands of voyageurs moved furs and trade goods across North America. Most were French Canadian or Métis, and many travelled with First Nations guides who knew the rivers and portages.' }
    ],
    guide: { before: 'Find Montréal, the Ottawa River and Lake Superior on a map of Canada. Explain the fur trade in two sentences. Teach <b>voyageur</b>, <b>portage</b> and <b>pays d’en haut</b> (the “upper country” to the north and west).',
      after: 'Étienne’s diary shows only his point of view. Whose voices are missing from this story, and what might they say about the fur trade?' },
    words: [['voyageur', 'a paddler who carried goods for the fur trade'], ['portage', 'carrying canoes and goods over land, around rapids'], ['pays d’en haut', '“the upper country”: the lands to the north and west']],
    qs: [
      { k: 'choice', code: 'C1.2', half: true, q: 'Which feature shows that this text is a diary?',
        opts: ['a glossary', 'dated entries in the first person', 'a table of contents', 'both sides of an argument'], a: 1 },
      { k: 'choice', code: 'C1.4', half: true, q: 'Use the map. Which lake did the canoe cross last, just before Grand Portage?',
        opts: ['Lake Huron', 'Lake Nipissing', 'Lake Superior', 'Lake Ontario'], a: 2 },
      { k: 'choice', code: 'C1.6', q: 'The diary is told in the first person. What is one disadvantage of this point of view?',
        opts: ['We know what every character thinks.', 'We learn only what Étienne sees, thinks and feels.', 'There is no dialogue at all.', 'The story is told out of order.'], a: 1 },
      { k: 'lines', code: 'C3.2', n: 3, q: 'How does Étienne change between May 21 and July 4? Use two details from the diary.',
        a: 'At first he is new and weak: his shoulders burn and he falls on the portage. By July his hands are hard, he is faster, and he says he is not the same boy.', look: 'a change (weak or new to strong or confident) with two details from different entries' },
      { k: 'choice', code: 'C3.1', half: true, q: '“Thomas reads the sky the way the priest reads his book.” This means Thomas …',
        opts: ['prays during storms', 'can predict the weather', 'cannot read', 'is a priest'], a: 1 },
      { k: 'choice', code: 'C1.5', half: true, q: '“This lake is not a lake. It is a sea.” Why does Étienne use short sentences here?',
        opts: ['to sound confused', 'to show how huge and wild it feels', 'because he is tired of writing', 'to explain salt water'], a: 1 },
      { k: 'lines', code: 'C3.3', n: 3, q: 'Thomas says the voyageurs depend on First Nations knowledge. Find two pieces of evidence in the diary that support him.',
        a: 'The birchbark canoe was a First Nations design. The Anishinaabe girl taught Étienne a better paddle stroke. The box says many voyageurs travelled with First Nations guides.', look: 'two pieces of evidence from the text, such as the canoe design, the paddling lesson or the guides' },
      { k: 'lines', code: 'C1.6', n: 3, q: 'How might the story of June 2 be different if the Anishinaabe girl told it? Give one example.',
        a: 'She might describe the clumsy stranger who held his paddle the wrong way, and how her family decided to trade with the voyageurs. Her view would show her own knowledge and her family’s life.', look: 'a clear alternative point of view and an example of a detail that would change' }
    ]
  });
})();
